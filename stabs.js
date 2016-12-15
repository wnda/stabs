;(function(win, doc) {
  'use strict';

  function getSiblings( m ) {
    var r = [], n = m.parentNode.firstChild;
    for ( ; n; n = n.nextSibling ) if ( n.nodeType === 1 && n !== m ) r.push( n );
    return r;
  }

  function tabClicked( tabs, tabpanes ){
    return function( e ){
      typeof e !== 'undefined' && e.preventDefault();
      var c = ( e.currentTarget || this );
      var idx = [].indexOf.call( tabs, c );
      var d = getSiblings( c );
      var g = getSiblings( tabpanes[idx] );
      var f = 0, h = 0;
      for (; f < d.length; ++f) {
        if ( d[f] !== c && d[f].classList.contains('tab') && d[f].classList.contains('active')) {
          d[f].classList.remove('active');
          d[f].setAttribute( 'aria-selected', 'false' );
        }
      }
      for (; h < g.length; ++h) {
        var p = g[h].classList;
        if (g[h] !== c && g[h].classList.contains('tabpane') && g[h].classList.contains('active')){
          g[h].classList.remove('active');
          g[h].setAttribute( 'hidden', 'true' );
          g[h].setAttribute( 'aria-hidden', 'true' );
        }
      }
      c.classList.add('active');
      c.setAttribute( 'aria-selected', 'true' );      
      tabpanes[idx].classList.add('active');
      tabpanes[idx].removeAttribute( 'hidden' );
      tabpanes[idx].setAttribute( 'aria-hidden', 'false' );
    };
  }

  function setupTabs( t ) {
    var tabs = t.querySelectorAll('.tab');
    var tabpanes = t.querySelectorAll('.tabpane');
    if ( tabs.length !== tabpanes.length ) return;
    for ( var i = 0; i < tabs.length; ++i ) {
      if ( 'addEventListener' in win ) tabs[i].addEventListener( 'click', tabClicked( tabs, tabpanes ), false );
      else if ( 'attachEvent' in win ) tabs[i].attachEvent( 'onclick', tabClicked( tabs, tabpanes ) );
      else tabs[i].onclick = tabClicked( tabs, tabpanes );
    }
  }

  var tabcontainers = doc.querySelectorAll('.tabcontainer');
  for ( var z = 0; z < tabcontainers.length; ++z ) setupTabs( tabcontainers[z] );

})( window, window.document );
