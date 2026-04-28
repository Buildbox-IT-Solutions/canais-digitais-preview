<?php
/**
 * Componente: Loading Button [1.0]
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=71-6026
 * Variantes: type (filled) × state (enabled|hovered|disabled) = 3
 * Tokens usados: primary-600 · secondary-950 · neutral-200 · rounded-full
 *
 * Pill 72×48 com spinner circular branco animado, sem texto. Usado quando uma
 * ação Filled está em progresso (ex: salvando, enviando). Mesma paleta do
 * Filled do Button [1.1] e mesma altura (h-12), apenas mais compacto.
 *
 * BASE:
 *   inline-flex items-center justify-center rounded-full h-12 px-6
 *   bg-primary-600 hover:bg-secondary-950 disabled:bg-neutral-200
 *   transition-colors disabled:cursor-not-allowed
 *
 * O spinner é uma SVG inline com `animate-spin` (Tailwind) que herda
 * `currentColor` do button. O button tem `text-white` pra cor herdada.
 *
 * Acessibilidade: usa role="status" + aria-live="polite" + aria-label="Carregando".
 * Substitui o conteúdo visível do <button> normal por feedback de progresso.
 */
?>
<div class="flex flex-wrap items-center gap-4">

  <!-- Enabled -->
  <button type="button" disabled aria-busy="true" aria-label="Carregando" class="inline-flex items-center justify-center rounded-full h-12 px-6 bg-primary-600 text-white hover:bg-secondary-950 transition-colors">
    <svg class="size-6 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-opacity="0.25" stroke-width="3"/>
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    </svg>
  </button>

  <!-- Hovered (forçado pra preview) -->
  <button type="button" disabled aria-busy="true" aria-label="Carregando" class="inline-flex items-center justify-center rounded-full h-12 px-6 bg-secondary-950 text-white transition-colors">
    <svg class="size-6 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-opacity="0.25" stroke-width="3"/>
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    </svg>
  </button>

  <!-- Disabled -->
  <button type="button" disabled aria-busy="true" aria-label="Carregando" class="inline-flex items-center justify-center rounded-full h-12 px-6 bg-neutral-200 text-white cursor-not-allowed transition-colors">
    <svg class="size-6 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-opacity="0.25" stroke-width="3"/>
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    </svg>
  </button>

</div>
