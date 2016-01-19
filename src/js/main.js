var loading = {
		avgTime: 3000,
		trg: 1,
		state: 0,
		preloader: $('body > .preloader'),
		loaded: function () {
			if(++loading.state == loading.trg) {
				loading.status(1);
				setTimeout(loading.done, 500);
			} else {
				loading.status(loading.state / loading.trg / 1.1);
			}
		},
		status: function (mult) {
			loading.preloader.find('> .after').css({
				'width': mult * 100 + '%'
			});
		},
		done: function () {
			if (loading.finished) {
				return;
			}

			// WOW init
			if ($.browser.desktop) {
				$('.fadeInUp').addClass('wow fadeInUp');
				$('.fadeInRight').addClass('wow fadeInRight');
				$('#devices').find('> .content-holder > .container > *').addClass('wow fadeInUp');
				$('#experience').find('> .container > *').addClass('wow fadeInUp');
				$('#about-text').find('> .container > *').addClass('wow fadeInUp');
				if (!$.browser.safari) {
					$('#subscriber').find('> .container > .subscriber-holder').addClass('wow fadeInRightA');
				}
				$('#works-articles, #blog-articles').find('> .container .article').each(function (i) {
					$(this).one('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function () {
						$(this).removeClass('wow fadeInUp').css({
							'animation': 'none',
							'-webkit-animation': 'none'
						});
					});
					$(this).addClass('wow fadeInUp').css({
						'animation-delay': 300 + 'ms',
						'-webkit-animation-delay': 300 + 'ms'
					});
				});
				$('#works-header, #blog-header').find('> *').addClass('wow fadeInUp');
				$('.blog-item-page.top').addClass('wow fadeInUpA');
				new WOW().init();
			}
			var wow = new WOW(
				{
					boxClass: 'button-holder',
					animateClass: '',
					offset: 0,
					mobile: true,
					callback: function(box) {
						$('#paginate').trigger('click');
					}
				}
			);
			wow.init();

			$('#works-item-header').find('> .container > *').each(function (i) {
				$(this).css({
					'-webkit-animation-delay': 200 * i + 'ms',
					'animation-delay': 200 * i + 'ms',
					'-webkit-animation-name': 'fadeInUp',
					'animation-name': 'fadeInUp'
				});
			}).addClass('animated');

			// hide preloader
			loading.preloader.animate({}).delay(100).animate({
				'opacity': 0
			}, 600, 'easeOutQuint', function () {
				loading.status(0);
				$(this).detach();
				loading.finished = true;
			});
		}
	};
