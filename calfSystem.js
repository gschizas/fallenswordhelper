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

		var imgurls = System.findNode("//img[contains(@src, '/skin/')]");
		if (!imgurls) return; //login screen or error loading etc.
		var idindex = imgurls.src.indexOf("/skin/");
		System.imageServer=imgurls.src.substr(0,idindex);
		System.server=document.location.protocol + "//" + document.location.host + "/";
		System.browserVersion=parseInt(navigator.userAgent.match(/Firefox\/(\d+)/i)[1]);
		System.debug = GM_getValue("showDebugInfo");
	},

	getValueJSON: function(name) {
		var resultJSON=GM_getValue(name);
		var result;
		if (resultJSON) {
			result = JSON.parse(resultJSON);
		}
		return result;
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
			var nodes=new Array();
			var findQ = document.evaluate(xpath, doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			if (findQ.snapshotLength==0) return null;
			for (var i=0; i<findQ.snapshotLength; i++) {
				nodes.push(findQ.snapshotItem(i));
			}
			return nodes;
	},

	findNodeText: function(xpath, doc) {
		var node=System.findNode(xpath, doc);
		if (!node) return null;
		nodes.textContent;
	},

	createDocument: function(details) {
		var doc=document.createElement("HTML");
		doc.innerHTML=details;
		return doc
	},

	formatDate: function(dateFormat) {
	    if (!this.valueOf()) return;
		var months = ['January', 'February', 'March', 'April', 'May', 'June',
			'July', 'August', 'September', 'October', 'November', 'December'];
		var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

		var theDate=this;

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
		return this.filter(function(element, index, array) {return element[property]==value})
	},

	repeatString: function(times) {
		var s = '';
		for (var i=0; i<times; i++) {
			s += this;
		}
		return s;
	},

	saveValueForm: function(oForm, name) {
		var formElement = System.findNode("//input[@name='" + name + "']", oForm)
		if (formElement.getAttribute("type")=="checkbox") {
			GM_setValue(name, formElement.checked);
		} else if (formElement.getAttribute("type")=="radio") {
			radioElements = System.findNodes("//input[@name='" + name + "']", 0, oForm)
			for (var i=0; i<radioElements.length; i++) {
				radioElement = radioElements[i];
				if (radioElement.checked) {
					GM_setValue(name, radioElement.value);
				}
			}
		} else {
			GM_setValue(name, formElement.value);
		}
	},

	setDefault: function(name, value) {
		if (GM_getValue(name)==undefined) {GM_setValue(name, value)};
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
					func.call(this, responseDetails.responseText, this.callback)
				}
			},
		})
	},

	intValue: function(theText) {
		if (!theText) return 0;
		return parseInt(theText.replace(/,/g,""));
	},

	addCommas: function(nStr) {
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
	    return this.replace(/^\s*/,"");
	},

	trimRight: function() {
	    return this.replace(/\s*$/,"");
	},

	formatWiki: function(aText, oldVersion, newVersion) {
		var lines=aText.replace("\r","").split("\n");
		if (newVersion-oldVersion>25) oldVersion = newVersion-25;
		var changes=[];
		var revRX = /^==Revision\s*(\d+)/i;
		var chgRX = /^\s*\#\s+(.*)$/i;
		var rev = null;
		var chg = null;
		var revNo = 0;
		var chgTxt = "";

		for (var i=0; i<lines.length; i++){
			line = lines[i];
			rev=revRX.exec(line);
			chg=chgRX.exec(line);

			if (rev) revNo = parseInt(rev[1]);
			chgTxt = "";
			if (chg) chgTxt = chg[1];
			if (chgTxt!="") {
				if (!changes[revNo]) changes[revNo] = ""
				changes[revNo] += chgTxt + "\n";
			}
		}
		var result="\n";
		for (var i=newVersion; i>=oldVersion; i--) {
			if (changes[i]) {
				result += "Version " + i + ": " + changes[i] + "\n";
			}
		}
		return result;
	},

}
System.init();
