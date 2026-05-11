<?php
/**
 * Partial: Form Toggle — switch on/off com label e hint
 *
 * USO:
 *   <?php get_template_part('components/_partials/form-toggle', null, [
 *     'id'       => 'toggle-newsletter',
 *     'label'    => 'Receber newsletter segmentada por setor',
 *     'hint'     => 'Você pode cancelar a qualquer momento.',
 *     'checked'  => false,
 *     'disabled' => false,
 *   ]); ?>
 *
 * PROPS ($args):
 *   id       → string  (obrigatório)
 *   label    → string  (obrigatório)
 *   hint     → string  (opcional)
 *   checked  → bool    (false padrão)
 *   disabled → bool    (false padrão)
 *
 * Tokens: bg-secondary-950 · bg-neutral-200 · bg-neutral-100 · bg-white · shadow-sm
 */
$id       = $args['id'] ?? '';
$label    = $args['label'] ?? '';
$hint     = $args['hint'] ?? null;
$checked  = !empty($args['checked']);
$disabled = !empty($args['disabled']);
?>
<label class="flex items-start gap-3 <?= $disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer' ?>">
  <input type="checkbox" id="<?= htmlspecialchars($id) ?>" class="sr-only peer"
         <?= $checked ? 'checked' : '' ?> <?= $disabled ? 'disabled' : '' ?>
         data-analytics-event="preferencia_toggle">
  <!-- Track -->
  <div class="relative shrink-0 mt-0.5 w-11 h-6 rounded-full transition-colors duration-200
              bg-neutral-200 peer-checked:bg-secondary-950 peer-disabled:bg-neutral-100"
       aria-hidden="true">
    <!-- Thumb — JS adiciona/remove translate-x-5 -->
    <div class="absolute top-[2px] left-[2px] size-5 rounded-full bg-white shadow-sm
                transition-transform duration-200 <?= $checked ? 'translate-x-5' : '' ?>"
         data-toggle-thumb></div>
  </div>
  <div class="flex flex-col">
    <span class="font-body text-body-lg text-neutral-950"><?= $label ?></span>
    <?php if ($hint): ?>
      <span class="font-body text-label-md text-neutral-500 mt-0.5"><?= $hint ?></span>
    <?php endif; ?>
  </div>
</label>
