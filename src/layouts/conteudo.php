<?php
/**
 * Layout: Conteúdo — Página interna de artigo/post
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=4179-32002
 * NodeId Desktop: 4179:32002 (1920×5160)
 *
 * Estrutura:
 *   §1  Header (partial)
 *   §2  Ad Frame 970×250 (leaderboard top)
 *   §3  Container 2-col: Article (704px) + Sidebar ads (496px)
 *       - Article Header: categoria + título display-sm + lead + author/date + share
 *       - Featured image 3:2
 *       - Body text (parágrafos + subheadings + imagem inline)
 *       - Tags
 *   §4  "Veja também" — Section Title Style 1 + 4 News Cards
 *   §5  Ad Frame 728×90
 *   §6  Footer (partial)
 *
 * Partials consumidos: header-desktop, footer-desktop, section-title,
 *   thumbnail, categoria, byline, tag, divider, avatar
 */
?>
<main class="bg-white">

  <?php
  $activeCategory = 'food-service';
  require_once __DIR__ . '/_session.php';
  get_template_part('components/_partials/header-desktop', null, $headerArgs);
  ?>

  <!-- ============================================================
       §2 — Ad Frame (970×250)
       ============================================================ -->
  <section class="flex flex-col items-center py-6 w-full">
    <div class="border border-primary-100 bg-neutral-50 flex items-center justify-center h-[250px] w-[970px]">
      <span class="font-body font-bold text-label-md text-neutral-700">970 × 250</span>
    </div>
  </section>

  <!-- ============================================================
       §3 — Article Container (2-col)
       ============================================================ -->
  <section class="w-full">
    <div class="max-w-screen-xl mx-auto px-4 lg:px-6 grid grid-cols-11 gap-6 items-start">

      <!-- Left — Article content (7 cols) -->
      <article class="col-span-7 flex flex-col items-start">

        <!-- Article Header -->
        <div class="flex flex-col gap-8 w-full">

          <!-- Title block -->
          <div class="flex flex-col gap-4 w-full">
            <?php get_template_part('components/_partials/categoria', null, [
              'color' => 'saffron', 'chip' => 'off', 'label' => 'Food Service', 'href' => '/src/layouts/categoria.php',
            ]); ?>
            <h1 class="font-display font-bold text-display-sm text-primary-600">Análise sensorial com IA: como funciona, aplicações na indústria de alimentos</h1>
            <p class="font-body text-body-lg text-neutral-900 tracking-[0.5px]">A análise sensorial com IA combina sensores digitais e algoritmos para avaliar sabor, aroma e textura em alimentos.</p>
          </div>

          <!-- Author row + share -->
          <div class="flex gap-8 items-center w-full">
            <!-- Author -->
            <div class="flex items-center gap-2 flex-1">
              <?php get_template_part('components/_partials/avatar', null, [
                'src' => 'https://i.pravatar.cc/80?img=12', 'alt' => 'Redação Food Connection',
                'size' => 'md', 'shape' => 'rounded',
              ]); ?>
              <div class="flex flex-col gap-1">
                <div class="flex flex-wrap gap-x-1 gap-y-0.5 items-center">
                  <span class="font-body font-semibold text-label-lg text-neutral-900">Por</span>
                  <a href="/src/layouts/categoria.php" class="font-body font-bold text-label-lg text-secondary-950 hover:underline">Redação Food Connection</a>
                </div>
                <div class="flex gap-1 items-center font-body font-semibold text-label-md text-neutral-900">
                  <span>dd/mm/aaaa 00h00</span>
                  <span>•</span>
                  <span>Atualizado há 22 horas</span>
                </div>
              </div>
            </div>
            <!-- Share widget -->
            <div class="flex gap-1 items-center shrink-0">
              <?php
              $share_icons = [
                ['icon' => 'print',     'label' => 'Imprimir'],
                ['icon' => 'whatsapp',  'label' => 'WhatsApp'],
                ['icon' => 'linkedin',  'label' => 'LinkedIn'],
                ['icon' => 'facebook',  'label' => 'Facebook'],
                ['icon' => 'twitter',   'label' => 'Twitter'],
                ['icon' => 'share',     'label' => 'Compartilhar'],
              ];
              foreach ($share_icons as $si):
                get_template_part('components/_partials/icon-button', null, [
                  'icon' => $si['icon'], 'type' => 'ghost', 'size' => 'large',
                  'label' => $si['label'], 'href' => '/src/layouts/categoria.php',
                ]);
              endforeach; ?>
            </div>
          </div>

        </div>

        <!-- Featured image -->
        <div class="mt-6 w-full">
          <?php get_template_part('components/_partials/thumbnail', null, [
            'src' => 'https://picsum.photos/seed/conteudo-hero/1408/939', 'alt' => 'Imagem de destaque',
            'href' => '', 'ratio' => '3:2', 'play' => '',
          ]); ?>
        </div>

        <!-- Body text -->
        <div class="mt-6 flex flex-col gap-9 w-full">

          <p class="font-body text-body-xl text-neutral-950">A análise sensorial é uma metodologia essencial na indústria alimentícia para medir atributos como sabor, aroma, textura e aparência. Tradicionalmente, ela depende de painéis humanos treinados, o que traz limitações de escala e subjetividade.</p>

          <p class="font-body text-body-xl text-neutral-950">Com o avanço da inteligência artificial, sensores eletrônicos — como narizes e línguas artificiais — associados a algoritmos de machine learning estão transformando a forma como avaliamos alimentos. A IA permite processar milhares de amostras com consistência, identificando padrões sutis que o paladar humano pode perder.</p>

          <h2 class="font-display font-bold text-headline-lg text-primary-600">Como funciona a análise sensorial com IA</h2>

          <p class="font-body text-body-xl text-neutral-950">O processo envolve três etapas: coleta de dados sensoriais por meio de dispositivos eletrônicos, treinamento do modelo de IA com datasets rotulados por painelistas humanos, e inferência em tempo real sobre novas amostras.</p>

          <h2 class="font-display font-bold text-headline-lg text-primary-600">Áreas de aplicação na indústria</h2>

          <p class="font-body text-body-xl text-neutral-950">As aplicações abrangem controle de qualidade em linhas de produção, desenvolvimento de novos produtos, detecção de adulteração e monitoramento de shelf-life. Empresas como Nestlé e Danone já utilizam IA sensorial em escala para garantir consistência global de seus produtos.</p>

          <!-- Inline image -->
          <figure class="w-full">
            <div class="aspect-video rounded-sm overflow-hidden bg-neutral-100">
              <img src="https://picsum.photos/seed/conteudo-inline/1408/792" alt="Imagem no artigo" class="w-full h-full object-cover">
            </div>
            <figcaption class="font-body font-semibold text-body-sm text-neutral-900 mt-2">Sensores eletrônicos analisam amostras em laboratório de alimentos.</figcaption>
          </figure>

          <h2 class="font-display font-bold text-headline-lg text-primary-600">Desafios e futuro</h2>

          <p class="font-body text-body-xl text-neutral-950">Apesar dos avanços, a calibração dos sensores e a representatividade dos dados de treinamento continuam sendo desafios. O futuro aponta para modelos multimodais que combinam dados sensoriais, visuais e químicos para uma avaliação holística do alimento.</p>

          <p class="font-body text-body-xl text-neutral-950">A integração com blockchain para rastreabilidade sensorial e a personalização de sabor via digital twins são tendências que devem ganhar tração nos próximos anos.</p>
        </div>

        <!-- Tags -->
        <div class="py-10 flex flex-col gap-2 w-full">
          <p class="font-display font-bold text-title-md text-neutral-950">Temas</p>
          <div class="flex flex-wrap gap-2">
            <?php
            $tags = ['Análise sensorial', 'IA', 'Indústria 4.0', 'Controle de qualidade', 'Food Tech'];
            foreach ($tags as $t): ?>
            <?php get_template_part('components/_partials/tag', null, [
              'label' => $t, 'href' => '/src/layouts/categoria.php',
            ]); ?>
            <?php endforeach; ?>
          </div>
        </div>

      </article>

      <!-- Right — Sidebar (4 cols) -->
      <aside class="col-span-4 flex flex-col gap-10">
        <!-- Widget "Em Alta" -->
        <div class="bg-neutral-50 border border-neutral-100 flex flex-col items-start overflow-hidden pb-4 rounded-lg w-full max-w-[392px]">
          <div class="flex items-center p-6 w-full">
            <p class="flex-1 font-display font-bold text-title-xl text-primary-600 leading-7">Em Alta</p>
          </div>
          <div class="flex flex-col items-start w-full">
            <?php
            $emalta = [
              'Alimentos para gamers: ingredientes que melhoram foco e desempenho',
              'Nutrição de precisão: o que é, como funciona',
              'Para 2026, a trajetória dos sucos se encontra entre tradição e inovação',
              'Design higiênico: pilar estratégico para o futuro da indústria',
              'Levedura e fungos: inovação em proteínas alternativas',
            ];
            foreach ($emalta as $i => $title): ?>
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
        </div>
        <!-- Banner Newsletter -->
        <div class="bg-primary-100 flex flex-col items-start overflow-hidden rounded-sm w-full max-w-[392px]">
          <div class="aspect-[3/2] w-full overflow-hidden bg-secondary-50">
            <img src="https://picsum.photos/seed/newsletter/600/400" alt="Newsletter" class="w-full h-full object-cover">
          </div>
          <div class="flex flex-col gap-4 pt-8 pb-4 px-6 text-primary-600">
            <h3 class="font-display font-bold text-headline-sm">Assine nossa Newsletter e fique por dentro de tudo do setor alimentício</h3>
            <p class="font-body text-body-lg">Fique ligado nas inovações, estratégias e oportunidades do setor com conteúdos selecionados pelo Food Connection.</p>
          </div>
          <div class="pt-4 pb-8 px-6 w-full [&>a]:w-full">
            <?php get_template_part('components/_partials/button', null, [
              'label' => 'Assine agora', 'href' => '#',
              'type' => 'filled', 'size' => 'large', 'icon' => 'none',
            ]); ?>
          </div>
        </div>
        <!-- Ad Frame 300×250 -->
        <div class="bg-white p-4 flex justify-center">
          <div class="border border-primary-100 bg-neutral-50 flex items-center justify-center h-[250px] w-[300px]">
            <span class="font-body font-bold text-label-md text-neutral-700">300 × 250</span>
          </div>
        </div>
      </aside>

    </div>
  </section>

  <!-- ============================================================
       §4 — Veja também
       Section Title Style 1 + 4 News Cards Small V
       ============================================================ -->
  <section class="w-full mt-10">
    <?php get_template_part('components/_partials/section-title', null, [
      'label' => 'Veja também', 'color' => 'primary-600', 'href' => null, 'uppercase' => 'off',
    ]); ?>
    <div class="max-w-screen-xl mx-auto px-4 lg:px-6 pt-6 pb-10 flex flex-wrap gap-x-6 gap-y-8">
      <?php
      $veja_tambem = [
        ['seed' => 'vt1', 'color' => 'saffron', 'cat' => 'Food Service', 'title' => 'Passo a passo para montar uma dark kitchen'],
        ['seed' => 'vt2', 'color' => 'secondary-500', 'cat' => 'Fispal Tecnologia', 'title' => 'Fispal Tecnologia 2025: indústria mostra como está enfrentando a era da IA'],
        ['seed' => 'vt3', 'color' => 'coral', 'cat' => 'Food ingredients South America', 'title' => 'Nutrição de precisão: o que é, como funciona e as transformações na indústria de alimentos'],
        ['seed' => 'vt4', 'color' => 'secondary-950', 'cat' => 'Indústria A&B', 'title' => 'Estamos prontos para enfrentar o desafio de produzir em 5.0?'],
      ];
      foreach ($veja_tambem as $card): ?>
      <article class="group flex flex-col gap-3 flex-1 min-w-[288px]">
        <?php get_template_part('components/_partials/thumbnail', null, [
          'src' => 'https://picsum.photos/seed/' . $card['seed'] . '/600/338', 'alt' => 'Capa',
          'href' => '/src/layouts/conteudo.php', 'ratio' => 'video', 'play' => '',
        ]); ?>
        <div class="flex flex-col gap-2">
          <?php get_template_part('components/_partials/categoria', null, [
            'color' => $card['color'], 'chip' => 'off', 'label' => $card['cat'], 'href' => '/src/layouts/categoria.php',
          ]); ?>
          <h3 class="text-title-lg font-display font-bold text-primary-600 leading-tight">
            <a href="/src/layouts/conteudo.php" class="group-hover:text-secondary-950 transition-colors"><?php echo $card['title']; ?></a>
          </h3>
        </div>
      </article>
      <?php endforeach; ?>
    </div>
  </section>

  <!-- ============================================================
       §5 — Ad Frame (728×90)
       ============================================================ -->
  <section class="flex flex-col items-center py-6 w-full">
    <div class="border border-primary-100 bg-neutral-50 flex items-center justify-center h-[90px] w-[728px]">
      <span class="font-body font-bold text-label-md text-neutral-700">728 × 90</span>
    </div>
  </section>

  <!-- ============================================================
       §6 — Footer
       ============================================================ -->
  <?php get_template_part('components/_partials/footer-desktop', null, []); ?>

  <?php render_session_toggle(); ?>

</main>
<script type="module" src="/src/assets/js/interactions.js"></script>
