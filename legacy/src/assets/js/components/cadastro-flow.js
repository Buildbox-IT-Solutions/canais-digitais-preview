/**
 * cadastro-flow.js — Interações "como se fosse real" para o fluxo de cadastro
 *
 * Todos os comportamentos usam event delegation no document — não dependem
 * de timing de render. Compatível com os data-attrs já emitidos pelos layouts.
 *
 * Cobre:
 *   1. Toggle de visibilidade de senha (data-login-action="toggle-password")
 *   2. Sincronização visual do checkbox custom (input sr-only + span pintado)
 *   3. Medidor de força de senha (atualiza o partial password-strength em tempo real)
 *
 * Não substitui os JS "de verdade" definidos em FEATURE-cadastro.md §7 —
 * é um polyfill leve para o preview se comportar como um site real.
 */

function evaluateCriteria(value) {
  return {
    length:    value.length >= 8,
    uppercase: /[A-Z]/.test(value),
    number:    /\d/.test(value),
    special:   /[^A-Za-z0-9]/.test(value),
  };
}

function levelFromCriteria(criteria, value) {
  if (!value) return 'empty';
  const count = Object.values(criteria).filter(Boolean).length;
  if (count <= 2) return 'weak';
  if (count === 3) return 'medium';
  return 'strong';
}

const STRENGTH_META = {
  empty:  { value: 0, label: '',       color: 'bg-neutral-100', text: 'text-neutral-500', fills: 0 },
  weak:   { value: 1, label: 'Fraca',  color: 'bg-[#DC2626]',   text: 'text-[#DC2626]',   fills: 1 },
  medium: { value: 2, label: 'Média',  color: 'bg-[#F59E0B]',   text: 'text-[#F59E0B]',   fills: 2 },
  strong: { value: 3, label: 'Forte',  color: 'bg-[#16A34A]',   text: 'text-[#16A34A]',   fills: 3 },
};

function updatePasswordMeter(meter, value) {
  const criteria = evaluateCriteria(value);
  const level = levelFromCriteria(criteria, value);
  const meta = STRENGTH_META[level];

  meter.dataset.level = level;
  meter.setAttribute('aria-valuenow', String(meta.value));

  const segments = meter.querySelectorAll('[data-password-strength-bar] > div');
  segments.forEach((seg, i) => {
    seg.classList.remove('bg-neutral-100', 'bg-[#DC2626]', 'bg-[#F59E0B]', 'bg-[#16A34A]');
    seg.classList.add(i < meta.fills ? meta.color : 'bg-neutral-100');
  });

  const label = meter.querySelector('[data-password-strength-label]');
  if (label) {
    label.classList.remove('text-neutral-500', 'text-[#DC2626]', 'text-[#F59E0B]', 'text-[#16A34A]');
    label.classList.add(meta.text);
    label.textContent = meta.label ? 'Força: ' + meta.label : '';
  }

  meter.querySelectorAll('[data-password-criterion]').forEach((li) => {
    const key = li.dataset.passwordCriterion;
    const met = !!criteria[key];
    li.dataset.met = met ? 'true' : 'false';
    li.querySelector('[data-icon="unmet"]')?.classList.toggle('hidden', met);
    li.querySelector('[data-icon="met"]')?.classList.toggle('hidden', !met);
    const text = li.querySelector('[data-criterion-label]');
    if (text) {
      text.classList.toggle('text-neutral-950', met);
      text.classList.toggle('font-semibold', met);
      text.classList.toggle('text-neutral-700', !met);
    }
  });
}

const CHECK_ICON = '<svg class="size-3 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';

function syncCheckboxVisual(input) {
  // O visual é o primeiro <span> filho do <label> ancestral (irmão do <input class="sr-only">)
  const label = input.closest('label');
  if (!label) return;
  const visual = label.querySelector('span.inline-flex');
  if (!visual) return;

  if (input.checked) {
    visual.classList.remove('border-neutral-950', 'bg-white');
    visual.classList.add('border-secondary-950', 'bg-secondary-950');
    visual.innerHTML = CHECK_ICON;
  } else {
    visual.classList.remove('border-secondary-950', 'bg-secondary-950');
    visual.classList.add('border-neutral-950', 'bg-white');
    visual.innerHTML = '';
  }
}

