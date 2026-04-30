<?php
/**
 * Layout: Formulário Download
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1992-23811
 * NodeId: 1992:23811
 *
 * HEAD DA FEATURE "Cadastro e Perfil de Usuário" (§6.8):
 * A partir da integração com autenticação, este layout passa a detectar o
 * usuário e substitui o form completo por um prompt de ação quando possível:
 *
 *   anonymous-prompt       → "Faça login ou crie conta" + form original como fallback abaixo
 *   logged-direct-download → Usuário logado com dados suficientes: card de confirmação + botão "Baixar agora"
 *   logged-incomplete      → Logado mas com perfil incompleto: prompt para completar antes de baixar
 *
 * Estado default de preview = anonymous-prompt. Abaixo, galeria mostra os
 * outros dois. No runtime real, a detecção é server-side:
 *
 *   $userLoggedIn = is_user_logged_in();
 *   $userHasRequiredFields = userHasRequiredFields(wp_get_current_user());
 *   $userState = !$userLoggedIn ? 'anonymous-prompt'
 *              : ($userHasRequiredFields ? 'logged-direct-download' : 'logged-incomplete');
 *
 * Tagueamento (§8):
 *   - data-analytics-event="download_sem_login" em "Fazer login"
 *   - data-analytics-event="download_pos_login" no submit direto do estado logged
 *
 * Anatomia preservada da versão anterior:
 *   - Hero left (gradient + orbit + headline + lead)
 *   - Card right — conteúdo varia por estado; forma visual mantém max-w-[704px],
 *     rounded-sm shadow-sm bg-white.
 */

$downloadTitle = '10 tendências em Food Service para 2026';

/**
 * Renderiza o conteúdo da coluna direita conforme o estado.
 *
 * @param string $state  anonymous-prompt | logged-direct-download | logged-incomplete
 * @param string $title  Título do material (usado no copy)
 */
