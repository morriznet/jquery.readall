/*
 * jQuery.ReadAll ia a jQuery plugin to shrink large blocks of content and place a read more button below.
 * Created by Anders Fjällström - anders@morriz.net - http://www.morriz.net
 * For documentation see https://github.com/morriznet/jquery.readall
 * Released under MIT license
 * version 1.0
 */

(function ($) {
    $.fn.readall = function (options) {
        var settings = $.extend({
            // Default values
            showheight: 96,                         // height to show
            showrows: null,                         // rows to show (overrides showheight)
            animationspeed: 200,                    // speed of transition
            button:                                 // settings for buttons
            {
                textShowmore: 'Read more',          // text shown on button to show more
                textShowless: 'Read less',          // text shown on button to show less
                classShowmore: 'readall-button',    // class(es) on button to show more
                classShowless: 'readall-button'     // class(es) on button to show less
            }
        }, options);
        $(this).each(function () {
            var $this = $(this),
                fullheight = function () { return $this[0].scrollHeight; },
                wrapperclass = 'readall-wrapper',
                hiddenclass = 'readall-hide';
            if (settings.showrows != null) {
                var lineHeight = Math.floor(parseFloat($this.css('font-size')) * 1.5);
                settings.showheight = lineHeight * settings.showrows;
            }
            $this.addClass('readall').css({ 'overflow': 'hidden' });

            var onResize = function (event) {
                // on resize check if readall is needed
                var _button = $this.parent().find('button.' + settings.button.classShowmore + ', button.' + settings.button.classShowless);
                if (fullheight() > settings.showheight + $(_button).outerHeight()) {
                    if (!$(_button).is(':visible') || event == null) {
                        $this.css({ 'height': settings.showheight + 'px', 'max-height': settings.showheight + 'px' });
                        $(this).text(settings.button.textShowmore);
                        $this.addClass(hiddenclass);
                        $(this).addClass(settings.button.classShowmore).removeClass(settings.button.classShowless);
                        $(_button).show();
                    }
                } else {
                    if ($(_button).is(':visible') || event == null) {
                        $this.css({ 'height': '', 'max-height': '' });
                        $this.removeClass(hiddenclass);
                        $(_button).hide();
                    }
                }
            };
            
            if ($this.parent().not(wrapperclass)) {
                $this.wrap($('<div />').addClass(wrapperclass));
                var _button = $('<button />').addClass(settings.button.classShowmore).text(settings.button.textShowmore).click(function (e) {
                    e.preventDefault();
                    if ($this.hasClass(hiddenclass)) {
                        $this.css({ 'height': settings.showheight + 'px', 'max-height': '' }).animate({ height: fullheight() + 'px' }, settings.animationspeed, function () {
                            $this.css({ 'height': '' });
                            $(_button).text(settings.button.textShowless);
                        });
                    } else {
                        $this.animate({ 'height': settings.showheight + 'px' }, settings.animationspeed, function () {
                            $this.css({ 'max-height': settings.showheight + 'px' });
                            $(_button).text(settings.button.textShowmore);
                        });
                    }
                    $this.toggleClass(hiddenclass);
                    $(this).toggleClass(settings.button.classShowmore).toggleClass(settings.button.classShowless);
                });
                $this.after(_button);

                $(window).bind('orientationchange resize', onResize);
                
                onResize(null);
            }
        });
        return this;
    };
}(jQuery));