<?php
/**
 * Partial: Button — single instance (text-only, com ou sem ícone direito)
 *
 * Pill rounded-full do Button [1.1]. Showcase completo (todos os ícones e
 * combinações) em /src/components/button.php.
 *
 * USO:
 *   <?php get_template_part('components/_partials/button', null, [
 *     'label' => 'Ver mais',
 *     'href'  => '#',
 *     'type'  => 'filled',         // 'filled' | 'outlined' | 'ghost'
 *     'size'  => 'medium',         // 'large' | 'medium' | 'small'
 *     'icon'  => 'arrow-right',    // 'none' | 'arrow-right' | 'plus'
 *   ]); ?>
 *
 * PROPS ($args):
 *   label → texto do botão
 *   href  → string|null   (com href → <a>; sem href → <button>)
 *   type  → 'filled' | 'outlined' | 'ghost'
 *   size  → 'large' | 'medium' | 'small'
 *   icon  → 'none' | 'arrow-right' | 'plus'
 *
 * Para botões com ícone à esquerda ou outros ícones específicos, usar
 * o markup completo do showcase (/src/components/button.php) inline.
 */
?>
<?php if ($args['href']): ?><a href="<?= $args['href'] ?>" class="inline-flex items-center justify-center rounded-full font-body font-bold transition-colors <?php if ($args['type'] === 'filled'): ?>bg-primary-600 text-white hover:bg-secondary-950<?php endif; ?><?php if ($args['type'] === 'outlined'): ?>bg-transparent text-primary-600 border-[1.5px] border-primary-600 hover:bg-neutral-50<?php endif; ?><?php if ($args['type'] === 'ghost'): ?>bg-transparent text-primary-600 hover:bg-neutral-50<?php endif; ?> <?php if ($args['size'] === 'large'): ?>h-12 gap-3 text-body-lg<?php endif; ?><?php if ($args['size'] === 'medium'): ?>h-10 gap-2 text-body-lg<?php endif; ?><?php if ($args['size'] === 'small'): ?>h-8 gap-2 text-title-sm<?php endif; ?> <?php if ($args['icon'] === 'none'): ?><?php if ($args['size'] === 'large'): ?>px-6<?php endif; ?><?php if ($args['size'] === 'medium'): ?>px-6<?php endif; ?><?php if ($args['size'] === 'small'): ?>px-3<?php endif; ?><?php endif; ?><?php if ($args['icon'] !== 'none'): ?><?php if ($args['size'] === 'large'): ?>pl-6 pr-5<?php endif; ?><?php if ($args['size'] === 'medium'): ?>pl-5 pr-4<?php endif; ?><?php if ($args['size'] === 'small'): ?>pl-4 pr-3<?php endif; ?><?php endif; ?>">
  <?= $args['label'] ?>
  <?php if ($args['icon'] === 'arrow-right'): ?><svg class="<?php if ($args['size'] === 'small'): ?>size-5<?php endif; ?><?php if ($args['size'] !== 'small'): ?>size-6<?php endif; ?>" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg><?php endif; ?>
  <?php if ($args['icon'] === 'plus'): ?><svg class="<?php if ($args['size'] === 'small'): ?>size-5<?php endif; ?><?php if ($args['size'] !== 'small'): ?>size-6<?php endif; ?>" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg><?php endif; ?>
</a><?php else: ?><button type="button" class="inline-flex items-center justify-center rounded-full font-body font-bold transition-colors disabled:cursor-not-allowed <?php if ($args['type'] === 'filled'): ?>bg-primary-600 text-white hover:bg-secondary-950 disabled:bg-neutral-200<?php endif; ?><?php if ($args['type'] === 'outlined'): ?>bg-transparent text-primary-600 border-[1.5px] border-primary-600 hover:bg-neutral-50 disabled:border-neutral-200 disabled:text-neutral-200<?php endif; ?><?php if ($args['type'] === 'ghost'): ?>bg-transparent text-primary-600 hover:bg-neutral-50 disabled:text-neutral-200<?php endif; ?> <?php if ($args['size'] === 'large'): ?>h-12 gap-3 text-body-lg<?php endif; ?><?php if ($args['size'] === 'medium'): ?>h-10 gap-2 text-body-lg<?php endif; ?><?php if ($args['size'] === 'small'): ?>h-8 gap-2 text-title-sm<?php endif; ?> <?php if ($args['icon'] === 'none'): ?><?php if ($args['size'] === 'large'): ?>px-6<?php endif; ?><?php if ($args['size'] === 'medium'): ?>px-6<?php endif; ?><?php if ($args['size'] === 'small'): ?>px-3<?php endif; ?><?php endif; ?><?php if ($args['icon'] !== 'none'): ?><?php if ($args['size'] === 'large'): ?>pl-6 pr-5<?php endif; ?><?php if ($args['size'] === 'medium'): ?>pl-5 pr-4<?php endif; ?><?php if ($args['size'] === 'small'): ?>pl-4 pr-3<?php endif; ?><?php endif; ?>">
  <?= $args['label'] ?>
  <?php if ($args['icon'] === 'arrow-right'): ?><svg class="<?php if ($args['size'] === 'small'): ?>size-5<?php endif; ?><?php if ($args['size'] !== 'small'): ?>size-6<?php endif; ?>" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg><?php endif; ?>
  <?php if ($args['icon'] === 'plus'): ?><svg class="<?php if ($args['size'] === 'small'): ?>size-5<?php endif; ?><?php if ($args['size'] !== 'small'): ?>size-6<?php endif; ?>" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg><?php endif; ?>
</button><?php endif; ?>
