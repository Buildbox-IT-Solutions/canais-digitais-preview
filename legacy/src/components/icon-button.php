<?php
/**
 * Componente: Icon Button [1.0]
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=71-6001
 * Variantes: type (filled|outlined|ghost) × size (large|medium|small) × state (enabled|hovered|disabled) = 27
 * Tokens usados: primary-600 · secondary-950 · neutral-50 · neutral-200 · rounded-full
 *
 * Versão "só ícone" do Button [1.1]. Mesma paleta e mesmas regras de estado,
 * mas quadrado (não pill com texto) e icon-only.
 *
 * BASE:
 *   inline-flex items-center justify-center rounded-full
 *   transition-colors disabled:cursor-not-allowed
 *
 * TIPO (mesmas cores do Button [1.1], mas border é 1px — não 1.5):
 *   Filled    → bg-primary-600 text-white hover:bg-secondary-950 disabled:bg-neutral-200
 *   Outlined  → border border-primary-600 text-primary-600
 *               hover:bg-neutral-50 disabled:border-neutral-200 disabled:text-neutral-200
 *   Ghost     → text-primary-600 hover:bg-neutral-50 disabled:text-neutral-200
 *
 * SIZE (container quadrado, padding p-2 em todos, ícone central):
 *   Large   → h-12 w-12  · icon size-6      (24px)
 *   Medium  → h-10 w-10  · icon size-[18px] (18px — não tem token default)
 *   Small   → h-8  w-8   · icon size-3      (12px)
 *
 * ÍCONE: usa `currentColor` pra herdar o text color do button (funciona com
 * hover/disabled automaticamente).
 */
?>
<div class="space-y-8">

  <!-- ===================== FILLED ===================== -->
  <div class="space-y-3">
    <h3 class="text-label-md font-bold uppercase tracking-wider text-neutral-700">Filled</h3>
    <div class="flex flex-wrap items-center gap-4">

      <button type="button" aria-label="Adicionar" class="inline-flex items-center justify-center rounded-full transition-colors disabled:cursor-not-allowed bg-primary-600 text-white hover:bg-secondary-950 disabled:bg-neutral-200 h-12 w-12">
        <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
      </button>

      <button type="button" aria-label="Adicionar" class="inline-flex items-center justify-center rounded-full transition-colors disabled:cursor-not-allowed bg-primary-600 text-white hover:bg-secondary-950 disabled:bg-neutral-200 h-10 w-10">
        <svg class="size-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
      </button>

      <button type="button" aria-label="Adicionar" class="inline-flex items-center justify-center rounded-full transition-colors disabled:cursor-not-allowed bg-primary-600 text-white hover:bg-secondary-950 disabled:bg-neutral-200 h-8 w-8">
        <svg class="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
      </button>

      <button type="button" aria-label="Adicionar" disabled class="inline-flex items-center justify-center rounded-full transition-colors disabled:cursor-not-allowed bg-primary-600 text-white hover:bg-secondary-950 disabled:bg-neutral-200 h-12 w-12">
        <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
      </button>

    </div>
  </div>

  <!-- ===================== OUTLINED ===================== -->
  <div class="space-y-3">
    <h3 class="text-label-md font-bold uppercase tracking-wider text-neutral-700">Outlined</h3>
    <div class="flex flex-wrap items-center gap-4">

      <button type="button" aria-label="Favoritar" class="inline-flex items-center justify-center rounded-full transition-colors disabled:cursor-not-allowed border border-primary-600 text-primary-600 hover:bg-neutral-50 disabled:border-neutral-200 disabled:text-neutral-200 h-12 w-12">
        <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      </button>

      <button type="button" aria-label="Favoritar" class="inline-flex items-center justify-center rounded-full transition-colors disabled:cursor-not-allowed border border-primary-600 text-primary-600 hover:bg-neutral-50 disabled:border-neutral-200 disabled:text-neutral-200 h-10 w-10">
        <svg class="size-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      </button>

      <button type="button" aria-label="Favoritar" class="inline-flex items-center justify-center rounded-full transition-colors disabled:cursor-not-allowed border border-primary-600 text-primary-600 hover:bg-neutral-50 disabled:border-neutral-200 disabled:text-neutral-200 h-8 w-8">
        <svg class="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      </button>

      <button type="button" aria-label="Favoritar" disabled class="inline-flex items-center justify-center rounded-full transition-colors disabled:cursor-not-allowed border border-primary-600 text-primary-600 hover:bg-neutral-50 disabled:border-neutral-200 disabled:text-neutral-200 h-12 w-12">
        <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      </button>

    </div>
  </div>

  <!-- ===================== GHOST ===================== -->
  <div class="space-y-3">
    <h3 class="text-label-md font-bold uppercase tracking-wider text-neutral-700">Ghost</h3>
    <div class="flex flex-wrap items-center gap-4">

      <button type="button" aria-label="Compartilhar" class="inline-flex items-center justify-center rounded-full transition-colors disabled:cursor-not-allowed text-primary-600 hover:bg-neutral-50 disabled:text-neutral-200 h-12 w-12">
        <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/></svg>
      </button>

      <button type="button" aria-label="Compartilhar" class="inline-flex items-center justify-center rounded-full transition-colors disabled:cursor-not-allowed text-primary-600 hover:bg-neutral-50 disabled:text-neutral-200 h-10 w-10">
        <svg class="size-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/></svg>
      </button>

      <button type="button" aria-label="Compartilhar" class="inline-flex items-center justify-center rounded-full transition-colors disabled:cursor-not-allowed text-primary-600 hover:bg-neutral-50 disabled:text-neutral-200 h-8 w-8">
        <svg class="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/></svg>
      </button>

      <button type="button" aria-label="Compartilhar" disabled class="inline-flex items-center justify-center rounded-full transition-colors disabled:cursor-not-allowed text-primary-600 hover:bg-neutral-50 disabled:text-neutral-200 h-12 w-12">
        <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/></svg>
      </button>

    </div>
  </div>

</div>
