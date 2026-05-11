/**
 * Showcase — Professional Component Documentation
 *
 * Sidebar-based browser with grouped navigation, search, tabs
 * (Preview / Código PHP / Props), configurable preview background,
 * and syntax-highlighted source view.
 *
 * The PHP template engine (get_template_part resolver) is preserved
 * from the original implementation — see "PHP TEMPLATE ENGINE" section.
 */

// ═══════════════════════════════════════════════════════════════
// COMPONENT REGISTRY
// ═══════════════════════════════════════════════════════════════

const FIGMA_BASE = 'https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=';

const FOUNDATIONS = [
  { label: 'Tokens',      href: './tokens.html' },
  { label: 'Tipografia',  href: './typography.html' },
  { label: 'Iconografia', href: './icons.html' },
];

const COMPONENTS = [
  { name: 'Ad Frame',                       file: '/src/components/ad-frame.php',                  figma: '30:5047',    v: 7,  partial: false },
  { name: 'Author Summary',                 file: '/src/components/author-summary.php',            figma: '791:8418',   v: 4,  partial: false },
  { name: 'Authors Carousel',               file: '/src/components/authors-carousel.php',          figma: '3454:13759', v: 6,  partial: false },
  { name: 'Avatar',                          file: '/src/components/avatar.php',                   figma: '751:3445',   v: 4,  partial: true },
  { name: 'Avatar Stack',                    file: '/src/components/avatar-stack.php',              figma: '3422:29955', v: 5,  partial: false },
  { name: 'Banner Download',                file: '/src/components/banner-download.php',            figma: '925:11171',  v: 4,  partial: false },
  { name: 'Banner Newsletter',              file: '/src/components/banner-newsletter.php',          figma: '1188:11621', v: 4,  partial: false },
  { name: 'Bottom sheet',                   file: '/src/components/bottom-sheet.php',               figma: '3190:48964', v: 2,  partial: false },
  { name: 'Button [1.1]',                   file: '/src/components/button.php',                     figma: '3185:47973', v: 81, partial: true },
  { name: 'Card Colunista',                 file: '/src/components/card-colunista.php',             figma: '1352:23176', v: 2,  partial: false },
  { name: 'Categoria',                      file: '/src/components/categoria.php',                  figma: '71:6699',    v: 28, partial: true },
  { name: 'Checkboxes',                     file: '/src/components/checkboxes.php',                 figma: '1944:7508',  v: 15, partial: true },
  { name: 'Divider',                        file: '/src/components/divider.php',                    figma: '56:6360',    v: 2,  partial: true },
  { name: 'Download Section',               file: '/src/components/download-section.php',           figma: '1135:18229', v: 6,  partial: false },
  { name: 'Dropdown Menu',                  file: '/src/components/dropdown-menu.php',              figma: '1859:23264', v: 3,  partial: false },
  { name: 'Filter chip',                    file: '/src/components/filter-chip.php',                figma: '1859:18460', v: 48, partial: false },
  { name: 'Footer',                         file: '/src/components/footer.php',                     figma: '335:9364',   v: 2,  partial: false },
  { name: 'Header',                         file: '/src/components/header.php',                     figma: '181:4186',   v: 6,  partial: false },
  { name: 'Header Author',                  file: '/src/components/header-author.php',              figma: '850:5000',   v: 4,  partial: false },
  { name: 'Header Informa',                 file: '/src/components/header-informa.php',             figma: '110:3575',   v: 4,  partial: false },
  { name: 'Highlight Post',                 file: '/src/components/highlight-post.php',             figma: '3104:56651', v: 2,  partial: false },
  { name: 'Icon Button [1.0]',              file: '/src/components/icon-button.php',                figma: '71:6001',    v: 27, partial: true },
  { name: 'Image',                          file: '/src/components/image.php',                      figma: '30:3878',    v: 9,  partial: true },
  { name: 'Link Button',                    file: '/src/components/link-button.php',                figma: '662:11195',  v: 12, partial: true },
  { name: 'Loading Button [1.0]',           file: '/src/components/loading-button.php',             figma: '71:6026',    v: 3,  partial: false },
  { name: 'Menu list item',                 file: '/src/components/menu-list-item.php',             figma: '1859:23314', v: 5,  partial: false },
  { name: 'Nav Item',                       file: '/src/components/nav-item.php',                   figma: '121:2360',   v: 4,  partial: true },
  { name: 'News Card 2.0',                  file: '/src/components/news-card.php',                  figma: '1709:7090',  v: 12, partial: false },
  { name: 'News Card 2.0 / Patrocinado',    file: '/src/components/news-card-patrocinado.php',     figma: '2358:14810', v: 12, partial: false },
  { name: 'Pagination',                     file: '/src/components/pagination.php',                 figma: '4541:15460', v: 2,  partial: false },
  { name: 'Password Strength',              file: '/src/components/password-strength.php',          figma: '',           v: 4,  partial: true },
  { name: 'Play Button 2.0',               file: '/src/components/play-button.php',                 figma: '2279:19957', v: 24, partial: true },
  { name: 'Podcast Card 2.0',              file: '/src/components/podcast-card.php',                figma: '2283:2779',  v: 12, partial: false },
  { name: 'Podcast Card 2.0 / Patrocinado', file: '/src/components/podcast-card-patrocinado.php',  figma: '2359:15151', v: 10, partial: false },
  { name: 'Podcast Image',                  file: '/src/components/podcast-image.php',              figma: '2279:20059', v: 10, partial: false },
  { name: 'Profile Progress',               file: '/src/components/profile-progress.php',           figma: '',           v: 4,  partial: true },
  { name: 'Relacionadas',                   file: '/src/components/relacionadas.php',               figma: '3104:53873', v: 2,  partial: false },
  { name: 'Resumo Box',                     file: '/src/components/resumo-box.php',                 figma: '619:7291',   v: 4,  partial: false },
  { name: 'Search bar',                     file: '/src/components/search-bar.php',                 figma: '1776:19053', v: 8,  partial: true },
  { name: 'Search view full-screen',        file: '/src/components/search-view.php',                figma: '3148:50619', v: 4,  partial: false },
  { name: 'Section Title / Style 1',        file: '/src/components/section-title-style-1.php',      figma: '552:9108',   v: 18, partial: true },
  { name: 'Section Title / Style 2',        file: '/src/components/section-title-style-2.php',      figma: '552:5123',   v: 18, partial: true },
  { name: 'Side Menu',                      file: '/src/components/side-menu.php',                  figma: '986:9198',   v: 4,  partial: false },
  { name: 'Sponsor Line / Sponsor Box',     file: '/src/components/sponsor-line.php',               figma: '2676:8328',  v: 2,  partial: true },
  { name: 'Tag',                            file: '/src/components/tag.php',                        figma: '567:9604',   v: 2,  partial: true },
  { name: 'Text field',                     file: '/src/components/text-field.php',                 figma: '1757:14338', v: 6,  partial: true },
  { name: 'Toast',                          file: '/src/components/toast.php',                      figma: '',           v: 4,  partial: true },
  { name: 'Tooltip',                        file: '/src/components/tooltip.php',                    figma: '1859:19519', v: 4,  partial: false },
  { name: 'Video Card 2.0',                 file: '/src/components/video-card.php',                 figma: '1678:20955', v: 14, partial: false },
  { name: 'Video Card 2.0 / Inverse',       file: '/src/components/video-card-inverse.php',        figma: '2803:26398', v: 14, partial: false },
  { name: 'Video Container',                file: '/src/components/video-container.php',            figma: '872:7575',   v: 1,  partial: false },
  { name: 'Video Image 2.0',                file: '/src/components/video-image.php',                figma: '2790:25832', v: 8,  partial: false },
  { name: 'Webstories',                     file: '/src/components/webstories.php',                 figma: '202:2100',   v: 2,  partial: false },
  { name: 'Widget / Em Alta',               file: '/src/components/widget-em-alta.php',             figma: '3492:42255', v: 2,  partial: false },
  { name: 'Widget / Podcast',               file: '/src/components/widget-podcast.php',             figma: '3074:48896', v: 2,  partial: false },
];

