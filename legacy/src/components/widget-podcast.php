<?php
/**
 * Componente: Widget / Podcast + Widget Item / Podcast
 * Figma Widget: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=3074-48896
 * Figma Item:   https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=2769-24490
 * Variantes: 2 (Widget) + 8 (Widget Item Podcast)
 *
 * Widget de podcasts. Características:
 *   - bg-neutral-50 (#e9eaec) border-neutral-100 rounded-lg pb-2
 *   - w-496 (desktop)
 *   - Top: title "Podcasts" Aleo Bold 22/28 text-primary-600 com p-6 (desktop)
 *   - Items:
 *     - Patrocinado (1 primeiro): sub-card bg-white border rounded-lg, com PodcastImage 104 + categoria + título + Sponsor Line
 *     - Não-patrocinado (4 demais): flex gap-4 items-center px-6 py-3, com PodcastImage 104 + (categoria + título)
 *   - Footer:
 *     - Divider neutral-100
 *     - Button "Todos os episódios" + arrow_forward icon, ghost
 *
 * Tokens: bg-neutral-50 · bg-white · border-neutral-100 · text-primary-600 ·
 *         text-mint · text-title-xl · text-title-md · font-display · font-body
 *         · rounded-lg
 */
?>
<div class="space-y-10">

  <!-- ===== Desktop ===== -->
  <aside class="bg-neutral-50 border border-neutral-100 flex flex-col items-start min-w-[496px] overflow-hidden pb-2 rounded-lg w-[496px]">

    <!-- Top -->
    <div class="flex items-center p-6 w-full">
      <p class="flex-1 font-display font-bold text-title-xl text-primary-600 leading-7">Podcasts</p>
    </div>

    <!-- List -->
    <div class="flex flex-col items-start w-full">

      <!-- Item 1 — Patrocinado (sub-card branco) -->
      <div class="flex flex-col items-start justify-center min-w-[392px] overflow-hidden py-2 px-6 rounded-lg w-full">
        <div class="bg-white border border-neutral-100 flex flex-col items-start rounded-lg w-full">
          <div class="group flex items-center p-3 w-full">
            <div class="rounded-sm overflow-hidden size-[104px] shrink-0">
              <img src="https://picsum.photos/seed/wpc1/208/208" alt="Capa podcast" class="w-full h-full object-cover">
            </div>
            <div class="flex flex-1 flex-col gap-2 items-start min-w-0 px-4">
              <span class="font-body font-semibold text-label-md text-mint">Categoria</span>
              <p class="font-display font-bold text-title-md text-primary-600 group-hover:text-secondary-950 transition-colors line-clamp-3 w-full">
                Lorem ipsum dolor sit amet consectetur. Leo id donec magna elementum suspendisse dictum consequat.
              </p>
            </div>
          </div>
          <?php get_template_part('components/_partials/divider', null, [ 'orientation' => 'horizontal' ]); ?>
          <div class="flex flex-wrap gap-y-1 items-center justify-between px-4 py-3 w-full">
            <p class="font-body font-semibold text-label-sm text-neutral-900 whitespace-nowrap">Conteúdo Patrocinado</p>
            <a href="#" class="font-display font-bold text-title-md text-secondary-950 hover:underline whitespace-nowrap">Company Name</a>
          </div>
        </div>
      </div>

      <!-- Item 2 — Não-patrocinado (compacto) -->
      <div class="group flex gap-4 items-center min-w-[392px] py-3 px-6 w-full">
        <div class="rounded-sm overflow-hidden size-[104px] shrink-0">
          <img src="https://picsum.photos/seed/wpc2/208/208" alt="Capa podcast" class="w-full h-full object-cover">
        </div>
        <div class="flex flex-1 flex-col gap-2 items-start min-w-0">
          <span class="font-body font-semibold text-label-md text-mint">Categoria</span>
          <p class="font-display font-bold text-title-md text-primary-600 group-hover:text-secondary-950 transition-colors line-clamp-3 w-full">
            Lorem ipsum dolor sit amet consectetur. Leo id donec magna elementum suspendisse dictum consequat.
          </p>
        </div>
      </div>

      <!-- Item 3 -->
      <div class="group flex gap-4 items-center min-w-[392px] py-3 px-6 w-full">
        <div class="rounded-sm overflow-hidden size-[104px] shrink-0">
          <img src="https://picsum.photos/seed/wpc3/208/208" alt="Capa podcast" class="w-full h-full object-cover">
        </div>
        <div class="flex flex-1 flex-col gap-2 items-start min-w-0">
          <span class="font-body font-semibold text-label-md text-mint">Categoria</span>
          <p class="font-display font-bold text-title-md text-primary-600 group-hover:text-secondary-950 transition-colors line-clamp-3 w-full">
            Dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
          </p>
        </div>
      </div>

      <!-- Item 4 -->
      <div class="group flex gap-4 items-center min-w-[392px] py-3 px-6 w-full">
        <div class="rounded-sm overflow-hidden size-[104px] shrink-0">
          <img src="https://picsum.photos/seed/wpc4/208/208" alt="Capa podcast" class="w-full h-full object-cover">
        </div>
        <div class="flex flex-1 flex-col gap-2 items-start min-w-0">
          <span class="font-body font-semibold text-label-md text-mint">Categoria</span>
          <p class="font-display font-bold text-title-md text-primary-600 group-hover:text-secondary-950 transition-colors line-clamp-3 w-full">
            Ut enim ad minim veniam quis nostrud exercitation ullamco laboris.
          </p>
        </div>
      </div>

    </div>

    <!-- Divider -->
    <div class="flex flex-col items-start py-2 px-6 w-full">
      <?php get_template_part('components/_partials/divider', null, [ 'orientation' => 'horizontal' ]); ?>
    </div>

    <!-- Footer button -->
    <div class="flex flex-col items-start p-2 w-full">
      <a href="#" class="inline-flex gap-2 items-center justify-center px-5 pr-4 py-2 rounded-full text-primary-600 hover:bg-neutral-100 font-body font-bold text-body-lg">
        Todos os episódios
        <svg class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
      </a>
    </div>

  </aside>

</div>
