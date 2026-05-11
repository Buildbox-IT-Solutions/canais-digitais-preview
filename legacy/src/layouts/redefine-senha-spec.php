<?php
/**
 * Layout: Redefine Senha (Tela B — via link do e-mail)
 * Figma: — (sem nodeId; derivado de FEATURE-cadastro.md §6.6)
 *
 * URL: /redefine-senha?token=[token]
 *
 * 4 estados conforme §6.6:
 *   valid   → formulário de nova senha
 *   expired → "Link expirado" + botão para solicitar novo link
 *   used    → "Este link já foi usado" + botão "Fazer login"
 *   loading → submit em andamento
 *
 * Token ausente na URL → redirect server-side para recupera-senha.php.
 *
 * Pós-redefinição com sucesso: toast "Senha redefinida com sucesso." +
 * redirect para login (responsabilidade do backend + auth-modal.js / toast.js).
 */

function render_redefine_senha(string $state = 'valid'): void {
  $pwValue = '';
  $pwLevel = 'empty';
  $confirmValue = '';
  $submitLabel = 'Redefinir senha';
  $submitLoading = false;
  $formDisabled = false;

  if ($state === 'loading') {
    $pwValue = 'minhaSenhaNova2026!';
    $pwLevel = 'strong';
    $confirmValue = 'minhaSenhaNova2026!';
    $submitLabel = 'Redefinindo...';
    $submitLoading = true;
    $formDisabled = true;
  }

  // Estados terminais (expired / used) mostram bloco de erro em vez do form
  $isTerminal = in_array($state, ['expired', 'used'], true);
  $terminal = null;
  if ($state === 'expired') {
    $terminal = [
      'icon'  => 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z',
      'iconBg'=> 'bg-[#FEF3C7]',
      'iconFg'=> 'text-[#92400E]',
      'title' => 'Link expirado',
      'desc'  => 'O link de redefinição é válido por 1 hora. Solicite um novo para continuar.',
      'cta'   => ['label' => 'Solicitar novo link', 'href' => '/src/layouts/recupera-senha.php'],
    ];
  } elseif ($state === 'used') {
    $terminal = [
      'icon'  => 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
      'iconBg'=> 'bg-[#DCFCE7]',
      'iconFg'=> 'text-[#16A34A]',
      'title' => 'Este link já foi usado',
      'desc'  => 'Sua senha já foi redefinida. Faça login para entrar na sua conta.',
      'cta'   => ['label' => 'Fazer login', 'href' => '/src/layouts/login-modal.php'],
    ];
  }

  $pwId = 'redef-pw-' . $state;
  $confirmId = 'redef-confirm-' . $state;
?>
  <div class="w-full max-w-[480px] flex flex-col gap-8 <?= $isTerminal ? 'items-center text-center' : '' ?>" data-redefine-state="<?= $state ?>">

    <!-- Icon -->
    <div class="inline-flex items-center justify-center size-16 rounded-full <?= $terminal ? $terminal['iconBg'] : 'bg-[#DBEAFE]' ?>">
      <svg class="size-8 <?= $terminal ? $terminal['iconFg'] : 'text-primary-600' ?>" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="<?= $terminal ? $terminal['icon'] : 'M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.48 0 2.71 1.03 3.02 2.41l-1.95.8C13.8 8.43 12.95 8 12 8c-.95 0-1.8.43-2.17 1.21l-1.95-.8C8.19 7.03 9.42 6 10.9 6H12z'/>
      </svg>
    </div>

    <?php if ($terminal): ?>
      <header class="flex flex-col gap-2">
        <h1 class="font-display text-headline-md text-neutral-950"><?= $terminal['title'] ?></h1>
        <p class="font-body text-body-lg text-neutral-700"><?= $terminal['desc'] ?></p>
      </header>
      <a href="<?= $terminal['cta']['href'] ?>" class="inline-flex items-center justify-center w-full h-12 rounded-full bg-primary-600 hover:bg-secondary-950 transition-colors font-body font-bold text-body-lg text-white">
        <?= $terminal['cta']['label'] ?>
      </a>
    <?php else: ?>
      <!-- Header -->
      <header class="flex flex-col gap-2">
        <h1 class="font-display text-headline-md text-neutral-950">Crie uma nova senha</h1>
        <p class="font-body text-body-lg text-neutral-700">
          Escolha uma senha forte com letras e números para proteger sua conta.
        </p>
      </header>

      <!-- Form (action só no estado valid — submit volta ao login) -->
      <form class="flex flex-col gap-6" novalidate <?= $state === 'valid' ? 'action="/src/layouts/login-modal.php" method="get"' : '' ?>>
        <fieldset class="contents" <?= $formDisabled ? 'disabled' : '' ?>>

          <!-- Nova senha -->
          <div class="flex flex-col items-start w-full">
            <label for="<?= $pwId ?>" class="flex gap-0.5 items-center pb-1 px-1 w-full">
              <span class="font-body font-semibold text-label-lg text-neutral-950">Nova senha</span>
              <span class="font-body font-semibold text-label-lg text-neutral-950">*</span>
            </label>
            <div class="bg-white flex h-10 items-center rounded-sm w-full border border-neutral-100 focus-within:border-secondary-950">
              <input id="<?= $pwId ?>" type="password" autocomplete="new-password" value="<?= $pwValue ?>" aria-describedby="<?= $pwId ?>-strength" class="flex-1 w-full h-full px-3 bg-transparent text-body-lg font-body text-primary-600 focus:outline-none">
              <button type="button" aria-label="Mostrar senha" data-login-action="toggle-password" data-target="<?= $pwId ?>" class="inline-flex items-center justify-center h-full w-10 text-neutral-500 hover:text-primary-600 transition-colors">
                <svg class="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
              </button>
            </div>
            <div id="<?= $pwId ?>-strength" class="mt-2 w-full">
              <?php get_template_part('components/_partials/password-strength', null, [
                'level'   => $pwLevel,
                'inputId' => $pwId,
              ]); ?>
            </div>
          </div>

          <!-- Confirmar senha -->
          <div class="flex flex-col items-start w-full">
            <label for="<?= $confirmId ?>" class="flex gap-0.5 items-center pb-1 px-1 w-full">
              <span class="font-body font-semibold text-label-lg text-neutral-950">Confirmar senha</span>
              <span class="font-body font-semibold text-label-lg text-neutral-950">*</span>
            </label>
            <div class="bg-white flex h-10 items-center rounded-sm w-full border border-neutral-100 focus-within:border-secondary-950">
              <input id="<?= $confirmId ?>" type="password" autocomplete="new-password" value="<?= $confirmValue ?>" class="flex-1 w-full h-full px-3 bg-transparent text-body-lg font-body text-primary-600 focus:outline-none">
              <button type="button" aria-label="Mostrar senha" data-login-action="toggle-password" data-target="<?= $confirmId ?>" class="inline-flex items-center justify-center h-full w-10 text-neutral-500 hover:text-primary-600 transition-colors">
                <svg class="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
              </button>
            </div>
          </div>

          <button type="submit" class="inline-flex items-center justify-center gap-2 w-full h-12 rounded-full bg-primary-600 hover:bg-secondary-950 disabled:bg-neutral-200 transition-colors font-body font-bold text-body-lg text-white">
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
    <?php endif; ?>
  </div>
<?php }

