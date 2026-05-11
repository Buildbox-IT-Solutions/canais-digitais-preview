<?php
/**
 * Componente: Bottom sheet + Building Blocks / Content
 * Figma Sheet:   https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=3190-48964
 * Figma Content: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=3190-49404
 * Variantes: modal (true|false) × showDragHandle = 2+
 *
 * Bottom sheet Material 3: surface ancorada ao rodapé da tela com
 * supplementary content. O Figma define só o WRAPPER — drag handle +
 * content slot vazio (444h). O conteúdo interno é definido pelo contexto
 * de uso (filtros, seletores, ações etc).
 *
 * ANATOMIA (do Figma):
 *   - Dimensões: 412×480 (w × h)
 *   - rounded-t-2xl (16px nas pontas superiores)
 *   - bg-white
 *   - Shadow: Elevation/3 (Material M3)
 *   - Header container: p-4, centraliza drag handle
 *   - Drag handle: bg-neutral-950 (#283857) w-8 h-1 rounded-full
 *   - Content slot: h-[444px] (vazio no component master)
 *
 * VARIANTE MODAL:
 *   Adiciona um Scrim absolute por trás (bg #050708 opacity 32%) que
 *   cobre a viewport. Sheet fica centralizado verticalmente (translate).
 */
?>
<div class="space-y-10">

  <!-- ===== Default (showDragHandle=true, não modal) ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Default · Drag handle · Não modal</p>
    <div class="relative w-[412px] h-[480px]">
      <div class="absolute inset-0 bg-white flex flex-col items-start overflow-hidden rounded-t-2xl shadow-lg">
        <!-- Header com drag handle -->
        <div class="flex flex-col items-center p-4 w-full">
          <div class="bg-neutral-950 h-1 rounded-full w-8"></div>
        </div>
        <!-- Content slot (vazio no master) -->
        <div class="h-[444px] w-full"></div>
      </div>
    </div>
  </div>

  <!-- ===== Sem drag handle ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Sem drag handle</p>
    <div class="relative w-[412px] h-[480px]">
      <div class="absolute inset-0 bg-white flex flex-col items-start overflow-hidden rounded-t-2xl shadow-lg">
        <div class="flex flex-col items-center p-4 w-full"></div>
        <div class="h-[444px] w-full"></div>
      </div>
    </div>
  </div>

  <!-- ===== Modal variant (com Scrim de fundo) ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Modal · Com scrim</p>
    <div class="relative w-[412px] h-[480px] overflow-hidden">
      <!-- Scrim preenchendo o viewport simulado -->
      <div class="absolute inset-[-420px_-40px_0_-40px] bg-primary-950 opacity-[.32]"></div>
      <!-- Sheet centralizado verticalmente -->
      <div class="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[480px] bg-white flex flex-col items-start overflow-hidden rounded-t-2xl shadow-lg">
        <div class="flex flex-col items-center p-4 w-full">
          <div class="bg-neutral-950 h-1 rounded-full w-8"></div>
        </div>
        <div class="h-[444px] w-full"></div>
      </div>
    </div>
  </div>

  <!-- ===== Exemplo de uso REAL (não é do master — apenas ilustração de preenchimento) ===== -->
  <div class="space-y-2">
    <p class="text-label-sm text-neutral-700 uppercase tracking-wider">Exemplo de uso (conteúdo preenchido)</p>
    <div class="relative w-[412px] h-[480px]">
      <div class="absolute inset-0 bg-white flex flex-col items-start overflow-hidden rounded-t-2xl shadow-lg">
        <div class="flex flex-col items-center p-4 w-full">
          <div class="bg-neutral-950 h-1 rounded-full w-8"></div>
        </div>
        <!-- Slot preenchido com uma lista qualquer -->
        <div class="flex-1 w-full px-4 pb-4 overflow-y-auto">
          <h3 class="font-display font-bold text-title-lg text-primary-600 mb-3">Filtrar por</h3>
          <div class="space-y-3">
            <p class="text-label-md font-body font-semibold text-neutral-950 uppercase tracking-wider">Editorias</p>
            <div class="flex flex-wrap gap-2">
              <?php get_template_part('components/_partials/tag', null, [ 'label' => 'Eventos', 'href' => '#' ]); ?>
              <?php get_template_part('components/_partials/tag', null, [ 'label' => 'Ingredientes', 'href' => '#' ]); ?>
              <?php get_template_part('components/_partials/tag', null, [ 'label' => 'Indústria A&B', 'href' => '#' ]); ?>
              <?php get_template_part('components/_partials/tag', null, [ 'label' => 'Proteína Animal', 'href' => '#' ]); ?>
              <?php get_template_part('components/_partials/tag', null, [ 'label' => 'Tecnologia', 'href' => '#' ]); ?>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</div>
