(function(){
  "use strict";
  function stabs(config){
    var tabcontainer_selector = ".tabcontainer" || "." + config.tabcontainer,
        tab_selector = ".tab" || "." + config.tab,
        tabpane_selector = ".tabpane" || "." + config.tabpane,
        active_selector = ".active" || "." + config.active,
        active_class = "active" || config.active,
        tabcontainers = document.querySelectorAll(tabcontainer_selector),
        z = tabcontainers.length;
    function stabsEvents(){
      var t = tabcontainers[z],
          tabs = t.querySelectorAll(tab_selector),
          a = tabs.length,
          tabpanes = t.querySelectorAll(tabpane_selector),
          b = tabpanes.length;
      function stabsClick(e){
        var c = e.target || e.srcElement || window.event.target || window.event.srcElement,
            m = Array.prototype.indexOf.call(tabs, c),
            actives = t.querySelectorAll(active_selector),
            d = actives.length;
        while(d--){
          actives[d].classList.remove(active_class);
        }
        c.classList.add(active_class);
        tabpanes[m].classList.add(active_class);
      }
      while(a--){
        if(tabs[a].addEventListener){tabs[a].addEventListener("click", stabsClick, false);}
        else if(tabs[a].attachEvent){tabs[a].attachEvent("onclick", stabsClick);}
        else{tabs[a].onclick=stabsClick;}
      }
    }
    while(z--){
      stabsEvents();
    }
  }
  window.stabs=stabs;
})();
