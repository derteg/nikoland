// $('HTML').addClass('JS');
var $promoSlider = $('#promoSlider');
var currentMousePos = { x: -1, y: -1 };

$(function (){
	logoPopup();
	formRowToggle();

	$('#fullpage').fullpage({
		verticalCentered: true,
		css3: true,
		scrollingSpeed: 700,
		loopBottom: false,
		loopTop: false,
		afterRender: function(){
			var pluginContainer = $(this),
				$interactBG = $("#interactBG"),
				$screen02 = $('.screen_02'),
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
				swipeToSlide: true,
				touchThreshold: 13,
				edgeFriction: 0.5,
				arrows: false,
				speed: 700,
				cssEase: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
				responsive: [
					{
					breakpoint: 1280,
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
			// $screen02.prepend('<div class="transform3D"></div>');
		},
		afterLoad: function(anchorLink, index, slideAnchor, slideIndex){
			var $interactBG = $("#interactBG");


		},
		onLeave: function(index, nextIndex, direction){
			var $interactBG = $("#interactBG"),
				$bg = $('.interact-bg', $interactBG),
				$contact = $('#promoContact', $interactBG),
				$screen02 = $('.screen_02');

			if(index == 1){
				$promoSlider.addClass('vertical-animate');
			}
			if(nextIndex == 1){
				$promoSlider.removeClass('vertical-animate');
			}

			if(nextIndex == 3){
				$bg.css({
					"-webkit-transform": "translate3d(-70px, 0, 0) scale(1)",
					"-moz-transform": "translate3d(-70px, 0, 0) scale(1)",
					"-o-transform": "translate3d(-70px, 0, 0) scale(1)",
					"transform": "translate3d(-70px, 0, 0) scale(1)"
				});

				$contact.fadeIn(1200);

				$(document).mousemove(setTranzishnBG);

				// $screen02.addClass('translate3D');

				// setTimeout(function(){
				// 	$screen02.removeClass('translate3D');
				// }, 2500);
			} else {
				$bg.css({
					"-webkit-transform": "translate3d(-70px, 0, 0) scale(1.3)",
					"-moz-transform": "translate3d(-70px, 0, 0) scale(1.3)",
					"-o-transform": "translate3d(-70px, 0, 0) scale(1.3)",
					"transform": "translate3d(-70px, 0, 0) scale(1.3)"
				});
				$contact.fadeOut(1200);
			}
		}
	});

	function logoPopup(){
		var $logo = $('#logo'),
			$popup = $('.js-logo__popup', $logo);

		$logo.on('click', '.js-logo__pic', function(event){
			event.preventDefault();

			$logo.addClass('active');
		});

		$popup.on('click', '.js-closer', function(event){
			if(!event.target.hasAttribute('data-popup-closer')) return;

			$logo.removeClass('active');
		});
	}

	function formRowToggle(){
		var $form = $('#callbackFrom'),
			$row = $('.js-form-call__toggle', $form),
			$btn = $('.js-form-call__btn', $form);

		$btn.on('click', function(event){
			if($row.not('.active')){
				$row.toggleClass('active').slideDown();
				return false;
			} else {
				$row.toggleClass('active').slideUp();
				return true;
			}

		});
	}

	function setTranzishnBG(e){
		var that = $(this);

			currentMousePos.x = e.pageX / 10;
			currentMousePos.y = e.pageY / 10;
			
			$('.interact-bg').css({
				"-webkit-transform": "translate3d("+ -currentMousePos.x +"px,0, 0) scale(1)",
				"-moz-transform": "translate3d("+ -currentMousePos.x +"px,0, 0) scale(1)",
				"-o-transform": "translate3d("+ -currentMousePos.x +"px,0, 0) scale(1)",
				"transform": "translate3d("+ -currentMousePos.x +"px,0, 0) scale(1)"
			});
			
	}
});



