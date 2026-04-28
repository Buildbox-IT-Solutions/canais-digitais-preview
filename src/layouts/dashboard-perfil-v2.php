<?php
/**
 * Layout: Dashboard de Perfil v2 — editorial single-scroll
 * Nova versão do dashboard-perfil.php. A v1 permanece intacta.
 *
 * Abordagem: documento editorial contínuo — seções numeradas,
 * sem sidebar, sem cards. Edição inline por campo.
 *
 * Estados via ?state=:
 *   default  → leitura (botão "Editar" por campo)
 *   editing  → "Nome completo" em modo edição (demo)
 *   saved    → toast de sucesso + auto-redirect 4s
 *
 * Acesso: /src/layouts/dashboard-perfil-v2.php
 */

$activeCategory = null;
require_once __DIR__ . '/_session.php';

// Dashboard sempre renderiza como logado
$headerArgs['userLoggedIn'] = true;
$headerArgs['userName']     = 'Maria Silva';
$headerArgs['userEmail']    = 'maria.silva@empresa.com.br';
$headerArgs['userInitials'] = 'MS';

$viewState = $_GET['state'] ?? 'default';
$allowedStates = ['default', 'editing', 'saved'];
if (!in_array($viewState, $allowedStates, true)) $viewState = 'default';
$isEditing = $viewState === 'editing';
$isSaved   = $viewState === 'saved';

// Dados mock
$user = [
  'name'      => 'Maria Silva',
  'email'     => 'maria.silva@empresa.com.br',
  'phone'     => '+55 (11) 98765-4321',
  'birthdate' => '12/05/1990',
  'gender'    => '',
  'company'   => 'Cooperativa Central Aurora',
  'role'      => 'Gerente de Marketing',
  'sector'    => 'Indústria A&B',
  'cpf'       => '123.456.789-00',
  'country'   => 'Brasil',
  'state'     => 'São Paulo',
  'city'      => '',
  'zip'       => '01310-100',
  'address'   => 'Av. Paulista, 1578',
];

$filled = count(array_filter($user, fn($v) => $v !== ''));
$total  = count($user);
$pct    = (int) round(($filled / $total) * 100);

