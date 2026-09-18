/**
 * DriveMe Learn Page Controller (Prompt 4)
 * Handles DL Test Track smooth accordion and Traffic Signals live search & category filtering.
 */

export function initLearnPage() {
  initTrackAccordion();
  initSignalsLibrary();
}

/**
 * 1. DL Test Track Accordion (Only one open at a time)
 */
function initTrackAccordion() {
  const trackCards = document.querySelectorAll('.dm-track-card');
  if (!trackCards.length) return;

  trackCards.forEach((card) => {
    const header = card.querySelector('.dm-track-card-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isAlreadyActive = card.classList.contains('is-active');

      // Close all cards first
      trackCards.forEach((c) => {
        c.classList.remove('is-active');
        const btn = c.querySelector('.dm-track-toggle-btn');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });

      // If it wasn't active, open it
      if (!isAlreadyActive) {
        card.classList.add('is-active');
        const btn = card.querySelector('.dm-track-toggle-btn');
        if (btn) btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/**
 * 2. Traffic Signals Library Search & Category Filtering
 */
function initSignalsLibrary() {
  const searchInput = document.getElementById('signalSearchInput');
  const catButtons = document.querySelectorAll('.dm-signal-cat-btn');
  const signalCards = document.querySelectorAll('.dm-signal-card');
  const emptyState = document.getElementById('signalsEmptyState');

  if (!signalCards.length) return;

  let currentCategory = 'all';
  let searchQuery = '';

  function filterSignals() {
    let visibleCount = 0;

    signalCards.forEach((card) => {
      const cardCategory = card.getAttribute('data-category') || '';
      const cardName = (card.getAttribute('data-name') || '').toLowerCase();
      const cardMeaning = (card.getAttribute('data-meaning') || '').toLowerCase();

      const matchesCategory = currentCategory === 'all' || cardCategory === currentCategory;
      const matchesSearch = !searchQuery || cardName.includes(searchQuery) || cardMeaning.includes(searchQuery);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (emptyState) {
      if (visibleCount === 0) {
        emptyState.classList.add('is-visible');
      } else {
        emptyState.classList.remove('is-visible');
      }
    }
  }

  // Category tab clicks
  catButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      catButtons.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      currentCategory = btn.getAttribute('data-category') || 'all';
      filterSignals();
    });
  });

  // Search input typing
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      filterSignals();
    });
  }

  // Tap-to-inspect for touch devices
  signalCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      const isAlreadyInspected = card.classList.contains('is-inspected');
      signalCards.forEach((c) => c.classList.remove('is-inspected'));
      if (!isAlreadyInspected) {
        card.classList.add('is-inspected');
      }
    });
  });

  // Close inspection on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dm-signal-card')) {
      signalCards.forEach((c) => c.classList.remove('is-inspected'));
    }
  });
}
