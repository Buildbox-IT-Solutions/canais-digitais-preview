<?php
/**
 * Partial: Header Desktop v4.0 — sticky com transição Expanded → Compact
 * Figma: 5754:7270 (Header 2.0)
 *
 * Mudanças v3.0 → v4.0:
 *   - Logo: texto placeholder → imagem Food Connection (PNG remoto)
 *   - Login: extraído para _partials/login-button.php
 *   - Sticky: header gruda no topo e transiciona Expanded → Compact ao scrollar
 *     (controle via header-sticky.js + classe `is-compact`)
 *
 * PROPS ($args):
 *   activeCategory → string|null. Slug da editoria ativa.
 *   userLoggedIn   → bool   — false = anônimo · true = logado
 *   userName/Email/Initials/Avatar → dados do usuário logado
 *
 * Estrutura:
 *   [strip Informa] · [main row: logo + search + login + Anuncie] · [nav pill]
 */
$userLoggedIn = $args['userLoggedIn'] ?? false;
$userName     = $args['userName']     ?? 'Usuário';
$userEmail    = $args['userEmail']    ?? '';
$userInitials = $args['userInitials'] ?? 'U';
$userAvatar   = $args['userAvatar']   ?? null;
$firstName    = explode(' ', trim($userName))[0] ?: 'Usuário';
?>
<header class="group/header w-full bg-white sticky top-0 z-40 transition-shadow duration-200 [&.is-compact]:shadow-md [&.is-compact]:border-b [&.is-compact]:border-neutral-100" data-component="header-sticky">

  <!-- Header Informa strip (bg neutral-950) — colapsa no estado compact -->
  <div class="w-full bg-neutral-950 text-white overflow-hidden max-h-screen opacity-100 transition-[max-height,opacity] duration-200 ease-out group-[.is-compact]/header:max-h-0 group-[.is-compact]/header:opacity-0" data-component="header-informa" aria-expanded="false">
    <div class="flex items-center justify-center h-10 px-6 cursor-pointer">
      <div class="inline-flex items-center gap-1">
        <span class="font-display font-bold text-label-lg">informa</span>
        <svg class="size-5 transition-transform duration-300" data-icon="chevron" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
      </div>
    </div>
    <!-- Painel institucional (hidden by default) -->
    <div class="overflow-hidden transition-[max-height] duration-300 ease-in-out" style="max-height:0" data-target="header-informa-panel" aria-hidden="true">
      <div class="flex flex-col items-center pb-6 pt-2 px-6 w-full">
        <div class="flex flex-wrap gap-x-10 gap-y-6 items-start justify-center max-w-[1284px] w-full text-left">
          <p class="flex-1 min-w-px font-body text-body-md text-white">
            Este site é operado por uma empresa ou empresas de propriedade da Informa PLC e todos os direitos autorais residem com eles. A sede da Informa PLC é 5 Howick Place, Londres SW1P 1WG. Registrado na Inglaterra e no País de Gales. Número 8860726.
          </p>
          <div class="flex-1 min-w-px flex flex-col gap-4 items-start">
            <p class="font-body text-body-md text-white w-full">
              Food Connection faz parte da divisão Informa Markets da Informa PLC
            </p>
            <div class="flex flex-wrap gap-x-6 gap-y-2 items-start w-full">
              <span class="font-body font-bold text-body-md text-white">Informa PLC</span>
              <a href="#" class="font-body font-semibold text-body-md text-white hover:underline">Sobre Nós</a>
              <a href="#" class="font-body font-semibold text-body-md text-white hover:underline">Relação com Investidores</a>
              <a href="#" class="font-body font-semibold text-body-md text-white hover:underline">Talento</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Main row: [hamburger no compact] + logo + search + login + Anuncie -->
  <div class="flex flex-col items-center pb-4 group-[.is-compact]/header:pb-0 transition-[padding] duration-200">
    <div class="max-w-screen-xl w-full flex items-center">

      <!-- Hamburger menu — visível só no compact (Figma 5955:22337) -->
      <a href="/src/layouts/menu.php"
         data-trigger="side-menu"
         aria-label="Abrir menu"
         class="hidden group-[.is-compact]/header:inline-flex items-center justify-center p-2 rounded-full text-primary-600 hover:bg-neutral-50 transition-colors shrink-0">
        <svg class="size-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
        </svg>
      </a>

      <!-- Logo container — altura encolhe no compact -->
      <div class="flex flex-col justify-center h-24 group-[.is-compact]/header:h-20 px-3 py-4 group-[.is-compact]/header:py-3 shrink-0 transition-[height,padding] duration-200">
        <a href="/src/layouts/home.php" aria-label="Food Connection — ir para a home" class="inline-flex items-center">
          <img
            src="https://d2yghbees9788u.cloudfront.net/foodconnection/2025/12/cropped-cropped-Logo-FC-WP-300x104.png"
            alt="Food Connection"
            class="h-16 group-[.is-compact]/header:h-12 w-auto transition-[height] duration-200">
        </a>
      </div>

      <!-- Right container: search + divider + login + Anuncie -->
      <div class="flex flex-1 items-center justify-end gap-3 px-3 py-6 group-[.is-compact]/header:py-3 self-stretch transition-[padding] duration-200">

        <form action="/src/layouts/buscar.php" method="get" role="search" class="contents">
          <?php get_template_part('components/_partials/search-bar', null, [
            'width' => 'w-32', 'placeholder' => 'Buscar', 'expanded' => 'on',
          ]); ?>
        </form>

        <!-- Divider vertical -->
        <div class="w-px self-stretch bg-neutral-200" aria-hidden="true"></div>

        <?php if ($userLoggedIn): ?>
          <div class="relative" data-user-menu>
            <?php get_template_part('components/_partials/login-button', null, [
              'logged'    => true,
              'name'      => $userName,
              'initials'  => $userInitials,
              'avatar'    => $userAvatar,
              'asTrigger' => true,
            ]); ?>

            <!-- Dropdown panel -->
            <div
              data-user-menu-panel
              class="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-neutral-100 opacity-0 scale-95 pointer-events-none transition-all duration-150 ease-out origin-top-right z-50"
              role="menu"
              aria-hidden="true"
            >
              <div class="px-4 py-3 border-b border-neutral-100">
                <div class="flex items-center gap-3">
                  <?php if ($userAvatar): ?>
                    <img src="<?= $userAvatar ?>" alt="" class="size-10 rounded-full object-cover shrink-0">
                  <?php else: ?>
                    <span class="size-10 rounded-full bg-secondary-950 text-white flex items-center justify-center shrink-0 font-body font-bold text-body-md">
                      <?= htmlspecialchars($userInitials) ?>
                    </span>
                  <?php endif; ?>
                  <div class="min-w-0">
                    <p class="font-body font-semibold text-body-md text-neutral-950 truncate"><?= htmlspecialchars($userName) ?></p>
                    <p class="font-body text-label-md text-neutral-500 truncate"><?= htmlspecialchars($userEmail) ?></p>
                  </div>
                </div>
                <div class="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-50 text-secondary-950 font-body text-label-sm">
                  <svg class="size-3 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  Conta Informa
                </div>
              </div>

              <div class="py-1" role="none">
                <a href="/src/layouts/dashboard-perfil-v3.php" role="menuitem" class="flex items-center gap-3 px-4 py-2.5 font-body text-body-md text-neutral-700 hover:bg-neutral-50 transition-colors">
                  <svg class="size-5 text-neutral-400 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  Minha Conta Informa
                </a>
              </div>

              <div class="h-px bg-neutral-100 mx-4"></div>

              <div class="py-1" role="none">
                <a href="/" role="menuitem" data-analytics-event="logout" class="flex items-center gap-3 px-4 py-2.5 font-body text-body-md text-[#bf0413] hover:bg-[#FEF2F2] transition-colors">
                  <svg class="size-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                  </svg>
                  Sair
                </a>
              </div>
            </div>
          </div>
        <?php else: ?>
          <?php get_template_part('components/_partials/login-button', null, [
            'logged' => false,
            'href'   => '/src/layouts/login.php',
          ]); ?>
        <?php endif; ?>

        <!-- Anuncie -->
        <a href="/src/layouts/anuncie.php" class="inline-flex items-center justify-center px-6 py-2 rounded-full bg-primary-600 text-white hover:bg-secondary-950 transition-colors font-body font-bold text-body-lg whitespace-nowrap">
          Anuncie
        </a>
      </div>
    </div>

    <!-- Nav-list pill — escondido no compact (Figma 5955:22335) -->
    <nav class="mt-4 max-w-screen-xl w-full flex items-start justify-center bg-neutral-50 rounded-full px-6 group-[.is-compact]/header:hidden">
      <?php get_template_part('components/_partials/nav-item', null, [
        'label' => 'Eventos', 'href' => '/src/layouts/categoria.php', 'dropdown' => 'on',
        'active' => $args['activeCategory'] === 'eventos' ? 'on' : 'off',
      ]); ?>
      <?php get_template_part('components/_partials/nav-item', null, [
        'label' => 'Ingredientes', 'href' => '/src/layouts/categoria.php', 'dropdown' => 'off',
        'active' => $args['activeCategory'] === 'ingredientes' ? 'on' : 'off',
      ]); ?>
      <?php get_template_part('components/_partials/nav-item', null, [
        'label' => 'Indústria A&B', 'href' => '/src/layouts/categoria.php', 'dropdown' => 'on',
        'active' => $args['activeCategory'] === 'industria-ab' ? 'on' : 'off',
      ]); ?>
      <?php get_template_part('components/_partials/nav-item', null, [
        'label' => 'Proteína Animal', 'href' => '/src/layouts/categoria.php', 'dropdown' => 'off',
        'active' => $args['activeCategory'] === 'proteina-animal' ? 'on' : 'off',
      ]); ?>
      <?php get_template_part('components/_partials/nav-item', null, [
        'label' => 'Food Service', 'href' => '/src/layouts/categoria.php', 'dropdown' => 'off',
        'active' => $args['activeCategory'] === 'food-service' ? 'on' : 'off',
      ]); ?>
      <?php get_template_part('components/_partials/nav-item', null, [
        'label' => 'Sorvetes', 'href' => '/src/layouts/categoria.php', 'dropdown' => 'off',
        'active' => $args['activeCategory'] === 'sorvetes' ? 'on' : 'off',
      ]); ?>
      <?php get_template_part('components/_partials/nav-item', null, [
        'label' => 'Tecnologia', 'href' => '/src/layouts/categoria.php', 'dropdown' => 'off',
        'active' => $args['activeCategory'] === 'tecnologia' ? 'on' : 'off',
      ]); ?>
      <?php get_template_part('components/_partials/nav-item', null, [
        'label' => 'Embalagens', 'href' => '/src/layouts/categoria.php', 'dropdown' => 'off',
        'active' => $args['activeCategory'] === 'embalagens' ? 'on' : 'off',
      ]); ?>
      <?php get_template_part('components/_partials/nav-item', null, [
        'label' => 'ESG', 'href' => '/src/layouts/categoria.php', 'dropdown' => 'on',
        'active' => $args['activeCategory'] === 'esg' ? 'on' : 'off',
      ]); ?>
      <?php get_template_part('components/_partials/nav-item', null, [
        'label' => 'Especialistas', 'href' => '/src/layouts/categoria.php', 'dropdown' => 'off',
        'active' => $args['activeCategory'] === 'especialistas' ? 'on' : 'off',
      ]); ?>
      <?php get_template_part('components/_partials/nav-item', null, [
        'label' => 'E-books', 'href' => '/src/layouts/categoria.php', 'dropdown' => 'off',
        'active' => $args['activeCategory'] === 'ebooks' ? 'on' : 'off',
      ]); ?>
    </nav>
  </div>
</header>
