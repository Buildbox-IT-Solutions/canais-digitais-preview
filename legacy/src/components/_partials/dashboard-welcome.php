<?php
/**
 * Partial: Dashboard Welcome — banner compartilhado das abas do dashboard-perfil-v3
 * Figma: 6188:4601
 *
 * Avatar 120px (rounded-full) + camera icon-button 32px overlay + saudação
 * + bloco e-mail + texto multi-portais + botão "Sair" pill ghost.
 *
 * USO:
 *   <?php get_template_part('components/_partials/dashboard-welcome', null, [
 *     'firstName' => 'Mariana',
 *     'email'     => 'mariana.albuquerque@empresa.com.br',
 *     'initials'  => 'MA',
 *     'avatarSrc' => null,                 // null → renderiza initials
 *     'logoutHref'=> '/src/layouts/home.php',
 *   ]); ?>
 *
 * PROPS ($args):
 *   firstName  → string — primeiro nome do usuário
 *   email      → string
 *   initials   → string — fallback de avatar (2 letras)
 *   avatarSrc  → string|null
 *   logoutHref → string — destino do botão Sair
 */

$firstName  = $args['firstName']  ?? 'Mariana';
$email      = $args['email']      ?? '';
$initials   = $args['initials']   ?? 'MA';
$avatarSrc  = $args['avatarSrc']  ?? null;
$logoutHref = $args['logoutHref'] ?? '/src/layouts/home.php';
?>
<div class="bg-white border border-neutral-50 rounded-lg p-6 flex items-start gap-10 w-full">
  <!-- Photo -->
  <div class="relative shrink-0 size-[120px]">
    <?php if ($avatarSrc): ?>
      <img src="<?= htmlspecialchars($avatarSrc) ?>"
           alt="<?= htmlspecialchars($firstName) ?>"
           class="size-[120px] rounded-full object-cover">
    <?php else: ?>
      <div class="size-[120px] rounded-full bg-primary-100 flex items-center justify-center">
        <span class="font-body font-semibold text-display-lg text-primary-600 leading-none">
          <?= htmlspecialchars($initials) ?>
        </span>
      </div>
    <?php endif; ?>
    <button type="button"
            aria-label="Alterar foto de perfil"
            class="absolute bottom-0 right-0 size-8 rounded-full bg-primary-600 text-white inline-flex items-center justify-center hover:bg-secondary-950 transition-colors">
      <svg class="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M9.4 10.5l4.77-8.26C13.47 2.09 12.75 2 12 2c-2.4 0-4.6.85-6.32 2.25l3.66 6.35.06-.1zM21.54 9c-.92-2.92-3.15-5.26-6-6.34L11.88 9h9.66zm.26 1h-7.49l.29.5 4.76 8.25C21 16.97 22 14.61 22 12c0-.69-.07-1.35-.2-2zM8.54 12l-3.9-6.75C3.01 7.03 2 9.39 2 12c0 .69.07 1.35.2 2h7.49l-1.15-2zm-6.08 3c.92 2.92 3.15 5.26 6 6.34L12.12 15H2.46zm11.27 0l-3.9 6.76c.7.15 1.42.24 2.17.24 2.4 0 4.6-.85 6.32-2.25l-3.66-6.35-.93 1.6z"/>
      </svg>
    </button>
  </div>

  <!-- Welcome left -->
  <div class="flex-1 min-w-0 flex flex-col gap-4">
    <h1 class="font-display font-bold text-headline-md text-primary-600">
      Olá, <?= htmlspecialchars($firstName) ?>!
    </h1>
    <div class="flex flex-col gap-2">
      <div class="flex flex-col gap-1">
        <span class="font-body font-bold text-label-md text-neutral-900">
          Seu e-mail
        </span>
        <span class="font-body font-bold text-body-md text-primary-600">
          <?= htmlspecialchars($email) ?>
        </span>
      </div>
      <p class="font-body text-body-sm text-neutral-900">
        Sua conta é válida em todos os portais Informa Markets. Ao acessar outro portal, faça login com o mesmo e-mail e senha.
      </p>
    </div>
  </div>

  <!-- Logout -->
  <a href="<?= htmlspecialchars($logoutHref) ?>"
     class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-primary-600 hover:bg-neutral-50 transition-colors font-body font-bold text-body-md shrink-0">
    <svg class="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
    </svg>
    Sair
  </a>
</div>
