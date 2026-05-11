/**
 * Bottom Sheet — slide up with overlay
 * Trigger: [data-trigger="bottom-sheet"]
 * Target: [data-component="bottom-sheet"]
 */
export function init() {
  document.addEventListener('click', (e) => {
    const openBtn = e.target.closest('[data-trigger="bottom-sheet"]');
    if (openBtn) {
      const targetId = openBtn.dataset.target;
      const sheet = targetId
        ? document.querySelector(`[data-component="bottom-sheet"][data-id="${targetId}"]`)
        : document.querySelector('[data-component="bottom-sheet"]');
      if (sheet) open(sheet);
      return;
    }
    const closeBtn = e.target.closest('[data-action="bottom-sheet-close"]');
    if (closeBtn) {
      const sheet = closeBtn.closest('[data-component="bottom-sheet"]');
      if (sheet) close(sheet);
      return;
    }
    const overlay = e.target.closest('[data-el="bottom-sheet-overlay"]');
    if (overlay) {
      const sheet = overlay.closest('[data-component="bottom-sheet"]');
      if (sheet) close(sheet);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('[data-component="bottom-sheet"].is-open').forEach(close);
    }
  });
}

function open(sheet) {
  sheet.classList.add('is-open');
  sheet.setAttribute('aria-hidden', 'false');

  const panel = sheet.querySelector('[data-el="bottom-sheet-panel"]');
  const overlay = sheet.querySelector('[data-el="bottom-sheet-overlay"]');
  if (panel) panel.style.transform = 'translateY(0)';
  if (overlay) {
    overlay.classList.remove('opacity-0', 'pointer-events-none');
    overlay.classList.add('opacity-100', 'pointer-events-auto');
  }
  document.body.style.overflow = 'hidden';
}

function close(sheet) {
  sheet.classList.remove('is-open');
  sheet.setAttribute('aria-hidden', 'true');

  const panel = sheet.querySelector('[data-el="bottom-sheet-panel"]');
  const overlay = sheet.querySelector('[data-el="bottom-sheet-overlay"]');
  if (panel) panel.style.transform = 'translateY(100%)';
  if (overlay) {
    overlay.classList.add('opacity-0', 'pointer-events-none');
    overlay.classList.remove('opacity-100', 'pointer-events-auto');
  }
  document.body.style.overflow = '';
}
