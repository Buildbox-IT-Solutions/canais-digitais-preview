<?php
/**
 * Componente: Widget / Em Alta + Widget Item / Number
 * Figma Widget: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=3492-42255
 * Figma Item:   https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=2769-26529
 * Variantes: 2 (device Desktop|Mobile)
 *
 * Widget de "Em Alta" com lista numerada (top-N artigos). Características:
 *   - bg-neutral-50 (#e9eaec) border-neutral-100 rounded-lg pb-4
 *   - min-w 392 / w-392
 *   - Top: title "Widget Title" Aleo Bold 22/28 text-primary-600 com p-6 (desktop) / p-5 (mobile)
 *   - Items (Widget Item / Number):
 *     - gap-4 py-2 px-6 (desktop) / px-4 (mobile)
 *     - Numero gigante: Aleo Bold 36/44 (desktop) / 28/36 (mobile) text-neutral-900
 *     - Title: Aleo Bold 18/24 (desktop) / 16/24 tracking 0.15 (mobile) text-primary-600
 *     - Divider entre items
 *
 * Tokens: bg-neutral-50 · border-neutral-100 · text-primary-600 · text-neutral-900 ·
 *         text-title-xl · text-display-sm · text-headline-md · text-title-lg ·
 *         text-title-md · font-display · rounded-lg
 */
?>
<div class="space-y-10">

  <!-- ===== Desktop ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Desktop</p>
    <aside class="bg-neutral-50 border border-neutral-100 flex flex-col items-start min-w-[392px] overflow-hidden pb-4 rounded-lg w-[392px]">
      <div class="flex items-center p-6 w-full">
        <p class="flex-1 font-display font-bold text-title-xl text-primary-600 leading-7">Em Alta</p>
      </div>
      <div class="flex flex-col items-start w-full">
        <div class="flex flex-col gap-4 items-start py-2 px-6 w-full">
          <div class="group flex font-display font-bold gap-4 items-start w-full">
            <p class="font-display font-bold text-display-sm text-neutral-900 whitespace-nowrap leading-[44px]">1</p>
            <p class="flex-1 font-display font-bold text-title-lg text-primary-600 group-hover:text-secondary-950 transition-colors leading-6">Lorem ipsum dolor sit amet consectetur. Pulvinar integer sed sit diam.</p>
          </div>
          <?php get_template_part('components/_partials/divider', null, [ 'orientation' => 'horizontal' ]); ?>
        </div>
        <div class="flex flex-col gap-4 items-start py-2 px-6 w-full">
          <div class="group flex font-display font-bold gap-4 items-start w-full">
            <p class="font-display font-bold text-display-sm text-neutral-900 whitespace-nowrap leading-[44px]">2</p>
            <p class="flex-1 font-display font-bold text-title-lg text-primary-600 group-hover:text-secondary-950 transition-colors leading-6">Lorem ipsum dolor sit amet consectetur. Pulvinar integer sed sit diam.</p>
          </div>
          <?php get_template_part('components/_partials/divider', null, [ 'orientation' => 'horizontal' ]); ?>
        </div>
        <div class="flex flex-col gap-4 items-start py-2 px-6 w-full">
          <div class="group flex font-display font-bold gap-4 items-start w-full">
            <p class="font-display font-bold text-display-sm text-neutral-900 whitespace-nowrap leading-[44px]">3</p>
            <p class="flex-1 font-display font-bold text-title-lg text-primary-600 group-hover:text-secondary-950 transition-colors leading-6">Lorem ipsum dolor sit amet consectetur. Pulvinar integer sed sit diam.</p>
          </div>
          <?php get_template_part('components/_partials/divider', null, [ 'orientation' => 'horizontal' ]); ?>
        </div>
        <div class="flex flex-col gap-4 items-start py-2 px-6 w-full">
          <div class="group flex font-display font-bold gap-4 items-start w-full">
            <p class="font-display font-bold text-display-sm text-neutral-900 whitespace-nowrap leading-[44px]">4</p>
            <p class="flex-1 font-display font-bold text-title-lg text-primary-600 group-hover:text-secondary-950 transition-colors leading-6">Lorem ipsum dolor sit amet consectetur. Pulvinar integer sed sit diam.</p>
          </div>
          <?php get_template_part('components/_partials/divider', null, [ 'orientation' => 'horizontal' ]); ?>
        </div>
        <div class="flex flex-col gap-4 items-start py-2 px-6 w-full">
          <div class="group flex font-display font-bold gap-4 items-start w-full">
            <p class="font-display font-bold text-display-sm text-neutral-900 whitespace-nowrap leading-[44px]">5</p>
            <p class="flex-1 font-display font-bold text-title-lg text-primary-600 group-hover:text-secondary-950 transition-colors leading-6">Lorem ipsum dolor sit amet consectetur. Pulvinar integer sed sit diam.</p>
          </div>
        </div>
      </div>
    </aside>
  </div>

  <!-- ===== Mobile ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Mobile (numero menor + padding menor)</p>
    <aside class="bg-neutral-50 border border-neutral-100 flex flex-col items-start min-w-[344px] overflow-hidden pb-4 rounded-lg w-[344px]">
      <div class="flex items-center p-5 w-full">
        <p class="flex-1 font-display font-bold text-title-xl text-primary-600 leading-7">Em Alta</p>
      </div>
      <div class="flex flex-col items-start w-full">
        <div class="flex flex-col gap-4 items-start py-2 px-4 w-full">
          <div class="group flex font-display font-bold gap-4 items-start w-full">
            <p class="font-display font-bold text-headline-md text-neutral-900 whitespace-nowrap leading-9">1</p>
            <p class="flex-1 font-display font-bold text-title-md text-primary-600 group-hover:text-secondary-950 transition-colors leading-6">Lorem ipsum dolor sit amet consectetur. Pulvinar integer sed sit diam.</p>
          </div>
          <?php get_template_part('components/_partials/divider', null, [ 'orientation' => 'horizontal' ]); ?>
        </div>
        <div class="flex flex-col gap-4 items-start py-2 px-4 w-full">
          <div class="group flex font-display font-bold gap-4 items-start w-full">
            <p class="font-display font-bold text-headline-md text-neutral-900 whitespace-nowrap leading-9">2</p>
            <p class="flex-1 font-display font-bold text-title-md text-primary-600 group-hover:text-secondary-950 transition-colors leading-6">Lorem ipsum dolor sit amet consectetur. Pulvinar integer sed sit diam.</p>
          </div>
          <?php get_template_part('components/_partials/divider', null, [ 'orientation' => 'horizontal' ]); ?>
        </div>
        <div class="flex flex-col gap-4 items-start py-2 px-4 w-full">
          <div class="group flex font-display font-bold gap-4 items-start w-full">
            <p class="font-display font-bold text-headline-md text-neutral-900 whitespace-nowrap leading-9">3</p>
            <p class="flex-1 font-display font-bold text-title-md text-primary-600 group-hover:text-secondary-950 transition-colors leading-6">Lorem ipsum dolor sit amet consectetur. Pulvinar integer sed sit diam.</p>
          </div>
        </div>
      </div>
    </aside>
  </div>

</div>
