import $ from 'jquery';

export default class MouseCursor {

	constructor() {

		this.device_width = window.innerWidth;

		var myCursor = $(".mouseCursor");
		if (myCursor.length) {
			if ($("body")) {
				const e = document.querySelector(".cursor-inner"),
					t = document.querySelector(".cursor-outer");
				let n, i = 0,
					o = !1;
				(window.onmousemove = function (s) {
					o ||
						(t.style.transform =
							"translate(" + s.clientX + "px, " + s.clientY + "px)"),
						(e.style.transform =
							"translate(" + s.clientX + "px, " + s.clientY + "px)"),
						(n = s.clientY),
						(i = s.clientX);
				}),
					$("body").on("mouseenter", "button, a, .cursor-pointer", function () {
						e.classList.add("cursor-hover"), t.classList.add("cursor-hover");
					}),
					$("body").on("mouseleave", "button, a, .cursor-pointer", function () {
						($(this).is("a", "button") &&
							$(this).closest(".cursor-pointer").length) ||
							(e.classList.remove("cursor-hover"),
								t.classList.remove("cursor-hover"));
					}),
					(e.style.visibility = "visible"),
					(t.style.visibility = "visible");
			}
		}

        this.initEvents()
	}

	initEvents() {

		$(".slider-drag").on("mouseenter", function () {
			$(".mouseCursor").addClass("cursor-big");
		});
		$(".slider-drag").on("mouseleave", function () {
			$(".mouseCursor").removeClass("cursor-big");
		});

		if (this.device_width > 576) {
			const workContentItem = document.querySelectorAll(".work__item-list");
	
			function followContentCursor(event, workContentItem) {
				const contentBox2 = workContentItem.getBoundingClientRect();
				const dx = event.clientX - contentBox2.x;
				const dy = event.clientY - contentBox2.y;
				workContentItem.children[1].style.transform = `translate(${dx}px, ${dy}px)`;
			}
			workContentItem.forEach((item, i) => {
				item.addEventListener("mousemove", (event) => {
					setInterval(followContentCursor(event, item), 1000);
				});
			});
		}
	}
}