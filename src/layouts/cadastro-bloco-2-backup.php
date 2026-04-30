<?php
/**
 * Layout: Cadastro — Bloco 2 (Senha + Termos) — página de fluxo
 * Spec completo (galeria de estados): src/layouts/cadastro-bloco-2-spec.php
 *
 * Segundo passo do cadastro. Header/footer minimalistas por §6.3.
 */

$viewState = $_GET['state'] ?? 'default';
$allowedStates = ['default', 'loading', 'error-system'];
if (!in_array($viewState, $allowedStates, true)) {
  $viewState = 'default';
}

function render_cadastro_bloco2(string $state = 'default'): void {
  $isDefault = $state === 'default';
  $pwValue = '';
  $pwLevel = 'empty';
  $confirmValue = '';
  $termsChecked = false;
  $marketingChecked = false;
  $systemAlert = null;
  $submitLabel = 'Criar minha conta';
  $submitLoading = false;
  $formDisabled = false;

  switch ($state) {
    case 'loading':
      $pwValue = 'minhaSenha2026!';
      $pwLevel = 'strong';
      $confirmValue = 'minhaSenha2026!';
      $termsChecked = true;
      $submitLabel = 'Criando conta...';
      $submitLoading = true;
      $formDisabled = true;
      break;
    case 'error-system':
      $pwValue = 'minhaSenha2026!';
      $pwLevel = 'strong';
      $confirmValue = 'minhaSenha2026!';
      $termsChecked = true;
      $systemAlert = 'Não foi possível criar sua conta agora. Tente novamente em instantes.';
      break;
  }

  $pwId = 'cadastro-pw-' . $state;
  $confirmId = 'cadastro-pw-confirm-' . $state;
?>
  <div class="w-full max-w-[480px] flex flex-col gap-8" data-cadastro-state="<?= $state ?>">

    <!-- Voltar -->
    <div>
      <a href="/src/layouts/cadastro-bloco-1.php" class="inline-flex items-center gap-1.5 font-body font-semibold text-label-lg text-primary-600 hover:text-secondary-950 transition-colors">
        <svg class="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
        Voltar
      </a>
    </div>

    <!-- Progress 2/3 -->
    <div class="flex flex-col gap-2" role="progressbar" aria-valuemin="1" aria-valuemax="3" aria-valuenow="2" aria-label="Passo 2 de 3">
      <div class="flex items-center gap-2" aria-hidden="true">
        <span class="size-2.5 rounded-full bg-secondary-950"></span>
        <span class="h-px flex-1 bg-secondary-950"></span>
        <span class="size-2.5 rounded-full bg-secondary-950"></span>
        <span class="h-px flex-1 bg-neutral-100"></span>
        <span class="size-2.5 rounded-full border border-neutral-200"></span>
      </div>
      <p class="font-body text-label-md text-neutral-600">Passo 2 de 3 — Senha</p>
    </div>

    <!-- Header -->
    <header class="flex flex-col gap-2">
      <h1 class="font-display text-headline-md text-neutral-950">Crie uma senha para sua Conta Informa</h1>
      <p class="font-body text-body-lg text-neutral-700">
        Será usada junto com <span class="font-semibold text-neutral-950">maria.silva@empresa.com.br</span> para acessar sua conta.
      </p>
    </header>

    <!-- Alert sistêmico -->
    <?php if ($systemAlert): ?>
      <div role="alert" class="flex items-start gap-3 rounded-lg border-l-4 bg-[#FEF2F2] border-[#bf0413] text-[#bf0413] p-3">
        <svg class="size-5 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12z"/></svg>
        <p class="flex-1 font-body text-body-md"><?= $systemAlert ?></p>
      </div>
    <?php endif; ?>

    <!-- Form — submit no default avança para confirmação -->
    <form class="flex flex-col gap-6" novalidate <?= $isDefault ? 'action="/src/layouts/confirmacao-email.php" method="get"' : '' ?> data-analytics-event="cadastro_bloco2_iniciado">
      <fieldset class="contents" <?= $formDisabled ? 'disabled' : '' ?>>

        <!-- Senha -->
        <div class="flex flex-col items-start w-full">
          <label for="<?= $pwId ?>" class="flex gap-0.5 items-center pb-1 px-1 w-full">
            <span class="font-body font-semibold text-label-lg text-neutral-950">Senha</span>
            <span class="font-body font-semibold text-label-lg text-neutral-950">*</span>
          </label>
          <div class="bg-white flex h-10 items-center rounded-sm w-full border border-neutral-100 focus-within:border-secondary-950">
            <input
              id="<?= $pwId ?>"
              type="password"
              autocomplete="new-password"
              value="<?= $pwValue ?>"
              aria-describedby="<?= $pwId ?>-strength"
              class="flex-1 w-full h-full px-3 bg-transparent text-body-lg font-body text-primary-600 placeholder:text-neutral-500 focus:outline-none"
            >
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
            <input
              id="<?= $confirmId ?>"
              type="password"
              autocomplete="new-password"
              value="<?= $confirmValue ?>"
              class="flex-1 w-full h-full px-3 bg-transparent text-body-lg font-body text-primary-600 placeholder:text-neutral-500 focus:outline-none"
            >
            <button type="button" aria-label="Mostrar senha" data-login-action="toggle-password" data-target="<?= $confirmId ?>" class="inline-flex items-center justify-center h-full w-10 text-neutral-500 hover:text-primary-600 transition-colors">
              <svg class="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
            </button>
          </div>
        </div>

        <!-- Consent checkboxes -->
        <div class="flex flex-col gap-3 pt-2">
          <label class="flex gap-3 items-start cursor-pointer w-full">
            <span class="inline-flex items-center justify-center size-5 rounded-xs shrink-0 mt-0.5 border-2 <?= $termsChecked ? 'border-secondary-950 bg-secondary-950' : 'border-neutral-950 bg-white' ?>">
              <?php if ($termsChecked): ?>
                <svg class="size-3 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
              <?php endif; ?>
            </span>
            <input type="checkbox" name="terms" id="cadastro-terms-<?= $state ?>" class="sr-only" <?= $termsChecked ? 'checked' : '' ?> required aria-required="true">
            <span class="flex-1 font-body text-body-md text-neutral-950">
              Li e aceito os <a href="/termos" target="_blank" class="font-bold text-secondary-950 hover:underline">Termos de Uso</a> e a <a href="/privacidade" target="_blank" class="font-bold text-secondary-950 hover:underline">Política de Privacidade</a>
              <span aria-hidden="true" class="text-[#bf0413]">*</span>
            </span>
          </label>

          <label class="flex gap-3 items-start cursor-pointer w-full">
            <span class="inline-flex items-center justify-center size-5 rounded-xs shrink-0 mt-0.5 border-2 <?= $marketingChecked ? 'border-secondary-950 bg-secondary-950' : 'border-neutral-950 bg-white' ?>">
              <?php if ($marketingChecked): ?>
                <svg class="size-3 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
              <?php endif; ?>
            </span>
            <input type="checkbox" name="marketing" id="cadastro-marketing-<?= $state ?>" class="sr-only" <?= $marketingChecked ? 'checked' : '' ?>>
            <span class="flex-1 font-body text-body-md text-neutral-950">
              Quero receber comunicações e novidades da Informa Markets
            </span>
          </label>
        </div>

        <!-- Submit -->
        <button
          type="submit"
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
  </div>
<?php }
?>
<main class="bg-white min-h-screen flex flex-col">

  <header class="border-b border-neutral-100">
    <div class="max-w-screen-xl mx-auto px-4 lg:px-6 h-20 flex items-center">
      <a href="/" class="inline-flex items-center font-display font-bold text-headline-sm text-primary-600">
        Food Connection
      </a>
    </div>
  </header>

  <section class="flex-1 flex items-start justify-center py-16 px-4">
    <?php render_cadastro_bloco2($viewState); ?>
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
