<?php
/**
 * Layout: Login (Full Page) — v3.0
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=6268-18394
 * NodeId: 6268:18394 (1440×900)
 *
 * Split 2 colunas com proporção 560 (esquerda) + flex-1 (direita).
 * Esquerda: nav (Voltar) → conteúdo central (heading, social, divider, form, forgot, CTA) → footer (account).
 * Direita: proof-panel-minimal (variante 'login').
 *
 * Estados de erro via ?error=empty|wrong|not-found|locked.
 *
 * Tokens usados:
 *   colors: primary-600, secondary-950, neutral-100/500/700/900/950, red-600, white
 *   type:   font-display, font-body, text-headline-md/body-lg/body-md/label-lg/label-md
 *   layout: rounded-sm (inputs), rounded-full (buttons)
 *   anim:   animate-fade-up-sm
 *
 * Partials usados: social-button, proof-panel-minimal
 */

require_once __DIR__ . '/_session.php';

$errorMode = $_GET['error'] ?? 'none';
$allowedErrors = ['none', 'empty', 'wrong', 'not-found', 'locked'];
if (!in_array($errorMode, $allowedErrors, true)) $errorMode = 'none';

$emailDefault = match($errorMode) {
  'wrong'      => 'mariana.albuquerque@empresa.com.br',
  'locked'     => 'ana.souza@informa.com',
  'not-found'  => 'ines.pereira@empresa.com.br',
  default      => '',
};

$emailError = match($errorMode) {
  'empty'     => 'Informe seu e-mail.',
  'not-found' => 'E-mail não encontrado. Verifique ou crie uma conta.',
  default     => null,
};

$senhaError = match($errorMode) {
  'empty' => 'Informe sua senha.',
  'wrong' => 'Senha incorreta. Tente novamente.',
  default => null,
};

$globalError = match($errorMode) {
  'locked' => 'Conta bloqueada por 15 minutos após 5 tentativas inválidas. Use "Esqueci minha senha".',
  default  => null,
};
?>

