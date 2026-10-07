// Markdown → HTML for content/*.md, with the few extensions this site uses:
//   !!! type "Title"   indented block  → callout box
//   ??? type "Title"   indented block  → collapsible callout
//   ```formula / ```text               → dark terminal box
//   relative links to other .md files  → site URLs (base path aware)
//   - [ ] / - [x]                      → styled task checkboxes
import { Marked } from 'marked';
import { SITE } from '../config.mjs';

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-z]+;/g, '')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-');
}

export function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** Site URL for an internal path like "/roadmap/phase-1/". */
export function url(path = '/') {
  const base = SITE.base.replace(/\/$/, '');
  if (!path.startsWith('/')) path = '/' + path;
  return base + path;
}

/** Resolve a link found in content/<fromFile> to a site URL. */
export function resolveContentLink(href, fromFile) {
  if (!href || /^(https?:|mailto:|tel:|#|\/\/)/i.test(href)) return href;
  const [pathPart, hash] = href.split('#');
  if (!pathPart) return href;
  const fromDir = fromFile.split('/').slice(0, -1);
  const parts = [...fromDir];
  for (const seg of pathPart.split('/')) {
    if (seg === '..') parts.pop();
    else if (seg && seg !== '.') parts.push(seg);
  }
  let p = parts.join('/');
  if (!p.endsWith('.md')) return href; // not a content link (e.g. an asset)
  p = p.replace(/\.md$/, '');
  if (p === 'home') p = '';
  p = p.replace(/(^|\/)index$/, '');
  const site = url('/' + (p ? p + '/' : ''));
  return hash ? `${site}#${hash}` : site;
}

const CALLOUT_LABELS = {
  note: 'Note', abstract: 'Summary', info: 'Info', tip: 'Tip', success: 'Done',
  question: 'Question', warning: 'Warning', failure: 'Failure', danger: 'Important',
  bug: 'Bug', example: 'Example', quote: 'Quote',
};

/** Convert MkDocs-style admonitions into HTML wrappers marked can parse around. */
function preprocessCallouts(src) {
  const lines = src.split('\n');
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^(!!!|\?\?\?\+?)\s+(\w+)(?:\s+"([^"]*)")?\s*$/);
    if (!m) { out.push(lines[i]); continue; }
    const [, kind, type, title] = m;
    const body = [];
    i++;
    while (i < lines.length && (lines[i].startsWith('    ') || lines[i].trim() === '')) {
      // stop at a blank line followed by a non-indented line
      if (lines[i].trim() === '' && i + 1 < lines.length && lines[i + 1].trim() !== '' && !lines[i + 1].startsWith('    ')) break;
      body.push(lines[i].replace(/^ {4}/, ''));
      i++;
    }
    i--;
    const label = escapeHtml(title || CALLOUT_LABELS[type] || type);
    const cls = `callout callout-${type}`;
    if (kind.startsWith('???')) {
      const open = kind.endsWith('+') ? ' open' : '';
      out.push(`<details class="${cls}"${open}><summary>${label}</summary>`, '', ...body, '', '</details>', '');
    } else {
      out.push(`<div class="${cls}"><p class="callout-title">${label}</p>`, '', ...body, '', '</div>', '');
    }
  }
  return out.join('\n');
}

function makeMarked(fromFile) {
  const m = new Marked({ gfm: true });
  m.use({
    walkTokens(token) {
      if (token.type === 'link') token.href = resolveContentLink(token.href, fromFile);
    },
    renderer: {
      heading(token) {
        const text = this.parser.parseInline(token.tokens);
        const id = slugify(token.text);
        return `<h${token.depth} id="${id}">${text}<a class="anchor" href="#${id}" aria-label="Link to this section">#</a></h${token.depth}>\n`;
      },
      code(token) {
        const lang = (token.lang || '').trim();
        const body = escapeHtml(token.text);
        if (lang === 'formula' || lang === 'text') {
          return `<pre class="term term-${lang}"><code>${body}</code></pre>\n`;
        }
        return `<pre class="code"${lang ? ` data-lang="${escapeHtml(lang)}"` : ''}><code>${body}</code></pre>\n`;
      },
    },
  });
  return m;
}

function postprocess(html) {
  return html
    .replace(/<table>/g, '<div class="table-wrap"><table>')
    .replace(/<\/table>/g, '</table></div>')
    .replace(/<li><input /g, '<li class="task"><input ')
    .replace(/<ul>\n<li class="task">/g, '<ul class="tasks">\n<li class="task">');
}

export function renderMarkdown(src, fromFile = 'index.md') {
  return postprocess(makeMarked(fromFile).parse(preprocessCallouts(src)));
}

export function renderInline(src, fromFile = 'index.md') {
  return makeMarked(fromFile).parseInline(src);
}

/** Plain text from a bit of inline markdown (for tooltips and summaries). */
export function plain(src) {
  return String(src)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/(\*\*|__)(.+?)\1/g, '$2')
    .replace(/(^|[^\w*])[*_]([^*_\n]+?)[*_](?=[^\w*]|$)/g, '$1$2')
    .replace(/<[^>]+>/g, '')
    .trim();
}
