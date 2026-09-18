/**
 * ==========================================================================
 * DRIVEME — AUTH / LOGIN MODAL CONTROLLER (auth-modal.js)
 * Reusable modal supporting Learner & Trainer phone + OTP verification
 * ==========================================================================
 */

let activeRole = 'learner'; // 'learner' | 'trainer'
let activeStep = 'phone';   // 'phone' | 'otp'
let resendTimerInterval = null;
let resendSeconds = 30;
let lastFocusedElement = null;

const MODAL_HTML = `
  <div class="dm-auth-backdrop" id="dmAuthModal" role="dialog" aria-modal="true" aria-labelledby="dmAuthTitle">
    <div class="dm-auth-dialog">
      <!-- Top Close Button -->
      <button type="button" class="dm-auth-close" id="dmAuthClose" aria-label="Close login dialog">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <!-- Brand Header -->
      <div class="dm-auth-header">
        <img src="/driveme-logo.jpeg" alt="DriveMe - Learn. Drive. Grow." class="dm-auth-logo-img">
        <h3 class="dm-auth-title" id="dmAuthTitle">Welcome to DriveMe</h3>
        <p class="dm-auth-subtitle" id="dmAuthSubtitle">Enter your mobile number to sign in or register</p>
      </div>

      <!-- Segmented Role Tabs -->
      <div class="dm-auth-tabs" role="tablist">
        <button type="button" class="dm-auth-tab is-active" id="dmTabLearner" role="tab" aria-selected="true">
          <svg class="dm-auth-tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          Login as Learner
        </button>
        <button type="button" class="dm-auth-tab" id="dmTabTrainer" role="tab" aria-selected="false">
          <svg class="dm-auth-tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
          Login as Trainer
        </button>
      </div>

      <!-- STEP 1: Phone Number Input Screen -->
      <div class="dm-auth-step is-active" id="dmStepPhone">
        <div style="text-align: center; margin-bottom: 12px;">
          <span class="dm-auth-role-badge is-learner" id="dmRoleIndicator">Learner Account</span>
        </div>

        <label for="dmPhoneInput" class="dm-auth-input-label">Mobile Number</label>
        <div class="dm-auth-phone-group">
          <div class="dm-auth-country-pill">
            <span>🇮🇳</span>
            <span>+91</span>
          </div>
          <input 
            type="tel" 
            id="dmPhoneInput" 
            class="dm-auth-phone-input" 
            placeholder="98765 43210" 
            maxlength="10" 
            autocomplete="tel" 
            inputmode="numeric"
          >
        </div>

        <button type="button" class="dm-btn dm-btn-primary dm-auth-submit-btn" id="dmSendOtpBtn">
          Send OTP
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="4" y1="10" x2="16" y2="10"></line>
            <polyline points="11 5 16 10 11 15"></polyline>
          </svg>
        </button>

        <p class="dm-auth-disclaimer">
          By signing in, you agree to DriveMe's <a href="/about.html">Terms of Service</a> and <a href="/about.html">Privacy Policy</a>.
        </p>
      </div>

      <!-- STEP 2: OTP Verification Screen -->
      <div class="dm-auth-step" id="dmStepOtp">
        <div class="dm-auth-otp-meta">
          <div>
            <div style="font-size: 0.7rem; color: #5B6472;">Code sent to</div>
            <div class="dm-auth-otp-phone-text" id="dmSentPhoneDisplay">+91 98765 •••••</div>
          </div>
          <button type="button" class="dm-auth-otp-edit-btn" id="dmEditPhoneBtn">Edit Number</button>
        </div>

        <label class="dm-auth-input-label" style="text-align: center; margin-bottom: 10px;">Enter 6-Digit Verification Code</label>
        <div class="dm-auth-otp-grid">
          <input type="text" class="dm-auth-otp-box" maxlength="1" inputmode="numeric" data-index="0" autofocus>
          <input type="text" class="dm-auth-otp-box" maxlength="1" inputmode="numeric" data-index="1">
          <input type="text" class="dm-auth-otp-box" maxlength="1" inputmode="numeric" data-index="2">
          <input type="text" class="dm-auth-otp-box" maxlength="1" inputmode="numeric" data-index="3">
          <input type="text" class="dm-auth-otp-box" maxlength="1" inputmode="numeric" data-index="4">
          <input type="text" class="dm-auth-otp-box" maxlength="1" inputmode="numeric" data-index="5">
        </div>

        <div class="dm-auth-resend-row">
          <span id="dmResendTimerText">Resend OTP in <strong id="dmResendCountdown">30s</strong></span>
          <button type="button" class="dm-auth-resend-btn" id="dmResendBtn" disabled>Resend Code</button>
        </div>

        <button type="button" class="dm-btn dm-btn-primary dm-auth-submit-btn" id="dmVerifyOtpBtn">
          Verify &amp; Login
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="4 11 8 15 16 6"></polyline>
          </svg>
        </button>
      </div>

      <!-- Success Feedback Banner -->
      <div class="dm-auth-success-banner" id="dmAuthSuccess">
        <div class="dm-auth-success-title">✓ Login Successful!</div>
        <div class="dm-auth-success-sub" id="dmSuccessSub">Welcome back to DriveMe.</div>
      </div>
    </div>
  </div>
`;

