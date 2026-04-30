<?php
/**
 * Layout: Onboarding (3 passos) — v2.0
 * Figma origem: handoff bundle claude.ai/design (XPNP-UV2HoZVzPlYIw44QA)
 *
 * 3 passos navegáveis via ?step=1|2|3:
 *   1 — Perfil profissional (Cargo · Setor · Empresa)
 *   2 — Interesses (chips multi-select de setores)
 *   3 — Pronto (celebração + CTA para dashboard)
 *
 * Sem proof panel (usuário já entrou — foco em conclusão).
 * Backup da v1 em onboarding-v1-backup.php.
 */

require_once __DIR__ . '/_session.php';

$step = (int)($_GET['step'] ?? 1);
if ($step < 1 || $step > 3) $step = 1;

$userQS = isset($_GET['user']) ? '&user=' . htmlspecialchars($_GET['user']) : '';

$setores = [
  'Alimentos & Bebidas', 'Beleza & Cosméticos', 'Saúde & Hospitalar',
  'Tecnologia & Inovação', 'Varejo & E-commerce', 'Logística & Cadeia',
  'Indústria & Manufatura', 'Sustentabilidade & ESG', 'Comunicação & Mídia',
  'Energia', 'Construção', 'Agronegócio',
];

$cargos = [
  'Diretor(a)', 'Gerente', 'Coordenador(a)', 'Analista', 'Especialista',
  'Consultor(a)', 'CEO / Founder', 'Head', 'Outro',
];

