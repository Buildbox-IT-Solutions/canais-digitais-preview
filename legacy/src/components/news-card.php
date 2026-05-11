<?php
/**
 * Componente: News Card 2.0
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1709-7090
 * Variantes: size × orientation × state × (image/lead/author/categoria bools) = 12
 *
 * COMPOSIÇÃO POR _partials (ver REGRA CRÍTICA — Reutilização de átomos):
 *   - components/_partials/thumbnail  → wrapper imagem + aspect + hover-zoom
 *   - components/_partials/categoria  → label colorido (chip=off)
 *   - components/_partials/byline     → "Por Author Name"
 *
 * Anatomia idêntica ao Video Card, sem Play overlay. O article externo tem
 * class `group` pra acionar o zoom da thumbnail no hover.
 *
 * Sizes representativos (4 de 12 variants do Figma):
 *   Large V     → 600w, headline-md (28px)
 *   Medium V    → 392w, title-xl (22px)
 *   Large H     → 912w (392 thumb + 520 content), title-xl
 *   Small H     → 392w (160 thumb + 232 content), title-md, sem lead
 *
 * Tokens consumidos pelos partials + card: text-headline-md · text-title-xl/md
 * · text-body-lg/md/sm · font-display · font-body · text-primary-600 ·
 * text-neutral-900
 */
?>
<div class="space-y-10">

  <!-- ============================================================
       LARGE VERTICAL (600×566)
       ============================================================ -->
  <article class="group flex flex-col gap-3 w-[600px] max-w-full">
    <?php get_template_part('components/_partials/thumbnail', null, [
      'src'   => 'https://picsum.photos/seed/news1/1200/675',
      'alt'   => 'Capa da notícia',
      'href'  => '#',
      'ratio' => 'video',
      'play'  => '',
    ]); ?>
    <div class="flex flex-col gap-2">
      <?php get_template_part('components/_partials/categoria', null, [
        'color' => 'mint',
        'chip'  => 'off',
        'label' => 'Categoria',
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
       MEDIUM VERTICAL (392×437)
       ============================================================ -->
  <article class="group flex flex-col gap-3 w-[392px] max-w-full">
    <?php get_template_part('components/_partials/thumbnail', null, [
      'src'   => 'https://picsum.photos/seed/news2/800/450',
      'alt'   => 'Capa da notícia',
      'href'  => '#',
      'ratio' => 'video',
      'play'  => '',
    ]); ?>
    <div class="flex flex-col gap-2">
      <?php get_template_part('components/_partials/categoria', null, [
        'color' => 'mint',
        'chip'  => 'off',
        'label' => 'Categoria',
        'href'  => null,
      ]); ?>
      <h3 class="text-title-xl font-display font-bold text-primary-600">
        <a href="#" class="group-hover:text-secondary-950 transition-colors">Lorem ipsum dolor sit amet consectetur. Neque eget sagittis tellus.</a>
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
       LARGE HORIZONTAL (912×221 — image 392 + content 520)
       ============================================================ -->
  <article class="group flex flex-row items-center gap-6 w-full max-w-[912px]">
    <div class="shrink-0 w-[392px]">
      <?php get_template_part('components/_partials/thumbnail', null, [
        'src'   => 'https://picsum.photos/seed/news3/800/450',
        'alt'   => 'Capa da notícia',
        'href'  => '#',
        'ratio' => 'video',
        'play'  => '',
      ]); ?>
    </div>
    <div class="flex flex-col gap-2 flex-1 min-w-0">
      <?php get_template_part('components/_partials/categoria', null, [
        'color' => 'mint',
        'chip'  => 'off',
        'label' => 'Categoria',
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
       SMALL HORIZONTAL (392×107, sem lead)
       ============================================================ -->
  <article class="group flex flex-row items-center gap-4 w-full max-w-[392px]">
    <div class="shrink-0 w-[160px]">
      <?php get_template_part('components/_partials/thumbnail', null, [
        'src'   => 'https://picsum.photos/seed/news4/400/225',
        'alt'   => 'Capa da notícia',
        'href'  => '#',
        'ratio' => 'video',
        'play'  => '',
      ]); ?>
    </div>
    <div class="flex flex-col gap-1 flex-1 min-w-0">
      <?php get_template_part('components/_partials/categoria', null, [
        'color' => 'mint',
        'chip'  => 'off',
        'label' => 'Categoria',
        'href'  => null,
      ]); ?>
      <h3 class="text-title-md font-display font-bold text-primary-600 leading-tight">
        <a href="#" class="group-hover:text-secondary-950 transition-colors">Lorem ipsum dolor sit amet consectetur.</a>
      </h3>
      <?php get_template_part('components/_partials/byline', null, [
        'author' => 'Author Name',
        'href'   => '#',
        'size'   => 'sm',
      ]); ?>
    </div>
  </article>

</div>
