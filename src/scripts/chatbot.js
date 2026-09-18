const CHATBOT_HTML = `
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
`;

const FALLBACK_REPLY = 'I can only help with questions about DriveMe - try asking me about booking a trainer, becoming a trainer, or the exam guide!';

const TOPIC_REPLIES = [
  {
    words: ['book', 'booking', 'trainer', 'lesson'],
    reply: 'Choose a verified trainer, select a lesson path and time, then confirm your doorstep pickup details. DriveMe supports both car and two-wheeler lessons.'
  },
  {
    words: ['become', 'onboard', 'onboarding', 'teach', 'trainer'],
    reply: 'Trainers can apply through DriveMe, submit their credentials and vehicle details, and complete verification before opening lesson slots. The platform also supports scheduling and payouts.'
  },
  {
    words: ['price', 'pricing', 'cost', 'fee'],
    reply: 'Pricing depends on the vehicle type, lesson length and trainer. DriveMe keeps the structure transparent, with the final amount shown before you confirm a lesson.'
  },
  {
    words: ['exam', 'llr', 'licence', 'license', 'rto'],
    reply: 'The Exam and LLR guide covers documents, learner-licence steps, road rules and test preparation. It is designed to take you from paperwork to exam-ready practice.'
  },
  {
    words: ['8-track', '8 track', 'eight track'],
    reply: 'The 8-Track is a guided practice route for the official eight-shaped driving test. It helps learners repeat steering, control and positioning skills safely.'
  },
  {
    words: ['h-track', 'h track'],
    reply: 'The H-Track is a structured practice route for the H-shaped test maneuver. It focuses on clutch control, reversing, alignment and observation.'
  },
  {
    words: ['signal', 'traffic light', 'road sign'],
    reply: 'DriveMe groups traffic signals into regulatory, warning and informative categories, with clear explanations for each sign and its road-safety meaning.'
  },
  {
    words: ['live tracking', 'gps', 'track', 'telemetry'],
    reply: 'During eligible lessons, live route tracking helps learners and their trusted contacts follow the journey. It adds visibility without replacing the trainer-led lesson.'
  },
  {
    words: ['download', 'app', 'ios', 'android', 'google play', 'app store'],
    reply: 'Use the Get Started popup to find the app download options. The store links are placeholders for now, and the DriveMe app will be the main place to book and manage lessons.'
  },
  {
    words: ['start', 'get started', 'how do i', 'begin', 'free class', 'register'],
    reply: 'Start by choosing Learner or Trainer, then use the Get Started option to continue. You can also register for a free class here and leave your mobile number.'
  },
  {
    words: ['driveme', 'platform', 'what is'],
    reply: 'DriveMe connects learners with verified driving trainers for structured car and two-wheeler lessons, progress tracking and exam preparation.'
  }
];

function getReply(message) {
  const normalized = message.toLowerCase();
  const match = TOPIC_REPLIES.find((topic) => topic.words.some((word) => normalized.includes(word)));
  return match ? match.reply : FALLBACK_REPLY;
}

function appendMessage(messages, text, type) {
  const message = document.createElement('div');
  message.className = `dm-chatbot-message dm-chatbot-message--${type}`;
  message.textContent = text;
  messages.appendChild(message);
  messages.scrollTop = messages.scrollHeight;
}

export function initChatbot() {
  if (document.getElementById('dmChatbot')) return;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = CHATBOT_HTML;
  document.body.appendChild(wrapper.firstElementChild);

  const widget = document.getElementById('dmChatbot');
  const toggle = document.getElementById('dmChatbotToggle');
  const close = document.getElementById('dmChatbotClose');
  const panel = document.getElementById('dmChatbotPanel');
  const messages = document.getElementById('dmChatbotMessages');
  const chips = document.getElementById('dmChatbotChips');
  const form = document.getElementById('dmChatbotForm');
  const input = document.getElementById('dmChatbotInput');
  const registerPrompt = document.getElementById('dmChatbotRegister');
  const registerForm = document.getElementById('dmChatbotRegisterForm');
  const registerBack = document.getElementById('dmChatbotRegisterBack');
  const phone = document.getElementById('dmChatbotPhone');
  const registerError = document.getElementById('dmChatbotRegisterError');

  function setOpen(isOpen) {
    widget.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    panel.setAttribute('aria-hidden', String(!isOpen));
    if (isOpen) input.focus();
  }

  function setRegistration(isVisible) {
    registerForm.hidden = !isVisible;
    form.hidden = isVisible;
    chips.hidden = isVisible;
    if (isVisible) {
      phone.focus();
    } else {
      input.focus();
    }
  }

  toggle.addEventListener('click', () => setOpen(!widget.classList.contains('is-open')));
  close.addEventListener('click', () => setOpen(false));
  registerPrompt.addEventListener('click', () => setRegistration(true));
  registerBack.addEventListener('click', () => setRegistration(false));

  chips.addEventListener('click', (event) => {
    const chip = event.target.closest('button');
    if (!chip) return;
    input.value = chip.textContent;
    input.focus();
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const question = input.value.trim();
    if (!question) return;
    appendMessage(messages, question, 'user');
    input.value = '';
    window.setTimeout(() => appendMessage(messages, getReply(question), 'assistant'), 180);
  });

  phone.addEventListener('input', () => {
    phone.value = phone.value.replace(/\D/g, '').slice(0, 10);
    registerError.textContent = '';
  });

  registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (phone.value.length < 10) {
      registerError.textContent = 'Please enter a valid 10-digit mobile number.';
      phone.focus();
      return;
    }

    localStorage.setItem('dm_free_class_phone', phone.value);
    registerForm.innerHTML = '<div class="dm-chatbot-register-success"><strong>You are registered.</strong><span>We have saved your number for the free-class follow-up in this demo.</span><button type="button" id="dmChatbotContinue">Back to chat</button></div>';
    document.getElementById('dmChatbotContinue').addEventListener('click', () => setRegistration(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && widget.classList.contains('is-open')) setOpen(false);
  });
}
