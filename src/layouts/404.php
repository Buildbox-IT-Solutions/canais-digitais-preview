<?php
/**
 * Layout: 404 — Página não encontrada
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=3681-32583
 * NodeId Desktop: 3681:32583 (1920×1851)
 *
 * Sub-frames inspecionados:
 *   - 3681:32586 (404-section / hero) — extraído
 *   - Header expanded e Footer reusam partials header-desktop / footer-desktop
 *
 * Hero centralizado com numeral "404" gigante (Aleo Regular 105px), texto
 * "Página não encontrada" + descrição amigável + botão outlined "Ir para
 * Página Inicial". Abaixo, section "Você também pode gostar" com 2 rows
 * de 4 News Cards Medium Vertical sugerindo conteúdo relacionado.
 *
 * Componentes consumidos:
 *   - Partials: header-desktop, footer-desktop, section-title, thumbnail,
 *               categoria, byline
 *   - Markup inline: hero 404 (único deste layout), grid de news cards
 *
 * Decisões de design:
 *   - Numeral "404" usa text-[105px] inline (fora da escala MD3 — único caso)
 *   - Botão "Ir para Página Inicial" é outlined primary-600 (não filled),
 *     conforme Figma — sinaliza ação secundária de retorno
 *   - News cards do "Você também pode gostar" reusam markup inline do
 *     showcase news-card.php (Medium V) com textos contextuais Food Connection
 */
