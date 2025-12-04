document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Sélectionner toutes les sections qui contiennent un slider
    const sliders = document.querySelectorAll('.detail-section');

    // 2. Pour chaque section, on active sa propre logique
    sliders.forEach(section => {
        
        // On trouve les éléments UNIQUEMENT à l'intérieur de cette section
        const slides = section.querySelectorAll('.slide');
        const btnLeft = section.querySelector('.arrow.left');
        const btnRight = section.querySelector('.arrow.right');
        
        let currentSlide = 0; // Chaque slider commence à l'image 0

        // Fonction pour afficher la slide active
        function showSlide(index) {
            // Enlever la classe 'active' de toutes les slides de CE slider
            slides.forEach(slide => slide.classList.remove('active'));
            // Ajouter la classe 'active' à la slide demandée
            slides[index].classList.add('active');
        }

        // Clic sur le bouton DROIT (Suivant)
        if(btnRight) {
            btnRight.addEventListener('click', () => {
                currentSlide++;
                // Si on dépasse la dernière slide, on revient au début (boucle)
                if (currentSlide >= slides.length) {
                    currentSlide = 0;
                }
                showSlide(currentSlide);
            });
        }

        // Clic sur le bouton GAUCHE (Précédent)
        if(btnLeft) {
            btnLeft.addEventListener('click', () => {
                currentSlide--;
                // Si on va avant la première slide, on saute à la dernière
                if (currentSlide < 0) {
                    currentSlide = slides.length - 1;
                }
                showSlide(currentSlide);
            });
        }
    });

    // ---------------------------------------------------------
    // OPTIONNEL : Logique du Menu Mobile (Hamburger) pour le Header
    // ---------------------------------------------------------
    const menuBtn = document.querySelector('.menu-toggle'); 
    const navbar = document.querySelector('.navbar');

    if (menuBtn && navbar) {
        menuBtn.addEventListener('click', () => {
            navbar.classList.toggle('active');
            
            // Change l'icône de menu (si vous utilisez boxicons)
            const icon = menuBtn.querySelector('i');
            if (icon) {
                if (navbar.classList.contains('active')) {
                    icon.classList.remove('bx-menu');
                    icon.classList.add('bx-x');
                } else {
                    icon.classList.remove('bx-x');
                    icon.classList.add('bx-menu');
                }
            }
        });
    }
});