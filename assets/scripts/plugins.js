(function($) {

    /*** Add HTML Element ***/

    addHTMLelement = function(tag, className, css) {

        var el = document.createElement(tag);

        if(className) el.className = className;
        if(css) el.style.cssText = css;

        return $(el);
    }

    /*** / Add HTML Element ***/

    /*** Tabs Navigation ***/

    $.listToTabs = function(element, options) {

        var defaults = {

            prefixClass: 'tabs-',
            headingTag: 'h3',
            startTab: 1,
            easeDuration: 200,
            firstChildClass: 'first-child',
            lastChildClass: 'last-child',
            tabContentMarginBottom: 24
        }

        var base = this;

        base.settings = {}

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
            prefixID,
            tabAnchor,
            heightRatio;

        base.init = function() {

            base.settings = $.extend({}, defaults, options);

            $element.hide();

            $tabs = $element.children();

            base.addTabs();
        }

        base.addTabs = function() {

            if ($tabsContainer) {

                return false;
            }

            prefixID = element.substring(1, element.length);

            $tabsContainer = addHTMLelement('div').attr('id', base.settings.prefixClass + prefixID).insertBefore($element);
            $tabsNav = addHTMLelement('ul', base.settings.prefixClass + 'links ' + base.settings.prefixClass + 'links-' + $tabs.length).appendTo($tabsContainer);
            $tabsWrapper = addHTMLelement('div', base.settings.prefixClass + 'content-wrapper').appendTo($tabsContainer);

            $tabs.find(base.settings.headingTag).each(function(index) {

                $tabsItems = addHTMLelement('li').appendTo($tabsNav);

                $tabAnchor = addHTMLelement('a', base.settings.prefixClass + 'anchor ' + base.settings.prefixClass + 'anchor-0' + (index + 1))
                            .attr('href', '#' + prefixID + '-item-0' + (index + 1))
                            .appendTo($tabsItems)
                            .text($(this).text());

                if (index == 0) {

                    $tabAnchor.parent().addClass(base.settings.firstChildClass);

                } else if (index == $tabs.length - 1) {

                    $tabAnchor.parent().addClass(base.settings.lastChildClass);
                }

                $tabsContent = addHTMLelement('div', base.settings.prefixClass + 'content')
                              .attr('id', prefixID + '-item-0' + (index + 1))
                              .appendTo($tabsWrapper)
                              .hide();

                $activeTab = $tabsNav.find('.' + base.settings.prefixClass + 'anchor-0' + base.settings.startTab)
                                           .addClass('active');

                $activeContent = $('#' + prefixID + '-item-0' + base.settings.startTab).show();

                var innerHTML = $(this).parent().html();
                $tabsContent.html(innerHTML);

                $tabsContent.find(base.settings.headingTag).remove();

                $activeContent.parent().height($activeContent.outerHeight() + heightRatio);

                heightRatio = base.settings.tabContentMarginBottom;
            });

            $tabsNav.find('.' + base.settings.prefixClass + 'anchor').bind('click', function(e) {

                e.preventDefault();

                if (!$(this).hasClass('active')) {

                    $activeTab.removeClass('active');

                    $activeTab = $(this);
                    $activeTab.addClass('active');

                    tabAnchor = $(this).attr('href');

                    if ($.browser.msie && $.browser.version.substr(0,1) <= 7) {

                        var elHeight = $(tabAnchor).outerHeight();

                    } else {

                        var elHeight = $(tabAnchor).outerHeight() + heightRatio - 3;
                    }

                    $activeContent.fadeOut(base.settings.easeDuration, function() {

                        $(tabAnchor).parent().animate({

                            height: elHeight

                        }, base.settings.easeDuration, function() {

                            $activeContent = $(tabAnchor).fadeIn(base.settings.easeDuration);
                        });

                    });
                }
            });
        }

        base.destroy = function() {

            $tabsContainer.remove();
            $element.show();
        }

        base.init();
    }

    $.fn.listToTabs = function(options) {

        return this.each(function() {

            if (undefined == $(this).data('listToTabs')) {

                var listToTabs = new $.listToTabs(this, options);
                $(this).data('listToTabs', listToTabs);
            }
        });
    }

    /*** / Tabs Navigation ***/

})(jQuery);