// ═══════════════════════════════════════════════════════════════
// PHP TEMPLATE ENGINE  (preserved — resolves get_template_part)
// ═══════════════════════════════════════════════════════════════

const INCLUDE_RE = /<\?php\s+get_template_part\(\s*'([^']+)'\s*,\s*null\s*(?:,\s*(\[[\s\S]*?\]))?\s*\)\s*;?\s*\?>/g;
const ECHO_RE    = /<\?=\s*([^?]*?)\s*\?>/g;
const IF_RE      = /<\?php\s+if\s*\(([^)]*?)\)\s*:\s*\?>((?:(?!<\?php\s+if|<\?php\s+endif|<\?php\s+else)[\s\S])*?)(?:<\?php\s+else\s*:\s*\?>((?:(?!<\?php\s+if|<\?php\s+endif|<\?php\s+else)[\s\S])*?))?<\?php\s+endif;\s*\?>/g;

function stripPhpHeader(source) {
  const withDocblock = /^\s*<\?php\s*\/\*\*[\s\S]*?\*\/\s*\?>\s*/;
  if (withDocblock.test(source)) return source.replace(withDocblock, '');
  return source.replace(/^\s*<\?php[\s\S]*?\?>\s*/, '');
}

function parsePhpArray(literal) {
  const inner = literal.trim().slice(1, -1);
  const result = {};
  const re = /'(\w+)'\s*=>\s*(?:'([^']*)'|(true|false|null)|(\d+))/g;
  let m;
  while ((m = re.exec(inner)) !== null) {
    const key = m[1];
    if (m[2] !== undefined)       result[key] = m[2];
    else if (m[3] === 'true')     result[key] = true;
    else if (m[3] === 'false')    result[key] = false;
    else if (m[3] === 'null')     result[key] = null;
    else if (m[4] !== undefined)  result[key] = parseInt(m[4], 10);
  }
  return result;
}

