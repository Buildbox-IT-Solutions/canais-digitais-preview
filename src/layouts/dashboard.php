<?php
/**
 * Layout: Dashboard (Área logada) — v2.0
 * Figma origem: handoff bundle claude.ai/design (XPNP-UV2HoZVzPlYIw44QA)
 *
 * Hub da área logada. Sub-navegação com 7 abas via ?section=:
 *   - visao        → Visão geral (hero + completion + reading + stats)
 *   - biblio       → Biblioteca (EM BREVE)
 *   - favoritos    → Favoritos (EM BREVE)
 *   - arquivos     → Arquivos baixados (tabela)
 *   - newsletters  → Toggles de opt-in
 *   - perfil       → Edição de 14 campos (sub-aba ?tab=)
 *   - conta        → Método de acesso, sessões, LGPD
 *
 * Força estado logado (_session.php recebe ?user=logged).
 */

require_once __DIR__ . '/_session.php';

// Se não veio user=logged, injeta (dashboard é área logada por definição).
if (!$isLogged) {
  $isLogged = true;
  $sessionUser = [
    'name'     => 'Ana Souza',
    'email'    => 'ana.souza@informa.com',
    'initials' => 'AS',
    'avatar'   => null,
  ];
  $headerArgs = [
    'activeCategory' => null,
    'userLoggedIn'   => true,
    'userName'       => $sessionUser['name'],
    'userEmail'      => $sessionUser['email'],
    'userInitials'   => $sessionUser['initials'],
    'userAvatar'     => null,
  ];
}

$section = $_GET['section'] ?? 'visao';
$allowedSections = ['visao', 'biblio', 'favoritos', 'arquivos', 'newsletters', 'perfil', 'conta'];
if (!in_array($section, $allowedSections, true)) $section = 'visao';

$perfilTab = $_GET['tab'] ?? 'basico';
$allowedTabs = ['basico', 'prof', 'fiscal', 'demo'];
if (!in_array($perfilTab, $allowedTabs, true)) $perfilTab = 'basico';

// Mock de dados do usuário (14 campos — 7 preenchidos)
$campos = [
  'nome'       => $sessionUser['name'] ?? 'Ana Souza',
  'email'      => $sessionUser['email'] ?? 'ana.souza@informa.com',
  'telefone'   => '+55 (11) 98765-4321',
  'senha'      => '********',
  'empresa'    => 'Informa Markets Brasil',
  'cargo'      => 'Gerente',
  'setor'      => 'Varejo & E-commerce',
  'foto'       => '',
  'cpf'        => '',
  'pais'       => 'Brasil',
  'estado'     => '',
  'cidade'     => '',
  'nascimento' => '',
  'genero'     => '',
];
$filled = count(array_filter($campos, fn($v) => $v !== ''));
$total = count($campos);
$pct = (int) round(($filled / $total) * 100);

$userQS = 'user=logged';

