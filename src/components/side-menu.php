<?php
/**
 * Componente: Side Menu
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=986-9198
 * Variantes: device (Desktop|Mobile) × level (Level 1|Level 2) = 4
 *
 * Drawer lateral usado em mobile (hamburger open) e Level 2 nav (subnav).
 *
 * Anatomia:
 *   - Container: bg-white border-r-primary-100 (#d4dae0) py-2
 *   - max-w-280 min-w-240 w-280
 *   - height: Mobile L1 983 / Mobile L2 688 / Desktop 1080
 *   - btn-area top: Icon Button close (24×24 ghost)
 *   - Level 2: "Menu Title" antes da lista (Aleo Bold 16/24 text-neutral-700)
 *   - Menu list: 13+ Building Block items SEM leading/trailing/supporting/divider
 *   - Footer:
 *     - Desktop L1: divider + Brand Informa logo
 *     - Mobile L1: button "Anuncie" + social list 5 icons + divider + Brand Informa
 *
 * Tokens: bg-white · border-primary-100 · bg-primary-600 · text-primary-600 ·
 *         text-neutral-700 · text-white · font-display · font-body · rounded-full
 */
?>
<div class="space-y-10">

  <!-- ===== Level 1 · Desktop ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Level 1 · Desktop</p>
    <aside class="bg-white border-r border-primary-100 flex items-start max-w-[280px] min-w-[240px] py-2 w-[280px] h-[600px] overflow-hidden">
      <div class="flex flex-1 flex-col h-full items-start min-w-0">

        <!-- btn-area close -->
        <div class="flex items-start px-3 py-2 w-full">
          <button type="button" aria-label="Fechar menu" class="inline-flex items-center justify-center p-2 rounded-full text-primary-600 hover:bg-neutral-50 transition-colors">
            <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
          </button>
        </div>

        <!-- Menu list -->
        <nav class="flex flex-col items-start w-full">
          <a href="#" class="flex h-14 items-center px-4 py-2 w-full hover:bg-black/8 transition-colors">
            <p class="flex-1 font-body font-semibold text-label-lg text-primary-600">Eventos</p>
          </a>
          <a href="#" class="flex h-14 items-center px-4 py-2 w-full hover:bg-black/8 transition-colors">
            <p class="flex-1 font-body font-semibold text-label-lg text-primary-600">Ingredientes</p>
          </a>
          <a href="#" class="flex h-14 items-center px-4 py-2 w-full hover:bg-black/8 transition-colors">
            <p class="flex-1 font-body font-semibold text-label-lg text-primary-600">Indústria A&amp;B</p>
          </a>
          <a href="#" class="flex h-14 items-center px-4 py-2 w-full hover:bg-black/8 transition-colors">
            <p class="flex-1 font-body font-semibold text-label-lg text-primary-600">Proteína Animal</p>
          </a>
          <a href="#" class="flex h-14 items-center px-4 py-2 w-full hover:bg-black/8 transition-colors">
            <p class="flex-1 font-body font-semibold text-label-lg text-primary-600">Food Service</p>
          </a>
          <a href="#" class="flex h-14 items-center px-4 py-2 w-full hover:bg-black/8 transition-colors">
            <p class="flex-1 font-body font-semibold text-label-lg text-primary-600">Sorvetes</p>
          </a>
          <a href="#" class="flex h-14 items-center px-4 py-2 w-full hover:bg-black/8 transition-colors">
            <p class="flex-1 font-body font-semibold text-label-lg text-primary-600">Tecnologia</p>
          </a>
          <a href="#" class="flex h-14 items-center px-4 py-2 w-full hover:bg-black/8 transition-colors">
            <p class="flex-1 font-body font-semibold text-label-lg text-primary-600">Embalagens</p>
          </a>
        </nav>

        <!-- Footer -->
        <div class="flex flex-1 flex-col gap-4 items-start justify-end px-5 py-2 w-full">
          <?php get_template_part('components/_partials/divider', null, [ 'orientation' => 'horizontal' ]); ?>
          <p class="font-display font-bold text-title-md text-primary-600">informa</p>
        </div>
      </div>
    </aside>
  </div>

  <!-- ===== Level 1 · Mobile (com Anuncie + social) ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Level 1 · Mobile</p>
    <aside class="bg-white border-r border-primary-100 flex items-start max-w-[280px] min-w-[240px] py-2 w-[280px] h-[700px] overflow-hidden">
      <div class="flex flex-1 flex-col h-full items-start min-w-0">

        <div class="flex items-start px-3 py-2 w-full">
          <button type="button" aria-label="Fechar" class="inline-flex items-center justify-center p-2 rounded-full text-primary-600 hover:bg-neutral-50">
            <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
          </button>
        </div>

        <nav class="flex flex-col items-start w-full">
          <a href="#" class="flex h-14 items-center px-4 py-2 w-full hover:bg-black/8">
            <p class="flex-1 font-body font-semibold text-label-lg text-primary-600">Eventos</p>
          </a>
          <a href="#" class="flex h-14 items-center px-4 py-2 w-full hover:bg-black/8">
            <p class="flex-1 font-body font-semibold text-label-lg text-primary-600">Ingredientes</p>
          </a>
          <a href="#" class="flex h-14 items-center px-4 py-2 w-full hover:bg-black/8">
            <p class="flex-1 font-body font-semibold text-label-lg text-primary-600">Indústria A&amp;B</p>
          </a>
          <a href="#" class="flex h-14 items-center px-4 py-2 w-full hover:bg-black/8">
            <p class="flex-1 font-body font-semibold text-label-lg text-primary-600">Proteína Animal</p>
          </a>
        </nav>

        <div class="flex flex-1 flex-col gap-4 items-start justify-end px-5 pb-2 pt-3 w-full">
          <a href="#" class="bg-primary-600 inline-flex items-center justify-center px-5 py-2 rounded-full text-white font-body font-bold text-body-lg w-full">
            Anuncie
          </a>
          <div class="flex flex-wrap gap-1 items-center w-full">
            <a href="#" aria-label="WhatsApp" class="inline-flex items-center justify-center size-10 rounded-full text-primary-600 hover:bg-neutral-50">
              <svg class="size-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
            <a href="#" aria-label="LinkedIn" class="inline-flex items-center justify-center size-10 rounded-full text-primary-600 hover:bg-neutral-50">
              <svg class="size-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="#" aria-label="Facebook" class="inline-flex items-center justify-center size-10 rounded-full text-primary-600 hover:bg-neutral-50">
              <svg class="size-5" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="#" aria-label="YouTube" class="inline-flex items-center justify-center size-10 rounded-full text-primary-600 hover:bg-neutral-50">
              <svg class="size-5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a href="#" aria-label="X" class="inline-flex items-center justify-center size-10 rounded-full text-primary-600 hover:bg-neutral-50">
              <svg class="size-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          </div>
          <?php get_template_part('components/_partials/divider', null, [ 'orientation' => 'horizontal' ]); ?>
          <p class="font-display font-bold text-title-md text-primary-600">informa</p>
        </div>
      </div>
    </aside>
  </div>

  <!-- ===== Level 2 (subnav com Menu Title) ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Level 2 · com Menu Title</p>
    <aside class="bg-white border-r border-primary-100 flex items-start max-w-[280px] min-w-[240px] py-2 w-[280px] h-[500px] overflow-hidden">
      <div class="flex flex-1 flex-col h-full items-start min-w-0">

        <div class="flex items-start px-3 py-2 w-full">
          <button type="button" aria-label="Voltar" class="inline-flex items-center justify-center p-2 rounded-full text-primary-600 hover:bg-neutral-50">
            <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
          </button>
        </div>

        <!-- Menu Title -->
        <div class="flex h-14 items-center pl-6 pr-4 py-2 w-full">
          <p class="flex-1 font-display font-bold text-title-md text-neutral-700">Indústria A&amp;B</p>
        </div>

        <!-- Submenu items -->
        <nav class="flex flex-col items-start w-full">
          <a href="#" class="flex h-14 items-center px-4 py-2 w-full hover:bg-black/8">
            <p class="flex-1 font-body font-semibold text-label-lg text-primary-600">Bebidas</p>
          </a>
          <a href="#" class="flex h-14 items-center px-4 py-2 w-full hover:bg-black/8">
            <p class="flex-1 font-body font-semibold text-label-lg text-primary-600">Laticínios</p>
          </a>
          <a href="#" class="flex h-14 items-center px-4 py-2 w-full hover:bg-black/8">
            <p class="flex-1 font-body font-semibold text-label-lg text-primary-600">Padaria &amp; Confeitaria</p>
          </a>
          <a href="#" class="flex h-14 items-center px-4 py-2 w-full hover:bg-black/8">
            <p class="flex-1 font-body font-semibold text-label-lg text-primary-600">Snacks</p>
          </a>
          <a href="#" class="flex h-14 items-center px-4 py-2 w-full hover:bg-black/8">
            <p class="flex-1 font-body font-semibold text-label-lg text-primary-600">Pet Food</p>
          </a>
        </nav>

      </div>
    </aside>
  </div>

</div>
