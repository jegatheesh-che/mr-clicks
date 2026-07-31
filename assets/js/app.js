/* 
  Mr Clicks Photography - Vanilla JavaScript & GSAP Looping Engine
*/

// --- DATA ARRAYS ---
const TESTIMONIALS_DATA = [
  {
    author: "Sonja & Yossi",
    title: "There Are No Words! Mithun, You Rock!",
    quote: "You just got us. You completely nailed the vibe we were going for and made us feel so comfortable in front of the camera. We had so much fun laughing with you all day. The photos are just, WOW! Absolutely incredible."
  },
  {
    author: "Ayeh & Calvin",
    title: "Gentle Butterfly Who Simply Didn't Miss A Moment",
    quote: "As a wedding photographer myself, everyone's question was 'who is your wedding photographer'... It was an easy answer, the incredible Mithun at Mr Clicks. The guy with the rare sensitive eyes, the big smile and great energy. He gave me so much more than what I ever expected."
  },
  {
    author: "Verena & Patrick",
    title: "One Of The First & Best Decisions We Made!",
    quote: "The entire process from beginning to end was relaxing and required very little input from our side with unbelievable output from your side. I was worried that I wouldn't look natural on the pictures but you made both Patrick and I feel so comfortable during both sessions."
  },
  {
    author: "Robyn & Mike",
    title: "Mithun, You Have Left Us Speechless!",
    quote: "I can't imagine anyone else who would have been better suited to capture our special moments on such a special day! You were calm and relaxed and made us feel comfortable. Most importantly, you captured the most natural moments, which is exactly what we wanted."
  },
  {
    author: "Cara & Mandla",
    title: "Mithun Is Just So Incredible!",
    quote: "She made two awkward people feel so comfortable in front of the camera and in turn we have the most beautiful images celebrating two huge milestones; our engagement and wedding. She’s also always willing and open to experimenting!"
  },
  {
    author: "Karina & Jon",
    title: "An Amazing Photographer & Wonderful Person",
    quote: "Thank you so much for being part of our wedding and capturing these precious moments that we will never forget. You did an amazing job, and I still love looking back at our photos. You made everything so easy for us."
  }
];

const FAQ_DATA = [
  {
    id: 1,
    question: "1. How many weddings have you shot?",
    answer: "I have been shooting weddings since 2013 and honestly stopped counting after 250! You can rest assured that I have seen EVERYTHING when it comes to weddings and I have a story or two that would tickle you pink!"
  },
  {
    id: 2,
    question: "2. Do you travel for weddings?",
    answer: "YES! I absolutely love traveling for weddings. If you are planning a destination wedding please give me a shout as I have a special collection just for you. No need to worry about travel etc as it's all inclusive. If your wedding is over an hour away from my base in Brighton then there will be travel costs added."
  },
  {
    id: 3,
    question: "3. Should I book a second shooter?",
    answer: "I like to work alone but should you need me for 10 hours or have a huge wedding party then I generally suggest an associate shooter. I can add this to your quote seamlessly."
  },
  {
    id: 4,
    question: "4. Can we see a full gallery of a wedding?",
    answer: "Of course! You can click over to our Stories section to view complete wedding day coverage galleries from start to finish."
  },
  {
    id: 5,
    question: "5. Do you need a shot list?",
    answer: "Please no! I do my best work when I am simply blending in and watching your day unfold. The more time I spend ticking off a rigid list, the less time I get to capture REAL, spontaneous moments."
  },
  {
    id: 6,
    question: "6. How long before we get our pics?",
    answer: "Generally I like to deliver my galleries no later than 4-6 weeks after your wedding. In the busy season this can go up to 8 weeks maximum. You get a gorgeous brag album within 48 hours of your wedding!"
  },
  {
    id: 7,
    question: "7. Do you have liability insurance?",
    answer: "Yes, I carry full liability insurance, and I can provide a certificate of insurance to your venue whenever needed."
  },
  {
    id: 8,
    question: "8. Do you offer film?",
    answer: "Yes! This is something we can chat about. I shoot on a classic Nikon FE and absolutely LOVE Kodak Gold 200 film!"
  }
];

