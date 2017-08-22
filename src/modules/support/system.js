import calf from './calf';
import retryAjax from '../ajax/retryAjax';
import * as dataObj from './dataObj';

export var server = document.location.protocol + '//' +
  document.location.host + '/';
export var imageServer = window.HCS && window.HCS.defines &&
  window.HCS.defines.fileserver &&
  window.HCS.defines.fileserver.slice(0, -1);

export function fallback(a, b) {
  return a || b;
}

export function getValue(name) {
  //#if _DEV  //  No default setting available
  if (typeof dataObj.defaults[name] === 'undefined') {
    // eslint-disable-next-line no-console
    console.log(name, dataObj.defaults[name]);
  }
  //#endif
  return GM_getValue(name, dataObj.defaults[name]);
}

function reviver(key, value) {
  if (typeof value === 'string') {
    var a =
      /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/
        .exec(value);
    if (a) {
      return new Date(Date.UTC(Number(a[1]), Number(a[2]) - 1, Number(a[3]),
        Number(a[4]), Number(a[5]), Number(a[6])));
    }
  }
  return value;
}

export function getValueJSON(name) {
  var resultJSON = getValue(name);
  var result;
  if (resultJSON) {result = JSON.parse(resultJSON, reviver);}
  return result;
}

export function setValueJSON(name, value) {
  GM_setValue(name, JSON.stringify(value));
}

export function setValue(name, value) {
  GM_setValue(name, value);
}

function getTarget(doc) {
  if (doc instanceof HTMLDocument) {return doc;}
  return document;
}

function patchXPath(xpath) {
  if (xpath.indexOf('/') === 0) {
    return '.' + xpath;
    // TODO this is likely to be bad
    // this is a chrome fix - needs a .// for xpath
    // where as firefox can function without it.
    // firefox still works with .//
  }
  return xpath;
}

export function findNodes(xpath, doc) {
  var _xpath = patchXPath(xpath);
  var nodes = [];
  var target;
  // We may have passed in a HTMLDocument object as the context
  // See createDocument with DOMParser below
  // This only matters in Firefox. evaluate will fail silently if
  // the context is not part of the calling object.
  var _doc = fallback(doc, document);
  target = getTarget(_doc);
  var findQ = target.evaluate(_xpath, _doc, null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  if (findQ.snapshotLength === 0) {return null;}
  for (var i = 0; i < findQ.snapshotLength; i += 1) {
    nodes.push(findQ.snapshotItem(i));
  }
  return nodes;
}

export function findNode(xpath, doc) {
  var nodes = findNodes(xpath, doc);
  if (!nodes) {return null;}
  return nodes[0];
}

export function createDocument(details) {
  // Use DOMParser to prevent img src tags downloading
  var parser = new DOMParser();
  var doc = parser.parseFromString(details, 'text/html');
  return doc;
}

export function xmlhttp(theUrl, func, theCallback) {
  return retryAjax(theUrl).done(function(responseDetails) {
    if (func) {
      func(responseDetails, theCallback);
    }
  });
}

export function intValue(theText) {
  if (!theText) {return 0;}
  return parseInt(theText.replace(/,/g, ''), 10);
}

export function getIntFromRegExp(theText, rxSearch) {
  var result;
  var matches = theText.replace(/,/g, '').match(rxSearch);
  if (matches) {
    result = parseInt(matches[1], 10);
  } else {
    result = 0;
  }
  return result;
}

export function addCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function convertTextToHtml(inputText) {
  return inputText
    .replace(/</g, '&lt')
    .replace(/>/g, '&gt')
    .replace(/\n/g, '<br>')
    .replace(/\[\/([a-z])\]/g, '</$1>')
    .replace(/\[([a-z])\]/g, '<$1>');
}

export function parseDateAsTimestamp(textDate) {
  var dateAry = textDate.split(/[: /[]/);
  return Date.UTC(Number(dateAry[4]), dataObj.months.indexOf(dateAry[3]),
    Number(dateAry[2]), Number(dateAry[0]), Number(dateAry[1]), 0);
}

export function parseDate(textDate) {
  return new Date(parseDateAsTimestamp(textDate));
}

export function toggleVisibilty(evt) {
  var anItemId = evt.target.getAttribute('linkto');
  var anItem = document.getElementById(anItemId);
  var currentVisibility = anItem.classList.contains('fshHide');
  anItem.classList.toggle('fshHide');
  if (currentVisibility) {
    setValue(anItemId, '');
  } else {
    setValue(anItemId, 'ON');
  }
}

function outputParamVal(param) {
  if (typeof param === 'undefined') {return true;}
  return param;
}

export function getCustomUrlParameter(sPageURL, sParam) {
  var sURLVariables = sPageURL.split('&');
  var sParameterName;
  for (var i = 0; i < sURLVariables.length; i += 1) {
    sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] === sParam) {
      return outputParamVal(sParameterName[1]);
    }
  }
}

