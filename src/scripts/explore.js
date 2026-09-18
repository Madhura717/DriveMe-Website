/**
 * DriveMe Explore Page Controller
 * Handles audience tabs, smooth scroll coordination, and active state sync.
 */

export function initExplorePage() {
  const tabs = document.querySelectorAll('.dm-audience-tab');
  const learnerSection = document.getElementById('learners');
  const trainerSection = document.getElementById('trainers');

  if (!learnerSection || !trainerSection) return;

  // 1. Tab click handlers
  tabs.forEach((tab) => {
    tab.addEventListener('click', (e) => {
      const targetId = tab.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          const navHeight = 80;
          const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - navHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
          });
        }
      }
    });
  });

  // 2. IntersectionObserver to synchronize active tab on scroll
  const sections = [learnerSection, trainerSection];
  const observerOptions = {
    rootMargin: '-30% 0px -50% 0px',
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        tabs.forEach((tab) => {
          if (tab.getAttribute('href') === `#${id}`) {
            tab.classList.add('is-active');
          } else {
            tab.classList.remove('is-active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((sec) => observer.observe(sec));
}
