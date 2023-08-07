/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/mp-slider.js
class MpSlider {
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
;// CONCATENATED MODULE: ./src/js/mp-framework.js
/*************************************************************************** 
  MP Slider
****************************************************************************/


document.addEventListener('DOMContentLoaded', function () {
  new MpSlider('.mp-slider');
});

/*************************************************************************** 
  MP Carousel
****************************************************************************/

document.addEventListener('DOMContentLoaded', function () {
  let carousel = document.querySelector('.mp-carousel');
  let innerCarousel = document.querySelector('.mp-carousel-wrapper');
  let pressed = false;
  let startX;
  let x;
  carousel.addEventListener("mousedown", e => {
    pressed = true;
    startX = e.offsetX - innerCarousel.offsetLeft;
    carousel.style.cursor = "grabbing";
  });
  carousel.addEventListener("mouseenter", () => {
    carousel.style.cursor = 'grab';
  });
  carousel.addEventListener("mouseup", () => {
    carousel.style.cursor = "grab";
    pressed = false;
  });
  carousel.addEventListener("mousemove", e => {
    if (!pressed) return;
    e.preventDefault();
    x = e.offsetX;
    innerCarousel.style.left = `${x - startX}px`;
    checkBoundary();
  });

  // New touch events

  carousel.addEventListener('touchstart', e => {
    pressed = true;
    startX = e.touches[0].clientX - innerCarousel.offsetLeft;
    e.preventDefault();
  });
  carousel.addEventListener('touchend', () => {
    pressed = false;
  });
  carousel.addEventListener('touchmove', e => {
    if (!pressed) return;
    e.preventDefault();
    x = e.touches[0].clientX;
    innerCarousel.style.left = `${x - startX}px`;
    checkBoundary();
  });
  function checkBoundary() {
    let outer = carousel.getBoundingClientRect();
    let inner = innerCarousel.getBoundingClientRect();
    if (parseInt(innerCarousel.style.left) > 0) {
      innerCarousel.style.left = "0px";
    }
    if (inner.right < outer.right) {
      innerCarousel.style.left = `-${inner.width - outer.width}px`;
    }
  }
});

/*************************************************************************** 
  MP Buttons
****************************************************************************/

document.addEventListener('DOMContentLoaded', function () {
  const mpButtons = document.querySelectorAll('.mp-button');
  mpButtons.forEach(button => {
    const children = Array.from(button.childNodes);
    let firstIIndex = children.findIndex(node => node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() === 'i');
    let firstTextIndex = children.findIndex(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '');
    if (firstIIndex !== -1 && firstTextIndex !== -1) {
      if (firstIIndex < firstTextIndex) {
        button.classList.add('mp-icon-start');
      } else {
        button.classList.add('mp-icon-end');
      }
    } else if (firstIIndex !== -1) {
      // Only <i> element is present, can be at start or end
      if (firstIIndex === 0) {
        button.classList.add('mp-icon-start');
      } else {
        button.classList.add('mp-icon-end');
      }
    }
  });
});
/******/ })()
;