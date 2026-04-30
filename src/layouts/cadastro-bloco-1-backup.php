<?php
/**
 * Layout: Cadastro — Bloco 1 (E-mail) — página de fluxo
 * Spec completo (galeria de estados): src/layouts/cadastro-bloco-1-spec.php
 *
 * Captura o e-mail e é o 1º de 3 passos. Header/footer minimalistas por
 * requisito de §6.2 (full-page sem nav completo).
 */

$viewState = $_GET['state'] ?? 'default';
$allowedStates = ['default', 'loading', 'error-format', 'error-duplicate'];
if (!in_array($viewState, $allowedStates, true)) {
  $viewState = 'default';
}

function render_cadastro_bloco1(string $state = 'default'): void {
  $isDefault = $state === 'default';
  $errorMsg = null;
  $emailValue = '';
  $showExistsLink = false;
  $submitLabel = 'Continuar';
  $submitLoading = false;
  $formDisabled = false;

  switch ($state) {
    case 'loading':
      $submitLabel = 'Verificando...';
      $submitLoading = true;
      $formDisabled = true;
      $emailValue = 'maria.silva@empresa.com.br';
      break;
    case 'error-format':
      $errorMsg = 'Digite um e-mail válido.';
      $emailValue = 'teste@';
      break;
    case 'error-duplicate':
      $errorMsg = 'Este e-mail já possui uma conta.';
      $emailValue = 'maria.silva@empresa.com.br';
      $showExistsLink = true;
      break;
  }

  $hasError = $errorMsg !== null;
  $helperId = 'email-helper-' . $state;
?>
  <div class="w-full max-w-[480px] flex flex-col gap-8" data-cadastro-state="<?= $state ?>">

    <!-- Grade de portais (Conta Informa) -->
    <?php $portais = ['Food Connection','Canal Energia','Aquaculture Brasil',
      'Inovação em Pauta','Cosmetiquim','AgroPages','Animal Business',
      'Ingredientes Online','InfoAdubo','Borracha Atual','PlastiForum']; ?>
    <div class="flex flex-col items-center gap-3 text-center">
      <div class="flex flex-wrap gap-1.5 justify-center">
        <?php foreach ($portais as $p): ?>
          <span class="px-2.5 py-1 rounded-full bg-neutral-50 border border-neutral-100
                       font-body text-label-sm text-neutral-600 whitespace-nowrap"><?= $p ?></span>
        <?php endforeach; ?>
      </div>
      <p class="font-display font-bold text-title-md text-neutral-950">
        Uma conta. Todos os portais. É grátis.
      </p>
    </div>

    <!-- Progress 1/3 -->
    <div class="flex flex-col gap-2" role="progressbar" aria-valuemin="1" aria-valuemax="3" aria-valuenow="1" aria-label="Passo 1 de 3">
      <div class="flex items-center gap-2" aria-hidden="true">
        <span class="size-2.5 rounded-full bg-secondary-950"></span>
        <span class="h-px flex-1 bg-neutral-100"></span>
        <span class="size-2.5 rounded-full border border-neutral-200"></span>
        <span class="h-px flex-1 bg-neutral-100"></span>
        <span class="size-2.5 rounded-full border border-neutral-200"></span>
      </div>
      <p class="font-body text-label-md text-neutral-600">Passo 1 de 3 — E-mail</p>
    </div>

    <!-- Header -->
    <header class="flex flex-col gap-2">
      <h1 class="font-display text-headline-md text-neutral-950">Qual é o seu e-mail?</h1>
      <p class="font-body text-body-lg text-neutral-700">Crie sua Conta Informa e acesse todos os portais gratuitamente.</p>
    </header>

    <!-- Form — submit no default avança para Bloco 2 -->
    <form class="flex flex-col gap-6" novalidate <?= $isDefault ? 'action="/src/layouts/cadastro-bloco-2.php" method="get"' : '' ?> data-analytics-event="cadastro_bloco1_iniciado">
      <fieldset class="contents" <?= $formDisabled ? 'disabled' : '' ?>>
        <label class="flex flex-col items-start w-full">
          <div class="flex gap-0.5 items-center pb-1 px-1 w-full">
            <span class="font-body font-semibold text-label-lg text-neutral-950">E-mail</span>
            <span class="font-body font-semibold text-label-lg text-neutral-950">*</span>
          </div>
          <div class="bg-white flex h-10 items-center rounded-sm w-full border <?= $hasError ? 'border-[#bf0413]' : 'border-neutral-100 focus-within:border-secondary-950' ?>">
            <input
              id="cadastro-email-<?= $state ?>"
              type="email"
              autocomplete="email"
              <?= $isDefault ? 'autofocus' : '' ?>
              placeholder="seu@empresa.com.br"
              value="<?= $emailValue ?>"
              <?= $hasError ? 'aria-invalid="true" aria-describedby="' . $helperId . '"' : '' ?>
              class="flex-1 w-full h-full px-3 bg-transparent text-body-lg font-body text-primary-600 placeholder:text-neutral-500 focus:outline-none disabled:bg-neutral-50"
            >
          </div>
          <?php if ($hasError): ?>
            <div id="<?= $helperId ?>" role="alert" class="mt-1.5 flex items-start gap-1.5 px-1">
              <svg class="size-4 text-[#bf0413] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
              <div class="flex flex-col gap-1">
                <span class="font-body text-label-md text-[#bf0413]"><?= $errorMsg ?></span>
                <?php if ($showExistsLink): ?>
                  <a href="/src/layouts/login-modal.php" class="font-body font-bold text-label-md text-secondary-950 hover:underline">Fazer login com este e-mail</a>
                <?php endif; ?>
              </div>
            </div>
          <?php endif; ?>
        </label>

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
          <?php if (!$submitLoading): ?>
            <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          <?php endif; ?>
        </button>
      </fieldset>
    </form>

    <!-- Footer: já tem conta -->
    <p class="text-center font-body text-body-md text-neutral-700">
      Já tem conta?
      <a href="/src/layouts/login-modal.php" class="font-bold text-secondary-950 hover:underline">Entrar</a>
    </p>
  </div>
<?php }
?>
<main class="bg-white min-h-screen flex flex-col">

  <!-- Header minimal — apenas logo -->
  <header class="border-b border-neutral-100">
    <div class="max-w-screen-xl mx-auto px-4 lg:px-6 h-20 flex items-center">
      <a href="/" class="inline-flex items-center font-display font-bold text-headline-sm text-primary-600">
        Food Connection
      </a>
    </div>
  </header>

  <section class="flex-1 flex items-start justify-center py-16 px-4">
    <?php render_cadastro_bloco1($viewState); ?>
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
