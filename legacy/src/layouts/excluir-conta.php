<?php
/**
 * Layout: Excluir Conta — LGPD Direito ao Esquecimento (Art. 18 IX)
 * Acessado via dashboard-perfil-v3.php?tab=conta → "Excluir minha conta"
 *
 * Fluxo multi-step de alta-fricção INTENCIONAL — proteção contra cliques
 * acidentais, mas sem ser punitivo. Tom: calmo, transparente, respeitoso.
 *
 * Steps via ?step=:
 *   intro   → educação: o que será excluído / o que mantemos / alternativas
 *   sent    → e-mail de verificação enviado
 *   marked  → conta marcada para exclusão em 30 dias (com cancelamento)
 *   cancel  → exclusão cancelada com sucesso
 *
 * Modal sobreposto ao intro via ?modal=confirm:
 *   form de confirmação — motivo + digitar EXCLUIR + checkbox + CTA red
 *
 * Decisões de design:
 *   - Tom não-punitivo. "Você tem o direito" > "Tem certeza?"
 *   - Step intro mostra duas colunas: o que sai vs o que fica (transparência total)
 *   - Confirmação isolada em modal (foco) com digitação de "EXCLUIR" como gate
 *   - CTA "Voltar e ficar" recebe peso visual primário; "Continuar a exclusão"
 *     em link sublinhado vermelho — escolha segura é a default visualmente
 *   - Botão destrutivo dentro do modal em red-600 — dá peso à ação irreversível
 *   - Step marked mostra countdown como display gigante, não como warning frenético
 *   - Sem ícones de "perigo" piscando, sem cor vermelha invasiva nos backgrounds
 *
 * Tokens: primary-100/600, secondary-950, neutral-50/100/500/700/900/950,
 *         red-600/700, amber-50/700, green-50/700, white
 * Anim:   animate-fade-up-sm staggered (0/60/120/180ms)
 */

$activeCategory = null;
require_once __DIR__ . '/_session.php';
$headerArgs['userLoggedIn'] = true;
$headerArgs['userName']     = 'Mariana Albuquerque';
$headerArgs['userEmail']    = 'mariana.albuquerque@empresa.com.br';
$headerArgs['userInitials'] = 'MA';

$step = $_GET['step'] ?? 'intro';
$allowedSteps = ['intro', 'sent', 'marked', 'cancel'];
if (!in_array($step, $allowedSteps, true)) $step = 'intro';

// Modal de confirmação (sobreposto, acionado a partir do intro)
$showConfirmModal = ($_GET['modal'] ?? null) === 'confirm';

$queryExtra = isset($_GET['user']) ? '&user=' . htmlspecialchars($_GET['user']) : '';
$userParam  = isset($_GET['user']) ? htmlspecialchars($_GET['user']) : '';

