/*************************************************************************** 
  MP Slider
****************************************************************************/

import { MpSlider } from './mp-slider.js';

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

	carousel.addEventListener("mousedown", (e) => {
		
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

	carousel.addEventListener("mousemove", (e) => {

		if (!pressed) return;
		e.preventDefault();

		x = e.offsetX;

		innerCarousel.style.left = `${x - startX}px`;

		checkBoundary();

	});

	// New touch events

	carousel.addEventListener('touchstart', (e) => {

		pressed = true;
		startX = e.touches[0].clientX - innerCarousel.offsetLeft;
		e.preventDefault();

	});

	carousel.addEventListener('touchend', () => {

		pressed = false;

	});

	carousel.addEventListener('touchmove', (e) => {

		if (!pressed) return;
		e.preventDefault();

		x = e.touches[0].clientX;

		innerCarousel.style.left = `${x - startX}px`;

		checkBoundary();

	});


	function checkBoundary() {

		let outer = carousel.getBoundingClientRect();
		let inner = innerCarousel.getBoundingClientRect();

		if(parseInt(innerCarousel.style.left) > 0){
			innerCarousel.style.left = "0px";
		} 
		
		if(inner.right < outer.right){
			innerCarousel.style.left = `-${inner.width - outer.width}px`;
		}

	}

});


/*************************************************************************** 
  MP Buttons
****************************************************************************/

document.addEventListener('DOMContentLoaded', function () {
    const mpButtons = document.querySelectorAll('.mp-button');
    
    mpButtons.forEach((button) => {
        const children = Array.from(button.childNodes);
        let firstIIndex = children.findIndex(node => node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() === 'i');
        let firstTextIndex = children.findIndex(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '');

        if(firstIIndex !== -1 && firstTextIndex !== -1) {
            if (firstIIndex < firstTextIndex) {
                button.classList.add('mp-icon-start');
            } else {
                button.classList.add('mp-icon-end');
            }
        } else if(firstIIndex !== -1) {
            // Only <i> element is present, can be at start or end
            if(firstIIndex === 0) {
                button.classList.add('mp-icon-start');
            } else {
                button.classList.add('mp-icon-end');
            }
        }
    });
});