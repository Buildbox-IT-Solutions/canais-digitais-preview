<?php
/**
 * Layout: Cadastro Multi-Step — v3.0
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=6271-20270
 * NodeIds: 6269:18460 (step 1) · 6271:18788 (step 2) · 6271:19008 (step 3)
 *
 * Single-file fluxo de 3 passos via ?step=1|2|3.
 * Step 1: e-mail
 * Step 2: senha + confirmar + termos/marketing checkboxes
 * Step 3: nome + telefone + empresa + cargo + setor
 * Após step 3 → confirmacao-email.php
 *
 * Estados de erro por step via ?error=...:
 *   step 1: empty | invalido | existente
 *   step 2: fraca  | mismatch | termos
 *   step 3: campos
 *
 * Pre-fill: ?email=... preserva o e-mail entre os passos.
 *
 * Tokens usados:
 *   colors: primary-100/600, secondary-950, neutral-100/500/700/900/950, red-600, white
 *   type:   font-display, font-body, text-headline-md/body-lg/body-md/label-lg/label-md
 *   layout: rounded-sm (inputs), rounded-xs (checkbox), rounded-full (buttons)
 *   anim:   animate-fade-up-sm
 *
 * Partials usados: cadastro-stepper, password-strength, proof-panel-minimal
 */

require_once __DIR__ . '/_session.php';

$step = (int)($_GET['step'] ?? 1);
if (!in_array($step, [1, 2, 3], true)) $step = 1;

$emailParam = $_GET['email'] ?? 'mariana.albuquerque@empresa.com.br';

$errorMode = $_GET['error'] ?? 'none';
$validErrors = match($step) {
  1 => ['none', 'empty', 'invalido', 'existente'],
  2 => ['none', 'fraca', 'mismatch', 'termos'],
  3 => ['none', 'campos'],
};
if (!in_array($errorMode, $validErrors, true)) $errorMode = 'none';

// Step 1
$emailError = match($errorMode) {
  'empty'     => 'Informe seu e-mail.',
  'invalido'  => 'Digite um e-mail válido.',
  'existente' => 'Esse e-mail já tem uma conta.',
  default     => null,
};
$emailValueByError = match($errorMode) {
  'invalido'  => 'teste@',
  'existente' => 'maria.silva@empresa.com.br',
  default     => '',
};

// Step 2
$senhaError = $errorMode === 'fraca' ? 'Senha muito fraca. Use letras e números, mín. 8 caracteres.' : null;
$confirmError = $errorMode === 'mismatch' ? 'As senhas não coincidem.' : null;
$termosError = $errorMode === 'termos' ? 'Você precisa aceitar os Termos de Uso e a Política de Privacidade.' : null;

// Step 3
$campoVazioError = $errorMode === 'campos' ? 'Preencha todos os campos obrigatórios.' : null;

// Targets
$prevStep = match($step) {
  1 => null,
  2 => '/src/layouts/cadastro.php?step=1&email=' . urlencode($emailParam),
  3 => '/src/layouts/cadastro.php?step=2&email=' . urlencode($emailParam),
};
$nextAction = match($step) {
  1 => '/src/layouts/cadastro.php',
  2 => '/src/layouts/cadastro.php',
  3 => '/src/layouts/confirmacao-email.php',
};
$nextStepNum = $step + 1;

$proofVariant = match($step) {
  1 => 'signup-1',
  2 => 'signup-2',
  3 => 'signup-3',
};

$primaryCTA = match($step) {
  1 => 'Avançar',
  2 => 'Criar minha conta',
  3 => 'Avançar',
};

$headings = [
  1 => ['title' => 'Qual é o seu e-mail?',        'sub' => 'Recomendamos o uso do seu e-mail corporativo.'],
  2 => ['title' => 'Crie uma senha',              'sub' => null],
  3 => ['title' => 'Conte um pouco sobre você',   'sub' => 'Usamos isso para recomendar conteúdo, eventos e materiais relevantes para o seu mercado.'],
];
?>

