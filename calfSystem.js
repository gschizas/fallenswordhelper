// @author        GIJoe
// @license       http://creativecommons.org/licenses/by-nc-sa/3.0/

//--- to test localStorage in firefox
//delete GM_log; delete GM_getValue; delete GM_setValue; delete GM_deleteValue; delete GM_xmlhttpRequest; delete GM_openInTab; delete GM_registerMenuCommand;

var gvar=function() {} // Global variables
function GM_ApiBrowserCheck() {
	const GMSTORAGE_PATH = 'GM_'; // You can change it to avoid conflict with others scripts
	GM_addStyle = function(css) {
		var style = document.createElement('style');
		style.textContent = css;
		document.getElementsByTagName('head')[0].appendChild(style);
	}
	if(typeof(unsafeWindow)=='undefined') { unsafeWindow=window; }
	if(typeof(GM_log)=='undefined') { GM_log=function(msg) { try { unsafeWindow.console.log('GM_log: '+msg); } catch(e) {} }; }
	GM_clog=function(msg) { if(arguments.callee.counter) { arguments.callee.counter++; } else { arguments.callee.counter=1; } GM_log('('+arguments.callee.counter+') '+msg); }
	GM_addGlobalStyle=function(css) { // Redefine GM_addGlobalStyle with a better routine
		var sel=document.createElement('style'); sel.setAttribute('type','text/css'); sel.appendChild(document.createTextNode(css));
		var hel=document.documentElement.firstChild; while(hel && hel.nodeName!='HEAD') { hel=hel.nextSibling; }
		if(hel && hel.nodeName=='HEAD') { hel.appendChild(sel); } else { document.body.insertBefore(sel,document.body.firstChild); }
		return sel;
	}
	var needApiUpgrade=false;
	if(window.navigator.appName.match(/^opera/i) && typeof(window.opera)!='undefined') {
		needApiUpgrade=true; gvar.isOpera=true; GM_log=window.opera.postError;
	}
	if(typeof(GM_setValue)!='undefined') {
		var gsv=GM_setValue.toString();
		if(gsv.indexOf('staticArgs')>0) { gvar.isGreaseMonkey=true; } // test GM_hitch
		else if(gsv.match(/not\s+supported/)) { needApiUpgrade=true; gvar.isBuggedChrome=true; }
	} else { needApiUpgrade=true;}

	if(needApiUpgrade) {
		var ws=null; try { ws=typeof(unsafeWindow.localStorage); unsafeWindow.localStorage.length; } catch(e) { ws=null; } // Catch Security error
		if(ws=='object') {
			GM_getValue=function(name,defValue) { var value=unsafeWindow.localStorage.getItem(GMSTORAGE_PATH+name); if(value==null) { return defValue; } else { switch(value.substr(0,2)) { case 'S]': return value.substr(2); case 'N]': return parseInt(value.substr(2)); case 'B]': return value.substr(2)=='true'; } } return value; }
			GM_setValue=function(name,value) { switch (typeof(value)) { case 'string': unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'S]'+value); break; case 'number': if(value.toString().indexOf('.')<0) { unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'N]'+value); } break; case 'boolean': unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'B]'+value); break; } }
			GM_deleteValue=function(name) { unsafeWindow.localStorage.removeItem(GMSTORAGE_PATH+name); }
		} else if(!gvar.isOpera || typeof(GM_setValue)=='undefined') { gvar.temporarilyStorage=new Array();
			GM_getValue=function(name,defValue) { if(typeof(gvar.temporarilyStorage[GMSTORAGE_PATH+name])=='undefined') { return defValue; } else { return gvar.temporarilyStorage[GMSTORAGE_PATH+name]; } }
			GM_setValue=function(name,value) { switch (typeof(value)) { case "string": case "boolean": case "number": gvar.temporarilyStorage[GMSTORAGE_PATH+name]=value; } }
			GM_deleteValue=function(name) { delete gvar.temporarilyStorage[GMSTORAGE_PATH+name]; };
		}
		if(typeof(GM_openInTab)=='undefined') { GM_openInTab=function(url) { unsafeWindow.open(url,""); } }
		if(typeof(GM_registerMenuCommand)=='undefined') { GM_registerMenuCommand=function(name,cmd) { GM_log("Notice: GM_registerMenuCommand is not supported."); } } // Dummy
		if(!gvar.isOpera || typeof(GM_xmlhttpRequest)=='undefined') {
			GM_xmlhttpRequest=function(obj) {
				var request=new XMLHttpRequest();
				request.onreadystatechange=function() { if(obj.onreadystatechange) { obj.onreadystatechange(request); }; if(request.readyState==4 && obj.onload) { obj.onload(request); } }
				request.onerror=function() { if(obj.onerror) { obj.onerror(request); } }
				try { request.open(obj.method,obj.url,true); } catch(e) { if(obj.onerror) { obj.onerror( {readyState:4,responseHeaders:'',responseText:'',responseXML:'',status:403,statusText:'Forbidden'} ); }; return; }
				if(obj.headers) { for(name in obj.headers) { request.setRequestHeader(name,obj.headers[name]); } }
				request.send(obj.data); return request;
	} } }
}
GM_ApiBrowserCheck();

