// ==UserScript==
// @name           FallenSwordHelper
// @namespace      terrasoft.gr
// @description    Fallen Sword Helper
// @include        http://www.fallensword.com/*
// @include        http://fallensword.com/*
// @include        http://*.fallensword.com/*
// ==/UserScript==

var fsHelper = {
	// Static functions
	getValueJSON: function(name) {
		var resultJSON=GM_getValue(name);
		var result;
		if (resultJSON) {
			result = JSON.parse(resultJSON);
		}
		return result;
	},

	saveValueForm: function(oForm, name) {
		var formElement = fsHelper.findNode("//input[@name='" + name + "']", oForm)
		if (formElement.getAttribute("type")=="checkbox") {
			GM_setValue(name, formElement.checked);
		} else if (formElement.getAttribute("type")=="radio") {
			radioElements = fsHelper.findNodes("//input[@name='" + name + "']", 0, oForm)
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

	findNode: function(xpath, doc) {
		var nodes=fsHelper.findNodes(xpath, doc);
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

	getImageServer: function() {
		var imgurls = fsHelper.findNode("//img[contains(@src, '/skin/')]");
		var idindex = imgurls.src.indexOf("/skin/");
		return imgurls.src.substr(0,idindex);
	},

	getServer: function() {
		return document.location.protocol + "//" + document.location.host + "/";
	},

	createDocument: function(details) {
		var doc=document.createElement("HTML");
		doc.innerHTML=details;
		return doc
	},

	// System functions
	init: function(e) {
		this.initialized = true;
		fsHelper.initSettings();
		fsHelper.beginAutoUpdate();
		fsHelper.readInfo();
},

	initSettings: function() {
		if (GM_getValue("showCombatLog")==undefined) GM_setValue("showCombatLog", true);
		if (GM_getValue("showCreatureInfo")==undefined) GM_setValue("showCreatureInfo", true);
	},
		
	readInfo: function() {
		var charInfo = fsHelper.findNode("//img[contains(@src,'skin/icon_player.gif')]");
		var charInfoText = charInfo.getAttribute("onmouseover");
		fsHelper.characterLevel = charInfoText.match(/Level:\s*<\/td><td width=\\\'90%\\\'>(\d+)/i)[1];
		fsHelper.characterAttack = charInfoText.match(/Attack:\s*<\/td><td width=\\\'90%\\\'>(\d+)/i)[1];
		fsHelper.characterDefense = charInfoText.match(/Defense:\s*<\/td><td width=\\\'90%\\\'>(\d+)/i)[1];
		fsHelper.characterHP = charInfoText.match(/HP:\s*<\/td><td width=\\\'90%\\\'>(\d+)/i)[1];
		fsHelper.characterArmor = charInfoText.match(/Armor:\s*<\/td><td width=\\\'90%\\\'>(\d+)/i)[1];
		fsHelper.characterDamage = charInfoText.match(/Damage:\s*<\/td><td width=\\\'90%\\\'>(\d+)/i)[1];
		
		GM_log("\n" +
		"Level: " + fsHelper.characterLevel + "\n" +
		"Attack: " + fsHelper.characterAttack + "\n" +
		"Defense: " + fsHelper.characterDefense + "\n" +
		"HP: " + fsHelper.characterHP + "\n" +
		"Armor: " + fsHelper.characterArmor + "\n" +
		"Damage: " + fsHelper.characterDamage)
	},

	// Autoupdate
	beginAutoUpdate: function() {
		var lastCheck=GM_getValue("lastVersionCheck")
		var now=(new Date()).getTime()
		if (!lastCheck) lastCheck=0;
		var haveToCheck=(now - lastCheck > 6*60*60*1000)

		if (haveToCheck) {
			fsHelper.checkForUpdate;
		}
	},

	checkForUpdate: function() {
		GM_log("Checking for new version...")
		var now=(new Date()).getTime();
		GM_setValue("lastVersionCheck", now.toString())
		GM_xmlhttpRequest({
			method: 'GET',
			url: "http://fallenswordhelper.googlecode.com/svn/trunk/",
			headers: {
				"User-Agent" : navigator.userAgent,
				"Cookie" : document.cookie
			},
			onload: function(responseDetails) {
				fsHelper.autoUpdate(responseDetails);
			},
		})
	},

	autoUpdate: function(responseDetails) {
		if (responseDetails.status!=200) return;
		var now=(new Date()).getTime()
		GM_setValue("lastVersionCheck", now.toString());
		var currentVersion=GM_getValue("currentVersion");
		if (!currentVersion) currentVersion=0;
		var versionRE=/Revision\s*([0-9]+):/;
		var latestVersion=responseDetails.responseText.match(versionRE)[1]
		GM_log("Current version:" + currentVersion);
		GM_log("Found version:" + latestVersion);
		if (currentVersion!=latestVersion) {
			if (window.confirm("New version (" + latestVersion + ") found. Update from version " + currentVersion + "?")) {
				GM_setValue("currentVersion", latestVersion)
				document.location="http://fallenswordhelper.googlecode.com/svn/trunk/fallenswordhelper.user.js";
			}
		}
	},

	hideBanner: function() {
		if (!GM_getValue("hideBanner")) return;
		var bannerElement = fsHelper.findNode("//img[(@title='Fallen Sword RPG')]");
		if (bannerElement) bannerElement.style.display = "none";
	},

	// main event dispatcher
	onPageLoad: function(anEvent) {
		fsHelper.init();
		fsHelper.hideBanner();
		fsHelper.prepareGuildList();
		fsHelper.prepareChat();
		fsHelper.injectStaminaCalculator();
		fsHelper.replaceKeyHandler();

		var re=/cmd=([a-z]+)/;
		var pageIdRE = re.exec(document.location.search);
		var pageId="-";
		if (pageIdRE)
			pageId=pageIdRE[1];

		re=/subcmd=([a-z]+)/;
		var subPageIdRE = re.exec(document.location.search);
		var subPageId="-";
		if (subPageIdRE)
			subPageId=subPageIdRE[1];

		re=/subcmd2=([a-z]+)/;
		var subPage2IdRE = re.exec(document.location.search);
		var subPage2Id="-";
		if (subPage2IdRE)
			subPage2Id=subPage2IdRE[1];

		re=/page=([0-9]+)/;
		var subsequentPageIdRE = re.exec(document.location.search);
		var subsequentPageId="-";
		if (subsequentPageIdRE)
			subsequentPageId=subsequentPageIdRE[1];

		switch (pageId) {
		case "settings":
			fsHelper.injectSettings();
			break;
		case "world":
			fsHelper.injectWorld();
			break;
		case "questbook":
			switch(subsequentPageId) {
			case "-":
				fsHelper.injectQuestBook();
				break;
			}
			break;
		case "profile":
			switch (subPageId) {
			case "dropitems":
				fsHelper.injectDropItemsAuction();
				fsHelper.injectDropItems();
				break;
			case "-":
				fsHelper.injectProfile();
			}
			break;
		case "auctionhouse":
			switch (subPageId) {
			case "create":
				fsHelper.injectAuctionHouse();
				break;
			default:
				fsHelper.injectAuctionHouse();
			}
			break;
		case "guild":
			switch(subPageId) {
			case "inventory":
				switch(subPage2Id) {
					case "report":
						fsHelper.injectReportPaint();
						break;
					default:
						fsHelper.injectDropItemsAuction();
						fsHelper.injectDropItems();
				}
				break;
			case "chat":
				fsHelper.addLogColoring("Chat", 0);
				break;
			case "log":
				fsHelper.addLogColoring("GuildLog", 1);
				fsHelper.addGuildLogWidgets();
				break;
			case "groups":
				switch(subPage2Id) {
					case "viewstats":
						fsHelper.injectGroupStats();
						break;
					default:
						fsHelper.injectGroups();
				}
				break;
			case "manage":
				fsHelper.injectGuild();
				break;
			}
			break;
		case "bank":
			fsHelper.injectBank();
			break;
		case "log":
			switch (subPageId) {
			case "outbox":
				fsHelper.addLogColoring("OutBox", 1);
				break;
			case "-":
				fsHelper.addLogColoring("PlayerLog", 1);
				fsHelper.addLogWidgets();
				break;
			}
			break;
		case "marketplace":
			switch(subPageId) {
			case "createreq":
				fsHelper.addMarketplaceWidgets();
				break;
			}
			break;
		case "-":
			var isRelicPage = fsHelper.findNode("//input[contains(@title,'Use your current group to capture the relic')]");
			if (isRelicPage) {
				fsHelper.injectRelic(isRelicPage);
			}
			var isAuctionPage = fsHelper.findNode("//img[contains(@title,'Auction House')]");
			if (isAuctionPage) {
				fsHelper.injectAuctionHouse();
			}
			break;
		}
	},

	injectGuild: function() {
		var guildLogo = fsHelper.findNode("//a[contains(.,'Change Logo')]").parentNode;
		guildLogo.innerHTML += "[ <span style='cursor:pointer; text-decoration:underline;' id='toggleGuildLogoControl' linkto='guildLogoControl'>X</span> ]";
		var guildLogoElement = fsHelper.findNode("//img[contains(@title, 's Logo')]");
		guildLogoElement.id = "guildLogoControl";
		if (GM_getValue("guildLogoControl")) {
			guildLogoElement.style.display = "none";
			guildLogoElement.style.visibility = "hidden";
		}
		var leaveGuild = fsHelper.findNode("//a[contains(.,'Leave')]").parentNode;
		leaveGuild.innerHTML += "[ <span style='cursor:pointer; text-decoration:underline;' id='toggleStatisticsControl' linkto='statisticsControl'>X</span> ]";
		var linkElement=fsHelper.findNode("//a[@href='index.php?cmd=guild&subcmd=changefounder']");
		statisticsListElement = linkElement.parentNode.parentNode.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.nextSibling;
		statisticsListElement.innerHTML = "<span id='statisticsControl'>" + statisticsListElement.innerHTML + "</span>";
		if (GM_getValue("statisticsControl")) {
			var statisticsControl = document.getElementById("statisticsControl");
			statisticsControl.style.display = "none";
			statisticsControl.style.visibility = "hidden";
		}
		var build = fsHelper.findNode("//a[contains(.,'Build')]").parentNode;
		build.innerHTML += "[ <span style='cursor:pointer; text-decoration:underline;' id='toggleGuildStructureControl' linkto='guildStructureControl'>X</span> ]";
		var linkElement=fsHelper.findNode("//a[@href='index.php?cmd=guild&subcmd=structures']");
		structureListElement = linkElement.parentNode.parentNode.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.nextSibling;
		structureListElement.innerHTML = "<span id='guildStructureControl'>" + structureListElement.innerHTML + "</span>";
		if (GM_getValue("guildStructureControl")) {
			var guildStructureControl = document.getElementById("guildStructureControl");
			guildStructureControl.style.display = "none";
			guildStructureControl.style.visibility = "hidden";
		}

		document.getElementById('toggleGuildLogoControl').addEventListener('click', fsHelper.toggleVisibilty, true);
		document.getElementById('toggleStatisticsControl').addEventListener('click', fsHelper.toggleVisibilty, true);
		document.getElementById('toggleGuildStructureControl').addEventListener('click', fsHelper.toggleVisibilty, true);
	},

	injectStaminaCalculator: function() {
		var staminaImageElement = fsHelper.findNode("//img[contains(@src,'/skin/icon_stamina.gif')]");
		if (staminaImageElement) {
			var mouseOverText = staminaImageElement.getAttribute("onmouseover");
			//Stamina:&nbsp;</td><td width=\'90%\'>3,612&nbsp;/&nbsp;6,370</td>
			//tt_setWidth(225); Tip('<center><b>Stamina</b></center><br><table border=0 cellpadding=3 cellspacing=0 width=\'100%\'>
			//<tr><td><font color=\'#999999\'>Stamina: </td><td width=\'90%\'>3,607 / 6,370</td></tr><tr><td>
			//<font color=\'#999999\'>Gain Per Hour: </td><td width=\'90%\'>+90</td></tr><tr><td><font color=\'#999999\'>
			//Next Gain : </td><td width=\'90%\'>16m 10s</td></tr></table><br>
			//Stamina is required to perform actions (such as attacking players and creatures).<br>'); tt_resetWidth();
			var staminaRE = /Stamina:\s<\/td><td width=\\'90%\\'>([,0-9]+)\s\/\s([,0-9]+)<\/td>/
			var curStamina = staminaRE.exec(mouseOverText)[1];
			curStamina = curStamina.replace(/,/,"")*1;
			var maxStamina = staminaRE.exec(mouseOverText)[2];
			maxStamina = maxStamina.replace(/,/,"")*1;
			var gainPerHourRE = /Gain\sPer\sHour:\s<\/td><td width=\\'90%\\'>\+([,0-9]+)<\/td>/
			var gainPerHour = gainPerHourRE.exec(mouseOverText)[1];
			gainPerHour = gainPerHour.replace(/,/,"")*1;
			var nextGainRE = /Next\sGain\s:\s<\/td><td width=\\'90%\\'>([,0-9]+)m/
			var nextGainMinutes = nextGainRE.exec(mouseOverText)[1];
			nextGainMinutes = nextGainMinutes.replace(/,/,"")*1;
			nextGainHours = nextGainMinutes/60;
			//get the max hours to still be inside stamina maximum
			var hoursToMaxStamina = Math.floor((maxStamina - curStamina)/gainPerHour);
			var millisecondsToMaxStamina = 1000*60*60*(hoursToMaxStamina + nextGainHours);
			var now = (new Date()).getTime();
			var nextHuntMilliseconds = (now + millisecondsToMaxStamina);
			var testDate = Date(now);
			var d = new Date(nextHuntMilliseconds);
			var weekday=new Array("Sun","Mon","Tue","Wed","Thu","Fri","Sat")
			var monthname=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec")
			var minutes=((d.getMinutes() < 10) ? "0" : "") + d.getMinutes();
			var hours=((d.getHours() < 10) ? "0" : "") + d.getHours();
			var nextHuntTimeText = weekday[d.getDay()] + " " + monthname[d.getMonth()] + " " +  d.getDate() + " " +  d.getFullYear() + " " + hours + ":" + minutes;
			var firstPart = mouseOverText.split("</td></tr></table>")[0];
			var secondPart = mouseOverText.split("</td></tr></table>")[1];
			var newPart = "<tr><td><font color=\\'#FFF380\\'>Max Stam At: </td><td width=\\'90%\\'>" + nextHuntTimeText + "</td></tr><tr>";
			var newMouseoverText = firstPart + newPart + "</td></tr></table>" + secondPart;
			newMouseoverText = newMouseoverText.replace(/\s:/,":");
			staminaImageElement.setAttribute("onmouseover",newMouseoverText);
		}
	},

	injectRelic: function(isRelicPage) {
		var relicNameElement = fsHelper.findNode("//td[contains(.,'Below is the current status for the relic')]/b");
		relicNameElement.parentNode.style.fontSize = "x-small";
		var tableElement = fsHelper.findNode("//table[@width='600']");
		for (var i=0;i<tableElement.rows.length;i++) {
			var aRow = tableElement.rows[i];
			if (i==2 ||
				i==3 || //Relic picture
				i==4 ||
				i==5 || //back to world
				i==6 ||
				i==7 || //Relic instructions
				i==8 ||
				i==10 ||
				i==11) { // attempt group capture button
				aRow.firstChild.colSpan = '3';
			}
		}
		var relicName = relicNameElement.innerHTML;
		var tableWithBorderElement = fsHelper.findNode("//table[@cellpadding='5']");
		tableWithBorderElement.align = "left";
		tableWithBorderElement.parentNode.colSpan = "2";
		var tableInsertPoint = tableWithBorderElement.parentNode.parentNode;
		tableInsertPoint.innerHTML += "<td colspan='1'><table width='200' style='border:1px solid #A07720;'><tbody><tr><td title='InsertSpot'></td></tr></tbody></table></td>";
		var extraTextInsertPoint = fsHelper.findNode("//td[@title='InsertSpot']");
		var defendingGuild = fsHelper.findNode("//a[contains(@href,'index.php?cmd=guild&subcmd=view&guild_id=')]");
		var defendingGuildHref = defendingGuild.getAttribute("href");
		fsHelper.getRelicGuildData(extraTextInsertPoint,defendingGuildHref);

		//code specifically to see if guild members are guarding the relic - only applies to PANIC
		if (defendingGuildHref == "index.php?cmd=guild&subcmd=view&guild_id=40769") {
			var panicGuild = true;
		}
		var validMemberString = "";
		if (panicGuild) {
			var memberList = fsHelper.getValueJSON("memberlist");
			for (var i=0;i<memberList.members.length;i++) {
				var member=memberList.members[i];
				if (member.status == "Offline"
					&& (member.level < 400 || (member.level > 421 && member.level < 441 ) || member.level > 450)) {
					validMemberString += member.name + " ";
				}
			}
		}

		var listOfDefenders = fsHelper.findNodes("//b/a[contains(@href,'index.php?cmd=profile&player_id=')]");
		var defenderCount = 0;
		var testList = "";
		for (var i=0; i<listOfDefenders.length; i++) {
			var href = listOfDefenders[i].getAttribute("href");
			//if (i<3) { //I put this in to limit the number of calls this function makes.
					//I don't want to hammer the server too much.
				fsHelper.getRelicPlayerData(defenderCount,extraTextInsertPoint,href);
			//}
			testList += listOfDefenders[i].innerHTML + " ";
			validMemberString = validMemberString.replace(listOfDefenders[i].innerHTML + " ","");
			defenderCount++;
		}
		//extraTextInsertPoint.innerHTML += "<tr><td style='font-size:x-small;'>" + testList + "<td><tr>";
		extraTextInsertPoint.innerHTML += "<tr><td><table style='font-size:small; border-top:2px black solid;'>" +
			"<tr><td>Number of Defenders:</td><td>" + defenderCount + "</td></tr>" +
			"<tr><td>Defending Guild Relic Count:</td><td title='relicCount'>0</td></tr>" +
			"<tr><td>Lead Defender Bonus:</td><td title='LDPercentage'>0</td></tr>" +
			"<tr style='display:none;'><td>Relic Count Processed:</td><td title='relicProcessed'>0</td></tr>" +
			"<tr><td colspan='2' style='font-size:x-small; color:gray;'>Does not allow for last logged time (yet)</td></tr>" +
			"<tr style='display:none;'><td colspan='2' style='border-top:2px black solid;'>Lead Defender Full Stats</td></tr>" +
			"<tr style='display:none;'><td align='right' style='color:brown;'>Attack:</td><td align='right' title='LDattackValue'>0</td></tr>" +
			"<tr style='display:none;'><td align='right' style='color:brown;'>Defense:</td><td align='right' title='LDdefenseValue'>0</td></tr>" +
			"<tr style='display:none;'><td align='right' style='color:brown;'>Armor:</td><td align='right' title='LDarmorValue'>0</td></tr>" +
			"<tr style='display:none;'><td align='right' style='color:brown;'>Damage:</td><td align='right' title='LDdamageValue'>0</td></tr>" +
			"<tr style='display:none;'><td align='right' style='color:brown;'>HP:</td><td align='right' title='LDhpValue'>0</td></tr>" +
			"<tr style='display:none;'><td align='right' style='color:brown;'>Processed:</td><td align='right' title='LDProcessed'>0</td></tr>" +
			"<tr><td colspan='2' style='border-top:2px black solid;'>Other Defender Stats</td></tr>" +
			"<tr><td align='right' style='color:brown;'>Attack:</td><td align='right' title='attackValue'>0</td></tr>" +
			"<tr><td align='right' style='color:brown;'>Defense:</td><td align='right' title='defenseValue'>0</td></tr>" +
			"<tr><td align='right' style='color:brown;'>Armor:</td><td align='right' title='armorValue'>0</td></tr>" +
			"<tr><td align='right' style='color:brown;'>Damage:</td><td align='right' title='damageValue'>0</td></tr>" +
			"<tr><td align='right' style='color:brown;'>HP:</td><td align='right' title='hpValue'>0</td></tr>" +
			"<tr><td align='right' style='color:brown;'>Processed:</td><td align='right' title='defendersProcessed'>0</td></tr>"
		if (panicGuild) {
			extraTextInsertPoint.innerHTML += "<tr><td style='border-top:2px black solid;'>Offline guild members not at relic:<td><tr>";
			extraTextInsertPoint.innerHTML += "<tr><td style='font-size:x-small; color:red;'>" + validMemberString + "<td><tr>";
		}
		extraTextInsertPoint.innerHTML += "</table><td><tr>";
	},

	getRelicGuildData: function(extraTextInsertPoint,href) {
		GM_xmlhttpRequest({
			method: 'GET',
			url: fsHelper.getServer() + href,
			headers: {
				"User-Agent" : navigator.userAgent,
				"Cookie" : document.cookie
			},
			onload: function(responseDetails) {
				fsHelper.parseRelicGuildData(extraTextInsertPoint,href, responseDetails.responseText);
			},
		})
	},

	parseRelicGuildData: function(extraTextInsertPoint,href, responseText) {
		var doc=fsHelper.createDocument(responseText);
		var allItems = doc.getElementsByTagName("IMG");
		var relicCount = 0;
		for (var i=0;i<allItems.length-1;i++) {
			var anItem=allItems[i];
			var mouseoverText = anItem.getAttribute("onmouseover")
			if (mouseoverText && mouseoverText.search("Relic Bonuses") != -1){
				relicCount++;
			}
		}
		var relicCountValue = fsHelper.findNode("//td[@title='relicCount']");
		relicCountValue.innerHTML = relicCount;
		var relicProcessedValue = fsHelper.findNode("//td[@title='relicProcessed']");
		relicProcessedValue.innerHTML = 1;
		var relicMultiplier = 1;
		if (relicCount == 1) {
			relicMultiplier = 1.5;
		}
		else if (relicCount > 3) {
			relicMultiplier = 0.9;
		}
		var LDProcessedValue = fsHelper.findNode("//td[@title='LDProcessed']");
		if (LDProcessedValue.innerHTML == "1") {
			var attackValue = fsHelper.findNode("//td[@title='attackValue']");
			var LDattackValue = fsHelper.findNode("//td[@title='LDattackValue']");
			attackNumber=attackValue.innerHTML.replace(/,/,"")*1;
			LDattackNumber=LDattackValue.innerHTML.replace(/,/,"")*1;
			attackValue.innerHTML = fsHelper.addCommas(attackNumber + Math.round(LDattackNumber*relicMultiplier));
			var defenseValue = fsHelper.findNode("//td[@title='defenseValue']");
			var LDdefenseValue = fsHelper.findNode("//td[@title='LDdefenseValue']");
			defenseNumber=defenseValue.innerHTML.replace(/,/,"")*1;
			LDdefenseNumber=LDdefenseValue.innerHTML.replace(/,/,"")*1;
			defenseValue.innerHTML = fsHelper.addCommas(defenseNumber + Math.round(LDdefenseNumber*relicMultiplier));
			var armorValue = fsHelper.findNode("//td[@title='armorValue']");
			var LDarmorValue = fsHelper.findNode("//td[@title='LDarmorValue']");
			armorNumber=armorValue.innerHTML.replace(/,/,"")*1;
			LDarmorNumber=LDarmorValue.innerHTML.replace(/,/,"")*1;
			armorValue.innerHTML = fsHelper.addCommas(armorNumber + Math.round(LDarmorNumber*relicMultiplier));
			var damageValue = fsHelper.findNode("//td[@title='damageValue']");
			var LDdamageValue = fsHelper.findNode("//td[@title='LDdamageValue']");
			damageNumber=damageValue.innerHTML.replace(/,/,"")*1;
			LDdamageNumber=LDdamageValue.innerHTML.replace(/,/,"")*1;
			damageValue.innerHTML = fsHelper.addCommas(damageNumber + Math.round(LDdamageNumber*relicMultiplier));
			var hpValue = fsHelper.findNode("//td[@title='hpValue']");
			var LDhpValue = fsHelper.findNode("//td[@title='LDhpValue']");
			hpNumber=hpValue.innerHTML.replace(/,/,"")*1;
			LDhpNumber=LDhpValue.innerHTML.replace(/,/,"")*1;
			hpValue.innerHTML = fsHelper.addCommas(hpNumber + Math.round(LDhpNumber*relicMultiplier));
			var defendersProcessed = fsHelper.findNode("//td[@title='defendersProcessed']");
			defendersProcessedNumber=defendersProcessed.innerHTML.replace(/,/,"")*1;
			defendersProcessed.innerHTML = fsHelper.addCommas(defendersProcessedNumber + 1);
			var LDpercentageValue = fsHelper.findNode("//td[@title='LDPercentage']");
			LDpercentageValue.innerHTML = (relicMultiplier*100) + "%";
		}
	},

	getRelicPlayerData: function(defenderCount,extraTextInsertPoint,href) {
		GM_xmlhttpRequest({
			method: 'GET',
			url: fsHelper.getServer() + href,
			headers: {
				"User-Agent" : navigator.userAgent,
				"Cookie" : document.cookie
			},
			onload: function(responseDetails) {
				//window.alert(href);
				fsHelper.parseRelicPlayerData(defenderCount,extraTextInsertPoint,href, responseDetails.responseText);
			},
		})
	},

	parseRelicPlayerData: function(defenderCount,extraTextInsertPoint,href, responseText) {
		var doc=fsHelper.createDocument(responseText)
		var allItems = doc.getElementsByTagName("B")
		for (var i=0;i<allItems.length;i++) {
			var anItem=allItems[i];
			if (anItem.innerHTML == "Attack:&nbsp;"){
				var attackText = anItem;
				var attackLocation = attackText.parentNode.nextSibling.firstChild.firstChild.firstChild.firstChild;
				var playerAttackValue = attackLocation.textContent;
				var defenseText = attackText.parentNode.nextSibling.nextSibling.nextSibling.firstChild;
				var defenseLocation = defenseText.parentNode.nextSibling.firstChild.firstChild.firstChild.firstChild;
				var playerDefenseValue = defenseLocation.textContent;
				var armorText = defenseText.parentNode.parentNode.nextSibling.nextSibling.firstChild.nextSibling.firstChild;
				var armorLocation = armorText.parentNode.nextSibling.firstChild.firstChild.firstChild.firstChild;
				var playerArmorValue = armorLocation.textContent;
				var damageText = armorText.parentNode.nextSibling.nextSibling.nextSibling.firstChild;
				var damageLocation = damageText.parentNode.nextSibling.firstChild.firstChild.firstChild.firstChild;
				var playerDamageValue = damageLocation.textContent;
				var hpText = damageText.parentNode.parentNode.nextSibling.nextSibling.firstChild.nextSibling.firstChild;
				var hpLocation = hpText.parentNode.nextSibling.firstChild.firstChild.firstChild.firstChild;
				var playerHPValue = hpLocation.textContent;
			}
		}

		if (defenderCount != 0) {
			var defenderMultiplier = 0.2;
			var attackValue = fsHelper.findNode("//td[@title='attackValue']");
			attackNumber=attackValue.innerHTML.replace(/,/,"")*1;
			attackValue.innerHTML = fsHelper.addCommas(attackNumber + Math.round(playerAttackValue*defenderMultiplier));
			var defenseValue = fsHelper.findNode("//td[@title='defenseValue']");
			defenseNumber=defenseValue.innerHTML.replace(/,/,"")*1;
			defenseValue.innerHTML = fsHelper.addCommas(defenseNumber + Math.round(playerDefenseValue*defenderMultiplier));
			var armorValue = fsHelper.findNode("//td[@title='armorValue']");
			armorNumber=armorValue.innerHTML.replace(/,/,"")*1;
			armorValue.innerHTML = fsHelper.addCommas(armorNumber + Math.round(playerArmorValue*defenderMultiplier));
			var damageValue = fsHelper.findNode("//td[@title='damageValue']");
			damageNumber=damageValue.innerHTML.replace(/,/,"")*1;
			damageValue.innerHTML = fsHelper.addCommas(damageNumber + Math.round(playerDamageValue*defenderMultiplier));
			var hpValue = fsHelper.findNode("//td[@title='hpValue']");
			hpNumber=hpValue.innerHTML.replace(/,/,"")*1;
			hpValue.innerHTML = fsHelper.addCommas(hpNumber + Math.round(playerHPValue*defenderMultiplier));
			var defendersProcessed = fsHelper.findNode("//td[@title='defendersProcessed']");
			defendersProcessedNumber=defendersProcessed.innerHTML.replace(/,/,"")*1;
			defendersProcessed.innerHTML = fsHelper.addCommas(defendersProcessedNumber + 1);
		}
		else {
			var defenderMultiplier = 1;
			var attackValue = fsHelper.findNode("//td[@title='LDattackValue']");
			attackNumber=attackValue.innerHTML.replace(/,/,"")*1;
			attackValue.innerHTML = fsHelper.addCommas(attackNumber + Math.round(playerAttackValue*defenderMultiplier));
			var defenseValue = fsHelper.findNode("//td[@title='LDdefenseValue']");
			defenseNumber=defenseValue.innerHTML.replace(/,/,"")*1;
			defenseValue.innerHTML = fsHelper.addCommas(defenseNumber + Math.round(playerDefenseValue*defenderMultiplier));
			var armorValue = fsHelper.findNode("//td[@title='LDarmorValue']");
			armorNumber=armorValue.innerHTML.replace(/,/,"")*1;
			armorValue.innerHTML = fsHelper.addCommas(armorNumber + Math.round(playerArmorValue*defenderMultiplier));
			var damageValue = fsHelper.findNode("//td[@title='LDdamageValue']");
			damageNumber=damageValue.innerHTML.replace(/,/,"")*1;
			damageValue.innerHTML = fsHelper.addCommas(damageNumber + Math.round(playerDamageValue*defenderMultiplier));
			var hpValue = fsHelper.findNode("//td[@title='LDhpValue']");
			hpNumber=hpValue.innerHTML.replace(/,/,"")*1;
			hpValue.innerHTML = fsHelper.addCommas(hpNumber + Math.round(playerHPValue*defenderMultiplier));
			var defendersProcessed = fsHelper.findNode("//td[@title='LDProcessed']");
			defendersProcessedNumber=defendersProcessed.innerHTML.replace(/,/,"")*1;
			defendersProcessed.innerHTML = fsHelper.addCommas(defendersProcessedNumber + 1);
		}
		var relicProcessedValue = fsHelper.findNode("//td[@title='relicProcessed']");
		var relicCountValue = fsHelper.findNode("//td[@title='relicProcessed']");
		var relicCount = relicCountValue.innerHTML.replace(/,/,"")*1;

		var relicMultiplier = 1;
		if (relicCount == 1) {
			relicMultiplier = 1.5;
		}
		else if (relicCount > 3) {
			relicMultiplier = 0.9;
		}

		if (defenderCount == 0 && relicProcessedValue.innerHTML == "1") {
			var attackValue = fsHelper.findNode("//td[@title='attackValue']");
			var LDattackValue = fsHelper.findNode("//td[@title='LDattackValue']");
			attackNumber=attackValue.innerHTML.replace(/,/,"")*1;
			LDattackNumber=LDattackValue.innerHTML.replace(/,/,"")*1;
			attackValue.innerHTML = fsHelper.addCommas(attackNumber + Math.round(LDattackNumber*relicMultiplier));
			var defenseValue = fsHelper.findNode("//td[@title='defenseValue']");
			var LDdefenseValue = fsHelper.findNode("//td[@title='LDdefenseValue']");
			defenseNumber=defenseValue.innerHTML.replace(/,/,"")*1;
			LDdefenseNumber=LDdefenseValue.innerHTML.replace(/,/,"")*1;
			defenseValue.innerHTML = fsHelper.addCommas(defenseNumber + Math.round(LDdefenseNumber*relicMultiplier));
			var armorValue = fsHelper.findNode("//td[@title='armorValue']");
			var LDarmorValue = fsHelper.findNode("//td[@title='LDarmorValue']");
			armorNumber=armorValue.innerHTML.replace(/,/,"")*1;
			LDarmorNumber=LDarmorValue.innerHTML.replace(/,/,"")*1;
			armorValue.innerHTML = fsHelper.addCommas(armorNumber + Math.round(LDarmorNumber*relicMultiplier));
			var damageValue = fsHelper.findNode("//td[@title='damageValue']");
			var LDdamageValue = fsHelper.findNode("//td[@title='LDdamageValue']");
			damageNumber=damageValue.innerHTML.replace(/,/,"")*1;
			LDdamageNumber=LDdamageValue.innerHTML.replace(/,/,"")*1;
			damageValue.innerHTML = fsHelper.addCommas(damageNumber + Math.round(LDdamageNumber*relicMultiplier));
			var hpValue = fsHelper.findNode("//td[@title='hpValue']");
			var LDhpValue = fsHelper.findNode("//td[@title='LDhpValue']");
			hpNumber=hpValue.innerHTML.replace(/,/,"")*1;
			LDhpNumber=LDhpValue.innerHTML.replace(/,/,"")*1;
			hpValue.innerHTML = fsHelper.addCommas(hpNumber + Math.round(LDhpNumber*relicMultiplier));
			var defendersProcessed = fsHelper.findNode("//td[@title='defendersProcessed']");
			defendersProcessedNumber=defendersProcessed.innerHTML.replace(/,/,"")*1;
			defendersProcessed.innerHTML = fsHelper.addCommas(defendersProcessedNumber + 1);
			var LDpercentageValue = fsHelper.findNode("//td[@title='LDPercentage']");
			LDpercentageValue.innerHTML = (relicMultiplier*100) + "%";
		}
	},

	position: function() {
		var result = new Object();
		var posit = fsHelper.findNode("//td[contains(@background,'/skin/realm_top_b4.jpg')]/center/nobr/font");
		if (!posit) return;
		var thePosition=posit.innerHTML;
		var positionRE=/\((\d+),\s*(\d+)\)/
		var positionX = parseInt(thePosition.match(positionRE)[1]);
		var positionY = parseInt(thePosition.match(positionRE)[2]);
		result.X=positionX;
		result.Y=positionY;
		return result
	},

	mapThis: function() {
		return;
		var realm = fsHelper.findNode("//td[contains(@background,'/skin/realm_top_b2.jpg')]/center/nobr/b");
		// if ((realm) && (posit)>0) {
			var levelName=realm.innerHTML;
			var theMap = fsHelper.getValueJSON("map")
			GM_log(GM_getValue("map"))
			// theMap = null;
			if (!theMap) {
				theMap = new Object;
				theMap["levels"] = {};
			}
			if (!theMap["levels"][levelName]) theMap["levels"][levelName] = {};
			if (!theMap["levels"][levelName][positionX]) theMap["levels"][levelName][positionX]={};
			theMap["levels"][levelName][positionX][positionY]="!";
			GM_setValue("map", JSON.stringify(theMap));
		// }
	},

	checkBuffs: function() {
		var imgserver = fsHelper.getImageServer();
		var replacementText = "<td background='" + imgserver + "/skin/realm_right_bg.jpg'>"
		replacementText += "<table width='100%' cellpadding='1' style='margin-left:28px; margin-right:28px; font-size:medium; border-spacing: 1px; border-collapse: collapse;'>"
		replacementText += "<tr><td colspan='2' height='10'></td></tr><tr><tr><td height='1' bgcolor='#393527' colspan='2'></td></tr><tr>";

		var hasShieldImp = fsHelper.findNode("//img[contains(@onmouseover,'Summon Shield Imp')]");
		var hasDeathDealer = fsHelper.findNode("//img[contains(@onmouseover,'Death Dealer')]");
		if (hasDeathDealer || hasShieldImp) {
			var re=/(\d) HP remaining/;
			var impsRemaining = 0;
			if (hasShieldImp) {
				//textToTest = "tt_setWidth(105); Tip('<center><b>Summon Shield Imp<br>2 HP remaining<br></b> (Level: 150)</b><br>[Click to De-Activate]</center>');";
				textToTest = hasShieldImp.getAttribute("onmouseover");
				impsRemainingRE = re.exec(textToTest);
				impsRemaining = impsRemainingRE[1];
			}
			var applyImpWarningColor = " style='color:green; font-size:medium;'";
			if (impsRemaining<2){
				applyImpWarningColor = " style='color:red; font-size:large; font-weight:bold'";
			}
			replacementText += "<tr><td" + applyImpWarningColor + ">Shield Imps Remaining: " +  impsRemaining + "</td></tr>"
		}

		var buffs=GM_getValue("huntingBuffs")
		if (!buffs) {
			var buffs="Doubler,Librarian,Adept Learner,Merchant,Treasure Hunter,Animal Magnetism,Conserve"
		}
		var buffAry=buffs.split(",")
		var missingBuffs = new Array();
		for (var i=0;i<buffAry.length;i++) {
			if (!fsHelper.findNode("//img[contains(@onmouseover,'" + buffAry[i] + "')]")) {
				missingBuffs.push(buffAry[i]);
			}
		}
		if (missingBuffs.length>0) {
			replacementText += "<tr><td colspan='2'><div style='font-size:x-small;margin-left: 0px; margin-right: 48px;text-align:center;color:navy;'>You are missing some hunting buffs<br/>("
			replacementText += missingBuffs.join(", ")
			replacementText += ")</div></td></tr>"
		}
		replacementText += "<tr><td colspan='2' height='10'></td></tr><tr><td height='1' bgcolor='#393527' colspan='2'></td></tr>";
		replacementText += "</table>";
		replacementText += "</td>" ;

		var injectHere=fsHelper.findNode("//tr[contains(td/img/@src, 'realm_right_bottom.jpg')]").parentNode.parentNode
		//insert after kill all monsters image and text
		newRow=injectHere.insertRow(2);

		newRow.innerHTML=replacementText;
	},

	injectQuestBook: function() {
		if (GM_getValue("showCompletedQuests")) return;
		var questTable = fsHelper.findNode("//table[@width='100%' and @cellPadding='2']");
		questTable.setAttribute("title","questTable");
		var hideNextRows = 0;
		for (var i=0;i<questTable.rows.length;i++) {
			var aRow = questTable.rows[i];
			if (i!=0) {
				if (hideNextRows > 0) {
					aRow.style.display = "none";
					hideNextRows --;
				}
				if (aRow.cells[0].innerHTML) {
					var aCell = aRow.cells[0]
					var imgElement = aCell.nextSibling.firstChild;
					if (imgElement.getAttribute("title") == "Completed") {
						aRow.style.display = "none";
						hideNextRows = 3;
					}
				}
			}
			else {
				var questNameCell = aRow.firstChild.nextSibling;
				questNameCell.innerHTML += "&nbsp;&nbsp;<font style='color:blue;'>(Completed quests hidden - see preferences to unhide)</font>"
			}
		}

		var pageCountElement = fsHelper.findNode("//select[@class='customselect']");
		//&nbsp;of&nbsp;5&nbsp;
		var pageRE = /\&nbsp;of\&nbsp;(\d+)\&nbsp;/
		var pageCount=pageCountElement.parentNode.innerHTML.match(pageRE)[1]*1;
		for (var i=1;i<pageCount;i++) {
			var href = fsHelper.getServer() + "index.php?cmd=questbook&subcmd=&subcmd2=&page=" + i + "&search_text=";
			fsHelper.getQuestData(href);
		}
	},

	getQuestData: function(href) {
		GM_xmlhttpRequest({
			method: 'GET',
			url: href,
			headers: {
				"User-Agent" : navigator.userAgent,
				"Cookie" : document.cookie
			},
			onload: function(responseDetails) {
				fsHelper.injectQuestData(responseDetails.responseText);
			},
		})
	},

	injectQuestData: function(responseText) {
		var doc=fsHelper.createDocument(responseText)
		var allItems = doc.getElementsByTagName("TD");
		for (var i=0;i<allItems.length;i++) {
			var anItem=allItems[i];
			if (anItem.innerHTML=="Quest Name") {
				var questTable = anItem.parentNode.parentNode;
			}
		}
		var OriginalQuestTable = fsHelper.findNode("//table[@title='questTable']");
		var newRow, newCell;
		var insertNextRows = 0;
		for (var i=1;i<questTable.rows.length;i++) {
			var aRow = questTable.rows[i];
			if (insertNextRows > 0) {
				newRow = OriginalQuestTable.insertRow(OriginalQuestTable.rows.length);
				//newCell=newRow.insertCell(0);
				newRow.innerHTML = aRow.innerHTML;
				insertNextRows --;
			}
			if (aRow.cells[0].innerHTML) {
				var aCell = aRow.cells[0]
				var imgElement = aCell.nextSibling.firstChild;
				if (imgElement.getAttribute("title") != "Completed") {
					newRow = OriginalQuestTable.insertRow(OriginalQuestTable.rows.length);
					newRow.innerHTML = aRow.innerHTML;
					insertNextRows = 3;
				}
			}
		}
	},

	injectWorld: function() {
		// fsHelper.mapThis();
		var injectHere=fsHelper.findNode("//tr[contains(td/img/@src, 'realm_right_bottom.jpg')]").parentNode.parentNode
		var imgserver = fsHelper.getImageServer();
		var newRow=injectHere.insertRow(1);
		var newCell=newRow.insertCell(0);
		newCell.setAttribute("background", imgserver + "/skin/realm_right_bg.jpg");
		if (!GM_getValue("killAllAdvanced")) {GM_setValue("killAllAdvanced", "off")};
		var killStyle = GM_getValue("killAllAdvanced")
		newCell.innerHTML='<div style="margin-left:28px; margin-right:28px;"><table><tbody>' +
				'<tr><td>Auto Kill Style' + fsHelper.helpLink('Auto Kill Style', '<b><u>single</u></b> will fast kill a single monster<br/> ' +
					'<b><u>type</u></b> will fast kill a type of monster<br><b><u>all</u></b> will kill all monsters as you move into the square<br><b><u>off</u></b> returns control to game normal. ' +
					'<br><br><b>CAUTION</b>: If this is set to <b><u>all</u></b> then while you are moving around the world it will automatically kill all the non-elite monsters on the square you move in to.') +
				':' +
				'</td><td><input type="radio" id="killAllAdvancedWorldOff" name="killAllAdvancedWorld" value="off"' +
					((killStyle == "off")?" checked":"") + '>' + ((killStyle == "off")?" <b>off</b>":"off") +'</td>' +
				'<td><input type="radio" id="killAllAdvancedWorldSingle" name="killAllAdvancedWorld" value="single"' +
					((killStyle == "single")?" checked":"") + '>' + ((killStyle == "single")?" <b>single</b>":"single") +'</td></tr>'+
				'<tr><td></td><td><input type="radio" id="killAllAdvancedWorldType" name="killAllAdvancedWorld"  value="type"' +
					((killStyle == "type")?" checked":"") + '>' + ((killStyle == "type")?" <b>type</b>":"type") +'</td>' +
				'<td><input type="radio" id="killAllAdvancedWorldAll" name="killAllAdvancedWorld"  value="all"' +
					((killStyle == "all")?" checked":"") + '>' + ((killStyle == "all")?" <b>all</b>":"all") +'</td></tr>' +
				'</tbody></table>' +
			'</div>';
		document.getElementById('killAllAdvancedWorldOff').addEventListener('click', fsHelper.killAllAdvancedChangeFromWorld, true);
		document.getElementById('killAllAdvancedWorldSingle').addEventListener('click', fsHelper.killAllAdvancedChangeFromWorld, true);
		document.getElementById('killAllAdvancedWorldType').addEventListener('click', fsHelper.killAllAdvancedChangeFromWorld, true);
		document.getElementById('killAllAdvancedWorldAll').addEventListener('click', fsHelper.killAllAdvancedChangeFromWorld, true);
		// injectHere.style.display='none';
		fsHelper.checkBuffs();
		fsHelper.prepareCheckMonster();
		fsHelper.killAllMonsters();
		fsHelper.prepareCombatLog();
	},

	prepareCombatLog: function() {
		if (!GM_getValue("showCombatLog")) return;
		var reportsTable=fsHelper.findNode("//table[@width='320']/parent::*");
		var tempLog=document.createElement("div");
		tempLog.id="reportsLog";
		var injLog=reportsTable.appendChild(tempLog);
		var is=injLog.style;
		is.color = 'black';
		is.backgroundImage='url(http://66.7.192.165/skin/realm_right_bg.jpg)'
		is.maxHeight = '200px';
		is.width = '277px';
		is.maxWidth = is.width;
		is.marginLeft = '0px';
		is.marginRight = '0px';
		is.paddingLeft = '26px';
		is.paddingRight = '24px';
		is.overflow = 'hidden';
		is.fontSize = 'xx-small';
		is.textAlign = 'justify';
		injLog.innerHTML="<img src='' style=''><img src='' style=''>"
		//injLog.innerHTML+="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Pellentesque pretium tellus nec dui. Duis sed ante. Sed suscipit ornare orci. Phasellus velit libero, porttitor id, dapibus non, pretium vitae, sem. Maecenas dui purus, semper non, bibendum et, tempor eu, ligula. Cras magna. Nam sodales, mauris sit amet vehicula volutpat, nisl urna egestas sem, et ultricies dui felis at ligula. Aliquam nisl ipsum, tincidunt lacinia, rhoncus at, suscipit sed, purus. Mauris nec risus. Proin faucibus quam ut nisi.<br/><br/>Curabitur dignissim eleifend eros. Sed lacinia nisl et dolor. Cras dignissim nisl id nulla. Duis auctor sodales lacus. Etiam ullamcorper erat vitae erat mollis vulputate. Mauris mollis pede id pede. Cras vel ipsum in massa faucibus porttitor. Mauris facilisis tortor in ipsum. Morbi magna risus, tincidunt et, congue nec, porta ac, leo. In tempor. Aenean libero dui, dignissim vel, egestas vitae, tincidunt eu, lacus. In dui metus, condimentum vitae, molestie vitae, accumsan in, urna. Duis cursus lacus vitae dolor. Pellentesque massa enim, aliquet non, vestibulum vel, ullamcorper sit amet, metus. Morbi lacus lacus, porttitor eu, interdum in, vehicula sed, pede. Pellentesque lorem.";
		//injLog.innerHTML+="<br/>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Pellentesque pretium tellus nec dui. Duis sed ante. Sed suscipit ornare orci. Phasellus velit libero, porttitor id, dapibus non, pretium vitae, sem. Maecenas dui purus, semper non, bibendum et, tempor eu, ligula. Cras magna. Nam sodales, mauris sit amet vehicula volutpat, nisl urna egestas sem, et ultricies dui felis at ligula. Aliquam nisl ipsum, tincidunt lacinia, rhoncus at, suscipit sed, purus. Mauris nec risus. Proin faucibus quam ut nisi.<br/><br/>Curabitur dignissim eleifend eros. Sed lacinia nisl et dolor. Cras dignissim nisl id nulla. Duis auctor sodales lacus. Etiam ullamcorper erat vitae erat mollis vulputate. Mauris mollis pede id pede. Cras vel ipsum in massa faucibus porttitor. Mauris facilisis tortor in ipsum. Morbi magna risus, tincidunt et, congue nec, porta ac, leo. In tempor. Aenean libero dui, dignissim vel, egestas vitae, tincidunt eu, lacus. In dui metus, condimentum vitae, molestie vitae, accumsan in, urna. Duis cursus lacus vitae dolor. Pellentesque massa enim, aliquet non, vestibulum vel, ullamcorper sit amet, metus. Morbi lacus lacus, porttitor eu, interdum in, vehicula sed, pede. Pellentesque lorem.";
		//injLog.innerHTML+="<br/><br/>This is the end, my only friend"
		//injLog.scrollTop=500000;
	},

	killAllAdvancedChangeFromWorld: function(evt) {
		var killAllAdvanced = GM_getValue("killAllAdvanced");
		if (!GM_getValue("killAllAdvanced")) {GM_setValue("killAllAdvanced", "off")};
		GM_setValue("killAllAdvanced", evt.target.value);
		window.location = 'index.php?cmd=world';
	},

	killSingleMonster: function(monsterNumber) {
		if (GM_getValue("killAllAdvanced") != "single") return;
		var kills=0;
		var linkId="//a[@id='attackLink" + monsterNumber + "']"
		var monster = fsHelper.findNode(linkId);
		if (monster) {
			kills+=1;
			var href=monster.href;
			GM_xmlhttpRequest({
				method: 'GET',
				callback: linkId,
				url: href,
				headers: {
					"User-Agent" : navigator.userAgent,
					// "Content-Type": "application/x-www-form-urlencoded",
					"Cookie" : document.cookie
				},
				onload: function(responseDetails, callback) {
					fsHelper.killedMonster(responseDetails, this.callback);
				},
			})
		}
		if (kills>0) {
			GM_xmlhttpRequest({
				method: 'GET',
				url: fsHelper.getServer() + "index.php?cmd=blacksmith&subcmd=repairall&fromworld=1",
				headers: {
					"User-Agent" : navigator.userAgent,
					// "Content-Type": "application/x-www-form-urlencoded",
					"Cookie" : document.cookie
				},
				onload: function(responseDetails) {
					// GM_log(responseDetails.responseText);
				},
			})
		}
	},

	killSingleMonsterType: function(monsterType) {
		if (GM_getValue("killAllAdvanced") != "type") return;
		var kills=0;
		for (var i=1; i<=8; i++) {
			var linkId="//a[@id='attackLink" + i + "']"
			var monster = fsHelper.findNode(linkId);
			if (monster) {
				thisMonsterType = monster.parentNode.parentNode.parentNode.firstChild.nextSibling.nextSibling.innerHTML;
				if (thisMonsterType == monsterType) {
					kills+=1;
					var href=monster.href;
					GM_xmlhttpRequest({
						method: 'GET',
						callback: linkId,
						url: href,
						headers: {
							"User-Agent" : navigator.userAgent,
							"Cookie" : document.cookie
						},
						onload: function(responseDetails, callback) {
							fsHelper.killedMonster(responseDetails, this.callback);
						},
					})
				}
			}
		}
		if (kills>0) {
			GM_xmlhttpRequest({
				method: 'GET',
				url: fsHelper.getServer() + "index.php?cmd=blacksmith&subcmd=repairall&fromworld=1",
				headers: {
					"User-Agent" : navigator.userAgent,
					"Cookie" : document.cookie
				},
			})
		}
	},

	prepareCheckMonster: function() {
		if (!GM_getValue("showCreatureInfo")) return;
		for (var i=1; i<=8; i++) {
			var linkId="//a[@id='attackLink" + i + "']/preceding-sibling::a"
			var monster = fsHelper.findNode(linkId);
			if (monster) {
				var href=monster.href;
				GM_xmlhttpRequest({
					method: 'GET',
					callback: monster,
					url: href,
					headers: {
						"User-Agent" : navigator.userAgent,
						"Cookie" : document.cookie
					},
					onload: function(responseDetails, callback) {
						fsHelper.checkedMonster(responseDetails, this.callback);
					},
				})
			}
			
		}
	},

	checkedMonster: function(responseDetails, callback) {
		var reportText="";
		var creatureInfo=fsHelper.createDocument(responseDetails.responseText);
		var statsNode = fsHelper.findNode("//table[@width='400']", creatureInfo);
		var classNode = fsHelper.findNode("//table[@width='400']/tbody/tr/td[contains(.,'Class:')]/following-sibling::td", creatureInfo);
		var levelNode = fsHelper.findNode("//table[@width='400']/tbody/tr/td[contains(.,'Level:')]/following-sibling::td", creatureInfo);
		var attackNode = fsHelper.findNode("//table[@width='400']/tbody/tr/td[contains(.,'Attack:')]/following-sibling::td", creatureInfo);
		var defenseNode = fsHelper.findNode("//table[@width='400']/tbody/tr/td[contains(.,'Defense:')]/following-sibling::td", creatureInfo);
		var armorNode = fsHelper.findNode("//table[@width='400']/tbody/tr/td[contains(.,'Armor:')]/following-sibling::td", creatureInfo);
		var damageNode = fsHelper.findNode("//table[@width='400']/tbody/tr/td[contains(.,'Damage:')]/following-sibling::td", creatureInfo);
		var hitpointsNode = fsHelper.findNode("//table[@width='400']/tbody/tr/td[contains(.,'HP:')]/following-sibling::td", creatureInfo);
		var goldNode = fsHelper.findNode("//table[@width='400']/tbody/tr/td[contains(.,'Gold:')]/following-sibling::td", creatureInfo);
		var enhanceNodes = fsHelper.findNodes("//table[@width='400']/tbody/tr[contains(td,'Enhancements')]/following-sibling::*[td/font[@color='#333333']]", creatureInfo);
		/*
		if (statsNode) reportText += "<div style='color:#FFF380;'>Statistics</div>"
		if (classNode) reportText += "Class: " + classNode.textContent + "<br/>";
		if (levelNode) reportText += "Level: " + levelNode.textContent + "<br/>";
		if (attackNode) reportText += "Attack: " + attackNode.textContent + "<br/>";
		if (defenseNode) reportText += "Defense: " + defenseNode.textContent + "<br/>";
		if (armorNode) reportText += "Armor: " + armorNode.textContent + "<br/>";
		if (damageNode) reportText += "Damage: " + damageNode.textContent + "<br/>";
		if (goldNode) reportText += "Gold: " + goldNode.textContent + "<br/>";
		if (enhanceNodes) {
			if (enhanceNodes) reportText += "<div style='color:#FFF380;'>Enhancements</div>"
			for (i=0; i<enhanceNodes.length; i++) {
				reportText += enhanceNodes[i].textContent + "<br/>";
			}
		}
		*/
		var recolor=fsHelper.findNodes("//td[@bgcolor='#cd9e4b']", statsNode);
		for (var i=0; i<recolor.length; i++) {
			recolor[i].style.color="black";
		}
		recolor=fsHelper.findNodes("//font[@color='#333333']", statsNode);
		for (var i=0; i<recolor.length; i++) {
			recolor[i].style.color="#cccccc";
		}
		var killButtons=fsHelper.findNode("tbody/tr[td/input]", statsNode);
		var killButtonHeader=fsHelper.findNode("tbody/tr[contains(td,'Actions')]", statsNode);
		var killButtonParent=killButtonHeader.parentNode;
		
		levelNode.innerHTML += " (your level:<span style='color:yellow'>" + fsHelper.characterLevel + "</span>)"
		attackNode.innerHTML += " (your defense:<span style='color:yellow'>" + fsHelper.characterDefense + "</span>) "
		defenseNode.innerHTML += " (your attack:<span style='color:yellow'>" + fsHelper.characterAttack + "</span>)"
		armorNode.innerHTML += " (your damage:<span style='color:yellow'>" + fsHelper.characterDamage + "</span>)"
		damageNode.innerHTML += " (your armor:<span style='color:yellow'>" + fsHelper.characterArmor + "</span>)"
		hitpointsNode.innerHTML += " (your HP:<span style='color:yellow'>" + fsHelper.characterHP + "</span>)"
		
		killButtonParent.removeChild(killButtons);
		killButtonParent.removeChild(killButtonHeader);
		callback.setAttribute("mouseOverText", statsNode.parentNode.innerHTML);
		callback.setAttribute("mouseOverWidth", "400");
		callback.addEventListener("mouseover", fsHelper.clientTip, true);
	},

	killAllMonsters: function() {
		if (GM_getValue("killAllAdvanced") != "all") return;
		var kills=0;
		for (var i=1; i<=8; i++) {
			var linkId="//a[@id='attackLink" + i + "']"
			var monster = fsHelper.findNode(linkId);
			if (monster) {
				kills+=1;
				var href=monster.href;
				GM_xmlhttpRequest({
					method: 'GET',
					callback: linkId,
					url: href,
					headers: {
						"User-Agent" : navigator.userAgent,
						// "Content-Type": "application/x-www-form-urlencoded",
						"Cookie" : document.cookie
					},
					onload: function(responseDetails, callback) {
						fsHelper.killedMonster(responseDetails, this.callback);
					},
				})
			}
		}
		if (kills>0) {
			GM_xmlhttpRequest({
				method: 'GET',
				url: fsHelper.getServer() + "index.php?cmd=blacksmith&subcmd=repairall&fromworld=1",
				headers: {
					"User-Agent" : navigator.userAgent,
					"Cookie" : document.cookie
				},
				onload: function(responseDetails) {
					// GM_log(responseDetails.responseText);
				},
			})
		}
	},

	killedMonster: function(responseDetails, callback) {
		var doc=fsHelper.createDocument(responseDetails.responseText);
		try {
			var reportRE=/var\s+report=new\s+Array;\n(report\[[0-9]+\]="[^"]+";\n)*/;
			var report=responseDetails.responseText.match(reportRE);
			if (report) report=report[0]

			// var specialsRE=/<div id="specialsDiv" style="position:relative; display:block;"><font color='#FF0000'><b>Azlorie Witch Doctor was withered.</b></font>/
			var specials=fsHelper.findNodes("//div[@id='specialsDiv']", doc);

			var playerIdRE = /fallensword.com\/\?ref=(\d+)/
			var playerId=document.body.innerHTML.match(playerIdRE)[1];

			var xpGain=responseDetails.responseText.match(/var\s+xpGain=(-?[0-9]+);/)
			if (xpGain) {xpGain=xpGain[1]} else {xpGain=0};
			var goldGain=responseDetails.responseText.match(/var\s+goldGain=(-?[0-9]+);/)
			if (goldGain) {goldGain=goldGain[1]} else {goldGain=0};
			var guildTaxGain=responseDetails.responseText.match(/var\s+guildTaxGain=(-?[0-9]+);/)
			if (guildTaxGain) {guildTaxGain=guildTaxGain[1]} else {guildTaxGain=0};
			var levelUp=responseDetails.responseText.match(/var\s+levelUp=(-?[0-9]+);/)
			if (levelUp) {levelUp=levelUp[1]} else {levelUp=0};
			var lootRE=/You looted the item '<font color='(\#[0-9A-F]+)'>([^<]+)<\/font>'<\/b><br><br><img src=\"http:\/\/[0-9.]+\/items\/(\d+).gif\"\s+onmouseover="ajaxLoadCustom\([0-9]+,\s-1,\s+([0-9a-f]+),\s+[0-9]+,\s+''\);\">/
			var infoRE=/<center>INFORMATION<\/center><\/font><\/td><\/tr>\t+<tr><td><font size=2 color=\"\#000000\"><center>([^<]+)<\/center>/i;
			var info=responseDetails.responseText.match(infoRE)
			if (info) {info=info[1]} else {info=""};
			var lootMatch=responseDetails.responseText.match(lootRE)
			var lootedItem = "";
			var lootedItemId = "";
			var lootedItemVerify="";
			if (lootMatch && lootMatch.length>0) {
				lootedItem=lootMatch[2];
				lootedItemId=lootMatch[3];
				lootedItemVerify=lootMatch[4];
			}
			var shieldImpDeathRE = /Shield Imp absorbed all damage/;
			var shieldImpDeath = responseDetails.responseText.match(shieldImpDeathRE);

			var monster = fsHelper.findNode(callback);
			if (monster) {
				var result=document.createElement("div");
				var resultText="<small><small>"+callback.replace(/\D/g,"")+". XP:" + xpGain + " Gold:" + goldGain + " (" + guildTaxGain + ")</small></small>";
				if (info!="") resultText+="<br/><div style='font-size:x-small;width:120px;overflow:hidden;' title='" + info + "'>" + info + "</div>";
				if (lootedItem!="") {
					// I've temporarily disabled the ajax thingie, as it doesn't seem to work anyway.
					resultText += "<br/><small><small>Looted item:<span onmouseoverDISABLED=\"ajaxLoadCustom(" + lootedItemId + ", -1, '" + lootedItemVerify + "', " + playerId + ", '');\" >" + lootedItem + "</span></small></small>";
				}
				if (shieldImpDeath) {
					resultText += "<br/><small><small><span style='color:red;'>Shield Imp Death</span></small></small>"
				}
				result.innerHTML=resultText
				var monsterParent = monster.parentNode;
				result.id = "result" + callback;
				if (report) {
					var reportLines=report.split("\n");
					var reportText="";
					if (specials) {
						reportText += "<div style='color:red'>"
						for (var i=0; i<specials.length; i++) {
							reportText += specials[i].textContent;
							reportText += "<br/>"
						}
						reportText += "</div>"
					}
					for (var i=0; i<reportLines.length; i++) {
						var reportMatch = reportLines[i].match(/\"(.*)\"/);
						if (reportMatch) {
							reportText += "<br/>"
							reportText += reportMatch[1];
						}
					}
					if (levelUp=="1") {
						reportText += '<br/><br/><div style="color:#999900;font-weight:bold;>Your level has increased!</div>';
					}
					if (levelUp=="-1") {
						reportText += '<br/><br/><div style="color:#991100;font-weight:bold;">Your level has decreased!</div>';
					}
					mouseOverText = "<div><div style='color:#FFF380;text-align:center;'>Combat Results</div>" + reportText + "</div>";
					fsHelper.appendCombatLog(reportText);
					result.setAttribute("mouseOverText", mouseOverText);
				}
				monsterParent.innerHTML = "";
				monsterParent.insertBefore(result, monsterParent.nextSibling);
				if (report) {
					document.getElementById("result" + callback).addEventListener("mouseover", fsHelper.clientTip, true);
				}
			}
		}
		catch (ex) {
			GM_log(ex);
			GM_log(responseDetails.responseText);
		}
	},

	appendCombatLog: function(text) {
		var reportLog = fsHelper.findNode("//div[@id='reportsLog']");
		if (!reportLog) return;
		reportLog.innerHTML += text;
	},

	scrollUpCombatLog: function() {
		var reportLog = fsHelper.findNode("//div[@id='reportsLog']");
		reportLog.scrollTop-=10;
	},

	scrollDownCombatLog: function() {
		var reportLog = fsHelper.findNode("//div[@id='reportsLog']");
		reportLog.scrollTop+=10;
	},

	clientTip: function(evt) {
		var target=evt.target;
		var value, width;
		do {
			if (target.getAttribute) {
				value=target.getAttribute("mouseovertext");
				width=target.getAttribute("mouseoverwidth");
			}
			target=target.parentNode;
		} while (!value && target);
		if (value) {
			if (!width) width="250";
			unsafeWindow.tt_setWidth(parseInt(width));
			unsafeWindow.Tip(value);
		}
	},

	prepareGuildList: function() {
		var injectHere = fsHelper.findNode("//table[@width='120' and contains(.,'New?')]")
		if (!injectHere) return;
		var info = injectHere.insertRow(0);
		var cell = info.insertCell(0);
		cell.innerHTML="<span id='fsHelperPlaceholderWorld'></span>";
		fsHelper.retrieveGuildData();
	},

	retrieveGuildData: function() {
		var memberList = fsHelper.getValueJSON("memberlist");
		if (memberList) {
			if ((new Date()).getTime() - memberList.changedOn > 15000) memberList = null; // invalidate cache
		}

		if (!memberList) {
			GM_xmlhttpRequest({
				method: 'GET',
				url: fsHelper.getServer() + "index.php?cmd=guild&subcmd=manage",
				headers: {
					"User-Agent" : navigator.userAgent,
					"Cookie" : document.cookie
				},
				onload: function(responseDetails) {
					fsHelper.parseGuildForWorld(responseDetails.responseText);
				},
			})
		} else {
			var memberList = fsHelper.getValueJSON("memberlist");
			memberList.isRefreshed = false;
			fsHelper.injectGuildList(memberList);
		}
	},

	parseGuildForWorld: function(details) {
		var doc=fsHelper.createDocument(details);
		var allTables = doc.getElementsByTagName("TABLE")
		var membersTable;
		for (var i=0;i<allTables.length;i++) {
			var oneTable=allTables[i];
			if (oneTable.rows.length>=1 && oneTable.rows[0].cells.length>=1 && (/<b>Members<\/b>/i).test(oneTable.rows[0].cells[0].innerHTML)) {
				membersTable=oneTable;
			}
		}
		if (membersTable) {
			var membersDetails=membersTable.getElementsByTagName("TABLE")[0];
			var memberList = new Object();
			memberList.members = new Array();
			memberList.lookupByName = new Array();
			memberList.lookupById = new Array();
			for (var i=0;i<membersDetails.rows.length;i++) {
				var aRow = membersDetails.rows[i];
				if (aRow.cells.length==5 && aRow.cells[0].firstChild.title) {
					var aMember = new Object;
					aMember.status = aRow.cells[0].firstChild.title;
					aMember.id = (/[0-9]+$/).exec(aRow.cells[1].firstChild.nextSibling.href)[0]
					aMember.name=aRow.cells[1].firstChild.nextSibling.textContent;
					aMember.level=aRow.cells[2].textContent;
					aMember.rank=aRow.cells[3].textContent;
					aMember.xp=aRow.cells[4].textContent;
					memberList.members.push(aMember);
					memberList.lookupByName.push(aMember.name)
					memberList.lookupById.push(aMember.id)
				}
			}
			memberList.changedOn = new Date().getTime();
			memberList.isRefreshed = true;
			fsHelper.injectGuildList(memberList);
		}
	},

	prepareChat: function() {
		var injectHere = fsHelper.findNode("//table[@width='120' and contains(.,'New?')]")
		if (!injectHere) return;
		var showLines = parseInt(GM_getValue("chatLines"))
		if (showLines==0) return;
		var info = injectHere.insertRow(1);
		var cell = info.insertCell(0);
		cell.innerHTML="<span id='fsHelperPlaceholderChat'></span>";
		var chat = fsHelper.getValueJSON("chat");
		var newChat = fsHelper.findNode("//table[contains(.,'chat messages')]")
		if (!chat || newChat || ((new Date()).getTime() - chat.lastUpdate > 15000)) {
			fsHelper.retrieveChat();
		} else {
			chat.isRefreshed=false;
			fsHelper.injectChat(chat);
		}
	},

	retrieveChat: function() {
		GM_xmlhttpRequest({
			method: 'GET',
			url: fsHelper.getServer() + "index.php?cmd=guild&subcmd=chat",
			headers: {
				"User-Agent" : navigator.userAgent,
				"Cookie" : document.cookie
			},
			onload: function(responseDetails) {
				fsHelper.parseChatForWorld(responseDetails.responseText);
			},
		})
	},

	parseChatForWorld: function(chatText) {
		var doc=fsHelper.createDocument(chatText);
		var chatTable = fsHelper.findNode("//table[@border='0' and @cellpadding='2' and @width='100%']", doc);
		if (!chatTable) return;
		// GM_log(chatTable.innerHTML);
		var chat = new Object();
		var chatConfirm=fsHelper.findNode("//input[@name='xc']", doc);
		chat.isRefreshed=true;
		chat.lastUpdate = (new Date()).getTime();
		chat.messages = new Array();
		for (var i=chatTable.rows.length-1; i>0; i--) {
			var aRow = chatTable.rows[i];
			if (aRow.cells.length==3) {
				var aMessage=new Object();
				aMessage.time=aRow.cells[0].textContent;
				aMessage.from=aRow.cells[1].textContent;
				aMessage.text=aRow.cells[2].textContent;
				chat.messages.push(aMessage);
			}
		}
		chat.confirm=chatConfirm.value;
		fsHelper.injectChat(chat);
	},

	injectChat: function(chat){
		var injectHere = document.getElementById("fsHelperPlaceholderChat");
		var newTable=false;
		// window.alert(chat.messages.length);

		var displayList = document.getElementById("fsHelperChatWindow");
		if (!displayList) {
			displayList=document.createElement("TABLE");
			displayList.id="fsHelperChatWindow";
			displayList.style.border = "1px solid #c5ad73";
			displayList.style.backgroundColor = (chat.isRefreshed)?"#6a5938":"#4a3918";
			displayList.cellPadding = 1;
			displayList.width = 125;
			newTable=true;
		}
		else {
			while (displayList.rows.length>0) {
				displayList.deleteRow(0);
			}
			displayList.style.backgroundColor = (chat.isRefreshed)?"#6a5938":"#4a3918";
		}

		var aRow=displayList.insertRow(displayList.rows.length);
		var aCell=aRow.insertCell(0);

		var result="<div style='font-size:xx-small'>"
		var showLines = parseInt(GM_getValue("chatLines"))
		if (isNaN(showLines)) {
			showLines=10
			GM_setValue("chatLines", showLines)
		}
		var startFrom = (chat.messages.length>showLines)?chat.messages.length-showLines:0;
		for (var i=startFrom; i<chat.messages.length; i++) {
			result += "<span style='color:#F5F298' title='"+chat.messages[i].time+"'>"
			result += chat.messages[i].from
			result += ":</span><span style='color:white'>"
			result += chat.messages[i].text
			result += "</span><br/>";
		}
		result += '<form action="index.php" method="post" id="fsHelperChatBox" onsubmit="return false;">'
		result += '<input type="hidden" value="' + chat.confirm + '" name="xc"/>'
		result += '<input type="text" class="custominput" size="14" name="msg"/>'
		result += '<input type="submit" class="custominput" value="Send" name="submit"/>'
		result += '</form>'
		result += '</div>'

		aCell.innerHTML = result;

		if (newTable) {
			var breaker=document.createElement("BR");
			injectHere.parentNode.insertBefore(breaker, injectHere.nextSibling);
			injectHere.parentNode.insertBefore(displayList, injectHere.nextSibling);
		}

		document.getElementById('fsHelperChatBox').addEventListener('submit', fsHelper.sendChat, true);

		//document.removeEventListener("keypress", unsafeWindow.document.onkeypress, true);

		GM_setValue("chat", JSON.stringify(chat));
	},

	sendChat: function(evt) {
		var oForm=evt.target;

		var confirm=fsHelper.findNode("//input[@name='xc']", evt.target.form).value
		var msg=fsHelper.findNode("//input[@name='msg']", evt.target.form).value
		if (msg=="") {
			fsHelper.retrieveChat();
			return false;
		}

		GM_xmlhttpRequest({
			method: 'POST',
			url: fsHelper.getServer() + "index.php",
			headers: {
				"User-Agent" : navigator.userAgent,
				"Content-Type": "application/x-www-form-urlencoded",
				"Cookie" : document.cookie
			},
			data: "cmd=guild&subcmd=dochat&xc="+confirm+"&msg="+encodeURIComponent(msg)+"&submit=Send",
			onload: function(responseDetails) {
				fsHelper.retrieveChat();
			},
		})

		return false;
	},

	replaceKeyHandler: function() {
		// window.alert(unsafeWindow.document.onkeypress);
		unsafeWindow.document.onkeypress = null;
		unsafeWindow.document.onkeypress = fsHelper.keyPress;
	},

	keyPress: function (evt) {
		var r, s;
		if (evt.target.tagName!="HTML") return;

		// ignore control, alt and meta keys (I think meta is the command key in Macintoshes)
		if (evt.ctrlKey) return;
		if (evt.metaKey) return;
		if (evt.altKey) return;

		r = evt.charCode;
		s = evt.keyCode;
		var pos=fsHelper.position();
		if (pos) {
			var x=pos.X;
			var y=pos.Y;
		}

		switch (r) {
		case 113: // nw
			if (pos) window.location = 'index.php?cmd=world&subcmd=move&x=' + (x-1) + '&y=' + (y-1);
			break;
		case 119: // n
			if (pos) window.location = 'index.php?cmd=world&subcmd=move&x=' + (x+0) + '&y=' + (y-1);
			break;
		case 101: // ne
			if (pos) window.location = 'index.php?cmd=world&subcmd=move&x=' + (x+1) + '&y=' + (y-1);
			break;
		case 97: // w
			if (pos) window.location = 'index.php?cmd=world&subcmd=move&x=' + (x-1) + '&y=' + (y+0);
			break;
		case 100: // e
			if (pos) window.location = 'index.php?cmd=world&subcmd=move&x=' + (x+1) + '&y=' + (y+0);
			break;
		case 122: // sw
			if (pos) window.location = 'index.php?cmd=world&subcmd=move&x=' + (x-1) + '&y=' + (y+1);
			break;
		case 120: // s
			if (pos) window.location = 'index.php?cmd=world&subcmd=move&x=' + (x+0) + '&y=' + (y+1);
			break;
		case 99: // se
			if (pos) window.location = 'index.php?cmd=world&subcmd=move&x=' + (x+1) + '&y=' + (y+1);
			break;
		case 114: // repair
			window.location = 'index.php?cmd=blacksmith&subcmd=repairall&fromworld=1';
			break;
		case 103: // create group
			window.location = 'index.php?cmd=guild&subcmd=groups&subcmd2=create&fromworld=1';
			break;
		case 49:
		case 50:
		case 51:
		case 52:
		case 53:
		case 54:
		case 55:
		case 56: // keyed combat
			var index	= r-48;
			var linkObj	= document.getElementById("attackLink"+index);
			if (linkObj!=null) {
				var killStyle = GM_getValue("killAllAdvanced");
				//kill style off
				if (killStyle == "off") {
					window.location = linkObj.href
				}
				//kill style single
				if (killStyle == "single") {
					fsHelper.killSingleMonster(index);
				}
				//kill style type
				if (killStyle == "type") {
					var monsterType = linkObj.parentNode.parentNode.parentNode.firstChild.nextSibling.nextSibling.innerHTML
					fsHelper.killSingleMonsterType(monsterType);
				}
			}
			break;
		case 57: // debug
			fsHelper.appendCombatLog('test<br/>')
			break;
		case 98: // backpack [b]
			window.location = 'index.php?cmd=profile&subcmd=dropitems&fromworld=1';
			break;
		case 19: // quick buffs
			openWindow("index.php?cmd=quickbuff", "fsQuickBuff", 618, 500, ",scrollbars");
			break;
		case 48: // return to world
			window.location = 'index.php?cmd=world';
			break;
		case 0: // special key
			switch (s) {
			case 37: // w
				if (pos) {
					window.location = 'index.php?cmd=world&subcmd=move&x=' + (x-1) + '&y=' + (y+0);
					evt.preventDefault();
					evt.stopPropagation();
				}
				break;
			case 38: // n
				if (pos) {
					window.location = 'index.php?cmd=world&subcmd=move&x=' + (x+0) + '&y=' + (y-1);
					evt.preventDefault();
					evt.stopPropagation();
				}
				break;
			case 39: // e
				if (pos) {
					window.location = 'index.php?cmd=world&subcmd=move&x=' + (x+1) + '&y=' + (y+0);
					evt.preventDefault();
					evt.stopPropagation();
				}
				break;
			case 40: // s
				if (pos) {
					window.location = 'index.php?cmd=world&subcmd=move&x=' + (x+0) + '&y=' + (y+1);
					evt.preventDefault();
					evt.stopPropagation();
				}
				break;
			case 33:
				if (fsHelper.findNode("//div[@id='reportsLog']")) {
					fsHelper.scrollUpCombatLog();
					evt.preventDefault();
					evt.stopPropagation();
				}
				break;
			case 34:
				if (fsHelper.findNode("//div[@id='reportsLog']")) {
					fsHelper.scrollDownCombatLog();
					evt.preventDefault();
					evt.stopPropagation();
				}
				break;
			default:
				// GM_log('special key: ' +s);
			}
		}
		return true;
	},

	addLogColoring: function(logScreen, dateColumn) {
		if (!GM_getValue("enableLogColoring")) return;
		var lastCheckScreen = "last" + logScreen + "Check";
		var localLastCheckMilli=GM_getValue(lastCheckScreen);
		if (!localLastCheckMilli) localLastCheckMilli=(new Date()).getTime();

		var chatTable = fsHelper.findNode("//table[@border='0' and @cellpadding='2' and @width='100%']");

		var localDateMilli = (new Date()).getTime();
		var gmtOffsetMinutes = (new Date()).getTimezoneOffset();
		var gmtOffsetMilli = gmtOffsetMinutes*60*1000;

		var newRow = chatTable.insertRow(1);
		var newCell = newRow.insertCell(0);

		for (var i=1;i<chatTable.rows.length;i++) {
			var aRow = chatTable.rows[i];
			//GM_log(aRow.innerHTML);
			if (aRow.cells[0].innerHTML) {
				//GM_log(aRow.cells[dateColumn].innerHTML);
				var cellContents = aRow.cells[dateColumn].innerHTML;
				cellContents = cellContents.substring(0,17); // fix for player log screen.
				postDateAsDate = fsHelper.textDateToDate(cellContents);
				postDateAsLocalMilli = postDateAsDate.getTime() - gmtOffsetMilli;
				postAge = (localDateMilli - postDateAsLocalMilli)/(1000*60);
				if (postDateAsLocalMilli > localLastCheckMilli) {
					aRow.style.backgroundColor = "#F5F298";
				}
				else if (postAge > 20 && postDateAsLocalMilli <= localLastCheckMilli) {
					aRow.style.backgroundColor = "#CD9E4B";
				}
			}
		}
		now=(new Date()).getTime()
		GM_setValue(lastCheckScreen, now.toString());
	},

	textDateToDate: function(textDate) {
		timeText = textDate.split(" ")[0];
		dateText = textDate.split(" ")[1];
		dayText = dateText.split("/")[0];
		monthText = dateText.split("/")[1];
		if (monthText == "Jan") {fullMonthText = "January"};
		if (monthText == "Feb") {fullMonthText = "February"};
		if (monthText == "Mar") {fullMonthText = "March"};
		if (monthText == "Apr") {fullMonthText = "April"};
		if (monthText == "May") {fullMonthText = "May"};
		if (monthText == "Jun") {fullMonthText = "June"};
		if (monthText == "Jul") {fullMonthText = "July"};
		if (monthText == "Aug") {fullMonthText = "August"};
		if (monthText == "Sep") {fullMonthText = "September"};
		if (monthText == "Oct") {fullMonthText = "October"};
		if (monthText == "Nov") {fullMonthText = "November"};
		if (monthText == "Dec") {fullMonthText = "December"};
		yearText = dateText.split("/")[2];
		dateAsDate = new Date(fullMonthText + " " + dayText + ", " + yearText + " " + timeText + ":00")
		return dateAsDate;
	},

	addLogWidgets: function() {
		var logTable = fsHelper.findNode("//table[@border='0' and @cellpadding='2' and @width='100%']");
		var memberList = fsHelper.getValueJSON("memberlist");
		var memberNameString;
		for (var i=0;i<memberList.members.length;i++) {
			var member=memberList.members[i];
			memberNameString += member.name + " ";
		}
		var isGuildmate = false;
		for (var i=0;i<logTable.rows.length;i++) {
			var aRow = logTable.rows[i];
			if (i != 0) {
				if (aRow.cells[0].innerHTML) {
					firstCell = aRow.cells[0];
					//Valid Types: General, Chat, Guild
					messageType = firstCell.firstChild.getAttribute("title");
					if (messageType == "Chat") {
						var playerName = aRow.cells[2].firstChild.innerHTML;
						if (memberNameString.search(playerName) !=-1) {
							aRow.cells[2].firstChild.innerHTML = "<font style='color:green;'>" + playerName + "</font>";
							isGuildmate = true;
						}
						var messageHTML = aRow.cells[2].innerHTML;
						var firstPart = messageHTML.split(">Reply</a>")[0];
						var secondPart = messageHTML.split(">Reply</a>")[1];
						//http://www.fallensword.com/index.php?cmd=trade&target_player=Bubbacus62
						var extraPart = " | <a href='index.php?cmd=trade&target_player=" + playerName + "'>Trade</a> ";
						aRow.cells[2].innerHTML = firstPart + ">Reply</a>" + extraPart + secondPart;

						isGuildmate = false;
					}
				}
			}
			else {
				var messageNameCell = aRow.firstChild.nextSibling.nextSibling.nextSibling;
				messageNameCell.innerHTML += "&nbsp;&nbsp;<span style='color:white;'>(Guild mates show up in <span style='color:green;'>green</span>)</span>"
			}

		}
	},

	addGuildLogWidgets: function() {
		if (!GM_getValue("hideNonPlayerGuildLogMessages")) return;
		var playerIdRE = /fallensword.com\/\?ref=(\d+)/
		var playerId=document.body.innerHTML.match(playerIdRE)[1]*1;

		var logTable = fsHelper.findNode("//table[@border='0' and @cellpadding='2' and @width='100%']");
		var hideNextRows = 0;
		for (var i=0;i<logTable.rows.length;i++) {
			var aRow = logTable.rows[i];
			var firstPlayerID = 0;
			var secondPlayerID = 0;
			if (i != 0) {
				if (hideNextRows>0) {
					//aRow.style.display = "none";
					hideNextRows --;
				}
				if (aRow.cells[0].innerHTML) {
					var messageHTML = aRow.cells[2].innerHTML;
					var doublerPlayerMessageRE = /member\s<a\shref="index.php\?cmd=profile\&amp;player_id=(\d+)/
					secondPlayer = doublerPlayerMessageRE.exec(messageHTML);
					var singlePlayerMessageRE = /<a\shref="index.php\?cmd=profile\&amp;player_id=(\d+)/
					firstPlayer = singlePlayerMessageRE.exec(messageHTML);
					if (secondPlayer) {
						firstPlayerID = firstPlayer[1]*1;
						secondPlayerID = secondPlayer[1]*1;
					}
					if (firstPlayer && !secondPlayer) {
						firstPlayerID = firstPlayer[1]*1;
					}
					if (firstPlayerID == playerId || secondPlayerID == playerId) {
					}
					else if (firstPlayer) {
						//aRow.style.display = "none";
						aRow.style.fontSize = "x-small";
						aRow.style.color = "gray";
						hideNextRows = 3;
					}
				}
			}
			else {
				var messageNameCell = aRow.firstChild.nextSibling.nextSibling.nextSibling;
				messageNameCell.innerHTML += "&nbsp;&nbsp;<font style='color:white;'>(Guild Log messages not involving self are dimmed!)</font>"
			}

		}
	},

	injectGuildList: function(memberList) {
		var oldMemberList = fsHelper.getValueJSON("oldmemberlist");
		if (!oldMemberList) oldMemberList=memberList;

		oldIds = new Array();
		for (var i=0; i<oldMemberList.members.length;i++) {
			if (oldMemberList.members[i].status=="Online") {
				oldIds.push(oldMemberList.members[i].id);
			}
		}

		var playerIdRE = /\.fallensword.com\/\?ref=(\d+)/
		var playerId=document.body.innerHTML.match(playerIdRE)[1];

		GM_setValue("memberlist", JSON.stringify(memberList));
		var injectHere = document.getElementById("fsHelperPlaceholderWorld");
		// injectHere.innerHTML=memberList.length;
		var displayList = document.createElement("TABLE");
		displayList.style.border = "1px solid #c5ad73";
		displayList.style.backgroundColor = (memberList.isRefreshed)?"#6a5938":"#4a3918";
		displayList.cellPadding = 1;
		displayList.width = 125;

		var aRow=displayList.insertRow(displayList.rows.length);
		var aCell=aRow.insertCell(0);
		var output = "<ol style='color:#FFF380;font-size:10px;list-style-type:decimal;margin-left:1px;margin-top:1px;margin-bottom:1px;padding-left:20px;'>Guild Members"
		for (var i=0;i<memberList.members.length;i++) {
			var member=memberList.members[i];
			if (member.status=="Online") {
				if (memberList.isRefreshed) {
					fsHelper.getFullPlayerData(member);
				}
				output += "<li style='padding-bottom:0px;'>"
				output += "<a style='color:#CCFF99;font-size:10px;' "
				output += "href=\"javascript:openWindow('index.php?cmd=quickbuff&tid=" + member.id + "', 'fsQuickBuff', 618, 500, 'scrollbars')\">[b]</a>&nbsp;";
				if (member.id!=playerId) {
					output += "<a style=\"color:#A0CFEC;font-size:10px;\" "
					output += "href=\"" + fsHelper.getServer() + "index.php?cmd=message&target_player=" + member.name + "\">[m]";
					output += "</a>";
				}
				else {
					output += "<span style='color:" + displayList.style.backgroundColor + ";'>[m]</span>";
				}
				output += "&nbsp;<a onmouseover=\"tt_setWidth(105);";
				output += "Tip('<div style=\\'text-align:center;width:105px;\\'><b>" + member.rank + "</b><br/>XP: " + member.xp + "<br/>Lvl: " + member.level + "<br/>";
				if (member.hasFullData) {

				}
				output += "</div>');\" ";
				output += "style='color:"
				if (oldIds.indexOf(member.id)<0 /* || member.justLoggedIn */) { // just logged in
					output += "orange";
					member.loggedIn=new Date().getTime();
					member.lastSeen=new Date().getTime();
					// if (memberList.isRefreshed) {member.justLoggedIn=true; }
				} else {
					output += (member.id==playerId)?"#FFF380":"white";
				}
				output += ";font-size:10px;'"
				output += " href='" + fsHelper.getServer() + "index.php?cmd=profile&player_id=" + member.id + "'>" + member.name + "</a>";
				// output += "<br/>"
				output += "</li>"
			}
			else {
				member.loggedIn=0;
			}
		}
		output += "</ol>"
		aCell.innerHTML = output;
		var breaker=document.createElement("BR");
		injectHere.parentNode.insertBefore(breaker, injectHere.nextSibling);
		injectHere.parentNode.insertBefore(displayList, injectHere.nextSibling);

		if (memberList.isRefreshed) {
			GM_setValue("oldmemberlist", JSON.stringify(memberList));
		}
	},

	getFullPlayerData: function(member) {
		return;
		GM_xmlhttpRequest({
			method: 'GET',
			url: fsHelper.getServer() + "index.php?cmd=profile&player_id=" + member.id,
			headers: {
				"User-Agent" : navigator.userAgent,
				"Cookie" : document.cookie
			},
			onload: function(responseDetails) {
				fsHelper.parsePlayerData(member.id, responseDetails.responseText);
			},
		})
	},

	parsePlayerData: function(memberId, responseText) {
		// return;
		var doc=fsHelper.createDocument(responseText)
		// var statistics = fsHelper.findNode("//table[contains(tr/td/b,'Level:')]",0,doc);
		var statistics = fsHelper.findNode("//table[contains(tbody/tr/td/b,'Level:')]",0,doc);
		var levelNode = fsHelper.findNode("//td[contains(b,'Level:')]",0,statistics);
		var levelValue = levelNode.nextSibling.innerHTML;
		GM_log(levelValue);
		// GM_log(statistics.innerHTML); //parentNode.parentNode.nextSibling.nextSibling.nextSibling.innerHTML);
	},

	injectBank: function() {
		var injectHere;
		var bank = fsHelper.findNode("//b[contains(.,'Bank')]");
		if (bank) {
			bank.innerHTML+="<br><a href='/index.php?cmd=guild&subcmd=bank'>Guild Bank</a>";
		}
	},


	injectAuctionHouse: function() {
		var isAuctionPage = fsHelper.findNode("//img[contains(@title,'Auction House')]");
		var imageCell = isAuctionPage.parentNode;
		var imageHTML = imageCell.innerHTML; //hold on to this for later.

		var potions = fsHelper.getValueJSON("potions");

		if (!potions) {
			potions = [
				{"searchname":"Potion of the Wise",         "shortname":"Lib 200",   "buff":"Librarian",      "level":200,  "duration":120, "minlevel":5},
				{"searchname":"Potion of the Bookworm",     "shortname":"Lib 225",   "buff":"Librarian",      "level":225,  "duration":90,  "minlevel":5},
				{"searchname":"Potion of Shattering",       "shortname":"SA",        "buff":"Shatter Armor",  "level":150,  "duration":20,  "minlevel":5, "bound":true},
				{"searchname":"Dragons Blood Potion",       "shortname":"ZK 200",    "buff":"Berzerk",        "level":200,  "duration":30,  "minlevel":5},
				{"searchname":"Berserkers Potion",          "shortname":"ZK 300",    "buff":"Berserk",        "level":300,  "duration":45,  "minlevel":5},
				{"searchname":"Potion of Fury",             "shortname":"ZK 350",    "buff":"Berserk",        "level":350,  "duration":60,  "minlevel":5},
				{"searchname":"Sludge Brew",                "shortname":"DC 200",    "buff":"Dark Curse",     "level":200,  "duration":45,  "minlevel":5, "bound":true},
				{"searchname":"Potion of Black Death",      "shortname":"DC 225",    "buff":"Dark Curse",     "level":225,  "duration":60,  "minlevel":5, "wide":true},
				{"searchname":"Potion of Supreme Doubling", "shortname":"DB 450",    "buff":"Doubler",        "level":450,  "duration":00,  "minlevel":5},
				{"searchname":"Potion of Acceleration",     "shortname":"DB 500",    "buff":"Doubler",        "level":500,  "duration":120, "minlevel":5, "wide":true},
				{"searchname":"Potion of Truth",            "shortname":"EW 1000",   "buff":"Enchant Weapon", "level":1000, "duration":90,  "minlevel":5, "bound":true},
				{"searchname":"Potion of Lesser Death Dealer",  "shortname":"DD",    "buff":"Death Dealer",   "level":25,   "duration":45,  "minlevel":20},
				{"searchname":"Potion of Aid",              "shortname":"Assist",    "buff":"Assist",         "level":150,  "duration":30,  "minlevel":5},
				{"searchname":"Dull Edge",                  "shortname":"Dull Edge", "buff":"Dull Edge",      "level":25,   "duration":60,  "minlevel":1},
				{"searchname":"Potion of Death",            "shortname":"DW",        "buff":"Death Wish",     "level":125,  "duration":15,  "minlevel":5, "bound":true},
				{"searchname":"Potion of Supreme Luck",     "shortname":"FI 1000",   "buff":"Find Item",      "level":1000, "duration":60,  "minlevel":5, "bound":true}
			];
		}

		//GM_log(JSON.stringify(potions));

		var finalHTML = "<span style='font-size:x-small; color:blue;'><table><tbody><tr><td rowspan='7'>" + imageHTML + "</td>" +
			"<td colspan='3' style='text-align:center;color:#7D2252;background-color:#CD9E4B'>Quick Potion Search</td></tr>"
		var lp=0;
		for (var p=0;p<potions.length;p++) {
			var pot=potions[p];
			if (lp % 3==0) finalHTML += "<tr>";
			finalHTML += "<td";
			if (pot.wide) finalHTML+=" colspan='2' "
			finalHTML += "><span style='cursor:pointer;text-decoration:underline;color:#7D2252' cat='quickPotionSearch' searchtext='" +
				pot.searchname + "' title='" +
				pot.buff + " " + pot.level.toString() + "'>" +
				pot.shortname + "</span></td>"
			if (lp % 3==2) finalHTML += "</tr>";
			if (pot.wide) lp++;
			if (lp % 3==2) finalHTML += "</tr>";
			lp++;
		}
		// if (!/</tr>$/.exec(finalHTML)) finalHTML+="</tr>"
		/*
			"<tr><td><span style='cursor:pointer; text-decoration:underline;' cat='quickPotionSearch' searchtext='Wise' title='Librarian'>Lib 200</span></td>" +
				"<td><span style='cursor:pointer; text-decoration:underline;' cat='quickPotionSearch' searchtext='Bookworm' title='Librarian'>Lib 225</span></td>" +
				"<td><span style='cursor:pointer; text-decoration:underline;' cat='quickPotionSearch' searchtext='Shatter' title='Shatter Armor'>SA</span></td></tr>" +
			"<tr><td><span style='cursor:pointer; text-decoration:underline;' cat='quickPotionSearch' searchtext='Dragons Blood' title='Berserk'>ZK 200</span></td>" +
				"<td><span style='cursor:pointer; text-decoration:underline;' cat='quickPotionSearch' searchtext='Berserkers' title='Berserk'>ZK 300</span></td>" +
				"<td><span style='cursor:pointer; text-decoration:underline;' cat='quickPotionSearch' searchtext='Fury' title='Berserk'>ZK 350</span></td></tr>" +
			"<tr><td><span style='cursor:pointer; text-decoration:underline;' cat='quickPotionSearch' searchtext='Sludge' title='Dark Curse'>DC 200</span></td>" +
				"<td colspan='2'><span style='cursor:pointer; text-decoration:underline;' cat='quickPotionSearch' searchtext='Black Death' title='Dark Curse'>DC 225</span></td></tr>" +
			"<tr><td><span style='cursor:pointer; text-decoration:underline;' cat='quickPotionSearch' searchtext='Doubling' title='Doubler'>DB 450</span></td>" +
				"<td colspan='2'><span style='cursor:pointer; text-decoration:underline;' cat='quickPotionSearch' searchtext='Acceleration' title='Doubler'>DB 500</span></td></tr>" +
			"<tr><td><span style='cursor:pointer; text-decoration:underline;' cat='quickPotionSearch' searchtext='Truth' title='Enchant Weapon'>EW 1000</span></td>" +
				"<td><span style='cursor:pointer; text-decoration:underline;' cat='quickPotionSearch' searchtext='Death Dealer' title='Death Dealer'>DD</span></td>" +
				"<td><span style='cursor:pointer; text-decoration:underline;' cat='quickPotionSearch' searchtext='Aid' title='Assist'>Assist</span></td></tr>" +
			"<tr><td><span style='cursor:pointer; text-decoration:underline;' cat='quickPotionSearch' searchtext='Dull Edge' title='Dull Edge'>Dull Edge</span></td>" +
				"<td><span style='cursor:pointer; text-decoration:underline;' cat='quickPotionSearch' searchtext='Potion of Death' title='Death Wish'>DW</span></td>" +
				"<td><span style='cursor:pointer; text-decoration:underline;' cat='quickPotionSearch' searchtext='Supreme Luck' title='Find Item'>FI 1000</span></td></tr>" +
			"</tbody></table></span>";
        */
		imageCell.innerHTML = finalHTML;

		//GM_log(imageCell.parentNode.innerHTML);
		var quickSearchList = fsHelper.findNodes("//span[@cat='quickPotionSearch']");
		for (var i=0; i<quickSearchList.length; i++) {
			quickSearchItem = quickSearchList[i];
			quickSearchItem.addEventListener('click', fsHelper.quickAuctionSearch, true);
		}

		var allItems = document.getElementsByTagName("IMG");
		var savedItems = fsHelper.getValueJSON("savedItems")
		for (var i=0; i<allItems.length; i++) {
			anItem = allItems[i];
			if (anItem.src.search("items") != -1) {
				var mouseOver=anItem.getAttribute("onmouseover");
				var reParams=/(\d+),\s*(\d+),\s*(\d+),\s*(\d+)/
				var reResult=reParams.exec(mouseOver);
				var itemId=reResult[1];
				var invId=reResult[2];
				var type=reResult[3];
				var pid=reResult[4];
				if (savedItems && savedItems.indexOf(itemId)>=0) {
					//fsHelper.injectDropItemsParse(savedItems(itemId).reponseText);
					GM_log("script error");
					//window.alert(savedItems(itemId).reponseText);
				}
				else {
						fsHelper.insertAuctionGetItemDetails(itemId, invId, type, pid);
				}
			}
		}
		var minBidLink = fsHelper.findNode("//a[contains(@href,'&order_by=1')]");
		var auctionTable = minBidLink.parentNode.parentNode.parentNode.parentNode;
		auctionTable.title = "auctionTable";

		var playerIdRE = /\.fallensword.com\/\?ref=(\d+)/
		var playerId=document.body.innerHTML.match(playerIdRE)[1];

		var newRow, newCell, bidMinBuyoutCell, buyNowBuyoutCell,winningBidBuyoutCell;
		for (var i=0;i<auctionTable.rows.length;i++) {
			var aRow = auctionTable.rows[i];
			if (i>0 && // the title row - ignore this
				aRow.cells[1]) { // a separator row - ignore this
				if (aRow.cells[5].innerHTML == '<font size="1">[ended]</font>') { //time left column
					aRow.cells[6].innerHTML = ""; // text field and button column
				} else {
					winningBidValue = "-";
					var bidExistsOnItem = false;
					var playerListedItem = false;
					if (aRow.cells[1].innerHTML != '<font size="1">Auction House</font>') {
						var sellerElement = aRow.cells[1].firstChild.firstChild;
						sellerHref = sellerElement.getAttribute("href");
						var sellerIDRE = /player_id=(\d+)/;
						var sellerID = sellerIDRE.exec(sellerHref)[1];
						if (playerId == sellerID) {
							playerListedItem = true;
						}
					}
					if (aRow.cells[3].innerHTML != '<font size="1">-</font>') {
						var winningBidTable = aRow.cells[3].firstChild.firstChild;
						var winningBidCell = winningBidTable.rows[0].cells[0];
						var winningBidValue = winningBidCell.textContent.replace(/,/,"")*1;
						newRow = winningBidTable.insertRow(2);
						winningBidBuyoutCell = newRow.insertCell(0);
						winningBidBuyoutCell.colSpan = "2";
						winningBidBuyoutCell.align = "center";
						var winningBidderHTML = winningBidTable.rows[1].cells[0].innerHTML;
						var winningBidderIDRE = /player_id=(\d+)/;
						var winningBidderID = winningBidderIDRE.exec(winningBidderHTML)[1];
						if (playerId == winningBidderID) {
							playerListedItem = true;
						}
					}
					var bidBuyoutTable = aRow.cells[4].firstChild.firstChild;
					newRow = bidBuyoutTable.insertRow(1);
					bidMinBuyoutCell = newRow.insertCell(0);
					bidMinBuyoutCell.colSpan = "2";
					bidMinBuyoutCell.align = "left";
					// = newRow.insertCell(1);
					newCell = newRow.insertCell(1);
					buyNowBuyoutCell = newRow.insertCell(2);
					buyNowBuyoutCell.colSpan = "2";
					buyNowBuyoutCell.align = "right";
					var bidCell = bidBuyoutTable.rows[0].cells[0];
					var bidValue = bidCell.textContent*1;
					var buyoutCell = bidBuyoutTable.rows[0].cells[3];
					var buyoutHTML = buyoutCell.innerHTML;
					if (winningBidValue != "-" && !bidExistsOnItem && !playerListedItem) {
						var overBid = Math.ceil(winningBidValue * 1.05);
						winningBidBuyoutCell.innerHTML = '<span style="color:blue; cursor:pointer; text-decoration:underline;" findme="bidOnItem" linkto="auction' + i + 'text" bidvalue="' + overBid + '">Bid ' + fsHelper.addCommas(overBid) + '</span>&nbsp';
					}
					if (winningBidValue == "-" && !bidExistsOnItem && !playerListedItem) {
						bidMinBuyoutCell.innerHTML = '<span style="color:blue; cursor:pointer; text-decoration:underline;" findme="bidOnItem" linkto="auction' + i + 'text" bidvalue="' + bidValue + '">Bid Now</span>&nbsp';
					}
					var buyoutValue = "-";
					if (buyoutHTML != "-" && !playerListedItem) {
						newCell.innerHTML = "&nbsp/&nbsp";
						buyoutValue = (buyoutCell.textContent)*1;
						buyNowBuyoutCell.innerHTML = '&nbsp<span style="color:blue; cursor:pointer; text-decoration:underline;" findme="bidOnItem" linkto="auction' + i + 'text" bidvalue="' + buyoutValue + '">Buy Now</span>';
					}
					var inputTable = aRow.cells[6].firstChild.firstChild;
					if (!playerListedItem) {
					var inputCell = inputTable.rows[0].cells[0];
					var textInput = inputCell.firstChild;
					textInput.id = 'auction' + i + 'text';
					}
					var inputText = aRow.cells[6]
					}
					}
					}
		var bidOnItemList = fsHelper.findNodes("//span[@findme='bidOnItem']");
		for (var i=0; i<bidOnItemList.length; i++) {
			bidOnItemItem = bidOnItemList[i];
			bidOnItemItem.addEventListener('click', fsHelper.bidOnItem, true);
		}
	},

	quickAuctionSearch: function(evt) {
		var searchText = evt.target.getAttribute("searchtext");
		GM_log(searchText);
		var searchInputTextField = fsHelper.findNode("//input[@name='search_text' and @class='custominput']");
		searchInputTextField.value = searchText;
		thisForm = searchInputTextField.form;
		thisForm.submit();
	},

	bidOnItem: function(evt) {
		var bidValue = evt.target.getAttribute("bidvalue");
		var auctionLink = evt.target.getAttribute("linkto");
		var textInput = fsHelper.findNode("//input[@id='" + auctionLink + "']");
		textInput.value = bidValue;
		thisForm = textInput.form;
		thisForm.submit();
	},

	insertAuctionGetItemDetails: function(itemId, invId, type, pid) {
		var theUrl = "fetchitem.php?item_id="+itemId+"&inv_id="+invId+"&t="+type+"&p="+pid /*+"&uid="+1220693678*/
		theUrl = fsHelper.getServer() + theUrl
		GM_xmlhttpRequest({
			method: 'GET',
			url: theUrl,
			headers: {
				"User-Agent" : navigator.userAgent,
				"Cookie" : document.cookie
			},
			onload: function(responseDetails) {
				var craft="";
				var responseText=responseDetails.responseText;
				if (responseText.search(/Uncrafted|Very Poor|Poor|Average|Good|Very Good|Excellent|Perfect/) != -1){
					var fontLineRE=/<\/b><\/font><br>([^<]+)<font color='(#[0-9A-F]{6})'>([^<]+)<\/font>/
					var fontLineRX=fontLineRE.exec(responseText)
					craft = fontLineRX[3];
				}
				var forgeCount=0, re=/hellforge\/forgelevel.gif/ig;

				while(re.exec(responseText)) {
					forgeCount++;
				}
				fsHelper.injectAuctionExtraText(invId,craft,forgeCount);
			}
		})
	},

	injectAuctionExtraText: function(invId, craft, forgeCount) {
		var imgserver = fsHelper.getImageServer();

		var allItems = document.getElementsByTagName("IMG");
		for (var i=0; i<allItems.length; i++) {
			anItem = allItems[i];
			if (anItem.src.search("items") != -1) {
				if (anItem.getAttribute("onmouseover").search(invId) != -1) {
					theText=anItem.parentNode.nextSibling.nextSibling;
					var preText = "<span style='color:blue'>" + craft + "</span>";
					if (forgeCount != 0) {
						preText +=  " " + forgeCount + "<img src='" + imgserver + "/hellforge/forgelevel.gif'>"
					}
					theText.innerHTML = preText + "<br>" + theText.innerHTML;
				}
			}
		}
	},

	injectDropItemsAuction: function() {
		//function to add links to all the items in the drop items list
		var itemName, itemInvId, theTextNode, newLink;
		var allItems=fsHelper.findNodes("//input[@type='checkbox']");
		for (var i=0; i<allItems.length; i++) {
			anItem = allItems[i];
			itemInvId = anItem.value;
			theTextNode = fsHelper.findNode("../../td[3]", anItem);
			itemName = theTextNode.innerHTML.replace(/\&nbsp;/i,"");
			theTextNode.innerHTML = "<a findme='AH' href='" + fsHelper.getServer() + "?cmd=auctionhouse&type=-1&search_text="
				+ escape(itemName)
				+ "'>[AH]</a> "
				+ "<a findme='Sell' href='" + fsHelper.getServer() + "index.php?cmd=auctionhouse&subcmd=create2&inv_id=" + itemInvId + "'>"
				+ "[Sell]</a> "
				+ theTextNode.innerHTML;

			//
			// newLink = document.createElement("a")
			// newLink.href="
			// newLink.textContent="[AH]" // Search for " + itemName + " in Auction House]"
			// window.alert(newLink);
			// theText.insertBefore(newLink, theText);
			// theText.textContent=" " + theText.textContent
			// theText.innerHTML += " <a href=http://www.fallensword.com/?cmd=auctionhouse&type=-1&search_text=" + escape(itemName) + "></a>"
		}
	},

	injectReportPaint: function() {
		var mainTable = fsHelper.findNode("//table[@width='600']");
		for (var i=0;i<mainTable.rows.length;i++) {
			var aRow = mainTable.rows[i];
			if (aRow.cells[1]) { // itemRow
				var itemCell = aRow.cells[1];
				var itemElement = itemCell.firstChild;
				var href = itemElement.getAttribute("href");
				//GM_log(href);
				var itemIDRE = /recall\&id=(\d+)/
				var itemID = itemIDRE.exec(href)[1];
				var playerIDRE = /player_id=(\d+)/
				var playerID = playerIDRE.exec(href)[1];
				//itemCell.title = itemID;
				//ajaxLoadItem(2758, 84063685, 1, 1346893 - report link
				//ajaxLoadItem(2758, 6569239, 4, 40769 - guild store link
				//unfortunately the itemID for the report link is different than the guild store link so you cannot script
				//grabbing items from the guild store easily with one click.
				itemCell.innerHTML += ' [ <span style="cursor:pointer; text-decoration:underline;" id="recallItem' + itemID + '" ' +
					'itemID="' + itemID + '" ' +
					'playerID="' + playerID + '">Fast Recall</span> ]'
				document.getElementById('recallItem' + itemID).addEventListener('click', fsHelper.recallItem, true);
			}
		}

		//Get the list of online members
		var memberList = fsHelper.getValueJSON("memberlist");

		var injectHere, searchString;
		for (var i=0;i<memberList.members.length;i++) {
			var member=memberList.members[i];
			if (member.status=="Online") {
				var player=fsHelper.findNode("//b[contains(., '" + member.name + "')]");
				if (player) {
					player.innerHTML = "<span style='font-size:large; color:green;'>[Online]</span> <a href='" +
						fsHelper.getServer() + "index.php?cmd=profile&player_id=" + member.id + "'>" + player.innerHTML + "</a>";
					player.innerHTML += " [ <a href='index.php?cmd=message&target_player=" + member.name + ">m</a> ]";
				}
			}
			else {
				var player=fsHelper.findNode("//b[contains(., '" + member.name + "')]");
				if (player) {
					player.innerHTML = "<a href='" +
						fsHelper.getServer() + "index.php?cmd=profile&player_id=" + member.id + "'>" + player.innerHTML + "</a>";
				}
			}
		}
	},

	recallItem: function(evt) {
		var itemID=evt.target.getAttribute("itemID");
		var playerID=evt.target.getAttribute("playerID");
		GM_xmlhttpRequest({
			method: 'GET',
			url: fsHelper.getServer() + "index.php?cmd=guild&subcmd=inventory&subcmd2=recall&id=" + itemID + "&player_id=" + playerID,
			headers: {
				"User-Agent" : navigator.userAgent,
				"Cookie" : document.cookie
			},
			onload: function(responseDetails) {
				fsHelper.recallItemReturnMessage(responseDetails, itemID, evt.target);
			},
		})
	},

	recallItemReturnMessage: function(responseDetails, itemID, target) {
		var infoRE=/<center>INFORMATION<\/center><\/font><\/td><\/tr>\t+<tr><td><font size=2 color=\"\#000000\"><center>([^<]+)<\/center>/i;
		var info=responseDetails.responseText.match(infoRE)
		if (info) {info=info[1]} else {info=""};
		var itemCellElement = target.parentNode; //fsHelper.findNode("//td[@title='" + itemID + "']");
		if (info!="") {
			itemCellElement.innerHTML += " <span style='color:red; font-weight:bold;'>" + info + "</span>";
		} else {
			itemCellElement.innerHTML += " <span style='color:green; font-weight:bold;'>Item recalled</span>";
		}
	},

	injectDropItems: function() {
		var savedItems = fsHelper.getValueJSON("savedItems")
		var allItems = fsHelper.findNodes("//input[@type='checkbox']");
		for (var i=0; i<allItems.length; i++) {
			anItem = allItems[i];
			theLocation=anItem.parentNode.nextSibling.nextSibling;
			theImage=anItem.parentNode.nextSibling.firstChild.firstChild;
			var mouseOver=theImage.getAttribute("onmouseover");
			var reParams=/(\d+),\s*(\d+),\s*(\d+),\s*(\d+)/
			var reResult=reParams.exec(mouseOver);
			var itemId=reResult[1];
			var invId=reResult[2];
			var type=reResult[3];
			var pid=reResult[4];
			if (savedItems && savedItems.indexOf(itemId)>=0) {
				//
				fsHelper.injectDropItemsParse(savedItems(itemId).reponseText);
			}
			else {
				var theUrl = "fetchitem.php?item_id="+itemId+"&inv_id="+invId+"&t="+type+"&p="+pid /*+"&uid="+1220693678*/
				theUrl = fsHelper.getServer() + theUrl
				GM_xmlhttpRequest({
					method: 'GET',
					url: theUrl,
					callback: theImage,
					headers: {
						"User-Agent" : navigator.userAgent,
						"Cookie" : document.cookie
					},
					onload: function(responseDetails, callback) {
						fsHelper.injectDropItemsPaint(responseDetails, this.callback);
					}
				})
			}
		}
	},

	injectDropItemsPaint: function(responseDetails, callback) {
		var textNode = fsHelper.findNode("../../../td[3]", callback);
		var guildLockedRE = /<center>Guild Locked: <font color="#00FF00">/i;
		if (guildLockedRE.exec(responseDetails.responseText)) {
			var auctionHouseLink=fsHelper.findNode("a[@findme='AH']", textNode);
			var sellLink=fsHelper.findNode("a[@findme='Sell']", textNode);
			auctionHouseLink.style.visibility='hidden';
			sellLink.style.visibility='hidden';
		};
		if (GM_getValue("disableItemColoring")) return;
		var fontLineRE=/<center><font color='(#[0-9A-F]{6})' size=2>/i; // <b>[^<]+<\/b>/
		var fontLineRX=fontLineRE.exec(responseDetails.responseText)
		textNode.style.color=fontLineRX[1];
	},

	injectProfile: function() {
		var allLinks = document.getElementsByTagName("A");
		for (var i=0; i<allLinks.length; i++) {
			aLink=allLinks[i];
			if (aLink.href.search("cmd=guild&subcmd=view") != -1) {
				var guildIdResult = /guild_id=([0-9]+)/i.exec(aLink.href);
				if (guildIdResult) var guildId = parseInt(guildIdResult[1], 10);
				var warning = document.createElement('span');
				var color = "";
				var changeAppearance = true;
				var relationship = fsHelper.guildRelationship(aLink.text)
				switch (relationship) {
					case "self":
						var settings="guildSelfMessage";
						break;
					case "friendly":
						var settings="guildFrndMessage";
						break;
					case "old":
						var settings="guildPastMessage";
						break;
					case "enemy":
						var settings="guildEnmyMessage";
						break;
					default:
						changeAppearance = false;
				}
				if (changeAppearance) {
					var settingsAry=GM_getValue(settings).split("|");
					warning.innerHTML="<br/>" + settingsAry[1];
					color = settingsAry[0];
					aLink.parentNode.style.color=color;
					aLink.style.color=color;
					aLink.parentNode.insertBefore(warning, aLink.nextSibling);
				}
			}
		}

		var player = fsHelper.findNode("//textarea[@id='holdtext']");
		var avyrow = fsHelper.findNode("//img[contains(@title, 's Avatar')]");
		var playerid = document.URL.match(/\w*\d{5}\d*/)
		var idindex, newhtml, imgserver;

		if (player)
		{
			if (!playerid)
			{
				playerid = player.innerHTML;
				idindex = playerid.indexOf("?ref=") + 5;
				playerid = playerid.substr(idindex);
			}

			var playeravy = avyrow.parentNode.firstChild ;
			while ((playeravy.nodeType == 3)&&(!/\S/.test(playeravy.nodeValue)))
			{
				playeravy = playeravy.nextSibling ;
			}
			var playername = playeravy.getAttribute("title");
			playeravy.style.borderStyle="none";
			playername = playername.substr(0, playername.indexOf("'s Avatar"));

			imgserver = fsHelper.getImageServer();

			var auctiontext = "Go to " + playername + "'s auctions" ;
			var ranktext = "Rank " +playername + "" ;

			newhtml = avyrow.parentNode.innerHTML + "</td></tr><tr><td align='center' colspan='2'>" ;
			newhtml += "<a href='javaScript:quickBuff(" + playerid ;
			newhtml += ");'><img alt='Buff " + playername + "' title='Buff " + playername + "' src=" ;
			newhtml += imgserver + "/skin/realm/icon_action_quickbuff.gif></a>&nbsp;&nbsp;" ;
			newhtml += "<a href='" + fsHelper.getServer() + "index.php?cmd=guild&subcmd=groups&subcmd2=joinall" ;
			newhtml += "');'><img alt='Join All Groups' title='Join All Groups' src=" ;
			newhtml += imgserver + "/skin/icon_action_join.gif></a>&nbsp;&nbsp;" ;
			newhtml += "<a href=" + fsHelper.getServer() + "?cmd=auctionhouse&type=-3&tid=" ;
			newhtml += playerid + '><img alt="' + auctiontext + '" title="' + auctiontext + '" src=';
			newhtml += imgserver + "/skin/gold_button.gif></a>&nbsp;&nbsp;";
			if (relationship == "self" && GM_getValue("showAdmin")) {
				newhtml += "<a href='" + fsHelper.getServer() + "index.php?cmd=guild&subcmd=members&subcmd2=changerank&member_id=" ;
				newhtml += playerid + '><img alt="' + ranktext + '" title="' + ranktext + '" src=';
				newhtml += imgserver + "/guilds/" + guildId + "_mini.jpg></a>" ;
			}
			avyrow.parentNode.innerHTML = newhtml ;
		}
	},

	injectGroupStats: function() {
		var attackTitleElement = fsHelper.findNode("//table[@width='400']/tbody/tr/td[contains(.,'Attack:')]");
		attackValueElement = attackTitleElement.nextSibling;
		attackValueElement.innerHTML = "<table><tbody><tr><td style='color:blue;'>" + attackValueElement.innerHTML +
			"</td><td>(</td><td title='attackValue'>" + attackValueElement.innerHTML +
			"</td><td>)</td></tr></tbody></table>";
		var defenseTitleElement = fsHelper.findNode("//table[@width='400']/tbody/tr/td[contains(.,'Defense:')]");
		defenseValueElement = defenseTitleElement.nextSibling;
		defenseValueElement.innerHTML = "<table><tbody><tr><td style='color:blue;'>" + defenseValueElement.innerHTML +
			"</td><td>(</td><td title='defenseValue'>" + defenseValueElement.innerHTML +
			"</td><td>)</td></tr></tbody></table>";
		var armorTitleElement = fsHelper.findNode("//table[@width='400']/tbody/tr/td[contains(.,'Armor:')]");
		armorValueElement = armorTitleElement.nextSibling;
		armorValueElement.innerHTML = "<table><tbody><tr><td style='color:blue;'>" + armorValueElement.innerHTML +
			"</td><td>(</td><td title='armorValue'>" + armorValueElement.innerHTML +
			"</td><td>)</td></tr></tbody></table>";
		var damageTitleElement = fsHelper.findNode("//table[@width='400']/tbody/tr/td[contains(.,'Damage:')]");
		damageValueElement = damageTitleElement.nextSibling;
		damageValueElement.innerHTML = "<table><tbody><tr><td style='color:blue;'>" + damageValueElement.innerHTML +
			"</td><td>(</td><td title='damageValue'>" + damageValueElement.innerHTML +
			"</td><td>)</td></tr></tbody></table>";
		var hpTitleElement = fsHelper.findNode("//table[@width='400']/tbody/tr/td[contains(.,'HP:')]");
		hpValueElement = hpTitleElement.nextSibling;
		hpValueElement.innerHTML = "<table><tbody><tr><td style='color:blue;'>" + hpValueElement.innerHTML +
			"</td><td>(</td><td title='hpValue'>" + hpValueElement.innerHTML +
			"</td><td>)</td></tr></tbody></table>";
		GM_xmlhttpRequest({
			method: 'GET',
			url: fsHelper.getServer() + "index.php?cmd=guild&subcmd=mercs",
			headers: {
				"User-Agent" : navigator.userAgent,
				"Cookie" : document.cookie
			},
			onload: function(responseDetails) {
				fsHelper.parseMercStats(responseDetails.responseText);
			},
		})
	},

	parseMercStats: function(responseText) {
		var mercPage=fsHelper.createDocument(responseText);
		var mercElements = mercPage.getElementsByTagName("IMG");
		var totalMercAttack = 0;
		var totalMercDefense = 0;
		var totalMercArmor = 0;
		var totalMercDamage = 0;
		var totalMercHP = 0;
		for (var i=0; i<mercElements.length; i++) {
			merc = mercElements[i];
			var mouseoverText = merc.getAttribute("onmouseover")
			var src = merc.getAttribute("src")
			if (mouseoverText && src.search("/merc/") != -1){
				//<td>Attack:</td><td>1919</td>
				var attackRE=/<td>Attack:<\/td><td>(\d+)<\/td>/;
				var mercAttackValue = attackRE.exec(mouseoverText)[1]*1;
				totalMercAttack += mercAttackValue;
				var defenseRE=/<td>Defense:<\/td><td>(\d+)<\/td>/;
				var mercDefenseValue = defenseRE.exec(mouseoverText)[1]*1;
				totalMercDefense += mercDefenseValue;
				var armorRE=/<td>Armor:<\/td><td>(\d+)<\/td>/;
				var mercArmorValue = armorRE.exec(mouseoverText)[1]*1;
				totalMercArmor += mercArmorValue;
				var damageRE=/<td>Damage:<\/td><td>(\d+)<\/td>/;
				var mercDamageValue = damageRE.exec(mouseoverText)[1]*1;
				totalMercDamage += mercDamageValue;
				var hpRE=/<td>HP:<\/td><td>(\d+)<\/td>/;
				var mercHPValue = hpRE.exec(mouseoverText)[1]*1;
				totalMercHP += mercHPValue;
			}
		}
		var attackValue = fsHelper.findNode("//td[@title='attackValue']");
		attackNumber=attackValue.innerHTML.replace(/,/,"")*1;
		attackValue.innerHTML = fsHelper.addCommas(attackNumber - Math.round(totalMercAttack*0.2));
		var defenseValue = fsHelper.findNode("//td[@title='defenseValue']");
		defenseNumber=defenseValue.innerHTML.replace(/,/,"")*1;
		defenseValue.innerHTML = fsHelper.addCommas(defenseNumber - Math.round(totalMercDefense*0.2));
		var armorValue = fsHelper.findNode("//td[@title='armorValue']");
		armorNumber=armorValue.innerHTML.replace(/,/,"")*1;
		armorValue.innerHTML = fsHelper.addCommas(armorNumber - Math.round(totalMercArmor*0.2));
		var damageValue = fsHelper.findNode("//td[@title='damageValue']");
		damageNumber=damageValue.innerHTML.replace(/,/,"")*1;
		damageValue.innerHTML = fsHelper.addCommas(damageNumber - Math.round(totalMercDamage*0.2));
		var hpValue = fsHelper.findNode("//td[@title='hpValue']");
		hpNumber=hpValue.innerHTML.replace(/,/,"")*1;
		hpValue.innerHTML = fsHelper.addCommas(hpNumber - Math.round(totalMercHP*0.2));
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

	injectGroups: function() {
		allItems = fsHelper.findNodes("//tr[td/a/img/@title='View Group Stats']");
		var memberList=fsHelper.getValueJSON("memberlist");
		// window.alert(typeof(memberList.members));
		// memberList.lookupByName.find
		for (i=0; i<allItems.length; i++) {
			var theItem=allItems[i].cells[0];
			var foundName=theItem.textContent;
			for (j=0; j<memberList.members.length; j++) {
				var aMember=memberList.members[j];
				// I hate doing two loops, but using a hashtable implementation I found crashed my browser...
				if (aMember.name==foundName) {
					theItem.innerHTML = "<span style='font-size:small; " + ((aMember.status == "Online")?"color:green;":"") + "'>" + theItem.innerHTML + "</span> [" + aMember.level + "]";
				}
			}
		}
		var buttonElement = fsHelper.findNode("//td[input[@value='Join All Available Groups']]");
		buttonElement.innerHTML += '&nbsp;<input id="fetchgroupstats" type="button" value="Fetch Group Stats" class="custombutton">';

		document.getElementById('fetchgroupstats').addEventListener('click', fsHelper.fetchGroupData, true);

	},

	fetchGroupData: function(evt) {
		var allItems = fsHelper.findNodes("//img[@title='View Group Stats']");
		for (var i=0; i<allItems.length; i++) {
			anItem = allItems[i];
			var href = anItem.parentNode.getAttribute("href");
			fsHelper.retrieveGroupData(href, anItem.parentNode);
		}
	},

	retrieveGroupData: function(href, link) {
		GM_xmlhttpRequest({
			method: 'GET',
			url: fsHelper.getServer() + href,
			callback: link,
			headers: {
				"User-Agent" : navigator.userAgent,
				"Cookie" : document.cookie
			},
			onload: function(responseDetails) {
				fsHelper.parseGroupData(responseDetails.responseText, this.callback);
			},
		})
	},

	parseGroupData: function(responseText, linkElement) {
		var doc=fsHelper.createDocument(responseText);
		var doc=fsHelper.createDocument(responseText)
		var allItems = doc.getElementsByTagName("TD")
		//<td><font color="#333333">Attack:&nbsp;</font></td>

		for (var i=0;i<allItems.length;i++) {
			var anItem=allItems[i];
			if (anItem.innerHTML == '<font color="#333333">Attack:&nbsp;</font>'){
				var attackLocation = anItem.nextSibling;
				var attackValue = attackLocation.textContent;
			}
			if (anItem.innerHTML == '<font color="#333333">Defense:&nbsp;</font>'){
				var defenseLocation = anItem.nextSibling;
				var defenseValue = defenseLocation.textContent;
			}
			if (anItem.innerHTML == '<font color="#333333">Armor:&nbsp;</font>'){
				var armorLocation = anItem.nextSibling;
				var armorValue = armorLocation.textContent;
			}
			if (anItem.innerHTML == '<font color="#333333">Damage:&nbsp;</font>'){
				var damageLocation = anItem.nextSibling;
				var damageValue = damageLocation.textContent;
			}
			if (anItem.innerHTML == '<font color="#333333">HP:&nbsp;</font>'){
				var hpLocation = anItem.nextSibling;
				var hpValue = hpLocation.textContent;
			}
		}
		extraText = "<table cellpadding='1' style='font-size:x-small; border-top:2px black solid; border-spacing: 1px; border-collapse: collapse;'>"
		extraText += "<tr>";
		extraText += "<td style='color:brown;'>Attack</td><td align='right'>" + attackValue + "</td>";
		extraText += "<td style='color:brown;'>Defense</td><td align='right'>" + defenseValue + "</td></tr>";
		extraText += "<tr>";
		extraText += "<td style='color:brown;'>Armor</td><td align='right'>" + armorValue + "</td>";
		extraText += "<td style='color:brown;'>Damage</td><td align='right'>" + damageValue + "</td></tr>";
		extraText += "<tr>";
		extraText += "<td style='color:brown;'>HP</td><td align='right'>" + hpValue + "</td>";
		extraText += "<td colspan='2'></td></tr>";
		extraText += "</table>";
		expiresLocation = linkElement.parentNode.previousSibling.previousSibling;
		expiresLocation.innerHTML += extraText;
	},

	addMarketplaceWidgets: function() {
		var requestTable = fsHelper.findNode("//table[tbody/tr/td/input[@value='Confirm Request']]");
		var newRow = requestTable.insertRow(2);
		var newCell = newRow.insertCell(0);
		newCell.id = "warningfield";
		newCell.colSpan = "2";
		newCell.align = "center";

		document.getElementById('price').addEventListener('keyup', fsHelper.addMarketplaceWarning, true);
	},

	addMarketplaceWarning: function(evt) {
		 var goldPerPoint = fsHelper.findNode("//input[@id='price']");
		 var warningField = fsHelper.findNode("//td[@id='warningfield']");
		 var sellPrice = goldPerPoint.value;
		 if (sellPrice.search(/^[0-9]*$/) != -1) {
			var warningColor = "green";
			var warningText = "</b><br>This is probably an offer that will please someone.";
			if (sellPrice < 100000) {
				warningColor = "brown";
				var warningText = "</b><br>This is too low ... it just ain't gonna sell.";
			} else if (sellPrice > 110000) {
				warningColor = "red";
				var warningText = "</b><br>Hold up there ... this is way to high a price ... you should reconsider.";
			}
			warningField.innerHTML = "<span style='color:" + warningColor + ";'>You are offering to buy FSP for >> <b>" + fsHelper.addCommas(sellPrice) + warningText + "</span>";
		}
	},

	toggleVisibilty: function(evt) {
		var anItemId=evt.target.getAttribute("linkto")
		var anItem=document.getElementById(anItemId);
		var currentVisibility=anItem.style.visibility;
		anItem.style.visibility=(currentVisibility=="hidden")?"visible":"hidden";
		anItem.style.display=(currentVisibility=="hidden")?"block":"none";
		if (GM_getValue(anItemId)) {
			GM_setValue(anItemId, "");
		} else{
			GM_setValue(anItemId, "ON");
		}
	},

	injectSettingsGuildData: function(guildType) {
		var result='';
		result += '<input name="guild' + guildType + '" size="60" value="' + GM_getValue("guild" + guildType) + '">'
		result += '<span style="cursor:pointer;cursor:hand;text-decoration:none;" id="toggleShowGuild' + guildType + 'Message" linkto="showGuild' + guildType + 'Message"> &#x00bb;</span>'
		result += '<div id="showGuild' + guildType + 'Message" style="visibility:hidden;display:none">'
		result += '<input name="guild' + guildType + 'Message" size="60" value="' + GM_getValue("guild" + guildType + "Message") + '">'
		result += '</div>'
		return result;
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

	injectSettings: function() {
		if (!GM_getValue("guildSelf")) {GM_setValue("guildSelf", "")}
		if (!GM_getValue("guildFrnd")) {GM_setValue("guildFrnd", "")}
		if (!GM_getValue("guildPast")) {GM_setValue("guildPast", "")}
		if (!GM_getValue("guildEnmy")) {GM_setValue("guildEnmy", "")}
		if (!GM_getValue("guildSelfMessage")) {GM_setValue("guildSelfMessage", "green|Member of your own guild")}
		if (!GM_getValue("guildFrndMessage")) {GM_setValue("guildFrndMessage", "yellow|Do not attack - Guild is friendly!")}
		if (!GM_getValue("guildPastMessage")) {GM_setValue("guildPastMessage", "gray|Do not attack - You've been in that guild once!")}
		if (!GM_getValue("guildEnmyMessage")) {GM_setValue("guildEnmyMessage", "red|Enemy guild. Attack at will!")}
		if (!GM_getValue("killAllAdvanced")) {GM_setValue("killAllAdvanced", "off")}
		var lastCheck=new Date(parseInt(GM_getValue("lastVersionCheck")))
		var buffs=GM_getValue("huntingBuffs")
		if (!buffs) {
			var buffs="Doubler,Librarian,Adept Learner,Merchant,Treasure Hunter,Animal Magnetism,Conserve"
		}

		var configData=
			'<form><table width="100%" cellspacing="0" cellpadding="5" border="0">' +
			'<tr><td colspan="4" height="1" bgcolor="#333333"></td></tr>' +
			'<tr><td colspan="4"><b>Fallen Sword Helper configuration</b></td></tr>' +
			'<tr><td colspan="4" align=center><input type="button" class="custombutton" value="Check for updates" id="fsHelperCheckUpdate"></td></tr>'+
			'<tr><td colspan="4" align=center><span style="font-size:xx-small">(Current version: ' + GM_getValue("currentVersion") + ', Last check: ' + fsHelper.formatDateTime(lastCheck) +
			')</span></td></tr>' +
			'<tr><td colspan="4" align="left"><b>Enter guild names, seperated by commas</td></tr>' +
			'<tr><td>Own Guild</td><td colspan="3">'+ fsHelper.injectSettingsGuildData("Self") + '</td></tr>' +
			'<tr><td>Friendly Guilds</td><td colspan="3">'+ fsHelper.injectSettingsGuildData("Frnd") + '</td></tr>' +
			'<tr><td>Old Guilds</td><td colspan="3">'+ fsHelper.injectSettingsGuildData("Past") + '</td></tr>' +
			'<tr><td>Enemy Guilds</td><td colspan="3">'+ fsHelper.injectSettingsGuildData("Enmy") + '</td></tr>' +
			'<tr><th colspan="4" align="left">Other preferences</th></tr>' +
			'<tr><td align="right">Auto Kill Style' + fsHelper.helpLink('Auto Kill Style', '<b><u>single</u></b> will fast kill a single monster<br>' +
				'<u><b>type</b></u> will fast kill a type of monster<br><u><b>all</b></u> will kill all monsters as you move into the square<br><u><b>off</b></u> returns control to game normal.' +
				'<br><br><b>CAUTION</b>: If this is set to <u><b>all</b></u> then while you are moving around the world it will automatically kill all the non-elite monsters on the square you move in to.') +
				':</td><td><table><tbody>' +
				'<tr><td><input type="radio" name="killAllAdvanced" value="off"' + ((GM_getValue("killAllAdvanced") == "off")?" checked":"") + '>off</td>' +
				'<td><input type="radio" name="killAllAdvanced"  value="single"' + ((GM_getValue("killAllAdvanced") == "single")?" checked":"") + '>single</td></tr>'+
				'<tr><td><input type="radio" name="killAllAdvanced"  value="type"' + ((GM_getValue("killAllAdvanced") == "type")?" checked":"") + '>type</td>' +
				'<td><input type="radio" name="killAllAdvanced"  value="all"' + ((GM_getValue("killAllAdvanced") == "all")?" checked":"") + '>all</td></tr>' +
				'</tbody></table></td>' +
			'<td align="right">Hide Top Banner' + fsHelper.helpLink('Hide Top Banner', 'Pretty simple ... it just hides the top banner') +
				':</td><td><input name="hideBanner" type="checkbox" value="on"' + (GM_getValue("hideBanner")?" checked":"") + '></td></tr>' +
			'<tr><td align="right">Show Administrative Options' + fsHelper.helpLink('Show Admininstrative Options', 'Show ranking controls in guild managemenet page - this works for guild founders only') +
				':</td><td><input name="showAdmin" type="checkbox" value="on"' + (GM_getValue("showAdmin")?" checked":"") + '></td>' +
			'<td align="right">Dim Non Player<br/>Guild Log Messages' + fsHelper.helpLink('Dim Non Player Guild Log Messages', 'Any log messages not related to the current player will be dimmed (e.g. recall messages from guild store)') +
				':</td><td><input name="hideNonPlayerGuildLogMessages" type="checkbox" value="on"' + (GM_getValue("hideNonPlayerGuildLogMessages")?" checked":"") + '></td></td></tr>' +
			'<tr><td align="right">Disable Item Coloring' + fsHelper.helpLink('Disable Item Coloring', 'Disable the code that colors the item text based on the rarity of the item.') +
				':</td><td><input name="disableItemColoring" type="checkbox" value="on"' + (GM_getValue("disableItemColoring")?" checked":"") + '></td>' +
			'<td align="right">Enable Log Coloring' + fsHelper.helpLink('Enable Log Coloring', 'Three logs will be colored if this is enabled, Guild Chat, Guild Log and Player Log. It will show any new messages in yellow and anything 20 minutes old ones in brown.') +
				':</td><td><input name="enableLogColoring" type="checkbox" value="on"' + (GM_getValue("enableLogColoring")?" checked":"") + '></td></td></tr>' +
			'<tr><td align="right">Show Completed Quests' + fsHelper.helpLink('Show Completed Quests', 'This will show completed quests that have been hidden.') +
				':</td><td><input name="showCompletedQuests" type="checkbox" value="on"' + (GM_getValue("showCompletedQuests")?" checked":"") + '></td>' +
			'<td align="right">Show chat lines' + fsHelper.helpLink('Chat lines', 'Display the last {n} lines from guild chat (set to 0 to disable).') +
				':</td><td><input name="chatLines" size="3" value="' + GM_getValue("chatLines") + '"></td></tr>' +
			'<tr><td align="right">Show Combat Log' + fsHelper.helpLink('Show Combat Log', 'This will show the combat log for each automatic battle below the monster list.') +
				':</td><td><input name="showCombatLog" type="checkbox" value="on"' + (GM_getValue("showCombatLog")?" checked":"") + '></td>' +
			'<td align="right">Show Creature Info' + fsHelper.helpLink('Show Creature Info', 'This will show the information from the view creature link when you mouseover the link') +
				':</td><td><input name="showCreatureInfo" type="checkbox" value="on"' + (GM_getValue("showCreatureInfo")?" checked":"") + '></td></tr>' +
			//save button
			'<tr><td align="right">Hunting Buffs' + fsHelper.helpLink('Hunting Buffs', 'Customize which buffs are designated as hunting buffs. You must type the full name of each buff, separated by commas') +
				':</td><td colspan="3"><input name="huntingBuffs" size="60" value="'+ buffs + '" /></td></tr>' +
			'<tr><td colspan="4" align=center><input type="button" class="custombutton" value="Save" id="fsHelperSaveOptions"></td></tr>' +
			'<tr><td colspan="4" align=center>' +
			'<span style="font-size:xx-small">Fallen Sword Helper was coded by <a href="' + fsHelper.getServer() + 'index.php?cmd=profile&player_id=1393340">Coccinella</a>, ' +
			'with valuable contributions by <a href="' + fsHelper.getServer() + 'index.php?cmd=profile&player_id=1346893">Tangtop</a>, '+
			'<a href="' + fsHelper.getServer() + 'index.php?cmd=profile&player_id=524660">Nabalac</a>, ' +
			'<a href="' + fsHelper.getServer() + 'index.php?cmd=profile&player_id=1570854">jesiegel</a><span></td></tr>' +
			'<tr><td colspan="4" align=center>' +
			'<span style="font-size:xx-small">Visit the <a href="http://code.google.com/p/fallenswordhelper/">Fallen Sword Helper web site</a> ' +
			'for any suggestions or bug reports<span></td></tr>' +
			'</table></form>';
		var insertHere = fsHelper.findNode("//table[@width='100%']");
		var newRow=insertHere.insertRow(insertHere.rows.length);
		var newCell=newRow.insertCell(0);
		newCell.colSpan=3;
		newCell.innerHTML=configData;
		// insertHere.insertBefore(configData, insertHere);
		document.getElementById('fsHelperSaveOptions').addEventListener('click', fsHelper.saveConfig, true);
		document.getElementById('fsHelperCheckUpdate').addEventListener('click', fsHelper.checkForUpdate, true);

		document.getElementById('toggleShowGuildSelfMessage').addEventListener('click', fsHelper.toggleVisibilty, true);
		document.getElementById('toggleShowGuildFrndMessage').addEventListener('click', fsHelper.toggleVisibilty, true);
		document.getElementById('toggleShowGuildPastMessage').addEventListener('click', fsHelper.toggleVisibilty, true);
		document.getElementById('toggleShowGuildEnmyMessage').addEventListener('click', fsHelper.toggleVisibilty, true);
	},

	helpLink: function(title, text) {
		return ' [ ' +
			'<span style="text-decoration:underline;cursor:pointer;cursor:hand;" onmouseover="Tip(\'' +
			'<span style=\\\'font-weight:bold; color:#FFF380;\\\'>' + title + '</span><br /><br />' +
			text + '\');">?</span>' +
			' ]'
	},

	saveConfig: function(evt) {
		var oForm=evt.target.form;
		fsHelper.saveValueForm(oForm, "guildSelf");
		fsHelper.saveValueForm(oForm, "guildFrnd");
		fsHelper.saveValueForm(oForm, "guildPast");
		fsHelper.saveValueForm(oForm, "guildEnmy");
		fsHelper.saveValueForm(oForm, "guildSelfMessage");
		fsHelper.saveValueForm(oForm, "guildFrndMessage");
		fsHelper.saveValueForm(oForm, "guildPastMessage");
		fsHelper.saveValueForm(oForm, "guildEnmyMessage");
		fsHelper.saveValueForm(oForm, "chatLines");
		fsHelper.saveValueForm(oForm, "showAdmin");
		fsHelper.saveValueForm(oForm, "disableItemColoring");
		fsHelper.saveValueForm(oForm, "enableLogColoring");
		fsHelper.saveValueForm(oForm, "showCompletedQuests");
		fsHelper.saveValueForm(oForm, "hideNonPlayerGuildLogMessages");
		fsHelper.saveValueForm(oForm, "hideBanner");
		fsHelper.saveValueForm(oForm, "showCombatLog");
		fsHelper.saveValueForm(oForm, "showCreatureInfo");

		fsHelper.saveValueForm(oForm, "killAllAdvanced");
		fsHelper.saveValueForm(oForm, "huntingBuffs");

		window.alert("FS Helper Settings Saved");
		return false;
	},

	guildRelationship: function(txt) {
		var guildSelf = GM_getValue("guildSelf");
		var guildFrnd = GM_getValue("guildFrnd");
		var guildPast = GM_getValue("guildPast");
		var guildEnmy = GM_getValue("guildEnmy");
		if (!guildSelf) {
			guildSelf="";
			GM_setValue("guildSelf", guildSelf);
		}
		if (!guildFrnd) {
			guildFrnd="";
			GM_setValue("guildFrnd", guildFrnd);
		}
		if (!guildPast) {
			guildPast="";
			GM_setValue("guildPast", guildPast);
		}
		if (!guildEnmy) {
			guildEnmy="";
			GM_setValue("guildEnmy", guildEnmy);
		}
		guildSelf=guildSelf.toLowerCase().replace(/\s*,\s*/,",").split(",");
		guildFrnd=guildFrnd.toLowerCase().replace(/\s*,\s*/,",").split(",");
		guildPast=guildPast.toLowerCase().replace(/\s*,\s*/,",").split(",");
		guildEnmy=guildEnmy.toLowerCase().replace(/\s*,\s*/,",").split(",");
		if (guildSelf.indexOf(txt.toLowerCase())!=-1) return "self";
		if (guildFrnd.indexOf(txt.toLowerCase())!=-1) return "friendly";
		if (guildPast.indexOf(txt.toLowerCase())!=-1) return "old";
		if (guildEnmy.indexOf(txt.toLowerCase())!=-1) return "enemy";
		return "";
	}
};


/*
    http://www.JSON.org/json2.js
    2008-09-01

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html

    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the object holding the key.

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be used to
            select the members to be serialized. It filters the results such
            that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.

    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.
*/

/*jslint evil: true */

/*global JSON */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", call,
    charCodeAt, getUTCDate, getUTCFullYear, getUTCHours, getUTCMinutes,
    getUTCMonth, getUTCSeconds, hasOwnProperty, join, lastIndex, length,
    parse, propertyIsEnumerable, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/

// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (!this.JSON) {
    JSON = {};
}
(function () {

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return this.getUTCFullYear()   + '-' +
                 f(this.getUTCMonth() + 1) + '-' +
                 f(this.getUTCDate())      + 'T' +
                 f(this.getUTCHours())     + ':' +
                 f(this.getUTCMinutes())   + ':' +
                 f(this.getUTCSeconds())   + 'Z';
        };

        String.prototype.toJSON =
        Number.prototype.toJSON =
        Boolean.prototype.toJSON = function (key) {
            return this.valueOf();
        };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapeable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapeable.lastIndex = 0;
        return escapeable.test(string) ?
            '"' + string.replace(escapeable, function (a) {
                var c = meta[a];
                if (typeof c === 'string') {
                    return c;
                }
                return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' :
            '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// If the object has a dontEnum length property, we'll treat it as an array.

            if (typeof value.length === 'number' &&
                    !value.propertyIsEnumerable('length')) {

// The object is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0 ? '[]' :
                    gap ? '[\n' + gap +
                            partial.join(',\n' + gap) + '\n' +
                                mind + ']' :
                          '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === 'string') {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0 ? '{}' :
                gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                        mind + '}' : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                     typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/.
test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
})();

fsHelper.onPageLoad(null);
