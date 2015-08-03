$(document).ready(function() {
	$('#fullpage').fullpage({
		verticalCentered: true,
		css3: true,
		afterRender: function(){
			//playing the video
			$('#bgvid').get(0).play();
		}
	});


	$('#promoSlider').slick();
});