<?php
/**
 * Layout: Confirmação de E-mail — v3.0
 * Figma: — (extensão do sistema login.php v3.0)
 *
 * Fluxo pós-cadastro: o usuário acabou de enviar o cadastro (step 3) e
 * precisa confirmar o e-mail antes de logar pela primeira vez.
 *
 * Estados via ?state=...:
 *   waiting       → aguardando clique no link (default)
 *   success       → link clicado, conta ativa → CTA para dashboard
 *   link-expired  → link com mais de 24h
 *   link-used     → link já consumido (conta já ativa)
 *
 * Pre-fill: ?email=... mostra o endereço no estado waiting.
 *
 * Tokens: primary-100/600, secondary-500/950, neutral-100/500/700/900/950,
 *         green-50/600, amber-50/700, red-50/600, white
 * Anim:   animate-fade-up-sm (left), animate-fade-up (proof)
 *
 * Tagueamento: data-analytics-event="email_confirmado" no estado success.
 */

require_once __DIR__ . '/_session.php';

$state = $_GET['state'] ?? 'waiting';
if (!in_array($state, ['waiting', 'success', 'link-expired', 'link-used'], true)) {
  $state = 'waiting';
}

$email = $_GET['email'] ?? 'mariana.albuquerque@empresa.com.br';

$cfg = match($state) {
  'success' => [
    'iconBg'    => 'bg-green-50',
    'iconFg'    => 'text-green-600',
    'iconPath'  => 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
    'title'     => 'Tudo pronto!',
    'body'      => 'Sua conta está ativa. Bem-vindo aos Canais Digitais.',
    'primaryLabel' => 'Ir para minha conta',
    'primaryHref'  => '/src/layouts/dashboard-perfil-v3.php?user=logged',
    'secondLabel'  => 'Explorar o portal',
    'secondHref'   => '/src/layouts/home.php?user=logged',
    'proof'        => 'welcome',
  ],
  'link-expired' => [
    'iconBg'    => 'bg-amber-50',
    'iconFg'    => 'text-amber-700',
    'iconPath'  => 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z',
    'title'     => 'Link expirado',
    'body'      => 'O link de confirmação é válido por 24 horas. Solicite um novo para ativar sua conta.',
    'primaryLabel' => 'Enviar novo link',
    'primaryHref'  => '?state=waiting&email=' . urlencode($email),
    'secondLabel'  => 'Voltar para o login',
    'secondHref'   => '/src/layouts/login.php',
    'proof'        => 'login',
  ],
  'link-used' => [
    'iconBg'    => 'bg-primary-100',
    'iconFg'    => 'text-primary-600',
    'iconPath'  => 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
    'title'     => 'Sua conta já está ativa',
    'body'      => 'Este link de confirmação já foi usado. Basta fazer login para continuar.',
    'primaryLabel' => 'Fazer login',
    'primaryHref'  => '/src/layouts/login.php',
    'secondLabel'  => null,
    'secondHref'   => null,
    'proof'        => 'login',
  ],
  default => [ // waiting
    'iconBg'    => 'bg-secondary-500/10',
    'iconFg'    => 'text-secondary-950',
    'iconPath'  => 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
    'title'     => 'Confirme seu e-mail',
    'body'      => null, // composto inline com strong no e-mail
    'primaryLabel' => 'Reenviar e-mail',
    'primaryHref'  => '#',
    'secondLabel'  => 'Errei o e-mail',
    'secondHref'   => '/src/layouts/cadastro.php?step=1',
    'proof'        => 'signup-1',
  ],
};
?>

