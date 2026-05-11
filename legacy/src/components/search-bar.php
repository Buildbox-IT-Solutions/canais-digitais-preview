<?php
/**
 * Componente: Search bar
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1776-19053
 * Variantes: state (Enabled|Hovered|Empty|Typing|Filled|Disabled) × extended (off|on) = 8
 *
 * Campo de busca pill. Características do Figma:
 *   - Width default 250px, altura 40px (h-10)
 *   - rounded-full
 *   - Leading search icon (24px) sem chip, inset pl-3
 *   - Trailing close icon (16px em chip 32 p-2) APENAS quando extended=on
 *   - Placeholder "Buscar" em text-body-lg, text-neutral-900 (#3c4e69)
 *   - Input preenchido: text-primary-600
 *
 * ESTADOS × EXTENDED:
 *   Enabled/off        → bg-white border-neutral-100 (sem close)
 *   Hovered/off        → bg-neutral-50 border-neutral-100 (sem close)
 *   Disabled/off       → bg-neutral-50 border-neutral-100 text-neutral-400
 *   Empty/on           → bg-white border-secondary-950 + caret + close
 *   Typing/on          → bg-white border-secondary-950 + input + caret + close
 *   Filled/on          → bg-white border-neutral-100 + input + close
 *   Hovered/on         → bg-neutral-50 border-neutral-100 + input + close
 *   Disabled/on        → bg-neutral-50 border-neutral-100 text-neutral-400 (sem close)
 */
?>
<div class="space-y-4">

  <!-- ==== Extended = OFF ==== -->
  <div class="space-y-3">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Extended = Off</p>

    <!-- Enabled/off -->
    <div class="w-[250px] rounded-full">
      <div class="bg-white border border-neutral-100 flex flex-col h-10 items-start justify-center overflow-hidden rounded-full w-full">
        <div class="flex items-center pl-3 pr-1 py-1 w-full">
          <svg class="size-6 shrink-0 text-neutral-900" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
          <div class="flex-1 flex items-center self-stretch px-2">
            <span class="flex-1 font-body text-body-lg text-neutral-900">Buscar</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Hovered/off (bg neutral-50) -->
    <div class="w-[250px] rounded-full">
      <div class="bg-neutral-50 border border-neutral-100 flex flex-col h-10 items-start justify-center overflow-hidden rounded-full w-full">
        <div class="flex items-center pl-3 pr-1 py-1 w-full">
          <svg class="size-6 shrink-0 text-neutral-900" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
          <div class="flex-1 flex items-center self-stretch px-2">
            <span class="flex-1 font-body text-body-lg text-neutral-900">Buscar</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Disabled/off -->
    <div class="w-[250px] rounded-full">
      <div class="bg-neutral-50 border border-neutral-100 flex flex-col h-10 items-start justify-center overflow-hidden rounded-full w-full">
        <div class="flex items-center pl-3 pr-1 py-1 w-full">
          <svg class="size-6 shrink-0 text-neutral-400" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
          <div class="flex-1 flex items-center self-stretch px-2">
            <span class="flex-1 font-body text-body-lg text-neutral-400">Buscar</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ==== Extended = ON ==== -->
  <div class="space-y-3 pt-4">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Extended = On</p>

    <!-- Empty/on — focado com caret, border secondary-950 -->
    <div class="w-[250px] rounded-full">
      <div class="bg-white border border-secondary-950 flex flex-col h-10 items-start justify-center overflow-hidden rounded-full w-full">
        <div class="flex items-center pl-3 pr-1 py-1 w-full">
          <svg class="size-6 shrink-0 text-neutral-900" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
          <div class="flex-1 flex items-center self-stretch px-2">
            <span class="inline-block w-px h-4 bg-primary-600 animate-pulse"></span>
            <span class="font-body text-body-lg text-neutral-900">Buscar</span>
          </div>
          <button type="button" aria-label="Limpar busca" class="flex items-center justify-center p-2 rounded-full shrink-0 text-neutral-900 hover:bg-neutral-50">
            <svg class="size-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Typing/on — com valor + caret, border secondary-950 -->
    <div class="w-[250px] rounded-full">
      <div class="bg-white border border-secondary-950 flex flex-col h-10 items-start justify-center overflow-hidden rounded-full w-full">
        <div class="flex items-center pl-3 pr-1 py-1 w-full">
          <svg class="size-6 shrink-0 text-neutral-900" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
          <div class="flex-1 flex items-center self-stretch px-2">
            <span class="font-body text-body-lg text-primary-600">Ingredientes</span>
            <span class="inline-block w-px h-4 bg-primary-600 animate-pulse"></span>
          </div>
          <button type="button" aria-label="Limpar busca" class="flex items-center justify-center p-2 rounded-full shrink-0 text-neutral-900 hover:bg-neutral-50">
            <svg class="size-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Filled/on — blur, border neutral-100 -->
    <div class="w-[250px] rounded-full">
      <div class="bg-white border border-neutral-100 flex flex-col h-10 items-start justify-center overflow-hidden rounded-full w-full">
        <div class="flex items-center pl-3 pr-1 py-1 w-full">
          <svg class="size-6 shrink-0 text-neutral-900" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
          <div class="flex-1 flex items-center self-stretch px-2">
            <span class="flex-1 font-body text-body-lg text-primary-600">Placeholder text</span>
          </div>
          <button type="button" aria-label="Limpar busca" class="flex items-center justify-center p-2 rounded-full shrink-0 text-neutral-900 hover:bg-neutral-50">
            <svg class="size-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Hovered/on -->
    <div class="w-[250px] rounded-full">
      <div class="bg-neutral-50 border border-neutral-100 flex flex-col h-10 items-start justify-center overflow-hidden rounded-full w-full">
        <div class="flex items-center pl-3 pr-1 py-1 w-full">
          <svg class="size-6 shrink-0 text-neutral-900" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
          <div class="flex-1 flex items-center self-stretch px-2">
            <span class="flex-1 font-body text-body-lg text-primary-600">Input</span>
          </div>
          <button type="button" aria-label="Limpar busca" class="flex items-center justify-center p-2 rounded-full shrink-0 text-neutral-900 hover:bg-neutral-100">
            <svg class="size-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Disabled/on -->
    <div class="w-[250px] rounded-full">
      <div class="bg-neutral-50 border border-neutral-100 flex flex-col h-10 items-start justify-center overflow-hidden rounded-full w-full">
        <div class="flex items-center pl-3 pr-1 py-1 w-full">
          <svg class="size-6 shrink-0 text-neutral-400" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
          <div class="flex-1 flex items-center self-stretch px-2">
            <span class="flex-1 font-body text-body-lg text-neutral-400">Buscar</span>
          </div>
        </div>
      </div>
    </div>

  </div>

</div>
