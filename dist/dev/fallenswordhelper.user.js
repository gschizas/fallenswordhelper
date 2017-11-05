// ==UserScript==
// @name           FallenSwordHelper
// @namespace      terrasoft.gr
// @description    Fallen Sword Helper
// @include        https://www.fallensword.com/*
// @include        https://guide.fallensword.com/*
// @include        https://fallensword.com/*
// @include        https://*.fallensword.com/*
// @include        https://local.huntedcow.com/fallensword/*
// @exclude        https://forum.fallensword.com/*
// @exclude        https://wiki.fallensword.com/*
// @exclude        https://www.fallensword.com/app.php*
// @exclude        https://www.fallensword.com/fetchdata.php*
// @version        1520a11
// @downloadURL    https://192.168.137.1:9966/dist/dev/fallenswordhelper.user.js
// @grant          none
// ==/UserScript==

// No warranty expressed or implied. Use at your own risk.

// EVERYTHING MUST BE IN main()
function fshMain() {

  function setVer() {
    var ver = '1520a11';
    if (typeof GM_info === 'undefined') {return ver + '_native';}
    return ver;
  }

  window.FSH = window.FSH || {};

  FSH.version = setVer();

  var resources = {
    calfSystemJs: 'https://192.168.137.1:9966/dist/dev/calfSystem.js',
    calfSystemCss: 'https://192.168.137.1:9966/src/calfSystem.css',
    localForage: 'https://cdnjs.cloudflare.com/ajax/libs/localforage/1.5.0/localforage.min.js',
    dataTablesLoc: 'https://cdn.datatables.net/1.10.13/js/jquery.dataTables.min.js'
  };

  function appendHead(o) {
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
