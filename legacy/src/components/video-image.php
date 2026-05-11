<?php
/**
 * Componente: Video Image 2.0
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=2790-25832
 * Variantes: size (Large|Medium|Small|XSmall) × state (Enabled|Hovered) = 8
 *
 * Capa 16:9 de vídeo standalone com play overlay opcional. Características:
 *   - Aspect 16:9 (160/90)
 *   - rounded-sm
 *   - Play overlay APENAS no estado Hovered
 *   - Play button bg semi-transparente: rgba(255,255,255,0.8)
 *
 * SIZES:
 *   Large    → 600 × 337.5
 *   Medium   → 392 × 220.5
 *   Small    → 288 × 162
 *   XSmall   → 160 × 90
 *
 * Play overlay sizes (no Hovered):
 *   XSmall → Small play (p-2 icon-24)
 *   Small  → Medium play (p-3 icon-24)
 *   Medium → Large play (p-4 icon-32)
 *   Large  → XLarge play (p-4 icon-40)
 *
 * NOTA: usa inline play button (não partial) — bg-white/80 ≠ bg-white sólido
 * do partial.
 */
?>
<div class="space-y-8">

  <!-- ===== Large · Enabled ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Large · Enabled</p>
    <div class="rounded-sm overflow-hidden w-[600px] h-[337.5px]">
      <img src="https://picsum.photos/seed/vimg-l/1200/675" alt="Thumbnail vídeo" class="w-full h-full object-cover">
    </div>
  </div>

  <!-- ===== Large · Hovered (XLarge play) ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Large · Hovered</p>
    <div class="relative rounded-sm overflow-hidden w-[600px] h-[337.5px] flex items-center justify-center">
      <img src="https://picsum.photos/seed/vimg-l-h/1200/675" alt="Thumbnail vídeo" class="absolute inset-0 w-full h-full object-cover">
      <div class="relative inline-flex items-center justify-center rounded-full bg-white/80 p-4">
        <svg class="size-10 text-primary-600" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7L8 5z"/></svg>
      </div>
    </div>
  </div>

  <!-- ===== Medium · Hovered (Large play) ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Medium · Hovered</p>
    <div class="relative rounded-sm overflow-hidden w-[392px] h-[220.5px] flex items-center justify-center">
      <img src="https://picsum.photos/seed/vimg-m-h/800/450" alt="Thumbnail vídeo" class="absolute inset-0 w-full h-full object-cover">
      <div class="relative inline-flex items-center justify-center rounded-full bg-white/80 p-4">
        <svg class="size-8 text-primary-600" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7L8 5z"/></svg>
      </div>
    </div>
  </div>

  <!-- ===== Small · Hovered (Medium play) ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Small · Hovered</p>
    <div class="relative rounded-sm overflow-hidden w-[288px] h-[162px] flex items-center justify-center">
      <img src="https://picsum.photos/seed/vimg-s-h/600/337" alt="Thumbnail vídeo" class="absolute inset-0 w-full h-full object-cover">
      <div class="relative inline-flex items-center justify-center rounded-full bg-white/80 p-3">
        <svg class="size-6 text-primary-600" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7L8 5z"/></svg>
      </div>
    </div>
  </div>

  <!-- ===== XSmall · Hovered (Small play) ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">XSmall · Hovered</p>
    <div class="relative rounded-sm overflow-hidden w-[160px] h-[90px] flex items-center justify-center">
      <img src="https://picsum.photos/seed/vimg-xs-h/320/180" alt="Thumbnail vídeo" class="absolute inset-0 w-full h-full object-cover">
      <div class="relative inline-flex items-center justify-center rounded-full bg-white/80 p-2">
        <svg class="size-6 text-primary-600" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7L8 5z"/></svg>
      </div>
    </div>
  </div>

  <!-- ===== Small · Enabled ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Small · Enabled</p>
    <div class="rounded-sm overflow-hidden w-[288px] h-[162px]">
      <img src="https://picsum.photos/seed/vimg-s/600/337" alt="Thumbnail vídeo" class="w-full h-full object-cover">
    </div>
  </div>

</div>