// ----- Toast helper (expõe window.showToast usado pelos toggles) -----
const TOAST_ICONS = {
  success: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="size-5 shrink-0 text-[#16A34A]"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',
  error:   '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="size-5 shrink-0 text-[#bf0413]"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>',
  warning: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="size-5 shrink-0 text-[#F59E0B]"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>',
  info:    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="size-5 shrink-0 text-secondary-950"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>',
};
const TOAST_BORDERS = {
  success: 'border-l-[#16A34A]',
  error:   'border-l-[#bf0413]',
  warning: 'border-l-[#F59E0B]',
  info:    'border-l-secondary-950',
};

function ensureToastContainer() {
  let c = document.getElementById('toast-container');
  if (c) return c;
  c = document.createElement('div');
  c.id = 'toast-container';
  c.className = 'fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none';
  document.body.appendChild(c);
  return c;
}

function showToast(type, message, { duration = 4000 } = {}) {
  const container = ensureToastContainer();
  const toast = document.createElement('div');
  toast.setAttribute('role', type === 'error' || type === 'warning' ? 'alert' : 'status');
  toast.setAttribute('aria-live', type === 'error' || type === 'warning' ? 'assertive' : 'polite');
  toast.className = [
    'pointer-events-auto flex items-start gap-3 w-full max-w-[420px]',
    'bg-white border border-neutral-100 border-l-4', TOAST_BORDERS[type] || TOAST_BORDERS.info,
    'rounded-lg shadow-lg p-4',
    'opacity-0 translate-y-2 transition-all duration-200',
  ].join(' ');
  toast.innerHTML = `
    ${TOAST_ICONS[type] || TOAST_ICONS.info}
    <p class="flex-1 font-body text-body-md text-neutral-950">${message}</p>
    <button type="button" aria-label="Fechar notificação" class="shrink-0 text-neutral-500 hover:text-neutral-950 transition-colors" data-toast-dismiss>
      <svg class="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
    </button>
  `;
  container.appendChild(toast);
  requestAnimationFrame(() => {
    toast.classList.remove('opacity-0', 'translate-y-2');
    toast.classList.add('opacity-100', 'translate-y-0');
  });
  const dismiss = () => {
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 220);
  };
  toast.querySelector('[data-toast-dismiss]')?.addEventListener('click', dismiss);
  if (duration > 0) setTimeout(dismiss, duration);
  return toast;
}

if (typeof window !== 'undefined') window.showToast = showToast;

// ----- Sync visual do thumb do toggle -----
function syncToggleThumb(input) {
  const thumb = input.closest('label')?.querySelector('[data-toggle-thumb]');
  if (!thumb) return;
  thumb.classList.toggle('translate-x-5', input.checked);
}

// ----- Cooldown button (data-cooldown=N segundos) -----
function startCooldown(btn, seconds) {
  if (btn.dataset.cooldownActive === '1') return;
  btn.dataset.cooldownActive = '1';
  const originalHTML = btn.innerHTML;
  const originalDisabled = btn.disabled;
  let remaining = seconds;
  btn.disabled = true;
  btn.setAttribute('aria-disabled', 'true');
  const tick = () => {
    btn.innerHTML = `Aguarde ${remaining}s`;
    if (remaining <= 0) {
      btn.innerHTML = originalHTML;
      btn.disabled = originalDisabled;
      btn.removeAttribute('aria-disabled');
      btn.dataset.cooldownActive = '0';
      return;
    }
    remaining -= 1;
    setTimeout(tick, 1000);
  };
  tick();
}

// ----- Countdown mm:ss (locked state, 15min) -----
function startCountdownEl(el) {
  const [m0, s0] = (el.textContent || '15:00').split(':').map(Number);
  let total = (m0 || 15) * 60 + (s0 || 0);
  const tick = () => {
    if (total <= 0) { el.textContent = '00:00'; return; }
    total -= 1;
    const m = String(Math.floor(total / 60)).padStart(2, '0');
    const s = String(total % 60).padStart(2, '0');
    el.textContent = `${m}:${s}`;
    setTimeout(tick, 1000);
  };
  tick();
}

