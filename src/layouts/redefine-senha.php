<?php
/**
 * Layout: Redefine Senha — v3.0
 * Figma: — (extensão do sistema login.php v3.0)
 *
 * Tela B do fluxo de recuperação: o usuário clicou no link do e-mail e está
 * agora definindo uma nova senha. URL real: /redefine-senha?token=[token].
 *
 * Estados via ?state=...:
 *   valid    → form de nova senha (default)
 *   loading  → form em submit (preview only)
 *   success  → senha redefinida com sucesso → CTA login
 *   expired  → link com mais de 1h → solicitar novo
 *   used     → link já consumido (senha já redefinida)
 *
 * Erros via ?error=...:
 *   fraca    → senha não atende requisitos
 *   mismatch → confirmação não bate
 *
 * Tokens: primary-100/600, secondary-500/950, neutral-100/500/700/900/950,
 *         green-50/600, amber-50/700, red-600
 * Anim:   animate-fade-up-sm
 *
 * Partials usados: password-strength, proof-panel-minimal
 */

require_once __DIR__ . '/_session.php';

$state = $_GET['state'] ?? 'valid';
if (!in_array($state, ['valid', 'loading', 'success', 'expired', 'used'], true)) {
  $state = 'valid';
}

$errorMode = $_GET['error'] ?? 'none';
if (!in_array($errorMode, ['none', 'fraca', 'mismatch'], true)) $errorMode = 'none';

$senhaError = $errorMode === 'fraca' ? 'Senha muito fraca. Use letras e números, mín. 8 caracteres.' : null;
$confirmError = $errorMode === 'mismatch' ? 'As senhas não coincidem.' : null;

$isTerminal = in_array($state, ['success', 'expired', 'used'], true);
$isLoading = $state === 'loading';

$terminalCfg = match($state) {
  'success' => [
    'iconBg'   => 'bg-green-50',
    'iconFg'   => 'text-green-600',
    'iconPath' => 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
    'title'    => 'Senha redefinida',
    'body'     => 'Sua nova senha está ativa. Faça login para continuar.',
    'ctaLabel' => 'Fazer login',
    'ctaHref'  => '/src/layouts/login.php',
    'proof'    => 'welcome',
  ],
  'expired' => [
    'iconBg'   => 'bg-amber-50',
    'iconFg'   => 'text-amber-700',
    'iconPath' => 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z',
    'title'    => 'Link expirado',
    'body'     => 'O link de redefinição é válido por 1 hora. Solicite um novo para continuar.',
    'ctaLabel' => 'Solicitar novo link',
    'ctaHref'  => '/src/layouts/recupera-senha.php',
    'proof'    => 'login',
  ],
  'used' => [
    'iconBg'   => 'bg-primary-100',
    'iconFg'   => 'text-primary-600',
    'iconPath' => 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
    'title'    => 'Este link já foi usado',
    'body'     => 'Sua senha já foi redefinida. Faça login para entrar na sua conta.',
    'ctaLabel' => 'Fazer login',
    'ctaHref'  => '/src/layouts/login.php',
    'proof'    => 'login',
  ],
  default => null,
};

$proofVariant = $terminalCfg['proof'] ?? 'login';

$pwValue = $isLoading ? 'minhaSenhaNova2026!' : ($errorMode === 'fraca' ? 'abc' : ($errorMode === 'mismatch' ? 'minhasenha123' : ''));
$confirmValue = $isLoading ? 'minhaSenhaNova2026!' : ($errorMode === 'mismatch' ? 'outrasenha456' : '');
$pwLevel = $isLoading ? 'strong' : ($errorMode === 'fraca' ? 'weak' : 'empty');
?>

