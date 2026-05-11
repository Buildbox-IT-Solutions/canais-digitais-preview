<?php
/**
 * Layout: Recupera Senha — v3.0
 * Figma: — (extensão do sistema login.php v3.0, NodeId 6268:18394)
 *
 * Tela A do fluxo de recuperação: solicitar link de redefinição.
 * Pós-envio, resposta genérica por segurança — nunca confirma se o e-mail existe.
 *
 * Estrutura: split 560 + proof-panel-minimal (variant 'login'), idêntica ao login.
 *
 * Estados via ?state=...:
 *   default → form de e-mail
 *   sent    → mensagem genérica pós-envio
 *
 * Erros via ?error=...:
 *   empty    → e-mail vazio
 *   invalido → formato inválido
 *   throttle → muitas tentativas
 *
 * Tagueamento: data-analytics-event="recuperacao_senha_iniciada" no submit.
 *
 * Tokens: primary-100/600, secondary-950, neutral-100/500/700/900/950, red-600,
 *         green-50/600, font-display, text-headline-md/body-lg/label-lg/label-md
 * Anim:   animate-fade-up-sm
 */

require_once __DIR__ . '/_session.php';

$state = $_GET['state'] ?? 'default';
if (!in_array($state, ['default', 'sent'], true)) $state = 'default';

$errorMode = $_GET['error'] ?? 'none';
if (!in_array($errorMode, ['none', 'empty', 'invalido', 'throttle'], true)) $errorMode = 'none';

$emailError = match($errorMode) {
  'empty'    => 'Informe seu e-mail.',
  'invalido' => 'Digite um e-mail válido.',
  default    => null,
};

$globalError = match($errorMode) {
  'throttle' => 'Você fez muitas tentativas. Aguarde 5 minutos antes de tentar novamente.',
  default    => null,
};

$emailDefault = match($errorMode) {
  'invalido' => 'teste@',
  'throttle' => 'maria.silva@empresa.com.br',
  default    => '',
};
?>

