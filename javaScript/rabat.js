
document.querySelectorAll('.detail-section').forEach(section => {
    const slides = section.querySelectorAll('.slide');
    if (slides.length===0) return;

    let current = 0;

    const updateSlides = () => {
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === current);
        });
    };

    updateSlides(); 

    const btnPrev = section.querySelector('.arrow.left');
    const btnNext = section.querySelector('.arrow.right');

    if (btnNext) {
        btnNext.addEventListener('click', () => {
            current = (current + 1) % slides.length;
            updateSlides();
        });
    }

    if (btnPrev) {
        btnPrev.addEventListener('click', () => {
            current = (current - 1 + slides.length) % slides.length;
            updateSlides();
        });
    }
});
