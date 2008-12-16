// System functions

var calfSystem = {
	getValueJSON: function(name) {
		var resultJSON=GM_getValue(name);
		var result;
		if (resultJSON) {
			result = JSON.parse(resultJSON);
		}
		return result;
	},

	findNode: function(xpath, doc) {
		var nodes=calfSystem.findNodes(xpath, doc);
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
		var node=calfSystem.findNode(xpath, doc);
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
		var formElement = calfSystem.findNode("//input[@name='" + name + "']", oForm)
		if (formElement.getAttribute("type")=="checkbox") {
			GM_setValue(name, formElement.checked);
		} else if (formElement.getAttribute("type")=="radio") {
			radioElements = calfSystem.findNodes("//input[@name='" + name + "']", 0, oForm)
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
}

Date.prototype.toFormatString = calfSystem.formatDate;
Number.prototype.padZero = calfSystem.padZero;
String.prototype.repeat = calfSystem.repeatString;
Array.prototype.filterBy = calfSystem.filterBy;
