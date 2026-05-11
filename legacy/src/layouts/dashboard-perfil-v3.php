<?php
/**
 * Layout: Dashboard de Perfil v3 — modelo "tabbed" (Figma 6155:31441)
 * v1 (dashboard-perfil.php) e v2 (dashboard-perfil-v2.php) preservados.
 *
 * 6 abas via ?tab=:
 *   geral       → Visão geral (hero + stats + recent news)
 *   perfil      → Lista de Profile Box (3 seções) + Drawer 560px
 *   newsletter  → opções do canal acessado (Food Connection) + institucional
 *   downloads   → 8 download items + pagination
 *   favoritos   → DESABILITADA (chip "Em breve")
 *   conta       → Método de acesso + Sessões + Privacidade & LGPD
 *
 * Drawer (somente em perfil) via ?drawer=:
 *   dados-pessoais | dados-profissionais | dados-fiscais
 *
 * Estados via ?state=:
 *   saved → toast + auto-redirect 4s.
 *   empty → simula novo usuário (0 downloads, 0 newsletters, 0 leituras)
 *           na aba "Visão geral" — exibe empty states com CTA por seção.
 *
 * Acesso: /src/layouts/dashboard-perfil-v3.php
 */

$activeCategory = null;
require_once __DIR__ . '/_session.php';

// Dashboard sempre renderiza como logado
$headerArgs['userLoggedIn'] = true;
$headerArgs['userName']     = 'Mariana Albuquerque';
$headerArgs['userEmail']    = 'mariana.albuquerque@empresa.com.br';
$headerArgs['userInitials'] = 'MA';

// Tab ativo
$tab = $_GET['tab'] ?? 'geral';
$allowedTabs = ['geral', 'perfil', 'newsletter', 'downloads', 'conta'];
if (!in_array($tab, $allowedTabs, true)) $tab = 'geral';

// Drawer (só faz sentido em ?tab=perfil)
$drawer = $_GET['drawer'] ?? null;
$allowedDrawers = ['dados-pessoais', 'dados-profissionais', 'dados-fiscais'];
if ($drawer && (!in_array($drawer, $allowedDrawers, true) || $tab !== 'perfil')) {
  $drawer = null;
}

// State (saved → toast; empty → novo usuário sem atividade)
$viewState = $_GET['state'] ?? 'default';
$isSaved   = $viewState === 'saved';
$isEmpty   = $viewState === 'empty';

// Mock perfil (14 campos canônicos)
// Estado pós-cadastro: nome/email/telefone/empresa/cargo/setor preenchidos no signup;
// nascimento/gênero não são coletados; bloco fiscal/localização vem vazio (pais default Brasil).
$campos = [
  'nome'       => 'Mariana Albuquerque',
  'email'      => 'mariana.albuquerque@empresa.com.br',
  'telefone'   => '+55 (11) 98786-9879',
  'nascimento' => '',
  'genero'     => '',
  'empresa'    => 'Grupo Camargo Alimentos S/A',
  'cargo'      => 'Gerente',
  'setor'      => 'Alimentos & Bebidas',
  'cpf'        => '',
  'pais'       => 'Brasil',
  'estado'     => '',
  'cidade'     => '',
  'cep'        => '',
  'endereco'   => '',
  'numero'     => '',
  'complemento'=> '',
];

// Opções de select reutilizadas do cadastro
$opcoesGenero = ['Masculino', 'Feminino', 'Prefiro não informar'];
$opcoesCargo  = ['Diretor(a)', 'Gerente', 'Coordenador(a)', 'Analista', 'Consultor(a)', 'Outro'];
$opcoesSetor  = ['Agro', 'Alimentos & Bebidas', 'Embalagens', 'Saúde', 'Logística', 'Varejo', 'Tecnologia', 'Outro'];
$opcoesPais   = ['Brasil', 'Argentina', 'Chile', 'Colômbia', 'México', 'Peru', 'Portugal', 'Outro'];
$totalFields  = count($campos);
$filledFields = count(array_filter($campos, fn($v) => $v !== ''));
$pct          = (int) round(($filledFields / $totalFields) * 100);
$missing      = $totalFields - $filledFields;

// Querystring extra para preservar ?user=
$queryExtra = isset($_GET['user']) ? '&user=' . htmlspecialchars($_GET['user']) : '';

