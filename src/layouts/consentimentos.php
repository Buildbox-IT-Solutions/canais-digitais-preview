<?php
/**
 * Layout: Histórico de Consentimentos — LGPD (Art. 18 II)
 * Acessado via dashboard-perfil-v3.php?tab=conta → "Histórico de consentimentos"
 *
 * Log auditável de tudo que o usuário consentiu: termos, privacidade,
 * newsletters, comunicações comerciais, cookies. Cronológico reverso,
 * agrupado por ano. Filtrável por categoria.
 *
 * Estados via ?filter=:
 *   all (default) | termos | privacidade | newsletters | comunicacoes | cookies
 *
 * Decisões de design:
 *   - Editorial archive, NÃO timeline-com-dots — diferenciação contra AI slop
 *   - Ano gigante (display-md Aleo) como âncora visual, eventos em grid abaixo
 *   - Sem linha vertical, sem círculos: tipografia + grid fazem o trabalho
 *   - Tipo do evento em Label SemiBold uppercase (Material 3 label-md), tracking
 *   - Versão clicável quando aplicável (linka pra documento atual)
 *   - PDF completo no fim — direito do usuário ter relatório auditável
 *
 * Tokens: primary-100/600, secondary-500/950, neutral-50/100/500/700/900/950,
 *         green-700, white. Sem stripe lateral. Sem dots.
 * Anim:   animate-fade-up-sm staggered (0/60/120/180ms)
 */

$activeCategory = null;
require_once __DIR__ . '/_session.php';
$headerArgs['userLoggedIn'] = true;
$headerArgs['userName']     = 'Mariana Albuquerque';
$headerArgs['userEmail']    = 'mariana.albuquerque@empresa.com.br';
$headerArgs['userInitials'] = 'MA';

$filter = $_GET['filter'] ?? 'all';
$allowedFilters = ['all', 'termos', 'privacidade', 'newsletters', 'comunicacoes', 'cookies'];
if (!in_array($filter, $allowedFilters, true)) $filter = 'all';

$queryExtra = isset($_GET['user']) ? '&user=' . htmlspecialchars($_GET['user']) : '';

// Mock cronológico reverso (mais recente primeiro)
$events = [
  ['date' => '12 abr 2026', 'year' => 2026, 'type' => 'newsletters',  'action' => 'Opt-in',   'title' => 'Newsletter Saúde Business',           'detail' => 'Frequência semanal · sextas-feiras'],
  ['date' => '03 abr 2026', 'year' => 2026, 'type' => 'comunicacoes', 'action' => 'Opt-in',   'title' => 'Convites para eventos do setor',      'detail' => 'Feiras Informa Markets'],
  ['date' => '28 mar 2026', 'year' => 2026, 'type' => 'cookies',      'action' => 'Atualização', 'title' => 'Preferências de cookies',           'detail' => 'Funcionais + Analítica · Marketing recusado'],
  ['date' => '15 fev 2026', 'year' => 2026, 'type' => 'newsletters',  'action' => 'Opt-out',  'title' => 'Newsletter Food Connection',          'detail' => 'Cancelamento espontâneo'],
  ['date' => '20 dez 2025', 'year' => 2025, 'type' => 'privacidade',  'action' => 'Aceite',   'title' => 'Política de Privacidade v3.1',        'detail' => 'Atualização da finalidade de coleta',  'docHref' => '#'],
  ['date' => '20 dez 2025', 'year' => 2025, 'type' => 'termos',       'action' => 'Aceite',   'title' => 'Termos de Uso v4.2',                  'detail' => 'Cláusula de força maior atualizada',   'docHref' => '#'],
  ['date' => '11 set 2025', 'year' => 2025, 'type' => 'newsletters',  'action' => 'Opt-in',   'title' => 'Newsletter Food Connection',          'detail' => 'Frequência diária'],
  ['date' => '11 set 2025', 'year' => 2025, 'type' => 'cookies',      'action' => 'Aceite',   'title' => 'Preferências de cookies (inicial)',   'detail' => 'Aceite total no primeiro acesso'],
  ['date' => '11 set 2025', 'year' => 2025, 'type' => 'privacidade',  'action' => 'Aceite',   'title' => 'Política de Privacidade v3.0',        'detail' => 'Cadastro inicial',                     'docHref' => '#'],
  ['date' => '11 set 2025', 'year' => 2025, 'type' => 'termos',       'action' => 'Aceite',   'title' => 'Termos de Uso v4.1',                  'detail' => 'Cadastro inicial',                     'docHref' => '#'],
];

