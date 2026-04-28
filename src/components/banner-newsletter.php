<?php
/**
 * Componente: Banner Newsletter
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1188-11621
 * Variantes: device (Desktop|Mobile) × photo (false|true) = 4
 *
 * Banner pra captura de inscrição em newsletter. 4 variantes:
 *   - Desktop sem photo: bg gradient `from-primary-600 to-secondary-950`
 *     w-1224 com decoração "Informa Orbit" no canto direito (omitida pra
 *     simplificação — SVG complexo)
 *   - Desktop com photo: bg-primary-100 (#d4dae0) w-1224 com Image 3:2 esquerda
 *   - Mobile sem photo: bg gradient w-360 h-570 stacked
 *   - Mobile com photo: bg-primary-100 w-360 stacked com Image em cima
 *
 * Title: Aleo Bold display-sm (36/44 desktop) ou headline-sm (24/32 mobile)
 * Description: Open Sans Regular body-lg
 * Button:
 *   - sem photo: bg-white text-primary-600 (inverso pra contraste sobre dark)
 *   - com photo: bg-primary-600 text-white (normal)
 *
 * Tokens: bg-primary-600 · bg-secondary-950 · bg-primary-100 · bg-white ·
 *         text-white · text-primary-600 · text-display-sm · text-headline-sm ·
 *         text-body-lg · font-display · font-body · rounded-sm
 */
?>
<div class="space-y-10">

  <!-- ===== Desktop · sem photo (gradient) ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Desktop · sem photo · gradient</p>
    <div class="relative flex items-center max-w-screen-xl overflow-hidden rounded-sm w-full bg-gradient-to-b from-primary-600 to-secondary-950">
      <div class="flex flex-1 flex-col items-start min-w-0">
        <div class="flex flex-col gap-4 items-start justify-center pb-4 pt-10 px-10 text-white w-full">
          <p class="font-display font-bold text-display-sm leading-[44px] w-full">
            Lorem ipsum dolor sit amet consectetur. Ac nulla aliquam amet eget odio et.
          </p>
          <p class="font-body text-body-lg w-full">
            Lorem ipsum dolor sit amet consectetur. Risus eget nulla est sem eget sem integer facilisi tellus.
          </p>
        </div>
        <div class="flex flex-col h-24 items-start pb-10 pt-4 px-10 w-full">
          <a href="#" class="bg-white inline-flex items-center justify-center px-6 py-3 rounded-full text-primary-600 hover:bg-neutral-50 transition-colors font-body font-bold text-body-lg">
            Lorem ipsum
          </a>
        </div>
      </div>
      <!-- Decoração Informa Orbit -->
      <div class="absolute bottom-0 right-0 w-[240px] h-[240px] opacity-20 pointer-events-none">
        <div class="w-full h-full rounded-full border-[3px] border-white/40"></div>
      </div>
    </div>
  </div>

  <!-- ===== Desktop · com photo ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Desktop · com photo</p>
    <div class="bg-primary-100 flex items-center max-w-screen-xl overflow-hidden rounded-sm w-full">
      <div class="aspect-[300/200] flex flex-col items-center justify-center overflow-hidden flex-1 min-w-0 self-stretch">
        <img src="https://picsum.photos/seed/banner-news/600/400" alt="" class="w-full h-full object-cover">
      </div>
      <div class="flex flex-1 flex-col items-start justify-center min-w-[704px]">
        <div class="flex flex-col gap-4 items-start justify-center pb-4 pt-10 px-10 text-primary-600 w-full">
          <p class="font-display font-bold text-display-sm leading-[44px] w-full">
            Lorem ipsum dolor sit amet consectetur. Ac nulla aliquam amet eget odio et.
          </p>
          <p class="font-body text-body-lg w-full">
            Lorem ipsum dolor sit amet consectetur. Risus eget nulla est sem eget sem integer facilisi tellus.
          </p>
        </div>
        <div class="flex flex-col h-24 items-start pb-10 pt-4 px-10 w-full">
          <a href="#" class="bg-primary-600 inline-flex items-center justify-center px-6 py-3 rounded-full text-white hover:bg-secondary-950 transition-colors font-body font-bold text-body-lg">
            Lorem ipsum
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- ===== Mobile · sem photo (gradient) ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Mobile · sem photo</p>
    <div class="relative bg-gradient-to-b flex flex-col from-primary-600 to-secondary-950 h-[570px] items-center overflow-hidden rounded-sm w-[360px]">
      <div class="flex-1 w-full"></div>
      <div class="flex flex-1 flex-col gap-4 items-start justify-end min-h-px min-w-0 p-6 text-white w-full">
        <p class="font-display font-bold text-headline-sm w-full">
          Lorem ipsum dolor sit amet consectetur.
        </p>
        <p class="font-body text-body-lg w-full">
          Lorem ipsum dolor sit amet consectetur. Risus eget nulla est sem eget sem integer facilisi tellus.
        </p>
      </div>
      <div class="flex flex-col items-start pb-8 pt-3 px-6 w-full">
        <a href="#" class="bg-white inline-flex items-center justify-center px-6 py-3 rounded-full text-primary-600 hover:bg-neutral-50 transition-colors font-body font-bold text-body-lg w-full">
          Lorem ipsum
        </a>
      </div>
      <!-- Decoração Informa Orbit -->
      <div class="absolute bottom-0 right-0 w-[240px] h-[240px] opacity-20 pointer-events-none">
        <div class="w-full h-full rounded-full border-[3px] border-white/40"></div>
      </div>
    </div>
  </div>

  <!-- ===== Mobile · com photo ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Mobile · com photo</p>
    <div class="bg-primary-100 flex flex-col items-start justify-center overflow-hidden rounded-sm w-[360px]">
      <div class="aspect-[300/200] flex flex-col items-center justify-center overflow-hidden w-full">
        <img src="https://picsum.photos/seed/banner-news-m/600/400" alt="" class="w-full h-full object-cover">
      </div>
      <div class="flex flex-col items-start justify-center w-full">
        <div class="flex flex-col gap-4 items-start justify-center pb-4 pt-8 px-6 text-primary-600 w-full">
          <p class="font-display font-bold text-headline-sm w-full">
            Lorem ipsum dolor sit amet consectetur. Ac nulla aliquam amet eget odio et.
          </p>
          <p class="font-body text-body-lg w-full">
            Lorem ipsum dolor sit amet consectetur. Risus eget nulla est sem eget sem integer facilisi tellus.
          </p>
        </div>
        <div class="flex flex-col h-24 items-start pb-8 pt-4 px-6 w-full">
          <a href="#" class="bg-primary-600 inline-flex items-center justify-center px-6 py-3 rounded-full text-white hover:bg-secondary-950 transition-colors font-body font-bold text-body-lg w-full">
            Lorem ipsum
          </a>
        </div>
      </div>
    </div>
  </div>

</div>
