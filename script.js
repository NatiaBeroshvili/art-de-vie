document.addEventListener('DOMContentLoaded', () => {

  // 1. Service Category Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-grid .card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');

      serviceCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 2. Auto-Select Service in Form when clicking "Choisir"
  const selectServiceBtns = document.querySelectorAll('.btn-select-service');
  const serviceSelectInput = document.getElementById('service');

  selectServiceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const serviceValue = btn.getAttribute('data-service');
      serviceSelectInput.value = serviceValue;

      // Smooth scroll to booking form
      document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
    });
  });

  // 3. Set minimum booking date to today
  const dateInput = document.getElementById('date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  // 4. Form Submission Handling
  const bookingForm = document.getElementById('booking-form');
  const confirmationMsg = document.getElementById('confirmation-msg');
  const summaryText = document.getElementById('summary-text');

  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    if (name && phone && service && date && time) {
      summaryText.textContent = `M./Mme ${name}, votre RDV pour "${service}" est fixé le ${date} à ${time}.`;

      bookingForm.classList.add('hidden');
      confirmationMsg.classList.remove('hidden');
    }
  });
});




const scrollBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollBtn.classList.add('visible');
    } else {
        scrollBtn.classList.remove('visible');
    }
});

scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.querySelectorAll('.slider').forEach(slider => {
    const track = slider.querySelector('.slider-track');
    const slides = slider.querySelectorAll('.slide');
    const prevBtn = slider.querySelector('.prev');
    const nextBtn = slider.querySelector('.next');
    const dotsContainer = slider.querySelector('.slider-dots');

    let currentIndex = 0;

    slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.dot');

    function updateSlider() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');
    }

    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
    });

    setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    }, 4000);
});