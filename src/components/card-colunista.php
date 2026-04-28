<?php
/**
 * Componente: Card Colunista
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1352-23176
 * Variantes: 2 (Enabled · Hovered)
 *
 * Card de colunista com 2 áreas verticais:
 *   1. Photo (104×104 squared rounded-sm) + nome (Aleo Bold 18px text-secondary-950)
 *      + role description (text-body-md text-neutral-900)
 *   2. Lead/citação na parte inferior (h-96, padding 16, Aleo Bold 16/24
 *      tracking 0.15 text-primary-600)
 *
 * Estados:
 *   Enabled → bg-white border-neutral-100
 *   Hovered → bg-neutral-50 border-primary-600
 *
 * Width: 392px (max 496, min 392).
 *
 * NOTA: foto é SQUARED (rounded-sm 4px), NÃO circular. Author Name é
 * secondary-950 (link button), NÃO primary-600.
 *
 * Tokens: bg-white · bg-neutral-50 · border-neutral-100 · border-primary-600 ·
 *         text-secondary-950 · text-primary-600 · text-neutral-900 · rounded-sm ·
 *         text-title-lg · text-title-md · text-body-md · font-display · font-body
 */
?>
<div class="space-y-10">

  <!-- ===== Enabled ===== -->
  <article class="group bg-white border border-neutral-100 flex flex-col items-start justify-center max-w-[496px] min-w-[392px] w-[392px] rounded-sm overflow-hidden">
    <!-- Container 1: photo + name/role -->
    <div class="flex items-center w-full">
      <div class="flex items-center p-3">
        <div class="border border-neutral-50 rounded-sm size-[104px] overflow-hidden">
          <img src="https://i.pravatar.cc/208?img=14" alt="Foto do colunista" class="w-full h-full object-cover">
        </div>
      </div>
      <div class="flex flex-col flex-1 justify-center min-w-0 pl-2 pr-4 py-4">
        <p class="font-display font-bold text-title-lg text-secondary-950 truncate w-full">
          <a href="#" class="hover:underline">Author Name</a>
        </p>
        <p class="font-body text-body-md text-neutral-900 truncate w-full">Role description</p>
      </div>
    </div>
    <!-- Container 2: citação/lead -->
    <div class="flex flex-col items-start justify-end h-24 p-4 w-full">
      <p class="font-display font-bold text-title-md text-primary-600 line-clamp-3 w-full">
        Lorem ipsum dolor sit amet consectetur. Imperdiet tincidunt lectus vestibulum sit aenean at. Quis neque nunc aliquam donec in duis et ipsum amet.
      </p>
    </div>
  </article>

  <!-- ===== Hovered (preview forçado) ===== -->
  <article class="bg-neutral-50 border border-primary-600 flex flex-col items-start justify-center max-w-[496px] min-w-[392px] w-[392px] rounded-sm overflow-hidden">
    <div class="flex items-center w-full">
      <div class="flex items-center p-3">
        <div class="border border-neutral-50 rounded-sm size-[104px] overflow-hidden">
          <img src="https://i.pravatar.cc/208?img=33" alt="Foto do colunista" class="w-full h-full object-cover">
        </div>
      </div>
      <div class="flex flex-col flex-1 justify-center min-w-0 pl-2 pr-4 py-4">
        <p class="font-display font-bold text-title-lg text-secondary-950 truncate w-full">
          <a href="#" class="hover:underline">Author Name</a>
        </p>
        <p class="font-body text-body-md text-neutral-900 truncate w-full">Role description</p>
      </div>
    </div>
    <div class="flex flex-col items-start justify-end h-24 p-4 w-full">
      <p class="font-display font-bold text-title-md text-primary-600 line-clamp-3 w-full">
        Lorem ipsum dolor sit amet consectetur. Imperdiet tincidunt lectus vestibulum sit aenean at. Quis neque nunc aliquam donec in duis et ipsum amet.
      </p>
    </div>
  </article>

</div>
