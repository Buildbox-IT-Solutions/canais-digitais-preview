<?php
/**
 * Layout: Confirmação de E-mail
 * Figma: — (sem nodeId; derivado de FEATURE-cadastro.md §6.4)
 *
 * Fluxo pós-cadastro. Duas telas principais + 2 estados de erro do link:
 *
 *   Tela A — Aguardando (pós Bloco 2)
 *   Tela B — Sucesso (clique no link do e-mail)
 *   Erro   — Link expirado (> 24h)
 *   Erro   — Link já utilizado
 *
 * Token ausente na URL → redirect para recupera-senha.php (decisão do backend,
 * não é um estado visual deste layout).
 *
 * Mesma shell minimal dos Blocos de cadastro. Conteúdo centralizado com
 * ícone grande no topo + título + descrição + ações.
 *
 * Tagueamento (§8):
 *   - data-analytics-event="email_confirmado" — clique no link de confirmação
 *     (disparado no carregamento do estado `success`)
 */

/**
 * Renderiza o card em um dos 4 estados.
 *
 * @param string $state  waiting | success | expired | used
 */
function render_confirmacao_email(string $state = 'waiting'): void {
  $cfg = match($state) {
    'success' => [
      'icon'     => 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
      'iconBg'   => 'bg-[#DCFCE7]',
      'iconFg'   => 'text-[#16A34A]',
      'iconAnim' => 'animate-[pulse_1.2s_ease-out_1]',
      'title'    => 'Tudo pronto!',
      'desc'     => 'Sua conta está ativa.',
      'primary'  => ['label' => 'Completar meu perfil', 'href' => '/src/layouts/onboarding.php', 'type' => 'filled'],
      'link'     => ['label' => 'Explorar o portal agora', 'href' => '/'],
    ],
    'expired' => [
      'icon'     => 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z',
      'iconBg'   => 'bg-[#FEF3C7]',
      'iconFg'   => 'text-[#92400E]',
      'iconAnim' => '',
      'title'    => 'Link expirado',
      'desc'     => 'O link de confirmação é válido por 24 horas. Gere um novo link para ativar sua conta.',
      'primary'  => ['label' => 'Enviar novo link', 'href' => '#', 'type' => 'filled'],
      'link'     => ['label' => 'Voltar para a página inicial', 'href' => '/'],
    ],
    'link-expired' => [
      'icon'     => 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z',
      'iconBg'   => 'bg-[#FEF2F2]',
      'iconFg'   => 'text-[#bf0413]',
      'iconAnim' => '',
      'title'    => 'Seu link expirou',
      'desc'     => 'O link de confirmação é válido por 24 horas. Solicite um novo para ativar sua conta.',
      'primary'  => ['label' => 'Enviar novo link', 'href' => '?state=waiting', 'type' => 'filled'],
      'link'     => ['label' => 'Voltar para o login', 'href' => '/src/layouts/login-modal.php'],
    ],
    'used' => [
      'icon'     => 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z',
      'iconBg'   => 'bg-[#DBEAFE]',
      'iconFg'   => 'text-secondary-950',
      'iconAnim' => '',
      'title'    => 'Sua conta já está ativa',
      'desc'     => 'Este link de confirmação já foi usado. Basta fazer login para continuar.',
      'primary'  => ['label' => 'Fazer login', 'href' => '/src/layouts/login-modal.php', 'type' => 'filled'],
      'link'     => null,
    ],
    default => [
      'icon'     => 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
      'iconBg'   => 'bg-[#DBEAFE]',
      'iconFg'   => 'text-primary-600',
      'iconAnim' => '',
      'title'    => 'Confirme seu e-mail',
      'desc'     => null,
      'primary'  => ['label' => 'Reenviar e-mail', 'href' => '#', 'type' => 'outlined'],
      'link'     => null,
    ],
  };

  $primaryClasses = $cfg['primary']['type'] === 'filled'
    ? 'bg-primary-600 hover:bg-secondary-950 text-white'
    : 'bg-transparent border-[1.5px] border-primary-600 text-primary-600 hover:bg-neutral-50';
?>
  <div class="w-full max-w-[480px] flex flex-col items-center text-center gap-6" data-confirmacao-state="<?= $state ?>" <?= $state === 'success' ? 'data-analytics-event="email_confirmado"' : '' ?>>

    <!-- Icon -->
    <div class="inline-flex items-center justify-center size-16 rounded-full <?= $cfg['iconBg'] ?> <?= $cfg['iconAnim'] ?>">
      <svg class="size-8 <?= $cfg['iconFg'] ?>" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="<?= $cfg['icon'] ?>"/></svg>
    </div>

    <!-- Title + desc -->
    <div class="flex flex-col gap-2">
      <h1 class="font-display text-headline-md text-neutral-950"><?= $cfg['title'] ?></h1>
      <?php if ($state === 'waiting'): ?>
        <p class="font-body text-body-lg text-neutral-700">
          Enviamos um link para <span class="font-semibold text-neutral-950">m***@empresa.com.br</span>.
        </p>
        <p class="font-body text-body-md text-neutral-600">
          Clique no link para ativar sua conta. Não esqueça de verificar a caixa de spam.
        </p>
      <?php elseif ($cfg['desc']): ?>
        <p class="font-body text-body-lg text-neutral-700"><?= $cfg['desc'] ?></p>
      <?php endif; ?>
    </div>

    <!-- Primary CTA -->
    <div class="w-full flex flex-col items-center gap-3 mt-2">
      <a
        href="<?= $cfg['primary']['href'] ?>"
        <?= $state === 'waiting' ? 'data-confirmacao-action="resend" data-cooldown="60"' : '' ?>
        class="inline-flex items-center justify-center w-full h-12 rounded-full transition-colors font-body font-bold text-body-lg <?= $primaryClasses ?>"
      >
        <?= $cfg['primary']['label'] ?>
      </a>

      <?php if ($state === 'waiting'): ?>
        <!-- Tela A tem 2 links discretos -->
        <a href="/src/layouts/cadastro-bloco-1.php" class="font-body font-bold text-label-lg text-secondary-950 hover:underline">
          Errei o e-mail
        </a>
        <a href="/" class="font-body text-label-md text-neutral-500 hover:text-neutral-700 hover:underline">
          Verificar depois
        </a>
      <?php elseif ($cfg['link']): ?>
        <a href="<?= $cfg['link']['href'] ?>" class="font-body font-bold text-label-lg text-secondary-950 hover:underline">
          <?= $cfg['link']['label'] ?>
        </a>
      <?php endif; ?>
    </div>
  </div>
<?php }

