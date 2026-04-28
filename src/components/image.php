<?php
/**
 * Componente: Image
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=30-3878
 * Variantes: ratio (1:1 | 4:3 | 3:2 | 16:9 | 21:9 | 2:3 | 3:4 | 9:16 | 9:21) = 9
 * Tokens usados: rounded-sm · bg-neutral-100 (placeholder)
 *
 * Wrapper responsivo que impõe aspect-ratio na imagem contida. Placeholder
 * cinza enquanto a imagem não carrega ou se a URL falhar.
 *
 * USO BÁSICO:
 *   <div class="aspect-video rounded-sm bg-neutral-100 overflow-hidden">
 *     <img src="..." alt="..." class="w-full h-full object-cover">
 *   </div>
 *
 * RATIOS (classes Tailwind):
 *   Landscape:
 *     1:1  → aspect-square
 *     4:3  → aspect-[4/3]
 *     3:2  → aspect-[3/2]
 *     16:9 → aspect-video      (Tailwind default)
 *     21:9 → aspect-[21/9]     (cinemascope)
 *
 *   Portrait:
 *     2:3  → aspect-[2/3]
 *     3:4  → aspect-[3/4]
 *     9:16 → aspect-[9/16]     (vídeo vertical)
 *     9:21 → aspect-[9/21]     (story ultra-tall)
 *
 * O radius é sempre `rounded-sm` (4px) pra bater com o Figma. Se o contexto
 * pedir radius maior (ex: card com rounded-lg externo), envolver num wrapper.
 */
?>
<div class="space-y-6">

  <!-- Landscape ratios -->
  <div class="space-y-3">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Landscape</p>
    <div class="flex flex-wrap items-start gap-4">

      <div class="w-32 aspect-square rounded-sm bg-neutral-100 overflow-hidden relative">
        <span class="absolute inset-0 flex items-center justify-center text-neutral-700 font-display font-bold text-title-xl">1:1</span>
      </div>

      <div class="w-40 aspect-[4/3] rounded-sm bg-neutral-100 overflow-hidden relative">
        <span class="absolute inset-0 flex items-center justify-center text-neutral-700 font-display font-bold text-title-xl">4:3</span>
      </div>

      <div class="w-44 aspect-[3/2] rounded-sm bg-neutral-100 overflow-hidden relative">
        <span class="absolute inset-0 flex items-center justify-center text-neutral-700 font-display font-bold text-title-xl">3:2</span>
      </div>

      <div class="w-52 aspect-video rounded-sm bg-neutral-100 overflow-hidden relative">
        <span class="absolute inset-0 flex items-center justify-center text-neutral-700 font-display font-bold text-title-xl">16:9</span>
      </div>

      <div class="w-64 aspect-[21/9] rounded-sm bg-neutral-100 overflow-hidden relative">
        <span class="absolute inset-0 flex items-center justify-center text-neutral-700 font-display font-bold text-title-xl">21:9</span>
      </div>

    </div>
  </div>

  <!-- Portrait ratios -->
  <div class="space-y-3">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Portrait</p>
    <div class="flex flex-wrap items-start gap-4">

      <div class="w-32 aspect-[3/4] rounded-sm bg-neutral-100 overflow-hidden relative">
        <span class="absolute inset-0 flex items-center justify-center text-neutral-700 font-display font-bold text-title-xl">3:4</span>
      </div>

      <div class="w-28 aspect-[2/3] rounded-sm bg-neutral-100 overflow-hidden relative">
        <span class="absolute inset-0 flex items-center justify-center text-neutral-700 font-display font-bold text-title-xl">2:3</span>
      </div>

      <div class="w-24 aspect-[9/16] rounded-sm bg-neutral-100 overflow-hidden relative">
        <span class="absolute inset-0 flex items-center justify-center text-neutral-700 font-display font-bold text-title-xl">9:16</span>
      </div>

      <div class="w-20 aspect-[9/21] rounded-sm bg-neutral-100 overflow-hidden relative">
        <span class="absolute inset-0 flex items-center justify-center text-neutral-700 font-display font-bold text-title-xl">9:21</span>
      </div>

    </div>
  </div>

  <!-- Exemplo com imagem real (1:1 e 16:9) -->
  <div class="space-y-3">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Com imagem real</p>
    <div class="flex flex-wrap items-start gap-4">

      <div class="w-40 aspect-square rounded-sm bg-neutral-100 overflow-hidden">
        <img src="https://picsum.photos/seed/a/400" alt="Exemplo 1:1" class="w-full h-full object-cover">
      </div>

      <div class="w-64 aspect-video rounded-sm bg-neutral-100 overflow-hidden">
        <img src="https://picsum.photos/seed/b/640/360" alt="Exemplo 16:9" class="w-full h-full object-cover">
      </div>

      <div class="w-32 aspect-[3/4] rounded-sm bg-neutral-100 overflow-hidden">
        <img src="https://picsum.photos/seed/c/300/400" alt="Exemplo 3:4" class="w-full h-full object-cover">
      </div>

    </div>
  </div>

</div>
