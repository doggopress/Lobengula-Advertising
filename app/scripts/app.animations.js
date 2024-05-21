//import $ from 'jquery';
import AnimationHelper from './helpers/animation.helper.js';
import { TimelineMax } from 'gsap/all';

const animationhelper = new AnimationHelper();

export const TLscene1 = () => {
	return new TimelineMax()
	//.add(animationhelper.slashInTween(document.querySelector('.hero-copy-introduction')))
	.add(animationhelper.visualOutTween(document.querySelector('.js-scene-intro-visual')), '+=.5');
	//.add(animationhelper.visualOutTween(document.querySelector('.hero-copy-introduction')), '-=.5');
	//.add(animationhelper.visualClipTween('.js-scene-disruption-visual'))
	//.add(animationhelper.visualInTween(document.querySelector('.hero-copy-introduction')), '-=.5');
	//.add(animationhelper.slashOutTween(document.querySelector('.hero-copy-introduction')), '+=.5');
	//.add(animationhelper.slashInTween('.js-scene-disruption-slash'), "-=.2");
};

export const TLsceneAboutUs = () => {
	return new TimelineMax()
    .add(animationhelper.blurIn(document.querySelector('.title-anim')), '+=.5');
	//.add(animationhelper.AboutEnter(document.querySelector('.wf_panel_1')), '+=.5');
};

export const TLsceneAboutUs2 = () => {

    /** /
    let duration = 1,
    sections = gsap.utils.toArray(".wf_panel"),
    sectionIncrement = duration / (sections.length - 1),
    tl = gsap.timeline({
    	scrollTrigger: {
    		trigger: ".portfolio__wrapper",
    		pin: true,
    		scrub: 1,
    		start: "top 90",
    		end: "+=6000"
    	}
    });

    tl.to(sections, {
    	xPercent: -100 * (sections.length - 1),
    	duration: duration,
    	ease: "none"
    });
    /**/

    const tl = new TimelineMax();
    const sections = gsap.utils.toArray(".wf_panel");

    sections.forEach((section, index) => {

        const sc = (-100 * (sections.length - 1));

        tl.add(
            animationhelper.portfolioScroll(section, sc ), 
            '+=.5'
        );

        /** /
        let tween = gsap.from(section, {
            opacity: 0,
            scale: 0.6,
            duration: 0.5,
            force3D: true,
            paused: true
        });
        addSectionCallbacks(tl, {
            start: sectionIncrement * (index - 0.99),
            end: sectionIncrement * (index + 0.99),
            onEnter: () => tween.play(),
            onLeave: () => tween.reverse(),
            onEnterBack: () => tween.play(),
            onLeaveBack: () => tween.reverse()
        });
        index || tween.progress(1);
        /**/
    });

    return tl;

	return new TimelineMax()
	//.add(animationhelper.slashInTween(document.querySelector('.hero-copy-introduction')))
    .add(animationhelper.portfolioScroll('.wf_panel'), '+=.5');
};

export const TLsceneProject = () => {
	return new TimelineMax()
	//.add(animationhelper.slashInTween(document.querySelector('.hero-copy-introduction')))
    .add(animationhelper.projectEnter(document.querySelector('.project__item.pi-01')), '+=.5')
    .add(animationhelper.projectEnter(document.querySelector('.project__item.pi-02')))
    .add(animationhelper.projectEnter(document.querySelector('.project__item.pi-03')));
};

export const TLscene4 = () => {
	return new TimelineMax()
	.add(animationhelper.videoInTween(document.querySelector('.case-study-video-holder')));
};

export const TLscene3 = () => {
	return new TimelineMax()
	.add(animationhelper.videoInTween(document.querySelector('.case-study-video-holder-01')));
};

export const TLscene5 = () => {
	return new TimelineMax()
	.add(animationhelper.countUp(document.querySelector('.counter-number.stat-01')), '+=.5')
	.add(animationhelper.countUp(document.querySelector('.counter-number.stat-02')), '-=.5')
	.add(animationhelper.countUp(document.querySelector('.counter-number.stat-03')), '-=.5')
	.add(animationhelper.countUp(document.querySelector('.counter-number.stat-04')), '-=.5');
	//.add(animationhelper.slashInTween('.js-scene-disruption-slash'), "-=.2");
};

export const TLscene10 = () => {
	return new TimelineMax()
	.add(animationhelper.blurIn(document.querySelector('.js-scene-stats-visual')), '-=1');
};

export const TLscene6 = () => {
	return new TimelineMax()
	.add(animationhelper.videoInTween(document.querySelector('.music-video-holder')));
};

export const TLscene7 = () => {
	return new TimelineMax()
	.add(animationhelper.videoInTween(document.querySelector('.js-scene-prheadlines-visual')), '-=1.25');
};

export const TLscene8 = () => {
	return new TimelineMax()
	.add(animationhelper.bgScroll(document.querySelector('.js-scene-merchandise-visual')));
	//.add(animationhelper.bgScroll(document.querySelector('#merchandise')));
};

export const TLscene9 = () => {
	return new TimelineMax()
	.add(animationhelper.visualInTween(document.querySelector('.pr-quote-01')), '+=.5')
	.add(animationhelper.visualInTween(document.querySelector('.pr-quote-02')))
	.add(animationhelper.visualInTween(document.querySelector('.pr-quote-03')))
	.add(animationhelper.visualInTween(document.querySelector('.pr-quote-04')))
	.add(animationhelper.visualInTween(document.querySelector('.pr-quote-05')))
	.add(animationhelper.visualInTween(document.querySelector('.pr-quote-06')))
	.add(animationhelper.visualInTween(document.querySelector('.pr-quote-07')));
};