$states = [
  'waiting'      => ['title' => 'Tela A — Aguardando',       'desc' => 'Pós-Bloco 2: usuário fecha o cadastro e vai ao inbox.'],
  'success'      => ['title' => 'Tela B — Sucesso',          'desc' => 'Usuário clicou no link; conta ativa.'],
  'link-expired' => ['title' => 'Link expirado',             'desc' => 'Link com mais de 24h — solicitar novo (Etapa 2).'],
  'expired'      => ['title' => 'Erro: link expirado',       'desc' => 'Variante legada (amarelo/warning).'],
  'used'         => ['title' => 'Erro: link já utilizado',   'desc' => 'Conta já está ativa — oferecer login.'],
];

// Estado do preview principal controlável via ?state= (suporta waiting|success|expired|used)
$viewState = $_GET['state'] ?? 'waiting';
if (!array_key_exists($viewState, $states)) $viewState = 'waiting';
$allowedStates = array_keys($states);
?>
<main class="bg-white min-h-screen flex flex-col">

  <!-- Header minimal -->
  <header class="border-b border-neutral-100">
    <div class="max-w-screen-xl mx-auto px-4 lg:px-6 h-20 flex items-center">
      <a href="/" class="inline-flex items-center font-display font-bold text-headline-sm text-primary-600">
        Food Connection
      </a>
    </div>
  </header>

  <!-- Preview principal (controlado por ?state= — default = waiting) -->
  <section class="flex-1 flex flex-col items-center py-16 px-4">
    <?php render_confirmacao_email($viewState); ?>

    <?php if ($viewState === 'waiting'): ?>
      <!-- Link de simulação — apenas para preview/testar fluxo -->
      <p class="mt-8 font-body text-label-md text-neutral-400 text-center">
        <a href="?state=success" class="underline hover:text-neutral-600">
          [Simular clique no link do e-mail]
        </a>
      </p>
    <?php endif; ?>
  </section>

  <!-- Galeria de estados (oculta; ?preview=spec) -->
  <?php if (($_GET['preview'] ?? '') === 'spec'): ?>
  <section class="bg-neutral-50 border-t border-neutral-100 py-16">
    <div class="max-w-screen-xl mx-auto px-4 lg:px-6">
      <header class="mb-10 max-w-3xl">
        <p class="font-body text-label-lg uppercase tracking-wider text-neutral-500">Spec de estados</p>
        <h2 class="mt-2 font-display text-headline-md text-neutral-950">Fluxo de confirmação</h2>
        <p class="mt-3 font-body text-body-lg text-neutral-700">
          2 telas principais (A: aguardando / B: sucesso) + 2 erros de token definidos em
          <code class="font-mono text-label-md bg-white rounded-xs px-1 py-0.5 border border-neutral-100">FEATURE-cadastro.md §6.4</code>.
          Token ausente na URL redireciona para <code class="font-mono text-label-md">recupera-senha.php</code> (sem estado visual).
        </p>
      </header>

      <div class="space-y-12">
        <?php foreach ($states as $key => $meta): ?>
          <?php if ($key === 'waiting') continue; ?>
          <article>
            <div class="flex items-baseline gap-4 mb-4 pb-2 border-b border-neutral-100">
              <span class="font-mono text-label-sm text-neutral-500"><?= $key ?></span>
              <h3 class="font-display font-bold text-title-lg text-neutral-950"><?= $meta['title'] ?></h3>
              <p class="font-body text-body-md text-neutral-700"><?= $meta['desc'] ?></p>
            </div>
            <div class="bg-white rounded-lg border border-neutral-100 p-8 md:p-12 flex justify-center">
              <?php render_confirmacao_email($key); ?>
            </div>
          </article>
        <?php endforeach; ?>
      </div>
    </div>
  </section>
  <?php endif; ?>

  <!-- Navegador de estados — remover em produção -->
  <div class="fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-wrap gap-2 justify-center
              bg-white/90 backdrop-blur-sm border border-neutral-100 rounded-full px-4 py-2
              shadow-md z-50 font-body text-label-md">
    <span class="text-neutral-400 self-center pr-1">Simular:</span>
    <?php foreach ($allowedStates as $s): ?>
      <a href="?state=<?= $s ?>"
         class="px-3 py-1 rounded-full transition-colors <?= $s === $viewState
           ? 'bg-primary-600 text-white'
           : 'text-neutral-600 hover:bg-neutral-50' ?>">
        <?= $s ?>
      </a>
    <?php endforeach; ?>
  </div>

  <!-- Footer minimal -->
  <footer class="border-t border-neutral-100 py-6">
    <div class="max-w-screen-xl mx-auto px-4 lg:px-6 flex flex-wrap items-center justify-between gap-4">
      <p class="font-body text-label-md text-neutral-500">© 2026 Informa Markets</p>
      <nav class="flex items-center gap-6">
        <a href="#" class="font-body text-label-md text-neutral-700 hover:text-primary-600">Termos de Uso</a>
        <a href="#" class="font-body text-label-md text-neutral-700 hover:text-primary-600">Política de Privacidade</a>
        <a href="#" class="font-body text-label-md text-neutral-700 hover:text-primary-600">Contato</a>
      </nav>
    </div>
  </footer>

</main>
<script type="module" src="/src/assets/js/interactions.js"></script>
