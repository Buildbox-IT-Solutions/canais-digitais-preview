<?php
/**
 * Componente: Link Button
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=662-11195
 * Variantes: state (enabled|hovered|disabled) × size (xl|lg|md|sm) = 12
 * Tokens usados: secondary-950 · secondary-900 · primary-100 · font-display · font-body
 *
 * Botão tipo link: só texto, sem borda, sem fundo. Funciona como <a> ou <button>
 * — ambos compartilham as mesmas classes.
 *
 * BASE:
 *   inline-flex items-center font-bold transition-colors
 *   text-secondary-950
 *   hover:text-secondary-900 hover:underline
 *   disabled:text-primary-100 disabled:cursor-not-allowed disabled:no-underline
 *
 * SIZE (tipografia e família vêm de text-* / font-*):
 *   XLarge  → text-title-xl  font-display  (22px Aleo Bold)
 *   Large   → text-title-lg  font-display  (18px Aleo Bold)
 *   Medium  → text-title-md  font-display  (16px Aleo Bold)
 *   Small   → text-label-lg  font-body     (14px Open Sans Bold)
 *
 * IMPORTANTE: apenas o Small usa Open Sans; os demais usam Aleo. Essa troca
 * de família é intencional no DS — labels pequenas em sans humanista, CTAs
 * grandes em serif elegante.
 */
?>
<div class="flex flex-wrap items-baseline gap-6">

  <!-- XLarge -->
  <a href="#" class="inline-flex items-center font-display font-bold transition-colors text-secondary-950 hover:text-secondary-900 hover:underline text-title-xl">
    Label XLarge
  </a>

  <!-- Large -->
  <a href="#" class="inline-flex items-center font-display font-bold transition-colors text-secondary-950 hover:text-secondary-900 hover:underline text-title-lg">
    Label Large
  </a>

  <!-- Medium -->
  <a href="#" class="inline-flex items-center font-display font-bold transition-colors text-secondary-950 hover:text-secondary-900 hover:underline text-title-md">
    Label Medium
  </a>

  <!-- Small -->
  <a href="#" class="inline-flex items-center font-body font-bold transition-colors text-secondary-950 hover:text-secondary-900 hover:underline text-label-lg">
    Label Small
  </a>

  <!-- Disabled (como <button>) -->
  <button type="button" disabled class="inline-flex items-center font-display font-bold transition-colors text-secondary-950 hover:text-secondary-900 hover:underline disabled:text-primary-100 disabled:cursor-not-allowed disabled:no-underline text-title-lg">
    Disabled
  </button>

</div>
