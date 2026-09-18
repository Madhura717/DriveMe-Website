/**
 * DriveMe Global Navigation Controller
 * Handles scroll transition (transparent -> frosted white with shadow),
 * mobile hamburger animation, slide-in drawer, and accessibility.
 */

export function initNavbar() {
  const header = document.querySelector('.dm-header');
  const toggleBtn = document.querySelector('.dm-nav-toggle');
  const drawer = document.querySelector('.dm-drawer');
  const backdrop = document.querySelector('.dm-drawer-backdrop');
  const closeBtn = document.querySelector('.dm-drawer-close');
  const drawerLinks = document.querySelectorAll('.dm-drawer-link, .dm-drawer-btn');

  if (!header) return;

  // 1. Sticky Scroll Behavior
  // Transparent at top of hero, switches to frosted white + shadow when scrolled past 20px
  const handleScroll = () => {
    if (window.scrollY > 24) {
      header.classList.add('dm-header--scrolled');
    } else {
      header.classList.remove('dm-header--scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  // Initial check on load
  handleScroll();

  // 2. Mobile Drawer Controls
  const openDrawer = () => {
    if (!drawer) return;
    drawer.classList.add('is-open');
    if (backdrop) backdrop.classList.add('is-open');
    if (toggleBtn) {
      toggleBtn.classList.add('is-open');
      toggleBtn.setAttribute('aria-expanded', 'true');
    }
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    if (!drawer) return;
    drawer.classList.remove('is-open');
    if (backdrop) backdrop.classList.remove('is-open');
    if (toggleBtn) {
      toggleBtn.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
    document.body.style.overflow = '';
  };

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = drawer && drawer.classList.contains('is-open');
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }

  if (backdrop) {
    backdrop.addEventListener('click', closeDrawer);
  }

  // Close drawer when clicking any link inside
  drawerLinks.forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });

  // ESC key to close drawer
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer && drawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });
}
