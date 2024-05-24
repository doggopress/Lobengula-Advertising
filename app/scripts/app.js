/***************************************************
==================== JS INDEX ======================
****************************************************

Copyright © 2024 Lobengula Advertising

****************************************************/

import $ from 'jquery';
import 'scripts/vendor/bootstrap.bundle.min';

import 'lazysizes';

import Scroll from 'scripts/components/scroll.js';
import ScrollMagic from 'scrollmagic';

import SceneFactory from 'scripts/helpers/animation.scene.factory.js';
import * as AnimationScenes from 'scripts/app.animations.js';

import { gsap } from 'gsap';

import 'magnific-popup';
import 'vanilla-cookieconsent';
import '@lottiefiles/lottie-player';
//import { create } from '@lottiefiles/lottie-interactivity';
import 'scripts/components/sidebar';
import 'scripts/components/backToTop';
import 'scripts/components/service-accordion.js';


import ContactForm from 'scripts/components/ajax-form.js';
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
	//console.error = function(){};
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

	function loadLottieIcon(icon) {
		return new Promise( async (resolve, reject) => {

			let lottiePlayerIconWarrior = document.querySelector(`#brand-icon-${icon}`);
			lottiePlayerIconWarrior.load(`https://cdn.cloud5ive.io/lobengula/lottie/ci_icons/${icon}.json`);

			lottiePlayerIconWarrior.addEventListener(`ready`, () => {
				resolve(lottiePlayerIconWarrior);
			});
		
		});
	}

	function lottieScrub( results, swiper, progress ) {

		/** /
		let seek1 = Math.round(
			parseInt(
				(progress * 100).toFixed(0)
			)
		);

		animation.seek(
			`${seek1}%`
		);
		/**/

		let animation;

		switch (swiper.activeIndex) {

			// WARRIOR
			case 2:

				let seek1 = Math.round(
					//progress * 100
					parseInt(
						(progress * 110).toFixed(0)
					)
				);

				animation = results[0];

				/** /
				console.log('Scrubbing warrior animation:', {
					activeIndex: swiper.activeIndex, 
					progress: progress,
					seek: seek1
				});
				/**/

				animation.seek(
					`${seek1}%`
				);
				break;
			// MAP
			case 3:

				let seek2 = Math.round(
					parseInt(
						(progress * 100).toFixed(0)
					)
				);
				animation = results[1];
				
				animation.seek(
					`${seek2}%`
				);
				break;
			// HUT
			case 4:

				let seek3 = Math.round(
					parseInt(
						(progress * 100).toFixed(0)
					)
				);

				animation = results[2];
				
				animation.seek(
					`${seek3}%`
				);
				break;
			// BOWL
			case 5:
			
				let seek4 = Math.round(
					parseInt(
						(progress * 100).toFixed(0)
					)
				);

				animation = results[3];
				
				animation.seek(
					`${seek4}%`
				);
				break;
		}

	}

	function createScenes( callback ) {

		//let scroll;
		let aboutInitialised = false;
		let aboutSwiper = null,
			teamSlider = null;

		const sectionHome = document.querySelector('#home');
		const portfolio__area = document.querySelector('.portfolio__area');
		const sectionWWD = document.querySelector('#what-we-do');
		const sectionOurWork = document.querySelector('#our-work');
		const team__area = document.querySelector('#our-team');
		const sectionContact = document.querySelector('#contact');
		

		new MouseCursor();
		new MenuMobile();
		new TextScrollSlider();

		function aboutSwiperRefresh() {

			if( aboutSwiper  && aboutInitialised === true ) {
				aboutSwiper.update();

				scroll.scrollbar.scrollIntoView(document.querySelector(`#about-us`), {
					offsetTop: -20
				});
			}
		}

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
			if( portfolio__area ) {
				//return;
				TLscenes.push(
					{
						TimeLineScene: AnimationScenes.TLsceneAboutUs(), 
						element: '.portfolio__area'
					}
				);
			}
			if( sectionWWD && document.body.classList.contains('page-home') ) {
				TLscenes.push({TimeLineScene: AnimationScenes.TLNavigation(sectionWWD), element: '#what-we-do'});
			}
			if( sectionOurWork ) {
				TLscenes.push({TimeLineScene: AnimationScenes.TLNavigation(sectionOurWork), element: '#our-work'});
				TLscenes.push({TimeLineScene: AnimationScenes.TLsceneProject(), element: '.project-area-2'});
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
			if( sectionContact ) {
				TLscenes.push({TimeLineScene: AnimationScenes.TLNavigation(sectionContact), element: '#contact'});
			}
	
			TLscenes.forEach( async (scene, index )=>{
	
				const sceneElem = document.querySelector(scene.element);
				const sceneElemName = sceneElem.getAttribute('data-anchor').toLowerCase();
	
				const sceneDuration = sceneElem.getAttribute('data-duration');
	
				if ( sceneElem ) {

					//let aboutSwiper = (sceneElemName === 'About') ? new AboutSlider() : null;
					//let aboutSwiper = null,
					//	teamSlider = null;

					if( (sceneElemName === 'about-us') ) {

						//const ply = await loadLottieIcons();
						//const ply = document.querySelector("#brand-icon-warrior");

						//console.log('ply:', ply);

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

						/*
						aboutSwiper.on('progress', (swiper, progress) => {
							
							switch (swiper.activeIndex) {
								case 2:

									//const totalFrames = animation.getLottie().totalFrames;

									console.log('slide changing', {
										activeIndex: swiper.activeIndex, 
										progress: progress
									});

									ply.seek( 
										Math.round(
											parseInt(
												(progress * 100).toFixed(0)
											)
										)
									);
	
									
									break;
							
								default:
									break;
							}
							
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
							//aboutSwiper.attachEvents();
							//window.addEventListener( 'resize', aboutSwiperRefresh );

							/**/
							if ( !document.body.classList.contains('about-in-view') ) {

								//aboutSwiper.slideTo(0,5000,false);

								//setTimeout(()=>{

									scroll.scrollbar.scrollIntoView(document.querySelector(`#about-us`), {
										offsetTop: 0
									});

									document.body.classList.add('about-in-view');
								//}, 5000);
							} else {
								//aboutSwiper.slideTo(0,5000,false);
							}
							/**/

							if( [undefined, null, false].includes(aboutInitialised) === true ) {

								Promise.all([
									loadLottieIcon('warrior'),
									loadLottieIcon('map'),
									loadLottieIcon('hut'),
									loadLottieIcon('bowl')
								])
								.then( (results) =>{

									aboutInitialised = results;

									//let animation;
									aboutSwiper.on('progress', (swiper, progress) => {

										lottieScrub(results, swiper, progress);

									});

								});
							}
							
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
							//window.removeEventListener( 'resize', aboutSwiperRefresh );
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

		const Form = new ContactForm();

		Form.submitForm({
			onError: (evt)=> {
				console.error('FORM ERROR:', error);
			},
			onSuccess: (evt)=> {
				console.log('FORM SUBMITTED SUCCESSFULLY.');
			}
		});
	
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
		20. video play 
		========================================* /
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

		/**/
		$(".popup-video").on('click', (evt)=>{
			evt.preventDefault();

			const link = evt.currentTarget;

			if( link ) {
				const url = link.getAttribute('href');
				$.magnificPopup.open({
					preloader: true,
					fixedContentPos: true,
					mainClass: 'mfp-fade',
					// Delay in milliseconds before popup is removed
  					removalDelay: 300,
					items: {
						src: `
						<div class="white-popup">
							<span class="icon-box">
								<svg width="24" height="26" viewBox="0 0 24 26" fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M23.1646 13L0.66455 25.9904L0.664551 0.00961778L23.1646 13Z"
										fill="white"></path>
								</svg>
							</span>
							<video
								crossorigin="anonymous"
								preload="metadata"
								disablepictureinpicture
								disableremoteplayback
								class="js-wwd-video"
								playsinline autoplay controls controlslist="nodownload noremoteplayback noplaybackrate">
									<source src="${url}" type="video/mp4" media="all and (max-width: 768px)" >
									<source src="${url}" type="video/mp4" media="all and (min-width: 769px)" >
							</video>
						</div>`, // can be a HTML string, jQuery object, or CSS selector
						type: 'inline'
					},
					callbacks: {
						open: function() {
							// Will fire when this exact popup is opened
							// this - is Magnific Popup object
							const video = document.querySelector('.mfp-content video');
							const circlePlayButton = document.querySelector(".mfp-content .icon-box");

							console.log('VIDEO OPEN:', video, this );
							if( video ) {

								if( circlePlayButton ) {

									circlePlayButton.addEventListener('click', (evt)=>{
										video.play();
									});
								}

								video.play();
								video.addEventListener("playing", function () {
									circlePlayButton.style.opacity = 0;
								});
								video.addEventListener("pause", function () {
									circlePlayButton.style.opacity = 1;
								});
								video.addEventListener("ended", function () {
									circlePlayButton.style.opacity = 1;
								});
							}
						},
						close:  () => {
							// Will fire when popup is closed
							//video.removeEventListener();
							console.log('VIDEO CLOSED:');
						},
						updateStatus: function(data) {
							console.log('Status changed', data);
							// "data" is an object that has two properties:
							// "data.status" - current status type, can be "loading", "error", "ready"
							// "data.text" - text that will be displayed (e.g. "Loading...")
							// you may modify this properties to change current status or its text dynamically
						},
						imageLoadComplete: function() {
							// fires when image in current popup finished loading
							// avaiable since v0.9.0
							console.log('Image loaded');
						},
					}
				});
			}
		});
		/**/

		/** /
		$(".popup-video").magnificPopup({
			// disableOn: 700,
			preloader: true,
			type: 'iframe',
			mainClass: '.popup-video',
			// removalDelay: 160,
			preloader: true,
			fixedContentPos: true,
			callbacks: {
				open: function() {
					// Will fire when this exact popup is opened
					// this - is Magnific Popup object
					const video = document.querySelector('.mfp-content video');
					console.log('VIDEO OPEN:', video, this );
					if( video ) {
						video.play();
					}
				},
				close:  () => {
					// Will fire when popup is closed
					console.log('VIDEO CLOSED:');
				},
				updateStatus: function(data) {
					console.log('Status changed', data);
					// "data" is an object that has two properties:
					// "data.status" - current status type, can be "loading", "error", "ready"
					// "data.text" - text that will be displayed (e.g. "Loading...")
					// you may modify this properties to change current status or its text dynamically
				},
				imageLoadComplete: function() {
					// fires when image in current popup finished loading
					// avaiable since v0.9.0
					console.log('Image loaded');
				},
			}
		});
		/**/

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