import $ from 'jquery';
import 'scripts/vendor/meanmenu';
import 'scripts/vendor/swiper.bundle.min';

export default class MenuMobile {

	constructor() {

		$('#mobile-menu').meanmenu({
			meanMenuContainer: '.mobile-menu',
			meanScreenWidth: "991",
			meanExpand: ['<i class="fal fa-plus"></i>'],
		});
	
		$("#mobile-menu-media-all").meanmenu({
			meanMenuContainer: ".mobile-menu-media-all",
			meanScreenWidth: "8000",
			meanExpand: ['<i class="fal fa-plus"></i>'],
			meanContract: ['<i class="fal fa-minus"></i>'],
		});

		/*======================================
		03. Sidebar
		========================================*/
		$(".sidebar-toggle-btn").on("click", function () {
			$(".sidebar__area").addClass("sidebar-opened");
			$(".body-overlay").addClass("opened");
		});
		$(".sidebar__close-btn").on("click", function () {
			$(".sidebar__area").removeClass("sidebar-opened");
			$(".body-overlay").removeClass("opened");
		});
	}
}