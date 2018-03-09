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
// @version        1523a
// @downloadURL    https://192.168.137.1:9966/dist/dev/fallenswordhelper.user.js
// @grant          none
// ==/UserScript==

// No warranty expressed or implied. Use at your own risk.

// EVERYTHING MUST BE IN main()
function fshMain(ver) {

  window.FSH = window.FSH || {};
  window.FSH.version = ver;

  var cssFiles = ['https://192.168.137.1:9966/src/calfSystem.css'];
  var scriptFiles = [
    'https://cdnjs.cloudflare.com/ajax/libs/localforage/1.6.0/localforage.nopromises.min.js',
    'https://192.168.137.1:9966/dist/dev/calfSystem.js'
  ];
  if (typeof window.jQuery !== 'undefined') {
    scriptFiles.push('https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js');
  }
  var count = cssFiles.length + scriptFiles.length;

  function onPageLoad() {
    count -= 1;
    if (count === 0) {FSH.dispatch();}
  }

  cssFiles.forEach(function(c) {
    var linkTag = document.createElement('link');
    linkTag.type = 'text/css';
    linkTag.rel = 'stylesheet';
    linkTag.onload = onPageLoad;
    linkTag.href = c;
    document.body.appendChild(linkTag);
  });

  scriptFiles.forEach(function(s) {
    var scriptTag = document.createElement('script');
    scriptTag.type = 'text/javascript';
    scriptTag.onload = onPageLoad;
    scriptTag.src = s;
    scriptTag.crossOrigin = 'anonymous';
    document.body.appendChild(scriptTag);
  });

} // end of var main

var verTest = [
  [
    function() {return GM_info === 'undefined';},
    function(ver) {return ver + '_native';}
  ],
  [
    function() {
      return GM_info.scriptHandler === 'Greasemonkey' &&
        Number(GM_info.version.split('.')[0]) >= 4;
    },
    function() {return false;}
  ],
  [function() {return true;}, function(ver) {return ver;}]
];

function setVer() {
  var ver = '1523a';
  return verTest.find(function(e) {return e[0]();})[1](ver);
}

function injectFsh(fshVer) {
  var script = document.createElement('script');
  script.textContent = '(' + fshMain.toString() + ')(\'' + fshVer + '\');';
  document.body.appendChild(script);
  document.body.removeChild(script);
}

var getVer = setVer();
if (getVer) {injectFsh(getVer);}
