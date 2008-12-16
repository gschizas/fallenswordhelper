var fsLayout = {

	injectMenu: function() {
		fsLayout.injectOneMenu("Medal Guide", "index.php?cmd=profile&subcmd=medalguide", 11, "menuSource_0");
		fsLayout.injectOneMenu("Quest Manager", "index.php?cmd=notepad&subcmd=questmanager", 13, "menuSource_0");
		fsLayout.injectOneMenu("Inventory Manager", "index.php?cmd=notepad&subcmd=invmanager", 15, "menuSource_0");
		fsLayout.injectOneMenu("Recipe Manager", "index.php?cmd=notepad&subcmd=recipemanager", 17, "menuSource_0");
		fsLayout.injectOneMenu("Guild Inventory", "index.php?cmd=notepad&subcmd=guildinvmanager", 3, "menuSource_5");
		fsLayout.injectOneMenu("Top 250 Players", "index.php?cmd=toprated&subcmd=xp", 3, "menuSource_3");
		if (GM_getValue("keepLogs")) {
			fsLayout.injectOneMenu("Combat Logs", "index.php?cmd=notepad&subcmd=showlogs", 17, "menuSource_0")
		}
	},

	injectOneMenu: function(text, href, position, insertAt) {
		var menuTable = calfSystem.findNode("//div[@id='" + insertAt + "']/table");
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
		var bannerElement = calfSystem.findNode("//img[(@title='Fallen Sword RPG')]");
		if (bannerElement) bannerElement.style.display = "none";
	},

	moveFSBox: function() {
		if (!GM_getValue("moveFSBox")) return;
		var src=calfSystem.findNode("//b[.='FSBox']/../../../../..");
		if (!src) return;
		src.parentNode.removeChild(src.nextSibling);
		var dest=calfSystem.findNode("//img[contains(@src,'menu_logout.gif')]/../../../../..");
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
		var removeThis = calfSystem.findNode("//font[b='New?']/../../../..");
		if (!removeThis) return;
		removeThis.parentNode.removeChild(removeThis.nextSibling);
		removeThis.parentNode.removeChild(removeThis.nextSibling);
		removeThis.parentNode.removeChild(removeThis);
	},

}