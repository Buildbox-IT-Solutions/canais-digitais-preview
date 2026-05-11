<?php
/**
 * Partial: Byline — "Por Author Name"
 *
 * Linha de autoria usada em cards (News, Video, Podcast). Renderiza
 * "Por <a>Author Name</a>" com a tipografia e cores certas. Não tem
 * showcase próprio — é um átomo derivado direto do uso em cards.
 *
 * USO:
 *   <?php get_template_part('components/_partials/byline', null, [
 *     'author' => 'Author Name',
 *     'href'   => '#',
 *     'size'   => 'md',
 *   ]); ?>
 *
 * PROPS ($args):
 *   author → nome do autor
 *   href   → string|null   (sem href, fica texto plain sem link)
 *   size   → 'md' (text-body-md) | 'sm' (text-body-sm)
 *            Cards Large/Medium → md · Small/XSmall → sm
 *
 * Sempre `font-semibold text-neutral-900` (label "Por") +
 * `text-neutral-950 font-bold` (nome). Hover sublinhado.
 */
?>
<p class="<?php if ($args['size'] === 'md'): ?>text-body-md<?php endif; ?><?php if ($args['size'] === 'sm'): ?>text-body-sm<?php endif; ?> font-body font-semibold text-neutral-900">
  Por <?php if ($args['href']): ?><a href="<?= $args['href'] ?>" class="text-neutral-950 font-bold hover:underline"><?= $args['author'] ?></a><?php else: ?><span class="text-neutral-950 font-bold"><?= $args['author'] ?></span><?php endif; ?>
</p>
