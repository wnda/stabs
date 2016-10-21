;( function( win, doc ){
  
  'use strict';
  
  // https://gist.github.com/revolunet/1908355
  if (!('indexOf' in [])){
    Array.prototype.indexOf = function(el){
      var len = this.length >>> 0;
      var from = Number(arguments[1]) || 0;
      from = (from < 0) ? Math.ceil(from) : Math.floor(from);      
      if (from < 0) from += len;      
      for (; from < len; from++)
        if (from in this && this[from] === el) 
          return from;

      return -1;
    };
  }

  function getSiblings( m ) {
    var r = [], n = m.parentNode.firstChild;
    for ( ; n; n = n.nextSibling )
      if ( n.nodeType === 1 && n !== m )
        r.push( n );
    return r;
  }
  
  function tabClicked( tabs, tabpanes ){
    return function( e ){
      var c = ( e.currentTarget || this );
      var idx = [].indexOf.call( tabs, c );
      var d = getSiblings( c );
      var g = getSiblings( tabpanes[idx] );
      
      for ( var f = 0; f < d.length; ++f ) { 
        var j = d[f].className.split(' ');
  
        if ( d[f] !== c && j.indexOf( 'tab' ) !== -1 && j.indexOf( 'active' ) !== -1 ) {
          d[f].className = 'tab';
          d[f].setAttribute( 'aria-selected', 'false' );
        }   
      }
      
      for ( var h = 0; h < g.length; ++h ) {
        var p = g[h].className.split(' ');
        
        if ( g[h] !== c && p.indexOf( 'tabpane' ) !== -1 && p.indexOf( 'active' ) !== -1 ){ 
          g[h].className = 'tabpane';
          g[h].setAttribute( 'hidden', 'true' );
          g[h].setAttribute( 'aria-hidden', 'true' );
        }
      }
      
      if ( c.className === 'tab' ) {
        c.className = 'tab active';
        c.setAttribute( 'aria-selected', 'true' );
      }
      
      if ( tabpanes[idx].className === 'tabpane' ) {
        tabpanes[idx].className = 'tabpane active';
        tabpanes[idx].removeAttribute( 'hidden' );
        tabpanes[idx].setAttribute( 'aria-hidden', 'false' );
      }
      
    };
    
  }
  
  function setupTabs( t ) {
    var tabs     = t.querySelectorAll('.tab');
    var tabpanes = t.querySelectorAll('.tabpane');
    
    if ( tabs.length !== tabpanes.length ) return;
    
    for ( var i = 0; i < tabs.length; ++i ) {
      if ( 'addEventListener' in win ) 
        tabs[i].addEventListener( 'click', tabClicked( tabs, tabpanes ), false );
      
      else if ( 'attachEvent' in win ) 
        tabs[i].attachEvent( 'onclick', tabClicked( tabs, tabpanes ) );
      
      else 
        tabs[i].onclick = tabClicked( tabs, tabpanes );
    }
      
  }
  
  var tabcontainers = doc.querySelectorAll('.tabcontainer');
  
  for ( var z = 0; z < tabcontainers.length; ++z )
    setupTabs( tabcontainers[z] );
  
})( window, window.document );