/**
 * Injects the Auth modal markup into body if not already present
 */
function ensureAuthModalDOM() {
  if (!document.getElementById('dmAuthModal')) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = MODAL_HTML;
    document.body.appendChild(wrapper.firstElementChild);
  }
}

/**
 * Open Auth Modal
 */
export function openAuthModal(role = 'learner') {
  ensureAuthModalDOM();
  const modal = document.getElementById('dmAuthModal');
  if (!modal) return;

  lastFocusedElement = document.activeElement;
  setRole(role);
  resetToPhoneStep();

  modal.classList.add('is-active');
  document.body.style.overflow = 'hidden';

  setTimeout(() => {
    const input = document.getElementById('dmPhoneInput');
    if (input) input.focus();
  }, 100);
}

/**
 * Close Auth Modal
 */
export function closeAuthModal() {
  const modal = document.getElementById('dmAuthModal');
  if (!modal || !modal.classList.contains('is-active')) return;

  modal.classList.remove('is-active');
  document.body.style.overflow = '';
  clearInterval(resendTimerInterval);

  if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
    lastFocusedElement.focus();
  }
}

/**
 * Set active role ('learner' | 'trainer')
 */
function setRole(role) {
  activeRole = role;
  const tabLearner = document.getElementById('dmTabLearner');
  const tabTrainer = document.getElementById('dmTabTrainer');
  const roleIndicator = document.getElementById('dmRoleIndicator');
  const title = document.getElementById('dmAuthTitle');

  if (role === 'trainer') {
    if (tabTrainer) tabTrainer.classList.add('is-active');
    if (tabLearner) tabLearner.classList.remove('is-active');
    if (roleIndicator) {
      roleIndicator.textContent = 'Certified Trainer Portal';
      roleIndicator.className = 'dm-auth-role-badge is-trainer';
    }
    if (title) title.textContent = 'Trainer Sign In';
  } else {
    if (tabLearner) tabLearner.classList.add('is-active');
    if (tabTrainer) tabTrainer.classList.remove('is-active');
    if (roleIndicator) {
      roleIndicator.textContent = 'Learner Account';
      roleIndicator.className = 'dm-auth-role-badge is-learner';
    }
    if (title) title.textContent = 'Welcome to DriveMe';
  }
}

/**
 * Reset to Step 1 (Phone Input)
 */
