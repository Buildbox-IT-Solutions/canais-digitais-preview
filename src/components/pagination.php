<?php
/**
 * Componente: Pagination + page-item
 * Figma Pagination: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=4541-15460
 * Figma page-item:  https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1510-22852
 * Variantes: device (Desktop|Mobile) = 2 + page-item 4 estados
 *
 * Paginação com 2 layouts radicalmente diferentes:
 *   - Desktop: prev icon-button + lista de page-items + next icon-button
 *   - Mobile: prev icon-button (size 32) + "{page} de {total}" texto + next
 *
 * page-item:
 *   - 40×40 (size-10) rounded-full p-2
 *   - Selected: border 1px primary-600 + text primary-600 bold
 *   - Default: text neutral-900 (#3c4e69) bold
 *   - Texto: text-label-lg-bold (14/20)
 *
 * Mobile mostra "1 de 99":
 *   - "1" → primary-600 bold
 *   - "de" → neutral-700 (#6c7f9e) semibold
 *   - "99" → neutral-700 semibold
 *
 * Tokens: text-primary-600 · text-neutral-900 · text-neutral-700 ·
 *         border-primary-600 · rounded-full · text-label-lg
 */
?>
<div class="space-y-10">

  <!-- ============================================================
       Desktop
       ============================================================ -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Desktop</p>
    <nav aria-label="Paginação" class="flex items-center justify-center p-4">

      <!-- Prev (Icon Button ghost size-24 icon) -->
      <a href="#" aria-label="Página anterior" class="inline-flex items-center justify-center p-2 rounded-full text-primary-600 hover:bg-neutral-50 transition-colors">
        <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
      </a>

      <!-- page-item · selected -->
      <a href="#" aria-current="page" class="inline-flex items-center justify-center size-10 p-2 rounded-full border border-primary-600 text-primary-600 font-body font-bold text-label-lg">1</a>

      <!-- page-items · default -->
      <a href="#" class="inline-flex items-center justify-center size-10 p-2 rounded-full text-neutral-900 hover:bg-neutral-50 transition-colors font-body font-bold text-label-lg">2</a>
      <a href="#" class="inline-flex items-center justify-center size-10 p-2 rounded-full text-neutral-900 hover:bg-neutral-50 transition-colors font-body font-bold text-label-lg">3</a>
      <a href="#" class="inline-flex items-center justify-center size-10 p-2 rounded-full text-neutral-900 hover:bg-neutral-50 transition-colors font-body font-bold text-label-lg">4</a>
      <span class="inline-flex items-center justify-center size-10 p-2 text-neutral-900 font-body font-bold text-label-lg select-none">...</span>
      <a href="#" class="inline-flex items-center justify-center size-10 p-2 rounded-full text-neutral-900 hover:bg-neutral-50 transition-colors font-body font-bold text-label-lg">99</a>

      <!-- Next -->
      <a href="#" aria-label="Próxima página" class="inline-flex items-center justify-center p-2 rounded-full text-primary-600 hover:bg-neutral-50 transition-colors">
        <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
      </a>

    </nav>
  </div>

  <!-- ============================================================
       Mobile
       ============================================================ -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Mobile</p>
    <nav aria-label="Paginação" class="flex items-center justify-center gap-6 p-4 w-[320px]">

      <!-- Prev (Icon Button maior — size-32 icon) -->
      <a href="#" aria-label="Página anterior" class="inline-flex items-center justify-center p-2 rounded-full text-primary-600 hover:bg-neutral-50 transition-colors">
        <svg class="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
      </a>

      <!-- "1 de 99" -->
      <div class="flex items-center gap-2 text-label-lg whitespace-nowrap">
        <span class="font-body font-bold text-primary-600">1</span>
        <span class="font-body font-semibold text-neutral-700">de</span>
        <span class="font-body font-semibold text-neutral-700">99</span>
      </div>

      <!-- Next -->
      <a href="#" aria-label="Próxima página" class="inline-flex items-center justify-center p-2 rounded-full text-primary-600 hover:bg-neutral-50 transition-colors">
        <svg class="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
      </a>

    </nav>
  </div>

  <!-- ============================================================
       page-item · 4 estados (showcase isolado)
       ============================================================ -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">page-item · 4 estados</p>
    <div class="flex items-center gap-2">
      <!-- Selected -->
      <a href="#" aria-current="page" class="inline-flex items-center justify-center size-10 p-2 rounded-full border border-primary-600 text-primary-600 font-body font-bold text-label-lg">1</a>
      <!-- Default -->
      <a href="#" class="inline-flex items-center justify-center size-10 p-2 rounded-full text-neutral-900 hover:bg-neutral-50 transition-colors font-body font-bold text-label-lg">2</a>
      <!-- Hovered (forçado) -->
      <a href="#" class="inline-flex items-center justify-center size-10 p-2 rounded-full bg-neutral-50 text-neutral-900 font-body font-bold text-label-lg">3</a>
      <!-- Disabled -->
      <span class="inline-flex items-center justify-center size-10 p-2 text-neutral-300 cursor-not-allowed font-body font-bold text-label-lg">…</span>
    </div>
  </div>

</div>