<div class="flex min-h-screen items-stretch">

  <!-- ============================================================
       Split-left
       ============================================================ -->
  <section class="flex flex-col w-[560px] shrink-0 px-14 py-12 bg-white animate-fade-up-sm">

    <!-- Top: Voltar (apenas no estado valid; terminais têm próprio CTA) -->
    <div class="w-full">
      <?php if ($state === 'valid'): ?>
        <a href="/src/layouts/recupera-senha.php"
           class="inline-flex items-center gap-2 -ml-3 px-3 py-2.5 rounded-full font-body font-bold text-label-lg text-primary-600 hover:bg-neutral-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2">
          <svg class="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
          Voltar
        </a>
      <?php endif; ?>
    </div>

    <!-- Center content -->
    <div class="flex-1 flex flex-col justify-center w-full">

      <?php if ($terminalCfg): ?>
        <!-- ============== Estado terminal: success | expired | used ============== -->
        <div class="flex flex-col gap-6 w-full">
          <div class="inline-flex items-center justify-center size-12 rounded-full <?= $terminalCfg['iconBg'] ?> <?= $terminalCfg['iconFg'] ?>">
            <svg class="size-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="<?= $terminalCfg['iconPath'] ?>"/>
            </svg>
          </div>

          <div class="flex flex-col gap-2 w-full">
            <h1 class="font-display font-bold text-headline-md text-primary-600"><?= $terminalCfg['title'] ?></h1>
            <p class="font-body text-body-lg text-neutral-900"><?= $terminalCfg['body'] ?></p>
          </div>

          <a href="<?= $terminalCfg['ctaHref'] ?>"
             class="inline-flex items-center justify-center w-full h-12 px-6 rounded-full bg-primary-600 hover:bg-secondary-950 text-white font-body font-bold text-body-lg transition-colors mt-2">
            <?= $terminalCfg['ctaLabel'] ?>
          </a>
        </div>

      <?php else: ?>
        <!-- ============== Estado: VALID (form) ou LOADING ============== -->
        <div class="flex flex-col gap-6 w-full">

          <div class="inline-flex items-center justify-center size-12 rounded-full bg-secondary-500/10 text-secondary-950">
            <svg class="size-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm3 11c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
            </svg>
          </div>

          <div class="flex flex-col gap-2 w-full">
            <h1 class="font-display font-bold text-headline-md text-primary-600">Crie uma nova senha</h1>
            <p class="font-body text-body-lg text-neutral-900">
              Escolha uma senha forte com letras e números para proteger sua conta.
            </p>
          </div>

          <form action="/src/layouts/redefine-senha.php" method="get" class="flex flex-col gap-6 w-full" novalidate>
            <input type="hidden" name="state" value="success">
            <fieldset class="contents" <?= $isLoading ? 'disabled' : '' ?>>

              <!-- Nova senha + strength -->
              <div class="flex flex-col gap-3 w-full">
                <label class="flex flex-col w-full">
                  <span class="flex items-center gap-0.5 px-1 pb-1 font-body font-semibold text-label-lg <?= $senhaError ? 'text-red-600' : 'text-neutral-950' ?>">
                    Nova senha<span aria-hidden="true">*</span>
                  </span>
                  <div class="flex items-center h-10 px-3 rounded-sm border bg-white transition-colors <?= $senhaError ? 'border-red-600' : 'border-neutral-100 focus-within:border-secondary-950' ?>" data-password-field>
                    <input type="password" name="senha" id="redef-pw" required autocomplete="new-password"
                           value="<?= htmlspecialchars($pwValue) ?>"
                           aria-describedby="redef-pw-strength"
                           class="flex-1 bg-transparent font-body text-body-lg text-primary-600 placeholder:text-neutral-500 focus:outline-none">
                    <button type="button" data-login-action="toggle-password" data-target="redef-pw" aria-label="Mostrar senha"
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

                <div id="redef-pw-strength">
                  <?php get_template_part('components/_partials/password-strength', null, [
                    'level'   => $pwLevel,
                    'inputId' => 'redef-pw',
                  ]); ?>
                </div>
              </div>

              <!-- Confirmar -->
              <label class="flex flex-col w-full">
                <span class="flex items-center gap-0.5 px-1 pb-1 font-body font-semibold text-label-lg <?= $confirmError ? 'text-red-600' : 'text-neutral-950' ?>">
                  Confirmar senha<span aria-hidden="true">*</span>
                </span>
                <div class="flex items-center h-10 px-3 rounded-sm border bg-white transition-colors <?= $confirmError ? 'border-red-600' : 'border-neutral-100 focus-within:border-secondary-950' ?>" data-password-field>
                  <input type="password" name="confirmar" id="redef-confirm" required autocomplete="new-password"
                         value="<?= htmlspecialchars($confirmValue) ?>"
                         class="flex-1 bg-transparent font-body text-body-lg text-primary-600 placeholder:text-neutral-500 focus:outline-none">
                  <button type="button" data-login-action="toggle-password" data-target="redef-confirm" aria-label="Mostrar senha"
                          class="inline-flex items-center justify-center size-7 -mr-1 text-neutral-500 hover:text-primary-600 transition-colors rounded-full">
                    <svg class="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                    </svg>
                  </button>
                </div>
                <?php if ($confirmError): ?>
                  <p class="mt-1.5 px-1 flex items-center gap-1.5 font-body font-semibold text-label-md text-red-600">
                    <svg class="size-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                    <?= $confirmError ?>
                  </p>
                <?php endif; ?>
              </label>

              <button type="submit"
                      class="inline-flex items-center justify-center gap-2 w-full h-12 px-6 rounded-full bg-primary-600 hover:bg-secondary-950 disabled:bg-neutral-300 text-white font-body font-bold text-body-lg transition-colors">
                <?php if ($isLoading): ?>
                  <svg class="size-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" stroke-opacity=".25"/>
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                  </svg>
                  Redefinindo...
                <?php else: ?>
                  Redefinir senha
                <?php endif; ?>
              </button>
            </fieldset>
          </form>
        </div>
      <?php endif; ?>
    </div>

    <!-- Bottom: account -->
    <div class="flex justify-center items-center gap-1 w-full font-body text-body-md">
      <span class="text-neutral-700">Lembrou da senha?</span>
      <a href="/src/layouts/login.php" class="font-bold text-secondary-950 hover:underline">Entrar</a>
    </div>

  </section>

  <!-- ============================================================
       Split-right — proof panel
       ============================================================ -->
  <?php get_template_part('components/_partials/proof-panel-minimal', null, ['variant' => $proofVariant]); ?>

