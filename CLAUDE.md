# AI Infra Roadmap: project guide

Context for anyone (or any AI assistant) working on this repo. Read this before changing anything.

## What this is

A public, 78-week learning roadmap from GPU capacity planning to LLM inference and GPU performance engineering. It's published at <https://anirudh6415.github.io/ai-infra-roadmap/> with GitHub Pages and built with Astro.

- **6 phases × 13 weeks.** Phase 1 Inference & GPU memory · 2 Down to the GPU · 3 Scale out · 4 Platform & economics · 5 Serving at scale · 6 Training & fleet operations.
- **6 phase projects** (P1–P6) and **one mini-project per week**.
- **Time budget:** about 6.5 h/week (30 min on weekday mornings, 2 h Saturday, 2 h Sunday). New content must fit this budget. Extend the plan with new weeks or phases rather than cramming.

## Rules

1. **Verify every external link before adding it.** Open the page and confirm it is what the text says. No guessed URLs, arXiv IDs, GitHub handles or course numbers. If a page can't be checked, leave it out or mark it clearly.
2. **No personal or employer information** in the public site: no employer names, job titles, internal systems, numbers or screenshots, family details, or the owner's name in the header. Generic phrasing like "if your job touches GPUs…" is fine.
3. **Content lives in Markdown** under `content/`. Templates only render it. Never hard-code roadmap content in `src/`.
4. **Plain, direct English.** Short sentences, no hype.
5. **Logging is issue-based** (see below). Don't replace it with token or backend schemes; that was tried and rejected as over-engineering.

## Layout

```text
content/                   all writing (Markdown)
  home.md                  "About this roadmap" section on the homepage
  skills.md                skill tables by group
  roadmap/phase-1..6.md    weeks, tasks, mini-projects (drive all progress)
  roadmap/index.md         calendar, topic map, compute, parking lot
  roadmap/ongoing.md       Foundations track, learn-through-work, coding, writing
  roadmap/interview-prep.md
  projects/p1..p6-*.md     project specs (meta line at the top; status is computed)
  projects/index.md, projects/mini-projects.md (extra, optional)
  resources.md             resources by phase, incl. "AI study prompts"
  radar.md                 tool radar by category
  playbook.md              optimization playbook: method + levers mapped to weeks
  people.md                people and communities (verified links only)
  progress-log.md          log entries between <!-- LOG:START --> and <!-- LOG:END -->
  notes/*.md, archive/
src/config.mjs             SITE settings, PHASES and PROJECTS metadata, NAV
src/lib/content.mjs        parsers: weeks/tasks, skills, log, reading map, projects
src/lib/markdown.mjs       Markdown → HTML (callouts, terminal boxes, link rewriting)
src/pages/                 index, roadmap/[phase], roadmap/index, skills, projects/*, progress-log, quick-update, [...slug]
src/components/            Sidebar, PhaseCards, Timeline, WeekDetail, QuickUpdate
src/styles/global.css      design tokens + all styles
scripts/update_readme.py   rewrites the README block between <!-- AUTO:START/END -->
scripts/append_log.py      quick-log issue → log entry + ticks tasks + repo links
scripts/sync_skills.py     skill Status column from roadmap ticks
.github/workflows/         deploy.yml (build + Pages), quick-log.yml (issues → log)
.github/ISSUE_TEMPLATE/quick-log.yml
```

## Content formats the parsers rely on

**Week** (in `content/roadmap/phase-N.md`):

```markdown
### Week 7 · Title (light week)

- **Learn:** …
- **Build:** …
- **Ship:** …
- **Foundations:** …            (optional)
- **Mini-project:** `name`: what you ship.   (the log form's repo field turns it into [`name`](url))

**Done when**

- [ ] task
- [x] finished task
- [ ] Mini-project shipped: `name`   (always the last task; ticking it marks the mini-project SHIPPED)
```

- The heading must be `### Week N · Title`. A `(light …)` or `(holiday …)` suffix shows the week as hatched on the timeline.
- Task IDs are `W<week>.<n>` (n = order of the checkbox within the week). The log form and `append_log.py` use them, with the task text as a fallback.
- Week numbers continue across phases (Phase 5 starts at 53).