const PROCESS_STEPS_DATA = [
  {
    num: "01",
    title: "Get In Touch",
    desc: "Shoot me a message via my contact form telling me all about the who, what, where and your wedding vision."
  },
  {
    num: "02",
    title: "Face-to-Face Chat",
    desc: "We meet up for coffee or a video chat to get to know each other and make sure our vibes match."
  },
  {
    num: "03",
    title: "Booking Details",
    desc: "You receive your private client portal link with simple instructions to lock in your date."
  },
  {
    num: "04",
    title: "Shoot Day!",
    desc: "I turn up and do what I do best—blending into the background and capturing all the magic."
  },
  {
    num: "05",
    title: "48-Hour Teaser",
    desc: "Within 48 hours of your shoot, you'll receive a delicious brag album to relive the high."
  },
  {
    num: "06",
    title: "Full Gallery Delivery",
    desc: "Your complete private high-resolution download gallery arrives, yours to cherish for a lifetime."
  }
];

const PORTFOLIO_IMAGES_DATA = [
  {
    url: "assets/images/img15.webp",
    category: "weddings",
    title: "Brighton Coastal Romance"
  },
  {
    url: "assets/images/img16.webp",
    category: "weddings",
    title: "Cinematic Sunset Moments"
  },
  {
    url: "assets/images/img17.webp",
    category: "lifestyle",
    title: "Editorial Portraiture"
  },
  {
    url: "assets/images/img18.webp",
    category: "branding",
    title: "Fempreneur Branding"
  },
  {
    url: "assets/images/img19.webp",
    category: "weddings",
    title: "Unpolished Love Stories"
  },
  {
    url: "assets/images/img20.webp",
    category: "lifestyle",
    title: "Maternity & Family"
  },
  {
    url: "assets/images/img21.webp",
    category: "weddings",
    title: "Intimate Celebrations"
  },
  {
    url: "assets/images/img22.webp",
    category: "branding",
    title: "Personal Brand Portrait"
  },
  {
    url: "assets/images/img23.webp",
    category: "weddings",
    title: "Confetti & Joy"
  },
  {
    url: "assets/images/img52.webp",
    category: "weddings",
    title: "Golden Hour Glow"
  },
  {
    url: "assets/images/img54.webp",
    category: "stories",
    title: "Candid Moments"
  },
  {
    url: "assets/images/img58.webp",
    category: "weddings",
    title: "Joyous Moments"
  },
  {
    url: "assets/images/img63.webp",
    category: "branding",
    title: "Modern Lifestyle"
  },
  {
    url: "assets/images/img68.webp",
    category: "lifestyle",
    title: "Atmospheric Expressions"
  },
  {
    url: "assets/images/img72.webp",
    category: "weddings",
    title: "Timeless Romance"
  }
];

// --- LOOPING ENGINE FUNCTIONS ---

let currentTestimonialIndex = 0;

function renderTestimonials() {
  const container = document.getElementById('testimonial-container');
  const dotsContainer = document.getElementById('slider-dots');
  if (!container) return;

  const current = TESTIMONIALS_DATA[currentTestimonialIndex];
  
  // Fade out transition
  const cardWrap = container.querySelector('.testimonial-card-wrap');
  if (cardWrap) {
    cardWrap.classList.add('fade-out');
  }

  setTimeout(() => {
    container.innerHTML = `
      <div class="testimonial-card-wrap">
        <h3 class="testimonial-title">${current.title}</h3>
        <p class="testimonial-quote">“${current.quote}”</p>
        <div class="testimonial-author-wrap">
          <span class="testimonial-author-name">${current.author}</span>
        </div>
      </div>
    `;

    if (dotsContainer) {
      dotsContainer.innerHTML = TESTIMONIALS_DATA.map((_, idx) => 
        `<span class="dot ${idx === currentTestimonialIndex ? 'active' : ''}" onclick="goToTestimonial(${idx})"></span>`
      ).join('');
    }
  }, cardWrap ? 400 : 0);
}

