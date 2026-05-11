<?php
/**
 * Layout: Anuncie — Página comercial "Anuncie conosco"
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=4941-49088
 * NodeId Desktop: 4941:49088 (1920×4296)
 *
 * Estrutura:
 *   §1  Header (partial)
 *   §2  Article container (704px centered):
 *       - Título + intro + banner soluções
 *       - "Amplie sua presença" text
 *       - "First-Party Data" + Vantagens
 *       - "Como funciona?" 3-step grid
 *       - "Geração de Leads" cards
 *       - "Quem já aposta" logos
 *       - Testimonial quote + contact CTA
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
        <h1 class="font-display font-bold text-display-sm text-primary-600 mb-6">Anuncie no Portal Saúde Business!</h1>

        <!-- Intro -->
        <div class="flex flex-col gap-4 font-body text-body-lg text-neutral-900 tracking-[0.5px] leading-relaxed mb-8">
          <p>O Saúde Business é o portal oficial de notícias do núcleo de saúde da Informa Markets e cobre os eventos Hospitalar, do Hospitalar Innovation Show — HIS e do Saúde Business Forum — SBF.</p>
          <p>Diariamente, trazemos atualizações, tendências, tudo o que acontece de mais relevante no mundo da saúde. Além disso, publicamos também artigos de especialistas, e-books, entrevistas e muito mais!</p>
        </div>

        <!-- Banner soluções -->
        <div class="w-full rounded-sm overflow-hidden mb-8">
          <img src="https://picsum.photos/seed/anuncie-banner/1408/148" alt="Soluções digitais Informa Markets" class="w-full h-auto object-cover">
        </div>

        <!-- Amplie sua presença -->
        <div class="flex flex-col gap-4 font-body text-body-lg text-neutral-900 tracking-[0.5px] leading-relaxed mb-8">
          <h2 class="font-display font-bold text-title-xl text-primary-600">Amplie sua presença no setor de saúde com as nossas soluções.</h2>
          <p>Maximize a audiência certa, posicione sua marca e gere leads qualificados com produtos digitais.</p>

          <h2 class="font-display font-bold text-title-xl text-primary-600 mt-4">O que é First-Party Data e por que ele é essencial para sua estratégia digital?</h2>
          <p>O First-Party Data são dados coletados diretamente pelos nossos eventos a partir de relacionamentos. Investir em soluções digitais com First-Party Data é a estratégia quando construir um estande: em ambos, você fica em público qualificado, criando contatos diretos e resultados reais.</p>

          <h3 class="font-display font-bold text-title-lg text-primary-600 mt-2">Vantagens</h3>
          <ul class="list-none space-y-1">
            <li class="flex gap-2 items-start"><span class="text-secondary-500">✓</span> Alta confiabilidade — Dados obtidos diretamente do nosso portal e eventos.</li>
            <li class="flex gap-2 items-start"><span class="text-secondary-500">✓</span> Segmentação qualificada — Alcance o público certo com mais precisão.</li>
            <li class="flex gap-2 items-start"><span class="text-secondary-500">✓</span> Maior conversão — Campanhas mais assertivas e eficazes.</li>
          </ul>
        </div>

        <!-- Como funciona? -->
        <div class="flex flex-col gap-6 mb-8">
          <h2 class="font-display font-bold text-title-xl text-primary-600">Como funciona?</h2>
          <p class="font-body text-body-lg text-neutral-900">Nosso produto tem três etapas principais:</p>
          <div class="grid grid-cols-3 gap-6">
            <?php
            $steps = [
              ['num' => '1', 'title' => 'Conhecemos que desafios enfrentam nossos participantes de eventos.', 'img' => 'anuncie-s1'],
              ['num' => '2', 'title' => 'Transformamos os dados desses ambientes de comportamento e preferências do compra.', 'img' => 'anuncie-s2'],
              ['num' => '3', 'title' => 'Por meio da consultoria, compartilhamos a serviço de inteligência de conteúdo.', 'img' => 'anuncie-s3'],
            ];
            foreach ($steps as $s): ?>
            <div class="flex flex-col items-center gap-3 text-center">
              <div class="size-[120px] rounded-full overflow-hidden bg-neutral-100">
                <img src="https://picsum.photos/seed/<?php echo $s['img']; ?>/240/240" alt="" class="w-full h-full object-cover">
              </div>
              <p class="font-body text-body-md text-neutral-900"><?php echo $s['num']; ?>. <?php echo $s['title']; ?></p>
            </div>
            <?php endforeach; ?>
          </div>
        </div>

        <?php get_template_part('components/_partials/divider', null, ['orientation' => 'horizontal']); ?>

        <!-- Geração de Leads -->
        <div class="flex flex-col gap-6 py-8">
          <h2 class="font-display font-bold text-title-xl text-primary-600">Geração de Leads</h2>
          <div class="flex gap-6">
            <div class="flex-1 rounded-sm overflow-hidden bg-secondary-950 aspect-video">
              <img src="https://picsum.photos/seed/anuncie-leads1/600/338" alt="Meetings" class="w-full h-full object-cover">
            </div>
            <div class="flex-1 flex flex-col gap-2 justify-center">
              <p class="font-display font-bold text-title-lg text-primary-600">Transformamos conexões em clientes e oportunidades em resultados!</p>
              <p class="font-body text-body-md text-neutral-900">Com nossos produtos de geração de leads, você vai estar qualificado e expor seu negócio ao próximo nível.</p>
            </div>
          </div>
          <div class="flex gap-6">
            <div class="flex-1 flex flex-col gap-2 justify-center">
              <p class="font-display font-bold text-title-lg text-primary-600">Destaque-se no setor de seu público!</p>
              <p class="font-body text-body-md text-neutral-900">Fortaleça sua relação com o público autoridade com nossas soluções de awareness e marketing.</p>
            </div>
            <div class="flex-1 rounded-sm overflow-hidden bg-secondary-950 aspect-video">
              <img src="https://picsum.photos/seed/anuncie-leads2/600/338" alt="Entrevistas e artigos" class="w-full h-full object-cover">
            </div>
          </div>
        </div>

        <?php get_template_part('components/_partials/divider', null, ['orientation' => 'horizontal']); ?>

        <!-- Quem já aposta -->
        <div class="flex flex-col gap-6 py-8 items-center">
          <h2 class="font-display font-bold text-title-xl text-primary-600 w-full">Quem já aposta em nossos produtos digitais:</h2>
          <div class="flex items-center justify-center py-4 w-full">
            <span class="font-display font-bold text-headline-md text-neutral-300">athie | wohnrath</span>
          </div>
        </div>

        <?php get_template_part('components/_partials/divider', null, ['orientation' => 'horizontal']); ?>

        <!-- Testimonial -->
        <div class="py-8">
          <blockquote class="border-l-4 border-secondary-500 pl-6 py-2 mb-6">
            <p class="font-body text-body-lg text-neutral-900 italic">"Se sua marca quer ser referência na saúde, o Saúde Business é o caminho! Aqui, você se conecta ao universo da saúde com informação e estratégia, inovação e tendências que movem o setor."</p>
          </blockquote>
        </div>

        <!-- Banner bottom -->
        <div class="w-full rounded-sm overflow-hidden mb-8">
          <img src="https://picsum.photos/seed/anuncie-bottom/1408/738" alt="Soluções digitais" class="w-full h-auto object-cover">
        </div>

        <!-- Contact CTA -->
        <div class="flex flex-col gap-2 font-body text-body-lg text-neutral-900">
          <p>Entre em contato para conferir melhor as oportunidades de visibilidade para sua marca.</p>
          <p class="font-bold text-primary-600 mt-2">Maria Catharina Teixeira</p>
          <p><a href="mailto:mariacatharina.teixeira@informa.com" class="font-bold text-secondary-950 hover:underline">mariacatharina.teixeira@informa.com</a></p>
          <p>(11) 8175-7466</p>
        </div>

      </article>
    </div>
  </section>

  <!-- ============================================================
       §3 — Veja também
       ============================================================ -->
  <section class="w-full mt-10">
    <?php get_template_part('components/_partials/section-title', null, [
      'label' => 'Veja também', 'color' => 'primary-600', 'href' => null, 'uppercase' => 'off',
    ]); ?>
    <div class="max-w-screen-xl mx-auto px-4 lg:px-6 pt-6 pb-10 flex flex-wrap gap-x-6 gap-y-8">
      <?php
      $cards = [
        ['seed' => 'an1', 'color' => 'saffron', 'cat' => 'Food Service', 'title' => 'Passo a passo para montar uma dark kitchen'],
        ['seed' => 'an2', 'color' => 'secondary-500', 'cat' => 'Fispal Tecnologia', 'title' => 'Fispal Tecnologia 2025: indústria mostra como está enfrentando a era da IA'],
        ['seed' => 'an3', 'color' => 'mint', 'cat' => 'Ingredientes', 'title' => 'Nutrição de precisão: o que é, como funciona'],
        ['seed' => 'an4', 'color' => 'secondary-950', 'cat' => 'Indústria A&B', 'title' => 'Estamos prontos para enfrentar o desafio de produzir em 5.0?'],
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
