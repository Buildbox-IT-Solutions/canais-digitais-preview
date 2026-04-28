<?php
/**
 * Partial: Coming Soon — empty state "Em breve" para seções ainda não lançadas
 * Usado em dashboard.php?section=biblio e ?section=favoritos.
 *
 * USO:
 *   <?php get_template_part('components/_partials/coming-soon', null, [
 *     'chip'        => 'Biblioteca premium',
 *     'icon'        => 'book',           // 'book' | 'bookmark'
 *     'title'       => 'Biblioteca em breve',
 *     'description' => 'Estamos finalizando a curadoria...',
 *     'ctaLabel'    => 'Avisar quando lançar',
 *   ]); ?>
 *
 * PROPS ($args):
 *   chip        → string (label do chip no topo)
 *   icon        → 'book' | 'bookmark' (ícone dentro do círculo)
 *   title       → string (headline)
 *   description → string (copy abaixo do título)
 *   ctaLabel    → string (label do botão ghost)
 */

$chip = $args['chip'] ?? '';
$icon = $args['icon'] ?? 'book';
$title = $args['title'] ?? 'Em breve';
$description = $args['description'] ?? '';
$ctaLabel = $args['ctaLabel'] ?? 'Avisar quando lançar';
?>
<div class="flex flex-col items-center justify-center gap-6 max-w-xl mx-auto py-20 px-4 text-center">

  <?php if ($chip): ?>
  <span class="inline-flex items-center gap-1.5 rounded-xs bg-primary-600 text-white px-2 py-1 font-body font-bold text-label-sm uppercase tracking-wider">
    <?= $chip ?>
  </span>
  <?php endif; ?>

  <span class="inline-flex items-center justify-center size-24 rounded-full bg-neutral-50 text-primary-600">
    <?php if ($icon === 'bookmark'): ?>
      <svg class="size-12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
      </svg>
    <?php else: ?>
      <svg class="size-12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-6 8l-3-2-3 2V4h6v6z"/>
      </svg>
    <?php endif; ?>
  </span>

  <h2 class="font-display font-bold text-headline-lg text-primary-600">
    <?= $title ?><span class="text-coral">.</span>
  </h2>

  <p class="font-body text-body-lg text-neutral-700 max-w-md">
    <?= $description ?>
  </p>

  <div class="pt-2">
    <?php get_template_part('components/_partials/button', null, [
      'label' => $ctaLabel,
      'href'  => '#',
      'type'  => 'outlined',
      'size'  => 'medium',
      'icon'  => 'arrow-right',
    ]); ?>
  </div>
</div>
