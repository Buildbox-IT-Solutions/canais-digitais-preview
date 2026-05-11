/**
 * Header Author — bio expand/collapse
 * Shared with Author Summary (same data attributes)
 * Hooks into [data-trigger="bio-toggle"]
 */
export function init() {
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-trigger="bio-toggle"]');
    if (!trigger) return;

    const container = trigger.closest('[data-component="bio-expandable"]');
    if (!container) return;

    const bio = container.querySelector('[data-target="bio-content"]');
    if (!bio) return;

    const isExpanded = container.classList.contains('is-expanded');
    if (isExpanded) {
      collapse(container, bio, trigger);
    } else {
      expand(container, bio, trigger);
    }
  });
}

function expand(container, bio, trigger) {
  container.classList.add('is-expanded');
  trigger.setAttribute('aria-expanded', 'true');
  trigger.textContent = 'ver menos';
  bio.style.maxHeight = bio.scrollHeight + 'px';
  bio.classList.remove('overflow-hidden');
}

function collapse(container, bio, trigger) {
  container.classList.remove('is-expanded');
  trigger.setAttribute('aria-expanded', 'false');
  trigger.textContent = 'ver mais';
  bio.style.maxHeight = '60px';
  bio.classList.add('overflow-hidden');
}
