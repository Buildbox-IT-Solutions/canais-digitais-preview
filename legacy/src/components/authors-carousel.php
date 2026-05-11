<?php
/**
 * Componente: Authors Carousel (Desktop + Mobile)
 * Figma Desktop: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=3454-13759
 * Figma Mobile:  https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=3467-39282
 * Variantes: 6 (desktop) + 3 (mobile)
 *
 * Carrossel horizontal de Author Summary cards. Cada card é um
 * `Author Summary` 496w (desktop) que rola dentro do container 704w.
 *
 * Anatomia desktop:
 *   - Container w-704 flex items-center
 *   - cards-list flex gap-4 max-w-704 overflow-x-auto items-start
 *   - 3+ cards Author Summary (cada 496w) lado a lado
 *   - Nav overlay absolute (left/right) com gradient white + Icon Button
 *     bg-primary-600 navigate_before/next size-32 (visível apenas no Hovered)
 *
 * Anatomia mobile:
 *   - Single column de Author Summary cards stacked
 *
 * Tokens: bg-white · border-primary-100 · bg-primary-600 · rounded-sm ·
 *         font-display · font-body
 */
?>
<div class="space-y-10 w-full">

  <?php get_template_part('components/_partials/section-title', null, [
    'label' => 'Nossos especialistas', 'color' => 'primary-600', 'href' => '#', 'uppercase' => 'off',
  ]); ?>

  <!-- ===== Desktop carousel ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider px-4">Desktop · 3 cards visíveis</p>
    <div class="group relative w-full max-w-[704px] mx-auto" data-component="carousel">

      <!-- Cards list -->
      <div class="flex gap-4 items-start max-w-[704px] overflow-x-auto pb-2 scroll-smooth" data-el="carousel-track">

        <article class="bg-white border border-primary-100 flex flex-col items-start max-w-[704px] min-w-[496px] rounded-sm shrink-0 w-[496px]">
          <div class="flex items-start justify-between w-full">
            <div class="flex flex-col items-start p-4">
              <div class="rounded-sm size-[80px] overflow-hidden">
                <img src="https://i.pravatar.cc/160?img=1" alt="Foto do autor" class="w-full h-full object-cover">
              </div>
            </div>
            <div class="flex flex-1 flex-col items-start justify-center pr-4 py-4 self-stretch">
              <div class="flex gap-1 items-center w-full">
                <p class="font-display font-bold text-title-lg text-neutral-700 truncate">Por</p>
                <a href="#" class="flex-1 font-display font-bold text-title-lg text-secondary-950 hover:underline truncate">Courtney Henry</a>
              </div>
              <p class="font-body text-body-md text-neutral-900 truncate w-full">Especialista Food Connection</p>
            </div>
          </div>
          <div class="flex flex-col items-start pb-4 px-4 w-full">
            <p class="font-body text-body-md text-neutral-900 truncate w-full">
              Lorem ipsum dolor sit amet consectetur. Malesuada lobortis et suscipit erat. Convallis ultrices et iaculis blandit aenean suscipit. Faucibus nulla blandit gravida tellus sagittis egestas. Et c...
              <span class="font-body font-bold">Ver mais</span>
            </p>
          </div>
          <div class="flex flex-col items-start w-full">
            <?php get_template_part('components/_partials/divider', null, [ 'orientation' => 'horizontal' ]); ?>
            <div class="flex gap-4 items-center justify-end px-4 py-2 w-full">
              <p class="font-body font-bold text-label-md text-neutral-700 uppercase tracking-wider whitespace-nowrap">Siga nas Redes</p>
              <div class="flex gap-1 items-center">
                <a href="#" aria-label="LinkedIn" class="inline-flex items-center justify-center size-8 rounded-full text-primary-600 hover:bg-neutral-50">
                  <svg class="size-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="#" aria-label="X / Twitter" class="inline-flex items-center justify-center size-8 rounded-full text-primary-600 hover:bg-neutral-50">
                  <svg class="size-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="#" aria-label="Instagram" class="inline-flex items-center justify-center size-8 rounded-full text-primary-600 hover:bg-neutral-50">
                  <svg class="size-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </article>

        <article class="bg-white border border-primary-100 flex flex-col items-start max-w-[704px] min-w-[496px] rounded-sm shrink-0 w-[496px]">
          <div class="flex items-start justify-between w-full">
            <div class="flex flex-col items-start p-4">
              <div class="rounded-sm size-[80px] overflow-hidden">
                <img src="https://i.pravatar.cc/160?img=2" alt="Foto do autor" class="w-full h-full object-cover">
              </div>
            </div>
            <div class="flex flex-1 flex-col items-start justify-center pr-4 py-4 self-stretch">
              <div class="flex gap-1 items-center w-full">
                <p class="font-display font-bold text-title-lg text-neutral-700 truncate">Por</p>
                <a href="#" class="flex-1 font-display font-bold text-title-lg text-secondary-950 hover:underline truncate">Devon Lane</a>
              </div>
              <p class="font-body text-body-md text-neutral-900 truncate w-full">Especialista Food Connection</p>
            </div>
          </div>
          <div class="flex flex-col items-start pb-4 px-4 w-full">
            <p class="font-body text-body-md text-neutral-900 truncate w-full">
              Lorem ipsum dolor sit amet consectetur. Malesuada lobortis et suscipit erat. Convallis ultrices et iaculis blandit aenean suscipit...
              <span class="font-body font-bold">Ver mais</span>
            </p>
          </div>
        </article>

        <article class="bg-white border border-primary-100 flex flex-col items-start max-w-[704px] min-w-[496px] rounded-sm shrink-0 w-[496px]">
          <div class="flex items-start justify-between w-full">
            <div class="flex flex-col items-start p-4">
              <div class="rounded-sm size-[80px] overflow-hidden">
                <img src="https://i.pravatar.cc/160?img=3" alt="Foto do autor" class="w-full h-full object-cover">
              </div>
            </div>
            <div class="flex flex-1 flex-col items-start justify-center pr-4 py-4 self-stretch">
              <div class="flex gap-1 items-center w-full">
                <p class="font-display font-bold text-title-lg text-neutral-700 truncate">Por</p>
                <a href="#" class="flex-1 font-display font-bold text-title-lg text-secondary-950 hover:underline truncate">Marvin McKinney</a>
              </div>
              <p class="font-body text-body-md text-neutral-900 truncate w-full">Especialista Food Connection</p>
            </div>
          </div>
          <div class="flex flex-col items-start pb-4 px-4 w-full">
            <p class="font-body text-body-md text-neutral-900 truncate w-full">
              Lorem ipsum dolor sit amet consectetur. Malesuada lobortis et suscipit erat. Convallis ultrices et iaculis...
              <span class="font-body font-bold">Ver mais</span>
            </p>
          </div>
        </article>

      </div>

      <!-- Nav buttons (visíveis no Hovered no Figma — preview com bg primary-600) -->
      <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
        <div class="bg-gradient-to-r from-white to-transparent w-12 h-full flex items-center pl-2 pointer-events-auto">
          <button type="button" aria-label="Anterior" data-action="carousel-prev" class="bg-primary-600 inline-flex items-center justify-center p-2 rounded-full text-white hover:bg-secondary-950 transition-colors">
            <svg class="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
        </div>
      </div>
      <div class="absolute inset-y-0 right-0 flex items-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
        <div class="bg-gradient-to-l from-white to-transparent w-12 h-full flex items-center pr-2 justify-end pointer-events-auto">
          <button type="button" aria-label="Próximo" data-action="carousel-next" class="bg-primary-600 inline-flex items-center justify-center p-2 rounded-full text-white hover:bg-secondary-950 transition-colors">
            <svg class="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </div>

    </div>
  </div>

</div>
