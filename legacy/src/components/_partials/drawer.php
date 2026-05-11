<?php
/**
 * Partial: Drawer — painel slide-in 560px à direita com scrim
 * Figma: 6045:6857 (Drawer container 560×1443)
 *
 * Estrutura: scrim (overlay) + container fixo direito.
 * Top: título Aleo Bold 28/36 + close icon-button 40px (com href para fechar).
 * Form area: slot via $args['content'] (string HTML).
 * Bottom: Cancelar (ghost) + Salvar (filled primary, opcionalmente disabled).
 *
 * USO:
 *   <?php get_template_part('components/_partials/drawer', null, [
 *     'open'       => true,
 *     'title'      => 'Dados pessoais',
 *     'closeHref'  => '?tab=perfil',
 *     'cancelHref' => '?tab=perfil',
 *     'saveHref'   => '?tab=perfil&state=saved',
 *     'saveDisabled' => false,
 *     'content'    => '<div>...HTML do form...</div>',
 *   ]); ?>
 *
 * PROPS ($args):
 *   open         → bool   — se false, retorna nada
 *   title        → string
 *   closeHref    → string — destino do botão close (X)
 *   cancelHref   → string — destino do "Cancelar"
 *   saveHref     → string — destino do "Salvar"
 *   saveDisabled → bool   — true → bg neutral-200, sem hover
 *   content      → string — HTML do conteúdo do form (slot)
 */

$open         = !empty($args['open']);
if (!$open) return;

$title        = $args['title']        ?? '';
$closeHref    = $args['closeHref']    ?? '?';
$cancelHref   = $args['cancelHref']   ?? '?';
$saveHref     = $args['saveHref']     ?? '?';
$saveDisabled = !empty($args['saveDisabled']);
$content      = $args['content']      ?? '';

$saveBtnClasses = $saveDisabled
  ? 'bg-neutral-200 text-white pointer-events-none'
  : 'bg-primary-600 text-white hover:bg-secondary-950';
?>
<div class="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
  <!-- Scrim -->
  <a href="<?= htmlspecialchars($closeHref) ?>"
     class="absolute inset-0 bg-[#050708]/30 cursor-pointer animate-fade-in"
     aria-label="Fechar"></a>

  <!-- Container -->
  <aside class="absolute inset-y-0 right-0 w-full max-w-[560px] bg-white border-l border-neutral-100 shadow-xl flex flex-col animate-slide-in-right will-change-transform">
    <!-- Top -->
    <div class="flex items-center gap-4 pl-8 pr-5 py-5 shrink-0">
      <h2 id="drawer-title" class="flex-1 min-w-0 font-display font-bold text-headline-md text-primary-600">
        <?= htmlspecialchars($title) ?>
      </h2>
      <a href="<?= htmlspecialchars($closeHref) ?>"
         aria-label="Fechar painel"
         class="inline-flex items-center justify-center size-10 rounded-full text-primary-600 hover:bg-neutral-50 transition-colors">
        <svg class="size-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </a>
    </div>

    <!-- Form (slot) -->
    <div class="flex-1 min-h-0 overflow-y-auto px-8 py-6 flex flex-col gap-6">
      <?= $content ?>
    </div>

    <!-- Bottom -->
    <div class="flex items-center justify-end gap-2 px-8 py-5 border-t border-neutral-50 shrink-0">
      <a href="<?= htmlspecialchars($cancelHref) ?>"
         class="inline-flex items-center justify-center h-10 px-6 rounded-full text-primary-600 hover:bg-neutral-50 transition-colors font-body font-bold text-body-lg">
        Cancelar
      </a>
      <a href="<?= htmlspecialchars($saveHref) ?>"
         data-analytics-event="dashboard_drawer_salvar"
         class="inline-flex items-center justify-center h-10 px-6 rounded-full font-body font-bold text-body-lg transition-colors <?= $saveBtnClasses ?>">
        Salvar
      </a>
    </div>
  </aside>
</div>
