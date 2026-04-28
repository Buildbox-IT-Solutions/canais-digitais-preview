/**
 * Side Menu — slide from left with overlay
 * Trigger: [data-trigger="side-menu"]
 * Target: [data-component="side-menu"]
 */
export function init() {
  document.addEventListener('click', (e) => {
    // Open trigger
    const openBtn = e.target.closest('[data-trigger="side-menu"]');
    if (openBtn) {
      const menu = document.querySelector('[data-component="side-menu"]');
      if (menu) open(menu);
      return;
    }
    // Close button
    const closeBtn = e.target.closest('[data-action="side-menu-close"]');
    if (closeBtn) {
      const menu = closeBtn.closest('[data-component="side-menu"]');
      if (menu) close(menu);
      return;
    }
    // Overlay click
    const overlay = e.target.closest('[data-el="side-menu-overlay"]');
    if (overlay) {
      const menu = overlay.closest('[data-component="side-menu"]');
      if (menu) close(menu);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('[data-component="side-menu"].is-open').forEach(close);
    }
  });
}

function open(menu) {
  menu.classList.add('is-open');
  menu.setAttribute('aria-hidden', 'false');

  const panel = menu.querySelector('[data-el="side-menu-panel"]');
  const overlay = menu.querySelector('[data-el="side-menu-overlay"]');
  if (panel) panel.style.transform = 'translateX(0)';
  if (overlay) {
    overlay.classList.remove('opacity-0', 'pointer-events-none');
    overlay.classList.add('opacity-100', 'pointer-events-auto');
  }
  document.body.style.overflow = 'hidden';
}

function close(menu) {
  menu.classList.remove('is-open');
  menu.setAttribute('aria-hidden', 'true');

  const panel = menu.querySelector('[data-el="side-menu-panel"]');
  const overlay = menu.querySelector('[data-el="side-menu-overlay"]');
  if (panel) panel.style.transform = 'translateX(-100%)';
  if (overlay) {
    overlay.classList.add('opacity-0', 'pointer-events-none');
    overlay.classList.remove('opacity-100', 'pointer-events-auto');
  }
  document.body.style.overflow = '';
}
