<?php
/**
 * Partial: Auth Shell — wrapper 2-col para Login/Cadastro
 * Coluna esquerda: header (logo + "Voltar ao portal") · slot central · footer legal.
 * Coluna direita: proof-panel.php.
 *
 * Convenção: a coluna esquerda recebe o form via $args['content'] (HTML pré-renderizado
 * com ob_start/ob_get_clean no layout chamador).
 *
 * USO:
 *   ob_start();
 *   // ... form / headline / CTAs
 *   $content = ob_get_clean();
 *   get_template_part('components/_partials/auth-shell', null, [
 *     'content'   => $content,
 *     'mode'      => 'login',   // 'login' | 'signup'
 *     'narrow'    => false,     // true → max-w 380px na coluna central
 *     'hideProof' => false,     // true → oculta coluna direita (usado em fluxos secundários)
 *   ]);
 *
 * PROPS ($args):
 *   content   → string HTML (injetado na coluna central)
 *   mode      → 'login' | 'signup' — passado para o proof-panel
 *   narrow    → bool (opcional — 380px vs 440px)
 *   hideProof → bool (opcional — esconde proof panel)
 */

$content = $args['content'] ?? '';
$mode = $args['mode'] ?? 'login';
$narrow = $args['narrow'] ?? false;
$hideProof = $args['hideProof'] ?? false;
$maxWidth = $narrow ? 'max-w-[380px]' : 'max-w-[440px]';
?>
<div class="grid min-h-screen bg-white" style="grid-template-columns: <?= $hideProof ? '1fr' : 'minmax(520px,1fr) minmax(520px,1.05fr)' ?>;">

  <!-- Coluna esquerda: header + conteúdo + rodapé -->
  <div class="flex flex-col min-h-screen">

    <!-- Header -->
    <div class="flex items-center justify-between px-12 py-8">
      <a href="/src/layouts/home.php" class="font-display font-bold text-title-xl text-primary-600 tracking-tight">
        canaisdigitais<span class="text-coral">.</span>
      </a>
      <a href="/src/layouts/home.php" class="inline-flex items-center gap-1.5 font-body font-bold text-label-lg uppercase tracking-wider text-neutral-700 hover:text-primary-600 transition-colors">
        <svg class="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
        Voltar ao portal
      </a>
    </div>

    <!-- Slot central -->
    <div class="flex-1 flex items-center justify-center px-12 pb-12">
      <div class="w-full <?= $maxWidth ?>">
        <?= $content ?>
      </div>
    </div>

    <!-- Footer -->
    <div class="flex items-center justify-between px-12 py-5 font-body text-body-sm text-neutral-500">
      <div class="inline-flex items-center gap-2 font-body font-bold text-label-sm uppercase tracking-wider">
        <span class="font-normal">Uma publicação</span>
        <span class="font-display text-title-sm">Informa Markets</span>
      </div>
      <div class="flex items-center gap-5">
        <a href="#" class="hover:text-primary-600 transition-colors">Termos</a>
        <a href="#" class="hover:text-primary-600 transition-colors">Privacidade</a>
        <a href="#" class="hover:text-primary-600 transition-colors">Ajuda</a>
      </div>
    </div>
  </div>

  <!-- Coluna direita: proof panel -->
  <?php if (!$hideProof): ?>
    <?php get_template_part('components/_partials/proof-panel', null, ['mode' => $mode]); ?>
  <?php endif; ?>

</div>
