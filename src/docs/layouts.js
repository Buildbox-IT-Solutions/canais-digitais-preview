/**
 * Layouts loader (porta o engine de showcase.js)
 *
 * Carrega cada layout listado em LAYOUTS, lê o arquivo .php como
 * texto, remove o bloco <?php ... ?> de header, resolve recursivamente
 * qualquer <?php get_template_part(...) ?> que apareça no body via
 * fetch + render de partial parametrizado, e renderiza dentro de uma
 * <section> dedicada com título visível.
 *
 * Diferenças vs showcase.js:
 *   - Sem painel "source code" lado a lado (layouts são longos demais
 *     pra mostrar source). Apenas o preview.
 *   - <nav> superior é populado dinamicamente com âncoras pra cada
 *     layout cadastrado.
 *   - Containers de layout são full-width (sem max-h scroll por padrão
 *     — layouts vão ser exibidos sequencialmente).
 *
 * Engine subset PHP suportado é IDÊNTICO ao showcase.js. Ver headers
 * dos partials em /src/components/_partials/ pra exemplos.
 *
 * Servir SEMPRE via http://localhost:8000 (não file://). Subir o
 * servidor com `php -S localhost:8000 router.php` (via junction C:\wptheme).
 *
 * O router.php serve layouts como PHP nativo por padrão (preview standalone).
 * Este script usa ?raw pra pedir o source bruto e processar client-side.
 */

const LAYOUTS = [
  // Preenchido conforme cada D# avança.
  // Formato: { name, file, status: 'done'|'wip' }
  { name: '404', file: '/src/layouts/404.php', status: 'done' },
  { name: 'Formulário Newsletter', file: '/src/layouts/form-newsletter.php', status: 'done' },
  { name: 'Formulário Download', file: '/src/layouts/form-download.php', status: 'done' },
  { name: 'Home', file: '/src/layouts/home.php', status: 'done' },
  { name: 'Categoria', file: '/src/layouts/categoria.php', status: 'done' },
  { name: 'Conteúdo', file: '/src/layouts/conteudo.php', status: 'done' },
  { name: 'Menu', file: '/src/layouts/menu.php', status: 'done' },
  { name: 'Busca', file: '/src/layouts/buscar.php', status: 'done' },
  { name: 'Contato', file: '/src/layouts/contato.php', status: 'done' },
  { name: 'Sobre', file: '/src/layouts/sobre.php', status: 'done' },
  { name: 'Anuncie', file: '/src/layouts/anuncie.php', status: 'done' },
];

const layoutsRoot = document.getElementById('layouts');
const layoutsNav = document.getElementById('layouts-nav');

// ─────────────────────────────────────────────────────────────────────
// Partial template engine (cópia 1:1 de showcase.js — subset PHP)
// ─────────────────────────────────────────────────────────────────────

// Allow ] inside $args['...'] expressions within the array literal
const INCLUDE_RE = /<\?php\s+get_template_part\(\s*'([^']+)'\s*,\s*null\s*(?:,\s*(\[[\s\S]*?\]))?\s*\)\s*;?\s*\?>/g;
const ECHO_RE = /<\?=\s*([^?]*?)\s*\?>/g;
const IF_RE = /<\?php\s+if\s*\(([^)]*?)\)\s*:\s*\?>((?:(?!<\?php\s+if|<\?php\s+endif|<\?php\s+else)[\s\S])*?)(?:<\?php\s+else\s*:\s*\?>((?:(?!<\?php\s+if|<\?php\s+endif|<\?php\s+else)[\s\S])*?))?<\?php\s+endif;\s*\?>/g;

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
    if (m[2] !== undefined) result[key] = m[2];
    else if (m[3] === 'true') result[key] = true;
    else if (m[3] === 'false') result[key] = false;
    else if (m[3] === 'null') result[key] = null;
    else if (m[4] !== undefined) result[key] = parseInt(m[4], 10);
  }
  return result;
}

