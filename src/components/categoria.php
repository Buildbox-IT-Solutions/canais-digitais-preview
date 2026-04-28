<?php
/**
 * Componente: Categoria
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=71-6699
 * Variantes: state (enabled|hovered) × style (7 cores) × chip (on|off) = 28
 * Tokens usados: bg-white · bg-neutral-50 (hover) · text-{coral|mint|saffron|lavander|secondary-950|secondary-500|primary-600}
 *               · text-body-sm · font-body · rounded-sm
 *
 * Etiqueta de editoria/categoria. Existe em duas formas:
 *   - Chip=On  → pill colorido com bg branco e text colorido (padrão em cards)
 *   - Chip=Off → só o texto solto, sem container (uso "inline" em headers)
 *
 * 7 STYLES (mapeados pra classes de cor):
 *   Coral       → text-coral        (#FF547C)
 *   Mint        → text-mint         (#00786E)
 *   Saffron     → text-saffron      (#B05223)
 *   Lavander    → text-lavander     (#9423FC)
 *   Ultramarine → text-secondary-950 (#003CB2)
 *   Sky         → text-secondary-500 (#28B4FF)
 *   Indigo      → text-primary-600  (#002244)
 *
 * BASE (Chip=On):
 *   inline-flex items-center px-2 py-1 rounded-sm bg-white
 *   hover:bg-neutral-50 transition-colors
 *   text-body-sm font-body font-semibold text-{cor}
 *
 * BASE (Chip=Off):
 *   text-body-sm font-body font-semibold text-{cor}
 *
 * No HTML produzido pelo WP, normalmente vira <a href="/categoria/...">.
 */
?>
<div class="space-y-6">

  <!-- ===== Chip=On — todas as 7 cores ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Chip = On</p>
    <div class="flex flex-wrap items-center gap-2">

      <span class="inline-flex items-center px-2 py-1 rounded-sm bg-white hover:bg-neutral-50 transition-colors text-body-sm font-body font-semibold text-coral">
        Coral
      </span>
      <span class="inline-flex items-center px-2 py-1 rounded-sm bg-white hover:bg-neutral-50 transition-colors text-body-sm font-body font-semibold text-mint">
        Mint
      </span>
      <span class="inline-flex items-center px-2 py-1 rounded-sm bg-white hover:bg-neutral-50 transition-colors text-body-sm font-body font-semibold text-saffron">
        Saffron
      </span>
      <span class="inline-flex items-center px-2 py-1 rounded-sm bg-white hover:bg-neutral-50 transition-colors text-body-sm font-body font-semibold text-lavander">
        Lavander
      </span>
      <span class="inline-flex items-center px-2 py-1 rounded-sm bg-white hover:bg-neutral-50 transition-colors text-body-sm font-body font-semibold text-secondary-950">
        Ultramarine
      </span>
      <span class="inline-flex items-center px-2 py-1 rounded-sm bg-white hover:bg-neutral-50 transition-colors text-body-sm font-body font-semibold text-secondary-500">
        Sky
      </span>
      <span class="inline-flex items-center px-2 py-1 rounded-sm bg-white hover:bg-neutral-50 transition-colors text-body-sm font-body font-semibold text-primary-600">
        Indigo
      </span>

    </div>
  </div>

  <!-- ===== Chip=Off — só texto inline ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Chip = Off (inline)</p>
    <div class="flex flex-wrap items-center gap-x-6 gap-y-2">
      <span class="text-body-sm font-body font-semibold text-coral">Coral</span>
      <span class="text-body-sm font-body font-semibold text-mint">Mint</span>
      <span class="text-body-sm font-body font-semibold text-saffron">Saffron</span>
      <span class="text-body-sm font-body font-semibold text-lavander">Lavander</span>
      <span class="text-body-sm font-body font-semibold text-secondary-950">Ultramarine</span>
      <span class="text-body-sm font-body font-semibold text-secondary-500">Sky</span>
      <span class="text-body-sm font-body font-semibold text-primary-600">Indigo</span>
    </div>
  </div>

</div>
