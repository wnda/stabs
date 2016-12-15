void function (win, doc) {
  'use strict';
  
  var tabcontainers = doc.querySelectorAll('.tabcontainer'), z = 0;
  
  for (; z < tabcontainers.length; ++z) {
    setupTabs(tabcontainers[z]);
  }

  function setupTabs (t) {
    var tabs = t.querySelectorAll('.tab');
    var tabpanes = t.querySelectorAll('.tabpane');
    
    switch ('addEventListener' in win && tabs.length === tabpanes.length) {
      case true:
        t.addEventListener('click', tabClicked(tabs, tabpanes), false);
        break;
      default:
        return;
    }
  }
  
  function tabClicked (tabs, tabpanes) {
    return function(e) {
      var c = (e.target || this), b, d, f, g, h;
      
      switch (c.classList.contains('tab')) {
        case true:
          b = tabpanes[([].indexOf.call(tabs, c))]; 
          d = getSiblings(c); f = 0; 
          g = getSiblings(b); h = 0;
          break;
        default:
          return;
      }
      
      if (e !== void 0) {
        e.preventDefault();
      }
      
      for (; f < d.length; ++f) {
        if (d[f] !== c && d[f].classList.contains('tab') && d[f].classList.contains('active')) {
          d[f].classList.remove('active');
          d[f].setAttribute( 'aria-selected', 'false' );
        }
      }
      
      for (; h < g.length; ++h) {
        if (g[h] !== c && g[h].classList.contains('tabpane') && g[h].classList.contains('active')) {
          g[h].classList.remove('active');
          g[h].setAttribute('hidden', 'true');
          g[h].setAttribute('aria-hidden', 'true');
        }
      }
      
      c.classList.add('active');
      c.setAttribute('aria-selected', 'true');
      
      b.classList.add('active');
      b.removeAttribute('hidden');
      b.setAttribute('aria-hidden', 'false');
    };
  }
  
  function getSiblings (m) {
    var r = [], n = m.parentNode.firstChild;
    
    for (; n; n = n.nextSibling) {
      if (n.nodeType === 1 && n !== m) {
        r.push(n);
      }
    }
    return r;
  }

}(window, window.document);
