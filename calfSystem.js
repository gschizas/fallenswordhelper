(function() {

'use strict';

window.FSH = window.FSH || {};

(function GM_ApiBrowserCheck() {
	// GM_ApiBrowserCheck
	// @author        GIJoe
	// @license       http://creativecommons.org/licenses/by-nc-sa/3.0/
	// Global variables
	var gvar = {};
	var GMSTORAGE_PATH = 'GM_';
	// You can change it to avoid conflict with others scripts
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

FSH.System = {
	// FSH.System.functions

	init: function() { // Native
		FSH.System.server = document.location.protocol + '//' +
			document.location.host + '/';
		if ('HCS' in window && 'defines' in window.HCS &&
			'fileserver' in window.HCS.defines) {
			FSH.System.imageServer = window.HCS.defines.fileserver.slice(0, -1);
		}
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

	// findNodeText: function(xpath, doc) {
		// var node = FSH.System.findNode(xpath, doc);
		// if (!node) {return null;}
		// return node.textContent;
	// },

	// findNodeInt: function(xpath, doc) {
		// var node = FSH.System.findNode(xpath, doc);
		// if (!node) {return null;}
		// return FSH.System.intValue(node.textContent);
	// },

	createDocument: function(details) {
		// Use DOMParser to prevent img src tags downloading
		var parser = new DOMParser();
		var doc = parser.parseFromString(details, 'text/html');
		return doc;
	},

	formatDateTime: function(aDate) {
		var yyyy = aDate.getFullYear();
		var mon = aDate.getMonth() + 1;
		if (mon < 10) {mon = '0' + mon;}
		var dd = aDate.getDate();
		if (dd < 10) {dd = '0' + dd;}

		var hh = aDate.getHours();
		if (hh < 10) {hh = '0' + hh;}
		var mm = aDate.getMinutes();
		if (mm < 10) {mm = '0' + mm;}
		var ss = aDate.getSeconds();
		if (ss < 10) {ss = '0' + ss;}
		return yyyy + '-' + mon + '-' + dd + ' ' + hh + ':' + mm + ':' + ss;
	},

	formatShortDate: function(aDate) {
		var yyyy = aDate.getFullYear();
		var dd = aDate.getDate();
		if (dd < 10) {dd = '0' + dd;}
		var ddd = FSH.Data.days[aDate.getDay()].substr(0, 3);
		var month = FSH.Data.months[aDate.getMonth()].substr(0, 3);
		var hh = aDate.getHours();
		if (hh < 10) {hh = '0' + hh;}
		var mm = aDate.getMinutes();
		if (mm < 10) {mm = '0' + mm;}
		return hh + ':' + mm + ' ' + ddd + ' ' + dd + '/' + month + '/' + yyyy;
	},

	saveValueForm: function(name) {
		var formElement =
			FSH.System.findNode('//input[@name="' + name + '"]', this);
		if (formElement.getAttribute('type') === 'checkbox') {
			FSH.System.setValue(name, formElement.checked);
		} else if (formElement.getAttribute('type') === 'radio') {
			var radioElements = FSH.System.findNodes('//input[@name="' + name +
				'"]', 0, this);
			for (var i=0; i<radioElements.length; i += 1) {
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

	uniq: function (arr, removeBy){ // Ugly but fast
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

	// addStyle: function(css) {
		// var style = document.createElement('style');
		// style.textContent = css;
		// document.getElementsByTagName('head')[0].appendChild(style);
	// },

	// openInTab: function(url){
		// window.open(url, '_blank');
	// },

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
		FSH.ga.screenview(funcName);
		funcName = funcName.split('.');
		if (funcName.length === 1) {
			return FSH.Helper[funcName[0]];
		} else if (funcName.length === 2) {
			return FSH[funcName[0]] ?
				FSH[funcName[0]][funcName[1]] : FSH[funcName[0]];
		}
	},

	removeHTML: function(buffName) { // Native
		return buffName.replace(/<\/?[^>]+(>|$)/g, '').replace(/[^a-zA-Z 0-9]+/g,'');
	},

	stringSort: function(a,b) {
		var result=0;
		a = FSH.System.path(a, FSH.Helper.sortBy, 'a');
		b = FSH.System.path(b, FSH.Helper.sortBy, 'a');
		if (a.toLowerCase()<b.toLowerCase()) {result=-1;}
		if (a.toLowerCase()>b.toLowerCase()) {result=+1;}
		if (!FSH.Helper.sortAsc) {result=-result;}
		return result;
	},

	numberSort: function(a,b) {
		var result=0;
		if(typeof a.type !== undefined){
			if(a.type > 8) {return 1;} //non equipment items
			if(b.type > 8) {return -1;}
		}
		var valueA = FSH.System.path(a, FSH.Helper.sortBy, 1);
		var valueB = FSH.System.path(b, FSH.Helper.sortBy, 1);
		if (typeof valueA==='string') {
			valueA=parseInt(valueA.replace(/,/g,'').replace(/#/g,''),10);
		}
		if (typeof valueB==='string') {
			valueB=parseInt(valueB.replace(/,/g,'').replace(/#/g,''),10);
		}
		result = valueA-valueB;
		if (!FSH.Helper.sortAsc) {result=-result;}
		return result;
	},

	path: function(obj, path, def){
		path = path.split('.');
		var len = path.length;
		for (var i = 0; i < len; i+=1) {
			if (!obj || typeof obj !== 'object') {return def;}
			obj = obj[path[i]];
		}
		if (obj === undefined) {return def;}
		return obj;
	},

};
FSH.System.init();

FSH.Data = {
	// To be moved back into main script in future as it does not compress well

	days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
		'Friday', 'Saturday'],

	months: ['January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December'],

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
		'<a href="#" id="HelperToggleHuntingMode" ' +
		'class="huntOn quicklink tip-static" ' +
		'data-tipped="Hunting mode is ON"></a>',

	huntingOffImage:
		'<a href="#" id="HelperToggleHuntingMode" ' +
		'class="huntOff quicklink tip-static" ' +
		'data-tipped="Hunting mode is OFF"></a>',

	soundMuteImage:
		'<a href="#" id="toggleSoundLink" ' +
		'class="soundOn quicklink tip-static" ' +
		'data-tipped="Turn Off Sound when you have a new log message"></a>',

	soundImage:
		'<a href="#" id="toggleSoundLink" ' +
		'class="soundOff quicklink tip-static" ' +
		'data-tipped="Turn On Sound when you have a new log message"></a>',

	greenDiamondSrc:
		'data:image/gif;base64,R0lGODlhCQAJAJH/AMDAwAcADAD/RAAAACH' +
		'5BAEAAAAALAAAAAAJAAkAQAIUhBGnqCEPRUJwGvfslS1yGmmOVQAAOw%3D%3D',

	greenDiamond:
		'<img width="10" height="10" style="float:left" src="' +
		'data:image/gif;base64,R0lGODlhCQAJAJH/AMDAwAcADAD/RAAAACH' +
		'5BAEAAAAALAAAAAAJAAkAQAIUhBGnqCEPRUJwGvfslS1yGmmOVQAAOw%3D%3D' +
		'" class="tip-static" data-tipped="Online">',

	yellowDiamondSrc:
		'data:image/gif;base64,R0lGODlhCQAJAJH/AMDAwP3/AAcADAAAAC' +
		'H5BAEAAAAALAAAAAAJAAkAQAIUhCGnqBIPQ0JwGvfslS1yGmmOVQAAOw%3D%3D',

	yellowDiamond:
		'<img width="10" height="10" style="float:left" src="' +
		'data:image/gif;base64,R0lGODlhCQAJAJH/AMDAwP3/AAcADAAAAC' +
		'H5BAEAAAAALAAAAAAJAAkAQAIUhCGnqBIPQ0JwGvfslS1yGmmOVQAAOw%3D%3D' +
		'" class="tip-static" data-tipped="Offline">',

	orangeDiamondSrc:
		'data:image/gif;base64,R0lGODlhCQAJAJH/AMDAwP+9AAcADAAAAC' +
		'H5BAEAAAAALAAAAAAJAAkAQAIUhCGnqBIPQ0JwGvfslS1yGmmOVQAAOw%3D%3D',

	orangeDiamond:
		'<img width="10" height="10" style="float:left" src="' + 
		'data:image/gif;base64,R0lGODlhCQAJAJH/AMDAwP+9AAcADAAAAC' +
		'H5BAEAAAAALAAAAAAJAAkAQAIUhCGnqBIPQ0JwGvfslS1yGmmOVQAAOw%3D%3D' +
		'" class="tip-static" data-tipped="Offline">',

	// This is different to the one below
	offlineDotSrc:
		'data:image/gif;base64,R0lGODlhCgAKAMQAACEhIaWlpVpaWjk5OcbGxnt7e3Nzc' +
		'0pKSikpKa2trWtra4yMjMzMzLW1tUJCQjMzM1JSUtbW1mNjY4SEhJSUlL29vf///wAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEHABYALAAAAAAKAAoAAAVCoGUVDEM' +
		'kimgFUWQmgWFJpdkEkwElRF8lOcEhQYRNFBDHgEJZBA8PBEJhUAgHCID2IEg+tFqH5T' +
		'D4gh8qR1Y7EIUAADs=',

	offlineDot:
		'<img width="10" height="10" style="float:left" src="' +
		'data:image/gif;base64,R0lGODlhDgAOAMQAAP///1paWnNzc4SEhK2tr' +
		'bW1tZylpWNra3OEhDE5OWNzc73e3rXW1qXGxpy9vZS1tYSlpXucnHOUlFJra2OEhEpj' +
		'YxghISk5OVJzczlSUkprayExMTFKShgpKRAhIQAAACH5BAEAAAAALAAAAAAOAA4AQAW' +
		'GICAChCINxihm2WRKiKJl19YBiBY5zNI8CAztMCJsLJ2Ox7MhqAgViiQioUxoBREHQ3' +
		'E0GD8rzSK6XDicDNqMdIoKGA1mMsuk3hoKxOuAUDQcGykVGBENC4gOEkJnABxREQ8PE' +
		'BIKFYEeAAoJGRUTdJc1FgIiAx1mZhtHHQMqIgQCHAGtKiEAOw%3D%3D' +
		'" class="tip-static" data-tipped="Offline">',

	sevenDayDotSrc:
		'data:image/gif;base64,R0lGODlhDgAOAMQAAP///0JCQoSEhK2trXNr' +
		'azEpKZyUnDkpMa1rjJxae5RSc3s5WlopQnMxUmMhQjkIIaWUnGNSWiEQGFIhOSEAEL1' +
		'zlLVrjIxSa3M5UlIYMUoQKSkAEBgACIRrc2tSWgAAACH5BAEAAAAALAAAAAAOAA4AQA' +
		'V8ICACENZ1xihqj+YsGMZkxUZJgJc1ilUhicbksYmMBhKKksMpDFQQV2PRcLA2T8Bjl' +
		'0D8FEIiR0TZPM5n2y0LGDA0cJYmJRpkXopEYmG1pTQTCwkVhHtDGwcAGy4LeQoLbw8U' +
		'YxFmGRkTl0STBCICSqCgEgIqdQQBEaQqIQA7',

	sevenDayDot:
		'<img width="10" height="10" style="float:left" src="' +
		'data:image/gif;base64,R0lGODlhDgAOAMQAAP///0JCQoSEhK2trXNr' +
		'azEpKZyUnDkpMa1rjJxae5RSc3s5WlopQnMxUmMhQjkIIaWUnGNSWiEQGFIhOSEAEL1' +
		'zlLVrjIxSa3M5UlIYMUoQKSkAEBgACIRrc2tSWgAAACH5BAEAAAAALAAAAAAOAA4AQA' +
		'V8ICACENZ1xihqj+YsGMZkxUZJgJc1ilUhicbksYmMBhKKksMpDFQQV2PRcLA2T8Bjl' +
		'0D8FEIiR0TZPM5n2y0LGDA0cJYmJRpkXopEYmG1pTQTCwkVhHtDGwcAGy4LeQoLbw8U' +
		'YxFmGRkTl0STBCICSqCgEgIqdQQBEaQqIQA7' +
		'" class="tip-static" data-tipped="Offline">',

	redDotSrc:
		'data:image/gif;base64,R0lGODlhDgAOAMQAAP///62trYyEhL2trUIpKa2UnP9zn' +
		'DEQGP9rjL0hQqUYOXsIIXtSWlIpMf9Sc94xUpQYMa0QMaUIKSkACFIAEHsAGJxCUudS' +
		'a85CWs45UoRSWnMIGGMAEKVrczkACAAAACH5BAEAAAAALAAAAAAOAA4AQAV7ICAChdV' +
		'1xSguS5RgWKZAy0YdgBY9juE7sgWHMQocPJSJkhBQFSSJhzQTETYBLYwDYUBcghyPiL' +
		'KpsFg2z+EKGCgicIk5JXJHHfhHIlKhpCA7PT8YCjUNABVQWg4XhDRJORsLEBAzNDYTH' +
		'SICFGSeSQcCKiIBDA0MoiohADs%3D',

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
		lastActiveQuestPage: '',
		lastCompletedQuestPage: '',
		lastNotStartedQuestPage: '',
		lastWorld: '',
		questsNotStarted: false,
		questsNotComplete: false,
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

		hideQuests: false,
		hideQuestNames: '',
		hideRecipes: false,
		hideRecipeNames: '',
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
		doNotKillList: '',
		enableBioCompressor: true,
		maxCompressedCharacters: 250,
		maxCompressedLines: 10,

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
		enableQuickDrink: true,
		enhanceOnlineDots: true,
		hideBuffSelected: false,
		hideHelperMenu: false,
		keepHelperMenuOnScreen: true,
		quickLinksTopPx: 22,
		quickLinksLeftPx: 0,
		showNextQuestSteps: true,

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
		showTitanMessages: true,

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
			'5': 1, '6': 1, '7': 1, '8': 1, '100': 1,
			'101': 1, '102': 1, '103': 1, '104': 1,
			'105': 1, '106': 1
		},
		lowestLevelInTop250: 0,

		/* jshint -W110 */ // Mixed double and single quotes. (W110)

		quickMsg: '["Thank you very much ^_^","Happy hunting, {playername}"]',

		sendClasses: '["Composed Pots", "13699"], ["Amber", "5611"], ' +
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
				'"nickname":"FI 1k","displayOnAH":true}]',

		/* jshint +W110 */ // Mixed double and single quotes. (W110)

		arenaMoves: '[]',
		arenaMatches: '[]',
		CombatLog: '',
		hideChampionsGroup: false,
		hideElitesGroup: false,
		hideSEGroup: false,
		hideTitanGroup: false,
		hideLegendaryGroup: false,
		disableDeactivatePrompts: false,
		monsterLog: '{}',
		moveComposingButtons: true,

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
		'hideQuests',
		'hideQuestNames',
		'hideRecipes',
		'hideRecipeNames',
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
		'hideHelperMenu',
		'keepHelperMenuOnScreen',
		'showNextQuestSteps',
		'hideChampionsGroup',
		'hideElitesGroup',
		'hideSEGroup',
		'hideTitanGroup',
		'hideLegendaryGroup',
		'disableDeactivatePrompts',
		'moveComposingButtons'

	],

	craft: {
		Perfect    : {abbr: 'Perf', colour: '#00b600', index: 8},
		Excellent  : {abbr: 'Exc',  colour: '#f6ed00', index: 7},
		'Very Good': {abbr: 'VG',   colour: '#f67a00', index: 6},
		Good       : {abbr: 'Good', colour: '#f65d00', index: 5},
		Average    : {abbr: 'Ave',  colour: '#f64500', index: 4},
		Poor       : {abbr: 'Poor', colour: '#f61d00', index: 3},
		'Very Poor': {abbr: 'VPr',  colour: '#b21500', index: 2},
		Uncrafted  : {abbr: 'Unc',  colour: '#666666', index: 1}
	},

	itemType: ['Helmet', 'Armor', 'Gloves', 'Boots', 'Weapon', 'Shield',
		'Ring', 'Amulet', 'Rune', 'Quest Item', 'Potion', 'Component',
		'Resource', 'Recipe', 'Container', 'Composed', 'Frag Stash'],

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
		world: {'-': {'-': {'-': {'-': 'injectWorld'}}}},
		news: {
			'fsbox': {'-': {'-': {'-': 'news.newsFsbox'}}},
			'shoutbox': {'-': {'-': {'-': 'news.newsShoutbox'}}}},
		blacksmith: {
			'repairall': {'-': {'-': {'1': 'injectWorld'}}}},
		arena: {
			'-': {'-': {'-': {'-': 'arena.inject'}}},
			'join': {'-': {'-': {'-': 'arena.inject'}}},
			'completed': {'-': {'-': {'-': 'arena.completedArenas'}}},
			'pickmove': {'-': {'-': {'-': 'arena.storeMoves'}}},
			'setup': {'-': {'-': {'-': 'arena.setupMoves'}}}
			},
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
		auctionhouse: {'-': {'-': {'-': {'-': 'misc.injectAuctionHouse'}}}},
		guild: {
			'inventory': {
				'report': {'-': {'-': 'guildReport.injectReportPaint'}},
				'addtags': {
					'-': {'-': 'guild.injectGuildAddTagsWidgets'},
					'-1': {'-': 'guild.injectGuildAddTagsWidgets'},
					'0': {'-': 'guild.injectGuildAddTagsWidgets'},
					'1': {'-': 'guild.injectGuildAddTagsWidgets'},
					'2': {'-': 'guild.injectGuildAddTagsWidgets'},
					'3': {'-': 'guild.injectGuildAddTagsWidgets'},
					'4': {'-': 'guild.injectGuildAddTagsWidgets'},
					'5': {'-': 'guild.injectGuildAddTagsWidgets'},
					'6': {'-': 'guild.injectGuildAddTagsWidgets'},
					'7': {'-': 'guild.injectGuildAddTagsWidgets'},
					'8': {'-': 'guild.injectGuildAddTagsWidgets'},
					'10': {'-': 'guild.injectGuildAddTagsWidgets'},
					'15': {'-': 'guild.injectGuildAddTagsWidgets'},
					'16': {'-': 'guild.injectGuildAddTagsWidgets'}},
				'removetags': {'-': {'-': 'guild.injectGuildAddTagsWidgets'}},
				'storeitems': {'-': {'-': 'dropItems.injectStoreItems'}}},
			'chat': {'-': {'-': {'-': 'logs.guildChat'}}},
			'log': {'-': {'-': {'-': 'logs.guildLog'}}},
			'groups': {
				'viewstats': {'-': {'-': 'groups.injectGroupStats'}},
				'joinallgroupsundersize': {'-': {'-': 'groups.injectGroups'}},
				'joinall': {'-': {'-': 'groups.injectGroups'}},
				'-': {'-': {'-': 'groups.injectGroups'}}},
			'manage': {'-': {'-': {'-': 'guild.injectGuild'}}},
			'structures': {'-': {'-': {'-': 'guild.injectGuild'}}},
			'advisor': {
				'-': {'-': {'-': 'guildAdvisor.injectAdvisor'}},
				'weekly': {'-': {'-': 'guildAdvisor.injectAdvisor'}}},
			'history': {'-': {'-': {'-': 'guild.addHistoryWidgets'}}},
			'view': {'-': {'-': {'-': 'guild.injectViewGuild'}}},
			'scouttower': {'-': {'-': {'-': 'scoutTower.injectScouttower'}}},
			'mailbox': {'-': {'-': {'-': 'mailbox.guildMailbox'}}},
			'ranks': {'-': {'-': {'-': 'rank.injectGuildRanks'}}},
			'conflicts': {'rpupgrades': {'-': {'-': 'guild.injectRPUpgrades'}}},
			'bank': {'-': {'-': {'-': 'bank.injectGuildBank'}}}},
		bank: {'-': {'-': {'-': {'-': 'bank.injectBank'}}}},
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
			'createreq': {'-': {'-': {'-': 'misc.addMarketplaceWidgets'}}}},
		quickbuff: {'-': {'-': {'-': {'-': 'quickBuff.inject'}}}},
		notepad: {
			'showlogs': {'-': {'-': {'-': 'combatLog.injectNotepadShowLogs'}}},
			'invmanagernew': {'-': {'-': {
				'-': 'inventory.injectInventoryManagerNew'}}},
			'guildinvmgr': {'-': {'-': {
				'-': 'inventory.injectInventoryManagerNew'}}},
			'recipemanager': {'-': {'-': {'-': 'recipeMgr.injectRecipeManager'}}},
			'auctionsearch': {'-': {'-': {'-': 'lists.injectAuctionSearch'}}},
			'onlineplayers': {'-': {'-': {'-': 'onlinePlayers.injectOnlinePlayers'}}},
			'quicklinkmanager': {'-': {'-': {'-': 'lists.injectQuickLinkManager'}}},
			'monsterlog': {'-': {'-': {'-': 'monstorLog.injectMonsterLog'}}},
			'quickextract': {'-': {'-': {'-': 'quickExtract.insertQuickExtract'}}},
			'quickwear': {'-': {'-': {'-': 'quickWear.insertQuickWear'}}},
			'fsboxcontent': {'-': {'-': {'-': 'environment.injectFsBoxContent'}}},
			'bufflogcontent': {'-': {'-': {'-': 'quickBuff.injectBuffLog'}}},
			'newguildlog': {'-': {'-': {'-': 'newGuildLog.injectNewGuildLog'}}},
			'findbuffs': {'-': {'-': {'-': 'findBuffs.injectFindBuffs'}}},
			'findother': {'-': {'-': {'-': 'findBuffs.injectFindOther'}}},
			'savesettings': {'-': {'-': {'-': 'settingsPage.injectSaveSettings'}}},
			'-': {'-': {'-': {'-': 'misc.injectNotepad'}}}},
		points: {'-': {'-': {
			'-': {'-': 'upgrades.storePlayerUpgrades'},
			'0': {'-': 'upgrades.storePlayerUpgrades'},
			'1': {'-': 'notification.parseGoldUpgrades'}}}},
		trade: {
			'-': {'-': {'-': {'-': 'trade.injectTrade'}}},
			'createsecure': {'-': {'-': {'-': 'trade.injectTrade'}}},
			'docreatesecure': {'-': {'-': {'-': 'trade.injectTrade'}}}},
		titan: {'-': {'-': {'-': {'-': 'scoutTower.injectTitan'}}}},
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
		//attackplayer: {'-': {'-': {'-': {'-': 'attackPlayer.injectAttackPlayer'}}}},
		findplayer: {'-': {'-': {'-': {'-': 'misc.injectFindPlayer'}}}},
		quests: {'-': {'-': {'-': {'-': 'guide.allowBack'}}},
			'view': {'-': {'-': {'-': 'questBook.showAllQuestSteps'}}}}, //UFSG
		items: {'-': {'-': {'-': {'-': 'guide.allowBack'}}}}, //UFSG
		creatures: {'-': {'-': {'-': {'-': 'guide.allowBack'}}}}, //UFSG
		masterrealms: {'-': {'-': {'-': {'-': 'guide.allowBack'}}}}, //UFSG
		realms: {'-': {'-': {'-': {'-': 'guide.allowBack'}}}}, //UFSG
		relics: {'-': {'-': {'-': {'-': 'guide.allowBack'}}}}, //UFSG
		shops: {'-': {'-': {'-': {'-': 'guide.allowBack'}}}}, //UFSG
		scavenging: {'-': {'-': {'-': {'-': 'scavenging.injectScavenging'}}}},
		temple: {'-': {'-': {'-': {'-': 'notification.parseTemplePage'}}}},
		composing: {'-': {'-': {'-': {'-': 'composing.injectComposing'}}},
			'create': {'-': {'-': {'-': 'composing.create'}}}},
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
		'14': 1, '15': 1, '16': 1, '100': 1,
		'101': 1, '102': 1, '103': 1, '104': 1,
		'105': 1, '106': 1
	},

	lastActivityRE:
		/<td>Last Activity:<\/td><td>(\d+)d (\d+)h (\d+)m (\d+)s<\/td>/,

};

FSH.Layout = {
	// To be moved back into main script in future as it does not compress well

	onlineSrc: function(obj) {
		var img;
		var min = 0;
		if (obj.day)  {min += parseInt(obj.day,  10) * 1440;}
		if (obj.hour) {min += parseInt(obj.hour, 10) * 60;}
		if (obj.min)  {min += parseInt(obj.min,  10);}
		// if (obj.last_login) {
			// min = Math.floor(Date.now() / 60000) - Math.floor(obj.last_login / 60);
		// }
		// last_login is 'false' over 30 days
		// if ('last_login' in obj && !obj.last_login) {min = 99999;}
		if (min < 2) {
			img = FSH.Data.greenDiamondSrc;
		} else if (min < 5) {
			img = FSH.Data.yellowDiamondSrc;
		} else if (min < 30) {
			img = FSH.Data.orangeDiamondSrc;
		} else if (min < 60) {
			img = FSH.Data.offlineDotSrc;
		} else if (min < 10080) {
			return; // img = FSH.Data.offlineDotSrc;
		} else if (min < 44640) {
			img = FSH.Data.sevenDayDotSrc;
		} else {
			img = FSH.Data.redDotSrc;
		}
		return img;
	},

	changeOnlineDotSrc: function(contactLink){
		var lastActivity = FSH.Data.lastActivityRE
			.exec(contactLink.getAttribute('data-tipped'));
		var newSrc = FSH.Layout.onlineSrc({
			min: lastActivity[3],
			hour: lastActivity[2],
			day: lastActivity[1]
		});
		if (newSrc) {
			contactLink.parentNode.previousSibling.firstChild
				.setAttribute('src', newSrc);
		}
	},

	colouredDots: function() {

		FSH.ga.start('JS Perf', 'colouredDots');

		if (!FSH.System.getValue('enhanceOnlineDots')) {return;}
		var profileAlliesEnemies = document.querySelectorAll(
			'#pCC a[data-tipped*="Last Activity"]');
		Array.prototype.forEach.call(profileAlliesEnemies,
			FSH.Layout.changeOnlineDotSrc);

		FSH.ga.end('JS Perf', 'colouredDots');

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
		// last_login is 'false' over 30 days
		if ('last_login' in obj && !obj.last_login) {min = 99999;}
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
		} else {
			img = FSH.Data.redDot;
		}
		return img;
	},

	injectMenu: function() { //jquery

		FSH.ga.start('JS Perf', 'injectMenu');

		if (FSH.System.getValue('lastActiveQuestPage').length > 0) {
			$('a[href="index.php?cmd=questbook"]').attr('href',
				FSH.System.getValue('lastActiveQuestPage'));
		}
		var pCL = $('#pCL');
		if (pCL.length === 0) {return;}
		//character
		pCL.find('#nav-character-log').parent('li')
			.after('<li class="nav-level-1"><a class="nav-link" id="nav-' +
				'character-recipemanager" href="index.php?cmd=notepad&blank' +
				'=1&subcmd=recipemanager">Recipe Manager</a></li>')
			.after('<li class="nav-level-1"><a class="nav-link" id="nav-' +
				'character-invmanager" href="index.php?cmd=notepad&blank=1&' +
				'subcmd=invmanagernew">Inventory Manager</a></li>')
			.after('<li class="nav-level-1"><a class="nav-link" id="nav-' +
				'character-medalguide" href="index.php?cmd=profile&subcmd=' +
				'medalguide">Medal Guide</a></li>');
		if (FSH.System.getValue('keepBuffLog')) {
			pCL.find('#nav-character-log').parent('li')
				.after('<li class="nav-level-1"><a class="nav-link" id="nav-' +
					'character-bufflog" href="index.php?cmd=notepad&blank=1&' +
					'subcmd=bufflogcontent">Buff Log</a></li>');
		}
		if (FSH.System.getValue('keepLogs')) {
			pCL.find('#nav-character-notepad').parent('li')
				.after('<li class="nav-level-1"><a class="nav-link" id="nav-' +
					'character-showlogs" href="index.php?cmd=notepad&blank=1' +
					'&subcmd=showlogs">Combat Logs</a></li>');
		}
		if (FSH.System.getValue('showMonsterLog')) {
			pCL.find('#nav-character-notepad').parent('li')
				.after('<li class="nav-level-1"><a class="nav-link" id="nav-' +
					'character-monsterlog" href="index.php?cmd=notepad&blank' +
					'=1&subcmd=monsterlog">Creature Logs</a></li>');
		}
		pCL.find('#nav-character-notepad').parent('li')
			.after('<li class="nav-level-1"><a class="nav-link" id="nav-' +
				'character-quicklinkmanager" href="index.php?cmd=notepad&' +
				'blank=1&subcmd=quicklinkmanager">Quick Links</a></li>');
		//guild
		pCL.find('#nav-guild-storehouse-inventory').parent('li')
			.after('<li class="nav-level-2"><a class="nav-link" id="nav-' +
				'guild-guildinvmanager" href="index.php?cmd=notepad&blank=1' +
				'&subcmd=guildinvmgr">Guild Inventory</a></li>');
		if (!FSH.System.getValue('useNewGuildLog')) {
			//if not using the new guild log, show it as a separate menu entry
			pCL.find('#nav-guild-ledger-guildlog').parent('li')
				.before('<li class="nav-level-2"><a class="nav-link" id="nav' +
					'-guild-newguildlog" href="index.php?cmd=notepad&blank=1' +
					'&subcmd=newguildlog">New Guild Log</a></li>');
		}
		//top rated
		pCL.find('#nav-toprated-players-level').parent('li')
			.after('<li class="nav-level-2"><a class="nav-link" id="nav-' +
				'toprated-top250" href="index.php?cmd=toprated&subcmd=xp">' +
				'Top 250 Players</a></li>');
		//actions
		pCL.find('#nav-actions-trade-auctionhouse').parent('li')
			.after('<li class="nav-level-2"><a class="nav-link" id="nav-' +
				'actions-ahquicksearch" href="index.php?cmd=notepad&blank=1' +
				'&subcmd=auctionsearch">AH Quick Search</a></li>');
		pCL.find('#nav-actions-interaction-findplayer').parent('li')
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
		$('ul.nav-animated')
			.filter(function() {
				return $(this).css('height') !== '0px';
			}).css('height', function() {
				return $(this).find('li').length * 22;
			});
		//and now the closed saved variables
		$('#nav').nav('calcHeights');

		FSH.ga.end('JS Perf', 'injectMenu');

	},

	moveRHSBoxUpOnRHS: function(title) {
		$('#pCR').prepend($('#' + title));
	},

	moveRHSBoxToLHS: function(title) {
		// var myDiv = $('#' + title).wrap('<div class="pCR"></div>');
		// myDiv = myDiv.parent();
		// $('#pCL').append(myDiv);
		$('#pCL').append($('#' + title).addClass('pCR'));
		// $('#pCL').append('<style>.pCR a { color: #F7EAC9; }</style>');
	},

	//TODO replace this
	notebookContent: function() {
		return $('#pCC')[0]; //new interface logic
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
		var thePlayerId = parseInt(document.getElementById('holdtext')
			.textContent.match(/fallensword.com\/\?ref=(\d+)/)[1], 10);
		FSH.System.setValue('playerID',thePlayerId);
		return thePlayerId;
	},

	guildId: function () {
		var guildId;
		var nodeList = document.body.getElementsByTagName('script');
		Array.prototype.forEach.call(nodeList, function(el) {
			var match = el.textContent.match(/\s+guildId: ([0-9]+),/);
			if (match) {guildId = parseInt(match[1], 10);}
		});
		FSH.System.setValue('guildId', guildId);
		return guildId;
	},

	infoBox: function(documentText) {
		var infoMatch = $(documentText).find('center[id="info-msg"]').html();
		var result = '';
		if (infoMatch) {
			infoMatch = infoMatch.replace(/<br.*/,'');
			result = infoMatch;
		}
		return result;
	},

	networkIcon:
		'<img class="networkIcon tip-static" ' +
		'data-tipped="This function retrieves data from the network. ' +
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

	quickBuffHref: function(playerId, buffList) { // Evil
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
		'class="notification-content" style="position: static">' +
		'Bow down to the gods</a></td></tr>' +
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
		'<table class="fshInvFilter">' +
		'<tr><th colspan="14">@@reportTitle@@</th>' +
		'<th><span id="fshRefresh">[Refresh]</span></th></tr>' +
		'<tr><td colspan="2" rowspan="3"><b>&nbsp;Show Items:</b></td>' +
		'<td class="fshRight">&nbsp;Helmet:</td>' +
		'<td><input id="fshHelmet" type="checkbox" item="0"/></td>' +
		'<td class="fshRight">&nbsp;Armor:</td>' +
		'<td><input id="fshArmor" type="checkbox" item="1"/></td>' +
		'<td class="fshRight">&nbsp;Gloves:</td>' +
		'<td><input id="fshGloves" type="checkbox" item="2"/></td>' +
		'<td class="fshRight">&nbsp;Boots:</td>' +
		'<td><input id="fshBoots" type="checkbox" item="3"/></td>' +
		'<td class="fshRight">&nbsp;Weapon:</td>' +
		'<td><input id="fshWeapon" type="checkbox" item="4"/></td>' +
		'<td></td>' +
		'<td class="fshRight">&nbsp;Min lvl:</td>' +
		'<td><input id="fshMinLvl" size="5" value="1"/></td>' +
		'</tr><tr>' +
		'<td class="fshRight">&nbsp;Shield:</td>' +
		'<td><input id="fshShield" type="checkbox" item="5"/></td>' +
		'<td class="fshRight">&nbsp;Ring:</td>' +
		'<td><input id="fshRing" type="checkbox" item="6"/></td>' +
		'<td class="fshRight">&nbsp;Amulet:</td>' +
		'<td><input id="fshAmulet" type="checkbox" item="7"/></td>' +
		'<td class="fshRight">&nbsp;Rune:</td>' +
		'<td><input id="fshRune" type="checkbox" item="8"/></td>' +
		'<td class="fshRight">&nbsp;Sets Only:</td>' +
		'<td><input id="fshSets" item="-1" type="checkbox"/></td>' +
		'<td></td>' +
		'<td class="fshRight">&nbsp;Max lvl:</td>' +
		'<td><input id="fshMaxLvl" size="5" value="9999"/></td>' +
		'</tr><tr>' +
		'<td colspan="2">' +
		'&nbsp;[<span id="fshAll" class="fshLink">Select All</span>]</td>' +
		'<td colspan="2">' +
		'&nbsp;[<span id="fshNone" class="fshLink">Select None</span>]</td>' +
		'<td colspan="2">' +
		'&nbsp;[<span id="fshDefault" class="fshLink">Defaults</span>]</td>' +
		'<td colspan="6"></td>' +
		'<td><input id="fshReset" type="button" value="Reset"/></td>' +
		'</tr>' +
		'<tr>' +
		'<td class="fshRight">&nbsp;Quest Item:</td>' +
		'<td><input id="fshQuest" item="9" type="checkbox"/></td>' +
		'<td class="fshRight">&nbsp;Potion:</td>' +
		'<td><input id="fshPotion" item="10" type="checkbox"/></td>' +
		'<td class="fshRight">&nbsp;Resource:</td>' +
		'<td><input id="fshResource" item="12" type="checkbox"/></td>' +
		'<td class="fshRight">&nbsp;Recipe:</td>' +
		'<td><input id="fshRecipe" item="13" type="checkbox"/></td>' +
		'<td class="fshRight">&nbsp;Container:</td>' +
		'<td><input id="fshContainer" item="14" type="checkbox"/></td>' +
		'<td class="fshRight">&nbsp;Frag Stash:</td>' +
		'<td><input id="fshStash" item="16" type="checkbox"/></td>' +
		//' Composed: <input id="fshComposed" item="15" type="checkbox"/>' +
		'<td colspan="3"></td></tr>' +
		'<tr>' +
		'<td class="fshRight">&nbsp;Common:</td>' +
		'<td><input id="fshCommon" item="100" type="checkbox" checked/></td>' +
		'<td class="fshRight">&nbsp;Rare:</td>' +
		'<td><input id="fshRare" item="101" type="checkbox" checked/></td>' +
		'<td class="fshRight">&nbsp;Unique:</td>' +
		'<td><input id="fshUnique" item="102" type="checkbox" checked/></td>' +
		'<td class="fshRight">&nbsp;Legendary:</td>' +
		'<td><input id="fshLegendary" item="103" type="checkbox" checked/></td>' +
		'<td class="fshRight">&nbsp;Super Elite:</td>' +
		'<td><input id="fshSuperElite" item="104" type="checkbox" checked/></td>' +
		'<td class="fshRight">&nbsp;Crystalline:</td>' +
		'<td><input id="fshCrystalline" item="105" type="checkbox" checked/></td>' +
		'<td class="fshRight">&nbsp;Epic:</td>' +
		'<td colspan="2"><input id="fshEpic" item="106" type="checkbox" checked/></td>' +
		'</tr>' +
		'</table>',

	helperMenu:
		'<div class="column"><h3>Character</h3><ul><li>' +
		'<span class="fshLink" fn="quickBuff.injectBuffLog">Buff Log</span>' +
		'</li><li>' +
		'<span class="fshLink" fn="combatLog.injectNotepadShowLogs">Combat Log</span>' +
		'</li><li>' +
		'<span class="fshLink" fn="recipeMgr.injectRecipeManager">Recipe Manager</span>' +
		'</li><li>' +
		'<span class="fshLink" fn="lists.injectQuickLinkManager">Quick Links</span>' +
		'</li></ul><h3>Actions</h3><ul><li>' +
		'<span class="fshLink" fn="findBuffs.injectFindBuffs">Find Buffs</span>' +
		'</li><li>' +
		'<span class="fshLink" fn="findBuffs.injectFindOther">Find Other</span>' +
		'</li><li>' +
		'<span class="fshLink" fn="onlinePlayers.injectOnlinePlayers">Online Players</span>' +
		'</li><li>' +
		'<span class="fshLink" fn="lists.injectAuctionSearch">AH Quick Search</span>' +
		'</li></ul><h3>Extra</h3><ul><li>' +
		'<span class="fshLink" fn="quickExtract.insertQuickExtract">Quick Extract</span>' +
		'</li><li>' +
		'<span class="fshLink" fn="quickWear.insertQuickWear">Quick Wear</span>' +
		'</li><li>' +
		'<span class="fshLink" fn="environment.injectFsBoxContent">FS Box Log</span>' +
		'</li></ul>' +
		'<h3>FSH developer quick links</h3>' +
		'<ul><li>' +
		'<span class="a-reply" target_player="PointyHair">PM</span> ' +
		'<a href="index.php?cmd=profile&player_id=1963510">PointyHair</a>' +
		'</li><li>' +
		'<span class="a-reply" target_player="yuuzhan">PM</span> ' +
		'<a href="index.php?cmd=profile&player_id=1599987">yuuzhan</a>' +
		'</li></ul>' +
		'</div>',

	arenaFilter:
		'<table width="100%"><tbody><tr><td>' +
		'<span class="fshBlue"><input id="fshHideMoves" type="checkbox">' +
		'&nbsp;Hide Matches for Completed Moves</span></td><td align="right">' +
		'<span class="fshBlue">Min lvl:&nbsp;<input id="fshMinLvl" size="5">' +
		'&nbsp;Max lvl:&nbsp;<input id="fshMaxLvl" size="5">&nbsp;&nbsp;' +
		'<input id="fshReset" class="custombutton" type="button" ' +
		'value="Reset"></span></td></tr></tbody></table>',

	searchMapUFSG:
		'<a href="http://guide.fallensword.com/index.php?cmd=realms&subcmd=view' +
		'&realm_id=@@realmId@@" target="mapUFSG" ' +
			'class="quicklink tip-static" data-tipped="Search map in Ultimate FSG" ' +
			'style="background-image: url(\'' + FSH.System.imageServer +
			'/temple/1.gif\');">' +
		'</a>',

	worldFormgroup:
		'<a href="#" class="quicklink tip-static" ' +
			'data-tipped="Quick Create Attack Group" ' +
			'style="background-image: url(\'' + FSH.System.imageServer +
			'/skin/realm/icon_action_formgroup.gif\');">' +
		'</a>',

	worldQuickBuff:
		'<a href="#" class="quicklink tip-static" ' +
			'data-tipped="Open Quick Buff Popup" ' +
			'style="background-image: url(\'' + FSH.System.imageServer +
			'/skin/realm/icon_action_quickbuff.gif\');">' +
		'</a>',

	worldMap:
		'<a href="index.php?cmd=world&subcmd=map" target="fsWorldMap" ' +
			'class="quicklink tip-static" data-tipped="Open Realm Map" ' +
			'style="background-image: url(\'' + FSH.System.imageServer +
			'/skin/realm/icon_action_map.gif\');">' +
		'</a>',

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
		FSH.Helper.myUsername = $('#statbar-character').text();
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

	queue: function() {
		FSH.ajax.deferred = FSH.ajax.deferred || $.when();
		return FSH.ajax.deferred;
	},

	queueTakeItem: function(invId, action) {
		// You have to chain them because they could be modifying the backpack
		FSH.ajax.deferred = FSH.ajax.queue().pipe(function() {
			return FSH.ajax.takeItem(invId, action);
		});
		return FSH.ajax.deferred;
	},

	queueRecallItem: function(o) {
		// You have to chain them because they could be modifying the backpack
		FSH.ajax.deferred = FSH.ajax.queue().pipe(function() {
			return FSH.ajax.recallItem(o);
		});
		return FSH.ajax.deferred;
	},

	takeItem: function(invId, action) {
		return $.ajax({
			url: 'index.php',
			data: {
				'cmd': 'guild',
				'subcmd': 'inventory',
				'subcmd2': 'takeitem',
				'guildstore_id': invId,
				'ajax': 1
			},
			dataType: 'json'
		}).done(FSH.ajax.dialog).pipe(function(data) {
				if (data.r === 0 && action !== 'take') {
					if (action === 'wear') {
						return FSH.ajax.equipItem(data.b)
							.pipe(function() {return data;});
							// Return takeitem status irrespective of the status of the equipitem
					}
					if (action === 'use') {
						return FSH.ajax.useItem(data.b)
							.pipe(function() {return data;});
							// Return takeitem status irrespective of the status of the useitem
					}
				}
				return data;
			});
	},

	recallItem: function(o) {
		return FSH.ajax.guildInvRecall(o.invId, o.playerId, o.mode)
			.pipe(function(data) {
				if (data.r === 0 && o.action !== 'recall') {
					return FSH.ajax.backpack().pipe(function(bpData) {
						// TODO assuming backpack is successful...
						if (o.action === 'wear') {
							return FSH.ajax.equipItem(
									bpData.items[bpData.items.length - 1].a
								)
								.pipe(function() {return data;});
							// Return recall status irrespective of the status of the equipitem
						}
						if (o.action === 'use') {
							return FSH.ajax.useItem(
									bpData.items[bpData.items.length - 1].a
								)
								.pipe(function() {return data;});
							// Return recall status irrespective of the status of the useitem
						}
					});
				}
				return data;
			});
	},

	guildInvRecall: function(invId, playerId, mode) {
		return $.ajax({
			url: 'index.php',
			data: {
				'cmd': 'guild',
				'subcmd': 'inventory',
				'subcmd2': 'recall',
				'id': invId,
				'player_id': playerId,
				'mode': mode
			}
		}).pipe(FSH.ajax.htmlResult)
			.done(FSH.ajax.dialog);
	},

	htmlResult: function(data) {
		var info = FSH.Layout.infoBox(data);
		return info.search(/(successfully|gained)/) !== -1 ?
			{r: 0, m: ''} : {r: 1, m: info};
	},

	useItem: function(backpackInvId) {
		return $.ajax({
			url: 'index.php',
			data: {
				'cmd': 'profile',
				'subcmd': 'useitem',
				'inventory_id': backpackInvId
			}
		}).pipe(FSH.ajax.htmlResult)
			.done(FSH.ajax.dialog);
	},

	backpack: function () {
		return $.ajax({
			url: 'index.php',
			data: {'cmd': 'profile', 'subcmd': 'fetchinv'},
			dataType: 'json'
		});
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
		}).done(FSH.ajax.dialog);
	},

	dialog: function(data) {
		if (data.r === 0) {return;}
		$('#dialog_msg').html(data.m).dialog('open');
	},

	guildMailboxTake: function(href) {
		return $.ajax({
			url: href
		}).pipe(function(data) {
				var info = FSH.Layout.infoBox(data);
				return info === 'Item was transferred to the guild store!' ?
					{r: 0, m: ''} : {r: 1, m: info};
			})
			.done(FSH.ajax.dialog);
	},

	moveItem: function(invIdList, folderId) {
		return $.ajax({
			url: 'index.php',
			data: {
				'cmd': 'profile',
				'subcmd': 'sendtofolder',
				'inv_list': JSON.stringify(invIdList),
				'folder_id': folderId,
				'ajax': 1
			},
			dataType: 'json'
		}).done(FSH.ajax.dialog);
	},

	dropItem: function(invIdList) {
		return $.ajax({
			url: 'index.php',
			data: {
				'cmd': 'profile',
				'subcmd': 'dodropitems',
				'removeIndex': invIdList,
				'ajax': 1
			},
			dataType: 'json'
		}).done(FSH.ajax.dialog);
	},

	sendItem: function(invIdList) {
		return $.ajax({
			url: 'index.php',
			data: {
				'cmd': 'trade',
				'subcmd': 'senditems',
				'xc': window.ajaxXC,
				'target_username': FSH.System.getValue('itemRecipient'),
				'sendItemList': invIdList
			}
		}).pipe(FSH.ajax.htmlResult)
			.done(FSH.ajax.dialog);
	},

	debuff: function(buffId) {
		return $.ajax({
			url: 'fetchdata.php',
			data: {
				'a': '22',
				'd': '0',
				'id': buffId
			},
			dataType: 'json'
		});
	},

	doPickMove: function(moveId, slotId) {
		return $.ajax({
			url: 'index.php',
			data: {
				'cmd': 'arena',
				'subcmd': 'dopickmove',
				'move_id': moveId,
				'slot_id': slotId
			}
		});
	},

};

FSH.composing = { // jQuery

	injectComposeAlert: function() { //jquery
		if (FSH.cmd === 'composing') {return;}

		FSH.ga.start('JS Perf', 'injectComposeAlert');

		var needToCompose = FSH.System.getValue('needToCompose');
		if (needToCompose) {
			FSH.composing.displayComposeMsg();
			return;
		}
		var lastComposeCheck = FSH.System.getValue('lastComposeCheck');
		if (lastComposeCheck && Date.now() < lastComposeCheck) {return;}
		$.get('index.php?cmd=composing', FSH.composing.parseComposing);

		FSH.ga.end('JS Perf', 'injectComposeAlert');

	},

	parseComposing: function(data) { //jquery

		FSH.ga.start('JS Perf', 'parseComposing');

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

		FSH.ga.end('JS Perf', 'parseComposing');

	},

	displayComposeMsg: function() { //jquery
		$('#notifications').prepend(FSH.Layout.composeMsg);
	},

	injectComposing: function() { //jquery

		FSH.ga.start('JS Perf', 'injectComposing');

		if ($('#pCC').length !== 1) {return;}
		if (FSH.Helper.enableComposingAlert) {
			FSH.composing.parseComposing();}

		$('input[id^=create-]').not('#create-multi').after('&nbsp;[<span ' +
			'class="helperQC">Quick Create</span>]');

		$('#pCC').on('click', 'span.helperQC', function() {
			var temp = $(this).prev().prev();
			if (temp.length === 1 && temp.val() !== 'none') {
				FSH.composing.createPotion(temp);
			}
		});

		if (FSH.System.getValue('moveComposingButtons')) {
			$('div.composing-level').parent()
				.before($('#pCC b:contains("Instant Finish Price Reset:")')
					.parent().attr('style', 'text-align: right; padding: 0 38px 0 0'));
		}

		FSH.ga.end('JS Perf', 'injectComposing');

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
			});
	},

	create: function() {

		FSH.ga.start('JS Perf', 'composing.create');

		$('#composing-add-skill').on('click', function() {
			$('#composing-skill-level-input')
				.val($('#composing-skill-level-max').text());
		});

		$('#composing-skill-select').on('change', function() {
			$('#composing-skill-level-input')
				.val($('#composing-skill-level-max').text());
		});

		FSH.ga.end('JS Perf', 'composing.create');

	},

};

FSH.notification = { // jQuery

	injectTempleAlert: function() { //jquery
		//Checks to see if the temple is open for business.
		if (FSH.cmd === 'temple') {return;}

		FSH.ga.start('JS Perf', 'injectTempleAlert');

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

		FSH.ga.end('JS Perf', 'injectTempleAlert');

	},

	parseTemplePage: function(responseText) { //native
		var checkNeedToPray, doc;
		if (!FSH.Helper.enableTempleAlert) {return;}

		FSH.ga.start('JS Perf', 'parseTemplePage');

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

		FSH.ga.end('JS Perf', 'parseTemplePage');

	},

	displayDisconnectedFromGodsMessage: function() { //jquery
		$('#notifications').prepend(FSH.Layout.godsNotification);
		$('#helperPrayToGods').on('click', 'img', function() {
			$('#helperPrayToGods').off('click', 'img');
			var index = $(this).qtip('hide').attr('src').replace(/\D/g, '');
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
			$('#pCC input[name="upgrade_id"][value="1"]', doc).parent()
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
		$('#notifications').prepend(FSH.Layout.goldUpgradeMsg);
	},

	injectJoinAllLink: function() { // jQuery
		var newGroup = $('li:contains("New attack group created.")');
		if (newGroup.length !== 1) {return;}
		var groupJoinHTML = '';
		if (!FSH.System.getValue('enableMaxGroupSizeToJoin')) {
			groupJoinHTML = '<a href="index.php?cmd=guild&subcmd=groups&' +
				'subcmd2=joinall"><span class="notification-icon"></span>'+
				'<p class="notification-content">Join all attack groups.</p></a>';
		} else {
			var maxGroupSizeToJoin = FSH.System.getValue('maxGroupSizeToJoin');
			groupJoinHTML = '<a href="index.php?cmd=guild&subcmd=groups&' +
				'subcmd2=joinallgroupsundersize"><span class="notification-icon">' +
				'</span><p class="notification-content">Join all attack groups ' +
				'less than size ' + maxGroupSizeToJoin + '.</p></a>';
		}
		newGroup.after('<li class="notification">' + groupJoinHTML + '</li>');
	},

};

FSH.guildReport = { // bad jQuery

	injectReportPaint: function() { // jQuery

		FSH.ga.start('JS Perf', 'injectReportPaint');

		FSH.ajax.getMembrList(false)
			.done(FSH.guildReport.reportHeader);
		var innerTable = document.querySelector('#pCC table table');
		FSH.guildReport.searchUser(innerTable);
		var nodeList = innerTable
			.querySelectorAll('tr:not(.fshHide) td:nth-of-type(3n+0)');
		Array.prototype.forEach.call(nodeList, FSH.guildReport.reportChild);
		FSH.guildReport.eventHandlers($(innerTable));

		FSH.ga.end('JS Perf', 'injectReportPaint');

	},

	searchUser: function(innerTable) {
		var searchUser = FSH.System.getUrlParameter('user');
		if (!searchUser) {return;}
		var userNode = $('b:contains("' + searchUser + '")', innerTable);
		if (userNode.length > 0) {
			userNode.closest('tr').prevAll().addClass('fshHide');
			var otherUsers = userNode.closest('tr').nextAll().find('b');
			if (otherUsers.length > 0) {
				otherUsers.eq(0).closest('tr').prev().nextAll().addClass('fshHide');
			}
		}
	},

	eventHandlers: function(innerTable) {
		innerTable.on('click', 'span.a-reply', function(evt) {
			window.openQuickMsgDialog(
				evt.target.getAttribute('target_player'));
		});
		innerTable.on('click', '.recall', FSH.guildReport.recallItem);
		innerTable.on('click', '.equip', FSH.guildReport.wearItem);
	},

	reportHeader: function() { // jQuery
		$('#pCC table table td[bgcolor="#DAA534"][colspan="2"] b')
			.html(function(_index, oldhtml) {
				return FSH.Layout.onlineDot({
						last_login: FSH.Helper.membrList[oldhtml].last_login
					}) + '<a href="index.php?cmd=profile&player_id=' +
					FSH.Helper.membrList[oldhtml].id + '">' + oldhtml +
					'</a> [ <span class="a-reply fshLink" target_player=' +
					oldhtml + '>m</span> ]';
			});
	},

	wearRE: /<b>|Bottle|Brew|Draft|Elixir|Potion|Jagua Egg|Gut Rot Head Splitter|Serum/,

	reportChild: function(el) { // bad native
		el.className = 'fshNoWrap';
		var inject = document.createElement('span');
		var secondHref = el.children.length === 2;
		var firstHref = secondHref ? '': ' class="fshHide"';
		var itemName = el.previousElementSibling.innerHTML;
		var wearable = FSH.guildReport.wearRE.test(itemName) ?
			' class="fshHide"' : '';
		var equipable = secondHref ? 'recall': 'equip';
		inject.innerHTML = '<span' + firstHref +
			'> | <span class="reportLink recall tip-static" data-tipped="' +
			'Click to recall to backpack" mode="0" action="recall">Fast BP' +
			'</span></span>' +
			' | <span class="reportLink recall tip-static" ' +
			'data-tipped="Click to recall to guild store" mode="1" ' +
			'action="recall">Fast GS</span>' +
			'<span' + wearable +
			'> | <span class="reportLink ' +
			equipable +
			'" mode="0" action="wear">Fast Wear</span></span>';
		el.appendChild(inject);
	},

	recallItem: function() { // jQuery
		var self = $(this).qtip('hide');
		var theTd = self.closest('td');
		var href = $('a', theTd).eq(0).attr('href');
		FSH.ajax.queueRecallItem({
			invId: href.match(/&id=(\d+)/)[1],
			playerId: href.match(/&player_id=(\d+)/)[1],
			mode: self.attr('mode'),
			action: self.attr('action')})
			.done(function(data){
				if (data.r === 1) {return;}
				theTd.empty().append('<span style="color:green; font-weight:bold;">' +
					'You successfully recalled the item</span>');
			});
		theTd.empty().append('<img src="' + FSH.System.imageServer +
			'/skin/loading.gif" width="25" height="25">');
	},

	wearItem: function() { // jQuery
		var self = $(this).qtip('hide');
		var theTd = self.closest('td');
		var href = $('a', theTd).eq(0).attr('href');
		FSH.ajax.equipItem(href.match(/&id=(\d+)/)[1]).done(function(data){
			if (data.r === 1) {return;}
				theTd.empty().append('<span style="color:green; font-weight:bold;">' +
					'Worn</span>');
		});
		theTd.empty().append('<img src="' + FSH.System.imageServer +
			'/skin/loading.gif" width="25" height="25">');
	},

};

FSH.guildAdvisor = { // jQuery

	injectAdvisor: function() { // Native
		if (FSH.subcmd2 === 'weekly') {
			FSH.guildAdvisor.injectAdvisorWeekly();
		} else {
			FSH.ajax.getMembrList(false).done(FSH.guildAdvisor.injectAdvisorNew);
		}
	},

	summaryLink: function() {
		var updateInput = $('#pCC input[value="Update"]');
		if (updateInput.length !== 1) {return;}
		updateInput.after('<span> <a href="index.php?cmd=guild&subcmd=advisor&' +
			'subcmd2=weekly">7-Day Summary</a></span>');
	},

	advisorColumns: [
		{title: '<div class="fshBold">Member</div>'},
		{title: '<div class="fshBold">Lvl</div>', class: 'dt-center'},
		{title: '<div class="fshBold">Rank</div>', class: 'dt-center dt-nowrap'},
		{title: '<div class="fshBold">Gold From Deposits</div>',
			class: 'dt-center'},
		{title: '<div class="fshBold">Gold From Tax</div>', class: 'dt-center'},
		{title: '<div class="fshBold">Gold Total</div>', class: 'dt-center'},
		{title: '<div class="fshBold">FSP</div>', class: 'dt-center'},
		{title: '<div class="fshBold">Skill Cast</div>', class: 'dt-center'},
		{title: '<div class="fshBold">Group Create</div>', class: 'dt-center'},
		{title: '<div class="fshBold">Group Join</div>', class: 'dt-center'},
		{title: '<div class="fshBold">Relic</div>', class: 'dt-center'},
		{title: '<div class="fshBold">XP Contrib</div>', class: 'dt-center'}
	],

	injectAdvisorNew: function(m) { // jQuery

		FSH.ga.start('JS Perf', 'injectAdvisorNew');

		var list = $('#pCC table[cellpadding="1"]');
		if (list.length !== 1) {return;}
		var tfoot = $('<tfoot/>').append($('tr', list).last());
		$('td', tfoot).first().removeAttr('class').attr('colspan', 3)
			.attr('style', 'text-align: right;');
		list.css('font-size', 'x-small');
		list.addClass('hover');
		$('tr', list).first().remove();
		$('td', list).removeAttr('bgcolor');
		var tdOne = $('tr td:first-child', list);
		tdOne.html(function(_index, oldhtml) {
			var username = $(oldhtml).text().trim();
			return '<a href="index.php?cmd=profile&player_id=' +
				m[username].id + '">' +
				username + '</a>';
		});
		tdOne.after(function() {
			var username = $(this).text();
			return '<td>' + m[username].level +
				'</td><td>' + m[username].rank_name.substr(0,9) +
				(m[username].rank_name.length > 9 ? '...' : '') + '</td>';
		});
		list.append(tfoot);
		setTimeout(function() {
			list.dataTable({
				pageLength: 25,
				lengthMenu: [[25, 50, -1], [25, 50, 'All']],
				autoWidth: false,
				columns: FSH.guildAdvisor.advisorColumns,
				stateSave: true,
				stateDuration: 0
			});
		}, 0);
		FSH.guildAdvisor.summaryLink();

		FSH.ga.end('JS Perf', 'injectAdvisorNew');

	},

	newSummary: {},

	injectAdvisorWeekly: function() { // jQuery

		FSH.ga.start('JS Perf', 'injectAdvisorWeekly');

		var list = $('#pCC table[cellpadding="1"]');
		if (list.length !== 1) {return;}
		list.html('<img src = "' + FSH.System.imageServer +
			'/world/actionLoadingSpinner.gif" style = "float: left;">' +
			'&nbsp;Retrieving daily data ...');
		FSH.guildAdvisor.list = list;

		$.when(
			FSH.ajax.getMembrList(false)
				.done(function(data) {
					FSH.guildAdvisor.membrList = data;
				}),
			FSH.guildAdvisor.getAdvisorPage(1),
			FSH.guildAdvisor.getAdvisorPage(2),
			FSH.guildAdvisor.getAdvisorPage(3),
			FSH.guildAdvisor.getAdvisorPage(4),
			FSH.guildAdvisor.getAdvisorPage(5),
			FSH.guildAdvisor.getAdvisorPage(6),
			FSH.guildAdvisor.getAdvisorPage(7)
		).done(FSH.guildAdvisor.addAdvisorPages);

		FSH.ga.end('JS Perf', 'injectAdvisorWeekly');

	},

	getAdvisorPage: function(e) {
		return $.ajax({
			url: 'index.php',
			data: {
				cmd: 'guild',
				subcmd: 'advisor',
				period: e
			},
			period: e
		}).done(FSH.guildAdvisor.returnAdvisorPage);
	},

	returnAdvisorPage: function(data) {
		var e = this.period;

		FSH.ga.start('JS Perf', 'returnAdvisorPage' + e);

		var list = FSH.guildAdvisor.list;
		list.append(' day ' + e + ',');
		var ns = FSH.guildAdvisor.newSummary;
		var tr = $('tr',
			$('#pCC table[cellpadding="1"]',
			FSH.System.createDocument(data)));
		tr.each(function(i, el) {
			var tds = $('td', el);
			var member = tds.eq(0).text().trim();
			if (member !== 'Member') {
				ns[member] = ns[member] || {};
				ns[member].deposit = (ns[member].deposit || 0) +
					FSH.System.intValue(tds.eq(1).text());
				ns[member].tax     = (ns[member].tax     || 0) +
					FSH.System.intValue(tds.eq(2).text());
				ns[member].total   = (ns[member].total   || 0) +
					FSH.System.intValue(tds.eq(3).text());
				ns[member].fsp     = (ns[member].fsp     || 0) +
					FSH.System.intValue(tds.eq(4).text());
				ns[member].skills  = (ns[member].skills  || 0) +
					FSH.System.intValue(tds.eq(5).text());
				ns[member].grpCrt  = (ns[member].grpCrt  || 0) +
					FSH.System.intValue(tds.eq(6).text());
				ns[member].grpJoin = (ns[member].grpJoin || 0) +
					FSH.System.intValue(tds.eq(7).text());
				ns[member].relics  = (ns[member].relics  || 0) +
					FSH.System.intValue(tds.eq(8).text());
				ns[member].contrib = (ns[member].contrib || 0) +
					FSH.System.intValue(tds.eq(9).text());
			}
		});

		FSH.ga.end('JS Perf', 'returnAdvisorPage' + e);

	},

	addAdvisorPages: function() { // Native

		FSH.ga.start('JS Perf', 'addAdvisorPages');

		var m = FSH.guildAdvisor.membrList;
		var o = FSH.guildAdvisor.newSummary;
		var data = [];
		Object.keys(o).forEach(function(f) {
			if (f !== 'Total:') {
				data.push([
					!m[f] ? f : '<a href="index.php?cmd=profile&player_id=' + m[f].id +
						'">' + f + '</a>',
					!m[f] ? '' : m[f].level,
					!m[f] ? '' : m[f].rank_name.substr(0,9) +
						(m[f].rank_name.length > 9 ? '...' : ''),
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
		FSH.guildAdvisor.data = data;
		setTimeout(FSH.guildAdvisor.displayAdvisor, 0);

		FSH.ga.end('JS Perf', 'addAdvisorPages');

	},

	displayAdvisor: function() { // jQuery

		FSH.ga.start('JS Perf', 'displayAdvisor');

		var o = FSH.guildAdvisor.newSummary;
		var data = FSH.guildAdvisor.data;
		var list = FSH.guildAdvisor.list;
		list.css('font-size', 'x-small');
		$(list).addClass('hover');
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
			autoWidth: false,
			columns: FSH.guildAdvisor.advisorColumns,
			stateSave: true,
			stateDuration: 0
		});

		FSH.ga.end('JS Perf', 'displayAdvisor');

	}

};

FSH.bazaar = { // jQuery

	inject: function() { // jQuery

		FSH.ga.start('JS Perf', 'bazaar.inject');

		var pbImg = $('#pCC img[alt="Potion Bazaar"]');
		pbImg.css('float', 'left');
		var myTable = FSH.Layout.bazaarTable;
		$('#pCC table table table img[src*="/items/"]').each(function(i) {
			var item = $(this);
			var tipped = item.data('tipped');
			myTable = myTable
				.replace('@' + i + '@', FSH.Layout.bazaarItem)
				.replace('@src@', item.attr('src'))
				.replace('@itemid@', tipped.match(/\?item_id=(\d+)/)[1])
				.replace('@tipped@', tipped);
		});
		myTable = $(myTable.replace(/@\d@/g, ''));
		$('#warning', myTable).hide();
		myTable.on('click', 'img[width="20"]', FSH.bazaar.select);
		myTable.on('input', '#buy_amount', FSH.bazaar.quantity);
		myTable.on('click', '#fshBuy', FSH.bazaar.buy);
		pbImg.parent().append(myTable);

		FSH.ga.end('JS Perf', 'bazaar.inject');

	},

	select: function(evt) { // jQuery
		var target = $(evt.target);
		FSH.bazaar.ItemId = target.attr('itemid');
		$('#quantity').text(
			$('#buy_amount').val());
		$('#warning').show();
		$('#selectedItem').empty().append(
			target.clone().attr('width', '45').attr('height', '45'));
	},

	quantity: function(evt) { // jQuery
		var theValue = parseInt(evt.target.value, 10);
		if (!isNaN(theValue) && theValue > 0 && theValue < 100) {
			$('#quantity:visible').text(theValue);
		}
	},

	buy: function() { // jQuery
		if (!FSH.bazaar.ItemId) {return;}
		var buyAmount = $('#buy_amount').val();
		$('#buy_result')
			.html('Buying ' + buyAmount + ' items');
		for (var i = 0; i < buyAmount; i += 1) {
			$.get('index.php?cmd=potionbazaar&subcmd=buyitem&item_id=' +
				FSH.bazaar.ItemId, FSH.bazaar.done);
		}
	},

	done: function(responseText) { // jQuery
		$('#buy_result')
			.append('<br>' + FSH.Layout.infoBox(responseText));
	}

};

FSH.groups = { // Legacy

	injectGroupStats: function() { // jQuery
		var attackValueElement = $('#stat-attack');
		attackValueElement.html(
			'<span class="fshBlue">' + attackValueElement.text() + '</span>' +
			' ( <span id="fshAtk">' + attackValueElement.text() + '</span> )'
		);
		var defenseValueElement = $('#stat-defense');
		defenseValueElement.html(
			'<span class="fshBlue">' + defenseValueElement.text() + '</span>' +
			' ( <span id="fshDef">' + defenseValueElement.text() + '</span> )'
		);
		var armorValueElement = $('#stat-armor');
		armorValueElement.html(
			'<span class="fshBlue">' + armorValueElement.text() + '</span>' +
			' ( <span id="fshArm">' + armorValueElement.text() + '</span> )'
		);
		var damageValueElement = $('#stat-damage');
		damageValueElement.html(
			'<span class="fshBlue">' + damageValueElement.text() + '</span>' +
			' ( <span id="fshDam">' + damageValueElement.text() + '</span> )'
		);
		var hpValueElement = $('#stat-hp');
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
		var mercElements = $('#pCC img[src*="/merc/"][data-tipped]',
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
		var attackValue = $('#fshAtk');
		attackValue.html(FSH.System.addCommas(FSH.System.intValue(
			attackValue.text()) - Math.round(totalMercAttack * 0.2)));
		var defenseValue = $('#fshDef');
		defenseValue.html(FSH.System.addCommas(FSH.System.intValue(
			defenseValue.text()) - Math.round(totalMercDefense * 0.2)));
		var armorValue = $('#fshArm');
		armorValue.html(FSH.System.addCommas(FSH.System.intValue(
			armorValue.text()) - Math.round(totalMercArmor * 0.2)));
		var damageValue = $('#fshDam');
		damageValue.html(FSH.System.addCommas(FSH.System.intValue(
			damageValue.text()) - Math.round(totalMercDamage * 0.2)));
		var hpValue = $('#fshHP');
		hpValue.html(FSH.System.addCommas(FSH.System.intValue(
			hpValue.text()) - Math.round(totalMercHP * 0.2)));
	},

	injectGroups: function() { // jQuery
		FSH.ajax.getMembrList(false)
			.done(FSH.groups.doGroupPaint);
		FSH.groups.displayMinGroupLevel();
		FSH.groups.groupButtons();
		FSH.groups.fixTable();
	},

	fixTable: function() {
		// Cows don't add!
		var tds = $('#pCC td.header-dark');
		tds.eq(0).attr('width', '20%');
		tds.eq(1).attr('width', '51%');
		tds.eq(2).attr('width', '22%');
		tds.eq(3).attr('width', '7%');
	},

	doGroupPaint: function(m) { // jQuery

		FSH.ga.start('JS Perf', 'doGroupPaint');

		$('#pCC table table table tr').has('.group-action-container')
			.each(function(i, e) {
				FSH.groups.doGroupRow(e, m);
			});

		FSH.ga.end('JS Perf', 'doGroupPaint');

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
		} else {inject += td.html();}
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

	groupButtons: function() { // Legacy
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

		if (FSH.subcmd2 === 'joinallgroupsundersize') {
			FSH.groups.joinAllGroupsUnderSize();
		}
	},

	filterMercs: function(e) {return e.search('#000099') === -1;},

	joinGroup: function(groupJoinURL, joinButton) { // jQuery
		$.ajax({
			url: FSH.System.server + groupJoinURL,
			success: function() {
				joinButton.style.display = 'none';
				joinButton.style.visibility = 'hidden';
			}
		});
	},

	joinAllGroupsUnderSize: function() { // Legacy
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

	fetchGroupData: function() { // Legacy
		var calcButton = FSH.System.findNode('//input[@id="fetchgroupstats"]');
		calcButton.style.display = 'none';
		var allItems = FSH.System.findNodes('//a[contains(@href,"index.php?cmd=guild&subcmd=groups&subcmd2=viewstats&group_id=")]/img');
		for (var i=0; i<allItems.length; i += 1) {
			FSH.System.xmlhttp(allItems[i].parentNode.getAttribute('href'), FSH.groups.parseGroupData, allItems[i].parentNode);
		}
	},

	parseGroupData: function(responseText, linkElement) { // Legacy
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
		$('#pCC td').has('#show-guild-founder-rank-name')
			.append('&nbsp;')
			.append(weightButton);
	},

	doRankPaint: function() { // jQuery

		FSH.ga.start('JS Perf', 'doRankPaint');

		var theTable = $('#pCC table table').has('td.line[width="80%"]')[0];
		var myRank = FSH.Helper.membrList[$('#statbar-character')
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

		FSH.ga.end('JS Perf', 'doRankPaint');

	},

	ajaxifyRankControls: function() { // Legacy
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

	moveRankUpOneSlotOnScreen: function(evt) { // Legacy
		var onclickHREF = evt.target.getAttribute('onclickhref');
		var thisRankRow = evt.target.parentNode.parentNode.parentNode;
		var parentTable = thisRankRow.parentNode;
		var thisRankRowNum = thisRankRow.rowIndex;
		var previousRankRowNum = parseInt(thisRankRowNum, 10);
		if (previousRankRowNum <= 1 || FSH.rank.characterRow > thisRankRowNum) {return;}
		var injectRow = parentTable.rows[previousRankRowNum - 1];
		parentTable.insertBefore(thisRankRow, injectRow);
		FSH.System.xmlhttp(onclickHREF);
		window.scrollBy(0,-22);
	},

	moveRankDownOneSlotOnScreen: function(evt) { // Legacy
		var onclickHREF = evt.target.getAttribute('onclickhref');
		var thisRankRow = evt.target.parentNode.parentNode.parentNode;
		var parentTable = thisRankRow.parentNode;
		var thisRankRowNum = thisRankRow.rowIndex;
		var previousRankRowNum = parseInt(thisRankRowNum + 3, 10);
		if (previousRankRowNum - 1 > parentTable.rows.length || FSH.rank.characterRow > thisRankRowNum) {return;}
		var injectRow = parentTable.rows[previousRankRowNum - 1];
		parentTable.insertBefore(thisRankRow, injectRow);
		FSH.System.xmlhttp(onclickHREF);
		window.scrollBy(0,22);
	},

	fetchRankData: function() { // Legacy
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

	parseRankData: function(responseText, linkElement) { // Legacy
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

	doSpinner: function() { // jQuery
		$('#pCC').html('<span id="fshInvMan"><img src = "' +
		FSH.System.imageServer + '/world/actionLoadingSpinner.gif">&nbsp;' +
			'Getting inventory data...</span>');
	},

	injectInventoryManagerNew: function() { // jQuery
		FSH.inventory.doSpinner();
		FSH.inventory.syncInvMan();
	},

	syncInvMan: function() { // jQuery
		var prm = [];
		prm.push(FSH.ajax.inventory(true));
		if (FSH.subcmd === 'guildinvmgr') {
			prm.push(FSH.ajax.getMembrList(false));
		}
		prm.push(FSH.ajax.getForage('fsh_inventory')
			.pipe(function(data) {
				FSH.inventory.options = data || {};
				FSH.inventory.options.fshMinLvl = FSH.inventory.options.fshMinLvl ||
					FSH.Data.defaults.inventoryMinLvl;
				FSH.inventory.options.fshMaxLvl = FSH.inventory.options.fshMaxLvl ||
					FSH.Data.defaults.inventoryMaxLvl;
				FSH.inventory.options.checkedElements =
					FSH.inventory.options.checkedElements ||
					FSH.Data.defaults.inventoryCheckedElements;
			})
		);
		$.when.apply($, prm).done(FSH.inventory.getInvMan);
	},

	getInvMan: function() { // Native

		FSH.ga.start('JS Perf', 'getInvMan');

		FSH.inventory.showQuickDropLinks =
			FSH.System.getValue('showQuickDropLinks');
		FSH.inventory.showQuickSendLinks =
			FSH.System.getValue('showQuickSendLinks');

		if (FSH.Helper.membrList) {
			FSH.inventory.rekeyMembrList();
		}

		FSH.inventory.decorate();
		FSH.inventory.lvlFilter();
		FSH.inventory.typeFilter();
		FSH.inventory.setFilter();
		FSH.inventory.rarityFilter();
		FSH.inventory.headers();
		FSH.inventory.setChecks();
		FSH.inventory.setLvls();
		FSH.inventory.doTable();
		FSH.inventory.eventHandlers();
		FSH.inventory.clearButton();

		FSH.ga.end('JS Perf', 'getInvMan');

	},

	rekeyMembrList: function() { // Native
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

	decorate: function() { // Native

		if (FSH.Helper.inventory.folders) {
			FSH.Helper.inventory.folders['-1'] = 'Main';
		}

		// Hide composed potions until Zorg fixes the feed
		FSH.Helper.inventory.items =
			FSH.Helper.inventory.items.filter(function(obj) {
					return obj.type !== '15';
			});
		//

	},

	headers: function() { // jQuery
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

	doTable: function() { // jQuery
		$('#pCC').append('<table id="fshInv" class="hover" style="font-size: x-small;"></table>');
		var table = $('#fshInv').DataTable({
			data: FSH.Helper.inventory.items,
			autoWidth: false,
			pageLength: 50,
			lengthMenu: [[50, 100, 150, 200, -1], [50, 100, 150, 200, 'All']],
			columnDefs: [{targets: '_all', defaultContent: ''},
				{targets: [1, 4, 5, 6, 7, 8, 9, 10, 12, 13],
					orderSequence: ['desc', 'asc']}],
			columns: [
				{title: 'Name', data: 'item_name',
					render: FSH.inventory.nameRender
				},
				{title: 'Level', data: 'stats.min_level'},
				{title: 'Where', data: FSH.inventory.whereData,
					render: {
						'_': FSH.inventory.whereRender,
						'display': FSH.inventory.whereRenderDisplay,
						'filter': FSH.inventory.whereRenderFilter
					}
				},
				{title: 'Type', data: 'type',
					render: function(type) {return FSH.Data.itemType[type];}
				},
				{title: 'Att', data: 'stats.attack'},
				{title: 'Def', data: 'stats.defense'},
				{title: 'Arm', data: 'stats.armor'},
				{title: 'Dam', data: 'stats.damage'},
				{title: 'HP', data: 'stats.hp'},
				{title: 'Frg', data: 'forge'},
				{title: 'Craft', data: 'craft',
					render: {
						'_': function(craft) {
							return FSH.Data.craft[craft] ? FSH.Data.craft[craft].index : 0;
						},
						'display': FSH.inventory.craftRender,
						'filter': FSH.inventory.craftRender
					}
				},
				{title: 'Du%', data: 'durability',
					render: FSH.inventory.durabilityRender},
				{title: 'BP',
					data: FSH.inventory.whereData,
					render: FSH.inventory.bpRender
				},
				{title: 'GS',
					data: FSH.inventory.whereData,
					render: FSH.inventory.gsRender
				},
				{title: 'W/U',
					data: 'type',
					render: FSH.inventory.wuRender
				},
				{title: 'setName', data: 'stats.set_name',
					orderable: false, visible: false
				},
				{title: 'Tag', data: 'guild_tag',
					render: function(tag){
						return tag === '-1' ? 'No' : 'Yes';
					}
				},
				{title: 'Drop', data: 'type',
					render: FSH.inventory.dropRender
				},
				{title: 'Send', data: 'type',
					render: FSH.inventory.sendRender
				}
			],
			createdRow: FSH.inventory.createdRow,
			stateSave: true,
			stateDuration: 0
		});
		table.column(12).visible('current_player_id' in FSH.Helper.inventory);
		table.column(17).visible('player_id' in FSH.Helper.inventory &&
			FSH.inventory.showQuickDropLinks);
		table.column(18).visible('player_id' in FSH.Helper.inventory &&
			FSH.inventory.showQuickSendLinks);
	},

	createdRow: function(row, data) { // jQuery
		var colour;
		if (data.folder_id) {
			colour = data.equipped ? 'fshGreen' : 'fshNavy';
		}
		if (data.player_id) {
			colour = data.player_id === -1 ? 'fshNavy' : 'fshMaroon';
		}
		$(row).addClass(colour);
	},

	nameRender: function(data, type, row) { // Native
		if (type !== 'display') {return data;}

		var cur = FSH.Helper.inventory.player_id ?
			FSH.Helper.inventory.player_id :
			FSH.Helper.inventory.current_player_id;

		var t = row.player_id === -1 ? 4 : 1;
		var p = FSH.Helper.inventory.player_id ?
			FSH.Helper.inventory.player_id :
			row.player_id !== -1 ? row.player_id :
			FSH.Helper.inventory.guild_id;
		var bold = row.equipped ? '<b>' + data + '</b>' : data;
		var setName = row.stats && row.stats.set_name !== '' ?
			' (<span class="fshLink setName" set="' + row.stats.set_name +
			'">set</span>)' : '';
		return '<a href="index.php?cmd=auctionhouse&search_text=' + data +
			'" class="fshInvItem tip-dynamic ' +
			FSH.Data.rarity[row.rarity].class + '" ' +
			'data-tipped="fetchitem.php?item_id=' + row.item_id +
			'&inv_id=' + row.inv_id + '&t=' + t + '&p=' + p +
			'&currentPlayerId=' + cur + '"' + '>' +
			bold + '</a>' + setName;

	},

	durabilityRender: function(data, type, row) {
		if (parseInt(row.max_durability, 10) > 0) {
			return Math.ceil(row.durability / row.max_durability * 100);
		}
	},

	craftRender: function(craft) {
		return FSH.Data.craft[craft] ? FSH.Data.craft[craft].abbr : '';
	},

	whereData: function(row) { // Native
		return row.folder_id || row.player_id;
	},

	whereRender: function(data, type, row) { // Native
		if (row.folder_id) {
			return row.equipped ? -2 : parseInt(row.folder_id, 10);
		}
		return row.player_id === -1 ? '~' :
			FSH.Helper.membrList[row.player_id].username;
	},

	whereRenderDisplay: function(data, type, row) { // Native
		if (row.player_id) {
			return row.player_id === -1 ? 'GS' :
				'<a class="fshMaroon" href="index.php?cmd=profile&player_id=' +
				row.player_id + '">' +
				FSH.Helper.membrList[row.player_id].username + '</a>';
		}
		if (row.equipped) {return 'Worn';}
		var folderSelect = '<select class="moveItem" data-inv="' + row.inv_id +
			'">';
		var keysArray = Object.keys(FSH.Helper.inventory.folders)
			.sort(function(a, b) {return a - b;});
		$.each(keysArray, function(_index, value) {
			folderSelect += '<option value="' + value + '"' +
				(value === row.folder_id ? ' selected' : '') + '>' +
				FSH.Helper.inventory.folders[value] + '</option>';
		});
		folderSelect += '</select>';
		return folderSelect;
	},

	whereRenderFilter: function(data, type, row) { // Native
		if (row.player_id) {
			return row.player_id === -1 ? 'GS' :
				FSH.Helper.membrList[row.player_id].username;
		}
		if (row.equipped) {return 'Worn';}
		return FSH.Helper.inventory.folders[row.folder_id];
	},

	bpRender: function(where, type, row) { // Native
		if (row.folder_id || row.player_id ===
			FSH.Helper.inventory.current_player_id) {return;}
		if (type !== 'display') {return 'BP';}
		if (row.player_id === -1) {
			return '<span class="fshLink takeItem" invid="' + row.inv_id +
				'" action="take">BP</span>';
		}
		return '<span class="fshLink recallItem" invid="' + row.inv_id +
			'" playerid="' + row.player_id +
			'" mode="0" action="recall">BP</span>';
	},

	gsRender: function(_data, type, row) { // Native
		if (row.player_id && row.player_id !== -1 ||
			row.folder_id && row.guild_tag !== '-1') {
			return type === 'display' ? '<span class="fshLink recallItem" invid="' +
				row.inv_id + '" playerid="' +
				(row.player_id || FSH.Helper.inventory.player_id) +
				'" mode="1" action="recall">GS</span>' : 'GS';
		}
	},

	wuRender: function(data, _type, row) { // Native
		var action = {'0': 'Wear', '1': 'Wear', '2': 'Wear', '3': 'Wear',
			'4': 'Wear', '5': 'Wear', '6': 'Wear', '7': 'Wear', '8': 'Wear',
			'10': 'Use', '11': 'Use', '15': 'Use'}[data];
		if (action === 'Wear') {
			action = FSH.inventory.wearRender(row);
		} else if (action === 'Use') {
			action = FSH.inventory.useRender(row);
		}
		return action;
	},

	wearRender: function(row) { // Native
		if (row.player_id && row.player_id === -1) {
			return '<span class="fshLink takeItem" invid="' + row.inv_id +
				'" action="wear">Wear</span>';
		} else if (row.player_id &&
			row.player_id !== FSH.Helper.inventory.current_player_id) {
			return '<span class="fshLink recallItem" invid="' + row.inv_id +
				'" playerid="' + row.player_id +
				'" mode="0" action="wear">Wear</span>';
		} else if (row.folder_id && !row.equipped ||
			row.player_id && !row.equipped &&
			row.player_id === FSH.Helper.inventory.current_player_id) {
			return '<span class="fshLink wearItem" invid="' + row.inv_id +
				'">Wear</span>';
		} else {
			return '';
		}
	},

	useRender: function(row) { // Native
		if (row.player_id && row.player_id === -1) {
			return '<span class="fshLink takeItem" invid="' + row.inv_id +
				'" action="use">Use</span>';
		} else if (row.player_id &&
			row.player_id !== FSH.Helper.inventory.current_player_id) {
			return '<span class="fshLink recallItem" invid="' + row.inv_id +
				'" playerid="' + row.player_id +
				'" mode="0" action="use">Use</span>';
		} else if (row.folder_id && !row.equipped ||
			row.player_id && !row.equipped &&
			row.player_id === FSH.Helper.inventory.current_player_id) {
			return '<span class="fshLink useItem" invid="' + row.inv_id +
				'">Use</span>';
		} else {
			return '';
		}
	},

	dropRender: function(data, type, row) { // Native
		if (row.guild_tag !== '-1' || row.equipped) {return;}
		if (type !== 'display') {return 'Drop';}
		return '<span class="dropItem tip-static dropLink" data-tipped=' +
			'"INSTANTLY DESTROY THE ITEM. NO REFUNDS OR DO-OVERS! Use at own risk."' +
			' data-inv="' + row.inv_id + '">Drop</span>';
	},

	sendRender: function(data, type, row) { // Native
		if (row.bound || row.equipped) {return;}
		if (type !== 'display') {return 'Send';}
		return '<span class="sendItem tip-static reportLink" data-tipped=' +
			'"INSTANTLY SEND THE ITEM. NO REFUNDS OR DO-OVERS! Use at own risk."' +
			' data-inv="' + row.inv_id + '">Send</span>';
	},

	typeFilter: function() { // jQuery
		$.fn.dataTable.ext.search.push(
			function(_settings, _row, _index, data) {
				return !FSH.inventory.options.checkedElements ||
					FSH.inventory.options.checkedElements[data.type] ?
					true : false;
			}
		);
	},

	setFilter: function() { // jQuery
		$.fn.dataTable.ext.search.push(
			function(_settings, _row, _index, data) {
				return !FSH.inventory.options.checkedElements ||
					!FSH.inventory.options.checkedElements['-1'] ||
					FSH.inventory.options.checkedElements['-1'] &&
					data.stats &&
					data.stats.set_id !== '-1' ?
					true : false;
			}
		);
	},

	rarityFilter: function() { // jQuery
		$.fn.dataTable.ext.search.push(
			function(_settings, _row, _index, data) {
				var rarity = (parseInt(data.rarity, 10) + 100).toString();
				return !FSH.inventory.options.checkedElements ||
					FSH.inventory.options.checkedElements[rarity] ?
					true : false;
			}
		);
	},

	lvlFilter: function() { // jQuery
		/* Custom filtering function which will search data in column 2 between two values */
		$.fn.dataTable.ext.search.push(
			function(_settings, data) {
				var min = FSH.inventory.options.fshMinLvl;
				var max = FSH.inventory.options.fshMaxLvl;
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

	eventHandlers: function() { // jQuery
		$('#fshRefresh').click(FSH.inventory.refresh);
		$('#fshMinLvl, #fshMaxLvl').keyup(FSH.inventory.changeLvls);
		$('#fshReset').click(FSH.inventory.resetLvls);
		$('table.fshInvFilter').on('click', 'input[type="checkbox"]',
			FSH.inventory.getChecks);
		$('#fshAll').click(FSH.inventory.allChecks);
		$('#fshNone').click(FSH.inventory.clearChecks);
		$('#fshDefault').click(FSH.inventory.resetChecks);
		$('#fshInv').on('click', 'span.setName', FSH.inventory.setName);
		$('#fshInv').on('click', 'span.takeItem', FSH.inventory.takeItem);
		$('#fshInv').on('click', 'span.recallItem', FSH.inventory.recallItem);
		$('#fshInv').on('click', 'span.wearItem', FSH.inventory.wearItem);
		$('#fshInv').on('click', 'span.useItem', FSH.inventory.useItem);
		$('#fshInv').on('change', 'select.moveItem', FSH.inventory.moveItem);
		$('#fshInv').on('click', 'span.dropItem', FSH.inventory.dropItem);
		$('#fshInv').on('click', 'span.sendItem', FSH.inventory.sendItem);
	},

	refresh: function() { // Native
		FSH.inventory.doSpinner();
		FSH.inventory.syncInvMan();
	},

	clearButton: function() { // jQuery
		var input = $('#fshInv_filter input');
		input.prop('type', 'text');
		var clear = $('<span>&times;</span>');
		input.wrap($('<span class="text-input-wrapper"/>'));
		input.after(clear);
		clear.click(function() {
			input.val('');
			$('#fshInv').DataTable().search('').draw();
		});
	},

	setName: function() { // jQuery
		$('#fshInv').DataTable().search($(this).attr('set')).draw();
		$('#fshInv_filter input').focus();
	},

	removeClass: function(self) {
		self.closest('tr')
			.find('.takeItem, .recallItem, .wearItem, .dropItem, .sendItem')
			.removeClass().qtip('hide');
	},

	anotherSpinner: function(self) {
		self.empty().append('<img src="' + FSH.System.imageServer +
			'/skin/loading.gif" width="11" height="11">');
	},

	wearItem: function() { // jQuery
		var self = $(this).closest('td');
		FSH.inventory.removeClass(self);
		FSH.ajax.equipItem(self.attr('invid')).done(function(data){
			if (data.r === 1) {return;}
			FSH.inventory.killRow(self);
		});
		FSH.inventory.anotherSpinner(self);
	},

	useItem: function() { // jQuery
		var self = $(this);
		FSH.inventory.removeClass(self);
		FSH.ajax.useItem(self.attr('invid')).done(function(data){
			if (data.r === 1) {return;}
			FSH.inventory.killRow(self);
		});
		FSH.inventory.anotherSpinner(self);
	},

	takeItem: function() { // jQuery
		var self = $(this);
		FSH.inventory.removeClass(self);
		FSH.ajax.queueTakeItem(self.attr('invid'), self.attr('action'))
			.done(function(data){
				if (data.r === 1) {return;}
				FSH.inventory.killRow(self);
			});
		FSH.inventory.anotherSpinner(self);
	},

	recallItem: function() { // jQuery
		var self = $(this);
		FSH.inventory.removeClass(self);
		FSH.ajax.queueRecallItem({
		// FSH.ajax.recallItem({
				invId: self.attr('invid'),
				playerId: self.attr('playerid'),
				mode: self.attr('mode'),
				action: self.attr('action')})
			.done(function(data){
				if (data.r === 1) {return;}
				FSH.inventory.killRow(self);
			});
		FSH.inventory.anotherSpinner(self);
	},

	killRow:function(self) { // jQuery
		var tr = self.closest('tr');
		var td = $('td', tr);
		td.eq(2).empty(); // Where
		td.eq(12).empty(); // BP - GS
		td.eq(13).empty(); // GS - W/U
		td.eq(14).empty(); // W/U - Tag
		td.eq(15).empty(); // Tag - Drop
		td.eq(16).empty(); // ? - Send
		tr.css('text-decoration', 'line-through');
	},

	getChecks: function() { // jQuery
		FSH.inventory.options.checkedElements = {};
		$('table.fshInvFilter input[type="checkbox"][item]:checked')
			.each(function() {
				FSH.inventory.options.checkedElements[$(this).attr('item')] = 1;
			});
		FSH.ajax.setForage('fsh_inventory', FSH.inventory.options);
		$('#fshInv').DataTable().draw(false);
	},

	setChecks: function() { // jQuery
		$('table.fshInvFilter input[type="checkbox"]').each(function() {
			var box = $(this);
			box.prop('checked',
				FSH.inventory.options.checkedElements[box.attr('item')] === 1);
		});
		FSH.ajax.setForage('fsh_inventory', FSH.inventory.options);
	},

	resetChecks: function() { // jQuery
		FSH.inventory.options.checkedElements =
			FSH.Data.defaults.inventoryCheckedElements;
		FSH.inventory.setChecks();
		$('#fshInv').DataTable().draw(false);
	},

	allChecks: function() { // jQuery
		FSH.inventory.options.checkedElements =
			FSH.Data.inventoryCheckAll;
		FSH.inventory.setChecks();
		$('#fshInv').DataTable().draw(false);
	},

	clearChecks: function() { // jQuery
		FSH.inventory.options.checkedElements =
			FSH.inventory.clearGearOnly(FSH.inventory.options.checkedElements);
		FSH.inventory.setChecks();
		$('#fshInv').DataTable().draw();
	},

	clearGearOnly: function(checkedElements) { // Native
		var newEle = {};
		Object.keys(checkedElements).forEach(function(key) {
			if (parseInt(key, 10) >= 100) {
				newEle[key] = checkedElements[key];
			}
		});
		return newEle;
	},

	setLvls: function() { // jQuery
		$('#fshMinLvl').val(FSH.inventory.options.fshMinLvl);
		$('#fshMaxLvl').val(FSH.inventory.options.fshMaxLvl);
	},

	resetLvls: function() { // jQuery
		FSH.inventory.options.fshMinLvl = FSH.Data.defaults.inventoryMinLvl;
		FSH.inventory.options.fshMaxLvl = FSH.Data.defaults.inventoryMaxLvl;
		FSH.ajax.setForage('fsh_inventory', FSH.inventory.options);
		$('#fshMinLvl').val(FSH.inventory.options.fshMinLvl);
		$('#fshMaxLvl').val(FSH.inventory.options.fshMaxLvl);
		$('#fshInv').DataTable().draw(false);
	},

	changeLvls: function() { // 
		var minLvl = parseInt($('#fshMinLvl').val(), 10);
		var maxLvl = parseInt($('#fshMaxLvl').val(), 10);
		if (isNaN(minLvl) || isNaN(maxLvl)) {return;}
		FSH.inventory.options.fshMinLvl = minLvl;
		FSH.inventory.options.fshMaxLvl = maxLvl;
		FSH.ajax.setForage('fsh_inventory', FSH.inventory.options);
		$('#fshInv').DataTable().draw(false);
	},

	moveItem: function() { // jQuery
		var self = $(this);
		FSH.ajax.moveItem([self.data('inv')], self.val());
	},

	dropItem: function() { // jQuery
		var self = $(this);
		FSH.inventory.removeClass(self);
		FSH.ajax.dropItem([self.data('inv')]).done(function(data){
			if (data.r === 1) {return;}
			FSH.inventory.killRow(self);
		});
		FSH.inventory.anotherSpinner(self);
	},

	sendItem: function() { // jQuery
		var self = $(this);
		FSH.inventory.removeClass(self);
		FSH.ajax.sendItem([self.data('inv')]).done(function(data){
			if (data.r === 1) {return;}
			FSH.inventory.killRow(self);
		});
		FSH.inventory.anotherSpinner(self);
	},

};

FSH.quickBuff = { // jQuery

	inject: function() { // jQuery
		var playerInput = $('#targetPlayers');
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
			$('#fshSus'));
		FSH.quickBuff.getEnhancement(responseText._enhancements, 'Fury Caster',
			$('#fshFur'));
		FSH.quickBuff.getBuff(responseText._skills, 'Guild Buffer',
			$('#fshGB'));
		FSH.quickBuff.getBuff(responseText._skills, 'Buff Master',
			$('#fshBM'));
		FSH.quickBuff.getBuff(responseText._skills, 'Extend', $('#fshExt'));
		FSH.quickBuff.getBuff(responseText._skills, 'Reinforce', $('#fshRI'));

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

		$('#players').on('click', 'h1', FSH.quickBuff.addBuffLevels);

		$('#buff-outer label[for^="skill-"]').each(function() {
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

		$('#players h1').first().click();

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

	updateBuffLog: function() { // Native
		if (!FSH.System.getValue('keepBuffLog')) {return;}

		var now = new Date();
		var timeStamp = FSH.System.formatDateTime(now);
		var buffLog=FSH.System.getValue('buffLog');
		var buffsAttempted = document.body.innerHTML.split('<li>');
		document.body.innerHTML+= '<span id="buff_Log" style="color:yellow"></span>';
		var buffsNotCastRE = new RegExp('The skill ([\w ]*) of current or' +
			' higher level is currently active on "(\w*)"');
		var buffsCastRE = new RegExp('Skill ([\w ]*) level (\d*) was ' +
			'activated on "(\w*)"');
		var buffList = FSH.Data.buffList;
		for (var i=0;i<buffsAttempted.length ;i+= 1 )
		{
			var buffsCast = buffsCastRE.exec(buffsAttempted[i]);
			var buffsNotCast = buffsNotCastRE.exec(buffsAttempted[i]);
			var stamina = 0;
			if (buffsCast) {

			for (var j = 0; j < buffList.length; j += 1) {
				if (buffList[j].name === buffsCast[1]) {
					stamina = buffList[j].stamina;
					break;
				}
			}
				buffLog=timeStamp+buffsCast[0] + ' (' + stamina + ' stamina) <br>'+buffLog;
			}
			if (buffsNotCast) {

				buffLog=timeStamp+'<span style="color: red;">' + buffsNotCast[0] + '</span><br>' + buffLog;
			}
		}
		FSH.System.setValue('buffLog',buffLog);

	},

	injectBuffLog: function(content) {
		if (!content) {content = FSH.Layout.notebookContent();}
		content.innerHTML=FSH.Layout.makePageTemplate('Buff Log','','clearBuffs','Clear','bufflog');
		document.getElementById('clearBuffs').addEventListener('click',
			function() {
				FSH.System.setValue('buffLog','');
				location.reload();
			}, true
		);
		document.getElementById('bufflog').innerHTML=FSH.System.getValue('buffLog');
	},

};

FSH.toprated = { // jQuery

	injectTopRated: function() { // jQuery

		FSH.ga.start('JS Perf', 'injectTopRated');

		if ($('#pCC font:contains("Last Updated")').length === 0) {return;}
		var lump = '<input id="fshFindOnlinePlayers" ' +
			'class="custombutton tip-static" type="button" ' +
			'data-tipped="Fetch the online status of the top 250 players ' +
			'(warning ... takes a few seconds)." value="Find Online Players">';
		var findBtn = $(lump);
		var theCell = $('#pCC td').first();
		theCell.wrapInner('<div style="width:190px;"/>');
		theCell.prepend($('<span/>').append(findBtn));
		findBtn.click(FSH.toprated.findOnlinePlayers);

		FSH.ga.end('JS Perf', 'injectTopRated');

	},

	findOnlinePlayers: function(e) { // jQuery

		FSH.ga.start('JS Perf', 'findOnlinePlayers');

		$(e.target).qtip('hide').parent().html('<img id="fshSpinner" src="' + 
			FSH.System.imageServer + '/world/actionLoadingSpinner.gif">');

		var guildArray = [];
		$('#pCC table[width="500"] ' +
			'a[href^="index.php?cmd=guild&subcmd=view&guild_id="]')
			.each(function() {
				var self = $(this);
				var guildId = self.attr('href').match(/guild_id=([0-9]+)/)[1];
				if (guildArray.indexOf(guildId) === -1) {guildArray.push(guildId);}
				self.parent().next().children('a').attr('guildid', guildId);
			});

		FSH.ajax.getAllMembrList(true, guildArray)
			.done(FSH.toprated.parseGuildOnline);

		FSH.ga.end('JS Perf', 'findOnlinePlayers');

	},

	parseGuildOnline: function(membrList) { // jQuery

		FSH.ga.start('JS Perf', 'parseGuildOnline');

		$('#fshSpinner').hide();

		$('#pCC table[width="500"] a[guildid]').parent().after(function() {
			var self = $(this).children('a');
			return '<td>' + FSH.Layout.onlineDot({
				last_login: membrList[self.attr('guildid')][self.text()].last_login
			}) + '</td>';
		});

		FSH.ga.end('JS Perf', 'parseGuildOnline');

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
		helperMenu.css('position', 'fixed');
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
		$('#pCR').prepend('<div id="fshAllyEnemy" class="minibox"></div>');
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
			$('#fshContactList', output)
				.append(FSH.allyEnemy.addContact(allies, true));
		}
		if (FSH.Helper.enableEnemyOnlineList) {
			$('#fshContactList', output)
				.append(FSH.allyEnemy.addContact(enemies, false));
		}
		if (FSH.Helper.hideGuildInfoTrade) {
			$('#enemy-trade', output).hide();
		}
		if (FSH.Helper.hideGuildInfoSecureTrade) {
			$('#enemy-secure-trade', output).hide();
		}
		if (FSH.Helper.hideGuildInfoBuff) {
			$('#enemy-quickbuff', output).hide();
		}
		if (FSH.Helper.hideGuildInfoMessage) {
			$('#enemy-send-message', output).hide();
		}
		if (FSH.Helper.hideBuffSelected) {
			$('a.enemy-buff-check-on', output).hide();
			$('#enemy-quick-buff', output).hide();
		}

		$('#fshAllyEnemy').empty();
		$('#fshAllyEnemy').append(output);

		$('#fshContactList').on('click',
			'a[class^="enemy-buff-check-o"]', FSH.allyEnemy.quickBuffToggle);

		$('#enemy-quick-buff').click(function(){
			var sendstring = [];
			$('#fshContactList a.enemy-buff-check-on').each(function(){
				sendstring.push($(this).data('name'));
			});
			window.openWindow('index.php?cmd=quickbuff&t=' + sendstring.join(),
				'fsQuickBuff', 618, 1000, ',scrollbars');
		});

		$('#fshResetEnemy').click(FSH.allyEnemy.resetAllyEnemyList);

	},

	addContact: function(contactList, type) { // jQuery
		var now = Math.floor(Date.now() / 1000);
		var contactColor;
		var output = '';
		contactList.forEach(function(val) {
			if (now - val.last_login > 1800) {return;} // 30 mins
			contactColor = FSH.System.contactColor(val.last_login, type);

			output += FSH.Layout.allyEnemyContact;
			output = output.replace(/@@username@@/g, val.username);
			output = output.replace(/@@contactColor@@/g, contactColor);
			output = output.replace(/@@level@@/g, val.level);
			output = output.replace(/@@last_login@@/g,
				FSH.System.formatLastActivity(val.last_login));
			output = output.replace(/@@id@@/g, val.id);
		});
		return output;
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

		FSH.ga.start('JS Perf', 'injectProfile');

		var avyImg = $('#profileLeftColumn img[oldtitle*="\'s Avatar"]');
		if (avyImg.length !== 1) {return;}
		var playername = $('#pCC h1').text();
		var playerid = FSH.System.getUrlParameter('player_id') ||
			FSH.Layout.playerId();
		if (playername === $('#statbar-character').text()) {
			// self inventory
			FSH.profile.selfProfile();
		}

		var avyExtrasDiv = document.createElement('DIV');
		avyExtrasDiv.align = 'center';
		FSH.profile.profileInjectQuickButton(avyExtrasDiv, playerid, playername);
		avyImg.parent().append(avyExtrasDiv);

		//************** yuuzhan having fun
		$('img[oldtitle="yuuzhan\'s Avatar"]')
			.attr('src','http://evolutions.yvong.com/images/tumbler.gif')
			.click(function(){alert('Winner!');});
		//**************

		FSH.profile.updateQuickBuff();
		FSH.profile.updateStatistics();
		FSH.profile.profileInjectGuildRel();
		FSH.profile.profileRenderBio(playername);
		if (FSH.System.getValue('enableBioCompressor')) {FSH.profile.compressBio();}
		FSH.Helper.buffCost = {'count':0,'buffs':{}};
		FSH.profile.bioAddEventListener(); // Must be near end - BAD!
		FSH.common.addStatTotalToMouseover();

		setTimeout(FSH.Layout.colouredDots);

		FSH.ga.end('JS Perf', 'injectProfile');

	},

	selfProfile: function() {
		FSH.profile.fastDebuff();
		FSH.profile.profileParseAllyEnemy();
		FSH.profile.injectFastWear();
		FSH.profile.profileComponents();
		FSH.profile.quickWearLink();
		FSH.profile.selectAllLink();
		FSH.profile.storeVL();
	},

	quickWearLink: function() {
		// quick wear manager link
		var node = $('#profileRightColumn a[href="index.php?cmd=profile' +
			'&subcmd=togglesection&section_id=2"]');
		if (node.length !== 1) {return;}
		node.parent().append('&nbsp;[<a href="/index.php?cmd=notepad' +
			'&blank=1&subcmd=quickwear" class="fshBlue">Quick&nbsp;Wear</a>]');
	},

	selectAllLink: function() {
		//select all link
		var node = $('#profileRightColumn a[href="index.php?cmd=profile' +
			'&subcmd=dropitems"]');
		if (node.length !== 1) {return;}
		var allSpan = $('<span class="smallLink">All</span>');
		allSpan.click(FSH.profile.profileSelectAll);
		node.parent().append(
			$('<span/>').append('[&nbsp;').append(allSpan).append('&nbsp;]&nbsp;'));
	},

	storeVL: function() {
		// store the VL of the player
		var virtualLevel = parseInt($('#stat-vl').text(), 10);
		if (FSH.System.intValue($('dt.stat-level').first().next().text()) ===
			virtualLevel) {
			FSH.System.setValue('characterVirtualLevel', ''); // ?
		} else {
			FSH.System.setValue('characterVirtualLevel', virtualLevel);
		}
	},

	updateQuickBuff: function() { // jQuery
		var qb = $('#profileRightColumn a[href*="quickbuff"]');
		if (qb.length !== 0) {
			qb.attr('href', qb.attr('href').replace(/, 500/g,', 1000'));
		}
	},

	updateStatistics: function() { // jQuery
		var charStats = $('#profileLeftColumn table').first();
			/* .attr('id', 'characterStats'); */
		var tblCells = $('td', charStats).removeAttr('width colspan')
			.has('table').has('font');
		tblCells.each(FSH.profile.removeStatTable);
	},

	removeStatTable: function(i, e) {
		var tde = $('td', e);
		/* $(e).attr('id', tde.first().attr('id')); */
		$(e).html(tde.first().html().replace(/&nbsp;/g, ' ') +
			'<div class="profile-stat-bonus">' +
			tde.last().text() + '</div>');
	},

	profileSelectAll: function() { // jQuery
		var theBackpack = $('#backpackContainer').data('backpack');
		var type = theBackpack.type;
		var myLi = $('#backpackTab_' + type + ' li').not('.hcsPaginate_hidden');
		var ele;
		if (theBackpack.options.checkboxesEnabled) {
			ele = $('input.backpackCheckbox:not(:disabled)', myLi);
		} else {
			ele = $('span.backpackItem', myLi);
		}
		ele.each(function(){
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
			FSH.Helper.currentGuildRelationship = FSH.profile.guildRelationship(aLink.text);
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

	guildRelationship: function(txt) { // Native
		var guildSelf = FSH.System.getValue('guildSelf');
		var guildFrnd = FSH.System.getValue('guildFrnd');
		var guildPast = FSH.System.getValue('guildPast');
		var guildEnmy = FSH.System.getValue('guildEnmy');
		if (!guildSelf) {
			guildSelf = '';
			FSH.System.setValue('guildSelf', guildSelf);
		}
		if (!guildFrnd) {
			guildFrnd = '';
			FSH.System.setValue('guildFrnd', guildFrnd);
		}
		if (!guildPast) {
			guildPast = '';
			FSH.System.setValue('guildPast', guildPast);
		}
		if (!guildEnmy) {
			guildEnmy = '';
			FSH.System.setValue('guildEnmy', guildEnmy);
		}
		guildSelf = guildSelf.toLowerCase().replace(/\s*,\s*/, ',').replace(/\s\s*/g, ' ').split(',');
		guildFrnd = guildFrnd.toLowerCase().replace(/\s*,\s*/, ',').replace(/\s\s*/g, ' ').split(',');
		guildPast = guildPast.toLowerCase().replace(/\s*,\s*/, ',').replace(/\s\s*/g, ' ').split(',');
		guildEnmy = guildEnmy.toLowerCase().replace(/\s*,\s*/, ',').replace(/\s\s*/g, ' ').split(',');
		txt = txt.toLowerCase().replace(/\s\s*/g, ' ');
		if (guildSelf.indexOf(txt) !== -1) {return 'self';}
		if (guildFrnd.indexOf(txt) !== -1) {return 'friendly';}
		if (guildPast.indexOf(txt) !== -1) {return 'old';}
		if (guildEnmy.indexOf(txt) !== -1) {return 'enemy';}
		return '';
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
		var alliesTitle = $('#profileLeftColumn strong:contains("Allies")')
			.parent();
		var numberOfAllies = alliesTitle.next().find('img')
			.filter('[src*="/avatars/"],[src$="/skin/player_default.jpg"]')
			.length;
		alliesTitle.append('<span class="fshBlue">&nbsp;' + numberOfAllies +
			(alliesTotal && alliesTotal >= numberOfAllies ? '/' +
			alliesTotal : '') + '</span>');

		var enemiesTotal = FSH.System.getValue('enemiestotal');
		var enemiesTitle = $('#profileLeftColumn strong:contains("Enemies")')
			.parent();
		var numberOfEnemies = enemiesTitle.next().find('img')
			.filter('[src*="/avatars/"],[src$="/skin/player_default.jpg"]')
			.length;
		enemiesTitle.append('<span class="fshBlue">&nbsp;' + numberOfEnemies +
			(enemiesTotal && enemiesTotal >= numberOfEnemies ? '/' +
			enemiesTotal : '') + '</span>');
	},

	injectFastWear: function() { // jQuery
		if (!FSH.System.getValue('enableQuickDrink')) {return;}
		$('#backpack').css('height', '500');
		var backpackContainer = $('#backpackContainer');
		var theBackpack = backpackContainer.data('backpack');
		var oldShow = theBackpack._showPage;
		theBackpack._showPage = function(type, page) {
			oldShow.call(theBackpack, type, page);
			FSH.profile.fastWearLinks();
		};
		if ($('#backpack_current').text().length !== 0) {
			FSH.profile.fastWearLinks();
		}
		backpackContainer.on('click', 'span.fastWear', FSH.profile.fastWearEquip);
		backpackContainer.on('click', 'span.fastUse',
			FSH.profile.drinkProfileInventoryItem);
	},

	fastWearLinks: function() { // jQuery
		var theBackpack = $('#backpackContainer').data('backpack');
		var backpackTab = $('#backpackTab_' + theBackpack.type);
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
	},

	fastWearEquip: function() { // jQuery
		var self = $(this);
		var invId = self.attr('itemid');
		FSH.ajax.equipItem(invId).done(function(data) {
			if (data.r !== 0) {return;}
			FSH.profile.backpackRemove(invId);
			// TODO Insert item from worn
			self.parent().html('<span class="fastWorn">Worn</span>');
		});
	},

	backpackRemove: function(invId) { // jQuery
		invId = parseInt(invId, 10);
		var theBackpack = $('#backpackContainer').data('backpack');
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
		FSH.System.xmlhttp('index.php?cmd=profile&subcmd=useitem&inventory_id=' +
			InventoryItemID, FSH.profile.drinkProfileInventoryItemReturnMessage,
			{'item': InventoryItemID, 'target': evt.target});
	},

	drinkProfileInventoryItemReturnMessage: function(responseText, callback) { // Native
		var target = callback.target;
		var info = FSH.Layout.infoBox(responseText);
		var itemCellElement = target.parentNode;
		if (info.search(/You [successfully|gained]/) !== -1) {
			FSH.profile.backpackRemove(callback.item);
			itemCellElement.innerHTML = '<span style="color:green; font-weight:bold;">Used</span>';
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

	fastDebuff: function() { // jQuery
		var profileRightColumn = $('#profileRightColumn');
		profileRightColumn.on('click',
			'a[href^="index.php?cmd=profile&subcmd=removeskill"]',
			FSH.profile.interceptDebuff);
		if (!FSH.System.getValue('disableDeactivatePrompts')) {return;}
		var buffs = $('a[href^="index.php?cmd=profile&subcmd=removeskill"]',
			profileRightColumn);
		buffs.removeAttr('onclick');
	},

	interceptDebuff: function(e) {
		e.preventDefault();
		$(e.target).qtip('hide');
		var self = $(this);
		var buffId = self.attr('href').match(/(\d+)$/)[1];
		FSH.ajax.debuff(buffId)
			.done(function(data) {
				if (data.response.response === 0) {
					self.closest('td').empty();
				} else {
					$('#dialog_msg').html(data.response.msg).dialog('open');
				}
			});
	},

};

FSH.logs = { // Legacy

	guildChat: function() { // Native

		FSH.ga.start('JS Perf', 'guildChat');

		FSH.logs.addChatTextArea();
		FSH.logs.addLogColoring('Chat', 0);

		FSH.ga.end('JS Perf', 'guildChat');

	},

	guildLog: function() { // Native

		FSH.ga.start('JS Perf', 'guildLog');

		FSH.logs.addLogColoring('GuildLog', 1);
		FSH.logs.addGuildLogWidgets();

		FSH.ga.end('JS Perf', 'guildLog');

	},

	outbox: function() { // Native

		FSH.ga.start('JS Perf', 'outbox');

		FSH.logs.addLogColoring('OutBox', 1);

		FSH.ga.end('JS Perf', 'outbox');

	},

	playerLog: function() { // Native

		FSH.ga.start('JS Perf', 'playerLog');

		FSH.logs.addLogColoring('PlayerLog', 1);
		FSH.logs.addLogWidgets();

		FSH.ga.end('JS Perf', 'playerLog');

	},

	addLogColoring: function(logScreen, dateColumn) { // Legacy

		var jChatTable = $('#pCC td.header').eq(0).closest('table');
		jChatTable.css({tableLayout: 'fixed', wordWrap: 'break-word'});
		if (logScreen === 'Chat') {
			jChatTable.find('tr').eq(0)
				.after('<tr style="height: 2px"><td></td></tr>');
		}


		if (!FSH.System.getValue('enableLogColoring')) {return;}
		var lastCheckScreen = 'last' + logScreen + 'Check';
		var localLastCheckMilli = FSH.System.getValue(lastCheckScreen);
		if (!localLastCheckMilli) {
			localLastCheckMilli = Date.now();
		}
		var chatTable = FSH.System.findNode('//table[@class="width_full"]'); // Guild Log
		if (!chatTable) {
			chatTable = FSH.System.findNode('//table[tbody/tr/td[.="Message"]]'); // Outbox & Guild Chat
		}
		if (!chatTable) {
			chatTable = FSH.System.findNode('//table[tbody/tr/td/span[' +
				'contains(.,"Currently showing:")]]'); //personal log
		}
		if (!chatTable) {return;}

		var localDateMilli = Date.now();
		var gmtOffsetMinutes = (new Date()).getTimezoneOffset();
		var gmtOffsetMilli = gmtOffsetMinutes * 60 * 1000;
		for (var i = logScreen === 'Chat' ? 2 : 1; i < chatTable.rows.length; i += logScreen === 'Chat' ? 4 : 2) {
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
		$('#pCC form').first().attr('id', 'dochat');
		$('#pCC input').slice(0, 7).each(function() {
			$(this).attr('form', 'dochat');
		});
		var theTable = $('#pCC table table').first();
		theTable.append('<tr id="fshMass"></tr>');
		$('td', theTable).eq(0).remove();
		var btnMass = $('input[value="Send As Mass"]', theTable);
		if (btnMass.length === 1 ) {
			btnMass.appendTo('#fshMass', theTable);
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

		var messageHeader = logTable.rows[0].cells[2];
		if (messageHeader) {
			messageHeader.innerHTML +='&nbsp;&nbsp;<span style="' +
				'color:white;">(Guild mates show up in <span style="' +
				'color:green;">green</span>)</span>';
		}

		for (i=1;i<logTable.rows.length;i += 2) {
			var aRow = logTable.rows[i];
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
				var defeat = /You were defeated by/.exec(aRow.cells[2].innerHTML);
				var combatSummarySpan = document.createElement('SPAN');
				combatSummarySpan.style.color = 'gray';
				aRow.cells[2].appendChild(combatSummarySpan);
				FSH.System.xmlhttp('index.php?cmd=combat&subcmd=view&combat_id=' +
					combatID, FSH.logs.retrievePvPCombatSummary,
					{
						'target': combatSummarySpan,
						winner  : defeat ? 0 : 1
					});
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
		var winner = callback.winner;
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

	if (!FSH.System.getValue('hideNonPlayerGuildLogMessages')) {return;}
		var playerId = FSH.Layout.playerId();
		var logTable = FSH.System.findNode('//table[tbody/tr/td[.="Message"]]');

		var messageNameCell = logTable.rows[0].firstChild.nextSibling.nextSibling
			.nextSibling;
		if (messageNameCell) {
			messageNameCell.innerHTML += '&nbsp;&nbsp;<font style="' +
				'color:white;">(Guild Log messages not involving ' +
				'self are dimmed!)</font>';
		}

		for (var i=1;i<logTable.rows.length;i += 2) {
			var aRow = logTable.rows[i];
			var firstPlayerID = 0;
			var secondPlayerID = 0;
			if (!aRow.cells[0].innerHTML) {continue;}

			var messageHTML = aRow.cells[2].innerHTML;
			var doublerPlayerMessageRE =
				/member\s<a\shref="index.php\?cmd=profile\&amp;player_id=(\d+)/;
			var secondPlayer = doublerPlayerMessageRE.exec(messageHTML);
			var singlePlayerMessageRE =
				/<a\shref="index.php\?cmd=profile\&amp;player_id=(\d+)/;
			var firstPlayer = singlePlayerMessageRE.exec(messageHTML);
			if (secondPlayer) {
				firstPlayerID = firstPlayer[1]*1;
				secondPlayerID = secondPlayer[1]*1;
			}
			if (firstPlayer && !secondPlayer) {
				firstPlayerID = firstPlayer[1]*1;
			}
			if (firstPlayer && firstPlayerID !== playerId &&
				secondPlayerID !== playerId) {
				$(aRow).find('td').removeClass('row').css('font-size', 'xx-small');
				aRow.style.color = 'gray';
			}

			var hasInvited = aRow.cells[2].textContent
				.search('has invited the player') !== -1;

			if (aRow.cells[2].textContent.charAt(0) === '\'' || hasInvited) {
				var message = aRow.cells[2].innerHTML;
				var firstQuote = message.indexOf('\'');
				var firstPart = '';
				firstPart = message.substring(0,firstQuote);
				var secondQuote = message.indexOf('\'', firstQuote + 1);
				var targetPlayerName = message.substring(firstQuote + 1, secondQuote);
				aRow.cells[2].innerHTML = firstPart + '\'' +
					'<a href="index.php?cmd=findplayer&search_active=1&' +
					'search_level_max=&search_level_min=&search_username=' +
					targetPlayerName + '&search_show_first=1">' + targetPlayerName +
					'</a>' + message.substring(secondQuote, message.length);
				if (!hasInvited &&
					targetPlayerName !== $('#statbar-character').text()) {
					$(aRow).find('td').removeClass('row').css('font-size', 'xx-small');
					aRow.style.color = 'gray';
				}
			}

		}
	},

};

FSH.lists = { // Native

	injectAuctionSearch: function(content) { // Native

		FSH.ga.start('JS Perf', 'injectAuctionSearch');

		if (!content) {content = FSH.Layout.notebookContent();}
		content.innerHTML =
			FSH.Layout.makePageHeader('Trade Hub Quick Search', '', '', '') +
			'<div class=content>This screen allows you to set up some quick ' +
				'search templates for the Auction House. The Display on AH column ' +
				'indicates if the quick search will show on the short list on the ' +
				'Auction House main screen. A maximum of 36 items can show on this ' +
				'list (It will not show more than 36 even if you have more than 36 ' +
				'flagged). To edit items, either use the large text area below, or ' +
				'add a new entry and delete the old one. You can always reset the ' +
				'list to the default values.</div>'+
			'<div style="font-size:small;" id="Helper:Auction Search Output">' +
			'</div>';
		// global parameters for the meta function generateManageTable
		FSH.Helper.param = {};
		FSH.Helper.param = {
			'id':'Helper:Auction Search Output',
			'headers': ['Category', 'Nickname', 'Quick Search Text',
				'Display in AH?'],
			'fields': ['category', 'nickname', 'searchname', 'displayOnAH'],
			'tags': ['textbox', 'textbox', 'textbox', 'checkbox'],
			'url': ['', '',
				'index.php?cmd=auctionhouse&type=-1&search_text=@replaceme@', ''],
			'currentItems': FSH.System.getValueJSON('quickSearchList'),
			'gmname': 'quickSearchList',
			'sortField': 'category',
			'categoryField': 'category',
			'showRawEditor': true
		};
		FSH.lists.generateManageTable();

		FSH.ga.end('JS Perf', 'injectAuctionSearch');

	},

	injectQuickLinkManager: function(content) { // Native

		FSH.ga.start('JS Perf', 'injectQuickLinkManager');

		if (!content) {content = FSH.Layout.notebookContent();}
		content.innerHTML =
			FSH.Layout.makePageTemplate('Quick Links', '', '', '', 'quickLinkAreaId');

		// global parameters for the meta function generateManageTable
		FSH.Helper.param = {};
		FSH.Helper.param = {
			'id': 'quickLinkAreaId',
			'headers': ['Name', 'URL',
				'New [<span style="cursor:pointer; text-decoration:underline;" ' +
				'title="Open page in a new window">?</span>]'],
			'fields': ['name', 'url', 'newWindow'],
			'tags': ['textbox', 'textbox', 'checkbox'],
			'currentItems': FSH.System.getValueJSON('quickLinks'),
			'gmname': 'quickLinks',
			'showRawEditor': true
		};
		FSH.lists.generateManageTable();

		FSH.ga.end('JS Perf', 'injectQuickLinkManager');

	},

	generateManageTable: function() { // Native - Ugly but fast
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
		var recipe = $('#pCC table table b').first();
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
			'<tr><td colspan=6 align="center"><span id="invet_Result_label">' +
			'</span><ol id="invent_Result"></ol></td></tr>';
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
		$('#pCC input[name="removeIndex[]"]', doc).each(function(){
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
		FSH.Helper.context = content ? $(content) : $('#pCC');
		FSH.onlinePlayers.injectOnlinePlayersNew();
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
			order: [3, 'desc'],
			stateSave: true,
			stateDuration: 0
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
		$('#fshOutput', FSH.Helper.context).html( // context
			'<div align=right>' +
			'Min lvl:<input value="' + FSH.System.getValue('onlinePlayerMinLvl') +
				'" size=5 id="fshMinLvl" /> ' +
			'Max lvl:<input value="' + FSH.System.getValue('onlinePlayerMaxLvl') +
				'" size=5 id="fshMaxLvl" /> ' +
			'<input id="fshReset" type="button" value="Reset"/>' +
			'</div><table id="fshInv" class="allow stripe hover"></table>');
	},

	doOnlinePlayerEventHandlers: function(table) { // jQuery
		$('#fshRefresh', FSH.Helper.context).click(function() {
			$('#fshRefresh', FSH.Helper.context).hide();
			FSH.Helper.onlinePages = 0;
			FSH.Helper.onlinePlayers = {};
			$.get('index.php?cmd=onlineplayers&page=1',
				FSH.onlinePlayers.getOnlinePlayers);
			FSH.System.setValue('lastOnlineCheck', Date.now());
			$('#fshOutput', FSH.Helper.context)
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
		$('#fshOutput', FSH.Helper.context).append(' ' +
			(FSH.Helper.onlinePages + 1)); // context
		var doc = FSH.System.createDocument(data);
		var input = $('#pCC input.custominput', doc).first();
		var thePage = input.attr('value');
		var theRows = $('#pCC img[src$="/skin/icon_action_view.gif',
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

	injectStoreItems: function() { // Native
		FSH.dropItems.injectDropItems();
	},

	injectDropItems: function() { // Legacy

		FSH.ga.start('JS Perf', 'injectDropItems');

		FSH.ajax.getInventory().done(FSH.dropItems.inventory);

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

		FSH.ga.end('JS Perf', 'injectDropItems');

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
		var itemRecipient = FSH.System.getValue('itemRecipient');
		var sendItemHref = FSH.System.server +
			'index.php?cmd=trade&subcmd=senditems&xc=' + window.ajaxXC +
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

	inventory: function(data) { // jQuery

		FSH.ga.start('JS Perf', 'dropItems.inventory');

		var quickDrops = $('#pCC span[findme="QuickDrop"]');
		var quickSends = $('#pCC span[findme="QuickSend"]');
		var textTd = $('#pCC input[type="checkbox"]')
			.filter('[name="removeIndex[]"],[name="storeIndex[]"]')
			.parent().next().next();
		var invItems = data.items.reduce(function(prev, curr) {
			prev[curr.inv_id] = curr;
			return prev;
		}, {});
		quickDrops.addClass(function() {
			var item = invItems[$(this).attr('iteminvid')];
			if (item.guild_tag !== '-1') {return 'fshHide';}
		});
		textTd.append(function() {
			var item = invItems[$(this).prev().prev().find('input').val()];
			if (item.guild_tag !== '-1') {
				return '<span id="guildLocked" class="fshHide"/>';
			}
		});
		quickSends.addClass(function() {
			var item = invItems[$(this).attr('iteminvid')];
			if (item.bound) {return 'fshHide';}
		});
		if (FSH.Helper.disableItemColoring) {return;}
		textTd.addClass(function() {
			var item = invItems[$(this).prev().prev().find('input').val()];
			return FSH.Data.rarity[item.rarity].class;
		});

		FSH.ga.end('JS Perf', 'dropItems.inventory');

	},

	injectMoveItems: function() { // Bad jQuery

		FSH.ga.start('JS Perf', 'injectMoveItems');

		var foldersEnabled = $('img[src$="/folder_on.gif"]');
		if (foldersEnabled.length !== 1) {return;}
		var otherFolders = $('#pCC a').has('img[src$="/folder.gif"]');
		if (otherFolders.length === 0) {return;}
		var select = $('<select name=folder id=selectFolderId class=' +
			'customselect></select>');
		otherFolders.each(function() {
			var self = $(this);
			select.append('<option value=' + self.attr('href')
			.match(/&folder_id=(-*\d+)/i)[1] + '>' +
			self.parent().text() + '</option>');
		});
		$('#pCC tr').has(otherFolders[0]).first().after($('<tr/>')
			.append($('<td class="fshCenter">Move selected items to: </td>')
				.append(select)
				.append('&nbsp;<input type="button" class="custombutton"' +
					' id="fshMove" value="Move">')));
		$('#fshMove').click(FSH.dropItems.moveItemsToFolder);

		FSH.ga.end('JS Perf', 'injectMoveItems');

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
		var hideQuests = [];
		if (FSH.System.getValue('hideQuests')) {
			hideQuests = FSH.System.getValue('hideQuestNames').split(',');
		}
		for (var i = 1; i < questTable.rows.length; i += 1) {
			var aRow = questTable.rows[i];
			if (aRow.cells[0].innerHTML) {
				var questName =
					aRow.cells[0].firstChild.innerHTML.replace(/  /g,' ').trim();
				if (hideQuests.indexOf(questName) >= 0) {
					aRow.parentNode.removeChild(aRow.nextSibling);
					aRow.parentNode.removeChild(aRow.nextSibling);
					aRow.parentNode.removeChild(aRow);
				}
				var questID = /quest_id=(\d+)/.exec(aRow.cells[4].innerHTML)[1];
				aRow.cells[4].innerHTML = '<a href="http://guide.fallensword.com/' +
					'index.php?cmd=quests&amp;subcmd=view&amp;quest_id=' + questID +
					'&amp;search_name=&amp;search_level_min=&amp;search_level_max=' +
					'&amp;sort_by=" target="_blank">' +
					'<img border=0 style="float:left;" title="Search quest in Ultimate' +
					' FSG" src="' + FSH.System.imageServer + '/temple/1.gif"/></a>';
				aRow.cells[4].innerHTML += '&nbsp;<a href="http://wiki.fallensword' +
					'.com/index.php?title=' + questName.replace(/ /g,'_') +
					'" target="_blank"><img border=0 style="float:left;" title="' +
					'Search for this quest on the Wiki" src="' +
					FSH.System.imageServer + '/skin/fs_wiki.gif"/></a>';
			}
		}
	},

	injectQuestTracker: function() { // Legacy
		var injectHere = FSH.System.findNode('//td[font/b[.="Quest Details"]]');
		var questId = document.location.search.match(/quest_id=(\d+)/)[1];
		injectHere.innerHTML += '&nbsp;<a target="_blank" href="http://guide.' +
			'fallensword.com/index.php?cmd=quests&subcmd=view&quest_id=' + questId +
			'"><img border=0 title="Search quest in Ultimate FSG" src="' +
			FSH.System.imageServer + '/temple/1.gif"/></a>';
		
		var questName = FSH.System.findNode('//font[@size="2" and contains(.,"\'")]', injectHere);
		if (questName) {
			questName = questName.innerHTML;
			questName = questName.match(/"(.*)"/);
			if (questName && questName.length > 1) {
				questName = questName[1];
				injectHere.innerHTML += '&nbsp;<a href="http://wiki.fallensword.com' +
					'/index.php?title=' + questName.replace(/ /g,'_') +
					'" target="_blank"><img border=0 title="Search for this quest on ' +
					'the Fallensword Wiki" src=' + FSH.System.imageServer +
					'/skin/fs_wiki.gif /></a>';
			}
		}

	},

	showAllQuestSteps: function() { // Native
		if (!FSH.System.getValue('showNextQuestSteps')) {return;}
		Array.prototype.forEach.call(document.querySelectorAll('div[id^="stage"]'),
			function(e) {e.style.display = 'block';});
		document.getElementById('next_stage_button').style.display = 'none';
	},

};

FSH.settingsPage = { // Legacy

	mySimpleCheckboxes: {
		moveGuildList: {
			id: 'moveGuildList',
			helpTitle: 'Move Guild Info List',
			helpText: 'This will Move the Guild Info List higher ' +
				'on the bar on the right'
		},
		moveOnlineAlliesList: {
			id: 'moveOnlineAlliesList',
			helpTitle: 'Move Online Allies List',
			helpText: 'This will Move the Online Allies List higher ' +
				'on the bar on the right'
		},
		enableOnlineAlliesWidgets: {
			id: 'enableOnlineAlliesWidgets',
			helpTitle: 'Enable Online Allies Widgets',
			helpText: 'Enabling this option will enable the Allies List ' +
				'Widgets (coloring on the Allies List panel)'
		},
		moveFSBox: {
			id: 'moveFSBox',
			helpTitle: 'Move FS box',
			helpText: 'This will move the FS box to the left, under the menu, ' +
				'for better visibility (unless it is already hidden.)'
		},
		gameHelpLink: {
			id: 'gameHelpLink',
			helpTitle: '&quot;Game Help&quot; Settings Link',
			helpText: 'This turns the Game Help text in the lower ' +
				'right box into a link to this settings page.'
		},
		enableTempleAlert: {
			id: 'enableTempleAlert',
			helpTitle: 'Enable Temple Alert',
			helpText: 'Puts an alert on the LHS if you have not ' +
				'prayed at the temple today.',
			network: true
		},
		enableUpgradeAlert: {
			id: 'enableUpgradeAlert',
			helpTitle: 'Enable Gold Upgrade Alert',
			helpText: 'Puts an alert on the LHS if you have not upgraded your ' +
				'stamina with gold today.',
			network: true
		},
		enableComposingAlert: {
			id: 'enableComposingAlert',
			helpTitle: 'Enable Composing Alert',
			helpText: 'Puts an alert on the LHS if you have composing ' +
				'slots available.',
			network: true
		},
		enhanceOnlineDots: {
			id: 'enhanceOnlineDots',
			helpTitle: 'Enhance Online Dots',
			helpText: 'Enhances the green/grey dots by player names to show ' +
				'online/offline status.'
		},
		hideBuffSelected: {
			id: 'hideBuffSelected',
			helpTitle: 'Hide Buff Selected',
			helpText: 'Hides the buff selected functionality in the online allies ' +
				'and guild info section.'
		},
		hideHelperMenu: {
			id: 'hideHelperMenu',
			helpTitle: 'Hide Helper Menu',
			helpText: 'Hides the helper menu from top left.'
		},
		keepHelperMenuOnScreen: {
			id: 'keepHelperMenuOnScreen',
			helpTitle: 'Keep Helper Menu On Screen',
			helpText: 'Keeps helper menu on screen as you scroll (helper ' +
				'menu must be enabled to work). Also works with quick links.'
		},
		showAdmin: {
			id: 'showAdmin',
			helpTitle: 'Show rank controls',
			helpText: 'Show ranking controls for guild managemenet in member ' +
				'profile page - this works for guild founders only'
		},
		ajaxifyRankControls: {
			id: 'ajaxifyRankControls',
			helpTitle: 'AJAXify rank controls',
			helpText: 'Enables guild founders with ranking rights to change rank ' +
				'positions without a screen refresh.'
		},
		detailedConflictInfo: {
			id: 'detailedConflictInfo',
			helpTitle: 'Show Conflict Details',
			helpText: 'Inserts detailed conflict information onto your guild\'s ' +
				'manage page. Currently displays the target guild as well as ' +
				'the current score.',
			network: true
		},
		showCombatLog: {
			id: 'showCombatLog',
			helpTitle: 'Show Combat Log',
			helpText: 'This will show the combat log for each automatic ' +
				'battle below the monster list.'
		},
		enableCreatureColoring: {
			id: 'enableCreatureColoring',
			helpTitle: 'Color Special Creatures',
			helpText: 'Creatures will be colored according to their rarity. ' +
				'Champions will be colored green, Elites yellow and Super Elites red.'
		},
		showCreatureInfo: {
			id: 'showCreatureInfo',
			helpTitle: 'Show Creature Info',
			helpText: 'This will show the information from the view creature ' +
				'link when you mouseover the link.',
			network: true
		},
		fsboxlog: {
			id: 'fsboxlog',
			helpTitle: 'Enable FS Box Log',
			helpText: 'This enables the functionality to keep a log of ' +
				'recent seen FS Box message.'
		},
		keepBuffLog: {
			id: 'keepBuffLog',
			helpTitle: 'Enable Buff Log',
			helpText: 'This enables the functionality to keep a log of ' +
				'recently casted buffs'
		},
		huntingMode: {
			id: 'huntingMode',
			helpTitle: 'Enable Hunting Mode',
			helpText: 'This disable menu and some visual features to ' +
				'speed up the FSH.Helper.'
		},
		hideNonPlayerGuildLogMessages: {
			id: 'hideNonPlayerGuildLogMessages',
			helpTitle: 'Cleanup Guild Log',
			helpText: 'Any log messages not related to the current player ' +
				'will be dimmed (e.g. recall messages from guild store)'
		},
		useNewGuildLog: {
			id: 'useNewGuildLog',
			helpTitle: 'Use New Guild Log',
			helpText: 'This will replace the standard guild log with the ' +
				'helper version of the guild log.'
		},
		enableLogColoring: {
			id: 'enableLogColoring',
			helpTitle: 'Enable Log Coloring',
			helpText: 'Three logs will be colored if this is enabled, ' +
				'Guild Chat, Guild Log and Player Log. It will show any new ' +
				'messages in yellow and anything 20 minutes old ones in brown.'
		},
		enableChatParsing: {
			id: 'enableChatParsing',
			helpTitle: 'Enable Chat Parsing',
			helpText: 'If this is checked, your character log will be parsed for ' +
				'chat messages and show the chat message on the screen if you reply ' +
				'to that message.'
		},
		addAttackLinkToLog: {
			id: 'addAttackLinkToLog',
			helpTitle: 'Add attack link to log',
			helpText: 'If checked, this will add an Attack link to each message ' +
				'in your log.'
		},
		enhanceChatTextEntry: {
			id: 'enhanceChatTextEntry',
			helpTitle: 'Enhance Chat Text Entry',
			helpText: 'If checked, this will enhance the entry field for entering ' +
				'chat text on the guild chat page.'
		},
		disableItemColoring: {
			id: 'disableItemColoring',
			helpTitle: 'Disable Item Coloring',
			helpText: 'Disable the code that colors the item text based on the ' +
				'rarity of the item.'
		},
		showQuickDropLinks: {
			id: 'showQuickDropLinks',
			helpTitle: 'Show Quick Drop Item',
			helpText: 'This will show a link beside each item which gives the ' +
				'option to drop the item.  WARNING: NO REFUNDS ON ERROR'
		},
		storeLastQuestPage: {
			id: 'storeLastQuestPage',
			helpTitle: 'Store Last Quest Page',
			helpText: 'This will store the page and sort order of each of the ' +
				'three quest selection pages for next time you visit. If you need ' +
				'to reset the links, turn this option off, click on the link you ' +
				'wish to reset and then turn this option back on again.'
		},
		showNextQuestSteps: {
			id: 'showNextQuestSteps',
			helpTitle: 'Show Quick Drop Item',
			helpText: 'Shows all quest steps in the UFSG.'
		},
		renderSelfBio: {
			id: 'renderSelfBio',
			helpTitle: 'Render self bio',
			helpText: 'This determines if your own bio will render the FSH ' +
				'special bio tags.'
		},
		renderOtherBios: {
			id: 'renderOtherBios',
			helpTitle: 'Render other players&#39; bios',
			helpText: 'This determines if other players bios will render the FSH ' +
				'special bio tags.'
		},
		showStatBonusTotal: {
			id: 'showStatBonusTotal',
			helpTitle: 'Show Stat Bonus Total',
			helpText: 'This will show a total of the item stats when you ' +
				'mouseover an item on the profile screen.'
		},
		enableQuickDrink: {
			id: 'enableQuickDrink',
			helpTitle: 'Enable Quick Drink/Wear',
			helpText: 'This enables the quick drink/wear functionality on the ' +
				'profile page.'
		},
		disableDeactivatePrompts: {
			id: 'disableDeactivatePrompts',
			helpTitle: 'Disable Deactivate Prompts',
			helpText: 'This disables the prompts for deactivating buffs on ' +
				'the profile page.'
		},
		enableAttackHelper: {
			id: 'enableAttackHelper',
			helpTitle: 'Show Attack Helper',
			helpText: 'This will show extra information on the attack player ' +
				'screen about stats and buffs on you and your target',
			network: true
		},
		showPvPSummaryInLog: {
			id: 'showPvPSummaryInLog',
			helpTitle: 'Show PvP Summary in Log',
			helpText: 'This will show a summary of the PvP results in the log.',
			network: true
		},
		autoFillMinBidPrice: {
			id: 'autoFillMinBidPrice',
			helpTitle: 'Auto Fill Min Bid Price',
			helpText: 'This enables the functionality to automatically fill in ' +
				'the min bid price so you just have to hit bid and your bid will ' +
				'be placed.'
		},
		hideRelicOffline: {
			id: 'hideRelicOffline',
			helpTitle: 'Hide Relic Offline',
			helpText: 'This hides the relic offline defenders checker.'
		},
		enterForSendMessage: {
			id: 'enterForSendMessage',
			helpTitle: 'Enter Sends Message',
			helpText: 'If enabled, will send a message from the Send Message ' +
				'screen if you press enter. You can still insert a new line by ' +
				'holding down shift when you press enter.'
		},
		navigateToLogAfterMsg: {
			id: 'navigateToLogAfterMsg',
			helpTitle: 'Navigate After Message Sent',
			helpText: 'If enabled, will navigate to the referring page after a ' +
				'successful message is sent. Example:  if you are on the world ' +
				'screen and hit message on the guild info panel after you send the ' +
				'message, it will return you to the world screen.'
		},
		moveComposingButtons: {
			id: 'moveComposingButtons',
			helpTitle: 'Move Composing Buttons',
			helpText: 'If enabled, will move composing buttons to the top of ' +
				'the composing screen.'
		},
	},

	helpLink: function(title, text) {
		return '&nbsp;[&nbsp;<span class="fshLink tip-static" data-tipped="' +
			'<span class=\'fshHelpTitle\'>' + title + '</span><br><br>' +
			text + '">?</span>&nbsp;]';
	},

	simpleCheckbox: function(o) {
		return '<tr><td align="right">' +
			(o.network ? FSH.Layout.networkIcon : '') +
			'<label for="' + o.id + '">' + o.helpTitle +
			FSH.settingsPage.helpLink(o.helpTitle, o.helpText) +
			':<label></td><td><input id="' + o.id +
			'" name="' + o.id + '" type="checkbox" value="on"' +
			(FSH.System.getValue(o.id) ? ' checked' : '') + '></td></tr>';

	},

	injectSettings: function() { // Legacy

		FSH.ga.start('JS Perf', 'injectSettings');

		var tickAll = $('<span class="fshLink">Tick all buffs</span>');
		tickAll.click(FSH.settingsPage.toggleTickAllBuffs);
		$('#settingsTabs-4 td').eq(0).append('<br>').append(tickAll);

		var buffs                  = FSH.System.getValue('huntingBuffs');
		var buffsName              = FSH.System.getValue('huntingBuffsName');
		var buffs2                 = FSH.System.getValue('huntingBuffs2');
		var buffs2Name             = FSH.System.getValue('huntingBuffs2Name');
		var buffs3                 = FSH.System.getValue('huntingBuffs3');
		var buffs3Name             = FSH.System.getValue('huntingBuffs3Name');
		var doNotKillList          = FSH.System.getValue('doNotKillList');
		// var hideArenaPrizes        = FSH.System.getValue('hideArenaPrizes');

		var enableActiveBountyList = FSH.System.getValue('enableActiveBountyList');
		var bountyListRefreshTime  = FSH.System.getValue('bountyListRefreshTime');
		var enableWantedList       = FSH.System.getValue('enableWantedList');
		var wantedNames            = FSH.System.getValue('wantedNames');
		var combatEvaluatorBias    = FSH.System.getValue('combatEvaluatorBias');
		var enabledHuntingMode     = FSH.System.getValue('enabledHuntingMode');
		var storage = (JSON.stringify(localStorage).length /
			(5 * 1024 * 1024) * 100).toFixed(2);

		var simpleCheckbox = FSH.settingsPage.simpleCheckbox;
		var mySimpleCheckboxes = FSH.settingsPage.mySimpleCheckboxes;

		var configData =
			'<form><table id="fshSettingsTable">' +
			'<thead><th colspan="2"><b>Fallen Sword Helper configuration ' +
				'Settings</b></th></thead>' +
			'<tr><td align=center><input id="fshClearStorage" type="button" ' +
				'class="awesome magenta tip-static" value="Clear Storage" ' +
				'data-tipped="<span class=\'fshHelpTitle\'>Clear Storage' +
				'</span><br><br>This will clear all localStorage related to ' +
				'fallensword.com<br>It will reset all your Helper settings to ' +
				'defaults<br>Use it if your storage has overflowed or become ' +
				'corrupt"></td><td align=center>' +
				'<span style="font-size:x-small">(Current version: ' +
				FSH.version + ') (Storage Used: ' + storage + '% Remaining: ' +
				(100 - storage) + '%)</span></td></tr>' +
			'<tr><td colspan="2" align=center>' +
				'<span style="font-weight:bold;">Visit the ' +
				'<a href="https://github.com/fallenswordhelper/fallenswordhelper">' +
				'Fallen Sword Helper web site</a> ' +
				'for any suggestions, requests or bug reports</span></td></tr>' +
			//General Prefs
			'<tr><th colspan="2" align="left"><b>General preferences ' +
				'(apply to most screens)</b></th></tr>' +

			'<tr><td align="right">' +
				'<label for="enableGuildInfoWidgets">' +
				'Enable Guild Info Widgets' +
				FSH.settingsPage.helpLink('Enable Guild Info Widgets',
				'Enabling this option will enable the Guild Info Widgets ' +
				'(coloring on the Guild Info panel)') + ':</label></td><td>' +
				'<input id="enableGuildInfoWidgets" name="enableGuildInfoWidgets" ' +
				'type="checkbox" value="on"' +
				(FSH.System.getValue('enableGuildInfoWidgets') ? ' checked' : '') +
				'>&nbsp;' +
				'<label>Hide Message&gt;<input name="hideGuildInfoMessage" ' +
				'type="checkbox" value="on"' +
				(FSH.System.getValue('hideGuildInfoMessage') ? ' checked' : '') +
				'></label>&nbsp;' +
				'<label>Hide Buff&gt;<input name="hideGuildInfoBuff" ' +
				'type="checkbox" value="on"' +
				(FSH.System.getValue('hideGuildInfoBuff') ? ' checked' : '') +
				'></label>&nbsp;' +
				'<label>Hide ST&gt;<input name="hideGuildInfoSecureTrade" ' +
				'type="checkbox" value="on"' +
				(FSH.System.getValue('hideGuildInfoSecureTrade') ? ' checked' : '') +
				'></label>&nbsp;' +
				'<label>Hide Trade&gt;<input name="hideGuildInfoTrade" ' +
				'type="checkbox" value="on"' +
				(FSH.System.getValue('hideGuildInfoTrade') ? ' checked' : '') +
				'></label></td></tr>' +

			simpleCheckbox(mySimpleCheckboxes.moveGuildList) +
			simpleCheckbox(mySimpleCheckboxes.moveOnlineAlliesList) +

			'<tr><td align="right">' + FSH.Layout.networkIcon +
				'Show Online Allies/Enemies' +
				FSH.settingsPage.helpLink('Show Online Allies/Enemies',
				'This will show the allies/enemies online list on the right.') +
				':</td><td><label>Allies&nbsp;<input name="enableAllyOnlineList" ' +
				'type="checkbox" value="on"' +
				(FSH.System.getValue('enableAllyOnlineList') ? ' checked' : '') +
				'></label>&nbsp;&nbsp;<label>Enemies&nbsp;' +
				'<input name="enableEnemyOnlineList" type="checkbox" value="on"' +
				(FSH.System.getValue('enableEnemyOnlineList') ? ' checked' : '') +
				'></label>&nbsp;&nbsp;' +
				'<input name="allyEnemyOnlineRefreshTime" size="3" value="' +
				FSH.System.getValue('allyEnemyOnlineRefreshTime') +
				'"> seconds refresh</td></tr>' +

			simpleCheckbox(mySimpleCheckboxes.enableOnlineAlliesWidgets) +
			simpleCheckbox(mySimpleCheckboxes.moveFSBox) +
			simpleCheckbox(mySimpleCheckboxes.fsboxlog) +
			simpleCheckbox(mySimpleCheckboxes.gameHelpLink) +
			simpleCheckbox(mySimpleCheckboxes.enableTempleAlert) +
			simpleCheckbox(mySimpleCheckboxes.enableUpgradeAlert) +
			simpleCheckbox(mySimpleCheckboxes.enableComposingAlert) +
			simpleCheckbox(mySimpleCheckboxes.enhanceOnlineDots) +
			simpleCheckbox(mySimpleCheckboxes.hideBuffSelected) +
			simpleCheckbox(mySimpleCheckboxes.hideHelperMenu) +
			simpleCheckbox(mySimpleCheckboxes.keepHelperMenuOnScreen) +

			'<tr><td align="right">Quick Links Screen Location' +
				FSH.settingsPage.helpLink('Quick Links Screen Location',
				'Determines where the quick links dialog shows on the screen. ' +
				'Default is top 22, left 0.') +
				':</td><td>Top: <input name="quickLinksTopPx" size="3" value="'+
				FSH.System.getValue('quickLinksTopPx') +
				'"> Left: <input name="quickLinksLeftPx" size="3" value="' +
				FSH.System.getValue('quickLinksLeftPx') +
				'"></td></tr>' +

			//Guild Manage
			'<tr><th colspan="2" align="left"><b>Guild>Manage preferences' +
				'</b></th></tr>' +
			'<tr><td colspan="2" align="left">Enter guild names, ' +
				'separated by commas</td></tr>' +
			'<tr><td>Own Guild</td><td>' +
				FSH.settingsPage.injectSettingsGuildData('Self') + '</td></tr>' +
			'<tr><td>Friendly Guilds</td><td>' +
				FSH.settingsPage.injectSettingsGuildData('Frnd') + '</td></tr>' +
			'<tr><td>Old Guilds</td><td>' +
				FSH.settingsPage.injectSettingsGuildData('Past') + '</td></tr>' +
			'<tr><td>Enemy Guilds</td><td>' +
				FSH.settingsPage.injectSettingsGuildData('Enmy') + '</td></tr>' +

			'<tr><td align="right">Highlight Valid PvP Targets' +
				FSH.settingsPage.helpLink('Highlight Valid PvP Targets',
				'Enabling this option will highlight targets in OTHER guilds that ' +
				'are within your level range to attack for PvP or GvG.') +
				':</td><td>PvP: <input name="highlightPlayersNearMyLvl" ' +
				'type="checkbox" value="on"' +
				(FSH.System.getValue('highlightPlayersNearMyLvl') ? ' checked' : '') +
				'> GvG: <input name="highlightGvGPlayersNearMyLvl" ' +
				'type="checkbox" value="on"' +
				(FSH.System.getValue('highlightGvGPlayersNearMyLvl') ?
				' checked' : '') + '></td></tr>' +

			simpleCheckbox(mySimpleCheckboxes.showAdmin) +
			simpleCheckbox(mySimpleCheckboxes.ajaxifyRankControls) +
			simpleCheckbox(mySimpleCheckboxes.detailedConflictInfo) +

			//World Screen
			'<tr><th colspan="2" align="left"><b>World screen/Hunting preferences' +
				'</b></th></tr>' +

			'<tr><td align="right">Hide Create Group Button' +
				FSH.settingsPage.helpLink('Hide Create Group Button',
				'Enabling this option will hide the Create Group button') +
				':</td><td>' +
				'<input name="hideChampionsGroup" ' + 'type="checkbox" value="on"' +
					(FSH.System.getValue('hideChampionsGroup') ? ' checked' : '') + '>' +
				'&nbsp;Champions&nbsp;&nbsp;' +
				'<input name="hideElitesGroup" type="checkbox" ' + 'value="on"' +
					(FSH.System.getValue('hideElitesGroup') ? ' checked' : '') + '>' +
				'&nbsp;Elites&nbsp;&nbsp;' +
				'<input name="hideSEGroup" type="checkbox" ' + 'value="on"' +
					(FSH.System.getValue('hideSEGroup') ? ' checked' : '') + '>' +
				'&nbsp;Super Elite&nbsp;&nbsp;' +
				'<input name="hideTitanGroup" type="checkbox" value="on"' +
					(FSH.System.getValue('hideTitanGroup') ? ' checked' : '') + '>' +
				'&nbsp;Titan&nbsp;&nbsp;' +
				'<input name="hideLegendaryGroup" type="checkbox" ' + 'value="on"' +
					(FSH.System.getValue('hideLegendaryGroup') ? ' checked' : '') + '>' +
				'&nbsp;Legendary' +
				'</td></tr>' +

			'<tr><td align="right">Keep Combat Logs' +
				FSH.settingsPage.helpLink('Keep Combat Logs',
				'Save combat logs to a temporary variable. ' +
				'Press <u>Show logs</u> on the right to display and copy them') +
				':</td><td><input name="keepLogs" type="checkbox" value="on"' +
				(FSH.System.getValue('keepLogs') ? ' checked' : '') + '>&nbsp;&nbsp;' +
				'<input type="button" class="custombutton" value="Show Logs" ' +
				'id="Helper:ShowLogs"></td></tr>' +

			simpleCheckbox(mySimpleCheckboxes.showCombatLog) +
			simpleCheckbox(mySimpleCheckboxes.enableCreatureColoring) +
			simpleCheckbox(mySimpleCheckboxes.showCreatureInfo) +

			'<tr><td align="right">Combat Evaluator Bias' +
				FSH.settingsPage.helpLink('Combat Evaluator Bias',
				'This changes the bias of the combat evaluator for the damage and ' +
				'HP evaluation. It will not change the attack bias (1.1053).' +
				'<br>Conservative = 1.1053 and 1.1 (Safest)' +
				'<br>Semi-Conservative = 1.1 and 1.053' +
				'<br>Adventurous = 1.053 and 1 (Bleeding Edge)' +
				'<br>Conservative+ = 1.1053 and 1 with the attack calculation ' +
				'changed to +-48 per RJEM') +
				':</td><td><select name="combatEvaluatorBias">' +
				'<option value="0"' + (combatEvaluatorBias === 0 ? ' SELECTED' : '') +
				'>Conservative</option>' +
				'<option value="1"' + (combatEvaluatorBias === 1 ? ' SELECTED' : '') +
				'>Semi-Conservative</option>' +
				'<option value="2"' + (combatEvaluatorBias === 2 ? ' SELECTED' : '') +
				'>Adventurous</option>' +
				'<option value="3"' + (combatEvaluatorBias === 3 ? ' SELECTED' : '') +
				'>Conservative+</option></select></td></tr>' +

			'<tr><td align="right">Keep Creature Log' +
				FSH.settingsPage.helpLink('Keep Creature Log',
				'This will show the creature log for each creature you see when ' +
				'you travel. This requires Show Creature Info enabled!') +
				':</td><td><input name="showMonsterLog" type="checkbox" value="on"' +
				(FSH.System.getValue('showMonsterLog') ? ' checked' : '') + '>' +
				'&nbsp;&nbsp;<input type="button" class="custombutton" ' +
				'value="Show" id="Helper:ShowMonsterLogs"></td></tr>' +

			'<tr><td align="right">Show Send Gold' +
				FSH.settingsPage.helpLink('Show Gold on World Screen',
				'This will show an icon below the world map to allow you to ' +
				'quickly send gold to a Friend.') +
				':</td><td><input name="sendGoldonWorld" type="checkbox" value="on"' +
				(FSH.System.getValue('sendGoldonWorld') ? ' checked' : '') + '>' +
				'&nbsp;&nbsp;Send <input name="goldAmount" size="5" value="' +
				FSH.System.getValue('goldAmount') + '"> '+
				'gold to <input name="goldRecipient" size="10" value="' +
				FSH.System.getValue('goldRecipient') + '">' +
				' Current total: <input name="currentGoldSentTotal" size="5" value="'+
				FSH.System.getValue('currentGoldSentTotal') + '">' +
				'</td></tr>' +

			'<tr><td align="right">Do Not Kill List' +
				FSH.settingsPage.helpLink('Do Not Kill List',
				'List of creatures that will not be killed by quick kill. ' +
				'You must type the full name of each creature, separated by commas. ' +
				'Creature name will show up in red color on world screen and will ' +
				'not be killed by keyboard entry (but can still be killed by ' +
				'mouseclick). Quick kill must be enabled for this function to work.') +
				':</td><td colspan="3"><input name="doNotKillList" size="60" value="' +
				doNotKillList + '"></td></tr>' +

			'<tr><td align="right">Hunting Buffs' +
				FSH.settingsPage.helpLink('Hunting Buffs',
				'Customize which buffs are designated as hunting buffs. ' +
				'You must type the full name of each buff, ' +
				'separated by commas. Use the checkbox to enable/disable them.') +
				':</td><td colspan="3"><input name="showHuntingBuffs" ' +
				'type="checkbox" value="on"' +
				(FSH.System.getValue('showHuntingBuffs') ? ' checked' : '') + '> ' +
				'Enabled Hunting Mode' +
				FSH.settingsPage.helpLink('Enabled Hunting Mode',
				'This will determine which list of buffs gets checked ' +
				'on the world screen.') +
				':<select name="enabledHuntingMode">' +
				'<option value="1"' + (enabledHuntingMode === 1 ? ' SELECTED' : '') +
				'>' + buffsName + '</option>' +
				'<option value="2"' + (enabledHuntingMode === 2 ? ' SELECTED' : '') +
				'>' + buffs2Name + '</option>' +
				'<option value="3"' + (enabledHuntingMode === 3 ? ' SELECTED' : '') +
				'>' + buffs3Name + '</option>' +
				'</select></td></tr>' +
			'<tr><td align="right">' + buffsName + ' Hunting Buff List' +
				FSH.settingsPage.helpLink(buffsName + ' Hunting Buff List',
				buffsName + ' list of hunting buffs.') +
				':</td><td colspan="3"><input name="huntingBuffsName" ' +
				'title="Hunting mode name" size="7" value="' + buffsName +
				'"><input name="huntingBuffs" size="49" value="' + buffs +
				'"></td></tr>' +
			'<tr><td align="right">' + buffs2Name + ' Hunting Buff List' +
				FSH.settingsPage.helpLink(buffs2Name + ' Hunting Buff List',
				'List of ' + buffs2Name + ' hunting buffs.') +
				':</td><td colspan="3"><input name="huntingBuffs2Name" ' +
				'title="Hunting mode name" size="7" value="' + buffs2Name +
				'"><input name="huntingBuffs2" size="49" value="' + buffs2 +
				'"></td></tr>' +
			'<tr><td align="right">' + buffs3Name + ' Hunting Buff List' +
				FSH.settingsPage.helpLink(buffs3Name + ' Hunting Buff List',
				'List of ' + buffs3Name + ' hunting buffs.') +
				':</td><td colspan="3"><input name="huntingBuffs3Name" ' +
				'title="Hunting mode name" size="7" value="'+ buffs3Name +
				'"><input name="huntingBuffs3" size="49" value="' + buffs3 +
				'"></td></tr>' +

			simpleCheckbox(mySimpleCheckboxes.huntingMode) +

			//Log screen prefs
			'<tr><th colspan="2" align="left"><b>Log screen preferences' +
				'</b></th></tr>' +

			simpleCheckbox(mySimpleCheckboxes.hideNonPlayerGuildLogMessages) +
			simpleCheckbox(mySimpleCheckboxes.useNewGuildLog) +

			'<tr><td align="right">New Guild Log History' +
				FSH.settingsPage.helpLink('New Guild Log History (pages)',
				'This is the number of pages that the new guild log ' +
				'screen will go back in history.') +
				':</td><td><input name="newGuildLogHistoryPages" size="3" value="' +
				FSH.System.getValue('newGuildLogHistoryPages') + '"></td></td></tr>' +

			simpleCheckbox(mySimpleCheckboxes.enableLogColoring) +

			'<tr><td align="right">New Log Message Sound' +
				FSH.settingsPage.helpLink('New Log Message Sound',
				'The .wav or .ogg file to play when you have unread log messages. ' +
				'This must be a .wav or .ogg file. This option can be turned on/off ' +
				'on the world page. Only works in Firefox 3.5+') +
				':</td><td colspan="3"><input name="defaultMessageSound" size="60" ' +
				'value="' + FSH.System.getValue('defaultMessageSound') +
				'"></td></tr>' +

			'<tr><td align="right">Play sound on unread log' +
				FSH.settingsPage.helpLink('Play sound on unread log',
				'Should the above sound play when you have unread log messages? ' +
				'(will work on Firefox 3.5+ only)') +
				':</td><td><input name="playNewMessageSound" type="checkbox" ' +
				'value="on"' +
				(FSH.System.getValue('playNewMessageSound') ? ' checked' : '') + '>' +
				' Show speaker on world' +
				FSH.settingsPage.helpLink('Show speaker on world',
				'Should the toggle play sound speaker show on the world map? ' +
				'(This icon is next to the Fallensword wiki icon and will only ' +
				'display on Firefox 3.5+)') +
				':<input name="showSpeakerOnWorld" type="checkbox" value="on"' +
				(FSH.System.getValue('showSpeakerOnWorld') ? ' checked' : '') +
				'></tr></td>' +

			simpleCheckbox(mySimpleCheckboxes.enableChatParsing) +
			simpleCheckbox(mySimpleCheckboxes.keepBuffLog) +
			simpleCheckbox(mySimpleCheckboxes.addAttackLinkToLog) +
			simpleCheckbox(mySimpleCheckboxes.enhanceChatTextEntry) +

			//Equipment screen prefs
			'<tr><th colspan="2" align="left"><b>Equipment screen preferences' +
				'</b></th></tr>' +

			simpleCheckbox(mySimpleCheckboxes.disableItemColoring) +

			'<tr><td align="right">Show Quick Send Item' +
				FSH.settingsPage.helpLink('Show Quick Send on Manage Backpack',
				'This will show a link beside each item which gives the option to ' +
				'quick send the item to this person') +
				':</td><td><input name="showQuickSendLinks" type="checkbox" ' +
				'value="on"' +
				(FSH.System.getValue('showQuickSendLinks') ? ' checked' : '') + '>'+
				'&nbsp;&nbsp;Send Items To ' +
				'<input name="itemRecipient" size="10" value="' +
				FSH.System.getValue('itemRecipient') + '">' +

			simpleCheckbox(mySimpleCheckboxes.showQuickDropLinks) +

			'<tr><td align="right">Quick Select all of type in Send Screen' +
				FSH.settingsPage.helpLink('Quick Select all of type in Send Screen',
				'This allows you to customize what quick links you would like ' +
				'displayed in your send item screen.<br>Use the format ' +
				'[&quot;name&quot;,&quot;itemid&quot;],[&quot;othername&quot;,' +
				'&quot;itemid2&quot;].<br>WARNING: NO REFUNDS ON ERROR') +
				':</td><td><input name="sendClasses" size="60" value="' +
				FSH.System.escapeHtml(FSH.System.getValue('sendClasses')) + '">'+

			//Quest Preferences
			'<tr><th colspan="2" align="left"><b>Quest preferences</b></th></tr>' +

			'<tr><td align="right">Hide Specific Quests' +
				FSH.settingsPage.helpLink('Hide Specific Quests',
				'If enabled, this hides quests whose name matches the list ' +
				'(separated by commas). This works on Quest Manager and Quest Book.') +
				':</td><td colspan="3"><input name="hideQuests" type="checkbox" ' +
				'value="on"' +
				(FSH.System.getValue('hideQuests') ? ' checked' : '') + '>' +
				'&nbsp;<input name="hideQuestNames" size="60" value="' +
				FSH.System.getValue('hideQuestNames') + '"></td></tr>' +

			simpleCheckbox(mySimpleCheckboxes.storeLastQuestPage) +
			simpleCheckbox(mySimpleCheckboxes.showNextQuestSteps) +

			//profile prefs
			'<tr><th colspan="2" align="left"><b>Profile preferences</b></th></tr>' +

			simpleCheckbox(mySimpleCheckboxes.renderSelfBio) +
			simpleCheckbox(mySimpleCheckboxes.renderOtherBios) +

			'<tr><td align="right">Enable Bio Compressor' +
				FSH.settingsPage.helpLink('Enable Bio Compressor',
				'This will compress long bios according to settings and provide a ' +
				'link to expand the compressed section.') +
				':</td><td><input name="enableBioCompressor" type="checkbox" ' +
				'value="on"' +
				(FSH.System.getValue('enableBioCompressor') ? ' checked' : '') +
				'> Max Characters:<input name="maxCompressedCharacters" size="4" ' +
				'value="' + FSH.System.getValue('maxCompressedCharacters') + '" />' +
				' Max Lines:<input name="maxCompressedLines" size="3" value="' +
				FSH.System.getValue('maxCompressedLines') + '"></td></tr>' +

			'<tr><td align="right">Buy Buffs Greeting' +
				FSH.settingsPage.helpLink('Buy Buffs Greeting',
				'This is the default text to open a message with when asking to ' +
				'buy buffs. You can use {playername} to insert the target players ' +
				'name. You can also use {buffs} to insert the list of buffs. You ' +
				'can use {cost} to insert the total cost of the buffs.') +
				':</td><td colspan="3"><input name="buyBuffsGreeting" size="60" ' +
				'value="' + FSH.System.getValue('buyBuffsGreeting') + '"></td></tr>' +

			simpleCheckbox(mySimpleCheckboxes.showStatBonusTotal) +
			simpleCheckbox(mySimpleCheckboxes.enableQuickDrink) +
			simpleCheckbox(mySimpleCheckboxes.disableDeactivatePrompts) +

			//Bounty hunting prefs
			'<tr><th colspan="2" align="left"><b>Bounty hunting preferences' +
				'</b></th></tr>' +

			'<tr><td align= "right">' + FSH.Layout.networkIcon +
				'Show Active Bounties' +
				FSH.settingsPage.helpLink('Show Active Bounties',
				'This will show your active bounties on the right hand side') +
				':</td><td colspan="3"><input name="enableActiveBountyList" ' +
				'type = "checkbox" value = "on"' +
				(enableActiveBountyList ? ' checked' : '') + '>&nbsp;' +
				'<input name="bountyListRefreshTime" size="3" value="' +
				bountyListRefreshTime + '"> seconds refresh</td></tr>' +

			'<tr><td align= "right">' + FSH.Layout.networkIcon +
				'Show Wanted Bounties' +
				FSH.settingsPage.helpLink('Show Wanted Bounties',
				'This will show when someone you want is on the bounty board, ' +
				'the list is displayed on the right hand side') +
				':</td><td colspan="3"><input name="enableWantedList" ' +
				'type="checkbox" value="on"' +
				(enableWantedList ? ' checked' : '') +
				'> Refresh time is same as Active Bounties' +

			'<tr><td align= "right">Wanted Names' +
				FSH.settingsPage.helpLink('Wanted Names',
				'The names of the people you want to see on the bounty board ' +
				'separated by commas') + ':</td><td colspan="3">' +
				'<input name="wantedNames" size="60" value="' + wantedNames +
				'"></td></tr>' +

			simpleCheckbox(mySimpleCheckboxes.enableAttackHelper) +
			simpleCheckbox(mySimpleCheckboxes.showPvPSummaryInLog) +

			//Other prefs
			'<tr><th colspan="2" align="left"><b>Other preferences</b></th></tr>' +

			simpleCheckbox(mySimpleCheckboxes.autoFillMinBidPrice) +

			'<tr><td align="right">Hide Specific Recipes' +
				FSH.settingsPage.helpLink('Hide Specific Recipes',
				'If enabled, this hides recipes whose name matches the list ' +
				'(separated by commas). This works on Recipe Manager') +
				':</td><td colspan="3"><input name="hideRecipes" ' +
				'type="checkbox" value="on"' +
				(FSH.System.getValue('hideRecipes') ? ' checked' : '') + '>' +
				'&nbsp;<input name="hideRecipeNames" size="60" value="' +
				FSH.System.getValue('hideRecipeNames') + '"></td></tr>' +

			simpleCheckbox(mySimpleCheckboxes.hideRelicOffline) +
			simpleCheckbox(mySimpleCheckboxes.enterForSendMessage) +
			simpleCheckbox(mySimpleCheckboxes.navigateToLogAfterMsg) +

			'<tr><td align= "right">Max Group Size to Join' +
				FSH.settingsPage.helpLink('Max Group Size to Join',
				'This will disable HCSs Join All functionality and will only join ' +
				'groups less than a set size. ') +
				':</td><td colspan="3"><input name="enableMaxGroupSizeToJoin" ' +
				'type = "checkbox" value = "on"' +
				(FSH.System.getValue('enableMaxGroupSizeToJoin') ? ' checked' : '') +
				'>&nbsp;&nbsp;Max Size: ' +
				'<input name="maxGroupSizeToJoin" size="3" value="' +
				FSH.System.getValue('maxGroupSizeToJoin') + '"></td></tr>' +

			simpleCheckbox(mySimpleCheckboxes.moveComposingButtons) +

			//save button
			//http://www.fallensword.com/index.php?cmd=notepad&blank=1&subcmd=savesettings
			'<tr><td colspan="2" align=center><input type="button" class=' +
				'"custombutton" value="Save" id="Helper:SaveOptions"></td></tr>' +
			'<tr><td colspan="2" align=center><a href="' + FSH.System.server +
				'index.php?cmd=notepad&blank=1&subcmd=savesettings">Export or Load ' +
				'Settings!</a></td></tr>' +
			'<tr><td colspan="2" align=center>' +
				'<span style="font-size:xx-small">Fallen Sword Helper was coded by ' +
				'<a href="' + FSH.System.server +
				'index.php?cmd=profile&player_id=1393340">Coccinella</a>, ' +
				'<a href="' + FSH.System.server +
				'index.php?cmd=profile&player_id=1599987">yuuzhan</a>, ' +
				'<a href="' + FSH.System.server +
				'index.php?cmd=profile&player_id=1963510">PointyHair</a>, ' +
				'<a href="' + FSH.System.server +
				'index.php?cmd=profile&player_id=1346893">Tangtop</a>, ' +
				'<a href="' + FSH.System.server +
				'index.php?cmd=profile&player_id=2536682">dkwizard</a>, ' +
				'<a href="' + FSH.System.server +
				'index.php?cmd=profile&player_id=1570854">jesiegel</a>, ' +
				'<a href="' + FSH.System.server +
				'index.php?cmd=profile&player_id=2156859">ByteBoy</a>, and ' +
				'<a href="' + FSH.System.server +
				'index.php?cmd=profile&player_id=2169401">McBush</a>, ' +
				'with valuable contributions by ' +
				'<a href="' + FSH.System.server +
				'index.php?cmd=profile&player_id=524660">Nabalac</a>, ' +
				'<a href="' + FSH.System.server +
				'index.php?cmd=profile&player_id=37905">Ananasii</a></span></td></tr>' +
			'</table></form>';

		var maxID = parseInt($('div[id*="settingsTabs-"]:last').attr('id')
			.split('-')[1], 10);
		$('div[id*="settingsTabs-"]:last').after('<div id="settingsTabs-' +
			(maxID + 1) + '">' + configData + '</div>');
		if($('#settingsTabs').tabs('length') > 0){
			//chrome, have to add it this way (due to loading order
			$('#settingsTabs').tabs('add','#settingsTabs-' + (maxID + 1),
				'FSH Settings');
		} else {
			//firefox loads it later, so just print to page
			$('a[href*="settingsTabs-"]:last').parent()
				.after('<li><a href="#settingsTabs-' + (maxID + 1) +
				'">FSH Settings</a></li>');
		}

		document.getElementById('fshClearStorage')
			.addEventListener('click', FSH.settingsPage.clearStorage, true);

		document.getElementById('Helper:SaveOptions')
			.addEventListener('click', FSH.settingsPage.saveConfig, true);
		document.getElementById('Helper:ShowLogs')
			.addEventListener('click', FSH.settingsPage.showLogs, true);
		document.getElementById('Helper:ShowMonsterLogs')
			.addEventListener('click', FSH.settingsPage.showMonsterLogs, true);

		document.getElementById('toggleShowGuildSelfMessage')
			.addEventListener('click', FSH.System.toggleVisibilty, true);
		document.getElementById('toggleShowGuildFrndMessage')
			.addEventListener('click', FSH.System.toggleVisibilty, true);
		document.getElementById('toggleShowGuildPastMessage')
			.addEventListener('click', FSH.System.toggleVisibilty, true);
		document.getElementById('toggleShowGuildEnmyMessage')
			.addEventListener('click', FSH.System.toggleVisibilty, true);

		var minGroupLevelTextField =
			FSH.System.findNode('//input[@name="min_group_level"]');
		if (minGroupLevelTextField) {
			var minGroupLevel = minGroupLevelTextField.value;
			FSH.System.setValue('minGroupLevel',minGroupLevel);
		}

		FSH.ga.end('JS Perf', 'injectSettings');

	},

	clearStorage: function() {
		if (confirm('Are you sure you want to clear you localStorage?')) {
			localStorage.clear();
		}
	},

	toggleTickAllBuffs: function(){ // jQuery
		var allItems = $('input[name^="blockedSkillList"]:visible',
			'#settingsTabs-4');
		var tckTxt = $(this);
		allItems.prop('checked', tckTxt.text() === 'Tick all buffs');
		if (tckTxt.text() === 'Tick all buffs') {
			tckTxt.text('Untick all buffs');
		} else {
			tckTxt.text('Tick all buffs');
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
		window.location = 'index.php?cmd=settings';
		return false;
	},

	showLogs: function() { // Native
		document.location=FSH.System.server + 'index.php?cmd=notepad&blank=1&subcmd=showlogs';
	},

	showMonsterLogs: function() { // Native
		document.location=FSH.System.server + 'index.php?cmd=notepad&blank=1&subcmd=monsterlog';
	},

	injectSaveSettings: function(){
		var content = FSH.Layout.notebookContent();
		var fshSettings = {};
		var list = GM_listValues();
		for(var i=0;i<list.length;i += 1) {
		  fshSettings[list[i]]=FSH.System.getValue(list[i]);
		}
		content.innerHTML = '<h1>FSH Settings</h1><br /><center>The box below is your current settings. Copy it to save your current settings<br />' +
			'To load saved settings, simply replace the contents of the box with your saved copy and press the button below.'+
			'<textarea align="center" cols="80" rows="25" style="background-color:white;font-family:Consolas,\'Lucida Console\',\'Courier New\',monospace;" id="HelperfshSettings" name="fshSettings">' + JSON.stringify(fshSettings) + '</textarea>' +
			'<br /><input id="HelperLoadSettings" class="custombutton" type="submit" value="Load Settings!" /></center>';
		$('#HelperLoadSettings').click(function(){
			var settings = JSON.parse($('#HelperfshSettings').val());
			for(var id in settings){
				if (!settings.hasOwnProperty(id)) { continue; }
				FSH.System.setValue(id,settings[id]);
			}
			alert('Settings loaded successfully!');
		});
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
			$('#pCC a[href="index.php?cmd=&subcmd=viewupdatearchive"]');
		if (archiveLink.length !== 1) {return;}
		archiveLink.after('&nbsp;<a href="index.php?cmd=&subcmd=viewupdatear' +
			'chive&subcmd2=&page=2&search_text=">View Updates Page 2</a>');
		archiveLink = $('#pCC a[href="index.php?cmd=&subcmd=viewarchive"]');
		archiveLink.after('&nbsp;<a href="index.php?cmd=&subcmd=viewarchive&' +
			'subcmd2=&page=2&search_text=">View News Page 2</a>');
	},

};

FSH.ga = { // jQuery

	times: {},

	start: function(category, variable, label) {
		FSH.ga.times[category + ':' + variable + ':' + label] =
			Math.round(performance.now());
	},

	end: function(category, variable, label) {
		ga('fshApp.send', 'timing', category, variable,
			Math.round(performance.now()) -
			FSH.ga.times[category + ':' + variable + ':' + label], label);
		// $('#pF').addClass('fshCenter').text('FSH processing time: ' +
			// (Math.round(performance.now()) -
			// FSH.ga.times[category + ':' + variable + ':' + label]) + 'ms');
	},

	refAry: ['www.lazywebtools.co.uk', 'refreshthing.com'],

	isAuto: function() {
		var docRef = document.referrer
			.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
		docRef = docRef ? docRef[1] : docRef;
		return FSH.ga.refAry.indexOf(docRef) !== -1;
	},

	setup: function() { // jQuery
		if (FSH.ga.isAuto() || typeof ga === 'undefined') {return;}

		ga('create', 'UA-76488113-1', 'auto', 'fshApp', {
			userId: $('#statbar-character').text(),
			siteSpeedSampleRate: 10
		});
		ga('fshApp.set', 'appName', 'fshApp');
		ga('fshApp.set', 'appVersion', FSH.version);
		ga('create', 'UA-76488113-2', 'auto', 'fsh', {
			userId: $('#statbar-character').text(),
			siteSpeedSampleRate: 10
		});
		ga('fsh.send', 'pageview');
	},

	screenview: function(funcName) { // Native
		if (FSH.ga.isAuto() || typeof ga === 'undefined') {return;}
		ga('fshApp.send', 'screenview', {screenName: funcName});
	},

};

FSH.environment = { // Legacy

	// main event dispatcher
	dispatch: function() { // jQuery

		FSH.ga.setup();

		var cmd, subcmd, subcmd2, type, fromWorld, test_cmd, fn;

		if (document.location.search !== '') {
			cmd = FSH.System.getUrlParameter('cmd') || '-';
			subcmd = FSH.System.getUrlParameter('subcmd') || '-';
			subcmd2 = FSH.System.getUrlParameter('subcmd2') || '-';
			type = FSH.System.getUrlParameter('type') || '-';
			fromWorld = FSH.System.getUrlParameter('fromworld') || '-';
		} else {
			test_cmd = document.querySelector('input[name="cmd"]');
			cmd = test_cmd ? test_cmd.getAttribute('value') : '-';
			test_cmd = document.querySelector('input[name="subcmd"]');
			subcmd = test_cmd ? test_cmd.getAttribute('value') : '-';
			if (subcmd === 'dochat') {
				cmd = '-';
				subcmd = '-';
			}
			test_cmd = document.querySelector('input[name="subcmd2"]');
			subcmd2 = test_cmd ? test_cmd.getAttribute('value') : '-';
			type = '-';
			fromWorld = '-';
		}

		FSH.cmd = cmd;
		FSH.subcmd = subcmd;
		FSH.subcmd2 = subcmd2;
		FSH.type = type;
		FSH.fromWorld = fromWorld;

		FSH.Helper.page = cmd + '/' + subcmd + '/' + subcmd2 + '(' + type + ')';

		var hcsData = document.getElementById('html');
		if (hcsData && JSON.parse(hcsData.getAttribute('data-hcs'))['new-ui']) {
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

		if (typeof window.jQuery === 'undefined') {return;}

		if (FSH.System.getValue('playNewMessageSound')) {
			setTimeout(FSH.environment.doMsgSound);
		}

		// This must be at the end in order not to screw up other FSH.System.findNode calls (Issue 351)
		if (!FSH.Helper.huntingMode) {
			setTimeout(FSH.environment.injectQuickLinks);
		}
	},

	navMenu: function() {
		var myNav = $('#nav').data('nav');
		if (!myNav) {return;}
		var oldSave = myNav._saveState;
		myNav._saveState = function(id) {
			var myHeight = $('li.nav-level-0', '#nav').eq(id).find('ul').height();
			if (myHeight === 0) {id = -1;}
			oldSave.call(myNav, id);
		};
	},

	statbar: function() {
		$('#statbar-character').off('click')
			.wrap('<a href="index.php?cmd=profile"></a>');
		$('#statbar-stamina').off('click')
			.wrap('<a href="index.php?cmd=points&subcmd=reserve"></a>');
		$('#statbar-equipment').off('click')
			.wrap('<a href="index.php?cmd=blacksmith"></a>');
		$('#statbar-inventory').off('click')
			.wrap('<a href="index.php?cmd=profile&subcmd=dropitems"></a>');
		$('#statbar-fsp').off('click')
			.wrap('<a href="index.php?cmd=points"></a>');
		$('#statbar-gold').off('click')
			.wrap('<a href="index.php?cmd=bank"></a>');
	},

	gameHelpLink: function() {
		// var gameHelpNode = $('div.minibox h3:contains("Game Help")');
		// $(gameHelpNode).each(function() {
			// $(this).html('<a href="index.php?cmd=settings" style="color:' +
				// ' #FFFFFF; text-decoration: underline">' +
				// $(this).text() + '</a>');
		// });
		$('div.minibox h3:contains("Game Help")')
			.html('<a href="index.php?cmd=settings">Game Help</a>');
	},

	prepareEnv: function() { // jQuery

		if (FSH.System.getValue('gameHelpLink')) {
			setTimeout(FSH.environment.gameHelpLink);
		}

		FSH.Helper.huntingMode = FSH.System.getValue('huntingMode');

		if (FSH.Helper.huntingMode) {
			FSH.environment.replaceKeyHandler();
		} else {
			//move boxes in opposite order that you want them to appear.
			if (FSH.System.getValue('moveGuildList')) {
				setTimeout(FSH.Layout.moveRHSBoxUpOnRHS, 0, 'minibox-guild');
			}
			if (FSH.System.getValue('moveOnlineAlliesList')) {
				setTimeout(FSH.Layout.moveRHSBoxUpOnRHS, 0, 'minibox-allies');
			}
			if (FSH.System.getValue('moveFSBox')) {
				setTimeout(FSH.Layout.moveRHSBoxToLHS, 0, 'minibox-fsbox');
			}
			FSH.environment.getEnvVars();
			if (FSH.Helper.enableAllyOnlineList ||
				FSH.Helper.enableEnemyOnlineList) {
				setTimeout(FSH.allyEnemy.prepareAllyEnemyList);
			}
			if (FSH.Helper.enableWantedList ||
				FSH.Helper.enableActiveBountyList) {
				setTimeout(FSH.activeWantedBounties.prepareBountyData);
			}

			FSH.environment.navMenu();
			setTimeout(FSH.environment.statbar);

			setTimeout(FSH.environment.injectStaminaCalculator);
			setTimeout(FSH.environment.injectLevelupCalculator);

			setTimeout(FSH.Layout.injectMenu);

			FSH.environment.replaceKeyHandler();
			setTimeout(FSH.environment.injectFSBoxLog);
			setTimeout(FSH.environment.fixOnlineGuildBuffLinks);
			if (FSH.Helper.enableGuildInfoWidgets) {
				setTimeout(FSH.environment.addGuildInfoWidgets);
			}
			if (FSH.Helper.enableOnlineAlliesWidgets) {
				setTimeout(FSH.environment.addOnlineAlliesWidgets);
			}
			setTimeout(FSH.notification.injectJoinAllLink);
			setTimeout(FSH.environment.changeGuildLogHREF);
			setTimeout(FSH.news.injectHomePageTwoLink);
			if (FSH.Helper.enableTempleAlert) {
				setTimeout(FSH.notification.injectTempleAlert);}
			if (FSH.Helper.enableUpgradeAlert) {
				setTimeout(FSH.notification.injectUpgradeAlert);}
			if (FSH.Helper.enableComposingAlert) {
				setTimeout(FSH.composing.injectComposeAlert);}

			FSH.messaging.injectQuickMsgDialogJQ();

		}

		if (!FSH.System.getValue('hideHelperMenu')) {
			setTimeout(FSH.helperMenu.injectHelperMenu);
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
		window.document.onkeypress = FSH.environment.keyPress;
	},

	keyPress: function(evt) {

		var r, s;
		if (evt.target.tagName!=='HTML' && evt.target.tagName!=='BODY') {return;}

		// ignore control, alt and meta keys (I think meta is the command key in Macintoshes)
		if (evt.ctrlKey) {return;}
		if (evt.metaKey) {return;}
		if (evt.altKey) {return;}

		r = evt.charCode;
		s = evt.keyCode;

		switch (r) {
		case 113: // nw [q]
			// FSH.Helper.moveMe(-1,-1);
			break;
		case 119: // n [w]
			// FSH.Helper.moveMe(0,-1);
			break;
		case 101: // ne [e]
			// FSH.Helper.moveMe(1,-1);
			break;
		case 97: // w [a]
			// FSH.Helper.moveMe(-1,0);
			break;
		case 100: // e [d]
			// FSH.Helper.moveMe(1,0);
			break;
		case 122: // sw [z]
			// FSH.Helper.moveMe(-1,1);
			break;
		case 120: // s [x]
			// FSH.Helper.moveMe(0,1);
			break;
		case 99: // se [c]
			// FSH.Helper.moveMe(1,1);
			break;
		case 114: // repair [r]
			//do not use repair link for new map
			if ($('#worldPage').length === 0) {
				location.href = 'index.php?cmd=blacksmith&subcmd=repairall&fromworld=1';
			}
			break;
		case 71: // create group [G]
			location.href = 'index.php?cmd=guild&subcmd=groups&subcmd2=create&fromworld=1';
			break;
		case 76: // Log Page [L]
			location.href = 'index.php?cmd=log';
			break;
		case 103: // go to guild [g]
			location.href = 'index.php?cmd=guild&subcmd=manage';
			break;
		case 106: // join all group [j]
			if (!FSH.System.getValue('enableMaxGroupSizeToJoin')) {
				location.href = 'index.php?cmd=guild&subcmd=groups&subcmd2=joinall';
			} else {
				location.href = 'index.php?cmd=guild&subcmd=groups&subcmd2=joinallgroupsundersize';
			}
			break;
		case 49: // [1]
		case 50: // [2]
		case 51: // [3]
		case 52: // [4]
		case 53: // [5]
		case 54: // [6]
		case 55: // [7]
		case 56: // keyed combat [8]
			break;
		case 98: // backpack [b]
			location.href = 'index.php?cmd=profile&subcmd=dropitems';
			break;
		case 115: // use stairs [s]
			break;
		case 116: // quick buy [t]
			FSH.Helper.quickBuyItem();
			break;
		case 118: // fast wear manager [v]
			location.href = 'index.php?cmd=notepad&blank=1&subcmd=quickwear';
			break;
		case 121: // fast send gold [y]
			FSH.newMap.doSendGold();
			break;
		case 48: // return to world [0]
			//do not use if using new map
			if ($('#worldPage').length === 0) {
				location.href = 'index.php?cmd=world';
			}
			break;
		case 109: // map [m]
			// Firefox will block window.open on keypress
			// change to clickable link for browser consistency
			// window.open('index.php?cmd=world&subcmd=map', 'fsMap');
			// openWindow('index.php?cmd=world&subcmd=map', 'fsMap', 650, 650, ',scrollbars,resizable');
			// FSH.System.openInTab(FSH.System.server + 'index.php?cmd=world&subcmd=map');
			break;
		case 112: // profile [p]
			location.href = 'index.php?cmd=profile';
			break;
		case 110: // mini map [n]
			break;
		case 78: // auto move in mini map [N]
			break;
		case 62: // move to next page [>]
		case 60: // move to prev page [<]
			FSH.environment.movePage({62:'>', 60:'<'}[r]);
			break;
		case 33: // Shift+1
		case 64: // Shift+2
		case 34: // Shift+2 -- for UK keyboards, I think
		case 35: // Shift+3
		case 36: // Shift+4
		case 37: // Shift+5
		case 94: // Shift+6
		case 38: // Shift+7
		case 42: // Shift+8
		case 40: // Shift+9
			var keyMap = {'key33':1, 'key64':2, 'key34':2, 'key35':3, 'key36':4, 'key37':5,
				'key94':6, 'key38':7, 'key42':8, 'key40':9};
			// I'm using "key??" because I don't feel comfortable of naming properties with integers
			var itemIndex = keyMap['key' + r];
			FSH.System.xmlhttp('index.php?cmd=profile', FSH.Helper.changeCombatSet, itemIndex);
			break;
		case 41: // Shift+0
			// TODO: ask for a number, check isnumeric, then call changeCombatSet with that index.
			break;
		case 0: // special key
			switch (s) {
			case 19: // quick buffs [Pause] - Bug?
				// This has never worked. Was in wrong section.
				// Chrome does not pass the Pause button anyway
				// Firefox blocks pop-ups on keypress
				// window.openWindow('index.php?cmd=quickbuff', 'fsQuickBuff', 618, 1000, ',scrollbars');
				// FSH.System.openInTab(FSH.System.server + 'index.php?cmd=quickbuff');
				break;
			case 37: // w
				break;
			case 38: // n
				break;
			case 39: // e
				break;
			case 40: // s
				break;
			case 33:
				if (FSH.System.findNode('//div[@id="reportsLog"]')) {
					FSH.Helper.scrollUpCombatLog();
					evt.preventDefault();
					evt.stopPropagation();
				}
				break;
			case 34:
				if (FSH.System.findNode('//div[@id="reportsLog"]')) {
					FSH.Helper.scrollDownCombatLog();
					evt.preventDefault();
					evt.stopPropagation();
				}
				break;
			default:
				break;
			}
			break;
		default:
			break;
		}
	},

	movePage: function(dir) {
		var dirButton = FSH.System.findNode('//input[@value="'+dir+'"]');
		if (!dirButton) {return;}
		var url = dirButton.getAttribute('onClick');
		url = url.replace(/^[^']*'/m, '').replace(/\';$/m, '');
		location.href = url;
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
		var staminaMouseover = $('#statbar-stamina-tooltip-stamina');
		var stamVals = /([,0-9]+)\s\/\s([,0-9]+)/.exec(
			staminaMouseover.find('dt.stat-name').next().text());
		staminaMouseover
			.append('<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>' +
				FSH.environment.timeBox(
					$('.stat-stamina-nextGain').next().text(),
					// get the max hours to still be inside stamina maximum
					Math.floor(
						(FSH.System.intValue(stamVals[2]) -
						FSH.System.intValue(stamVals[1])) /
						FSH.System.intValue($('.stat-stamina-gainPerHour').next().text())
					)
				)
			);
	},

	timeBox: function(nextGainTime, hrsToGo) {
		var nextGain = /([0-9]+)m ([0-9]+)s/.exec(nextGainTime);
		return '<dd>' +
			FSH.System.formatShortDate(new Date(Date.now() +
			(hrsToGo * 60 * 60 + parseInt(nextGain[1], 10) * 60 +
			parseInt(nextGain[2], 10)) * 1000)) + '</dd>';
	},

	injectLevelupCalculator: function() { // jQuery
		$('#statbar-level-tooltip-general')
			.append('<dt class="stat-xp-nextLevel">Next Level At</dt>' +
				FSH.environment.timeBox($('.stat-xp-nextGain').next().text(),
					Math.ceil(
						FSH.System.intValue($('.stat-xp-remaining').next().text()) /
						FSH.System.intValue($('.stat-xp-gainPerHour').next().text())
					)
				)
			);
	},

	injectFSBoxLog: function() { // Bad jQuery
		if (!FSH.System.getValue('fsboxlog')) {return;}
		var node=$('#minibox-fsbox');
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

	injectFsBoxContent: function(content) { //native
		if (!content) {content = FSH.Layout.notebookContent();}
		content.innerHTML = FSH.Layout.makePageTemplate('FS Box Log', '',
			'fsboxclear', 'Clear', 'fsboxdetail');
		document.getElementById('fsboxclear')
			.addEventListener('click', function() {
				FSH.System.setValue('fsboxcontent','');
				location.reload();}, true);
		document.getElementById('fsboxdetail').innerHTML =
			FSH.System.getValue('fsboxcontent');
	},

	fixOnlineGuildBuffLinks: function() { // jQuery
		// illegal multiple id's - use a to prevent getElementById
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
		var guildMembrList = $('#minibox-guild-members-list');
		if (guildMembrList.length === 0) {return;} // list exists
		// hide guild info links
		// illegal multiple id's - use a to prevent getElementById
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
			$('#guild-quick-buff').hide();
		}
		// add coloring for offline time
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
		var onlineAlliesList = $('#minibox-allies-list');
		if (onlineAlliesList.length === 0) {return;}
		// illegal multiple id's - use a to prevent getElementById
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
			$('#ally-quick-buff').hide();
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

		FSH.ga.start('JS Perf', 'changeGuildLogHREF');

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
						//hide the empty row before it too (can't do after in case there is no after row)
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

		FSH.ga.end('JS Perf', 'changeGuildLogHREF');

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

	injectQuickLinks: function() { // Bad jquery

		FSH.ga.start('JS Perf', 'injectQuickLinks');

		// don't put all the menu code here (but call if clicked) to minimize lag
		var quickLinks = FSH.System.getValueJSON('quickLinks') || [];
		if (quickLinks.length <= 0) {return;}
		var node = $('#statbar-container');
		if (node.length === 0) {return;}
		var html = '<div style="top:' +
			FSH.System.getValue('quickLinksTopPx') + 'px; left:' +
			FSH.System.getValue('quickLinksLeftPx') + 'px; background-image:' +
			'url(\'' + FSH.System.imageServer + '/skin/inner_bg.jpg\');" ' +
			'id=fshQuickLinks>';
		for (var i=0; i<quickLinks.length; i += 1) {
				html += '<li><span style="cursor:pointer; text-decoration:' +
					'underline;"><a href="' + quickLinks[i].url + '"' +
					(quickLinks[i].newWindow ? ' target=new' : '') +
					'>' + quickLinks[i].name + '</a></span></li>';
		}
		html += '</div>';
		var divQuickLink = $(html);
		divQuickLink.draggable();
		if (FSH.System.getValue('keepHelperMenuOnScreen')) {
			divQuickLink.css('position', 'fixed');
		}
		$('body').append(divQuickLink);

		FSH.ga.end('JS Perf', 'injectQuickLinks');

	},

	unknownPage: function() { // Legacy

		if (typeof window.jQuery === 'undefined') {return;}

		FSH.ga.start('JS Perf', 'unknownPage');

		if ($('#pCC td:contains("Below is the current status for ' +
			'the relic")').length > 0) {
			FSH.ga.screenview('unknown.oldRelic.injectRelic');
			FSH.oldRelic.injectRelic();
		}
		var isBuffResult = FSH.System.findNode('//td[contains(.,"Back to Quick Buff Menu")]');
		if (isBuffResult) {
			FSH.ga.screenview('unknown.quickBuff.updateBuffLog');
			FSH.quickBuff.updateBuffLog();
		}
		if ($('#shop-info').length > 0) {
			FSH.ga.screenview('unknown.Helper.injectShop');
			FSH.Helper.injectShop();
		}
		var isQuestBookPage = FSH.System.findNode('//td[.="Quest Name"]');
		if (isQuestBookPage) {
			FSH.ga.screenview('unknown.questBook.injectQuestBookFull');
			FSH.questBook.injectQuestBookFull();
		}
		var isAdvisorPageClue1 = FSH.System.findNode('//font[@size=2 and .="Advisor"]');
		var clue2 = '//a[@href="index.php?cmd=guild&amp;subcmd=manage" and .="Back to Guild Management"]';
		var isAdvisorPageClue2 = FSH.System.findNode(clue2);
		if (isAdvisorPageClue1 && isAdvisorPageClue2) {
			FSH.ga.screenview('unknown.guildAdvisor.injectAdvisor');
			FSH.guildAdvisor.injectAdvisor();
		}
		// if (FSH.System.findNode('//a[.="Back to Scavenging"]')) {
			// FSH.ga.screenview('unknown.scavenging.injectScavenging');
			// FSH.scavenging.injectScavenging(); // Is this used???
		// }
		if ($('#pCC img[title="Inventing"]').length > 0) {
			FSH.ga.screenview('unknown.Helper.injectInvent');
			FSH.Helper.injectInvent();
		}

		FSH.ga.end('JS Perf', 'unknownPage');

	},

};

FSH.messaging = { // jQuery

	injectQuickMsgDialogJQ: function() { // jQuery
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
		if (!FSH.Helper.template) {
			FSH.Helper.template = FSH.System.getValueJSON('quickMsg');
			var buttons = $('#quickMessageDialog').dialog('option','buttons');
			buttons.Template = FSH.messaging.showMsgTemplate;
			$('#quickMessageDialog').dialog('option','buttons',buttons);
		}
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
		var items = $('#pCC a');
		if (items.length === 0) {return;} // Empty mailbox
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
				'" class="tip-dynamic" border="0" data-tipped="' +
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

	guildMailbox: function() {
		var items = $('#pCC a');
		if (items.length === 0) {return;}
		items.wrap(function() {
			return '<span class="helperQC" href="' + $(this).attr('href') +
				'"></span>';
		}).children().unwrap();
		$('#pCC').on('click', '.helperQC', FSH.mailbox.guildTake);

		var takeItems = $('<div class="fshCenter"><span class="reportLink">' +
			'Take All</span></div>');
		$('#pCC td[height="25"]').append(takeItems);
		takeItems.click(function() {
			$('#pCC span.helperQC').click();
		});
	},

	guildTake: function() {
		var self = $(this);
		FSH.ajax.guildMailboxTake(self.attr('href')).done(function(data) {
			if (data.r === 1) {return;}
			self.removeClass();
			self.closest('table').next().find('td')
				.html('<span class="fshGreen">Taken</span>');
		});
	},

};

FSH.misc = { // Legacy

	injectAuctionHouse: function() { // Bad jQuery
		if (FSH.System.getValue('autoFillMinBidPrice')) {
			$('#auto-fill').not(':checked').click();
		}
		$('input[value="My Auctions"]').before('<input id="helperAHCancelAll" type="button" value="Cancel All" ' +
			'class="custombutton auctionbutton" style="float: right;">');
		$('#helperAHCancelAll').click(function() {
			$('a.auctionCancel').each(function() {$(this).click();});
		});
		$('#sort0').click();
	},

	injectFindPlayer: function() { // Bad jQuery
		var findPlayerButton = $('input[value="Find Player"]');
		var levelToTest = FSH.System.intValue($('dt.stat-level:first').next().text());
		var characterVirtualLevel = FSH.System.getValue('characterVirtualLevel');
		if (characterVirtualLevel) {levelToTest = characterVirtualLevel;}
		var pvpLowerLevelModifier = levelToTest > 205 ? 10 : 5;
		var pvpUpperLevelModifier = levelToTest >= 200 ? 10 : 5;
		findPlayerButton.parent().append('&nbsp;<a href="index.php?cmd=findplayer&search_active=1&search_username=&search_level_min=' +
			(levelToTest - pvpLowerLevelModifier) + '&search_level_max=' + (levelToTest + pvpUpperLevelModifier) +
			'&search_in_guild=0"><span style="color:blue;">Get PvP targets</span></a>' +
			'&nbsp;<a href="index.php?cmd=findplayer&search_active=1&search_username=&search_level_min=' +
			(levelToTest - 25) + '&search_level_max=' + (levelToTest + 25) +
			'&search_in_guild=0"><span style="color:blue;">Get GvG targets</span></a>');

		$('table[class="width_full"]').find('a[href*="player_id"]').each(function() {
			var id = /player_id=([0-9]*)/.exec($(this).attr('href'));
			$(this).after('<a style="color:blue;font-size:10px;" '+FSH.Layout.quickBuffHref(id[1])+'>[b]</a>');
		});
	},

	addMarketplaceWidgets: function() { // Legacy
		var requestTable = FSH.System.findNode('//table[tbody/tr/td/input[@value="Confirm Request"]]');
		var newRow = requestTable.insertRow(2);
		var newCell = newRow.insertCell(0);
		newCell.id = 'warningfield';
		newCell.colSpan = '2';
		newCell.align = 'center';

		document.getElementById('price').addEventListener('keyup', FSH.misc.addMarketplaceWarning, true);
		document.getElementById('amount').addEventListener('keyup', FSH.misc.addMarketplaceWarning, true);
	},

	addMarketplaceWarning: function() { // Legacy
		 var amount = FSH.System.findNode('//input[@id="amount"]').value;
		 var goldPerPoint = FSH.System.findNode('//input[@id="price"]');
		 var warningField = FSH.System.findNode('//td[@id="warningfield"]');
		 var sellPrice = goldPerPoint.value;
		 if (sellPrice.search(/^[0-9]*$/) !== -1) {
			var warningColor = 'green';
			var warningText = '</b><br>This is probably an offer that will please someone.';
			if (sellPrice < 100000) {
				warningColor = 'brown';
				warningText = '</b><br>This is too low ... it just ain"t gonna sell.';
			} else if (sellPrice > 250000) {
				warningColor = 'red';
				warningText = '</b><br>Hold up there ... this is way to high a price ... you should reconsider.';
			}

			warningField.innerHTML = '<span style="color:' + warningColor +
				';">You are offering to buy <b>' + amount +
				'</b> FSP for >> <b>' + FSH.System.addCommas(sellPrice) +
				warningText + ' (Total: ' +
				FSH.System.addCommas(amount * sellPrice +
				Math.ceil(amount * sellPrice * 0.005)) + ')</span>';
		}
	},

	injectNotepad: function() { //jquery
		$('#notepad_notes')
		.attr('cols', '90')
		.attr('rows', '30')
		.css('resize', 'none');
	},

};

FSH.bank = { // jQuery

	playerBank: { // Native
		headText: 'Bank',
		appLink: true,
		depoPos: 2,
		balPos: 1,
		data: {
			cmd: 'bank',
			subcmd: 'transaction'
		},
		initWithdraw: ''
	},

	guildBank: { // Native
		headText: 'Guild Bank',
		appLink: false,
		depoPos: 3,
		balPos: 2,
		data: {
			cmd: 'guild',
			subcmd: 'bank',
			subcmd2: 'transaction'
		},
		initWithdraw: '1'
	},

	injectGuildBank: function() { // Native
		FSH.bank.bankSettings = FSH.bank.guildBank;
		FSH.bank.ajaxifyBank();
	},

	injectBank: function() { // jQuery
		FSH.bank.bankSettings = FSH.bank.playerBank;
		FSH.bank.ajaxifyBank();
	},

	ajaxifyBank: function() { // jQuery

		FSH.ga.start('JS Perf', 'ajaxifyBank');

		var o = FSH.bank.bankSettings;
		var bank = $('#pCC b');
		if (bank.length === 0 || bank.eq(0).text() !== o.headText) {return;}
		if (o.appLink) {
			bank.eq(0).closest('tr').after('<tr><td colspan="3" align="center">' +
				'<a href="/index.php?cmd=guild&subcmd=bank">Go to Guild Bank</a>' +
				'</td></tr>');
		}
		var depo = $('#pCC input[value="Deposit"]');
		if (depo.length !== 1) {return;}
		var withdraw = $('#pCC input[value="Withdraw"]');
		if (withdraw.length !== 1) {return;}
		if ($('#pCC b').eq(o.depoPos).text() === '0') {
			depo.prop('disabled', true);
		} else {
			depo.click(FSH.bank.bankDeposit);
		}
		withdraw.click(FSH.bank.bankWithdrawal);

		FSH.ga.end('JS Perf', 'ajaxifyBank');

	},

	bankDeposit: function(e) { // jQuery
		e.preventDefault();
		var o = FSH.bank.bankSettings;
		var amount = $('#pCC #deposit_amount').val();
		if ($('#pCC b').eq(o.depoPos).text() === '0' || !$.isNumeric(amount) ||
			amount < 1) {return;}
		o.data.mode = 'deposit';
		o.data.deposit_amount = amount;
		$.get('index.php', o.data).done(FSH.bank.transResponse);
	},

	bankWithdrawal: function(e) { // jQuery
		e.preventDefault();
		var o = FSH.bank.bankSettings;
		var amount = $('#pCC #withdraw_amount').val();
		if (!$.isNumeric(amount) || amount < 1) {return;}
		o.data.mode = 'withdraw';
		o.data.withdraw_amount = amount;
		$.get('index.php', o.data).done(FSH.bank.transResponse);
	},

	transResponse: function(response) { // jQuery
		var doc = FSH.System.createDocument(response);
		var infoBox = $('#pCC #info-msg', doc);
		if (infoBox.length === 0) {return;}
		var target = $('#pCC #info-msg');
		if (target.length === 0) {
			$('#pCC').prepend(infoBox.closest('table'));
		} else {
			target.closest('table').replaceWith(infoBox.closest('table'));
		}
		$('#pH #statbar-gold').text($('#pH #statbar-gold', doc).text());
		$('#pH #statbar-gold-tooltip-general dd').text(function(index) {
			return $('#pH #statbar-gold-tooltip-general dd', doc).eq(index).text();
		});
		var o = FSH.bank.bankSettings;
		$('#pCC b').slice(o.balPos).text(function(index) {
			return $('#pCC b', doc).slice(o.balPos).eq(index).text();
		});
		if ($('#pCC b').eq(o.depoPos).text() === '0') {
			$('#pCC input[value="Deposit"]').prop('disabled', true);
		}
		$('#pCC #deposit_amount').val($('#pCC #deposit_amount', doc).val());
		$('#pCC #withdraw_amount').val(o.initWithdraw);
	},

};

FSH.guild = { // Legacy

	injectViewGuild: function() { // Legacy

		FSH.ga.start('JS Perf', 'injectViewGuild');

		FSH.guild.removeGuildAvyImgBorder();
		FSH.guild.guildXPLock();

		var highlightPlayersNearMyLvl = FSH.System.getValue('highlightPlayersNearMyLvl');
		var highlightGvGPlayersNearMyLvl = FSH.System.getValue('highlightGvGPlayersNearMyLvl');
		if (highlightPlayersNearMyLvl || highlightGvGPlayersNearMyLvl) {
			var memList = FSH.System.findNode('//tr[td/b[.="Members"]]/following-sibling::tr/td/table');
			var levelToTest = FSH.System.intValue($('dt.stat-level:first').next().text());
			var characterVirtualLevel = FSH.System.getValue('characterVirtualLevel');
			if (characterVirtualLevel) {levelToTest = characterVirtualLevel;}
			for (var i=2;i<memList.rows.length;i += 1) {
				if (memList.rows[i].cells[1]) {
					// Firefox reads it as </td> and chrome reads it as \&lt;\/td\&gt;
					var vlevel = /VL:.+?(\d+)/.exec(memList.rows[i].cells[1].innerHTML)[1];
					var aRow = memList.rows[i];
					if (highlightPlayersNearMyLvl && Math.abs(vlevel - levelToTest) <= (levelToTest <= 205 ? 5 : 10)) {
						aRow.style.backgroundColor = '#4671C8'; //blue
					} else if (highlightGvGPlayersNearMyLvl && Math.abs(vlevel - levelToTest) <= (levelToTest <= 300 ? 25 : levelToTest <= 700 ? 50 : 100)) {
						aRow.style.backgroundColor = '#FF9900'; //red
					}
				}
			}
		}
		setTimeout(FSH.Layout.colouredDots);

		FSH.ga.end('JS Perf', 'injectViewGuild');

	},

	injectGuild: function() { // Legacy

		FSH.ga.start('JS Perf', 'injectGuild');

		FSH.guild.removeGuildAvyImgBorder();
		FSH.guild.guildXPLock();

		var leftHandSideColumnTable = FSH.System.findNode('//table[tbody/tr/td/font/a[contains(.,"Change Logo")]]');
		var changeLogoCell = leftHandSideColumnTable.rows[0].cells[1].firstChild;
		changeLogoCell.innerHTML += '[ <span style="cursor:pointer; text-decoration:underline;" ' +
			'id="toggleGuildLogoControl" linkto="guildLogoControl" title="Toggle Section">X</span> ]';
		var guildLogoElement = leftHandSideColumnTable.rows[2].cells[0].firstChild.nextSibling;
		guildLogoElement.id = 'guildLogoControl';
		if (FSH.System.getValue('guildLogoControl')) {
			guildLogoElement.style.display = 'none';
			guildLogoElement.style.visibility = 'hidden';
		}
		var leaveGuildCell = leftHandSideColumnTable.rows[4].cells[1].firstChild;
		leaveGuildCell.innerHTML += '<span class="fshNoWrap">[ <span style="cursor:pointer; text-decoration:underline;" ' +
			'id="toggleStatisticsControl" linkto="statisticsControl" title="Toggle Section">X</span> ]</span>';
		var statisticsControlElement = leftHandSideColumnTable.rows[6].cells[0].firstChild.nextSibling;
		statisticsControlElement.id = 'statisticsControl';
		if (FSH.System.getValue('statisticsControl')) {
			statisticsControlElement.style.display = 'none';
			statisticsControlElement.style.visibility = 'hidden';
		}
		var buildCell = leftHandSideColumnTable.rows[15].cells[1].firstChild;
		buildCell.innerHTML += '[ <span style="cursor:pointer; text-decoration:underline;" ' +
			'id="toggleGuildStructureControl" linkto="guildStructureControl" title="Toggle Section">X</span> ]';
		var guildStructureControlElement = leftHandSideColumnTable.rows[17].cells[0].firstChild.nextSibling;
		guildStructureControlElement.id = 'guildStructureControl';
		if (FSH.System.getValue('guildStructureControl')) {
			guildStructureControlElement.style.display = 'none';
			guildStructureControlElement.style.visibility = 'hidden';
		}

		document.getElementById('toggleGuildLogoControl')
			.addEventListener('click', FSH.System.toggleVisibilty, true);
		document.getElementById('toggleStatisticsControl')
			.addEventListener('click', FSH.System.toggleVisibilty, true);
		document.getElementById('toggleGuildStructureControl')
			.addEventListener('click', FSH.System.toggleVisibilty, true);

		$('td:contains("Username"):last').parents('table:first')
			.find('a[href]').each(function(){
			$(this).after(' <a style="color:blue;font-size:10px;" ' +
			'href=\'javascript:window.openWindow("index.php?cmd=quickbuff&t=' +
			$(this).text() + '", "fsQuickBuff", 618, 1000, ",scrollbars")\'' +
			'>[b]</a>'); // FIXME
		});

		// self recall
		var selfRecall = leftHandSideColumnTable.rows[22].cells[0];
		selfRecall.innerHTML+=' [<a href="index.php?cmd=guild&subcmd=' +
			'inventory&subcmd2=report&user=' +
			$('dt.stat-name:first').next().text().replace(/,/g,'') +
			'" title="Self Recall">SR</a>]';

		//Detailed conflict information
		if (FSH.System.getValue('detailedConflictInfo') === true) {
			var confNode = FSH.System.findNode('//table[contains(@id,"statisticsControl")]');
			FSH.System.xmlhttp('index.php?cmd=guild&subcmd=conflicts',
				FSH.guild.getConflictInfo, {'node': confNode});
		}
		setTimeout(FSH.Layout.colouredDots);

		FSH.ga.end('JS Perf', 'injectGuild');

	},

	removeGuildAvyImgBorder: function() { //jquery
		$('img[oldtitle$="\'s Logo"]').css('border-style', 'none');
	},

	guildXPLock: function() { // Legacy
		var xpLock = FSH.System.findNode('//a[contains(.,"Guild") and contains(.,"XP")]');
		if (!xpLock) {return;}
		var xpLockmouseover = $(xpLock).data('tipped');
		var xpLockXP = FSH.System.getIntFromRegExp(xpLockmouseover, /XP Lock: <b>(\d*)/);
		var actualXP = FSH.System.getIntFromRegExp(xpLockmouseover, /XP: <b>(\d*)/);
		if (actualXP < xpLockXP) {
			try {
			var xpNode = xpLock.parentNode.parentNode;
				xpNode.cells[1].innerHTML += ' (<b>' + FSH.System.addCommas(xpLockXP - actualXP) + '</b>)';
			} catch (err) {
				console.log(err);
			}
		}
	},

	getConflictInfo: function(responseText, callback) { // Legacy
		try {
			var insertHere = callback.node;
			var doc = FSH.System.createDocument(responseText);

			var page = FSH.System.findNode('//td[contains(.,"Page:")]', doc);
			var curPage = parseInt(FSH.System.findNode('//input[@name="page"]', doc).value,10);
			var maxPage = page.innerHTML.match(/of&nbsp;(\d*)/);

			var conflictTable = FSH.System.findNode('//font[contains(.,"Participants")]/ancestor::table[1]', doc);
			if (conflictTable && conflictTable.rows.length > 3) {
				if (curPage === 1) {
					var newNode = insertHere.insertRow(insertHere.rows.length-2);
					newNode.insertCell(0);
					newNode.insertCell(0);
					newNode.cells[0].innerHTML = '<a href="index.php?cmd=guild&subcmd=conflicts">Active Conflicts</a>';
					newNode.cells[1].innerHTML = 'Score';
				}
				for (var i = 1; i <= conflictTable.rows.length - 4; i+=2) {
					var newRow = insertHere.insertRow(insertHere.rows.length-2);
					newRow.insertCell(0);
					newRow.insertCell(0);
					newRow.cells[0].innerHTML = conflictTable.rows[i].cells[0].innerHTML;
					newRow.cells[1].innerHTML = '<b>' + conflictTable.rows[i].cells[6].innerHTML + '</b>';
				}
			}
			if (maxPage && parseInt(maxPage[1],10) > curPage) {
				FSH.System.xmlhttp('index.php?cmd=guild&subcmd=conflicts&subcmd2=&page=' + (curPage + 1) + '&search_text=',
					FSH.guild.getConflictInfo,
					{'node': callback.node});
			}
		} catch (err) {
			console.log(err);
		}
	},

	injectGuildAddTagsWidgets: function() { // Legacy
		var itemTable = FSH.System.findNode('//img[contains(@src,"/items/")]/ancestor::table[1]');
		if (itemTable) {
			for (var i=1;i<itemTable.rows.length;i += 1) {
				var aRow = itemTable.rows[i];
				if (aRow.cells[2]) { // itemRow
					var itemId = aRow.cells[0].firstChild.getAttribute('value');
					aRow.cells[2].innerHTML += '&nbsp;<span style="cursor:pointer; text-decoration:underline; color:blue;" itemID="' + itemId + '">Fast BP</span>';
					var itemRecall = aRow.cells[2].firstChild.nextSibling;
					itemRecall.addEventListener('click', FSH.guild.recallGuildStoreItem, true);
				}
			}
		}
		$('b:contains("100 x Item Level")').closest('tr').next().children('td:first').append('<input type="button" id="fshCheckAlTag" value="Check All">');
		$('#fshCheckAlTag').click(function()
		{
			$('input[name*=tagIndex]').each(function()
			{
				this.click();
			});
		});
	},

	recallGuildStoreItem: function(evt) { // Legacy
		var guildStoreID=evt.target.getAttribute('itemID');
		var recallHref = 'index.php?cmd=guild&subcmd=inventory&subcmd2=takeitem&guildstore_id=' + guildStoreID + '&ajax=1';
		FSH.System.xmlhttp(recallHref,
			FSH.guild.recallGuildStoreItemReturnMessage,
			{'item': guildStoreID, 'target': evt.target, 'url': recallHref});
	},

	recallGuildStoreItemReturnMessage: function(responseText, callback) { // Native
		var target = callback.target;
		var info = FSH.Layout.infoBox(responseText);
		var itemCellElement = target.parentNode; //FSH.System.findNode('//td[@title="' + itemID + '"]');
		if (info.search('You successfully took the item into your backpack') !== -1) {
			itemCellElement.innerHTML = '<span style="color:green; font-weight:bold;">Taken</span>';
		} else if (info!=='') {
			itemCellElement.innerHTML = '<span style="color:red; font-weight:bold;">Error:' + info + '</span>';
		} else {
			itemCellElement.innerHTML = 'Weird Error: check the Tools>Error Console';
			console.log('Post the previous HTML and the following message to the GitHub or to the forum to help us debug this error');
			console.log(callback.url);
		}
	},

	addHistoryWidgets: function() { // Legacy
		var textArea = FSH.System.findNode('//textarea[@name="history"]');
		if (!textArea) {return;}
		textArea.value = textArea.value.replace(/<br \/>/ig,'');
		var textAreaDiv = textArea.parentNode;
		var bioPreviewHTML = FSH.System.convertTextToHtml(textArea.value);
		var newDiv = document.createElement('div');
		textAreaDiv.appendChild(newDiv);
		newDiv.innerHTML = '<table align="center" width="325" border="1"><tbody>' +
			'<tr><td style="text-align:center;color:#7D2252;background-color:#CD9E4B">Preview</td></tr>' +
			'<tr><td align="left" width="325"><span style="font-size:small;" findme="biopreview">' + bioPreviewHTML +
			'</span></td></tr></tbody></table>';

		document.getElementById('textInputBox').addEventListener('keyup', FSH.guild.updateHistoryCharacters, true);
	},

	updateHistoryCharacters: function() { // Legacy
		var textArea = FSH.System.findNode('//textarea[@id="textInputBox"]');
		var previewArea = FSH.System.findNode('//span[@findme="biopreview"]');
		var bioPreviewHTML = FSH.System.convertTextToHtml(textArea.value);
		previewArea.innerHTML = bioPreviewHTML;
	},

	injectRPUpgrades: function() {  //jquery
		var injectHere = $('b:contains("Guild Reputation")').closest('table')
			.find('tr:eq(10) > td:first');
		injectHere.attr('align','center');
		injectHere.html('<span id="warningMessage" style="color:green;">' +
			'Gathering active buffs ... please wait ... </span>');
		$.get('index.php?cmd=profile', FSH.guild.parseProfileAndPostWarnings);
	},

	parseProfileAndPostWarnings: function(responseText) {//jquery
		var doc = FSH.System.createDocument(responseText);
		$(doc).find('img[src*="/skills/"]').each(function(){
				var onmouseover = $(this).data('tipped');
				var buffRE = /<center><b>([ a-zA-Z]+)<\/b>\s\(Level: (\d+)\)/
					.exec(onmouseover);

				if (!buffRE) { return true; } // same as continue in a for loop
				var buffName = buffRE[1];
				var buffLevel = buffRE[2];
				$('a[data-tipped*="' + buffName + ' Level ' + buffLevel + '"]')
					.each(function(){
						$(this).parent()
							.append('<br><nobr><span style="color:red;">' +
							buffName + ' ' + buffLevel +
							' active</span></nobr>');
					});
			});
		var warningMessage = $('#warningMessage');
		warningMessage.html('Done');
		warningMessage.attr('style','color:blue');
	},

};

FSH.upgrades = { // Legacy

	storePlayerUpgrades: function() { // Legacy
		var alliesText = FSH.System.findNode('//td[.="+1 Max Allies"]');
		var alliesRatio = alliesText.nextSibling.nextSibling.nextSibling.nextSibling;
		if (alliesRatio) {
			var alliesValueRE = /(\d+) \/ 115/;
			var alliesValue = alliesValueRE.exec(alliesRatio.innerHTML)[1]*1;
			FSH.System.setValue('alliestotal',alliesValue+5);
		}
		var enemiesText = FSH.System.findNode('//td[.="+1 Max Enemies"]');
		var enemiesRatio = enemiesText.nextSibling.nextSibling.nextSibling.nextSibling;
		if (enemiesRatio) {
			var enemiesValueRE = /(\d+) \/ 115/;
			var enemiesValue = enemiesValueRE.exec(enemiesRatio.innerHTML)[1]*1;
			FSH.System.setValue('enemiestotal',enemiesValue+5);
		}
		FSH.upgrades.injectPoints();
	},

	injectPoints: function() { // jquery
		FSH.upgrades.currentFSP = FSH.System.intValue($('#statbar-fsp').text());
		FSH.upgrades.injectUpgradeHelper(0, 'Current');
		FSH.upgrades.injectUpgradeHelper(1, 'Maximum');
		$('#pCC td')
			.has('input[name="upgrade_id"][value="3"]')
			.html('<a href="' + FSH.System.server +
				'?cmd=marketplace">Sell at Marketplace</a>');
	},

	injectUpgradeHelper: function(value, type) { // jquery
		var theCells = $('#pCC tr')
			.has('input[name="upgrade_id"][value="' + value + '"]')
			.find('td');
		var cell = theCells.first();
		cell.append(' <span style="color:blue" ' +
			'id="totalStam" type="' + type + '"></span>');
		var amountRE = new RegExp('\\+(\\d+) ' + type + ' Stamina');
		var amount = cell.text().match(amountRE)[1];
		$('input[name="quantity"]', theCells)
			.attr('stamtype', type)
			.attr('amount', amount)
			.attr('cost', theCells.eq(1).text())
			.keyup(FSH.upgrades.updateStamCount);
	},

	updateStamCount: function(evt) { // jquery
		var target = $(evt.target);
		var amount = target.attr('amount');
		var cost = target.attr('cost');
		var quantity = target.val();
		//cap the value if the user goes over his current FSP
		var color = 'red';
		var extraStam = Math.floor(FSH.upgrades.currentFSP / cost) * amount;
		if (quantity * cost <= FSH.upgrades.currentFSP) {
			extraStam = quantity * amount;
			color = 'blue';
		}
		$('#pCC span[id="totalStam"][type="' + target.attr('stamtype') + '"]')
			.css('color', color)
			.html('(+' + extraStam + ' stamina)');
	},

};

FSH.newGuildLog = { // Legacy

	injectNewGuildLog: function(content){ // Legacy

		FSH.ga.start('JS Perf', 'injectNewGuildLog');

		if (!content) {content=FSH.Layout.notebookContent();}

		FSH.newGuildLog.setupGuildLogFilters();

		//store the time zone for use in processing date/times
		var gmtOffsetMinutes = (new Date()).getTimezoneOffset();
		FSH.newGuildLog.gmtOffsetMilli = gmtOffsetMinutes * 60 * 1000;

		//find the time the guild log was stored last
		FSH.newGuildLog.storedGuildLog = FSH.System.getValueJSON('storedGuildLog');
		if (FSH.newGuildLog.storedGuildLog) {
			FSH.Helper.lastStoredGuildLogMessage = FSH.newGuildLog.storedGuildLog.logMessage[0].logMessage;
			FSH.Helper.lastStoredGuildLogMessagePostTime = FSH.newGuildLog.storedGuildLog.logMessage[0].postDateAsLocalMilli;
		}

		FSH.Helper.newStoredGuildLog = {logMessage:[]};

		var newhtml='<table cellspacing="0" cellpadding="0" border="0" width="100%">' +
			'<tr style="background-color:#cd9e4b"><td width="80%" nobr><b>&nbsp;Guild Log Version 3</b></td>' +
				'<td><span id="Helper:ResetNewGuildLog" style="text-decoration:underline;cursor:pointer;color:blue;">Reset</span>' +
				'&nbsp;<a href="index.php?cmd=guild&subcmd=log"><span style="color:blue;">Old Guild Log</span></a></td></tr>' +
			'<tr><td colspan=2>' +
				'<table><tbody><tr><td><b>Filters:</b></td>' +
				'<td><table><tbody><tr><td>';
		for (var i=0; i<FSH.Helper.guildLogFilters.length; i += 1) {
			var guildLogFilterID = FSH.Helper.guildLogFilters[i].id;
			FSH.Helper[guildLogFilterID] = FSH.System.getValue(guildLogFilterID);
			newhtml += i % 5 === 0 ? '</td></tr><tr><td>' : '';
			newhtml+='&nbsp;' +FSH.Helper.guildLogFilters[i].type+ 's:<input id="'+guildLogFilterID+'" type="checkbox" linkto="'+guildLogFilterID+'"' +
					(FSH.Helper[guildLogFilterID]?' checked':'') + '/>';
		}
		newhtml += '</td></tr><tr><td>&nbsp;<span id=GuildLogSelectAll>[Select All]</span>&nbsp;<span id=GuildLogSelectNone>[Select None]</span>' +
				'</td></tr></tbody></table></td></tr>'+
			'<tr><td colspan=2><span style="color:blue;" id="Helper:NewGuildLogLoadingMessage">Loading Page 1 ...</span></td></tr>' +
			'</tbody></table>';
		newhtml += '<table width="100%" cellspacing="0" cellpadding="2" border="0" id="Helper:GuildLogInjectTable"><tbody>' +
			'<tr><td width="16" bgcolor="#cd9e4b"></td><td width="20%" bgcolor="#cd9e4b">Date</td><td width="80%" bgcolor="#cd9e4b">Message</td></tr>' +
			'<tr><td class="divider" colspan="3"></td></tr>' +
			'</tbody></table>';
		content.innerHTML=newhtml;

		document.getElementById('Helper:ResetNewGuildLog').addEventListener('click', FSH.newGuildLog.resetNewGuildLog, true);

		var guildLogInjectTable = document.getElementById('Helper:GuildLogInjectTable');
		var loadingMessageInjectHere = document.getElementById('Helper:NewGuildLogLoadingMessage');

		for (i=0; i<FSH.Helper.guildLogFilters.length; i += 1) {
			document.getElementById(FSH.Helper.guildLogFilters[i].id).addEventListener('click', FSH.newGuildLog.toggleGuildLogFilterVisibility, true);
		}
		document.getElementById('GuildLogSelectAll').addEventListener('click', FSH.newGuildLog.guildLogSelectFilters, true);
		document.getElementById('GuildLogSelectNone').addEventListener('click', FSH.newGuildLog.guildLogSelectFilters, true);

		var oldMaxPagesToFetch = FSH.System.getValue('oldNewGuildLogHistoryPages');
		oldMaxPagesToFetch = oldMaxPagesToFetch ? parseInt(oldMaxPagesToFetch,10) : 100;
		var maxPagesToFetch = parseInt(FSH.System.getValue('newGuildLogHistoryPages') - 1,10);
		FSH.System.setValue('oldNewGuildLogHistoryPages', maxPagesToFetch);
		var completeReload = false;
		if (maxPagesToFetch > oldMaxPagesToFetch) {completeReload = true;}
		//fetch guild log page and apply filters
		FSH.System.xmlhttp('index.php?cmd=guild&subcmd=log', FSH.newGuildLog.parseGuildLogPage,
			{'guildLogInjectTable': guildLogInjectTable, 'pageNumber': 1, 'loadingMessageInjectHere': loadingMessageInjectHere, 'maxPagesToFetch': maxPagesToFetch, 'completeReload': completeReload});

		FSH.ga.end('JS Perf', 'injectNewGuildLog');

	},

	setupGuildLogFilters: function() { // Native - but WTF?
		FSH.Helper.guildLogFilters = [
			{'id':'showRecallMessages', 'type':'Store/Recall'},
			{'id':'showRelicMessages', 'type':'Relic'},
			{'id':'showMercenaryMessages', 'type':'Mercenary'},
			{'id':'showGroupCombatMessages', 'type':'Group Combat'},
			{'id':'showDonationMessages', 'type':'Donation'},
			{'id':'showRankingMessages', 'type':'Ranking'},
			{'id':'showGvGMessages', 'type':'GvG'},
			{'id':'showTaggingMessages', 'type':'Tag/UnTag'},
			{'id':'showTitanMessages', 'type':'Titan'}
		];
	},

	resetNewGuildLog: function() { // Native
		FSH.System.setValueJSON('storedGuildLog', '');
		location.reload();
	},

	toggleGuildLogFilterVisibility: function(evt) { // Legacy
		var filterID = evt.target.id;
		var filterChecked = evt.target.checked;
		var logRows = FSH.System.findNodes('//tr[@id="GuildLogFilter:' + filterID + '"]');
		if (logRows) {
			for (var i=0;i<logRows.length;i += 1) {
				var logRow = logRows[i];
				if (filterChecked) {
					logRow.style.display = '';
					logRow.style.visibility = 'visible';
				} else {
					logRow.style.display = 'none';
					logRow.style.visibility = 'hidden';
				}
			}
		}
		FSH.System.setValue(filterID,filterChecked);
		FSH.Helper[filterID] = filterChecked;
	},

	guildLogSelectFilters: function(evt) { // Legacy
		var checkedValue = evt.target.id==='GuildLogSelectAll';
		for (var i=0; i<FSH.Helper.guildLogFilters.length; i += 1) {
			FSH.System.setValue(FSH.Helper.guildLogFilters[i].id, checkedValue);
			document.getElementById(FSH.Helper.guildLogFilters[i].id).checked = checkedValue;
		}
		var logRows = FSH.System.findNodes('//tr[contains(@id,"GuildLogFilter:")]');
		if (logRows) {
			for (i=0;i<logRows.length;i += 1) {
				var logRow = logRows[i];
				var rowID = logRow.getAttribute('id');
				if (checkedValue) {
					logRow.style.display = '';
					logRow.style.visibility = 'visible';
				} else if (rowID !== 'GuildLogFilter:Unknown') {
					logRow.style.display = 'none';
					logRow.style.visibility = 'hidden';
				}
			}
		}
	},

	parseGuildLogPage: function(responseText, callback) { // Hybrid - Evil!
		var pageNumber = callback.pageNumber;
		var maxPagesToFetch = callback.maxPagesToFetch;
		var completeReload = callback.completeReload;
		var guildLogInjectTable = callback.guildLogInjectTable;
		var loadingMessageInjectHere = callback.loadingMessageInjectHere;
		var doc=FSH.System.createDocument(responseText);

		var logTable = $(doc).find('table.width_full:first');

		//if the whole first page is new, then likely that the stored log needs to be refreshed, so go ahead and do so
		if (pageNumber === 1) {
			var lastRowInTable = logTable.find('tr>td:not(.divider)').parent(':last');
			var lastRowCellContents = lastRowInTable.find('td:eq(1)').text();
			var lastRowPostDateAsDate = FSH.System.parseDate(lastRowCellContents);
			var lastRowPostDateAsLocalMilli = lastRowPostDateAsDate.getTime() - FSH.newGuildLog.gmtOffsetMilli;
			if (lastRowPostDateAsLocalMilli > FSH.Helper.lastStoredGuildLogMessagePostTime) {completeReload = true;}
		} else {
			completeReload = false;
		}

		var localLastCheckMilli;
		var localDateMilli;
		var enableLogColoring = FSH.System.getValue('enableLogColoring');
		if (enableLogColoring) {
			var lastCheckScreen = 'lastGuildLogCheck';
			localLastCheckMilli=FSH.System.getValue(lastCheckScreen);
			if (!localLastCheckMilli) {
				localLastCheckMilli = Date.now();
			}
			localDateMilli = Date.now();
		}

		logTable.find('tr:gt(0):has(td:not(.divider))').each(function(){
			var cellContents = $(this).children('td:eq(1)').text();
			if (!cellContents || cellContents === 'Date' ||
				cellContents.split(' ').length === 1) {return;}
			var postDateAsDate = FSH.System.parseDate(cellContents);
			var postDateAsLocalMilli = postDateAsDate.getTime() -
				FSH.newGuildLog.gmtOffsetMilli;

			// if the post date is the same as last one in the stored list and the
			// message is the same, then break out
			// and start appending the stored values instead of parsing.
			FSH.Helper.stopProcessingLogPages = false;
			if (postDateAsLocalMilli ===
				FSH.Helper.lastStoredGuildLogMessagePostTime &&
				$(this).html() === FSH.Helper.lastStoredGuildLogMessage &&
				!completeReload) {
				FSH.Helper.stopProcessingLogPages = true;
				return false;
			}
			var displayRow = true;
			var rowTypeID = 'GuildLogFilter:Unknown';
			var messageText = $(this).children('td:eq(2)').text();
			//if recall message, check to see if showRecallMessages is checked.
			if (messageText.search('recalled the item') !== -1 ||
				messageText.search('took the item') !== -1 ||
				messageText.search('auto-returned the') !== -1 ||
				messageText.search('stored the item') !== -1) {
				if (!FSH.Helper.showRecallMessages) {displayRow = false;}
				rowTypeID = 'GuildLogFilter:showRecallMessages';
			}
			//Tag/Untag (showTaggingMessages)
			else if (messageText.search('has added flags to some of guild\'s stored items costing a total of') !== -1 ||
				messageText.search('has removed flags to the guild\'s stored items.') !== -1) {
				if (!FSH.Helper.showTaggingMessages) {displayRow = false;}
				rowTypeID = 'GuildLogFilter:showTaggingMessages';
			}
			//Relic messages (showRelicMessages)
			else if (messageText.search('relic. This relic now has an empower level of') !== -1 ||
				messageText.search(/ empowered the .+ relic/) !== -1 ||
				messageText.search('relic. The relic empower level has been reset to zero.') !== -1 ||
				messageText.search('failed to capture the relic') !== -1 ||
				messageText.search('captured the relic') !== -1 ||
				messageText.search('captured your relic') !== -1 ||
				messageText.search('has captured the undefended relic') !== -1 ||
				messageText.search('attempted to capture your relic') !== -1) {
				if (!FSH.Helper.showRelicMessages) {displayRow = false;}
				rowTypeID = 'GuildLogFilter:showRelicMessages';
			}
			//Mercenary messages (showMercenaryMessages)
			else if (messageText.search('disbanded a mercenary.') !== -1 ||
				messageText.search('hired the mercenary') !== -1) {
				if (!FSH.Helper.showMercenaryMessages) {displayRow = false;}
				rowTypeID = 'GuildLogFilter:showMercenaryMessages';
			}
			//Group Combat messages (showGroupCombatMessages)
			else if (messageText.search('has disbanded one of their groups') !== -1 ||
				messageText.search(/A group from your guild was (.*) in combat./) !== -1) {
				if (!FSH.Helper.showGroupCombatMessages) {displayRow = false;}
				rowTypeID = 'GuildLogFilter:showGroupCombatMessages';
			}
			//Donation messages (showDonationMessages)
			else if (messageText.search(/deposited ([,0-9]+) FallenSword Points into the guild./) !== -1 ||
				messageText.search(/deposited ([,0-9]+) gold into the guild bank/) !== -1) {
				if (!FSH.Helper.showDonationMessages) {displayRow = false;}
				rowTypeID = 'GuildLogFilter:showDonationMessages';
			}
			//Ranking messages (showRankingMessages)
			else if (messageText.search('has added a new rank entitled') !== -1 ||
				messageText.search('has deleted the rank') !== -1 ||
				messageText.search('has requested to join the guild') !== -1 ||
				messageText.search('has invited the player') !== -1 ||
				messageText.search('has officially joined the guild') !== -1 ||
				messageText.search('has been kicked from the guild by') !== -1 ||
				messageText.search('has left the guild') !== -1 ||
				messageText.search('has been assigned the rank') !== -1) {
				if (!FSH.Helper.showRankingMessages) {displayRow = false;}
				rowTypeID = 'GuildLogFilter:showRankingMessages';
			}
			//GvG messages (showGvGMessages)
			else if (messageText.search('resulted in a draw. Your GvG rating and Guild RP was unaffected.') !== -1 ||
				messageText.search(/resulted in (.*) with a final score of/) !== -1 ||
				messageText.search('has just initiated a conflict with the guild') !== -1 ||
				messageText.search('has initiated a conflict with your guild') !== -1 ||
				messageText.search('is participating in the conflict against the guild') !== -1) {
				if (!FSH.Helper.showGvGMessages) {displayRow = false;}
				rowTypeID = 'GuildLogFilter:showGvGMessages';
			}
			// Titan messages (showTitanMessages)
			else if (messageText.search('from your guild\'s contribution to the defeat of the titan') !== -1 ||
				messageText.search('a 7 day cooldown has been activated on your guild for this titan') !== -1 ||
				messageText.search('bought the Titan Reward item') !== -1) {
				if (!FSH.Helper.showTitanMessages) {displayRow = false;}
				rowTypeID = 'GuildLogFilter:showTitanMessages';
			}

			//display the row or effectively hide it
			var newRow = $(this).clone(true);
			if (!displayRow) {
				newRow.css('display','none')
					.css('visibility','hidden');
			}
			newRow.id = rowTypeID;
			newRow.appendTo(guildLogInjectTable);
			var postAge = (localDateMilli - postDateAsLocalMilli)/(1000*60);
			if (enableLogColoring && postDateAsLocalMilli > localLastCheckMilli) {
				newRow.css('backgroundColor','#F5F298');
			}
			else if (enableLogColoring && postAge > 20 &&
				postDateAsLocalMilli <= localLastCheckMilli) {
				newRow.css('backgroundColor', '#CD9E4B');
			}
			var newLogMessage = {
				postDateAsLocalMilli: postDateAsLocalMilli,
				rowTypeID: rowTypeID,
				logMessage: newRow.html()
			};
			FSH.Helper.newStoredGuildLog.logMessage.push(newLogMessage);
			//create following spacer row
			var spacerRow = $('<tr></tr>');
			if (!displayRow) {
				spacerRow.css('display','none')
					.css('visibility','hidden');
			}
			spacerRow.id = rowTypeID;
			spacerRow.appendTo(guildLogInjectTable);
			spacerRow.html('<td class="divider" colspan="3"></td>');
			newLogMessage = {
				postDateAsLocalMilli: postDateAsLocalMilli,
				rowTypeID: rowTypeID,
				logMessage: spacerRow.html()
			};
			FSH.Helper.newStoredGuildLog.logMessage.push(newLogMessage);
		});

		if (FSH.Helper.stopProcessingLogPages) {
			loadingMessageInjectHere.innerHTML = 'Processing stored logs ...';
			for (var i=0;i<FSH.newGuildLog.storedGuildLog.logMessage.length;i += 1) {
				var logMessageArrayItem = FSH.newGuildLog.storedGuildLog.logMessage[i];
				var newRow = document.createElement('TR');
				var displayRow = true;
				for (var j=0; j<FSH.Helper.guildLogFilters.length; j += 1) {
					var guildLogFilterID = FSH.Helper.guildLogFilters[j].id;
					var rowTypeID = 'GuildLogFilter:' + guildLogFilterID;
					if (logMessageArrayItem.rowTypeID === rowTypeID) {
						displayRow = FSH.Helper[guildLogFilterID];
						break;
					}
				}
				newRow.style.display = '';
				newRow.style.visibility = '';
				if (!displayRow) {
					newRow.style.display = 'none';
					newRow.style.visibility = 'hidden';
				}
				newRow.id = logMessageArrayItem.rowTypeID;
				guildLogInjectTable.appendChild(newRow);
				newRow.innerHTML = logMessageArrayItem.logMessage;
				var postAge = (localDateMilli -
					logMessageArrayItem.postDateAsLocalMilli)/(1000*60);
				if (enableLogColoring && newRow.cells[2] &&
					logMessageArrayItem.postDateAsLocalMilli > localLastCheckMilli) {
					newRow.style.backgroundColor = '#F5F298';
				}
				else if (enableLogColoring && newRow.cells[2] && postAge > 20 &&
					logMessageArrayItem.postDateAsLocalMilli <= localLastCheckMilli) {
					newRow.style.backgroundColor = '#CD9E4B';
				}
				var newLogMessage = {
					postDateAsLocalMilli: logMessageArrayItem.postDateAsLocalMilli,
					rowTypeID: logMessageArrayItem.rowTypeID,
					logMessage: logMessageArrayItem.logMessage
				};
				FSH.Helper.newStoredGuildLog.logMessage.push(newLogMessage);
			}
		}

		var page = $(doc).find('input[name="page"]');
		var maxPage = page.parent().html().match(/of&nbsp;(\d*)/)[1];

		//fetch the next page (if necessary)
		if (pageNumber < maxPage && pageNumber < maxPagesToFetch &&
			!FSH.Helper.stopProcessingLogPages) {
			var nextPage = parseInt(pageNumber+1,10);
			loadingMessageInjectHere.innerHTML = 'Loading Page ' + (nextPage + 1) +
				' of ' + Math.floor(maxPagesToFetch+1,maxPage) + '...';
			FSH.System.xmlhttp('index.php?cmd=guild&subcmd=log&subcmd2=&page=' +
				nextPage + '&search_text=', FSH.newGuildLog.parseGuildLogPage,
				{'guildLogInjectTable': guildLogInjectTable,
					'pageNumber': nextPage,
					'loadingMessageInjectHere': loadingMessageInjectHere,
					'maxPagesToFetch': maxPagesToFetch,
					'completeReload': completeReload});
		} else {
			loadingMessageInjectHere.innerHTML = 'Loading Complete.';
			FSH.logs.addGuildLogWidgets();
			FSH.System.setValueJSON('storedGuildLog', FSH.Helper.newStoredGuildLog);
			var now = Date.now();
			FSH.System.setValue('lastGuildLogCheck', now.toString());
		}
	},

};

FSH.activeWantedBounties = { // Legacy

	prepareBountyData: function() { // jQuery
		if (FSH.Helper.enableWantedList) {
			$('#pCR').prepend('<div class="minibox"><span id="Helper:' +
				'WantedListPlaceholder"></span></div>');
		}
		if (FSH.Helper.enableActiveBountyList) {
			$('#pCR').prepend('<div class="minibox"><span id="Helper:' +
				'BountyListPlaceholder"></span></div>');
		}
		FSH.activeWantedBounties.retrieveBountyInfo(
			FSH.Helper.enableActiveBountyList,
			FSH.Helper.enableWantedList);
	},

	retrieveBountyInfo: function(enableActiveBountyList, enableWantedList) { // Legacy
		var bountyList = FSH.System.getValueJSON('bountyList');
		var wantedList = FSH.System.getValueJSON('wantedList');
		var bountyListRefreshTime = FSH.System.getValue('bountyListRefreshTime');
		var bwNeedsRefresh = FSH.System.getValue('bwNeedsRefresh');

		bountyListRefreshTime *= 1000;
		if (!bwNeedsRefresh) {
			if (bountyList) {
				if (Date.now() -
					bountyList.lastUpdate.getTime() >
					bountyListRefreshTime) {
					bwNeedsRefresh = true; // invalidate cache
				}
			}
			if (wantedList && !bwNeedsRefresh) {
				if (Date.now() -
					wantedList.lastUpdate.getTime() >
					bountyListRefreshTime) {
					bwNeedsRefresh = true; // invalidate cache
				}
			}
		}

		if (!bountyList || !wantedList || bwNeedsRefresh &&
			(enableActiveBountyList || enableWantedList)) {
			wantedList = {};
			wantedList.bounty = [];
			wantedList.isRefreshed = true;
			wantedList.lastUpdate = new Date();
			wantedList.wantedBounties = false;
			FSH.activeWantedBounties.activeBountyListPosted = false;

			FSH.System.xmlhttp(
				'index.php?cmd=bounty&page=1',
				FSH.activeWantedBounties.parseBountyPageForWorld,
				{wantedList:wantedList}
			);
		} else {
			if (enableWantedList) {
				wantedList.isRefreshed = false;
				FSH.activeWantedBounties.injectWantedList(wantedList);
			}
			if (enableActiveBountyList) {
				bountyList.isRefreshed = false;
				FSH.activeWantedBounties.injectBountyList(bountyList);
			}
		}
	},

	parseBountyPageForWorld: function(details, callback) { // Native
		var doc = FSH.System.createDocument(details);
		var enableActiveBountyList = FSH.Helper.enableActiveBountyList;
		var enableWantedList = FSH.Helper.enableWantedList;
		FSH.System.setValue('bwNeedsRefresh', false);
		if (enableWantedList) {
			FSH.activeWantedBounties.getWantedBountyList(doc, callback);
		}
		if (enableActiveBountyList && !FSH.activeWantedBounties.activeBountyListPosted) {
			FSH.activeWantedBounties.getActiveBountyList(doc);
		}
	},

	getWantedBountyList: function(doc, callback) { // Legacy
		var page = FSH.System.findNode('//input[@name="page"]', doc, $('body'));
		var curPage = parseInt(page.value,10);
		var maxPage = page.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1];
		var activeTable = FSH.System.findNode('//table[@width = "630" and ' +
			'contains(.,"Target")]', doc);
		var wantedNames = FSH.System.getValue('wantedNames');
		var wantedArray = wantedNames.split(',');
		var wantedList = callback.wantedList;
		if (activeTable) {
			for (var i = 1; i < activeTable.rows.length - 2; i+=2) {
				var target = activeTable.rows[i].cells[0].firstChild
					.firstChild.firstChild.textContent;
				if (target === '[ No bounties available. ]') {break;}
				for (var j = 0; j < wantedArray.length; j += 1) {
					if (target === wantedArray[j].trim() || wantedArray.indexOf('*') !== -1) {
						wantedList.wantedBounties = true;
						var bounty = {};
						bounty.target = target;
						bounty.link = activeTable.rows[i].cells[0]
							.firstChild.firstChild.getAttribute('href');
						bounty.lvl = activeTable.rows[i].cells[0]
							.firstChild.firstChild.nextSibling.textContent
								.replace(/\[/, '').replace(/\]/, '');
						bounty.offerer = activeTable.rows[i].cells[1]
							.firstChild.firstChild.firstChild.textContent;
						bounty.reward = activeTable.rows[i].cells[2]
							.textContent;
						bounty.rewardType = activeTable.rows[i].cells[2]
							.firstChild.firstChild.firstChild.firstChild
							.nextSibling.firstChild.title;
						bounty.xpLoss = activeTable.rows[i].cells[3]
							.textContent;
						bounty.posted = activeTable.rows[i].cells[4]
							.textContent;
						bounty.tickets = activeTable.rows[i].cells[5]
							.textContent;
						if (activeTable.rows[i].cells[6].textContent
							.trim() === '[active]') {
							bounty.active = true;
							bounty.accept = '';
						}
						else if (activeTable.rows[i].cells[6].textContent
							.trim() !== '[n/a]') { // TODO
							bounty.active = false;
							bounty.accept = activeTable.rows[i].cells[6]
								.firstChild.firstChild
								.getAttribute('onclick');
						}
						wantedList.bounty.push(bounty);
					}
				}
			}
		}
		if (curPage < maxPage) {
			FSH.System.xmlhttp('index.php?cmd=bounty&page=' + (curPage + 1),
				FSH.activeWantedBounties.parseBountyPageForWorld, {wantedList:wantedList});
		} else {
			FSH.activeWantedBounties.injectWantedList(wantedList);
		}
	},

	getActiveBountyList: function(doc) { // Legacy
		var activeTable = FSH.System.findNode('//table[@width = 620]', doc);
		var bountyList = {};
		bountyList.bounty = [];
		bountyList.isRefreshed = true;
		bountyList.lastUpdate = new Date();

		if (activeTable) {
			if (!/No bounties active/.test(activeTable.rows[1].cells[0]
				.innerHTML)) {
				bountyList.activeBounties = true;
				for (var i = 1; i < activeTable.rows.length - 2; i+=2) {
					var bounty = {};
					bounty.target = activeTable.rows[i].cells[0].firstChild
						.firstChild.firstChild.textContent;
					bounty.link = activeTable.rows[i].cells[0].firstChild
						.firstChild.getAttribute('href');
					bounty.lvl = activeTable.rows[i].cells[0].firstChild
						.firstChild.nextSibling.textContent
						.replace(/\[/, '').replace(/\]/, '');
					bounty.reward = activeTable.rows[i].cells[2]
						.textContent;
					bounty.rewardType = activeTable.rows[i].cells[2]
						.firstChild.firstChild.firstChild.firstChild
						.nextSibling.firstChild.title;
					bounty.posted = activeTable.rows[i].cells[3]
						.textContent;
					bounty.xpLoss = activeTable.rows[i].cells[4]
						.textContent;
					bounty.progress = activeTable.rows[i].cells[5]
						.textContent;

					bountyList.bounty.push(bounty);
				}
			}
			else {
				bountyList.activeBounties = false;
			}
		}
		FSH.activeWantedBounties.injectBountyList(bountyList);
		FSH.activeWantedBounties.activeBountyListPosted = true;
	},

	injectBountyList: function(bountyList) { // Native
		FSH.System.setValueJSON('bountyList', bountyList);
		var injectHere = document
			.getElementById('Helper:BountyListPlaceholder');
		var displayList = document.createElement('TABLE');
		displayList.cellPadding = 1;
		displayList.width = 125;

		var aRow = displayList.insertRow(0); //bountyList.rows.length
		var aCell = aRow.insertCell(0);
		var output = '<h3>Active Bounties</h3><ol style="color:#FFF380;font-' +
			'size:10px;list-style-type:decimal;margin-left:1px;margin-top:' +
			'1px;margin-bottom:1px;padding-left:20px;"><nobr><span id="' +
			'Helper:resetBountyList" style=" font-size:8px; cursor:pointer; ' +
			'text-decoration:underline;">Reset</span><nobr><br>';

		if (bountyList.activeBounties === false) {
			output += '</ol> \f <ol style="color:orange;font-size:10px;list-' +
				'style-type:decimal;margin-left:1px;margin-top:1px;margin-' +
				'bottom:1px;padding-left:10px;">[No Active bounties]</ol>';
		}
		else {
			for (var i = 0; i < bountyList.bounty.length; i += 1) {
				var mouseOverText = '<div>Level:  ' + bountyList.bounty[i].lvl +
					'<br/>Reward: ' + bountyList.bounty[i].reward + ' ' +
					bountyList.bounty[i].rewardType +
					'<br/>XP Loss Remaining: ' + bountyList.bounty[i].xpLoss +
					'<br/>Progress:  ' + bountyList.bounty[i].progress +
					'</div>';

				output += '<li style="padding-bottom:0px;"><a style="color:' +
					'red;font-size:10px;"href="' + FSH.System.server +
					'index.php?cmd=attackplayer&mode=bounty&target_username=' +
					bountyList.bounty[i].target + '">[a]</a>&nbsp;<a style="' +
					'color:#A0CFEC;font-size:10px;"href="' + FSH.System.server +
					'index.php?cmd=message&target_player=' +
					bountyList.bounty[i].target + '">[m]</a> &nbsp;<a href="' +
					bountyList.bounty[i].link + '" class="tip-static" ' +
					'data-tipped="' + mouseOverText + '" style="color:' +
					'#FFF380;font-size:10px;">' + bountyList.bounty[i].target +
					'</a></li>';
			}
		}

		aCell.innerHTML = output;
		var breaker=document.createElement('BR');
		injectHere.parentNode.insertBefore(breaker, injectHere.nextSibling);
		injectHere.parentNode.insertBefore(displayList, injectHere.nextSibling);
		document.getElementById('Helper:resetBountyList')
			.addEventListener('click', FSH.activeWantedBounties.resetBountyList, true);
	},

	resetBountyList: function() { // Native
		FSH.System.setValueJSON('bountyList', null);
		location.reload();
	},

	injectWantedList: function(wantedList) { // Native
		FSH.System.setValueJSON('wantedList', wantedList);
		var injectHere = document
			.getElementById('Helper:WantedListPlaceholder');
		var displayList = document.createElement('TABLE');
		displayList.cellPadding = 3;
		displayList.width = 125;

		var aRow = displayList.insertRow(0);
		var aCell = aRow.insertCell(0);
		var output = '<h3>Wanted Bounties</h3><ol style="color:#FFF380;font-' +
			'size:10px;list-style-type:decimal;margin-left:1px;margin-top:' +
			'1px;margin-bottom:1px;padding-left:12px;"><nobr> <span id="' +
			'Helper:resetWantedList" font-size:8px; cursor:pointer; text-' +
			'decoration:underline;">Reset</span></nobr><br>';

		if (wantedList.wantedBounties === false) {
			output += '</ol> \f <ol style="color:orange;font-size:10px;list-' +
				'style-type:decimal;margin-left:1px;margin-top:1px;margin-' +
				'bottom:1px;padding-left:7px;">[No wanted bounties]</ol>';
		}
		else {
			for (var i = 0; i < wantedList.bounty.length; i += 1) {
				var mouseOverText = '"<div style=\'text-align:center;width:' +
					'205px;\'>Target Level:  ' + wantedList.bounty[i].lvl +
					'<br/>Offerer: ' + wantedList.bounty[i].offerer +
					'<br/>Reward: ' + wantedList.bounty[i].reward + ' ' +
					wantedList.bounty[i].rewardType +
					'<br/>XP Loss Remaining: ' + wantedList.bounty[i].xpLoss +
					'<br/>Posted: ' + wantedList.bounty[i].posted +
					'<br/>Tickets Req.:  ' + wantedList.bounty[i].tickets;
				mouseOverText += '</div>" ';

				output += '<li style="padding-bottom:0px;margin-left:5px;">';
				output += '<a style= "font-size:10px;';
				if (wantedList.bounty[i].accept) {
					output += 'color:rgb(0,255,0); cursor:pointer; ' +
						'text-decoration:underline blink;" title = "Accept ' +
						'Bounty" onclick="' + wantedList.bounty[i].accept +
						'">[a]</a>&nbsp;';
				} else {
					output += 'color:red;" href="' + FSH.System.server +
						'index.php?cmd=attackplayer&target_username=' +
						wantedList.bounty[i].target + '">[a]</a>&nbsp;';
				}
				output += '<a style="color:#A0CFEC;font-size:10px;"href="j' +

					'avascript:openQuickMsgDialog(\'' + wantedList.bounty[i].target +
					'\');' +

					'">[m]</a> &nbsp;<a class="tip-static" data-tipped=' +
					mouseOverText +
					'style="color:#FFF380;font-size:10px;" href="' +
					wantedList.bounty[i].link + '">' +
					wantedList.bounty[i].target +'</a></li>';
			}
		}

		aCell.innerHTML = output;
		var breaker=document.createElement('BR');
		injectHere.parentNode.insertBefore(breaker, injectHere.nextSibling);
		injectHere.parentNode.insertBefore(displayList, injectHere.nextSibling);
		document.getElementById('Helper:resetWantedList')
			.addEventListener('click', FSH.activeWantedBounties.resetWantedList, true);
	},

	resetWantedList: function() { // Native
		FSH.System.setValueJSON('wantedList', null);
		location.reload();
	},

};

FSH.scoutTower = { // Legacy

	injectTitan: function() { // Legacy
		FSH.System.xmlhttp('index.php?cmd=guild&subcmd=scouttower',
			FSH.scoutTower.getScoutTowerDetails);
	},

	getScoutTowerDetails: function(responseText) { // Legacy
		var doc=FSH.System.createDocument(responseText);
		var scoutTowerTable = FSH.System.findNode('//table[tbody/tr/td/img[contains(@src,"/banners/scouttower.png")]]', doc);
		if (scoutTowerTable) {
			var titanTable = FSH.System.findNode('//table[tbody/tr/td/img[contains(@src,"/banners/titankilllog.png")]]');
			var newRow = titanTable.insertRow(0);
			var newCell = newRow.insertCell(0);
			newCell.align = 'center';
			newCell.innerHTML = scoutTowerTable.rows[1].cells[0].innerHTML + '<br><br>' ;
			newRow = titanTable.insertRow(1);
			newCell = newRow.insertCell(0);
			newCell.innerHTML = scoutTowerTable.rows[8].cells[0].innerHTML;
		}
		FSH.scoutTower.injectScouttowerBuffLinks();
	},

	injectScouttower: function() { // Legacy
		FSH.scoutTower.injectScouttowerBuffLinks();
		var titanTable = FSH.System.findNode('//table[@width="500"]');
		for (var i = 1; i < titanTable.rows.length; i += 1) {
			var aRow = titanTable.rows[i];
			if (aRow.cells[2]) {
				var titanHP = aRow.cells[2].textContent;
				if (titanHP.search('-') !== -1) {break;}
				var guildKills = aRow.cells[3].textContent;
				if (guildKills) {
					var titanHPArray = titanHP.split('/');
					var currentHP = parseInt(titanHPArray[0], 10);
					var totalHP = parseInt(titanHPArray[1], 10);
					var currentNumberOfKills = totalHP - currentHP;
					var numberOfKillsToSecure = Math.ceil(totalHP/2 + 1);

					var titanString = '<span style="color:red;">' + (numberOfKillsToSecure - guildKills) + '</span> to secure';
					if (guildKills >= numberOfKillsToSecure) {
						titanString = 'Secured';
					} else if (numberOfKillsToSecure - guildKills > currentHP) {
						titanString = '<span style="color:red;">Cannot Secure</span>';
					}
					var killsPercent = (currentNumberOfKills === 0 ? 0 : guildKills * 100/currentNumberOfKills).toFixed(2);
					var killsTotPct = (guildKills * 100/totalHP).toFixed(2);
					aRow.cells[3].innerHTML += '<br><span style="color:blue;"> (' + killsPercent + '% Current <br>' +
					killsTotPct + '% Total<br>' + titanString + ')';
				}
			}
		}
	},

	injectScouttowerBuffLinks: function() { // Legacy
		var titanTables = FSH.System.findNodes('//table[tbody/tr/td/font[.="Guild Member"]]');
		var titanTable;
		if (titanTables) {
			for (var i = 0; i < titanTables.length; i += 1) {
				titanTable = titanTables[i];
				var shortList = [];
				if (titanTable.rows.length <= 1) {continue;}
				for (var j = 1; j < titanTable.rows.length; j += 1) {
					if (titanTable.rows[j].cells[1]) {
						var firstCell = titanTable.rows[j].cells[0];
						var playerID = /player_id=(\d+)/.exec(firstCell.innerHTML)[1];
						shortList.push(firstCell.textContent);
						firstCell.innerHTML += ' <a style="color:blue;font-size:10px;" ' +
							FSH.Layout.quickBuffHref(playerID) + '>[b]</a>';
					}
				}
				titanTable.rows[0].cells[0].innerHTML += ' <a style="color:blue;font-size:10px;">all</a>';
				var buffAllLink = titanTable.rows[0].cells[0].firstChild.nextSibling.nextSibling;
				buffAllLink.setAttribute('href',FSH.Layout.buffAllHref(shortList));
			}
		}
	},

};

FSH.trade = { // jQuery

	injectTrade: function() { // jQuery

		FSH.ga.start('JS Perf', 'injectTrade');

		var multiple = $('<tr id="fshSelectMultiple"></tr>');
		var myTd = $('<td colspan=6></td>');

		myTd.prepend('Select:&ensp;<span id="itemid-1" ' +
			'class="fshCheckAll fshLink fshNoWrap">All Items</span> &ensp;' +
			'<span id="itemid-2" ' +
			'class="fshCheckAll fshLink fshNoWrap">All Resources</span>');

		var sendClasses = FSH.System.getValue('sendClasses');
		var itemList = JSON.parse('[' + sendClasses + ']');

		for (var i = 0; i < itemList.length; i += 1) {
			myTd.append(' &ensp;<span id="itemid' + itemList[i][1] +'" class="' +
				'fshCheckAll fshLink fshNoWrap">' +
				itemList[i][0] + '</span>');
		}

		myTd.append(' &ensp;How&nbsp;many:<input id="fshSendHowMany" type="text" ' +
			'class="custominput" value="all" size=3 />');

		multiple.append(myTd);
		multiple.on('click', '.fshCheckAll', FSH.trade.toggleCheckAllPlants);

		$('table[id="item-list"]')
			.closest('tr')
			.before(multiple);

		FSH.ajax.inventory(true).done(FSH.trade.processTrade);

		FSH.ga.end('JS Perf', 'injectTrade');

	},

	processTrade: function(data) { // jQuery

		FSH.ga.start('JS Perf', 'processTrade');

		var fshHasST = false;

		var invItems = data.items.reduce(function(prev, curr) {
			if (curr.is_in_st) {fshHasST = true;}
			prev[curr.inv_id] = curr;
			return prev;
		}, {});

		/* Highlight items in ST */
		$('#item-list table').addClass(function() {
			var item = invItems[$(this).find('input').val()];
			return 'folderid' + item.folder_id +
				(fshHasST ? (item.is_in_st ? ' isInSTBorder' : ' tradeItemMargin') : '');
		});
		$('#item-list input').addClass(function() {
			var item = invItems[$(this).val()];
			return 'itemid' + item.item_id + ' itemtype' + item.type +
				(item.is_in_st ? ' isInST' : '');
		});

		var folders = $('<tr id="fshFolderSelect"></tr>');
		var folderTr = $('<td colspan=6></td>');
		//append main folder
		folderTr.append('<span id="folderid0" class="fshLink" fid=0>All</span>' +
			' &ensp;<span id="folderid-1" class="fshLink" fid="-1">Main</span>');
		Object.keys(data.folders).forEach(function(key) {
			folderTr.append(' &ensp;<span id="folderid' + key +
				'" class="fshLink fshNoWrap" fid=' + key + '>' +
				data.folders[key] + '</span> ');
		});
		folders.append(folderTr);
		folders.on('click', 'span[id^="folderid"]', FSH.trade.hideFolder);

		var showST = $('<tr id="fshShowSTs"></tr>')
			.append('<td align="center" colspan=6>' +
				'<label><input type="checkbox" id="itemsInSt" checked> ' +
				'Select items in ST</label></td>');

		$('#fshSelectMultiple').after(showST).after(folders);

		FSH.ga.end('JS Perf', 'processTrade');

		},

	toggleCheckAllPlants: function() { // jQuery
		var self = $(this);
		var itemid = self.attr('id');
		var itemList = $('#item-list, #item-div');
		var items = $('input:visible', itemList);
		var howMany = parseInt($('#fshSendHowMany').attr('value'), 10);
		var itemsInSt = document.getElementById('itemsInSt').checked;

		items.prop('checked', false);

		if (!itemsInSt) {items = items.not('.isInST');}
		if (!isNaN(howMany)) {
			if (FSH.subcmd !== '-') {howMany = Math.min(100, howMany);}
			items = items.slice(0, howMany);
		}

		if (itemid === 'itemid-1') {
				items.prop('checked', true);
			return;
		}

		if (itemid === 'itemid-2') {
			items.filter('.itemtype12').prop( 'checked', true );
			return;
		}

		items.filter('.' + itemid).prop( 'checked', true );

	},

	hideFolder: function() { // jQuery
		var self = $(this);
		var folderid = self.attr('id');

		var itemList = $('#item-list');
		if (itemList.length === 1) {
			itemList.wrap('<div id="item-div"></div>');
			$('#item-div').width(427).append(
				$('table', itemList).css('display', 'inline-block'));
			itemList.remove();
		}

		var items = $('#item-div table');
		items.find(':checked').prop('checked', false);
		if (folderid === 'folderid0') {
			items.show();
			return;
		}
		items.show().not('.' + folderid).hide();

	},

};

FSH.attackPlayer = { // Legacy - currently disabled

	injectAttackPlayer: function() { // Legacy - currently disabled
		var b = FSH.System.findNode('//input[contains(@value, "Activate!")]');
		if (b !== null) {
			var oldOnclick = b.getAttribute('onClick');
			b.setAttribute('onClick', 'if (confirm("Are you sure you want to activate PvP Prestige?")) { ' + oldOnclick + '}');
		}
		if (!FSH.System.getValue('enableAttackHelper')) {return;}
		//inject current stats, buffs and equipment
		var attackPlayerTable = FSH.System.findNode('//table[tbody/tr/td/font/b[.="Attack Player (PvP)"]]');
		if (!attackPlayerTable) {return;}
		var targetPlayer = /target_username=([a-zA-Z0-9]+)/.exec(location.search);
		if (targetPlayer) {
			var output = '<center><table width="625" cellspacing="0" ' +
				'cellpadding="0" bordercolor="#000000" border="0" style="' +
				'border-style: solid; border-width: 1px;"><tbody>' +
				'<tr style="text-align:center;" bgcolor="#cd9e4b"><td width="350" ' +
				'style="border-style: solid; border-width: 1px;">Attacker</td><td ' +
				'width="275" style="border-style: solid; border-width: 1px;">' +
				'Defender</td></tr>' +
				'<tr style="text-align:center;"><td style="border-style: solid; ' +
				'border-width: 1px;"><span id="Helper:attackPlayerSelfStatData">' +
				'<font color="green">Gathering your stats ...</font></span></td>'+
				'<td style="border-style: solid; border-width: 1px;"><span ' +
				'id="Helper:attackPlayerDefenderStatData"><font color="green">' +
				'Gathering defender stats ...</font></span></td></tr>' +
				'<tr style="text-align:center;"><td style="border-style: solid; ' +
				'border-width: 1px;"><span id="Helper:attackPlayerSelfBuffData">' +
				'<font color="green">Gathering your buffs ...</font></span></td>' +
				'<td style="border-style: solid; border-width: 1px;"><span ' +
				'id="Helper:attackPlayerDefenderBuffData"><font color="green">' +
				'Gathering defender buffs ...</font></span></td></tr>' +
				'</tbody></table><center>';

			attackPlayerTable.rows[4].cells[0].innerHTML = output;

			FSH.System.xmlhttp('index.php?cmd=profile',
				FSH.attackPlayer.getProfileStatsAndBuffs,
				{'anchor1':'attackPlayerSelfStatData',
					'anchor2':'attackPlayerSelfBuffData'});
			FSH.System.xmlhttp('index.php?cmd=findplayer&search_active=1&search_level_max=&search_level_min=&search_username='+
				targetPlayer[1]+'&search_show_first=1',
				FSH.attackPlayer.getProfileStatsAndBuffs,
				{'anchor1':'attackPlayerDefenderStatData',
					'anchor2':'attackPlayerDefenderBuffData'});
			//insert blank row
			var newRow = attackPlayerTable.insertRow(5);
			var newCell = newRow.insertCell(0);
			newCell.innerHTML = '&nbsp;';
		}
	},

	getProfileStatsAndBuffs: function(responseText, callback) { // Legacy - currently disabled
		var doc = FSH.System.createDocument(responseText);
		//stats
		var vlTextElement = FSH.System.findNode('//td[a/b[.="VL"] or b/a[.="VL"]]', doc);
		var vlValueElement = vlTextElement.nextSibling;
		var pvpTextElement = FSH.System.findNode('//td[b[contains(.,"PvP")]]', doc);
		var pvpValueElement = pvpTextElement.nextSibling;
		var attackTextElement = FSH.System.findNode('//td[b[contains(.,"Attack:")]]', doc);
		var attackValueElement = attackTextElement.nextSibling;
		var defenseTextElement = FSH.System.findNode('//td[b[contains(.,"Defense:")]]', doc);
		var defenseValueElement = defenseTextElement.nextSibling;
		var armorTextElement = FSH.System.findNode('//td[b[contains(.,"Armor:")]]', doc);
		var armorValueElement = armorTextElement.nextSibling;
		var damageTextElement = FSH.System.findNode('//td[b[contains(.,"Damage:")]]', doc);
		var damageValueElement = damageTextElement.nextSibling;
		var hpTextElement = FSH.System.findNode('//td[b[contains(.,"Health:")]]', doc);
		var hpValueElement = hpTextElement.nextSibling;
		var goldTextElement = FSH.System.findNode('//td[b[contains(.,"Gold:")]]', doc);
		var goldValueElement = goldTextElement.nextSibling;
		var pvpProtElement = FSH.System.findNode('//td[contains(.,"PvP") and contains(.,"Protection")]', doc);
		var lastActivityElement = FSH.System.findNode('//p[contains(.,"Last Activity:")]', doc);
		var output = '<table width="100%"><tbody>';
		if (lastActivityElement) {
			output += '<tr><td colspan=4 style="text-align:center;">' +
				lastActivityElement.innerHTML + '</td></tr>';}
		output += '<tr><td width="15%" style="text-align:right;">' +
			vlTextElement.innerHTML +
			'</td><td width="30%" style="text-align:left;">' +
			vlValueElement.innerHTML + '</td>' +
			'<td width="25%" style="text-align:right;">' + pvpTextElement.innerHTML +
			'</td><td width="30%" style="text-align:left;">' +
			pvpValueElement.innerHTML + '</td></tr>';
		output += '<tr><td width="15%" style="text-align:right;">' +
			attackTextElement.innerHTML +
			'</td><td width="30%" style="text-align:left;">' +
			attackValueElement.innerHTML + '</td>' +
			'<td width="25%" style="text-align:right;">' +
			defenseTextElement.innerHTML +
			'</td><td width="30%" style="text-align:left;">' +
			defenseValueElement.innerHTML + '</td></tr>';
		output += '<tr><td width="15%" style="text-align:right;">' +
			armorTextElement.innerHTML +
			'</td><td width="30%" style="text-align:left;">' +
			armorValueElement.innerHTML + '</td>' +
			'<td width="25%" style="text-align:right;">' +
			damageTextElement.innerHTML +
			'</td><td width="30%" style="text-align:left;">' +
			damageValueElement.innerHTML + '</td></tr>';
		output += '<tr><td width="15%" style="text-align:right;">' +
			hpTextElement.innerHTML +
			'</td><td width="30%" style="text-align:left;">' +
			hpValueElement.innerHTML + '</td>' +
			'<td width="25%" style="text-align:right;">' +
			goldTextElement.innerHTML +
			'</td><td width="30%" style="text-align:left;">' +
			goldValueElement.innerHTML + '</td></tr>';
		output += '<tr><td colspan=4 style="text-align:center;">' +
			pvpProtElement.innerHTML + '</td></tr>';
		output += '</tbody></table>';
		var anchor1 = callback.anchor1;
		var injectHere = FSH.System.findNode('//span[@id="Helper:'+anchor1+'"]');
		injectHere.innerHTML = output;
		//buffs
		var activeBuffsTitleRow = FSH.System.findNode('//strong[.="Active Buffs"]/ancestor::div[1]', doc);
		var activeBuffsElement = activeBuffsTitleRow.nextSibling.nextSibling;
		var anchor2 = callback.anchor2;
		injectHere = FSH.System.findNode('//span[@id="Helper:'+anchor2+'"]');
		injectHere.innerHTML = activeBuffsElement.innerHTML;
	},

};

FSH.recipeMgr = { // Legacy

	injectRecipeManager: function(content) { // Native - Ugly
		if (!content) {content = FSH.Layout.notebookContent();}
		FSH.recipeMgr.recipebook = FSH.System.getValueJSON('recipebook');
		content.innerHTML='<table cellspacing="0" cellpadding="0" border="0" width="100%"><tr style="background-color:#cd9e4b">'+
			'<td width="90%" nobr><b>&nbsp;Recipe Manager</b></td>'+
			'<td width="10%" nobr style="font-size:x-small;text-align:right">[<span id="Helper:RecipeManagerRefresh" style="text-decoration:underline;cursor:pointer">Refresh</span>]</td>'+
			'</tr>' +
			'</table>' +
			'<div style="font-size:small;" id="Helper:RecipeManagerOutput">' +
			'' +
			'</div>';
		if (!FSH.recipeMgr.recipebook) {FSH.recipeMgr.parseInventingStart();}
		document.getElementById('Helper:RecipeManagerRefresh').addEventListener('click', FSH.recipeMgr.parseInventingStart, true);
		FSH.recipeMgr.generateRecipeTable();
	},

	parseInventingStart: function(){ // Legacy
		FSH.recipeMgr.recipebook = {};
		FSH.recipeMgr.recipebook.recipe = [];
		var output=document.getElementById('Helper:RecipeManagerOutput');
		output.innerHTML='<br/>Parsing inventing screen ...<br/>';
		var currentFolder = 1;
		FSH.System.setValue('currentFolder', currentFolder);

		FSH.System.xmlhttp('index.php?cmd=inventing&page=0', FSH.recipeMgr.parseInventingPage, {'page': 0});

	},

	parseInventingPage: function(responseText, callback) { // Legacy
		var doc=FSH.System.createDocument(responseText);

		var folderIDs = [];
		FSH.Helper.folderIDs = folderIDs; //clear out the array before starting.
		var currentFolder = FSH.System.getValue('currentFolder');
		$(doc).find('a[href*="index.php?cmd=inventing&folder_id="]').each(function(){
			var folderID = /folder_id=([-0-9]+)/.exec($(this).attr('href'))[1]*1;
			folderIDs.push(folderID);
			FSH.Helper.folderIDs = folderIDs;
		});
		
		var folderCount = FSH.Helper.folderIDs.length;
		var folderID = FSH.Helper.folderIDs[currentFolder-1];
		var folderTextElement = $(doc).find('a[href*="index.php?cmd=inventing&folder_id=' + folderID + '"]').closest('td').text();
		
		var folderText = '';
		if (folderTextElement.length > 0) {
			folderText = folderTextElement;
		}
		var output=document.getElementById('Helper:RecipeManagerOutput');
		var currentPage = callback.page;
		var pages = $(doc).find('select[name="page"]:first');
		var nextPage;
		if (folderText.search(/quest/i) === -1) {
			if (pages.length === 0) {return;}
			$(doc).find('a[href*="index.php?cmd=inventing&subcmd=viewrecipe&recipe_id="]').each(function(){
				var recipeLink = $(this).attr('href');
				var recipeId = parseInt(recipeLink.match(/recipe_id=(\d+)/i)[1],10);
				var recipe={
					'img': $(this).closest('tr').find('img').attr('src'),
					'link': recipeLink,
					'name': $(this).text(),
					'id': recipeId};
				output.innerHTML+='Found blueprint: '+ recipe.name + '<br/>';
				FSH.recipeMgr.recipebook.recipe.push(recipe);
			});
			
			nextPage=currentPage+1;
			output.innerHTML += 'Parsing folder '+ currentFolder + ' ... Page ' + nextPage + '... <br/>';

		} else {
			output.innerHTML += 'Skipping folder '+ currentFolder + ' as it has the word "quest" in folder name.<br/>';
			nextPage = pages.find('option:last').text()*1;
		}
		if (nextPage<=pages.find('option:last').text()*1 && currentFolder!==folderCount || currentFolder<folderCount) {
			if (nextPage===pages.find('option:last').text()*1 && currentFolder<folderCount) {
				nextPage = 0;
				folderID = FSH.Helper.folderIDs[currentFolder];
				FSH.System.setValue('currentFolder', currentFolder+1);
			}
			FSH.System.xmlhttp(
				'index.php?cmd=inventing&page=' + nextPage + '&folder_id=' +
				folderID,
				FSH.recipeMgr.parseInventingPage,
				{'page': nextPage}
			);
		}
		else {
			output.innerHTML+='Finished parsing ... Retrieving individual blueprints...<br/>';
			FSH.System.xmlhttp('index.php?cmd=inventing&subcmd=viewrecipe&recipe_id=' +
				FSH.recipeMgr.recipebook.recipe[0].id,
				FSH.recipeMgr.parseRecipePage, {'recipeIndex': 0});
		}
	},

	parseRecipePage: function(responseText, callback) { // Legacy
		var doc=FSH.System.createDocument(responseText);
		var output=document.getElementById('Helper:RecipeManagerOutput');
		var currentRecipeIndex = callback.recipeIndex;
		var recipe = FSH.recipeMgr.recipebook.recipe[currentRecipeIndex];

		output.innerHTML+='Parsing blueprint ' + recipe.name +'...<br/>';

		recipe.items = FSH.recipeMgr.parseRecipeItemOrComponent('td[background*="/inventory/2x3.gif"]', doc);
		recipe.components  = FSH.recipeMgr.parseRecipeItemOrComponent('td[background*="/inventory/1x1mini.gif"]', doc);
		recipe.target = FSH.recipeMgr.parseRecipeItemOrComponent('td[background*="/hellforge/2x3.gif"]', doc)[0];

		var nextRecipeIndex = currentRecipeIndex+1;
		if (nextRecipeIndex<FSH.recipeMgr.recipebook.recipe.length) {
			var nextRecipe = FSH.recipeMgr.recipebook.recipe[nextRecipeIndex];
			FSH.System.xmlhttp('index.php?cmd=inventing&subcmd=viewrecipe&recipe_id=' +
				nextRecipe.id, FSH.recipeMgr.parseRecipePage,
				{'recipeIndex': nextRecipeIndex});
		}
		else {
			output.innerHTML+='Finished parsing ... formatting ...';
			FSH.recipeMgr.recipebook.lastUpdate = new Date();
			FSH.System.setValueJSON('recipebook', FSH.recipeMgr.recipebook);
			FSH.recipeMgr.generateRecipeTable();
		}
	},

	parseRecipeItemOrComponent: function(jqueryxpath, doc) { // jQuery
		var results = [];
		$(doc).find(jqueryxpath).each(function(){
			var mouseOver = $(this).find('img').data('tipped');
			var resultAmounts = $(this).parent().next().text();
			var mouseOverRX = mouseOver.match(/fetchitem.php\?item_id=(\d+)\&inv_id=-1\&t=2\&p=(\d+)\&vcode=([a-z0-9]+)/i);
			var result = {
				img: $(this).find('img').attr('src'),
				id: mouseOverRX[1],
				verify: mouseOverRX[3],
				amountPresent: parseInt(resultAmounts.split('/')[0],10),
				amountNeeded: parseInt(resultAmounts.split('/')[1],10)
			};
			results.push(result);
		});

		return results;
	},

	generateRecipeTable: function() { // Native - Ugly
		var j;
		var output=document.getElementById('Helper:RecipeManagerOutput');
		var result='<table id="Helper:RecipeTable" width="100%"><tr>' +
			'<th align="left" colspan="2" sortkey="name">Name</th>' +
			'<th align="left">Items</th>' +
			'<th align="left">Components</th>' +
			'<th align="left">Target</th>' +
			'</tr>';
		if (!FSH.recipeMgr.recipebook) {return;}

		var hideRecipes=[];
		if (FSH.System.getValue('hideRecipes')) {
			hideRecipes=FSH.System.getValue('hideRecipeNames').split(',');
		}

		var recipe;
		var c=0;
		for (var i=0; i<FSH.recipeMgr.recipebook.recipe.length;i += 1) {
			recipe=FSH.recipeMgr.recipebook.recipe[i];
			c+= 1;

			if (hideRecipes.indexOf(recipe.name) === -1) {
				result+='<tr class="HelperTableRow'+(1+c % 2)+'" valign="middle">' +
					'<td style="border-bottom:1px solid #CD9E4B;"><a href="' + recipe.link + '"><img border="0" align="middle" src="' +
					recipe.img + '"/></a></td>' +
					'<td style="border-bottom:1px solid #CD9E4B;"><a href="' + recipe.link + '">' + recipe.name + '</a></td>';
				result += '<td style="border-bottom:1px solid #CD9E4B;">';
				if (recipe.items) {
					for (j=0; j<recipe.items.length; j += 1) {
						result += recipe.items[j].amountPresent  + '/' + recipe.items[j].amountNeeded +
							' <img border="0" align="middle" class="tip-dynamic" ' +
							'data-tipped="fetchitem.php?item_id=' +
							recipe.items[j].id + '&inv_id=-1&t=2&p=' + FSH.Layout.playerId() + '&vcode=' + recipe.items[j].verify + '" ' +
							'src="' + recipe.items[j].img + '"/><br/>';
					}
				}
				result += '</td>';
				result += '<td style="border-bottom:1px solid #CD9E4B;">';
				if (recipe.components) {
					for (j=0; j<recipe.components.length; j += 1) {
						result += recipe.components[j].amountPresent + '/' + recipe.components[j].amountNeeded +
							' <img border="0" align="middle" class="tip-dynamic" ' +
							'data-tipped="fetchitem.php?item_id=' +
							recipe.components[j].id + '&inv_id=-1&t=2&p=' + FSH.Layout.playerId() + '&vcode=' + recipe.components[j].verify + '" ' +
							'src="' + recipe.components[j].img + '"/><br/>';
					}
				}
				result += '</td>';
				result += '<td style="border-bottom:1px solid #CD9E4B;">';
				if (recipe.target) {
					result +=' <img border="0" align="middle" class="tip-dynamic" ' +
							'data-tipped="fetchitem.php?item_id=' +
							recipe.target.id + '&inv_id=-1&t=2&p=' + FSH.Layout.playerId() + '&vcode=' + recipe.target.verify + '" ' +
							'src="' + recipe.target.img + '"/><br/>';
				}
				result += '</td>';
				result += '</tr>';
			}
		}
		result+='</table>';
		output.innerHTML=result;

		FSH.recipeMgr.recipebook.lastUpdate = new Date();
		FSH.System.setValueJSON('recipebook', FSH.recipeMgr.recipebook);

		var recipeTable=document.getElementById('Helper:RecipeTable');
		for (i=0; i<recipeTable.rows[0].cells.length; i += 1) {
			var cell=recipeTable.rows[0].cells[i];
			if (cell.getAttribute('sortkey')) {
				cell.style.textDecoration='underline';
				cell.style.cursor='pointer';
				cell.addEventListener('click', FSH.recipeMgr.sortRecipeTable, true);
			}
		}
	},

	sortRecipeTable: function(evt) { // Native
		FSH.recipeMgr.recipebook=FSH.System.getValueJSON('recipebook');
		var headerClicked = evt.target.getAttribute('sortKey');
		var sortType = evt.target.getAttribute('sorttype');
		if (!sortType) {sortType='string';}
		sortType = sortType.toLowerCase();
		if (FSH.Helper.sortAsc === undefined) {FSH.Helper.sortAsc = true;}
		if (FSH.Helper.sortBy && FSH.Helper.sortBy===headerClicked) {
			FSH.Helper.sortAsc=!FSH.Helper.sortAsc;
		}
		FSH.Helper.sortBy=headerClicked;
		switch (sortType) {
			case 'number':
				FSH.recipeMgr.recipebook.recipe.sort(FSH.System.numberSort);
				break;
			default:
				FSH.recipeMgr.recipebook.recipe.sort(FSH.System.stringSort);
				break;
		}
		FSH.recipeMgr.generateRecipeTable();
	},

};

FSH.quickExtract = { // Legacy - No longer required?

	insertQuickExtract: function(content) { // Hybrid
		if (!content) {content=FSH.Layout.notebookContent();}
		content.innerHTML='<table width=100%><tr style="background-color:' +
			'#CD9E4B;"><td nobr><b>Quick Extract</b></td></tr></table>' +
			'Select which type of plants you wish to extract all of. Only ' +
			'select extractable resources.<br/><label><input type="checkbox"' +
			' id="Helper:useItemsInSt" checked /> Select items in ST</label>' +
			'<label><input type="checkbox" id="Helper:useItemsInMain" ' +
			'checked /> Only extract items in Main Folder</label><table ' +
			'width=100% id="Helper:ExtTable"></table>';
		$('[id^="Helper\\:useItemsIn"]').click(FSH.quickExtract.showQuickExtract);
		$.getJSON('?cmd=export&subcmd=inventory', FSH.quickExtract.showQuickExtract);
	},

	showQuickExtract: function(data) { // Hybrid
		var item;
		if (data.items) {
			FSH.Helper.inventory = data;
		}
		var table = $('table[id="Helper:ExtTable"]');
		table.children().remove();//empty table for re-population.
		FSH.Helper.resourceList={}; //reset resourceList
		var selectST= $('input[id="Helper:useItemsInSt"]').is(':checked');
		var selectMain= $('input[id="Helper:useItemsInMain"]').is(':checked');
		table.append('<tr><th width=20%>Actions</th><th>Items</th></tr><tr><td id="buy_result" colspan=2></td></tr>');
		for (var i=0; i<FSH.Helper.inventory.items.length;i += 1) {
			item = FSH.Helper.inventory.items[i];
			if (selectMain && item.folder_id !== '-1') {continue;}
			if (!selectST && item.is_in_st) {continue;}
			if (item.item_name !== 'Zombie Coffin' &&
				item.type !== '12' &&
				item.type !== '16') {continue;}
			if (FSH.Helper.resourceList[item.item_id]){
				FSH.Helper.resourceList[item.item_id].invIDs += ',' +
					item.inv_id;
				FSH.Helper.resourceList[item.item_id].count += 1;
			} else {
				FSH.Helper.resourceList[item.item_id] = {'count':1,
					'invIDs':item.inv_id,
					'first_item':item};
			}
		}

		for (var id in FSH.Helper.resourceList) {
			if (!FSH.Helper.resourceList.hasOwnProperty(id)) {continue;}
			var res=FSH.Helper.resourceList[id];
			item=res.first_item;
			table.append('<tr><td align=center><span style="cursor:pointer; ' +
				'text-decoration:underline; color:#blue; font-size:x-small;"' +
				' id="Helper:extractAllSimilar' + id + '" invIDs="' +
				res.invIDs + '">Extract all ' + res.count + '</span></td>' +
				'<td><img src="' + FSH.System.imageServer + '/items/' + 
				item.item_id + '.gif" class="tip-dynamic" data-tipped="' +
				'fetchitem.php?item_id=' + item.item_id + '&inv_id=' +
				item.inv_id + '&t=1&p=' + FSH.Helper.inventory.player_id +
				'" border=0>' + '</td><td>'+item.item_name+'</td></tr>');
		}

		for (id in FSH.Helper.resourceList) {
			if (!FSH.Helper.resourceList.hasOwnProperty(id)) {continue;}
			document.getElementById('Helper:extractAllSimilar' + id).
				addEventListener('click', FSH.quickExtract.extractAllSimilar, true);
			}
	},

	extractAllSimilar: function(evt) { // Legacy
		if (!confirm('Are you sure you want to extract all similar items?')) {return;}
		var InventoryIDs=evt.target.getAttribute('invIDs').split(',');
		evt.target.parentNode.innerHTML = 'extracting all ' + InventoryIDs.length + ' resources';
		for (var i=0; i<InventoryIDs.length; i += 1){
			FSH.System.xmlhttp('index.php?cmd=profile&subcmd=useitem&inventory_id='+InventoryIDs[i], FSH.quickExtract.quickDoneExtracted);
		}
	},

	quickDoneExtracted: function(responseText) { // Native
		var infoMessage = FSH.Layout.infoBox(responseText);
		document.getElementById('buy_result').innerHTML+='<br />'+infoMessage;
	},

};

FSH.scavenging = { // Legacy - Not in use?

	injectScavenging: function() {
		$('#pCC input[value="Scavenge"]').click(FSH.scavenging.dontPost);
	},

	dontPost: function(e) { // jQuery
		e.preventDefault();
		window.location = 'index.php?cmd=scavenging&subcmd=process' +
			'&cave_id=' + $('#pCC input[name="cave_id"]:checked').val() +
			'&gold=' + $('#gold').val() + '&submit=Scavenge';
	},

	multiSummary: function() { // Legacy - Bad, could be repurposed
		var injectHere=FSH.System.findNode('//b[contains(.,"Multiple Scavenging Results")]/..');
		if (injectHere) { // multi scavenging
			var victories=FSH.System.findNodes('//td[contains(.,"victorious")]');
			if (victories) {
				injectHere.innerHTML+='<br/>Victories: '+victories.length;
			}
			var defeats=FSH.System.findNodes('//td[contains(.,"defeated")]');
			if (defeats) {
				injectHere.innerHTML+=', Defeated: '+defeats.length;
			}
			var gains=FSH.System.findNodes('//td[contains(.,"Item Gained")]/b');
			if (gains) {
				injectHere.innerHTML+='<br/>'+gains.length+' item(s): ';
				var gainHash={};
				for (var i=0;i<gains.length;i += 1) {
					if (gainHash[gains[i].textContent]) {
						gainHash[gains[i].textContent]+= 1;
					} else {
						gainHash[gains[i].textContent]=1;
					}
				}
				for (var item in gainHash) {
					if (!gainHash.hasOwnProperty(item)) { continue; }
					injectHere.innerHTML+=gainHash[item]+' '+item+'(s), ';
				}
			}
		}
		FSH.System.xmlhttp('index.php?cmd=world', FSH.scavenging.getBpCountFromWorld);
	},

	getBpCountFromWorld: function(responseText) { // Legacy - Bad, could be repurposed
		// backpack counter
		var doc=FSH.System.createDocument(responseText);
		var bp=FSH.System.findNode('//td[a/img[contains(@src,"_manageitems.gif")]]',doc);
		var injectHere=document.getElementById('reportDiv');
		if (!injectHere) {
			injectHere=FSH.System.findNode('//b[contains(.,"Multiple Scavenging Results")]/..');
		}
		injectHere.appendChild(bp);
	},

};

FSH.findBuffs = { // Legacy

	injectFindBuffs: function(content) { // Native - Bad
		if (!content) {content=FSH.Layout.notebookContent();}
		var buffList = FSH.Data.buffList;
		FSH.Helper.sortBy='name';
		FSH.Helper.sortAsc=true;
		buffList.sort(FSH.System.stringSort);
		var injectionText = '';
		var extraProfile = FSH.System.getValue('extraProfile');
		injectionText += '<table width="620" cellspacing="0" cellpadding="2" ' +
			'border="0" align="center"><tbody><tr><td rowspan="2" colspan="2" ' +
			'width="50%"><h1>Find Buff</h1></td><td align="right" style="' +
			'color:brown;">Select buff to search for:</td>';

		injectionText += '<td align="left"><select style="width:140px;" ' +
			'id="selectedBuff">';
		for (var j = 0; j < buffList.length; j += 1) {
			injectionText += '<option value="' + buffList[j].skillId + '">' +
				buffList[j].name + '</option>';
		}
		injectionText += '</select></td></tr>';

		injectionText += '<tr>' +
			'<td align="right" style="color:brown;">Level 175 buffers only:</td>' +
			'<td align="left"><input id="level175" type="checkbox"></td></tr>' +
			'<tr><td align="right" style="color:brown;" width="30%">Nicknames of ' +
			'buff searched:&nbsp;</td><td align="left" id="buffNicks">&nbsp;</td>' +
			'<td align="right" style="color:brown;">Search guild members:</td>' +
			'<td align="left"><input id="guildMembers" type="checkbox" checked>' +
			'</td></tr><tr>' +
			'<td align="right" style="color:brown;"># potential buffers to ' +
			'search:&nbsp;</td><td align="left" id="potentialBuffers"></td>' +
			'<td align="right" style="color:brown;">Search allies/enemies:' +
			FSH.settingsPage.helpLink('Search Allies/Enemies', 'The checkbox enables ' +
			'searching your own personal allies/enemies list for buffs.<br><br>' +
			'Additional profiles to search can be added in the text field to the ' +
			'right, separated by commas.') + '</td>' +
			'<td align="left"><input id="alliesEnemies" type="checkbox" checked>' +
			'<input style="width:118px;" class="custominput" id="extraProfile" ' +
			'type="text" title="Extra profiles to search" value="' +
			(extraProfile?extraProfile:'') + '"></td></tr>' +
			'<tr><td align="right" style="color:brown;"># Buffers processed:' +
			'&nbsp;</td><td align="left" id="buffersProcessed">0</td>' +
			'<td align="right" style="color:brown;">Search online list:</td>' +
			'<td align="left"><select style="width:140px;" id="onlinePlayers">' +
				'<option value="0">Disabled</option>' +
				'<option value="49">Short (fastest)</option>' +
				'<option value="47">Medium (medium)</option>' +
				'<option value="45">Long (slowest)</option>' +
			'</select></td></tr>' +
			'<tr><td align="right" style="color:brown;">Find buffers progress:' +
			'&nbsp;</td><td align="left" width="310" id="bufferProgress">Idle</td>'+
			'<td align="center"><input id="clearresultsbutton" ' +
			'class="custombutton" type="button" value="Clear Results"></td>' +
			'<td align="center"><input id="findbuffsbutton" class="custombutton" ' +
			'type="button" value="Find Buffers"></td></tr>' +
			'</tbody></table><br>' +
			'<h1>Potential Buffers and Bio Info</h1><br>' +
			'<table width="620" cellspacing="0" cellpadding="3" border="1" ' +
			'align="center" id="buffTable"><tbody>' +
			'<tr><th width="120">&nbsp;Name</th><th width="200">&nbsp;Player ' +
			'Info</th><th>&nbsp;Notable Bio Text</th></tr>' +
			'</tbody></table><br>' +
			'<div class=content style="font-size:xx-small; color:brown; ' +
			'margin-left:28px; margin-right:28px;">Disclaimer: This ' +
			'functionality does a simple text search for the terms above. '+
			'It is not as smart as you are, so please do not judge the results ' +
			'too harshly. It does not search all online players, just a subset ' +
			'of those that have been on recently. ' +
			'The aim is to be fast and still return a good set of results. This ' +
			'feature is a work in progress, so it may be tweaked and enhanced ' +
			'over time.</div>';
		content.innerHTML = injectionText;
		document.getElementById('findbuffsbutton')
			.addEventListener('click', FSH.findBuffs.findBuffsStart, true);
		document.getElementById('clearresultsbutton')
			.addEventListener('click', FSH.findBuffs.findBuffsClearResults, true);
	},

	findBuffsClearResults: function() { // Native
		var buffTable = document.getElementById('buffTable');
		for (var j = buffTable.rows.length; j > 1; j-=1) {
			buffTable.deleteRow(j-1);
		}
		document.getElementById('buffNicks').innerHTML = '';
		var bufferProgress = document.getElementById('bufferProgress');
		bufferProgress.innerHTML = 'Idle.';
		bufferProgress.style.color = 'black';
		document.getElementById('potentialBuffers').innerHTML = '';
		document.getElementById('buffersProcessed').innerHTML = 0;
	},

	findBuffsStart: function() { // Legacy
		var selectedBuff = $('#selectedBuff').val();
		//create array of buff nicknames ...
		var buffList = FSH.Data.buffList;
		for (var j = 0; j < buffList.length; j += 1) {
			if (selectedBuff === buffList[j].skillId) {
				FSH.Helper.findBuffNicks = buffList[j].nicks;
				FSH.Helper.findBuffMinCastLevel = buffList[j].minCastLevel;
				break;
			}
		}
		document.getElementById('buffNicks').innerHTML = FSH.Helper.findBuffNicks;
		var bufferProgress = document.getElementById('bufferProgress');
		bufferProgress.innerHTML = 'Gathering list of potential buffers ...';
		bufferProgress.style.color = 'green';
		FSH.Helper.findBuffsLevel175Only =
			document.getElementById('level175').checked;
		document.getElementById('buffersProcessed').innerHTML = 0;
		FSH.Helper.onlinePlayers = [];
		FSH.Helper.extraProfile = document.getElementById('extraProfile').value;
		FSH.System.setValue('extraProfile', FSH.Helper.extraProfile);
		//get list of players to search, starting with guild>manage page
		FSH.System.xmlhttp('index.php?cmd=guild&subcmd=manage',
			FSH.findBuffs.findBuffsParseGuildManagePage);
	},

	findBuffsParseGuildManagePage: function(responseText) { // jQuery
		var doc = FSH.System.createDocument(responseText);
		var characterName = $('dt.stat-name:first').next().text().replace(/,/g,'');
		var memberTableRows = $(doc)
			.find('table:has(td:contains("Rank")[bgcolor="#C18B35"]):last')
			.find('tr:gt(1):not(:has(td[colspan="5"]))');
		if (document.getElementById('guildMembers').checked) {
			memberTableRows.each(function(){
				var contactLink = $(this).find('a');
				var onMouseOver = $(contactLink).data('tipped');
				var lastActivity = /<td>Last Activity:<\/td><td>(\d+)d (\d+)h (\d+)m (\d+)s<\/td>/.exec(onMouseOver);
				var lastActivityDays = parseInt(lastActivity[1],10);
				var lastActivityHours = parseInt(lastActivity[2],10) +
					lastActivityDays * 24;
				var lastActivityMinutes = parseInt(lastActivity[3],10) +
					lastActivityHours * 60;
				//check if they are high enough level to cast the buff
				var virtualLevel = /<td>VL:<\/td><td>([,0-9]+)<\/td>/.exec(onMouseOver);
				virtualLevel = parseInt(virtualLevel[1].replace(/,/g,''),10);
				var minPlayerVirtualLevel = 1;
				if (FSH.Helper.findBuffsLevel175Only) {minPlayerVirtualLevel = 500;}
				if (lastActivityMinutes < 5 &&
					virtualLevel >= FSH.Helper.findBuffMinCastLevel &&
					virtualLevel >= minPlayerVirtualLevel) {
					//add online player to search list (all but self)
					var onlinePlayer = contactLink.attr('href');
					if (characterName !== $(this).find('td:eq(1)')
						.text().trim()) {
						FSH.Helper.onlinePlayers.push(onlinePlayer);
					}
				}
			});
		}
		//continue with profile pages
		FSH.findBuffs.findBuffsParseProfilePageStart();
	},

	findBuffsParseProfilePageStart: function() { // Legacy
		//if option enabled then parse profiles
		FSH.Helper.profilePagesToSearch = [];
		FSH.Helper.profilePagesToSearch.push('index.php?cmd=profile');
		var extraProfileArray = FSH.Helper.extraProfile.split(',');
		var i;
		for (i=0;i<extraProfileArray.length ;i+= 1 ) {
			FSH.Helper.profilePagesToSearch.push('index.php?cmd=findplayer' +
				'&search_active=1&search_level_max=&search_level_min=' +
				'&search_username=' + extraProfileArray[i] + '&search_show_first=1');
		}
		FSH.Helper.profilePagesToSearchProcessed = 0;
		if (document.getElementById('alliesEnemies').checked) {
			for (i=0;i<FSH.Helper.profilePagesToSearch.length ;i+= 1 ) {
				FSH.System.xmlhttp(FSH.Helper.profilePagesToSearch[i],
					FSH.findBuffs.findBuffsParseProfilePage);
			}
		} else {
			FSH.findBuffs.findBuffsParseOnlinePlayersStart();
		}
	},

	findBuffsParseProfilePage: function(responseText) { // jQuery
		var doc = FSH.System.createDocument(responseText);
		var characterName = $('dt.stat-name:first').next().text().replace(/,/g,'');
		var profileAlliesEnemies = $(doc).find('#profileLeftColumn')
			.find('a[data-tipped*="Last Activity"]');
		profileAlliesEnemies.each(function(){
			var onMouseOver = $(this).data('tipped');
			var lastActivity = /<td>Last Activity:<\/td><td>(\d+)d (\d+)h (\d+)m (\d+)s<\/td>/.exec(onMouseOver);
			var lastActivityDays = parseInt(lastActivity[1],10);
			var lastActivityHours = parseInt(lastActivity[2],10) +
				lastActivityDays * 24;
			var lastActivityMinutes = parseInt(lastActivity[3],10) +
				lastActivityHours * 60;
			//check if they are high enough level to cast the buff
			var virtualLevel = /<td>VL:<\/td><td>([,0-9]+)<\/td>/.exec(onMouseOver);
			virtualLevel = parseInt(virtualLevel[1].replace(/,/g,''),10);
			var minPlayerVirtualLevel = 1;
			if (FSH.Helper.findBuffsLevel175Only) {minPlayerVirtualLevel = 500;}
			if (lastActivityMinutes < 5 &&
				virtualLevel >= FSH.Helper.findBuffMinCastLevel &&
				virtualLevel >= minPlayerVirtualLevel) {
				//add online player to search list (all but self)
				var onlinePlayer = $(this).attr('href');
				if (characterName !== $(this).text().trim()) {
					FSH.Helper.onlinePlayers.push(onlinePlayer);
				}
			}
		});
		//continue with online players
		FSH.Helper.profilePagesToSearchProcessed += 1;
		if (FSH.Helper.profilePagesToSearchProcessed ===
			FSH.Helper.profilePagesToSearch.length) {
			FSH.findBuffs.findBuffsParseOnlinePlayersStart();
		}
	},

	findBuffsParseOnlinePlayersStart: function() { // Legacy
		//if option enabled then parse online players
		FSH.Helper.onlinePlayersSetting =
			document.getElementById('onlinePlayers').value;
		if (FSH.Helper.onlinePlayersSetting !== 0) {
			FSH.System.xmlhttp('index.php?cmd=onlineplayers&page=1',
				FSH.findBuffs.findBuffsParseOnlinePlayers, {'page':1});
		} else {
			FSH.findBuffs.findBuffsParsePlayersForBuffs();
		}
	},

	findBuffsParseOnlinePlayers: function(responseText) { // Legacy
		var doc = FSH.System.createDocument(responseText);
		var playerRows = $(doc).find('table:contains("Username")>tbody>tr:has' +
			'(td>a[href*="cmd=profile&player_id="])');
		var maxPage = parseInt($(doc).find('td:has(input[name="page"]):last')
			.text().replace(/\D/g, ''),10);
		var curPage = parseInt($(doc).find('input[name="page"]:last').val()
			.replace(/\D/g, ''),10);
		var characterName = $('dt.stat-name:first').next().text().replace(/,/g,'');
		if (curPage !== 1){
			playerRows.each(function(){
				var onlinePlayer = $(this).find('td:eq(1) a').attr('href');
				var onlinePlayerLevel = parseInt($(this).find('td:eq(2)').text()
					.replace(/,/g,''),10);
				var onlinePlayerName = $(this).find('td:eq(1) a').text();
				var minPlayerVirtualLevel = 1;
				if (FSH.Helper.findBuffsLevel175Only) {minPlayerVirtualLevel = 500;}
				if (onlinePlayerLevel >= FSH.Helper.findBuffMinCastLevel &&
					onlinePlayerLevel >= minPlayerVirtualLevel) {
					//add online player to search list (all but self)
					if (characterName !== onlinePlayerName.trim()) {
						FSH.Helper.onlinePlayers.push(onlinePlayer);
					}
				}
			});
		}
		if (curPage < maxPage/*-maxPage+15*/) {
			var newPage = curPage === 1 ?
				Math.round(FSH.Helper.onlinePlayersSetting * maxPage / 50) :
				curPage + 1;
			var bufferProgress = document.getElementById('bufferProgress');
			bufferProgress.innerHTML = 'Parsing online page ' + curPage + ' ...';
			FSH.System.xmlhttp('index.php?cmd=onlineplayers&page=' + newPage,
				FSH.findBuffs.findBuffsParseOnlinePlayers, {'page':newPage});
		}
		else {
			//all done so moving on
			FSH.findBuffs.findBuffsParsePlayersForBuffs();
		}
	},

	findBuffsParsePlayersForBuffs: function() { // Legacy
		//remove duplicates TODO
		var bufferProgress = document.getElementById('bufferProgress');
		//now need to parse player pages for buff ...
		document.getElementById('potentialBuffers').innerHTML =
			FSH.Helper.onlinePlayers.length;
		if (FSH.Helper.onlinePlayers.length <= 0) {
			bufferProgress.innerHTML = 'Done.';
			bufferProgress.style.color = 'blue';
			return;
		}
		bufferProgress.innerHTML = 'Parsing player data ...';
		bufferProgress.style.color = 'green';

		for (var j = 0; j < FSH.Helper.onlinePlayers.length; j += 1) {
			FSH.System.xmlhttp(FSH.Helper.onlinePlayers[j],
				FSH.findBuffs.findBuffsParseProfileAndDisplay,
				{'href': FSH.Helper.onlinePlayers[j]});
		}
	},

	findBuffsParseProfileAndDisplay: function(responseText, callback) { // Hybrid - Evil
		var doc = FSH.System.createDocument(responseText);
		//name and level
		var playerName = $(doc).find('#pCC h1:first').text();
		var levelElement = $(doc).find('td:contains("Level:"):last').next();
		var levelValue = parseInt(levelElement.text().replace(/,/g,''),10);
		var virtualLevelElement = $(doc).find('td:contains("VL:"):last').next();
		var virtualLevelValue = parseInt(virtualLevelElement.text()
			.replace(/,/g,''),10);
		//last activity
		var lastActivityElement = $(doc).find('#pCC p:first');
		var lastActivity = /(\d+) mins, (\d+) secs/
			.exec(lastActivityElement.text());
		var lastActivityMinutes = parseInt(lastActivity[1],10);
		var lastActivityIMG = FSH.Layout.onlineDot({min: lastActivityMinutes});
		//buffs
		var bioDiv = $(doc)
			.find('div.innerColumnHeader:contains("Biography"):last');
		var bioCell = bioDiv.next();
		var buffTable = document.getElementById('buffTable');
		var textLineArray = [];
		var buffPosition = 0, startingPosition = 0, runningTotalPosition = 0;
		var bioTextToSearch = ' '+bioCell.html()+' ';
		var buffRE = new RegExp('[^a-zA-Z]((' +
			FSH.Helper.findBuffNicks.replace(/,/g,')|(') + '))[^a-zA-Z]', 'i');
		while (buffPosition !== -1) {
			bioTextToSearch = bioTextToSearch.substr(startingPosition,
				bioTextToSearch.length);
			buffPosition = bioTextToSearch.search(buffRE);
			if (buffPosition !== -1) {
				startingPosition = buffPosition + 1;
				runningTotalPosition += buffPosition;
				var prevBR = bioCell.html().lastIndexOf('<br>',runningTotalPosition-1);
				if (prevBR===-1) {prevBR=0;}
				var nextBR = bioCell.html().indexOf('<br>',runningTotalPosition);
				if (nextBR===-1 && bioCell.html().indexOf('<br>') !== -1) {
					nextBR=bioCell.html().length-5;
				}
				var textLine = bioCell.html().substr(prevBR + 4, nextBR - prevBR);
				textLine = textLine.replace(/(`~)|(~`)|(\{b\})|(\{\/b\})/g,'');
				textLineArray.push(textLine);
			}
		}
		textLineArray = FSH.System.uniq(textLineArray);
		//sustain
		var sustainText = $(doc)
			.find('td:has(a:contains("Sustain")):last').next()
			.find('table.tipped').data('tipped');
		var sustainLevel;
		if (sustainText !== undefined) {
			var sustainLevelRE = /Level<br>(\d+)%/;
			sustainLevel = sustainLevelRE.exec(sustainText)[1];
		} else {
			sustainLevel = -1;
		}
		//extend
		var hasExtendBuff = $(doc).find('img.tipped[data-tipped*="Extend"]');

		//add row to table
		if (textLineArray.length > 0) {
			var newRow = buffTable.insertRow(-1);
			//name cell
			var newCell = newRow.insertCell(0);
			newCell.style.verticalAlign = 'top';
			var playerHREF = callback.href;
			var bioTip = bioCell.html().replace(/'|"|\n/g,'');
			newCell.innerHTML = '<nobr>' + lastActivityIMG + '&nbsp;<a href="' +
				playerHREF + '" target="new" ' +
				// FIXME - It kind works now, but not guaranteed?
				'class="tipped" data-tipped-options="hook: \'leftmiddle\'" ' + 
				'data-tipped="'+bioTip+'">' + playerName + '</a>' +
				'&nbsp;<span style="color:blue;">[<span class="a-reply" ' +
				'target_player="' + playerName +'" style="cursor:pointer; ' +
				'text-decoration:underline;">m</span>]</span>' + '</nobr><br>' +
				'<span style="color:gray;">Level:&nbsp;</span>' + levelValue +
				'&nbsp;(' + virtualLevelValue + ')';
			$('.a-reply').click(function(evt) {
				window.openQuickMsgDialog(evt.target.getAttribute('target_player'));
			});

			//player info cell
			newCell = newRow.insertCell(1);
			var playerInfo = '<table><tbody><tr><td colspan="2" style=' +
				'"color:gray;" align="right" width="50%">Last Activity:</td>' +
				'<td colspan="2"><nobr>' + lastActivity[0] + '</nobr></td></tr>' +
				'<tr><td style="color:gray;" align="right" width="25%">Sustain:' +
				'</td><td width="25%" style="color:' +
				(sustainLevel >= 100 ? 'green' : 'red') + ';">' + sustainLevel +
				'%</td>' +
				'<td width="25%" style="color:gray;" align="right">Extend:</td>' +
				'<td width="25%">' + (hasExtendBuff.length > 0 ?
				'<span style="color:green;">Yes</span>' :
				'<span style="color:red;">No</span>') + '</td></tr>';
			newCell.innerHTML = playerInfo;
			newCell.style.verticalAlign = 'top';
			//buff cell
			newCell = newRow.insertCell(2);
			for (var i = 0; i < textLineArray.length; i += 1) {
				newCell.innerHTML += textLineArray[i] + '<br>';
			}
		}
		var processedBuffers = document.getElementById('buffersProcessed');
		var potentialBuffers =
			parseInt(document.getElementById('potentialBuffers').textContent,10);
		var processedBuffersCount = parseInt(processedBuffers.textContent,10);
		processedBuffers.innerHTML = processedBuffersCount + 1;
		if (potentialBuffers === processedBuffersCount + 1) {
			var bufferProgress = document.getElementById('bufferProgress');
			bufferProgress.innerHTML = 'Done.';
			bufferProgress.style.color = 'blue';
		}
	},

	injectFindOther: function(content) { // Native - Bad
		if (!content) {content=FSH.Layout.notebookContent();}
		var injectionText = '';
		var textToSearchFor = FSH.System.getValue('textToSearchFor');
		var extraProfile = FSH.System.getValue('extraProfile');
		injectionText += '<table width="620" cellspacing="0" cellpadding="2" ' +
			'border="0" align="center"><tbody>' +
			'<tr><td rowspan="2" colspan="2" width="50%"><h1>Find Other</h1></td>' +
			'<td align="right" style="color:brown;">Select text to search for:</td>' +

			'<td align="left"><input style="width:140px;" class="custominput" ' +
			'id="textToSearchFor" type="text" title="Text to search for" value="' +
			(textToSearchFor ? textToSearchFor : '') + '"></td></tr>' +

			'<tr>' +
			'<td align="right" style="color:brown;">Level 500+ players only:</td>' +
			'<td align="left"><input id="level175" type="checkbox"></td></tr>' +
			'<tr><td align="right" style="color:brown;" width="30%">Text ' +
			'searched for:&nbsp;</td><td align="left" id="buffNicks">&nbsp;</td>' +
			'<td align="right" style="color:brown;">Search guild members:</td>' +
			'<td align="left"><input id="guildMembers" type="checkbox" checked>' +
			'</td></tr><tr>' +
			'<td align="right" style="color:brown;"># potential players to ' +
			'search:&nbsp;</td><td align="left" id="potentialBuffers"></td>' +
			'<td align="right" style="color:brown;">Search allies/enemies:' +
			FSH.settingsPage.helpLink('Search Allies/Enemies',
				'The checkbox enables searching your own personal ' +
				'allies/enemies list for buffs.<br><br>' +
				'Additional profiles to search can be added in the text ' +
				'field to the right, separated by commas.') + '</td>' +
			'<td align="left"><input id="alliesEnemies" type="checkbox" checked>' +
			'<input style="width:118px;" class="custominput" id="extraProfile" ' +
			'type="text" title="Extra profiles to search" value="' +
			(extraProfile ? extraProfile : '') + '"></td></tr>' +
			'<tr><td align="right" style="color:brown;"># Players processed:' +
			'&nbsp;</td><td align="left" id="buffersProcessed">0</td>' +
			'<td align="right" style="color:brown;">Search online list:</td>' +
			'<td align="left"><select style="width:140px;" id="onlinePlayers">' +
				'<option value="0">Disabled</option>' +
				'<option value="49">Short (fastest)</option>' +
				'<option value="47">Medium (medium)</option>' +
				'<option value="45">Long (slowest)</option>' +
			'</select></td></tr>' +
			'<tr><td align="right" style="color:brown;">Find Other progress:' +
			'&nbsp;</td><td align="left" width="310" id="bufferProgress">Idle</td>' +
			'<td align="center"><input id="clearresultsbutton" class=' +
			'"custombutton" type="button" value="Clear Results"></td>' +
			'<td align="center"><input id="findbuffsbutton" class=' +
			'"custombutton" type="button" value="Find Buffers"></td></tr>' +
			'</tbody></table><br>' +
			'<h1>Potential Players and Bio Info</h1><br>' +
			'<table width="620" cellspacing="0" cellpadding="3" border="1" ' +
			'align="center" id="buffTable"><tbody>' +
			'<tr><th width="120">&nbsp;Name</th><th width="200">&nbsp;Player ' +
			'Info</th><th>&nbsp;Notable Bio Text</th></tr>' +
			'</tbody></table><br>' +
			'<div class=content style="font-size:xx-small; color:brown; ' +
			'margin-left:28px; margin-right:28px;">Disclaimer: This ' +
			'functionality does a simple text search for the terms above. ' +
			'It is not as smart as you are, so please do not judge the results ' +
			'too harshly. It does not search all online players, just a subset ' +
			'of those that have been on recently. ' +
			'The aim is to be fast and still return a good set of results. This ' +
			'feature is a work in progress, so it may be tweaked and enhanced ' +
			'over time.</div>';
		content.innerHTML = injectionText;
		document.getElementById('findbuffsbutton')
			.addEventListener('click', FSH.findBuffs.findOtherStart, true);
		document.getElementById('clearresultsbutton')
			.addEventListener('click', FSH.findBuffs.findBuffsClearResults, true);
	},

	findOtherStart: function() { // Legacy
		var textToSearchFor = $('#textToSearchFor').val();
		//use existing array structure to save search text ...
		var textArray=textToSearchFor.split(',');
		var tempArray = [];
		for (var i=0;i<textArray.length;i += 1) {
			tempArray.push(textArray[i].trim());
		}
		textToSearchFor = tempArray.join(',');
		FSH.Helper.findBuffNicks = textToSearchFor;
		FSH.Helper.findBuffMinCastLevel = 1;

		document.getElementById('buffNicks').innerHTML = FSH.Helper.findBuffNicks;
		var bufferProgress = document.getElementById('bufferProgress');
		bufferProgress.innerHTML = 'Gathering list of profiles to search ...';
		bufferProgress.style.color = 'green';
		FSH.Helper.findBuffsLevel175Only =
			document.getElementById('level175').checked;
		document.getElementById('buffersProcessed').innerHTML = 0;
		FSH.Helper.onlinePlayers = [];
		FSH.System.setValue('textToSearchFor', textToSearchFor);
		FSH.Helper.extraProfile = document.getElementById('extraProfile').value;
		FSH.System.setValue('extraProfile', FSH.Helper.extraProfile);
		//get list of players to search, starting with guild>manage page
		FSH.System.xmlhttp('index.php?cmd=guild&subcmd=manage',
			FSH.findBuffs.findBuffsParseGuildManagePage);
	},

};

FSH.monstorLog = { // Native - Bad

	injectMonsterLog: function() { // Native
		var entityLog = FSH.System.getValueJSON('monsterLog');
		var i;
		if (entityLog) {
			FSH.Helper.entityLogTable = {entity:[]};
			for (var name in entityLog) {
				if (!entityLog.hasOwnProperty(name)) { continue; }
				var newEntity = {};
				newEntity.name = name;
				newEntity.key1 = entityLog[name].min.key1;
				for (i = 2; i < 4; i += 1) {
					newEntity['key' + i] = entityLog[name].min['key' + i];
				}
				for (i = 4; i < 10; i += 1) {
					newEntity['key' + i] = FSH.System.addCommas(
						entityLog[name].min['key' + i]) + ' - ' +
						FSH.System.addCommas(entityLog[name].max['key' + i]);
				}
				for (i = 10; i < 11; i += 1) {
					if (entityLog[name].min['key' + i]) {
						newEntity['key' + i] = '';
						for (var j = 0; j < entityLog[name].min['key' + i].length; j += 1) {
							newEntity['key' + i] += '<nobr>' + entityLog[name]
								.min['key' + i][j].name + ' ' +
								entityLog[name].min['key' + i][j].value + ' - ' +
								entityLog[name].max['key' + i][j].value + '<nobr>' +
								(j !== entityLog[name].min['key' + i].length - 1 ? '<br/>' :
								'');
						}
					}
				}
				FSH.Helper.entityLogTable.entity.push(newEntity);
			}
			FSH.Helper.sortBy = 'key3';
			FSH.Helper.sortAsc = true;
			FSH.Helper.entityLogTable.entity.sort(FSH.System.numberSort);
		}
		var content=FSH.Layout.notebookContent();
		content.innerHTML = '<span id=FSH.Helper.entityTableOutput>No monster ' +
			'information! Please enable entity log and travel a bit to see the ' +
			'world</span>';
		FSH.monstorLog.generateEntityTable();
	},

	generateEntityTable: function() { // Native - Bad
		var content = document.getElementById('FSH.Helper.entityTableOutput');
		if (!FSH.Helper.entityLogTable || !content) {return;}
		var i;
		var entityInformationValue;
		var cell;

		var result = '<table cellspacing="0" cellpadding="0" border="0" ' +
			'width="100%"><tr style="background-color:#110011; color:white;">'+
			'<td width="90%" nobr align=center><b>&nbsp;Entity Information</b></td>'+
			'<td width="10%" nobr>[<span id="FSH.Helper.clearEntityLog">' +
			'Clear</span>]</td>'+
			'</tr>' +
			'</table>'+
			'<table id="Helper:EntityInfo" cellspacing="1" cellpadding="2" ' +
			'border="0" style="font-size:small;"><tr ' +
			'style="background-color:#e2b960;">' +
			'<th width="25%" align="left" sortkey="name" colspan="2">Entity</th>' +
			'<th align="center" sortkey="key2">Class</th>' +
			'<th align="center" sortkey="key3" sorttype="number">Lvl</th>' +
			'<th align="center">Attack</th>' +
			'<th align="center">Defence</th>' +
			'<th align="center">Armor</th>' +
			'<th align="center">Damage</th>' +
			'<th align="center">HP</th>' +
			'<th align="center">Enhancements</th>' +
			'</tr>';
		for (var k=0;k<FSH.Helper.entityLogTable.entity.length;k += 1) {
			result += '<tr class="HelperMonsterLogRow' + (1 + k % 2) +
				'"><td align="center"><img width=40 height=40 ' +
				'data-tipped="' + FSH.Helper.entityLogTable.entity[k].key1 + '" ' +
				'src="' + FSH.Helper.entityLogTable.entity[k].key1 + '"/></td>' +
				'<td align="left">' + FSH.Helper.entityLogTable.entity[k].name +
				'</td>';
			for (i = 2; i < 4; i += 1) {
				result += '<td align="center">' +
					FSH.System.addCommas(FSH.Helper.entityLogTable.entity[k]['key' + i]) +
					'</td>';
			}
			for (i = 4; i < 9; i += 1) {// 10 is gold, we don't need to show this
				result += '<td align="center">' +
					FSH.Helper.entityLogTable.entity[k]['key'+i] + '</td>';
			}
			for (i = 10; i < 11; i += 1) {
				entityInformationValue = FSH.Helper.entityLogTable.entity[k]['key' + i];
				if (!entityInformationValue) {
					result += '<td align="center" style="font-size:small; ' +
						'color:gray;">**Missing**</td>';
				} else {
					result += '<td align="center" style="font-size:xx-small;">' +
						entityInformationValue + '</td>';
				}
			}
		}
		result += '</table>';
		content.innerHTML = result;
		document.getElementById('FSH.Helper.clearEntityLog')
			.addEventListener('click', FSH.monstorLog.clearEntityLog, true);

		var theTable=document.getElementById('Helper:EntityInfo');
		for (i=0; i<theTable.rows[0].cells.length; i += 1) {
			cell=theTable.rows[0].cells[i];
			if (cell.getAttribute('sortkey')) {
				cell.style.textDecoration='underline';
				cell.style.cursor='pointer';
				cell.addEventListener('click', FSH.monstorLog.sortEntityLogTable, true);
			}
		}
	},

	clearEntityLog: function() { // Native
		FSH.System.setValue('monsterLog', '');
		location.href = 'index.php?cmd=notepad&blank=1&subcmd=monsterlog';
	},

	sortEntityLogTable: function(evt) { // Native
		var headerClicked = evt.target.getAttribute('sortKey');
		var sortType = evt.target.getAttribute('sortType');
		if (!sortType) {sortType='string';}
		if (FSH.Helper.sortAsc === undefined) {FSH.Helper.sortAsc = true;}
		if (FSH.Helper.sortBy && FSH.Helper.sortBy === headerClicked) {
			FSH.Helper.sortAsc = !FSH.Helper.sortAsc;
		}

		FSH.Helper.sortBy = headerClicked;

		switch(sortType) {
			case 'string':
				FSH.Helper.entityLogTable.entity.sort(FSH.System.stringSort);
				break;
			case 'number':
				FSH.Helper.entityLogTable.entity.sort(FSH.System.numberSort);
				break;
			default:
				break;
		}
		FSH.monstorLog.generateEntityTable();
	},

	pushMonsterInfo: function(monster) { // Native
		// name, img, cls, lvl, atk, def, arm, dmg, hp, gold
		var i;
		var name = monster.key0;
		var monsterLog = FSH.System.getValueJSON('monsterLog');
		if (!monsterLog) {monsterLog = {};}
		if (!monsterLog[name]) {
			monsterLog[name] = {'min':{}, 'max':{}};
			for (i = 1; i < 10; i += 1) {
				monsterLog[name].min['key' + i] = 1e+100;
				monsterLog[name].max['key' + i] = 0;
			}
			for (i = 10; i < 11; i += 1) {// enchantments
				if (monster['key' + i]) { //does this critter have enchantments, if so, then see min and max with the initial list
					monsterLog[name].min['key' + i] = monster['key' + i];
					monsterLog[name].max['key' + i] = monster['key' + i];
				}
			}
		}
		for (i = 1; i < 4; i += 1) {
			monsterLog[name].min['key' + i] = monster['key' + i];
		}
		for (i = 4; i < 10; i += 1) {
			var value = FSH.System.intValue(monster['key' + i]);
			monsterLog[name].min['key' + i] =
				monsterLog[name].min['key' + i] < value ?
				monsterLog[name].min['key' + i] : value;
			monsterLog[name].max['key' + i] =
				monsterLog[name].max['key' + i] > value ?
				monsterLog[name].max['key' + i] : value;
		}
		for (i = 10; i < 11; i += 1) {// enchantments
			if (monster['key' + i]) { //does this critter have enchantments
				if (!monsterLog[name].min['key' + i] ||
					!monsterLog[name].min['key' + i]) {
					monsterLog[name].min['key' + i] = monster['key' + i];
					monsterLog[name].max['key' + i] = monster['key' + i];
				}
				for (var j = 0; j < monster['key' + i].length; j += 1) {
					var enchantValue = monster['key' + i][j].value * 1;
					monsterLog[name].min['key' + i][j].value =
						monsterLog[name].min['key' + i][j].value * 1 < enchantValue ?
						monsterLog[name].min['key' + i][j].value : enchantValue;
					monsterLog[name].max['key' + i][j].value =
						monsterLog[name].max['key' + i][j].value * 1 > enchantValue ?
						monsterLog[name].max['key' + i][j].value : enchantValue;
				}
			}
		}
		FSH.System.setValueJSON('monsterLog', monsterLog);
	},

};

FSH.oldRelic = { // Legacy - Old map

	injectRelic: function() { // Hybrid - Old map
		var relicNameElement = $('td:contains("Below is the current status ' +
			'for the relic"):last');
		relicNameElement.css('font-size', 'x-small');

		var injectHere = $('td:contains("Defended"):last');
		if (injectHere.length === 0) {return;}
		var defendingGuildMiniSRC = $('img[src*="_mini.jpg"]').attr('src');
		var defendingGuildID = /guilds\/(\d+)_mini.jpg/
			.exec(defendingGuildMiniSRC)[1];
		if (defendingGuildID === FSH.Layout.guildId().toString()) {
			var listOfDefenders = injectHere.next().text().split(',');
			// quick buff only supports 16
			var shortList = [];
			if (listOfDefenders) {
				var modifierWord;
				for (var i = 0; i < listOfDefenders.length; i += 1) {
					shortList.push(listOfDefenders[i]);
					if ((i + 1) % 16 === 0 && i !== 0 ||
						i === listOfDefenders.length - 1) {
						modifierWord = FSH.Layout.places[Math.floor(i / 16)];
						var htmlToAppend = '<br><nobr><a href="#" id="buffAll' +
							modifierWord + '"><span style="color:blue; font-' +
							'size:x-small;" title="Quick buff functionality ' +
							'from HCS only does 16">Buff ' + modifierWord +
							' 16</span></a></nobr>';
						injectHere.append(htmlToAppend);
						var buffAllLink = $('#buffAll' + modifierWord);
						buffAllLink.attr('href', FSH.Layout.buffAllHref(shortList));
						shortList = [];
					}
				}
			}
		}
		injectHere.append('<input id="calculatedefenderstats" type="button" ' +
			'value="Fetch Stats" title="Calculate the stats of the players ' +
			'defending the relic." class="custombutton">');
		document.getElementById('calculatedefenderstats')
			.addEventListener('click',
				function() {
					FSH.ajax.getMembrList(false)
						.done(FSH.oldRelic.calculateRelicDefenderStats);
				},
				true);
	},

	calculateRelicDefenderStats: function() { // Legacy - Old map
		var validMemberString;
		var membrList = FSH.Helper.membrList;
		//hide the calc button
		$('input[id="calculatedefenderstats"]').css('visibility','hidden');
		//make the text smaller
		$('td:contains("Below is the current status for the relic"):last')
			.css('fontSize','x-small');
		//set the colspan of all other rows to 3
		$('table[width="600"]>tbody>tr:not(:eq(9))>td').attr('colspan',3);

		var tableWithBorderElement = $('table[cellpadding="5"]');
		tableWithBorderElement
			.attr('align','left')
			.attr('colSpan',2);
		var tableInsertPoint = tableWithBorderElement.parents('tr:first');
		tableInsertPoint.append('<td colspan="1"><table width="200" style="' +
			'border:1px solid #A07720;"><tbody><tr><td id="InsertSpot"></td>' +
			'</tr></tbody></table></td>');
		var extraTextInsertPoint = FSH.System.findNode('//td[@id="InsertSpot"]');
		var defendingGuildHref = $('a[href*="index.php?cmd=guild&subcmd=view' +
			'&guild_id="]:first').attr('href');
		FSH.oldRelic.getRelicGuildData(extraTextInsertPoint,defendingGuildHref);

		var defendingGuildMiniSRC = $('img[src*="_mini.jpg"]').attr('src');
		var defendingGuildID = /guilds\/(\d+)_mini.jpg/
			.exec(defendingGuildMiniSRC)[1];
		var myGuildID = FSH.Layout.guildId().toString();

		var hideRelicOffline = FSH.System.getValue('hideRelicOffline');
		if (defendingGuildID === myGuildID && !hideRelicOffline) {
			validMemberString = '';
			Object.keys(membrList).forEach(function(val) {
				var member = membrList[val];
				var lastLogin = 0;
				if (member.last_login) {
					lastLogin = Math.floor(Date.now() / 1000 -
						member.last_login);
				}
				if (lastLogin >= 120 && // two minutes is offline
					lastLogin <= 604800 && // 7 days max
					(member.level < 400 || member.level > 421 &&
					member.level < 441 || member.level > 450)) {
					validMemberString += member.username + ' ';
				}
			});
		}

		var defenders = $('#pCC table table a[href*="cmd=profile&player_id="]');
		defenders.each(function(ind) {
			var $this = $(this);
			FSH.oldRelic.getRelicPlayerData(ind, $this.attr('href'), $this.text());
			if (defendingGuildID === myGuildID && !hideRelicOffline) {
				validMemberString = validMemberString.replace(
					$this.text() + ' ','');
			}
		});
		FSH.Helper.relicDefenderCount = defenders.length;

		var textToInsert = '<tr><td><table class="relicT">' +
			'<tr><td colspan="2" class="headr">Defending Guild Stats</td></tr>' +
			'<tr><td class="brn">Number of Defenders:</td>' +
				'<td>' + FSH.Helper.relicDefenderCount + '</td></tr>' +
			'<tr><td class="brn">Relic Count:</td>' +
				'<td title="relicCount">0</td></tr>' +
			'<tr><td class="brn">Lead Defender Bonus:</td>' +
				'<td title="LDPercentage">0</td></tr>' +
			'<tr class="hidden"><td>Relic Count Processed:</td>' +
				'<td title="relicProcessed">0</td></tr>' +
			'<tr class="hidden">' +
				'<td colspan="2" class="headr">Lead Defender Full Stats</td></tr>' +
			'<tr class="hidden"><td>Attack:</td>' +
				'<td title="LDattackValue">0</td></tr>' +
			'<tr class="hidden"><td>Defense:</td>' +
				'<td title="LDdefenseValue">0</td></tr>' +
			'<tr class="hidden"><td>Armor:</td>' +
				'<td title="LDarmorValue">0</td></tr>' +
			'<tr class="hidden"><td>Damage:</td>' +
				'<td title="LDdamageValue">0</td></tr>' +
			'<tr class="hidden"><td>HP:</td>' +
				'<td title="LDhpValue">0</td></tr>' +
			'<tr class="hidden"><td>LDProcessed:</td>' +
				'<td title="LDProcessed">0</td></tr>' +
			'<tr class="hidden"><td>LDFlinchLevel:</td>' +
				'<td title="LDFlinchLevel">0</td></tr>' +
			'<tr class="hidden"><td>LDConstitutionLevel:</td>' +
				'<td title="LDConstitutionLevel">0</td></tr>' +
			'<tr class="hidden"><td>LDNightmareVisageLevel:</td>' +
				'<td title="LDNightmareVisageLevel">0</td></tr>' +
			'<tr class="hidden"><td>LDFortitudeLevel:</td>' +
				'<td title="LDFortitudeLevel">0</td></tr>' +
			'<tr class="hidden"><td>LDChiStrikeLevel:</td>' +
				'<td title="LDChiStrikeLevel">0</td></tr>' +
			'<tr class="hidden"><td>LDTerrorizeLevel:</td>' +
				'<td title="LDTerrorizeLevel">0</td></tr>' +
			'<tr class="hidden"><td>LDSanctuaryLevel:</td>' +
				'<td title="LDSanctuaryLevel">0</td></tr>' +
			'<tr><td colspan="2" class="headr">Other Defender Stats</td></tr>' +
			'<tr><td class="brn">Raw Attack:</td>' +
				'<td class="grey" title="attackValue">0</td></tr>' +
			'<tr><td class="brn">Attack w/ buffs:</td>' +
				'<td title="attackValueBuffed">0</td></tr>' +
			'<tr><td class="brn">Raw Defense:</td>' +
				'<td class="grey" title="defenseValue">0</td></tr>' +
			'<tr><td class="brn">Defense w/buffs:</td>' +
				'<td title="defenseValueBuffed">0</td></tr>' +
			'<tr><td class="brn">Raw Armor:</td>' +
				'<td title="armorValue">0</td></tr>' +
			'<tr><td class="brn">Armor w/ buffs:</td>' +
				'<td title="armorValueBuffed">0</td></tr>' +
			'<tr><td class="brn">Raw Damage:</td>' +
				'<td class="grey" title="damageValue">0</td></tr>' +
			'<tr><td class="brn">Damage w/ buffs:</td>' +
				'<td title="damageValueBuffed">0</td></tr>' +
			'<tr><td class="brn">Raw HP:</td>' +
				'<td class="grey" title="hpValue">0</td></tr>' +
			'<tr><td class="brn">HP w/ buffs:</td>' +
				'<td title="hpValueBuffed">0</td></tr>' +
			'<tr><td class="brn">Processed:</td>' +
				'<td title="defendersProcessed">0</td></tr>' +
			'<tr><td class="headr" colspan=2>Adjusted defense values:</td></tr>' +
			'<tr><td class="brn">DC225:</td>' +
				'<td title="DC225">0</td></tr>' +
			'<tr><td class="brn">DC175:</td>' +
				'<td title="DC175">0</td></tr>' +
			'<tr><td class="headr" colspan=2>Attacking Group Stats:</td></tr>' +
			'<tr><td class="brn">Raw Group Attack:</td>' +
				'<td class="grey" title="GroupAttack"></td></tr>' +
			'<tr><td class="brn">Group Attack w/ buffs:</td>' +
				'<td title="GroupAttackBuffed"></td></tr>' +
			'<tr><td class="brn">Raw Group Defense:</td>' +
				'<td class="grey" title="GroupDefense"></td></tr>' +
			'<tr><td class="brn">Group Defense w/ buffs:</td>' +
				'<td title="GroupDefenseBuffed"></td></tr>' +
			'<tr><td class="brn">Raw Group Armor:</td>' +
				'<td title="GroupArmor"></td></tr>' +
			'<tr><td class="brn">Group Armor w/ buffs:</td>' +
				'<td title="GroupArmorBuffed"></td></tr>' +
			'<tr><td class="brn">Raw Group Damage:</td>' +
				'<td class="grey" title="GroupDamage"></td></tr>' +
			'<tr><td class="brn">Group Damage w/ buffs:</td>' +
				'<td title="GroupDamageBuffed"></td></tr>' +
			'<tr><td class="brn">Raw Group HP:</td>' +
				'<td class="grey" title="GroupHP"></td></tr>' +
			'<tr><td class="brn">Group HP w/ buffs:</td>' +
				'<td title="GroupHPBuffed"></td></tr>' +
			'<tr><td class="headr" colspan=2>Processing:</td></tr>' +
			'<tr><td style="color:green;" colspan="2" title="ProcessingStatus">' +
				'Parsing defending guild stats ...</td></tr>' +
			'<tr><td class="headr" colspan=2>Assumptions:</td></tr>' +
			'<tr><td colspan="2" class="grey">Above calculations include ' +
				'Constitution, Fortitude, Nightmare Visage, Chi Strike, Terrorize ' +
				'and Flinch bonus calculations (in that order) on both the ' +
				'defending group and attacking group.</td></tr>';

		if (defendingGuildID === myGuildID && !hideRelicOffline) {
			validMemberString = validMemberString.slice(0, -1);
			var validMemberArray = validMemberString.split(' ');
			validMemberArray.forEach(function(val, ind, arr) {
				if (membrList[val]) {
					arr[ind] = '<a style="color:red;" href="index.php?cmd=' +
						'profile&player_id=' + membrList[val].id + '">' +
						val + '</a>';
				}
			});
			validMemberString = validMemberArray.join(' ');

			textToInsert += '<tr><td class="headr" colspan=2>Offline guild ' +
					'members not at relic:</td></tr>' +
				'<tr title="offlinePlayerListControl">' +
					'<td colspan=2 style="color:red;" title="offlinePlayerList">' +
					validMemberString + '</td></tr>' +
				'<tr class="hidden"><td class="brn">OfflinePlayerCount:</td>' +
					'<td title="offlinePlayerCount">' + validMemberArray.length +
					'</td></tr>' +
				'<tr class="hidden"><td class="brn">OfflinePlayersProcessed:</td>' +
					'<td title="offlinePlayersProcessed">0</td></tr>' +
				'<tr class="hidden" title="offlinePlayerListControlTemp" ' +
					'style="display:block;"><td style="color:green;" colspan=2>' +
					'Checking offline status ...</td></tr>';
		}
		textToInsert += '</table><td><tr>';
		extraTextInsertPoint.innerHTML += textToInsert;
	},

	getRelicGuildData: function(extraTextInsertPoint, hrefpointer) { // Legacy - Old map
		FSH.System.xmlhttp(hrefpointer, FSH.oldRelic.parseRelicGuildData);
	},

	parseRelicGuildData: function(responseText) { // jQuery - Old map
		var doc = FSH.System.createDocument(responseText);
		var relicCount = $('#pCC table table table img[data-tipped*="' +
			'Relic Bonuses"]', doc).length;
		var relicCountElement = $('td[title="relicCount"]');
		relicCountElement.html(relicCount);
		var relicProcessedElement = $('td[title="relicProcessed"]');
		relicProcessedElement.html(1);
		FSH.oldRelic.syncRelicData();
	},

	getRelicPlayerData: function(defenderCount, hrefpointer, pl) { // Hybrid - Old map
		if (defenderCount === 0) {
			FSH.System.xmlhttp(
				hrefpointer,
				FSH.oldRelic.parseRelicPlayerData,
				{'defenderCount': defenderCount}
			);
		} else {
			$.ajax({
				cache: false,
				dataType: 'json',
				url:'index.php',
				data: {
					'cmd': 'export',
					'subcmd': 'profile',
					'player_username': pl
				},
				success: function(data) {
					FSH.oldRelic.parseRelicPlayerData(data, {'defenderCount': defenderCount});
				}
			});
		}
	},

	parseRelicPlayerData: function(responseText, callback) { // jQuery - Old map
		var defenderMultiplier;
		var attackValue;
		var defenseValue;
		var overallDefense;
		var armorValue;
		var damageValue;
		var hpValue;
		var defendersProcessed;
		var defendersProcessedNumber;
		var attackNumber;
		var defenseNumber;
		var armorNumber;
		var damageNumber;
		var hpNumber;

		var defenderCount = callback.defenderCount;

		var player = FSH.Helper.playerData(responseText);

		if (defenderCount !== 0) {
			defenderMultiplier = 0.2;
			attackValue = $('td[title="attackValue"]');
			attackNumber = FSH.System.intValue(attackValue.html());
			attackValue.html(FSH.System.addCommas(attackNumber +
				Math.round(player.attackValue * defenderMultiplier)));
			defenseValue = $('td[title="defenseValue"]');
			defenseNumber = FSH.System.intValue(defenseValue.html());
			overallDefense =
				defenseNumber + Math.round(player.defenseValue * defenderMultiplier);
			defenseValue.html(FSH.System.addCommas(overallDefense));
			armorValue = $('td[title="armorValue"]');
			armorNumber = FSH.System.intValue(armorValue.html());
			armorValue.html(FSH.System.addCommas(armorNumber +
				Math.round(player.armorValue * defenderMultiplier)));
			damageValue = $('td[title="damageValue"]');
			damageNumber = FSH.System.intValue(damageValue.html());
			damageValue.html(FSH.System.addCommas(damageNumber +
				Math.round(player.damageValue * defenderMultiplier)));
			hpValue = $('td[title="hpValue"]');
			hpNumber = FSH.System.intValue(hpValue.html());
			hpValue.html(FSH.System.addCommas(hpNumber +
				Math.round(player.hpValue * defenderMultiplier)));
			defendersProcessed = $('td[title="defendersProcessed"]');
			defendersProcessedNumber =
				FSH.System.intValue(defendersProcessed.html());
			defendersProcessed.html(
				FSH.System.addCommas(defendersProcessedNumber + 1));
		}
		else {
			FSH.oldRelic.leadDefender(player);
		}
		FSH.oldRelic.syncRelicData();
	},

	syncRelicData: function() { // jQuery - Bad - Old map
		var defendersProcessed = $('td[title="defendersProcessed"]');
		var defendersProcessedNumber =
			FSH.System.intValue(defendersProcessed.html());
		var relicProcessedValue = $('td[title="relicProcessed"]');
		if (FSH.Helper.relicDefenderCount === defendersProcessedNumber &&
			relicProcessedValue.html() === '1') {
			FSH.oldRelic.processRelicStats();
		}
	},

	leadDefender: function(player) { // jQuery - Old map
		//get lead defender (LD) buffs here for use later ... 
		var attackValue = $('td[title="LDattackValue"]');
		var attackNumber = FSH.System.intValue(attackValue.html());
		attackValue.html(FSH.System.addCommas(attackNumber +
			Math.round(player.attackValue)));
		var defenseValue = $('td[title="LDdefenseValue"]');
		var defenseNumber = FSH.System.intValue(defenseValue.html());
		defenseValue.html(FSH.System.addCommas(defenseNumber +
			Math.round(player.defenseValue)));
		var armorValue = $('td[title="LDarmorValue"]');
		var armorNumber=FSH.System.intValue(armorValue.html());
		armorValue.html(FSH.System.addCommas(armorNumber +
			Math.round(player.armorValue)));
		var damageValue = $('td[title="LDdamageValue"]');
		var damageNumber=FSH.System.intValue(damageValue.html());
		damageValue.html(FSH.System.addCommas(damageNumber +
			Math.round(player.damageValue)));
		var hpValue = $('td[title="LDhpValue"]');
		var hpNumber=FSH.System.intValue(hpValue.html());
		hpValue.html(FSH.System.addCommas(hpNumber + Math.round(player.hpValue)));
		var defendersProcessed = $('td[title="defendersProcessed"]');
		var defendersProcessedNumber =
			FSH.System.intValue(defendersProcessed.html());
		defendersProcessed.html(
			FSH.System.addCommas(defendersProcessedNumber + 1));

		$('td[title="LDProcessed"]')           .html(1);
		$('td[title="LDConstitutionLevel"]')   .html(player.constitutionLevel);
		$('td[title="LDFlinchLevel"]')         .html(player.flinchLevel);
		$('td[title="LDNightmareVisageLevel"]').html(player.nightmareVisageLevel);
		$('td[title="LDFortitudeLevel"]')      .html(player.fortitudeLevel);
		$('td[title="LDChiStrikeLevel"]')      .html(player.chiStrikeLevel);
		$('td[title="LDTerrorizeLevel"]')      .html(player.terrorizeLevel);
		$('td[title="LDSanctuaryLevel"]')      .html(player.sanctuaryLevel);
	},

	processRelicStats: function() { // Legacy - Old map
		var processingStatus = $('td[title="ProcessingStatus"]');
		processingStatus.html('Processing defending guild stats ... ');
		var relicCountValue = $('td[title="relicCount"]');
		var relicCount = FSH.System.intValue(relicCountValue.html());
		var relicMultiplier = 1;
		if (relicCount === 1) {
			relicMultiplier = 1.5;
		}
		else if (relicCount >= 2) {
			relicMultiplier = Math.round((1 - relicCount/10)*100)/100;
		}

		var LDConstitutionLevel =
			FSH.System.intValue($('td[title="LDConstitutionLevel"]').text());
		var LDNightmareVisageLevel =
			FSH.System.intValue($('td[title="LDNightmareVisageLevel"]').text());
		var LDFortitudeLevel =
			FSH.System.intValue($('td[title="LDFortitudeLevel"]').text());
		var LDChiStrikeLevel =
			FSH.System.intValue($('td[title="LDChiStrikeLevel"]').text());
		var LDSanctuaryLevel =
			FSH.System.intValue($('td[title="LDSanctuaryLevel"]').text());
		var attackValue = $('td[title="attackValue"]');
		var attackValueBuffed = $('td[title="attackValueBuffed"]');
		var LDattackValue = $('td[title="LDattackValue"]');
		var attackNumber = FSH.System.intValue(attackValue.html());
		var LDattackNumber = FSH.System.intValue(LDattackValue.html());
		var overallAttack =
			attackNumber + Math.round(LDattackNumber * relicMultiplier);
		attackValue.html(FSH.System.addCommas(overallAttack));
		var nightmareVisageEffect =
			Math.ceil(overallAttack * (LDNightmareVisageLevel * 0.0025));
		attackValueBuffed.html(
			FSH.System.addCommas(overallAttack - nightmareVisageEffect));
		var defenseValue = $('td[title="defenseValue"]');
		var defenseValueBuffed = $('td[title="defenseValueBuffed"]');
		var LDdefenseValue = $('td[title="LDdefenseValue"]');
		var defenseNumber = FSH.System.intValue(defenseValue.html());
		var LDdefenseNumber = FSH.System.intValue(LDdefenseValue.html());
		var overallDefense =
			defenseNumber + Math.round(LDdefenseNumber * relicMultiplier);
		defenseValue.html(FSH.System.addCommas(overallDefense));
		var defenseWithConstitution =
			Math.ceil(overallDefense * (1 + LDConstitutionLevel * 0.001));
		var totalDefense = defenseWithConstitution + nightmareVisageEffect;
		defenseValueBuffed.html(FSH.System.addCommas(totalDefense));
		var dc225 = $('td[title="DC225"]');
		var dc175 = $('td[title="DC175"]');
		dc225.html(FSH.System.addCommas(
			Math.ceil(totalDefense * (1 - 225 * 0.002))));
		dc175.html(FSH.System.addCommas(
			Math.ceil(totalDefense * (1 - 175 * 0.002))));
		var armorValue = $('td[title="armorValue"]');
		var armorValueBuffed = $('td[title="armorValueBuffed"]');
		var LDarmorValue = $('td[title="LDarmorValue"]');
		var armorNumber = FSH.System.intValue(armorValue.html());
		var LDarmorNumber = FSH.System.intValue(LDarmorValue.html());
		var totalArmor = armorNumber + Math.round(LDarmorNumber * relicMultiplier);
		armorValue.html(FSH.System.addCommas(totalArmor));
		armorValueBuffed.html(FSH.System.addCommas(totalArmor +
			Math.floor(totalArmor * LDSanctuaryLevel * 0.001)));
		var damageValue = $('td[title="damageValue"]');
		var damageValueBuffed = $('td[title="damageValueBuffed"]');
		var LDdamageValue = $('td[title="LDdamageValue"]');
		var damageNumber = FSH.System.intValue(damageValue.html());
		var LDdamageNumber = FSH.System.intValue(LDdamageValue.html());
		var hpValue = $('td[title="hpValue"]');
		var hpValueBuffed = $('td[title="hpValueBuffed"]');
		var LDhpValue = $('td[title="LDhpValue"]');
		var hpNumber = FSH.System.intValue(hpValue.html());
		var LDhpNumber = FSH.System.intValue(LDhpValue.html());
		var fortitudeBonusHP =
			Math.ceil(defenseWithConstitution * LDFortitudeLevel * 0.001);
		var chiStrikeBonusDamage = Math.ceil((hpNumber +
			Math.round(LDhpNumber * relicMultiplier) + fortitudeBonusHP) *
				LDChiStrikeLevel * 0.001);
		damageValue.html(FSH.System.addCommas(damageNumber +
			Math.round(LDdamageNumber * relicMultiplier)));
		damageValueBuffed.html(FSH.System.addCommas(damageNumber +
			Math.round(LDdamageNumber * relicMultiplier) + chiStrikeBonusDamage));
		hpValue.html(FSH.System.addCommas(hpNumber +
			Math.round(LDhpNumber * relicMultiplier)));
		hpValueBuffed.html(FSH.System.addCommas(hpNumber +
			Math.round(LDhpNumber * relicMultiplier) + fortitudeBonusHP));
		var LDpercentageValue = $('td[title="LDPercentage"]');
		LDpercentageValue.html(relicMultiplier*100 + '%');

		FSH.System.xmlhttp('index.php?cmd=guild&subcmd=groups',
			FSH.oldRelic.relicCheckIfGroupExists);
	},

	relicCheckIfGroupExists: function(responseText) { // Hybrid - Old map
		var processingStatus = $('td[title="ProcessingStatus"]');
		processingStatus.html('Checking attacking group ... ');
		var doc = FSH.System.createDocument(responseText);
		var groupExistsIMG =
			$(doc).find('img[title="Disband Group (Cancel Attack)"]');
		if (groupExistsIMG.length > 0) {
			var groupHref = groupExistsIMG.parents('td:first').find('a:first')
				.attr('href');
			FSH.System.xmlhttp(groupHref, FSH.oldRelic.getRelicGroupData);
		} else {
			processingStatus.html('Done.');
		}
	},

	getRelicGroupData: function(responseText) { // Hybrid - Old map
		var processingStatus = $('td[title="ProcessingStatus"]');
		processingStatus.html('Parsing attacking group stats ... ');
		var doc = FSH.System.createDocument(responseText);
		var theTable = $('#pCC table table table', doc);
		FSH.Helper.relicGroupAttackValue =
			FSH.System.intValue($('#stat-attack', theTable).text());
		FSH.Helper.relicGroupDefenseValue =
			FSH.System.intValue($('#stat-defense', theTable).text());
		FSH.Helper.relicGroupArmorValue =
			FSH.System.intValue($('#stat-armor', theTable).text());
		FSH.Helper.relicGroupDamageValue =
			FSH.System.intValue($('#stat-damage', theTable).text());
		FSH.Helper.relicGroupHPValue =
			FSH.System.intValue($('#stat-hp', theTable).text());
		FSH.System.xmlhttp('index.php?cmd=guild&subcmd=mercs',
			FSH.oldRelic.parseRelicMercStats);
	},

	parseRelicMercStats: function(responseText) { // Hybrid - Old map
		//merc stats do not count for group stats so subtract them here ...
		var processingStatus = $('td[title="ProcessingStatus"]');
		processingStatus.html('Subtracting group merc stats ... ');

		var mercPage = FSH.System.createDocument(responseText);
		var mercElements = mercPage.getElementsByTagName('IMG');
		var totalMercAttack = 0;
		var totalMercDefense = 0;
		var totalMercArmor = 0;
		var totalMercDamage = 0;
		var totalMercHP = 0;
		var merc;
		for (var i = 0; i < mercElements.length; i += 1) {
			merc = mercElements[i];
			var mouseoverText = $(merc).data('tipped');
			var src = merc.getAttribute('src');
			if (mouseoverText && src.search('/merc/') !== -1){
				var attackRE = /<td>Attack:<\/td><td>(\d+)<\/td>/;
				var mercAttackValue = attackRE.exec(mouseoverText)[1] * 1;
				totalMercAttack += mercAttackValue;
				var defenseRE = /<td>Defense:<\/td><td>(\d+)<\/td>/;
				var mercDefenseValue = defenseRE.exec(mouseoverText)[1] * 1;
				totalMercDefense += mercDefenseValue;
				var armorRE = /<td>Armor:<\/td><td>(\d+)<\/td>/;
				var mercArmorValue = armorRE.exec(mouseoverText)[1] * 1;
				totalMercArmor += mercArmorValue;
				var damageRE = /<td>Damage:<\/td><td>(\d+)<\/td>/;
				var mercDamageValue = damageRE.exec(mouseoverText)[1] * 1;
				totalMercDamage += mercDamageValue;
				var hpRE = /<td>HP:<\/td><td>(\d+)<\/td>/;
				var mercHPValue = hpRE.exec(mouseoverText)[1] * 1;
				totalMercHP += mercHPValue;
			}
		}
		FSH.Helper.relicGroupAttackValue =
			FSH.Helper.relicGroupAttackValue - Math.round(totalMercAttack * 0.2);
		FSH.Helper.relicGroupDefenseValue =
			FSH.Helper.relicGroupDefenseValue - Math.round(totalMercDefense * 0.2);
		FSH.Helper.relicGroupArmorValue =
			FSH.Helper.relicGroupArmorValue - Math.round(totalMercArmor * 0.2);
		FSH.Helper.relicGroupDamageValue =
			FSH.Helper.relicGroupDamageValue - Math.round(totalMercDamage * 0.2);
		FSH.Helper.relicGroupHPValue =
			FSH.Helper.relicGroupHPValue - Math.round(totalMercHP * 0.2);

		FSH.System.xmlhttp('index.php?cmd=profile',
			FSH.oldRelic.getRelicPlayerBuffs);
	},

	getRelicPlayerBuffs: function(responseText) { // jQuery - Old map
		var processingStatus = $('td[title="ProcessingStatus"]');
		processingStatus.html('Processing attacking group stats ... ');

		var player = FSH.Helper.playerData(responseText);
		var groupAttackElement = $('td[title="GroupAttack"]');
		var groupAttackBuffedElement = $('td[title="GroupAttackBuffed"]');
		groupAttackElement.html(
			FSH.System.addCommas(FSH.Helper.relicGroupAttackValue));
		var nightmareVisageEffect = Math.ceil(FSH.Helper.relicGroupAttackValue *
			(player.nightmareVisageLevel * 0.0025));
		FSH.Helper.relicGroupAttackValue = FSH.Helper.relicGroupAttackValue -
			nightmareVisageEffect;
		var storedFlinchLevel =
			FSH.System.intValue($('td[title="LDFlinchLevel"]').text());
		var storedFlinchEffectValue = Math.ceil(FSH.Helper.relicGroupAttackValue *
			storedFlinchLevel * 0.001);
		groupAttackBuffedElement.html(FSH.System.addCommas(
			FSH.Helper.relicGroupAttackValue - storedFlinchEffectValue));
		var defenseWithConstitution = Math.ceil(FSH.Helper.relicGroupDefenseValue *
			(1 + player.constitutionLevel * 0.001));
		var totalDefense = defenseWithConstitution + nightmareVisageEffect;
		var groupDefenseElement = $('td[title="GroupDefense"]');
		var groupDefenseBuffedElement = $('td[title="GroupDefenseBuffed"]');
		groupDefenseElement.html(FSH.System.addCommas(
			FSH.Helper.relicGroupDefenseValue));
		groupDefenseBuffedElement.html(FSH.System.addCommas(totalDefense));
		var groupArmorElement = $('td[title="GroupArmor"]');
		var groupArmorBuffedElement = $('td[title="GroupArmorBuffed"]');
		groupArmorElement.html(
			FSH.System.addCommas(FSH.Helper.relicGroupArmorValue));
		groupArmorBuffedElement.html(FSH.System.addCommas(
			FSH.Helper.relicGroupArmorValue +
			Math.floor(FSH.Helper.relicGroupArmorValue * player.sanctuaryLevel *
			0.001)));
		var groupDamageElement = $('td[title="GroupDamage"]');
		var groupDamageBuffedElement = $('td[title="GroupDamageBuffed"]');
		var groupHPElement = $('td[title="GroupHP"]');
		var groupHPBuffedElement = $('td[title="GroupHPBuffed"]');
		var fortitudeBonusHP = Math.ceil(defenseWithConstitution *
			player.fortitudeLevel * 0.001);
		var chiStrikeBonusDamage = Math.ceil((FSH.Helper.relicGroupHPValue +
			fortitudeBonusHP) * player.chiStrikeLevel * 0.001);
		var storedTerrorizeLevel = FSH.System.intValue(
			$('td[title="LDTerrorizeLevel"]').text());
		var storedTerrorizeEffectValue = Math.ceil(
			FSH.Helper.relicGroupDamageValue * storedTerrorizeLevel * 0.001);
		groupDamageElement.html(
			FSH.System.addCommas(FSH.Helper.relicGroupDamageValue));
		groupDamageBuffedElement.html(FSH.System.addCommas(
			FSH.Helper.relicGroupDamageValue + chiStrikeBonusDamage -
			storedTerrorizeEffectValue));
		groupHPElement.html(FSH.System.addCommas(FSH.Helper.relicGroupHPValue));
		groupHPBuffedElement.html(
			FSH.System.addCommas(FSH.Helper.relicGroupHPValue + fortitudeBonusHP));

		//Effect on defending group from Flinch on attacking group.
		var defGuildBuffedAttackElement = $('td[title="attackValueBuffed"]');
		var defGuildBuffedAttackValue = FSH.System.intValue(
			defGuildBuffedAttackElement.text());
		var flinchEffectValue = Math.ceil(defGuildBuffedAttackValue *
			player.flinchLevel * 0.001);
		defGuildBuffedAttackElement.html(FSH.System.addCommas(
			defGuildBuffedAttackValue - flinchEffectValue));
		var defGuildBuffedDamageElement = $('td[title="damageValueBuffed"]');
		var defGuildBuffedDamageValue = FSH.System.intValue(
			defGuildBuffedDamageElement.text());
		var terrorizeEffectValue = Math.ceil(defGuildBuffedDamageValue *
			player.terrorizeLevel * 0.001);
		defGuildBuffedDamageElement.html(FSH.System.addCommas(
			defGuildBuffedDamageValue - terrorizeEffectValue));

		processingStatus.html('Done.');
	},

};

FSH.arena = { // jQuery

	storeMoves: function() { // jQuery
		FSH.ajax.getForage('fsh_arena').done(function(arena) {
			arena = arena || {};
			arena.moves = {};
			var arenaMoves = $('#pCC img[vspace="4"]').slice(1);
			arenaMoves.each(function() {
				var self = $(this);
				var src = self.attr('src');
				var moveId = /(\d+)\.gif/.exec(src)[1];
				arena.moves[moveId] = {};
				arena.moves[moveId].count = /(\d)$/.exec(self.closest('td').html())[1] * 1;
				arena.moves[moveId].href = src;
			});
			FSH.ajax.setForage('fsh_arena', arena);
		});
	},

	inject: function() { // jQuery
		FSH.arena.tabs = $('#arenaTypeTabs');
		if (FSH.arena.tabs.length !== 1) {return;} // Join error screen
		FSH.arena.theTables = $('table[width="635"]', FSH.arena.tabs);
		FSH.ajax.getForage('fsh_arena').done(FSH.arena.process);
	},

	dataTablesLoaded: function() { // jQuery
		FSH.arena.lvlFilter();
		FSH.arena.theTables.DataTable(FSH.arena.tableOpts);
		$('td[class*="sorting"]', FSH.arena.tabs).off('click');
		$('div.dataTables_filter').hide();
		FSH.arena.tabs.on('click', 'td[class*="sorting"]',
			FSH.arena.sortHandler);
		FSH.arena.tabs.on('click', 'input.custombutton[type="submit"]',
			FSH.arena.dontPost);

		FSH.ga.end('JS Perf', 'arena.process');

	},

	process: function(arena) { // jQuery

		FSH.ga.start('JS Perf', 'arena.process');

		FSH.arena.theTables.each(FSH.arena.redoHead);
		FSH.arena.opts = arena || {};
		FSH.arena.oldIds = FSH.arena.opts.id || {};
		FSH.arena.opts.id = {};
		var myRows = FSH.arena.theTables.children('tbody').children('tr');
		myRows.each(FSH.arena.orderData);
		FSH.arena.filterHeader();
		FSH.ajax.setForage('fsh_arena', FSH.arena.opts);
		FSH.arena.dataTablesLoaded();
	},

	dontPost: function(e) { // jQuery
		e.preventDefault();
		var self = $(this);
		var pvpId = self.prev().val();
		var subcmd = self.prev().prev().val();
		window.location = 'index.php?cmd=arena&subcmd=' + subcmd +
			'&pvp_id=' + pvpId;
	},

	redoHead: function() { // jQuery
		var firstRow = $('tr', this).first();
		$('a', firstRow).contents().unwrap();
		$(this).prepend($('<thead/>').append(firstRow));
	},

	tableOpts: { // Native
		paging: false,
		info: false,
		order: [[3, 'desc'],[0, 'asc']],
		columnDefs: [
			{orderable: false, targets: [8, 9]}
		],
		stateSave: true,
		stateDuration: 0,
	},

	orderData: function() { // jQuery

		var row = $(this);
		var theCells = row.children();

		var cell = theCells.eq(0);
		var matches = /#\s(\d+)/.exec(cell.text());
		if (matches && FSH.arena.opts && FSH.arena.opts.id) {
			FSH.arena.opts.id[matches[1]] = matches[1];
			if (FSH.arena.oldIds && !FSH.arena.oldIds[matches[1]]) {
				row.css('background-color', '#F5F298');
				row.find('tr').css('background-color', '#F5F298');
			}
		}

		cell = theCells.eq(1);
		matches = /(\d+)\s\/\s(\d+)/.exec(cell.text());
		if (matches) {cell.attr('data-order', matches[2] * 1000 + matches[1] * 1);}

		cell = theCells.eq(2);
		cell.attr('data-order',
			$('td', cell).first().text().replace(/[,\s]/g, ''));

		FSH.arena.boolData(theCells.eq(4));
		FSH.arena.boolData(theCells.eq(5));
		FSH.arena.boolData(theCells.eq(6));
		FSH.arena.maxMoves(theCells.eq(8), row);

	},

	boolData: function(cell) { // jQuery
		var matches = /(\d)\.gif/.exec($('img', cell).attr('src'));
		if (matches) {cell.attr('data-order', matches[1]);}
	},

	maxMoves: function(cell, row) { // jQuery
		if (!FSH.arena.opts || !FSH.arena.opts.moves) {return;}
		var matches = /\/pvp\/(\d+)\.gif/.exec($('img', cell).attr('src'));
		if (matches &&
			FSH.arena.opts.moves[matches[1]] &&
			FSH.arena.opts.moves[matches[1]].count === 3) {
			row.addClass('moveMax');
		}
	},

	sortHandler: function() { // jQuery
		var self = $(this);
		var table = self.closest('table').DataTable();
		var myCol = self.index();
		var classes = self.attr('class');
		var test = /sorting([^\s]+)/.exec(classes);
		var sortOrder = 'desc';
		if (test && test[1] === '_desc') {sortOrder = 'asc';}
		if (myCol !== 3) {
			table.order([3, 'desc'], [myCol, sortOrder]).draw();
		} else {
			table.order([3, sortOrder]).draw();
		}
	},

	filterHeader: function() { // jQuery

		var theRow = $('#pCC > table > tbody > tr:nth-child(7)');
		theRow.clone().insertBefore(theRow).find('td').attr('height', '2');
		theRow.clone().insertAfter(theRow).find('td').attr('height', '1');

		var aTable = $(FSH.Layout.arenaFilter);

		var fshHideMoves = $('#fshHideMoves', aTable);
		if (FSH.arena.opts && 'hideMoves' in FSH.arena.opts) {
			fshHideMoves.prop('checked', FSH.arena.opts.hideMoves);
			$('.moveMax').toggle(!FSH.arena.opts.hideMoves);
		}
		fshHideMoves.click(FSH.arena.hideMoves);

		var fshMinLvl = $('#fshMinLvl', aTable);
		if (FSH.arena.opts && 'minLvl' in FSH.arena.opts) {
			fshMinLvl.val(FSH.arena.opts.minLvl);
		} else {
			fshMinLvl.val(FSH.Data.defaults.arenaMinLvl);
		}
		var fshMaxLvl = $('#fshMaxLvl', aTable);
		if (FSH.arena.opts && 'maxLvl' in FSH.arena.opts) {
			fshMaxLvl.val(FSH.arena.opts.maxLvl);
		} else {
			fshMaxLvl.val(FSH.Data.defaults.arenaMaxLvl);
		}
		$('#fshMinLvl, #fshMaxLvl', aTable).keyup(FSH.arena.changeLvls);

		$('#fshReset', aTable).click(FSH.arena.resetLvls);

		$('td', theRow).append(aTable);

	},

	hideMoves: function() { // jQuery
		FSH.arena.opts = FSH.arena.opts || {};
		FSH.arena.opts.hideMoves = this.checked;
		FSH.ajax.setForage('fsh_arena', FSH.arena.opts);
		$('.moveMax').toggle(!this.checked);
	},

	lvlFilter: function() { // jQuery
		$.fn.dataTable.ext.search.push(
			function(_settings, data) {
				if (!FSH.arena.opts ||
					!FSH.arena.opts.minLvl ||
					!FSH.arena.opts.maxLvl) {return true;}
				var min = FSH.arena.opts.minLvl;
				var max = FSH.arena.opts.maxLvl;
				var level = FSH.System.intValue(data[7]);
				if (isNaN(min) && isNaN(max)   ||
					isNaN(min)   && level <= max ||
					min <= level && isNaN(max)   ||
					min <= level && level <= max )
				{return true;}
				return false;
			}
		);
	},

	changeLvls: function() { // jQuery
		var minLvl = parseInt($('#fshMinLvl').val(), 10);
		var maxLvl = parseInt($('#fshMaxLvl').val(), 10);
		if (!isNaN(minLvl) && !isNaN(maxLvl)) {
			FSH.arena.opts = FSH.arena.opts || {};
			FSH.arena.opts.minLvl = minLvl;
			FSH.arena.opts.maxLvl = maxLvl;
			FSH.ajax.setForage('fsh_arena', FSH.arena.opts);
			$('#arenaTypeTabs table[width="635"]').DataTable().draw();
		}
	},

	resetLvls: function() { // jQuery
		FSH.arena.opts = FSH.arena.opts || {};
		FSH.arena.opts.minLvl = FSH.Data.defaults.arenaMinLvl;
		FSH.arena.opts.maxLvl = FSH.Data.defaults.arenaMaxLvl;
		FSH.ajax.setForage('fsh_arena', FSH.arena.opts);
		$('#fshMinLvl').val(FSH.arena.opts.minLvl);
		$('#fshMaxLvl').val(FSH.arena.opts.maxLvl);
		$('#arenaTypeTabs table[width="635"]').DataTable().draw();
	},

	setupMoves: function() { // jQuery
		var node = $('#pCC b:contains("Setup Combat Moves")');
		if (node.length !== 1) {return;}
		node.addClass('fshLink fshGreen');
		node.click(FSH.arena.selectMoves);
	},

	moveOptions:
		'<td colspan=3 ' +
		'style="padding-top: 2px;padding-bottom: 2px;">' +
		'<select style="max-width: 50px;">' +
		'<option value="x">Basic Attack</option>' +
		'<option value="0">Block</option>' +
		'<option value="1">Counter Attack</option>' +
		'<option value="2">Critical Hit</option>' +
		'<option value="3">Defend</option>' +
		'<option value="4">Deflect</option>' +
		'<option value="5">Dodge</option>' +
		'<option value="6">Lunge</option>' +
		'<option value="7">Power Attack</option>' +
		'<option value="8">Spin Attack</option>' +
		'<option value="9">Piercing Strike</option>' +
		'<option value="10">Crush</option>' +
		'<option value="11">Weaken</option>' +
		'<option value="12">Ice Shard</option>' +
		'<option value="13">Fire Blast</option>' +
		'<option value="14">Poison</option>' +
		'</select></td>',

		oldMoves: [],

	selectMoves: function() {
		$(this).off();

		var nodes =
			$('#pCC a[href^="index.php?cmd=arena&subcmd=pickmove&slot_id="] img');
		FSH.arena.nodes = nodes;
		var table = nodes.eq(0).closest('table').parent().closest('table');

		var row = $('<tr/>');
		FSH.arena.selectRow = row;
		row.append('<td/>');
		nodes.each(function() {
			var move = $(this).attr('src');
			if (move.indexOf('bar_icon_holder.jpg') > 0) {
				move = 'x';
			} else {
				move = move.match(/pvp\/(\d+).gif$/)[1];
			}
			FSH.arena.oldMoves.push(move);
			var html = $(FSH.arena.moveOptions);
			$('option[value=' + move + ']', html).prop('selected', true);
			row.append(html);
		});
		table.append(row);

		$('img[src$="pvp/bar_spacer.jpg"]', table)
			.attr({'width': '15', 'height': '50'});

		row = $('<tr><td colspan=32 align=center ' +
			'style="padding-top: 2px;padding-bottom: 2px;">' +
			'<input class="custombutton" value="Update" type="button">' +
			'</td></tr>');
		$('input', row).click(FSH.arena.updateMoves);
		table.append(row);
	},

	updateMoves: function() {
		var oldMoves = FSH.arena.oldMoves;
		var newMoves = [];
		$('select', FSH.arena.selectRow).each(function() {
				newMoves.push($(this).val());
		});
		var prm = [];
		newMoves.forEach(function(val, ind) {
			if (val === oldMoves[ind]) {return;}
			prm.push(FSH.ajax.doPickMove('x', ind));
			FSH.arena.nodes.eq(ind).attr({
				'src': FSH.System.imageServer + '/world/actionLoadingSpinner.gif',
				'width': '25',
				'height': '25'
			});
		});
		$.when.apply($, prm).done(function() {
			newMoves.forEach(function(val, ind) {
				if (val === 'x' || val === oldMoves[ind]) {return;}
				prm.push(FSH.ajax.doPickMove(val, ind));
			});
			$.when.apply($, prm).done(function() {
				window.location = 'index.php?cmd=arena&subcmd=setup';
			});
		});
	},

	completedArenas: function() { // Legacy
		var prevButton = $('#pCC input[value="<"]');
		var nextButton = $('#pCC input[value=">"]');
		if (prevButton.length === 1) {
			var startButton = $('<input value="<<" type="button">');
			prevButton.before(startButton).before('&nbsp;');
			startButton.click(function() {FSH.arena.gotoPage(1);});
		}
		if (nextButton.length === 1) {
			var lastPage = $('#pCC input[value="Go"]').closest('td').prev().text()
				.replace(/\D/g,'');
			var finishButton = $('<input value=">>" type="button">');
			nextButton.after(finishButton).after('&nbsp;');
			finishButton.click(function() {FSH.arena.gotoPage(lastPage);});
		}
		$('#pCC input[value="View"]').click(FSH.arena.dontPost);
	},

	gotoPage: function(pageId) {
		window.location = 'index.php?cmd=arena&subcmd=completed&page=' + pageId;
	},

};

FSH.combatLog = { // Native

	injectNotepadShowLogs: function(content) { // Native
		if (!content) {content = FSH.Layout.notebookContent();}
		var combatLog = FSH.System.getValue('CombatLog');
		if (combatLog.indexOf(',') === 0) {
			//combat logs start with a ,
			combatLog = combatLog.substr(1);
			FSH.System.setValue('CombatLog', combatLog);
		}

		var yuuzParser = '<tr><td align="center" colspan="4"><b>Log Parser</b>' +
			'</td></tr>'+
			'<tr><td colspan="4" align="center">WARNING: this links to an ' +
			'external site not related to HCS.<br />' +
			'If you wish to visit site directly URL is: http://evolutions.' +
			'yvong.com/fshlogparser.php<br />' +
			'<tr><td colspan=4 align="center"><input type="hidden" value="true" ' +
			'name="submit"><input type="submit" value="Analyze!"></td></tr>';
		content.innerHTML = '<h1>Combat Logs</h1><br /><form action="http://' +
			'evolutions.yvong.com/fshlogparser.php" method="post" target="_blank">' +
			'<div align="center"><textarea align="center" cols="80" rows="25" ' +
			'readonly style="background-color:white;font-family:Consolas,\'' +
			'Lucida Console\',\'Courier New\',monospace;" id="Helper:CombatLog" ' +
			'name="logs">[' + combatLog + ']</textarea></div>' +
			'<br /><br /><table width="100%"><tr>'+
			'<td colspan="2" align=center>' +
			'<input type="button" class="custombutton" value="Select All" ' +
			'id="Helper:CopyLog"></td>' +
			'<td colspan="2" align=center>' +
			'<input type="button" class="custombutton" value="Clear" ' +
			'id="Helper:ClearLog"></td>' +
			'</tr>' + yuuzParser + '</table></div>'+
			'</form>';

		document.getElementById('Helper:CopyLog')
			.addEventListener('click', FSH.combatLog.notepadCopyLog, true);
		document.getElementById('Helper:ClearLog')
			.addEventListener('click', FSH.combatLog.notepadClearLog, true);
	},

	notepadCopyLog: function() { // Native
		var combatLog = document.getElementById('Helper:CombatLog');
		combatLog.focus();
		combatLog.select();
	},

	notepadClearLog: function() { // Native
		if (window.confirm('Are you sure you want to clear your log?')) {
			FSH.System.setValue('CombatLog', '');
			location.reload();
		}
	},

};

FSH.newMap = { // Hybrid

	subscribes: function() { // jQuery

		if (FSH.System.getValue('sendGoldonWorld')) {
			FSH.newMap.injectSendGoldOnWorld();
		}

		//Subscribes:
		FSH.Helper.doNotKillList = FSH.System.getValue('doNotKillList');

		// subscribe to view creature events on the new map.
		$.subscribe('ready.view-creature', FSH.newMap.readyViewCreature);

		// Hide Create Group button
		FSH.newMap.hideGroupButton();

		if (FSH.System.getValue('enableCreatureColoring')) {
			$.subscribe('after-update.actionlist', FSH.newMap.colorMonsters);
		}

		// add do-not-kill list functionality
		$.subscribe('after-update.actionlist', FSH.newMap.afterUpdateActionList);

		// then intercept the action call 
		FSH.newMap.interceptDoAction();

		$.subscribe(window.DATA_EVENTS.PLAYER_BUFFS.ANY,
			FSH.newMap.dataEventsPlayerBuffs);

		$.subscribe('keydown.controls', function(e, key){
			switch(key)
			{
				case 'ACT_REPAIR': GameData.fetch(387);
				break;
			}
		});

		if (FSH.System.getValue('keepLogs')) {
			$.subscribe('2-success.action-response', FSH.newMap.combatResponse);
		}
		//on world

		if (window.initialGameData) {//HCS initial data
			setTimeout(function(){
				FSH.newMap.injectWorldNewMap(window.initialGameData);
				FSH.newMap.dataEventsPlayerBuffs(null,
					{b: window.initialGameData.player.buffs});
			}, 400);
		}
		$.subscribe('-1-success.action-response 5-success.action-response',
			function(e, data) { //change of information
				setTimeout(function() {
					FSH.newMap.injectWorldNewMap(data);
				}, 400);
			}
		);

		/*
		// somewhere near here will be multi buy on shop
		$.subscribe('prompt.worldDialogShop', function(e, data){
			self._createShop(self.shop.items);
			$('span[class="price"]').after('<span class="numTake">test</span>');
		});
		document.getElementById('Helper:SendGold')
			.addEventListener('click', FSH.Helper.sendGoldToPlayer, true);
		*/

	},

	injectSendGoldOnWorld: function() { // jQuery
		$('#statbar-gold-tooltip-general').append(
			'<dt class="stat-gold-sendTo">Send To:</dt>' +
			'<dd id="HelperSendTo">' + FSH.System.getValue('goldRecipient') + '</dd>' + 
			'<dt class="stat-gold-sendAmt">Amount:</dt>' +
			'<dd id="HelperSendAmt">' + FSH.System.getValue('goldAmount').replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,') + '</dd>' +
			'<dt class="stat-gold-sendTo">Send?</dt>' +
			'<dd><input id="HelperSendGold" value="Send!" class="custombutton" type="submit"><input type="hidden" id="xc" value=""</dd>' +
			'<dt class="stat-gold-sendTotal">Total Sent:</dt>' +
			'<dd id="HelperSendTotal">' +
				FSH.System.getValue('currentGoldSentTotal')
					.toString()
					.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,') +
				'</dd>');
		$('#HelperSendGold').click(FSH.newMap.doSendGold);
	},

	doSendGold: function() { // jQuery
		$.ajax({
			url: 'index.php',
			data: {
				cmd : 'trade',
				subcmd: 'sendgold',
				xc: window.ajaxXC,
				target_username: $('#HelperSendTo').html(),
				gold_amount: $('#HelperSendAmt').html().replace(/[^\d]/g,'')
			}
		}).done(function(data) {
				var info = FSH.Layout.infoBox(data);
				if (info === 'You successfully sent gold!' || info === '') {
					FSH.System.setValue('currentGoldSentTotal',
						parseInt(FSH.System.getValue('currentGoldSentTotal'), 10) +
						parseInt(FSH.System.getValue('goldAmount'), 10));
					GameData.fetch(387);
				}
			});
	},

	updateSendGoldOnWorld: function(data) { // jQuery
		$('#HelperSendTotal')
			.html(FSH.System.getValue('currentGoldSentTotal')
			.toString()
			.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,'));
		if (parseInt(data.player.gold, 10) >
			FSH.System.getValue('goldAmount')){
			$('#statbar-gold').css('background-color','red');
		}else{
			$('#statbar-gold').css('background-color','inherit');
		}
	},

	readyViewCreature: function() { // Hybrid - New Map
		$('#creatureEvaluator').html('');
		$('#creatureEvaluatorGroup').html('');

		FSH.System.xmlhttp('index.php?cmd=profile',
			FSH.Helper.getCreaturePlayerData,
			{	'groupExists': false,
				'groupAttackValue': 0,
				'groupDefenseValue': 0,
				'groupArmorValue': 0,
				'groupDamageValue': 0,
				'groupHPValue': 0,
				'groupEvaluation': false
			}
		);
		FSH.System.xmlhttp('index.php?cmd=guild&subcmd=groups',
			FSH.Helper.checkIfGroupExists);

		$('#addRemoveCreatureToDoNotKillList').html('');
		if ($('#addRemoveCreatureToDoNotKillList').length === 0) {
			var doNotKillElement = '<div id="addRemoveCreatureToDo' +
				'NotKillList"" class="description" style="cursor:' +
				'pointer;text-decoration:underline;color:blue;"></div>';
			$(doNotKillElement).insertAfter($('#dialog-viewcreature')
				.find('p.description'));
		}
		var creatureName = $('#dialog-viewcreature').find('h2.name')
			.text();
		$('#addRemoveCreatureToDoNotKillList')
			.attr('creatureName',creatureName);
		var extraText = 'Add to the do not kill list';
		// TODO substring bug
		if (FSH.Helper.doNotKillList.indexOf(creatureName) !== -1) {
			extraText = 'Remove from do not kill list';}
		$('#addRemoveCreatureToDoNotKillList').html(extraText);
		document.getElementById('addRemoveCreatureToDoNotKillList')
			.addEventListener('click',
				FSH.Helper.addRemoveCreatureToDoNotKillList, true);
	},

	hideGroupButton: function() { // jQuery
		if (FSH.System.getValue('hideChampionsGroup')) {
			$.subscribe('after-update.actionlist',
				function() {$('#actionList li.creature-1 a.create-group').hide();});
		}
		if (FSH.System.getValue('hideElitesGroup')) {
			$.subscribe('after-update.actionlist',
				function() {$('#actionList li.creature-2 a.create-group').hide();});
		}
		if (FSH.System.getValue('hideSEGroup')) {
			$.subscribe('after-update.actionlist',
				function() {$('#actionList li.creature-3 a.create-group').hide();});
		}
		if (FSH.System.getValue('hideTitanGroup')) {
			$.subscribe('after-update.actionlist',
				function() {$('#actionList li.creature-4 a.create-group').hide();});
		}
		if (FSH.System.getValue('hideLegendaryGroup')) {
			$.subscribe('after-update.actionlist',
				function() {$('#actionList li.creature-5 a.create-group').hide();});
		}
	},

	afterUpdateActionList: function() { // jQuery
		// color the critters in the do no kill list blue
		// TODO substring bug
		$('#actionList div.header').each(function() {
			if (FSH.Helper.doNotKillList.indexOf($(this).find('a.icon')
				.data('name')) !== -1) {
				$(this).css('color','blue');
			}
		});
	},

	interceptDoAction: function() { // jQuery
		var gameData = GameData;
		var hcs = window.HCS;
		var oldDoAction = gameData.doAction;
		gameData.doAction = function(actionCode, fetchFlags, data) {
			if (actionCode === hcs.DEFINES.ACTION.CREATURE_COMBAT) {
				// Do custom stuff e.g. do not kill list
				var creatureIcon = $('#actionList div.header')
					.eq(data.passback).find('a.icon');
				// TODO substring bug
				if (FSH.Helper.doNotKillList.indexOf(
						creatureIcon.data('name')) !== -1) {
					creatureIcon.removeClass('loading');
					return;
				}
			}
			// Call standard action
			oldDoAction(actionCode, fetchFlags, data);
		};
	},

	colorHash: { // Native
		'0': 'red', // Should never see this.
		'1': 'orange',
		'2': 'yellow'
	},

	dataEventsPlayerBuffs: function() { // jQuery
		var imp = $('#actionlist-shield-imp');
		if (imp.length === 1) {
			imp.css('background-color',
				FSH.newMap.colorHash[imp.text()] || '#ad8043');
		}
	},

	combatResponse: function(e, data) { // jQuery - Bad
		// TODO this is too slow
		// send the response to localforage
		// and deal with it later
		// If bad response do nothing.
		if (data.response.response !== 0) {return;}
		var l;
		var i;
		var combatData = {};
		combatData.combat = $.extend(true, {}, data.response.data); //make a deep copy
		//delete some values that are not needed to trim down size of log.
		delete combatData.combat.attacker.img_url;
		delete combatData.combat.defender.img_url;
		delete combatData.combat.is_conflict;
		delete combatData.combat.is_bounty;
		delete combatData.combat.pvp_rating_change;
		delete combatData.combat.pvp_prestige_gain;
		if (combatData.combat.inventory_id) {
			combatData.combat.drop = combatData.combat.item.id;
		}
		delete combatData.combat.inventory_id;
		delete combatData.combat.item;

		combatData.player={};
		combatData.player.buffs={};
		combatData.player.enhancements={};
		l = data.player.buffs.length;
		for(i=0; i<l; i += 1) //loop through buffs, only need to keep CA and Doubler
		{//54 = ca, 26 = doubler
			var buff = data.player.buffs[i];
			if(buff.id === 54 || buff.id === 26)
			{
				combatData.player.buffs[buff.id] = parseInt(buff.level, 10);
			}
		}
		var notSave = '|Breaker|Protection|Master Thief|Protect Gold|Disarm|Duelist|Thievery|Master Blacksmith|Master Crafter|Fury Caster|Master Inventor|Sustain|';//Taking the Not Save in case they add new enhancements.
		if (data.player.enhancements)
		{
			l = data.player.enhancements.length;
			for(i=0; i<l; i += 1) //loop through enhancements
			{//54 = ca, 26 = doubler
				var enh = data.player.enhancements[i];
				if (notSave.indexOf('|'+enh.name+'|')===-1){
					combatData.player.enhancements[enh.name]=enh.value;
				}
			}
		}
		var now = new Date();
		combatData.time = FSH.System.formatDateTime(now);
		FSH.Helper.appendSavedLog(',' + JSON.stringify(combatData));
	},

	injectWorldNewMap: function(data){ // jQuery - Ugly
		if (data.player && FSH.System.getValue('sendGoldonWorld')) {
			FSH.newMap.updateSendGoldOnWorld(data);
		}

		if (data.realm && data.realm.name) {
			FSH.newMap.injectButtons(data);
		}
	},

	injectButtons: function(data) { // jQuery
		var worldName = $('#worldName');
		worldName.html(data.realm.name); //HACK - incase of switchign between master realm and realm they dont replace teh realm name
		var oldButtonContainer = $('#fshWorldButtonContainer');
		if (oldButtonContainer.length !== 0) {oldButtonContainer.remove();}
		var buttonContainer = $('<div/>', {id: 'fshWorldButtonContainer'});
		FSH.newMap.showQuickLinks(buttonContainer, data);
		FSH.newMap.showSearchButtons(buttonContainer, data);
		if (FSH.System.getValue('showSpeakerOnWorld')) {
			FSH.newMap.showSpeakerOnWorld(buttonContainer);
		}
		FSH.newMap.showHuntMode(buttonContainer);
		worldName.after(buttonContainer);
	},

	showQuickLinks: function(worldName, data) { // jQuery
		worldName.append('Min Lvl: ' + data.realm.minlevel);
		var formgroup = $(FSH.Layout.worldFormgroup);
		worldName.append('&nbsp;&nbsp;').append(formgroup);
		formgroup.click(FSH.newMap.formgroup);
		var quickbuff = $(FSH.Layout.worldQuickBuff);
		worldName.append('&nbsp;').append(quickbuff);
		quickbuff.click(FSH.newMap.openQuickBuff);
		worldName.append('&nbsp;').append(FSH.Layout.worldMap);
	},

	formgroup: function(e) { // jQuery
		e.preventDefault();
		$(this).qtip('hide');
		GameData.doAction(12, 385, {}, 0);
	},

	openQuickBuff: function(e) { // Native
		e.preventDefault();
		window.openWindow('index.php?cmd=quickbuff&t=' +
			$('#statbar-character').text(), 'fsQuickBuff', 618, 1000,
			',scrollbars');
	},

	showSearchButtons: function(worldName, data) { // jQuery
		worldName.append('&nbsp;')
			.append(FSH.Layout.searchMapUFSG.replace('@@realmId@@', data.realm.id));
	},

	showSpeakerOnWorld: function(worldName) { // jQuery
		var img = FSH.System.getValue('playNewMessageSound') === true ?
			FSH.Data.soundMuteImage :
			FSH.Data.soundImage;
		worldName.append('&nbsp;').append(img);
		worldName.on('click', '#toggleSoundLink', FSH.newMap.toggleSound);
	},

	showHuntMode: function(worldName) { // jQuery
		var img = FSH.Helper.huntingMode === true ? FSH.Data.huntingOnImage :
			FSH.Data.huntingOffImage;
		worldName.append('&nbsp;').append(img);
		worldName.on('click', '#HelperToggleHuntingMode',
			FSH.newMap.toggleHuntMode);
	},

	toggleSound: function(e) { // jQuery
		e.preventDefault();
		if (FSH.System.getValue('playNewMessageSound') === false) {
			$('#toggleSoundLink').qtip('hide')
				.replaceWith(FSH.Data.soundMuteImage);
		} else {
			$('#toggleSoundLink').qtip('hide')
				.replaceWith(FSH.Data.soundImage);
		}
		FSH.System.setValue('playNewMessageSound',
			!FSH.System.getValue('playNewMessageSound'));
	},

	toggleHuntMode: function(e) { // jQuery
		e.preventDefault();
		if (!FSH.Helper.huntingMode) {
			$('#HelperToggleHuntingMode').qtip('hide')
				.replaceWith(FSH.Data.huntingOnImage);
		} else {
			$('#HelperToggleHuntingMode').qtip('hide')
				.replaceWith(FSH.Data.huntingOffImage);
		}
		FSH.Helper.huntingMode = !FSH.Helper.huntingMode;
		FSH.System.setValue('huntingMode', FSH.Helper.huntingMode);
	},

	colorMonsters: function() { // jQuery
		$('#actionList li.creature-1').css('color','green');
		$('#actionList li.creature-2').css('color','yellow');
		$('#actionList li.creature-3').css('color','red');
	},

};

FSH.guide = { // Native

	allowBack: function () { // Native
		document.querySelector('input[type="submit"]')
			.addEventListener('click', function(e) {
				e.preventDefault();
				var url = 'index.php?';
				Array.prototype.forEach.call(
					document.querySelectorAll('input:not([type="submit"]), select'),
					function(e) {url += '&' + e.name + '=' + e.value;});
				window.location = url;
			});
	},

};

})();
