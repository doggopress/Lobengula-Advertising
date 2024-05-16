
import 'scripts/vendor/swiper.bundle.min';

export default class TextScrollSlider {

    constructor(options = {}) {

        return new Swiper('.text__scroll', {
            loop: true,
            //loopedSlides: 4,
            //autoplay:true,
            freemode: false,
            slidesPerView:'auto',
            //slidesPerGroupAuto: true,
            centeredSlides: true,
            spaceBetween: 30,
            speed: 6000,
            simulateTouch: true,
            autoplay: {
                delay: 1,
                //reverseDirection: true
                //disableOnInteraction: false,
            },
            allowTouchMove: false,
              disableOnInteraction: false
        });
    }
}