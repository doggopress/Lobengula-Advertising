/***************************************************
==================== JS INDEX ======================
****************************************************

Copyright © 2024 Lobengula Advertising

****************************************************/

import $ from 'jquery';
import 'scripts/vendor/bootstrap.bundle.min';

import Scroll from 'scripts/components/scroll.js';
import ScrollMagic from 'scrollmagic';

import SceneFactory from 'scripts/helpers/animation.scene.factory.js';
import * as AnimationScenes from 'scripts/app.animations.js';

import { gsap } from 'gsap';

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

const CUSTOM_SCROLLBAR = true;

(function ($) {

	("use strict");

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

		const sectionHome = document.querySelector('#home');
		const portfolio__area = document.querySelector('.portfolio__area');
		const sectionWWD = document.querySelector('#what-we-do');
		const sectionOurWork = document.querySelector('#our-work');
		const projects = document.querySelector('.project-area-2');
		const team__area = document.querySelector('#our-team');
		const sectionContact = document.querySelector('#contact');
		

		new MouseCursor();
		new MenuMobile();
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

			

			if( sectionHome ) {
				TLscenes.push({TimeLineScene: AnimationScenes.TLNavigation(sectionHome), element: '#home'});
			}
			if( sectionWWD && document.body.classList.contains('page-home') ) {
				TLscenes.push({TimeLineScene: AnimationScenes.TLNavigation(sectionWWD), element: '#what-we-do'});
			}
			if( sectionOurWork ) {
				TLscenes.push({TimeLineScene: AnimationScenes.TLNavigation(sectionOurWork), element: '#our-work'});
				TLscenes.push({TimeLineScene: AnimationScenes.TLsceneProject(), element: '.project-area-2'});
			}
			if( sectionContact ) {
				TLscenes.push({TimeLineScene: AnimationScenes.TLNavigation(sectionContact), element: '#contact'});
			}

			
			if( portfolio__area ) {
				//return;
				TLscenes.push(
					{
						TimeLineScene: AnimationScenes.TLsceneAboutUs(), 
						element: '.portfolio__area'
					}
				);
			}

			
			if( team__area ) {
				//return;
				TLscenes.push(
					{
						TimeLineScene: AnimationScenes.TLsceneAboutUs(), 
						element: '#our-team'
					}
				);
			}
	
			TLscenes.forEach((scene, index )=>{
	
				const sceneElem = document.querySelector(scene.element);
				const sceneElemName = sceneElem.getAttribute('data-anchor').toLowerCase();
	
				const sceneDuration = sceneElem.getAttribute('data-duration');
	
				if ( sceneElem ) {

					//let aboutSwiper = (sceneElemName === 'About') ? new AboutSlider() : null;
					let aboutSwiper = null,
						teamSlider = null;

					if( (sceneElemName === 'about-us') ) {
						aboutSwiper = new AboutSlider();
						//console.log(aboutSwiper);
						aboutSwiper.detachEvents();

						/**/
						aboutSwiper.on('slideChange', (swiper) => {
							console.log('slide changed', {
								activeIndex: swiper.activeIndex, 
								isEnd: swiper.isEnd
							});

							scroll.scrollbar.scrollIntoView(document.querySelector(`#about-us`), {
								offsetTop: 0
							});
						});
						/**/
					}

					if( (sceneElemName === 'our-team') ) {
						teamSlider = new TeamSlider();
						teamSlider.detachEvents();
					}
	
					const currentScene = sceneFactory.createScene({
						triggerElement: sceneElem,
						//offset: $('#home').height()/2,
						//offset: (sceneElemName === 'about-us' || sceneElemName === 'our-team') ? 0 : $(`#${sceneElemName}`).height(),
						offset: 0,
						duration: sceneDuration,
						triggerHook: (sceneElemName === 'about-us') ? 0.1 : 0.9,
						//triggerHook: 'onEnter',
						setPin: (sceneElemName === 'about-us') ? false : false,
						setTween: scene.TimeLineScene,
						addTo: controller,
						toggleClass: 'visible'
					}, scroll); 
	
					currentScene.on('enter', () => {
						console.log(`${sceneElemName} Entered`);

						//document.body.classList.add(`page-active-${sceneElemName}`);
						const menuBtn = document.querySelector(`.main-menu ul li a[href="#${sceneElemName}"`);
						//const menuBtnMobi = document.querySelector(`.sidebar-menu-area .menu-list .menu-item a[href="#${sceneElemName}"`);
						if( menuBtn ) {
							menuBtn.classList.add('active');
						}
						//if( menuBtnMobi ) {
						//	menuBtnMobi.classList.add('active');
						//}

						if( sceneElemName === 'about-us' && aboutSwiper !== null ) {
							aboutSwiper.attachEvents();

							/**/
							if ( !document.body.classList.contains('about-in-view') ) {
								scroll.scrollbar.scrollIntoView(document.querySelector(`#about-us`), {
									offsetTop: 0
								});

								document.body.classList.add('about-in-view');
							}
							/**/
						}

						if( sceneElemName === 'our-team') {
							teamSlider.attachEvents();
							//scroll.scrollbar.scrollIntoView(document.querySelector(`#our-team`), {
							//	offsetTop: -100
							//});
						}
					});
	
					currentScene.on('leave', () => {
						console.log(`${sceneElemName} Left`);

						//document.body.classList.remove(`page-active-${sceneElemName}`);
						const menuBtn = document.querySelector(`.main-menu ul li a[href="#${sceneElemName}"`);
						if( menuBtn ) {
							menuBtn.classList.remove('active');
						}
						//const menuBtnMobi = document.querySelector(`.sidebar-menu-area .menu-list .menu-item a[href="#${sceneElemName}"`);
						//if( menuBtnMobi ) {
						//	menuBtnMobi.classList.add('active');
						//}

						if( sceneElemName === 'about-us' && aboutSwiper !== null ) {
							aboutSwiper.detachEvents();
							document.body.classList.remove('about-in-view');
						}
						if( sceneElemName === 'our-team') {
							teamSlider.detachEvents();
						}
					});
	
					// background visuals
					/** /
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