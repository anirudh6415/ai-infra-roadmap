#!/usr/bin/env python3
"""Append a progress-log entry built from a GitHub issue-form body.

Reads ISSUE_BODY / ISSUE_TITLE / ISSUE_CREATED_AT from the environment
(set by .github/workflows/quick-log.yml) and inserts the newest entry
right after the <!-- LOG:START --> marker in content/progress-log.md.

If the issue lists completed tasks ("W01.1" IDs or task text), the matching
"- [ ]" boxes in content/roadmap/phase-*.md are ticked too, so every progress
bar on the site updates from the same submission.

Run locally to test:
    ISSUE_BODY="$(cat sample.md)" python scripts/append_log.py
"""
from __future__ import annotations

import os
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parent.parent
LOG_FILE = ROOT / "content" / "progress-log.md"
ROADMAP_DIR = ROOT / "content" / "roadmap"
COMMENT_FILE = ROOT / ".quick-log-comment.md"  # read by the workflow, not committed
START = "<!-- LOG:START -->"

# Issue-form labels (see .github/ISSUE_TEMPLATE/quick-log.yml) -> keys
LABELS = {
    "week": "week",
    "did": "did",
    "learned": "learned",
    "next": "next",
    "hours": "hours",
    "completed": "completed",
    "links": "links",
}
EMPTY = {"", "_no response_", "none", "n/a"}


def parse_issue_form(body: str) -> dict[str, str]:
    """Split an issue-form body ('### Label' + value blocks) into a dict."""
    fields: dict[str, str] = {}
    parts = re.split(r"^###\s+(.+?)\s*$", body or "", flags=re.MULTILINE)
    # parts = [preamble, label1, value1, label2, value2, ...]
    for label, value in zip(parts[1::2], parts[2::2]):
        key = LABELS.get(label.strip().lower())
        if not key:
            continue
        value = value.strip()
        if value.lower() in EMPTY:
            value = ""
        fields[key] = value
    return fields


def one_paragraph(text: str) -> str:
    """Keep multi-line answers readable inside a single bold-labelled line."""
    lines = [ln.rstrip() for ln in text.strip().splitlines() if ln.strip()]
    return "<br>".join(lines)


# --------------------------------------------------------------- ticking tasks

TASK_RE = re.compile(r"^(\s*[-*]\s+\[)( |x|X)(\]\s+)(.*)$")
WEEK_RE = re.compile(r"^###\s+Week\s+(\d+)\b")
ID_RE = re.compile(r"^\s*W?(\d{1,2})\s*[.:#-]\s*(\d{1,2})\b\s*(?:[·:\-—–]\s*(.*))?$", re.IGNORECASE)


def norm(s: str) -> str:
    s = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", s)   # markdown links -> text
    s = re.sub(r"[`*_~]", "", s).lower()
    s = re.sub(r"[^\w\s/.%-]", " ", s)
    return re.sub(r"\s+", " ", s).strip()


def load_tasks() -> tuple[dict, list[dict]]:
    files: dict = {}
    tasks: list[dict] = []
    for path in sorted(ROADMAP_DIR.glob("phase-*.md")):
        lines = path.read_text(encoding="utf-8").split("\n")
        files[path] = lines
        week, idx = None, 0
        for i, line in enumerate(lines):
            wm = WEEK_RE.match(line)
            if wm:
                week, idx = int(wm.group(1)), 0
                continue
            tm = TASK_RE.match(line)
            if tm and week is not None:
                idx += 1
                tasks.append({"path": path, "line": i, "week": week, "idx": idx,
                              "text": tm.group(4).strip(), "done": tm.group(2).lower() == "x"})
    return files, tasks


def find_by_text(text: str, tasks: list[dict], prefer_week: int | None) -> dict | None:
    q = norm(text)
    if not q:
        return None
    exact = [t for t in tasks if norm(t["text"]) == q]
    loose = exact or [t for t in tasks if q in norm(t["text"]) or (len(q) > 12 and norm(t["text"]) in q)]
    if not loose:
        return None
    if len(loose) > 1 and prefer_week is not None:
        same = [t for t in loose if t["week"] == prefer_week]
        loose = same or loose
    open_ = [t for t in loose if not t["done"]]
    return (open_ or loose)[0]


