<?php
/**
 * Layout: Meus Dados — LGPD Portabilidade (Art. 18 V)
 * Acessado via dashboard-perfil-v3.php?tab=conta → "Baixar meus dados"
 *
 * Padrão: card único com heading + descrição + divisor + linha de download.
 * Inspirado no padrão "Conta Globo / Baixar dados pessoais": ação direta,
 * sem multi-step, sem seletor de formato, sem histórico.
 *
 * Tokens: primary-600, secondary-500/950, neutral-100/700/900, white
 * Anim:   animate-fade-up-sm
 */

$activeCategory = null;
require_once __DIR__ . '/_session.php';
$headerArgs['userLoggedIn'] = true;
$headerArgs['userName']     = 'Mariana Albuquerque';
$headerArgs['userEmail']    = 'mariana.albuquerque@empresa.com.br';
$headerArgs['userInitials'] = 'MA';

$queryExtra = isset($_GET['user']) ? '&user=' . htmlspecialchars($_GET['user']) : '';
$firstName = trim(strtok($headerArgs['userName'] ?? '', ' ')) ?: 'Olá';
?>
<main class="bg-white min-h-screen flex flex-col">

  <?php get_template_part('components/_partials/header-desktop', null, $headerArgs); ?>

  <div class="flex-1 max-w-screen-xl mx-auto w-full px-4 lg:px-6 py-10">

    <!-- Voltar -->
    <div class="animate-fade-up-sm">
      <a href="/src/layouts/dashboard-perfil-v3.php?tab=conta<?= $queryExtra ?>"
         class="inline-flex items-center gap-2 -ml-3 px-3 py-2.5 rounded-full font-body font-bold text-label-lg text-primary-600 hover:bg-neutral-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2">
        <svg class="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
        Voltar para minha conta
      </a>
    </div>

    <!-- ============== Card único ============== -->
    <section class="mt-8 max-w-3xl bg-secondary-500/5 rounded-lg px-8 py-8 animate-fade-up-sm" style="animation-delay: 60ms;">

      <header class="flex flex-col gap-4 max-w-[60ch]">
        <h1 class="font-display font-bold text-headline-md text-primary-600">
          Baixar dados pessoais
        </h1>
        <div class="flex flex-col gap-3 font-body text-body-lg text-neutral-900">
          <p>Você pode fazer o download de uma cópia de seus dados a qualquer momento.</p>
          <p>Clique no botão "Baixar" para que o download seja efetuado.</p>
        </div>
      </header>

      <div class="my-8 h-px bg-neutral-100"></div>

      <div class="flex flex-col md:flex-row md:items-center gap-5">
        <!-- Icon tile -->
        <span class="inline-flex items-center justify-center size-12 rounded-lg bg-white shrink-0">
          <svg class="size-6 text-secondary-950" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
          </svg>
        </span>

        <!-- Text -->
        <div class="flex-1 min-w-0 max-w-[55ch]">
          <h2 class="font-display font-bold text-title-lg text-primary-600">Dados pessoais</h2>
          <p class="mt-1 font-body text-body-md text-neutral-700">
            <?= htmlspecialchars($firstName) ?>, baixe todos os seus dados pessoais cadastrados em nosso site.
          </p>
        </div>

        <!-- Baixar -->
        <a href="#" download
           class="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full border-[1.5px] border-secondary-950 bg-white hover:bg-secondary-500/10 text-secondary-950 font-body font-bold text-body-lg transition-colors shrink-0 md:self-auto self-start
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2">
          <svg class="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
          </svg>
          Baixar
        </a>
      </div>

    </section>

  </div>

  <?php get_template_part('components/_partials/footer-desktop', null, []); ?>

</main>

<script type="module" src="/src/assets/js/interactions.js"></script>
