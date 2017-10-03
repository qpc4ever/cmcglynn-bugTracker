/*
Template Name: my Admin
Author: Wrappixel
Email: niravjoshi87@gmail.com
File: js
*/
$(function () {
    "use strict";
    var body = $("body");
    $(function () {
        $(".preloader").fadeOut();
        $('#side-menu').metisMenu();
    });
    //Loads the correct sidebar on window load,
    //collapses the sidebar on window resize.
    // Sets the min-height of #page-wrapper to window size
    $(function () {
        var set = function () {
                var topOffset = 60
                    , width = (window.innerWidth > 0) ? window.innerWidth : this.screen.width
                    , height = ((window.innerHeight > 0) ? window.innerHeight : this.screen.height) - 1;
                if (width < 768) {
                    $('div.navbar-collapse').addClass('collapse');
                    topOffset = 100; /* 2-row-menu */
                }
                else {
                    $('div.navbar-collapse').removeClass('collapse');
                }
                /* ===== This is for resizing window ===== */
                if (width < 1025) {
                    $('body').addClass('content-wrapper');
                    $(".open-close i").removeClass('icon-arrow-left-circle');
                    $(".logo span").hide();
                }
                else {
                    $('body').removeClass('content-wrapper');
                    $(".open-close i").addClass('icon-arrow-left-circle');
                    $(".logo span").show();
                }
                height = height - topOffset;
                if (height < 1) {
                    height = 1;
                }
                if (height > topOffset) {
                    $("#page-wrapper").css("min-height", (height) + "px");
                }
            }
            , url = window.location
            , element = $('ul.nav a').filter(function () {
                return this.href === url || url.href.indexOf(this.href) === 0;
            }).addClass('active').parent().parent().addClass('in').parent();
        if (element.is('li')) {
            element.addClass('active');
        }
        $(window).ready(set);
        $(window).on("resize", set);
    });
    // Sidebar open close
    $(".open-close").click(function () {
        $(".open-close i").toggleClass("icon-arrow-left-circle");
        $(".logo span").toggle();
        $("body").toggleClass("content-wrapper");
    });
    // Collapse Panels
    (function ($, window, document) {
        var panelSelector = '[data-perform="panel-collapse"]';
        $(panelSelector).each(function () {
            var $this = $(this)
                , parent = $this.closest('.panel')
                , wrapper = parent.find('.panel-wrapper')
                , collapseOpts = {
                    toggle: false
                };
            if (!wrapper.length) {
                wrapper = parent.children('.panel-heading').nextAll().wrapAll('<div/>').parent().addClass('panel-wrapper');
                collapseOpts = {};
            }
            wrapper.collapse(collapseOpts).on('hide.bs.collapse', function () {
                $this.children('i').removeClass('ti-minus').addClass('ti-plus');
            }).on('show.bs.collapse', function () {
                $this.children('i').removeClass('ti-plus').addClass('ti-minus');
            });
        });
        $(document).on('click', panelSelector, function (e) {
            e.preventDefault();
            var parent = $(this).closest('.panel');
            var wrapper = parent.find('.panel-wrapper');
            wrapper.collapse('toggle');
        });
    }(jQuery, window, document));
    // Remove Panels
    (function ($, window, document) {
        var panelSelector = '[data-perform="panel-dismiss"]';
        $(document).on('click', panelSelector, function (e) {
            e.preventDefault();
            var parent = $(this).closest('.panel');
            removeElement();

            function removeElement() {
                var col = parent.parent();
                parent.remove();
                col.filter(function () {
                    var el = $(this);
                    return (el.is('[class*="col-"]') && el.children('*').length === 0);
                }).remove();
            }
        });
    }(jQuery, window, document));
    //Alerts
    $(".myadmin-alert .closed").click(function (event) {
        $(this).parents(".myadmin-alert").fadeToggle(350);
        return false;
    });
    /* Click to close */
    $(".myadmin-alert-click").click(function (event) {
        $(this).fadeToggle(350);
        return false;
    });
    $("#showtop").click(function () {
        $("#alerttop").fadeToggle(350);
    });
    /** Alert Position Bottom  **/
    $("#showbottom").click(function () {
        $("#alertbottom").fadeToggle(350);
    });
    /** Alert Position Top Left  **/
    $("#showtopleft").click(function () {
        $("#alerttopleft").fadeToggle(350);
    });
    /** Alert Position Top Right  **/
    $("#showtopright").click(function () {
        $("#alerttopright").fadeToggle(350);
    });
    /** Alert Position Bottom Left  **/
    $("#showbottomleft").click(function () {
        $("#alertbottomleft").fadeToggle(350);
    });
    /** Alert Position Bottom Right  **/
    $("#showbottomright").click(function () {
        $("#alertbottomright").fadeToggle(350);
    });
    //tooltip
    $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        })
        //Popover
    $(function () {
            $('[data-toggle="popover"]').popover()
        })
        // Task
    $(".list-task li label").click(function () {
        $(this).toggleClass("task-done");
    });
    $(".settings_box a").click(function () {
        $("ul.theme_color").toggleClass("theme_block");
    });
    var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
    $('.js-switch').each(function () {
        new Switchery($(this)[0], $(this).data());
    });
    //Nicescroll
    $(".sidebar").niceScroll({
        cursorcolor: 'rgb(122, 125, 140)'
        , cursorwidth: '5px'
        , cursorborder: 'rgb(122, 125, 140)'
        , cursorborderradius: '0px'
    });
    // Login and recover password
    $('#to-recover').click(function () {
        $("#loginform").slideUp();
        $("#recoverform").fadeIn();
    });
});