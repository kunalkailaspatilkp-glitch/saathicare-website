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
  initDashboardSimulator();
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
   2. Live WhatsApp & Remote Care Dashboard Simulator
   ========================================================================== */
const simulatedScenarios = {
  companionship: {
    badge: "Routine Daily Visit",
    time: "Today, 10:15 AM",
    title: "Morning Chai, Walk & Medication Check",
    saathiName: "Aarti Verma (Verified Companion)",
    saathiRating: "4.9 ★ (140+ visits)",
    checkInTime: "09:55 AM (GPS Verified: Model Town, Pune)",
    statusText: "Completed (1 hr 15 mins)",
    vitalText: "BP: 122/80 mmHg • Pulse: 72 bpm",
    logSummary: "Uncle was in good spirits. We took a 20-minute slow walk in the garden, enjoyed cardamom chai, and checked the weekly pill organizer. Blood pressure was normal. He also shared stories of his college days in Roorkee!",
    photoCaption: "Uncle smiling on the veranda during morning cardamom chai",
    photoUrl: "https://images.unsplash.com/photo-1774437892287-6bff0fc8980a?auto=format&fit=crop&w=600&q=80",
    actionsCompleted: [
      "20-min gentle assisted park walk",
      "Morning medication adherence confirmed",
      "Cardamom chai & 35 min heartfelt conversation",
      "Fresh milk & fruit picked up from society booth"
    ]
  },
  doctor: {
    badge: "Medical Escort & Notes",
    time: "Yesterday, 3:45 PM",
    title: "Cardiologist Follow-up at Apollo Clinic",
    saathiName: "Rajesh Kumar (Senior Escort Saathi)",
    saathiRating: "5.0 ★ (210+ visits)",
    checkInTime: "02:40 PM (Uber Escort: Gomti Nagar, Lucknow)",
    statusText: "Completed (2 hrs 30 mins)",
    vitalText: "Doctor: Dr. A.K. Singhal • Token #18",
    logSummary: "Escorted Aunty safely via cab. Waited in clinic, assisted onto examination chair. Dr. Singhal reviewed ECG: heart rhythm stable. Dosages unchanged. Next routine follow-up recommended after 90 days. All new medicines collected from pharmacy.",
    photoCaption: "Aunty comfortably resting after clinic visit with updated prescription notes",
    photoUrl: "https://images.unsplash.com/photo-1768718254616-42746ca09818?auto=format&fit=crop&w=600&q=80",
    actionsCompleted: [
      "Door-to-door escort via air-conditioned cab",
      "Waited through appointment & recorded doctor notes",
      "Purchased 30-day prescription refills with bill upload",
      "Safely settled Aunty back home with water & tea"
    ]
  },
  errands: {
    badge: "Errand & Tech Assistance",
    time: "Tuesday, 11:30 AM",
    title: "Pension Life Certificate & Video Call Setup",
    saathiName: "Neha Joshi (Tech-Friendly Saathi)",
    saathiRating: "4.9 ★ (85+ visits)",
    checkInTime: "11:00 AM (Home Visit: Sector 34, Chandigarh)",
    statusText: "Completed (1 hr 30 mins)",
    vitalText: "Jeevan Pramaan Token: #JP-882941",
    logSummary: "Successfully completed digital Jeevan Pramaan submission on Papa's smartphone using facial recognition. Set up WhatsApp shortcut for calling his grandson in Toronto. Replaced dead TV remote batteries and filed electricity bill receipt.",
    photoCaption: "Papa smiling after successful Jeevan Pramaan submission and WhatsApp video call",
    photoUrl: "https://images.unsplash.com/photo-1774438359980-8cd8dfa0558b?auto=format&fit=crop&w=600&q=80",
    actionsCompleted: [
      "Jeevan Pramaan biometric life certificate completed",
      "Electricity and water bills paid digitally",
      "High-speed WhatsApp test video call to USA conducted",
      "Smartphone cache cleared & icons organized"
    ]
  }
};

function initDashboardSimulator() {
  const tabs = document.querySelectorAll('.dashboard-tab');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const scenarioKey = tab.getAttribute('data-scenario');
      const data = simulatedScenarios[scenarioKey];
      if (!data) return;

      // Toggle tab styling
      tabs.forEach(t => {
        t.classList.remove('bg-amber-600', 'text-white', 'shadow-md');
        t.classList.add('bg-white', 'text-stone-700', 'hover:bg-amber-50');
      });
      tab.classList.add('bg-amber-600', 'text-white', 'shadow-md');
      tab.classList.remove('bg-white', 'text-stone-700', 'hover:bg-amber-50');

      // Update Phone Screen Elements
      const badgeEl = document.getElementById('dash-badge');
      const timeEl = document.getElementById('dash-time');
      const titleEl = document.getElementById('dash-title');
      const saathiNameEl = document.getElementById('dash-saathi-name');
      const saathiRatingEl = document.getElementById('dash-saathi-rating');
      const checkInEl = document.getElementById('dash-checkin');
      const vitalsEl = document.getElementById('dash-vitals');
      const summaryEl = document.getElementById('dash-summary');
      const photoEl = document.getElementById('dash-photo');
      const photoCaptionEl = document.getElementById('dash-photo-caption');
      const actionsListEl = document.getElementById('dash-actions-list');

      if (badgeEl) badgeEl.textContent = data.badge;
      if (timeEl) timeEl.textContent = data.time;
      if (titleEl) titleEl.textContent = data.title;
      if (saathiNameEl) saathiNameEl.textContent = data.saathiName;
      if (saathiRatingEl) saathiRatingEl.textContent = data.saathiRating;
      if (checkInEl) checkInEl.textContent = data.checkInTime;
      if (vitalsEl) vitalsEl.textContent = data.vitalText;
      if (summaryEl) summaryEl.textContent = data.logSummary;
      if (photoCaptionEl) photoCaptionEl.textContent = data.photoCaption;
      if (photoEl) photoEl.src = data.photoUrl;

      if (actionsListEl) {
        actionsListEl.innerHTML = data.actionsCompleted
          .map(item => `<li class="flex items-start text-xs text-stone-700 gap-1.5"><svg class="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg><span>${item}</span></li>`)
          .join('');
      }

      // Quick visual feedback
      const previewCard = document.getElementById('phone-preview-card');
      if (previewCard) {
        previewCard.classList.add('opacity-75');
        setTimeout(() => previewCard.classList.remove('opacity-75'), 150);
      }
    });
  });
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
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const parentName = document.getElementById('booking-parent-name')?.value || 'Your Parents';
      const city = document.getElementById('booking-city')?.value || 'Your City';
      const childPhone = document.getElementById('booking-child-phone')?.value || '';

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
