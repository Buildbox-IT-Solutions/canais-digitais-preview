<?php
/**
 * Partial: Password Strength — barra de força + checklist de critérios
 *
 * Estrutura:
 *   1. Barra de 3 segmentos (visual de força)
 *   2. Label "Força: ..."
 *   3. Lista de 4 critérios com estado met/unmet em tempo real
 *
 * Critérios:
 *   - length    → mínimo de 8 caracteres
 *   - uppercase → pelo menos uma letra maiúscula
 *   - number    → pelo menos um número
 *   - special   → pelo menos um caractere especial
 *
 * O estado é controlado pelo cadastro-flow.js que escuta `input` no campo
 * referenciado por `inputId` e atualiza:
 *   - data-level no elemento raiz
 *   - bg dos segmentos da barra
 *   - texto do label
 *   - data-met + visibilidade dos ícones em cada [data-password-criterion]
 *
 * USO:
 *   <?php get_template_part('components/_partials/password-strength', null, [
 *     'inputId'  => 'cadastro-senha', // id do <input> que ele descreve
 *     'value'    => '',               // opcional: pré-computa critérios server-side
 *     'level'    => null,             // opcional: força um nível ('empty'|'weak'|'medium'|'strong')
 *     'criteria' => null,             // opcional: override ['length' => true, ...]
 *   ]); ?>
 *
 * REGRAS de força (derivadas dos critérios):
 *   0 critérios  → empty
 *   1-2 critérios → weak  (vermelho)
 *   3 critérios  → medium (âmbar)
 *   4 critérios  → strong (verde)
 *
 * A11y: aria-live="polite" no container; aria-controls aponta para o input.
 */
?>
<?php
$inputId    = $args['inputId'] ?? '';
$value      = (string)($args['value'] ?? '');
$levelOver  = $args['level'] ?? null;
$critOver   = $args['criteria'] ?? null;

$criteria = [
  'length'    => ['label' => 'Mínimo de 8 caracteres',          'met' => strlen($value) >= 8],
  'uppercase' => ['label' => 'Pelo menos uma letra maiúscula',  'met' => (bool)preg_match('/[A-Z]/', $value)],
  'number'    => ['label' => 'Pelo menos um número',            'met' => (bool)preg_match('/\d/', $value)],
  'special'   => ['label' => 'Pelo menos um caractere especial','met' => (bool)preg_match('/[^A-Za-z0-9]/', $value)],
];

if (is_array($critOver)) {
  foreach ($critOver as $k => $met) {
    if (isset($criteria[$k])) $criteria[$k]['met'] = (bool)$met;
  }
}

$metCount = count(array_filter($criteria, fn($c) => $c['met']));

if ($levelOver !== null && in_array($levelOver, ['empty','weak','medium','strong'], true)) {
  $level = $levelOver;
} else {
  $level = match(true) {
    $metCount === 0 => 'empty',
    $metCount <= 2  => 'weak',
    $metCount === 3 => 'medium',
    default         => 'strong',
  };
}

$meta = match($level) {
  'weak'   => ['value' => 1, 'label' => 'Fraca',  'color' => 'bg-[#DC2626]', 'text' => 'text-[#DC2626]', 'fills' => 1],
  'medium' => ['value' => 2, 'label' => 'Média',  'color' => 'bg-[#F59E0B]', 'text' => 'text-[#F59E0B]', 'fills' => 2],
  'strong' => ['value' => 3, 'label' => 'Forte',  'color' => 'bg-[#16A34A]', 'text' => 'text-[#16A34A]', 'fills' => 3],
  default  => ['value' => 0, 'label' => '',       'color' => 'bg-neutral-100', 'text' => 'text-neutral-500', 'fills' => 0],
};
?>
<div
  class="flex flex-col gap-2 w-full"
  data-password-strength
  data-level="<?= $level ?>"
  <?= $inputId ? 'data-target="' . $inputId . '" aria-controls="' . $inputId . '"' : '' ?>
  role="progressbar"
  aria-valuemin="0"
  aria-valuemax="3"
  aria-valuenow="<?= $meta['value'] ?>"
  aria-live="polite"
>
  <div class="flex items-center gap-1 w-full" data-password-strength-bar>
    <?php for ($i = 1; $i <= 3; $i++): ?>
      <div class="h-1 flex-1 rounded-full <?= $i <= $meta['fills'] ? $meta['color'] : 'bg-neutral-100' ?>"></div>
    <?php endfor; ?>
  </div>

  <p class="font-body text-label-md <?= $meta['text'] ?> min-h-[1rem]" data-password-strength-label>
    <?= $meta['label'] ? 'Força: ' . $meta['label'] : '' ?>
  </p>

  <ul class="flex flex-col gap-1.5 mt-0.5" role="list">
    <?php foreach ($criteria as $key => $crit): ?>
      <li data-password-criterion="<?= $key ?>" data-met="<?= $crit['met'] ? 'true' : 'false' ?>" class="flex items-center gap-2">
        <svg data-icon="unmet" class="size-4 shrink-0 text-neutral-500 transition-colors <?= $crit['met'] ? 'hidden' : '' ?>" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
        </svg>
        <svg data-icon="met" class="size-4 shrink-0 text-[#16A34A] transition-colors <?= $crit['met'] ? '' : 'hidden' ?>" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
        <span data-criterion-label class="font-body text-label-md transition-colors <?= $crit['met'] ? 'text-neutral-950 font-semibold' : 'text-neutral-700' ?>">
          <?= $crit['label'] ?>
        </span>
      </li>
    <?php endforeach; ?>
  </ul>
</div>