setTimeout(function () {
	loading.status(1);
	setTimeout(loading.done, 500);
}, 10000);
$(window).on('load', function () {
	// loaded
	// loading.loaded();
	loading.status(1);
	setTimeout(loading.done, 500);
});
$(document).on('ready', function () {
	$('img').each(function () {
		if (!this.naturalHeight) {
			loading.trg ++;
			$(this).one('load', loading.loaded)
		}
	});
	var winWidth = $(window).width(),
		winHeight = $(window).height(),
		bodyOverflow = {
			fixBody: function () {
				$('body').width($('body').width())
					.css({
						'overflow': 'hidden'
					});
			},
			unfixBody: function () {
				$('body')
					.css({
						'overflow': 'auto',
						'overflow-y': 'scroll',
						'width': 'initial'
					});
			},
			resize: function () {
				this.unfixBody();
			}.bind(this)
		},
		fixElement = (function () {
				var elTopStart,
					elTopEnd,
					parentOffset,
					elHalfHeight,
					$el = $('#fixed-socials'),
					$end = $el.parent().siblings('.bottom');
				var plg = {
					resize: function () {
						elHalfHeight = $el.height() / 2;
						elTopStart = $el.offset().top;
						elTopEnd = $end.offset().top + $end.outerHeight() - (elHalfHeight * 2);
						parentOffset = $el.parent().offset().top;
					},
					scroll: function (top) {
						if (top + (winHeight / 2) - elHalfHeight > parentOffset && top < elTopEnd - (winHeight / 2)) {
							$el.css({
								'top': top + (winHeight / 2) - elHalfHeight - parentOffset
							});
						} else if (top < parentOffset + winHeight) {
							$el.css({
								'top': 0
							});
						} else {
							$el.css({
								'top': elTopEnd - parentOffset + 4
							});
						}
					},
					exist: $el.length
				};
				return plg;
			})();
			if (fixElement.exist) {
				$(window).on('resize', function () {
					fixElement.resize();
				});
				$(document).on('scroll', function () {
					fixElement.scroll($(this).scrollTop());
				});
				$('section').on('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function () {
					fixElement.resize();
				});
			}


	// perspective hover
	if (winWidth > 944) {
		$('.portfolio-item, #frame-logo, section#works-articles .article').perspectiveHover();
	}

	// sidebars
	$('.navbar-toggle').on('click', function () {
		$('#mobile-menu').toggleClass('opened');
		bodyOverflow.fixBody();
	});
	$('.open-lightbox').on('click', function () {
		$($(this).data('target')).addClass('opened');
	});
	$('.close-lightbox').on('click', function () {
		$(this).closest($(this).data('target')).removeClass('opened');
		bodyOverflow.unfixBody();
	});
	$('#mobile-menu').on('click', function (e) {
		if (e.target.tagName != "A") {
			e.preventDefault();
			$(this).closest('.opened').removeClass('opened');
			bodyOverflow.unfixBody();
		}
	});

	// capatabilities
	$('#capabilities-slider').capabilitiesSlider();

	// subscriber
	$('#subscriber').find('input').on('focus', function () {
		$(this).closest('#subscriber').addClass('focused');
	}).on('blur', function () {
		var $self = $(this);
		setTimeout(function () {
			$self.closest('#subscriber').removeClass('focused');
		}, 200);
	});

	// navigation
	$('nav, #blog-articles, #works-articles, #mobile-menu, #portfolio-presentation').find('a').on('click', function (e) {
		var $self = $(this);
		var href = $self.attr('href');
		loading.status(0);
		if (href == '#contact') {
			e.preventDefault();
			$self.closest('.opened').removeClass('opened');
			$('html, body').one('mousewheel DOMMouseScroll touchstart', function () {
				$(this).stop(true, true);
				bodyOverflow.unfixBody();
			});
			$('html, body').animate({
				scrollTop: $('#subscriber').offset().top
			}, 2400, 'easeOutQuint');
		} else if (href == "#") {
			e.preventDefault();
		} else {
			e.preventDefault();
			if ($self.attr('target') == 'blue') {
				loading.preloader.addClass('blue');
			} else {
				loading.preloader.removeClass('blue');
			}
			if ($.browser.safari) {
				loading.preloader.insertAfter('body > .page-wrapper').animate({
						'opacity': 1
					}, 200, function () {
						document.location.href = href;
				});
			} else {
				loading.preloader.insertBefore('body').animate({
						'opacity': 1
					}, 200, function () {
						document.location.href = href;
				});
			}
		}
	});

	// modals
	$('.modal-open').on('click', function (e) {
		e.preventDefault();
		$($(this).attr('href')).addClass('opened');
		bodyOverflow.fixBody();
	});
	$('.modal-holder').on('click', function (e) {
		if (this == e.target) {
			if ($(this).attr('target')) {
				document.location = $(this).attr('target');
			} else {
				$(this).removeClass('opened');
				bodyOverflow.unfixBody();
			}
		}
	});
	$('.close-modal').on('click', function () {
		$(this).closest('.opened').removeClass('opened');
		bodyOverflow.unfixBody();
	});
	$(window).on('keyup', function (e) {
		// esc pressed
		if (e.keyCode == '27') {
			$('.modal-holder').removeClass('opened');
		}
	});

	// scroll
	// $(document).on('scroll', function () {
	// 	var top = $(this).scrollTop();
	// });

	// resize
	$(window).on('resize', function () {
		winWidth = $(window).width();
		winHeight = $(window).height();
	});

	// iOS fix
	if ($.browser.safari) $('body').addClass('client-safari');
	if ($.browser.iphone || $.browser.ipad || $.browser.ipad) $('body').addClass('client-ios');
	if ($.browser.msie) $('body').addClass('client-ie');
});

