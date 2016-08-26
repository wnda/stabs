(function(){
  'use strict';
  
  function getChildren( n, skipMe ){
    var r = [];
    for ( ; n; n = n.nextSibling ){
      if ( n.nodeType == 1 && n != skipMe) r.push( n );
    }
    return r;
  }

  function getSiblings( n ) {
    return getChildren( n.parentNode.firstChild, n );
  }
  
  function stabs(t){
      var tabs     = t.querySelectorAll('.tab'),
          a        = tabs.length,
          tabpanes = t.querySelectorAll('.tabpane'),
          b        = tabpanes.length;
          
      function tabclick(){
        var c = this;
        var d = getSiblings(c);
        var f = d.length;
        var idx = [].indexOf.call(tabs, c);

        while(f--){
          var j = d[f].className.split(' '),
              v = j.indexOf('tabpane'),
              w = j.indexOf('tab'),
              y = j.indexOf('active');
  
          if ( d[f] !== c && w !== -1 ) d[f].className = 'tab';
          if ( d[f] !== c && v !== -1 && y !== -1 ) d[f].className = 'tabpane';
      
        }
        if (c.className === 'tab' ) c.className = 'tab active';
        if (tabpanes[idx].className === 'tabpane') tabpanes[idx].className = 'tabpane active';
      }
      
      while(a--){
        if ( 'addEventListener' in window ) tabs[a].addEventListener( 'click', tabclick, false );
        else if ( 'attachEvent' in window ) tabs[a].attachEvent( 'onclick', tabclick );
        else tabs[a].onclick = tabclick;
      }
      
    }
  
  var tabcontainer = document.querySelectorAll('.tabcontainer'),
      z            = tabcontainer.length;

  while(z--){
    stabs( tabcontainer[z] );
  }
})();
