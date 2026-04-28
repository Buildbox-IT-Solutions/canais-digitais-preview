<?php
/**
 * Componente: Section Title / Style 1 (+ Building Block Style 1)
 * Figma Section Title: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=552-9108
 * Figma Building Block: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=550-9155
 *
 * Variantes cobertas:
 *   - 9 cores (Section Title / Style 1: Indigo | Ultramarine | Sky | Lavander | Coral | Saffron | Mint Dark | Carbon | White)
 *   - Uppercase (modifier textual)
 *   - Logo (brand slot substitui o título)
 *   - Sponsor (título + "Patrocínio" + brand slot à direita)
 *
 * Tokens usados: text-{cor}, text-headline-md, font-display, text-label-sm, text-neutral-900, rounded-sm
 *
 * ESTRUTURA CANÔNICA:
 *   <a class="group block text-{cor} w-full pt-10 px-4 no-underline hover:opacity-75 transition-opacity">
 *     <div class="max-w-screen-xl mx-auto space-y-2">
 *       <!-- grafism: 3 bullets CIRCULARES (o 1º sólido, os 2 seguintes com opacity 40%) + linha -->
 *       <div class="flex items-center gap-1 h-1.5">
 *         <div class="flex items-center gap-1">
 *           <span class="block size-[5px] rounded-full bg-current"></span>
 *           <span class="block size-[5px] rounded-full bg-current opacity-40"></span>
 *           <span class="block size-[5px] rounded-full bg-current opacity-40"></span>
 *         </div>
 *         <div class="flex-1 h-px bg-current"></div>
 *       </div>
 *       <!-- Título OU brand slot OU linha com sponsor — depende da variant -->
 *     </div>
 *   </a>
 *
 * HOVER: o Figma não declara efeito visual entre Enabled/Hovered (as duas
 * variants têm propriedades idênticas — a transição é só um placeholder
 * de prototype). Como o componente é clicável, adicionei `hover:opacity-75
 * transition-opacity` no <a> como feedback subtle e universal.
 *
 * BULLETS: 3 pontos de 5×5, redondos (rounded-full). O 1º em opacity 100%;
 * o 2º e 3º em opacity 40%. Extraído do Figma plugin API.
 *
 * BRAND SLOT: 180×48 com border 2px da cor atual. Container externo impõe
 * os limites (w-[180px] h-12 border-2); área útil interna para a imagem
 * real é max-h-10 max-w-[164px] — isso garante ~4px de respiro em cima/baixo
 * do slot (2px border + 2px slack do flex center). Dev substitui o placeholder:
 *
 *   <img src="..." alt="Marca X" class="max-h-10 max-w-[164px] object-contain">
 */
