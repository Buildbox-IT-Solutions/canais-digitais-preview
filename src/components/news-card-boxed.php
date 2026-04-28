<?php
/**
 * Componente: News Card 2.0 / Boxed
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=3862-28403
 * Variantes: color (Mint | Saffron) × showSponsor (true | false) = 4
 *
 * Card com imagem de fundo fullbleed + overlay escuro na base com
 * título branco. Badge sponsor no canto superior direito (opcional).
 * Borda inferior 4px na cor da variante.
 *
 * Anatomia:
 *   - Container: rounded-sm overflow-hidden, border-b-4 border-{color}
 *   - Background: imagem absolute inset-0 object-cover
 *   - Sponsor badge (top-right): bg-white rounded-sm p-2 com
 *     "Conteúdo Patrocinado" label-sm + "Company Name" title-md link
 *   - Content overlay (bottom): bg-black/60 px-4 py-3
 *   - Title: Aleo Bold title-md (16/24 tracking 0.15) text-white
 *
 * Tokens: bg-black/60 · bg-white · text-white · text-neutral-900 ·
 *         text-secondary-950 · border-mint · border-saffron ·
 *         text-title-md · text-label-sm · font-display · font-body ·
 *         rounded-sm
 *
 * COMPOSIÇÃO via partials: sponsor-line (inline variant)
 */
?>
<div class="space-y-10">

  <!-- ===== Mint + Sponsor ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Mint · com Sponsor</p>
    <a href="#" class="group relative flex flex-col justify-end rounded-sm overflow-hidden border-b-4 border-mint w-[376px] h-[251px]">
      <img src="https://picsum.photos/seed/boxed-mint/752/502" alt="Capa" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
      <!-- Sponsor badge (top-right) -->
      <div class="absolute top-2 right-2 bg-white rounded-sm p-2 flex flex-col gap-1 items-end z-10">
        <p class="font-body font-semibold text-label-sm text-neutral-900">Conteúdo Patrocinado</p>
        <p class="font-display font-bold text-title-md text-secondary-950">Company Name</p>
      </div>
      <!-- Content overlay -->
      <div class="relative bg-black/60 px-4 py-3 w-full z-10">
        <h3 class="font-display font-bold text-title-md text-white leading-snug line-clamp-3">
          Lorem ipsum dolor sit amet consectetur. Augue amet pellentesque nisl donec dictum.
        </h3>
      </div>
    </a>
  </div>

  <!-- ===== Saffron + Sponsor ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Saffron · com Sponsor</p>
    <a href="#" class="group relative flex flex-col justify-end rounded-sm overflow-hidden border-b-4 border-saffron w-[376px] h-[251px]">
      <img src="https://picsum.photos/seed/boxed-saffron/752/502" alt="Capa" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
      <div class="absolute top-2 right-2 bg-white rounded-sm p-2 flex flex-col gap-1 items-end z-10">
        <p class="font-body font-semibold text-label-sm text-neutral-900">Conteúdo Patrocinado</p>
        <p class="font-display font-bold text-title-md text-secondary-950">Company Name</p>
      </div>
      <div class="relative bg-black/60 px-4 py-3 w-full z-10">
        <h3 class="font-display font-bold text-title-md text-white leading-snug line-clamp-3">
          Nec morbi odio lacus in pulvinar in id tellus auctor. Non justo leo fames sed velit.
        </h3>
      </div>
    </a>
  </div>

  <!-- ===== Mint · sem Sponsor ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Mint · sem Sponsor</p>
    <a href="#" class="group relative flex flex-col justify-end rounded-sm overflow-hidden border-b-4 border-mint w-[376px] h-[251px]">
      <img src="https://picsum.photos/seed/boxed-nospon/752/502" alt="Capa" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
      <div class="relative bg-black/60 px-4 py-3 w-full z-10">
        <h3 class="font-display font-bold text-title-md text-white leading-snug line-clamp-3">
          Lorem ipsum dolor sit amet consectetur. Augue amet pellentesque nisl donec dictum.
        </h3>
      </div>
    </a>
  </div>

</div>
