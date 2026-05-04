<?php
/**
 * Componente: Password Strength
 * Figma: derivado de FEATURE-cadastro.md §4.3 + §6.3 — sem nodeId
 * Variantes: empty | weak | medium | strong (derivadas dos 4 critérios)
 * Tokens usados: bg-neutral-100, text-neutral-500/700/950, text-label-md,
 *                arbitrary values #DC2626 / #F59E0B / #16A34A
 *
 * Embutido no form-field do Bloco 2 de cadastro e na tela de redefinição
 * de senha. A lógica em tempo real vive em cadastro-flow.js.
 */
?>
<div class="space-y-6 max-w-[360px]">

  <div>
    <p class="text-label-sm text-neutral-700 mb-2">Vazia (estado inicial) — 0 critérios</p>
    <?php get_template_part('components/_partials/password-strength', null, [
      'inputId' => 'demo-pw-1',
    ]); ?>
  </div>

  <div>
    <p class="text-label-sm text-neutral-700 mb-2">Fraca — 1 critério (<code>"abc"</code>)</p>
    <?php get_template_part('components/_partials/password-strength', null, [
      'inputId' => 'demo-pw-2',
      'value'   => 'abc',
    ]); ?>
  </div>

  <div>
    <p class="text-label-sm text-neutral-700 mb-2">Fraca — 2 critérios (<code>"abcdefgh"</code>)</p>
    <?php get_template_part('components/_partials/password-strength', null, [
      'inputId' => 'demo-pw-3',
      'value'   => 'abcdefgh',
    ]); ?>
  </div>

  <div>
    <p class="text-label-sm text-neutral-700 mb-2">Média — 3 critérios (<code>"Abcdefg1"</code>)</p>
    <?php get_template_part('components/_partials/password-strength', null, [
      'inputId' => 'demo-pw-4',
      'value'   => 'Abcdefg1',
    ]); ?>
  </div>

  <div>
    <p class="text-label-sm text-neutral-700 mb-2">Forte — 4 critérios (<code>"Abcdef1@"</code>)</p>
    <?php get_template_part('components/_partials/password-strength', null, [
      'inputId' => 'demo-pw-5',
      'value'   => 'Abcdef1@',
    ]); ?>
  </div>

</div>
