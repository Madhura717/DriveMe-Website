/**
 * DriveMe Main Application Entry Point
 */

import { initNavbar } from './navbar.js';
import { initScrollReveal } from './scroll-reveal.js';
import { initHeroCarAnimation } from './hero-car.js';
import { initStatCounters } from './counter.js';
import { initExplorePage } from './explore.js';
import { initAboutPage } from './about.js';
import { initLearnPage } from './learn.js';
import { initGetStartedModal } from './modal.js';
import { initAuthModal } from './auth-modal.js';
import { initChatbot } from './chatbot.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Global Navigation (sticky, scroll effects, mobile drawer)
  initNavbar();

  // Initialize Site-Wide "Get Started" Popup / Modal
  initGetStartedModal();

  // Initialize Site-Wide Learner & Trainer Login Modal
  initAuthModal();

  // Initialize the DriveMe-only assistant and free-class registration widget
  initChatbot();

  // Initialize Signature Hero Car Drive-In Animation (runs once on load)
  initHeroCarAnimation();

  // Initialize Trust-Stat Animated Numbers Counter
  initStatCounters();

  // Initialize Explore Page Tabs & Smooth Scroll
  initExplorePage();

  // Initialize About Page FAQ Accordion
  initAboutPage();

  // Initialize Learn Page Track Accordion & Signals Library
  initLearnPage();

  // Initialize Scroll Reveal Animations
  initScrollReveal();

  // Setup click-to-copy for design token swatches in the showcase
  setupColorTokenCopy();

  // Auto-update footer current year
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

function setupColorTokenCopy() {
  const swatchCards = document.querySelectorAll('.dm-swatch-card');
  const toast = document.getElementById('dm-copy-toast');
  const toastText = document.getElementById('dm-copy-toast-text');
  let toastTimer = null;

  swatchCards.forEach((card) => {
    card.addEventListener('click', () => {
      const hex = card.getAttribute('data-hex');
      const name = card.getAttribute('data-name');
      if (!hex) return;

      navigator.clipboard.writeText(hex).then(() => {
        if (toast && toastText) {
          toastText.textContent = `Copied ${name} (${hex}) to clipboard!`;
          toast.classList.add('is-active');

          if (toastTimer) clearTimeout(toastTimer);
          toastTimer = setTimeout(() => {
            toast.classList.remove('is-active');
          }, 2400);
        }
      }).catch(() => {
        // Fallback
      });
    });
  });
}
