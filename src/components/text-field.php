<?php
/**
 * Componente: Text field
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1757-14338
 * Variantes: state (Enabled|Placeholder|Hovered|Focused|Error|Disabled) × leadingIcon × trailingIcon × required × supportingText = 6 base
 *
 * Input Material 3 customizado do Food Connection. Características do Figma:
 *   - Width default 250px, altura 40px (h-10)
 *   - rounded-sm (4px) — NÃO rounded-full
 *   - Label acima em text-label-lg (14/20 Open Sans SemiBold) + asterisco opcional
 *   - Leading icon (16px) em chip 32×32 (p-2) à esquerda
 *   - Input text: text-body-lg (16/24), text-primary-600 preenchido,
 *                 text-neutral-500 (#8391A9) placeholder
 *   - Trailing icon: close (16px) em chip 32×32 à direita
 *   - Supporting text: text-label-md (12/16, tracking 0.5), text-neutral-950
 *
 * ESTADOS:
 *   Enabled/Placeholder → bg-white border-neutral-100
 *   Hovered             → bg-neutral-50 border-neutral-100
 *   Focused             → bg-white border-secondary-950 (outline vivo)
 *   Error               → bg-white border-[#bf0413] + label/supporting red + trailing error icon
 *   Disabled            → bg-neutral-50 border-neutral-100 + text-neutral-400 + label-neutral-300
 *
 * O erro usa um vermelho Material puro (#bf0413) que NÃO existe nos tokens
 * do DS (não é coral — coral é rosa). Declarado inline com Tailwind arbitrary
 * value pra manter fidelidade ao Figma.
 */
