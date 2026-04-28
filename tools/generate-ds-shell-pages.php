<?php
/**
 * Generates all non-component DS pages with proper shell structure.
 * Covers: index.html, foundations/*, templates/*
 *
 * Usage: php tools/generate-ds-shell-pages.php
 */

$root = dirname(__DIR__);

// ── Reusable shell parts ────────────────────────────────────

function head($title) {
    return <<<HTML
<!doctype html>
<html lang="pt-br">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{$title} — Canais Digitais DS</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Aleo:wght@400;600;700&family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/src/docs/output.css">
  <link rel="stylesheet" href="/src/docs/ds/assets/ds.css">
</head>
<body>
HTML;
}

function topbar($activeSection) {
    $docs = $activeSection === 'docs' ? ' class="active"' : '';
    $comps = $activeSection === 'components' ? ' class="active"' : '';
    $tpls = $activeSection === 'templates' ? ' class="active"' : '';
    return <<<HTML

<header class="ds-topbar">
  <a class="ds-logo" href="/src/docs/ds/index.html">Canais Digitais <span>DS</span></a>
  <nav class="ds-tnav">
    <a href="/src/docs/ds/index.html"{$docs}>Docs</a>
    <a href="/src/docs/ds/components/avatar.html"{$comps}>Components</a>
    <a href="/src/docs/ds/templates/index.html"{$tpls}>Templates</a>
  </nav>
  <div class="ds-tsearch">
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="white" stroke-width="1.5"><circle cx="6.5" cy="6.5" r="4.5"/><path d="m10 10 3 3"/></svg>
    <input id="ds-search" placeholder="Buscar componente..." autocomplete="off">
    <div id="ds-search-results" class="ds-search-results"></div>
  </div>
  <a class="ds-tlink" href="https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0" target="_blank">↗ Figma</a>
</header>
HTML;
}

