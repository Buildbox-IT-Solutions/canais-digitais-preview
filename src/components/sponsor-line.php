<?php
/**
 * Componente: Sponsor Line + Sponsor Box + Sponsor Line (Widgets)
 * Figma Sponsor Line: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=2676-8328
 * Figma Sponsor Box:  https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=3862-28410
 * Figma Widgets:      https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=2769-26021
 * Variantes: 2 (Line: Text|Logo) + 2 (Box: Text|Logo) + 2 (Widget)
 *
 * Sponsor Line é a linha de "Conteúdo Patrocinado" + nome ou logo da
 * marca. Tem 3 versões:
 *
 *   1. Sponsor Line — pt-12 stacked, max-w-300, fica embaixo de cards
 *      patrocinados (News/Video/Podcast Patrocinado).
 *   2. Sponsor Box  — bg-white rounded-sm p-2 w-145, fica avulsa (ex:
 *      sidebar widget) com items-end.
 *   3. Sponsor Line (Widgets) — variante compacta pra dentro de widgets.
 *
 * COMPOSIÇÃO via partial: o partial `_partials/sponsor-line.php` renderiza
 * a versão Text. A versão Logo usa um <img> no lugar do texto da company.
 *
 * Tokens: bg-white · text-neutral-900 · text-secondary-950 · text-label-sm ·
 *         text-title-md · font-body · font-display · rounded-sm
 */
?>
<div class="space-y-10">

  <!-- ===== Sponsor Line · Text ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Sponsor Line · Text</p>
    <div class="w-[300px]">
      <?php get_template_part('components/_partials/sponsor-line', null, [
        'company' => 'Company Name', 'href' => '#',
      ]); ?>
    </div>
  </div>

  <!-- ===== Sponsor Line · Logo ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Sponsor Line · Logo</p>
    <div class="flex flex-col gap-1 items-start pt-3 w-[300px]">
      <p class="font-body font-semibold text-label-sm text-neutral-900 w-full">Conteúdo Patrocinado</p>
      <div class="flex items-end h-10 max-h-10 w-full">
        <div class="inline-flex items-center justify-center max-h-10 max-w-[124px] aspect-[148/48] border border-neutral-200 rounded-xs">
          <span class="font-body font-bold text-label-md text-neutral-700">LOGO</span>
        </div>
      </div>
    </div>
  </div>

  <!-- ===== Sponsor Box · Text ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Sponsor Box · Text</p>
    <div class="bg-white flex flex-col gap-1 items-end justify-center p-2 rounded-sm w-[145px]">
      <p class="font-body font-semibold text-label-sm text-neutral-900 w-full">Conteúdo Patrocinado</p>
      <a href="#" class="font-display font-bold text-title-md text-secondary-950 hover:underline w-full">Company Name</a>
    </div>
  </div>

  <!-- ===== Sponsor Box · Logo ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Sponsor Box · Logo</p>
    <div class="bg-white flex flex-col gap-1 items-end justify-center h-[76px] p-2 rounded-sm w-[145px]">
      <p class="font-body font-semibold text-label-sm text-neutral-900 w-full">Conteúdo Patrocinado</p>
      <div class="flex items-end h-10 max-h-10 w-full">
        <div class="inline-flex items-center justify-center max-h-10 aspect-[148/48] flex-1 border border-neutral-200 rounded-xs">
          <span class="font-body font-bold text-label-md text-neutral-700">LOGO</span>
        </div>
      </div>
    </div>
  </div>

</div>
