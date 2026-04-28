<?php
/**
 * Partial: Pagination — paginação simples para listas (dashboard-perfil-v3 / Downloads)
 * Figma: 6106:6544 (Pagination)
 *
 * Estrutura: prev / pages 1..N / next. Botões 32px circular.
 *
 * USO:
 *   <?php get_template_part('components/_partials/pagination', null, [
 *     'current' => 1,
 *     'total'   => 3,
 *     'baseHref' => '?tab=downloads',
 *     'pageParam' => 'page',
 *   ]); ?>
 *
 * PROPS ($args):
 *   current   → int  — página atual (1..total)
 *   total     → int  — número total de páginas
 *   baseHref  → string — querystring base (ex: '?tab=downloads&user=logged')
 *   pageParam → string — nome do parâmetro de página (default 'page')
 */

$current   = max(1, (int)($args['current'] ?? 1));
$total     = max(1, (int)($args['total']   ?? 1));
$current   = min($current, $total);
$baseHref  = $args['baseHref']  ?? '?';
$pageParam = $args['pageParam'] ?? 'page';

$separator = strpos($baseHref, '?') === false ? '?' : '&';
$mkHref = fn($p) => $baseHref . $separator . $pageParam . '=' . $p;
?>
<nav class="flex items-center justify-center gap-2" aria-label="Paginação">
  <?php
  $prevDisabled = $current === 1;
  $prevHref = $prevDisabled ? '#' : $mkHref($current - 1);
  ?>
  <a href="<?= htmlspecialchars($prevHref) ?>"
     <?= $prevDisabled ? 'aria-disabled="true" tabindex="-1"' : '' ?>
     class="inline-flex items-center justify-center size-8 rounded-full <?= $prevDisabled ? 'text-neutral-300 cursor-not-allowed' : 'text-primary-600 hover:bg-neutral-50' ?> transition-colors"
     aria-label="Página anterior">
    <svg class="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
    </svg>
  </a>

  <?php for ($p = 1; $p <= $total; $p++):
    $isOn = $p === $current;
    $btnClasses = $isOn
      ? 'bg-primary-600 text-white'
      : 'text-primary-600 hover:bg-neutral-50';
  ?>
  <a href="<?= htmlspecialchars($mkHref($p)) ?>"
     <?= $isOn ? 'aria-current="page"' : '' ?>
     class="inline-flex items-center justify-center size-8 rounded-full font-body font-bold text-label-lg transition-colors <?= $btnClasses ?>">
    <?= $p ?>
  </a>
  <?php endfor; ?>

  <?php
  $nextDisabled = $current === $total;
  $nextHref = $nextDisabled ? '#' : $mkHref($current + 1);
  ?>
  <a href="<?= htmlspecialchars($nextHref) ?>"
     <?= $nextDisabled ? 'aria-disabled="true" tabindex="-1"' : '' ?>
     class="inline-flex items-center justify-center size-8 rounded-full <?= $nextDisabled ? 'text-neutral-300 cursor-not-allowed' : 'text-primary-600 hover:bg-neutral-50' ?> transition-colors"
     aria-label="Próxima página">
    <svg class="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
    </svg>
  </a>
</nav>
