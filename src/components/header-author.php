<?php
/**
 * Componente: Header Author
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=850-5000
 * Variantes: device (Desktop|Mobile) × verMais (false|true) = 4
 *
 * Cabeçalho do colunista no topo de uma página de autor. bg primary-100
 * (cinza claro), avatar SQUARED grande à esquerda, nome + role + bio +
 * "Ver mais" toggle, e à direita coluna "Siga nas Redes" com social icons.
 *
 * Desktop:
 *   - bg-primary-100 (#d4dae0) full width
 *   - max-w-1224 inner com flex
 *   - Avatar squared 152×152 rounded-sm (NÃO circular)
 *   - Coluna nome: "Author Name" Aleo Bold 22/28 primary-600 + "Role description" body-md neutral-900
 *   - Coluna bio: text-body-md neutral-900 com toggle "Ver mais" Bold no fim
 *   - Coluna social: "Siga nas Redes" label-md Bold neutral-700 + 3 icons (Insta, Twitter, Linkedin)
 *
 * Mobile:
 *   - w-375
 *   - Avatar squared 72×72
 *   - Nome title-md tracking 0.15 + role body-sm
 *   - Bio inline
 *   - Footer divider + social list horizontal
 *
 * Tokens: bg-primary-100 · text-primary-600 · text-neutral-900 · text-neutral-700 ·
 *         text-title-xl · text-title-md · text-body-md · text-body-sm · text-label-md ·
 *         font-display · font-body · rounded-sm
 */