// Para step=marked: data de exclusão = hoje (2026-04-29) + 30 dias = 2026-05-29
$deletionDate = '29 de maio de 2026';
$daysRemaining = 30;
?>
<main class="bg-white min-h-screen flex flex-col">

  <?php get_template_part('components/_partials/header-desktop', null, $headerArgs); ?>

  <div class="flex-1 max-w-screen-xl mx-auto w-full px-4 lg:px-6 py-10">

    <!-- Voltar -->
    <div class="animate-fade-up-sm">
      <a href="<?= $step === 'intro' ? '/src/layouts/dashboard-perfil-v3.php?tab=conta' . $queryExtra : '?step=intro' . $queryExtra ?>"
         class="inline-flex items-center gap-2 -ml-3 px-3 py-2.5 rounded-full font-body font-bold text-label-lg text-primary-600 hover:bg-neutral-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2">
        <svg class="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
        <?= $step === 'intro' ? 'Voltar para minha conta' : 'Voltar' ?>
      </a>
    </div>

    <?php if ($step === 'intro'): ?>
      <!-- ============================================================
           STEP 1: INTRO — educação + alternativas
           ============================================================ -->
      <header class="mt-8 max-w-[60ch] animate-fade-up-sm" style="animation-delay: 60ms;">
        <p class="font-body font-semibold text-label-md tracking-wider text-secondary-950 uppercase">LGPD · Art. 18 IX</p>
        <h1 class="mt-2 font-display font-bold text-headline-lg text-primary-600 leading-tight">
          Excluir sua conta.
        </h1>
        <p class="mt-4 font-body text-body-lg text-neutral-900">
          Você tem o direito ao esquecimento. Sem perguntas, sem retenção desnecessária. Antes de continuar, veja exatamente o que vai acontecer.
        </p>
      </header>

      <!-- Duas colunas: o que sai vs o que fica -->
      <section class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-up-sm" style="animation-delay: 120ms;">
        <div>
          <h2 class="font-display font-bold text-title-xl text-primary-600">
            O que será excluído
          </h2>
          <p class="mt-1 font-body text-body-md text-neutral-700 max-w-[50ch]">
            Definitivamente, em até 30 dias após a confirmação.
          </p>
          <ul class="mt-5 flex flex-col gap-3 font-body text-body-md text-neutral-900 max-w-[55ch]">
            <?php foreach ([
              'Dados pessoais — nome, e-mail, telefone, endereço',
              'Histórico de leituras, downloads e favoritos',
              'Newsletters e preferências de comunicação',
              'Sessões ativas em todos os dispositivos',
              'Comentários e contribuições editoriais',
            ] as $item): ?>
              <li class="flex items-start gap-3">
                <svg class="size-5 mt-0.5 shrink-0 text-red-700" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19 13H5v-2h14v2z"/>
                </svg>
                <span><?= htmlspecialchars($item) ?></span>
              </li>
            <?php endforeach; ?>
          </ul>
        </div>

        <div>
          <h2 class="font-display font-bold text-title-xl text-primary-600">
            O que mantemos por lei
          </h2>
          <p class="mt-1 font-body text-body-md text-neutral-700 max-w-[50ch]">
            Obrigações legais que sobrevivem à exclusão — sem identificação pessoal.
          </p>
          <ul class="mt-5 flex flex-col gap-3 font-body text-body-md text-neutral-900 max-w-[55ch]">
            <?php foreach ([
              ['main' => 'Registros fiscais e financeiros', 'sub' => '5 anos · LGPD Art. 16'],
              ['main' => 'Logs de acesso anonimizados',     'sub' => '6 meses · Marco Civil da Internet'],
              ['main' => 'Estatísticas agregadas',          'sub' => 'Sem identificação possível'],
            ] as $item): ?>
              <li class="flex items-start gap-3">
                <svg class="size-5 mt-0.5 shrink-0 text-secondary-950" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                </svg>
                <div class="flex flex-col">
                  <span><?= htmlspecialchars($item['main']) ?></span>
                  <span class="font-body text-body-sm text-neutral-500"><?= htmlspecialchars($item['sub']) ?></span>
                </div>
              </li>
            <?php endforeach; ?>
          </ul>
        </div>
      </section>

      <!-- Alternativas -->
      <section class="mt-16 max-w-[80ch] animate-fade-up-sm" style="animation-delay: 180ms;">
        <header class="mb-6 max-w-[60ch]">
          <h2 class="font-display font-bold text-title-xl text-primary-600">
            Antes de excluir, considere
          </h2>
          <p class="mt-1 font-body text-body-md text-neutral-700">
            Talvez uma dessas opções resolva sem precisar excluir tudo.
          </p>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <?php foreach ([
            ['title' => 'Parar de receber e-mails',   'desc' => 'Cancele opt-ins por canal sem perder a conta.', 'href' => '/src/layouts/dashboard-perfil-v3.php?tab=newsletter' . $queryExtra, 'cta' => 'Gerenciar newsletters'],
            ['title' => 'Remover dados específicos',  'desc' => 'Edite ou apague campos do perfil individualmente.', 'href' => '/src/layouts/dashboard-perfil-v3.php?tab=perfil' . $queryExtra, 'cta' => 'Editar perfil'],
            ['title' => 'Baixar tudo antes',          'desc' => 'Solicite uma cópia completa em JSON ou CSV.', 'href' => '/src/layouts/meus-dados.php' . ($queryExtra ? '?' . ltrim($queryExtra, '&') : ''), 'cta' => 'Baixar meus dados'],
          ] as $alt): ?>
            <a href="<?= htmlspecialchars($alt['href']) ?>"
               class="group flex flex-col gap-2 p-5 rounded-lg border border-neutral-100 bg-white hover:border-secondary-950 transition-colors">
              <h3 class="font-display font-bold text-title-md text-primary-600 group-hover:text-secondary-950 transition-colors">
                <?= htmlspecialchars($alt['title']) ?>
              </h3>
              <p class="font-body text-body-md text-neutral-700"><?= htmlspecialchars($alt['desc']) ?></p>
              <span class="mt-auto pt-2 inline-flex items-center gap-1 font-body font-bold text-label-md text-secondary-950 w-fit">
                <?= htmlspecialchars($alt['cta']) ?>
                <svg class="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                </svg>
              </span>
            </a>
          <?php endforeach; ?>
        </div>
      </section>

      <!-- CTA bar — Voltar e ficar (Ghost Medium, à esquerda) | Continuar a exclusão (Outlined Red Medium, à direita) -->
      <section class="mt-16 flex flex-wrap items-center gap-3 animate-fade-up-sm" style="animation-delay: 240ms;">
        <a href="/src/layouts/dashboard-perfil-v3.php?tab=conta<?= $queryExtra ?>"
           class="inline-flex items-center justify-center h-10 px-6 rounded-full bg-transparent text-primary-600 hover:bg-neutral-50 font-body font-bold text-body-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2">
          Voltar e ficar
        </a>
        <a href="?modal=confirm<?= $queryExtra ?>"
           class="inline-flex items-center justify-center h-10 px-6 rounded-full border-[1.5px] border-red-600 bg-white hover:bg-red-50 text-red-700 font-body font-bold text-body-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2">
          Continuar a exclusão
        </a>
      </section>

    <?php elseif ($step === 'sent'): ?>
      <!-- ============================================================
           STEP 3: SENT — e-mail de verificação enviado
           ============================================================ -->
      <div class="mt-12 max-w-[60ch] animate-fade-up-sm" style="animation-delay: 60ms;">
        <div class="inline-flex items-center justify-center size-12 rounded-full bg-secondary-500/10 text-secondary-950">
          <svg class="size-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
        </div>
        <h1 class="mt-6 font-display font-bold text-headline-lg text-primary-600 leading-tight">
          Confira sua caixa de entrada.
        </h1>
        <p class="mt-4 font-body text-body-lg text-neutral-900">
          Enviamos um link de verificação para <strong class="font-bold">mariana.albuquerque@empresa.com.br</strong>. Clique no link para iniciar o processo de exclusão. O link expira em <strong class="font-bold">24 horas</strong>.
        </p>
        <p class="mt-3 font-body text-body-md text-neutral-700">
          Se você não confirmou esta solicitação, pode ignorar o e-mail — sua conta não será afetada.
        </p>
        <div class="mt-8 flex flex-wrap items-center gap-4">
          <a href="/src/layouts/dashboard-perfil-v3.php?tab=conta<?= $queryExtra ?>"
             class="inline-flex items-center justify-center h-12 px-6 rounded-full bg-primary-600 hover:bg-secondary-950 text-white font-body font-bold text-body-lg transition-colors">
            Voltar para minha conta
          </a>
          <a href="?step=marked<?= $queryExtra ?>" class="font-body text-label-md text-neutral-400 hover:text-neutral-700 underline">
            [Simular clique no link do e-mail]
          </a>
        </div>
      </div>

    <?php elseif ($step === 'marked'): ?>
      <!-- ============================================================
           STEP 4: MARKED — conta marcada, 30 dias para cancelar
           ============================================================ -->
      <header class="mt-8 max-w-[60ch] animate-fade-up-sm" style="animation-delay: 60ms;">
        <p class="font-body font-semibold text-label-md tracking-wider text-amber-700 uppercase">Conta marcada para exclusão</p>
        <h1 class="mt-2 font-display font-bold text-headline-lg text-primary-600 leading-tight">
          Sua conta será excluída em <span class="text-amber-700"><?= $deletionDate ?></span>.
        </h1>
        <p class="mt-4 font-body text-body-lg text-neutral-900">
          Faltam <strong class="font-bold"><?= $daysRemaining ?> dias</strong>. Você pode cancelar a qualquer momento até essa data e sua conta volta ao normal sem perder nada.
        </p>
      </header>

      <!-- Status durante o período -->
      <section class="mt-12 max-w-[80ch] flex flex-col gap-6 px-6 py-8 rounded-lg bg-amber-50 animate-fade-up-sm" style="animation-delay: 120ms;">
        <h2 class="font-display font-bold text-title-xl text-primary-600">
          Durante esses 30 dias
        </h2>
        <ul class="flex flex-col gap-3 font-body text-body-md text-neutral-900 max-w-[60ch]">
          <li class="flex items-start gap-3">
            <svg class="size-5 mt-0.5 shrink-0 text-amber-700" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
            </svg>
            <span>Suas sessões continuam ativas — você pode acessar normalmente.</span>
          </li>
          <li class="flex items-start gap-3">
            <svg class="size-5 mt-0.5 shrink-0 text-amber-700" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
            </svg>
            <span>Você não receberá mais newsletters, comunicações ou convites.</span>
          </li>
          <li class="flex items-start gap-3">
            <svg class="size-5 mt-0.5 shrink-0 text-amber-700" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
            </svg>
            <span>Cancelar a exclusão é instantâneo — basta clicar no botão abaixo.</span>
          </li>
        </ul>
      </section>

      <!-- CTAs -->
      <section class="mt-12 flex flex-wrap items-center gap-4 animate-fade-up-sm" style="animation-delay: 180ms;">
        <a href="?step=cancel<?= $queryExtra ?>"
           class="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-primary-600 hover:bg-secondary-950 text-white font-body font-bold text-body-lg transition-colors">
          Cancelar exclusão e continuar
        </a>
        <a href="/src/layouts/home.php"
           class="font-body font-bold text-body-md text-neutral-700 hover:text-primary-600 transition-colors">
          Sair agora
        </a>
      </section>

    <?php elseif ($step === 'cancel'): ?>
      <!-- ============================================================
           STEP 5: CANCEL — exclusão cancelada com sucesso
           ============================================================ -->
      <div class="mt-12 max-w-[60ch] animate-fade-up-sm" style="animation-delay: 60ms;">
        <div class="inline-flex items-center justify-center size-12 rounded-full bg-green-50 text-green-700">
          <svg class="size-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
        </div>
        <h1 class="mt-6 font-display font-bold text-headline-lg text-primary-600 leading-tight">
          Tudo certo. Sua conta voltou ao normal.
        </h1>
        <p class="mt-4 font-body text-body-lg text-neutral-900">
          A solicitação de exclusão foi cancelada. Bem-vinda de volta — seus dados, históricos e preferências estão intactos.
        </p>
        <div class="mt-8">
          <a href="/src/layouts/dashboard-perfil-v3.php?tab=conta<?= $queryExtra ?>"
             class="inline-flex items-center justify-center h-12 px-6 rounded-full bg-primary-600 hover:bg-secondary-950 text-white font-body font-bold text-body-lg transition-colors">
            Ir para minha conta
          </a>
        </div>
      </div>
    <?php endif; ?>

  </div>

  <?php get_template_part('components/_partials/footer-desktop', null, []); ?>