?>
<div class="space-y-10">

  <!-- ================================================================
       9 COLORS (variant Color)
       ================================================================ -->

  <!-- Indigo -->
  <a href="#" class="group block text-primary-600 w-full pt-10 px-4 no-underline hover:opacity-75 transition-opacity">
    <div class="max-w-screen-xl mx-auto space-y-2">
      <div class="flex items-center gap-1 h-1.5">
        <div class="flex items-center gap-1">
          <span class="block size-[5px] rounded-full bg-current"></span>
          <span class="block size-[5px] rounded-full bg-current opacity-40"></span>
          <span class="block size-[5px] rounded-full bg-current opacity-40"></span>
        </div>
        <div class="flex-1 h-px bg-current"></div>
      </div>
      <h2 class="text-headline-md font-display font-bold">Section Title — Indigo</h2>
    </div>
  </a>

  <!-- Ultramarine -->
  <a href="#" class="group block text-secondary-950 w-full pt-10 px-4 no-underline hover:opacity-75 transition-opacity">
    <div class="max-w-screen-xl mx-auto space-y-2">
      <div class="flex items-center gap-1 h-1.5">
        <div class="flex items-center gap-1">
          <span class="block size-[5px] rounded-full bg-current"></span>
          <span class="block size-[5px] rounded-full bg-current opacity-40"></span>
          <span class="block size-[5px] rounded-full bg-current opacity-40"></span>
        </div>
        <div class="flex-1 h-px bg-current"></div>
      </div>
      <h2 class="text-headline-md font-display font-bold">Section Title — Ultramarine</h2>
    </div>
  </a>

  <!-- Sky -->
  <a href="#" class="group block text-secondary-500 w-full pt-10 px-4 no-underline hover:opacity-75 transition-opacity">
    <div class="max-w-screen-xl mx-auto space-y-2">
      <div class="flex items-center gap-1 h-1.5">
        <div class="flex items-center gap-1">
          <span class="block size-[5px] rounded-full bg-current"></span>
          <span class="block size-[5px] rounded-full bg-current opacity-40"></span>
          <span class="block size-[5px] rounded-full bg-current opacity-40"></span>
        </div>
        <div class="flex-1 h-px bg-current"></div>
      </div>
      <h2 class="text-headline-md font-display font-bold">Section Title — Sky</h2>
    </div>
  </a>

  <!-- Lavander -->
  <a href="#" class="group block text-lavander w-full pt-10 px-4 no-underline hover:opacity-75 transition-opacity">
    <div class="max-w-screen-xl mx-auto space-y-2">
      <div class="flex items-center gap-1 h-1.5">
        <div class="flex items-center gap-1">
          <span class="block size-[5px] rounded-full bg-current"></span>
          <span class="block size-[5px] rounded-full bg-current opacity-40"></span>
          <span class="block size-[5px] rounded-full bg-current opacity-40"></span>
        </div>
        <div class="flex-1 h-px bg-current"></div>
      </div>
      <h2 class="text-headline-md font-display font-bold">Section Title — Lavander</h2>
    </div>
  </a>

  <!-- Coral -->
  <a href="#" class="group block text-coral w-full pt-10 px-4 no-underline hover:opacity-75 transition-opacity">
    <div class="max-w-screen-xl mx-auto space-y-2">
      <div class="flex items-center gap-1 h-1.5">
        <div class="flex items-center gap-1">
          <span class="block size-[5px] rounded-full bg-current"></span>
          <span class="block size-[5px] rounded-full bg-current opacity-40"></span>
          <span class="block size-[5px] rounded-full bg-current opacity-40"></span>
        </div>
        <div class="flex-1 h-px bg-current"></div>
      </div>
      <h2 class="text-headline-md font-display font-bold">Section Title — Coral</h2>
    </div>
  </a>

  <!-- Saffron -->
  <a href="#" class="group block text-saffron w-full pt-10 px-4 no-underline hover:opacity-75 transition-opacity">
    <div class="max-w-screen-xl mx-auto space-y-2">
      <div class="flex items-center gap-1 h-1.5">
        <div class="flex items-center gap-1">
          <span class="block size-[5px] rounded-full bg-current"></span>
          <span class="block size-[5px] rounded-full bg-current opacity-40"></span>
          <span class="block size-[5px] rounded-full bg-current opacity-40"></span>
        </div>
        <div class="flex-1 h-px bg-current"></div>
      </div>
      <h2 class="text-headline-md font-display font-bold">Section Title — Saffron</h2>
    </div>
  </a>

  <!-- Mint Dark -->
  <a href="#" class="group block text-mint w-full pt-10 px-4 no-underline hover:opacity-75 transition-opacity">
    <div class="max-w-screen-xl mx-auto space-y-2">
      <div class="flex items-center gap-1 h-1.5">
        <div class="flex items-center gap-1">
          <span class="block size-[5px] rounded-full bg-current"></span>
          <span class="block size-[5px] rounded-full bg-current opacity-40"></span>
          <span class="block size-[5px] rounded-full bg-current opacity-40"></span>
        </div>
        <div class="flex-1 h-px bg-current"></div>
      </div>
      <h2 class="text-headline-md font-display font-bold">Section Title — Mint Dark</h2>
    </div>
  </a>

  <!-- Carbon -->
  <a href="#" class="group block text-neutral-950 w-full pt-10 px-4 no-underline hover:opacity-75 transition-opacity">
    <div class="max-w-screen-xl mx-auto space-y-2">
      <div class="flex items-center gap-1 h-1.5">
        <div class="flex items-center gap-1">
          <span class="block size-[5px] rounded-full bg-current"></span>
          <span class="block size-[5px] rounded-full bg-current opacity-40"></span>
          <span class="block size-[5px] rounded-full bg-current opacity-40"></span>
        </div>
        <div class="flex-1 h-px bg-current"></div>
      </div>
      <h2 class="text-headline-md font-display font-bold">Section Title — Carbon</h2>
    </div>
  </a>

  <!-- White — requer bg escuro -->
  <div class="bg-primary-600 -mx-6 px-6">
    <a href="#" class="group block text-white w-full pt-10 pb-10 px-4 no-underline hover:opacity-75 transition-opacity">
      <div class="max-w-screen-xl mx-auto space-y-2">
        <div class="flex items-center gap-1 h-1.5">
          <div class="flex items-center gap-1">
            <span class="block size-[5px] rounded-full bg-current"></span>
            <span class="block size-[5px] rounded-full bg-current opacity-40"></span>
            <span class="block size-[5px] rounded-full bg-current opacity-40"></span>
          </div>
          <div class="flex-1 h-px bg-current"></div>
        </div>
        <h2 class="text-headline-md font-display font-bold">Section Title — White (sobre fundo escuro)</h2>
      </div>
    </a>
  </div>

  <!-- ================================================================
       BUILDING BLOCK VARIANTS (Uppercase · Logo · Sponsor)
       Usam cor Indigo conforme o Figma. Cor intercambiável via text-*.
       ================================================================ -->

  <div class="pt-6 border-t border-neutral-100">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider mb-4">Building Block variants</p>
  </div>

  <!-- Uppercase=On -->
  <a href="#" class="group block text-primary-600 w-full pt-10 px-4 no-underline hover:opacity-75 transition-opacity">
    <div class="max-w-screen-xl mx-auto space-y-2">
      <div class="flex items-center gap-1 h-1.5">
        <div class="flex items-center gap-1">
          <span class="block size-[5px] rounded-full bg-current"></span>
          <span class="block size-[5px] rounded-full bg-current opacity-40"></span>
          <span class="block size-[5px] rounded-full bg-current opacity-40"></span>
        </div>
        <div class="flex-1 h-px bg-current"></div>
      </div>
      <h2 class="text-headline-md font-display font-bold uppercase">Section Title — Uppercase</h2>
    </div>
  </a>

  <!-- Logo=On — brand slot SUBSTITUI o título -->
  <a href="#" class="group block text-primary-600 w-full pt-10 px-4 no-underline hover:opacity-75 transition-opacity">
    <div class="max-w-screen-xl mx-auto space-y-2">
      <div class="flex items-center gap-1 h-1.5">
        <div class="flex items-center gap-1">
          <span class="block size-[5px] rounded-full bg-current"></span>
          <span class="block size-[5px] rounded-full bg-current opacity-40"></span>
          <span class="block size-[5px] rounded-full bg-current opacity-40"></span>
        </div>
        <div class="flex-1 h-px bg-current"></div>
      </div>
      <!-- Brand slot — Dev substitui pela <img src="..."> da marca real -->
      <div class="inline-flex items-center justify-center w-[180px] h-12 rounded-sm border-2 border-current">
        <span class="inline-flex items-center justify-center max-h-10 max-w-[164px] font-body font-bold text-label-lg">LOGO</span>
      </div>
    </div>
  </a>

  <!-- Sponsor=On — título + "Patrocínio" label + brand slot à direita -->
  <a href="#" class="group block text-primary-600 w-full pt-10 px-4 no-underline hover:opacity-75 transition-opacity">
    <div class="max-w-screen-xl mx-auto space-y-2">
      <div class="flex items-center gap-1 h-1.5">
        <div class="flex items-center gap-1">
          <span class="block size-[5px] rounded-full bg-current"></span>
          <span class="block size-[5px] rounded-full bg-current opacity-40"></span>
          <span class="block size-[5px] rounded-full bg-current opacity-40"></span>
        </div>
        <div class="flex-1 h-px bg-current"></div>
      </div>
      <div class="flex items-center gap-4">
        <h2 class="text-headline-md font-display font-bold flex-1">Section Title — Sponsor</h2>
        <div class="flex items-center gap-4">
          <span class="text-label-sm text-neutral-900 font-body font-semibold">Patrocínio</span>
          <div class="inline-flex items-center justify-center w-[180px] h-12 rounded-sm border-2 border-current">
            <span class="inline-flex items-center justify-center max-h-10 max-w-[164px] font-body font-bold text-label-lg">LOGO</span>
          </div>
        </div>
      </div>
    </div>
  </a>

</div>
