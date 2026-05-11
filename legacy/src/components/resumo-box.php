<?php
/**
 * Componente: Resumo Box
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=619-7291
 * Variantes: state (Enabled|Hovered) × opened (false|true) = 4
 *
 * Box accordion (collapsible) com resumo gerado por IA. Estados:
 *   - Enabled/Closed: "Ver resumo" + chevron down
 *   - Enabled/Opened: "Resumo" + chevron up + ul list-disc + footer IA
 *   - Hovered/Closed: border vira neutral-900 (#3c4e69)
 *   - Hovered/Opened: mesma anatomia opened com border hovered
 *
 * Anatomia:
 *   Container: bg-white border border-neutral-100 rounded-sm w-758
 *   Header: flex gap-2 items-center p-4
 *     - "Ver resumo"/"Resumo" → Aleo Bold 18/24 text-primary-600 flex-1
 *     - chevron 24 (down/up)
 *   Content (apenas opened):
 *     - ul list-disc com items text-body-lg text-neutral-950
 *     - margin items: mb-3 ms-6 (last sem mb)
 *   Footer (apenas opened):
 *     - Divider neutral-100
 *     - "Resumo gerado por ferramenta de Inteligência Artificial" → text-label-md text-neutral-950
 *
 * Tokens: bg-white · border-neutral-100 · border-neutral-900 · text-primary-600 ·
 *         text-neutral-950 · text-title-lg · text-body-lg · text-label-md ·
 *         font-display · font-body · rounded-sm
 */
?>
<div class="space-y-10">

  <!-- ===== Enabled / Closed ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Enabled · Closed</p>
    <!-- Interactive version (JS-powered) -->
    <div class="bg-white border border-neutral-100 hover:border-neutral-900 transition-colors flex flex-col items-center justify-center rounded-sm w-full max-w-[758px]" data-component="resumo-box">
      <button type="button" class="flex gap-2 items-center p-4 w-full" data-trigger="resumo-toggle" aria-expanded="false" aria-controls="resumo-content-1">
        <p class="flex-1 font-display font-bold text-title-lg text-primary-600 text-left" data-el="resumo-label">Ver resumo</p>
        <svg class="size-6 text-primary-600 transition-transform duration-300" data-icon="chevron" viewBox="0 0 24 24" fill="currentColor"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>
      </button>
      <div id="resumo-content-1" class="overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out w-full" style="max-height:0;opacity:0" data-target="resumo-content" aria-hidden="true">
        <div class="flex items-center justify-center pb-4 px-4 w-full">
          <ul class="flex-1 list-disc font-body text-body-lg text-neutral-950 space-y-3">
            <li class="ms-6">Lorem ipsum dolor sit amet consectetur. Purus at at nulla leo. Porta malesuada id mi proin sit adipiscing faucibus habitasse. Tristique iaculis ut nisi sit sodales orci non lobortis. Tellus blandit eros nullam eget mi ornare cursus.</li>
            <li class="ms-6">Diam ac aliquam quis ullamcorper. Facilisi elementum proin aenean ac mi at luctus diam. Id enim ut placerat vel imperdiet viverra porta mauris. Interdum aliquam bibendum id tellus molestie duis fermentum est facilisis.</li>
            <li class="ms-6">Cursus eleifend ullamcorper in amet amet et. Maecenas amet pharetra suspendisse eget. Rutrum non vestibulum est in viverra rhoncus ipsum massa. Phasellus a aliquet pellentesque elementum ipsum sociis neque urna.</li>
            <li class="ms-6">Hendrerit mi sit purus ante est sed. Et consequat ultrices accumsan mattis faucibus ultrices. Tempor aliquam consectetur aliquam aliquet molestie feugiat eget.</li>
          </ul>
        </div>
        <div class="flex flex-col gap-4 items-center justify-center pb-4 px-4 w-full">
          <?php get_template_part('components/_partials/divider', null, [ 'orientation' => 'horizontal' ]); ?>
          <p class="font-body font-semibold text-label-md text-neutral-950 w-full">
            Resumo gerado por ferramenta de Inteligência Artificial
          </p>
        </div>
      </div>
    </div>
  </div>

</div>
