<?php
/**
 * Layout: Formulário Newsletter
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1980-14001
 * NodeId Desktop: 1980:14001 (1920×1808)
 *
 * Sub-frames inspecionados:
 *   - 1980:14005 (content / text + form) — extraído
 *
 * Página dedicada à inscrição na newsletter. Background gradiente Informa
 * (from-primary-600 to-secondary-950) cobrindo o body inteiro, com texto
 * branco grande à esquerda e card branco do formulário à direita.
 *
 * O form tem 2 sections (Dados pessoais + Dados profissionais), checkbox
 * de consent, botão "Assinar newsletter" filled e disclaimer LGPD com link
 * pra Política de Privacidade.
 *
 * Componentes consumidos:
 *   - Partials: header-desktop, footer-desktop, divider
 *   - Markup inline: hero text, form (text fields + checkbox + button + terms)
 *
 * Decisões de design:
 *   - Background gradient 54deg de secondary-950 (#003CB2) a secondary-500 (#28B4FF)
 *     stop 75% — Tailwind arbitrary: bg-[linear-gradient(54deg,var(--color-secondary-950)_0%,var(--color-secondary-500)_75%)]
 *   - Form usa shadow-sm + bg-white pra "flutuar" sobre o gradient
 *   - Text fields seguem o pattern do showcase /src/components/text-field.php
 *     (h-10, rounded-sm, border-neutral-100, label SemiBold com asterisco *)
 *   - Decoração "Informa Orbit" no canto inferior esquerdo via partial orbit.php
 *   - Tagline em display-lg (57px Aleo Regular tracking -0.25)
 *
 * Banco de textos contextuais Food Connection (single source of truth pra
 * todos os layouts seguintes):
 *   Editorias: Eventos, Ingredientes, Indústria A&B, Proteína Animal,
 *              Food Service, Sorvetes, Tecnologia, Embalagens, ESG,
 *              Especialistas, E-books
 *   Títulos plausíveis:
 *     - "Fispal Food Service 2026: programação de palestras é divulgada"
 *     - "Tendências em proteína vegetal: mercado brasileiro cresce 18%"
 *     - "Tecnocarne anuncia novo pavilhão para soluções em automação"
 *     - "ESG na indústria de laticínios: case da Cooperativa Central Aurora"
 *     - "Embalagens sustentáveis: como a Klabin lidera o setor"
 *     - "FiSA 2026: inscrições abertas para o congresso de ingredientes"
 *     - "Sorvetes artesanais: boom de marcas paulistanas no verão 2026"
 *     - "Food Service: delivery próprio volta a ganhar tração em 2026"
 *     - "E-book grátis: 10 tendências em Food Service para 2026"
 *   Autores: Marcelo Yamashita, Rafaela Costa, João Pedro Almeida,
 *            Luiza Bertolaccini, Bruno Tavares
 */
?>
<main class="bg-white">

  <?php get_template_part('components/_partials/header-desktop', null, [
    'activeCategory' => null,
  ]); ?>

  <!-- ============================================================
       Body com background gradient
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
          <h1 class="font-display text-display-lg w-full">Assine a nossa newsletter</h1>
          <p class="font-display text-title-xl w-full">Preencha seus dados e fique por dentro das novidades</p>
        </div>

        <!-- Coluna direita: Form card -->
        <div class="bg-white flex flex-1 flex-col items-start max-w-[704px] rounded-sm shadow-sm">
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
              <button type="submit" class="bg-primary-600 inline-flex items-center justify-center px-6 py-3 rounded-full text-white hover:bg-secondary-950 transition-colors font-body font-bold text-body-lg w-full">
                Assinar newsletter
              </button>
            </div>

            <!-- Terms / disclaimer -->
            <?php get_template_part('components/_partials/form-disclaimer', null, []); ?>

          </div>
        </div>

      </div>
    </div>
  </div>

  <?php get_template_part('components/_partials/footer-desktop', null, []); ?>

</main>
