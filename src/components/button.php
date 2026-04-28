<?php
/**
 * Componente: Button [1.1]
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=3185-47973
 * Variantes: type (filled|outlined|ghost) × size (large|medium|small) × state (enabled|hovered|disabled) × left/right icon
 * Tokens usados: primary-600 · secondary-950 · neutral-50 · neutral-200 · text-body-lg · text-title-sm · font-body · rounded-full
 *
 * 81 variants do Figma → 1 componente parametrizado por classes utilitárias.
 *
 * BASE (sempre presente):
 *   inline-flex items-center justify-center rounded-full font-body font-bold
 *   transition-colors disabled:cursor-not-allowed
 *
 * TIPO:
 *   Filled    → bg-primary-600 text-white hover:bg-secondary-950 disabled:bg-neutral-200
 *   Outlined  → bg-transparent text-primary-600 border-[1.5px] border-primary-600
 *               hover:bg-neutral-50 disabled:border-neutral-200 disabled:text-neutral-200
 *   Ghost     → bg-transparent text-primary-600 hover:bg-neutral-50 disabled:text-neutral-200
 *
 * TAMANHO E PADDING POR PRESENÇA DE ÍCONE
 * (Material 3 compensa o peso visual do ícone reduzindo o padding daquele lado)
 *
 *           h    gap   text         no-icon   icon-left      icon-right     icon-size
 *   Large   12   3    body-lg      px-6      pl-5 pr-6      pl-6 pr-5      6 (24px)
 *   Medium  10   2    body-lg      px-6      pl-4 pr-5      pl-5 pr-4      6 (24px)
 *   Small    8   2    title-sm     px-3      pl-3 pr-4      pl-4 pr-3      5 (20px)
 *
 * ÍCONES: <svg class="size-6" ...> antes ou depois do texto. Estado :hover
 * e [disabled] são automáticos via pseudo-classes — sem precisar trocar markup.
 * IMPORTANTE: o Dev deve trocar a classe de padding ao adicionar/remover ícone.
 */
