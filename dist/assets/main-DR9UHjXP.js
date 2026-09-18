(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();function M(){const t=document.querySelector(".dm-header"),e=document.querySelector(".dm-nav-toggle"),n=document.querySelector(".dm-drawer"),s=document.querySelector(".dm-drawer-backdrop"),o=document.querySelector(".dm-drawer-close"),i=document.querySelectorAll(".dm-drawer-link, .dm-drawer-btn");if(!t)return;const l=()=>{window.scrollY>24?t.classList.add("dm-header--scrolled"):t.classList.remove("dm-header--scrolled")};window.addEventListener("scroll",l,{passive:!0}),l();const d=()=>{n&&(n.classList.add("is-open"),s&&s.classList.add("is-open"),e&&(e.classList.add("is-open"),e.setAttribute("aria-expanded","true")),document.body.style.overflow="hidden")},a=()=>{n&&(n.classList.remove("is-open"),s&&s.classList.remove("is-open"),e&&(e.classList.remove("is-open"),e.setAttribute("aria-expanded","false")),document.body.style.overflow="")};e&&e.addEventListener("click",()=>{n&&n.classList.contains("is-open")?a():d()}),o&&o.addEventListener("click",a),s&&s.addEventListener("click",a),i.forEach(c=>{c.addEventListener("click",a)}),window.addEventListener("keydown",c=>{c.key==="Escape"&&n&&n.classList.contains("is-open")&&a()})}function A(){const t=document.querySelectorAll(".dm-reveal");if(!t.length)return;if(!("IntersectionObserver"in window)){t.forEach(s=>s.classList.add("is-revealed"));return}const e={root:null,rootMargin:"0px 0px -40px 0px",threshold:.12},n=new IntersectionObserver((s,o)=>{s.forEach(i=>{i.isIntersecting&&(i.target.classList.add("is-revealed"),o.unobserve(i.target))})},e);t.forEach(s=>n.observe(s))}function T(){const t=document.getElementById("heroCarStage"),e=document.getElementById("heroCarVehicle");if(!t||!e)return;if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){e.classList.add("is-arrived");return}requestAnimationFrame(()=>{setTimeout(()=>{e.classList.add("is-driving-in"),e.addEventListener("animationend",()=>{e.classList.remove("is-driving-in"),e.classList.add("is-arrived")},{once:!0})},150)})}function D(){const t=document.querySelectorAll("[data-counter]");if(!t.length)return;const e={threshold:.25,rootMargin:"0px 0px -50px 0px"},n=new IntersectionObserver((s,o)=>{s.forEach(i=>{i.isIntersecting&&(P(i.target),o.unobserve(i.target))})},e);t.forEach(s=>n.observe(s))}function P(t){const e=parseInt(t.getAttribute("data-counter"),10),n=t.getAttribute("data-suffix")||"",s=t.getAttribute("data-prefix")||"",o=1800,i=performance.now();function l(a){return a===1?1:1-Math.pow(2,-10*a)}function d(a){const c=a-i,r=Math.min(c/o,1),m=l(r),u=Math.floor(m*e);t.textContent=`${s}${u.toLocaleString()}${n}`,r<1?requestAnimationFrame(d):t.textContent=`${s}${e.toLocaleString()}${n}`}requestAnimationFrame(d)}function q(){const t=document.querySelectorAll(".dm-audience-tab"),e=document.getElementById("learners"),n=document.getElementById("trainers");if(!e||!n)return;t.forEach(l=>{l.addEventListener("click",d=>{const a=l.getAttribute("href");if(a&&a.startsWith("#")){d.preventDefault();const c=document.querySelector(a);if(c){const m=c.getBoundingClientRect().top+window.scrollY-80;window.scrollTo({top:m,behavior:"smooth"})}}})});const s=[e,n],o={rootMargin:"-30% 0px -50% 0px",threshold:0},i=new IntersectionObserver(l=>{l.forEach(d=>{if(d.isIntersecting){const a=d.target.getAttribute("id");t.forEach(c=>{c.getAttribute("href")===`#${a}`?c.classList.add("is-active"):c.classList.remove("is-active")})}})},o);s.forEach(l=>i.observe(l))}function O(){const t=document.querySelectorAll(".dm-faq-item");t.length&&t.forEach(e=>{const n=e.querySelector(".dm-faq-question");n&&n.addEventListener("click",()=>{const s=e.classList.contains("is-open");t.forEach(o=>{if(o!==e){o.classList.remove("is-open");const i=o.querySelector(".dm-faq-question");i&&i.setAttribute("aria-expanded","false")}}),s?(e.classList.remove("is-open"),n.setAttribute("aria-expanded","false")):(e.classList.add("is-open"),n.setAttribute("aria-expanded","true"))})})}function R(){H(),F()}function H(){const t=document.querySelectorAll(".dm-track-card");t.length&&t.forEach(e=>{const n=e.querySelector(".dm-track-card-header");n&&n.addEventListener("click",()=>{const s=e.classList.contains("is-active");if(t.forEach(o=>{o.classList.remove("is-active");const i=o.querySelector(".dm-track-toggle-btn");i&&i.setAttribute("aria-expanded","false")}),!s){e.classList.add("is-active");const o=e.querySelector(".dm-track-toggle-btn");o&&o.setAttribute("aria-expanded","true")}})})}function F(){const t=document.getElementById("signalSearchInput"),e=document.querySelectorAll(".dm-signal-cat-btn"),n=document.querySelectorAll(".dm-signal-card"),s=document.getElementById("signalsEmptyState");if(!n.length)return;let o="all",i="";function l(){let d=0;n.forEach(a=>{const c=a.getAttribute("data-category")||"",r=(a.getAttribute("data-name")||"").toLowerCase(),m=(a.getAttribute("data-meaning")||"").toLowerCase(),u=o==="all"||c===o,h=!i||r.includes(i)||m.includes(i);u&&h?(a.style.display="flex",d++):a.style.display="none"}),s&&(d===0?s.classList.add("is-visible"):s.classList.remove("is-visible"))}e.forEach(d=>{d.addEventListener("click",()=>{e.forEach(a=>a.classList.remove("is-active")),d.classList.add("is-active"),o=d.getAttribute("data-category")||"all",l()})}),t&&t.addEventListener("input",d=>{i=d.target.value.trim().toLowerCase(),l()}),n.forEach(d=>{d.addEventListener("click",a=>{const c=d.classList.contains("is-inspected");n.forEach(r=>r.classList.remove("is-inspected")),c||d.classList.add("is-inspected")})}),document.addEventListener("click",d=>{d.target.closest(".dm-signal-card")||n.forEach(a=>a.classList.remove("is-inspected"))})}function G(){_();const t=document.getElementById("dmGetStartedModal"),e=document.getElementById("dmModalClose"),n=document.getElementById("dmModalDismiss"),s=document.getElementById("dmModalApp");if(!t)return;function o(){t.classList.add("is-visible"),document.body.style.overflow="hidden",sessionStorage.setItem("dm_modal_seen","true")}function i(){t.classList.remove("is-visible"),document.body.style.overflow=""}e&&e.addEventListener("click",i),n&&n.addEventListener("click",i),t.addEventListener("click",c=>{c.target===t&&i()}),window.addEventListener("keydown",c=>{c.key==="Escape"&&t.classList.contains("is-visible")&&i()}),s&&s.addEventListener("click",c=>{c.preventDefault(),alert("DriveMe mobile app is launching soon on iOS App Store and Google Play! Pre-registrations are now active."),i()}),document.querySelectorAll('a[href="#get-started"], [data-open-modal="get-started"]').forEach(c=>{c.addEventListener("click",r=>{r.preventDefault(),o()})});const d=window.location.pathname==="/"||window.location.pathname.endsWith("index.html"),a=sessionStorage.getItem("dm_modal_seen");d&&!a&&setTimeout(()=>{sessionStorage.getItem("dm_modal_seen")||o()},6e3),window.openGetStartedModal=o,window.closeGetStartedModal=i}function _(){if(document.getElementById("dmGetStartedModal"))return;document.body.insertAdjacentHTML("beforeend",`
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
  `)}let B="learner",b=null,y=30,L=null;const $=`
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
`;function C(){if(!document.getElementById("dmAuthModal")){const t=document.createElement("div");t.innerHTML=$,document.body.appendChild(t.firstElementChild)}}function j(t="learner"){C();const e=document.getElementById("dmAuthModal");e&&(L=document.activeElement,w(t),I(),e.classList.add("is-active"),document.body.style.overflow="hidden",setTimeout(()=>{const n=document.getElementById("dmPhoneInput");n&&n.focus()},100))}function E(){const t=document.getElementById("dmAuthModal");!t||!t.classList.contains("is-active")||(t.classList.remove("is-active"),document.body.style.overflow="",clearInterval(b),L&&typeof L.focus=="function"&&L.focus())}function w(t){B=t;const e=document.getElementById("dmTabLearner"),n=document.getElementById("dmTabTrainer"),s=document.getElementById("dmRoleIndicator"),o=document.getElementById("dmAuthTitle");t==="trainer"?(n&&n.classList.add("is-active"),e&&e.classList.remove("is-active"),s&&(s.textContent="Certified Trainer Portal",s.className="dm-auth-role-badge is-trainer"),o&&(o.textContent="Trainer Sign In")):(e&&e.classList.add("is-active"),n&&n.classList.remove("is-active"),s&&(s.textContent="Learner Account",s.className="dm-auth-role-badge is-learner"),o&&(o.textContent="Welcome to DriveMe"))}function I(){const t=document.getElementById("dmStepPhone"),e=document.getElementById("dmStepOtp"),n=document.getElementById("dmAuthSuccess"),s=document.getElementById("dmPhoneInput");t&&t.classList.add("is-active"),e&&e.classList.remove("is-active"),n&&n.classList.remove("is-active"),s&&(s.value=""),k(),clearInterval(b)}function N(){const t=document.getElementById("dmStepPhone"),e=document.getElementById("dmStepOtp"),n=document.getElementById("dmPhoneInput"),s=document.getElementById("dmSentPhoneDisplay"),o=((n==null?void 0:n.value)||"9876543210").trim(),i=o.length>=10?`+91 ${o.slice(0,5)} •••••`:`+91 ${o}`;s&&(s.textContent=i),t&&t.classList.remove("is-active"),e&&e.classList.add("is-active"),k(),S(),setTimeout(()=>{const l=document.querySelector('.dm-auth-otp-box[data-index="0"]');l&&l.focus()},100)}function S(){clearInterval(b),y=30;const t=document.getElementById("dmResendCountdown"),e=document.getElementById("dmResendTimerText"),n=document.getElementById("dmResendBtn");n&&(n.disabled=!0),e&&(e.style.display="inline"),b=setInterval(()=>{y-=1,t&&(t.textContent=`${y}s`),y<=0&&(clearInterval(b),e&&(e.style.display="none"),n&&(n.disabled=!1))},1e3)}function k(){document.querySelectorAll(".dm-auth-otp-box").forEach(e=>{e.value="",e.classList.remove("is-filled")})}function W(){C();const t=document.getElementById("dmAuthModal");if(!t)return;document.addEventListener("click",r=>{const m=r.target.closest('a[href="#login"], [data-open-modal="login"], #navLoginBtn, #drawerLoginBtn');if(m){r.preventDefault();const u=m.getAttribute("data-role")||"learner";j(u)}});const e=document.getElementById("dmAuthClose");e&&e.addEventListener("click",E),t.addEventListener("click",r=>{r.target===t&&E()}),document.addEventListener("keydown",r=>{r.key==="Escape"&&t.classList.contains("is-active")&&E()});const n=document.getElementById("dmTabLearner"),s=document.getElementById("dmTabTrainer");n&&n.addEventListener("click",()=>w("learner")),s&&s.addEventListener("click",()=>w("trainer"));const o=document.getElementById("dmPhoneInput");o&&(o.addEventListener("input",r=>{r.target.value=r.target.value.replace(/\D/g,"").slice(0,10)}),o.addEventListener("keydown",r=>{var m;r.key==="Enter"&&(r.preventDefault(),(m=document.getElementById("dmSendOtpBtn"))==null||m.click())}));const i=document.getElementById("dmSendOtpBtn");i&&i.addEventListener("click",()=>{if(((o==null?void 0:o.value.trim())||"").length<10){const m=document.querySelector(".dm-auth-phone-group");m&&(m.style.borderColor="#EF4444",m.animate([{transform:"translateX(-4px)"},{transform:"translateX(4px)"},{transform:"translateX(-3px)"},{transform:"translateX(3px)"},{transform:"translateX(0)"}],{duration:250}),setTimeout(()=>{m.style.borderColor=""},1500)),o&&o.focus();return}N()});const l=document.getElementById("dmEditPhoneBtn");l&&l.addEventListener("click",I);const d=document.getElementById("dmResendBtn");d&&d.addEventListener("click",()=>{S(),k();const r=document.querySelector('.dm-auth-otp-box[data-index="0"]');r&&r.focus()});const a=document.querySelectorAll(".dm-auth-otp-box");a.forEach((r,m)=>{r.addEventListener("input",u=>{const h=u.target.value.replace(/\D/g,"");u.target.value=h?h.slice(-1):"",u.target.value?(r.classList.add("is-filled"),m<a.length-1&&a[m+1].focus()):r.classList.remove("is-filled")}),r.addEventListener("keydown",u=>{var h;u.key==="Backspace"&&!r.value&&m>0?a[m-1].focus():u.key==="Enter"&&(u.preventDefault(),(h=document.getElementById("dmVerifyOtpBtn"))==null||h.click())}),r.addEventListener("paste",u=>{u.preventDefault();const h=(u.clipboardData||window.clipboardData).getData("text").replace(/\D/g,"").slice(0,6);if(h){h.split("").forEach((f,p)=>{a[p]&&(a[p].value=f,a[p].classList.add("is-filled"))});const g=Math.min(h.length,a.length-1);a[g].focus()}})});const c=document.getElementById("dmVerifyOtpBtn");c&&c.addEventListener("click",()=>{let r="";a.forEach(g=>r+=g.value),r.length<6&&"123456".split("").forEach((f,p)=>{a[p]&&(a[p].value=f,a[p].classList.add("is-filled"))});const m=document.getElementById("dmStepOtp"),u=document.getElementById("dmAuthSuccess"),h=document.getElementById("dmSuccessSub");m&&m.classList.remove("is-active"),u&&u.classList.add("is-active"),h&&(h.textContent=B==="trainer"?"Welcome back, Instructor! Loading your lesson schedule...":"Welcome back, Learner! Loading your driving milestones..."),setTimeout(()=>{E()},1400)})}const Y=`
  <div class="dm-chatbot" id="dmChatbot">
    <button type="button" class="dm-chatbot-bubble" id="dmChatbotToggle" aria-expanded="false" aria-controls="dmChatbotPanel">
      <span class="dm-chatbot-bubble-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.5 8.5 0 0 1-3.7-.85L4 20l1.15-3.45A7.3 7.3 0 0 1 4.5 12c0-4.14 3.36-7.5 7.5-7.5S20 7.36 20 11.5Z"></path>
          <path d="M8.5 12h.01M12 12h.01M15.5 12h.01"></path>
        </svg>
      </span>
      <span>Ask DriveMe</span>
    </button>

    <section class="dm-chatbot-panel" id="dmChatbotPanel" aria-label="DriveMe assistant" aria-hidden="true">
      <header class="dm-chatbot-header">
        <div class="dm-chatbot-brand">
          <img src="/driveme-logo.jpeg" alt="DriveMe" class="dm-chatbot-logo">
          <div>
            <strong>DriveMe Assistant</strong>
            <span><i></i> Here to help</span>
          </div>
        </div>
        <button type="button" class="dm-chatbot-close" id="dmChatbotClose" aria-label="Close DriveMe assistant">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="m6 6 12 12M18 6 6 18"></path></svg>
        </button>
      </header>

      <div class="dm-chatbot-messages" id="dmChatbotMessages" aria-live="polite">
        <div class="dm-chatbot-message dm-chatbot-message--assistant">
          Hi! I'm the DriveMe assistant. Ask me anything about learning to drive, becoming a trainer, or how DriveMe works.
        </div>
        <div class="dm-chatbot-free-class-prompt" id="dmChatbotFreeClassPrompt">
          <strong>Ready to begin?</strong>
          <span>Register for a free class and we will help you take the next step.</span>
          <button type="button" id="dmChatbotRegister">Register for a Free Class</button>
        </div>
      </div>

      <div class="dm-chatbot-chips" id="dmChatbotChips" aria-label="Suggested questions">
        <button type="button">How do I book a trainer?</button>
        <button type="button">How do I become a trainer?</button>
        <button type="button">What's in the Exam Guide?</button>
        <button type="button">How does live tracking work?</button>
      </div>

      <form class="dm-chatbot-register" id="dmChatbotRegisterForm" hidden>
        <div class="dm-chatbot-register-heading">
          <strong>Get your free class</strong>
          <button type="button" id="dmChatbotRegisterBack" aria-label="Back to chat">Back</button>
        </div>
        <label for="dmChatbotPhone">Mobile number</label>
        <div class="dm-chatbot-phone-row">
          <span>+91</span>
          <input type="tel" id="dmChatbotPhone" inputmode="numeric" maxlength="10" placeholder="98765 43210" autocomplete="tel" required>
        </div>
        <p class="dm-chatbot-register-error" id="dmChatbotRegisterError" role="alert"></p>
        <button type="submit" class="dm-chatbot-register-submit">Register &amp; Get Free Class</button>
        <small>Your number stays in this demo until a booking system is connected.</small>
      </form>

      <form class="dm-chatbot-composer" id="dmChatbotForm">
        <label class="dm-sr-only" for="dmChatbotInput">Ask DriveMe a question</label>
        <input type="text" id="dmChatbotInput" placeholder="Ask about DriveMe..." autocomplete="off">
        <button type="submit" aria-label="Send message">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path></svg>
        </button>
      </form>
    </section>
  </div>
`,V="I can only help with questions about DriveMe - try asking me about booking a trainer, becoming a trainer, or the exam guide!",X=[{words:["book","booking","trainer","lesson"],reply:"Choose a verified trainer, select a lesson path and time, then confirm your doorstep pickup details. DriveMe supports both car and two-wheeler lessons."},{words:["become","onboard","onboarding","teach","trainer"],reply:"Trainers can apply through DriveMe, submit their credentials and vehicle details, and complete verification before opening lesson slots. The platform also supports scheduling and payouts."},{words:["price","pricing","cost","fee"],reply:"Pricing depends on the vehicle type, lesson length and trainer. DriveMe keeps the structure transparent, with the final amount shown before you confirm a lesson."},{words:["exam","llr","licence","license","rto"],reply:"The Exam and LLR guide covers documents, learner-licence steps, road rules and test preparation. It is designed to take you from paperwork to exam-ready practice."},{words:["8-track","8 track","eight track"],reply:"The 8-Track is a guided practice route for the official eight-shaped driving test. It helps learners repeat steering, control and positioning skills safely."},{words:["h-track","h track"],reply:"The H-Track is a structured practice route for the H-shaped test maneuver. It focuses on clutch control, reversing, alignment and observation."},{words:["signal","traffic light","road sign"],reply:"DriveMe groups traffic signals into regulatory, warning and informative categories, with clear explanations for each sign and its road-safety meaning."},{words:["live tracking","gps","track","telemetry"],reply:"During eligible lessons, live route tracking helps learners and their trusted contacts follow the journey. It adds visibility without replacing the trainer-led lesson."},{words:["download","app","ios","android","google play","app store"],reply:"Use the Get Started popup to find the app download options. The store links are placeholders for now, and the DriveMe app will be the main place to book and manage lessons."},{words:["start","get started","how do i","begin","free class","register"],reply:"Start by choosing Learner or Trainer, then use the Get Started option to continue. You can also register for a free class here and leave your mobile number."},{words:["driveme","platform","what is"],reply:"DriveMe connects learners with verified driving trainers for structured car and two-wheeler lessons, progress tracking and exam preparation."}];function z(t){const e=t.toLowerCase(),n=X.find(s=>s.words.some(o=>e.includes(o)));return n?n.reply:V}function x(t,e,n){const s=document.createElement("div");s.className=`dm-chatbot-message dm-chatbot-message--${n}`,s.textContent=e,t.appendChild(s),t.scrollTop=t.scrollHeight}function K(){if(document.getElementById("dmChatbot"))return;const t=document.createElement("div");t.innerHTML=Y,document.body.appendChild(t.firstElementChild);const e=document.getElementById("dmChatbot"),n=document.getElementById("dmChatbotToggle"),s=document.getElementById("dmChatbotClose"),o=document.getElementById("dmChatbotPanel"),i=document.getElementById("dmChatbotMessages"),l=document.getElementById("dmChatbotChips"),d=document.getElementById("dmChatbotForm"),a=document.getElementById("dmChatbotInput"),c=document.getElementById("dmChatbotRegister"),r=document.getElementById("dmChatbotRegisterForm"),m=document.getElementById("dmChatbotRegisterBack"),u=document.getElementById("dmChatbotPhone"),h=document.getElementById("dmChatbotRegisterError");function g(p){e.classList.toggle("is-open",p),n.setAttribute("aria-expanded",String(p)),o.setAttribute("aria-hidden",String(!p)),p&&a.focus()}function f(p){r.hidden=!p,d.hidden=p,l.hidden=p,p?u.focus():a.focus()}n.addEventListener("click",()=>g(!e.classList.contains("is-open"))),s.addEventListener("click",()=>g(!1)),c.addEventListener("click",()=>f(!0)),m.addEventListener("click",()=>f(!1)),l.addEventListener("click",p=>{const v=p.target.closest("button");v&&(a.value=v.textContent,a.focus())}),d.addEventListener("submit",p=>{p.preventDefault();const v=a.value.trim();v&&(x(i,v,"user"),a.value="",window.setTimeout(()=>x(i,z(v),"assistant"),180))}),u.addEventListener("input",()=>{u.value=u.value.replace(/\D/g,"").slice(0,10),h.textContent=""}),r.addEventListener("submit",p=>{if(p.preventDefault(),u.value.length<10){h.textContent="Please enter a valid 10-digit mobile number.",u.focus();return}localStorage.setItem("dm_free_class_phone",u.value),r.innerHTML='<div class="dm-chatbot-register-success"><strong>You are registered.</strong><span>We have saved your number for the free-class follow-up in this demo.</span><button type="button" id="dmChatbotContinue">Back to chat</button></div>',document.getElementById("dmChatbotContinue").addEventListener("click",()=>f(!1))}),document.addEventListener("keydown",p=>{p.key==="Escape"&&e.classList.contains("is-open")&&g(!1)})}document.addEventListener("DOMContentLoaded",()=>{M(),G(),W(),K(),T(),D(),q(),O(),R(),A(),Z();const t=document.getElementById("current-year");t&&(t.textContent=new Date().getFullYear())});function Z(){const t=document.querySelectorAll(".dm-swatch-card"),e=document.getElementById("dm-copy-toast"),n=document.getElementById("dm-copy-toast-text");let s=null;t.forEach(o=>{o.addEventListener("click",()=>{const i=o.getAttribute("data-hex"),l=o.getAttribute("data-name");i&&navigator.clipboard.writeText(i).then(()=>{e&&n&&(n.textContent=`Copied ${l} (${i}) to clipboard!`,e.classList.add("is-active"),s&&clearTimeout(s),s=setTimeout(()=>{e.classList.remove("is-active")},2400))}).catch(()=>{})})})}
