<?php
/**
 * Layout: Dashboard de Perfil (área logada) — página de fluxo
 * Spec completo: src/layouts/dashboard-perfil-spec.php
 *
 * Estados:
 *   default → leitura (Editar por campo)
 *   editing → Nome Completo em modo edição (demo)
 *   saved   → toast de sucesso + auto-redirect para ?state=default em 4s
 *
 * Modal de exclusão: togglado inline via JS (data-dashboard-action), sem redirect.
 */

$viewState = $_GET['state'] ?? 'default';
$allowedStates = ['default', 'editing', 'saved'];
if (!in_array($viewState, $allowedStates, true)) {
  $viewState = 'default';
}
$isEditing = $viewState === 'editing';
$isSaved   = $viewState === 'saved';

function render_field_row(array $args): void {
  $id       = $args['id']       ?? 'field-' . md5($args['label']);
  $label    = $args['label']    ?? '';
  $value    = $args['value']    ?? '';
  $editing  = $args['editing']  ?? false;
  $readOnly = $args['readOnly'] ?? false;
  $hint     = $args['hint']     ?? null;
  $type     = $args['type']     ?? 'text';
?>
  <div class="flex flex-col gap-1 py-4" data-field-state="<?= $editing ? 'edit' : 'read' ?>">
    <div class="flex items-start justify-between gap-4">
      <div class="flex-1 min-w-0">
        <p class="font-body font-semibold text-label-lg text-neutral-950"><?= $label ?></p>

        <?php if ($editing): ?>
          <div class="mt-2 bg-white border border-secondary-950 flex h-10 items-center rounded-sm w-full max-w-[480px]">
            <input id="<?= $id ?>" type="<?= $type ?>" value="<?= $value ?>" class="flex-1 w-full h-full px-3 bg-transparent text-body-lg font-body text-primary-600 focus:outline-none">
          </div>
        <?php else: ?>
          <p class="mt-1 font-body text-body-lg <?= $value ? 'text-neutral-950' : 'text-neutral-500 italic' ?>">
            <?= $value ?: 'Não informado' ?>
          </p>
        <?php endif; ?>

        <?php if ($hint): ?>
          <p class="mt-1 font-body text-label-md text-neutral-500"><?= $hint ?></p>
        <?php endif; ?>
      </div>

      <div class="shrink-0">
        <?php if ($editing): ?>
          <div class="flex items-center gap-2">
            <a href="?state=default" class="inline-flex items-center justify-center h-10 px-4 rounded-full bg-transparent text-primary-600 hover:bg-neutral-50 transition-colors font-body font-bold text-label-lg">Cancelar</a>
            <a href="?state=saved" data-analytics-event="perfil_campo_salvo" class="inline-flex items-center justify-center h-10 px-5 rounded-full bg-primary-600 text-white hover:bg-secondary-950 transition-colors font-body font-bold text-label-lg">Salvar</a>
          </div>
        <?php elseif ($readOnly): ?>
          <span class="inline-flex items-center gap-1.5 rounded-full bg-neutral-50 px-3 py-1 font-body text-label-md text-neutral-600">
            <svg class="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2z"/></svg>
            Conectado ao LinkedIn
          </span>
        <?php else: ?>
          <a href="?state=editing" class="inline-flex items-center gap-1 h-10 px-3 rounded-full text-secondary-950 hover:bg-neutral-50 transition-colors font-body font-bold text-label-lg">
            <svg class="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
            Editar
          </a>
        <?php endif; ?>
      </div>
    </div>
  </div>
<?php }
?>
<main class="bg-white min-h-screen">

  <?php
  $activeCategory = null;
  require_once __DIR__ . '/_session.php';
  // Dashboard sempre renderiza como logado
  $headerArgs['userLoggedIn'] = true;
  $headerArgs['userName']     = 'Maria Silva';
  $headerArgs['userEmail']    = 'maria.silva@empresa.com.br';
  $headerArgs['userInitials'] = 'MS';
  get_template_part('components/_partials/header-desktop', null, $headerArgs);
  ?>

  <!-- Page header -->
  <section class="bg-neutral-50 border-b border-neutral-100">
    <div class="max-w-screen-xl mx-auto px-4 lg:px-6 py-10">
      <div class="flex flex-col md:flex-row md:items-start gap-6">
        <?php get_template_part('components/_partials/avatar', null, [
          'src'   => 'https://i.pravatar.cc/160?img=47',
          'alt'   => 'Maria Silva',
          'shape' => 'rounded',
          'size'  => 'lg',
        ]); ?>
        <div class="flex-1 min-w-0">
          <p class="font-body text-label-md text-neutral-600 uppercase tracking-wider">Minha Conta Informa</p>
          <h1 class="mt-1 font-display text-headline-md text-neutral-950">Maria Silva</h1>
          <p class="font-body text-body-md text-neutral-700">maria.silva@empresa.com.br</p>
          <p class="font-body text-body-sm text-neutral-600 mt-2 max-w-[480px]">
            Sua conta é válida em todos os portais Informa.
            Ao acessar outro portal, faça login com o mesmo e-mail e senha.
          </p>
        </div>
        <div class="shrink-0 flex flex-col items-start md:items-end gap-3">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                      bg-secondary-50 text-secondary-950 font-body text-label-sm whitespace-nowrap">
            <svg class="size-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            Conta Informa · Desde abr. 2026
          </div>
          <a href="/" class="inline-flex items-center gap-1.5 font-body font-bold text-label-lg text-neutral-600 hover:text-primary-600 transition-colors">
            <svg class="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg>
            Sair
          </a>
        </div>
      </div>

      <div class="mt-6">
        <?php get_template_part('components/_partials/profile-progress', null, [
          'filledFields' => 8,
          'totalFields'  => 14,
        ]); ?>
      </div>
    </div>
  </section>

  <!-- Conteúdo -->
  <section class="max-w-screen-xl mx-auto px-4 lg:px-6 py-12">
    <div class="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10">

      <aside>
        <nav class="lg:sticky lg:top-6 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible -mx-4 lg:mx-0 px-4 lg:px-0 pb-2 lg:pb-0" aria-label="Seções do perfil">
          <a href="#basicos" class="inline-flex items-center h-10 px-3 rounded-lg bg-neutral-50 text-primary-600 font-body font-bold text-label-lg whitespace-nowrap">Dados básicos</a>
          <a href="#profissionais" class="inline-flex items-center h-10 px-3 rounded-lg hover:bg-neutral-50 text-neutral-700 hover:text-primary-600 font-body font-semibold text-label-lg whitespace-nowrap">Profissionais</a>
          <a href="#fiscais" class="inline-flex items-center h-10 px-3 rounded-lg hover:bg-neutral-50 text-neutral-700 hover:text-primary-600 font-body font-semibold text-label-lg whitespace-nowrap">Fiscais e localização</a>
          <a href="#comunicacoes" class="inline-flex items-center h-10 px-3 rounded-lg hover:bg-neutral-50 text-neutral-700 hover:text-primary-600 font-body font-semibold text-label-lg whitespace-nowrap">Comunicações</a>
          <a href="#downloads" class="inline-flex items-center h-10 px-3 rounded-lg hover:bg-neutral-50 text-neutral-700 hover:text-primary-600 font-body font-semibold text-label-lg whitespace-nowrap">Meus Downloads</a>
          <a href="#conta" class="inline-flex items-center h-10 px-3 rounded-lg hover:bg-neutral-50 text-neutral-700 hover:text-primary-600 font-body font-semibold text-label-lg whitespace-nowrap">Conta</a>
        </nav>
      </aside>

      <div class="flex flex-col gap-14">

        <!-- Seção 1 — Dados Básicos -->
        <section id="basicos" class="flex flex-col">
          <header class="mb-2 pb-3 border-b border-neutral-100">
            <h2 class="font-display font-bold text-title-xl text-neutral-950">Dados básicos</h2>
            <p class="mt-1 font-body text-body-md text-neutral-700">Informações que identificam você no portal.</p>
          </header>

          <div class="flex items-center justify-between gap-4 py-5 border-b border-neutral-100">
            <div class="flex items-center gap-4">
              <?php get_template_part('components/_partials/avatar', null, [
                'src' => 'https://i.pravatar.cc/160?img=47', 'alt' => 'Maria Silva', 'shape' => 'rounded', 'size' => 'md',
              ]); ?>
              <div>
                <p class="font-body font-semibold text-label-lg text-neutral-950">Foto de perfil</p>
                <p class="font-body text-label-md text-neutral-500">JPG ou PNG, máx. 2 MB.</p>
              </div>
            </div>
            <button type="button" class="inline-flex items-center gap-1.5 h-10 px-4 rounded-full border-[1.5px] border-primary-600 text-primary-600 hover:bg-neutral-50 transition-colors font-body font-bold text-label-lg">
              <svg class="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
              Trocar foto
            </button>
          </div>

          <div class="divide-y divide-neutral-100">
            <?php render_field_row(['label' => 'Nome completo', 'value' => 'Maria Silva', 'editing' => $isEditing, 'id' => 'nome-completo']); ?>
            <?php render_field_row(['label' => 'E-mail', 'value' => 'maria.silva@empresa.com.br', 'readOnly' => true, 'hint' => 'Vinculado ao seu LinkedIn — não pode ser editado.']); ?>
            <?php render_field_row(['label' => 'Telefone', 'value' => '+55 (11) 98765-4321']); ?>
            <?php render_field_row(['label' => 'Data de nascimento', 'value' => '12/05/1990', 'type' => 'date']); ?>
            <?php render_field_row(['label' => 'Gênero', 'value' => '']); ?>
          </div>
        </section>

        <section id="profissionais" class="flex flex-col">
          <header class="mb-2 pb-3 border-b border-neutral-100">
            <h2 class="font-display font-bold text-title-xl text-neutral-950">Dados profissionais</h2>
            <p class="mt-1 font-body text-body-md text-neutral-700">Ajuda a personalizar recomendações de conteúdo e eventos.</p>
          </header>

          <div class="divide-y divide-neutral-100">
            <?php render_field_row(['label' => 'Empresa', 'value' => 'Cooperativa Central Aurora']); ?>
            <?php render_field_row(['label' => 'Cargo', 'value' => 'Gerente de Marketing']); ?>
            <?php render_field_row(['label' => 'Setor', 'value' => 'Indústria A&B']); ?>
          </div>
        </section>

        <section id="fiscais" class="flex flex-col">
          <header class="mb-2 pb-3 border-b border-neutral-100">
            <h2 class="font-display font-bold text-title-xl text-neutral-950">Dados Demográficos</h2>
            <p class="mt-1 font-body text-body-md text-neutral-700">Necessário apenas em transações comerciais (inscrições pagas, compras).</p>
          </header>

          <div class="divide-y divide-neutral-100">
            <?php render_field_row(['label' => 'CPF / CNPJ', 'value' => '123.456.789-00', 'hint' => 'Máscara aplicada automaticamente; dígito verificador validado no servidor.']); ?>
            <?php render_field_row(['label' => 'País', 'value' => 'Brasil']); ?>
            <?php render_field_row(['label' => 'Estado', 'value' => 'São Paulo']); ?>
            <?php render_field_row(['label' => 'Cidade', 'value' => '']); ?>
            <?php render_field_row(['label' => 'CEP', 'value' => '01310-100', 'hint' => 'Autopreenchimento de Endereço via API ao digitar o CEP.']); ?>
            <?php render_field_row(['label' => 'Endereço', 'value' => 'Av. Paulista, 1578']); ?>
          </div>
        </section>

        <!-- Seção — Comunicações -->
        <section id="comunicacoes" class="flex flex-col">
          <header class="mb-6 pb-3 border-b border-neutral-100">
            <h2 class="font-display font-bold text-title-xl text-neutral-950">Comunicações</h2>
            <p class="mt-1 font-body text-body-md text-neutral-700">Gerencie suas preferências de e-mail.</p>
          </header>
          <div class="flex flex-col gap-6 max-w-[560px]">
            <?php get_template_part('components/_partials/form-toggle', null, [
              'id'    => 'toggle-newsletter',
              'label' => 'Receber newsletter segmentada por setor',
              'hint'  => 'Você pode cancelar a qualquer momento nas suas preferências.',
            ]); ?>
            <?php get_template_part('components/_partials/form-toggle', null, [
              'id'    => 'toggle-marketing',
              'label' => 'Receber comunicações e novidades da Informa Markets',
              'hint'  => 'Ao ativar, você concorda em receber ofertas e novidades por e-mail.',
            ]); ?>
          </div>
        </section>

        <!-- Seção — Meus Downloads -->
        <?php
        $downloads = [
          ['title' => '10 Tendências em Food Service para 2026', 'type' => 'E-book',
           'portal' => 'Food Connection', 'date' => '12 abr. 2026', 'available' => true],
          ['title' => 'Guia de Embalagens Sustentáveis', 'type' => 'Guia',
           'portal' => 'Food Connection', 'date' => '03 mar. 2026', 'available' => true],
          ['title' => 'Relatório Setorial: Proteína Animal 2025', 'type' => 'Relatório',
           'portal' => 'Food Connection', 'date' => '18 fev. 2026', 'available' => false],
          ['title' => 'Whitepaper: IA na Indústria de Alimentos', 'type' => 'Whitepaper',
           'portal' => 'Food Connection', 'date' => '05 jan. 2026', 'available' => true],
        ];
        $emptyDownloads = ($_GET['downloads'] ?? '') === 'empty';
        ?>
        <section id="downloads" class="flex flex-col">
          <header class="mb-6 pb-3 border-b border-neutral-100">
            <h2 class="font-display font-bold text-title-xl text-neutral-950">Meus Downloads</h2>
            <p class="mt-1 font-body text-body-md text-neutral-700">
              <?= $emptyDownloads ? 'Materiais que você baixou ficam disponíveis aqui.' : 'Últimos 10 materiais. Página 1 de 3.' ?>
            </p>
          </header>

          <?php if ($emptyDownloads): ?>
            <!-- Estado vazio -->
            <div class="flex flex-col items-center text-center py-12 gap-4">
              <svg class="size-12 text-neutral-200" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
              </svg>
              <div class="flex flex-col gap-1 max-w-[420px]">
                <p class="font-body font-semibold text-body-lg text-neutral-950">Você ainda não baixou nenhum material.</p>
                <p class="font-body text-body-md text-neutral-600">Explore nossa Biblioteca e faça o download de e-books e whitepapers gratuitos.</p>
              </div>
              <a href="/src/layouts/form-download.php"
                 class="inline-flex items-center gap-1.5 h-10 px-5 rounded-full border-[1.5px] border-primary-600 text-primary-600 hover:bg-neutral-50 transition-colors font-body font-bold text-label-lg">
                Ver Biblioteca
              </a>
            </div>
          <?php else: ?>
            <!-- Lista de downloads -->
            <ul class="divide-y divide-neutral-100">
              <?php foreach ($downloads as $d): ?>
                <li class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 py-4">
                  <div class="flex-1 min-w-0">
                    <p class="font-body font-semibold text-body-lg <?= $d['available'] ? 'text-neutral-950' : 'text-neutral-400' ?>">
                      <?= $d['title'] ?>
                    </p>
                    <div class="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 font-body text-label-md text-neutral-500">
                      <span><?= $d['type'] ?></span>
                      <span aria-hidden="true">·</span>
                      <span><?= $d['portal'] ?></span>
                      <span aria-hidden="true">·</span>
                      <span><?= $d['date'] ?></span>
                      <?php if (!$d['available']): ?>
                        <span class="inline-flex items-center px-2 py-0.5 rounded-full bg-neutral-50 text-neutral-500 font-body text-label-sm">Material não disponível</span>
                      <?php endif; ?>
                    </div>
                  </div>
                  <div class="shrink-0">
                    <?php if ($d['available']): ?>
                      <a href="/src/layouts/form-download.php?user=logged"
                         class="inline-flex items-center gap-1.5 h-10 px-4 rounded-full border-[1.5px] border-primary-600 text-primary-600 hover:bg-neutral-50 transition-colors font-body font-bold text-label-lg">
                        <svg class="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
                        Baixar novamente
                      </a>
                    <?php else: ?>
                      <span class="inline-flex items-center h-10 px-4 font-body font-semibold text-label-lg text-neutral-400 cursor-not-allowed">
                        Indisponível
                      </span>
                    <?php endif; ?>
                  </div>
                </li>
              <?php endforeach; ?>
            </ul>

            <!-- Paginação -->
            <nav aria-label="Paginação de downloads" class="flex items-center justify-center p-4 mt-2">
              <a href="#" aria-label="Página anterior" class="inline-flex items-center justify-center p-2 rounded-full text-primary-600 hover:bg-neutral-50 transition-colors">
                <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
              </a>
              <a href="#" aria-current="page" class="inline-flex items-center justify-center size-10 p-2 rounded-full border border-primary-600 text-primary-600 font-body font-bold text-label-lg">1</a>
              <a href="#" class="inline-flex items-center justify-center size-10 p-2 rounded-full text-neutral-900 hover:bg-neutral-50 transition-colors font-body font-bold text-label-lg">2</a>
              <a href="#" class="inline-flex items-center justify-center size-10 p-2 rounded-full text-neutral-900 hover:bg-neutral-50 transition-colors font-body font-bold text-label-lg">3</a>
              <a href="#" aria-label="Próxima página" class="inline-flex items-center justify-center p-2 rounded-full text-primary-600 hover:bg-neutral-50 transition-colors">
                <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
              </a>
            </nav>
          <?php endif; ?>

          <!-- Simuladores de estado (remover em produção) -->
          <div class="mt-4 flex items-center gap-3 font-body text-label-sm text-neutral-400">
            <span>Simular:</span>
            <a href="?" class="hover:text-primary-600 transition-colors <?= !$emptyDownloads ? 'text-primary-600 font-semibold' : '' ?>">com itens</a>
            <span>·</span>
            <a href="?downloads=empty" class="hover:text-primary-600 transition-colors <?= $emptyDownloads ? 'text-primary-600 font-semibold' : '' ?>">vazio</a>
          </div>
        </section>

        <section id="conta" class="flex flex-col">
          <header class="mb-2 pb-3 border-b border-neutral-100">
            <h2 class="font-display font-bold text-title-xl text-neutral-950">Conta</h2>
            <p class="mt-1 font-body text-body-md text-neutral-700">Encerrar sua Conta Informa.</p>
          </header>

          <div class="py-5">
            <button type="button" class="inline-flex items-center gap-2 font-body font-bold text-label-lg text-[#bf0413] hover:underline" data-dashboard-action="open-delete-modal">
              <svg class="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
              Excluir minha conta
            </button>
            <p class="mt-2 font-body text-label-md text-neutral-500 max-w-prose">
              Esta ação encerra seu acesso a todos os portais Informa. Seus dados pessoais são removidos conforme a LGPD.
            </p>
          </div>
        </section>

      </div>
    </div>
  </section>

  <!-- Toast de sucesso (state=saved) -->
  <?php if ($isSaved): ?>
    <div class="fixed bottom-24 right-6 z-50" role="status" aria-live="polite">
      <?php get_template_part('components/_partials/toast', null, [
        'type'    => 'success',
        'message' => 'Alterações salvas.',
      ]); ?>
    </div>
    <script>
      setTimeout(() => { window.location.href = '?state=default'; }, 4000);
    </script>
  <?php endif; ?>

  <!-- Modal de exclusão — inline, sem redirect -->
  <div id="delete-modal" hidden class="fixed inset-0 z-50 bg-primary-950/[.32] flex items-center justify-center p-4">
    <div role="dialog" aria-modal="true" aria-labelledby="delete-title" class="bg-white w-full max-w-[440px] rounded-lg shadow-lg p-6 flex flex-col gap-4">
      <div class="inline-flex items-center justify-center size-12 rounded-full bg-[#FEE2E2]">
        <svg class="size-6 text-[#bf0413]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
      </div>
      <h4 id="delete-title" class="font-display text-headline-sm text-neutral-950">Excluir sua Conta Informa?</h4>
      <div class="flex flex-col gap-3 font-body text-body-md text-neutral-700">
        <p>
          Esta ação encerrará seu acesso a todos os portais Informa.
          Seus dados pessoais serão removidos em até 30 dias úteis,
          conforme a Lei Geral de Proteção de Dados (LGPD).
        </p>
        <p>
          Seu histórico de downloads será mantido pelo prazo mínimo
          exigido por lei e não será utilizado para novas comunicações.
        </p>
      </div>

      <label class="flex flex-col items-start w-full mt-2">
        <span class="font-body font-semibold text-label-md text-neutral-950 pb-1">Digite <span class="font-mono text-[#bf0413]">EXCLUIR</span> para confirmar</span>
        <div class="bg-white border border-neutral-100 focus-within:border-[#bf0413] flex h-10 items-center rounded-sm w-full">
          <input type="text" autocomplete="off" data-delete-confirm class="flex-1 w-full h-full px-3 bg-transparent text-body-lg font-body text-primary-600 focus:outline-none">
        </div>
      </label>

      <div class="flex items-center justify-end gap-2 mt-2">
        <button type="button" data-dashboard-action="close-delete-modal" class="inline-flex items-center justify-center h-10 px-5 rounded-full bg-transparent text-primary-600 hover:bg-neutral-50 transition-colors font-body font-bold text-label-lg">Cancelar</button>
        <button type="button" disabled data-delete-submit class="inline-flex items-center justify-center h-10 px-5 rounded-full bg-[#bf0413] text-white hover:bg-[#99030F] disabled:bg-neutral-200 disabled:cursor-not-allowed transition-colors font-body font-bold text-label-lg">
          Sim, excluir minha conta
        </button>
      </div>
    </div>
  </div>

  <script>
    (() => {
      const modal = document.getElementById('delete-modal');
      const open  = document.querySelector('[data-dashboard-action="open-delete-modal"]');
      const close = document.querySelector('[data-dashboard-action="close-delete-modal"]');
      const input = document.querySelector('[data-delete-confirm]');
      const submit= document.querySelector('[data-delete-submit]');
      if (open)  open.addEventListener('click', () => modal.hidden = false);
      if (close) close.addEventListener('click', () => modal.hidden = true);
      if (input) input.addEventListener('input', e => { submit.disabled = e.target.value !== 'EXCLUIR'; });
      document.addEventListener('keydown', e => { if (e.key === 'Escape') modal.hidden = true; });
      modal.addEventListener('click', e => { if (e.target === modal) modal.hidden = true; });
    })();
  </script>

  <!-- Navegador de estados — remover em produção -->
  <div class="fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-wrap gap-2 justify-center
              bg-white/90 backdrop-blur-sm border border-neutral-100 rounded-full px-4 py-2
              shadow-md z-50 font-body text-label-md">
    <span class="text-neutral-400 self-center pr-1">Simular:</span>
    <?php foreach ($allowedStates as $s): ?>
      <a href="?state=<?= $s ?>"
         class="px-3 py-1 rounded-full transition-colors <?= $s === $viewState
           ? 'bg-primary-600 text-white'
           : 'text-neutral-600 hover:bg-neutral-50' ?>">
        <?= $s ?>
      </a>
    <?php endforeach; ?>
  </div>

  <?php get_template_part('components/_partials/footer-desktop', null, []); ?>

</main>
<script type="module" src="/src/assets/js/interactions.js"></script>
