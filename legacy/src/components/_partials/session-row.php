<?php
/**
 * Partial: Session Row — linha de sessão ativa (Conta & segurança)
 *
 * USO:
 *   <?php get_template_part('components/_partials/session-row', null, [
 *     'device'   => 'MacBook Pro 14"',
 *     'browser'  => 'Chrome 128',
 *     'location' => 'São Paulo, BR',
 *     'last'     => 'Agora mesmo',
 *     'current'  => true,
 *     'isLast'   => false,
 *   ]); ?>
 *
 * PROPS ($args):
 *   device   → string (ex: 'MacBook Pro 14"', 'iPhone 15', 'Windows 11')
 *   browser  → string
 *   location → string
 *   last     → string (ex: 'Agora mesmo', 'há 2 horas')
 *   current  → bool (true → chip "Este dispositivo", sem botão Encerrar)
 *   isLast   → bool (controla border-bottom)
 */

$device = $args['device'] ?? '';
$browser = $args['browser'] ?? '';
$location = $args['location'] ?? '';
$last = $args['last'] ?? '';
$current = $args['current'] ?? false;
$isLast = $args['isLast'] ?? false;

$iconPath = match(true) {
  stripos($device, 'iphone') !== false || stripos($device, 'android') !== false
    => 'M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z',
  stripos($device, 'mac') !== false || stripos($device, 'book') !== false
    => 'M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z',
  default
    => 'M21 16H3V4h18m0-2H3c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h7v2H8v2h8v-2h-2v-2h7a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z',
};
?>
<div class="flex items-center gap-4 px-1 py-4 <?= $isLast ? '' : 'border-b border-neutral-100' ?>">
  <?php get_template_part('components/_partials/icon-tile', null, [
    'iconPath' => $iconPath,
    'tone'     => 'neutral',
  ]); ?>
  <div class="flex-1 min-w-0 flex flex-col gap-1">
    <div class="flex items-center gap-2 flex-wrap">
      <span class="font-body font-bold text-label-lg text-primary-600"><?= $device ?></span>
      <?php if ($current): ?>
      <?php get_template_part('components/_partials/badge', null, [
        'label' => 'Este dispositivo',
        'tone'  => 'mint',
      ]); ?>
      <?php endif; ?>
    </div>
    <div class="font-body font-semibold text-label-md text-neutral-600">
      <?= $browser ?> · <?= $location ?> · <?= $last ?>
    </div>
  </div>
  <?php if (!$current): ?>
  <button type="button" class="font-body font-bold text-label-lg text-red-700 hover:underline shrink-0">
    Encerrar
  </button>
  <?php endif; ?>
</div>
