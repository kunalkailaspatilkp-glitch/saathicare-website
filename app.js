/**
 * SaathiCare - Interactive Web Application Logic
 * Supports dynamic currency conversion, simulated live dashboard, booking modals, and FAQ accordions.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  initCurrencyToggle();
  initInteractiveDemo();
  initBookingModal();
  initFaqAccordion();
  initMobileMenu();
  initSmoothScroll();
});

/* ==========================================================================
   1. Dynamic Currency & Pricing Switcher (INR <-> USD for NRIs)
   ========================================================================== */
function initCurrencyToggle() {
  const inrBtn = document.getElementById('currency-inr');
  const usdBtn = document.getElementById('currency-usd');

  const pricingData = {
    inr: {
      currencySymbol: '₹',
      trialPrice: '₹399',
      trialSubtext: 'one-time low risk visit',
      basicPrice: '₹1,800',
      standardPrice: '₹3,200',
      dailyPrice: '₹5,800',
      basicPerVisit: '~₹450 / visit',
      standardPerVisit: '~₹266 / visit',
      dailyPerVisit: '~₹193 / visit',
      guarantee: 'Includes mandatory free parent tea meet-and-greet'
    },
    usd: {
      currencySymbol: '$',
      trialPrice: '$6',
      trialSubtext: 'one-time trial visit',
      basicPrice: '$24',
      standardPrice: '$39',
      dailyPrice: '$69',
      basicPerVisit: '~$6 / visit',
      standardPerVisit: '~$3.2 / visit',
      dailyPerVisit: '~$2.3 / visit',
      guarantee: 'Billed in USD • Zero international transaction fees'
    }
  };

  function updatePrices(currency) {
    const data = pricingData[currency];
    if (!data) return;

    // Update active button state
    if (currency === 'inr') {
      inrBtn.classList.add('active', 'bg-white', 'text-amber-700', 'shadow');
      inrBtn.classList.remove('text-stone-600');
      usdBtn.classList.remove('active', 'bg-white', 'text-amber-700', 'shadow');
      usdBtn.classList.add('text-stone-600');
    } else {
      usdBtn.classList.add('active', 'bg-white', 'text-amber-700', 'shadow');
      usdBtn.classList.remove('text-stone-600');
      inrBtn.classList.remove('active', 'bg-white', 'text-amber-700', 'shadow');
      inrBtn.classList.add('text-stone-600');
    }

    // Update elements
    const trialEl = document.getElementById('price-trial');
    const basicEl = document.getElementById('price-basic');
    const standardEl = document.getElementById('price-standard');
    const dailyEl = document.getElementById('price-daily');

    const basicSub = document.getElementById('sub-basic');
    const standardSub = document.getElementById('sub-standard');
    const dailySub = document.getElementById('sub-daily');

    if (trialEl) trialEl.textContent = data.trialPrice;
    if (basicEl) basicEl.textContent = data.basicPrice;
    if (standardEl) standardEl.textContent = data.standardPrice;
    if (dailyEl) dailyEl.textContent = data.dailyPrice;

    if (basicSub) basicSub.textContent = data.basicPerVisit;
    if (standardSub) standardSub.textContent = data.standardPerVisit;
    if (dailySub) dailySub.textContent = data.dailyPerVisit;

    showToast(`Prices updated to ${currency.toUpperCase()}`);
  }

  if (inrBtn && usdBtn) {
    inrBtn.addEventListener('click', () => updatePrices('inr'));
    usdBtn.addEventListener('click', () => updatePrices('usd'));
  }
}

/* ==========================================================================
   2. Interactive 3-Role Functional Prototype Demo
   (Buyer / Caregiver / Elderly Parent — a real, stateful walkthrough,
   not a scripted scenario. Completing the caregiver check-in updates
   the buyer's visit log and notification feed live.)
   ========================================================================== */
const demoState = {
  visit: {
    time: "4:00 PM",
    task: "Doctor escort — Dr. Rao's clinic",
    status: "upcoming", // upcoming | completed
    note: ""
  },
  feed: [
    { text: "Meena confirmed today's visit for Shalini Amma.", time: "9:12 AM" }
  ]
};

