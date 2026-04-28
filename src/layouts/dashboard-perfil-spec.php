<?php
/**
 * Layout: Dashboard de Perfil (área logada)
 * Figma: — (sem nodeId; derivado de FEATURE-cadastro.md §6.7)
 *
 * Página logada onde o usuário gerencia seus dados. 4 seções do MVP:
 *   1. Dados Básicos       (6 campos)
 *   2. Dados Profissionais (3 campos)
 *   3. Dados Fiscais e Localização (5 campos)
 *   4. Conta (só "Excluir minha conta" no MVP — toggles de preferência ficam p/ Etapa 2)
 *
 * Header do dashboard: `profile-progress` gamificado + título + avatar.
 *
 * Modo de edição: cada linha tem botão "Editar" que troca para um input.
 *   Salvar → toast de sucesso (partial `toast`).
 *   Cancelar → descarta mudanças.
 *
 * Este layout renderiza o estado "leitura" da maioria dos campos + um campo
 * em modo edição (Nome Completo) como demo. Abaixo, preview do toast de
 * sucesso e do modal de exclusão de conta.
 *
 * Tagueamento (§8):
 *   - data-analytics-event="perfil_campo_salvo" no botão Salvar de cada campo
 *
 * Componentes consumidos:
 *   - Partials: header-desktop, footer-desktop, avatar, profile-progress, toast
 */

/**
 * Renderiza uma linha de campo (read ou edit mode).
 *
 * @param array $args  label, value, editing (bool), readOnly (bool), hint (string|null), type (string)
 */
