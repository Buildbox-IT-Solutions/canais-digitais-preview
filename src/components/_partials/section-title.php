<?php
/**
 * Partial: Section Title / Style 1 — single instance
 *
 * Cabeçalho de seção editorial com grafismo de 3 bullets + linha +
 * título. Showcase de todas as variantes em
 * /src/components/section-title-style-1.php.
 *
 * USO:
 *   <?php get_template_part('components/_partials/section-title', null, [
 *     'label'     => 'Notícias',
 *     'color'     => 'primary-600',     // classe cor aplicada ao text-
 *     'href'      => '#',
 *     'uppercase' => 'off',             // 'on' | 'off'
 *   ]); ?>
 *
 * PROPS ($args):
 *   label     → texto do título
 *   color     → sufixo do text- (primary-600 | secondary-950 | secondary-500
 *               | lavander | coral | saffron | mint | neutral-950 | white)
 *   href      → string|null (com href → <a> clicável; sem → <div>)
 *   uppercase → 'on' aplica uppercase na h2
 *
 * Variantes "Logo" e "Sponsor" do Figma existem só no showcase — se uma
 * layout precisar delas, referenciar o markup inline do showcase.
 */
?>
<?php if ($args['href']): ?><a href="<?= $args['href'] ?>" class="group block text-<?= $args['color'] ?> w-full pt-10 no-underline hover:opacity-75 transition-opacity">
  <div class="max-w-screen-xl mx-auto px-4 lg:px-6 space-y-2">
    <div class="flex items-center gap-1 h-1.5">
      <div class="flex items-center gap-1">
        <span class="block size-[5px] rounded-full bg-current"></span>
        <span class="block size-[5px] rounded-full bg-current opacity-40"></span>
        <span class="block size-[5px] rounded-full bg-current opacity-40"></span>
      </div>
      <div class="flex-1 h-px bg-current"></div>
    </div>
    <h2 class="text-headline-md font-display font-bold <?php if ($args['uppercase'] === 'on'): ?>uppercase<?php endif; ?>"><?= $args['label'] ?></h2>
  </div>
</a><?php else: ?><div class="block text-<?= $args['color'] ?> w-full pt-10">
  <div class="max-w-screen-xl mx-auto px-4 lg:px-6 space-y-2">
    <div class="flex items-center gap-1 h-1.5">
      <div class="flex items-center gap-1">
        <span class="block size-[5px] rounded-full bg-current"></span>
        <span class="block size-[5px] rounded-full bg-current opacity-40"></span>
        <span class="block size-[5px] rounded-full bg-current opacity-40"></span>
      </div>
      <div class="flex-1 h-px bg-current"></div>
    </div>
    <h2 class="text-headline-md font-display font-bold <?php if ($args['uppercase'] === 'on'): ?>uppercase<?php endif; ?>"><?= $args['label'] ?></h2>
  </div>
</div><?php endif; ?>
