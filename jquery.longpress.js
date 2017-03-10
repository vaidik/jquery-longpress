/**
 * Longpress is a jQuery plugin that makes it easy to support long press
 * events on mobile devices and desktop borwsers.
 *
 * @name longpress
 * @version 0.1.2
 * @requires jQuery v1.2.3+
 * @author Vaidik Kapoor
 * @license MIT License - http://www.opensource.org/licenses/mit-license.php
 *
 * For usage and examples, check out the README at:
 * http://github.com/vaidik/jquery-longpress/
 *
 * Copyright (c) 2008-2013, Vaidik Kapoor (kapoor [*dot*] vaidik -[at]- gmail [*dot*] com)
 */

(function($) {
    $.fn.longpress = function(longCallback, shortCallback, duration) {
        if (typeof duration === "undefined") {
            duration = 500;
        }

        return this.each(function() {
            var $this = $(this);

            // to keep track of how long something was pressed
            var mouse_down_time;
            var mouse_up_x, mouse_up_y, mouse_down_x, mouse_down_y;
            var timeout;
            var short_call_time = 0;

            // mousedown or touchstart callback
            function mousedown_callback(e) {
                mouse_down_x = e.originalEvent.touches ? e.originalEvent.touches[0].clientX : e.originalEvent.clientX;
                mouse_down_y = e.originalEvent.touches ? e.originalEvent.touches[0].clientY : e.originalEvent.clientY;

                mouse_down_time = Date.now();
                var context = $(this);

                // set a timeout to call the longpress callback when time elapses
                timeout = setTimeout(function() {
                    if (typeof longCallback === "function") {
                        longCallback.call(context, e);
                    } else {
                        $.error('Callback required for long press. You provided: ' + typeof longCallback);
                    }
                }, duration);
            }

            // mouseup or touchend callback
            function mouseup_callback(e) {
                mouse_up_x = e.originalEvent.touches ? e.originalEvent.touches[0].clientX : e.originalEvent.clientX;
                mouse_up_y = e.originalEvent.touches ? e.originalEvent.touches[0].clientY : e.originalEvent.clientY;

                if(Math.abs(mouse_up_x - mouse_down_x) > 100 || Math.abs(mouse_up_y - mouse_down_y) > 100) return;

                if(Date.now() - mouse_down_time >= duration) return;

                clearTimeout(timeout);
                if (typeof shortCallback === "function") {

                  // prevent double-firing for touch devices
                  // (mouseup, touchend)
                  if(Date.now() - short_call_time > 50) {
                    shortCallback.call($(this), e);
                  }
                  short_call_time = Date.now();
                } else if (typeof shortCallback === "undefined") {
                        ;
                } else {
                    $.error('Optional callback for short press should be a function.');
                }
            }

            // cancel long press event if the finger or mouse was moved
            function move_callback(e) {
                clearTimeout(timeout);
            }

            // Browser Support
            $this.on('mousedown', mousedown_callback);
            $this.on('mouseup', mouseup_callback);
            $this.on('mousemove', move_callback);

            // Mobile Support
            $this.on('touchstart', mousedown_callback);
            $this.on('touchend', mouseup_callback);
            $this.on('touchmove', move_callback);
        });
    };
}(jQuery));
