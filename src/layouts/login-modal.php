<?php
/**
 * Layout: Login Modal (fluxo)
 * Spec completo (galeria de 7 estados): src/layouts/login-modal-spec.php
 *
 * Esta versão é a página de fluxo real — simula a experiência do usuário:
 * renderiza o modal em um único estado por vez, escolhido via ?state=.
 * A barra flutuante no rodapé permite alternar estados para QA/preview.
 *
 * No estado `default` os CTAs levam a outras telas do fluxo (criar conta,
 * recuperar senha, social login, submit). Nos demais estados os CTAs
 * ficam inertes para não contaminar o cenário simulado.
 */

$viewState = $_GET['state'] ?? 'default';
$allowedStates = [
  'default',
  'loading',
  'error-cred',
  'error-unverified',
  'locked',
  'session-expired',
  'post-download',
  'linkedin-merge',
];
if (!in_array($viewState, $allowedStates, true)) {
  $viewState = 'default';
}

function render_login_modal(string $state = 'default'): void {
  $isDefault = $state === 'default';
  $subtitle = 'Acesse sua conta para baixar materiais e personalizar sua experiência.';
  $badge    = null;
  $alert    = null;
  $formDisabled = false;
  $submitDisabled = false;
  $submitLabel = 'Entrar';
  $submitLoading = false;

  switch ($state) {
    case 'loading':
      $submitLabel = 'Entrando...';
      $submitLoading = true;
      $formDisabled = true;
      break;
    case 'error-cred':
      $alert = [
        'type' => 'error',
        'text' => 'E-mail ou senha incorretos. Verifique os dados e tente novamente.',
      ];
      break;
    case 'error-unverified':
      $alert = [
        'type' => 'warning',
        'text' => 'Seu e-mail ainda não foi confirmado.',
        'link' => ['label' => 'Reenviar e-mail de confirmação', 'action' => 'resend-confirmation'],
      ];
      break;
    case 'locked':
      $alert = [
        'type' => 'error',
        'text' => 'Muitas tentativas. Tente novamente em ',
        'countdown' => '14:58',
      ];
      $formDisabled = true;
      $submitDisabled = true;
      break;
    case 'session-expired':
      $subtitle = 'Sua sessão expirou. Entre novamente para continuar.';
      $alert = [
        'type' => 'warning',
        'text' => 'Por segurança, pedimos que você faça login novamente.',
      ];
      break;
    case 'post-download':
      $badge = 'Faça login para baixar este material';
      break;
  }

  $socialHref = $isDefault ? '/src/layouts/onboarding.php' : null;
?>
  <div
    role="dialog"
    aria-modal="true"
    aria-labelledby="login-title-<?= $state ?>"
    class="relative bg-white w-full max-w-[480px] rounded-lg shadow-lg p-6 md:p-8"
    data-login-state="<?= $state ?>"
  >
    <!-- Close -->
    <div class="absolute right-3 top-3">
      <a
        href="/"
        aria-label="Fechar"
        class="inline-flex items-center justify-center h-10 w-10 rounded-full text-primary-600 hover:bg-neutral-50 transition-colors"
      >
        <svg class="size-[18px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
      </a>
    </div>

    <!-- Badge contextual (post-download) -->
    <?php if ($badge): ?>
      <div class="inline-flex items-center gap-2 rounded-full bg-secondary-50 px-3 py-1 mb-4">
        <svg class="size-4 text-secondary-950" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
        <span class="font-body text-label-md text-secondary-950"><?= $badge ?></span>
      </div>
    <?php endif; ?>

    <!-- Title + subtitle -->
    <h2 id="login-title-<?= $state ?>" class="font-display text-headline-md text-neutral-950">Entrar</h2>

    <!-- Chips de portais (Conta Informa) -->
    <?php
    $portaisCompact = ['Food Connection','Canal Energia','Aquaculture Brasil',
                       'Inovação em Pauta','Cosmetiquim','AgroPages'];
    ?>
    <div class="flex flex-wrap gap-1.5 justify-center my-3">
      <?php foreach ($portaisCompact as $p): ?>
        <span class="px-2.5 py-1 rounded-full bg-neutral-50 border border-neutral-100
                     font-body text-label-sm text-neutral-600 whitespace-nowrap"><?= $p ?></span>
      <?php endforeach; ?>
      <span class="px-2.5 py-1 rounded-full bg-secondary-50 border border-secondary-100
                   font-body text-label-sm text-secondary-950 whitespace-nowrap font-semibold">
        e mais 5
      </span>
    </div>
    <p class="font-body text-body-sm text-neutral-500 text-center mb-4">
      Uma conta. Todos os portais. É grátis.
    </p>

    <p class="mt-2 font-body text-body-lg text-neutral-700"><?= $subtitle ?></p>

    <!-- Alert inline -->
    <?php if ($alert):
      $alertStyles = $alert['type'] === 'error'
        ? 'bg-[#FEF2F2] border-[#bf0413] text-[#bf0413]'
        : 'bg-[#FFFBEB] border-[#F59E0B] text-[#92400E]';
      $alertIcon = $alert['type'] === 'error'
        ? 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12z'
        : 'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z';
      $alertRole = $alert['type'] === 'error' ? 'alert' : 'status';
    ?>
      <div role="<?= $alertRole ?>" class="mt-5 flex items-start gap-3 rounded-lg border-l-4 <?= $alertStyles ?> p-3">
        <svg class="size-5 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="<?= $alertIcon ?>"/></svg>
        <div class="flex-1 font-body text-body-md">
          <p>
            <?= $alert['text'] ?>
            <?php if (!empty($alert['countdown'])): ?>
              <span aria-live="polite" data-login-countdown class="font-bold tabular-nums"><?= $alert['countdown'] ?></span>.
            <?php endif; ?>
          </p>
          <?php if (!empty($alert['link'])): ?>
            <button type="button" data-login-action="<?= $alert['link']['action'] ?>" class="mt-1 font-bold underline hover:no-underline">
              <?= $alert['link']['label'] ?>
            </button>
          <?php endif; ?>
        </div>
      </div>
    <?php endif; ?>

    <!-- Social login -->
    <div class="mt-6 flex flex-col gap-3">
      <button type="button" <?= $socialHref ? 'onclick="window.location=\'' . $socialHref . '\'"' : '' ?> class="inline-flex items-center justify-center gap-3 w-full h-12 rounded-lg border-[1.5px] border-neutral-200 bg-white hover:bg-neutral-50 transition-colors font-body font-semibold text-body-lg text-neutral-950 disabled:opacity-50" <?= $formDisabled ? 'disabled' : '' ?>>
        <svg class="size-5" viewBox="0 0 24 24" fill="#0A66C2" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        Continuar com LinkedIn
      </button>
      <button type="button" <?= $socialHref ? 'onclick="window.location=\'' . $socialHref . '\'"' : '' ?> class="inline-flex items-center justify-center gap-3 w-full h-12 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 transition-colors font-body font-semibold text-body-lg text-neutral-950 disabled:opacity-50" <?= $formDisabled ? 'disabled' : '' ?>>
        <svg class="size-5" viewBox="0 0 48 48" aria-hidden="true">
          <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
          <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
          <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
          <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.002-.001 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
        </svg>
        Continuar com Google
      </button>
    </div>

    <!-- Divider "ou" -->
    <div class="mt-6 flex items-center gap-3">
      <div class="h-px flex-1 bg-neutral-100"></div>
      <span class="font-body text-label-md text-neutral-500">ou</span>
      <div class="h-px flex-1 bg-neutral-100"></div>
    </div>

    <!-- Form — submit no default vai para / (home) simulando login ok -->
    <form class="mt-6 flex flex-col gap-4" <?= $isDefault ? 'action="/" method="get"' : '' ?> <?= $formDisabled ? 'aria-disabled="true"' : '' ?> data-analytics-event="login_iniciado">
      <fieldset class="contents" <?= $formDisabled ? 'disabled' : '' ?>>
        <!-- E-mail -->
        <label class="flex flex-col items-start w-full">
          <div class="flex gap-0.5 items-center pb-1 px-1 w-full">
            <span class="font-body font-semibold text-label-lg text-neutral-950">E-mail</span>
            <span class="font-body font-semibold text-label-lg text-neutral-950">*</span>
          </div>
          <div class="bg-white border border-neutral-100 flex h-10 items-center rounded-sm w-full focus-within:border-secondary-950">
            <input
              id="login-email-<?= $state ?>"
              type="email"
              autocomplete="email"
              placeholder="seu@empresa.com.br"
              class="flex-1 w-full h-full px-3 bg-transparent text-body-lg font-body text-primary-600 placeholder:text-neutral-500 focus:outline-none disabled:bg-neutral-50"
            >
          </div>
        </label>

        <!-- Senha com toggle olho -->
        <label class="flex flex-col items-start w-full">
          <div class="flex gap-0.5 items-center pb-1 px-1 w-full">
            <span class="font-body font-semibold text-label-lg text-neutral-950">Senha</span>
            <span class="font-body font-semibold text-label-lg text-neutral-950">*</span>
          </div>
          <div class="bg-white border border-neutral-100 flex h-10 items-center rounded-sm w-full focus-within:border-secondary-950">
            <input
              id="login-password-<?= $state ?>"
              type="password"
              autocomplete="current-password"
              class="flex-1 w-full h-full px-3 bg-transparent text-body-lg font-body text-primary-600 placeholder:text-neutral-500 focus:outline-none disabled:bg-neutral-50"
            >
            <button
              type="button"
              aria-label="Mostrar senha"
              data-login-action="toggle-password"
              data-target="login-password-<?= $state ?>"
              class="inline-flex items-center justify-center h-full w-10 text-neutral-500 hover:text-primary-600 transition-colors"
            >
              <svg class="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
            </button>
          </div>
        </label>

        <!-- Forgot password link -->
        <div class="flex justify-end">
          <?php get_template_part('components/_partials/link-button', null, [
            'label' => 'Esqueci minha senha',
            'href'  => $isDefault ? '/src/layouts/recupera-senha.php' : '#',
            'size'  => 'sm',
          ]); ?>
        </div>

        <!-- Submit -->
        <button
          type="submit"
          <?= $submitDisabled ? 'disabled' : '' ?>
          class="mt-2 inline-flex items-center justify-center gap-2 w-full h-12 rounded-full bg-primary-600 hover:bg-secondary-950 disabled:bg-neutral-200 disabled:cursor-not-allowed transition-colors font-body font-bold text-body-lg text-white"
        >
          <?php if ($submitLoading): ?>
            <svg class="size-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" stroke-opacity=".25"/>
              <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
            </svg>
          <?php endif; ?>
          <?= $submitLabel ?>
        </button>
      </fieldset>
    </form>

    <!-- Footer: criar conta -->
    <p class="mt-6 text-center font-body text-body-md text-neutral-700">
      Não tem conta?
      <a href="<?= $isDefault ? '/src/layouts/cadastro-bloco-1.php' : '#' ?>" class="font-bold text-secondary-950 hover:underline">Criar conta</a>
    </p>
  </div>
<?php }
?>
<main class="bg-white min-h-screen">

  <?php get_template_part('components/_partials/header-desktop', null, [
    'activeCategory' => null,
  ]); ?>

  <section class="relative">
    <!-- Background simulando qualquer página por baixo -->
    <div class="bg-neutral-50 min-h-[720px] flex flex-col items-center justify-center gap-6 py-16 px-4">
      <div class="max-w-screen-xl w-full mx-auto">
        <div class="grid grid-cols-12 gap-6 opacity-40">
          <div class="col-span-8 space-y-4">
            <div class="h-10 w-2/3 bg-neutral-100 rounded-sm"></div>
            <div class="h-4 w-full bg-neutral-100 rounded-sm"></div>
            <div class="h-4 w-11/12 bg-neutral-100 rounded-sm"></div>
            <div class="h-4 w-10/12 bg-neutral-100 rounded-sm"></div>
            <div class="h-60 w-full bg-neutral-100 rounded-sm mt-6"></div>
          </div>
          <div class="col-span-4 space-y-4">
            <div class="h-60 w-full bg-neutral-100 rounded-sm"></div>
            <div class="h-40 w-full bg-neutral-100 rounded-sm"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Overlay + modal centralizado -->
    <div class="absolute inset-0 bg-primary-950/[.32] flex flex-col items-center justify-center gap-4 p-4" aria-hidden="false">
      <?php if ($viewState === 'linkedin-merge'): ?>
        <div class="w-full max-w-[480px]">
          <?php get_template_part('components/_partials/toast', null, [
            'type'    => 'success',
            'message' => 'Conta vinculada ao LinkedIn com sucesso.',
            'id'      => 'toast-linkedin-merge',
          ]); ?>
        </div>
      <?php endif; ?>
      <?php render_login_modal($viewState === 'linkedin-merge' ? 'default' : $viewState); ?>
    </div>
  </section>

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

  <?php get_template_part('components/_partials/footer-desktop', null, []); ?>

</main>
