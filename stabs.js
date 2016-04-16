(function(){
  "use strict";
  var tabcontainer = document.getElementsByClassName('tabcontainer'),
      z            = tabcontainer.length;
  
  function stabs(){
      var t        = tabcontainer[z],
          tabs     = t.querySelectorAll('.tab'),
          a        = tabs.length,
          tabpanes = t.querySelectorAll('.tabpane'),
          b        = tabpanes.length;
      
      function getChildren(n, skipMe){
        var r = [];
        for ( ; n; n = n.nextSibling)
          if(n.nodeType === 1 && n != skipMe)
          r.push(n);
          return r;
      }
      function getSiblings(n){
        return getChildren(n.parentNode.firstChild, n);
      }
    
      function tabclick(){
        var c = this,
            d = getSiblings(c),
            f = d.length,
            m = Array.prototype.indexOf.call(tabs, c);
  
        while(f--){
          var j = d[f].className.split(" "),
              v = j.indexOf("tabpane"),
              w = j.indexOf("tab"),
              y = j.indexOf("active");
    
          if (d[f] != c && w != -1){
            d[f].classList.remove("active");
          }
          if (d[f] != c && v != -1 && y != -1){
            d[f].classList.remove("active");
          }
        }
        if (c.className === "tab"){
          c.classList.add("active");
          tabpanes[m].classList.add("active");
        }
      }
      while (a--){
        tabs[a].addEventListener("click", tabclick, false);
      }
    }
  while (z--){
    stabs();
  }
})();
