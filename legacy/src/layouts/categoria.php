<?php
/**
 * Layout: Categoria — Página de listagem por editoria
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=5433-16684
 * NodeId Desktop: 5433:16684 (1920×4040)
 *
 * Estrutura:
 *   §1  Header (partial)
 *   §2  Category hero (bg cor da editoria, título display-md white)
 *   §3  Ad Frame 970×90
 *   §4  Featured cards — 1 Large V (600) + 2×2 grid Small V + Ad 300×250
 *   §5  Ad Frame 970×90
 *   §6  Article list (8 News Card Medium H) + sidebar (2 Ad 300×250) + Pagination
 *   §7  Ad Frame 970×90
 *   §8  Footer (partial)
 *
 * Partials consumidos: header-desktop, footer-desktop, thumbnail, categoria, byline
 *
 * Cor da editoria é configurável — neste exemplo: mint (Embalagens).
 * Em produção, o WordPress forneceria a cor atribuída à editoria.
 */
?>
<main class="bg-white">

  <?php
  $activeCategory = 'embalagens';
  require_once __DIR__ . '/_session.php';
  get_template_part('components/_partials/header-desktop', null, $headerArgs);
  ?>

  <!-- ============================================================
       §2 — Category Hero
       bg da cor da editoria, título display-md white
       ============================================================ -->
  <section class="bg-mint flex flex-col items-center py-16 w-full">
    <div class="max-w-screen-xl mx-auto px-4 lg:px-6 w-full">
      <h1 class="font-display font-bold text-display-md text-white">Embalagens</h1>
    </div>
  </section>

  <!-- ============================================================
       §3 — Ad Frame (970×90)
       ============================================================ -->
  <section class="flex flex-col items-center py-6 w-full">
    <div class="border border-primary-100 bg-neutral-50 flex items-center justify-center h-[90px] w-[970px]">
      <span class="font-body font-bold text-label-md text-neutral-700">970 × 90</span>
    </div>
  </section>

  <!-- ============================================================
       §4 — Featured Cards
       Left: 1 News Card Large V (600w)
       Right: 2×2 grid (News Cards Small V + Ad 300×250)
       ============================================================ -->
  <section class="w-full">
    <div class="max-w-screen-xl mx-auto px-4 lg:px-6 flex gap-6 items-start">

      <!-- Left — News Card Large V (600w) -->
      <article class="group flex flex-col gap-3 shrink-0 w-[600px]">
        <?php get_template_part('components/_partials/thumbnail', null, [
          'src' => 'https://picsum.photos/seed/cat-hero/1200/800', 'alt' => 'Capa',
          'href' => '/src/layouts/conteudo.php', 'ratio' => '3:2', 'play' => '',
        ]); ?>
        <div class="flex flex-col gap-2">
          <h2 class="text-headline-md font-display font-bold text-primary-600">
            <a href="/src/layouts/conteudo.php" class="group-hover:text-secondary-950 transition-colors">O futuro das embalagens flexíveis</a>
          </h2>
          <p class="text-body-lg font-body text-neutral-900">Qual será futuro das embalagens flexíveis e os benefícios para a indústria? Confira agora no vídeo produzido na Fispal Tecnologia!</p>
        </div>
      </article>

      <!-- Right — 2×2 grid -->
      <div class="flex flex-col gap-6 flex-1 min-w-0">
        <!-- Row 1 -->
        <div class="flex gap-6">
          <article class="group flex flex-col gap-3 flex-1 min-w-[288px]">
            <?php get_template_part('components/_partials/thumbnail', null, [
              'src' => 'https://picsum.photos/seed/cat-f2/600/338', 'alt' => 'Capa',
              'href' => '/src/layouts/conteudo.php', 'ratio' => 'video', 'play' => '',
            ]); ?>
            <div class="flex flex-col gap-2">
              <h3 class="text-title-lg font-display font-bold text-primary-600 leading-tight">
                <a href="/src/layouts/conteudo.php" class="group-hover:text-secondary-950 transition-colors">Nutrição de precisão: o que é, como funciona e as transformações na indústria de alimentos</a>
              </h3>
            </div>
          </article>
          <article class="group flex flex-col gap-3 flex-1 min-w-[288px]">
            <?php get_template_part('components/_partials/thumbnail', null, [
              'src' => 'https://picsum.photos/seed/cat-f3/600/338', 'alt' => 'Capa',
              'href' => '/src/layouts/conteudo.php', 'ratio' => 'video', 'play' => '',
            ]); ?>
            <div class="flex flex-col gap-2">
              <h3 class="text-title-lg font-display font-bold text-primary-600 leading-tight">
                <a href="/src/layouts/conteudo.php" class="group-hover:text-secondary-950 transition-colors">Cultura do cuidado como motor da produtividade e inovação</a>
              </h3>
            </div>
          </article>
        </div>
        <!-- Row 2 -->
        <div class="flex gap-6">
          <article class="group flex flex-col gap-3 flex-1 min-w-[288px]">
            <?php get_template_part('components/_partials/thumbnail', null, [
              'src' => 'https://picsum.photos/seed/cat-f4/600/338', 'alt' => 'Capa',
              'href' => '/src/layouts/conteudo.php', 'ratio' => 'video', 'play' => '',
            ]); ?>
            <div class="flex flex-col gap-2">
              <h3 class="text-title-lg font-display font-bold text-primary-600 leading-tight">
                <a href="/src/layouts/conteudo.php" class="group-hover:text-secondary-950 transition-colors">Passo a passo para montar uma dark kitchen</a>
              </h3>
            </div>
          </article>
          <!-- Ad Frame 300×250 -->
          <div class="flex flex-col items-center flex-1 min-w-[288px]">
            <div class="border border-primary-100 bg-neutral-50 flex items-center justify-center h-[250px] w-[300px]">
              <span class="font-body font-bold text-label-md text-neutral-700">300 × 250</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>

  <!-- ============================================================
       §5 — Ad Frame (970×90)
       ============================================================ -->
  <section class="flex flex-col items-center py-6 w-full">
    <div class="border border-primary-100 bg-neutral-50 flex items-center justify-center h-[90px] w-[970px]">
      <span class="font-body font-bold text-label-md text-neutral-700">970 × 90</span>
    </div>
  </section>

  <!-- ============================================================
       §6 — Article List + Sidebar
       Left: 8 News Card Medium H + Pagination
       Right: 2 stacked Ad Frames 300×250
       ============================================================ -->
  <section class="w-full">
    <div class="max-w-screen-xl mx-auto px-4 lg:px-6 flex gap-10 items-start justify-center">

      <!-- Left — Article list -->
      <div class="flex flex-col gap-10 flex-1 max-w-[912px]">

        <?php
        $articles = [
          ['seed' => 'cat-a1', 'title' => 'Fispal Tecnologia 2025: indústria mostra como está enfrentando a era da IA', 'lead' => 'Nestlé, BRF, M.Dias Branco, Siemens, Mitsubishi e tantas outras apresentaram na Fispal 2025 inovações em IA e outras tecnologias que conduzirão a indústria daqui em diante'],
          ['seed' => 'cat-a2', 'title' => 'Para 2026, a trajetória dos sucos se encontra no caminho entre a tradição e a inovação', 'lead' => 'Nestlé, BRF, M.Dias Branco, Siemens, Mitsubishi e tantas outras apresentaram na Fispal 2025 inovações em IA e outras tecnologias que conduzirão a indústria daqui em diante'],
          ['seed' => 'cat-a3', 'title' => 'Cultura do cuidado como motor da produtividade e inovação', 'lead' => 'Como a valorização das pessoas e o bem-estar nas organizações impulsionam desempenho, engajamento e soluções inovadoras'],
          ['seed' => 'cat-a4', 'title' => 'Tendências em design que moldam o futuro das embalagens', 'lead' => 'Mario Narita, CEO da Narita Strategy & Design, fala sobre o futuro do design de embalagens para alimentos'],
          ['seed' => 'cat-a5', 'title' => 'O futuro da alimentação está na origem', 'lead' => 'Rastreabilidade tem se tornado ferramenta de gestão de risco e reputação no food service'],
          ['seed' => 'cat-a6', 'title' => 'Tendências para o mercado de energéticos na indústria de bebidas', 'lead' => 'Energéticos à base de plantas, versões sem açúcar e sabores tropicais estão entre as principais tendências de bebidas energéticas.'],
          ['seed' => 'cat-a7', 'title' => 'O futuro das embalagens flexíveis', 'lead' => 'Qual será futuro das embalagens flexíveis e os benefícios para a indústria? Confira agora no vídeo produzido na Fispal Tecnologia!'],
          ['seed' => 'cat-a8', 'title' => 'Cultura do cuidado como motor da produtividade e inovação', 'lead' => 'Como a valorização das pessoas e o bem-estar nas organizações impulsionam desempenho, engajamento e soluções inovadoras'],
        ];
        foreach ($articles as $article): ?>
        <article class="group flex flex-row gap-4 items-center w-full">
          <div class="flex-1 min-w-[288px] max-w-[392px]">
            <?php get_template_part('components/_partials/thumbnail', null, [
              'src' => 'https://picsum.photos/seed/' . $article['seed'] . '/784/441', 'alt' => 'Capa',
              'href' => '/src/layouts/conteudo.php', 'ratio' => 'video', 'play' => '',
            ]); ?>
          </div>
          <div class="flex flex-col gap-2 flex-1 min-w-0 justify-center">
            <h3 class="text-title-xl font-display font-bold text-primary-600">
              <a href="/src/layouts/conteudo.php" class="group-hover:text-secondary-950 transition-colors"><?php echo $article['title']; ?></a>
            </h3>
            <p class="text-body-md font-body text-neutral-900"><?php echo $article['lead']; ?></p>
          </div>
        </article>
        <?php endforeach; ?>

        <!-- Pagination -->
        <nav class="flex items-center justify-center p-4 w-full" aria-label="Paginação">
          <button type="button" aria-label="Página anterior" class="inline-flex items-center justify-center p-2 rounded-full text-neutral-300 cursor-not-allowed">
            <svg class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
          </button>
          <span class="inline-flex items-center justify-center size-10 rounded-full border border-primary-600 font-body font-bold text-label-lg text-primary-600">1</span>
          <a href="/src/layouts/categoria.php" class="inline-flex items-center justify-center size-10 rounded-full font-body font-bold text-label-lg text-neutral-900 hover:bg-neutral-50 transition-colors">2</a>
          <a href="/src/layouts/categoria.php" class="inline-flex items-center justify-center size-10 rounded-full font-body font-bold text-label-lg text-neutral-900 hover:bg-neutral-50 transition-colors">3</a>
          <a href="/src/layouts/categoria.php" class="inline-flex items-center justify-center size-10 rounded-full font-body font-bold text-label-lg text-neutral-900 hover:bg-neutral-50 transition-colors">4</a>
          <span class="inline-flex items-center justify-center size-10 font-body font-bold text-label-lg text-neutral-900">...</span>
          <a href="/src/layouts/categoria.php" class="inline-flex items-center justify-center size-10 rounded-full font-body font-bold text-label-lg text-neutral-900 hover:bg-neutral-50 transition-colors">99</a>
          <a href="/src/layouts/categoria.php" aria-label="Próxima página" class="inline-flex items-center justify-center p-2 rounded-full text-primary-600 hover:bg-neutral-50 transition-colors">
            <svg class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
          </a>
        </nav>

      </div>

      <!-- Right — Sidebar Ads -->
      <div class="flex flex-col gap-2 items-center shrink-0">
        <div class="bg-white p-4">
          <div class="border border-primary-100 bg-neutral-50 flex items-center justify-center h-[250px] w-[300px]">
            <span class="font-body font-bold text-label-md text-neutral-700">300 × 250</span>
          </div>
        </div>
        <div class="bg-white p-4">
          <div class="border border-primary-100 bg-neutral-50 flex items-center justify-center h-[250px] w-[300px]">
            <span class="font-body font-bold text-label-md text-neutral-700">300 × 250</span>
          </div>
        </div>
      </div>

    </div>
  </section>

  <!-- ============================================================
       §7 — Ad Frame (970×90)
       ============================================================ -->
  <section class="flex flex-col items-center py-6 w-full">
    <div class="border border-primary-100 bg-neutral-50 flex items-center justify-center h-[90px] w-[970px]">
      <span class="font-body font-bold text-label-md text-neutral-700">970 × 90</span>
    </div>
  </section>

  <!-- ============================================================
       §8 — Footer
       ============================================================ -->
  <?php get_template_part('components/_partials/footer-desktop', null, []); ?>

  <?php render_session_toggle(); ?>

</main>
<script type="module" src="/src/assets/js/interactions.js"></script>
