<?php
/**
 * Partial: Nav Item — single instance
 *
 * Item de navegação horizontal no Header nav-list pill.
 * Hover interativo via CSS (group hover).
 *
 * USO:
 *   <?php get_template_part('components/_partials/nav-item', null, [
 *     'label'    => 'Eventos',
 *     'href'     => '#',
 *     'dropdown' => 'off',
 *     'active'   => 'off',
 *   ]); ?>
 *
 * PROPS ($args):
 *   label    → string
 *   href     → string (link destino)
 *   dropdown → 'on'|'off' (mostra chevron + dropdown menu placeholder)
 *   active   → 'on'|'off' (estado selecionado/current — aparência fixa de hovered)
 *
 * HOVER (Figma):
 *   Container: bg-primary-100
 *   Label: text-secondary-950 (de text-primary-600)
 *   Bottom line: bg-secondary-950 h-1
 *   Chevron: rotate 180deg (down→up)
 */
?>
<?php if ($args['active'] === 'on'): ?>
<div class="relative flex flex-col items-center bg-primary-100" <?php if ($args['dropdown'] === 'on'): ?>data-trigger="dropdown" aria-expanded="false" aria-haspopup="true"<?php endif; ?>>
  <a href="<?= $args['href'] ?>" class="flex <?php if ($args['dropdown'] === 'on'): ?>gap-1 pl-3 pr-2<?php else: ?>px-3<?php endif; ?> items-center min-h-8 pb-2 pt-3">
    <span class="font-body font-bold text-label-lg text-secondary-950 whitespace-nowrap"><?= $args['label'] ?></span>
    <?php if ($args['dropdown'] === 'on'): ?>
    <svg class="size-5 text-secondary-950 rotate-180" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
    <?php endif; ?>
  </a>
  <div class="flex flex-col h-1 items-start px-3 w-full">
    <div class="h-1 w-full bg-secondary-950"></div>
  </div>
  <?php if ($args['dropdown'] === 'on'): ?>
  <div class="absolute top-full left-0 z-50 opacity-0 pointer-events-none transition-opacity duration-150" data-target="dropdown-panel" aria-hidden="true">
    <div class="bg-neutral-50 flex items-start py-2 rounded-sm shadow-md w-[200px] mt-1">
      <div class="flex flex-1 flex-col items-start min-w-0">
        <a href="#" class="flex h-14 items-center px-3 py-2 w-full hover:bg-black/8 font-body font-semibold text-body-lg text-neutral-900">Sub-item 1</a>
        <a href="#" class="flex h-14 items-center px-3 py-2 w-full hover:bg-black/8 font-body font-semibold text-body-lg text-neutral-900">Sub-item 2</a>
        <a href="#" class="flex h-14 items-center px-3 py-2 w-full hover:bg-black/8 font-body font-semibold text-body-lg text-neutral-900">Sub-item 3</a>
      </div>
    </div>
  </div>
  <?php endif; ?>
</div>
<?php else: ?>
<div class="relative group flex flex-col items-center hover:bg-primary-100 transition-colors" <?php if ($args['dropdown'] === 'on'): ?>data-trigger="dropdown" aria-expanded="false" aria-haspopup="true"<?php endif; ?>>
  <a href="<?= $args['href'] ?>" class="flex <?php if ($args['dropdown'] === 'on'): ?>gap-1 pl-3 pr-2<?php else: ?>px-3<?php endif; ?> items-center min-h-8 pb-2 pt-3">
    <span class="font-body font-bold text-label-lg text-primary-600 group-hover:text-secondary-950 whitespace-nowrap transition-colors"><?= $args['label'] ?></span>
    <?php if ($args['dropdown'] === 'on'): ?>
    <svg class="size-5 text-primary-600 group-hover:text-secondary-950 group-hover:rotate-180 transition-all" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
    <?php endif; ?>
  </a>
  <div class="flex flex-col h-1 items-start px-3 w-full">
    <div class="h-1 w-full group-hover:bg-secondary-950 transition-colors"></div>
  </div>
  <?php if ($args['dropdown'] === 'on'): ?>
  <div class="absolute top-full left-0 z-50 opacity-0 pointer-events-none transition-opacity duration-150" data-target="dropdown-panel" aria-hidden="true">
    <div class="bg-neutral-50 flex items-start py-2 rounded-sm shadow-md w-[200px] mt-1">
      <div class="flex flex-1 flex-col items-start min-w-0">
        <a href="#" class="flex h-14 items-center px-3 py-2 w-full hover:bg-black/8 font-body font-semibold text-body-lg text-neutral-900">Sub-item 1</a>
        <a href="#" class="flex h-14 items-center px-3 py-2 w-full hover:bg-black/8 font-body font-semibold text-body-lg text-neutral-900">Sub-item 2</a>
        <a href="#" class="flex h-14 items-center px-3 py-2 w-full hover:bg-black/8 font-body font-semibold text-body-lg text-neutral-900">Sub-item 3</a>
      </div>
    </div>
  </div>
  <?php endif; ?>
</div>
<?php endif; ?>