$interessesPre = isset($_GET['i']) && is_array($_GET['i']) ? $_GET['i'] : [];
$interessesCount = count($interessesPre);
?>
<main class="min-h-screen bg-white flex flex-col">

  <!-- Header minimal -->
  <header class="border-b border-neutral-50">
    <div class="max-w-screen-xl mx-auto px-4 lg:px-6 h-20 flex items-center justify-between">
      <a href="/src/layouts/home.php" class="font-display font-bold text-title-xl text-primary-600 tracking-tight">
        canaisdigitais<span class="text-coral">.</span>
      </a>
      <div class="font-body text-label-md text-neutral-500">
        Passo <?= $step ?> de 3
      </div>
    </div>
  </header>

  <section class="flex-1 flex items-start justify-center px-4 py-16">
    <div class="w-full max-w-[520px] flex flex-col gap-8">

      <!-- Progress dots -->
      <div class="flex items-center gap-2" role="progressbar" aria-valuemin="1" aria-valuemax="3" aria-valuenow="<?= $step ?>">
        <?php for ($i = 1; $i <= 3; $i++): ?>
          <div class="inline-flex items-center justify-center size-7 rounded-full font-body font-bold text-label-md transition-colors
                      <?= $i <= $step ? 'bg-primary-600 text-white' : 'bg-neutral-50 text-neutral-700' ?>">
            <?php if ($i < $step): ?>
              <svg class="size-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            <?php else: ?>
              <?= $i ?>
            <?php endif; ?>
          </div>
          <?php if ($i < 3): ?>
          <div class="flex-1 h-0.5 transition-colors <?= $i < $step ? 'bg-primary-600' : 'bg-neutral-50' ?>"></div>
          <?php endif; ?>
        <?php endfor; ?>
      </div>

      <?php if ($step === 1): ?>
        <!-- STEP 1: Perfil profissional -->
        <div class="flex flex-col gap-3">
          <span class="inline-flex w-fit items-center rounded-xs bg-primary-600 text-white px-2 py-1 font-body font-bold text-label-sm uppercase tracking-wider">
            Passo 1 de 3
          </span>
          <h1 class="font-display font-bold text-headline-lg leading-tight tracking-tight text-primary-600">
            Onde você trabalha<span class="text-coral">?</span>
          </h1>
          <p class="font-body text-body-lg text-neutral-900">
            Usamos isso para recomendar matérias, feiras e materiais relevantes para o seu mercado.
          </p>
        </div>

        <form action="?step=2<?= $userQS ?>" method="get" class="flex flex-col gap-5">
          <?php if ($userQS): ?><input type="hidden" name="user" value="<?= htmlspecialchars($_GET['user']) ?>"><?php endif; ?>
          <input type="hidden" name="step" value="2">

          <label class="flex flex-col items-start w-full">
            <div class="flex gap-0.5 items-center pb-1 px-1 w-full">
              <span class="font-body font-semibold text-label-lg text-neutral-950">Empresa</span>
            </div>
            <div class="flex items-center gap-2.5 px-3.5 h-12 w-full bg-white rounded-sm border-[1.5px] border-neutral-100 focus-within:border-secondary-950 transition-colors">
              <svg class="size-5 text-neutral-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
              </svg>
              <input type="text" name="empresa" maxlength="100" placeholder="Ex.: Informa Markets Brasil"
                     class="flex-1 bg-transparent font-body text-body-lg text-primary-600 placeholder:text-neutral-500 focus:outline-none">
            </div>
          </label>

          <label class="flex flex-col items-start w-full">
            <div class="flex gap-0.5 items-center pb-1 px-1 w-full">
              <span class="font-body font-semibold text-label-lg text-neutral-950">Cargo</span>
            </div>
            <div class="relative w-full">
              <select name="cargo" required
                      class="appearance-none w-full h-12 pl-3.5 pr-10 bg-white rounded-sm border-[1.5px] border-neutral-100 focus:border-secondary-950 focus:outline-none font-body text-body-lg text-primary-600 cursor-pointer">
                <option value="" disabled selected>Selecione seu cargo</option>
                <?php foreach ($cargos as $c): ?>
                <option value="<?= $c ?>"><?= $c ?></option>
                <?php endforeach; ?>
              </select>
              <svg class="absolute right-3.5 top-1/2 -translate-y-1/2 size-5 text-neutral-500 pointer-events-none" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/>
              </svg>
            </div>
          </label>

          <label class="flex flex-col items-start w-full">
            <div class="flex gap-0.5 items-center pb-1 px-1 w-full">
              <span class="font-body font-semibold text-label-lg text-neutral-950">Setor</span>
              <span class="font-body font-semibold text-label-lg text-coral">*</span>
            </div>
            <div class="relative w-full">
              <select name="setor" required
                      class="appearance-none w-full h-12 pl-3.5 pr-10 bg-white rounded-sm border-[1.5px] border-neutral-100 focus:border-secondary-950 focus:outline-none font-body text-body-lg text-primary-600 cursor-pointer">
                <option value="" disabled selected>Selecione o setor principal</option>
                <?php foreach ($setores as $s): ?>
                <option value="<?= $s ?>"><?= $s ?></option>
                <?php endforeach; ?>
              </select>
              <svg class="absolute right-3.5 top-1/2 -translate-y-1/2 size-5 text-neutral-500 pointer-events-none" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/>
              </svg>
            </div>
          </label>

          <div class="flex items-center gap-3 mt-3">
            <a href="/src/layouts/dashboard.php?<?= ltrim($userQS, '&') ?>"
               class="inline-flex items-center justify-center h-12 px-5 rounded-full bg-transparent text-primary-600 hover:bg-neutral-50 font-body font-bold text-body-lg transition-colors">
              Pular por agora
            </a>
            <div class="flex-1"></div>
            <button type="submit"
                    class="inline-flex items-center justify-center gap-2 h-12 pl-6 pr-5 rounded-full bg-primary-600 hover:bg-secondary-950 text-white font-body font-bold text-body-lg transition-colors">
              Avançar
              <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </form>

      <?php elseif ($step === 2): ?>
        <!-- STEP 2: Interesses -->
        <div class="flex flex-col gap-3">
          <span class="inline-flex w-fit items-center rounded-xs bg-mint text-white px-2 py-1 font-body font-bold text-label-sm uppercase tracking-wider">
            Passo 2 de 3
          </span>
          <h1 class="font-display font-bold text-headline-lg leading-tight tracking-tight text-primary-600">
            O que te interessa hoje<span class="text-coral">?</span>
          </h1>
          <p class="font-body text-body-lg text-neutral-900">
            Selecione quantos quiser. Isso filtra a home, os e-mails e as recomendações da biblioteca.
          </p>
        </div>

        <form action="?step=3<?= $userQS ?>" method="get" class="flex flex-col gap-5">
          <?php if ($userQS): ?><input type="hidden" name="user" value="<?= htmlspecialchars($_GET['user']) ?>"><?php endif; ?>
          <input type="hidden" name="step" value="3">

          <div class="flex flex-wrap gap-2">
            <?php foreach ($setores as $s):
              $on = in_array($s, $interessesPre, true);
            ?>
            <label class="cursor-pointer group" data-chip>
              <input type="checkbox" name="i[]" value="<?= htmlspecialchars($s, ENT_QUOTES) ?>" <?= $on ? 'checked' : '' ?> class="sr-only peer">
              <div class="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border-[1.5px] transition-colors font-body font-semibold text-title-sm
                          border-neutral-100 text-neutral-950 bg-white
                          peer-checked:bg-primary-600 peer-checked:text-white peer-checked:border-primary-600
                          hover:border-primary-600">
                <svg class="size-3.5 opacity-0 peer-checked:opacity-100 -ml-1" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                <?= $s ?>
              </div>
            </label>
            <?php endforeach; ?>
          </div>

          <div class="flex items-center gap-3 mt-3">
            <a href="?step=1<?= $userQS ?>"
               class="inline-flex items-center justify-center gap-2 h-12 px-5 rounded-full bg-transparent text-primary-600 border-[1.5px] border-primary-600 hover:bg-neutral-50 font-body font-bold text-body-lg transition-colors">
              <svg class="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
              Voltar
            </a>
            <div class="flex-1"></div>
            <button type="submit"
                    class="inline-flex items-center justify-center gap-2 h-12 pl-6 pr-5 rounded-full bg-primary-600 hover:bg-secondary-950 text-white font-body font-bold text-body-lg transition-colors">
              Avançar<?= $interessesCount ? ' (' . $interessesCount . ')' : '' ?>
              <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </form>

      <?php else: ?>
        <!-- STEP 3: Pronto -->
        <div class="flex flex-col items-center text-center gap-5 py-6">
          <span class="inline-flex items-center justify-center size-20 rounded-full bg-mint/15 text-mint">
            <svg class="size-10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M4.5 9.5A2.5 2.5 0 1 1 7 7a2.5 2.5 0 0 1-2.5 2.5zm13 0A2.5 2.5 0 1 0 15 7a2.5 2.5 0 0 0 2.5 2.5zm-13 7A2.5 2.5 0 1 1 7 14a2.5 2.5 0 0 1-2.5 2.5zm13 0a2.5 2.5 0 1 0-2.5-2.5 2.5 2.5 0 0 0 2.5 2.5zm-6.5 5a2.5 2.5 0 1 1 2.5-2.5 2.5 2.5 0 0 1-2.5 2.5zm0-19a2.5 2.5 0 1 0 2.5 2.5 2.5 2.5 0 0 0-2.5-2.5z"/>
            </svg>
          </span>
          <h1 class="font-display font-bold text-headline-lg leading-tight tracking-tight text-primary-600">
            Tudo pronto<span class="text-coral">.</span>
          </h1>
          <p class="font-body text-body-lg text-neutral-900 max-w-md">
            Sua conta está ativa. Seu perfil está em <strong class="text-primary-600 font-bold">50%</strong>. Complete os dados restantes quando quiser — alguns desbloqueiam recursos extras.
          </p>
          <a href="/src/layouts/dashboard.php?user=logged"
             class="inline-flex items-center justify-center gap-2 h-12 pl-6 pr-5 rounded-full bg-primary-600 hover:bg-secondary-950 text-white font-body font-bold text-body-lg transition-colors mt-3">
            Ir para meu portal
            <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      <?php endif; ?>

    </div>
  </section>

  <footer class="border-t border-neutral-50 py-6">
    <div class="max-w-screen-xl mx-auto px-4 lg:px-6 flex flex-wrap items-center justify-between gap-4">
      <p class="font-body text-label-md text-neutral-500">© 2026 Informa Markets</p>
      <nav class="flex items-center gap-6">
        <a href="#" class="font-body text-label-md text-neutral-700 hover:text-primary-600">Termos</a>
        <a href="#" class="font-body text-label-md text-neutral-700 hover:text-primary-600">Privacidade</a>
        <a href="#" class="font-body text-label-md text-neutral-700 hover:text-primary-600">Ajuda</a>
      </nav>
    </div>
  </footer>

  <!-- Navegador de passos -->
  <div class="fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-wrap gap-2 justify-center
              bg-white/90 backdrop-blur-sm border border-neutral-100 rounded-full px-4 py-2
              shadow-md z-50 font-body text-label-md">
    <span class="text-neutral-500 self-center pr-1">Passo:</span>
    <?php for ($s = 1; $s <= 3; $s++): ?>
      <a href="?step=<?= $s . $userQS ?>"
         class="px-3 py-1 rounded-full transition-colors <?= $s === $step ? 'bg-primary-600 text-white' : 'text-neutral-600 hover:bg-neutral-50' ?>">
        <?= $s ?>
      </a>
    <?php endfor; ?>
  </div>

</main>

<script type="module" src="/src/assets/js/interactions.js"></script>
