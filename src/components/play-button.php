<?php
/**
 * Componente: Play Button 2.0
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=2279-19957
 * Variantes: type (play|pause) × state (enabled|hovered|disabled) × size (xl|lg|md|sm) = 24
 * Tokens usados: bg-white · bg-neutral-200 · text-primary-600 · text-secondary-950 ·
 *               text-white · rounded-full
 *
 * Pill branca circular usada como overlay de play em thumbnails de vídeo e podcast.
 * Estado Hovered muda SÓ a cor do ícone (não o bg) — bg stays white, ícone vai de
 * primary-600 → secondary-950. Isso é diferente dos outros Buttons que mudam o bg.
 *
 * BASE:
 *   inline-flex items-center justify-center rounded-full transition-colors
 *   bg-white text-primary-600
 *   hover:text-secondary-950
 *   disabled:bg-neutral-200 disabled:text-white disabled:cursor-not-allowed
 *
 * SIZES (container + padding + icon — todos match content area exatamente):
 *   XLarge  → size-18 (72px) · p-4  · icon size-10 (40px)
 *   Large   → size-16 (64px) · p-4  · icon size-8  (32px)
 *   Medium  → size-12 (48px) · p-3  · icon size-6  (24px)
 *   Small   → size-10 (40px) · p-2  · icon size-6  (24px)
 *
 * ÍCONES (inline SVG Material style, fill=currentColor herdando text-*):
 *   Play  → <path d="M8 5v14l11-7L8 5z"/>
 *   Pause → <path d="M6 5h4v14H6zM14 5h4v14h-4z"/>
 *
 * USO EM CARDS (overlay sobre imagem):
 *   Dentro de um <a> wrapper de imagem clicável, o Play Button NÃO pode ser um
 *   <button> (nesting inválido HTML: interactive within interactive). Trocar por
 *   <div> com as MESMAS classes visuais, sem interação própria. Ver video-card.php
 *   e podcast-card.php.
 */
?>
<div class="space-y-6">

  <!-- ===== PLAY · 4 sizes · Enabled ===== -->
  <div class="space-y-3">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Play · Enabled · 4 sizes</p>
    <div class="flex flex-wrap items-end gap-4">

      <button type="button" aria-label="Reproduzir" class="inline-flex items-center justify-center rounded-full transition-colors bg-white text-primary-600 hover:text-secondary-950 disabled:bg-neutral-200 disabled:text-white disabled:cursor-not-allowed size-18 p-4">
        <svg class="size-10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7L8 5z"/></svg>
      </button>

      <button type="button" aria-label="Reproduzir" class="inline-flex items-center justify-center rounded-full transition-colors bg-white text-primary-600 hover:text-secondary-950 disabled:bg-neutral-200 disabled:text-white disabled:cursor-not-allowed size-16 p-4">
        <svg class="size-8" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7L8 5z"/></svg>
      </button>

      <button type="button" aria-label="Reproduzir" class="inline-flex items-center justify-center rounded-full transition-colors bg-white text-primary-600 hover:text-secondary-950 disabled:bg-neutral-200 disabled:text-white disabled:cursor-not-allowed size-12 p-3">
        <svg class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7L8 5z"/></svg>
      </button>

      <button type="button" aria-label="Reproduzir" class="inline-flex items-center justify-center rounded-full transition-colors bg-white text-primary-600 hover:text-secondary-950 disabled:bg-neutral-200 disabled:text-white disabled:cursor-not-allowed size-10 p-2">
        <svg class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7L8 5z"/></svg>
      </button>

    </div>
  </div>

  <!-- ===== PAUSE · 4 sizes · Enabled ===== -->
  <div class="space-y-3">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Pause · Enabled · 4 sizes</p>
    <div class="flex flex-wrap items-end gap-4">

      <button type="button" aria-label="Pausar" class="inline-flex items-center justify-center rounded-full transition-colors bg-white text-primary-600 hover:text-secondary-950 disabled:bg-neutral-200 disabled:text-white disabled:cursor-not-allowed size-18 p-4">
        <svg class="size-10" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>
      </button>

      <button type="button" aria-label="Pausar" class="inline-flex items-center justify-center rounded-full transition-colors bg-white text-primary-600 hover:text-secondary-950 disabled:bg-neutral-200 disabled:text-white disabled:cursor-not-allowed size-16 p-4">
        <svg class="size-8" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>
      </button>

      <button type="button" aria-label="Pausar" class="inline-flex items-center justify-center rounded-full transition-colors bg-white text-primary-600 hover:text-secondary-950 disabled:bg-neutral-200 disabled:text-white disabled:cursor-not-allowed size-12 p-3">
        <svg class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>
      </button>

      <button type="button" aria-label="Pausar" class="inline-flex items-center justify-center rounded-full transition-colors bg-white text-primary-600 hover:text-secondary-950 disabled:bg-neutral-200 disabled:text-white disabled:cursor-not-allowed size-10 p-2">
        <svg class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>
      </button>

    </div>
  </div>

  <!-- ===== STATES · Play Medium ===== -->
  <div class="space-y-3">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">States · Play · Medium</p>
    <div class="flex flex-wrap items-center gap-4">

      <!-- Enabled -->
      <button type="button" aria-label="Reproduzir" class="inline-flex items-center justify-center rounded-full transition-colors bg-white text-primary-600 hover:text-secondary-950 disabled:bg-neutral-200 disabled:text-white disabled:cursor-not-allowed size-12 p-3">
        <svg class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7L8 5z"/></svg>
      </button>
      <span class="text-label-md text-neutral-700">Enabled</span>

      <!-- Hovered (forçado pra preview) -->
      <button type="button" aria-label="Reproduzir" class="inline-flex items-center justify-center rounded-full bg-white text-secondary-950 size-12 p-3">
        <svg class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7L8 5z"/></svg>
      </button>
      <span class="text-label-md text-neutral-700">Hovered (forçado)</span>

      <!-- Disabled -->
      <button type="button" aria-label="Reproduzir" disabled class="inline-flex items-center justify-center rounded-full transition-colors bg-white text-primary-600 hover:text-secondary-950 disabled:bg-neutral-200 disabled:text-white disabled:cursor-not-allowed size-12 p-3">
        <svg class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7L8 5z"/></svg>
      </button>
      <span class="text-label-md text-neutral-700">Disabled</span>

    </div>
  </div>

</div>