function sidebar($activeSidebarId) {
    // Foundations
    $foundations = [
        ['tokens', 'Tokens', '/src/docs/ds/foundations/tokens.html'],
        ['typography', 'Tipografia', '/src/docs/ds/foundations/typography.html'],
        ['icons', 'Ícones', '/src/docs/ds/foundations/icons.html'],
        ['grid', 'Grid', '/src/docs/ds/foundations/grid.html'],
    ];

    // Components
    $components = [
        ['ad-frame', 'Ad Frame', 7], ['author-summary', 'Author Summary', 4],
        ['authors-carousel', 'Authors Carousel', 6], ['avatar', 'Avatar', 4],
        ['avatar-stack', 'Avatar Stack', 5], ['banner-download', 'Banner Download', 4],
        ['banner-newsletter', 'Banner Newsletter', 4], ['bottom-sheet', 'Bottom Sheet', 2],
        ['button', 'Button', 81], ['card-colunista', 'Card Colunista', 2],
        ['categoria', 'Categoria', 28], ['checkboxes', 'Checkboxes', 15],
        ['divider', 'Divider', 2], ['download-section', 'Download Section', 6],
        ['dropdown-menu', 'Dropdown Menu', 3], ['filter-chip', 'Filter Chip', 48],
        ['footer', 'Footer', 2], ['header', 'Header', 6],
        ['header-author', 'Header Author', 4], ['header-informa', 'Header Informa', 4],
        ['highlight-post', 'Highlight Post', 2], ['icon-button', 'Icon Button', 27],
        ['image', 'Image', 9], ['link-button', 'Link Button', 12],
        ['loading-button', 'Loading Button', 3], ['menu-list-item', 'Menu List Item', 5],
        ['nav-item', 'Nav Item', 4], ['news-card', 'News Card', 12],
        ['news-card-patrocinado', 'News Card Patrocinado', 12], ['pagination', 'Pagination', 2],
        ['play-button', 'Play Button', 24], ['podcast-card', 'Podcast Card', 12],
        ['podcast-card-patrocinado', 'Podcast Card Patrocinado', 10], ['podcast-image', 'Podcast Image', 10],
        ['relacionadas', 'Relacionadas', 2], ['resumo-box', 'Resumo Box', 4],
        ['search-bar', 'Search Bar', 8], ['search-view', 'Search View', 4],
        ['section-title-style-1', 'Section Title Style 1', 18], ['section-title-style-2', 'Section Title Style 2', 18],
        ['side-menu', 'Side Menu', 4], ['sponsor-line', 'Sponsor Line', 2],
        ['tag', 'Tag', 2], ['text-field', 'Text Field', 6],
        ['tooltip', 'Tooltip', 4], ['video-card', 'Video Card', 14],
        ['video-card-inverse', 'Video Card Inverse', 14], ['video-container', 'Video Container', 1],
        ['video-image', 'Video Image', 8], ['webstories', 'Webstories', 2],
        ['widget-em-alta', 'Widget Em Alta', 2], ['widget-podcast', 'Widget Podcast', 2],
    ];

    // Templates
    $templates = [
        ['404', '404'], ['buscar', 'Buscar'], ['categoria', 'Categoria'],
        ['conteudo', 'Conteúdo'], ['form-download', 'Form Download'],
        ['form-newsletter', 'Form Newsletter'], ['home', 'Home'], ['menu', 'Menu'],
    ];

    $introAct = $activeSidebarId === 'intro' ? ' active' : '';

    $html = <<<HTML

<div class="ds-layout">

  <aside class="ds-sidebar">
    <div class="ds-sg">Introdução</div>
    <a class="ds-sl{$introAct}" href="/src/docs/ds/index.html">Sobre o DS</a>

    <div class="ds-sg">Foundations</div>
HTML;

    foreach ($foundations as $f) {
        $act = ($activeSidebarId === $f[0]) ? ' active' : '';
        $html .= "\n    <a class=\"ds-sl{$act}\" href=\"{$f[2]}\">{$f[1]}</a>";
    }

    $html .= "\n\n    <div class=\"ds-sdiv\"></div>\n    <div class=\"ds-sg\">Componentes</div>";
    foreach ($components as $c) {
        $act = ($activeSidebarId === $c[0]) ? ' active' : '';
        $html .= "\n    <a class=\"ds-sl{$act}\" href=\"/src/docs/ds/components/{$c[0]}.html\">{$c[1]} <span class=\"ds-bv\">{$c[2]}</span></a>";
    }

    $html .= "\n\n    <div class=\"ds-sdiv\"></div>\n    <div class=\"ds-sg\">Templates</div>";
    foreach ($templates as $t) {
        $act = ($activeSidebarId === 'tpl-'.$t[0]) ? ' active' : '';
        $html .= "\n    <a class=\"ds-sl{$act}\" href=\"/src/docs/ds/templates/{$t[0]}.html\">{$t[1]}</a>";
    }

    $html .= "\n  </aside>";
    return $html;
}

function mainOpen() {
    return <<<HTML

  <main class="ds-main">
    <div class="ds-mi">
HTML;
}

function mainClose() {
    return <<<HTML

    </div>
  </main>
</div>

<script src="/src/docs/ds/assets/fuse.min.js"></script>
<script src="/src/docs/ds/assets/ds.js"></script>
HTML;
}

function foot($extraScript = '') {
    return "{$extraScript}\n\n</body>\n</html>";
}

// ═══════════════════════════════════════════════════════════
// INDEX PAGE
// ═══════════════════════════════════════════════════════════

