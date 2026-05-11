/**
 * DS Shell — Canais Digitais Informa
 * Gerencia: tabs, toggle de bg, busca (Fuse.js), preview de componentes
 *
 * Cada página define window.DS_PAGE = {
 *   section: 'components' | 'templates' | 'foundations',
 *   slug: 'button',
 *   componentFile: '/src/components/button.php',  // opcional
 *   figmaNodeId: '3185:47973'                      // opcional
 * }
 */

// ── Índice de navegação (usado pela busca Fuse.js) ─────────
const DS_NAV = [
  { name: 'Ad Frame',                  slug: 'ad-frame',                  section: 'components', href: '/src/docs/ds/components/ad-frame.html',                  v: 7  },
  { name: 'Author Summary',            slug: 'author-summary',            section: 'components', href: '/src/docs/ds/components/author-summary.html',            v: 4  },
  { name: 'Authors Carousel',          slug: 'authors-carousel',          section: 'components', href: '/src/docs/ds/components/authors-carousel.html',          v: 6  },
  { name: 'Avatar',                    slug: 'avatar',                    section: 'components', href: '/src/docs/ds/components/avatar.html',                    v: 4  },
  { name: 'Avatar Stack',              slug: 'avatar-stack',              section: 'components', href: '/src/docs/ds/components/avatar-stack.html',              v: 5  },
  { name: 'Banner Download',           slug: 'banner-download',           section: 'components', href: '/src/docs/ds/components/banner-download.html',           v: 4  },
  { name: 'Banner Newsletter',         slug: 'banner-newsletter',         section: 'components', href: '/src/docs/ds/components/banner-newsletter.html',         v: 4  },
  { name: 'Bottom Sheet',              slug: 'bottom-sheet',              section: 'components', href: '/src/docs/ds/components/bottom-sheet.html',              v: 2  },
  { name: 'Button',                    slug: 'button',                    section: 'components', href: '/src/docs/ds/components/button.html',                    v: 81 },
  { name: 'Card Colunista',            slug: 'card-colunista',            section: 'components', href: '/src/docs/ds/components/card-colunista.html',            v: 2  },
  { name: 'Categoria',                 slug: 'categoria',                 section: 'components', href: '/src/docs/ds/components/categoria.html',                 v: 28 },
  { name: 'Checkboxes',               slug: 'checkboxes',                section: 'components', href: '/src/docs/ds/components/checkboxes.html',                v: 15 },
  { name: 'Divider',                   slug: 'divider',                   section: 'components', href: '/src/docs/ds/components/divider.html',                   v: 2  },
  { name: 'Download Section',          slug: 'download-section',          section: 'components', href: '/src/docs/ds/components/download-section.html',          v: 6  },
  { name: 'Dropdown Menu',             slug: 'dropdown-menu',             section: 'components', href: '/src/docs/ds/components/dropdown-menu.html',             v: 3  },
  { name: 'Filter Chip',               slug: 'filter-chip',               section: 'components', href: '/src/docs/ds/components/filter-chip.html',               v: 48 },
  { name: 'Footer',                    slug: 'footer',                    section: 'components', href: '/src/docs/ds/components/footer.html',                    v: 2  },
  { name: 'Header',                    slug: 'header',                    section: 'components', href: '/src/docs/ds/components/header.html',                    v: 6  },
  { name: 'Header Author',             slug: 'header-author',             section: 'components', href: '/src/docs/ds/components/header-author.html',             v: 4  },
  { name: 'Header Informa',            slug: 'header-informa',            section: 'components', href: '/src/docs/ds/components/header-informa.html',            v: 4  },
  { name: 'Highlight Post',            slug: 'highlight-post',            section: 'components', href: '/src/docs/ds/components/highlight-post.html',            v: 2  },
  { name: 'Icon Button',               slug: 'icon-button',               section: 'components', href: '/src/docs/ds/components/icon-button.html',               v: 27 },
  { name: 'Image',                     slug: 'image',                     section: 'components', href: '/src/docs/ds/components/image.html',                     v: 9  },
  { name: 'Link Button',               slug: 'link-button',               section: 'components', href: '/src/docs/ds/components/link-button.html',               v: 12 },
  { name: 'Loading Button',            slug: 'loading-button',            section: 'components', href: '/src/docs/ds/components/loading-button.html',            v: 3  },
  { name: 'Menu List Item',            slug: 'menu-list-item',            section: 'components', href: '/src/docs/ds/components/menu-list-item.html',            v: 5  },
  { name: 'Nav Item',                  slug: 'nav-item',                  section: 'components', href: '/src/docs/ds/components/nav-item.html',                  v: 4  },
  { name: 'News Card',                 slug: 'news-card',                 section: 'components', href: '/src/docs/ds/components/news-card.html',                 v: 12 },
  { name: 'News Card Patrocinado',     slug: 'news-card-patrocinado',     section: 'components', href: '/src/docs/ds/components/news-card-patrocinado.html',     v: 12 },
  { name: 'Pagination',                slug: 'pagination',                section: 'components', href: '/src/docs/ds/components/pagination.html',                v: 2  },
  { name: 'Play Button',               slug: 'play-button',               section: 'components', href: '/src/docs/ds/components/play-button.html',               v: 24 },
  { name: 'Podcast Card',              slug: 'podcast-card',              section: 'components', href: '/src/docs/ds/components/podcast-card.html',              v: 12 },
  { name: 'Podcast Card Patrocinado',  slug: 'podcast-card-patrocinado',  section: 'components', href: '/src/docs/ds/components/podcast-card-patrocinado.html',  v: 10 },
  { name: 'Podcast Image',             slug: 'podcast-image',             section: 'components', href: '/src/docs/ds/components/podcast-image.html',             v: 10 },
  { name: 'Relacionadas',              slug: 'relacionadas',              section: 'components', href: '/src/docs/ds/components/relacionadas.html',              v: 2  },
  { name: 'Resumo Box',                slug: 'resumo-box',                section: 'components', href: '/src/docs/ds/components/resumo-box.html',                v: 4  },
  { name: 'Search Bar',                slug: 'search-bar',                section: 'components', href: '/src/docs/ds/components/search-bar.html',                v: 8  },
  { name: 'Search View',               slug: 'search-view',               section: 'components', href: '/src/docs/ds/components/search-view.html',               v: 4  },
  { name: 'Section Title Style 1',     slug: 'section-title-style-1',     section: 'components', href: '/src/docs/ds/components/section-title-style-1.html',     v: 18 },
  { name: 'Section Title Style 2',     slug: 'section-title-style-2',     section: 'components', href: '/src/docs/ds/components/section-title-style-2.html',     v: 18 },
  { name: 'Side Menu',                 slug: 'side-menu',                 section: 'components', href: '/src/docs/ds/components/side-menu.html',                 v: 4  },
  { name: 'Sponsor Line',              slug: 'sponsor-line',              section: 'components', href: '/src/docs/ds/components/sponsor-line.html',              v: 2  },
  { name: 'Tag',                       slug: 'tag',                       section: 'components', href: '/src/docs/ds/components/tag.html',                       v: 2  },
  { name: 'Text Field',                slug: 'text-field',                section: 'components', href: '/src/docs/ds/components/text-field.html',                v: 6  },
  { name: 'Tooltip',                   slug: 'tooltip',                   section: 'components', href: '/src/docs/ds/components/tooltip.html',                   v: 4  },
  { name: 'Video Card',                slug: 'video-card',                section: 'components', href: '/src/docs/ds/components/video-card.html',                v: 14 },
  { name: 'Video Card Inverse',        slug: 'video-card-inverse',        section: 'components', href: '/src/docs/ds/components/video-card-inverse.html',        v: 14 },
  { name: 'Video Container',           slug: 'video-container',           section: 'components', href: '/src/docs/ds/components/video-container.html',           v: 1  },
  { name: 'Video Image',               slug: 'video-image',               section: 'components', href: '/src/docs/ds/components/video-image.html',               v: 8  },
  { name: 'Webstories',                slug: 'webstories',                section: 'components', href: '/src/docs/ds/components/webstories.html',                v: 2  },
  { name: 'Widget Em Alta',            slug: 'widget-em-alta',            section: 'components', href: '/src/docs/ds/components/widget-em-alta.html',            v: 2  },
  { name: 'Widget Podcast',            slug: 'widget-podcast',            section: 'components', href: '/src/docs/ds/components/widget-podcast.html',            v: 2  },
  { name: '404',                       slug: '404',                       section: 'templates',  href: '/src/docs/ds/templates/404.html'  },
  { name: 'Buscar',                    slug: 'buscar',                    section: 'templates',  href: '/src/docs/ds/templates/buscar.html' },
  { name: 'Categoria',                 slug: 'categoria',                 section: 'templates',  href: '/src/docs/ds/templates/categoria.html' },
  { name: 'Conteúdo',                  slug: 'conteudo',                  section: 'templates',  href: '/src/docs/ds/templates/conteudo.html' },
  { name: 'Form Download',             slug: 'form-download',             section: 'templates',  href: '/src/docs/ds/templates/form-download.html' },
  { name: 'Form Newsletter',           slug: 'form-newsletter',           section: 'templates',  href: '/src/docs/ds/templates/form-newsletter.html' },
  { name: 'Home',                      slug: 'home',                      section: 'templates',  href: '/src/docs/ds/templates/home.html' },
  { name: 'Menu',                      slug: 'menu',                      section: 'templates',  href: '/src/docs/ds/templates/menu.html' },
];

