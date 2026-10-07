// Reads content/*.md at build time and derives everything the design shows:
// weeks, tasks, progress, current week, skills, log entries, project status.
// The Markdown files stay the single source of truth.
import { PHASES, PROJECTS, SITE } from '../config.mjs';
import { plain, renderInline, renderMarkdown, url } from './markdown.mjs';

const RAW = import.meta.glob('/content/**/*.md', { query: '?raw', import: 'default', eager: true });

/** All content files as { path: 'roadmap/phase-1.md', raw } */
export function allFiles() {
  return Object.entries(RAW).map(([k, raw]) => ({ path: k.replace(/^\/content\//, ''), raw }));
}

export function getFile(path) {
  const raw = RAW['/content/' + path];
  if (raw === undefined) throw new Error(`Missing content file: content/${path}`);
  return parseFrontmatter(raw);
}

export function parseFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  const data = {};
  let body = raw;
  if (m) {
    body = raw.slice(m[0].length);
    for (const line of m[1].split('\n')) {
      const kv = line.match(/^(\w[\w-]*):\s*(.*)$/);
      if (kv) data[kv[1]] = kv[2].replace(/^["']|["']$/g, '');
    }
  }
  // First H1 becomes the title if the frontmatter has none; strip it from the body.
  const h1 = body.match(/^#\s+(.+)\n/m);
  if (h1 && body.trimStart().startsWith('# ')) {
    data.title = data.title || h1[1].trim();
    body = body.replace(h1[0], '');
  }
  return { data, body };
}

/** h2 headings of a markdown body, for on-page contents boxes. */
export function headings(body) {
  return [...body.matchAll(/^##\s+(.+)$/gm)].map((m) => m[1].trim());
}

/* ------------------------------------------------------------------ dates */

const DAY = 86400000;
function startDate() { return new Date(SITE.start + 'T00:00:00Z'); }

export function weekDates(n) {
  const s = new Date(startDate().getTime() + (n - 1) * 7 * DAY);
  const e = new Date(s.getTime() + 6 * DAY);
  const fmt = (d, withMonth = true) =>
    d.getUTCDate() + (withMonth ? ' ' + d.toLocaleString('en-GB', { month: 'short', timeZone: 'UTC' }).toUpperCase() : '');
  const sameMonth = s.getUTCMonth() === e.getUTCMonth();
  return `${fmt(s, !sameMonth)}–${fmt(e)} ${e.getUTCFullYear()}`;
}

/** Week number the calendar says we're in (0 = before start). */
export function scheduledWeek(now = new Date()) {
  const diff = Math.floor((now.getTime() - startDate().getTime()) / (7 * DAY)) + 1;
  return Math.max(0, Math.min(SITE.totalWeeks, diff));
}

/* ----------------------------------------------------------------- phases */

const TASK = /^\s*[-*]\s+\[( |x|X)\]\s+(.*)$/;

function parseWeek(chunk, phase, file) {
  const [headingLine, ...rest] = chunk.split('\n');
  const num = Number((headingLine.match(/Week\s+(\d+)/) || [])[1]);
  let title = headingLine.replace(/^Week\s+\d+\s*[·:-]\s*/, '').trim();
  const tagMatch = title.match(/\s*\(([^)]*)\)\s*$/);
  const tag = tagMatch ? tagMatch[1] : '';
  if (tagMatch) title = title.slice(0, tagMatch.index).trim();
  const light = /light|holiday/i.test(tag);
  title = plain(title);

  let body = rest.join('\n').replace(/\n-{3,}\s*$/m, '').trim();
  const fields = [];
  const tasks = [];
  for (const line of body.split('\n')) {
    const f = line.match(/^[-*]\s+\*\*([^*:]+):\*\*\s*(.+)$/);
    const t = line.match(TASK);
    if (t) tasks.push({ done: t[1].toLowerCase() === 'x', html: renderInline(t[2], file) });
    else if (f) fields.push({ label: f[1].trim(), html: renderInline(f[2], file), text: plain(f[2]) });
  }
  const done = tasks.filter((t) => t.done).length;
  const learn = fields.find((f) => /learn/i.test(f.label));
  const build = fields.find((f) => /build/i.test(f.label));
  const summary = (build || learn || fields[0] || { text: '' }).text;
  return {
    n: num, code: 'W' + String(num).padStart(2, '0'), id: 'w' + String(num).padStart(2, '0'),
    title, tag, light, phase: phase.n, phaseSlug: phase.slug,
    fields, tasks, done, total: tasks.length,
    complete: tasks.length > 0 && done === tasks.length,
    summary: summary.length > 96 ? summary.slice(0, 94).trimEnd() + '…' : summary,
    dates: weekDates(num),
    href: url(`/roadmap/${phase.slug}/#w${String(num).padStart(2, '0')}`),
  };
}

let _phases;
export function getPhases() {
  if (_phases) return _phases;
  _phases = PHASES.map((meta) => {
    const file = `roadmap/${meta.slug}.md`;
    const { data, body } = getFile(file);
    const chunks = body.split(/^###\s+/m);
    const intro = chunks.shift();
    const weeks = chunks.filter((c) => /^Week\s+\d+/.test(c)).map((c) => parseWeek(c, meta, file));
    const done = weeks.reduce((a, w) => a + w.done, 0);
    const total = weeks.reduce((a, w) => a + w.total, 0);
    // Intro without the "**Weeks …**" date line (shown in the spec table instead)
    const introBody = intro.replace(/^\*\*Weeks[^\n]*\*\*\s*$/m, '').replace(/\n-{3,}\s*$/m, '');
    return {
      ...meta, file, pageTitle: data.title, weeks, done, total,
      pct: total ? Math.round((100 * done) / total) : 0,
      introHtml: renderMarkdown(introBody, file),
      href: url(`/roadmap/${meta.slug}/`),
      projectHref: url(`/projects/${meta.project}/`),
    };
  });
  // status per week & phase
  const all = _phases.flatMap((p) => p.weeks);
  const current = all.find((w) => !w.complete) || all[all.length - 1];
  for (const w of all) {
    w.current = w === current;
    w.status = w.complete ? 'done' : w.current ? 'active' : w.done > 0 ? 'partial' : 'ahead';
    w.pct = w.total ? Math.round((100 * w.done) / w.total) : 0;
  }
  for (const p of _phases) {
    p.active = p.weeks.some((w) => w.current);
    p.complete = p.total > 0 && p.done === p.total;
    p.status = p.complete ? 'done' : p.active ? 'active' : p.done > 0 ? 'partial' : 'ahead';
  }
  return _phases;
}

export function getAllWeeks() { return getPhases().flatMap((p) => p.weeks); }
export function getCurrentWeek() { return getAllWeeks().find((w) => w.current); }

export function getTotals() {
  const phases = getPhases();
  const done = phases.reduce((a, p) => a + p.done, 0);
  const total = phases.reduce((a, p) => a + p.total, 0);
  return { done, total, pct: total ? Math.round((100 * done) / total) : 0 };
}

/* ----------------------------------------------------------------- skills */

const STATUS = [
  { key: 'done', emoji: '✅', label: 'DONE', glyph: '●' },
  { key: 'doing', emoji: '🟨', label: 'ACTIVE', glyph: '◐' },
  { key: 'todo', emoji: '⬜', label: 'TODO', glyph: '○' },
];
export function statusFromEmoji(cell = '') {
  return STATUS.find((s) => cell.includes(s.emoji)) || STATUS[2];
}

export function getSkills() {
  const file = 'skills.md';
  const { data, body } = getFile(file);
  const parts = body.split(/^##\s+/m);
  const intro = parts.shift();
  const groups = parts.map((part) => {
    const [name, ...lines] = part.split('\n');
    const rows = lines
      .filter((l) => l.trim().startsWith('|'))
      .map((l) => l.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim()))
      .filter((cells) => cells.length >= 3 && !/^-+$/.test(cells[0].replace(/:/g, '')) && cells[0] !== 'Skill');
    const skills = rows.map((c) => ({
      name: renderInline(c[0], file),
      depth: plain(c[1] || ''),
      phase: c[2] || '',
      done: c.length > 4 ? renderInline(c[3], file) : '',
      status: statusFromEmoji(c[c.length - 1]),
    }));
    return {
      name: name.trim(), skills,
      done: skills.filter((s) => s.status.key === 'done').length,
      doing: skills.filter((s) => s.status.key === 'doing').length,
    };
  });
  const all = groups.flatMap((g) => g.skills);
  return {
    title: data.title, introHtml: renderMarkdown(intro, file), groups,
    counts: {
      done: all.filter((s) => s.status.key === 'done').length,
      doing: all.filter((s) => s.status.key === 'doing').length,
      todo: all.filter((s) => s.status.key === 'todo').length,
      total: all.length,
    },
  };
}

/* -------------------------------------------------------------------- log */

export function getLog() {
  const file = 'progress-log.md';
  const { data, body } = getFile(file);
  const [introRaw, restRaw = ''] = body.split('<!-- LOG:START -->');
  const entriesRaw = restRaw.split('<!-- LOG:END -->')[0];
  const entries = entriesRaw.split(/^##\s+/m).slice(1).map((chunk) => {
    const [heading, ...rest] = chunk.split('\n');
    const text = rest.join('\n').trim();
    const date = (heading.match(/\d{4}-\d{2}-\d{2}/) || [''])[0];
    const week = (heading.match(/Week\s+(\d+)/) || [])[1];
    const hours = parseFloat((text.match(/\*\*Hours:\*\*\s*([\d.]+)/) || [])[1] || '0') || 0;
    const did = (text.match(/\*\*Did:\*\*\s*(.+)/) || [])[1] || text.split('\n')[0] || '';
    const title = heading.replace(/\d{4}-\d{2}-\d{2}\s*·?\s*/, '').trim();
    return { heading: heading.trim(), title, date, week, hours, did: plain(did.replace(/<br>.*/, ' …')), html: renderMarkdown(text, file) };
  });
  const hours = entries.reduce((a, e) => a + e.hours, 0);
  return { title: data.title, introHtml: renderMarkdown(introRaw, file), entries, hours, streak: streak(entries) };
}

/** Consecutive Monday-based weeks (ending this week or last) that have a log entry. */
function streak(entries) {
  const weekKey = (d) => {
    const t = new Date(d + 'T00:00:00Z');
    const day = (t.getUTCDay() + 6) % 7;
    return new Date(t.getTime() - day * DAY).toISOString().slice(0, 10);
  };
  const keys = new Set(entries.filter((e) => e.date).map((e) => weekKey(e.date)));
  if (!keys.size) return 0;
  let cursor = new Date(weekKey(new Date().toISOString().slice(0, 10)) + 'T00:00:00Z');
  if (!keys.has(cursor.toISOString().slice(0, 10))) cursor = new Date(cursor.getTime() - 7 * DAY);
  let n = 0;
  while (keys.has(cursor.toISOString().slice(0, 10))) { n++; cursor = new Date(cursor.getTime() - 7 * DAY); }
  return n;
}

/* --------------------------------------------------------------- projects */

export function getProjects() {
  return PROJECTS.map((p) => {
    const file = `projects/${p.slug}.md`;
    const { data, body } = getFile(file);
    const metaLine = (body.match(/^\*\*Phase[^\n]*$/m) || [''])[0];
    const status = statusFromEmoji((metaLine.match(/Status:\s*(\S+)/) || [])[1] || '');
    const repoMd = (metaLine.match(/Repo:\s*(\[[^\]]+\]\([^)]+\)|`[^`]+`)/) || [])[1] || '';
    const repoLink = repoMd.match(/\[([^\]]+)\]\(([^)]+)\)/);
    return {
      ...p, file, title: data.title, status,
      repo: repoLink ? { name: repoLink[1], href: repoLink[2] } : { name: repoMd.replace(/`/g, ''), href: '' },
      body: body.replace(metaLine, ''),
      href: url(`/projects/${p.slug}/`),
    };
  });
}

/* ------------------------------------------------------------------ pages */

// Files rendered by their own templates; everything else gets the generic page.
const CUSTOM = new Set([
  'home.md', 'skills.md', 'progress-log.md', 'roadmap/index.md', 'projects/index.md',
  ...PHASES.map((p) => `roadmap/${p.slug}.md`),
  ...PROJECTS.map((p) => `projects/${p.slug}.md`),
]);

export function genericPages() {
  return allFiles()
    .filter((f) => !CUSTOM.has(f.path))
    .map((f) => {
      const slug = f.path.replace(/\.md$/, '').replace(/(^|\/)index$/, '');
      const { data, body } = parseFrontmatter(f.raw);
      return { path: f.path, slug, title: data.title || slug, body };
    });
}

export function notes() {
  return allFiles()
    .filter((f) => f.path.startsWith('notes/') && f.path !== 'notes/index.md')
    .map((f) => ({ path: f.path, title: parseFrontmatter(f.raw).data.title, href: url('/' + f.path.replace(/\.md$/, '/')) }))
    .sort((a, b) => (a.path === 'notes/template.md') - (b.path === 'notes/template.md') || a.title.localeCompare(b.title));
}

export function editUrl(path) {
  return `https://github.com/${SITE.owner}/${SITE.repo}/edit/${SITE.branch}/content/${path}`;
}
