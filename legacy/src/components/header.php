<?php
/**
 * Componente: Header
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=181-4186
 * Variantes: device (Desktop|Mobile) × size (Compact|Expanded) × searchOpened = 6
 *
 * Header do Food Connection (by Informa Markets). Brand "Food Connection"
 * nas variantes de desktop, 11 editorias reais (Eventos, Ingredientes,
 * Indústria A&B, Proteína Animal, Food Service, Sorvetes, Tecnologia,
 * Embalagens, ESG, Especialistas, E-books). Três variantes renderizadas:
 *
 *   1. Compact Desktop  — hamburger + logo + search 128w + "Anuncie" btn
 *   2. Expanded Desktop — Header Informa bar + logo + social list (5) +
 *                          search 128w + "Anuncie" btn + nav-list pill
 *                          com as 11 editorias
 *   3. Mobile           — hamburger + logo + search icon
 *
 * Notas de design:
 *   - Nav pill tem bg-neutral-50 (#e9eaec) e rounded-full, contendo os
 *     nav-items com arrow_drop_down opcional pra items com submenu.
 *   - Search bar do header é 128px wide quando compact; expande para
 *     288px ao ativar o search (variante searchOpened).
 *   - Height do header compact: 80px (logo container flex-col h-80).
 *   - Expanded header: HeaderInforma h-40 + main content h-96 + nav-list.
 *
 * Tokens: bg-white · bg-neutral-950 (#283857) · bg-neutral-50 · bg-primary-600
 *         · text-white · text-primary-600 · text-neutral-900 · border-neutral-100
 *         · rounded-full · text-label-lg · text-body-lg · font-body · font-display
 */
