/**
 * Search Bar — expand on focus, collapse on blur/Esc
 * Hooks into [data-component="search-bar"]
 */
export function init() {
  document.addEventListener('focusin', (e) => {
    const input = e.target.closest('[data-component="search-bar"] input');
    if (input) expand(input.closest('[data-component="search-bar"]'));
  });

  document.addEventListener('focusout', (e) => {
    const wrapper = e.target.closest('[data-component="search-bar"]');
    if (!wrapper) return;
    // Delay to allow click on clear button
    setTimeout(() => {
      if (!wrapper.contains(document.activeElement)) collapse(wrapper);
    }, 150);
  });

  document.addEventListener('click', (e) => {
    const clearBtn = e.target.closest('[data-action="search-clear"]');
    if (clearBtn) {
      const wrapper = clearBtn.closest('[data-component="search-bar"]');
      const input = wrapper?.querySelector('input');
      if (input) {
        input.value = '';
        input.focus();
      }
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const wrapper = e.target.closest('[data-component="search-bar"]');
      if (wrapper) {
        const input = wrapper.querySelector('input');
        if (input) input.blur();
        collapse(wrapper);
      }
    }
  });
}

function expand(wrapper) {
  if (!wrapper) return;
  wrapper.classList.add('is-expanded');
  wrapper.setAttribute('aria-expanded', 'true');
  // Expand from 128px (w-32) to 288px — Figma searchOpened variant
  wrapper.style.width = '288px';
  const input = wrapper.querySelector('input');
  if (input) {
    input.classList.remove('pr-3');
    input.classList.add('pr-8');
  }
  const border = wrapper.querySelector('[data-el="search-border"]');
  if (border) {
    border.classList.remove('border-neutral-100');
    border.classList.add('border-secondary-950');
  }
  const clearBtn = wrapper.querySelector('[data-action="search-clear"]');
  if (clearBtn) clearBtn.classList.remove('hidden');
}

function collapse(wrapper) {
  if (!wrapper) return;
  wrapper.classList.remove('is-expanded');
  wrapper.setAttribute('aria-expanded', 'false');
  // Return to original width
  wrapper.style.width = '';
  const input = wrapper.querySelector('input');
  if (input) {
    input.classList.remove('pr-8');
    input.classList.add('pr-3');
  }
  const border = wrapper.querySelector('[data-el="search-border"]');
  if (border) {
    border.classList.remove('border-secondary-950');
    border.classList.add('border-neutral-100');
  }
  const clearBtn = wrapper.querySelector('[data-action="search-clear"]');
  if (clearBtn) clearBtn.classList.add('hidden');
}
