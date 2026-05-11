<?php
/**
 * Partial: Categoria — single instance
 *
 * Renderiza UMA categoria. O showcase de todas as variantes vive em
 * /src/components/categoria.php (componente "showcase"). Este arquivo é
 * o átomo parametrizado que componentes compostos (cards, headers, etc)
 * incluem via get_template_part.
 *
 * USO:
 *   <?php get_template_part('components/_partials/categoria', null, [
 *     'color' => 'mint',
 *     'chip'  => 'off',
 *     'label' => 'Vídeos',
 *     'href'  => '#',
 *   ]); ?>
 *
 * PROPS ($args):
 *   color  → sufixo de cor Tailwind aplicado depois de `text-`. Valores
 *            válidos no design system de Categoria:
 *              coral · mint · saffron · lavander
 *              secondary-950 (Ultramarine) · secondary-500 (Sky) · primary-600 (Indigo)
 *   chip   → 'on' | 'off'   (on = pill com bg branco; off = só texto inline)
 *   label  → string com o nome da categoria
 *   href   → string|null    (se presente, vira <a>; senão <span>)
 *
 * IMPORTANTE: as classes `text-{color}` precisam estar geradas em
 * output.css. Hoje elas vêm do showcase /src/components/categoria.php,
 * que lista todas as 7 cores estaticamente. Não remover o showcase sem
 * preservar a geração (ex: via @source em tokens.css).
 */
?>
<?php if ($args['href']): ?><a href="<?= $args['href'] ?>" class="<?php if ($args['chip'] === 'on'): ?>inline-flex items-center px-2 py-1 rounded-sm bg-white hover:bg-neutral-50 transition-colors <?php endif; ?>text-body-sm font-body font-semibold text-<?= $args['color'] ?>"><?= $args['label'] ?></a><?php else: ?><span class="<?php if ($args['chip'] === 'on'): ?>inline-flex items-center px-2 py-1 rounded-sm bg-white hover:bg-neutral-50 transition-colors <?php endif; ?>text-body-sm font-body font-semibold text-<?= $args['color'] ?>"><?= $args['label'] ?></span><?php endif; ?>
