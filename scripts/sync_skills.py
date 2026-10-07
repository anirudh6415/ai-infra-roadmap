#!/usr/bin/env python3
"""Set each skill's Status in content/skills.md from the roadmap ticks.

A skill's **Weeks** column lists the weeks that teach it. Its status is:
  ⬜  no task ticked yet in any of those weeks
  🟨  some tasks ticked
  ✅  every task in those weeks ticked
Skills with no week number (e.g. "Ongoing") are left as they are.
Run by the quick-log workflow and on every deploy, so you never edit the column.
"""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SKILLS = ROOT / "content" / "skills.md"
ROADMAP_DIR = ROOT / "content" / "roadmap"
WEEK_RE = re.compile(r"^###\s+Week\s+(\d+)\b")
TASK_RE = re.compile(r"^- \[( |x|X)\] ")
WEEKS_IN_CELL = re.compile(r"W?(\d+)\s*(?:-\s*W?(\d+))?", re.I)


def week_progress() -> dict[int, tuple[int, int]]:
    """Week number → (ticked tasks, total tasks)."""
    out: dict[int, list[int]] = {}
    for path in sorted(ROADMAP_DIR.glob("phase-*.md")):
        current = None
        for line in path.read_text(encoding="utf-8").splitlines():
            m = WEEK_RE.match(line)
            if m:
                current = int(m.group(1))
                out.setdefault(current, [0, 0])
                continue
            t = TASK_RE.match(line)
            if t and current is not None:
                out[current][1] += 1
                out[current][0] += t.group(1) != " "
    return {k: (v[0], v[1]) for k, v in out.items()}


def parse_weeks(cell: str) -> list[int]:
    weeks = set()
    for m in WEEKS_IN_CELL.finditer(cell.replace("–", "-").replace("—", "-")):
        a = int(m.group(1)); b = int(m.group(2) or a)
        weeks.update(range(a, min(b, a + 79) + 1))
    return sorted(weeks)


def status_for(weeks: list[int], progress: dict[int, tuple[int, int]]) -> str | None:
    known = [progress[w] for w in weeks if w in progress]
    if not known:
        return None
    done = sum(d for d, _ in known); total = sum(t for _, t in known)
    if done == 0:
        return "⬜"
    return "✅" if total and done == total else "🟨"


def sync() -> int:
    """Rewrite the Status column. Returns how many skills changed."""
    progress = week_progress()
    lines = SKILLS.read_text(encoding="utf-8").split("\n")
    i_weeks = None
    changed = 0
    for n, line in enumerate(lines):
        if not line.startswith("|"):
            i_weeks = None
            continue
        cells = line.split("|")[1:-1]
        names = [c.strip().lower() for c in cells]
        if "weeks" in names and names[-1] == "status":
            i_weeks = names.index("weeks")
            continue
        if i_weeks is None or set(line) <= set("|-: "):
            continue
        new = status_for(parse_weeks(cells[i_weeks]), progress)
        if new is None:
            continue
        old = cells[-1]
        if new not in old or any(e in old for e in "⬜🟨✅" if e != new):
            cells[-1] = f" {new} "
            lines[n] = "|" + "|".join(cells) + "|"
            changed += 1
    SKILLS.write_text("\n".join(lines), encoding="utf-8")
    return changed


if __name__ == "__main__":
    print(f"Skills synced ({sync()} changed).")
