<?php
/**
 * Componente: Podcast Image
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=2279-20059
 * Variantes: size (Large|Medium|Small|XSmall) × ratio (16:9|1:1) × state (Enabled|Hovered) ≈ 10
 *
 * Capa de podcast standalone com play overlay opcional. Características:
 *
 *   - Imagem direto sem bg placeholder
 *   - rounded-sm
 *   - Play overlay APENAS no estado Hovered (não no Enabled)
 *   - Play button bg semi-transparente: rgba(255,255,255,0.8)
 *
 * SIZES + RATIOS:
 *   Large 16:9    → 600 × 337.5
 *   Medium 16:9   → 392 × 220.5
 *   Medium 1:1    → 160 × 160
 *   Small 1:1     → 128 × 128
 *   XSmall 1:1    → 104 × 104
 *
 * Play overlay sizes:
 *   Hovered XSmall/Small (1:1) → Small play (p-2 icon-24)
 *   Hovered Medium (1:1)       → Small play
 *   Hovered Medium (16:9)      → Large play (p-4 icon-32)
 *   Hovered Large (16:9)       → XLarge play (p-4 icon-40)
 *
 * NOTA: usa inline play button (não partial) porque o partial play-button
 * tem bg-white sólido, e aqui precisa de rgba(255,255,255,0.8) específico
 * pra esse contexto.
 *
 * Tokens: rounded-sm · text-primary-600
 */
?>
<div class="space-y-8">

  <!-- ===== Large 16:9 · Enabled (sem play) ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Large · 16:9 · Enabled</p>
    <div class="rounded-sm overflow-hidden w-[600px] h-[337.5px]">
      <img src="https://picsum.photos/seed/pimg-l-169/1200/675" alt="Capa do podcast" class="w-full h-full object-cover">
    </div>
  </div>

  <!-- ===== Large 16:9 · Hovered (XLarge play) ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Large · 16:9 · Hovered</p>
    <div class="relative rounded-sm overflow-hidden w-[600px] h-[337.5px] flex items-center justify-center">
      <img src="https://picsum.photos/seed/pimg-l-169-h/1200/675" alt="Capa do podcast" class="absolute inset-0 w-full h-full object-cover">
      <div class="relative inline-flex items-center justify-center rounded-full bg-white/80 p-4">
        <svg class="size-10 text-primary-600" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7L8 5z"/></svg>
      </div>
    </div>
  </div>

  <!-- ===== Medium 16:9 · Hovered (Large play) ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Medium · 16:9 · Hovered</p>
    <div class="relative rounded-sm overflow-hidden w-[392px] h-[220.5px] flex items-center justify-center">
      <img src="https://picsum.photos/seed/pimg-m-169-h/800/450" alt="Capa do podcast" class="absolute inset-0 w-full h-full object-cover">
      <div class="relative inline-flex items-center justify-center rounded-full bg-white/80 p-4">
        <svg class="size-8 text-primary-600" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7L8 5z"/></svg>
      </div>
    </div>
  </div>

  <!-- ===== Medium 1:1 · Enabled ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Medium · 1:1 · Enabled</p>
    <div class="rounded-sm overflow-hidden size-[160px]">
      <img src="https://picsum.photos/seed/pimg-m-11/320/320" alt="Capa do podcast" class="w-full h-full object-cover">
    </div>
  </div>

  <!-- ===== Medium 1:1 · Hovered (Small play) ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Medium · 1:1 · Hovered</p>
    <div class="relative rounded-sm overflow-hidden size-[160px] flex items-center justify-center">
      <img src="https://picsum.photos/seed/pimg-m-11-h/320/320" alt="Capa do podcast" class="absolute inset-0 w-full h-full object-cover">
      <div class="relative inline-flex items-center justify-center rounded-full bg-white/80 p-2">
        <svg class="size-6 text-primary-600" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7L8 5z"/></svg>
      </div>
    </div>
  </div>

  <!-- ===== Small 1:1 · Enabled ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Small · 1:1 · Enabled</p>
    <div class="rounded-sm overflow-hidden size-[128px]">
      <img src="https://picsum.photos/seed/pimg-s-11/256/256" alt="Capa do podcast" class="w-full h-full object-cover">
    </div>
  </div>

  <!-- ===== XSmall 1:1 · Enabled ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">XSmall · 1:1 · Enabled</p>
    <div class="rounded-sm overflow-hidden size-[104px]">
      <img src="https://picsum.photos/seed/pimg-xs-11/208/208" alt="Capa do podcast" class="w-full h-full object-cover">
    </div>
  </div>

</div>
