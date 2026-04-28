<?php
/**
 * Layout: Login (Full Page) — v2.0
 * Figma origem: handoff bundle claude.ai/design (XPNP-UV2HoZVzPlYIw44QA)
 *
 * Split 2 colunas: formulário à esquerda + proof panel editorial à direita.
 * Primeiro deliverable do pacote "Perfil & Login" (2026-04-19).
 *
 * Estado anônimo do header é assumido (usuário está se autenticando).
 * Estados de erro simulados via ?error=wrong|locked|empty.
 *
 * Tokens usados:
 *   colors: primary-600, secondary-500, secondary-950, coral, mint, neutral-*, white
 *   type:   font-display / font-body / text-display-sm / text-body-lg / text-label-md/lg
 *   layout: grid split, rounded-sm (inputs), rounded-full (buttons), shadow-lg (cards)
 */

require_once __DIR__ . '/_session.php';

$errorMode = $_GET['error'] ?? 'none';
$allowedErrors = ['none', 'wrong', 'locked', 'empty'];
if (!in_array($errorMode, $allowedErrors, true)) $errorMode = 'none';

$errorMessage = match($errorMode) {
  'wrong'  => 'E-mail ou senha incorretos. Tente novamente.',
  'locked' => 'Conta bloqueada por 15 minutos após 5 tentativas inválidas. Redefina sua senha por segurança.',
  default  => null,
};
$emailDefault = $errorMode === 'locked' ? 'ana.souza@informa.com' : '';
$senhaError = $errorMode === 'empty' ? 'Informe sua senha.' : null;
$emailError = $errorMode === 'empty' ? 'Informe seu e-mail.' : null;

ob_start();
?>