$content = <<<'CONTENT'

      <nav class="ds-bc">
        <span>DS</span>
      </nav>

      <div class="ds-page-header">
        <h1 class="ds-page-title" style="font-size:30px;">Canais Digitais Informa</h1>
        <p class="ds-page-desc" style="max-width:600px;">Design System oficial da plataforma editorial da Informa Markets. Base compartilhada por 11+ portais cobrindo verticais de alimentos, saúde, construção, arquitetura e outros.</p>
        <div class="ds-page-meta" style="margin-top:14px;">
          <span class="ds-bvar">52 componentes</span>
          <span class="ds-bvar">11 templates</span>
          <span class="ds-bvar">17 escalas tipográficas</span>
          <span class="ds-bval">PHP + Tailwind v4</span>
        </div>
      </div>

      <h2 class="ds-stitle">Sobre o projeto</h2>
      <div style="font-size:13px;line-height:1.75;color:var(--ds-n700);max-width:620px;">
        <p style="margin:0 0 10px;"><strong>Canais Digitais Informa</strong> é um template WordPress que serve como plataforma base para portais editoriais da Informa Markets. Cada portal compartilha a mesma estrutura, componentes e Design System — o que varia entre portais é o conteúdo e as cores categoriais das editorias.</p>
        <p style="margin:0 0 10px;">A personalidade visual é <strong>neutra, institucional e escalável</strong> — limpa, séria, com hierarquia tipográfica forte. A identidade de cada vertical emerge pelo conteúdo e pelas cores categoriais, não pela estrutura visual.</p>
        <p style="margin:0;">Este projeto não é um portal específico — é a plataforma base que serve todos eles.</p>
      </div>

      <h2 class="ds-stitle">Stack</h2>
      <table class="ds-ptable" style="max-width:480px;">
        <tbody>
          <tr><td><strong>Templates</strong></td><td>PHP (WordPress-like)</td></tr>
          <tr><td><strong>Estilização</strong></td><td>Tailwind CSS v4 — tokens via <code>@theme</code></td></tr>
          <tr><td><strong>Tipografia</strong></td><td>Aleo (display) + Open Sans (body)</td></tr>
          <tr><td><strong>Ícones</strong></td><td>Material Icons (filled) + SVGs de marca</td></tr>
          <tr><td><strong>Design</strong></td><td>Figma — fonte da verdade visual</td></tr>
        </tbody>
      </table>

      <h2 class="ds-stitle">O que é fixo vs. variável</h2>
      <div class="ds-guides" style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div class="ds-gdo">
          <h4>&#10003; Fixo em todos os portais</h4>
          <ul>
            <li>Estrutura de componentes e layouts</li>
            <li>Tipografia (Aleo + Open Sans)</li>
            <li>Paleta primary (navy) e secondary (sky blue)</li>
            <li>Espaçamento, radius e shadows</li>
          </ul>
        </div>
        <div class="ds-gdont" style="background:#f5f0ff;border-color:#d4bfff;">
          <h4 style="color:#9423FC;">&#9670; Variável por portal</h4>
          <ul>
            <li>Cores categoriais das editorias</li>
            <li>Conteúdo editorial</li>
            <li>Seções opcionais (Podcasts, Vídeos, Especialistas)</li>
            <li>Itens de navegação</li>
          </ul>
        </div>
      </div>
CONTENT;

$html = head('Introdução') . topbar('docs') . sidebar('intro') . mainOpen() . $content . mainClose() . foot();
file_put_contents($root . '/src/docs/ds/index.html', $html);
echo "  ✓ index.html\n";

// ═══════════════════════════════════════════════════════════
// FOUNDATION PAGES
// ═══════════════════════════════════════════════════════════

