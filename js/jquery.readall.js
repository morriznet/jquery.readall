/*
 * jQuery.ReadAll ia a jQuery plugin to shrink large blocks of content and place a read more button below.
 * Created by Anders Fjällström - anders@morriz.net - http://www.morriz.net
 * For documentation see https://github.com/morriznet/jquery.readall
 * Released under MIT license
 * version 0.1 (ALFA)
 */

(function ($) {
    $.fn.readall = function (options) {
        var settings = $.extend({
            // Default values
            showheight: 96,                         // height to show
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
                fullheight = function () { return $this[0].scrollHeight; /*$this.innerHeight();*/ },
                wrapperclass = 'readall-wrapper',
                hiddenclass = 'readall-hide';
            $this.addClass('readall').css({ 'overflow': 'hidden' });

            //console.log($this);
            var onResize = function (event) { /*console.log('resize');*/ /*console.log(event);*/
                var _button = $this.parent().find('button.' + settings.button.classShowmore + ', button.' + settings.button.classShowless);
                if (fullheight() > settings.showheight) { $(_button).show(); } else { $(_button).hide(); }
                //TODO: If button visibility is changed from load then the height will either be fixed or missing also the hiddenclass might differ from the state of the button
                // -- make sure to set the correct values when state changes
            };
            
            if ($this.parent().not(wrapperclass)) {
                $this.wrap($('<div />').addClass(wrapperclass));
                var _button = $('<button />').addClass(settings.button.classShowmore).text(settings.button.textShowmore).click(function (e) {
                    e.preventDefault();
                    if ($this.hasClass(hiddenclass)) {
                        $this.css({ 'height': '', 'max-height': '' });
                        $(this).text(settings.button.textShowless);
                    } else {
                        $this.css({ 'height': settings.showheight + 'px', 'max-height': settings.showheight + 'px' });
                        $(this).text(settings.button.textShowmore);
                    }
                    $this.toggleClass(hiddenclass);
                    $(this).toggleClass(settings.button.classShowmore).toggleClass(settings.button.classShowless);
                });
                $this.after(_button);

                $(window).bind('orientationchange resize', onResize);
                if (fullheight() > settings.showheight) {
                    $this.addClass(hiddenclass).css({ 'height': settings.showheight + 'px', 'max-height': settings.showheight + 'px' });
                }
                onResize(null);
            }
        });
        return this;
    };
}(jQuery));