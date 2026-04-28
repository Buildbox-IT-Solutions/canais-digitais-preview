<?php
/**
 * Componente: Checkboxes
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1944-7508
 * Variantes: type (Unselected|Selected|Indeterminate) × state (Enabled|Hovered|Focused|Pressed|Disabled) = 15
 *
 * Checkbox Material 3. Do M3 spec:
 * https://m3.material.io/components/checkbox/overview
 *
 * ANATOMIA:
 *   - Container square 18×18, rounded-xs (2px)
 *   - Border 2px neutral-950 (#283857) quando Unselected
 *   - bg secondary-950 (#003cb2) quando Selected/Indeterminate
 *   - bg neutral-950 (#283857) quando Disabled+Selected/Indeterminate
 *   - State-layer chip 42×42 rounded-full por trás (Hovered/Focused/Pressed)
 *   - Estado layer cor: rgba(0,0,0,0.08)
 *   - Disabled: opacity-38
 *   - Pressed: ripple effect (omitido aqui — animação custom)
 *
 * Tokens: bg-secondary-950 · bg-neutral-950 · border-neutral-950 ·
 *         text-white · rounded-xs
 */
?>
<div class="space-y-8">

  <!-- ===== UNSELECTED ===== -->
  <div class="space-y-3">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Unselected · Enabled · Hovered · Focused · Pressed · Disabled</p>
    <div class="flex flex-wrap items-center gap-4">

      <!-- Enabled -->
      <div class="flex items-center justify-center p-3">
        <div class="size-[18px] rounded-xs border-2 border-neutral-950"></div>
      </div>

      <!-- Hovered (state layer) -->
      <div class="flex items-center justify-center p-3 rounded-full bg-black/8">
        <div class="size-[18px] rounded-xs border-2 border-neutral-950"></div>
      </div>

      <!-- Focused (state layer) -->
      <div class="flex items-center justify-center p-3 rounded-full bg-black/8">
        <div class="size-[18px] rounded-xs border-2 border-neutral-950"></div>
      </div>

      <!-- Pressed (state layer com ripple suggestion) -->
      <div class="flex items-center justify-center p-3 rounded-full bg-black/8">
        <div class="size-[18px] rounded-xs border-2 border-neutral-950"></div>
      </div>

      <!-- Disabled -->
      <div class="flex items-center justify-center p-3 opacity-[.38]">
        <div class="size-[18px] rounded-xs border-2 border-neutral-950"></div>
      </div>

    </div>
  </div>

  <!-- ===== SELECTED ===== -->
  <div class="space-y-3">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Selected · Enabled · Hovered · Focused · Pressed · Disabled</p>
    <div class="flex flex-wrap items-center gap-4">

      <!-- Enabled -->
      <div class="flex items-center justify-center p-3">
        <div class="relative size-[18px] rounded-xs bg-secondary-950">
          <svg class="absolute size-6 -top-[3px] -left-[3px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 12l4 4 8-8"/></svg>
        </div>
      </div>

      <!-- Hovered -->
      <div class="flex items-center justify-center p-3 rounded-full bg-black/8">
        <div class="relative size-[18px] rounded-xs bg-secondary-950">
          <svg class="absolute size-6 -top-[3px] -left-[3px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 12l4 4 8-8"/></svg>
        </div>
      </div>

      <!-- Focused -->
      <div class="flex items-center justify-center p-3 rounded-full bg-black/8">
        <div class="relative size-[18px] rounded-xs bg-secondary-950">
          <svg class="absolute size-6 -top-[3px] -left-[3px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 12l4 4 8-8"/></svg>
        </div>
      </div>

      <!-- Pressed -->
      <div class="flex items-center justify-center p-3 overflow-hidden rounded-full bg-black/8">
        <div class="relative size-[18px] rounded-xs bg-secondary-950">
          <svg class="absolute size-6 -top-[3px] -left-[3px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 12l4 4 8-8"/></svg>
        </div>
      </div>

      <!-- Disabled -->
      <div class="flex items-center justify-center p-3 opacity-[.38]">
        <div class="relative size-[18px] rounded-xs bg-neutral-950">
          <svg class="absolute size-6 -top-[3px] -left-[3px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 12l4 4 8-8"/></svg>
        </div>
      </div>

    </div>
  </div>

  <!-- ===== INDETERMINATE ===== -->
  <div class="space-y-3">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Indeterminate · Enabled · Hovered · Focused · Pressed · Disabled</p>
    <div class="flex flex-wrap items-center gap-4">

      <!-- Enabled -->
      <div class="flex items-center justify-center p-3">
        <div class="relative size-[18px] rounded-xs bg-secondary-950">
          <svg class="absolute size-6 -top-[3px] -left-[3px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 12h12"/></svg>
        </div>
      </div>

      <!-- Hovered -->
      <div class="flex items-center justify-center p-3 rounded-full bg-black/8">
        <div class="relative size-[18px] rounded-xs bg-secondary-950">
          <svg class="absolute size-6 -top-[3px] -left-[3px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 12h12"/></svg>
        </div>
      </div>

      <!-- Focused -->
      <div class="flex items-center justify-center p-3 rounded-full bg-black/8">
        <div class="relative size-[18px] rounded-xs bg-secondary-950">
          <svg class="absolute size-6 -top-[3px] -left-[3px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 12h12"/></svg>
        </div>
      </div>

      <!-- Pressed -->
      <div class="flex items-center justify-center p-3 overflow-hidden rounded-full bg-black/8">
        <div class="relative size-[18px] rounded-xs bg-secondary-950">
          <svg class="absolute size-6 -top-[3px] -left-[3px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 12h12"/></svg>
        </div>
      </div>

      <!-- Disabled -->
      <div class="flex items-center justify-center p-3 opacity-[.38]">
        <div class="relative size-[18px] rounded-xs bg-neutral-950">
          <svg class="absolute size-6 -top-[3px] -left-[3px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 12h12"/></svg>
        </div>
      </div>

    </div>
  </div>

  <!-- ===== Exemplo de uso (com label) ===== -->
  <div class="space-y-3 max-w-[400px]">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Exemplo de uso · grupo com label</p>
    <fieldset class="space-y-2 p-4 rounded-sm border border-neutral-100">
      <legend class="px-2 text-label-md font-body font-semibold text-primary-600">Editorias</legend>
      <label class="flex items-center cursor-pointer">
        <span class="flex items-center justify-center p-3 rounded-full hover:bg-black/8 transition-colors">
          <span class="relative size-[18px] rounded-xs bg-secondary-950">
            <svg class="absolute size-6 -top-[3px] -left-[3px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 12l4 4 8-8"/></svg>
          </span>
        </span>
        <span class="text-body-md font-body text-neutral-950">Eventos</span>
      </label>
      <label class="flex items-center cursor-pointer">
        <span class="flex items-center justify-center p-3 rounded-full hover:bg-black/8 transition-colors">
          <span class="size-[18px] rounded-xs border-2 border-neutral-950"></span>
        </span>
        <span class="text-body-md font-body text-neutral-950">Ingredientes</span>
      </label>
      <label class="flex items-center cursor-pointer">
        <span class="flex items-center justify-center p-3 rounded-full hover:bg-black/8 transition-colors">
          <span class="relative size-[18px] rounded-xs bg-secondary-950">
            <svg class="absolute size-6 -top-[3px] -left-[3px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 12h12"/></svg>
          </span>
        </span>
        <span class="text-body-md font-body text-neutral-950">Indústria A&amp;B</span>
      </label>
      <label class="flex items-center cursor-pointer">
        <span class="flex items-center justify-center p-3 rounded-full hover:bg-black/8 transition-colors">
          <span class="size-[18px] rounded-xs border-2 border-neutral-950"></span>
        </span>
        <span class="text-body-md font-body text-neutral-950">Tecnologia</span>
      </label>
    </fieldset>
  </div>

</div>
