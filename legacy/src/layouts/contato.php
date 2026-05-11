<?php
/**
 * Layout: Contato — Página institucional de contato
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=4935-30241
 * NodeId Desktop: 4935:30241 (1920×2736)
 *
 * Estrutura:
 *   §1  Header (partial)
 *   §2  Article container (704px centered) — título + texto + equipe
 *   §3  "Veja também" — Section Title Style 1 + 4 News Cards
 *   §4  Footer (partial)
 *
 * Partials consumidos: header-desktop, footer-desktop, section-title,
 *   thumbnail, categoria, avatar, divider
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
        <h1 class="font-display font-bold text-display-sm text-primary-600 mb-6">Contato</h1>

        <!-- Intro text -->
        <div class="flex flex-col gap-4 font-body text-body-lg text-neutral-900 tracking-[0.5px] leading-relaxed">
          <p>Formar e informar o executivo de saúde é o que fazemos todos os dias. Somos profundamente conectados com os principais gestores do país, acompanhando as notícias e tendências que impactam no dia a dia dos hospitais, operadoras, centros diagnósticos, farmacêuticas e muitos de saúde.</p>
          <p>As pautas para o portal Saúde Business derivam de veículos para o mercado B2B, então oferecemos para o gestor executivo em saúde — consultórios, hospitais, laboratórios, clínicas, operadoras, indústrias, distribuição e varejo farmacêutico — conteúdo de relevância, ciência, inovação e abordagem inteligente para seus negócios.</p>
          <p>Para sugestões de pauta e envio de releases, entre em contato: <a href="mailto:saudebusiness@informa.com" class="font-bold text-secondary-950 hover:underline">saudebusiness@informa.com</a></p>
        </div>

        <!-- Equipe de conteúdo digital -->
        <div class="mt-10">
          <h2 class="font-display font-bold text-title-xl text-primary-600 mb-6">Equipe de conteúdo digital</h2>

          <?php
          $equipe_digital = [
            [
              'name' => 'Amanda Gonçalves',
              'role' => 'Curadora de conteúdo digital',
              'bio' => 'Jornalista experiente em produção de conteúdo voltado para o mercado de saúde. Controla a pauta dos portais e as estratégias de marketing digital. Em 2024, tornou-se curadora de conteúdo do portal Saúde Business.',
              'email' => 'amanda.goncalves@informa.com',
              'img' => '25',
            ],
            [
              'name' => 'Ana Dominguez',
              'role' => 'Coordenadora de conteúdo digital',
              'bio' => 'Jornalista especializada em Marketing digital, com experiência em criação de conteúdo para a experiência do cliente. Atualmente, atua como Coordenadora de Conteúdo Digital na Informa Markets Latam.',
              'email' => 'ana.dominguez@informa.com',
              'img' => '47',
            ],
          ];
          foreach ($equipe_digital as $i => $pessoa): ?>
          <div class="flex gap-6 items-start py-6 <?php if ($i > 0): ?>border-t border-neutral-100<?php endif; ?>">
            <div class="shrink-0">
              <?php get_template_part('components/_partials/avatar', null, [
                'src' => 'https://i.pravatar.cc/192?img=' . $pessoa['img'], 'size' => 'xlarge', 'shape' => 'circular',
              ]); ?>
            </div>
            <div class="flex flex-col gap-2 flex-1 min-w-0">
              <p class="font-display font-bold text-title-lg text-primary-600"><?php echo $pessoa['name']; ?></p>
              <p class="font-body font-semibold text-body-md text-neutral-900"><?php echo $pessoa['role']; ?></p>
              <p class="font-body text-body-md text-neutral-900"><?php echo $pessoa['bio']; ?></p>
              <p class="font-body text-body-md text-neutral-900">E-mail: <a href="mailto:<?php echo $pessoa['email']; ?>" class="font-bold text-secondary-950 hover:underline"><?php echo $pessoa['email']; ?></a></p>
            </div>
          </div>
          <?php endforeach; ?>
        </div>

        <!-- Equipe de conteúdo para eventos -->
        <div class="mt-10">
          <h2 class="font-display font-bold text-title-xl text-primary-600 mb-6">Equipe de conteúdo para eventos</h2>

          <div class="flex gap-6 items-start py-6">
            <div class="shrink-0">
              <?php get_template_part('components/_partials/avatar', null, [
                'src' => 'https://i.pravatar.cc/192?img=32', 'size' => 'xlarge', 'shape' => 'circular',
              ]); ?>
            </div>
            <div class="flex flex-col gap-2 flex-1 min-w-0">
              <p class="font-display font-bold text-title-lg text-primary-600">Fernanda Fortunato</p>
              <p class="font-body font-semibold text-body-md text-neutral-900">Gerente de produto e conteúdo para Saúde</p>
              <p class="font-body text-body-md text-neutral-900">Apaixonada por tecnologia e saúde. Formada a Engenheira Biomédica com MBA em Gestão Empresarial pela FGV. Hoje atua na curadoria de conteúdo, patrocínio e gestão dos portais da Informa Saúde Business Forum, Hospitalar e HIS.</p>
              <p class="font-body text-body-md text-neutral-900">E-mail: <a href="mailto:fernanda.fortunato@informa.com" class="font-bold text-secondary-950 hover:underline">fernanda.fortunato@informa.com</a></p>
            </div>
          </div>
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
        ['seed' => 'ct1', 'color' => 'saffron', 'cat' => 'Food Service', 'title' => 'Passo a passo para montar uma dark kitchen'],
        ['seed' => 'ct2', 'color' => 'secondary-500', 'cat' => 'Fispal Tecnologia', 'title' => 'Fispal Tecnologia 2025: indústria mostra como está enfrentando a era da IA'],
        ['seed' => 'ct3', 'color' => 'mint', 'cat' => 'Ingredientes', 'title' => 'Nutrição de precisão: o que é, como funciona e as transformações na indústria de alimentos'],
        ['seed' => 'ct4', 'color' => 'secondary-950', 'cat' => 'Indústria A&B', 'title' => 'Estamos prontos para enfrentar o desafio de produzir em 5.0?'],
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