?>
<main class="bg-white">

  <?php
  $activeCategory = null;
  require_once __DIR__ . '/_session.php';
  get_template_part('components/_partials/header-desktop', null, $headerArgs);
  ?>

  <!-- ============================================================
       404 hero section
       ============================================================ -->
  <section class="flex flex-col items-center pb-14 pt-20">
    <div class="flex flex-col gap-8 items-center max-w-[704px] w-full px-6">
      <p class="font-display font-normal text-[105px] leading-[96px] tracking-[-0.25px] text-neutral-900 text-center w-full">404</p>
      <div class="flex flex-col gap-2 items-start text-neutral-900 text-center w-full">
        <h1 class="font-display font-bold text-headline-sm w-full">Página não encontrada</h1>
        <p class="font-body text-body-lg w-full">O link pode estar incorreto ou a página pode ter sido removida. Verifique o endereço ou volte para a página inicial.</p>
      </div>
      <?php get_template_part('components/_partials/button', null, [
        'label' => 'Ir para Página Inicial', 'href' => '#', 'type' => 'outlined', 'size' => 'medium', 'icon' => 'none',
      ]); ?>
    </div>
  </section>

  <!-- ============================================================
       "Você também pode gostar" — 2 rows × 4 News Cards Medium V
       ============================================================ -->
  <section class="pb-20">
    <?php get_template_part('components/_partials/section-title', null, [
      'label' => 'Você também pode gostar',
      'color' => 'primary-600',
      'href'  => null,
      'uppercase' => 'off',
    ]); ?>

    <div class="max-w-screen-xl mx-auto px-4 lg:px-6 mt-8 grid grid-cols-4 gap-6">

      <!-- Card 1 -->
      <article class="group flex flex-col gap-3">
        <?php get_template_part('components/_partials/thumbnail', null, [
          'src' => 'https://picsum.photos/seed/404a/600/400', 'alt' => 'Capa', 'href' => '#', 'ratio' => 'video', 'play' => '',
        ]); ?>
        <div class="flex flex-col gap-2">
          <?php get_template_part('components/_partials/categoria', null, [
            'color' => 'mint', 'chip' => 'off', 'label' => 'Eventos', 'href' => null,
          ]); ?>
          <h3 class="text-title-md font-display font-bold text-primary-600 leading-tight">
            <a href="#" class="group-hover:underline">FiSA 2026: inscrições abertas para o congresso de ingredientes</a>
          </h3>
          <?php get_template_part('components/_partials/byline', null, [
            'author' => 'Marcelo Yamashita', 'href' => '#', 'size' => 'sm',
          ]); ?>
        </div>
      </article>

      <!-- Card 2 -->
      <article class="group flex flex-col gap-3">
        <?php get_template_part('components/_partials/thumbnail', null, [
          'src' => 'https://picsum.photos/seed/404b/600/400', 'alt' => 'Capa', 'href' => '#', 'ratio' => 'video', 'play' => '',
        ]); ?>
        <div class="flex flex-col gap-2">
          <?php get_template_part('components/_partials/categoria', null, [
            'color' => 'coral', 'chip' => 'off', 'label' => 'Proteína Animal', 'href' => null,
          ]); ?>
          <h3 class="text-title-md font-display font-bold text-primary-600 leading-tight">
            <a href="#" class="group-hover:underline">Tecnocarne anuncia novo pavilhão para soluções em automação</a>
          </h3>
          <?php get_template_part('components/_partials/byline', null, [
            'author' => 'Rafaela Costa', 'href' => '#', 'size' => 'sm',
          ]); ?>
        </div>
      </article>

      <!-- Card 3 -->
      <article class="group flex flex-col gap-3">
        <?php get_template_part('components/_partials/thumbnail', null, [
          'src' => 'https://picsum.photos/seed/404c/600/400', 'alt' => 'Capa', 'href' => '#', 'ratio' => 'video', 'play' => '',
        ]); ?>
        <div class="flex flex-col gap-2">
          <?php get_template_part('components/_partials/categoria', null, [
            'color' => 'saffron', 'chip' => 'off', 'label' => 'Indústria A&B', 'href' => null,
          ]); ?>
          <h3 class="text-title-md font-display font-bold text-primary-600 leading-tight">
            <a href="#" class="group-hover:underline">Tendências em proteína vegetal: mercado brasileiro cresce 18%</a>
          </h3>
          <?php get_template_part('components/_partials/byline', null, [
            'author' => 'João Pedro Almeida', 'href' => '#', 'size' => 'sm',
          ]); ?>
        </div>
      </article>

      <!-- Card 4 -->
      <article class="group flex flex-col gap-3">
        <?php get_template_part('components/_partials/thumbnail', null, [
          'src' => 'https://picsum.photos/seed/404d/600/400', 'alt' => 'Capa', 'href' => '#', 'ratio' => 'video', 'play' => '',
        ]); ?>
        <div class="flex flex-col gap-2">
          <?php get_template_part('components/_partials/categoria', null, [
            'color' => 'lavander', 'chip' => 'off', 'label' => 'ESG', 'href' => null,
          ]); ?>
          <h3 class="text-title-md font-display font-bold text-primary-600 leading-tight">
            <a href="#" class="group-hover:underline">ESG na indústria de laticínios: case da Cooperativa Central Aurora</a>
          </h3>
          <?php get_template_part('components/_partials/byline', null, [
            'author' => 'Luiza Bertolaccini', 'href' => '#', 'size' => 'sm',
          ]); ?>
        </div>
      </article>

      <!-- Card 5 -->
      <article class="group flex flex-col gap-3">
        <?php get_template_part('components/_partials/thumbnail', null, [
          'src' => 'https://picsum.photos/seed/404e/600/400', 'alt' => 'Capa', 'href' => '#', 'ratio' => 'video', 'play' => '',
        ]); ?>
        <div class="flex flex-col gap-2">
          <?php get_template_part('components/_partials/categoria', null, [
            'color' => 'secondary-500', 'chip' => 'off', 'label' => 'Embalagens', 'href' => null,
          ]); ?>
          <h3 class="text-title-md font-display font-bold text-primary-600 leading-tight">
            <a href="#" class="group-hover:underline">Embalagens sustentáveis: como a Klabin lidera o setor</a>
          </h3>
          <?php get_template_part('components/_partials/byline', null, [
            'author' => 'Bruno Tavares', 'href' => '#', 'size' => 'sm',
          ]); ?>
        </div>
      </article>

      <!-- Card 6 -->
      <article class="group flex flex-col gap-3">
        <?php get_template_part('components/_partials/thumbnail', null, [
          'src' => 'https://picsum.photos/seed/404f/600/400', 'alt' => 'Capa', 'href' => '#', 'ratio' => 'video', 'play' => '',
        ]); ?>
        <div class="flex flex-col gap-2">
          <?php get_template_part('components/_partials/categoria', null, [
            'color' => 'mint', 'chip' => 'off', 'label' => 'Sorvetes', 'href' => null,
          ]); ?>
          <h3 class="text-title-md font-display font-bold text-primary-600 leading-tight">
            <a href="#" class="group-hover:underline">Sorvetes artesanais: boom de marcas paulistanas no verão 2026</a>
          </h3>
          <?php get_template_part('components/_partials/byline', null, [
            'author' => 'Marcelo Yamashita', 'href' => '#', 'size' => 'sm',
          ]); ?>
        </div>
      </article>

      <!-- Card 7 -->
      <article class="group flex flex-col gap-3">
        <?php get_template_part('components/_partials/thumbnail', null, [
          'src' => 'https://picsum.photos/seed/404g/600/400', 'alt' => 'Capa', 'href' => '#', 'ratio' => 'video', 'play' => '',
        ]); ?>
        <div class="flex flex-col gap-2">
          <?php get_template_part('components/_partials/categoria', null, [
            'color' => 'primary-600', 'chip' => 'off', 'label' => 'Food Service', 'href' => null,
          ]); ?>
          <h3 class="text-title-md font-display font-bold text-primary-600 leading-tight">
            <a href="#" class="group-hover:underline">Food Service: delivery próprio volta a ganhar tração em 2026</a>
          </h3>
          <?php get_template_part('components/_partials/byline', null, [
            'author' => 'Rafaela Costa', 'href' => '#', 'size' => 'sm',
          ]); ?>
        </div>
      </article>

      <!-- Card 8 -->
      <article class="group flex flex-col gap-3">
        <?php get_template_part('components/_partials/thumbnail', null, [
          'src' => 'https://picsum.photos/seed/404h/600/400', 'alt' => 'Capa', 'href' => '#', 'ratio' => 'video', 'play' => '',
        ]); ?>
        <div class="flex flex-col gap-2">
          <?php get_template_part('components/_partials/categoria', null, [
            'color' => 'secondary-950', 'chip' => 'off', 'label' => 'Tecnologia', 'href' => null,
          ]); ?>
          <h3 class="text-title-md font-display font-bold text-primary-600 leading-tight">
            <a href="#" class="group-hover:underline">Fispal Food Service 2026: programação de palestras é divulgada</a>
          </h3>
          <?php get_template_part('components/_partials/byline', null, [
            'author' => 'Luiza Bertolaccini', 'href' => '#', 'size' => 'sm',
          ]); ?>
        </div>
      </article>

    </div>
  </section>

  <?php get_template_part('components/_partials/footer-desktop', null, []); ?>

</main>
<script type="module" src="/src/assets/js/interactions.js"></script>
