// ==========================================
// SPA ROUTER & NAVIGATION
// ==========================================

function navigateToPage(pageId) {
  // Map pageId to HTML elements
  const views = document.querySelectorAll('.page-view');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  // Deactivate all views and activate target
  views.forEach(view => {
    view.classList.remove('active');
  });
  const targetView = document.getElementById(`view-${pageId}`);
  if (targetView) {
    targetView.classList.add('active');
  }

  // Deactivate all nav links and activate target
  navLinks.forEach(link => {
    link.classList.remove('active');
  });
  const targetLink = document.getElementById(`nav-${pageId}`);
  if (targetLink) {
    targetLink.classList.add('active');
  }

  // Close mobile navigation menu if open
  const navToggle = document.getElementById('nav-toggle');
  const navLinksList = document.querySelector('.nav-links');
  if (navToggle && navToggle.classList.contains('active')) {
    navToggle.classList.remove('active');
    navLinksList.classList.remove('active');
  }

  // Scroll smooth to top of window
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Listen for hashchange events
window.addEventListener('hashchange', () => {
  const hash = window.location.hash.substring(1) || 'home';
  navigateToPage(hash);
});

// Set up mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('nav-toggle');
  const navLinksList = document.querySelector('.nav-links');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinksList.classList.toggle('active');
    });
  }

  // Initial Route Check
  const initialHash = window.location.hash.substring(1) || 'home';
  navigateToPage(initialHash);

  // Initialize testimonial carousel
  initTestimonialSlider();

  // Initialize Before/After sliders
  initBeforeAfterSliders();

  // Initialize gallery filter
  initGalleryFilter();
});


// ==========================================
// PATIENT TESTIMONIALS SLIDER
// ==========================================

function initTestimonialSlider() {
  const cards = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.slider-dot');
  const prevBtn = document.getElementById('prev-testimonial');
  const nextBtn = document.getElementById('next-testimonial');
  
  if (cards.length === 0) return;

  let currentIndex = 0;
  let sliderInterval = null;

  function showTestimonial(index) {
    // Boundary checks
    if (index >= cards.length) index = 0;
    if (index < 0) index = cards.length - 1;
    currentIndex = index;

    // Reset classes
    cards.forEach(card => card.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Set active
    cards[currentIndex].classList.add('active');
    if (dots[currentIndex]) {
      dots[currentIndex].classList.add('active');
    }
  }

  function startAutoSlide() {
    stopAutoSlide();
    sliderInterval = setInterval(() => {
      showTestimonial(currentIndex + 1);
    }, 6000);
  }

  function stopAutoSlide() {
    if (sliderInterval) {
      clearInterval(sliderInterval);
    }
  }

  // Prev/Next handlers
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      showTestimonial(currentIndex - 1);
      startAutoSlide(); // Reset timer
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      showTestimonial(currentIndex + 1);
      startAutoSlide(); // Reset timer
    });
  }

  // Dot handlers
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showTestimonial(idx);
      startAutoSlide();
    });
  });

  // Start slider auto progression
  startAutoSlide();

  // Pause auto slider on mouse enter, resume on leave
  const container = document.querySelector('.testimonials-slider-container');
  if (container) {
    container.addEventListener('mouseenter', stopAutoSlide);
    container.addEventListener('mouseleave', startAutoSlide);
  }
}


// ==========================================
// SMILE GALLERY BEFORE/AFTER SLIDER
// ==========================================

function initBeforeAfterSliders() {
  const sliders = document.querySelectorAll('.ba-slider');

  sliders.forEach(slider => {
    const beforeImg = slider.querySelector('.ba-before');
    const handle = slider.querySelector('.ba-handle');

    if (!beforeImg || !handle) return;

    let isDragging = false;

    function moveSlider(clientX) {
      const rect = slider.getBoundingClientRect();
      const x = clientX - rect.left;
      let percentage = (x / rect.width) * 100;

      // Bound percentage between 0% and 100%
      if (percentage < 0) percentage = 0;
      if (percentage > 100) percentage = 100;

      // Update before image clip-path width & handle position
      beforeImg.style.width = `${percentage}%`;
      handle.style.left = `${percentage}%`;
    }

    // Mouse Events
    slider.addEventListener('mousedown', (e) => {
      isDragging = true;
      moveSlider(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    slider.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      moveSlider(e.clientX);
    });

    // Touch Events (Mobile support)
    slider.addEventListener('touchstart', (e) => {
      isDragging = true;
      moveSlider(e.touches[0].clientX);
    });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    slider.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      moveSlider(e.touches[0].clientX);
    });
  });
}


// ==========================================
// SMILE GALLERY FILTER
// ==========================================

function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active filter class and set on target
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          // Smooth fade in
          card.style.animation = 'viewFadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}


// ==========================================
// BOOKING FORM LOGIC
// ==========================================

function handleBookingSubmit(event) {
  event.preventDefault();

  const form = document.getElementById('booking-form');
  const successState = document.getElementById('booking-success');

  if (form && successState) {
    // Hide form, show success state
    form.style.display = 'none';
    successState.style.display = 'flex';
  }
}

function resetBookingForm() {
  const form = document.getElementById('booking-form');
  const successState = document.getElementById('booking-success');

  if (form && successState) {
    // Reset values
    form.reset();
    
    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateInput = document.getElementById('book-date');
    if (dateInput) {
      dateInput.value = tomorrow.toISOString().split('T')[0];
      dateInput.min = tomorrow.toISOString().split('T')[0];
    }

    // Toggle displays back
    successState.style.display = 'none';
    form.style.display = 'flex';
  }
}

// Run date setter on load
document.addEventListener('DOMContentLoaded', () => {
  const dateInput = document.getElementById('book-date');
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.value = tomorrow.toISOString().split('T')[0];
    dateInput.min = tomorrow.toISOString().split('T')[0];
  }
});
