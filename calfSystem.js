(function() {

'use strict';

window.FSH = window.FSH || {};

// GM_ApiBrowserCheck
// @author        GIJoe
// @license       http://creativecommons.org/licenses/by-nc-sa/3.0/
// Global variables
(function GM_ApiBrowserCheck() {
	var gvar = {};
	var GMSTORAGE_PATH = 'GM_';
	// You can change it to avoid conflict with others scripts
	//~ if (typeof unsafeWindow === 'undefined'){
		//~ window.unsafeWindow = window;
	//~ }
	var needApiUpgrade = false;
	if (window.navigator.appName.match(/^opera/i) && 
			typeof window.opera !== 'undefined'){
		needApiUpgrade = true;
		gvar.isOpera = true;
		window.GM_log = window.opera.postError;
	}
	if (typeof GM_setValue !== 'undefined'){
		var gsv;
		try {
			gsv=window.GM_setValue.toString();
		} catch(e) {
			gsv='staticArgs';
		}
		if (gsv.indexOf('staticArgs') > 0){
			gvar.isGreaseMonkey = true;
		}
		// test GM_hitch
		else if (gsv.match(/not\s+supported/)){
			needApiUpgrade = true;
			gvar.isBuggedChrome = true;
		}
	} else{
		needApiUpgrade = true;
	}

	if (needApiUpgrade){
		var ws = null;
		var uid = new Date().toString();
		var result;
		try{
			window.localStorage.setItem(uid, uid);
			result = window.localStorage.getItem(uid) === uid;
			window.localStorage.removeItem(uid);
			if (result) {
				ws = typeof window.localStorage;
			} else {
				console.log('There is a problem with your local storage. ' +
					'FSH cannot persist your settings.');
				ws = null;
			}
		} catch(e){
			ws = null;
		}
		// Catch Security error
		if (ws === 'object'){
			window.GM_getValue = function(name, defValue){
				var value = window.localStorage.getItem(GMSTORAGE_PATH + name);
				if (value === null || value === undefined) {
					return defValue;
				} else {
					switch (value.substr(0, 2)) {
					case 'S]':
						return value.substr(2);
					case 'N]':
						return parseInt(value.substr(2), 10);
					case 'B]':
						return value.substr(2) === 'true';
					}
				}
				return value;
			};
			window.GM_setValue = function(name, value){
				switch (typeof value){
				case 'string':
					window.localStorage.setItem(GMSTORAGE_PATH + name,
						'S]' + value);
					break;
				case 'number':
					if (value.toString().indexOf('.') < 0){
						window.localStorage.setItem(GMSTORAGE_PATH + name,
							'N]' + value);
					}
					break;
				case 'boolean':
					window.localStorage.setItem(GMSTORAGE_PATH + name,
						'B]' + value);
					break;
				}
			};
		} else if (!gvar.isOpera || typeof GM_setValue === 'undefined'){
			gvar.temporarilyStorage = [];
			window.GM_getValue = function(name, defValue){
				if (typeof gvar.temporarilyStorage[GMSTORAGE_PATH + name] ===
					'undefined') {
					return defValue;
				} else {
					return gvar.temporarilyStorage[GMSTORAGE_PATH + name];
				}
			};
			window.GM_setValue = function(name, value){
				switch (typeof value){
				case 'string':
				case 'boolean':
				case 'number':
					gvar.temporarilyStorage[GMSTORAGE_PATH + name] = value;
				}
			};
		}

		window.GM_listValues = function(){
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
})();
//window.FSH.GM_ApiBrowserCheck();

// jquery GM_get/set wrapper
//~ (function GM_JQ_wrapper() {
	//~ if (typeof GM_setValue !== 'undefined') {
		//~ var oldGM_setValue = GM_setValue;
		//~ GM_setValue = function(name, value){
			//~ setTimeout(function() {oldGM_setValue(name, value);}, 0);
		//~ };
	//~ }
//~ })();
//window.FSH.GM_JQ_wrapper();

// FSH.System.functions
FSH.System = {

	init: function() {
		FSH.System.server = document.location.protocol + '//' +
			document.location.host + '/';
		var imgurls = FSH.System.findNode('//img[contains(@src, "/skin/")]');
		if (!imgurls) {return;} //login screen or error loading etc.
		var idindex = imgurls.src.indexOf('/skin/');
		FSH.System.imageServer = imgurls.src.substr(0,idindex);
		//FSH.System.imageServerHTTP = 'http://cdn.fallensword.com';
	},

	getValue: function(name) {
		return GM_getValue(name, FSH.Data.defaults[name]);
	},

	getValueJSON: function(name) {
		var resultJSON = FSH.System.getValue(name);
		var result;
		if (resultJSON) {
			var reviver = function (key, value) {
				if (typeof value === 'string') {
					var a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
					if (a) {
						return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4], +a[5], +a[6]));
					}
				}
				return value;
			};
			result = JSON.parse(resultJSON, reviver);
		}
		return result;
	},

	setValueJSON: function(name, value) {
		GM_setValue(name, JSON.stringify(value));
	},

	setValue: function(name, value) {
		GM_setValue(name, value);
	},

	findNode: function(xpath, doc) {
		var nodes = FSH.System.findNodes(xpath, doc);
		if (!nodes) {return null;}
		return nodes[0];
	},

	findNodes: function(xpath, doc) {
		var nodes = [];
		if (xpath.indexOf('/') === 0) {
			xpath = '.'+xpath;
			// TODO this is likely to be bad
			// this is a chrome fix - needs a .// for xpath
			// where as firefox can function without it.
			// firefox sitll works with .//
		}

		var target;
		// We may have passed in a HTMLDocument object as the context
		// See createDocument with DOMParser below
		// This only matters in Firefox. evaluate will fail silently if 
		// the context is not part of the calling object.
		doc = doc || document;
		if (doc instanceof HTMLDocument) {
			target = doc;
		} else {
			target = document;
		}
		var findQ = target.evaluate(xpath, doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (findQ.snapshotLength === 0) {return null;}
		for (var i = 0; i < findQ.snapshotLength; i += 1) {
			nodes.push(findQ.snapshotItem(i));
		}
		return nodes;
	},

	findNodeText: function(xpath, doc) {
		var node = FSH.System.findNode(xpath, doc);
		if (!node) {return null;}
		return node.textContent;
	},

	findNodeInt: function(xpath, doc) {
		var node = FSH.System.findNode(xpath, doc);
		if (!node) {return null;}
		return FSH.System.intValue(node.textContent);
	},

	createDocument: function(details) {
		//~ var doc = document.createElement('HTML');
		//~ doc.innerHTML = details;
		// Use DOMParser to prevent img src tags downloading
		var parser = new DOMParser();
		var doc = parser.parseFromString(details, 'text/html');
		return doc;
	},

	formatDateTime: function(aDate) {
		//var result=aDate.toDateString();
		var yyyy = aDate.getFullYear();
		var mon = aDate.getMonth()+1;
		if (mon<10) {mon = '0' + mon;}
		var dd = aDate.getDate();
		if (dd<10) {dd = '0' + dd;}

		var hh=aDate.getHours();
		if (hh<10) {hh = '0' + hh;}
		var mm=aDate.getMinutes();
		if (mm<10) {mm = '0' + mm;}
		var ss=aDate.getSeconds();
		if (ss<10) {ss = '0' + ss;}
		var result = yyyy + '-' + mon + '-' + dd + ' ' + hh + ':' + mm + ':' + ss;
		return result;
	},

	formatShortDate: function(aDate) {
		var result;
		var months = ['January', 'February', 'March', 'April', 'May', 'June',
			'July', 'August', 'September', 'October', 'November', 'December'];
		var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
			'Friday', 'Saturday'];
		var yyyy = aDate.getFullYear();
		var dd = aDate.getDate();
		if (dd<10) {dd = '0' + dd;}
		var ddd = days[aDate.getDay()].substr(0, 3);
		var month = months[aDate.getMonth()].substr(0, 3);
		var hh=aDate.getHours();
		if (hh<10) {hh = '0' + hh;}
		var mm=aDate.getMinutes();
		if (mm<10) {mm = '0' + mm;}
		result = hh + ':' + mm + ' ' + ddd + ' ' + dd + '/' + month + '/' +
			yyyy;
		return result;
	},

	saveValueForm: function(name) {
		var formElement = FSH.System.findNode('//input[@name="' + name + '"]',
			this);
		if (formElement.getAttribute('type') === 'checkbox') {
			FSH.System.setValue(name, formElement.checked);
		} else if (formElement.getAttribute('type') === 'radio') {
			var radioElements = FSH.System.findNodes('//input[@name="' + name +
				'"]', 0, this);
			for (var i=0; i<radioElements.length; i += 1) {
				//~ var radioElement = radioElements[i];
				if (radioElements[i].checked) {
					FSH.System.setValue(name, radioElements[i].value);
				}
			}
		} else {
			FSH.System.setValue(name, formElement.value);
		}
	},

	xmlhttp: function(theUrl, func, theCallback) {
		return $.ajax({
			url: theUrl,
			callback: theCallback,
			success: function(responseDetails) {
				if (func) {
					func.call(this, responseDetails, this.callback);
				}
			}
		});
	},

	intValue: function(theText) {
		if (!theText) {return 0;}
		return parseInt(theText.replace(/,/g,''),10);
	},

	getIntFromRegExp: function(theText, rxSearch) {
		var result;
		var matches = theText.replace(/,/g,'').match(rxSearch);
		if (matches) {
			result = parseInt(matches[1],10);
		} else {
			result = 0;
		}
		return result;
	},

	addCommas: function(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	},

	uniq: function (arr, removeBy){
		var seen = {};
		var out = [];
		var len = arr.length;
		var j = 0;
		var i;
		var item;
		if (removeBy) {
			for (i = 0; i < len; i += 1) {
				item = arr[i];
				if (seen[item[removeBy]] === 1) {continue;}
				seen[item[removeBy]] = 1;
				out[j] = item;
				j += 1;
			}
		} else {
			for (i = 0; i < len; i += 1) {
				item = arr[i];
				if (seen[item] === 1) {continue;}
				seen[item] = 1;
				out[j] = item;
				j += 1;
			}
		}
		return out;
	},

	convertTextToHtml: function(inputText) {
		return inputText.
			replace(/</g,'&lt').
			replace(/>/g,'&gt').
			replace(/\n/g,'<br>').
			replace(/\[\/([a-z])\]/g,'<\/\$1>').
			replace(/\[([a-z])\]/g,'<\$1>');
	},

	parseDate: function(textDate) {
		var textDateSplitSpace = textDate.split(' ');
		var timeText = textDateSplitSpace[0];
		var dateText = textDateSplitSpace[1];
		var dayText = dateText.split('/')[0];
		var monthText = dateText.split('/')[1];
		var months = {'Jan': 'January',
			'Feb': 'February',
			'Mar': 'March',
			'Apr': 'April',
			'May': 'May',
			'Jun': 'June',
			'Jul': 'July',
			'Aug': 'August',
			'Sep': 'September',
			'Oct': 'October',
			'Nov': 'November',
			'Dec': 'December'
			};
		var fullMonthText = months[monthText];
		var yearText = dateText.split('/')[2];
		var dateAsDate = new Date(fullMonthText + ' ' + dayText + ', ' + yearText + ' ' + timeText + ':00');
		return dateAsDate;
	},

	toggleVisibilty: function(evt) {
		var anItemId = evt.target.getAttribute('linkto');
		var anItem = document.getElementById(anItemId);
		var currentVisibility = anItem.style.visibility;
		anItem.style.visibility = currentVisibility === 'hidden' ? 'visible' : 'hidden';
		anItem.style.display = currentVisibility === 'hidden' ? 'block' : 'none';
		if (FSH.System.getValue(anItemId)) {
			FSH.System.setValue(anItemId, '');
		} else {
			FSH.System.setValue(anItemId, 'ON');
		}
	},

	addStyle: function(css) {
		var style = document.createElement('style');
		style.textContent = css;
		document.getElementsByTagName('head')[0].appendChild(style);
	},

	openInTab: function(url){
		setTimeout(function() {window.open(url, '');}, 0);
	},

	escapeHtml: function(unsafe) {
		return unsafe
			 .replace(/&/g, '&amp;')
			 .replace(/</g, '&lt;')
			 .replace(/>/g, '&gt;')
			 .replace(/"/g, '&quot;')
			 .replace(/'/g, '&#039;');
	},

	getUrlParameter: function(sParam) {
		var sPageURL = decodeURIComponent(window.location.search.substring(1)),
			sURLVariables = sPageURL.split('&'),
			sParameterName,
			i;

		for (i = 0; i < sURLVariables.length; i+=1) {
			sParameterName = sURLVariables[i].split('=');

			if (sParameterName[0] === sParam) {
				return sParameterName[1] === undefined ? true : sParameterName[1];
			}
		}
	},

	formatLastActivity: function(last_login) {
		var d, h, m, s;
		s = Math.abs(Math.floor(Date.now() / 1000 - last_login));
		m = Math.floor(s / 60);
		s = s % 60;
		h = Math.floor(m / 60);
		m = m % 60;
		d = Math.floor(h / 24);
		h = h % 24;
		return (d === 0 ? '' : d + ' days, ') +
			(h === 0 ? '' : h + ' hours, ') +
			(m === 0 ? '' : m + ' mins, ') +
			s + ' secs';
	},

	contactColor: function(last_login, type) {
		var out = 'white';
		var now = Math.floor(Date.now() / 1000);
		if (now - last_login < 120) { // 2 mins
			out = type ? 'DodgerBlue' : 'red';
		} else if (now - last_login < 300) { // 5 mins
			out = type ? 'LightSkyBlue' : 'PaleVioletRed';
		} else {out = type ? 'PowderBlue' : 'Pink';}
		return out;
	},

	getFunction: function(funcName) {

		if (typeof ga !== 'undefined') {
			ga('fsh.send', 'screenview', {screenName: funcName});
		}

		funcName = funcName.split('.');
		if (funcName.length === 1) {
			return FSH.Helper[funcName[0]];
		} else if (funcName.length === 2) {
			return FSH[funcName[0]][funcName[1]];
		}
	},

	removeHTML: function(buffName) { // Native
		return buffName.replace(/<\/?[^>]+(>|$)/g, '').replace(/[^a-zA-Z 0-9]+/g,'');
	},

};
FSH.System.init();

FSH.Data = {

	//~ plantFromComponent: function(aComponent) {
		//~ switch(aComponent) {
			//~ case 'Amber Essense':      return 'Amber Plant';
			//~ case 'Blood Bloom Flower': return 'Blood Bloom Plant';
			//~ case 'Dark Shade ':        return 'Dark Shade Plant';
			//~ case 'Snake Eye':          return 'Elya Snake Head';
			//~ case 'Snake Venom Fang':   return 'Elya Snake Head';
			//~ case 'Heffle Wart':        return 'Heffle Wart Plant';
			//~ case 'Jademare Blossom':   return 'Jademare Plant';
			//~ case 'Trinettle Leaf':     return 'Trinettle Plant';
			//~ case 'Purplet Flower':     return 'Purplet Plant';
			//~ default:                   return aComponent;
		//~ }
	//~ },

	plantFromComponent : {
		'Amber Essense':      'Amber Plant',
		'Blood Bloom Flower': 'Blood Bloom Plant',
		'Dark Shade ':        'Dark Shade Plant',
		'Snake Eye':          'Elya Snake Head',
		'Snake Venom Fang':   'Elya Snake Head',
		'Heffle Wart':        'Heffle Wart Plant',
		'Jademare Blossom':   'Jademare Plant',
		'Trinettle Leaf':     'Trinettle Plant',
		'Purplet Flower':     'Purplet Plant',
	},

	huntingOnImage:
		'<img title="Hunting mode is ON" src="' +
		'data:image/gif;base64,R0lGODlhKAAoALMAAD+yQH3Kf7zjvxCfEMvpzur17qzcr' +
		'y+rMDCsMGLAY9vv3k64T5fUmh+lIPr7/gCZACH5BAAAAAAALAAAAAAoACgAAASsEL1J' +
		'q704T6m7/2AojmRpnmiqrtQSBA2rDYJjO4mMBfd9YICXcAEoFn+eQs8WAAoDDIFiSRV' +
		'YGROqwxAaELTVyXSZCx0ESrBNMFlYpY7CwOQFF67PAABZqqvBBHN9X39aXHSEhUsofo' +
		'o3KY2OgieRhQAqAy8JAAZ/lzo1amUyoWBNoH+nMmlghzKFbDqwOgOKOgC2MriFkyq7n' +
		'jIDRsPEvTrHyMnKy8zHHM0bEQA7' + '" border=0 width=10 height=10>',

	huntingOffImage:
		'<img title="Hunting mode is OFF" src="' +
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtA' +
		'AAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAA' +
		'gOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHY' +
		'zLjM2qefiJQAAAVhJREFUWEftl08OQTEQxrkq5xDHkDiDxAUkrEms7IiNFQtWNiTKJx' +
		'mppm2mpp33IhXNC9qZX7/50+qaTuf1bvELgG0ekK8CSkSoCkrUexew1EDp9Y0ADpZDg' +
		'8HZnCrg7DA3t/vja/QW/SioGiAUc+Hoc0zJDyDJbj85IeDOOV3PQcBYuIOAo83YICTb' +
		'yz5o2KcI1tCADdpASD18P9lNg2FmhXh1XCdBEgxACTC20VgesgDhBM5iYQqpaaeArS4' +
		'BwyYrB7m5RPM4qsK5He5f8pytoG8DHMhY7tm/wZbPhwgQBnNC+opFDJgb0lUxC2BOyG' +
		'KAuSCLAuaALA4IB9ROqAEj+bnVrALoOvHdYkLA7qmSrUhijT4F0L04VEAom3KGu81aR' +
		'UFugWCefQNS+9P0V4DYjF1wrQtxBfT1w5QcbETB1Nu6eg5WQIkC0rUqbUYCWQEl6qmd' +
		'xRLIJyPitjwjlrDgAAAAAElFTkSuQmCC' + '" border=0 width=10 height=10>',

	soundMuteImage:
		'<img border=0 title="Turn Off Sound when you have a new log message' +
		'" width=10 height=10 src="' +
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hA' +
		'AAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJ' +
		'ZTwAAAHNSURBVHjaYvz//z8DJQAggJgYKAQAAUS0Ad3dnZFtbS1P0cUBAoiFkMaenm7' +
		'm////Nfz9+7f4379/nO/9/XOAwpsEN258BJIHCCAMA/r7+6wYGCDh8u/ffwag5oXCws' +
		'IqQkJCDOw7doCE04B4GUw9QABhGADUcJSVlQ1EMzABPSgsLMbAxsbBIHnyNIPMqzcgJ' +
		'VeAtr+DqQcIIAwD/v37y2BoaMjw8+cvIPsfw5MnTxhEjx1gkHv9muEdCwsD19+/acjq' +
		'AQIIw4A/f/4yPH78mOHhw0dgAwwePmTQAWr+xMHBMF+Yn6Fn8vQvyOoBAgiLAX8Yvn7' +
		'9wnDv3j0Gx0+fGHS+f2d4AUwri/l5GX79/YcRyAABhBGNP358ZwClLV+g7Xa/fjG8YW' +
		'RgqP78meED0CCQ99ABQABhuODnz58MYsePMRh9+MjwnpmFYamUOAMXMDSZgBjkJXQAE' +
		'EAYLkh68HiO9bsPH5j//b++ho/L5fOvH3dlZCQZxMSEGbAle4AAQjEAmEgMJH798gem' +
		'nNvs//+bNcxduJeBgVH9+7fvbW/fvPuOLaEBBBDYVGT8zs/PHYh50MVTUxOjgfgZujh' +
		'AADFSmhsBAoji3AgQYAAwuNxkuZyGCwAAAABJRU5ErkJggg==' + '">',

	soundImage:
		'<img border=0 title="Turn On Sound when you have a new log message' +
		'" width=10 height=10 src="' +
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hA' +
		'AAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJ' +
		'ZTwAAAI9SURBVHjaYvz//z8DJQAggJgYKAQAAYTTgO7uzsi2tpanhAwACCAWdIGenm7' +
		'm////Nfz9+7f4379/nNg0PcoqTmH48XOb3LwpzwACiKW/v8+KgQESDv/+/WcAal4oLC' +
		'ysIiQkxHDhwnlMzRmF1dxMf1u+fvtxBsg1BQggFqCGo6ysbCCNDExADwkLizGwsXEwf' +
		'P78heHnj5+omtMLUoE2b/z153cLD8s/k0duIdkAAcTy799fBkNDQ4afP38BXfCP4cmT' +
		'JwwPHtxi4OPjY/j1C2HAo9T8FG7Gv7OANlf+/vEzn52dcSLDtx+5AAHE8ufPX4bHjx8' +
		'zPHz4CGzAjx8/GL5+/Qp0DSPD7z+/wZpfBUbfYeDiTv/7/w8Dw7fv7XJbVzA+svaeCH' +
		'SNOkAAAQ34A9TwheHevXtAG38xfPnyheHbt28MCgpyDLCwAQJBhu8/gNy/QAN+QERA9' +
		'M+fDAABxPTjx3cGUFoSFhZiEBDgZwB5CWQACIPYICC2fqkwUIMay9/fII2Vjwwc83i4' +
		'mRkYvv+8CRBALD+Bpty8eY0B5BKQF6SlJSEJBBiiID4MyO1YNf2RmTsj0NmHWBn/XWb' +
		'4BbT1x8/JAAHE9PfPb+sf339aAw2C4u93ZWQkGcTEhBnQk7ncqZ3TgLaGsgNTz5dHb8' +
		'/IPb80FSCAGNEVpaUlMf//978JyCxkYGTgnD17PiNGWhDTyWD49XuT3IebzwACCGwLN' +
		'pyamhgNxM9wycMwQAAxUpobAQKI4twIEGAA+Mk8nL2QZm8AAAAASUVORK5CYII=' +
		'">',

	greenDiamond:
		'<img width="10" height="10" style="float:left" src="' +
		'data:image/gif;base64,R0lGODlhCQAJAJH/AMDAwAcADAD/RAAAACH' +
		'5BAEAAAAALAAAAAAJAAkAQAIUhBGnqCEPRUJwGvfslS1yGmmOVQAAOw%3D%3D' +
		'" class="tip-static" data-tipped="Online">',

	yellowDiamond:
		'<img width="10" height="10" style="float:left" src="' +
		'data:image/gif;base64,R0lGODlhCQAJAJH/AMDAwP3/AAcADAAAAC' +
		'H5BAEAAAAALAAAAAAJAAkAQAIUhCGnqBIPQ0JwGvfslS1yGmmOVQAAOw%3D%3D' +
		'" class="tip-static" data-tipped="Offline">',

	orangeDiamond:
		'<img width="10" height="10" style="float:left" src="' + 
		'data:image/gif;base64,R0lGODlhCQAJAJH/AMDAwP+9AAcADAAAAC' +
		'H5BAEAAAAALAAAAAAJAAkAQAIUhCGnqBIPQ0JwGvfslS1yGmmOVQAAOw%3D%3D' +
		'" class="tip-static" data-tipped="Offline">',

	offlineDot:
		'<img width="10" height="10" style="float:left" src="' +
		'data:image/gif;base64,R0lGODlhDgAOAMQAAP///1paWnNzc4SEhK2tr' +
		'bW1tZylpWNra3OEhDE5OWNzc73e3rXW1qXGxpy9vZS1tYSlpXucnHOUlFJra2OEhEpj' +
		'YxghISk5OVJzczlSUkprayExMTFKShgpKRAhIQAAACH5BAEAAAAALAAAAAAOAA4AQAW' +
		'GICAChCINxihm2WRKiKJl19YBiBY5zNI8CAztMCJsLJ2Ox7MhqAgViiQioUxoBREHQ3' +
		'E0GD8rzSK6XDicDNqMdIoKGA1mMsuk3hoKxOuAUDQcGykVGBENC4gOEkJnABxREQ8PE' +
		'BIKFYEeAAoJGRUTdJc1FgIiAx1mZhtHHQMqIgQCHAGtKiEAOw%3D%3D' +
		'" class="tip-static" data-tipped="Offline">',

	sevenDayDot:
		'<img width="10" height="10" style="float:left" src="' +
		'data:image/gif;base64,R0lGODlhDgAOAMQAAP///0JCQoSEhK2trXNr' +
		'azEpKZyUnDkpMa1rjJxae5RSc3s5WlopQnMxUmMhQjkIIaWUnGNSWiEQGFIhOSEAEL1' +
		'zlLVrjIxSa3M5UlIYMUoQKSkAEBgACIRrc2tSWgAAACH5BAEAAAAALAAAAAAOAA4AQA' +
		'V8ICACENZ1xihqj+YsGMZkxUZJgJc1ilUhicbksYmMBhKKksMpDFQQV2PRcLA2T8Bjl' +
		'0D8FEIiR0TZPM5n2y0LGDA0cJYmJRpkXopEYmG1pTQTCwkVhHtDGwcAGy4LeQoLbw8U' +
		'YxFmGRkTl0STBCICSqCgEgIqdQQBEaQqIQA7' +
		'" class="tip-static" data-tipped="Offline">',

	redDot:
		'<img width="10" height="10" style="float:left" src="' +
		'data:image/gif;base64,R0lGODlhDgAOAMQAAP///62trYyEhL2trUIpKa2UnP9zn' +
		'DEQGP9rjL0hQqUYOXsIIXtSWlIpMf9Sc94xUpQYMa0QMaUIKSkACFIAEHsAGJxCUudS' +
		'a85CWs45UoRSWnMIGGMAEKVrczkACAAAACH5BAEAAAAALAAAAAAOAA4AQAV7ICAChdV' +
		'1xSguS5RgWKZAy0YdgBY9juE7sgWHMQocPJSJkhBQFSSJhzQTETYBLYwDYUBcghyPiL' +
		'KpsFg2z+EKGCgicIk5JXJHHfhHIlKhpCA7PT8YCjUNABVQWg4XhDRJORsLEBAzNDYTH' +
		'SICFGSeSQcCKiIBDA0MoiohADs%3D' +
		'" class="tip-static" data-tipped="Offline">',

	runIcon:
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf' +
		'8/9hAAAAAXNSR0IArs4c6QAAAAlwSFlzAAAPYQAAD2EBqD+naQAAAAd0SU1FB9gDBhM' +
		'MFhZz9poAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABv0lEQV' +
		'Q4y6WTMWsbQRCFPwUVa5BhBS684MZwzRkVukJFBGkE+QEhpUuVTid1SulSKt3lmvwAl' +
		'04nF4a4UJCb4GsOXSNYQQS7IIGnU4qzT5JlJ5DMMsXO7ns7O/Om5H5Z/sfKzwNW3Gow' +
		'irlPE2YiABwqxUkQ0mm0Mapa2rxf2syge9NfjdOEj++THLg8Yw+wCyHxGfdTy0kQ0n/' +
		'XLUjebILtNOO0FgLQq0+YVS5wiwyFJdKa01qInWZ0b/qrLQIrbjVOE5pHBhDelr8UJN' +
		'5cIYA8rlZgGKcJVtyqIBiMYoxWWHFk3m3VpFefIOaKzLvCm0eawSheZzBOEzTgloJby' +
		'k6le/UJJrwtzpXKs9iqgZ/J2sW/SPLpQ4if5Q/4xw6Vi83i4Y/9Hv4c0v06BEDPZVcH' +
		'si+vgi9/XPL52znsg1EGqbhtglYtIpsmqFfA8W3MsTbkFxR+LrRq0boGnUYbKwJKIcg' +
		'WuH99gRMp4qqisOLpNNprAqOqpWYQ4UTQB4cF+Py6DzywpxX6QKMqGjv3NIOokPSOlL' +
		'+ndxxrjaooqqoKgBOHLIXM5+BNKZeeT+PTMA3TO4rfKGgF0d+H6V/sN7ur7I3UK1cpA' +
		'AAAAElFTkSuQmCC',

	stopIcon:
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAAB' +
		'y6+R8AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAPYQAAD2' +
		'EBqD+naQAAAAd0SU1FB9gDBhMtH+MwW90AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3a' +
		'XRoIEdJTVBXgQ4XAAAAyUlEQVQoz52SLQ4CMRCFv00Qi+tKZCWSI3AE1hEUIWBwhKug' +
		'CEEBDotEIjlC5dZ13FZRRMOGFQ0/k4yZvC/vZWayEAK/VgfAbHdBruePYjUs0fNZ1gG' +
		'Qy5HBdPkRuu83MJ9FJwA8yOmQdhlP2vGQGiOOwqddjDiQ+g1q3Pz3i3A19I3BO5cU9o' +
		'xBWvEAxMdOlXhc/QYVAqg8dnITedS9IG8tldYUeTfJVFrjrW3FC1oVsErfSgEWsgZSo' +
		'/JxW6xT+qwBR2Uc/PN7T+yzRewsE50wAAAAAElFTkSuQmCC',

/* jshint -W101 */ // Line is too long. (W101)

	buffList: [
		{name: 'Rage',                stamina: 10, 'duration': 90,   minCastLevel: 1,    treeId: 0, skillId: 0,   buff: '+0.2% base attack per point.', nicks: 'rage'},
		{name: 'Stun',                stamina: 15, 'duration': 90,   minCastLevel: 1,    treeId: 0, skillId: 1,   buff: '+0.1% chance per point to half opponents chance to hit.', nicks: 'stun,st'},
		{name: 'Fury',                stamina: 10, 'duration': 90,   minCastLevel: 25,   treeId: 0, skillId: 2,   buff: '+0.1% base Attack and +0.1% base Damage per point.', nicks: 'fury'},
		{name: 'Blood Thirst',        stamina: 10, 'duration': 45,   minCastLevel: 25,   treeId: 0, skillId: 4,   buff: '+0.2% chance per point to drain 5% of your opponents current HP per combat turn from your opponent.', nicks: 'blood thirst,bloodthirst,bt'},
		{name: 'Enchant Weapon',      stamina: 10, 'duration': 90,   minCastLevel: 25,   treeId: 0, skillId: 5,   buff: '+0.1% per point stat bonus increase to your equipped weapon. (Excludes \\\'Gain\\\' bonuses).', nicks: 'enchant weapon,ew'},
		{name: 'Berserk',             stamina: 15, 'duration': 90,   minCastLevel: 75,   treeId: 0, skillId: 3,   buff: '+0.2% base Damage per point.', nicks: 'berserk'},
		{name: 'Holy Flame',          stamina: 15, 'duration': 90,   minCastLevel: 75,   treeId: 0, skillId: 6,   buff: '+0.2% extra damage vs. undead per point.', nicks: 'holy flame,hf'},
		{name: 'Dark Curse',          stamina: 20, 'duration': 60,   minCastLevel: 150,  treeId: 0, skillId: 7,   buff: '+0.2% reduction of opponents defence per point.', nicks: 'dark curse,dc'},
		{name: 'Shockwave',           stamina: 20, 'duration': 90,   minCastLevel: 200,  treeId: 0, skillId: 29,  buff: '+0.1% per point chance per point that your opponent will forfeit their next combat turn.', nicks: 'shockwave,sw,shock'},
		{name: 'Ignite',              stamina: 10, 'duration': 60,   minCastLevel: 200,  treeId: 0, skillId: 30,  buff: '+0.1% per point chance per point that your opponent will be set on fire. Each successful hit thereafter will inflict between 5% and 10% extra damage.', nicks: 'ignite,ign'},
		{name: 'Super Elite Slayer',  stamina: 25, 'duration': 15,   minCastLevel: 250,  treeId: 0, skillId: 31,  buff: '+0.2% per point reduction of damage, attack, defence and armor to super elite creatures.', nicks: 'super elite slayer,ses,se slayer'},
		{name: 'Wither',              stamina: 15, 'duration': 60,   minCastLevel: 250,  treeId: 0, skillId: 32,  buff: '+0.2% per point chance of a 50% reduction of your opponents HP at the start of combat.', nicks: 'wither,with'},
		{name: 'Shatter Armor',       stamina: 20, 'duration': 60,   minCastLevel: 300,  treeId: 0, skillId: 33,  buff: '+0.05% per point chance to reduce opponents armor by 75%.', nicks: 'shatter armor,sa'},
		{name: 'Death Wish',          stamina: 20, 'duration': 45,   minCastLevel: 300,  treeId: 0, skillId: 34,  buff: '+0.03% per point chance to instantly kill vs. creatures. (Excludes Super Elites)', nicks: 'deathwish,dw,deathw,death wish'},
		{name: 'Spell Breaker',       stamina: 35, 'duration': 45,   minCastLevel: 300,  treeId: 0, skillId: 35,  buff: '+0.1% per point chance to remove a random buff from PvP target upon a successful attack.', nicks:'spell breaker,sb'},
		{name: 'Spectral Knight',     stamina: 15, 'duration': 45,   minCastLevel: 400,  treeId: 0, skillId: 48,  buff: '+0.1% per point chance to reduce targets armor by 100%. (vs Creature only)', nicks: 'spectral knight,sk,spec knight'},
		{name: 'Keen Edge',           stamina: 10, 'duration': 60,   minCastLevel: 400,  treeId: 0, skillId: 47,  buff: '+0.1% per point to your attack for each complete set equipped.', nicks: 'keen edge,ke'},
		{name: 'Arterial Strike',     stamina: 20, 'duration': 60,   minCastLevel: 500,  treeId: 0, skillId: 49,  buff: 'Gain additional 0.1% xp per point for every additional round of combat. (Note that this does not activate if conserve activated)', nicks: 'arterial strike,as,art strike,art str'},
		{name: 'Death Dealer',        stamina: 20, 'duration': 60,   minCastLevel: 500,  treeId: 0, skillId: 50,  buff: 'For every 5 kills in a row, without dying, you gain +0.01% extra damage per point (Max 20% and vs. creatures only).', nicks: 'death dealer,dd'},
		{name: 'Savagery',            stamina: 15, 'duration': 45,   minCastLevel: 600,  treeId: 0, skillId: 51,  buff: '0.05% chance per point that your defense stat is added to your attack and your armor stat is added to your damage.', nicks: 'savagery,savage'},
		{name: 'Chi Strike',          stamina: 20, 'duration': 90,   minCastLevel: 700,  treeId: 0, skillId: 52,  buff: '0.1% per point of your Health total is added to your damage', nicks:'chi strike,chi,chis,chi str'},
		{name: 'Shield Strike',       stamina: 20, 'duration': 45,   minCastLevel: 700,  treeId: 0, skillId: 53,  buff: '0.1% per point chance that your defense stat is reduced to zero and your damage is doubled.', nicks: 'shield strike,ss,sh str'},
		{name: 'Demoralize',          stamina: 25, 'duration': 30,   minCastLevel: 800,  treeId: 0, skillId: 73,  buff: '+0.25% per point chance to half the opponents enchancement levels for the battle. Note this skill only takes effect if you initiated the combat.', nicks: 'demoralize,dem'},
		{name: 'Poison',              stamina: 25, 'duration': 60,   minCastLevel: 800,  treeId: 0, skillId: 70,  buff: '+0.1% per point chance that your opponent will be poisoned. Each successful hit thereafter will inflict between 10% and 20% extra damage.', nicks: 'poison,poi'},
		{name: 'Iron Fist',           stamina: 25, 'duration': 60,   minCastLevel: 900,  treeId: 0, skillId: 74,  buff: '+0.1% per point stat bonus increase to your equipped gloves. (Excludes \\\'Gain\\\' bonuses).', nicks: 'iron fist,if'},
		{name: 'Spell Leech',         stamina: 50, 'duration': 60,   minCastLevel: 900,  treeId: 0, skillId: 79,  buff: '+0.1% per point chance when you defeat an opponent in PvP that you initiated, you will steal a random buff. Note the remaining duration of the buff is reduced by 50% and will not take effect until the next combat. Note also if you already have the buff active, it will replace the existing buff you have active.', nicks: 'spell leech,sl'},
		{name: 'Distraction',         stamina: 25, 'duration': 60,   minCastLevel: 900,  treeId: 0, skillId: 78,  buff: '+0.2% per point chance to obtain no gold from a successful combat. +0.05% per point chance to inflict double damage in each round of combat. Note this skill has no effect in PvP.', nicks: 'distraction,dis'},
		{name: 'Coordinated Attack',  stamina: 30, 'duration': 90,   minCastLevel: 1000, treeId: 0, skillId: 118, buff: '+0.05% per point added to Attack and Damage if every piece of equipped gear is part of a set.', nicks: 'coordinated attack,coorda'},
		{name: 'Undermine',           stamina: 30, 'duration': 90,   minCastLevel: 1000, treeId: 0, skillId: 108, buff: 'Increases the maximum percentage (above 100%) of the Breaker enhancement by +0.2% per point.', nicks: 'undermine,um'},
		{name: 'Cursed Rune',         stamina: 30, 'duration': 120,  minCastLevel: 1000, treeId: 0, skillId: 89,  buff: '0.2% per point stat bonus to your equipped rune. Excludes \\\'Gain\\\' bonuses. Double chance of durability loss. Prevents Unbreakable from working while active.', nicks: 'cursed rune,crune'},
		{name: 'Anti Deflect',        stamina: 30, 'duration': 60,   minCastLevel: 1000, treeId: 0, skillId: 105, buff: '+0.2% per point chance to prevent your opponent activating Deflect.', nicks: 'anti deflect,ad'},
		{name: 'Overkill',            stamina: 30, 'duration': 60,   minCastLevel: 1200, treeId: 0, skillId: 109, buff: 'When you inflict 2 times or more of the starting hit points in the first round of combat, you have a 0.25% per point chance to gain 0.025% per point extra XP. (PvE Only)', nicks: 'overkill,ok'},
		{name: 'Smashing Hammer',     stamina: 30, 'duration': 90,   minCastLevel: 1200, treeId: 0, skillId: 111, buff: '+0.05% per point added to your damage for each complete set equipped.', nicks: 'smashing hammer,sh'},
		{name: 'Mighty Vigor',        stamina: 35, 'duration': 60,   minCastLevel: 1200, treeId: 0, skillId: 113, buff: 'For every 50 points of the skill, can equip items 1 level higher than your level.', nicks: 'mighty vigor,mv'},
		{name: 'Fist Fight',          stamina: 30, 'duration': 90,   minCastLevel: 1200, treeId: 0, skillId: 115, buff: '+0.1% per point chance that both players will lose the benefit of ALL skills at the start of combat. This skill takes effect before Sealed. (PvP Only)', nicks: 'fist fight,ff'},
		{name: 'Cursed Ring',         stamina: 30, 'duration': 120,  minCastLevel: 1400, treeId: 0, skillId: 88,  buff: '0.2% per point stat bonus to your equipped ring. Excludes \\\'Gain\\\' bonuses. Double chance of durability loss. Prevents Unbreakable from working while active.', nicks: 'cursed ring,cring'},
		{name: 'Sharpen',             stamina: 30, 'duration': 60,   minCastLevel: 1400, treeId: 0, skillId: 106, buff: 'Increases the maximum percentage (above 100%) of the Piercing Strike enhancement by +0.1% per point.', nicks: 'sharpen,sharp'},
		{name: 'Balanced Attack',     stamina: 30, 'duration': 90,   minCastLevel: 1400, treeId: 0, skillId: 116, buff: '+0.05% per point added to Attack and Damage if every piece of equipped gear is the same level.', nicks: 'balanced attack,ba'},
		{name: 'Heavy Weight',        stamina: 20, 'duration': 120,  minCastLevel: 1600, treeId: 0, skillId: 146, buff: 'Increases damage in combat by +0.025% per point providing you have at least 2,500 gold multiplied by your level in hand.', nicks: 'heavy weight, hw'},
		{name: 'Armored Strike',      stamina: 30, 'duration': 60,   minCastLevel: 1600, treeId: 0, skillId: 130, buff: '+0.05% per point chance that your Armor stat is reduced to zero and your Damage is doubled. (PvE Only)', nicks: 'armored strike, armstr'},
		{name: 'Invert',              stamina: 40, 'duration': 180,  minCastLevel: 2000, treeId: 0, skillId: 173, buff: '+0.2% per skill level chance that enemies armor and defense stats are switched in a PvP attack.', nicks: 'invert'},
		{name: 'Reign of Terror',     stamina: 40, 'duration': 60,   minCastLevel: 2500, treeId: 0, skillId: 174, buff: '+0.1% per skill level reduction to relic defenders armor/defense. (Only counts for capturing groups leader)', nicks: 'reign of terror'},
		{name: 'Critical Strike',     stamina: 40, 'duration': 90,   minCastLevel: 3000, treeId: 0, skillId: 175, buff: 'Increases the maximum percentage (above 100%) of the Critical Hit enhancement by +0.25% per point.', nicks: 'critical strike'},
		{name: 'Great Vigor',         stamina: 10, 'duration': 90,   minCastLevel: 1,    treeId: 1, skillId: 12,  buff: '+0.2% base HP per point.', nicks: 'great vigor,vigor,gv'},
		{name: 'Fortify',             stamina: 10, 'duration': 120,  minCastLevel: 25,   treeId: 1, skillId: 8,   buff: '+0.1% base Armor per point.', nicks: 'fortify'},
		{name: 'Evade',               stamina: 10, 'duration': 90,   minCastLevel: 25,   treeId: 1, skillId: 10,  buff: '+0.1% base Defence per point.', nicks: 'evade'},
		{name: 'Absorb',              stamina: 20, 'duration': 120,  minCastLevel: 25,   treeId: 1, skillId: 13,  buff: '+0.1% chance per point that you will absorb 25% of the damage inflicted on you.', nicks: 'absorb,abs'},
		{name: 'Rock Skin',           stamina: 15, 'duration': 90,   minCastLevel: 75,   treeId: 1, skillId: 11,  buff: '+0.1% base Defence and +0.1 base Armor per point.', nicks: 'rock skin,rs'},
		{name: 'Enchanted Armor',     stamina: 10, 'duration': 90,   minCastLevel: 75,   treeId: 1, skillId: 9,   buff: '+0.1% per point stat bonus increase to your equipped armor. (Excludes \\\'Gain\\\' bonuses).', nicks: 'enchanted armor,enchant armor,ea,ench arm,ench armor'},
		{name: 'Aura of Protection',  stamina: 20, 'duration': 90,   minCastLevel: 150,  treeId: 1, skillId: 15,  buff: '+0.1% base Defence, +0.1% base Armor and +0.1% base HP per point.', nicks: 'aura of protection,aop,aofp'},
		{name: 'Deflect',             stamina: 25, 'duration': 300,  minCastLevel: 150,  treeId: 1, skillId: 14,  buff: '+0.25% chance per point that a player attacking you will automatically fail before combat starts.', nicks: 'deflect,defl'},
		{name: 'Force Shield',        stamina: 10, 'duration': 60,   minCastLevel: 200,  treeId: 1, skillId: 27,  buff: '+0.1% per point chance to reduce damage done to you to 1.', nicks: 'force shield,fs'},
		{name: 'Unbreakable',         stamina: 20, 'duration': 90,   minCastLevel: 200,  treeId: 1, skillId: 28,  buff: '+0.5% per point chance per point of equipment not taking durability loss during combat.', nicks: 'unbreakable,ub,unb,unbr'},
		{name: 'Honor',               stamina: 10, 'duration': 180,  minCastLevel: 800,  treeId: 1, skillId: 82,  buff: '+0.2% per point decrease to the PvP Rating points transferred upon defeat.', nicks: 'honor'},
		{name: 'Assist',              stamina: 30, 'duration': 120,  minCastLevel: 250,  treeId: 1, skillId: 36,  buff: '+0.05% per point chance of one of your allies assisting in combat vs. creatures. (Ally is randomly selected and adds 50% of their attack, defense, damage, armor and hp - note this also excludes allies whom are more than 25 levels above you.).', nicks: 'assist,ass'},
		{name: 'Constitution',        stamina: 25, 'duration': 30,   minCastLevel: 300,  treeId: 1, skillId: 37,  buff: '+0.1% per point increase to your defense.', nicks: 'constitution,const'},
		{name: 'Counter Attack',      stamina: 20, 'duration': 60,   minCastLevel: 400,  treeId: 1, skillId: 54,  buff: 'Uses 0.25% extra stamina (per point) to add 0.25% to both attack and damage. (Both values are rounded up, vs. creature only)', nicks: 'counter attack,ca'},
		{name: 'Summon Shield Imp',   stamina: 50, 'duration': 60,   minCastLevel: 400,  treeId: 1, skillId: 55,  buff: 'Creates an Imp which can absorb 100% of damage. Each full absorb uses one of the Shield Imp\\\'s hit points. The Shield Imp starts with 3 hit points and gains one for each 50 points placed in this skill. The Shield Imp auto-debuffs when it reaches zero hit points. (Note Super-Elites can crush the imp in a single turn regardless of hit points remaining and it only works in PvE.', nicks: 'summon shield imp,ssi,imp'},
		{name: 'Vision',              stamina: 20, 'duration': 90,   minCastLevel: 500,  treeId: 1, skillId: 56,  buff: 'Lights up dark realms. More skill points allow more vision on the \\\'Map\\\' screen. (Vision radius increases every 50 levels).', nicks: 'vision,vis'},
		{name: 'Fortitude',           stamina: 15, 'duration': 90,   minCastLevel: 500,  treeId: 1, skillId: 57,  buff: 'Defense stat is added to HP. (0.1% per point).', nicks: 'fortitude,fort'},
		{name: 'Flinch',              stamina: 20, 'duration': 60,   minCastLevel: 600,  treeId: 1, skillId: 58,  buff: '0.1% per point decrease in enemies Attack stat', nicks: 'flinch'},
		{name: 'Terrorize',           stamina: 20, 'duration': 60,   minCastLevel: 700,  treeId: 1, skillId: 59,  buff: '0.1% per point decrease in enemies Damage stat.', nicks: 'terrorize,terror'},
		{name: 'Nightmare Visage',    stamina: 40, 'duration': 1000, minCastLevel: 700,  treeId: 1, skillId: 60,  buff: '0.25% per point of your Attack will be transferred into Defense. (Great for offline protection!)', nicks: 'nightmare visage,nv,visage'},
		{name: 'Sanctuary',           stamina: 25, 'duration': 30,   minCastLevel: 800,  treeId: 1, skillId: 44,  buff: '+0.1% per point increase to your armor', nicks: 'sanctuary,sanc'},
		{name: 'Dull Edge',           stamina: 10, 'duration': 60,   minCastLevel: 800,  treeId: 1, skillId: 46,  buff: '+0.4% per point reduction to creatures \\\'Piercing Strike\\\' enhancement.', nicks: 'dull edge,de'},
		{name: 'Erosion',             stamina: 25, 'duration': 180,  minCastLevel: 900,  treeId: 1, skillId: 80,  buff: '+0.1% per point chance to reduce an attackers item durability to 1 if durability damage is inflicted. Note this skill only works in PvP and if you are defending.', nicks: 'erosion,ero'},
		{name: 'Avert Gaze',          stamina: 10, 'duration': 60,   minCastLevel: 900,  treeId: 1, skillId: 71,  buff: '+0.5% per point chance of not being affected by Hypnotize.', nicks: 'avert gaze,ag'},
		{name: 'Enchant Shield',      stamina: 25, 'duration': 60,   minCastLevel: 900,  treeId: 1, skillId: 77,  buff: '+0.1% per point stat bonus increase to your equipped shield. (Excludes \\\'Gain\\\' bonuses).', nicks: 'enchant shield,es'},
		{name: 'Smite',               stamina: 30, 'duration': 60,   minCastLevel: 1000, treeId: 1, skillId: 97,  buff: '0.1% per point reduction to attackers armor when defending a PvP attack. (PvP Only).', nicks: 'smite,sm'},
		{name: 'Balanced Defense',    stamina: 30, 'duration': 90,   minCastLevel: 1000, treeId: 1, skillId: 117, buff: '+0.05% per point added to Defense and Armor if every piece of equipped gear is the same level.', nicks: 'balanced defense,bd'},
		{name: 'Bastion',             stamina: 30, 'duration': 90,   minCastLevel: 1000, treeId: 1, skillId: 122, buff: 'Increases the maximum percentage (above 100%) of the Protection enhancement by +0.2% per point.', nicks: 'bastion,bast'},
		{name: 'Side Step',           stamina: 30, 'duration': 90,   minCastLevel: 1000, treeId: 1, skillId: 86,  buff: 'Increases the maximum percentage (above 100%) of the Dodge enhancement by +0.2% per point.', nicks: 'side step,sstep'},
		{name: 'High Guard',          stamina: 30, 'duration': 60,   minCastLevel: 1200, treeId: 1, skillId: 96,  buff: '0.05% chance per point that your attack stat is added to your defense and your damage stat is added to your armor.', nicks: 'high guard,hg'},
		{name: 'Barricade',           stamina: 30, 'duration': 90,   minCastLevel: 1200, treeId: 1, skillId: 98,  buff: '0.1% per point of Damage is transferred to Defense.', nicks: 'barricade,bar'},
		{name: 'Coordinated Defense', stamina: 30, 'duration': 90,   minCastLevel: 1200, treeId: 1, skillId: 119, buff: '+0.05% per point added to Defense and Armor if every piece of equipped gear is part of a set.', nicks: 'coordinated defense,cd'},
		{name: 'Degrade',             stamina: 30, 'duration': 90,   minCastLevel: 1200, treeId: 1, skillId: 121, buff: 'Increases the maximum percentage (above 100%) of the Nullify enhancement by +0.2% per point.', nicks: 'degrade,deg,dg'},
		{name: 'Retaliate',           stamina: 30, 'duration': 60,   minCastLevel: 1400, treeId: 1, skillId: 123, buff: 'Increases the maximum percentage (above 100%) of the Disarm enhancement by +0.2% per point.', nicks: 'retaliate,ret'},
		{name: 'Shame',               stamina: 35, 'duration': 60,   minCastLevel: 1400, treeId: 1, skillId: 110, buff: 'If successfully defending an attack, remove a percentage of additional +0.25% per point xp from the attacker. (PvP Only)', nicks: 'shame'},
		{name: 'Dispel Curse',        stamina: 35, 'duration': 60,   minCastLevel: 1400, treeId: 1, skillId: 114, buff: '0.2% chance per point that Dark Curse will not work against you. (PvP Only)', nicks: 'dispel curse,dispel'},
		{name: 'Anchored',            stamina: 30, 'duration': 60,   minCastLevel: 1600, treeId: 1, skillId: 154, buff: '0.05% per point Damage is added to your health during combat.', nicks: 'anchored, anch, anchor'},
		{name: 'Hardened',            stamina: 30, 'duration': 60,   minCastLevel: 1600, treeId: 1, skillId: 153, buff: '0.05% per point chance to prevent your opponent activating Shatter Armor.', nicks: 'hardened, hard, harden'},
		{name: 'Armor Boost',         stamina: 30, 'duration': 60,   minCastLevel: 1600, treeId: 1, skillId: 136, buff: '+0.05% per point to your Armor for each complete set equipped.', nicks: 'armor boost, armbst, arm bst, armb'},
		{name: 'Shield Wall',         stamina: 30, 'duration': 60,   minCastLevel: 1600, treeId: 1, skillId: 135, buff: '+0.05% per point to your Defense for each complete set equipped.', nicks: 'shield wall, shldwll, sw'},
		{name: 'Layered Armor',       stamina: 40, 'duration': 60,   minCastLevel: 2000, treeId: 1, skillId: 170, buff: '+0.05% of every items damage stat is added to your armor per skill level.', nicks: 'layered armor'},
		{name: 'Defensive Aura',      stamina: 40, 'duration': 60,   minCastLevel: 2500, treeId: 1, skillId: 171, buff: '+0.05% of every items attack stat is added to your defense per skill level.', nicks: 'defensive aura'},
		{name: 'Fumble',              stamina: 40, 'duration': 180,  minCastLevel: 3000, treeId: 1, skillId: 172, buff: '+0.1% per skill level reduction to attackers attack when defending a PvP attack.', nicks: 'fumble'},
		{name: 'Find Item',           stamina: 10, 'duration': 60,   minCastLevel: 1,    treeId: 2, skillId: 16,  buff: '+0.1% per point increase of creatures current drop rate.', nicks: 'find item,fi'},
		{name: 'Treasure Hunter',     stamina: 15, 'duration': 120,  minCastLevel: 1,    treeId: 2, skillId: 17,  buff: '+0.2% per point additional gold from creatures.', nicks: 'treasure hunter,th,treas hunter'},
		{name: 'Deep Pockets',        stamina: 10, 'duration': 90,   minCastLevel: 1,    treeId: 2, skillId: 22,  buff: '+0.25% per point reduction in gold lost on failed combat vs creatures.', nicks: 'deep pockets,dp'},
		{name: 'Quest Finder',        stamina: 5,  'duration': 90,   minCastLevel: 1,    treeId: 2, skillId: 61,  buff: 'Increases the chance a quest item will drop. (If you fail to obtain an item, an extra roll is given for Quest Finder at a fixed percentage based on the points allocated to the skill. If this second roll is successful, you will obtain one of the available quest items drops (if any)).', nicks: 'quest finder,qf'},
		{name: 'Adept Learner',       stamina: 10, 'duration': 90,   minCastLevel: 25,   treeId: 2, skillId: 19,  buff: '+0.2% per point increase in xp from creature kills.', nicks: 'adept learner,al'},
		{name: 'Defiance',            stamina: 15, 'duration': 120,  minCastLevel: 25,   treeId: 2, skillId: 18,  buff: '+0.25% per point reduction in xp lost when defeated in combat vs creatures.', nicks: 'defiance'},
		{name: 'Librarian',           stamina: 10, 'duration': 60,   minCastLevel: 75,   treeId: 2, skillId: 20,  buff: '+0.1% per point chance to gain double xp from creatures.', nicks: 'librarian,lib,libr'},
		{name: 'Merchant',            stamina: 10, 'duration': 60,   minCastLevel: 75,   treeId: 2, skillId: 21,  buff: '+0.05% per point chance to gain double gold from creatures.', nicks: 'merchant,merch,merc'},
		{name: 'Last Ditch',          stamina: 15, 'duration': 120,  minCastLevel: 150,  treeId: 2, skillId: 23,  buff: '+0.2% per point chance to survive death in combat (once per combat).', nicks: 'last ditch,ld'},
		{name: 'Animal Magnetism',    stamina: 10, 'duration': 60,   minCastLevel: 200,  treeId: 2, skillId: 24,  buff: '+0.2% per point chance to make certain creatures respawn at your location.', nicks: 'animal magnetism,animag,ani mag,am'},
		{name: 'Empower',             stamina: 20, 'duration': 60,   minCastLevel: 200,  treeId: 2, skillId: 25,  buff: '+0.1% per point increase to all currently active enhancements.', nicks: 'empower,emp'},
		{name: 'Doubler',             stamina: 5,  'duration': 120,  minCastLevel: 200,  treeId: 2, skillId: 26,  buff: 'At skill level 50+, 2x Stamina usage in combat in return for 2x gold/xp. At level 100+ 3x, and at level 150+ 4x. Note that stamina and xp loss are normal (not multiplied) if you lose a battle.', nicks: 'doubler,doub,db'},
		{name: 'Conserve',            stamina: 10, 'duration': 45,   minCastLevel: 250,  treeId: 2, skillId: 39,  buff: '+0.05% per point chance that combat (vs. players and vs. creatures) will use no stamina. (Excludes group/relic combat)', nicks: 'conserve,cons,consv,con'},
		{name: 'Brewing Master',      stamina: 10, 'duration': 30,   minCastLevel: 250,  treeId: 2, skillId: 40,  buff: '+0.5% per point to the duration of potions when consumed while active.', nicks: 'brewing master,bm,brm,brewm'},
		{name: 'Four Leaf',           stamina: 20, 'duration': 60,   minCastLevel: 250,  treeId: 2, skillId: 41,  buff: '+0.1% per point chance that craftable items are discovered already \\\'Perfect\\\'.', nicks: 'four leaf,4l,fl'},
		{name: 'Extend',              stamina: 30, 'duration': 30,   minCastLevel: 300,  treeId: 2, skillId: 42,  buff: '+0.25% per point increase to skills durations that are cast while this skill is active.', nicks: 'extend,ext'},
		{name: 'Inventor',            stamina: 15, 'duration': 60,   minCastLevel: 400,  treeId: 2, skillId: 62,  buff: 'Increases chance of success when attempting to Invent items/potions. (A fixed +0.05% chance per point extra chance of success)', nicks: 'inventor,inv,invI,inv1,inventor1,inventor 1,inventor i,inv i,inv 1'},
		{name: 'Extractor',           stamina: 15, 'duration': 60,   minCastLevel: 400,  treeId: 2, skillId: 63,  buff: 'Increases chance of success when attempting to extract Components from Resources. (A fixed +0.05% chance per point extra chance of success).', nicks: 'extractor,extr'},
		{name: 'Inventor II',         stamina: 20, 'duration': 60,   minCastLevel: 500,  treeId: 2, skillId: 64,  buff: 'Chance not to consume (or consume less) components when inventing items.', nicks: 'inventor ii,inventorii,invii,inv2,inventor 2,inv ii,inv 2'},
		{name: 'Buff Master',         stamina: 10, 'duration': 60,   minCastLevel: 500,  treeId: 2, skillId: 65,  buff: '0.2% per point chance to half the stamina cost (rounding up) when casting skills on other players. (Does not work on self!)', nicks: 'buff master,buffm,bum'},
		{name: 'Reflection',          stamina: 10, 'duration': 90,   minCastLevel: 600,  treeId: 2, skillId: 66,  buff: '0.1% per point of enemies damage inflicted is added to your next combat strike.', nicks: 'reflection,ref,refl,reflect'},
		{name: 'Guild Buffer',        stamina: 10, 'duration': 90,   minCastLevel: 600,  treeId: 2, skillId: 160, buff: '+0.25% per point chance to reduce stamina cost of casting buffs on guild members by 50% (rounding up).', nicks: 'guild buffer, gldbfr, gb'},
		{name: 'Light Foot',          stamina: 15, 'duration': 120,  minCastLevel: 700,  treeId: 2, skillId: 67,  buff: '0.05% chance to use no stamina while moving on the world map.', nicks: 'light foot,lf'},
		{name: 'Mesmerize',           stamina: 20, 'duration': 60,   minCastLevel: 700,  treeId: 2, skillId: 68,  buff: '0.1% per point chance to reduce a creatures armor and defense by 50% (vs. creature only).', nicks: 'mesmerize,mesmer,mes,mez'},
		{name: 'Resource Finder',     stamina: 25, 'duration': 90,   minCastLevel: 800,  treeId: 2, skillId: 76,  buff: 'Increases the chance a resource item will drop. (If you fail to obtain an item, an extra roll is given for Resource Finder at a fixed percentage based on the points allocated to the skill. If this second roll is successful, you will obtain one of the available resource items drops (if any)). Note if you have Quest Finder active as well, this roll takes place after Quest Finder and only if Quest Finder fails to obtain an item.', nicks: 'resource finder,rf'},
		{name: 'Quest Hunter',        stamina: 25, 'duration': 120,  minCastLevel: 800,  treeId: 2, skillId: 166, buff: 'At skill level 50+ grants 2x the kills towards quest requirements.. At level 100+ 3x, and at level 150+ 4x.', nicks: 'quest hunter'},
		{name: 'Gloat',               stamina: 10, 'duration': 30,   minCastLevel: 900,  treeId: 2, skillId: 81,  buff: '+0.5% per point increase to the PvP Rating points transferred upon victory. Note if you lose to a player who has the Honor skill active, you will lose and additional 50% PvP Rating.', nicks: 'gloat'},
		{name: 'Sacrifice',           stamina: 25, 'duration': 90,   minCastLevel: 900,  treeId: 2, skillId: 75,  buff: '+0.04% per point additional xp and -0.25% per point less gold for defeating creatures in combat.', nicks: 'sacrifice,sac'},
		{name: 'Reckoning',           stamina: 25, 'duration': 60,   minCastLevel: 900,  treeId: 2, skillId: 72,  buff: '+0.2% per point chance of doubling a random skill level for the battle if you initiate the combat (Note that this skill does not work with Doubler, Summon Shield Imp or Counter Attack.).', nicks: 'reckoning,rec,rek'},
		{name: 'Reinforce',           stamina: 30, 'duration': 90,   minCastLevel: 1000, treeId: 2, skillId: 126, buff: 'Increases the maximum percentage (above 100%) of the Sustain enhancement by +0.2% per point.', nicks: 'reinforce,rein'},
		{name: 'Bodyguard',           stamina: 30, 'duration': 120,  minCastLevel: 1000, treeId: 2, skillId: 120, buff: '0.4% per point of XP lost that would be lost to a non-bounty board PvP attack is lost as gold instead, as long as there is enough unbanked gold. Gold lost because of Bodyguard is sunk: it does not go to attacker. Gold taken by attacker (and gold sunk as a result) is unaffected.', nicks: 'bodyguard,bg'},
		{name: 'Riposte',             stamina: 30, 'duration': 60,   minCastLevel: 1000, treeId: 2, skillId: 124, buff: 'Increases the maximum percentage (above 100%) of the Duelist enhancement by +0.2% per point.', nicks: 'riposte,rip'},
		{name: 'Severe Condition',    stamina: 30, 'duration': 90,   minCastLevel: 1000, treeId: 2, skillId: 101, buff: '+0.25% per point of your attack, defense, damage and armor stats are transferred to your health at the start of combat.', nicks: 'severe condition,sc'},
		{name: 'Sealed',              stamina: 35, 'duration': 60,   minCastLevel: 1200, treeId: 2, skillId: 112, buff: '+0.1% per point chance at the start of combat that your opponents skills won\'t take effect in combat. (PvP Only)', nicks: 'sealed,seal'},
		{name: 'Righteous',           stamina: 30, 'duration': 90,   minCastLevel: 1200, treeId: 2, skillId: 107, buff: 'Increases the maximum percentage (above 100%) of the Holy enhancement by +0.2% per point.', nicks: 'righteous,right'},
		{name: 'Epic Forge',          stamina: 30, 'duration': 90,   minCastLevel: 1200, treeId: 2, skillId: 102, buff: '+0.5% per point increase to Hell Forge stat bonuses. Excludes bonuses to enhancements.', nicks: 'epic forge,ef'},
		{name: 'Golden Shield',       stamina: 30, 'duration': 60,   minCastLevel: 1200, treeId: 2, skillId: 103, buff: '+0.05% per point chance to double your armor and defense at the start of combat.', nicks: 'golden shield,gs'},
		{name: 'Stalker',             stamina: 35, 'duration': 90,   minCastLevel: 1400, treeId: 2, skillId: 125, buff: 'Increases the maximum percentage (above 100%) of the Elite Hunter enhancement by +0.1% per point.', nicks: 'stalker,stalk'},
		{name: 'Ageless',             stamina: 30, 'duration': 90,   minCastLevel: 1400, treeId: 2, skillId: 100, buff: '+0.2% per point chance of doubling your HP at the start of combat.', nicks: 'ageless,age'},
		{name: 'Extractor II',        stamina: 30, 'duration': 60,   minCastLevel: 1400, treeId: 2, skillId: 104, buff: '+0.05% per point chance to not destroy a resource when extracting components.', nicks: 'extractor ii,extractorii,extii,ext2,extractor 2,ext ii,ext 2'},
		{name: 'Epic Craft',          stamina: 30, 'duration': 60,   minCastLevel: 1600, treeId: 2, skillId: 159, buff: '+0.5% per point increase to crafted stat bonuses.', nicks: 'epic craft, epc crft, epccrft, ec'},
		{name: 'Gold Foot',           stamina: 20, 'duration': 120,  minCastLevel: 1600, treeId: 2, skillId: 137, buff: '0.05% per point chance to consume 2,500 gold from your hand instead of 1 stamina while moving.', nicks: 'gold foot, goldfoot, gldft, gf'},
		{name: 'Titan Doubler',       stamina: 40, 'duration': 120,  minCastLevel: 2000, treeId: 2, skillId: 167, buff: 'At skill level 50+, 2x Stamina usage in combat against a Titan would kill it twice. At level 100+ 3x, and at level 150+ 4x.', nicks: 'titan doubler'},
		{name: 'Teleport',            stamina: 40, 'duration': 60,   minCastLevel: 2500, treeId: 2, skillId: 168, buff: 'Allows the player to teleport within their current realm. Ability has a 225 second cooldown, reduced by 1 second for each skill level.', nicks: 'teleport'},
		{name: 'Invigorate',          stamina: 40, 'duration': 90,   minCastLevel: 3000, treeId: 2, skillId: 169, buff: '+0.01% per skill level added to your attack, defence, armor, HP and damage for each piece of equipped gear that is epic.', nicks: 'invigorate'}
	],

/* jshint +W101 */ // Line is too long. (W101)

	//~ guildRelationshipMessages: function(){
		//~ if(!FSH.Data.guildMessages){
			//~ FSH.Data.guildMessages= {};
				//~ FSH.Data.guildMessages.guildSelfMessage = {'color':'green',
					//~ 'message':'Member of your own guild!'};
				//~ FSH.Data.guildMessages.guildFrndMessage = {'color':'OliveDrab',
					//~ 'message':'Do not attack - Guild is friendly!'};
				//~ FSH.Data.guildMessages.guildPastMessage = {'color':'DarkCyan',
					//~ 'message':'Do not attack - You\'ve been in that guild once!'};
				//~ FSH.Data.guildMessages.guildEnmyMessage = {'color':'red',
					//~ 'message':'Enemy guild. Attack at will!'};
		//~ }
		//~ return FSH.Data.guildMessages;
	//~ },

	guildMessages: {
		guildSelfMessage: {'color':'green',
			'message':'Member of your own guild!'},
		guildFrndMessage: {'color':'OliveDrab',
			'message':'Do not attack - Guild is friendly!'},
		guildPastMessage: {'color':'DarkCyan',
			'message':'Do not attack - You\'ve been in that guild once!'},
		guildEnmyMessage: {'color':'red',
			'message':'Enemy guild. Attack at will!'}
	},

	//~ quickSearchList: function() {
		//~ if (!FSH.Data.quickSearchArray) {
			//~ FSH.Data.quickSearchArray = [
				//~ {'category':'Potions','searchname':'Potion of the Wise',             'nickname':'Lib 200', 'displayOnAH':true},
				//~ {'category':'Potions','searchname':'Potion of the Bookworm',         'nickname':'Lib 225', 'displayOnAH':true},
				//~ {'category':'Potions','searchname':'Potion of Shattering',           'nickname':'SA',      'displayOnAH':true},
				//~ {'category':'Potions','searchname':'Dragons Blood Potion',           'nickname':'ZK 200',  'displayOnAH':true},
				//~ {'category':'Potions','searchname':'Berserkers Potion',              'nickname':'ZK 300',  'displayOnAH':true},
				//~ {'category':'Potions','searchname':'Potion of Fury',                 'nickname':'ZK 350',  'displayOnAH':true},
				//~ {'category':'Potions','searchname':'Sludge Brew',                    'nickname':'DC 200',  'displayOnAH':true},
				//~ {'category':'Potions','searchname':'Potion of Black Death',          'nickname':'DC 225',  'displayOnAH':true},
				//~ {'category':'Potions','searchname':'Potion of Aid',                  'nickname':'Assist',  'displayOnAH':true},
				//~ {'category':'Potions','searchname':'Potion of Supreme Doubling',     'nickname':'DB 450',  'displayOnAH':true},
				//~ {'category':'Potions','searchname':'Potion of Acceleration',         'nickname':'DB 500',  'displayOnAH':true},
				//~ {'category':'Potions','searchname':'Potion of Lesser Death Dealer',  'nickname':'DD',      'displayOnAH':true},
				//~ {'category':'Potions','searchname':'Runic Potion',                   'nickname':'FI 250',  'displayOnAH':true},
				//~ {'category':'Potions','searchname':'Potion of Supreme Luck',         'nickname':'FI 1k',   'displayOnAH':true},
				//~ {'category':'Potions','searchname':'Potion of Truth',                'nickname':'EW 1k',   'displayOnAH':true},
				//~ {'category':'Potions','searchname':'Dull Edge',                      'nickname':'DE 25',   'displayOnAH':true},
				//~ {'category':'Potions','searchname':'Notched Blade',                  'nickname':'DE 80',   'displayOnAH':true},
				//~ {'category':'Potions','searchname':'Potion of Death',                'nickname':'DW 125',  'displayOnAH':true},
				//~ {'category':'Potions','searchname':'Potion of Decay',                'nickname':'WI 150',  'displayOnAH':true},
				//~ {'category':'Potions','searchname':'Potion of Fatality',             'nickname':'WI 350',  'displayOnAH':true},
				//~ {'category':'Potions','searchname':'Potion of Annihilation',         'nickname':'DW 150',  'displayOnAH':true},
				//~ {'category':'Plants', 'searchname':'Blood Bloom',                    'nickname':''},
				//~ {'category':'Plants', 'searchname':'Jademare',                       'nickname':''},
				//~ {'category':'Plants', 'searchname':'Dark Shade',                     'nickname':''},
				//~ {'category':'Plants', 'searchname':'Trinettle',                      'nickname':''},
				//~ {'category':'Plants', 'searchname':'Heffle Wart',                    'nickname':''},
				//~ {'category':'Plants', 'searchname':'Amber',                          'nickname':''}
			//~ ];
		//~ }
		//~ return FSH.Data.quickSearchArray;
	//~ },

	bias: {0: {generalVariable: 1.1053,
				hpVariable: 1.1},
			1: {generalVariable: 1.1,
				hpVariable: 1.053},
			2: {generalVariable: 1.053,
				hpVariable: 1},
			3: {generalVariable: 1.1053,
				hpVariable: 1}
		},

	defaults: {
		currentTile: '',
		lastActiveQuestPage: '',
		lastCompletedQuestPage: '',
		lastNotStartedQuestPage: '',
		questBeingTracked: '',
		lastWorld: '',
		questsNotStarted: false,
		questsNotComplete: false,
		checkForQuestsInWorld: false,
		enableLogColoring: true,
		enableChatParsing: true,
		enableCreatureColoring: true,
		showCombatLog: false,
		showCreatureInfo: false,
		keepLogs: false,

		showExtraLinks: true,
		huntingBuffs: 'Doubler,Librarian,Adept Learner,Merchant,Treasure Hunter,Animal Magnetism,Conserve',
		huntingBuffsName: 'default',
		huntingBuffs2: 'Deflect',
		huntingBuffs2Name: 'PvP',
		huntingBuffs3: 'SE hunting',
		huntingBuffs3Name: 'Super Elite Slayer',
		showHuntingBuffs: true,
		moveFSBox: false,

		guildSelf: '',
		guildFrnd: '',
		guildPast: '',
		guildEnmy: '',
		goldRecipient: '',
		goldAmount: '',
		sendGoldonWorld: false,
		goldConfirm: '',

		hideKrulPortal: false,
		hideQuests: false,
		hideQuestNames: '',
		hideRecipes: false,
		hideRecipeNames: '',
		footprintsColor: 'silver',
		enableGuildInfoWidgets: true,
		enableOnlineAlliesWidgets: true,
		guildOnlineRefreshTime: 300,
		hideGuildInfoSecureTrade: true,
		hideGuildInfoTrade: false,
		hideGuildInfoMessage: false,
		hideGuildInfoBuff: false,

		buyBuffsGreeting: 'Hello {playername}, can I buy {buffs} for {cost} please?',
		renderSelfBio: true,
		bioEditLines: 10,
		renderOtherBios: true,
		playNewMessageSound: false,
		showSpeakerOnWorld: false,
		defaultMessageSound: 'http://dl.getdropbox.com/u/2144065/chimes.wav',
		highlightPlayersNearMyLvl: true,
		highlightGvGPlayersNearMyLvl: true,
		detailedConflictInfo: false,
		gameHelpLink: true,
		navigateToLogAfterMsg: true,

		enableAllyOnlineList: false,
		enableEnemyOnlineList: false,
		allyEnemyOnlineRefreshTime: 300,
		moveGuildList: false,
		moveOnlineAlliesList: false,

		hideMatchesForCompletedMoves: false,
		quickKill: false,
		doNotKillList: '',
		enableBioCompressor: true,
		maxCompressedCharacters: 250,
		maxCompressedLines: 10,
		hideArenaPrizes: '',
		autoSortArenaList: false,

		currentGoldSentTotal: 0,
		keepBuffLog: false,
		buffLog: '',

		enableActiveBountyList: false,
		bountyListRefreshTime: 300,
		enableWantedList: false,
		wantedNames: '',
		bwNeedsRefresh: true,

		fsboxlog: false,
		fsboxcontent: '',
		itemRecipient: '',
		quickLinks:'[]',
		enableAttackHelper: false,
		minGroupLevel: 1,
		combatEvaluatorBias: 0,
		huntingMode: false,
		enabledHuntingMode: 1,
		hideRelicOffline: false,

		enterForSendMessage: false,
		trackKillStreak: true,
		storeLastQuestPage: false,
		addAttackLinkToLog: true,
		showStatBonusTotal: false,

		newGuildLogHistoryPages: 3,
		useNewGuildLog: false,
		enhanceChatTextEntry: true,

		ajaxifyRankControls: false,

		enableMaxGroupSizeToJoin: false,
		maxGroupSizeToJoin: 11,

		enableTempleAlert: false,
		enableUpgradeAlert: false,
		enableComposingAlert: false,
		autoFillMinBidPrice: true,
		showPvPSummaryInLog: false,
		enableQuickDrink: false,
		enhanceOnlineDots: true,
		hideBuffSelected: false,
		enableFastWalk: false,
		hideHelperMenu: false,
		keepHelperMenuOnScreen: true,
		quickLinksTopPx: 22,
		quickLinksLeftPx: 0,
		showNextQuestSteps: true,
		//disableComposingPrompts: false,

		showHelmetTypeItems: true,
		showAmorTypeItems: true,
		showGloveTypeItems: true,
		showBootTypeItems: true,
		showWeaponTypeItems: true,
		showShieldTypeItems: true,
		showRingTypeItems: true,
		showAmuletTypeItems: true,
		showRuneTypeItems: true,

		showRecallMessages: true,
		showRelicMessages: true,
		showMercenaryMessages: true,
		showGroupCombatMessages: true,
		showDonationMessages: true,
		showRankingMessages: true,
		showGvGMessages: true,
		showTaggingMessages: true,

		showQuickDropLinks: false,


		memberlist: '',
		inventoryMinLvl: 1,
		inventoryMaxLvl: 9999,
		onlinePlayerMinLvl: 1,
		onlinePlayerMaxLvl: 9999,
		arenaMinLvl: 1,
		arenaMaxLvl: 9999,
		showMonsterLog: false,
		lastTempleCheck: 0,
		needToPray: false,
		lastChatCheck: '0',
		lastGuildLogCheck: '0',
		lastOutBoxCheck: '0',
		lastPlayerLogCheck: '0',
		showAdmin: false,
		alliestotal: 0,
		enemiestotal: 0,
		footprints: false,
		showFastWalkIconOnWorld: false,
		hideNonPlayerGuildLogMessages: true,
		listOfAllies: '',
		listOfEnemies: '',
		contactList: '',
		lastUpgradeCheck: 0,
		needToDoUpgrade: false,
		characterVirtualLevel: 0,
		guildLogoControl: false,
		statisticsControl: false,
		guildStructureControl: false,
		lastMembrListCheck: 0,
		disableItemColoring: false,
		showQuickSendLinks: false,
		needToCompose: false,
		lastComposeCheck: 0,
		lastOnlineCheck: 0,
		bountyList: '',
		wantedList: '',
		inventoryCheckedElements: {
			'0': 1, '1': 1, '2': 1, '3': 1, '4': 1,
			'5': 1, '6': 1, '7': 1, '8': 1
		},
		lowestLevelInTop250: 0,

/* jshint -W110 */ // Mixed double and single quotes. (W110)

		quickMsg: '["Thank you very much ^_^","Happy hunting, {playername}"]',

		sendClasses: '["Amber", "5611"], ' +
			'["Amethyst Weed", "9145"], ["Blood Bloom", "5563"], ' +
			'["Cerulean Rose", "9156"], ["Coleoptera Body", "9287"], ' +
			'["Dark Shade", "5564"], ["Deathbloom", "9140"], ' +
			'["Deathly Mold", "9153"], ["Greenskin\u00A0Fungus", "9148"], ' +
			'["Heffle", "5565"], ["Jademare", "5566"], ' +
			'["Ruby Thistle", "9143"], ["Toad Corpse","9288"], ' +
			'["Trinettle", "5567"], ["Viridian\u00A0Vine", "9151"], ' +
			'["Mortar & Pestle", "9157"], ["Beetle Juice", "9158"]',

		quickSearchList: 
			'[{"category":"Plants","searchname":"Amber","nickname":""},' +
			'{"category":"Plants","searchname":"Blood Bloom","nickname":""},' +
			'{"category":"Plants","searchname":"Jademare","nickname":""},' +
			'{"category":"Plants","searchname":"Dark Shade","nickname":""},' +
			'{"category":"Plants","searchname":"Trinettle","nickname":""},' +
			'{"category":"Plants","searchname":"Heffle Wart","nickname":""},' +
			'{"category":"Potions","searchname":"Sludge Brew",' +
				'"nickname":"DC 200","displayOnAH":true},' +
			'{"category":"Potions","searchname":"Potion of Black Death",' +
				'"nickname":"DC 225","displayOnAH":true},' +
			'{"category":"Potions","searchname":"Potion of Aid",' +
				'"nickname":"Assist","displayOnAH":true},' +
			'{"category":"Potions","searchname":"Potion of Supreme Doubling",' +
				'"nickname":"DB 450","displayOnAH":true},' +
			'{"category":"Potions","searchname":"Potion of Acceleration",' +
				'"nickname":"DB 500","displayOnAH":true},' +
			'{"category":"Potions","searchname":"Potion of Lesser Death Dealer",' +
				'"nickname":"DD","displayOnAH":true},' +
			'{"category":"Potions","searchname":"Runic Potion",' +
				'"nickname":"FI 250","displayOnAH":true},' +
			'{"category":"Potions","searchname":"Potion of the Bookworm",' +
				'"nickname":"Lib 225","displayOnAH":true},' +
			'{"category":"Potions","searchname":"Potion of Truth",' +
				'"nickname":"EW 1k","displayOnAH":true},' +
			'{"category":"Potions","searchname":"Dull Edge",' +
				'"nickname":"DE 25","displayOnAH":true},' +
			'{"category":"Potions","searchname":"Notched Blade",' +
				'"nickname":"DE 80","displayOnAH":true},' +
			'{"category":"Potions","searchname":"Potion of Death",' +
				'"nickname":"DW 125","displayOnAH":true},' +
			'{"category":"Potions","searchname":"Potion of Decay",' +
				'"nickname":"WI 150","displayOnAH":true},' +
			'{"category":"Potions","searchname":"Potion of Fatality",' +
				'"nickname":"WI 350","displayOnAH":true},' +
			'{"category":"Potions","searchname":"Potion of Annihilation",' +
				'"nickname":"DW 150","displayOnAH":true},' +
			'{"category":"Potions","searchname":"Potion of the Wise",' +
				'"nickname":"Lib 200","displayOnAH":true},' +
			'{"category":"Potions","searchname":"Potion of Shattering",' +
				'"nickname":"SA","displayOnAH":true},' +
			'{"category":"Potions","searchname":"Dragons Blood Potion",' +
				'"nickname":"ZK 200","displayOnAH":true},' +
			'{"category":"Potions","searchname":"Berserkers Potion",' +
				'"nickname":"ZK 300","displayOnAH":true},' +
			'{"category":"Potions","searchname":"Potion of Fury",' +
				'"nickname":"ZK 350","displayOnAH":true},' +
			'{"category":"Potions","searchname":"Potion of Supreme Luck",' +
				'"nickname":"FI 1k","displayOnAH":true}]'

/* jshint +W110 */ // Mixed double and single quotes. (W110)

	},

	saveBoxes: [
		'navigateToLogAfterMsg',
		'gameHelpLink',
		'guildSelf',
		'guildFrnd',
		'guildPast',
		'guildEnmy',
		'showAdmin',
		'ajaxifyRankControls',
		'detailedConflictInfo',
		'disableItemColoring',
		'enableLogColoring',
		'enableChatParsing',
		'enableCreatureColoring',
		'hideNonPlayerGuildLogMessages',
		'buyBuffsGreeting',
		'renderSelfBio',
		'renderOtherBios',
		'defaultMessageSound',
		'showSpeakerOnWorld',
		'playNewMessageSound',
		'highlightPlayersNearMyLvl',
		'highlightGvGPlayersNearMyLvl',
		'showCombatLog',
		'showMonsterLog',
		'showCreatureInfo',
		'keepLogs',
		'enableGuildInfoWidgets',
		'enableOnlineAlliesWidgets',
		'hideGuildInfoMessage',
		'hideGuildInfoBuff',
		'hideGuildInfoSecureTrade',
		'hideGuildInfoTrade',
		'quickKill',
		'huntingBuffs',
		'huntingBuffsName',
		'huntingBuffs2',
		'huntingBuffs2Name',
		'huntingBuffs3',
		'huntingBuffs3Name',
		'showHuntingBuffs',
		'moveGuildList',
		'moveOnlineAlliesList',
		'moveFSBox',
		'hideKrulPortal',
		'hideQuests',
		'hideQuestNames',
		'checkForQuestsInWorld',
		'hideRecipes',
		'hideRecipeNames',
		'footprintsColor',
		'doNotKillList',
		'enableBioCompressor',
		'maxCompressedCharacters',
		'maxCompressedLines',
		'sendGoldonWorld',
		'goldRecipient',
		'goldAmount',
		'keepBuffLog',
		'showQuickSendLinks',
		'showQuickDropLinks',
		'sendClasses',
		'itemRecipient',
		'currentGoldSentTotal',
		'hideArenaPrizes',
		'autoSortArenaList',
		'enableAllyOnlineList',
		'enableEnemyOnlineList',
		'allyEnemyOnlineRefreshTime',
		'quickLinksTopPx',
		'quickLinksLeftPx',
		'enableActiveBountyList',
		'bountyListRefreshTime',
		'enableWantedList',
		'wantedNames',
		'fsboxlog',
		'huntingMode',
		'enableAttackHelper',
		'hideRelicOffline',
		'enterForSendMessage',
		'storeLastQuestPage',
		'addAttackLinkToLog',
		'showStatBonusTotal',
		'newGuildLogHistoryPages',
		'useNewGuildLog',
		'enhanceChatTextEntry',
		'enableMaxGroupSizeToJoin',
		'maxGroupSizeToJoin',
		'enableTempleAlert',
		'enableUpgradeAlert',
		'enableComposingAlert',
		'autoFillMinBidPrice',
		'showPvPSummaryInLog',
		'enableQuickDrink',
		'enhanceOnlineDots',
		'hideBuffSelected',
		'enableFastWalk',
		'showFastWalkIconOnWorld',
		'hideHelperMenu',
		'keepHelperMenuOnScreen',
		'showNextQuestSteps'//,
		//'disableComposingPrompts'
	],

	craft: {
		Perfect    : {abbr: 'Perf', colour: '#00b600'},
		Excellent  : {abbr: 'Exc',  colour: '#f6ed00'},
		'Very Good': {abbr: 'VG',   colour: '#f67a00'},
		Good       : {abbr: 'Good', colour: '#f65d00'},
		Average    : {abbr: 'Ave',  colour: '#f64500'},
		Poor       : {abbr: 'Poor', colour: '#f61d00'},
		'Very Poor': {abbr: 'VPr',  colour: '#b21500'},
		Uncrafted  : {abbr: 'Unc',  colour: '#666666'}
	},

	itemType: ['Helmet', 'Armor', 'Gloves', 'Boots', 'Weapon', 'Shield',
		'Ring', 'Amulet', 'Rune', 'Quest Item', 'Potion', 'Component',
		'Resource', 'Recipe', 'Container', 'Composed Potion', 'Frag Stash'],

	rarityColour: [
		'#ffffff', // Common
		'#0099ff', // Rare '#40FFFF'
		'#ff33ff', // Unique
		'#ffff66', // Legendary '#F6ED00'
		'#ff3333', // Super Elite
		'#6633ff', // Crystalline
		'#009900'  // Epic '#00FF00'
	],

	rarity: [
		{colour: '#ffffff', class: 'fshCommon'},
		{colour: '#0099ff', class: 'fshRare'},
		{colour: '#cc00ff', class: 'fshUnique'},
		{colour: '#ffff33', class: 'fshLegendary'},
		{colour: '#cc0033', class: 'fshSuper'},
		{colour: '#6633ff', class: 'fshCrystal'},
		{colour: '#009900', class: 'fshEpic'}
	],

	pageSwitcher: {
		settings: {'-': {'-': {'-': {'-': 'settingsPage.injectSettings'}}}},
		world: {
			'-': {'-': {'-': {'-': 'injectWorld'}}},
			'viewcreature': {'-': {'-': {'-': 'injectCreature'}}},
			'map': {'-': {'-': {'-': 'injectWorldMap'}}}},
		news: {
			'fsbox': {'-': {'-': {'-': 'news.newsFsbox'}}},
			'shoutbox': {'-': {'-': {'-': 'news.newsShoutbox'}}}},
		blacksmith: {
			'repairall': {'-': {'-': {'1': 'injectWorld'}}}},
		arena: {
			//'-': {'-': {'-': {'-': 'injectArena'}}},
			'completed': {'-': {'-': {'-': 'storeCompletedArenas'}}},
			'pickmove': {'-': {'-': {'-': 'storeArenaMoves'}}},
			//'results': {'-': {'-': {'-': 'injectTournament'}}},
			//'dojoin': {'-': {'-': {'-': 'injectTournament'}}},
			'setup': {'-': {'-': {'-': 'injectArenaSetupMove'}}}},
		questbook: {
			'-': {'-': {
				'-': {'-': 'questBook.injectQuestBookFull'},
				'0': {'-': 'questBook.injectQuestBookFull'}, // Normal
				'1': {'-': 'questBook.injectQuestBookFull'}}}, // Seasonal
			'atoz': {'-': {'-': {'-': 'questBook.injectQuestBookFull'}}},
			'viewquest': {'-': {'-': {'-': 'questBook.injectQuestTracker'}}}},
		profile: {
			'-': {'-': {'-': {'-': 'profile.injectProfile'}}},
			'report': {'-': {'-': {'-': 'profile.injectProfile'}}},
			'equipitem': {'-': {'-': {'-': 'profile.injectProfile'}}},
			'changebio': {'-': {'-': {'-': 'profile.injectBioWidgets'}}},
			'dropitems': {'-': {'-': {'-': 'dropItems.injectProfileDropItems',
				'1': 'dropItems.injectProfileDropItems'}}}},
		auctionhouse: {'-': {'-': {'-': {'-': 'injectAuctionHouse'}}}},
		guild: {
			'inventory': {
				'report': {'-': {'-': 'guildReport.injectReportPaint'}},
				'addtags': {
					'-': {'-': 'injectGuildAddTagsWidgets'},
					'-1': {'-': 'injectGuildAddTagsWidgets'},
					'0': {'-': 'injectGuildAddTagsWidgets'},
					'1': {'-': 'injectGuildAddTagsWidgets'},
					'2': {'-': 'injectGuildAddTagsWidgets'},
					'3': {'-': 'injectGuildAddTagsWidgets'},
					'4': {'-': 'injectGuildAddTagsWidgets'},
					'5': {'-': 'injectGuildAddTagsWidgets'},
					'6': {'-': 'injectGuildAddTagsWidgets'},
					'7': {'-': 'injectGuildAddTagsWidgets'},
					'8': {'-': 'injectGuildAddTagsWidgets'},
					'10': {'-': 'injectGuildAddTagsWidgets'},
					'15': {'-': 'injectGuildAddTagsWidgets'},
					'16': {'-': 'injectGuildAddTagsWidgets'}},
				'removetags': {'-': {'-': 'injectGuildAddTagsWidgets'}},
				'storeitems': {'-': {'-': 'dropItems.injectDropItems'}}},
			'chat': {'-': {'-': {'-': 'logs.guildChat'}}},
			'log': {'-': {'-': {'-': 'logs.guildLog'}}},
			'groups': {
				'viewstats': {'-': {'-': 'groups.injectGroupStats'}},
				'joinallgroupsundersize': {'-': {'-': 'groups.injectGroups'}},
				'-': {'-': {'-': 'groups.injectGroups'}}},
			'manage': {'-': {'-': {'-': 'injectGuild'}}},
			'advisor': {
				'-': {'-': {'-': 'guildAdvisor.injectAdvisor'}},
				'weekly': {'-': {'-': 'guildAdvisor.injectAdvisor'}}},
			'history': {'-': {'-': {'-': 'addHistoryWidgets'}}},
			'view': {'-': {'-': {'-': 'injectViewGuild'}}},
			'scouttower': {'-': {'-': {'-': 'injectScouttower'}}},
			//'mailbox': {'-': {'-': {'-': 'mailbox.injectMailbox'}}},
			'ranks': {'-': {'-': {'-': 'rank.injectGuildRanks'}}},
			'conflicts': {'rpupgrades': {'-': {'-': 'injectRPUpgrades'}}}},
		bank: {'-': {'-': {'-': {'-': 'injectBank'}}}},
		log: {
			'-': {'-': {
				'-': {'-': 'logs.playerLog'},
				'-1': {'-': 'logs.playerLog'},
				'0': {'-': 'logs.playerLog'},
				'1': {'-': 'logs.playerLog'},
				'2': {'-': 'logs.playerLog'},
				'3': {'-': 'logs.playerLog'}}},
			'outbox': {'-': {'-': {'-': 'logs.outbox'}}}},
		potionbazaar: {'-': {'-': {'-': {'-': 'bazaar.inject'}}}},
		marketplace: {
			'createreq': {'-': {'-': {'-': 'addMarketplaceWidgets'}}}},
		quickbuff: {'-': {'-': {'-': {'-': 'quickBuff.inject'}}}},
		notepad: {
			'showlogs': {'-': {'-': {'-': 'injectNotepadShowLogs'}}},
			'invmanagernew': {'-': {'-': {
				'-': 'inventory.injectInventoryManagerNew'}}},
			'invmanager': {'-': {'-': {'-': 'injectInventoryManager'}}},
			'guildinvmgr': {'-': {'-': {
				'-': 'inventory.injectInventoryManagerNew'}}},
			'guildinvmanager': {'-': {'-': {'-': 'injectInventoryManager'}}},
			'recipemanager': {'-': {'-': {'-': 'injectRecipeManager'}}},
			'auctionsearch': {'-': {'-': {'-': 'lists.injectAuctionSearch'}}},
			'onlineplayers': {'-': {'-': {'-': 'onlinePlayers.injectOnlinePlayers'}}},
			'quicklinkmanager': {'-': {'-': {'-': 'lists.injectQuickLinkManager'}}},
			'monsterlog': {'-': {'-': {'-': 'injectMonsterLog'}}},
			'quickextract': {'-': {'-': {'-': 'insertQuickExtract'}}},
			'quickwear': {'-': {'-': {'-': 'quickWear.insertQuickWear'}}},
			'fsboxcontent': {'-': {'-': {'-': 'injectFsBoxContent'}}},
			'bufflogcontent': {'-': {'-': {'-': 'injectBuffLog'}}},
			'newguildlog': {'-': {'-': {'-': 'injectNewGuildLog'}}},
			'findbuffs': {'-': {'-': {'-': 'injectFindBuffs'}}},
			'findother': {'-': {'-': {'-': 'injectFindOther'}}},
			'savesettings': {'-': {'-': {'-': 'injectSaveSettings'}}},
			'-': {'-': {'-': {'-': 'injectNotepad'}}}},
		points: {'-': {'-': {
			'-': {'-': 'storePlayerUpgrades'},
			'0': {'-': 'storePlayerUpgrades'},
			'1': {'-': 'notification.parseGoldUpgrades'}}}},
		trade: {
			'-': {'-': {'-': {'-': 'injectTrade'}}},
			'createsecure': {'-': {'-': {'-': 'injectTrade'}}}},
		titan: {'-': {'-': {'-': {'-': 'injectTitan'}}}},
		toprated: {
			'xp': {'-': {'-': {'-': 'toprated.injectTopRated'}}},
			'monthlyxp': {'-': {'-': {'-': 'toprated.injectTopRated'}}},
			'gold': {'-': {'-': {'-': 'toprated.injectTopRated'}}},
			'killstreak': {'-': {'-': {'-': 'toprated.injectTopRated'}}},
			'bounties': {'-': {'-': {'-': 'toprated.injectTopRated'}}},
			'risingstars': {'-': {'-': {'-': 'toprated.injectTopRated'}}},
			'arena': {'-': {'-': {'-': 'toprated.injectTopRated'}}},
			'superelites': {'-': {'-': {'-': 'toprated.injectTopRated'}}},
			'smasher': {'-': {'-': {'-': 'toprated.injectTopRated'}}}},
		inventing: {'viewrecipe': {'-': {'-': {'-': 'recipes.inventing'}}}},
		tempinv: {'-': {'-': {'-': {'-': 'mailbox.injectMailbox'}}}},
		//attackplayer: {'-': {'-': {'-': {'-': 'injectAttackPlayer'}}}},
		findplayer: {'-': {'-': {'-': {'-': 'injectFindPlayer'}}}},
		//relic: {'-': {'-': {'-': {'-': 'injectRelic'}}}},
		quests: {'view': {'-': {'-': {'-': 'questBook.showAllQuestSteps'}}}}, //UFSG
		scavenging: {'process': {'-': {'-': {'-': 'injectScavenging'}}}},
		temple: {'-': {'-': {'-': {'-': 'notification.parseTemplePage'}}}},
		composing: {'-': {'-': {'-': {'-': 'composing.injectComposing'}}}},
		'-': {'-': {'-': {'-': {'-': 'environment.unknownPage'}}}}
	},

	excludeBuff: {
		'skill-50' : 'Death Dealer',
		'skill-54' : 'Counter Attack',
		'skill-55' : 'Summon Shield Imp',
		'skill-56' : 'Vision',
		'skill-60' : 'Nightmare Visage',
		'skill-61' : 'Quest Finder',
		'skill-98' : 'Barricade',
		'skill-101': 'Severe Condition'
	},

	inventoryCheckAll: {
		'0': 1, '1': 1, '2': 1, '3': 1, '4': 1,
		'5': 1, '6': 1, '7': 1, '8': 1, '9': 1,
		'10': 1, '11': 1, '12': 1, '13': 1,
		'14': 1, '15': 1, '16': 1
	}

};

FSH.Layout = {

	helpLink: function(title, text) {
		return ' [&nbsp;' +
			'<span style="text-decoration:underline;cursor:pointer;" class="tip-static" data-tipped="' +
			'<span style=\'font-weight:bold; color:#FFF380;\'>' + title + '</span><br /><br />' +
			text + '">?</span>' +
			'&nbsp;]';
	},

	onlineDot: function(obj) {
		var img;
		var min = 0;
		if (obj.day)  {min += parseInt(obj.day,  10) * 1440;}
		if (obj.hour) {min += parseInt(obj.hour, 10) * 60;}
		if (obj.min)  {min += parseInt(obj.min,  10);}
		if (obj.last_login) {
			min = Math.floor(Date.now() / 60000) - Math.floor(obj.last_login / 60);
		}
		if (min < 2) {
			img = FSH.Data.greenDiamond;
		} else if (min < 5) {
			img = FSH.Data.yellowDiamond;
		} else if (min < 30) {
			img = FSH.Data.orangeDiamond;
		} else if (min < 10080) {
			img = FSH.Data.offlineDot;
		} else if (min < 44640) {
			img = FSH.Data.sevenDayDot;
		} else if (min >= 44640) {
			img = FSH.Data.redDot;
		}
		return img;
	},

	injectMenu: function() { //jquery
		if (FSH.System.getValue('lastActiveQuestPage').length > 0) {
			$('a[href="index.php?cmd=questbook"]').attr('href',
				FSH.System.getValue('lastActiveQuestPage'));
		}
		var pCL = $('div#pCL:first');
		if (pCL.length === 0) {return;}
		//character
		$(pCL).find('a#nav-character-log').parent('li')
			.after('<li class="nav-level-1"><a class="nav-link" id="nav-' +
				'character-recipemanager" href="index.php?cmd=notepad&blank' +
				'=1&subcmd=recipemanager">Recipe Manager</a></li>')
			.after('<li class="nav-level-1"><a class="nav-link" id="nav-' +
				'character-invmanager" href="index.php?cmd=notepad&blank=1&' +
				'subcmd=invmanager">Inventory Manager</a></li>')
			.after('<li class="nav-level-1"><a class="nav-link" id="nav-' +
				'character-medalguide" href="index.php?cmd=profile&subcmd=' +
				'medalguide">Medal Guide</a></li>');
		if (FSH.System.getValue('keepBuffLog')) {
			$(pCL).find('a#nav-character-log').parent('li')
				.after('<li class="nav-level-1"><a class="nav-link" id="nav-' +
					'character-bufflog" href="index.php?cmd=notepad&blank=1&' +
					'subcmd=bufflogcontent">Buff Log</a></li>');
		}
		if (FSH.System.getValue('keepLogs')) {
			$(pCL).find('a#nav-character-notepad').parent('li')
				.after('<li class="nav-level-1"><a class="nav-link" id="nav-' +
					'character-showlogs" href="index.php?cmd=notepad&blank=1' +
					'&subcmd=showlogs">Combat Logs</a></li>');
		}
		if (FSH.System.getValue('showMonsterLog')) {
			$(pCL).find('a#nav-character-notepad').parent('li')
				.after('<li class="nav-level-1"><a class="nav-link" id="nav-' +
					'character-monsterlog" href="index.php?cmd=notepad&blank' +
					'=1&subcmd=monsterlog">Creature Logs</a></li>');
		}
		$(pCL).find('a#nav-character-notepad').parent('li')
			.after('<li class="nav-level-1"><a class="nav-link" id="nav-' +
				'character-quicklinkmanager" href="index.php?cmd=notepad&' +
				'blank=1&subcmd=quicklinkmanager">Quick Links</a></li>')
			.after('<li class="nav-level-1"><a class="nav-link" id="nav-' +
				'character-createmap" href="index.php?cmd=notepad&blank=1&' +
				'subcmd=createmap">Create Maps</a></li>');
		//guild
		$(pCL).find('a#nav-guild-storehouse-inventory').parent('li')
			.after('<li class="nav-level-2"><a class="nav-link" id="nav-' +
				'guild-guildinvmanager" href="index.php?cmd=notepad&blank=1' +
				'&subcmd=guildinvmanager">Guild Inventory</a></li>');
		if (!FSH.System.getValue('useNewGuildLog')) {
			//if not using the new guild log, show it as a separate menu entry
			$(pCL).find('a#nav-guild-ledger-guildlog').parent('li')
				.before('<li class="nav-level-2"><a class="nav-link" id="nav' +
					'-guild-newguildlog" href="index.php?cmd=notepad&blank=1' +
					'&subcmd=newguildlog">New Guild Log</a></li>');
		}
		//top rated
		$(pCL).find('a#nav-toprated-players-level').parent('li')
			.after('<li class="nav-level-2"><a class="nav-link" id="nav-' +
				'toprated-top250" href="index.php?cmd=toprated&subcmd=xp">' +
				'Top 250 Players</a></li>');
		//actions
		$(pCL).find('a#nav-actions-trade-auctionhouse').parent('li')
			.after('<li class="nav-level-2"><a class="nav-link" id="nav-' +
				'actions-ahquicksearch" href="index.php?cmd=notepad&blank=1' +
				'&subcmd=auctionsearch">AH Quick Search</a></li>');
		$(pCL).find('a#nav-actions-interaction-findplayer').parent('li')
			.after('<li class="nav-level-2"><a class="nav-link" id="nav-' +
				'actions-onlineplayers" href="index.php?cmd=notepad&blank=1' +
				'&subcmd=onlineplayers">Online Players</a></li>')
			.after('<li class="nav-level-2"><a class="nav-link" id="nav-' +
				'actions-findother" href="index.php?cmd=notepad&blank=1&' +
				'subcmd=findother">Find Other</a></li>')
			.after('<li class="nav-level-2"><a class="nav-link" id="nav-' +
				'actions-findbuffs" href="index.php?cmd=notepad&blank=1&' +
				'subcmd=findbuffs">Find Buffs</a></li>');
		//adjust the menu length in chrome for the newly added items
		//first the open ones
		$('ul.nav-animated').each(function() {
			if ($(this).css('height') !== '0px') {
				$(this).css('height',$(this).find('li').length*22);
			}
		});
		//and now the closed saved variables
		window.$('#nav').nav('calcHeights');
	},

	moveRHSBoxUpOnRHS: function(title) {
		$('div#pCR').prepend($('div#' + title));
	},

	moveRHSBoxToLHS: function(title) {
		var myDiv=$('div#' + title).wrap('<div class="pCR"></div>');
		myDiv=myDiv.parent();
		$('div#pCL').append(myDiv);
		$('div#pCL').append('<style>.pCR a { color: #F7EAC9; }</style>');
	},

	notebookContent: function() {
		return $('div#pCC')[0]; //new interface logic
	},

	makePageHeader: function(title, comment, spanId, button) { // Native
		return '<table width=100%><tr style="background-color:#CD9E4B">'+
			'<td width="90%" nobr><b>&nbsp;'+title+'</b>'+
			(comment===''?'':'&nbsp;('+comment+')')+
			'<td width="10%" nobr style="font-size:x-small;text-align:right">'+
			(spanId?'[<span style="text-decoration:underline;cursor:pointer;" id="'+spanId+'">'+button+'</span>]':'')+
			'</td></tr></table>';
	},

	makePageTemplate: function(title, comment, spanId, button, divId) { // Native
		return FSH.Layout.makePageHeader(title, comment, spanId, button)+
			'<div style="font-size:small;" id="'+divId+'"></div>';
	},

	playerId: function() {
		var playerIdRE = /fallensword.com\/\?ref=(\d+)/;
		var thePlayerId=parseInt(document.body.innerHTML.match(playerIdRE)[1],10);
		FSH.System.setValue('playerID',thePlayerId);
		return thePlayerId;
	},

	guildId: function () {
		var guildId = $('script:contains("guildId: ")').first().text()
			.match(/\s+guildId: ([0-9]+),/);
		if (guildId) {guildId = parseInt(guildId[1], 10);}
		FSH.System.setValue('guildId', guildId);
		return guildId;
	},

	infoBox: function(documentText) {
		//var infoRE = /<center><b>INFORMATION.*><center>([^<]+)<\/center>/i;
		//infoRE = /<center>INFORMATION<\/center><\/font><\/td><\/tr>\t*<tr><td><font size=2 color=\'\#000000\'><center>([^<]+)</i;
		//Fast Recall = <center>INFORMATION</center></font></td></tr>	<tr><td><font size=2 color='#000000'><center>You successfully recalled the item.</center>
		//Guild Take = <center>INFORMATION</center></font></td></tr>	<tr><td><font size=2 color='#000000'><center>You successfully took the item into your backpack.</center>
		var infoMatch = $(documentText).find('center[id="info-msg"]').html();
		var result='';
		if (infoMatch) {
			infoMatch = infoMatch.replace(/<br.*/,'');
			result=infoMatch;
		}
		return result;
	},

	networkIcon:
		'<img title="This function retrieves data from the network. ' +
		'Disable this to increase speed" src="data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA' +
		'B3RJTUUH1QgGDTMWk1twEwAAAAlwSFlzAAALEgAACxIB0t1+' +
		'/AAAAARnQU1BAACxjwv8YQUAAAC8SURBVHjahVPBEcQgCEQn' +
		'HdmTqUlr0qe16I8cufOiCGZnGCcIy4LEICJwmGgWJ3o0IOCQ' +
		'EqVg9Y4U3CoCHQhvxuPUZEiA3XYkxyI1/6S6R6rke8AlJbkV' +
		'7u95lleXq3yrdyUjLGxwnifmnHEXY3fJIQSIMcKOZCLgMltr' +
		'r+1ZWgxp8wi1VrEqxfeFWloYq4wKtOHeBNqeawqmeOnNvfdY' +
		'SvkbfaeUxP0w/G+k6WsT/xCBc25SuxDsnownEy4u5BHudpMF' +
		'egAAAABJRU5ErkJggg==" width="16" height="16" />',

	quickBuffHref: function(playerId, buffList) {
		if (buffList) {
			return 'href=\'javascript:window.openWindow("index.php?cmd=' +
				'quickbuff&tid=' + playerId + '&blist=' + buffList +
				'", "fsQuickBuff", 618, 1000, ",scrollbars")\'';
		} else {
			return 'href=\'javascript:window.openWindow("index.php?cmd=' +
				'quickbuff&tid=' + playerId +
				'", "fsQuickBuff", 618, 1000, ",scrollbars")\'';
		}
	},

	buffAllHref: function(shortList) {
		shortList = shortList.join(',').replace(/\s/g, '');
		var j = 'java';
		return j + 'script:openWindow("index.php?cmd=quickbuff&t=' + shortList +
			'", "fsQuickBuff", 618, 1000, ",scrollbars")';
	},

	advisorColumns: [
		{title: 'Member'},
		{title: 'Lvl',                class: 'dt-center'},
		{title: 'Rank',               class: 'dt-center dt-nowrap'},
		{title: 'Gold From Deposits', class: 'dt-center'},
		{title: 'Gold From Tax',      class: 'dt-center'},
		{title: 'Gold Total',         class: 'dt-center'},
		{title: 'FSP',                class: 'dt-center'},
		{title: 'Skill Cast',         class: 'dt-center'},
		{title: 'Group Create',       class: 'dt-center'},
		{title: 'Group Join',         class: 'dt-center'},
		{title: 'Relic',              class: 'dt-center'},
		{title: 'XP Contrib',         class: 'dt-center'}
	],

	places:['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh',
			'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth',
			'fourteenth'],

	quickBuffHeader:
		'<div id="helperQBheader">' +
		'<table class="qbT"><thead><tr>' +
		'<th class="qbTH">Sustain</th>' +
		'<th class="qbTH">Fury Caster</th>' +
		'<th class="qbTH">Guild Buffer</th>' +
		'<th class="qbTH">Buff Master</span></th>' +
		'<th class="qbTH">Extend</span></th>' +
		'<th class="qbTH">Reinforce</span></th>' +
		'</tr></thead><tbody><tr>' +
		'<td id="fshSus" class="qbTD">&nbsp;</td>' +
		'<td id="fshFur" class="qbTD">&nbsp;</td>' +
		'<td id="fshGB"  class="qbTD">&nbsp;</td>' +
		'<td id="fshBM"  class="qbTD">&nbsp;</td>' +
		'<td id="fshExt" class="qbTD">&nbsp;</td>' +
		'<td id="fshRI"  class="qbTD">&nbsp;</td>' +
		'</tr></tbody></table>' +
		'</div>',

	godsNotification:
		'<li class="notification">' +
		'<span id="helperPrayToGods" style="text-align:center"><table><tbody>' +
		'<tr><td style="padding: 1px"><img src="' + FSH.System.imageServer +
		'/temple/0.gif" class="tip-static" data-tipped="Pray to Sahria" ' +
		'style="cursor: pointer"></td>' +
		'<td style="padding: 1px"><img src="' + FSH.System.imageServer +
		'/temple/1.gif" class="tip-static" data-tipped="Pray to Osverin" ' +
		'style="cursor: pointer"></td>' +
		'<td rowspan="2"><a href="index.php?cmd=temple" ' +
		'class="notification-content">Bow down to the gods</a></td></tr>' +
		'<tr><td style="padding: 1px"><img src="' + FSH.System.imageServer +
		'/temple/2.gif" class="tip-static" data-tipped="Pray to Gurgriss" ' +
		'style="cursor: pointer"></td>' +
		'<td style="padding: 1px"><img src="' + FSH.System.imageServer +
		'/temple/3.gif" class="tip-static" data-tipped="Pray to Lindarsil" ' +
		'style="cursor: pointer"></td></tr></tbody></table></span></li>',

	goldUpgradeMsg:
		'<li class="notification"><a href="index.php?cmd=points&type=1"><span' +
		' class="notification-icon"></span><p class="notification-content">Up' +
		'grade stamina with gold</p></a></li>',

	composeMsg:
		'<li class="notification"><a href="index.php?cmd=composing"><span' +
		' class="notification-icon"></span><p class="notification-content">Co' +
		'mposing to do</p></a></li>',

	allyEnemyList:
		'<h3>Allies/Enemies</h3><div class="minibox-content"><h4>Online ' +
		'Contacts <span id="fshResetEnemy">Reset</span></h4><div id="' +
		'minibox-enemy"><ul id="fshContactList"></ul><ul id="' +
		'enemy-quick-buff">Quick Buff Selected</ul></div></div>',

	allyEnemyContact:
		'<li class="player"><div class="player-row"><a class="' +
		'enemy-buff-check-on" data-name="@@username@@" href="#"></a>' +
		'<a class="player-name tip-static" style="color: @@contactColor@@" ' +
		'data-tipped="<b>@@username@@</b><br><table><tbody><tr><td>Level:' +
		'</td><td>@@level@@</td></tr><tr><td>Last Activity:</td><td>' +
		'@@last_login@@</td></tr></tbody></table>" ' +
		'href="index.php?cmd=profile&player_id=@@id@@">@@username@@</a></div>' +
		'<div class="guild-minibox-actions"><a id="enemy-send-message" ' +
		'class="guild-icon left guild-minibox-action tip-static" ' +
		'href="javascript:openQuickMsgDialog(\'@@username@@\');" ' +
		'data-tipped="Send Message""></a><a id="enemy-quickbuff" ' +
		'class="guild-icon left guild-minibox-action tip-static" ' +
		'href="javascript:openWindow(\'index.php?cmd=quickbuff&t=@@username@@' +
		'\', \'fsQuickBuff\', 618, 1000, \',scrollbars\');" ' +
		'data-tipped="Quick Buff"></a><a id="enemy-secure-trade" ' +
		'class="guild-icon left guild-minibox-action tip-static" ' +
		'href="index.php?cmd=trade&subcmd=createsecure&target_username=' +
		'@@username@@" data-tipped="Secure Trade"></a><a id="enemy-trade" ' +
		'class="guild-icon left guild-minibox-action tip-static" ' +
		'href="index.php?cmd=trade&target_player=@@username@@" ' +
		'data-tipped="Send Gold/Items/FSP"></a></div></li>',

	reportLinks:
		'<span class="fshNoWrap">Recall to: <a class="tip-static" ' +
		'href="@@firstHref@@" data-tipped="@@firstOldTitle@@">@@firstText@@' +
		'</a><span class="fshHide"> | <a class="tip-static" ' +
		'href="@@secondHref@@" data-tipped="Click to recall to guild store">' +
		'Guild Store</a></span> | <span class="reportLink recall tip-static" ' +
		'href="@@firstHref@@" data-tipped="@@firstOldTitle@@">Fast ' +
		'@@fasttext@@</span><span class="fshHide"> | <span class="reportLink ' +
		'recall tip-static" href="@@secondHref@@" data-tipped="Click to ' +
		'recall to guild store">Fast GS</span></span><span ' +
		'class="fshWearHide"> | <span class="reportLink @@linktype@@">Fast ' +
		'Wear</span></span></span>',

	bazaarTable:
		'<table id="fshBazaar"><tr><td colspan="5">Select an item to ' +
		'quick-buy:</td></tr><tr><td colspan="5">Select how many to ' +
		'quick-buy</td></tr><tr><td colspan="5"><input id="buy_amount" ' +
		'class="fshNumberInput" type="number" min="0" max="99" value="1">' +
		'</td></tr><tr><td>@0@</td><td>@1@</td><td>@2@</td><td>@3@</td><td>' +
		'@4@</td></tr><tr><td>@5@</td><td>@6@</td><td>@7@</td><td>@8@</td>' +
		'<td>@9@</td></tr><tr><td colspan="3">Selected item:</td><td id="' +
		'selectedItem" colspan="2"></td></tr><tr><td colspan="5"><span id="' +
		'warning">Warning:<br>pressing [<span id="fshBuy" class="fshLink">' +
		'This button</span>] now will buy the <span id="quantity">1</span> ' +
		'item(s) WITHOUT confirmation!</span></td></tr><tr>' +
		'<td id="buy_result" colspan="5"></td></tr></table>',

	bazaarItem:
		'<img class="tip-dynamic" width="20" height="20" src="@src@" ' +
		'itemid="@itemid@" data-tipped="@tipped@">',

	invManFilter:
		'<table class="fshInvFilter"><tr><th colspan="4">' +
		'@@reportTitle@@</th></tr><tr><td rowspan="3">' +
		'<b>&nbsp;Show Items:</b></td><td>' +
		'Helmet: <input id="fshHelmet" type="checkbox" item="0" checked/>' +
		' Armor: <input id="fshArmor" type="checkbox" item="1" checked/>' +
		' Gloves: <input id="fshGloves" type="checkbox" item="2" checked/>' +
		' Boots: <input id="fshBoots" type="checkbox" item="3" checked/>' +
		' Weapon: <input id="fshWeapon" type="checkbox" item="4" checked/></td>' +
		'<td>Min lvl:</td>' +
		'<td><input id="fshMinLvl" size="5" value="1"/></td>' +
		'</tr><tr><td>' +
		'Shield: <input id="fshShield" type="checkbox" item="5" checked/>' +
		' Ring: <input id="fshRing" type="checkbox" item="6" checked/>' +
		' Amulet: <input id="fshAmulet" type="checkbox" item="7" checked/>' +
		' Rune: <input id="fshRune" type="checkbox" item="8" checked/>' +
		' Sets Only: <input id="fshSets" item="-1" type="checkbox"/></td>' +
		'<td>Max lvl:</td>' +
		'<td><input id="fshMaxLvl" size="5" value="9999"/></td>' +
		'</tr><tr><td>' +
		'[<span id="fshAll" class="fshLink">Select All</span>] ' +
		'[<span id="fshNone" class="fshLink">Select None</span>] ' +
		'[<span id="fshDefault" class="fshLink">Defaults</span>]' +
		'</td><td></td><td>' +
		'<input id="fshReset" type="button" value="Reset"/>' +
		'</td></tr></tr><tr><td colspan="4">' +
		'&nbsp;Quest Item: <input id="fshQuest" item="9" type="checkbox"/>' +
		' Potion: <input id="fshPotion" item="10" type="checkbox"/>' +
		' Resource: <input id="fshResource" item="12" type="checkbox"/>' +
		' Recipe: <input id="fshRecipe" item="13" type="checkbox"/>' +
		' Container: <input id="fshContainer" item="14" type="checkbox"/>' +
		' Composed Potion: <input id="fshComposed" item="15" type="checkbox"/>' +
		' Frag Stash: <input id="fshStash" item="16" type="checkbox"/></td>' +
		'</td></table>',

	helperMenu:
		'<div class="column"><h3>Character</h3><ul><li>' +
		'<span class="fshLink" fn="injectBuffLog">Buff Log</span>' +
		'</li><li>' +
		'<span class="fshLink" fn="injectNotepadShowLogs">Combat Log</span>' +
		'</li><li>' +
		'<span class="fshLink" fn="injectRecipeManager">Recipe Manager</span>' +
		'</li><li>' +
		'<span class="fshLink" fn="lists.injectQuickLinkManager">Quick Links</span>' +
		'</li></ul><h3>Actions</h3><ul><li>' +
		'<span class="fshLink" fn="injectFindBuffs">Find Buffs</span>' +
		'</li><li>' +
		'<span class="fshLink" fn="injectFindOther">Find Other</span>' +
		'</li><li>' +
		'<span class="fshLink" fn="onlinePlayers.injectOnlinePlayers">Online Players</span>' +
		'</li><li>' +
		'<span class="fshLink" fn="lists.injectAuctionSearch">AH Quick Search</span>' +
		'</li></ul><h3>Extra</h3><ul><li>' +
		'<span class="fshLink" fn="insertQuickExtract">Quick Extract</span>' +
		'</li><li>' +
		'<span class="fshLink" fn="quickWear.insertQuickWear">Quick Wear</span>' +
		'</li><li>' +
		'<span class="fshLink" fn="injectFsBoxContent">FS Box Log</span>' +
		'</li></ul>' +
		'<h3>FSH developer quick links</h3>' +
		'<ul><li>' +
		'<span class="a-reply" target_player="PointyHair">PM</span> ' +
		'<a href="index.php?cmd=profile&player_id=1963510">PointyHair</a>' +
		'</li><li>' +
		'<span class="a-reply" target_player="yuuzhan">PM</span> ' +
		'<a href="index.php?cmd=profile&player_id=1599987">yuuzhan</a>' +
		'</li></ul>' +
		'</div>'

};

FSH.ajax = { // jQuery

	getMembrList: function(force) {
		var guildId = FSH.Layout.guildId();
		return FSH.ajax.guildMembers(force, guildId)
			.pipe(function(membrList) {
				FSH.Helper.membrList = membrList[guildId];
				return FSH.Helper.membrList;
			})
			.done(function(membrList) {
				FSH.ajax.getForage('fsh_membrList').done(function(oldMemList) {
					oldMemList = oldMemList || {};
					oldMemList[guildId] = membrList[guildId];
					FSH.ajax.setForage('fsh_membrList', oldMemList);
				});
			});
	},

	getAllMembrList: function(force, guildArray) {
		var prm = [];
		guildArray.forEach(function(guildId) {
			prm.push(FSH.ajax.guildMembers(force, guildId));
		});
		return $.when.apply($, prm)
			.pipe(function() {
				FSH.Helper.membrList = $.extend.apply(this, arguments);
				return FSH.Helper.membrList;
			})
			.done(function(membrList) {
				FSH.ajax.getForage('fsh_membrList').done(function(oldMemList) {
					oldMemList = oldMemList || {};
					FSH.ajax.setForage('fsh_membrList', $.extend(oldMemList, membrList));
				});
			});
	},

	guildMembers: function(force, guildId) {
		if (force) {return FSH.ajax.getGuildMembers(guildId);}
		return FSH.ajax.getForage('fsh_membrList').pipe(function(membrList) {
			if (!membrList ||
				!membrList[guildId] ||
				!membrList[guildId].lastUpdate ||
				membrList[guildId].lastUpdate < Date.now() - 300000) {
				return FSH.ajax.getGuildMembers(guildId);
			}
			return membrList;
		});
	},

	getGuildMembers: function(guildId) {
		return $.ajax({
			dataType: 'json',
			url:'index.php',
			data: {
				cmd: 'export',
				subcmd: 'guild_members',
				guild_id: guildId
			}
		}).pipe(function(data) {
				var membrList = {};
				membrList[guildId] = {};
				membrList[guildId].lastUpdate = Date.now();
				data.forEach(function(ele) {
					membrList[guildId][ele.username] = ele;
				});
				return membrList;
			});
	},

	inventory: function(force) {
		var dfr = FSH.ajax.inventoryCache(force);
		dfr.done(function(inv) {
			FSH.Helper.inventory = inv;
		});
		return dfr;
	},

	inventoryCache: function(force) {
		if (force) {
			return FSH.ajax.getInventory();
		}
		var prm = FSH.ajax.getForage(FSH.subcmd === 'guildinvmgr' ?
			'fsh_guildInv' : 'fsh_selfInv');
		return prm.pipe(function(data) {
			if (!data || data.lastUpdate < Date.now() - 300000) {
				return FSH.ajax.getInventory();
			}
			return data;
		});
	},

	getInventory: function() {
		var prm = $.ajax({
			dataType: 'json',
			url:'index.php?cmd=export&subcmd=' + (FSH.subcmd === 'guildinvmgr' ?
				'guild_store&inc_tagged=1' : 'inventory')
		});
		return prm.pipe(function(data) {
			data.lastUpdate = Date.now();
			FSH.ajax.setForage(FSH.subcmd === 'guildinvmgr' ? 'fsh_guildInv' :
				'fsh_selfInv', data);
			return data;
		});
	},

	myStats: function(force) {
		FSH.Helper.myUsername = $('dt#statbar-character').text();
		return FSH.ajax.getMyStats(force)
			.pipe(function(data) {
				FSH.Helper.profile = FSH.Helper.profile || {};
				FSH.Helper.profile[FSH.Helper.myUsername] = data;
				return data;
			});
	},

	getMyStats: function(force) {
		if (force) {return FSH.ajax.getMyProfile();}
		// jQuery 1.7 uses pipe instead of then
		return FSH.ajax.getForage('fsh_selfProfile')
			.pipe(function(data) {
				if (!data || data.lastUpdate < Date.now() -
					FSH.Helper.allyEnemyOnlineRefreshTime) {
					return FSH.ajax.getMyProfile();
				}
				return data;
			});
	},

	getMyProfile: function() {
		return FSH.ajax.getProfile(FSH.Helper.myUsername)
			.done(function(data) {
				FSH.ajax.setForage('fsh_selfProfile', data);
			});
	},

	getProfile: function(username) {
		return $.getJSON('index.php', {
			cmd:             'export',
			subcmd:          'profile',
			player_username: username
		}).pipe(function(data) {
			data.lastUpdate = Date.now();
			return data;
		});
	},

	setForage: function(forage, data) {
		// Wrap in jQuery Deferred because we're using 1.7
		// rather than using ES6 promise
		var dfr = $.Deferred();
		localforage.setItem(forage, data, function(err, data) {
			if (err) {
				console.log(forage + ' forage error', err);
				dfr.reject(err);
			} else {
				dfr.resolve(data);
			}
		});
		return dfr.promise();
	},

	getForage: function(forage) {
		// Wrap in jQuery Deferred because we're using 1.7
		// rather than using ES6 promise
		var dfr = $.Deferred();
		localforage.getItem(forage, function(err, data) {
			if (err) {
				console.log(forage + ' forage error', err);
				dfr.reject(err);
			} else {
				// returns null if key does not exist
				dfr.resolve(data);
			}
		});
		return dfr.promise();
	},

	equipItem: function(backpackInvId) {
		return $.ajax({
			url: 'index.php',
			data: {
				'cmd': 'profile',
				'subcmd': 'equipitem',
				'inventory_id': backpackInvId,
				'ajax': 1
			},
			dataType: 'json'
		}).done(function(data) {
				if (data.r === 1) {
					$('#dialog_msg').dialog({
						title: 'Information',
						buttons: [{ text: 'Ok', click: function(){$(this).dialog('close');} }]
					});
					$('#dialog_msg').html(data.m).dialog('open');
				}
			});
	},

};

FSH.composing = { // jQuery

	injectComposeAlert: function() { //jquery
		if (FSH.cmd === 'composing') {return;}
		var needToCompose = FSH.System.getValue('needToCompose');
		if (needToCompose) {
			FSH.composing.displayComposeMsg();
			return;
		}
		var lastComposeCheck = FSH.System.getValue('lastComposeCheck');
		if (lastComposeCheck && Date.now() < lastComposeCheck) {return;}
		$.get('index.php?cmd=composing', FSH.composing.parseComposing);
	},

	parseComposing: function(data) { //jquery
		var doc;
		if (FSH.cmd !== 'composing') {
			doc = data;
		} else {
			doc = document;
		}
		var openSlots = $('div.composing-potion-time:contains("ETA: Ready to ' +
			'Collect!"), div.composing-potion-time:contains("ETA: n/a")', doc);
		if (openSlots.length !== 0) {
			FSH.composing.displayComposeMsg();
			FSH.System.setValue('needToCompose', true);
		} else {
			var timeRE = /ETA:\s*(\d+)h\s*(\d+)m\s*(\d+)s/;
			var etas = $('div.composing-potion-time', doc);
			var eta = Infinity;
			etas.each(function() {
				var timeArr = timeRE.exec($(this).text());
				if (!timeArr) {return;}
				var milli = timeArr[1] * 3600000 + timeArr[2] * 60000 +
					timeArr[3] * 1000 + Date.now();
				eta = milli < eta ? milli : eta;
			});
			FSH.System.setValue('needToCompose', false);
			FSH.System.setValue('lastComposeCheck', eta);
		}
	},

	displayComposeMsg: function() { //jquery
		$('ul#notifications').prepend(FSH.Layout.composeMsg);
	},

	injectComposing: function() { //jquery
		if ($('div#pCC').length !== 1) {return;}
		if (FSH.Helper.enableComposingAlert) {
			FSH.composing.parseComposing();}

		$('input[id^=create-]').not('input#create-multi').each(function(i,e){
			$(e).after('<span id="helperQC-' + $(e).attr('id').slice(-1) +
				'" class="helperQC">&nbsp;[Quick Create]</span>');
		});

		$('div#pCC').on('click', 'span[id^="helperQC-"]', function() {
			var temp = $('select#composing-template-' +
				$(this).attr('id').slice(-1));
			if (temp.length === 1 && temp.val() !== 'none') {
				FSH.composing.createPotion(temp);
			}
		});
	},

	createPotion: function($template) { //jquery
		$.ajax({
			cache: false,
			dataType: 'json',
			url:'index.php',
			data: {
				cmd: 'composing',
				subcmd: 'createajax',
				template_id: $template.val(),
				_rnd: Math.floor(Math.random() * 8999999998) + 1000000000
			}
		}).done(function(data, textStatus) {
				if (data.error !== '') {
					$template.parent()
						.html('<div id="helperQCError" style="height: ' +
						'26px;">' + data.error + '</div>');
				} else {
					$template.parent()
						.html('<div id="helperQCSuccess" style="height: ' +
						'26px;">' + textStatus + '</div>');
				}
				if ($('select[id^="composing-template-"]').length === 0 &&
					$('div#helperQCError').length === 0) {
					location.href = 'index.php?cmd=composing';
				}
			});
	}

};

FSH.notification = { // jQuery

	injectTempleAlert: function() { //jquery
		//Checks to see if the temple is open for business.
		if (FSH.cmd === 'temple') {return;}
		var templeAlertLastUpdate = FSH.System.getValue('lastTempleCheck');
		var needToPray = FSH.System.getValue('needToPray');
		var needToParse = false;
		if (templeAlertLastUpdate) {
			if (Date.now() > templeAlertLastUpdate) { // midnight
				needToParse = true;
			} else if (needToPray) {
				FSH.notification.displayDisconnectedFromGodsMessage();
			}
		} else {
			needToParse = true;
		}
		if (needToParse) {
			$.get('index.php?cmd=temple', FSH.notification.parseTemplePage);
		}
	},

	parseTemplePage: function(responseText) { //native
		var checkNeedToPray, doc;
		if (!FSH.Helper.enableTempleAlert) {return;}
		if (FSH.cmd !== 'temple') {
			doc = FSH.System.createDocument(responseText);
		} else {
			doc = document;
		}
		checkNeedToPray = doc.querySelector('input[value="Pray to Osverin"]');
		var needToPray = false;
		if (checkNeedToPray) {
			FSH.notification.displayDisconnectedFromGodsMessage();
			needToPray = true;
		}
		FSH.System.setValue('needToPray', needToPray);
		FSH.System.setValue('lastTempleCheck', new Date()
			.setUTCHours(23, 59, 59, 999) + 1); // midnight
	},

	displayDisconnectedFromGodsMessage: function() { //jquery
		$('ul#notifications').prepend(FSH.Layout.godsNotification);
		$('#helperPrayToGods').on('click', 'img', function() {
			var index = $(this).attr('src').replace(/\D/g, '');
			$('#helperPrayToGods').off('click', 'img');
			$.post(
				FSH.System.server + 'index.php',
				'cmd=temple&subcmd=pray&type=' + index,
				function() {
					$('#helperPrayToGods').html('<span class="notification-' +
						'icon"></span><p class="notification-content">You ' +
						'are currently praying at the temple.</p>');
					FSH.System.setValue('needToPray',false);
					FSH.System.setValue('lastTempleCheck', new Date()
						.setUTCHours(23, 59, 59, 999) + 1); // Midnight
					// location.href = 'index.php?cmd=temple'
				}
			);
		});
	},

	injectUpgradeAlert: function() { //jquery
		if (location.search.search('cmd=points&type=1') !== -1) {return;}
		var needToDoUpgrade = FSH.System.getValue('needToDoUpgrade');
		if (needToDoUpgrade) {
			FSH.notification.displayUpgradeMsg();
			return;
		}
		var lastUpgradeCheck = FSH.System.getValue('lastUpgradeCheck');
		if (lastUpgradeCheck && Date.now() < lastUpgradeCheck) {return;}
		$.get('index.php?cmd=points&type=1',
			FSH.notification.parseGoldUpgrades);
	},

	parseGoldUpgrades: function(data) { //jquery
		if (!FSH.Helper.enableUpgradeAlert) {return;}
		var doc;
		if (location.search.search('cmd=points&type=1') === -1) {
			doc = data;
		} else {
			doc = document;
			$('div#pCC input[name="upgrade_id"][value="1"]', doc).parent()
				.find('input[name="quantity"]').val('10');
		}
		var limit = $('tr:contains("+1 Maximum Stamina") > td:eq(2)', doc);
		var checkDoneUpgrade = limit.text().split(' / ');
		if (checkDoneUpgrade[0] !== checkDoneUpgrade[1]) {
			FSH.notification.displayUpgradeMsg();
			FSH.System.setValue('needToDoUpgrade', true);
		} else {
			FSH.System.setValue('needToDoUpgrade', false);
			FSH.System.setValue('lastUpgradeCheck',
				Date.parse(limit.next().text() + ' GMT'));
		}
	},

	displayUpgradeMsg: function() { //jquery
		$('ul#notifications').prepend(FSH.Layout.goldUpgradeMsg);
	},

	injectJoinAllLink: function() { // jQuery
		var groupJoinHTML = '';
		if (!FSH.System.getValue('enableMaxGroupSizeToJoin')) {
			groupJoinHTML = '<a href="index.php?cmd=guild&subcmd=groups&subcmd2=joinall"><span class="notification-icon"></span>'+
				'<p class="notification-content">Join all attack groups.</p></a>';
		} else {
			var maxGroupSizeToJoin = FSH.System.getValue('maxGroupSizeToJoin');
			groupJoinHTML = ' <a href="index.php?cmd=guild&subcmd=groups&subcmd2=joinallgroupsundersize"><span class="notification-icon"></span>'+
				'<p class="notification-content">Join all attack groups less than size ' + maxGroupSizeToJoin + '.</p></a>';
		}
		$('li:contains("New attack group created.")').after('<li class="notification">' + groupJoinHTML + '</li>');
	},

};

FSH.guildReport = { // Legacy

	injectReportPaint: function() { // jQuery
		FSH.ajax.getMembrList(false)
			.done(FSH.guildReport.doReportPaint);
	},

	reportHeader: function(innerTable) { // jQuery
		$('td[bgcolor="#DAA534"][colspan="2"] b', innerTable).each(function() {
			var self = $(this);
			self.html(
				FSH.Layout.onlineDot({
					last_login: FSH.Helper.membrList[self.text()].last_login
				}) +
				'<a href="index.php?cmd=profile&player_id=' +
				FSH.Helper.membrList[self.text()].id + '">' + self.html() +
				'</a> [ <span class="a-reply fshLink" target_player=' +
				self.text() + '>m</span> ]'
			);
		});
	},

	doReportPaint: function() { // jQuery
		var container = $('div#pCC > table > tbody > tr > td').last();
		var innerTable = $('table', container).detach();
		var rows = $('tr', innerTable);

		var searchUser = FSH.System.getUrlParameter('user');
		if (searchUser) {
			var userNode = $('b:contains("' + searchUser + '")', innerTable);
			if (userNode.length > 0) {
				userNode.closest('tr').prevAll().remove();
				$('a[href*="_id=' + FSH.Helper.membrList[searchUser].id + '&"]',
					innerTable).last().closest('tr').nextAll().remove();
			}
		}

		var searchSet = FSH.System.getUrlParameter('set');
		if (searchSet) {
			var setRE = new RegExp(searchSet);
			rows.filter(function() {
				var tds = $('td', this);
				return tds.length !== 2 && !setRE.test(tds.eq(1).text());
			}).remove();
		}

		FSH.guildReport.reportHeader(innerTable);
		FSH.guildReport.reportChild(innerTable);

		innerTable.on('click', 'span.a-reply', function(evt) {
			window.openQuickMsgDialog(
				evt.target.getAttribute('target_player'));
		});
		innerTable.on('click', '.recall', FSH.guildReport.recallItem);
		innerTable.on('click', '.wear', FSH.guildReport.recallItemNWear);
		innerTable.on('click', '.equip',
			FSH.common.equipProfileInventoryItem);

		container.append(innerTable);
	},

	reportChild: function(innerTable) { // jQuery
		var wearRE = new RegExp('<b>|Bottle|Brew|Draft|Elixir|Potion' +
			'|Jagua Egg');
		$('td:contains("Recall to:")', innerTable).each(function() {
			var self = $(this);
			var atd = $('a', self);
			var firstA = atd.first();
			var firstHref = firstA.attr('href');
			var firstOldTitle = firstA.attr('oldtitle');
			var firstText = firstA.text();
			var secondHref = atd.length === 2 ? atd.eq(1).attr('href') : null;
			var output = FSH.Layout.reportLinks;
			output = output.replace(/@@firstHref@@/g, firstHref);
			output = output.replace(/@@firstOldTitle@@/g, firstOldTitle);
			output = output.replace(/@@firstText@@/g, firstText);
			output = output.replace(/@@fasttext@@/g, firstText === 'Backpack' ?
				'BP' : 'GS');
			if (secondHref) {
				output = output.replace(/fshHide/g, 'fshInline');
				output = output.replace(/@@secondHref@@/g, secondHref);
			}

			var itemName = self.prev().html();
			if (!wearRE.test(itemName)) {
				output = output.replace(/fshWearHide/g, 'fshInline');
				output = output.replace(/@@linktype@@/g, secondHref ?
					'wear" href="' + firstHref :
					'equip" itemid="' + /&id=(\d+)/.exec(firstHref)[1]);
			}
			self.html(output);
		});
	},

	recallItem: function(evt) { // Legacy
		var href=evt.target.getAttribute('href');
		FSH.System.xmlhttp(href, FSH.guildReport.recallItemReturnMessage, {'target': evt.target, 'url': href});
	},

	recallItemReturnMessage: function(responseText, callback) { // Legacy
		var target = callback.target;
		var info = FSH.Layout.infoBox(responseText);
		var itemCellElement = target.parentNode;
		if (info.search('You successfully recalled the item') !== -1) {
			itemCellElement.innerHTML = '<span style="color:green; font-weight:bold;">' + info + '</span>';
		} else if (info!=='') {
			itemCellElement.innerHTML = '<span style="color:red; font-weight:bold;">' + info + '</span>';
		} else {
			itemCellElement.innerHTML = '<span style="color:red; font-weight:bold;">Weird Error: check the Tools>Error Console</span>';
			console.log('Post the previous HTML and the following message to the GitHub or to the forum to help us debug this error');
			console.log(callback.url);
		}
	},

	recallItemNWear: function(evt) { // Legacy
		var href=evt.target.getAttribute('href');
		FSH.System.xmlhttp(href, FSH.guildReport.recallItemNWearReturnMessage, {'target': evt.target, 'url': href});
	},

	recallItemNWearReturnMessage: function(responseText, callback) { // Legacy
		var target = callback.target;
		var info = FSH.Layout.infoBox(responseText);
		var itemCellElement = target.parentNode;
		if (info.search('You successfully') !== -1) {
			itemCellElement.innerHTML = '<span style="color:green; font-weight:bold;">Taken</span>';
			FSH.System.xmlhttp(FSH.System.server+'?cmd=trade', FSH.guildReport.wearRecall, itemCellElement);
		} else if (info!=='') {
			itemCellElement.innerHTML = '<span style="color:red; font-weight:bold;">Error</span>';
		}
	},

	wearRecall: function(responseText, callback) { // Legacy
		var doc=FSH.System.createDocument(responseText);
		var items=FSH.System.findNodes('//input[@name="sendItemList[]"]',doc);
		if (items) {
			var itemId=items[items.length-1].getAttribute('value');
			FSH.System.xmlhttp(FSH.System.server +
				'?cmd=profile&subcmd=equipitem&inventory_id=' + itemId +
				'&folder_id=0&backpack_page=0',
				function(responseText) {
					var info = FSH.Layout.infoBox(responseText);
					if (info==='') {
						callback.innerHTML += '<br><span style="color:green; ' +
							'font-weight:bold;">Worn</span>';
					} else {
						callback.innerHTML += '<br><span style="color:red; ' +
							'font-weight:bold;">' + info + '</span>';
					}
				}
			);
		}
	},

};

FSH.guildAdvisor = { // jQuery

	injectAdvisor: function() { // Native
		FSH.Helper.appendHead({
			js: [FSH.dataTablesLoc],
			callback: FSH.guildAdvisor.dataTablesLoaded
		});
	},

	dataTablesLoaded: function() { // jQuery
		FSH.ajax.getMembrList(false)
			.done(
				FSH.subcmd2 === 'weekly' ?
					FSH.guildAdvisor.injectAdvisorWeekly :
					FSH.guildAdvisor.injectAdvisorNew
			);
	},

	injectAdvisorNew: function(m) { // jQuery
		var list = $('#pCC table[cellpadding="1"]');
		if (list.length !== 1) {return;}

		// insert weekly summary link
		var injectHere = FSH.System.findNode('//td/select/..');
		if (injectHere) {
			var elem = document.createElement('span');
			elem.innerHTML=' <a href="index.php?cmd=guild&subcmd=advisor&' +
				'subcmd2=weekly">7-Day Summary</a>';
			injectHere.appendChild(elem);
		}

		list.attr('id', 'advisorTable');
		list.addClass('stripe hover');
		list.append('<tfoot id="advTFoot"></tfoot>');
		$('tfoot', list).append($('tr', list).last());
		$('tr', list).first().remove();
		$('#advTFoot td').first().removeAttr('class').attr('colspan', 3)
			.attr('style', 'text-align: right;');
		$('#advisorTable td').removeAttr('bgcolor');
		$('#advisorTable font').contents().unwrap();
		$('#advTFoot b').contents().unwrap();
		$('#advisorTable tbody tr').each(function(i, e) {
			var td1 = $('td', e).first();
			td1.html(td1.html().replace('&nbsp;', ''));
			td1.html('<a href="index.php?cmd=profile&player_id=' +
				m[td1.text()].id + '">' +
				td1.text() + '</a>');
			td1.after('<td>' + m[td1.text()].level + '</td><td>' +
				m[td1.text()].rank_name.substr(0,9) +
				(m[td1.text()].rank_name.length > 9 ? '...' : '') + '</td>');
		});
		list.dataTable({pageLength: 25,
			lengthMenu: [[25, 50, -1], [25, 50, 'All']],
			columns: FSH.Layout.advisorColumns
		});
	},

	injectAdvisorWeekly: function(m) { // jQuery
		var list = $('#pCC table[cellpadding="1"]');
		if (list.length !== 1) {return;}
		list.html('<img src = "' + FSH.System.imageServer +
			'/world/actionLoadingSpinner.gif" style = "float: left;">' +
			'&nbsp;Retrieving daily data ...');
		FSH.guildAdvisor.getAdvisorPages(list, m);
	},

	getAdvisorPages: function(list, m) { // jQuery
		var count = 0;
		var pages = [1, 2, 3, 4, 5, 6, 7];
		var advisorPages = [];
		pages.forEach(function(e) {
			$.ajax({
				url: 'index.php',
				data: {
					cmd: 'guild',
					subcmd: 'advisor',
					period: e
				}
			}).done(function(data) {
					list.append(' day ' + e + ',');
					var ob = {};
					var tr = $('tr',
						$('#pCC table[cellpadding="1"]',
						FSH.System.createDocument(data)));
					tr.each(function(i, el) {
						var tds = $('td', el);
						var member = $(tds.eq(0).html().replace(/&nbsp;/g, ''))
							.text();
						if (member !== 'Member') {
							ob[member] = {
								deposit: FSH.System.intValue(tds.eq(1).text()),
								tax:     FSH.System.intValue(tds.eq(2).text()),
								total:   FSH.System.intValue(tds.eq(3).text()),
								fsp:     FSH.System.intValue(tds.eq(4).text()),
								skills:  FSH.System.intValue(tds.eq(5).text()),
								grpCrt:  FSH.System.intValue(tds.eq(6).text()),
								grpJoin: FSH.System.intValue(tds.eq(7).text()),
								relics:  FSH.System.intValue(tds.eq(8).text()),
								contrib: FSH.System.intValue(tds.eq(9).text())
							};
						}
					});
					advisorPages[e-1] = ob;
					count += 1; // .when
					if (count === 7) {
						FSH.guildAdvisor.addAdvisorPages(list, advisorPages, m);
					}
				});
		});
	},

	addAdvisorPages: function(list, pages, m) { // Native
		var o = {};
		var data = [];
		pages.forEach(function(e) {
			// What are non-enumerable properties anyway?
			Object.getOwnPropertyNames(e).forEach(function(f) {
				o[f] = o[f] || {};
				o[f].deposit = (o[f].deposit || 0) + e[f].deposit;
				o[f].tax = (o[f].tax || 0) + e[f].tax;
				o[f].total = (o[f].total || 0) + e[f].total;
				o[f].fsp = (o[f].fsp || 0) + e[f].fsp;
				o[f].skills = (o[f].skills || 0) + e[f].skills;
				o[f].grpCrt = (o[f].grpCrt || 0) + e[f].grpCrt;
				o[f].grpJoin = (o[f].grpJoin || 0) + e[f].grpJoin;
				o[f].relics = (o[f].relics || 0) + e[f].relics;
				o[f].contrib = (o[f].contrib || 0) + e[f].contrib;
			});
		});
		Object.getOwnPropertyNames(o).forEach(function(f) {
			if (f !== 'Total:') {
				data.push([
					!m[f] ? f : '<a href="index.php?cmd=profile&player_id=' + m[f].id + '">' + f + '</a>',
					!m[f] ? '' : m[f].level,
					!m[f] ? '' : m[f].rank_name.substr(0,9) + (m[f].rank_name.length > 9 ? '...' : ''),
					FSH.System.addCommas(o[f].deposit),
					FSH.System.addCommas(o[f].tax),
					FSH.System.addCommas(o[f].total),
					FSH.System.addCommas(o[f].fsp),
					FSH.System.addCommas(o[f].skills),
					FSH.System.addCommas(o[f].grpCrt),
					FSH.System.addCommas(o[f].grpJoin),
					FSH.System.addCommas(o[f].relics),
					FSH.System.addCommas(o[f].contrib),
				]);
			}
		});
		FSH.guildAdvisor.displayAdvisor(list, o, data);
	},

	displayAdvisor: function(list, o, data) { // jQuery
		$(list).addClass('stripe hover');
		$(list).html('<tfoot id="advTFoot"><tr><td style="text-align: ' +
			'right;" colspan="3">Total: </td><td><u>' +
			FSH.System.addCommas(o['Total:'].deposit) + '</u></td><td><u>' +
			FSH.System.addCommas(o['Total:'].tax) + '</u></td><td><u>' +
			FSH.System.addCommas(o['Total:'].total) + '</u></td><td><u>' +
			FSH.System.addCommas(o['Total:'].fsp) + '</u></td><td><u>' +
			FSH.System.addCommas(o['Total:'].skills) + '</u></td><td><u>' +
			FSH.System.addCommas(o['Total:'].grpCrt) + '</u></td><td><u>' +
			FSH.System.addCommas(o['Total:'].grpJoin) + '</u></td><td><u>' +
			FSH.System.addCommas(o['Total:'].relics) + '</u></td><td><u>' +
			FSH.System.addCommas(o['Total:'].contrib) + '</u></td></tr></tfoot>');
		$(list).dataTable({
			data: data,
			pageLength: 25,
			lengthMenu: [[25, 50, -1], [25, 50, 'All']],
			columns: FSH.Layout.advisorColumns
		});
	}

};

FSH.bazaar = { // jQuery

	inject: function() { // jQuery
		var pbImg = $('div#pCC img[alt="Potion Bazaar"]');
		pbImg.css('float', 'left');
		var myTable = FSH.Layout.bazaarTable;
		$('div#pCC table table table img[src*="/items/"]').each(function(i) {
			var item = $(this);
			var tipped = item.data('tipped');
			myTable = myTable
				.replace('@' + i + '@', FSH.Layout.bazaarItem)
				.replace('@src@', item.attr('src'))
				.replace('@itemid@', tipped.match(/\?item_id=(\d+)/)[1])
				.replace('@tipped@', tipped);
		});
		myTable = $(myTable.replace(/@\d@/g, ''));
		$('span#warning', myTable).hide();
		myTable.on('click', 'img[width="20"]', FSH.bazaar.select);
		myTable.on('input', 'input#buy_amount', FSH.bazaar.quantity);
		myTable.on('click', 'span#fshBuy', FSH.bazaar.buy);
		pbImg.parent().append(myTable);
	},

	select: function(evt) { // jQuery
		var target = $(evt.target);
		FSH.bazaar.ItemId = target.attr('itemid');
		$('table#fshBazaar span#quantity').text(
			$('table#fshBazaar input#buy_amount').val());
		$('table#fshBazaar span#warning').show();
		$('table#fshBazaar td#selectedItem').empty().append(
			target.clone().attr('width', '45').attr('height', '45'));
	},

	quantity: function(evt) { // mixed
		var theValue = parseInt(evt.target.value, 10);
		if (!isNaN(theValue) && theValue > 0 && theValue < 100) {
			$('table#fshBazaar span#quantity:visible').text(theValue);
		}
	},

	buy: function() { // jQuery
		if (!FSH.bazaar.ItemId) {return;}
		var buyAmount = $('table#fshBazaar input#buy_amount').val();
		$('table#fshBazaar td#buy_result')
			.html('Buying ' + buyAmount + ' items');
		for (var i = 0; i < buyAmount; i += 1) {
			$.get('index.php?cmd=potionbazaar&subcmd=buyitem&item_id=' +
				FSH.bazaar.ItemId, FSH.bazaar.done);
		}
	},

	done: function(responseText) { // jQuery
		$('table#fshBazaar td#buy_result')
			.append('<br>' + FSH.Layout.infoBox(responseText));
	}

};

FSH.groups = { // Legacy

	injectGroupStats: function() { // jQuery
		var attackValueElement = $('div#pCC td#stat-attack');
		attackValueElement.html(
			'<span class="fshBlue">' + attackValueElement.text() + '</span>' +
			' ( <span id="fshAtk">' + attackValueElement.text() + '</span> )'
		);
		var defenseValueElement = $('div#pCC td#stat-defense');
		defenseValueElement.html(
			'<span class="fshBlue">' + defenseValueElement.text() + '</span>' +
			' ( <span id="fshDef">' + defenseValueElement.text() + '</span> )'
		);
		var armorValueElement = $('div#pCC td#stat-armor');
		armorValueElement.html(
			'<span class="fshBlue">' + armorValueElement.text() + '</span>' +
			' ( <span id="fshArm">' + armorValueElement.text() + '</span> )'
		);
		var damageValueElement = $('div#pCC td#stat-damage');
		damageValueElement.html(
			'<span class="fshBlue">' + damageValueElement.text() + '</span>' +
			' ( <span id="fshDam">' + damageValueElement.text() + '</span> )'
		);
		var hpValueElement = $('div#pCC td#stat-hp');
		hpValueElement.html(
			'<span class="fshBlue">' + hpValueElement.text() + '</span>' +
			' ( <span id="fshHP">' + hpValueElement.text() + '</span> )'
		);
		FSH.System.xmlhttp('index.php?cmd=guild&subcmd=mercs', FSH.groups.parseMercStats);
	},

	parseMercStats: function(responseText) { // jQuery
		var attackRE = /<td>Attack:<\/td><td>(\d+)<\/td>/;
		var defenseRE = /<td>Defense:<\/td><td>(\d+)<\/td>/;
		var armorRE = /<td>Armor:<\/td><td>(\d+)<\/td>/;
		var damageRE = /<td>Damage:<\/td><td>(\d+)<\/td>/;
		var hpRE = /<td>HP:<\/td><td>(\d+)<\/td>/;
		var mercPage = FSH.System.createDocument(responseText);
		var mercElements = $('div#pCC img[src*="/merc/"][data-tipped]',
			mercPage);
		var totalMercAttack = 0;
		var totalMercDefense = 0;
		var totalMercArmor = 0;
		var totalMercDamage = 0;
		var totalMercHP = 0;
		var merc;
		for (var i = 0; i < mercElements.length; i += 1) {
			merc = mercElements[i];
			var mouseoverText = $(merc).data('tipped');
			var mercAttackValue = attackRE.exec(mouseoverText)[1] * 1;
			totalMercAttack += mercAttackValue;
			var mercDefenseValue = defenseRE.exec(mouseoverText)[1] * 1;
			totalMercDefense += mercDefenseValue;
			var mercArmorValue = armorRE.exec(mouseoverText)[1] * 1;
			totalMercArmor += mercArmorValue;
			var mercDamageValue = damageRE.exec(mouseoverText)[1] * 1;
			totalMercDamage += mercDamageValue;
			var mercHPValue = hpRE.exec(mouseoverText)[1] * 1;
			totalMercHP += mercHPValue;
		}
		var attackValue = $('div#pCC span#fshAtk');
		attackValue.html(FSH.System.addCommas(FSH.System.intValue(
			attackValue.text()) - Math.round(totalMercAttack * 0.2)));
		var defenseValue = $('div#pCC span#fshDef');
		defenseValue.html(FSH.System.addCommas(FSH.System.intValue(
			defenseValue.text()) - Math.round(totalMercDefense * 0.2)));
		var armorValue = $('div#pCC span#fshArm');
		armorValue.html(FSH.System.addCommas(FSH.System.intValue(
			armorValue.text()) - Math.round(totalMercArmor * 0.2)));
		var damageValue = $('div#pCC span#fshDam');
		damageValue.html(FSH.System.addCommas(FSH.System.intValue(
			damageValue.text()) - Math.round(totalMercDamage * 0.2)));
		var hpValue = $('div#pCC span#fshHP');
		hpValue.html(FSH.System.addCommas(FSH.System.intValue(
			hpValue.text()) - Math.round(totalMercHP * 0.2)));
	},

	injectGroups: function() { // jQuery
		FSH.ajax.getMembrList(false)
			.done(FSH.groups.doGroupPaint);
		FSH.groups.displayMinGroupLevel();
		FSH.groups.groupButtons();
	},

	doGroupPaint: function(m) { // jQuery
		$('#pCC table table table tr').has('.group-action-container')
			.each(function(i, e) {
				FSH.groups.doGroupRow(e, m);
			});
	},

	doGroupRow: function(e, m) { // jQuery
		var creator = $('b', e).text();
		var td = $('td', e).first();
		var inject = '';
		if (m[creator]) {
			inject += FSH.Layout.onlineDot({last_login: m[creator].last_login}) +
				'&nbsp;<a href="' + FSH.System.server +
				'index.php?cmd=profile&player_id=' + m[creator].id + '">' + td.html() +
				'</a>' + ' [' + m[creator].level + ']';
		}
		var td2 = $('td', e).eq(1);
		var theList = td2.html();
		var listArr = theList.split(', ');
		if (listArr.length > 1) {
			listArr.sort(function(a, b) {
				return (m[b] ? m[b].level : 0) - (m[a] ? m[a].level : 0);
			});
		}
		var countMembers = 0;
		var buffList = [];
		listArr.forEach(function(v, i, a) {
			if (v.indexOf('<font') !== -1) {return;}
			countMembers += 1;
			buffList[Math.floor(i / 16)] = buffList[Math.floor(i / 16)] || [];
			buffList[Math.floor(i / 16)].push(v);
			if (!m[v]) {return;}
			a[i] = ' <a href="index.php?cmd=profile&player_id=' +
				m[v].id + '">' + v + '</a>';
		});
		buffList.forEach(function(v, i) {
			inject += '<br><a href=\'' + FSH.Layout.buffAllHref(v) +
				'\'><span style="color:blue; font-size:x-small;" title="Quick ' +
				'buff functionality from HCS only does 16">Buff ' +
				FSH.Layout.places[i] + ' 16</span></a>';
		});
		td.html(inject + '<br><span style="font-size:x-small;">Members: ' +
			countMembers + '</span>');
		td2.html('<span>' + listArr.join(', ') + '</span>');
		FSH.groups.groupLocalTime($('td', e).eq(2));
	},

	groupLocalTime: function(theDateCell) { // jQuery
		var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
			'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		var xRE = /([a-zA-Z]+), (\d+) ([a-zA-Z]+) (\d+):(\d+):(\d+) UTC/;
		var x = xRE.exec(theDateCell.text());
		var month = months.indexOf(x[3]);
		var curYear = new Date().getFullYear(); // Boundary condition
		var groupDate = new Date();
		groupDate.setUTCDate(x[2]);
		groupDate.setUTCMonth(month);
		groupDate.setUTCFullYear(curYear);
		groupDate.setUTCHours(x[4]);
		groupDate.setUTCMinutes(x[5]);
		theDateCell.append('<br><span style="color:blue; font-size:x-small">' +
			'Local: ' + groupDate.toString().substr(0,21)+'</span>');
	},

	displayMinGroupLevel: function() { // jQuery
		var minGroupLevel = FSH.System.getValue('minGroupLevel');
		if (minGroupLevel) {
			$('#pCC > table > tbody > tr > td > table td').first()
				.append('<span style="color:blue"> ' +
				'Current Min Level Setting: ' + minGroupLevel + '</span>');
		}
	},

	groupButtons: function() {
		var buttonElement = FSH.System.findNode('//td[input[@value="Join All ' +
			'Available Groups"]]');
		var enableMaxGroupSizeToJoin =
			FSH.System.getValue('enableMaxGroupSizeToJoin');
		if (enableMaxGroupSizeToJoin) {
			var maxGroupSizeToJoin = FSH.System.getValue('maxGroupSizeToJoin');
			var joinAllInput = buttonElement.firstChild.nextSibling.nextSibling;
			joinAllInput.style.display = 'none';
			joinAllInput.style.visibility = 'hidden';
			buttonElement.innerHTML += '&nbsp;<input id="joinallgroupsunder' +
				'size" type="button" value="Join All Groups < ' +
				maxGroupSizeToJoin + ' Members" class="custombutton">&nbsp;' +
				'<input id="fetchgroupstats" type="button" value="Fetch ' +
				'Group Stats" class="custombutton">';
			document.getElementById('joinallgroupsundersize')
				.addEventListener('click', FSH.groups.joinAllGroupsUnderSize, true);
		} else {
			buttonElement.innerHTML += '&nbsp;<input id="fetchgroupstats" ' +
				'type="button" value="Fetch Group Stats" class="custombutton">';
		}
		document.getElementById('fetchgroupstats')
			.addEventListener('click', FSH.groups.fetchGroupData, true);

		//~ var re=/subcmd2=([a-z]+)/;
		//~ var subPage2IdRE = re.exec(document.location.search);
		//~ if (subPage2IdRE && subPage2IdRE[1] === 'joinallgroupsundersize') {
		if (FSH.subcmd2 === 'joinallgroupsundersize') {
			FSH.groups.joinAllGroupsUnderSize();
		}
	},

	filterMercs: function(e) {return e.search('#000099') === -1;},

	joinGroup: function(groupJoinURL, joinButton) {
		$.ajax({
			url: FSH.System.server + groupJoinURL,
			success: function() {
				joinButton.style.display = 'none';
				joinButton.style.visibility = 'hidden';
			}
		});
	},

	joinAllGroupsUnderSize: function() {
		var joinButtons = FSH.System.findNodes('//img[contains(@src,"skin/icon_action_join.gif")]');
		if (!joinButtons) {return;}
		for (var i=0; i<joinButtons.length; i += 1) {
			var joinButton = joinButtons[i];
			var memList = joinButton.parentNode.parentNode.parentNode.previousSibling.previousSibling.previousSibling.previousSibling;
			var memListArrayWithMercs = memList.innerHTML.split(',');
			var memListArrayWithoutMercs = memListArrayWithMercs.filter(FSH.groups.filterMercs);
			if (memListArrayWithoutMercs.length < FSH.System.getValue('maxGroupSizeToJoin')){
				var groupID = /javascript:confirmJoin\((\d+)\)/.exec(joinButton.parentNode.getAttribute('href'))[1];
				var groupJoinURL = 'index.php?cmd=guild&subcmd=groups&subcmd2=join&group_id=' + groupID;
				FSH.groups.joinGroup(groupJoinURL, joinButton);
			}
		}
		//refresh after a slight delay
		setTimeout('location.href = "' + FSH.System.server +
			'index.php?cmd=guild&subcmd=groups";',1250);
	},

	fetchGroupData: function() {
		var calcButton = FSH.System.findNode('//input[@id="fetchgroupstats"]');
		calcButton.style.display = 'none';
		var allItems = FSH.System.findNodes('//a[contains(@href,"index.php?cmd=guild&subcmd=groups&subcmd2=viewstats&group_id=")]/img');
		for (var i=0; i<allItems.length; i += 1) {
			FSH.System.xmlhttp(allItems[i].parentNode.getAttribute('href'), FSH.groups.parseGroupData, allItems[i].parentNode);
		}
	},

	parseGroupData: function(responseText, linkElement) {
		var attackValue;
		var defenseValue;
		var armorValue;
		var damageValue;
		var hpValue;
		var doc=FSH.System.createDocument(responseText);
		var allItems = doc.getElementsByTagName('TD');
		//<td><font color='#333333'>Attack:&nbsp;</font></td>

		for (var i=0;i<allItems.length;i += 1) {
			var anItem=allItems[i];
			if (anItem.innerHTML === '<font color="#333333">Attack:&nbsp;</font>'){
				var attackLocation = anItem.nextSibling;
				attackValue = attackLocation.textContent;
			}
			if (anItem.innerHTML === '<font color="#333333">Defense:&nbsp;</font>'){
				var defenseLocation = anItem.nextSibling;
				defenseValue = defenseLocation.textContent;
			}
			if (anItem.innerHTML === '<font color="#333333">Armor:&nbsp;</font>'){
				var armorLocation = anItem.nextSibling;
				armorValue = armorLocation.textContent;
			}
			if (anItem.innerHTML === '<font color="#333333">Damage:&nbsp;</font>'){
				var damageLocation = anItem.nextSibling;
				damageValue = damageLocation.textContent;
			}
			if (anItem.innerHTML === '<font color="#333333">HP:&nbsp;</font>'){
				var hpLocation = anItem.nextSibling;
				hpValue = hpLocation.textContent;
			}
		}
		var extraText = '<table cellpadding="1" style="font-size:x-small; border-top:2px black solid; border-spacing: 1px; border-collapse: collapse;">';
		extraText += '<tr>';
		extraText += '<td style="color:brown;">Attack</td><td align="right">' + attackValue + '</td>';
		extraText += '<td style="color:brown;">Defense</td><td align="right">' + defenseValue + '</td></tr>';
		extraText += '<tr>';
		extraText += '<td style="color:brown;">Armor</td><td align="right">' + armorValue + '</td>';
		extraText += '<td style="color:brown;">Damage</td><td align="right">' + damageValue + '</td></tr>';
		extraText += '<tr>';
		extraText += '<td style="color:brown;">HP</td><td align="right">' + hpValue + '</td>';
		extraText += '<td colspan="2"></td></tr>';
		extraText += '</table>';
		var expiresLocation = linkElement.parentNode.parentNode.previousSibling.previousSibling;
		expiresLocation.innerHTML += extraText;
	}

};

FSH.rank = { // Legacy

	injectGuildRanks: function() { // jQuery
		FSH.ajax.getMembrList(true)
			.done(FSH.rank.doRankPaint);
		// gather rank info button
		var weightButton = $('<input>', {
			id: 'getrankweightings',
			type: 'button',
			value: 'Get Rank Weightings',
			'class': 'custombutton'
		});
		weightButton.click(FSH.rank.fetchRankData);
		$('div#pCC td').has('a#show-guild-founder-rank-name')
			.append('&nbsp;')
			.append(weightButton);
	},

	doRankPaint: function() { // jQuery
		var theTable = $('div#pCC table table').has('td.line[width="80%"]')[0];
		var myRank = FSH.Helper.membrList[$('dt#statbar-character')
			.text()].rank_name;
		var ranks = {};
		Object.keys(FSH.Helper.membrList).forEach(function(val) {
			if (val === 'lastUpdate') {return;}
			var rankName = FSH.Helper.membrList[val].rank_name;
			ranks[rankName] = ranks[rankName] || [];
			ranks[rankName].push(val);
		});
		$('tr', theTable).each(function(ind) {
			var rankCell = $('td.line[width="80%"]', $(this));
			if (rankCell.length === 0) {return;} // header
			var rankName = rankCell.text();
			if (ranks[rankName]) { // has members
				if (rankName === myRank) {
					FSH.rank.characterRow = ind; // limit for ajaxify later
				}
				rankCell.append(' <span style="color:blue;">- ' +
					ranks[rankName].join(', ') + '</span>');
			}
		});
		if (FSH.System.getValue('ajaxifyRankControls')) {
			FSH.rank.ajaxifyRankControls();
		}
	},

	ajaxifyRankControls: function() {
		var i;
		var upButton;
		var onclickText;
		var onclickHREF;
		var downButton;
		//up buttons
		var upButtons = FSH.System.findNodes('//input[@value="Up"]');
		for (i=0;i<upButtons.length;i += 1) {
			upButton = upButtons[i];
			onclickText = upButton.getAttribute('onclick');
			onclickHREF = /window.location=\'(.*)\';/.exec(onclickText)[1];
			upButton.setAttribute('onclickhref', onclickHREF);
			upButton.setAttribute('onclick', '');
			upButton.addEventListener('click', FSH.rank.moveRankUpOneSlotOnScreen, true);
		}
		//down buttons
		var downButtons = FSH.System.findNodes('//input[@value="Down"]');
		for (i=0;i<downButtons.length;i += 1) {
			downButton = downButtons[i];
			onclickText = downButton.getAttribute('onclick');
			onclickHREF = /window.location=\'(.*)\';/.exec(onclickText)[1];
			downButton.setAttribute('onclickhref', onclickHREF);
			downButton.setAttribute('onclick', '');
			downButton.addEventListener('click', FSH.rank.moveRankDownOneSlotOnScreen, true);
		}
	},

	moveRankUpOneSlotOnScreen: function(evt) {
		var onclickHREF = evt.target.getAttribute('onclickhref');
		var thisRankRow = evt.target.parentNode.parentNode.parentNode;
		var parentTable = thisRankRow.parentNode;
		var thisRankRowNum = thisRankRow.rowIndex;
		var previousRankRowNum = parseInt(thisRankRowNum, 10);
		if (previousRankRowNum <= 1 || FSH.rank.characterRow > thisRankRowNum) {return;}
		var injectRow = parentTable.rows[previousRankRowNum - 1];
		parentTable.insertBefore(thisRankRow, injectRow);
		FSH.System.xmlhttp(onclickHREF);
		window.scrollBy(0,-24);
	},

	moveRankDownOneSlotOnScreen: function(evt) {
		var onclickHREF = evt.target.getAttribute('onclickhref');
		var thisRankRow = evt.target.parentNode.parentNode.parentNode;
		var parentTable = thisRankRow.parentNode;
		var thisRankRowNum = thisRankRow.rowIndex;
		var previousRankRowNum = parseInt(thisRankRowNum + 3, 10);
		if (previousRankRowNum - 1 > parentTable.rows.length || FSH.rank.characterRow > thisRankRowNum) {return;}
		var injectRow = parentTable.rows[previousRankRowNum - 1];
		parentTable.insertBefore(thisRankRow, injectRow);
		FSH.System.xmlhttp(onclickHREF);
		window.scrollBy(0,24);
	},

	fetchRankData: function() {
		var calcButton = FSH.System.findNode('//input[@id="getrankweightings"]');
		calcButton.style.display = 'none';
		var allItems = FSH.System.findNodes('//input[@value="Edit"]');
		for (var i=0; i<allItems.length; i += 1) {
			var anItem = allItems[i];
			var targetNode = anItem.parentNode.parentNode.previousSibling;
			var href = /window\.location='(.*)';/.exec(anItem.getAttribute('onclick'))[1];
			FSH.System.xmlhttp(href, FSH.rank.parseRankData, targetNode);
		}
	},

	parseRankData: function(responseText, linkElement) {
		// Makes a weighted calculation of available permissions
		// and gets tax rate
		var doc=FSH.System.createDocument(responseText);
		var checkBoxes = FSH.System.findNodes('//input[@type="checkbox"][contains(@name,"permission")]',doc);
		var count = 0;
		for (var i=0;i<checkBoxes.length;i += 1) {
			var checkbox=checkBoxes[i];
			if (checkbox.checked) {
				//terrasoft.gr/FallenSwordHelper: Can Un-Tag Items
				var privName = checkbox.nextSibling.textContent.trim();
				if (privName === 'Bank Withdraw' ||
					privName === 'Build/Upgrade/Demolish Structures' ||
					privName === 'Can Un-Tag Items') {
					count += 5;
				} else if (privName === 'Build/Upgrade Structures' ||
					privName === 'Can Kick Members') {
					count += 4;
				} else if (privName === 'Can Mass Messages') {
					count += 0.5;
				} else if (privName === 'Take Items' ||
					privName === 'Can Recall Tagged Items') {
					count += 0.2;
				} else if (privName === 'Store Items' ||
					privName === 'Can View Advisor') {
					count += 0.1;
				} else {
					count+= 1;
				}
			}
		}
		var taxRate = FSH.System.findNode('//input[@name="rank_tax"]',doc);

		linkElement.innerHTML = '<span style="color:blue;">(' +
			Math.round(10*count)/10 + ') Tax:(' + taxRate.value +
			'%)</span> ' + linkElement.innerHTML;
	}

};

FSH.inventory = { // jQuery

	injectInventoryManagerNew: function() {
		$('#pCC').html('<span id="fshInvMan"><img src = "' +
			FSH.System.imageServer + '/world/actionLoadingSpinner.gif">&nbsp;' +
			'Getting inventory data...</span>');
		FSH.Helper.appendHead({
			js: [FSH.dataTablesLoc],
			callback: FSH.inventory.syncInvMan
		});
	},

	syncInvMan: function() {
		var prm = [];
		prm.push(FSH.ajax.inventory(false));
		if (FSH.subcmd === 'guildinvmgr') {
			prm.push(FSH.ajax.getMembrList(false));
		}
		prm.push(FSH.ajax.getForage('fsh_inventoryMinLvl')
			.pipe(function(data) {
				FSH.inventory.fshMinLvl = data ||
					FSH.Data.defaults.inventoryMinLvl;
			})
		);
		prm.push(FSH.ajax.getForage('fsh_inventoryMaxLvl')
			.pipe(function(data) {
				FSH.inventory.fshMaxLvl = data ||
					FSH.Data.defaults.inventoryMaxLvl;
			})
		);
		prm.push(FSH.ajax.getForage('fsh_inventoryCheckedElements')
			.pipe(function(data) {
				FSH.inventory.checkedElements = data ||
					FSH.Data.defaults.inventoryCheckedElements;
			})
		);
		$.when.apply($, prm).done(FSH.inventory.getInvMan);
	},

	getInvMan: function() {

		if (FSH.Helper.membrList) {
			FSH.inventory.rekeyMembrList();
		}
		FSH.inventory.decorate();
		FSH.inventory.lvlFilter();
		FSH.inventory.typeFilter();
		FSH.inventory.setFilter();
		FSH.inventory.headers();
		FSH.inventory.setChecks();
		FSH.inventory.setLvls();
		FSH.inventory.doTable();
		FSH.inventory.eventHandlers();

	},

	rekeyMembrList: function() {
		FSH.Helper.membrList = Object.keys(FSH.Helper.membrList)
			// Using reduce() to rekey the membrList from names to id's
			.reduce(function(prev, curr) {
				if (curr !== 'lastUpdate') {
					prev[FSH.Helper.membrList[curr].id] =
						FSH.Helper.membrList[curr];
				}
				return prev;
			}, {});
	},

	decorate: function() {
		if (FSH.Helper.inventory.folders &&
			!FSH.Helper.inventory.folders['-1']) {
			FSH.Helper.inventory.folders['-1'] = 'Main';
		}
		var cur = FSH.Helper.inventory.player_id ?
			FSH.Helper.inventory.player_id :
			FSH.Helper.inventory.current_player_id;
		FSH.Helper.inventory.items.forEach(function(data) {
			var t = data.player_id === -1 ? 4 : 1;
			var p = FSH.Helper.inventory.player_id ?
				FSH.Helper.inventory.player_id :
				data.player_id !== -1 ? data.player_id :
				FSH.Helper.inventory.guild_id;
			var bold = data.equipped ? '<b>' + data.item_name + '</b>' :
				data.item_name;
			var imgsrc = ' src="' + FSH.System.imageServer +
				(data.type === '15' ?
				'/composing/potions/1_1.gif"' :
				'/items/' + data.item_id + '.gif"');
			var setName = ' set="' + (data.stats ? data.stats.set_name : '') +
				'"';
			data.fsh_name = '<span class="fshInvItem helperQC tip-dynamic" ' +
				'data-tipped="fetchitem.php?item_id=' + data.item_id +
				'&inv_id=' + data.inv_id + '&t=' + t + '&p=' + p +
				'&currentPlayerId=' + cur + '"' + imgsrc + setName + '>' +
				bold + '</span>';
		});
	},

	headers: function() {
		var reportTitle;
		if (FSH.Helper.inventory.player_id) {
			reportTitle = '<b>&nbsp;Inventory Manager</b> ' +
				FSH.Helper.inventory.items.length +
				' items (green = worn, blue = backpack)';
		} else {
			reportTitle = '<b>&nbsp;Guild Inventory Manager</b> ' +
				FSH.Helper.inventory.items.length +
				' items (maroon = in BP, blue=guild store)';
		}
		var myHtml = FSH.Layout.invManFilter
			.replace('@@reportTitle@@', reportTitle);
		$('#pCC').html(myHtml);
	},

	doTable: function() {
		$('#pCC').append('<table id="fshInv" class="stripe hover"></table>');
		$('#fshInv').dataTable({
			data: FSH.Helper.inventory.items,
			pageLength: 50,
			lengthMenu: [[50, 100, 150, 200, -1], [50, 100, 150, 200, 'All']],
			columnDefs: [{targets: '_all', defaultContent: ''}],
			columns: [
				//~ {title: 'Name', data: 'item_name', width: '32%',
					//~ render: FSH.inventory.nameRender
				//~ },
				{title: 'Name', data: 'fsh_name', width: '32%'
				},
				{title: 'Level', data: 'stats.min_level'},
				{title: 'Where', data: FSH.inventory.whereData,
					render: FSH.inventory.whereRender
				},
				{title: 'Type', data: 'type',
					render: function(type) {return FSH.Data.itemType[type];}
				},
				{title: 'Att', data: 'stats.attack'},
				{title: 'Def', data: 'stats.defense'},
				{title: 'Arm', data: 'stats.armor'},
				{title: 'Dam', data: 'stats.damage'},
				{title: 'HP', data: 'stats.hp'},
				{title: 'Forge', data: 'forge'},
				{title: 'Craft', data: 'craft',
					render: function(craft) {
						return FSH.Data.craft[craft] ?
							FSH.Data.craft[craft].abbr : '';
					}
				},
				{title: 'Dur%', data: 'durability'}
			],
			createdRow: FSH.inventory.createdRow
		});
	},

	createdRow: function(row, data) {
		var colour;
		if (data.folder_id) {
			colour = data.equipped ? 'fshGreen' : 'fshBlue';
		}
		if (data.player_id) {
			colour = data.player_id === -1 ? 'fshNavy' : 'fshMaroon';
		}
		$(row).addClass(colour);
		$('td', row).first().addClass(FSH.Data.rarity[data.rarity].class);
	},

	whereData: function(row) {
		return row.folder_id || row.player_id;
	},

	whereRender: function(_data, _type, row) {
		var where = '';
		if (row.folder_id) {
			where = row.equipped ? 'Worn' :
				FSH.Helper.inventory.folders[row.folder_id];
		} else {
			where = row.player_id === -1 ? 'GS' :
				'<a class="fshMaroon" href="index.php?cmd=profile&player_id=' +
				FSH.Helper.membrList[row.player_id].id + '">' +
				FSH.Helper.membrList[row.player_id].username + '</a>';
		}
		return where;
	},

	typeFilter: function() {
		$.fn.dataTable.ext.search.push(
			function(_settings, _row, _index, data) {
				return !FSH.inventory.checkedElements ||
					FSH.inventory.checkedElements[data.type] ?
					true : false;
			}
		);
	},

	setFilter: function() {
		$.fn.dataTable.ext.search.push(
			function(_settings, _row, _index, data) {
				return !FSH.inventory.checkedElements ||
					!FSH.inventory.checkedElements['-1'] ||
					FSH.inventory.checkedElements['-1'] &&
					data.stats &&
					data.stats.set_id !== '-1' ?
					true : false;
			}
		);
	},

	lvlFilter: function() {
		/* Custom filtering function which will search data in column 2 between two values */
		$.fn.dataTable.ext.search.push(
			function(_settings, data) {
				var min = FSH.inventory.fshMinLvl;
				var max = FSH.inventory.fshMaxLvl;
				var level = FSH.System.intValue(data[1]); // use data for the level column
				if (level === 0 ||
					isNaN(min)   && isNaN(max)   ||
					isNaN(min)   && level <= max ||
					min <= level && isNaN(max)   ||
					min <= level && level <= max )
				{return true;}
				return false;
			}
		);
	},

	eventHandlers: function() {
		//~ var table = $('#fshInv').DataTable();
		//~ $('span#fshRefresh', FSH.Helper.context).click(function() {
			//~ $('span#fshRefresh', FSH.Helper.context).hide();
			//~ FSH.Helper.onlinePages = 0;
			//~ FSH.Helper.onlinePlayers = {};
			//~ $.get('index.php?cmd=onlineplayers&page=1',
			//~ FSH.Helper.getOnlinePlayers);
			//~ FSH.System.setValue('lastOnlineCheck', Date.now());
			//~ $('div#fshOutput', FSH.Helper.context)
				//~ .append('Parsing online players...'); // context
		//~ });
		$('#fshMinLvl, #fshMaxLvl').keyup(FSH.inventory.changeLvls);
		$('#fshReset').click(FSH.inventory.resetLvls);
		$('table.fshInvFilter').on('click', 'input[type="checkbox"]',
			FSH.inventory.getChecks);
		$('#fshAll').click(FSH.inventory.allChecks);
		$('#fshNone').click(FSH.inventory.clearChecks);
		$('#fshDefault').click(FSH.inventory.resetChecks);
		$('table#fshInv').on('click', 'span.fshInvItem', FSH.inventory.inspect);
	},

	inspect: function() {
		var self = $(this);
		var img = $('<img>', {width: '30', height: '30'})
			.attr('src', self.attr('src'))
			.addClass('tip-dynamic')
			.data('tipped', self.data('tipped'));
		var setName = self.attr('set') === '' ? '' : '<br>Set Name: ' +
			self.attr('set');
		var $dialog = $('<div/>')
			.append(img)
			.append(setName)
			.dialog({
				dialogClass: 'no-close',
				title: self.text(),
				resizable: false,
				height: 350,
				width: 300,
				modal: true,
				buttons: {
					'Close' : function() {
						$dialog.dialog( 'destroy' );
					}
				}
			});
	},

	getChecks: function() {
		FSH.inventory.checkedElements = {};
		$('table.fshInvFilter input[type="checkbox"][item]:checked').each(function() {
			FSH.inventory.checkedElements[$(this).attr('item')] = 1;
		});
		FSH.ajax.setForage('fsh_inventoryCheckedElements',
			FSH.inventory.checkedElements);
		$('#fshInv').DataTable().draw(false);
	},

	setChecks: function() {
		$('table.fshInvFilter input[type="checkbox"]').each(function() {
			var box = $(this);
			box.prop('checked',
				FSH.inventory.checkedElements[box.attr('item')] === 1);
		});
		FSH.ajax.setForage('fsh_inventoryCheckedElements',
			FSH.inventory.checkedElements);
	},

	resetChecks: function() {
		FSH.inventory.checkedElements =
			FSH.Data.defaults.inventoryCheckedElements;
		FSH.inventory.setChecks();
		$('#fshInv').DataTable().draw(false);
	},

	allChecks: function() {
		FSH.inventory.checkedElements =
			FSH.Data.inventoryCheckAll;
		FSH.inventory.setChecks();
		$('#fshInv').DataTable().draw(false);
	},

	clearChecks: function() {
		FSH.inventory.checkedElements = {};
		FSH.inventory.setChecks();
		$('#fshInv').DataTable().draw();
	},

	setLvls: function() {
		$('#fshMinLvl').val(FSH.inventory.fshMinLvl);
		$('#fshMaxLvl').val(FSH.inventory.fshMaxLvl);
	},

	resetLvls: function() {
		FSH.inventory.fshMinLvl = FSH.Data.defaults.inventoryMinLvl;
		FSH.inventory.fshMaxLvl = FSH.Data.defaults.inventoryMaxLvl;
		FSH.ajax.setForage('fsh_inventoryMinLvl', FSH.inventory.fshMinLvl);
		FSH.ajax.setForage('fsh_inventoryMaxLvl', FSH.inventory.fshMaxLvl);
		$('#fshMinLvl').val(FSH.inventory.fshMinLvl);
		$('#fshMaxLvl').val(FSH.inventory.fshMaxLvl);
		$('#fshInv').DataTable().draw(false);
	},

	changeLvls: function() {
		FSH.inventory.fshMinLvl = parseInt($('#fshMinLvl').val(), 10);
		FSH.inventory.fshMaxLvl = parseInt($('#fshMaxLvl').val(), 10);
		if (!isNaN(FSH.inventory.fshMinLvl)) {
			FSH.ajax.setForage('fsh_inventoryMinLvl', FSH.inventory.fshMinLvl);
		}
		if (!isNaN(FSH.inventory.fshMaxLvl)) {
			FSH.ajax.setForage('fsh_inventoryMaxLvl', FSH.inventory.fshMaxLvl);
		}
		$('#fshInv').DataTable().draw(false);
	}

};

FSH.quickBuff = { // jQuery

	inject: function() { // jQuery
		var playerInput = $('input#targetPlayers');
		if (playerInput.length === 0) {return;}
		$('h1:contains("Quick Buff")').after(FSH.Layout.quickBuffHeader);
		$.getJSON('index.php', { // TODO This should be moved to ajax
			cmd:             'export',
			subcmd:          'profile',
			player_username: window.self
		}).done(FSH.quickBuff.getSustain);
	},

	addBuffLevels: function() { // jQuery
		$('span.fshPlayer').remove();
		var player = $(this);
		FSH.quickBuff.addStatsQuickBuff(player);
		var buffs = String.prototype.split.call(player.data('buffs'), ',');
		player.next().find('span').each(function(i, e) {
			var buffLvl = parseInt($(e).text().replace(/\[|\]/g, ''), 10);
			var label = $('label[for="skill-' + buffs[i] + '"]');
			if (label.length === 0) {return;}
			var span = $('span > span', label);
			var myLvl = parseInt(span.text().replace(/\[|\]/g, ''), 10);
			span.after('<span class="fshPlayer"' + (myLvl > buffLvl ?
				' style="color:red;"' : ' style="color:green;"') + '> [' +
				buffLvl + ']</span>');
		});
	},

	addStatsQuickBuff: function(player) { // jQuery
		player.parent().find('span.fshLastActivity').remove();
		$.ajax({ // TODO This should be moved to ajax
			cache: false,
			dataType: 'json',
			url: 'index.php',
			data: {
				cmd:             'export',
				subcmd:          'profile',
				player_username: player.text()
			}
		}).done(function(data) {
				player.after('<span class="fshLastActivity">Last Activity: ' +
					FSH.System.formatLastActivity(data.last_login) +
					'<br>Stamina: ' + data.current_stamina + ' / ' +
					data.stamina + ' ( ' + Math.floor(data.current_stamina /
					data.stamina * 100) + '% )' +
					'</span>');
			});
	},

	getSustain: function(responseText) { // jQuery
		FSH.quickBuff.getEnhancement(responseText._enhancements, 'Sustain',
			$('td#fshSus'));
		FSH.quickBuff.getEnhancement(responseText._enhancements, 'Fury Caster',
			$('td#fshFur'));
		FSH.quickBuff.getBuff(responseText._skills, 'Guild Buffer',
			$('td#fshGB'));
		FSH.quickBuff.getBuff(responseText._skills, 'Buff Master',
			$('td#fshBM'));
		FSH.quickBuff.getBuff(responseText._skills, 'Extend', $('td#fshExt'));
		FSH.quickBuff.getBuff(responseText._skills, 'Reinforce', $('td#fshRI'));

		$('span[id*="HelperActivate"]').click(function() {
			var trigger = $(this);
			var buffHref='?cmd=quickbuff&subcmd=activate&targetPlayers=' +
				window.self + '&skills[]=' + trigger.attr('buffID');
			$.get(buffHref).done(function(data) {
				if ($('font:contains("current or higher level is ' +
					'currently active on")', data).length > 0 ||
					$('font:contains("was activated on")', data)) {
						trigger.css('color','lime');
						trigger.html('On');
				}
			});
		});

		$('div#players').on('click', 'h1', FSH.quickBuff.addBuffLevels);

		$('div#buff-outer label[for^="skill-"]').each(function() {
			var lbl = $(this);

			var tipped = $('span[data-tipped]', lbl);
			var tipData = $(tipped.data('tipped'));
			$('center', tipData)
				.append('<br>Stamina Cost: ' + lbl.prev().data('cost'));
			tipped.attr('data-tipped', tipData.prop('outerHTML'));

			var lvlSpan = $('span > span', lbl);
			var myLvl = parseInt(lvlSpan.text().replace(/\[|\]/g, ''), 10);
			if (!FSH.Data.excludeBuff[lbl.attr('for')] && myLvl < 125) {
				lbl.addClass('fshDim');}
		});

		$('div#players h1').first().click();

	},

	getEnhancement: function(doc, enh, inject) { // jQuery
		var enhLevel = doc.reduce(function(prev, curr) {
				return curr.name === enh ? curr.value : prev;
			}, -1);
		var enhColor = 'lime';
		if (enhLevel < 100) {enhColor = 'red';}
		inject.html('<span style="color: ' + enhColor + ';">' +
			enhLevel + '%</span>');
	},

	getBuff: function(doc, buff, inject) { // jQuery
		var hasBuff = doc.reduce(function(prev, curr) {
				return curr.name === buff ? curr.duration : prev;
			}, 0);
		if (hasBuff) {
			var s = hasBuff;
			var m = Math.floor(s / 60);
			s = s % 60;
			var buffTimeToExpire = (m === 0 ? '' : m + 'm') +
				(s === 0 ? '' : ' ' + s + 's');
			inject.html('<span style="color:lime;">On</span>&nbsp;<span ' +
				'style="color: white; font-size: x-small;">(' +
				buffTimeToExpire +')</span>');
		} else {
			var elem = $('input[data-name="' + buff + '"]');
			if (elem.length > 0) {
				inject.html('<span style="color:red;cursor:pointer;" ' +
					'buffID="' + elem.val() + '" id="HelperActivate' +
					elem.val() + '">Activate</span>');
			} else {
				inject.html('<span style="color:red;">Off</span>');
			}
		}
	},

};

FSH.toprated = { // jQuery

	injectTopRated: function() { // jQuery
		if ($('#pCC font:contains("Last Updated")').length === 0) {return;}
		var lump = '<input id="fshFindOnlinePlayers" class="custombutton" ' +
			'type="button" title="Fetch the online status of the top 250 players ' +
			'(warning ... takes a few seconds)." value="Find Online Players">';
		var findBtn = $(lump);
		var theCell = $('#pCC td').first();
		theCell.wrapInner('<div style="width:190px;"/>');
		theCell.prepend($('<span/>').append(findBtn));
		findBtn.click(FSH.toprated.findOnlinePlayers);
	},

	findOnlinePlayers: function(e) { // jQuery
		$(e.target).parent().html('<img id="fshSpinner" src="' + 
			FSH.System.imageServer + '/world/actionLoadingSpinner.gif">');
		var topPlayerRows = $('#pCC table[width="500"] > tbody > tr');
		var guildALink;
		var guildId;
		var guildArray = [];
		for (var i = 1; i < topPlayerRows.length; i += 4) {

			guildALink = $('a', $('td', topPlayerRows.eq(i)).eq(2));
			if (guildALink.length === 0) {continue;} // Player does not belong to a guild
			// TODO player array for exceptions or just get profiles for everyone?

			guildId = guildALink.attr('href').match(/guild_id=([0-9]+)/)[1];
			if (guildArray.indexOf(guildId) === -1) {guildArray.push(guildId);}
		}
		FSH.ajax.getAllMembrList(true, guildArray)
			.done(FSH.toprated.parseGuildOnline);
	},

	parseGuildOnline: function(membrList) { // jQuery
		$('#pCC #fshSpinner').hide();
		var topPlayerRows = $('#pCC table[width="500"] > tbody > tr');
		var theRow;
		var theCell;
		var guildALink;
		var guildId;
		var username;
		for (var i = 1; i < topPlayerRows.length; i += 4) {
			theRow = topPlayerRows.eq(i);
			theCell = $('td', theRow).eq(3);
			guildALink = $('a', $('td', theRow).eq(2));
			if (guildALink.length === 0) {continue;}
			guildId = guildALink.attr('href').match(/guild_id=([0-9]+)/)[1];
			username = $('a', theCell).text();
			theCell.after($('<td/>').append(
				FSH.Layout.onlineDot({
					last_login: membrList[guildId][username].last_login
				})
			));
		}
	}

};

FSH.helperMenu = { // jQuery

	injectHelperMenu: function() { //jquery
		// don't put all the menu code here (but call if clicked) to minimize lag
		var node = $('#statbar-container');
		if (node.length === 0) {return;}
		var helperMenu = $('<div id=helperMenu>Helper&nbsp;Menu</div>');
		node.before(helperMenu);
		helperMenu.on('mouseover', FSH.helperMenu.showHelperMenu);
		helperMenu.draggable();
		if (!FSH.System.getValue('keepHelperMenuOnScreen')) {return;}
		$(document).ready(function() {
			$(window).scroll(function() {
				var offset = $(document).scrollTop() + 'px';
				helperMenu.animate({top:offset},
					{duration:0,queue:false});
			});
		});
	},

	showHelperMenu: function() { // jquery
		var helperMenu = $('#helperMenu');
		helperMenu.off('mouseover', FSH.helperMenu.showHelperMenu);
		var helperMenuDiv = $('<div id=helperMenuDiv style="background-image:' +
			'url(\'' + FSH.System.imageServer + '/skin/inner_bg.jpg\');"/>');
		helperMenuDiv.append(FSH.Layout.helperMenu);
		helperMenu.append(helperMenuDiv);
		helperMenu.click(function() {
			helperMenuDiv.toggle('fast');
		});
		helperMenuDiv.on('click', '.fshLink', FSH.helperMenu.callHelperFunction);
		helperMenuDiv.on('click', '.a-reply', function(evt) {
			window.openQuickMsgDialog(evt.target.getAttribute('target_player'));
		});
	},

	callHelperFunction: function(evt) { // jquery
		$('#content').remove();
		var content = $('<div id=content/>');
		$('body').append(content.hide());
		var fn = FSH.System.getFunction($(evt.target).attr('fn'));
		if (typeof fn === 'function') {
			fn.call(FSH.Helper, content[0]);
		}
		content.dialog({ width: 'auto', modal: true });
	}

};

FSH.allyEnemy = { // jQuery

	prepareAllyEnemyList: function() { // jQuery
		$('div#pCR').prepend('<div id="fshAllyEnemy" class="minibox"></div>');
		FSH.ajax.myStats(false)
			.done(FSH.allyEnemy.injectAllyEnemyList);
	},

	injectAllyEnemyList: function(data) { // jQuery

		var allies = data._allies || [];
		var enemies = data._enemies || [];
		if (allies.length + enemies.length === 0 ||
			!FSH.Helper.enableAllyOnlineList && enemies.length === 0 ||
			!FSH.Helper.enableEnemyOnlineList && allies.length === 0) {
			return;
		}
		var output = $(FSH.Layout.allyEnemyList);

		if (FSH.Helper.enableAllyOnlineList) {
			$('ul#fshContactList', output)
				.append(FSH.Helper.addContact(allies, true));
		}
		if (FSH.Helper.enableEnemyOnlineList) {
			$('ul#fshContactList', output)
				.append(FSH.Helper.addContact(enemies, false));
		}
		if (FSH.Helper.hideGuildInfoTrade) {
			$('a#enemy-trade', output).hide();
		}
		if (FSH.Helper.hideGuildInfoSecureTrade) {
			$('a#enemy-secure-trade', output).hide();
		}
		if (FSH.Helper.hideGuildInfoBuff) {
			$('a#enemy-quickbuff', output).hide();
		}
		if (FSH.Helper.hideGuildInfoMessage) {
			$('a#enemy-send-message', output).hide();
		}
		if (FSH.Helper.hideBuffSelected) {
			$('a.enemy-buff-check-on', output).hide();
			$('ul#enemy-quick-buff', output).hide();
		}

		$('div#pCR div#fshAllyEnemy').empty();
		$('div#pCR div#fshAllyEnemy').append(output);

		$('div#pCR ul#fshContactList').on('click',
			'a[class^="enemy-buff-check-o"]', FSH.allyEnemy.quickBuffToggle);

		$('div#pCR ul#enemy-quick-buff').click(function(){
			var sendstring = [];
			$('ul#fshContactList a.enemy-buff-check-on').each(function(){
				sendstring.push($(this).data('name'));
			});
			window.openWindow('index.php?cmd=quickbuff&t=' + sendstring.join(),
				'fsQuickBuff', 618, 1000, ',scrollbars');
		});

		$('div#pCR span#fshResetEnemy').click(FSH.allyEnemy.resetAllyEnemyList);

	},

	quickBuffToggle: function() { // jQuery
		var ball = $(this);
		if (ball.hasClass('enemy-buff-check-on')) {
			ball.addClass('enemy-buff-check-off');
			ball.removeClass('enemy-buff-check-on');
		} else {
			ball.addClass('enemy-buff-check-on');
			ball.removeClass('enemy-buff-check-off');
		}
	},

	resetAllyEnemyList: function() { // jQuery
		FSH.ajax.myStats(true)
			.done(FSH.allyEnemy.injectAllyEnemyList);
	}

};

FSH.profile = { // Legacy

	injectProfile: function() { // Legacy
		FSH.profile.updateQuickBuff();
		FSH.profile.updateStatistics();
		var playerid;
		var player = FSH.System.findNode('//textarea[@id="holdtext"]');
		var avyImg;
		var playername;
		avyImg = FSH.System.findNode('//img[contains(@oldtitle, "s Avatar")]');
		if (avyImg) {playername = avyImg.getAttribute('oldtitle');}
		if (!avyImg) {return;}

		if(document.URL.indexOf('player_id') !== -1){
			var playeridRE = document.URL.match(/player_id=(\d+)/);
			if (playeridRE) {playerid = playeridRE[1];}
		}
		var idindex;
//************** yuuzhan having fun
		$('img[oldtitle="yuuzhan\'s Avatar"]').click(function(){alert('Winner!');});
		$('img[oldtitle="yuuzhan\'s Avatar"]').attr('src','http://evolutions.yvong.com/images/tumbler.gif');
//**************
		FSH.profile.profileInjectGuildRel();
		if (FSH.System.getValue('enableBioCompressor')) {FSH.profile.compressBio();}
		var isSelfRE = $('#backpack_tabs').length > 0;// /player_id=/.exec(document.location.search);//
		if (player) {
			if (!playerid) {
				playerid = player.innerHTML;
				idindex = playerid.indexOf('?ref=') + 5;
				playerid = playerid.substr(idindex);
			}

			avyImg.style.borderStyle='none';

			playername = playername.substr(0, playername.indexOf('\'s Avatar'));

			var avyExtrasDiv = document.createElement('DIV');
			avyImg.parentNode.appendChild(avyExtrasDiv);
			avyExtrasDiv.align = 'center';
			FSH.profile.profileInjectQuickButton(avyExtrasDiv, playerid, playername);
			FSH.profile.profileRenderBio(playername);
			FSH.Helper.buffCost={'count':0,'buffs':{}};

			FSH.profile.bioAddEventListener();
		}

		if (isSelfRE) { // self inventory

			FSH.profile.profileParseAllyEnemy();
			//~ FSH.profile.profileInjectFastWear();
			if (FSH.System.getValue('enableQuickDrink')) {
				FSH.profile.injectFastWear();
			}
			FSH.profile.profileComponents();

			// quick wear manager link
			var node=FSH.System.findNode('//span/a[@href="index.php?cmd=profile&subcmd=togglesection&section_id=2"]');
			if (node) {
				node.parentNode.innerHTML+='&nbsp;[<a href="/index.php?cmd=notepad&blank=1&subcmd=quickwear"><span style="color:blue;">Quick&nbsp;Wear</span></a>]';
			}
			//select all link
			node=FSH.System.findNode('//span/a[contains(@href,"cmd=profile&subcmd=dropitems")]');
			if (node) {
				node.parentNode.innerHTML+='&nbsp;<span id="Helper:profileSelectAll" style="cursor:pointer; text-decoration:underline; font-size:x-small; color:blue;">[All]</span>';
				document.getElementById('Helper:profileSelectAll').addEventListener('click', FSH.profile.profileSelectAll, true);
			}

			// store the VL of the player
			var virtualLevel = parseInt(FSH.System.findNode('//td[a/b[.="VL"] or b/a[.="VL"]]/following-sibling::td[1]').textContent,10);
			if (FSH.System.intValue($('dt.stat-level:first').next().text()) === virtualLevel) {
				FSH.System.setValue('characterVirtualLevel','');
			} else {
				FSH.System.setValue('characterVirtualLevel',virtualLevel);
			}
		}

		FSH.common.addStatTotalToMouseover();

		//enhance colored dots
		var enhanceOnlineDots = FSH.System.getValue('enhanceOnlineDots');
		if (!enhanceOnlineDots) {return;}
		var profileAlliesEnemies = FSH.System.findNodes(
			'//div[@id="profileLeftColumn"]//table/tbody/tr/td/a[' +
			'contains(@data-tipped,"Last Activity")]');
		if (!profileAlliesEnemies) {return;}
		var re = new RegExp('<td>Last Activity:</td><td>(\\d+)d (\\d+)h (\\d+)m (\\d+)s</td>');
		for (var i=0;i<profileAlliesEnemies.length ;i+= 1 ) {
			var contactLink = profileAlliesEnemies[i];
			var lastActivity = re.exec($(contactLink).data('tipped'));
			var lastActivityIMG = FSH.Layout.onlineDot({
					min: lastActivity[3],
					hour: lastActivity[2],
					day: lastActivity[1]
				});
			contactLink.parentNode.previousSibling
				.innerHTML = lastActivityIMG;
		}
	},

	updateQuickBuff: function() { // jQuery
		var qb = $('div#profileRightColumn a:contains("Quick Buff")');
		if (qb.length !== 0) {
			qb.attr('href', qb.attr('href').replace(/, 500/g,', 1000'));
		}
	},

	updateStatistics: function() { // jQuery
		var charStats = $('#profileLeftColumn table').first()
			.attr('id', 'characterStats');
		var tblCells = $('td', charStats).has('table').has('font');
		tblCells.each(function(i, e) {
			var tde = $('td', e);
			$(e).attr('id', tde.first().attr('id'));
			$(e).html(tde.first().html().replace(/&nbsp;/g, ' ') +
				'<div class="profile-stat-bonus">' +
				tde.last().text() + '</div>');
		});
	},

	profileSelectAll: function() { // jQuery
		var type = $('#backpackContainer').data('backpack').type;
		var myLi = $('div#backpackTab_' + type + ' li').not('.hcsPaginate_hidden');
		$('span.backpackItem', myLi)
			.each(function(){
				var myClick = jQuery.Event('click');
				myClick.ctrlKey = true;
				myClick.metaKey = true;
				$(this).trigger(myClick);
			});
	},

	compressBio: function() { // Legacy
		var bioCell = FSH.System.findNode('//div[@id="profile-bio"]'); //new interface logic
		if (!bioCell) {return;} //non-self profile
		var bioContents = bioCell.innerHTML;
		var maxCharactersToShow = FSH.System.getValue('maxCompressedCharacters');
		var maxRowsToShow = FSH.System.getValue('maxCompressedLines');
		var numberOfLines = bioContents.substr(0,maxCharactersToShow).split(/<br>\n/).length - 1;
		if (numberOfLines >= maxRowsToShow) {
			var startIndex = 0;
			while (maxRowsToShow >= 0) {
				maxRowsToShow -=1;
				startIndex = bioContents.indexOf('<br>\n',startIndex+1);
			}
			maxCharactersToShow = startIndex;
		}

		if (bioContents.length <= maxCharactersToShow) {return;}
		//find the end of next HTML tag after the max characters to show.
		var breakPoint = bioContents.indexOf('<br>',maxCharactersToShow) + 4;
		var lineBreak = '';
		if (breakPoint === 3) {
				breakPoint = bioContents.indexOf(' ',maxCharactersToShow) + 1;
				if (breakPoint === 0) {return;}
				lineBreak = '<br>';
			}
		var bioStart = bioContents.substring(0,breakPoint);
		var bioEnd = bioContents.substring(breakPoint,bioContents.length);
		var extraOpenHTML = '', extraCloseHTML = '';
		var tagList=['b','i','u','span'];
		for (var i=0;i<tagList.length;i += 1){
			var closeTagIndex = bioEnd.indexOf('</'+tagList[i]+'>');
			var openTagIndex = bioEnd.indexOf('<'+tagList[i]+'>');
			if (closeTagIndex !== -1 && (openTagIndex > closeTagIndex ||
				openTagIndex === -1)) {
				extraOpenHTML += '<'+tagList[i]+'>';
				extraCloseHTML += '</'+tagList[i]+'>';
			}
		}
		bioCell.innerHTML = bioStart + extraCloseHTML + lineBreak +
			'<span id="Helper:bioExpander" style="cursor:pointer; ' +
			'text-decoration:underline; color:blue;">More ...</span><br>' +
			'<span id="Helper:bioHidden">' + extraOpenHTML + bioEnd + '</span>';
		$('#Helper\\:bioHidden').hide();
	},

	profileInjectGuildRel: function() { // Legacy
		var aLink = FSH.System.findNode('//a[contains(@href,"cmd=guild&subcmd=view")]');
		if (aLink) {
			var guildIdResult = /guild_id=([0-9]+)/i.exec(aLink.getAttribute('href'));
			if (guildIdResult) {
				FSH.Helper.guildId = parseInt(guildIdResult[1], 10);
			}
			var warning = document.createElement('span');
			var color = '';
			var changeAppearance = true;
			FSH.Helper.currentGuildRelationship = FSH.Helper.guildRelationship(aLink.text);
			var settings;
			switch (FSH.Helper.currentGuildRelationship) {
				case 'self':
					settings='guildSelfMessage';
					break;
				case 'friendly':
					settings='guildFrndMessage';
					break;
				case 'old':
					settings='guildPastMessage';
					break;
				case 'enemy':
					settings='guildEnmyMessage';
					break;
				default:
					changeAppearance = false;
					break;
			}
			if (changeAppearance) {
				var settingsAry = FSH.Data.guildMessages;
				warning.innerHTML='<br/>' + settingsAry[settings].message;
				color = settingsAry[settings].color;
				aLink.parentNode.style.color=color;
				aLink.style.color=color;
				aLink.parentNode.insertBefore(warning, aLink.nextSibling);
			}
		}
	},

	profileInjectQuickButton: function(avyrow, playerid, playername) { // Native
		var auctiontext = 'Go to ' + playername + '"s auctions' ;
		var ranktext = 'Rank ' +playername + '' ;
		var securetradetext = 'Create Secure Trade to ' + playername;

		var newhtml = avyrow.innerHTML +
			'<a ' + FSH.Layout.quickBuffHref(playerid) + '>' +
			'<img alt="Buff ' + playername + '" title="Buff ' + playername + '" src=' +
			FSH.System.imageServer + '/skin/realm/icon_action_quickbuff.gif></a>&nbsp;&nbsp;';
		if (!FSH.System.getValue('enableMaxGroupSizeToJoin')) {
			newhtml += '<a href="' + FSH.System.server + 'index.php?cmd=guild&subcmd=groups&subcmd2=joinall' +
				'");"><img alt="Join All Groups" title="Join All Groups" src=' +
				FSH.System.imageServer + '/skin/icon_action_join.gif></a>&nbsp;&nbsp;';
		} else {
			var maxGroupSizeToJoin = FSH.System.getValue('maxGroupSizeToJoin');
			newhtml += '<a href="' + FSH.System.server + 'index.php?cmd=guild&subcmd=groups&subcmd2=joinallgroupsundersize' +
				'");"><img alt="Join All Groups" title="Join All Groups < ' + maxGroupSizeToJoin + ' Members" src=' +
				FSH.System.imageServer + '/skin/icon_action_join.gif></a>&nbsp;&nbsp;';
		}
		newhtml += '<a href=' + FSH.System.server + '?cmd=auctionhouse&type=-3&tid=' +
			playerid + '><img alt="' + auctiontext + '" title="' + auctiontext + '" src="' +
			FSH.System.imageServer + '/skin/gold_button.gif"></a>&nbsp;&nbsp;' +
			'<a href=' + FSH.System.server + 'index.php?cmd=trade&subcmd=createsecure&target_username=' +
			playername + '><img alt="' + securetradetext + '" title="' + securetradetext + '" src=' +
			FSH.System.imageServer + '/temple/2.gif></a>&nbsp;&nbsp;' +
			'<a href=' + FSH.System.server + '?cmd=guild&subcmd=inventory&subcmd2=report&user=' +
			playername + '>[SR]</a>&nbsp;&nbsp;';
		if (FSH.Helper.currentGuildRelationship === 'self' && FSH.System.getValue('showAdmin')) {
			newhtml +=
				'<a href="' + FSH.System.server + 'index.php?cmd=guild&subcmd=members&subcmd2=changerank&member_id=' +
				playerid + '><img alt="' + ranktext + '" title="' + ranktext + '" src=' +
				FSH.System.imageServer + '/guilds/' + FSH.Helper.guildId + '_mini.jpg></a>';
		}
		avyrow.innerHTML = newhtml ;
	},

	profileRenderBio: function(playername) { // Legacy
		var bioDiv = FSH.System.findNode('//div[strong[.="Biography"]]');
		var bioCell = bioDiv.nextSibling.nextSibling;
		var renderBio = bioCell && FSH.System.getValue('renderSelfBio') || !bioCell && FSH.System.getValue('renderOtherBios');
		FSH.System.setValue('buffsToBuy', '');
		if (!renderBio || !bioCell) {return;}

		var bioContents = bioCell.innerHTML;
		bioContents=bioContents.replace(/\{b\}/g,'`~').replace(/\{\/b\}/g,'~`');
		var buffs=bioContents.match(/`~([^~]|~(?!`))*~`/g);
		if (buffs) {
			for (var i=0;i<buffs.length;i += 1) {
				var fullName=buffs[i].replace(/(`~)|(~`)|(\{b\})|(\{\/b\})/g,'');
				// var buffName = FSH.Helper.removeHTML(fullName);
				var cbString =
					'<span id="Helper:buff'+i+'" style="color:blue;cursor:pointer">'+
					fullName+'</span>';
				bioContents=bioContents.replace(buffs[i], cbString);
			}

			if (bioContents.indexOf('[cmd]') < 0) {bioContents+='[cmd]';}

			bioContents = bioContents.replace('[cmd]','<input id="Helper:sendBuffMsg" subject="buffMe" target_player="' +
				playername +'" class="custombutton" type="submit" value="Ask For Buffs"/>'+
				'<span id=buffCost style="color:red"></span>');
		}
		bioCell.innerHTML = bioContents;
	},

	toggleBuffsToBuy: function(evt) { // Native
		// This is also called by bio preview
		var newtext;
		var buffNameNode=evt.target;
		while (buffNameNode.tagName.toLowerCase()!=='span') {
			buffNameNode=buffNameNode.parentNode;
		}
		var node=buffNameNode;
		var selected = node.style.color==='blue';
		node.style.color=selected?'yellow':'blue';

		var buffName=node.textContent;
		if (selected) {
			var text='';
			// get the whole line from the buff name towards the end (even after the ',', in case of 'AL, Lib, Mer: 10k each'
			while (node && node.nodeName.toLowerCase()!=='br') {
				newtext = node.textContent;
				node=node.nextSibling;
				text+=newtext;
			}

			var price=text.replace(/[^a-zA-Z0-9.,+\- ]/g, '').toLowerCase().match(/([+\-]{0,1}[\.\d]+ *k)|([+\-]{0,1}[\.\d]+ *fsp)|([+\-]{0,1}[\.\d]+ *stam)/);
			if (!price) { // some players have prices BEFORE the buff names
				node=buffNameNode;
				while (node && node.nodeName.toLowerCase()!=='br') {
					newtext=node.textContent;
					node=node.previousSibling;
					text=newtext+text;
				}
				price=text.replace(/[^a-zA-Z0-9.,+\- ]/g, '').toLowerCase().match(/([+\-]{0,1}[\.\d]+ *k)|([+\-]{0,1}[\.\d]+ *fsp)|([+\-]{0,1}[\.\d]+ *stam)/);
			}
			var type, cost;
			if (price) {
				type=price[0].indexOf('k')>0 ? 'k' : price[0].indexOf('f')>0 ? 'fsp' : 'stam';
				cost=price[0].match(/([+\-]{0,1}[\.\d]+)/)[0];
			} else {
				type='unknown'; cost='1';
			}
			FSH.Helper.buffCost.buffs[buffName]=[parseFloat(cost),type];
			FSH.Helper.buffCost.count+=1;
		} else {
			FSH.Helper.buffCost.count-=1;
			delete FSH.Helper.buffCost.buffs[buffName];
		}
		FSH.profile.updateBuffCost();
	},

	updateBuffCost: function() { // Native
		if (FSH.Helper.buffCost.count>0) {
			var total={'k':0,'fsp':0,'stam':0,'unknown':0};
			var html='This is an estimated cost based on how the script finds the cost associated with buffs from viewing bio.'+
				'It can be incorrect, please use with discretion.<br/><hr/>'+
				'<table border=0>';
			for (var buff in FSH.Helper.buffCost.buffs) {
				if (!FSH.Helper.buffCost.buffs.hasOwnProperty(buff)) { continue; }
				total[FSH.Helper.buffCost.buffs[buff][1]]+=FSH.Helper.buffCost.buffs[buff][0];
				html+='<tr><td>'+buff+'</td><td>: '+FSH.Helper.buffCost.buffs[buff][0]+FSH.Helper.buffCost.buffs[buff][1]+'</td></tr>';
			}
			var totalText = total.fsp>0 ? Math.round(total.fsp*100)/100 +' FSP':'';
			if (total.fsp > 0 && total.k > 0) {totalText+=' and ';}
			totalText += total.k > 0 ? total.k+' k':'';
			if (total.fsp > 0 || total.k > 0) {totalText+=' and ';}
			totalText += total.stam > 0 ? total.stam+' Stam('+Math.round(total.stam/25*10)/10+'fsp)':'';
			if (total.unknown>0) {
				totalText+=' ('+total.unknown+' buff(s) with unknown cost)';
			}
			html+='</table><b>Total: '+totalText+'</b>';
			document.getElementById('buffCost').innerHTML='<br/><span class="tipped" data-tipped="'+html+'">Estimated Cost: <b>'+totalText+'</b></span>';
			FSH.System.setValue('buffCostTotalText', totalText);
		} else {
			document.getElementById('buffCost').innerHTML='';
			FSH.System.setValue('buffCostTotalText', '');
		}
	},

	expandBio: function() { // jQuery
		var bioExpander = $('#Helper\\:bioExpander');
		bioExpander.text(bioExpander.text() === 'More ...' ? 'Less ...' : 'More ...');
		$('#Helper\\:bioHidden').toggle();
	},

	getBuffsToBuy: function(evt) { // Legacy
		var allSpans = FSH.System.findNodes('//span[contains(@id,"Helper:buff")]');

		var buffsToBuy = '';
		var buffCount = 0;
		for (var i=0; i<allSpans.length; i += 1) {
			var aSpan=allSpans[i];
			var spanInner = aSpan.innerHTML.replace(/<[a-zA-Z\/][^>]*>/g, '').replace(/[^a-zA-Z0-9 ]/g,'');

			if (aSpan.id && aSpan.id.match(/Helper:buff\d*/) !== -1 && aSpan.style.color === 'yellow') {
				buffsToBuy += spanInner.trim() + ', ';
				buffCount+= 1;
			}
		}
		buffsToBuy = buffsToBuy.trim();
		if (buffsToBuy.lastIndexOf(',') === buffsToBuy.length - 1) {
			buffsToBuy = buffsToBuy.substring(0, buffsToBuy.length - 1);
		}

		if (buffCount > 0) {
				var targetPlayer = evt.target.getAttribute('target_player');
				var greetingText = FSH.System.getValue('buyBuffsGreeting').trim();
				var hasBuffTag = greetingText.indexOf('{buffs}') !== -1;
				var hasCostTag = greetingText.indexOf('{cost}') !== -1;
				greetingText = greetingText.replace(/{playername}/g, targetPlayer);
				if (!hasBuffTag) {
					greetingText += ' ' + buffsToBuy;
				} else {
					if (!hasCostTag) {
						greetingText = greetingText.replace(/{buffs}/g, '`~' + buffsToBuy + '~`');
					} else {
						greetingText = greetingText.replace(/{buffs}/g, '`~' + buffsToBuy + '~`').replace(/{cost}/g, FSH.System.getValue('buffCostTotalText'));
					}
				}

			window.openQuickMsgDialog(targetPlayer, greetingText, '');
		} else {
			alert('You have not selected any buffs!');
			return;
		}
	},

	addClickListener: function(id, listener) { // Native
		var node=document.getElementById(id);
		if (node) {node.addEventListener('click', listener, true);}
	},

	bioAddEventListener: function() { // Native
		FSH.profile.addClickListener('Helper:sendBuffMsg', FSH.profile.getBuffsToBuy);
		var i=0;
		while (true) {
			var buff=document.getElementById('Helper:buff'+i);
			if (buff) {
				buff.addEventListener('click', FSH.profile.toggleBuffsToBuy,true);
				i+= 1;
			} else {break;}
		}
		FSH.profile.addClickListener('Helper:bioExpander', FSH.profile.expandBio);
	},

	profileParseAllyEnemy: function() { // jquery
		// Allies/Enemies count/total function
		var alliesTotal = FSH.System.getValue('alliestotal');
		var alliesTitle = $('div#profileLeftColumn strong:contains("Allies")')
			.parent();
		var numberOfAllies = alliesTitle.next().find('img')
			.filter('[src*="/avatars/"],[src$="/skin/player_default.jpg"]')
			.length;
		alliesTitle.append('<span class="fshBlue">&nbsp;' + numberOfAllies +
			(alliesTotal && alliesTotal >= numberOfAllies ? '/' +
			alliesTotal : '') + '</span>');

		var enemiesTotal = FSH.System.getValue('enemiestotal');
		var enemiesTitle = $('div#profileLeftColumn strong:contains("Enemies")')
			.parent();
		var numberOfEnemies = enemiesTitle.next().find('img')
			.filter('[src*="/avatars/"],[src$="/skin/player_default.jpg"]')
			.length;
		enemiesTitle.append('<span class="fshBlue">&nbsp;' + numberOfEnemies +
			(enemiesTotal && enemiesTotal >= numberOfEnemies ? '/' +
			enemiesTotal : '') + '</span>');
	},

	profileInjectFastWearOld: function() { // Legacy
		// Fast Wear
		var itemHREF;
		var profileInventory = FSH.System.findNode('//table[tbody/tr/td/center/a[contains(@href,"subcmd=equipitem") or contains(@onclick,"subcmd=useitem")]]');
		var enableQuickDrink = FSH.System.getValue('enableQuickDrink');
		if (profileInventory) {
			var profileInventoryIDRE = /inventory_id=(\d+)/i;
			var foldersEnabled = FSH.System.findNode('//img[contains(@src,"folder_on.gif")]');

			var profileInventoryBox = [];
			var profileInventoryBoxItem = [];
			var profileInventoryBoxID = [];
			for (var i=0;i<12;i += 1) {
				if (foldersEnabled) {
					// TODO probably wants stripping out anyway
					/* jshint -W016 */ // Unexpected use of '>>'. (W016)
					if (profileInventory.rows[2*(i >> 2)]) {
						profileInventoryBox[i]=profileInventory.rows[2*(i >> 2)].cells[i % 4];
					}
				} else {
					if (profileInventory.rows[i >> 2]) {
						profileInventoryBox[i]=profileInventory.rows[i >> 2].cells[i % 4];
					}
				}
				if (profileInventoryBox[i]) {
					profileInventoryBoxItem[i] = profileInventoryBox[i].firstChild;
				}
				if (profileInventoryBoxItem[i]) {
					itemHREF = profileInventoryBoxItem[i].firstChild.getAttribute('href');
					if (itemHREF === '#') {
						itemHREF = /window.location = \'(.*)\'/.exec(profileInventoryBoxItem[i].firstChild.getAttribute('onclick'))[1];
					}
					if (itemHREF && profileInventoryIDRE.exec(itemHREF)) {
						profileInventoryBoxID[i] = profileInventoryIDRE.exec(itemHREF)[1];
					}
				}
			}

			var newRow;
			var newCell;
			var output;

			for (i=0;i<12;i += 1) {
				if (i % 4 === 0 && profileInventoryBoxItem[i] && !foldersEnabled) {
					newRow = profileInventory.insertRow(2*(i >> 2)+1);
				}
				if (i % 4 === 0 && profileInventoryBoxItem[i] && foldersEnabled) {
					newRow = profileInventory.insertRow(3*(i >> 2)+1);
				}
				/* jshint +W016 */
				if (profileInventoryBoxItem[i] && profileInventoryBoxID[i]) {
					itemHREF = profileInventoryBoxItem[i].firstChild.getAttribute('href');
					var itemOnClick = profileInventoryBoxItem[i].firstChild.getAttribute('onclick');
					if (itemHREF.indexOf('subcmd=equipitem') !== -1) { // check to see if item is equipable.
						output = '<span style="cursor:pointer; text-decoration:underline; color:blue; font-size:x-small;" '+
								'id="Helper:equipProfileInventoryItem' + profileInventoryBoxID[i] + '" ' +
								'itemID="' + profileInventoryBoxID[i] + '">Wear</span>';
						newCell = newRow.insertCell(i % 4);
						newCell.align = 'center';
						newCell.innerHTML = output;
						document.getElementById('Helper:equipProfileInventoryItem' + profileInventoryBoxID[i]).
							addEventListener('click', FSH.common.equipProfileInventoryItem, true);
					}
					else if (enableQuickDrink && itemOnClick && itemOnClick.indexOf('this potion') !== -1) { // check to see if item is useable (potion).
						output = '<span style="cursor:pointer; text-decoration:underline; color:blue; font-size:x-small;" '+
								'id="Helper:drinkProfileInventoryItem' + profileInventoryBoxID[i] + '" ' +
								'itemID="' + profileInventoryBoxID[i] + '">Drink</span>';
						newCell = newRow.insertCell(i % 4);
						newCell.align = 'center';
						newCell.innerHTML = output;
						document.getElementById('Helper:drinkProfileInventoryItem' + profileInventoryBoxID[i]).
							addEventListener('click', FSH.profile.drinkProfileInventoryItem, true);
					}
					else {
						newCell = newRow.insertCell(i % 4); // dummy cell if we don't put a wear link up.
					}
				} else if (profileInventoryBoxItem[i] && !profileInventoryBoxID[i]){
					newCell = newRow.insertCell(i % 4); // dummy cell if we don't put a wear link up.
				}
			}
		}
	},

	injectFastWear: function() { // jQuery
		$('div#backpack').css('height', '500');
		var theBackpack = $('#backpackContainer').data('backpack');
		var oldShow = theBackpack._showPage;
		theBackpack._showPage = function(type, page) {
			oldShow.call(theBackpack, type, page);
			FSH.profile.fastWearLinks();
		};
		if ($('span#backpack_current').text().length !== 0) {
			FSH.profile.fastWearLinks();
		}
	},

	fastWearLinks: function() { // jQuery
		var backpackContainer = $('div#backpackContainer');
		var theBackpack = backpackContainer.data('backpack');
		var backpackTab = $('div#backpackTab_' + theBackpack.type);
		var theDivs = $('div.backpackTabContent > div', backpackTab);
		theDivs.each(function() {
			var self = $(this);
			var myDiv = $('<div style="height: 20px;"/>');
			if (theBackpack.options.checkboxesEnabled) {
				myDiv.append($('input', self));
			}
			var theSpan = $('span', self)
				.not('.item_giftSelect')
				.not('.backpackEmptySlot');
			if (theSpan.length === 1) {
				if (theSpan.hasClass('backpackContextMenuEquippable')) {
					myDiv.prepend('<span class="fastWear" itemid="' +
						theSpan.data('inv') + '">Wear</span>&nbsp;');
				}
				if (theSpan.hasClass('backpackContextMenuUsable')) {
					myDiv.prepend('<span class="fastUse" itemid="' +
						theSpan.data('inv') + '">Use</span>&nbsp;');
				}
			}
			self.append(myDiv);
		});

		backpackContainer.on('click', 'span.fastWear', FSH.profile.fastWearEquip);
		backpackContainer.on('click', 'span.fastUse',
			FSH.profile.drinkProfileInventoryItem);

	},

// http://www.fallensword.com/index.php?cmd=profile&subcmd=equipitem&inventory_id=451287233&ajax=1
// {"r":0}

	fastWearEquip: function() {
		var self = $(this);
		var invId = self.attr('itemid');
		FSH.ajax.equipItem(invId).done(function(data) {
			if (data.r !== 0) {return;}
			FSH.profile.backpackRemove(invId);
			// TODO Insert item from worn
			self.parent().html('<span class="fastWorn">Worn</span>');
		});
	},

	backpackRemove: function(invId) {
		invId = parseInt(invId, 10);
		var theBackpack = $('div#backpackContainer').data('backpack');
		// remove from srcData
		var s = theBackpack.srcData.length;
		for (var i = 0; i < s; i += 1) {
			if (theBackpack.srcData[i].a === invId) {
				theBackpack.srcData.splice(i, 1);
				break;
			}
		}
	},

	drinkProfileInventoryItem: function(evt) { // Legacy
		var InventoryItemID=evt.target.getAttribute('itemID');
		FSH.System.xmlhttp('index.php?cmd=profile&subcmd=useitem&inventory_id=' + InventoryItemID,
			FSH.profile.drinkProfileInventoryItemReturnMessage,
			{'item': InventoryItemID, 'target': evt.target});
	},

	drinkProfileInventoryItemReturnMessage: function(responseText, callback) { // Native
		var target = callback.target;
		var info = FSH.Layout.infoBox(responseText);
		var itemCellElement = target.parentNode; //FSH.System.findNode('//td[@title="' + itemID + '"]');
		if (info === 'You successfully used the item!') {

			FSH.profile.backpackRemove(callback.item);

			itemCellElement.innerHTML = '<span style="color:green; font-weight:bold;">Drunk</span>';
		} else {
			itemCellElement.innerHTML = '<span style="color:red; font-weight:bold;">Error:' + info + '</span>';
		}
	},

	profileComponents: function() { // Legacy
		var injectHere = FSH.System.findNode('//strong[.="Components"]/ancestor::div[1]/following-sibling::div[1]');
		if (injectHere) {
			var componentExtrasDiv = document.createElement('DIV');
			injectHere.appendChild(componentExtrasDiv);
			componentExtrasDiv.innerHTML+='<div id=compDel align=center>[<span style="text-decoration:underline;cursor:pointer;color:#0000FF">Enable Quick Del</span>]</div>'+
				'<div id=compSum align=center>[<span style="text-decoration:underline;cursor:pointer;color:#0000FF">Count Components</span>]</div>'+
				'<div align=center><a href="index.php?cmd=notepad&blank=1&subcmd=quickextract">[<span style="text-decoration:underline;cursor:pointer;color:#0000FF">Quick Extract Components</span>]</a></div>' +
				'<div id=compDelAll align=center>[<span style="text-decoration:underline;cursor:pointer;color:#0000FF">Delete All Visible</span>]</div>';
			document.getElementById('compDel').addEventListener('click', FSH.profile.enableDelComponent, true);
			document.getElementById('compSum').addEventListener('click', FSH.profile.countComponent, true);
			document.getElementById('compDelAll').addEventListener('click', FSH.profile.delAllComponent, true);
			$('#compDelAll').hide();
		} else {
			console.log('Components div not found! Please let Yuuzhan know.');
		}
	},

	delAllComponent: function() { // jQuery
		$('span[id^=compDelBtn]').each(function() {$(this).click();});
	},

	countComponent: function() { // Legacy
		var compPage=FSH.System.findNodes('//a[contains(@href,"index.php?cmd=profile&component_page=")]');
		if (compPage) {
			FSH.Helper.compPage = compPage.length;
		} else {
			FSH.Helper.compPage = 0;
		}
		document.getElementById('compSum').innerHTML='Retrieve page: ';
		FSH.Helper.componentList={};
		FSH.System.xmlhttp('index.php?cmd=profile&component_page=0', FSH.profile.retriveComponent, 0);
	},

	retriveComponent: function(responseText, currentPage) { // Legacy
		var nextPage=currentPage+1;
		document.getElementById('compSum').innerHTML+=nextPage+', ';
		var doc=FSH.System.createDocument(responseText);
		$(responseText).find('a[href*="cmd\=profile\&subcmd\=destroycomponent\&component_id\="]').each(function() {

				var img=$(this).children(':first');
				var mouseover=$(img).data('tipped');
				var id=mouseover.match(/fetchitem.php\?item_id=(\d+)/)[1];
				if (FSH.Helper.componentList[id]) {
					FSH.Helper.componentList[id].count+= 1;
				} else {
					FSH.Helper.componentList[id] = {
						'count':1,
						'src':$(img).attr('src'),
						'onmouseover':mouseover
					};
				}
			});

		if (currentPage < FSH.Helper.compPage - 1) {
			FSH.System.xmlhttp('index.php?cmd=profile&component_page='+nextPage, FSH.profile.retriveComponent, nextPage);
		} else {
			var totalCount = FSH.System.findNodes('//td[contains(@background,"inventory/1x1mini.gif")]',doc);
			if (totalCount) {
				totalCount = totalCount.length;
			} else {totalCount = 0;}
			totalCount+=currentPage*50;
			var output='Component Summary<br/><table>';
			var usedCount=0;
			for (var id in FSH.Helper.componentList) {
				if (!FSH.Helper.componentList.hasOwnProperty(id)) { continue; }
				var comp=FSH.Helper.componentList[id];
				output+='<tr><td align=center><img src='+comp.src+' class="tipped" data-tipped-options=\'skin: "fsItem", ajax: true\' data-tipped=\''+comp.onmouseover+'\'></td><td>'+comp.count+'</td></tr>';
				usedCount+=comp.count;
			}
			output+='<tr><td align=center>Total:</td><td>'+usedCount+' / '+totalCount+'</td></tr></table>';
			document.getElementById('compSum').innerHTML=output;
		}
	},

	enableDelComponent: function() { // Legacy
		var nodes=FSH.System.findNodes('//a[contains(@href,"cmd=profile&subcmd=destroycomponent&component_id=")]');
		if (nodes) {
			for (var i=0;i<nodes.length;i += 1) {
				nodes[i].parentNode.innerHTML+='<span id=compDelBtn'+i+' compid='+
					nodes[i].getAttribute('href').match(/destroycomponent&component_id=(\d+)/i)[0]+
					' style="text-decoration:underline;cursor:pointer;color:#A0CFEC">Del</span>';
				document.getElementById('compDelBtn'+i).addEventListener('click',FSH.profile.delComponent,true);
			}
		}
		//~ document.getElementById('compDel').innerHTML='';
		$('#compDel').hide();
		$('#compDelAll').show();
	},

	delComponent: function(evt) { // Legacy
		var id=evt.target.getAttribute('compid');
		FSH.System.xmlhttp('index.php?cmd=profile&subcmd=destroycomponent&component_id='+id,
			function(responseText) {
				if (FSH.Layout.infoBox(responseText)==='Component destroyed.') {
					evt.target.parentNode.innerHTML='';
				} else {
					evt.target.innerHTML=FSH.Layout.infoBox(responseText);
				}
			});
	},

	injectBioWidgets: function() { // Legacy
		var textArea = FSH.System.findNode('//textarea[@id="textInputBox"]');
		//textArea.cols=100;
		var textAreaDev = textArea.parentNode;
		var bioPreviewHTML = FSH.System.convertTextToHtml(textArea.value);

		var previewDiv = document.createElement('DIV');
		textAreaDev.appendChild(previewDiv);
		previewDiv.innerHTML = '<table align="center" width="325" border="1"><tbody>' +
			'<tr><td style="text-align:center;color:#7D2252;background-color:#CD9E4B">Preview</td></tr>' +
			'<tr><td align="left" width="325"><span style="font-size:small;" findme="biopreview">' + bioPreviewHTML +
			'</span></td></tr></tbody></table>';
		//Add description text for the new tags
		var advancedEditing = FSH.System.findNode('//div[h2[.="Advanced Editing:"]]');
		/* TODO: Add a way to hide the advanced editing 'note' box dynamically.
		advancedEditing.addEventListener('mouseover', function(event) {
			event.target.style.backgroundColor = '#8EE5EE';
		}, false);
		advancedEditing.addEventListener('mouseout', function(event) {
			event.target.style.backgroundColor = '';
		}, false);*/
		var advancedEditingDiv = document.createElement('DIV');
		advancedEditing.appendChild(advancedEditingDiv);
		advancedEditingDiv.style.align = 'left';
		advancedEditingDiv.innerHTML += '`~This will allow FSH Script users to select buffs from your bio~`<br/>' +
			'You can use the [cmd] tag as well to determine where to put the "Ask For Buffs" button<br/><br/>' +
			'&nbsp;&nbsp;&nbsp;- Note 1: The ` and ~ characters are on the same key on QWERTY keyboards. ` is <b>NOT</b> an apostrophe.<br/>' +
			'&nbsp;&nbsp;&nbsp;- Note 2: Inner text will not contain special characters (non-alphanumeric).<br/>' +
			'&nbsp;&nbsp;&nbsp;- P.S. Be creative with these! Wrap your buff pack names in them to make buffing even easier!';
		var bioEditLinesDiv = document.createElement('DIV');
		advancedEditing.appendChild(bioEditLinesDiv);
		textArea.rows = FSH.System.getValue('bioEditLines');
		textArea.style.resize='none';
		bioEditLinesDiv.innerHTML += ' Display <input id="Helper:linesToShow"' +
			' type="number" min="0" max="99" value="' + FSH.System.getValue('bioEditLines') +
			'"/> Lines' +
		// ' <input type="button" style="display:none" id="Helper:saveLines" value="Update Rows To Show" class="custombutton"/>';
		' <input type="button" id="Helper:saveLines" value="Update Rows To Show" class="custombutton"/>';
		document.getElementById('Helper:saveLines').addEventListener('click',
			function() {
				var theBox = document.getElementById('Helper:linesToShow');
				if (isNaN(parseInt(theBox.value, 10)) ||
					parseInt(theBox.value, 10) < '0' ||
					parseInt(theBox.value, 10) > '99') {return;}
				FSH.System.setValue('bioEditLines', parseInt(theBox.value, 10));
				location.reload();
			}, true);

		document.getElementById('textInputBox').addEventListener('keyup', FSH.profile.updateBioCharacters, true);
		//Force the preview area to render
		FSH.profile.updateBioCharacters(null);
	},

	updateBioCharacters: function() { // Legacy
		FSH.Helper.buffCost={'count':0,'buffs':{}};
		var textArea = FSH.System.findNode('//textarea[@id="textInputBox"]');
		var previewArea = FSH.System.findNode('//span[@findme="biopreview"]');
		var bioContents = FSH.System.convertTextToHtml(textArea.value);

		bioContents=bioContents.replace(/\{b\}/g,'`~').replace(/\{\/b\}/g,'~`');
		var buffs=bioContents.match(/`~([^~]|~(?!`))*~`/g);
		if (buffs) {
			for (var i=0;i<buffs.length;i += 1) {
				var fullName=buffs[i].replace(/(`~)|(~`)|(\{b\})|(\{\/b\})/g,'');
				var cbString =
					'<span id="Helper:buff'+i+'" style="color:blue;cursor:pointer">'+
					fullName+'</span>';
				bioContents=bioContents.replace(buffs[i], cbString);
			}

			if (bioContents.indexOf('[cmd]') < 0) {bioContents+='[cmd]';}

			bioContents = bioContents.replace('[cmd]','<input id="Helper:sendBuffMsg" subject="buffMe" href="index.php?cmd=message&target_player=" class="custombutton" type="submit" value="Ask For Buffs"/>' +
			'<span id=buffCost style="color:red"></span>');
			previewArea.innerHTML = bioContents;

			for (i=0;i<buffs.length;i += 1) {
				var buff=document.getElementById('Helper:buff'+i);
				if (buff) {
					buff.addEventListener(
						'click',
						FSH.profile.toggleBuffsToBuy,
						true
					);
				}
			}
		}
	},

};

FSH.logs = { // Legacy

	guildChat: function() {
		FSH.logs.addChatTextArea();
		FSH.logs.addLogColoring('Chat', 0);
	},

	guildLog: function() {
		FSH.logs.addLogColoring('GuildLog', 1);
		FSH.logs.addGuildLogWidgets();
	},

	outbox: function() {
		FSH.logs.addLogColoring('OutBox', 1);
	},

	playerLog: function() {
		FSH.logs.addLogColoring('PlayerLog', 1);
		FSH.logs.addLogWidgets();
	},

	addLogColoring: function(logScreen, dateColumn) { // Legacy
		if (!FSH.System.getValue('enableLogColoring')) {return;}
		var lastCheckScreen = 'last' + logScreen + 'Check';
		var localLastCheckMilli = FSH.System.getValue(lastCheckScreen);
		if (!localLastCheckMilli) {
			localLastCheckMilli = Date.now();
		}
		var chatTable = FSH.System.findNode('//table[@class="width_full"]');
		if (!chatTable) {chatTable = FSH.System.findNode('//table[tbody/tr/td[.="Message"]]');}
		if (!chatTable) {chatTable = FSH.System.findNode('//table[tbody/tr/td/span[contains(.,"Currently showing:")]]');} //personal log
		if (!chatTable) {return;}

		chatTable.style.tableLayout = 'fixed';
		chatTable.style.wordWrap = 'break-word';

		var localDateMilli = Date.now();
		var gmtOffsetMinutes = (new Date()).getTimezoneOffset();
		var gmtOffsetMilli = gmtOffsetMinutes * 60 * 1000;
		var newRow = chatTable.insertRow(1);
		newRow.insertCell(0);
		for (var i = 2; i < chatTable.rows.length; i += 2) {
			var aRow = chatTable.rows[i];
			var addBuffTag = true;
			if (aRow.cells[0].innerHTML) {
				var cellContents = aRow.cells[dateColumn].innerHTML;
				if (logScreen !== 'Chat') {
					cellContents = cellContents.substring(6,23); // fix for player log screen.
				}
				var postDateAsDate = FSH.System.parseDate(cellContents);
				var postDateAsLocalMilli = postDateAsDate.getTime() - gmtOffsetMilli;
				var postAge = (localDateMilli - postDateAsLocalMilli)/(1000*60);
				if (postDateAsLocalMilli > localLastCheckMilli) {
					aRow.style.backgroundColor = '#F5F298';
				}
				else if (postAge > 20 && postDateAsLocalMilli <= localLastCheckMilli) {
					aRow.style.backgroundColor = '#CD9E4B';
					addBuffTag = false;
				}
				if (logScreen === 'Chat' && addBuffTag) {
					var playerIDRE = /player_id=(\d+)/;
					var playerID = playerIDRE.exec(aRow.cells[1].innerHTML)[1];
					aRow.cells[1].innerHTML += ' <a style="color:blue;font-size:10px;" ' +
						FSH.Layout.quickBuffHref(playerID) + '>[b]</a>';
				}
			}
		}
		FSH.System.setValue(lastCheckScreen, Date.now());
	},

	addChatTextArea: function() { //jquery
		if (!FSH.System.getValue('enhanceChatTextEntry')) {return;}
		$('div#pCC form').first().attr('id', 'dochat');
		$('div#pCC input').slice(0, 7).each(function() {
			$(this).attr('form', 'dochat');
		});
		var theTable = $('div#pCC table table').first();
		theTable.append('<tr id="fshMass"></tr>');
		$('td', theTable).eq(0).remove();
		var btnMass = $('input[value="Send As Mass"]', theTable);
		if (btnMass.length === 1 ) {
			btnMass.appendTo('tr#fshMass', theTable);
		}
		var ourTd = $('td', theTable).eq(0);
		ourTd.attr('rowspan', '2');
		$('input', ourTd).replaceWith('<textarea id="fshTxt" name="msg" cols' +
			'="72" rows="2" form="dochat" style="resize: none"></textarea>');
		var fshTxt = $('#fshTxt', ourTd);
		fshTxt.keydown(function(e) {
			if (e.keyCode === 13 && fshTxt.val() !== '') {
				$('input[value=Send]', theTable).click();
				return false;
			}
		});
	},

	addLogWidgets: function() { // jQuery
		$.when(
			FSH.ajax.getMembrList(false),
			FSH.ajax.myStats(false)
		).done(FSH.logs.addLogWidgetsOld);
	},

	addLogWidgetsOld: function() { // Legacy
		var i;
		var playerElement;
		var playerName;
		var dateHTML;
		var addAttackLinkToLog = FSH.System.getValue('addAttackLinkToLog');
		var logTable = FSH.System.findNode('//table[tbody/tr/td/span[contains' +
			'(.,"Currently showing:")]]');
		if (!logTable) {return;}
		var memberNameString = Object.keys(FSH.Helper.membrList);
		var profile = FSH.Helper.profile[FSH.Helper.myUsername];
		var listOfAllies = profile._allies.map(function(obj) {
			return obj.username;});
		var listOfEnemies = profile._enemies.map(function(obj) {
			return obj.username;});
		var showPvPSummaryInLog = FSH.System.getValue('showPvPSummaryInLog');
		var messageType;
		for (i=0;i<logTable.rows.length;i += 2) {
			var aRow = logTable.rows[i];
			if (i === 0 ) {
				var messageNameCell = aRow.cells[2];
				if (messageNameCell) {
					messageNameCell.innerHTML += '&nbsp;&nbsp;<span style="' +
						'color:white;">(Guild mates show up in <span style="' +
						'color:green;">green</span>)</span>';
				}
				continue;
			}
			if (!aRow.cells[0].innerHTML) {continue;}
			var firstCell = aRow.cells[0];
			//Valid Types: General, Chat, Guild
			messageType = firstCell.firstChild.getAttribute('oldtitle');
			if (!messageType) {return;}
			var colorPlayerName = false;
			var isGuildMate = false;
			if (messageType === 'Chat') {
				playerElement = aRow.cells[2].firstChild;
				playerName = playerElement.innerHTML;
				colorPlayerName = true;
			}
			if ((messageType === 'General' ||
				messageType === 'Notification') &&
				aRow.cells[2].firstChild.nextSibling &&
				aRow.cells[2].firstChild.nextSibling.nodeName === 'A' &&
				aRow.cells[2].firstChild.nextSibling.getAttribute('href')
					.search('player_id') !== -1) {
				playerElement = aRow.cells[2].firstChild.nextSibling;
				playerName = playerElement.innerHTML;
				colorPlayerName = true;
			}
			if (colorPlayerName) {
				if (memberNameString.indexOf(playerName) !== -1) {
					playerElement.style.color='green';
					isGuildMate = true;
				}
				if (listOfEnemies.indexOf(playerName) !== -1) {
					playerElement.style.color='red';
				}
				if (listOfAllies.indexOf(playerName) !== -1) {
					playerElement.style.color='blue';
				}
			}
			if (messageType === 'Chat') {
				FSH.logs.doChat(aRow, isGuildMate, playerName, addAttackLinkToLog);
			}
			if (messageType === 'Notification') {
				if (aRow.cells[2].firstChild.nextSibling && aRow.cells[2].firstChild.nextSibling.nodeName === 'A') {
					if (aRow.cells[2].firstChild.nextSibling.getAttribute('href').search('player_id') !== -1) {
						if (!isGuildMate) {
							dateHTML = aRow.cells[1].innerHTML;
							var dateExtraText = '<nobr><span style="font-size:x-small;">[ <a title="Add to Ignore List" href="index.php?cmd=log&subcmd=doaddignore&ignore_username=' + playerName +
							'">Ignore</a> ]</span></nobr>';
							aRow.cells[1].innerHTML = aRow.cells[1].innerHTML + '<br>' + dateExtraText;
						}
						var buffingPlayerIDRE = /player_id=(\d+)/;
						var buffingPlayerID = buffingPlayerIDRE.exec(aRow.cells[2].innerHTML)[1];
						var buffingPlayerName = aRow.cells[2].firstChild.nextSibling.innerHTML;
						var extraText = ' <span style="font-size:x-small;"><nobr>[ <span style="cursor:pointer;text-decoration:underline" class="a-reply" target_player="'+buffingPlayerName+
							'">Reply</span> | <a href="index.php?cmd=trade&target_player=' + buffingPlayerName +
							'">Trade</a> | <a title="Secure Trade" href="index.php?cmd=trade&subcmd=createsecure&target_username=' + buffingPlayerName +
							'">ST</a>';
						extraText += ' | <a ' + FSH.Layout.quickBuffHref(buffingPlayerID) + '>Buff</a>';
						if (addAttackLinkToLog) {
							extraText += ' | <a href="index.php?cmd=attackplayer&target_username=' + buffingPlayerName +'">Attack</a>';
						}
						extraText += ' ]</nobr></span>';

						aRow.cells[2].innerHTML += extraText;
					}
				}
			}

			//add PvP combat log summary
			if (messageType === 'Combat' &&
				aRow.cells[2] &&
				showPvPSummaryInLog &&
				aRow.cells[2].innerHTML.search('combat_id=') !== -1) {
				var combatID = /combat_id=(\d+)/.exec(aRow.cells[2].innerHTML)[1];
				var combatSummarySpan = document.createElement('SPAN');
				combatSummarySpan.style.color = 'gray';
				aRow.cells[2].appendChild(combatSummarySpan);
				FSH.System.xmlhttp('index.php?cmd=combat&subcmd=view&combat_id=' +
					combatID, FSH.logs.retrievePvPCombatSummary,
					{'target': combatSummarySpan});
			}
		}
		$('.a-reply').click(function(evt) {
			window.openQuickMsgDialog(evt.target.getAttribute('target_player'),
				'', evt.target.getAttribute('replyTo'));
		});
	},

	doChat: function(aRow, isGuildMate, playerName, addAttackLinkToLog) { // Native
		var buffList = FSH.Data.buffList;
		var dateHTML = aRow.cells[1].innerHTML;
		var dateFirstPart = dateHTML
			.substring(0, dateHTML.indexOf('>Report') + 7);
		var dateLastPart = dateHTML.
			substring(dateHTML.indexOf('Message</a>') + 11, dateHTML.length);
		var extraPart = '';
		if (!isGuildMate) {
			extraPart = ' | <a title="Add to Ignore List" href="index.php?cmd' +
				'=log&subcmd=doaddignore&ignore_username=' + playerName +
				'">Ignore</a>';
		}
		aRow.cells[1].innerHTML = dateFirstPart + '</a>' + extraPart +
			dateLastPart;

		var messageHTML = aRow.cells[2].innerHTML;
		var firstPart = messageHTML.substring(0, messageHTML.indexOf('<small>') + 7);
		// var secondPart = messageHTML.substring(messageHTML.indexOf('<small>') + 7, messageHTML.indexOf('>Reply</a>') + 10);
		var thirdPart = messageHTML.substring(messageHTML.indexOf('>Reply</a>') + 10, messageHTML.indexOf('>Buff</a>') + 9);
		var targetPlayerID = /quickBuff\((\d+)\)/.exec(thirdPart)[1];
		thirdPart = ' | <a ' + FSH.Layout.quickBuffHref(targetPlayerID) + '>Buff</a></span>';
		var fourthPart = messageHTML.substring(messageHTML.indexOf('>Trade</a>') + 10, messageHTML.indexOf('</small>'));
		var lastPart = messageHTML.substring(messageHTML.indexOf('</small>'), messageHTML.length);
		extraPart = ' | <a href="index.php?cmd=trade&target_player=' + playerName + '">Trade</a> | ' +
			'<a title="Secure Trade" href="index.php?cmd=trade&subcmd=createsecure&target_username=' + playerName +
			'">ST</a>';

		var attackPart = '';
		if (addAttackLinkToLog) {
			attackPart = ' | <a href="index.php?cmd=attackplayer&target_username=' + playerName +'">Attack</a>';
		}

		var buffsSent = aRow.cells[2].innerHTML.match(/`~.*?~`/);
		var quickBuff = '';
		if (buffsSent) {
			buffsSent = buffsSent[0].replace('`~','').replace('~`', '').split(',');
			var theBuffPack = FSH.System.getValueJSON('buffpack');
			for (var j = 0; j < buffsSent.length; j += 1) {
				var bBuffFound = false;
				for (var m = 0; m < buffList.length; m += 1) {
					var nicks = buffList[m].nicks.split(',');
					var exitOuter = false;

					for (var k = 0; k < nicks.length; k += 1) {
						if (buffsSent[j].toLowerCase().trim() === nicks[k].toLowerCase().trim()) {

							quickBuff += m + ';';
							exitOuter = true;
							bBuffFound = true;
							break;

						}
					}
					if (exitOuter) {
						break;
					}
				}
				if (!bBuffFound) {

					if (!theBuffPack) {continue;}

					if (!theBuffPack.nickname) { //avoid bugs if the new array is not populated yet
						theBuffPack.nickname = {};
					}
					if (!theBuffPack.staminaTotal) { //avoid bugs if the new array is not populated yet
						theBuffPack.staminaTotal = {};
					}

					for (var idx = 0; idx < theBuffPack.size; idx += 1) {
						var nickname = theBuffPack.nickname[idx]? theBuffPack.nickname[idx]:'';
						if (nickname.toLowerCase().trim() === buffsSent[j].toLowerCase().trim()) {
							//131 is the number of buffs in the game currently. When they add new buffs, this will need to be updated, along with the fsFSH.Data.buffList variable!
							quickBuff += 131+idx + ';';
							break;
						}
					}
				}
			}
			thirdPart = ' | <a ' + FSH.Layout.quickBuffHref(targetPlayerID, quickBuff) + '>Buff</a></span>';
		}

		//var msgReplyTo = (FSH.System.getValue('enableChatParsing') === true) ? secondPart.replace(/'([^']*?)'/, secondPart.match(/'([^']*?)'/)[1] + '&replyTo="' +
		// FSH.Helper.removeHTML(firstPart.replace(/&nbsp;/g, '')).replace(/[\s*]/g, '_') + '"') : secondPart;
		var msgReplyTo = '[ <span style="cursor:pointer;text-' +
			'decoration:underline"class="a-reply" target_player="' +
			playerName + '" replyTo="' +
			(FSH.System.getValue('enableChatParsing') ?
			FSH.System.removeHTML(firstPart.replace(/&nbsp;/g, ' '))
			.substr(0, 140) : '') + '...">Reply</span>';
		aRow.cells[2].innerHTML = firstPart + '<nobr>' + msgReplyTo +
			extraPart + thirdPart + attackPart + fourthPart +
			'</nobr>' + lastPart;
	},

	retrievePvPCombatSummary: function(responseText, callback) { // Native
		// var doc = FSH.System.createDocument(responseText);
		var winner = FSH.System.getIntFromRegExp(responseText, /var\s+winner=(-?[0-9]+);/i);
		var xpGain = FSH.System.getIntFromRegExp(responseText, /var\s+xpGain=(-?[0-9]+);/i);
		var goldGain = FSH.System.getIntFromRegExp(responseText, /var\s+goldGain=(-?[0-9]+);/i);
		var prestigeGain = FSH.System.getIntFromRegExp(responseText, /var\s+prestigeGain=(-?[0-9]+);/i);
		var goldStolen = FSH.System.getIntFromRegExp(responseText, /var\s+goldStolen=(-?[0-9]+);/i);
		var pvpRatingChange = FSH.System.getIntFromRegExp(responseText, /var\s+pvpRatingChange=(-?[0-9]+);/i);
		var output = '<br> ';
		if (xpGain !== 0) {
			output += 'XP stolen:<span style="color:' +
				(winner === 1 ? 'green' : 'red') + ';">' +
				FSH.System.addCommas(xpGain) + ' </span>';
		}
		if (goldGain !== 0) {
			output += 'Gold lost:<span style="color:' +
				(winner === 1 ? 'green' : 'red') + ';">' +
				FSH.System.addCommas(goldGain) + ' </span>';
		}
		if (goldStolen !== 0) {
			output += 'Gold stolen:<span style="color:' +
				(winner === 1?'green':'red') + ';">' +
				FSH.System.addCommas(goldStolen) + ' </span>';
		}
		if (prestigeGain !== 0) {
			output += 'Prestige gain:<span style="color:' +
				(winner === 1?'green':'red') + ';">' +
				prestigeGain + ' </span>';
		}
		if (pvpRatingChange !== 0) {
			output += 'PvP change:<span style="color:' +
			(winner === 1 ? 'green' : 'red') + ';">' +
			pvpRatingChange + ' </span>';
		}
		callback.target.innerHTML = output;
	},

	addGuildLogWidgets: function() { // Legacy
		var node=FSH.System.findNode('//font[@size=3]/b[contains(.,"s Log")]/..');
		if (node) {
			node.innerHTML += ' [ <a href="index.php?cmd=notepad&blank=1&' +
			'subcmd=guildlog">Guild Log Summary</a> ]';
		}
		if (!FSH.System.getValue('hideNonPlayerGuildLogMessages')) {return;}
		var playerId = FSH.Layout.playerId();
		var logTable = FSH.System.findNode('//table[tbody/tr/td[.="Message"]]');
		var hideNextRows = 0;
		for (var i=0;i<logTable.rows.length;i += 1) {
			var aRow = logTable.rows[i];
			var firstPlayerID = 0;
			var secondPlayerID = 0;
			if (i !== 0) {
				if (hideNextRows>0) {
					//aRow.style.display = 'none';
					hideNextRows -= 1;
				}
				if (aRow.cells[0].innerHTML) {
					var messageHTML = aRow.cells[2].innerHTML;
					var doublerPlayerMessageRE = /member\s<a\shref="index.php\?cmd=profile\&amp;player_id=(\d+)/;
					var secondPlayer = doublerPlayerMessageRE.exec(messageHTML);
					var singlePlayerMessageRE = /<a\shref="index.php\?cmd=profile\&amp;player_id=(\d+)/;
					var firstPlayer = singlePlayerMessageRE.exec(messageHTML);
					if (secondPlayer) {
						firstPlayerID = firstPlayer[1]*1;
						secondPlayerID = secondPlayer[1]*1;
					}
					if (firstPlayer && !secondPlayer) {
						firstPlayerID = firstPlayer[1]*1;
					}
					if (firstPlayer && firstPlayerID !== playerId && secondPlayerID !== playerId) {
						//aRow.style.display = 'none';
						aRow.style.fontSize = 'x-small';
						aRow.style.color = 'gray';
						hideNextRows = 3;
					}
					if (aRow.cells[2].textContent.charAt(0) === '\'' || aRow.cells[2].textContent.search('has invited the player') !== -1) {
						var message = aRow.cells[2].innerHTML;
						var firstQuote = message.indexOf('\'');
						var firstPart = '';
						firstPart = message.substring(0,firstQuote);
						var secondQuote = message.indexOf('\'',firstQuote+1);
						var targetPlayerName = message.substring(firstQuote+1,secondQuote);
						aRow.cells[2].innerHTML = firstPart + '\'' +
							'<a href="index.php?cmd=findplayer&search_active=1&search_level_max=&search_level_min=&search_username=' + targetPlayerName + '&search_show_first=1">' + targetPlayerName + '</a>' +
							message.substring(secondQuote, message.length);
					}
				}
			}
			else {
				var messageNameCell = aRow.firstChild.nextSibling.nextSibling.nextSibling;
				if (messageNameCell) {
					messageNameCell.innerHTML += '&nbsp;&nbsp;<font style="' +
						'color:white;">(Guild Log messages not involving ' +
						'self are dimmed!)</font>';
				}
			}

		}
	},

};

FSH.lists = { // Native

	injectAuctionSearch: function(content) { // Native
		if (!content) {content = FSH.Layout.notebookContent();}
		content.innerHTML=FSH.Layout.makePageHeader('Trade Hub Quick Search','','','')+
			'<div class=content>This screen allows you to set up some quick search templates for the Auction House. '+
				'The Display on AH column indicates if the quick search will show on the short list on the '+
				'Auction House main screen. A maximum of 36 items can show on this list '+
				'(It will not show more than 36 even if you have more than 36 flagged). '+
				'To edit items, either use the large text area below, '+
				'or add a new entry and delete the old one. You can always reset the list to the default values.</div>'+
			'<div style="font-size:small;" id="Helper:Auction Search Output">' +
			'</div>';
		// global parameters for the meta function generateManageTable
		FSH.Helper.param={};
		FSH.Helper.param={'id':'Helper:Auction Search Output',
			'headers':['Category','Nickname','Quick Search Text','Display in AH?'],
			'fields':['category','nickname','searchname','displayOnAH'],
			'tags':['textbox','textbox','textbox','checkbox'],
			'url':['','','index.php?cmd=auctionhouse&type=-1&search_text=@replaceme@',''],
			'currentItems':FSH.System.getValueJSON('quickSearchList'),
			'gmname':'quickSearchList',
			'sortField':'category',
			'categoryField':'category',
			'showRawEditor':true};
		FSH.lists.generateManageTable();
	},

	injectQuickLinkManager: function(content) { // Native

		if (!content) {content = FSH.Layout.notebookContent();}
		content.innerHTML=FSH.Layout.makePageTemplate('Quick Links','','','','quickLinkAreaId');

		// global parameters for the meta function generateManageTable
		FSH.Helper.param={};
		FSH.Helper.param={'id':'quickLinkAreaId',
			'headers':['Name','URL','New [<span style="cursor:pointer; text-decoration:underline;" title="Open page in a new window">?</span>]'],
			'fields':['name','url','newWindow'],
			'tags':['textbox','textbox','checkbox'],
			'currentItems':FSH.System.getValueJSON('quickLinks'),
			'gmname':'quickLinks',
			'showRawEditor':true};
		FSH.lists.generateManageTable();
	},

	generateManageTable: function() { // Native
		var i, j, result='<table cellspacing=2 cellpadding=2 style="table-layout: fixed; word-wrap: break-word;" width=100%><tr bgcolor=#CD9E4B>';
		var isArrayOnly= FSH.Helper.param.fields.length === 0;
		for (i=0;i<FSH.Helper.param.headers.length;i += 1) {
			result+='<th>'+FSH.Helper.param.headers[i]+'</th>';
		}
		result+='<th>Action</th></tr>';
		var currentCategory = '';
		for (i=0;i<FSH.Helper.param.currentItems.length;i += 1) {
			result+='<tr>';
			if (isArrayOnly) {
				result+='<td align=center>'+FSH.Helper.param.currentItems[i]+'</td>';
			} else {
				if (FSH.Helper.param.categoryField && currentCategory !== FSH.Helper.param.currentItems[i][FSH.Helper.param.categoryField]) {
					currentCategory = FSH.Helper.param.currentItems[i][FSH.Helper.param.categoryField];
					result += '<td><span style="font-weight:bold; font-size:large;">' + currentCategory + '</span></td></tr><tr>';
				}
				for (j=0;j<FSH.Helper.param.fields.length;j += 1) {
					result+='<td align=center class=content>';
					if (FSH.Helper.param.fields[j]!==FSH.Helper.param.categoryField){
						if (FSH.Helper.param.tags[j]==='checkbox'){
							result+='<input type=checkbox '+(FSH.Helper.param.currentItems[i][FSH.Helper.param.fields[j]]?'checked':'')+' disabled>';
						} else {
							if (FSH.Helper.param.url && FSH.Helper.param.url[j] !== ''){
								result+='<a href="'+FSH.Helper.param.url[j].replace('@replaceme@',FSH.Helper.param.currentItems[i][FSH.Helper.param.fields[j]])+'">'+
									FSH.Helper.param.currentItems[i][FSH.Helper.param.fields[j]]+'</a>';
							} else {
								result+=FSH.Helper.param.currentItems[i][FSH.Helper.param.fields[j]];
							}
						}
					result+='</td>';
					}
				}
			}
			result+='<td><span class=HelperTextLink itemId="' + i + '" id="Helper:DeleteItem' + i + '">[Del]</span></td></tr>';
		}
		result+='<tr>';
		if (isArrayOnly){
			result+='<td align=center><input type='+FSH.Helper.param.tags[i]+' class=custominput id=Helper:input0></td>';
		}
		else {
			for (i=0;i<FSH.Helper.param.tags.length;i += 1){
				result+='<td align=center><input type='+FSH.Helper.param.tags[i]+' class=custominput id=Helper:input'+FSH.Helper.param.fields[i]+'></td>';
			}
		}
		result+='<td><span class=HelperTextLink id="Helper:AddItem">[Add]</span></td></tr></table>';

		if (FSH.Helper.param.showRawEditor) {
			result+='<table width=100%><tr><td align=center><textarea cols=70 rows=20 name="Helper:rawEditor">' +
				JSON.stringify(FSH.Helper.param.currentItems) + '</textarea></td></tr>'+
				'<tr><td align=center><input id="Helper:saveRawEditor" type="button" value="Save" class="custombutton">'+
				'&nbsp;<input id="Helper:resetRawEditor" type="button" value="Reset" class="custombutton"></td></tr>'+
				'</tbody></table>';
		}

		document.getElementById(FSH.Helper.param.id).innerHTML = result;
		for (i=0;i<FSH.Helper.param.currentItems.length;i += 1) {
			document
				.getElementById('Helper:DeleteItem' + i)
				.addEventListener('click', FSH.lists.deleteQuickItem, true);
		}
		document.getElementById('Helper:AddItem').addEventListener('click', FSH.lists.addQuickItem, true);
		if (FSH.Helper.param.showRawEditor) {
			document.getElementById('Helper:saveRawEditor').addEventListener('click', FSH.lists.saveRawEditor, true);
			document.getElementById('Helper:resetRawEditor').addEventListener('click', FSH.lists.resetRawEditor, true);
		}

		FSH.System.setValueJSON(FSH.Helper.param.gmname, FSH.Helper.param.currentItems);
	},

	deleteQuickItem: function(evt) { // Native
		// if (!window.confirm('Are you sure you want to delete this link?')) {return;}
		var itemId = evt.target.getAttribute('itemId');
		FSH.Helper.param.currentItems.splice(itemId, 1);
		FSH.lists.generateManageTable();
	},

	addQuickItem: function() { // Native
		var isArrayOnly= FSH.Helper.param.fields.length === 0;
		var newItem={};
		if (isArrayOnly) {
			newItem=document.getElementById('Helper:input0').value;
		} else {
			for (var i=0;i<FSH.Helper.param.fields.length;i += 1){
				if (FSH.Helper.param.tags[i]==='checkbox') {
					newItem[FSH.Helper.param.fields[i]] =
						document.getElementById('Helper:input' +
							FSH.Helper.param.fields[i]).checked;
				} else {
					newItem[FSH.Helper.param.fields[i]] =
						document.getElementById('Helper:input' +
							FSH.Helper.param.fields[i]).value;
				}
			}
		}
		FSH.Helper.param.currentItems.push(newItem);
		FSH.lists.generateManageTable();
	},

	saveRawEditor: function() { // jQuery
		FSH.Helper.param.currentItems =
			JSON.parse($('textarea[name="Helper:rawEditor"]').val());
		FSH.lists.generateManageTable();
	},

	resetRawEditor: function() { // Native
		if (location.search === '?cmd=notepad&blank=1&subcmd=auctionsearch') {
			FSH.Helper.param.currentItems =
				JSON.parse(FSH.Data.defaults.quickSearchList);
		} else {FSH.Helper.param.currentItems=[];}
		FSH.lists.generateManageTable();
	},

};

FSH.recipes = { // Legacy

	inventing: function() { // Native
		FSH.recipes.injectViewRecipe();
		FSH.recipes.injectInvent();
	},

	injectViewRecipe: function() { // Legacy
		var recipe = $('div#pCC table table b').first();
		var name = recipe.html();
		var searchName = recipe.html().replace(/ /g, '%20');
		recipe.html('<a href="http://guide.fallensword.com/index.php?cmd=' +
			'items&subcmd=view&search_name=' + searchName + '">' + name +
			'</a>');

		var components = FSH.System.findNodes('//b[.="Components Required"]/../../following-sibling::tr[2]//img');
		if (components) {
			for (var i = 0; i < components.length; i += 1) {
				var mo = components[i].getAttribute('data-tipped');
				FSH.System.xmlhttp(FSH.recipes.linkFromMouseoverCustom(mo), FSH.recipes.injectViewRecipeLinks, components[i]);
				var componentCountElement = components[i].parentNode.parentNode.parentNode.nextSibling.firstChild;
				componentCountElement.innerHTML = '<nobr>' + componentCountElement.innerHTML + '</nobr>';
			}
		}
	},

	linkFromMouseoverCustom: function(mouseOver) { // Native
		var reParams =/item_id=(\d+)\&inv_id=([-0-9]*)\&t=(\d+)\&p=(\d+)\&vcode=([a-z0-9]*)/i;
		var reResult =reParams.exec(mouseOver);
		if (reResult === null) {
			return null;
		}
		var itemId   = reResult[1];
		var invId    = reResult[2];
		var type     = reResult[3];
		var pid      = reResult[4];
		var vcode    = reResult[5];
		var theUrl   = 'fetchitem.php?item_id=' + itemId + '&inv_id=' + invId + '&t='+type + '&p=' + pid + '&vcode=' + vcode;
		theUrl = FSH.System.server + theUrl;
		return theUrl;
	},

	injectViewRecipeLinks: function(responseText, callback) { // Legacy
		var itemRE = /<b>([^<]+)<\/b>/i;
		var itemName = itemRE.exec(responseText);
		if (itemName) {itemName=itemName[1];}
		//~ var plantFromComponent = FSH.Data.plantFromComponent(itemName);
		var plantFromComponent = FSH.Data.plantFromComponent[itemName] || itemName;
		if (itemName !== plantFromComponent) {
			var itemLinks = document.createElement('td');
			itemLinks.innerHTML = '<a href="' + FSH.System.server +
				'?cmd=auctionhouse&type=-1&order_by=1&search_text=' +
				encodeURI(plantFromComponent) + '">AH</a>';
			var counter=FSH.System.findNode('../../../../tr[2]/td', callback);
			counter.setAttribute('colspan', '2');
			callback.parentNode.parentNode.parentNode.appendChild(itemLinks);
		}
	},

	injectInvent: function(){ // Bad jQuery
		var selector = '<tr><td align="center">Select how many to quick ' +
			'invent<input value=1 id="invent_amount" name="invent_amount" ' +
			'size=3 class="custominput"></td></tr>' +
			'<tr><td align="center"><input id="quickInvent" value="Quick ' +
			'invent items" class="custombutton" type="submit"></td></tr>' + //button to invent
			//'<input type="hidden" id="recipe_id" value="'+ recipeID +'">'+
			'<tr><td colspan=6 align="center"><span id="invet_Result_label">' +
			'</span><ol id="invent_Result"></ol></td></tr>';
		//injectHere.parentNode.innerHTML+=selector;
		$('input[name="recipe_id"]').closest('tbody').append(selector);
		document.getElementById('quickInvent').addEventListener('click',
			FSH.recipes.quickInvent, true);

	},

	quickInvent: function() { // Legacy
		var amountToInvent = $('#invent_amount').attr('value');
		var recipeID = $('input[name="recipe_id"]').attr('value');
		$('#invet_Result_label').html('Inventing ' + amountToInvent + ' Items');
		for (var i = 0; i < amountToInvent; i += 1) {
			//Had to add &fsh=i to ensure that the call is sent out multiple times.
			FSH.System.xmlhttp(
				'index.php?cmd=inventing&subcmd=doinvent&recipe_id=' +
				recipeID + '&fsh=' + i, FSH.recipes.quickInventDone);
		}
	},

	quickInventDone: function(responseText) { // jQuery
		var infoMessage = FSH.Layout.infoBox(responseText);
		$('#invent_Result').append('<li style="list-style:decimal">' +
			infoMessage + '</li>');
	},

};

FSH.quickWear = { // Legacy

	insertQuickWear: function(content) { // Legacy
		FSH.Helper.itemList = {};
		if (!content) {content=FSH.Layout.notebookContent();}
		content.innerHTML='Getting item list from: ';
		FSH.System.xmlhttp('/index.php?cmd=profile&subcmd=dropitems&folder_id=-1', FSH.quickWear.getItemFromBackpack, {'inject':content,'id':0});
	},

	getItemFromBackpack: function(responseText, callback) { // Legacy
		var layout=callback.inject;
		layout.innerHTML+='</br>backpack folder '+(callback.id+1)+', ';
		var doc=FSH.System.createDocument(responseText);
		if (responseText.indexOf('Back to Profile') > 0){
			FSH.quickWear.retrieveItemInfor(doc);
		}

		//~ FSH.quickWear.showQuickWear(callback);

		var folderNodes=FSH.System.findNodes('//a[contains(@href,"cmd=profile&subcmd=dropitems&folder_id=")]',doc);
		if (folderNodes && folderNodes.length > 0 && callback.id < folderNodes.length - 1) {
			FSH.System.xmlhttp(folderNodes[callback.id+1].getAttribute('href'),
				FSH.quickWear.getItemFromBackpack, {'inject':layout,'id':callback.id+1});
		} else {
			FSH.System.xmlhttp('/index.php?cmd=guild&subcmd=inventory&subcmd2=storeitems',
				FSH.quickWear.getItemFromStoreItemPage, callback);
		}
	},

	getItemFromStoreItemPage: function(responseText, callback) { // Native
		var layout=callback.inject;
		layout.innerHTML+='store item page.';
		var doc=FSH.System.createDocument(responseText);
		if (responseText.indexOf('Store Items') > 0){
			FSH.quickWear.retrieveItemInfor(doc);
		}
		FSH.quickWear.showQuickWear(callback);
	},

	retrieveItemInfor: function(doc) { // jQuery
		$('div#pCC input[name="removeIndex[]"]', doc).each(function(){
			var input = $(this);
			input.closest('tr').find('img').attr('width', '30')
				.attr('height', '30');
			var item={
				'id': input.attr('value'),
				'html': input.closest('tr').html().replace(/<input[^>]*>/g, '')
				};
			FSH.Helper.itemList['id'+item.id]=item;
		});
	},

	showQuickWear: function(callback) { // Native
		var itemID;
		var output='<div id="invTabs"><ul>'+
			'<li><a href="#invTabs-qw">Quick Wear / Use / Extract <br/>Manager</a></li>'+
			'<li><a href="#invTabs-ah">Inventory Manager Counter<br/>filtered by AH Quick Search</a></li></ul>'+
			'<div id="invTabs-qw"><table width=100%><tr style="background-color:#CD9E4B;"><td nobr><b>Quick Wear / Use / Extract Manager</b></td></tr></table>'+
			'<table width=100%><tr><th width=20%>Actions</th><th colspan=4>Items</th></tr>';
		for (var key in FSH.Helper.itemList) {
			if (!FSH.Helper.itemList.hasOwnProperty(key)) {continue;}
			itemID=FSH.Helper.itemList[key].id;
			output+='<tr><td align=center>'+
				'<span style="cursor:pointer; text-decoration:underline; color:#blue; font-size:x-small;" '+
				'id="Helper:equipProfileInventoryItem' + itemID + '" ' +
				'itemID="' + itemID + '">Wear</span>&nbsp;|&nbsp;' +
				'<span style="cursor:pointer; text-decoration:underline; color:#blue; font-size:x-small;" '+
				'id="Helper:useProfileInventoryItem' + itemID + '" ' +
				'itemID="' + itemID + '">Use/Ext</span>'+
				'</td>'+FSH.Helper.itemList[key].html+'</tr>';
		}
		output+='</table></div><div id="invTabs-ah"></div></div>';
		callback.inject.innerHTML=output;
		for (key in FSH.Helper.itemList) {
			if (!FSH.Helper.itemList.hasOwnProperty(key)) {continue;}
			itemID=FSH.Helper.itemList[key].id;
			document.getElementById('Helper:equipProfileInventoryItem' + itemID).
				addEventListener('click', FSH.common.equipProfileInventoryItem, true);
			document.getElementById('Helper:useProfileInventoryItem' + itemID).
				addEventListener('click', FSH.quickWear.useProfileInventoryItem, true);
		}
		$('#invTabs').tabs();
		$('#invTabs').tabs('select', 0);
		FSH.quickWear.showAHInvManager('#invTabs-ah');
	},

	useProfileInventoryItem: function(evt) { // Legacy
		if (!window.confirm('Are you sure you want to use/extract the item?')) {return;}
		var InventoryItemID=evt.target.getAttribute('itemID');
		FSH.System.xmlhttp('index.php?cmd=profile&subcmd=useitem&inventory_id=' + InventoryItemID,
			function(responseText) {
				var info = FSH.Layout.infoBox(responseText);
				if (!info) {info = '<font color=red>Error</font>';}
				evt.target.parentNode.innerHTML = info;
			});
	},

	showAHInvManager: function(injectId) { // Bad jQuery
		var output = '<table width=100% cellspacing=2 cellpadding=2>'+
			'<tr><th colspan=5 align=center>Items from <a href="index.php?cmd=notepad&blank=1&subcmd=auctionsearch">AH Quick Search</a> found in your inventory</td>'+
			'<tr><th>Name</th><th>Nick Name<th>Inv Count</th><th>AH Min Price</th><th>AH BuyNow Price</th></tr>';
		var invCount = {};
		var name;
		var key;
		var i;
		var quickSL = FSH.System.getValueJSON('quickSearchList');
		// fill up the Inv Counter
		for (key in FSH.Helper.itemList) {
			if (!FSH.Helper.itemList.hasOwnProperty(key)) {continue;}
			name = FSH.Helper.itemList[key].html.match(/<td width="90%">&nbsp;(.*)<\/td>/)[1];
			if (invCount[name]) {
				invCount[name].count+= 1;
			} else {
				invCount[name]={'count':1,'nicknameList':''};
			}
			for (i = 0; i<quickSL.length; i += 1) {
				if (name.indexOf(quickSL[i].searchname) >= 0 &&
					invCount[name]
						.nicknameList
						.indexOf(quickSL[i].nickname) < 0) {
					invCount[name].nicknameList += '<a href=\'index.php?cmd=' +
						'auctionhouse&type=-1&search_text=' +
						quickSL[i].searchname + '\'>' + quickSL[i].nickname +
						'</a> ';
					quickSL[i].found = true;
				}
			}
		}
		// show inv & counter for item with nickname found
		for (key in invCount) {
			if (invCount[key].nicknameList !== '') {
				output += '<tr><td>' + key + '</td><td>' +
					invCount[key].nicknameList + '</td><td>' +
					invCount[key].count +
					'</td><td></td><td></td><td></td></tr>';
			}
		}
		// show item from quick AH search that are not in our inv
		output += '</td></tr><tr><td colspan=5><hr></td></tr>';
		output += '<tr><td>Did not find:</td><td colspan=4>';
		for (i=0; i<quickSL.length; i += 1) {
			if (quickSL[i].displayOnAH && !quickSL[i].found) {
				output += '<a href=\'index.php?cmd=auctionhouse&type=-1&' +
					'search_text=' + quickSL[i].searchname + '\'>' + 
					quickSL[i].nickname+'</a>, ';
			}
		}
		output += '</td></tr><tr><td colspan=5><hr></td></tr>'+
			'<tr><th colspan=5 align=center>Items NOT from <a href="index.php?cmd=notepad&blank=1&subcmd=auctionsearch">AH Quick Search</a> found in your inventory</td>';
		// show inv & counter for item with nickname NOT found
		for (key in invCount) {
			if (invCount[key].nicknameList === '') {
				output += '<tr><td>' + key + '</td><td>' +
				invCount[key].nicknameList + '</td><td>' +
				invCount[key].count + '</td><td></td><td></td><td></td></tr>';
			}
		}
		output += '</table>';
		$(injectId).html(output);
	},

};

FSH.common = { // Legacy

	equipProfileInventoryItem: function(evt) { // Legacy
		var InventoryItemID=evt.target.getAttribute('itemID');
		FSH.System.xmlhttp('index.php?cmd=profile&subcmd=equipitem&inventory_id=' + InventoryItemID,
			FSH.common.equipProfileInventoryItemReturnMessage,
			{'item': InventoryItemID, 'target': evt.target});
	},

	equipProfileInventoryItemReturnMessage: function(responseText, callback) { // Native
		var target = callback.target;
		var info = FSH.Layout.infoBox(responseText);
		var itemCellElement = target.parentNode; //FSH.System.findNode('//td[@title="' + itemID + '"]');
		if (!info) {
			itemCellElement.innerHTML = '<span style="color:green; font-weight:bold;">Worn</span>';
		} else {
			itemCellElement.innerHTML = '<span style="color:red; font-weight:bold;">Error:' + info + '</span>';
		}
	},

	addStatTotalToMouseover: function() { // jQuery
		if (!FSH.System.getValue('showStatBonusTotal')) {return;}
		$(document).ajaxSuccess(function(evt, xhr, ajax, data) {
			if (ajax.url.indexOf('fetchitem') !== 0) {return;}
			var img = $('[data-tipped="' + ajax.url + '"]');
			if (img.length === 0) {return;}
			var repl = $(data);
			var bonus = $('font:contains("Bonuses")', repl);
			if (bonus.length === 0) {return;}
			bonus.each(function() {
				var statTable = $(this).closest('tr')
					.nextUntil('tr:contains("Enhance")');
				var attackStatElement = $('td:contains("Attack:")', statTable);
				var defenseStatElement = $('td:contains("Defense:")', statTable);
				var armorStatElement = $('td:contains("Armor:")', statTable);
				var damageStatElement = $('td:contains("Damage:")', statTable);
				var hpStatElement = $('td:contains("HP:")', statTable);
				var totalStats = (attackStatElement.length > 0 ? attackStatElement
					.next().text().replace(/\+/g,'') * 1 : 0) +
					(defenseStatElement.length > 0 ? defenseStatElement.next()
					.text().replace(/\+/g,'') * 1 : 0) +
					(armorStatElement.length > 0 ? armorStatElement.next().text()
					.replace(/\+/g,'') * 1 : 0) +
					(damageStatElement.length > 0 ? damageStatElement.next().text()
					.replace(/\+/g,'') * 1 : 0) +
					(hpStatElement.length > 0 ? hpStatElement.next().text()
					.replace(/\+/g,'') * 1 : 0);
				statTable.last().before('<tr style="color:DodgerBlue;"><td>' +
					'Stat Total:</td><td align="right">' + totalStats +
					'&nbsp;</td></tr>'
				);
			});
			img.qtip('option', 'content.text', $('<div/>').append(repl).html());
		});
	},


};

FSH.onlinePlayers = { // Bad jQuery

	injectOnlinePlayers: function(content) { // jQuery
		FSH.Helper.context = content ? $(content) : $('div#pCC');
		FSH.Helper.appendHead({
			js: [FSH.dataTablesLoc],
			callback: FSH.onlinePlayers.injectOnlinePlayersNew
		});
	},

	injectOnlinePlayersNew: function () { // jQuery
		var lastCheck = FSH.System.getValue('lastOnlineCheck');
		var now = Date.now();
		var refreshButton;
		if (now - lastCheck > 300000) {
			refreshButton = '<span> (takes a while to refresh so only do it ' +
				'if you really need to) </span><span id="fshRefresh"' +
				'>[Refresh]</span>';
		} else {
			refreshButton = '<span>[ Wait ' + Math.round(300 - (now -
				lastCheck) / 1000) +'s ]</span>';
		}
		FSH.Helper.context.html(
			'<span><b>Online Players</b></span>' + refreshButton +
			'<div id="fshOutput"></div>');
		//~ localforage.getItem('fsh_OnlinePlayers', function(err, value) {
		FSH.ajax.getForage('fsh_onlinePlayers').done(function(value) {
			FSH.Helper.onlinePlayers = value || {};
			FSH.onlinePlayers.gotOnlinePlayers();
		});
	},

	gotOnlinePlayers: function() { // jQuery
		FSH.onlinePlayers.buildOnlinePlayerData();
		FSH.onlinePlayers.dataTableSearch();
		FSH.onlinePlayers.filterHeaderOnlinePlayers();

		var table = $('#fshInv', FSH.Helper.context).dataTable({ // context
			data: FSH.Helper.onlineData,
			pageLength: 30,
			lengthMenu: [[30, 60, -1], [30, 60, 'All']],
			columns: [
				{title: 'Guild', class: 'dt-center', orderable: false},
				{title: 'Name', class: 'dt-center'},
				{title: 'Level', class: 'dt-center'},
				{title: 'Page/Index', class: 'dt-center'}
			],
			createdRow: function(row, data) {
				if (FSH.Helper.highlightPlayersNearMyLvl &&
					Math.abs(FSH.System.intValue(data[2]) - FSH.Helper.levelToTest) <=
					FSH.Helper.lvlDiffToHighlight) {
					$('td', row).eq(2).addClass('lvlHighlight');
				}
			},
			order: [3, 'desc']
		}).api();

		FSH.onlinePlayers.doOnlinePlayerEventHandlers(table);
	},

	buildOnlinePlayerData: function() { // jQuery
		FSH.Helper.onlineData = [];
		Object.keys(FSH.Helper.onlinePlayers).forEach(function(player) {
			var guildImage = $('<div/>')
				.append(FSH.Helper.onlinePlayers[player][0]);
			$('img', guildImage).addClass('center');
			FSH.Helper.onlineData.push([
				guildImage.html(),
				FSH.Helper.onlinePlayers[player][1],
				FSH.Helper.onlinePlayers[player][2],
				FSH.Helper.onlinePlayers[player][3] * 100 +
				FSH.Helper.onlinePlayers[player][4] + 1,
			]);
		});
	},

	dataTableSearch: function() { // jQuery
		/* Custom filtering function which will search data in column three between two values */
		$.fn.dataTable.ext.search.push(
			function(_settings, data) {
				var min = parseInt($('#fshMinLvl', FSH.Helper.context).val(), 10); // context
				var max = parseInt($('#fshMaxLvl', FSH.Helper.context).val(), 10); // context
				if (!isNaN(min)) {FSH.System.setValue('onlinePlayerMinLvl', min);}
				if (!isNaN(max)) {FSH.System.setValue('onlinePlayerMaxLvl', max);}
				var level = FSH.System.intValue(data[2]) || 0; // use data for the level column
				if (isNaN(min)   && isNaN(max)   ||
					isNaN(min)   && level <= max ||
					min <= level && isNaN(max)   ||
					min <= level && level <= max )
				{return true;}
				return false;
			}
		);
	},

	filterHeaderOnlinePlayers: function() { // jQuery
		FSH.Helper.highlightPlayersNearMyLvl =
			FSH.System.getValue('highlightPlayersNearMyLvl');
		FSH.Helper.lvlDiffToHighlight = 10;
		FSH.Helper.levelToTest = FSH.System.intValue($('dt.stat-level:first')
			.next().text());
		var characterVirtualLevel = FSH.System.getValue('characterVirtualLevel');
		if (characterVirtualLevel) {FSH.Helper.levelToTest = characterVirtualLevel;}
		if (FSH.Helper.levelToTest <= 205) {FSH.Helper.lvlDiffToHighlight = 5;}
		$('div#fshOutput', FSH.Helper.context).html( // context
			'<div align=right>' +
			'Min lvl:<input value="' + FSH.System.getValue('onlinePlayerMinLvl') +
				'" size=5 id="fshMinLvl" /> ' +
			'Max lvl:<input value="' + FSH.System.getValue('onlinePlayerMaxLvl') +
				'" size=5 id="fshMaxLvl" /> ' +
			'<input id="fshReset" type="button" value="Reset"/>' +
			'</div><table id="fshInv" class="stripe hover"></table>');
	},

	doOnlinePlayerEventHandlers: function(table) { // jQuery
		$('span#fshRefresh', FSH.Helper.context).click(function() {
			$('span#fshRefresh', FSH.Helper.context).hide();
			FSH.Helper.onlinePages = 0;
			FSH.Helper.onlinePlayers = {};
			$.get('index.php?cmd=onlineplayers&page=1',
				FSH.onlinePlayers.getOnlinePlayers);
			FSH.System.setValue('lastOnlineCheck', Date.now());
			$('div#fshOutput', FSH.Helper.context)
				.append('Parsing online players...'); // context
		});
		$('#fshMinLvl, #fshMaxLvl', FSH.Helper.context).keyup(function() {
				table.draw();}); // context
		$('#fshReset', FSH.Helper.context).click(function() { // context
			FSH.System.setValue('onlinePlayerMinLvl',
				FSH.Data.defaults.onlinePlayerMinLvl);
			FSH.System.setValue('onlinePlayerMaxLvl',
				FSH.Data.defaults.onlinePlayerMaxLvl);
			$('#fshMinLvl', FSH.Helper.context).val(
				FSH.Data.defaults.onlinePlayerMinLvl); // context
			$('#fshMaxLvl', FSH.Helper.context).val(
				FSH.Data.defaults.onlinePlayerMaxLvl); // context
			table.draw();
		});
	},

	getOnlinePlayers: function(data) { // Bad jQuery
		$('div#fshOutput', FSH.Helper.context).append(' ' +
			(FSH.Helper.onlinePages + 1)); // context
		var doc = FSH.System.createDocument(data);
		var input = $('div#pCC input.custominput', doc).first();
		var thePage = input.attr('value');
		var theRows = $('div#pCC img[src$="/skin/icon_action_view.gif',
			doc).parent().parent().parent();
		theRows.each(function(index) {
			var tds = $('td', $(this));
			var player = tds.eq(1).text();
			if (FSH.Helper.onlinePlayers[player] &&
				FSH.Helper.onlinePlayers[player][3] > thePage) {return;}
			FSH.Helper.onlinePlayers[player] = [
				tds.eq(0).html(),
				tds.eq(1).html(),
				tds.eq(2).text(),
				thePage,
				index
			];
		});
		FSH.Helper.onlinePages += 1;
		if (FSH.Helper.onlinePages === 1) {
			input = input.parent().text();
			FSH.Helper.lastPage = parseInt(input.match(/(\d+)/g)[0], 10);
			for (var i = 2; i <= FSH.Helper.lastPage; i += 1) {
				$.get('index.php?cmd=onlineplayers&page=' + i,
					FSH.onlinePlayers.getOnlinePlayers);
			}
		} else if (FSH.Helper.onlinePages === FSH.Helper.lastPage) {
			FSH.ajax.setForage('fsh_onlinePlayers', FSH.Helper.onlinePlayers);
			FSH.onlinePlayers.gotOnlinePlayers();
		}
	},

};

FSH.dropItems = { // Legacy

	injectProfileDropItems: function() { // Native
		FSH.dropItems.injectDropItems();
		FSH.dropItems.injectMoveItems();
	},

	injectDropItems: function() { // Legacy
		FSH.common.addStatTotalToMouseover();
		// prevent multiple calls to local storage
		FSH.Helper.disableItemColoring = FSH.System.getValue('disableItemColoring');

		var subPage2Id = FSH.System.findNode('//input[@type="hidden" and @name="subcmd2"]');
		subPage2Id = subPage2Id ? subPage2Id.getAttribute('value') : '-';
		var mainTable = FSH.System.findNode('//table[tbody/tr/td/table/tbody/tr/td/input[@name="storeIndex[]"]]');
		var showExtraLinks = FSH.System.getValue('showExtraLinks');
		var showQuickDropLinks = FSH.System.getValue('showQuickDropLinks');
		var showQuickSendLinks = FSH.System.getValue('showQuickSendLinks');
		if (mainTable) {
			var insertHere = mainTable.rows[5].cells[0];
			insertHere.innerHTML += '[<span style="cursor:pointer; text-decoration:underline; color:blue;" id="Helper:showExtraLinks">' +
				(showExtraLinks?'Hide':'Show') + ' AH and Sell links</span>]&nbsp;';
			insertHere.innerHTML += '[<span style="cursor:pointer; text-decoration:underline; color:blue;" id="Helper:showQuickDropLinks">' +
				(showQuickDropLinks?'Hide':'Show') + ' Quick Drop links</span>]&nbsp;';
			if (subPage2Id && subPage2Id === 'dostoreitems') {
				insertHere.innerHTML += '[<span style="cursor:pointer; text-decoration:underline; color:blue;" id="Helper:selectAllGuildLocked">' +
					' Select All Guild Locked</span>]&nbsp;';
				document.getElementById('Helper:selectAllGuildLocked').addEventListener('click', FSH.dropItems.selectAllGuildLocked, true);
			}
			document.getElementById('Helper:showExtraLinks').addEventListener('click', FSH.dropItems.toggleShowExtraLinks, true);
			document.getElementById('Helper:showQuickDropLinks').addEventListener('click', FSH.dropItems.toggleShowQuickDropLinks, true);
		}

		var i;
		var anItem;
		var theImgElement;
		var itemStats;
		var itemId;
		//~ var invId;
		//~ var type;
		//~ var pid;
		//function to add links to all the items in the drop items list
		var itemName;
		var itemInvId;
		var theTextNode;
		var allItems=FSH.System.findNodes('//input[@type="checkbox"][@name="removeIndex[]" or @name="storeIndex[]"]');
		if (allItems) {
			for (i=0; i<allItems.length; i += 1) {
				anItem = allItems[i];
				itemInvId = anItem.value;
				theTextNode = FSH.System.findNode('../../td[3]', anItem);
				theImgElement = FSH.System.findNode('../../td[2]', anItem).firstChild.firstChild;
				itemStats = /fetchitem.php\?item_id=(\d+)\&inv_id=(\d+)\&t=(\d+)\&p=(\d+)/.exec($(theImgElement).data('tipped'));
				if (itemStats) {
					itemId = itemStats[1];
					//~ invId = itemStats[2];
					//~ type = itemStats[3];
					//~ pid = itemStats[4];
				}
				itemName = theTextNode.textContent.trim().replace('\\','');
				theTextNode.textContent = itemName;
				var findItems = FSH.System.findNodes('//td[@width="90%" and ' +
					'contains(.,"' + itemName + '")]');
				var preText = '';
				var postText1 = '';
				var postText2 = '';
				var postText3 = '';
				if (showExtraLinks) {
					preText = '<span findme="AH">[<a href="' + FSH.System.server +
						'?cmd=auctionhouse&type=-1&order_by=1&search_text=' +
						encodeURI(itemName) + '">AH</a>]</span> ' +
						//~ '<span findme="Sell">[<a href="' + FSH.System.server +
						//~ 'index.php?cmd=auctionhouse&subcmd=create2' +
						//~ '&inv_id=' + itemInvId  + '">Sell</a>]</span>' +
						'[<a href="http://guide.fallensword.com/index.php?' +
						'cmd=items&subcmd=view' + '&item_id=' + itemId +
						'" target="_blank">UFSG</a>] ';
				}
				postText1 = findItems.length>1?' [<span findme="checkall" linkto="' +
					itemName +
					'" style="text-decoration:underline;cursor:pointer">Check all</span>]':'';
				if (showQuickDropLinks) {
					postText2 = '&nbsp;<span title="INSTANTLY DROP THE ITEM. NO REFUNDS OR DO-OVERS! Use at own risk." id="Helper:QuickDrop' +
						itemInvId +
						'" itemInvId=' +
						itemInvId +
						' findme="QuickDrop" style="color:red; cursor:pointer; text-decoration:underline;">[Quick Drop]</span> ';
				}
				if (showQuickSendLinks) {
					postText3 = '&nbsp;<span title="INSTANTLY SENDS THE ITEM. NO REFUNDS OR DO-OVERS! Use at own risk." id="Helper:QuickSend' +
						itemInvId +
						'" itemInvId=' +
						itemInvId +
						' findme="QuickSend" style="color:blue; cursor:pointer; text-decoration:underline;">[Quick Send]</span> ';
				}

				theTextNode.innerHTML = preText +
					theTextNode.innerHTML +
					postText1 +
					postText2 +
					postText3;
				if (showQuickDropLinks) {
					document.getElementById('Helper:QuickDrop'+itemInvId).addEventListener('click', FSH.dropItems.quickDropItem, true);
				}
				if (showQuickSendLinks) {
					document.getElementById('Helper:QuickSend'+itemInvId).addEventListener('click', FSH.dropItems.quickSendItem, true);
				}
			}
		}

		var checkAllElements = FSH.System.findNodes('//span[@findme="checkall"]');
		var checkAllElement;
		if (checkAllElements) {
			for (i=0; i<checkAllElements.length; i += 1) {
				checkAllElement = checkAllElements[i];
				itemName = checkAllElement.linkto;
				checkAllElement.addEventListener('click', FSH.dropItems.checkAll, true);
			}
		}

		FSH.dropItems.getQTip($('div#pCC table table img.tip-dynamic'),
			FSH.dropItems.injectDropItemsPaint);

	},

	selectAllGuildLocked: function() { // Legacy
		var allGuildLockedItems = FSH.System.findNodes('//span[@id="guildLocked"]');
		if (allGuildLockedItems) {
		for (var i = 0; i < allGuildLockedItems.length; i += 1) {
			var cbNode = FSH.System.findNode('../../td/input[@type="checkbox"][@name="removeIndex[]" or @name="storeIndex[]"]', allGuildLockedItems[i]);
			cbNode.checked = true;
		}
		}
	},

	toggleShowExtraLinks: function() { // Legacy
		var showExtraLinksElement = FSH.System.findNode('//span[@id="Helper:showExtraLinks"]');
		if (showExtraLinksElement.textContent === 'Show AH and Sell links') {
			FSH.System.setValue('showExtraLinks', true);
		} else {
			FSH.System.setValue('showExtraLinks', false);
		}
		location.reload();
	},

	toggleShowQuickDropLinks: function() { // Legacy
		var showQuickDropLinksElement = FSH.System.findNode('//span[@id="Helper:showQuickDropLinks"]');
		if (showQuickDropLinksElement.textContent === 'Show Quick Drop links' &&
			window.confirm('Are you sure you want to show the quick drop ' +
			'links?')) {
			FSH.System.setValue('showQuickDropLinks', true);
		} else {
			FSH.System.setValue('showQuickDropLinks', false);
		}
		location.reload();
	},

	quickDropItem: function(evt){ // Legacy
		var itemInvId = evt.target.getAttribute('itemInvId');
		var dropItemHref = FSH.System.server + 'index.php?cmd=profile&subcmd=dodropitems&removeIndex[]=' + itemInvId;
		FSH.System.xmlhttp(dropItemHref,
			FSH.dropItems.quickDropItemReturnMessage,
			{'target': evt.target, 'url': dropItemHref});
	},

	quickDropItemReturnMessage: function(responseText, callback) { // Native
		var target = callback.target;
		var info = FSH.Layout.infoBox(responseText);
		target.style.cursor = 'default';
		target.style.textDecoration = 'none';
		if (info.search('Items dropped and destroyed.') !== -1) {
			target.style.color = 'green';
			target.style.fontWeight = 'bold';
			target.style.fontSize = 'small';
			target.innerHTML = 'Item Dropped';
		} else if (info!=='') {
			target.style.color = 'red';
			target.style.fontWeight = 'bold';
			target.style.fontSize = 'small';
			target.innerHTML = 'Error: ' + info;
		} else {
			target.style.color = 'red';
			target.style.fontSize = 'small';
			target.innerHTML = 'Weird Error: check the Tools>Error Console';
			console.log('Post the previous HTML and the following message to the GitHub or to the forum to help us debug this error');
			console.log(callback.url);
		}
	},

	quickSendItem: function(evt){ // Legacy
		var itemInvId = evt.target.getAttribute('itemInvId');
		var xcNum = FSH.System.getValue('goldConfirm');
		var itemRecipient = FSH.System.getValue('itemRecipient');
		var sendItemHref = FSH.System.server +
			'index.php?cmd=trade&subcmd=senditems&xc=' + xcNum +
			'&target_username=' + itemRecipient + '&sendItemList[]=' + itemInvId;
		FSH.System.xmlhttp(sendItemHref,
			FSH.dropItems.quickSendItemReturnMessage,
			{'target': evt.target, 'url': sendItemHref});
	},

	quickSendItemReturnMessage: function(responseText, callback) { // Native
		var target = callback.target;
		var info = FSH.Layout.infoBox(responseText);
		var itemRecipient = FSH.System.getValue('itemRecipient');
		target.style.cursor = 'default';
		target.style.textDecoration = 'none';
		if (info==='Items sent successfully!') {
			target.style.color = 'green';
			target.style.fontWeight = 'bold';
			target.style.fontSize = 'small';
			target.innerHTML = 'Item sent to ' + itemRecipient + '!';
		} else if (info!=='') {
			target.style.color = 'red';
			target.style.fontWeight = 'bold';
			target.style.fontSize = 'small';
			target.innerHTML = 'Error: ' + info;
		} else {
			target.style.color = 'red';
			target.style.fontSize = 'small';
			target.innerHTML = 'Weird Error: check the Tools>Error Console';
			console.log('Post the previous HTML and the following message to the GitHub or to the forum to help us debug this error');
			console.log(callback.url);
		}
	},

	checkAll: function(evt){ // Legacy
		var itemName = evt.target.getAttribute('linkto');
		var findItems = FSH.System.findNodes('//td[@width="90%" and contains(.,"] '+itemName+' [")]');
		for (var i=0; i<findItems.length; i += 1) {
			var item = findItems[i];
			var checkboxForItem = item.previousSibling.previousSibling.firstChild;
			if (checkboxForItem.checked) {
				checkboxForItem.checked = false;
			} else {
				checkboxForItem.checked = true;
			}

		}
	},

	getQTip: function(images, fn) { // jQuery
		images.qtip({
			overwrite: false,
			show: {
				event: 'mouseenter',
				ready: false
			},
			style: {classes: 'qtip-tipsy qtip-custom'},
			position: {
				my: 'center right',
				at: 'center left',
				effect: false,
				viewport: $(window)
			},
			content: {
				text: function(event, api) {
					$.ajax({
						url: $(this).data('tipped') // Use data-url attribute for the URL
					})
						.then(function(content) {
							// Set the tooltip content upon successful retrieval
							api.set('content.text', content);
							//~ FSH.Helper.managePaint(api, content);
							fn(content, api.target[0]);
						}, function(xhr, status, error) {
							// Upon failure... set the tooltip content to the status and error value
							api.set('content.text', status + ': ' + error);
						});
					return 'Loading...'; // Set some initial text
				}
			},
			hide: {effect: false}
		});
		images.qtip('show');
		images.qtip('hide');
	},

	injectDropItemsPaint: function(responseText, callback) { // Legacy
		var textNode = FSH.System.findNode('../../../td[3]', callback);
		// var auctionHouseLink = FSH.System.findNode('span[@findme="AH"]', textNode);
		// var sellLink=FSH.System.findNode('span[@findme="Sell"]', textNode);
		var quickDropLink = FSH.System.findNode('span[@findme="QuickDrop"]',
			textNode);
		var quickSendLink = FSH.System.findNode('span[@findme="QuickSend"]',
			textNode);
		//~ var guildLockedRE = /<center>Guild Locked: <font color='#00FF00'>/i;
		var guildLockedRE = /<center>\s*Guild Locked:\s*<font color="#00FF00">/;

		if (guildLockedRE.exec(responseText)) {
			// if (auctionHouseLink) {auctionHouseLink.style.visibility='hidden';}
			// if (sellLink) {sellLink.style.visibility='hidden';}
			if (quickDropLink) {quickDropLink.style.visibility='hidden';}
			textNode.innerHTML += '<span id="guildLocked" visibility="hidden"/>';
		}
		//<font color='cyan'>Bound (Non-Tradable)</font></b> <font color='orange'>Quest Item </font></center>
		var boundItemRE = /Bound \(Non-Tradable\)/i;
		if (boundItemRE.exec(responseText)) {
			// if (auctionHouseLink) {auctionHouseLink.style.visibility='hidden';}
			// if (sellLink) {sellLink.style.visibility='hidden';}
			// if (quickDropLink) quickDropLink.style.visibility='hidden';
			if (quickSendLink) {quickSendLink.style.visibility='hidden';}
		}
		if (FSH.Helper.disableItemColoring) {return;}
		var fontLineRE=/<nobr><font color='(#[0-9A-F]{6})' size=2>/i;
		var fontLineRX=fontLineRE.exec(responseText);
		var color=fontLineRX[1];
		if (color==='#FFFFFF') {
			var fontLineRE2=/<br>\s*<font color='([a-z]+)'>/i;
			var fontLineRX2=fontLineRE2.exec(responseText);
			if (fontLineRX2) {
				color=fontLineRX2[1];
			}
		}
		if (color==='#40FFFF') {color='#00A0A0';}
		if (color==='orange') {color='#FF6000';}
		if (color==='#00FF00') {color='#00B000';}
		textNode.style.color=color;
	},

	injectMoveItems: function() { // Bad jQuery
		var foldersEnabled = $('img[src$="/folder_on.gif"]');
		if (foldersEnabled.length !== 1) {return;}
		var otherFolders = $('div#pCC a').has('img[src$="/folder.gif"]');
		if (otherFolders.length === 0) {return;}
		var select = $('<select name=folder id=selectFolderId class=' +
			'customselect></select>');
		otherFolders.each(function() {
			var self = $(this);
			select.append('<option value=' + self.attr('href')
			.match(/&folder_id=(-*\d+)/i)[1] + '>' +
			self.parent().text() + '</option>');
		});
		$('div#pCC tr').has(otherFolders[0]).first().after($('<tr/>')
			.append($('<td class="fshCenter">Move selected items to: </td>')
				.append(select)
				.append('&nbsp;<input type="button" class="custombutton"' +
					' id="fshMove" value="Move">')));
		$('input#fshMove').click(FSH.dropItems.moveItemsToFolder);
	},

	moveItemsToFolder: function() { // Bad jQuery
		var invList = [];
		$('input[name="removeIndex[]"]:checked').each(function(i) {
			var batchNo = Math.floor(i / 50);
			invList[batchNo] = invList[batchNo] || [];
			invList[batchNo].push($(this).val());
		});
		FSH.Helper.moveItemsCallback = invList.length;
		invList.forEach(function(val) {
			$.ajax({
				dataType: 'json',
				url: 'index.php',
				data: {
					'cmd': 'profile',
					'subcmd': 'sendtofolder',
					'inv_list': JSON.stringify(val),
					'folder_id': $('#selectFolderId option:selected').val(),
					'ajax': 1
				},
				success: function() {
					FSH.Helper.moveItemsCallback -= 1;
					if (FSH.Helper.moveItemsCallback === 0) {location.reload();}
				}
			});
		});
	},

};

FSH.questBook = { // Legacy

	injectQuestBookFull: function() { // Legacy

		var lastQBPage = location.search;
		if (lastQBPage.indexOf('&mode=0') !== -1) {
			FSH.System.setValue('lastActiveQuestPage', lastQBPage);
		} else if (lastQBPage.indexOf('&mode=1') !== -1) {
			FSH.System.setValue('lastCompletedQuestPage', lastQBPage);
		} else if (lastQBPage.indexOf('&mode=2') !== -1) {
			FSH.System.setValue('lastNotStartedQuestPage', lastQBPage);
		}
		if (FSH.System.getValue('storeLastQuestPage')) {
			if (FSH.System.getValue('lastActiveQuestPage').length > 0) {
				var activeLink = $('a[href*="index.php?cmd=questbook&mode=0"]');
				activeLink.attr('href', FSH.System.getValue('lastActiveQuestPage'));
			}
			if (FSH.System.getValue('lastCompletedQuestPage').length > 0) {
				var completedLink = $('a[href*="index.php?cmd=questbook&mode=1"]');
				completedLink.attr('href', FSH.System.getValue('lastCompletedQuestPage'));
			}
			if (FSH.System.getValue('lastNotStartedQuestPage').length > 0) {
				var notStartedLink = $('a[href*="index.php?cmd=questbook&mode=2"]');
				notStartedLink.attr('href', FSH.System.getValue('lastNotStartedQuestPage'));
			}
		}

		var questTable = FSH.System.findNode('//table[tbody/tr/td[.="Guide"]]');
		if (!questTable) {return;}
		var hideQuests=[];
		if (FSH.System.getValue('hideQuests')) {
			hideQuests=FSH.System.getValue('hideQuestNames').split(',');}
		for (var i=0;i<questTable.rows.length;i += 1) {
			var aRow = questTable.rows[i];
			if (i!==0) {
				if (aRow.cells[0].innerHTML) {
					var questName = aRow.cells[0].firstChild.innerHTML.replace(/  /g,' ').trim();
					if (hideQuests.indexOf(questName)>=0) {
						aRow.parentNode.removeChild(aRow.nextSibling);
						aRow.parentNode.removeChild(aRow.nextSibling);
						aRow.parentNode.removeChild(aRow);
					}
					var questID = /quest_id=(\d+)/.exec(aRow.cells[4].innerHTML)[1];
					aRow.cells[4].innerHTML = '<a href="http://guide.fallensword.com/index.php?cmd=quests&amp;subcmd=view&amp;quest_id=' + questID + '&amp;search_name=&amp;search_level_min=&amp;search_level_max=&amp;sort_by=" target="_blank">' +
						'<img border=0 style="float:left;" title="Search quest in Ultimate FSG" src="' + FSH.System.imageServer + '/temple/1.gif"/></a>';
					aRow.cells[4].innerHTML += '&nbsp;<a href="http://wiki.fallensword.com/index.php?title=' + questName.replace(/ /g,'_') + '" target="_blank">' +
						'<img border=0 style="float:left;" title="Search for this quest on the Wiki" src="' + FSH.System.imageServer + '/skin/fs_wiki.gif"/></a>';
				}
			}
		}
	},

	injectQuestTracker: function() { // Legacy
		var injectHere = FSH.System.findNode('//td[font/b[.="Quest Details"]]');
		var tracking = false;
		tracking = FSH.Helper.isQuestBeingTracked(location.search);
		var questId = document.location.search.match(/quest_id=(\d+)/)[1];
		injectHere.innerHTML += '&nbsp;<a target="_blank" href="http://guide.fallensword.com/index.php?cmd=quests&subcmd=view&quest_id=' + questId +
			'"><img border=0 title="Search quest in Ultimate FSG" src="'+ FSH.System.imageServer + '/temple/1.gif"/></a>';
		
		var questName = FSH.System.findNode('//font[@size="2" and contains(.,"\'")]', injectHere);
		if (questName) {
			questName = questName.innerHTML;
			questName = questName.match(/"(.*)"/);
			if (questName && questName.length > 1) {
				questName = questName[1];
				injectHere.innerHTML += '&nbsp;<a href="http://wiki.fallensword.com/index.php?title=' + questName.replace(/ /g,'_') +
					'" target="_blank"><img border=0 title="Search for this quest on the Fallensword Wiki" src=' + FSH.System.imageServer + '/skin/fs_wiki.gif /></a>';
			}
		}

		if (tracking === true) {
			injectHere.innerHTML += '<br><input id="dontTrackThisQuest" data="' + location.search + '" type="button" value="Stop Tracking Quest" title="Tracks quest progress." class="custombutton">';
			document.getElementById('dontTrackThisQuest').addEventListener('click', FSH.questBook.dontTrackThisQuest, true);
		} else {
			injectHere.innerHTML += '<br><input id="trackThisQuest" type="button" value="Track Quest" title="Tracks quest progress." class="custombutton">';
			document.getElementById('trackThisQuest').addEventListener('click', FSH.questBook.trackThisQuest, true);
		}
	},

	trackThisQuest: function() { // Native
		var currentTrackedQuest = FSH.System.getValue('questBeingTracked').split(';');
		if (currentTrackedQuest.length > 0 && currentTrackedQuest[0].trim().length > 0) {
			FSH.System.setValue('questBeingTracked', FSH.System.getValue('questBeingTracked') + ';' + location.search);
		} else {
		FSH.System.setValue('questBeingTracked', location.search);
		}
		location.reload();
	},

	dontTrackThisQuest: function(evt) { // Native
		var questNotToTrack = evt.target.getAttribute('data');
		var currentTrackedQuest = FSH.System.getValue('questBeingTracked').split(';');
		if (currentTrackedQuest.length > 0) {
			var newTracked = '';
			for (var i = 0; i < currentTrackedQuest.length; i += 1) {
				if (currentTrackedQuest[i] !== questNotToTrack) {
					if (newTracked.trim().length > 0) {
						newTracked += ';';
					}
					newTracked += currentTrackedQuest[i];
				}
			}
			FSH.System.setValue('questBeingTracked', newTracked);
		} else {
		FSH.System.setValue('questBeingTracked', '');
		}
		location.reload();
	},

	showAllQuestSteps: function() { // jQuery
		if (FSH.System.getValue('showNextQuestSteps')) {
			$('div[id*="stage"]').show();
			document.getElementById('next_stage_button').style.display = 'none';
		}
	},

};

FSH.settingsPage = { // Legacy

	injectSettings: function() { // Legacy
		var tickNode = FSH.System.findNode('//td[@height="10" and contains(.,"Tick which skills you do not want cast on you")]');
		tickNode.innerHTML+='<br><span style="cursor:pointer; text-decoration:underline;" id="Helper:tickAllBuffs">' +
		'Tick all buffs</span>';
		document.getElementById('Helper:tickAllBuffs').addEventListener('click', FSH.settingsPage.toggleTickAllBuffs, true);

		var buffs                  = FSH.System.getValue('huntingBuffs');
		var buffsName              = FSH.System.getValue('huntingBuffsName');
		var buffs2                 = FSH.System.getValue('huntingBuffs2');
		var buffs2Name             = FSH.System.getValue('huntingBuffs2Name');
		var buffs3                 = FSH.System.getValue('huntingBuffs3');
		var buffs3Name             = FSH.System.getValue('huntingBuffs3Name');
		var doNotKillList          = FSH.System.getValue('doNotKillList');
		var hideArenaPrizes        = FSH.System.getValue('hideArenaPrizes');

		var enableActiveBountyList = FSH.System.getValue('enableActiveBountyList');
		var bountyListRefreshTime  = FSH.System.getValue('bountyListRefreshTime');
		var enableWantedList       = FSH.System.getValue('enableWantedList');
		var wantedNames            = FSH.System.getValue('wantedNames');
		var combatEvaluatorBias    = FSH.System.getValue('combatEvaluatorBias');
		var enabledHuntingMode     = FSH.System.getValue('enabledHuntingMode');
		var curVer;
		if (typeof GM_info === 'undefined') {curVer = 'unknown';
		} else {curVer = GM_info.script.version;}
		var storage = (JSON.stringify(localStorage).length /
			(5 * 1024 * 1024) * 100).toFixed(2);
		var configData=
			'<form><table style="border-spacing: 10px;">' +
			'<tr><th colspan="2"><b>Fallen Sword Helper configuration ' +
				'Settings</b></th></tr>' +
			'<tr><td colspan="2" align=center>' +
				'<span style="font-size:xx-small">(Current version: ' +
				curVer + ')&nbsp;' +
				'(Storage Used: ' + storage + '% Remaining: ' +
				(100 - storage) + '%)</span>' +
			'</td></tr>' +
			'<tr><td colspan="2" align=center>' +
			'<span style="font-weight:bold;">Visit the <a href="https://github.com/fallenswordhelper/fallenswordhelper">Fallen Sword Helper web site</a> ' +
			'for any suggestions, requests or bug reports</span></td></tr>' +
			//General Prefs
			'<tr><th colspan="2" align="left"><b>General preferences (apply to most screens)</b></th></tr>' +
			'<tr><td align="right">Enable Guild Info Widgets' + FSH.Layout.helpLink('Enable Guild Info Widgets', 'Enabling this option will enable the Guild Info Widgets (coloring on the Guild Info panel)') +
				':</td><td><input name="enableGuildInfoWidgets" type="checkbox" value="on"' + (FSH.System.getValue('enableGuildInfoWidgets')?' checked':'') +
				'>  Hide Message&gt;<input name="hideGuildInfoMessage" type="checkbox" value="on"' + (FSH.System.getValue('hideGuildInfoMessage')?' checked':'') +
				'>  Hide Buff&gt;<input name="hideGuildInfoBuff" type="checkbox" value="on"' + (FSH.System.getValue('hideGuildInfoBuff')?' checked':'') +
				'>  Hide ST&gt;<input name="hideGuildInfoSecureTrade" type="checkbox" value="on"' + (FSH.System.getValue('hideGuildInfoSecureTrade')?' checked':'') +
				'>  Hide Trade&gt;<input name="hideGuildInfoTrade" type="checkbox" value="on"' + (FSH.System.getValue('hideGuildInfoTrade')?' checked':'') +
				'></td></tr>'  +
			'<tr><td align="right">Move Guild Info List' + FSH.Layout.helpLink('Move Guild Info List', 'This will Move the Guild Info List higher on the bar on the right') +
				':</td><td><input name="moveGuildList" type="checkbox" value="on"' + (FSH.System.getValue('moveGuildList')?' checked':'') + '>' +
				'</td></tr>' +
			'<tr><td align="right">Move Online Allies List' + FSH.Layout.helpLink('Move Guild Info List', 'This will Move the Online Allies List higher on the bar on the right') +
				':</td><td><input name="moveOnlineAlliesList" type="checkbox" value="on"' + (FSH.System.getValue('moveOnlineAlliesList')?' checked':'') + '>' +
				'</td></tr>' +
			'<tr><td align="right">' + FSH.Layout.networkIcon + 'Show Online Allies/Enemies' + FSH.Layout.helpLink('Show Online Allies/Enemies', 'This will show the allies/enemies online list on the right.') +
				':</td><td>Allies<input name="enableAllyOnlineList" type="checkbox" value="on"' + (FSH.System.getValue('enableAllyOnlineList')?' checked':'') +
				'> Enemies<input name="enableEnemyOnlineList" type="checkbox" value="on"' + (FSH.System.getValue('enableEnemyOnlineList')?' checked':'') +
				'> <input name="allyEnemyOnlineRefreshTime" size="3" value="'+ FSH.System.getValue('allyEnemyOnlineRefreshTime') + '" /> seconds refresh</td></tr>' +
			'<tr><td align="right">Enable Online Allies Widgets' + FSH.Layout.helpLink('Enable Online Allies Widgets', 'Enabling this option will enable the Allies List Widgets (coloring on the Allies List panel)') +
				':</td><td><input name="enableOnlineAlliesWidgets" type="checkbox" value="on"' + (FSH.System.getValue('enableOnlineAlliesWidgets')?' checked':'') + '></td></tr>' +
			'<tr><td align="right">Move FS box' + FSH.Layout.helpLink('Move FallenSword Box', 'This will move the FS box to the left, under the menu, for better visibility (unless it is already hidden.)') +
				':</td><td><input name="moveFSBox" type="checkbox" value="on"' + (FSH.System.getValue('moveFSBox')?' checked':'') + '></td></tr>' +
			'<tr><td align="right">"Game Help" Settings Link' + FSH.Layout.helpLink('Game Help Settings Link', 'This turns the Game Help text in the lower right box into a link to this settings page. This can be helpful if you use the FS Image Pack.') +
				':</td><td><input name="gameHelpLink" type="checkbox" value="on"' + (FSH.System.getValue('gameHelpLink')?' checked':'') + '></td></tr>' +

			'<tr><td align="right">' + FSH.Layout.networkIcon + 'Enable Temple Alert' + FSH.Layout.helpLink('Enable Temple Alert', 'Puts an alert on the LHS if you have not prayed at the temple today.') +
				':</td><td><input name="enableTempleAlert" type="checkbox" value="on"' + (FSH.System.getValue('enableTempleAlert')?' checked':'') + '></td></tr>' +

			'<tr><td align="right">' + FSH.Layout.networkIcon + 'Enable Gold ' +
				'Upgrade Alert' + FSH.Layout.helpLink('Enable Gold Upgrade Alert',
				'Puts an alert on the LHS if you have not upgraded your ' +
				'stamina with gold today.') +
				':</td><td><input name="enableUpgradeAlert" type="checkbox" ' +
				'value="on"' + (FSH.System.getValue('enableUpgradeAlert') ?
				' checked' : '') + '></td></tr>' +

			'<tr><td align="right">' + FSH.Layout.networkIcon + 'Enable ' +
				'Composing Alert' + FSH.Layout.helpLink('Enable Composing Alert',
				'Puts an alert on the LHS if you have composing slots ' +
				'available.') +
				':</td><td><input name="enableComposingAlert" type="checkbox" ' +
				'value="on"' + (FSH.System.getValue('enableComposingAlert') ?
				' checked' : '') + '></td></tr>' +

			'<tr><td align="right">Enhance Online Dots' + FSH.Layout.helpLink('Enhance Online Dots', 'Enhances the green/grey dots by player names to show online/offline status.') +
				':</td><td><input name="enhanceOnlineDots" type="checkbox" value="on"' + (FSH.System.getValue('enhanceOnlineDots')?' checked':'') + '></td></tr>' +
			'<tr><td align="right">Hide Buff Selected' + FSH.Layout.helpLink('Hide Buff Selected', 'Hides the buff selected functionality in the online allies and guild info section.') +
				':</td><td><input name="hideBuffSelected" type="checkbox" value="on"' + (FSH.System.getValue('hideBuffSelected')?' checked':'') + '></td></tr>' +
			'<tr><td align="right">Hide Helper Menu' + FSH.Layout.helpLink('Hide Helper Menu', 'Hides the helper menu from top left.') +
				':</td><td><input name="hideHelperMenu" type="checkbox" value="on"' + (FSH.System.getValue('hideHelperMenu')?' checked':'') + '></td></tr>' +
			'<tr><td align="right">Keep Helper Menu On Screen' + FSH.Layout.helpLink('Keep Helper Menu On Screen', 'Keeps helper menu on screen as you scroll (helper menu must be enabled to work). Also works with quick links.') +
				':</td><td><input name="keepHelperMenuOnScreen" type="checkbox" value="on"' + (FSH.System.getValue('keepHelperMenuOnScreen')?' checked':'') + '></td></tr>' +
			'<tr><td align="right">Quick Links Screen Location' + FSH.Layout.helpLink('Quick Links Screen Location', 'Determines where the quick links dialog shows on the screen. Default is top 22, left 0.') +
				':</td><td>Top: <input name="quickLinksTopPx" size="3" value="'+ FSH.System.getValue('quickLinksTopPx') + '" /> Left: <input name="quickLinksLeftPx" size="3" value="'+ FSH.System.getValue('quickLinksLeftPx') + '" /></td></tr>' +
			//Guild Manage
			'<tr><th colspan="2" align="left"><b>Guild>Manage preferences</b></th></tr>' +
			'<tr><td colspan="2" align="left">Enter guild names, seperated by commas</td></tr>' +
			'<tr><td>Own Guild</td><td>'+ FSH.settingsPage.injectSettingsGuildData('Self') + '</td></tr>' +
			'<tr><td>Friendly Guilds</td><td>'+ FSH.settingsPage.injectSettingsGuildData('Frnd') + '</td></tr>' +
			'<tr><td>Old Guilds</td><td>'+ FSH.settingsPage.injectSettingsGuildData('Past') + '</td></tr>' +
			'<tr><td>Enemy Guilds</td><td>'+ FSH.settingsPage.injectSettingsGuildData('Enmy') + '</td></tr>' +
			'<tr><td align="right">Highlight Valid PvP Targets' + FSH.Layout.helpLink('Highlight Valid PvP Targets', 'Enabling this option will highlight targets in OTHER guilds that are within your level range to attack for PvP or GvG.') +
				':</td><td>PvP: <input name="highlightPlayersNearMyLvl" type="checkbox" value="on"' + (FSH.System.getValue('highlightPlayersNearMyLvl')?' checked':'') +
				'> GvG: <input name="highlightGvGPlayersNearMyLvl" type="checkbox" value="on"' + (FSH.System.getValue('highlightGvGPlayersNearMyLvl')?' checked':'') + '/></td></tr>'  +
			'<tr><td align="right">Show rank controls' + FSH.Layout.helpLink('Show rank controls', 'Show ranking controls for guild managemenet in member profile page - ' +
				'this works for guild founders only') +
				':</td><td><input name="showAdmin" type="checkbox" value="on"' + (FSH.System.getValue('showAdmin')?' checked':'') + '></td></tr>' +
			'<tr><td align="right">AJAXify rank controls' + FSH.Layout.helpLink('AJAXify rank controls', 'Enables guild founders with ranking rights to change rank positions without a screen refresh.') +
				':</td><td><input name="ajaxifyRankControls" type="checkbox" value="on"' + (FSH.System.getValue('ajaxifyRankControls')?' checked':'') + '></td></tr>' +
			'<tr><td align="right">'+FSH.Layout.networkIcon+'Show Conflict Details' + FSH.Layout.helpLink('Show Conflict Details', 'Inserts detailed conflict information onto your guild\\\'s manage page. Currently displays the target guild as well as the current score.') +
				':</td><td><input name="detailedConflictInfo" type="checkbox" value="on"' + (FSH.System.getValue('detailedConflictInfo')?' checked':'') + '></td></tr>' +
			//World Screen
			'<tr><th colspan="2" align="left"><b>World screen/Hunting preferences</b></th></tr>' +
			'<tr><td align="right">Quick Kill ' + FSH.Layout.helpLink('Quick Kill', 'This will kill monsters without opening a new page') +
				':</td><td><input name="quickKill" type="checkbox" value="on"' + (FSH.System.getValue('quickKill')?' checked':'') + '>' +
				'</td></tr>' +
			'<tr><td align="right">Keep Combat Logs' + FSH.Layout.helpLink('Keep Combat Logs', 'Save combat logs to a temporary variable. '+
				'Press <u>Show logs</u> on the right to display and copy them') +
				':</td><td><input name="keepLogs" type="checkbox" value="on"' + (FSH.System.getValue('keepLogs')?' checked':'') + '>' +
				'<input type="button" class="custombutton" value="Show Logs" id="Helper:ShowLogs"></td></tr>' +
			'<tr><td align="right">Show Combat Log' + FSH.Layout.helpLink('Show Combat Log', 'This will show the combat log for each automatic battle below the monster list.') +
				':</td><td><input name="showCombatLog" type="checkbox" value="on"' + (FSH.System.getValue('showCombatLog')?' checked':'') + '></td></tr>' +
			'<tr><td align="right">Color Special Creatures' + FSH.Layout.helpLink('Color Special Creatures', 'Creatures will be colored according to their rarity. ' +
				'Champions will be colored green, Elites yellow and Super Elites red.') +
				':</td><td><input name="enableCreatureColoring" type="checkbox" value="on"' + (FSH.System.getValue('enableCreatureColoring')?' checked':'') + '></td></td></tr>' +
			'<tr><td align="right">'+FSH.Layout.networkIcon+'Show Creature Info' + FSH.Layout.helpLink('Show Creature Info', 'This will show the information from the view creature link when you mouseover the link.' +
				// (FSH.System.browserVersion<3?'Does not work in Firefox 2 - suggest disabling or upgrading to Firefox 3.':'')) +
				'') +
				':</td><td><input name="showCreatureInfo" type="checkbox" value="on"' + (FSH.System.getValue('showCreatureInfo')?' checked':'') + '></td></tr>' +

			'<tr><td align="right">Combat Evaluator Bias' + FSH.Layout.helpLink('Combat Evaluator Bias', 'This changes the bias of the combat evaluator for the damage and HP evaluation. It will not change the attack bias (1.1053).'+
					'<br>Conservative = 1.1053 and 1.1 (Safest)'+
					'<br>Semi-Conservative = 1.1 and 1.053'+
					'<br>Adventurous = 1.053 and 1 (Bleeding Edge)'+
					'<br>Conservative+ = 1.1053 and 1 with the attack calculation changed to +-48 per RJEM') +
				':</td><td><select name="combatEvaluatorBias"><option value="0"' + (combatEvaluatorBias === 0 ? ' SELECTED' : '') +
					'>Conservative</option><option value="1"' + (combatEvaluatorBias===1?' SELECTED':'') +
					'>Semi-Conservative</option><option value="2"' + (combatEvaluatorBias===2?' SELECTED':'') +
					'>Adventurous</option><option value="3"' + (combatEvaluatorBias===3?' SELECTED':'') +
					'>Conservative+</option></select></td></tr>' +

			'<tr><td align="right">Keep Creature Log' + FSH.Layout.helpLink('Keep Creature Log', 'This will show the creature log for each creature you see when you travel. This requires Show Creature Info enabled!') +
				':</td><td><input name="showMonsterLog" type="checkbox" value="on"' + (FSH.System.getValue('showMonsterLog')?' checked':'') + '>'+
				'&nbsp;&nbsp;<input type="button" class="custombutton" value="Show" id="Helper:ShowMonsterLogs"></td></tr>' +
			'<tr><td align="right">Hide Krul Portal' + FSH.Layout.helpLink('Hide Krul Portal', 'This will hide the Krul portal on the world screen.') +
				':</td><td><input name="hideKrulPortal" type="checkbox" value="on"' + (FSH.System.getValue('hideKrulPortal')?' checked':'') + '></td></tr>' +
			'<tr><td align="right">Footprints Color' + FSH.Layout.helpLink('Footprints Color', 'Changes the color of the footprints, useful if you can\\\'t see them in some maps') +
				':</td><td><input name="footprintsColor" size="12" value="'+ FSH.System.getValue('footprintsColor') + '" /><input type="button" class="custombutton" value="Update Color" id="Helper:updateFpColor"><table width="40" height="40" cellspacing="0" cellpadding="0" border="0"><td width="40" height="40" background="' + FSH.System.getValue('currentTile') + '" align="center" style="color:' + FSH.System.getValue('footprintsColor') + ';"><center><table width="40" height="40" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td align="center">**</td></tr></tbody></table></center></td></table></td></tr>' +
			'<tr><td align="right">Reset Footprints' + FSH.Layout.helpLink('Reset Footprints', 'Resets the footprints variable.') +
				':</td><td>Current Size: ' + (!FSH.System.getValue('map') ? 'N/A' : FSH.System.getValue('map').length + ' <input type="button" class="custombutton" value="Reset" id="Helper:ResetFootprints">') + '</td></tr></td></tr>' +
			'<tr><td align="right">Show Send Gold' + FSH.Layout.helpLink('Show Gold on World Screen', 'This will show an icon below the world map to allow you to quickly send gold to a Friend.') +
				':</td><td><input name="sendGoldonWorld" type="checkbox" value="on"' + (FSH.System.getValue('sendGoldonWorld')?' checked':'') + '>'+
				'Send <input name="goldAmount" size="5" value="'+ FSH.System.getValue('goldAmount') + '" /> '+
				'gold to <input name="goldRecipient" size="10" value="'+ FSH.System.getValue('goldRecipient') + '" />' +
				' Current total: <input name="currentGoldSentTotal" size="5" value="'+ FSH.System.getValue('currentGoldSentTotal') + '" />' +
				'</td></tr>' +
			'<tr><td align="right">Do Not Kill List' + FSH.Layout.helpLink('Do Not Kill List', 'List of creatures that will not be killed by quick kill. You must type the full name of each creature, ' +
				'separated by commas. Creature name will show up in red color on world screen and will not be killed by keyboard entry (but can still be killed by mouseclick). Quick kill must be '+
				'enabled for this function to work.') +
				':</td><td colspan="3"><input name="doNotKillList" size="60" value="'+ doNotKillList + '" /></td></tr>' +
			'<tr><td align="right">Hunting Buffs' + FSH.Layout.helpLink('Hunting Buffs', 'Customize which buffs are designated as hunting buffs. You must type the full name of each buff, ' +
				'separated by commas. Use the checkbox to enable/disable them.') +
				':</td><td colspan="3"><input name="showHuntingBuffs" type="checkbox" value="on"' + (FSH.System.getValue('showHuntingBuffs')?' checked':'') + '> ' +
				'Enabled Hunting Mode' + FSH.Layout.helpLink('Enabled Hunting Mode', 'This will determine which list of buffs gets checked on the world screen.') +
				':<select name="enabledHuntingMode"><option value="1"' + (enabledHuntingMode===1?' SELECTED':'') +
					'>' + buffsName + '</option><option value="2"' + (enabledHuntingMode===2?' SELECTED':'') +
					'>' + buffs2Name + '</option><option value="3"' + (enabledHuntingMode===3?' SELECTED':'') +
					'>' + buffs3Name + '</option></select></td></tr>' +
			'<tr><td align="right">' + buffsName + ' Hunting Buff List' + FSH.Layout.helpLink(buffsName + ' Hunting Buff List', buffsName + ' list of hunting buffs.') +
				':</td><td colspan="3"><input name="huntingBuffsName" title="Hunting mode name" size="7" value="'+ buffsName + '" /><input name="huntingBuffs" size="49" value="'+ buffs + '" /></td></tr>' +
			'<tr><td align="right">' + buffs2Name + ' Hunting Buff List' + FSH.Layout.helpLink(buffs2Name + ' Hunting Buff List', 'List of ' + buffs2Name + ' hunting buffs.') +
				':</td><td colspan="3"><input name="huntingBuffs2Name" title="Hunting mode name" size="7" value="'+ buffs2Name + '" /><input name="huntingBuffs2" size="49" value="'+ buffs2 + '" /></td></tr>' +
			'<tr><td align="right">' + buffs3Name + ' Hunting Buff List' + FSH.Layout.helpLink(buffs3Name + ' Hunting Buff List', 'List of ' + buffs3Name + ' hunting buffs.') +
				':</td><td colspan="3"><input name="huntingBuffs3Name" title="Hunting mode name" size="7" value="'+ buffs3Name + '" /><input name="huntingBuffs3" size="49" value="'+ buffs3 + '" /></td></tr>' +
			'<tr><td align="right">Enable FS Box Log' + FSH.Layout.helpLink('Enable FS Box Log', 'This enables the functionality to keep a log of recent seen FS Box message.') +
				':</td><td><input name="fsboxlog" type="checkbox" value="on"' + (FSH.System.getValue('fsboxlog')?' checked':'') + '></td></tr>' +
			'<tr><td align="right">Enable Buff Log' + FSH.Layout.helpLink('Enable Buff Log', 'This enables the functionality to keep a log of recently casted buffs') +
				':</td><td><input name="keepBuffLog" type="checkbox" value="on"' + (FSH.System.getValue('keepBuffLog')?' checked':'') + '></td></tr>' +
			'<tr><td align="right">Enable Hunting Mode' + FSH.Layout.helpLink('Enable Hunting Mode', 'This disable menu and some visual features to speed up the FSH.Helper.') +
				':</td><td><input name="huntingMode" type="checkbox" value="on"' + (FSH.System.getValue('huntingMode')?' checked':'') + '></td></tr>' +
			'<tr><td align="right">Enable Fast Walk' + FSH.Layout.helpLink('Enable Fast Walk', 'This functionality will allow the user to send multiple move commands, each subsequent one assuming that the previous one succeeded. ' +
				'It does not check for blocked squares, not does it check to make sure that the move commands arrived at the server in the right order. Depending on the lag you experience, the user may have to pause slightly ' +
				'between each move to make sure they reach the server in the right order.') +
				':</td><td><input name="enableFastWalk" type="checkbox" value="on"' + (FSH.System.getValue('enableFastWalk')?' checked':'') + '>'+
				' Show FastWalk icon on world' + FSH.Layout.helpLink('Show FastWalk icon on world', 'Should the FastWalk toggle icon show on the world map') +
				':<input name="showFastWalkIconOnWorld" type="checkbox" value="on"' + (FSH.System.getValue('showFastWalkIconOnWorld')?' checked':'') + '></td></tr>' +
			//Log screen prefs
			'<tr><th colspan="2" align="left"><b>Log screen preferences</b></th></tr>' +
			'<tr><td align="right">Cleanup Guild Log' + FSH.Layout.helpLink('Dim Non Player Guild Log Messages', 'Any log messages not related to the ' +
				'current player will be dimmed (e.g. recall messages from guild store)') +
				':</td><td><input name="hideNonPlayerGuildLogMessages" type="checkbox" value="on"' + (FSH.System.getValue('hideNonPlayerGuildLogMessages')?' checked':'') + '></td></td></tr>' +
			'<tr><td align="right">Use New Guild Log' + FSH.Layout.helpLink('Use New Guild Log', 'This will replace the standard guild log with the helper version of the guild log.') +
				':</td><td><input name="useNewGuildLog" type="checkbox" value="on"' + (FSH.System.getValue('useNewGuildLog')?' checked':'') + '></td></td></tr>' +
			'<tr><td align="right">New Guild Log History' + FSH.Layout.helpLink('New Guild Log History (pages)', 'This is the number of pages that the new guild log screen will go back in history.') +
				':</td><td><input name="newGuildLogHistoryPages" size="3" value="'+ FSH.System.getValue('newGuildLogHistoryPages') + '" /></td></td></tr>' +
			'<tr><td align="right">Enable Log Coloring' + FSH.Layout.helpLink('Enable Log Coloring', 'Three logs will be colored if this is enabled, Guild Chat, Guild Log and Player Log. ' +
				'It will show any new messages in yellow and anything 20 minutes old ones in brown.') +
				':</td><td><input name="enableLogColoring" type="checkbox" value="on"' + (FSH.System.getValue('enableLogColoring')?' checked':'') + '></td></td></tr>' +
			'<tr><td align="right">New Log Message Sound' + FSH.Layout.helpLink('New Log Message Sound', 'The .wav or .ogg file to play when you have unread log messages. This must be a .wav or .ogg file. This option can be turned on/off on the world page. Only works in Firefox 3.5+') +
				':</td><td colspan="3"><input name="defaultMessageSound" size="60" value="'+ FSH.System.getValue('defaultMessageSound') + '" /></td></tr>' +
			'<tr><td align="right">Play sound on unread log' + FSH.Layout.helpLink('Play sound on unread log', 'Should the above sound play when you have unread log messages? (will work on Firefox 3.5+ only)') +
				':</td><td><input name="playNewMessageSound" type="checkbox" value="on"' + (FSH.System.getValue('playNewMessageSound')?' checked':'') + '>' +
				' Show speaker on world' + FSH.Layout.helpLink('Show speaker on world', 'Should the toggle play sound speaker show on the world map? (This icon is next to the Fallensword wiki icon and will only display on Firefox 3.5+)') +
				':<input name="showSpeakerOnWorld" type="checkbox" value="on"' + (FSH.System.getValue('showSpeakerOnWorld')?' checked':'') + '></tr></td>' +
			'<tr><td align="right">Enable Chat Parsing' + FSH.Layout.helpLink('Enable Chat Parsing', 'If this is checked, your character log will be parsed for chat messages and show the chat message on the screen if you reply to that message.') +
				':</td><td><input name="enableChatParsing" type="checkbox" value="on"' + (FSH.System.getValue('enableChatParsing')?' checked':'') + '></td></td></tr>' +
			'<tr><td align="right">Add attack link to log' + FSH.Layout.helpLink('Add attack link to log', 'If checked, this will add an Attack link to each message in your log.') +
				':</td><td><input name="addAttackLinkToLog" type="checkbox" value="on"' + (FSH.System.getValue('addAttackLinkToLog')?' checked':'') + '></td></td></tr>' +
			'<tr><td align="right">Enhance Chat Text Entry' + FSH.Layout.helpLink('Enhance Chat Text Entry', 'If checked, this will enhance the entry field for entering chat text on the guild chat page.') +
				':</td><td><input name="enhanceChatTextEntry" type="checkbox" value="on"' + (FSH.System.getValue('enhanceChatTextEntry')?' checked':'') + '></td></td></tr>' +
			//Equipment screen prefs
			'<tr><th colspan="2" align="left"><b>Equipment screen preferences</b></th></tr>' +
			'<tr><td align="right">Disable Item Coloring' + FSH.Layout.helpLink('Disable Item Coloring', 'Disable the code that colors the item text based on the rarity of the item.') +
				':</td><td><input name="disableItemColoring" type="checkbox" value="on"' + (FSH.System.getValue('disableItemColoring')?' checked':'') + '></td></tr>' +
			'<tr><td align="right">Show Quick Send Item' + FSH.Layout.helpLink('Show Quick Send on Manage Backpack', 'This will show a link beside each item which gives the option to quick send the item to this person') +
				':</td><td><input name="showQuickSendLinks" type="checkbox" value="on"' + (FSH.System.getValue('showQuickSendLinks')?' checked':'') + '>'+
				'Send Items To <input name="itemRecipient" size="10" value="'+ FSH.System.getValue('itemRecipient') + '" />' +
			'<tr><td align="right">Show Quick Drop Item' + FSH.Layout.helpLink('Show Quick Drop on Manage Backpack', 'This will show a link beside each item which gives the option to drop the item.  WARNING: NO REFUNDS ON ERROR') +
				':</td><td><input name="showQuickDropLinks" type="checkbox" value="on"' + (FSH.System.getValue('showQuickDropLinks')?' checked':'') + '>'+
			
			'<tr><td align="right">Quick Select all of type in Send Screen' + FSH.Layout.helpLink('Quick Select all of type in Send Screen', 'This allows you to customize what quick links you would like displayed in your send item screen.<br>Use the format [&quot;name&quot;,&quot;itemid&quot;],[&quot;othername&quot;,&quot;itemid2&quot;].<br>WARNING: NO REFUNDS ON ERROR') +
				':</td><td><input name="sendClasses" size="60" value="' + FSH.System.escapeHtml(FSH.System.getValue('sendClasses')) + '">'+
			
			//Quest Preferences
			'<tr><th colspan="2" align="left"><b>Quest preferences</b></th></tr>' +
			'<tr><td align="right">Hide Specific Quests' + FSH.Layout.helpLink('Hide Specific Quests', 'If enabled, this hides quests whose name matches the list (separated by commas). ' +
				'This works on Quest Manager and Quest Book.') +
				':</td><td colspan="3"><input name="hideQuests" type="checkbox" value="on"' + (FSH.System.getValue('hideQuests')?' checked':'') + '>' +
				'<input name="hideQuestNames" size="60" value="'+ FSH.System.getValue('hideQuestNames') + '" /></td></tr>' +
			'<tr><td align="right">Show Incomplete/Not Started Quests' + FSH.Layout.helpLink('Show Incomplete/Not Started Quests', 'If checked, the helper will check to see if you have quests that are not started, or are started, not complete and not being tracked.' +
				'<br>The helper will only check this when you change worlds, or if when it last checked, there were quests it detected for the current world.') +
				':</td><td colspan="3"><input name="checkForQuestsInWorld" type="checkbox" value="on"' + (FSH.System.getValue('checkForQuestsInWorld')?' checked':'') + '>' +
				'</td></tr>' +
			'<tr><td align="right">Store Last Quest Page' + FSH.Layout.helpLink('Store Last Quest Page', 'This will store the page and sort order of each of the three quest selection pages for next time you visit. If you need to reset the links, turn this option off, '+
				'click on the link you wish to reset and then turn this option back on again.') +
				':</td><td><input name="storeLastQuestPage" type="checkbox" value="on"' + (FSH.System.getValue('storeLastQuestPage')?' checked':'') + '></td></tr>' +
			'<tr><td align="right">Show All Quest Steps' + FSH.Layout.helpLink('Show All Quest Steps', 'Shows all quest steps in the UFSG.') +
				':</td><td><input name="showNextQuestSteps" type="checkbox" value="on"' + (FSH.System.getValue('showNextQuestSteps')?' checked':'') + '></td></tr>' +
			//profile prefs
			'<tr><th colspan="2" align="left"><b>Profile preferences</b></th></tr>' +
			'<tr><td align="right">Render self bio' + FSH.Layout.helpLink('Render self bio', 'This determines if your own bio will render the FSH special bio tags.') +
				':</td><td><input name="renderSelfBio" type="checkbox" value="on"' + (FSH.System.getValue('renderSelfBio')?' checked':'') + '></td></tr>' +
			'<tr><td align="right">Render other players\' bios' + FSH.Layout.helpLink('Render other players bios', 'This determines if other players bios will render the FSH special bio tags.') +
				':</td><td><input name="renderOtherBios" type="checkbox" value="on"' + (FSH.System.getValue('renderOtherBios')?' checked':'') + '></td></tr>' +
			'<tr><td align="right">Enable Bio Compressor' + FSH.Layout.helpLink('Enable Bio Compressor', 'This will compress long bios according to settings and provide a link to expand the compressed section.') +
				':</td><td><input name="enableBioCompressor" type="checkbox" value="on"' + (FSH.System.getValue('enableBioCompressor')?' checked':'') +
				'> Max Characters:<input name="maxCompressedCharacters" size="4" value="'+ FSH.System.getValue('maxCompressedCharacters') + '" />'+
				' Max Lines:<input name="maxCompressedLines" size="3" value="'+ FSH.System.getValue('maxCompressedLines') + '" /></td></tr>' +
			'<tr><td align="right">Buy Buffs Greeting' + FSH.Layout.helpLink('Buy Buffs Greeting', 'This is the default text to open a message with when asking to buy buffs. You can use {playername} to insert the target players name. You can also use' +
				' {buffs} to insert the list of buffs. You can use {cost} to insert the total cost of the buffs.') +
				':</td><td colspan="3"><input name="buyBuffsGreeting" size="60" value="'+ FSH.System.getValue('buyBuffsGreeting') + '" /></td></tr>' +
			'<tr><td align="right">Show Stat Bonus Total' + FSH.Layout.helpLink('Show Stat Bonus Total', 'This will show a total of the item stats when you mouseover an item on the profile screen.') +
				':</td><td><input name="showStatBonusTotal" type="checkbox" value="on"' + (FSH.System.getValue('showStatBonusTotal')?' checked':'') + '></td></tr>' +
			'<tr><td align="right">Enable Quick Drink' + FSH.Layout.helpLink('Enable Quick Drink On Profile', 'This enables the quick drink functionality on the profile page.') +
				':</td><td><input name="enableQuickDrink" type="checkbox" value="on"' + (FSH.System.getValue('enableQuickDrink')?' checked':'') + '></td></tr>' +
			//Arena prefs
			'<tr><th colspan="2" align="left"><b>Arena preferences</b></th></tr>' +
			'<tr><td align="right">Auto Sort Arena List' + FSH.Layout.helpLink('Auto Sort Arena List', 'This will automatically sort the arena list based on your last preference for sort.') +
				':</td><td><input name="autoSortArenaList" type="checkbox" value="on"' + (FSH.System.getValue('autoSortArenaList')?' checked':'') + '></td></tr>' +
			'<tr><td align="right">Hide Arena Prizes' + FSH.Layout.helpLink('Hide Arena Prizes', 'List of the itemIds of arena prizes that should not display on the arena screen ' +
				'separated by commas. To find the itemId you will have to view the source of the page or mouseover the item on the arena page.') +
				':</td><td colspan="3"><input name="hideArenaPrizes" size="60" value="'+ hideArenaPrizes + '" /></td></tr>' +
			//Bounty hunting prefs
			'<tr><th colspan="2" align="left"><b>Bounty hunting preferences</b></th></tr>' +
			'<tr><td align= "right">' + FSH.Layout.networkIcon + 'Show Active Bounties' + FSH.Layout.helpLink('Show Active Bounties', 'This will show your active bounties ' +
				'on the right hand side') + ':</td><td colspan="3"><input name="enableActiveBountyList" type = "checkbox" value = "on"' + (enableActiveBountyList? ' checked':'') + '/>' +
				'<input name="bountyListRefreshTime" size="3" value="'+ bountyListRefreshTime + '" /> seconds refresh</td></tr>' +
			'<tr><td align= "right">' + FSH.Layout.networkIcon + 'Show Wanted Bounties' + FSH.Layout.helpLink('Show Wanted Bounties', 'This will show when someone you want is on the bounty board, the list is ' +
				'displayed on the right hand side') + ':</td><td colspan="3"><input name="enableWantedList" type = "checkbox" value = "on"' + (enableWantedList? ' checked':'') + '/> Refresh time is same as Active Bounties' +
			'<tr><td align= "right">Wanted Names' + FSH.Layout.helpLink('Wanted Names', 'The names of the people you want to see on the bounty board separated by commas') + ':</td><td colspan="3">' +
				'<input name ="wantedNames" size ="60" value="' + wantedNames + '"/></td></tr>' +
			'<tr><td align= "right">' + FSH.Layout.networkIcon + 'Show Attack Helper' + FSH.Layout.helpLink('Show Attack Helper', 'This will show extra information on the attack player screen ' +
				'about stats and buffs on you and your target') + ':</td><td colspan="3"><input name="enableAttackHelper" type = "checkbox" value = "on"' + (FSH.System.getValue('enableAttackHelper')? ' checked':'') + '/>' +
			'<tr><td align= "right">' + FSH.Layout.networkIcon + 'Show PvP Summary in Log' + FSH.Layout.helpLink('Show PvP Summary in Log', 'This will show a summary of the PvP results in the log.') + ':</td><td colspan="3">' +
				'<input name="showPvPSummaryInLog" type = "checkbox" value = "on"' + (FSH.System.getValue('showPvPSummaryInLog')? ' checked':'') + '/>' +
			//Auction house prefs
			'<tr><th colspan="2" align="left"><b>Auction house preferences</b></th></tr>' +
			'<tr><td align="right">Auto Fill Min Bid Price' + FSH.Layout.helpLink('Auto Fill Min Bid Price', 'This enables the functionality to automatically fill in the min bid price so you just have to hit bid and your bid will be placed.') +
				':</td><td><input name="autoFillMinBidPrice" type="checkbox" value="on"' + (FSH.System.getValue('autoFillMinBidPrice')?' checked':'') + '></td></tr>' +
			//Other prefs
			'<tr><th colspan="2" align="left"><b>Other preferences</b></th></tr>' +
			'<tr><td align="right">Hide Specific Recipes' + FSH.Layout.helpLink('Hide Specific Recipes', 'If enabled, this hides recipes whose name matches the list (separated by commas). ' +
				'This works on Recipe Manager') +
				':</td><td colspan="3"><input name="hideRecipes" type="checkbox" value="on"' + (FSH.System.getValue('hideRecipes')?' checked':'') + '>' +
				'<input name="hideRecipeNames" size="60" value="'+ FSH.System.getValue('hideRecipeNames') + '" /></td></tr>' +
			'<tr><td align="right">Hide Relic Offline' + FSH.Layout.helpLink('Hide Relic Offline', 'This hides the relic offline defenders checker.') +
				':</td><td><input name="hideRelicOffline" type="checkbox" value="on"' + (FSH.System.getValue('hideRelicOffline')?' checked':'') + '></td></tr>' +
			'<tr><td align="right">Enter Sends Message' + FSH.Layout.helpLink('Enter Sends Message', 'If enabled, will send a message from the Send Message screen if you press enter. You can still insert a new line by holding down shift' +
			' when you press enter.') +
				':</td><td><input name="enterForSendMessage" type="checkbox" value="on"' + (FSH.System.getValue('enterForSendMessage')?' checked':'') + '></td></tr>' +
			'<tr><td align="right">Navigate After Message Sent' + FSH.Layout.helpLink('Navigate After Message Sent', 'If enabled, will navigate to the referring page after a successful message is sent. Example: ' +
				' if you are on the world screen and hit message on the guild info panel after you send the message, it will return you to the world screen.') +
				':</td><td><input name="navigateToLogAfterMsg" type="checkbox" value="on"' + (FSH.System.getValue('navigateToLogAfterMsg')?' checked':'') + '></td></tr>' +
			'<tr><td align= "right">Max Group Size to Join' + FSH.Layout.helpLink('Max Group Size to Join', 'This will disable HCSs Join All functionality and will only join groups less than a set size. ') +
				':</td><td colspan="3"><input name="enableMaxGroupSizeToJoin" type = "checkbox" value = "on"' + (FSH.System.getValue('enableMaxGroupSizeToJoin')? ' checked':'') + '/>' +
				'Max Size: <input name="maxGroupSizeToJoin" size="3" value="' + FSH.System.getValue('maxGroupSizeToJoin') + '" /></td></tr>' +
			//'<tr><td align="right">Disable Composing Prompts' + FSH.Layout.helpLink('Disable Composing Prompts', 'Disables confirmation prompts in composing screen.  WARNING: NO REFUNDS ON ERROR') +
			//	':</td><td><input name="disableComposingPrompts" type="checkbox" value="on"' + (FSH.System.getValue('disableComposingPrompts')?' checked':'') + '></td></tr>' +
			//save button
			//http://www.fallensword.com/index.php?cmd=notepad&blank=1&subcmd=savesettings
			'<tr><td colspan="2" align=center><input type="button" class="custombutton" value="Save" id="Helper:SaveOptions"></td></tr>' +
			'<tr><td colspan="2" align=center><a href="http://www.fallensword.com/index.php?cmd=notepad&blank=1&subcmd=savesettings">Export or Load Settings!</a></td></tr>' +
			'<tr><td colspan="2" align=center>' +
			'<span style="font-size:xx-small">Fallen Sword Helper was coded by <a href="' + FSH.System.server + 'index.php?cmd=profile&player_id=1393340">Coccinella</a>, ' +
			'<a href="' + FSH.System.server + 'index.php?cmd=profile&player_id=1599987">yuuzhan</a>, ' +
			'<a href="' + FSH.System.server + 'index.php?cmd=profile&player_id=1963510">PointyHair</a>, ' +
			'<a href="' + FSH.System.server + 'index.php?cmd=profile&player_id=1346893">Tangtop</a>, '+
			'<a href="' + FSH.System.server + 'index.php?cmd=profile&player_id=2536682">dkwizard</a>, ' +
			'<a href="' + FSH.System.server + 'index.php?cmd=profile&player_id=1570854">jesiegel</a>,  ' +
			'<a href="' + FSH.System.server + 'index.php?cmd=profile&player_id=2156859">ByteBoy</a>, and ' +
			'<a href="' + FSH.System.server + 'index.php?cmd=profile&player_id=2169401">McBush</a>, ' +
			'with valuable contributions by <a href="' + FSH.System.server + 'index.php?cmd=profile&player_id=524660">Nabalac</a>, ' +
			'<a href="' + FSH.System.server + 'index.php?cmd=profile&player_id=37905">Ananasii</a></td></tr>' +
			'</table></form>';
		//var insertHere = FSH.System.findNode('//table[@width="100%" and @cellspacing="0" and @cellpadding="5" and @border="0"]');
		//var newRow=insertHere.insertRow(insertHere.rows.length);
		//var newCell=newRow.insertCell(0);
		//newCell.colSpan=3;
		//newCell.innerHTML=configData;
		// insertHere.insertBefore(configData, insertHere);
		var maxID=parseInt($('div[id*="settingsTabs-"]:last').attr('id').split('-')[1], 10);
		$('div[id*="settingsTabs-"]:last').after('<div id="settingsTabs-'+(maxID+1)+'">'+configData+'</div>');
		if($('#settingsTabs').tabs('length')>0){
			//chrome, have to add it this way (due to loading order
			$('#settingsTabs').tabs('add','#settingsTabs-'+(maxID+1),'FSH Settings');
		}else{
			//firefox loads it later, so just print to page
			$('a[href*="settingsTabs-"]:last').parent().after('<li><a href="#settingsTabs-'+(maxID+1)+'">FSH Settings</a></li>');
		}

		document.getElementById('Helper:SaveOptions').addEventListener('click', FSH.settingsPage.saveConfig, true);
		document.getElementById('Helper:ShowLogs').addEventListener('click', FSH.settingsPage.showLogs, true);
		document.getElementById('Helper:ShowMonsterLogs').addEventListener('click', FSH.settingsPage.showMonsterLogs, true);
		if (FSH.System.getValue('map')) {document.getElementById('Helper:ResetFootprints').addEventListener('click', FSH.settingsPage.resetFootprints, true);}
		document.getElementById('Helper:updateFpColor').addEventListener('click', FSH.settingsPage.updateFpColor, true);

		document.getElementById('toggleShowGuildSelfMessage').addEventListener('click', FSH.System.toggleVisibilty, true);
		document.getElementById('toggleShowGuildFrndMessage').addEventListener('click', FSH.System.toggleVisibilty, true);
		document.getElementById('toggleShowGuildPastMessage').addEventListener('click', FSH.System.toggleVisibilty, true);
		document.getElementById('toggleShowGuildEnmyMessage').addEventListener('click', FSH.System.toggleVisibilty, true);

		var krulButton = FSH.System.findNode('//input[@value="Instant Portal back to Krul Island"]');
		var onClick = krulButton.getAttribute('onclick');
		//window.location='index.php?cmd=settings&subcmd=fix&xcv=3264968baaf287c67b0fab314280b163';
		var krulXCVRE = /xcv=([a-z0-9]+)'/;
		var krulXCV = krulXCVRE.exec(onClick);
		if (krulXCV) {FSH.System.setValue('krulXCV',krulXCV[1]);}

		var minGroupLevelTextField = FSH.System.findNode('//input[@name="min_group_level"]');
		if (minGroupLevelTextField) {
			var minGroupLevel = minGroupLevelTextField.value;
			FSH.System.setValue('minGroupLevel',minGroupLevel);
		}
	},

	toggleTickAllBuffs: function(){ // Legacy
		var allItems=FSH.System.findNodes('//input[@type="checkbox" and @name="blockedSkillList\[\]"]');
		var tckTxt =document.getElementById('Helper:tickAllBuffs');
		if (allItems) {
			for (var i=0; i<allItems.length; i += 1) {
				var checkboxForItem = allItems[i];
				if (checkboxForItem.style.visibility === 'hidden') {
					checkboxForItem.checked = false;
				} else {
					if(tckTxt.innerHTML==='Tick all buffs'){
						checkboxForItem.checked = true;
					}else{
						checkboxForItem.checked = false;
					}
				}
			}
			if(tckTxt.innerHTML==='Tick all buffs'){
				document.getElementById('Helper:tickAllBuffs').innerHTML='Untick all buffs';
			}else{
				document.getElementById('Helper:tickAllBuffs').innerHTML='Tick all buffs';
			}
		}
	},

	injectSettingsGuildData: function(guildType) { // Native
		var result='';
		result += '<input name="guild' + guildType + '" size="60" value="' + FSH.System.getValue('guild' + guildType) + '">';
		result += '<span style="cursor:pointer;text-decoration:none;" id="toggleShowGuild' + guildType + 'Message" linkto="showGuild' +
			guildType + 'Message"> &#x00bb;</span>';
		result += '<div id="showGuild' + guildType + 'Message" style="visibility:hidden;display:none">';
		result += '<input name="guild' + guildType + 'Message" size="60" value="' + FSH.System.getValue('guild' + guildType + 'Message') + '">';
		result += '</div>';
		return result;
	},

	saveConfig: function(evt) { // Legacy
		var oForm=evt.target.form;

		//bio compressor validation logic
		var maxCompressedCharacters = FSH.System.findNode('//input[@name="maxCompressedCharacters"]', oForm);
		var maxCompressedCharactersValue = maxCompressedCharacters.value*1;
		if (isNaN(maxCompressedCharactersValue) || maxCompressedCharactersValue<=50) {
			maxCompressedCharacters.value=1500;
		}
		var maxCompressedLines = FSH.System.findNode('//input[@name="maxCompressedLines"]', oForm);
		var maxCompressedLinesValue = maxCompressedLines.value*1;
		if (isNaN(maxCompressedLinesValue) || maxCompressedLinesValue<=1) {
			maxCompressedLines.value=25;
		}
		var newGuildLogHistoryPages = FSH.System.findNode('//input[@name="newGuildLogHistoryPages"]', oForm);
		var newGuildLogHistoryPagesValue = newGuildLogHistoryPages.value*1;
		if (isNaN(newGuildLogHistoryPagesValue) || newGuildLogHistoryPagesValue<=1) {
			newGuildLogHistoryPages.value=25;
		}
		var maxGroupSizeToJoin = FSH.System.findNode('//input[@name="maxGroupSizeToJoin"]', oForm);
		var maxGroupSizeToJoinValue = maxGroupSizeToJoin.value*1;
		if (isNaN(maxGroupSizeToJoinValue) || maxGroupSizeToJoinValue<=1) {
			maxGroupSizeToJoin.value=11;
		}
		var combatEvaluatorBiasElement = FSH.System.findNode('//select[@name="combatEvaluatorBias"]', oForm);
		var combatEvaluatorBias = combatEvaluatorBiasElement.value*1;
		FSH.System.setValue('combatEvaluatorBias', combatEvaluatorBias);
		var enabledHuntingModeElement = FSH.System.findNode('//select[@name="enabledHuntingMode"]', oForm);
		var enabledHuntingMode = enabledHuntingModeElement.value;
		FSH.System.setValue('enabledHuntingMode', enabledHuntingMode);

		FSH.Data.saveBoxes.forEach(FSH.System.saveValueForm, oForm);

		window.alert('FS Helper Settings Saved');
		location.reload();
		return false;
	},

	showLogs: function() { // Native
		document.location=FSH.System.server + 'index.php?cmd=notepad&blank=1&subcmd=showlogs';
	},

	showMonsterLogs: function() { // Native
		document.location=FSH.System.server + 'index.php?cmd=notepad&blank=1&subcmd=monsterlog';
	},

	resetFootprints: function() { // Native
		if (window.confirm('Are you sure you want to reset your footprints?')) {
			var theMap = FSH.System.getValueJSON('map');
			if (theMap) {
				theMap = {};
				theMap.levels = {};
				FSH.System.setValueJSON('map', theMap);
			}
			location.reload();
		}
	},

	updateFpColor: function() { // Native
		FSH.System.setValue('footprintsColor', FSH.System.findNode('//input[@name="footprintsColor"]').value);
		location.reload();
	},

};

FSH.news = { // Legacy

	newsFsbox: function() { // Native
		FSH.news.injectShoutboxWidgets('fsbox_input', 100);
	},

	newsShoutbox: function() { // Native
		FSH.news.injectShoutboxWidgets('shoutbox_input', 150);
	},

	injectShoutboxWidgets: function(textboxname, maxcharacters) { // Legacy
		var textArea = FSH.System.findNode('//textarea[@name="' + textboxname + '"]');
		textArea.setAttribute('findme', 'Helper:InputText');
		textArea.setAttribute('maxcharacters', maxcharacters);
		var textAreaTable = FSH.System.findNode('../../../..', textArea);
		textAreaTable.insertRow(-1).insertCell(0).setAttribute('id', 'Helper:ShoutboxPreview');
		textArea.addEventListener('keyup', FSH.news.updateShoutboxPreview, true);
	},

	updateShoutboxPreview: function() { // Legacy
		var textArea = FSH.System.findNode('//textarea[@findme="Helper:InputText"]');
		var textContent = textArea.value;
		var chars = textContent.length;
		var maxchars = parseInt(textArea.getAttribute('maxcharacters'),10);
		if (chars>maxchars) {
			textContent=textContent.substring(0,maxchars);
			textArea.value=textContent;
			chars=maxchars;
		}

		document.getElementById('Helper:ShoutboxPreview').innerHTML = '<table align="center" width="325" border="0"><tbody>' +
			'<tr><td style="text-align:center;color:#7D2252;background-color:#CD9E4B">Preview (' + chars + '/' + maxchars + ' characters)</td></tr>' +
			'<tr><td width="325"><span style="font-size:x-small;" findme="biopreview">' + textContent +
			'</span></td></tr></tbody></table>';

	},

	injectHomePageTwoLink: function() { //jquery
		var archiveLink =
			$('a[href="index.php?cmd=&subcmd=viewupdatearchive"]',
			$('div#pCC'));
		if (archiveLink.length !== 1) {return;}
		archiveLink.after('&nbsp;<a href="index.php?cmd=&subcmd=viewupdatear' +
			'chive&subcmd2=&page=2&search_text=">View Updates Page 2</a>');
		archiveLink = $('a[href="index.php?cmd=&subcmd=viewarchive"]',
			$('div#pCC'));
		archiveLink.after('&nbsp;<a href="index.php?cmd=&subcmd=viewarchive&' +
			'subcmd2=&page=2&search_text=">View News Page 2</a>');
	},

};

FSH.environment = { // Legacy

	// main event dispatcher
	dispatch: function() { // jQuery

		if (typeof ga !== 'undefined') {
			ga('create', 'UA-76488113-1', 'auto', 'fsh');
			ga('fsh.set', 'appName', 'fsh');
			ga('fsh.set', 'appVersion', '1512b3');
		}

		var cmd;
		var subcmd;
		var subcmd2;
		var type;
		var fromWorld;
		var fn;

		if (document.location.search !== '') {
			cmd = FSH.System.getUrlParameter('cmd') || '-';
			subcmd = FSH.System.getUrlParameter('subcmd') || '-';
			subcmd2 = FSH.System.getUrlParameter('subcmd2') || '-';
			type = FSH.System.getUrlParameter('type') || '-';
			fromWorld = FSH.System.getUrlParameter('fromworld') || '-';
		} else {
			cmd = $('input[name="cmd"]').val() || '-';
			subcmd = $('input[name="subcmd"]').val() || '-';
			if (subcmd==='dochat') {
				cmd='-';
				subcmd='-';
			}
			subcmd2 = $('input[name="subcmd2"]').val() || '-';
			type = '-';
			fromWorld = '-';
		}

		FSH.cmd = cmd;
		FSH.subcmd = subcmd;
		FSH.subcmd2 = subcmd2;
		FSH.type = type;
		FSH.fromWorld = fromWorld;

		FSH.Helper.page = cmd + '/' + subcmd + '/' + subcmd2 + '(' + type + ')';

		var hcsData = $('html').data('hcs');
		if (hcsData && hcsData['new-ui']) { // UFSG or QuickBuff
			FSH.environment.prepareEnv();
		}

		var pageSwitcher = FSH.Data.pageSwitcher;

		if (pageSwitcher[cmd] &&
			pageSwitcher[cmd][subcmd] &&
			pageSwitcher[cmd][subcmd][subcmd2] &&
			pageSwitcher[cmd][subcmd][subcmd2][type] &&
			pageSwitcher[cmd][subcmd][subcmd2][type][fromWorld]) {
			fn = FSH.System.getFunction(
				pageSwitcher[cmd][subcmd][subcmd2][type][fromWorld]);
			if (typeof fn === 'function') {fn();}
		}

		if (FSH.System.getValue('playNewMessageSound')) {
			FSH.environment.doMsgSound();
		}

		// This must be at the end in order not to screw up other FSH.System.findNode calls (Issue 351)
		if (!FSH.Helper.huntingMode) {
			FSH.environment.injectQuickLinks();
		}
	},

	prepareEnv: function() { // jQuery
		if (FSH.System.getValue('gameHelpLink')) {
			var gameHelpNode = $('div.minibox h3:contains("Game Help")');
			$(gameHelpNode).each(function() {
				$(this).html('<a href="index.php?cmd=settings" style="color:' +
					' #FFFFFF; text-decoration: underline">' +
					$(this).text() + '</a>');
			});
		}

		FSH.Helper.huntingMode = FSH.System.getValue('huntingMode');

		if (FSH.Helper.huntingMode) {
			FSH.environment.replaceKeyHandler();
			// FSH.Helper.fixOnlineGuildBuffLinks();
		} else {
			//move boxes in opposite order that you want them to appear.
			if (FSH.System.getValue('moveGuildList')) {
				FSH.Layout.moveRHSBoxUpOnRHS('minibox-guild');
			}
			if (FSH.System.getValue('moveOnlineAlliesList')) {
				FSH.Layout.moveRHSBoxUpOnRHS('minibox-allies');
			}
			if (FSH.System.getValue('moveFSBox')) {
				FSH.Layout.moveRHSBoxToLHS('minibox-fsbox');
			}
			FSH.environment.getEnvVars();
			if (FSH.Helper.enableAllyOnlineList ||
				FSH.Helper.enableEnemyOnlineList) {
				FSH.allyEnemy.prepareAllyEnemyList();
			}
			if (FSH.Helper.enableWantedList ||
				FSH.Helper.enableActiveBountyList) {
				FSH.Helper.prepareBountyData();
			}
			FSH.environment.injectStaminaCalculator();
			FSH.environment.injectLevelupCalculator();
			FSH.Layout.injectMenu();
			FSH.environment.replaceKeyHandler();
			FSH.environment.injectFSBoxLog();
			FSH.environment.fixOnlineGuildBuffLinks();
			if (FSH.Helper.enableGuildInfoWidgets) {
				FSH.environment.addGuildInfoWidgets();
			}
			if (FSH.Helper.enableOnlineAlliesWidgets) {
				FSH.environment.addOnlineAlliesWidgets();
			}
			FSH.notification.injectJoinAllLink();
			FSH.environment.changeGuildLogHREF();
			FSH.news.injectHomePageTwoLink();
			if (FSH.Helper.enableTempleAlert) {
				FSH.notification.injectTempleAlert();}
			if (FSH.Helper.enableUpgradeAlert) {
				FSH.notification.injectUpgradeAlert();}
			if (FSH.Helper.enableComposingAlert) {
				FSH.composing.injectComposeAlert();}
			FSH.messaging.injectQuickMsgDialogJQ();
		}
		if (!FSH.System.getValue('hideHelperMenu')) {
			FSH.helperMenu.injectHelperMenu();
		}
	},

	replaceKeyHandler: function() { // jQuery
		if ($('#worldPage').length === 0) { // not new map
			//clear out the HCS keybinds so only helper ones fire
			$.each($(document).controls('option').keys, function(index) { 
				$(document).controls('option').keys[index] = [];
			});
		}
		window.document.onkeypress = null;
		window.document.combatKeyHandler = null;
		window.document.realmKeyHandler = null;
		window.document.onkeypress = FSH.Helper.keyPress;
	},

	getEnvVars: function() { // Native
		FSH.Helper.enableAllyOnlineList =
			FSH.System.getValue('enableAllyOnlineList');
		FSH.Helper.enableEnemyOnlineList =
			FSH.System.getValue('enableEnemyOnlineList');
		FSH.Helper.enableGuildInfoWidgets =
			FSH.System.getValue('enableGuildInfoWidgets');
		FSH.Helper.enableOnlineAlliesWidgets =
			FSH.System.getValue('enableOnlineAlliesWidgets');
		FSH.Helper.hideGuildInfoTrade =
			FSH.System.getValue('hideGuildInfoTrade');
		FSH.Helper.hideGuildInfoSecureTrade =
			FSH.System.getValue('hideGuildInfoSecureTrade');
		FSH.Helper.hideGuildInfoBuff =
			FSH.System.getValue('hideGuildInfoBuff');
		FSH.Helper.hideGuildInfoMessage =
			FSH.System.getValue('hideGuildInfoMessage');
		FSH.Helper.hideBuffSelected = FSH.System.getValue('hideBuffSelected');
		FSH.Helper.enableTempleAlert = FSH.System.getValue('enableTempleAlert');
		FSH.Helper.enableUpgradeAlert =
			FSH.System.getValue('enableUpgradeAlert');
		FSH.Helper.enableComposingAlert =
			FSH.System.getValue('enableComposingAlert');

		FSH.Helper.enableActiveBountyList =
			FSH.System.getValue('enableActiveBountyList');
		FSH.Helper.enableWantedList = FSH.System.getValue('enableWantedList');

		FSH.Helper.allyEnemyOnlineRefreshTime =
			FSH.System.getValue('allyEnemyOnlineRefreshTime') * 1000;

	},

	injectStaminaCalculator: function() { // jQuery
		var staminaMouseover = $('dl#statbar-stamina-tooltip-stamina:first');
		var stamina = $(staminaMouseover).find('dt.stat-name:first').next().text().replace(/,/g,'');
		var staminaRE = /([,0-9]+)\s\/\s([,0-9]+)/;
		var curStamina = FSH.System.intValue(staminaRE.exec(stamina)[1]);
		var maxStamina = FSH.System.intValue(staminaRE.exec(stamina)[2]);
		var gainPerHour = $(staminaMouseover).find('dt.stat-stamina-gainPerHour:first').next().text().replace(/,/g,'');
		var gainPerHourRE = /\+([,0-9]+)/;
		gainPerHour = FSH.System.intValue(gainPerHourRE.exec(gainPerHour)[1]);
		var nextGain = $(staminaMouseover).find('dt.stat-stamina-nextGain:first').next().text().replace(/,/g,'');
		var nextGainRE = /([,0-9]+)m ([,0-9]+)s/;
		var nextGainMinutes = FSH.System.intValue(nextGainRE.exec(nextGain)[1]);
		// var nextGainSeconds = FSH.System.intValue(nextGainRE.exec(nextGain)[2]);
		var nextGainHours = nextGainMinutes/60;
		//get the max hours to still be inside stamina maximum
		var hoursToMaxStamina = Math.floor((maxStamina - curStamina)/gainPerHour);
		var millisecondsToMaxStamina = 1000*60*60*(hoursToMaxStamina + nextGainHours);
		var now = Date.now();
		var nextHuntMilliseconds = now + millisecondsToMaxStamina;
		var d = new Date(nextHuntMilliseconds);
		// var nextHuntTimeText = d.toFormatString('HH:mm ddd dd/MMM/yyyy');
		var nextHuntTimeText = FSH.System.formatShortDate(d);
		$(staminaMouseover).append('<dt class="stat-stamina-nextHuntTime">Max Stam At</dt><dd>' + nextHuntTimeText + '</dd>');
	},

	injectLevelupCalculator: function() { // jQuery
		var remainingXP =  parseInt($('dt[class="stat-xp-remaining"]').next('dd').html().replace(/,/g,''), 10);
		var nextGainTime =  $('dt[class="stat-xp-nextGain"]').next('dd').html();
		var gain =  parseInt($('dt[class="stat-xp-gainPerHour"]').next('dd').html().replace(/,/g,''), 10);
		var nextGainRE = /([0-9]*)m\s*([0-9]*)s/i;
		var nextGain = nextGainRE.exec(nextGainTime);
		var nextGainMin = parseInt(nextGain[1],10);
		var nextGainSec = parseInt(nextGain[2],10);
		var hoursToNextLevel = Math.ceil(remainingXP/gain);
		var millisecsToNextGain = (hoursToNextLevel*60*60+nextGainMin*60+nextGainSec)*1000;
		nextGainTime  = new Date(Date.now() + millisecsToNextGain);
		$('dl[id="statbar-level-tooltip-general"]').append('<dt class="stat-xp-nextLevel">Next Level At</dt><dd>'+
				// nextGainTime.toFormatString('HH:mm ddd dd/MMM/yyyy')+'</dd>');
				FSH.System.formatShortDate(nextGainTime)+'</dd>');
	},

	injectFSBoxLog: function() { // Bad jQuery
		if (!FSH.System.getValue('fsboxlog')) {return;}
		var node=$('div#minibox-fsbox');
		if (node.length > 0) {
			var fsbox=node.find('p.message').html().replace('<br><br>',' ');
			var boxList=FSH.System.getValue('fsboxcontent');
			if (boxList.indexOf(fsbox)<0) {boxList='<br>'+fsbox+boxList;}
			if (boxList.length>10000) {boxList=boxList.substring(0,10000);}
			FSH.System.setValue('fsboxcontent',boxList);
			var nodediv = node.find('div');
			var playerName = node.find('a:first').text();
			nodediv.html(nodediv.html() + '&nbsp;' +
				'<nobr><a title="Add to Ignore List" href="index.php?cmd=log&subcmd=doaddignore&ignore_username=' + playerName +
				'" style="color:PaleVioletRed">[ Ignore ]</a>&nbsp;' +
				'<a href="index.php?cmd=notepad&blank=1&subcmd=fsboxcontent" style="color:yellow">[ Log ]</a></nobr>');
		}
	},

	fixOnlineGuildBuffLinks: function() { // jQuery
		$('a#guild-minibox-action-quickbuff').each(function() {
			var self = $(this);
			self.attr('href', self.attr('href').replace(/500/g,'1000'));
		});
		$('a#online-allies-action-quickbuff').each(function() {
			var self = $(this);
			self.attr('href', self.attr('href').replace(/, 500/g,', 1000'));
		});
	},

	addGuildInfoWidgets: function() { //jquery
		var guildMembrList = $('ul#minibox-guild-members-list');
		if (guildMembrList.length === 0) {return;} // list exists
		//hide guild info links
		if (FSH.Helper.hideGuildInfoTrade) {
			$('a#guild-minibox-action-trade').hide();
		}
		if (FSH.Helper.hideGuildInfoSecureTrade) {
			$('a#guild-minibox-action-secure-trade').hide();
		}
		if (FSH.Helper.hideGuildInfoBuff) {
			$('a#guild-minibox-action-quickbuff').hide();
		}
		if (FSH.Helper.hideGuildInfoMessage) {
			$('a#guild-minibox-action-send-message').hide();
		}
		if (FSH.Helper.hideBuffSelected) {
			$('a.guild-buff-check-on').hide();
			$('ul#guild-quick-buff').hide();
		}
		//add coloring for offline time
		$('a.player-name', guildMembrList).each(function() {
			var playerA = $(this);
			var lastActivityMinutes = /Last Activity:<\/td><td>(\d+) mins/
				.exec(playerA.data('tipped'))[1];
			if (lastActivityMinutes < 2) {
				playerA.css('color','green');
			} else if (lastActivityMinutes < 5) {
				playerA.css('color','white');
			} else {
				playerA.css('color','gray');
			}
		});
		var chatH4 = $('h4:contains("Chat")');
		chatH4.html('<a href="index.php?cmd=guild&subcmd=chat"><span style="' +
			'color:white;">' + chatH4.html() + '</span></a>');
	},

	addOnlineAlliesWidgets: function() { // jQuery
		var onlineAlliesList = $('ul#minibox-allies-list');
		if (onlineAlliesList.length === 0) {return;}
		if (FSH.Helper.hideGuildInfoTrade) {
			$('a#online-allies-action-trade').hide();
		}
		if (FSH.Helper.hideGuildInfoSecureTrade) {
			$('a#online-allies-action-secure-trade').hide();
		}
		if (FSH.Helper.hideGuildInfoBuff) {
			$('a#online-allies-action-quickbuff').hide();
		}
		if (FSH.Helper.hideGuildInfoMessage) {
			$('a#online-allies-action-send-message').hide();
		}
		if (FSH.Helper.hideBuffSelected) {
			$('a.ally-buff-check-on').hide();
			$('ul#ally-quick-buff').hide();
		}
		//add coloring for offline time
		$(onlineAlliesList).find('li.player').each(function() {
			var playerA = $(this).find('a[class*="player-name"]');
			var onMouseOver = playerA.data('tipped');
			var lastActivityMinutes = /Last Activity:<\/td><td>(\d+) mins/.exec(onMouseOver)[1];
			if (lastActivityMinutes < 2) {
				playerA.css('color','DodgerBlue');
			} else if (lastActivityMinutes < 5) {
				playerA.css('color','LightSkyBlue');
			} else {
				playerA.css('color','PowderBlue');
			}
		});
	},

	changeGuildLogHREF: function() { // Legacy
		if (!FSH.System.getValue('useNewGuildLog')) {return;}
		var guildLogNodes = FSH.System.findNodes('//a[@href="index.php?cmd=guild&subcmd=log"]');
		var guildLogNode;
		var messageBox;
		if (guildLogNodes) {
			for (var i=0;i<guildLogNodes.length;i += 1) {
				guildLogNode = guildLogNodes[i];
				guildLogNode.setAttribute('href', 'index.php?cmd=notepad&blank=1&subcmd=newguildlog');
			}
			//hide the lhs box
			if (location.search === '?cmd=notepad&blank=1&subcmd=newguildlog') {
				if(guildLogNode.firstChild.nodeName === 'IMG' && guildLogNode.firstChild.getAttribute('alt') === 'You have unread guild log messages.') { //old UI
					messageBox = guildLogNode.parentNode.parentNode;
					if (messageBox) {
						messageBox.style.display = 'none';
						messageBox.style.visibility = 'hidden';
						//hide the empty row before it too (can"t do after in case there is no after row)
						messageBox.previousSibling.style.display = 'none';
						messageBox.previousSibling.style.visibility = 'hidden';
					}
				} else if (guildLogNode.innerHTML.search('Guild Log updated!') !== -1) { // new UI
					messageBox = guildLogNode.parentNode;
					if (messageBox) {
						messageBox.style.display = 'none';
						messageBox.style.visibility = 'hidden';
					}
				}
			}
		}
	},

	doMsgSound: function() { // jQuery
		var soundLocation = FSH.System.getValue('defaultMessageSound');
		$('a:contains("New log messages"):first').each(function(){
			$(this).after('<audio src="' + soundLocation +
			'" autoplay=true />');
		});
		$('a:contains("New Guild chat message"):first').each(function(){
			$(this).after('<audio src="' + soundLocation +
			'" autoplay=true />');
		});
	},

	injectQuickLinks: function() { //jquery
		// don't put all the menu code here (but call if clicked) to minimize lag
		var quickLinks = FSH.System.getValueJSON('quickLinks');
		if (!quickLinks) {quickLinks=[];}
		//FSH.Helper.quickLinks = quickLinks;
		if (quickLinks.length <= 0) {return;}
		var node=$('#statbar-container');
		if (node.length === 0) {return;}
		var html = '<div style="cursor:pointer; text-decoration:underline; ' +
			'text-align:left; position:absolute; color:black; top:' +
			FSH.System.getValue('quickLinksTopPx') + 'px; left:' +
			FSH.System.getValue('quickLinksLeftPx') + 'px; background-image:' +
			'url(\'' + FSH.System.imageServer + '/skin/inner_bg.jpg\'); font-' +
			'size:12px; -moz-border-radius:5px; -webkit-border-radius:5px; ' +
			'border:3px solid #cb7; z-index: 1; width: 100px;" ' +
			'id=fshQuickLinks nowrap>';
		for (var i=0; i<quickLinks.length; i += 1) {
				html += '<li><span style="cursor:pointer; text-decoration:' +
					'underline;"><a href="' + quickLinks[i].url + '"' +
					(quickLinks[i].newWindow ? ' target=new' : '') +
					'>' + quickLinks[i].name + '</a></span></li>';
			
		}
		html += '</div>';
		node.before(html);
		$('#fshQuickLinks').draggable();
		if (FSH.System.getValue('keepHelperMenuOnScreen')) {
			var quickLinksTopPx = parseInt(
				FSH.System.getValue('quickLinksTopPx'), 10);
			$(document).ready(function(){  
				$(window).scroll(function() {  
					var offset = quickLinksTopPx + $(document).scrollTop() +
						'px';  
					$('#fshQuickLinks').animate({top:offset},
						{duration:0,queue:false});  
				});  
			}); 
		}
	},

	unknownPage: function() { // Legacy

		//var isRelicPage = $('div#pCC td:contains("Below is the current status for the relic")');
		//var isRelicPage = FSH.System.findNode('//td[contains(.,"Below is the current status for the relic")]/b');
		if ($('div#pCC td:contains("Below is the current status for ' +
			'the relic")').length > 0) {
			FSH.Helper.injectRelic();
		}
		var isBuffResult = FSH.System.findNode('//td[contains(.,"Back to Quick Buff Menu")]');
		if (isBuffResult) {
			FSH.Helper.updateBuffLog();
		}
		//FSH.System.findNode('//td[contains(.,"then click to purchase for the price listed below the item.")]');
		//var isShopPage =  $('#shop-info').length > 0;
		if ($('#shop-info').length > 0) {
			FSH.Helper.injectShop();
		}
		var isQuestBookPage = FSH.System.findNode('//td[.="Quest Name"]');
		if (isQuestBookPage) {
			FSH.questBook.injectQuestBookFull();
		}
		var isAdvisorPageClue1 = FSH.System.findNode('//font[@size=2 and .="Advisor"]');
		var clue2 = '//a[@href="index.php?cmd=guild&amp;subcmd=manage" and .="Back to Guild Management"]';
		var isAdvisorPageClue2 = FSH.System.findNode(clue2);
		if (isAdvisorPageClue1 && isAdvisorPageClue2) {
			FSH.Helper.injectAdvisor();
		}
		// var isArenaTournamentPage = FSH.System.findNode('//b[contains(.,"Tournament #")]');
		// if (isArenaTournamentPage) {
			// FSH.Helper.injectTournament();
		// }
		if (FSH.System.findNode('//a[.="Back to Scavenging"]')) {
			FSH.Helper.injectScavenging();
		}
		if ($('div#pCC img[title="Inventing"]').length > 0) {
			FSH.Helper.injectInvent();
		}
	},

};

FSH.messaging = { // jQuery

	injectQuickMsgDialogJQ: function() { // jQuery
		FSH.Helper.template = FSH.System.getValueJSON('quickMsg');
		var buttons = $('#quickMessageDialog').dialog('option','buttons');
		buttons.Template = FSH.messaging.showMsgTemplate;
		$('#quickMessageDialog').dialog('option','buttons',buttons);
		window.openQuickMsgDialog = FSH.messaging.openQuickMsgDialog;
	},

	showMsgTemplate: function() { // jQuery
		var targetPlayer=$('#quickMsgDialog_targetUsername').text();
		$('#msgTemplateDialog').remove();

		// template displayed
		var html='<div id=msgTemplateDialog title="Choose Msg Template" ' +
			'style="display:none"><style>#msgTemplate .ui-selecting { ' +
			'background: #FECA40; };</style><ol id=msgTemplate valign=center>';
		for (var i = 0; i < FSH.Helper.template.length; i += 1) {
			html += '<li class="ui-widget-content">' +
				FSH.Helper
				.template[i]
				.replace(/\{playername\}/g, targetPlayer) + '</li>';
		}
		html += '</ol></div>';
		$('body').append(html);

		// template manager
		$('#msgTemplate li').prepend('<input type=button class="del-button" value=Del style="display:none">');
		$('#msgTemplate').append('<li class="add-button" style="display:none"><input type=button id=newTmplAdd value=Add><input id=newTmpl class=ui-widget-content></li>');
		$(':button','#msgTemplate').button();
		$('.del-button').click(function(evt) {
			FSH.Helper.template.splice($('#msgTemplate li').index(evt.target.parentNode), 1);
			FSH.System.setValueJSON('quickMsg', FSH.Helper.template);
			$('#msgTemplateDialog').dialog('close');
			FSH.messaging.showMsgTemplate();
		});
		$('#newTmplAdd').click(function() {
			if ($('#newTmpl').val() === '') {return;}
			FSH.Helper.template.push($('#newTmpl').val());
			FSH.System.setValueJSON('quickMsg', FSH.Helper.template);
			$('#msgTemplateDialog').dialog('close');
			FSH.messaging.showMsgTemplate();
		});

		// enable selectable template
		$( '#msgTemplate' ).selectable({
			filter: 'li.ui-widget-content',
			stop: function() {
				if ($('.add-button.ui-selected').length > 0) {return;} // click on add row
				if ($('.ui-selected').length === 0) {return;} // nothing selected yet
				$('#quickMsgDialog_msg').val($('#quickMsgDialog_msg').val() +
					$('#msgTemplate .ui-selected').text()+'\n');
				$('#msgTemplateDialog').dialog('close');
			}
		});

		// show the template form
		$('#msgTemplateDialog').dialog({'buttons':{
			'Manage':function() {
				$('.del-button').toggle();
				$('.add-button').toggle();
			},
			'Cancel':function() {
				$('#msgTemplateDialog').dialog('close');
				$('#msgTemplateDialog').remove();
			}
		}});
	},

	openQuickMsgDialog: function(name, msg, tip) { // jQuery
		$('#quickMsgDialog_targetUsername').html(name);
		$('#quickMsgDialog_targetPlayer').val(name);
		if (!msg) {msg = '';}
		$('#quickMsgDialog_msg').val(msg);
		$('#quickMsgDialog_msg').removeAttr('disabled');
		if (!tip) {tip='';}
		$('.validateTips').text(tip);
		$('#quickMessageDialog').dialog('open');
	},

};

FSH.mailbox = { // Hybrid

	injectMailbox: function() { // Hybrid
		var items = $('div#pCC a');
		if (items.length === 0) {return;} // Empty mailbox
			//~ if ($('#pCC b:contains("Item Mailbox")').length === 1) {
		$('#pCC').wrapInner('<div id="regularMailbox" />');
		var quickTakeDiv='<div id="quickTake" style="display:none"><br />' +
			'<br /><center><font size="3"><b>Quick Take</b></font>'+
			'<br />Select which item to take all similar items from your ' +
			'Mailbox.<br /></center>'+
			'<table id="quickTakeTable" align="left"><tr><th width=20%>' +
			'Actions</th><th>Items</th></tr><tr><td id="take_result" ' +
			'colspan=2></td></tr></table>'+
			'</div>';
		$('#pCC').prepend('<span id="mailboxSwitcher" ' +
			'style="cursor:pointer; text-decoration:underline; ' +
			'color:blue;">Toggle Quick Take</span><input type="hidden" ' +
			'id="currentMBDisplay" value="mailbox" />'+quickTakeDiv);
			//~ }
		var itemList = {};
		$('#regularMailbox img[data-tipped*="t=5"]').each(function() {
			var itemIDs = /item_id=(\d+)\&inv_id=(\d+)/
				.exec($(this).attr('data-tipped'));
			if (!itemIDs) {return;}
			var itemId = itemIDs[1];
			var invId = itemIDs[2];
			var tipped = $(this).attr('data-tipped');
			var src = $(this).attr('src');
			if (!itemList[itemId]) {
				var invIds = [];
				invIds.push(invId);
				itemList[itemId] = {
					invIds: invIds,
					tipped: tipped,
					src: src
				};
			} else {
				itemList[itemId].invIds.push(invId);
			}
		});
		var quickTakeTable = $('#quickTakeTable');
		Object.keys(itemList).forEach(function(id) {
			var titem = itemList[id];
			quickTakeTable.append('<tr><td align=center>' +
				'<span style="cursor:pointer; text-decoration:underline; ' +
				'color:blue; font-size:x-small;" ' +
				'id="Helper:takeAllSimilar' + id + '" invIDs="' + titem.invIds.join() +
				'">Take All ' + titem.invIds.length + '</span></td>'+
				'<td><img src="' + titem.src +
				'" class="t_hideOnClickOutside" border="0" data-tipped="' +
				titem.tipped + '"></td></tr>');
			document.getElementById('Helper:takeAllSimilar' + id)
				.addEventListener('click', FSH.mailbox.takeAllSimilar, true);
		});
		document.getElementById('mailboxSwitcher')
			.addEventListener('click', FSH.mailbox.toggleQuickTake, true);
	},

	takeAllSimilar: function(evt) { // Hybrid
		var invIds = evt.target.getAttribute('invIDs').split(',');
		evt.target.parentNode.innerHTML = 'taking all ' +
			invIds.length + ' items';
		invIds.forEach(function(invId) {
			$.ajax({
				type: 'POST',
				url: 'index.php',
				data: {
					'cmd': 'tempinv',
					'subcmd': 'takeitem',
					'temp_id': invId,
					'ajax': '1'
				},
				dataType: 'json'
			}).done(FSH.mailbox.quickDoneTaken);
		});
	},

	quickDoneTaken: function(data) { // jQuery
		// www.fallensword.com/index.php?cmd=tempinv&subcmd=takeitem&temp_id=141980821&ajax=1
		// {"r":0,"m":"","temp_id":141980821}
		if (data.r !== 0) {
			var $tempError = $('#temp_error');
			$tempError.html('<span style="color: red">Error:</span> ' + data.m);
			$tempError.show().delay(5000).hide(400);
		} else {
			var qtipId = $('#temp-inv-img-' + data.temp_id).data('hasqtip');
			$('#temp-inv-' + data.temp_id).remove();
			$('#qtip-' + qtipId).remove();
		}
		$('#take_result').append('<br />Item taken.');
	},

	toggleQuickTake: function(){ // jQuery
		if($('#currentMBDisplay').attr('value')==='mailbox'){
			$('#mailboxSwitcher').html('Toggle Mailbox');
			$('#quickTake').css('display','block');
			$('#regularMailbox').css('display','none');
			$('#currentMBDisplay').attr('value','quicktake');
		}else{
			$('#mailboxSwitcher').html('Toggle Quick Take');
			$('#quickTake').css('display','none');
			$('#regularMailbox').css('display','block');
			$('#currentMBDisplay').attr('value','mailbox');
		}
	},

};

})();
