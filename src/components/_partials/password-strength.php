<?php
/**
 * Partial: Password Strength — medidor de força de senha
 *
 * 3 segmentos de barra + label. Controlado pelo password-strength.js que
 * atualiza `data-level` no elemento raiz em tempo real.
 *
 * USO:
 *   <?php get_template_part('components/_partials/password-strength', null, [
 *     'level'   => 'empty',         // 'empty' | 'weak' | 'medium' | 'strong'
 *     'inputId' => 'password-new',  // id do <input> que ele descreve
 *   ]); ?>
 *
 * PROPS ($args):
 *   level   → estado inicial (JS sobrescreve on-the-fly)
 *   inputId → id do input associado (usado em aria-controls e no JS)
 *
 * REGRAS (de FEATURE-cadastro.md §6.3):
 *   weak   → só letras OU só números
 *   medium → letras + números, < 12 chars
 *   strong → letras + números, 12+ chars
 *
 * A11y: role="progressbar" + aria-valuenow/min/max + aria-live="polite".
 */
?>
<?php
$level = $args['level'] ?? 'empty';
$inputId = $args['inputId'] ?? '';

$meta = match($level) {
  'weak'   => ['value' => 1, 'label' => 'Fraca',  'color' => 'bg-[#DC2626]', 'text' => 'text-[#DC2626]', 'fills' => 1],
  'medium' => ['value' => 2, 'label' => 'Média',  'color' => 'bg-[#F59E0B]', 'text' => 'text-[#F59E0B]', 'fills' => 2],
  'strong' => ['value' => 3, 'label' => 'Forte',  'color' => 'bg-[#16A34A]', 'text' => 'text-[#16A34A]', 'fills' => 3],
  default  => ['value' => 0, 'label' => '',       'color' => 'bg-neutral-100', 'text' => 'text-neutral-500', 'fills' => 0],
};
?>
<div
  class="flex flex-col gap-1.5 w-full"
  data-password-strength
  data-level="<?= $level ?>"
  <?= $inputId ? 'data-target="' . $inputId . '" aria-controls="' . $inputId . '"' : '' ?>
  role="progressbar"
  aria-valuemin="0"
  aria-valuemax="3"
  aria-valuenow="<?= $meta['value'] ?>"
  aria-live="polite"
>
  <div class="flex items-center gap-1 w-full">
    <?php for ($i = 1; $i <= 3; $i++): ?>
      <div class="h-1 flex-1 rounded-full <?= $i <= $meta['fills'] ? $meta['color'] : 'bg-neutral-100' ?>"></div>
    <?php endfor; ?>
  </div>
  <p class="font-body text-label-md <?= $meta['text'] ?> min-h-[1rem]" data-password-strength-label>
    <?= $meta['label'] ? 'Força: ' . $meta['label'] : '' ?>
  </p>
</div>
