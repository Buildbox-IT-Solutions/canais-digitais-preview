<?php
/**
 * Componente: Building Blocks / Menu list item
 * Figma:
 *   1859 default (h-56) → https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1859-23314
 *   1859 -2 density (h-48) → node 1859-23355
 *   1859 -4 density (h-40) → node 1859-23396
 *   973 default (h-56)    → node 973-10741
 *
 * Variantes: state (Enabled|Hovered|Selected|Disabled|Menu Title) × density × leading/trailing/supporting bools
 *
 * Container do item:
 *   flex gap-3 h-{56|48|40} items-center px-3 py-2
 *   bg cores por state:
 *     Enabled  → transparent (default)
 *     Hovered  → bg-black/8 (rgba(0,0,0,0.08))
 *     Selected → bg-secondary-50 (#aae6ff)
 *     Disabled → opacity-40
 *
 * Leading element (opcional): 24×24 SVG icon
 * Content: label-lg SemiBold text-primary-600 + supporting text opcional
 * Trailing element (opcional): 24×24 SVG icon
 *
 * Tokens: bg-secondary-50 · bg-black/8 · text-primary-600 · text-label-lg ·
 *         font-body · font-display
 */
?>
<div class="space-y-8">

  <!-- ===== Density default (h-56) ===== -->
  <div class="space-y-3">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Density default · h-56 · 5 estados</p>
    <div class="flex flex-col items-start w-[200px]">

      <!-- Enabled -->
      <div class="flex gap-3 h-14 items-center px-3 py-2 w-full">
        <div class="flex flex-1 flex-col items-start min-w-0">
          <p class="font-body font-semibold text-label-lg text-primary-600 leading-5 w-full">Menu item</p>
        </div>
      </div>

      <!-- Hovered (bg-black/8) -->
      <div class="flex gap-3 h-14 items-center px-3 py-2 w-full bg-black/8">
        <div class="flex flex-1 flex-col items-start min-w-0">
          <p class="font-body font-semibold text-label-lg text-primary-600 leading-5 w-full">Menu item</p>
        </div>
      </div>

      <!-- Selected (bg-secondary-50) -->
      <div class="flex gap-3 h-14 items-center px-3 py-2 w-full bg-secondary-50">
        <div class="flex flex-1 flex-col items-start min-w-0">
          <p class="font-body font-semibold text-label-lg text-primary-600 leading-5 w-full">Menu item</p>
        </div>
        <svg class="size-6 shrink-0 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg>
      </div>

      <!-- Menu Title (Aleo Bold 16) -->
      <div class="flex gap-3 h-14 items-center px-3 py-2 w-full">
        <div class="flex flex-1 flex-col items-start min-w-0">
          <p class="font-display font-bold text-title-md text-neutral-700 leading-6 w-full">Menu Title</p>
        </div>
      </div>

      <!-- Disabled -->
      <div class="flex gap-3 h-14 items-center px-3 py-2 w-full opacity-40">
        <div class="flex flex-1 flex-col items-start min-w-0">
          <p class="font-body font-semibold text-label-lg text-primary-600 leading-5 w-full">Menu item</p>
        </div>
      </div>

    </div>
  </div>

  <!-- ===== Density -2 (h-48) ===== -->
  <div class="space-y-3">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Density -2 · h-48</p>
    <div class="flex flex-col items-start w-[200px]">
      <div class="flex gap-3 h-12 items-center px-3 py-2 w-full">
        <p class="flex-1 font-body font-semibold text-label-lg text-primary-600 leading-5">Menu item</p>
      </div>
      <div class="flex gap-3 h-12 items-center px-3 py-2 w-full bg-black/8">
        <p class="flex-1 font-body font-semibold text-label-lg text-primary-600 leading-5">Menu item</p>
      </div>
      <div class="flex gap-3 h-12 items-center px-3 py-2 w-full bg-secondary-50">
        <p class="flex-1 font-body font-semibold text-label-lg text-primary-600 leading-5">Menu item</p>
      </div>
    </div>
  </div>

  <!-- ===== Density -4 (h-40) ===== -->
  <div class="space-y-3">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Density -4 · h-40 · compact</p>
    <div class="flex flex-col items-start w-[200px]">
      <div class="flex gap-3 h-10 items-center px-3 py-2 w-full">
        <p class="flex-1 font-body font-semibold text-label-lg text-primary-600 leading-5">Menu item</p>
      </div>
      <div class="flex gap-3 h-10 items-center px-3 py-2 w-full bg-black/8">
        <p class="flex-1 font-body font-semibold text-label-lg text-primary-600 leading-5">Menu item</p>
      </div>
      <div class="flex gap-3 h-10 items-center px-3 py-2 w-full bg-secondary-50">
        <p class="flex-1 font-body font-semibold text-label-lg text-primary-600 leading-5">Menu item</p>
      </div>
    </div>
  </div>

  <!-- ===== Com leading icon + trailing chevron (variante 1859 default com props all on) ===== -->
  <div class="space-y-3">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Com leading icon + trailing chevron</p>
    <div class="flex flex-col items-start w-[244px] bg-white border border-neutral-100 rounded-sm">
      <div class="flex gap-3 h-14 items-center pl-6 pr-4 py-2 w-full">
        <svg class="size-6 shrink-0 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
        <div class="flex flex-1 flex-col items-start min-w-0">
          <p class="font-body font-semibold text-label-lg text-primary-600 leading-5">Menu item</p>
          <p class="font-body text-body-sm text-neutral-700 leading-4">Supporting text</p>
        </div>
        <svg class="size-6 shrink-0 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
      </div>
    </div>
  </div>

</div>