function initInteractiveDemo() {
  const tabs = document.querySelectorAll('.demo-tab');
  const panels = {
    buyer: document.getElementById('demo-panel-buyer'),
    caregiver: document.getElementById('demo-panel-caregiver'),
    parent: document.getElementById('demo-panel-parent')
  };
  if (!tabs.length || !panels.buyer) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const role = tab.getAttribute('data-role');
      tabs.forEach(t => {
        t.classList.remove('bg-amber-600', 'text-white', 'shadow-md');
        t.classList.add('bg-white', 'text-stone-700', 'hover:bg-amber-50');
      });
      tab.classList.add('bg-amber-600', 'text-white', 'shadow-md');
      tab.classList.remove('bg-white', 'text-stone-700', 'hover:bg-amber-50');

      Object.values(panels).forEach(p => p.classList.add('hidden'));
      panels[role].classList.remove('hidden');
    });
  });

  renderBuyerDemo();

  const adhocBtn = document.getElementById('demo-adhoc-btn');
  if (adhocBtn) {
    adhocBtn.addEventListener('click', () => {
      pushDemoFeed('Ad-hoc visit requested — coordinator will confirm within the hour.');
      adhocBtn.textContent = '✓ Request sent to coordinator';
      adhocBtn.disabled = true;
      adhocBtn.classList.add('opacity-60');
    });
  }

  const arriveBtn = document.getElementById('demo-arrive-btn');
  if (arriveBtn) {
    arriveBtn.addEventListener('click', () => {
      document.getElementById('demo-step-arrive').classList.add('hidden');
      document.getElementById('demo-step-checklist').classList.remove('hidden');
      pushDemoFeed("Meena has arrived for Shalini Amma's " + demoState.visit.task.toLowerCase() + ".");
    });
  }

  const captureBtn = document.getElementById('demo-capture-btn');
  if (captureBtn) {
    captureBtn.addEventListener('click', () => {
      const preview = document.getElementById('demo-photo-preview');
      preview.classList.remove('hidden');
      preview.classList.add('flex');
      captureBtn.textContent = '✓ Photo captured';
      checkDemoSubmit();
    });
  }

  document.querySelectorAll('.demo-chk').forEach(chk => {
    chk.addEventListener('change', checkDemoSubmit);
  });

  const submitBtn = document.getElementById('demo-submit-btn');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const noteEl = document.getElementById('demo-note');
      demoState.visit.status = 'completed';
      demoState.visit.note = (noteEl && noteEl.value.trim()) || 'Visit completed. All tasks done, Amma doing well.';
      document.getElementById('demo-step-checklist').classList.add('hidden');
      document.getElementById('demo-step-done').classList.remove('hidden');
      pushDemoFeed('Visit completed — "' + demoState.visit.task + '" logged with photo and notes.');
      renderBuyerDemo();
    });
  }

  const goodBtn = document.getElementById('demo-parent-good');
  const helpBtn = document.getElementById('demo-parent-help');
  const confirmEl = document.getElementById('demo-parent-confirm');
  if (goodBtn) {
    goodBtn.addEventListener('click', () => {
      confirmEl.textContent = "Sent to Priya: \"Amma says she's doing well today.\"";
      confirmEl.classList.remove('hidden');
      pushDemoFeed('Amma checked in: doing well today.');
    });
  }
  if (helpBtn) {
    helpBtn.addEventListener('click', () => {
      confirmEl.textContent = 'Sent to Priya and Meena: Amma flagged she needs something.';
      confirmEl.classList.remove('hidden');
      pushDemoFeed('Amma flagged she needs something — coordinator notified.');
    });
  }
}

function checkDemoSubmit() {
  const boxes = document.querySelectorAll('.demo-chk');
  const allChecked = Array.from(boxes).every(b => b.checked);
  const preview = document.getElementById('demo-photo-preview');
  const photoTaken = preview && !preview.classList.contains('hidden');
  const submitBtn = document.getElementById('demo-submit-btn');
  if (submitBtn) submitBtn.disabled = !(allChecked && photoTaken);
}

function pushDemoFeed(text) {
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  demoState.feed.push({ text, time });
  renderBuyerDemo();
}

function renderBuyerDemo() {
  const timeEl = document.getElementById('demo-next-time');
  const taskEl = document.getElementById('demo-next-task');
  const statusEl = document.getElementById('demo-next-status');
  const timelineEl = document.getElementById('demo-timeline');
  const feedEl = document.getElementById('demo-feed');
  if (!timelineEl) return;

  if (demoState.visit.status === 'upcoming') {
    if (timeEl) timeEl.textContent = demoState.visit.time;
    if (taskEl) taskEl.textContent = demoState.visit.task;
    if (statusEl) {
      statusEl.textContent = 'Upcoming';
      statusEl.className = 'text-xs bg-amber-100 text-amber-800 font-bold px-2.5 py-1 rounded-full shrink-0';
    }
  } else {
    if (timeEl) timeEl.textContent = '—';
    if (taskEl) taskEl.textContent = 'No further visits today';
    if (statusEl) {
      statusEl.textContent = 'All done';
      statusEl.className = 'text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full shrink-0';
    }
  }

  timelineEl.innerHTML = `
    <div class="flex items-start gap-3">
      <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-teal-100 to-amber-100 flex items-center justify-center text-sm shrink-0">
        ${demoState.visit.status === 'completed' ? '📷' : '🕓'}
      </div>
      <div class="text-xs">
        <div class="flex justify-between gap-2">
          <span class="font-semibold text-stone-800">${demoState.visit.task}</span>
          <span class="text-stone-400 shrink-0">${demoState.visit.time}</span>
        </div>
        <div class="text-stone-500 mt-0.5">${demoState.visit.note || 'Scheduled — Meena will check in on arrival.'}</div>
      </div>
    </div>
  `;

  if (feedEl) {
    feedEl.innerHTML = demoState.feed.slice().reverse().map(f => `
      <div class="flex gap-2 border-t border-stone-100 pt-2 first:border-0 first:pt-0">
        <div class="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></div>
        <div>
          <div class="text-stone-700">${f.text}</div>
          <div class="text-stone-400 text-[10px]">${f.time}</div>
        </div>
      </div>
    `).join('');
  }
}