// ── Tabs ───────────────────────────────────────────────────
function dsTab(tab, el) {
  document.querySelectorAll('.ds-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');

  const preview  = document.getElementById('ds-preview');
  const code     = document.getElementById('ds-tab-code');
  const props    = document.getElementById('ds-tab-props');
  const guides   = document.getElementById('ds-tab-guidelines');

  if (preview)  preview.style.display  = tab === 'preview'    ? '' : 'none';
  if (code)     code.className         = 'ds-cblock'    + (tab === 'code'       ? ' active' : '');
  if (props)    props.className        = 'ds-ptable'    + (tab === 'props'      ? ' active' : '');
  if (guides)   guides.className       = 'ds-guides'    + (tab === 'guidelines' ? ' active' : '');
}

// ── Toggle background do preview ───────────────────────────
function dsBg(cls, dot) {
  document.querySelectorAll('.ds-bgd').forEach(d => d.classList.remove('active'));
  dot.classList.add('active');
  const pb = document.getElementById('ds-preview');
  if (pb) pb.className = 'ds-pbody' + (cls ? ' ' + cls : '');
}

// ── Copiar código ──────────────────────────────────────────
function dsCopy(btn) {
  const code = document.getElementById('ds-tab-code');
  if (!code) return;
  navigator.clipboard.writeText(code.textContent).then(() => {
    btn.textContent = '✓ Copiado';
    setTimeout(() => btn.textContent = 'Copiar código', 1500);
  });
}

