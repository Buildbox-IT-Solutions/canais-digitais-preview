<?php
/**
 * Componente: Dropdown Menu
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1859-23264
 * Variantes: density (0|-2|-4) = 3
 *
 * Menu suspenso Material 3. Características:
 *   - bg-neutral-50 (#e9eaec) — NÃO bg-white
 *   - shadow-md
 *   - rounded-sm
 *   - w-200 (Density 0/-2/-4)
 *   - 12+ menu list items SEM leading/trailing/divider
 *   - Item Selected mostra bg-secondary-50 (#aae6ff)
 *
 * Density controla altura dos items (do menu-list-item):
 *   0  → h-56 each item
 *   -2 → h-48
 *   -4 → h-40
 *
 * Tokens: bg-neutral-50 · bg-secondary-50 · text-primary-600 · text-label-lg ·
 *         shadow-md · rounded-sm · font-body
 */
?>
<div class="space-y-10">

  <!-- ===== Density 0 ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Density 0 · h-56 items</p>
    <div class="bg-neutral-50 flex items-start py-2 rounded-sm shadow-md w-[200px]">
      <div class="flex flex-1 flex-col items-start min-w-0">
        <a href="#" class="flex h-14 items-center px-3 py-2 w-full hover:bg-black/8 transition-colors">
          <p class="flex-1 font-body font-semibold text-label-lg text-primary-600">Menu item</p>
        </a>
        <a href="#" class="flex h-14 items-center px-3 py-2 w-full hover:bg-black/8">
          <p class="flex-1 font-body font-semibold text-label-lg text-primary-600">Menu item</p>
        </a>
        <a href="#" class="flex h-14 items-center px-3 py-2 w-full hover:bg-black/8">
          <p class="flex-1 font-body font-semibold text-label-lg text-primary-600">Menu item</p>
        </a>
        <a href="#" class="flex h-14 items-center px-3 py-2 w-full hover:bg-black/8">
          <p class="flex-1 font-body font-semibold text-label-lg text-primary-600">Menu item</p>
        </a>
        <a href="#" aria-current="true" class="flex h-14 items-center px-3 py-2 w-full bg-secondary-50">
          <p class="flex-1 font-body font-semibold text-label-lg text-primary-600">Selected item</p>
        </a>
        <a href="#" class="flex h-14 items-center px-3 py-2 w-full hover:bg-black/8">
          <p class="flex-1 font-body font-semibold text-label-lg text-primary-600">Menu item</p>
        </a>
      </div>
    </div>
  </div>

  <!-- ===== Density -2 ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Density -2 · h-48 items</p>
    <div class="bg-neutral-50 flex items-start py-2 rounded-sm shadow-md w-[200px]">
      <div class="flex flex-1 flex-col items-start min-w-0">
        <a href="#" class="flex h-12 items-center px-3 py-2 w-full hover:bg-black/8">
          <p class="flex-1 font-body font-semibold text-label-lg text-primary-600">Menu item</p>
        </a>
        <a href="#" class="flex h-12 items-center px-3 py-2 w-full hover:bg-black/8">
          <p class="flex-1 font-body font-semibold text-label-lg text-primary-600">Menu item</p>
        </a>
        <a href="#" class="flex h-12 items-center px-3 py-2 w-full hover:bg-black/8">
          <p class="flex-1 font-body font-semibold text-label-lg text-primary-600">Menu item</p>
        </a>
        <a href="#" aria-current="true" class="flex h-12 items-center px-3 py-2 w-full bg-secondary-50">
          <p class="flex-1 font-body font-semibold text-label-lg text-primary-600">Selected item</p>
        </a>
        <a href="#" class="flex h-12 items-center px-3 py-2 w-full hover:bg-black/8">
          <p class="flex-1 font-body font-semibold text-label-lg text-primary-600">Menu item</p>
        </a>
      </div>
    </div>
  </div>

  <!-- ===== Density -4 ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Density -4 · h-40 items (compact)</p>
    <div class="bg-neutral-50 flex items-start py-2 rounded-sm shadow-md w-[200px]">
      <div class="flex flex-1 flex-col items-start min-w-0">
        <a href="#" class="flex h-10 items-center px-3 py-2 w-full hover:bg-black/8">
          <p class="flex-1 font-body font-semibold text-label-lg text-primary-600">Menu item</p>
        </a>
        <a href="#" class="flex h-10 items-center px-3 py-2 w-full hover:bg-black/8">
          <p class="flex-1 font-body font-semibold text-label-lg text-primary-600">Menu item</p>
        </a>
        <a href="#" class="flex h-10 items-center px-3 py-2 w-full hover:bg-black/8">
          <p class="flex-1 font-body font-semibold text-label-lg text-primary-600">Menu item</p>
        </a>
        <a href="#" aria-current="true" class="flex h-10 items-center px-3 py-2 w-full bg-secondary-50">
          <p class="flex-1 font-body font-semibold text-label-lg text-primary-600">Selected item</p>
        </a>
        <a href="#" class="flex h-10 items-center px-3 py-2 w-full hover:bg-black/8">
          <p class="flex-1 font-body font-semibold text-label-lg text-primary-600">Menu item</p>
        </a>
      </div>
    </div>
  </div>

</div>
