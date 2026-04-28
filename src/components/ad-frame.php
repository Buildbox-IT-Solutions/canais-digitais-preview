<?php
/**
 * Componente: Ad Frame
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=30-5047
 * Variantes: device × type = 7
 *   - 1224x245 (desktop hero)
 *   - 970x250 (desktop billboard)
 *   - 970x90  (desktop super leaderboard)
 *   - 728x90  (desktop leaderboard)
 *   - 300x600 (desktop half-page / skyscraper)
 *   - 300x250 (desktop rectangle)
 *   - 360x142 (mobile banner)
 *
 * Cada slot é um placeholder com border `border-primary-100` (#d4dae0)
 * + dimensões fixas. NÃO tem rótulo "Publicidade" — o slot real do tema
 * ficará só com a imagem do anúncio.
 *
 * Tokens: border-primary-100 · bg-neutral-50 · text-neutral-700 · rounded-sm
 */
?>
<div class="space-y-8">

  <!-- ===== Desktop · 1224x245 ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Desktop · 1224×245</p>
    <div class="flex flex-col items-center p-6 w-full max-w-[1920px]">
      <div class="flex items-center max-w-screen-xl w-full">
        <div class="aspect-[1248/250] border border-primary-100 bg-neutral-50 flex flex-1 items-center justify-center">
          <span class="font-body font-bold text-label-md text-neutral-700">1224 × 245</span>
        </div>
      </div>
    </div>
  </div>

  <!-- ===== 970x250 ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Desktop · 970×250 (Billboard)</p>
    <div class="flex flex-col items-center p-6 w-full max-w-[1920px]">
      <div class="flex flex-col items-center max-w-screen-xl min-w-[970px] w-full">
        <div class="border border-primary-100 bg-neutral-50 flex items-center justify-center h-[250px] w-[970px]">
          <span class="font-body font-bold text-label-md text-neutral-700">970 × 250</span>
        </div>
      </div>
    </div>
  </div>

  <!-- ===== 970x90 ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Desktop · 970×90 (Super Leaderboard)</p>
    <div class="flex flex-col items-center p-6 w-full max-w-[1920px]">
      <div class="flex items-center justify-center max-w-screen-xl min-w-[970px] overflow-hidden w-full">
        <div class="aspect-[970/90] border border-primary-100 bg-neutral-50 flex items-center justify-center flex-1 max-h-[90px] max-w-[970px]">
          <span class="font-body font-bold text-label-md text-neutral-700">970 × 90</span>
        </div>
      </div>
    </div>
  </div>

  <!-- ===== 728x90 ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Desktop · 728×90 (Leaderboard)</p>
    <div class="flex flex-col items-center p-6 w-full max-w-[1920px]">
      <div class="flex flex-col items-center max-w-screen-xl min-w-[728px] w-full">
        <div class="border border-primary-100 bg-neutral-50 flex items-center justify-center h-[90px] w-[728px]">
          <span class="font-body font-bold text-label-md text-neutral-700">728 × 90</span>
        </div>
      </div>
    </div>
  </div>

  <!-- ===== 300x600 ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Desktop · 300×600 (Half-page / Skyscraper)</p>
    <div class="flex flex-col gap-2 items-center p-4">
      <div class="border border-primary-100 bg-neutral-50 flex items-center justify-center h-[600px] w-[300px]">
        <span class="font-body font-bold text-label-md text-neutral-700">300 × 600</span>
      </div>
    </div>
  </div>

  <!-- ===== 300x250 ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Desktop · 300×250 (Rectangle)</p>
    <div class="flex flex-col gap-2 items-center p-4">
      <div class="border border-primary-100 bg-neutral-50 flex items-center justify-center h-[250px] w-[300px]">
        <span class="font-body font-bold text-label-md text-neutral-700">300 × 250</span>
      </div>
    </div>
  </div>

  <!-- ===== Mobile · 360x142 ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Mobile · 360×142</p>
    <div class="flex flex-col items-start px-4 py-6 w-[393px]">
      <div class="aspect-[390/154] border border-primary-100 bg-neutral-50 flex items-center justify-center rounded-sm w-full">
        <span class="font-body font-bold text-label-md text-neutral-700">360 × 142</span>
      </div>
    </div>
  </div>

</div>
