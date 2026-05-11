<?php
/**
 * Partial: Login Button
 * Figma: 5955:22722 (component set: !logged Enabled/Hovered + logged Enabled/Hovered)
 *
 * Variants:
 *   - !logged: outlined pill 1.5px primary-600, pl-3 pr-4 py-2, gap-2,
 *              account_circle 24 + "Entrar" (Open Sans Bold 16/24/0.5)
 *   - logged:  outlined pill 1.5px primary-600, pl-1 pr-2 py-1, gap-2,
 *              Avatar 32 (initials/photo) + Username (1º nome) + arrow_drop_down 20
 *
 * Hover (ambos): bg-neutral-50.
 *
 * No estado logado, o componente é o trigger de um dropdown user-menu —
 * o menu em si fica no header (controlado pelo dropdown-menu.js).
 *
 * USO:
 *   <?php get_template_part('components/_partials/login-button', null, [
 *     'logged'   => true,
 *     'name'     => 'Mariana Albuquerque',
 *     'initials' => 'MA',
 *     'avatar'   => null,
 *     'href'     => '/src/layouts/login-modal.php',
 *   ]); ?>
 *
 * PROPS ($args):
 *   logged    → bool
 *   name      → string  (logged) — nome completo, exibe primeiro nome
 *   initials  → string  (logged) — iniciais para avatar fallback
 *   avatar    → string|null (logged) — URL da foto
 *   href      → string  (!logged) — destino do link "Entrar"
 *   asTrigger → bool    (logged) — se true, renderiza como <button data-user-menu-trigger>
 */

$logged    = !empty($args['logged']);
$name      = $args['name']     ?? '';
$initials  = $args['initials'] ?? 'U';
$avatar    = $args['avatar']   ?? null;
$href      = $args['href']     ?? '/src/layouts/login-modal.php';
$asTrigger = $logged && !empty($args['asTrigger']);
$firstName = $name ? (explode(' ', trim($name))[0] ?: 'Usuário') : 'Usuário';

if (!$logged): ?>
<a href="<?= htmlspecialchars($href) ?>"
   data-analytics-event="login_iniciado"
   class="inline-flex items-center gap-2 pl-3 pr-4 py-2 rounded-full border-[1.5px] border-primary-600 text-primary-600 hover:bg-neutral-50 transition-colors font-body font-bold text-body-lg whitespace-nowrap">
  <svg class="size-6 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </svg>
  Entrar
</a>
<?php else: ?>
<<?= $asTrigger ? 'button' : 'a' ?>
  <?= $asTrigger ? 'type="button" aria-haspopup="true" aria-expanded="false" data-user-menu-trigger' : 'href="' . htmlspecialchars($href) . '"' ?>
  class="inline-flex items-center gap-2 pl-1 pr-2 py-1 rounded-full border-[1.5px] border-primary-600 text-primary-600 hover:bg-neutral-50 transition-colors font-body font-bold text-body-lg whitespace-nowrap">
  <?php if ($avatar): ?>
    <img src="<?= htmlspecialchars($avatar) ?>" alt="" class="size-8 rounded-full object-cover shrink-0">
  <?php else: ?>
    <span class="size-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center shrink-0 font-body font-semibold text-body-md" aria-hidden="true">
      <?= htmlspecialchars($initials) ?>
    </span>
  <?php endif; ?>
  <span><?= htmlspecialchars($firstName) ?></span>
  <svg class="size-5 shrink-0 <?= $asTrigger ? 'transition-transform duration-150' : '' ?>" <?= $asTrigger ? 'data-chevron' : '' ?> viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M7 10l5 5 5-5z"/>
  </svg>
</<?= $asTrigger ? 'button' : 'a' ?>>
<?php endif; ?>
