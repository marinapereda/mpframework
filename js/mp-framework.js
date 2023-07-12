/*************************************************************************** 
  MP Slider
****************************************************************************/

function setupSlider(slider) {

	let slides = Array.from(slider.querySelectorAll('.mp-slider-single'));
	let index = slides.findIndex(slide => slide.classList.contains('visible'));
	let controls = {
		prev: slider.querySelector('.mp-control-prev'),
		next: slider.querySelector('.mp-control-next')
	};
	let bg = slider.querySelector('.mp-slider-bg');
	let autoplayDelay = slider.getAttribute('data-autoplay-delay') || 3000;
	let autoplayId = null;
	let navigation = slider.querySelector('.mp-slider-navigation ul');

	// Remove existing navigation items
	while (navigation.firstChild) {
		navigation.firstChild.remove();
	}

	// Create navigation items for each slide
	slides.forEach((slide, slideIndex) => {
		let navItem = document.createElement('li');
		navItem.addEventListener('click', () => goToSlide(slideIndex));
		navigation.appendChild(navItem);
	});

	function autoplay() {
		autoplayId = setInterval(function () {
			goToSlide((index + 1) % slides.length);
		}, autoplayDelay);
	}

	function stopAutoplay() {
		if (autoplayId !== null) {
			clearInterval(autoplayId);
			autoplayId = null;
		}
	}

	function goToSlide(newIndex) {
		
		slides[index].classList.remove('visible');
		slides[newIndex].classList.add('visible');
		let newImg = slides[newIndex].querySelector('.mp-slider-img').cloneNode();

		while (bg.firstChild) {
			bg.firstChild.remove();
		}

		bg.appendChild(newImg);
		index = newIndex;

		// Update navigation items
		Array.from(navigation.children).forEach((navItem, i) => {
			if (i === index) {
				navItem.classList.add('active');
			} else {
				navItem.classList.remove('active');
			}
		});
	}

	controls.prev.addEventListener('click', function () {
		goToSlide((index - 1 + slides.length) % slides.length);
	});

	controls.next.addEventListener('click', function () {
		goToSlide((index + 1) % slides.length);
	});

	slider.addEventListener('mouseover', stopAutoplay);
	slider.addEventListener('mouseout', autoplay);

	autoplay();

	// Initially highlight the navigation item for the visible slide
	goToSlide(index);
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.mp-slider').forEach(setupSlider);
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

})