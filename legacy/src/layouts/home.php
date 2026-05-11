<?php
/**
 * Layout: Home — Página inicial
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=973-6474
 * NodeId Desktop: 973:6748 → body 973:6749 (1920×10091)
 *
 * 18 seções compostas exclusivamente por componentes já existentes:
 *   §1  Ad Frame 1224×245
 *   §2  Hero — grid 600+288+288 (News Cards) + bottom row 4×288
 *   §3  Categorias (Ingredientes · Food Service · Em Alta)
 *   §4  Proteína Animal — Section Title Style 2 + 4 cards
 *   §5  Download Section
 *   §6  Ad Frame 970×90
 *   §7  Webstories
 *   §8  Vídeos — bg-primary-600, cards inverse
 *   §9  Fispal Tecnologia — 3 News Cards regulares
 *   §10 Banner Newsletter (photo)
 *   §11 Sponsor Section (Tetra Pak)
 *   §12 Ad Frame 970×90
 *   §13 News + Podcasts — cards esq + Widget Podcast dir
 *   §14 Especialistas — Section Title Style 2 + 3 Card Colunista
 *   §15 Ad Frame 970×250
 *   §16 News Card Large H + 2 Boxed
 *   §17 Última seção — News Card Large V + grid 2×2 (1 Boxed + 1 News + 1 Ad)
 *   §18 Footer
 *
 * Partials consumidos: header-desktop, footer-desktop, section-title,
 *   thumbnail, categoria, byline, sponsor-line, divider, button
 */