$foundationPages = [
    ['tokens', 'Tokens', 'Design Tokens', 'Cores, paletas primary/secondary/neutral, cores categoriais e todos os design tokens definidos em tokens.css.', <<<'CONTENT'

      <h2 class="ds-stitle">Preview</h2>
      <div class="ds-pwrap">
        <div class="ds-pbody" style="padding:0;"><iframe src="/src/docs/tokens.html" style="width:100%;height:700px;border:none;"></iframe></div>
      </div>

      <h2 class="ds-stitle">Paleta Principal</h2>
      <table class="ds-ptable">
        <thead><tr><th>Paleta</th><th>Descrição</th><th>Base</th><th>Escalas</th></tr></thead>
        <tbody>
          <tr><td><strong>Primary</strong></td><td>Deep navy → branco</td><td><code>primary-600</code> (#002244)</td><td>50–950</td></tr>
          <tr><td><strong>Secondary</strong></td><td>Sky blue vibrante</td><td><code>secondary-500</code> (#28B4FF)</td><td>50–950</td></tr>
          <tr><td><strong>Neutral</strong></td><td>Slate (cool gray azulado)</td><td><code>neutral-500</code> (#8391A9)</td><td>50–950</td></tr>
        </tbody>
      </table>

      <h2 class="ds-stitle">Cores Categoriais</h2>
      <table class="ds-ptable">
        <thead><tr><th>Token</th><th>Hex</th><th>Uso</th></tr></thead>
        <tbody>
          <tr><td><code>mint</code></td><td>#00786E</td><td>Editoria configurável</td></tr>
          <tr><td><code>coral</code></td><td>#FF547C</td><td>Editoria configurável</td></tr>
          <tr><td><code>saffron</code></td><td>#B05223</td><td>Editoria configurável</td></tr>
          <tr><td><code>lavander</code></td><td>#9423FC</td><td>Editoria configurável</td></tr>
        </tbody>
      </table>

      <h2 class="ds-stitle">Regras</h2>
      <div class="ds-guides" style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div class="ds-gdo">
          <h4>&#10003; Usar</h4>
          <ul>
            <li>Tokens via classes Tailwind (<code>bg-primary-600</code>, <code>text-secondary-500</code>)</li>
            <li><code>primary-600</code> para textos principais e backgrounds escuros</li>
            <li><code>secondary-500</code> para accent, CTAs e destaques</li>
          </ul>
        </div>
        <div class="ds-gdont">
          <h4>&#10007; Evitar</h4>
          <ul>
            <li>Valores hex hardcoded no markup</li>
            <li>Tokens customizados fora de <code>tokens.css</code></li>
            <li><code>&lt;style&gt;</code> avulso para cores</li>
          </ul>
        </div>
      </div>
CONTENT
    ],
    ['typography', 'Tipografia', 'Tipografia', 'Escala tipográfica Material Design 3 com 17 escalas. Aleo para display/headline/title, Open Sans para body/label.', <<<'CONTENT'

      <h2 class="ds-stitle">Preview</h2>
      <div class="ds-pwrap">
        <div class="ds-pbody" style="padding:0;"><iframe src="/src/docs/typography.html" style="width:100%;height:700px;border:none;"></iframe></div>
      </div>

      <h2 class="ds-stitle">Famílias</h2>
      <table class="ds-ptable">
        <thead><tr><th>Família</th><th>Classe</th><th>Uso</th></tr></thead>
        <tbody>
          <tr><td><strong>Aleo</strong></td><td><code>font-display</code></td><td>Display, Headline, Title — tudo editorial/hierárquico</td></tr>
          <tr><td><strong>Open Sans</strong></td><td><code>font-body</code></td><td>Body, Label — texto corrido, UI, navegação</td></tr>
        </tbody>
      </table>

      <h2 class="ds-stitle">Escala MD3 (17 escalas)</h2>
      <table class="ds-ptable">
        <thead><tr><th>Token</th><th>Tamanho</th><th>Line-height</th><th>Uso típico</th></tr></thead>
        <tbody>
          <tr><td><code>text-display-lg</code></td><td>57px</td><td>64px</td><td>Hero máximo</td></tr>
          <tr><td><code>text-display-md</code></td><td>45px</td><td>52px</td><td>Hero secundário</td></tr>
          <tr><td><code>text-display-sm</code></td><td>36px</td><td>44px</td><td>Títulos de seção grandes</td></tr>
          <tr><td><code>text-headline-lg</code></td><td>32px</td><td>40px</td><td>Títulos de página</td></tr>
          <tr><td><code>text-headline-md</code></td><td>28px</td><td>36px</td><td>Card Large</td></tr>
          <tr><td><code>text-headline-sm</code></td><td>24px</td><td>32px</td><td>Card Medium</td></tr>
          <tr><td><code>text-title-xl</code></td><td>22px</td><td>28px</td><td>Card destaque</td></tr>
          <tr><td><code>text-title-lg</code></td><td>18px</td><td>24px</td><td>Subtítulos</td></tr>
          <tr><td><code>text-title-md</code></td><td>16px</td><td>24px</td><td>Card Small, labels</td></tr>
          <tr><td><code>text-title-sm</code></td><td>14px</td><td>20px</td><td>Labels menores</td></tr>
          <tr><td><code>text-body-xl</code></td><td>18px</td><td>28px</td><td>Lead de artigo</td></tr>
          <tr><td><code>text-body-lg</code></td><td>16px</td><td>24px</td><td>Corpo padrão</td></tr>
          <tr><td><code>text-body-md</code></td><td>14px</td><td>20px</td><td>Texto secundário</td></tr>
          <tr><td><code>text-body-sm</code></td><td>12px</td><td>16px</td><td>Captions, metadados</td></tr>
          <tr><td><code>text-label-lg</code></td><td>14px</td><td>20px</td><td>Botões, navegação</td></tr>
          <tr><td><code>text-label-md</code></td><td>12px</td><td>16px</td><td>Chips, badges</td></tr>
          <tr><td><code>text-label-sm</code></td><td>11px</td><td>16px</td><td>Elementos mínimos</td></tr>
        </tbody>
      </table>
CONTENT
    ],
    ['icons', 'Ícones', 'Ícones', 'Material Icons (filled) para UI. SVGs oficiais para marcas/social. Centralizados em _partials/icon-button.php.', <<<'CONTENT'

      <h2 class="ds-stitle">Preview</h2>
      <div class="ds-pwrap">
        <div class="ds-pbody" style="padding:0;"><iframe src="/src/docs/icons.html" style="width:100%;height:700px;border:none;"></iframe></div>
      </div>

      <h2 class="ds-stitle">Tamanhos</h2>
      <table class="ds-ptable">
        <thead><tr><th>Tamanho</th><th>Classe</th><th>Uso</th></tr></thead>
        <tbody>
          <tr><td>24px</td><td><code>size-6</code></td><td>Padrão (buttons, header, cards)</td></tr>
          <tr><td>20px</td><td><code>size-5</code></td><td>Small buttons</td></tr>
          <tr><td>16px</td><td><code>size-4</code></td><td>Trailing close, chips</td></tr>
        </tbody>
      </table>

      <h2 class="ds-stitle">Implementação</h2>
      <div class="ds-guides" style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div class="ds-gdo">
          <h4>&#10003; Como usar</h4>
          <ul>
            <li>SVG inline com <code>fill="currentColor"</code> e <code>viewBox="0 0 24 24"</code></li>
            <li>Cor herdada do container via <code>text-{cor}</code></li>
            <li>Novos ícones em <code>_partials/icon-button.php</code></li>
          </ul>
        </div>
        <div class="ds-gdont">
          <h4>&#10007; Evitar</h4>
          <ul>
            <li>Não usar font-icons (Material Icons font)</li>
            <li>Não aplicar cores no SVG (usar currentColor)</li>
            <li>Brand icons: SVGs oficiais, não Material Icons</li>
          </ul>
        </div>
      </div>
CONTENT
    ],
    ['grid', 'Grid', 'Grid &amp; Breakpoints', 'Sistema de grid de 12 colunas no desktop, 4 no mobile. Breakpoints e container padrão Tailwind v4.', <<<'CONTENT'

      <h2 class="ds-stitle">Breakpoints</h2>
      <table class="ds-ptable">
        <thead><tr><th>Prefixo</th><th>Largura</th><th>Uso</th></tr></thead>
        <tbody>
          <tr><td><code>sm</code></td><td>640px</td><td>Mobile landscape</td></tr>
          <tr><td><code>md</code></td><td>768px</td><td>Tablet</td></tr>
          <tr><td><code>lg</code></td><td>1024px</td><td>Desktop pequeno</td></tr>
          <tr><td><code>xl</code></td><td>1280px</td><td>Desktop padrão</td></tr>
          <tr><td><code>2xl</code></td><td>1536px</td><td>Desktop grande</td></tr>
        </tbody>
      </table>

      <h2 class="ds-stitle">Container Padrão</h2>
      <pre class="ds-cblock" style="border-radius:6px;">&lt;div class="max-w-screen-xl mx-auto px-4 lg:px-6"&gt;
  &lt;!-- conteúdo --&gt;
&lt;/div&gt;</pre>
      <table class="ds-ptable" style="margin-top:12px;">
        <thead><tr><th>Propriedade</th><th>Valor</th><th>Nota</th></tr></thead>
        <tbody>
          <tr><td>Largura máxima</td><td><code>max-w-screen-xl</code> (1280px)</td><td>Substitui o antigo max-w-[1224px]</td></tr>
          <tr><td>Padding mobile</td><td><code>px-4</code> (16px)</td><td>Até 1023px</td></tr>
          <tr><td>Padding desktop</td><td><code>lg:px-6</code> (24px)</td><td>A partir de 1024px</td></tr>
        </tbody>
      </table>

      <h2 class="ds-stitle">Grid</h2>
      <table class="ds-ptable">
        <thead><tr><th>Viewport</th><th>Colunas</th></tr></thead>
        <tbody>
          <tr><td>Desktop (lg+)</td><td>12 colunas</td></tr>
          <tr><td>Mobile (&lt;lg)</td><td>4 colunas</td></tr>
        </tbody>
      </table>

      <h2 class="ds-stitle">Espaçamento</h2>
      <p style="font-size:12px;color:var(--ds-n700);margin-bottom:10px;">Base 4px (Tailwind v4). Valores mais usados:</p>
      <table class="ds-ptable">
        <thead><tr><th>Classe</th><th>Valor</th></tr></thead>
        <tbody>
          <tr><td><code>gap-1</code></td><td>4px</td></tr>
          <tr><td><code>gap-2</code></td><td>8px</td></tr>
          <tr><td><code>gap-3</code></td><td>12px</td></tr>
          <tr><td><code>gap-4</code></td><td>16px</td></tr>
          <tr><td><code>gap-6</code></td><td>24px</td></tr>
          <tr><td><code>gap-8</code></td><td>32px</td></tr>
        </tbody>
      </table>

      <h2 class="ds-stitle">Border Radius</h2>
      <table class="ds-ptable">
        <thead><tr><th>Classe</th><th>Valor</th><th>Uso</th></tr></thead>
        <tbody>
          <tr><td><code>rounded-xs</code></td><td>2px</td><td>Chips, badges pequenos</td></tr>
          <tr><td><code>rounded-sm</code></td><td>4px</td><td>Cards, thumbnails, botões padrão</td></tr>
          <tr><td><code>rounded-lg</code></td><td>8px</td><td>Containers maiores, sheets</td></tr>
          <tr><td><code>rounded-2xl</code></td><td>16px</td><td>Elementos grandes</td></tr>
          <tr><td><code>rounded-full</code></td><td>9999px</td><td>Avatares, pills, botões redondos</td></tr>
        </tbody>
      </table>
      <p style="font-size:11px;color:var(--ds-n400);">Nota: <code>rounded-md</code> (6px) <strong>não faz parte</strong> do DS.</p>

      <h2 class="ds-stitle">Shadows</h2>
      <table class="ds-ptable">
        <thead><tr><th>Classe</th><th>Uso</th></tr></thead>
        <tbody>
          <tr><td><code>shadow-sm</code></td><td>Elementos sutis</td></tr>
          <tr><td><code>shadow-md</code></td><td>Dropdowns, tooltips, cards flutuantes</td></tr>
          <tr><td><code>shadow-lg</code></td><td>Modais, bottom sheets</td></tr>
          <tr><td><code>shadow-xl</code></td><td>Elementos de alta elevação</td></tr>
        </tbody>
      </table>
CONTENT
    ],
];

foreach ($foundationPages as $fp) {
    [$slug, $sidebarName, $title, $desc, $content] = $fp;

    $bc = <<<HTML

      <nav class="ds-bc">
        <a href="/src/docs/ds/index.html">DS</a>
        <span>›</span>
        <a href="/src/docs/ds/foundations/tokens.html">Foundations</a>
        <span>›</span>
        <span>{$sidebarName}</span>
      </nav>

      <div class="ds-page-header">
        <h1 class="ds-page-title">{$title}</h1>
        <p class="ds-page-desc">{$desc}</p>
        <div class="ds-page-meta"><span class="ds-bval">&#10003; Validado</span></div>
      </div>
HTML;

    $html = head($sidebarName) . topbar('docs') . sidebar($slug) . mainOpen() . $bc . $content . mainClose() . foot();
    file_put_contents($root . "/src/docs/ds/foundations/{$slug}.html", $html);
    echo "  ✓ foundations/{$slug}.html\n";
}

// ═══════════════════════════════════════════════════════════
// TEMPLATE PAGES
// ═══════════════════════════════════════════════════════════

$templates = [
    ['404',             '404',              '2085:45369', 'Página de erro 404',                            '/src/layouts/404.php'],
    ['buscar',          'Buscar',           '1785:17716', 'Resultados de busca com filtros',               '/src/layouts/buscar.php'],
    ['categoria',       'Categoria',        '5433:16684', 'Listagem de conteúdo por editoria',             '/src/layouts/categoria.php'],
    ['conteudo',        'Conteúdo',         '4179:32002', 'Página interna de artigo/notícia',              '/src/layouts/conteudo.php'],
    ['form-download',   'Form Download',    '1992:23811', 'Formulário de download de material',            '/src/layouts/form-download.php'],
    ['form-newsletter', 'Form Newsletter',  '1907:14842', 'Formulário de inscrição na newsletter',         '/src/layouts/form-newsletter.php'],
    ['home',            'Home',             '973:6474',   'Página inicial do portal',                      '/src/layouts/home.php'],
    ['menu',            'Menu',             '986:21416',  'Menu lateral mobile expandido',                  '/src/layouts/menu.php'],
];

// Templates index page (grid of all templates)
$tplCards = '';
foreach ($templates as $t) {
    $tplCards .= <<<HTML

        <a href="/src/docs/ds/templates/{$t[0]}.html" style="border:1px solid var(--ds-n200);border-radius:8px;overflow:hidden;text-decoration:none;color:inherit;display:block;transition:border-color .15s;">
          <div style="height:180px;overflow:hidden;border-bottom:1px solid var(--ds-n200);background:var(--ds-n50);position:relative;">
            <iframe src="{$t[4]}" style="width:1280px;height:900px;transform:scale(0.27);transform-origin:top left;pointer-events:none;border:none;" loading="lazy"></iframe>
          </div>
          <div style="padding:12px 14px;">
            <div style="font-family:var(--ds-fd);font-weight:700;font-size:15px;color:var(--ds-navy);">{$t[1]}</div>
            <div style="font-size:12px;color:var(--ds-n400);margin-top:2px;">{$t[3]}</div>
          </div>
        </a>
HTML;
}

$tplIndexContent = <<<HTML

      <nav class="ds-bc">
        <a href="/src/docs/ds/index.html">DS</a>
        <span>›</span>
        <span>Templates</span>
      </nav>

      <div class="ds-page-header">
        <h1 class="ds-page-title">Templates</h1>
        <p class="ds-page-desc">11 layouts de página completos renderizados em PHP nativo com componentes reais.</p>
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px;">
{$tplCards}
      </div>
HTML;

$html = head('Templates') . topbar('templates') . sidebar('') . mainOpen() . $tplIndexContent . mainClose() . foot();
file_put_contents($root . '/src/docs/ds/templates/index.html', $html);
echo "  ✓ templates/index.html\n";

// Individual template pages
for ($i = 0; $i < count($templates); $i++) {
    [$slug, $name, $figma, $desc, $layoutFile] = $templates[$i];
    $figmaUrl = 'https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=' . str_replace(':', '-', $figma);

    // Prev / Next
    $prevHtml = '';
    $nextHtml = '';
    if ($i > 0) {
        $ps = $templates[$i-1][0];
        $pn = $templates[$i-1][1];
        $prevHtml = "<a href=\"/src/docs/ds/templates/{$ps}.html\" class=\"ds-pnbtn\"><span class=\"ds-pnlbl\">&larr; Anterior</span><span class=\"ds-pnname\">{$pn}</span></a>";
    }
    if ($i < count($templates) - 1) {
        $ns = $templates[$i+1][0];
        $nn = $templates[$i+1][1];
        $nextHtml = "<a href=\"/src/docs/ds/templates/{$ns}.html\" class=\"ds-pnbtn ds-pnright\"><span class=\"ds-pnlbl\">Pr&oacute;ximo &rarr;</span><span class=\"ds-pnname\">{$nn}</span></a>";
    }

    $tplContent = <<<HTML

      <nav class="ds-bc">
        <a href="/src/docs/ds/index.html">DS</a>
        <span>›</span>
        <a href="/src/docs/ds/templates/index.html">Templates</a>
        <span>›</span>
        <span>{$name}</span>
      </nav>

      <div class="ds-page-header">
        <h1 class="ds-page-title">{$name}</h1>
        <p class="ds-page-desc">{$desc}</p>
        <div class="ds-page-meta">
          <span class="ds-bval">&#10003; Validado</span>
          <a class="ds-flink" href="{$figmaUrl}" target="_blank">↗ Ver no Figma</a>
        </div>
      </div>

      <h2 class="ds-stitle">Preview</h2>
      <div class="ds-pwrap">
        <div class="ds-ptoolbar">
          <span class="ds-plabel">Layout completo</span>
          <div style="display:flex;gap:4px;">
            <button class="ds-cbtn active" onclick="dsVP('desktop',this)">Desktop</button>
            <button class="ds-cbtn" onclick="dsVP('tablet',this)">Tablet</button>
            <button class="ds-cbtn" onclick="dsVP('mobile',this)">Mobile</button>
          </div>
          <a href="{$layoutFile}" target="_blank" style="font-size:11px;color:var(--ds-sky-dark);text-decoration:none;font-weight:600;margin-left:auto;">Abrir em tela cheia →</a>
        </div>
        <div style="display:flex;justify-content:center;background:var(--ds-n100);transition:all .3s;" id="ds-iframe-wrap">
          <iframe src="{$layoutFile}" style="width:100%;height:600px;border:none;background:#fff;transition:width .3s;" id="ds-layout-iframe"></iframe>
        </div>
      </div>

      <h2 class="ds-stitle">Código PHP</h2>
      <div class="ds-pwrap">
        <div class="ds-ptoolbar">
          <span class="ds-plabel">Source</span>
          <button class="ds-cbtn" onclick="dsCopy(this)">Copiar código</button>
        </div>
        <pre class="ds-cblock" id="ds-tab-code" style="border-radius:0;">Carregando código...</pre>
      </div>

      <nav class="ds-pnav">
        {$prevHtml}
        {$nextHtml}
      </nav>
HTML;

    $script = <<<HTML

<script>
  window.DS_PAGE = {
    section: 'templates',
    slug: '{$slug}',
    layoutFile: '{$layoutFile}',
    figmaNodeId: '{$figma}'
  };

  function dsVP(vp, btn) {
    var iframe = document.getElementById('ds-layout-iframe');
    btn.parentNode.querySelectorAll('.ds-cbtn').forEach(function(b){b.classList.remove('active');});
    btn.classList.add('active');
    if (vp==='desktop') iframe.style.width='100%';
    else if (vp==='tablet') iframe.style.width='768px';
    else iframe.style.width='375px';
  }
</script>
HTML;

    $html = head($name) . topbar('templates') . sidebar('tpl-'.$slug) . mainOpen() . $tplContent . mainClose() . foot($script);
    file_put_contents($root . "/src/docs/ds/templates/{$slug}.html", $html);
    echo "  ✓ templates/{$slug}.html\n";
}

echo "\nDone.\n";
