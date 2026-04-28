<?php
/**
 * Layout: Recupera Senha (Tela A — Solicitar link)
 * Figma: — (sem nodeId; derivado de FEATURE-cadastro.md §6.6)
 *
 * Tela para solicitar link de redefinição de senha. Pós-envio, resposta
 * genérica por segurança — nunca confirma se o e-mail existe.
 *
 * Tagueamento (§8):
 *   - data-analytics-event="recuperacao_senha_iniciada" (submit)
 */

function render_recupera_senha(string $state = 'default'): void {
  // aceita tanto 'submitted' (galeria) quanto 'sent' (query param)
  $isSent = in_array($state, ['submitted', 'sent'], true);
  $emailValue = $isSent ? 'maria.silva@empresa.com.br' : '';
?>
  <div class="w-full max-w-[480px] flex flex-col gap-8" data-recupera-state="<?= $state ?>">

    <!-- Voltar -->
    <div>
      <a href="/src/layouts/login-modal.php" class="inline-flex items-center gap-1.5 font-body font-semibold text-label-lg text-primary-600 hover:text-secondary-950 transition-colors">
        <svg class="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
        Voltar
      </a>
    </div>

    <!-- Icon -->
    <div class="inline-flex items-center justify-center size-16 rounded-full bg-[#DBEAFE]">
      <svg class="size-8 text-primary-600" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2z"/></svg>
    </div>

    <!-- Header -->
    <header class="flex flex-col gap-2">
      <h1 class="font-display text-headline-md text-neutral-950">Esqueceu a senha?</h1>
      <p class="font-body text-body-lg text-neutral-700">
        Informe seu e-mail e enviaremos um link para criar uma nova senha.
      </p>
    </header>

    <?php if ($isSent): ?>
      <!-- Mensagem genérica pós-envio -->
      <div role="status" class="flex items-start gap-3 rounded-lg border-l-4 border-[#16A34A] bg-[#F0FDF4] p-4">
        <svg class="size-5 text-[#16A34A] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
        <p class="flex-1 font-body text-body-md text-neutral-950">
          Se este e-mail estiver cadastrado, você receberá um link em instantes.
        </p>
      </div>
      <a href="/src/layouts/login-modal.php" class="inline-flex items-center justify-center w-full h-12 rounded-full bg-primary-600 hover:bg-secondary-950 transition-colors font-body font-bold text-body-lg text-white">
        Voltar para o login
      </a>
    <?php else: ?>
      <form class="flex flex-col gap-6" novalidate <?= $state === 'default' ? 'action="/src/layouts/recupera-senha.php" method="get"' : '' ?> data-analytics-event="recuperacao_senha_iniciada">
        <input type="hidden" name="state" value="sent">
        <label class="flex flex-col items-start w-full">
          <div class="flex gap-0.5 items-center pb-1 px-1 w-full">
            <span class="font-body font-semibold text-label-lg text-neutral-950">E-mail</span>
            <span class="font-body font-semibold text-label-lg text-neutral-950">*</span>
          </div>
          <div class="bg-white border border-neutral-100 focus-within:border-secondary-950 flex h-10 items-center rounded-sm w-full">
            <input type="email" autocomplete="email" autofocus placeholder="seu@empresa.com.br" value="<?= $emailValue ?>" class="flex-1 w-full h-full px-3 bg-transparent text-body-lg font-body text-primary-600 placeholder:text-neutral-500 focus:outline-none">
          </div>
        </label>

        <button type="submit" class="inline-flex items-center justify-center gap-2 w-full h-12 rounded-full bg-primary-600 hover:bg-secondary-950 transition-colors font-body font-bold text-body-lg text-white">
          Enviar link de recuperação
        </button>
      </form>
    <?php endif; ?>
  </div>
<?php }

$states = [
  'default'   => ['title' => 'Default',       'desc' => 'Form para digitar o e-mail.'],
  'submitted' => ['title' => 'Pós-envio',     'desc' => 'Mensagem genérica — nunca confirma se o e-mail existe (segurança).'],
];

// Preview principal controlável por ?state=sent|default
$viewState = ($_GET['state'] ?? '') === 'sent' ? 'sent' : 'default';
$allowedStates = ['default', 'sent'];
?>
<main class="bg-white min-h-screen flex flex-col">

  <header class="border-b border-neutral-100">
    <div class="max-w-screen-xl mx-auto px-4 lg:px-6 h-20 flex items-center">
      <a href="/" class="inline-flex items-center font-display font-bold text-headline-sm text-primary-600">Food Connection</a>
    </div>
  </header>

  <section class="flex-1 flex items-start justify-center py-16 px-4">
    <?php render_recupera_senha($viewState); ?>
  </section>

  <?php if (($_GET['preview'] ?? '') === 'spec'): ?>
  <section class="bg-neutral-50 border-t border-neutral-100 py-16">
    <div class="max-w-screen-xl mx-auto px-4 lg:px-6">
      <header class="mb-10 max-w-3xl">
        <p class="font-body text-label-lg uppercase tracking-wider text-neutral-500">Spec de estados</p>
        <h2 class="mt-2 font-display text-headline-md text-neutral-950">Fluxo de recuperação</h2>
        <p class="mt-3 font-body text-body-lg text-neutral-700">
          2 estados conforme
          <code class="font-mono text-label-md bg-white rounded-xs px-1 py-0.5 border border-neutral-100">FEATURE-cadastro.md §6.6</code>.
          A Tela B (redefinir) vive em <code class="font-mono text-label-md">redefine-senha.php</code>.
        </p>
      </header>

      <div class="space-y-12">
        <?php foreach ($states as $key => $meta): if ($key === 'default') continue; ?>
          <article>
            <div class="flex items-baseline gap-4 mb-4 pb-2 border-b border-neutral-100">
              <span class="font-mono text-label-sm text-neutral-500"><?= $key ?></span>
              <h3 class="font-display font-bold text-title-lg text-neutral-950"><?= $meta['title'] ?></h3>
              <p class="font-body text-body-md text-neutral-700"><?= $meta['desc'] ?></p>
            </div>
            <div class="bg-white rounded-lg border border-neutral-100 p-8 md:p-12 flex justify-center">
              <?php render_recupera_senha($key); ?>
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
