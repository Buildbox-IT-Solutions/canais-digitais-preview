/**
 * Newsletter list — contador live + toast de confirmação por toggle.
 *
 * (Os botões "Assinar todas" / "Cancelar todas" foram removidos do dashboard.)
 *
 * Markup esperado:
 *   [data-component="newsletter-list"]
 *     [data-newsletter-count]              (conta ativa de N opções)
 *     [data-newsletter-item]
 *       h3                                  (nome da newsletter — usado no toast)
 *       [data-newsletter-toggle]            (input checkbox)
 */
export function init() {
  document.addEventListener('change', (e) => {
    const input = e.target.closest('[data-newsletter-toggle]');
    if (!input) return;

    const root = input.closest('[data-component="newsletter-list"]');
    if (root) updateCount(root);

    const item = input.closest('[data-newsletter-item]');
    const title = item?.querySelector('h3')?.textContent.trim() || 'newsletter';
    const message = input.checked
      ? `Você assinou a newsletter ${title}.`
      : `Você cancelou a newsletter ${title}.`;
    if (typeof window.showToast === 'function') {
      window.showToast(input.checked ? 'success' : 'info', message, { duration: 3000 });
    }
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
