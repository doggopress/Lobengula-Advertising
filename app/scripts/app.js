import $ from 'jquery';
import 'scripts/vendor/bootstrap.bundle.min';

import Scroll from 'scripts/components/scroll.js';
import ScrollMagic from 'scrollmagic';

import SceneFactory from 'scripts/helpers/animation.scene.factory.js';
import * as AnimationScenes from 'scripts/app.animations.js';

import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import 'magnific-popup';
import 'vanilla-cookieconsent';
import '@lottiefiles/lottie-player';
import 'scripts/components/sidebar';
import 'scripts/components/backToTop';
import 'scripts/components/ajax-form.js';
import 'scripts/components/service-accordion.js';

import AboutSlider from 'scripts/components/slider.about';
import TeamSlider from 'scripts/components/slider.team';
import MenuMobile from 'scripts/components/menu.mobile';
import MouseCursor from 'scripts/components/mouse.cursor';
import TextScrollSlider from 'scripts/components/slider.text-scroll';
import { _isUndefined } from 'gsap/gsap-core';


/***************************************************
==================== JS INDEX ======================
****************************************************

Copyright © 2024 Lobengula Advertising

****************************************************/

const CUSTOM_SCROLLBAR = true;

(function ($) {

	// HIDE LOGS ON PROD
	/** /
	console.log = function(){};
	console.info = function(){};
	console.warn = function(){};
	console.error = function(){};
	/**/

	/*======================================
	25. Gsap RegisterPlugin
	========================================*/
	gsap.install(window);
	//gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin, SplitText);
	gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

	/*======================================
	26. Config GSAP
	========================================*/
	gsap.config({
		nullTargetWarn: false,
	});

	/*======================================
	00. PreLoader
	========================================*/
	let lottiePlayerPreloader;
	//let controller = new ScrollMagic.Controller();

	function preloadAssets( callback ) {

		lottiePlayerPreloader = document.querySelector("#lottie-preloader");

		if( lottiePlayerPreloader ) {
			lottiePlayerPreloader.load("https://cdn.cloud5ive.io/lobengula/lottie/preloader/preloader-03.json");

			lottiePlayerPreloader.addEventListener("load", () => {
				console.log("Lottie Preloader Loaded!");
				callback(lottiePlayerPreloader);
			});

		} else {

			callback(false);
		}

	}

	function createScenes( callback ) {

		new MouseCursor();
		new MenuMobile();
		new TeamSlider();
		//new AboutSlider();
		new TextScrollSlider();

		if( CUSTOM_SCROLLBAR === true ) {

			$('html').addClass('custom-scroll');

			const TLscenes = [];
	
			// eslint-disable-next-line no-unused-vars
			const sceneFactory = new SceneFactory();
	
			const scroll = new Scroll({
				onInit: (evt) => {
					console.log('Scroll done');
					callback();
				}
			});
			
			let duration = 1;
			const controller = new ScrollMagic.Controller();
			const sections = gsap.utils.toArray(".wf_panel");
			const sectionIncrement = duration / (sections.length - 1);

			/** /
			const s = new ScrollMagic.Scene({
				triggerElement: '.portfolio__wrapper',
				triggerHook: 0.9, // show, when scrolled 10% into view
				duration: '80%', // hide 10% before exiting view (80% + 10% from bottom)
				offset: 50 // move trigger to center of element
			})
			.setPin('.portfolio__wrapper')
			.addTo(controller);

			s.on('enter', (e) => {
				console.log(`About entered`);
				//tween.play();
			});
	
			s.on('leave', (e) => {
				console.log(`About left`);
				//tween.reverse();
			});

			scroll.options.scenes.push(s);

			return
			/**/

			
			/** /
			let tl = gsap.timeline({
					scrollTrigger: {
						trigger: ".portfolio__wrapper",
						pin: true,
						scrub: 1,
						start: "top 90",
						end: "+=6000"
					}
				});
				/** /

			tl.to(sections, {
				xPercent: -100 * (sections.length - 1),
				duration: duration,
				ease: "none"
			});
			/**/

			//return

			/** /
			const s = new ScrollMagic.Scene({
				triggerElement: '.portfolio__wrapper',
				triggerHook: 0.9, // show, when scrolled 10% into view
				duration: '80%', // hide 10% before exiting view (80% + 10% from bottom)
				offset: 50 // move trigger to center of element
			})
			.setPin('#about-us')
			//.setTween(tween)
			//.setClassToggle(section, 'visible') // add class to reveal
			.addTo(controller);
			/**/

			// START
			/* * /
			sections.forEach((section, index) => {

				let tween = gsap.from(section, {
					opacity: 0,
					scale: 0.6,
					duration: 0.5,
					force3D: true,
					paused: true
				});

				const s = new ScrollMagic.Scene({
					
					triggerElement: section,
					//triggerHook: sectionIncrement * (index - 0.99),
					//duration: sectionIncrement * (index + 0.99),
					triggerHook: 0.9, // show, when scrolled 10% into view
					duration: '80%', // hide 10% before exiting view (80% + 10% from bottom)
					offset: 50 // move trigger to center of element
				})
				//.setPin('.portfolio__wrapper')
				.setTween(tween)
				//.setClassToggle(section, 'visible') // add class to reveal
				.addTo(controller);
		
				s.on('enter', (e) => {
					console.log(`About[${index}] entered`);
					tween.play();
				});
		
				s.on('leave', (e) => {
					console.log(`About[${index}] left`);
					tween.reverse();
				});
		
				scroll.options.scenes.push(s);

				scroll.scrollbar.track.update();

			});
			/**/
			// END

			/** /
			const s = new ScrollMagic.Scene({
				triggerElement: '.portfolio__area',
				triggerHook: 0.9, // show, when scrolled 10% into view
				duration: '80%', // hide 10% before exiting view (80% + 10% from bottom)
				offset: 50 // move trigger to center of element
			})
			.setClassToggle('.portfolio__area', 'visible') // add class to reveal
			.addTo(controller);
	
			s.on('enter', (e) => {
				console.log('About entered');
			});
	
			s.on('leave', (e) => {
				console.log('About left');
			});
	
			scroll.options.scenes.push(s);
			/**/

			const projects = document.querySelector('.project-area-2');
			if( projects ) {
				TLscenes.push({TimeLineScene: AnimationScenes.TLsceneProject(), element: '.project-area-2'});
			}

			const portfolio__area = document.querySelector('.portfolio__area');
			if( portfolio__area ) {
				//return;
				TLscenes.push(
					{
						TimeLineScene: AnimationScenes.TLsceneAboutUs(), 
						element: '.portfolio__area'
					}
				);
			}
	
			TLscenes.forEach((scene, index )=>{
	
				const sceneElem = document.querySelector(scene.element);
				const sceneElemName = sceneElem.getAttribute('data-anchor');
	
				const sceneDuration = sceneElem.getAttribute('data-duration');
	
				if ( sceneElem ) {

					//let aboutSwiper = (sceneElemName === 'About') ? new AboutSlider() : null;
					let aboutSwiper = null;

					if( (sceneElemName === 'About') ) {
						aboutSwiper = new AboutSlider();
						//console.log(aboutSwiper);
						aboutSwiper.detachEvents();

						/**/
						aboutSwiper.on('slideChange', (swiper) => {
							console.log('slide changed', {
								activeIndex: swiper.activeIndex, 
								isEnd: swiper.isEnd
							});
						});
						/**/
					}
	
					const currentScene = sceneFactory.createScene({
						triggerElement: sceneElem,
						//offset: $('#home').height()/2,
						offset: 0,
						duration: sceneDuration,
						triggerHook: (sceneElemName === 'About') ? .1 : 0.9,
						//triggerHook: 'onEnter',
						setPin: (sceneElemName === 'About') ? false : false,
						setTween: scene.TimeLineScene,
						addTo: controller,
						toggleClass: 'visible'
					}, scroll);
	
					currentScene.on('enter', () => {
						console.log(`${sceneElemName} Entered`);

						if( sceneElemName === 'About' && aboutSwiper !== null ) {
							aboutSwiper.attachEvents();

							scroll.scrollbar.scrollIntoView(document.querySelector(`#about-us`), {
								offsetTop: 25
							});
						}
					});
	
					currentScene.on('leave', () => {
						console.log(`${sceneElemName} Left`);

						if( sceneElemName === 'About' && aboutSwiper !== null ) {
							aboutSwiper.detachEvents();
						}
					});
	
					// background visuals
					/**/
					//const BGScene = $(scene.element);
					const visual = sceneElem.getAttribute('data-visual');
	
					if ( visual ) {
						const s = new ScrollMagic.Scene({
							triggerElement: sceneElem,
							duration: '200%',
							triggerHook: 'onEnter'
						}).addTo(controller);
	
						s.on('enter', (e) => {
							$('.' + visual).show();
						});
	
						s.on('leave', (e) => {
							$('.' + visual).hide();
						});
					}
					/**/
	
				}
	
			});

			return;
	
		} else {
			$('html').addClass('no-custom-scroll');
		}
	}

	function addSectionCallbacks2(timeline, { start, end, param, onEnter, onLeave, onEnterBack, onLeaveBack }) {
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

	$(window).on("load", ()=> {
		
		preloadAssets( (lplyr)=>{

			if( lplyr === false ) {

				document.body.classList.remove('js-loading');
				document.body.classList.add('js-loaded');
				$("#ax-loader-wrap").fadeOut(500);

			} else {

				const t1 = setTimeout( ()=>{
					// eslint-disable-next-line no-use-before-define
					const t2 = setTimeout( ()=>{
						document.body.classList.remove('js-loading');
						document.body.classList.add('js-loaded');

						createScenes((results)=>{
							$("#ax-loader-wrap").fadeOut(500, ()=>{
								lplyr.stop();
							});

							clearInterval(t2);
						});
						
					}, 2500);

					clearInterval(t1);

				}, 1000 );
			}

			//OdoObjectFit.cover(document.querySelector('.js-home-video'));
			
		});
	});

	document.addEventListener("DOMContentLoaded", () => {
	("use strict");

	var windowOn = $(window);
	let larger = 1600;
	let xxl = 1400;
	let xl = 1200;
	let lg = 992;
	let md = 768;
	let sm = 576;
	let device_width = window.innerWidth;

	/*======================================
	04. Sticky Header Js
	========================================*/
	windowOn.on("scroll", function () {

		const hero = $('.hero-3-area').height();
		const scroll = $(window).scrollTop();
		if (scroll < parseInt(hero)) { //if (scroll < 100) {
			$("#header-sticky").removeClass("sticky");
		} else {
			$("#header-sticky").addClass("sticky");
		}

		
	});

	/*======================================
	05. Data Background
	========================================*/
	$("[data-background]").each(function () {
		$(this).css(
			"background-image",
			"url( " + $(this).attr("data-background") + "  )"
		);
	});

	/*======================================
	06. Data mask
	========================================*/
	$("[data-mask").each(function () {
		$(this).css("-webkit-mask-image", "url( " + $(this).attr("data-mask") + "  )");
		$(this).css("mask-image", "url( " + $(this).attr("data-mask") + "  )");
	});


	/*======================================
	11. magnificPopup js 
	========================================*/
	/* magnificPopup img view */
	$(".popup-image").magnificPopup({
		type: "image",
		gallery: {
			enabled: true,
		},
	});

	/* magnificPopup video view */
	$(".popup-video").magnificPopup({
		// disableOn: 700,
		preloader: true,
		type: 'iframe',
		mainClass: '.popup-video',
		// removalDelay: 160,
		preloader: true,
		fixedContentPos: true
	});

	/*======================================
	20. video play 
	========================================*/
	if ($(".video-area").length > 0) {
		const video = document.getElementById("video");
		const circlePlayButton = document.getElementById("circle-play-b");
		const videoOverlay = document.getElementById("video__overlay");
		const areaBtnText = document.getElementById("area-btn-text");

		function togglePlay() {
			if (video.paused || video.ended) {
				video.play();
			} else {
				video.pause();
			}
		}

		circlePlayButton.addEventListener("click", togglePlay);
		video.addEventListener("playing", function () {
			circlePlayButton.style.opacity = 0;
			areaBtnText.style.opacity = 0;
			videoOverlay.classList.add("closed");
		});
		video.addEventListener("pause", function () {
			circlePlayButton.style.opacity = 1;
			areaBtnText.style.opacity = 1;
			videoOverlay.classList.remove("closed");
		});
	}

    // Scroll To Section

    // document.querySelectorAll("nav button").forEach((btn, index) => {
    //     btn.addEventListener("click", () => {
    //       gsap.to(window, {duration: 1, scrollTo:{y:"#section" + (index + 1), offsetY:70}});
    //     });
    // });

	/*======================================
	42. portfolio Section
	========================================*/
	if (device_width > 1199) {
		return;
		var portfolio__wrapper = document.querySelector('.portfolio__wrapper');
		if (portfolio__wrapper) {

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

			sections.forEach((section, index) => {
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

				/** /
				const scene = new ScrollMagic.Scene({
					triggerElement: portfolio__wrapper,
					duration: '600%',
					offset: 0,
					triggerHook: 'onEnter',
				})
				.setTween(tween)
				.addTo(controller)
				.setClassToggle( section, 'visible');
		
				//scrollParent.options.scenes.push(scene);
				/**/
			});

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
		}
	}

	/*======================================
	54. Hero-3 Image Animation JS
	========================================*/

	const hero_3_imgs = gsap.utils.toArray(".hero-3_wrapper");
	if (hero_3_imgs.length > 0) {
		var hero_3_img = gsap.utils.toArray(".hero-3_wrapper");
	}
	else {
		var hero_3_img = gsap.utils.toArray("#hero-3_wrapper");
	}
	const hero_3_img_cirlce = gsap.utils.toArray(".hero-3-item");
	hero_3_img.forEach((btn, i) => {
		$(btn).mousemove(function (e) {
			callParallax(e);
		});
		function callParallax(e) {
			parallaxIt(e, hero_3_img_cirlce[i], 500);

			if (device_width < 1600 && device_width > 1400) {
				parallaxIt(e, hero_3_img_cirlce[i], 200);
			}
			if (device_width < 1400 && device_width > 1200) {
				parallaxIt(e, hero_3_img_cirlce[i], 80);
			}
			if (device_width < 1200 && device_width > 992) {
				parallaxIt(e, hero_3_img_cirlce[i], 50);
			}
			if (device_width < 992 && device_width > 0) {
				parallaxIt(e, hero_3_img_cirlce[i], 0);
			}

		}

		function parallaxIt(e, target, movement) {
			var $this = $(btn);
			var relX = e.pageX - $this.offset().left;
			var relY = e.pageY - $this.offset().top;

			gsap.to(target, 0.5, {
				x: ((relX - $this.width() / 2) / $this.width()) * movement,
				y: ((relY - $this.height() / 2) / $this.height()) * movement,
				ease: Power2.easeOut,
			});
		}
		$(btn).mouseleave(function (e) {
			gsap.to(hero_3_img_cirlce[i], 0.5, {
				x: 0,
				y: 0,
				ease: Power2.easeOut,
			});
		});
	});

	/*----------------------------------------
	 55. Slider activation Js 
	 Personal Portfolio Hero Slider Activation
	-----------------------------------------*/
	if (jQuery(".slider-active").length > 0) {
		let slider_active = new Swiper(".slider-active", {
			slidesPerView: 1,
			loop: true,
			effect: 'fade',
			autoplay: true,
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
		});
	}

	/*======================================
	56. Progress Bar Animation JS
	========================================*/
	if (device_width > sm) {
		const ax_progress_bar = document.querySelectorAll('.progress__wrapper');
		ax_progress_bar.forEach((element) => {

			const w = element.querySelector('.progress__border');
			const p = element.querySelector('.progress__percent');

			const target = p.textContent;

			const ax_bartl = gsap.timeline({
				defaults: {
					duration: 2,
				},
				scrollTrigger: {
					trigger: element,
				}
			});

			ax_bartl.fromTo(w, { width: 0 }, {
				width: target,
			});
			ax_bartl.from(p, {
				textContent: 0 + "%",
				snap: { textContent: 5 },
			}, "<");
		})
	}

	});
    
})(jQuery);

// Copyright © 2024 Lobengula Advertising