/**
 * Header Sticky — alterna `.is-compact` no header conforme o scroll.
 *
 * Markup esperado:
 *   <header data-component="header-sticky" class="group sticky top-0 ..."> ... </header>
 *
 * Comportamento:
 *   - Acima do threshold: header em estado expanded
 *   - Abaixo do threshold: classe `.is-compact` ativa as variants Tailwind
 *     `group-[.is-compact]:*` em logo, paddings e strip Informa.
 *
 * Otimização: throttle via requestAnimationFrame para não recalcular layout.
 */
const THRESHOLD = 8;

export function init() {
  const header = document.querySelector('[data-component="header-sticky"]');
  if (!header) return;

  let ticking = false;

  const update = () => {
    const compact = window.scrollY > THRESHOLD;
    header.classList.toggle('is-compact', compact);
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  update();
}
