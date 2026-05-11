<?php
/**
 * Generates all 52 component pages for /src/docs/ds/components/
 * Usage: php tools/generate-ds-pages.php
 *
 * Reads ds-template.html and produces one .html per component
 * with correct: title, active sidebar, breadcrumb, DS_PAGE config,
 * props table, guidelines, and prev/next navigation.
 */

$root = dirname(__DIR__);
$template = file_get_contents($root . '/src/docs/ds/ds-template.html');
$outDir = $root . '/src/docs/ds/components';

// ── Component registry ──────────────────────────────────────
// Each entry: [slug, name, figma, variants, validated, desc, props[], do[], dont[]]

$components = [
  [
    'ad-frame', 'Ad Frame', '30:5047', 7, true,
    'Placeholder slots para os 7 formatos publicitários IAB padrão usados nos layouts.',
    [
      ['type', 'enum', 'hero', 'Um dos 7 tamanhos IAB: hero, billboard, super-leaderboard, leaderboard, half-page, rectangle, banner'],
      ['device', 'string', 'desktop', 'desktop ou mobile — determina dimensões e layout'],
    ],
    ['Usar como slots reservados para unidades publicitárias nos layouts', 'Hero (1224×245) para posicionamentos full-width above-the-fold', 'Rectangle (300×250) ou Half-page (300×600) em colunas de sidebar'],
    ['Não adicionar label "Publicidade" — o master do Figma não tem', 'Não usar valores fixos de pixel fora dos 7 tamanhos definidos', 'Não tornar os tamanhos de sidebar responsivos — são larguras fixas'],
  ],
  [
    'author-summary', 'Author Summary', '791:8418', 4, true,
    'Card compacto de autor com avatar quadrado, bio expansível e links sociais.',
    [
      ['device', 'string', 'desktop', 'desktop ou mobile — altera dimensões e escala tipográfica'],
      ['opened', 'bool', 'false', 'Expande/colapsa a seção de bio "Ver mais"'],
    ],
    ['Usar dentro do Authors Carousel como unidade repetida', 'Usar como bloco standalone de bio do autor em páginas de artigo', 'Mostrar footer social ("Siga nas Redes") com 3 icon buttons'],
    ['Avatar é QUADRADO (rounded-sm), não circular', 'Label do footer é "Siga nas Redes", não "Ver todos os artigos"', 'Nome do autor é text-secondary-950, não text-primary-600'],
  ],
  [
    'authors-carousel', 'Authors Carousel', '3454:13759', 6, true,
    'Carrossel horizontal de cards Author Summary com setas de navegação sobrepostas.',
    [
      ['state', 'string', 'Enabled', 'Enabled ou Hovered — controla visibilidade dos botões de nav'],
      ['step', 'int', '0', '0=início (só próximo), 1=meio (ambos), 2=fim (só anterior)'],
    ],
    ['Usar como lista horizontal scrollável de cards Author Summary', 'Mostrar botões de nav overlay (bg-primary-600) somente em Hovered', 'Mostrar apenas o botão de nav relevante baseado na posição de scroll'],
    ['Não usar grid simples de avatares circulares — o componente real é um carrossel de cards', 'Não usar botões ghost/outline — são bg-primary-600 sólido', 'Não incluir Section Title dentro do componente master'],
  ],
  [
    'avatar', 'Avatar', '751:3445', 4, false,
    'Imagem de perfil em duas formas (squared ou circular) com hover state-layer overlay.',
    [
      ['shape', 'class', 'rounded-sm', 'rounded-sm (squared) ou rounded-full (circular)'],
      ['size', 'class', 'size-20', 'Qualquer utility Tailwind de tamanho (size-12, size-16, size-20)'],
      ['src', 'string', '—', 'URL da imagem'],
    ],
    ['Usar forma squared para contextos de autor/colunista', 'Usar forma circular para bylines inline e avatar stacks', 'Sempre incluir bg-neutral-100 como placeholder'],
    ['Não adicionar prop size — tamanho é definido pelo componente consumidor', 'Não implementar hover como variante separada — usar padrão group/overlay', 'Não usar rounded-md — fora do DS'],
  ],
  [
    'avatar-stack', 'Avatar Stack', '3422:29955', 5, true,
    'Stack sobreposto de avatares circulares representando múltiplos contribuidores.',
    [
      ['qty', 'int', '3', 'Número de avatares sobrepostos: 2, 3, 4, 5 ou 6'],
    ],
    ['Usar para representar grupo de autores/contribuidores', 'Aplicar overlap de 8px negativo (mr-[-8px]) entre avatares', 'Usar border-2 border-white em cada avatar para separar'],
    ['Não usar contador "+N" — o master não tem essa variante', 'Não usar -space-x-3 (12px) — overlap correto é 8px', 'Não usar ring-2 ring-white — usar border-2 border-white'],
  ],
  [
    'banner-download', 'Banner Download', '925:11171', 4, true,
    'Banner CTA para download de material em layout vertical ou horizontal, com ou sem foto.',
    [
      ['orientation', 'string', 'horizontal', 'horizontal (704px) ou vertical (300px)'],
      ['photo', 'bool', 'false', 'false=gradient bg + botão inverso, true=primary-100 bg + botão normal'],
    ],
    ['Usar "Acessar material" como label do CTA com ícone de download', 'Botão inverso (bg-white) quando sem photo; normal (bg-primary-600) com photo', 'Imagem 1:1 para horizontal+photo, 4:3 para vertical+photo'],
    ['Não usar "Baixar PDF" como label do botão', 'Larguras são fixas: 300px (vertical) e 704px (horizontal)', 'Não usar para newsletter — usar Banner Newsletter'],
  ],
  [
    'banner-newsletter', 'Banner Newsletter', '1188:11621', 4, true,
    'Banner de inscrição em newsletter com gradient ou fundo com foto em variantes desktop e mobile.',
    [
      ['device', 'string', 'desktop', 'desktop (full-width) ou mobile (360px)'],
      ['photo', 'bool', 'false', 'false=gradient bg, true=primary-100 bg com imagem 3:2'],
    ],
    ['Gradient from-primary-600 to-secondary-950 quando sem photo, com botão inverso', 'Imagem 3:2 à esquerda (desktop) ou em cima (mobile) quando photo=true', 'Título: display-sm desktop / headline-sm mobile'],
    ['Não usar bg-secondary-50 como background — gradient é from-primary-600 to-secondary-950', 'Não incluir decoração SVG "Informa Orbit" sem o path oficial', 'Não usar para download de material — usar Banner Download'],
  ],
  [
    'bottom-sheet', 'Bottom Sheet', '3190:48964', 2, true,
    'Bottom sheet Material 3 — wrapper vazio com drag handle opcional e modal scrim.',
    [
      ['modal', 'bool', 'false', 'Adiciona scrim bg-primary-950/32 cobrindo a viewport'],
      ['showDragHandle', 'bool', 'true', 'Mostra/esconde a barra de drag handle'],
    ],
    ['Usar como wrapper shell vazio — preencher o content slot conforme contexto', 'Aplicar rounded-t-2xl (16px nos cantos superiores)', 'Usar shadow-lg (Tailwind nativo) para elevação'],
    ['Não pré-preencher título, close button ou action buttons — master é slot vazio', 'Cor do drag handle é neutral-950 (escuro), NÃO neutral-300', 'Shadow é elevation-3 (shadow-lg), não elevation-4'],
  ],
  [
    'button', 'Button', '3185:47973', 81, true,
    'Botão pill de ação principal em três tipos e três tamanhos com suporte a ícone.',
    [
      ['type', 'string', 'filled', "'filled' | 'outlined' | 'ghost'"],
      ['size', 'string', 'medium', "'large' | 'medium' | 'small'"],
      ['icon', 'string', "''", "Posição do ícone SVG: 'left' | 'right' | '' (sem ícone)"],
      ['disabled', 'bool', 'false', 'Estado desabilitado via atributo HTML disabled'],
    ],
    ['Filled para ações primárias, Outlined para secundárias, Ghost para terciárias', 'Estados (hover/disabled) são automáticos via pseudo-classes CSS', 'Ajustar padding quando há ícone (reduzir padding do lado do ícone)'],
    ['Não usar border-1px no Outlined — usar border-[1.5px] (spec exata do Figma)', 'Não usar classes separadas para hover/disabled — já implementado via pseudo-classes', 'Buttons são sempre pill (rounded-full), não rounded-sm'],
  ],
  [
    'card-colunista', 'Card Colunista', '1352:23176', 2, true,
    'Card de colunista com foto quadrada, nome/cargo e lead editorial em Aleo Bold.',
    [
      ['state', 'string', 'enabled', 'enabled ou hovered — muda bg e border'],
    ],
    ['Listar colunistas com foto, nome, cargo e citação lead', 'Foto quadrada (rounded-sm) em size-104', 'Lead em text-title-md Aleo Bold com line-clamp-3'],
    ['Foto é QUADRADA (rounded-sm), não circular', 'Nome do autor é text-secondary-950, não text-primary-600', 'Não adicionar variante "featured" — só Enabled e Hovered existem'],
  ],
  [
    'categoria', 'Categoria', '71:6699', 28, false,
    'Label de categoria editorial em 7 cores, com modo pill (Chip=On) ou texto inline (Chip=Off).',
    [
      ['color', 'string', 'mint', 'coral | mint | saffron | lavander | ultramarine | sky | indigo'],
      ['chip', 'string', 'off', "'on' (pill com borda/bg) ou 'off' (texto inline)"],
    ],
    ['Chip=Off para labels inline dentro de cards e feeds', 'Chip=On para tags standalone e contextos de filtro', 'Usar um dos 7 tokens de cor categorial (nunca hardcoded hex)'],
    ['Não adicionar estado disabled — categorias são sempre ativas', 'Hover só se aplica a Chip=On', 'Não usar cores fora do set de 7 cores categoriais'],
  ],
  [
    'checkboxes', 'Checkboxes', '1944:7508', 15, true,
    'Checkbox Material 3 com estados Unselected, Selected e Indeterminate em 5 estados de interação.',
    [
      ['type', 'string', 'unselected', "'unselected' | 'selected' | 'indeterminate'"],
      ['state', 'string', 'enabled', "'enabled' | 'hovered' | 'focused' | 'pressed' | 'disabled'"],
    ],
    ['State-layer chip 42×42 para aumentar área de toque sem crescer o checkbox 18×18', 'bg-secondary-950 (Ultramarine) como fill do selected/indeterminate', 'opacity-[.38] para o estado disabled'],
    ['Não usar bg-primary-600 para selected — correto é secondary-950', 'Checkbox é 18×18 (size-[18px]), não 20×20', 'Não implementar animação de ripple no pressed — PHP estático'],
  ],
  [
    'divider', 'Divider', '56:6360', 2, false,
    'Linha separadora de 1px em bg-neutral-100, disponível em orientação horizontal e vertical.',
    [
      ['orientation', 'class', 'horizontal', 'Definido via classes Tailwind: h-px w-full (H) ou w-px h-full (V)'],
    ],
    ['Horizontal (h-px w-full) entre blocos de conteúdo empilhados', 'Vertical (w-px h-full) entre colunas lado a lado', 'Componente consumidor controla margin/padding ao redor'],
    ['Não adicionar padding ou margin ao divider', 'Não usar border-b — usar div bg-neutral-100 com h-px', 'Não criar prop de variante — orientação é definida pelo caller'],
  ],
  [
    'download-section', 'Download Section', '1135:18229', 6, true,
    'Seção hero full-bleed para download com container glassmorphism sobre imagem de fundo.',
    [
      ['device', 'string', 'desktop', 'desktop ou mobile'],
      ['position', 'string', 'center', 'left | right | center (desktop) / up | center | down (mobile)'],
    ],
    ['Usar como seção hero full-bleed para CTAs de download de material', 'Aplicar container glassmorphism bg-white/80 sobre a imagem de fundo', '"Baixar agora" como label do CTA com ícone de download'],
    ['Não é um grid de 3 cards — é um único hero com um CTA', 'Container deve ser bg-white/80 (semi-transparente), não branco sólido', 'Não omitir o overlay gradient bg-black/20 na imagem de fundo'],
  ],
  [
    'dropdown-menu', 'Dropdown Menu', '1859:23264', 3, true,
    'Menu dropdown Material 3 com items label-only, um estado selected e três níveis de densidade.',
    [
      ['density', 'string', '0', "0 (56px) | -2 (48px) | -4 (40px)"],
    ],
    ['Usar density -4 quando abre de um Nav Item no header', 'Mostrar exatamente um item Selected com bg-secondary-50', 'bg-neutral-50 (#e9eaec) como fundo do menu (não branco)'],
    ['Items são labels only — sem ícones leading, checkmarks ou dividers', 'Não usar bg-white como fundo do menu', 'Selected state usa bg-secondary-50 (#aae6ff), não bg-neutral-50'],
  ],
  [
    'filter-chip', 'Filter Chip', '1859:18460', 48, false,
    'Filter chip Material 3 com estado selected via aria-pressed e animação de checkmark.',
    [
      ['selected', 'bool (aria-pressed)', 'false', 'Controla bg, border, cor e checkmark via aria-pressed CSS'],
      ['configuration', 'string', 'label-only', "'label-only' | 'with-trailing' | 'with-leading' | 'with-both'"],
      ['trailing', 'bool', 'false', 'Mostra ícone trailing (chevron ou close)'],
    ],
    ['Usar aria-pressed como fonte única de verdade para estado selected', 'Mostrar checkmark leading automaticamente quando selected', 'Reduzir padding leading de 16 para 8 quando há ícone leading'],
    ['Não criar markup separado selected/unselected — usar variantes CSS aria-pressed', 'Selected state usa bg-secondary-50 (#AAE6FF), não bg-primary-100', 'Não implementar estado dragged — fora do escopo para web estática'],
  ],
  [
    'footer', 'Footer', '335:9364', 2, true,
    'Footer do site com grid de navegação editorial, ícones sociais, links legais e identidade de marca.',
    [
      ['device', 'string', 'desktop', 'desktop (flex-row com grid de 4 colunas) ou mobile (stacked)'],
    ],
    ['Mostrar todas as 11 categorias editoriais na navegação do footer', 'Ícones sociais outlined (border border-white rounded-full size-10)', 'bg-primary-600 como fundo com texto branco'],
    ['Não adicionar form de captura de email no footer', 'Dividers usam bg-neutral-100/50, não bg-neutral-100/100', 'Não usar partial icon-button para ícones sociais — precisam de brand icons'],
  ],
  [
    'header', 'Header', '181:4186', 6, true,
    'Header principal do site com barra Informa, logo, ícones sociais, busca e nav editorial pill.',
    [
      ['device', 'string', 'desktop', 'desktop ou mobile'],
      ['size', 'string', 'expanded', "'compact' (esconde nav-list) ou 'expanded'"],
      ['searchOpened', 'bool', 'false', 'Expande search bar para 288px com border secondary-950'],
    ],
    ['Usar as 11 categorias editoriais reais para o nav-list pill', 'Adicionar chevron arrow_drop_down em Eventos, Indústria A&B e ESG (têm submenus)', 'w-32 (128px) para search bar em estado compact/default'],
    ['Não usar partial icon-button para ícones sociais — precisam de brand icons', 'Não expandir a search bar a menos que searchOpened=true', 'Não adicionar quick links ou ícones sociais na barra Header Informa'],
  ],
  [
    'header-author', 'Header Author', '850:5000', 4, true,
    'Header de perfil de autor a nível de página com avatar grande quadrado, bio expansível e links sociais.',
    [
      ['device', 'string', 'desktop', 'desktop (avatar 152×152) ou mobile (avatar 72×72)'],
      ['verMais', 'bool', 'false', 'false="Ver mais" CTA truncado, true=texto completo + "Ver menos"'],
    ],
    ['bg-primary-100 (#d4dae0) como background, não branco', 'Avatar quadrado (rounded-sm) 152×152 no desktop', 'Coluna social com "Siga nas Redes" e 3 icon buttons'],
    ['Avatar é QUADRADO (rounded-sm), não circular', 'Não usar para headers de artigo — é header de perfil de página', 'Coluna direita é para links sociais, não share/bookmark'],
  ],
  [
    'header-informa', 'Header Informa', '110:3575', 4, true,
    'Barra institucional Informa PLC que expande para mostrar informações e links da empresa.',
    [
      ['device', 'string', 'desktop', 'desktop (flex-wrap) ou mobile (flex-col)'],
      ['opened', 'bool', 'false', 'Expande painel dropdown com texto legal e links Informa PLC'],
    ],
    ['bg-neutral-950 (#283857) como background da barra', 'Logo "informa" com chevron arrow_drop_down/up como único conteúdo da barra', 'Descrição legal e links no painel expandido'],
    ['Não adicionar ícones sociais ou quick links nesta barra', 'Não adicionar botão close — toggle é pelo clique na barra', 'Manter fidelidade ao master do Figma'],
  ],
  [
    'highlight-post', 'Highlight Post', '3104:56651', 2, true,
    'Pull-quote editorial com barra fina neutra à esquerda e tipografia Aleo para destaque in-article.',
    [
      ['device', 'string', 'desktop', 'desktop (title-xl Regular) ou mobile (title-lg Bold)'],
    ],
    ['Usar dentro do corpo do artigo como pull-quote editorial', 'Barra 1px neutral-50 à esquerda com self-stretch', 'Usar Aleo (font-display) para o texto da citação'],
    ['Não é um hero com imagem, categoria ou autor — é pull-quote tipográfico', 'Não adicionar botões, imagens ou gradient overlays', 'Não hardcodar altura fixa — container segue o texto'],
  ],
  [
    'icon-button', 'Icon Button', '71:6001', 27, false,
    'Botão quadrado icon-only em três tipos e três tamanhos, requer aria-label para acessibilidade.',
    [
      ['type', 'string', 'ghost', "'filled' | 'outlined' | 'ghost'"],
      ['size', 'string', 'medium', "'large' (48px) | 'medium' (40px) | 'small' (32px)"],
      ['icon', 'SVG', '—', 'SVG inline usando currentColor'],
    ],
    ['Sempre incluir aria-label — não há texto visível', 'Usar currentColor no SVG para herdar cor automaticamente', 'Border (1px) para Outlined — não border-[1.5px] como no Button'],
    ['Não aplicar padding — centralizar o ícone via flex no container de tamanho fixo', 'Não usar font icons — usar SVGs inline com currentColor', 'Não usar size-[18px] arbitrário se existe token equivalente'],
  ],
  [
    'image', 'Image', '30:3878', 9, false,
    'Wrapper de imagem com aspect-ratio, cantos rounded-sm, escala object-cover e placeholder neutro.',
    [
      ['ratio', 'string', '16:9', "'1:1' | '4:3' | '3:2' | '16:9' | '21:9' | '3:4' | '2:3' | '9:16' | '9:21'"],
      ['src', 'string', '—', 'URL da imagem'],
      ['alt', 'string', '—', 'Texto alternativo'],
    ],
    ['Sempre incluir overflow-hidden no wrapper para conter object-cover', 'bg-neutral-100 como cor de placeholder durante carregamento', 'rounded-sm (4px) em todos os wrappers de imagem'],
    ['Não aplicar comportamento hover/state — estados pertencem ao card pai', 'Sempre usar object-cover com w-full h-full', 'Não usar valores de aspect ratio fora dos 9 definidos'],
  ],
  [
    'link-button', 'Link Button', '662:11195', 12, false,
    'CTA text-only em quatro tamanhos usando Aleo para tamanhos grandes e Open Sans para small.',
    [
      ['size', 'string', 'medium', "'xlarge' | 'large' | 'medium' | 'small'"],
    ],
    ['Renderizar como <a> por padrão; trocar para <button> para ações não-navegação', 'Underline on hover (hover:underline)', 'Usar font-bold explicitamente — tokens text-title-* não incluem peso'],
    ['Não usar Open Sans para XLarge/Large/Medium — esses usam Aleo (font-display)', 'Não adicionar background ou border — é CTA text-only', 'Cor enabled é secondary-950, não primary-600'],
  ],
  [
    'loading-button', 'Loading Button', '71:6026', 3, false,
    'Botão Filled de loading com spinner branco animado, substitui Filled button durante ações async.',
    [
      ['(fixo)', '—', '—', 'Sem props — é um Filled pill fixo com spinner'],
    ],
    ['Usar para substituir Filled button enquanto ação async está em progresso', 'Sempre incluir disabled + aria-busy="true" aria-label="Carregando"', 'Spinner SVG inline (circle arc + animate-spin) em currentColor text-white'],
    ['Não criar variantes Outlined ou Ghost loading — só Filled existe no Figma', 'Não permitir novos cliques durante loading (disabled é obrigatório)', 'Spinner deve ser inline — não usar arquivo SVG externo'],
  ],
  [
    'menu-list-item', 'Menu List Item', '1859:23314', 5, true,
    'Item de lista Material 3 para menus e drawers, com três densidades e cobertura completa de estados.',
    [
      ['state', 'string', 'enabled', "'enabled' | 'hovered' | 'selected' | 'disabled' | 'menu-title'"],
      ['density', 'string', '0', "0 (56px) | -2 (48px) | -4 (40px)"],
      ['leading', 'bool', 'false', 'Mostra slot de ícone leading'],
      ['trailing', 'bool', 'false', 'Mostra slot de ícone trailing'],
    ],
    ['bg-secondary-50 (#aae6ff) para estado Selected', 'bg-black/8 (overlay translúcido) para Hovered — não bg-neutral-50', 'Density -4 dentro de dropdown menus; density 0 em side menus'],
    ['Não usar bg-neutral-50 para hover — usar bg-black/8', 'Label usa Open Sans SemiBold, não Bold', 'Cor do label é text-primary-600, não text-neutral-950'],
  ],
  [
    'nav-item', 'Nav Item', '121:2360', 4, true,
    'Tab de navegação horizontal usado no nav pill do header, com submenu dropdown opcional.',
    [
      ['state', 'string', 'enabled', "'enabled' | 'hovered'"],
      ['dropdown', 'bool', 'false', 'Mostra chevron e revela Dropdown Menu no hover'],
    ],
    ['Usar dentro do nav-list pill do desktop Header', 'Mostrar Dropdown Menu (density -4) como painel absoluto quando hovered+dropdown', 'bg-primary-100 no container inteiro durante hover'],
    ['Não usar variante Disabled ou Active — só Enabled e Hovered existem', 'Indicador bottom é h-1 bg-secondary-950 sólido, não border-b-2', 'Não mostrar dropdown menu quando dropdown=false'],
  ],
  [
    'news-card', 'News Card', '1709:7090', 12, false,
    'Card editorial principal compositional em múltiplos tamanhos e orientações com imagem, categoria, lead e autor.',
    [
      ['size', 'string', 'medium', "'large' | 'medium' | 'small'"],
      ['orientation', 'string', 'vertical', "'vertical' (imagem em cima) ou 'horizontal' (imagem à esquerda)"],
      ['image', 'bool', 'true', 'Mostra/esconde thumbnail'],
      ['lead', 'bool', 'true', 'Mostra/esconde parágrafo lead'],
      ['author', 'bool', 'true', 'Mostra/esconde byline "Por Author"'],
      ['categoria', 'bool', 'true', 'Mostra/esconde label de categoria'],
    ],
    ['group-hover:underline no headline para affordance de link', 'group-hover:scale-105 na imagem para sinal de engajamento', 'Wrap headline em <h3> com <a> dentro'],
    ['Não hardcodar cor de categoria — usar token categorial correspondente', 'Quando prop é false, remover elemento inteiramente (não placeholder)', 'Não aninhar <a> dentro de <a>'],
  ],
  [
    'news-card-patrocinado', 'News Card Patrocinado', '2358:14810', 12, true,
    'Card de notícia patrocinado com container bordado e Sponsor Line substituindo byline do autor.',
    [
      ['size', 'string', 'medium', "'large' | 'medium' | 'small' | 'xsmall'"],
      ['orientation', 'string', 'vertical', "'vertical' ou 'horizontal'"],
      ['state', 'string', 'enabled', "'enabled' | 'hovered' — muda cor do título e border"],
    ],
    ['Sempre wrap em container bg-white border border-neutral-100 rounded-sm overflow-hidden', 'Sempre substituir byline do autor por Sponsor Line (partial)', 'Título em text-primary-600 (enabled) → text-secondary-950 (hovered)'],
    ['Não usar label "Conteúdo patrocinado" em saffron — usar partial Sponsor Line', 'Não omitir container com border — sem ele o card fica idêntico ao regular', 'Footer é sempre Sponsor Line, não byline regular'],
  ],
  [
    'pagination', 'Pagination', '4541:15460', 2, true,
    'Controle de paginação com itens numerados no desktop e formato "X de Y" no mobile.',
    [
      ['device', 'string', 'desktop', 'desktop (itens numerados) ou mobile (texto "X de Y")'],
      ['currentPage', 'int', '1', 'Número da página ativa'],
      ['totalPages', 'int', '99', 'Total de páginas'],
    ],
    ['border border-primary-600 (não filled bg) para page-item selecionado', 'Ícones maiores (size-8) para prev/next mobile vs size-6 desktop', 'Mostrar ellipsis (...) entre números quando range é grande'],
    ['Não mostrar números individuais no mobile — usar formato "X de Y"', 'Não preencher page-item selecionado com bg-primary-600 — usar apenas border', 'Cor padrão dos números é neutral-900, não neutral-600'],
  ],
  [
    'play-button', 'Play Button', '2279:19957', 24, false,
    'Botão circular branco de controle de mídia com ícone play/pause, usado como overlay em thumbnails.',
    [
      ['size', 'string', 'small', "'xlarge' (72px) | 'large' (64px) | 'medium' (48px) | 'small' (40px)"],
      ['icon', 'string', 'play', "'play' ou 'pause'"],
      ['as', 'string', 'button', "'button' ou 'div' — usar div quando dentro de <a>"],
    ],
    ['Usar as=div com pointer-events-none quando dentro de um card link (<a>)', 'bg-white fixo em todos os tamanhos — não mudar background no hover', 'Somente a cor do ícone muda no hover (primary-600 → secondary-950)'],
    ['Não mudar cor de background no hover — só ícone muda', 'Não adicionar translate-x-0.5 ao SVG — ícone Material já é centrado', 'Não aninhar <button> dentro de <a> — usar as=div'],
  ],
  [
    'podcast-card', 'Podcast Card', '2283:2779', 12, false,
    'Card de episódio de podcast com play overlay, meta linha duração+autor e suporte a imagem 16:9 e 1:1.',
    [
      ['size', 'string', 'medium', "'large' | 'medium' | 'small' | 'xsmall'"],
      ['orientation', 'string', 'vertical', "'vertical' ou 'horizontal'"],
      ['ratio', 'string', '16:9', "'16:9' (aspect-video) ou '1:1' (aspect-square)"],
    ],
    ['Mostrar meta combinada: "99h 99m · Por Author Name" ao invés de byline simples', 'aria-hidden="true" no separador bullet', 'Ratio 1:1 para listagens estilo capa de álbum'],
    ['Podcast Large V usa headline-sm (24px), não headline-md (28px) como News Card', 'Não usar byline simples "Por Author" — sempre incluir duração na meta', 'Não usar <button> para play overlay quando dentro de <a>'],
  ],
  [
    'podcast-card-patrocinado', 'Podcast Card Patrocinado', '2359:15151', 10, true,
    'Card de podcast patrocinado com container bordado e Sponsor Line substituindo metadata duração/autor.',
    [
      ['size', 'string', 'medium', "'large' | 'medium' | 'small'"],
      ['orientation', 'string', 'vertical', "'vertical' ou 'horizontal'"],
    ],
    ['Wrap em container bg-white border border-neutral-100 rounded-sm overflow-hidden', 'Substituir podcast-meta (duração+autor) por partial Sponsor Line', 'Manter play overlay no thumbnail'],
    ['Não mostrar meta "99h 99m · Por Author" — substituída por Sponsor Line', 'Não omitir container com border', 'Não usar <button> para play overlay dentro de card link'],
  ],
  [
    'podcast-image', 'Podcast Image', '2279:20059', 10, true,
    'Imagem de capa de podcast standalone com play overlay centrado semi-transparente no hover.',
    [
      ['size', 'string', 'medium', 'Large 16:9, Medium 16:9/1:1, Small 1:1, XSmall 1:1'],
      ['ratio', 'string', '16:9', "'16:9' (aspect-video) ou '1:1' (aspect-square)"],
      ['state', 'string', 'enabled', "'enabled' (sem play) ou 'hovered' (play centrado bg-white/80)"],
    ],
    ['Sem play button em Enabled — play só aparece no Hover', 'bg-white/80 (semi-transparente) para overlay do play', 'Centralizar o play button overlay (não top-left)'],
    ['Não mostrar play overlay em estado Enabled', 'Não usar bg-white (sólido) — usar bg-white/80', 'Não usar partial play-button (branco sólido) — usar SVG inline'],
  ],
  [
    'relacionadas', 'Relacionadas', '3104:53873', 2, true,
    'Bloco de artigos relacionados com links "+" sem thumbnails, usado dentro do corpo do artigo.',
    [
      ['device', 'string', 'desktop', 'desktop (text-title-lg 18px) ou mobile (text-title-md 16px)'],
    ],
    ['Usar como seção "Relacionado" dentro do corpo do artigo', 'Cada item é ícone "+" + Link Button (Aleo Bold, secondary-950)', 'Barra sólida primary-600 (h-0.5) acima do heading'],
    ['Não usar thumbnails, imagens ou category chips — items são text links', 'Não usar partial section-title para o heading — layout único com divider', 'Ícone é Material "add" (plus), não bullet dots'],
  ],
  [
    'resumo-box', 'Resumo Box', '619:7291', 4, true,
    'Accordion colapsável para resumos de artigo gerados por IA com footer de disclosure.',
    [
      ['state', 'string', 'enabled', "'enabled' | 'hovered' — hovered muda border para neutral-900"],
      ['opened', 'bool', 'false', 'false=mostra só CTA "Ver resumo", true=conteúdo + footer IA'],
    ],
    ['Usar como accordion no topo do artigo para resumos gerados por IA', 'Sempre mostrar footer "Resumo gerado por ferramenta de IA" quando aberto', 'Chevron keyboard_arrow_down/up para indicar expand/collapse'],
    ['Não usar como aside estático ou pull-quote — é accordion colapsável', 'Border é full (muda cor no hover), não border-left primary-600', 'Não omitir footer de disclosure IA — elemento obrigatório de compliance'],
  ],
  [
    'search-bar', 'Search Bar', '1776:19053', 8, true,
    'Input de busca pill-shaped com modos compact e extended, cobrindo todos os 6 estados de interação.',
    [
      ['state', 'string', 'enabled', "'enabled' | 'hovered' | 'empty' | 'typing' | 'filled' | 'disabled'"],
      ['extended', 'bool', 'false', 'false=compact sem botão close, true=full com ícone close trailing'],
    ],
    ['w-32 (128px) no estado compact do header', 'border-secondary-950 quando state é Empty ou Typing (foco ativo)', 'Ícone close trailing somente quando extended=true'],
    ['Altura é h-10 (40px), não h-12', 'Não mostrar botão close quando extended=false', 'Cor do placeholder é neutral-900 (#3c4e69), não neutral-500'],
  ],
  [
    'search-view', 'Search View', '3148:50619', 4, true,
    'Overlay de busca full-screen mobile com estados de sugestão, recentes e "Últimas notícias".',
    [
      ['labelText', 'string', 'supporting', "'input' (busca ativa com resultados) ou 'supporting' (idle com recentes)"],
      ['listItems', 'bool', 'false', 'Mostra lista de sugestões/recentes abaixo do header'],
    ],
    ['Usar como overlay full-screen mobile (w-412)', 'Items de Suggestion (ícone search + texto) quando labelText=input+listItems', 'Items de Recentes (ícone history + texto) quando supporting+listItems'],
    ['Não usar como overlay desktop — componente mobile-only (w-412)', 'Não adicionar chips de busca popular — Figma não tem', 'Não usar resultados com thumbnail — items "Veja também" são text-only'],
  ],
  [
    'section-title-style-1', 'Section Title Style 1', '552:9108', 18, false,
    'Heading de seção com grafismo decorativo de 3 bullets em 9 cores e 3 variantes de Building Block.',
    [
      ['color', 'string', 'indigo', '9 cores: indigo | ultramarine | sky | lavander | coral | saffron | mint | carbon | white'],
      ['uppercase', 'bool', 'false', 'Adiciona classe uppercase ao heading'],
      ['logo', 'bool', 'false', 'Substitui heading por slot de logo 180×48'],
      ['sponsor', 'bool', 'false', 'Adiciona label "Patrocínio" + slot de marca'],
    ],
    ['Grafismo de 3 bullets (primeiro 100%, os outros 40%) acima do headline', 'text-headline-md (28px) Aleo Bold para o heading', 'hover:opacity-75 como efeito hover neutro'],
    ['Não fazer todos os 3 bullets com opacidade igual — 2º e 3º devem ser 40%', 'Bullets são rounded-full (círculos) 5×5px, não quadrados', 'Não hardcodar cor de hover — usar opacity para ser color-agnostic'],
  ],
  [
    'section-title-style-2', 'Section Title Style 2', '552:5123', 18, true,
    'Heading minimalista de seção com linha horizontal colorida e título Aleo Bold centralizado.',
    [
      ['color', 'string', 'indigo', '9 cores: indigo | ultramarine | sky | lavander | coral | saffron | mint | carbon | white'],
    ],
    ['Linha horizontal h-px full-width na cor da seção acima do heading', 'Título centralizado (text-center) em container de 72px de altura', 'text-headline-md (28px) Aleo Bold'],
    ['Não usar 3 barras verticais de bullets — isso é Style 1', 'Não alinhar à esquerda — headline é centralizado no Style 2', 'Não adicionar efeito hover de cor no PHP estático'],
  ],
  [
    'side-menu', 'Side Menu', '986:9198', 4, true,
    'Drawer lateral com lista flat de navegação, dois níveis de profundidade e footers por plataforma.',
    [
      ['device', 'string', 'desktop', 'desktop ou mobile (mobile L1 adiciona botão CTA + ícones sociais)'],
      ['level', 'int', '1', 'Level 1 ou Level 2 (L2 adiciona Menu Title Aleo Bold no topo)'],
    ],
    ['max-w-280 width (não 320)', 'border-r border-primary-100 (não box shadow)', 'Scrollbar custom (12px wide, 4px bar, neutral-700)'],
    ['Não embutir search bar dentro do drawer', 'Não agrupar items por Editorias/Institucional — é lista flat', 'Items sem ícones leading, chevrons trailing ou dividers'],
  ],
  [
    'sponsor-line', 'Sponsor Line', '2676:8328', 2, true,
    'Linha de atribuição de conteúdo patrocinado com label e nome da empresa ou logo.',
    [
      ['type', 'string', 'text', "'text' (Company Name como Link Button) ou 'logo' (imagem 148×48)"],
    ],
    ['text-label-sm (11px) Open Sans SemiBold para label "Conteúdo Patrocinado"', 'Company Name em Aleo Bold text-title-md (16px) secondary-950', 'Usar partial _partials/sponsor-line.php em todas as composições de cards patrocinados'],
    ['Não uppercase ou aumentar tracking no label', 'Cor do label é text-neutral-900, não text-neutral-700', 'Não usar variante Sponsor Box ou Logo dentro de cards — são showcase-only'],
  ],
  [
    'tag', 'Tag', '567:9604', 2, false,
    'Chip pequeno de keyword com background primary-100 e texto primary-800 para marcação de tópicos.',
    [
      ['label', 'string', '—', 'Texto do keyword ou tópico'],
    ],
    ['Usar para marcar keywords ou tópicos em cards e headers de artigos', 'Renderizar como <span> por padrão; trocar para <a> em contexto WordPress', 'hover:bg-neutral-50 hover:text-secondary-950 via pseudo-classe CSS'],
    ['Radius é rounded-sm (4px), não rounded-full', 'Cor enabled é primary-800, não primary-600', 'Não usar rounded-lg ou qualquer radius diferente de rounded-sm'],
  ],
  [
    'text-field', 'Text Field', '1757:14338', 6, true,
    'Input de texto Material 3 com label, ícone leading, ícone trailing opcional e seis estados de interação.',
    [
      ['state', 'string', 'enabled', "'enabled' | 'placeholder' | 'hovered' | 'focused' | 'error' | 'disabled'"],
      ['leadingIcon', 'bool', 'true', 'Ícone 16px em chip 32×32 à esquerda'],
      ['trailingIcon', 'bool', 'false', 'Ícone close (ou error) à direita'],
      ['required', 'bool', 'false', 'Adiciona asterisco (*) ao label'],
      ['supportingText', 'string', '—', 'Texto auxiliar ou de erro abaixo do campo'],
    ],
    ['border-secondary-950 para estado focused', 'Valor arbitrário inline border-[#bf0413] para estado error', 'Sempre mostrar ícone leading (master do Figma inclui em todos os estados)'],
    ['Altura é h-10 (40px), não h-12', 'Forma é rounded-sm (4px), não rounded-full', 'Para error usar #bf0413 (Material error red), não token coral'],
  ],
  [
    'tooltip', 'Tooltip', '1859:19519', 4, true,
    'Tooltip balloon Material 3 com seta CSS em qualquer um dos quatro lados.',
    [
      ['side', 'string', 'top', "'top' | 'right' | 'bottom' | 'left'"],
    ],
    ['Seta via CSS border-trick (não SVG): 11.5px wide, 5px tall', 'bg-neutral-950 (#283857) como background', 'text-label-md (12px SemiBold) text-white para o label'],
    ['Não usar border-4 (8px) para seta — é 5px tall e 11.5px wide', 'Radius é rounded-sm (4px), não rounded-lg ou full', 'Background é neutral-950 (#283857), não black (#000)'],
  ],
  [
    'video-card', 'Video Card', '1678:20955', 14, false,
    'Card de artigo de vídeo idêntico ao News Card com play button overlay top-left no thumbnail.',
    [
      ['size', 'string', 'medium', "'large' | 'medium' | 'small' | 'xsmall'"],
      ['orientation', 'string', 'vertical', "'vertical' ou 'horizontal'"],
      ['image', 'bool', 'true', 'Mostra/esconde thumbnail com play overlay'],
    ],
    ['Play button overlay (size-10 top-3 left-3) no canto superior esquerdo da imagem', 'Usar <div> (não <button>) para play overlay dentro de card <a> link', 'group-hover:scale-105 na imagem para affordance de engajamento'],
    ['Não centralizar play button em cards — top-left é a convenção de card', 'Não adicionar translate-x-0.5 ao SVG', 'Não usar partial play-button — usar <div> com pointer-events-none'],
  ],
  [
    'video-card-inverse', 'Video Card Inverse', '2803:26398', 14, true,
    'Variante dark-background do Video Card com texto branco e categoria pill para contraste.',
    [
      ['size', 'string', 'medium', "'large' | 'medium' | 'small' | 'xsmall'"],
      ['orientation', 'string', 'vertical', "'vertical' ou 'horizontal'"],
    ],
    ['Usar em seções de background escuro (componente não tem bg próprio)', 'Categoria chip=on (bg-white text-mint) para legibilidade', 'text-white para título e text-neutral-50 para lead e autor'],
    ['Não adicionar bg-primary-600 como container do card — seção pai fornece background', 'Categoria deve ser chip=on (pill), não chip=off', 'Título deve ser text-white, não text-primary-600'],
  ],
  [
    'video-container', 'Video Container', '872:7575', 1, true,
    'Player de vídeo embeddado 704×396 com play button invertido azul e pill de time-code.',
    [
      ['(fixo)', '—', '—', 'Sem variantes — componente único. Trocar <img> por <iframe>/<video>'],
    ],
    ['Play button invertido (bg-primary-600 + text-white) — diferente de todos os outros contextos', 'Pill Video Time (bg-primary-600/80, bottom-right, "99:99:99")', 'overflow-hidden + rounded-sm no container 704×396'],
    ['Não usar partial play-button — este componente usa esquema de cor invertido', 'Não adicionar <figcaption> — master não tem', 'Não usar bg-white + text-primary-600 — esta é a única instância invertida'],
  ],
  [
    'video-image', 'Video Image', '2790:25832', 8, true,
    'Thumbnail de vídeo standalone em 4 tamanhos com play overlay centrado semi-transparente no hover.',
    [
      ['size', 'string', 'medium', "'large' | 'medium' | 'small' | 'xsmall'"],
      ['state', 'string', 'enabled', "'enabled' (sem play) ou 'hovered' (play centrado bg-white/80)"],
    ],
    ['Centralizar play overlay (não top-left) — convenção standalone difere de card', 'Play só em Hovered — Enabled não tem play overlay', 'bg-white/80 (semi-transparente) para background do play'],
    ['Não mostrar play button em estado Enabled', 'Não posicionar no top-left — isso é convenção de card, não standalone', 'Não usar bg-white sólido — usar bg-white/80'],
  ],
  [
    'webstories', 'Webstories', '202:2100', 2, true,
    'Card vertical 9:16 de stories com imagem em camadas, chip de categoria, headline e lead revelado no hover.',
    [
      ['state', 'string', 'enabled', "'enabled' (headline visível) ou 'hovered' (lead revelado + zoom imagem)"],
    ],
    ['aspect-[320/569] (~9:16) para formato vertical', 'bg-primary-600/70 (sólido) para área do headline em Enabled', 'Gradient (from-primary-600/0 via-primary-600/70 to-primary-600) em Hovered'],
    ['Não mostrar lead text em Enabled — só aparece em Hovered', 'Não usar gradient escuro (primary-950/90) — usar institucional blue (primary-600)', 'Largura correta é 320px, não 180'],
  ],
  [
    'widget-em-alta', 'Widget Em Alta', '3492:42255', 2, true,
    'Widget sidebar "Em Alta" com top-5 artigos numerados usando numerais editoriais grandes.',
    [
      ['device', 'string', 'desktop', 'desktop (w-392, número display-sm 36px) ou mobile (w-344, número headline-md 28px)'],
    ],
    ['bg-neutral-50 (#e9eaec) como background do widget, não branco', 'rounded-lg (8px) para container do widget', 'Números em Aleo Bold 36px (desktop) ou 28px (mobile) neutral-900'],
    ['Não usar partial section-title para heading do widget', 'Cor do número é neutral-900, não primary-600 ou neutral-400', 'Não mostrar labels de categoria nos items — apenas número + título'],
  ],
  [
    'widget-podcast', 'Widget Podcast', '3074:48896', 2, true,
    'Widget sidebar de podcast com 5 episódios, um sub-card patrocinado e ação footer "Todos os episódios".',
    [
      ['device', 'string', 'desktop', 'desktop (w-496 fixo) ou mobile (fluido)'],
    ],
    ['Primeiro item como sub-card patrocinado (bg-white bordered) com Sponsor Line', 'PodcastImage XSmall 1:1 (104×104) para todos os items', 'Botão footer ghost "Todos os episódios" com ícone arrow_forward'],
    ['Não usar bg-white como background do widget — usar bg-neutral-50', 'Largura desktop correta é 496px, não 360', 'CTA footer é ghost Button, não link-button'],
  ],
];

