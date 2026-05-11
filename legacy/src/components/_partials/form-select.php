<?php
/**
 * Partial: Form Select — dropdown com label, chevron e valor
 *
 * USO:
 *   <?php get_template_part('components/_partials/form-select', null, [
 *     'label'    => 'Cargo',
 *     'value'    => '',
 *     'required' => 'on',
 *   ]); ?>
 *
 * PROPS ($args):
 *   label    → string (texto do label)
 *   value    → string (valor pré-selecionado, '' = mostra "Selecione")
 *   required → 'on'|'off' (mostra asterisco)
 */
?>
<label class="flex flex-1 flex-col items-start min-w-0 rounded-sm">
  <div class="flex gap-0.5 items-center pb-1 px-1 w-full">
    <span class="font-body font-semibold text-label-lg text-neutral-950"><?= $args['label'] ?></span>
    <?php if ($args['required'] === 'on'): ?><span class="font-body font-semibold text-label-lg text-neutral-950">*</span><?php endif; ?>
  </div>
  <div class="bg-white border border-neutral-100 flex h-10 items-center justify-between px-3 rounded-sm w-full">
    <?php if ($args['value']): ?>
    <span class="font-body text-body-lg text-primary-600"><?= $args['value'] ?></span>
    <?php else: ?>
    <span class="font-body text-body-lg text-neutral-500">Selecione</span>
    <?php endif; ?>
    <svg class="size-4 text-neutral-900" viewBox="0 0 24 24" fill="currentColor"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>
  </div>
</label>
