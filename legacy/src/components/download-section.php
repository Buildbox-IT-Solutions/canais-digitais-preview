<?php
/**
 * Componente: Download Section
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1135-18229
 * Variantes: device (Desktop|Mobile) × position (Left|Right|Up|Center|Down) = 6
 *
 * Hero CTA full-width pra download de material. Imagem de fundo +
 * gradient overlay + container glassmorphism com:
 *   - Categoria chip "Download"
 *   - Title display-sm (36/44 desktop) ou headline-sm (24/32 mobile) primary-600
 *   - Description body-lg primary-600
 *   - Button filled primary-600 com download icon + label
 *
 * Anatomia desktop (Left/Right/Center positions):
 *   - Container w-1920 px-24 h-460
 *   - Background image + gradient overlay
 *   - Inner max-w-1224
 *   - Container glass: bg-white/80 rounded-sm gap-6 p-8 w-600 (left/right) ou max-w-808 (center)
 *
 * Anatomia mobile (Up/Center/Down positions):
 *   - Container w-360 h-642
 *   - Mesma background/glass
 *   - Container max-w-704 gap-4 p-6
 *
 * Tokens: bg-white · text-primary-600 · text-white · rounded-sm ·
 *         text-display-sm · text-headline-sm · text-body-lg · font-display · font-body
 */
?>
<div class="space-y-10">

  <!-- ===== Desktop · Position Left ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Desktop · Left</p>
    <div class="relative w-full max-w-[1920px] h-[460px] overflow-hidden">
      <img src="https://picsum.photos/seed/download-bg/1920/460" alt="" class="absolute inset-0 w-full h-full object-cover" aria-hidden="true">
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="relative h-full flex items-center max-w-screen-xl mx-auto px-6 py-8">
        <div class="bg-white/80 flex flex-col gap-6 items-start max-w-[704px] p-8 rounded-sm w-[600px]">
          <span class="bg-white inline-flex items-center justify-center px-2 py-1 rounded-sm">
            <p class="font-body font-semibold text-label-md text-primary-600">Download</p>
          </span>
          <div class="flex flex-col gap-2 items-start text-primary-600 w-full">
            <h2 class="font-display font-bold text-display-sm w-full">
              Lorem ipsum dolor sit amet consectetur. Et elit erat proin cras ante turpis turpis egestas.
            </h2>
            <p class="font-body text-body-lg w-full">
              Lorem ipsum dolor sit amet consectetur. Nunc donec quis maecenas vitae venenatis consectetur nunc. Ornare vulputate sapien arcu dignissim vitae blandit id.
            </p>
          </div>
          <a href="#" class="bg-primary-600 inline-flex items-center justify-center gap-3 pl-5 pr-6 py-3 rounded-full text-white hover:bg-secondary-950 transition-colors font-body font-bold text-body-lg">
            <svg class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
            Baixar agora
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- ===== Desktop · Center ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Desktop · Center</p>
    <div class="relative w-full max-w-[1920px] h-[436px] overflow-hidden">
      <img src="https://picsum.photos/seed/download-bg2/1920/460" alt="" class="absolute inset-0 w-full h-full object-cover" aria-hidden="true">
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="relative h-full flex items-center justify-center max-w-screen-xl mx-auto px-6 py-8">
        <div class="bg-white/80 flex flex-col flex-1 gap-6 items-start max-w-[808px] p-8 rounded-sm">
          <span class="bg-white inline-flex items-center justify-center px-2 py-1 rounded-sm">
            <p class="font-body font-semibold text-label-md text-primary-600">Download</p>
          </span>
          <div class="flex flex-col gap-2 items-start text-primary-600 w-full">
            <h2 class="font-display font-bold text-display-sm w-full">
              Lorem ipsum dolor sit amet consectetur. Et elit erat proin cras ante turpis turpis egestas.
            </h2>
            <p class="font-body text-body-lg w-full">
              Lorem ipsum dolor sit amet consectetur. Nunc donec quis maecenas vitae venenatis consectetur nunc.
            </p>
          </div>
          <a href="#" class="bg-primary-600 inline-flex items-center justify-center gap-3 pl-5 pr-6 py-3 rounded-full text-white hover:bg-secondary-950 transition-colors font-body font-bold text-body-lg">
            <svg class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
            Baixar agora
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- ===== Mobile · Center ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Mobile · Center</p>
    <div class="relative w-[360px] h-[642px] overflow-hidden">
      <img src="https://picsum.photos/seed/download-bg-m/360/642" alt="" class="absolute inset-0 w-full h-full object-cover" aria-hidden="true">
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="relative h-full flex items-center justify-center p-4">
        <div class="bg-white/80 flex flex-col flex-1 gap-4 items-start max-w-[704px] p-6 rounded-sm">
          <span class="bg-white inline-flex items-center justify-center px-2 py-1 rounded-sm">
            <p class="font-body font-semibold text-label-md text-primary-600">Download</p>
          </span>
          <div class="flex flex-col gap-2 items-start text-primary-600 w-full">
            <h2 class="font-display font-bold text-headline-sm w-full">
              Lorem ipsum dolor sit amet consectetur. Et elit erat proin cras.
            </h2>
            <p class="font-body text-body-lg w-full">
              Lorem ipsum dolor sit amet consectetur. Nunc donec quis maecenas vitae venenatis.
            </p>
          </div>
          <a href="#" class="bg-primary-600 inline-flex items-center justify-center gap-3 pl-5 pr-6 py-3 rounded-full text-white hover:bg-secondary-950 transition-colors font-body font-bold text-body-lg w-full">
            <svg class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
            Baixar agora
          </a>
        </div>
      </div>
    </div>
  </div>

</div>