?>
<div class="space-y-6 max-w-[280px]">

  <!-- ===== Enabled (placeholder vazio) ===== -->
  <div class="flex flex-col items-start rounded-sm w-[250px]">
    <div class="flex gap-0.5 items-center pb-1 px-1 w-full">
      <label class="font-body font-semibold text-label-lg text-neutral-950">Label</label>
      <span class="font-body font-semibold text-label-lg text-neutral-950">*</span>
    </div>
    <div class="bg-white border border-neutral-100 flex flex-col h-10 items-start justify-center rounded-sm w-full">
      <div class="flex items-center p-1 w-full">
        <!-- Leading icon (16 em chip 32) -->
        <div class="flex items-center justify-center p-2 rounded-full shrink-0">
          <svg class="size-4 text-neutral-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        </div>
        <div class="flex-1 flex items-center self-stretch px-2">
          <span class="flex-1 font-body text-body-lg text-neutral-500">Placeholder Text</span>
        </div>
        <!-- Trailing icon (close 16 em chip 32) -->
        <button type="button" aria-label="Limpar" class="flex items-center justify-center p-2 rounded-full shrink-0 text-neutral-900 hover:bg-neutral-50">
          <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
      </div>
    </div>
    <div class="flex h-5 items-start pt-1 px-1 w-full">
      <p class="flex-1 font-body font-semibold text-label-md text-neutral-950">Supporting text</p>
    </div>
  </div>

  <!-- ===== Hovered (preview — bg neutral-50) ===== -->
  <div class="flex flex-col items-start rounded-sm w-[250px]">
    <div class="flex gap-0.5 items-center pb-1 px-1 w-full">
      <label class="font-body font-semibold text-label-lg text-neutral-950">Label</label>
      <span class="font-body font-semibold text-label-lg text-neutral-950">*</span>
    </div>
    <div class="bg-neutral-50 border border-neutral-100 flex flex-col h-10 items-start justify-center rounded-sm w-full">
      <div class="flex items-center p-1 w-full">
        <div class="flex items-center justify-center p-2 rounded-full shrink-0">
          <svg class="size-4 text-neutral-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        </div>
        <div class="flex-1 flex items-center self-stretch px-2">
          <span class="flex-1 font-body text-body-lg text-primary-600">Input</span>
        </div>
        <button type="button" aria-label="Limpar" class="flex items-center justify-center p-2 rounded-full shrink-0 text-neutral-900">
          <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
      </div>
    </div>
    <div class="flex h-5 items-start pt-1 px-1 w-full">
      <p class="flex-1 font-body font-semibold text-label-md text-neutral-950">Supporting text</p>
    </div>
  </div>

  <!-- ===== Focused (preview — border secondary-950) ===== -->
  <div class="flex flex-col items-start rounded-sm w-[250px]">
    <div class="flex gap-0.5 items-center pb-1 px-1 w-full">
      <label class="font-body font-semibold text-label-lg text-neutral-950">Label</label>
      <span class="font-body font-semibold text-label-lg text-neutral-950">*</span>
    </div>
    <div class="bg-white border border-secondary-950 flex flex-col h-10 items-start justify-center rounded-sm w-full">
      <div class="flex items-center p-1 w-full">
        <div class="flex items-center justify-center p-2 rounded-full shrink-0">
          <svg class="size-4 text-neutral-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        </div>
        <div class="flex-1 flex items-center self-stretch px-2">
          <span class="font-body text-body-lg text-primary-600">Input</span>
          <!-- Caret placeholder -->
          <span class="inline-block w-px h-4 bg-primary-600 animate-pulse"></span>
        </div>
        <button type="button" aria-label="Limpar" class="flex items-center justify-center p-2 rounded-full shrink-0 text-neutral-900">
          <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
      </div>
    </div>
    <div class="flex h-5 items-start pt-1 px-1 w-full">
      <p class="flex-1 font-body font-semibold text-label-md text-neutral-950">Supporting text</p>
    </div>
  </div>

  <!-- ===== Error (label + border + supporting red #bf0413) ===== -->
  <div class="flex flex-col items-start rounded-sm w-[250px]">
    <div class="flex gap-0.5 items-center pb-1 px-1 w-full">
      <label class="font-body font-semibold text-label-lg text-[#bf0413]">Label</label>
      <span class="font-body font-semibold text-label-lg text-[#bf0413]">*</span>
    </div>
    <div class="bg-white border border-[#bf0413] flex flex-col h-10 items-start justify-center rounded-sm w-full">
      <div class="flex items-center p-1 w-full">
        <div class="flex items-center justify-center p-2 rounded-full shrink-0">
          <svg class="size-4 text-neutral-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        </div>
        <div class="flex-1 flex items-center self-stretch px-2">
          <span class="font-body text-body-lg text-primary-600">Input</span>
          <span class="inline-block w-px h-4 bg-primary-600"></span>
        </div>
        <!-- Trailing: error icon em vez de close -->
        <div class="flex items-center justify-center p-2 rounded-full shrink-0 text-[#bf0413]">
          <svg class="size-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
        </div>
      </div>
    </div>
    <div class="flex h-5 items-start pt-1 px-1 w-full">
      <p class="flex-1 font-body font-semibold text-label-md text-[#bf0413]">Supporting text</p>
    </div>
  </div>

  <!-- ===== Disabled ===== -->
  <div class="flex flex-col items-start rounded-sm w-[250px]">
    <div class="flex gap-0.5 items-center pb-1 px-1 w-full">
      <label class="font-body font-semibold text-label-lg text-neutral-300">Label</label>
      <span class="font-body font-semibold text-label-lg text-neutral-300">*</span>
    </div>
    <div class="bg-neutral-50 border border-neutral-100 flex flex-col h-10 items-start justify-center rounded-sm w-full">
      <div class="flex items-center p-1 w-full">
        <div class="flex items-center justify-center p-2 rounded-full shrink-0">
          <svg class="size-4 text-neutral-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        </div>
        <div class="flex-1 flex items-center self-stretch px-2">
          <span class="flex-1 font-body text-body-lg text-neutral-400">Input</span>
        </div>
        <div class="flex items-center justify-center p-2 rounded-full shrink-0 text-neutral-300">
          <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </div>
      </div>
    </div>
    <div class="flex h-5 items-start pt-1 px-1 w-full">
      <p class="flex-1 font-body font-semibold text-label-md text-neutral-300">Supporting text</p>
    </div>
  </div>

</div>
