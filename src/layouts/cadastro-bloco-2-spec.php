<?php
/**
 * Layout: Cadastro — Bloco 2 (Senha + Termos)
 * Figma: — (sem nodeId; derivado de FEATURE-cadastro.md §6.3)
 *
 * Segundo passo do cadastro. Captura senha + confirmação + consent LGPD.
 * Mesmo shell full-page do Bloco 1 (header wordmark / footer 3 links).
 *
 * Regra crítica: botão "Criar minha conta" só habilita quando senha é forte
 * o suficiente + confirmação confere + checkbox Termos marcado. A lógica vive
 * em form-cadastro.js (§7); aqui o markup suporta `disabled`.
 *
 * Indicador de progresso: ● ● ○ (passo 2 de 3).
 *
 * A11y:
 *   - Input senha com aria-describedby ligando ao password-strength
 *   - Checkbox Termos com aria-required="true" e required HTML
 *   - Erros com role="alert" + aria-invalid
 */

/**
 * Renderiza o card do Bloco 2 em um dos estados.
 *
 * @param string $state  default | filled-strong | error-weak | error-mismatch | loading
 */
function render_cadastro_bloco2(string $state = 'default'): void {
  $pwValue = '';
  $pwLevel = 'empty';
  $confirmValue = '';
  $termsChecked = false;
  $marketingChecked = false;
  $pwError = null;
  $confirmError = null;
  // No preview, submit começa habilitado (o JS cadastro-flow.js sincroniza
  // visual dos checkboxes e mostra força da senha em tempo real).
  $submitDisabled = false;
  $submitLabel = 'Criar minha conta';
  $submitLoading = false;
  $formDisabled = false;

  switch ($state) {
    case 'filled-strong':
      $pwValue = 'minhaSenha2026!';
      $pwLevel = 'strong';
      $confirmValue = 'minhaSenha2026!';
      $termsChecked = true;
      $submitDisabled = false;
      break;
    case 'error-weak':
      $pwValue = 'senha';
      $pwLevel = 'weak';
      $pwError = 'A senha deve ter no mínimo 8 caracteres com letras e números.';
      break;
    case 'error-mismatch':
      $pwValue = 'minhaSenha2026!';
      $pwLevel = 'strong';
      $confirmValue = 'minhaSenha2025!';
      $confirmError = 'As senhas não coincidem.';
      $termsChecked = true;
      break;
    case 'loading':
      $pwValue = 'minhaSenha2026!';
      $pwLevel = 'strong';
      $confirmValue = 'minhaSenha2026!';
      $termsChecked = true;
      $submitLabel = 'Criando conta...';
      $submitLoading = true;
      $submitDisabled = false;
      $formDisabled = true;
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
      <h1 class="font-display text-headline-md text-neutral-950">Crie uma senha</h1>
      <p class="font-body text-body-lg text-neutral-700">
        Será usada junto com <span class="font-semibold text-neutral-950">maria.silva@empresa.com.br</span> para acessar sua conta.
      </p>
    </header>

    <!-- Form (action nos estados navegáveis — submit avança para confirmação) -->
    <form class="flex flex-col gap-6" novalidate <?= in_array($state, ['default', 'filled-strong'], true) ? 'action="/src/layouts/confirmacao-email.php" method="get"' : '' ?> data-analytics-event="cadastro_bloco2_iniciado">
      <fieldset class="contents" <?= $formDisabled ? 'disabled' : '' ?>>

        <!-- Senha -->
        <div class="flex flex-col items-start w-full">
          <label for="<?= $pwId ?>" class="flex gap-0.5 items-center pb-1 px-1 w-full">
            <span class="font-body font-semibold text-label-lg text-neutral-950">Senha</span>
            <span class="font-body font-semibold text-label-lg text-neutral-950">*</span>
          </label>
          <div class="bg-white flex h-10 items-center rounded-sm w-full border <?= $pwError ? 'border-[#bf0413]' : 'border-neutral-100 focus-within:border-secondary-950' ?>">
            <input
              id="<?= $pwId ?>"
              type="password"
              autocomplete="new-password"
              value="<?= $pwValue ?>"
              aria-describedby="<?= $pwId ?>-strength <?= $pwError ? $pwId . '-error' : '' ?>"
              <?= $pwError ? 'aria-invalid="true"' : '' ?>
              class="flex-1 w-full h-full px-3 bg-transparent text-body-lg font-body text-primary-600 placeholder:text-neutral-500 focus:outline-none"
            >
            <button type="button" aria-label="Mostrar senha" data-login-action="toggle-password" data-target="<?= $pwId ?>" class="inline-flex items-center justify-center h-full w-10 text-neutral-500 hover:text-primary-600 transition-colors">
              <svg class="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
            </button>
          </div>
          <?php if ($pwError): ?>
            <div id="<?= $pwId ?>-error" role="alert" class="mt-1.5 flex items-start gap-1.5 px-1">
              <svg class="size-4 text-[#bf0413] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
              <span class="font-body text-label-md text-[#bf0413]"><?= $pwError ?></span>
            </div>
          <?php endif; ?>
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
          <div class="bg-white flex h-10 items-center rounded-sm w-full border <?= $confirmError ? 'border-[#bf0413]' : 'border-neutral-100 focus-within:border-secondary-950' ?>">
            <input
              id="<?= $confirmId ?>"
              type="password"
              autocomplete="new-password"
              value="<?= $confirmValue ?>"
              <?= $confirmError ? 'aria-invalid="true" aria-describedby="' . $confirmId . '-error"' : '' ?>
              class="flex-1 w-full h-full px-3 bg-transparent text-body-lg font-body text-primary-600 placeholder:text-neutral-500 focus:outline-none"
            >
            <button type="button" aria-label="Mostrar senha" data-login-action="toggle-password" data-target="<?= $confirmId ?>" class="inline-flex items-center justify-center h-full w-10 text-neutral-500 hover:text-primary-600 transition-colors">
              <svg class="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
            </button>
          </div>
          <?php if ($confirmError): ?>
            <div id="<?= $confirmId ?>-error" role="alert" class="mt-1.5 flex items-start gap-1.5 px-1">
              <svg class="size-4 text-[#bf0413] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
              <span class="font-body text-label-md text-[#bf0413]"><?= $confirmError ?></span>
            </div>
          <?php endif; ?>
        </div>

        <!-- Consent checkboxes -->
        <div class="flex flex-col gap-3 pt-2">
          <!-- Termos — obrigatório -->
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

          <!-- Marketing — opcional -->
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
  </div>
<?php }

$states = [
  'default'        => ['title' => 'Default',                   'desc' => 'Campos vazios, Termos desmarcado — submit desabilitado.'],
  'filled-strong'  => ['title' => 'Válido',                    'desc' => 'Senha forte + confirmação OK + Termos marcado → submit habilitado.'],
  'error-weak'     => ['title' => 'Erro: senha fraca',         'desc' => 'Menos de 8 chars ou sem combinação letras+números.'],
  'error-mismatch' => ['title' => 'Erro: senhas não coincidem','desc' => 'Confirmação difere da senha.'],
  'loading'        => ['title' => 'Loading',                   'desc' => 'Submit enviado — fieldset disabled + spinner.'],
];
?>
<main class="bg-white min-h-screen flex flex-col">

  <!-- Header minimal -->
  <header class="border-b border-neutral-100">
    <div class="max-w-screen-xl mx-auto px-4 lg:px-6 h-20 flex items-center">
      <a href="/" class="inline-flex items-center font-display font-bold text-headline-sm text-primary-600">
        Food Connection
      </a>
    </div>
  </header>

  <!-- Preview principal -->
  <section class="flex-1 flex items-start justify-center py-16 px-4">
    <?php render_cadastro_bloco2('default'); ?>
  </section>

  <!-- Galeria de estados (oculta; ?preview=spec) -->
  <?php if (($_GET['preview'] ?? '') === 'spec'): ?>
  <section class="bg-neutral-50 border-t border-neutral-100 py-16">
    <div class="max-w-screen-xl mx-auto px-4 lg:px-6">
      <header class="mb-10 max-w-3xl">
        <p class="font-body text-label-lg uppercase tracking-wider text-neutral-500">Spec de estados</p>
        <h2 class="mt-2 font-display text-headline-md text-neutral-950">Estados do formulário</h2>
        <p class="mt-3 font-body text-body-lg text-neutral-700">
          5 cenários definidos em
          <code class="font-mono text-label-md bg-white rounded-xs px-1 py-0.5 border border-neutral-100">FEATURE-cadastro.md §6.3</code>.
          Submit só habilita quando senha válida + confirmação confere + Termos marcado.
        </p>
      </header>

      <div class="space-y-12">
        <?php foreach ($states as $key => $meta): ?>
          <?php if ($key === 'default') continue; ?>
          <article>
            <div class="flex items-baseline gap-4 mb-4 pb-2 border-b border-neutral-100">
              <span class="font-mono text-label-sm text-neutral-500"><?= $key ?></span>
              <h3 class="font-display font-bold text-title-lg text-neutral-950"><?= $meta['title'] ?></h3>
              <p class="font-body text-body-md text-neutral-700"><?= $meta['desc'] ?></p>
            </div>
            <div class="bg-white rounded-lg border border-neutral-100 p-8 md:p-12 flex justify-center">
              <?php render_cadastro_bloco2($key); ?>
            </div>
          </article>
        <?php endforeach; ?>
      </div>
    </div>
  </section>
  <?php endif; ?>

  <!-- Footer minimal -->
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
