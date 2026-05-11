<?php
/**
 * Partial: Proof Panel Minimal — coluna direita das telas de Login/Cadastro v3
 * Figma: 6271:20270 (variantes: login / signup-1 / signup-2 / signup-3)
 *
 * Painel editorial minimalista: gradient navy → ultramarine, headline em
 * Aleo display-md com palavra-chave em secondary-500, subtítulo em body-lg.
 *
 * USO:
 *   get_template_part('components/_partials/proof-panel-minimal', null, [
 *     'variant' => 'login',  // 'login' | 'signup-1' | 'signup-2' | 'signup-3'
 *   ]);
 *
 * Tokens: color-primary-600, color-secondary-500, color-secondary-950,
 *         font-display, text-display-md, text-body-lg, animate-fade-up
 */

$variant = $args['variant'] ?? 'login';

$variants = [
  'login' => [
    'pre'   => 'Inteligência editorial para quem ',
    'mark'  => 'move',
    'post'  => ' indústrias.',
    'sub'   => 'Do agronegócio à saúde, da logística ao varejo — acesse todos os onze portais editoriais da Informa Markets com o mesmo login.',
  ],
  'signup-1' => [
    'pre'   => 'Criar uma conta é ',
    'mark'  => 'gratuito',
    'post'  => ' — e continua sendo.',
    'sub'   => 'Sem assinatura, sem cartão de crédito. Seu acesso aos materiais exclusivos não tem custo algum, agora nem depois.',
  ],
  'signup-2' => [
    'pre'   => 'Conteúdo selecionado para o ',
    'mark'  => 'seu setor',
    'post'  => ', não para todo mundo.',
    'sub'   => 'Com base no seu perfil e histórico de leitura, o portal entrega os artigos, dados e tendências que realmente importam para a sua área.',
  ],
  'signup-3' => [
    'pre'   => 'Baixe qualquer ',
    'mark'  => 'material exclusivo',
    'post'  => ' sem preencher formulário.',
    'sub'   => 'Whitepapers, e-books e relatórios exclusivos com um clique.',
  ],
  'welcome' => [
    'pre'   => 'Bem-vindo aos ',
    'mark'  => 'Canais Digitais',
    'post'  => '.',
    'sub'   => 'Sua conta está ativa em todos os 11 portais editoriais da Informa Markets com o mesmo login.',
  ],
];

$v = $variants[$variant] ?? $variants['login'];
?>
<aside class="relative flex-1 flex flex-col items-start justify-center min-h-screen overflow-hidden p-20 text-white">

  <!-- Background layers (decorativos) -->
  <div aria-hidden="true" class="absolute inset-0 pointer-events-none">
    <!-- Gradient base navy → ultramarine -->
    <div class="absolute inset-0"
         style="background-image: linear-gradient(78deg, var(--color-primary-600) 0%, var(--color-secondary-950) 75%);"></div>
    <!-- BlueScape texture (overlay 50%) -->
    <img alt="" loading="lazy"
         src="https://informa.bynder.com/m/2f02df42ea5f4b58/original/Informa_Guidelines_BlueScape_Overview-png.png?_ts=1777503160376"
         class="absolute inset-0 w-full h-full object-cover opacity-50">
  </div>

  <!-- Conteúdo textual -->
  <div class="relative flex flex-col gap-6 w-full max-w-[600px]">
    <h2 class="font-display text-display-md tracking-tight animate-fade-up" style="animation-delay: 80ms;">
      <?= htmlspecialchars($v['pre']) ?><span class="font-bold text-secondary-500"><?= htmlspecialchars($v['mark']) ?></span><?= htmlspecialchars($v['post']) ?>
    </h2>
    <p class="font-body text-body-lg text-white/85 animate-fade-up" style="animation-delay: 180ms;">
      <?= htmlspecialchars($v['sub']) ?>
    </p>
  </div>
</aside>