</div>

<!-- ============================================================
     Dev navigator
     ============================================================ -->
<div class="fixed bottom-4 left-1/2 -translate-x-1/2 flex flex-col gap-1.5 items-center
            bg-white/95 backdrop-blur-sm border border-neutral-100 rounded-2xl px-4 py-2
            shadow-md z-50 font-body text-label-md">
  <div class="flex flex-wrap gap-1.5 justify-center">
    <span class="text-neutral-500 self-center pr-1">Estado:</span>
    <?php foreach (['valid', 'loading', 'success', 'expired', 'used'] as $s): ?>
      <a href="?state=<?= $s ?>"
         class="px-2.5 py-1 rounded-full transition-colors <?= $s === $state ? 'bg-primary-600 text-white' : 'text-neutral-700 hover:bg-neutral-50' ?>">
        <?= $s ?>
      </a>
    <?php endforeach; ?>
  </div>
  <?php if ($state === 'valid'): ?>
  <div class="flex flex-wrap gap-1.5 justify-center">
    <span class="text-neutral-500 self-center pr-1">Erro:</span>
    <?php foreach (['none', 'fraca', 'mismatch'] as $s): ?>
      <a href="?error=<?= $s ?>"
         class="px-2.5 py-1 rounded-full transition-colors <?= $s === $errorMode ? 'bg-primary-600 text-white' : 'text-neutral-700 hover:bg-neutral-50' ?>">
        <?= $s ?>
      </a>
    <?php endforeach; ?>
  </div>
  <?php endif; ?>
</div>

<script type="module" src="/src/assets/js/interactions.js"></script>
