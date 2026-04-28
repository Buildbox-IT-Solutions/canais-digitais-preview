<?php
/**
 * Partial: Recent News Item — linha da lista "Últimas leituras" (visão geral)
 * Figma: 6045:6047 / I6045:6047;5968:39780
 *
 * Categoria (label SemiBold 12, neutral-950) + Título (Aleo Bold 18/24)
 * + meta "Portal • tempo" (14, neutral-600) + chevron next.
 *
 * USO:
 *   <?php get_template_part('components/_partials/recent-news-item', null, [
 *     'category' => 'Proteína Animal',
 *     'title'    => 'Como fazer o transporte de pescados frescos corretamente',
 *     'portal'   => 'Food Connection',
 *     'when'     => 'há poucos segundos',
 *     'href'     => '#',
 *     'isLast'   => false,
 *   ]); ?>
 *
 * PROPS ($args):
 *   category → string
 *   title    → string
 *   portal   → string
 *   when     → string
 *   href     → string
 *   isLast   → bool — controla border-bottom
 */

$category = $args['category'] ?? '';
$title    = $args['title']    ?? '';
$portal   = $args['portal']   ?? '';
$when     = $args['when']     ?? '';
$href     = $args['href']     ?? '#';
$isLast   = !empty($args['isLast']);
?>
<a href="<?= htmlspecialchars($href) ?>" class="flex flex-col px-1 group">
  <div class="flex items-center justify-between py-4 gap-4">
    <div class="flex-1 min-w-0 flex flex-col gap-1">
      <p class="font-body font-semibold text-label-md tracking-wider text-neutral-950">
        <?= htmlspecialchars($category) ?>
      </p>
      <p class="font-display font-bold text-title-lg text-primary-600 line-clamp-2 group-hover:text-secondary-950 transition-colors">
        <?= htmlspecialchars($title) ?>
      </p>
      <div class="flex items-center gap-1.5 font-body text-body-md text-neutral-600">
        <span><?= htmlspecialchars($portal) ?></span>
        <span aria-hidden="true">•</span>
        <span><?= htmlspecialchars($when) ?></span>
      </div>
    </div>
    <svg class="size-6 text-neutral-950 shrink-0"
         viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
    </svg>
  </div>
  <?php if (!$isLast): ?>
  <div class="h-px bg-neutral-100 w-full"></div>
  <?php endif; ?>
</a>
