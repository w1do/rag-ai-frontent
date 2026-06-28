/*-----------------------------------------------------------------------
Template Name      : Pexora - Ai Agency & Saas Technology HTML Template
Author             : pus_infotech
Author Portfolio   : https://themeforest.net/user/pus_infotech
Version            : 1.0.0 
-------------------------------------------------------------------------
JS TABLE OF CONTENTS
-------------------------------------------------------------------------
1. search-box
2. mobile menu
3. offcanvas sidebar
4. header sticky
5. background image
6. hero slider
7. services slider
8. courses slider
9. testimonials slider one
10. testimonials slider three
11. micon mouseover
12. partners slider
13. team slider
14. shop related slider
15. related slider two
16. gallery magnificPopup
17. video magnificPopup
18. authentication password view
19. counter
20. syotimer
21. progress bar count
22. quantity
23. mousecursor
24. wow animation 
25. scroll to top
26. back-top
27. donation
28. preloader
-----------------------------------------------------------------------*/
(function($) {
    "use strict";      
    // start document ready function
    $(document).ready( function() {
        // ------------------------ 1. search-box
		$(document).on("click", ".search-btn, .close", function (e) {
			e.preventDefault(); // stop anchor from scrolling to top
			$("#search-box").toggleClass("active", $(this).hasClass("search-btn"));
		});  

        // ------------------------ 2. mobile menu
		$("#mobile-menu").meanmenu({
            meanMenuContainer: '.mobile-menu',
            meanScreenWidth: "1199",
            meanExpand: '<i class="fa-solid fa-plus"></i>',
        }); 

		// ------------------------ 3. offcanvas sidebar		 
		$(document).on("click", "#offcanvas-sidebar li.dropdown .dropdown-btn", function () {
			$(this).toggleClass('open');
			$(this).prev('ul').slideToggle(500);
		});

		// ------------------------ 4. header sticky	 
		$(window).on("scroll", function() {
            if ($(this).scrollTop() > 250) {
                $(".header .header-lower").addClass("sticky");
            } else {
                $(".header .header-lower").removeClass("sticky");
            }
        });

        // ------------------------ 5. background image
		$("[data-img-src]").each(function () {
			var src = $(this).attr("data-img-src");
			$(this).css('background-image', 'url(' + src + ')');
			$(this).removeAttr("data-img-src");
		});

        // ------------------------ 6. hero slider
		if($('.hero-slider').length > 0) {
            const heroSlider = new Swiper(".hero-slider", {
				loop: true,  
				slidesPerView: 1,
				spaceBetween: 30,
				autoplay: {
					delay: 5000,
					disableOnInteraction: false,
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				pagination: {
                    el: ".dot",
                    clickable: true,
                },
            });
        } 

		// ------------------------ 7. services slider
		if($('.services-slider').length > 0) {
            const servicesSlider = new Swiper(".services-slider", {
                loop: true,
				slidesPerView: 1,
				spaceBetween: 24,
				autoplay: {
					delay: 3500,
					disableOnInteraction: false,
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				pagination: {
                    el: ".dot",
                    clickable: true,
                },
				breakpoints: {
					1920: {
						slidesPerView: 4,
					},
					1400: {
						slidesPerView: 4,
					},
					1199: {
						slidesPerView: 3,
						spaceBetween: 20
					},
					991: {
						slidesPerView: 2,
						spaceBetween: 20
					},
					767: {
						slidesPerView: 2,
						spaceBetween: 20
					},
					567: {
						slidesPerView: 2,  
						spaceBetween: 20
					},
					360: {
						slidesPerView: 1,  
						spaceBetween: 20
					},
					320: {
						slidesPerView: 1,  
						spaceBetween: 20
					}
				},
            });
        } 

		// ------------------------ 8. courses slider
		if($('.courses-slider').length > 0) {
            const coursesSlider = new Swiper(".courses-slider", {
                loop: true,
				slidesPerView: 1,
				spaceBetween: 24,
				autoplay: {
					delay: 3500,
					disableOnInteraction: false,
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				pagination: {
                    el: ".dot",
                    clickable: true,
                },
				breakpoints: {
					1920: {
						slidesPerView: 3,
					},
					1366: {
						slidesPerView: 3,
						spaceBetween: 20
					}, 
					1199: {
						slidesPerView: 2,
						spaceBetween: 20
					},
					991: {
						slidesPerView: 2,
						spaceBetween: 20
					},
					767: {
						slidesPerView: 1,
						spaceBetween: 20
					},
					567: {
						slidesPerView: 1,  
						spaceBetween: 20
					},
					360: {
						slidesPerView: 1,  
						spaceBetween: 20
					},
					320: {
						slidesPerView: 1,  
						spaceBetween: 20
					}
				},
            });
        } 

		// ------------------------ 9. testimonials slider one
		if($('.testimonials-slider-one').length > 0) {
            const testimonialsSlider = new Swiper(".testimonials-slider-one", {
				loop: true,
				slidesPerView: 1,
				spaceBetween: 0,
				autoplay: {
					delay: 5500,
					disableOnInteraction: false,
				},	
				pagination: {
                    el: ".dot",
                    clickable: true,
                }
            });
        }

		// ------------------------ 10. testimonials slider three
		if($('.testimonials-slider-three').length > 0) {
            const testimonialsThreeSlider = new Swiper(".testimonials-slider-three", {
				loop: true,
				slidesPerView: 3,
				spaceBetween: 30,
				centeredSlides: true,
				autoplay: {
					delay: 3500,
					disableOnInteraction: false,
				},	
				pagination: {
                    el: ".dot",
                    clickable: true,
                },			
				breakpoints: { 
					320: {slidesPerView: 1,},
					567: {slidesPerView: 2,},
					768: {slidesPerView: 2,},
					991: {slidesPerView: 2,},
					1199: {slidesPerView: 3,},
				}
            });
        }  

		// ------------------------ 11. micon mouseover
		if ($(".micon-section").length) {
			$(document).on("mouseenter", ".micon-section .micon-items", function () {
				const $section = $(this).closest(".micon-section");
				$section.find(".micon-items").removeClass("active");
				$(this).addClass("active");
			});
			$(document).on("mouseleave", ".micon-section .micon-items", function () {
				const $section = $(this).closest(".micon-section");
				if ($section.find(".active").length > 1) {
					$(this).removeClass("active");
				}
			});
		}

		// ------------------------ 12. partners slider
		if($('.partners-slider').length > 0) {
            const partnersSlider = new Swiper(".partners-slider", { 
				loop: true,
				slidesPerView: 2,
				spaceBetween: 24,
				autoplay: {
					delay: 3500,
					disableOnInteraction: false,
				},
				breakpoints: { 
					320: {
						slidesPerView: 2,
						spaceBetween: 20
					},
					567: {
						slidesPerView: 2,
					},
					767: {
						slidesPerView: 3,
					}, 
					991: {
						slidesPerView: 4,
					},
					1199: {
						slidesPerView: 5,
					} 
				} 
            });
        }  

		// ------------------------ 13. team slider
		if($('.team-slider-one').length > 0) {
            const teamSliderOne = new Swiper(".team-slider-one", {
                loop: true,
				slidesPerView: 1,
				spaceBetween: 30,
				autoplay: {
					delay: 3500,
					disableOnInteraction: false,
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				pagination: {
                    el: ".dot",
                    clickable: true,
                },
				breakpoints: {  
					320: {
						slidesPerView: 1,
						spaceBetween: 20
					},
					767: {
						slidesPerView: 2,
						spaceBetween: 20
					},
					1199: {
						slidesPerView: 3,
						spaceBetween: 20
					}
				},
            });
        }
		
		// ------------------------ 14. shop related slider
		if($('.shop-related-slider').length > 0) {
            const relatedSlider = new Swiper(".shop-related-slider", {
                loop: true,
				slidesPerView: 1,
				spaceBetween: 30,
				autoplay: {
					delay: 3500,
					disableOnInteraction: false,
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				pagination: {
                    el: ".dot",
                    clickable: true,
                },
				breakpoints: {  
					320: {
						slidesPerView: 1,
						spaceBetween: 20
					},
					767: {
						slidesPerView: 2,
						spaceBetween: 20
					},
					1199: {
						slidesPerView: 4,
						spaceBetween: 20
					}
				},
            });
        }
		
		// ------------------------ 15. related slider two
		if($('.related-slider-two').length > 0) {
            const relatedSliderTwo = new Swiper(".related-slider-two", {
                loop: true,
				slidesPerView: 1,
				spaceBetween: 30,
				autoplay: {
					delay: 3500,
					disableOnInteraction: false,
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				pagination: {
                    el: ".dot",
                    clickable: true,
                },
				breakpoints: {  
					320: {
						slidesPerView: 1,
						spaceBetween: 20
					},
					767: {
						slidesPerView: 2,
						spaceBetween: 20
					},
					1199: {
						slidesPerView: 2,
						spaceBetween: 20
					}
				},
            });
        }

        // ------------------------ 16. gallery magnificPopup 
		if ($(".photo-popup").length) {
			var groups = {};
			$(".photo-popup").each(function () {
				var id = parseInt($(this).attr("data-group"), 10);
				if (!groups[id]) {
					groups[id] = [];
				}
				groups[id].push(this);
			}); 
			$.each(groups, function () {
				$(this).magnificPopup({
					type: "image",
					closeOnContentClick: true,
					closeBtnInside: false,
					gallery: {
						enabled: true
					}
				});
			});
		}

		// ------------------------ 17. video magnificPopup
		$(".video-popup").magnificPopup({
			type:"iframe",
			mainClass:"mfp-fade",
			removalDelay:160,
			preloader:false,
			fixedContentPos:true
		});

		// ------------------------ 18. authentication password view	 
		$(document).on("click", ".eye-icon", function () {
			var pwd = document.getElementById("password");
			if (pwd.type === "password") {
				pwd.type = "text";
				$(this).addClass("show");
			} else {
				pwd.type = "password";
				$(this).removeClass("show");
			}
		});

        // ------------------------ 19. counter
		$(".counter-item").appear(function () {
			var $count = $(this),
			p = $count.find(".counter-value").attr("data-stop"),
			q = parseInt($count.find(".counter-value").attr("data-speed"), 10);

			if (!$count.hasClass('counted')) {
				$count.addClass('counted');
				$({
					countNum: $count.find(".counter-value").text()
				}).animate({
					countNum: p
				}, {
					duration: q,
					easing: "linear",
					step: function () {
						$count.find(".counter-value").text(Math.floor(this.countNum));
					},
					complete: function () {
						$count.find(".counter-value").text(this.countNum);
					}
				});
			}
		});

		// ------------------------ 20. syotimer
		$(".coming-soon-timer").syotimer({
            year: 2026, // Show Year
            month: 12, // Show Month
            day: 15, // Show Day
            hour: 20, // Show Hour
            minute: 30 // Show Minute
        });

		// ------------------------ 21. progress bar count
		$(".progress-bar-count").appear(
			function () {
				var appcount = $(this);
				var percent = appcount.data("percent");
				$(appcount).css("width", percent).addClass("counted");
			}, {
			accY: -50
		});

		// ------------------------ 22. quantity 
		$(document).on("click", ".qty-btn-plus", function () {
			var $n = $(this).parent(".quantity-content").find(".input-qty");
			$n.val(Number($n.val()) + 1);
		}); 
		$(document).on("click", ".qty-btn-minus", function () {
			var $n = $(this).parent(".quantity-content").find(".input-qty");
			var amount = Number($n.val());
			if (amount > 0) {
				$n.val(amount - 1);
			}
		}); 
		
        // ------------------------ 23. mousecursor 
		const $cursorInner = document.querySelector(".cursor-inner");
        const $cursorOuter = document.querySelector(".cursor-outer");
        if ($("body").length && $cursorInner && $cursorOuter) {
            $(window).on("mousemove", function(e) {
                $cursorOuter.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
                $cursorInner.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            });

            $("body").on("mouseenter", "a, .cursor-pointer", function () {
                $cursorInner.classList.add("cursor-hover");
                $cursorOuter.classList.add("cursor-hover");
            }).on("mouseleave", "a, .cursor-pointer", function () {
                if (!$(this).is("a") || !$(this).closest(".cursor-pointer").length) {
                    $cursorInner.classList.remove("cursor-hover");
                    $cursorOuter.classList.remove("cursor-hover");
                }
            });

            $cursorInner.style.visibility = "visible";
            $cursorOuter.style.visibility = "visible";
        }

        // ------------------------ 24. wow animation 
        new WOW({
			boxClass:     'wow',
			animateClass: 'animated',
			offset:       0,
			mobile:       false,
			live:         true
		}).init();

        // ------------------------ 25. scroll to top
        $(window).on("scroll", function () { 
			if ($(this).scrollTop() > 20) {
				$("#back-top").addClass("show");
			} else {
				$("#back-top").removeClass("show");
			}
		});
        
		// ------------------------ 26. back-top
		$(document).on("click", "#back-top", function() {
			$("html, body").animate({ 
				scrollTop: 0 
			}, 800);
			return false;
		}); 

		// ------------------------ 27. donation
		if ($("#donation").length > 0) {
			const activeAmount = $(".donation-amount.active").text();
			$("#donation").val(activeAmount);

			$(".donation-amount").on("click", function () {
				$(".donation-amount").removeClass("active");
				$(this).addClass("active");

				if ($(this).hasClass("custom-amount")) {
					$("#donation").val("").focus(); // Clear and focus input for custom amount
				} else {
					const amount = $(this).text();
					$("#donation").val(amount);
				}
			});
		}

		// ------------------------ project Add class
		$(document).on("click", ".project-item", function () {
			const hasActive = $(this).hasClass("active");
			$(".project-item").removeClass("active");
			if (!hasActive) {
				$(this).addClass("active");
			}
		});


    });
    // end document ready function 
	
    // ------------------------ 28. preloader 
	function preloader() {
        $(window).on("load", function() { 
			$(".preloader").delay(600).fadeOut();
		});
    }
    preloader();
})(jQuery); // end jQuery