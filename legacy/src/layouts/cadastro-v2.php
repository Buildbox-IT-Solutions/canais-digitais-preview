<?php
/**
 * Layout: Cadastro v2 — centered single-column
 * Inspirado em auth.maze.co. Sem proof panel, sem split.
 * A v1 (cadastro.php + auth-shell) permanece intacta.
 *
 * 4 campos essenciais + LGPD. Social signup como caminho principal.
 */

require_once __DIR__ . '/_session.php';
?>
<div class="min-h-screen bg-white flex flex-col">

  <!-- Header -->
  <header class="flex items-center justify-between px-6 lg:px-10 py-6">
    <a href="/src/layouts/home.php" class="font-display font-bold text-title-lg text-primary-600 tracking-tight">
      canaisdigitais<span class="text-coral">.</span>
    </a>
    <a href="/src/layouts/home.php"
       class="inline-flex items-center gap-1.5 font-body font-bold text-label-lg text-neutral-500 hover:text-primary-600 transition-colors">
      <svg class="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
      Voltar
    </a>
  </header>

  <!-- Content -->
  <main class="flex-1 flex items-center justify-center px-4 pb-16">
    <div class="w-full max-w-[380px]">

      <!-- Heading -->
      <div class="mb-8">
        <h1 class="font-display font-bold text-headline-md leading-tight text-primary-600">
          Crie sua conta<span class="text-coral">.</span>
        </h1>
        <p class="font-body text-body-lg text-neutral-700 mt-2">
          Leva menos de um minuto. Complete o perfil no seu ritmo.
        </p>
      </div>

      <!-- Social -->
      <div class="flex flex-col gap-2.5 mb-3">
        <a href="/src/layouts/onboarding.php?user=logged"
           class="inline-flex items-center justify-center gap-3 h-11 rounded-full bg-[#0A66C2] hover:bg-[#084b8f] text-white font-body font-bold text-label-lg transition-colors">
          <svg class="size-[18px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          Continuar com LinkedIn
        </a>
        <a href="/src/layouts/onboarding.php?user=logged"
           class="inline-flex items-center justify-center gap-3 h-11 rounded-full border-[1.5px] border-neutral-100 text-neutral-950 hover:bg-neutral-50 font-body font-bold text-label-lg transition-colors">
          <svg class="size-[18px]" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continuar com Google
        </a>
      </div>

      <p class="text-center font-body text-label-sm text-neutral-400 mb-6">
        Usamos o perfil social só para preencher nome e empresa. Não publicamos nada.
      </p>

      <!-- Divider -->
      <div class="flex items-center gap-3 mb-6">
        <span class="flex-1 h-px bg-neutral-100"></span>
        <span class="font-body font-semibold text-label-sm uppercase tracking-wider text-neutral-400">ou com e-mail</span>
        <span class="flex-1 h-px bg-neutral-100"></span>
      </div>

      <!-- Form -->
      <form action="/src/layouts/confirmacao-email.php" method="get" class="flex flex-col gap-4" novalidate>

        <div>
          <label for="v2s-nome" class="block font-body font-semibold text-label-lg text-neutral-950 pb-1.5">
            Nome completo <span class="text-coral">*</span>
          </label>
          <input id="v2s-nome" type="text" name="nome" autocomplete="name"
                 placeholder="Como gostaria de ser chamado(a)"
                 class="w-full h-11 px-3.5 rounded-sm border-[1.5px] border-neutral-100 focus:border-secondary-950 bg-white font-body text-body-lg text-primary-600 placeholder:text-neutral-400 outline-none transition-colors">
        </div>

        <div>
          <label for="v2s-email" class="block font-body font-semibold text-label-lg text-neutral-950 pb-1.5">
            E-mail corporativo <span class="text-coral">*</span>
          </label>
          <input id="v2s-email" type="email" name="email" autocomplete="email"
                 placeholder="voce@empresa.com"
                 class="w-full h-11 px-3.5 rounded-sm border-[1.5px] border-neutral-100 focus:border-secondary-950 bg-white font-body text-body-lg text-primary-600 placeholder:text-neutral-400 outline-none transition-colors">
        </div>

        <div>
          <label for="v2s-tel" class="block font-body font-semibold text-label-lg text-neutral-950 pb-1.5">
            Telefone <span class="text-coral">*</span>
          </label>
          <input id="v2s-tel" type="tel" name="telefone" autocomplete="tel" data-mask="phone"
                 placeholder="+55 (11) 98765-4321"
                 class="w-full h-11 px-3.5 rounded-sm border-[1.5px] border-neutral-100 focus:border-secondary-950 bg-white font-body text-body-lg text-primary-600 placeholder:text-neutral-400 outline-none transition-colors">
        </div>

        <div>
          <label for="v2s-senha" class="block font-body font-semibold text-label-lg text-neutral-950 pb-1.5">
            Senha <span class="text-coral">*</span>
          </label>
          <div class="relative">
            <input id="v2s-senha" type="password" name="senha" autocomplete="new-password"
                   placeholder="Mín. 8 caracteres"
                   class="w-full h-11 px-3.5 pr-11 rounded-sm border-[1.5px] border-neutral-100 focus:border-secondary-950 bg-white font-body text-body-lg text-primary-600 placeholder:text-neutral-400 outline-none transition-colors">
            <button type="button" data-login-action="toggle-password" aria-label="Mostrar senha"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-primary-600 transition-colors">
              <svg class="size-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
            </button>
          </div>
          <div class="mt-2">
            <?php get_template_part('components/_partials/password-strength', null, [
              'level'   => 'empty',
              'inputId' => 'v2s-senha',
            ]); ?>
          </div>
        </div>

        <!-- LGPD -->
        <div class="flex flex-col gap-3 mt-2">
          <label class="flex items-start gap-2.5 cursor-pointer group">
            <input type="checkbox" name="termos" required class="sr-only">
            <span class="inline-flex items-center justify-center size-[18px] rounded-xs border-[1.5px] border-neutral-200 mt-0.5 shrink-0 transition-colors group-has-[:checked]:bg-primary-600 group-has-[:checked]:border-primary-600">
              <svg class="size-3 text-white opacity-0 group-has-[:checked]:opacity-100" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            </span>
            <span class="font-body text-body-sm text-neutral-700">
              Li e aceito os <a href="#" class="font-bold text-primary-600 underline">Termos de Uso</a> e a <a href="#" class="font-bold text-primary-600 underline">Política de Privacidade</a>. <span class="text-coral font-semibold">*</span>
            </span>
          </label>

          <label class="flex items-start gap-2.5 cursor-pointer group">
            <input type="checkbox" name="marketing" checked class="sr-only">
            <span class="inline-flex items-center justify-center size-[18px] rounded-xs border-[1.5px] border-neutral-200 mt-0.5 shrink-0 transition-colors group-has-[:checked]:bg-primary-600 group-has-[:checked]:border-primary-600">
              <svg class="size-3 text-white opacity-0 group-has-[:checked]:opacity-100" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            </span>
            <span class="font-body text-body-sm text-neutral-700">
              Receber newsletters e convites para feiras. <span class="text-neutral-400">(opcional)</span>
            </span>
          </label>
        </div>

        <button type="submit"
                class="w-full h-11 rounded-full bg-primary-600 hover:bg-secondary-950 text-white font-body font-bold text-label-lg transition-colors mt-3">
          Criar minha conta
        </button>
      </form>

      <!-- Login link -->
      <p class="mt-8 text-center font-body text-body-md text-neutral-500">
        Já tem conta? <a href="/src/layouts/login-v2.php" class="font-bold text-primary-600 hover:underline">Entrar</a>
      </p>

    </div>
  </main>

  <!-- Footer -->
  <footer class="flex items-center justify-center gap-6 px-6 py-5 font-body text-label-sm text-neutral-400">
    <span>Uma publicação <span class="font-display font-bold text-title-sm text-neutral-500">Informa Markets</span></span>
    <span aria-hidden="true">&middot;</span>
    <a href="#" class="hover:text-primary-600 transition-colors">Termos</a>
    <a href="#" class="hover:text-primary-600 transition-colors">Privacidade</a>
  </footer>
</div>

<script type="module" src="/src/assets/js/interactions.js"></script>
