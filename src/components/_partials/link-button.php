<?php
/**
 * Partial: Link Button — single instance
 *
 * Botão-link sem bg nem borda. Showcase em /src/components/link-button.php.
 *
 * USO:
 *   <?php get_template_part('components/_partials/link-button', null, [
 *     'label' => 'Ver mais',
 *     'href'  => '#',
 *     'size'  => 'lg',   // 'xl' | 'lg' | 'md' | 'sm'
 *   ]); ?>
 *
 * PROPS ($args):
 *   label → texto do link
 *   href  → string (sempre <a>)
 *   size  → 'xl' | 'lg' | 'md' | 'sm'
 *           XL/Large/Medium usam font-display (Aleo Bold)
 *           Small usa font-body (Open Sans Bold)
 *
 * MAPEAMENTO SIZE:
 *   xl → text-title-xl font-display   (22px Aleo)
 *   lg → text-title-lg font-display   (18px Aleo)
 *   md → text-title-md font-display   (16px Aleo)
 *   sm → text-label-lg font-body      (14px Open Sans)
 */
?>
<a href="<?= $args['href'] ?>" class="inline-flex items-center font-bold transition-colors text-secondary-950 hover:text-secondary-900 hover:underline <?php if ($args['size'] === 'xl'): ?>text-title-xl font-display<?php endif; ?><?php if ($args['size'] === 'lg'): ?>text-title-lg font-display<?php endif; ?><?php if ($args['size'] === 'md'): ?>text-title-md font-display<?php endif; ?><?php if ($args['size'] === 'sm'): ?>text-label-lg font-body<?php endif; ?>"><?= $args['label'] ?></a>
