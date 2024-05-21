//import $ from 'jquery';
import Scrollbar, { ScrollbarPlugin } from 'smooth-scrollbar';

/**/
class DisableScrollPlugin extends ScrollbarPlugin {
	static pluginName = 'disableScroll';

	static defaultOptions = {
		direction: null,
	};

	transformDelta(delta) {
		if (this.options.direction) {
			delta[this.options.direction] = 0;
		}

		return { ...delta };
	}
}
/**/

export default class Scroll {

    constructor(options = {}) {
        this.options = Object.assign({
            element: '.ck-site',
            scenes: [],
			disable: false,
            onRefresh: (evt) => {},
			onInit: (evt) => {}


        }, options);

        this.direction = null;

        this.initScrollbar();

		this.initEvents();

        this.tolerance = 300;

		this.scrollPos = 0;

        //$('body').removeClass('nav-is-hidden');

    }

	isInViewport(element) {
		if ( element === undefined ) {
			return false;
		} else {
			const rect = element.getBoundingClientRect();
			return (
				rect.top >= 0 &&
				rect.left >= 0 &&
				rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
				rect.right <= (window.innerWidth || document.documentElement.clientWidth)
			);
		}
	}

	viewportAnimationsToggle() {

		const	sectionHome = document.getElementById('home'),
				sectionAbout = document.getElementById('about-us'),
				sectionServices = document.getElementById('what-we-do'),
				sectionWork = document.getElementById('our-work'),
				sectionTeam = document.getElementById('our-team'),
				sectionContact = document.getElementById('contact');
				

		if ( sectionHome && this.isInViewport(sectionHome) ) {
			document.body.classList.add('page-active-home');
		} else {
			//document.body.classList.remove('page-active-home');
		}

		if ( sectionAbout && this.isInViewport(sectionAbout) ) {
			document.body.classList.add('page-active-about');
		} else {
			//document.body.classList.remove('page-active-about');
		}

		if ( sectionServices && this.isInViewport(sectionServices) ) {
			document.body.classList.add('page-active-services');
		} else {
			//document.body.classList.remove('page-active-services');
		}

		if ( sectionWork && this.isInViewport(sectionWork) ) {
			document.body.classList.add('page-active-work');
		} else {
			//document.body.classList.remove('page-active-work');
		}

		if ( sectionTeam && this.isInViewport(sectionTeam) ) {
			document.body.classList.add('page-active-team');
		} else {
			//document.body.classList.remove('page-active-team');
		}

		if ( sectionContact && this.isInViewport(sectionContact) ) {
			document.body.classList.add('page-active-contact');
		} else {
			//document.body.classList.remove('page-active-contact');
		}
	}

