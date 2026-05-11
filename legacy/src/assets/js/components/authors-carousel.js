/**
 * Authors Carousel — step-based translateX navigation
 * Hooks into [data-component="carousel"]
 *
 * Navigation: prev/next buttons shift the track by one card width (card + gap).
 * Edge gradients show/hide based on position.
 * Prev button starts disabled (border-neutral-100); becomes active on step > 0.
 * Next button starts active; becomes disabled on last step.
 */
export function init() {
  document.addEventListener('click', (e) => {
    const prev = e.target.closest('[data-action="carousel-prev"]');
    if (prev) {
      navigate(prev.closest('[data-component="carousel"]'), -1);
      return;
    }
    const next = e.target.closest('[data-action="carousel-next"]');
    if (next) {
      navigate(next.closest('[data-component="carousel"]'), 1);
    }
  });

  // Touch/swipe support
  document.querySelectorAll('[data-component="carousel"]').forEach(setupTouch);
}

function getState(carousel) {
  if (!carousel._carouselStep) carousel._carouselStep = 0;
  return carousel._carouselStep;
}

function navigate(carousel, direction) {
  if (!carousel) return;
  const track = carousel.querySelector('[data-el="carousel-track"]');
  if (!track) return;

  const cards = track.querySelectorAll(':scope > *');
  if (!cards.length) return;

  const container = track.parentElement;
  const containerW = container.offsetWidth;
  const cardW = cards[0].offsetWidth;
  const gap = parseFloat(getComputedStyle(track).gap) || 24;
  const step = cardW + gap;
  const totalW = cards.length * cardW + (cards.length - 1) * gap;
  const maxOffset = Math.max(0, totalW - containerW);
  const maxSteps = Math.ceil(maxOffset / step);

  let current = getState(carousel);
  current = Math.max(0, Math.min(maxSteps, current + direction));
  carousel._carouselStep = current;

  const offset = Math.min(current * step, maxOffset);
  track.style.transform = `translateX(-${offset}px)`;

  updateUI(carousel, current, maxSteps);
}

function updateUI(carousel, step, maxSteps) {
  const prevBtn = carousel.querySelector('[data-action="carousel-prev"]');
  const nextBtn = carousel.querySelector('[data-action="carousel-next"]');
  const gradL = carousel.querySelector('[data-el="carousel-gradient-left"]');
  const gradR = carousel.querySelector('[data-el="carousel-gradient-right"]');

  if (prevBtn) {
    const disabled = step === 0;
    prevBtn.classList.toggle('border-neutral-100', disabled);
    prevBtn.classList.toggle('border-primary-600', !disabled);
    prevBtn.classList.toggle('opacity-50', disabled);
    prevBtn.classList.toggle('cursor-default', disabled);
  }
  if (nextBtn) {
    const disabled = step >= maxSteps;
    nextBtn.classList.toggle('opacity-50', disabled);
    nextBtn.classList.toggle('cursor-default', disabled);
  }
  if (gradL) gradL.style.opacity = step > 0 ? '1' : '0';
  if (gradR) gradR.style.opacity = step < maxSteps ? '1' : '0';
}

function setupTouch(carousel) {
  const track = carousel.querySelector('[data-el="carousel-track"]');
  if (!track) return;

  let startX = 0;

  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    const diff = startX - e.changedTouches[0].pageX;
    if (Math.abs(diff) > 50) {
      navigate(carousel, diff > 0 ? 1 : -1);
    }
  }, { passive: true });
}
