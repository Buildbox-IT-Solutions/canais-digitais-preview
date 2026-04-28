<?php
/**
 * Partial: Proof Panel — painel editorial estático para login/cadastro (col. direita)
 * Slide fixo: BIBLIOTECA (whitepapers + e-books).
 *
 * USO:
 *   <?php get_template_part('components/_partials/proof-panel', null, [
 *     'mode' => 'login',    // 'login' | 'signup'
 *   ]); ?>
 *
 * PROPS ($args):
 *   mode → 'login' (topo: "Bem-vindo de volta") | 'signup' (topo: "Ao criar sua conta, você desbloqueia")
 */

$mode = $args['mode'] ?? 'login';
$topLabel = $mode === 'signup' ? 'Ao criar sua conta, você desbloqueia' : 'Bem-vindo de volta';

$cards = [
  ['type' => 'Whitepaper', 'title' => 'Estado do varejo 2026',          'accent' => 'mint'],
  ['type' => 'Relatório',  'title' => 'ESG no B2B — pesquisa',          'accent' => 'secondary'],
  ['type' => 'Guia',       'title' => 'Embalagens inteligentes',        'accent' => 'coral'],
];

$people = ['AS', 'LP', 'MR', 'RC'];
?>
<aside class="relative overflow-hidden bg-primary-600 text-white flex flex-col min-h-screen px-14 py-12 gap-10">

  <!-- Ambient glows (decorativos) -->
  <div class="pointer-events-none absolute -left-44 -bottom-44 size-[480px] rounded-full"
       style="background: radial-gradient(circle at center, rgba(255,84,124,.30), transparent 65%); filter: blur(10px);"></div>
  <div class="pointer-events-none absolute -right-48 -top-32 size-[500px] rounded-full"
       style="background: radial-gradient(circle at center, rgba(0,120,110,.22), transparent 60%); filter: blur(6px);"></div>

  <!-- TOP: brand + Informa lockup -->
  <div class="relative z-10 flex items-center justify-between">
    <span class="font-display font-bold text-title-xl tracking-tight">
      canaisdigitais<span class="text-coral">.</span>
    </span>
    <div class="flex items-center gap-2 font-body text-label-sm uppercase tracking-wider text-white/70">
      <span>Uma publicação</span>
      <span class="font-display font-bold text-title-sm">Informa Markets</span>
    </div>
  </div>

  <!-- CENTER: slide Biblioteca -->
  <div class="relative z-10 flex-1 flex flex-col justify-center gap-8">

    <div class="font-body font-semibold text-label-md uppercase tracking-wider text-white/55">
      <?= $topLabel ?>
    </div>

    <div class="flex flex-col gap-6">
      <span class="inline-flex w-fit items-center rounded-xs bg-mint text-white px-2 py-1 font-body font-bold text-label-sm uppercase tracking-wider">
        Biblioteca
      </span>

      <h2 class="font-display font-bold text-display-sm leading-tight tracking-tight max-w-xl">
        Whitepapers e e-books sem preencher formulário de novo<span class="text-coral">.</span>
      </h2>

      <p class="font-body text-body-lg text-white/80 max-w-md">
        Baixe estudos, relatórios e guias da Informa Markets com um clique. Os materiais baixados ficam salvos no seu perfil e disponíveis mesmo offline.
      </p>

      <!-- Grid 3 cards de material -->
      <div class="grid grid-cols-3 gap-3 max-w-xl mt-2">
        <?php foreach ($cards as $i => $c):
          $stripe = match($c['accent']) {
            'mint'      => 'bg-mint',
            'secondary' => 'bg-secondary-500',
            'coral'     => 'bg-coral',
            default     => 'bg-white',
          };
          $accentText = match($c['accent']) {
            'mint'      => 'text-mint',
            'secondary' => 'text-secondary-500',
            'coral'     => 'text-coral',
            default     => 'text-white',
          };
        ?>
        <div class="flex flex-col gap-2.5 p-3.5 rounded-lg bg-white/[0.08] border border-white/10">
          <div class="h-[3px] w-7 rounded-full <?= $stripe ?>"></div>
          <div class="font-body font-bold text-label-sm uppercase tracking-wider text-white/60">
            <?= $c['type'] ?>
          </div>
          <div class="font-display font-bold text-title-sm leading-tight text-white min-h-[2.4em]">
            <?= $c['title'] ?>
          </div>
          <div class="mt-auto inline-flex items-center gap-1.5 font-body font-bold text-label-sm uppercase tracking-wider <?= $accentText ?>">
            <svg class="size-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
            Baixar
          </div>
        </div>
        <?php endforeach; ?>
      </div>
    </div>
  </div>

  <!-- BOTTOM: stack de avatars + stat -->
  <div class="relative z-10 border-t border-white/15 pt-6 flex items-center gap-5 flex-wrap">
    <div class="flex items-center">
      <?php foreach ($people as $i => $initials): ?>
      <span class="inline-flex items-center justify-center size-9 rounded-full border-2 border-primary-600 bg-gradient-to-br from-secondary-500 to-coral font-display font-bold text-label-sm text-white <?= $i === 0 ? '' : '-ml-2.5' ?>">
        <?= $initials ?>
      </span>
      <?php endforeach; ?>
    </div>
    <p class="font-body text-body-md text-white/75 flex-1 min-w-[240px]">
      <strong class="text-white font-bold">+38.000 profissionais B2B</strong> já leem os Canais Digitais logados.
    </p>
  </div>

</aside>
