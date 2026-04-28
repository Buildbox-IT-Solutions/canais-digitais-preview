<?php
/**
 * Partial: Newsletter Item — opt-in da aba Newsletter (dashboard-perfil-v3)
 * Figma: 6091:4814 (component set: Enabled-On / Hovered-On / Enabled-Off / Hovered-Off)
 *
 * Composto por:
 *   - Título Aleo Bold 18 (text-title-lg) — primary-600 → secondary-950 no hover do row
 *   - Badge "checked" (Secondary/Light/0 Arctic + check icon 16) visível só quando ON
 *   - Descrição Open Sans Regular 14 (text-body-md) neutral-600
 *   - Switch shadcn-like 33×18 — track primary-100 → secondary-950, thumb branco
 *
 * O label inteiro é o alvo de clique e toggla o checkbox interno.
 *
 * USO:
 *   <?php get_template_part('components/_partials/newsletter-item', null, [
 *     'id'      => 'nl-food-connection',
 *     'title'   => 'Food Connection',
 *     'desc'    => 'Canal de conteúdo oficial das feiras...',
 *     'checked' => true,
 *     'isLast'  => false,
 *   ]); ?>
 */

$id      = $args['id']      ?? 'nl-' . uniqid();
$title   = $args['title']   ?? '';
$desc    = $args['desc']    ?? '';
$checked = !empty($args['checked']);
$isLast  = !empty($args['isLast']);
?>
<div data-newsletter-item class="<?= $isLast ? '' : 'border-b border-neutral-100' ?> px-1">
  <label for="<?= htmlspecialchars($id) ?>"
         class="group flex items-start gap-4 py-4 cursor-pointer">
    <input type="checkbox" id="<?= htmlspecialchars($id) ?>"
           class="peer sr-only"
           data-newsletter-toggle
           <?= $checked ? 'checked' : '' ?>>

    <!-- Text -->
    <div class="flex-1 min-w-0 flex flex-col gap-1">
      <div class="flex items-center gap-2">
        <h3 class="font-display font-bold text-title-lg text-primary-600 group-hover:text-secondary-950 transition-colors">
          <?= htmlspecialchars($title) ?>
        </h3>
        <span class="hidden group-has-[:checked]:inline-flex items-center justify-center bg-secondary-50 rounded-xs p-1" aria-hidden="true">
          <svg class="size-4 text-primary-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
          </svg>
        </span>
      </div>
      <?php if ($desc): ?>
      <p class="font-body text-body-md text-neutral-600">
        <?= htmlspecialchars($desc) ?>
      </p>
      <?php endif; ?>
    </div>

    <!-- Switch -->
    <span class="relative shrink-0 mt-1 w-[33px] h-[18px] rounded-full bg-primary-100 peer-checked:bg-secondary-950 transition-colors" aria-hidden="true">
      <span class="absolute top-[1px] left-[1px] size-4 rounded-full bg-white shadow-sm transition-transform duration-200 ease-out group-has-[:checked]:translate-x-[15px]"></span>
    </span>
  </label>
</div>