function resetToPhoneStep() {
  activeStep = 'phone';
  const stepPhone = document.getElementById('dmStepPhone');
  const stepOtp = document.getElementById('dmStepOtp');
  const successBanner = document.getElementById('dmAuthSuccess');
  const phoneInput = document.getElementById('dmPhoneInput');

  if (stepPhone) stepPhone.classList.add('is-active');
  if (stepOtp) stepOtp.classList.remove('is-active');
  if (successBanner) successBanner.classList.remove('is-active');
  if (phoneInput) phoneInput.value = '';

  clearOtpBoxes();
  clearInterval(resendTimerInterval);
}

/**
 * Transition to Step 2 (OTP Screen)
 */
function goToOtpStep() {
  activeStep = 'otp';
  const stepPhone = document.getElementById('dmStepPhone');
  const stepOtp = document.getElementById('dmStepOtp');
  const phoneInput = document.getElementById('dmPhoneInput');
  const sentDisplay = document.getElementById('dmSentPhoneDisplay');

  const phone = (phoneInput?.value || '9876543210').trim();
  const masked = phone.length >= 10 
    ? `+91 ${phone.slice(0, 5)} •••••` 
    : `+91 ${phone}`;

  if (sentDisplay) sentDisplay.textContent = masked;
  if (stepPhone) stepPhone.classList.remove('is-active');
  if (stepOtp) stepOtp.classList.add('is-active');

  clearOtpBoxes();
  startResendTimer();

  // Focus first digit box
  setTimeout(() => {
    const firstBox = document.querySelector('.dm-auth-otp-box[data-index="0"]');
    if (firstBox) firstBox.focus();
  }, 100);
}

/**
 * Start 30s countdown for Resend OTP
 */
function startResendTimer() {
  clearInterval(resendTimerInterval);
  resendSeconds = 30;
  const countdownEl = document.getElementById('dmResendCountdown');
  const timerTextEl = document.getElementById('dmResendTimerText');
  const resendBtn = document.getElementById('dmResendBtn');

  if (resendBtn) resendBtn.disabled = true;
  if (timerTextEl) timerTextEl.style.display = 'inline';

  resendTimerInterval = setInterval(() => {
    resendSeconds -= 1;
    if (countdownEl) countdownEl.textContent = `${resendSeconds}s`;

    if (resendSeconds <= 0) {
      clearInterval(resendTimerInterval);
      if (timerTextEl) timerTextEl.style.display = 'none';
      if (resendBtn) resendBtn.disabled = false;
    }
  }, 1000);
}

/**
 * Clears OTP inputs
 */
function clearOtpBoxes() {
  const boxes = document.querySelectorAll('.dm-auth-otp-box');
  boxes.forEach(box => {
    box.value = '';
    box.classList.remove('is-filled');
  });
}

/**
 * Initialize all event listeners for the Auth Modal
 */
