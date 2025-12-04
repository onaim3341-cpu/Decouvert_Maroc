document.addEventListener('DOMContentLoaded', () => {
  const sliders = document.querySelectorAll('.slider1');

  sliders.forEach(slider => {
    const slidesContainer = slider.querySelector('.slides1');
    const slides = Array.from(slider.querySelectorAll('.slide'));
    const prevBtn = slider.querySelector('.arrow-left');
    const nextBtn = slider.querySelector('.arrow-right');

    let currentIndex = 0;
    const slideCount = slides.length;

    // Clone first and last slide for seamless infinite effect
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);

    slidesContainer.appendChild(firstClone);
    slidesContainer.insertBefore(lastClone, slidesContainer.firstChild);

    // Update slides array after cloning
    const allSlides = slider.querySelectorAll('.slide');
    let slideWidth = allSlides[0].offsetWidth;

    // Start at the "real" first slide
    let position = -slideWidth;
    slidesContainer.style.transform = `translateX(${position}px)`;

    function updateSlider() {
      slidesContainer.style.transition = 'transform 0.5s ease';
      position = -slideWidth * (currentIndex + 1);
      slidesContainer.style.transform = `translateX(${position}px)`;
    }

    nextBtn.addEventListener('click', () => {
      currentIndex++;
      updateSlider();
    });

    prevBtn.addEventListener('click', () => {
      currentIndex--;
      updateSlider();
    });

    // Reset position instantly when reaching clones
    slidesContainer.addEventListener('transitionend', () => {
      if (currentIndex >= slideCount) {
        // Jump back to real first slide
        slidesContainer.style.transition = 'none';
        currentIndex = 0;
        position = -slideWidth * (currentIndex + 1);
        slidesContainer.style.transform = `translateX(${position}px)`;
      }
      if (currentIndex < 0) {
        // Jump to real last slide
        slidesContainer.style.transition = 'none';
        currentIndex = slideCount - 1;
        position = -slideWidth * (currentIndex + 1);
        slidesContainer.style.transform = `translateX(${position}px)`;
      }
    });

    // Update slide width on window resize
    window.addEventListener('resize', () => {
      slideWidth = allSlides[0].offsetWidth;
      position = -slideWidth * (currentIndex + 1);
      slidesContainer.style.transition = 'none';
      slidesContainer.style.transform = `translateX(${position}px)`;
    });
  });
});