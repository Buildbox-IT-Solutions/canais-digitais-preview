/**
 * Dropdown Menu — hover/click on nav-items with [data-trigger="dropdown"]
 * Opens a dropdown panel below the trigger.
 */
export function init() {
  // Mouse enter: open dropdown
  document.addEventListener('mouseenter', (e) => {
    const trigger = e.target.closest('[data-trigger="dropdown"]');
    if (trigger) open(trigger);
  }, true);

  // Mouse leave: close dropdown (with delay for menu access)
  document.addEventListener('mouseleave', (e) => {
    const trigger = e.target.closest('[data-trigger="dropdown"]');
    if (trigger) {
      trigger._closeTimer = setTimeout(() => close(trigger), 200);
    }
  }, true);

  // Cancel close when entering the dropdown panel
  document.addEventListener('mouseenter', (e) => {
    const panel = e.target.closest('[data-target="dropdown-panel"]');
    if (panel) {
      const trigger = panel.closest('[data-trigger="dropdown"]');
      if (trigger?._closeTimer) clearTimeout(trigger._closeTimer);
    }
  }, true);

  document.addEventListener('mouseleave', (e) => {
    const panel = e.target.closest('[data-target="dropdown-panel"]');
    if (panel) {
      const trigger = panel.closest('[data-trigger="dropdown"]');
      if (trigger) close(trigger);
    }
  }, true);

  // Click toggle for touch devices
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-trigger="dropdown"]');
    if (trigger) {
      e.preventDefault();
      trigger.classList.contains('is-open') ? close(trigger) : open(trigger);
      return;
    }
    // Click outside closes all
    document.querySelectorAll('[data-trigger="dropdown"].is-open').forEach(close);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('[data-trigger="dropdown"].is-open').forEach(close);
    }
  });
}

function open(trigger) {
  if (trigger._closeTimer) clearTimeout(trigger._closeTimer);
  const panel = trigger.querySelector('[data-target="dropdown-panel"]');
  if (!panel) return;

  // Close other open dropdowns
  document.querySelectorAll('[data-trigger="dropdown"].is-open').forEach((t) => {
    if (t !== trigger) close(t);
  });

  trigger.classList.add('is-open');
  trigger.setAttribute('aria-expanded', 'true');
  panel.classList.remove('opacity-0', 'pointer-events-none');
  panel.classList.add('opacity-100', 'pointer-events-auto');
  panel.setAttribute('aria-hidden', 'false');
}

function close(trigger) {
  const panel = trigger.querySelector('[data-target="dropdown-panel"]');
  if (!panel) return;

  trigger.classList.remove('is-open');
  trigger.setAttribute('aria-expanded', 'false');
  panel.classList.add('opacity-0', 'pointer-events-none');
  panel.classList.remove('opacity-100', 'pointer-events-auto');
  panel.setAttribute('aria-hidden', 'true');
}
