;(function(win,doc){
  'use strict';
  
  // https://gist.github.com/revolunet/1908355
  if (!Array.prototype.indexOf){
    Array.prototype.indexOf = function(el){
      var len = this.length >>> 0;
      var from = Number(arguments[1]) || 0;
      from = (from < 0) ? Math.ceil(from) : Math.floor(from);
      if (from < 0) from += len;
      for (; from < len; from++){
        if (from in this && this[from] === el) return from;
      }
      return -1;
    };
  }

  function getSiblings( m ) {
    var r = [], n = m.parentNode.firstChild;
    for ( ; n; n = n.nextSibling ){
      if ( n.nodeType == 1 && n != m) r.push( n );
    }
    return r;
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
  
          if ( d[f] !== c && w !== -1 ) {
            d[f].className = 'tab';
            d[f].setAttribute('aria-selected', 'false');
          }
          if ( d[f] !== c && v !== -1 && y !== -1 ){ 
            d[f].className = 'tabpane';
            d[f].setAttribute('aria-visible', 'false');
            d[f].setAttribute('aria-hidden','true');
          }
      
        }
        if (c.className === 'tab' ) {
          c.className = 'tab active';
          c.setAttribute('aria-selected', 'true');
        }
        if (tabpanes[idx].className === 'tabpane') {
          tabpanes[idx].className = 'tabpane active';
          tabpanes[idx].setAttribute('aria-visible', 'true');
          tabpanes[idx].setAttribute('aria-hidden','false');
        }
      }
      
      while(a--){
        if ( 'addEventListener' in win ) tabs[a].addEventListener( 'click', tabclick, false );
        else if ( 'attachEvent' in win ) tabs[a].attachEvent( 'onclick', tabclick );
        else tabs[a].onclick = tabclick;
      }
      
    }
  
  var tabcontainer = doc.querySelectorAll('.tabcontainer'),
      z = tabcontainer.length;

  while(z--){
    stabs( tabcontainer[z] );
  }
})(window,window.document);
