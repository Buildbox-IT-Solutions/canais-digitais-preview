/**
 * Header Informa — toggle painel institucional
 * Trigger: click no [data-component="header-informa"]
 * States: is-open on the component wrapper
 */
export function init() {
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-component="header-informa"]');
    if (trigger) {
      e.preventDefault();
      toggle(trigger);
      return;
    }
    // Click outside closes all open panels
    document.querySelectorAll('[data-component="header-informa"].is-open').forEach(close);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('[data-component="header-informa"].is-open').forEach(close);
    }
  });
}

function toggle(el) {
  el.classList.contains('is-open') ? close(el) : open(el);
}

function open(el) {
  const panel = el.querySelector('[data-target="header-informa-panel"]');
  const chevron = el.querySelector('[data-icon="chevron"]');
  if (!panel) return;

  el.classList.add('is-open');
  el.setAttribute('aria-expanded', 'true');
  panel.style.maxHeight = panel.scrollHeight + 'px';
  panel.setAttribute('aria-hidden', 'false');
  if (chevron) chevron.style.transform = 'rotate(180deg)';
}

function close(el) {
  const panel = el.querySelector('[data-target="header-informa-panel"]');
  const chevron = el.querySelector('[data-icon="chevron"]');
  if (!panel) return;

  el.classList.remove('is-open');
  el.setAttribute('aria-expanded', 'false');
  panel.style.maxHeight = '0';
  panel.setAttribute('aria-hidden', 'true');
  if (chevron) chevron.style.transform = '';
}
