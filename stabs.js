(function(){
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

  var getSiblings = function( m ) {
    var r = [], n = m.parentNode.firstChild;
    for ( ; n; n = n.nextSibling ){
      if ( n.nodeType == 1 && n != m) r.push( n );
    }
    return r;
  };
  
  var isInArray = function( arr, item ){
    var len = arr.length;
    while( len-- ) if ( item === arr[len] ) return true;
    return false;
  };

  var amendCss = function( current_classname, class_to_toggle, add_class ){
    var arr_classes   = current_classname.split(' '),
        len           = current_classname.length,
        l             = 0,
        lacks_class   = !isInArray( arr_classes, class_to_toggle ),
        new_classname = [];
    for( ; len > l; l++ ){ arr_classes[l] !== class_to_toggle && new_classname.push( arr_classes[l] ); }
    !!lacks_class && !!add_class && new_classname.push( class_to_toggle );
    return (new_classname.join(' ')).trimRight();
  };
  
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
  
          if ( d[f] !== c && w !== -1 ) d[f].className = amendCss(d[f].className,'active',false);
          if ( d[f] !== c && v !== -1 && y !== -1 ) d[f].className = amendCss(d[f].className,'active',false);
      
        }
        if (c.className === 'tab' ) c.className = amendCss(c.className,'active',true);
        if (tabpanes[idx].className === 'tabpane') tabpanes[idx].className = amendCss(tabpanes[idx].className,'active',true);
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