function evalExpr(expr, args) {
  expr = expr.trim();
  let m;
  if ((m = expr.match(/^\$args\['(\w+)'\]$/))) return args[m[1]];
  if ((m = expr.match(/^'([^']*)'$/)))          return m[1];
  console.warn('[showcase] unsupported partial expression:', expr);
  return '';
}

function evalCondition(expr, args) {
  expr = expr.trim();
  let m;
  if ((m = expr.match(/^\$args\['(\w+)'\]\s*===\s*'([^']*)'$/))) return args[m[1]] === m[2];
  if ((m = expr.match(/^\$args\['(\w+)'\]\s*!==\s*'([^']*)'$/))) return args[m[1]] !== m[2];
  if ((m = expr.match(/^!\s*\$args\['(\w+)'\]$/)))                return !args[m[1]];
  if ((m = expr.match(/^\$args\['(\w+)'\]$/)))                    return !!args[m[1]];
  console.warn('[showcase] unsupported partial condition:', expr);
  return false;
}

function resolveIfs(body, args) {
  let prev, safety = 50;
  while (safety-- > 0) {
    prev = body;
    body = body.replace(IF_RE, (_match, cond, ifBody, elseBody = '') =>
      evalCondition(cond, args) ? ifBody : elseBody);
    if (body === prev) break;
  }
  return body;
}

function resolveEchoes(body, args) {
  return body.replace(ECHO_RE, (_, expr) => {
    const val = evalExpr(expr, args);
    return val == null ? '' : String(val);
  });
}

function resolveArgsRefs(body, args) {
  return body.replace(/\$args\['(\w+)'\]/g, (_, key) => {
    const val = args[key];
    if (val === true)  return 'true';
    if (val === false) return 'false';
    if (val == null)   return 'null';
    if (typeof val === 'number') return String(val);
    return `'${val}'`;
  });
}

function renderPartial(rawSource, args) {
  let body = stripPhpHeader(rawSource);
  body = resolveIfs(body, args);
  body = resolveEchoes(body, args);
  body = resolveArgsRefs(body, args);
  return body;
}

async function resolveIncludes(body, depth = 0) {
  if (depth > 10) { console.error('[showcase] include nesting depth exceeded'); return body; }
  const matches = [...body.matchAll(INCLUDE_RE)];
  if (matches.length === 0) return body;
  const rendered = await Promise.all(matches.map(async (m) => {
    const slug = m[1];
    const args = m[2] ? parsePhpArray(m[2]) : {};
    const url  = `/src/${slug}.php`;
    const res  = await fetch(url + '?_=' + Date.now());
    if (!res.ok) throw new Error(`partial fetch failed: ${url} → HTTP ${res.status}`);
    const partialSource = await res.text();
    let partialBody = renderPartial(partialSource, args);
    partialBody = await resolveIncludes(partialBody, depth + 1);
    return partialBody;
  }));
  for (let i = matches.length - 1; i >= 0; i--) {
    const m = matches[i];
    body = body.slice(0, m.index) + rendered[i] + body.slice(m.index + m[0].length);
  }
  return body;
}

// ═══════════════════════════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════════════════════════

function esc(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function figmaUrl(nodeId) {
  return FIGMA_BASE + nodeId.replace(':', '-');
}

function slug(comp) {
  return comp.file.split('/').pop().replace('.php', '');
}

async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; }
  catch { return false; }
}

// ═══════════════════════════════════════════════════════════════
// SYNTAX HIGHLIGHTER  (simple tokenizer for PHP)
// ═══════════════════════════════════════════════════════════════

function highlightPhp(code) {
  const out = [];
  let i = 0;
  const len = code.length;

  while (i < len) {
    // Multi-line comment
    if (code[i] === '/' && code[i + 1] === '*') {
      const end = code.indexOf('*/', i + 2);
      const j = end === -1 ? len : end + 2;
      out.push('<span class="hl-cmt">' + esc(code.slice(i, j)) + '</span>');
      i = j; continue;
    }
    // Single-line comment
    if (code[i] === '/' && code[i + 1] === '/') {
      const end = code.indexOf('\n', i);
      const j = end === -1 ? len : end;
      out.push('<span class="hl-cmt">' + esc(code.slice(i, j)) + '</span>');
      i = j; continue;
    }
    // Single-quoted string
    if (code[i] === "'") {
      let j = i + 1;
      while (j < len && code[j] !== "'") { if (code[j] === '\\') j++; j++; }
      j = Math.min(j + 1, len);
      out.push('<span class="hl-str">' + esc(code.slice(i, j)) + '</span>');
      i = j; continue;
    }
    // Double-quoted string
    if (code[i] === '"') {
      let j = i + 1;
      while (j < len && code[j] !== '"') { if (code[j] === '\\') j++; j++; }
      j = Math.min(j + 1, len);
      out.push('<span class="hl-str">' + esc(code.slice(i, j)) + '</span>');
      i = j; continue;
    }
    // PHP tags
    if (code.startsWith('<?php', i)) {
      out.push('<span class="hl-tag">' + esc('<?php') + '</span>');
      i += 5; continue;
    }
    if (code.startsWith('<?=', i)) {
      out.push('<span class="hl-tag">' + esc('<?=') + '</span>');
      i += 3; continue;
    }
    if (code.startsWith('?>', i)) {
      out.push('<span class="hl-tag">' + esc('?>') + '</span>');
      i += 2; continue;
    }
    // Variable
    if (code[i] === '$') {
      let j = i + 1;
      while (j < len && /\w/.test(code[j])) j++;
      out.push('<span class="hl-var">' + esc(code.slice(i, j)) + '</span>');
      i = j; continue;
    }
    // Number
    if (/\d/.test(code[i]) && (i === 0 || !/\w/.test(code[i - 1]))) {
      let j = i;
      while (j < len && /[\d.]/.test(code[j])) j++;
      out.push('<span class="hl-num">' + esc(code.slice(i, j)) + '</span>');
      i = j; continue;
    }
    // Word / keyword
    if (/[a-zA-Z_]/.test(code[i])) {
      let j = i + 1;
      while (j < len && /\w/.test(code[j])) j++;
      const w = code.slice(i, j);
      const KW = new Set(['if','else','elseif','endif','foreach','endforeach','as',
        'function','return','echo','null','true','false','class','extends','new',
        'get_template_part','array','isset','empty','include','require','switch',
        'case','break','default','while','endwhile','for','endfor']);
      if (KW.has(w)) out.push('<span class="hl-kw">' + esc(w) + '</span>');
      else out.push(esc(w));
      i = j; continue;
    }
    // Plain chars (batch)
    let j = i;
    while (j < len && !/[\/'"$a-zA-Z_0-9]/.test(code[j])
      && !(code[j] === '<' && code[j + 1] === '?')
      && !(code[j] === '?' && code[j + 1] === '>')) j++;
    if (j === i) j = i + 1;
    out.push(esc(code.slice(i, j)));
    i = j;
  }
  return out.join('');
}

// ═══════════════════════════════════════════════════════════════
// HEADER PARSER  (extracts metadata from PHP docblock comments)
// ═══════════════════════════════════════════════════════════════

function parseHeader(raw) {
  const docMatch = raw.match(/^<\?php\s*\/\*\*([\s\S]*?)\*\//);
  if (!docMatch) return null;
  const block = docMatch[1];
  const lines = block.split('\n').map(l => l.replace(/^\s*\*\s?/, '').trim()).filter(Boolean);

  const info = { lines, variants: '', tokens: '', figma: '', props: [] };

  let inProps = false;
  for (const line of lines) {
    if (/^Variantes?:/i.test(line))    { info.variants = line.replace(/^Variantes?:\s*/i, ''); inProps = false; }
    else if (/^Tokens? usados?:/i.test(line)) { info.tokens = line.replace(/^Tokens? usados?:\s*/i, ''); inProps = false; }
    else if (/^Figma:/i.test(line))    { info.figma = line.replace(/^Figma:\s*/i, ''); inProps = false; }
    else if (/^PROPS?\s*\(\$args\)/i.test(line)) { inProps = true; }
    else if (inProps && /^\w+\s*[→\-–]/.test(line)) {
      const pm = line.match(/^(\w+)\s*[→\-–]\s*(.*)/);
      if (pm) info.props.push({ name: pm[1], desc: pm[2] });
    } else if (inProps && line === '') { inProps = false; }
  }
  return info;
}

// ═══════════════════════════════════════════════════════════════
// UI STATE
// ═══════════════════════════════════════════════════════════════

let activeComp = null;
let activeTab  = 'preview';
let activeBg   = 'light';
const cache    = {};          // keyed by file path → { raw, html }

const $main    = document.getElementById('main');
const $nav     = document.getElementById('nav');
const $search  = document.getElementById('search');
const $sidebar = document.getElementById('sidebar');
const $overlay = document.getElementById('overlay');
const $hamburger = document.getElementById('hamburger');

// ═══════════════════════════════════════════════════════════════
// SIDEBAR NAVIGATION
// ═══════════════════════════════════════════════════════════════

function buildNav() {
  let html = '';

  // Foundations — links to separate pages
  html += `<p class="doc-nav__group">Foundations</p>`;
  for (const f of FOUNDATIONS) {
    html += `<a class="doc-nav__item" href="${f.href}" style="opacity:.7">${esc(f.label)}</a>`;
  }

  // Components — flat A→Z list
  html += `<p class="doc-nav__group">Componentes <span style="opacity:.5">${COMPONENTS.length}</span></p>`;
  for (const comp of COMPONENTS) {
    html += `<a class="doc-nav__item" data-file="${esc(comp.file)}">`
      + `${esc(comp.name)}`
      + `<span class="doc-nav__vcount">${comp.v}</span></a>`;
  }

  $nav.innerHTML = html;

  // Click handlers (only for component items, not foundation links)
  $nav.querySelectorAll('.doc-nav__item[data-file]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const comp = COMPONENTS.find(c => c.file === el.dataset.file);
      if (comp) selectComponent(comp);
    });
  });

  document.getElementById('totalCount').textContent = COMPONENTS.length + ' componentes';
}

function filterNav(query) {
  const q = query.toLowerCase().trim();
  const groups = $nav.querySelectorAll('.doc-nav__group');
  const items  = $nav.querySelectorAll('.doc-nav__item');

  items.forEach(el => {
    const visible = !q || el.textContent.toLowerCase().includes(q);
    el.hidden = !visible;
  });

  // Hide empty group headers
  groups.forEach(groupEl => {
    let next = groupEl.nextElementSibling;
    let hasVisible = false;
    while (next && !next.classList.contains('doc-nav__group')) {
      if (!next.hidden) hasVisible = true;
      next = next.nextElementSibling;
    }
    groupEl.hidden = !hasVisible;
  });
}

function setActiveNav(comp) {
  $nav.querySelectorAll('.doc-nav__item').forEach(el => {
    el.classList.toggle('is-active', el.dataset.file === comp.file);
  });
}

// ═══════════════════════════════════════════════════════════════
// MOBILE SIDEBAR
// ═══════════════════════════════════════════════════════════════

function openSidebar()  { $sidebar.classList.add('is-open');  $overlay.classList.add('is-open'); }
function closeSidebar() { $sidebar.classList.remove('is-open'); $overlay.classList.remove('is-open'); }

// ═══════════════════════════════════════════════════════════════
// WELCOME SCREEN
// ═══════════════════════════════════════════════════════════════

function renderWelcome() {
  // Foundation cards (link to external pages)
  let foundationCards = '';
  for (const f of FOUNDATIONS) {
    foundationCards += `<a href="${f.href}" class="doc-welcome__card">
      <p class="doc-welcome__card-title">${esc(f.label)}</p>
    </a>`;
  }

  // First 8 components as quick-access cards
  let compCards = '';
  const featured = COMPONENTS.slice(0, 8);
  for (const comp of featured) {
    compCards += `<div class="doc-welcome__card" data-file="${esc(comp.file)}">
      <p class="doc-welcome__card-title">${esc(comp.name)}</p>
      <p class="doc-welcome__card-count">${comp.v} variantes</p>
    </div>`;
  }

  $main.innerHTML = `
    <div class="doc-welcome">
      <h2 class="doc-welcome__title">Component Showcase</h2>
      <p class="doc-welcome__lead">
        Fonte da verdade visual em codigo. ${COMPONENTS.length} componentes em ordem alfabetica.
        Selecione na sidebar ou use a busca.
      </p>
      <p class="doc-welcome__lead" style="margin-top:8px"><strong>Foundations</strong></p>
      <div class="doc-welcome__grid">${foundationCards}</div>
      <p class="doc-welcome__lead" style="margin-top:24px"><strong>Componentes</strong></p>
      <div class="doc-welcome__grid">${compCards}</div>
    </div>`;

  $main.querySelectorAll('.doc-welcome__card[data-file]').forEach(el => {
    el.addEventListener('click', () => {
      const comp = COMPONENTS.find(c => c.file === el.dataset.file);
      if (comp) selectComponent(comp);
    });
  });
}

// ═══════════════════════════════════════════════════════════════
// COMPONENT DETAIL VIEW
// ═══════════════════════════════════════════════════════════════

async function selectComponent(comp) {
  activeComp = comp;
  activeTab  = 'preview';
  setActiveNav(comp);
  closeSidebar();

  // Update URL hash
  history.replaceState(null, '', '#' + slug(comp));

  const fileName = comp.file.split('/').pop();

  // Render shell
  $main.innerHTML = `
    <div class="doc-topbar">
      <h2 class="doc-topbar__name">${esc(comp.name)}</h2>
      <p class="doc-topbar__meta">${comp.v} variante${comp.v > 1 ? 's' : ''} · ${esc(fileName)}</p>
    </div>
    <div class="doc-toolbar" id="toolbar"></div>
    <div class="doc-tabs" id="tabs"></div>
    <div class="doc-content" id="content">
      <div class="doc-loading">Carregando componente...</div>
    </div>
    <div class="doc-status" id="status"></div>`;

  renderToolbar(comp);
  renderTabBar();
  renderStatus(comp);

  // Load data
  try {
    if (!cache[comp.file]) {
      const res = await fetch(comp.file + '?_=' + Date.now());
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const raw  = await res.text();
      const body = stripPhpHeader(raw);
      const html = await resolveIncludes(body);
      cache[comp.file] = { raw, html };
    }
    renderTabContent();
  } catch (err) {
    document.getElementById('content').innerHTML =
      `<div class="doc-error">Erro carregando ${esc(comp.file)}: ${esc(err.message)}</div>`;
  }
}

// ── Toolbar ──

function renderToolbar(comp) {
  const $tb = document.getElementById('toolbar');
  const bgs = [
    { key: 'white',   label: 'White',   color: '#FFFFFF' },
    { key: 'light',   label: 'Light',   color: '#F7F8FA' },
    { key: 'dark',    label: 'Dark',    color: '#002244' },
    { key: 'checker', label: 'Checker', color: null },
  ];

  let bgBtns = '<span class="doc-toolbar__label">Background:</span>';
  for (const bg of bgs) {
    const activeClass = activeBg === bg.key ? ' is-active' : '';
    if (bg.color) {
      bgBtns += `<button class="doc-toolbar__btn${activeClass}" data-bg="${bg.key}" title="${bg.label}">
        <span class="doc-bg-swatch" style="background:${bg.color}"></span></button>`;
    } else {
      bgBtns += `<button class="doc-toolbar__btn${activeClass}" data-bg="checker" title="Checker">
        <span class="doc-bg-swatch" style="background:repeating-conic-gradient(#E9EAEC 0% 25%, #fff 0% 50%) 0 0/8px 8px"></span></button>`;
    }
  }

  $tb.innerHTML = bgBtns
    + '<span class="doc-toolbar__sep"></span>'
    + `<button class="doc-toolbar__btn" id="btnCopy">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
        Copiar codigo</button>`
    + `<a class="doc-toolbar__btn" href="${figmaUrl(comp.figma)}" target="_blank" rel="noopener" style="text-decoration:none">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
        Figma</a>`;

  // BG toggle handlers
  $tb.querySelectorAll('[data-bg]').forEach(btn => {
    btn.addEventListener('click', () => {
      activeBg = btn.dataset.bg;
      $tb.querySelectorAll('[data-bg]').forEach(b => b.classList.toggle('is-active', b.dataset.bg === activeBg));
      const preview = document.getElementById('preview');
      if (preview) {
        preview.className = 'doc-preview doc-preview--' + activeBg;
      }
    });
  });

  // Copy handler
  document.getElementById('btnCopy').addEventListener('click', async () => {
    const btn = document.getElementById('btnCopy');
    if (cache[comp.file]) {
      const ok = await copyText(cache[comp.file].raw);
      const orig = btn.innerHTML;
      btn.innerHTML = ok
        ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg> Copiado!'
        : 'Erro';
      setTimeout(() => { btn.innerHTML = orig; }, 1500);
    }
  });
}

// ── Tab Bar ──

function renderTabBar() {
  const $tabs = document.getElementById('tabs');
  const tabs = [
    { key: 'preview', label: 'Preview' },
    { key: 'code',    label: 'Codigo PHP' },
    { key: 'props',   label: 'Props / Variantes' },
  ];
  $tabs.innerHTML = tabs.map(t =>
    `<button class="doc-tab${activeTab === t.key ? ' is-active' : ''}" data-tab="${t.key}">${t.label}</button>`
  ).join('');

  $tabs.querySelectorAll('.doc-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      activeTab = btn.dataset.tab;
      $tabs.querySelectorAll('.doc-tab').forEach(b => b.classList.toggle('is-active', b.dataset.tab === activeTab));
      renderTabContent();
    });
  });
}