// Aplica filtro
$filtered = $filter === 'all'
  ? $events
  : array_values(array_filter($events, fn($e) => $e['type'] === $filter));

// Agrupa por ano
$byYear = [];
foreach ($filtered as $e) {
  $byYear[$e['year']][] = $e;
}

$filterLabels = [
  'all'           => 'Tudo',
  'termos'        => 'Termos',
  'privacidade'   => 'Privacidade',
  'newsletters'   => 'Newsletters',
  'comunicacoes'  => 'Comunicações',
  'cookies'       => 'Cookies',
];

$typeLabels = [
  'termos'        => 'Termos de Uso',
  'privacidade'   => 'Privacidade',
  'newsletters'   => 'Newsletter',
  'comunicacoes'  => 'Comunicações',
  'cookies'       => 'Cookies',
];

// Cor da action (Aceite/Opt-in/Atualização → secondary-950 (info), Opt-out → red-700)
$actionTone = function(string $action): string {
  return match($action) {
    'Opt-out' => 'text-red-700',
    default   => 'text-secondary-950',
  };
};
?>
<main class="bg-white min-h-screen flex flex-col">

  <?php get_template_part('components/_partials/header-desktop', null, $headerArgs); ?>

  <div class="flex-1 max-w-screen-xl mx-auto w-full px-4 lg:px-6 py-10">

    <!-- Voltar -->
    <div class="animate-fade-up-sm">
      <a href="/src/layouts/dashboard-perfil-v3.php?tab=conta<?= $queryExtra ?>"
         class="inline-flex items-center gap-2 -ml-3 px-3 py-2.5 rounded-full font-body font-bold text-label-lg text-primary-600 hover:bg-neutral-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2">
        <svg class="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
        Voltar para minha conta
      </a>
    </div>

    <!-- ============== Hero ============== -->
    <header class="mt-8 max-w-[60ch] animate-fade-up-sm" style="animation-delay: 60ms;">
      <p class="font-body font-semibold text-label-md tracking-wider text-secondary-950 uppercase">LGPD · Art. 18 II</p>
      <h1 class="mt-2 font-display font-bold text-headline-lg text-primary-600 leading-tight">
        Tudo que você consentiu, registrado.
      </h1>
      <p class="mt-4 font-body text-body-lg text-neutral-900">
        A LGPD garante que você saiba exatamente quando, em qual versão e em quais termos seu consentimento foi dado. Aqui está o registro completo, em ordem cronológica.
      </p>
    </header>

    <!-- ============== Filtros ============== -->
    <nav class="mt-10 flex flex-wrap items-center gap-2 animate-fade-up-sm" style="animation-delay: 120ms;" aria-label="Filtrar por tipo">
      <span class="font-body font-semibold text-label-md tracking-wider text-neutral-500 uppercase mr-2">Filtrar</span>
      <?php foreach ($filterLabels as $key => $label): ?>
        <a href="?filter=<?= $key . $queryExtra ?>"
           class="inline-flex items-center px-3.5 py-1.5 rounded-full font-body font-bold text-label-md transition-colors
                  <?= $filter === $key ? 'bg-primary-600 text-white' : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100' ?>">
          <?= $label ?>
        </a>
      <?php endforeach; ?>
    </nav>

    <!-- ============== Archive ============== -->
    <?php if (empty($filtered)): ?>
      <section class="mt-16 max-w-[60ch] animate-fade-up-sm" style="animation-delay: 180ms;">
        <p class="font-body text-body-lg text-neutral-700">
          Nenhum evento desse tipo registrado. Tente outro filtro acima.
        </p>
      </section>
    <?php else: ?>
      <div class="mt-16 flex flex-col gap-16 animate-fade-up-sm" style="animation-delay: 180ms;">
        <?php foreach ($byYear as $year => $yearEvents): ?>
          <section>
            <!-- Ano gigante como âncora -->
            <header class="mb-8">
              <h2 class="font-display font-bold text-display-md text-primary-600 leading-none">
                <?= $year ?>
              </h2>
              <p class="mt-2 font-body text-body-md text-neutral-500">
                <?= count($yearEvents) ?> <?= count($yearEvents) === 1 ? 'evento registrado' : 'eventos registrados' ?>
              </p>
            </header>

            <!-- Eventos -->
            <ul class="flex flex-col">
              <?php foreach ($yearEvents as $i => $e):
                $isLast = $i === count($yearEvents) - 1;
              ?>
                <li class="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 md:gap-12 py-5 <?= $isLast ? '' : 'border-b border-neutral-100' ?>">
                  <!-- Data -->
                  <div class="font-display font-bold text-title-md text-primary-600 md:pt-0.5">
                    <?= htmlspecialchars($e['date']) ?>
                  </div>

                  <!-- Evento -->
                  <div class="flex flex-col gap-1.5 max-w-[75ch]">
                    <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span class="font-body font-bold text-label-md tracking-wider uppercase text-neutral-500">
                        <?= htmlspecialchars($typeLabels[$e['type']]) ?>
                      </span>
                      <span class="font-body font-bold text-label-md tracking-wider uppercase <?= $actionTone($e['action']) ?>">
                        <?= htmlspecialchars($e['action']) ?>
                      </span>
                    </div>
                    <h3 class="font-display font-bold text-title-lg text-primary-600 leading-tight">
                      <?= htmlspecialchars($e['title']) ?>
                    </h3>
                    <?php if (!empty($e['detail'])): ?>
                      <p class="font-body text-body-md text-neutral-700">
                        <?= htmlspecialchars($e['detail']) ?>
                      </p>
                    <?php endif; ?>
                    <?php if (!empty($e['docHref'])): ?>
                      <a href="<?= htmlspecialchars($e['docHref']) ?>"
                         class="inline-flex items-center gap-1 mt-1 font-body font-bold text-label-md text-secondary-950 hover:underline w-fit">
                        Ver íntegra do documento
                        <svg class="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
                        </svg>
                      </a>
                    <?php endif; ?>
                  </div>
                </li>
              <?php endforeach; ?>
            </ul>
          </section>
        <?php endforeach; ?>
      </div>
    <?php endif; ?>

    <!-- ============== PDF download CTA ============== -->
    <section class="mt-16 max-w-[80ch] flex flex-col md:flex-row md:items-center gap-6 px-6 py-8 rounded-lg border border-neutral-100 animate-fade-up-sm" style="animation-delay: 240ms;">
      <div class="flex-1 max-w-[60ch]">
        <h2 class="font-display font-bold text-title-xl text-primary-600">Precisa de um relatório auditável?</h2>
        <p class="mt-1 font-body text-body-md text-neutral-700">
          Baixe um PDF assinado com todo o histórico — válido para apresentar a um DPO, departamento jurídico ou autoridade.
        </p>
      </div>
      <a href="#"
         class="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-primary-600 hover:bg-secondary-950 text-white font-body font-bold text-body-lg transition-colors shrink-0">
        <svg class="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
        </svg>
        Baixar relatório (PDF)
      </a>
    </section>

  </div>

  <?php get_template_part('components/_partials/footer-desktop', null, []); ?>

</main>

<script type="module" src="/src/assets/js/interactions.js"></script>
