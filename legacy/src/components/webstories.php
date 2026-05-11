<?php
/**
 * Componente: Webstories + img-frame
 * Figma Webstories: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=202-2100
 * Figma img-frame:  https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=202-4047
 * Variantes: 2 (Enabled|Hovered)
 *
 * Card vertical estilo "stories" para uso em carrosséis. Características:
 *   - Aspect 320/569 (≈ 9:16)
 *   - Width fixo 320 (NÃO 180)
 *   - rounded-sm
 *   - Conteúdo overlay sobre imagem com 2 áreas:
 *     - Top: categoria container com Categoria chip ON
 *     - Bottom: headline container com background:
 *       · Enabled: bg sólido `bg-primary-600/70`
 *       · Hovered: gradient `from-primary-600/0 via-primary-600/70 to-primary-600`
 *     - Headline: Aleo Bold 16/24 tracking 0.15 white
 *     - Lead (apenas Hovered): Open Sans Regular 14/20 tracking 0.25 white
 *   - Hovered tem zoom da imagem (370/660 → original 320/569)
 *
 * Tokens: bg-primary-600 · text-white · text-title-md · text-body-md ·
 *         font-display · font-body · rounded-sm
 */
?>
<div class="space-y-8">

  <!-- ===== Carrossel: Enabled (×3) + Hovered (×1) ===== -->
  <div class="flex gap-4 overflow-x-auto pb-2">

    <!-- Enabled 1 -->
    <div class="shrink-0 w-[320px] aspect-[320/569] relative rounded-sm overflow-hidden">
      <img src="https://picsum.photos/seed/ws1/640/1138" alt="Story" class="absolute inset-0 w-full h-full object-cover">
      <div class="absolute inset-0 flex flex-col justify-between">
        <!-- Categoria container -->
        <div class="flex flex-col items-start p-5">
          <?php get_template_part('components/_partials/categoria', null, [
            'color' => 'mint', 'chip' => 'on', 'label' => 'Categoria', 'href' => null,
          ]); ?>
        </div>
        <!-- Headline container (bg sólido primary-600/70) -->
        <div class="bg-primary-600/70 flex flex-col gap-2 items-start px-5 py-4 w-full">
          <h3 class="font-display font-bold text-title-md text-white w-full">
            Lorem ipsum dolor sit amet consectetur. Enim etiam turpis accumsan a erat donec volutpat aenean ultricies. Velit montes turpis orci sed nec fringilla posuere.
          </h3>
        </div>
      </div>
    </div>

    <!-- Enabled 2 -->
    <div class="shrink-0 w-[320px] aspect-[320/569] relative rounded-sm overflow-hidden">
      <img src="https://picsum.photos/seed/ws2/640/1138" alt="Story" class="absolute inset-0 w-full h-full object-cover">
      <div class="absolute inset-0 flex flex-col justify-between">
        <div class="flex flex-col items-start p-5">
          <?php get_template_part('components/_partials/categoria', null, [
            'color' => 'coral', 'chip' => 'on', 'label' => 'Categoria', 'href' => null,
          ]); ?>
        </div>
        <div class="bg-primary-600/70 flex flex-col gap-2 items-start px-5 py-4 w-full">
          <h3 class="font-display font-bold text-title-md text-white w-full">
            Dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </h3>
        </div>
      </div>
    </div>

    <!-- Hovered (com zoom + lead + gradient) -->
    <div class="shrink-0 w-[320px] aspect-[320/569] relative rounded-sm overflow-hidden group">
      <img src="https://picsum.photos/seed/ws3/640/1138" alt="Story" class="absolute inset-0 w-full h-full object-cover scale-110 transition-transform duration-700">
      <div class="absolute inset-0 flex flex-col justify-between">
        <div class="flex flex-col items-start p-5">
          <?php get_template_part('components/_partials/categoria', null, [
            'color' => 'saffron', 'chip' => 'on', 'label' => 'Categoria', 'href' => null,
          ]); ?>
        </div>
        <!-- Headline container (gradient) -->
        <div class="bg-gradient-to-b from-primary-600/0 via-primary-600/70 to-primary-600 flex flex-col gap-2 items-start px-5 py-4 w-full">
          <h3 class="font-display font-bold text-title-md text-white w-full">
            Lorem ipsum dolor sit amet consectetur. Enim etiam turpis accumsan a erat donec volutpat aenean ultricies.
          </h3>
          <p class="font-body text-body-md text-white w-full">
            Lorem ipsum dolor sit amet consectetur. Quisque dolor nunc nec scelerisque sed volutpat nisi. Vitae commodo tincidunt libero vulputate varius.
          </p>
        </div>
      </div>
    </div>

    <!-- Enabled 4 -->
    <div class="shrink-0 w-[320px] aspect-[320/569] relative rounded-sm overflow-hidden">
      <img src="https://picsum.photos/seed/ws4/640/1138" alt="Story" class="absolute inset-0 w-full h-full object-cover">
      <div class="absolute inset-0 flex flex-col justify-between">
        <div class="flex flex-col items-start p-5">
          <?php get_template_part('components/_partials/categoria', null, [
            'color' => 'lavander', 'chip' => 'on', 'label' => 'Categoria', 'href' => null,
          ]); ?>
        </div>
        <div class="bg-primary-600/70 flex flex-col gap-2 items-start px-5 py-4 w-full">
          <h3 class="font-display font-bold text-title-md text-white w-full">
            Neque eget sagittis tellus enim mauris non id rhoncus dignissim egestas tempus.
          </h3>
        </div>
      </div>
    </div>

  </div>

</div>
