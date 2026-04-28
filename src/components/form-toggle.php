<?php
/**
 * Componente: Form Toggle
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0
 * Variantes: Off default · On default · Off disabled · On disabled
 * Tokens: bg-secondary-950 · bg-neutral-200 · bg-neutral-100 · bg-white · shadow-sm
 *
 * Switch on/off com label + hint opcional. Auto-save simulado via cadastro-flow.js.
 * Track: 44×24 · Thumb: 20×20 · Transições: colors + transform 200ms
 */
?>
<div class="space-y-8 max-w-[560px]">

  <div class="space-y-3">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Off · default</p>
    <?php get_template_part('components/_partials/form-toggle', null, [
      'id'    => 'showcase-toggle-off',
      'label' => 'Receber newsletter segmentada por setor',
      'hint'  => 'Você pode cancelar a qualquer momento nas suas preferências.',
    ]); ?>
  </div>

  <div class="space-y-3">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">On · default</p>
    <?php get_template_part('components/_partials/form-toggle', null, [
      'id'      => 'showcase-toggle-on',
      'label'   => 'Receber comunicações e novidades da Informa Markets',
      'hint'    => 'Ao ativar, você concorda em receber ofertas e novidades por e-mail.',
      'checked' => true,
    ]); ?>
  </div>

  <div class="space-y-3">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Off · disabled</p>
    <?php get_template_part('components/_partials/form-toggle', null, [
      'id'       => 'showcase-toggle-off-disabled',
      'label'    => 'Toggle desabilitado (off)',
      'hint'     => 'Não pode ser alterado no momento.',
      'disabled' => true,
    ]); ?>
  </div>

  <div class="space-y-3">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">On · disabled</p>
    <?php get_template_part('components/_partials/form-toggle', null, [
      'id'       => 'showcase-toggle-on-disabled',
      'label'    => 'Toggle desabilitado (on)',
      'hint'     => 'Não pode ser alterado no momento.',
      'checked'  => true,
      'disabled' => true,
    ]); ?>
  </div>

</div>
