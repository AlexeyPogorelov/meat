var backgrounds = [
	[1, 2],
	[3, 4],
	[5, 6],
	[7, 8],
	[9, 10],
	[11, 12],
	[13, 14]
];
function randomInteger(min, max) {
	var rand = min + Math.random() * (max - min);
	rand = Math.round(rand);
	return rand;
}

$(document).on('ready', function () {
	var $foreground = $('.foreground-holder'),
		$background = $('.background-holder'),
		winWidth = $(window).width(),
		winHeight = $(window).height(),
		randomBgIndex = randomInteger(0, backgrounds.length - 1);
	$foreground.find('img').attr('src', 'img/bg/' + backgrounds[randomBgIndex][0] + '.jpg').on('load', function () {
		$(window).trigger('resize');
	});
	$background.find('img').attr('src', 'img/bg/' + backgrounds[randomBgIndex][1] + '.jpg').on('load', function () {
		$(window).trigger('resize');
	});

	function fillPresentation () {
		if (winHeight > winWidth) {
			// TODO
			$foreground.parent().height(winHeight);
			$foreground.height(winHeight);
			$background.height(winHeight);
			$foreground.find('img').css({
				'width': 'auto',
				'height': '100%'
			});
			$background.find('img').css({
				'width': 'auto',
				'height': '100%'
			});
		} else {
			$foreground.parent().height(winHeight);
			$foreground.height(winWidth);
			$background.height(winWidth);
			$foreground.find('img').css({
				'height': 'auto',
				'width': '100%'
			});
			$background.find('img').css({
				'height': 'auto',
				'width': '100%'
			});
		}
	}
	fillPresentation ();

	// hide preloader
	$('.preloader').animate({
		'opacity': 0
	}, 800, function () {
		$(this).remove();
	});

	// placing image middle
	function middlindImage ($child, $parent, offset) {
		if (!$child.jquery) {
			$child = $($child);
		}
		if (!$parent) {
			$parent = $child.parent();
		}
		if (!offset) {
			offset = 0;
		}
		$child.css({
			'margin-top': -(($child.height() - $parent.height()) / 2),
			'margin-left': 0
		});
		if (winHeight > winWidth) {
			$child.css({
				'margin-left': -(($child.width() - $parent.width()) / 2)
			});
		};
	}
	middlindImage ($foreground.find('img'), $(window), -60);
	middlindImage ($background.find('img'), $(window), -60);

	// mouse move
	$(window).on('mousemove', function (e) {
		if (winHeight > winWidth) {
			$foreground.css({
				'-webkit-mask-position-x': e.pageX - winWidth / 2,
				'-webkit-mask-position-y': e.pageY - winHeight / 2,
				'mask-position-x': e.pageX - winWidth / 2,
				'mask-position-y': e.pageY - winHeight / 2
			});
		} else {
			$foreground.css({
				'-webkit-mask-position-x': e.pageX - winWidth / 2,
				'-webkit-mask-position-y': e.pageY - winWidth / 2,
				'mask-position-x': e.pageX - winWidth / 2,
				'mask-position-y': e.pageY - winWidth / 2
			});
		}
	});

	// resize
	$(window).on('resize', function (e) {
		winWidth = $(window).width();
		winHeight = $(window).height();
		fillPresentation ();
		middlindImage ($foreground.find('img'), $(window), -60);
		middlindImage ($background.find('img'), $(window), -60);
	});
});
