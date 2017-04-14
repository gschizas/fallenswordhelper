import * as debug from './debug';

// GM_ApiBrowserCheck
// @author        GIJoe
// @license       http://creativecommons.org/licenses/by-nc-sa/3.0/
// Global variables
var gvar = {};
var GMSTORAGE_PATH = 'GM_';
// You can change it to avoid conflict with others scripts
var needApiUpgrade = false;
if (window.navigator.appName.match(/^opera/i) &&
    typeof window.opera !== 'undefined') {
  needApiUpgrade = true;
  gvar.isOpera = true;
  window.GM_log = window.opera.postError;
}
if (typeof GM_setValue !== 'undefined') {
  var gsv;
  try {
    gsv = window.GM_setValue.toString();
  } catch (e) {
    gsv = 'staticArgs';
  }
  if (gsv.indexOf('staticArgs') > 0) {
    gvar.isGreaseMonkey = true;
  // test GM_hitch
  } else if (gsv.match(/not\s+supported/)) {
    needApiUpgrade = true;
    gvar.isBuggedChrome = true;
  }
} else {
  needApiUpgrade = true;
}

if (needApiUpgrade) {
  var ws = null;
  var uid = new Date().toString();
  var result;
  try {
    window.localStorage.setItem(uid, uid);
    result = window.localStorage.getItem(uid) === uid;
    window.localStorage.removeItem(uid);
    if (result) {
      ws = typeof window.localStorage;
    } else {
      debug.log('There is a problem with your local storage. ' +
        'FSH cannot persist your settings.');
      ws = null;
    }
  } catch (e) {
    ws = null;
  }
  // Catch Security error
  if (ws === 'object') {
    var parser = [
      {
        condition: 'S]',
        result: function(value) {return value.substr(2);}
      },
      {
        condition: 'N]',
        result: function(value) {return parseInt(value.substr(2), 10);}
      },
      {
        condition: 'B]',
        result: function(value) {return value.substr(2) === 'true';}
      }
    ];
    window.GM_getValue = function(name, defValue) {
      var value = window.localStorage.getItem(GMSTORAGE_PATH + name);
      if (value === null || typeof value === 'undefined') {return defValue;}
      var index = 0;
      while (index < parser.length) {
        var test = parser[index];
        if (value.substr(0, 2) === test.condition) {return test.result(value);}
        index += 1;
      }
      return value;
    };
    window.GM_setValue = function(name, value) {
      switch (typeof value) {
      case 'string':
        window.localStorage.setItem(GMSTORAGE_PATH + name,
          'S]' + value);
        break;
      case 'number':
        if (value.toString().indexOf('.') < 0) {
          window.localStorage.setItem(GMSTORAGE_PATH + name,
            'N]' + value);
        }
        break;
      case 'boolean':
        window.localStorage.setItem(GMSTORAGE_PATH + name,
          'B]' + value);
        break;
      // no default
      }
    };
  } else if (!gvar.isOpera || typeof GM_setValue === 'undefined') {
    gvar.temporarilyStorage = [];
    window.GM_getValue = function(name, defValue) {
      if (typeof gvar.temporarilyStorage[GMSTORAGE_PATH + name] ===
        'undefined') {return defValue;}
      return gvar.temporarilyStorage[GMSTORAGE_PATH + name];
    };
    window.GM_setValue = function(name, value) {
      switch (typeof value) {
      case 'string':
      case 'boolean':
      case 'number':
        gvar.temporarilyStorage[GMSTORAGE_PATH + name] = value;
      // no default
      }
    };
  }

  window.GM_listValues = function() {
    var list = [];
    var reKey = new RegExp('^' + GMSTORAGE_PATH);
    for (var i = 0, il = window.localStorage.length; i < il; i += 1) {
      var key = window.localStorage.key(i);
      if (key.match(reKey)) {
        list.push(key.replace(GMSTORAGE_PATH, ''));
      }
    }
    return list;
  };
}
