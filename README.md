jquery-semantic-tabs
========================

Description
-----------

jquery-semantic-tabs is a jQuery plugin that convert any html list into a tabbed content.

Example usage
-------------

Example html:

    <ol id="solutions">
        <li>
            <h3>Solution Name One</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vitae ullamcorper nisi.</p>
        </li>
        <li>
            <h3>Solution Name Two</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vitae ullamcorper nisi.</p>
        </li>
        <li>
            <h3>Solution Name Three</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vitae ullamcorper nisi.</p>
        </li>
    </ol>

Attaching the plugin:

    var myTabs = new $.listToTabs('#solutions');

Destroy the plugin:

    myTabs.destroy();

Plugin options
--------------

You can change the following plugin options:

    var defaults = {

        prefixClass:            'tabs-',        // Default Tabs classes and id prefix
        headingTag:             'h3',           // Each content block heading tag, id or class
        startTab:               1,              // Number of tab to be opened on initial page load
        easeDuration:           200,            // Animation duration
        firstChildClass:        'first-child',  // Tabs li:first-child class to support old browsers
        lastChildClass:         'last-child',   // Tabs li:last-child class to support old browsers
        tabContentMarginBottom: 24              // Base line height in px
    }