    initEvents(){
        // eslint-disable-next-line no-underscore-dangle
        let _this = this;

        this.scrollbar.addListener((status) => {

            _this.options.scenes.forEach((scene) => {
                scene.refresh();
            });

			//
			if ( !status ) {
				return;
			}

			if (status.offset.y <= 1) {

				//document.body.classList.remove('scroll-active');
				document.body.classList.remove('scroll-up');
				document.body.classList.remove('scroll-down');

				//return;

			} else {

				//document.body.classList.add('scroll-active');

			}

			// detects new state and compares it with the new one
			if (status.offset.y < this.scrollPos ) {

				if (status.offset.y > 1) {
					document.body.classList.add('scroll-up');
					document.body.classList.remove('scroll-down');
				}

			} else {
				document.body.classList.remove('scroll-up');
				document.body.classList.add('scroll-down');

			}

			this.scrollPos = status.offset.y;

			//this.viewportAnimationsToggle();

        });

		const scrollBtn = document.querySelector('.scroll-btn a');
		if( scrollBtn ) {
			scrollBtn.addEventListener('click', (evt)=>{

				evt.preventDefault();

				this.scrollbar.scrollIntoView(document.getElementById('about-us'), {
					offsetTop: 25
				});

			});
		}

		document.querySelectorAll('#mobile-menu ul li a').forEach((btn, index) => {
			btn.addEventListener('click', (evt) => {

				evt.preventDefault();

				const sectionId = evt.currentTarget.getAttribute('href');
				if( sectionId ) {
					//gsap.to(window, {duration: 1, scrollTo:{y:'#section' + (index + 1), offsetY:70}});
					if( document.body.classList.contains('page-home') ) {
						this.scrollbar.scrollIntoView(document.querySelector(sectionId), {
							offsetTop: 25
						});
					} else {
						//window.location.href=
						window.open(`${window.location.origin}/${sectionId}`,'_self'); 
					}
				}
			});
		});

		document.querySelectorAll('.sidebar-menu-area ul li a').forEach((btn, index) => {
			btn.addEventListener('click', (evt) => {

				evt.preventDefault();

				const sectionId = evt.currentTarget.getAttribute('href');
				if( sectionId ) {
					//gsap.to(window, {duration: 1, scrollTo:{y:'#section' + (index + 1), offsetY:70}});
					if( document.body.classList.contains('page-home') ) {
						this.scrollbar.scrollIntoView(document.querySelector(sectionId), {
							offsetTop: 25
						});
					} else {
						//window.location.href=
						window.open(`${window.location.origin}/${sectionId}`,'_self'); 
					}
				}

				
			});
		});

		document.querySelectorAll('.link-home').forEach((btn, index) => {
			btn.addEventListener('click', (evt) => {

				evt.preventDefault();

				const sectionId = evt.currentTarget.getAttribute('href');
				if( sectionId ) {
					//gsap.to(window, {duration: 1, scrollTo:{y:'#section' + (index + 1), offsetY:70}});
					if( document.body.classList.contains('page-home') ) {
						this.scrollbar.scrollIntoView(document.querySelector(sectionId), {
							offsetTop: 25
						});
					} else {
						//window.location.href=
						window.open(`${window.location.origin}/${sectionId}`,'_self'); 
					}
				}

				
			});
		});

		document.querySelectorAll('.scroll-navigation').forEach((btn, index) => {
			btn.addEventListener('click', (evt) => {

				evt.preventDefault();

				const sectionId = evt.currentTarget.getAttribute('data-target');
				if( sectionId ) {
					this.scrollbar.scrollIntoView(document.querySelector(sectionId), {
						offsetTop: 25
					});
				}

				
			});
		});


		// Fragment exists?
		if(window.location.hash) {
			
			//Puts hash in variable, and removes the # character
			const hash = window.location.hash.substring(1); 
			this.scrollbar.scrollIntoView(document.querySelector(`#${hash}`), {
				offsetTop: 25
			});

			this.options.onInit();

		} else {
			// Fragment doesn't exist
			this.options.onInit();
		}

	}

    initScrollbar(){
		// eslint-disable-next-line no-underscore-dangle
        let _this = this;

		Scrollbar.use(DisableScrollPlugin);

        //if ( $('.js-scrollbar').length !== 0) {
            this.scrollbar = Scrollbar.init(document.querySelector(_this.options.element), {
                damping: 0.05,
				overscrollEffect: 'bounce',
				alwaysShowTracks: false,
				continuousScrolling: false,
				plugins: {
					disableScroll: { direction: 'x' }
				}
            });
			this.scrollbar.track.xAxis.element.remove();
       // }

		this.scrollbar.limit.x = 0;
		this.scrollbar.track.update();

		//this.scrollbar.update();

		//console.log('this.scrollbar:', this.scrollbar);

    }

	disableScrollbar(){
		this.scrollbar.unregisterEvents(/./);
	}

	enableScrollbar(){
		this.scrollbar.registerEvents(/./);
	}

    toleranceExceeded(currentScrollY) {
		return Math.abs(currentScrollY - this.lastKnownScrollY) >= this.tolerance;
    }

}