// ── Status Bar ──

function renderStatus(comp) {
  const $s = document.getElementById('status');
  let html = '<span class="doc-badge doc-badge--ok">&#10003; Validado contra Figma</span>';
  if (comp.partial) {
    html += '<span class="doc-badge doc-badge--info">&#9889; Partial disponivel</span>';
  }
  html += `<a class="doc-status__link" href="${figmaUrl(comp.figma)}" target="_blank" rel="noopener">&#8599; Abrir frame no Figma</a>`;
  $s.innerHTML = html;
}

// ── Tab Content Renderers ──

function renderTabContent() {
  const $c = document.getElementById('content');
  if (!cache[activeComp.file]) {
    $c.innerHTML = '<div class="doc-loading">Carregando...</div>';
    return;
  }
  const data = cache[activeComp.file];

  switch (activeTab) {
    case 'preview': renderPreviewTab($c, data);  break;
    case 'code':    renderCodeTab($c, data);      break;
    case 'props':   renderPropsTab($c, data);     break;
  }
}

function renderPreviewTab($c, data) {
  $c.innerHTML = `<div id="preview" class="doc-preview doc-preview--${activeBg}">${data.html}</div>`;
}

function renderCodeTab($c, data) {
  $c.innerHTML = `<div class="doc-code">
    <button class="doc-code__copy" id="codeCopy">Copiar</button>
    <pre><code>${highlightPhp(data.raw)}</code></pre>
  </div>`;

  document.getElementById('codeCopy').addEventListener('click', async () => {
    const btn = document.getElementById('codeCopy');
    const ok = await copyText(data.raw);
    btn.textContent = ok ? 'Copiado!' : 'Erro';
    setTimeout(() => { btn.textContent = 'Copiar'; }, 1500);
  });
}

