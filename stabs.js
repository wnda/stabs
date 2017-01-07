;(function (win, doc) {
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
      var b = (e.target || this), c, d, f, g, h;
      
      switch (b.classList.contains('tab')) {
        case true:
          c = tabpanes[([].indexOf.call(tabs, b))]; 
          d = 0; f = getSiblings(b); g = getSiblings(c);
          break;
        default:
          return;
      }
      
      if (typeof e !== 'undefined') {
        e.preventDefault();
      }
      
      for (; d < f.length; ++d) {
        if (f[d] !== b && f[d].classList.contains('tab') && f[d].classList.contains('active')) {
          f[d].classList.remove('active');
          f[d].setAttribute('aria-selected', 'false');
        }
        if (g[d] !== b && g[d].classList.contains('tabpane') && g[d].classList.contains('active')) {
          g[d].classList.remove('active');
          g[d].setAttribute('hidden', 'true');
          g[d].setAttribute('aria-hidden', 'true');
        }
      }
      
      b.classList.add('active');
      b.setAttribute('aria-selected', 'true');
      
      c.classList.add('active');
      c.removeAttribute('hidden');
      c.setAttribute('aria-hidden', 'false');
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

})(window, window.document);