?>
<main class="bg-white">

  <?php
  $activeCategory = null;
  require_once __DIR__ . '/_session.php';
  get_template_part('components/_partials/header-desktop', null, $headerArgs);
  ?>

  <!-- ============================================================
       §1 — Ad Frame (1224×245)
       ============================================================ -->
  <section class="flex flex-col items-center py-6 w-full">
    <div class="flex items-center max-w-screen-xl mx-auto w-full px-4 lg:px-6">
      <div class="aspect-[1248/250] border border-primary-100 bg-neutral-50 flex flex-1 items-center justify-center">
        <span class="font-body font-bold text-label-md text-neutral-700">1224 × 245</span>
      </div>
    </div>
  </section>

  <!-- ============================================================
       §2 — Hero (News Cards grid)
       Figma: 973:6751 (1920×1014)
       Grid top: 600 + 288 + 288 (gap-6)
       Grid bottom: 4×288 (gap-6)
       ============================================================ -->
  <section class="w-full">
    <div class="max-w-screen-xl mx-auto px-4 lg:px-6 py-6 flex flex-col gap-8">

      <!-- Top row: 3 columns -->
      <div class="grid grid-cols-[600px_1fr_1fr] gap-6">

        <!-- Col 1 — News Card Large V (600×588) -->
        <article class="group flex flex-col gap-3">
          <?php get_template_part('components/_partials/thumbnail', null, [
            'src' => 'https://picsum.photos/seed/home-hero/1200/675', 'alt' => 'Capa da notícia',
            'href' => '/src/layouts/conteudo.php', 'ratio' => 'video', 'play' => '',
          ]); ?>
          <div class="flex flex-col gap-2">
            <?php get_template_part('components/_partials/categoria', null, [
              'color' => 'mint', 'chip' => 'off', 'label' => 'Eventos', 'href' => '/src/layouts/categoria.php',
            ]); ?>
            <h3 class="text-headline-md font-display font-bold text-primary-600">
              <a href="/src/layouts/conteudo.php" class="group-hover:text-secondary-950 transition-colors">Redes sociais como ingrediente estratégico no branding gastronômico</a>
            </h3>
            <p class="text-body-lg font-body text-neutral-900 group-hover:text-neutral-950 transition-colors">Na Fispal Food Service 2025, fundadora da Food se mostra como transformar perfis no Instagram, TikTok e LinkedIn em vitrines reais para negócios de alimentação.</p>
            <?php get_template_part('components/_partials/byline', null, [
              'author' => 'Company Name', 'href' => '#', 'size' => 'md',
            ]); ?>
          </div>
        </article>

        <!-- Col 2 — 2 stacked News Cards V (288w) -->
        <div class="flex flex-col gap-8">
          <article class="group flex flex-col gap-3">
            <?php get_template_part('components/_partials/thumbnail', null, [
              'src' => 'https://picsum.photos/seed/home-h2/600/338', 'alt' => 'Capa',
              'href' => '/src/layouts/conteudo.php', 'ratio' => 'video', 'play' => '',
            ]); ?>
            <div class="flex flex-col gap-1">
              <?php get_template_part('components/_partials/categoria', null, [
                'color' => 'primary-600', 'chip' => 'off', 'label' => 'Compras', 'href' => '/src/layouts/categoria.php',
              ]); ?>
              <h3 class="text-title-md font-display font-bold text-primary-600 leading-tight">
                <a href="/src/layouts/conteudo.php" class="group-hover:text-secondary-950 transition-colors">Nutrição de precisão: o que é, como funciona e as transformações na indústria de alimentos</a>
              </h3>
            </div>
          </article>
          <article class="group flex flex-col gap-3">
            <?php get_template_part('components/_partials/thumbnail', null, [
              'src' => 'https://picsum.photos/seed/home-h3/600/338', 'alt' => 'Capa',
              'href' => '/src/layouts/conteudo.php', 'ratio' => 'video', 'play' => '',
            ]); ?>
            <div class="flex flex-col gap-1">
              <?php get_template_part('components/_partials/categoria', null, [
                'color' => 'primary-600', 'chip' => 'off', 'label' => 'Compras', 'href' => '/src/layouts/categoria.php',
              ]); ?>
              <h3 class="text-title-md font-display font-bold text-primary-600 leading-tight">
                <a href="/src/layouts/conteudo.php" class="group-hover:text-secondary-950 transition-colors">Passo a passo para montar uma dark Kitchen</a>
              </h3>
            </div>
          </article>
        </div>

        <!-- Col 3 — 3 stacked text-only cards (288w, ~160h each) -->
        <div class="flex flex-col gap-6">
          <article class="group flex flex-col gap-1">
            <?php get_template_part('components/_partials/categoria', null, [
              'color' => 'mint', 'chip' => 'off', 'label' => 'Categoria', 'href' => '/src/layouts/categoria.php',
            ]); ?>
            <h3 class="text-title-md font-display font-bold text-primary-600 leading-tight">
              <a href="/src/layouts/conteudo.php" class="group-hover:text-secondary-950 transition-colors">Levedura e fungos: inovação em proteínas alternativas</a>
            </h3>
            <p class="text-body-sm font-body text-neutral-900">Conheça as proteínas alimentadas de levedura e fungos, o potencial de benefícios da Topical com a proteínas de micélio.</p>
          </article>
          <article class="group flex flex-col gap-1">
            <?php get_template_part('components/_partials/categoria', null, [
              'color' => 'coral', 'chip' => 'off', 'label' => 'Categoria', 'href' => '/src/layouts/categoria.php',
            ]); ?>
            <h3 class="text-title-md font-display font-bold text-primary-600 leading-tight">
              <a href="/src/layouts/conteudo.php" class="group-hover:text-secondary-950 transition-colors">Como identificar e corrigir gargalos na logística de alimentos</a>
            </h3>
            <p class="text-body-sm font-body text-neutral-900">Transportes refrigerados e problemas na armazenagem prejudicam toda a cadeia de abastecimento.</p>
          </article>
          <article class="group flex flex-col gap-1">
            <?php get_template_part('components/_partials/categoria', null, [
              'color' => 'saffron', 'chip' => 'off', 'label' => 'Indústria A&B', 'href' => '/src/layouts/categoria.php',
            ]); ?>
            <h3 class="text-title-md font-display font-bold text-primary-600 leading-tight">
              <a href="/src/layouts/conteudo.php" class="group-hover:text-secondary-950 transition-colors">Design higiênico: pilar estratégico para o futuro da indústria alimentícia</a>
            </h3>
            <p class="text-body-sm font-body text-neutral-900">Equipamentos seguros, higiênicos, eficientes e comprovados pela produção.</p>
          </article>
        </div>
      </div>

      <!-- Bottom row: 4 columns -->
      <div class="grid grid-cols-4 gap-6">

        <!-- News Card Small V -->
        <article class="group flex flex-col gap-3">
          <?php get_template_part('components/_partials/thumbnail', null, [
            'src' => 'https://picsum.photos/seed/home-hp1/600/338', 'alt' => 'Capa',
            'href' => '/src/layouts/conteudo.php', 'ratio' => 'video', 'play' => '',
          ]); ?>
          <div class="flex flex-col gap-1">
            <?php get_template_part('components/_partials/categoria', null, [
              'color' => 'lavander', 'chip' => 'off', 'label' => 'Empreendedorismo', 'href' => '/src/layouts/categoria.php',
            ]); ?>
            <h3 class="text-title-md font-display font-bold text-primary-600 leading-tight">
              <a href="/src/layouts/conteudo.php" class="group-hover:text-secondary-950 transition-colors">Quando um dashboard atende melhor do que uma IA Generativa?</a>
            </h3>
          </div>
        </article>

        <!-- News Card Small V -->
        <article class="group flex flex-col gap-3">
          <?php get_template_part('components/_partials/thumbnail', null, [
            'src' => 'https://picsum.photos/seed/home-h5/600/338', 'alt' => 'Capa',
            'href' => '/src/layouts/conteudo.php', 'ratio' => 'video', 'play' => '',
          ]); ?>
          <div class="flex flex-col gap-1">
            <?php get_template_part('components/_partials/categoria', null, [
              'color' => 'primary-600', 'chip' => 'off', 'label' => 'Compras', 'href' => '/src/layouts/categoria.php',
            ]); ?>
            <h3 class="text-title-md font-display font-bold text-primary-600 leading-tight">
              <a href="/src/layouts/conteudo.php" class="group-hover:text-secondary-950 transition-colors">Estamos prontos para estourar o desafio de produzir em 5.0?</a>
            </h3>
          </div>
        </article>

        <!-- News Card Small V -->
        <article class="group flex flex-col gap-3">
          <?php get_template_part('components/_partials/thumbnail', null, [
            'src' => 'https://picsum.photos/seed/home-h6/600/338', 'alt' => 'Capa',
            'href' => '/src/layouts/conteudo.php', 'ratio' => 'video', 'play' => '',
          ]); ?>
          <div class="flex flex-col gap-1">
            <?php get_template_part('components/_partials/categoria', null, [
              'color' => 'saffron', 'chip' => 'off', 'label' => 'Inovação', 'href' => '/src/layouts/categoria.php',
            ]); ?>
            <h3 class="text-title-md font-display font-bold text-primary-600 leading-tight">
              <a href="/src/layouts/conteudo.php" class="group-hover:text-secondary-950 transition-colors">Para 2026, a trajetória dos sucos se encontra no caminho entre a tradição e a inovação</a>
            </h3>
          </div>
        </article>

        <!-- Ad Frame 288×272 (rectangle) -->
        <div class="border border-primary-100 bg-neutral-50 flex items-center justify-center rounded-sm aspect-[300/250]">
          <span class="font-body font-bold text-label-md text-neutral-700">300 × 250</span>
        </div>
      </div>

    </div>
  </section>

  <!-- ============================================================
       §3 — Categorias: Ingredientes + Food Service + Em Alta
       Figma: 973:6770 (1920×926)
       3 colunas de 392px (gap-6)
       ============================================================ -->
  <section class="w-full">
    <div class="max-w-screen-xl mx-auto px-4 lg:px-6 grid grid-cols-3 gap-6">

      <!-- Col 1 — Ingredientes -->
      <div class="flex flex-col pt-10">
        <a href="/src/layouts/categoria.php" class="group block text-mint no-underline hover:opacity-75 transition-opacity space-y-2">
          <div class="flex items-center gap-1 h-1.5">
            <div class="flex items-center gap-1">
              <span class="block size-[5px] rounded-full bg-current"></span>
              <span class="block size-[5px] rounded-full bg-current opacity-40"></span>
              <span class="block size-[5px] rounded-full bg-current opacity-40"></span>
            </div>
            <div class="flex-1 h-px bg-current"></div>
          </div>
          <h2 class="text-headline-md font-display font-bold">Ingredientes</h2>
        </a>
        <div class="flex flex-col gap-4 mt-4">
          <!-- News Card 2.0 / Boxed (Figma 973:6775) -->
          <a href="/src/layouts/conteudo.php" class="group relative flex flex-col justify-end rounded-sm overflow-hidden border-b-4 border-mint w-full aspect-[392/262]">
            <img src="https://picsum.photos/seed/ing-boxed/784/524" alt="Capa" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
            <div class="absolute top-2 right-2 bg-white rounded-sm p-2 flex flex-col gap-1 items-end z-10">
              <p class="font-body font-semibold text-label-sm text-neutral-900">Conteúdo Patrocinado</p>
              <p class="font-display font-bold text-title-md text-secondary-950">Company Name</p>
            </div>
            <div class="relative bg-black/60 px-4 py-3 w-full z-10">
              <h3 class="font-display font-bold text-title-md text-white leading-snug line-clamp-3">Suplemento em gomas: a doce revolução que está transformando o mercado de nutrição</h3>
            </div>
          </a>
          <!-- 4 News Cards Small H -->
          <?php
          $ingredientes_cards = [
            ['seed' => 'ing1', 'cat' => 'Ingredientes', 'title' => 'Alimentos para gamers: ingredientes que melhoram foco e desempenho'],
            ['seed' => 'ing2', 'cat' => 'Ingredientes', 'title' => 'Levar biotecnologia de laboratório à fábrica e escalar desafios, dúvidas sem...'],
            ['seed' => 'ing3', 'cat' => 'Ingredientes', 'title' => 'A novo selo modelo: A economia da nutrição personalizada no Brasil'],
            ['seed' => 'ing4', 'cat' => 'Ingredientes', 'title' => 'Sustentabilidade na moda: novos materiais são feitos com fibras de...'],
          ];
          foreach ($ingredientes_cards as $card): ?>
          <article class="group flex flex-row items-center gap-4 w-full">
            <div class="shrink-0 w-[120px]">
              <?php get_template_part('components/_partials/thumbnail', null, [
                'src' => 'https://picsum.photos/seed/' . $card['seed'] . '/240/135', 'alt' => 'Capa',
                'href' => '/src/layouts/conteudo.php', 'ratio' => 'video', 'play' => '',
              ]); ?>
            </div>
            <div class="flex flex-col gap-1 flex-1 min-w-0">
              <?php get_template_part('components/_partials/categoria', null, [
                'color' => 'mint', 'chip' => 'off', 'label' => $card['cat'], 'href' => '/src/layouts/categoria.php',
              ]); ?>
              <h3 class="text-title-md font-display font-bold text-primary-600 leading-tight">
                <a href="/src/layouts/conteudo.php" class="group-hover:text-secondary-950 transition-colors"><?php echo $card['title']; ?></a>
              </h3>
            </div>
          </article>
          <?php endforeach; ?>
        </div>
      </div>

      <!-- Col 2 — Food Service -->
      <div class="flex flex-col pt-10">
        <a href="/src/layouts/categoria.php" class="group block text-primary-600 no-underline hover:opacity-75 transition-opacity space-y-2">
          <div class="flex items-center gap-1 h-1.5">
            <div class="flex items-center gap-1">
              <span class="block size-[5px] rounded-full bg-current"></span>
              <span class="block size-[5px] rounded-full bg-current opacity-40"></span>
              <span class="block size-[5px] rounded-full bg-current opacity-40"></span>
            </div>
            <div class="flex-1 h-px bg-current"></div>
          </div>
          <h2 class="text-headline-md font-display font-bold">Food Service</h2>
        </a>
        <div class="flex flex-col gap-4 mt-4">
          <!-- News Card 2.0 / Boxed (Figma 973:6783) -->
          <a href="/src/layouts/conteudo.php" class="group relative flex flex-col justify-end rounded-sm overflow-hidden border-b-4 border-mint w-full aspect-[392/262]">
            <img src="https://picsum.photos/seed/fs-boxed/784/524" alt="Capa" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
            <div class="absolute top-2 right-2 bg-white rounded-sm p-2 flex flex-col gap-1 items-end z-10">
              <p class="font-body font-semibold text-label-sm text-neutral-900">Conteúdo Patrocinado</p>
              <p class="font-display font-bold text-title-md text-secondary-950">Company Name</p>
            </div>
            <div class="relative bg-black/60 px-4 py-3 w-full z-10">
              <h3 class="font-display font-bold text-title-md text-white leading-snug line-clamp-3">Análise essencial: saiba como as crises internacionais impactam a indústria de alimentos</h3>
            </div>
          </a>
          <!-- 4 News Cards Small H -->
          <?php
          $foodservice_cards = [
            ['seed' => 'fs1', 'title' => 'Padrão de atendimento no food service: dicas para aplicar no seu negócio'],
            ['seed' => 'fs2', 'title' => 'Do público certo a operação eficiente: o caminho para tornar mais o seu food service'],
            ['seed' => 'fs3', 'title' => 'Como a realidade aumentada está moldando a percepção de sabor no food...'],
            ['seed' => 'fs4', 'title' => 'Tendências sustentáveis na indústria de embalagens: inovações e oportunidades de...'],
          ];
          foreach ($foodservice_cards as $card): ?>
          <article class="group flex flex-row items-center gap-4 w-full">
            <div class="shrink-0 w-[120px]">
              <?php get_template_part('components/_partials/thumbnail', null, [
                'src' => 'https://picsum.photos/seed/' . $card['seed'] . '/240/135', 'alt' => 'Capa',
                'href' => '/src/layouts/conteudo.php', 'ratio' => 'video', 'play' => '',
              ]); ?>
            </div>
            <div class="flex flex-col gap-1 flex-1 min-w-0">
              <?php get_template_part('components/_partials/categoria', null, [
                'color' => 'primary-600', 'chip' => 'off', 'label' => 'Food Service', 'href' => '/src/layouts/categoria.php',
              ]); ?>
              <h3 class="text-title-md font-display font-bold text-primary-600 leading-tight">
                <a href="/src/layouts/conteudo.php" class="group-hover:text-secondary-950 transition-colors"><?php echo $card['title']; ?></a>
              </h3>
            </div>
          </article>
          <?php endforeach; ?>
        </div>
      </div>

      <!-- Col 3 — Widget Em Alta + Ad -->
      <div class="flex flex-col gap-6 pt-10">
        <!-- Widget Em Alta (inline — reutiliza padrão do showcase) -->
        <aside class="bg-neutral-50 border border-neutral-100 flex flex-col items-start overflow-hidden pb-4 rounded-lg w-full">
          <div class="flex items-center p-6 w-full">
            <p class="flex-1 font-display font-bold text-title-xl text-primary-600 leading-7">Em Alta</p>
          </div>
          <div class="flex flex-col items-start w-full">
            <?php
            $emalta_items = [
              'Alimentos para gamers: ingredientes que melhoram foco e desempenho',
              'Nutrição de precisão: o que é, como funciona e as transformações na indústria de alimentos',
              'Para 2026, a trajetória dos sucos se encontra no caminho entre a tradição e a inovação',
              'Design higiênico: pilar estratégico para o futuro da indústria alimentícia',
              'Levedura e fungos: inovação em proteínas alternativas',
            ];
            foreach ($emalta_items as $i => $title): ?>
            <div class="flex flex-col gap-4 items-start py-2 px-6 w-full">
              <div class="group flex font-display font-bold gap-4 items-start w-full">
                <p class="text-display-sm text-neutral-900 whitespace-nowrap leading-[44px]"><?php echo $i + 1; ?></p>
                <p class="flex-1 font-display font-bold text-title-lg text-primary-600 group-hover:text-secondary-950 transition-colors leading-6"><?php echo $title; ?></p>
              </div>
              <?php if ($i < 4): ?>
              <?php get_template_part('components/_partials/divider', null, ['orientation' => 'horizontal']); ?>
              <?php endif; ?>
            </div>
            <?php endforeach; ?>
          </div>
        </aside>
        <!-- Ad sidebar (FIB revista) -->
        <div class="border border-primary-100 bg-neutral-50 flex items-center justify-center rounded-sm h-[282px] w-full">
          <span class="font-body font-bold text-label-md text-neutral-700">300 × 250</span>
        </div>
      </div>

    </div>
  </section>

  <!-- ============================================================
       §4 — Proteína Animal
       Figma: 973:6821 (1920×504)
       Section Title Style 2 + 4 cards (3 regulares + 1 patrocinado)
       ============================================================ -->
  <section class="w-full">
    <!-- Section Title Style 2 — Coral -->
    <div class="flex flex-col items-center pt-10 w-full">
      <div class="flex flex-col gap-2 items-start max-w-screen-xl mx-auto w-full px-4 lg:px-6">
        <div class="flex items-center w-full">
          <div class="flex-1 h-px bg-coral"></div>
        </div>
        <div class="flex h-[72px] items-center w-full">
          <h2 class="flex-1 text-center font-display font-bold text-headline-md text-coral">Proteína Animal</h2>
        </div>
      </div>
    </div>
    <div class="max-w-screen-xl mx-auto px-4 lg:px-6 grid grid-cols-4 gap-6">
      <?php
      $proteina_cards = [
        ['seed' => 'prot1', 'title' => 'Vantagens da energia solar para abatedouros e frigoríficos'],
        ['seed' => 'prot2', 'title' => 'Logística de carnes congeladas: como a indústria pode garantir qualidade na proteína animal'],
        ['seed' => 'prot3', 'title' => 'Desvendando a cadeia de frio: insights de especialistas sobre transporte refrigerado'],
      ];
      foreach ($proteina_cards as $card): ?>
      <article class="group flex flex-col gap-3">
        <?php get_template_part('components/_partials/thumbnail', null, [
          'src' => 'https://picsum.photos/seed/' . $card['seed'] . '/600/338', 'alt' => 'Capa',
          'href' => '/src/layouts/conteudo.php', 'ratio' => 'video', 'play' => '',
        ]); ?>
        <div class="flex flex-col gap-1">
          <h3 class="text-title-md font-display font-bold text-primary-600 leading-tight">
            <a href="/src/layouts/conteudo.php" class="group-hover:text-secondary-950 transition-colors"><?php echo $card['title']; ?></a>
          </h3>
        </div>
      </article>
      <?php endforeach; ?>
      <!-- News Card Small V -->
      <article class="group flex flex-col gap-3">
        <?php get_template_part('components/_partials/thumbnail', null, [
          'src' => 'https://picsum.photos/seed/prot4/600/338', 'alt' => 'Capa',
          'href' => '/src/layouts/conteudo.php', 'ratio' => 'video', 'play' => '',
        ]); ?>
        <div class="flex flex-col gap-1">
          <h3 class="text-title-md font-display font-bold text-primary-600 leading-tight">
            <a href="/src/layouts/conteudo.php" class="group-hover:text-secondary-950 transition-colors">Diferenças entre armazenagem refrigerada, congelada e seca</a>
          </h3>
        </div>
      </article>
    </div>
  </section>

  <!-- ============================================================
       §5 — Download Section
       Figma: 1135:18414 (1920×460)
       ============================================================ -->
  <section class="relative w-full h-[460px] overflow-hidden mt-10">
    <img src="https://picsum.photos/seed/download-bg/1920/460" alt="" class="absolute inset-0 w-full h-full object-cover" aria-hidden="true">
    <div class="absolute inset-0 bg-black/20"></div>
    <div class="relative h-full flex items-center max-w-screen-xl mx-auto px-4 lg:px-6 py-8">
      <div class="bg-white/80 flex flex-col gap-6 items-start max-w-[704px] p-8 rounded-sm w-[600px]">
        <span class="bg-white inline-flex items-center justify-center px-2 py-1 rounded-sm">
          <p class="font-body font-semibold text-label-md text-primary-600">E-book gratuito</p>
        </span>
        <div class="flex flex-col gap-2 items-start text-primary-600 w-full">
          <h2 class="font-display font-bold text-display-sm w-full">
            Como a rastreabilidade reduz custos e aumenta a margem de lucro
          </h2>
          <p class="font-body text-body-lg w-full">
            Saiba como a cadeia de produção está sendo otimizada até o atacarejo com rastreabilidade e as tecnologias envolvidas nesse processo.
          </p>
        </div>
        <a href="/src/layouts/form-download.php" class="bg-primary-600 inline-flex items-center justify-center gap-3 pl-5 pr-6 py-3 rounded-full text-white hover:bg-secondary-950 transition-colors font-body font-bold text-body-lg">
          <svg class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
          Baixar agora
        </a>
      </div>
    </div>
  </section>

  <!-- ============================================================
       §6 — Ad Frame (970×90)
       ============================================================ -->
  <section class="flex flex-col items-center py-10 w-full">
    <div class="border border-primary-100 bg-neutral-50 flex items-center justify-center h-[90px] w-[970px]">
      <span class="font-body font-bold text-label-md text-neutral-700">970 × 90</span>
    </div>
  </section>

  <!-- ============================================================
       §7 — Webstories
       Figma: 973:6839 (1920×678)
       Section Title Style 1 + 4 webstories
       ============================================================ -->
  <section class="w-full">
    <?php get_template_part('components/_partials/section-title', null, [
      'label' => 'Webstories', 'color' => 'primary-600', 'href' => '/src/layouts/categoria.php', 'uppercase' => 'off',
    ]); ?>
    <div class="max-w-screen-xl mx-auto px-4 lg:px-6 mt-6 flex gap-6 overflow-x-auto pb-2">
      <?php
      $webstories = [
        ['seed' => 'ws-h1', 'color' => 'mint',    'label' => 'Categoria', 'title' => 'Cultura de inovação como motor da produtividade e inovação'],
        ['seed' => 'ws-h2', 'color' => 'coral',   'label' => 'Food Service', 'title' => 'Como usar dados do consumidor para melhorar a experiência do cliente no food service'],
        ['seed' => 'ws-h3', 'color' => 'saffron', 'label' => 'Ingredientes', 'title' => 'Análise sensorial com IA: como funciona, aplicações na indústria de alimentos'],
        ['seed' => 'ws-h4', 'color' => 'primary-600', 'label' => 'Proteína SAE', 'title' => 'Design higiênico: pilar estratégico para a indústria e a salamandrina'],
      ];
      foreach ($webstories as $ws): ?>
      <a href="/src/layouts/conteudo.php" class="group shrink-0 w-[288px] aspect-[320/569] relative rounded-sm overflow-hidden">
        <img src="https://picsum.photos/seed/<?php echo $ws['seed']; ?>/640/1138" alt="Story" class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
        <div class="absolute inset-0 flex flex-col justify-between">
          <div class="flex flex-col items-start p-5">
            <?php /* categoria sem href: a tag viraria <a> aninhado dentro do card-wrapper <a>, invalidando o HTML */ ?>
            <?php get_template_part('components/_partials/categoria', null, [
              'color' => $ws['color'], 'chip' => 'on', 'label' => $ws['label'], 'href' => null,
            ]); ?>
          </div>
          <div class="bg-primary-600/70 group-hover:bg-gradient-to-b group-hover:from-primary-600/0 group-hover:via-primary-600/70 group-hover:to-primary-600 flex flex-col gap-2 items-start px-5 py-4 w-full">
            <h3 class="font-display font-bold text-title-md text-white w-full"><?php echo $ws['title']; ?></h3>
          </div>
        </div>
      </a>
      <?php endforeach; ?>
    </div>
  </section>

  <!-- ============================================================
       §8 — Vídeos (bg escuro)
       Figma: 2837:3273 (1920×756)
       1 Video Card Inverse Large V + 3 Small H stacked
       ============================================================ -->
  <section class="w-full bg-primary-600 mt-6">
    <div class="max-w-screen-xl mx-auto px-4 lg:px-6 py-10">
      <!-- Section Title (white) -->
      <div class="w-full space-y-2 mb-6">
        <div class="flex items-center gap-1 h-1.5 text-white">
          <div class="flex items-center gap-1">
            <span class="block size-[5px] rounded-full bg-current"></span>
            <span class="block size-[5px] rounded-full bg-current opacity-40"></span>
            <span class="block size-[5px] rounded-full bg-current opacity-40"></span>
          </div>
          <div class="flex-1 h-px bg-current"></div>
        </div>
        <h2 class="text-headline-md font-display font-bold text-white">Vídeos</h2>
      </div>

      <div class="grid grid-cols-2 gap-6">
        <!-- Large V -->
        <article class="group flex flex-col gap-3">
          <?php get_template_part('components/_partials/thumbnail', null, [
            'src' => 'https://picsum.photos/seed/vid-hero/1200/675', 'alt' => 'Capa do vídeo',
            'href' => '/src/layouts/conteudo.php', 'ratio' => 'video', 'play' => 'small',
          ]); ?>
          <div class="flex flex-col gap-2 items-start">
            <?php get_template_part('components/_partials/categoria', null, [
              'color' => 'mint', 'chip' => 'on', 'label' => 'Categoria', 'href' => '/src/layouts/categoria.php',
            ]); ?>
            <h3 class="text-headline-md font-display font-bold text-white group-hover:text-primary-100">
              <a href="/src/layouts/conteudo.php">Como fazer um plano de logística integrada na indústria de alimentos</a>
            </h3>
            <p class="text-body-lg font-body text-neutral-50">Entenda os métodos da logística de alimentos com planejamento, análise, integração de sistemas e ações de contingência.</p>
          </div>
        </article>

        <!-- 3 Small H stacked -->
        <div class="flex flex-col gap-6">
          <?php
          $videos = [
            ['seed' => 'vid1', 'cat' => 'Proteína Animal', 'title' => 'Balcão de açougue: qual é a temperatura ideal para carnes expostas'],
            ['seed' => 'vid2', 'cat' => 'Ingredientes', 'title' => 'Setor de sorvetes cresce, investe pesado e projeta aceleração em 2026'],
            ['seed' => 'vid3', 'cat' => 'Food Service', 'title' => 'Tendência de fermentados exóticos: kimchi, missô e kombucha'],
          ];
          foreach ($videos as $vid): ?>
          <article class="group flex flex-row gap-4 items-center w-full">
            <div class="shrink-0 w-[160px]">
              <?php get_template_part('components/_partials/thumbnail', null, [
                'src' => 'https://picsum.photos/seed/' . $vid['seed'] . '/320/180', 'alt' => 'Capa do vídeo',
                'href' => '/src/layouts/conteudo.php', 'ratio' => 'video', 'play' => 'xsmall',
              ]); ?>
            </div>
            <div class="flex flex-col gap-1 flex-1 min-w-0 justify-center items-start">
              <?php get_template_part('components/_partials/categoria', null, [
                'color' => 'mint', 'chip' => 'on', 'label' => $vid['cat'], 'href' => '/src/layouts/categoria.php',
              ]); ?>
              <h3 class="text-title-md font-display font-bold text-white group-hover:text-primary-100 leading-tight">
                <a href="/src/layouts/conteudo.php"><?php echo $vid['title']; ?></a>
              </h3>
            </div>
          </article>
          <?php endforeach; ?>
        </div>
      </div>
    </div>
  </section>

  <!-- ============================================================
       §9 — Fispal Tecnologia
       Figma: 973:6857 (1920×646)
       Section Title Style 1 + 3 cards (1 patrocinado + 2 regulares)
       ============================================================ -->
  <section class="w-full">
    <?php get_template_part('components/_partials/section-title', null, [
      'label' => 'Fispal Tecnologia', 'color' => 'primary-600', 'href' => '/src/layouts/categoria.php', 'uppercase' => 'off',
    ]); ?>
    <div class="max-w-screen-xl mx-auto px-4 lg:px-6 mt-6 grid grid-cols-3 gap-6">
      <!-- News Card Medium V -->
      <article class="group flex flex-col gap-3">
        <?php get_template_part('components/_partials/thumbnail', null, [
          'src' => 'https://picsum.photos/seed/fispal1/800/450', 'alt' => 'Capa',
          'href' => '/src/layouts/conteudo.php', 'ratio' => 'video', 'play' => '',
        ]); ?>
        <div class="flex flex-col gap-2">
          <?php get_template_part('components/_partials/categoria', null, [
            'color' => 'saffron', 'chip' => 'off', 'label' => 'Fispal Tecnologia', 'href' => '/src/layouts/categoria.php',
          ]); ?>
          <h3 class="text-title-xl font-display font-bold text-primary-600">
            <a href="/src/layouts/conteudo.php" class="group-hover:text-secondary-950 transition-colors">Fispal Tecnologia 2025: indústria mostra como está enfrentando a era da IA</a>
          </h3>
          <p class="text-body-md font-body text-neutral-900 group-hover:text-neutral-950 transition-colors">Nestlé, BRF, JBS, Braun, Siemens, Mitsubishi e outras marcas apresentaram na Fispal 2025 inovações em IA e outras tecnologias.</p>
          <?php get_template_part('components/_partials/byline', null, [
            'author' => 'Author Name', 'href' => '/src/layouts/categoria.php', 'size' => 'md',
          ]); ?>
        </div>
      </article>
      <!-- Card 2 -->
      <article class="group flex flex-col gap-3">
        <?php get_template_part('components/_partials/thumbnail', null, [
          'src' => 'https://picsum.photos/seed/fispal2/800/450', 'alt' => 'Capa',
          'href' => '/src/layouts/conteudo.php', 'ratio' => 'video', 'play' => '',
        ]); ?>
        <div class="flex flex-col gap-2">
          <?php get_template_part('components/_partials/categoria', null, [
            'color' => 'saffron', 'chip' => 'off', 'label' => 'Embalagens', 'href' => '/src/layouts/categoria.php',
          ]); ?>
          <h3 class="text-title-xl font-display font-bold text-primary-600">
            <a href="/src/layouts/conteudo.php" class="group-hover:text-secondary-950 transition-colors">Embalagens flexíveis: mercado cresce impulsionado por inovação e consumo consciente</a>
          </h3>
          <p class="text-body-md font-body text-neutral-900 group-hover:text-neutral-950 transition-colors">Novos materiais para atender consumidores cada vez mais exigentes no cenário atual de inovação.</p>
        </div>
      </article>
      <!-- Card 3 -->
      <article class="group flex flex-col gap-3">
        <?php get_template_part('components/_partials/thumbnail', null, [
          'src' => 'https://picsum.photos/seed/fispal3/800/450', 'alt' => 'Capa',
          'href' => '/src/layouts/conteudo.php', 'ratio' => 'video', 'play' => '',
        ]); ?>
        <div class="flex flex-col gap-2">
          <?php get_template_part('components/_partials/categoria', null, [
            'color' => 'secondary-950', 'chip' => 'off', 'label' => 'Tecnologia', 'href' => '/src/layouts/categoria.php',
          ]); ?>
          <h3 class="text-title-xl font-display font-bold text-primary-600">
            <a href="/src/layouts/conteudo.php" class="group-hover:text-secondary-950 transition-colors">Meu colega robô: WEG e Mitsubishi apostam em robôs que ajudam humanos</a>
          </h3>
          <p class="text-body-md font-body text-neutral-900 group-hover:text-neutral-950 transition-colors">A navegação inteligente de "colegas" de operação, robôs modulares na automação das linhas de produção.</p>
        </div>
      </article>
    </div>
  </section>

  <!-- ============================================================
       §10 — Banner Newsletter (photo variant)
       Figma: 1188:11672 (1920×427)
       ============================================================ -->
  <section class="w-full py-10">
    <div class="max-w-screen-xl mx-auto px-4 lg:px-6">
    <div class="bg-primary-100 flex items-center overflow-hidden rounded-sm w-full">
      <div class="aspect-[300/200] flex flex-col items-center justify-center overflow-hidden flex-1 min-w-0 self-stretch">
        <img src="https://picsum.photos/seed/banner-news-home/600/400" alt="" class="w-full h-full object-cover">
      </div>
      <div class="flex flex-1 flex-col items-start justify-center min-w-0">
        <div class="flex flex-col gap-4 items-start justify-center pb-4 pt-10 px-10 text-primary-600 w-full">
          <p class="font-display font-bold text-display-sm leading-[44px] w-full">
            O melhor conteúdo do setor alimentício, direto na sua caixa de entrada.
          </p>
          <p class="font-body text-body-lg w-full">
            Junte-se a milhares de construtores que já assinam nossa newsletter gratuita.
          </p>
        </div>
        <div class="flex flex-col h-24 items-start pb-10 pt-4 px-10 w-full">
          <a href="#" class="bg-primary-600 inline-flex items-center justify-center px-6 py-3 rounded-full text-white hover:bg-secondary-950 transition-colors font-body font-bold text-body-lg">
            Lorem ipsum
          </a>
        </div>
      </div>
    </div>
    </div>
  </section>

  <!-- ============================================================
       §12 — Ad Frame (970×90)
       ============================================================ -->
  <section class="flex flex-col items-center py-10 w-full">
    <div class="border border-primary-100 bg-neutral-50 flex items-center justify-center h-[90px] w-[970px]">
      <span class="font-body font-bold text-label-md text-neutral-700">970 × 90</span>
    </div>
  </section>

  <!-- ============================================================
       §13 — News + Podcasts
       Figma: 973:6880 (1920×954)
       Left: 1 patrocinado H + 3 news H (704w)
       Right: Widget Podcast (496w)
       ============================================================ -->
  <section class="w-full">
    <div class="max-w-screen-xl mx-auto px-4 lg:px-6 py-10 flex gap-6">

      <!-- Left — News list (704w) -->
      <div class="flex flex-col gap-8 flex-1">
        <!-- News Card Large H -->
        <article class="group flex flex-row items-center gap-6 w-full">
          <div class="shrink-0 w-[288px]">
            <?php get_template_part('components/_partials/thumbnail', null, [
              'src' => 'https://picsum.photos/seed/nwp-s1/600/338', 'alt' => 'Capa',
              'href' => '/src/layouts/conteudo.php', 'ratio' => 'video', 'play' => '',
            ]); ?>
          </div>
          <div class="flex flex-col gap-2 flex-1 min-w-0">
            <?php get_template_part('components/_partials/categoria', null, [
              'color' => 'mint', 'chip' => 'off', 'label' => 'Categoria', 'href' => '/src/layouts/categoria.php',
            ]); ?>
            <h3 class="text-title-xl font-display font-bold text-primary-600">
              <a href="/src/layouts/conteudo.php" class="group-hover:text-secondary-950 transition-colors">Como fazer um plano de logística integrada na indústria de alimentos</a>
            </h3>
            <?php get_template_part('components/_partials/byline', null, [
              'author' => 'Author Name', 'href' => '/src/layouts/categoria.php', 'size' => 'md',
            ]); ?>
          </div>
        </article>
        <!-- 3 News Large H -->
        <?php
        $news_podcast = [
          ['seed' => 'nwp1', 'cat' => 'Proteína Animal', 'catcolor' => 'coral', 'title' => 'Balcão de açougue: qual é a temperatura ideal para carnes expostas', 'lead' => 'A temperatura adequada e determinantes em balcões para garantir qualidade e hermeticamente...'],
          ['seed' => 'nwp2', 'cat' => 'Ingredientes', 'catcolor' => 'mint', 'title' => 'Setor de sorvetes cresce, investe pesado e projeta aceleração em 2026', 'lead' => ''],
          ['seed' => 'nwp3', 'cat' => 'Food Service', 'catcolor' => 'primary-600', 'title' => 'Tendência de fermentados exóticos: kimchi, missô e kombucha', 'lead' => ''],
        ];
        foreach ($news_podcast as $card): ?>
        <article class="group flex flex-row items-center gap-6 w-full">
          <div class="shrink-0 w-[288px]">
            <?php get_template_part('components/_partials/thumbnail', null, [
              'src' => 'https://picsum.photos/seed/' . $card['seed'] . '/600/338', 'alt' => 'Capa',
              'href' => '/src/layouts/conteudo.php', 'ratio' => 'video', 'play' => '',
            ]); ?>
          </div>
          <div class="flex flex-col gap-2 flex-1 min-w-0">
            <?php get_template_part('components/_partials/categoria', null, [
              'color' => $card['catcolor'], 'chip' => 'off', 'label' => $card['cat'], 'href' => '/src/layouts/categoria.php',
            ]); ?>
            <h3 class="text-title-xl font-display font-bold text-primary-600">
              <a href="/src/layouts/conteudo.php" class="group-hover:text-secondary-950 transition-colors"><?php echo $card['title']; ?></a>
            </h3>
            <?php if ($card['lead']): ?>
            <p class="text-body-md font-body text-neutral-900 group-hover:text-neutral-950 transition-colors"><?php echo $card['lead']; ?></p>
            <?php endif; ?>
          </div>
        </article>
        <?php endforeach; ?>
      </div>

      <!-- Right — Widget Podcast (496w) -->
      <aside class="bg-neutral-50 border border-neutral-100 flex flex-col items-start overflow-hidden pb-2 rounded-lg w-[496px] shrink-0 self-start">
        <div class="flex items-center p-6 w-full">
          <p class="flex-1 font-display font-bold text-title-xl text-primary-600 leading-7">Podcasts</p>
        </div>
        <div class="flex flex-col items-start w-full">
          <!-- Item 1 — Patrocinado -->
          <div class="flex flex-col items-start justify-center overflow-hidden py-2 px-6 rounded-lg w-full">
            <div class="bg-white border border-neutral-100 flex flex-col items-start rounded-lg w-full">
              <div class="group flex items-center p-3 w-full">
                <div class="rounded-sm overflow-hidden size-[104px] shrink-0">
                  <img src="https://picsum.photos/seed/pod1/208/208" alt="Capa podcast" class="w-full h-full object-cover">
                </div>
                <div class="flex flex-1 flex-col gap-2 items-start min-w-0 px-4">
                  <span class="font-body font-semibold text-label-md text-mint">Food Service</span>
                  <p class="font-display font-bold text-title-md text-primary-600 group-hover:text-secondary-950 transition-colors line-clamp-3 w-full">
                    Meu colega robô: WEG e Mitsubishi apostam em robôs que ajudam humanos
                  </p>
                </div>
              </div>
              <?php get_template_part('components/_partials/divider', null, ['orientation' => 'horizontal']); ?>
              <div class="flex flex-wrap gap-y-1 items-center justify-between px-4 py-3 w-full">
                <p class="font-body font-semibold text-label-sm text-neutral-900 whitespace-nowrap">Conteúdo Patrocinado</p>
                <a href="#" class="font-display font-bold text-title-md text-secondary-950 hover:underline whitespace-nowrap">Company Name</a>
              </div>
            </div>
          </div>
          <!-- Items 2-4 -->
          <?php
          $podcasts = [
            ['seed' => 'pod2', 'cat' => 'Ingredientes', 'title' => 'Design higiênico: pilar estratégico para o futuro da indústria alimentícia'],
            ['seed' => 'pod3', 'cat' => 'Food Service', 'title' => 'Como usar dados de consumidor para melhorar a experiência do cliente no food service'],
            ['seed' => 'pod4', 'cat' => 'Tecnologia', 'title' => 'Tecnologias verdes: como a sustentabilidade está moldando o futuro da produção'],
          ];
          foreach ($podcasts as $pod): ?>
          <div class="group flex gap-4 items-center py-3 px-6 w-full">
            <div class="rounded-sm overflow-hidden size-[104px] shrink-0">
              <img src="https://picsum.photos/seed/<?php echo $pod['seed']; ?>/208/208" alt="Capa podcast" class="w-full h-full object-cover">
            </div>
            <div class="flex flex-1 flex-col gap-2 items-start min-w-0">
              <span class="font-body font-semibold text-label-md text-mint"><?php echo $pod['cat']; ?></span>
              <p class="font-display font-bold text-title-md text-primary-600 group-hover:text-secondary-950 transition-colors line-clamp-3 w-full"><?php echo $pod['title']; ?></p>
            </div>
          </div>
          <?php endforeach; ?>
        </div>
        <!-- Divider -->
        <div class="flex flex-col items-start py-2 px-6 w-full">
          <?php get_template_part('components/_partials/divider', null, ['orientation' => 'horizontal']); ?>
        </div>
        <!-- Footer button -->
        <div class="flex flex-col items-start p-2 w-full">
          <a href="/src/layouts/categoria.php" class="inline-flex gap-2 items-center justify-center px-5 pr-4 py-2 rounded-full text-primary-600 hover:bg-neutral-100 font-body font-bold text-body-lg">
            Todos os episódios
            <svg class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
          </a>
        </div>
      </aside>

    </div>
  </section>

  <!-- ============================================================
       §14 — Especialistas
       Figma: 2954:6580 (1920×395)
       Section Title Style 2 + 3 Card Colunista + nav arrows
       ============================================================ -->
  <section class="w-full" data-component="carousel">
    <!-- Section Title Style 1 + nav arrows -->
    <div class="block text-primary-600 w-full pt-10">
      <div class="max-w-screen-xl mx-auto px-4 lg:px-6 space-y-2">
        <div class="flex items-center gap-1 h-1.5">
          <div class="flex items-center gap-1">
            <span class="block size-[5px] rounded-full bg-current"></span>
            <span class="block size-[5px] rounded-full bg-current opacity-40"></span>
            <span class="block size-[5px] rounded-full bg-current opacity-40"></span>
          </div>
          <div class="flex-1 h-px bg-current"></div>
        </div>
        <div class="flex items-center gap-4">
          <h2 class="flex-1 text-headline-md font-display font-bold">Especialistas</h2>
          <div class="flex gap-2 items-center shrink-0">
            <button type="button" aria-label="Anterior" data-action="carousel-prev" class="border border-neutral-100 inline-flex items-center justify-center p-2 rounded-full text-primary-600 hover:border-primary-600 transition-colors">
              <svg class="size-8" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
            </button>
            <button type="button" aria-label="Próximo" data-action="carousel-next" class="border border-primary-600 inline-flex items-center justify-center p-2 rounded-full text-primary-600 hover:bg-primary-600 hover:text-white transition-colors">
              <svg class="size-8" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Card Colunista carousel -->
    <div class="max-w-screen-xl mx-auto px-4 lg:px-6 mt-6 relative overflow-hidden h-[224px]">
      <!-- Carousel track -->
      <div class="absolute top-0 left-0 flex gap-6 transition-transform duration-500 ease-in-out" data-el="carousel-track" style="transform:translateX(0)">
        <?php
        $especialistas = [
          ['img' => '14', 'name' => 'Augusto Zarpon', 'role' => 'Especialista em melhoria contínua', 'quote' => 'A embalagem que protege seu alimento e a eficiência da sua fábrica'],
          ['img' => '33', 'name' => 'Alessandra Gaidargi', 'role' => 'Jornalista especialista em alimentação', 'quote' => 'Desafio do food service: Cardápios Kids saudáveis'],
          ['img' => '52', 'name' => 'Luis Fernando Nardi', 'role' => 'Especialista em franchising de food service', 'quote' => 'Guerra pela atenção: como os restaurantes estão vencendo com criatividade, tecnologia e parcerias inéditas'],
          ['img' => '44', 'name' => 'Bethânia Vargas', 'role' => 'Head de Projetos e Regulatórios na Pronutrition', 'quote' => 'As fibras serão a nova proteína? O próximo ciclo de protagonismo na nutrição funcional'],
          ['img' => '68', 'name' => 'Victor Santos', 'role' => 'CEO e cofundador da Liv Up', 'quote' => 'Personalização é a chave para atrair os consumidores brasileiros'],
          ['img' => '26', 'name' => 'Eugenia Muinelo', 'role' => 'Gerente de Assuntos Regulatórios', 'quote' => 'Argentina aprova novos ingredientes em suplementos alimentares'],
        ];
        foreach ($especialistas as $esp): ?>
        <article class="group bg-white border border-neutral-100 hover:bg-neutral-50 hover:border-primary-600 transition-colors flex flex-col items-start justify-center rounded-sm overflow-hidden shrink-0 w-[392px]">
          <div class="flex items-center w-full">
            <div class="flex items-center p-3">
              <div class="border border-neutral-50 rounded-sm size-[104px] overflow-hidden">
                <img src="https://i.pravatar.cc/208?img=<?php echo $esp['img']; ?>" alt="Foto" class="w-full h-full object-cover">
              </div>
            </div>
            <div class="flex flex-col flex-1 justify-center min-w-0 pl-2 pr-4 py-4">
              <p class="font-display font-bold text-title-lg text-secondary-950 truncate w-full">
                <a href="/src/layouts/categoria.php" class="hover:underline"><?php echo $esp['name']; ?></a>
              </p>
              <p class="font-body text-body-md text-neutral-900 truncate w-full"><?php echo $esp['role']; ?></p>
            </div>
          </div>
          <div class="flex flex-col items-start justify-end h-24 p-4 w-full">
            <p class="font-display font-bold text-title-md text-primary-600 line-clamp-3 w-full"><?php echo $esp['quote']; ?></p>
          </div>
        </article>
        <?php endforeach; ?>
      </div>
      <!-- Edge gradients -->
      <div class="absolute inset-y-0 left-0 w-[86px] bg-gradient-to-r from-white to-transparent pointer-events-none opacity-0 transition-opacity" data-el="carousel-gradient-left"></div>
      <div class="absolute inset-y-0 right-0 w-[79px] bg-gradient-to-l from-white to-transparent pointer-events-none" data-el="carousel-gradient-right"></div>
    </div>
  </section>

  <!-- ============================================================
       §15 — Última seção
       Figma: 973:7005 (1920×752)
       Section Title Style 1 + grid: 1 Patrocinado Large V (600) + 2×2 grid (288)
       ============================================================ -->
  <section class="w-full">
    <?php get_template_part('components/_partials/section-title', null, [
      'label' => 'Fispal Food Tecnologia', 'color' => 'primary-600', 'href' => '/src/layouts/categoria.php', 'uppercase' => 'off',
    ]); ?>
    <div class="max-w-screen-xl mx-auto px-4 lg:px-6 mt-6 grid grid-cols-[600px_1fr] gap-6">

      <!-- Left — News Card Large V -->
      <article class="group flex flex-col gap-3">
        <?php get_template_part('components/_partials/thumbnail', null, [
          'src' => 'https://picsum.photos/seed/last-hero/1200/675', 'alt' => 'Capa',
          'href' => '/src/layouts/conteudo.php', 'ratio' => 'video', 'play' => '',
        ]); ?>
        <div class="flex flex-col gap-2">
          <?php get_template_part('components/_partials/categoria', null, [
            'color' => 'saffron', 'chip' => 'off', 'label' => 'Fispal Tecnologia', 'href' => '/src/layouts/categoria.php',
          ]); ?>
          <h3 class="text-headline-md font-display font-bold text-primary-600">
            <a href="/src/layouts/conteudo.php" class="group-hover:text-secondary-950 transition-colors">Fispal Tecnologia 2025: indústria mostra como está enfrentando a era da IA</a>
          </h3>
          <p class="text-body-lg font-body text-neutral-900 group-hover:text-neutral-950 transition-colors">Nestlé, BRF, JBS, Braun, Siemens, Mitsubishi e outras marcas apresentaram inovações em IA e outras tecnologias.</p>
          <?php get_template_part('components/_partials/byline', null, [
            'author' => 'Author Name', 'href' => '/src/layouts/categoria.php', 'size' => 'md',
          ]); ?>
        </div>
      </article>

      <!-- Right — 2×2 grid -->
      <div class="grid grid-cols-2 gap-6">
        <!-- Top-left: News Card -->
        <article class="group flex flex-col gap-3">
          <?php get_template_part('components/_partials/thumbnail', null, [
            'src' => 'https://picsum.photos/seed/last2/600/338', 'alt' => 'Capa',
            'href' => '/src/layouts/conteudo.php', 'ratio' => 'video', 'play' => '',
          ]); ?>
          <div class="flex flex-col gap-1">
            <?php get_template_part('components/_partials/categoria', null, [
              'color' => 'saffron', 'chip' => 'off', 'label' => 'Embalagens', 'href' => '/src/layouts/categoria.php',
            ]); ?>
            <h3 class="text-title-md font-display font-bold text-primary-600 leading-tight">
              <a href="/src/layouts/conteudo.php" class="group-hover:text-secondary-950 transition-colors">Embalagens flexíveis: mercado cresce impulsionado por inovação e consumo consciente</a>
            </h3>
          </div>
        </article>
        <!-- Top-right: News Card Small V -->
        <article class="group flex flex-col gap-3">
          <?php get_template_part('components/_partials/thumbnail', null, [
            'src' => 'https://picsum.photos/seed/last3/600/338', 'alt' => 'Capa',
            'href' => '/src/layouts/conteudo.php', 'ratio' => 'video', 'play' => '',
          ]); ?>
          <div class="flex flex-col gap-1">
            <?php get_template_part('components/_partials/categoria', null, [
              'color' => 'secondary-950', 'chip' => 'off', 'label' => 'Tecnologia', 'href' => '/src/layouts/categoria.php',
            ]); ?>
            <h3 class="text-title-md font-display font-bold text-primary-600 leading-tight">
              <a href="/src/layouts/conteudo.php" class="group-hover:text-secondary-950 transition-colors">Meu colega robô: WEG e Mitsubishi apostam em robôs que ajudam humanos</a>
            </h3>
          </div>
        </article>
        <!-- Bottom-left: News Card -->
        <article class="group flex flex-col gap-3">
          <?php get_template_part('components/_partials/thumbnail', null, [
            'src' => 'https://picsum.photos/seed/last4/600/338', 'alt' => 'Capa',
            'href' => '/src/layouts/conteudo.php', 'ratio' => 'video', 'play' => '',
          ]); ?>
          <div class="flex flex-col gap-1">
            <h3 class="text-title-md font-display font-bold text-primary-600 leading-tight">
              <a href="/src/layouts/conteudo.php" class="group-hover:text-secondary-950 transition-colors">IA passa a prescrever soluções para "tumor" máquinas industriais</a>
            </h3>
          </div>
        </article>
        <!-- Bottom-right: Ad Frame -->
        <div class="border border-primary-100 bg-neutral-50 flex items-center justify-center rounded-sm aspect-[300/250]">
          <span class="font-body font-bold text-label-md text-neutral-700">300 × 250</span>
        </div>
      </div>

    </div>
  </section>

  <!-- ============================================================
       §18 — Footer
       ============================================================ -->
  <div class="mt-10">
    <?php get_template_part('components/_partials/footer-desktop', null, []); ?>
  </div>

  <?php render_session_toggle(); ?>

</main>
<script type="module" src="/src/assets/js/interactions.js"></script>
