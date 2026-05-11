<?php
/**
 * Partial: Header Desktop (Expanded)
 *
 * Versão Expanded Desktop do Header (com Header Informa bar +
 * logo + social list + search bar + Anuncie button + nav-list pill).
 * Source: extraído de /src/components/header.php (Expanded Desktop block).
 *
 * USO:
 *   <?php get_template_part('components/_partials/header-desktop', null, [
 *     'activeCategory' => 'eventos',
 *   ]); ?>
 *
 * PROPS ($args):
 *   activeCategory → string|null. Slug da editoria ativa pra destacar
 *                    no nav-list pill. Valores aceitos:
 *                      eventos · ingredientes · industria-ab · proteina-animal
 *                      · food-service · sorvetes · tecnologia · embalagens
 *                      · esg · especialistas · ebooks · null
 *
 * O item ativo recebe `bg-secondary-50 rounded-full` no <a>, indicando
 * a editoria atual. Categorias com submenu (Eventos, Indústria A&B, ESG)
 * mostram o chevron arrow_drop_down ao lado do label.
 */
?>
<header class="w-full bg-white">

  <!-- Header Informa strip (bg neutral-950) -->
  <div class="w-full bg-neutral-950 text-white" data-component="header-informa" aria-expanded="false">
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

  <!-- Main row: logo + social + search + CTA -->
  <div class="flex flex-col items-center pb-4">
    <div class="max-w-screen-xl w-full flex items-center">

      <div class="flex flex-1 flex-col justify-center h-24 px-3 py-4">
        <a href="#" class="inline-flex items-center max-w-[185px] max-h-16 font-display font-bold text-headline-md text-primary-600">
          Food Connection
        </a>
      </div>

      <div class="flex items-center gap-4 h-full px-3">
        <div class="flex items-center gap-1">
          <a href="#" aria-label="WhatsApp" class="inline-flex items-center justify-center size-10 rounded-full text-primary-600 hover:bg-neutral-50 transition-colors">
            <svg class="size-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </a>
          <a href="#" aria-label="LinkedIn" class="inline-flex items-center justify-center size-10 rounded-full text-primary-600 hover:bg-neutral-50 transition-colors">
            <svg class="size-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a href="#" aria-label="Facebook" class="inline-flex items-center justify-center size-10 rounded-full text-primary-600 hover:bg-neutral-50 transition-colors">
            <svg class="size-5" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          <a href="#" aria-label="YouTube" class="inline-flex items-center justify-center size-10 rounded-full text-primary-600 hover:bg-neutral-50 transition-colors">
            <svg class="size-5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
          <a href="#" aria-label="X / Twitter" class="inline-flex items-center justify-center size-10 rounded-full text-primary-600 hover:bg-neutral-50 transition-colors">
            <svg class="size-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
        </div>

        <?php get_template_part('components/_partials/search-bar', null, [
          'width' => 'w-32', 'placeholder' => 'Buscar', 'expanded' => 'on',
        ]); ?>

        <a href="#" class="inline-flex items-center justify-center h-10 px-6 rounded-full bg-primary-600 text-white hover:bg-secondary-950 transition-colors font-body font-bold text-body-lg">
          Anuncie
        </a>
      </div>
    </div>

    <!-- Nav-list pill -->
    <nav class="mt-4 max-w-screen-xl w-full flex items-start justify-center bg-neutral-50 rounded-full px-6">
      <?php get_template_part('components/_partials/nav-item', null, [
        'label' => 'Eventos', 'href' => '#', 'dropdown' => 'on',
        'active' => $args['activeCategory'] === 'eventos' ? 'on' : 'off',
      ]); ?>
      <?php get_template_part('components/_partials/nav-item', null, [
        'label' => 'Ingredientes', 'href' => '#', 'dropdown' => 'off',
        'active' => $args['activeCategory'] === 'ingredientes' ? 'on' : 'off',
      ]); ?>
      <?php get_template_part('components/_partials/nav-item', null, [
        'label' => 'Indústria A&B', 'href' => '#', 'dropdown' => 'on',
        'active' => $args['activeCategory'] === 'industria-ab' ? 'on' : 'off',
      ]); ?>
      <?php get_template_part('components/_partials/nav-item', null, [
        'label' => 'Proteína Animal', 'href' => '#', 'dropdown' => 'off',
        'active' => $args['activeCategory'] === 'proteina-animal' ? 'on' : 'off',
      ]); ?>
      <?php get_template_part('components/_partials/nav-item', null, [
        'label' => 'Food Service', 'href' => '#', 'dropdown' => 'off',
        'active' => $args['activeCategory'] === 'food-service' ? 'on' : 'off',
      ]); ?>
      <?php get_template_part('components/_partials/nav-item', null, [
        'label' => 'Sorvetes', 'href' => '#', 'dropdown' => 'off',
        'active' => $args['activeCategory'] === 'sorvetes' ? 'on' : 'off',
      ]); ?>
      <?php get_template_part('components/_partials/nav-item', null, [
        'label' => 'Tecnologia', 'href' => '#', 'dropdown' => 'off',
        'active' => $args['activeCategory'] === 'tecnologia' ? 'on' : 'off',
      ]); ?>
      <?php get_template_part('components/_partials/nav-item', null, [
        'label' => 'Embalagens', 'href' => '#', 'dropdown' => 'off',
        'active' => $args['activeCategory'] === 'embalagens' ? 'on' : 'off',
      ]); ?>
      <?php get_template_part('components/_partials/nav-item', null, [
        'label' => 'ESG', 'href' => '#', 'dropdown' => 'on',
        'active' => $args['activeCategory'] === 'esg' ? 'on' : 'off',
      ]); ?>
      <?php get_template_part('components/_partials/nav-item', null, [
        'label' => 'Especialistas', 'href' => '#', 'dropdown' => 'off',
        'active' => $args['activeCategory'] === 'especialistas' ? 'on' : 'off',
      ]); ?>
      <?php get_template_part('components/_partials/nav-item', null, [
        'label' => 'E-books', 'href' => '#', 'dropdown' => 'off',
        'active' => $args['activeCategory'] === 'ebooks' ? 'on' : 'off',
      ]); ?>
    </nav>
  </div>
</header>
