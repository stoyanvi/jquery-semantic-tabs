(function($) {

    $.semanticTabs = function(element, options) {

        var defaults = {

            prefixClass: 'tabs-', // Default Tabs classes and id prefix
            headingTag: 'h3', // Each content block heading tag, id or class
            startTab: 1, // Number of tab to be opened on initial page load
            easeDuration: 200, // Animation duration
            firstChildClass: 'first-child', // Tabs li:first-child class to support old browsers
            lastChildClass: 'last-child', // Tabs li:last-child class to support old browsers
            tabContentMarginBottom: 24 // Base line height in px
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

            prefixID = element.substring(1, element.length);

            if ($('#' + base.settings.prefixClass + prefixID).length > 0) {

                console.log('Error: #' + base.settings.prefixClass + prefixID + ' already exist');
                return false;

            } else {

                addTabs();
            }
        }

        var addEl = function(tag, className, css) {

            var el = document.createElement(tag);

            if(className) el.className = className;
            if(css) el.style.cssText = css;

            return $(el);
        }

        var addTabs = function() {

            $tabsContainer = addEl('div').attr('id', base.settings.prefixClass + prefixID).insertBefore($element);
            $tabsNav = addEl('ul', base.settings.prefixClass + 'links ' + base.settings.prefixClass + 'links-' + $tabs.length).appendTo($tabsContainer);
            $tabsWrapper = addEl('div', base.settings.prefixClass + 'content-wrapper').appendTo($tabsContainer);

            $tabs.find(base.settings.headingTag).each(function(index) {

                $tabsItems = addEl('li').appendTo($tabsNav);

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

                $activeContent.parent().height($activeContent.outerHeight(true) + heightRatio);

                heightRatio = base.settings.tabContentMarginBottom;
            });

            $(window).bind('resize', function() {
                $activeContent.parent().height($activeContent.outerHeight(true) + heightRatio);
            });

            $tabsNav.find('.' + base.settings.prefixClass + 'anchor').bind('click', openTab);
        }

        var openTab = function(e) {

            e.preventDefault();

            if (!$(this).hasClass('active')) {

                $activeTab.removeClass('active');

                $activeTab = $(this);
                $activeTab.addClass('active');

                tabAnchor = $(this).attr('href');

                if ($.browser.msie && $.browser.version.substr(0,1) <= 7) {

                    var elHeight = $(tabAnchor).outerHeight(true);

                } else {

                    var elHeight = $(tabAnchor).outerHeight(true) + heightRatio - 3;
                }

                $activeContent.fadeOut(base.settings.easeDuration, function() {

                    $(tabAnchor).parent().animate({

                        height: elHeight

                    }, base.settings.easeDuration * 1.5, function() {
                        $(tabAnchor).parent().css('overflow', 'visible');
                        $activeContent = $(tabAnchor).fadeIn(base.settings.easeDuration);
                    });
                });
            }
        }

        base.destroy = function() {

            $('#' + base.settings.prefixClass + prefixID).remove();
            $element.show();
        }

        base.init();
    }

    $.fn.semanticTabs = function(options) {

        return this.each(function() {

            if (undefined == $(this).data('semanticTabs')) {

                var semanticTabs = new $.semanticTabs(this, options);
                $(this).data('semanticTabs', semanticTabs);
            }
        });
    }

})(jQuery);