def tick_tasks(spec: str, prefer_week: int | None) -> tuple[list[dict], list[dict], list[str]]:
    """Returns (newly ticked, already done, not found)."""
    if not spec.strip():
        return [], [], []
    files, tasks = load_tasks()
    ticked, already, missing = [], [], []
    seen = set()
    for raw in re.split(r"[\n;]+", spec):
        tok = raw.strip().lstrip("-*• ").strip()
        tok = re.sub(r"^\[[ xX]\]\s*", "", tok)
        if not tok:
            continue
        task = None
        m = ID_RE.match(tok)
        if m:
            week, idx, title = int(m.group(1)), int(m.group(2)), (m.group(3) or "").strip()
            task = next((t for t in tasks if t["week"] == week and t["idx"] == idx), None)
            # If the file was reordered, trust the title over the number.
            if title and (task is None or (norm(title) not in norm(task["text"]) and norm(task["text"]) not in norm(title))):
                task = find_by_text(title, tasks, week) or task
        else:
            task = find_by_text(tok, tasks, prefer_week)
        if task is None:
            missing.append(tok)
            continue
        key = (task["week"], task["idx"])
        if key in seen:
            continue
        seen.add(key)
        if task["done"]:
            already.append(task)
            continue
        lines = files[task["path"]]
        lines[task["line"]] = TASK_RE.sub(lambda mm: f"{mm.group(1)}x{mm.group(3)}{mm.group(4)}", lines[task["line"]])
        task["done"] = True
        ticked.append(task)
    for path, lines in files.items():
        path.write_text("\n".join(lines), encoding="utf-8")
    return ticked, already, missing


def task_label(t: dict) -> str:
    return f"W{t['week']:02d}.{t['idx']} · {re.sub(r'[`*_]', '', t['text'])}"


def build_entry(fields: dict[str, str], when: datetime, ticked: list[dict] | None = None) -> str:
    week = fields.get("week", "").strip().lstrip("#").strip()
    heading = when.strftime("%Y-%m-%d")
    if week:
        heading += f" · Week {week}"

    out = [f"## {heading}", ""]
    for key, label in (("did", "Did"), ("learned", "Learned"), ("next", "Next")):
        if fields.get(key):
            out.append(f"**{label}:** {one_paragraph(fields[key])}  ")
    if ticked:
        out.append("**Completed:** " + "<br>".join(f"✓ {task_label(t)}" for t in ticked) + "  ")
    if fields.get("hours"):
        out.append(f"**Hours:** {fields['hours'].strip()}  ")
    if fields.get("links"):
        links = [l.strip() for l in re.split(r"[,\n]", fields["links"]) if l.strip()]
        rendered = ", ".join(f"<{l}>" if l.startswith("http") else l for l in links)
        out.append(f"**Links:** {rendered}  ")
    # trim trailing markdown line-break spaces on the last line
    out[-1] = out[-1].rstrip()
    out.append("")
    return "\n".join(out)


def entry_time() -> datetime:
    tz = ZoneInfo(os.environ.get("LOG_TZ", "America/New_York"))
    raw = os.environ.get("ISSUE_CREATED_AT", "")
    if raw:
        try:
            return datetime.fromisoformat(raw.replace("Z", "+00:00")).astimezone(tz)
        except ValueError:
            pass
    return datetime.now(timezone.utc).astimezone(tz)


def main() -> int:
    body = os.environ.get("ISSUE_BODY", "")
    fields = parse_issue_form(body)
    if not fields.get("did"):
        # Fall back to the raw body so nothing typed is ever lost.
        fields["did"] = body.strip() or os.environ.get("ISSUE_TITLE", "").removeprefix("[log]").strip()
    if not fields.get("did"):
        print("Nothing to log: empty issue body.", file=sys.stderr)
        return 1

    week_field = re.sub(r"\D", "", fields.get("week", ""))
    prefer = int(week_field) if week_field else None
    ticked, already, missing = tick_tasks(fields.get("completed", ""), prefer)

    entry = build_entry(fields, entry_time(), ticked)
    text = LOG_FILE.read_text(encoding="utf-8")
    if START not in text:
        print(f"Marker {START} missing from {LOG_FILE}", file=sys.stderr)
        return 1
    text = text.replace(START, f"{START}\n\n{entry}", 1)
    # collapse runs of 3+ blank lines that the insert may create
    text = re.sub(r"\n{4,}", "\n\n\n", text)
    LOG_FILE.write_text(text, encoding="utf-8")
    print(entry)

    # Confirmation comment for the issue (read by the workflow).
    msg = ["✅ Added to the progress log. The site will refresh in about a minute."]
    if ticked:
        msg += ["", f"**Ticked on the roadmap ({len(ticked)}):**"] + [f"- [x] {task_label(t)}" for t in ticked]
    if already:
        msg += ["", "**Already done:**"] + [f"- {task_label(t)}" for t in already]
    if missing:
        msg += ["", "⚠️ **Couldn't match these to a task** (use an ID like `W01.2` or copy the task text):"] + [f"- {m}" for m in missing]
    COMMENT_FILE.write_text("\n".join(msg) + "\n", encoding="utf-8")
    return 0


if __name__ == "__main__":
    sys.exit(main())
