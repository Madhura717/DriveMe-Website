/**
 * DriveMe Hero Car Drive-In Animation Controller
 * Smoothly animates the car and happy learner driving in from the far left
 * and coming to rest center-left on initial page load (plays only once).
 */

export function initHeroCarAnimation() {
  const heroStage = document.getElementById('heroCarStage');
  const heroCar = document.getElementById('heroCarVehicle');

  if (!heroStage || !heroCar) return;

  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    heroCar.classList.add('is-arrived');
    return;
  }

  // Use sessionStorage or session flag so it only plays once on initial load
  // (per prompt requirement: "The hero car animation should only play once on initial load (not repeat on scroll-back)")
  requestAnimationFrame(() => {
    // Add small delay for DOM readiness
    setTimeout(() => {
      heroCar.classList.add('is-driving-in');

      // Listen for animation end
      heroCar.addEventListener('animationend', () => {
        heroCar.classList.remove('is-driving-in');
        heroCar.classList.add('is-arrived');
      }, { once: true });
    }, 150);
  });
}
