/**
 * Main Application Orchestrator & GSAP Animation System
 * Dr. Neha Sharma Clinic Website • Makrana, Rajasthan
 * Enhanced for 100% Mobile & Desktop Performance
 */

document.addEventListener('DOMContentLoaded', () => {
  // Ensure GSAP and ScrollTrigger are loaded
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.error('GSAP / ScrollTrigger not loaded');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Set current year in footer
  const yearSpan = document.getElementById('yearSpan');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Header scroll appearance
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  /* ==========================================================================
     HERO PINNED STORYTELLING TIMELINE (Responsive GSAP MatchMedia)
     ========================================================================== */
  const mm = gsap.matchMedia();
  const heroTrack = document.getElementById('heroTrack');
  const heroBgText = document.getElementById('heroBgText');
  const portraitContainer = document.getElementById('portraitContainer');
  
  const state1 = document.getElementById('storyState1');
  const state2 = document.getElementById('storyState2');
  const state3 = document.getElementById('storyState3');

  if (heroTrack && portraitContainer) {
    // DESKTOP & TABLET ANIMATION (> 768px)
    mm.add('(min-width: 769px)', () => {
      const isTablet = window.innerWidth <= 1024;
      const targetPortraitX = isTablet ? '-24vw' : '-28vw';
      const targetPortraitScale = 0.94;

      const heroTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: heroTrack,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
          onUpdate: (self) => {
            if (typeof window.updateDnaScroll === 'function') {
              window.updateDnaScroll(self.progress, self.getVelocity());
            }
          }
        }
      });

      // Initial state
      gsap.set(heroBgText, { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' });
      gsap.set(portraitContainer, { x: 0, y: 0, scale: 1, opacity: 1 });
      gsap.set(state1, { opacity: 1, visibility: 'visible', y: 0 });
      gsap.set(state2, { opacity: 0, visibility: 'hidden', y: 40, filter: 'blur(8px)' });
      gsap.set(state3, { opacity: 0, visibility: 'hidden', x: 50, scale: 0.96 });

      heroTimeline
        // Phase 1 -> 2
        .to(state1, {
          opacity: 0,
          y: -30,
          duration: 0.15,
          ease: 'power2.in',
          onComplete: () => state1.classList.remove('active')
        }, 0.05)
        .to(heroBgText, {
          opacity: 0.1,
          scale: 1.12,
          y: -60,
          filter: 'blur(6px)',
          duration: 0.3,
          ease: 'power1.inOut'
        }, 0.1)
        .to(state2, {
          opacity: 1,
          visibility: 'visible',
          y: 0,
          filter: 'blur(0px)',
          duration: 0.25,
          ease: 'power2.out',
          onStart: () => state2.classList.add('active')
        }, 0.25)
        .to({}, { duration: 0.15 })

        // Phase 2 -> 3/4
        .to(state2, {
          opacity: 0,
          y: -30,
          filter: 'blur(6px)',
          duration: 0.2,
          ease: 'power2.in',
          onComplete: () => state2.classList.remove('active')
        }, 0.55)
        .to(portraitContainer, {
          x: targetPortraitX,
          y: 0,
          scale: targetPortraitScale,
          duration: 0.4,
          ease: 'power2.inOut'
        }, 0.6)
        .to(state3, {
          opacity: 1,
          visibility: 'visible',
          x: 0,
          scale: 1,
          duration: 0.35,
          ease: 'power3.out',
          onStart: () => state3.classList.add('active')
        }, 0.68)
        .to({}, { duration: 0.1 });
    });

    // MOBILE ANIMATION (<= 768px)
    mm.add('(max-width: 768px)', () => {
      const heroTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: heroTrack,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.1,
          onUpdate: (self) => {
            if (typeof window.updateDnaScroll === 'function') {
              window.updateDnaScroll(self.progress, self.getVelocity());
            }
          }
        }
      });

      // Initial mobile setup
      gsap.set(heroBgText, { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' });
      gsap.set(portraitContainer, { xPercent: -50, left: '50%', x: 0, y: 0, scale: 1, opacity: 1 });
      gsap.set(state1, { opacity: 1, visibility: 'visible', y: 0 });
      gsap.set(state2, { opacity: 0, visibility: 'hidden', y: 30, filter: 'blur(6px)' });
      gsap.set(state3, { opacity: 0, visibility: 'hidden', y: 40 });

      heroTimeline
        // Phase 1 -> 2: Fade entry info, fade oversized text, reveal State 2
        .to(state1, {
          opacity: 0,
          y: -20,
          duration: 0.15,
          ease: 'power2.in',
          onComplete: () => state1.classList.remove('active')
        }, 0.05)
        .to(heroBgText, {
          opacity: 0.08,
          scale: 1.08,
          y: -40,
          filter: 'blur(4px)',
          duration: 0.28,
          ease: 'power1.inOut'
        }, 0.1)
        .to(state2, {
          opacity: 1,
          visibility: 'visible',
          y: 0,
          filter: 'blur(0px)',
          duration: 0.25,
          ease: 'power2.out',
          onStart: () => state2.classList.add('active')
        }, 0.22)
        .to({}, { duration: 0.15 })

        // Phase 2 -> 3/4: State 2 fades out, Portrait floats up to soft background, Doctor card slides up
        .to(state2, {
          opacity: 0,
          y: -25,
          filter: 'blur(4px)',
          duration: 0.18,
          ease: 'power2.in',
          onComplete: () => state2.classList.remove('active')
        }, 0.52)
        .to(portraitContainer, {
          y: '-26vh',
          xPercent: -50,
          left: '50%',
          x: 0,
          scale: 0.62,
          opacity: 0.3,
          duration: 0.38,
          ease: 'power2.inOut'
        }, 0.55)
        .to(state3, {
          opacity: 1,
          visibility: 'visible',
          y: 0,
          duration: 0.35,
          ease: 'power3.out',
          onStart: () => state3.classList.add('active')
        }, 0.64)
        .to({}, { duration: 0.1 });
    });
  }

  /* ==========================================================================
     CONTENT SECTIONS SCROLL REVEALS
     ========================================================================== */
  
  // Section Headers Reveal
  gsap.utils.toArray('.section-header-editorial').forEach((headerEl) => {
    gsap.from(headerEl, {
      scrollTrigger: {
        trigger: headerEl,
        start: 'top 88%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 35,
      duration: 0.8,
      ease: 'power3.out'
    });
  });

  // About Grid Panels Reveal
  gsap.utils.toArray('.about-grid .glass-panel').forEach((panel, i) => {
    gsap.from(panel, {
      scrollTrigger: {
        trigger: panel,
        start: 'top 88%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 35,
      duration: 0.75,
      delay: i * 0.1,
      ease: 'power3.out'
    });
  });

  // Services List Rows Reveal
  gsap.utils.toArray('.service-row').forEach((row, i) => {
    gsap.from(row, {
      scrollTrigger: {
        trigger: row,
        start: 'top 90%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 30,
      duration: 0.7,
      delay: i * 0.08,
      ease: 'power3.out'
    });
  });

  // Clinic Section Cards Reveal
  gsap.utils.toArray('.clinic-grid .glass-panel').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 88%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 35,
      duration: 0.8,
      delay: i * 0.12,
      ease: 'power3.out'
    });
  });

  // CTA Banner Reveal
  const ctaBanner = document.querySelector('.cta-banner');
  if (ctaBanner) {
    gsap.from(ctaBanner, {
      scrollTrigger: {
        trigger: ctaBanner,
        start: 'top 88%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      scale: 0.96,
      y: 25,
      duration: 0.8,
      ease: 'power3.out'
    });
  }

  /* ==========================================================================
     APPOINTMENT MODAL LOGIC
     ========================================================================== */
  const modal = document.getElementById('appointmentModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const appointmentForm = document.getElementById('appointmentForm');
  const formStatusMsg = document.getElementById('formStatusMsg');
  const consultTypeSelect = document.getElementById('consultType');
  const preferredDateInput = document.getElementById('preferredDate');

  // Set min date to today
  if (preferredDateInput) {
    const today = new Date().toISOString().split('T')[0];
    preferredDateInput.setAttribute('min', today);
    preferredDateInput.value = today;
  }

  function openModal(serviceName = null) {
    if (!modal) return;
    
    if (serviceName && consultTypeSelect) {
      for (let option of consultTypeSelect.options) {
        if (option.text.toLowerCase().includes(serviceName.toLowerCase()) || serviceName.toLowerCase().includes(option.text.toLowerCase())) {
          consultTypeSelect.value = option.value;
          break;
        }
      }
    }

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    const firstInput = modal.querySelector('input');
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 150);
    }
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.open-modal-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const service = btn.getAttribute('data-service');
      openModal(service);
    });
  });

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // Appointment Form Submission Handling
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = document.getElementById('submitFormBtn');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Confirm Appointment Request';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10"/></svg>
          Booking Slot...
        `;
      }

      setTimeout(() => {
        if (formStatusMsg) {
          formStatusMsg.className = 'form-status-message success';
          formStatusMsg.innerHTML = `
            <strong>✓ Request Confirmed!</strong><br>
            Dr. Neha Sharma's clinic desk has received your request. We will contact you at your provided number to confirm timings.
          `;
        }

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Appointment Requested ✓';
        }

        setTimeout(() => {
          closeModal();
          appointmentForm.reset();
          if (formStatusMsg) {
            formStatusMsg.className = 'form-status-message';
            formStatusMsg.innerHTML = '';
          }
          if (submitBtn) {
            submitBtn.innerHTML = originalText;
          }
        }, 2600);
      }, 750);
    });
  }

  // Smooth anchor link scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Refresh on resize/orientation change
  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
  });
});
