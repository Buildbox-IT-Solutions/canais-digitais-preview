<?php
/**
 * Componente: Podcast Card 2.0
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=2283-2779
 * Variantes: size × orientation × state × ratio (16:9|1:1) × (time-author/lead/categoria bools) = 12
 *
 * COMPOSIÇÃO POR _partials (ver REGRA CRÍTICA — Reutilização de átomos):
 *   - components/_partials/thumbnail    → wrapper imagem + aspect (video|square) + hover-zoom + play overlay
 *   - components/_partials/play-button  → embutido pelo thumbnail via play=small|xsmall
 *   - components/_partials/categoria    → label "Podcasts" (chip=off, color=mint)
 *   - components/_partials/podcast-meta → "99h 99m • Por Author Name"
 *
 * Diferenças vs News/Video Card:
 *   1. Headline 1 step menor (Large V = 24px, não 28px) → headline-sm
 *   2. Prop Ratio: 16:9 ou 1:1 (square) — thumbnail aceita os dois
 *   3. Meta line "podcast-meta" combina duração + autor (não só byline)
 *   4. Play button overlay obrigatório em todos os sizes
 *
 * Sizes representativos (4 de 12 variants do Figma):
 *   Large V 16:9   → 600w, headline-sm, body-lg lead
 *   Medium H 16:9  → 882w (392 thumb + 490 content), title-xl, body-lg lead
 *   Small H 1:1    → 600w (180 thumb + 420 content), title-lg, sem lead
 *   XSmall H 1:1   → 600w (104 thumb + 496 content), title-md, sem lead
 */
?>
<div class="space-y-10">

  <!-- ============================================================
       LARGE VERTICAL 16:9 (600×522, headline 24px)
       ============================================================ -->
  <article class="group flex flex-col gap-3 w-[600px] max-w-full">
    <?php get_template_part('components/_partials/thumbnail', null, [
      'src'   => 'https://picsum.photos/seed/podcast1/1200/675',
      'alt'   => 'Capa do podcast',
      'href'  => '#',
      'ratio' => 'video',
      'play'  => 'small',
    ]); ?>
    <div class="flex flex-col gap-2">
      <?php get_template_part('components/_partials/categoria', null, [
        'color' => 'mint',
        'chip'  => 'off',
        'label' => 'Podcasts',
        'href'  => null,
      ]); ?>
      <h3 class="text-headline-sm font-display font-bold text-primary-600">
        <a href="#" class="group-hover:text-secondary-950 transition-colors">Lorem ipsum dolor sit amet consectetur. Neque eget sagittis tellus.</a>
      </h3>
      <p class="text-body-lg font-body text-neutral-900 group-hover:text-neutral-950 transition-colors">Lorem ipsum dolor sit amet consectetur. Congue non sed aliquam vel cursus volutpat.</p>
      <?php get_template_part('components/_partials/podcast-meta', null, [
        'time'   => '99h 99m',
        'author' => 'Author Name',
        'href'   => '#',
        'size'   => 'md',
      ]); ?>
    </div>
  </article>

  <!-- ============================================================
       MEDIUM HORIZONTAL 16:9 (882×221, headline 22px)
       ============================================================ -->
  <article class="group flex flex-row items-center gap-6 w-full max-w-[882px]">
    <div class="shrink-0 w-[392px]">
      <?php get_template_part('components/_partials/thumbnail', null, [
        'src'   => 'https://picsum.photos/seed/podcast2/800/450',
        'alt'   => 'Capa do podcast',
        'href'  => '#',
        'ratio' => 'video',
        'play'  => 'small',
      ]); ?>
    </div>
    <div class="flex flex-col gap-2 flex-1 min-w-0">
      <?php get_template_part('components/_partials/categoria', null, [
        'color' => 'mint',
        'chip'  => 'off',
        'label' => 'Podcasts',
        'href'  => null,
      ]); ?>
      <h3 class="text-title-xl font-display font-bold text-primary-600">
        <a href="#" class="group-hover:text-secondary-950 transition-colors">Lorem ipsum dolor sit amet consectetur. Neque eget sagittis tellus enim mauris.</a>
      </h3>
      <p class="text-body-lg font-body text-neutral-900 group-hover:text-neutral-950 transition-colors">Lorem ipsum dolor sit amet consectetur. Congue non sed aliquam vel cursus volutpat.</p>
      <?php get_template_part('components/_partials/podcast-meta', null, [
        'time'   => '99h 99m',
        'author' => 'Author Name',
        'href'   => '#',
        'size'   => 'md',
      ]); ?>
    </div>
  </article>

  <!-- ============================================================
       SMALL HORIZONTAL 1:1 (600×180, thumbnail quadrada 180×180)
       ============================================================ -->
  <article class="group flex flex-row items-center gap-4 w-full max-w-[600px]">
    <div class="shrink-0 w-[180px]">
      <?php get_template_part('components/_partials/thumbnail', null, [
        'src'   => 'https://picsum.photos/seed/podcast3/360/360',
        'alt'   => 'Capa do podcast',
        'href'  => '#',
        'ratio' => 'square',
        'play'  => 'small',
      ]); ?>
    </div>
    <div class="flex flex-col gap-2 flex-1 min-w-0 justify-center">
      <?php get_template_part('components/_partials/categoria', null, [
        'color' => 'mint',
        'chip'  => 'off',
        'label' => 'Podcasts',
        'href'  => null,
      ]); ?>
      <h3 class="text-title-lg font-display font-bold text-primary-600">
        <a href="#" class="group-hover:text-secondary-950 transition-colors">Lorem ipsum dolor sit amet consectetur. Neque eget sagittis.</a>
      </h3>
      <?php get_template_part('components/_partials/podcast-meta', null, [
        'time'   => '99h 99m',
        'author' => 'Author Name',
        'href'   => '#',
        'size'   => 'sm',
      ]); ?>
    </div>
  </article>

  <!-- ============================================================
       XSMALL HORIZONTAL 1:1 (600×104, thumbnail 104×104)
       ============================================================ -->
  <article class="group flex flex-row items-center gap-3 w-full max-w-[600px]">
    <div class="shrink-0 w-[104px]">
      <?php get_template_part('components/_partials/thumbnail', null, [
        'src'   => 'https://picsum.photos/seed/podcast4/208/208',
        'alt'   => 'Capa do podcast',
        'href'  => '#',
        'ratio' => 'square',
        'play'  => 'xsmall',
      ]); ?>
    </div>
    <div class="flex flex-col gap-1 flex-1 min-w-0 justify-center">
      <?php get_template_part('components/_partials/categoria', null, [
        'color' => 'mint',
        'chip'  => 'off',
        'label' => 'Podcasts',
        'href'  => null,
      ]); ?>
      <h3 class="text-title-md font-display font-bold text-primary-600 leading-tight">
        <a href="#" class="group-hover:text-secondary-950 transition-colors">Lorem ipsum dolor sit amet consectetur.</a>
      </h3>
      <?php get_template_part('components/_partials/podcast-meta', null, [
        'time'   => '99h 99m',
        'author' => 'Author Name',
        'href'   => '#',
        'size'   => 'sm',
      ]); ?>
    </div>
  </article>

</div>