function nextTestimonial() {
  currentTestimonialIndex = (currentTestimonialIndex + 1) % TESTIMONIALS_DATA.length;
  renderTestimonials();
}

function prevTestimonial() {
  currentTestimonialIndex = (currentTestimonialIndex - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length;
  renderTestimonials();
}

function goToTestimonial(index) {
  currentTestimonialIndex = index;
  renderTestimonials();
}

function renderFAQs() {
  const container = document.getElementById('faq-container');
  if (!container) return;

  container.innerHTML = FAQ_DATA.map(item => `
    <div class="faq-item" id="faq-${item.id}">
      <div class="faq-header" onclick="toggleFAQ(${item.id})">
        <h3 class="faq-question">${item.question}</h3>
        <span class="faq-icon">+</span>
      </div>
      <div class="faq-body">
        <div class="faq-content">
          <p>${item.answer}</p>
        </div>
      </div>
    </div>
  `).join('');
}

function toggleFAQ(id) {
  const item = document.getElementById(`faq-${id}`);
  if (!item) return;

  const isActive = item.classList.contains('active');

  document.querySelectorAll('.faq-item').forEach(el => {
    el.classList.remove('active');
    const body = el.querySelector('.faq-body');
    if (body) body.style.maxHeight = null;
  });

  if (!isActive) {
    item.classList.add('active');
    const body = item.querySelector('.faq-body');
    if (body) body.style.maxHeight = body.scrollHeight + "px";
  }
}

function renderProcessSteps() {
  const container = document.getElementById('process-container');
  if (!container) return;

  container.innerHTML = PROCESS_STEPS_DATA.map(step => `
    <div class="process-step">
      <div class="step-number">${step.num}</div>
      <h3 class="step-title">${step.title}</h3>
      <p class="step-desc">${step.desc}</p>
    </div>
  `).join('');
}

function renderPortfolio(filter = 'all') {
  const container = document.getElementById('portfolio-grid');
  if (!container) return;

  const filteredItems = filter === 'all' 
    ? PORTFOLIO_IMAGES_DATA 
    : PORTFOLIO_IMAGES_DATA.filter(item => item.category === filter);

  container.innerHTML = filteredItems.map(item => `
    <div class="portfolio-item" onclick="openLightbox('${item.url}')">
      <img src="${item.url}" alt="${item.title}" loading="lazy" />
      <div class="portfolio-overlay">
        <h4 style="font-family: var(--font-title); letter-spacing: 0.1em;">${item.title}</h4>
        <span class="script-subheading" style="color: var(--color-cream-bg); font-size: 0.9rem;">View Image</span>
      </div>
    </div>
  `).join('');
}

function filterPortfolio(category, btnElement) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');
  renderPortfolio(category);
}

function openLightbox(imageUrl) {
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  if (modal && modalImg) {
    modalImg.src = imageUrl;
    modal.classList.add('active');
  }
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  if (modal) {
    modal.classList.remove('active');
  }
}