//plugins
(function ($) {
	$.fn.capabilitiesSlider = function (opt) {

		this.each(function (i) {

			var DOM = {},
				state = {
					'touchStart': {},
					'touchEnd': {}
				},
				self = this;

			// options
			if (!opt) {
				opt = {};
			}
			opt = $.extend({
				'loop': true,
				'interval': false,
				'easing': 'swing',
				'prevClass': 'arrow-left-1',
				'nextClass': 'arrow-right-1',
				'holderClass': '.slides-holder',
				'slideClass': '.slide',
				'nameClass': '.slide-name',
				'imageClass': '.slide-image',
				'slidesOnPage': 1
			}, opt);

			// methods
			var plg = {
				cacheDOM: function () {
					DOM.$slider = $(self);
					DOM.$preloader = DOM.$slider.find('.slider-preloader');
					DOM.$viewport = DOM.$slider.find('.slider-viewport');
					DOM.$sliderHolder = DOM.$viewport.find('.slider-holder');
					DOM.$slides = DOM.$sliderHolder.find('.slide');
				},
				init: function () {
					state.cur = state.cur || 0;
					state.activeSlides = DOM.$slides.length;
					DOM.$preloader.fadeOut(150);
				},
				resize: function () {
					state.sliderWidth = DOM.$viewport.width();
					DOM.$slides.width(DOM.$viewport.width() - 59);
					DOM.$slides.height(
							(function ($slides) {
								var max = 1;
								$slides.each(function () {
									var width = $(this).find('> div').outerHeight();
									if (width > max) {
										max = width;
									}
								});
								return max;
							})(DOM.$slides) + 26
						);
					state.slideWidth = DOM.$slides.eq(0).outerWidth() + 12;
					DOM.$sliderHolder.width(state.slideWidth * state.activeSlides);
				},
				prevSlide: function () {
					var id = state.cur - 1;
					if (id < 0) {
						// this.toSlide(state.activeSlides - 1);
						return;
					}
					this.toSlide(id);
				},
				nextSlide: function () {
					var id = state.cur + 1;
					if (id >= state.activeSlides) {
						// this.toSlide(0);
						return;
					}
					this.toSlide(id);
				},
				toSlide: function (id) {
					DOM.$sliderHolder.css({
						'-webkit-transform': 'translateX( -' + (state.slideWidth * opt.slidesOnPage * id) + 'px)',
						'transform': 'translateX( -' + (state.slideWidth * opt.slidesOnPage * id) + 'px)'
					})
					// .one('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function () {
					// 	$(this).css({
					// 		'left': 1
					// 	});
					// });
					// DOM.$sliderHolder.css({
					// 	'left': -(state.slideWidth * opt.slidesOnPage * id)
					// });
					DOM.$pagination.find('.page').eq(id).addClass('active').siblings().removeClass('active');
					state.cur = id;
				},
				createPagination: function () {
					if (DOM.$pagination) {
						DOM.$pagination.empty();
					} else {
						DOM.$pagination = $('<div>').addClass('paginator-holder');
						DOM.$pagination.appendTo(DOM.$slider);
					}
					for (var i = 0; i < state.activeSlides / opt.slidesOnPage; i++) {
						var page = $('<div>').data('page', i).addClass('page');
						if (!i) {
							page.addClass('active');
						}
						DOM.$pagination.append(page);
					}
				}
			};

			plg.cacheDOM();
			plg.init();
			plg.createPagination();
			plg.resize();

			// resize
			$(window).on('resize', function () {
				plg.resize();
			});

			// click events
			DOM.$slider.on('click', function (e) {
				var $target = $(e.target);
				if ($target.hasClass('page')) {
					plg.toSlide($(e.target).data('page'));
				}
			});

			// drag events
			DOM.$slider.on('touchstart', function (e) {
				state.touchStart.xPos = e.originalEvent.touches[0].clientX;
				state.touchStart.yPos = e.originalEvent.touches[0].clientY;
				state.touchStart.timeStamp = e.timeStamp;
			});
			DOM.$slider.on('touchmove', function (e) {
				state.touchEnd.xPos = e.originalEvent.touches[0].clientX;
				state.touchEnd.yPos = e.originalEvent.touches[0].clientY;
			});
			DOM.$slider.on('touchend', function (e) {
				var distance = 70,
					speed = 200,
					deltaX = state.touchEnd.xPos - state.touchStart.xPos,
					deltaY = Math.abs(state.touchEnd.yPos - state.touchStart.yPos);
					// time = e.timeStamp - state.touchStart.timeStamp;
				// console.log('-----');
				// console.log(time);
				// console.log(deltaX);
				// console.log((deltaY));
				// console.log(state.touchEnd.originalEvent.touches[0].clientX);
				// console.log(state.touchStart.originalEvent.touches[0].clientX);
				if (deltaX > distance || -deltaX > distance && deltaY < 30) {
					if (deltaX < 0) {
						plg.nextSlide();
					} else {
						plg.prevSlide();
					}
				}
			});

			$(window).on('resize', plg.resize.bind(plg));
			plg.init();

			return plg;
		});
	};

	$.fn.perspectiveHover = function (opt) {

		this.each(function (i) {

			var DOM = {},
				state = {},
				$self = $(this);

			// options
			if (!opt) {
				opt = {};
			}
			opt = $.extend({
				'power': 20,
				'duration': 2000
			}, opt);

			// methods
			var plg = {
				init: function () {
					state.elementWidth = $self.innerWidth();
					state.elementHeight = $self.innerHeight();
					$self.on('mousemove', this.mousemove);
					$self.on('mouseleave', this.mouseleave);
					$self.on('click', this.click);
					if (!state.$shadow) {
						state.$shadow = $('<div>').addClass('blick');
						state.$shadow.appendTo($self.find('a'));
					}
				},
				mousemove: function (e) {
					var offsetX = e.pageX - $self.offset().left;
					var xmult = offsetX / state.elementWidth;
					var offsetY = e.pageY - $self.offset().top;
					var ymult = offsetY / state.elementHeight;
					plg.renderElement(xmult, ymult);
				},
				mouseleave: function () {
					plg.renderElement(0.5, 0.5);
				},
				click: function () {
					// $self.parent().parent().find('a').css({
					// 	"-webkit-transform": "none",
					// 	"transform": "none"
					// });
					$self.parent().parent().find('.blick').css({
						'display': 'none'
					});
				},
				renderElement: function (x, y, z) {
					if (!z) {
						z = 10;
					}
					$self.find('a').css({
						"-webkit-transform": "rotateY(" + (-(x - 0.5) * -opt.power) + "deg) rotateX(" + (-(y - 0.5) * opt.power) + "deg) translateZ(" + z + "px)",
						"transform": "rotateY(" + (-(x - 0.5) * -opt.power) + "deg) rotateX(" + (-(y - 0.5) * opt.power) + "deg) translateZ(" + z + "px)"
					});
					state.$shadow.css({
						'background-image': 'linear-gradient(' + (x * 25 + 2) + 'deg, transparent, rgba(255, 255, 255, 0.2) ' + (y * 30 + 40) + '%, transparent ' + (y * 30 + 100) + '%)'
					});
				}
			};

			plg.init();

			return plg;
		});
	};

	// easing
	$.extend( $.easing,
		{
			easeInQuad: function (x, t, b, c, d) {
				return c*(t/=d)*t + b;
			},
			easeOutQuad: function (x, t, b, c, d) {
				return -c *(t/=d)*(t-2) + b;
			},
			easeInOutQuad: function (x, t, b, c, d) {
				if ((t/=d/2) < 1) return c/2*t*t + b;
				return -c/2 * ((--t)*(t-2) - 1) + b;
			},
			easeInCubic: function (x, t, b, c, d) {
				return c*(t/=d)*t*t + b;
			},
			easeOutCubic: function (x, t, b, c, d) {
				return c*((t=t/d-1)*t*t + 1) + b;
			},
			easeInOutCubic: function (x, t, b, c, d) {
				if ((t/=d/2) < 1) return c/2*t*t*t + b;
				return c/2*((t-=2)*t*t + 2) + b;
			},
			easeInQuart: function (x, t, b, c, d) {
				return c*(t/=d)*t*t*t + b;
			},
			easeOutQuart: function (x, t, b, c, d) {
				return -c * ((t=t/d-1)*t*t*t - 1) + b;
			},
			easeInOutQuart: function (x, t, b, c, d) {
				if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
				return -c/2 * ((t-=2)*t*t*t - 2) + b;
			},
			easeInQuint: function (x, t, b, c, d) {
				return c*(t/=d)*t*t*t*t + b;
			},
			easeOutQuint: function (x, t, b, c, d) {
				return c*((t=t/d-1)*t*t*t*t + 1) + b;
			},
			easeInOutQuint: function (x, t, b, c, d) {
				if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
				return c/2*((t-=2)*t*t*t*t + 2) + b;
			},
			easeInSine: function (x, t, b, c, d) {
				return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
			},
			easeOutSine: function (x, t, b, c, d) {
				return c * Math.sin(t/d * (Math.PI/2)) + b;
			},
			easeInOutSine: function (x, t, b, c, d) {
				return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
			},
			easeInExpo: function (x, t, b, c, d) {
				return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
			},
			easeOutExpo: function (x, t, b, c, d) {
				return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
			},
			easeInOutExpo: function (x, t, b, c, d) {
				if (t==0) return b;
				if (t==d) return b+c;
				if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
				return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
			},
			easeInCirc: function (x, t, b, c, d) {
				return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
			},
			easeOutCirc: function (x, t, b, c, d) {
				return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
			},
			easeInOutCirc: function (x, t, b, c, d) {
				if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
				return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
			},
			easeInElastic: function (x, t, b, c, d) {
				var s=1.70158;var p=0;var a=c;
				if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
				if (a < Math.abs(c)) { a=c; var s=p/4; }
				else var s = p/(2*Math.PI) * Math.asin (c/a);
				return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
			},
			easeOutElastic: function (x, t, b, c, d) {
				var s=1.70158;var p=0;var a=c;
				if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
				if (a < Math.abs(c)) { a=c; var s=p/4; }
				else var s = p/(2*Math.PI) * Math.asin (c/a);
				return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
			},
			easeInOutElastic: function (x, t, b, c, d) {
				var s=1.70158;var p=0;var a=c;
				if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
				if (a < Math.abs(c)) { a=c; var s=p/4; }
				else var s = p/(2*Math.PI) * Math.asin (c/a);
				if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
				return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
			},
			easeInBack: function (x, t, b, c, d, s) {
				if (s == undefined) s = 1.70158;
				return c*(t/=d)*t*((s+1)*t - s) + b;
			},
			easeOutBack: function (x, t, b, c, d, s) {
				if (s == undefined) s = 1.70158;
				return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
			},
			easeInOutBack: function (x, t, b, c, d, s) {
				if (s == undefined) s = 1.70158; 
				if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
				return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
			},
			easeInBounce: function (x, t, b, c, d) {
				return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
			},
			easeOutBounce: function (x, t, b, c, d) {
				if ((t/=d) < (1/2.75)) {
					return c*(7.5625*t*t) + b;
				} else if (t < (2/2.75)) {
					return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
				} else if (t < (2.5/2.75)) {
					return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
				} else {
					return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
				}
			},
			easeInOutBounce: function (x, t, b, c, d) {
				if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
				return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
			}
		});
})(jQuery);

