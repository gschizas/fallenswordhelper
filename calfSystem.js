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
		var idindex             = imgurls.src.indexOf("/skin/");
		System.imageServer      = imgurls.src.substr(0,idindex);
		System.server           = document.location.protocol + "//" + document.location.host + "/";
		System.browserVersion   = parseInt(navigator.userAgent.match(/Firefox\/(\d+)/i)[1]);
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
			}
			result = JSON.parse(resultJSON, reviver);
		}
		return result;
	},

	setValueJSON: function(name, value) {
		GM_setValue(name, JSON.stringify(value))
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
			if (findQ.snapshotLength==0) return null;
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

	formatDateTime: function(aDate) {
		var result=aDate.toDateString()
		result += " "
		var hh=aDate.getHours();
		if (hh<10) hh = "0" + hh;
		var mm=aDate.getMinutes();
		if (mm<10) mm = "0" + mm
		result += hh + ":" + mm
		return result
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
		return parseInt(theText.replace(/,/g,""));
	},

	getIntFromRegExp: function(theText, rxSearch) {
		var matches = theText.match(rxSearch);
		if (matches) {
			result = parseInt(matches[1]);
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

	convertTextToHtml: function(inputText) {
		return inputText
			.replace(/</g,"&lt")
			.replace(/>/g,"&gt")
			.replace(/\n/g,"<br>")
			.replace(/\[\/([a-z])]/g,"<\/\$1>")
			.replace(/\[([a-z])\]/g,"<\$1>");
	},

	generateLiveTable: function(dataArray, outputElement, itemProperty) {
		throw new Exception("Not ready yet!");
		if (!dataArray) return;
		var result='<table id="Helper:LiveTableOutput"><tr>' +
			'<th align="left" sortkey="guildId" sortType="number">Guild</th>' +
			'<th sortkey="name">Name</th>' +
			'<th sortkey="level" sortType="number">Level</th></tr>';
		var item, color;
		for (var i=0; i<dataArray[itemProperty].length;i++) {
			item=dataArray[itemProperty][i];

			result+='<tr class="HelperTableRow' + (1 + i % 2) +'">' +
				'<td><a href="index.php?cmd=guild&amp;subcmd=view&amp;guild_id=' + player.guildId + '">'+
					'<img width="16" border="0" height="16" src="' + System.imageServer + '/guilds/' + player.guildId + '_mini.jpg"></a></td>'+
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
		}
	},

	sortLiveTable: function(evt) {
		throw new Exception("Not ready yet!");
		Helper.onlinePlayers=System.getValueJSON("onlinePlayers");
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
		System.generateOnlinePlayersTable();
	}

};
System.init();