export function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1));
  return getCustomUrlParameter(sPageURL, sParam);
}

export function outputFormat(value, suffix) {
  if (value === 0) {return '';}
  return value.toString() + suffix;
}

export function formatLastActivity(last_login) {
  var s = Math.abs(Math.floor(Date.now() / 1000 - last_login));
  var m = Math.floor(s / 60);
  s %= 60;
  var h = Math.floor(m / 60);
  m %= 60;
  var d = Math.floor(h / 24);
  h %= 24;
  return outputFormat(d, ' days, ') + outputFormat(h, ' hours, ') +
    outputFormat(m, ' mins, ') + s + ' secs';
}

function getPath(obj, aPath, def) {
  var _obj = obj;
  var _path = aPath.split('.');
  var len = _path.length;
  for (var i = 0; i < len; i += 1) {
    if (fallback(!_obj, typeof _obj !== 'object')) {return def;}
    _obj = _obj[_path[i]];
  }
  return _obj;
}

function path(obj, aPath, def) {
  var _obj = getPath(obj, aPath, def);
  if (typeof _obj === 'undefined') {return def;}
  return _obj;
}

function sortDesc(result) {
  if (calf.sortAsc) {return result;}
  return -result;
}

export function stringSort(a, b) {
  var result = 0;
  var _a = path(a, calf.sortBy, 'a');
  var _b = path(b, calf.sortBy, 'a');
  if (_a.toLowerCase() < _b.toLowerCase()) {result = -1;}
  if (_a.toLowerCase() > _b.toLowerCase()) {result = 1;}
  return sortDesc(result);
}

function intFromString(val) {
  if (typeof val === 'string') {
    return parseInt(val.replace(/,|#/g, ''), 10);
  }
  return val;
}

export function numberSort(a, b) {
  if (typeof a.type !== 'undefined' && a.type > 8) {return 1;} // non equipment items
  if (typeof a.type !== 'undefined' && b.type > 8) {return -1;}
  var valueA = path(a, calf.sortBy, 1);
  var valueB = path(b, calf.sortBy, 1);
  valueA = intFromString(valueA);
  valueB = intFromString(valueB);
  var result = valueA - valueB;
  return sortDesc(result);
}

export function testRange(aValue, min, max) {
  var theValue = parseInt(aValue, 10);
  if (!isNaN(theValue) && theValue > min && theValue < max) {
    return theValue;
  }
}

export function testQuant(aValue) {
  return testRange(aValue, 0, 100);
}

export function getRandomInt(_min, _max) {
  var min = Math.ceil(_min);
  var max = Math.floor(_max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export function rnd() {
  return getRandomInt(1000000000, 9999999998);
}

export function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function isSelected(val, test) {
  if (val === test) {return ' selected';}
  return '';
}

export function shouldBeArray(pref) {
  var stored = getValue(pref);
  if (stored && stored !== '') {return stored.split(/\s*,\s*/);}
  return [];
}

export function isChecked(pref) {
  if (pref) {return ' checked';}
  return '';
}

export function padZ(n) {
  var ret = n.toString();
  if (n < 10) {ret = '0' + ret;}
  return ret;
}
