// ==UserScript==
// @name           SigmaStormHelper
// @namespace      terrasoft.gr
// @description    Sigma Storm Helper
// @include        http://sigmastorm2.com/*
// @include        http://*.sigmastorm2.com/*
// @exclude        http://sigmastorm2.com/areachat.php
// @exclude        http://*.sigmastorm2.com/areachat.php
// @exclude        http://forum.sigmastorm2.com/*
// @exclude        http://wiki.sigmastorm2.com/*
// @require        json2.js
// @require        calfSystem.js
// @require        ssLayout.js
// @require        ssData.js
// ==/UserScript==

// No warranty expressed or implied. Use at your own risk.

var Helper = {
	// System functions
	init: function(e) {
		Helper.initSettings();
		Helper.beginAutoUpdate();
		Helper.readInfo();
		this.initialized = true;
	},

	initSettings: function() {
		System.setDefault("enableLogColoring", true);
		System.setDefault("showCombatLog", true);
		System.setDefault("showCreatureInfo", true);
		System.setDefault("keepLogs", false);

		System.setDefault("showCompletedQuests", true);
		System.setDefault("showExtraLinks", true);
		System.setDefault("huntingBuffs", "Data Processor, Researcher");
		System.setDefault("showHuntingBuffs", true);
		System.setDefault("moveFSBox", false);
		System.setDefault("hideNewBox", false);

		System.setDefault("guildSelf", "");
		System.setDefault("guildFrnd", "");
		System.setDefault("guildPast", "");
		System.setDefault("guildEnmy", "");
		System.setDefault("guildSelfMessage", "green|Member of your own faction");
		System.setDefault("guildFrndMessage", "yellow|Do not attack - Faction is friendly!");
		System.setDefault("guildPastMessage", "gray|Do not attack - You've been in that faction once!");
		System.setDefault("guildEnmyMessage", "red|Enemy faction. Attack at will!");
		System.setDefault("killAllAdvanced", "off");
		System.setDefault("showQuickKillOnWorld", true);
		System.setDefault("hideKrulPortal", false);
		System.setDefault("hideQuests", false);
		System.setDefault("hideQuestNames", "");
		System.setDefault("hideRecipes", false);
		System.setDefault("hideRecipeNames", "");
		System.setDefault("footprintsColor", "silver");
		System.setDefault("chatTopToBottom", true);
		System.setDefault("enableGuildOnlineList", true);
		System.setDefault("guildOnlineRefreshTime", 15);

	},

	readInfo: function() {
		var charInfo = System.findNode("//img[contains(@src,'skin/quicklinks/4.gif')]");
		if (!charInfo) {return;}
		var charInfoText = charInfo.getAttribute("onmouseover");
		Helper.characterName =    charInfoText.match(/Name:\s*<\/td><td width=\\\'90%\\\'>([0-9a-z]+)/i)[1];
		Helper.characterLevel =   System.getIntFromRegExp(charInfoText, /Level:\s*<\/td><td width=\\\'90%\\\'>(\d+)/i);
		Helper.characterAttack =  System.getIntFromRegExp(charInfoText, /Attack:\s*<\/td><td width=\\\'90%\\\'>(\d+)/i);
		Helper.characterDefense = System.getIntFromRegExp(charInfoText, /Defense:\s*<\/td><td width=\\\'90%\\\'>(\d+)/i);
		var rxHitPoints = charInfoText.match(/HP:\s*<\/td><td width=\\\'90%\\\'>(\d+)\s*\/\s*(\d+)/i)
		Helper.characterHP    = parseInt(rxHitPoints[1]);
		Helper.characterMaxHP = parseInt(rxHitPoints[2]);
		Helper.characterArmor    = System.getIntFromRegExp(charInfoText, /Armor:\s*<\/td><td width=\\\'90%\\\'>(\d+)/i);
		Helper.characterDamage   = System.getIntFromRegExp(charInfoText, /Damage:\s*<\/td><td width=\\\'90%\\\'>(\d+)/i);
		var charClassNode = System.findNode("//img[contains(@src,'sigma2/skin/classes/')]");
		var charClasses = ["", "Mutant", "Soldier", "Purist", "Cyborg"];
		Helper.characterClass = charClasses[parseInt(charClassNode.src.substr(charClassNode.src.length-5,1))];
	},

	// Autoupdate
	beginAutoUpdate: function() {
		var lastCheck=GM_getValue("lastVersionCheck");
		var now=(new Date()).getTime();
		if (!lastCheck) lastCheck=0;
		var haveToCheck=((now - lastCheck) > 6*60*60*1000)
		if (haveToCheck) {
			Helper.checkForUpdate();
		}
	},

	checkForUpdate: function() {
		GM_log("Checking for new version...")
		var now=(new Date()).getTime();
		GM_setValue("lastVersionCheck", now.toString());
		GM_xmlhttpRequest({
			method: 'GET',
			url: "http://fallenswordhelper.googlecode.com/svn/trunk/?nonce="+now,
			headers: {
				"User-Agent" : navigator.userAgent,
				"Referer": document.location
			},
			onload: function(responseDetails) {
				Helper.autoUpdate(responseDetails);
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
		var latestVersion=responseDetails.responseText.match(versionRE)[1];
		GM_log("Current version: " + currentVersion);
		GM_log("Found version: " + latestVersion);

		if (currentVersion!=latestVersion) {
			GM_xmlhttpRequest({
				method: 'GET',
				url: "http://fallenswordhelper.googlecode.com/svn/wiki/ChangeLog.wiki?nonce="+now,
				headers: {
					"User-Agent" : navigator.userAgent,
					"Referer": document.location
				},
				onload: function(responseDetails) {
					Helper.autoUpdateConfirm(responseDetails, currentVersion, latestVersion);
				},
			})
		}
	},

	autoUpdateConfirm: function(responseDetails, oldVersion, newVersion) {
		var theChanges=Layout.formatWiki(responseDetails.responseText, oldVersion, newVersion);
		var confirmAlert = document.createElement("DIV");
		confirmAlert.id = 'Helper:ConfirmAlert';
		var divHeight = window.innerHeight-160;
		confirmAlert.style.position = "absolute";
		confirmAlert.style.left = (window.innerWidth - 500)/2 + "px";
		confirmAlert.style.top = (80+window.scrollY) + "px";
		confirmAlert.style.width = "500px";
		confirmAlert.style.height = divHeight + "px";
		confirmAlert.style.display = 'block';
		confirmAlert.style.zIndex = '90';
		confirmAlert.style.filter = 'alpha';
		confirmAlert.style.opacity = '0.7';
		confirmAlert.style.background = 'black';
		confirmAlert.style.color = 'white';
		confirmAlert.style.border = 'ridge';
		confirmAlert.innerHTML = '<div height="20" style="background-color:#4a3918;">' +
			'<div style="color:yellow;position:absolute;top:0px;left:0px">New version (' + newVersion + ') found. Update from version ' + oldVersion + '?' +
			'</div><div style="position:absolute;top:0px;right:0px">' +
			'<input type="button" id="Helper:AutoUpdateOk" value="Ok" class="custombutton">' +
			'&nbsp;<input type="button" id="Helper:AutoUpdateCancel" value="Cancel" class="custombutton"></div></div>' +
			'<div style="margin-top:20px;height:' + (divHeight-20) + 'px;overflow:auto;">' + theChanges + '</div>';
		document.body.insertBefore(confirmAlert, document.body.firstChild);
		document.getElementById("Helper:AutoUpdateOk").addEventListener("click", Helper.autoUpdateConfirmOk, true);
		document.getElementById("Helper:AutoUpdateOk").setAttribute("newVersion", newVersion);
		document.getElementById("Helper:AutoUpdateCancel").addEventListener("click", Helper.autoUpdateConfirmCancel, true);
	},

	autoUpdateConfirmOk: function(evt) {
		var newVersion=parseInt(evt.target.getAttribute("newVersion"));
		GM_setValue("currentVersion", newVersion);
		Helper.autoUpdatePreloadFiles(null, ["json2.js", "calfSystem.js", "fsLayout.js", "fsData.js"]);
	},
	autoUpdateConfirmCancel: function(evt) {
		var confirmAlert=document.getElementById("Helper:ConfirmAlert");
		confirmAlert.style.display="none";
		confirmAlert.visibility="hidden";
	},
	autoUpdatePreloadFiles: function(responseDetails, scriptArray) {
		if (responseDetails) {
			GM_log("Status = " + responseDetails.status)
		}
		else {
			GM_log("Preloading scripts...");
		}
		if (scriptArray.length==0) {
			GM_log("Done preloading, opening install dialog.");
			GM_openInTab("http://fallenswordhelper.googlecode.com/svn/trunk/sigmastormhelper.user.js");
			return;
		}
		var scriptName=scriptArray.shift();
		GM_log("Loading " + scriptName);
		GM_xmlhttpRequest({
			method: 'GET',
			url: "http://fallenswordhelper.googlecode.com/svn/trunk/" + scriptName,
			headers: {
				"User-Agent" : navigator.userAgent,
				"Referer": document.location,
				"If-Modified-Since": new Date()
			},
			onload: function(responseDetails) {
				Helper.autoUpdatePreloadFiles(responseDetails, scriptArray);
			},
		})
	},

	// main event dispatcher
	onPageLoad: function(anEvent) {
		Helper.init();

		Layout.moveFSBox();
		Helper.prepareGuildList();
		Helper.prepareChat();
		Helper.injectStaminaCalculator();
		Helper.injectLevelupCalculator();
		Layout.injectMenu();
		Layout.hideNewBox();
		Helper.replaceKeyHandler();
		Helper.injectWorldWidgets();

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

		Helper.page = pageId + "/" + subPageId + "/" + subPage2Id + "(" + subsequentPageId + ")"
		if (Helper.debug) GM_log(Helper.page);

		switch (pageId) {
		case "settings":
			Helper.injectSettings();
			break;
		case "world":
			switch (subPageId) {
			case "viewcreature":
				Helper.injectCreature();
				break;
			case "map":
				Helper.injectWorldMap();
				break;
			default:
				Helper.injectWorld();
			}
			break;
		case "news":
			switch (subPageId) {
				case "fsbox":
					Helper.injectShoutboxWidgets('fsbox_input', 100);
					break;
				case "shoutbox":
					Helper.injectShoutboxWidgets('shoutbox_input', 150);
					break;
			}
			break;
		case "blacksmith":
			switch (subPageId) {
			case "repairall":
				Helper.injectWorld();
				break;
			}
			break;
		case "arena":
			switch (subPageId) {
			case "-":
				Helper.injectArena();
				break;
			}
			break;
		case "questbook":
			switch(subsequentPageId) {
			case "-":
				Helper.injectQuestBookLite();
				break;
			}
			Helper.injectQuestBookFull();
			break;
		case "profile":
			switch (subPageId) {
			case "dropitems":
				Helper.injectDropItems();
				break;
			case "changebio":
				Helper.injectBioWidgets();
				break;
			case "-":
				Helper.injectProfile();
			}
			break;
		case "auctionhouse":
			switch (subPageId) {
			case "create":
				break;
			case "preferences":
				break;
			default:
				Helper.injectAuctionHouse();
			}
			break;
		case "guild":
			switch(subPageId) {
			case "inventory":
				switch(subPage2Id) {
					case "report":
						Helper.injectReportPaint();
						break;
					default:
						Helper.injectDropItems();
				}
				break;
			case "chat":
				Helper.addLogColoring("Chat", 0);
				break;
			case "log":
				Helper.addLogColoring("GuildLog", 1);
				Helper.addGuildLogWidgets();
				break;
			case "groups":
				switch(subPage2Id) {
					case "viewstats":
						Helper.injectGroupStats();
						break;
					default:
						Helper.injectGroups();
				}
				break;
			case "manage":
				Helper.injectGuild();
				break;
			case "advisor":
				Helper.injectAdvisor();
				break;
			case "history":
				Helper.addHistoryWidgets();
				break;
			}
			break;
		case "bank":
			Helper.injectBank();
			break;
		case "log":
			switch (subPageId) {
			case "outbox":
				Helper.addLogColoring("OutBox", 1);
				break;
			case "-":
				Helper.addLogColoring("PlayerLog", 1);
				Helper.addLogWidgets();
				break;
			}
			break;
		case "marketplace":
			switch(subPageId) {
			case "createreq":
				Helper.addMarketplaceWidgets();
				break;
			}
			break;
		case "quickbuff":
			Helper.injectQuickBuff();
			break;
		case "notepad":
			switch(subPageId) {
			case "showlogs":
				Helper.injectNotepadShowLogs();
				break;
			case "invmanager":
				Helper.injectInventoryManager();
				break;
			case "guildinvmanager":
				Helper.injectGuildInventoryManager();
				break;
			case "recipemanager":
				Helper.injectRecipeManager();
				break;
			case "questmanager":
				Helper.injectQuestManager();
				break;
			case "auctionsearch":
				Helper.injectAuctionSearch();
				break;
			case "onlineplayers":
				Helper.injectOnlinePlayers();
				break;
			case "quicklinkmanager":
				Helper.injectQuickLinkManager();
				break;
			}
			break;
		case "points":
			switch(subPageId) {
			case "-":
				Helper.storePlayerUpgrades();
				break;
			}
			break;
		case "toprated":
			switch(subPageId) {
			case "xp":
				Helper.injectTopRated();
				break;
			}
			break;
		case "inventing":
			switch(subPageId) {
			case "viewrecipe":
				Helper.injectViewRecipe();
				break;
			}
			break;
		case "-":
			var isRelicPage = System.findNode("//input[contains(@title,'Use your current group to capture the relic')]");
			if (isRelicPage) {
				Helper.injectRelic(isRelicPage);
			}
			var isAuctionPage = System.findNode("//td[contains(@background,'header_tradehub.jpg')]");
			if (isAuctionPage) {
				Helper.injectAuctionHouse();
			}
			var isQuestBookPage = System.findNode("//td[.='Quest Name']");
			if (isQuestBookPage) {
				Helper.injectQuestBookFull();
			}
			var isAdvisorPageClue1 = System.findNode("//font[@size=2 and .='Advisor']");
			var clue2 = "//a[@href='index.php?cmd=guild&amp;subcmd=manage' and .='Back to Guild Management']"
			var isAdvisorPageClue2 = System.findNode(clue2);
			if (isAdvisorPageClue1 && isAdvisorPageClue2) {
				Helper.injectAdvisor();
			}
			break;
		}
	},

	injectWorldWidgets: function() {
		Helper.injectQuickHeal();
		Helper.injectClassCast();
		GM_addStyle(
			'.HelperTableRow1 {background-color:#151f1e;font-size:small}\n' +
			'.HelperTableRow1:hover {background-color:black}\n' +
			'.HelperTableRow2 {background-color:#112322;font-size:small}\n' +
			'.HelperTableRow2:hover {background-color:black}'
		);
	},

	injectClassCast: function() {
		var charClassNode = System.findNode("//img[contains(@src,'sigma2/skin/classes/')]");
		if (!charClassNode) return;
		charClassNode.style.cursor="pointer";
		charClassNode.setAttribute("title", Helper.characterClass + " Skills");
		charClassNode.addEventListener('click', Helper.quickClassCast, true);
	},

	quickClassCast: function(evt) {
		switch(Helper.characterClass) {
			case "Mutant":
				window.location = System.server + "index.php?cmd=skills&tree_id=1";
				break;
			case "Soldier":
				window.location = System.server + "index.php?cmd=skills&tree_id=2";
				break;
			case "Purist":
				window.location = System.server + "index.php?cmd=skills&tree_id=3";
				break;
			case "Cyborg":
				window.location = System.server + "index.php?cmd=skills&tree_id=4";
				break;
			default:
				break;
		}
	},

	injectQuickHeal: function() {
		var heartImage = System.findNode("//td[@width='49']");
		if (!heartImage) return;
		heartImage.style.cursor="pointer";
		heartImage.setAttribute("title", "Quick Heal");
		heartImage.addEventListener('click', Helper.quickHeal, true);
	},

	quickHeal: function() {
		var skillId=0;
		switch (Helper.characterClass) {
			case "Mutant":
				skillId=23;
				break;
			case "Soldier":
				skillId=41;
				break;
			case "Purist":
				skillId=60;
				break;
			case "Cyborg":
				skillId=77;
				break;
			default:
				// return // no class found
		}
		// window.location="index.php?cmd=skills&subcmd=cast&skill_id=" + skillId;
		System.xmlhttp("index.php?cmd=skills&subcmd=cast&skill_id=" + skillId, Helper.quickHealDone);
	},

	quickHealDone: function(responseText) {
		var infoMessage = Layout.infoBox(responseText);
		unsafeWindow.tt_setWidth(200);
		unsafeWindow.Tip(infoMessage);

		var healHP = parseInt(infoMessage.replace(/\D/g, ""));

		var indicatorHP = System.findNode("//img[contains(@src,'hp_progress.gif')]");
		indicatorHP.setAttribute("width", Math.round(100 * (healHP + Helper.characterHP) / Helper.characterMaxHP) + "%");
	},

	injectGuild: function() {
		var guildLogo = System.findNode("//a[contains(.,'Change Logo')]").parentNode;
		guildLogo.innerHTML += "[ <span style='cursor:pointer; text-decoration:underline;' " +
			"id='toggleGuildLogoControl' linkto='guildLogoControl'>X</span> ]";
		var guildLogoElement = document.getElementById("logo_0_img").parentNode.parentNode.parentNode;
		guildLogoElement.id = "guildLogoControl";
		if (GM_getValue("guildLogoControl")) {
			guildLogoElement.style.display = "none";
			guildLogoElement.style.visibility = "hidden";
		}
/*
		var leaveGuild = System.findNode("//a[contains(.,'Leave')]").parentNode;
		leaveGuild.innerHTML += "[ <span style='cursor:pointer; text-decoration:underline;' " +
			"id='toggleStatisticsControl' linkto='statisticsControl'>X</span> ]";
		var linkElement=System.findNode("//a[@href='index.php?cmd=guild&subcmd=changefounder']");
		statisticsListElement = linkElement.parentNode.parentNode.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.nextSibling;
		statisticsListElement.innerHTML = "<span id='statisticsControl'>" + statisticsListElement.innerHTML + "</span>";
		if (GM_getValue("statisticsControl")) {
			var statisticsControl = document.getElementById("statisticsControl");
			statisticsControl.style.display = "none";
			statisticsControl.style.visibility = "hidden";
		}
*/

		var build = System.findNode("//a[contains(.,'Build')]").parentNode;
		build.innerHTML += "[ <span style='cursor:pointer; text-decoration:underline;' " +
			"id='toggleGuildStructureControl' linkto='guildStructureControl'>X</span> ]";
		var linkElement=System.findNode("//a[@href='index.php?cmd=guild&subcmd=structures']");
		structureListElement = linkElement.parentNode.parentNode.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.nextSibling;
		structureListElement.innerHTML = "<span id='guildStructureControl'>" + structureListElement.innerHTML + "</span>";
		if (GM_getValue("guildStructureControl")) {
			var guildStructureControl = document.getElementById("guildStructureControl");
			guildStructureControl.style.display = "none";
			guildStructureControl.style.visibility = "hidden";
		}

		document.getElementById('toggleGuildLogoControl').addEventListener('click', Helper.toggleVisibilty, true);
//		document.getElementById('toggleStatisticsControl').addEventListener('click', Helper.toggleVisibilty, true);
		document.getElementById('toggleGuildStructureControl').addEventListener('click', Helper.toggleVisibilty, true);

		// Fast Take

		var guildStore = System.findNode("//table[contains(tbody/tr/td/@background,'inventory/small.gif')]");
		var guildStoreIDRE = /guildstore_id=(\d+)/i;

		var guildStoreBox = [];
		var guildStoreBoxItem = [];
		var guildStoreBoxID = [];
		for (var i=0;i<12;i++) {
			if (guildStore.rows[i >> 2]) guildStoreBox[i]=guildStore.rows[i >> 2].cells[i % 4];
			if (guildStoreBox[i]) guildStoreBoxItem[i] = guildStoreBox[i].firstChild;
			if (guildStoreBoxItem[i]) guildStoreBoxID[i] = guildStoreIDRE(guildStoreBoxItem[i].firstChild.getAttribute("href"))[1];
		}

		var newRow;

		for (var i=0;i<12;i++) {
			if ((i % 4==0) && guildStoreBoxItem[i]) newRow = guildStore.insertRow(2*(i >> 2)+1);
			if (guildStoreBoxItem[i]) {
				var newCell = newRow.insertCell(i % 4);
				newCell.innerHTML = '<span style="cursor:pointer; text-decoration:underline; color:#84ADAC; font-size:x-small;" '+
					'id="Helper:recallGuildStoreItem' + guildStoreBoxID[i] + '" ' +
					'itemID="' + guildStoreBoxID[i] + '">Fast Take</span>';
				document.getElementById('Helper:recallGuildStoreItem' + guildStoreBoxID[i])
					.addEventListener('click', Helper.recallGuildStoreItem, true);
			}
		}
	},

	recallGuildStoreItem: function(evt) {
		var guildStoreID=evt.target.getAttribute("itemID");
		System.xmlhttp("index.php?cmd=guild&subcmd=inventory&subcmd2=takeitem&guildstore_id=" + guildStoreID,
			Helper.recallGuildStoreItemReturnMessage,
			{"item": guildStoreID, "target": evt.target});
	},

	recallGuildStoreItemReturnMessage: function(responseText, callback) {
		var itemID = callback.item;
		var target = callback.target;
		var info = Layout.infoBox(responseText);
		var itemCellElement = target.parentNode; //System.findNode("//td[@title='" + itemID + "']");
		if (info!="") {
			itemCellElement.innerHTML = "<span style='color:green; font-weight:bold;'>Taken</span>";
		} else {
			itemCellElement.innerHTML = "<span style='color:red; font-weight:bold;'>Error</span>";
		}
	},


	injectStaminaCalculator: function() {
		var staminaImageElement = System.findNode("//img[contains(@src,'/sigma2/skin/animation_cell.gif')]");
		if (!staminaImageElement) return;

		var mouseoverText = staminaImageElement.getAttribute("onmouseover");
		var staminaRE = /Energy:\s<\/td><td width=\\'90%\\'>([,0-9]+)\s\/\s([,0-9]+)<\/td>/
		var curStamina = System.intValue(staminaRE.exec(mouseoverText)[1]);
		var maxStamina = System.intValue(staminaRE.exec(mouseoverText)[2]);
		var gainPerHourRE = /Gain\sPer\sHour:\s<\/td><td width=\\'90%\\'>\+([,0-9]+)<\/td>/
		var gainPerHour = System.intValue(gainPerHourRE.exec(mouseoverText)[1]);
		var nextGainRE = /Next\sGain\s:\s<\/td><td width=\\'90%\\'>([,0-9]+)m/
		var nextGainMinutes = System.intValue(nextGainRE.exec(mouseoverText)[1]);
		nextGainHours = nextGainMinutes/60;
		//get the max hours to still be inside stamina maximum
		var hoursToMaxStamina = Math.floor((maxStamina - curStamina)/gainPerHour);
		var millisecondsToMaxStamina = 1000*60*60*(hoursToMaxStamina + nextGainHours);
		var now = (new Date()).getTime();
		var nextHuntMilliseconds = (now + millisecondsToMaxStamina);

		var d = new Date(nextHuntMilliseconds);
		var nextHuntTimeText = d.toFormatString("HH:mm ddd dd/MMM/yyyy");
		var newPart = "<tr><td><font color=\\'#FFF380\\'>Max Energy At: </td><td width=\\'90%\\'>" +
			nextHuntTimeText + "</td></tr><tr>";
		var newMouseoverText = mouseoverText.replace("</table>", newPart + "</table>");
		//newMouseoverText = newMouseoverText.replace(/\s:/,":"); //this breaks the fallen sword addon, so removing this line.
		staminaImageElement.setAttribute("onmouseover", newMouseoverText);
	},

	injectLevelupCalculator: function() {
		var levelupImageElement = System.findNode("//img[contains(@src,'/sigma2/skin/xp_progress.gif')]/..");
		if (!levelupImageElement) return;
		var mouseoverText = levelupImageElement.getAttribute("onmouseover");
		var remainingXPRE = /Remaining:\s<\/td><td width=\\\'90%\\\'>([0-9,]+)/i;
		var gainRE = /Gain\sPer\sHour:\s<\/td><td width=\\\'90%\\\'>\+([0-9,]+)/i;
		var nextGainRE = /Next\sGain\s*:\s*<\/td><td width=\\\'90%\\\'>([0-9]*)m\s*([0-9]*)s/i
		var remainingXP = parseInt(remainingXPRE.exec(mouseoverText)[1].replace(/,/g,""));
		var gain = parseInt(gainRE.exec(mouseoverText)[1].replace(/,/g,""));
		var nextGainMin = parseInt(nextGainRE.exec(mouseoverText)[1]);
		var nextGainSec = parseInt(nextGainRE.exec(mouseoverText)[1]);
		var hoursToNextLevel = Math.ceil(remainingXP/gain);
		var millisecsToNextGain = (hoursToNextLevel*60*60+nextGainMin*60+nextGainSec)*1000;

		var nextGainTime  = new Date((new Date()).getTime() + millisecsToNextGain);
		var mouseoverTextAddition = "<tr><td><font color=\\'#FFF380\\'>Next Level At: </td><td width=\\'90%\\'>" +
			nextGainTime.toFormatString("HH:mm ddd dd/MMM/yyyy") + "</td></tr><tr>";
		newMouseoverText = mouseoverText.replace("</table>", mouseoverTextAddition + "</table>");
		newMouseoverText = newMouseoverText.replace("tt_setWidth(180)", "tt_setWidth(220)").replace("<table width=180>", "<table width=220>");
		levelupImageElement.setAttribute("onmouseover", newMouseoverText);
		return;
	},


	injectRelic: function(isRelicPage) {
		var relicNameElement = System.findNode("//td[contains(.,'Below is the current status for the relic')]/b");
		relicNameElement.parentNode.style.fontSize = "x-small";
		var buttonElement = System.findNode("//input[@value='Attempt Group Capture']");
		var injectHere = buttonElement.parentNode;
		injectHere.align = 'center';
		injectHere.innerHTML = '<input id="calculatedefenderstats" type="button" value="Calculate Defender Stats" title="Calculate the stats of the players defending the relic." ' +
			'class="custombutton">' + injectHere.innerHTML;

		document.getElementById('calculatedefenderstats').addEventListener('click', Helper.calculateRelicDefenderStats, true);
	},

	calculateRelicDefenderStats: function(evt) {
		var calcButton = System.findNode("//input[@id='calculatedefenderstats']");
		calcButton.style.display = "none";
		var relicNameElement = System.findNode("//td[contains(.,'Below is the current status for the relic')]/b");
		relicNameElement.parentNode.style.fontSize = "x-small";
		var tableElement = System.findNode("//table[@width='600']");
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
		var tableWithBorderElement = System.findNode("//table[@cellpadding='5']");
		tableWithBorderElement.align = "left";
		tableWithBorderElement.parentNode.colSpan = "2";
		var tableInsertPoint = tableWithBorderElement.parentNode.parentNode;
		tableInsertPoint.innerHTML += "<td colspan='1'><table width='200' style='border:1px solid #A07720;'>" +
			"<tbody><tr><td title='InsertSpot'></td></tr></tbody></table></td>";
		var extraTextInsertPoint = System.findNode("//td[@title='InsertSpot']");
		var defendingGuild = System.findNode("//a[contains(@href,'index.php?cmd=guild&subcmd=view&guild_id=')]");
		var defendingGuildHref = defendingGuild.getAttribute("href");
		Helper.getRelicGuildData(extraTextInsertPoint,defendingGuildHref);

		//code specifically to see if guild members are guarding the relic - only applies to PANIC
		if (defendingGuildHref == "index.php?cmd=guild&subcmd=view&guild_id=40769") {
			var panicGuild = true;
		}
		var validMemberString = "";
		if (panicGuild) {
			var memberList = System.getValueJSON("memberlist");
			for (var i=0;i<memberList.members.length;i++) {
				var member=memberList.members[i];
				if (member.status == "Offline"
					&& (member.level < 400 || (member.level > 421 && member.level < 441 ) || member.level > 450)) {
					validMemberString += member.name + " ";
				}
			}
		}

		var listOfDefenders = System.findNodes("//b/a[contains(@href,'index.php?cmd=profile&player_id=')]");
		var defenderCount = 0;
		var testList = "";
		for (var i=0; i<listOfDefenders.length; i++) {
			var href = listOfDefenders[i].getAttribute("href");
			//if (i<3) { //I put this in to limit the number of calls this function makes.
					//I don't want to hammer the server too much.
				Helper.getRelicPlayerData(defenderCount,extraTextInsertPoint,href);
			//}
			testList += listOfDefenders[i].innerHTML + " ";
			validMemberString = validMemberString.replace(listOfDefenders[i].innerHTML + " ","");
			defenderCount++;
		}
		//extraTextInsertPoint.innerHTML += "<tr><td style='font-size:x-small;'>" + testList + "<td><tr>";
		extraTextInsertPoint.innerHTML += "<tr><td><table style='font-size:small; border-top:2px black solid;'>" +
			"<tr><td>Number of Defenders:</td><td>" + defenderCount + "</td></tr>" +
			"<tr><td>Defending Faction Relic Count:</td><td title='relicCount'>0</td></tr>" +
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
		System.xmlhttp(href, Helper.parseRelicGuildData, {"extraTextInsertPoint":extraTextInsertPoint,"href":href});
	},

	parseRelicGuildData: function(responseText, callback) {
		var extraTextInsertPoint = callback.extraTextInsertPoint;
		var href = callback.href;
		var doc=System.createDocument(responseText);
		var allItems = doc.getElementsByTagName("IMG");
		var relicCount = 0;
		for (var i=0;i<allItems.length-1;i++) {
			var anItem=allItems[i];
			var mouseoverText = anItem.getAttribute("onmouseover")
			if (mouseoverText && mouseoverText.search("Relic Bonuses") != -1){
				relicCount++;
			}
		}
		var relicCountValue = System.findNode("//td[@title='relicCount']");
		relicCountValue.innerHTML = relicCount;
		var relicProcessedValue = System.findNode("//td[@title='relicProcessed']");
		relicProcessedValue.innerHTML = 1;
		var relicMultiplier = 1;
		if (relicCount == 1) {
			relicMultiplier = 1.5;
		}
		else if (relicCount >= 3) {
			relicMultiplier = 0.9;
		}
		var LDProcessedValue = System.findNode("//td[@title='LDProcessed']");
		if (LDProcessedValue.innerHTML == "1") {
			var attackValue              = System.findNode("//td[@title='attackValue']");
			var LDattackValue            = System.findNode("//td[@title='LDattackValue']");
			attackNumber                 = System.intValue(attackValue.innerHTML);
			LDattackNumber               = System.intValue(LDattackValue.innerHTML);
			attackValue.innerHTML        = System.addCommas(attackNumber + Math.round(LDattackNumber*relicMultiplier));
			var defenseValue             = System.findNode("//td[@title='defenseValue']");
			var LDdefenseValue           = System.findNode("//td[@title='LDdefenseValue']");
			defenseNumber                = System.intValue(defenseValue.innerHTML);
			LDdefenseNumber              = System.intValue(LDdefenseValue.innerHTML);
			defenseValue.innerHTML       = System.addCommas(defenseNumber + Math.round(LDdefenseNumber*relicMultiplier));
			var armorValue               = System.findNode("//td[@title='armorValue']");
			var LDarmorValue             = System.findNode("//td[@title='LDarmorValue']");
			armorNumber                  = System.intValue(armorValue.innerHTML);
			LDarmorNumber                = System.intValue(LDarmorValue.innerHTML);
			armorValue.innerHTML         = System.addCommas(armorNumber + Math.round(LDarmorNumber*relicMultiplier));
			var damageValue              = System.findNode("//td[@title='damageValue']");
			var LDdamageValue            = System.findNode("//td[@title='LDdamageValue']");
			damageNumber                 = System.intValue(damageValue.innerHTML);
			LDdamageNumber               = System.intValue(LDdamageValue.innerHTML);
			damageValue.innerHTML        = System.addCommas(damageNumber + Math.round(LDdamageNumber*relicMultiplier));
			var hpValue                  = System.findNode("//td[@title='hpValue']");
			var LDhpValue                = System.findNode("//td[@title='LDhpValue']");
			hpNumber                     = System.intValue(hpValue.innerHTML);
			LDhpNumber                   = System.intValue(LDhpValue.innerHTML);
			hpValue.innerHTML            = System.addCommas(hpNumber + Math.round(LDhpNumber*relicMultiplier));
			var defendersProcessed       = System.findNode("//td[@title='defendersProcessed']");
			defendersProcessedNumber     = System.intValue(defendersProcessed.innerHTML);
			defendersProcessed.innerHTML = System.addCommas(defendersProcessedNumber + 1);
			var LDpercentageValue        = System.findNode("//td[@title='LDPercentage']");
			LDpercentageValue.innerHTML  = (relicMultiplier*100) + "%";
		}
	},

	getRelicPlayerData: function(defenderCount,extraTextInsertPoint,href) {
		System.xmlhttp(href, Helper.parseRelicPlayerData, {"defenderCount": defenderCount, "extraTextInsertPoint": extraTextInsertPoint, "href": href});
	},

	parseRelicPlayerData: function(responseText, callback) {
		var defenderCount = callback.defenderCount;
		var extraTextInsertPoint = callback.extraTextInsertPoint;
		var href = callback.href;
		var doc = System.createDocument(responseText);
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
			var defenderMultiplier       = 0.2;
			var attackValue              = System.findNode("//td[@title='attackValue']");
			attackNumber                 = System.intValue(attackValue.innerHTML);
			attackValue.innerHTML        = System.addCommas(attackNumber + Math.round(playerAttackValue*defenderMultiplier));
			var defenseValue             = System.findNode("//td[@title='defenseValue']");
			defenseNumber                = System.intValue(defenseValue.innerHTML);
			defenseValue.innerHTML       = System.addCommas(defenseNumber + Math.round(playerDefenseValue*defenderMultiplier));
			var armorValue               = System.findNode("//td[@title='armorValue']");
			armorNumber                  = System.intValue(armorValue.innerHTML);
			armorValue.innerHTML         = System.addCommas(armorNumber + Math.round(playerArmorValue*defenderMultiplier));
			var damageValue              = System.findNode("//td[@title='damageValue']");
			damageNumber                 = System.intValue(damageValue.innerHTML);
			damageValue.innerHTML        = System.addCommas(damageNumber + Math.round(playerDamageValue*defenderMultiplier));
			var hpValue                  = System.findNode("//td[@title='hpValue']");
			hpNumber                     = System.intValue(hpValue.innerHTML);
			hpValue.innerHTML            = System.addCommas(hpNumber + Math.round(playerHPValue*defenderMultiplier));
			var defendersProcessed       = System.findNode("//td[@title='defendersProcessed']");
			defendersProcessedNumber     = System.intValue(defendersProcessed.innerHTML);
			defendersProcessed.innerHTML = System.addCommas(defendersProcessedNumber + 1);
		}
		else {
			var defenderMultiplier = 1;
			var attackValue = System.findNode("//td[@title='LDattackValue']");
			attackNumber = System.intValue(attackValue.innerHTML);
			attackValue.innerHTML = System.addCommas(attackNumber + Math.round(playerAttackValue*defenderMultiplier));
			var defenseValue = System.findNode("//td[@title='LDdefenseValue']");
			defenseNumber=System.intValue(defenseValue.innerHTML);
			defenseValue.innerHTML = System.addCommas(defenseNumber + Math.round(playerDefenseValue*defenderMultiplier));
			var armorValue = System.findNode("//td[@title='LDarmorValue']");
			armorNumber=System.intValue(armorValue.innerHTML);
			armorValue.innerHTML = System.addCommas(armorNumber + Math.round(playerArmorValue*defenderMultiplier));
			var damageValue = System.findNode("//td[@title='LDdamageValue']");
			damageNumber=System.intValue(damageValue.innerHTML);
			damageValue.innerHTML = System.addCommas(damageNumber + Math.round(playerDamageValue*defenderMultiplier));
			var hpValue = System.findNode("//td[@title='LDhpValue']");
			hpNumber=System.intValue(hpValue.innerHTML);
			hpValue.innerHTML = System.addCommas(hpNumber + Math.round(playerHPValue*defenderMultiplier));
			var defendersProcessed = System.findNode("//td[@title='LDProcessed']");
			defendersProcessedNumber=System.intValue(defendersProcessed.innerHTML);
			defendersProcessed.innerHTML = System.addCommas(defendersProcessedNumber + 1);
		}
		var relicProcessedValue = System.findNode("//td[@title='relicProcessed']");
		var relicCountValue = System.findNode("//td[@title='relicCount']");
		var relicCount = System.intValue(relicCountValue.innerHTML);

		var relicMultiplier = 1;
		if (relicCount == 1) {
			relicMultiplier = 1.5;
		}
		else if (relicCount >= 3) {
			relicMultiplier = 0.9;
		}

		if (defenderCount == 0 && relicProcessedValue.innerHTML == "1") {
			var attackValue              = System.findNode("//td[@title='attackValue']");
			var LDattackValue            = System.findNode("//td[@title='LDattackValue']");
			attackNumber                 = System.intValue(attackValue.innerHTML);
			LDattackNumber               = System.intValue(LDattackValue.innerHTML);
			attackValue.innerHTML        = System.addCommas(attackNumber + Math.round(LDattackNumber*relicMultiplier));
			var defenseValue             = System.findNode("//td[@title='defenseValue']");
			var LDdefenseValue           = System.findNode("//td[@title='LDdefenseValue']");
			defenseNumber                = System.intValue(defenseValue.innerHTML);
			LDdefenseNumber              = System.intValue(LDdefenseValue.innerHTML);
			defenseValue.innerHTML       = System.addCommas(defenseNumber + Math.round(LDdefenseNumber*relicMultiplier));
			var armorValue               = System.findNode("//td[@title='armorValue']");
			var LDarmorValue             = System.findNode("//td[@title='LDarmorValue']");
			armorNumber                  = System.intValue(armorValue.innerHTML);
			LDarmorNumber                = System.intValue(LDarmorValue.innerHTML);
			armorValue.innerHTML         = System.addCommas(armorNumber + Math.round(LDarmorNumber*relicMultiplier));
			var damageValue              = System.findNode("//td[@title='damageValue']");
			var LDdamageValue            = System.findNode("//td[@title='LDdamageValue']");
			damageNumber                 = System.intValue(damageValue.innerHTML);
			LDdamageNumber               = System.intValue(LDdamageValue.innerHTML);
			damageValue.innerHTML        = System.addCommas(damageNumber + Math.round(LDdamageNumber*relicMultiplier));
			var hpValue                  = System.findNode("//td[@title='hpValue']");
			var LDhpValue                = System.findNode("//td[@title='LDhpValue']");
			hpNumber                     = System.intValue(hpValue.innerHTML);
			LDhpNumber                   = System.intValue(LDhpValue.innerHTML);
			hpValue.innerHTML            = System.addCommas(hpNumber + Math.round(LDhpNumber*relicMultiplier));
			var defendersProcessed       = System.findNode("//td[@title='defendersProcessed']");
			defendersProcessedNumber     = System.intValue(defendersProcessed.innerHTML);
			defendersProcessed.innerHTML = System.addCommas(defendersProcessedNumber + 1);
			var LDpercentageValue        = System.findNode("//td[@title='LDPercentage']");
			LDpercentageValue.innerHTML  = (relicMultiplier*100) + "%";
		}
	},

	position: function() {
		var result = {};
		if (Helper.page=="world/map/-(-)") {
			var playerTile=System.findNode("//img[contains(@src,'player_tile.gif')]/..");
			result.X=playerTile.cellIndex;
			result.Y=playerTile.parentNode.rowIndex;
			result.type="worldmap";
		}
		else {
			var posit = System.findNode("//td[contains(@background, '/sigma2/coord_bg_')]/font/center");
			if (!posit) return;
			var thePosition=posit.textContent;
			var positionRE=/-\s*\((\d+),\s*(\d+)\)/
			var positionX = parseInt(thePosition.match(positionRE)[1]);
			var positionY = parseInt(thePosition.match(positionRE)[2]);
			result.X=positionX;
			result.Y=positionY;
			result.type="normal";
		}
		return result
	},

	mapThis: function() {
		var realm = System.findNode("//td[contains(@background,'/sigma2/coord_bg_')]/font/center/b");
		var posit = Helper.position();
		// GM_log(JSON.stringify(posit));
		if ((realm) && (posit)) {
			var levelName=realm.innerHTML;
			Helper.levelName = levelName;
			var theMap = System.getValueJSON("map")
			if (!theMap) {
				theMap = {};
				theMap["levels"] = {};
			}
			if (!theMap["levels"][levelName]) theMap["levels"][levelName] = {};
			if (!theMap["levels"][levelName][posit.X]) theMap["levels"][levelName][posit.X]={};
			theMap["levels"][levelName][posit.X][posit.Y]="!";
			// GM_log(JSON.stringify(theMap))
			GM_setValue("map", JSON.stringify(theMap));
		}
	},

	showMap: function(isLarge) {
		if (!GM_getValue("footprints")) return;
		if (isLarge) {
			var realm = System.findNode("//b");
			Helper.levelName=realm.textContent.replace(" Map Overview", "");
		}
		// GM_log(Helper.levelName);
		var theMap = System.getValueJSON("map");
		var displayedMap = System.findNode(isLarge?"//table[@width]":"//table[@width='325' and @height='325']");
		var footprintsColor = GM_getValue("footprintsColor");
		var posit = Helper.position();
		// GM_log(JSON.stringify(posit))
		for (var y=0; y<displayedMap.rows.length; y++) {
			var aRow = displayedMap.rows[y];
			for (var x=0; x<aRow.cells.length; x++) {
				var aCell = aRow.cells[x];
				var dx=isLarge?x:posit.X+(x-2);
				var dy=isLarge?y:posit.Y+(y-2);
				// GM_log(dx + ":" + dy)
				if (theMap["levels"][Helper.levelName] && theMap["levels"][Helper.levelName][dx] && theMap["levels"][Helper.levelName][dx][dy] && (theMap["levels"][Helper.levelName][dx][dy]=="!")) {
					// aCell.setAttribute("background", "http://66.7.192.165/tiles/9_50.gif");

					if (x!=(isLarge?posit.X:2) || y!=(isLarge?posit.Y:2)) {
						aCell.style.color=footprintsColor;
						aCell.innerHTML="**";
					};

				}
				// GM_log(x + ":" + y + " >> " + aCell.getAttribute("background"));
			}
		}
	},

	injectViewRecipe: function() {
		var components=System.findNodes("//b[.='Components Required']/../../following-sibling::tr[2]//img");
		for (var i=0; i<components.length; i++) {
			var mo=components[i].getAttribute("onmouseover");
			System.xmlhttp(Helper.linkFromMouseoverCustom(mo), Helper.injectViewRecipeLinks, components[i]);
		}
	},

	plantFromComponent: function(aComponent) {
		switch(aComponent) {
			case "Amber Essense": return "Amber Plant"; break;
			case "Blood Bloom Flower": return "Blood Bloom Plant"; break;
			case "Dark Shade ": return "Dark Shade Plant"; break;
			case "Snake Eye": return "Elya Snake Head"; break;
			case "Snake Venom Fang": return "Elya Snake Head"; break;
			case "Heffle Wart": return "Heffle Wart Plant"; break;
			case "Jademare Blossom": return "Jademare Plant"; break;
			case "Trinettle Leaf": return "Trinettle Plant"; break;
			default: return aComponent;
		}
	},

	injectViewRecipeLinks: function(responseText, callback) {
		var itemRE = /<b>([^<]+)<\/b>/i;
		var itemName = itemRE.exec(responseText);
		if (itemName) itemName=itemName[1];
		var itemLinks = document.createElement("td");
		itemLinks.innerHTML =
			'<a href="' + System.server + '?cmd=auctionhouse&type=-1&order_by=1&search_text='
			+ escape(Helper.plantFromComponent(itemName))
			+ '">AH</a>';
		var counter=System.findNode("../../../../tr[2]/td", callback);
		counter.setAttribute("colspan", "2");
		callback.parentNode.parentNode.parentNode.appendChild(itemLinks);
	},

	injectAdvisor: function() {
		var titleCells=System.findNodes("//tr[td/b='Member']/td");
		for (var i=0; i<titleCells.length; i++) {
			var cell=titleCells[i];
			cell.style.textDecoration="underline";
			cell.style.cursor="pointer";
			cell.innerHTML=cell.innerHTML.replace(/^&nbsp;/,"");
			cell.addEventListener('click', Helper.advisorHeaderClicked, true);
		}
		var parentTables=System.findNodes("ancestor::table", titleCells[0]);
		var list=parentTables[parentTables.length-1];

		Helper.generateAdvisorRows(list);
		Helper.sortAsc = true;
		Helper.sortAdvisor(list, "Member");
	},

	generateAdvisorRows: function(list) {
		Helper.advisorRows = [];
		for (var i=1; i<list.rows.length-1; i++){
			var theRow=list.rows[i];
			Helper.advisorRows[i-1] = {
				'Member': theRow.cells[0].textContent,
				'GoldFromDeposits': theRow.cells[1].textContent,
				'GoldFromTax': theRow.cells[2].textContent,
				'GoldTotal': theRow.cells[3].textContent,
				'FSPs': theRow.cells[4].textContent,
				'SkillsCast': theRow.cells[5].textContent,
				'GroupsCreated': theRow.cells[6].textContent,
				'GroupsJoined': theRow.cells[7].textContent,
				'RelicsCaptured': theRow.cells[8].textContent,
				'XPContrib': theRow.cells[9].textContent
			};
		}
	},

	advisorHeaderClicked: function(evt) {
		var headerClicked=evt.target.textContent;
		var parentTables=System.findNodes("ancestor::table", evt.target)
		var list=parentTables[parentTables.length-1];
		Helper.sortAdvisor(list, headerClicked);
	},

	sortAdvisor: function(list, sortBy) {

		if (Helper.sortAsc==undefined) Helper.sortAsc=true;
		if (Helper.sortBy && Helper.sortBy==sortBy) {
			Helper.sortAsc=!Helper.sortAsc;
		}
		Helper.sortBy=sortBy;

		if (sortBy=="Member") {
			Helper.advisorRows.sort(Helper.stringSort)
		}
		else {
			Helper.advisorRows.sort(Helper.numberSort)
		}

		var result='<tr>' + list.rows[0].innerHTML + '</tr>'

		for (var i=0; i<Helper.advisorRows.length; i++){
			var r = Helper.advisorRows[i];
			result += '<tr class="HelperTableRow'+(1+i % 2)+'">'+
			'<td> '+r.Member+'</td>'+
			'<td align="center">'+r.GoldFromDeposits+'</td>'+
			'<td align="center">'+r.GoldFromTax+'</td>'+
			'<td align="center">'+r.GoldTotal+'</td>'+
			'<td align="center">'+r.FSPs+'</td>'+
			'<td align="center">'+r.SkillsCast+'</td>'+
			'<td align="center">'+r.GroupsCreated+'</td>'+
			'<td align="center">'+r.GroupsJoined+'</td>'+
			'<td align="center">'+r.RelicsCaptured+'</td>'+
			'<td align="center">'+r.XPContrib+'</td></tr>';
		}
		result+='<tr>' + list.rows[list.rows.length-1].innerHTML + '</tr>'

		list.innerHTML=result;

		for (var i=0; i<list.rows[0].cells.length; i++) {
			var cell=list.rows[0].cells[i];
			// GM_log(cell);
			cell.style.textDecoration="underline";
			cell.style.cursor="pointer";
			cell.innerHTML=cell.innerHTML.replace(/^&nbsp;/,"");
			cell.addEventListener('click', Helper.advisorHeaderClicked, true);
		}

	},

	stringSort: function(a,b) {
		var result=0;
		if (a[Helper.sortBy].toLowerCase()<b[Helper.sortBy].toLowerCase()) result=-1;
		if (a[Helper.sortBy].toLowerCase()>b[Helper.sortBy].toLowerCase()) result=+1;
		if (!Helper.sortAsc) result=-result;
		return result;
	},

	numberSort: function(a,b) {
		var result=0;
		var valueA=a[Helper.sortBy];
		var valueB=b[Helper.sortBy];
		if (typeof valueA=="string") valueA=parseInt(valueA.replace(/,/g,""));
		if (typeof valueB=="string") valueB=parseInt(valueB.replace(/,/g,""));
		result = valueA-valueB;
		if (!Helper.sortAsc) result=-result;
		return result;
	},

	questStatusSort: function(a,b) {
		var result=0;
		var valueA,valueB;
		var statuses = ["Incomplete", "Complete", ""];
		if (!a[Helper.sortBy]) {
			valueA=Helper.sortAsc?50:-50
		}
		else {
			valueA=statuses.indexOf(a[Helper.sortBy]);
		}
		if (!b[Helper.sortBy]) {
			valueB=Helper.sortAsc?50:-50
		}
		else {
			valueB=statuses.indexOf(b[Helper.sortBy]);
		}

		result = valueA-valueB;
		if (!Helper.sortAsc) result=-result;
		return result;
	},

	checkBuffs: function() {
		//

		var replacementText = "<td background='" + System.imageServer + "/sigma2/skin/realm_right_bg.jpg'>"
		replacementText += "<table width=218 cellpadding='1' style='margin-left:5px; margin-right:5px; " +
			"font-size:medium; border-spacing: 1px; border-collapse: collapse;'>"
		replacementText += "<tr><td colspan='2' height='10'></td></tr><tr><tr><td height='1' bgcolor='#393527' " +
			"colspan='2'></td></tr><tr>";

		var hasShieldImp = System.findNode("//img[contains(@onmouseover,'Summon Shield Imp')]");
		var hasDeathDealer = System.findNode("//img[contains(@onmouseover,'Death Dealer')]");
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
			if (hasDeathDealer) {
				if (GM_getValue("lastDeathDealerPercentage")==undefined) GM_setValue("lastDeathDealerPercentage", 0);
				if (GM_getValue("lastKillStreak")==undefined) GM_setValue("lastKillStreak", 0);
				var lastDeathDealerPercentage = GM_getValue("lastDeathDealerPercentage");
				var lastKillStreak = GM_getValue("lastKillStreak");
				if (impsRemaining>0 && lastDeathDealerPercentage == 20) {
					replacementText += "<tr><td style='font-size:small; color:black'>Kill Streak: <span findme='killstreak'>&gt;" + System.addCommas(lastKillStreak) +
						"</span> Damage bonus: <span findme='damagebonus'>20</span>%</td></tr>"
				} else {
					replacementText += "<tr><td style='font-size:small; color:navy'>Kill Streak: <span findme='killstreak'>" + System.addCommas(lastKillStreak) +
						"</span> Damage bonus: <span findme='damagebonus'>" + Math.round(lastDeathDealerPercentage*100)/100 + "</span>%</td></tr>";
					System.xmlhttp("index.php?cmd=profile", Helper.getKillStreak);
				}
			}
		}

		if (GM_getValue("showHuntingBuffs")) {
			var buffs=GM_getValue("huntingBuffs");
			var buffAry=buffs.split(",")
			var missingBuffs = new Array();
			for (var i=0;i<buffAry.length;i++) {
				if (!System.findNode("//img[contains(@onmouseover,'" + buffAry[i].replace(/^\s+|\s+$/g,"") + "')]")) {
					missingBuffs.push(buffAry[i]);
				}
			}
			if (missingBuffs.length>0) {
				replacementText += "<tr><td colspan='2' align='center'><span style='font-size:x-small; color:#FFF380;'>" +
					"You are missing some hunting buffs<br/>("
				replacementText += missingBuffs.join(", ")
				replacementText += ")</span></td></tr>"
			}
			replacementText += "<tr><td colspan='2' height='10'></td></tr><tr><td height='1' bgcolor='#393527' colspan='2'></td></tr>";
			replacementText += "</table>";
		}
		replacementText += "</td>" ;

		var injectHere = System.findNode("//tr/td[contains(@background, '/sigma2/coord_bg_')]/../..");
		if (!injectHere) return;
		//insert after kill all monsters image and text
		newRow=injectHere.insertRow(0);

		newRow.innerHTML=replacementText;
	},

	injectQuestBookFull: function() {
		if (!GM_getValue("showCompletedQuests")) return;
		var quests = Data.questMatrix();
		var questTable = System.findNode("//table[@width='100%' and @cellPadding='2']");
		questTable.setAttribute("findme","questTable");
		var questNamesOnPage = [];
		var hideQuests=[];
		if (GM_getValue("hideQuests")) hideQuests=GM_getValue("hideQuestNames").split(",");
		for (var i=0;i<questTable.rows.length;i++) {
			var aRow = questTable.rows[i];
			if (i!=0) {
				if (aRow.cells[0].innerHTML) {
					var questName = aRow.cells[0].firstChild.innerHTML.replace(/  /g," ");
					var insertHere = aRow.cells[0];
					questNamesOnPage.push(questName);
					for (var j=0;j<quests.length;j++) {
						var aCell = aRow.cells[0]
						var imgElement = aCell.nextSibling.firstChild;
						var matrixQuestName = quests[j].questName.replace(/  /g," ");

						// GM_log(questName + "\t" + hideQuests.indexOf(questName));

						if (questName == matrixQuestName && imgElement.getAttribute("title") != "Completed") {
							if (hideQuests.indexOf(matrixQuestName)>=0) {
								aRow.parentNode.removeChild(aRow.nextSibling);
								aRow.parentNode.removeChild(aRow.nextSibling);
								aRow.parentNode.removeChild(aRow.nextSibling);
								aRow.parentNode.removeChild(aRow);
							} else {
								insertHere.innerHTML += " <span style='color:gray;'>Quest level:</span> " +
									"<span style='color:#ADB5B5;'>" + quests[j].level +
									"</span> <span style='color:gray;'>Quest location:</span> " +
									"<span style='color:#ADB5B5;'>" + quests[j].location + "</span>";
							}
							break;
						} else if (j==quests.length-1 && imgElement.getAttribute("title") != "Completed") {
							insertHere.innerHTML += " <span style='color:red;'>Quest not in array sorry (or error in array).</span>";
						}
					}
				}
			}
		}
	},

	injectQuestBookLite: function() {
		if (GM_getValue("showCompletedQuests")) return;
		var quests = Data.questMatrix();
		var questTable = System.findNode("//table[@width='100%' and @cellPadding='2']");
		questTable.setAttribute("findme","questTable");
		var hideNextRows = 0;
		var playerQuestList = [];
		var hideQuests=[];
		if (GM_getValue("hideQuests")) hideQuests=GM_getValue("hideQuestNames").split(",");

		for (var i=0;i<questTable.rows.length;i++) {
			var aRow = questTable.rows[i];
			if (i!=0) {
				if (hideNextRows > 0) {
					aRow.style.display = "none";
					hideNextRows --;
				}
				if (aRow.cells[0].innerHTML) {
					var questName = aRow.cells[0].firstChild.innerHTML;
					var insertHere = aRow.cells[0];
					var killThis = false;
					for (var j=0;j<quests.length;j++) {
						var matrixQuestName = quests[j].questName;
						if (questName == matrixQuestName) {
							if (hideQuests.indexOf(matrixQuestName)>=0) {
								aRow.parentNode.removeChild(aRow.nextSibling);
								aRow.parentNode.removeChild(aRow.nextSibling);
								aRow.parentNode.removeChild(aRow.nextSibling);
								aRow.parentNode.removeChild(aRow);
							} else {
								insertHere.innerHTML += " <span style='color:gray;'>Quest level:</span> <span style='color:#ADB5B5;'>" +
									quests[j].level + "</span> <span style='color:gray;'>Quest location:</span> <span style='color:#ADB5B5;'>" +
									quests[j].location + "</span>";
							}
							break;
						} else if (j==quests.length) {
							insertHere.innerHTML += " <span style='color:gray;'>Quest not in array sorry.</span>";
						}
					}
					var aCell = aRow.cells[0]
					var imgElement = aCell.nextSibling.firstChild;
					if (imgElement.getAttribute("title") == "Completed") {
						aRow.style.display = "none";
						hideNextRows = 3;
					}
					playerQuestList.push(questName);
				}
			}
			else {
				var questNameCell = aRow.firstChild.nextSibling;
				questNameCell.innerHTML += "&nbsp;&nbsp;<font style='color:#ADB5B5;'>(Completed quests hidden - " +
					"see preferences to unhide)</font>"
			}
		}

		var currentPageElement = System.findNode("//option[@selected]");
		var pageText = currentPageElement.parentNode.parentNode.innerHTML;
		var lastPageNumberRE = /\&nbsp;of\&nbsp;(\d+)\&nbsp;/
		var lastPageNumber = lastPageNumberRE.exec(pageText)[1]*1;
		newRow = questTable.insertRow(-1);
		newCell = newRow.insertCell(0);
		newCell.colSpan = '2';
		newCell.style.display = 'none';
		newCell.innerHTML = "<span style='color:red;' findme='pagesProcessed'>1</span><span style='color:red;' findme='totalPages'>" + lastPageNumber + "</span>";

		newRow = questTable.insertRow(-1);
		newCell = newRow.insertCell(0);
		newCell.colSpan = '2';
		newCell.style.display = 'none';
		newCell.innerHTML = "<span style='color:red;' findme='playerQuestList'>" + playerQuestList.join() + "</span>";

		var pageCountElement = System.findNode("//select[@class='customselect']");
		//&nbsp;of&nbsp;5&nbsp;
		var pageRE = /\&nbsp;of\&nbsp;(\d+)\&nbsp;/
		var pageCount=parseInt(pageCountElement.parentNode.innerHTML.match(pageRE)[1]);
		for (var i=1;i<pageCount;i++) {
			System.xmlhttp("index.php?cmd=questbook&page=" + i, Helper.injectQuestData);
		}
	},

	injectQuestData: function(responseText) {
		var playerQuestListElement = System.findNode("//span[@findme='playerQuestList']");
		var playerQuestList = playerQuestListElement.innerHTML.split();

		var quests = Data.questMatrix();
		var doc=System.createDocument(responseText)
		var allItems = doc.getElementsByTagName("TD");
		for (var i=0;i<allItems.length;i++) {
			var anItem=allItems[i];
			if (anItem.innerHTML=="Quest Name") {
				var questTable = anItem.parentNode.parentNode;
			}
		}
		var OriginalQuestTable = System.findNode("//table[@findme='questTable']");
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
				var questName = aRow.cells[0].firstChild.textContent.replace(/  /g," ");
				var insertHere = aRow.cells[0];
				for (var j=0;j<quests.length;j++) {
					if (questName == quests[j].questName) {
						insertHere.innerHTML += " <span style='color:gray;'>Quest level:</span> <span style='color:#ADB5B5;'>" +
							quests[j].level + "</span> <span style='color:gray;'>Quest location:</span> <span style='color:#ADB5B5;'>" +
							quests[j].location + "</span>";
					} else if (j==quests.length) {
						insertHere.innerHTML += " <span style='color:gray;'>Quest not in array sorry.</span>";
					}
				}
				var aCell = aRow.cells[0]
				var imgElement = aCell.nextSibling.firstChild;
				if (imgElement.getAttribute("title") != "Completed") {
					newRow = OriginalQuestTable.insertRow(OriginalQuestTable.rows.length);
					newRow.innerHTML = aRow.innerHTML;
					insertNextRows = 3;
				}
				playerQuestList.push(questName);
			}
		}
		var pagesProcessedElement = System.findNode("//span[@findme='pagesProcessed']");
		var pagesProcessed = pagesProcessedElement.textContent*1;
		pagesProcessedElement.innerHTML = pagesProcessed + 1;
		playerQuestListElement.innerHTML = playerQuestList.join();
		var totalPagesElement = System.findNode("//span[@findme='totalPages']");
		var totalPages = totalPagesElement.textContent*1;
		var characterLevel = Helper.characterLevel;
		var pageOneQuestTable = System.findNode("//table[@findme='questTable']");

		if ((pagesProcessed+1) == totalPages) { //all pages processed so now we can find missing quests
			newRow = pageOneQuestTable.insertRow(-1);
			newCell = newRow.insertCell(0);
			newCell.colSpan = '2';
			newCell.innerHTML = "<span style='color:#ADB5B5;'>List of <u>known</u> missing quests for your level. " +
				"If you find an error with this list, or a missing quest, please report it on the google code page related to this script.</span> ";
			for (var j=0;j<quests.length;j++) {
				var questName = quests[j].questName;
				var questLevel = quests[j].level;
				var questLocation = quests[j].location;
				if (playerQuestList.join().search(questName) == -1 && questLevel <= characterLevel) {
					newRow = pageOneQuestTable.insertRow(-1);
					newCell = newRow.insertCell(0);
					newCell.colSpan = '2';
					newCell.innerHTML = "<span style='color:gray;'>Known missing quest: " +
					"</span><span style='color:#ADB5B5;'>" + questName +
					"</span> <span style='color:gray;'>level:</span> <span style='color:#ADB5B5;'>" + questLevel +
					"</span> <span style='color:gray;'>location:</span> <span style='color:#ADB5B5;'>" + questLocation + "</span>";
				}
			}
		}
	},

	injectWorld: function() {
		Helper.mapThis();
		Helper.showMap(false);
		var injectHere = System.findNode("//tr[contains(td/@background, 'location_header.gif')]/../..");
		// if (!injectHere) return;
		var newRow=injectHere.insertRow(2);
		var newCell=newRow.insertCell(0);
		// newCell.setAttribute("background", System.imageServer + "/sigma2/skin/realm_right_bg.jpg");
		var killStyle = GM_getValue("killAllAdvanced");
		if (GM_getValue("showQuickKillOnWorld")) {
			newCell.innerHTML='<div style="font-size:xx-small;">' +
				'Quick Kill' + Helper.helpLink('Quick Kill Style',
					'<b><u>single</u></b> will quick kill a single monster<br/> ' +
					'<b><u>type</u></b> will quick kill a type of monster<br/>' +
					'<b><u>off</u></b> returns control to game normal.') +
				':' +
				'<input type="radio" id="Helper:QuickKillOff" name="Helper:QuickKill" value="off"' +
					((killStyle == "off")?" checked":"") + '>' + ((killStyle == "off")?" <b>off</b>":"off") +
				'<input type="radio" id="Helper:QuickKillSingle" name="Helper:QuickKill" value="single"' +
					((killStyle == "single")?" checked":"") + '>' + ((killStyle == "single")?" <b>single</b>":"single") +
				'<input type="radio" id="Helper:QuickKillType" name="Helper:QuickKill"  value="type"' +
					((killStyle == "type")?" checked":"") + '>' + ((killStyle == "type")?" <b>type</b>":"type") +
				'</div>';
			document.getElementById('Helper:QuickKillOff').addEventListener('click', Helper.worldChangeQuickKill, true);
			document.getElementById('Helper:QuickKillSingle').addEventListener('click', Helper.worldChangeQuickKill, true);
			document.getElementById('Helper:QuickKillType').addEventListener('click', Helper.worldChangeQuickKill, true);
		}

		var buttonRow = System.findNode("//tr[td/a/img[@title='Open Area Map']]");

		if (!GM_getValue("hideKrulPortal")) {
			buttonRow.innerHTML += '<td valign="top" width="5"></td>' +
				'<td valign="top"><img style="cursor:pointer" id="Helper:PortalToStart" src="' + System.imageServer +
				'/temple/3.gif" title="Instant Teleport to Taulin Rad Lands" border="1" /></span></td>';
		}

		var footprints = GM_getValue("footprints");

		buttonRow.innerHTML += '<td valign="top" width="5"></td>' +
			'<td valign="top"><img style="cursor:pointer" id="Helper:ToggleFootprints" src="' + System.imageServer +
			'/skin/' + (footprints?'quest_complete':'quest_incomplete') + '.gif" title="Toggle Footprints" border="0"></td>';

		if (!GM_getValue("hideKrulPortal")) {
			document.getElementById('Helper:PortalToStart').addEventListener('click', Helper.portalToStartArea, true);
		}

		// One may ask why the separation of creating the button and the event handling code.
		// Well, obviously (so obvious it took me 3 hours to figure out), when you change the HTML of
		// a region, all attached events are destroyed (because the original elements are also destroyed)

		document.getElementById('Helper:ToggleFootprints').addEventListener('click', Helper.toggleFootprints, true);

		Helper.checkBuffs();
		Helper.prepareCheckMonster();
		Helper.prepareCombatLog();
	},

	injectWorldMap: function() {
		Helper.showMap(true);
	},

	toggleFootprints: function() {
		var footprints = GM_getValue("footprints");
		if (footprints == undefined) footprints=false;
		footprints = !footprints;
		GM_setValue("footprints", footprints);

		if (!footprints) { // clear footprints
			var theMap = System.getValueJSON("map");
			var realm = System.findNode("//td[contains(@background,'/sigma2/coord_bg_')]/font/center/b");
			var levelName=realm.innerHTML;
			Helper.levelName = levelName;
			theMap["levels"][Helper.levelName]={};
			GM_setValue("map", JSON.stringify(theMap))
		}

		document.getElementById('Helper:ToggleFootprints').src =
			System.imageServer +
			'/skin/' + (footprints?'quest_complete':'quest_incomplete') + '.gif'
	},

	prepareCombatLog: function() {
		if (!GM_getValue("showCombatLog")) return;
		var reportsTable=System.findNode("//td[contains(@background,'sigma2/chatbox_header.gif')]/../../tr[7]/td");
		if (!reportsTable) return;
		var tempLog=document.createElement("div");
		tempLog.id="reportsLog";
		var injLog=reportsTable.appendChild(tempLog);
		var is=injLog.style;
		is.color = '#D4FAFF';
		is.backgroundImage='url(' + System.imageServer + '/sigma2/skin/realm_right_bg.jpg)';
		is.maxHeight = '240px';
		// is.width = '277px';
		is.maxWidth = is.width;
		is.marginLeft = '0px';
		is.marginRight = '0px';
		is.paddingLeft = '12px';
		is.paddingRight = '12px';
		is.overflow = 'hidden';
		is.fontSize = 'xx-small';
		is.textAlign = 'justify';
	},

	worldChangeQuickKill: function(evt) {
		var killAllAdvanced = GM_getValue("killAllAdvanced");
		if (!GM_getValue("killAllAdvanced")) {GM_setValue("killAllAdvanced", "off")};
		GM_setValue("killAllAdvanced", evt.target.value);
		window.location = 'index.php?cmd=world';
	},

	getMonster: function(index) {
		return System.findNode("//a[@id='aLink" + index + "']");
	},

	killSingleMonster: function(monsterNumber) {
		if (GM_getValue("killAllAdvanced") != "single") return;
		var kills=0;
		var monster = Helper.getMonster(monsterNumber);
		if (monster) {
			kills+=1;
			System.xmlhttp(monster.href, Helper.killedMonster, {"node": monster, "index": monsterNumber});
		}
		//if (kills>0) {
		//	System.xmlhttp("index.php?cmd=blacksmith&subcmd=repairall&fromworld=1");
		//}
	},

	killSingleMonsterType: function(monsterType) {
		if (GM_getValue("killAllAdvanced") != "type") return;
		var kills=0;
		for (var i=1; i<=8; i++) {
			var monster = Helper.getMonster(i);
			if (monster) {
				thisMonsterType = monster.parentNode.parentNode.parentNode.firstChild.nextSibling.nextSibling.innerHTML;
				if (thisMonsterType == monsterType) {
					kills+=1;
					System.xmlhttp(monster.href, function(responseDetails, callback) {Helper.killedMonster(responseDetails, this.callback);}, {"node": monster, "index": i});
				}
			}
		}
		//if (kills>0) {
		//	System.xmlhttp("index.php?cmd=blacksmith&subcmd=repairall&fromworld=1");
		//}
	},

	prepareCheckMonster: function() {
		// add id to the kill-monster links
		monsters = System.findNodes("//a[contains(@href,'cmd=combat') and contains(@href,'max_turns=2')]");
		if (!monsters) return;
		for (var i=0; i<monsters.length; i++) {
			var monster = monsters[i];
			if (monster) {
				// add monster color based on elite types
				var monsterText = monster.parentNode.parentNode.parentNode.cells[1];
				if (monsterText.textContent.match(/\(Champion\)/i))
					monsterText.style.color = 'green';
				if (monsterText.textContent.match(/\(Elite\)/i))
					monsterText.style.color = 'yellow';
				if (monsterText.textContent.match(/\(HK\)/i))
					monsterText.style.color = 'red';
				
				monster.id = "aLink" + (i + 1);
				monster.parentNode.innerHTML += "<font style='font-size:8px'>" + (i+1) + "</font>";
			}
		}

		if (!GM_getValue("showCreatureInfo")) return;
		var monsters = System.findNodes("//a[contains(@href,'cmd=world&subcmd=viewcreature&creature_id=')]");
		if (!monsters) return;
		for (var i=0; i<monsters.length; i++) {
			var monster = monsters[i];
			if (monster) {
				var href=monster.href;
				System.xmlhttp(monster.href, Helper.checkedMonster, monster);
			}
		}
	},

	checkedMonster: function(responseText, callback) {
		var creatureInfo=System.createDocument(responseText);
		var statsNode = System.findNode("//table[@width='350' and contains(., 'Attack')]", creatureInfo);
		if (!statsNode) {return;} // FF2 error fix
		var classNode = System.findNode("//table[@width='350']/tbody/tr/td[contains(.,'Class:')]/following-sibling::td", creatureInfo);
		var levelNode = System.findNode("//table[@width='350']/tbody/tr/td[contains(.,'Level:')]/following-sibling::td", creatureInfo);
		var attackNode = System.findNode("//table[@width='350']/tbody/tr/td[contains(.,'Attack:')]/following-sibling::td", creatureInfo);
		var defenseNode = System.findNode("//table[@width='350']/tbody/tr/td[contains(.,'Defense:')]/following-sibling::td", creatureInfo);
		var armorNode = System.findNode("//table[@width='350']/tbody/tr/td[contains(.,'Armor:')]/following-sibling::td", creatureInfo);
		var damageNode = System.findNode("//table[@width='350']/tbody/tr/td[contains(.,'Damage:')]/following-sibling::td", creatureInfo);
		var hitpointsNode = System.findNode("//table[@width='350']/tbody/tr/td[contains(.,'HP:')]/following-sibling::td", creatureInfo);
		var goldNode = System.findNode("//table[@width='350']/tbody/tr/td[contains(.,'Gold:')]/following-sibling::td", creatureInfo);
		var enhanceNodesXpath = "//table[@width='350']/tbody/tr[contains(td,'Enhancements')]/following-sibling::*[td/font[@color='#333333']]"
		var enhanceNodes = System.findNodes(enhanceNodesXpath, creatureInfo);

		var hitpoints = parseInt(hitpointsNode.textContent.replace(/,/g,""));
		var armorNumber = parseInt(armorNode.textContent.replace(/,/g,""));
		var oneHitNumber = Math.ceil((hitpoints*1.053)+(armorNumber*1.053));

		var killButtons=System.findNode("tbody/tr[td/input]", statsNode);
		var killButtonHeader=System.findNode("tbody/tr[contains(td/@style,'actions_head_bg.gif')]/following-sibling::tr", statsNode);
		var killButtonParent=killButtonHeader.parentNode.parentNode;

		levelNode.innerHTML += " (your level:<span style='color:yellow'>" + Helper.characterLevel + "</span>)"
		attackNode.innerHTML += " (your defense:<span style='color:yellow'>" + Helper.characterDefense + "</span>) "
		defenseNode.innerHTML += " (your attack:<span style='color:yellow'>" + Helper.characterAttack + "</span>)"
		armorNode.innerHTML += " (your damage:<span style='color:yellow'>" + Helper.characterDamage + "</span>)"
		damageNode.innerHTML += " (your armor:<span style='color:yellow'>" + Helper.characterArmor + "</span>)"
		hitpointsNode.innerHTML += " (your HP:<span style='color:yellow'>" + Helper.characterHP + "</span>)" +
			"(1H: <span style='color:red'>" + oneHitNumber + "</span>)"

		// deleteRow(-1) means delete the last row of the table
		killButtonParent.deleteRow(-1);
		killButtonParent.deleteRow(-1);
		killButtonParent.deleteRow(-1);

		callback.setAttribute("mouseOverText", statsNode.parentNode.innerHTML);
		callback.setAttribute("mouseOverWidth", "400");
		callback.addEventListener("mouseover", Helper.clientTip, true);
	},

	killedMonster: function(responseText, callback) {
		var doc=System.createDocument(responseText);

		var reportRE=/var\s+report=new\s+Array;\n(report\[[0-9]+\]="[^"]+";\n)*/;
		var report=responseText.match(reportRE);
		if (report) report=report[0]

		// var specialsRE=/<div id="specialsDiv" style="position:relative; display:block;"><font color='#FF0000'><b>Azlorie Witch Doctor was withered.</b></font>/
		var specials=System.findNodes("//div[@id='specialsDiv']", doc);

		var playerId = Layout.playerId();

		var xpGain = System.getIntFromRegExp(responseText, /var\s+xpGain=(-?\d+);/i);
		var goldGain = System.getIntFromRegExp(responseText, /var\s+goldGain=(-?\d+);/i);
		var guildTaxGain = System.getIntFromRegExp(responseText, /var\s+guildTaxGain=(-?\d+);/i);
		var levelUp = System.getIntFromRegExp(responseText, /var\s+levelUp=(-?\d+);/i);
		var surgeGain = System.getIntFromRegExp(responseText, /var\s+surgeGain=(-?\d+);/i);
		// var finalHP = System.getIntFromRegExp(responseText, /^HP\[1\]=(-?[0-9]+);/i);
		var hpNode = System.findNode("//div[@id='current_hp_0']", doc);
		if (hpNode) {
			var finalHP = parseInt(hpNode.textContent.split("/")[0]);
			var maxHP = parseInt(hpNode.textContent.split("/")[1]);

			var ammoNode= System.findNode("//div[@id='current_ammo_0']", doc);
			var finalAmmo = parseInt(ammoNode.textContent.split("/")[0]);
			var maxAmmo = parseInt(ammoNode.textContent.split("/")[1]);

			var indicatorHP = System.findNode("//img[contains(@src,'hp_progress.gif')]");
			indicatorHP.setAttribute("width", Math.round(100 * finalHP / maxHP) + "%");
		}

		var lootRE=/You looted the item '<font color='(\#[0-9A-F]+)'>([^<]+)<\/font>'<\/b><br><br><img src=\"http:\/\/[0-9.]+\/sigma2\/items\/([0-9a-f]+).gif\"\s+onmouseover="ajaxLoadItem\(([0-9]+),\s-1,\s+2,\s+([0-9]+),\s+''\);\">/i
		var info = Layout.infoBox(responseText);
		var lootMatch=responseText.match(lootRE)
		var lootedItem = "";
		var lootedItemId = "";
		var lootedItemVerify="";
		if (lootMatch && lootMatch.length>0) {
			lootedItem=lootMatch[2];
			lootedItemId=lootMatch[4];
			lootedItemVerify=lootMatch[5];
		}
		var shieldImpDeathRE = /Shield Imp absorbed all damage/;
		var shieldImpDeath = responseText.match(shieldImpDeathRE);

		var monster = callback.node;
		if (monster) {
			var result=document.createElement("div");
			var resultHtml = "<small><small>"+callback.index+". XP:" + xpGain + " Gold:" + goldGain + " (" + guildTaxGain + ")</small></small>";
			var resultText = "XP:" + xpGain + " Gold:" + goldGain + " (" + guildTaxGain + ")\n"
			if (info!="") {
				resultHtml += "<br/><div style='font-size:x-small;width:120px;overflow:hidden;' title='" + info + "'>" + info + "</div>";
				resultText += info + "\n";
			}
			if (lootedItem!="") {
				resultHtml += "<br/><small><small>Looted item:<span onclick=\"ajaxLoadItem(" +
					lootedItemId + ", -1, 2, " + playerId + ", '');\" >" +
					lootedItem + "</span></small></small>";
				resultText += "Looted item:" + lootedItem + "\n";
			}
			if (shieldImpDeath) {
				resultHtml += "<br/><small><small><span style='color:red;'>Shield Imp Death</span></small></small>";
				resultText += "Shield Imp Death\n"
			}
			if (xpGain<0) result.style.color='red';
			result.innerHTML=resultHtml
			var monsterParent = monster.parentNode;
			result.id = "result" + callback.index;
			if (report) {
				var reportLines=report.split("\n");
				var reportHtml="";
				var reportText="";
				if (specials) {
					reportHtml += "<div style='color:red'>"
					for (var i=0; i<specials.length; i++) {
						reportHtml += specials[i].textContent + "<br/>";
						reportText += specials[i].textContent + "\n";
					}
					reportHtml += "</div>";
				}
				for (var i=0; i<reportLines.length; i++) {
					var reportMatch = reportLines[i].match(/\"(.*)\"/);
					if (reportMatch) {
						reportHtml += "<br/>" + reportMatch[1];
						reportText += reportMatch[1].replace(/<br>/g, "\n") + "\n";
					}
				}
				if (levelUp=="1") {
					reportHtml += '<br/><br/><div style="color:#999900;font-weight:bold;>Your level has increased!</div>';
					reportText += "Your level has increased!\n";
				}
				if (levelUp=="-1") {
					reportHtml += '<br/><br/><div style="color:#991100;font-weight:bold;">Your level has decreased!</div>';
					reportText += "Your level has decreased!\n";
				}
				mouseOverText = "<div><div style='color:#FFF380;text-align:center;'>Combat Results</div>" + reportHtml + "</div>";
				Helper.appendCombatLog(reportHtml);
				result.setAttribute("mouseOverText", mouseOverText);
				if (GM_getValue("keepLogs")) {
					var now=new Date();
					Helper.appendSavedLog("\n================================\n" + now.toLocaleFormat("%Y-%M-%d %H:%m:%S") + "\n" + resultText + "\n" + reportText);
				}
			}
			monsterParent.innerHTML = "";
			monsterParent.insertBefore(result, monsterParent.nextSibling);
			if (report) {
				document.getElementById("result" + callback.index).addEventListener("mouseover", Helper.clientTip, true);
			}
		}
	},

	appendSavedLog: function(text) {
		var theLog=GM_getValue("CombatLog");
		if (!theLog) theLog="";
		theLog+=text;
		GM_setValue("CombatLog", theLog);
	},

	appendCombatLog: function(text) {
		var reportLog = System.findNode("//div[@id='reportsLog']");
		if (!reportLog) return;
		reportLog.innerHTML += text + "<br/>";
	},

	scrollUpCombatLog: function() {
		var reportLog = System.findNode("//div[@id='reportsLog']");
		reportLog.scrollTop-=10;
	},

	scrollDownCombatLog: function() {
		var reportLog = System.findNode("//div[@id='reportsLog']");
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
		if (!GM_getValue("enableGuildOnlineList")) return;
		var injectHere = System.findNode("//table[@width='120' and contains(tbody/tr/td/table/@style, '/sigma2/skin/community_header.gif')]")
		if (!injectHere) return;
		var info = injectHere.insertRow(0);
		var cell = info.insertCell(0);
		cell.innerHTML="<span id='Helper:GuildListPlaceholder'></span>";
		Helper.retrieveGuildData();
	},

	retrieveGuildData: function() {
		var memberList = System.getValueJSON("memberlist");
		var guildOnlineRefreshTime = GM_getValue("guildOnlineRefreshTime");
		guildOnlineRefreshTime *= 1000;
		if (memberList) {
			if ((new Date()).getTime() - memberList.changedOn > guildOnlineRefreshTime) memberList = null; // invalidate cache
		}

		if (!memberList) {
			System.xmlhttp("index.php?cmd=guild&subcmd=manage", Helper.parseGuildForWorld);
		} else {
			var memberList = System.getValueJSON("memberlist");
			memberList.isRefreshed = false;
			Helper.injectGuildList(memberList);
		}
	},

	parseGuildForWorld: function(details) {
		var doc=System.createDocument(details);
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
			var memberList = {};
			memberList.members = [];
			memberList.lookupByName = [];
			memberList.lookupById = [];
			for (var i=0;i<membersDetails.rows.length;i++) {
				var aRow = membersDetails.rows[i];
				if (aRow.cells.length==5 && aRow.cells[0].firstChild.title) {
					var aMember = new Object;
					aMember.status = aRow.cells[0].firstChild.title;
					var playerLink =
						aRow.cells[1].firstChild.firstChild.firstChild.firstChild.nextSibling.firstChild.nextSibling;
					aMember.id = (/[0-9]+$/).exec(playerLink.href)[0];
					aMember.name=playerLink.textContent;
					// aMember.id = (/[0-9]+$/).exec(aRow.cells[1].firstChild.nextSibling.href)[0]
					// aMember.name=aRow.cells[1].firstChild.nextSibling.textContent;
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
			Helper.injectGuildList(memberList);
		}
	},

	prepareChat: function() {
		var showLines = parseInt(GM_getValue("chatLines"))
		if (Helper.debug) GM_log("prepareChat - showLines=" + showLines);
		if (showLines==0) return;
		var injectHere = System.findNode("//table[@width='133' and contains(@style, '/sigma2/skin/community_header.gif')]")
		injectHere = injectHere.parentNode.parentNode.parentNode;

		if (!injectHere) return;
		var info = injectHere.insertRow(GM_getValue("disableGuildOnlineList")?0:1)
		var cell = info.insertCell(0);
		cell.innerHTML="<span id='Helper:ChatPlaceholder'></span>";
		var chat = System.getValueJSON("chat");
		var newChat = System.findNode("//table[contains(.,'chat messages')]")
		if (!chat || newChat || ((new Date()).getTime() - chat.lastUpdate > 15000)) {
			Helper.retrieveChat();
		} else {
			chat.isRefreshed=false;
			Helper.injectChat(chat);
		}
	},

	retrieveChat: function() {
		System.xmlhttp("index.php?cmd=guild&subcmd=chat", Helper.parseChatForWorld);
	},

	parseChatForWorld: function(chatText) {
		var doc=System.createDocument(chatText);
		var chatTable = System.findNode("//table[@border='0' and @cellpadding='2' and @width='100%']", doc);
		if (!chatTable) return;
		var chat = new Object();
		// var chatConfirm=System.findNode("//input[@name='xc']", doc);
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
		// chat.confirm=chatConfirm.value;
		Helper.injectChat(chat);
	},

	injectChat: function(chat){
		var injectHere = document.getElementById("Helper:ChatPlaceholder");
		var newTable=false;
		var topToBottom = GM_getValue("chatTopToBottom");

		var displayList = document.getElementById("Helper:ChatWindow");
		if (!displayList) {
			displayList=document.createElement("TABLE");
			displayList.id="Helper:ChatWindow";
			displayList.style.border = "1px solid gray";
			displayList.style.backgroundColor = (chat.isRefreshed)?"#151f1e":"#112322";
			displayList.cellPadding = 2;
			displayList.width = 125;
			newTable=true;
		}
		else {
			while (displayList.rows.length>0) {
				displayList.deleteRow(0);
			}
			displayList.style.backgroundColor = (chat.isRefreshed)?"#151f1e":"#112322";
		}

		var aRow=displayList.insertRow(displayList.rows.length);
		var aCell=aRow.insertCell(0);

		var result="<div style='font-size:xx-small' id='chatFrame'>";

		var showLines = parseInt(GM_getValue("chatLines"));
		if (isNaN(showLines)) {
			showLines=10
			GM_setValue("chatLines", showLines)
		}
		var startFrom = (chat.messages.length>showLines)?chat.messages.length-showLines:0;
		for (var i=startFrom; i<chat.messages.length; i++) {
			var j = topToBottom?i:chat.messages.length-i+startFrom-1; // chat.messages.length-i;
			result += "<span style='color:#F5F298' title='"+chat.messages[j].time+"'>"
			result += chat.messages[j].from
			result += ":</span><span style='color:white'>"
			result += chat.messages[j].text.replace(/</g,"&lt;").replace(/>/g,"&gt;");
			result += "</span><br/>";
		}
		result += '<form action="index.php" method="post" id="Helper:ChatBox" onsubmit="return false;">';
		result += '<input type="hidden" value="' + chat.confirm + '" name="Helper:ChatConfirm"/>';
		result += '<input type="text" class="custominput" size="18" name="Helper:ChatMessage"/>';
		result += '<input type="submit" name="submit" class="custombutton" value="Send" name="submit"/>';
		result += '&nbsp;&nbsp;&nbsp;';
		result += '<input type="button" name="submitmass" id="Helper:ChatBoxMass" class="custombutton" value="Mass" name="submit"/>';
		result += '</form>';
		result += '</div>';

		aCell.innerHTML = result;

		if (newTable) {
			var breaker=document.createElement("BR");
			injectHere.parentNode.insertBefore(breaker, injectHere.nextSibling);
			injectHere.parentNode.insertBefore(displayList, injectHere.nextSibling);
		}

		document.getElementById('Helper:ChatBox').addEventListener('submit', Helper.sendChat, true);
		document.getElementById('Helper:ChatBoxMass').addEventListener('click', Helper.sendMassChat, true);

		//document.removeEventListener("keypress", unsafeWindow.document.onkeypress, true);

		GM_setValue("chat", JSON.stringify(chat));
	},

	sendMassChat: function(evt) {
		if (!window.confirm("Are you sure you want to send a mass message?")) return;

		var oForm=evt.target.form;
		Helper.sendChatGeneric(oForm, true);
		return false;
	},

	sendChat: function(evt) {
		var oForm=evt.target;
		Helper.sendChatGeneric(oForm, false);
		return false;
	},

	sendChatGeneric: function(oForm, isMass) {
		var confirm=System.findNode("//input[@name='Helper:ChatConfirm']", oForm).value;
		var msg=System.findNode("//input[@name='Helper:ChatMessage']", oForm).value;
		System.findNode("//input[@name='Helper:ChatMessage']", oForm).value="";

		if (msg=="") {
			Helper.retrieveChat();
			return false;
		}

		sendType = isMass?"Send as Mass":"Send";

		GM_xmlhttpRequest({
			method: 'POST',
			url: System.server + "index.php",
			headers: {
				"User-Agent" : navigator.userAgent,
				"Content-Type": "application/x-www-form-urlencoded",
				"Referer": document.location,
				"Cookie" : document.cookie
			},
			data: "cmd=guild&subcmd=dochat&xc="+confirm+"&msg="+encodeURIComponent(msg)+"&submit="+sendType,
			onload: function() {
				Helper.retrieveChat();
			},
		})
	},

	replaceKeyHandler: function() {
		unsafeWindow.document.onkeypress = null;
		unsafeWindow.document.onkeypress = Helper.keyPress;
	},

	moveMe: function(dx, dy) {
		var pos=Helper.position();
		if (pos) {
			if (pos.type=="normal") {
				window.location = 'index.php?cmd=world&subcmd=move&x=' + (pos.X+dx) + '&y=' + (pos.Y+dy);
			}
			if (pos.type=="worldmap") {
				System.xmlhttp('index.php?cmd=world&subcmd=move&x=' + (pos.X+dx) + '&y=' + (pos.Y+dy), function() {window.location = System.server + "index.php?cmd=world&subcmd=map";});
			}
		}
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

		switch (r) {
		case 113: // nw
			Helper.moveMe(-1,-1)
			break;
		case 119: // n
			Helper.moveMe(0,-1);
			break;
		case 101: // ne
			Helper.moveMe(1,-1);
			break;
		case 97: // w
			Helper.moveMe(-1,0);
			break;
		case 100: // e
			Helper.moveMe(1,0);
			break;
		case 122: // sw
			Helper.moveMe(-1,1);
			break;
		case 120: // s
			Helper.moveMe(0,1);
			break;
		case 99: // se
			Helper.moveMe(1,1);
			break;
		case 114: // repair
			window.location = 'index.php?cmd=blacksmith&subcmd=repairall&fromworld=1';
			break;
		case 103: // create group
			window.location = 'index.php?cmd=guild&subcmd=groups&subcmd2=create&fromworld=1';
			break;
		case 106: // join all group [j]
			window.location = 'index.php?cmd=guild&subcmd=groups&subcmd2=joinall';
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
			var linkObj	= Helper.getMonster(index);
			if (linkObj!=null) {
				var killStyle = GM_getValue("killAllAdvanced");
				//kill style off
				if (killStyle == "off") {
					window.location = linkObj.href
				}
				//kill style single
				if (killStyle == "single") {
					Helper.killSingleMonster(index);
				}1
				//kill style type
				if (killStyle == "type") {
					var monsterType = linkObj.parentNode.parentNode.parentNode.firstChild.nextSibling.nextSibling.innerHTML
					Helper.killSingleMonsterType(monsterType);
				}
			}
			break;
		case 104: // quickheal
			Helper.quickHeal();
			break;
		case 98: // backpack [b]
			window.location = 'index.php?cmd=profile&subcmd=dropitems&fromworld=1';
			break;
		case 19: // quick buffs
			// openWindow("", "fsQuickBuff", 618, 800, ",scrollbars");
			GM_openInTab(System.server + "index.php?cmd=quickbuff");
			break;
		case 48: // return to world
			window.location = 'index.php?cmd=world';
			break;
		case 109: // map
			// window.open('index.php?cmd=world&subcmd=map', 'fsMap');
			// openWindow('index.php?cmd=world&subcmd=map', 'fsMap', 650, 650, ',scrollbars,resizable');
			GM_openInTab(System.server + "index.php?cmd=world&subcmd=map");
			break;
		case 110: // mini map [n]
			Helper.displayMiniMap();
			break;
		case 33: // Shift+1
		case 64: // Shift+2
		case 34: // Shift+2 -- for UK keyboards, I think
		case 35: // Shift+3
		case 36: // Shift+4
		case 37: // Shift+5
			var keyMap = {"key33":1, "key64":2, "key34":2, "key35":3, "key36":4, "key37":5};
			// I'm using "key??" because I don't feel comfortable of naming properties with integers
			var itemIndex = keyMap["key" + r];
			System.xmlhttp("index.php?cmd=profile", Helper.changeCombatSet, itemIndex);
			break;
		case 0: // special key
			switch (s) {
			case 37: // w
				Helper.moveMe(-1,0);
				evt.preventDefault();
				evt.stopPropagation();
				break;
			case 38: // n
				Helper.moveMe(0,-1);
				evt.preventDefault();
				evt.stopPropagation();
				break;
			case 39: // e
				Helper.moveMe(1,0);
				evt.preventDefault();
				evt.stopPropagation();
				break;
			case 40: // s
				Helper.moveMe(0,1);
				evt.preventDefault();
				evt.stopPropagation();
				break;
			case 33:
				if (System.findNode("//div[@id='reportsLog']")) {
					Helper.scrollUpCombatLog();
					evt.preventDefault();
					evt.stopPropagation();
				}
				break;
			case 34:
				if (System.findNode("//div[@id='reportsLog']")) {
					Helper.scrollDownCombatLog();
					evt.preventDefault();
					evt.stopPropagation();
				}
				break;
			default:
				// GM_log('special key: ' +s);
				break;
			}
			break;
		default:
			// GM_log('standard key: ' +r);
			break;
		}
		return true;
	},

	addLogColoring: function(logScreen, dateColumn) {
		if (!GM_getValue("enableLogColoring")) return;
		var lastCheckScreen = "last" + logScreen + "Check";
		var localLastCheckMilli=GM_getValue(lastCheckScreen);
		if (!localLastCheckMilli) localLastCheckMilli=(new Date()).getTime();

		var chatTable = System.findNode("//table[@border='0' and @cellpadding='2' and @width='100%']");

		var localDateMilli = (new Date()).getTime();
		var gmtOffsetMinutes = (new Date()).getTimezoneOffset();
		var gmtOffsetMilli = gmtOffsetMinutes*60*1000;

		var newRow = chatTable.insertRow(1);
		var newCell = newRow.insertCell(0);

		for (var i=1;i<chatTable.rows.length;i++) {
			var aRow = chatTable.rows[i];
			//GM_log(aRow.innerHTML);
			var addBuffTag = true;
			if (aRow.cells[0].innerHTML) {
				//GM_log(aRow.cells[dateColumn].innerHTML);
				var cellContents = aRow.cells[dateColumn].textContent.trim().substring(0,17);
				postDateAsDate = Helper.textDateToDate(cellContents);
				postDateAsLocalMilli = postDateAsDate.getTime() - gmtOffsetMilli;
				postAge = (localDateMilli - postDateAsLocalMilli)/(1000*60);
				if (postDateAsLocalMilli > localLastCheckMilli) {
					aRow.style.backgroundColor = "#151f1e";
				}
				else if (postAge > 20 && postDateAsLocalMilli <= localLastCheckMilli) {
					aRow.style.backgroundColor = "#112322";
					addBuffTag = false;
				}
				if (logScreen == 'Chat' && addBuffTag) {
					var playerIDRE = /player_id=(\d+)/;
					var playerID = playerIDRE.exec(aRow.cells[1].innerHTML)[1];
					aRow.cells[1].innerHTML += " <a style='color:#ADB5B5;font-size:10px;' href=\"javascript:openWindow('index.php?cmd=quickbuff&tid=" + playerID +
						"', 'fsQuickBuff', width=618, height=800, 'scrollbars')\">[b]</a>";
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
		var logTable = System.findNode("//table[@border='0' and @cellpadding='2' and @width='100%']");
		var memberList = System.getValueJSON("memberlist");
		if (!memberList) return;
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
					messageType = firstCell.firstChild.nextSibling.getAttribute("title");
					if (messageType == "Chat") {
						var playerName = aRow.cells[2].firstChild.nextSibling.firstChild.innerHTML;
						if (memberNameString.search(playerName) !=-1) {
							aRow.cells[2].firstChild.nextSibling.firstChild.style.color="green";
							isGuildmate = true;
						}
						var messageHTML = aRow.cells[2].innerHTML;
						var firstPart = messageHTML.split(">Reply</a>")[0];
						var secondPart = messageHTML.split(">Reply</a>")[1];
						var extraPart = " | <a href='index.php?cmd=trade&target_player=" + playerName + "'>Trade</a> | " +
							"<a title='Secure Trade' href='index.php?cmd=trade&subcmd=createsecure&target_username=" + playerName +
							"'>ST</a> | <a title='Add to Ignore List' href='index.php?cmd=log&subcmd=doaddignore&ignore_username=" + playerName +
							"'>Ignore</a>";

						aRow.cells[2].innerHTML = firstPart + ">Reply</a>" + extraPart + secondPart;

						isGuildmate = false;
					}
					if (aRow.cells[2].innerHTML.search("activated") != -1 && aRow.cells[2].getAttribute("width") == "80%") {
						var buffingPlayerIDRE = /player_id=(\d+)/;
						var buffingPlayerID = buffingPlayerIDRE.exec(aRow.cells[2].innerHTML)[1];
						var buffingPlayerName = aRow.cells[2].firstChild.nextSibling.firstChild.nextSibling.innerHTML;
						aRow.cells[2].innerHTML += " <span style='font-size:x-small;'>[ <a href='index.php?cmd=message&target_player=" + buffingPlayerName +
							"'>Reply</a> | <a href='index.php?cmd=trade&target_player=" + buffingPlayerName +
							"'>Trade</a> | <a title='Secure Trade' href='index.php?cmd=trade&subcmd=createsecure&target_username=" + buffingPlayerName +
							"'>ST</a> | <a title='Add to Ignore List' href='index.php?cmd=log&subcmd=doaddignore&ignore_username=" + playerName +
							"'>Ignore</a> | <a href=\"javascript:openWindow('index.php?cmd=quickbuff&tid=" + buffingPlayerID +
							"', 'fsQuickBuff', width=618, height=800, 'scrollbars')\">Buff</a> ]</span>";
				}
			}
			}
			else {
				var messageNameCell = aRow.firstChild.nextSibling.nextSibling.nextSibling;
				messageNameCell.innerHTML += "&nbsp;&nbsp;<span style='color:white;'>(Faction mates show up in <span style='color:green;'>green</span>)</span>"
			}

		}
	},

	addGuildLogWidgets: function() {
		if (!GM_getValue("hideNonPlayerGuildLogMessages")) return;
		var playerId=Layout.playerId();
		var logTable = System.findNode("//table[@border='0' and @cellpadding='2' and @width='100%']");
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
				messageNameCell.innerHTML += "&nbsp;&nbsp;<font style='color:white;'>(Faction Log messages not involving self are dimmed!)</font>"
			}

		}
	},

	injectGuildList: function(memberList) {
		var oldMemberList = System.getValueJSON("oldmemberlist");
		if (!oldMemberList) oldMemberList=memberList;

		var oldIds=oldMemberList.members
			.filterBy("status", "Online")
			.map(function(element, index, array) {return element.id});

		var playerId = Layout.playerId();
		GM_setValue("memberlist", JSON.stringify(memberList));
		var injectHere = document.getElementById("Helper:GuildListPlaceholder");
		// injectHere.innerHTML=memberList.length;
		var displayList = document.createElement("TABLE");
		displayList.style.border = "1px solid gray";
		displayList.style.backgroundColor = (memberList.isRefreshed)?"#151f1e":"#112322";
		displayList.cellPadding = 1;
		displayList.width = 125;

		var aRow=displayList.insertRow(displayList.rows.length);
		var aCell=aRow.insertCell(0);
		var output = "<ol style='color:#FFF380;font-size:10px;list-style-type:decimal;margin-left:1px;margin-top:1px;margin-bottom:1px;padding-left:20px;'>Faction Members";
		for (var i=0;i<memberList.members.length;i++) {
			var member=memberList.members[i];
			if (member.status=="Online") {
				if (memberList.isRefreshed) {
					Helper.getFullPlayerData(member);
				}
				output += "<li style='padding-bottom:0px;'>"
				output += "<a style='color:#CCFF99;font-size:10px;' "
				output += "href=\"javascript:openWindow('index.php?cmd=quickbuff&tid=" + member.id + "', 'fsQuickBuff', width=618, height=800, 'scrollbars')\">[b]</a>&nbsp;";
				if (member.id!=playerId) {
					output += "<a style=\"color:#A0CFEC;font-size:10px;\" "
					output += "href=\"" + System.server + "index.php?cmd=message&target_player=" + member.name + "\">[m]";
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
				output += " href='" + System.server + "index.php?cmd=profile&player_id=" + member.id + "'>" + member.name + "</a>";
				// output += "<br/>"
				output += "</li>"
			}
			else {
				member.loggedIn=0;
			}
		}
		output += "</ol>";
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
		System.xmlhttp("index.php?cmd=profile&player_id=" + member.id, Helper.parsePlayerData, member.id);
	},

	parsePlayerData: function(responseText, memberId) {
		// return;
		var doc=System.createDocument(responseText)
		// var statistics = System.findNode("//table[contains(tr/td/b,'Level:')]",0,doc);
		var statistics = System.findNode("//table[contains(tbody/tr/td/b,'Level:')]",0,doc);
		var levelNode = System.findNode("//td[contains(b,'Level:')]",0,statistics);
		var levelValue = levelNode.nextSibling.innerHTML;
		GM_log(levelValue);
		// GM_log(statistics.innerHTML); //parentNode.parentNode.nextSibling.nextSibling.nextSibling.innerHTML);
	},

	injectBank: function() {
		var injectHere;
		var bank = System.findNode("//b[contains(.,'Bank')]");
		if (bank) {
			bank.innerHTML+="<br><a href='/index.php?cmd=guild&subcmd=bank'>Faction Bank</a>";
		}
	},

	injectAuctionHouse: function() {
		var isAuctionPage = System.findNode("//td[contains(@background,'header_tradehub.jpg')]");
		var imageCell = isAuctionPage.parentNode;
		var imageHTML = imageCell.innerHTML; //hold on to this for later.

		var auctionTable = System.findNode("//td[contains(@background,'header_tradehub.jpg')]/../../..");

		//Add functionality to hide the text block at the top.
		var textRow = auctionTable.rows[1];
		textRow.id = 'auctionTextControl';
		var myBidsButton = System.findNode("//input[@value='My Bids']/..");
		myBidsButton.innerHTML += " [ <span style='cursor:pointer; text-decoration:underline;' " +
			"id='toggleAuctionTextControl' linkto='auctionTextControl' title='Click on this to Show/Hide the AH text.'>X</span> ]";
		if (GM_getValue("auctionTextControl")) {
			textRow.style.display = "none";
			textRow.style.visibility = "hidden";
		}
		document.getElementById('toggleAuctionTextControl').addEventListener('click', Helper.toggleVisibilty, true);

		//fix button class and add go to first and last
		var prevButton = System.findNode("//input[@value='<']");
		var nextButton = System.findNode("//input[@value='>']");
		if (prevButton) {
			prevButton.setAttribute("class", "custombutton");
			var startButton = document.createElement("input");
			startButton.setAttribute("type", "button");
			startButton.setAttribute("onclick", prevButton.getAttribute("onclick").replace(/\&page=[0-9]*/, "&page=1"));
			startButton.setAttribute("class", "custombutton");
			startButton.setAttribute("value", "<<");
			prevButton.parentNode.insertBefore(startButton,prevButton);
		};
		if (nextButton) {
			nextButton.setAttribute("class", "custombutton");
			var lastPageNode=System.findNode("//input[@value='Go']/../preceding-sibling::td");
			lastPage = lastPageNode.textContent.replace(/\D/g,"");
			var finishButton = document.createElement("input");
			finishButton.setAttribute("type", "button");
			finishButton.setAttribute("onclick", nextButton.getAttribute("onclick").replace(/\&page=[0-9]*/, "&page=" + lastPage));
			finishButton.setAttribute("class", "custombutton");
			finishButton.setAttribute("value", ">>");
			nextButton.parentNode.insertBefore(finishButton, nextButton.nextSibling);
		};

		//insert another page change block at the top of the screen.
		var insertPageChangeBlockHere = auctionTable.rows[4].cells[0];
		insertPageChangeBlockHere.parentNode.parentNode.parentNode.cellPadding = 0;

		// auctionTable.setAttribute("background", "red");
		var pageChangeBlock = System.findNode("//input[@name='page' and @class='custominput']/../../../../../..");
		var newPageChangeBlock = pageChangeBlock.innerHTML.replace('</form>','');
		newPageChangeBlock += "</form>"
		var insertPageChangeBlock=document.createElement("SPAN");
		insertPageChangeBlock.innerHTML = newPageChangeBlock;

		insertPageChangeBlockHere.align = "right";
		insertPageChangeBlockHere.appendChild(insertPageChangeBlock);
		var potions = System.getValueJSON("potions");

		if (!potions) {
			potions = Data.potionList();
		}

		//GM_log(JSON.stringify(potions));
		/*
		var finalHTML = "<span style='font-size:x-small; color:blue;'><table><tbody><tr><td rowspan='7'>" + imageHTML + "</td>" +
			"<td colspan='3' style='text-align:center;color:#7D2252;background-color:#110011'>Quick Potion Search</td></tr>"
		var lp=0;
		var rowCount = 0;
		for (var p=0;p<potions.length;p++) {
			var pot=potions[p];
			if (lp % 3==0) {
				finalHTML += "<tr>";
				rowCount++;
			}
			if (rowCount == 7 && lp % 3==0) {
				finalHTML += "<td><span style='text-align:center;color:#7D2252;background-color:#110011'>Quick Plant Search</span>" +
					" <span style='cursor:pointer;text-decoration:underline;color:#7D2252' cat='quickPotionSearch' " +
						"searchtext='Blood Bloom' title='Blood Bloom Plant'>Blood Bloom</span> |" +
					" <span style='cursor:pointer;text-decoration:underline;color:#7D2252' cat='quickPotionSearch' " +
						"searchtext='Jademare' title='Jademare Plant'>Jademare</span> |" +
					" <span style='cursor:pointer;text-decoration:underline;color:#7D2252' cat='quickPotionSearch' " +
						"searchtext='Dark Shade' title='Dark Shade Plant'>Dark Shade</span> |" +
					" <span style='cursor:pointer;text-decoration:underline;color:#7D2252' cat='quickPotionSearch' " +
						"searchtext='Trinettle' title='Trinettle Plant'>Trinettle</span> |" +
					" <span style='cursor:pointer;text-decoration:underline;color:#7D2252' cat='quickPotionSearch' " +
						"searchtext='Heffle Wart' title='Heffle Wart Plant'>Heffle Wart</span> |" +
					" <span style='cursor:pointer;text-decoration:underline;color:#7D2252' cat='quickPotionSearch' " +
						"searchtext='Amber' title='Amber Plant'>Amber</span>" +
					"</td>";
			}
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
		*/
		// imageCell.innerHTML = finalHTML;

		/*
		var quickSearchList = System.findNodes("//span[@cat='quickPotionSearch']");
		for (var i=0; i<quickSearchList.length; i++) {
			quickSearchItem = quickSearchList[i];
			quickSearchItem.addEventListener('click', Helper.quickAuctionSearch, true);
		}
		*/

		var allItems = document.getElementsByTagName("IMG");
		for (var i=0; i<allItems.length; i++) {
			anItem = allItems[i];
			if (anItem.src.search("items") != -1) {
				var theImage = anItem;
				System.xmlhttp(Helper.linkFromMouseover(anItem.getAttribute("onmouseover")),
					function(responseText, callback) {
						var craft="";
						if (responseText.search(/Uncrafted|Very Poor|Poor|Average|Good|Very Good|Excellent|Perfect/) != -1){
							var fontLineRE=/<\/b><\/font><br>([^<]+)(<font color='(#[0-9A-F]{6})'>[^<]+<\/font>)/;
							var fontLineRX=fontLineRE.exec(responseText);
							craft = fontLineRX[2];
						}
						var forgeCount=0, re=/hellforge\/forgelevel.gif/ig;
						while(re.exec(responseText)) {
							forgeCount++;
						}
						Helper.injectAuctionExtraText(this.callback,craft,forgeCount);
					},
					theImage);
			}
		}
		var minBidLink = System.findNode("//a[contains(@href,'&order_by=1')]");
		var auctionTable = minBidLink.parentNode.parentNode.parentNode.parentNode;

		var playerId = Layout.playerId();

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
						var isGold = winningBidTable.rows[0].cells[1].firstChild.getAttribute("title")=="Credits";
						var winningBidValue = System.intValue(winningBidCell.textContent);
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
					var bidValue = parseInt(bidCell.textContent);
					var buyoutCell = bidBuyoutTable.rows[0].cells[3];
					var buyoutHTML = buyoutCell.innerHTML;
					if (winningBidValue != "-" && !bidExistsOnItem && !playerListedItem) {
						var overBid = isGold?Math.ceil(winningBidValue * 1.05):(winningBidValue+1);
						winningBidBuyoutCell.innerHTML = '<br><span style="color:#ADB5B5;" title="Overbid value">Overbid ' + System.addCommas(overBid) + '</span>&nbsp';
					}
					if (winningBidValue == "-" && !bidExistsOnItem && !playerListedItem) {
						bidMinBuyoutCell.innerHTML = '<span style="color:#ADB5B5; cursor:pointer; text-decoration:underline;" findme="bidOnItem" linkto="auction' +
							i + 'text" title="Click to bid on this item" bidvalue="' + bidValue + '">Bid Now</span>&nbsp';
					}
					var buyoutValue = "-";
					if (buyoutHTML != "-" && !playerListedItem) {
						newCell.innerHTML = "&nbsp/&nbsp";
						buyoutValue = (buyoutCell.textContent)*1;
						buyNowBuyoutCell.innerHTML = '&nbsp<span style="color:#ADB5B5; cursor:pointer; text-decoration:underline;" findme="bidOnItem" linkto="auction' +
							i + 'text" title="Click to buy this item now!" bidvalue="' + buyoutValue + '">Buy Now</span>';
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
		var bidOnItemList = System.findNodes("//span[@findme='bidOnItem']");
		if (bidOnItemList) {
			for (var i=0; i<bidOnItemList.length; i++) {
				bidOnItemItem = bidOnItemList[i];
				bidOnItemItem.addEventListener('click', Helper.bidOnItem, true);
			}
		}

		var searchPrefs = System.findNode("//a[contains(@href, 'cmd=auctionhouse&subcmd=preferences')]");
		var preparePreferences = System.findNode("//a[contains(@href, 'cmd=auctionhouse&subcmd=preferences')]/../../../..");
		searchPrefs.setAttribute("href", "#prefs");

		var newRow = document.createElement("TR");
		var newCell = newRow.insertCell(0);
		newCell.setAttribute("colspan", 5);

		newCell.innerHTML = '<div id="Helper:AuctionHousePreferences" style="font-size:xx-small;text-align:right;visibility:hidden;display:none;">' +
			'<form onsubmit="return false;">' +
			'&nbsp;Min: <input type=text size=3 style="font-size:xx-small" class=custominput name=pref_minlevel value="wait" />' +
			'&nbsp;Max: <input type=text size=3 style="font-size:xx-small" class=custominput name=pref_maxlevel value="wait" />' +
			'&nbsp;Gold: <input type=checkbox style="font-size:xx-small" class=custominput name=pref_hidegold value="1" />' +
			'&nbsp;FSP: <input type=checkbox style="font-size:xx-small" class=custominput name=pref_hidefsp value="1" />' +
			'<input type=submit class=custombutton id="Helper:AuctionHouseSavePreferences" value="Save" /></form></div>';

		// preparePreferences.appendChild(prefArea);
		preparePreferences.appendChild(newRow);

		searchPrefs.addEventListener("click", Helper.auctionHouseTogglePreferences, true);
		document.getElementById("Helper:AuctionHouseSavePreferences").addEventListener("click", Helper.auctionHouseSavePreferences, true);
	},

	auctionHouseTogglePreferences: function(evt) {
		var prefArea = document.getElementById("Helper:AuctionHousePreferences");
		if (prefArea.style.display!="none") {
			prefArea.style.visibility="hidden";
			prefArea.style.display="none";
		} else {
			prefArea.style.visibility="visible";
			prefArea.style.display="block";
		}
		if (prefArea.getAttribute("populated")!="done") {
			System.xmlhttp('index.php?cmd=auctionhouse&subcmd=preferences', Helper.auctionHouseGetPreferences)
		}
		return false;
	},

	auctionHouseGetPreferences: function(responseText) {
		var doc=System.createDocument(responseText);
		var minLevel = System.findNode("//input[@name='pref_minlevel']", doc).value;
		var maxLevel = System.findNode("//input[@name='pref_maxlevel']", doc).value;
		var hideGold = System.findNode("//input[@name='pref_hidegold']", doc).checked;
		var hideFsp = System.findNode("//input[@name='pref_hidefsp']", doc).checked;
		var prefArea = document.createElement("DIV");

		System.findNode("//input[@name='pref_minlevel']").value   = minLevel;
		System.findNode("//input[@name='pref_maxlevel']").value   = maxLevel;
		System.findNode("//input[@name='pref_hidegold']").checked = hideGold;
		System.findNode("//input[@name='pref_hidefsp']").checked   = hideFsp;
		document.getElementById("Helper:AuctionHousePreferences").setAttribute("populated", "done");
	},

	auctionHouseSavePreferences: function(evt) {
		var minLevel = System.findNode("//input[@name='pref_minlevel']").value;
		var maxLevel = System.findNode("//input[@name='pref_maxlevel']").value;
		var hideGold = System.findNode("//input[@name='pref_hidegold']").checked;
		var hideFsp = System.findNode("//input[@name='pref_hidefsp']").checked;

		var submitButton=document.getElementById("Helper:AuctionHouseSavePreferences")
		submitButton.disabled=true;
		submitButton.value="Saving..."

		var postData = "cmd=auctionhouse&subcmd=savepreferences" +
				"&pref_minlevel=" + minLevel +
				"&pref_maxlevel=" + maxLevel +
				(hideGold?"&pref_hidegold=1":"") +
				(hideFsp?"&pref_hidefsp=1":"")

		GM_xmlhttpRequest({
			method: 'POST',
			url: System.server + "index.php",
			headers: {
				"User-Agent" : navigator.userAgent,
				"Referer": System.server + "index.php?cmd=auctionhouse&subcmd=preferences",
				"Cookie" : document.cookie,
				"Content-Type": "application/x-www-form-urlencoded",
			},
			data: postData,
			onload: function(responseDetails) {
				Helper.auctionHouseSavePreferencesDone(responseDetails.responseText);
			},
		})
	},

	auctionHouseSavePreferencesDone: function(responseText) {
		var submitButton=document.getElementById("Helper:AuctionHouseSavePreferences")
		submitButton.disabled=false;
		submitButton.value="Save";
		submitButton.blur();
	},

	quickAuctionSearch: function(evt) {
		var searchText = evt.target.getAttribute("searchtext");
		GM_log(searchText);
		var searchInputTextField = System.findNode("//input[@name='search_text' and @class='custominput']");
		searchInputTextField.value = searchText;
		thisForm = searchInputTextField.form;
		thisForm.submit();
	},

	bidOnItem: function(evt) {
		var bidValue = evt.target.getAttribute("bidvalue");
		var auctionLink = evt.target.getAttribute("linkto");
		var textInput = System.findNode("//input[@id='" + auctionLink + "']");
		textInput.value = bidValue;
		thisForm = textInput.form;
		thisForm.submit();
	},

	injectAuctionExtraText: function(anItem, craft, forgeCount) {
		var theText=anItem.parentNode.nextSibling.nextSibling;
		var preText = "<span style='color:#ADB5B5'>" + craft + "</span>";
		if (forgeCount != 0) {
			preText +=  " " + forgeCount + "<img src='" + System.imageServer + "/hellforge/forgelevel.gif'>"
		}
		theText.innerHTML = preText + "<br>" + theText.innerHTML;
	},

	toggleShowExtraLinks: function(evt) {
		var showExtraLinksElement = System.findNode("//span[@id='Helper:showExtraLinks']");
		if (showExtraLinksElement.textContent == "Show AH and Sell links") {
			GM_setValue("showExtraLinks", true);
		} else {
			GM_setValue("showExtraLinks", false);
		}
		window.location = window.location;
	},

	injectReportPaint: function() {
		var mainTable = System.findNode("//table[@width='600']");
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
				document.getElementById('recallItem' + itemID).addEventListener('click', Helper.recallItem, true);
			}
		}

		//Get the list of online members
		var memberList = System.getValueJSON("memberlist");

		var injectHere, searchString;
		for (var i=0;i<memberList.members.length;i++) {
			var member=memberList.members[i];
			if (member.status=="Online") {
				var player=System.findNode("//b[contains(., '" + member.name + "')]");
				if (player) {
					player.innerHTML = "<span style='font-size:large; color:green;'>[Online]</span> <a href='" +
						System.server + "index.php?cmd=profile&player_id=" + member.id + "'>" + player.innerHTML + "</a>";
					player.innerHTML += " [ <a href='index.php?cmd=message&target_player=" + member.name + ">m</a> ]";
				}
			}
			else {
				var player=System.findNode("//b[contains(., '" + member.name + "')]");
				if (player) {
					player.innerHTML = "<a href='" +
						System.server + "index.php?cmd=profile&player_id=" + member.id + "'>" + player.innerHTML + "</a>";
				}
			}
		}
	},

	recallItem: function(evt) {
		var itemID=evt.target.getAttribute("itemID");
		var playerID=evt.target.getAttribute("playerID");
		System.xmlhttp("index.php?cmd=guild&subcmd=inventory&subcmd2=recall&id=" + itemID + "&player_id=" + playerID, Helper.recallItemReturnMessage, {"item": itemID, "target": evt.target});
	},

	recallItemReturnMessage: function(responseText, callback) {
		var itemID = callback.item;
		var target = callback.target;
		var info = Layout.infoBox(responseText);
		var itemCellElement = target.parentNode; //System.findNode("//td[@title='" + itemID + "']");
		if (info!="") {
			itemCellElement.innerHTML += " <span style='color:red; font-weight:bold;'>" + info + "</span>";
		} else {
			itemCellElement.innerHTML += " <span style='color:green; font-weight:bold;'>" + info + "</span>";
		}
	},

	changeCombatSet: function(responseText, itemIndex) {
		var doc=System.createDocument(responseText);

		GM_log(responseText);

		var cbsSelect = System.findNode("//select[@name='combatSetId']", doc);

		// find the combat set id value
		var allItems = cbsSelect.getElementsByTagName("option");
		if (itemIndex >= allItems.length) return;
		var cbsIndex = allItems[itemIndex].value;

		GM_xmlhttpRequest({
				method: 'POST',
				url: System.server + "index.php",
				headers: {
					"User-Agent" : navigator.userAgent,
					"Content-Type": "application/x-www-form-urlencoded",
					"Referer": System.server + "index.php?cmd=profile",
					"Cookie" : document.cookie
				},
				data: "cmd=profile&subcmd=managecombatset&combatSetId="+cbsIndex+"&submit=Use",
				onload: function() {
					window.location="index.php?cmd=profile";
				},
		})
	},

	injectDropItems: function() {
		var mainTable = System.findNode("//table[@width='100%']");
		if (mainTable) {
			var insertHere = mainTable.rows[5].cells[0];
			insertHere.innerHTML += '<span style="cursor:pointer; text-decoration:underline;" id="Helper:showExtraLinks">' +
				(GM_getValue("showExtraLinks")?'Hide':'Show') + ' AH and Sell links</span>';
		document.getElementById("Helper:showExtraLinks").addEventListener('click', Helper.toggleShowExtraLinks, true);
		}

		//function to add links to all the items in the drop items list
		if (GM_getValue("showExtraLinks")) {
			var itemName, itemInvId, theTextNode, newLink;
			var allItems=System.findNodes("//input[@type='checkbox']");
			if (allItems) {
				for (var i=0; i<allItems.length; i++) {
					anItem = allItems[i];
					itemInvId = anItem.value;
					theTextNode = System.findNode("../../td[3]", anItem);
					itemName = theTextNode.innerHTML.replace(/\&nbsp;/i,"");
					var findItems = System.findNodes("//td[@width='90%' and contains(.,'"+itemName+"')]");
					theTextNode.innerHTML = "<span findme='AH'>[<a href='" + System.server + "?cmd=auctionhouse&type=-1&order_by=1&search_text="
						+ escape(itemName)
						+ "'>AH</a>]</span> "
						+ "<span findme='Sell'>[<a href='" + System.server + "index.php?cmd=auctionhouse&subcmd=create2&inv_id=" + itemInvId + "'>"
						+ "Sell</a>]</span> "
						+ theTextNode.innerHTML
						+ ((findItems.length>1)?' [<span findme="checkall" linkto="'+itemName+'" style="text-decoration:underline;cursor:pointer">Check all</span>]':'');
				}
			}
		}

		var checkAllElements = System.findNodes("//span[@findme='checkall']");
		if (checkAllElements) {
			for (var i=0; i<checkAllElements.length; i++) {
				checkAllElement = checkAllElements[i];
				itemName = checkAllElement.linkto;
				checkAllElement.addEventListener('click', Helper.checkAll, true);
			}
		}

		var allItems = System.findNodes("//input[@type='checkbox']");
		if (allItems) {
			for (var i=0; i<allItems.length; i++) {
				anItem = allItems[i];
				theLocation=anItem.parentNode.nextSibling.nextSibling;
				theImage=anItem.parentNode.nextSibling.firstChild.firstChild;
				System.xmlhttp(Helper.linkFromMouseover(theImage.getAttribute("onmouseover")), Helper.injectDropItemsPaint, theImage);
			}
		}
	},

	checkAll: function(evt){
		var itemName = evt.target.getAttribute("linkto");
		var findItems = System.findNodes("//td[@width='90%' and contains(.,'"+itemName+"')]");
		for (var i=0; i<findItems.length; i++) {
			var item = findItems[i];
			var checkboxForItem = item.previousSibling.previousSibling.firstChild;
			if (checkboxForItem.checked) {
				checkboxForItem.checked = false;
			} else {
				checkboxForItem.checked = true;
			}

		}
	},

	injectDropItemsPaint: function(responseText, callback) {
		var textNode = System.findNode("../../../td[3]", callback);
		var auctionHouseLink=System.findNode("span[@findme='AH']", textNode);
		var sellLink=System.findNode("span[@findme='Sell']", textNode);
		var guildLockedRE = /<center>Faction Locked: <font color="#00FF00">/i;
		if (guildLockedRE.exec(responseText)) {
			if (auctionHouseLink) auctionHouseLink.style.visibility='hidden';
			if (sellLink) sellLink.style.visibility='hidden';
		};
		//<font color='cyan'>Bound (Non-Tradable)</font></b> <font color='orange'>Quest Item </font></center>
		var boundItemRE = /Bound \(Non-Tradable\)/i;
		if (boundItemRE.exec(responseText)) {
			if (auctionHouseLink) auctionHouseLink.style.visibility='hidden';
			if (sellLink) sellLink.style.visibility='hidden';
		};
		if (GM_getValue("disableItemColoring")) return;
		var fontLineRE=/<center><font color='(#[0-9A-F]{6})' size=2>/i;
		var fontLineRX=fontLineRE.exec(responseText);
		var color=fontLineRX[1];
		if (color=="#FFFFFF") {
			var fontLineRE2=/<br>\s*<font color='([a-z]+)'>/i;
			var fontLineRX2=fontLineRE2.exec(responseText);
			if (fontLineRX2) {
				color=fontLineRX2[1];
			}
		}
		if (color=="#40FFFF") color="#00A0A0";
		if (color=="orange") color="#FF6000";
		if (color=="#00FF00") color="#00B000";
		textNode.style.color=color;
	},

	injectProfile: function() {
		// add avatar img element with player name in title
		// so that the page is similar to FS
		var playerArea = System.findNode("//font[contains(.,'Last Activity')]");
		var playerName = playerArea.parentNode.firstChild.nextSibling.textContent.replace(/^= /,"").replace(/ =$/,"");
		playerArea.parentNode.innerHTML = "<img title=\"" + playerName + "'s Avatar\" src='' style='display:none'>" + playerArea.parentNode.innerHTML;

		var allLinks = document.getElementsByTagName("A");
		for (var i=0; i<allLinks.length; i++) {
			aLink=allLinks[i];
			if (aLink.href.search("cmd=guild&subcmd=view") != -1) {
				var guildIdResult = /guild_id=([0-9]+)/i.exec(aLink.href);
				if (guildIdResult) var guildId = parseInt(guildIdResult[1], 10);
				var warning = document.createElement('span');
				var color = "";
				var changeAppearance = true;
				var relationship = Helper.guildRelationship(aLink.text)
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

		var player = System.findNode("//textarea[@id='holdtext']");
		var avyrow = System.findNode("//img[contains(@title, 's Avatar')]");
		var playeridRE = document.URL.match(/player_id=(\d+)/);
		if (playeridRE) var playerid=playeridRE[1];
		var idindex, newhtml;

		if (player) {
			if (!playerid) {
				playerid = player.innerHTML;
				idindex = playerid.indexOf("?ref=") + 5;
				playerid = playerid.substr(idindex);
			}

			var playeravy = avyrow.parentNode.firstChild ;
			while ((playeravy.nodeType == 3)&&(!/\S/.test(playeravy.nodeValue))) {
				playeravy = playeravy.nextSibling ;
			}
			var playername = playeravy.getAttribute("title");
			playeravy.style.borderStyle="none";
			playername = playername.substr(0, playername.indexOf("'s Avatar"));

			var auctiontext = "Go to " + playername + "'s auctions" ;
			var ranktext = "Rank " +playername + "" ;
			var securetradetext = "Create Secure Trade to " + playername;

			newhtml = avyrow.parentNode.innerHTML + "</td></tr><tr><td align='center' colspan='2'>" ;
			newhtml += "<a href='javaScript:quickBuff(" + playerid ;
			newhtml += ");'><img alt='Buff " + playername + "' title='Buff " + playername + "' src=" ;
			newhtml += System.imageServer + "/skin/realm/icon_action_quickbuff.gif></a>&nbsp;&nbsp;" ;
			newhtml += "<a href='" + System.server + "index.php?cmd=guild&subcmd=groups&subcmd2=joinall" ;
			newhtml += "');'><img alt='Join All Groups' title='Join All Groups' src=" ;
			newhtml += System.imageServer + "/skin/icon_action_join.gif></a>&nbsp;&nbsp;" ;
			newhtml += "<a href=" + System.server + "?cmd=auctionhouse&type=-3&tid=" ;
			newhtml += playerid + '><img alt="' + auctiontext + '" title="' + auctiontext + '" src="';
			newhtml += System.imageServer + '/skin/gold_button.gif"></a>&nbsp;&nbsp;';
			newhtml += "<a href=" + System.server + "index.php?cmd=trade&subcmd=createsecure&target_username=" ;
			newhtml += playername + '><img alt="' + securetradetext + '" title="' + securetradetext + '" src=';
			newhtml += System.imageServer + "/temple/2.gif></a>&nbsp;&nbsp;";
			if (relationship == "self" && GM_getValue("showAdmin")) {
				newhtml += "<a href='" + System.server + "index.php?cmd=guild&subcmd=members&subcmd2=changerank&member_id=" ;
				newhtml += playerid + '><img alt="' + ranktext + '" title="' + ranktext + '" src=';
				newhtml += System.imageServer + "/guilds/" + guildId + "_mini.jpg></a>" ;
			}
			avyrow.parentNode.innerHTML = newhtml ;
		}

		var isSelfRE=/player_id=/.exec(document.location.search);
		if (!isSelfRE) { // self inventory
			// Allies/Enemies count/total function
			var alliesTotal = GM_getValue("alliestotal");
			var alliesParent = System.findNode("//b[.='Allies']/..");;
			var alliesTable = alliesParent.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling.nextSibling.nextSibling.nextSibling;
			var numberOfAllies = 0;
			var startIndex = 0;
			while (alliesTable.innerHTML.indexOf("/avatars/", startIndex+1) != -1) {
				numberOfAllies ++;
				startIndex = alliesTable.innerHTML.indexOf("/avatars/",startIndex+1);
			}
			startIndex = 0;
			while (alliesTable.innerHTML.indexOf("/skin/player_default.jpg", startIndex+1) != -1) {
				numberOfAllies ++;
				startIndex = alliesTable.innerHTML.indexOf("/skin/player_default.jpg",startIndex+1);
			}
			alliesParent.innerHTML += "&nbsp<span style='color:#ADB5B5'>" + numberOfAllies + "</span>";
			if (alliesTotal && alliesTotal >= numberOfAllies) {
				alliesParent.innerHTML += "/<span style='color:#ADB5B5' findme='alliestotal'>" + alliesTotal + "</span>";
			}
			var enemiesTotal = GM_getValue("enemiestotal");
			var enemiesParent = System.findNode("//b[.='Enemies']/..");
			var enemiesTable = enemiesParent.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling.nextSibling.nextSibling.nextSibling;
			var numberOfEnemies = 0;
			var startIndex = 0;
			while (enemiesTable.innerHTML.indexOf("/avatars/", startIndex+1) != -1) {
				numberOfEnemies ++;
				startIndex = enemiesTable.innerHTML.indexOf("/avatars/",startIndex+1);
			}
			var startIndex = 0;
			while (enemiesTable.innerHTML.indexOf("/skin/player_default.jpg", startIndex+1) != -1) {
				numberOfEnemies ++;
				startIndex = enemiesTable.innerHTML.indexOf("/skin/player_default.jpg",startIndex+1);
			}
			enemiesParent.innerHTML += "&nbsp;<span style='color:#ADB5B5'>" + numberOfEnemies + "</span>";
			if (enemiesTotal && enemiesTotal >= numberOfEnemies) {
				enemiesParent.innerHTML += "/<span style='color:#ADB5B5' findme='enemiestotal'>" + enemiesTotal + "</span>";
			}
		}
	},

	injectQuestManager: function() {
		var content=Layout.notebookContent();
		content.innerHTML='<table cellspacing="0" cellpadding="0" border="0" width="100%">'+
			'<tr><td colspan="2" nobr bgcolor="#110011"><b>&nbsp;Mission Manager</b></td></tr>'+
			'<tr><td><b>&nbsp;Show Completed Quests <input id="Helper:showCompletedQuests" type="checkbox"' +
				(GM_getValue("showCompletedQuests")?' checked':'') + '/></b></td></tr>'+
			'</table>' +
			'<div style="font-size:small;" id="Helper:QuestManagerOutput">' +
			'Loading mission log...' +
			'</div>';
		Data.questMatrix();
		Helper.parseQuestBookStart(0);
		// Helper.injectQuestTable();
	},

	parseQuestBookStart: function(questPage) {
		System.xmlhttp("index.php?cmd=questbook&page=" + questPage, Helper.parseQuestBookDone, {"page": questPage});
	},

	parseQuestBookDone: function(responseText, callback) {
		var questPage=System.createDocument(responseText);
		var currentPage=callback.page;
		document.getElementById("Helper:QuestManagerOutput").innerHTML+="<br/>Loaded page " + (currentPage+1);
		var pages=System.findNode("//select[@name='page']", questPage);
		if (!pages) return;

		var questRows=System.findNodes("//a[contains(@href,'subcmd=viewquest')]/../..", questPage);
		var questStatus = new Array();
		var questHref = new Array();

		for (var i=0; i<questRows.length; i++) {
			var questRow=questRows[i];
			var questPageQuestName = questRow.cells[0].textContent.replace(/  /g," ");
			questStatus[questPageQuestName]=questRow.cells[1].firstChild.getAttribute("title");
			questHref[questPageQuestName]=questRow.cells[0].firstChild.getAttribute("href");
		}

		for (i=0; i<Data.questArray.length; i++) {
			if (questStatus[Data.questArray[i].questName]!=undefined) {
				Data.questArray[i].status=questStatus[Data.questArray[i].questName];
			}
			if (questHref[Data.questArray[i].questName]!=undefined) {
				Data.questArray[i].href=questHref[Data.questArray[i].questName];
			}
		}

		var nextPage=currentPage+1; //pages[currentPage];
		if (nextPage<pages.options.length) {
			Helper.parseQuestBookStart(nextPage)
		}
		else {
			Helper.injectQuestTable();
		}
	},

	injectQuestTable: function() {
		document.getElementById('Helper:QuestManagerOutput').innerHTML = Helper.generateQuestTable();
		var questTable=document.getElementById('Helper:QuestTable');
		for (var i=0; i<questTable.rows[0].cells.length; i++) {
			var cell=questTable.rows[0].cells[i];
			cell.style.textDecoration="underline";
			cell.style.cursor="pointer";
			cell.addEventListener('click', Helper.sortQuestTable, true);
		}
		document.getElementById("Helper:showCompletedQuests").addEventListener('click', Helper.toggleShowHiddenQuests, true);
	},

	toggleShowHiddenQuests: function(evt) {
		GM_setValue("showCompletedQuests", evt.target.checked);
		Helper.injectQuestTable();
	},

	sortQuestTable: function(evt) {
		var headerClicked=evt.target.getAttribute("sortKey");

		if (Helper.sortAsc==undefined) Helper.sortAsc=true;
		if (Helper.sortBy && Helper.sortBy==headerClicked) {
			Helper.sortAsc=!Helper.sortAsc;
		}
		Helper.sortBy=headerClicked;

		GM_log(headerClicked)

		if (headerClicked=="level") {
			Data.questArray.sort(Helper.numberSort);
		}
		else if (headerClicked=="status") {
			Data.questArray.sort(Helper.questStatusSort);
		}
		else {
			Data.questArray.sort(Helper.stringSort);
		}
		Helper.injectQuestTable();
	},

	generateQuestTable: function() {
		var quests = Data.questMatrix();
		var q, bgColor;
		//GM_log(Helper.characterLevel);
		var hideQuests=[];
		if (GM_getValue("hideQuests")) hideQuests=GM_getValue("hideQuestNames").split(",");
		var output='<br/><table border=0 cellpadding=0 cellspacing=0 width=100% id="Helper:QuestTable">';
		output += '<tr style="background-color:#110011;"><th sortkey="questName">Name</th>' + /* '<th></th>' + */ '<th sortKey="level">Level</th><th></th>' +
			'<th sortKey="location">Location</th><th sortKey="status">Status</th></tr>';
		var c=0;
		for (var i=0;i<quests.length;i++) {
			q = quests[i];
			if (hideQuests.indexOf(q.questName)<0) {
				var img="";
				// if (q.status==undefined) img="";
				if (q.status=="Completed") img=System.imageServer + "/skin/quest_complete.gif";
				if (q.status=="Incomplete") img=System.imageServer + "/skin/quest_incomplete.gif";
				if (q.status==undefined) img='data:image/png;base64,' +
					'iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAC5UlEQVR4nG1UX2sT' +
					'QRD/7V5yub0kUi4mFFJfWq2i2Jb+0bZYoX2wgk+C6IvfwQf9AH4HP4KCgopvglIK' +
					'FqVafFPf1AdFH7TpH2huzzTJOrObi6npcHd7Nzvzm5nfzJ54dmfWAHSRNPdbcCLQ' +
					'K81mA4FSHZv9Q2wE6ZsQj2/NmEfr30jRhtfYRU427LbOVpyd+efXSBp9MH5G2vX6' +
					'hRFknKqNqwsnugaNuNUN7ivPIdIlpQ/f9/qCPFz5YBWSgYxpkWEW/6wOFwYSgXS3' +
					'cqsX+uTftn6Zrj9HFh1Ao+1S/bjRBxgvX+4J2knNGLoIjB+s9H2J/VbbbZBm6NMG' +
					'Lq3u9IG9XBrA3sUlSOXb74znAIUQ9J7NwXgZ+mAyiQ8VIFpfs0Ds+L+k+k0C1DpG' +
					'QkXkvCxkwU8bQBpuvU5QePG86/BrfM5WEh6hPbqSLZdZuv99ZhY5lXKsuAExlRUc' +
					'yr3IGghXDba3YgvYK4YDIY/E5hO7zJQlkrILBTanz9uov8/Nwfwx2K3HKH9eR+GQ' +
					'MtnFBXANy/CXChXlprATUwwVYm95EbomEA0GqHTK7m2ABaJEozAtgfxVxGCaiNQ2' +
					'1YA2ueCdGiXJhsHBLrJwJ+uxQT4kNCpRp5yTSK460dopaD+xJdNt6kSUPsDR5vSi' +
					'XUslblbe+qRVJuz59PaEebDyFdeuTDmQ9OBxYFGH8AKU3r6ynZXFgAcKQRQg+UG1' +
					'SDYK8eTNe9ycP41Moo0dC6YrJNtY1xGqvAUCraW11QOk28qTxAbV2vbR8s2ZSTsO' +
					'VGYUKctZyA/bpTxcz/tlKx0TIt5OOwPSu+T/FOMNDASdKJ122/NaR21hyQ3wxBy2' +
					'f9awTTwKuvk9HTttj6Smbgo3Dvfuv6bXxJ2E7gBpeG2Gp3/buy9oSdGz55g3JnBl' +
					'k3g35gfvniyXMTUcYGykirGjObeWaR2u4sxQEacGQ0wer+DssYj0RdIXMVqpYJLW' +
					'8UoB46NVYqqFv5bkGr3XAAPaAAAAAElFTkSuQmCC';
				if ( (q.status!="Completed" || GM_getValue("showCompletedQuests")) && q.level<=Helper.characterLevel) {
					bgColor = ((c++)%2==0)?"#000000":"#110011";
					output+='<tr style="background-color:' + bgColor + '"><td>';
					if (q.href!=undefined) {
						output+= '<a href="' + q.href + '">' + q.questName + '</a>';
					} else {
						output+= q.questName;
					}
					var fsgQuestName = q.questName.replace(/  /g,"+");
					fsgQuestName = fsgQuestName.replace(/ /g,"+");
					var wikiQuestName = q.questName.replace(/  /g,"_");
					wikiQuestName = wikiQuestName.replace(/ /g,"_");
					output+=
						/*'</td><td><a href="http://www.fallenswordguide.com/quests/index.php?realm=0&search=' + fsgQuestName +
						'" target="_blank" title="Look up this quest on Fallen Sword Guide">f</a>' +
						'&nbsp<a href="http://wiki.sigmastorm2.com/index.php/' + wikiQuestName +
						'" target="_blank" title="Look up this quest on the wiki">w</a>' +*/
						'</td><td align="right">' + q.level +
						'</td><td width="20"></td><td>' + q.location + '</td><td align="right"><img src="' + img + '"></td></tr>';
				}
			}
		}
		output+='</table>';
		return output;
	},

	injectAuctionSearch: function() {
		var content=Layout.notebookContent();
		content.innerHTML='<table cellspacing="0" cellpadding="0" border="0" width="100%">'+
			'<tr><td colspan="2" nobr bgcolor="#cd9e4b"><b>&nbsp;Auction Quick Search</b></td></tr>'+
			'<tr><td></td></tr>'+
			'</table>' +
			'<div style="font-size:small;" id="Helper:Auction Search Output">' +
			'</div>';
		var injectHere = document.getElementById('Helper:Auction Search Output');
		var quickSearchList = System.getValueJSON("quickSearchList");
		Helper.sortAsc=true;
		Helper.sortBy="category";
		quickSearchList.sort(Helper.stringSort);
		//quickSearchList.sort();
		var currentCategory = "";
		var output = "<table><tbody>";
		for (j=0; j<quickSearchList.length; j++) {
			var quickSearchItem=quickSearchList[j];
			if (quickSearchItem) {
				if (currentCategory != quickSearchItem.category)
					output += "<tr><td colspan=4><span style='font-weight:bold; font-size:large;'>" + quickSearchItem.category + "</span></td></tr>";
				//http://www.fallensword.com/index.php?cmd=auctionhouse&type=-1&search_text=Potion of Truth&page=1&order_by=1
				output += "<tr><td width='10'></td><td><a href='" + System.server +
					"index.php?cmd=auctionhouse&type=-1&search_text=" +
					quickSearchItem.searchname + "&page=1&order_by=1' title='" +
					quickSearchItem.searchname + "'><span style='cursor:pointer; text-decoration:underline; color:#ADB5B5;'>" +
					quickSearchItem.searchname + "</span></a></td>" +
					"<td><a href='" + System.server +
					"index.php?cmd=auctionhouse&type=-1&search_text=" +
					quickSearchItem.searchname + "&page=1&order_by=1' title='" +
					quickSearchItem.searchname + "'><span style='cursor:pointer; text-decoration:underline; color:#ADB5B5;'>" +
					((quickSearchItem.nickname)? quickSearchItem.nickname:"") + "</span></a></td>" +
					"<td></td></tr>";
				currentCategory = quickSearchItem.category;
			}
		}
		output += "<tr><td colspan=4 height=10></td></tr>";
		output += "<tr><td colspan=4 align=center><textarea cols=70 rows=20 name='auctionsearch'>" + JSON.stringify(quickSearchList) + "</textarea></td></tr>";
		output += "<tr><td colspan=4 align=center><input id='Helper:saveauctionsearch' type='button' value='Save' class='custombutton'>"+
					"&nbsp;<input id='Helper:resetauctionsearch' type='button' value='Reset' class='custombutton'></td></tr>";
		output += "</tbody></table>";
		injectHere.innerHTML = output;
		document.getElementById("Helper:saveauctionsearch").addEventListener('click', Helper.saveAuctionSearch, true);
		document.getElementById("Helper:resetauctionsearch").addEventListener('click', Helper.resetAuctionSearch, true);
	},

	saveAuctionSearch: function(evt) {
		auctionsearchtextarea = System.findNode("//textarea[@name='auctionsearch']");
		GM_setValue("quickSearchList",auctionsearchtextarea.value);
		window.location=window.location;
	},

	resetAuctionSearch: function(evt) {
		GM_setValue("quickSearchList","");
		window.location=window.location;
	},

	linkFromMouseover: function(mouseOver) {
		var reParams=/(\d+),\s*(\d+),\s*(\d+),\s*(\d+)/;
		var reResult=reParams.exec(mouseOver);
		var itemId=reResult[1];
		var invId=reResult[2];
		var type=reResult[3];
		var pid=reResult[4];
		var theUrl = "fetchitem.php?item_id=" + itemId + "&inv_id=" + invId + "&t="+type + "&p="+pid
		theUrl = System.server + theUrl;
		return theUrl
	},

	linkFromMouseoverCustom: function(mouseOver) {
		var reParams =/(\d+),\s*(-?\d+),\s*(\d+),\s*(\d+),\s*\'([a-z0-9]+)\'/i;
		var reResult =reParams.exec(mouseOver);
		var itemId   = reResult[1];
		var invId    = reResult[2];
		var type     = reResult[3];
		var pid      = reResult[4];
		var vcode    = reResult[5];
		var theUrl   = "fetchitem.php?item_id=" + itemId + "&inv_id=" + invId + "&t="+type + "&p=" + pid + "&vcode=" + vcode
		theUrl = System.server + theUrl;
		return theUrl
	},


	injectInventoryManager: function() {
		var content=Layout.notebookContent();
		Helper.inventory=System.getValueJSON("inventory");
		content.innerHTML='<table cellspacing="0" cellpadding="0" border="0" width="100%"><tr style="background-color:#110011">'+
			'<td width="90%" nobr><b>&nbsp;Inventory Manager</b> green = worn, blue = backpack</td>'+
			'<td width="10%" nobr style="font-size:x-small;text-align:right">[<span id="Helper:InventoryManagerRefresh" style="text-decoration:underline;cursor:pointer">Refresh</span>]</td>'+
			'</tr>' +
			'<tr><td><b>&nbsp;Show Only Useable Items<input id="Helper:showUseableItems" type="checkbox"' +
				(GM_getValue("showUseableItems")?' checked':'') + '/></b></td></tr>'+
			'</table>' +
			'<div style="font-size:small;" id="Helper:InventoryManagerOutput">' +
			'' +
			'</div>';
		document.getElementById("Helper:InventoryManagerRefresh").addEventListener('click', Helper.parseProfileStart, true);
		Helper.generateInventoryTable("self");
		document.getElementById("Helper:showUseableItems").addEventListener('click', Helper.toggleShowUseableItems, true);
	},

	injectGuildInventoryManager: function() {
		var content=Layout.notebookContent();
		var guildItemCount = "unknown"
		unsafeWindow.changeMenu(0,'menu_character');
		unsafeWindow.changeMenu(5,'menu_guild');
		unsafeWindow.changeMenu(0,'menu_character');
		// I don't know why changeMenu(0) needs to be called twice, but it seems it does...
		Helper.guildinventory=System.getValueJSON("guildinventory");
		if (Helper.guildinventory) guildItemCount = Helper.guildinventory.items.length;
		content.innerHTML='<table cellspacing="0" cellpadding="0" border="0" width="100%"><tr style="background-color:#110011">'+
			'<td width="90%" nobr><b>&nbsp;Faction Inventory Manager</b> (takes a while to refresh so only do it if you really need to)</td>'+
			'<td width="10%" nobr style="font-size:x-small;text-align:right">[<span id="Helper:GuildInventoryManagerRefresh" style="text-decoration:underline;cursor:pointer">Refresh</span>]</td>'+
			'</tr>' +
			'<tr><td><b>&nbsp;Show Only Useable Items<input id="Helper:showUseableItems" type="checkbox" linkto="showUseableItems"' +
				(GM_getValue("showUseableItems")?' checked':'') + '/></b>&nbsp;Faction Item Count:&nbsp;' + guildItemCount +
				'</td></tr>'+
			'</table>' +
			'<div style="font-size:small;" id="Helper:GuildInventoryManagerOutput">' +
			'' +
			'</div>';
		document.getElementById("Helper:GuildInventoryManagerRefresh").addEventListener('click', Helper.parseGuildStart, true);
		Helper.generateInventoryTable("guild");
		document.getElementById("Helper:showUseableItems").addEventListener('click', Helper.toggleShowUseableItems, true);
	},

	injectOnlinePlayers: function() {
		var content=Layout.notebookContent();
		unsafeWindow.changeMenu(0,'menu_character');
		unsafeWindow.changeMenu(2,'menu_actions');
		unsafeWindow.changeMenu(0,'menu_character');

		var lastCheck=GM_getValue("lastOnlineCheck")
		var now=(new Date()).getTime();
		if (!lastCheck) lastCheck=0;
		var haveToCheck=((now - lastCheck) > 5*60*1000)
		if (haveToCheck) {
			var refreshButton = '<td> (takes a while to refresh so only do it if you really need to) </td>'+
			'<td width="10%" nobr style="font-size:x-small;text-align:right"><span id="Helper:OnlinePlayersRefresh" style="text-decoration:underline;cursor:pointer">[Refresh]</span></td>';
		} else {
			var refreshButton = "<td> (please wait 5 minutes before the [Refresh] button available again)</td>"
		}

		content.innerHTML='<table cellspacing="0" cellpadding="0" border="0" width="100%"><tr>'+
			'<td nobr><b>&nbsp;Online Players</b></td>' + 
			refreshButton + 
			'</tr>' +
			'</table>' +
			'<div style="font-size:small;" id="Helper:OnlinePlayersOutput">' +
			'' +
			'</div>';
		var refreshButton = document.getElementById("Helper:OnlinePlayersRefresh");
		if (refreshButton)
			refreshButton.addEventListener('click', Helper.parseOnlinePlayersStart, true);

		Helper.onlinePlayers = System.getValueJSON("onlinePlayers");
		Helper.generateOnlinePlayersTable();
	},

	parseOnlinePlayersStart: function() {
	
		// set timer to redisplay the [refresh] button
		var now=(new Date()).getTime();
		GM_setValue("lastOnlineCheck", now.toString());
		
		var refreshButton = document.getElementById("Helper:OnlinePlayersRefresh");
		refreshButton.style.visibility = "hidden";

		Helper.onlinePlayers = {players:[]};
		var output=document.getElementById('Helper:OnlinePlayersOutput')
		output.innerHTML='<br/>Parsing online players ...';
		System.xmlhttp('index.php?cmd=onlineplayers&page=1', Helper.parseOnlinePlayersStorePage, {"page":1});
	},

	parseOnlinePlayersStorePage: function(responseText, callback) {
		var doc = System.createDocument(responseText);
		var output=document.getElementById('Helper:OnlinePlayersOutput')
		var playerRows = System.findNodes("//table[@width='400']/tbody/tr[count(td)=3 and td[1]/a]", doc);
		var maxPage = parseInt(System.findNode("//table[@width='400']//td[input]", doc).textContent.replace(/\D/g, ""));
		output.innerHTML+=callback.page + " ";
		for (var i=0; i<playerRows.length; i++) {
			var newPlayer = {
				guildId: (callback.page - 1) * 15 + i + 1,
				id: parseInt(playerRows[i].cells[0].firstChild.href.replace(/\D/g,"").replace(/^2/,"")),
				name: playerRows[i].cells[0].textContent,
				level: parseInt(playerRows[i].cells[1].textContent)
			}
			Helper.onlinePlayers.players.push(newPlayer);
		}
		if (callback.page<maxPage/*-maxPage+15*/) {
			var newPage = (callback.page == 1) ? Math.round(2 * maxPage / 3) : (callback.page+1);
			System.xmlhttp('index.php?cmd=onlineplayers&page=' + newPage, Helper.parseOnlinePlayersStorePage, {"page":newPage});
		}
		else {
			GM_setValue("onlinePlayers", JSON.stringify(Helper.onlinePlayers));
			Helper.generateOnlinePlayersTable();
		}
	},

	generateOnlinePlayersTable: function() {
		if (!Helper.onlinePlayers) return;
		var output=document.getElementById("Helper:OnlinePlayersOutput");
		var result='<table id="Helper:OnlinePlayersTable"><tr>' +
			'<th align="left" sortkey="guildId" sortType="number">Index</th>' +
			'<th sortkey="name">Name</th>' +
			'<th sortkey="level" sortType="number">Level</th></tr>';
		var player, color;
		for (var i=0; i<Helper.onlinePlayers.players.length;i++) {
			player=Helper.onlinePlayers.players[i];

			result+='<tr class="HelperTableRow' + (1 + i % 2) +'">' +
				'<td>' + player.guildId + '</td>'+
				'<td><a href="index.php?cmd=profile&player_id='+player.id+'">'+ player.name+'</a></td>' +
				'<td align="right">' + player.level + '</td>' +
				'</tr>';
		}
		result+='</table>';
		output.innerHTML=result;

		var theTable=document.getElementById('Helper:OnlinePlayersTable');
		for (var i=0; i<theTable.rows[0].cells.length; i++) {
			var cell=theTable.rows[0].cells[i];
			cell.style.textDecoration="underline";
			cell.style.cursor="pointer";
			cell.addEventListener('click', Helper.sortOnlinePlayersTable, true);
		}
	},

	sortOnlinePlayersTable: function(evt) {
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
		Helper.generateOnlinePlayersTable();
	},


	toggleShowUseableItems: function(evt) {
		GM_setValue("showUseableItems", evt.target.checked);
		window.location=window.location;
	},

	parseProfileStart: function(){
		Helper.inventory = new Object;
		Helper.inventory.items = new Array();
		var output=document.getElementById('Helper:InventoryManagerOutput')
		output.innerHTML='<br/>Parsing profile...';
		System.xmlhttp('index.php?cmd=profile', Helper.parseProfileDone)
	},

	parseProfileDone: function(responseText) {
		var doc=System.createDocument(responseText);
		var output=document.getElementById('Helper:InventoryManagerOutput');
		var currentlyWorn=System.findNodes("//a[contains(@href,'subcmd=unequipitem') and contains(img/@src,'/items/')]/img", doc);
		for (var i=0; i<currentlyWorn.length; i++) {
			var item={"url": Helper.linkFromMouseover(currentlyWorn[i].getAttribute("onmouseover")),
				"type":"worn", "index":(i+1),
				"onmouseover":currentlyWorn[i].getAttribute("onmouseover")};
			if (i==0) output.innerHTML+="<br/>Found worn item "
			output.innerHTML+=(i+1) + " ";
			Helper.inventory.items.push(item);
		}
		var	folderIDs = new Array();
		Helper.folderIDs = folderIDs; //clear out the array before starting.
		GM_setValue("currentFolder", 1);
		var folderLinks = System.findNodes("//a[contains(@href,'index.php?cmd=profile&folder_id=')]", doc);
		//if folders are enabled then save the ID's in an array
		if (folderLinks) {
			for (var i=0; i<folderLinks.length;i++) {
				folderLink = folderLinks[i];
				href = folderLink.getAttribute("href")
				var folderID = /folder_id=([-0-9]+)/.exec(href)[1]*1;
				folderIDs.push(folderID);
				Helper.folderIDs = folderIDs;
			}
		}
		Helper.parseInventoryPage(responseText);
	},

	parseInventoryPage: function(responseText) {
		var doc=System.createDocument(responseText);
		var output=document.getElementById('Helper:InventoryManagerOutput');
		var backpackItems = System.findNodes("//td[contains(@background,'2x3.gif')]/center/a[contains(@href, 'subcmd=equipitem')]/img", doc);
		var pages = System.findNodes("//a[contains(@href,'index.php?cmd=profile&backpack_page=')]", doc);
		var pageElement = System.findNode("//a[contains(@href,'backpack_page=')]/font", doc);
		var currentPage = 1;
		if (pageElement) currentPage = parseInt(System.findNode("//a[contains(@href,'backpack_page=')]/font", doc).textContent);
		var currentFolder = GM_getValue("currentFolder");
		var folderCount = 0, folderID = -1;
		if (Helper.folderIDs.length<=1) {
			folderCount = 1;
			folderID = -1;
		} else {
			folderCount = Helper.folderIDs.length;
			folderID = Helper.folderIDs[currentFolder-1];
		}
		if (backpackItems) {
			output.innerHTML+='<br/>Parsing folder '+currentFolder+', backpack page '+currentPage+'...';

			for (var i=0; i<backpackItems.length;i++) {
				var theUrl=Helper.linkFromMouseover(backpackItems[i].getAttribute("onmouseover"))
				var item={"url": theUrl,
					"type":"backpack", "index":(i+1), "page":currentPage,
					"onmouseover":backpackItems[i].getAttribute("onmouseover")};
				if (i==0) output.innerHTML+="<br/>Found wearable item "
				output.innerHTML+=(i+1) + " ";
				Helper.inventory.items.push(item);
			}
			} else {
				output.innerHTML+='<br/>Parsing folder '+currentFolder+', backpack page '+currentPage+'... Empty';
			}
		if (currentPage<pages.length || currentFolder<folderCount) {
			if (currentPage==pages.length && currentFolder<folderCount) {
				currentPage = 0;
				folderID = Helper.folderIDs[currentFolder];
				GM_setValue("currentFolder", currentFolder+1);
			}
			System.xmlhttp('index.php?cmd=profile&backpack_page='+(currentPage)+'&folder_id='+(folderID), Helper.parseInventoryPage);
		}
		else {
			output.innerHTML+="<br/>Parsing inventory item "
			Helper.retrieveInventoryItem(0, "self");
		}
	},

	parseGuildStart: function(){
		Helper.guildinventory = new Object;
		Helper.guildinventory.items = new Array();
		var output=document.getElementById('Helper:GuildInventoryManagerOutput')
		output.innerHTML='<br/>Parsing guild store ...';
		System.xmlhttp('index.php?cmd=guild&subcmd=manage&guildstore_page=0', Helper.parseGuildStorePage);
	},

	parseGuildStorePage: function(responseText) {
		var doc=System.createDocument(responseText);
		var output=document.getElementById('Helper:GuildInventoryManagerOutput');
		var guildstoreItems = System.findNodes("//a[contains(@href,'subcmd2=takeitem')]/img", doc);
		var pages = System.findNodes("//a[contains(@href,'cmd=guild&subcmd=manage&guildstore_page')]", doc);
		var currentPage = parseInt(System.findNode("//a[contains(@href,'cmd=guild&subcmd=manage&guildstore_page')]/font", doc).textContent);
		if (guildstoreItems) {
			output.innerHTML+='<br/>Parsing guild store page '+currentPage+'...';

			for (var i=0; i<guildstoreItems.length;i++) {
				var theUrl=Helper.linkFromMouseover(guildstoreItems[i].getAttribute("onmouseover"))
				var item={"url": theUrl,
					"type":"guildstore", "index":(i+1), "page":currentPage, "worn":false,
					"onmouseover":guildstoreItems[i].getAttribute("onmouseover")};
				if (i==0) output.innerHTML+="<br/>Found guild store item "
				output.innerHTML+=(i+1) + " ";
				Helper.guildinventory.items.push(item);
			}
		} else {
			output.innerHTML+='<br/>Parsing guild store page '+currentPage+'... Empty';
		}
		if (currentPage<pages.length) {
			System.xmlhttp('index.php?cmd=guild&subcmd=manage&guildstore_page='+(currentPage), Helper.parseGuildStorePage);
		}
		else {
			output.innerHTML+='<br/>Parsing guild report page ...';
			System.xmlhttp('index.php?cmd=guild&subcmd=inventory&subcmd2=report', Helper.parseGuildReportPage)
		}
	},

	parseGuildReportPage: function(responseText) {
		var doc=System.createDocument(responseText);
		var output=document.getElementById('Helper:GuildInventoryManagerOutput');
		var guildreportItems = System.findNodes("//img[contains(@src,'items')]", doc);
		if (guildreportItems) {
			for (var i=0; i<guildreportItems.length;i++) {
				var theUrl=Helper.linkFromMouseover(guildreportItems[i].getAttribute("onmouseover"))
				var item={"url": theUrl,
					"type":"guildreport", "index":(i+1), "worn":false,
					"onmouseover":guildreportItems[i].getAttribute("onmouseover")};
				if (i==0) output.innerHTML+="<br/>Found guild report item "
				output.innerHTML+=(i+1) + " ";
				Helper.guildinventory.items.push(item);
			}
		}
		output.innerHTML+="<br/>Parsing guild inventory item "
		Helper.retrieveInventoryItem(0, "guild");
	},

	retrieveInventoryItem: function(invIndex, reportType) {
		if (reportType == "guild") {
			targetInventory = Helper.guildinventory;
		} else {
			targetInventory = Helper.inventory;
		}
		System.xmlhttp(targetInventory.items[invIndex].url, Helper.parseInventoryItem, {"invIndex": invIndex, "reportType": reportType});
	},

	parseInventoryItem: function(responseText, callback) {
		if (callback.reportType == "guild") {
			targetId = 'Helper:GuildInventoryManagerOutput';
			targetInventory = Helper.guildinventory;
		} else {
			targetId = 'Helper:InventoryManagerOutput';
			targetInventory = Helper.inventory;
		}
		var output=document.getElementById(targetId);
		var doc=System.createDocument(responseText);
		output.innerHTML+=(callback.invIndex+1) + " ";

		targetInventory.items[callback.invIndex].html=responseText;

		var nameNode=System.findNode("//b", doc);
		if (!nameNode) GM_log(responseText);
		if (nameNode) {
			targetInventory.items[callback.invIndex].name=nameNode.textContent

			var attackNode=System.findNode("//tr/td[.='Attack:']/../td[2]", doc);
			targetInventory.items[callback.invIndex].attack=(attackNode)?parseInt(attackNode.textContent):0;

			var defenseNode=System.findNode("//tr/td[.='Defense:']/../td[2]", doc);
			targetInventory.items[callback.invIndex].defense=(defenseNode)?parseInt(defenseNode.textContent):0;

			var armorNode=System.findNode("//tr/td[.='Armor:']/../td[2]", doc);
			targetInventory.items[callback.invIndex].armor=(armorNode)?parseInt(armorNode.textContent):0;

			var damageNode=System.findNode("//tr/td[.='Damage:']/../td[2]", doc);
			targetInventory.items[callback.invIndex].damage=(damageNode)?parseInt(damageNode.textContent):0;

			var hpNode=System.findNode("//tr/td[.='HP:']/../td[2]", doc);
			targetInventory.items[callback.invIndex].hp=(hpNode)?parseInt(hpNode.textContent):0;

			var levelNode=System.findNode("//tr[td='Min Level:']/td[2]", doc);
			targetInventory.items[callback.invIndex].minLevel=(levelNode)?parseInt(levelNode.textContent):0;

			var forgeCount=0, re=/hellforge\/forgelevel.gif/ig;
			while(re.exec(responseText)) {
				forgeCount++;
			}
			targetInventory.items[callback.invIndex].forgelevel=forgeCount;

			var craft="";
			if (responseText.search(/Uncrafted|Very Poor|Poor|Average|Good|Very Good|Excellent|Perfect/) != -1){
				var fontLineRE=/<\/b><\/font><br>([^<]+)<font color='(#[0-9A-F]{6})'>([^<]+)<\/font>/
				var fontLineRX=fontLineRE.exec(responseText)
				craft = fontLineRX[3];
			}
			targetInventory.items[callback.invIndex].craftlevel=craft;
		}

		if (callback.invIndex<targetInventory.items.length-1) {
			Helper.retrieveInventoryItem(callback.invIndex+1, callback.reportType);
		}
		else {
			output.innerHTML+="Parsing done!";
			Helper.generateInventoryTable(callback.reportType);
		}
	},

	generateInventoryTable: function(reportType) {
		if (reportType == "guild") {
			targetId = 'Helper:GuildInventoryManagerOutput';
			targetInventory = Helper.guildinventory;
			inventoryShell = 'guildinventory';
		} else {
			targetId = 'Helper:InventoryManagerOutput';
			targetInventory = Helper.inventory;
			inventoryShell = 'inventory';
		}
		if (!targetInventory) return;
		var output=document.getElementById(targetId);
		var result='<table id="Helper:InventoryTable"><tr>' +
			'<th width="10"></th><th width="180" align="left" sortkey="name">Name</th>' +
			'<th width="10"></th><th sortkey="minLevel">Level</th>' +
			'<th width="10"></th><th sortkey="attack">Att</th>' +
			'<th width="10"></th><th sortkey="defense">Def</th>' +
			'<th width="10"></th><th sortkey="armor">Arm</th>' +
			'<th width="10"></th><th sortkey="damage">Dam</th>' +
			'<th width="10"></th><th sortkey="hp">HP</th>' +
			'<th width="10"></th><th sortkey="forgelevel">Forge</th>' +
			'<th width="10"></th><th sortkey="craftlevel">Craft</th>' +
			'<th width="10"></th>';
		var item, color;
		var showUseableItems = GM_getValue("showUseableItems");
		for (var i=0; i<targetInventory.items.length;i++) {
			item=targetInventory.items[i];

			switch (item.type+"") {
				case "worn":        color = "green";  break;
				case "backpack":    color = "blue";   break;
				case "guildstore":  color = "lime";   break;
				case "guildreport": color = "yellow"; break;
				default: color = "#84ADAC";
			}

			if (showUseableItems && item.minLevel > Helper.characterLevel) {
			} else {
				result+='<tr style="color:'+ color +'">' +
					'<td>' + '<img src="' + System.imageServer + '/temple/1.gif" onmouseover="' + item.onmouseover + '">' +
					'</td><td>' + item.name + '</td>' +
					'<td></td><td align="right">' + item.minLevel + '</td>' +
					'<td></td><td align="right">' + item.attack + '</td>' +
					'<td></td><td align="right">' + item.defense + '</td>' +
					'<td></td><td align="right">' + item.armor + '</td>' +
					'<td></td><td align="right">' + item.damage + '</td>' +
					'<td></td><td align="right">' + item.hp + '</td>' +
					'<td></td><td align="right">' + item.forgelevel + '</td>' +
					'<td>' + ((item.forgelevel>0)? "<img src='" + System.imageServer + "/hellforge/forgelevel.gif'>":"") + '</td>' +
						'<td align="right">' + item.craftlevel + '</td>' +
					'<td></td>' +
					'</tr>';
			}
		}
		result+='</table>';
		output.innerHTML=result;

		targetInventory.lastUpdate = (new Date()).getTime();
		GM_setValue(inventoryShell, JSON.stringify(targetInventory));

		var inventoryTable=document.getElementById('Helper:InventoryTable');
		for (var i=0; i<inventoryTable.rows[0].cells.length; i++) {
			var cell=inventoryTable.rows[0].cells[i];
			cell.style.textDecoration="underline";
			cell.style.cursor="pointer";
			cell.addEventListener('click', Helper.sortInventoryTable, true);
		}
	},

	sortInventoryTable: function(evt) {
		re=/subcmd=([a-z]+)/;
		var subPageIdRE = re.exec(document.location.search);
		var subPageId="-";
		if (subPageIdRE)
			subPageId=subPageIdRE[1];
		if (subPageId == "guildinvmanager") {
			Helper.guildinventory=System.getValueJSON("guildinventory");
			targetInventory = Helper.guildinventory;
		} else {
			Helper.inventory=System.getValueJSON("inventory");
			targetInventory = Helper.inventory;
		}
		var headerClicked=evt.target.getAttribute("sortKey")
		if (Helper.sortAsc==undefined) Helper.sortAsc=true;
		if (Helper.sortBy && Helper.sortBy==headerClicked) {
			Helper.sortAsc=!Helper.sortAsc;
		}
		Helper.sortBy="name";
		targetInventory.items.sort(Helper.stringSort)
		Helper.sortBy=headerClicked;
		//GM_log(headerClicked)
		if (headerClicked=="minLevel" || headerClicked=="attack" || headerClicked=="defense" ||
			headerClicked=="armor" || headerClicked=="damage" || headerClicked=="forgelevel" || 
			headerClicked=="hp") {
			targetInventory.items.sort(Helper.numberSort)
		}
		else {
			targetInventory.items.sort(Helper.stringSort)
		}
		if (subPageId == "guildinvmanager") {
			Helper.generateInventoryTable("guild");
		} else {
			Helper.generateInventoryTable("self");
		}
	},

	injectRecipeManager: function() {
		var content=Layout.notebookContent();
		Helper.recipebook = System.getValueJSON("recipebook");
		content.innerHTML = '<table cellspacing="0" cellpadding="0" border="0" width="100%"><tr style="background-color:#110011">'+
			'<td width="90%" nobr><b>&nbsp;Blueprint Manager</b></td>'+
			'<td width="10%" nobr style="font-size:x-small;text-align:right">[<span id="Helper:RecipeManagerRefresh" style="text-decoration:underline;cursor:pointer">Refresh</span>]</td>'+
			'</tr>' +
			'</table>' +
			'<div style="font-size:small;" id="Helper:RecipeManagerOutput">' +
			'' +
			'</div>';
		if (!Helper.recipebook) Helper.parseInventingStart();
		document.getElementById("Helper:RecipeManagerRefresh").addEventListener('click', Helper.parseInventingStart, true);
		Helper.generateRecipeTable();
	},

	parseInventingStart: function(){
		Helper.recipebook = {};
		Helper.recipebook.recipe = [];
		var output=document.getElementById('Helper:RecipeManagerOutput')
		output.innerHTML='<br/>Parsing inventing screen ...<br/>';
		System.xmlhttp('index.php?cmd=inventing&page=0', Helper.parseInventingPage, {"page": 0});
	},

	parseInventingPage: function(responseText, callback) {
		var doc=System.createDocument(responseText);
		var output=document.getElementById('Helper:RecipeManagerOutput');
		var currentPage = callback.page;
		var pages=System.findNode("//select[@name='page']", doc);
		if (!pages) return;
		var recipeRows = System.findNodes("//table[tbody/tr/td[.='Recipe Name']]//tr[td/img]",doc);

		output.innerHTML += 'Page ' + currentPage + '...<br/>';

		if (recipeRows) {
			for (var i=0; i<recipeRows.length;i++) {
				aRow = recipeRows[i];
				var recipeLink = aRow.cells[1].firstChild.href;
				var recipeId = parseInt(recipeLink.match(/recipe_id=(\d+)/i)[1]);
				var recipe={
					"img": aRow.cells[0].firstChild.src,
					"link": recipeLink,
					"name": aRow.cells[1].firstChild.textContent,
					"type": aRow.cells[2].firstChild.textContent,
					"level": parseInt(aRow.cells[3].firstChild.textContent),
					"id": recipeId};
				output.innerHTML+="Found blueprint: "+ recipe.name + "<br/>";
				Helper.recipebook.recipe.push(recipe);
			}
		}

		var nextPage=currentPage+1; //pages[currentPage];
		if (nextPage<pages.options.length) {
			System.xmlhttp('index.php?cmd=inventing&page='+nextPage, Helper.parseInventingPage, {"page": nextPage});
		}
		else {
			output.innerHTML+='Finished parsing ... Retrieving individual blueprints...<br/>';
			// Helper.generateRecipeTable();
			// GM_log(JSON.stringify(Helper.recipebook));
			System.xmlhttp('index.php?cmd=inventing&subcmd=viewrecipe&recipe_id=' + Helper.recipebook.recipe[0].id, Helper.parseRecipePage, {"recipeIndex": 0});
		}
	},

	parseRecipeItemOrComponent: function(xpath, doc) {
		var resultNodes = System.findNodes(xpath, doc);
		var results = [];
		if (resultNodes) {
			for (var i=0; i<resultNodes.length; i++) {
				var resultNode = resultNodes[i];
				var mouseOver = resultNode.firstChild.firstChild.getAttribute("onmouseover");
				var resultAmounts = resultNode.parentNode.nextSibling.textContent;
				var result = {
					img: resultNode.firstChild.firstChild.src,
					id: mouseOver.match(/ajaxLoadItem\((\d+),\s*-1,\s*2,\s*\d+,\s*\'\'\);/i)[1],
					amountPresent: parseInt(resultAmounts.split("/")[0]),
					amountNeeded: parseInt(resultAmounts.split("/")[1])
				}
				results.push(result);
			}
		}
		return results;
	},

	parseRecipePage: function(responseText, callback) {
		var doc=System.createDocument(responseText);
		var output=document.getElementById('Helper:RecipeManagerOutput');
		var currentRecipeIndex = callback.recipeIndex;
		var recipe = Helper.recipebook.recipe[currentRecipeIndex];

		output.innerHTML+='Parsing blueprint ' + recipe.name +'...<br/>';

		recipe.credits = System.findNodeInt("//tr[td/img/@title='Credits']/td[1]", doc);
		recipe.items = Helper.parseRecipeItemOrComponent("//td[contains(@background,'small.gif')]", doc);
		recipe.components  = Helper.parseRecipeItemOrComponent("//td[contains(@background,'1x1mini.gif')]", doc);
		var targetNode = System.findNode("//td[contains(@background,'2x3.gif')]/center/img", doc);
		recipe.target = {
			img: targetNode.src,
			id: targetNode.getAttribute("onmouseover").match(/ajaxLoadItem\((\d+),\s*-1,\s*2,\s*\d+,\s*\'\'\);/i)[1]
		}

		var nextRecipeIndex = currentRecipeIndex+1;
		if (nextRecipeIndex<Helper.recipebook.recipe.length) {
			var nextRecipe = Helper.recipebook.recipe[nextRecipeIndex];
			System.xmlhttp('index.php?cmd=inventing&subcmd=viewrecipe&recipe_id=' + nextRecipe.id, Helper.parseRecipePage, {"recipeIndex": nextRecipeIndex});
		}
		else {
			output.innerHTML+='Finished parsing ... formatting ...';
			Helper.recipebook.lastUpdate = (new Date()).getTime();
			GM_setValue("recipebook", JSON.stringify(Helper.recipebook));
			Helper.generateRecipeTable();
		}
	},

	generateRecipeTable: function() {
		GM_log(JSON.stringify(Helper.recipebook));
		var output=document.getElementById('Helper:RecipeManagerOutput');
		var result='<table id="Helper:RecipeTable"><tr>' +
			'<th align="left" sortkey="name">Name</th>' +
			'<th align="left" sortkey="level" sorttype="number">Level</th>' +
			'<th align="left" sortkey="type">Type</th>' +
			'<th align="left" sortkey="credits" sorttype="number">Credits</th>' +
			'<th align="left">Items</th>' +
			'<th align="left">Components</th>' +
			'<th align="left">Target</th>' +
			'</tr>';
		if (!Helper.recipebook) return;

		var hideRecipes=[];
		if (GM_getValue("hideRecipes")) hideRecipes=GM_getValue("hideRecipeNames").split(",");

		var recipe;
		var c=0;
		for (var i=0; i<Helper.recipebook.recipe.length;i++) {
			recipe=Helper.recipebook.recipe[i];
			c++;

			if (hideRecipes.indexOf(recipe.name) == -1) {
				result+='<tr class="HelperTableRow'+(1+c % 2)+'" valign="middle">' +
					'<td><a href="' + recipe.link + '"><img border="0" align="middle" src="' + recipe.img + '"/>' + recipe.name + '</td>' +
					'<td>' + recipe.level + '</td>' +
					'<td>' + recipe.type + '</td>' +
					'<td>' + recipe.credits + '</td>'
				result += '<td>';
				if (recipe.items) {
					for (var j=0; j<recipe.items.length; j++) {
						result += recipe.items[j].amountPresent  + "/" + recipe.items[j].amountNeeded+
							' <img border="0" align="middle" onmouseover="ajaxLoadItem(' +
							recipe.items[j].id + ', -1, 2, ' + Layout.playerId() + ', \'\');" ' +
							'src="' + recipe.items[j].img + '"/><br/>';
					}
				}
				result += '</td>'
				result += '<td>';
				if (recipe.components) {
					for (var j=0; j<recipe.components.length; j++) {
						result += recipe.components[j].amountPresent + "/" + recipe.components[j].amountNeeded +
							' <img border="0" align="middle" onmouseover="ajaxLoadItem(' +
							recipe.components[j].id + ', -1, 2, ' + Layout.playerId() + ', \'\');" ' +
							'src="' + recipe.components[j].img + '"/><br/>';
					}
				}
				result += '</td>'
				result += '<td>';
				if (recipe.target) {
					result += '<img border="0" align="middle" onmouseover="ajaxLoadItem(' +
						recipe.target.id + ', -1, 2, ' + Layout.playerId() + ', \'\');" ' +
						'src="' + recipe.target.img + '"/>';
				}
				result += '</td>'
				result += '</tr>';
			}
		}
		result+='</table>';
		output.innerHTML=result;

		var recipeTable=document.getElementById('Helper:RecipeTable');
		for (var i=0; i<recipeTable.rows[0].cells.length; i++) {
			var cell=recipeTable.rows[0].cells[i];
			if (cell.getAttribute("sortkey")) {
				cell.style.textDecoration="underline";
				cell.style.cursor="pointer";
				cell.addEventListener('click', Helper.sortRecipeTable, true);
			}
		}
	},

	sortRecipeTable: function(evt) {
		Helper.recipebook=System.getValueJSON("recipebook");
		var headerClicked = evt.target.getAttribute("sortKey");
		var sortType = evt.target.getAttribute("sorttype");
		if (!sortType) sortType="string";
		sortType = sortType.toLowerCase();
		if (Helper.sortAsc==undefined) Helper.sortAsc=true;
		if (Helper.sortBy && Helper.sortBy==headerClicked) {
			Helper.sortAsc=!Helper.sortAsc;
		}
		Helper.sortBy=headerClicked;
		//GM_log(headerClicked)
		switch (sortType) {
			case "number":
				Helper.recipebook.recipe.sort(Helper.numberSort)
				break;
			default:
				Helper.recipebook.recipe.sort(Helper.stringSort)
		}
		Helper.generateRecipeTable();
	},

	injectGroupStats: function() {
		var attackTitleElement = System.findNode("//table[@width='400']/tbody/tr/td[contains(.,'Attack:')]");
		attackValueElement = attackTitleElement.nextSibling;
		attackValueElement.innerHTML = "<table><tbody><tr><td style='color:#ADB5B5;'>" + attackValueElement.innerHTML +
			"</td><td>(</td><td title='attackValue'>" + attackValueElement.innerHTML +
			"</td><td>)</td></tr></tbody></table>";
		var defenseTitleElement = System.findNode("//table[@width='400']/tbody/tr/td[contains(.,'Defense:')]");
		defenseValueElement = defenseTitleElement.nextSibling;
		defenseValueElement.innerHTML = "<table><tbody><tr><td style='color:#ADB5B5;'>" + defenseValueElement.innerHTML +
			"</td><td>(</td><td title='defenseValue'>" + defenseValueElement.innerHTML +
			"</td><td>)</td></tr></tbody></table>";
		var armorTitleElement = System.findNode("//table[@width='400']/tbody/tr/td[contains(.,'Armor:')]");
		armorValueElement = armorTitleElement.nextSibling;
		armorValueElement.innerHTML = "<table><tbody><tr><td style='color:#ADB5B5;'>" + armorValueElement.innerHTML +
			"</td><td>(</td><td title='armorValue'>" + armorValueElement.innerHTML +
			"</td><td>)</td></tr></tbody></table>";
		var damageTitleElement = System.findNode("//table[@width='400']/tbody/tr/td[contains(.,'Damage:')]");
		damageValueElement = damageTitleElement.nextSibling;
		damageValueElement.innerHTML = "<table><tbody><tr><td style='color:#ADB5B5;'>" + damageValueElement.innerHTML +
			"</td><td>(</td><td title='damageValue'>" + damageValueElement.innerHTML +
			"</td><td>)</td></tr></tbody></table>";
		var hpTitleElement = System.findNode("//table[@width='400']/tbody/tr/td[contains(.,'HP:')]");
		hpValueElement = hpTitleElement.nextSibling;
		hpValueElement.innerHTML = "<table><tbody><tr><td style='color:#ADB5B5;'>" + hpValueElement.innerHTML +
			"</td><td>(</td><td title='hpValue'>" + hpValueElement.innerHTML +
			"</td><td>)</td></tr></tbody></table>";
		System.xmlhttp("index.php?cmd=guild&subcmd=mercs", Helper.parseMercStats);
	},

	parseMercStats: function(responseText) {
		var mercPage=System.createDocument(responseText);
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
		var attackValue        = System.findNode("//td[@title='attackValue']");
		attackNumber           = System.intValue(attackValue.innerHTML);
		attackValue.innerHTML  = System.addCommas(attackNumber - Math.round(totalMercAttack*0.2));
		var defenseValue       = System.findNode("//td[@title='defenseValue']");
		defenseNumber          = System.intValue(defenseValue.innerHTML);
		defenseValue.innerHTML = System.addCommas(defenseNumber - Math.round(totalMercDefense*0.2));
		var armorValue         = System.findNode("//td[@title='armorValue']");
		armorNumber            = System.intValue(armorValue.innerHTML);
		armorValue.innerHTML   = System.addCommas(armorNumber - Math.round(totalMercArmor*0.2));
		var damageValue        = System.findNode("//td[@title='damageValue']");
		damageNumber           = System.intValue(damageValue.innerHTML);
		damageValue.innerHTML  = System.addCommas(damageNumber - Math.round(totalMercDamage*0.2));
		var hpValue            = System.findNode("//td[@title='hpValue']");
		hpNumber               = System.intValue(hpValue.innerHTML);
		hpValue.innerHTML      = System.addCommas(hpNumber - Math.round(totalMercHP*0.2));
	},

	injectGroups: function() {
		var mainTable = System.findNode("//table[@width='650']");
		var subTable = System.findNode("//table[@width='650']/tbody/tr/td/table");
		var minGroupLevel = GM_getValue("minGroupLevel");
		if (minGroupLevel) {
			var textArea = subTable.rows[0].cells[0];
			textArea.innerHTML += ' <span style="color:#ADB5B5">Current Min Level Setting: '+ minGroupLevel +'</span>';
		}

		allItems = System.findNodes("//tr[td/a/img/@title='View Group Stats']");
		var memberList=System.getValueJSON("memberlist");
		// memberList.lookupByName.find
		for (i=0; i<allItems.length; i++) {
			var theItem=allItems[i].cells[0];
			var foundName=theItem.textContent;
			for (j=0; j<memberList.members.length; j++) {
				var aMember=memberList.members[j];
				// I hate doing two loops, but using a hashtable implementation I found crashed my browser...
				if (aMember.name==foundName) {
					theItem.innerHTML = "<span style='font-size:small; " + ((aMember.status == "Online")?"color:green;":"") + "'>" +
						theItem.innerHTML + "</span> [" + aMember.level + "]";
				}
			}
		}
		var buttonElement = System.findNode("//td[input[@value='Join All Available Groups']]");
		buttonElement.innerHTML += '&nbsp;<input id="fetchgroupstats" type="button" value="Fetch Group Stats" class="custombutton">';

		document.getElementById('fetchgroupstats').addEventListener('click', Helper.fetchGroupData, true);

	},

	fetchGroupData: function(evt) {
		var calcButton = System.findNode("//input[@id='fetchgroupstats']");
		calcButton.style.display = "none";
		var allItems = System.findNodes("//img[@title='View Group Stats']");
		for (var i=0; i<allItems.length; i++) {
			System.xmlhttp(allItems[i].parentNode.getAttribute("href"), Helper.parseGroupData, allItems[i].parentNode);
		}
	},

	parseGroupData: function(responseText, linkElement) {
		var doc=System.createDocument(responseText);
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
		var requestTable = System.findNode("//table[tbody/tr/td/input[@value='Confirm Request']]");
		var newRow = requestTable.insertRow(2);
		var newCell = newRow.insertCell(0);
		newCell.id = "warningfield";
		newCell.colSpan = "2";
		newCell.align = "center";

		document.getElementById('price').addEventListener('keyup', Helper.addMarketplaceWarning, true);
	},

	addMarketplaceWarning: function(evt) {
		 var goldPerPoint = System.findNode("//input[@id='price']");
		 var warningField = System.findNode("//td[@id='warningfield']");
		 var sellPrice = goldPerPoint.value;
		 if (sellPrice.search(/^[0-9]*$/) != -1) {
			var warningColor = "green";
			var warningText = "</b><br>This is probably an offer that will please someone.";
			if (sellPrice < 100000) {
				warningColor = "brown";
				var warningText = "</b><br>This is too low ... it just ain't gonna sell.";
			} else if (sellPrice > 150000) {
				warningColor = "red";
				var warningText = "</b><br>Hold up there ... this is way to high a price ... you should reconsider.";
			}
			warningField.innerHTML = "<span style='color:" + warningColor + ";'>You are offering to buy FSP for >> <b>" +
				System.addCommas(sellPrice) + warningText + "</span>";
		}
	},

	injectQuickBuff: function() {
		var playerInput = System.findNode("//input[@name='targetPlayers']");
		var buffMe = document.createElement("SPAN");
		buffMe.innerHTML="[self]";
		buffMe.style.color="white";
		buffMe.style.cursor="pointer";
		buffMe.addEventListener("click", Helper.quickBuffMe, true);
		playerInput.parentNode.appendChild(buffMe);

		var playerIDRE = /tid=(\d+)/;
		var playerID = playerIDRE.exec(location);
		if (playerID) {
			var playerID = playerID[1];
			System.xmlhttp("index.php?cmd=profile&player_id=" + playerID, Helper.getPlayerBuffs, false)
		}
		System.xmlhttp("index.php?cmd=profile", Helper.getSustain)
	},

	quickBuffMe: function() {
		var playerInput = System.findNode("//input[@name='targetPlayers']");
		playerInput.value=GM_getValue("CharacterName");
		if (Helper.tmpSelfProfile) {
			Helper.getPlayerBuffs(Helper.tmpSelfProfile, true);
		}
	},

	getPlayerBuffs: function(responseText, keepPlayerInput) {
		var injectHere = System.findNode("//input[@value='Activate Selected Skills']/parent::*/parent::*");
		var resultText = "<table align='center'><tr><td colspan='4' style='color:lime;font-weight:bold'>Buffs already on player:</td></tr>";

		if (keepPlayerInput) {
			var playerInput = System.findNode("//input[@name='targetPlayers']");
			var playerName = playerInput.value;
		}

		//low level buffs used to get the buff above are not really worth casting.
		var myBuffs = System.findNodes("//font[@size='1']");
		for (var i=0;i<myBuffs.length;i++) {
			var myBuff=myBuffs[i];
			var buffLevelRE = /\[(\d+)\]/
			var buffLevel = buffLevelRE.exec(myBuff.innerHTML)[1]*1;
			if (buffLevel < 75
			    && myBuff.innerHTML.search("Counter Attack") == -1 && myBuff.innerHTML.search("Quest Finder") == -1) {
				myBuff.style.color = "gray";
			}
		}

		//this could be formatted better ... it looks ugly but my quick attempts at putting it in a table didn't work.
		var doc=System.createDocument(responseText);
		var buffs = System.findNodes("//img[contains(@onmouseover,'tt_setWidth(105)')]", doc);
		if (buffs) {
			var buffRE, buff, buffName, buffLevel;
			for (var i=0;i<buffs.length;i++) {
				var aBuff=buffs[i];
				var onmouseover = aBuff.getAttribute("onmouseover");
				if (onmouseover.search("Summon Shield Imp") != -1) {
					//tt_setWidth(105); Tip('<center><b>Summon Shield Imp<br>6 HP remaining<br></b> (Level: 150)</b></center>');
					//tt_setWidth(105); Tip('<center><b>Summon Shield Imp<br> HP remaining<br></b> (Level: 165)</b></center>');
					buffRE = /<b>([ a-zA-Z]+)<br>([0-9]+) HP remaining<br><\/b> \(Level: (\d+)\)/
					buff = buffRE.exec(onmouseover);
					if (!buff) {
						buffRE = /<b>([ a-zA-Z]+)<br> HP remaining<br><\/b> \(Level: (\d+)\)/
						buff = buffRE.exec(onmouseover);
					}
					if (!buff) GM_log(onmouseover);
					buffName = buff[1];
					buffLevel = buff[3];
				} else {
					buffRE = /<b>([ a-zA-Z]+)<\/b> \(Level: (\d+)\)/
					buff = buffRE.exec(onmouseover);
					buffName = buff[1];
					buffLevel = buff[2];
				}
				resultText += ((i % 2 == 0)? "<tr>":"");
				resultText += "<td style='color:white; font-size:x-small'>" + buffName + "</td><td style='color:silver; font-size:x-small'>[" + buffLevel + "]</td>";
				resultText += ((i % 2 == 1)? "</tr>":"");
				var hasThisBuff = System.findNode("//font[contains(.,'" + buffName + "')]");
				if (hasThisBuff) {
					var buffLevelRE = /\[(\d+)\]/
					var buffLevel = parseInt(buffLevelRE.exec(hasThisBuff.innerHTML)[1]);
					if (buffLevel > 11) {
						hasThisBuff.style.color='lime';
					}
				}
			}
			resultText += ((i % 2 == 1)? "<td></td></tr>":"");
		} else {
			resultText += "<tr><td colspan='4' style='text-align:center;color:white; font-size:x-small'>[no buffs]</td></tr>";
		}

		//var playerLevel=Helper.findNodeText("//td[contains(b,'Level:')]/following-sibling::td[1]", doc);
		//var playerXP=Helper.findNodeText("//td[contains(b,'XP:')]/following-sibling::td[1]", doc);
		resultText += "</table>"

		var statistics = System.findNode("//tr[contains(td/b,'Statistics')]/following-sibling::tr[2]/td/table", doc);
		statistics.style.backgroundImage = 'url(' + System.imageServer + '/sigma2/skin/realm_top_b2.jpg)'; //Color='white';
		var staminaCell = statistics.rows[7].cells[1].firstChild.rows[0].cells[0];
		var curStamina = System.intValue(staminaCell.textContent.split("/")[0]);
		var maxStamina = System.intValue(staminaCell.textContent.split("/")[1]);
		staminaCell.textContent += "(" + Math.round((100.0*curStamina)/(1.0*maxStamina)) + "%)";

		var lastActivity = System.findNode("//font[contains(.,'Last Activity:')]", doc);
		if (lastActivity) {
			var newRow = statistics.insertRow(0);
			var newCell = newRow.insertCell(0);
			newCell.setAttribute('colspan', '4');
			newCell.style.textAlign='center';
			newCell.innerHTML=lastActivity.innerHTML + '<br/>';
		}

		resultText += statistics.parentNode.innerHTML;

		// injectHere.innerHTML += "<br/><span style='color:lime;font-weight:bold'>Buffs already on player:</span><br/>"
		injectHere.innerHTML += resultText; // "<br/><span style='color:lime;font-weight:bold'>Buffs already on player:</span><br/>"

		if (keepPlayerInput) {
			playerInput = System.findNode("//input[@name='targetPlayers']");
			playerInput.value = playerName;
		}
	},

	getSustain: function(responseText) {
		var doc=System.createDocument(responseText);
		Helper.tmpSelfProfile=responseText;
		var sustainText = System.findNode("//a[contains(@onmouseover,'<b>Sustain</b>')]", doc);
		if (!sustainText) return;
		var sustainMouseover = sustainText.parentNode.parentNode.parentNode.nextSibling.nextSibling.firstChild.getAttribute("onmouseover");
		var sustainLevelRE = /Level<br>(\d+)%/
		var sustainLevel = sustainLevelRE.exec(sustainMouseover)[1];
		var activateInput = System.findNode("//input[@value='activate']");
		var inputTable = activateInput.nextSibling.nextSibling;
		inputTable.rows[3].cells[0].align = "center";
		inputTable.rows[3].cells[0].innerHTML += " <span style='color:orange;'>Your Sustain level: " + sustainLevel + "%</span>";
		var furyCasterText = System.findNode("//a[contains(@onmouseover,'<b>Fury Caster</b>')]", doc);
		if (!furyCasterText) return;
		var furyCasterMouseover = furyCasterText.parentNode.parentNode.parentNode.nextSibling.nextSibling.firstChild.getAttribute("onmouseover");
		var furyCasterLevelRE = /Level<br>(\d+)%/
		var furyCasterLevel = furyCasterLevelRE.exec(furyCasterMouseover)[1];
		inputTable.rows[3].cells[0].innerHTML += " <span style='color:orange;'>Your Fury Caster level: " + furyCasterLevel + "%</span>";
		if (System.findNode("//img[contains(@onmouseover,'Buff Master')]", doc))
			inputTable.rows[3].cells[0].innerHTML += " <span style='color:orange;'>Buff Master:	On</span>";
		else
			inputTable.rows[3].cells[0].innerHTML += " <span style='color:orange;'>Buff Master: Off</span>";
	},

	getKillStreak: function(responseText) {
		var doc=System.createDocument(responseText);
		//Kill&nbsp;Streak:&nbsp;
		var killStreakText = System.findNode("//b[contains(.,'Kill')]", doc);
		if (killStreakText) {
			var killStreakLocation = killStreakText.parentNode.nextSibling;
			var playerKillStreakValue = System.intValue(killStreakLocation.textContent);
		}
		var killStreakElement = System.findNode("//span[@findme='killstreak']");
		killStreakElement.innerHTML = System.addCommas(playerKillStreakValue);
		GM_setValue("lastKillStreak", playerKillStreakValue);
		var deathDealerBuff = System.findNode("//img[contains(@onmouseover,'Death Dealer')]");
		var deathDealerRE = /<b>Death Dealer<\/b> \(Level: (\d+)\)/
		var deathDealer = deathDealerRE.exec(deathDealerBuff.getAttribute("onmouseover"));
		if (deathDealer) {
			var deathDealerLevel = deathDealer[1];
			var deathDealerPercentage = (Math.min(Math.floor(playerKillStreakValue/5) * 0.01 * deathDealerLevel, 20))
		}
		var deathDealerPercentageElement = System.findNode("//span[@findme='damagebonus']");
		deathDealerPercentageElement.innerHTML = deathDealerPercentage;
		GM_setValue("lastDeathDealerPercentage", deathDealerPercentage);
	},

	injectCreature: function() {
		System.xmlhttp("index.php?cmd=profile", Helper.getCreaturePlayerData)
	},

	getCreaturePlayerData: function(responseText) {
		//playerdata
		var doc=System.createDocument(responseText);
		var allItems = doc.getElementsByTagName("B");

		// get player stats
		var playerAttackValue  = parseInt(Helper.characterAttack);
		var playerDefenseValue = parseInt(Helper.characterDefense);
		var playerArmorValue   = parseInt(Helper.characterArmor);
		var playerDamageValue  = parseInt(Helper.characterDamage);
		var playerHPValue      = Helper.characterHP;
		var playerKillStreakValue = 0;

		//get buffs here later ... DD, CA, DC, Constitution, etc
		var allItems = doc.getElementsByTagName("IMG");
		var counterAttackLevel = 0;
		var doublerLevel = 0;
		var deathDealerLevel = 0;
		var darkCurseLevel = 0;
		var holyFlameLevel = 0;
		var constitutionLevel = 0;
		var sanctuaryLevel = 0;
		for (var i=0;i<allItems.length;i++) {
			var anItem=allItems[i];
			if (anItem.getAttribute("src").search("/skills/") != -1) {
				var onmouseover = anItem.getAttribute("onmouseover")
				var counterAttackRE = /<b>Counter Attack<\/b> \(Level: (\d+)\)/
				var counterAttack = counterAttackRE.exec(onmouseover);
				if (counterAttack) {
					counterAttackLevel = counterAttack[1];
				}
				var doublerRE = /<b>Doubler<\/b> \(Level: (\d+)\)/
				var doubler = doublerRE.exec(onmouseover);
				if (doubler) {
					doublerLevel = doubler[1];
				}
				var deathDealerRE = /<b>Death Dealer<\/b> \(Level: (\d+)\)/
				var deathDealer = deathDealerRE.exec(onmouseover);
				if (deathDealer) {
					deathDealerLevel = deathDealer[1];
				}
				var darkCurseRE = /<b>Dark Curse<\/b> \(Level: (\d+)\)/
				var darkCurse = darkCurseRE.exec(onmouseover);
				if (darkCurse) {
					darkCurseLevel = darkCurse[1];
				}
				var holyFlameRE = /<b>Dark Curse<\/b> \(Level: (\d+)\)/
				var holyFlame = holyFlameRE.exec(onmouseover);
				if (holyFlame) {
					holyFlameLevel = holyFlame[1];
				}
				var constitutionRE = /<b>Constitution<\/b> \(Level: (\d+)\)/
				var constitution = constitutionRE.exec(onmouseover);
				if (constitution) {
					constitutionLevel = constitution[1];
				}
				var sanctuaryRE = /<b>Sanctuary<\/b> \(Level: (\d+)\)/
				var sanctuary = sanctuaryRE.exec(onmouseover);
				if (sanctuary) {
					sanctuaryLevel = sanctuary[1];
				}
			}
		}
		//Creature Data
		var creatureStatTable = System.findNode("//table[tbody/tr/td[contains(@style,'sigma2/statistics_head_bg.gif')]]");

		if (!creatureStatTable) {return;}
		var creatureClass   = creatureStatTable.rows[1].cells[1].textContent;
		var creatureLevel   = creatureStatTable.rows[1].cells[3].textContent;
		var creatureAttack  = System.intValue(creatureStatTable.rows[2].cells[1].textContent);
		var creatureDefense = System.intValue(creatureStatTable.rows[2].cells[3].textContent);
		var creatureArmor   = System.intValue(creatureStatTable.rows[3].cells[1].textContent);
		var creatureDamage  = System.intValue(creatureStatTable.rows[3].cells[3].textContent);
		var creatureHP      = System.intValue(creatureStatTable.rows[4].cells[1].textContent);
		//math section ... analysis
		//Holy Flame adds its bonus after the armor of the creature has been taken off.
		var extraNotes = "";
		if (creatureClass == "Undead") {
			playerDamageValue = playerDamageValue + ((playerDamageValue - creatureArmor) * holyFlameLevel * 0.002);
			var holyFlameBonusDamage = Math.floor((playerDamageValue - creatureArmor) * holyFlameLevel * 0.002);
			extraNotes += (holyFlameLevel > 0? "HF Bonus Damage = " + holyFlameBonusDamage + "<br>":"");
		}
		//Death Dealer and Counter Attack both applied at the same time
		var deathDealerBonusDamage = Math.floor(playerDamageValue * (Math.min(Math.floor(playerKillStreakValue/5) * 0.01 * deathDealerLevel, 20)/100));
		var counterAttackBonusAttack = Math.ceil(playerAttackValue * 0.0025 * counterAttackLevel);
		var counterAttackBonusDamage = Math.ceil(playerDamageValue * 0.0025 * counterAttackLevel);
		var extraStaminaPerHit = (counterAttackLevel > 0? Math.ceil((1+(500/50))*0.0025*counterAttackLevel) :0);
		playerAttackValue += counterAttackBonusAttack;
		playerDamageValue += deathDealerBonusDamage + counterAttackBonusDamage;
		extraNotes += (deathDealerLevel > 0? "DD Bonus Damage = " + deathDealerBonusDamage + "<br>":"");
		if (counterAttackLevel > 0) {
			extraNotes += "CA Bonus Attack = " + counterAttackBonusAttack + "<br>";
			extraNotes += "CA Bonus Damage = " + counterAttackBonusDamage + "<br>";
			extraNotes += "CA Extra Stam Used = " + extraStaminaPerHit + "<br>";
		}
		//Attack:
		extraNotes += (darkCurseLevel > 0? "DC Bonus Attack = " + Math.floor(creatureDefense * darkCurseLevel * 0.002) + "<br>":"");
		var hitByHowMuch = (playerAttackValue - Math.ceil(1.1053*(creatureDefense - (creatureDefense * darkCurseLevel * 0.002))));
		//Damage:
		var damageDone = Math.floor(playerDamageValue - ((1.1053*creatureArmor) + (1.053*creatureHP)));
		var numberOfHitsRequired = (hitByHowMuch > 0? Math.ceil((1.053*creatureHP)/((playerDamageValue < (1.1053*creatureArmor))? 1: playerDamageValue - (1.1053*creatureArmor))):"-");
		//Defense:
		extraNotes += (constitutionLevel > 0? "Constitution Bonus Defense = " + Math.floor(playerDefenseValue * constitutionLevel * 0.001) + "<br>":"");
		var creatureHitByHowMuch = Math.floor((1.1053*creatureAttack) - (playerDefenseValue + (playerDefenseValue * constitutionLevel * 0.001)));
		//Armor and HP:
		extraNotes += (sanctuaryLevel > 0? "Sanc Bonus Armor = " + Math.floor(playerArmorValue * sanctuaryLevel * 0.001) + "<br>":"");
		var creatureDamageDone = Math.ceil((1.1053*creatureDamage) - (playerArmorValue + (playerArmorValue * sanctuaryLevel * 0.001) + playerHPValue));
		var numberOfCreatureHitsTillDead = (creatureHitByHowMuch >= 0? Math.ceil(playerHPValue/(((1.1053*creatureDamage) < (playerArmorValue + (playerArmorValue * sanctuaryLevel * 0.001)))? 1: (1.1053*creatureDamage) - (playerArmorValue + (playerArmorValue * sanctuaryLevel * 0.001)))):"-");
		//Analysis:
		var playerHits = (numberOfCreatureHitsTillDead=="-"? numberOfHitsRequired:(numberOfHitsRequired=="-"?"-":(numberOfHitsRequired>numberOfCreatureHitsTillDead?"-":numberOfHitsRequired)));
		var creatureHits = (numberOfHitsRequired=="-"?numberOfCreatureHitsTillDead:(numberOfCreatureHitsTillDead=="-"?"-":(numberOfCreatureHitsTillDead>numberOfHitsRequired?"-":numberOfCreatureHitsTillDead)));
		var fightStatus = "Unknown";
		if (playerHits == "-" && creatureHits == "-") {
			fightStatus = "Unresolved";
		} else if (playerHits == "-") {
			fightStatus = "Player dies";
		} else if (playerHits == 1) {
			fightStatus = "Player 1 hits" + (numberOfCreatureHitsTillDead-numberOfHitsRequired<=1? ", dies on miss":", survives a miss");
		} else if (playerHits > 1) {
			fightStatus = "Player > 1 hits" + (numberOfCreatureHitsTillDead-numberOfHitsRequired<=1? ", dies on miss":", survives a miss");
		}
		//display data
		var newRow = creatureStatTable.insertRow(creatureStatTable.rows.length);
		var newCell = newRow.insertCell(0);
		newCell.colSpan = '4';
		newCell.innerHTML = "<table width='100%'><tbody><tr><td bgcolor='#110011' colspan='4' align='center'>Combat Evaluation</td></tr>" +
			"<tr><td align='right'><span style='color:#333333'>Will I hit it? </td><td align='left'>" + (hitByHowMuch > 0? "Yes":"No") + "</td>" +
				"<td align='right'><span style='color:#333333'>Extra Attack: </td><td align='left'>( " + hitByHowMuch + " )</td></tr>" +
			"<tr><td align='right'><span style='color:#333333'># Hits to kill it? </td><td align='left'>" + numberOfHitsRequired + "</td>" +
				"<td align='right'><span style='color:#333333'>Extra Damage: </td><td align='left'>( " + damageDone + " )</td></tr>" +
			"<tr><td align='right'><span style='color:#333333'>Will I be hit? </td><td align='left'>" + (creatureHitByHowMuch >= 0? "Yes":"No") + "</td>" +
				"<td align='right'><span style='color:#333333'>Extra Defense: </td><td align='left'>( " + creatureHitByHowMuch + " )</td></tr>" +
			"<tr><td align='right'><span style='color:#333333'># Hits to kill me? </td><td align='left'>" + numberOfCreatureHitsTillDead + "</td>" +
				"<td align='right'><span style='color:#333333'>Extra Armor + HP: </td><td align='left'>( " + creatureDamageDone + " )</td></tr>" +
			"<tr><td align='right'><span style='color:#333333'># Player Hits? </td><td align='left'>" + playerHits + "</td>" +
				"<td align='right'><span style='color:#333333'># Creature Hits? </td><td align='left'>" + creatureHits + "</td></tr>" +
			"<tr><td align='right'><span style='color:#333333'>Fight Status: </span></td><td align='left' colspan='3'><span>" + fightStatus + "</span></td></tr>" +
			"<tr><td align='right'><span style='color:#333333'>Notes: </span></td><td align='left' colspan='3'><span style='font-size:x-small;'>" +
				extraNotes + "</span></td></tr>" +
			"<tr><td colspan='4'><span style='font-size:x-small; color:gray'>" +
				"*Does include CA, DD, HF, DC, Sanctuary and Constitution (if active) and allow for randomness (1.1053).</span></td></tr>" +
			"</tbody></table>";
	},

	injectBioWidgets: function() {
		var textArea = System.findNode("//textarea[@name='bio']");
		//textArea.rows=15;
		textArea.cols=60;
		textArea.id = "biotext";
		var textAreaTable = textArea.parentNode.parentNode.parentNode.parentNode;
		var bioPreviewHTML = System.convertTextToHtml(textArea.value);
		var newRow = textAreaTable.insertRow(-1);
		var newCell = newRow.insertCell(0);
		newCell.innerHTML = '<table align="center" width="325" border="1"><tbody>' +
			'<tr><td style="text-align:center;color:#7D2252;background-color:#110011">Preview</td></tr>' +
			'<tr><td width="325"><span style="font-size:small;" findme="biopreview">' + bioPreviewHTML +
			'</span></td></tr></tbody></table>';
		var innerTable = System.findNode("//table[tbody/tr/td/font/b[.='Update your Character Biography']]");
		var crCount = 0;
		var startIndex = 0;
		while (textArea.value.indexOf('\n',startIndex+1) != -1) {
			crCount++;
			startIndex = textArea.value.indexOf('\n',startIndex+1);
		}
		innerTable.rows[4].cells[0].innerHTML += "<span style='color:#ADB5B5;'>Character count = </span><span findme='biolength' style='color:#ADB5B5;'>" +
			(textArea.value.length + crCount) + "</span><span style='color:#ADB5B5;'>/</span><span findme='biototal' style='color:#ADB5B5;'>255</span>";

		document.getElementById('biotext').addEventListener('keyup', Helper.updateBioCharacters, true);
		System.xmlhttp("index.php?cmd=points", Helper.getTotalBioCharacters);
	},

	injectShoutboxWidgets: function(textboxname, maxcharacters) {
		var textArea = System.findNode("//textarea[@name='" + textboxname + "']");
		textArea.setAttribute("findme", "Helper:InputText");
		textArea.setAttribute("maxcharacters", maxcharacters);
		var textAreaTable = System.findNode("../../../..", textArea);
		textAreaTable.insertRow(-1).insertCell(0).setAttribute("id", "Helper:ShoutboxPreview");
		textArea.addEventListener('keyup', Helper.updateShoutboxPreview, true);
	},

	updateShoutboxPreview: function(evt) {
		var textArea = System.findNode("//textarea[@findme='Helper:InputText']");
		var textContent = textArea.value;
		var chars = textContent.length;
		var maxchars = parseInt(textArea.getAttribute("maxcharacters"));
		if (chars>maxchars) {
			textContent=textContent.substring(0,maxchars);
			textArea.value=textContent;
			chars=maxchars;
		}

		document.
			getElementById("Helper:ShoutboxPreview")
			.innerHTML = '<table align="center" width="325" border="0"><tbody>' +
			'<tr><td style="text-align:center;color:#B5B1AB;background-color:#181A1B;">Preview (' + chars + '/' + maxchars + ' characters)</td></tr>' +
			'<tr><td width="325"><span style="font-size:x-small;" findme="biopreview">' + textContent +
			'</span></td></tr></tbody></table>';

	},

	updateBioCharacters: function(evt) {
		var textArea = System.findNode("//textarea[@name='bio']");
		var characterCount = System.findNode("//span[@findme='biolength']");
		var crCount = 0;
		var startIndex = 0;
		while (textArea.value.indexOf('\n',startIndex+1) != -1) {
			crCount++;
			startIndex = textArea.value.indexOf('\n',startIndex+1);
		}
		characterCount.innerHTML = (textArea.value.length + crCount);
		var bioTotal = System.findNode("//span[@findme='biototal']");
		if ((characterCount.innerHTML*1) > (bioTotal.innerHTML*1)) {
			characterCount.style.color = "red";
		} else {
			characterCount.style.color = "#ADB5B5";
		}
		var previewArea = System.findNode("//span[@findme='biopreview']");
		var bioPreviewHTML = System.convertTextToHtml(textArea.value);
		previewArea.innerHTML = bioPreviewHTML;
	},

	getTotalBioCharacters: function(responseText) {
		var doc=System.createDocument(responseText)
		var bioCharactersText = System.findNode("//td[.='+25 Bio Characters']",doc);
		var bioCharactersRatio = bioCharactersText.nextSibling.nextSibling.nextSibling.nextSibling;
		var bioCharactersValueRE = /(\d+) \/ 75/;
		var bioCharactersValue = bioCharactersValueRE.exec(bioCharactersRatio.innerHTML)[1]*1;
		var bioTotal = System.findNode("//span[@findme='biototal']");
		bioTotal.innerHTML = (bioCharactersValue * 25) + 255;
	},

	addHistoryWidgets: function() {
		var textArea = System.findNode("//textarea[@name='history']");
		if (!textArea) return;
		var textAreaTable = textArea.parentNode.parentNode.parentNode.parentNode;
		var bioPreviewHTML = System.convertTextToHtml(textArea.value);
		var newRow = textAreaTable.insertRow(-1);
		var newCell = newRow.insertCell(0);
		newCell.innerHTML = '<table align="center" width="325" border="1"><tbody>' +
			'<tr><td style="text-align:center;color:#7D2252;background-color:#110011">Preview</td></tr>' +
			'<tr><td width="325"><span style="font-size:small;" findme="biopreview">' + bioPreviewHTML +
			'</span></td></tr></tbody></table>';
		textArea.id = "historytext";
		var innerTable = System.findNode("//table[tbody/tr/td/font/b[.='Edit Faction History']]");
		var crCount = 0;
		var startIndex = 0;
		while (textArea.value.indexOf('\n',startIndex+1) != -1) {
			crCount++;
			startIndex = textArea.value.indexOf('\n',startIndex+1);
		}
		innerTable.rows[4].cells[0].innerHTML += "<span style='color:#ADB5B5;'>Character count = </span><span findme='historylength' style='color:#ADB5B5;'>" +
			(textArea.value.length + crCount) + "</span><span style='color:#ADB5B5;'>/</span><span findme='historytotal' style='color:#ADB5B5;'>255</span>";

		document.getElementById('historytext').addEventListener('keyup', Helper.updateHistoryCharacters, true);
		System.xmlhttp("index.php?cmd=points&subcmd=guildupgrades", Helper.getTotalHistoryCharacters);
	},

	updateHistoryCharacters: function(evt) {
		var textArea = System.findNode("//textarea[@name='history']");
		var characterCount = System.findNode("//span[@findme='historylength']");
		var crCount = 0;
		var startIndex = 0;
		while (textArea.value.indexOf('\n',startIndex+1) != -1) {
			crCount++;
			startIndex = textArea.value.indexOf('\n',startIndex+1);
		}
		characterCount.innerHTML = (textArea.value.length + crCount);
		var bioTotal = System.findNode("//span[@findme='historytotal']");
		if ((characterCount.innerHTML*1) > (bioTotal.innerHTML*1)) {
			characterCount.style.color = "red";
		} else {
			characterCount.style.color = "#ADB5B5";
		}
		var previewArea = System.findNode("//span[@findme='biopreview']");
		var bioPreviewHTML = System.convertTextToHtml(textArea.value);
		previewArea.innerHTML = bioPreviewHTML;
	},

	getTotalHistoryCharacters: function(responseText) {
		var doc=System.createDocument(responseText)
		var historyCharactersText = System.findNode("//td[.='+20 History Characters']",doc);
		var historyCharactersRatio = historyCharactersText.nextSibling.nextSibling.nextSibling.nextSibling;
		var historyCharactersValueRE = /(\d+) \/ 250/;
		var historyCharactersValue = historyCharactersValueRE.exec(historyCharactersRatio.innerHTML)[1]*1;
		var historyTotal = System.findNode("//span[@findme='historytotal']");
		historyTotal.innerHTML = (historyCharactersValue * 20) + 255;
	},

	portalToStartArea: function() {
		if (window.confirm('Are you sure you with to use a special portal back to Taulin Rad Lands?')) {
			var krulXCV = GM_getValue("krulXCV");
			if (krulXCV) {
				System.xmlhttp("index.php?cmd=settings&subcmd=fix&xcv=" + krulXCV, function() {window.location="index.php?cmd=world";})
			} else {
				window.alert("Please visit the preferences page to cache your Krul Portal link");
			}
		}
	},

	storePlayerUpgrades: function() {
		var alliesText = System.findNode("//td[.='+1 Max Allies']");
		var alliesRatio = alliesText.nextSibling.nextSibling.nextSibling.nextSibling;
		var alliesValueRE = /(\d+) \/ 115/;
		var alliesValue = alliesValueRE.exec(alliesRatio.innerHTML)[1]*1;
		GM_setValue("alliestotal",alliesValue+5);
		var enemiesText = System.findNode("//td[.='+1 Max Enemies']");
		var enemiesRatio = enemiesText.nextSibling.nextSibling.nextSibling.nextSibling;
		var enemiesValueRE = /(\d+) \/ 115/;
		var enemiesValue = enemiesValueRE.exec(enemiesRatio.innerHTML)[1]*1;
		GM_setValue("enemiestotal",enemiesValue+5);
	},

	injectTopRated: function() {
		var mainTable = System.findNode("//table[tbody/tr/td/font/b[.='Top 250 Players']]");
		var mainTitle = mainTable.rows[0].cells[0];
		mainTitle.innerHTML += '&nbsp<input id="findOnlinePlayers" type="button" value="Find Online Players" ' +
			'title="Fetch the online status of the top 250 players (warning ... takes a few seconds)." class="custombutton">';

		document.getElementById('findOnlinePlayers').addEventListener('click', Helper.findOnlinePlayers, true);
	},

	findOnlinePlayers: function() {
		var findPlayersButton = System.findNode("//input[@id='findOnlinePlayers']");
		findPlayersButton.style.display = "none";
		var topPlayerTable = System.findNode("//table[@width='500']");
		var lowestLevel = topPlayerTable.rows[topPlayerTable.rows.length-4].cells[3].textContent*1;
		GM_setValue("lowestLevelInTop250",lowestLevel);
		var guildsChecked = "";
		for (var i=0; i<topPlayerTable.rows.length; i++) {
			var aRow = topPlayerTable.rows[i];
			if (aRow.cells[1] && i!=0) {
				var playerTable = topPlayerTable.rows[i].cells[1].firstChild;
				var playerElement = playerTable.rows[0].cells[0];
				var playerGuildHref = playerElement.firstChild.getAttribute("href");
				var playerGuildName = playerElement.firstChild.firstChild.getAttribute("title");
				//GM_log(guildsChecked.indexOf(playerGuildName));
				//if we haven't already checked this guild, then go ahead and check it
				if (guildsChecked.search(playerGuildName) == -1) {
					//GM_log(i+"::"+playerGuildName + "::" + playerGuildHref + "::" + aRow.innerHTML + "::" + guildsChecked);
					System.xmlhttp(playerGuildHref, Helper.parseGuildOnline);
					//log current guild as checked.
					guildsChecked += ' ' + playerGuildName;
				}
			}
		}
	},

	parseGuildOnline: function(responseText) {
		var topPlayerTable = System.findNode("//table[@width='500']");
		var lowestLevel = GM_getValue("lowestLevelInTop250");
		var doc=System.createDocument(responseText);
		memberTable = System.findNode("//table[tbody/tr/td[.='Rank']]", doc);
		for (var i=0; i<memberTable.rows.length; i++) {
			aRow = memberTable.rows[i];
			if (aRow.cells[1] && i!= 0) {
				onlineStatus = aRow.cells[0].innerHTML;
				playerName = aRow.cells[1].firstChild.nextSibling.innerHTML;
				playerLevel = aRow.cells[2].textContent*1;
				if (playerLevel >= lowestLevel) { // don't bother looking if they are a low level
					//var playerInTopPlayerList = System.findNode("//a[.='" + playerName +"']", topPlayerTable); // didn't work so had to comprimise.
					var playerInTopPlayerList = System.findNode("//a[.='" + playerName +"']");
					var inTopPlayerTable = System.findNode("//table[@width='500' and contains(.,'" + playerName +"')]");
					if (playerInTopPlayerList && inTopPlayerTable) {
						insertHere = playerInTopPlayerList.parentNode;
						insertHere.innerHTML += '&nbsp' + onlineStatus;
					}
				}
			}
		}
	},

	injectArena: function() {
		arenaTable = System.findNode("//table[@width=620]/tbody/tr/td[contains(.,'Reward')]/table");
		arenaTable.style.fontSize = 'x-small';
		for (var i=1; i<arenaTable.rows.length; i++){
			var row = arenaTable.rows[i];
			row.style.backgroundColor = ((i % 2)==0)?"#151f1e":"#112322";
		}

		var titleCells=System.findNodes("//td[@bgcolor='#cd9e4b']");
		for (var i=0; i<titleCells.length; i++) {
			var cell=titleCells[i];
			if (cell.innerHTML.search("Max Equip Level") != -1
				|| cell.innerHTML.search("Join Cost") != -1
				|| cell.innerHTML.search("Specials") != -1
				|| cell.innerHTML.search("Hell Forge") != -1
				) {
				cell.style.textDecoration="underline";
				cell.style.cursor="pointer";
				cell.innerHTML=cell.innerHTML.replace(/^&nbsp;/,"");
				cell.addEventListener('click', Helper.sortArena, true);
			}
		}
	},

	sortArena: function(evt) {
		var headerClicked=evt.target.textContent.replace(/[ \s]/g,"");
		var parentTables=System.findNodes("ancestor::table", evt.target)
		var list=parentTables[parentTables.length-1];

		Helper.arenaRows = new Array();
		for (var i=1; i<list.rows.length; i++){
			var theRow=list.rows[i];
			Helper.arenaRows[i-1] = {
				'ArenaID': theRow.cells[0].textContent,
				'Players': theRow.cells[1].textContent,
				'JoinCost': theRow.cells[2].textContent.replace(/,/g,"")*1,
				'JoinCostHTML': theRow.cells[2].innerHTML,
				'State': theRow.cells[3].textContent,
				'Specials[?]': (theRow.cells[4].firstChild.getAttribute("src").search("/specials_1.gif") == -1? 1:0),
				'SpecialsHTML': theRow.cells[4].innerHTML,
				'HellForge[?]': (theRow.cells[5].firstChild.getAttribute("src").search("/specials_1.gif") == -1? 1:0),
				'HellForgeHTML': theRow.cells[5].innerHTML,
				'MaxEquipLevel': theRow.cells[6].textContent*1,
				'MaxEquipLevelHTML': theRow.cells[6].innerHTML,
				'Reward': theRow.cells[7].innerHTML,
				'Action': theRow.cells[8].innerHTML,
			};
		}

		if (Helper.sortAsc==undefined) Helper.sortAsc=false;
		if (Helper.sortBy && Helper.sortBy==headerClicked) {
			Helper.sortAsc=!Helper.sortAsc;
		}
		Helper.sortBy=headerClicked;

		if (headerClicked=="Member") {
			Helper.arenaRows.sort(Helper.stringSort)
		}
		else {
			Helper.arenaRows.sort(Helper.numberSort)
		}
		var result='<tr>' + list.rows[0].innerHTML + '</tr>'

		for (var i=0; i<Helper.arenaRows.length; i++){
			var r = Helper.arenaRows[i];
			var bgColor=((i % 2)==0)?'bgcolor="#e7c473"':'bgcolor="#e2b960"'
			if (r.Action.search("View") != -1) {
				bgColor = 'bgcolor="#f5e2b3"';
			}
			result += '<TR>'+
			'<TD '+bgColor+' style="border-bottom:1px solid #CD9E4B;">'+r.ArenaID+'</TD>'+
			'<TD '+bgColor+' align="center" style="border-bottom:1px solid #CD9E4B;">'+r.Players+'</TD>'+
			'<TD '+bgColor+' align="center" style="border-bottom:1px solid #CD9E4B;">'+r.JoinCostHTML+'</TD>'+
			'<TD '+bgColor+' align="center" style="border-bottom:1px solid #CD9E4B;">'+r.State+'</TD>'+
			'<TD '+bgColor+' align="center" style="border-bottom:1px solid #CD9E4B;">'+r.SpecialsHTML+'</TD>'+
			'<TD '+bgColor+' align="center" style="border-bottom:1px solid #CD9E4B;">'+r.HellForgeHTML+'</TD>'+
			'<TD '+bgColor+' align="center" style="border-bottom:1px solid #CD9E4B;">'+r.MaxEquipLevelHTML+'</TD>'+
			'<TD '+bgColor+' align="center" style="border-bottom:1px solid #CD9E4B;">'+r.Reward+'</TD>'+
			'<TD '+bgColor+' align="center" style="border-bottom:1px solid #CD9E4B;"><form method="post" action="index.php">'+r.Action+'</form></TD></TR>';
		}
		//result+='<tr>' + list.rows[list.rows.length-1].innerHTML + '</tr>'

		list.innerHTML=result;

		for (var i=0; i<list.rows[0].cells.length; i++) {
			var cell=list.rows[0].cells[i];
			if (cell.innerHTML.search("Max Equip Level") != -1
				|| cell.innerHTML.search("Join Cost") != -1
				|| cell.innerHTML.search("Specials") != -1
				|| cell.innerHTML.search("Hell Forge") != -1
				) {
				cell.style.textDecoration="underline";
				cell.style.cursor="pointer";
				cell.innerHTML=cell.innerHTML.replace(/^&nbsp;/,"");
				cell.addEventListener('click', Helper.sortArena, true);
			}
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
		result += '<input name="guild' + guildType + '" size="50" value="' + GM_getValue("guild" + guildType) + '">'
		result += '<span style="cursor:pointer;text-decoration:none;" id="toggleShowGuild' + guildType + 'Message" linkto="showGuild' +
			guildType + 'Message"> &#x00bb;</span>'
		result += '<div id="showGuild' + guildType + 'Message" style="visibility:hidden;display:none">'
		result += '<input name="guild' + guildType + 'Message" size="50" value="' + GM_getValue("guild" + guildType + "Message") + '">'
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
		var lastCheck=new Date(parseInt(GM_getValue("lastVersionCheck")));
		var buffs=GM_getValue("huntingBuffs");

		var configData=
			'<form><table width="100%" cellspacing="0" cellpadding="2" border="0">' +
			'<tr><td colspan="2" height="1" bgcolor="#333333"></td></tr>' +
			'<tr><th colspan="2" align="left" style="color:#D4FAFF;">Sigma Storm Helper configuration</th></tr>' +
			'<tr><td colspan="2" align=center><input type="button" class="custombutton" value="Check for updates" id="Helper:CheckUpdate"></td></tr>'+
			'<tr><td colspan="2" align=center><span style="font-size:xx-small">(Current version: ' + GM_getValue("currentVersion") + ', Last check: ' + Helper.formatDateTime(lastCheck) +
			')</span></td></tr>' +
			'<tr><th colspan="2" align="left" style="color:#D4FAFF;">Social Preferences</th></tr>' +
			'<tr><td colspan="2" align="left">Enter faction names, seperated by commas</td></tr>' +
			'<tr><td align="right">Own Faction:</td><td>'+ Helper.injectSettingsGuildData("Self") + '</td></tr>' +
			'<tr><td align="right">Friendly Factions:</td><td>'+ Helper.injectSettingsGuildData("Frnd") + '</td></tr>' +
			'<tr><td align="right">Old Factions:</td><td>'+ Helper.injectSettingsGuildData("Past") + '</td></tr>' +
			'<tr><td align="right">Enemy Factions:</td><td>'+ Helper.injectSettingsGuildData("Enmy") + '</td></tr>' +
			'<tr><td align="right">'+Layout.networkIcon()+'Online Faction Members' + Helper.helpLink('Show Faction Online Members List', 'This will show the faction members online list on the right.') +
				':</td><td><input name="enableGuildOnlineList" type="checkbox" value="on"' + (GM_getValue("enableGuildOnlineList")?" checked":"") +
				'> <input name="guildOnlineRefreshTime" size="1" value="'+ GM_getValue("guildOnlineRefreshTime") + '" /> seconds refresh</td></tr>' +
			'<td align="right">Chat top to bottom' + Helper.helpLink('Chat top to bottom', 'When selected, chat messages run from top (older) to bottom (newer), as in most chat programs. ' +
				'When not, messages run as they are in HCS\'s chat') + ':</td><td><input name="chatTopToBottom" type="checkbox" value="on"' + (GM_getValue("chatTopToBottom")?" checked":"") + '></td></tr>' +
			'<tr><td align="right">'+Layout.networkIcon()+'Show chat lines' + Helper.helpLink('Chat lines', 'Display the last {n} lines from faction chat (set to 0 to disable).' +
				((System.browserVersion<3)?'<br/>Does not work in Firefox 2 - suggest setting to 0 or upgrading to Firefox 3.':'')) +
				':</td><td><input name="enableChat" type="checkbox" value="on"' + (GM_getValue("chatLines")>0?" checked":"") + '">'+
				'<input name="chatLines" size="3" value="' + GM_getValue("chatLines") + '"></td></tr>' +
			'<tr><th colspan="2" align="left" style="color:#D4FAFF;">Other preferences</th></tr>' +
			'<tr><td align="right">Quick Kill ' + Helper.helpLink('Quick Kill Style', 'Unchecking the checkbox will prevent this option from displaying on the world screen.<br/>'+
				'<b><u>single</u></b> will fast kill a single monster<br>' +
				'<u><b>type</b></u> will fast kill a type of monster<br><u><b>off</b></u> returns control to game normal.') +
				':</td><td>' +
				'<input name="showQuickKillOnWorld" type="checkbox" value="on"' + (GM_getValue("showQuickKillOnWorld")?" checked":"") + '>' +
				'<input type="radio" name="killAllAdvanced" value="off"' + ((GM_getValue("killAllAdvanced") == "off")?" checked":"") + '>off' +
				'<input type="radio" name="killAllAdvanced" value="single"' + ((GM_getValue("killAllAdvanced") == "single")?" checked":"") + '>single'+
				'<input type="radio" name="killAllAdvanced" value="type"' + ((GM_getValue("killAllAdvanced") == "type")?" checked":"") + '>type' +
				'</td></tr>' +
			'<tr><td align="right">Move SS box' + Helper.helpLink('Move SS2 Box', 'This will move the SS2 box to the left, under the menu, for better visibility (unless it is already hidden.') +
				':</td><td><input name="moveFSBox" type="checkbox" value="on"' + (GM_getValue("moveFSBox")?" checked":"") + '></td></tr>' +
			'<tr><td align="right">Keep Combat Logs' + Helper.helpLink('Keep Combat Logs', 'Save combat logs to a temporary variable. '+
				'Press <u>Show logs</u> on the right to display and copy them') +
				':</td><td><input name="keepLogs" type="checkbox" value="on"' + (GM_getValue("keepLogs")?" checked":"") + '>' +
				'&nbsp;&nbsp;<input type="button" class="custombutton" value="Show" id="Helper:ShowLogs"></td></tr>' +
			'<tr><td align="right">Show rank controls' + Helper.helpLink('Show rank controls', 'Show ranking controls for guild managemenet in member profile page - ' +
				'this works for guild founders only') +
				':</td><td><input name="showAdmin" type="checkbox" value="on"' + (GM_getValue("showAdmin")?" checked":"") + '></td></tr>' +
			'<tr><td align="right">Cleanup faction log' + Helper.helpLink('Dim Non Player Faction Log Messages', 'Any log messages not related to the ' +
				'current player will be dimmed (e.g. recall messages from guild store)') +
				':</td><td><input name="hideNonPlayerGuildLogMessages" type="checkbox" value="on"' + (GM_getValue("hideNonPlayerGuildLogMessages")?" checked":"") + '></td></td></tr>' +
			'<tr><td align="right">Disable Item Coloring' + Helper.helpLink('Disable Item Coloring', 'Disable the code that colors the item text based on the rarity of the item.') +
				':</td><td><input name="disableItemColoring" type="checkbox" value="on"' + (GM_getValue("disableItemColoring")?" checked":"") + '></td></tr>' +
			'<tr><td align="right">Enable Log Coloring' + Helper.helpLink('Enable Log Coloring', 'Three logs will be colored if this is enabled, Faction Chat, Faction Log and Player Log. ' +
				'It will show any new messages in yellow and anything 20 minutes old ones in brown.') +
				':</td><td><input name="enableLogColoring" type="checkbox" value="on"' + (GM_getValue("enableLogColoring")?" checked":"") + '></td></td></tr>' +
			'<tr><td align="right">Show Completed Quests' + Helper.helpLink('Show Completed Quests', 'This will show completed quests that have been hidden and will also show any ' +
				'quests you might have missed.') +
				':</td><td><input name="showCompletedQuests" type="checkbox" value="on"' + (GM_getValue("showCompletedQuests")?" checked":"") + '></td>' +
			'<tr><td align="right">Show Combat Log' + Helper.helpLink('Show Combat Log', 'This will show the combat log for each automatic battle below the monster list.') +
				':</td><td><input name="showCombatLog" type="checkbox" value="on"' + (GM_getValue("showCombatLog")?" checked":"") + '></td></tr>' +
			'<tr><td align="right">'+Layout.networkIcon()+'Show Creature Info' + Helper.helpLink('Show Creature Info', 'This will show the information from the view creature link when you mouseover the link.' +
				((System.browserVersion<3)?'<br>Does not work in Firefox 2 - suggest disabling or upgrading to Firefox 3.':'')) +
				':</td><td><input name="showCreatureInfo" type="checkbox" value="on"' + (GM_getValue("showCreatureInfo")?" checked":"") + '></td></tr>' +
			'<tr><td align="right">Hide <small>Taulin Rad Lands</small> Portal' + Helper.helpLink('Hide Taulin Rad Lands Portal', 'This will hide the Taulin Rad Lands portal on the world screen.') +
				':</td><td><input name="hideKrulPortal" type="checkbox" value="on"' + (GM_getValue("hideKrulPortal")?" checked":"") + '></td></tr>' +
			'<tr><td align="right">Footprints Color:</td><td><input name="footprintsColor" size="9" value="'+ GM_getValue("footprintsColor") + '" /></td></tr>' +
			'<tr><td align="right">Hunting Buffs' + Helper.helpLink('Hunting Buffs', 'Customize which buffs are designated as hunting buffs. You must type the full name of each buff, ' +
				'separated by commas. Use the checkbox to enable/disable them.') +
				':</td><td><input name="showHuntingBuffs" type="checkbox" value="on"' + (GM_getValue("showHuntingBuffs")?" checked":"") + '>' +
				'<input name="huntingBuffs" size="50" value="'+ buffs + '" /></td></tr>' +
			'<tr><td align="right">Hide Specific Quests' + Helper.helpLink('Hide Specific Quests', 'If enabled, this hides quests whose name matches the list (separated by commas). ' +
				'This works on Quest Manager and Quest Book.') +
				':</td><td><input name="hideQuests" type="checkbox" value="on"' + (GM_getValue("hideQuests")?" checked":"") + '>' +
				'<input name="hideQuestNames" size="50" value="'+ GM_getValue("hideQuestNames") + '" /></td></tr>' +
			'<tr><td align="right">Hide Specific Recipes' + Helper.helpLink('Hide Specific Recipes', 'If enabled, this hides recipes whose name matches the list (separated by commas). ' +
				'This works on Recipe Manager') +
				':</td><td><input name="hideRecipes" type="checkbox" value="on"' + (GM_getValue("hideRecipes")?" checked":"") + '>' +
				'<input name="hideRecipeNames" size="50" value="'+ GM_getValue("hideRecipeNames") + '" /></td></tr>' +
			//save button
			'<tr><td colspan="2" align=center><input type="button" class="custombutton" value="Save" id="Helper:SaveOptions"></td></tr>' +
			'<tr><td colspan="2" align=center>' +
			'<span style="font-size:xx-small">Sigma Storm Helper was coded by <a href="' + System.server + 'index.php?cmd=profile&player_id=1106198">Coccinella</a>, ' +
			'<a href="' + System.server + 'index.php?cmd=profile&player_id=1267797">Tangtop</a> and '+
			'<a href="' + System.server + 'index.php?cmd=profile&player_id=1191381">dkwizard</a> '+
/*
			'with valuable contributions by <a href="' + System.server + 'index.php?cmd=profile&player_id=524660">Nabalac</a>, ' +
			'<a href="' + System.server + 'index.php?cmd=profile&player_id=1570854">jesiegel</a>, ' +
			'<a href="' + System.server + 'index.php?cmd=profile&player_id=37905">Ananasii</a>' +
*/
			'</td></tr>' +
			'<tr><td colspan="4" align=center>' +
			'<span style="font-size:xx-small">Visit the <a href="http://code.google.com/p/fallenswordhelper/">Fallen Sword Helper web site</a> ' +
			'for any suggestions or bug reports<span></td></tr>' +
			'</table></form>';
		var insertHere = System.findNode("//table[@width='500']");
		var newRow=insertHere.insertRow(insertHere.rows.length);
		var newCell=newRow.insertCell(0);
		newCell.colSpan=3;
		newCell.innerHTML=configData;
		// insertHere.insertBefore(configData, insertHere);
		document.getElementById('Helper:SaveOptions').addEventListener('click', Helper.saveConfig, true);
		document.getElementById('Helper:CheckUpdate').addEventListener('click', Helper.checkForUpdate, true);
		document.getElementById('Helper:ShowLogs').addEventListener('click', Helper.showLogs, true);

		document.getElementById('toggleShowGuildSelfMessage').addEventListener('click', Helper.toggleVisibilty, true);
		document.getElementById('toggleShowGuildFrndMessage').addEventListener('click', Helper.toggleVisibilty, true);
		document.getElementById('toggleShowGuildPastMessage').addEventListener('click', Helper.toggleVisibilty, true);
		document.getElementById('toggleShowGuildEnmyMessage').addEventListener('click', Helper.toggleVisibilty, true);

		var krulButton = System.findNode('//input[@value="Instant Teleport back to Taulin Rad Lands"]');
		onClick = krulButton.getAttribute("onclick");
		//window.location='index.php?cmd=settings&subcmd=fix&xcv=3264968baaf287c67b0fab314280b163';
		krulXCVRE = /xcv=([a-z0-9]+)'/
		krulXCV = krulXCVRE.exec(onClick);
		if (krulXCV) GM_setValue("krulXCV",krulXCV[1]);

		var minGroupLevelTextField = System.findNode('//input[@name="min_group_level"]');
		if (minGroupLevelTextField) {
			var minGroupLevel = minGroupLevelTextField.value;
			GM_setValue("minGroupLevel",minGroupLevel);
		}
	},

	helpLink: function(title, text) {
		return ' [ ' +
			'<span style="text-decoration:underline;cursor:pointer;" onmouseover="Tip(\'' +
			'<span style=\\\'font-weight:bold; color:#FFF380;\\\'>' + title + '</span><br /><br />' +
			text + '\');">?</span>' +
			' ]'
	},

	saveConfig: function(evt) {
		var oForm=evt.target.form;
		var chatLines = System.findNode("//input[@name='chatLines']", oForm);
		var enableChat = System.findNode("//input[@name='enableChat']", oForm);
		var chatLinesValue = parseInt(chatLines.value);

		if (enableChat.checked && (isNaN(chatLinesValue) || chatLinesValue<=0)) {
			chatLines.value="10";
		}
		if (!enableChat.checked) {
			chatLines.value="0";
		}

		var guildOnlineRefreshTime = System.findNode("//input[@name='guildOnlineRefreshTime']", oForm);
		var guildOnlineRefreshTimeValue = guildOnlineRefreshTime.value*1;
		if (isNaN(guildOnlineRefreshTimeValue) || guildOnlineRefreshTimeValue<=0) {
			guildOnlineRefreshTime.value=15;
		}

		System.saveValueForm(oForm, "guildSelf");
		System.saveValueForm(oForm, "guildFrnd");
		System.saveValueForm(oForm, "guildPast");
		System.saveValueForm(oForm, "guildEnmy");
		System.saveValueForm(oForm, "guildSelfMessage");
		System.saveValueForm(oForm, "guildFrndMessage");
		System.saveValueForm(oForm, "guildPastMessage");
		System.saveValueForm(oForm, "guildEnmyMessage");
		System.saveValueForm(oForm, "chatLines");
		System.saveValueForm(oForm, "chatTopToBottom");
		System.saveValueForm(oForm, "showAdmin");
		System.saveValueForm(oForm, "disableItemColoring");
		System.saveValueForm(oForm, "enableLogColoring");
		System.saveValueForm(oForm, "showCompletedQuests");
		System.saveValueForm(oForm, "hideNonPlayerGuildLogMessages");

		System.saveValueForm(oForm, "showCombatLog");
		System.saveValueForm(oForm, "showCreatureInfo");
		System.saveValueForm(oForm, "keepLogs");
		System.saveValueForm(oForm, "enableGuildOnlineList");

		System.saveValueForm(oForm, "killAllAdvanced");
		System.saveValueForm(oForm, "huntingBuffs");
		System.saveValueForm(oForm, "showHuntingBuffs");
		System.saveValueForm(oForm, "moveFSBox");

		System.saveValueForm(oForm, "showQuickKillOnWorld");
		System.saveValueForm(oForm, "hideKrulPortal");
		System.saveValueForm(oForm, "hideQuests");
		System.saveValueForm(oForm, "hideQuestNames");
		System.saveValueForm(oForm, "hideRecipes");
		System.saveValueForm(oForm, "hideRecipeNames");
		System.saveValueForm(oForm, "footprintsColor");
		System.saveValueForm(oForm, "guildOnlineRefreshTime");

		window.alert("FS Helper Settings Saved");
		window.location = window.location;
		return false;
	},

	showLogs: function(evt) {
		document.location=System.server + "index.php?cmd=notepad&subcmd=showlogs"
	},

	injectNotepadShowLogs: function() {
		var content=System.findNode("//table[@width='100%']/..");
		var combatLog=GM_getValue("CombatLog");
		content.innerHTML='<div align="center"><textarea align="center" cols="80" rows="25" '+
			'readonly style="background-color:white;font-family:Consolas,\"Lucida Console\",\"Courier New\",monospace;" id="Helper:CombatLog">' + combatLog + '</textarea></div>' +
			'<br /><br /><table width="100%"><tr>'+
			'<td colspan="2" align=center>' +
			'<input type="button" class="custombutton" value="Select All" id="Helper:CopyLog"></td>' +
			'<td colspan="2" align=center>' +
			'<input type="button" class="custombutton" value="Clear" id="Helper:ClearLog"></td>' +
			'</tr></table>';
		document.getElementById("Helper:CopyLog").addEventListener("click", Helper.notepadCopyLog, true);
		document.getElementById("Helper:ClearLog").addEventListener("click", Helper.notepadClearLog, true);
	},

	notepadCopyLog: function() {
		var combatLog=document.getElementById("Helper:CombatLog")
		combatLog.focus();
		combatLog.select();
	},

	notepadClearLog: function() {
		if (window.confirm("Are you sure you want to clear your log?")) {
			var combatLog=document.getElementById("Helper:CombatLog");
			GM_setValue("CombatLog", "");
			window.location = window.location;
		}
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
	},
	
	displayMiniMap: function() {
	
		var miniMap = document.getElementById("miniMap");
		if (!miniMap) {
			miniMap = document.createElement("div");
			miniMap.style.position = "absolute";
			miniMap.style.left = 0;
			miniMap.style.top = 0;
			miniMap.style.display = 'none';
			miniMap.id = "miniMap";
			miniMap.style.zIndex = '90';
			miniMap.style.filter = "alpha";
			miniMap.style.opacity = "0.9";
			
			var objBody = document.getElementsByTagName("body").item(0);
			objBody.insertBefore(miniMap, objBody.firstChild);
		}
		
		if (miniMap.style.display != "") {
			if (Helper.levelName == GM_getValue("miniMapName")) {
				miniMap.innerHTML = GM_getValue("miniMapSource");
				Helper.markPlayerOnMiniMap();
				miniMap.style.display = "";
			} else {
				System.xmlhttp("index.php?cmd=world&subcmd=map", Helper.loadMiniMap, true);
			}
		} else
			miniMap.style.display = "none";
	},
	
	loadMiniMap: function(responseText) {
		var size = 20;
		var miniMap = document.getElementById("miniMap");
		var docu = System.createDocument(responseText);
		var doc = '<table cellspacing="0" cellpadding="0" align="center">' + System.findNode("//table", docu).innerHTML + '</table>';
		doc = doc.replace(/ background=/g, '><img width=' + size + ' height=' + size + ' src=');
		// doc = doc.replace(/<[^>]*>(<center><[^>]*title="You are here")>/g, '$1 width=11 height=11>');
		doc = doc.replace("<center></center>", "");
		doc = doc.replace(/<[^>]*title="You are here"[^>]*>/g, '');
		doc = doc.replace(/width="65"/g, 'width="' + size + '"').replace(/height="65"/g, 'height="' + size + '"');
		miniMap.innerHTML = doc;
		
		Helper.markPlayerOnMiniMap();
		miniMap.style.display = "";
		
		GM_setValue("miniMapName", Helper.levelName);
		GM_setValue("miniMapSource", doc);
	},
	
	markPlayerOnMiniMap: function() {
		var miniMap = document.getElementById("miniMap");
		var posit = Helper.position();
		if (!miniMap || !posit) return;
		var position = miniMap.firstChild.rows[posit.Y].cells[posit.X];
		var background = position.firstChild.src;
		position.innerHTML = '<center><img width=16 height=16 src="' + System.imageServer + '/skin/player_tile.gif" title="You are here"></center>';
		position.style.backgroundImage = 'url("' + background + '")';
		position.style.backgroundPosition = "center";
	},

	injectQuickLinkManager: function() {
		GM_addStyle('.HelperTextLink {color:#84ADAC;font-size:x-small;cursor:pointer;}\n' +
			'.HelperTextLink:hover {text-decoration:underline;}\n');
		var quickLinks = System.getValueJSON("quickLinks");
		if (!quickLinks) quickLinks=[];
		Helper.quickLinks = quickLinks;
		Helper.tmpContent=Layout.notebookContent();
		Helper.generateQuickLinkTable();
	},

	generateQuickLinkTable: function() {
		var result='<table><tr><th>Name</th><th>URL</th><th>&nbsp;</th></tr>';
		for (var i=0;i<Helper.quickLinks.length;i++) {
			result+='<td>' + Helper.quickLinks[i].name + '</td><td>' + Helper.quickLinks[i].url + '</td><td>';
			result+='<span class=HelperTextLink quickLinkId="' + i + '" id="Helper:DeleteLink' + i + '">[Del]</span></td></tr>';
		}
		result +=
			'<tr><td><input size=10 type=textbox class=custominput id="Helper:LinkName"></td>' +
			'<td><input size=75 type=textbox class=custominput id="Helper:LinkUrl"></td>' +
			'<td><span class=HelperTextLink id="Helper:AddLink">[Add]</span></td></tr>';
		Helper.tmpContent.innerHTML = result;
		for (var i=0;i<Helper.quickLinks.length;i++) {
			document.getElementById("Helper:DeleteLink" + i).addEventListener('click', Helper.deleteQuickLink, true);
		}
		document.getElementById("Helper:AddLink").addEventListener('click', Helper.addQuickLink, true);
		GM_setValue("quickLinks", JSON.stringify(Helper.quickLinks));
	},

	deleteQuickLink: function(evt) {
		// if (!window.confirm('Are you sure you want to delete this link?')) return;
		var quickLinkId = evt.target.getAttribute("quickLinkId")
		Helper.quickLinks.splice(quickLinkId, 1);
		Helper.generateQuickLinkTable();
	},

	addQuickLink: function(evt) {
		var quickLinkName = document.getElementById("Helper:LinkName").value;
		var quickLinkUrl = document.getElementById("Helper:LinkUrl").value;
		Helper.quickLinks.push({"name": quickLinkName, "url": quickLinkUrl});
		Helper.generateQuickLinkTable();
	}

};

Helper.onPageLoad(null);