$sections = [
  [
    'num'   => '01',
    'title' => 'Dados pessoais',
    'desc'  => 'Informações que identificam você no portal.',
    'fields' => [
      ['label' => 'Nome completo',      'value' => $user['name'],      'editable' => true,  'editing' => $isEditing],
      ['label' => 'E-mail',             'value' => $user['email'],     'editable' => false, 'hint' => 'Vinculado ao LinkedIn.'],
      ['label' => 'Telefone',           'value' => $user['phone'],     'editable' => true],
      ['label' => 'Data de nascimento', 'value' => $user['birthdate'], 'editable' => true],
      ['label' => 'Gênero',             'value' => $user['gender'],    'editable' => true],
    ],
  ],
  [
    'num'   => '02',
    'title' => 'Profissional',
    'desc'  => 'Personaliza recomendações de conteúdo e eventos.',
    'fields' => [
      ['label' => 'Empresa', 'value' => $user['company'], 'editable' => true],
      ['label' => 'Cargo',   'value' => $user['role'],    'editable' => true],
      ['label' => 'Setor',   'value' => $user['sector'],  'editable' => true],
    ],
  ],
  [
    'num'   => '03',
    'title' => 'Fiscal e localização',
    'desc'  => 'Necessário para certificados e emissão de NFs.',
    'fields' => [
      ['label' => 'CPF / CNPJ', 'value' => $user['cpf'],     'editable' => true],
      ['label' => 'País',       'value' => $user['country'],  'editable' => true],
      ['label' => 'Estado',     'value' => $user['state'],    'editable' => true],
      ['label' => 'Cidade',     'value' => $user['city'],     'editable' => true],
      ['label' => 'CEP',        'value' => $user['zip'],      'editable' => true],
      ['label' => 'Endereço',   'value' => $user['address'],  'editable' => true],
    ],
  ],
];
?>
<main class="bg-white min-h-screen flex flex-col">

  <?php get_template_part('components/_partials/header-desktop', null, $headerArgs); ?>

  <!-- Profile band -->
  <div class="border-b border-neutral-100">
    <div class="max-w-screen-xl mx-auto px-4 lg:px-6 py-6 flex items-center gap-5">
      <?php get_template_part('components/_partials/avatar', null, [
        'src'   => 'https://i.pravatar.cc/160?img=47',
        'alt'   => 'Maria Silva',
        'shape' => 'rounded',
        'size'  => 'md',
      ]); ?>
      <div class="flex-1 min-w-0">
        <div class="flex items-baseline gap-3">
          <h1 class="font-display font-bold text-title-xl text-primary-600">Maria Silva</h1>
          <span class="font-body text-body-sm text-neutral-500">maria.silva@empresa.com.br</span>
        </div>
        <div class="flex items-center gap-3 mt-2">
          <div class="h-1 flex-1 max-w-[180px] rounded-full bg-neutral-100 overflow-hidden">
            <div class="h-full rounded-full bg-secondary-950 transition-[width] duration-500" style="width: <?= $pct ?>%;"></div>
          </div>
          <span class="font-body text-label-sm text-neutral-500"><?= $filled ?>/<?= $total ?> campos</span>
        </div>
      </div>
      <a href="/src/layouts/home.php"
         class="inline-flex items-center gap-1.5 font-body font-bold text-label-lg text-neutral-500 hover:text-primary-600 transition-colors shrink-0">
        <svg class="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
        Fechar
      </a>
    </div>
  </div>

  <!-- Content -->
  <div class="flex-1">
    <div class="max-w-[720px] mx-auto px-4 lg:px-6 pt-12 pb-20">

      <!-- Photo upload -->
      <div class="flex items-center gap-5 pb-10 border-b border-neutral-100">
        <div class="relative">
          <?php get_template_part('components/_partials/avatar', null, [
            'src'   => 'https://i.pravatar.cc/160?img=47',
            'alt'   => 'Maria Silva',
            'shape' => 'rounded',
            'size'  => 'lg',
          ]); ?>
          <button type="button"
                  class="absolute -bottom-1 -right-1 size-8 rounded-full bg-primary-600 text-white inline-flex items-center justify-center hover:bg-secondary-950 transition-colors"
                  aria-label="Alterar foto de perfil">
            <svg class="size-4" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
          </button>
        </div>
        <div>
          <p class="font-body font-semibold text-title-sm text-primary-600">Foto de perfil</p>
          <p class="font-body text-body-sm text-neutral-500 mt-0.5">JPG ou PNG, máx. 2 MB.</p>
        </div>
      </div>

      <!-- Sections -->
      <?php foreach ($sections as $s): ?>
      <section class="pt-10 pb-10 border-b border-neutral-100 last:border-b-0">
        <header class="flex items-baseline gap-4 mb-8">
          <span class="font-display font-bold text-label-lg text-neutral-300 tabular-nums"><?= $s['num'] ?></span>
          <div>
            <h2 class="font-display font-bold text-title-xl text-primary-600"><?= $s['title'] ?></h2>
            <p class="font-body text-body-md text-neutral-500 mt-1"><?= $s['desc'] ?></p>
          </div>
        </header>

        <div class="flex flex-col">
          <?php foreach ($s['fields'] as $i => $f):
            $value   = $f['value'];
            $empty   = $value === '';
            $editing = $f['editing'] ?? false;
            $editable = $f['editable'] ?? true;
            $hint    = $f['hint'] ?? null;
            $isLast  = $i === count($s['fields']) - 1;
          ?>
          <div class="flex items-start justify-between gap-6 py-4 <?= $isLast ? '' : 'border-b border-neutral-50' ?>">
            <div class="flex-1 min-w-0">
              <p class="font-body font-semibold text-label-lg text-neutral-950"><?= $f['label'] ?></p>

              <?php if ($editing): ?>
              <div class="mt-2 max-w-[400px]">
                <div class="bg-white border border-secondary-950 flex h-10 items-center rounded-sm w-full">
                  <input type="text" value="<?= htmlspecialchars($value) ?>"
                         class="flex-1 w-full h-full px-3 bg-transparent text-body-lg font-body text-primary-600 focus:outline-none"
                         autofocus>
                </div>
              </div>
              <?php else: ?>
              <p class="mt-1 font-body text-body-lg <?= $empty ? 'text-neutral-400 italic' : 'text-neutral-950' ?>">
                <?= $empty ? 'Não informado' : htmlspecialchars($value) ?>
              </p>
              <?php endif; ?>

              <?php if ($hint): ?>
              <p class="mt-1 font-body text-label-md text-neutral-400"><?= $hint ?></p>
              <?php endif; ?>
            </div>

            <div class="shrink-0 pt-0.5">
              <?php if ($editing): ?>
              <div class="flex items-center gap-2">
                <a href="?state=default"
                   class="inline-flex items-center h-9 px-3 rounded-full text-primary-600 hover:bg-neutral-50 transition-colors font-body font-bold text-label-lg">
                  Cancelar
                </a>
                <a href="?state=saved" data-analytics-event="perfil_campo_salvo"
                   class="inline-flex items-center h-9 px-4 rounded-full bg-primary-600 text-white hover:bg-secondary-950 transition-colors font-body font-bold text-label-lg">
                  Salvar
                </a>
              </div>
              <?php elseif (!$editable): ?>
              <span class="inline-flex items-center gap-1 rounded-full bg-neutral-50 px-3 py-1 font-body text-label-sm text-neutral-500">
                <svg class="size-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2z"/></svg>
                Vinculado
              </span>
              <?php else: ?>
              <a href="?state=editing"
                 class="inline-flex items-center gap-1 h-9 px-3 rounded-full text-secondary-950 hover:bg-neutral-50 transition-colors font-body font-bold text-label-lg">
                <svg class="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                Editar
              </a>
              <?php endif; ?>
            </div>
          </div>
          <?php endforeach; ?>
        </div>
      </section>
      <?php endforeach; ?>

      <!-- Comunicações -->
      <section class="pt-10 pb-10 border-b border-neutral-100">
        <header class="flex items-baseline gap-4 mb-8">
          <span class="font-display font-bold text-label-lg text-neutral-300 tabular-nums">04</span>
          <div>
            <h2 class="font-display font-bold text-title-xl text-primary-600">Comunicações</h2>
            <p class="font-body text-body-md text-neutral-500 mt-1">Preferências de e-mail.</p>
          </div>
        </header>

        <div class="flex flex-col gap-6 max-w-[520px]">
          <?php get_template_part('components/_partials/form-toggle', null, [
            'id'    => 'v2-toggle-newsletter',
            'label' => 'Receber newsletter segmentada por setor',
            'hint'  => 'Cancelável a qualquer momento.',
          ]); ?>
          <?php get_template_part('components/_partials/form-toggle', null, [
            'id'    => 'v2-toggle-marketing',
            'label' => 'Comunicações e novidades da Informa Markets',
            'hint'  => 'Ofertas e novidades por e-mail.',
          ]); ?>
        </div>
      </section>

      <!-- Downloads -->
      <?php
      $downloads = [
        ['title' => '10 Tendências em Food Service para 2026', 'type' => 'E-book',     'date' => '12 abr. 2026', 'available' => true],
        ['title' => 'Guia de Embalagens Sustentáveis',          'type' => 'Guia',       'date' => '03 mar. 2026', 'available' => true],
        ['title' => 'Relatório Setorial: Proteína Animal 2025', 'type' => 'Relatório',  'date' => '18 fev. 2026', 'available' => false],
      ];
      ?>
      <section class="pt-10 pb-10 border-b border-neutral-100">
        <header class="flex items-baseline gap-4 mb-8">
          <span class="font-display font-bold text-label-lg text-neutral-300 tabular-nums">05</span>
          <div>
            <h2 class="font-display font-bold text-title-xl text-primary-600">Meus downloads</h2>
            <p class="font-body text-body-md text-neutral-500 mt-1"><?= count($downloads) ?> materiais.</p>
          </div>
        </header>

        <div class="flex flex-col">
          <?php foreach ($downloads as $i => $d):
            $isLast = $i === count($downloads) - 1;
          ?>
          <div class="flex items-center justify-between gap-4 py-4 <?= $isLast ? '' : 'border-b border-neutral-50' ?>">
            <div class="flex-1 min-w-0">
              <p class="font-body font-semibold text-body-lg <?= $d['available'] ? 'text-neutral-950' : 'text-neutral-400' ?>">
                <?= $d['title'] ?>
              </p>
              <div class="flex items-center gap-2 mt-1 font-body text-label-md text-neutral-500">
                <span><?= $d['type'] ?></span>
                <span aria-hidden="true">&middot;</span>
                <span><?= $d['date'] ?></span>
                <?php if (!$d['available']): ?>
                <span aria-hidden="true">&middot;</span>
                <span class="text-neutral-400">Indisponível</span>
                <?php endif; ?>
              </div>
            </div>
            <?php if ($d['available']): ?>
            <a href="/src/layouts/form-download.php?user=logged"
               class="inline-flex items-center gap-1.5 h-9 px-4 rounded-full border-[1.5px] border-primary-600 text-primary-600 hover:bg-neutral-50 transition-colors font-body font-bold text-label-lg shrink-0">
              <svg class="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
              Baixar
            </a>
            <?php endif; ?>
          </div>
          <?php endforeach; ?>
        </div>
      </section>

      <!-- Conta -->
      <section class="pt-10 pb-4">
        <header class="flex items-baseline gap-4 mb-8">
          <span class="font-display font-bold text-label-lg text-neutral-300 tabular-nums">06</span>
          <div>
            <h2 class="font-display font-bold text-title-xl text-primary-600">Conta</h2>
            <p class="font-body text-body-md text-neutral-500 mt-1">Encerramento da Conta Informa.</p>
          </div>
        </header>

        <button type="button"
                class="inline-flex items-center gap-2 font-body font-bold text-label-lg text-[#bf0413] hover:underline"
                data-dashboard-action="open-delete-modal">
          <svg class="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
          Excluir minha conta
        </button>
        <p class="mt-2 font-body text-label-md text-neutral-400 max-w-prose">
          Encerra seu acesso a todos os portais Informa. Dados removidos conforme LGPD.
        </p>
      </section>

    </div>
  </div>

  <!-- Toast (state=saved) -->
  <?php if ($isSaved): ?>
  <div class="fixed bottom-24 right-6 z-50" role="status" aria-live="polite">
    <?php get_template_part('components/_partials/toast', null, [
      'type'    => 'success',
      'message' => 'Alterações salvas.',
    ]); ?>
  </div>
  <script>setTimeout(() => { window.location.href = '?state=default'; }, 4000);</script>
  <?php endif; ?>

  <!-- Modal de exclusão -->
  <div id="delete-modal" hidden class="fixed inset-0 z-50 bg-primary-950/30 flex items-center justify-center p-4">
    <div role="dialog" aria-modal="true" aria-labelledby="delete-title"
         class="bg-white w-full max-w-[440px] rounded-lg shadow-lg p-6 flex flex-col gap-4">
      <div class="inline-flex items-center justify-center size-12 rounded-full bg-[#FEE2E2]">
        <svg class="size-6 text-[#bf0413]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
      </div>
      <h4 id="delete-title" class="font-display text-headline-sm text-neutral-950">Excluir sua Conta Informa?</h4>
      <div class="flex flex-col gap-3 font-body text-body-md text-neutral-700">
        <p>Esta ação encerrará seu acesso a todos os portais Informa. Seus dados pessoais serão removidos em até 30 dias úteis, conforme a LGPD.</p>
      </div>
      <label class="flex flex-col items-start w-full mt-2">
        <span class="font-body font-semibold text-label-md text-neutral-950 pb-1">Digite <span class="font-mono text-[#bf0413]">EXCLUIR</span> para confirmar</span>
        <div class="bg-white border border-neutral-100 focus-within:border-[#bf0413] flex h-10 items-center rounded-sm w-full">
          <input type="text" autocomplete="off" data-delete-confirm class="flex-1 w-full h-full px-3 bg-transparent text-body-lg font-body text-primary-600 focus:outline-none">
        </div>
      </label>
      <div class="flex items-center justify-end gap-2 mt-2">
        <button type="button" data-dashboard-action="close-delete-modal"
                class="inline-flex items-center justify-center h-10 px-5 rounded-full bg-transparent text-primary-600 hover:bg-neutral-50 transition-colors font-body font-bold text-label-lg">
          Cancelar
        </button>
        <button type="button" disabled data-delete-submit
                class="inline-flex items-center justify-center h-10 px-5 rounded-full bg-[#bf0413] text-white hover:bg-[#99030F] disabled:bg-neutral-200 disabled:cursor-not-allowed transition-colors font-body font-bold text-label-lg">
          Sim, excluir minha conta
        </button>
      </div>
    </div>
  </div>

  <!-- Simulador de estados -->
  <div class="fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-wrap gap-2 justify-center
              bg-white/90 backdrop-blur-sm border border-neutral-100 rounded-full px-4 py-2
              shadow-md z-50 font-body text-label-md">
    <span class="text-neutral-400 self-center pr-1">Estado:</span>
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
<script type="module" src="/src/assets/js/interactions.js"></script>
