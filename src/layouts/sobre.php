<?php
/**
 * Layout: Sobre — Página institucional "Sobre o portal"
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=4951-50343
 * NodeId Desktop: 4951:50343 (1920×2677)
 *
 * Estrutura:
 *   §1  Header (partial)
 *   §2  Article container (704px centered) — título + banner + texto
 *   §3  "Veja também" — Section Title Style 1 + 4 News Cards
 *   §4  Footer (partial)
 *
 * Partials consumidos: header-desktop, footer-desktop, section-title,
 *   thumbnail, categoria, divider
 */
?>
<main class="bg-white">

  <?php
  $activeCategory = null;
  require_once __DIR__ . '/_session.php';
  get_template_part('components/_partials/header-desktop', null, $headerArgs);
  ?>

  <!-- ============================================================
       §2 — Article Container
       ============================================================ -->
  <section class="w-full">
    <div class="max-w-screen-xl mx-auto px-4 lg:px-6 flex justify-center">
      <article class="w-[704px] py-10">

        <!-- Title -->
        <h1 class="font-display font-bold text-display-sm text-primary-600 mb-6">Sobre</h1>

        <!-- Banner image -->
        <div class="w-full rounded-sm overflow-hidden mb-8">
          <img src="https://picsum.photos/seed/sobre-banner/1408/268" alt="Banner Saúde Business" class="w-full h-auto object-cover">
        </div>

        <!-- Body text -->
        <div class="flex flex-col gap-6 font-body text-body-lg text-neutral-900 tracking-[0.5px] leading-relaxed">
          <p class="font-display font-bold text-title-xl text-primary-600">Juntos para fomentar boas práticas de gestão e tecnologia em saúde.</p>

          <p>Formar e informar o executivo de saúde é o que fazemos todos os dias. Há mais de 20 anos desenvolvemos conteúdos voltados para os principais gestores do país, acompanhando as notícias e tendências que impactam no dia a dia dos hospitais, operadoras, centros diagnósticos, farmacêuticas, healthtechs e muito de saúde.</p>

          <p>Hoje, o Portal Saúde Business é uma das iniciativas de Healthcare Business Unit (HBU) na Informa Markets e nossa organização de eventos de negócio da saúde.</p>

          <h2 class="font-display font-bold text-title-xl text-primary-600 mt-2">Como podemos transformar o setor?</h2>

          <p>Acreditamos na inovação e no impacto da co-criação de conteúdos relevantes e trocas de experiências entre profissionais do setor de saúde. Presencialmente e virtualmente, a combinação desse saber em nossos eventos: <strong>Hospitalar</strong>, <strong>Saúde Business Forum (SBF)</strong> e <strong>Healthcare Innovation Show (HIS)</strong>.</p>

          <p>Ao longo das últimas décadas, nossos eventos geraram milhares de oportunidades de negócio para clientes, parceiros e congressistas. <a href="#" class="font-bold text-secondary-950 hover:underline">Saiba mais sobre como sua marca pode impactar um público segmentado e qualificado por meio de projetos de conexão.</a></p>

          <p>Com uma vasta experiência no setor de saúde e nas melhores práticas de divulgação e promoção de eventos, a equipe por trás do Portal Saúde Business cuida para informar, analisar, projetar e incentivar o desenvolvimento dos negócios de saúde. <a href="#" class="font-bold text-secondary-950 hover:underline">Conheça nossa equipe editorial.</a></p>
        </div>

        <!-- Second banner -->
        <div class="w-full rounded-sm overflow-hidden mt-8 mb-6">
          <img src="https://picsum.photos/seed/sobre-banner2/1408/268" alt="Banner eventos" class="w-full h-auto object-cover">
        </div>

        <!-- Copyright notice -->
        <div class="flex flex-col gap-4">
          <p class="font-body text-body-sm text-neutral-700">Todos os direitos reservados. É proibida qualquer forma de reutilização, distribuição, reprodução ou publicação parcial ou total deste conteúdo sem prévia autorização da Informa Markets.</p>
          <?php get_template_part('components/_partials/divider', null, ['orientation' => 'horizontal']); ?>
        </div>

      </article>
    </div>
  </section>

  <!-- ============================================================
       §3 — Veja também
       ============================================================ -->
  <section class="w-full">
    <?php get_template_part('components/_partials/section-title', null, [
      'label' => 'Veja também', 'color' => 'primary-600', 'href' => null, 'uppercase' => 'off',
    ]); ?>
    <div class="max-w-screen-xl mx-auto px-4 lg:px-6 pt-6 pb-10 flex flex-wrap gap-x-6 gap-y-8">
      <?php
      $cards = [
        ['seed' => 'sb1', 'color' => 'saffron', 'cat' => 'Food Service', 'title' => 'Passo a passo para montar uma dark kitchen'],
        ['seed' => 'sb2', 'color' => 'secondary-500', 'cat' => 'Fispal Tecnologia', 'title' => 'Fispal Tecnologia 2025: indústria mostra como está enfrentando a era da IA'],
        ['seed' => 'sb3', 'color' => 'mint', 'cat' => 'Ingredientes', 'title' => 'Nutrição de precisão: o que é, como funciona'],
        ['seed' => 'sb4', 'color' => 'secondary-950', 'cat' => 'Indústria A&B', 'title' => 'Estamos prontos para enfrentar o desafio de produzir em 5.0?'],
      ];
      foreach ($cards as $c): ?>
      <article class="group flex flex-col gap-3 flex-1 min-w-[288px]">
        <?php get_template_part('components/_partials/thumbnail', null, [
          'src' => 'https://picsum.photos/seed/' . $c['seed'] . '/600/338', 'alt' => 'Capa',
          'href' => '#', 'ratio' => 'video', 'play' => '',
        ]); ?>
        <div class="flex flex-col gap-2">
          <?php get_template_part('components/_partials/categoria', null, [
            'color' => $c['color'], 'chip' => 'off', 'label' => $c['cat'], 'href' => null,
          ]); ?>
          <h3 class="text-title-lg font-display font-bold text-primary-600 leading-tight">
            <a href="#" class="group-hover:text-secondary-950 transition-colors"><?php echo $c['title']; ?></a>
          </h3>
        </div>
      </article>
      <?php endforeach; ?>
    </div>
  </section>

  <?php get_template_part('components/_partials/footer-desktop', null, []); ?>

</main>
<script type="module" src="/src/assets/js/interactions.js"></script>