function renderPropsTab($c, data) {
  const meta = parseHeader(data.raw);
  if (!meta) {
    $c.innerHTML = '<p style="color:var(--c-muted);font-size:13px">Nenhum docblock encontrado neste componente.</p>';
    return;
  }

  let html = '';

  // Variants
  if (meta.variants) {
    html += `<div class="doc-props-section">
      <h3>Variantes</h3>
      <p style="font-size:13px;color:var(--c-base);margin:0">${esc(meta.variants)}</p>
    </div>`;
  }

  // Tokens
  if (meta.tokens) {
    html += `<div class="doc-props-section">
      <h3>Tokens usados</h3>
      <p style="font-size:13px;margin:0">${meta.tokens.split(/[,·]/).map(t =>
        `<code>${esc(t.trim())}</code>`).join(' ')}</p>
    </div>`;
  }

  // Props table
  if (meta.props.length > 0) {
    html += `<div class="doc-props-section">
      <h3>Props ($args)</h3>
      <table class="doc-props-table">
        <thead><tr><th>Prop</th><th>Descricao</th></tr></thead>
        <tbody>${meta.props.map(p =>
          `<tr><td><code>${esc(p.name)}</code></td><td>${esc(p.desc)}</td></tr>`
        ).join('')}</tbody>
      </table>
    </div>`;
  }

  // Full header (always show as reference)
  html += `<div class="doc-props-section">
    <h3>Documentacao completa</h3>
    <div class="doc-props-header">${esc(meta.lines.join('\n'))}</div>
  </div>`;

  $c.innerHTML = html;
}

// ═══════════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════════

function init() {
  buildNav();

  // Search
  $search.addEventListener('input', () => filterNav($search.value));
  $search.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { $search.value = ''; filterNav(''); }
  });

  // Mobile hamburger
  $hamburger.addEventListener('click', () => {
    $sidebar.classList.contains('is-open') ? closeSidebar() : openSidebar();
  });
  $overlay.addEventListener('click', closeSidebar);

  // Deep link via hash
  const hash = location.hash.slice(1);
  if (hash) {
    const comp = COMPONENTS.find(c => slug(c) === hash);
    if (comp) { selectComponent(comp); return; }
  }

  renderWelcome();
}

init();
