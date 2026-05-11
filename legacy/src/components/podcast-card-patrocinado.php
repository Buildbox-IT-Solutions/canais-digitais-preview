<?php
/**
 * Componente: Podcast Card 2.0 / Patrocinado
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=2359-15151
 * Variantes: 10
 *
 * Podcast Card patrocinado: BOX com border, igual ao News Card Patrocinado.
 * Anatomia idêntica ao Podcast Card 2.0 mas com:
 *   1. Container externo com border (neutral-100 → secondary-950 hover) bg-white rounded-sm
 *   2. Sponsor Line no rodapé em vez do podcast-meta (sem duração + autor)
 *
 * COMPOSIÇÃO via partials: thumbnail (com play) · categoria · sponsor-line
 *
 * Sizes (4 representativas):
 *   Large V 16:9   → 600w, headline-sm (24)
 *   Medium V 16:9  → 392w, title-xl (22)
 *   Medium H 16:9  → 882w (392 thumb + 490 content)
 *   Small H 1:1    → 600w (180 thumb square + 420 content), title-lg
 */
?>
<div class="space-y-10">

  <!-- ============================================================
       LARGE VERTICAL 16:9 (600w · headline-sm)
       ============================================================ -->
  <article class="group bg-white border border-neutral-100 hover:border-secondary-950 flex flex-col rounded-sm overflow-hidden w-[600px] max-w-full">
    <?php get_template_part('components/_partials/thumbnail', null, [
      'src' => 'https://picsum.photos/seed/pcspons1/1200/675',
      'alt' => 'Capa do podcast',
      'href' => '#',
      'ratio' => 'video',
      'play' => 'small', 'radius' => 'off',
    ]); ?>
    <div class="flex flex-col gap-2 px-4 py-3">
      <?php get_template_part('components/_partials/categoria', null, [
        'color' => 'mint', 'chip' => 'off', 'label' => 'Categoria', 'href' => null,
      ]); ?>
      <h3 class="text-headline-sm font-display font-bold text-primary-600 group-hover:text-secondary-950">
        <a href="#">Lorem ipsum dolor sit amet consectetur. Neque eget lectus phasellus tristique amet elementum.</a>
      </h3>
      <p class="text-body-lg font-body text-neutral-900">Lorem ipsum dolor sit amet consectetur. Congue non turpis gravida vel auctor.</p>
      <?php get_template_part('components/_partials/sponsor-line', null, [
        'company' => 'Company Name', 'href' => '#',
      ]); ?>
    </div>
  </article>

  <!-- ============================================================
       MEDIUM VERTICAL 16:9 (392w · title-xl)
       ============================================================ -->
  <article class="group bg-white border border-neutral-100 hover:border-secondary-950 flex flex-col rounded-sm overflow-hidden w-[392px] max-w-full">
    <?php get_template_part('components/_partials/thumbnail', null, [
      'src' => 'https://picsum.photos/seed/pcspons2/800/450',
      'alt' => 'Capa do podcast',
      'href' => '#',
      'ratio' => 'video',
      'play' => 'small', 'radius' => 'off',
    ]); ?>
    <div class="flex flex-col gap-2 px-4 py-3">
      <?php get_template_part('components/_partials/categoria', null, [
        'color' => 'mint', 'chip' => 'off', 'label' => 'Categoria', 'href' => null,
      ]); ?>
      <h3 class="text-title-xl font-display font-bold text-primary-600 group-hover:text-secondary-950">
        <a href="#">Lorem ipsum dolor sit amet consectetur. Neque eget lectus phasellus tristique amet elementum.</a>
      </h3>
      <p class="text-body-md font-body text-neutral-900">Lorem ipsum dolor sit amet consectetur.</p>
      <?php get_template_part('components/_partials/sponsor-line', null, [
        'company' => 'Company Name', 'href' => '#',
      ]); ?>
    </div>
  </article>

  <!-- ============================================================
       MEDIUM HORIZONTAL 16:9 (882w)
       ============================================================ -->
  <article class="group bg-white border border-neutral-100 hover:border-secondary-950 flex flex-row items-center rounded-sm overflow-hidden w-full max-w-[882px]">
    <div class="shrink-0 w-[392px]">
      <?php get_template_part('components/_partials/thumbnail', null, [
        'src' => 'https://picsum.photos/seed/pcspons3/800/450',
        'alt' => 'Capa do podcast',
        'href' => '#',
        'ratio' => 'video',
        'play' => 'small', 'radius' => 'off',
      ]); ?>
    </div>
    <div class="flex flex-col flex-1 gap-2 px-4 py-3 justify-center">
      <?php get_template_part('components/_partials/categoria', null, [
        'color' => 'mint', 'chip' => 'off', 'label' => 'Categoria', 'href' => null,
      ]); ?>
      <h3 class="text-title-xl font-display font-bold text-primary-600 group-hover:text-secondary-950">
        <a href="#">Lorem ipsum dolor sit amet consectetur. Neque eget lectus phasellus tristique amet elementum.</a>
      </h3>
      <?php get_template_part('components/_partials/sponsor-line', null, [
        'company' => 'Company Name', 'href' => '#',
      ]); ?>
    </div>
  </article>

  <!-- ============================================================
       SMALL HORIZONTAL 1:1 (600w · 180 square thumb)
       ============================================================ -->
  <article class="group bg-white border border-neutral-100 hover:border-secondary-950 flex flex-row items-center rounded-sm overflow-hidden w-full max-w-[600px]">
    <div class="shrink-0 w-[180px]">
      <?php get_template_part('components/_partials/thumbnail', null, [
        'src' => 'https://picsum.photos/seed/pcspons4/360/360',
        'alt' => 'Capa do podcast',
        'href' => '#',
        'ratio' => 'square',
        'play' => 'small', 'radius' => 'off',
      ]); ?>
    </div>
    <div class="flex flex-col flex-1 gap-2 px-4 py-3 h-full justify-center min-w-0">
      <?php get_template_part('components/_partials/categoria', null, [
        'color' => 'mint', 'chip' => 'off', 'label' => 'Categoria', 'href' => null,
      ]); ?>
      <h3 class="text-title-lg font-display font-bold text-primary-600 group-hover:text-secondary-950 leading-tight">
        <a href="#">Lorem ipsum dolor sit amet consectetur. Leo id donec magna elementum suspendisse.</a>
      </h3>
      <?php get_template_part('components/_partials/sponsor-line', null, [
        'company' => 'Company Name', 'href' => '#',
      ]); ?>
    </div>
  </article>

</div>
