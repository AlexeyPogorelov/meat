$(document).on('ready', function () {
	var winWidth = $(window).width(),
		winHeight = $(window).height();
	$('.full-height').css({
		'min-height': winHeight
	});

	// open sidebar
	$('.navbar-toggle').on('click', function () {
		$($(this).data('target')).toggleClass('opened');
	})
	// open sidebar
	$('.close-lightbox').on('click', function () {
		$(this).closest('.mobile-menu').toggleClass('opened');
	})

	// resize
	$(window).on('resize', function () {
		winWidth = $(window).width();
		winHeight = $(window).height();
		$('.full-height').css({
			'min-height': winHeight
		});
	});
});
