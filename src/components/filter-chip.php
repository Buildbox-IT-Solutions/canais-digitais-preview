<?php
/**
 * Componente: Filter chip
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1859-18460
 * Variantes: configuration × state (6) × selected × trailing icon = 48
 * Tokens usados: neutral-100 (border) · neutral-50 (hover) · neutral-950 (text) ·
 *               secondary-50 (selected bg) · primary-600 (selected text) ·
 *               text-label-lg · font-body · rounded-full
 *
 * Filter chip do Material 3. Usa `aria-pressed` como source of truth pro estado
 * "selected" — o Tailwind v4 reage via `aria-pressed:` modifier.
 *
 * BASE (sempre):
 *   group inline-flex items-center gap-2 h-8 rounded-full transition-colors
 *   border border-neutral-100 bg-white text-neutral-950
 *   hover:bg-neutral-50 active:bg-neutral-50
 *   focus-visible:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-secondary-500 focus-visible:outline-offset-2
 *   disabled:opacity-50 disabled:cursor-not-allowed
 *   text-label-lg font-body font-bold
 *   aria-pressed:bg-secondary-50 aria-pressed:border-transparent aria-pressed:text-primary-600
 *
 * PADDING POR CONFIGURAÇÃO (Material 3)
 * (padY = py-2 implícito via h-8 + items-center; padX varia conforme ícones)
 *
 *   Config                                  padLeft  padRight   classes
 *   Label only, sem trailing                16       16         pl-4 pr-4 aria-pressed:pl-2
 *   Label only, com trailing                16       8          pl-4 pr-2 aria-pressed:pl-2
 *   Label & leading, sem trailing            8       16         pl-2 pr-4
 *   Label & leading, com trailing            8       8          px-2
 *
 * Regra: "se tem ícone de um lado, reduz o padding daquele lado de 16 pra 8"
 * (mesma regra do Button [1.1]). Quando selected, o checkmark vira um leading
 * icon de fato — por isso as variants "Label only" precisam de `aria-pressed:pl-2`
 * pra reagir automaticamente quando o estado muda em runtime.
 *
 * ÍCONES:
 *   - Leading icon: visível quando NÃO selected (`group-aria-pressed:hidden`)
 *   - Checkmark: visível quando SELECTED (`hidden group-aria-pressed:inline-flex`)
 *   - Trailing icon: independente, controla via presença do <svg> no markup.
 *
 * ESTADOS DO FIGMA → CSS:
 *   Enabled    → padrão
 *   Hovered    → :hover
 *   Focused    → :focus-visible (outline ring)
 *   Pressed    → :active
 *   Dragged    → não implementado (raro em web)
 *   Disabled   → :disabled (opacity-50)
 */
