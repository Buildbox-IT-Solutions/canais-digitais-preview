<?php
/**
 * Componente: Tag
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=567-9604
 * Variantes: Enabled (default) · Hovered (state via :hover)
 * Tokens usados: bg-primary-100 · text-primary-800 · hover:bg-neutral-50 · hover:text-secondary-950 · rounded-sm · text-title-sm · font-body
 *
 * Estrutura mínima:
 *   <span class="inline-flex items-center px-2 py-1 rounded-sm bg-primary-100 text-primary-800
 *                hover:bg-neutral-50 hover:text-secondary-950 transition-colors
 *                font-body font-semibold text-title-sm">
 *     Tag
 *   </span>
 *
 * No HTML produzido pelo WP, normalmente vira <a> em vez de <span> para
 * navegação por categoria/tema. As mesmas classes funcionam.
 */
?>
<div class="flex flex-wrap items-center gap-3">

  <span class="inline-flex items-center px-2 py-1 rounded-sm bg-primary-100 text-primary-800 hover:bg-neutral-50 hover:text-secondary-950 transition-colors font-body font-semibold text-title-sm">
    Tag
  </span>

  <span class="inline-flex items-center px-2 py-1 rounded-sm bg-primary-100 text-primary-800 hover:bg-neutral-50 hover:text-secondary-950 transition-colors font-body font-semibold text-title-sm">
    Sustentabilidade
  </span>

  <span class="inline-flex items-center px-2 py-1 rounded-sm bg-primary-100 text-primary-800 hover:bg-neutral-50 hover:text-secondary-950 transition-colors font-body font-semibold text-title-sm">
    Inovação
  </span>

  <!-- Forçando o estado Hovered para visualização -->
  <span class="inline-flex items-center px-2 py-1 rounded-sm bg-neutral-50 text-secondary-950 font-body font-semibold text-title-sm">
    Hovered (preview)
  </span>

</div>
