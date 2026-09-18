/**
 * DriveMe About & FAQ Accordion Controller
 */

export function initAboutPage() {
  const faqItems = document.querySelectorAll('.dm-faq-item');

  if (!faqItems.length) return;

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.dm-faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Optional: close other accordions
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove('is-open');
          const otherBtn = otherItem.querySelector('.dm-faq-question');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      if (isOpen) {
        item.classList.remove('is-open');
        questionBtn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('is-open');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}
