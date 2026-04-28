<?php
/**
 * Componente: Video Card 2.0 / Inverse
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=2803-26398
 * Variantes: 14 (mesma matriz do Video Card 2.0)
 *
 * Variante "Inverse" do Video Card. NÃO TEM container próprio com bg/border —
 * é apenas o conteúdo direto, com texto branco/light, pra ser usado SOBRE
 * uma seção de fundo escuro (a layout pai define o bg).
 *
 * Diferenças vs Video Card 2.0:
 *   1. Categoria usa CHIP=ON (bg-white text-mint) — pra contraste sobre fundo escuro
 *   2. Title text-white (hover text-primary-100 = #d4dae0)
 *   3. Lead text-neutral-50 (#e9eaec)
 *   4. Author "Por" text-neutral-50, "Author Name" text-neutral-50 bold (NÃO neutral-950)
 *   5. SEM container border ou bg
 *
 * O showcase abaixo embrulha tudo num bg primary-600 SOMENTE pra preview
 * visual — em uso real, o card vai dentro de uma section escura qualquer
 * sem precisar do wrapper.
 */
?>
<div class="bg-primary-600 -mx-8 px-8 py-10 space-y-10">

  <!-- ============================================================
       LARGE VERTICAL (600w · headline-md)
       ============================================================ -->
  <article class="group flex flex-col gap-3 w-[600px] max-w-full">
    <?php get_template_part('components/_partials/thumbnail', null, [
      'src' => 'https://picsum.photos/seed/vinv1/1200/675',
      'alt' => 'Capa do vídeo',
      'href' => '#',
      'ratio' => 'video',
      'play' => 'small',
    ]); ?>
    <div class="flex flex-col gap-2 items-start">
      <?php get_template_part('components/_partials/categoria', null, [
        'color' => 'mint', 'chip' => 'on', 'label' => 'Categoria', 'href' => null,
      ]); ?>
      <h3 class="text-headline-md font-display font-bold text-white group-hover:text-primary-100">
        <a href="#">Lorem ipsum dolor sit amet consectetur. Neque eget lectus phasellus tristique amet elementum.</a>
      </h3>
      <p class="text-body-lg font-body text-neutral-50">Lorem ipsum dolor sit amet consectetur. Congue non turpis gravida vel auctor. Tellus malesuada euismod tristique dignissim nunc.</p>
      <p class="text-body-md font-body font-semibold text-neutral-50">
        Por <a href="#" class="text-neutral-50 font-bold hover:underline">Author Name</a>
      </p>
    </div>
  </article>

  <!-- ============================================================
       MEDIUM HORIZONTAL (912w)
       ============================================================ -->
  <article class="group flex flex-row gap-4 items-center w-full max-w-[912px]">
    <div class="shrink-0 w-[392px]">
      <?php get_template_part('components/_partials/thumbnail', null, [
        'src' => 'https://picsum.photos/seed/vinv2/800/450',
        'alt' => 'Capa do vídeo',
        'href' => '#',
        'ratio' => 'video',
        'play' => 'small',
      ]); ?>
    </div>
    <div class="flex flex-col gap-2 flex-1 min-w-0 justify-center items-start">
      <?php get_template_part('components/_partials/categoria', null, [
        'color' => 'mint', 'chip' => 'on', 'label' => 'Categoria', 'href' => null,
      ]); ?>
      <h3 class="text-title-xl font-display font-bold text-white group-hover:text-primary-100">
        <a href="#">Lorem ipsum dolor sit amet consectetur. Neque eget lectus phasellus tristique amet elementum.</a>
      </h3>
      <p class="text-body-md font-body text-neutral-50">Lorem ipsum dolor sit amet consectetur. Congue non turpis gravida vel auctor.</p>
      <p class="text-body-md font-body font-semibold text-neutral-50">
        Por <a href="#" class="text-neutral-50 font-bold hover:underline">Author Name</a>
      </p>
    </div>
  </article>

  <!-- ============================================================
       XSMALL HORIZONTAL (392w · sem lead)
       ============================================================ -->
  <article class="group flex flex-row gap-4 items-center w-full max-w-[392px]">
    <div class="shrink-0 w-[160px]">
      <?php get_template_part('components/_partials/thumbnail', null, [
        'src' => 'https://picsum.photos/seed/vinv3/320/180',
        'alt' => 'Capa do vídeo',
        'href' => '#',
        'ratio' => 'video',
        'play' => 'xsmall',
      ]); ?>
    </div>
    <div class="flex flex-col gap-1 flex-1 min-w-0 justify-center items-start">
      <?php get_template_part('components/_partials/categoria', null, [
        'color' => 'mint', 'chip' => 'on', 'label' => 'Categoria', 'href' => null,
      ]); ?>
      <h3 class="text-title-md font-display font-bold text-white group-hover:text-primary-100 leading-tight">
        <a href="#">Lorem ipsum dolor sit amet consectetur.</a>
      </h3>
      <p class="text-body-sm font-body font-semibold text-neutral-50">
        Por <a href="#" class="text-neutral-50 font-bold hover:underline">Author Name</a>
      </p>
    </div>
  </article>

</div>
