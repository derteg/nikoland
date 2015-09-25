// $('HTML').addClass('JS');
$.noConflict();

jQuery(function($){
	(function($){
		var $promoSlider = $('#promoSlider'),
			$picCont = $('.b-pic-bg__cont', $promoSlider),
			$linkCont = $('.js-promo__slide-lnk', $promoSlider),
			$fullpage = $('#fullpage'),
			isTouchDevice = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|Windows Phone|Tizen|Bada)/),
			widthScreen = $(window).width(), 
			delay = 0.25,
			duration = 0.5,
			resizeId,
			maxWidth = 1000,
			slickVar = {
				infinite: false,
				slidesToShow: 3,
				slidesToScroll: 1,
				swipeToSlide: true,
				touchThreshold: 100, // щирина крутящего момента (1/touchThreshold) * the width of the slider
				edgeFriction: 0.5, // сопротивление по краям
				arrows: false,
				lazyLoad: 'progressive',
				speed: 700, 
				mobileFirst: true,
				cssEase: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
				responsive: [
				{
					breakpoint: 1560,
					settings: {
						slidesToShow: 4
					}
				}
				]
			};


			function toggleSlick($widthScreen){
				var $slide = $('.b-promo__slide', $promoSlider);

				if($widthScreen >= maxWidth){
					if(!$promoSlider.hasClass('slick-initialized')){
						$promoSlider.slick(slickVar);
					}

					$('.b-logo__popup').height('auto');
					$('.b-video__cont').height('auto');

					var $slideW = Math.round($('.slick-list').width()/3);
					
					$linkCont.width($slideW).height($linkCont.width());
					$picCont.width($slideW).height($picCont.width());
				} else {
					if($promoSlider.hasClass('slick-initialized')) {
						$promoSlider.slick("unslick");
					}

					$('.b-video__cont').height($('.screen_01').height());

					$linkCont.css({
						'height': 198,
						'width': '100%'
					});
					$picCont.css({
						'height': 198,
						'width': '100%'
					});

					if($slide.length%2 === 1){
						$slide.last().addClass('full-width');
					}

					if( event.type == 'resize' && isTouchDevice ){ 
						$.fn.fullpage.reBuild();
					}
				}
			}

		
		$(window)
			.load(function(event){
				toggleSlick(widthScreen);
			})
			.resize(function() {
				clearTimeout(resizeId);
				var widthScreen = $(window).width();				
				resizeId = setTimeout(toggleSlick(widthScreen), 100);
			});
		
		
		$promoSlider.on('afterChange', sliderPicsAnimate);
		
		$promoSlider.on('setPosition', sliderPicsAnimate);

		function sliderPicsAnimate(){
			$(this).find('.slick-slide').map(function(index, element){
				if($(element).hasClass('slick-active')){
					$(element).css({
						'-webkit-transition-delay': delay + 's',
						'transition-delay':  delay + 's',
						'-webkit-transition-duration': duration + 's',
						'transition-duration':  duration + 's'
					});
					delay += parseFloat(0.25);
					duration += parseFloat(0.5);
				} else {
					$(element).css({
						'-webkit-transition-delay': '0s',
						'transition-delay':  '0s',
						'-webkit-transition-duration': '0s',
						'transition-duration':  '0s'
					});
				}
			}); 
		}
	}(jQuery));

	(function($){
		var $promoSlider = $('#promoSlider'),
			currentMousePos = { x: -1, y: -1 },
			$interactBG = $("#interactBG");

		function disableSectionFit(){
			if($(window).width < 1000){
				$.fn.fullpage.setFitToSection(false);
			} else {
				$.fn.fullpage.setFitToSection(true);
			}
		}

		$('#fullpage').fullpage({
			verticalCentered: true,
			css3: true,
			easingcss3: 'ease-in',
			scrollingSpeed: 700,
			normalScrollElements: '.b-contacts__popup, .b-about, .b-logo__popup', 
			fixedElements: '.b-video__cont, #header, .b-contacts__popup',
			responsiveWidth: '1000',
			touchSensitivity: 10,
			afterRender: function(){
				$('#bgvid').get(0).play();

				$(window).trigger('resize');

				disableSectionFit();
			},
			onLeave: function(index, nextIndex, direction){
				var $bg = $('.interact-bg', $interactBG),
					$contact = $('#promoContact', $interactBG),
					$screen02 = $('.screen_02'),
					$slide = $screen02.find('.slick-slide'),
					$awwards = $('#header').find('.js-header__awards'),
					delay = 0.25,
					duration = 0.5;
 
				if(index == 1){
					$promoSlider.addClass('vertical-animate');
					
					$awwards.css({
						'right': '-145px',
						'top': '-147px',
						'opacity': '0',
						'-webkit-transform': 'scale(0)',
						'transform': 'scale(0)'
					});

					$('#bgvid').get(0).pause();
					$('#bgvid').next().css({
						'opacity': 0.8
					});
				}

				if(nextIndex == 1){
					$promoSlider.removeClass('vertical-animate');

					$awwards.css({
						'right': '-20px',
						'top': '-20px',
						'opacity': '1',
						'-webkit-transform': 'scale(1)',
						'transform': 'scale(1)'
					});

					$('#bgvid').get(0).play();
					$('#bgvid').next().css({
						'opacity': 0.4
					});

					$('.b-video__cont').find('.darknes').css('opacity', 0.3);
				}

				if(index == 2){
					$slide.map(function(index, element){
							$(element).css({
								'-webkit-transition-delay': '.7s',
								'transition-delay':  '.7s',
								'-webkit-transition-duration': '0s',
								'transition-duration':  '0s'
							});
					});
				}

				if(nextIndex == 2){
					$slide.map(function(index, element){
						if($(element).hasClass('slick-active')){
							$(element).css({
								'-webkit-transition-delay': delay + 's',
								'transition-delay':  delay + 's',
								'-webkit-transition-duration': duration + 's',
								'transition-duration':  duration + 's'
							});
							delay += parseFloat(0.25);
							duration += parseFloat(0.5);
						} else {
							$(element).css({
								'-webkit-transition-delay': '0s',
								'transition-delay':  '0s',
								'-webkit-transition-duration': '0s',
								'transition-duration':  '0s'
							});
						}
					});
				}

				if(index == 3){
					$('.b-video__cont').find('.darknes').css('opacity', 0.8);

					$contact.addClass('fadeOutDown').removeClass('fadeInDown');
				}

				if(nextIndex == 3){
					$('.b-video__cont').find('.darknes').css('opacity', 1);

					$contact.addClass('fadeInDown').removeClass('fadeOutDown');

					if($(window).width() >= 1000){
						$(document).mousemove(setTranzishnBG);
					}
				}
			},
			afterResize: function(){
				disableSectionFit();
			}
		});

		function setTranzishnBG(e){
			var that = $(this);

				currentMousePos.x = e.pageX / 10;
				currentMousePos.y = e.pageY / 10;
				
				$('.interact-bg').css({
					"-webkit-transform": "translate3d("+ -currentMousePos.x +"px,0, 0)",
					"-moz-transform": "translate3d("+ -currentMousePos.x +"px,0, 0)",
					"-o-transform": "translate3d("+ -currentMousePos.x +"px,0, 0)",
					"transform": "translate3d("+ -currentMousePos.x +"px,0, 0)"
				});
		}
	}(jQuery));

	(function($){
		function logoPopup(){
			var $logo = $('#logo'),
				$popup = $('.js-logo__popup', $logo);

			$logo.on('click', '.js-logo__pic', function(event){
				event.preventDefault();

				$logo.addClass('active');
			});

			$popup.on('click', '.js-closer', function(event){
				// if(!event.target.hasAttribute('data-popup-closer')) return;

				$logo.removeClass('active');
			});
		}
		logoPopup();
	}(jQuery));

	(function($){
		(function contactPopup(){
			var $btn = $('.js-form-popup__btn'),
				$popup = $('.b-contacts__popup'),
				$close = $('.b-contacts__popup-close', $popup);

			$btn.click(function(event){
				event.preventDefault();
				$popup.css('right', 0);
			});

			$close.click(closePopUp);

			function closePopUp(){
				$popup.css('right', '-100%');
			}
		}(jQuery));
	}(jQuery));

	(function($){
		(function aboutPage(){
			var $btn = $('.js-about__page'), wH, resizeId,
			$awwards = $('.js-header__awards');

			$btn.click(function(event) {
				var dataHref = $btn.data('href');

				wH = $(window).innerHeight();
				
				$.ajax({
					method: 'GET',
					url: dataHref,
					cache: true,
					success: function(html){
						$('#fullpage').before(html).css('display', 'none');
						$('.b-about').css('height', wH);

						$awwards.css({
							'right': '-145px',
							'top': '-147px',
							'opacity': '0',
							'-webkit-transform': 'scale(0)',
							'transform': 'scale(0)'
						});

						$('.js-logo__close').css({
							'display': 'inline-block'
						});
					}
				});
			});

			$('.js-logo__close').click(function(){
				$('#fullpage').css('display', 'block');
				$awwards.css({
					'right': '-20px',
					'top': '-20px',
					'opacity': '1',
					'-webkit-transform': 'scale(1)',
					'transform': 'scale(1)'
				});
				$('.b-about').remove();

				$('.js-logo__close').css({
					'display': 'none'
				});
			});

			$(window).resize(function() {
				clearTimeout(resizeId);
				resizeId = setTimeout(doneResizing, 100);
			});
			 
			function doneResizing(){
				wH = $(this).innerHeight();

				$('.b-about').css('height', wH);
			}
		})();
	}(jQuery));

	(function($) {
		
		// Change this to the location of your server-side upload handler:
		var $form = $('#callbackFrom'),
			$buttonSubmit = $('.js-form-call__btn', $form),
			$inps = $form.find('input:not([type="file"]), textarea');

		(function formCall(){
			// $inps.focus(function(){
			// 	$(this).css('border', '1px solid #ecc02d');
			// });


		$.validator.addMethod("usPhoneFormat", function (value, element) {
			return this.optional(element) || /^\(\d{3}\) \d{3}\-\d{4}( x\d{1,6})?$/.test(value);
		}, "Невалидный телефон");

		$.validator.addMethod("laxEmail", function(value, elem) {
		  return this.optional( elem ) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@(?:\S{1,63})$/.test( value );
		}, 'некорректный email');

			$form.validate({
				highlight: function(element, errorClass) {
					$(element)
						.addClass('invalid-elem').removeClass('valid-elem');
				},
				unhighlight: function(element, errorClass){
					$(element)
						.removeClass('invalid-elem').addClass('valid-elem');
				},
				errorElement: "div",
				errorClass: "l-error-message",
				rules: {
					userName: {
						required: true,
						minlength: 2
					},
					userEmail: {
						email: true,
						required: true
					},
					userPhone: {
						usPhoneFormat: true,
						required: true
					}
				},
				messages: {				
					userName: {
						required: 'Введите ваше имя',
						minlength: jQuery.validator.format('Минимальная длина {0}')
					},
					userEmail: {
						email: 'ваш email адрес должен быть в формате example@example.com',
						required: 'Нам нужен ваш контактный email'
					},
					userPhone: {
						required: 'Нам нужен ваш контактный телефон'
					}
				},
				submitHandler: function(form){
					var formData = $form.serializeArray();

					$.post('order', formData, function(data){
						alert(JSON.stringify(formData));
						$form.find('.b-form-call__cont').hide().prev('.b-form-call__title').text(formData[1].value + ' ваша заявка успешно принята');
					});
				}
			});

			$inps.change(function(e){
				$form.validate().element($(e.target));
			});

			$('#contact-telephone').mask("?(999) 999-9999");
		})();


		$('#fileupload').fileupload({
			url: 'server/php/',
			dataType: 'json',
			autoUpload: false,
			maxFileSize: 100000, // 10MB
			acceptFileTypes: /(\.|\/)(doc?x|pdf|zip|jpg|jpeg)$/i
		}).on('fileuploadadd', function (e, data) {
			var uploadErrors = [];
	        var acceptFileTypes = /(\.|\/)(doc?x|pdf|zip|jpg|jpeg)$/i;

	        $.each(data.files, function (index, file) {
	        		var node = $('<p/>').text(file.name);

	        		data.context = $('<div/>').appendTo('#fileupload__files');

		        if(data.originalFiles[0].type.length && !acceptFileTypes.test(data.originalFiles[0].type)) {
		        	console.log(111);
		            node.appendTo(data.context)
		                .append($('<span class="text-danger"/>').text(' Недопустимое расширение файла'));
		            uploadErrors.push('Недопустимое расширение файла');
		        }
		        if(data.originalFiles[0].size > 100000) {
		            node.appendTo(data.context)
		                .append($('<span class="text-danger"/>').text(' Слишком многа букав'));
		            uploadErrors.push('Слишком многа букав');
		        }
		        if(uploadErrors.length === 0) {
	        		
	        		node.appendTo(data.context);
		        }

			});
		}).on('fileuploaddone', function (e, data) {
			$.each(data.result.files, function (index, file) {
				$('<p style="color: green;">' + file.name + '<i class="elusive-ok" style="padding-left:10px;"/> - Type: ' + file.type + ' - Size: ' + file.size + ' byte</p>')
				.appendTo('#div_files');
			});
		}).on('fileuploadfail', function (e, data) {
			$.each(data.messages, function (index, error) {
				$('<p style="color: red;">Upload file error: ' + error + '<i class="elusive-remove" style="padding-left:10px;"/></p>')
				.appendTo('#div_files');
			});
		}).prop('disabled', !$.support.fileInput)
			.parent().addClass($.support.fileInput ? undefined : 'disabled');
	}(jQuery));
});