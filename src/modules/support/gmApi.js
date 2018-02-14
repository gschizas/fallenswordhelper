import isUndefined from '../common/isUndefined';
import {log} from './debug';

// GM_ApiBrowserCheck
// @author        GIJoe
// @license       http://creativecommons.org/licenses/by-nc-sa/3.0/
// Global variables
var gvar = {};
var GMSTORAGE_PATH = 'GM_';

function storItem(name, type, value) {
  window.localStorage.setItem(GMSTORAGE_PATH + name, type + value);
}

var reviver = [
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
var cold = [
  {
    condition: 'string',
    result: function(name, value) {storItem(name, 'S]', value);}
  },
  {
    condition: 'number',
    result: function(name, value) {
      if (value.toString().indexOf('.') < 0) {storItem(name, 'N]', value);}
    }
  },
  {
    condition: 'boolean',
    result: function(name, value) {storItem(name, 'B]', value);}
  }
];

function retrieve(value) {
  for (var i = 0; i < reviver.length; i += 1) {
    var test = reviver[i];
    if (value.substr(0, 2) === test.condition) {return test.result(value);}
  }
  return value;
}

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
      log('There is a problem with your local storage. ' +
        'FSH cannot persist your settings.');
      ws = null;
    }
  } catch (e) {
    ws = null;
  }
  // Catch Security error
  if (ws === 'object') {
    window.GM_getValue = function(name, defValue) {
      var value = window.localStorage.getItem(GMSTORAGE_PATH + name);
      if (value === null || isUndefined(value)) {return defValue;}
      return retrieve(value);
    };
    window.GM_setValue = function(name, value) {
      for (var i = 0; i < cold.length; i += 1) {
        var storType = cold[i];
        if (typeof value === storType.condition) {
          storType.result(name, value);
        }
      }
    };
  } else if (!gvar.isOpera || isUndefined(window.GM_setValue)) {
    gvar.temporarilyStorage = [];
    window.GM_getValue = function(name, defValue) {
      if (typeof gvar.temporarilyStorage[GMSTORAGE_PATH + name] ===
        'undefined') {return defValue;}
      return gvar.temporarilyStorage[GMSTORAGE_PATH + name];
    };
    window.GM_setValue = function(name, value) {
      if (['string', 'boolean', 'number'].indexOf(typeof value) !== -1) {
        gvar.temporarilyStorage[GMSTORAGE_PATH + name] = value;
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
