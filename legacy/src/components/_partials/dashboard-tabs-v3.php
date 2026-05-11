<?php
/**
 * Partial: Dashboard Tabs v3 — barra de tabs do dashboard-perfil-v3
 * Figma: 6045:6002 (tabs-wrap) / I6045:6003;5968:24366 (list)
 *
 * 6 tabs com border-bottom indicator. "Favoritos" desabilitada com chip "Em breve".
 *
 * USO:
 *   <?php get_template_part('components/_partials/dashboard-tabs-v3', null, [
 *     'active' => 'geral',
 *     'baseHref' => '/src/layouts/dashboard-perfil-v3.php',
 *     'queryExtra' => '&user=logged',
 *   ]); ?>
 *
 * PROPS ($args):
 *   active     → string — 'geral' | 'perfil' | 'newsletter' | 'downloads' | 'conta'
 *   baseHref   → string — caminho do layout
 *   queryExtra → string — querystring adicional (ex: '&user=logged')
 */

$active     = $args['active']     ?? 'geral';
$baseHref   = $args['baseHref']   ?? '?';
$queryExtra = $args['queryExtra'] ?? '';

$tabs = [
  ['id' => 'geral',      'label' => 'Visão geral', 'disabled' => false],
  ['id' => 'perfil',     'label' => 'Perfil',      'disabled' => false],
  ['id' => 'newsletter', 'label' => 'Newsletter',  'disabled' => false],
  ['id' => 'downloads',  'label' => 'Downloads',   'disabled' => false],
  ['id' => 'favoritos',  'label' => 'Favoritos',   'disabled' => true, 'chip' => 'Em breve'],
  ['id' => 'conta',      'label' => 'Conta',       'disabled' => false],
];
?>
<div class="w-full border-b border-neutral-100">
  <div class="flex items-center" role="tablist">
    <?php foreach ($tabs as $t):
      $isActive   = $t['id'] === $active;
      $isDisabled = !empty($t['disabled']);
      $href = $baseHref . '?tab=' . $t['id'] . $queryExtra;

      $labelClasses = $isActive
        ? 'font-bold text-primary-600'
        : ($isDisabled
            ? 'font-semibold text-neutral-400'
            : 'font-semibold text-neutral-900 hover:text-secondary-950');

      $borderClass = $isActive
        ? 'border-primary-600'
        : 'border-transparent';
    ?>
    <?php if ($isDisabled): ?>
      <button type="button"
              role="tab" aria-selected="false" aria-disabled="true"
              disabled
              class="h-11 inline-flex items-center gap-2 pt-3 pb-2 px-5 border-b-2 <?= $borderClass ?> font-body text-label-lg cursor-not-allowed <?= $labelClasses ?>">
        <?= htmlspecialchars($t['label']) ?>
        <?php if (!empty($t['chip'])): ?>
        <?php get_template_part('components/_partials/badge', null, [
          'label' => $t['chip'],
          'tone'  => 'neutral',
          'shape' => 'pill',
        ]); ?>
        <?php endif; ?>
      </button>
    <?php else: ?>
      <a href="<?= htmlspecialchars($href) ?>"
         role="tab" aria-selected="<?= $isActive ? 'true' : 'false' ?>"
         class="h-11 inline-flex items-center pt-3 pb-2 px-5 border-b-2 <?= $borderClass ?> font-body text-label-lg transition-colors <?= $labelClasses ?>">
        <?= htmlspecialchars($t['label']) ?>
      </a>
    <?php endif; ?>
    <?php endforeach; ?>
  </div>
</div>
