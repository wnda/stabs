(function(){
	    "use strict";
	    var tabcontainer=document.querySelectorAll('.tabcontainer'),
	        z=tabcontainer.length;
	        
        while(z--){
          var t=tabcontainer[z],
          tabs=t.querySelectorAll('.tab'),
          a=tabs.length,
          tabpanes=t.querySelectorAll('.tabpane'),
          b=tabpanes.length;
      
	        while(a--){
    	      tabs[a].addEventListener("click",function(e){
    	        e.preventDefault;
    	        var c=this,
    	            d=Array.prototype.slice.call(c.parentNode.children),
                  f=d.length;
                  
              function chk(k){
    	          var l=k.length;
    	          while(l--){
    	            if (k[l]==="tabpane"){
    	              return 1;
    	            }
    	          }
    	          return 2;
    	        }
    	        
    	        while(f--){
    	          var j=d[f].className.split(" "),
    	              p=chk(j);
    	          if(d[f]!=c&&p===2){
    	            d[f].className="tab";
    	          }
    	          if(d[f]!=c&&p===1){
    	            d[f].className="tabpane";
    	          }
    	        }
                  
    	        if(c.className==="tab"){
    	            c.className="tab active";
    	            var arrtabs=Array.prototype.slice.call(tabs),
    	            idx=arrtabs.indexOf(c);
    	            tabpanes[idx].className="tabpane active";
    	        }
    	        
    	      });
    	    }
	    }
    	    
	  })();
