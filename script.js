document.addEventListener('DOMContentLoaded', () => {

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

    // --- Sliders (Gallery + Produits) ---
    document.querySelectorAll('.slider').forEach(slider => {
        const track = slider.querySelector('.slider-track');
        const slides = Array.from(track.children);
        const nextBtn = slider.querySelector('.next');
        const prevBtn = slider.querySelector('.prev');
        const dotsContainer = slider.querySelector('.slider-dots');
        let index = 0;

        slides.forEach((_, i) => {
            const dot = document.createElement('span');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goTo(i));
            dotsContainer.appendChild(dot);
        });
        const dots = Array.from(dotsContainer.children);

        function update() {
            track.style.transform = `translateX(-${index * 100}%)`;
            dots.forEach((d, i) => d.classList.toggle('active', i === index));
        }
        function goTo(i) {
            index = (i + slides.length) % slides.length;
            update();
        }

        nextBtn.addEventListener('click', () => goTo(index + 1));
        prevBtn.addEventListener('click', () => goTo(index - 1));

        let autoplay = setInterval(() => goTo(index + 1), 5000);
        slider.addEventListener('mouseenter', () => clearInterval(autoplay));
        slider.addEventListener('mouseleave', () => autoplay = setInterval(() => goTo(index + 1), 5000));
    });

});