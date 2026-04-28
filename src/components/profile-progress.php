<?php
/**
 * Componente: Profile Progress
 * Figma: derivado de FEATURE-cadastro.md §4.4 + §6.7 — sem nodeId
 * Variantes: 4 faixas de texto por %
 * Tokens usados: bg-neutral-100, bg-secondary-950, text-neutral-600/700/950,
 *                text-label-lg, text-label-md, text-body-md, rounded-full
 *
 * Props: filledFields (int), totalFields (int, default 14).
 */
?>
<div class="space-y-8 max-w-[560px]">

  <div>
    <p class="text-label-sm text-neutral-700 mb-2">Faixa 0–30% (2 de 14)</p>
    <?php get_template_part('components/_partials/profile-progress', null, [
      'filledFields' => 2,
      'totalFields'  => 14,
    ]); ?>
  </div>

  <div>
    <p class="text-label-sm text-neutral-700 mb-2">Faixa 31–60% (6 de 14)</p>
    <?php get_template_part('components/_partials/profile-progress', null, [
      'filledFields' => 6,
      'totalFields'  => 14,
    ]); ?>
  </div>

  <div>
    <p class="text-label-sm text-neutral-700 mb-2">Faixa 61–89% (10 de 14)</p>
    <?php get_template_part('components/_partials/profile-progress', null, [
      'filledFields' => 10,
      'totalFields'  => 14,
    ]); ?>
  </div>

  <div>
    <p class="text-label-sm text-neutral-700 mb-2">Faixa 90–100% (14 de 14)</p>
    <?php get_template_part('components/_partials/profile-progress', null, [
      'filledFields' => 14,
      'totalFields'  => 14,
    ]); ?>
  </div>

</div>
