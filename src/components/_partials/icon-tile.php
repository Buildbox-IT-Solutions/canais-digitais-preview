<?php
/**
 * Partial: Icon Tile — quadrado com ícone (48×48 padrão)
 * Figma: "Icon tile" (instanciado em session-row, general-item, stat-card,
 * download-item)
 *
 * Tile padrão: bg neutral-50, rounded-lg (8px), p-3, ícone 24px primary-600.
 *
 * Tons:
 *   neutral  → bg-neutral-50  text-primary-600 (default)
 *   danger   → bg-red-100     text-red-700     (excluir conta)
 *   disabled → bg-neutral-50  text-neutral-200 (download indisponível)
 *
 * USO:
 *   <?php get_template_part('components/_partials/icon-tile', null, [
 *     'iconPath' => 'M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z',
 *     'tone'     => 'neutral',  // 'neutral' | 'danger' | 'disabled'
 *   ]); ?>
 */

$iconPath = $args['iconPath'] ?? '';
$tone     = $args['tone']     ?? 'neutral';

$toneClasses = match($tone) {
  'danger'   => 'bg-red-100 text-red-700',
  'disabled' => 'bg-neutral-50 text-neutral-200',
  default    => 'bg-neutral-50 text-primary-600',
};
?>
<div class="inline-flex items-center justify-center size-12 rounded-lg shrink-0 <?= $toneClasses ?>">
  <svg class="size-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="<?= $iconPath ?>"/>
  </svg>
</div>
