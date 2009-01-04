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
		var playerId=parseInt(document.body.innerHTML.match(playerIdRE)[1]);
		GM_setValue("playerID",playerId);
		return playerId;
	},

}