/*!
 * jQuery Browser Plugin 0.1.0
 * https://github.com/gabceb/jquery-browser-plugin
 *
 * Original jquery-browser code Copyright 2005, 2015 jQuery Foundation, Inc. and other contributors
 * http://jquery.org/license
 *
 * Modifications Copyright 2015 Gabriel Cebrian
 * https://github.com/gabceb
 *
 * Released under the MIT license
 *
 * Date: 05-07-2015
 */
/*global window: false */

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], function ($) {
      return factory($);
    });
  } else if (typeof module === 'object' && typeof module.exports === 'object') {
    // Node-like environment
    module.exports = factory(require('jquery'));
  } else {
    // Browser globals
    factory(window.jQuery);
  }
}(function(jQuery) {
  "use strict";

  function uaMatch( ua ) {
    // If an UA is not provided, default to the current browser UA.
    if ( ua === undefined ) {
      ua = window.navigator.userAgent;
    }
    ua = ua.toLowerCase();

    var match = /(edge)\/([\w.]+)/.exec( ua ) ||
        /(opr)[\/]([\w.]+)/.exec( ua ) ||
        /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
        /(iemobile)[\/]([\w.]+)/.exec( ua ) ||
        /(version)(applewebkit)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec( ua ) ||
        /(webkit)[ \/]([\w.]+).*(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec( ua ) ||
        /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
        /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
        /(msie) ([\w.]+)/.exec( ua ) ||
        ua.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec( ua ) ||
        ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
        [];

    var platform_match = /(ipad)/.exec( ua ) ||
        /(ipod)/.exec( ua ) ||
        /(windows phone)/.exec( ua ) ||
        /(iphone)/.exec( ua ) ||
        /(kindle)/.exec( ua ) ||
        /(silk)/.exec( ua ) ||
        /(android)/.exec( ua ) ||
        /(win)/.exec( ua ) ||
        /(mac)/.exec( ua ) ||
        /(linux)/.exec( ua ) ||
        /(cros)/.exec( ua ) ||
        /(playbook)/.exec( ua ) ||
        /(bb)/.exec( ua ) ||
        /(blackberry)/.exec( ua ) ||
        [];

    var browser = {},
        matched = {
          browser: match[ 5 ] || match[ 3 ] || match[ 1 ] || "",
          version: match[ 2 ] || match[ 4 ] || "0",
          versionNumber: match[ 4 ] || match[ 2 ] || "0",
          platform: platform_match[ 0 ] || ""
        };

    if ( matched.browser ) {
      browser[ matched.browser ] = true;
      browser.version = matched.version;
      browser.versionNumber = parseInt(matched.versionNumber, 10);
    }

    if ( matched.platform ) {
      browser[ matched.platform ] = true;
    }

    // These are all considered mobile platforms, meaning they run a mobile browser
    if ( browser.android || browser.bb || browser.blackberry || browser.ipad || browser.iphone ||
      browser.ipod || browser.kindle || browser.playbook || browser.silk || browser[ "windows phone" ]) {
      browser.mobile = true;
    }

    // These are all considered desktop platforms, meaning they run a desktop browser
    if ( browser.cros || browser.mac || browser.linux || browser.win ) {
      browser.desktop = true;
    }

    // Chrome, Opera 15+ and Safari are webkit based browsers
    if ( browser.chrome || browser.opr || browser.safari ) {
      browser.webkit = true;
    }

    // IE11 has a new token so we will assign it msie to avoid breaking changes
    if ( browser.rv || browser.iemobile) {
      var ie = "msie";

      matched.browser = ie;
      browser[ie] = true;
    }

    // Edge is officially known as Microsoft Edge, so rewrite the key to match
    if ( browser.edge ) {
      delete browser.edge;
      var msedge = "msedge";

      matched.browser = msedge;
      browser[msedge] = true;
    }

    // Blackberry browsers are marked as Safari on BlackBerry
    if ( browser.safari && browser.blackberry ) {
      var blackberry = "blackberry";

      matched.browser = blackberry;
      browser[blackberry] = true;
    }

    // Playbook browsers are marked as Safari on Playbook
    if ( browser.safari && browser.playbook ) {
      var playbook = "playbook";

      matched.browser = playbook;
      browser[playbook] = true;
    }

    // BB10 is a newer OS version of BlackBerry
    if ( browser.bb ) {
      var bb = "blackberry";

      matched.browser = bb;
      browser[bb] = true;
    }

    // Opera 15+ are identified as opr
    if ( browser.opr ) {
      var opera = "opera";

      matched.browser = opera;
      browser[opera] = true;
    }

    // Stock Android browsers are marked as Safari on Android.
    if ( browser.safari && browser.android ) {
      var android = "android";

      matched.browser = android;
      browser[android] = true;
    }

    // Kindle browsers are marked as Safari on Kindle
    if ( browser.safari && browser.kindle ) {
      var kindle = "kindle";

      matched.browser = kindle;
      browser[kindle] = true;
    }

     // Kindle Silk browsers are marked as Safari on Kindle
    if ( browser.safari && browser.silk ) {
      var silk = "silk";

      matched.browser = silk;
      browser[silk] = true;
    }

    // Assign the name and platform variable
    browser.name = matched.browser;
    browser.platform = matched.platform;
    return browser;
  }

  // Run the matching process, also assign the function to the returned object
  // for manual, jQuery-free use if desired
  window.jQBrowser = uaMatch( window.navigator.userAgent );
  window.jQBrowser.uaMatch = uaMatch;

  // Only assign to jQuery.browser if jQuery is loaded
  if ( jQuery ) {
    jQuery.browser = window.jQBrowser;
  }

  return window.jQBrowser;
}));