<div class="flex min-h-screen items-stretch">

  <!-- ============================================================
       Split-left — formulário
       ============================================================ -->
  <section class="flex flex-col w-[560px] shrink-0 px-14 py-12 bg-white animate-fade-up-sm">

    <!-- Top: Voltar para o início -->
    <div class="w-full">
      <a href="/src/layouts/home.php"
         class="inline-flex items-center gap-2 -ml-3 px-3 py-2.5 rounded-full font-body font-bold text-label-lg text-primary-600 hover:bg-neutral-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2">
        <svg class="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
        Voltar para o início
      </a>
    </div>

    <!-- Center content -->
    <div class="flex-1 flex flex-col justify-center w-full">
      <div class="flex flex-col gap-6 w-full">

        <!-- Heading -->
        <div class="flex flex-col gap-2 w-full">
          <h1 class="font-display font-bold text-headline-md text-primary-600">Entrar</h1>
          <p class="font-body text-body-lg text-neutral-900">
            Acesse sua conta para baixar materiais exclusivos e personalizar sua experiência.
          </p>
        </div>

        <!-- Global error (locked) -->
        <?php if ($globalError): ?>
          <div role="alert" class="flex gap-2.5 items-start px-3 py-2.5 rounded-sm border border-red-600/30 bg-red-600/10 text-red-600">
            <svg class="size-5 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            <div class="font-body font-semibold text-body-md"><?= $globalError ?></div>
          </div>
        <?php endif; ?>

        <!-- Social buttons -->
        <div class="flex flex-col gap-4 w-full">
          <?php get_template_part('components/_partials/social-button', null, [
            'provider' => 'linkedin',
            'href'     => '/src/layouts/dashboard-perfil-v3.php?user=logged',
          ]); ?>
          <?php get_template_part('components/_partials/social-button', null, [
            'provider' => 'google',
            'href'     => '/src/layouts/dashboard-perfil-v3.php?user=logged',
          ]); ?>
        </div>

        <!-- Or divider -->
        <div class="flex items-center gap-3 w-full overflow-hidden">
          <span class="flex-1 h-px bg-neutral-100"></span>
          <span class="font-body text-body-md text-neutral-500">ou</span>
          <span class="flex-1 h-px bg-neutral-100"></span>
        </div>

        <!-- Form -->
        <form action="/src/layouts/dashboard-perfil-v3.php" method="get" class="flex flex-col gap-4 w-full" novalidate>
          <input type="hidden" name="user" value="logged">

          <!-- E-mail -->
          <label class="flex flex-col w-full">
            <span class="flex items-center gap-0.5 px-1 pb-1 font-body font-semibold text-label-lg <?= $emailError ? 'text-red-600' : 'text-neutral-950' ?>">
              E-mail<span aria-hidden="true">*</span>
            </span>
            <div class="flex items-center h-10 px-3 rounded-sm border bg-white transition-colors <?= $emailError ? 'border-red-600' : 'border-neutral-100 focus-within:border-secondary-950' ?>">
              <input type="email" name="email" value="<?= htmlspecialchars($emailDefault) ?>" autocomplete="email"
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

          <!-- Senha -->
          <label class="flex flex-col w-full">
            <span class="flex items-center gap-0.5 px-1 pb-1 font-body font-semibold text-label-lg <?= $senhaError ? 'text-red-600' : 'text-neutral-950' ?>">
              Senha<span aria-hidden="true">*</span>
            </span>
            <div class="flex items-center h-10 px-3 rounded-sm border bg-white transition-colors <?= $senhaError ? 'border-red-600' : 'border-neutral-100 focus-within:border-secondary-950' ?>" data-password-field>
              <input type="password" name="senha" id="login-senha" autocomplete="current-password"
                     value="<?= $errorMode === 'wrong' ? '********' : '' ?>"
                     class="flex-1 bg-transparent font-body text-body-lg text-primary-600 placeholder:text-neutral-500 focus:outline-none">
              <button type="button" data-login-action="toggle-password" aria-label="Mostrar senha"
                      class="inline-flex items-center justify-center size-7 -mr-1 text-neutral-500 hover:text-primary-600 transition-colors rounded-full">
                <svg class="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
              </button>
            </div>
            <?php if ($senhaError): ?>
              <p class="mt-1.5 px-1 flex items-center gap-1.5 font-body font-semibold text-label-md text-red-600">
                <svg class="size-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                <?= $senhaError ?>
              </p>
            <?php endif; ?>
          </label>

          <!-- Forgot password -->
          <div class="flex justify-end w-full">
            <a href="/src/layouts/recupera-senha.php" class="font-body font-bold text-body-md text-secondary-950 hover:underline">
              Esqueci minha senha
            </a>
          </div>

          <!-- Submit -->
          <button type="submit"
                  class="inline-flex items-center justify-center w-full h-12 px-6 rounded-full bg-primary-600 hover:bg-secondary-950 text-white font-body font-bold text-body-lg transition-colors mt-2">
            Entrar
          </button>
        </form>
      </div>
    </div>

    <!-- Bottom: account -->
    <div class="flex justify-center items-center gap-1 w-full font-body text-body-md">
      <span class="text-neutral-700">Não tem conta?</span>
      <a href="/src/layouts/cadastro.php?step=1" class="font-bold text-secondary-950 hover:underline">Criar conta</a>
    </div>

  </section>

  <!-- ============================================================
       Split-right — proof panel minimal
       ============================================================ -->
  <?php get_template_part('components/_partials/proof-panel-minimal', null, ['variant' => 'login']); ?>

</div>

<!-- ============================================================
     Dev navigator: estados de erro
     ============================================================ -->
<div class="fixed bottom-4 left-1/2 -translate-x-1/2 flex flex-wrap gap-1.5 justify-center
            bg-white/95 backdrop-blur-sm border border-neutral-100 rounded-full px-3 py-1.5
            shadow-md z-50 font-body text-label-md">
  <span class="text-neutral-500 self-center pr-1">Erro:</span>
  <?php foreach (['none', 'empty', 'wrong', 'not-found', 'locked'] as $s): ?>
    <a href="?error=<?= $s ?>"
       class="px-2.5 py-1 rounded-full transition-colors <?= $s === $errorMode ? 'bg-primary-600 text-white' : 'text-neutral-700 hover:bg-neutral-50' ?>">
      <?= $s ?>
    </a>
  <?php endforeach; ?>
</div>

<script type="module" src="/src/assets/js/interactions.js"></script>
