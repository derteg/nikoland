// $('HTML').addClass('JS');

$(function (){
	$('#fullpage').fullpage({
		verticalCentered: true,
		css3: true,
		scrollingSpeed: 700,
		loopBottom: false,
		loopTop: false,
		afterRender: function(){
			var pluginContainer = $(this),
				$promoSlider = $('#promoSlider'),
				$interactBG = $("#interactBG"),
				win = $(window);

			$('#bgvid').get(0).play();

			function picsSetHW(){
				var $that = $(this),
					$slideW = $('.slick-slide', $that).width(),
					$picCont = $('.b-pic-bg__cont', $that),
					$linkCont = $('.js-promo__slide-lnk', $that);

					$linkCont.height($slideW).width($slideW);
					$picCont.height($slideW).width($slideW);
			}

			$promoSlider.on('init', picsSetHW);

			$promoSlider.slick({
				infinite: false,
				slidesToShow: 3,
				slidesToScroll: 1,
				focusOnSelect: true,
				swipeToSlide: true,
				touchThreshold: 13,
				edgeFriction: 0.5,
				speed: 700,
				cssEase: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
				responsive: [
					{
					breakpoint: 1281,
						settings: {
							slidesToShow: 2,
							centerMode: false
						}
					},
					{
					breakpoint: 600,
						settings: {
							slidesToShow: 1
						}
					}					
					]
			});

			$promoSlider.on('setPosition', picsSetHW);

			$interactBG.prepend('<div class="interact-bg">');

			// $('.interact-bg', $interactBG).css({
			// 	width: win.outerWidth(),
			// 	height: win.outerHeight()
			// });

			
		},
		afterLoad: function(anchorLink, index, slideAnchor, slideIndex){
			var $interactBG = $("#interactBG");
			var currentMousePos = { x: -1, y: -1 };

			function setTranzishnBG(e){
				var that = $(this);

					currentMousePos.x = e.pageX / 10;
					currentMousePos.y = e.pageY / 10;

					console.log(currentMousePos.x);
					
						$('.interact-bg', $interactBG).css({
							"-webkit-transform": "translate3d("+ -currentMousePos.x +"px,0, 0) scale(1)",
							"-moz-transform": "translate3d("+ -currentMousePos.x +"px,0, 0) scale(1)",
							"-o-transform": "translate3d("+ -currentMousePos.x +"px,0, 0) scale(1)",
							"transform": "translate3d("+ -currentMousePos.x +"px,0, 0) scale(1)"
						});
					
			}

			if(index == 3){
				$(document).mousemove(setTranzishnBG);
			}


		},
		onLeave: function(index, nextIndex, direction){
			var $interactBG = $("#interactBG"),
				$bg = $('.interact-bg', $interactBG),
				$contact = $('#promoContact', $interactBG);

			if(nextIndex == 3){
				$bg.css({
					"-webkit-transform": "translate3d(0, 0, 0) scale(1)",
					"-moz-transform": "translate3d(0, 0, 0) scale(1)",
					"-o-transform": "translate3d(0, 0, 0) scale(1)",
					"transform": "translate3d(0, 0, 0) scale(1)"
				});

				$contact.fadeIn(1200);
			} else {
				$bg.css({
					"-webkit-transform": "translate3d(0, 0, 0) scale(1.3)",
					"-moz-transform": "translate3d(0, 0, 0) scale(1.3)",
					"-o-transform": "translate3d(0, 0, 0) scale(1.3)",
					"transform": "translate3d(0, 0, 0) scale(1.3)"
				});
				$contact.fadeOut(1200);
			}
		}
	});
});