// ── Carregar preview do componente via fetch ───────────────
async function dsLoadPreview() {
  const page = window.DS_PAGE;
  if (!page || !page.componentFile) return;

  const inner = document.getElementById('ds-preview-inner');
  const codeEl = document.getElementById('ds-tab-code');
  if (!inner) return;

  try {
    const res = await fetch(page.componentFile + '?_=' + Date.now());
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const raw = await res.text();

    // Remover header PHP (docblock)
    const body = raw.replace(/^\s*<\?php[\s\S]*?\?>\s*/, '');
    inner.innerHTML = body;

    if (codeEl) codeEl.textContent = raw;
  } catch (err) {
    inner.innerHTML = '<p style="color:#c0392b;font-size:12px">Erro ao carregar preview: ' + err.message + '</p>';
  }
}

// ── Busca com Fuse.js ──────────────────────────────────────
function dsInitSearch() {
  const input   = document.getElementById('ds-search');
  const results = document.getElementById('ds-search-results');
  if (!input || !results || typeof Fuse === 'undefined') return;

  const fuse = new Fuse(DS_NAV, {
    keys: ['name', 'slug', 'section'],
    threshold: 0.35,
    minMatchCharLength: 2,
  });

  input.addEventListener('input', () => {
    const q = input.value.trim();
    if (!q) { results.classList.remove('open'); results.innerHTML = ''; return; }

    const hits = fuse.search(q).slice(0, 8);
    if (!hits.length) { results.classList.remove('open'); return; }

    results.innerHTML = hits.map(({ item }) => `
      <a class="ds-sr-item" href="${item.href}">
        <span class="ds-sr-name">${item.name}</span>
        <span class="ds-sr-cat">${item.section === 'components' ? 'Componente' : 'Template'}</span>
      </a>
    `).join('');
    results.classList.add('open');
  });

  document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !results.contains(e.target)) {
      results.classList.remove('open');
    }
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { results.classList.remove('open'); input.blur(); }
  });
}

// ── Init ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  dsLoadPreview();
  dsInitSearch();
});
