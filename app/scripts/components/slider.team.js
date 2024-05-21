import $ from 'jquery';
import 'scripts/vendor/swiper.bundle.min';

export default class TeamSlider {

    constructor(options = {}) {

       return new Swiper(".team-slider", {
            loop: true,
            parallax: false,
            freeMode: {
                enabled: true,
                sticky: false,
            },
            //slidesPerView: 1,
            slidesPerView:'auto',
            slidesPerGroupAuto: true,
            spaceBetween: 30,
            centeredSlides: true,
            simulateTouch: true,
            speed: 6000,
            mousewheel: {
                invert: false,
            },
            navigation: {
                nextEl: ".team-slider-button-next",
                prevEl: ".team-slider-button-prev",
            },
            autoplay: {
                delay: 1000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            breakpoints: {
                // when window width is >= 320px
                320: {
                    slidesPerView: 2,
                },
                540: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 2,
                },
                992: {
                    slidesPerView: 3,
                },
                1200: {
                    slidesPerView: 3,
                },
                1400: {
                    slidesPerView: 4
                },
            },
        });
    }
}