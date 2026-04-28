<?php
/**
 * Componente: Toast
 * Figma: derivado de FEATURE-cadastro.md §4.2 — sem nodeId ainda
 * Variantes: success | error | warning | info
 * Tokens usados: bg-white, border-neutral-100, shadow-lg, rounded-lg,
 *                cores de destaque por tipo (arbitrary values + secondary-950)
 *
 * Posicionamento:
 *   Desktop: fixed bottom-6 right-6 (container JS)
 *   Mobile:  fixed bottom-0 inset-x-0 p-4 (container JS)
 *   Auto-dismiss: 4s — controlado por toast.js
 */
?>
<div class="space-y-4 max-w-[460px]">
  <?php get_template_part('components/_partials/toast', null, [
    'type' => 'success',
    'message' => 'Senha redefinida com sucesso.',
  ]); ?>

  <?php get_template_part('components/_partials/toast', null, [
    'type' => 'error',
    'message' => 'Não foi possível salvar. Tente novamente.',
  ]); ?>

  <?php get_template_part('components/_partials/toast', null, [
    'type' => 'warning',
    'message' => 'Sua sessão expira em 2 minutos.',
  ]); ?>

  <?php get_template_part('components/_partials/toast', null, [
    'type' => 'info',
    'message' => 'Enviamos um link de confirmação para o seu e-mail.',
  ]); ?>
</div>
