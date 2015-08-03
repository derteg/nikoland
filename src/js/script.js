$(document).ready(function() {
	$('#fullpage').fullpage({
		verticalCentered: true,
		css3: true,
		afterRender: function(){
			$('#bgvid').get(0).play();

			$('#promoSlider').slick({
				infinite: true,
				slidesToShow: 3,
				slidesToScroll: 3
			});
		}
	});
});