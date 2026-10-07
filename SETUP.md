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

> Using a different repo name or GitHub user? Change `owner`, `repo`, `base` and `origin` in **`src/config.mjs`**, and the URLs in `scripts/update_readme.py` and `README.md`.

## 2. Turn on GitHub Pages

1. Repo → **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Repo → **Actions** tab → **Build & deploy site** → **Run workflow** (or push any change).

After about a minute the site is live at **https://anirudh6415.github.io/ai-infra-roadmap/**.

It's served under your `anirudh6415.github.io` domain but from its own repo, so rebuilding your al-folio profile site never affects it. Just don't create a page called `ai-infra-roadmap` there.

## 3. Allow the workflows to write

Repo → **Settings → Actions → General → Workflow permissions** → **Read and write permissions** → Save.

## 4. Set up owner-only logging

Logging writes straight to the repo with a token only you hold, so nobody else can add entries and no issues are involved.

1. GitHub → **Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token**.
2. **Repository access:** *Only select repositories* → `ai-infra-roadmap`.
3. **Permissions:** *Contents → Read and write*. Nothing else.
4. Choose an expiry (e.g. 1 year), generate and copy it.
5. Open `https://anirudh6415.github.io/ai-infra-roadmap/quick-update/`, paste the token, press **unlock**.
6. The **+ log progress** button and the log boxes on the homepage and log page now appear **in this browser only**. Visitors never see them.
7. Save a test entry. A commit lands in `content/progress-log.md`, the site rebuilds, and the entry shows up about a minute later.

Repeat step 5 on your phone if you want to log from there. Press **lock** (or untick *remember on this device*) on shared computers. If a token leaks, revoke it on GitHub and it stops working immediately.

## 5. Turn off Issues (optional)

Logging no longer uses issues, so you can switch them off: **Settings → General → Features → untick Issues**. Delete any old test issues first if you like.

---

## Where things live

```text
content/                 ← everything you write (plain Markdown)
  home.md                  "About this roadmap" section on the homepage
  skills.md                skill tables (status = last column)
  roadmap/phase-1..4.md    weeks + checkboxes  → drive all progress bars
  roadmap/index.md         calendar, topic map, compute, parking lot
  projects/*.md            project specs (Status: line at the top)
  resources.md, people.md, progress-log.md, notes/*, archive/*
src/config.mjs           ← site name, repo, start date, phase & project metadata
src/styles/global.css    ← the design (colour tokens at the top)
src/pages, src/components, src/lib   ← templates and the Markdown parsers
scripts/                 ← README updater (Python)
.github/workflows/       ← build & deploy
```

## Day-to-day

| I want to… | Do this |
|---|---|
| Log progress | **+ log progress** on the site (owner browser only) |
| Tick off a task | Open a phase page → *edit this phase on GitHub* → change `- [ ]` to `- [x]` |
| Update a skill | Last column of `content/skills.md`: ⬜ → 🟨 → ✅ |
| Update a project | `Status:` line at the top of `content/projects/<project>.md` |
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
| `- [ ]` / `- [x]` | Tasks; counted for every progress bar |
| `!!! tip "Title"` + indented lines | A callout box (`tip`, `warning`, `danger`, `abstract`…) |
| `??? example "Title"` + indented lines | A collapsible callout |
| ```` ```formula ```` | Dark terminal box labelled FORMULA |
| ```` ```text ```` | Dark terminal box labelled DIAGRAM |
| `[link](../notes/kv-cache-math.md)` | Links between Markdown files just work |

## How the pieces fit

```text
"+ log progress" (your token) ──▶ GitHub API commit to content/progress-log.md ─┐
editing content/*.md on GitHub or locally ──▶ push ──────────────────────────────┤
                                                                                 ▼
                     deploy.yml ──▶ update_readme.py ──▶ commit README
                                └─▶ npm run build (Astro) ──▶ GitHub Pages
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
| "Token belongs to …" on unlock | The token must be created from the repo owner's account |
| "Can't write to the repo" on save | Token needs *Contents: Read and write* on `ai-infra-roadmap` |
| Log form disappeared | Token expired or was revoked: create a new one and unlock again |
| Deployment blocked by environment rules | Settings → Environments → `github-pages` → allow the `main` branch |
| A week is missing from the phase page | Its heading must be `### Week N · Title` |
| Build fails after editing | Check the Actions log; the error names the file. Usually an unclosed table row or heading pattern |