?>
<div class="space-y-8">

  <!-- ===================== FILLED ===================== -->
  <div class="space-y-3">
    <h3 class="text-label-md font-bold uppercase tracking-wider text-neutral-700">Filled</h3>
    <div class="flex flex-wrap items-center gap-4">

      <!-- Large -->
      <button type="button" class="inline-flex items-center justify-center rounded-full font-body font-bold transition-colors disabled:cursor-not-allowed bg-primary-600 text-white hover:bg-secondary-950 disabled:bg-neutral-200 h-12 pl-5 pr-6 gap-3 text-body-lg">
        <svg class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
        Label
      </button>

      <button type="button" class="inline-flex items-center justify-center rounded-full font-body font-bold transition-colors disabled:cursor-not-allowed bg-primary-600 text-white hover:bg-secondary-950 disabled:bg-neutral-200 h-12 px-6 gap-3 text-body-lg">
        Label
      </button>

      <button type="button" class="inline-flex items-center justify-center rounded-full font-body font-bold transition-colors disabled:cursor-not-allowed bg-primary-600 text-white hover:bg-secondary-950 disabled:bg-neutral-200 h-12 pl-6 pr-5 gap-3 text-body-lg">
        Label
        <svg class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
      </button>

      <!-- Medium -->
      <button type="button" class="inline-flex items-center justify-center rounded-full font-body font-bold transition-colors disabled:cursor-not-allowed bg-primary-600 text-white hover:bg-secondary-950 disabled:bg-neutral-200 h-10 pl-4 pr-5 gap-2 text-body-lg">
        <svg class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
        Label
      </button>

      <button type="button" class="inline-flex items-center justify-center rounded-full font-body font-bold transition-colors disabled:cursor-not-allowed bg-primary-600 text-white hover:bg-secondary-950 disabled:bg-neutral-200 h-10 px-6 gap-2 text-body-lg">
        Label
      </button>

      <!-- Small -->
      <button type="button" class="inline-flex items-center justify-center rounded-full font-body font-bold transition-colors disabled:cursor-not-allowed bg-primary-600 text-white hover:bg-secondary-950 disabled:bg-neutral-200 h-8 pl-3 pr-4 gap-2 text-title-sm">
        <svg class="size-5" viewBox="0 0 24 24" fill="currentColor"><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
        Label
      </button>

      <button type="button" class="inline-flex items-center justify-center rounded-full font-body font-bold transition-colors disabled:cursor-not-allowed bg-primary-600 text-white hover:bg-secondary-950 disabled:bg-neutral-200 h-8 px-3 gap-2 text-title-sm">
        Label
      </button>

      <!-- Disabled (Large no-icon) -->
      <button type="button" disabled class="inline-flex items-center justify-center rounded-full font-body font-bold transition-colors disabled:cursor-not-allowed bg-primary-600 text-white hover:bg-secondary-950 disabled:bg-neutral-200 h-12 px-6 gap-3 text-body-lg">
        Disabled
      </button>

    </div>
  </div>

  <!-- ===================== OUTLINED ===================== -->
  <div class="space-y-3">
    <h3 class="text-label-md font-bold uppercase tracking-wider text-neutral-700">Outlined</h3>
    <div class="flex flex-wrap items-center gap-4">

      <!-- Large -->
      <button type="button" class="inline-flex items-center justify-center rounded-full font-body font-bold transition-colors disabled:cursor-not-allowed border-[1.5px] border-primary-600 text-primary-600 hover:bg-neutral-50 disabled:border-neutral-200 disabled:text-neutral-200 h-12 pl-5 pr-6 gap-3 text-body-lg">
        <svg class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
        Label
      </button>

      <button type="button" class="inline-flex items-center justify-center rounded-full font-body font-bold transition-colors disabled:cursor-not-allowed border-[1.5px] border-primary-600 text-primary-600 hover:bg-neutral-50 disabled:border-neutral-200 disabled:text-neutral-200 h-12 px-6 gap-3 text-body-lg">
        Label
      </button>

      <button type="button" class="inline-flex items-center justify-center rounded-full font-body font-bold transition-colors disabled:cursor-not-allowed border-[1.5px] border-primary-600 text-primary-600 hover:bg-neutral-50 disabled:border-neutral-200 disabled:text-neutral-200 h-12 pl-6 pr-5 gap-3 text-body-lg">
        Label
        <svg class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
      </button>

      <!-- Medium -->
      <button type="button" class="inline-flex items-center justify-center rounded-full font-body font-bold transition-colors disabled:cursor-not-allowed border-[1.5px] border-primary-600 text-primary-600 hover:bg-neutral-50 disabled:border-neutral-200 disabled:text-neutral-200 h-10 px-6 gap-2 text-body-lg">
        Label
      </button>

      <!-- Small -->
      <button type="button" class="inline-flex items-center justify-center rounded-full font-body font-bold transition-colors disabled:cursor-not-allowed border-[1.5px] border-primary-600 text-primary-600 hover:bg-neutral-50 disabled:border-neutral-200 disabled:text-neutral-200 h-8 pl-4 pr-3 gap-2 text-title-sm">
        Label
        <svg class="size-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
      </button>

      <!-- Disabled -->
      <button type="button" disabled class="inline-flex items-center justify-center rounded-full font-body font-bold transition-colors disabled:cursor-not-allowed border-[1.5px] border-primary-600 text-primary-600 hover:bg-neutral-50 disabled:border-neutral-200 disabled:text-neutral-200 h-12 px-6 gap-3 text-body-lg">
        Disabled
      </button>

    </div>
  </div>

  <!-- ===================== GHOST ===================== -->
  <div class="space-y-3">
    <h3 class="text-label-md font-bold uppercase tracking-wider text-neutral-700">Ghost</h3>
    <div class="flex flex-wrap items-center gap-4">

      <!-- Large -->
      <button type="button" class="inline-flex items-center justify-center rounded-full font-body font-bold transition-colors disabled:cursor-not-allowed text-primary-600 hover:bg-neutral-50 disabled:text-neutral-200 h-12 pl-5 pr-6 gap-3 text-body-lg">
        <svg class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
        Label
      </button>

      <button type="button" class="inline-flex items-center justify-center rounded-full font-body font-bold transition-colors disabled:cursor-not-allowed text-primary-600 hover:bg-neutral-50 disabled:text-neutral-200 h-12 px-6 gap-3 text-body-lg">
        Label
      </button>

      <!-- Medium -->
      <button type="button" class="inline-flex items-center justify-center rounded-full font-body font-bold transition-colors disabled:cursor-not-allowed text-primary-600 hover:bg-neutral-50 disabled:text-neutral-200 h-10 pl-5 pr-4 gap-2 text-body-lg">
        Label
        <svg class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
      </button>

      <!-- Small -->
      <button type="button" class="inline-flex items-center justify-center rounded-full font-body font-bold transition-colors disabled:cursor-not-allowed text-primary-600 hover:bg-neutral-50 disabled:text-neutral-200 h-8 px-3 gap-2 text-title-sm">
        Label
      </button>

      <!-- Disabled -->
      <button type="button" disabled class="inline-flex items-center justify-center rounded-full font-body font-bold transition-colors disabled:cursor-not-allowed text-primary-600 hover:bg-neutral-50 disabled:text-neutral-200 h-12 px-6 gap-3 text-body-lg">
        Disabled
      </button>

    </div>
  </div>

</div>
