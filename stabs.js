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

  // grifted from jQuery
  var getSiblings = function( m ) {
    var r = [], n = m.parentNode.firstChild;
    for ( ; n; n = n.nextSibling ){
      if ( n.nodeType == 1 && n != m) r.push( n );
    }
    return r;
  };
  
  // needed for amendCSS()
  var isInArray = function( arr, item ){
    var len = arr.length;
    while(len--){
      if(item === arr[len]) return true;
    }
    return false;
  };

  // avoid a classList polyfill
  var amendCSS = function( current_classname, class_to_toggle, add_class ){
    var arr_classes   = current_classname.split(' '),
        len           = current_classname.length,
        l             = 0,
        lacks_class   = !isInArray( arr_classes, class_to_toggle ),
        new_classname = [];
    for( ; len > l; l++ ){ arr_classes[l] !== class_to_toggle && new_classname.push( arr_classes[l] ); }
    lacks_class && add_class && new_classname.push( class_to_toggle );
    return (new_classname.join(' ')).trimRight();
  };
  
  // tab click event handler
  var tabClick = function(tabs, tabpanes){
    return function(e){
      var c = (e.target || this);
      var d = getSiblings(c);
      var f = d.length;
      var idx = [].indexOf.call(tabs, c);
      
      while(f--){
        var j = d[f].className.split(' '),
            y = j.indexOf('active');
        if(y !== -1) d[f].className = amendCSS(d[f].className,'active',false);
      }
      
      if (c.className === 'tab' ) c.className = amendCSS(c.className,'active',true);
      if (tabpanes[idx].className === 'tabpane') tabpanes[idx].className = amendCSS(tabpanes[idx].className,'active',true);
      if ( c.id && location.hash !== c.id ) location.hash = c.id;
    };
  };
  
  // event attacher
  var stabs = function(tabcontainer){
    var tabs     = tabcontainer.querySelectorAll('.tab');
    var len      = tabs.length;
    var tabpanes = tabcontainer.querySelectorAll('.tabpane');
      
    while(len--){
      if ( 'addEventListener' in window ) tabs[len].addEventListener( 'click', tabClick, false );
      else if ( 'attachEvent' in window ) tabs[len].attachEvent( 'onclick', tabClick );
      else tabs[len].onclick = tabClick;
    }
  };
    
  var tabcontainer = document.querySelectorAll('.tabcontainer'),
      len            = tabcontainer.length;
      
  while(len--){
    stabs( tabcontainer[len] );
  }
})();
