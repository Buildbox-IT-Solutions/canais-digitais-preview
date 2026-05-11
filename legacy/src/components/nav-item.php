<?php
/**
 * Componente: Nav Item
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=121-2360
 * Variantes: state (Enabled|Hovered) × dropdown (false|true) = 4
 *
 * COMPOSIÇÃO POR _partials (ver REGRA CRÍTICA — Reutilização de átomos):
 *   - components/_partials/nav-item → item parametrizado com hover CSS
 *
 * Item de navegação horizontal usado no Header (dentro do nav-list pill).
 * Hover interativo: bg-primary-100, label text-secondary-950, bottom line
 * bg-secondary-950 h-1, chevron rotate-180 (down→up).
 *
 * Tokens: bg-primary-100 · bg-secondary-950 · text-primary-600 · text-secondary-950 ·
 *         text-label-lg · font-body
 */
?>
<div class="space-y-6">

  <div class="space-y-3">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Enabled (hover pra ver transição)</p>
    <div class="inline-flex items-start bg-neutral-50 rounded-full">

      <?php get_template_part('components/_partials/nav-item', null, [
        'label' => 'Eventos', 'href' => '#', 'dropdown' => 'on', 'active' => 'off',
      ]); ?>

      <?php get_template_part('components/_partials/nav-item', null, [
        'label' => 'Ingredientes', 'href' => '#', 'dropdown' => 'off', 'active' => 'off',
      ]); ?>

      <?php get_template_part('components/_partials/nav-item', null, [
        'label' => 'Indústria A&B', 'href' => '#', 'dropdown' => 'on', 'active' => 'off',
      ]); ?>

      <?php get_template_part('components/_partials/nav-item', null, [
        'label' => 'Proteína Animal', 'href' => '#', 'dropdown' => 'off', 'active' => 'off',
      ]); ?>

      <?php get_template_part('components/_partials/nav-item', null, [
        'label' => 'Food Service', 'href' => '#', 'dropdown' => 'off', 'active' => 'off',
      ]); ?>

    </div>
  </div>

  <div class="space-y-3">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Active (estado selecionado/current)</p>
    <div class="inline-flex items-start bg-neutral-50 rounded-full">

      <?php get_template_part('components/_partials/nav-item', null, [
        'label' => 'Eventos', 'href' => '#', 'dropdown' => 'on', 'active' => 'on',
      ]); ?>

      <?php get_template_part('components/_partials/nav-item', null, [
        'label' => 'Ingredientes', 'href' => '#', 'dropdown' => 'off', 'active' => 'off',
      ]); ?>

      <?php get_template_part('components/_partials/nav-item', null, [
        'label' => 'Indústria A&B', 'href' => '#', 'dropdown' => 'on', 'active' => 'off',
      ]); ?>

    </div>
  </div>

</div>