// Helper para link das tabs/drawers
$baseHref = '/src/layouts/dashboard-perfil-v3.php';
$tabHref  = fn($t) => $baseHref . '?tab=' . $t . $queryExtra;
$drawerHref = fn($d) => $baseHref . '?tab=perfil&drawer=' . $d . $queryExtra;

// Drawer data
$drawerData = null;
if ($drawer === 'dados-pessoais') {
  $drawerData = [
    'title'  => 'Dados pessoais',
    'fields' => [
      ['label' => 'Nome completo',      'value' => $campos['nome'],     'required' => true],
      ['label' => 'E-mail corporativo', 'value' => $campos['email'],    'type' => 'email', 'disabled' => true, 'required' => true],
      ['label' => 'Telefone',           'value' => $campos['telefone'], 'required' => true],
      ['label' => 'Data de nascimento', 'value' => $campos['nascimento'], 'placeholder' => 'dd/mm/aaaa'],
      ['label' => 'Gênero',             'value' => $campos['genero'],   'type' => 'select', 'options' => $opcoesGenero, 'placeholder' => 'Selecione'],
    ],
  ];
} elseif ($drawer === 'dados-profissionais') {
  $drawerData = [
    'title'  => 'Dados profissionais',
    'fields' => [
      ['label' => 'Empresa', 'value' => $campos['empresa'], 'required' => true],
      ['label' => 'Cargo',   'value' => $campos['cargo'],   'type' => 'select', 'options' => $opcoesCargo, 'placeholder' => 'Selecione seu cargo',  'required' => true],
      ['label' => 'Setor',   'value' => $campos['setor'],   'type' => 'select', 'options' => $opcoesSetor, 'placeholder' => 'Selecione o setor principal', 'required' => true],
    ],
  ];
} elseif ($drawer === 'dados-fiscais') {
  // Bloco inteiro opcional aqui no perfil — só é exigido na hora do download.
  $drawerData = [
    'title'  => 'Dados Demográficos',
    'fields' => [
      ['label' => 'CPF / CNPJ', 'value' => $campos['cpf'],      'placeholder' => '000.000.000-00'],
      ['label' => 'CEP',        'value' => $campos['cep'],      'placeholder' => '00000-000',
        'attrs' => ['data-cep-autofill' => '', 'inputmode' => 'numeric', 'maxlength' => '9'],
        'help'  => 'Preenche automaticamente país, estado, cidade e endereço.'],
      ['label' => 'País',       'value' => $campos['pais'],     'type' => 'select', 'options' => $opcoesPais,
        'attrs' => ['data-cep-fill' => 'pais']],
      ['label' => 'Estado',     'value' => $campos['estado'],   'placeholder' => 'UF',
        'attrs' => ['data-cep-fill' => 'uf']],
      ['label' => 'Cidade',     'value' => $campos['cidade'],
        'attrs' => ['data-cep-fill' => 'localidade']],
      ['label' => 'Endereço',   'value' => $campos['endereco'], 'col_span' => 9,
        'attrs' => ['data-cep-fill' => 'logradouro']],
      ['label' => 'Número',     'value' => $campos['numero'],   'col_span' => 3, 'placeholder' => 'Nº',
        'attrs' => ['inputmode' => 'numeric']],
      ['label' => 'Complemento','value' => $campos['complemento'], 'placeholder' => 'Apto, sala, bloco...'],
    ],
  ];
}

