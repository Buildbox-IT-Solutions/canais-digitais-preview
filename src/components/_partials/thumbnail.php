<?php
/**
 * Partial: Thumbnail — single instance
 *
 * Wrapper de imagem com aspect-ratio + radius + hover-zoom + opcional
 * play overlay. É a versão "card-ready" do átomo Image — Image (showcase
 * em /src/components/image.php) é só wrapper de aspect; Thumbnail
 * adiciona o comportamento de hover/zoom usado em todos os cards e a
 * possibilidade de embutir um play overlay sem o consumidor lembrar
 * o markup canônico.
 *
 * USO:
 *   <?php get_template_part('components/_partials/thumbnail', null, [
 *     'src'   => '...',
 *     'alt'   => '...',
 *     'href'  => '#',
 *     'ratio' => 'video',          // 'video' | 'square'
 *     'play'  => 'small',          // '' | 'small' | 'xsmall'
 *   ]); ?>
 *
 * PROPS ($args):
 *   src    → URL da imagem
 *   alt    → texto alternativo
 *   href   → string|null   (com href vira <a>; sem href vira <div>)
 *   ratio  → 'video' (16:9) | 'photo' (3:2) | 'square' (1:1)
 *   play   → '' (sem overlay) | 'small' | 'xsmall'
 *            Quando setado, embute o partial play-button automaticamente
 *            com `as=div`. Offset interno calculado pelo size.
 *   radius → 'on' (default) | 'off'
 *            'off' remove rounded-sm — usar quando dentro de card com overflow-hidden
 *
 * Hover/zoom: aplica `group-hover:scale-105 transition-transform
 * duration-500` na <img>. O <article> que contém este thumbnail precisa
 * ter a classe `group` pra acionar o zoom.
 */
?>
<?php if ($args['href']): ?><a href="<?= $args['href'] ?>" class="relative block <?php if ($args['ratio'] === 'video'): ?>aspect-video<?php endif; ?><?php if ($args['ratio'] === 'photo'): ?>aspect-[1.5]<?php endif; ?><?php if ($args['ratio'] === 'square'): ?>aspect-square<?php endif; ?> <?php if ($args['radius'] === 'off'): ?><?php else: ?>rounded-sm<?php endif; ?> bg-neutral-100 overflow-hidden">
  <img src="<?= $args['src'] ?>" alt="<?= $args['alt'] ?>" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
  <?php if ($args['play']): ?><div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"><div class="rounded-full bg-white/80"><?php get_template_part('components/_partials/play-button', null, [
    'size' => $args['play'], 'as' => 'div', 'type' => 'play',
  ]); ?></div></div><?php endif; ?>
</a><?php else: ?><div class="relative block <?php if ($args['ratio'] === 'video'): ?>aspect-video<?php endif; ?><?php if ($args['ratio'] === 'photo'): ?>aspect-[1.5]<?php endif; ?><?php if ($args['ratio'] === 'square'): ?>aspect-square<?php endif; ?> <?php if ($args['radius'] === 'off'): ?><?php else: ?>rounded-sm<?php endif; ?> bg-neutral-100 overflow-hidden">
  <img src="<?= $args['src'] ?>" alt="<?= $args['alt'] ?>" class="w-full h-full object-cover">
</div><?php endif; ?>
