<?php
/**
 * Componente: News Card 2.0 / Patrocinado
 * Figma Patrocinado:   https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=2358-14810
 * Figma Patrocinado 2: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=2370-30429
 * Figma Boxed:         https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=3862-28403
 * Variantes: 12 (Patrocinado) + 4 (Patrocinado 2) + 2 (Boxed)
 *
 * News Card patrocinado: BOX com border, fundo branco, rounded-sm. Anatomia
 * idêntica ao News Card 2.0 mas envolvido em container border + Sponsor Line
 * substituindo o byline padrão.
 *
 * Diferenças vs News Card 2.0:
 *   1. Container externo: bg-white border 1px (neutral-100 → secondary-950 hover) rounded-sm
 *   2. Imagem SEM rounded-sm (radius=off) — card faz o clipping via overflow-hidden
 *   3. Padding conteúdo: px-4 py-3 (gap-2)
 *   4. Sponsor Line no rodapé em vez do byline (Author Name)
 *   5. Horizontais: imagem flex-1 com max/min constraints (não fixo)
 *   6. Small H: imagem ratio 3:2 (não 16:9)
 *
 * COMPOSIÇÃO via partials: thumbnail · categoria · sponsor-line
 *
 * Sizes (4 representativas):
 *   Large V    → 600w, headline-md (28px), imagem 16:9
 *   Medium V   → 392w, title-xl (22px), imagem 16:9 + lead
 *   Large H    → 912w, title-xl, imagem flex-1 16:9 max-w-392
 *   Small H    → 392w, title-md, imagem flex-1 3:2 max-w-160
 */
?>
<div class="space-y-10">

  <!-- ============================================================
       LARGE VERTICAL (600w · headline-md)
       ============================================================ -->
  <article class="group bg-white border border-neutral-100 hover:border-secondary-950 transition-colors flex flex-col rounded-sm overflow-hidden w-[600px] max-w-full">
    <?php get_template_part('components/_partials/thumbnail', null, [
      'src' => 'https://picsum.photos/seed/spons1/1200/675',
      'alt' => 'Capa patrocinada',
      'href' => '#',
      'ratio' => 'video',
      'play' => '', 'radius' => 'off',
    ]); ?>
    <div class="flex flex-col gap-2 px-4 py-3">
      <?php get_template_part('components/_partials/categoria', null, [
        'color' => 'mint', 'chip' => 'off', 'label' => 'Categoria', 'href' => null,
      ]); ?>
      <h3 class="text-headline-md font-display font-bold text-primary-600 group-hover:text-secondary-950 transition-colors">
        <a href="#">Lorem ipsum dolor sit amet consectetur. Neque eget lectus phasellus tristique amet elementum.</a>
      </h3>
      <p class="text-body-lg font-body text-neutral-900 group-hover:text-neutral-950 transition-colors">Lorem ipsum dolor sit amet consectetur. Congue non turpis gravida vel auctor. Tellus malesuada euismod tristique dignissim nunc.</p>
      <?php get_template_part('components/_partials/sponsor-line', null, [
        'company' => 'Company Name', 'href' => '#',
      ]); ?>
    </div>
  </article>

  <!-- ============================================================
       MEDIUM VERTICAL (392w · title-xl + lead)
       ============================================================ -->
  <article class="group bg-white border border-neutral-100 hover:border-secondary-950 transition-colors flex flex-col rounded-sm overflow-hidden w-[392px] max-w-full">
    <?php get_template_part('components/_partials/thumbnail', null, [
      'src' => 'https://picsum.photos/seed/spons2/800/450',
      'alt' => 'Capa patrocinada',
      'href' => '#',
      'ratio' => 'video',
      'play' => '', 'radius' => 'off',
    ]); ?>
    <div class="flex flex-col gap-2 px-4 py-3">
      <?php get_template_part('components/_partials/categoria', null, [
        'color' => 'mint', 'chip' => 'off', 'label' => 'Categoria', 'href' => null,
      ]); ?>
      <h3 class="text-title-xl font-display font-bold text-primary-600 group-hover:text-secondary-950 transition-colors">
        <a href="#">Lorem ipsum dolor sit amet consectetur. Neque eget lectus phasellus tristique amet elementum.</a>
      </h3>
      <p class="text-body-md font-body text-neutral-900 group-hover:text-neutral-950 transition-colors">Lorem ipsum dolor sit amet consectetur. Congue non turpis gravida vel auctor.</p>
      <?php get_template_part('components/_partials/sponsor-line', null, [
        'company' => 'Company Name', 'href' => '#',
      ]); ?>
    </div>
  </article>

  <!-- ============================================================
       LARGE HORIZONTAL (912w — image flex-1 max-392 + content flex-1)
       ============================================================ -->
  <article class="group bg-white border border-neutral-100 hover:border-secondary-950 transition-colors flex flex-row items-center rounded-sm overflow-hidden w-full max-w-[912px]">
    <div class="flex-1 min-w-[288px] max-w-[392px]">
      <?php get_template_part('components/_partials/thumbnail', null, [
        'src' => 'https://picsum.photos/seed/spons3/800/450',
        'alt' => 'Capa patrocinada',
        'href' => '#',
        'ratio' => 'video',
        'play' => '', 'radius' => 'off',
      ]); ?>
    </div>
    <div class="flex flex-col flex-1 gap-2 px-4 py-3 justify-center min-w-0">
      <?php get_template_part('components/_partials/categoria', null, [
        'color' => 'mint', 'chip' => 'off', 'label' => 'Categoria', 'href' => null,
      ]); ?>
      <h3 class="text-title-xl font-display font-bold text-primary-600 group-hover:text-secondary-950 transition-colors">
        <a href="#">Lorem ipsum dolor sit amet consectetur. Neque eget lectus phasellus tristique amet elementum.</a>
      </h3>
      <?php get_template_part('components/_partials/sponsor-line', null, [
        'company' => 'Company Name', 'href' => '#',
      ]); ?>
    </div>
  </article>

  <!-- ============================================================
       SMALL HORIZONTAL (392w — image flex-1 max-160 3:2 + content flex-1)
       ============================================================ -->
  <article class="group bg-white border border-neutral-100 hover:border-secondary-950 transition-colors flex flex-row items-center rounded-sm overflow-hidden w-full max-w-[392px]">
    <div class="flex-1 max-w-[160px]">
      <?php get_template_part('components/_partials/thumbnail', null, [
        'src' => 'https://picsum.photos/seed/spons4/400/267',
        'alt' => 'Capa patrocinada',
        'href' => '#',
        'ratio' => 'photo',
        'play' => '', 'radius' => 'off',
      ]); ?>
    </div>
    <div class="flex flex-col flex-1 gap-2 px-4 py-3 justify-center min-w-0">
      <?php get_template_part('components/_partials/categoria', null, [
        'color' => 'mint', 'chip' => 'off', 'label' => 'Categoria', 'href' => null,
      ]); ?>
      <h3 class="text-title-md font-display font-bold text-primary-600 group-hover:text-secondary-950 transition-colors leading-tight">
        <a href="#">Lorem ipsum dolor sit amet consectetur.</a>
      </h3>
      <?php get_template_part('components/_partials/sponsor-line', null, [
        'company' => 'Company Name', 'href' => '#',
      ]); ?>
    </div>
  </article>

</div>
