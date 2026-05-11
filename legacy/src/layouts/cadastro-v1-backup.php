<?php
/**
 * Layout: Cadastro (Full Page) — v2.0
 * Figma origem: handoff bundle claude.ai/design (XPNP-UV2HoZVzPlYIw44QA)
 *
 * Single-page signup com 4 campos essenciais (nome, email, telefone, senha)
 * + LGPD + opt-in marketing. Substitui visualmente o fluxo cadastro-bloco-1/2.
 *
 * Split 2 colunas (proof panel à direita, modo 'signup').
 */

require_once __DIR__ . '/_session.php';

ob_start();
?>

<div class="flex flex-col gap-7">

  <!-- Cabeçalho -->
  <div class="flex flex-col gap-3">
    <span class="inline-flex w-fit items-center rounded-xs bg-coral text-white px-2 py-1 font-body font-bold text-label-sm uppercase tracking-wider">
      Novo por aqui
    </span>
    <h1 class="font-display font-bold text-display-sm leading-[1.1] tracking-tight text-primary-600">
      Crie sua conta em 40 segundos<span class="text-coral">.</span>
    </h1>
    <p class="font-body text-body-lg text-neutral-900">
      Apenas o essencial agora. Você completa seu perfil no seu ritmo.
    </p>
  </div>

  <!-- Social signup -->
  <div class="flex flex-col gap-2">
    <a href="/src/layouts/onboarding.php?user=logged"
       class="inline-flex items-center justify-center gap-3 h-12 rounded-full bg-[#0A66C2] hover:bg-[#084b8f] text-white font-body font-bold text-body-lg transition-colors">
      <svg class="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
      Continuar com LinkedIn
    </a>
    <a href="/src/layouts/onboarding.php?user=logged"
       class="inline-flex items-center justify-center gap-3 h-12 rounded-full bg-white text-neutral-950 border-[1.5px] border-neutral-100 hover:bg-neutral-50 font-body font-bold text-body-lg transition-colors">
      <svg class="size-5" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
      Continuar com Google
    </a>
    <p class="text-center font-body text-label-md text-neutral-500 mt-1">
      Usamos seu perfil social apenas para preencher Nome, Empresa e Cargo. <strong class="font-semibold text-neutral-700">Não publicamos nada.</strong>
    </p>
  </div>

  <!-- Divider -->
  <div class="flex items-center gap-3">
    <span class="flex-1 h-px bg-neutral-50"></span>
    <span class="font-body font-semibold text-label-md uppercase tracking-wider text-neutral-500">ou com e-mail</span>
    <span class="flex-1 h-px bg-neutral-50"></span>
  </div>

  <!-- Form -->
  <form action="/src/layouts/confirmacao-email.php" method="get" class="flex flex-col gap-3.5" novalidate>

    <!-- Nome -->
    <label class="flex flex-col items-start w-full">
      <div class="flex gap-0.5 items-center pb-1 px-1 w-full">
        <span class="font-body font-semibold text-label-lg text-neutral-950">Nome completo</span>
        <span class="font-body font-semibold text-label-lg text-coral">*</span>
      </div>
      <div class="flex items-center gap-2.5 px-3.5 h-12 w-full bg-white rounded-sm border-[1.5px] border-neutral-100 focus-within:border-secondary-950 transition-colors">
        <svg class="size-5 text-neutral-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
        <input type="text" name="nome" autocomplete="name"
               placeholder="Como gostaria de ser chamado(a)"
               class="flex-1 bg-transparent font-body text-body-lg text-primary-600 placeholder:text-neutral-500 focus:outline-none">
      </div>
    </label>

    <!-- E-mail -->
    <label class="flex flex-col items-start w-full">
      <div class="flex gap-0.5 items-center pb-1 px-1 w-full">
        <span class="font-body font-semibold text-label-lg text-neutral-950">E-mail corporativo</span>
        <span class="font-body font-semibold text-label-lg text-coral">*</span>
      </div>
      <div class="flex items-center gap-2.5 px-3.5 h-12 w-full bg-white rounded-sm border-[1.5px] border-neutral-100 focus-within:border-secondary-950 transition-colors">
        <svg class="size-5 text-neutral-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
        <input type="email" name="email" autocomplete="email"
               placeholder="voce@empresa.com"
               class="flex-1 bg-transparent font-body text-body-lg text-primary-600 placeholder:text-neutral-500 focus:outline-none">
      </div>
    </label>

    <!-- Telefone -->
    <label class="flex flex-col items-start w-full">
      <div class="flex gap-0.5 items-center pb-1 px-1 w-full">
        <span class="font-body font-semibold text-label-lg text-neutral-950">Telefone</span>
        <span class="font-body font-semibold text-label-lg text-coral">*</span>
      </div>
      <div class="flex items-center gap-2.5 px-3.5 h-12 w-full bg-white rounded-sm border-[1.5px] border-neutral-100 focus-within:border-secondary-950 transition-colors">
        <svg class="size-5 text-neutral-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.28-.28.67-.36 1.02-.25 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
        <input type="tel" name="telefone" autocomplete="tel" data-mask="phone"
               placeholder="+55 (11) 98765-4321"
               class="flex-1 bg-transparent font-body text-body-lg text-primary-600 placeholder:text-neutral-500 focus:outline-none">
      </div>
    </label>

    <!-- Senha com strength -->
    <div class="flex flex-col gap-2">
      <label class="flex flex-col items-start w-full">
        <div class="flex gap-0.5 items-center pb-1 px-1 w-full">
          <span class="font-body font-semibold text-label-lg text-neutral-950">Senha</span>
          <span class="font-body font-semibold text-label-lg text-coral">*</span>
        </div>
        <div class="flex items-center gap-2.5 px-3.5 h-12 w-full bg-white rounded-sm border-[1.5px] border-neutral-100 focus-within:border-secondary-950 transition-colors">
          <svg class="size-5 text-neutral-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm3 11c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
          </svg>
          <input type="password" name="senha" id="signup-senha" autocomplete="new-password"
                 placeholder="Mín. 8 caracteres, com letras e números"
                 class="flex-1 bg-transparent font-body text-body-lg text-primary-600 placeholder:text-neutral-500 focus:outline-none">
          <button type="button" data-login-action="toggle-password" aria-label="Mostrar senha"
                  class="inline-flex items-center justify-center size-7 text-neutral-500 hover:text-primary-600 transition-colors">
            <svg class="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
            </svg>
          </button>
        </div>
      </label>
      <?php get_template_part('components/_partials/password-strength', null, [
        'level'   => 'empty',
        'inputId' => 'signup-senha',
      ]); ?>
    </div>

    <!-- LGPD + marketing opt-in -->
    <div class="flex flex-col gap-3 mt-3 p-4 rounded-lg bg-neutral-50/60">

      <label class="flex items-start gap-3 cursor-pointer group">
        <input type="checkbox" name="termos" required class="sr-only">
        <span class="inline-flex items-center justify-center size-[18px] rounded-xs border-[1.5px] border-neutral-300 mt-0.5 shrink-0 transition-colors group-has-[:checked]:bg-primary-600 group-has-[:checked]:border-primary-600">
          <svg class="size-3 text-white opacity-0 group-has-[:checked]:opacity-100" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
        </span>
        <span class="flex-1 font-body text-body-md text-neutral-900">
          Li e aceito os <a href="#" class="font-bold text-primary-600 underline">Termos de Uso</a> e a <a href="#" class="font-bold text-primary-600 underline">Política de Privacidade</a>.
          <span class="text-coral font-semibold">*</span>
        </span>
      </label>

      <label class="flex items-start gap-3 cursor-pointer group">
        <input type="checkbox" name="marketing" checked class="sr-only">
        <span class="inline-flex items-center justify-center size-[18px] rounded-xs border-[1.5px] border-neutral-300 mt-0.5 shrink-0 transition-colors group-has-[:checked]:bg-primary-600 group-has-[:checked]:border-primary-600">
          <svg class="size-3 text-white opacity-0 group-has-[:checked]:opacity-100" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
        </span>
        <span class="flex-1 font-body text-body-md text-neutral-900">
          Quero receber newsletters, convites para feiras e comunicações de parceiros.
          <span class="text-neutral-500">(opt-in opcional, cancele a qualquer hora)</span>
        </span>
      </label>
    </div>

    <!-- CTA -->
    <button type="submit"
            class="inline-flex items-center justify-center gap-2 w-full h-12 rounded-full bg-primary-600 hover:bg-secondary-950 text-white font-body font-bold text-body-lg transition-colors mt-3">
      Criar minha conta
      <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M5 12h14M13 5l7 7-7 7"/>
      </svg>
    </button>
  </form>

  <!-- Login link -->
  <div class="pt-5 border-t border-neutral-50 font-body text-body-md text-neutral-900">
    Já tem conta?
    <a href="/src/layouts/login.php" class="font-bold text-primary-600 underline hover:no-underline">Fazer login</a>.
  </div>
</div>

<?php
$content = ob_get_clean();
get_template_part('components/_partials/auth-shell', null, [
  'content' => $content,
  'mode'    => 'signup',
]);
?>

<script type="module" src="/src/assets/js/interactions.js"></script>
