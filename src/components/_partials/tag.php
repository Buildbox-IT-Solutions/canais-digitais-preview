<?php
/**
 * Partial: Tag — single instance
 *
 * Tag/keyword clicável. Pill pequeno com bg-primary-100. Showcase em
 * /src/components/tag.php.
 *
 * USO:
 *   <?php get_template_part('components/_partials/tag', null, [
 *     'label' => 'Sustentabilidade',
 *     'href'  => '#',
 *   ]); ?>
 *
 * PROPS ($args):
 *   label → texto da tag
 *   href  → string|null (com href vira <a>; sem href vira <span>)
 */
?>
<?php if ($args['href']): ?><a href="<?= $args['href'] ?>" class="inline-flex items-center px-2 py-1 rounded-sm bg-primary-100 text-primary-800 hover:bg-neutral-50 hover:text-secondary-950 transition-colors font-body font-semibold text-title-sm"><?= $args['label'] ?></a><?php else: ?><span class="inline-flex items-center px-2 py-1 rounded-sm bg-primary-100 text-primary-800 hover:bg-neutral-50 hover:text-secondary-950 transition-colors font-body font-semibold text-title-sm"><?= $args['label'] ?></span><?php endif; ?>
