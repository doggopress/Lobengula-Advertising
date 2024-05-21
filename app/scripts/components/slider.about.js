import $ from 'jquery';
import 'scripts/vendor/swiper.bundle.min';

export default class AboutSlider {

    constructor(options = {}) {

       return new Swiper(".about-slider", {
            loop: false,
            parallax: false,
            freeMode: {
                enabled: true,
                sticky: true,
            },
            cssMode: false,
            //slidesPerView: 1,
            slidesPerView:1,
            //slidesPerGroupAuto: true,
            spaceBetween: 0,
            centeredSlides: false,
            simulateTouch: true,
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
                    slidesPerView: 1,
                },
                992: {
                    slidesPerView: 1,
                },
                1200: {
                    slidesPerView: 1,
                },
                1400: {
                    slidesPerView: 1
                },
            },
        });
    }
}