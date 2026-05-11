<?php
/**
 * Partial: Divider — single instance
 *
 * Linha separadora 1px. Showcase de ambas as variantes vive em
 * /src/components/divider.php.
 *
 * USO:
 *   <?php get_template_part('components/_partials/divider', null, [
 *     'orientation' => 'horizontal',
 *   ]); ?>
 *
 * PROPS ($args):
 *   orientation → 'horizontal' (h-px w-full) | 'vertical' (w-px h-full)
 */
?>
<?php if ($args['orientation'] === 'horizontal'): ?><div class="h-px w-full bg-neutral-100"></div><?php endif; ?><?php if ($args['orientation'] === 'vertical'): ?><div class="w-px h-full bg-neutral-100"></div><?php endif; ?>