$sectoresList = [
  'Alimentos & Bebidas', 'Beleza & Cosméticos', 'Saúde & Hospitalar',
  'Tecnologia & Inovação', 'Varejo & E-commerce', 'Logística & Cadeia',
  'Indústria & Manufatura', 'Sustentabilidade & ESG', 'Comunicação & Mídia',
  'Energia', 'Construção', 'Agronegócio',
];
?>
<main class="min-h-screen bg-neutral-50/40 flex flex-col">

  <?php get_template_part('components/_partials/dashboard-header', null, [
    'headerArgs'    => $headerArgs,
    'activeSection' => $section,
  ]); ?>

  <?php if ($section === 'visao'): ?>
  <!-- ===================== VISÃO GERAL ===================== -->
  <div class="max-w-screen-xl mx-auto w-full px-4 lg:px-6 pt-10 pb-12 flex flex-col">

    <!-- Hero -->
    <div class="mb-6">
      <?php
      $diasSemana = ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado'];
      $meses = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
      $dataHoje = $diasSemana[(int)date('w')] . ', ' . (int)date('j') . ' de ' . $meses[(int)date('n') - 1];
      ?>
      <div class="font-body font-semibold text-label-md uppercase tracking-wider text-neutral-500 mb-2">
        <?= $dataHoje ?>
      </div>
      <h1 class="font-display font-bold text-headline-lg leading-tight tracking-tight text-primary-600">
        Bom dia, <?= explode(' ', $sessionUser['name'])[0] ?><span class="text-coral">.</span>
      </h1>
    </div>

    <!-- Profile completion (inline) -->
    <?php if ($pct < 100): ?>
    <div class="flex items-center gap-4 p-4 rounded-lg bg-neutral-50 border border-neutral-100 mb-10">
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-3 mb-2">
          <span class="font-body font-bold text-title-sm text-primary-600">Perfil <?= $pct ?>% completo</span>
          <span class="font-body text-body-sm text-neutral-700">Faltam <?= $total - $filled ?> campos</span>
        </div>
        <div class="h-[3px] rounded-full bg-neutral-200 overflow-hidden max-w-md">
          <div class="h-full rounded-full bg-coral" style="width: <?= $pct ?>%"></div>
        </div>
      </div>
      <a href="?section=perfil&<?= $userQS ?>"
         class="inline-flex items-center gap-1.5 h-9 px-4 rounded-full border-[1.5px] border-primary-600 text-primary-600 hover:bg-white font-body font-bold text-label-lg transition-colors shrink-0">
        Completar
        <svg class="size-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
      </a>
    </div>
    <?php else: ?>
    <div class="mb-10"></div>
    <?php endif; ?>

    <!-- Continue reading -->
    <div>
      <div class="flex items-baseline justify-between mb-5">
        <h3 class="font-display font-bold text-title-xl text-primary-600">Leituras em andamento</h3>
        <a href="?section=favoritos&<?= $userQS ?>" class="font-body font-bold text-label-lg uppercase tracking-wider text-primary-600 hover:underline">
          Ver tudo
        </a>
      </div>
      <div class="flex flex-col divide-y divide-neutral-100">
        <?php foreach ([
          ['title' => 'A nova lógica do varejo: como grandes redes brasileiras estão redesenhando a jornada física', 'p' => 68, 'chip' => 'Varejo',    'chipBg' => 'bg-mint',         'when' => '4 min restantes'],
          ['title' => 'ESG no B2B: o que os compradores realmente cobram agora',                                   'p' => 32, 'chip' => 'ESG',       'chipBg' => 'bg-secondary-500', 'when' => 'Parou há 3 dias'],
          ['title' => 'Indústria brasileira registra maior alta mensal desde 2022',                               'p' => 18, 'chip' => 'Indústria', 'chipBg' => 'bg-primary-600',   'when' => 'Parou há 1 semana'],
        ] as $a): ?>
        <a href="#" class="flex items-center gap-4 py-4 hover:bg-neutral-50/50 transition-colors group">
          <div class="flex-1 min-w-0">
            <div class="font-display font-bold text-title-md leading-tight text-primary-600 line-clamp-1 group-hover:text-secondary-950 transition-colors">
              <?= $a['title'] ?>
            </div>
            <div class="flex items-center gap-3 mt-2">
              <span class="inline-flex items-center rounded-xs <?= $a['chipBg'] ?> text-white px-2 py-0.5 font-body font-bold text-label-sm uppercase tracking-wider">
                <?= $a['chip'] ?>
              </span>
              <div class="flex items-center gap-2 flex-1 max-w-[200px]">
                <div class="flex-1 h-[3px] rounded-full bg-neutral-100 overflow-hidden">
                  <div class="h-full rounded-full bg-coral" style="width: <?= $a['p'] ?>%"></div>
                </div>
                <span class="font-body font-semibold text-label-sm text-neutral-500"><?= $a['p'] ?>%</span>
              </div>
              <span class="font-body text-body-sm text-neutral-500"><?= $a['when'] ?></span>
            </div>
          </div>
          <svg class="size-4 text-neutral-300 group-hover:text-primary-600 transition-colors shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
        </a>
        <?php endforeach; ?>
      </div>
    </div>

  </div>

  <?php elseif ($section === 'biblio'): ?>
  <!-- ===================== BIBLIOTECA (EM BREVE) ===================== -->
  <div class="max-w-screen-xl mx-auto w-full px-4 lg:px-6 py-16">
    <?php get_template_part('components/_partials/coming-soon', null, [
      'chip'        => 'Biblioteca premium',
      'icon'        => 'book',
      'title'       => 'Biblioteca em breve',
      'description' => 'Estamos finalizando a curadoria de whitepapers, e-books e relatórios da Informa Markets. Avisaremos por e-mail quando abrirmos o acesso para você.',
      'ctaLabel'    => 'Avisar quando lançar',
    ]); ?>
  </div>

  <?php elseif ($section === 'favoritos'): ?>
  <!-- ===================== FAVORITOS (EM BREVE) ===================== -->
  <div class="max-w-screen-xl mx-auto w-full px-4 lg:px-6 py-16">
    <?php get_template_part('components/_partials/coming-soon', null, [
      'chip'        => 'Favoritos',
      'icon'        => 'bookmark',
      'title'       => 'Favoritos em breve',
      'description' => 'Em breve você poderá salvar matérias para ler depois, organizadas em coleções e sincronizadas em todos os dispositivos.',
      'ctaLabel'    => 'Avisar quando lançar',
    ]); ?>
  </div>

  <?php elseif ($section === 'arquivos'): ?>
  <!-- ===================== ARQUIVOS ===================== -->
  <div class="max-w-screen-xl mx-auto w-full px-4 lg:px-6 pt-10 pb-12">
    <div class="mb-8">
      <h2 class="font-display font-bold text-headline-lg text-primary-600 tracking-tight">
        Seus downloads<span class="text-coral">.</span>
      </h2>
      <p class="font-body text-body-lg text-neutral-700 mt-2">
        2 materiais baixados.
      </p>
    </div>

    <div class="bg-white rounded-xl shadow-lg overflow-hidden">
      <div class="grid gap-4 px-6 py-4 border-b border-neutral-50 font-body font-bold text-label-md uppercase tracking-wider text-neutral-500"
           style="grid-template-columns: 1fr 140px 120px 140px 60px;">
        <span>Nome</span><span>Tipo</span><span>Tamanho</span><span>Baixado em</span><span></span>
      </div>
      <?php foreach ([
        ['title' => 'Automação industrial: um guia para decisores', 'tipo' => 'E-book',     'chipBg' => 'bg-primary-600', 'size' => '8.7 MB', 'date' => '18/04/2026'],
        ['title' => 'Embalagens inteligentes e o novo consumidor',  'tipo' => 'Whitepaper', 'chipBg' => 'bg-coral',       'size' => '3.4 MB', 'date' => '02/04/2026'],
      ] as $i => $f): ?>
      <div class="grid gap-4 px-6 py-5 <?= $i === 0 ? 'border-b border-neutral-50' : '' ?> items-center"
           style="grid-template-columns: 1fr 140px 120px 140px 60px;">
        <div class="flex items-center gap-3.5 min-w-0">
          <div class="size-11 rounded-sm bg-neutral-50 inline-flex items-center justify-center text-primary-600 shrink-0">
            <svg class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zM8 13v-2h8v2H8zm0 4v-2h5v2H8z"/></svg>
          </div>
          <span class="font-display font-bold text-title-md text-primary-600 truncate"><?= $f['title'] ?></span>
        </div>
        <span class="inline-flex w-fit items-center rounded-xs <?= $f['chipBg'] ?> text-white px-2 py-1 font-body font-bold text-label-sm uppercase tracking-wider">
          <?= $f['tipo'] ?>
        </span>
        <span class="font-body text-body-md text-neutral-900"><?= $f['size'] ?></span>
        <span class="font-body text-body-md text-neutral-900"><?= $f['date'] ?></span>
        <button type="button" class="inline-flex items-center justify-center size-10 rounded-full text-primary-600 hover:bg-neutral-50 transition-colors" aria-label="Baixar novamente">
          <svg class="size-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
        </button>
      </div>
      <?php endforeach; ?>
    </div>
  </div>

  <?php elseif ($section === 'newsletters'): ?>
  <!-- ===================== NEWSLETTERS ===================== -->
  <div class="max-w-screen-xl mx-auto w-full px-4 lg:px-6 pt-10 pb-12">
    <div class="mb-8">
      <h2 class="font-display font-bold text-headline-lg text-primary-600 tracking-tight">
        Suas newsletters<span class="text-coral">.</span>
      </h2>
      <p class="font-body text-body-lg text-neutral-700 mt-2 max-w-2xl">
        Ative os setores que te interessam. Opt-in separado das notificações da conta.
      </p>
    </div>

    <div class="bg-white rounded-xl shadow-lg overflow-hidden">
      <?php
      $newsletters = [
        ['id' => 'capa',      'title' => 'Manchete do dia',        'desc' => 'As três notícias que definem a pauta, todo dia 7h.',                                   'freq' => 'Diária',     'on' => true],
        ['id' => 'varejo',    'title' => 'Varejo & Consumo',       'desc' => 'Grandes redes, omnichannel, comportamento de compra.',                                 'freq' => 'Semanal',    'on' => true],
        ['id' => 'industria', 'title' => 'Indústria & Manufatura', 'desc' => 'Automação, cadeias, indicadores industriais.',                                         'freq' => 'Semanal',    'on' => false],
        ['id' => 'esg',       'title' => 'ESG no B2B',             'desc' => 'Métricas, regulação e o que os compradores cobram.',                                   'freq' => 'Quinzenal',  'on' => true],
        ['id' => 'feiras',    'title' => 'Agenda de feiras',       'desc' => 'Cosmoprof, Fispal, Hospitalar, Feimec, FESPA — datas e destaques.',                    'freq' => 'Mensal',     'on' => false],
        ['id' => 'patroc',    'title' => 'Leituras patrocinadas',  'desc' => 'Conteúdo selecionado de parceiros e anunciantes.',                                     'freq' => 'Opcional',   'on' => false],
      ];
      $last = count($newsletters) - 1;
      foreach ($newsletters as $i => $n): ?>
      <label class="flex items-center gap-5 px-6 py-4 cursor-pointer group <?= $i < $last ? 'border-b border-neutral-50' : '' ?>">
        <input type="checkbox" <?= $n['on'] ? 'checked' : '' ?> data-newsletter-toggle class="absolute opacity-0 pointer-events-none">
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2.5 mb-1">
            <h4 class="font-display font-bold text-title-md text-primary-600"><?= $n['title'] ?></h4>
            <span class="inline-block rounded-xs bg-neutral-50 text-neutral-700 px-2 py-0.5 font-body font-bold text-label-sm uppercase tracking-wider">
              <?= $n['freq'] ?>
            </span>
          </div>
          <p class="font-body text-body-sm text-neutral-700"><?= $n['desc'] ?></p>
        </div>
        <span class="relative inline-block w-11 h-6 rounded-full shrink-0 transition-colors bg-neutral-100 group-has-[:checked]:bg-primary-600">
          <span class="absolute top-[3px] left-[3px] size-[18px] rounded-full bg-white shadow-md transition-[left] group-has-[:checked]:left-[23px]"></span>
        </span>
      </label>
      <?php endforeach; ?>
    </div>
  </div>

  <?php elseif ($section === 'perfil'): ?>
  <!-- ===================== PERFIL (14 CAMPOS) ===================== -->
  <div class="max-w-screen-xl mx-auto w-full px-4 lg:px-6 pt-10 pb-12">
    <div class="mb-8">
      <h2 class="font-display font-bold text-headline-lg text-primary-600 tracking-tight">
        Meu perfil<span class="text-coral">.</span>
      </h2>
      <p class="font-body text-body-lg text-neutral-700 mt-2">
        <?= $pct ?>% completo — <?= $total - $filled ?> campos restantes.
      </p>
    </div>

    <div class="grid gap-10" style="grid-template-columns: 220px 1fr;">

      <!-- Sidebar nav -->
      <nav class="flex flex-col gap-0.5 sticky top-16 self-start">
        <?php
        $tabs = [
          ['id' => 'basico', 'label' => 'Identidade básica',    'fields' => 4, 'filled' => 4],
          ['id' => 'prof',   'label' => 'Perfil profissional',  'fields' => 4, 'filled' => 3],
          ['id' => 'fiscal', 'label' => 'Dados fiscais',        'fields' => 4, 'filled' => 1],
          ['id' => 'demo',   'label' => 'Demográfico',          'fields' => 2, 'filled' => 0],
        ];
        foreach ($tabs as $t):
          $on = $perfilTab === $t['id'];
          $done = $t['filled'] === $t['fields'];
        ?>
        <a href="?section=perfil&tab=<?= $t['id'] ?>&<?= $userQS ?>"
           class="flex items-center justify-between px-3 py-2.5 rounded-sm transition-colors
                  <?= $on ? 'bg-neutral-50 font-bold' : 'hover:bg-neutral-50/60 font-semibold' ?>">
          <span class="font-body text-title-sm text-primary-600"><?= $t['label'] ?></span>
          <?php if ($done): ?>
          <svg class="size-4 text-mint shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
          <?php else: ?>
          <span class="font-body text-label-sm text-neutral-500"><?= $t['filled'] ?>/<?= $t['fields'] ?></span>
          <?php endif; ?>
        </a>
        <?php endforeach; ?>
      </nav>

      <!-- Form -->
      <div>
        <?php if ($perfilTab === 'basico'): ?>
          <h3 class="font-display font-bold text-title-xl text-primary-600 mb-2">Identidade básica</h3>
          <p class="font-body text-body-md text-neutral-700 mb-8">Dados para identificação e comunicações essenciais.</p>

          <div class="grid grid-cols-2 gap-5">
            <div class="col-span-2">
              <?php get_template_part('components/_partials/form-field', null, ['label' => 'Nome completo', 'type' => 'text', 'placeholder' => $campos['nome'], 'required' => 'on']); ?>
            </div>
            <?php get_template_part('components/_partials/form-field', null, ['label' => 'E-mail', 'type' => 'email', 'placeholder' => $campos['email'], 'required' => 'on']); ?>
            <?php get_template_part('components/_partials/form-field', null, ['label' => 'Telefone', 'type' => 'tel', 'placeholder' => $campos['telefone'], 'required' => 'on']); ?>
            <div class="col-span-2">
              <?php get_template_part('components/_partials/form-field', null, ['label' => 'Senha', 'type' => 'text', 'placeholder' => '••••••••', 'required' => 'on']); ?>
              <p class="mt-1.5 px-1 font-body text-label-md text-neutral-500">Mín. 8 caracteres com letras e números.</p>
            </div>
          </div>

        <?php elseif ($perfilTab === 'prof'): ?>
          <h3 class="font-display font-bold text-title-xl text-primary-600 mb-2">Perfil profissional</h3>
          <p class="font-body text-body-md text-neutral-700 mb-8">Usado para recomendar feiras, matérias e materiais do seu setor.</p>

          <div class="grid grid-cols-2 gap-5">
            <?php get_template_part('components/_partials/form-field', null, ['label' => 'Empresa', 'type' => 'text', 'placeholder' => $campos['empresa'], 'required' => 'on']); ?>
            <?php get_template_part('components/_partials/form-select', null, ['label' => 'Cargo', 'value' => $campos['cargo'], 'required' => 'on']); ?>
            <div class="col-span-2">
              <?php get_template_part('components/_partials/form-select', null, ['label' => 'Setor', 'value' => $campos['setor'], 'required' => 'on']); ?>
            </div>

            <div class="col-span-2">
              <div class="flex gap-0.5 items-center pb-1 px-1">
                <span class="font-body font-semibold text-label-lg text-neutral-950">Foto de perfil</span>
                <span class="font-body text-label-md text-neutral-500 pl-1">opcional</span>
              </div>
              <div class="flex items-center gap-4 p-4 rounded-sm border-[1.5px] border-dashed border-neutral-100 bg-neutral-50/50">
                <span class="inline-flex items-center justify-center size-14 rounded-full bg-primary-600 font-display font-bold text-title-lg text-white shrink-0"><?= $sessionUser['initials'] ?? 'AS' ?></span>
                <div class="flex-1 min-w-0">
                  <div class="font-body font-semibold text-title-sm text-primary-600">
                    Arraste uma imagem ou <a href="#" class="text-secondary-950 underline">procure no seu computador</a>
                  </div>
                  <div class="font-body text-label-md text-neutral-500 mt-1">JPG ou PNG, até 2 MB.</div>
                </div>
              </div>
            </div>
          </div>

        <?php elseif ($perfilTab === 'fiscal'): ?>
          <h3 class="font-display font-bold text-title-xl text-primary-600 mb-2">Dados fiscais</h3>
          <p class="font-body text-body-md text-neutral-700 mb-8">Necessários para download de certificados e emissão de NFs.</p>

          <div class="grid grid-cols-2 gap-5">
            <?php get_template_part('components/_partials/form-field', null, ['label' => 'CPF / CNPJ', 'type' => 'text', 'placeholder' => '000.000.000-00', 'required' => 'off']); ?>
            <?php get_template_part('components/_partials/form-select', null, ['label' => 'País', 'value' => $campos['pais'], 'required' => 'off']); ?>
            <?php get_template_part('components/_partials/form-select', null, ['label' => 'Estado', 'value' => $campos['estado'], 'required' => 'off']); ?>
            <?php get_template_part('components/_partials/form-field', null, ['label' => 'Cidade', 'type' => 'text', 'placeholder' => '', 'required' => 'off']); ?>
          </div>

        <?php else: // demo ?>
          <h3 class="font-display font-bold text-title-xl text-primary-600 mb-2">Dados demográficos</h3>
          <p class="font-body text-body-md text-neutral-700 mb-8">Opcional. Usado apenas para estatísticas agregadas.</p>

          <div class="grid grid-cols-2 gap-5">
            <?php get_template_part('components/_partials/form-field', null, ['label' => 'Data de nascimento', 'type' => 'text', 'placeholder' => 'DD/MM/AAAA', 'required' => 'off']); ?>
            <?php get_template_part('components/_partials/form-select', null, ['label' => 'Gênero', 'value' => $campos['genero'], 'required' => 'off']); ?>
          </div>
        <?php endif; ?>

        <!-- Save actions -->
        <div class="flex items-center justify-end gap-2.5 mt-7 pt-5 border-t border-neutral-100">
          <?php get_template_part('components/_partials/button', null, ['label' => 'Cancelar', 'href' => '?section=visao&' . $userQS, 'type' => 'ghost', 'size' => 'medium', 'icon' => 'none']); ?>
          <?php get_template_part('components/_partials/button', null, ['label' => 'Salvar alterações', 'href' => '#', 'type' => 'filled', 'size' => 'medium', 'icon' => 'arrow-right']); ?>
        </div>
      </div>
    </div>
  </div>

  <?php elseif ($section === 'conta'): ?>
  <!-- ===================== CONTA & SEGURANÇA ===================== -->
  <div class="max-w-screen-xl mx-auto w-full px-4 lg:px-6 pt-10 pb-12 flex flex-col">
    <div class="mb-8">
      <h2 class="font-display font-bold text-headline-lg text-primary-600 tracking-tight">
        Conta & segurança<span class="text-coral">.</span>
      </h2>
    </div>

    <!-- Método de acesso -->
    <section class="bg-white rounded-xl shadow-lg p-7">
      <h3 class="font-display font-bold text-title-xl text-primary-600 mb-5">Método de acesso</h3>
      <div class="grid gap-3.5" style="grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));">
        <?php foreach ([
          ['icon' => 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z', 'label' => 'E-mail e senha', 'value' => $campos['email'],        'status' => 'Ativo',     'color' => 'text-mint'],
          ['icon' => 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286z', 'label' => 'LinkedIn', 'value' => 'Não conectado', 'status' => 'Conectar', 'color' => 'text-secondary-950'],
          ['icon' => 'M12 10.2v3.6h5.1c-.2 1.3-1.6 3.9-5.1 3.9-3.1 0-5.6-2.5-5.6-5.7s2.5-5.7 5.6-5.7c1.7 0 2.9.7 3.6 1.4l2.5-2.4C16.4 3.5 14.4 2.5 12 2.5 6.8 2.5 2.5 6.8 2.5 12S6.8 21.5 12 21.5c6.5 0 10-4.6 10-9.3 0-.6-.1-1.1-.2-1.6H12z', 'label' => 'Google', 'value' => 'Não conectado', 'status' => 'Conectar', 'color' => 'text-secondary-950'],
        ] as $m): ?>
        <div class="border border-neutral-50 rounded-sm p-4">
          <div class="flex items-center gap-3 mb-2.5">
            <svg class="size-5 text-primary-600" viewBox="0 0 24 24" fill="currentColor"><path d="<?= $m['icon'] ?>"/></svg>
            <span class="font-body font-bold text-title-sm text-primary-600"><?= $m['label'] ?></span>
          </div>
          <div class="font-body text-body-md text-neutral-900 mb-3 min-h-[20px]"><?= $m['value'] ?></div>
          <a href="#" class="font-body font-bold text-label-lg uppercase tracking-wider <?= $m['color'] ?> hover:underline"><?= $m['status'] ?></a>
        </div>
        <?php endforeach; ?>
      </div>
      <div class="flex gap-2.5 mt-5">
        <?php get_template_part('components/_partials/button', null, ['label' => 'Alterar senha', 'href' => '/src/layouts/redefine-senha.php', 'type' => 'outlined', 'size' => 'medium', 'icon' => 'none']); ?>
        <?php get_template_part('components/_partials/button', null, ['label' => 'Ativar verificação em 2 etapas', 'href' => '#', 'type' => 'outlined', 'size' => 'medium', 'icon' => 'none']); ?>
      </div>
    </section>

    <!-- Sessões ativas -->
    <section class="bg-white rounded-xl shadow-lg p-7 mt-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-display font-bold text-title-xl text-primary-600">Sessões ativas</h3>
        <a href="#" class="inline-flex items-center gap-1.5 font-body font-bold text-label-lg uppercase tracking-wider text-coral hover:underline">
          <svg class="size-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg>
          Encerrar todas as outras
        </a>
      </div>
      <?php
      $sessoes = [
        ['device' => 'MacBook Pro 14"', 'browser' => 'Chrome 128',    'location' => 'São Paulo, BR',     'last' => 'Agora mesmo', 'current' => true],
        ['device' => 'iPhone 15',       'browser' => 'Safari Mobile', 'location' => 'São Paulo, BR',     'last' => 'há 2 horas',  'current' => false],
        ['device' => 'Windows 11',      'browser' => 'Edge 127',      'location' => 'Rio de Janeiro, BR','last' => 'há 3 dias',   'current' => false],
      ];
      $lastIdx = count($sessoes) - 1;
      foreach ($sessoes as $i => $s):
        get_template_part('components/_partials/session-row', null, [
          'device'   => $s['device'],
          'browser'  => $s['browser'],
          'location' => $s['location'],
          'last'     => $s['last'],
          'current'  => $s['current'],
          'isLast'   => $i === $lastIdx,
        ]);
      endforeach; ?>
    </section>

    <!-- Privacidade LGPD -->
    <section class="mt-10 pt-8 border-t border-neutral-100">
      <h3 class="font-display font-bold text-title-xl text-primary-600 mb-2">Privacidade & LGPD</h3>
      <p class="font-body text-body-md text-neutral-700 mb-4">
        Controle total sobre seus dados. Todas as alterações são registradas.
      </p>
      <div class="flex flex-col gap-2">
        <?php foreach ([
          ['icon' => 'M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z', 'label' => 'Baixar meus dados',          'desc' => 'Receba em até 15 dias um arquivo com tudo que coletamos.', 'danger' => false],
          ['icon' => 'M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z', 'label' => 'Histórico de consentimentos', 'desc' => 'Veja quando aceitou Termos, Privacidade e Opt-ins.', 'danger' => false],
          ['icon' => 'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z',                                                                                                                                                       'label' => 'Excluir minha conta',         'desc' => 'Direito ao esquecimento. Processamos em até 30 dias.',      'danger' => true],
        ] as $a):
          $color = $a['danger'] ? 'text-coral' : 'text-primary-600';
        ?>
        <a href="#" class="flex items-center gap-3.5 p-3.5 rounded-sm hover:bg-neutral-50/60 transition-colors">
          <svg class="size-5 <?= $color ?>" viewBox="0 0 24 24" fill="currentColor"><path d="<?= $a['icon'] ?>"/></svg>
          <div class="flex-1 min-w-0">
            <div class="font-body font-bold text-title-sm <?= $color ?>"><?= $a['label'] ?></div>
            <div class="font-body text-body-sm text-neutral-700 mt-0.5"><?= $a['desc'] ?></div>
          </div>
          <svg class="size-4 text-neutral-400" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
        </a>
        <?php endforeach; ?>
      </div>
    </section>
  </div>
  <?php endif; ?>
</main>

<script type="module" src="/src/assets/js/interactions.js"></script>
