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
    quote: "He made two awkward people feel so comfortable in front of the camera and in turn we have the most beautiful images celebrating two huge milestones; our engagement and wedding. He’s also always willing and open to experimenting!"
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

window.PORTFOLIO_IMAGES_DATA = [
  // Weddings
  { url: "assets/images/img15.webp", category: "weddings", title: "Brighton Coastal Romance" },
  { url: "assets/images/img16.webp", category: "weddings", title: "Cinematic Sunset Moments" },
  { url: "assets/images/img19.webp", category: "weddings", title: "Unpolished Love Stories" },
  { url: "assets/images/img21.webp", category: "weddings", title: "Intimate Celebrations" },
  { url: "assets/images/img23.webp", category: "weddings", title: "Confetti & Joy" },
  { url: "assets/images/img52.webp", category: "weddings", title: "Golden Hour Glow" },
  { url: "assets/images/img58.webp", category: "weddings", title: "Joyous Traditions" },
  { url: "assets/images/img72.webp", category: "weddings", title: "Timeless Romance" },
  { url: "assets/images/img12.webp", category: "weddings", title: "Autumn Canopy Vows" },
  { url: "assets/images/img30.webp", category: "weddings", title: "Midnight Sparklers" },

  // Stories (Full Day Narrative / Editorial)
  { url: "assets/images/img54.webp", category: "stories", title: "Cultural Elegance & Heritage" },
  { url: "assets/images/img29.webp", category: "stories", title: "Serengeti Whispers" },
  { url: "assets/images/img32.webp", category: "stories", title: "City Promenade in Newcastle" },
  { url: "assets/images/img51.webp", category: "stories", title: "Monument Flight & Pigeons" },
  { url: "assets/images/img57.webp", category: "stories", title: "Academic Triumph & Pride" },
  { url: "assets/images/img2.webp",  category: "stories", title: "The Quiet Before The Vows" },
  { url: "assets/images/img3.webp",  category: "stories", title: "Silk, Henna & Stolen Gazes" },

  // Lifestyle (Family, Maternity, Portraits)
  { url: "assets/images/img17.webp", category: "lifestyle", title: "Editorial Portraiture" },
  { url: "assets/images/img20.webp", category: "lifestyle", title: "Maternity & Family" },
  { url: "assets/images/img4.webp",  category: "lifestyle", title: "Gentle Whispers" },
  { url: "assets/images/img68.webp", category: "lifestyle", title: "Atmospheric Expressions" },
  { url: "assets/images/img28.webp", category: "lifestyle", title: "Autumn Woods Portrait" },
  { url: "assets/images/img14.webp", category: "lifestyle", title: "Sweet Newborn Dreams" },
  { url: "assets/images/img31.webp", category: "lifestyle", title: "Bokeh City Lights" },

  // Personal Branding
  { url: "assets/images/img18.webp", category: "branding", title: "Fempreneur Creative Vision" },
  { url: "assets/images/img22.webp", category: "branding", title: "Personal Brand Portrait" },
  { url: "assets/images/img63.webp", category: "branding", title: "Modern Professional Lifestyle" },
  { url: "assets/images/img51.webp", category: "branding", title: "Visual Storyteller on Location" },
  { url: "assets/images/img57.webp", category: "branding", title: "Creative Academic Portrait" },
  { url: "assets/images/img32.webp", category: "branding", title: "Contemporary Artist Profile" }
];

// --- LOOPING ENGINE FUNCTIONS ---

let currentTestimonialIndex = 0;
let testimonialAutoTimer = null;

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
          <span class="testimonial-author-name">— ${current.author}</span>
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
    ? window.PORTFOLIO_IMAGES_DATA 
    : window.PORTFOLIO_IMAGES_DATA.filter(item => item.category === filter);

  container.innerHTML = filteredItems.map(item => `
    <div class="portfolio-item" onclick="openLightbox('${item.url}')">
      <img src="${item.url}" alt="${item.title}" loading="lazy" />
      <div class="portfolio-overlay">
        <h4 style="font-family: var(--font-title); letter-spacing: 0.1em; font-size: 1.1rem; margin-bottom: 0.35rem;">${item.title}</h4>
        <span class="script-subheading" style="color: var(--color-sand-accent); font-size: 1.05rem;">View Image</span>
      </div>
    </div>
  `).join('');
}