function evalExpr(expr, args) {
  expr = expr.trim();
  let m;
  if ((m = expr.match(/^\$args\['(\w+)'\]$/))) return args[m[1]];
  if ((m = expr.match(/^'([^']*)'$/))) return m[1];
  console.warn('[layouts] unsupported partial expression:', expr);
  return '';
}

function evalCondition(expr, args) {
  expr = expr.trim();
  let m;
  if ((m = expr.match(/^\$args\['(\w+)'\]\s*===\s*'([^']*)'$/))) return args[m[1]] === m[2];
  if ((m = expr.match(/^\$args\['(\w+)'\]\s*!==\s*'([^']*)'$/))) return args[m[1]] !== m[2];
  if ((m = expr.match(/^!\s*\$args\['(\w+)'\]$/))) return !args[m[1]];
  if ((m = expr.match(/^\$args\['(\w+)'\]$/))) return !!args[m[1]];
  console.warn('[layouts] unsupported partial condition:', expr);
  return false;
}

function resolveIfs(body, args) {
  let prev;
  let safety = 50;
  while (safety-- > 0) {
    prev = body;
    body = body.replace(IF_RE, (_match, cond, ifBody, elseBody = '') => {
      return evalCondition(cond, args) ? ifBody : elseBody;
    });
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
    if (val === true) return 'true';
    if (val === false) return 'false';
    if (val == null) return 'null';
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
  if (depth > 10) {
    console.error('[layouts] include nesting depth exceeded');
    return body;
  }
  const matches = [...body.matchAll(INCLUDE_RE)];
  if (matches.length === 0) return body;

  const rendered = await Promise.all(matches.map(async (m) => {
    const slug = m[1];
    const args = m[2] ? parsePhpArray(m[2]) : {};
    const url = `/src/${slug}.php`;
    const res = await fetch(url + '?_=' + Date.now());
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

// ─────────────────────────────────────────────────────────────────────
// Layout rendering
// ─────────────────────────────────────────────────────────────────────

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function renderEmpty() {
  layoutsRoot.innerHTML = `
    <div class="rounded-lg border border-dashed border-neutral-300 bg-white p-8 text-center">
      <p class="text-neutral-500">
        Nenhum layout cadastrado ainda. Adicione entradas em
        <code class="font-mono text-sm">LAYOUTS</code> em
        <code class="font-mono text-sm">src/docs/layouts.js</code>.
      </p>
    </div>
  `;
  layoutsNav.innerHTML = '<span class="text-neutral-500">Nenhum layout cadastrado.</span>';
}

function renderNav() {
  layoutsNav.innerHTML = LAYOUTS.map((l) => {
    const slug = slugify(l.name);
    return `<a href="#${slug}" class="text-secondary-700 underline">${escapeHtml(l.name)}</a>`;
  }).join('');
}

async function renderLayout({ name, file }) {
  const slug = slugify(name);
  const section = document.createElement('section');
  section.id = slug;
  section.className = 'space-y-3';
  section.innerHTML = `
    <header class="flex items-center justify-between">
      <h2 class="text-title-lg font-display font-bold text-primary-600">${escapeHtml(name)}</h2>
      <code class="text-label-sm text-neutral-500 font-mono">${escapeHtml(file)}</code>
    </header>
    <div class="rounded-lg border border-neutral-200 bg-white overflow-hidden" data-preview>
      <p class="p-8 text-neutral-500">carregando...</p>
    </div>
  `;
  layoutsRoot.appendChild(section);

  try {
    const res = await fetch(file + '?raw&_=' + Date.now());
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const raw = await res.text();
    let body = stripPhpHeader(raw);
    body = await resolveIncludes(body);
    section.querySelector('[data-preview]').innerHTML = body;
  } catch (err) {
    console.error('[layouts]', name, err);
    section.querySelector('[data-preview]').innerHTML =
      `<p class="p-8 text-red-600">Erro carregando ${escapeHtml(file)}: ${escapeHtml(err.message)}</p>`;
  }
}

async function init() {
  if (LAYOUTS.length === 0) {
    renderEmpty();
    return;
  }
  layoutsRoot.innerHTML = '';
  renderNav();
  for (const l of LAYOUTS) {
    await renderLayout(l);
  }
}

init();
