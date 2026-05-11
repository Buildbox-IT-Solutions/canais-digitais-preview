<?php
/**
 * Partial: Image — wrapper com aspect ratio e radius
 *
 * Átomo base de imagem. Diferente do Thumbnail, NÃO tem hover-zoom nem
 * play overlay — é o wrapper cru. Showcase completo em
 * /src/components/image.php.
 *
 * USO:
 *   <?php get_template_part('components/_partials/image', null, [
 *     'src'   => 'https://...',
 *     'alt'   => '...',
 *     'ratio' => 'video',    // square | 4-3 | 3-2 | video | 21-9 | 3-4 | 2-3 | 9-16 | 9-21
 *     'class' => '',         // classes extras no wrapper (ex: 'w-64')
 *   ]); ?>
 *
 * PROPS ($args):
 *   src   → URL da imagem
 *   alt   → texto alternativo
 *   ratio → aspect ratio (ver mapeamento abaixo)
 *   class → classes extras aplicadas ao <div> wrapper
 *
 * MAPEAMENTO DE RATIO:
 *   square → aspect-square        3-4  → aspect-[3/4]
 *   4-3    → aspect-[4/3]         2-3  → aspect-[2/3]
 *   3-2    → aspect-[3/2]         9-16 → aspect-[9/16]
 *   video  → aspect-video         9-21 → aspect-[9/21]
 *   21-9   → aspect-[21/9]
 */
?>
<div class="rounded-sm bg-neutral-100 overflow-hidden <?php if ($args['ratio'] === 'square'): ?>aspect-square<?php endif; ?><?php if ($args['ratio'] === '4-3'): ?>aspect-[4/3]<?php endif; ?><?php if ($args['ratio'] === '3-2'): ?>aspect-[3/2]<?php endif; ?><?php if ($args['ratio'] === 'video'): ?>aspect-video<?php endif; ?><?php if ($args['ratio'] === '21-9'): ?>aspect-[21/9]<?php endif; ?><?php if ($args['ratio'] === '3-4'): ?>aspect-[3/4]<?php endif; ?><?php if ($args['ratio'] === '2-3'): ?>aspect-[2/3]<?php endif; ?><?php if ($args['ratio'] === '9-16'): ?>aspect-[9/16]<?php endif; ?><?php if ($args['ratio'] === '9-21'): ?>aspect-[9/21]<?php endif; ?> <?= $args['class'] ?>">
  <img src="<?= $args['src'] ?>" alt="<?= $args['alt'] ?>" class="w-full h-full object-cover">
</div>
