<?php
/**
 * Componente: Header Informa
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=110-3575
 * Variantes: device (Desktop|Mobile) × opened (false|true) = 4
 *
 * Faixa institucional acima do Header principal. Bg neutral-950 (#283857),
 * texto branco. Tem 2 estados:
 *
 *   - Closed: barra simples com "informa" logo + arrow_drop_down chevron
 *   - Opened: mesma barra com arrow_drop_up + content panel abaixo com
 *             descrição legal Informa PLC à esquerda e link list à direita
 *
 * Tokens: bg-neutral-950 · text-white · text-body-md · text-label-lg ·
 *         font-body · font-display
 */
?>
<div class="space-y-6">

  <!-- ================================================================
       CLOSED · Desktop
       ================================================================ -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Closed · Desktop</p>
    <button type="button" class="bg-neutral-950 flex flex-col items-center w-full">
      <div class="flex flex-col h-10 items-center justify-center px-6 py-3 w-full">
        <div class="flex gap-1 items-center">
          <span class="font-display font-bold text-label-lg text-white">informa</span>
          <svg class="size-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
        </div>
      </div>
    </button>
  </div>

  <!-- ================================================================
       OPENED · Desktop (com painel de conteúdo)
       ================================================================ -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Opened · Desktop</p>
    <button type="button" class="bg-neutral-950 flex flex-col items-center w-full">
      <!-- Bar header (com arrow_drop_up) -->
      <div class="flex flex-col h-10 items-center justify-center px-6 py-3 w-full">
        <div class="flex gap-1 items-center">
          <span class="font-display font-bold text-label-lg text-white">informa</span>
          <svg class="size-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14l5-5 5 5z"/></svg>
        </div>
      </div>
      <!-- Content panel -->
      <div class="flex flex-col items-center pb-6 pt-2 px-6 w-full">
        <div class="flex flex-wrap gap-x-10 gap-y-6 items-start justify-center max-w-[1284px] w-full text-left">
          <!-- Coluna esquerda: legal -->
          <p class="flex-1 min-w-px font-body text-body-md text-white">
            Este site é operado por uma empresa ou empresas de propriedade da Informa PLC e todos os direitos autorais residem com eles. A sede da Informa PLC é 5 Howick Place, Londres SW1P 1WG. Registrado na Inglaterra e no País de Gales. Número 8860726.
          </p>
          <!-- Coluna direita: tagline + lista -->
          <div class="flex-1 min-w-px flex flex-col gap-4 items-start">
            <p class="font-body text-body-md text-white w-full">
              Food Connection faz parte da divisão Informa Markets da Informa PLC
            </p>
            <div class="flex flex-wrap gap-x-6 gap-y-2 items-start w-full">
              <span class="font-body font-bold text-body-md text-white">Informa PLC</span>
              <a href="#" class="font-body font-semibold text-body-md text-white hover:underline">Sobre Nós</a>
              <a href="#" class="font-body font-semibold text-body-md text-white hover:underline">Relação com Cinvestidores</a>
              <a href="#" class="font-body font-semibold text-body-md text-white hover:underline">Talento</a>
            </div>
          </div>
        </div>
      </div>
    </button>
  </div>

  <!-- ================================================================
       CLOSED · Mobile
       ================================================================ -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Closed · Mobile</p>
    <button type="button" class="bg-neutral-950 flex flex-col items-center max-w-[440px] min-w-[320px] w-full">
      <div class="flex flex-col h-10 items-center justify-center px-6 py-3 w-full">
        <div class="flex gap-1 items-center">
          <span class="font-display font-bold text-label-lg text-white">informa</span>
          <svg class="size-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
        </div>
      </div>
    </button>
  </div>

  <!-- ================================================================
       OPENED · Mobile (stack vertical)
       ================================================================ -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Opened · Mobile</p>
    <button type="button" class="bg-neutral-950 flex flex-col items-center max-w-[440px] min-w-[320px] w-full">
      <div class="flex flex-col h-10 items-center justify-center px-4 py-3 w-full">
        <div class="flex gap-1 items-center">
          <span class="font-display font-bold text-label-lg text-white">informa</span>
          <svg class="size-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14l5-5 5 5z"/></svg>
        </div>
      </div>
      <div class="flex flex-col items-center pb-6 pt-2 px-4 w-full">
        <div class="flex flex-col gap-6 items-center w-full text-left">
          <p class="font-body text-body-md text-white w-full">
            Este site é operado por uma empresa ou empresas de propriedade da Informa PLC e todos os direitos autorais residem com eles. A sede da Informa PLC é 5 Howick Place, Londres SW1P 1WG. Registrado na Inglaterra e no País de Gales. Número 8860726.
          </p>
          <div class="flex flex-col gap-4 items-start w-full">
            <p class="font-body text-body-md text-white w-full">
              Food Connection faz parte da divisão Informa Markets da Informa PLC
            </p>
            <div class="flex flex-wrap gap-x-6 gap-y-2 items-start w-full">
              <span class="font-body font-bold text-body-md text-white">Informa PLC</span>
              <a href="#" class="font-body font-semibold text-body-md text-white hover:underline">Sobre Nós</a>
              <a href="#" class="font-body font-semibold text-body-md text-white hover:underline">Relação com Cinvestidores</a>
              <a href="#" class="font-body font-semibold text-body-md text-white hover:underline">Talento</a>
            </div>
          </div>
        </div>
      </div>
    </button>
  </div>

</div>