// Form HTML para drawer
// NOTA: usa inline styles pro grid 12-col em vez das utilities Tailwind
// (`grid-cols-12` / `col-span-*`). No localhost as utilities funcionam, mas em
// ambientes WP reais (CSS do tema/plugins carregado fora dos @layer) elas eram
// sobrescritas e os campos ficavam espremidos lado a lado. Inline style garante
// que o layout sobrevive a qualquer ordem de carga/override de stylesheet.
$drawerContent = '';
if ($drawerData) {
  $gridStyle = 'display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:16px;row-gap:24px;width:100%;';
  ob_start();
  echo '<div style="' . $gridStyle . '">';
  foreach ($drawerData['fields'] as $f):
    $type        = $f['type']        ?? 'text';
    $val         = (string)($f['value'] ?? '');
    $disabled    = !empty($f['disabled']);
    $required    = !empty($f['required']);
    $options     = $f['options']     ?? [];
    $placeholder = $f['placeholder'] ?? '';
    $help        = $f['help']        ?? '';
    $colSpan     = (int)($f['col_span'] ?? 12);
    if ($colSpan < 1 || $colSpan > 12) $colSpan = 12;
    $colStyle    = 'grid-column:span ' . $colSpan . '/span ' . $colSpan . ';min-width:0;';
    $attrsArr    = $f['attrs']       ?? [];
    $attrsHtml   = '';
    foreach ($attrsArr as $k => $v) {
      $attrsHtml .= ' ' . htmlspecialchars($k) . ($v === '' ? '' : '="' . htmlspecialchars($v) . '"');
    }
?>
    <div class="flex flex-col" style="<?= $colStyle ?>">
      <label class="font-body font-semibold text-label-lg <?= $disabled ? 'text-neutral-500' : 'text-neutral-950' ?> px-1 pb-1">
        <?= htmlspecialchars($f['label']) ?><?php if ($required): ?><span aria-hidden="true">*</span><?php endif; ?>
      </label>
      <?php if ($type === 'select'): ?>
        <div class="relative bg-white border border-neutral-100 focus-within:border-secondary-950 flex h-10 items-center rounded-sm w-full">
          <select <?= $required ? 'required' : '' ?><?= $attrsHtml ?> class="flex-1 w-full h-full pl-3 pr-8 bg-transparent text-body-lg font-body <?= $val === '' ? 'text-neutral-500' : 'text-primary-600' ?> focus:text-primary-600 focus:outline-none appearance-none">
            <?php if ($placeholder !== ''): ?>
              <option value="" <?= $val === '' ? 'selected' : '' ?>><?= htmlspecialchars($placeholder) ?></option>
            <?php endif; ?>
            <?php foreach ($options as $opt): ?>
              <option value="<?= htmlspecialchars($opt) ?>" <?= $val === $opt ? 'selected' : '' ?>><?= htmlspecialchars($opt) ?></option>
            <?php endforeach; ?>
          </select>
          <svg class="size-4 absolute right-3 text-neutral-500 pointer-events-none" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M7 10l5 5 5-5z"/>
          </svg>
        </div>
      <?php else: ?>
        <div class="<?= $disabled ? 'bg-neutral-50' : 'bg-white' ?> border border-neutral-100 <?= $disabled ? '' : 'focus-within:border-secondary-950' ?> flex h-10 items-center rounded-sm w-full">
          <input type="<?= htmlspecialchars($type) ?>" value="<?= htmlspecialchars($val) ?>"
                 placeholder="<?= htmlspecialchars($placeholder) ?>"
                 <?= $required ? 'required' : '' ?>
                 <?= $disabled ? 'disabled aria-disabled="true"' : '' ?><?= $attrsHtml ?>
                 class="flex-1 w-full h-full px-3 bg-transparent text-body-lg font-body <?= $disabled ? 'text-neutral-500 cursor-not-allowed' : 'text-primary-600' ?> placeholder:text-neutral-400 focus:outline-none">
        </div>
      <?php endif; ?>
      <?php if ($help): ?>
        <p class="mt-1 px-1 font-body text-label-md text-neutral-700"><?= htmlspecialchars($help) ?></p>
      <?php endif; ?>
    </div>
<?php
  endforeach;
  echo '</div>';
  $drawerContent = ob_get_clean();
}

