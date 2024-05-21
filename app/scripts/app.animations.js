//import $ from 'jquery';
import AnimationHelper from './helpers/animation.helper.js';
import { TimelineMax } from 'gsap/all';

const animationhelper = new AnimationHelper();

export const TLNavigation = (target) => {
	return new TimelineMax()
	.add(animationhelper.empty(target));
};

export const TLscene1 = () => {
	return new TimelineMax()
	.add(animationhelper.visualOutTween(document.querySelector('.js-scene-intro-visual')), '+=.5');
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

export const TLsceneCountUp = () => {
	return new TimelineMax()
	.add(animationhelper.countUp(document.querySelector('.counter-number.stat-01')), '+=.5')
	.add(animationhelper.countUp(document.querySelector('.counter-number.stat-02')), '-=.5')
	.add(animationhelper.countUp(document.querySelector('.counter-number.stat-03')), '-=.5')
	.add(animationhelper.countUp(document.querySelector('.counter-number.stat-04')), '-=.5');
	//.add(animationhelper.slashInTween('.js-scene-disruption-slash'), "-=.2");
};
