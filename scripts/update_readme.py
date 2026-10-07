#!/usr/bin/env python3
"""Rewrite the auto-generated block of README.md.

Everything between <!-- AUTO:START --> and <!-- AUTO:END --> is replaced with:
  * current phase (first phase page that still has unchecked boxes)
  * overall roadmap progress (checked / total task boxes across phase pages)
  * per-phase progress bars
  * skill status counts from content/skills.md (✅ done, 🟨 in progress, ⬜ not started)
  * the 3 newest progress-log entries

You never edit that block by hand: tick boxes / write log entries, push,
and the deploy workflow runs this script.
"""
from __future__ import annotations

import re
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
README = ROOT / "README.md"
DOCS = ROOT / "content"
SITE = "https://anirudh6415.github.io/ai-infra-roadmap"

PHASES = [
    ("Phase 1 · Inference & GPU memory", "roadmap/phase-1.md"),
    ("Phase 2 · Down to the GPU", "roadmap/phase-2.md"),
    ("Phase 3 · Scale out", "roadmap/phase-3.md"),
    ("Phase 4 · Platform & economics", "roadmap/phase-4.md"),
    ("Phase 5 · Serving at scale", "roadmap/phase-5.md"),
    ("Phase 6 · Training & fleet operations", "roadmap/phase-6.md"),
]
START, END = "<!-- AUTO:START -->", "<!-- AUTO:END -->"
BOX = re.compile(r"^\s*[-*]\s+\[( |x|X)\]\s", re.MULTILINE)


def count_boxes(path: Path) -> tuple[int, int]:
    if not path.exists():
        return 0, 0
    marks = BOX.findall(path.read_text(encoding="utf-8"))
    return sum(m.lower() == "x" for m in marks), len(marks)


def bar(done: int, total: int, width: int = 20) -> str:
    if total == 0:
        return "`" + "░" * width + "`   0%"
    filled = round(width * done / total)
    pct = round(100 * done / total)
    return "`" + "█" * filled + "░" * (width - filled) + f"` {pct:>3}%"


def skill_counts() -> tuple[int, int, int]:
    path = DOCS / "skills.md"
    if not path.exists():
        return 0, 0, 0
    rows = [ln for ln in path.read_text(encoding="utf-8").splitlines() if ln.startswith("|")]
    status_cells = [ln.rstrip("|").split("|")[-1] for ln in rows]
    done = sum("✅" in c for c in status_cells)
    doing = sum("🟨" in c for c in status_cells)
    todo = sum("⬜" in c for c in status_cells)
    return done, doing, todo


def latest_log(n: int = 3) -> list[str]:
    path = DOCS / "progress-log.md"
    if not path.exists():
        return []
    text = path.read_text(encoding="utf-8")
    if "<!-- LOG:START -->" in text:
        text = text.split("<!-- LOG:START -->", 1)[1]
    text = text.split("<!-- LOG:END -->", 1)[0]
    chunks = re.split(r"^## ", text, flags=re.MULTILINE)[1:]
    entries = []
    for chunk in chunks[:n]:
        heading, _, body = chunk.partition("\n")
        did = re.search(r"\*\*Did:\*\*\s*(.+)", body)
        summary = did.group(1).strip() if did else body.strip().splitlines()[0] if body.strip() else ""
        summary = re.sub(r"<br>.*", " …", summary).rstrip(" ")
        entries.append(f"- **{heading.strip()}**: {summary}")
    return entries


def render() -> str:
    phase_rows, current = [], None
    all_done = all_total = 0
    for name, rel in PHASES:
        done, total = count_boxes(DOCS / rel)
        all_done += done
        all_total += total
        if current is None and total and done < total:
            current = name
        page = rel.replace(".md", "/")
        phase_rows.append(f"| [{name}]({SITE}/{page}) | {bar(done, total)} | {done}/{total} |")
    current = current or ("All phases complete 🎉" if all_total else PHASES[0][0])

    s_done, s_doing, s_todo = skill_counts()
    log = latest_log() or ["- _No entries yet. Add one from the Quick update page._"]
    stamp = datetime.now(timezone.utc).strftime("%Y-%m-%d")

    return "\n".join([
        START,
        f"**Current phase:** {current}  ",
        f"**Overall:** {bar(all_done, all_total)} ({all_done}/{all_total} tasks)  ",
        f"**Skills:** {s_done} done · {s_doing} active · {s_todo} todo",
        "",
        "| Phase | Progress | Tasks |",
        "|---|---|---|",
        *phase_rows,
        "",
        "**Latest progress**",
        "",
        *log,
        "",
        f"<sub>Auto-updated {stamp} by <code>scripts/update_readme.py</code>. "
        f"Full log: <a href=\"{SITE}/progress-log/\">progress log</a>.</sub>",
        END,
    ])


def main() -> int:
    text = README.read_text(encoding="utf-8")
    if START not in text or END not in text:
        print("README is missing the AUTO markers; nothing changed.", file=sys.stderr)
        return 1
    before, rest = text.split(START, 1)
    _, after = rest.split(END, 1)
    new = before + render() + after
    # Only rewrite (and bump the date) when real content changed.
    strip_date = lambda s: re.sub(r"Auto-updated \d{4}-\d{2}-\d{2}", "", s)
    if strip_date(new) != strip_date(text):
        README.write_text(new, encoding="utf-8")
        print("README updated.")
    else:
        print("README unchanged.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
