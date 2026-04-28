<?php
/**
 * Helper: Simulação de sessão do usuário
 *
 * Em produção, substituir por is_user_logged_in() + wp_get_current_user().
 * Aqui, lê $_GET['user'] para simular o estado no protótipo.
 *
 * Propaga o parâmetro para todos os links internos via JS (cadastro-flow.js).
 *
 * Exporta:
 *   $isLogged       → bool
 *   $sessionUser    → array|null (name, email, initials, avatar)
 *   $headerArgs     → array pronto para get_template_part('header-desktop', ...)
 *                     Respeita $activeCategory se estiver definido no layout chamador.
 */

$userParam = $_GET['user'] ?? 'anonymous';
$isLogged  = ($userParam === 'logged');

$sessionUser = $isLogged ? [
  'name'     => 'Maria Silva',
  'email'    => 'm***@empresa.com.br',
  'initials' => 'MS',
  'avatar'   => null,
] : null;

$headerArgs = [
  'activeCategory' => $activeCategory ?? null,
  'userLoggedIn'   => $isLogged,
  'userName'       => $sessionUser['name']     ?? '',
  'userEmail'      => $sessionUser['email']    ?? '',
  'userInitials'   => $sessionUser['initials'] ?? '',
  'userAvatar'     => $sessionUser['avatar']   ?? null,
];

/**
 * Navegador de sessão — chame ao final do layout (antes de </main>).
 * Remover em produção.
 */
if (!function_exists('render_session_toggle')) {
  function render_session_toggle(): void {
    $param = $_GET['user'] ?? 'anonymous';
    ?>
    <div class="fixed bottom-6 right-6 flex items-center gap-2 bg-white border border-neutral-200 rounded-full px-4 py-2 shadow-lg font-body text-label-md z-50">
      <span class="text-neutral-400">Sessão:</span>
      <a href="?user=anonymous" class="px-3 py-1 rounded-full transition-colors <?= $param === 'anonymous' ? 'bg-neutral-950 text-white' : 'text-neutral-600 hover:bg-neutral-50' ?>">Anônimo</a>
      <a href="?user=logged" class="px-3 py-1 rounded-full transition-colors <?= $param === 'logged' ? 'bg-secondary-950 text-white' : 'text-neutral-600 hover:bg-neutral-50' ?>">Logado</a>
    </div>
    <?php
  }
}