export function initAuthModal() {
  ensureAuthModalDOM();
  const modal = document.getElementById('dmAuthModal');
  if (!modal) return;

  // Intercept all Login triggers across navbar and buttons
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('a[href="#login"], [data-open-modal="login"], #navLoginBtn, #drawerLoginBtn');
    if (trigger) {
      e.preventDefault();
      const role = trigger.getAttribute('data-role') || 'learner';
      openAuthModal(role);
    }
  });

  // Close Button
  const closeBtn = document.getElementById('dmAuthClose');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeAuthModal);
  }

  // Backdrop click dismiss
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeAuthModal();
    }
  });

  // ESC key dismiss
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closeAuthModal();
    }
  });

  // Role Tab Switching
  const tabLearner = document.getElementById('dmTabLearner');
  const tabTrainer = document.getElementById('dmTabTrainer');
  if (tabLearner) {
    tabLearner.addEventListener('click', () => setRole('learner'));
  }
  if (tabTrainer) {
    tabTrainer.addEventListener('click', () => setRole('trainer'));
  }

  // Phone input formatting (only allow digits, max 10)
  const phoneInput = document.getElementById('dmPhoneInput');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
    });

    phoneInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('dmSendOtpBtn')?.click();
      }
    });
  }

  // Send OTP Button
  const sendOtpBtn = document.getElementById('dmSendOtpBtn');
  if (sendOtpBtn) {
    sendOtpBtn.addEventListener('click', () => {
      const phone = phoneInput?.value.trim() || '';
      if (phone.length < 10) {
        // Quick subtle shake feedback on input
        const group = document.querySelector('.dm-auth-phone-group');
        if (group) {
          group.style.borderColor = '#EF4444';
          group.animate([
            { transform: 'translateX(-4px)' },
            { transform: 'translateX(4px)' },
            { transform: 'translateX(-3px)' },
            { transform: 'translateX(3px)' },
            { transform: 'translateX(0)' }
          ], { duration: 250 });
          setTimeout(() => {
            group.style.borderColor = '';
          }, 1500);
        }
        if (phoneInput) phoneInput.focus();
        return;
      }
      goToOtpStep();
    });
  }

  // Edit Phone Button
  const editPhoneBtn = document.getElementById('dmEditPhoneBtn');
  if (editPhoneBtn) {
    editPhoneBtn.addEventListener('click', resetToPhoneStep);
  }

  // Resend OTP Button
  const resendBtn = document.getElementById('dmResendBtn');
  if (resendBtn) {
    resendBtn.addEventListener('click', () => {
      startResendTimer();
      clearOtpBoxes();
      const firstBox = document.querySelector('.dm-auth-otp-box[data-index="0"]');
      if (firstBox) firstBox.focus();
    });
  }

  // OTP Input Boxes: auto-advance, backspace handling, paste support
  const otpBoxes = document.querySelectorAll('.dm-auth-otp-box');
  otpBoxes.forEach((box, idx) => {
    box.addEventListener('input', (e) => {
      const val = e.target.value.replace(/\D/g, '');
      e.target.value = val ? val.slice(-1) : '';

      if (e.target.value) {
        box.classList.add('is-filled');
        if (idx < otpBoxes.length - 1) {
          otpBoxes[idx + 1].focus();
        }
      } else {
        box.classList.remove('is-filled');
      }
    });

    box.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !box.value && idx > 0) {
        otpBoxes[idx - 1].focus();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('dmVerifyOtpBtn')?.click();
      }
    });

    box.addEventListener('paste', (e) => {
      e.preventDefault();
      const pasteData = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '').slice(0, 6);
      if (pasteData) {
        pasteData.split('').forEach((char, i) => {
          if (otpBoxes[i]) {
            otpBoxes[i].value = char;
            otpBoxes[i].classList.add('is-filled');
          }
        });
        const targetIdx = Math.min(pasteData.length, otpBoxes.length - 1);
        otpBoxes[targetIdx].focus();
      }
    });
  });

  // Verify OTP & Login Button
  const verifyBtn = document.getElementById('dmVerifyOtpBtn');
  if (verifyBtn) {
    verifyBtn.addEventListener('click', () => {
      // Collect entered OTP or simulate with demo fallback
      let otpCode = '';
      otpBoxes.forEach(b => otpCode += b.value);

      if (otpCode.length < 6) {
        // Auto-fill demonstration code if partially empty
        const demoCode = '123456';
        demoCode.split('').forEach((char, i) => {
          if (otpBoxes[i]) {
            otpBoxes[i].value = char;
            otpBoxes[i].classList.add('is-filled');
          }
        });
      }

      // Show success state
      const stepOtp = document.getElementById('dmStepOtp');
      const successBanner = document.getElementById('dmAuthSuccess');
      const successSub = document.getElementById('dmSuccessSub');

      if (stepOtp) stepOtp.classList.remove('is-active');
      if (successBanner) successBanner.classList.add('is-active');
      if (successSub) {
        successSub.textContent = activeRole === 'trainer'
          ? 'Welcome back, Instructor! Loading your lesson schedule...'
          : 'Welcome back, Learner! Loading your driving milestones...';
      }

      // Dismiss modal after 1.4s
      setTimeout(() => {
        closeAuthModal();
      }, 1400);
    });
  }
}
