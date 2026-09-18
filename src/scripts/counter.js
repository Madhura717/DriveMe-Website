/**
 * DriveMe Trust-Stat Counter Controller
 * Animates numbers counting up when scrolled into view (once).
 */

export function initStatCounters() {
  const counterElements = document.querySelectorAll('[data-counter]');

  if (!counterElements.length) return;

  const observerOptions = {
    threshold: 0.25,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  counterElements.forEach((el) => observer.observe(el));
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-counter'), 10);
  const suffix = el.getAttribute('data-suffix') || '';
  const prefix = el.getAttribute('data-prefix') || '';
  const duration = 1800; // ms
  const startTime = performance.now();

  function easeOutExpo(x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  }

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutExpo(progress);
    const currentValue = Math.floor(easedProgress * target);

    el.textContent = `${prefix}${currentValue.toLocaleString()}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
    }
  }

  requestAnimationFrame(update);
}