?>
<div class="space-y-10">

  <!-- ================================================================
       DESKTOP — verMais=false (collapsed)
       ================================================================ -->
  <div class="bg-primary-100 flex items-start justify-center w-full">
    <div class="flex flex-1 items-start max-w-screen-xl">

      <!-- Avatar squared -->
      <div class="flex flex-col items-start py-6 px-4">
        <div class="rounded-sm size-[152px] overflow-hidden">
          <img src="https://i.pravatar.cc/304?img=22" alt="Foto do autor" class="w-full h-full object-cover">
        </div>
      </div>

      <!-- Container nome + bio (collapsed) -->
      <div class="flex flex-1 flex-col items-start justify-center self-stretch" data-component="bio-expandable">
        <div class="flex flex-col gap-1 items-start justify-center pb-4 pt-6 px-6 w-full">
          <p class="font-display font-bold text-title-xl text-primary-600 truncate w-full">Author Name</p>
          <p class="font-body text-body-md text-neutral-900 truncate w-full">Role description</p>
        </div>
        <div class="flex flex-col items-start justify-end pb-6 px-6 w-full">
          <p class="font-body text-body-md text-neutral-900 overflow-hidden transition-[max-height] duration-300 ease-in-out" style="max-height:60px" data-target="bio-content">
            Lorem ipsum dolor sit amet consectetur. Viverra maecenas ornare aliquam proin ridiculus turpis et. Nec consectetur sapien sed diam viverra mauris lectus magna in. Etiam quisque faucibus elit sagittis fermentum vel dui sit porttitor. Vulputate adipiscing adipiscing pellentesque convallis. Neque eu justo pulvinar ultrices laoreet imperdiet netus quisque. Ultrices mattis...
          </p>
          <button type="button" class="font-body font-bold text-label-lg text-secondary-950 hover:underline mt-1" data-trigger="bio-toggle" aria-expanded="false">ver mais</button>
        </div>
      </div>

      <!-- Social list right -->
      <div class="flex flex-col gap-2 items-end self-stretch px-4 py-6">
        <p class="font-body font-bold text-label-md text-neutral-700 uppercase tracking-wider">Siga nas Redes</p>
        <div class="flex gap-1 items-center">
          <a href="#" aria-label="Instagram" class="inline-flex items-center justify-center size-10 rounded-full text-primary-600 hover:bg-white/30 transition-colors">
            <svg class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
          <a href="#" aria-label="X / Twitter" class="inline-flex items-center justify-center size-10 rounded-full text-primary-600 hover:bg-white/30 transition-colors">
            <svg class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="#" aria-label="LinkedIn" class="inline-flex items-center justify-center size-10 rounded-full text-primary-600 hover:bg-white/30 transition-colors">
            <svg class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
        </div>
      </div>

    </div>
  </div>

  <!-- ================================================================
       DESKTOP — verMais=true (expanded)
       ================================================================ -->
  <div class="bg-primary-100 flex items-start justify-center w-full">
    <div class="flex flex-1 items-start max-w-screen-xl">

      <!-- Avatar squared -->
      <div class="flex flex-col items-start py-6 px-4">
        <div class="rounded-sm size-[152px] overflow-hidden">
          <img src="https://i.pravatar.cc/304?img=22" alt="Foto do autor" class="w-full h-full object-cover">
        </div>
      </div>

      <!-- Container nome + bio (expanded) -->
      <div class="flex flex-1 flex-col items-start justify-center self-stretch">
        <div class="flex flex-col gap-1 items-start justify-center pb-4 pt-6 px-6 w-full">
          <p class="font-display font-bold text-title-xl text-primary-600 truncate w-full">Author Name</p>
          <p class="font-body text-body-md text-neutral-900 truncate w-full">Role description</p>
        </div>
        <div class="flex flex-col items-start justify-end pb-6 px-6 w-full">
          <p class="font-body text-body-md text-neutral-900">
            Lorem ipsum dolor sit amet consectetur. Viverra maecenas ornare aliquam proin ridiculus turpis et. Nec consectetur sapien sed diam viverra mauris lectus magna in. Etiam quisque faucibus elit sagittis fermentum vel dui sit porttitor. Vulputate adipiscing adipiscing pellentesque convallis. Neque eu justo pulvinar ultrices laoreet imperdiet netus quisque. Ultrices mattis sed nunc duis amet velit. Gravida sed sed accumsan vel nulla amet eget lorem. Sed eu consectetur ornare et lacus.
          </p>
          <button type="button" class="font-body font-bold text-label-lg text-secondary-950 hover:underline mt-1">ver menos</button>
        </div>
      </div>

      <!-- Social list right -->
      <div class="flex flex-col gap-2 items-end self-stretch px-4 py-6">
        <p class="font-body font-bold text-label-md text-neutral-700 uppercase tracking-wider">Siga nas Redes</p>
        <div class="flex gap-1 items-center">
          <a href="#" aria-label="Instagram" class="inline-flex items-center justify-center size-10 rounded-full text-primary-600 hover:bg-white/30 transition-colors">
            <svg class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
          <a href="#" aria-label="X / Twitter" class="inline-flex items-center justify-center size-10 rounded-full text-primary-600 hover:bg-white/30 transition-colors">
            <svg class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="#" aria-label="LinkedIn" class="inline-flex items-center justify-center size-10 rounded-full text-primary-600 hover:bg-white/30 transition-colors">
            <svg class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
        </div>
      </div>

    </div>
  </div>

  <!-- ================================================================
       MOBILE — verMais=false
       ================================================================ -->
  <div class="bg-primary-100 flex flex-col items-start max-w-[440px] min-w-[320px] w-[375px]">

    <div class="flex items-start justify-between w-full">
      <div class="flex flex-col items-start p-4">
        <div class="rounded-sm size-[72px] overflow-hidden">
          <img src="https://i.pravatar.cc/144?img=33" alt="Foto do autor" class="w-full h-full object-cover">
        </div>
      </div>
      <div class="flex flex-1 flex-col items-start justify-center pr-4 py-4 self-stretch">
        <p class="font-display font-bold text-title-md text-primary-600 truncate w-full">Author Name</p>
        <p class="font-body text-body-sm text-neutral-900 truncate w-full">Role description</p>
      </div>
    </div>

    <div class="flex flex-col items-start pb-4 px-4 w-full">
      <p class="font-body text-body-md text-neutral-900 max-h-[60px] overflow-hidden">
        Lorem ipsum dolor sit amet consectetur. Malesuada lobortis et suscipit erat. Convallis ultrices et iaculis blandit aenean s...
      </p>
      <button type="button" class="font-body font-bold text-label-lg text-secondary-950 hover:underline mt-1">ver mais</button>
    </div>

    <div class="flex flex-col items-start w-full">
      <?php get_template_part('components/_partials/divider', null, [ 'orientation' => 'horizontal' ]); ?>
      <div class="flex gap-4 items-center justify-end px-4 py-2 w-full">
        <p class="flex-1 font-body font-bold text-label-md text-neutral-700 uppercase tracking-wider">Siga nas Redes</p>
        <div class="flex gap-1 items-center">
          <a href="#" aria-label="LinkedIn" class="inline-flex items-center justify-center size-8 rounded-full text-primary-600 hover:bg-white/30 transition-colors">
            <svg class="size-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a href="#" aria-label="X / Twitter" class="inline-flex items-center justify-center size-8 rounded-full text-primary-600 hover:bg-white/30 transition-colors">
            <svg class="size-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="#" aria-label="Instagram" class="inline-flex items-center justify-center size-8 rounded-full text-primary-600 hover:bg-white/30 transition-colors">
            <svg class="size-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
        </div>
      </div>
    </div>

  </div>

</div>
