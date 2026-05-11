<?php
/**
 * Layout: Onboarding — Bloco 3 (Dados complementares) — página de fluxo
 * Spec completo: src/layouts/onboarding-spec.php
 *
 * Terceiro passo do cadastro. Todos os campos opcionais. Header/footer
 * minimalistas por §6.5.
 */

$viewState = $_GET['state'] ?? 'default';
$allowedStates = ['default', 'linkedin-prefilled', 'loading'];
if (!in_array($viewState, $allowedStates, true)) {
  $viewState = 'default';
}

function render_onboarding(string $state = 'default'): void {
  $isInteractive = in_array($state, ['default', 'linkedin-prefilled'], true);
  $nome = '';
  $empresa = '';
  $cargo = '';
  $setor = '';
  $telefone = '';
  $showLinkedinBadge = false;
  $submitLabel = 'Salvar e continuar';
  $submitLoading = false;
  $formDisabled = false;

  switch ($state) {
    case 'linkedin-prefilled':
      $nome = 'Maria Silva';
      $empresa = 'Cooperativa Central Aurora';
      $cargo = 'Gerente de Marketing';
      $showLinkedinBadge = true;
      break;
    case 'loading':
      $nome = 'Maria Silva';
      $empresa = 'Cooperativa Central Aurora';
      $cargo = 'Gerente de Marketing';
      $telefone = '+55 (11) 98765-4321';
      $setor = 'Indústria A&B';
      $submitLabel = 'Salvando...';
      $submitLoading = true;
      $formDisabled = true;
      break;
  }

  $id = fn(string $key) => 'onb-' . $key . '-' . $state;
?>
  <div class="w-full max-w-[560px] flex flex-col gap-8" data-onboarding-state="<?= $state ?>">

    <!-- Progress 3/3 -->
    <div class="flex flex-col gap-2" role="progressbar" aria-valuemin="1" aria-valuemax="3" aria-valuenow="3" aria-label="Passo 3 de 3">
      <div class="flex items-center gap-2" aria-hidden="true">
        <span class="size-2.5 rounded-full bg-secondary-950"></span>
        <span class="h-px flex-1 bg-secondary-950"></span>
        <span class="size-2.5 rounded-full bg-secondary-950"></span>
        <span class="h-px flex-1 bg-secondary-950"></span>
        <span class="size-2.5 rounded-full bg-secondary-950"></span>
      </div>
      <p class="font-body text-label-md text-neutral-600">Passo 3 de 3 — Dados complementares</p>
    </div>

    <header class="flex flex-col gap-2">
      <h1 class="font-display text-headline-md text-neutral-950">Conte um pouco sobre você</h1>
      <p class="font-body text-body-lg text-neutral-700">Essas informações personalizam sua experiência em todos os portais Informa.</p>
    </header>

    <?php if ($showLinkedinBadge): ?>
      <div class="inline-flex items-start gap-2 rounded-lg bg-[#E0F2FE] border border-[#BAE6FD] p-3">
        <svg class="size-5 text-[#0A66C2] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        <p class="flex-1 font-body text-body-md text-neutral-950">
          Preenchemos alguns campos com seu perfil do LinkedIn. Revise e edite se necessário.
        </p>
      </div>
    <?php endif; ?>

    <!-- Form — submit vai para home (simulando sucesso) -->
    <form class="flex flex-col gap-6" novalidate <?= $isInteractive ? 'action="/" method="get"' : '' ?> data-analytics-event="onboarding_concluido">
      <fieldset class="contents" <?= $formDisabled ? 'disabled' : '' ?>>

        <label class="flex flex-col items-start w-full">
          <div class="flex gap-0.5 items-center pb-1 px-1 w-full">
            <span class="font-body font-semibold text-label-lg text-neutral-950">Nome completo</span>
          </div>
          <div class="bg-white border border-neutral-100 focus-within:border-secondary-950 flex h-10 items-center rounded-sm w-full">
            <input id="<?= $id('nome') ?>" type="text" autocomplete="name" value="<?= $nome ?>" maxlength="120" placeholder="Seu nome completo" class="flex-1 w-full h-full px-3 bg-transparent text-body-lg font-body text-primary-600 placeholder:text-neutral-500 focus:outline-none">
          </div>
        </label>

        <label class="flex flex-col items-start w-full">
          <div class="flex gap-0.5 items-center pb-1 px-1 w-full">
            <span class="font-body font-semibold text-label-lg text-neutral-950">Telefone</span>
          </div>
          <div class="bg-white border border-neutral-100 focus-within:border-secondary-950 flex h-10 items-center rounded-sm w-full">
            <input id="<?= $id('tel') ?>" type="tel" autocomplete="tel" value="<?= $telefone ?>" placeholder="+55 (00) 00000-0000" data-mask="phone" class="flex-1 w-full h-full px-3 bg-transparent text-body-lg font-body text-primary-600 placeholder:text-neutral-500 focus:outline-none">
          </div>
        </label>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label class="flex flex-col items-start w-full">
            <div class="flex gap-0.5 items-center pb-1 px-1 w-full">
              <span class="font-body font-semibold text-label-lg text-neutral-950">Empresa</span>
            </div>
            <div class="bg-white border border-neutral-100 focus-within:border-secondary-950 flex h-10 items-center rounded-sm w-full">
              <input id="<?= $id('empresa') ?>" type="text" autocomplete="organization" value="<?= $empresa ?>" maxlength="100" class="flex-1 w-full h-full px-3 bg-transparent text-body-lg font-body text-primary-600 placeholder:text-neutral-500 focus:outline-none">
            </div>
          </label>

          <label class="flex flex-col items-start w-full">
            <div class="flex gap-0.5 items-center pb-1 px-1 w-full">
              <span class="font-body font-semibold text-label-lg text-neutral-950">Cargo</span>
            </div>
            <div class="bg-white border border-neutral-100 focus-within:border-secondary-950 flex h-10 items-center rounded-sm w-full">
              <input id="<?= $id('cargo') ?>" type="text" autocomplete="organization-title" value="<?= $cargo ?>" maxlength="100" class="flex-1 w-full h-full px-3 bg-transparent text-body-lg font-body text-primary-600 placeholder:text-neutral-500 focus:outline-none">
            </div>
          </label>
        </div>

        <label class="flex flex-col items-start w-full">
          <div class="flex gap-0.5 items-center pb-1 px-1 w-full">
            <span class="font-body font-semibold text-label-lg text-neutral-950">Setor</span>
          </div>
          <div class="bg-white border border-neutral-100 flex h-10 items-center justify-between px-3 rounded-sm w-full cursor-pointer" role="combobox" aria-expanded="false" aria-haspopup="listbox" data-setor-value="<?= $setor ?>">
            <?php if ($setor): ?>
              <span class="font-body text-body-lg text-primary-600"><?= $setor ?></span>
            <?php else: ?>
              <span class="font-body text-body-lg text-neutral-500">Buscar ou selecionar...</span>
            <?php endif; ?>
            <svg class="size-4 text-neutral-900" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>
          </div>
          <p class="mt-1 px-1 font-body text-label-md text-neutral-500">Taxonomia Informa Markets — digite para filtrar.</p>
        </label>

        <div class="flex flex-col gap-3 pt-2">
          <button
            type="submit"
            class="inline-flex items-center justify-center gap-2 w-full h-12 rounded-full bg-primary-600 hover:bg-secondary-950 disabled:bg-neutral-200 disabled:cursor-not-allowed transition-colors font-body font-bold text-body-lg text-white"
          >
            <?php if ($submitLoading): ?>
              <svg class="size-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" stroke-opacity=".25"/>
                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
              </svg>
            <?php endif; ?>
            <?= $submitLabel ?>
          </button>
          <a
            href="<?= $isInteractive ? '/' : '#' ?>"
            data-analytics-event="onboarding_pulado"
            class="inline-flex items-center justify-center w-full h-12 rounded-full bg-transparent text-primary-600 hover:bg-neutral-50 transition-colors font-body font-bold text-body-lg"
          >
            Fazer isso depois
          </a>
        </div>
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
    <?php render_onboarding($viewState); ?>
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