?>
<div class="space-y-8">

  <!-- ================================================================
       1. COMPACT DESKTOP (hamburger + logo + search + anuncie)
       ================================================================ -->
  <header class="w-full bg-white">
    <div class="max-w-screen-xl mx-auto flex items-center">

      <!-- Hamburger -->
      <?php get_template_part('components/_partials/icon-button', null, [
        'icon' => 'menu', 'type' => 'ghost', 'size' => 'large', 'label' => 'Menu', 'href' => null,
      ]); ?>

      <!-- Logo container -->
      <div class="flex flex-1 flex-col justify-center h-20 p-3">
        <a href="#" class="inline-flex items-center max-w-[162px] max-h-14 font-display font-bold text-headline-sm text-primary-600">
          Food Connection
        </a>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-4 px-3">
        <!-- Search bar compact (128w) -->
        <?php get_template_part('components/_partials/search-bar', null, [
          'width' => 'w-32', 'placeholder' => 'Buscar', 'expanded' => 'off',
        ]); ?>
        <!-- Anuncie button -->
        <a href="#" class="inline-flex items-center justify-center h-10 px-6 rounded-full bg-primary-600 text-white hover:bg-secondary-950 transition-colors font-body font-bold text-body-lg">
          Anuncie
        </a>
      </div>

    </div>
    <?php get_template_part('components/_partials/divider', null, [ 'orientation' => 'horizontal' ]); ?>
  </header>

  <!-- ================================================================
       2. EXPANDED DESKTOP (Header Informa + logo + social + nav-list)
       ================================================================ -->
  <header class="w-full bg-white">

    <!-- Header Informa strip (bg neutral-950) -->
    <div class="w-full bg-neutral-950 text-white">
      <div class="flex items-center justify-center h-10 px-6">
        <button type="button" class="inline-flex items-center gap-1">
          <span class="font-display font-bold text-label-lg">informa</span>
          <svg class="size-5" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
        </button>
      </div>
    </div>

    <!-- Main row: logo + social + search + CTA -->
    <div class="flex flex-col items-center pb-4">
      <div class="max-w-screen-xl w-full flex items-center">

        <!-- Logo container -->
        <div class="flex flex-1 flex-col justify-center h-24 px-3 py-4">
          <a href="#" class="inline-flex items-center max-w-[185px] max-h-16 font-display font-bold text-headline-md text-primary-600">
            Food Connection
          </a>
        </div>

        <!-- Container de ações -->
        <div class="flex items-center gap-4 h-full px-3">
          <!-- Social list -->
          <div class="flex items-center gap-1">
            <a href="#" aria-label="WhatsApp" class="inline-flex items-center justify-center size-10 rounded-full text-primary-600 hover:bg-neutral-50 transition-colors">
              <svg class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
            <a href="#" aria-label="LinkedIn" class="inline-flex items-center justify-center size-10 rounded-full text-primary-600 hover:bg-neutral-50 transition-colors">
              <svg class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="#" aria-label="Facebook" class="inline-flex items-center justify-center size-10 rounded-full text-primary-600 hover:bg-neutral-50 transition-colors">
              <svg class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="#" aria-label="YouTube" class="inline-flex items-center justify-center size-10 rounded-full text-primary-600 hover:bg-neutral-50 transition-colors">
              <svg class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a href="#" aria-label="X / Twitter" class="inline-flex items-center justify-center size-10 rounded-full text-primary-600 hover:bg-neutral-50 transition-colors">
              <svg class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          </div>

          <!-- Search bar 128w (Enabled, not opened) -->
          <?php get_template_part('components/_partials/search-bar', null, [
            'width' => 'w-32', 'placeholder' => 'Buscar', 'expanded' => 'off',
          ]); ?>

          <!-- Anuncie CTA -->
          <a href="#" class="inline-flex items-center justify-center h-10 px-6 rounded-full bg-primary-600 text-white hover:bg-secondary-950 transition-colors font-body font-bold text-body-lg">
            Anuncie
          </a>
        </div>
      </div>

      <!-- Nav-list pill -->
      <nav class="mt-4 max-w-screen-xl w-full flex items-start justify-center bg-neutral-50 rounded-full px-6">
        <a href="#" class="flex items-center gap-1 min-h-8 pt-3 pb-2 pl-3 pr-2">
          <span class="font-body font-bold text-label-lg text-primary-600 whitespace-nowrap">Eventos</span>
          <svg class="size-5" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
        </a>
        <a href="#" class="flex items-center min-h-8 pt-3 pb-2 px-3">
          <span class="font-body font-bold text-label-lg text-primary-600 whitespace-nowrap">Ingredientes</span>
        </a>
        <a href="#" class="flex items-center gap-1 min-h-8 pt-3 pb-2 pl-3 pr-2">
          <span class="font-body font-bold text-label-lg text-primary-600 whitespace-nowrap">Indústria A&amp;B</span>
          <svg class="size-5" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
        </a>
        <a href="#" class="flex items-center min-h-8 pt-3 pb-2 px-3">
          <span class="font-body font-bold text-label-lg text-primary-600 whitespace-nowrap">Proteína Animal</span>
        </a>
        <a href="#" class="flex items-center min-h-8 pt-3 pb-2 px-3">
          <span class="font-body font-bold text-label-lg text-primary-600 whitespace-nowrap">Food Service</span>
        </a>
        <a href="#" class="flex items-center min-h-8 pt-3 pb-2 px-3">
          <span class="font-body font-bold text-label-lg text-primary-600 whitespace-nowrap">Sorvetes</span>
        </a>
        <a href="#" class="flex items-center min-h-8 pt-3 pb-2 px-3">
          <span class="font-body font-bold text-label-lg text-primary-600 whitespace-nowrap">Tecnologia</span>
        </a>
        <a href="#" class="flex items-center min-h-8 pt-3 pb-2 px-3">
          <span class="font-body font-bold text-label-lg text-primary-600 whitespace-nowrap">Embalagens</span>
        </a>
        <a href="#" class="flex items-center gap-1 min-h-8 pt-3 pb-2 pl-3 pr-2">
          <span class="font-body font-bold text-label-lg text-primary-600 whitespace-nowrap">ESG</span>
          <svg class="size-5" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
        </a>
        <a href="#" class="flex items-center min-h-8 pt-3 pb-2 px-3">
          <span class="font-body font-bold text-label-lg text-primary-600 whitespace-nowrap">Especialistas</span>
        </a>
        <a href="#" class="flex items-center min-h-8 pt-3 pb-2 px-3">
          <span class="font-body font-bold text-label-lg text-primary-600 whitespace-nowrap">E-books</span>
        </a>
      </nav>
    </div>
  </header>

  <!-- ================================================================
       3. MOBILE (hamburger + logo + search icon)
       ================================================================ -->
  <header class="w-full max-w-[440px] bg-white">
    <div class="flex items-center px-2">
      <?php get_template_part('components/_partials/icon-button', null, [
        'icon' => 'menu', 'type' => 'ghost', 'size' => 'large', 'label' => 'Menu', 'href' => null,
      ]); ?>
      <div class="flex flex-1 flex-col items-center justify-center h-[72px] p-3">
        <a href="#" class="inline-flex items-center font-display font-bold text-title-xl text-primary-600">
          Food Connection
        </a>
      </div>
      <?php get_template_part('components/_partials/icon-button', null, [
        'icon' => 'search', 'type' => 'ghost', 'size' => 'large', 'label' => 'Buscar', 'href' => '#',
      ]); ?>
    </div>
    <?php get_template_part('components/_partials/divider', null, [ 'orientation' => 'horizontal' ]); ?>
  </header>

  <!-- ================================================================
       4. ESTADO LOGADO (v3.0) — Avatar + Dropdown "Minha Conta Informa" / "Sair"
       ================================================================ -->
  <article>
    <div class="mb-4 pb-2 border-b border-neutral-100">
      <h3 class="font-display font-bold text-title-lg">Estado Logado (v3.0)</h3>
      <p class="font-body text-body-md text-neutral-500">
        Avatar + nome (primeiro nome) + dropdown com "Minha Conta Informa" / "Sair".
        Abre ao clicar no trigger — fecha com Escape ou clique fora.
      </p>
    </div>
    <div class="bg-white rounded-lg border border-neutral-100 overflow-hidden">
      <?php get_template_part('components/_partials/header-desktop', null, [
        'activeCategory' => null,
        'userLoggedIn'   => true,
        'userName'       => 'Maria Silva',
        'userEmail'      => 'm***@empresa.com.br',
        'userInitials'   => 'MS',
        'userAvatar'     => null,
      ]); ?>
    </div>
  </article>

</div>
