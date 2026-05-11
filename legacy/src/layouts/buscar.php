<?php
/**
 * Layout: Busca — Página de resultados de busca
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1785-17716
 * NodeId Desktop: 1785:17716 (1920×3551)
 *
 * Estrutura:
 *   §1  Header (partial)
 *   §2  Page title hero (bg-primary-600, "Busca", display-md white)
 *   §3  Ad Frame 970×250
 *   §4  Container 2-col: Results (900px) + Sidebar ad (300px)
 *       - Search bar + Filter chips (Categoria, Autor, Tipo) + divider
 *       - Results count + sort dropdown
 *       - 8× News Card Medium H
 *       - Pagination
 *   §5  Footer (partial)
 *
 * Partials consumidos: header-desktop, footer-desktop, thumbnail, categoria, divider
 */
?>
<main class="bg-white">

  <?php
  $activeCategory = null;
  require_once __DIR__ . '/_session.php';
  get_template_part('components/_partials/header-desktop', null, $headerArgs);
  ?>

  <!-- ============================================================
       §2 — Page Title Hero
       ============================================================ -->
  <section class="bg-primary-600 flex flex-col items-center py-16 w-full">
    <div class="max-w-screen-xl mx-auto px-4 lg:px-6 w-full">
      <h1 class="font-display font-bold text-display-md text-white">Busca</h1>
    </div>
  </section>

  <!-- ============================================================
       §3 — Ad Frame (970×250)
       ============================================================ -->
  <section class="flex flex-col items-center py-6 w-full">
    <div class="border border-primary-100 bg-neutral-50 flex items-center justify-center h-[250px] w-[970px]">
      <span class="font-body font-bold text-label-md text-neutral-700">970 × 250</span>
    </div>
  </section>

  <!-- ============================================================
       §4 — Search Results + Sidebar
       ============================================================ -->
  <section class="w-full">
    <div class="max-w-screen-xl mx-auto px-4 lg:px-6 flex gap-6 items-start justify-center py-10">

      <!-- Left — Results column (900px) -->
      <div class="flex flex-col gap-6 flex-1 max-w-[900px]">

        <!-- Search bar -->
        <div class="flex flex-col gap-6 w-full">
          <div class="relative w-full">
            <div class="absolute inset-y-0 left-3 flex items-center pointer-events-none text-primary-600">
              <svg class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
            </div>
            <input type="search" value="sorvete" class="w-full h-10 pl-10 pr-10 rounded-full border border-neutral-100 bg-white text-body-lg font-body text-primary-600 placeholder:text-neutral-900 focus:outline-none focus:border-secondary-950 transition-colors">
            <button type="button" aria-label="Limpar busca" class="absolute inset-y-0 right-2 flex items-center justify-center p-2 text-neutral-900 hover:text-primary-600">
              <svg class="size-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
            </button>
          </div>

          <!-- Filter chips -->
          <div class="flex flex-col gap-2 w-full">
            <p class="font-body font-bold text-label-lg text-primary-600">Refine sua busca</p>
            <div class="flex gap-2 items-center">
              <?php
              $filters = ['Categoria', 'Autor', 'Tipo'];
              foreach ($filters as $f): ?>
              <button type="button" class="inline-flex h-8 items-center gap-2 pl-4 pr-2 rounded-full border border-neutral-100 font-body font-semibold text-label-lg text-neutral-950 hover:bg-neutral-50 transition-colors">
                <?php echo $f; ?>
                <svg class="size-4 text-neutral-950" viewBox="0 0 24 24" fill="currentColor"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>
              </button>
              <?php endforeach; ?>
            </div>
          </div>

          <?php get_template_part('components/_partials/divider', null, ['orientation' => 'horizontal']); ?>
        </div>

        <!-- Results count + sort -->
        <div class="flex items-center justify-between w-full">
          <p class="font-body font-semibold text-label-lg text-neutral-900">128 resultados</p>
          <div class="flex items-center gap-2">
            <span class="font-body font-semibold text-label-lg text-neutral-900">Ordenar por:</span>
            <button type="button" class="inline-flex items-center gap-1 font-body font-bold text-label-lg text-primary-600">
              Mais recentes
              <svg class="size-4" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
            </button>
          </div>
        </div>

        <!-- Article list -->
        <div class="flex flex-col gap-10">
          <?php
          $results = [
            ['seed' => 'bus-1', 'cat' => 'Food Service',   'catcolor' => 'saffron',      'title' => 'Fispal Tecnologia 2025: indústria mostra como está enfrentando a era da IA', 'lead' => 'Nestlé, BRF, M.Dias Branco, Siemens, Mitsubishi e tantas outras apresentaram na Fispal 2025 inovações em IA e outras tecnologias'],
            ['seed' => 'bus-2', 'cat' => 'Ingredientes',   'catcolor' => 'mint',          'title' => 'Para 2026, a trajetória dos sucos se encontra no caminho entre a tradição e a inovação', 'lead' => 'Novos sabores e combinações para atender um consumidor cada vez mais exigente e consciente'],
            ['seed' => 'bus-3', 'cat' => 'ESG',            'catcolor' => 'lavander',      'title' => 'Cultura do cuidado como motor da produtividade e inovação', 'lead' => 'Como a valorização das pessoas e o bem-estar nas organizações impulsionam desempenho'],
            ['seed' => 'bus-4', 'cat' => 'Embalagens',     'catcolor' => 'primary-600',   'title' => 'Tendências em design que moldam o futuro das embalagens', 'lead' => 'Mario Narita fala sobre o futuro do design de embalagens para alimentos'],
            ['seed' => 'bus-5', 'cat' => 'Food Service',   'catcolor' => 'saffron',      'title' => 'O futuro da alimentação está na origem', 'lead' => 'Rastreabilidade tem se tornado ferramenta de gestão de risco e reputação no food service'],
            ['seed' => 'bus-6', 'cat' => 'Ingredientes',   'catcolor' => 'mint',          'title' => 'Tendências para o mercado de energéticos na indústria de bebidas', 'lead' => 'Energéticos à base de plantas, versões sem açúcar e sabores tropicais'],
            ['seed' => 'bus-7', 'cat' => 'Embalagens',     'catcolor' => 'primary-600',   'title' => 'O futuro das embalagens flexíveis', 'lead' => 'Qual será futuro das embalagens flexíveis e os benefícios para a indústria?'],
            ['seed' => 'bus-8', 'cat' => 'Tecnologia',     'catcolor' => 'secondary-950', 'title' => 'Cultura do cuidado como motor da produtividade e inovação', 'lead' => 'Como a valorização das pessoas impulsiona desempenho e soluções inovadoras'],
          ];
          foreach ($results as $r): ?>
          <article class="group flex flex-row gap-4 items-center w-full">
            <div class="flex-1 min-w-[288px] max-w-[392px]">
              <?php get_template_part('components/_partials/thumbnail', null, [
                'src' => 'https://picsum.photos/seed/' . $r['seed'] . '/784/441', 'alt' => 'Capa',
                'href' => '/src/layouts/conteudo.php', 'ratio' => 'video', 'play' => '',
              ]); ?>
            </div>
            <div class="flex flex-col gap-2 flex-1 min-w-0 justify-center">
              <?php get_template_part('components/_partials/categoria', null, [
                'color' => $r['catcolor'], 'chip' => 'off', 'label' => $r['cat'], 'href' => '/src/layouts/categoria.php',
              ]); ?>
              <h3 class="text-title-xl font-display font-bold text-primary-600">
                <a href="/src/layouts/conteudo.php" class="group-hover:text-secondary-950 transition-colors"><?php echo $r['title']; ?></a>
              </h3>
              <p class="text-body-md font-body text-neutral-900"><?php echo $r['lead']; ?></p>
            </div>
          </article>
          <?php endforeach; ?>
        </div>

        <!-- Pagination -->
        <nav class="flex items-center justify-center p-4 w-full" aria-label="Paginação">
          <button type="button" aria-label="Página anterior" class="inline-flex items-center justify-center p-2 rounded-full text-neutral-300 cursor-not-allowed">
            <svg class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
          </button>
          <span class="inline-flex items-center justify-center size-10 rounded-full border border-primary-600 font-body font-bold text-label-lg text-primary-600">1</span>
          <a href="/src/layouts/buscar.php" class="inline-flex items-center justify-center size-10 rounded-full font-body font-bold text-label-lg text-neutral-900 hover:bg-neutral-50 transition-colors">2</a>
          <a href="/src/layouts/buscar.php" class="inline-flex items-center justify-center size-10 rounded-full font-body font-bold text-label-lg text-neutral-900 hover:bg-neutral-50 transition-colors">3</a>
          <a href="/src/layouts/buscar.php" class="inline-flex items-center justify-center size-10 rounded-full font-body font-bold text-label-lg text-neutral-900 hover:bg-neutral-50 transition-colors">4</a>
          <span class="inline-flex items-center justify-center size-10 font-body font-bold text-label-lg text-neutral-900">...</span>
          <a href="/src/layouts/buscar.php" class="inline-flex items-center justify-center size-10 rounded-full font-body font-bold text-label-lg text-neutral-900 hover:bg-neutral-50 transition-colors">16</a>
          <a href="/src/layouts/buscar.php" aria-label="Próxima página" class="inline-flex items-center justify-center p-2 rounded-full text-primary-600 hover:bg-neutral-50 transition-colors">
            <svg class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
          </a>
        </nav>

      </div>

      <!-- Right — Sidebar Ad -->
      <aside class="flex flex-col gap-4 items-center shrink-0">
        <div class="bg-white p-4">
          <div class="border border-primary-100 bg-neutral-50 flex items-center justify-center h-[600px] w-[300px]">
            <span class="font-body font-bold text-label-md text-neutral-700">300 × 600</span>
          </div>
        </div>
      </aside>

    </div>
  </section>

  <!-- ============================================================
       §5 — Footer
       ============================================================ -->
  <?php get_template_part('components/_partials/footer-desktop', null, []); ?>

  <?php render_session_toggle(); ?>

</main>
<script type="module" src="/src/assets/js/interactions.js"></script>
