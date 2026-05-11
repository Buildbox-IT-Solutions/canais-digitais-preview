<?php
/**
 * Componente: Divider
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=56-6360
 * Variantes: horizontal (default) | vertical
 * Tokens usados: bg-neutral-100
 *
 * Uso:
 *   Horizontal: <div class="h-px w-full bg-neutral-100"></div>
 *   Vertical:   <div class="w-px h-full bg-neutral-100"></div>
 *
 * Para separador com espaçamento implícito, envelope num container com margin/padding.
 */
?>
<div class="space-y-6">

  <!-- Horizontal -->
  <div>
    <p class="text-label-sm text-neutral-700 mb-2">Horizontal</p>
    <div class="h-px w-full bg-neutral-100"></div>
  </div>

  <!-- Vertical -->
  <div>
    <p class="text-label-sm text-neutral-700 mb-2">Vertical</p>
    <div class="flex items-center gap-4 h-20">
      <span class="text-body-md text-primary-600">Item A</span>
      <div class="w-px h-full bg-neutral-100"></div>
      <span class="text-body-md text-primary-600">Item B</span>
      <div class="w-px h-full bg-neutral-100"></div>
      <span class="text-body-md text-primary-600">Item C</span>
    </div>
  </div>

</div>
