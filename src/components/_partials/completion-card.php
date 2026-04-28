<?php
/**
 * Partial: Completion Card — card gamificado com gauge circular (dashboard)
 * Fundo primary-600 → primary-800 + gauge SVG + CTA "Completar agora".
 *
 * USO:
 *   <?php get_template_part('components/_partials/completion-card', null, [
 *     'filled'      => 7,
 *     'total'       => 14,
 *     'nextFields'  => ['CPF / CNPJ', 'País', 'Estado'],
 *     'href'        => '/src/layouts/dashboard.php?section=perfil',
 *   ]); ?>
 *
 * PROPS ($args):
 *   filled     → int (campos preenchidos)
 *   total      → int (total de campos, padrão 14)
 *   nextFields → array<string> (lista de 3 próximos labels)
 *   href       → string (destino do CTA)
 */

$filled = max(0, (int)($args['filled'] ?? 0));
$total  = max(1, (int)($args['total'] ?? 14));
$filled = min($filled, $total);
$pct = (int) round(($filled / $total) * 100);
$nextFields = $args['nextFields'] ?? [];
$href = $args['href'] ?? '#';

// Arco SVG — circunferência 2π·54 ≈ 339.29
$circumference = 2 * M_PI * 54;
$arcLength = ($pct / 100) * $circumference;
$remainingFields = $total - $filled;
?>
<div class="relative overflow-hidden rounded-xl shadow-lg p-9 text-white"
     style="background: linear-gradient(120deg, var(--color-primary-600) 0%, var(--color-primary-800) 100%);">

  <!-- Glow decorativo -->
  <div class="pointer-events-none absolute -right-16 -top-16 size-60 rounded-full"
       style="background: radial-gradient(circle, rgba(255,84,124,.25), transparent 65%); filter: blur(4px);"></div>

  <div class="relative flex items-center gap-9 flex-wrap">

    <!-- Gauge SVG -->
    <div class="relative size-32 shrink-0">
      <svg width="128" height="128" viewBox="0 0 124 124" aria-hidden="true">
        <circle cx="62" cy="62" r="54" fill="none" stroke="rgba(255,255,255,.14)" stroke-width="8"/>
        <circle cx="62" cy="62" r="54" fill="none" stroke="var(--color-coral)" stroke-width="8"
                stroke-linecap="round"
                stroke-dasharray="<?= number_format($arcLength, 2, '.', '') ?> 999"
                transform="rotate(-90 62 62)"
                style="transition: stroke-dasharray 600ms cubic-bezier(0.2,0,0,1);"/>
      </svg>
      <div class="absolute inset-0 flex flex-col items-center justify-center">
        <div class="font-display font-bold text-display-sm text-white leading-none">
          <?= $pct ?><span class="text-body-lg text-white/60">%</span>
        </div>
        <div class="font-body font-semibold text-label-sm uppercase tracking-wider text-white/60 mt-1">
          <?= $filled ?>/<?= $total ?>
        </div>
      </div>
    </div>

    <!-- Texto + CTA -->
    <div class="flex-1 min-w-[260px] flex flex-col gap-3">
      <span class="inline-flex w-fit items-center rounded-xs bg-coral text-white px-2 py-1 font-body font-bold text-label-sm uppercase tracking-wider">
        Complete seu perfil
      </span>
      <h3 class="font-display font-bold text-headline-md text-white leading-tight">
        <?php if ($remainingFields > 0): ?>
          Faltam <?= $remainingFields ?> campos para 100%<span class="text-coral">.</span>
        <?php else: ?>
          Perfil 100% completo<span class="text-coral">.</span>
        <?php endif; ?>
      </h3>
      <?php if ($remainingFields > 0 && !empty($nextFields)): ?>
      <p class="font-body text-body-md text-white/75 max-w-md">
        Próximos campos: <strong class="text-white font-bold"><?= implode(', ', array_slice($nextFields, 0, 3)) ?></strong>. Perfis completos recebem indicações mais precisas e destaque nos nossos eventos.
      </p>
      <?php else: ?>
      <p class="font-body text-body-md text-white/75 max-w-md">
        Você tem acesso às recomendações mais precisas e ao destaque nos nossos eventos.
      </p>
      <?php endif; ?>
      <div class="mt-2">
        <a href="<?= $href ?>"
           class="inline-flex items-center justify-center gap-2 h-10 pl-5 pr-4 rounded-full bg-white text-primary-600 hover:bg-neutral-50 font-body font-bold text-body-lg transition-colors">
          <?= $remainingFields > 0 ? 'Completar agora' : 'Revisar perfil' ?>
          <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </div>
  </div>
</div>