?>
<div class="space-y-6">

  <!-- ===== NOT SELECTED ===== -->
  <div class="space-y-3">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Not selected</p>
    <div class="flex flex-wrap items-center gap-3">

      <!-- Config A — Label only, no trailing → pl-4 pr-4 + aria-pressed:pl-2 -->
      <button type="button" aria-pressed="false" class="group inline-flex items-center gap-2 h-8 pl-4 pr-4 aria-pressed:pl-2 rounded-full transition-colors border border-neutral-100 bg-white text-neutral-950 hover:bg-neutral-50 active:bg-neutral-50 focus-visible:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-secondary-500 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-label-lg font-body font-bold aria-pressed:bg-secondary-50 aria-pressed:border-transparent aria-pressed:text-primary-600">
        Label
      </button>

      <!-- Config C — Label & leading, no trailing → pl-2 pr-4 -->
      <button type="button" aria-pressed="false" class="group inline-flex items-center gap-2 h-8 pl-2 pr-4 rounded-full transition-colors border border-neutral-100 bg-white text-neutral-950 hover:bg-neutral-50 active:bg-neutral-50 focus-visible:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-secondary-500 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-label-lg font-body font-bold aria-pressed:bg-secondary-50 aria-pressed:border-transparent aria-pressed:text-primary-600">
        <svg class="size-[18px] group-aria-pressed:hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        <svg class="size-[18px] hidden group-aria-pressed:inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg>
        Label
      </button>

      <!-- Config B — Label only, with trailing → pl-4 pr-2 + aria-pressed:pl-2 -->
      <button type="button" aria-pressed="false" class="group inline-flex items-center gap-2 h-8 pl-4 pr-2 aria-pressed:pl-2 rounded-full transition-colors border border-neutral-100 bg-white text-neutral-950 hover:bg-neutral-50 active:bg-neutral-50 focus-visible:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-secondary-500 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-label-lg font-body font-bold aria-pressed:bg-secondary-50 aria-pressed:border-transparent aria-pressed:text-primary-600">
        Label
        <svg class="size-[18px]" viewBox="0 0 24 24" fill="currentColor"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>
      </button>

      <!-- Config D — Label & leading, with trailing → px-2 -->
      <button type="button" aria-pressed="false" class="group inline-flex items-center gap-2 h-8 px-2 rounded-full transition-colors border border-neutral-100 bg-white text-neutral-950 hover:bg-neutral-50 active:bg-neutral-50 focus-visible:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-secondary-500 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-label-lg font-body font-bold aria-pressed:bg-secondary-50 aria-pressed:border-transparent aria-pressed:text-primary-600">
        <svg class="size-[18px] group-aria-pressed:hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        <svg class="size-[18px] hidden group-aria-pressed:inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg>
        Label
        <svg class="size-[18px]" viewBox="0 0 24 24" fill="currentColor"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>
      </button>

      <!-- Disabled (Config A) -->
      <button type="button" aria-pressed="false" disabled class="group inline-flex items-center gap-2 h-8 pl-4 pr-4 aria-pressed:pl-2 rounded-full transition-colors border border-neutral-100 bg-white text-neutral-950 hover:bg-neutral-50 active:bg-neutral-50 focus-visible:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-secondary-500 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-label-lg font-body font-bold aria-pressed:bg-secondary-50 aria-pressed:border-transparent aria-pressed:text-primary-600">
        Disabled
      </button>

    </div>
  </div>

  <!-- ===== SELECTED (aria-pressed="true") ===== -->
  <!-- Mesma classe-base dos Not selected: aria-pressed:pl-2 faz o pl colapsar de 4 pra 2 -->
  <div class="space-y-3">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Selected (aria-pressed=true)</p>
    <div class="flex flex-wrap items-center gap-3">

      <!-- Config A selected — checkmark prepended; pl-4 → pl-2 via aria-pressed -->
      <button type="button" aria-pressed="true" class="group inline-flex items-center gap-2 h-8 pl-4 pr-4 aria-pressed:pl-2 rounded-full transition-colors border border-neutral-100 bg-white text-neutral-950 hover:bg-neutral-50 active:bg-neutral-50 focus-visible:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-secondary-500 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-label-lg font-body font-bold aria-pressed:bg-secondary-50 aria-pressed:border-transparent aria-pressed:text-primary-600">
        <svg class="size-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg>
        Label
      </button>

      <!-- Config C selected — leading vira checkmark via group-aria-pressed -->
      <button type="button" aria-pressed="true" class="group inline-flex items-center gap-2 h-8 pl-2 pr-4 rounded-full transition-colors border border-neutral-100 bg-white text-neutral-950 hover:bg-neutral-50 active:bg-neutral-50 focus-visible:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-secondary-500 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-label-lg font-body font-bold aria-pressed:bg-secondary-50 aria-pressed:border-transparent aria-pressed:text-primary-600">
        <svg class="size-[18px] group-aria-pressed:hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        <svg class="size-[18px] hidden group-aria-pressed:inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg>
        Label
      </button>

      <!-- Config B selected — checkmark prepended + trailing; pl-4 → pl-2 -->
      <button type="button" aria-pressed="true" class="group inline-flex items-center gap-2 h-8 pl-4 pr-2 aria-pressed:pl-2 rounded-full transition-colors border border-neutral-100 bg-white text-neutral-950 hover:bg-neutral-50 active:bg-neutral-50 focus-visible:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-secondary-500 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-label-lg font-body font-bold aria-pressed:bg-secondary-50 aria-pressed:border-transparent aria-pressed:text-primary-600">
        <svg class="size-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg>
        Label
        <svg class="size-[18px]" viewBox="0 0 24 24" fill="currentColor"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>
      </button>

    </div>
  </div>

  <p class="text-body-sm text-neutral-700">
    <strong>Dica:</strong> os chips são realmente clicáveis — Tab pra focar (vê o outline secondary-500). Em runtime, trocar <code>aria-pressed</code> via JS faz o chip morfar entre os estados incluindo o ajuste de padding (<code>pl-4</code> → <code>pl-2</code>).
  </p>

</div>
