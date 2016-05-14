;(function(){
  
  "use strict";
  
  function stabs(config){
    
    var tabcontainer_selector = config && config.tabcontainer ? "." + config.tabcontainer : ".tabcontainer",
        tab_selector          = config && config.tab          ? "." + config.tab          : ".tab",
        tabpane_selector      = config && config.tabpane      ? "." + config.tabpane      : ".tabpane",
        active_selector       = config && config.active       ? "." + config.active       : ".active",
        active_class          = config && config.active       ? config.active             : "active",
        add_hash              = config && config.addhash      ? config.addhash            : false,
        tabcontainers         = document.querySelectorAll(tabcontainer_selector),
        z                     = tabcontainers.length;
    
    function amendCss (w,x,y){
      
      var p = w.split(" "),
          q = w.length,
          r = [];
          
      while (q--){
        p[q] && p[q] != active_class && r.push(p[q]);
      }
      
      y && r.push(x);
      
      return r.join(" ");
    
    }
    
    function stabsEvents(){
      
      var t        = tabcontainers[z],
          tabs     = t.querySelectorAll(tab_selector),
          a        = tabs.length,
          tabpanes = t.querySelectorAll(tabpane_selector),
          b        = tabpanes.length;
          
      function stabsClick(e){
        
        var c       = e.target || e.srcElement || window.event.target || window.event.srcElement,
            m       = [].indexOf.call(tabs, c),
            actives = t.querySelectorAll(active_selector),
            d       = actives.length;
            
        if ("classList" in document.createElement("_")){
          while(d--){
            actives[d].classList.remove(active_class);
          }
          c.classList.add(active_class);
          tabpanes[m].classList.add(active_class);
        } 
        else {
          while(d--){
            actives[d].className = amendCss(actives[d].className, active_class, 0);
          }
          c.className            = amendCss(c.className, active_class, 1);
          tabpanes[m].className  = amendCss(tabpanes[m].className, active_class, 1);
        }
        
        if (add_hash && c.id && location.hash !== c.id){
          location.hash = c.id;
        }
        
        return false;
        
      }
      
      while (a--){
        
        if (tabs[a].addEventListener){
          tabs[a].addEventListener("click", stabsClick, false);
        } 
        else if (tabs[a].attachEvent){
          tabs[a].attachEvent("onclick", stabsClick);
        } 
        else {
          tabs[a].onclick=stabsClick;
        }
        
      }
      
    }
    
    while (z--){
      stabsEvents();
    }
    
  }
  
  window.stabs = stabs;
  
})();
