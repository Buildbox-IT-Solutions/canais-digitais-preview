<?php
/**
 * Partial: General Item — linha da lista LGPD/Privacidade (dashboard-perfil-v3 / aba Conta)
 * Figma: 6152:31288 / 6155:31409 / 6152:31290 (instâncias de "General Item")
 *
 * Icon-tile (48px) + título (Aleo Bold 16) + descrição (14) + chevron next.
 * Variante "danger" → ícone vermelho (#bf0413), label vermelha. Para "Excluir conta".
 *
 * USO:
 *   <?php get_template_part('components/_partials/general-item', null, [
 *     'icon'    => 'download',           // 'download' | 'history' | 'delete'
 *     'title'   => 'Solicitar meus dados',
 *     'desc'    => 'Receba uma cópia de tudo que armazenamos sobre você.',
 *     'href'    => '#',
 *     'danger'  => false,
 *     'isLast'  => false,
 *   ]); ?>
 */

$icon   = $args['icon']   ?? 'download';
$title  = $args['title']  ?? '';
$desc   = $args['desc']   ?? '';
$href   = $args['href']   ?? '#';
$danger = !empty($args['danger']);
$isLast = !empty($args['isLast']);

$iconPath = match($icon) {
  'history' => 'M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z',
  'delete'  => 'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z',
  default   => 'M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z',
};

$titleClasses = $danger ? 'text-red-700' : 'text-primary-600';
?>
<a href="<?= htmlspecialchars($href) ?>"
   class="flex items-center gap-4 py-4 px-1 group hover:bg-neutral-50/50 transition-colors <?= $isLast ? '' : 'border-b border-neutral-100' ?>">
  <?php get_template_part('components/_partials/icon-tile', null, [
    'iconPath' => $iconPath,
    'tone'     => $danger ? 'danger' : 'neutral',
  ]); ?>
  <div class="flex-1 min-w-0 flex flex-col gap-1">
    <p class="font-display font-bold text-title-md <?= $titleClasses ?>">
      <?= htmlspecialchars($title) ?>
    </p>
    <p class="font-body text-body-md text-neutral-600">
      <?= htmlspecialchars($desc) ?>
    </p>
  </div>
  <svg class="size-6 text-primary-600 shrink-0"
       viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
  </svg>
</a>
