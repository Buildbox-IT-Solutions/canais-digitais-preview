<?php
/**
 * Componente: Search view full-screen + Search Item
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=3148-50619
 * Variantes: 4 (labelText × listItems)
 *
 * Overlay full-screen de busca (mobile-first w-412). Características:
 *   - bg-white w-412
 *   - Header h-72: arrow_back icon-button + input/placeholder + close icon
 *     (apenas no estado Input)
 *   - Divider neutral-100
 *   - Lista de items:
 *     - Suggestion: search icon + texto cinza
 *     - Recentes: history icon + texto cinza
 *     - Veja também (News Card): categoria mint + título Aleo Bold 18
 *
 * 4 estados:
 *   - Input text · sem listItems  → header com input "Input text" + caret
 *   - Input text · com listItems  → header + lista de Suggestions
 *   - Supporting text · sem listItems → header com placeholder
 *   - Supporting text · com listItems → header + Recentes + "Últimas notícias" section
 *
 * Tokens: bg-white · text-primary-600 · text-neutral-900 · text-neutral-700 ·
 *         text-mint · border-neutral-100 · text-body-lg · text-title-md ·
 *         text-title-lg · font-body · font-display
 */
?>
<div class="space-y-10">

  <!-- ===== Input text · com listItems (suggestions) ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Input text · com Suggestions</p>
    <div class="bg-white flex flex-col items-start w-[412px] border border-neutral-100">

      <!-- Header -->
      <div class="bg-white flex gap-1 h-[72px] items-center p-1 w-full">
        <button type="button" aria-label="Voltar" class="inline-flex items-center justify-center p-2 rounded-full text-primary-600 hover:bg-neutral-50">
          <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <div class="flex flex-1 flex-col justify-center min-w-0">
          <div class="flex gap-px h-6 items-center py-2">
            <span class="font-body text-body-lg text-primary-600 whitespace-nowrap">Input text</span>
            <span class="inline-block w-px h-4 bg-primary-600 animate-pulse"></span>
          </div>
        </div>
        <button type="button" aria-label="Limpar" class="inline-flex items-center justify-center p-2 rounded-full text-primary-600 hover:bg-neutral-50">
          <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
      </div>

      <?php get_template_part('components/_partials/divider', null, [ 'orientation' => 'horizontal' ]); ?>

      <!-- Suggestions list -->
      <div class="flex flex-col items-start overflow-hidden w-full">
        <a href="#" class="flex gap-1 items-center pl-1 pr-4 py-1 w-full hover:bg-neutral-50">
          <div class="flex items-center p-2 shrink-0">
            <svg class="size-6 text-neutral-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          </div>
          <p class="flex-1 font-body text-body-lg text-neutral-900 truncate">suggestion 1</p>
        </a>
        <a href="#" class="flex gap-1 items-center pl-1 pr-4 py-1 w-full hover:bg-neutral-50">
          <div class="flex items-center p-2 shrink-0">
            <svg class="size-6 text-neutral-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          </div>
          <p class="flex-1 font-body text-body-lg text-neutral-900 truncate">suggestion 2</p>
        </a>
        <a href="#" class="flex gap-1 items-center pl-1 pr-4 py-1 w-full hover:bg-neutral-50">
          <div class="flex items-center p-2 shrink-0">
            <svg class="size-6 text-neutral-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          </div>
          <p class="flex-1 font-body text-body-lg text-neutral-900 truncate">suggestion 3</p>
        </a>
      </div>

    </div>
  </div>

  <!-- ===== Supporting text · com listItems (Recentes + Últimas notícias) ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Supporting text · com Recentes + Veja também</p>
    <div class="bg-white flex flex-col items-start w-[412px] border border-neutral-100">

      <!-- Header (placeholder) -->
      <div class="bg-white flex gap-1 h-[72px] items-center pl-1 pr-14 py-1 rounded-t-3xl w-full">
        <button type="button" aria-label="Voltar" class="inline-flex items-center justify-center p-2 rounded-full text-primary-600 hover:bg-neutral-50">
          <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <div class="flex flex-1 items-start min-w-0">
          <p class="flex-1 font-body text-body-lg text-neutral-900">Hinted search text</p>
        </div>
      </div>

      <?php get_template_part('components/_partials/divider', null, [ 'orientation' => 'horizontal' ]); ?>

      <div class="flex flex-col items-start overflow-hidden w-full">

        <!-- Recentes list -->
        <div class="flex flex-col items-start w-full">
          <a href="#" class="flex gap-1 items-center pl-1 pr-4 py-1 w-full hover:bg-neutral-50">
            <div class="flex items-center p-2 shrink-0">
              <svg class="size-6 text-neutral-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            </div>
            <p class="flex-1 font-body text-body-lg text-neutral-900 truncate">item searched</p>
          </a>
          <a href="#" class="flex gap-1 items-center pl-1 pr-4 py-1 w-full hover:bg-neutral-50">
            <div class="flex items-center p-2 shrink-0">
              <svg class="size-6 text-neutral-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            </div>
            <p class="flex-1 font-body text-body-lg text-neutral-900 truncate">item searched</p>
          </a>
          <a href="#" class="flex gap-1 items-center pl-1 pr-4 py-1 w-full hover:bg-neutral-50">
            <div class="flex items-center p-2 shrink-0">
              <svg class="size-6 text-neutral-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            </div>
            <p class="flex-1 font-body text-body-lg text-neutral-900 truncate">item searched</p>
          </a>
        </div>

        <!-- Últimas notícias section -->
        <div class="flex flex-col items-start pb-6 pt-4 w-full">
          <div class="flex items-center justify-center px-4 py-2 w-full">
            <p class="flex-1 font-display font-bold text-title-md text-neutral-700">Últimas notícias</p>
          </div>
          <a href="#" class="flex flex-col items-start px-4 py-3 w-full hover:bg-neutral-50">
            <div class="flex flex-col gap-3 items-start min-w-[288px] w-full">
              <div class="flex flex-col gap-2 items-start w-full">
                <span class="font-body font-semibold text-label-md text-mint">Categoria</span>
                <p class="font-display font-bold text-title-lg text-primary-600 line-clamp-2 w-full">
                  Lorem ipsum dolor sit amet consectetur. Neque eget lectus phasellus tristique amet elementum.
                </p>
              </div>
            </div>
          </a>
          <a href="#" class="flex flex-col items-start px-4 py-3 w-full hover:bg-neutral-50">
            <div class="flex flex-col gap-3 items-start min-w-[288px] w-full">
              <div class="flex flex-col gap-2 items-start w-full">
                <span class="font-body font-semibold text-label-md text-mint">Categoria</span>
                <p class="font-display font-bold text-title-lg text-primary-600 line-clamp-2 w-full">
                  Dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor.
                </p>
              </div>
            </div>
          </a>
          <a href="#" class="flex flex-col items-start px-4 py-3 w-full hover:bg-neutral-50">
            <div class="flex flex-col gap-3 items-start min-w-[288px] w-full">
              <div class="flex flex-col gap-2 items-start w-full">
                <span class="font-body font-semibold text-label-md text-mint">Categoria</span>
                <p class="font-display font-bold text-title-lg text-primary-600 line-clamp-2 w-full">
                  Ut enim ad minim veniam quis nostrud exercitation ullamco.
                </p>
              </div>
            </div>
          </a>
        </div>

      </div>

    </div>
  </div>

</div>
