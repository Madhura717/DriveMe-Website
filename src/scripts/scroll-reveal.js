/**
 * DriveMe Scroll Reveal Controller
 * Watches elements with .dm-reveal and triggers smooth fade + slide-up
 */

export function initScrollReveal() {
  const elementsToReveal = document.querySelectorAll('.dm-reveal');

  if (!elementsToReveal.length) return;

  // Fallback if IntersectionObserver is not supported
  if (!('IntersectionObserver' in window)) {
    elementsToReveal.forEach((el) => el.classList.add('is-revealed'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.12,
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  elementsToReveal.forEach((el) => observer.observe(el));
}
