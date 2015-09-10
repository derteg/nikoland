// $('HTML').addClass('JS');
var $promoSlider = $('#promoSlider');
var currentMousePos = { x: -1, y: -1 };

$(function (){
	logoPopup();

	$('#fullpage').fullpage({
		verticalCentered: true,
		css3: true,
		scrollingSpeed: 700,
		fitToSectionDelay: 0,
		normalScrollElements: '.b-contacts__popup, .b-about',
		fixedElements: '.b-video__cont',
		anchors:['slide_01', 'slide_02', 'slide_03'],
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

					var delay = 0.25;

					$(this).find('.slick-slide').map(function(index, element){
						if($(element).hasClass('slick-active')){
							$(element).css({
								'-webkit-transition-delay': delay + 's',
								'transition-delay':  delay + 's'
							});
							delay += parseFloat(0.15);
						} else {
							$(element).css({
								'-webkit-transition-delay': '0s',
								'transition-delay':  '0s'
							});
						}
					}); 
			}

			$promoSlider.on('init', picsSetHW);

			$promoSlider.slick({
				infinite: false,
				slidesToShow: 3,
				slidesToScroll: 1,
				swipeToSlide: true,
				touchThreshold: 10,
				edgeFriction: 1,
				arrows: false,
				lazyLoad: 'progressive',
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

			$promoSlider.on('afterChange', function(slick, currentSlide){
				var delay = 0;

				$(this).find('.slick-slide').map(function(index, element){
					if($(element).hasClass('slick-active')){
						$(element).css({
							'-webkit-transition-delay': delay + 's',
							'transition-delay':  delay + 's'
						});
						delay += parseFloat(0.15);
					} else {
						$(element).css({
							'-webkit-transition-delay': '0s',
							'transition-delay':  '0s'
						});
					}
				}); 
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
				$screen02 = $('.screen_02'),
				$awwards = $('#header').find('.js-header__awards');

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

$(function(){
	(function contactPopup(){
		var $btn = $('.js-form-popup__btn'),
			$popup = $('.b-contacts__popup'),
			$close = $('.b-contacts__popup-close', $popup),
			time = 600;

		$btn.click(function(event){
			event.preventDefault();
			$popup
			.show()
			.animate({
				'right': 0
			}, time);
		});

		$close.click(closePopUp);

		function closePopUp(){
			$popup
				.animate({
					'right': -536
				}, time)
				.queue(function(){

					$(this).hide();
					$(this).dequeue();
				});
		}
	}());
});

$(function(){
	(function aboutPage(){
		var $btn = $('.js-about__page'), wH, resizeId,
		$awwards = $('.js-header__awards');

		$btn.click(function(event) {
			var dataHref = $btn.data('href');

			wH = $(window).innerHeight();
			
			$.ajax({
				method: 'GET',
				url: dataHref,
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
			$.fn.fullpage.reBuild();
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
});

$(function () {
	
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
	  // allow any non-whitespace characters as the host part
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

		$('#contact-telephone').val('').mask("?(999) 999-9999");
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


	        // $('#callSubmit').submit(function(){
	        // 	data.submit();
	        // });
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
});