<div class="flex flex-col gap-9">

  <!-- Cabeçalho -->
  <div class="flex flex-col gap-4">
    <span class="inline-flex w-fit items-center rounded-xs bg-mint text-white px-2 py-1 font-body font-bold text-label-sm uppercase tracking-wider">
      Acesso
    </span>
    <h1 class="font-display font-bold text-display-sm leading-[1.1] tracking-tight text-primary-600">
      Entre nos Canais Digitais<span class="text-coral">.</span>
    </h1>
    <p class="font-body text-body-lg text-neutral-900">
      Favoritos, biblioteca premium e histórico <br>sincronizados em todos os dispositivos.
    </p>
  </div>

  <?php if ($errorMessage): ?>
  <div role="alert" class="flex gap-2.5 items-start px-3.5 py-3 rounded-lg border border-coral/30 bg-coral/10 text-coral">
    <svg class="size-5 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
    </svg>
    <div class="font-body font-semibold text-body-md"><?= $errorMessage ?></div>
  </div>
  <?php endif; ?>

  <!-- Social login -->
  <div class="flex flex-col gap-2.5">
    <a href="/src/layouts/dashboard.php?user=logged"
       class="inline-flex items-center justify-center gap-3 h-12 rounded-full bg-[#0A66C2] hover:bg-[#084b8f] text-white font-body font-bold text-body-lg transition-colors">
      <svg class="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
      Entrar com LinkedIn
    </a>
    <a href="/src/layouts/dashboard.php?user=logged"
       class="inline-flex items-center justify-center gap-3 h-12 rounded-full bg-white text-neutral-950 border-[1.5px] border-neutral-100 hover:bg-neutral-50 font-body font-bold text-body-lg transition-colors">
      <svg class="size-5" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
      Entrar com Google
    </a>
  </div>

  <!-- Divider "ou com e-mail" -->
  <div class="flex items-center gap-3">
    <span class="flex-1 h-px bg-neutral-50"></span>
    <span class="font-body font-semibold text-label-md uppercase tracking-wider text-neutral-500">ou com e-mail</span>
    <span class="flex-1 h-px bg-neutral-50"></span>
  </div>

  <!-- Form -->
  <form action="/src/layouts/dashboard.php?user=logged" method="get" class="flex flex-col gap-4" novalidate>
    <input type="hidden" name="user" value="logged">

    <!-- E-mail -->
    <label class="flex flex-col items-start w-full">
      <div class="flex gap-0.5 items-center pb-1 px-1 w-full">
        <span class="font-body font-semibold text-label-lg <?= $emailError ? 'text-coral' : 'text-neutral-950' ?>">E-mail corporativo</span>
      </div>
      <div class="flex items-center gap-2.5 px-3.5 h-12 w-full bg-white rounded-sm border-[1.5px] <?= $emailError ? 'border-coral' : 'border-neutral-100 focus-within:border-secondary-950' ?> transition-colors">
        <svg class="size-5 text-neutral-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
        <input type="email" name="email" value="<?= $emailDefault ?>" autocomplete="email"
               placeholder="voce@empresa.com"
               class="flex-1 bg-transparent font-body text-body-lg text-primary-600 placeholder:text-neutral-500 focus:outline-none">
      </div>
      <?php if ($emailError): ?>
      <p class="mt-1.5 px-1 flex items-center gap-1.5 font-body font-semibold text-label-md text-coral">
        <svg class="size-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
        <?= $emailError ?>
      </p>
      <?php endif; ?>
    </label>

    <!-- Senha -->
    <label class="flex flex-col items-start w-full">
      <div class="flex gap-0.5 items-center pb-1 px-1 w-full">
        <span class="font-body font-semibold text-label-lg <?= $senhaError ? 'text-coral' : 'text-neutral-950' ?>">Senha</span>
      </div>
      <div class="flex items-center gap-2.5 px-3.5 h-12 w-full bg-white rounded-sm border-[1.5px] <?= $senhaError ? 'border-coral' : 'border-neutral-100 focus-within:border-secondary-950' ?> transition-colors" data-password-field>
        <svg class="size-5 text-neutral-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm3 11c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
        </svg>
        <input type="password" name="senha" id="login-senha" autocomplete="current-password"
               placeholder="Mín. 8 caracteres" value="<?= $errorMode === 'wrong' ? '********' : '' ?>"
               class="flex-1 bg-transparent font-body text-body-lg text-primary-600 placeholder:text-neutral-500 focus:outline-none">
        <button type="button" data-login-action="toggle-password" aria-label="Mostrar senha"
                class="inline-flex items-center justify-center size-7 text-neutral-500 hover:text-primary-600 transition-colors">
          <svg class="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
          </svg>
        </button>
      </div>
      <?php if ($senhaError): ?>
      <p class="mt-1.5 px-1 flex items-center gap-1.5 font-body font-semibold text-label-md text-coral">
        <svg class="size-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
        <?= $senhaError ?>
      </p>
      <?php endif; ?>
    </label>

    <!-- Remember + forgot -->
    <div class="flex items-center justify-between flex-wrap gap-3">
      <label class="flex items-center gap-2 cursor-pointer group">
        <input type="checkbox" name="remember" checked class="sr-only">
        <span class="inline-flex items-center justify-center size-[18px] rounded-xs border-[1.5px] border-neutral-300 transition-colors group-has-[:checked]:bg-primary-600 group-has-[:checked]:border-primary-600">
          <svg class="size-3 text-white opacity-0 group-has-[:checked]:opacity-100" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
        </span>
        <span class="font-body text-body-md text-neutral-900">Manter-me conectado por 30 dias</span>
      </label>
      <a href="/src/layouts/recupera-senha.php" class="font-body font-bold text-label-md uppercase tracking-wider text-secondary-950 hover:underline">
        Esqueci a senha
      </a>
    </div>

    <!-- CTA -->
    <button type="submit"
            class="inline-flex items-center justify-center gap-2 w-full h-12 rounded-full bg-primary-600 hover:bg-secondary-950 text-white font-body font-bold text-body-lg transition-colors mt-2">
      Entrar
      <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M5 12h14M13 5l7 7-7 7"/>
      </svg>
    </button>
  </form>

  <!-- Signup link -->
  <div class="pt-5 border-t border-neutral-50 font-body text-body-md text-neutral-900">
    Novo aqui?
    <a href="/src/layouts/cadastro.php" class="font-bold text-primary-600 underline hover:no-underline">Crie sua conta grátis</a>.
  </div>
</div>

<?php
$content = ob_get_clean();
get_template_part('components/_partials/auth-shell', null, [
  'content' => $content,
  'mode'    => 'login',
]);
?>

<!-- Navegador de estados de erro -->
<div class="fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-wrap gap-2 justify-center
            bg-white/90 backdrop-blur-sm border border-neutral-100 rounded-full px-4 py-2
            shadow-md z-50 font-body text-label-md">
  <span class="text-neutral-500 self-center pr-1">Erro:</span>
  <?php foreach (['none', 'empty', 'wrong', 'locked'] as $s): ?>
    <a href="?error=<?= $s ?>"
       class="px-3 py-1 rounded-full transition-colors <?= $s === $errorMode ? 'bg-primary-600 text-white' : 'text-neutral-600 hover:bg-neutral-50' ?>">
      <?= $s ?>
    </a>
  <?php endforeach; ?>
</div>

<script type="module" src="/src/assets/js/interactions.js"></script>