function render_download_card(string $state, string $title): void {
  switch ($state) {
    case 'logged-direct-download':
      ?>
      <div class="bg-white flex flex-1 flex-col gap-6 items-start max-w-[704px] rounded-sm shadow-sm p-8">
        <div class="inline-flex items-center justify-center size-16 rounded-full bg-[#DCFCE7]">
          <svg class="size-8 text-[#16A34A]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
        </div>
        <div class="flex flex-col gap-2 w-full">
          <h2 class="font-display font-bold text-title-xl text-neutral-950">Tudo pronto, Maria!</h2>
          <p class="font-body text-body-lg text-neutral-700">
            Vamos enviar <span class="font-semibold text-neutral-950"><?= $title ?></span> para <span class="font-semibold text-neutral-950">maria.silva@empresa.com.br</span>.
          </p>
        </div>
        <button type="submit" data-analytics-event="download_pos_login" onclick="window.location='/src/layouts/conteudo.php'" class="bg-primary-600 inline-flex gap-3 items-center justify-center w-full h-12 rounded-full text-white hover:bg-secondary-950 transition-colors font-body font-bold text-body-lg">
          <svg class="size-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
          Baixar agora
        </button>
        <p class="font-body text-label-md text-neutral-500">
          Não é você?
          <a href="/" class="font-bold text-secondary-950 hover:underline">Sair da conta</a>.
        </p>
      </div>
      <?php
      break;

    case 'logged-incomplete':
      ?>
      <div class="bg-white flex flex-1 flex-col gap-6 items-start max-w-[704px] rounded-sm shadow-sm p-8">
        <div class="inline-flex items-center justify-center size-16 rounded-full bg-[#FEF3C7]">
          <svg class="size-8 text-[#92400E]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
        </div>
        <div class="flex flex-col gap-2 w-full">
          <h2 class="font-display font-bold text-title-xl text-neutral-950">Falta pouco para baixar</h2>
          <p class="font-body text-body-lg text-neutral-700">
            Precisamos de mais alguns dados do seu perfil para liberar o download de <span class="font-semibold text-neutral-950"><?= $title ?></span>.
          </p>
        </div>
        <div class="w-full">
          <?php get_template_part('components/_partials/profile-progress', null, [
            'filledFields' => 4,
            'totalFields'  => 14,
          ]); ?>
        </div>
        <div class="flex flex-wrap gap-3 w-full">
          <a href="/src/layouts/dashboard-perfil-v3.php" class="bg-primary-600 inline-flex items-center justify-center px-6 h-12 rounded-full text-white hover:bg-secondary-950 transition-colors font-body font-bold text-body-lg">
            Completar meu perfil
          </a>
          <a href="/" class="inline-flex items-center justify-center px-6 h-12 rounded-full bg-transparent text-primary-600 hover:bg-neutral-50 transition-colors font-body font-bold text-body-lg">
            Fazer isso depois
          </a>
        </div>
      </div>
      <?php
      break;

    default: // anonymous-prompt
      ?>
      <div class="bg-white flex flex-1 flex-col items-start max-w-[704px] rounded-sm shadow-sm">
        <!-- Prompt de login -->
        <div class="flex flex-col gap-6 items-start p-8 w-full">
          <div class="inline-flex items-center justify-center size-16 rounded-full bg-[#DBEAFE]">
            <svg class="size-8 text-primary-600" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
          </div>
          <div class="flex flex-col gap-2 w-full">
            <h2 class="font-display font-bold text-title-xl text-neutral-950">Acesse para baixar</h2>
            <p class="font-body text-body-lg text-neutral-700">
              Para baixar <span class="font-semibold text-neutral-950"><?= $title ?></span>, faça login ou crie sua conta.
              Na próxima vez, o download é automático.
            </p>
          </div>
          <div class="flex flex-col gap-3 w-full">
            <a href="/src/layouts/login-modal.php" data-analytics-event="download_sem_login" class="bg-primary-600 inline-flex items-center justify-center w-full h-12 rounded-full text-white hover:bg-secondary-950 transition-colors font-body font-bold text-body-lg">
              Fazer login
            </a>
            <a href="/src/layouts/cadastro-bloco-1.php" class="inline-flex items-center justify-center w-full h-12 rounded-full bg-transparent border-[1.5px] border-primary-600 text-primary-600 hover:bg-neutral-50 transition-colors font-body font-bold text-body-lg">
              Criar conta
            </a>
          </div>
        </div>

        <!-- Divider "ou" -->
        <div class="flex items-center gap-3 px-8 w-full">
          <div class="h-px flex-1 bg-neutral-100"></div>
          <span class="font-body text-label-md text-neutral-500">ou preencha o formulário abaixo</span>
          <div class="h-px flex-1 bg-neutral-100"></div>
        </div>

        <!-- Form fallback (mesmo markup da versão pré-feature) -->
        <div class="flex flex-col items-start w-full">

          <!-- Section: Dados pessoais -->
          <div class="flex flex-col gap-8 items-start pb-12 pt-8 px-8 w-full">
            <h2 class="font-display font-bold text-title-lg text-neutral-950 w-full">Dados pessoais</h2>

            <div class="flex flex-wrap gap-x-6 gap-y-8 items-start w-full">
              <?php get_template_part('components/_partials/form-field', null, [
                'label' => 'Nome', 'type' => 'text', 'placeholder' => '', 'required' => 'on',
              ]); ?>
              <?php get_template_part('components/_partials/form-field', null, [
                'label' => 'Sobrenome', 'type' => 'text', 'placeholder' => '', 'required' => 'on',
              ]); ?>
            </div>

            <div class="max-w-[524px]">
              <?php get_template_part('components/_partials/form-field', null, [
                'label' => 'E-mail', 'type' => 'email', 'placeholder' => 'exemplo@email.com', 'required' => 'on',
              ]); ?>
            </div>
          </div>

          <!-- Section: Dados profissionais -->
          <div class="flex flex-col gap-8 items-start pb-12 px-8 w-full">
            <h2 class="font-display font-bold text-title-lg text-neutral-950 w-full">Dados profissionais</h2>

            <div class="flex flex-wrap gap-x-6 gap-y-8 items-start w-full">
              <?php get_template_part('components/_partials/form-field', null, [
                'label' => 'Empresa', 'type' => 'text', 'placeholder' => '', 'required' => 'on',
              ]); ?>
              <?php get_template_part('components/_partials/form-select', null, [
                'label' => 'Cargo', 'value' => '', 'required' => 'on',
              ]); ?>
            </div>

            <div class="flex flex-wrap gap-x-6 gap-y-8 items-start w-full">
              <?php get_template_part('components/_partials/form-field', null, [
                'label' => 'Telefone', 'type' => 'tel', 'placeholder' => '(xx) xxxxx-xxxx', 'required' => 'on',
              ]); ?>
              <?php get_template_part('components/_partials/form-select', null, [
                'label' => 'País', 'value' => 'Brasil', 'required' => 'on',
              ]); ?>
            </div>

            <div class="flex flex-wrap gap-x-6 gap-y-8 items-start w-full">
              <?php get_template_part('components/_partials/form-select', null, [
                'label' => 'Estado', 'value' => '', 'required' => 'on',
              ]); ?>
              <?php get_template_part('components/_partials/form-field', null, [
                'label' => 'Cidade', 'type' => 'text', 'placeholder' => '', 'required' => 'on',
              ]); ?>
            </div>
          </div>

          <!-- Checkbox consent -->
          <div class="flex flex-col items-start px-8 w-full">
            <?php get_template_part('components/_partials/form-checkbox', null, [
              'label' => 'Sim, eu desejo receber informações da Informa Markets e seus parceiros',
            ]); ?>
          </div>

          <!-- Button area -->
          <div class="flex flex-col items-start p-8 w-full">
            <button type="submit" onclick="window.location='/src/layouts/conteudo.php'" class="bg-primary-600 inline-flex gap-3 items-center justify-center px-6 py-3 rounded-full text-white hover:bg-secondary-950 transition-colors font-body font-bold text-body-lg w-full">
              <svg class="size-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
              Baixar material
            </button>
          </div>

          <!-- Terms / disclaimer -->
          <?php get_template_part('components/_partials/form-disclaimer', null, []); ?>

        </div>
      </div>
      <?php
      break;
  }
}

