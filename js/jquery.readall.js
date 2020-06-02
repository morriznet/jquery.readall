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
            linenumbers: 3,                 // number of lines to show
            button:                         // settings for buttons
            {
                textShowmore: 'Read more',  // text shown on button to show more
                textShowless: 'Read less',  // text shown on button to show less
                classShowmore: 'button',    // class(es) on button to show more
                classShowless: 'button'     // class(es) on button to show less
            }
        }, options);
        var $this = $(this),
            singleline = parseFloat($this.css("line-height")),
            fullheight = $this.innerHeight(),
            showheight = singleline * settings.linenumbers,
            objWrapper = $('<div />').addClass('readall-wrapper');
        $this.wrap(objWrapper);

        var onResize = function (event) { console.log('resize'); console.log(event); };
        $(window).bind('orientationchange resize', onResize);

        return this;
    };
}(jQuery));