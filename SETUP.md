# Setup guide

About 15 minutes from download to a live site.

## 1. Create the repo

1. On GitHub, create a new **public** repository named **`ai-infra-roadmap`** under `anirudh6415`. Don't add a README, `.gitignore` or license (they're already here).
2. Unzip this folder and push it:

```bash
cd ai-infra-roadmap
git init
git add .
git commit -m "Initial roadmap"
git branch -M main
git remote add origin https://github.com/anirudh6415/ai-infra-roadmap.git
git push -u origin main
```

> Using a different repo name or GitHub user? Change `owner`, `repo`, `base` and `origin` in **`src/config.mjs`**, and the URLs in `scripts/update_readme.py`, `README.md` and `.github/ISSUE_TEMPLATE/config.yml`.

## 2. Turn on GitHub Pages

1. Repo → **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Repo → **Actions** tab → **Build & deploy site** → **Run workflow** (or push any change).

After about a minute the site is live at **https://anirudh6415.github.io/ai-infra-roadmap/**.

It's served under your `anirudh6415.github.io` domain but from its own repo, so rebuilding your al-folio profile site never affects it. Just don't create a page called `ai-infra-roadmap` there.

## 3. Allow the workflows to write

Repo → **Settings → Actions → General → Workflow permissions** → **Read and write permissions** → Save.

## 4. Test the Quick update flow

1. Open the site → **+ log progress**.
2. Tick a task you finished (e.g. *W01.1 Roadmap site is live*), type something in **did**, press **submit via github**.
3. GitHub opens a pre-filled issue. Press **Submit new issue**.
4. Watch the **Actions** tab: *Quick log → progress log* runs, commits, redeploys and closes the issue.
5. After about a minute the entry appears on the homepage, the log page and the README, and the task is ticked everywhere.

Only issues **you** (the repo owner) open with a title starting `[log]` are logged. Anyone else's `[log]` issue is closed and locked automatically, and nothing is written.

---

## Where things live

```text
content/                 ← everything you write (plain Markdown)
  home.md                  "About this roadmap" section on the homepage
  skills.md                skill tables (status = last column, set from ticks)
  roadmap/phase-1..4.md    weeks + checkboxes  → drive all progress bars
  roadmap/index.md         calendar, topic map, compute, parking lot
  projects/*.md            project specs (status is computed from ticks)
  resources.md, people.md, progress-log.md, notes/*, archive/*
src/config.mjs           ← site name, repo, start date, phase & project metadata
src/styles/global.css    ← the design (colour tokens at the top)
src/pages, src/components, src/lib   ← templates and the Markdown parsers
scripts/                 ← README updater + quick-log appender (Python)
.github/workflows/       ← deploy + quick-log automation
```

## Day-to-day

| I want to… | Do this |
|---|---|
| Log progress and tick tasks | **+ log progress** on the site, or a **Quick log** issue in the GitHub app (Completed: `W01.2` or the task text, one per line) |
| Tick a task without logging | Open a phase page → *edit this phase on GitHub* → change `- [ ]` to `- [x]` |
| Mark a mini-project shipped | Tick *Mini-project shipped* for that week in the log form |
| Update a project's status | Nothing to do: it follows the ticks in its phase |
| Update a skill's status | Nothing to do: it follows the ticks in the weeks listed under **Weeks** |
| Link a mini-project or project repo | Paste the URL in the log form's *mini-project repo* / *project repo* field |
| Add a resource | Add a row in `content/resources.md` |
| Add a note | Copy `content/notes/template.md` to a new file. It appears in the sidebar automatically |
| Add any page | Drop a `.md` file anywhere in `content/`; it's published at the matching URL |
| Preview locally | `npm install` then `npm run dev`, open http://localhost:4321/ai-infra-roadmap/ |

Every push to `main` rebuilds the site and refreshes the README progress block.

## Writing rules the site understands

| Markdown | Renders as |
|---|---|
| `### Week 7 · Title` in a phase file | A week row (keep this exact pattern) |
| `### Week 5 · Title (light week)` | Hatched square on the timeline + "LIGHT WEEK" tag |
| `- **Learn:** …`, `- **Build:** …`, `- **Ship:** …` | The learn / build / ship table |
| `- **Mini-project:** \`name\`: what you ship.` | The week's mini-project (also listed on Projects → weekly) |
| A number or range in the **Week** column of `content/resources.md` | That resource appears in the week's **Read** row |
| `- [ ]` / `- [x]` | Tasks; counted for every progress bar |
| `!!! tip "Title"` + indented lines | A callout box (`tip`, `warning`, `danger`, `abstract`…) |
| `??? example "Title"` + indented lines | A collapsible callout |
| ```` ```formula ```` | Dark terminal box labelled FORMULA |
| ```` ```text ```` | Dark terminal box labelled DIAGRAM |
| `[link](../notes/kv-cache-math.md)` | Links between Markdown files just work |

## How the pieces fit

```text
content/*.md ──push──▶ deploy.yml ──▶ update_readme.py ──▶ commit README
                                  └─▶ npm run build (Astro) ──▶ GitHub Pages

"+ log progress" ──▶ pre-filled "[log]" issue ──▶ quick-log.yml
    ├─ owner's issue  ──▶ append_log.py (log entry + tick tasks) ──▶ update_readme.py ──▶ commit ──▶ close ──▶ deploy.yml
    └─ anyone else's  ──▶ close + lock, nothing logged
```

## Design

- **Light theme:** datasheet (Archivo + IBM Plex Mono, hairline rules, spec tables).
- **Dark theme:** terminal (monospace body, green accent). Follows the system setting; the ◐ button switches and remembers the choice.
- Colours are tokens at the top of `src/styles/global.css`. Change `--accent` to recolour progress everywhere.
- Fonts are self-hosted from npm packages, so the site makes no requests to Google.

## Troubleshooting

| Symptom | Fix |
|---|---|
| Deploy fails with "Pages not enabled" | Step 2: set Pages source to **GitHub Actions** |
| README commit fails with 403 | Step 3: enable read and write workflow permissions |
| Quick log issue isn't processed | Title must start with `[log]` and the issue must be opened by the repo owner |
| Deployment blocked by environment rules | Settings → Environments → `github-pages` → allow the `main` branch |
| A week is missing from the phase page | Its heading must be `### Week N · Title` |
| Build fails after editing | Check the Actions log; the error names the file. Usually an unclosed table row or heading pattern |
