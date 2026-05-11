<?php
/**
 * Componente: Avatar
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=751-3445
 * Variantes: shape (squared|rounded) × state (enabled|hovered)
 * Tokens usados: rounded-sm (squared, 4px) · rounded-full (rounded) · bg-neutral-100 (placeholder) · bg-white/25 (hover overlay)
 *
 * Estrutura:
 *   <div class="relative inline-block group">
 *     <img class="block size-20 object-cover {{rounded-sm | rounded-full}}" src="..." alt="">
 *     <div class="absolute inset-0 {{rounded-sm | rounded-full}} bg-white/0 group-hover:bg-white/25 transition"></div>
 *   </div>
 *
 * O state-layer absoluto sobre a imagem é semitransparente (#FFFFFF24)
 * exatamente como no Figma. Tamanho 80×80 (size-20) é o default; o Dev
 * pode trocar para size-12, size-16 etc conforme contexto (ainda dentro
 * do spacing token).
 */
?>
<div class="flex flex-wrap items-end gap-8">

  <!-- Squared / Enabled -->
  <div class="space-y-2">
    <div class="relative inline-block group">
      <img
        class="block size-20 object-cover rounded-sm bg-neutral-100"
        src="https://i.pravatar.cc/160?img=12"
        alt="Avatar quadrado">
      <div class="absolute inset-0 rounded-sm bg-white/0 group-hover:bg-white/25 transition-colors"></div>
    </div>
    <p class="text-label-sm text-neutral-700">Squared</p>
  </div>

  <!-- Rounded / Enabled -->
  <div class="space-y-2">
    <div class="relative inline-block group">
      <img
        class="block size-20 object-cover rounded-full bg-neutral-100"
        src="https://i.pravatar.cc/160?img=33"
        alt="Avatar redondo">
      <div class="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/25 transition-colors"></div>
    </div>
    <p class="text-label-sm text-neutral-700">Rounded</p>
  </div>

  <!-- Squared / Hovered (forçado) -->
  <div class="space-y-2">
    <div class="relative inline-block">
      <img
        class="block size-20 object-cover rounded-sm bg-neutral-100"
        src="https://i.pravatar.cc/160?img=24"
        alt="Avatar quadrado hovered">
      <div class="absolute inset-0 rounded-sm bg-white/25"></div>
    </div>
    <p class="text-label-sm text-neutral-700">Squared · hovered</p>
  </div>

  <!-- Rounded / Hovered (forçado) -->
  <div class="space-y-2">
    <div class="relative inline-block">
      <img
        class="block size-20 object-cover rounded-full bg-neutral-100"
        src="https://i.pravatar.cc/160?img=47"
        alt="Avatar redondo hovered">
      <div class="absolute inset-0 rounded-full bg-white/25"></div>
    </div>
    <p class="text-label-sm text-neutral-700">Rounded · hovered</p>
  </div>

</div>
