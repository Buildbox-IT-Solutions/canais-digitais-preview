<?php
/**
 * Partial: Dashboard Header — header-desktop.php + sub-navegação sticky
 * Usado em dashboard.php. Reusa o header-desktop já existente (aceita estado logado)
 * e acopla uma barra de 7 abas com ícone + label, destacando a ativa com
 * border-bottom coral.
 *
 * USO:
 *   <?php get_template_part('components/_partials/dashboard-header', null, [
 *     'headerArgs'    => $headerArgs,    // do _session.php
 *     'activeSection' => 'visao',
 *   ]); ?>
 *
 * PROPS ($args):
 *   headerArgs    → array — passado direto para header-desktop.php
 *   activeSection → string — 'visao' | 'biblio' | 'favoritos' | 'arquivos' | 'newsletters' | 'perfil' | 'conta'
 */

$headerArgs = $args['headerArgs'] ?? [];
$activeSection = $args['activeSection'] ?? 'visao';

$sections = [
  ['id' => 'visao',       'label' => 'Visão geral', 'icon' => 'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z'],
  ['id' => 'biblio',      'label' => 'Biblioteca',  'icon' => 'M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-6 8l-3-2-3 2V4h6v6z'],
  ['id' => 'favoritos',   'label' => 'Favoritos',   'icon' => 'M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z'],
  ['id' => 'arquivos',    'label' => 'Arquivos',    'icon' => 'M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z'],
  ['id' => 'newsletters', 'label' => 'Newsletters', 'icon' => 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z'],
  ['id' => 'perfil',      'label' => 'Perfil',      'icon' => 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'],
  ['id' => 'conta',       'label' => 'Conta',       'icon' => 'M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z'],
];
?>
<?php get_template_part('components/_partials/header-desktop', null, $headerArgs); ?>

<div class="sticky top-0 z-9 bg-white border-b border-neutral-50">
  <div class="max-w-screen-xl mx-auto px-4 lg:px-6 flex gap-1 overflow-x-auto">
    <?php foreach ($sections as $s):
      $on = $activeSection === $s['id'];
      $href = '?section=' . $s['id'] . (isset($_GET['user']) ? '&user=' . htmlspecialchars($_GET['user']) : '');
    ?>
    <a href="<?= $href ?>"
       class="inline-flex items-center gap-2 px-4 py-4 font-body text-label-lg uppercase tracking-wider whitespace-nowrap transition-colors border-b-2
              <?= $on ? 'font-bold text-primary-600 border-coral' : 'font-semibold text-neutral-700 border-transparent hover:text-primary-600' ?>">
      <svg class="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="<?= $s['icon'] ?>"/>
      </svg>
      <?= $s['label'] ?>
    </a>
    <?php endforeach; ?>
  </div>
</div>