// ── Navigation helpers ──────────────────────────────────────
$slugs = array_column($components, 0);

function getSidebarHtml($activeSlug, $components) {
    $lines = [];
    foreach ($components as $c) {
        $slug = $c[0];
        $name = $c[1];
        $v = $c[3];
        $cls = ($slug === $activeSlug) ? 'ds-sl active' : 'ds-sl';
        $lines[] = "    <a class=\"{$cls}\" href=\"/src/docs/ds/components/{$slug}.html\">{$name} <span class=\"ds-bv\">{$v}</span></a>";
    }
    return implode("\n", $lines);
}

function getPropsHtml($props) {
    $rows = '';
    foreach ($props as $p) {
        $name = htmlspecialchars($p[0]);
        $type = htmlspecialchars($p[1]);
        $default = htmlspecialchars($p[2]);
        $desc = htmlspecialchars($p[3]);
        $rows .= "            <tr>
              <td><code class=\"ds-pn\">{$name}</code></td>
              <td><span class=\"ds-pt\">{$type}</span></td>
              <td><code>{$default}</code></td>
              <td>{$desc}</td>
            </tr>\n";
    }
    return $rows;
}

function getGuidelinesHtml($dos, $donts) {
    $doLi = '';
    foreach ($dos as $d) $doLi .= "              <li>" . htmlspecialchars($d) . "</li>\n";
    $dontLi = '';
    foreach ($donts as $d) $dontLi .= "              <li>" . htmlspecialchars($d) . "</li>\n";
    return "          <div class=\"ds-gdo\">
            <h4>&#10003; Use quando</h4>
            <ul>
{$doLi}            </ul>
          </div>
          <div class=\"ds-gdont\">
            <h4>&#10007; Não use quando</h4>
            <ul>
{$dontLi}            </ul>
          </div>";
}

