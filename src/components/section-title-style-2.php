<?php
/**
 * Componente: Section Title / Style 2
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=552-5123
 * Variantes: color (Ultramarine|Sky|Indigo|Lavander|Coral|Saffron|Carbon|White|Mint Dark) × state (Enabled|Hovered) = 18
 *
 * Variante alternativa do Section Title. Diferente do Style 1 (que tem
 * 3 bullets + linha grafism), Style 2 é minimalista:
 *   - Linha horizontal h-px full-width na cor da variante
 *   - Container h-72 com título Aleo Bold 28/36 CENTRALIZADO
 *
 * Cor hovered = mesma cor com 80% opacity (visualmente mais clara).
 *
 * COR → token mapeado:
 *   Ultramarine → secondary-950 (#003cb2)
 *   Sky         → secondary-500 (#28b4ff)
 *   Indigo      → primary-600 (#024)
 *   Lavander    → lavander (#9423fc)
 *   Coral       → coral (#ff547c)
 *   Saffron     → saffron (#b05223)
 *   Mint Dark   → mint (#00786e)
 *   Carbon      → neutral-950 (#283857)
 *   White       → white (precisa de bg escuro)
 *
 * Tokens: text-{cor} · bg-{cor} · text-headline-md (28/36) · font-display
 */
?>
<div class="space-y-10">

  <!-- Ultramarine -->
  <div class="flex flex-col items-center pt-10 w-full">
    <div class="flex flex-col gap-2 items-start max-w-screen-xl w-full px-4">
      <div class="flex items-center w-full">
        <div class="flex-1 h-px bg-secondary-950"></div>
      </div>
      <div class="flex h-[72px] items-center w-full">
        <h2 class="flex-1 text-center font-display font-bold text-headline-md text-secondary-950">Section Title — Ultramarine</h2>
      </div>
    </div>
  </div>

  <!-- Sky -->
  <div class="flex flex-col items-center pt-10 w-full">
    <div class="flex flex-col gap-2 items-start max-w-screen-xl w-full px-4">
      <div class="flex items-center w-full">
        <div class="flex-1 h-px bg-secondary-500"></div>
      </div>
      <div class="flex h-[72px] items-center w-full">
        <h2 class="flex-1 text-center font-display font-bold text-headline-md text-secondary-500">Section Title — Sky</h2>
      </div>
    </div>
  </div>

  <!-- Indigo -->
  <div class="flex flex-col items-center pt-10 w-full">
    <div class="flex flex-col gap-2 items-start max-w-screen-xl w-full px-4">
      <div class="flex items-center w-full">
        <div class="flex-1 h-px bg-primary-600"></div>
      </div>
      <div class="flex h-[72px] items-center w-full">
        <h2 class="flex-1 text-center font-display font-bold text-headline-md text-primary-600">Section Title — Indigo</h2>
      </div>
    </div>
  </div>

  <!-- Lavander -->
  <div class="flex flex-col items-center pt-10 w-full">
    <div class="flex flex-col gap-2 items-start max-w-screen-xl w-full px-4">
      <div class="flex items-center w-full">
        <div class="flex-1 h-px bg-lavander"></div>
      </div>
      <div class="flex h-[72px] items-center w-full">
        <h2 class="flex-1 text-center font-display font-bold text-headline-md text-lavander">Section Title — Lavander</h2>
      </div>
    </div>
  </div>

  <!-- Coral -->
  <div class="flex flex-col items-center pt-10 w-full">
    <div class="flex flex-col gap-2 items-start max-w-screen-xl w-full px-4">
      <div class="flex items-center w-full">
        <div class="flex-1 h-px bg-coral"></div>
      </div>
      <div class="flex h-[72px] items-center w-full">
        <h2 class="flex-1 text-center font-display font-bold text-headline-md text-coral">Section Title — Coral</h2>
      </div>
    </div>
  </div>

  <!-- Saffron -->
  <div class="flex flex-col items-center pt-10 w-full">
    <div class="flex flex-col gap-2 items-start max-w-screen-xl w-full px-4">
      <div class="flex items-center w-full">
        <div class="flex-1 h-px bg-saffron"></div>
      </div>
      <div class="flex h-[72px] items-center w-full">
        <h2 class="flex-1 text-center font-display font-bold text-headline-md text-saffron">Section Title — Saffron</h2>
      </div>
    </div>
  </div>

  <!-- Carbon -->
  <div class="flex flex-col items-center pt-10 w-full">
    <div class="flex flex-col gap-2 items-start max-w-screen-xl w-full px-4">
      <div class="flex items-center w-full">
        <div class="flex-1 h-px bg-neutral-950"></div>
      </div>
      <div class="flex h-[72px] items-center w-full">
        <h2 class="flex-1 text-center font-display font-bold text-headline-md text-neutral-950">Section Title — Carbon</h2>
      </div>
    </div>
  </div>

  <!-- Mint Dark -->
  <div class="flex flex-col items-center pt-10 w-full">
    <div class="flex flex-col gap-2 items-start max-w-screen-xl w-full px-4">
      <div class="flex items-center w-full">
        <div class="flex-1 h-px bg-mint"></div>
      </div>
      <div class="flex h-[72px] items-center w-full">
        <h2 class="flex-1 text-center font-display font-bold text-headline-md text-mint">Section Title — Mint Dark</h2>
      </div>
    </div>
  </div>

  <!-- White (sobre fundo escuro) -->
  <div class="bg-primary-600 -mx-6 px-6">
    <div class="flex flex-col items-center py-10 w-full">
      <div class="flex flex-col gap-2 items-start max-w-screen-xl w-full px-4">
        <div class="flex items-center w-full">
          <div class="flex-1 h-px bg-white"></div>
        </div>
        <div class="flex h-[72px] items-center w-full">
          <h2 class="flex-1 text-center font-display font-bold text-headline-md text-white">Section Title — White</h2>
        </div>
      </div>
    </div>
  </div>

</div>
