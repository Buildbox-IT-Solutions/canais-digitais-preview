<?php
/**
 * Partial: Search Bar — single instance
 *
 * Campo de busca pill (rounded-full) conforme Figma Search bar 1776:19053.
 * Showcase de todos os estados em /src/components/search-bar.php.
 *
 * USO:
 *   <?php get_template_part('components/_partials/search-bar', null, [
 *     'width'       => 'w-32',    // qualquer classe de largura Tailwind
 *     'placeholder' => 'Buscar',
 *     'expanded'    => 'off',     // 'on' mostra close btn + border focus
 *   ]); ?>
 *
 * PROPS ($args):
 *   width       → classe Tailwind de largura (e.g. 'w-32', 'w-full', 'w-72')
 *   placeholder → texto placeholder do input
 *   expanded    → 'on'|'off' — controla trailing close icon e border
 *
 * Anatomia Figma:
 *   - Container: rounded-full h-10 border border-neutral-100
 *   - Leading icon: search 24px (size-6) pl-3
 *   - Input: text-body-lg font-body text-primary-600 placeholder:text-neutral-900
 *   - Trailing icon (expanded only): close 16px (size-4) p-2 rounded-full
 *   - Focus: border-secondary-950
 */
?>
<div class="relative <?= $args['width'] ?? 'w-full' ?><?php if ($args['expanded'] === 'on'): ?> transition-[width] duration-300<?php endif; ?>"<?php if ($args['expanded'] === 'on'): ?> data-component="search-bar" aria-expanded="false"<?php endif; ?>>
  <div class="absolute inset-y-0 left-3 flex items-center pointer-events-none text-neutral-900">
    <svg class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
  </div>
  <input type="search" placeholder="<?= $args['placeholder'] ?? 'Buscar' ?>" class="w-full h-10 pl-10 pr-3 rounded-full border border-neutral-100 bg-white text-body-lg font-body text-primary-600 placeholder:text-neutral-900 focus:outline-none focus:border-secondary-950 transition-colors"<?php if ($args['expanded'] === 'on'): ?> data-el="search-border"<?php endif; ?>>
  <?php if ($args['expanded'] === 'on'): ?>
  <button type="button" aria-label="Limpar busca" class="hidden absolute inset-y-0 right-1 flex items-center justify-center p-2 text-neutral-900 hover:text-primary-600" data-action="search-clear">
    <svg class="size-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
  </button>
  <?php endif; ?>
</div>