<div class="flex min-h-screen items-stretch">

  <!-- ============================================================
       Split-left
       ============================================================ -->
  <section class="flex flex-col w-[560px] shrink-0 px-14 py-12 bg-white animate-fade-up-sm">

    <!-- Top: Voltar para o login -->
    <div class="w-full">
      <a href="/src/layouts/login.php"
         class="inline-flex items-center gap-2 -ml-3 px-3 py-2.5 rounded-full font-body font-bold text-label-lg text-primary-600 hover:bg-neutral-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2">
        <svg class="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
        Voltar para o login
      </a>
    </div>

    <!-- Center content -->
    <div class="flex-1 flex flex-col justify-center w-full">
      <div class="flex flex-col gap-6 w-full">

        <?php if ($state === 'sent'): ?>
          <!-- ============== Estado: SENT ============== -->
          <div class="inline-flex items-center justify-center size-12 rounded-full bg-green-50 text-green-600">
            <svg class="size-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </div>

          <div class="flex flex-col gap-2 w-full">
            <h1 class="font-display font-bold text-headline-md text-primary-600">Confira sua caixa de entrada</h1>
            <p class="font-body text-body-lg text-neutral-900">
              Se este e-mail estiver cadastrado, você receberá um link em instantes para criar uma nova senha.
            </p>
            <p class="font-body text-body-md text-neutral-700">
              Não esqueça de verificar a pasta de spam. O link expira em 1 hora.
            </p>
          </div>

          <div class="flex flex-col gap-3 w-full mt-2">
            <a href="/src/layouts/login.php"
               class="inline-flex items-center justify-center w-full h-12 px-6 rounded-full bg-primary-600 hover:bg-secondary-950 text-white font-body font-bold text-body-lg transition-colors">
              Voltar para o login
            </a>
            <a href="?state=default"
               class="self-center font-body font-bold text-body-md text-secondary-950 hover:underline">
              Tentar com outro e-mail
            </a>
          </div>

        <?php else: ?>
          <!-- ============== Estado: DEFAULT (form) ============== -->
          <div class="flex flex-col gap-2 w-full">
            <h1 class="font-display font-bold text-headline-md text-primary-600">Esqueceu a senha?</h1>
            <p class="font-body text-body-lg text-neutral-900">
              Informe seu e-mail e enviaremos um link para criar uma nova senha.
            </p>
          </div>

          <?php if ($globalError): ?>
            <div role="alert" class="flex gap-2.5 items-start px-3 py-2.5 rounded-sm border border-red-600/30 bg-red-600/10 text-red-600">
              <svg class="size-5 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
              <div class="font-body font-semibold text-body-md"><?= $globalError ?></div>
            </div>
          <?php endif; ?>

          <form action="/src/layouts/recupera-senha.php" method="get" class="flex flex-col gap-4 w-full" novalidate
                data-analytics-event="recuperacao_senha_iniciada">
            <input type="hidden" name="state" value="sent">

            <label class="flex flex-col w-full">
              <span class="flex items-center gap-0.5 px-1 pb-1 font-body font-semibold text-label-lg <?= $emailError ? 'text-red-600' : 'text-neutral-950' ?>">
                E-mail<span aria-hidden="true">*</span>
              </span>
              <div class="flex items-center h-10 px-3 rounded-sm border bg-white transition-colors <?= $emailError ? 'border-red-600' : 'border-neutral-100 focus-within:border-secondary-950' ?>">
                <input type="email" name="email" required autofocus autocomplete="email"
                       value="<?= htmlspecialchars($emailDefault) ?>"
                       placeholder="seu@empresa.com.br"
                       class="flex-1 bg-transparent font-body text-body-lg text-primary-600 placeholder:text-neutral-500 focus:outline-none">
              </div>
              <?php if ($emailError): ?>
                <p class="mt-1.5 px-1 flex items-center gap-1.5 font-body font-semibold text-label-md text-red-600">
                  <svg class="size-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                  <?= $emailError ?>
                </p>
              <?php endif; ?>
            </label>

            <button type="submit"
                    class="inline-flex items-center justify-center w-full h-12 px-6 rounded-full bg-primary-600 hover:bg-secondary-950 text-white font-body font-bold text-body-lg transition-colors mt-2">
              Enviar link de recuperação
            </button>
          </form>
        <?php endif; ?>
      </div>
    </div>

    <!-- Bottom: account -->
    <div class="flex justify-center items-center gap-1 w-full font-body text-body-md">
      <span class="text-neutral-700">Não tem conta?</span>
      <a href="/src/layouts/cadastro.php?step=1" class="font-bold text-secondary-950 hover:underline">Criar conta</a>
    </div>

  </section>

  <!-- ============================================================
       Split-right — proof panel
       ============================================================ -->
  <?php get_template_part('components/_partials/proof-panel-minimal', null, ['variant' => 'login']); ?>

</div>

<!-- ============================================================
     Dev navigator
     ============================================================ -->
<div class="fixed bottom-4 left-1/2 -translate-x-1/2 flex flex-col gap-1.5 items-center
            bg-white/95 backdrop-blur-sm border border-neutral-100 rounded-2xl px-4 py-2
            shadow-md z-50 font-body text-label-md">
  <div class="flex flex-wrap gap-1.5 justify-center">
    <span class="text-neutral-500 self-center pr-1">Estado:</span>
    <?php foreach (['default', 'sent'] as $s): ?>
      <a href="?state=<?= $s ?>"
         class="px-2.5 py-1 rounded-full transition-colors <?= $s === $state ? 'bg-primary-600 text-white' : 'text-neutral-700 hover:bg-neutral-50' ?>">
        <?= $s ?>
      </a>
    <?php endforeach; ?>
  </div>
  <?php if ($state === 'default'): ?>
  <div class="flex flex-wrap gap-1.5 justify-center">
    <span class="text-neutral-500 self-center pr-1">Erro:</span>
    <?php foreach (['none', 'empty', 'invalido', 'throttle'] as $s): ?>
      <a href="?error=<?= $s ?>"
         class="px-2.5 py-1 rounded-full transition-colors <?= $s === $errorMode ? 'bg-primary-600 text-white' : 'text-neutral-700 hover:bg-neutral-50' ?>">
        <?= $s ?>
      </a>
    <?php endforeach; ?>
  </div>
  <?php endif; ?>
</div>

<script type="module" src="/src/assets/js/interactions.js"></script>