$states = [
  'anonymous-prompt'       => ['title' => 'Anônimo',              'desc' => 'Usuário não logado — prompt de login + form original como fallback.'],
  'logged-direct-download' => ['title' => 'Logado com dados completos', 'desc' => 'Pula o formulário e oferece download imediato.'],
  'logged-incomplete'      => ['title' => 'Logado com perfil incompleto', 'desc' => 'Pede para completar o perfil antes de liberar.'],
];

// Detecção de estado via querystring (protótipo).
// Produção: substituir por is_user_logged_in() + userHasRequiredFields().
$userParam = $_GET['user'] ?? 'anonymous';
$viewState = $_GET['state'] ?? ($userParam === 'logged' ? 'logged-direct-download' : 'anonymous-prompt');
if (!array_key_exists($viewState, $states)) $viewState = 'anonymous-prompt';
?>
<main class="bg-white">

  <?php
  $activeCategory = null;
  require_once __DIR__ . '/_session.php';
  get_template_part('components/_partials/header-desktop', null, $headerArgs);
  ?>

  <!-- ============================================================
       Body com background gradient — estado default anonymous-prompt
       ============================================================ -->
  <div class="bg-[linear-gradient(54deg,var(--color-secondary-950)_0%,var(--color-secondary-500)_75%)] relative overflow-hidden">
    <!-- Informa Orbit decorativo -->
    <div class="absolute bottom-0 left-[348px] w-[912px] h-[240px] opacity-75 pointer-events-none">
      <?php get_template_part('components/_partials/orbit', null, []); ?>
    </div>
    <div class="max-w-screen-xl mx-auto px-4 lg:px-6 relative">
      <div class="flex gap-12 items-start py-20">

        <!-- Coluna esquerda: text -->
        <div class="flex flex-1 flex-col gap-4 items-start py-10 text-white">
          <?php get_template_part('components/_partials/categoria', null, [
            'color' => 'saffron', 'chip' => 'on', 'label' => 'E-book gratuito', 'href' => null,
          ]); ?>
          <h1 class="font-display text-display-lg w-full">Baixe o material gratuitamente</h1>
          <p class="font-display text-title-xl w-full"><?= $downloadTitle ?></p>
          <p class="font-body text-body-lg text-white/80 w-full">Preencha seus dados para receber o conteúdo no seu e-mail</p>
        </div>

        <!-- Coluna direita: Card (estado detectado por ?user= / ?state=) -->
        <?php render_download_card($viewState, $downloadTitle); ?>

      </div>
    </div>
  </div>

  <!-- ============================================================
       Spec de estados — integração com autenticação (§6.8)
       Oculta por padrão; abra com ?preview=spec na URL.
       ============================================================ -->
  <?php if (($_GET['preview'] ?? '') === 'spec'): ?>
  <section class="bg-neutral-50 border-t border-neutral-100 py-16">
    <div class="max-w-screen-xl mx-auto px-4 lg:px-6">
      <header class="mb-10 max-w-3xl">
        <p class="font-body text-label-lg uppercase tracking-wider text-neutral-500">Spec de estados</p>
        <h2 class="mt-2 font-display text-headline-md text-neutral-950">Detecção de usuário</h2>
        <p class="mt-3 font-body text-body-lg text-neutral-700">
          Variações do card do lado direito conforme
          <code class="font-mono text-label-md bg-white rounded-xs px-1 py-0.5 border border-neutral-100">FEATURE-cadastro.md §6.8</code>.
          A detecção real é server-side usando <code class="font-mono text-label-md">is_user_logged_in()</code> + helper <code class="font-mono text-label-md">userHasRequiredFields()</code>.
        </p>
      </header>

      <div class="space-y-12">
        <?php foreach ($states as $key => $meta): if ($key === 'anonymous-prompt') continue; ?>
          <article>
            <div class="flex items-baseline gap-4 mb-4 pb-2 border-b border-neutral-100">
              <span class="font-mono text-label-sm text-neutral-500"><?= $key ?></span>
              <h3 class="font-display font-bold text-title-lg text-neutral-950"><?= $meta['title'] ?></h3>
              <p class="font-body text-body-md text-neutral-700"><?= $meta['desc'] ?></p>
            </div>
            <div class="bg-[linear-gradient(54deg,var(--color-secondary-950)_0%,var(--color-secondary-500)_75%)] rounded-lg p-8 md:p-12">
              <div class="max-w-[704px] mx-auto">
                <?php render_download_card($key, $downloadTitle); ?>
              </div>
            </div>
          </article>
        <?php endforeach; ?>
      </div>
    </div>
  </section>
  <?php endif; ?>

  <?php get_template_part('components/_partials/footer-desktop', null, []); ?>

  <?php render_session_toggle(); ?>

</main>
<script type="module" src="/src/assets/js/interactions.js"></script>
