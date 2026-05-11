<?php
/**
 * Layout: Menu — Side menu overlay (hamburger)
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=986-21416
 * NodeId Desktop: 986:21416 (1920×1080)
 *
 * Overlay lateral que aparece ao clicar no hamburger do header.
 * Panel branco à esquerda (280px) com:
 *   - Close button (icon-button ghost)
 *   - 11 editorias como menu items (h-14 cada)
 *   - Items com submenu mostram chevron → (Eventos, Indústria A&B, ESG)
 *   - Footer: divider + logo Informa
 * Fundo: Scrim (bg-primary-950 opacity 32%)
 *
 * Partials consumidos: icon-button, divider
 */
?>
<div class="relative w-full h-screen overflow-hidden">

  <!-- Scrim (overlay escuro) -->
  <div class="absolute inset-0 bg-primary-950 opacity-[.32] z-40"></div>

  <!-- Side Menu Panel -->
  <aside class="absolute top-0 left-0 z-50 bg-white border-r border-neutral-100 flex h-full w-[280px] min-w-[240px] max-w-[280px] py-2">
    <div class="flex flex-col flex-1 h-full items-start">

      <!-- Close button -->
      <div class="flex items-center px-3 py-2 w-full">
        <?php get_template_part('components/_partials/icon-button', null, [
          'icon' => 'close', 'type' => 'ghost', 'size' => 'large', 'label' => 'Fechar menu', 'href' => '/src/layouts/home.php',
        ]); ?>
      </div>

      <!-- Menu list -->
      <nav class="flex flex-col items-start w-full">
        <?php
        $menu_items = [
          ['label' => 'Eventos',         'dropdown' => true],
          ['label' => 'Ingredientes',    'dropdown' => false],
          ['label' => 'Indústria A&B',   'dropdown' => true],
          ['label' => 'Proteína Animal', 'dropdown' => false],
          ['label' => 'Food Service',    'dropdown' => false],
          ['label' => 'Sorvetes',        'dropdown' => false],
          ['label' => 'Tecnologia',      'dropdown' => false],
          ['label' => 'Embalagens',      'dropdown' => false],
          ['label' => 'ESG',             'dropdown' => true],
          ['label' => 'Especialistas',   'dropdown' => false],
          ['label' => 'E-books',         'dropdown' => false],
        ];
        foreach ($menu_items as $item): ?>
        <a href="/src/layouts/categoria.php" class="flex gap-3 h-14 items-center pl-6 pr-4 py-2 w-full hover:bg-neutral-50 transition-colors">
          <span class="flex-1 font-body font-bold text-label-lg text-primary-600"><?php echo $item['label']; ?></span>
          <?php if ($item['dropdown']): ?>
          <svg class="size-6 text-primary-600" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
          <?php endif; ?>
        </a>
        <?php endforeach; ?>
      </nav>

      <!-- Footer: divider + Informa brand -->
      <div class="flex flex-1 flex-col gap-4 items-start justify-end px-5 py-2 w-full">
        <?php get_template_part('components/_partials/divider', null, ['orientation' => 'horizontal']); ?>
        <div class="h-[34px] flex items-center">
          <span class="font-display font-bold text-title-lg text-primary-600">informa</span>
        </div>
      </div>

    </div>
  </aside>

  <!-- Background: page content (dimmed, non-interactive) -->
  <div class="absolute inset-0 z-30 pointer-events-none overflow-hidden">
    <!-- Simplified representation of the home page behind the menu -->
    <div class="opacity-50">
      <?php
      $activeCategory = null;
      require_once __DIR__ . '/_session.php';
      get_template_part('components/_partials/header-desktop', null, $headerArgs);
      ?>
    </div>
  </div>

</div>
