// ==UserScript==
// @name           FallenSwordHelper
// @namespace      terrasoft.gr
// @description    Fallen Sword Helper
// @include        http://www.fallensword.com/*
// @include        http://guide.fallensword.com/*
// @include        http://fallensword.com/*
// @include        http://*.fallensword.com/*
// @include        http://local.huntedcow.com/fallensword/*
// @exclude        http://forum.fallensword.com/*
// @exclude        http://wiki.fallensword.com/*
// @version        1518b10
// @downloadURL    https://fallenswordhelper.github.io/fallenswordhelper/Releases/Beta/fallenswordhelper.user.js
// @grant          none
// ==/UserScript==

// No warranty expressed or implied. Use at your own risk.

// EVERYTHING MUST BE IN main()
function fshMain() {

  function setVer() { // Native
    var ver = '1518b10';
    if (typeof GM_info === 'undefined') {return ver + '_native';}
    return ver;
  }

  window.FSH = window.FSH || {};

  FSH.version = setVer();

  var resources = {
    calfSystemJs: 'https://fallenswordhelper.github.io/fallenswordhelper/resources/1518/calfSystem.min.js',
    calfSystemCss: 'https://fallenswordhelper.github.io/fallenswordhelper/resources/1518/calfSystem.css',
    localForage: 'https://cdnjs.cloudflare.com/ajax/libs/localforage/1.5.0/localforage.min.js',
    dataTablesLoc: 'https://cdn.datatables.net/1.10.13/js/jquery.dataTables.min.js',
  };

  function appendHead(o) { // native
    var count = 0;
    var scriptFiles = o.js || [];
    var cssFiles = o.css || [];
    var head = document.getElementsByTagName('head')[0];

    cssFiles.forEach(function(c) {
      var linkTag = document.createElement('link');
      linkTag.type = 'text/css';
      linkTag.rel = 'stylesheet';
      linkTag.href = c;
      head.appendChild(linkTag);
    });

    scriptFiles.forEach(function(s) {
      var scriptTag = document.createElement('script');
      scriptTag.type = 'text/javascript';
      if (typeof o.callback === 'function') {
        scriptTag.onload = function() {
          count += 1;
          if (count === o.js.length) {
            o.callback(o.param1, o.param2);
          }
        };
      }
      scriptTag.src = s;
      head.appendChild(scriptTag);
    });
  }

  function onPageLoad() {
    FSH.dispatch();
  }

  var o = {
    css: [resources.calfSystemCss],
    js: [
      resources.localForage,
      resources.calfSystemJs,
      resources.dataTablesLoc
    ],
    callback: onPageLoad
  };
  if (typeof window.jQuery === 'undefined') {
    o.js.pop();
  }
  appendHead(o);

} // end of var main

if (typeof GM_info === 'undefined') { // Chromium Native
  var script = document.createElement('script');
  script.textContent = '(' + fshMain.toString() + ')();';
  document.body.appendChild(script);
} else {
  fshMain();
}
