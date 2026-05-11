<?php
/**
 * Componente: Video Container
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=872-7575
 * Variantes: 1 (component único — embed player principal)
 *
 * Player de vídeo embedado. Características do Figma:
 *   - 704 × 396 (aspect ~16:9)
 *   - rounded-sm
 *   - Imagem de fundo (no tema real, substituir por iframe/video player)
 *   - Play Button XLarge CENTRALIZADO mas em estilo INVERTIDO:
 *     bg-primary-600 + text-white (não bg-white + text-primary-600!)
 *   - Video Time pill bottom-right: bg-primary-600/80, px-2 py-1 rounded-sm,
 *     "99:99:99" text-white text-label-md SemiBold tracking 0.5
 *
 * NOTA: o play button aqui é o INVERSO do partial play-button (que é
 * white bg + primary text). Por isso usa inline.
 */
?>
<div class="space-y-4 w-full max-w-[704px]">

  <div class="relative w-[704px] max-w-full h-[396px] rounded-sm overflow-hidden flex items-center justify-center">
    <!-- Background image (no tema real, substituir por iframe/video) -->
    <img src="https://picsum.photos/seed/video-container/1920/1080" alt="Thumbnail do vídeo" class="absolute inset-0 w-full h-full object-cover" aria-hidden="true">

    <!-- Play button XLarge invertido (bg primary-600, text white) -->
    <div class="relative inline-flex items-center justify-center rounded-full bg-primary-600 p-4">
      <svg class="size-10 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7L8 5z"/></svg>
    </div>

    <!-- Video Time pill bottom-right -->
    <div class="absolute bottom-4 right-4 inline-flex items-center justify-center px-2 py-1 rounded-sm bg-primary-600/80">
      <p class="font-body font-semibold text-label-md text-white whitespace-nowrap">99:99:99</p>
    </div>
  </div>

</div>