</main>

<?php if ($showConfirmModal): ?>
  <!-- ============================================================
       MODAL: Confirmação de exclusão (sobreposto, focus mode)
       ============================================================ -->
  <div class="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="confirm-modal-title">
    <!-- Scrim (clique fora fecha) -->
    <a href="?step=intro<?= $queryExtra ?>"
       class="absolute inset-0 bg-[#050708]/40 cursor-pointer animate-fade-in"
       aria-label="Fechar"></a>

    <!-- Dialog wrapper centralizado (pointer-events-none deixa cliques caírem no scrim) -->
    <div class="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
      <div class="relative bg-white rounded-2xl shadow-xl w-full max-w-[640px] max-h-[90vh] overflow-y-auto pointer-events-auto animate-fade-up-sm">

        <!-- Top: título + close -->
        <div class="flex items-start gap-4 px-8 pt-8 pb-2">
          <div class="flex-1 min-w-0">
            <h2 id="confirm-modal-title" class="font-display font-bold text-headline-md text-primary-600 leading-tight">
              Excluir conta
            </h2>
          </div>
          <a href="?step=intro<?= $queryExtra ?>"
             aria-label="Fechar"
             class="inline-flex items-center justify-center size-10 rounded-full text-primary-600 hover:bg-neutral-50 transition-colors shrink-0">
            <svg class="size-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </a>
        </div>

        <p class="px-8 font-body text-body-lg text-neutral-900">
          Você tem <strong class="font-bold">30 dias para cancelar</strong> após confirmar. Vamos enviar um e-mail para garantir que é você.
        </p>

        <form action="/src/layouts/excluir-conta.php" method="get"
              class="mt-8 px-8 pb-8 flex flex-col gap-6" novalidate>
          <input type="hidden" name="step" value="sent">
          <?php if ($userParam !== ''): ?>
            <input type="hidden" name="user" value="<?= $userParam ?>">
          <?php endif; ?>

          <!-- Motivo (opcional) -->
          <label class="flex flex-col w-full">
            <span class="flex items-center gap-1 px-1 pb-1 font-body font-semibold text-label-lg text-neutral-950">
              Por que está saindo?
              <span class="font-body font-normal text-label-md text-neutral-500 ml-1">(opcional)</span>
            </span>
            <span class="px-1 pb-2 font-body text-body-md text-neutral-700">
              Sua resposta nos ajuda a melhorar o produto. Não muda nada na exclusão.
            </span>
            <div class="relative flex items-center h-10 px-3 rounded-sm border border-neutral-100 bg-white focus-within:border-secondary-950 transition-colors">
              <select name="motivo" class="flex-1 appearance-none bg-transparent font-body text-body-lg text-primary-600 focus:outline-none pr-7">
                <option value="">Selecione um motivo</option>
                <option>Não uso mais</option>
                <option>O conteúdo não é relevante para mim</option>
                <option>Preocupações com privacidade</option>
                <option>Recebo muitos e-mails</option>
                <option>Encontrei outra solução</option>
                <option>Outro motivo</option>
              </select>
              <svg class="size-4 absolute right-3 text-neutral-500 pointer-events-none" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M7 10l5 5 5-5z"/>
              </svg>
            </div>
          </label>

          <!-- Digite EXCLUIR -->
          <label class="flex flex-col w-full">
            <span class="flex items-center gap-0.5 px-1 pb-1 font-body font-semibold text-label-lg text-neutral-950">
              Digite <code class="font-mono font-bold text-red-700 bg-red-50 px-1.5 py-0.5 rounded-xs">EXCLUIR</code> para confirmar
            </span>
            <div class="flex items-center h-10 px-3 rounded-sm border border-neutral-100 bg-white focus-within:border-red-600 transition-colors">
              <input type="text" name="confirma" required autocomplete="off"
                     placeholder="Digite EXCLUIR (em maiúsculas)"
                     pattern="EXCLUIR"
                     class="flex-1 bg-transparent font-body text-body-lg text-primary-600 placeholder:text-neutral-500 focus:outline-none">
            </div>
          </label>

          <!-- Checkbox de irreversibilidade -->
          <label class="flex items-start gap-3 cursor-pointer group">
            <input type="checkbox" name="entendi" required class="sr-only peer">
            <span class="inline-flex items-center justify-center size-[18px] rounded-xs border-2 border-neutral-950 mt-1 shrink-0 transition-colors peer-checked:bg-primary-600 peer-checked:border-primary-600">
              <svg class="size-3 text-white opacity-0 peer-checked:opacity-100" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            </span>
            <span class="flex-1 font-body text-body-md text-neutral-900">
              Entendo que após 30 dias da confirmação, esta ação <strong class="font-bold">não pode ser desfeita</strong> e que parte dos meus dados pode ser mantida por obrigação legal.
            </span>
          </label>

          <!-- CTAs do modal — Ghost Cancelar + Filled Red Confirmar, ambos Medium, alinhados à direita gap-2 (8px) -->
          <div class="flex flex-wrap items-center justify-end gap-2 mt-2 pt-4 border-t border-neutral-50">
            <a href="?step=intro<?= $queryExtra ?>"
               class="inline-flex items-center justify-center h-10 px-6 rounded-full bg-transparent text-primary-600 hover:bg-neutral-50 font-body font-bold text-body-lg transition-colors">
              Cancelar
            </a>
            <button type="submit"
                    class="inline-flex items-center justify-center h-10 px-6 rounded-full bg-red-600 hover:bg-red-700 text-white font-body font-bold text-body-lg transition-colors">
              Confirmar exclusão
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
<?php endif; ?>

<!-- Dev navigator -->
<div class="fixed bottom-4 left-1/2 -translate-x-1/2 flex flex-wrap gap-1.5 justify-center
            bg-white/95 backdrop-blur-sm border border-neutral-100 rounded-full px-3 py-1.5
            shadow-md z-50 font-body text-label-md">
  <span class="text-neutral-500 self-center pr-1">Step:</span>
  <?php foreach ($allowedSteps as $s): ?>
    <a href="?step=<?= $s . $queryExtra ?>"
       class="px-2.5 py-1 rounded-full transition-colors <?= ($s === $step && !$showConfirmModal) ? 'bg-primary-600 text-white' : 'text-neutral-700 hover:bg-neutral-50' ?>">
      <?= $s ?>
    </a>
  <?php endforeach; ?>
  <span class="text-neutral-200 self-center px-0.5">·</span>
  <a href="?step=intro&modal=confirm<?= $queryExtra ?>"
     class="px-2.5 py-1 rounded-full transition-colors <?= $showConfirmModal ? 'bg-red-600 text-white' : 'text-red-700 hover:bg-red-50' ?>">
    modal
  </a>
</div>

<script type="module" src="/src/assets/js/interactions.js"></script>
