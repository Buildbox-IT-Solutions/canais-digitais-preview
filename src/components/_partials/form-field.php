<?php
/**
 * Partial: Form Field — text input com label e asterisco
 *
 * USO:
 *   <?php get_template_part('components/_partials/form-field', null, [
 *     'label'       => 'Nome',
 *     'type'        => 'text',
 *     'placeholder' => '',
 *     'required'    => 'on',
 *   ]); ?>
 *
 * PROPS ($args):
 *   label       → string (texto do label)
 *   type        → 'text'|'email'|'tel' (type do input)
 *   placeholder → string (placeholder do input, '' = sem)
 *   required    → 'on'|'off' (mostra asterisco)
 */
?>
<label class="flex flex-1 flex-col items-start min-w-0 rounded-sm">
  <div class="flex gap-0.5 items-center pb-1 px-1 w-full">
    <span class="font-body font-semibold text-label-lg text-neutral-950"><?= $args['label'] ?></span>
    <?php if ($args['required'] === 'on'): ?><span class="font-body font-semibold text-label-lg text-neutral-950">*</span><?php endif; ?>
  </div>
  <div class="bg-white border border-neutral-100 flex flex-col h-10 items-start justify-center rounded-sm w-full">
    <input type="<?= $args['type'] ?>"<?php if ($args['placeholder']): ?> placeholder="<?= $args['placeholder'] ?>"<?php endif; ?> class="flex-1 w-full h-full px-3 bg-transparent text-body-lg font-body text-primary-600 placeholder:text-neutral-500 focus:outline-none">
  </div>
</label>