$states = [
  'valid'   => ['title' => 'Token válido',      'desc' => 'Formulário de nova senha.'],
  'loading' => ['title' => 'Loading',           'desc' => 'Submit em andamento.'],
  'expired' => ['title' => 'Erro: link expirado', 'desc' => '> 1h desde o envio — oferecer novo link.'],
  'used'    => ['title' => 'Erro: link já usado',  'desc' => 'Token já consumido — ir para login.'],
];
?>
<main class="bg-white min-h-screen flex flex-col">

  <header class="border-b border-neutral-100">
    <div class="max-w-screen-xl mx-auto px-4 lg:px-6 h-20 flex items-center">
      <a href="/" class="inline-flex items-center font-display font-bold text-headline-sm text-primary-600">Food Connection</a>
    </div>
  </header>

  <section class="flex-1 flex items-start justify-center py-16 px-4">
    <?php render_redefine_senha('valid'); ?>
  </section>

  <?php if (($_GET['preview'] ?? '') === 'spec'): ?>
  <section class="bg-neutral-50 border-t border-neutral-100 py-16">
    <div class="max-w-screen-xl mx-auto px-4 lg:px-6">
      <header class="mb-10 max-w-3xl">
        <p class="font-body text-label-lg uppercase tracking-wider text-neutral-500">Spec de estados</p>
        <h2 class="mt-2 font-display text-headline-md text-neutral-950">Estados do token</h2>
        <p class="mt-3 font-body text-body-lg text-neutral-700">
          4 estados conforme
          <code class="font-mono text-label-md bg-white rounded-xs px-1 py-0.5 border border-neutral-100">FEATURE-cadastro.md §6.6</code>.
          Token ausente na URL → redirect server-side para <code class="font-mono text-label-md">recupera-senha.php</code>.
          Pós-sucesso: toast "Senha redefinida com sucesso." + redirect para login.
        </p>
      </header>

      <div class="space-y-12">
        <?php foreach ($states as $key => $meta): if ($key === 'valid') continue; ?>
          <article>
            <div class="flex items-baseline gap-4 mb-4 pb-2 border-b border-neutral-100">
              <span class="font-mono text-label-sm text-neutral-500"><?= $key ?></span>
              <h3 class="font-display font-bold text-title-lg text-neutral-950"><?= $meta['title'] ?></h3>
              <p class="font-body text-body-md text-neutral-700"><?= $meta['desc'] ?></p>
            </div>
            <div class="bg-white rounded-lg border border-neutral-100 p-8 md:p-12 flex justify-center">
              <?php render_redefine_senha($key); ?>
            </div>
          </article>
        <?php endforeach; ?>
      </div>
    </div>
  </section>
  <?php endif; ?>

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
