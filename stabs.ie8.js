;(function (win, doc) {
  
  var tabcontainers = doc.querySelectorAll('.tabcontainer');
  var z = 0;
  for (; z < tabcontainers.length; ++z) setupTabs(tabcontainers[z]);

  // https://gist.github.com/revolunet/1908355
  if (!('indexOf' in [])) {
    Array.prototype.indexOf = function (el) {
      var len = this.length >>> 0;
      var from = Number(arguments[1]) || 0;
      from = (from < 0) ? Math.ceil(from) : Math.floor(from);
      if (from < 0) from += len;
      for (; from < len; from++) if (from in this && this[from] === el) return from;
      return -1;
    };
  }

  function getSiblings (m) {
    var r = [], n = m.parentNode.firstChild;
    for (; n; n = n.nextSibling) if (n.nodeType === 1 && n !== m) r.push(n);
    return r;
  }
  
  function amendCSS (classes, new_class, add_flag) {
    var old_arr = classes.split(' ');
    var new_arr = [];
    var l = 0
    for (; l < old_arr.length; ++l) if (old_arr[l].trim() !== new_class) new_arr[l] = old_arr[l].trim();
    if (add_flag) new_arr.push(new_class);
    return (classes === new_arr.join(' ') ? classes : new_arr.join(' '));
  }

  function tabClicked (tabs, tabpanes) {
    return function (e) {
      typeof e !== 'undefined' && e.preventDefault();
      var c = (e.currentTarget || this);
      var idx = [].indexOf.call(tabs, c);
      var d = getSiblings(c);
      var g = getSiblings(tabpanes[idx]);
      var f = 0;
      var h = 0;
      var j;
      var p;
      for (; f < d.length; ++f) {
        j = d[f].className;
        if (d[f] !== c && j.split(' ').indexOf('tab') !== -1 && j.split(' ').indexOf('active') !== -1) {
          d[f].className = amendCSS(j, 'active', !1);
          d[f].setAttribute('aria-selected', 'false');
        }
      }
      for (; h < g.length; ++h) {
        p = g[h].className;
        if (g[h] !== c && p.split(' ').indexOf('tabpane') !== -1 && p.split(' ').indexOf('active') !== -1) {
          g[h].className = amendCSS(p, 'active', !1);
          g[h].setAttribute('hidden', 'true');
          g[h].setAttribute('aria-hidden', 'true');
        }
      }
      c.className = amendCSS(c.className, 'active', !0);
      c.setAttribute('aria-selected', 'true');      
      tabpanes[idx].className = amendCSS(tabpanes[idx].className, 'active', !0);
      tabpanes[idx].removeAttribute('hidden');
      tabpanes[idx].setAttribute('aria-hidden', 'false');
    };
  }

  function setupTabs (t) {
    var tabs = t.querySelectorAll('.tab');
    var tabpanes = t.querySelectorAll('.tabpane');
    var i = 0;
    if (tabs.length !== tabpanes.length) return;
    for (; i < tabs.length; ++i) {
      if ('addEventListener' in win) tabs[i].addEventListener('click', tabClicked(tabs, tabpanes), false);
      else if ('attachEvent' in win) tabs[i].attachEvent('onclick', tabClicked(tabs, tabpanes));
      else tabs[i].onclick = tabClicked(tabs, tabpanes);
    }
  }

})(window, window.document);
