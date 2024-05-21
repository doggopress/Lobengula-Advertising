import $ from 'jquery';
import 'scripts/vendor/swiper.bundle.min';
import { Autoplay } from 'swiper/modules';

export default class TeamSlider {

    constructor(options = {}) {

       return new Swiper(".team-slider", {
            loop: false,
            parallax: false,
            freeMode: {
                enabled: true,
                sticky: true,
            },
            //slidesPerView: 1,
            slidesPerView:'auto',
            slidesPerGroupAuto: true,
            spaceBetween: 30,
            centeredSlides: false,
            simulateTouch: true,
            speed: 6000,
            //mousewheel: false,
            /**/
            mousewheel: {
                invert: false,
            },
            /*
            autoplay: {
                delay: 1000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            /**/
            autoplay: false,
            navigation: {
                nextEl: ".team-slider-button-next",
                prevEl: ".team-slider-button-prev",
            },
            //autoplay: false,
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