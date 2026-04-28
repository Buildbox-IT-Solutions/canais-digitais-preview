<?php
/**
 * Partial: Profile Progress — barra gamificada de preenchimento do perfil
 *
 * Usado no cabeçalho do dashboard-perfil.php. Calcula % de preenchimento e
 * escolhe o texto motivacional pela faixa.
 *
 * USO:
 *   <?php get_template_part('components/_partials/profile-progress', null, [
 *     'filledFields' => 6,
 *     'totalFields'  => 14,
 *   ]); ?>
 *
 * PROPS ($args):
 *   filledFields → int — quantos campos do perfil estão preenchidos
 *   totalFields  → int — total de campos considerados (default 14)
 *
 * FAIXAS (FEATURE-cadastro.md §6.7):
 *   0–30%   → "Seu perfil está começando. Complete para desbloquear recomendações."
 *   31–60%  → "Bom progresso! Adicione seus dados profissionais."
 *   61–89%  → "Quase lá! Faltam poucos campos."
 *   90–100% → "Perfil completo! Você recebe o melhor do portal."
 */
?>
<?php
$filled = max(0, (int)($args['filledFields'] ?? 0));
$total  = max(1, (int)($args['totalFields']  ?? 14));
$filled = min($filled, $total);
$pct = (int) round(($filled / $total) * 100);

$message = match(true) {
  $pct >= 90 => 'Perfil completo! Você recebe o melhor do portal.',
  $pct >= 61 => 'Quase lá! Faltam poucos campos.',
  $pct >= 31 => 'Bom progresso! Adicione seus dados profissionais.',
  default    => 'Seu perfil está começando. Complete para desbloquear recomendações.',
};
?>
<div class="flex flex-col gap-2 w-full">
  <div class="flex items-baseline justify-between gap-4">
    <p class="font-body text-label-lg font-semibold text-neutral-950">
      Perfil <?= $pct ?>% completo
    </p>
    <p class="font-body text-label-md text-neutral-600">
      <?= $filled ?> de <?= $total ?> campos
    </p>
  </div>
  <div
    class="h-2 w-full rounded-full bg-neutral-100 overflow-hidden"
    role="progressbar"
    aria-valuemin="0"
    aria-valuemax="100"
    aria-valuenow="<?= $pct ?>"
    aria-label="Progresso do preenchimento do perfil"
  >
    <div class="h-full rounded-full bg-secondary-950 transition-[width] duration-500" style="width: <?= $pct ?>%;"></div>
  </div>
  <p class="font-body text-body-md text-neutral-700"><?= $message ?></p>
</div>
