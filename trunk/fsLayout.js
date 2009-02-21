var Layout = {

	injectMenu: function() {
		Layout.injectOneMenu("Medal Guide", "index.php?cmd=profile&subcmd=medalguide", 11, "menuSource_0");
		Layout.injectOneMenu("Quest Manager", "index.php?cmd=notepad&subcmd=questmanager", 13, "menuSource_0");
		Layout.injectOneMenu("Inventory Manager", "index.php?cmd=notepad&subcmd=invmanager", 15, "menuSource_0");
		Layout.injectOneMenu("Recipe Manager", "index.php?cmd=notepad&subcmd=recipemanager", 17, "menuSource_0");
		Layout.injectOneMenu("Guild Inventory", "index.php?cmd=notepad&subcmd=guildinvmanager", 3, "menuSource_5");
		Layout.injectOneMenu("Top 250 Players", "index.php?cmd=toprated&subcmd=xp", 3, "menuSource_3");
		if (GM_getValue("keepLogs")) {
			Layout.injectOneMenu("Combat Logs", "index.php?cmd=notepad&subcmd=showlogs", 17, "menuSource_0")
		}
		if (GM_getValue("showMonsterLog")) {
			Layout.injectOneMenu("Creature Logs", "index.php?cmd=notepad&subcmd=monsterlog", 19, "menuSource_0")
		}
		Layout.injectOneMenu("AH Quick Search", "index.php?cmd=notepad&subcmd=auctionsearch", 31, "menuSource_2");
		Layout.injectOneMenu("Online Players", "index.php?cmd=notepad&subcmd=onlineplayers", 7, "menuSource_2");
		Layout.injectOneMenu("Quick Links", "index.php?cmd=notepad&subcmd=quicklinkmanager", 23, "menuSource_0");

		Layout.injectQuickLinks();
	},

	injectOneMenu: function(text, href, position, insertAt) {
		var menuTable = System.findNode("//div[@id='" + insertAt + "']/table");
		if (!menuTable) return;
		var newRow;
		newRow = menuTable.insertRow(position);
		newRow.innerHTML='<td height="5"></td>';
		newRow = menuTable.insertRow(position);
		var newCell = newRow.insertCell(0);
		newCell.innerHTML='<font color="black">&nbsp;&nbsp;-&nbsp;<A href="' + href + '"><font color="black">' + text + '</font></A></font>';
	},

	injectQuickLinks: function() {
		var quickLinks = System.getValueJSON("quickLinks");
		if (!quickLinks) quickLinks=[];
		if (quickLinks.length<=0) return;
		var injectHere1 = System.findNode("//table[@width='703' and contains(tbody/tr/td/img/@src,'realm_top_a.jpg')]/tbody/tr[1]/td");
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

	hideBanner: function() {
		if (!GM_getValue("hideBanner")) return;
		var bannerElement = System.findNode("//img[(@title='Fallen Sword RPG')]");
		if (bannerElement) bannerElement.style.display = "none";
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
		return System.findNode("//table[@width='100%']/..");
	},

	playerId: function() {
		var playerIdRE = /fallensword.com\/\?ref=(\d+)/
		var thePlayerId=parseInt(document.body.innerHTML.match(playerIdRE)[1]);
		GM_setValue("playerID",thePlayerId);
		return thePlayerId;
	},

	infoBox: function(documentText) {
		var infoRE = /<center><b>INFORMATION.*><center>([^<]+)<\/center>/i;
		var infoRE = /<center>INFORMATION<\/center><\/font><\/td><\/tr>\t*<tr><td><font size=2 color=\"\#000000\"><center>([^<]+)</i;
		//Fast Recall = <center>INFORMATION</center></font></td></tr>	<tr><td><font size=2 color="#000000"><center>You successfully recalled the item.</center>
		//Guild Take = <center>INFORMATION</center></font></td></tr>	<tr><td><font size=2 color="#000000"><center>You successfully took the item into your backpack.</center>
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
			"', 'fsQuickBuff', 618, 1000, 'scrollbars=yes')\"";
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
