<?php
/**
 * Partial: Badge — chip de status pequeno
 * Figma: Badge [1.0] (instanciado em session-row, access-method-card, profile-box,
 * dashboard-tabs-v3 etc.)
 *
 * Pill de label-sm (11px), font-semibold, sem uppercase. Tons via prop $tone,
 * shape via prop $shape, ícone opcional (SVG path) à esquerda.
 *
 * Para keyword/categoria CLICÁVEL use 'tag' (bg-primary-100). Badge é sempre
 * informativo / status.
 *
 * USO:
 *   <?php get_template_part('components/_partials/badge', null, [
 *     'label' => 'Ativo',
 *     'tone'  => 'mint',     // 'mint' | 'neutral' | 'coral' | 'secondary'
 *     'shape' => 'square',   // 'square' (rounded-sm) | 'pill' (rounded-full)
 *     'icon'  => null,       // SVG path "d" (opcional, ex: estrela)
 *   ]); ?>
 *
 * Tons:
 *   mint      → Ativo, Este dispositivo, Complete seu Perfil
 *   neutral   → Em breve, status genérico
 *   coral     → Bloqueado, Erro
 *   secondary → Destaque azul
 */

$label = $args['label'] ?? '';
$tone  = $args['tone']  ?? 'mint';
$shape = $args['shape'] ?? 'square';
$icon  = $args['icon']  ?? null;

$toneClasses = match($tone) {
  'neutral'   => 'bg-neutral-100 text-neutral-900',
  'coral'     => 'bg-red-100 text-red-700',
  'secondary' => 'bg-secondary-50 text-primary-600',
  default     => 'bg-mint-light text-mint',
};

$shapeClass = $shape === 'pill' ? 'rounded-full' : 'rounded-sm';
$padX = $icon ? 'pl-1.5 pr-2' : 'px-2';
?>
<span class="inline-flex items-center gap-1 <?= $padX ?> py-1 <?= $shapeClass ?> font-body font-semibold text-label-sm <?= $toneClasses ?>">
  <?php if ($icon): ?>
  <svg class="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="<?= $icon ?>"/>
  </svg>
  <?php endif; ?>
  <?= htmlspecialchars($label) ?>
</span>
