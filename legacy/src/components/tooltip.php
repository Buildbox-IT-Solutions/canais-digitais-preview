<?php
/**
 * Componente: Tooltip
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1859-19519
 * Variantes: side (Top|Right|Bottom|Left) = 4
 *
 * Balão informativo Material 3:
 *   - bg neutral-950 (#283857)
 *   - rounded-sm (4px)
 *   - px-2 py-1
 *   - text-label-md (12/16 SemiBold tracking 0.5), text-white
 *   - Arrow triangular 11.5×5px (CSS borders) na lateral oposta
 *
 * Tokens: bg-neutral-950 · text-white · text-label-md · font-body · rounded-sm
 */
?>
<div class="space-y-8">

  <!-- Showcase: 4 tooltips em volta de um alvo central -->
  <div class="relative mx-auto w-80 h-80 flex items-center justify-center border border-dashed border-neutral-200 rounded-sm">

    <span class="inline-flex items-center justify-center size-10 rounded-full bg-primary-600 text-white text-label-lg font-body font-bold">
      ?
    </span>

    <!-- Top — arrow apontando pra baixo -->
    <div class="absolute top-12 left-1/2 -translate-x-1/2">
      <div class="relative inline-flex items-center justify-center px-2 py-1 rounded-sm bg-neutral-950">
        <p class="font-body font-semibold text-label-md text-white text-center whitespace-nowrap">Tooltip text</p>
        <span class="absolute left-1/2 -translate-x-1/2 -bottom-[5px] w-0 h-0 border-l-[5.75px] border-r-[5.75px] border-t-[5px] border-l-transparent border-r-transparent border-t-neutral-950"></span>
      </div>
    </div>

    <!-- Right — arrow apontando pra esquerda -->
    <div class="absolute right-8 top-1/2 -translate-y-1/2">
      <div class="relative inline-flex items-center justify-center px-2 py-1 rounded-sm bg-neutral-950">
        <p class="font-body font-semibold text-label-md text-white whitespace-nowrap">Tooltip text</p>
        <span class="absolute top-1/2 -translate-y-1/2 -left-[5px] w-0 h-0 border-t-[5.75px] border-b-[5.75px] border-r-[5px] border-t-transparent border-b-transparent border-r-neutral-950"></span>
      </div>
    </div>

    <!-- Bottom — arrow apontando pra cima -->
    <div class="absolute bottom-12 left-1/2 -translate-x-1/2">
      <div class="relative inline-flex items-center justify-center px-2 py-1 rounded-sm bg-neutral-950">
        <p class="font-body font-semibold text-label-md text-white text-center whitespace-nowrap">Tooltip text</p>
        <span class="absolute left-1/2 -translate-x-1/2 -top-[5px] w-0 h-0 border-l-[5.75px] border-r-[5.75px] border-b-[5px] border-l-transparent border-r-transparent border-b-neutral-950"></span>
      </div>
    </div>

    <!-- Left — arrow apontando pra direita -->
    <div class="absolute left-8 top-1/2 -translate-y-1/2">
      <div class="relative inline-flex items-center justify-center px-2 py-1 rounded-sm bg-neutral-950">
        <p class="font-body font-semibold text-label-md text-white whitespace-nowrap">Tooltip text</p>
        <span class="absolute top-1/2 -translate-y-1/2 -right-[5px] w-0 h-0 border-t-[5.75px] border-b-[5.75px] border-l-[5px] border-t-transparent border-b-transparent border-l-neutral-950"></span>
      </div>
    </div>

  </div>

</div>