function render_field_row(array $args): void {
  $id       = $args['id']       ?? 'field-' . md5($args['label']);
  $label    = $args['label']    ?? '';
  $value    = $args['value']    ?? '';
  $editing  = $args['editing']  ?? false;
  $readOnly = $args['readOnly'] ?? false;
  $hint     = $args['hint']     ?? null;
  $type     = $args['type']     ?? 'text';
?>
  <div class="flex flex-col gap-1 py-4" data-field-state="<?= $editing ? 'edit' : 'read' ?>">
    <div class="flex items-start justify-between gap-4">
      <div class="flex-1 min-w-0">
        <p class="font-body font-semibold text-label-lg text-neutral-950"><?= $label ?></p>

        <?php if ($editing): ?>
          <div class="mt-2 bg-white border border-secondary-950 flex h-10 items-center rounded-sm w-full max-w-[480px]">
            <input id="<?= $id ?>" type="<?= $type ?>" value="<?= $value ?>" class="flex-1 w-full h-full px-3 bg-transparent text-body-lg font-body text-primary-600 focus:outline-none">
          </div>
        <?php else: ?>
          <p class="mt-1 font-body text-body-lg <?= $value ? 'text-neutral-950' : 'text-neutral-500 italic' ?>">
            <?= $value ?: 'Não informado' ?>
          </p>
        <?php endif; ?>

        <?php if ($hint): ?>
          <p class="mt-1 font-body text-label-md text-neutral-500"><?= $hint ?></p>
        <?php endif; ?>
      </div>

      <div class="shrink-0">
        <?php if ($editing): ?>
          <div class="flex items-center gap-2">
            <button type="button" class="inline-flex items-center justify-center h-10 px-4 rounded-full bg-transparent text-primary-600 hover:bg-neutral-50 transition-colors font-body font-bold text-label-lg">Cancelar</button>
            <button type="button" data-analytics-event="perfil_campo_salvo" class="inline-flex items-center justify-center h-10 px-5 rounded-full bg-primary-600 text-white hover:bg-secondary-950 transition-colors font-body font-bold text-label-lg">Salvar</button>
          </div>
        <?php elseif ($readOnly): ?>
          <span class="inline-flex items-center gap-1.5 rounded-full bg-neutral-50 px-3 py-1 font-body text-label-md text-neutral-600">
            <svg class="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2z"/></svg>
            Conectado ao LinkedIn
          </span>
        <?php else: ?>
          <button type="button" class="inline-flex items-center gap-1 h-10 px-3 rounded-full text-secondary-950 hover:bg-neutral-50 transition-colors font-body font-bold text-label-lg">
            <svg class="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
            Editar
          </button>
        <?php endif; ?>
      </div>
    </div>
  </div>
<?php }
?>
<main class="bg-white min-h-screen">

  <?php get_template_part('components/_partials/header-desktop', null, [
    'activeCategory' => null,
  ]); ?>

  <!-- ============================================================
       Page header: título + profile-progress + avatar
       ============================================================ -->
  <section class="bg-neutral-50 border-b border-neutral-100">
    <div class="max-w-screen-xl mx-auto px-4 lg:px-6 py-10">
      <div class="flex flex-col md:flex-row md:items-center gap-6">
        <?php get_template_part('components/_partials/avatar', null, [
          'src'   => 'https://i.pravatar.cc/160?img=47',
          'alt'   => 'Maria Silva',
          'shape' => 'rounded',
          'size'  => 'lg',
        ]); ?>
        <div class="flex-1 min-w-0">
          <p class="font-body text-label-md text-neutral-600 uppercase tracking-wider">Minha conta</p>
          <h1 class="mt-1 font-display text-headline-md text-neutral-950">Maria Silva</h1>
          <p class="font-body text-body-md text-neutral-700">maria.silva@empresa.com.br</p>
        </div>
        <a href="/" class="shrink-0 inline-flex items-center gap-1.5 font-body font-bold text-label-lg text-neutral-600 hover:text-primary-600 transition-colors">
          <svg class="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg>
          Sair
        </a>
      </div>

      <div class="mt-6">
        <?php get_template_part('components/_partials/profile-progress', null, [
          'filledFields' => 8,
          'totalFields'  => 14,
        ]); ?>
      </div>
    </div>
  </section>

  <!-- ============================================================
       Conteúdo — sidebar nav + sections
       ============================================================ -->
  <section class="max-w-screen-xl mx-auto px-4 lg:px-6 py-12">
    <div class="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10">

      <!-- Sidebar nav (desktop) / tabs (mobile) -->
      <aside>
        <nav class="lg:sticky lg:top-6 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible -mx-4 lg:mx-0 px-4 lg:px-0 pb-2 lg:pb-0" aria-label="Seções do perfil">
          <a href="#basicos" class="inline-flex items-center h-10 px-3 rounded-lg bg-neutral-50 text-primary-600 font-body font-bold text-label-lg whitespace-nowrap">Dados básicos</a>
          <a href="#profissionais" class="inline-flex items-center h-10 px-3 rounded-lg hover:bg-neutral-50 text-neutral-700 hover:text-primary-600 font-body font-semibold text-label-lg whitespace-nowrap">Profissionais</a>
          <a href="#fiscais" class="inline-flex items-center h-10 px-3 rounded-lg hover:bg-neutral-50 text-neutral-700 hover:text-primary-600 font-body font-semibold text-label-lg whitespace-nowrap">Fiscais e localização</a>
          <a href="#conta" class="inline-flex items-center h-10 px-3 rounded-lg hover:bg-neutral-50 text-neutral-700 hover:text-primary-600 font-body font-semibold text-label-lg whitespace-nowrap">Conta</a>
        </nav>
      </aside>

      <!-- Main -->
      <div class="flex flex-col gap-14">

        <!-- Seção 1 — Dados Básicos -->
        <section id="basicos" class="flex flex-col">
          <header class="mb-2 pb-3 border-b border-neutral-100">
            <h2 class="font-display font-bold text-title-xl text-neutral-950">Dados básicos</h2>
            <p class="mt-1 font-body text-body-md text-neutral-700">Informações que identificam você no portal.</p>
          </header>

          <!-- Foto de perfil -->
          <div class="flex items-center justify-between gap-4 py-5 border-b border-neutral-100">
            <div class="flex items-center gap-4">
              <?php get_template_part('components/_partials/avatar', null, [
                'src' => 'https://i.pravatar.cc/160?img=47', 'alt' => 'Maria Silva', 'shape' => 'rounded', 'size' => 'md',
              ]); ?>
              <div>
                <p class="font-body font-semibold text-label-lg text-neutral-950">Foto de perfil</p>
                <p class="font-body text-label-md text-neutral-500">JPG ou PNG, máx. 2 MB.</p>
              </div>
            </div>
            <button type="button" class="inline-flex items-center gap-1.5 h-10 px-4 rounded-full border-[1.5px] border-primary-600 text-primary-600 hover:bg-neutral-50 transition-colors font-body font-bold text-label-lg">
              <svg class="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
              Trocar foto
            </button>
          </div>

          <div class="divide-y divide-neutral-100">
            <?php render_field_row(['label' => 'Nome completo', 'value' => 'Maria Silva', 'editing' => true, 'id' => 'nome-completo']); ?>
            <?php render_field_row(['label' => 'E-mail', 'value' => 'maria.silva@empresa.com.br', 'readOnly' => true, 'hint' => 'Vinculado ao seu LinkedIn — não pode ser editado.']); ?>
            <?php render_field_row(['label' => 'Telefone', 'value' => '+55 (11) 98765-4321']); ?>
            <?php render_field_row(['label' => 'Data de nascimento', 'value' => '12/05/1990', 'type' => 'date']); ?>
            <?php render_field_row(['label' => 'Gênero', 'value' => '']); ?>
          </div>
        </section>

        <!-- Seção 2 — Dados Profissionais -->
        <section id="profissionais" class="flex flex-col">
          <header class="mb-2 pb-3 border-b border-neutral-100">
            <h2 class="font-display font-bold text-title-xl text-neutral-950">Dados profissionais</h2>
            <p class="mt-1 font-body text-body-md text-neutral-700">Ajuda a personalizar recomendações de conteúdo e eventos.</p>
          </header>

          <div class="divide-y divide-neutral-100">
            <?php render_field_row(['label' => 'Empresa', 'value' => 'Cooperativa Central Aurora']); ?>
            <?php render_field_row(['label' => 'Cargo', 'value' => 'Gerente de Marketing']); ?>
            <?php render_field_row(['label' => 'Setor', 'value' => 'Indústria A&B']); ?>
          </div>
        </section>

        <!-- Seção 3 — Dados Fiscais e Localização -->
        <section id="fiscais" class="flex flex-col">
          <header class="mb-2 pb-3 border-b border-neutral-100">
            <h2 class="font-display font-bold text-title-xl text-neutral-950">Dados fiscais e localização</h2>
            <p class="mt-1 font-body text-body-md text-neutral-700">Necessário apenas em transações comerciais (inscrições pagas, compras).</p>
          </header>

          <div class="divide-y divide-neutral-100">
            <?php render_field_row(['label' => 'CPF / CNPJ', 'value' => '123.456.789-00', 'hint' => 'Máscara aplicada automaticamente; dígito verificador validado no servidor.']); ?>
            <?php render_field_row(['label' => 'País', 'value' => 'Brasil']); ?>
            <?php render_field_row(['label' => 'Estado', 'value' => 'São Paulo']); ?>
            <?php render_field_row(['label' => 'Cidade', 'value' => '']); ?>
            <?php render_field_row(['label' => 'CEP', 'value' => '01310-100', 'hint' => 'Autopreenchimento de Endereço via API ao digitar o CEP.']); ?>
            <?php render_field_row(['label' => 'Endereço', 'value' => 'Av. Paulista, 1578']); ?>
          </div>
        </section>

        <!-- Seção 4 — Conta -->
        <section id="conta" class="flex flex-col">
          <header class="mb-2 pb-3 border-b border-neutral-100">
            <h2 class="font-display font-bold text-title-xl text-neutral-950">Conta</h2>
            <p class="mt-1 font-body text-body-md text-neutral-700">Preferências de newsletter e marketing entram na Etapa 2.</p>
          </header>

          <div class="py-5">
            <button type="button" class="inline-flex items-center gap-2 font-body font-bold text-label-lg text-[#bf0413] hover:underline" data-dashboard-action="open-delete-modal">
              <svg class="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
              Excluir minha conta
            </button>
            <p class="mt-2 font-body text-label-md text-neutral-500 max-w-prose">
              Essa ação remove permanentemente seu acesso ao portal e todos os dados associados.
            </p>
          </div>
        </section>

      </div>
    </div>
  </section>

  <!-- ============================================================
       Spec previews — toast de sucesso + modal de exclusão
       Oculta por padrão; abra com ?preview=spec na URL.
       ============================================================ -->
  <?php if (($_GET['preview'] ?? '') === 'spec'): ?>
  <section class="bg-neutral-50 border-t border-neutral-100 py-16">
    <div class="max-w-screen-xl mx-auto px-4 lg:px-6">
      <header class="mb-10 max-w-3xl">
        <p class="font-body text-label-lg uppercase tracking-wider text-neutral-500">Spec de estados</p>
        <h2 class="mt-2 font-display text-headline-md text-neutral-950">Feedback + exclusão</h2>
        <p class="mt-3 font-body text-body-lg text-neutral-700">
          Artefatos auxiliares conforme
          <code class="font-mono text-label-md bg-white rounded-xs px-1 py-0.5 border border-neutral-100">FEATURE-cadastro.md §6.7</code>.
        </p>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">

        <!-- Toast pós-save -->
        <article>
          <div class="flex items-baseline gap-4 mb-4 pb-2 border-b border-neutral-100">
            <span class="font-mono text-label-sm text-neutral-500">toast-save</span>
            <h3 class="font-display font-bold text-title-lg text-neutral-950">Toast pós-save</h3>
          </div>
          <p class="mb-4 font-body text-body-md text-neutral-700">Aparece no canto inferior direito ao salvar qualquer campo. Auto-dismiss 4s.</p>
          <div class="bg-white rounded-lg border border-neutral-100 p-8 flex justify-end">
            <?php get_template_part('components/_partials/toast', null, [
              'type'    => 'success',
              'message' => 'Alterações salvas.',
            ]); ?>
          </div>
        </article>

        <!-- Delete modal -->
        <article>
          <div class="flex items-baseline gap-4 mb-4 pb-2 border-b border-neutral-100">
            <span class="font-mono text-label-sm text-neutral-500">delete-modal</span>
            <h3 class="font-display font-bold text-title-lg text-neutral-950">Modal de exclusão</h3>
          </div>
          <p class="mb-4 font-body text-body-md text-neutral-700">Botão "Sim, excluir" só habilita quando o input for exatamente <code class="font-mono text-label-md bg-neutral-100 rounded-xs px-1">EXCLUIR</code>.</p>
          <div class="bg-primary-950/[.32] rounded-lg p-6 flex justify-center">
            <div role="dialog" aria-modal="true" aria-labelledby="delete-title" class="bg-white w-full max-w-[440px] rounded-lg shadow-lg p-6 flex flex-col gap-4">
              <div class="inline-flex items-center justify-center size-12 rounded-full bg-[#FEE2E2]">
                <svg class="size-6 text-[#bf0413]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
              </div>
              <h4 id="delete-title" class="font-display text-headline-sm text-neutral-950">Excluir sua conta?</h4>
              <p class="font-body text-body-md text-neutral-700">Esta ação não pode ser desfeita. Todos os seus dados serão removidos permanentemente.</p>

              <label class="flex flex-col items-start w-full mt-2">
                <span class="font-body font-semibold text-label-md text-neutral-950 pb-1">Digite <span class="font-mono text-[#bf0413]">EXCLUIR</span> para confirmar</span>
                <div class="bg-white border border-neutral-100 focus-within:border-[#bf0413] flex h-10 items-center rounded-sm w-full">
                  <input type="text" autocomplete="off" data-delete-confirm class="flex-1 w-full h-full px-3 bg-transparent text-body-lg font-body text-primary-600 focus:outline-none">
                </div>
              </label>

              <div class="flex items-center justify-end gap-2 mt-2">
                <button type="button" class="inline-flex items-center justify-center h-10 px-5 rounded-full bg-transparent text-primary-600 hover:bg-neutral-50 transition-colors font-body font-bold text-label-lg">Cancelar</button>
                <button type="button" disabled class="inline-flex items-center justify-center h-10 px-5 rounded-full bg-[#bf0413] text-white hover:bg-[#99030F] disabled:bg-neutral-200 disabled:cursor-not-allowed transition-colors font-body font-bold text-label-lg">
                  Sim, excluir minha conta
                </button>
              </div>
            </div>
          </div>
        </article>

      </div>
    </div>
  </section>
  <?php endif; ?>

  <?php get_template_part('components/_partials/footer-desktop', null, []); ?>

</main>
