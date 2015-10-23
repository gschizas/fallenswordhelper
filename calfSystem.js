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
				var value = window.localStorage.getItem(GMSTORAGE_PATH +
					name);
				if (value === null || value === undefined){
					return defValue;
				} else{
					switch (value.substr(0, 2)){
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
					window.localStorage.setItem(GMSTORAGE_PATH +
						name, 'S]' + value);
					break;
				case 'number':
					if (value.toString().indexOf('.') < 0){
						window.localStorage.setItem(GMSTORAGE_PATH +
							name, 'N]' + value);
					}
					break;
				case 'boolean':
					window.localStorage.setItem(GMSTORAGE_PATH +
						name, 'B]' + value);
					break;
				}
			};
		} else if (!gvar.isOpera || typeof GM_setValue === 'undefined'){
			gvar.temporarilyStorage = [];
			window.GM_getValue = function(name, defValue){
				if (typeof gvar.temporarilyStorage[GMSTORAGE_PATH + name] ===
					'undefined'){
					return defValue;
				} else{
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
		FSH.System.server = document.location.protocol + '//' + document.location.host + '/';
		var imgurls = FSH.System.findNode('//img[contains(@src, "/skin/")]');
		if (!imgurls) {return;} //login screen or error loading etc.
		var idindex             = imgurls.src.indexOf('/skin/');
		FSH.System.imageServer      = imgurls.src.substr(0,idindex);
		FSH.System.imageServerHTTP  = 'http://cdn.fallensword.com';
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
		$.ajax({
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
	}
};
FSH.System.init();

FSH.Data = {

	plantFromComponent: function(aComponent) {
		switch(aComponent) {
			case 'Amber Essense':      return 'Amber Plant';
			case 'Blood Bloom Flower': return 'Blood Bloom Plant';
			case 'Dark Shade ':        return 'Dark Shade Plant';
			case 'Snake Eye':          return 'Elya Snake Head';
			case 'Snake Venom Fang':   return 'Elya Snake Head';
			case 'Heffle Wart':        return 'Heffle Wart Plant';
			case 'Jademare Blossom':   return 'Jademare Plant';
			case 'Trinettle Leaf':     return 'Trinettle Plant';
			case 'Purplet Flower':     return 'Purplet Plant';
			default:                   return aComponent;
		}
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

	//~ redDot: return 'data:image/gif;base64,R0lGODlhDgAOAMQAAP///62trYyEhL2trUIpKa2UnP9znDEQGP9rjL0hQqUYOXsIIXtSWlIpMf9Sc94xUpQYMa0QMaUIKSkACFIAEHsAGJxCUudSa85CWs45UoRSWnMIGGMAEKVrczkACAAAACH5BAEAAAAALAAAAAAOAA4AQAV7ICAChdV1xSguS5RgWKZAy0YdgBY9juE7sgWHMQocPJSJkhBQFSSJhzQTETYBLYwDYUBcghyPiLKpsFg2z+EKGCgicIk5JXJHHfhHIlKhpCA7PT8YCjUNABVQWg4XhDRJORsLEBAzNDYTHSICFGSeSQcCKiIBDA0MoiohADs%3D',

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

	quickSearchList: function() {
		if (!FSH.Data.quickSearchArray) {
			FSH.Data.quickSearchArray = [
				{'category':'Potions','searchname':'Potion of the Wise',             'nickname':'Lib 200', 'displayOnAH':true},
				{'category':'Potions','searchname':'Potion of the Bookworm',         'nickname':'Lib 225', 'displayOnAH':true},
				{'category':'Potions','searchname':'Potion of Shattering',           'nickname':'SA',      'displayOnAH':true},
				{'category':'Potions','searchname':'Dragons Blood Potion',           'nickname':'ZK 200',  'displayOnAH':true},
				{'category':'Potions','searchname':'Berserkers Potion',              'nickname':'ZK 300',  'displayOnAH':true},
				{'category':'Potions','searchname':'Potion of Fury',                 'nickname':'ZK 350',  'displayOnAH':true},
				{'category':'Potions','searchname':'Sludge Brew',                    'nickname':'DC 200',  'displayOnAH':true},
				{'category':'Potions','searchname':'Potion of Black Death',          'nickname':'DC 225',  'displayOnAH':true},
				{'category':'Potions','searchname':'Potion of Aid',                  'nickname':'Assist',  'displayOnAH':true},
				{'category':'Potions','searchname':'Potion of Supreme Doubling',     'nickname':'DB 450',  'displayOnAH':true},
				{'category':'Potions','searchname':'Potion of Acceleration',         'nickname':'DB 500',  'displayOnAH':true},
				{'category':'Potions','searchname':'Potion of Lesser Death Dealer',  'nickname':'DD',      'displayOnAH':true},
				{'category':'Potions','searchname':'Runic Potion',                   'nickname':'FI 250',  'displayOnAH':true},
				{'category':'Potions','searchname':'Potion of Supreme Luck',         'nickname':'FI 1k',   'displayOnAH':true},
				{'category':'Potions','searchname':'Potion of Truth',                'nickname':'EW 1k',   'displayOnAH':true},
				{'category':'Potions','searchname':'Dull Edge',                      'nickname':'DE 25',   'displayOnAH':true},
				{'category':'Potions','searchname':'Notched Blade',                  'nickname':'DE 80',   'displayOnAH':true},
				{'category':'Potions','searchname':'Potion of Death',                'nickname':'DW 125',  'displayOnAH':true},
				{'category':'Potions','searchname':'Potion of Decay',                'nickname':'WI 150',  'displayOnAH':true},
				{'category':'Potions','searchname':'Potion of Fatality',             'nickname':'WI 350',  'displayOnAH':true},
				{'category':'Potions','searchname':'Potion of Annihilation',         'nickname':'DW 150',  'displayOnAH':true},
				{'category':'Plants', 'searchname':'Blood Bloom',                    'nickname':''},
				{'category':'Plants', 'searchname':'Jademare',                       'nickname':''},
				{'category':'Plants', 'searchname':'Dark Shade',                     'nickname':''},
				{'category':'Plants', 'searchname':'Trinettle',                      'nickname':''},
				{'category':'Plants', 'searchname':'Heffle Wart',                    'nickname':''},
				{'category':'Plants', 'searchname':'Amber',                          'nickname':''}
			];
		}
		return FSH.Data.quickSearchArray;
	},

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
		disableComposingPrompts: false,

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
		'showNextQuestSteps',
		'disableComposingPrompts'
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
		settings: {'-': {'-': {'-': {'-': 'injectSettings'}}}},
		world: {
			'-': {'-': {'-': {'-': 'injectWorld'}}},
			'viewcreature': {'-': {'-': {'-': 'injectCreature'}}},
			'map': {'-': {'-': {'-': 'injectWorldMap'}}}},
		news: {
			'fsbox': {'-': {'-': {'-': 'newsFsbox'}}},
			'shoutbox': {'-': {'-': {'-': 'newsShoutbox'}}}},
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
				'-': {'-': 'injectQuestBookFull'},
				'0': {'-': 'injectQuestBookFull'}, // Normal
				'1': {'-': 'injectQuestBookFull'}}}, // Seasonal
			'atoz': {'-': {'-': {'-': 'injectQuestBookFull'}}},
			'viewquest': {'-': {'-': {'-': 'injectQuestTracker'}}}},
		profile: {
			'-': {'-': {'-': {'-': 'injectProfile'}}},
			'report': {'-': {'-': {'-': 'injectProfile'}}},
			'changebio': {'-': {'-': {'-': 'injectBioWidgets'}}},
			'dropitems': {'-': {'-': {'-': 'injectProfileDropItems',
				'1': 'injectProfileDropItems'}}}},
		auctionhouse: {'-': {'-': {'-': {'-': 'injectAuctionHouse'}}}},
		guild: {
			'inventory': {
				'report': {'-': {'-': 'guildReport.injectReportPaint'}},
				'addtags': {'-': {'-': 'injectGuildAddTagsWidgets'}},
				'removetags': {'-': {'-': 'injectGuildAddTagsWidgets'}},
				'storeitems': {'-': {'-': 'injectDropItems'}}},
			'chat': {'-': {'-': {'-': 'guildChat'}}},
			'log': {'-': {'-': {'-': 'guildLog'}}},
			'groups': {
				'viewstats': {'-': {'-': 'injectGroupStats'}},
				'-': {'-': {'-': 'injectGroups'}}},
			'manage': {'-': {'-': {'-': 'injectGuild'}}},
			'advisor': {'-': {'-': {'-': 'injectAdvisor'}}},
			'history': {'-': {'-': {'-': 'addHistoryWidgets'}}},
			'view': {'-': {'-': {'-': 'injectViewGuild'}}},
			'scouttower': {'-': {'-': {'-': 'injectScouttower'}}},
			'mailbox': {'-': {'-': {'-': 'injectMailbox'}}},
			'ranks': {'-': {'-': {'-': 'injectGuildRanks'}}},
			'conflicts': {'rpupgrades': {'-': {'-': 'injectRPUpgrades'}}}},
		bank: {'-': {'-': {'-': {'-': 'injectBank'}}}},
		log: {
			'-': {'-': {
				'-': {'-': 'playerLog'},
				'-1': {'-': 'playerLog'},
				'0': {'-': 'playerLog'},
				'1': {'-': 'playerLog'},
				'2': {'-': 'playerLog'},
				'3': {'-': 'playerLog'}}},
			'outbox': {'-': {'-': {'-': 'outbox'}}}},
		potionbazaar: {'-': {'-': {'-': {'-': 'bazaar.inject'}}}},
		marketplace: {
			'createreq': {'-': {'-': {'-': 'addMarketplaceWidgets'}}}},
		quickbuff: {'-': {'-': {'-': {'-': 'injectQuickBuff'}}}},
		notepad: {
			'showlogs': {'-': {'-': {'-': 'injectNotepadShowLogs'}}},
			'invmanagernew': {'-': {'-': {'-': 'injectInventoryManagerNew'}}},
			'invmanager': {'-': {'-': {'-': 'injectInventoryManager'}}},
			'guildinvmgr': {'-': {'-': {'-': 'injectInventoryManagerNew'}}},
			'guildinvmanager': {'-': {'-': {'-': 'injectInventoryManager'}}},
			'recipemanager': {'-': {'-': {'-': 'injectRecipeManager'}}},
			'auctionsearch': {'-': {'-': {'-': 'injectAuctionSearch'}}},
			'onlineplayers': {'-': {'-': {'-': 'injectOnlinePlayers'}}},
			'quicklinkmanager': {'-': {'-': {'-': 'injectQuickLinkManager'}}},
			'monsterlog': {'-': {'-': {'-': 'injectMonsterLog'}}},
			'quickextract': {'-': {'-': {'-': 'insertQuickExtract'}}},
			'quickwear': {'-': {'-': {'-': 'insertQuickWear'}}},
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
		toprated: {'xp': {'-': {'-': {'-': 'injectTopRated'}}}},
		inventing: {'viewrecipe': {'-': {'-': {'-': 'inventing'}}}},
		tempinv: {'-': {'-': {'-': {'-': 'injectMailbox'}}}},
		//attackplayer: {'-': {'-': {'-': {'-': 'injectAttackPlayer'}}}},
		findplayer: {'-': {'-': {'-': {'-': 'injectFindPlayer'}}}},
		//relic: {'-': {'-': {'-': {'-': 'injectRelic'}}}},
		quests: {'view': {'-': {'-': {'-': 'showAllQuestSteps'}}}}, //UFSG
		scavenging: {'process': {'-': {'-': {'-': 'injectScavenging'}}}},
		temple: {'-': {'-': {'-': {'-': 'notification.parseTemplePage'}}}},
		skills: {'-': {'-': {'-': {'-': 'injectSkills'}}}},
		composing: {'-': {'-': {'-': {'-': 'composing.injectComposing'}}}},
		'-': {'-': {'-': {'-': {'-': 'unknownPage'}}}}
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
	}

};

FSH.Layout = {

	onlineDot: function(min) {
		var img = '';
		if (FSH.System.getValue('enhanceOnlineDots')) {
			img = FSH.Data.offlineDot;
			if (min < 2) {
				img = FSH.Data.greenDiamond;
			} else if (min < 5) {
				img = FSH.Data.yellowDiamond;
			} else if (min < 30) {
				img = FSH.Data.orangeDiamond;
			} else if (min > 10080) {
				img = FSH.Data.sevenDayDot;
			}
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
		'itemid="@itemid@" data-tipped="@tipped@">'

};

FSH.ajax = {
	getMembrList: function(force, fn) {
		var dfr = FSH.ajax.guildMembers(force);
		dfr.done(function(membrList) {
			FSH.Helper.membrList = membrList;
			if (typeof fn === 'function') {fn(membrList);}
		});
		return dfr;
	},

	guildMembers: function(force) {
		if (force) {
			return FSH.ajax.getGuildMembers();
		}
		var prm = FSH.ajax.getForage('fsh_membrList');
		return prm.pipe(function(membrList) {
			if (!membrList || membrList.lastUpdate < Date.now() - 300000) {
				return FSH.ajax.getGuildMembers();
			}
			return membrList;
		});
	},

	getGuildMembers: function() {
		var prm = $.ajax({
			dataType: 'json',
			url:'index.php',
			data: {
				cmd: 'export',
				subcmd: 'guild_members',
				guild_id: FSH.Layout.guildId()
			}
		});
		return prm.pipe(function(data) {
			var membrList = {};
			membrList.lastUpdate = Date.now();
			data.forEach(function(ele) {
				membrList[ele.username] = ele;
			});
			FSH.ajax.setForage('fsh_membrList', membrList);
			return membrList;
		});
	},

	// this is a shit name, change it
	getInv: function(fn, force) {
		var ajax = 'inventory';
		var forage = 'fsh_selfInv';
		if (FSH.subcmd === 'guildinvmgr') {
			ajax = 'guild_store&inc_tagged=1';
			forage = 'fsh_guildInv';
		}
		if (force) {
			$.ajax({
				dataType: 'json',
				url:'index.php?cmd=export&subcmd=' + ajax,
				success: function(data) {
					data.lastUpdate = Date.now();
					localforage.setItem(forage, data,
						function(err, inv) {
							if (err) {console.log('localforage error', err);}
							FSH.Helper.inventory = inv;
// console.log('getInv forage set success');
							fn();
						}
					);
				}
			});
			return;
		}
		localforage.getItem(forage, function(err, inv) {
			if (err) {console.log('localforage error', err);}
			if (!inv || inv.lastUpdate < Date.now() - 300000) {
				FSH.ajax.getInv(fn, true);
				return;
			}
			FSH.Helper.inventory = inv;
// console.log('getInv forage get success');
			fn();
		});
	},

	myStats: function(force) {
		FSH.Helper.myUsername = $('dt#statbar-character').text();
		var dfr = FSH.ajax.getMyStats(force);
		dfr.done(function(data) {
			FSH.Helper.profile = FSH.Helper.profile || {};
			FSH.Helper.profile[FSH.Helper.myUsername] = data;
		});
		return dfr;
	},

	getMyStats: function(force) {
		if (force) {
			return FSH.ajax.getMyProfile();
		} else {
			var prm = FSH.ajax.getForage('fsh_selfProfile');
			// jQuery 1.7 uses pipe instead of then
			return prm.pipe(function(data) {
				if (!data || data.lastUpdate < Date.now() -
					FSH.Helper.allyEnemyOnlineRefreshTime) {
					//console.log('myStats doing refresh');
					return FSH.ajax.getMyProfile();
				} else {
					return data;
				}
			});
		}
	},

	getMyProfile: function() {
		var prm = FSH.ajax.getProfile(FSH.Helper.myUsername);
		return prm.done(function(data) {
			data.lastUpdate = Date.now();
			FSH.ajax.setForage('fsh_selfProfile', data);
		});
	},

	getProfile: function(username) {
		return $.getJSON('index.php', {
			cmd:             'export',
			subcmd:          'profile',
			player_username: username
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
				//console.log(forage + ' forage set success');
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
				//console.log(forage + ' forage get success');
				dfr.resolve(data);
			}
		});
		return dfr.promise();
	}

};

FSH.composing = {
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
			etas.each(function() { // might be better just to look at [0]
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
		if (FSH.Helper.enableComposingAlert) {
			FSH.composing.parseComposing();}

		var disableComposingPrompts =
			FSH.System.getValue('disableComposingPrompts');
		if (disableComposingPrompts) {
			$('input[class^="large awesome"][onclick]').each(function(i, e) {
				$(e).attr('onclick', $(e).attr('onclick')
				.replace(/if\(confirm\(.+\)\) /, ''));
			});
			$('div#composing-error-dialog')
				.before('<div id="fshCompConf"><b>Warning:</b> Confirmation ' +
				'prompts are disabled. Use at your own risk.<div>');
		}

		$('input[value="Discard All"]')
			.before('<input type="button" id="helperCreateAll" class="large ' +
			'awesome red" value="Create All" disabled="true" style="height: ' +
			'25px; line-height: 9px;">&nbsp;');
		if ($('select[id^="composing-template-"][value!="none"]').length) {
			$('#helperCreateAll').prop('disabled', false);
			$('#helperCreateAll').click(function() {
				if (disableComposingPrompts ||
					confirm('Are you sure you want to create all potions? ' +
						'Do you have the correct templates selected?')) {
					$('select[id^="composing-template-"][value!="none"]')
						.each(function() {
							FSH.composing.createPotion($(this));
						});
				}
			});
		}

		$('input[id^=create-]').each(function(i,e){
			$(e).after('<span id="helperQC-' + $(e).attr('id').slice(-1) +
				'" class="helperQC">&nbsp;[Quick Create]</span>');
		});

		$('span[id^="helperQC-"]').on('click', function(){
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
			},
			success: function(data, textStatus) {
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
			}
		});
	}
};

FSH.notification = {
	injectTempleAlert: function() { //jquery
		//Checks to see if the temple is open for business.
		//if (!FSH.System.getValue('enableTempleAlert')) {return;}
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
		//if (!FSH.System.getValue('enableUpgradeAlert')) {return;}
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
};

FSH.guildReport = {

	injectReportPaint: function() {
		FSH.ajax.getMembrList(FSH.guildReport.doReportPaint, false);
	},

	reportHeader: function(innerTable) {
		$('td[bgcolor="#DAA534"][colspan="2"] b', innerTable).each(function() {
			var self = $(this);
			self.html(
				FSH.Layout.onlineDot(Math.floor((Math.floor(Date.now() /
				1000) - FSH.Helper.membrList[self.text()].last_login) / 60)) +
				'<a href="index.php?cmd=profile&player_id=' +
				FSH.Helper.membrList[self.text()].id + '">' + self.html() +
				'</a> [ <span class="a-reply fshLink" target_player=' +
				self.text() + '>m</span> ]'
			);
		});
	},

	doReportPaint: function() {
		var container = $('div#pCC > table > tbody > tr > td').last();
		var innerTable = $('table', container).detach();
		var rows = $('tr', innerTable);

		var searchUser = FSH.System.getUrlParameter('user');
		if (searchUser && $('b:contains("' + searchUser + '")', innerTable)
			.length > 0) {
			$('b:contains("' + searchUser + '")', innerTable)
				.closest('tr').prevAll().remove();
			$('a[href*="_id=' + FSH.Helper.membrList[searchUser].id + '&"]',
				innerTable).last().closest('tr').nextAll().remove();
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
			FSH.Helper.openQuickMsgDialog(
				evt.target.getAttribute('target_player'));
		});
		innerTable.on('click', '.recall', FSH.guildReport.recallItem);
		innerTable.on('click', '.wear', FSH.guildReport.recallItemNWear);
		innerTable.on('click', '.equip',
			FSH.guildReport.equipProfileInventoryItem);

		container.append(innerTable);
	},

	reportChild: function(innerTable) {
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

	recallItem: function(evt) {
		var href=evt.target.getAttribute('href');
		FSH.System.xmlhttp(href, FSH.guildReport.recallItemReturnMessage, {'target': evt.target, 'url': href});
	},

	recallItemReturnMessage: function(responseText, callback) {
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

	recallItemNWear: function(evt) {
		var href=evt.target.getAttribute('href');
		FSH.System.xmlhttp(href, FSH.guildReport.recallItemNWearReturnMessage, {'target': evt.target, 'url': href});
	},

	recallItemNWearReturnMessage: function(responseText, callback) {
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

	wearRecall: function(responseText, callback) {
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

FSH.bazaar = {

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

	buy: function() {
		if (!FSH.bazaar.ItemId) {return;}
		var buyAmount = $('table#fshBazaar input#buy_amount').val();
		$('table#fshBazaar td#buy_result')
			.html('Buying ' + buyAmount + ' items');
		for (var i = 0; i < buyAmount; i += 1) {
			$.get('index.php?cmd=potionbazaar&subcmd=buyitem&item_id=' +
				FSH.bazaar.ItemId, FSH.bazaar.done);
		}
	},

	done: function(responseText) {
		$('table#fshBazaar td#buy_result')
			.append('<br>' + FSH.Layout.infoBox(responseText));
	}

};

})();
