/* ═══════════════════════════════════════════════════════════════════════
   BACKOFFICE AGENCY — Animations & Interactivity
   ═══════════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar Scroll Effect ──────────────────────────────────────────
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  const handleScroll = () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Check on load


  // ── Mobile Menu ───────────────────────────────────────────────────
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
      });
    });
  }


  // ── Scroll-Triggered Fade-Up Animations ───────────────────────────
  const fadeElements = document.querySelectorAll('.fade-up');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => fadeObserver.observe(el));


  // ── Counter Animation ─────────────────────────────────────────────
  const counters = document.querySelectorAll('[data-target]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        animateCounter(entry.target, target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  function animateCounter(element, target) {
    const duration = 2000;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;

    const easeOutQuart = t => 1 - Math.pow(1 - t, 4);

    const counter = setInterval(() => {
      frame++;
      const progress = easeOutQuart(frame / totalFrames);
      const current = Math.round(target * progress);

      element.textContent = current.toLocaleString();

      if (frame === totalFrames) {
        element.textContent = target.toLocaleString();
        clearInterval(counter);
      }
    }, frameDuration);
  }


  // ── FAQ Accordion ─────────────────────────────────────────────────
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all others
      faqItems.forEach(other => other.classList.remove('active'));

      // Toggle clicked
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });


  // ── Smooth Scroll for Anchor Links ────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const offset = 80; // navbar height
        const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });


  // ── 3D Tilt Effect on Department Cards ────────────────────────────
  const tiltCards = document.querySelectorAll('[data-tilt]');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      card.style.transition = 'transform 0.6s cubic-bezier(0.19, 1, 0.22, 1)';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease-out';
    });
  });


  // ── Parallax Effect on Gradient Orbs ──────────────────────────────
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        document.querySelectorAll('.gradient-orb').forEach((orb, i) => {
          const speed = 0.03 + (i * 0.015);
          orb.style.transform = `translateY(${scrollY * speed}px)`;
        });

        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });


  // ── Magnetic Button Effect ────────────────────────────────────────
  document.querySelectorAll('.btn-primary, .btn-outline').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) translateY(-1px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.transition = 'all 0.4s cubic-bezier(0.19, 1, 0.22, 1)';
    });

    btn.addEventListener('mouseenter', () => {
      btn.style.transition = 'all 0.1s ease-out';
    });
  });


  // ── Typed Text Effect for Hero (subtle) ───────────────────────────
  // Adds a blinking cursor effect to the gradient text
  const gradientText = document.querySelector('.hero-headline .gradient-text');
  if (gradientText) {
    gradientText.style.borderRight = '2px solid rgba(99,91,255,0.6)';
    gradientText.style.paddingRight = '4px';

    // Remove cursor after a delay
    setTimeout(() => {
      gradientText.style.transition = 'border-color 0.5s';
      gradientText.style.borderColor = 'transparent';
      setTimeout(() => {
        gradientText.style.borderRight = 'none';
        gradientText.style.paddingRight = '0';
      }, 500);
    }, 3000);
  }


  // ── Staggered Grid Animation ──────────────────────────────────────
  const gridCards = document.querySelectorAll('.departments-grid .dept-card');
  const gridObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered delay based on position
        const cardIndex = Array.from(gridCards).indexOf(entry.target);
        entry.target.style.transitionDelay = `${cardIndex * 0.08}s`;
        entry.target.classList.add('visible');
        gridObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  gridCards.forEach(card => gridObserver.observe(card));


  // ── Glow Follow Effect on Pricing Card ────────────────────────────
  const pricingCard = document.querySelector('.pricing-card');
  if (pricingCard) {
    pricingCard.addEventListener('mousemove', (e) => {
      const rect = pricingCard.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      pricingCard.style.setProperty('--mouse-x', `${x}%`);
      pricingCard.style.setProperty('--mouse-y', `${y}%`);

      const glow = pricingCard.querySelector('.pricing-card-glow');
      if (glow) {
        glow.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(99,91,255,0.12) 0%, transparent 50%)`;
      }
    });
  }


  // ── Reveal Animation for Stats ────────────────────────────────────
  const statCards = document.querySelectorAll('.stat-card');
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = Array.from(statCards).indexOf(entry.target);
        entry.target.style.transitionDelay = `${index * 0.1}s`;
        entry.target.classList.add('visible');
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  statCards.forEach(card => statObserver.observe(card));

});


