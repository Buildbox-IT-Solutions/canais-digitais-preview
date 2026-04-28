<?php
/**
 * Partial: Play Button — single instance
 *
 * Renderiza UMA instância do Play Button. Showcase de todas as 24 variants
 * vive em /src/components/play-button.php.
 *
 * USO (overlay em thumbnail clicável de card):
 *   <?php get_template_part('components/_partials/play-button', null, [
 *     'size' => 'small',
 *     'as'   => 'div',
 *     'type' => 'play',
 *   ]); ?>
 *
 * PROPS ($args):
 *   size → 'xlarge' | 'large' | 'medium' | 'small'
 *   as   → 'button' | 'div'   (use 'div' quando dentro de <a> clicável)
 *   type → 'play' | 'pause'
 *
 * IMPORTANTE — nesting HTML:
 *   Quando overlay numa thumbnail (<a>), `as=div` é OBRIGATÓRIO. Botões
 *   não podem aninhar dentro de <a>. O div recebe pointer-events-none
 *   pra deixar o clique passar pro <a> pai.
 *
 * Nota: este partial só cobre o estado Enabled. Hovered e Disabled vivem
 * apenas no showcase /src/components/play-button.php (são estados de
 * referência visual, não usados como includes em cards).
 */
?>
<?php if ($args['as'] === 'div'): ?><div class="inline-flex items-center justify-center rounded-full bg-white text-primary-600 pointer-events-none <?php if ($args['size'] === 'xlarge'): ?>size-18 p-4<?php endif; ?><?php if ($args['size'] === 'large'): ?>size-16 p-4<?php endif; ?><?php if ($args['size'] === 'medium'): ?>size-12 p-3<?php endif; ?><?php if ($args['size'] === 'small'): ?>size-10 p-2<?php endif; ?><?php if ($args['size'] === 'xsmall'): ?>size-8 p-1<?php endif; ?>">
  <svg class="<?php if ($args['size'] === 'xlarge'): ?>size-10<?php endif; ?><?php if ($args['size'] === 'large'): ?>size-8<?php endif; ?><?php if ($args['size'] === 'medium'): ?>size-6<?php endif; ?><?php if ($args['size'] === 'small'): ?>size-6<?php endif; ?><?php if ($args['size'] === 'xsmall'): ?>size-5<?php endif; ?>" viewBox="0 0 24 24" fill="currentColor"><?php if ($args['type'] === 'play'): ?><path d="M8 5v14l11-7L8 5z"/><?php endif; ?><?php if ($args['type'] === 'pause'): ?><path d="M6 5h4v14H6zM14 5h4v14h-4z"/><?php endif; ?></svg>
</div><?php else: ?><button type="button" aria-label="<?php if ($args['type'] === 'play'): ?>Reproduzir<?php endif; ?><?php if ($args['type'] === 'pause'): ?>Pausar<?php endif; ?>" class="inline-flex items-center justify-center rounded-full transition-colors bg-white text-primary-600 hover:text-secondary-950 disabled:bg-neutral-200 disabled:text-white disabled:cursor-not-allowed <?php if ($args['size'] === 'xlarge'): ?>size-18 p-4<?php endif; ?><?php if ($args['size'] === 'large'): ?>size-16 p-4<?php endif; ?><?php if ($args['size'] === 'medium'): ?>size-12 p-3<?php endif; ?><?php if ($args['size'] === 'small'): ?>size-10 p-2<?php endif; ?>">
  <svg class="<?php if ($args['size'] === 'xlarge'): ?>size-10<?php endif; ?><?php if ($args['size'] === 'large'): ?>size-8<?php endif; ?><?php if ($args['size'] === 'medium'): ?>size-6<?php endif; ?><?php if ($args['size'] === 'small'): ?>size-6<?php endif; ?>" viewBox="0 0 24 24" fill="currentColor"><?php if ($args['type'] === 'play'): ?><path d="M8 5v14l11-7L8 5z"/><?php endif; ?><?php if ($args['type'] === 'pause'): ?><path d="M6 5h4v14H6zM14 5h4v14h-4z"/><?php endif; ?></svg>
</button><?php endif; ?>
