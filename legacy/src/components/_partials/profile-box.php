<?php
/**
 * Partial: Profile Box — card de seção do dashboard-perfil-v3 / aba Perfil
 * Figma: 6152:31044 / 6152:31045 / 6152:31046 (Profile Box variantes)
 *
 * Card border #d6d8dd rounded-lg. 3 colunas:
 *   1. icon-tile + título + descrição
 *   2. preview de campos (texto, ou placeholder se vazio)
 *   3. botão Atualizar/Preencher (outlined pill primary)
 *
 * Variante "incomplete": chip "Complete seu Perfil" no topo (mint-light + star).
 *
 * USO:
 *   <?php get_template_part('components/_partials/profile-box', null, [
 *     'icon'        => 'account_circle',  // 'account_circle' | 'business_center' | 'location_on'
 *     'title'       => 'Dados pessoais',
 *     'description' => 'Informações de identificação da sua conta',
 *     'fields'      => ['Mariana Albuquerque', 'mariana@empresa.com.br', '+55 11 98786-9879'],
 *     'href'        => '?tab=perfil&drawer=dados-pessoais',
 *     'cta'         => 'Atualizar',       // 'Atualizar' | 'Preencher'
 *     'incomplete'  => false,             // true → chip no topo + texto em placeholder
 *     'chip'        => 'Complete seu Perfil',
 *   ]); ?>
 *
 * PROPS ($args):
 *   icon        → string  — material icon name (3 disponíveis)
 *   title       → string
 *   description → string
 *   fields      → array<string>  — valor (ou label-placeholder, quando $placeholder) de cada linha
 *   href        → string  — destino do botão (geralmente abre o drawer)
 *   cta         → string  — label do botão
 *   incomplete  → bool    — exibe chip no topo
 *   placeholder → bool    — texto dos fields em neutral-400 (use quando os fields são labels-hint, não valores reais)
 *   chip        → string  — label do chip (default: 'Complete seu Perfil')
 */

$icon        = $args['icon']        ?? 'account_circle';
$title       = $args['title']       ?? '';
$description = $args['description'] ?? '';
$fields      = $args['fields']      ?? [];
$href        = $args['href']        ?? '#';
$cta         = $args['cta']         ?? 'Atualizar';
$incomplete  = !empty($args['incomplete']);
$placeholder = !empty($args['placeholder']);
$chip        = $args['chip']        ?? 'Complete seu Perfil';

$fieldTextColor = $placeholder ? 'text-neutral-400' : 'text-neutral-950';

$iconPath = match($icon) {
  'business_center' => 'M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z',
  'location_on'     => 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
  default           => 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z',
};

?>
<div class="bg-white border border-neutral-100 rounded-lg w-full">
  <?php if ($incomplete): ?>
  <div class="px-6 pt-4 flex">
    <?php get_template_part('components/_partials/badge', null, [
      'label' => $chip,
      'tone'  => 'mint',
      'icon'  => 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z',
    ]); ?>
  </div>
  <?php endif; ?>

  <div class="flex items-stretch w-full">
    <!-- Col 1: title + description -->
    <div class="flex-1 min-w-0 flex items-start gap-4 <?= $incomplete ? 'pt-3 pb-6 px-6' : 'p-6' ?>">
      <div class="bg-neutral-100 inline-flex items-center justify-center p-3 rounded-sm shrink-0">
        <svg class="size-6 text-primary-600" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="<?= $iconPath ?>"/>
        </svg>
      </div>
      <div class="flex-1 min-w-0 flex flex-col gap-1">
        <h3 class="font-display font-bold text-title-md text-primary-600">
          <?= htmlspecialchars($title) ?>
        </h3>
        <p class="font-body text-body-md text-neutral-700">
          <?= htmlspecialchars($description) ?>
        </p>
      </div>
    </div>

    <!-- Col 2: fields preview -->
    <div class="flex-1 min-w-0 flex flex-col gap-1 <?= $incomplete ? 'pt-3 pb-6 px-6' : 'p-6' ?>">
      <?php foreach ($fields as $f): ?>
      <p class="font-body text-body-md <?= $fieldTextColor ?> truncate">
        <?= htmlspecialchars($f) ?>
      </p>
      <?php endforeach; ?>
    </div>

    <!-- Col 3: CTA -->
    <div class="shrink-0 flex flex-col items-end justify-center <?= $incomplete ? 'pt-3 pb-6 px-6' : 'p-6' ?>">
      <a href="<?= htmlspecialchars($href) ?>"
         class="inline-flex items-center gap-2 h-8 pl-3 pr-4 rounded-full border-[1.5px] border-primary-600 text-primary-600 hover:bg-neutral-50 transition-colors font-body font-bold text-body-md shrink-0">
        <svg class="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
        </svg>
        <?= htmlspecialchars($cta) ?>
      </a>
    </div>
  </div>
</div>
