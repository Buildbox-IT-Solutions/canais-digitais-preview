/**
 * Newsletter Bulk — ações "Assinar todas" / "Cancelar todas" + contador live.
 *
 * Markup esperado:
 *   [data-component="newsletter-list"]
 *     [data-newsletter-count]              (conta ativa de N opções)
 *     [data-action="newsletter-subscribe-all"]
 *     [data-action="newsletter-unsubscribe-all"]
 *     [data-newsletter-toggle]             (input checkbox de cada item)
 */
export function init() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action="newsletter-subscribe-all"], [data-action="newsletter-unsubscribe-all"]');
    if (!btn) return;
    e.preventDefault();
    const root = btn.closest('[data-component="newsletter-list"]');
    if (!root) return;
    const setTo = btn.dataset.action === 'newsletter-subscribe-all';
    root.querySelectorAll('[data-newsletter-toggle]').forEach((input) => {
      if (input.checked !== setTo) {
        input.checked = setTo;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
    updateCount(root);
  });

  document.addEventListener('change', (e) => {
    const input = e.target.closest('[data-newsletter-toggle]');
    if (!input) return;
    const root = input.closest('[data-component="newsletter-list"]');
    if (root) updateCount(root);
  });
}

function updateCount(root) {
  const inputs = root.querySelectorAll('[data-newsletter-toggle]');
  const checked = [...inputs].filter((i) => i.checked).length;
  const total = inputs.length;
  const counter = root.querySelector('[data-newsletter-count]');
  if (counter) {
    counter.textContent = `${checked} newsletters ativas de ${total} opções disponíveis`;
  }
}
