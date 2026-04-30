<?php
/**
 * Partial: Cadastro Stepper — indicador de progresso 3 passos
 * Figma: 6271:18977 (variantes step=1 / step=2 / step=3)
 *
 * Estados por passo:
 *  - done    → border primary-600, check icon, bg branco
 *  - active  → bg primary-600, texto branco
 *  - pending → bg primary-100, texto neutral-900
 *
 * Conectores: barras horizontais em primary-100 (constante).
 *
 * USO:
 *   get_template_part('components/_partials/cadastro-stepper', null, [
 *     'current' => 1,         // 1 | 2 | 3
 *     'totalSteps' => 3,      // opcional, default 3
 *   ]);
 *
 * Tokens: color-primary-100, color-primary-600, color-neutral-900,
 *         text-label-md (Open Sans Bold 12/16)
 */

$current = (int)($args['current'] ?? 1);
$total = (int)($args['totalSteps'] ?? 3);
$steps = range(1, $total);
?>
<div class="flex items-center gap-2 w-full">
  <?php foreach ($steps as $i => $n):
    $state = $n < $current ? 'done' : ($n === $current ? 'active' : 'pending');
  ?>
    <?php if ($state === 'done'): ?>
      <div class="size-6 rounded-full border border-primary-600 bg-white text-primary-600 flex items-center justify-center shrink-0" aria-current="false" aria-label="Passo <?= $n ?> concluído">
        <svg class="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>
      </div>
    <?php elseif ($state === 'active'): ?>
      <div class="size-6 rounded-full bg-primary-600 text-white font-body font-bold text-label-md flex items-center justify-center shrink-0" aria-current="step" aria-label="Passo <?= $n ?> atual">
        <?= $n ?>
      </div>
    <?php else: ?>
      <div class="size-6 rounded-full bg-primary-100 text-neutral-900 font-body font-bold text-label-md flex items-center justify-center shrink-0" aria-label="Passo <?= $n ?>">
        <?= $n ?>
      </div>
    <?php endif; ?>

    <?php if ($i < count($steps) - 1): ?>
      <div class="flex-1 h-0.5 bg-primary-100 rounded-full" aria-hidden="true"></div>
    <?php endif; ?>
  <?php endforeach; ?>
</div>