<div class="flex min-h-screen items-stretch">

  <!-- ============================================================
       Split-left — status card
       ============================================================ -->
  <section class="flex flex-col w-[560px] shrink-0 px-14 py-12 bg-white animate-fade-up-sm"
           <?= $state === 'success' ? 'data-analytics-event="email_confirmado"' : '' ?>>

    <!-- Top: Voltar para o login (exceto no success) -->
    <div class="w-full">
      <?php if ($state !== 'success'): ?>
        <a href="/src/layouts/login.php"
           class="inline-flex items-center gap-2 -ml-3 px-3 py-2.5 rounded-full font-body font-bold text-label-lg text-primary-600 hover:bg-neutral-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2">
          <svg class="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
          Voltar para o login
        </a>
      <?php endif; ?>
    </div>

    <!-- Center content -->
    <div class="flex-1 flex flex-col justify-center w-full">
      <div class="flex flex-col gap-6 w-full">

        <!-- Status icon -->
        <div class="inline-flex items-center justify-center size-12 rounded-full <?= $cfg['iconBg'] ?> <?= $cfg['iconFg'] ?>">
          <svg class="size-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="<?= $cfg['iconPath'] ?>"/>
          </svg>
        </div>

        <!-- Heading + body -->
        <div class="flex flex-col gap-2 w-full">
          <h1 class="font-display font-bold text-headline-md text-primary-600"><?= $cfg['title'] ?></h1>

          <?php if ($state === 'waiting'): ?>
            <p class="font-body text-body-lg text-neutral-900">
              Enviamos um link para <strong class="font-bold"><?= htmlspecialchars($email) ?></strong>.
              Clique no link para ativar sua conta.
            </p>
            <p class="font-body text-body-md text-neutral-700">
              Não esqueça de verificar a pasta de spam. O link expira em 24 horas.
            </p>
          <?php else: ?>
            <p class="font-body text-body-lg text-neutral-900"><?= $cfg['body'] ?></p>
          <?php endif; ?>
        </div>

        <!-- CTAs -->
        <div class="flex flex-col gap-3 w-full mt-2">
          <?php if ($state === 'waiting'): ?>
            <button type="button" data-confirmacao-action="resend" data-cooldown="60"
                    class="inline-flex items-center justify-center w-full h-12 px-6 rounded-full border-[1.5px] border-primary-600 bg-white hover:bg-primary-600/[0.04] text-primary-600 font-body font-bold text-body-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2">
              <?= $cfg['primaryLabel'] ?>
            </button>
          <?php else: ?>
            <a href="<?= $cfg['primaryHref'] ?>"
               class="inline-flex items-center justify-center w-full h-12 px-6 rounded-full bg-primary-600 hover:bg-secondary-950 text-white font-body font-bold text-body-lg transition-colors">
              <?= $cfg['primaryLabel'] ?>
            </a>
          <?php endif; ?>

          <?php if ($cfg['secondLabel']): ?>
            <a href="<?= $cfg['secondHref'] ?>"
               class="self-center font-body font-bold text-body-md text-secondary-950 hover:underline">
              <?= $cfg['secondLabel'] ?>
            </a>
          <?php endif; ?>

          <?php if ($state === 'waiting'): ?>
            <a href="/src/layouts/home.php" class="self-center font-body text-body-md text-neutral-500 hover:text-neutral-700 hover:underline">
              Verificar depois
            </a>
          <?php endif; ?>
        </div>
      </div>
    </div>

    <!-- Bottom: simulação de clique (apenas no waiting) -->
    <div class="w-full">
      <?php if ($state === 'waiting'): ?>
        <p class="text-center font-body text-label-md text-neutral-400">
          <a href="?state=success&email=<?= urlencode($email) ?>" class="underline hover:text-neutral-600">
            [Simular clique no link do e-mail]
          </a>
        </p>
      <?php endif; ?>
    </div>

  </section>

  <!-- ============================================================
       Split-right — proof panel (variante por estado)
       ============================================================ -->
  <?php get_template_part('components/_partials/proof-panel-minimal', null, ['variant' => $cfg['proof']]); ?>

</div>

<!-- ============================================================
     Dev navigator
     ============================================================ -->
<div class="fixed bottom-4 left-1/2 -translate-x-1/2 flex flex-wrap gap-1.5 justify-center
            bg-white/95 backdrop-blur-sm border border-neutral-100 rounded-full px-3 py-1.5
            shadow-md z-50 font-body text-label-md">
  <span class="text-neutral-500 self-center pr-1">Estado:</span>
  <?php foreach (['waiting', 'success', 'link-expired', 'link-used'] as $s): ?>
    <a href="?state=<?= $s ?>&email=<?= urlencode($email) ?>"
       class="px-2.5 py-1 rounded-full transition-colors <?= $s === $state ? 'bg-primary-600 text-white' : 'text-neutral-700 hover:bg-neutral-50' ?>">
      <?= $s ?>
    </a>
  <?php endforeach; ?>
</div>

<script type="module" src="/src/assets/js/interactions.js"></script>
