<?php
/**
 * Partial: Stat Card — icon-tile + valor grande (Aleo) + label
 * Figma: 6186:4046
 *
 * USO:
 *   <?php get_template_part('components/_partials/stat-card', null, [
 *     'icon'  => 'bookmark',
 *     'label' => 'Matérias favoritadas',
 *     'value' => '24',
 *     'href'  => '#',
 *   ]); ?>
 *
 * PROPS ($args):
 *   icon  → 'bookmark' | 'download' | 'mail'
 *   label → string
 *   value → string|int
 *   href  → string|null — quando preenchido, renderiza como <a>
 */

$icon  = $args['icon']  ?? 'bookmark';
$label = $args['label'] ?? '';
$value = $args['value'] ?? '';
$href  = $args['href']  ?? null;

$iconPath = match($icon) {
  'download' => 'M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z',
  'mail'     => 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
  default    => 'M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z',
};

$tag = $href ? 'a' : 'div';
$attr = $href ? ' href="' . htmlspecialchars($href) . '"' : '';
?>
<<?= $tag ?><?= $attr ?> class="group bg-white border border-primary-100 rounded-lg p-5 flex flex-col gap-3 hover:border-secondary-950 transition-colors">
  <div class="flex items-center gap-4">
    <?php get_template_part('components/_partials/icon-tile', null, [
      'iconPath' => $iconPath,
      'tone'     => 'neutral',
    ]); ?>
    <span class="font-display font-bold text-headline-lg text-primary-600 group-hover:text-secondary-950 transition-colors"><?= htmlspecialchars((string)$value) ?></span>
  </div>
  <span class="font-body font-semibold text-label-lg text-neutral-900"><?= htmlspecialchars($label) ?></span>
</<?= $tag ?>>
