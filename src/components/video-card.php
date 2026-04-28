<?php
/**
 * Componente: Video Card 2.0
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1678-20955
 * Variantes: size × orientation × state × (image/lead/author/categoria bools) = 14
 *
 * COMPOSIÇÃO POR _partials (ver REGRA CRÍTICA — Reutilização de átomos):
 *   - components/_partials/thumbnail   → wrapper imagem + aspect + hover-zoom + play overlay
 *   - components/_partials/play-button → embutido pelo thumbnail via play=small|xsmall
 *   - components/_partials/categoria   → label "Vídeos" (chip=off, color=mint)
 *   - components/_partials/byline      → "Por Author Name"
 *
 * Idêntico ao News Card + overlay de Play Button no canto superior esquerdo
 * da imagem. Como o overlay fica dentro de um <a> wrapper de thumbnail
 * clicável, o partial play-button é renderizado como <div> com
 * pointer-events-none (ver play-button.php §"Uso em cards").
 *
 * Sizes implementados (4 representativos dos 14 variants do Figma):
 *   Large V    → 600w, headline 28
 *   Medium H   → 912w (392 thumb + 520 content), headline 22
 *   XSmall H   → 392w (160 thumb + 232 content), headline 16
 *
 * Tokens consumidos pelos partials: rounded-sm · rounded-full · bg-white
 * · text-primary-600 · text-mint · text-neutral-900 · text-neutral-950
 * · text-headline-md · text-title-xl/md · text-body-lg/md/sm
 * · font-display · font-body
 */
?>
<div class="space-y-10">

  <!-- ============================================================
       LARGE VERTICAL (600×566)
       ============================================================ -->
  <article class="group flex flex-col gap-3 w-[600px] max-w-full">
    <?php get_template_part('components/_partials/thumbnail', null, [
      'src'   => 'https://picsum.photos/seed/video1/1200/675',
      'alt'   => 'Capa do vídeo',
      'href'  => '#',
      'ratio' => 'video',
      'play'  => 'small',
    ]); ?>
    <div class="flex flex-col gap-2">
      <?php get_template_part('components/_partials/categoria', null, [
        'color' => 'mint',
        'chip'  => 'off',
        'label' => 'Vídeos',
        'href'  => null,
      ]); ?>
      <h3 class="text-headline-md font-display font-bold text-primary-600">
        <a href="#" class="group-hover:text-secondary-950 transition-colors">Lorem ipsum dolor sit amet consectetur. Neque eget sagittis tellus.</a>
      </h3>
      <p class="text-body-lg font-body text-neutral-900 group-hover:text-neutral-950 transition-colors">Lorem ipsum dolor sit amet consectetur. Congue non sed aliquam vel cursus volutpat.</p>
      <?php get_template_part('components/_partials/byline', null, [
        'author' => 'Author Name',
        'href'   => '#',
        'size'   => 'md',
      ]); ?>
    </div>
  </article>

  <!-- ============================================================
       MEDIUM HORIZONTAL (912×221)
       ============================================================ -->
  <article class="group flex flex-row items-center gap-6 w-full max-w-[912px]">
    <div class="shrink-0 w-[392px]">
      <?php get_template_part('components/_partials/thumbnail', null, [
        'src'   => 'https://picsum.photos/seed/video2/800/450',
        'alt'   => 'Capa do vídeo',
        'href'  => '#',
        'ratio' => 'video',
        'play'  => 'small',
      ]); ?>
    </div>
    <div class="flex flex-col gap-2 flex-1 min-w-0">
      <?php get_template_part('components/_partials/categoria', null, [
        'color' => 'mint',
        'chip'  => 'off',
        'label' => 'Vídeos',
        'href'  => null,
      ]); ?>
      <h3 class="text-title-xl font-display font-bold text-primary-600">
        <a href="#" class="group-hover:text-secondary-950 transition-colors">Lorem ipsum dolor sit amet consectetur. Neque eget sagittis tellus enim mauris.</a>
      </h3>
      <p class="text-body-md font-body text-neutral-900 group-hover:text-neutral-950 transition-colors">Lorem ipsum dolor sit amet consectetur. Congue non sed aliquam vel cursus volutpat.</p>
      <?php get_template_part('components/_partials/byline', null, [
        'author' => 'Author Name',
        'href'   => '#',
        'size'   => 'md',
      ]); ?>
    </div>
  </article>

  <!-- ============================================================
       XSMALL HORIZONTAL (392×96, thumbnail 160×90, sem lead)
       ============================================================ -->
  <article class="group flex flex-row items-center gap-3 w-full max-w-[392px]">
    <div class="shrink-0 w-[160px]">
      <?php get_template_part('components/_partials/thumbnail', null, [
        'src'   => 'https://picsum.photos/seed/video3/320/180',
        'alt'   => 'Capa do vídeo',
        'href'  => '#',
        'ratio' => 'video',
        'play'  => 'xsmall',
      ]); ?>
    </div>
    <div class="flex flex-col gap-1 flex-1 min-w-0">
      <?php get_template_part('components/_partials/categoria', null, [
        'color' => 'mint',
        'chip'  => 'off',
        'label' => 'Vídeos',
        'href'  => null,
      ]); ?>
      <h3 class="text-title-md font-display font-bold text-primary-600 leading-tight">
        <a href="#" class="group-hover:text-secondary-950 transition-colors">Lorem ipsum dolor sit amet consectetur.</a>
      </h3>
      <?php get_template_part('components/_partials/byline', null, [
        'author' => 'Author',
        'href'   => '#',
        'size'   => 'sm',
      ]); ?>
    </div>
  </article>

</div>
