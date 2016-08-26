// This lib is a cheater's way of making tabs by simply passing CSS
// classes around and leaving the display properties to CSS.

// stabs might be better called "activator" since that's all it does:
// it sets a class of active on a clicked tab while deactivating the prior active tab
// and fulfils the same for any tabpane associated (by raw index) with the tab.

// This means that tabs and tabpanes must be equal in number, and for tab/tabpane
// associations to work properly, they should be ordered sequentially in terms of
// their appearance in the document.

// data-attributes could be used in a more modern library, but this library targets
// older browsers without requiring jQuery.

// stabs.js
;(function(){

  "use strict";

  // create the settings and thisContainer/tabs/panes for later
  var settings;

  /**
    PRIVATE METHODS / HELPER FUNCTIONS
  **/

  // used for toggleClass
  var isInArray = function( arr, item ){
    var len = arr.length;
    while( len-- ) if ( item === arr[len] ) return true;
    return false;
  };

  // quick and blunt shim for the classList behaviour we need
  // className + regex could be used, but regexes are ugly and slower
  var toggleClass = function( current_classname, class_to_toggle ){
    var arr_classes   = current_classname.split( ' ' ),
        len           = current_classname.length,
        l             = 0,
        lacks_class   = !isInArray( arr_classes, class_to_toggle ),
        new_classname = [];
    for( ; len > l; l++ ) arr_classes[l] != class_to_toggle && new_classname.push( arr_classes[l] );
    lacks_class && new_classname.push( class_to_toggle );
    return new_classname.join( ' ' );
  };

  // This function is fired upon stabs initialisation
  // It takes tabcontainers and the length of tabcontainers as parameters
  // so as to build a pool of tabs and tabpanes within, and then attaches
  // the necessary event listeners to the tabs while storing the tabpanes
  // for later.
  var addEvents = function ( tabcontainers, t ){
    
    var this_tabcontainer = tabcontainers[ t ],
        tabs = this_tabcontainer.querySelectorAll( settings.tab_selector ),
        tabpanes = this_tabcontainer.querySelectorAll( settings.tabpane_selector ),
        a = tabs.length, b = 0;
        
    for ( ; a > b; b++ )
    {
      if ( 'addEventListener' in window )
      {
        tabs[b].addEventListener( "click", tabClicked( this_tabcontainer, tabs, tabpanes ), false );
      }
      else if ( 'attachEvent' in window )
      {
        tabs[b].attachEvent( "onclick", tabClicked( this_tabcontainer, tabs, tabpanes ) );
      }
      else
      {
        tabs[b].onclick = tabClicked( this_tabcontainer, tabs, tabpanes );
      }
    }
  };

  // This function handles the behaviour of a tab and its tabpane when the tab is clicked
  // We basically remove any active class, and then add active to the tab clicked and its
  // partner tabpane according to numerical index.
  // It would be more efficient to remove the to-be-active tab and tabpane from their
  // respective arrays, so we aren't changing their CSS classes twice.
  // indexOf requires a polyfill.
  var tabClicked = function( this_tabcontainer, tabs, tabpanes ){
    
    // closure to grab the parameters passed into the event handler
    // while retaining context for $this
    return function(){
      
      var clicked_tab = this,
          clicked_tabpane = [].indexOf.call( tabs, clicked_tab ),
          actives = [
                      this_tabcontainer.querySelector( settings.tab_selector + settings.active_selector ),
                      this_tabcontainer.querySelector( settings.tabpane_selector + settings.active_selector )
                    ],
          i = actives.length,
          j = 0;
  
      if ( 'classList' in document.createElement( '_' ) )
      {
        for( ; i > j; j++ ) actives[ j ].classList.remove( settings.active_class );
        clicked_tab.classList.add( settings.active_class );
        tabpanes[ clicked_tabpane ].classList.add( settings.active_class );
      }
      else
      {
        for( ; i > j; j++ ) actives[ j ].className = toggleClass( actives[ j ].className, settings.active_class );
        clicked_tab.className = toggleClass( clicked_tab.className, settings.active_class );
        tabpanes[ clicked_tabpane ].className = toggleClass( tabpanes[ clicked_tabpane ].className, settings.active_class );
      }
      
      if ( !!settings.add_hash && clicked_tab.id && location.hash !== clicked_tab.id )
      {
        location.hash = clicked_tab.id;
      }
    };
  };

  /**
    PUBLIC METHODS
  **/
  
  // .init();
  // pass in optional configuration parameters
  window.stabs = {

    init: function( config ){
      settings =
      {
        tabcontainer_selector : config && config.tabcontainer ? "." + config.tabcontainer : ".tabcontainer",
        tab_selector          : config && config.tab          ? "." + config.tab          : ".tab",
        tabpane_selector      : config && config.tabpane      ? "." + config.tabpane      : ".tabpane",
        active_selector       : config && config.active       ? "." + config.active       : ".active",
        active_class          : config && config.active       ? config.active             : "active",
        add_hash              : config && config.addhash      ? config.addhash            : false
      };
      
      var tabcontainers = document.querySelectorAll( settings.tabcontainer_selector ),
          tc_len        = tabcontainers.length,
          t             = 0;

      for ( ; tc_len > t; t++ ) addEvents( tabcontainers, t );
    }
    
  };
  
})();
// stabs.init();
