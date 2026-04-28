<?php
/**
 * Componente: Avatar Stack
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=3422-29955
 * Variantes: qty (2|3|4|5|6) = 5
 *
 * Coleção de avatares circulares sobrepostos com offset negativo de 8px.
 * Cada avatar é 40×40 (size-10) com border 2px white. Container tem
 * pr-2 (8px) pra compensar o último avatar e largura fixa por qty.
 *
 * Anatomia (do Figma):
 *   <div pr-2 flex items-center justify-between w-{72|104|136|168|200}>
 *     {qty} × <div border-2 border-white rounded-full size-10 mr-[-8px]>
 *               <img>
 *             </div>
 *   </div>
 *
 * Larguras:
 *   2 → 72   · 3 → 104   · 4 → 136   · 5 → 168   · 6 → 200
 *
 * Tokens: rounded-full · border-white
 */
?>
<div class="space-y-6">

  <!-- 2 avatares (w-72) -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">2 avatares</p>
    <div class="flex items-center justify-between pr-2 w-[72px]">
      <img src="https://i.pravatar.cc/96?img=1" alt="Autor 1" class="size-10 rounded-full border-2 border-white object-cover bg-neutral-100 mr-[-8px]">
      <img src="https://i.pravatar.cc/96?img=2" alt="Autor 2" class="size-10 rounded-full border-2 border-white object-cover bg-neutral-100 mr-[-8px]">
    </div>
  </div>

  <!-- 3 avatares (w-104) -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">3 avatares</p>
    <div class="flex items-center justify-between pr-2 w-[104px]">
      <img src="https://i.pravatar.cc/96?img=1" alt="Autor 1" class="size-10 rounded-full border-2 border-white object-cover bg-neutral-100 mr-[-8px]">
      <img src="https://i.pravatar.cc/96?img=2" alt="Autor 2" class="size-10 rounded-full border-2 border-white object-cover bg-neutral-100 mr-[-8px]">
      <img src="https://i.pravatar.cc/96?img=3" alt="Autor 3" class="size-10 rounded-full border-2 border-white object-cover bg-neutral-100 mr-[-8px]">
    </div>
  </div>

  <!-- 4 avatares (w-136) -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">4 avatares</p>
    <div class="flex items-center justify-between pr-2 w-[136px]">
      <img src="https://i.pravatar.cc/96?img=1" alt="Autor 1" class="size-10 rounded-full border-2 border-white object-cover bg-neutral-100 mr-[-8px]">
      <img src="https://i.pravatar.cc/96?img=2" alt="Autor 2" class="size-10 rounded-full border-2 border-white object-cover bg-neutral-100 mr-[-8px]">
      <img src="https://i.pravatar.cc/96?img=3" alt="Autor 3" class="size-10 rounded-full border-2 border-white object-cover bg-neutral-100 mr-[-8px]">
      <img src="https://i.pravatar.cc/96?img=4" alt="Autor 4" class="size-10 rounded-full border-2 border-white object-cover bg-neutral-100 mr-[-8px]">
    </div>
  </div>

  <!-- 5 avatares (w-168) -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">5 avatares</p>
    <div class="flex items-center justify-between pr-2 w-[168px]">
      <img src="https://i.pravatar.cc/96?img=1" alt="Autor 1" class="size-10 rounded-full border-2 border-white object-cover bg-neutral-100 mr-[-8px]">
      <img src="https://i.pravatar.cc/96?img=2" alt="Autor 2" class="size-10 rounded-full border-2 border-white object-cover bg-neutral-100 mr-[-8px]">
      <img src="https://i.pravatar.cc/96?img=3" alt="Autor 3" class="size-10 rounded-full border-2 border-white object-cover bg-neutral-100 mr-[-8px]">
      <img src="https://i.pravatar.cc/96?img=4" alt="Autor 4" class="size-10 rounded-full border-2 border-white object-cover bg-neutral-100 mr-[-8px]">
      <img src="https://i.pravatar.cc/96?img=5" alt="Autor 5" class="size-10 rounded-full border-2 border-white object-cover bg-neutral-100 mr-[-8px]">
    </div>
  </div>

  <!-- 6 avatares (w-200) -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">6 avatares</p>
    <div class="flex items-center justify-between pr-2 w-[200px]">
      <img src="https://i.pravatar.cc/96?img=1" alt="Autor 1" class="size-10 rounded-full border-2 border-white object-cover bg-neutral-100 mr-[-8px]">
      <img src="https://i.pravatar.cc/96?img=2" alt="Autor 2" class="size-10 rounded-full border-2 border-white object-cover bg-neutral-100 mr-[-8px]">
      <img src="https://i.pravatar.cc/96?img=3" alt="Autor 3" class="size-10 rounded-full border-2 border-white object-cover bg-neutral-100 mr-[-8px]">
      <img src="https://i.pravatar.cc/96?img=4" alt="Autor 4" class="size-10 rounded-full border-2 border-white object-cover bg-neutral-100 mr-[-8px]">
      <img src="https://i.pravatar.cc/96?img=5" alt="Autor 5" class="size-10 rounded-full border-2 border-white object-cover bg-neutral-100 mr-[-8px]">
      <img src="https://i.pravatar.cc/96?img=6" alt="Autor 6" class="size-10 rounded-full border-2 border-white object-cover bg-neutral-100 mr-[-8px]">
    </div>
  </div>

</div>
