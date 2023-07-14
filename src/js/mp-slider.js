export class MpSlider {
    constructor(selector) {
        this.slider = document.querySelector(selector);
        this.setupSlider();
    }

    setupSlider() {
        let slides = Array.from(this.slider.querySelectorAll('.mp-slider-single'));
        this.index = slides.findIndex(slide => slide.classList.contains('visible'));
        this.controls = {
            prev: this.slider.querySelector('.mp-control-prev'),
            next: this.slider.querySelector('.mp-control-next')
        };
        this.bg = this.slider.querySelector('.mp-slider-bg');
        let autoplayDelay = this.slider.getAttribute('data-autoplay-delay') || 3000;
        this.autoplayId = null;
        let navigation = this.slider.querySelector('.mp-slider-navigation ul');

        // Remove existing navigation items
        while (navigation.firstChild) {
            navigation.firstChild.remove();
        }

        // Create navigation items for each slide
        slides.forEach((slide, slideIndex) => {
            let navItem = document.createElement('li');
            navItem.addEventListener('click', () => this.goToSlide(slideIndex, slides, navigation));
            navigation.appendChild(navItem);
        });

        this.controls.prev.addEventListener('click', () => {
            this.goToSlide((this.index - 1 + slides.length) % slides.length, slides, navigation);
        });

        this.controls.next.addEventListener('click', () => {
            this.goToSlide((this.index + 1) % slides.length, slides, navigation);
        });

        this.slider.addEventListener('mouseover', this.stopAutoplay.bind(this));
        this.slider.addEventListener('mouseout', this.autoplay.bind(this, slides.length, autoplayDelay));

        this.autoplay(slides.length, autoplayDelay);

        // Initially highlight the navigation item for the visible slide
        this.goToSlide(this.index, slides, navigation);
    }

    autoplay(slidesLength, autoplayDelay) {
        this.autoplayId = setInterval(() => {
            this.goToSlide((this.index + 1) % slidesLength);
        }, autoplayDelay);
    }

    stopAutoplay() {
        if (this.autoplayId !== null) {
            clearInterval(this.autoplayId);
            this.autoplayId = null;
        }
    }

    goToSlide(newIndex, slides, navigation) {
        slides[this.index].classList.remove('visible');
        slides[newIndex].classList.add('visible');
        let newImg = slides[newIndex].querySelector('.mp-slider-img').cloneNode();

        while (this.bg.firstChild) {
            this.bg.firstChild.remove();
        }

        this.bg.appendChild(newImg);
        this.index = newIndex;

        // Update navigation items
        Array.from(navigation.children).forEach((navItem, i) => {
            if (i === this.index) {
                navItem.classList.add('active');
            } else {
                navItem.classList.remove('active');
            }
        });
    }
}