<div class="flex min-h-screen items-stretch">

  <!-- ============================================================
       Split-left — formulário multi-step
       ============================================================ -->
  <section class="flex flex-col w-[560px] shrink-0 px-14 py-16 bg-white">

    <!-- Top: stepper -->
    <div class="w-full animate-fade-up-sm">
      <?php get_template_part('components/_partials/cadastro-stepper', null, ['current' => $step]); ?>
    </div>

    <!-- Center content -->
    <div class="flex-1 flex flex-col justify-center w-full">
      <div class="flex flex-col gap-8 w-full animate-fade-up-sm" style="animation-delay: 60ms;">

        <!-- Heading -->
        <div class="flex flex-col gap-2 w-full">
          <h1 class="font-display font-bold text-headline-md text-primary-600"><?= $headings[$step]['title'] ?></h1>
          <?php if ($step === 2): ?>
            <p class="font-body text-body-lg text-neutral-900">
              Será usada junto com <strong class="font-bold"><?= htmlspecialchars($emailParam) ?></strong> para acessar sua conta.
            </p>
          <?php else: ?>
            <p class="font-body text-body-lg text-neutral-900"><?= $headings[$step]['sub'] ?></p>
          <?php endif; ?>
        </div>

        <!-- Step 3 global error -->
        <?php if ($campoVazioError): ?>
          <div role="alert" class="flex gap-2.5 items-start px-3 py-2.5 rounded-sm border border-red-600/30 bg-red-600/10 text-red-600">
            <svg class="size-5 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            <div class="font-body font-semibold text-body-md"><?= $campoVazioError ?></div>
          </div>
        <?php endif; ?>

        <!-- Form -->
        <form action="<?= $nextAction ?>" method="get" class="flex flex-col gap-8 w-full" novalidate>
          <input type="hidden" name="step" value="<?= $nextStepNum ?>">

          <?php if ($step === 1): ?>
            <!-- ============== STEP 1: E-mail ============== -->
            <label class="flex flex-col w-full">
              <span class="flex items-center gap-0.5 px-1 pb-1 font-body font-semibold text-label-lg <?= $emailError ? 'text-red-600' : 'text-neutral-950' ?>">
                E-mail<span aria-hidden="true">*</span>
              </span>
              <div class="flex items-center h-10 px-3 rounded-sm border bg-white transition-colors <?= $emailError ? 'border-red-600' : 'border-neutral-100 focus-within:border-secondary-950' ?>">
                <input type="email" name="email" required autofocus
                       value="<?= htmlspecialchars($emailValueByError ?: $emailParam) ?>"
                       autocomplete="email"
                       placeholder="seu@empresa.com.br"
                       class="flex-1 bg-transparent font-body text-body-lg text-primary-600 placeholder:text-neutral-500 focus:outline-none">
              </div>
              <?php if ($emailError): ?>
                <p class="mt-1.5 px-1 flex items-center gap-1.5 font-body font-semibold text-label-md text-red-600">
                  <svg class="size-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                  <?= $emailError ?>
                  <?php if ($errorMode === 'existente'): ?>
                    <a href="/src/layouts/login.php" class="font-bold text-secondary-950 underline hover:no-underline ml-1">Entrar</a>
                  <?php endif; ?>
                </p>
              <?php endif; ?>
            </label>

          <?php elseif ($step === 2): ?>
            <!-- ============== STEP 2: Senha ============== -->
            <input type="hidden" name="email" value="<?= htmlspecialchars($emailParam) ?>">

            <!-- Senha + strength -->
            <div class="flex flex-col gap-3 w-full">
              <label class="flex flex-col w-full">
                <span class="flex items-center gap-0.5 px-1 pb-1 font-body font-semibold text-label-lg <?= $senhaError ? 'text-red-600' : 'text-neutral-950' ?>">
                  Senha<span aria-hidden="true">*</span>
                </span>
                <div class="flex items-center h-10 px-3 rounded-sm border bg-white transition-colors <?= $senhaError ? 'border-red-600' : 'border-neutral-100 focus-within:border-secondary-950' ?>" data-password-field>
                  <input type="password" name="senha" id="cadastro-senha" required autocomplete="new-password"
                         value="<?= $errorMode === 'fraca' ? 'abcdefgh' : ($errorMode === 'mismatch' ? 'Minhasenha1@' : '') ?>"
                         class="flex-1 bg-transparent font-body text-body-lg text-primary-600 placeholder:text-neutral-500 focus:outline-none">
                  <button type="button" data-login-action="toggle-password" data-target="cadastro-senha" aria-label="Mostrar senha"
                          class="inline-flex items-center justify-center size-7 -mr-1 text-neutral-500 hover:text-primary-600 transition-colors rounded-full">
                    <svg data-icon="show" class="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                    </svg>
                    <svg data-icon="hide" class="size-4 hidden" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
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

              <?php
                $senhaInicial = $errorMode === 'fraca' ? 'abcdefgh' : ($errorMode === 'mismatch' ? 'Minhasenha1@' : '');
                get_template_part('components/_partials/password-strength', null, [
                  'inputId' => 'cadastro-senha',
                  'value'   => $senhaInicial,
                ]);
              ?>
            </div>

            <!-- Confirmar senha -->
            <label class="flex flex-col w-full">
              <span class="flex items-center gap-0.5 px-1 pb-1 font-body font-semibold text-label-lg <?= $confirmError ? 'text-red-600' : 'text-neutral-950' ?>">
                Confirmar senha<span aria-hidden="true">*</span>
              </span>
              <div class="flex items-center h-10 px-3 rounded-sm border bg-white transition-colors <?= $confirmError ? 'border-red-600' : 'border-neutral-100 focus-within:border-secondary-950' ?>" data-password-field>
                <input type="password" name="confirmar_senha" id="cadastro-confirmar" required autocomplete="new-password"
                       value="<?= $errorMode === 'mismatch' ? 'outrasenha456' : '' ?>"
                       class="flex-1 bg-transparent font-body text-body-lg text-primary-600 placeholder:text-neutral-500 focus:outline-none">
                <button type="button" data-login-action="toggle-password" data-target="cadastro-confirmar" aria-label="Mostrar senha"
                        class="inline-flex items-center justify-center size-7 -mr-1 text-neutral-500 hover:text-primary-600 transition-colors rounded-full">
                  <svg data-icon="show" class="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                  </svg>
                  <svg data-icon="hide" class="size-4 hidden" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
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

            <!-- Checkboxes -->
            <div class="flex flex-col w-full">
              <label class="flex items-start gap-3 cursor-pointer group py-2">
                <input type="checkbox" name="termos" required class="sr-only">
                <span class="inline-flex items-center justify-center size-[18px] rounded-xs border-2 mt-1 shrink-0 transition-colors
                             <?= $termosError ? 'border-red-600' : 'border-neutral-950' ?>
                             group-has-[:checked]:bg-primary-600 group-has-[:checked]:border-primary-600">
                  <svg class="size-3 text-white opacity-0 group-has-[:checked]:opacity-100" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                </span>
                <span class="flex-1 font-body text-body-md text-neutral-950">
                  Li e aceito os <a href="#" class="font-bold text-secondary-950">Termos de Uso</a> e a <a href="#" class="font-bold text-secondary-950">Política de Privacidade</a>
                </span>
              </label>

              <label class="flex items-start gap-3 cursor-pointer group py-2">
                <input type="checkbox" name="marketing" class="sr-only">
                <span class="inline-flex items-center justify-center size-[18px] rounded-xs border-2 border-neutral-950 mt-1 shrink-0 transition-colors group-has-[:checked]:bg-primary-600 group-has-[:checked]:border-primary-600">
                  <svg class="size-3 text-white opacity-0 group-has-[:checked]:opacity-100" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                </span>
                <span class="flex-1 font-body text-body-md text-neutral-950">
                  Quero receber comunicações e novidades da Informa Markets
                </span>
              </label>

              <?php if ($termosError): ?>
                <p class="mt-1 px-1 flex items-center gap-1.5 font-body font-semibold text-label-md text-red-600">
                  <svg class="size-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                  <?= $termosError ?>
                </p>
              <?php endif; ?>
            </div>

          <?php else: ?>
            <!-- ============== STEP 3: Perfil ============== -->
            <input type="hidden" name="email" value="<?= htmlspecialchars($emailParam) ?>">

            <?php
            $fields = [
              ['name' => 'nome',     'label' => 'Nome completo', 'type' => 'text', 'placeholder' => '',                              'autocomplete' => 'name'],
              ['name' => 'telefone', 'label' => 'Telefone',      'type' => 'tel',  'placeholder' => '(00) 00000-0000',               'autocomplete' => 'tel'],
              ['name' => 'empresa',  'label' => 'Empresa',       'type' => 'text', 'placeholder' => 'Ex.: Informa Markets Brasil',   'autocomplete' => 'organization'],
            ];
            foreach ($fields as $f):
            ?>
              <label class="flex flex-col w-full">
                <span class="flex items-center gap-0.5 px-1 pb-1 font-body font-semibold text-label-lg <?= $campoVazioError ? 'text-red-600' : 'text-neutral-950' ?>">
                  <?= $f['label'] ?><span aria-hidden="true">*</span>
                </span>
                <div class="flex items-center h-10 px-3 rounded-sm border bg-white transition-colors <?= $campoVazioError ? 'border-red-600' : 'border-neutral-100 focus-within:border-secondary-950' ?>">
                  <input type="<?= $f['type'] ?>" name="<?= $f['name'] ?>" required
                         autocomplete="<?= $f['autocomplete'] ?>"
                         placeholder="<?= htmlspecialchars($f['placeholder']) ?>"
                         class="flex-1 bg-transparent font-body text-body-lg text-primary-600 placeholder:text-neutral-500 focus:outline-none">
                </div>
              </label>
            <?php endforeach; ?>

            <?php
            $selects = [
              ['name' => 'cargo', 'label' => 'Cargo', 'placeholder' => 'Selecione seu cargo',
                'options' => ['Diretor(a)', 'Gerente', 'Coordenador(a)', 'Analista', 'Consultor(a)', 'Outro']],
              ['name' => 'setor', 'label' => 'Setor', 'placeholder' => 'Selecione o setor principal',
                'options' => ['Agro', 'Alimentos & Bebidas', 'Embalagens', 'Saúde', 'Logística', 'Varejo', 'Tecnologia', 'Outro']],
            ];
            foreach ($selects as $s):
            ?>
              <label class="flex flex-col w-full">
                <span class="flex items-center gap-0.5 px-1 pb-1 font-body font-semibold text-label-lg <?= $campoVazioError ? 'text-red-600' : 'text-neutral-950' ?>">
                  <?= $s['label'] ?><span aria-hidden="true">*</span>
                </span>
                <div class="relative flex items-center h-10 px-3 rounded-sm border bg-white transition-colors <?= $campoVazioError ? 'border-red-600' : 'border-neutral-100 focus-within:border-secondary-950' ?>">
                  <select name="<?= $s['name'] ?>" required
                          class="flex-1 appearance-none bg-transparent font-body text-body-lg text-neutral-500 focus:text-primary-600 focus:outline-none pr-7">
                    <option value="" disabled selected><?= $s['placeholder'] ?></option>
                    <?php foreach ($s['options'] as $opt): ?>
                      <option value="<?= htmlspecialchars($opt) ?>"><?= $opt ?></option>
                    <?php endforeach; ?>
                  </select>
                  <svg class="size-4 absolute right-3 text-neutral-500 pointer-events-none" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M7 10l5 5 5-5z"/>
                  </svg>
                </div>
              </label>
            <?php endforeach; ?>

          <?php endif; ?>

          <!-- Btn-area -->
          <div class="flex items-center <?= $prevStep ? 'justify-between' : 'justify-end' ?> w-full">
            <?php if ($prevStep): ?>
              <a href="<?= $prevStep ?>"
                 class="inline-flex items-center gap-2 px-4 py-2 -ml-2 rounded-full font-body font-bold text-body-lg text-primary-600 hover:bg-neutral-50 transition-colors">
                <svg class="size-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                </svg>
                Voltar
              </a>
            <?php endif; ?>

            <button type="submit"
                    class="inline-flex items-center gap-2 pl-5 pr-4 py-2 rounded-full bg-primary-600 hover:bg-secondary-950 text-white font-body font-bold text-body-lg transition-colors">
              <?= $primaryCTA ?>
              <svg class="size-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M4 11h12.17l-5.59-5.59L12 4l8 8-8 8-1.41-1.41L16.17 13H4v-2z"/>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Bottom: account (apenas no step 1) -->
    <?php if ($step === 1): ?>
      <div class="flex justify-center items-center gap-1 w-full font-body text-body-md">
        <span class="text-neutral-700">Já tem uma conta?</span>
        <a href="/src/layouts/login.php" class="font-bold text-secondary-950 hover:underline">Entrar</a>
      </div>
    <?php else: ?>
      <div class="w-full"></div>
    <?php endif; ?>

  </section>

  <!-- ============================================================
       Split-right — proof panel minimal (variante por step)
       ============================================================ -->
  <?php get_template_part('components/_partials/proof-panel-minimal', null, ['variant' => $proofVariant]); ?>