// Hrefs do drawer
$drawerCloseHref = $tabHref('perfil');
$drawerSaveHref  = $baseHref . '?tab=perfil&state=saved' . $queryExtra;
?>
<main class="bg-white min-h-screen flex flex-col">

  <?php get_template_part('components/_partials/header-desktop', null, $headerArgs); ?>

  <!-- Welcome banner -->
  <div class="max-w-screen-xl mx-auto w-full px-4 lg:px-6 pt-10 pb-6">
    <?php get_template_part('components/_partials/dashboard-welcome', null, [
      'firstName'  => 'Mariana',
      'email'      => 'mariana.albuquerque@empresa.com.br',
      'initials'   => 'MA',
      'avatarSrc'  => null,
      'logoutHref' => '/src/layouts/home.php',
    ]); ?>
  </div>

  <!-- Tabs -->
  <div class="max-w-screen-xl mx-auto w-full px-4 lg:px-6 pt-4">
    <?php get_template_part('components/_partials/dashboard-tabs-v3', null, [
      'active'     => $tab,
      'baseHref'   => $baseHref,
      'queryExtra' => $queryExtra,
    ]); ?>
  </div>

  <!-- Pane -->
  <div class="flex-1 max-w-screen-xl mx-auto w-full px-4 lg:px-6 py-10">

    <?php if ($tab === 'geral'): ?>
    <!-- ===================== VISÃO GERAL ===================== -->
    <div class="flex flex-col gap-4">

      <!-- Hero + stats -->
      <div class="flex flex-col lg:flex-row gap-4 items-stretch">
        <!-- Hero card mint-light -->
        <div class="flex-[3] bg-mint-light rounded-lg pl-8 pr-12 py-8 flex items-center gap-8">
          <!-- Gauge SVG 140 -->
          <div class="relative size-[140px] shrink-0">
            <?php
              $r = 60;
              $circ = 2 * M_PI * $r;
              $arc = ($pct / 100) * $circ;
            ?>
            <svg width="140" height="140" viewBox="0 0 140 140" aria-hidden="true">
              <circle cx="70" cy="70" r="<?= $r ?>" fill="none" stroke="rgba(0,34,68,.15)" stroke-width="8"/>
              <circle cx="70" cy="70" r="<?= $r ?>" fill="none"
                      stroke="var(--color-mint)" stroke-width="8" stroke-linecap="round"
                      stroke-dasharray="<?= number_format($arc, 2, '.', '') ?> 999"
                      transform="rotate(-90 70 70)"
                      style="transition: stroke-dasharray 600ms cubic-bezier(0.2,0,0,1);"/>
            </svg>
            <div class="absolute inset-0 flex flex-col items-center justify-center text-primary-600">
              <span class="font-display font-bold text-headline-md leading-none"><?= $pct ?>%</span>
              <span class="font-body font-semibold text-label-sm tracking-wider mt-1">COMPLETO</span>
            </div>
          </div>
          <!-- Texto -->
          <div class="flex-1 min-w-0 flex flex-col gap-4">
            <h2 class="font-display font-bold text-headline-sm text-primary-600 leading-tight">
              Receba conteúdos mais relevantes para você
            </h2>
            <p class="font-body text-body-md text-primary-600">
              <strong class="font-bold">Faltam <?= $missing ?> campos para chegar a 100%</strong>. Cada informação afina o que chega até você em conteúdos, newsletters e eventos.
            </p>
            <a href="<?= htmlspecialchars($tabHref('perfil')) ?>"
               class="inline-flex items-center gap-2 h-8 pl-4 pr-3 rounded-full bg-primary-600 text-white hover:bg-secondary-950 transition-colors font-body font-bold text-body-md w-fit">
              Completar perfil
              <svg class="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Stats column -->
        <div class="flex-1 flex flex-col gap-4">
          <a href="<?= htmlspecialchars($tabHref('downloads')) ?>"
             class="group bg-white border border-primary-100 rounded-lg p-5 flex flex-col gap-3 hover:border-secondary-950 transition-colors">
            <div class="flex items-center gap-4">
              <div class="bg-neutral-50 inline-flex items-center justify-center p-3 rounded-lg shrink-0">
                <svg class="size-6 <?= $isEmpty ? 'text-neutral-500' : 'text-primary-600' ?>" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                </svg>
              </div>
              <span class="font-display font-bold text-headline-lg <?= $isEmpty ? 'text-neutral-500' : 'text-primary-600 group-hover:text-secondary-950' ?> transition-colors"><?= $isEmpty ? '0' : '12' ?></span>
            </div>
            <span class="font-body font-semibold text-label-lg text-neutral-900">Downloads totais</span>
          </a>
          <a href="<?= htmlspecialchars($tabHref('newsletter')) ?>"
             class="group bg-white border border-primary-100 rounded-lg p-5 flex flex-col gap-3 hover:border-secondary-950 transition-colors">
            <div class="flex items-center gap-4">
              <div class="bg-neutral-50 inline-flex items-center justify-center p-3 rounded-lg shrink-0">
                <svg class="size-6 <?= $isEmpty ? 'text-neutral-500' : 'text-primary-600' ?>" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <span class="font-display font-bold text-headline-lg <?= $isEmpty ? 'text-neutral-500' : 'text-primary-600 group-hover:text-secondary-950' ?> transition-colors"><?= $isEmpty ? '0' : '2' ?></span>
            </div>
            <span class="font-body font-semibold text-label-lg text-neutral-900">Newsletters ativas</span>
          </a>
        </div>
      </div>

      <div class="h-4"></div>

      <!-- Recent news -->
      <section>
        <h2 class="font-display font-bold text-title-xl text-primary-600 mb-4">Últimas leituras</h2>

        <?php if ($isEmpty): ?>
        <div class="bg-neutral-50 border border-primary-100 rounded-lg px-6 py-12 flex flex-col items-center text-center gap-3">
          <div class="size-14 rounded-full bg-white border border-primary-100 inline-flex items-center justify-center">
            <svg class="size-7 text-primary-600" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/>
            </svg>
          </div>
          <h3 class="font-display font-bold text-title-md text-primary-600">Você ainda não leu nenhum artigo</h3>
          <p class="font-body text-body-md text-neutral-700 max-w-md">Explore o portal e comece agora. Seus artigos lidos aparecem aqui automaticamente.</p>
          <a href="/src/layouts/home.php<?= $queryExtra ? '?' . ltrim($queryExtra, '&') : '' ?>"
             class="mt-3 inline-flex items-center gap-2 h-10 pl-5 pr-4 rounded-full bg-primary-600 hover:bg-secondary-950 text-white font-body font-bold text-body-md transition-colors">
            Explorar conteúdos
            <svg class="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
            </svg>
          </a>
        </div>
        <?php else: ?>
        <div class="flex flex-col">
          <?php
          $recent = [
            ['category' => 'Proteína Animal',   'title' => 'Como fazer o transporte de pescados frescos corretamente',                                  'portal' => 'Food Connection', 'when' => 'há poucos segundos'],
            ['category' => 'Ingredientes',      'title' => 'Creatina além da musculação: benefícios comprovados para saúde e cognição',                 'portal' => 'Food Connection', 'when' => 'há 2 minutos'],
            ['category' => 'Food Service',      'title' => 'Por que a experiência do cliente em restaurantes ainda não escala?',                        'portal' => 'Food Connection', 'when' => 'ontem'],
            ['category' => 'Fispal Tecnologia', 'title' => 'Coquetel da Fispal 2026 antecipa agenda estratégica e oportunidades de negócio',            'portal' => 'Food Connection', 'when' => 'há 3 dias'],
            ['category' => 'Tecnocarne',        'title' => 'Smart Processing: inovação ao vivo na Tecnocarne South America',                            'portal' => 'Food Connection', 'when' => 'há 1 ano'],
          ];
          foreach ($recent as $i => $r):
            get_template_part('components/_partials/recent-news-item', null, [
              'category' => $r['category'],
              'title'    => $r['title'],
              'portal'   => $r['portal'],
              'when'     => $r['when'],
              'href'     => '/src/layouts/conteudo.php',
              'isLast'   => $i === count($recent) - 1,
            ]);
          endforeach;
          ?>
        </div>
        <?php endif; ?>
      </section>
    </div>

    <?php elseif ($tab === 'perfil'): ?>
    <!-- ===================== PERFIL ===================== -->
    <div class="flex flex-col gap-6">
      <header class="flex flex-col gap-1">
        <h2 class="font-display font-bold text-title-xl text-primary-600">Perfil</h2>
        <p class="font-body text-body-md text-neutral-600"><?= $pct ?>% completo — <?= $missing ?> campos restantes.</p>
      </header>

      <!-- Foto de perfil -->
      <div class="flex flex-col gap-2">
        <h3 class="font-display font-bold text-title-md text-primary-600">
          Foto de perfil <span class="font-body font-normal text-neutral-950">(Opcional)</span>
        </h3>
        <div class="bg-neutral-50/60 border-2 border-dashed border-neutral-100 rounded-lg p-6 flex items-center gap-4">
          <div class="size-16 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
            <span class="font-body font-semibold text-headline-sm text-primary-600 leading-none">MA</span>
          </div>
          <div class="flex-1 min-w-0 flex flex-col gap-1">
            <p class="font-body font-bold text-label-lg text-primary-600">
              Arraste uma imagem ou <a href="#" class="text-secondary-950 hover:underline">procure nos seus arquivos</a>
            </p>
            <p class="font-body text-body-md text-neutral-600">JPG ou PNG, máx. 2 MB.</p>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <?php get_template_part('components/_partials/profile-box', null, [
          'icon'        => 'account_circle',
          'title'       => 'Dados pessoais',
          'description' => 'Informações de identificação da sua conta',
          'fields'      => [$campos['nome'], $campos['email'], $campos['telefone']],
          'href'        => $drawerHref('dados-pessoais'),
          'cta'         => 'Atualizar',
          'chip'        => 'Complete seu Perfil',
          'incomplete'  => true,
        ]); ?>
        <?php get_template_part('components/_partials/profile-box', null, [
          'icon'        => 'business_center',
          'title'       => 'Dados profissionais',
          'description' => 'Define suas recomendações de conteúdo e newsletter',
          'fields'      => [$campos['empresa'], $campos['cargo'], $campos['setor']],
          'href'        => $drawerHref('dados-profissionais'),
          'cta'         => 'Atualizar',
        ]); ?>
        <?php get_template_part('components/_partials/profile-box', null, [
          'icon'        => 'location_on',
          'title'       => 'Dados Demográficos',
          'description' => 'Solicitado apenas quando você baixa materiais',
          'fields'      => ['CPF / CNPJ', 'Cidade, UF', 'Endereço'],
          'href'        => $drawerHref('dados-fiscais'),
          'cta'         => 'Preencher',
          'incomplete'  => true,
          'placeholder' => true,
          'chip'        => 'Preencha e personalize sua experiência',
        ]); ?>
      </div>
    </div>

    <?php elseif ($tab === 'newsletter'): ?>
    <!-- ===================== NEWSLETTER ===================== -->
    <?php
    // Newsletters exibidas são exclusivas do canal acessado (Food Connection).
    // A institucional da Informa Markets é cross-portal e fica no topo.
    $newsletters = [
      ['title' => 'Novidades e ofertas da Informa Markets', 'desc' => 'Comunicações comerciais, convites para eventos e lançamentos institucionais.',                                                                                                                                  'checked' => true ],
      ['title' => 'Food Connection',                        'desc' => 'O canal de conteúdo oficial das feiras FiSA, Fispal Tecnologia, Tecnocarne e Fispal Food Service. Tendências, entrevistas e novidades para quem move a cadeia de alimentos e bebidas.',                         'checked' => true ],
      ['title' => 'FiSA',                                   'desc' => 'Cobertura da Feira Internacional de Ingredientes, Aditivos e Tecnologia para a Indústria de Alimentos e Bebidas.',                                                                                              'checked' => false],
      ['title' => 'Fispal Tecnologia',                      'desc' => 'Conteúdo da feira de processos, embalagens e logística para a indústria de alimentos e bebidas.',                                                                                                              'checked' => false],
      ['title' => 'Tecnocarne',                             'desc' => 'Tendências e inovações da indústria da carne — processamento, equipamentos, ingredientes e mercado.',                                                                                                          'checked' => false],
      ['title' => 'Fispal Food Service',                    'desc' => 'O canal de conteúdo do food service brasileiro: bares, restaurantes, padarias, hotelaria, delivery e operações.',                                                                                              'checked' => false],
    ];
    $totalNl  = count($newsletters);
    $activeNl = count(array_filter($newsletters, fn($n) => $n['checked']));
    ?>
    <div data-component="newsletter-list" class="flex flex-col gap-6">
      <header class="flex flex-col gap-1">
        <h2 class="font-display font-bold text-title-xl text-primary-600">Newsletter</h2>
        <p class="font-body text-body-md text-neutral-600">Escolha o que deseja receber. Suas alterações são salvas automaticamente.</p>
      </header>

      <!-- Summary -->
      <div class="bg-neutral-50 rounded-lg px-6 py-4">
        <p data-newsletter-count class="font-body font-semibold text-body-md text-primary-600">
          <?= $activeNl ?> newsletters ativas de <?= $totalNl ?> opções disponíveis
        </p>
      </div>

      <!-- Items -->
      <div class="flex flex-col">
        <?php
        foreach ($newsletters as $i => $nl):
          get_template_part('components/_partials/newsletter-item', null, [
            'id'      => 'nl-v3-' . $i,
            'title'   => $nl['title'],
            'desc'    => $nl['desc'],
            'checked' => $nl['checked'],
            'isLast'  => $i === count($newsletters) - 1,
          ]);
        endforeach;
        ?>
      </div>
    </div>

    <?php elseif ($tab === 'downloads'): ?>
    <!-- ===================== DOWNLOADS ===================== -->
    <?php
    $page = max(1, (int)($_GET['page'] ?? 1));
    $perPage = 8;
    $allDownloads = [
      ['icon' => 'pdf', 'title' => 'Proteína de inseto: produção e regulação desse alimento no Brasil',                                                   'portal' => 'Food Connection', 'date' => '12 Jan 2026', 'size' => '2.6 MB', 'disabled' => false],
      ['icon' => 'pdf', 'title' => 'Ozempic, 6×1 e custo da mão de obra: como esses e outros assuntos moldam as tendências para o Food Service em 2026', 'portal' => 'Food Connection', 'date' => '15 Fev 2026', 'size' => '3.2 MB', 'disabled' => false],
      ['icon' => 'pdf', 'title' => 'Alternativas vegetais: como as proteínas de origem vegetal estão ganhando espaço na dieta brasileira',                'portal' => 'Food Connection', 'date' => '20 Mar 2026', 'size' => '2.8 MB', 'disabled' => false],
      ['icon' => 'pdf', 'title' => 'Linhas de crédito e financiamento para a indústria de alimentos e bebidas: panorama 2026',                            'portal' => 'Food Connection', 'date' => '25 Abr 2026', 'size' => '1.9 MB', 'disabled' => false],
      ['icon' => 'pdf', 'title' => 'Comida de rua: tendências e regulamentações em crescimento nas principais cidades do Brasil',                         'portal' => 'Food Connection', 'date' => '30 Mai 2026', 'size' => '2.5 MB', 'disabled' => false],
      ['icon' => 'pdf', 'title' => 'Revolução FoodTech no Brasil: tecnologias que estão reinventando a cadeia de A&B',                                    'portal' => 'Food Connection', 'date' => '10 Jun 2026', 'size' => '3.0 MB', 'disabled' => true ],
      ['icon' => 'pdf', 'title' => 'Embalagens sustentáveis: o que muda no setor de alimentos com a nova regulamentação',                                 'portal' => 'Food Connection', 'date' => '15 Jul 2026', 'size' => '2.3 MB', 'disabled' => false],
      ['icon' => 'pdf', 'title' => 'Saúde e nutrição: como as novas diretrizes estão reformulando a indústria de alimentos',                              'portal' => 'Food Connection', 'date' => '22 Ago 2026', 'size' => '2.7 MB', 'disabled' => false],
    ];
    $totalDownloads = count($allDownloads);
    $totalPages = max(1, (int) ceil($totalDownloads / $perPage));
    $page = min($page, $totalPages);
    $offset = ($page - 1) * $perPage;
    $downloads = array_slice($allDownloads, $offset, $perPage);
    ?>
    <div class="flex flex-col gap-6">
      <header class="flex flex-col gap-1">
        <h2 class="font-display font-bold text-title-xl text-primary-600">Meus downloads</h2>
        <p class="font-body text-body-md text-neutral-600">Baixe novamente qualquer material a qualquer momento.</p>
      </header>

      <div class="flex flex-col">
        <?php foreach ($downloads as $i => $d):
          get_template_part('components/_partials/download-item', null, [
            'icon'      => $d['icon'],
            'title'     => $d['title'],
            'portal'    => $d['portal'],
            'date'      => $d['date'],
            'size'      => $d['size'],
            'titleHref' => '/src/layouts/conteudo.php',
            'fileHref'  => '/src/layouts/form-download.php?user=logged',
            'disabled'  => $d['disabled'],
            'isLast'    => $i === count($downloads) - 1,
          ]);
        endforeach; ?>
      </div>

      <?php if ($totalPages > 1): ?>
      <div class="pt-4">
        <?php get_template_part('components/_partials/pagination', null, [
          'current'   => $page,
          'total'     => $totalPages,
          'baseHref'  => $baseHref . '?tab=downloads' . $queryExtra,
          'pageParam' => 'page',
        ]); ?>
      </div>
      <?php endif; ?>
    </div>

    <?php elseif ($tab === 'conta'): ?>
    <!-- ===================== CONTA ===================== -->
    <div class="flex flex-col gap-10">
      <header class="flex flex-col gap-1">
        <h2 class="font-display font-bold text-title-xl text-primary-600">Minha Conta</h2>
        <p class="font-body text-body-md text-neutral-600">Gerenciamento de acesso, sessões e dados da sua Conta Informa.</p>
      </header>

      <!-- Método de acesso -->
      <section>
        <h3 class="font-display font-bold text-title-lg text-primary-600 mb-4">Método de acesso</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <?php get_template_part('components/_partials/access-method-card', null, [
            'icon'    => 'mail',
            'name'    => 'E-mail e senha',
            'chip'    => 'Ativo',
            'detail'  => 'mariana.albuquerque@empresa.com.br',
            'cta'     => 'Alterar senha',
            'ctaHref' => '#',
          ]); ?>
          <?php get_template_part('components/_partials/access-method-card', null, [
            'icon'    => 'linkedin',
            'name'    => 'LinkedIn',
            'chip'    => null,
            'detail'  => 'Conecte seu LinkedIn para entrar sem senha',
            'cta'     => 'Conectar',
            'ctaHref' => '#',
          ]); ?>
          <?php get_template_part('components/_partials/access-method-card', null, [
            'icon'    => 'google',
            'name'    => 'Google',
            'chip'    => null,
            'detail'  => 'Conecte seu Google para entrar sem senha',
            'cta'     => 'Conectar',
            'ctaHref' => '#',
          ]); ?>
        </div>
      </section>

      <!-- Sessões ativas -->
      <section>
        <h3 class="font-display font-bold text-title-lg text-primary-600 mb-4">Sessões ativas</h3>
        <div class="flex flex-col">
          <?php
          $sessions = [
            ['device' => 'MacBook Pro 14"', 'browser' => 'Chrome',        'location' => 'São Paulo, BR',     'last' => 'Agora mesmo', 'current' => true],
            ['device' => 'iPhone 15',       'browser' => 'Safari Mobile', 'location' => 'São Paulo, BR',     'last' => 'há 2 horas',  'current' => false],
            ['device' => 'Windows 11',      'browser' => 'Edge',          'location' => 'Rio de Janeiro, BR','last' => 'há 3 dias',   'current' => false],
          ];
          foreach ($sessions as $i => $s):
            get_template_part('components/_partials/session-row', null, [
              'device'   => $s['device'],
              'browser'  => $s['browser'],
              'location' => $s['location'],
              'last'     => $s['last'],
              'current'  => $s['current'],
              'isLast'   => $i === count($sessions) - 1,
            ]);
          endforeach;
          ?>
        </div>
      </section>

      <!-- Privacidade & LGPD -->
      <section>
        <header class="mb-4">
          <h3 class="font-display font-bold text-title-lg text-primary-600">Privacidade &amp; LGPD</h3>
          <p class="font-body text-body-md text-neutral-600 mt-1">Você tem controle total sobre seus dados conforme a LGPD. Todas as alterações são registradas.</p>
        </header>
        <div class="flex flex-col">
          <?php get_template_part('components/_partials/general-item', null, [
            'icon'   => 'download',
            'title'  => 'Baixar meus dados',
            'desc'   => 'Faça o download de uma cópia de seus dados a qualquer momento.',
            'href'   => '/src/layouts/meus-dados.php' . ($queryExtra ? '?' . ltrim($queryExtra, '&') : ''),
            'isLast' => false,
          ]); ?>
          <?php /* Histórico de consentimentos — suprimido provisoriamente (2026-04-30) */ ?>
          <?php get_template_part('components/_partials/general-item', null, [
            'icon'   => 'delete',
            'title'  => 'Excluir minha conta',
            'desc'   => 'Direito ao esquecimento. Processamos em até 30 dias.',
            'href'   => '/src/layouts/excluir-conta.php' . ($queryExtra ? '?' . ltrim($queryExtra, '&') : ''),
            'danger' => true,
            'isLast' => true,
          ]); ?>
        </div>
      </section>
    </div>

    <?php endif; ?>
  </div>

  <?php get_template_part('components/_partials/footer-desktop', null, []); ?>

  <!-- Drawer (somente em ?tab=perfil&drawer=...) -->
  <?php if ($drawerData): ?>
  <?php get_template_part('components/_partials/drawer', null, [
    'open'       => true,
    'title'      => $drawerData['title'],
    'closeHref'  => $drawerCloseHref,
    'cancelHref' => $drawerCloseHref,
    'saveHref'   => $drawerSaveHref,
    'content'    => $drawerContent,
  ]); ?>
  <?php endif; ?>

  <!-- Toast (state=saved) -->
  <?php if ($isSaved): ?>
  <div class="fixed bottom-24 right-6 z-50">
    <?php get_template_part('components/_partials/toast', null, [
      'type'    => 'success',
      'message' => 'Alterações salvas.',
    ]); ?>
  </div>
  <script>setTimeout(() => { window.location.href = '<?= htmlspecialchars($tabHref($tab)) ?>'; }, 4000);</script>
  <?php endif; ?>

</main>
<script type="module" src="/src/assets/js/interactions.js"></script>
