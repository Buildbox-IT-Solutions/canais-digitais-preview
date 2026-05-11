<?php
/**
 * Partial: Footer Desktop
 *
 * Versão Desktop do Footer (bg primary-600, brand Informa, grid 11
 * editorias, descrição oficial, legal links, copyright + social list
 * vertical à direita).
 *
 * Source: extraído de /src/components/footer.php (Desktop block).
 *
 * USO:
 *   <?php get_template_part('components/_partials/footer-desktop', null, []); ?>
 *
 * PROPS ($args):
 *   nenhuma — o footer é estático na sua versão atual.
 *
 * Tokens: bg-primary-600 · text-white · text-label-lg · text-body-sm ·
 *         border-white · font-body · font-display · rounded-full
 */
?>
<footer class="w-full bg-primary-600 text-white">
  <div class="max-w-screen-xl mx-auto flex gap-[72px] items-start px-6">

    <!-- Conteúdo principal (flex-1) -->
    <div class="flex-1 flex flex-col items-start">

      <div class="flex items-start pt-8 pb-4 w-full">
        <div class="h-10 inline-flex items-center font-display font-bold text-title-xl text-white">
          informa
        </div>
      </div>

      <div class="grid grid-cols-4 gap-x-14 gap-y-4 py-4 w-full">
        <a href="/src/layouts/categoria.php" class="font-body font-semibold text-label-lg text-white hover:text-primary-100 transition-colors">Eventos</a>
        <a href="/src/layouts/categoria.php" class="font-body font-semibold text-label-lg text-white hover:text-primary-100 transition-colors">Ingredientes</a>
        <a href="/src/layouts/categoria.php" class="font-body font-semibold text-label-lg text-white hover:text-primary-100 transition-colors">Indústria A&amp;B</a>
        <a href="/src/layouts/categoria.php" class="font-body font-semibold text-label-lg text-white hover:text-primary-100 transition-colors">Proteína Animal</a>
        <a href="/src/layouts/categoria.php" class="font-body font-semibold text-label-lg text-white hover:text-primary-100 transition-colors">Food Service</a>
        <a href="/src/layouts/categoria.php" class="font-body font-semibold text-label-lg text-white hover:text-primary-100 transition-colors">Sorvetes</a>
        <a href="/src/layouts/categoria.php" class="font-body font-semibold text-label-lg text-white hover:text-primary-100 transition-colors">Tecnologia</a>
        <a href="/src/layouts/categoria.php" class="font-body font-semibold text-label-lg text-white hover:text-primary-100 transition-colors">Embalagens</a>
        <a href="/src/layouts/categoria.php" class="font-body font-semibold text-label-lg text-white hover:text-primary-100 transition-colors">ESG</a>
        <a href="/src/layouts/categoria.php" class="font-body font-semibold text-label-lg text-white hover:text-primary-100 transition-colors">Especialistas</a>
        <a href="/src/layouts/categoria.php" class="font-body font-semibold text-label-lg text-white hover:text-primary-100 transition-colors">E-books</a>
      </div>

      <div class="flex flex-col gap-4 items-center justify-center py-4 w-full">
        <div class="h-px w-full bg-neutral-100/50"></div>
        <p class="text-body-sm font-body text-white w-full leading-4">
          Canal de conteúdo oficial das feiras FiSA, Fispal Tecnologia, Tecnocarne e Fispal Food Service. Aqui você encontra conteúdo relevante e entrevistas com profissionais que compartilham informações, tendências e ideias para revolucionar a cadeia de alimentos e bebidas.
        </p>
        <div class="h-px w-full bg-neutral-100/50"></div>
      </div>

      <div class="flex items-center w-full">
        <div class="flex-1 flex flex-wrap gap-x-14 gap-y-4 items-start pb-10 pt-4">
          <a href="#" class="font-body font-semibold text-label-lg text-white hover:text-primary-100 transition-colors">Acessibilidade</a>
          <a href="#" class="font-body font-semibold text-label-lg text-white hover:text-primary-100 transition-colors">Termos e condições do visitante</a>
          <a href="#" class="font-body font-semibold text-label-lg text-white hover:text-primary-100 transition-colors">Termos de Uso</a>
          <a href="#" class="font-body font-semibold text-label-lg text-white hover:text-primary-100 transition-colors">Política de privacidade</a>
        </div>
        <div class="flex items-center justify-end pb-10 pt-4">
          <p class="font-body text-body-sm text-white whitespace-nowrap">© 2026 Informa PLC</p>
        </div>
      </div>
    </div>

    <!-- Social list vertical (direita) -->
    <div class="flex flex-col gap-4 items-end px-4 py-8 self-stretch">
      <a href="#" aria-label="WhatsApp" class="inline-flex items-center justify-center size-10 rounded-full border border-white text-white hover:bg-white/10 transition-colors">
        <svg class="size-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
      <a href="#" aria-label="LinkedIn" class="inline-flex items-center justify-center size-10 rounded-full border border-white text-white hover:bg-white/10 transition-colors">
        <svg class="size-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      </a>
      <a href="#" aria-label="Facebook" class="inline-flex items-center justify-center size-10 rounded-full border border-white text-white hover:bg-white/10 transition-colors">
        <svg class="size-5" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
      </a>
      <a href="#" aria-label="YouTube" class="inline-flex items-center justify-center size-10 rounded-full border border-white text-white hover:bg-white/10 transition-colors">
        <svg class="size-5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
      </a>
      <a href="#" aria-label="X / Twitter" class="inline-flex items-center justify-center size-10 rounded-full border border-white text-white hover:bg-white/10 transition-colors">
        <svg class="size-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      </a>
    </div>

  </div>
</footer>
<script type="module" src="/src/assets/js/interactions.js"></script>
