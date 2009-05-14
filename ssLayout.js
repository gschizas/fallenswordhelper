var Layout = {

	injectMenu: function() {
		Layout.injectOneMenu("Medal Guide", "index.php?cmd=profile&subcmd=medalguide", 6, "menuSource_0");
		Layout.injectOneMenu("Mission Manager", "index.php?cmd=notepad&subcmd=questmanager", 7, "menuSource_0");
		Layout.injectOneMenu("Backpack Manager", "index.php?cmd=notepad&subcmd=invmanager", 8, "menuSource_0");
		Layout.injectOneMenu("Blueprint Manager", "index.php?cmd=notepad&subcmd=recipemanager", 9, "menuSource_0");
		Layout.injectOneMenu("Faction Inventory", "index.php?cmd=notepad&subcmd=guildinvmanager", 2, "menuSource_5");
		Layout.injectOneMenu("Top 250 Players", "index.php?cmd=toprated&subcmd=xp", 0, "menuSource_3");
		if (GM_getValue("keepLogs")) {
			Layout.injectOneMenu("Combat Logs", "index.php?cmd=notepad&subcmd=showlogs", 10, "menuSource_0");
		}
		if (GM_getValue("showMonsterLog")) {
			Layout.injectOneMenu("Entity Logs", "index.php?cmd=notepad&subcmd=monsterlog", 11, "menuSource_0")
		}
		Layout.injectOneMenu("TH Quick Search", "index.php?cmd=notepad&subcmd=auctionsearch", 5, "menuSource_2");
		Layout.injectOneMenu("Online Players", "index.php?cmd=notepad&subcmd=onlineplayers", 3, "menuSource_2");
		Layout.injectOneMenu("Quick Links", "index.php?cmd=notepad&subcmd=quicklinkmanager", 10, "menuSource_0");
		Layout.injectQuickLinks();
	},

	injectOneMenu: function(text, href, position, insertAt) {
		var menuTable = System.findNode("//div[@id='" + insertAt + "']/table");
		if (!menuTable) return;
		var newRow;
		newRow = menuTable.insertRow(position);
		newRow.setAttribute("height", 20);
		var newCell = newRow.insertCell(0);
		newCell.innerHTML='&nbsp;&nbsp;&nbsp;&nbsp;&#xbb;&nbsp;&nbsp;<A href="' + href + '">' + text + '</A>';
	},

	injectQuickLinks: function() {
		var quickLinks = System.getValueJSON("quickLinks");
		if (!quickLinks) quickLinks=[];
		if (quickLinks.length<=0) return;
		var injectHere1 = System.findNode("//table[@width='700' and contains(tbody/tr/td/img/@src,'content_bg_top.gif')]/tbody/tr[1]/td");
		var injectHere2 = System.findNode("//table[@width='705' and contains(tbody/tr/td/img/@src,'inner_top.jpg')]/tbody/tr[1]/td");
		if (!injectHere1 && !injectHere2) return;
		if (injectHere2) injectHere2.setAttribute("colspan", 3);
		result="&nbsp;&nbsp;";
		for (var i=0; i<quickLinks.length; i++) {
			result+='<a style="font-size:x-small;color:white;" href="' + quickLinks[i].url + '">' + quickLinks[i].name + '</a>&nbsp;'
		}
		if (injectHere1) injectHere1.innerHTML=result;
		if (injectHere2) injectHere2.innerHTML=result;
	},

	moveFSBox: function() {
		if (!GM_getValue("moveFSBox")) return;
		var src=System.findNode("//b[.='FSBox']/../../../../..");
		if (!src) return;
		src.parentNode.removeChild(src.nextSibling);
		var dest=System.findNode("//img[contains(@src,'menu_logout.gif')]/../../../../..");
		// window.alert(dest);
		var info = dest.insertRow(26);
		var cell = info.insertCell(0);
		cell.innerHTML="&nbsp;";
		info = dest.insertRow(26);
		cell = info.insertCell(0);
		cell.setAttribute("align", "center");
		cell.appendChild(src);
	},

	hideNewBox: function() {
		if (!GM_getValue("hideNewBox")) return;
		var removeThis = System.findNode("//font[b='New?']/../../../..");
		if (!removeThis) return;
		removeThis.parentNode.removeChild(removeThis.nextSibling);
		removeThis.parentNode.removeChild(removeThis.nextSibling);
		removeThis.parentNode.removeChild(removeThis);
	},

	notebookContent: function() {
		return System.findNode("//table[@width='640']/..");
	},

	playerId: function() {
		var playerIdRE = /sigmastorm2.com\/\?ref=(\d+)/i;
		var thePlayerId=parseInt(document.body.innerHTML.match(playerIdRE)[1]);
		GM_setValue("playerID", thePlayerId);
		return thePlayerId;
	},

	infoBox: function(documentText) {
		var infoRE = /<center><b>INFORMATION\s*ALERT<\/b><\/center><\/font><\/td>\s*<\/tr>\s*<tr>\s*<td><font size=2 color=\"\#D1D5D6\"><center>([^<]+)<\/center>/i;
		var infoMatch = documentText.match(infoRE);
		var result="";
		if (infoMatch) {
			result=infoMatch[1];
		}
		return result;
	},

	networkIcon: function() {
		return '<img title="This function retrieves data from the network. Disable this to increase speed" '+
			' src="data:image/png;base64,' +
			'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA' +
			'B3RJTUUH1QgGDTMWk1twEwAAAAlwSFlzAAALEgAACxIB0t1+' +
			'/AAAAARnQU1BAACxjwv8YQUAAAC8SURBVHjahVPBEcQgCEQn' +
			'HdmTqUlr0qe16I8cufOiCGZnGCcIy4LEICJwmGgWJ3o0IOCQ' +
			'EqVg9Y4U3CoCHQhvxuPUZEiA3XYkxyI1/6S6R6rke8AlJbkV' +
			'7u95lleXq3yrdyUjLGxwnifmnHEXY3fJIQSIMcKOZCLgMltr' +
			'r+1ZWgxp8wi1VrEqxfeFWloYq4wKtOHeBNqeawqmeOnNvfdY' +
			'SvkbfaeUxP0w/G+k6WsT/xCBc25SuxDsnownEy4u5BHudpMF' +
			'egAAAABJRU5ErkJggg==" width="16" height="16" />';
	},

	quickBuffHref: function(playerId, innerText) {
		return "href=\"javascript:window.openWindow('index.php?cmd=quickbuff&tid=" + playerId +
			"', 'fsQuickBuff', 618, 800, ',scrollbars')\"";
	},

	formatWiki: function(aText, oldVersion, newVersion) {
		var lines=aText.replace("\r","").split("\n");
		var changes=[];
		var revRX = /^==Revision\s*(\d+)/i;
		var chgRX = /^\s*\#\s+(.*)$/i;
		var rev = null;
		var chg = null;
		var revNo = 0;
		var chgTxt = "";

		for (var i=0; i<lines.length; i++){
			var line = lines[i];
			rev=revRX.exec(line);
			chg=chgRX.exec(line);

			if (rev) revNo = parseInt(rev[1]);
			chgTxt = "";
			if (chg) chgTxt = chg[1];
			if (chgTxt!="") {
				if (!changes[revNo]) changes[revNo] = "";
				changes[revNo] += "<li>" + chgTxt + "</li>";
			}
		}
		var result='<ol>';
		for (i=newVersion; i>=oldVersion; i--) {
			if (changes[i]) {
				result += '<li value='+i+'><ul type=square>' + changes[i] + '</ul></li>';
			}
		}
		result += "</ol>"
		return result;
	}

};
