import $ from 'jquery';
import 'scripts/vendor/swiper.bundle.min';

export default class CaseStudySlider {

	constructor(options = {}) {

		return new Swiper(".case-study-slider", {
			loop: true,
			parallax: false,
			freeMode: {
				enabled: true,
				sticky: true,
			},
			cssMode: false,
			//slidesPerView: 1,
			slidesPerView:1,
			//slidesPerGroupAuto: true,
			spaceBetween: 30,
			centeredSlides: false,
			simulateTouch: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			  },
			speed: 6000,
			mousewheel: {
				invert: false,
			},
			autoplay: false,
			breakpoints: {
				// when window width is >= 320px
				320: {
					slidesPerView: 1,
				},
				540: {
					slidesPerView: 1,
				},
				768: {
					slidesPerView: 2,
				},
				992: {
					slidesPerView: 2,
				},
				1200: {
					slidesPerView: 2,
				},
				1400: {
					slidesPerView: 2
				},
			},
		});
	}
}