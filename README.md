jquery-semantic-tabs
========================

Description
-----------

jQuery semantic tabs.

Example usage
-------------

    var listToTabs = new $.listToTabs('#solutions');

Plugin options
--------------

You can change the following plugin options:

    var defaults = {

        prefixClass: 'tabs-', // Default Tabs classes and id prefix
        headingTag: 'h3', // Each content block heading tag, id or class
        startTab: 1, // Number of tab to be opened on initial page load
        easeDuration: 200, // Animation duration
        firstChildClass: 'first-child', // Tabs li:first-child class to support old browsers
        lastChildClass: 'last-child', // Tabs li:last-child class to support old browsers
        tabContentMarginBottom: 24 // Base line height in px
    }