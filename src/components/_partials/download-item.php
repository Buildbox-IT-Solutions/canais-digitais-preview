<?php
/**
 * Partial: Download Item — linha da lista "Meus downloads"
 * Figma: 6105:6258 (component set: Enabled / Hovered / Disabled)
 *
 * Composto por: icon-tile (bg-neutral-50, p-3, rounded-lg) +
 * título Aleo Bold 18 (link → conteudo.php) +
 * meta "Portal • Data • Tamanho" (Open Sans Regular 14, neutral-600) +
 * Button [1.1] ghost medium com ícone download (download direto).
 *
 * Title e botão são alvos de clique independentes:
 *   - Hover no título → cor primary-600 → secondary-950
 *   - Hover no "Baixar" → bg neutral-50 (ghost button)
 *   - Variant disabled → texto em neutral-600, botão "Indisponível" (neutral-200, sem ícone)
 *
 * USO:
 *   <?php get_template_part('components/_partials/download-item', null, [
 *     'icon'      => 'pdf',                          // 'pdf' | 'doc' | 'image'
 *     'title'     => 'Lorem ipsum dolor sit amet consectetur',
 *     'portal'    => 'Portal Acessado',
 *     'date'      => 'DD Mon YYYY',
 *     'size'      => '99.99 MB',
 *     'titleHref' => '/src/layouts/conteudo.php',
 *     'fileHref'  => '/path/to/file.pdf',
 *     'disabled'  => false,
 *     'isLast'    => false,
 *   ]); ?>
 */

$icon      = $args['icon']      ?? 'pdf';
$title     = $args['title']     ?? '';
$portal    = $args['portal']    ?? '';
$date      = $args['date']      ?? '';
$size      = $args['size']      ?? '';
$titleHref = $args['titleHref'] ?? '/src/layouts/conteudo.php';
$fileHref  = $args['fileHref']  ?? '#';
$disabled  = !empty($args['disabled']);
$isLast    = !empty($args['isLast']);

$iconPath = match($icon) {
  'doc'   => 'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z',
  'image' => 'M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z',
  default => 'M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z',
};
?>
<div class="<?= $isLast ? '' : 'border-b border-neutral-100' ?> px-1">
  <div class="flex items-start gap-4 py-4">
    <!-- Icon tile -->
    <?php get_template_part('components/_partials/icon-tile', null, [
      'iconPath' => $iconPath,
      'tone'     => $disabled ? 'disabled' : 'neutral',
    ]); ?>

    <!-- Text -->
    <div class="flex-1 min-w-0 flex flex-col gap-1">
      <?php if ($disabled): ?>
        <p class="font-display font-bold text-title-lg text-neutral-600">
          <?= htmlspecialchars($title) ?>
        </p>
      <?php else: ?>
        <a href="<?= htmlspecialchars($titleHref) ?>"
           class="font-display font-bold text-title-lg text-primary-600 hover:text-secondary-950 transition-colors w-fit max-w-full">
          <?= htmlspecialchars($title) ?>
        </a>
      <?php endif; ?>
      <div class="flex items-center gap-1.5 font-body text-body-md text-neutral-600 flex-wrap">
        <?php if ($portal): ?><span><?= htmlspecialchars($portal) ?></span><?php endif; ?>
        <?php if ($portal && $date): ?><span aria-hidden="true">•</span><?php endif; ?>
        <?php if ($date): ?><span><?= htmlspecialchars($date) ?></span><?php endif; ?>
        <?php if (($portal || $date) && $size): ?><span aria-hidden="true">•</span><?php endif; ?>
        <?php if ($size): ?><span><?= htmlspecialchars($size) ?></span><?php endif; ?>
      </div>
    </div>

    <!-- Button [1.1] ghost medium -->
    <?php if ($disabled): ?>
      <span aria-disabled="true"
            class="inline-flex items-center justify-center h-10 px-6 rounded-full font-body font-bold text-body-lg text-neutral-200 select-none shrink-0">
        Indisponível
      </span>
    <?php else: ?>
      <a href="<?= htmlspecialchars($fileHref) ?>" download
         class="inline-flex items-center justify-center gap-2 h-10 pl-4 pr-5 rounded-full font-body font-bold text-body-lg text-primary-600 hover:bg-neutral-50 transition-colors shrink-0">
        <svg class="size-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
        </svg>
        Baixar
      </a>
    <?php endif; ?>
  </div>
</div>