/* ==========================================================================
   3. Interactive Booking & Onboarding Modal
   ========================================================================== */
function initBookingModal() {
  const modal = document.getElementById('booking-modal');
  const openButtons = document.querySelectorAll('.open-booking-modal');
  const closeButtons = document.querySelectorAll('.close-booking-modal');
  const bookingForm = document.getElementById('saathicare-booking-form');
  const formSection = document.getElementById('modal-form-section');
  const successSection = document.getElementById('modal-success-section');

  if (!modal) return;

  function openModal(prefilledPlan = '') {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';

    // Reset view
    if (formSection) formSection.classList.remove('hidden');
    if (successSection) successSection.classList.add('hidden');

    if (prefilledPlan) {
      const planSelect = document.getElementById('booking-plan');
      if (planSelect) planSelect.value = prefilledPlan;
    }
  }

  function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const plan = btn.getAttribute('data-plan') || 'trial';
      openModal(plan);
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  // Close on outside click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Handle Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // Form submission
  const SHEET_ENDPOINT = 'https://script.google.com/macros/s/AKfycbyot400cc1O3wUYSxrWKUV9SaZCPZEdl-AqShLRWVCOaxDZ9WV5gm_mQWZZ9vKNU3Lk/exec';

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const parentName = document.getElementById('booking-parent-name')?.value || 'Your Parents';
      const city = document.getElementById('booking-city')?.value || 'Your City';
      const plan = document.getElementById('booking-plan')?.value || '';
      const childPhone = document.getElementById('booking-child-phone')?.value || '';

      // Send to Google Sheet via Apps Script (fire-and-forget; no-cors means
      // we can't read the response, but the row still gets written).
      fetch(SHEET_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ parentName, city, plan, childPhone })
      }).catch((err) => {
        console.error('Booking sheet sync failed (form still submitted locally):', err);
      });

      // Set confirmation summary
      const confirmedMsg = document.getElementById('success-summary-text');
      if (confirmedMsg) {
        confirmedMsg.textContent = `A dedicated SaathiCare coordinator has been assigned for ${parentName} in ${city}. We will reach out on WhatsApp (${childPhone}) within 2 hours to coordinate the free introductory tea visit.`;
      }

      // Transition to success screen
      if (formSection) formSection.classList.add('hidden');
      if (successSection) successSection.classList.remove('hidden');

      showToast('Booking request received! Dedicated care coordinator notified.');
    });
  }
}

/* ==========================================================================
   4. FAQ Accordion Logic
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');
    const icon = item.querySelector('.faq-icon');

    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isOpen = !content.classList.contains('hidden');

      // Close all other items
      faqItems.forEach(otherItem => {
        const otherContent = otherItem.querySelector('.faq-content');
        const otherIcon = otherItem.querySelector('.faq-icon');
        if (otherContent) otherContent.classList.add('hidden');
        if (otherIcon) otherIcon.classList.remove('rotate-180');
      });

      // Toggle current item
      if (!isOpen) {
        content.classList.remove('hidden');
        if (icon) icon.classList.add('rotate-180');
      }
    });
  });
}

/* ==========================================================================
   5. Mobile Navigation Menu Toggle
   ========================================================================== */
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuDrawer = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!mobileMenuBtn || !mobileMenuDrawer) return;

  mobileMenuBtn.addEventListener('click', () => {
    const isHidden = mobileMenuDrawer.classList.contains('hidden');
    if (isHidden) {
      mobileMenuDrawer.classList.remove('hidden');
    } else {
      mobileMenuDrawer.classList.add('hidden');
    }
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuDrawer.classList.add('hidden');
    });
  });
}

/* ==========================================================================
   6. Smooth Anchor Scrolling
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/* ==========================================================================
   7. Non-intrusive Toast Notification
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('saathicare-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'saathicare-toast';
    toast.className = 'fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-sm font-medium transition-all duration-300 transform translate-y-12 opacity-0';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
    <span>${message}</span>
  `;

  // Animate in
  toast.classList.remove('translate-y-12', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  // Auto dismiss
  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-12', 'opacity-0');
  }, 3500);
}
