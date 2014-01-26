/*
 * jQuery semanticTabs
 * Version 1.0
 *
 * jQuery plugin which convert any html list into a tabbed content.
 *
 * Copyright (c) 2013 Stoyan Ivanov
 *
 * Licensed under the MIT license:
 *   http://opensource.org/licenses/MIT
*/

;(function($, window, document, undefined) {

    $.semanticTabs = function(element, options) {

        var defaults = {

            prefixClass: 'tabs-',           // Default Tabs classes and id prefix
            headingTag: 'h3',               // Each content block heading tag, id or class
            startTab: 1,                    // Number of tab to be opened on initial page load
            easeDuration: 150,              // Animation duration
            firstChildClass: 'first-child', // Tabs li:first-child class to support old browsers
            lastChildClass: 'last-child'    // Tabs li:last-child class to support old browsers
        }

        var base = this;

        base.settings = {};

        var $element = $(element),
             element = element,
            $tabs,
            $tabsContainer,
            $tabsNav,
            $tabsWrapper,
            $tabsItems,
            $tabAnchor,
            $tabsContent,
            $activeTab,
            $activeContent,
            prefixID;

        base.init = function() {

            base.settings = $.extend({}, defaults, options);

            $element.hide();

            $tabs = $element.children();

            prefixID = element.substring(1, element.length);

            if ($('#' + base.settings.prefixClass + prefixID).length > 0) {

                throw new Error('#' + base.settings.prefixClass + prefixID + ' already exist!');

                return;

            } else {

                addTabs();
            }
        };

        var addEl = function(tag, className, css) {

            var el = document.createElement(tag);

            if (className) {

                el.className = className;
            }

            if (css) {

                el.style.cssText = css;
            }

            return $(el);
        };

        var addTabs = function() {

            $tabsContainer = addEl('div')
                                .attr('id', base.settings.prefixClass + prefixID)
                                .insertBefore($element);

            $tabsNav = addEl('ul', base.settings.prefixClass + 'links ' + base.settings.prefixClass + 'links-' + $tabs.length)
                                .appendTo($tabsContainer);

            $tabsWrapper = addEl('div', base.settings.prefixClass + 'content-wrapper')
                                .appendTo($tabsContainer);

            $tabs.find(base.settings.headingTag).each(function(index) {

                $tabsItems = addEl('li')
                                .appendTo($tabsNav);

                $tabAnchor = addEl('a', base.settings.prefixClass + 'anchor ' + base.settings.prefixClass + 'anchor-0' + (index + 1))
                                .attr('href', '#' + prefixID + '-item-0' + (index + 1))
                                .appendTo($tabsItems)
                                .text($(this).text());

                if (index == 0) {

                    $tabAnchor.parent().addClass(base.settings.firstChildClass);

                } else if (index == $tabs.length - 1) {

                    $tabAnchor.parent().addClass(base.settings.lastChildClass);
                }

                $tabsContent = addEl('div', base.settings.prefixClass + 'content')
                                  .attr('id', prefixID + '-item-0' + (index + 1))
                                  .appendTo($tabsWrapper)
                                  .hide();

                $activeTab = $tabsNav.find('.' + base.settings.prefixClass + 'anchor-0' + base.settings.startTab)
                                .addClass('active');

                $activeContent = $('#' + prefixID + '-item-0' + base.settings.startTab).show();

                var innerHTML = $(this).parent().html();
                $tabsContent.html(innerHTML);

                $tabsContent.find(base.settings.headingTag).remove();

                if ($.browser.msie && $.browser.version < 9) {

                    $tabsContent.children().last().css('margin-bottom', '0');
                }

                $activeContent.parent().height($activeContent.outerHeight(true));
            });

            $(window).on('resize', function() {

                $activeContent.parent().height($activeContent.outerHeight(true));
            });

            $tabsNav.find('.' + base.settings.prefixClass + 'anchor').on('click', openTab);
        };

        var openTab = function(e) {

            e.preventDefault();

            if (!$(this).hasClass('active')) {

                $tabsNav.find('.' + base.settings.prefixClass + 'anchor').off().on('click', function(e) { e.preventDefault(); });

                $activeTab.addClass('prev-active');
                $activeTab = $(this);

                var tabAnchor = $(this).attr('href'),
                    elHeight = $(tabAnchor).show().outerHeight(true);

                $(tabAnchor).hide();

                $activeContent.fadeOut(base.settings.easeDuration, function() {

                    $(tabAnchor).parent().animate({

                        height: elHeight

                    }, base.settings.easeDuration * 1.5, function() {

                        $activeContent = $(tabAnchor).fadeIn(base.settings.easeDuration);

                        $tabsNav.find('.prev-active').removeClass('active prev-active');
                        $activeTab.addClass('active');
                        $tabsNav.find('.' + base.settings.prefixClass + 'anchor').off().on('click', openTab);
                    });
                });
            }
        };

        base.destroy = function() {

            $('#' + base.settings.prefixClass + prefixID).remove();
            $element.show();
        };

        base.init();
    }

    $.fn.semanticTabs = function(options) {

        return this.each(function() {

            if (undefined == $(this).data('semanticTabs')) {

                var tabs = new $.semanticTabs(this, options);
                $(this).data('semanticTabs', tabs);
            }
        });
    };

})(jQuery, window, document);

