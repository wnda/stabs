(function(){
  "use strict";
  var tabcontainer=document.querySelectorAll('.tabcontainer'),
      z           =tabcontainer.length;

  while(z--){
    var t       =tabcontainer[z],
        tabs    =t.querySelectorAll('.tab'),
        a       =tabs.length,
        tabpanes=t.querySelectorAll('.tabpane'),
        b       =tabpanes.length;

    while(a--){
      tabs[a].addEventListener("click",function(e){
        e.preventDefault;
        var c=this,
            d=Array.prototype.slice.call(c.parentNode.children),
            f=d.length;

        while(f--){
          var j=d[f].className.split(" "),
              v=j.indexOf("tabpane"),
              w=j.indexOf("tab"),
              y=j.indexOf("active");
  
          if(d[f]!=c&&w!=-1){
            d[f].className="tab";
          }
          if(d[f]!=c&&v!=-1&&y!=-1){
            d[f].className="tabpane";
          }
        }

        if(c.className==="tab"||"tab active"){
          var arrtabs=Array.prototype.slice.call(tabs),
              idx    =arrtabs.indexOf(c);
          c.className="tab active";
          tabpanes[idx].className="tabpane active";
        }
      });
    }
  }
})();
