<?php
/**
 * Partial: Sponsor Line — single instance
 *
 * Bloco "Conteúdo Patrocinado" + nome/logo da marca patrocinadora.
 * Reusado em todos os cards patrocinados (News/Video/Podcast Patrocinado).
 *
 * USO:
 *   <?php get_template_part('components/_partials/sponsor-line', null, [
 *     'company' => 'Tetra Pak',
 *     'href'    => '#',
 *   ]); ?>
 *
 * PROPS ($args):
 *   company → nome do patrocinador (string)
 *   href    → string|null (link da página do patrocinador)
 *
 * Tipografia (do Figma):
 *   - "Conteúdo Patrocinado": Open Sans SemiBold 11/16 tracking 0.5 text-neutral-900
 *   - Company Name: Aleo Bold 16/24 tracking 0.15 text-secondary-950
 *
 * Tokens: text-neutral-900 · text-secondary-950 · text-label-sm · text-title-md ·
 *         font-body · font-display
 */
?>
<div class="flex flex-col gap-1 items-start pt-3 w-full">
  <p class="font-body font-semibold text-label-sm text-neutral-900 w-full">Conteúdo Patrocinado</p>
  <?php if ($args['href']): ?><a href="<?= $args['href'] ?>" class="font-display font-bold text-title-md text-secondary-950 hover:underline"><?= $args['company'] ?></a><?php else: ?><span class="font-display font-bold text-title-md text-secondary-950"><?= $args['company'] ?></span><?php endif; ?>
</div>
