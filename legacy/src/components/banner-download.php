<?php
/**
 * Componente: Banner Download
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=925-11171
 * Variantes: orientation (Horizontal|Vertical) × photo (false|true) = 4
 *
 * Banner CTA pra download de material. 4 variantes:
 *   - Vertical sem photo: bg-gradient `from-primary-600 to-secondary-950`
 *     w-300 h-478 com Informa Orbit decoração (omitida)
 *   - Vertical com photo: bg-primary-100 (#d4dae0) w-300 com Image 4:3 top
 *   - Horizontal sem photo: bg-gradient w-704 com decoração orbit
 *   - Horizontal com photo: bg-primary-100 w-704 com Image 1:1 left
 *
 * Title sizes:
 *   - Vertical: title-xl (22/28) Aleo Bold
 *   - Horizontal sem photo: text-[32px]/[40px] Aleo Bold (headline-lg)
 *   - Horizontal com photo: headline-md (28/36)
 * Description: Open Sans Regular body-lg
 * Botão: "Acessar material" com download icon
 *   - sem photo: bg-white text-primary-600 (inverso)
 *   - com photo: bg-primary-600 text-white (normal)
 *
 * Tokens: bg-primary-600 · bg-secondary-950 · bg-primary-100 · bg-white ·
 *         text-white · text-primary-600 · text-title-xl · text-headline-lg ·
 *         text-headline-md · text-body-lg · font-display · font-body · rounded-sm
 */
?>
<div class="space-y-10">

  <!-- ===== Vertical · com photo ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Vertical · com photo</p>
    <div class="bg-primary-100 flex flex-col items-center overflow-hidden rounded-sm w-[300px]">
      <div class="aspect-[400/300] flex flex-col items-center justify-center overflow-hidden w-full">
        <img src="https://picsum.photos/seed/bd-vp/600/450" alt="" class="w-full h-full object-cover">
      </div>
      <div class="flex flex-col gap-4 items-start p-6 text-primary-600 w-full">
        <p class="font-display font-bold text-title-xl w-full leading-7">
          Lorem ipsum dolor sit amet consectetur.
        </p>
        <p class="font-body text-body-lg w-full">
          Lorem ipsum dolor sit amet consectetur. Risus eget nulla est sem eget sem integer facilisi tellus.
        </p>
      </div>
      <div class="flex flex-col items-start pb-6 pt-3 px-6 w-full">
        <a href="#" class="bg-primary-600 inline-flex gap-3 items-center justify-center pl-5 pr-6 py-3 rounded-full text-white hover:bg-secondary-950 transition-colors font-body font-bold text-body-lg w-full">
          <svg class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
          Acessar material
        </a>
      </div>
    </div>
  </div>

  <!-- ===== Vertical · sem photo (gradient) ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Vertical · sem photo</p>
    <div class="relative bg-gradient-to-b flex flex-col from-primary-600 h-[478px] items-center overflow-hidden rounded-sm to-secondary-950 w-[300px]">
      <div class="h-[170px] w-full"></div>
      <div class="flex flex-1 flex-col gap-4 items-start min-h-px min-w-0 p-6 text-white w-full">
        <p class="font-display font-bold text-title-xl w-full leading-7">
          Lorem ipsum dolor sit amet consectetur.
        </p>
        <p class="font-body text-body-lg w-full">
          Lorem ipsum dolor sit amet consectetur. Risus eget nulla est sem eget sem integer facilisi tellus.
        </p>
      </div>
      <div class="flex flex-col items-start pb-8 pt-3 px-6 w-full">
        <a href="#" class="bg-white inline-flex gap-3 items-center justify-center pl-5 pr-6 py-3 rounded-full text-primary-600 hover:bg-neutral-50 transition-colors font-body font-bold text-body-lg w-full">
          <svg class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
          Acessar material
        </a>
      </div>
      <!-- Decoração Informa Orbit -->
      <div class="absolute bottom-0 right-0 w-[240px] h-[240px] opacity-20 pointer-events-none">
        <div class="w-full h-full rounded-full border-[3px] border-white/40"></div>
      </div>
    </div>
  </div>

  <!-- ===== Horizontal · com photo ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Horizontal · com photo</p>
    <div class="bg-primary-100 flex items-center overflow-hidden rounded-sm w-[704px]">
      <div class="aspect-square flex flex-col items-center justify-center overflow-hidden self-stretch shrink-0">
        <img src="https://picsum.photos/seed/bd-hp/400/400" alt="" class="w-full h-full object-cover">
      </div>
      <div class="flex flex-1 flex-col items-start justify-center min-w-0">
        <div class="flex flex-col gap-4 items-start justify-center pb-4 pt-8 px-8 text-primary-600 w-full">
          <p class="font-display font-bold text-headline-md leading-9 w-full">
            Lorem ipsum dolor sit amet consectetur.
          </p>
          <p class="font-body text-body-lg w-full">
            Lorem ipsum dolor sit amet consectetur. Risus eget nulla est sem eget sem integer facilisi tellus.
          </p>
        </div>
        <div class="flex flex-col items-start pb-8 pt-4 px-8 w-full">
          <a href="#" class="bg-primary-600 inline-flex gap-3 items-center justify-center pl-5 pr-6 py-3 rounded-full text-white hover:bg-secondary-950 transition-colors font-body font-bold text-body-lg">
            <svg class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
            Acessar material
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- ===== Horizontal · sem photo (gradient) ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Horizontal · sem photo</p>
    <div class="relative bg-gradient-to-b flex items-center from-primary-600 to-secondary-950 overflow-hidden rounded-sm w-[704px]">
      <div class="flex flex-1 flex-col items-start min-w-0">
        <div class="flex flex-col gap-4 items-start justify-center pb-4 pt-8 px-8 text-white w-full">
          <p class="font-display font-bold text-headline-lg leading-10 w-full">
            Lorem ipsum dolor sit amet consectetur.
          </p>
          <p class="font-body text-body-lg w-full">
            Lorem ipsum dolor sit amet consectetur. Risus eget nulla est sem eget sem integer facilisi tellus.
          </p>
        </div>
        <div class="flex flex-col h-24 items-start pb-8 pt-4 px-8 w-full">
          <a href="#" class="bg-white inline-flex gap-3 items-center justify-center pl-5 pr-6 py-3 rounded-full text-primary-600 hover:bg-neutral-50 transition-colors font-body font-bold text-body-lg">
            <svg class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
            Acessar material
          </a>
        </div>
      </div>
      <!-- Decoração Informa Orbit -->
      <div class="absolute bottom-0 right-0 w-[240px] h-[240px] opacity-20 pointer-events-none">
        <div class="w-full h-full rounded-full border-[3px] border-white/40"></div>
      </div>
    </div>
  </div>

</div>