export function init() {
  // 1. Toggle password visibility
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-login-action="toggle-password"]');
    if (!btn) return;
    const id = btn.dataset.target;
    const input = id
      ? document.getElementById(id)
      : btn.closest('[data-password-field]')?.querySelector('input[type="password"], input[type="text"]');
    if (!input) return;
    const revealing = input.type === 'password';
    input.type = revealing ? 'text' : 'password';
    btn.setAttribute('aria-label', revealing ? 'Esconder senha' : 'Mostrar senha');
    btn.querySelector('[data-icon="show"]')?.classList.toggle('hidden', revealing);
    btn.querySelector('[data-icon="hide"]')?.classList.toggle('hidden', !revealing);
  });

  // 4. Auto-save preferência (toggle) + sync do thumb
  document.querySelectorAll('label input[type="checkbox"].sr-only[data-analytics-event="preferencia_toggle"]').forEach(syncToggleThumb);
  document.addEventListener('change', (e) => {
    const input = e.target;
    if (!(input instanceof HTMLInputElement)) return;
    if (input.type !== 'checkbox') return;
    if (!input.classList.contains('sr-only')) return;
    if (input.dataset.analyticsEvent !== 'preferencia_toggle') return;
    syncToggleThumb(input);
    showToast('success', 'Preferência salva.');
  });

  // 5. Cooldown em botões de reenvio (data-cooldown)
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-confirmacao-action="resend"][data-cooldown]');
    if (!btn) return;
    e.preventDefault();
    const secs = parseInt(btn.dataset.cooldown, 10) || 60;
    startCooldown(btn, secs);
    showToast('info', 'Novo link enviado. Verifique seu e-mail.');
  });

  // 6. Countdown de bloqueio (locked)
  document.querySelectorAll('[data-login-countdown]').forEach(startCountdownEl);

  // 7. User menu dropdown (header-desktop v3.0)
  const menu = document.querySelector('[data-user-menu]');
  if (menu) {
    const trigger = menu.querySelector('[data-user-menu-trigger]');
    const panel   = menu.querySelector('[data-user-menu-panel]');
    const chevron = menu.querySelector('[data-chevron]');

    const open = () => {
      panel.classList.remove('opacity-0', 'scale-95', 'pointer-events-none');
      panel.classList.add('opacity-100', 'scale-100');
      panel.setAttribute('aria-hidden', 'false');
      trigger.setAttribute('aria-expanded', 'true');
      chevron?.classList.add('rotate-180');
    };
    const close = () => {
      panel.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
      panel.classList.remove('opacity-100', 'scale-100');
      panel.setAttribute('aria-hidden', 'true');
      trigger.setAttribute('aria-expanded', 'false');
      chevron?.classList.remove('rotate-180');
    };

    trigger?.addEventListener('click', (e) => {
      e.stopPropagation();
      panel.classList.contains('pointer-events-none') ? open() : close();
    });
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target)) close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  }

  // 8. Propagar ?user= em todos os links internos do portal
  const params = new URLSearchParams(window.location.search);
  const userParam = params.get('user');
  if (userParam) {
    const EXCLUDED = ['login-modal','cadastro','recupera','redefine','confirmacao','onboarding'];
    document.querySelectorAll('a[href]').forEach(link => {
      try {
        const url = new URL(link.href, window.location.origin);
        if (url.origin !== window.location.origin) return;
        if (EXCLUDED.some(p => url.pathname.includes(p))) return;
        url.searchParams.set('user', userParam);
        link.href = url.toString();
      } catch (_) {}
    });
  }

  // 2. Password strength em tempo real (barra + critérios)
  document.addEventListener('input', (e) => {
    const input = e.target;
    if (!(input instanceof HTMLInputElement)) return;
    if (input.type !== 'password' && input.type !== 'text') return;
    if (!input.id) return;
    const meter = document.querySelector(
      '[data-password-strength][data-target="' + input.id + '"]'
    );
    if (!meter) return;
    updatePasswordMeter(meter, input.value);
  });

  // Sincroniza estado inicial caso o input já venha pré-preenchido (estados de erro)
  document.querySelectorAll('[data-password-strength][data-target]').forEach((meter) => {
    const input = document.getElementById(meter.dataset.target);
    if (input && input.value) updatePasswordMeter(meter, input.value);
  });

  // 3. Sincronizar checkbox visual (clique no label ou via teclado)
  // Inicializar estado atual (caso o PHP tenha renderizado checked)
  document.querySelectorAll('label input[type="checkbox"].sr-only').forEach(syncCheckboxVisual);
  document.addEventListener('change', (e) => {
    const input = e.target;
    if (!(input instanceof HTMLInputElement)) return;
    if (input.type !== 'checkbox') return;
    if (!input.classList.contains('sr-only')) return;
    syncCheckboxVisual(input);
  });
}