// ── Generate each page ──────────────────────────────────────
$count = 0;
foreach ($components as $i => $c) {
    [$slug, $name, $figma, $variants, $validated, $desc, $props, $dos, $donts] = $c;

    $figmaUrl = "https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=" . str_replace(':', '-', $figma);
    $figmaUrlJs = "https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id={$figma}";
    $componentFile = "/src/components/{$slug}.php";
    $validBadge = $validated
        ? '<span class="ds-bval">&#10003; Validado contra Figma</span>'
        : '<span class="ds-bvar" style="background:#fff7e6;color:#B05223;">&#9888; Inferido</span>';

    // Prev / Next
    $prevHtml = '';
    $nextHtml = '';
    if ($i > 0) {
        $ps = $components[$i-1][0];
        $pn = $components[$i-1][1];
        $prevHtml = "<a href=\"/src/docs/ds/components/{$ps}.html\" class=\"ds-pnbtn\">
          <span class=\"ds-pnlbl\">&larr; Anterior</span>
          <span class=\"ds-pnname\">{$pn}</span>
        </a>";
    }
    if ($i < count($components) - 1) {
        $ns = $components[$i+1][0];
        $nn = $components[$i+1][1];
        $nextHtml = "<a href=\"/src/docs/ds/components/{$ns}.html\" class=\"ds-pnbtn ds-pnright\">
          <span class=\"ds-pnlbl\">Pr&oacute;ximo &rarr;</span>
          <span class=\"ds-pnname\">{$nn}</span>
        </a>";
    }

    $sidebar = getSidebarHtml($slug, $components);
    $propsRows = getPropsHtml($props);
    $guidelines = getGuidelinesHtml($dos, $donts);

    $html = <<<HTML
<!doctype html>
<html lang="pt-br">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{$name} — Canais Digitais DS</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Aleo:wght@400;600;700&family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/src/docs/output.css">
  <link rel="stylesheet" href="/src/docs/ds/assets/ds.css">
</head>
<body>

<header class="ds-topbar">
  <a class="ds-logo" href="/src/docs/ds/index.html">Canais Digitais <span>DS</span></a>
  <nav class="ds-tnav">
    <a href="/src/docs/ds/index.html">Docs</a>
    <a href="/src/docs/ds/components/avatar.html" class="active">Components</a>
    <a href="/src/docs/ds/templates/index.html">Templates</a>
  </nav>
  <div class="ds-tsearch">
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="white" stroke-width="1.5"><circle cx="6.5" cy="6.5" r="4.5"/><path d="m10 10 3 3"/></svg>
    <input id="ds-search" placeholder="Buscar componente..." autocomplete="off">
    <div id="ds-search-results" class="ds-search-results"></div>
  </div>
  <a class="ds-tlink" href="https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0" target="_blank">↗ Figma</a>
</header>

<div class="ds-layout">

  <aside class="ds-sidebar">
    <div class="ds-sg">Introdução</div>
    <a class="ds-sl" href="/src/docs/ds/index.html">Sobre o DS</a>

    <div class="ds-sg">Foundations</div>
    <a class="ds-sl" href="/src/docs/ds/foundations/tokens.html">Tokens</a>
    <a class="ds-sl" href="/src/docs/ds/foundations/typography.html">Tipografia</a>
    <a class="ds-sl" href="/src/docs/ds/foundations/icons.html">Ícones</a>
    <a class="ds-sl" href="/src/docs/ds/foundations/grid.html">Grid</a>

    <div class="ds-sdiv"></div>
    <div class="ds-sg">Componentes</div>
{$sidebar}

    <div class="ds-sdiv"></div>
    <div class="ds-sg">Templates</div>
    <a class="ds-sl" href="/src/docs/ds/templates/404.html">404</a>
    <a class="ds-sl" href="/src/docs/ds/templates/buscar.html">Buscar</a>
    <a class="ds-sl" href="/src/docs/ds/templates/categoria.html">Categoria</a>
    <a class="ds-sl" href="/src/docs/ds/templates/conteudo.html">Conteúdo</a>
    <a class="ds-sl" href="/src/docs/ds/templates/form-download.html">Form Download</a>
    <a class="ds-sl" href="/src/docs/ds/templates/form-newsletter.html">Form Newsletter</a>
    <a class="ds-sl" href="/src/docs/ds/templates/home.html">Home</a>
    <a class="ds-sl" href="/src/docs/ds/templates/menu.html">Menu</a>
  </aside>

  <main class="ds-main">
    <div class="ds-mi">

      <nav class="ds-bc">
        <a href="/src/docs/ds/index.html">DS</a>
        <span>›</span>
        <a href="/src/docs/ds/components/avatar.html">Componentes</a>
        <span>›</span>
        <span>{$name}</span>
      </nav>

      <div class="ds-page-header">
        <h1 class="ds-page-title">{$name}</h1>
        <p class="ds-page-desc">{$desc}</p>
        <div class="ds-page-meta">
          {$validBadge}
          <span class="ds-bvar">{$variants} variantes</span>
          <a class="ds-flink" href="{$figmaUrl}" target="_blank">↗ Ver no Figma</a>
        </div>
      </div>

      <h2 class="ds-stitle">Preview</h2>
      <div class="ds-pwrap">
        <div class="ds-ptoolbar">
          <span class="ds-plabel">Todas as variantes</span>
          <div class="ds-bgdots">
            <span class="ds-bglabel">BG</span>
            <div class="ds-bgd active" style="background:#fff" onclick="dsBg('',this)" title="Branco"></div>
            <div class="ds-bgd" style="background:#f8f9fb" onclick="dsBg('light',this)" title="Claro"></div>
            <div class="ds-bgd" style="background:#002244" onclick="dsBg('dark',this)" title="Escuro"></div>
            <div class="ds-bgd" style="background:repeating-linear-gradient(45deg,#ddd,#ddd 2px,#f5f5f5 2px,#f5f5f5 8px)" onclick="dsBg('checker',this)" title="Checker"></div>
          </div>
          <button class="ds-cbtn" onclick="dsCopy(this)">Copiar código</button>
        </div>

        <div class="ds-pbody" id="ds-preview">
          <div id="ds-preview-inner">Carregando...</div>
        </div>

        <div class="ds-tabs">
          <button class="ds-tab active" onclick="dsTab('preview',this)">Preview</button>
          <button class="ds-tab" onclick="dsTab('code',this)">Código PHP</button>
          <button class="ds-tab" onclick="dsTab('props',this)">Props</button>
          <button class="ds-tab" onclick="dsTab('guidelines',this)">Guidelines</button>
        </div>

        <pre class="ds-cblock" id="ds-tab-code">Carregando código...</pre>

        <table class="ds-ptable" id="ds-tab-props">
          <thead>
            <tr><th>Prop</th><th>Tipo</th><th>Padrão</th><th>Descrição</th></tr>
          </thead>
          <tbody>
{$propsRows}          </tbody>
        </table>

        <div class="ds-guides" id="ds-tab-guidelines">
{$guidelines}
        </div>
      </div>

      <nav class="ds-pnav">
        {$prevHtml}
        {$nextHtml}
      </nav>

    </div>
  </main>
</div>

<script src="/src/docs/ds/assets/fuse.min.js"></script>
<script src="/src/docs/ds/assets/ds.js"></script>
<script>
  window.DS_PAGE = {
    section: 'components',
    slug: '{$slug}',
    componentFile: '{$componentFile}',
    figmaNodeId: '{$figma}'
  };
</script>

</body>
</html>
HTML;

    $path = $outDir . '/' . $slug . '.html';
    file_put_contents($path, $html);
    $count++;
    echo "  ✓ {$slug}.html\n";
}

echo "\nDone: {$count} component pages generated.\n";