**Skills** (`content/skills.md`): `| Skill | Depth | Weeks | Done looks like | Learn from | Status |`. **Weeks** lists the weeks that teach the skill (`W03`, `W01–W04, W25`, `W26 onward`); each listed week shows the skill in its **Skills** row, and the skills page links back to those weeks. Every week should map to at least one skill. **Status must stay the last column** (⬜ / 🟨 / ✅). It is set automatically by `scripts/sync_skills.py` (run by the quick-log workflow and on every deploy): ⬜ no task ticked in the skill's weeks, 🟨 some, ✅ all. Rows without a week number keep their manual status. The site shows the emoji as TODO / ACTIVE / DONE. Depth uses `<span class="badge deep|working|aware">`.

**Resources** (`content/resources.md`): phase tables are `| | Resource | Type | Week |`. A number, range or list in **Week** (`3`, `14–16`, `8, 40`) automatically adds the row to those weeks' **Read** line.

**Projects:** the first line after the title is `**Phase N · Weeks a–b** · Repo: …`. There is no Status line: a project is TODO until any task in its phase is ticked, ACTIVE while in progress, and DONE when every task in the phase is ticked (`getProjects` in `content.mjs`). Mini-project status comes from the week's `Mini-project shipped` task.

**Automatic linking:** plain week references (`W08`, `W21–W23`) on content pages and the numbers in the resources **Week** column become links to those weeks (`linkWeeks` in `src/lib/content.mjs`). Each week's details show its mini-project, project, skills and reading automatically. When adding content, make sure every week keeps at least one skill and one resource.

**Deferred topics** (agents in depth, image/video/audio generation serving, LLM app observability, security in depth, data center power, ML pipelines, edge) are listed in the parking lot in `content/roadmap/index.md`. Add them as new weeks or a Phase 7 later.

**Markdown extras:** `!!! type "Title"` callouts, `??? type "Title"` collapsible callouts, and code fences `formula` / `text` / `prompt` for dark terminal boxes. Links between `.md` files are rewritten to site URLs.

## Adding things

- **New week or phase:** add a `phase-N.md` in the same format, then a `PHASES` entry in `src/config.mjs`, a matching `PROJECTS` entry and project page, the phase in `scripts/update_readme.py` `PHASES`, `SITE.totalWeeks`, and rows in `roadmap/index.md` (calendar + topic map).
- **New resource:** add a row to the right table in `resources.md` with a verified link and the week(s). Add it to `radar.md` if it's a tool.
- **New skill:** add a row in the right group of `skills.md`, with verified **Learn from** links.
- **New note or page:** drop a `.md` file in `content/` (notes appear in the sidebar automatically).

## Logging flow

1. **+ log progress** opens `/quick-update/`. The form shows the chosen week's tasks as checkboxes and builds a pre-filled GitHub issue (`[log] …`, template `quick-log.yml`).
2. `quick-log.yml` runs only for issues opened by the repo owner. `append_log.py` adds the entry to `progress-log.md` and ticks the listed tasks. If the optional **Mini-project repo** / **Project repo** fields are filled, it links the week's mini-project name and sets the project page's `Repo:` (using the Week field to find them). Then the README is refreshed, changes are committed, the issue is closed with a summary comment, and `deploy.yml` runs.
3. Anyone else's `[log]` issue is closed and locked; nothing is written.

## Design

The light theme is the "datasheet" look: Archivo + IBM Plex Mono (self-hosted via `@fontsource`), hairline rules, square corners, numbered section labels, spec tables, and an orange accent (`--accent`) used only for progress and the current item. The dark theme is the "terminal" look: monospace body and a green accent. Dark terminal boxes are reserved for formulas, diagrams, prompts and the log form. Tokens are at the top of `src/styles/global.css`. Don't add rounded cards, gradients or emoji section markers.

## Commands

```bash
npm install          # once
npm run dev          # http://localhost:4321/ai-infra-roadmap/
npm run build        # outputs dist/
python3 scripts/update_readme.py
ISSUE_BODY="$(cat sample.md)" python3 scripts/append_log.py   # test the log script
```

Check before shipping: `npm run build` passes, no horizontal overflow at 390 px width, light and dark themes both readable, and `update_readme.py` runs.

## Versions

Node ≥ 22.12, Astro 7, marked 18. GitHub Actions: checkout@v5, setup-node@v5, setup-python@v6, configure-pages@v6, upload-pages-artifact@v5, deploy-pages@v5 (all Node 24).