function filterPortfolio(category, btnElement) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (btnElement) {
    btnElement.classList.add('active');
  } else {
    const matchedBtn = Array.from(document.querySelectorAll('.filter-btn'))
      .find(b => b.textContent.toLowerCase().includes(category));
    if (matchedBtn) matchedBtn.classList.add('active');
  }
  renderPortfolio(category);
}

function openLightbox(imageUrl) {
  let modal = document.getElementById('lightbox-modal');
  let modalImg = document.getElementById('lightbox-img');
  
  // Create dynamically if not already on page (e.g., on about.html)
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'lightbox-modal';
    modal.id = 'lightbox-modal';
    modal.onclick = closeLightbox;
    modal.innerHTML = `
      <span class="lightbox-close" onclick="closeLightbox()">&times;</span>
      <img src="${imageUrl}" alt="Enlarged View" class="lightbox-content" id="lightbox-img" onclick="event.stopPropagation();">
    `;
    document.body.appendChild(modal);
    modalImg = document.getElementById('lightbox-img');
  }

  if (modal && modalImg) {
    modalImg.src = imageUrl;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Contact Form Handler with Luxury Animated Feedback
function handleContactSubmit(e) {
  if (e) e.preventDefault();
  const form = document.getElementById('contact-form');
  const wrapper = document.querySelector('.contact-wrapper');
  if (!form || !wrapper) return false;

  const firstName = document.getElementById('first-name')?.value || 'Friend';

  // Smooth fade out form and show luxury confirmation card
  form.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  form.style.opacity = '0';
  form.style.transform = 'translateY(-15px)';

  setTimeout(() => {
    wrapper.innerHTML = `
      <div class="contact-success-card" id="contact-success-card">
        <div class="success-icon-wrap">
          <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
        </div>
        <span class="script-subheading" style="color: var(--color-earth-dark); font-size: 1.6rem;">Thank you, ${firstName}!</span>
        <h3 class="title-main" style="font-size: 2rem; margin: 0.5rem 0 1rem 0;">Your Story Has Been Received</h3>
        <p class="body-text" style="max-width: 540px; margin: 0 auto 2rem auto; color: #4A3C2C;">
          I'm so thrilled to connect with you. I will review all the details and get back to you with availability and collection info within <strong>24 to 48 hours</strong>.
        </p>
        <a href="index.html" class="btn-outline" style="border-color: var(--color-earth-dark); color: var(--color-earth-dark);">Back To Home</a>
      </div>
    `;

    const successCard = document.getElementById('contact-success-card');
    if (successCard && typeof gsap !== 'undefined') {
      gsap.fromTo(successCard, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
    }
  }, 400);

  return false;
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
  document.querySelectorAll('[id^="footer-year"]').forEach(yearEl => {
    yearEl.textContent = new Date().getFullYear();
  });

  // Execute Array Loops
  renderTestimonials();
  renderFAQs();
  renderProcessSteps();
  renderPortfolio();

  // Testimonials Auto Slide with Pause on Hover / Touch
  const testimonialSection = document.getElementById('testimonials-section') || document.querySelector('.luxury-testimonial-section');
  function startTestimonialTimer() {
    if (!testimonialAutoTimer) {
      testimonialAutoTimer = setInterval(() => {
        nextTestimonial();
      }, 7000);
    }
  }
  function stopTestimonialTimer() {
    if (testimonialAutoTimer) {
      clearInterval(testimonialAutoTimer);
      testimonialAutoTimer = null;
    }
  }

  startTestimonialTimer();
  if (testimonialSection) {
    testimonialSection.addEventListener('mouseenter', stopTestimonialTimer);
    testimonialSection.addEventListener('mouseleave', startTestimonialTimer);
    testimonialSection.addEventListener('touchstart', stopTestimonialTimer, { passive: true });
    testimonialSection.addEventListener('touchend', startTestimonialTimer, { passive: true });
  }

  // Lightbox Triggers for About Page and Static Gallery Images
  document.querySelectorAll('.lightbox-trigger, .side-reveal-wrapper').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img && img.src) {
        openLightbox(img.src);
      }
    });
    item.style.cursor = 'pointer';
  });

  // Contact Form submit listener attachment
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
  }

  // ============================================================
  // HOME PAGE — 3D CoverFlow Frame with Center Image Slide Transition
  // ============================================================
  const heroGallery = document.getElementById('hero-gallery');
  const heroCardsContainer = document.getElementById('hero-gallery-cards');
  const heroCards = heroCardsContainer ? Array.from(heroCardsContainer.querySelectorAll('.hero-card')) : [];
  const ambientGlow = document.getElementById('hero-ambient-glow');

  if (heroGallery && heroCards.length) {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Staggered reveal on load
    if (!prefersReduced) {
      const cardObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            heroCards.forEach(card => card.classList.add('is-visible'));
            obs.disconnect();
          }
        });
      }, { threshold: 0.1 });
      cardObserver.observe(heroGallery);
    } else {
      heroCards.forEach(card => {
        card.style.opacity = '1';
        card.classList.add('is-visible');
      });
    }

    // ============================================================
    // AWWWARDS-LEVEL 3D COVERFLOW CAROUSEL
    // Every card physically glides through 3D space into the center spotlight!
    // ============================================================
    const activeCards = heroCards.slice(0, 5); // 5 unique physical 3D cards
    let centerIndex = 2; // Card 3 (index 2) starts in the center spotlight

    // Mood lighting glow colors & luxury captions mapped to each card's photo
    const cardMetaData = [
      { color: 'rgba(220, 60, 40, 0.45)',  caption: '01 / 05 &mdash; WEDDING PORTRAITS' },
      { color: 'rgba(160, 90, 220, 0.45)', colorName: 'purple', caption: '02 / 05 &mdash; CANDID BABY MOMENTS' },
      { color: 'rgba(215, 170, 110, 0.45)', caption: '03 / 05 &mdash; FAMILY STORYTELLING' },
      { color: 'rgba(190, 150, 100, 0.45)', caption: '04 / 05 &mdash; LIFESTYLE & NATURE' },
      { color: 'rgba(140, 175, 90, 0.45)',  caption: '05 / 05 &mdash; EDITORIAL WILDLIFE' }
    ];

    const cardCaptionEl = document.getElementById('hero-card-caption');

    // Function to rotate all cards in 3D space to bring newCenterIndex into the spotlight
    function render3DCoverFlow(newCenterIndex) {
      if (!activeCards.length) return;
      centerIndex = (newCenterIndex + activeCards.length) % activeCards.length;
      const isMobile = window.innerWidth <= 768;

      activeCards.forEach((card, index) => {
        // Calculate wrapped 3D offset relative to current centered card [-2, 2]
        let offset = index - centerIndex;
        if (offset > 2) offset -= 5;
        if (offset < -2) offset += 5;

        let transformStr = '';
        let zIndex = 1;
        let opacity = 1;

        if (offset === 0) {
          // Center Spotlight Position
          const tz = isMobile ? '70px' : '120px';
          const scale = isMobile ? '1.02' : '1.05';
          transformStr = `translateZ(${tz}) translateX(0) rotateY(0deg) scale(${scale})`;
          zIndex = 10;
          opacity = 1;
          card.classList.add('is-centered');
        } else {
          card.classList.remove('is-centered');
          if (offset === -1) {
            const tz = isMobile ? '-25px' : '-40px';
            const tx = isMobile ? '28%' : '35%';
            const rotY = isMobile ? '-35deg' : '-45deg';
            transformStr = `translateZ(${tz}) translateX(${tx}) rotateY(${rotY}) scale(0.92)`;
            zIndex = 5;
            opacity = 0.95;
          } else if (offset === 1) {
            const tz = isMobile ? '-25px' : '-40px';
            const tx = isMobile ? '-28%' : '-35%';
            const rotY = isMobile ? '35deg' : '45deg';
            transformStr = `translateZ(${tz}) translateX(${tx}) rotateY(${rotY}) scale(0.92)`;
            zIndex = 5;
            opacity = 0.95;
          } else if (offset === -2) {
            const tz = isMobile ? '-80px' : '-120px';
            const tx = isMobile ? '55%' : '70%';
            const rotY = isMobile ? '-35deg' : '-45deg';
            transformStr = `translateZ(${tz}) translateX(${tx}) rotateY(${rotY}) scale(0.82)`;
            zIndex = 2;
            opacity = 0.85;
          } else if (offset === 2) {
            const tz = isMobile ? '-80px' : '-120px';
            const tx = isMobile ? '-55%' : '-70%';
            const rotY = isMobile ? '35deg' : '45deg';
            transformStr = `translateZ(${tz}) translateX(${tx}) rotateY(${rotY}) scale(0.82)`;
            zIndex = 2;
            opacity = 0.85;
          }
        }

        card.style.zIndex = zIndex;

        // Buttery GSAP 3D motion physics (power4.out)
        if (typeof gsap !== 'undefined') {
          gsap.to(card, {
            transform: transformStr,
            opacity: opacity,
            duration: 0.85,
            ease: 'power4.out',
            overwrite: 'auto'
          });
        } else {
          card.style.transform = transformStr;
          card.style.opacity = opacity;
        }
      });

      // Update Dynamic Caption Text
      const activeMeta = cardMetaData[centerIndex] || cardMetaData[2];
      if (cardCaptionEl) {
        if (typeof gsap !== 'undefined') {
          gsap.to(cardCaptionEl, {
            opacity: 0,
            y: 4,
            duration: 0.25,
            onComplete: () => {
              cardCaptionEl.innerHTML = activeMeta.caption;
              gsap.to(cardCaptionEl, { opacity: 0.9, y: 0, duration: 0.35 });
            }
          });
        } else {
          cardCaptionEl.innerHTML = activeMeta.caption;
        }
      }

      // Morph Ambient Mood Lighting Glow
      if (ambientGlow) {
        const glowColor = activeMeta.color;
        if (typeof gsap !== 'undefined') {
          gsap.to(ambientGlow, {
            background: `radial-gradient(ellipse at center, ${glowColor} 0%, rgba(0, 0, 0, 0) 70%)`,
            duration: 0.85,
            ease: 'power2.out'
          });
        } else {
          ambientGlow.style.background = `radial-gradient(ellipse at center, ${glowColor} 0%, rgba(0, 0, 0, 0) 70%)`;
        }
      }
    }

    // Initial render of 3D CoverFlow ring
    render3DCoverFlow(centerIndex);

    // Auto-rotation interval: Smoothly brings EVERY card to center one by one every 3.5s
    let autoSlideTimer = null;
    function startAutoSlide() {
      if (prefersReduced || autoSlideTimer) return;
      autoSlideTimer = setInterval(() => {
        render3DCoverFlow(centerIndex + 1);
      }, 3500);
    }

    function stopAutoSlide() {
      if (autoSlideTimer) {
        clearInterval(autoSlideTimer);
        autoSlideTimer = null;
      }
    }

    // Start auto carousel on load
    startAutoSlide();

    // Pause on hover & resume on leave
    heroGallery.addEventListener('mouseenter', stopAutoSlide);
    heroGallery.addEventListener('mouseleave', startAutoSlide);

    // Clicking ANY card smoothly rotates it into the center spotlight!
    activeCards.forEach((card, index) => {
      card.addEventListener('click', () => {
        stopAutoSlide();
        render3DCoverFlow(index);
      });
    });

    // Wheel scrubbing rotates cards to center
    let wheelTimeout = null;
    heroGallery.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaX) > 10 || Math.abs(e.deltaY) > 15) {
        stopAutoSlide();
        if (wheelTimeout) return;
        const dir = (e.deltaX > 0 || e.deltaY > 0) ? 1 : -1;
        render3DCoverFlow(centerIndex + dir);
        wheelTimeout = setTimeout(() => { wheelTimeout = null; }, 350);
      }
    }, { passive: true });

    // Drag / Touch scrubbing rotates cards to center
    let startX = 0;
    let isDragging = false;

    heroCardsContainer.addEventListener('mousedown', (e) => {
      stopAutoSlide();
      isDragging = true;
      startX = e.clientX;
    });

    heroCardsContainer.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches.length > 0) {
        stopAutoSlide();
        isDragging = true;
        startX = e.touches[0].clientX;
      }
    }, { passive: true });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const diffX = e.clientX - startX;
      if (Math.abs(diffX) > 40) {
        const dir = diffX < 0 ? 1 : -1;
        render3DCoverFlow(centerIndex + dir);
        startX = e.clientX;
        isDragging = false;
      }
    });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging || !e.touches || !e.touches.length) return;
      const diffX = e.touches[0].clientX - startX;
      if (Math.abs(diffX) > 35) {
        const dir = diffX < 0 ? 1 : -1;
        render3DCoverFlow(centerIndex + dir);
        startX = e.touches[0].clientX;
        isDragging = false;
      }
    }, { passive: true });

    window.addEventListener('mouseup', () => { isDragging = false; });
    window.addEventListener('touchend', () => { isDragging = false; });

    // 3. Subtle parallax tilt on mouse movement (desktop only)
    if (window.innerWidth > 768 && !prefersReduced && typeof gsap !== 'undefined') {
      const cardState = heroCards.map((card) => ({
        depth: parseFloat(card.dataset.depth || '1.0'),
        tx: 0, ty: 0,
        cx: 0, cy: 0,
        lerpSpeed: 0.06
      }));

      heroGallery.addEventListener('mousemove', (e) => {
        const rect = heroGallery.getBoundingClientRect();
        const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;  // -1 to +1
        const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

        heroCards.forEach((card, i) => {
          const depth = cardState[i].depth;
          const dir = i % 2 === 0 ? 1 : -1;
          cardState[i].tx = normX * depth * dir * 8;   // very subtle: max ~11px
          cardState[i].ty = normY * depth * dir * 5;
        });
      });

      heroGallery.addEventListener('mouseleave', () => {
        cardState.forEach(s => { s.tx = 0; s.ty = 0; });
      });

      // Smooth ticker-based lerp (reusing existing GSAP ticker)
      gsap.ticker.add(() => {
        heroCards.forEach((card, i) => {
          const s = cardState[i];
          s.cx += (s.tx - s.cx) * s.lerpSpeed;
          s.cy += (s.ty - s.cy) * s.lerpSpeed;
          if (Math.abs(s.cx) > 0.01 || Math.abs(s.cy) > 0.01 || s.tx === 0) {
            const img = card.querySelector('img');
            if (img) {
              gsap.set(img, { x: s.cx, y: s.cy });
            }
          }
        });
      });
    }
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
  // CUSTOM CURSOR — Site-wide Desktop Fine-Pointer Implementation
  // ============================================================
  if (window.matchMedia('(pointer: fine)').matches) {
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

    document.documentElement.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
      cursorDot.style.opacity = '0';
    });

    document.documentElement.addEventListener('mouseenter', () => {
      if (hasMoved) {
        cursor.style.opacity = '1';
        cursorDot.style.opacity = '1';
      }
    });

    // Smooth GSAP Ticker Tracking (Responsive lerp values)
    if (typeof gsap !== 'undefined') {
      // Fix: tell GSAP to preserve the CSS centering translation
      gsap.set(cursor, { xPercent: -50, yPercent: -50 });
      gsap.set(cursorDot, { xPercent: -50, yPercent: -50 });

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