// --- INITIALIZATION LISTENERS ---
document.addEventListener('DOMContentLoaded', () => {
  // Sticky Navbar Scroll Listener
  const header = document.querySelector('.header-bar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // Mobile Drawer Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileOverlay = document.getElementById('mobile-overlay');

  mobileToggle?.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    mobileOverlay?.classList.toggle('active');
  });

  // Close Mobile Overlay on Link Click
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle?.classList.remove('active');
      mobileOverlay?.classList.remove('active');
    });
  });

  // Back To Top Trigger (All Pages)
  document.querySelectorAll('.back-to-top').forEach(btn => {
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Dynamic Footer Year
  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Execute Array Loops
  renderTestimonials();
  renderFAQs();
  renderProcessSteps();
  renderPortfolio();

  // Auto slide testimonials every 7 seconds
  setInterval(() => {
    nextTestimonial();
  }, 7000);

  // Premium Hero Canvas Slideshow (2.5s Interval)
  const heroSliderImages = [
    "assets/images/img12.webp",
    "assets/images/img20.webp",
    "assets/images/img23.webp",
    "assets/images/img29.webp",
    "assets/images/img4.webp"
  ];

  const heroSlides = document.querySelectorAll('.hero-slide');
  if (heroSlides.length >= 2) {
    let currentHeroImageIndex = 0;
    let activeSlideDivIndex = 0;
    
    // Set initial background image
    heroSlides[0].style.backgroundImage = `url('${heroSliderImages[0]}')`;

    setInterval(() => {
      currentHeroImageIndex = (currentHeroImageIndex + 1) % heroSliderImages.length;
      const nextSlideDivIndex = (activeSlideDivIndex + 1) % 2;
      
      heroSlides[nextSlideDivIndex].style.backgroundImage = `url('${heroSliderImages[currentHeroImageIndex]}')`;
      heroSlides[nextSlideDivIndex].classList.add('active');
      heroSlides[activeSlideDivIndex].classList.remove('active');
      
      activeSlideDivIndex = nextSlideDivIndex;
    }, 2500);
  }

  // Reveal Animations (Intro section B&W to color, curtain reveal, side reveal, secret cards)
  const revealElements = document.querySelectorAll('.reveal-wrapper, .curtain-reveal-wrapper, .side-reveal-wrapper, .secret-card');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    revealElements.forEach(el => revealObserver.observe(el));
  }

  // Floating Cursor Image Preview for Secrets Grid (Option 3 — 60fps Hardware Accelerated)
  const secretCards = document.querySelectorAll('.secret-card');
  const secretPreview = document.getElementById('secret-cursor-preview');
  const secretPreviewImg = document.getElementById('secret-cursor-preview-img');

  if (secretCards.length > 0 && secretPreview && secretPreviewImg && window.innerWidth > 992) {
    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;
    let isHoveringCard = false;
    let rafId = null;

    // Preload images into memory for zero network latency
    secretCards.forEach(card => {
      const src = card.getAttribute('data-preview-img');
      if (src) {
        const img = new Image();
        img.src = src;
      }
    });

    const updatePosition = () => {
      if (isHoveringCard) {
        currentX += (mouseX - currentX) * 0.2;
        currentY += (mouseY - currentY) * 0.2;
        secretPreview.style.transform = `translate3d(${currentX - 110}px, ${currentY - 145}px, 0) scale(1)`;
        rafId = requestAnimationFrame(updatePosition);
      }
    };

    secretCards.forEach(card => {
      card.addEventListener('mouseenter', (e) => {
        const imgSrc = card.getAttribute('data-preview-img');
        if (imgSrc) {
          secretPreviewImg.src = imgSrc;
          isHoveringCard = true;
          mouseX = e.clientX;
          mouseY = e.clientY;
          currentX = mouseX;
          currentY = mouseY;
          secretPreview.style.transform = `translate3d(${currentX - 110}px, ${currentY - 145}px, 0) scale(0.85)`;
          secretPreview.classList.add('is-active');
          if (rafId) cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(updatePosition);
        }
      });

      card.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      });

      card.addEventListener('mouseleave', () => {
        isHoveringCard = false;
        secretPreview.classList.remove('is-active');
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      });
    });
  }

  // ============================================================
  // CUSTOM CURSOR — Site-wide Desktop Implementation
  // ============================================================
  if (window.innerWidth > 768) {
    let cursor = document.getElementById('mc-cursor');
    let cursorDot = document.getElementById('mc-cursor-dot');

    if (!cursor) {
      cursor = document.createElement('div');
      cursor.id = 'mc-cursor';
      cursor.className = 'mc-cursor';
      cursor.setAttribute('aria-hidden', 'true');
      document.body.appendChild(cursor);
    }

    if (!cursorDot) {
      cursorDot = document.createElement('div');
      cursorDot.id = 'mc-cursor-dot';
      cursorDot.className = 'mc-cursor-dot';
      cursorDot.setAttribute('aria-hidden', 'true');
      document.body.appendChild(cursorDot);
    }

    let hasMoved = false;
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const cursorPos = { x: mouse.x, y: mouse.y };
    const dotPos = { x: mouse.x, y: mouse.y };

    window.addEventListener('mousemove', e => {
      if (!hasMoved) {
        hasMoved = true;
        cursor.style.opacity = '1';
        cursorDot.style.opacity = '1';
      }
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    // Smooth GSAP Ticker Tracking (Responsive lerp values)
    if (typeof gsap !== 'undefined') {
      gsap.ticker.add(() => {
        cursorPos.x += (mouse.x - cursorPos.x) * 0.22;
        cursorPos.y += (mouse.y - cursorPos.y) * 0.22;
        gsap.set(cursor, { x: cursorPos.x, y: cursorPos.y });

        dotPos.x += (mouse.x - dotPos.x) * 0.85;
        dotPos.y += (mouse.y - dotPos.y) * 0.85;
        gsap.set(cursorDot, { x: dotPos.x, y: dotPos.y });
      });
    }

    // Global Event Delegation for hover scaling on all interactive elements
    document.addEventListener('mouseover', e => {
      const target = e.target.closest('a, button, input, textarea, select, .insta-grid-item, .portfolio-item, .service-card, .faq-header');
      if (target) {
        cursor.classList.add('cursor-hover');
      } else {
        cursor.classList.remove('cursor-hover');
      }
    });
  }

  // ============================================================
  // GSAP ANIMATIONS
  // ============================================================
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    document.fonts.ready.then(() => { ScrollTrigger.refresh(); });
    window.addEventListener('load', () => { ScrollTrigger.refresh(); });
    setTimeout(() => { ScrollTrigger.refresh(); }, 1000);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.globalTimeline.timeScale(5);
    }

    // ----------------------------------------------------------
    // SECTION 3: SPOTLIGHT CURSOR REVEAL
    // ----------------------------------------------------------
    const spotlightSection = document.getElementById('spotlight-section');
    const spotlightMask = document.getElementById('spotlight-mask');

    if (spotlightSection && spotlightMask) {

      gsap.to('.spotlight-bg-img', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: spotlightSection,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

      gsap.to('.spotlight-bg-img img', {
        scale: 1.08,
        duration: 7,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      });

      spotlightSection.addEventListener('mousemove', e => {
        const rect = spotlightSection.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        gsap.to(spotlightMask, {
          '--mx': `${x}px`,
          '--my': `${y}px`,
          duration: 0.15,
          ease: 'power2.out',
          overwrite: 'auto'
        });

        if (!spotlightSection.classList.contains('cursor-moved')) {
          spotlightSection.classList.add('cursor-moved');
        }
      });

      ScrollTrigger.create({
        trigger: spotlightSection,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          spotlightSection.classList.add('is-revealed');
        }
      });
    }

    // ----------------------------------------------------------
    // MAGNETIC BUTTON — Plan 5 (desktop only)
    // ----------------------------------------------------------
    if (window.innerWidth > 768) {
      document.querySelectorAll('.magnetic-btn').forEach(btn => {
        const strength = 0.35;

        btn.addEventListener('mousemove', e => {
          const rect = btn.getBoundingClientRect();
          const relX = e.clientX - rect.left - rect.width / 2;
          const relY = e.clientY - rect.top - rect.height / 2;

          gsap.to(btn, { x: relX * strength, y: relY * strength, duration: 0.5, ease: 'power2.out' });
          const txt = btn.querySelector('.magnetic-btn-text');
          if (txt) gsap.to(txt, { x: relX * strength * 0.4, y: relY * strength * 0.4, duration: 0.5, ease: 'power2.out' });
        });

        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'power2.out' });
          const txt = btn.querySelector('.magnetic-btn-text');
          if (txt) gsap.to(txt, { x: 0, y: 0, duration: 0.7, ease: 'power2.out' });
        });
      });
    }

    // ----------------------------------------------------------
    // SECTION 4: TESTIMONIAL STAGGER REVEALS
    // ----------------------------------------------------------
    const testimonialRevealEls = [
      '.testimonial-title-reveal',
      '.testimonial-card-reveal',
      '.testimonial-controls-reveal'
    ];

    testimonialRevealEls.forEach((selector, i) => {
      const el = document.querySelector(selector);
      if (!el) return;
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        delay: i * 0.1,
        scrollTrigger: {
          trigger: '#testimonials-section',
          start: 'top 90%',
          once: true
        }
      });
    });

    // ----------------------------------------------------------
    // SECTION 5: CLIP-PATH SCATTER REVEAL + MAGNETIC DRIFT GRID
    // ----------------------------------------------------------
    const instaSection = document.getElementById('insta-section');
    const instaGrid   = document.getElementById('insta-grid');
    const instaItems  = instaGrid ? gsap.utils.toArray('.insta-grid-item') : [];

    if (instaSection && instaGrid && instaItems.length) {

      const revealTL = gsap.timeline({
        paused: true,
        defaults: { ease: 'power3.out' }
      });

      // 1. Title glides up and in
      revealTL.to('.insta-title-reveal', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out'
      });

      // 2. Images: reveal IN PARALLEL with title
      instaItems.forEach((item, i) => {
        const img     = item.querySelector('img');
        const stagger = i * 0.05;

        revealTL.to(item, {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 0.85,
          ease: 'power3.inOut',
        }, `<${stagger}`);

        if (img) {
          revealTL.to(img, {
            scale: 1,
            duration: 0.95,
            ease: 'power2.out',
          }, `<`);
        }
      });

      ScrollTrigger.create({
        trigger: instaSection,
        start: 'top 92%',
        once: true,
        onEnter: () => revealTL.play()
      });


      // ── PLAN 1: gsap.ticker-based magnetic drift ─────────────────
      if (window.innerWidth > 768) {
        // Per-tile state: target + current positions, plus individual lerp speed
        const lerpSpeeds = [0.055, 0.07, 0.045, 0.065, 0.05, 0.075]; // varies per tile
        const tileState  = instaItems.map((item, i) => ({
          tx: 0, ty: 0,   // target
          cx: 0, cy: 0,   // current (lerped)
          lerpSpeed: lerpSpeeds[i] || 0.06
        }));

        let isHoveringGrid = false;

        instaGrid.addEventListener('mouseenter', () => { isHoveringGrid = true; });
        instaGrid.addEventListener('mouseleave', () => {
          isHoveringGrid = false;
          // Reset targets to 0 — ticker will smoothly lerp back
          tileState.forEach(s => { s.tx = 0; s.ty = 0; });
        });

        instaGrid.addEventListener('mousemove', e => {
          const rect  = instaGrid.getBoundingClientRect();
          const normX = ((e.clientX - rect.left)  / rect.width  - 0.5) * 2; // -1 → +1
          const normY = ((e.clientY - rect.top)   / rect.height - 0.5) * 2;

          instaItems.forEach((item, i) => {
            const drift = parseFloat(item.dataset.drift || '1.0');
            // Alternate even/odd tiles in opposing directions for depth illusion
            const dir   = i % 2 === 0 ? 1 : -1;
            tileState[i].tx = normX * drift * dir * 16;
            tileState[i].ty = normY * drift * dir * 11;
          });
        });

        // The ticker: runs 60fps, lerps each tile's current position toward target
        // This is the key that makes it feel like fluid motion graphics, not events
        gsap.ticker.add(() => {
          instaItems.forEach((item, i) => {
            const s = tileState[i];
            s.cx += (s.tx - s.cx) * s.lerpSpeed;
            s.cy += (s.ty - s.cy) * s.lerpSpeed;
            // Only write to DOM if movement is meaningful (> 0.01px) — perf guard
            if (Math.abs(s.cx) > 0.01 || Math.abs(s.cy) > 0.01 || s.tx === 0) {
              gsap.set(item, { x: s.cx, y: s.cy });
            }
          });
        });
      }
    }
  }
});
