/**
 * Resumo Box — accordion expand/collapse
 * Hooks into [data-component="resumo-box"]
 */
export function init() {
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-trigger="resumo-toggle"]');
    if (!trigger) return;

    const box = trigger.closest('[data-component="resumo-box"]');
    if (!box) return;

    box.classList.contains('is-open') ? collapse(box) : expand(box);
  });
}

function expand(box) {
  const content = box.querySelector('[data-target="resumo-content"]');
  const label = box.querySelector('[data-el="resumo-label"]');
  const chevron = box.querySelector('[data-icon="chevron"]');

  box.classList.add('is-open');
  box.querySelector('[data-trigger="resumo-toggle"]')?.setAttribute('aria-expanded', 'true');

  if (content) {
    content.style.maxHeight = content.scrollHeight + 'px';
    content.style.opacity = '1';
    content.setAttribute('aria-hidden', 'false');
  }
  if (label) label.textContent = 'Resumo';
  if (chevron) chevron.style.transform = 'rotate(180deg)';
}

function collapse(box) {
  const content = box.querySelector('[data-target="resumo-content"]');
  const label = box.querySelector('[data-el="resumo-label"]');
  const chevron = box.querySelector('[data-icon="chevron"]');

  box.classList.remove('is-open');
  box.querySelector('[data-trigger="resumo-toggle"]')?.setAttribute('aria-expanded', 'false');

  if (content) {
    content.style.maxHeight = '0';
    content.style.opacity = '0';
    content.setAttribute('aria-hidden', 'true');
  }
  if (label) label.textContent = 'Ver resumo';
  if (chevron) chevron.style.transform = '';
}
