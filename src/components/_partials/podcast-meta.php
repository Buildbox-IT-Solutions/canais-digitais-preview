<?php
/**
 * Partial: Podcast Meta — "99h 99m • Por Author Name"
 *
 * Linha de meta específica do Podcast Card, combinando duração e autor.
 * Não é um byline genérico — tem estrutura própria com bullet separador.
 *
 * USO:
 *   <?php get_template_part('components/_partials/podcast-meta', null, [
 *     'time'   => '99h 99m',
 *     'author' => 'Author Name',
 *     'href'   => '#',
 *     'size'   => 'md',   // 'md' | 'sm'
 *   ]); ?>
 *
 * PROPS ($args):
 *   time   → string com a duração formatada (ex: "99h 99m" | "45m" | "1h 30m")
 *   author → nome do autor
 *   href   → string|null (sem href, fica texto plain sem link)
 *   size   → 'md' (text-body-md) | 'sm' (text-body-sm)
 *            Cards Large/Medium → md · Small/XSmall → sm
 */
?>
<div class="flex items-center gap-2 <?php if ($args['size'] === 'md'): ?>text-body-md<?php endif; ?><?php if ($args['size'] === 'sm'): ?>text-body-sm<?php endif; ?> font-body font-semibold text-neutral-900">
  <span><?= $args['time'] ?></span>
  <span aria-hidden="true">•</span>
  <span>Por <?php if ($args['href']): ?><a href="<?= $args['href'] ?>" class="text-neutral-950 font-bold hover:underline"><?= $args['author'] ?></a><?php else: ?><span class="text-neutral-950 font-bold"><?= $args['author'] ?></span><?php endif; ?></span>
</div>
