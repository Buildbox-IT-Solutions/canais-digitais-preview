<?php
/**
 * Layout: Cadastro — Bloco 1 (E-mail)
 * Figma: — (sem nodeId; derivado de FEATURE-cadastro.md §6.2)
 *
 * Full-page sem nav completo — apenas logo + conteúdo + CTA. Formulário
 * centralizado `max-w-[480px]`. É o primeiro passo do fluxo de cadastro
 * (3 steps). Captura o e-mail e faz a primeira bifurcação:
 *
 *   - Novo     → avança para cadastro-bloco-2.php
 *   - Existente→ alert warning + link "Fazer login com este e-mail"
 *
 * Este layout renderiza o estado default como preview principal e, abaixo,
 * uma galeria com os 3 estados de erro / aviso definidos em §6.2.
 *
 * Comportamento (a ser implementado em form-cadastro.js — §7):
 *   - Foco automático no input ao montar
 *   - Validação apenas em blur ou submit (não durante digitação)
 *   - API de verificação de e-mail existente
 *   - Enter no input = clicar "Continuar"
 *
 * Tagueamento (§8):
 *   - data-analytics-event="cadastro_bloco1_iniciado" (form mount)
 *
 * A11y:
 *   - Progress indicator com role="progressbar" aria-valuenow=1 aria-valuemax=3
 *   - Erro: aria-invalid + aria-describedby + role="alert" no helper
 */

/**
 * Renderiza o card do Bloco 1 em um dos estados.
 *
 * @param string $state  default | error-empty | error-invalid | error-exists
 */
function render_cadastro_bloco1(string $state = 'default'): void {
  $errorMsg = null;
  $emailValue = '';
  $showExistsLink = false;

  switch ($state) {
    case 'error-empty':
      $errorMsg = 'Informe seu e-mail.';
      break;
    case 'error-invalid':
      $errorMsg = 'Digite um e-mail válido.';
      $emailValue = 'teste@';
      break;
    case 'error-exists':
      $errorMsg = 'Este e-mail já possui uma conta.';
      $emailValue = 'maria.silva@empresa.com.br';
      $showExistsLink = true;
      break;
  }

  $hasError = $errorMsg !== null;
  $helperId = 'email-helper-' . $state;
?>
  <div class="w-full max-w-[480px] flex flex-col gap-8" data-cadastro-state="<?= $state ?>">

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
      <p class="font-body text-body-lg text-neutral-700">Recomendamos o uso do seu e-mail corporativo.</p>
    </header>

    <!-- Form (action só no default — submit avança para Bloco 2) -->
    <form class="flex flex-col gap-6" novalidate <?= $state === 'default' ? 'action="/src/layouts/cadastro-bloco-2.php" method="get"' : '' ?> data-analytics-event="cadastro_bloco1_iniciado">
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
            autofocus
            placeholder="seu@empresa.com.br"
            value="<?= $emailValue ?>"
            <?= $hasError ? 'aria-invalid="true" aria-describedby="' . $helperId . '"' : '' ?>
            class="flex-1 w-full h-full px-3 bg-transparent text-body-lg font-body text-primary-600 placeholder:text-neutral-500 focus:outline-none"
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
        class="inline-flex items-center justify-center gap-2 w-full h-12 rounded-full bg-primary-600 hover:bg-secondary-950 transition-colors font-body font-bold text-body-lg text-white"
      >
        Continuar
        <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
      </button>
    </form>

    <!-- Footer: já tem conta -->
    <p class="text-center font-body text-body-md text-neutral-700">
      Já tem conta?
      <a href="/src/layouts/login-modal.php" class="font-bold text-secondary-950 hover:underline">Entrar</a>
    </p>
  </div>
<?php }

$states = [
  'default'       => ['title' => 'Default',              'desc' => 'Input vazio, campo em foco automático.'],
  'error-empty'   => ['title' => 'Erro: campo vazio',    'desc' => 'Submit sem digitar nada.'],
  'error-invalid' => ['title' => 'Erro: formato inválido','desc' => 'E-mail sem domínio completo.'],
  'error-exists'  => ['title' => 'Aviso: e-mail já cadastrado', 'desc' => 'API retornou que o e-mail já tem conta — oferecer login.'],
];
?>
<main class="bg-white min-h-screen flex flex-col">

  <!-- ============================================================
       Header minimal — apenas logo (sem nav/search/CTA)
       ============================================================ -->
  <header class="border-b border-neutral-100">
    <div class="max-w-screen-xl mx-auto px-4 lg:px-6 h-20 flex items-center">
      <a href="/" class="inline-flex items-center font-display font-bold text-headline-sm text-primary-600">
        Food Connection
      </a>
    </div>
  </header>

  <!-- ============================================================
       Preview principal: estado default centralizado
       ============================================================ -->
  <section class="flex-1 flex items-start justify-center py-16 px-4">
    <?php render_cadastro_bloco1('default'); ?>
  </section>

  <!-- ============================================================
       Galeria de estados — spec para devs/QA (oculta; ?preview=spec)
       ============================================================ -->
  <?php if (($_GET['preview'] ?? '') === 'spec'): ?>
  <section class="bg-neutral-50 border-t border-neutral-100 py-16">
    <div class="max-w-screen-xl mx-auto px-4 lg:px-6">
      <header class="mb-10 max-w-3xl">
        <p class="font-body text-label-lg uppercase tracking-wider text-neutral-500">Spec de estados</p>
        <h2 class="mt-2 font-display text-headline-md text-neutral-950">Estados de validação</h2>
        <p class="mt-3 font-body text-body-lg text-neutral-700">
          3 cenários de feedback definidos em
          <code class="font-mono text-label-md bg-white rounded-xs px-1 py-0.5 border border-neutral-100">FEATURE-cadastro.md §6.2</code>.
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
              <?php render_cadastro_bloco1($key); ?>
            </div>
          </article>
        <?php endforeach; ?>
      </div>
    </div>
  </section>
  <?php endif; ?>

  <!-- ============================================================
       Footer minimal
       ============================================================ -->
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
