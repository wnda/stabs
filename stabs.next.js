;(function(){

  "use strict";

  var settings,pool;

  window.stabs = {

    amendCss: function(w,x,y){

      var p = w.split(" "),
          q = w.length,
          r = [];

      while (q--){
        p[q] && p[q] != active_class && r.push(p[q]);
      }

      y && r.push(x);

      return r.join(" ");

    },

    events: function(tabcontainers,z){

      pool = {
          t         : tabcontainers[z],
          tabs      : tabcontainers[z].querySelectorAll(settings.tab_selector),
          tabpanes  : tabcontainers[z].querySelectorAll(settings.tabpane_selector)
      };

      console.log(pool);

      var a = pool.tabs.length,b=pool.tabpanes.length;

      while (a--){

        if (pool.tabs[a].addEventListener){
          pool.tabs[a].addEventListener("click", stabs.clicked, false);
        }
        else if (pool.tabs[a].attachEvent){
          pool.tabs[a].attachEvent("onclick", stabs.clicked);
        }
        else {
          pool.tabs[a].onclick = stabs.clicked;
        }

      }

    },

    clicked: function(e){

      var c       = e.target || e.srcElement || window.event.target || window.event.srcElement,
          m       = [].indexOf.call(pool.tabs, c),
          actives = pool.t.querySelectorAll(settings.active_selector),
          d       = actives.length;

      if ("classList" in document.createElement("_")){
        while(d--){
          actives[d].classList.remove(settings.active_class);
        }
        c.classList.add(settings.active_class);
        pool.tabpanes[m].classList.add(settings.active_class);
      }
      else {
        while(d--){
          actives[d].className = amendCss(actives[d].className, settings.active_class, 0);
        }
        c.className            = amendCss(c.className, settings.active_class, 1);
        tabpanes[m].className  = amendCss(tabpanes[m].className, settings.active_class, 1);
      }

      if (!!settings.add_hash && c.id && location.hash !== c.id){
        location.hash = c.id;
      }

      return false;

    },

    init: function(config){

      settings = {
        tabcontainer_selector : config && config.tabcontainer ? "." + config.tabcontainer : ".tabcontainer",
        tab_selector          : config && config.tab          ? "." + config.tab          : ".tab",
        tabpane_selector      : config && config.tabpane      ? "." + config.tabpane      : ".tabpane",
        active_selector       : config && config.active       ? "." + config.active       : ".active",
        active_class          : config && config.active       ? config.active             : "active",
        add_hash              : config && config.addhash      ? config.addhash            : false
      };

      console.log(settings);

      var tabcontainers         = document.querySelectorAll(settings.tabcontainer_selector),
          z                     = tabcontainers.length;

      while (z--){
        stabs.events(tabcontainers,z);
      }

    }

  };

})();

stabs.init();
