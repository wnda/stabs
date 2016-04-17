(function(){
  "use strict";
  var tabcontainer  = document.querySelectorAll(".tabcontainer"),
      z             = tabcontainer.length;
  function stabs(){
      var t         = tabcontainer[z],
          tabs      = t.querySelectorAll(".tab"),
          a         = tabs.length,
          tabpanes  = t.querySelectorAll(".tabpane"),
          b         = tabpanes.length;
      function tabclick(e){
        var c       = e.target || e.srcElement || window.event.target || window.event.srcElement;
            m       = Array.prototype.indexOf.call(tabs, c),
            actives = t.querySelectorAll(".active"),
            d       = actives.length;
        while ( d-- ){
          actives[d].classList.remove("active");
        }
        c.classList.add("active");
        tabpanes[m].classList.add("active");
      }
      while ( a-- ){
        if ( tabs[a].addEventListener ){
          tabs[a].addEventListener( "click", tabclick, false );
        } 
        else if ( tabs[a].attachEvent ){
          tabs[a].attachEvent( "onclick", tabclick );
        }
        else {
          tabs[a].onclick=tabclick;
        }
      }
    }
  while ( z-- ){
    stabs();
  }
})();
