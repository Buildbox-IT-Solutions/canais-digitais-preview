<?php
/**
 * Componente: Relacionadas
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=3104-53873
 * Variantes: device (Desktop|Mobile) = 2
 *
 * Bloco "Relacionado" — lista de Link Buttons textuais com ícone "+"
 * antes de cada item. NÃO é uma lista de news cards thumbnails.
 *
 * Estrutura:
 *   - Top header: bar `bg-primary-600 h-2` + "Relacionado" Aleo Bold + divider à direita
 *   - List: items flex `<svg add> + Link Button (Aleo Bold)`
 *     - Desktop: text-title-lg (18/24)
 *     - Mobile: text-title-md (16/24 tracking 0.15)
 *   - Bottom: divider neutral-100
 *
 * Tokens: bg-primary-600 · bg-neutral-100 · text-primary-600 · text-secondary-950 ·
 *         text-title-lg · text-title-md · font-display · rounded-sm
 */
?>
<div class="space-y-10">

  <!-- ===== Desktop ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Desktop</p>
    <div class="flex flex-col items-start rounded-sm w-full max-w-[702px]">
      <!-- Top header -->
      <div class="flex items-start pb-2 pt-4 w-full">
        <div class="flex flex-col gap-2 items-start">
          <div class="bg-primary-600 h-0.5 w-full"></div>
          <p class="font-display font-bold text-title-md text-primary-600 whitespace-nowrap">Relacionado</p>
        </div>
        <div class="flex-1 h-px bg-neutral-100 self-center ml-4"></div>
      </div>
      <!-- List -->
      <div class="flex flex-col gap-2 items-start py-2 w-full">
        <div class="flex gap-2 items-start w-full">
          <svg class="size-6 shrink-0 text-secondary-950" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
          <a href="#" class="flex-1 font-display font-bold text-title-lg text-secondary-950 hover:underline">Lorem ipsum dolor sit amet consectetur adipiscing elit.</a>
        </div>
        <div class="flex gap-2 items-start w-full">
          <svg class="size-6 shrink-0 text-secondary-950" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
          <a href="#" class="flex-1 font-display font-bold text-title-lg text-secondary-950 hover:underline">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</a>
        </div>
        <div class="flex gap-2 items-start w-full">
          <svg class="size-6 shrink-0 text-secondary-950" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
          <a href="#" class="flex-1 font-display font-bold text-title-lg text-secondary-950 hover:underline">Ut enim ad minim veniam quis nostrud exercitation.</a>
        </div>
      </div>
      <!-- Bottom divider -->
      <div class="flex items-start pb-4 pt-2 w-full">
        <div class="flex-1 h-px bg-neutral-100"></div>
      </div>
    </div>
  </div>

  <!-- ===== Mobile (text size menor) ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Mobile</p>
    <div class="flex flex-col items-start rounded-sm w-full max-w-[375px]">
      <div class="flex items-start pb-2 pt-4 w-full">
        <div class="flex flex-col gap-2 items-start">
          <div class="bg-primary-600 h-0.5 w-full"></div>
          <p class="font-display font-bold text-title-md text-primary-600 whitespace-nowrap">Relacionado</p>
        </div>
        <div class="flex-1 h-px bg-neutral-100 self-center ml-4"></div>
      </div>
      <div class="flex flex-col gap-2 items-start py-2 w-full">
        <div class="flex gap-2 items-start w-full">
          <svg class="size-6 shrink-0 text-secondary-950" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
          <a href="#" class="flex-1 font-display font-bold text-title-md text-secondary-950 hover:underline">Lorem ipsum dolor sit amet consectetur.</a>
        </div>
        <div class="flex gap-2 items-start w-full">
          <svg class="size-6 shrink-0 text-secondary-950" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
          <a href="#" class="flex-1 font-display font-bold text-title-md text-secondary-950 hover:underline">Sed do eiusmod tempor incididunt ut labore.</a>
        </div>
        <div class="flex gap-2 items-start w-full">
          <svg class="size-6 shrink-0 text-secondary-950" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
          <a href="#" class="flex-1 font-display font-bold text-title-md text-secondary-950 hover:underline">Ut enim ad minim veniam quis nostrud.</a>
        </div>
      </div>
      <div class="flex items-start pb-4 pt-2 w-full">
        <div class="flex-1 h-px bg-neutral-100"></div>
      </div>
    </div>
  </div>

</div>
