<?php
/**
 * Partial: Toast — notificação flutuante com auto-dismiss
 *
 * Single instance. Showcase de todas as variantes em /src/components/toast.php.
 * O posicionamento (bottom-right / bottom full-width) é responsabilidade do
 * container JS que injeta o toast. Este partial renderiza só o card.
 *
 * USO:
 *   <?php get_template_part('components/_partials/toast', null, [
 *     'type'    => 'success',        // 'success' | 'error' | 'warning' | 'info'
 *     'message' => 'Senha redefinida com sucesso.',
 *     'id'      => 'toast-123',      // opcional — usado pelo JS para dismiss
 *   ]); ?>
 *
 * PROPS ($args):
 *   type    → enum de tipo (define ícone e cor de destaque)
 *   message → string exibida ao lado do ícone
 *   id      → string|null (id do elemento raiz)
 *
 * A11y:
 *   success/info → role="status" + aria-live="polite"
 *   error/warning → role="alert" + aria-live="assertive"
 */
?>
<?php
$type = $args['type'] ?? 'info';
$message = $args['message'] ?? '';
$id = $args['id'] ?? null;

$styles = match($type) {
  'success' => [
    'icon'    => 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
    'accent'  => 'text-[#16A34A]',
    'border'  => 'border-l-[#16A34A]',
  ],
  'error' => [
    'icon'    => 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z',
    'accent'  => 'text-[#bf0413]',
    'border'  => 'border-l-[#bf0413]',
  ],
  'warning' => [
    'icon'    => 'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z',
    'accent'  => 'text-[#F59E0B]',
    'border'  => 'border-l-[#F59E0B]',
  ],
  default => [
    'icon'    => 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z',
    'accent'  => 'text-secondary-950',
    'border'  => 'border-l-secondary-950',
  ],
};

$role = in_array($type, ['error', 'warning']) ? 'alert' : 'status';
$live = in_array($type, ['error', 'warning']) ? 'assertive' : 'polite';
?>
<div<?= $id ? ' id="' . $id . '"' : '' ?> role="<?= $role ?>" aria-live="<?= $live ?>" class="flex items-start gap-3 w-full max-w-[420px] bg-white border border-neutral-100 border-l-4 <?= $styles['border'] ?> rounded-lg shadow-lg p-4">
  <svg class="size-5 shrink-0 <?= $styles['accent'] ?>" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="<?= $styles['icon'] ?>"/></svg>
  <p class="flex-1 font-body text-body-md text-neutral-950"><?= $message ?></p>
  <button type="button" aria-label="Fechar notificação" data-toast-dismiss class="shrink-0 text-neutral-500 hover:text-neutral-950 transition-colors">
    <svg class="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
  </button>
</div>