</div>

<!-- ============================================================
     Dev navigator: step + estados de erro
     ============================================================ -->
<div class="fixed bottom-4 left-1/2 -translate-x-1/2 flex flex-col gap-1.5 items-center
            bg-white/95 backdrop-blur-sm border border-neutral-100 rounded-2xl px-4 py-2
            shadow-md z-50 font-body text-label-md">
  <div class="flex flex-wrap gap-1.5 justify-center">
    <span class="text-neutral-500 self-center pr-1">Step:</span>
    <?php foreach ([1, 2, 3] as $s): ?>
      <a href="?step=<?= $s ?>&email=<?= urlencode($emailParam) ?>"
         class="px-2.5 py-1 rounded-full transition-colors <?= $s === $step ? 'bg-primary-600 text-white' : 'text-neutral-700 hover:bg-neutral-50' ?>">
        <?= $s ?>
      </a>
    <?php endforeach; ?>
  </div>
  <div class="flex flex-wrap gap-1.5 justify-center">
    <span class="text-neutral-500 self-center pr-1">Erro:</span>
    <?php foreach ($validErrors as $s): ?>
      <a href="?step=<?= $step ?>&error=<?= $s ?>&email=<?= urlencode($emailParam) ?>"
         class="px-2.5 py-1 rounded-full transition-colors <?= $s === $errorMode ? 'bg-primary-600 text-white' : 'text-neutral-700 hover:bg-neutral-50' ?>">
        <?= $s ?>
      </a>
    <?php endforeach; ?>
  </div>
</div>

<script type="module" src="/src/assets/js/interactions.js"></script>