// System functions

var System = {
	init: function() {
		Date.prototype.toFormatString = System.formatDate;

		Number.prototype.padZero = System.padZero;
		String.prototype.repeat = System.repeatString;
		if (!String.trim) {
			String.prototype.trimLeft  = System.trimLeft;
			String.prototype.trimRight = System.trimRight;
			String.prototype.trim      = System.trim;
		}
		Array.prototype.filterBy = System.filterBy;

		System.server           = document.location.protocol + "//" + document.location.host + "/";
		System.browserVersion   = parseInt(navigator.userAgent.match(/(Firefox|Minefield|IceWeasel)\/(\d+)/i)[2],10);

		var imgurls = System.findNode("//img[contains(@src, '/skin/')]");
		if (!imgurls) return; //login screen or error loading etc.
		var idindex             = imgurls.src.indexOf("/skin/");
		System.imageServer      = imgurls.src.substr(0,idindex);
		System.imageServerHTTP  = "http://72.29.91.222";
		
		Array.prototype.removeDuplicates = System.removeDuplicates;
	},

	getValueJSON: function(name) {
		var resultJSON=GM_getValue(name);
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

	findNode: function(xpath, doc) {
		var nodes=System.findNodes(xpath, doc);
		if (!nodes) return null;
		return (nodes[0]);
	},

	findNodes: function(xpath, doc) {
			if (!doc) {
				doc=document;
			}
			var nodes=[];
			var findQ = document.evaluate(xpath, doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			if (findQ.snapshotLength===0) return null;
			for (var i=0; i<findQ.snapshotLength; i++) {
				nodes.push(findQ.snapshotItem(i));
			}
			return nodes;
	},

	findNodeText: function(xpath, doc) {
		var node=System.findNode(xpath, doc);
		if (!node) return null;
		return node.textContent;
	},

	findNodeInt: function(xpath, doc) {
		var node=System.findNode(xpath, doc);
		if (!node) return null;
		return System.intValue(node.textContent);
	},
	
	createDocument: function(details) {
		var doc=document.createElement("HTML");
		doc.innerHTML=details;
		return doc;
	},

	//~ createDocument: function(str) { // chrome extension must use this createDocument (which not work under Firefox :( )
		//~ if (document.documentElement.nodeName != 'HTML') {
		    //~ return new DOMParser().parseFromString(str, 'application/xhtml+xml');
		//~ }
		//~ // FIXME
		//~ var html = str.replace(/<script(?:[ \t\r\n][^>]*)?>[\S\s]*?<\/script[ \t\r\n]*>|<\/?(?:i?frame|html|script|object)(?:[ \t\r\n][^<>]*)?>/gi, ' ')
		//~ var htmlDoc = document.implementation.createHTMLDocument ?
			//~ document.implementation.createHTMLDocument('fsh') :
			//~ document.implementation.createDocument(null, 'html', null)
		//~ var range = document.createRange()
		//~ range.selectNodeContents(document.documentElement)
		//~ htmlDoc.documentElement.appendChild(range.createContextualFragment(html))
		//~ return htmlDoc
	//~ },

	formatDateTime: function(aDate) {
		var result=aDate.toDateString();
		result += " ";
		var hh=aDate.getHours();
		if (hh<10) hh = "0" + hh;
		var mm=aDate.getMinutes();
		if (mm<10) mm = "0" + mm;
		result += hh + ":" + mm;
		return result;
	},

	formatDate: function(dateFormat) {
	    if (!this.valueOf()) return;
		var months = ['January', 'February', 'March', 'April', 'May', 'June',
			'July', 'August', 'September', 'October', 'November', 'December'];
		var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

		var theDate=this;
		var h;

		return dateFormat.replace(/(yyyy|MMMM|MMM|MM|dddd|ddd|dd|hh|HH|mm|ss|a)/g,
			function($1) {
				switch ($1) {
					case 'yyyy': return theDate.getFullYear();
					case 'MMMM': return months[theDate.getMonth()];
					case 'MMM':  return months[theDate.getMonth()].substr(0, 3);
					case 'MM':   return (theDate.getMonth() + 1).padZero(2);
					case 'dddd': return days[theDate.getDay()];
					case 'ddd':  return days[theDate.getDay()].substr(0, 3);
					case 'dd':   return theDate.getDate().padZero(2);
					case 'HH':   return theDate.getHours().padZero(2);
					case 'hh':   return ((h = theDate.getHours() % 12) ? h : 12).padZero(2);
					case 'mm':   return theDate.getMinutes().padZero(2);
					case 'ss':   return theDate.getSeconds().padZero(2);
					case 'a':  return theDate.getHours() < 12 ? 'am' : 'pm';
				}
			}
		);
	},

	padZero: function(zeroes) {
		var s=this.toString();
		var result="0".repeat(zeroes-s.length) + s;
		return result;
	},

	filterBy: function(property, value) {
		return this.filter(function(element, index, array) {return element[property]==value;});
	},

	repeatString: function(times) {
		var s = '';
		for (var i=0; i<times; i++) {
			s += this;
		}
		return s;
	},

	saveValueForm: function(oForm, name) {
		var formElement = System.findNode("//input[@name='" + name + "']", oForm);
		if (formElement.getAttribute("type")=="checkbox") {
			GM_setValue(name, formElement.checked);
		} else if (formElement.getAttribute("type")=="radio") {
			var radioElements = System.findNodes("//input[@name='" + name + "']", 0, oForm);
			for (var i=0; i<radioElements.length; i++) {
				var radioElement = radioElements[i];
				if (radioElement.checked) {
					GM_setValue(name, radioElement.value);
				}
			}
		} else {
			GM_setValue(name, formElement.value);
		}
	},

	setDefault: function(name, value) {
		if (GM_getValue(name)==undefined) GM_setValue(name, value);
	},

	xmlhttp: function(theUrl, func, theCallback) {
		theUrl=theUrl.replace(System.server, "");
		GM_xmlhttpRequest({
			method: 'GET',
			url: System.server + theUrl,
			callback: theCallback,
			headers: {
				"User-Agent" : navigator.userAgent,
				"Referer": document.location,
				"Cookie" : document.cookie
			},
			onload: function(responseDetails) {
				if (func) {
					func.call(this, responseDetails.responseText, this.callback);
				}
			}
		});
	},

	intValue: function(theText) {
		if (!theText) return 0;
		return parseInt(theText.replace(/,/g,""),10);
	},

	getIntFromRegExp: function(theText, rxSearch) {
		var matches = theText.match(rxSearch);
		if (matches) {
			result = parseInt(matches[1],10);
		} else {
			result = 0;
		}
		return result;
	},

	addCommas: function(nStr) {
		var x, x1, x2;
		nStr += '';
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
	},

	trim: function() {
	    return this.trimLeft().trimRight();
	},

	trimLeft: function() {
	    return this.replace(/^\s+/,"");
	},

	trimRight: function() {
	    return this.replace(/\s+$/,"");
	},
	
	removeDuplicates: function (removeBy){
		var temp=new Array();
		Helper.sortBy = removeBy;
		this.sort();
		for(i=0;i<this.length;i++) {
			var first = this[i];
			var second = (this[i+1]?this[i+1]:"abc");
			if(i != this.length && first[removeBy]==second[removeBy]) {continue;}
			temp[temp.length]=this[i];
		}
		return temp;
	},

	convertTextToHtml: function(inputText) {
		return inputText.
			replace(/</g,"&lt").
			replace(/>/g,"&gt").
			replace(/\n/g,"<br>").
			replace(/\[\/([a-z])]/g,"<\/\$1>").
			replace(/\[([a-z])\]/g,"<\$1>");
	},

	generateLiveTable: function(dataArray, outputElement, itemProperty) {
		throw new Exception("Not ready yet!");
		/*if (!dataArray) return;
		var result='<table id="Helper:LiveTableOutput"><tr>' +
			'<th align="left" sortkey="guildId" sortType="number">Guild</th>' +
			'<th sortkey="name">Name</th>' +
			'<th sortkey="level" sortType="number">Level</th></tr>';
		var item, color;
		for (var i=0; i<dataArray[itemProperty].length;i++) {
			item=dataArray[itemProperty][i];

			result+='<tr class="HelperTableRow' + (1 + i % 2) +'">' +
				'<td><a href="index.php?cmd=guild&amp;subcmd=view&amp;guild_id=' + player.guildId + '">'+
					'<img width="16" border="0" height="16" src="' + System.imageServerHTTP + '/guilds/' + player.guildId + '_mini.jpg"></a></td>'+
				'<td><a href="index.php?cmd=profile&player_id='+player.id+'">'+ player.name+'</a></td>' +
				'<td align="right">' + player.level + '</td>' +
				'</tr>';
		}
		result+='</table>';
		outputElement.innerHTML=result;

		var theTable=document.getElementById('Helper:OnlinePlayersTable');
		for (var i=0; i<theTable.rows[0].cells.length; i++) {
			var cell=theTable.rows[0].cells[i];
			cell.style.textDecoration="underline";
			cell.style.cursor="pointer";
			cell.addEventListener('click', Helper.sortOnlinePlayersTable, true);
		}*/
	},

	sortLiveTable: function(evt) {
		throw new Exception("Not ready yet!");
		/*Helper.onlinePlayers=System.getValueJSON("onlinePlayers");
		var headerClicked = evt.target.getAttribute("sortKey");
		var sortType = evt.target.getAttribute("sortType");
		if (!sortType) sortType="string";
		GM_log(headerClicked);
		// GM_log(Helper.sortBy);
		GM_log(sortType);
		// numberSort
		if (Helper.sortAsc==undefined) Helper.sortAsc=true;
		if (Helper.sortBy && Helper.sortBy==headerClicked) {
			Helper.sortAsc=!Helper.sortAsc;
		}
		Helper.sortBy=headerClicked;

		switch(sortType) {
			case "string":
				Helper.onlinePlayers.players.sort(Helper.stringSort);
				break;
			case "number":
				Helper.onlinePlayers.players.sort(Helper.numberSort);
				break;
		}
		System.generateOnlinePlayersTable();*/
	},

	parseDate: function(textDate) {
		timeText = textDate.split(" ")[0];
		dateText = textDate.split(" ")[1];
		dayText = dateText.split("/")[0];
		monthText = dateText.split("/")[1];
		if (monthText == "Jan") fullMonthText = "January";
		if (monthText == "Feb") fullMonthText = "February";
		if (monthText == "Mar") fullMonthText = "March";
		if (monthText == "Apr") fullMonthText = "April";
		if (monthText == "May") fullMonthText = "May";
		if (monthText == "Jun") fullMonthText = "June";
		if (monthText == "Jul") fullMonthText = "July";
		if (monthText == "Aug") fullMonthText = "August";
		if (monthText == "Sep") fullMonthText = "September";
		if (monthText == "Oct") fullMonthText = "October";
		if (monthText == "Nov") fullMonthText = "November";
		if (monthText == "Dec") fullMonthText = "December";
		yearText = dateText.split("/")[2];
		dateAsDate = new Date(fullMonthText + " " + dayText + ", " + yearText + " " + timeText + ":00");
		return dateAsDate;
	},

	toggleVisibilty: function(evt) {
		var anItemId=evt.target.getAttribute("linkto");
		var anItem=document.getElementById(anItemId);
		var currentVisibility=anItem.style.visibility;
		anItem.style.visibility=(currentVisibility=="hidden")?"visible":"hidden";
		anItem.style.display=(currentVisibility=="hidden")?"block":"none";
		if (GM_getValue(anItemId)) {
			GM_setValue(anItemId, "");
		} else{
			GM_setValue(anItemId, "ON");
		}
	}
};
System.init();
