/**
 * DriveMe "Get Started" Popup / Modal Controller (Prompt 5)
 * Site-wide reusable modal with backdrop blur, smooth entrance animation,
 * Escape key dismissal, and timed trigger on home page.
 */

export function initGetStartedModal() {
  ensureModalExists();

  const backdrop = document.getElementById('dmGetStartedModal');
  const closeBtn = document.getElementById('dmModalClose');
  const dismissBtn = document.getElementById('dmModalDismiss');
  const appBtn = document.getElementById('dmModalApp');

  if (!backdrop) return;

  function openModal() {
    backdrop.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
    sessionStorage.setItem('dm_modal_seen', 'true');
  }

  function closeModal() {
    backdrop.classList.remove('is-visible');
    document.body.style.overflow = '';
  }

  // Bind close buttons
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (dismissBtn) dismissBtn.addEventListener('click', closeModal);

  // Close on backdrop outside click
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) {
      closeModal();
    }
  });

  // Close on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('is-visible')) {
      closeModal();
    }
  });

  // App download trigger feedback
  if (appBtn) {
    appBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('DriveMe mobile app is launching soon on iOS App Store and Google Play! Pre-registrations are now active.');
      closeModal();
    });
  }

  // Intercept all "Get Started" anchor clicks site-wide
  const triggerLinks = document.querySelectorAll('a[href="#get-started"], [data-open-modal="get-started"]');
  triggerLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  // Home Page Timer: Trigger after 6 seconds on initial visit (only once per session)
  const isHomePage = window.location.pathname === '/' || window.location.pathname.endsWith('index.html');
  const hasSeenModal = sessionStorage.getItem('dm_modal_seen');

  if (isHomePage && !hasSeenModal) {
    setTimeout(() => {
      // Re-verify modal hasn't been opened or dismissed in the meantime
      if (!sessionStorage.getItem('dm_modal_seen')) {
        openModal();
      }
    }, 6000);
  }

  // Expose to window for global programmatic triggers
  window.openGetStartedModal = openModal;
  window.closeGetStartedModal = closeModal;
}

/**
 * Injects the modal HTML into document.body if not already present
 */
function ensureModalExists() {
  if (document.getElementById('dmGetStartedModal')) return;

  const modalHtml = `
    <div class="dm-modal-backdrop" id="dmGetStartedModal" role="dialog" aria-modal="true" aria-labelledby="dmModalTitle">
      <div class="dm-modal-dialog">
        <!-- Close (x) Button -->
        <button type="button" class="dm-modal-close-btn" id="dmModalClose" aria-label="Close dialog">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <!-- Centered Logo -->
        <img src="/driveme-logo.jpeg" alt="DriveMe - Learn. Drive. Grow." class="dm-modal-logo-img">

        <!-- Headline & Supporting Line -->
        <h3 class="dm-modal-headline" id="dmModalTitle">
          Ready to start driving with confidence?
        </h3>
        <p class="dm-modal-copy">
          Join 45,000+ learners connecting with certified trainers for doorstep car and bike lessons.
        </p>

        <!-- Actions Stack -->
        <div class="dm-modal-actions">
          <!-- 1. "Get Started" (Solid Orange, Primary) -->
          <a href="/explore.html#learners" class="dm-btn dm-btn-primary" id="dmModalGetStarted">
            Get Started
            <svg class="dm-icon-arrow" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="4" y1="10" x2="16" y2="10"></line>
              <polyline points="11 5 16 10 11 15"></polyline>
            </svg>
          </a>

          <!-- 2. "Download the App" (Outline Navy, Secondary) -->
          <a href="#download-app" class="dm-btn dm-btn-outline" id="dmModalApp">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px;">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
              <line x1="12" y1="18" x2="12.01" y2="18"></line>
            </svg>
            Download the App
          </a>

          <!-- 3. "Maybe Later" (Plain text link, Dismisses) -->
          <button type="button" class="dm-modal-dismiss-link" id="dmModalDismiss">
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
}
