$(document).on('ready', function () {
	var winWidth = $(window).width(),
		winHeight = $(window).height();
	$('.full-height').css({
		'min-height': winHeight
	});

	// resize
	$(window).on('resize', function () {
		winWidth = $(window).width();
		winHeight = $(window).height();
		$('.full-height').css({
			'min-height': winHeight
		});
	});
});
