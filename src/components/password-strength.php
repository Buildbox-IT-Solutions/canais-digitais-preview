<?php
/**
 * Componente: Password Strength
 * Figma: derivado de FEATURE-cadastro.md §4.3 + §6.3 — sem nodeId
 * Variantes: empty | weak | medium | strong
 * Tokens usados: bg-neutral-100, text-neutral-500, text-label-md,
 *                arbitrary values #DC2626 / #F59E0B / #16A34A
 *
 * Embutido no form-field do Bloco 2 de cadastro e na tela de redefinição
 * de senha. A lógica de níveis vive em password-strength.js.
 */
?>
<div class="space-y-6 max-w-[360px]">

  <div>
    <p class="text-label-sm text-neutral-700 mb-2">Vazia (estado inicial)</p>
    <?php get_template_part('components/_partials/password-strength', null, [
      'level' => 'empty',
      'inputId' => 'demo-pw-1',
    ]); ?>
  </div>

  <div>
    <p class="text-label-sm text-neutral-700 mb-2">Fraca — só letras ou só números</p>
    <?php get_template_part('components/_partials/password-strength', null, [
      'level' => 'weak',
      'inputId' => 'demo-pw-2',
    ]); ?>
  </div>

  <div>
    <p class="text-label-sm text-neutral-700 mb-2">Média — letras + números, &lt; 12 chars</p>
    <?php get_template_part('components/_partials/password-strength', null, [
      'level' => 'medium',
      'inputId' => 'demo-pw-3',
    ]); ?>
  </div>

  <div>
    <p class="text-label-sm text-neutral-700 mb-2">Forte — letras + números, 12+ chars</p>
    <?php get_template_part('components/_partials/password-strength', null, [
      'level' => 'strong',
      'inputId' => 'demo-pw-4',
    ]); ?>
  </div>

</div>
