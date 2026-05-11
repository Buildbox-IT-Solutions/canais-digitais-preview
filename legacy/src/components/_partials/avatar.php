<?php
/**
 * Partial: Avatar — single instance
 *
 * Foto de perfil circular ou quadrada com state-layer sobre hover.
 * Showcase completo em /src/components/avatar.php.
 *
 * USO:
 *   <?php get_template_part('components/_partials/avatar', null, [
 *     'src'   => 'https://...',
 *     'alt'   => 'Nome do autor',
 *     'shape' => 'rounded',   // 'rounded' | 'squared'
 *     'size'  => 'lg',        // 'sm' (32) | 'md' (40) | 'lg' (80)
 *   ]); ?>
 *
 * PROPS ($args):
 *   src   → URL da imagem
 *   alt   → texto alternativo
 *   shape → 'rounded' (rounded-full) | 'squared' (rounded-sm)
 *   size  → 'sm' (size-8) | 'md' (size-10) | 'lg' (size-20)
 */
?>
<div class="relative inline-block group shrink-0 <?php if ($args['size'] === 'sm'): ?>size-8<?php endif; ?><?php if ($args['size'] === 'md'): ?>size-10<?php endif; ?><?php if ($args['size'] === 'lg'): ?>size-20<?php endif; ?>">
  <img src="<?= $args['src'] ?>" alt="<?= $args['alt'] ?>" class="block w-full h-full object-cover bg-neutral-100 <?php if ($args['shape'] === 'rounded'): ?>rounded-full<?php endif; ?><?php if ($args['shape'] === 'squared'): ?>rounded-sm<?php endif; ?>">
  <div class="absolute inset-0 bg-white/0 group-hover:bg-white/25 transition-colors <?php if ($args['shape'] === 'rounded'): ?>rounded-full<?php endif; ?><?php if ($args['shape'] === 'squared'): ?>rounded-sm<?php endif; ?>"></div>
</div>
