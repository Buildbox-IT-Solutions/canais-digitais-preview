<?php
/**
 * Componente: Highlight Post
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=3104-56651
 * Variantes: device (Desktop|Mobile) = 2
 *
 * Pull-quote tipográfica que aparece no corpo de matérias longas. NÃO é
 * um hero — é apenas uma citação com barra lateral cinza à esquerda.
 *
 * ANATOMIA:
 *   <div py-6 gap-8 items-start (desktop) | py-4 gap-4 (mobile)>
 *     <div class="w-1 bg-neutral-50 self-stretch"></div>  ← barra lateral
 *     <p class="font-display text-title-xl (desktop) | title-lg bold (mobile) text-primary-600">
 *       Citação aqui.
 *     </p>
 *   </div>
 *
 * Tipografia:
 *   Desktop → font-display Regular 22/28 (text-title-xl)
 *   Mobile  → font-display Bold 18/24 (text-title-lg)
 *
 * Tokens: bg-neutral-50 · text-primary-600 · font-display · text-title-xl ·
 *         text-title-lg
 */
?>
<div class="space-y-10">

  <!-- ===== Desktop (title-xl Regular) ===== -->
  <div class="flex flex-col items-start py-6 w-full max-w-[735px]">
    <div class="flex gap-8 items-start w-full">
      <div class="w-1 bg-neutral-50 self-stretch"></div>
      <p class="flex-1 font-display text-title-xl text-primary-600">
        Lorem ipsum dolor sit amet consectetur. Sed at nibh ultricies erat vel volutpat nec a. Tristique rhoncus laoreet cursus placerat pharetra etiam congue. Ipsum vitae vitae justo proin dictum. Mauris sit in consectetur amet pharetra donec sed.
      </p>
    </div>
  </div>

  <!-- ===== Mobile (title-lg Bold) ===== -->
  <div class="flex flex-col items-start py-4 w-full max-w-[375px]">
    <div class="flex gap-4 items-start w-full">
      <div class="w-1 bg-neutral-50 self-stretch"></div>
      <p class="flex-1 font-display font-bold text-title-lg text-primary-600">
        Lorem ipsum dolor sit amet consectetur. Sed at nibh ultricies erat vel volutpat nec a. Tristique rhoncus laoreet cursus placerat pharetra etiam congue. Ipsum vitae vitae justo proin dictum. Mauris sit in consectetur amet pharetra donec sed.
      </p>
    </div>
  </div>

</div>
