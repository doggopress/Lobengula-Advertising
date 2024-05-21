//import $ from 'jquery';
import { TweenMax, Power0, Sine, gsap } from 'gsap/all';


export default class AnimationHelper {

    empty(target){

		let tween = TweenMax.fromTo(target, .5,
			{
				autoAlpha: 1
			},
			{
				autoAlpha: 1
			}
		);

		return tween;
	}

	visualClipTween(target){

		// let tween = TweenMax.to(target, .5, {
		// 	 	"-webkit-clip-path":"polygon("+ (-0.364 * window.innerHeight) +"px 0px, "+window.innerWidth+"px 0px, " + (0.364 * window.innerHeight + window.innerWidth) + "px 100%, 0% 100%)",
		// 	 	ease: Power0.easeNone
		// 	 });

		let tween = TweenMax.to(target, .5, {
			opacity: 1,
			ease: Power0.easeNone
		});

		return tween;
	}

	visualInTween(target){

		let tween = TweenMax.fromTo(
			target, .5,
			{
				y: '50%',
				autoAlpha: 0
			},
			{
				y: '0%',
				autoAlpha: 1,
				delay: .5,
				ease: Power0.easeNone
			}
		);

		return tween;

	}

	videoInTween(target){

		let tween = TweenMax.fromTo(
			target, .5,
			{
				autoAlpha: 1,
				scale: 2
			},
			{
				autoAlpha: 1,
				scale: 1,
				ease: Power0.easeInOut
				//ease: Power0.easeNone
			}
		);

		return tween;

	}

	darkenOutTween(target){

		let tween = TweenMax.to(target, .5, {
			opacity: 1,
			ease: Power0.easeNone
		});

		return tween;

	}

	visualOutTween(target){

		let tween = TweenMax.to(target, .5, {
			scale: 2,
			ease: Power0.easeNone,
			autoAlpha: 0
		});

		return tween;

	}

	bgScroll(target){

		let tween = TweenMax.fromTo(target, .5,
			{
				backgroundPosition: '0% -5%',
				autoAlpha: 0
			},
			{
				//y: '25%',
				//delay: .25,
				backgroundPosition: '0% 100%',
				autoAlpha: 1,
				ease: Sine.easeOut
			}
		);

		return tween;
	}

	slashInTween(target){

		let tween = TweenMax.fromTo(target, .5, {
			x: '-100%'
		},
		{
			x: '0%',
			opacity: 1,
			ease: Sine.easeOut
		});

		return tween;
	}

	slashOutTween(target){

		let tween = TweenMax.to(target, .25, {
			opacity: 0,
			delay: .25,
			ease: Power0.easeNone
		});

		return tween;
	}

	blurIn(target){

		let tween = TweenMax.fromTo(target, .5,
			{
				webkitFilter: 'blur(0px)',
				autoAlpha: 1
				//scale: 2
			},
			{
				//y: '25%',
				//delay: .25,
				//scale: 1,
				webkitFilter: 'blur(0px)',
				autoAlpha: 1,
				ease: Power0.easeInOut
			}
		);

		return tween;
	}

    projectEnter(target){

		let tween = TweenMax.fromTo(target, .5,
			{
				webkitFilter: 'blur(10px)',
				autoAlpha: .7,
				scale: .5
			},
			{
				
				scale: 1,
				webkitFilter: 'blur(0px)',
				autoAlpha: 1,
				ease: Power0.easeInOut
			}
		);

		return tween;
	}

    AboutEnter(target){

		let tween = TweenMax.fromTo(
			target, .5,
			{
				x: 0,
				autoAlpha: 1
			},
			{
				x: '-100%',
				autoAlpha: 1,
				delay: .5,
				ease: Power0.easeNone
			}
		);

		return tween;

	}

    portfolioScroll(target, xPercent){

		let tween = TweenMax.fromTo(target, .5,
			{
				autoAlpha: 1
				//scale: 2
			},
			{
				xPercent: xPercent,
                duration: 1,
                autoAlpha: 1,
                ease: "none"
			}
		);

		return tween;
	}

    portfolioScroll2(target){

        function addSectionCallbacks(timeline, { start, end, param, onEnter, onLeave, onEnterBack, onLeaveBack }) {
            let trackDirection = animation => {
                let onUpdate = animation.eventCallback("onUpdate"),
                    prevTime = animation.time();
                animation.direction = animation.reversed() ? -1 : 1;
                animation.eventCallback("onUpdate", () => {
                    let time = animation.time();
                    if (prevTime !== time) {
                        animation.direction = time < prevTime ? -1 : 1;
                        prevTime = time;
                    }
                    onUpdate && onUpdate.call(animation);
                });
            },
                empty = v => v;
            timeline.direction || trackDirection(timeline);
            start >= 0 && timeline.add(() => ((timeline.direction < 0 ? onLeaveBack : onEnter) || empty)(param), start);
            end <= timeline.duration() && timeline.add(() => ((timeline.direction < 0 ? onEnterBack : onLeave) || empty)(param), end);
        }

        let duration = 1,
            sections = gsap.utils.toArray(target),
            sectionIncrement = duration / (sections.length - 1);

        /** /
        let MainTimeline = gsap.timeline({
                scrollTrigger: {
                	trigger: '.portfolio__area',
                	pin: '.ck-site',
                	scrub: true,
                	start: "center center",
                	end: "+=100%",
                    markers: true,
                }
        });
        /**/

        let tween = TweenMax.fromTo(sections, .5,
			{
				autoAlpha: 1
				//scale: 2
			},
			{
				xPercent: -100 * (sections.length - 1),
                duration: 1,
                autoAlpha: 1,
                ease: "none"
			}
		);

        /** /
		let tween = TweenMax.to(sections, {
        //MainTimeline.to(sections, {
            xPercent: -100 * (sections.length - 1),
            duration: 1,
            ease: "none"
        });
        /**/

        /** /
        sections.forEach((section, index) => {
            let tween2 = gsap.from(section, {
                opacity: 0,
                scale: 0.6,
                duration: 0.5,
                force3D: true,
                paused: true
            });
            addSectionCallbacks(MainTimeline, {
                start: sectionIncrement * (index - 0.99),
                end: sectionIncrement * (index + 0.99),
                onEnter: () => tween2.play(),
                onLeave: () => tween2.reverse(),
                onEnterBack: () => tween2.play(),
                onLeaveBack: () => tween2.reverse()
            });
            index || tween2.progress(1);
        });
        /**/

		return tween;
	}

	countUp(target){

		const from = parseInt(target.getAttribute('data-from'));
		const to = parseInt(target.getAttribute('data-to'));
		const unit = target.getAttribute('data-unit');
		let obj = {count: from};

		let tween = TweenMax.to(obj, 3.6, {
			count: to,
			delay: .25,
			ease: Power0.easeInOut,
			onUpdate: () => {
				target.textContent = Math.floor(obj.count);
			},
			onComplete: () => {

				if ( unit === 'k' ) {
					target.textContent = target.textContent + unit;
				} else {
					target.textContent = unit + target.textContent;
				}

			}
		});

		return tween;

	}

    portfolio(target) {

    }
}
