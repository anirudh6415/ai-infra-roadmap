# AI Infra Roadmap

Optimizing AI workloads, from GPU kernels to fleet capacity.

🌐 **Site:** <https://anirudh6415.github.io/ai-infra-roadmap/>  
📝 **Quick notes:** [Scrape Codebook (GitBook)](https://anirudh-docs.gitbook.io/scrape-codebook)

## Progress

<!-- AUTO:START -->
**Current phase:** Phase 1 · Inference & GPU memory  
**Overall:** `░░░░░░░░░░░░░░░░░░░░`   0% (0/214 tasks)  
**Skills:** ✅ 0 done · 🟨 0 in progress · ⬜ 85 not started

| Phase | Progress | Tasks |
|---|---|---|
| [Phase 1 · Inference & GPU memory](https://anirudh6415.github.io/ai-infra-roadmap/roadmap/phase-1/) | `░░░░░░░░░░░░░░░░░░░░`   0% | 0/40 |
| [Phase 2 · Down to the GPU](https://anirudh6415.github.io/ai-infra-roadmap/roadmap/phase-2/) | `░░░░░░░░░░░░░░░░░░░░`   0% | 0/33 |
| [Phase 3 · Scale out](https://anirudh6415.github.io/ai-infra-roadmap/roadmap/phase-3/) | `░░░░░░░░░░░░░░░░░░░░`   0% | 0/31 |
| [Phase 4 · Platform & economics](https://anirudh6415.github.io/ai-infra-roadmap/roadmap/phase-4/) | `░░░░░░░░░░░░░░░░░░░░`   0% | 0/34 |
| [Phase 5 · Serving at scale](https://anirudh6415.github.io/ai-infra-roadmap/roadmap/phase-5/) | `░░░░░░░░░░░░░░░░░░░░`   0% | 0/41 |
| [Phase 6 · Training & fleet operations](https://anirudh6415.github.io/ai-infra-roadmap/roadmap/phase-6/) | `░░░░░░░░░░░░░░░░░░░░`   0% | 0/35 |

**Latest progress**

- **2026-10-07 · Week 0**: Set up the roadmap repo, skill list and 12-month plan.

<sub>Auto-updated 2026-10-07 by <code>scripts/update_readme.py</code>. Full log: <a href="https://anirudh6415.github.io/ai-infra-roadmap/progress-log/">progress log</a>.</sub>
<!-- AUTO:END -->

## What's inside

| Tab | What it holds |
|---|---|
| [Skills](https://anirudh6415.github.io/ai-infra-roadmap/skills/) | Every skill with its depth, phase, status and where to learn it |
| [Roadmap](https://anirudh6415.github.io/ai-infra-roadmap/roadmap/) | 6 phases, 78 weeks: *learn → build → ship*, a named mini-project, reading list and checkboxes for each |
| [Projects](https://anirudh6415.github.io/ai-infra-roadmap/projects/) | 6 portfolio projects and all [78 weekly mini-projects](https://anirudh6415.github.io/ai-infra-roadmap/projects/weekly/) |
| [Resources](https://anirudh6415.github.io/ai-infra-roadmap/resources/) | Courses, books, papers, docs and repos, mapped to the weeks that use them |
| [Tool radar](https://anirudh6415.github.io/ai-infra-roadmap/radar/) | The main AI infrastructure tools by category, and where the roadmap uses each |
| [People](https://anirudh6415.github.io/ai-infra-roadmap/people/) | Engineers, researchers and communities worth following (links verified) |
| [Progress log](https://anirudh6415.github.io/ai-infra-roadmap/progress-log/) | Weekly *did / learned / next* entries |

## The plan in one picture

```text
Months 1-3   Phase 1  Inference & GPU memory      -> P1 LLM capacity bench
Months 4-6   Phase 2  Down to the GPU              -> P2 Kernel lab
Months 7-9   Phase 3  Scale out                    -> P3 Fault-tolerant FSDP
Months 10-12 Phase 4  Platform & economics         -> P4 GPU capacity planner (capstone)
Months 13-15 Phase 5  Serving at scale             -> P5 Disaggregated serving lab
Months 16-18 Phase 6  Training & fleet operations  -> P6 Post-training & fleet health lab
Month 12+    Interview prep, light alongside Phases 5-6; full focus when applying
```

**Rhythm:** 30 minutes on weekday mornings (learn), 2 hours Saturday (build), 2 hours Sunday (ship and write).  
**Rule:** only one *Deep* topic in progress at a time.

## How to update

- **Log progress:** press **+ log progress** on the site (or open a *Quick log* issue in the GitHub app) and tick the tasks you finished. A workflow adds the entry to the log, ticks those tasks on the roadmap and refreshes this README. `[log]` issues from anyone but the repo owner are closed automatically and never logged.
- **Tick a task without logging:** edit the phase file in `content/roadmap/` on GitHub (press <kbd>.</kbd> for the web editor) and change `- [ ]` to `- [x]`. Every progress bar on the site updates from these.
- **Change a skill's status:** edit the last column in `content/skills.md` (⬜ → 🟨 → ✅).
- **Change a project's status:** edit the `Status:` line at the top of its file in `content/projects/`.

All content is plain Markdown in `content/`. The site is built with [Astro](https://astro.build/) in a datasheet design with a terminal-style dark mode. Setup and maintenance details are in [SETUP.md](SETUP.md).
