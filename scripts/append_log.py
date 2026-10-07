#!/usr/bin/env python3
"""Append a progress-log entry built from a GitHub issue-form body.

Reads ISSUE_BODY / ISSUE_TITLE / ISSUE_CREATED_AT from the environment
(set by .github/workflows/quick-log.yml) and inserts the newest entry
right after the <!-- LOG:START --> marker in content/progress-log.md.

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
START = "<!-- LOG:START -->"

# Issue-form labels (see .github/ISSUE_TEMPLATE/quick-log.yml) -> keys
LABELS = {
    "week": "week",
    "did": "did",
    "learned": "learned",
    "next": "next",
    "hours": "hours",
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


def build_entry(fields: dict[str, str], when: datetime) -> str:
    week = fields.get("week", "").strip().lstrip("#").strip()
    heading = when.strftime("%Y-%m-%d")
    if week:
        heading += f" · Week {week}"

    out = [f"## {heading}", ""]
    for key, label in (("did", "Did"), ("learned", "Learned"), ("next", "Next")):
        if fields.get(key):
            out.append(f"**{label}:** {one_paragraph(fields[key])}  ")
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

    entry = build_entry(fields, entry_time())
    text = LOG_FILE.read_text(encoding="utf-8")
    if START not in text:
        print(f"Marker {START} missing from {LOG_FILE}", file=sys.stderr)
        return 1
    text = text.replace(START, f"{START}\n\n{entry}", 1)
    # collapse runs of 3+ blank lines that the insert may create
    text = re.sub(r"\n{4,}", "\n\n\n", text)
    LOG_FILE.write_text(text, encoding="utf-8")
    print(entry)
    return 0


if __name__ == "__main__":
    sys.exit(main())
