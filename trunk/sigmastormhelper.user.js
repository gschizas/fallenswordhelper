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
		System.setDefault("enableCreatureColoring", true);
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
		System.setDefault("goldRecipient", "");
		System.setDefault("goldAmount", "");
		System.setDefault("sendGoldonWorld", false);
		System.setDefault("goldConfirm", "");
		System.setDefault("guildSelfMessage", "green|Member of your own faction");
		System.setDefault("guildFrndMessage", "yellow|Do not attack - Faction is friendly!");
		System.setDefault("guildPastMessage", "gray|Do not attack - You've been in that faction once!");
		System.setDefault("guildEnmyMessage", "red|Enemy faction. Attack at will!");

		System.setDefault("hideKrulPortal", false);
		System.setDefault("hideQuests", false);
		System.setDefault("hideQuestNames", "");
		System.setDefault("hideRecipes", false);
		System.setDefault("hideRecipeNames", "");
		System.setDefault("footprintsColor", "silver");
		System.setDefault("chatTopToBottom", true);
		System.setDefault("enableGuildOnlineList", true);
		System.setDefault("guildOnlineRefreshTime", 15);

		System.setDefault("enableAllyOnlineList", false);
		System.setDefault("enableEnemyOnlineList", false);
		System.setDefault("allyEnemyOnlineRefreshTime", 60);

		System.setDefault("hideMatchesForCompletedMoves", false);
		System.setDefault("quickKill", true);
		System.setDefault("doNotKillList", "");
		System.setDefault("enableBioCompressor", false);
		System.setDefault("maxCompressedCharacters", 1500);
		System.setDefault("maxCompressedLines", 25);
		System.setDefault("minPSStats",JSON.stringify({"atk":0,"def":0,"arm":0,"dmg":0,"cHP":0,"mHP":0,"skill":0}));
		System.setDefault("quickWearFilter",JSON.stringify({"enable":false,"value":"pack,stim"}));
		System.setDefault("invMaxLvlFilter", '');
		System.setDefault("quickUseItems",JSON.stringify({'item0':'','item1':'','item2':''}));
		System.setDefault("enableBulkSell", false);
		
		try {
			var quickSearchList = System.getValueJSON("quickSearchList");
		}
		catch (err) {
			GM_log(err);
			quickSearchList = null;
		}

		if (!quickSearchList) {
			quickSearchList = Data.quickSearchList()
			Helper.sortAsc = true;
			Helper.sortBy = "category";
			quickSearchList.sort(Helper.stringSort);
			System.setValueJSON("quickSearchList", quickSearchList);
		}

		Helper.itemFilters = [
		{"id":"showBodyTypeItems", "type":"Body Armor"},
		{"id":"showHelmetTypeItems", "type":"Helmet"},
		{"id":"showHelmetAddOnTypeItems", "type":"Helmet Add-On"},
		{"id":"showLegTypeItems", "type":"Leg Armor"},
		{"id":"showWeaponTypeItems", "type":"Weapon"},
		{"id":"showWeaponAddOnTypeItems", "type":"Weapon Add-On"},
		];

		for (var i=0; i<Helper.itemFilters.length; i++) {
			System.setDefault(Helper.itemFilters[i].id, true);
		}

		var memberList = System.getValueJSON("memberlist");
		if (!memberList || !memberList.lastUpdate) GM_setValue("memberlist", "");
	},

	readInfo: function(doc) {
		if (!doc) doc=document;
		var charInfo = System.findNode("//img[contains(@src,'skin/quicklinks/4.gif')]",doc);
		if (!charInfo) {return;}
		var charInfoText = charInfo.getAttribute("onmouseover");
		Helper.characterName    = charInfoText.match(/Name:\s*<\/td><td width=\\\'90%\\\'>([0-9a-z]+)/i)[1];
		Helper.characterLevel   = System.getIntFromRegExp(charInfoText, /Level:\s*<\/td><td width=\\\'90%\\\'>(\d+)/i);
		Helper.characterAttack  = System.getIntFromRegExp(charInfoText, /Attack:\s*<\/td><td width=\\\'90%\\\'>(\d+)/i);
		Helper.characterDefense = System.getIntFromRegExp(charInfoText, /Defense:\s*<\/td><td width=\\\'90%\\\'>(\d+)/i);
		var rxHitPoints = charInfoText.match(/HP:\s*<\/td><td width=\\\'90%\\\'>(\d+)\s*\/\s*(\d+)/i)
		Helper.characterHP    = parseInt(rxHitPoints[1]);
		Helper.characterMaxHP = parseInt(rxHitPoints[2]);
		Helper.characterArmor    = System.getIntFromRegExp(charInfoText, /Armor:\s*<\/td><td width=\\\'90%\\\'>(\d+)/i);
		Helper.characterDamage   = System.getIntFromRegExp(charInfoText, /Damage:\s*<\/td><td width=\\\'90%\\\'>(\d+)/i);
		var charClassNode = System.findNode("//img[contains(@src,'sigma2/skin/classes/')]");
		var charClasses = ["Clone", "Mutant", "Soldier", "Purist", "Cyborg"];
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
			}
		})
	},

	autoUpdate: function(responseDetails) {
		if (responseDetails.status != 200) return;
		var now = (new Date()).getTime()
		GM_setValue("lastVersionCheck", now.toString());
		var currentVersion = GM_getValue("currentVersion");
		if (!currentVersion) currentVersion = 0;
		var versionRE = /Revision\s*([0-9]+):/;
		var latestVersion = responseDetails.responseText.match(versionRE)[1];
		GM_log("Current version: " + currentVersion);
		GM_log("Found version: " + latestVersion);

		if (currentVersion != latestVersion) {
			GM_xmlhttpRequest({
				method: 'GET',
				url: "http://fallenswordhelper.googlecode.com/svn/wiki/ChangeLog.wiki?nonce=" + now,
				headers: {
					"User-Agent": navigator.userAgent,
					"Referer": document.location
				},
				onload: function(responseDetails) {
					Helper.autoUpdateConfirm(responseDetails, currentVersion, latestVersion);
				}
			})
		}
	},

	autoUpdateConfirm: function(responseDetails, oldVersion, newVersion) {
		var theChanges = Layout.formatWiki(responseDetails.responseText, oldVersion, newVersion);
		var confirmAlert = document.createElement("DIV");
		confirmAlert.id = 'Helper:ConfirmAlert';
		var divHeight = window.innerHeight - 160;

		confirmAlert.style.position = "absolute";
		confirmAlert.style.left = (window.innerWidth - 500) / 2 + "px";
		confirmAlert.style.top = (80 + window.scrollY) + "px";
		confirmAlert.style.width = "500px";
		confirmAlert.style.height = divHeight + "px";
		confirmAlert.style.display = 'block';
		confirmAlert.style.zIndex = '90';
		confirmAlert.style.filter = 'alpha';
		confirmAlert.style.opacity = '0.9';
		confirmAlert.style.background = 'black';
		confirmAlert.style.color = 'white';
		confirmAlert.style.border = 'ridge';

		confirmAlert.innerHTML = '<div height="20" style="background-color:#4a3918;">' +
			'<div style="color:yellow;position:absolute;top:0px;left:0px">New version (' + newVersion + ') found. Update from version ' + oldVersion + '?' +
			'</div><div style="position:absolute;top:0px;right:0px">' +
			'<input type="button" id="Helper:AutoUpdateOk" value="Ok" class="custombutton">' +
			'&nbsp;<input type="button" id="Helper:AutoUpdateCancel" value="Cancel" class="custombutton"></div></div>' +
			'<div id="Helper:Output" style="margin-top:20px;height:' + (divHeight-20) + 'px;overflow:auto;">' + theChanges + '</div>';
		document.body.insertBefore(confirmAlert, document.body.firstChild);
		document.getElementById("Helper:AutoUpdateOk").addEventListener("click", Helper.autoUpdateConfirmOk, true);
		document.getElementById("Helper:AutoUpdateOk").setAttribute("newVersion", newVersion);
		document.getElementById("Helper:AutoUpdateCancel").addEventListener("click", Helper.autoUpdateConfirmCancel, true);
	},

	autoUpdateConfirmOk: function(evt) {
		var newVersion = parseInt(evt.target.getAttribute("newVersion"));
		GM_setValue("currentVersion", newVersion);
		GM_openInTab("http://fallenswordhelper.googlecode.com/svn-history/r" + newVersion + "/trunk/sigmastormhelper.user.js");
		Helper.autoUpdateConfirmCancel(evt);
	},

	autoUpdateConfirmCancel: function(evt) {
		var confirmAlert = document.getElementById("Helper:ConfirmAlert");
		confirmAlert.style.display = "none";
		confirmAlert.visibility = "hidden";
	},

	// main event dispatcher
	onPageLoad: function(anEvent) {
		Helper.init();
		Layout.moveFSBox();
		Helper.prepareChat();
		Helper.prepareGuildList();
		Helper.prepareAllyEnemyList();
		Helper.injectStaminaCalculator();
		Helper.injectLevelupCalculator();
		Layout.injectMenu();
		Layout.hideNewBox();
		Helper.replaceKeyHandler();
		Helper.injectWorldWidgets();

		var pageId, subPageId, subPage2Id, subsequentPageId
		if (document.location.search != "") {
			var re=/cmd=([a-z]+)/;
			var pageIdRE = re.exec(document.location.search);
			pageId="-";
			if (pageIdRE)
				pageId=pageIdRE[1];

			re=/subcmd=([a-z]+)/;
			var subPageIdRE = re.exec(document.location.search);
			subPageId="-";
			if (subPageIdRE)
				subPageId=subPageIdRE[1];

			re=/subcmd2=([a-z]+)/;
			var subPage2IdRE = re.exec(document.location.search);
			subPage2Id="-";
			if (subPage2IdRE)
				subPage2Id=subPage2IdRE[1];

			re=/page=([0-9]+)/;
			var subsequentPageIdRE = re.exec(document.location.search);
			subsequentPageId="-";
			if (subsequentPageIdRE)
				subsequentPageId=subsequentPageIdRE[1];
		} else {
			pageId=System.findNode("//input[@type='hidden' and @name='cmd']");
			pageId = pageId?pageId.getAttribute("value"):"-";

			subPageId=System.findNode("//input[@type='hidden' and @name='subcmd']")
			subPageId=subPageId?subPageId.getAttribute("value"):"-";

			subPage2Id=System.findNode("//input[@type='hidden' and @name='subcmd2']");
			subPage2Id=subPage2Id?subPage2Id.getAttribute("value"):"-";

			subsequentPageId=System.findNode("//input[@type='hidden' and @name='page']")
			subsequentPageId=subsequentPageId?subsequentPageId.getAttribute("value"):"-";
		}

		Helper.page = pageId + "/" + subPageId + "/" + subPage2Id + "(" + subsequentPageId + ")"

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
				Helper.injectShoutboxWidgets('fsbox_input', 150);
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
			switch (subsequentPageId) {
			case "-":
				Helper.injectQuestBookLite();
				break;
			}
			Helper.injectQuestBookFull();
			break;
		case "profile":
			switch (subPageId) {
			case "dropitems":
				switch (subPage2Id) {
				case "quickuseman":
					Helper.injectQuickUseManager();
					break;
				default:
					Helper.injectDropItems();
				}
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
				Helper.injectCreateAuctionTemplate();
				Helper.injectCreateAuctionBulkSell();
				break;
			case "preferences":
				break;
			default:
				Helper.injectAuctionHouse();
			}
			break;
		case "guild":
			switch (subPageId) {
			case "inventory":
				switch (subPage2Id) {
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
			case "reliclist":
				Helper.injectRelicList();
				break;
			case "log":
				Helper.addLogColoring("GuildLog", 1);
				Helper.addGuildLogWidgets();
				break;
			case "groups":
				switch (subPage2Id) {
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
				Helper.injectAdvisor(subPage2Id);
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
			switch (subPageId) {
			case "createreq":
				Helper.addMarketplaceWidgets();
				break;
			}
			break;
		case "quickbuff":
			Helper.injectQuickBuff();
			break;
		case "notepad":
			switch (subPageId) {
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
			case "monsterlog":
				Helper.injectMonsterLog();
				break;
			case "quickwear":
				Helper.injectQuickWear();
				break;
			case "saveconfig":
				Helper.injectSaveConfig();
				break;
			}
			break;
		case "points":
			switch (subPageId) {
			case "-":
			case "shop":
				Helper.storePlayerUpgrades();
				Helper.injectPoints();
				break;
			}
			break;
		case "skills":
			switch(subPageId) {
			case "selfbuff":
				Helper.injectSelfBuff();
				break;
			}
			break;
		case "shop":
			Helper.injectShop();
			break;
		case "trade":
			Helper.retrieveTradeConfirm();
			Helper.injectQuickSelectItems();
			break;
		case "toprated":
			switch (subPageId) {
			case "xp":
				Helper.injectTopRated();
				break;
			}
			break;
		case "inventing":
			switch (subPageId) {
			case "viewrecipe":
				Helper.injectViewRecipe();
				break;
			}
			break;
		case "message":
			Helper.injectMessageTemplate();
			break;
		case "tempinv":
			Helper.injectMailbox();
			break;
		case "-":
			var isRelicPage = System.findNode("//input[contains(@title,'Use your current group to capture the relic')]");
			if (isRelicPage) {
				Helper.injectRelic(isRelicPage);
			}
			var isShopPage = System.findNode("//td[contains(.,'then click to purchase for the price listed below the item.')]");
			if (isShopPage) {
				Helper.injectShop();
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
				Helper.injectAdvisor(subPage2Id);
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
		var location;
		switch(Helper.characterClass) {
			case "Mutant":
				location = System.server + "index.php?cmd=skills&tree_id=1&subcmd=selfbuff";
				break;
			case "Soldier":
				location = System.server + "index.php?cmd=skills&tree_id=2&subcmd=selfbuff";
				break;
			case "Purist":
				location = System.server + "index.php?cmd=skills&tree_id=3&subcmd=selfbuff";
				break;
			case "Cyborg":
				location = System.server + "index.php?cmd=skills&tree_id=4&subcmd=selfbuff";
				break;
			default:
				break;
		}
		var winWidth = 600;
		var winHeight = 500;
		var winLeft = (screen.availWidth - winWidth) / 2
		var winTop = (screen.availHeight - winHeight) / 2
		var popWin = window.open(location, "SelfBuff", "width="+winWidth+", height="+winHeight+", left="+winLeft+", top="+winTop+",scrollbars");
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

	quickStone: function(){
		System.xmlhttp("index.php?cmd=skills&subcmd=cast&skill_id=65", Helper.quickDone);
	},
	quickShard: function(){
		System.xmlhttp("index.php?cmd=skills&subcmd=cast&skill_id=58", Helper.quickDone);
	},
	quickDone: function(responseText) {
		var infoMessage = Layout.infoBox(responseText);
		unsafeWindow.tt_setWidth(200);
		unsafeWindow.Tip(infoMessage);
	},
	quickMS: function(cast){
		var url="index.php?"+(cast?"cmd=skills&subcmd=cast":"cmd=profile&subcmd=removeskill")+"&skill_id=64"
		System.xmlhttp(url, Helper.quickDone);
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

		document.getElementById('toggleGuildLogoControl').addEventListener('click', System.toggleVisibilty, true);
//		document.getElementById('toggleStatisticsControl').addEventListener('click', System.toggleVisibilty, true);
		document.getElementById('toggleGuildStructureControl').addEventListener('click', System.toggleVisibilty, true);
		
		doc = System.findNode("//html");
		Helper.parseGuildForWorld(doc.innerHTML, true);

		// Fast Take

		var guildStore = System.findNode("//table[tbody/tr/td[@width='45' and @height='45']]");
		guildStore.innerHTML = guildStore.innerHTML.replace(/<font size="1">1&nbsp;\/&nbsp;1<\/font>/g, '');
		var guildStoreIDRE = /guildstore_id=(\d+)/i;

		var guildStoreBox = [];
		var guildStoreBoxItem = [];
		var guildStoreBoxID = [];
		for (var i=0;i<12;i++) {
			if (guildStore.rows[i >> 2]) guildStoreBox[i]=guildStore.rows[i >> 2].cells[i % 4];
			if (guildStoreBox[i]) guildStoreBoxItem[i] = guildStoreBox[i].firstChild;
			if (guildStoreBoxItem[i] && guildStoreBoxItem[i].firstChild)
				guildStoreBoxID[i] = guildStoreIDRE(guildStoreBoxItem[i].firstChild.getAttribute("href"))[1];
		}

		var newRow;

		for (var i=0;i<12;i++) {
			if ((i % 4==0) && guildStoreBoxItem[i]) newRow = guildStore.insertRow(2*(i >> 2)+1);
			if (guildStoreBoxItem[i] && guildStoreBoxItem[i].firstChild) {
				var newCell = newRow.insertCell(i % 4);
				newCell.innerHTML = '<span style="cursor:pointer; text-decoration:underline; color:#84ADAC; font-size:x-small;" '+
					'id="Helper:recallGuildStoreItem' + guildStoreBoxID[i] + '" ' +
					'itemID="' + guildStoreBoxID[i] + '">Fast Take</span>';
				document.getElementById('Helper:recallGuildStoreItem' + guildStoreBoxID[i])
					.addEventListener('click', Helper.recallGuildStoreItem, true);
			}
		}
		
		// self recall
		var selfRecall=System.findNode("//b[.='Faction Store']");
		selfRecall.innerHTML="Faction Store [<a href='index.php?cmd=guild&subcmd=inventory&subcmd2=report&user="+Helper.characterName+"' title='Self Recall'>SR</a>]";
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
		var itemCellElement = target.parentNode;
		if (info.indexOf('You successfully took the item into your backpack') >= 0) {
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
	
	injectShop: function() {
		var injectHere=System.findNode("//td/center[img[contains(@src,'_banner.jpg')]]");
		var itemNodes=System.findNodes("//td/center/a/img[contains(@src,'/items/')]");
		var selector="<span style='font-size:xx-small'>Select an item to quick-buy:<table cellpadding=2><tr>";
		for (var i=0;i<itemNodes.length;i++) {
			var item=itemNodes[i];
			var src=item.getAttribute("src");
			var text=item.parentNode.parentNode.textContent;
			var onmouseover=item.getAttribute("onmouseover").replace("Click to Buy","Click to Select");
			var itemId=item.parentNode.getAttribute("href").match(/&item_id=(\d+)&/)[1];
			selector+="<td width=20 height=20 ><img width=20 height=20 id=select"+itemId+" itemId="+itemId+" src='"+src+
				"' onmouseover=\""+onmouseover+"\">"+text+"</td>";
			if (i%6==5 && i!=itemNodes.length-1) selector+="</tr><tr>";
		}
		selector+="</tr><tr><td colspan=3>Selected item:</td><td colspan=3 align=center>"+
			"<table><tr><td width=45 height=45 id=selectedItem align=center></td></tr></table>"+
			"<td></tr><tr><td id=warningMsg colspan=6 align=center></td></tr></table>";
		injectHere.innerHTML="<table><tr><td>"+injectHere.innerHTML+"</td><td>"+selector+"</td></tr></table>";
		for (var i=0;i<itemNodes.length;i++) {
			var itemId=itemNodes[i].parentNode.getAttribute("href").match(/&item_id=(\d+)&/)[1];
			document.getElementById("select"+itemId).addEventListener("click",Helper.selectShopItem,true);
		}
		Helper.shopId=itemNodes[0].parentNode.getAttribute("href").match(/&shop_id=(\d+)/)[1];
	},
	
	selectShopItem: function(evt) {
		Helper.shopItemId=evt.target.getAttribute("itemId");
		document.getElementById('warningMsg').innerHTML='<span style="color:red;font-size:small">Warning:<br> pressing "t" now will buy the item WITHOUT confirmation!</span>';
		document.getElementById('selectedItem').innerHTML=
			document.getElementById("select"+Helper.shopItemId).parentNode.innerHTML.replace(/="20"/g,'=45');
	},
	
	quickBuyItem: function() {
		if (!Helper.shopItemId || !Helper.shopId) return;
		System.xmlhttp("index.php?cmd=shop&subcmd=buyitem&item_id="+Helper.shopItemId+"&shop_id="+Helper.shopId,
			Helper.quickDone);
	},
	
	quickUse: function(responseText, callback) {

		var quItems=System.getValueJSON("quickUseItems");
		var item=quItems['item'+callback.id];
		if (item=='') return;
		
		// only applicable when you are hunting (in world screen)
		if (!System.findNode("//tr[contains(td/@background, 'location_header.gif')]/../..")) return;
		if (responseText=='') {
			// call again with the backpack droping screen text
			System.xmlhttp("/index.php?cmd=profile&subcmd=dropitems&fromworld=1", Helper.quickUse, callback);
			return;
		}
		
		Helper.itemList = {};
		var doc=System.createDocument(responseText);
		Helper.retrieveItemInfor(doc);
		
		for (var key in Helper.itemList) {
			if (Helper.itemList[key].text==item) {
				System.xmlhttp("index.php?cmd=profile&subcmd=useitem&inventory_id=" + Helper.itemList[key].id,
					Helper.quickDone);
				return;
			}
		}
		alert("Cannot find any " + item + " to use!");
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
	},

	getRelicGuildData: function(extraTextInsertPoint,href) {
	},

	parseRelicGuildData: function(responseText, callback) {
	},

	getRelicPlayerData: function(defenderCount,extraTextInsertPoint,href) {
	},

	parseRelicPlayerData: function(responseText, callback) {
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
			System.setValueJSON("map", theMap);
		}
	},

	showMap: function(isLarge) {
		if (!GM_getValue("footprints")) return;
		if (isLarge) {
			var realm = System.findNode("//b");
			Helper.levelName=realm.textContent.replace(" Map Overview ", "");
		}
		// GM_log(Helper.levelName);
		var theMap = System.getValueJSON("map");
		var displayedMap = System.findNode(isLarge?"//table[@width]":"//table[@width='325' and @height='325']");
		var footprintsColor = GM_getValue("footprintsColor");
		var posit = Helper.position();

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
						if (aCell.innerHTML.indexOf("table") > 0)
							aCell.firstChild.firstChild.firstChild.firstChild.innerHTML +="**";
						else
							aCell.innerHTML+="**";
					};

				}
				// GM_log(x + ":" + y + " >> " + aCell.getAttribute("background"));
			}
		}
	},

	injectViewRecipe: function() {
		var components=System.findNodes("//td[contains(@background,'1x1mini.gif')]/center/img");
		if (components && 0) //TODO later when we have the database of components from resources
			for (var i=0; i<components.length; i++) {
				var mo=components[i].getAttribute("onmouseover");
				System.xmlhttp(Helper.linkFromMouseoverCustom(mo), Helper.injectViewRecipeLinks, components[i]);
			}
	},

	plantFromComponent: function(aComponent) {
		switch(aComponent) {
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

	injectAdvisor: function(subPage2Id) {
		var titleCells=System.findNodes("//tr[td/b='Member']/td");
		if (!titleCells) return;
		var parentTables=System.findNodes("ancestor::table", titleCells[0]);
		var list=parentTables[parentTables.length-1];
		
		// insert weekly summary link
		var injectHere=System.findNode("//td/form");
		if (injectHere) {
			var elem=document.createElement("span");
			elem.innerHTML=" <a href='index.php?cmd=guild&subcmd=advisor&subcmd2=weekly'>7-Day Summary</a>";
			injectHere.appendChild(elem);
		}

		if (! Helper.advisorHeader) {
			Helper.advisorHeader = '<tr>';
			var titleCells = ["Member", "Lvl", "Rank", "Credits From Deposits", "Credits From Tax", "Credits Total", "Crystals", "Skills Cast", "Squads Created", "Squads Joined", "Artifacts Captured", "XP Contrib"];
			for (var i=0; i<titleCells.length; i++) {
				Helper.advisorHeader += "<td bgcolor=#0a0f0f align=center width=8% style='text-decoration: underline; cursor: pointer; font-size:x-small;'><b>" + titleCells[i] + "</b></td>";
			}
			Helper.advisorHeader += '</tr>';
		}

		if (! Helper.advisorFooter) {
			Helper.advisorFooter = '<tr><td colspan=3 align=right>Total: </td>';
			for (var i=1; i<list.rows[list.rows.length-1].cells.length; i++) {
				Helper.advisorFooter += "<td align=center>" + list.rows[list.rows.length-1].cells[i].innerHTML + '</td>';
			}
			Helper.advisorFooter +='</tr>';
		}
		if (subPage2Id!='-') {
			Helper.advisorFooter='';
		}
		
		Helper.sortAsc = true;
		if (subPage2Id == '-') {
			Helper.generateAdvisorRows(list);
			Helper.sortAdvisor(list, "Member");
		} else {
			list.innerHTML='Retrieving daily data ...';
			Helper.generateWeeklyAdvisorRows('',{'day':0,'inject':list});
		}
	},
	
	generateWeeklyAdvisorRows: function(responseText, callback) {
		var day=callback.day;
		if (day <= 7) {
			if (day > 0) {
				callback.inject.innerHTML+=' day '+day+',';
				var doc=System.createDocument(responseText);
				var titleCells=System.findNodes("//tr[td/b='Member']/td",doc);
				if (!titleCells) return;
				var parentTables=System.findNodes("ancestor::table", titleCells[0],doc);
				var list=parentTables[parentTables.length-1];
				Helper.generateAdvisorRows(list);
				if (day == 1) {
					Helper.weeklyAdvisorRows = Helper.advisorRows;
					Helper.advisorColumns = ['CreditsFromDeposits','CreditsFromTax',
						'CreditsTotal','Crystals','SkillsCast','SquadsCreated',
						'SquadsJoined','ArtifactsCaptured','XPContrib'];
				}
				for (var i=1; i<list.rows.length-1; i++){
					for (var id=0; id<Helper.advisorColumns.length; id++){
						var columnName=Helper.advisorColumns[id];
						if (day==1)
							Helper.weeklyAdvisorRows[i-1][columnName]=
								System.intValue(Helper.weeklyAdvisorRows[i-1][columnName]);
						else
							Helper.weeklyAdvisorRows[i-1][columnName]+=
								System.intValue(Helper.advisorRows[i-1][columnName]);
					}
				}
			}
			System.xmlhttp("index.php?cmd=guild&subcmd=advisor&period="+(day+1), 
				Helper.generateWeeklyAdvisorRows, {'day':(day+1),'inject':callback.inject});
		} else {
			Helper.advisorRows = Helper.weeklyAdvisorRows;
			for (var i=1; i<=Helper.advisorRows.length; i++){
				for (var id=0; id<Helper.advisorColumns.length; id++){
					var columnName=Helper.advisorColumns[id];
					Helper.advisorRows[i-1][columnName]=
						System.addCommas(Helper.advisorRows[i-1][columnName]);
				}
			}
			Helper.sortAdvisor(callback.inject, "Member");
		}
	},

	generateAdvisorRows: function(list) {
		Helper.advisorRows = [];
		var memberList = System.getValueJSON("memberlist");
		for (var i=1; i<list.rows.length-1; i++){
			var theRow=list.rows[i];
			var name = theRow.cells[0].textContent.replace(/\s/, "");
			for (var j=0; j<memberList.members.length; j++) {
				if (memberList.members[j].name == name) {
					var member = memberList.members[j];
					break;
				}
			}
			Helper.advisorRows[i-1] = {
				'Id':(member != undefined ? member.id : -1),
				'Member': theRow.cells[0].textContent,
				'Lvl':(member != undefined ? member.level : -1),
				'Rank':(member != undefined ? member.rank : ""),
				'CreditsFromDeposits': theRow.cells[1].textContent,
				'CreditsFromTax': theRow.cells[2].textContent,
				'CreditsTotal': theRow.cells[3].textContent,
				'Crystals': theRow.cells[4].textContent,
				'SkillsCast': theRow.cells[5].textContent,
				'SquadsCreated': theRow.cells[6].textContent,
				'SquadsJoined': theRow.cells[7].textContent,
				'ArtifactsCaptured': theRow.cells[8].textContent,
				'XPContrib': theRow.cells[9].textContent
			};
		}
	},

	advisorHeaderClicked: function(evt) {
		var headerClicked=evt.target.textContent;
		var parentTables=System.findNodes("ancestor::table", evt.target)
		var list=parentTables[parentTables.length-1];
		Helper.sortAdvisor(list, headerClicked.replace(/ /g, ""));
	},

	sortAdvisor: function(list, sortBy) {

		if (Helper.sortAsc==undefined) Helper.sortAsc=true;
		if (Helper.sortBy && Helper.sortBy==sortBy) {
			Helper.sortAsc=!Helper.sortAsc;
		}
		Helper.sortBy=sortBy;

		if (sortBy=="Member" || sortBy=="Rank") {
			Helper.advisorRows.sort(Helper.stringSort)
		}
		else {
			Helper.advisorRows.sort(Helper.numberSort)
		}

		var result = Helper.advisorHeader;

		for (var i=0; i<Helper.advisorRows.length; i++){
			var r = Helper.advisorRows[i];
			result += '<tr class="HelperTableRow'+(1+i % 2)+'">'+
			'<td> <a href="index.php?cmd=profile&player_id=' + r.Id +'">' +r.Member+ '</a></td>'+
			'<td align="center"> '+r.Lvl+'</td>'+
			'<td align="center"> '+r.Rank.substr(0,7)+ (r.Rank.length>7 ? '...' : '') + '</td>'+
			'<td align="center">'+r.CreditsFromDeposits+'</td>'+
			'<td align="center">'+r.CreditsFromTax+'</td>'+
			'<td align="center">'+r.CreditsTotal+'</td>'+
			'<td align="center">'+r.Crystals+'</td>'+
			'<td align="center">'+r.SkillsCast+'</td>'+
			'<td align="center">'+r.SquadsCreated+'</td>'+
			'<td align="center">'+r.SquadsJoined+'</td>'+
			'<td align="center">'+r.ArtifactsCaptured+'</td>'+
			'<td align="center">'+r.XPContrib+'</td></tr>';
		}
		if (Helper.advisorFooter!='')
			result+=Helper.advisorFooter;
		else {
			Helper.advisorFooter='<tr><td align="right" colspan="3">Total: </td>';
			for (var id=0; id<Helper.advisorColumns.length; id++){
				var sum=0;
				var columnName=Helper.advisorColumns[id];
				for (var i=0; i<Helper.advisorRows.length; i++)
					sum+=System.intValue(Helper.advisorRows[i][columnName]);
				Helper.advisorFooter+='<td align="center" style="text-decoration:underline;font-weight:bold;font-size:x-small">'+System.addCommas(sum)+'</td>';
			}
			Helper.advisorFooter+='</tr>';
			result+=Helper.advisorFooter;
		}

		list.innerHTML=result;

		for (var i=0; i<list.rows[0].cells.length; i++) {
			var cell=list.rows[0].cells[i];
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
		Helper.injectPersonalData(document);

		var injectHere = System.findNode("//tr[contains(td/@background, 'location_header.gif')]/../..");
		if (!injectHere) return;
		var newRow=injectHere.insertRow(2);
		var newCell=newRow.insertCell(0);
		// newCell.setAttribute("background", System.imageServer + "/sigma2/skin/realm_right_bg.jpg");

		var buttonRow = System.findNode("//tr[td/a/img[@title='Open Area Map']]");

		if (GM_getValue("sendGoldonWorld")){
			var recipient_text = "Send " +GM_getValue("goldAmount") + " gold To " + GM_getValue("goldRecipient");
			buttonRow.innerHTML += '<td valign="top" width="5"></td>' +
				'<td valign="top"><img style="cursor:pointer" id="Helper:SendGold" src="' + System.imageServer +
				'/skin/gold_button.gif" title= "' + recipient_text + '" border="1" />';
		}

		if (!GM_getValue("hideKrulPortal")) {
			buttonRow.innerHTML += '<td valign="top" width="5"></td>' +
				'<td valign="top"><img style="cursor:pointer" id="Helper:PortalToStart" src="' + System.imageServer +
				'/temple/3.gif" title="Instant Teleport to Taulin Rad Lands" border="1" /></span></td>';
		}

		var footprints = GM_getValue("footprints");

		buttonRow.innerHTML += '<td valign="top" width="5"></td>' +
			'<td valign="top"><img style="cursor:pointer" id="Helper:ToggleFootprints" src="' + System.imageServer +
			'/skin/' + (footprints?'quest_complete':'quest_incomplete') + '.gif" title="Toggle Footprints" border="0"></td>';
		if (GM_getValue("sendGoldonWorld")){
			//document.getElementById('Helper:PortalToStart').addEventListener('click', Helper.portalToStartArea, true);
			document.getElementById('Helper:SendGold').addEventListener('click', Helper.sendGoldToPlayer, true);
		}
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
		if (GM_getValue("quickKill")) {
			var doNotKillList = GM_getValue("doNotKillList");
			var doNotKillListAry = doNotKillList.split(",")
			for (var i=0; i<9; i++) {
				var monster = System.findNode("//a[@id='aLink" + i + "']")
				if (monster) {
					var monsterName = monster.parentNode.parentNode.previousSibling.textContent;
					for (var j=0; j<doNotKillListAry.length; j++) {
						var doNotKillName = doNotKillListAry[j];
						if (monsterName == doNotKillName){
							var monsterNameCell = monster.parentNode.parentNode.previousSibling
							monsterNameCell.innerHTML = '<span style="color:cyan;">' + monsterNameCell.innerHTML + '</span>';
							break;
						}
					}
				}
			}
		}
	},

	injectWorldMap: function() {
		Helper.showMap(true);
	},
	
	injectPersonalData: function(doc) {
		var injectHere = System.findNode("//table[contains(@background,'large_content_bg.jpg')]/tbody/tr[1]/td",doc);
		if (injectHere) {
			// skill power
			var skillInfo = System.findNodes("//table[@height=22]/tbody/tr/td[@width=130]",doc);
			if (skillInfo) skillInfo = skillInfo[skillInfo.length-1];
			var skillInfoText = skillInfo.getAttribute("onmouseover");
			Helper.skillPower = System.getIntFromRegExp(skillInfoText, /Skill Power<\/b>: (\d+) \/ \d+<br>/i);
			
			// backpack
			var bpInfo = System.findNode("//td[a/img[contains(@src,'quicklinks/3.gif')]]/font");
			Helper.bpInfo = bpInfo.textContent.replace(/[\[\]\s]/g,'');
			if (Helper.bpInfo.match(/^(\d+)\/\1$/)) Helper.bpInfo=Helper.wrapStyle(Helper.bpInfo,"color:red");
			var minPS=System.getValueJSON("minPSStats");
			injectHere.innerHTML = "<div style='font-size:x-small;color:yellow'>"+
				"Atk: "+Helper.wrapStyle(Helper.characterAttack, (Helper.characterAttack<minPS.atk ? 'color:red' : ''))+", "+
				"Def: "+Helper.wrapStyle(Helper.characterDefense, (Helper.characterDefense<minPS.def ? 'color:red' : ''))+", "+
				"Arm: "+Helper.wrapStyle(Helper.characterArmor, (Helper.characterArmor<minPS.arm ? 'color:red' : ''))+", "+
				"Dmg: "+Helper.wrapStyle(Helper.characterDamage, (Helper.characterDamage<minPS.dmg ? 'color:red' : ''))+"&nbsp;&nbsp;&nbsp;<br>"+
				"Hp: "+Helper.wrapStyle(Helper.characterHP, (Helper.characterHP<minPS.cHP ? 'color:red' : ''))+"/"
					+Helper.wrapStyle(Helper.characterMaxHP, (Helper.characterMaxHP<minPS.mHP ? 'color:red' : ''))+", "+
				"Skill: "+Helper.wrapStyle(Helper.skillPower, (Helper.skillPower<minPS.skill ? 'color:red' : ''))+", "+
				"BP: "+Helper.wrapStyle(Helper.bpInfo)+
				"&nbsp;&nbsp;&nbsp;</div><br>";
			injectHere.style.verticalAlign="bottom";
			injectHere.style.textAlign="right";
		}
	},
	
	wrapStyle: function(data,style) {
		if (style==undefined || style=='') style="font-weight:bolder";
		return '<span style="'+style+'">'+data+'</span>';
	},

	retrieveTradeConfirm: function() {
		var xcNumber;
		xcNumber=System.findNode("//input[@type='hidden' and @name='xc']")
		xcNumber=xcNumber?xcNumber.getAttribute("value"):"-";
		GM_setValue("goldConfirm", xcNumber);
	},

	sendGoldToPlayer: function(){
		var recipient = GM_getValue("goldRecipient");
		var amount = GM_getValue("goldAmount");
		System.xmlhttp('index.php?cmd=trade');
		var xcNum = GM_getValue("goldConfirm");
		if (xcNum == "") {
			window.alert("You have to visit the trade page once to use the send gold functionality");
			return;
		}
		var url = 'index.php?cmd=trade&subcmd=sendgold&xc=' + xcNum + '&target_username=' + recipient +'&gold_amount='+ amount
		System.xmlhttp(url, Helper.goldToPlayerSent, {"amount": amount, "recipient": recipient} );
	},

	goldToPlayerSent: function(responseText, callback) {
		var injectHere = System.findNode("//tr[contains(td/@background, 'location_header.gif')]/../..");
		if (!injectHere) return;
		var newRow=injectHere.insertRow(1);
		var newCell=newRow.insertCell(0);
		// newCell.setAttribute("background", System.imageServer + "/skin/realm_right_bg.jpg");
		var info = Layout.infoBox(responseText);
		if (info=="" || info=="You successfully sent credits!") {
			info = 'You successfully sent ' + callback.amount + ' credits to ' + callback.recipient + '!';
		}
		newCell.innerHTML='<div style="margin-left:28px; margin-right:28px; color:cyan; font-size:xx-small;">' + info + '</div>';
	},

	injectQuickSelectItems: function() {
		var nodes = System.findNodes("//input[@name='sendItemList[]']");
		if (nodes == null || nodes.length==0) return;
		var table=nodes[0].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;

		table.parentNode.parentNode.parentNode.parentNode.rows[0].cells[0].innerHTML += "<a name=sendButtonLbl></a>";
		var newRow = table.insertRow(-1);
		var newCell= newRow.insertCell(0);
		newCell.colSpan=6;
		newCell.align="right";
		newCell.innerHTML="<span id=Helper.QuickSelectItem>[&lt;&nbsp;Select]</span>&nbsp;&nbsp;&nbsp;"+
			"<span id=Helper.QuickSelect6>[Select 6]</span>&nbsp;&nbsp;&nbsp;"+
			"<span id=Helper.QuickDeSelectItem>[DeSelect&nbsp;&gt;]</span>&nbsp;&nbsp;&nbsp;<a href=#sendButtonLbl>Top</a>";
		document.getElementById("Helper.QuickSelectItem").addEventListener("click",Helper.quickSelectItem,true);
		document.getElementById("Helper.QuickSelect6").addEventListener("click",Helper.addQuickSelectItems,true);
		document.getElementById("Helper.QuickDeSelectItem").addEventListener("click",Helper.quickDeSelectItem,true);
	},

	quickSelectItem: function() {
		var nodes = System.findNodes("//input[@name='sendItemList[]']");
		var i=nodes.length-1;
		while (i>=0 && nodes[i].checked) i--;
		if (i>=0) nodes[i].checked=true;
	},

	quickDeSelectItem: function() {
		var nodes = System.findNodes("//input[@name='sendItemList[]']");
		var i=0;
		while (i<nodes.length && !(nodes[i].checked)) i++;
		if (i<nodes.length) {nodes[i].checked=false;}
	},

	addQuickSelectItems: function() {
		var nodes = System.findNodes("//input[@name='sendItemList[]']");
		var defaultN = 6;

		for (var i = nodes.length; i--; i>=0) {
			if (i<nodes.length-defaultN) break;
			nodes[i].checked = true;
		}
	},
	
	injectQuickUseManager: function() {
		Helper.itemList = {};
		Helper.retrieveItemInfor(document);
		var layout=System.findNode("//td[contains(@background,'skin/inner_bg.jpg')]");
		var output='<table cellspacing="0" cellpadding="0" border="0" width="100%"><tr style="background-color:#110011">'+
			'<td nobr colspan=4><b>&nbsp;Quick Use Manager</b></td></tr>'+
			'<tr><td colspan=4>Select 3 items (can be stims, ammos, resources) to quick-use with hotkeys "{", "}", "|". '+
			'Note that these hotkey will only be available on World screen (while you are hunting), and WITHOUT confirmation!</td></tr>'+
			'<tr><td>&nbsp;</td></tr><tr><td align=right>'+
			'<input type="button" class="custombutton" value="Clear" id="clearQuickUse">'+
			'&nbsp;&nbsp;Selected items: </td>'+
			'<td id=item0 style="font-weight:bold;color:green;text-align:center"></td>'+
			'<td id=item1 style="font-weight:bold;color:green;text-align:center"></td>'+
			'<td id=item2 style="font-weight:bold;color:green;text-align:center"></td></tr><tr><td>&nbsp;</td></tr>';
		
		Helper.tempDict={};
		var count=0;
		for (var key in Helper.itemList) {
			if (Helper.tempDict[Helper.itemList[key].text]==undefined) {
				if (count%4==0) output+='<tr>';
				output+='<td><table width=100%><tr>'+
					Helper.itemList[key].html.replace('width="90%"',' id=id'+count+' itemId="'+key+'"')+
					'</tr></table></td>';
				Helper.tempDict[Helper.itemList[key].text]=Helper.itemList[key];
				if (count%4==3) output+='</tr>';
				count++;
			}
		}
		output+='</table>';
		layout.innerHTML=output;
		Helper.showQuickUseItem();
		for (var i=0; i<count; i++)
			document.getElementById('id'+i).addEventListener("click",Helper.addQuickUseItem,true);
		document.getElementById('clearQuickUse').addEventListener("click", function() {
				GM_setValue("quickUseItems",JSON.stringify({'item0':'','item1':'','item2':''}));
				Helper.showQuickUseItem();
			}, true);
	},
	
	addQuickUseItem: function(evt) {
		var key = evt.target.getAttribute("itemid");
		var quItems=System.getValueJSON("quickUseItems");
		for (var i=0; i<2; i++)
			quItems['item'+i]=quItems['item'+(i+1)];
		quItems['item2']=Helper.itemList[key].text;
		System.setValueJSON("quickUseItems", quItems);
		Helper.showQuickUseItem();
	},
	
	showQuickUseItem: function() {
		var hotkeys=['{','}','|'];
		var quItems=System.getValueJSON("quickUseItems");
		for (var i=0; i<3; i++) {
			document.getElementById('item'+i).innerHTML=(quItems['item'+i]==''?'[Not Assigned]':quItems['item'+i]);
		}
	},
	
	injectQuickWear: function() {
		Helper.itemList = {};
		var layout=Layout.notebookContent();
		layout.innerHTML="Getting item list from: ";
		System.xmlhttp("/index.php?cmd=profile&subcmd=dropitems&fromworld=1", Helper.getItemFromBackpack, {"inject":layout});
	},
	
	getItemFromBackpack: function(responseText, callback) {
		var layout=callback.inject;
		layout.innerHTML+="backpack page, ";
		var doc=System.createDocument(responseText);
		if (responseText.indexOf('Back to Data Sheet') > 0){
			Helper.retrieveItemInfor(doc);
		}
		System.xmlhttp("/index.php?cmd=guild&subcmd=inventory&subcmd2=storeitems",
			Helper.getItemFromStoreItemPage, callback);
	},
	
	getItemFromStoreItemPage: function(responseText, callback) {
		var layout=callback.inject;
		layout.innerHTML+="store item page.";
		var doc=System.createDocument(responseText);
		if (responseText.indexOf('Store Items') > 0){
			Helper.retrieveItemInfor(doc);
		}
		Helper.showQuickWear(callback);
	},
	
	showQuickWear: function(callback) {
		Helper.inventoryMap = System.getValueJSON('inventoryMap');
		if (!Helper.inventoryMap) Helper.inventoryMap = {};
		var filterObj=System.getValueJSON('quickWearFilter');
		var output='<div align=center>Filter <input type=checkbox '+(filterObj.enable?'checked':'')+
			' onmouseover="Tip(\'Enable/Disable filter\')" id=quickWearEnable> '+
			'<input class=custominput size=60 value="'+filterObj.value+'" id=quickWearFilter'+
			' onmouseover="Tip(\'The filter, can be used with regular expression like Medi*pack,Stim$\')"> '+
			'<input type=button class=custombutton id=quickWearFilterSave value="Save"></div>'+
			'<table width=100%><tr><th width=20%>Actions</th><th colspan=3>Items</th>'+
			'<th>Level</th>'+'<th sortkey="class">Class</th>'+'<th sortkey="type">Type</th>'+
			'<th>Att</th><th>Def</th>'+'<th>Arm</th>'+'<th>Dam</th>'+'<th>HP</th>' +
			'<th>Upgrade</th>'+'<th>Craft</th>' +
			'</tr>';
		var filterArray=filterObj.value.replace(', ',',').split(',');
		for (var key in Helper.itemList) {
			if (filterObj.enable) {
				var i;
				for (i=0;i<filterArray.length;i++)
					if (Helper.itemList[key].text.match(filterArray[i])) break;
				if (i==filterArray.length) continue;
			}
			var itemID=Helper.itemList[key].id;
			output+='<tr><td align=center>'+
				'<span style="cursor:pointer; text-decoration:underline; color:#D4FAFF; font-size:x-small;" '+
				'id="Helper:equipProfileInventoryItem' + itemID + '" ' +
				'itemID="' + itemID + '">Wear</span>&nbsp;|&nbsp;' +
				'<span style="cursor:pointer; text-decoration:underline; color:#D4FAFF; font-size:x-small;" '+
				'id="Helper:useProfileInventoryItem' + itemID + '" ' +
				'itemID="' + itemID + '">Use/Ext</span>&nbsp;|&nbsp;' +
				'<span style="cursor:pointer; text-decoration:underline; color:#D4FAFF; font-size:x-small;">'+
				'<a href="?cmd=auctionhouse&type=-1&order_by=1&search_text=' + Helper.itemList[key].text +
				'">AH</a></span>'+
				'</td>'+Helper.itemList[key].html;
			if (Helper.inventoryMap['id'+Helper.itemList[key].id]){
				var item=Helper.inventoryMap['id'+Helper.itemList[key].id];
				output+='<td>'+
					item.minLevel+'</td><td>'+item.class+'</td><td>'+
					item.type+'</td><td>'+item.attack+'</td><td>'+
					item.defense+'</td><td>'+item.armor+'</td><td>'+
					item.damage+'</td><td>'+item.hp+'</td><td>'+
					item.forgelevel+'</td><td>'+item.craftlevel+'</td>';
			} else {
				output+='<td></td><td></td><td></td><td></td><td></td>';
				output+='<td></td><td></td><td></td><td></td><td></td>';
			}
			output+='</tr>';
		}
		output+='</table>';
		callback.inject.innerHTML=output;
		for (var key in Helper.itemList) {
			var itemID=Helper.itemList[key].id;
			var elem=document.getElementById('Helper:equipProfileInventoryItem' + itemID);
			if (elem) {
				elem.addEventListener('click', Helper.equipProfileInventoryItem, true);
				document.getElementById('Helper:useProfileInventoryItem' + itemID)
					.addEventListener('click', Helper.useProfileInventoryItem, true);
			}
		}
		document.getElementById('quickWearFilterSave').addEventListener('click', 
			Helper.saveQuickWearFilter, true);
		document.getElementById('quickWearEnable').addEventListener('click', 
			Helper.saveQuickWearFilter, true);
	},
	
	saveQuickWearFilter: function() {
		var filterObj={
			"enable":document.getElementById('quickWearEnable').checked,
			"value":document.getElementById('quickWearFilter').value};
		GM_setValue("quickWearFilter",JSON.stringify(filterObj));
		window.location=window.location;
	},
	
	retrieveItemInfor: function(doc) {
		var table=System.findNode("//td[@colspan=3]/table[@width='100%']",doc);
		for (var i=0; i<table.rows.length/2; i++){
			var row=table.rows[i*2];
			var item={
				"id":System.getIntFromRegExp(row.innerHTML,/value="(\d+)"/),
				"html":row.innerHTML.replace(/<input[^>]*>/g, ''),
				"text":row.textContent.replace(/^\s*\d+\s*\/\s*\d+\s*/,'')
				};
			Helper.itemList["id"+item.id]=item;
		}
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
			System.setValueJSON("map", theMap)
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

	getMonster: function(index) {
		return System.findNode("//a[@id='aLink" + index + "']");
	},

	killSingleMonster: function(monsterNumber) {
		if (!GM_getValue("quickKill")) return;
		var kills=0;
		var monster = Helper.getMonster(monsterNumber);

		var doNotKillList = GM_getValue("doNotKillList");
		var doNotKillListAry = doNotKillList.split(",")

		if (monster) {
			var monsterName = monster.parentNode.parentNode.previousSibling.textContent;
			var injectHere = monster.parentNode.parentNode;
			var monsterFound = false;
			for (var j=0; j<doNotKillListAry.length; j++) {
				var doNotKillName = doNotKillListAry[j];
				if (monsterName == doNotKillName){
					injectHere.innerHTML = '<nobr><span style="color:cyan; font-size:x-small;">On do not kill list&nbsp;</span></nobr>';
					monsterFound = true;
					break;
				}
			}
			if (!monsterFound) {
				kills+=1;
				System.xmlhttp(monster.href, Helper.killedMonster, {"node": monster, "index": monsterNumber});
			}
		}
	},

	prepareCheckMonster: function() {
		Helper.colorMonsters();
		Helper.getMonsterInfo();
	},

	colorMonsters: function() {
		monsters = System.findNodes("//a[contains(@href,'cmd=combat') and contains(@href,'max_turns=')]");
		if (!monsters) return;
		for (var i=0; i<monsters.length; i++) {
			var monster = monsters[i];
			if (monster) {
				// add monster color based on elite types
				if (GM_getValue("enableCreatureColoring")) {
					var monsterText = monster.parentNode.parentNode.parentNode.cells[1];
					if (monsterText.textContent.match(/\(Champion\)/i))
						monsterText.style.color = 'green';
					if (monsterText.textContent.match(/\(Elite\)/i))
						monsterText.style.color = 'yellow';
					if (monsterText.textContent.match(/\(HK\)/i))
						monsterText.style.color = 'red';
				}

				monster.id = "aLink" + (i + 1);
				monster.parentNode.innerHTML += "<span style='font-size:6pt;'>" + (i+1) + "</span>";
			}
		}
	},

	getMonsterInfo: function() {
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
		var goldNode = System.findNode("//table[@width='350']/tbody/tr/td[contains(.,'Credits:')]/following-sibling::td", creatureInfo);
		var enhanceNodesXpath = "//table[@width='350']/tbody/tr[contains(td,'Enhancements')]/following-sibling::*[td/font[@color='#333333']]"
		var enhanceNodes = System.findNodes(enhanceNodesXpath, creatureInfo);
		var imageNode = System.findNode("//img[contains(@src,'/sigma2/creatures/')]", creatureInfo);
		var nameNode = imageNode.nextSibling.nextSibling;

		var hitpoints = parseInt(hitpointsNode.textContent.replace(/,/g,""));
		var armorNumber = parseInt(armorNode.textContent.replace(/,/g,""));
		var oneHitNumber = Math.ceil((hitpoints*1.053)+(armorNumber*1.053));

		var killButtons=System.findNode("tbody/tr[td/input]", statsNode);
		var killButtonHeader=System.findNode("tbody/tr[contains(td/@style,'actions_head_bg.gif')]/following-sibling::tr", statsNode);
		var killButtonParent=killButtonHeader.parentNode.parentNode;
		if (GM_getValue("showMonsterLog")) {
			Helper.pushMonsterInfo({"key0":nameNode.textContent, "key1":imageNode.src, "key2":classNode.textContent, "key3":levelNode.textContent,
				"key4":attackNode.textContent, "key5":defenseNode.textContent, "key6":armorNode.textContent, "key7":damageNode.textContent,
				"key8":hitpointsNode.textContent, "key9":goldNode.textContent});
		}
		var imageNode = System.findNode("//table[@bordercolor='#323236']/..", creatureInfo);

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

		callback.setAttribute("mouseOverText", "<table><tr><td valign=top>" + imageNode.innerHTML + "</td><td>" + statsNode.parentNode.innerHTML + "</td></tr></table>");
		callback.setAttribute("mouseOverWidth", "600");
		callback.addEventListener("mouseover", Helper.clientTip, true);
	},

	pushMonsterInfo: function(monster) {
		// name, img, cls, lvl, atk, def, arm, dmg, hp, gold
		var name = monster.key0;
		var monsterLog = System.getValueJSON("monsterLog");
		if (!monsterLog) monsterLog = {};
		if (!monsterLog[name]) {
			monsterLog[name] = {"min":{}, "max":{}};
			for (i = 1; i < 10; i++) {
				monsterLog[name]["min"]["key" + i] = 1e+100;
				monsterLog[name]["max"]["key" + i] = 0;
			}
			//monsterLog[name]["min"] = {"cls":1e+100, "lvl":1e+100, "atk":1e+100, "def":1e+100, "arm":1e+100, "dmg":1e+100, "hp":1e+100, "gold":1e+100};
			//monsterLog[name]["max"] = {"cls":0, "lvl":0, "atk":0, "def":0, "arm":0, "dmg":0, "hp":0, "gold":0};
		}
		for (i = 1; i < 4; i++)
			monsterLog[name]["min"]["key" + i] = monster["key" + i];
		for (i = 4; i < 10; i++) {
			var value = System.intValue(monster["key" + i]);
			monsterLog[name]["min"]["key" + i] = monsterLog[name]["min"]["key" + i] < value
				? monsterLog[name]["min"]["key" + i] : value;
			monsterLog[name]["max"]["key" + i] = monsterLog[name]["max"]["key" + i] > value
				? monsterLog[name]["max"]["key" + i] : value;
		}
		System.setValueJSON("monsterLog", monsterLog);
	},

	injectMonsterLog: function() {
		var entityLog = System.getValueJSON("monsterLog");
		if (entityLog) {
			Helper.entityLogTable = {entity:[]};
			for (var name in entityLog) {
				var newEntity = {};
				newEntity["name"] = name;
				newEntity["key1"] = entityLog[name]["min"]["key1"];
				for (i = 2; i < 4; i++)
					newEntity["key" + i] = entityLog[name]["min"]["key" + i];
				for (i = 4; i < 10; i++)
					newEntity["key" + i] = System.addCommas(entityLog[name]["min"]["key"+i]) + ' - ' +
						System.addCommas(entityLog[name]["max"]["key"+i]);
				Helper.entityLogTable.entity.push(newEntity);
			}
			Helper.sortBy = 'key3';
			Helper.sortAsc = false;
			Helper.entityLogTable.entity.sort(Helper.numberSort);
		}
		var content=Layout.notebookContent();
		content.innerHTML = '<span id=Helper.entityTableOutput>No monster information! Please enable entity log and travel a bit to see the world</span>';
		Helper.generateEntityTable();
	},

	generateEntityTable: function() {
		var content = document.getElementById("Helper.entityTableOutput");
		if (!Helper.entityLogTable || !content) return;
		var result = '<table cellspacing="0" cellpadding="0" border="0" width="100%"><tr style="background-color:#110011">'+
			'<td width="90%" nobr align=center><b>&nbsp;Entity Information</b></td>'+
			'<td width="10%" nobr>[<span id="Helper.clearEntityLog">Clear</span>]</td>'+
			'</tr>' +
			'</table>'+
			'<table id="Helper:EntityInfo" cellspacing="1" cellpadding="2" border="0" ><tr>' +
			'<th width="25%" align="left" sortkey="name" colspan="2">Entity</th>' +
			'<th align="center" sortkey="key2">Class</th>' +
			'<th align="center" sortkey="key3" sorttype="number">Lvl</th>' +
			'<th align="center">Attack</th>' +
			'<th align="center">Defence</th>' +
			'<th align="center">Armor</th>' +
			'<th align="center">Damage</th>' +
			'<th align="center">HP</th>' +
			'<th align="center">Credits</th>' +
			'</tr>';
		for (var k=0;k<Helper.entityLogTable.entity.length;k++) {
			result += '<tr><td align="center"><img width=40 height=40 ' +
					'onmouseover="tt_setWidth(200);Tip(\'<img src=' + Helper.entityLogTable.entity[k]["key1"] + '/>\');" ' +
					'src="' + Helper.entityLogTable.entity[k]["key1"] + '"/></td>';
			result += '<td align="left">' + Helper.entityLogTable.entity[k]["name"] + '</td>';
			for (i = 2; i < 4; i++)
				result += '<td align="center">' + System.addCommas(Helper.entityLogTable.entity[k]["key"+i]) + '</td>';
			for (i = 4; i < 10; i++)
				result += '<td align="center">' + Helper.entityLogTable.entity[k]["key"+i] + '</td>';
		}
		result += "</table>";
		content.innerHTML = result;
		document.getElementById("Helper.clearEntityLog").addEventListener("click", Helper.clearEntityLog, true);

		var theTable=document.getElementById('Helper:EntityInfo');
		for (var i=0; i<theTable.rows[0].cells.length; i++) {
			var cell=theTable.rows[0].cells[i];
			if (cell.getAttribute("sortkey")) {
				cell.style.textDecoration="underline";
				cell.style.cursor="pointer";
				cell.addEventListener('click', Helper.sortEntityLogTable, true);
			}
		}
	},

	clearEntityLog: function() {
		GM_setValue("monsterLog", "");
		window.location="index.php?cmd=notepad&subcmd=monsterlog";
	},

	sortEntityLogTable: function(evt) {
		var headerClicked = evt.target.getAttribute("sortKey");
		var sortType = evt.target.getAttribute("sortType");
		if (!sortType) sortType="string";
		if (Helper.sortAsc==undefined) Helper.sortAsc=true;
		if (Helper.sortBy && Helper.sortBy==headerClicked) {
			Helper.sortAsc=!Helper.sortAsc;
		}

		Helper.sortBy=headerClicked;
		GM_log(Helper.sortAsc + " " + Helper.sortBy + " " + sortType);

		switch(sortType) {
			case "string":
				Helper.entityLogTable.entity.sort(Helper.stringSort);
				break;
			case "number":
				Helper.entityLogTable.entity.sort(Helper.numberSort);
				break;
		}
		Helper.generateEntityTable();
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
			// get HP from combat aninmation script
			var hpRE=/(hp[[0-9]+]=[0-9]+;)/g
			var hps=responseText.match(hpRE);
			if (hps) hps=hps[hps.length-2];
			if (hps) hps=(hps.match(/=[0-9]+;/)[0]).replace('=','').replace(';','');

			var finalHP = hps ? parseInt(hps) : parseInt(hpNode.textContent.split("/")[0]);
			var maxHP = parseInt(hpNode.textContent.split("/")[1]);

			var ammoNode= System.findNode("//div[@id='current_ammo_0']", doc);
			var finalAmmo = parseInt(ammoNode.textContent.split("/")[0]);
			var maxAmmo = parseInt(ammoNode.textContent.split("/")[1]);
			var reportAmmo=(maxAmmo>0)?"<div style='font-size:x-small;width:120px;overflow:hidden;'>Ammo: "+ammoNode.textContent+"</div>":"";
			if (maxAmmo>0 && finalAmmo<5) reportAmmo="<font color=yellow>"+reportAmmo+"</font>";

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
		var shieldImpHPRE = /Psi Shield has \d block\(s\) remaining/;
		var shieldImpHP = responseText.match(shieldImpHPRE);
		var shieldImpDeathRE = /Psi Shield is destroyed/;
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
			if (shieldImpHP) {
				resultHtml += "<br/><small><small><span style='color:red;'>"+shieldImpHP[shieldImpHP.length-1]+"</span></small></small>";
				resultText += shieldImpHP[0]+"\n"
			}
			if (shieldImpDeath) {
				resultHtml += "<br/><small><small><span style='color:red;'>Psi Shield was destroyed</span></small></small>";
				resultText += "Psi Shield was destroyed\n"
			}
			if (xpGain<0) result.style.color='red';
			var monsterParent = monster.parentNode;
			result.id = "result" + callback.index;
			if (report) {
				var reportLines=report.split("\n");
				var reportHtml="";
				var reportText="";
				var reportCombat="";
				var combatIndex=1;
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
						if (reportMatch[1].indexOf("hits")>=0)
							reportCombat += "<font color="+(combatIndex?"green":"yellow")+">hit</font>-";
						if (reportMatch[1].indexOf("misses")>=0)
							reportCombat += "<font color="+(combatIndex?"yellow":"green")+"><i>miss</i></font>-";
						if (reportMatch[1].indexOf("reloaded.")>=0)
							reportCombat += "<font color="+(combatIndex?"yellow":"green")+"><i>reload</i></font>-";
						if (reportMatch[1].indexOf("victorious")>=0)
							reportCombat += "Vic";
						if (reportMatch[1].indexOf("defeated")>=0)
							reportCombat += "Def";
						combatIndex=1-combatIndex;
					}
				}
				if (reportCombat!="") reportCombat="<div style='font-size:xx-small;width:120px;overflow:hidden;'>" + reportCombat + "</div>";
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
				result.innerHTML=reportCombat+reportAmmo+resultHtml;
				result.setAttribute("mouseOverText", mouseOverText);
				if (GM_getValue("keepLogs")) {
					var now=new Date();
					Helper.readInfo(doc);
					var reportStat = "Atk:"+Helper.characterAttack+" Def:"+Helper.characterDefense+" Armor:"+Helper.characterArmor+" HP:"+Helper.characterHP+" Dmg:"+Helper.characterDamage;
					Helper.appendSavedLog("\n================================\n" + now.toLocaleString() + "\n" + resultText + "\n" + reportText + "\n" + reportStat);
				}
			} else {
				result.innerHTML=resultHtml;
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
		if (!Helper.rightSideBar) return;
		if (!GM_getValue("enableGuildOnlineList")) return;
		var info = Helper.rightSideBar.insertRow(0);
		var cell = info.insertCell(0);
		cell.innerHTML="<span id='Helper:GuildListPlaceholder'></span>";
		Helper.retrieveGuildData();
	},

	retrieveGuildData: function(refreshGuildDataOnly) {
		var memberList = System.getValueJSON("memberlist");
		var guildOnlineRefreshTime = GM_getValue("guildOnlineRefreshTime");
		guildOnlineRefreshTime *= 1000;
		if (memberList) {
			if ((new Date()).getTime() - memberList.lastUpdate.getTime() > guildOnlineRefreshTime) memberList = null; // invalidate cache
		}

		if (!memberList || refreshGuildDataOnly) {
			System.xmlhttp("index.php?cmd=guild&subcmd=manage",Helper.parseGuildForWorld,refreshGuildDataOnly);
		} else {
			var memberList = System.getValueJSON("memberlist");
			memberList.isRefreshed = false;
			Helper.injectGuildList(memberList);
		}
	},

	parseGuildForWorld: function(details,refreshGuildDataOnly) {
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
			var memberList = System.getValueJSON("memberlist");
			if (!memberList) {
				memberList = {};
				memberList.members = [];
			}

			memberList.members.forEach(function(e) {e.status="Deleted"});

			for (var i=0;i<membersDetails.rows.length;i++) {
				var aRow = membersDetails.rows[i];
				if (aRow.cells.length==5 && aRow.cells[0].firstChild.title) {
					var playerLink   = aRow.cells[1].firstChild.firstChild.firstChild.firstChild.nextSibling.firstChild.nextSibling;
					var memberId     = System.intValue((/[0-9]+$/).exec(playerLink.href)[0]);
					var memberName   = playerLink.textContent;
					var memberLevel  = System.intValue(aRow.cells[2].textContent);
					var memberRank   = aRow.cells[3].textContent;
					var memberXP     = System.intValue(aRow.cells[4].textContent);
					var memberStatus = aRow.cells[0].firstChild.title;
					var memberClass = aRow.cells[1].firstChild.firstChild.firstChild.firstChild.firstChild.getAttribute('title');

					var aMember;

					// find member in member list, to modify data instead of replacing it

					var findMembers = memberList.members.filter(function (e) {return e.id==memberId});
					if (findMembers.length>0) {
						aMember = findMembers[0];
					}
					else { // member was not found, must be a new player
						aMember = {};
						// You can still modify an object, even if you have added it to something else
						memberList.members.push(aMember);
						aMember.firstSeen = new Date();
						aMember.status = "Offline"; // new players are supposed to be offline
					}
					Helper.getFullPlayerData(aMember);

					if (aMember.status == "Offline" && memberStatus=="Online") {
						aMember.loggedInAt = new Date();
					}

					if (!aMember.loggedInAt) {
						aMember.loggedInAt = new Date();
					}

					aMember.status = memberStatus;
					aMember.id = memberId;
					aMember.name = memberName;
					aMember.level = memberLevel;
					aMember.rank = memberRank;
					aMember.xp = memberXP;
					aMember.class = memberClass;
				}
			}

			// remove not existing players
			memberList.members = memberList.members.filter(function(e) {return e.status!="Deleted"});
			// damn, I love javascript array functions :)

			memberList.lastUpdate = new Date();
			memberList.isRefreshed = true;
			if (!refreshGuildDataOnly) Helper.injectGuildList(memberList);
		}
	},

	prepareChat: function() {
		Helper.rightSideBar = System.findNode("//table[@width='120' and contains(tbody/tr/td/table/@style, '/sigma2/skin/community_header.gif')]")
		var showLines = parseInt(GM_getValue("chatLines"))
		if (showLines==0) return;
		if (!Helper.rightSideBar) return;
		var info = Helper.rightSideBar.insertRow(0);
		var cell = info.insertCell(0);
		cell.innerHTML="<span id='Helper:ChatPlaceholder'></span>";
		var chat = System.getValueJSON("chat");
		var newChat = System.findNode("//table[contains(.,'chat messages')]")
		if (!chat || newChat || ((new Date()) - chat.lastUpdate > 15000)) {
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
		chat.lastUpdate = new Date();
		chat.messages = [];
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

		System.setValueJSON("chat", chat);
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

		sendType = isMass?"Send As Mass":"Send";

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
			}
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

	killMonsterAt: function(index) {
		var linkObj	= Helper.getMonster(index);
		if (linkObj!=null) {
			if (GM_getValue("quickKill")) {
				Helper.killSingleMonster(index);
			}
			else {
				window.location = linkObj.href
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
			Helper.moveMe(-1,-1);
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
		case 114: // repair [r]
			window.location = 'index.php?cmd=blacksmith&subcmd=repairall&fromworld=1';
			break;
		case 107: //quickStone [k]
			Helper.quickStone();
			break;
		case 75: //quickShard [K]
			Helper.quickShard();
			break;
		case 73: //Quick remove MS [I]
			Helper.quickMS(false);
			break;
		case 105: //Quick MS [i]
			Helper.quickMS(true);
			break;
		case 71: // create group [G]
			window.location = 'index.php?cmd=guild&subcmd=groups&subcmd2=create&fromworld=1';
			break;
		case 103: // go to guild [g]
			window.location = 'index.php?cmd=guild&subcmd=manage'
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
			Helper.killMonsterAt(r-48);
			break;
		case 61: // view shop in map [=]
			Helper.worldMapAction();
			break;
		case 98: // backpack [b]
			window.location = 'index.php?cmd=profile&subcmd=dropitems&fromworld=1';
			break;
		case 116: // quick buy [t]
			Helper.quickBuyItem();
			break;
		case 118: // fast wear manager [v]
			window.location = 'index.php?cmd=notepad&subcmd=quickwear';
			break;
		case 104: // quickheal [h]
			Helper.quickHeal();
			break;
		case 123: // "{"
		case 125: // "}"
		case 124: // quick use items "|"
			Helper.quickUse('', {'id':((r==124?127:r)-123)/2});
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
		case 112: // profile
			window.location = 'index.php?cmd=profile';
			break;
		case 110: // mini map [n]
			Helper.displayMiniMap();
			break;
		case 62: // move to next page [>]
		case 60: // move to prev page [<]
			Helper.movePage({62:'>', 60:'<'}[r]);
			break;
		case 33: // Shift+1
		case 64: // Shift+2
		case 34: // Shift+2 -- for UK keyboards, I think
		case 35: // Shift+3
		case 36: // Shift+4
		case 37: // Shift+5
		case 94: // Shift+6
		case 38: // Shift+7
		case 42: // Shift+8
		case 40: // Shift+9
			var keyMap = {"key33":1, "key64":2, "key34":2, "key35":3, "key36":4, "key37":5,
				"key94":6, "key38":7, "key42":8, "key40":9};
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
				postDateAsDate = System.parseDate(cellContents);
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

	addLogWidgets: function() {
		var logTable = System.findNode("//table[@border='0' and @cellpadding='2' and @width='100%']");
		var memberList = System.getValueJSON("memberlist");
		var memberNameString = "";
		if (memberList) {
			for (var i=0;i<memberList.members.length;i++) {
				var member=memberList.members[i];
				memberNameString += member.name + " ";
			}
		}
		var isGuildmate = false;
		var listOfEnemies = GM_getValue("listOfEnemies");
		if (!listOfEnemies) listOfEnemies = "";
		var listOfAllies = GM_getValue("listOfAllies");
		if (!listOfAllies) listOfAllies = "";
		for (var i=0;i<logTable.rows.length;i++) {
			var aRow = logTable.rows[i];
			if (i != 0) {
				if (aRow.cells[0].innerHTML) {
					firstCell = aRow.cells[0];
					//Valid Types: General, Chat, Guild
					messageType = firstCell.firstChild.nextSibling.getAttribute("title");
					var colorPlayerName = false;
					var isGuildMate = false;
					if (messageType == "Chat") {
						var playerElement = aRow.cells[2].firstChild.nextSibling.firstChild;
						var playerName = playerElement.innerHTML;
						colorPlayerName = true;
					}
					if (messageType == "General") {
						if (aRow.cells[2].firstChild.nextSibling.innerHTML.search("player_id")!=-1) {
							playerElement = aRow.cells[2].firstChild.nextSibling.firstChild.nextSibling;
							playerName = playerElement.innerHTML
							colorPlayerName = true;
						}
					}
					if (colorPlayerName) {
						if (memberNameString.search(playerName) !=-1) {
							playerElement.style.color="green";
							isGuildMate = true;
						}
						if (listOfEnemies.search(playerName) !=-1) {
							playerElement.style.color="red";
						}
						if (listOfAllies.search(playerName) !=-1) {
							playerElement.style.color="cyan";
						}
					}
					if (messageType == "Chat") {
						var messageHTML = aRow.cells[2].innerHTML;
						var firstPart = messageHTML.substring(0, messageHTML.indexOf("<small>") + 7);
						var secondPart = messageHTML.substring(messageHTML.indexOf("<small>") + 7, messageHTML.indexOf(">Reply</a>") + 10);
						var thirdPart = messageHTML.substring(messageHTML.indexOf(">Reply</a>") + 10, messageHTML.indexOf("</small>"));
						var lastPart = messageHTML.substring(messageHTML.indexOf("</small>"), messageHTML.length);
						var extraPart = " | <a href='index.php?cmd=trade&target_player=" + playerName + "'>Trade</a> | " +
							"<a title='Secure Trade' href='index.php?cmd=trade&subcmd=createsecure&target_username=" + playerName +
							"'>ST</a>"
						if (!isGuildMate) {
							extraPart += " | <a title='Add to Ignore List' href='index.php?cmd=log&subcmd=doaddignore&ignore_username=" + playerName +
							"'>Ignore</a>";
						}
						aRow.cells[2].innerHTML = firstPart + "<nobr>" + secondPart + extraPart + thirdPart + "</nobr>" + lastPart;
					}
					if (aRow.cells[2].innerHTML.search("You have just been outbid at the trade hub") != -1) {
						aRow.cells[2].innerHTML += ". Go to <a href='/index.php?cmd=auctionhouse&type=-50'>My Bids</a>.";
					}
					if (messageType == "General" &&
							aRow.cells[2].firstChild.nextSibling.innerHTML.search("player_id")!=-1){

						var buffingPlayerIDRE = /player_id=(\d+)/;
						var buffingPlayerID = buffingPlayerIDRE.exec(aRow.cells[2].innerHTML)[1];
						var buffingPlayerName = aRow.cells[2].firstChild.nextSibling.firstChild.nextSibling.innerHTML;
						var extraText = " <span style='font-size:x-small;'><nobr>[ <a href='index.php?cmd=message&target_player=" + buffingPlayerName +
							"'>Reply</a> | <a href='index.php?cmd=trade&target_player=" + buffingPlayerName +
							"'>Trade</a> | <a title='Secure Trade' href='index.php?cmd=trade&subcmd=createsecure&target_username=" + buffingPlayerName +
							"'>ST</a>";
						if (!isGuildMate) {
							extraText += " | <a title='Add to Ignore List' href='index.php?cmd=log&subcmd=doaddignore&ignore_username=" + playerName +
							"'>Ignore</a>";
						}
						extraText += " | <a " + Layout.quickBuffHref(buffingPlayerID) + ">Buff</a> ]</nobr></span>";
						aRow.cells[2].innerHTML += extraText;
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
		var playerId = Layout.playerId();
		System.setValueJSON("memberlist", memberList);
		var injectHere = document.getElementById("Helper:GuildListPlaceholder");
		// injectHere.innerHTML=memberList.length;
		var displayList = document.createElement("TABLE");
		displayList.style.border = "1px solid gray";
		displayList.style.backgroundColor = (memberList.isRefreshed)?"#151f1e":"#112322";
		displayList.cellPadding = 1;
		displayList.width = 125;

		var aRow=displayList.insertRow(displayList.rows.length);
		var aCell=aRow.insertCell(0);
		var output = "<ol style='color:#FFF380;font-size:10px;list-style-type:decimal;margin-left:1px;margin-top:1px;margin-bottom:1px;padding-left:20px;'>"+
			"Faction Members <a id='Helper:resetGuildList' style='color:cyan; font-size:8px; cursor:pointer; text-decoration:underline;'"+
			" onmouseover=\"tt_setWidth(105);Tip('Reset online Faction List');\">R</a>";
		var onlineMembers = memberList.members.filter(function (e) {return (e.status=="Online")})
		var class2img = {'Mutant':1,'Soldier':2,'Purist':3,'Cyborg':4};
		for (var i=0;i<onlineMembers.length;i++) {
			var member=onlineMembers[i];
			output += "<li style='padding-bottom:0px;'>"
			output += "<a style='color:#CCFF99;font-size:10px;' "
			output += Layout.quickBuffHref(member.id) + ">[b]</a>&nbsp;";
			if (member.id!=playerId) {
				output += "<a style=\"color:#A0CFEC;font-size:10px;\" "
				output += "href=\"" + System.server + "index.php?cmd=message&target_player=" + member.name + "\">[m]";
				output += "</a>";
			}
			else {
				output += "<span style='color:" + displayList.style.backgroundColor + ";'>[m]</span>";
			}
			output += "&nbsp;<a onmouseover=\"tt_setWidth(105);";
			output += "Tip('<div style=\\'text-align:center;width:105px;\\'><b>" + member.rank + "</b>"+
				"<br/>XP: " + System.addCommas(member.xp) +
				"<br/>Level: " + member.level +
				"<br/>Class: " + member.class + "&nbsp;<image src=\\'http://66.7.192.165/sigma2/skin/classes/"+class2img[member.class]+".gif\\'>"+
				"<br/>Logged in:" + member.loggedInAt.toFormatString("ddd HH:mm");
			if (member.hasFullData) {

			}
			output += "</div>');\" ";
			output += "style='color:"
			if (((new Date()) - member.loggedInAt) < 30000) { // just logged in
				output += "orange";
			}
			else {
				output += (member.id==playerId)?"#FFF380":"white";
			}
			output += ";font-size:10px;'"
			output += " href='" + System.server + "index.php?cmd=profile&player_id=" + member.id + "'>" + member.name + "</a>";
			// output += "<br/>"
			output += "</li>"
		}
		output += "</ol>";
		aCell.innerHTML = output;
		var breaker=document.createElement("BR");
		injectHere.parentNode.insertBefore(breaker, injectHere.nextSibling);
		injectHere.parentNode.insertBefore(displayList, injectHere.nextSibling);
		document.getElementById('Helper:resetGuildList').addEventListener('click', Helper.resetGuildList, true);
	},

	resetGuildList: function(evt) {
		GM_setValue("memberlist","");
		GM_setValue("oldmemberlist","");
		window.location = window.location;
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
		var textRow = auctionTable.rows[1].cells[0];
		textRow.innerHTML = '<table cellspacing=10><tr><td width=60%><span id=auctionTextControl>' + textRow.innerHTML + 
			'</span></td><td id=quickSearchLayout style="text-align:center;color:#FFF380;background-color:black"></td></tr></table>';
		textRow=document.getElementById("auctionTextControl");
		var myBidsButton = System.findNode("//input[@value='My Bids']/..");
		myBidsButton.innerHTML += " [ <span style='cursor:pointer; text-decoration:underline;' " +
			"id='toggleAuctionTextControl' linkto='auctionTextControl' title='Click on this to Show/Hide the AH text.'>X</span> ]";
		if (GM_getValue("auctionTextControl")) {
			textRow.style.display = "none";
			textRow.style.visibility = "hidden";
		}
		document.getElementById('toggleAuctionTextControl').addEventListener('click', System.toggleVisibilty, true);

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

		var quickSearchList = System.getValueJSON("quickSearchList");

		var colNumber = 5;
		var injectHere=document.getElementById("quickSearchLayout");
		var finalHTML = "<table cellpadding=2 style='font-size:x-small'><tr><td colspan="+colNumber+"><a style='color:#B5B1AB' href='" +
				System.server +
				"index.php?cmd=notepad&subcmd=auctionsearch'>" +
				"Configure Quick Search</a></td></tr>";
		var lp=0;
		var rowCount = 0;
		for (var p=0;p<quickSearchList.length;p++) {
			if (lp % colNumber==0 && rowCount == 4) break; //18 searches on the screen so don't display any more
			var quickSearch=quickSearchList[p];
			if (quickSearch.displayOnAH) {
				if (lp % colNumber==0) {
					finalHTML += "<tr>";
					rowCount++;
				}
				finalHTML += '<td nowrap><a style="color:white" href="'+
					System.server + 'index.php?cmd=auctionhouse&type=-1&search_text=' + quickSearch.searchname + '">'+
					quickSearch.nickname+'</a></td>';
				if (lp % colNumber==colNumber-1) finalHTML += "</tr>";
				lp++;
			}
		}
		finalHTML+="</table>";
		injectHere.innerHTML = finalHTML;

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

		var newRow, newCell, winningBidBuyoutCell;
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
					if (winningBidValue != "-" && !bidExistsOnItem && !playerListedItem) {
						var overBid = isGold?Math.ceil(winningBidValue * 1.05):(winningBidValue+1);
						winningBidBuyoutCell.innerHTML = '<span style="color:#ADB5B5;" title="Overbid value">Overbid ' + System.addCommas(overBid) + '</span>&nbsp';
					}
					if (!playerListedItem) {
						var inputTable = aRow.cells[6].firstChild.firstChild;
						var inputCell = inputTable.rows[0].cells[0];
						var textInput = inputCell.firstChild;
						textInput.id = 'auction' + i + 'text';
						var bidCell = inputTable.rows[0].cells[1];
						bidCell.align = "right";
						//spacer row
						newRow = inputTable.insertRow(1);
						inputTableCell = newRow.insertCell(0);
						inputTableCell.colSpan = "2";
						inputTableCell.height = "2";
						//get itemID for bid no refresh
						var itemIMG = aRow.cells[0].firstChild;
						var itemStats = /ajaxLoadItem\((\d+), (\d+), (\d+), (\d+)/.exec(itemIMG.getAttribute("onmouseover"));
						invID = itemStats[2];
						//new bid no refresh button
						newRow = inputTable.insertRow(2);
						inputTableCell = newRow.insertCell(0);
						inputTableCell.colSpan = "2";
						inputTableCell.align = "center";
						inputTableCell.innerHTML = '<span id="auction' + i + 'text">'+
							'<input id="bidNoRefresh" invID="'+ invID +
								'" linkto="auction' + i + 'text" value="Bid no Refresh" class="custombutton" type="submit"></span>';
					}
					var inputText = aRow.cells[6]
				}
			}
		}
		
		bidNoRefreshList = System.findNodes("//input[@id='bidNoRefresh']");		
		if (bidNoRefreshList) {		
			for (var i=0; i<bidNoRefreshList.length; i++) {		
				var bidNoRefreshItem = bidNoRefreshList[i];		
				bidNoRefreshItem.addEventListener('click', Helper.bidNoRefresh, true);		
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
			'&nbsp;Crystal: <input type=checkbox style="font-size:xx-small" class=custominput name=pref_hidefsp value="1" />' +
			'<input type=submit class=custombutton id="Helper:AuctionHouseSavePreferences" value="Save" /></form></div>';

		// preparePreferences.appendChild(prefArea);
		preparePreferences.appendChild(newRow);

		searchPrefs.addEventListener("click", Helper.auctionHouseTogglePreferences, true);
		document.getElementById("Helper:AuctionHouseSavePreferences").addEventListener("click", Helper.auctionHouseSavePreferences, true);

		Helper.injectAuctionQuickCancel();
	},
	
	bidNoRefresh: function(evt) {
		var inputValue = System.findNode("//input[@id='" + evt.target.getAttribute("linkto") + "']");
		var invID = evt.target.getAttribute("invID");
		var postData = "cmd=auctionhouse&subcmd=placebid" +
				"&auction_id=" + invID +
				"&page=" +
				"&type=-1" +
				"&bid=" + inputValue.value;

		GM_xmlhttpRequest({
			method: 'POST',
			url: System.server + "index.php",
			headers: {
				"User-Agent" : navigator.userAgent,
				"Referer": System.server + "index.php?cmd=auctionhouse&subcmd=type=-1",
				"Cookie" : document.cookie,
				"Content-Type": "application/x-www-form-urlencoded"
			},
			data: postData,
			onload: function(responseDetails) {
				var info = Layout.infoBox(responseDetails.responseText);
				var infoElement = evt.target.parentNode;
				if (info.search("Bid placed successfully!") != -1) {
					infoElement.innerHTML = " <span style='color:green; font-weight:bold;'>" + info + "</span>";
				} else {
					infoElement.innerHTML = " <span style='color:red; font-weight:bold;'>" + info + "</span>";
				}
			}
		})
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
				"Content-Type": "application/x-www-form-urlencoded"
			},
			data: postData,
			onload: function(responseDetails) {
				Helper.auctionHouseSavePreferencesDone(responseDetails.responseText);
			}
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
	
	toggleShowQuickDropLinks: function(evt) {
		var showQuickDropLinksElement = System.findNode("//span[@id='Helper:showQuickDropLinks']");
		if (showQuickDropLinksElement.textContent == "Show Quick Drop links") {
			if (window.confirm("Are you sure you want to show the quick drop links?")) GM_setValue("showQuickDropLinks", true);
		} else {
			GM_setValue("showQuickDropLinks", false);
		}
		window.location = window.location;
	},

	injectReportPaint: function() {
		var mainTable = System.findNode("//table[@width='600']");
		var searchItemRE = /&item=(.*)$/
		var searchSetRE = /&set=([a-zA-Z]*)/
		var searchUserRE = /&user=(.*)$/
		var searchItem = searchItemRE.exec(location);
		var searchSet = searchSetRE.exec(location);
		var searchUser = searchUserRE.exec(location);
		if (searchItem) searchItem = unescape(searchItem[1]);
		if (searchSet) searchItem = unescape(searchSet[1]);
		if (searchUser) searchUser = unescape(searchUser[1]);
		var isUser=false, startRow=0, stopRow=mainTable.rows.length;
		if (searchUser) {
			for (var i=0;i<mainTable.rows.length;i++) {
				var aRow = mainTable.rows[i];
				if (!(aRow.cells[1])) {
					if (isUser) stopRow=i;
					isUser=(aRow.textContent.replace(/\s*/g,'')==searchUser);
					if (isUser) startRow=i;
				}
			}
			var len=mainTable.rows.length;
			for (var i=0;i<startRow;i++) mainTable.deleteRow(0);
			for (var i=0;i<len-stopRow;i++) mainTable.deleteRow(stopRow-startRow);
		}
		for (var i=mainTable.rows.length-1;i>=0;i--) {
			var aRow = mainTable.rows[i];
			if (aRow.cells[1]) { // itemRow
				var itemCell = aRow.cells[1];
				if (searchItem && itemCell.textContent.indexOf(searchItem)<0){
					//aRow.innerHTML='';
					mainTable.deleteRow(i);
					continue;
				}
				var itemElement = itemCell.firstChild;
				var href = itemElement.getAttribute("href");
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
				var player=System.findNode("//td[@bgcolor='#112322']/b[contains(., '" + member.name + "')]");
				if (player) {
					player.innerHTML = "<span style='font-size:large; color:green;'>[Online]</span> <a href='" +
						System.server + "index.php?cmd=profile&player_id=" + member.id + "'>" + player.innerHTML + "</a>";
					player.innerHTML += " [ <a href='index.php?cmd=message&target_player=" + member.name + ">m</a> ]";
				}
			}
			else {
				var player=System.findNode("//td[@bgcolor='#112322']/b[contains(., '" + member.name + "')]");
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

		var cbsSelect = System.findNode("//select[@name='combat_set_id']", doc);

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
			data: "cmd=profile&subcmd=managecombatset&combat_set_id="+cbsIndex+"&submit=Use",
			onload: function() {
				window.location="index.php?cmd=profile";
			}
		})
	},

	injectDropItems: function() {
		var mainTable = System.findNode("//table[contains(@background,'skin/large_content_bg.jpg')]");
		if (!mainTable.rows[5]) var mainTable = System.findNode("//table[@width=600]");
		var showExtraLinks = GM_getValue("showExtraLinks");
		var showQuickDropLinks = GM_getValue("showQuickDropLinks");
		if (mainTable) {
			var insertHere = mainTable.rows[5].cells[0];
			insertHere.innerHTML += '[<span style="cursor:pointer; text-decoration:underline;" id="Helper:showExtraLinks">' +
				(showExtraLinks?'Hide':'Show') + ' AH and Sell links</span>]&nbsp;';
			insertHere.innerHTML += '[<span style="cursor:pointer; text-decoration:underline;" id="Helper:showQuickDropLinks">' +
				(showQuickDropLinks?'Hide':'Show') + ' Quick Drop links</span>]&nbsp;';
			document.getElementById("Helper:showExtraLinks").addEventListener('click', Helper.toggleShowExtraLinks, true);
			document.getElementById("Helper:showQuickDropLinks").addEventListener('click', Helper.toggleShowQuickDropLinks, true);
		}

		//function to add links to all the items in the drop items list
		if (showExtraLinks || showQuickDropLinks) {
			var itemName, itemInvId, theTextNode, newLink;
			var allItems=System.findNodes("//input[@type='checkbox']");
			if (allItems) {
				for (var i=0; i<allItems.length; i++) {
					anItem = allItems[i];
					itemInvId = anItem.value;
					theTextNode = System.findNode("../../td[3]", anItem);
					theImgElement = System.findNode("../../td[2]", anItem).firstChild.firstChild;
					itemStats = /ajaxLoadItem\((\d+), (\d+), (\d+), (\d+)/.exec(theImgElement.getAttribute("onmouseover"));
					if (itemStats) {
						itemId = itemStats[1];
						invId = itemStats[2];
						type = itemStats[3];
						pid = itemStats[4];
						imgid = /\/([^./]*).gif/.exec(theImgElement.src)[1];
						text = System.findNode("../../td[2]", anItem).firstChild.textContent;
					}
					itemName = theTextNode.textContent.trim().replace("\\","");
					theTextNode.textContent = itemName;
					var findItems = System.findNodes('//td[@width="90%" and contains(.,"'+itemName+'")]');
					var preText = "", postText1 = "", postText2 = "";
					
					if (showExtraLinks) {
						preText = "<span findme='AH'>[<a href='" + System.server + "?cmd=auctionhouse&type=-1&order_by=1&search_text="
							+ escape(itemName)
							+ "'>AH</a>]</span> "
							+ "<span findme='Sell'>[<a href='" + System.server + "index.php?cmd=auctionhouse&subcmd=create2"
							+ "&inv_id=" + itemInvId 
							+ "&item_id=" + itemId
							+ "&type=" + type
							+ "&pid=" + pid
							+ "&imgid=" + imgid
							+ "&txt=" + text + "'>"
							+ "Sell</a>]</span> ";
					}
					postText1 = ((findItems.length>1)?' [<span findme="checkall" linkto="'
						+ itemName
						+ '" style="text-decoration:underline;cursor:pointer">Check all</span>]':'');
					if (showQuickDropLinks) {
						postText2 = "&nbsp;<span  title='INSTANTLY DROP THE ITEM. NO REFUNDS OR DO-OVERS! Use at own risk.' id='Helper:QuickDrop"
							+ itemInvId
							+ "' itemInvId="
							+ itemInvId
							+ " findme='QuickDrop' style='color:red; cursor:pointer; text-decoration:underline;'>[Quick Drop]</span> ";
					}
					
					theTextNode.innerHTML = preText
						+ theTextNode.innerHTML
						+ postText1
						+ postText2;
					if (showQuickDropLinks) {
						document.getElementById("Helper:QuickDrop"+itemInvId).addEventListener('click', Helper.quickDropItem, true);
					}
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
	
	quickDropItem: function(evt){
		var itemInvId = evt.target.getAttribute("itemInvId");
		var dropItemHref = "index.php?cmd=profile&subcmd=dodropitems&removeIndex[]=" + itemInvId;
		System.xmlhttp(dropItemHref,
			Helper.quickDropItemReturnMessage,
			{"target": evt.target});
	},

	quickDropItemReturnMessage: function(responseText, callback) {
		var target = callback.target;
		var info = Layout.infoBox(responseText);
		target.style.cursor = 'default';
		target.style.textDecoration = 'none';
		if (info.search("Items dropped and destroyed.") != -1) {
			target.style.color = 'green';
			target.style.fontWeight = 'bold';
			target.style.fontSize = 'small';
			target.innerHTML = "Item Dropped";
		} else {
			target.style.color = 'red';
			target.style.fontWeight = 'bold';
			target.style.fontSize = 'small';
			target.innerHTML = "Error:" + info;
			//debugging message to try and help track down the issue where you get an error (because you shouldn't be able to ...
			GM_log(responseText);
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
				var relationship = Helper.guildRelationship(aLink.text);
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

			newhtml = avyrow.parentNode.innerHTML +
				"</td></tr><tr><td align='center' colspan='2'>" +
				"<a " + Layout.quickBuffHref(playerid) + ">" +
				"<img alt='Buff " + playername + "' title='Buff " + playername + "' src=" +
				System.imageServer + "/skin/realm/icon_action_quickbuff.gif></a>&nbsp;&nbsp;" +
				"<a href='" + System.server + "index.php?cmd=guild&subcmd=groups&subcmd2=joinall" +
				"');'><img alt='Join All Groups' title='Join All Groups' src=" +
				System.imageServer + "/skin/icon_action_join.gif></a>&nbsp;&nbsp;" +
				"<a href=" + System.server + "?cmd=auctionhouse&type=-3&tid=" +
				playerid + '><img alt="' + auctiontext + '" title="' + auctiontext + '" src="' +
				System.imageServer + '/skin/gold_button.gif"></a>&nbsp;&nbsp;' +
				"<a href=" + System.server + "index.php?cmd=trade&subcmd=createsecure&target_username=" +
				playername + '><img alt="' + securetradetext + '" title="' + securetradetext + '" src=' +
				System.imageServer + "/temple/2.gif></a>&nbsp;&nbsp;";
			if (relationship == "self" && GM_getValue("showAdmin")) {
				newhtml +=
					"<a href='" + System.server + "index.php?cmd=guild&subcmd=members&subcmd2=changerank&member_id=" +
					playerid + '><img width=16 height=16 alt="' + ranktext + '" title="' + ranktext + '" src=' +
					System.imageServer + "/guildlogos/931.gif></a>";
			}
			avyrow.parentNode.innerHTML = newhtml ;
		}

		var isSelfRE=/player_id=/.exec(document.location.search);

		if (isSelfRE) {
			avyrow = System.findNode("//img[contains(@title, 's Avatar')]");
			Helper.injectStatCalculator(avyrow.parentNode);
		}

		if (!isSelfRE) { // self inventory
			// Allies/Enemies count/total function
			var alliesTotal = GM_getValue("alliestotal");
			var alliesParent = System.findNode("//td[contains(@background, 'sigma2/inventory/allies_head.jpg')]");;
			var alliesTable = alliesParent.parentNode.nextSibling.nextSibling.nextSibling.nextSibling;
			var numberOfAllies = 0;
			var startIndex = 0;
			while (alliesTable.innerHTML.indexOf("player_id=", startIndex+1) != -1) {
				numberOfAllies ++;
				startIndex = alliesTable.innerHTML.indexOf("player_id=",startIndex+1);
			}
			startIndex = 0;
			alliesParent.firstChild.nextSibling.rows[0].cells[0].innerHTML +=
				"<span style='color:#ADB5B5; font-size:x-small' >" + numberOfAllies + "</span>";
			if (alliesTotal && alliesTotal >= numberOfAllies) {
				alliesParent.firstChild.nextSibling.rows[0].cells[0].innerHTML +=
					"/<span style='color:#ADB5B5; font-size:x-small' findme='alliestotal'>" + alliesTotal + "</span>";
			}
			var enemiesTotal = GM_getValue("enemiestotal");
			var enemiesParent = System.findNode("//td[contains(@background, 'sigma2/inventory/enemies_head.jpg')]");
			var enemiesTable = enemiesParent.parentNode.nextSibling.nextSibling.nextSibling.nextSibling;
			var numberOfEnemies = 0;
			var startIndex = 0;
			while (enemiesTable.innerHTML.indexOf("player_id=", startIndex+1) != -1) {
				numberOfEnemies ++;
				startIndex = enemiesTable.innerHTML.indexOf("player_id=",startIndex+1);
			}
			var startIndex = 0;
			enemiesParent.firstChild.nextSibling.rows[0].cells[0].innerHTML +=
				"&nbsp;<span style='color:#ADB5B5; font-size:x-small'>" + numberOfEnemies + "</span>";
			if (enemiesTotal && enemiesTotal >= numberOfEnemies) {
				enemiesParent.firstChild.nextSibling.rows[0].cells[0].innerHTML +=
					"/<span style='color:#ADB5B5; font-size:x-small' findme='enemiestotal'>" + enemiesTotal + "</span>";
			}

			//store a list of allies and enemies for use in coloring
			listOfAllies = "";
			if (alliesTable) {
				var newdoc=System.createDocument(alliesTable.innerHTML);
				var allyLinks = System.findNodes("//a[contains(@href,'player_id=')]",newdoc);
				if (allyLinks)
					for (var i=0;i<allyLinks.length;i++) {
						var allyName = allyLinks[i].textContent;
						listOfAllies += allyName + " ";
					}
			}

			listOfEnemies = "";
			if (enemiesTable) {
				var newdoc=System.createDocument(enemiesTable.innerHTML);
				var enermyLinks = System.findNodes("//a[contains(@href,'player_id=')]",newdoc);
				if (enermyLinks)
					for (var i=0;i<enermyLinks.length;i++) {
						var enemyName = enermyLinks[i].textContent;
						listOfEnemies += enemyName + " ";
					}
			}
			GM_setValue("listOfAllies", listOfAllies);
			GM_setValue("listOfEnemies", listOfEnemies);
			
			// quick wear manager link
			var node=System.findNode("//font/a[contains(@href,'cmd=profile&subcmd=dropitems')]");
			if (node) {
				node.parentNode.innerHTML+="| [<a href='/index.php?cmd=notepad&subcmd=quickwear'>Q_Wear</a>]"+
					"| [<a href='/index.php?cmd=profile&subcmd=dropitems&fromworld=1&subcmd2=quickuseman'>Q_Use</a>]";
			}

			// Fast Wear
			var profileInventory = System.findNode("//table[tbody/tr/td/center/a[contains(@href,'subcmd=equipitem') or contains(@href,'subcmd=useitem')]]");

			if (!profileInventory) {
				var profInv = System.findNode("//table[tbody/tr/td/center/a[contains(@href,'subcmd=useitem')]]");
			} else {
				var profInv = profileInventory;
			}
			if (profInv) {
				var bpRows = System.findNodes("//tr[td/center/a]", profInv);
				if (bpRows) // must go for each row so the submit form will not be broken
					for (var i=0;i<bpRows.length;i++) {
						bpRows[i].innerHTML = bpRows[i].innerHTML.replace(/<font size="1">1&nbsp;\/&nbsp;1<\/font>/g, '');
					}
			}

			if (profileInventory) {
				var profileInventoryIDRE = /inventory_id=(\d+)/i;
				var wearableIDRE = /subcmd=equipitem/i;
				var usableIDRE = /subcmd=useitem/i;
				var itemImgRE = /\/([^\/]*)\.gif/i;
				var foldersEnabled = System.findNode("//img[@src='"+System.imageServer+"/folder_on.gif']");
				
				var profileInventoryBox = [];
				var profileInventoryBoxItem = [];
				var profileInventoryBoxID = [];
				var profileInventoryResID = [];
				for (var i=0;i<15;i++) {
					if (foldersEnabled) {
						if (profileInventory.rows[2*Math.floor(i / 5)]) profileInventoryBox[i]=profileInventory.rows[2*Math.floor(i / 5)].cells[i % 5];
					} else {
						if (profileInventory.rows[Math.floor(i / 5)]) profileInventoryBox[i]=profileInventory.rows[Math.floor(i / 5)].cells[i % 5];
					}
					if (profileInventoryBox[i]) profileInventoryBoxItem[i] = profileInventoryBox[i].firstChild;
					if (profileInventoryBoxItem[i] && profileInventoryBoxItem[i].firstChild) {
						var itemHREF = profileInventoryBoxItem[i].firstChild.getAttribute("href");
						if (itemHREF && profileInventoryIDRE(itemHREF)) {
							if (wearableIDRE(itemHREF)) profileInventoryBoxID[i] = profileInventoryIDRE(itemHREF)[1];
							if (usableIDRE(itemHREF)) {
								profileInventoryBoxID[i] = profileInventoryIDRE(itemHREF)[1];
								profileInventoryResID[i] = itemImgRE(profileInventoryBoxItem[i].firstChild.firstChild.getAttribute("src"))[1];
							}
						}
						if (itemHREF) var itemsCount = i;
					}
				}

				var newRow;

				for (var i=0;i<=itemsCount;i++) {
					if ((i % 5==0) && profileInventoryBoxItem[i] && !foldersEnabled) newRow = profileInventory.insertRow(2*Math.floor(i / 5)+1);
					if ((i % 5==0) && profileInventoryBoxItem[i] && foldersEnabled) newRow = profileInventory.insertRow(3*Math.floor(i / 5)+1);
					var newCell = newRow.insertCell(i % 5);
					if (profileInventoryBoxItem[i] && profileInventoryBoxID[i] && !profileInventoryResID[i]) {
						var output = '<span style="cursor:pointer; text-decoration:underline; color:#D4FAFF; font-size:x-small;" '+
								'id="Helper:equipProfileInventoryItem' + profileInventoryBoxID[i] + '" ' +
								'itemID="' + profileInventoryBoxID[i] + '">Wear</span>';
						newCell.align = 'center';
						newCell.innerHTML = output;
						document.getElementById('Helper:equipProfileInventoryItem' + profileInventoryBoxID[i])
							.addEventListener('click', Helper.equipProfileInventoryItem, true);
					} else if (profileInventoryBoxItem[i] && profileInventoryBoxID[i] && profileInventoryResID[i]){
						var output = '<span style="cursor:pointer; color:#D4FAFF; font-size:xx-small;">'+
								'<span id="Helper:selectAllProfileInventoryItem' + profileInventoryBoxID[i] + '" ' +
								'itemID="' + profileInventoryResID[i] + '" onmouseover="Tip(\'Select all items of the same type\')">S</span> | '+
								'<span id="Helper:useProfileInventoryItem' + profileInventoryBoxID[i] + '" ' +
								'itemID="' + profileInventoryBoxID[i] + '" onmouseover="Tip(\'Use item / Extract resource (with your confirmation)\')">U</span></span>';
						newCell.align = 'center';
						newCell.innerHTML = output;
						document.getElementById('Helper:selectAllProfileInventoryItem' + profileInventoryBoxID[i])
							.addEventListener('click', Helper.selectAllProfileInventoryItem, true);
						document.getElementById('Helper:useProfileInventoryItem' + profileInventoryBoxID[i])
							.addEventListener('click', Helper.useProfileInventoryItem, true);
					}
				}
			}
			
			doc = System.findNode("//html");
			Helper.parseProfileForWorld(doc.innerHTML, true);
		}

		//bio compressor ...
		var bioCompressorEnabled = GM_getValue("enableBioCompressor");
		if (bioCompressorEnabled) {
			var bioCell = System.findNode("//td[contains(@background, '/inventory/biography_head.jpg')]/../following-sibling::tr[1]/td/table/tbody/tr/td[2]");
			if (bioCell) { //non-self profile
				var bioContents = bioCell.innerHTML;
				var maxCharactersToShow = GM_getValue("maxCompressedCharacters");
				var maxRowsToShow = GM_getValue("maxCompressedLines");
				var numberOfLines = bioContents.substr(0,maxCharactersToShow).split(/<br>\n/).length - 1;
				if (numberOfLines >= maxRowsToShow) {
					var startIndex = 0;
					while (maxRowsToShow >= 0) {
						maxRowsToShow --;
						startIndex = bioContents.indexOf("<br>\n",startIndex+1);
					}
					maxCharactersToShow = startIndex;
				}
				if (bioContents.length>maxCharactersToShow) {
					//find the end of next HTML tag after the max characters to show.
					var breakPoint = bioContents.indexOf(">",maxCharactersToShow) + 1;
					var bioStart = bioContents.substring(0,breakPoint);
					var bioEnd = bioContents.substring(breakPoint,bioContents.length);
					var extraOpenHTML = "", extraCloseHTML = "";
					var boldCloseTagIndex = bioEnd.indexOf("</b>");
					var boldOpenTagIndex = bioEnd.indexOf("<b>");
					if (boldCloseTagIndex != -1 && boldOpenTagIndex > boldCloseTagIndex) {
						extraOpenHTML += "<b>";
						extraCloseHTML += "</b>";
					}
					var italicsCloseTagIndex = bioEnd.indexOf("</i>");
					var italicsOpenTagIndex = bioEnd.indexOf("<i>");
					if (italicsCloseTagIndex != -1 && italicsOpenTagIndex > italicsCloseTagIndex) {
						extraOpenHTML += "<i>";
						extraCloseHTML += "</i>";
					}
					var underlineCloseTagIndex = bioEnd.indexOf("</u>");
					var underlineOpenTagIndex = bioEnd.indexOf("<u>");
					if (underlineCloseTagIndex != -1 && underlineOpenTagIndex > underlineCloseTagIndex) {
						extraOpenHTML += "<u>";
						extraCloseHTML += "</u>";
					}
					bioCell.innerHTML = bioStart + extraCloseHTML + "<span id='Helper:bioExpander' style='cursor:pointer; text-decoration:underline; color:cyan;'>More ...</span>" +
						"<span id='Helper:bioHidden' style='display:none; visibility:hidden;'>" + extraOpenHTML + bioEnd + "</span>";
					document.getElementById('Helper:bioExpander').addEventListener('click', Helper.expandBio, true);
				}
			}
		}
	},

	expandBio: function(evt) {
		var bioExpander = document.getElementById('Helper:bioExpander');
		bioExpander.style.display = 'none';
		bioExpander.style.visibility = 'hidden';
		var bioHidden = document.getElementById('Helper:bioHidden');
		bioHidden.style.display = 'block';
		bioHidden.style.visibility = 'visible';
	},

	equipProfileInventoryItem: function(evt) {
		var InventoryItemID=evt.target.getAttribute("itemID");
		System.xmlhttp("index.php?cmd=profile&subcmd=equipitem&inventory_id=" + InventoryItemID,
			Helper.equipProfileInventoryItemReturnMessage,
			{"item": InventoryItemID, "target": evt.target});
	},
	
	selectAllProfileInventoryItem: function(evt) {
		var imgID=evt.target.getAttribute("itemID");
		var nodes = System.findNodes("//td/center/a[img[contains(@src,'/"+imgID+".gif')]]");
		if (nodes && nodes.length > 0){
			var profileInventoryIDRE = /inventory_id=(\d+)/i;
			for (var i=0; i<nodes.length; i++) {
				itemId = profileInventoryIDRE(nodes[i].getAttribute("href"))[1];
				var ckbNode = System.findNode("//input[@type='checkbox' and @value='"+itemId+"']");
				if (ckbNode) ckbNode.checked = ! ckbNode.checked;
			}
		}
	},
	
	useProfileInventoryItem: function(evt) {
		if (!window.confirm("Are you sure you want to use/extract the item?")) return;
		var InventoryItemID=evt.target.getAttribute("itemID");
		System.xmlhttp("index.php?cmd=profile&subcmd=useitem&inventory_id=" + InventoryItemID,
			function(responseText) {
				var info = Layout.infoBox(responseText);
				if (!info) info = "<font color=red>Error</font>";
				evt.target.parentNode.innerHTML = info;
			});
	},

	equipProfileInventoryItemReturnMessage: function(responseText, callback) {
		var itemID = callback.item;
		var target = callback.target;
		var info = Layout.infoBox(responseText);
		var itemCellElement = target.parentNode; //System.findNode("//td[@title='" + itemID + "']");
		if (!info) {
			itemCellElement.innerHTML = "<span style='color:green; font-weight:bold;'>Worn</span>";
		} else {
			if (info.match(/You require at least 0 point/)) info=' Not appropriate action';
			itemCellElement.innerHTML = "<span style='color:red; font-weight:bold;'>Error:" + info + "</span>";
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
			'<tr><td colspan="2" nobr bgcolor="#212323" align="center"><b>&nbsp;Trade Hub Quick Search</b></td></tr>'+
			'<tr><td>This screen allows you to set up some quick search templates for the Trade Hub. '+
				'The Display on TH column indicates if the quick search will show on the short list on the '+
				'Trade Hub main screen. A maximum of 20 items can show on this list '+
				'(It will not show more than 20even if you have more than 20 flagged). '+
				'To edit items, either use the large text area below, '+
				'or add a new entry and delete the old one. You can always reset the list to the default values.</td></tr>'+
			'</table>' +
			'<div style="font-size:small;" id="Helper:Auction Search Output">' +
			'</div>';
		var injectHere = document.getElementById('Helper:Auction Search Output');
		var quickSearchList = System.getValueJSON("quickSearchList");
		var currentCategory = "";
		var output = "<table  cellspacing='0' cellpadding='0' border='0' width='100%'><tbody>";
		output += "<tr bgcolor='#212323'><th></th><th>Nickname</th><th>Quick Search Text</th><th>Display on TH?</th><th>Delete?</th></tr>";
		for (j=0; j<quickSearchList.length; j++) {
			var quickSearchItem=quickSearchList[j];
			if (quickSearchItem) {
				if (currentCategory != quickSearchItem.category)
					output += "<tr><td colspan=5><span style='font-weight:bold; font-size:large;'>" + quickSearchItem.category + "</span></td></tr>";
				output += "<tr><td width='10'></td>"+
					"<td><a href='" + System.server +
					"index.php?cmd=auctionhouse&type=-1&search_text=" +
					quickSearchItem.searchname + "&page=1&order_by=1' title='" +
					quickSearchItem.searchname + "'><span style='cursor:pointer; text-decoration:underline; color:#CCFF99;'>" +
					((quickSearchItem.nickname)? quickSearchItem.nickname:"") + "</span></a></td>" +
					"<td><a href='" + System.server +
					"index.php?cmd=auctionhouse&type=-1&search_text=" +
					quickSearchItem.searchname + "&page=1&order_by=1' title='" +
					quickSearchItem.searchname + "'><span style='cursor:pointer; text-decoration:underline; color:#CCFF99;'>" +
					quickSearchItem.searchname + "</span></a></td>" +
					"<td><span style='color:#CCFF99;'>"+(quickSearchItem.displayOnAH?"True":"False")+"</span></td>" +
					"<td>[<span style='cursor:pointer; text-decoration:underline; color:#CCFF99;' id='Helper:delAuctionSearch"+j+"' auctionSearchId="+j+">"+
						"del</span>]</td></tr>";
				currentCategory = quickSearchItem.category;
			}
		}
		output += "<tr><td colspan=5 height=10></td></tr>";
		output += "<tr><td colspan=5>"+
				"<table cellspacing='0' cellpadding='0' border='0' width='100%'><tbody>"+
				"<tr><th>Category</th><th>Nickname</th><th>Search Name</th><th>Display on AH?</th><th></th></tr>"+
				"<tr align='right'>"+
					"<td><input type='text' class='custominput' size='14' id='Helper:category'/></td>"+
					"<td><input type='text' class='custominput' size='8' id='Helper:nickname'/></td>"+
					"<td><input type='text' class='custominput' size='40' id='Helper:searchname'/></td>"+
					"<td align='center'><input type='checkbox' class='custominput' id='Helper:displayOnAH'/></td>"+
					"<td>[<span style='cursor:pointer; text-decoration:underline; color:blue;' id='Helper:addAuctionSearch'>"+
						"add</span>]</td>"+
				"</tr></tbody></table>"+
			"</td></tr>";
		output += "<tr><td colspan=5 align=center><textarea cols=70 rows=20 name='auctionsearch'>" + JSON.stringify(quickSearchList) + "</textarea></td></tr>";
		output += "<tr><td colspan=5 align=center><input id='Helper:saveauctionsearch' type='button' value='Save' class='custombutton'>"+
					"&nbsp;<input id='Helper:resetauctionsearch' type='button' value='Reset' class='custombutton'></td></tr>";
		output += "</tbody></table>";
		injectHere.innerHTML = output;
		for (j=0; j<quickSearchList.length; j++) {
			document.getElementById("Helper:delAuctionSearch"+j).addEventListener('click', Helper.delAuctionSearch, true);
		}
		document.getElementById("Helper:addAuctionSearch").addEventListener('click', Helper.addAuctionSearch, true);
		document.getElementById("Helper:saveauctionsearch").addEventListener('click', Helper.saveAuctionSearch, true);
		document.getElementById("Helper:resetauctionsearch").addEventListener('click', Helper.resetAuctionSearch, true);
	},

	addAuctionSearch: function(evt) {
		var nickname = document.getElementById("Helper:nickname").value;
		var searchname = document.getElementById("Helper:searchname").value;
		var category = document.getElementById("Helper:category").value;
		var displayOnAH = document.getElementById("Helper:displayOnAH").checked;
		if (!nickname || !searchname || !category) return;
		var quickSearchList = System.getValueJSON("quickSearchList");
		var theSearch = new Object;
		theSearch.nickname = nickname;
		theSearch.searchname = searchname;
		theSearch.category = category;
		theSearch.displayOnAH = displayOnAH;
		quickSearchList.push(theSearch);
		Helper.sortAsc=true;
		Helper.sortBy="category";
		quickSearchList.sort(Helper.stringSort);
		System.setValueJSON("quickSearchList", quickSearchList);
		window.location=window.location;
	},

	delAuctionSearch: function(evt) {
		var auctionSearchId = evt.target.getAttribute("auctionSearchId");
		var quickSearchList = System.getValueJSON("quickSearchList");
		quickSearchList.splice(auctionSearchId,1);
		Helper.sortAsc=true;
		Helper.sortBy="category";
		quickSearchList.sort(Helper.stringSort);
		System.setValueJSON("quickSearchList", quickSearchList);
		window.location = window.location;
	},

	saveAuctionSearch: function(evt) {
		auctionsearchtextarea = System.findNode("//textarea[@name='auctionsearch']");
		var quickSearchList = JSON.parse(auctionsearchtextarea.value);
		Helper.sortAsc=true;
		Helper.sortBy="category";
		quickSearchList.sort(Helper.stringSort);
		System.setValueJSON("quickSearchList", quickSearchList);
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
		var reParams =/(\d+),\s*(-?\d+),\s*(\d+),\s*(\d+),\s*\'([a-z0-9]*)\'/i;
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
		var newhtml='<table cellspacing="0" cellpadding="0" border="0" width="100%"><tr style="background-color:#110011">'+
			'<td width="90%" nobr><b>&nbsp;Inventory Manager</b> green = worn, blue = backpack, cyan = Faction Locked</td>'+
			'<td width="10%" nobr style="font-size:x-small;text-align:right">[<span id="Helper:InventoryManagerRefresh" style="text-decoration:underline;cursor:pointer">Refresh</span>]</td>'+
			'<tr><td colspan=2>' +
			'<table><tr><td><b>Show Items:</b></td>' +
			'<td><table><tr><td>&nbsp;Only Useable:<input id="showUseableItems" type="checkbox" linkto="showUseableItems"' +
			(GM_getValue("showUseableItems")?' checked':'') + '/>';
		for (var i=0; i<Helper.itemFilters.length; i++) {
			newhtml += (i % 3 ==0) ? '</td></tr><tr><td>' : '';
			newhtml+='&nbsp;' +Helper.itemFilters[i].type+ 's:<input id="'+Helper.itemFilters[i].id+'" type="checkbox" linkto="'+Helper.itemFilters[i].id+'"' +
					(GM_getValue(Helper.itemFilters[i].id)?' checked':'') + '/>';
		}
		newhtml+='</td></tr><tr><td>&nbsp;<span id=GuildInventorySelectAll>[Select All]</span>&nbsp;<span id=GuildInventorySelectNone>[Select None]</span>' +
				'</td></tr></table></td></tr></table>' +
				'<div style="font-size:small;" id="Helper:InventoryManagerOutput">' +
				'</div>';
		content.innerHTML=newhtml;
		document.getElementById("Helper:InventoryManagerRefresh").addEventListener('click', Helper.parseProfileStart, true);
		Helper.generateInventoryTable("self");
		document.getElementById("showUseableItems").addEventListener('click', Helper.toggleCheckboxAndRefresh, true);
		for (var i=0; i<Helper.itemFilters.length; i++) {
			document.getElementById(Helper.itemFilters[i].id).addEventListener('click', Helper.toggleCheckboxAndRefresh, true);
		}
		document.getElementById("GuildInventorySelectAll").addEventListener('click', Helper.InventorySelectFilters, true);
		document.getElementById("GuildInventorySelectNone").addEventListener('click', Helper.InventorySelectFilters, true);
	},

	injectGuildInventoryManager: function() {
		var content=Layout.notebookContent();
		var guildItemCount = "unknown"
		unsafeWindow.changeMenu(0,'menu_character');
		unsafeWindow.changeMenu(5,'menu_guild');
		unsafeWindow.changeMenu(0,'menu_character');
		// I don't know why changeMenu(0) needs to be called twice, but it seems it does...
		Helper.guildinventory=System.getValueJSON("guildinventory");
		if (Helper.guildinventory) {
			Helper.guildinventory.items = Helper.guildinventory.items.filter(function (e) {return (e.name)});
			guildItemCount = Helper.guildinventory.items.length;
		}

		var newhtml='<table cellspacing="0" cellpadding="0" border="0" width="100%"><tr style="background-color:#110011">'+
			'<td width="90%" nobr><b>&nbsp;Faction Inventory Manager</b> (takes a while to refresh so only do it if you really need to)</td>'+
			'<td width="10%" nobr style="font-size:x-small;text-align:right">[<span id="Helper:GuildInventoryManagerRefresh" style="text-decoration:underline;cursor:pointer">Refresh</span>]</td>'+
			'</tr>' +
			'<tr><td colspan=2>' +
				'<table><tr><td><b>Show Items:</b></td>' +
				'<td><table><tr><td>&nbsp;Only Useable:<input id="showUseableItems" type="checkbox" linkto="showUseableItems"' +
				(GM_getValue("showUseableItems")?' checked':'') + '/>';
		for (var i=0; i<Helper.itemFilters.length; i++) {
			newhtml += (i % 3 ==0) ? '</td></tr><tr><td>' : '';
			newhtml+='&nbsp;' +Helper.itemFilters[i].type+ 's:<input id="'+Helper.itemFilters[i].id+'" type="checkbox" linkto="'+Helper.itemFilters[i].id+'"' +
					(GM_getValue(Helper.itemFilters[i].id)?' checked':'') + '/>';
		}
		newhtml+='</td></tr><tr><td>&nbsp;<span id=GuildInventorySelectAll>[Select All]</span>&nbsp;<span id=GuildInventorySelectNone>[Select None]</span>' +
				'</td></tr><tr><td>&nbsp;Max lvl: <input id=maxLvl class=custominput size=1 value='+GM_getValue("invMaxLvlFilter")+'>'+
				'&nbsp;<input id=maxLvlSave type=button class=custombutton value="Save">'+
				'</td></tr></table></td></tr>'+
			'<tr><td colspan=2>&nbsp;Faction Item Count:&nbsp;' + guildItemCount + '</td></tr></table>' +
			'<div style="font-size:small;" id="Helper:GuildInventoryManagerOutput">' +
			'</div>';
		content.innerHTML=newhtml;
		document.getElementById("Helper:GuildInventoryManagerRefresh").addEventListener('click', Helper.parseGuildStart, true);
		Helper.generateInventoryTable("guild");
		document.getElementById("showUseableItems").addEventListener('click', Helper.toggleCheckboxAndRefresh, true);
		for (var i=0; i<Helper.itemFilters.length; i++) {
			document.getElementById(Helper.itemFilters[i].id).addEventListener('click', Helper.toggleCheckboxAndRefresh, true);
		}
		document.getElementById("GuildInventorySelectAll").addEventListener('click', Helper.InventorySelectFilters, true);
		document.getElementById("GuildInventorySelectNone").addEventListener('click', Helper.InventorySelectFilters, true);
		document.getElementById("maxLvlSave").addEventListener('click', function() {
				GM_setValue("invMaxLvlFilter", document.getElementById("maxLvl").value);
				window.location=window.location;
			}, true);
	},

	InventorySelectFilters: function(evt) {
		var checkedValue = (evt.target.id=="GuildInventorySelectAll");
		for (var i=0; i<Helper.itemFilters.length; i++) {
			GM_setValue(Helper.itemFilters[i].id, checkedValue);
		}
		if (checkedValue)
			window.location=window.location;
		else
			for (var i=0; i<Helper.itemFilters.length; i++) {
				document.getElementById(Helper.itemFilters[i].id).checked = checkedValue;
			}
	},

	toggleCheckboxAndRefresh: function(evt) {
		GM_setValue(evt.target.id, evt.target.checked);
		window.location=window.location;
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
		Helper.sortOnlinePlayersTable();
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
		var playerRows = System.findNodes("//table/tbody/tr[count(td)=3 and td[1]/a]", doc);
		var tables=System.findNodes("//table");
		var maxPage = parseInt(System.findNode("//table//td[input[@name='page']]", doc).textContent.replace(/\D/g, ""));
		output.innerHTML+=callback.page + " ";
		if (playerRows)
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
			System.setValueJSON("onlinePlayers", Helper.onlinePlayers);
			Helper.sortOnlinePlayersTable();
			Helper.generateOnlinePlayersTable();
		}
	},

	generateOnlinePlayersTable: function() {
		if (!Helper.onlinePlayers) return;
		var minLvl = GM_getValue("onlinePlayerMinLvl", 1);
		var maxLvl = GM_getValue("onlinePlayerMaxLvl", 1000);
		var output=document.getElementById("Helper:OnlinePlayersOutput");
		var result=
			'<div align=right><form id=Helper:onlinePlayerFilterForm>' +
			'Min lvl:<input value="' + minLvl + '" size=5 name="Helper.onlinePlayerMinLvl" id="Helper.onlinePlayerMinLvl" style=custominput/> ' +
			'Max lvl:<input value="' + maxLvl + '" size=5 name="Helper.onlinePlayerMaxLvl" id="Helper.onlinePlayerMaxLvl" style=custominput/> ' +
			'<input id="Helper:onlinePlayerFilter" class="custombutton" type="submit" value="Filter"/>' +
			'<input id="Helper:onlinePlayerFilterReset" class="custombutton" type="button" value="Reset"/></form></div>' +
			'<table id="Helper:OnlinePlayersTable"><tr>' +
			'<th align="left" sortkey="guildId" sortType="number">Index</th>' +
			'<th sortkey="name">Name</th>' +
			'<th sortkey="level" sortType="number">Level</th></tr>';
		var player, color;
		for (var i=0; i<Helper.onlinePlayers.players.length;i++) {
			player=Helper.onlinePlayers.players[i];
			if (player.level >= minLvl && player.level <= maxLvl)
				result+='<tr class="HelperTableRow' + (1 + i % 2) +'">' +
					'<td>' + player.guildId + '</td>'+
					'<td><a href="index.php?cmd=profile&player_id='+player.id+'">'+ player.name+'</a></td>' +
					'<td align="right">' + player.level + '</td>' +
					'</tr>';
		}
		result+='</table>';
		output.innerHTML=result;

		// document.getElementById("Helper:onlinePlayerFilter").addEventListener('click', Helper.setOnlinePlayerFilter, true);
		document.getElementById("Helper:onlinePlayerFilterReset").addEventListener('click', Helper.resetOnlinePlayerFilter, true);
		document.getElementById("Helper:onlinePlayerFilterForm").addEventListener('submit', Helper.setOnlinePlayerFilter, true);

		var theTable=document.getElementById('Helper:OnlinePlayersTable');
		for (var i=0; i<theTable.rows[0].cells.length; i++) {
			var cell=theTable.rows[0].cells[i];
			cell.style.textDecoration="underline";
			cell.style.cursor="pointer";
			cell.addEventListener('click', Helper.sortOnlinePlayersTable, true);
		}
	},

	setOnlinePlayerFilter: function() {
		var onlinePlayerMinLvl = document.getElementById("Helper.onlinePlayerMinLvl");
		var onlinePlayerMaxLvl = document.getElementById("Helper.onlinePlayerMaxLvl");
		if (onlinePlayerMinLvl.value == '') onlinePlayerMinLvl.value = '0';
		if (onlinePlayerMaxLvl.value == '') onlinePlayerMaxLvl.value = '1000';
		if (!isNaN(onlinePlayerMinLvl.value))
			GM_setValue("onlinePlayerMinLvl", parseInt(onlinePlayerMinLvl.value));
		if (!isNaN(onlinePlayerMaxLvl.value))
			GM_setValue("onlinePlayerMaxLvl", parseInt(onlinePlayerMaxLvl.value));
		Helper.generateOnlinePlayersTable();
	},

	resetOnlinePlayerFilter: function() {
		GM_setValue("onlinePlayerMinLvl", 1);
		GM_setValue("onlinePlayerMaxLvl", 1000);
		Helper.generateOnlinePlayersTable();
	},

	sortOnlinePlayersTable: function(evt) {
		Helper.onlinePlayers=System.getValueJSON("onlinePlayers");
		if (!evt) {
			var sortCriteria = System.getValueJSON("onlinePlayerSortBy");
			if (!sortCriteria) return;
			var sortType = sortCriteria["sortType"];
			Helper.sortBy = sortCriteria["sortBy"];
			Helper.sortAsc = sortCriteria["sortAsc"];
		} else {
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
		}
		System.setValueJSON("onlinePlayerSortBy", {"sortBy": Helper.sortBy, "sortType": sortType, "sortAsc": Helper.sortAsc});

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

	parseProfileStart: function(){
		Helper.inventory = new Object;
		Helper.inventory.items = new Array();
		Helper.inventoryMap={};
		var output=document.getElementById('Helper:InventoryManagerOutput')
		output.innerHTML='<br/>Parsing profile...';
		System.xmlhttp('index.php?cmd=profile', Helper.parseProfileDone)
	},

	parseProfileDone: function(responseText) {
		var doc=System.createDocument(responseText);
		var output=document.getElementById('Helper:InventoryManagerOutput');
		var currentlyWorn=System.findNodes("//a[contains(@href,'subcmd=unequipitem') and contains(img/@src,'/items/')]/img", doc);
		for (var i=0; i<currentlyWorn.length; i++) {
			var mouseOver=currentlyWorn[i].getAttribute("onmouseover");
			var theUrl=Helper.linkFromMouseover(mouseOver);
			var id=/(\d+),\s*(\d+),\s*(\d+),\s*(\d+)/.exec(mouseOver)[2];
			var item={"url": theUrl,
				"where":"worn", "index":(i+1),
				"onmouseover":mouseOver};
			if (i==0) output.innerHTML+="<br/>Found worn item "
			output.innerHTML+=(i+1) + " ";
			Helper.inventory.items.push(item);
			Helper.inventoryMap['id'+id]=item;
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
		var backpackItems = System.findNodes("//td[@width='45' and @height='45']/center/a[contains(@href, 'subcmd=equipitem')]/img", doc);
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
				var mouseOver=backpackItems[i].getAttribute("onmouseover");
				var theUrl=Helper.linkFromMouseover(mouseOver);
				var id=/(\d+),\s*(\d+),\s*(\d+),\s*(\d+)/.exec(mouseOver)[2];
				var item={"url": theUrl,
					"where":"backpack", "index":(i+1), "page":currentPage,
					"onmouseover":mouseOver};
				if (i==0) output.innerHTML+="<br/>Found wearable item "
				output.innerHTML+=(i+1) + " ";
				Helper.inventory.items.push(item);
				Helper.inventoryMap['id'+id]=item;
			}
		} else {
			output.innerHTML+='<br/>Parsing folder '+currentFolder+', backpack page '+currentPage+'... Empty';
		}
		if ((pages && currentPage<pages.length) || currentFolder<folderCount) {
			if (((pages && currentPage==pages.length) || !pages) && currentFolder<folderCount) {
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
		output.innerHTML = '<br/>Parsing guild store ...';
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
					"where":"guildstore", "index":(i+1), "page":currentPage, "worn":false,
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
					"where":"guildreport", "index":(i+1), "worn":false,
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

		var item=targetInventory.items[callback.invIndex];
		// item.html=responseText;

		var nameNode=System.findNode("//b", doc);
		if (!nameNode) GM_log(responseText);
		if (nameNode) {
			item.name=nameNode.textContent.replace(/\\/g,"");

			item.class=nameNode.parentNode.nextSibling.nextSibling.textContent.match(/- (.*) -/);
			if (item.class)
				item.class = item.class[1];
			else {
				item.class=nameNode.parentNode.nextSibling.nextSibling.textContent.match(/- (.*)$/);
				if (item.class)
					item.class = item.class[1];
				else
					item.class = "";
			}

			var attackNode=System.findNode("//tr/td[.='Attack:']/../td[2]", doc);
			item.attack=(attackNode)?parseInt(attackNode.textContent):0;

			var defenseNode=System.findNode("//tr/td[.='Defense:']/../td[2]", doc);
			item.defense=(defenseNode)?parseInt(defenseNode.textContent):0;

			var armorNode=System.findNode("//tr/td[.='Armor:']/../td[2]", doc);
			item.armor=(armorNode)?parseInt(armorNode.textContent):0;

			var damageNode=System.findNode("//tr/td[.='Damage:']/../td[2]", doc);
			item.damage=(damageNode)?parseInt(damageNode.textContent):0;

			var hpNode=System.findNode("//tr/td[.='HP:']/../td[2]", doc);
			item.hp=(hpNode)?parseInt(hpNode.textContent):0;

			var levelNode=System.findNode("//tr[td='Min Level:']/td[2]", doc);
			item.minLevel=(levelNode)?parseInt(levelNode.textContent):0;

			var forgeCount=0, re=/hellforge\/forgelevel.gif/ig;
			while(re.exec(responseText)) {
				forgeCount++;
			}
			item.forgelevel=forgeCount;

			var typeNode=System.findNode("//font[@size='1' and @color='yellow']", doc);
			item.type = (typeNode)?typeNode.textContent:"???";

			var craft="";
			if (responseText.search(/Uncrafted|Very Poor|Poor|Average|Good|Very Good|Excellent|Perfect/) != -1){
				var fontLineRE=/<\/b><\/font><br>([^<]+)<font color='(#[0-9A-F]{6})'>([^<]+)<\/font>/
				var fontLineRX=fontLineRE.exec(responseText)
				craft = fontLineRX[3];
			}
			item.craftlevel=craft;
			
			var Locked = "";
			if (responseText.search(/Faction Locked:/) != -1){
				Locked = "Yes";
			}
			item.factionLocked=Locked;
		
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
		targetInventory.items = targetInventory.items.filter(function (e) {return (e.name)});

		var output=document.getElementById(targetId);
		var result='<table id="Helper:InventoryTable"><tr>' +
			'<th width="180" align="left" colspan="2" sortkey="name">Name</th>' +
			'<th sortkey="minLevel">Level</th>' +
			'<th sortkey="where">Where</th>' +
			'<th sortkey="class">Class</th>' +
			'<th sortkey="type">Type</th>' +
			'<th sortkey="attack">Att</th>' +
			'<th sortkey="defense">Def</th>' +
			'<th sortkey="armor">Arm</th>' +
			'<th sortkey="damage">Dam</th>' +
			'<th sortkey="hp">HP</th>' +
			'<th sortkey="forgelevel" colspan="2">Upgrade</th>' +
			'<th sortkey="craftlevel">Craft</th>' +
			'<th sortkey="factionLocked">Faction Locked</th>' +
			'<th width="10"></th>';
		var item, color;
		var showUseableItems = GM_getValue("showUseableItems");
		var allItems = targetInventory.items;
		if (showUseableItems) {
			Helper.itemClasses = {"Clone":"Core", "Mutant":"Rad", "Soldier":"Battlesuit", "Purist":"Psi", "Cyborg":"Hardwired"};
			allItems=allItems.filter(function(e,i,a) {
				return e.minLevel <= Helper.characterLevel &&
					(e.class == "Core" || e.class == Helper.itemClasses[Helper.characterClass])
				});
			//  && e.minLevel + 50 > Helper.characterLevel}
		}
		Helper.maxLvlFilter=GM_getValue("invMaxLvlFilter");
		if (Helper.maxLvlFilter!='') {
			Helper.maxLvlFilter=parseInt(Helper.maxLvlFilter);
			if (Helper.maxLvlFilter>0){
				allItems=allItems.filter(function(e,i,a) {return e.minLevel <= Helper.maxLvlFilter;});
			}
		}

		for (var i=0; i<Helper.itemFilters.length; i++) {
			if (!GM_getValue(Helper.itemFilters[i].id)) {
				Helper.invFilterType = Helper.itemFilters[i].type;
				allItems=allItems.filter(function(e,i,a) {return e.type != Helper.invFilterType;});
			}
		}

		for (var i=0; i<allItems.length;i++) {
			item=allItems[i];

			switch (item.where+"") {
				case "worn":        color = "green";  whereText = "Worn"; whereTitle="Wearing it";     break;
				case "backpack":    color = "#D4FAFF";   whereText = "BP";   whereTitle="In Backpack";    break;
				case "guildstore":  color = "lime";   whereText = "FS";   whereTitle="Faction Store";  break;
				case "guildreport": color = "yellow"; whereText = "Rep";  whereTitle="Faction Report"; break;
				default: color = "#84ADAC";
			}

			
			result+='<tr style="color:'+ color +'">' +
				'<td>' + '<img src="' + System.imageServer + '/temple/1.gif" onmouseover="' + item.onmouseover + '">' +
				'</td><td><a href="/index.php?cmd=guild&subcmd=inventory&subcmd2=report&item=' + item.name + '">' + item.name + '</a>'+
					' (<a href="/index.php?cmd=guild&subcmd=inventory&subcmd2=report&set=' + item.name + '">set</a>)'+
					'</td>' +
				'<td align="right">' + item.minLevel + '</td>' +
				'<td align="right" title="' + whereTitle + '">' + whereText + '</td>' +
				'<td align="right">' + item.class + '</td>' +
				'<td align="right">' + item.type + '</td>' +
				'<td align="right">' + item.attack + '</td>' +
				'<td align="right">' + item.defense + '</td>' +
				'<td align="right">' + item.armor + '</td>' +
				'<td align="right">' + item.damage + '</td>' +
				'<td align="right">' + item.hp + '</td>' +
				'<td align="right">' + item.forgelevel + '</td>' +
				'<td>' + ((item.forgelevel>0)? "<img src='" + System.imageServer + "/hellforge/forgelevel.gif'>":"") + '</td>' +
					'<td align="right">' + item.craftlevel + '</td>' +
				'<td align="right"><font color="cyan">' + item.factionLocked + '</font></td>' +
				'<td></td>' +
				'</tr>';
		}
		result+='</table>';
		output.innerHTML=result;

		targetInventory.lastUpdate = new Date();
		System.setValueJSON(inventoryShell, targetInventory);
		if (Helper.inventoryMap)
			System.setValueJSON('inventoryMap', Helper.inventoryMap);

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
		recipe.items = Helper.parseRecipeItemOrComponent("//tbody/tr[10]//td[contains(@style,'background-color: rgb(13, 9, 5);')]", doc);
		recipe.components  = Helper.parseRecipeItemOrComponent("//td[contains(@background,'1x1mini.gif')]", doc);
		recipe.target = Helper.parseRecipeItemOrComponent("//tbody/tr[19]/td/table/tbody/tr/td[contains(@style,'background-color: rgb(13, 9, 5);')]", doc)[0]

		var nextRecipeIndex = currentRecipeIndex+1;
		if (nextRecipeIndex<Helper.recipebook.recipe.length) {
			var nextRecipe = Helper.recipebook.recipe[nextRecipeIndex];
			System.xmlhttp('index.php?cmd=inventing&subcmd=viewrecipe&recipe_id=' + nextRecipe.id, Helper.parseRecipePage, {"recipeIndex": nextRecipeIndex});
		}
		else {
			output.innerHTML+='Finished parsing ... formatting ...';
			Helper.recipebook.lastUpdate = new Date();
			System.setValueJSON("recipebook", Helper.recipebook);
			Helper.generateRecipeTable();
		}
	},

	generateRecipeTable: function() {
		var output=document.getElementById('Helper:RecipeManagerOutput');
		var filterRecipe = System.getValueJSON("recipeFilter");
		Helper.ItemTypes = ["Ammo", "Body Armor", "Helmet", "Helmet Add-On", "Leg Armor", "Mission Item", "Weapon", "Weapon Add-On"]

		if (!filterRecipe) filterRecipe={
			minLevel:0,
			maxLevel:999,
			types: Helper.ItemTypes,
			useLevel: false,
			useType: false
		}

		var result='<table id="Helper:RecipeTable"><tr>' +
			'<th align="left" sortkey="name">Name</th>' +
			'<th align="left" sortkey="level" sorttype="number">Level <span id="Helper:FilterLevel" style="text-decoration:underline;cursor:pointer">&#x00bb;</span>'+
			'<table border=0 cellspacing=0 celpadding=0 id="Helper:LevelFilter" style="visibility:hidden;display:none;text-size:xx-small">'+
			'<tr><td>Use level filter <input type=checkbox size=1 class=custominput id="Helper:UseLevelFilter" value="yes"'+(filterRecipe.useLevel?' checked':'')+'></td></tr>' +
			'<tr><td>From</td><td><input type=text size=1 class=custominput id="Helper:LevelFilterMin" value="'+ filterRecipe.minLevel +'"></td></tr>'+
			'<tr><td>To</td><td><input type=text size=1 class=custominput id="Helper:LevelFilterMax" value="'+ filterRecipe.maxLevel +'"></td></tr>' +
			'<tr><td><input type=button class=custombutton  id="Helper:LevelFilterOk" value=Ok></td></tr>'+
			'</table></th>' +
			'<th align="left" sortkey="type">Type <span id="Helper:FilterType" style="text-decoration:underline;cursor:pointer">&#x00bb;</span>'+
			'<table border=0 cellspacing=0 celpadding=0 id="Helper:TypeFilter" style="visibility:hidden;display:none;text-size:xx-small;">'+
			'<tr><td>Use type filter <input type=checkbox size=1 class=custominput id="Helper:UseTypeFilter" value="yes"'+(filterRecipe.useType?' checked':'')+'></td></tr>'
		for (var i=0;i<Helper.ItemTypes.length;i++) {
			var typ=Helper.ItemTypes[i];
			result +=
				'<tr><td><input type=checkbox id="Helper:TypeFilter:' + typ.replace(/\s\-/ig,"") + '"class=custominput' +
				((filterRecipe.types.indexOf(typ)>=0)?' checked':'') + '> ' + typ + '</td></tr>'
		}
		result +=
			'<tr><td><input type=button class=custombutton id="Helper:TypeFilterOk" value=Ok></td></tr>'+
			'</table></th>' +
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
		var showRecipes = Helper.recipebook.recipe.filter(function (e) {return hideRecipes.indexOf(e.name)==-1});

		if (filterRecipe.useLevel) {
			showRecipes = showRecipes.filter(function (e,i,a) {return e.level >= filterRecipe.minLevel && e.level <= filterRecipe.maxLevel});
		}

		if (filterRecipe.useType) {
			showRecipes = showRecipes.filter(function (e,i,a) {return filterRecipe.types.indexOf(e.type) >= 0});
		}


		for (var i=0; i<showRecipes.length;i++) {
			recipe=showRecipes[i];
			c++;

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
		result+='</table>';
		output.innerHTML=result;

		document.getElementById('Helper:FilterLevel').addEventListener('click', Helper.filterRecipeByLevel, true);
		document.getElementById('Helper:FilterType').addEventListener('click', Helper.filterRecipeByType, true);
		document.getElementById('Helper:LevelFilterOk').addEventListener('click', Helper.filterRecipeOk, true);
		document.getElementById('Helper:TypeFilterOk').addEventListener('click', Helper.filterRecipeOk, true);

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

	filterRecipeOk: function(evt) {
		var selectedTypes = []
		for (var i=0; i<Helper.ItemTypes.length; i++) {
			var typ = Helper.ItemTypes[i]
			if (document.getElementById("Helper:TypeFilter:"+typ).checked) {
				selectedTypes.push(typ)
			}
		}

		var theMinLevel = parseInt(document.getElementById("Helper:LevelFilterMin").value);
		var theMaxLevel = parseInt(document.getElementById("Helper:LevelFilterMax").value);
		if (isNaN(theMinLevel) || theMinLevel == null) theMinLevel=0;
		if (isNaN(theMaxLevel) || theMaxLevel == null) theMaxLevel=999;

		var filterRecipe={
			minLevel: theMinLevel,
			maxLevel: theMaxLevel,
			types: selectedTypes,
			useLevel: document.getElementById("Helper:UseLevelFilter").checked,
			useType: document.getElementById("Helper:UseTypeFilter").checked
		}

		System.setValueJSON("recipeFilter", filterRecipe)
		evt.stopPropagation();
		Helper.generateRecipeTable();
	},

	filterRecipeByLevel: function(evt) {
		var levelFilter=document.getElementById("Helper:LevelFilter");
		var isVisible=levelFilter.style.visibility=="visible";
		levelFilter.style.visibility=isVisible?"hidden":"visible";
		levelFilter.style.display=isVisible?"none":"block";
		evt.stopPropagation();
	},


	filterRecipeByType: function(evt) {
		var typeFilter=document.getElementById("Helper:TypeFilter");
		var isVisible=typeFilter.style.visibility=="visible";
		typeFilter.style.visibility=isVisible?"hidden":"visible";
		typeFilter.style.display=isVisible?"none":"block";
		evt.stopPropagation();
	},

	sortRecipeTable: function(evt) {
		Helper.recipebook=System.getValueJSON("recipebook");
		var headerClicked = evt.target.getAttribute("sortKey");
		var sortType = evt.target.getAttribute("sorttype");
		if (!headerClicked) return;
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
		var mainTable = System.findNode("//table[@width='640']");
		var subTable = System.findNode("//table[@width='640']/tbody/tr/td/table");
		var minGroupLevel = GM_getValue("minGroupLevel");
		if (minGroupLevel) {
			var textArea = subTable.rows[0].cells[0];
			textArea.innerHTML += ' <span style="color:cyan">Current Min Level Setting: '+ minGroupLevel +'</span>';
		}

		allItems = System.findNodes("//tr[td/a/img/@title='View Squad Stats']");
		var memberList=System.getValueJSON("memberlist");
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
			var theDateCell=allItems[i].cells[2];
			var theDate=theDateCell.firstChild;
			var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
			var xRE=/([a-zA-Z]+), (\d+) ([a-zA-Z]+) (\d+):(\d+):(\d+) UTC/;
			var x=xRE.exec(theDate.innerHTML);
			var month = months.indexOf(x[3]);
			var curYear = new Date().getFullYear();
			var groupDate = new Date();
			groupDate.setUTCDate(x[2]);
			groupDate.setUTCMonth(month);
			groupDate.setUTCFullYear(curYear);
			groupDate.setUTCHours(x[4]);
			groupDate.setUTCMinutes(x[5]);
			theDateCell.innerHTML += '<br><nobr><span style="color:cyan; font-size:x-small">Local: '+
				groupDate.toString().substr(0,21)+'</span></nobr>';
		}
		var buttonElement = System.findNode("//td[input[@value='Join All Available Squads']]");
		buttonElement.innerHTML += '&nbsp;<input id="fetchgroupstats" type="button" value="Fetch Squad Stats" class="custombutton">';

		document.getElementById('fetchgroupstats').addEventListener('click', Helper.fetchGroupData, true);

	},

	fetchGroupData: function(evt) {
		var calcButton = System.findNode("//input[@id='fetchgroupstats']");
		calcButton.style.display = "none";
		var allItems = System.findNodes("//img[@title='View Squad Stats']");
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
			if (anItem.innerHTML == '<font color="#c9c9c9">Attack:&nbsp;</font>'){
				var attackLocation = anItem.nextSibling;
				var attackValue = attackLocation.textContent;
			}
			if (anItem.innerHTML == '<font color="#c9c9c9">Defense:&nbsp;</font>'){
				var defenseLocation = anItem.nextSibling;
				var defenseValue = defenseLocation.textContent;
			}
			if (anItem.innerHTML == '<font color="#c9c9c9">Armor:&nbsp;</font>'){
				var armorLocation = anItem.nextSibling;
				var armorValue = armorLocation.textContent;
			}
			if (anItem.innerHTML == '<font color="#c9c9c9">Damage:&nbsp;</font>'){
				var damageLocation = anItem.nextSibling;
				var damageValue = damageLocation.textContent;
			}
			if (anItem.innerHTML == '<font color="#c9c9c9">HP:&nbsp;</font>'){
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
			var warningText = "</b><br/>This is probably an offer that will please someone.";
			if (sellPrice < 500) {
				warningColor = "brown";
				var warningText = "</b><br>This is too low ... it isn't going to sell.";
			} else if (sellPrice > 15000) {
				warningColor = "red";
				var warningText = "</b><br/>This is way too high a price ... you should reconsider.";
			}
			warningField.innerHTML = "<span style='color:" + warningColor + ";'>You are offering to buy Crystals for <b>" +
				System.addCommas(sellPrice) + " credits</b>" + warningText + "</span>";
		}
	},

	injectQuickBuff: function() {

		var playerIDRE = /tid=(\d+)/;
		var playerID = playerIDRE.exec(location);
		if (playerID) {
			var playerID = playerID[1];
			System.xmlhttp("index.php?cmd=profile&player_id=" + playerID, Helper.getPlayerBuffs, false)
		}
	},

	quickBuffMe: function() {
		var playerInput = System.findNode("//input[@name='targetPlayers']");
		playerInput.value=GM_getValue("CharacterName");
		if (Helper.tmpSelfProfile) {
			Helper.getPlayerBuffs(Helper.tmpSelfProfile, true);
		}
	},

	getPlayerBuffs: function(responseText, keepPlayerInput) {
		var injectHere = System.findNode("//input[@value='Activate Selected Skills on Self']/parent::*/parent::*/parent::*");
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
			    && myBuff.innerHTML.search("Mission Finder") == -1) {
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
				buffRE = /<b>([ a-zA-Z]+)<\/b> \(Level: (\d+)\)/
				buff = buffRE.exec(onmouseover);
				buffName = buff[1];
				buffLevel = buff[2];
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

		resultText += "</table>"

		var statistics = System.findNode("//td[contains(@background, 'sigma2/inventory/statistics_head.jpg')]/../../tr[3]/td/table", doc);
		statistics.style.backgroundImage = 'url(' + System.imageServer + '/sigma2/skin/realm_top_b2.jpg)'; //Color='white';
		var staminaCell = statistics.rows[6].cells[3];
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

		var newNode = document.createElement("SPAN");
		newNode.innerHTML = resultText;
		injectHere.appendChild(newNode);

		if (keepPlayerInput) {
			playerInput = System.findNode("//input[@name='targetPlayers']");
			playerInput.value = playerName;
		}
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
		var doublerLevel = 0;
		var corrodeLevel = 0;
		var robotHunterLevel = 0;
		var radHunterLevel = 0;
		for (var i=0;i<allItems.length;i++) {
			var anItem=allItems[i];
			if (anItem.getAttribute("src").search("/skills/") != -1) {
				var onmouseover = anItem.getAttribute("onmouseover")

				var doublerRE = /<b>Intensifier<\/b> \(Level: (\d+)\)/
				var doubler = doublerRE.exec(onmouseover);
				if (doubler) {
					doublerLevel = doubler[1];
				}
				var corrodeRE = /<b>Corrode<\/b> \(Level: (\d+)\)/
				var corrode = corrodeRE.exec(onmouseover);
				if (corrode) {
					corrodeLevel = corrode[1];
				}
				var robotHunterRE = /<b>Robot Hunter<\/b> \(Level: (\d+)\)/
				var robotHunter = robotHunterRE.exec(onmouseover);
				if (robotHunter) {
					robotHunterLevel = robotHunter[1];
				}
				var radHunterRE = /<b>Rad Hunter<\/b> \(Level: (\d+)\)/
				var radHunter = radHunterRE.exec(onmouseover);
				if (radHunter) {
					radHunterLevel = radHunter[1];
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
		if (creatureClass == "Robotic") {
			playerDamageValue = playerDamageValue + (playerDamageValue * robotHunterLevel * 0.002);
			var holyFlameBonusDamage = Math.floor((playerDamageValue - creatureArmor) * robotHunterLevel * 0.002);
			extraNotes += (holyFlameLevel > 0? "RH Bonus Damage = " + holyFlameBonusDamage + "<br>":"");
		}
		if (creatureClass == "Irradiated") {
			playerDamageValue = playerDamageValue + (playerDamageValue * radHunterLevel * 0.002);
			var holyFlameBonusDamage = Math.floor((playerDamageValue - creatureArmor) * radHunterLevel * 0.002);
			extraNotes += (holyFlameLevel > 0? "RadH Bonus Damage = " + holyFlameBonusDamage + "<br>":"");
		}
		//Attack: TODO with STR skill
		var hitByHowMuch = (playerAttackValue - Math.ceil(1.1053*creatureDefense));
		//Damage:
		var damageDone = Math.floor(((playerDamageValue < (1.1053*creatureArmor))? (playerDamageValue/5): (6*playerDamageValue/5) - (1.1053*creatureArmor)) - (1.053*creatureHP));
		var numberOfHitsRequired = (hitByHowMuch > 0? Math.ceil((1.053*creatureHP)/((playerDamageValue < (1.1053*creatureArmor))? (playerDamageValue/5): (6*playerDamageValue/5) - (1.1053*creatureArmor))):"-");
		//Defense: TODO with some skills
		var creatureHitByHowMuch = Math.floor((1.1053*creatureAttack) - playerDefenseValue);
		//Armor and HP: TODO with IR and some class skills
		var creatureDamageDone = Math.ceil((1.1053*creatureDamage) - (playerArmorValue + playerHPValue));
		var numberOfCreatureHitsTillDead = (creatureHitByHowMuch >= 0? Math.ceil(playerHPValue/(((1.1053*creatureDamage) < playerArmorValue)? 1: (1.1053*creatureDamage) - playerArmorValue)):"-");
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
				"*Does NOT include any skills (if active) (YET), allow for randomness (1.1053)<br>" +
				"The script developers does not have info on how to calcuate these values for SS2 yet, "+
				"so if you can derive some values / formula for these calculation, please contact dkwizard.<br> "+
				"Thank you very much!</span></td></tr>" +
			"</tbody></table>";
	},

	injectBioWidgets: function() {
		var textArea = System.findNode("//textarea[@name='bio']");
		//textArea.rows=15;
		textArea.cols=60;
		textArea.id = "biotext";
		var textAreaTable = textArea.parentNode.parentNode.parentNode.parentNode.parentNode;
		var bioPreviewHTML = System.convertTextToHtml(textArea.value);
		var newRow = textAreaTable.insertRow(-1);
		var newCell = newRow.insertCell(0);
		newCell.innerHTML = '<table align="center" width="325" border="1"><tbody>' +
			'<tr><td style="text-align:center;color:#7D2252;background-color:#110011">Preview</td></tr>' +
			'<tr><td width="325"><span style="font-size:small;" findme="biopreview">' + bioPreviewHTML +
			'</span></td></tr></tbody></table>';
		var innerTable = System.findNode("//table[tbody/tr/td[contains(@background, 'sigma2/skin/header_updatebio.jpg')]]");
		var crCount = 0;
		var startIndex = 0;
		while (textArea.value.indexOf('\n',startIndex+1) != -1) {
			crCount++;
			startIndex = textArea.value.indexOf('\n',startIndex+1);
		}
		innerTable.rows[2].cells[0].innerHTML += "<div align=right><span style='color:#ADB5B5;'>Character count = </span><span findme='biolength' style='color:#ADB5B5;'>" +
			(textArea.value.length + crCount) + "</span><span style='color:#ADB5B5;'>/</span><span findme='biototal' style='color:#ADB5B5;'>255</span></div>";

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
			.innerHTML = '<table align="center" width="119" border="0"><tbody>' +
			'<tr><td style="text-align:center;color:#B5B1AB;background-color:#181A1B;">Preview (' + chars + '/' + maxchars + ' characters)</td></tr>' +
			'<tr><td width="125"><span style="font-size:x-small" findme="biopreview">' + textContent +
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
		textArea.value = textArea.value.replace(/<br \/>/g,"");
		var bioPreviewHTML = System.convertTextToHtml(textArea.value);
		var newRow = textAreaTable.insertRow(-1);
		var newCell = newRow.insertCell(0);
		newCell.innerHTML = '<table align="center" width="310" border="1"><tbody>' +
			'<tr><td style="text-align:center;color:#7D2252;background-color:#110011">Preview</td></tr>' +
			'<tr><td width="325"><span style="font-size:small;" findme="biopreview">' + bioPreviewHTML +
			'</span></td></tr></tbody></table>';
		textArea.id = "historytext";
		var innerTable = System.findNode("//table[tbody/tr/td[contains(@background,'sigma2/skin/header_editfactionhistory.jpg')]]");
		var crCount = 0;
		var startIndex = 0;
		while (textArea.value.indexOf('\n',startIndex+1) != -1) {
			crCount++;
			startIndex = textArea.value.indexOf('\n',startIndex+1);
		}
		innerTable.rows[2].cells[0].innerHTML += "<table width=100%><tr><td align=right><span style='color:#ADB5B5;'>Character count = </span><span findme='historylength' style='color:#ADB5B5;'>" +
			(textArea.value.length + crCount) + "</span><span style='color:#ADB5B5;'>/</span><span findme='historytotal' style='color:#ADB5B5;'>255</span></td></tr></table>";

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
		var historyCharactersValueRE = /(\d+) \/ 100/;
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
		var alliesValueRE = /(\d+) \/ \d+/;
		var alliesValue = alliesValueRE.exec(alliesRatio.innerHTML)[1]*1;
		GM_setValue("alliestotal",alliesValue+5);
		var enemiesText = System.findNode("//td[.='+1 Max Enemies']");
		var enemiesRatio = enemiesText.nextSibling.nextSibling.nextSibling.nextSibling;
		var enemiesValueRE = /(\d+) \/ \d+/;
		var enemiesValue = enemiesValueRE.exec(enemiesRatio.innerHTML)[1]*1;
		GM_setValue("enemiestotal",enemiesValue+5);
		var maxAuctionsText = System.findNode("//td[.='+1 Max Auctions']");
		var maxAuctionsRatio = maxAuctionsText.nextSibling.nextSibling.nextSibling.nextSibling;
		var maxAuctionsValueRE = /(\d+) \/ \d+/;
		var maxAuctionsValue = maxAuctionsValueRE.exec(maxAuctionsRatio.innerHTML)[1]*1;
		GM_setValue("maxAuctions",maxAuctionsValue+2);
	},

	injectTopRated: function() {
	},

	injectArena: function() {
	},
	
	injectRelicList: function(){
		var relics = Data.relicList();
		var relicImages = System.findNodes("//img[contains(@src,'/relics/')]");
		var relicFound = false;
		for (var i=0; i<relicImages.length; i++){
			var relicImage = relicImages[i];
			var relicName = relicImage.parentNode.nextSibling.nextSibling.textContent.trim();
			relicFound = false;
			for (var j=0; j<relics.length; j++){
				var relic = relics[j];
				if (relicName == relic.Name.trim()){
					var onmouseoverText='Tip(\'' +
						'<span style=\\\'font-weight:bold; color:#A7FFFD;\\\'>' + relic.Name + '</span><br /><br />' +
						relic.Realm + '<br><br>' +
						relic.Comment + '\');'
					relicImage.setAttribute("onmouseover", onmouseoverText);
					relicFound = true;
					break;
				}
			}
			if (!relicFound) GM_log("Relic:'" + relicName + "' not found in data set");
		}
	},

	injectSettingsGuildData: function(guildType) {
		var result='';
		result += '<input name="guild' + guildType + '" size="45" value="' + GM_getValue("guild" + guildType) + '">'
		result += '<span style="cursor:pointer;text-decoration:none;" id="toggleShowGuild' + guildType + 'Message" linkto="showGuild' +
			guildType + 'Message"> &#x00bb;</span>'
		result += '<div id="showGuild' + guildType + 'Message" style="visibility:hidden;display:none">'
		result += '<input name="guild' + guildType + 'Message" size="50" value="' + GM_getValue("guild" + guildType + "Message") + '">'
		result += '</div>'
		return result;
	},

	injectSettings: function() {
		var lastCheck=new Date(parseInt(GM_getValue("lastVersionCheck")));
		var buffs=GM_getValue("huntingBuffs");
		var doNotKillList=GM_getValue("doNotKillList");
		var minPS=System.getValueJSON("minPSStats");

		var inputSize=45;
		var configData=
			'<form><table width="100%" cellspacing="0" cellpadding="2" border="0">' +
			'<tr><td colspan="2" height="1" bgcolor="#333333"></td></tr>' +
			'<tr><th colspan="2" align="left" style="color:#D4FAFF;">Sigma Storm Helper configuration</th></tr>' +
			'<tr><td colspan="2" align=center><input type="button" class="custombutton" value="Check for updates" id="Helper:CheckUpdate"></td></tr>'+
			'<tr><td colspan="2" align=center><span style="font-size:xx-small">(Current version: ' + GM_getValue("currentVersion") + ', Last check: ' + lastCheck.toFormatString("dd/MMM/yyyy HH:mm:ss") +
			')</span></td></tr>' +
			'<tr><td colspan="2" align=center><a href="index.php?cmd=notepad&subcmd=saveconfig">Import/Export Config</a></td></tr>' +
			'<tr><td colspan="2" align=center>' +
			'<span style="font-weight:bold;">Visit the <a href="http://code.google.com/p/fallenswordhelper/">Sigma Storm 2 Helper web site</a> ' +
			'for any suggestions, requests or bug reports</span></td></tr>' +
			'<tr><th colspan="2" align="left" style="color:#D4FAFF;">Social Preferences</th></tr>' +
			'<tr><td colspan="2" align="left">Enter faction names, seperated by commas</td></tr>' +
			'<tr><td align="right">Own Faction:</td><td>'+ Helper.injectSettingsGuildData("Self") + '</td></tr>' +
			'<tr><td align="right">Friendly Factions:</td><td>'+ Helper.injectSettingsGuildData("Frnd") + '</td></tr>' +
			'<tr><td align="right">Old Factions:</td><td>'+ Helper.injectSettingsGuildData("Past") + '</td></tr>' +
			'<tr><td align="right">Enemy Factions:</td><td>'+ Helper.injectSettingsGuildData("Enmy") + '</td></tr>' +
			'<tr><td align="right">'+Layout.networkIcon()+'Online Faction Members' + Helper.helpLink('Show Faction Online Members List', 'This will show the faction members online list on the right.') +
				':</td><td><input name="enableGuildOnlineList" type="checkbox" value="on"' + (GM_getValue("enableGuildOnlineList")?" checked":"") +
				'> <input name="guildOnlineRefreshTime" size="1" value="'+ GM_getValue("guildOnlineRefreshTime") + '" /> seconds refresh</td></tr>' +
			'<tr><td align="right">'+Layout.networkIcon()+'Show Online Allies/Enemies' + Helper.helpLink('Show Online Allies/Enemies', 'This will show the allies/enemies online list on the right.') +
				':</td><td>Allies<input name="enableAllyOnlineList" type="checkbox" value="on"' + (GM_getValue("enableAllyOnlineList")?" checked":"") + 
				'> Enemies<input name="enableEnemyOnlineList" type="checkbox" value="on"' + (GM_getValue("enableEnemyOnlineList")?" checked":"") +
				'> <input name="allyEnemyOnlineRefreshTime" size="1" value="'+ GM_getValue("allyEnemyOnlineRefreshTime") + '" /> seconds refresh</td></tr>' +
			'<td align="right">Chat top to bottom' + Helper.helpLink('Chat top to bottom', 'When selected, chat messages run from top (older) to bottom (newer), as in most chat programs. ' +
				'When not, messages run as they are in HCS\'s chat') + ':</td><td><input name="chatTopToBottom" type="checkbox" value="on"' + (GM_getValue("chatTopToBottom")?" checked":"") + '></td></tr>' +
			'<tr><td align="right">'+Layout.networkIcon()+'Show chat lines' + Helper.helpLink('Chat lines', 'Display the last {n} lines from faction chat (set to 0 to disable).' +
				((System.browserVersion<3)?'<br/>Does not work in Firefox 2 - suggest setting to 0 or upgrading to Firefox 3.':'')) +
				':</td><td><input name="enableChat" type="checkbox" value="on"' + (GM_getValue("chatLines")>0?" checked":"") + '">'+
				'<input name="chatLines" size="3" value="' + GM_getValue("chatLines") + '"></td></tr>' +
			'<tr><th colspan="2" align="left" style="color:#D4FAFF;">Other preferences</th></tr>' +
			'<tr><td align="right">Quick Kill ' + Helper.helpLink('Quick Kill', 'This will kill monsters without opening a new page') +
				':</td><td><input name="quickKill" type="checkbox" value="on"' + (GM_getValue("quickKill")?" checked":"") + '>' +
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
			'<tr><td align="right">Color Special Entities' + Helper.helpLink('Color Special Entities', 'Entities will be colored according to their rarity. ' +
				'Champions will be colored green, Elites yellow and Super Elites red.') +
				':</td><td><input name="enableCreatureColoring" type="checkbox" value="on"' + (GM_getValue("enableCreatureColoring")?" checked":"") + '></td></td></tr>' +
			'<tr><td align="right">'+Layout.networkIcon()+'Show Creature Info' + Helper.helpLink('Show Creature Info', 'This will show the information from the view creature link when you mouseover the link.' +
				((System.browserVersion<3)?'<br>Does not work in Firefox 2 - suggest disabling or upgrading to Firefox 3.':'')) +
				':</td><td><input name="showCreatureInfo" type="checkbox" value="on"' + (GM_getValue("showCreatureInfo")?" checked":"") + '></td></tr>' +
			'<tr><td align="right">Keep Entity Log' + Helper.helpLink('Keep Entity Log', 'This will show the entity log for each entity you see when you travel. This requires Show Entity Info enabled!') +
				':</td><td><input name="showMonsterLog" type="checkbox" value="on"' + (GM_getValue("showMonsterLog")?" checked":"") + '>'+
				'&nbsp;&nbsp;<input type="button" class="custombutton" value="Show" id="Helper:ShowMonsterLogs"></td></tr>' +
			'<tr><td align="right">Hide <small>Taulin Rad Lands</small> Portal' + Helper.helpLink('Hide Taulin Rad Lands Portal', 'This will hide the Taulin Rad Lands portal on the world screen.') +
				':</td><td><input name="hideKrulPortal" type="checkbox" value="on"' + (GM_getValue("hideKrulPortal")?" checked":"") + '></td></tr>' +
			'<tr><td align="right">Footprints Color:</td><td><input name="footprintsColor" size="9" value="'+ GM_getValue("footprintsColor") + '" /></td></tr>' +
			'<tr><td align="right">Show Send Credits' + Helper.helpLink('Show Send Credits on World Screen', 'This will show an icon below the world map to allow you to quickly send credits to a Friend.') +
				':</td><td><input name="sendGoldonWorld" type="checkbox" value="on"' + (GM_getValue("sendGoldonWorld")?" checked":"") + '>'+
				'Send <input name="goldAmount" size="8" value="'+ GM_getValue("goldAmount") + '" /> '+
				'credits to <input name="goldRecipient" size="15" value="'+ GM_getValue("goldRecipient") + '" />' +
				'</td></tr>' +
			'<tr><td align="right">Hide Top Banner' + Helper.helpLink('Hide Top Banner', 'Pretty simple ... it just hides the top banner') +
				':</td><td><input name="hideBanner" type="checkbox" value="on"' + (GM_getValue("hideBanner")?" checked":"") + '></td></tr>' +
			'<tr><td align="right">Move FS box' + Helper.helpLink('Move FallenSword Box', 'This will move the FS box to the left, under the menu, for better visibility (unless it is already hidden.') +
				':</td><td><input name="moveFSBox" type="checkbox" value="on"' + (GM_getValue("moveFSBox")?" checked":"") + '></td></tr>' +
			'<tr><td align="right">Hide \"New?\" box' + Helper.helpLink('Hide New? Box', 'This will hide the New? box, useful to gain some space if you have already read it.') +
				':</td><td><input name="hideNewBox" type="checkbox" value="on"' + (GM_getValue("hideNewBox")?" checked":"") + '></td></tr>' +
			'<tr><td align="right">Enable Bio Compressor' + Helper.helpLink('Enable Bio Compressor', 'This will compress long bios according to settings and provide a link to expand the compressed section.') +
				':</td><td><input name="enableBioCompressor" type="checkbox" value="on"' + (GM_getValue("enableBioCompressor")?" checked":"") +
				'><br/>Max Compressed Characters:<input name="maxCompressedCharacters" size="1" value="'+ GM_getValue("maxCompressedCharacters") + '" />'+
				'<br/>Max Compressed Lines:<input name="maxCompressedLines" size="1" value="'+ GM_getValue("maxCompressedLines") + '" /></td></tr>' +
			'<tr><td align="right">Do Not Kill List' + Helper.helpLink('Do Not Kill List', 'List of entities that will not be killed by quick kill. You must type the full name of each entity, ' +
				'separated by commas. Entity name will show up in red color on world screen and will not be killed by keyboard entry (but can still be killed by mouseclick). Quick kill must be '+
				'enabled for this function to work.') +
				':</td><td><input name="doNotKillList" size="'+inputSize+'" value="'+ doNotKillList + '" /></td></tr>' +
			'<tr><td align="right">Minimum Personal Status' + Helper.helpLink('Minimum Personal Status', 'Minimum attack, defense, armor, HP, damage, skill power before these status on world page turn to red.'+
				'<br/>Note that backpack counter will turn red if backpack is full') +
				':</td><td>'+
				'Atk: <input name="minPSatk" size=1 value="'+ minPS.atk + '" />, '+
				'Def: <input name="minPSdef" size=1 value="'+ minPS.def + '" />, '+
				'Arm: <input name="minPSarm" size=1 value="'+ minPS.arm + '" />, '+
				'Dmg: <input name="minPSdmg" size=1 value="'+ minPS.dmg + '" /><br/> '+
				'Current HP: <input name="minPScHP" size=1 value="'+ minPS.cHP + '" />, '+
				'Max HP: <input name="minPSmHP" size=1 value="'+ minPS.mHP + '" />, '+
				'Skill Power: <input name="minPSskill" size=1 value="'+ minPS.skill + '" />, '+
				'</td></tr>' +
			'<tr><td align="right">Hunting Buffs' + Helper.helpLink('Hunting Buffs', 'Customize which buffs are designated as hunting buffs. You must type the full name of each buff, ' +
				'separated by commas. Use the checkbox to enable/disable them.') +
				':</td><td><input name="showHuntingBuffs" type="checkbox" value="on"' + (GM_getValue("showHuntingBuffs")?" checked":"") + '>' +
				'<input name="huntingBuffs" size="'+inputSize+'" value="'+ buffs + '" /></td></tr>' +
			'<tr><td align="right">Hide Specific Quests' + Helper.helpLink('Hide Specific Quests', 'If enabled, this hides quests whose name matches the list (separated by commas). ' +
				'This works on Quest Manager and Quest Book.') +
				':</td><td><input name="hideQuests" type="checkbox" value="on"' + (GM_getValue("hideQuests")?" checked":"") + '>' +
				'<input name="hideQuestNames" size="'+inputSize+'" value="'+ GM_getValue("hideQuestNames") + '" /></td></tr>' +
			'<tr><td align="right">Hide Specific Recipes' + Helper.helpLink('Hide Specific Recipes', 'If enabled, this hides recipes whose name matches the list (separated by commas). ' +
				'This works on Recipe Manager') +
				':</td><td><input name="hideRecipes" type="checkbox" value="on"' + (GM_getValue("hideRecipes")?" checked":"") + '>' +
				'<input name="hideRecipeNames" size="'+inputSize+'" value="'+ GM_getValue("hideRecipeNames") + '" /></td></tr>' +
			'<tr><td align="right">Enable Bulk Sell' + Helper.helpLink('Enable Bulk Sell', 'This enables the functionality for the user to bulk sell items.') +
				':</td><td><input name="enableBulkSell" type="checkbox" value="on"' + (GM_getValue("enableBulkSell")?" checked":"") + '></td></tr>' +
			//save button
			'<tr><td colspan="2" align=center><input type="button" class="custombutton" value="Save" id="Helper:SaveOptions"></td></tr>' +
			'<tr><td colspan="2" align=center>' +
			'<span style="font-size:xx-small">Sigma Storm Helper was coded by <a href="' + System.server + 'index.php?cmd=profile&player_id=1106198">Coccinella</a>, ' +
			'<a href="' + System.server + 'index.php?cmd=profile&player_id=1267797">Tangtop</a> and '+
			'<a href="' + System.server + 'index.php?cmd=profile&player_id=1191381">dkwizard</a> '+
			'with valuable contributions by <a href="' + System.server + 'index.php?cmd=profile&player_id=1133910">Jesiegel</a>' +
			'</td></tr>' +
			'</table></form>';
		var insertHere = System.findNode("//table[@width='500' and @cellpadding=2]");
		var newRow=insertHere.insertRow(insertHere.rows.length);
		var newCell=newRow.insertCell(0);
		newCell.colSpan=3;
		newCell.innerHTML=configData;
		// insertHere.insertBefore(configData, insertHere);
		document.getElementById('Helper:SaveOptions').addEventListener('click', Helper.saveConfig, true);
		document.getElementById('Helper:CheckUpdate').addEventListener('click', Helper.checkForUpdate, true);
		document.getElementById('Helper:ShowLogs').addEventListener('click', Helper.showLogs, true);
		document.getElementById('Helper:ShowMonsterLogs').addEventListener('click', Helper.showMonsterLogs, true);

		document.getElementById('toggleShowGuildSelfMessage').addEventListener('click', System.toggleVisibilty, true);
		document.getElementById('toggleShowGuildFrndMessage').addEventListener('click', System.toggleVisibilty, true);
		document.getElementById('toggleShowGuildPastMessage').addEventListener('click', System.toggleVisibilty, true);
		document.getElementById('toggleShowGuildEnmyMessage').addEventListener('click', System.toggleVisibilty, true);

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
		System.saveValueForm(oForm, "showMonsterLog");
		System.saveValueForm(oForm, "showCreatureInfo");
		System.saveValueForm(oForm, "keepLogs");
		System.saveValueForm(oForm, "enableGuildOnlineList");
		System.saveValueForm(oForm, "quickKill");
		System.saveValueForm(oForm, "huntingBuffs");
		System.saveValueForm(oForm, "showHuntingBuffs");
		System.saveValueForm(oForm, "moveFSBox");

		System.saveValueForm(oForm, "hideKrulPortal");
		System.saveValueForm(oForm, "hideQuests");
		System.saveValueForm(oForm, "hideQuestNames");
		System.saveValueForm(oForm, "hideRecipes");
		System.saveValueForm(oForm, "hideRecipeNames");
		System.saveValueForm(oForm, "footprintsColor");
		System.saveValueForm(oForm, "guildOnlineRefreshTime");
		System.saveValueForm(oForm, "doNotKillList");
		System.saveValueForm(oForm, "enableBioCompressor");
		System.saveValueForm(oForm, "maxCompressedCharacters");
		System.saveValueForm(oForm, "maxCompressedLines");
		System.saveValueForm(oForm, "sendGoldonWorld");
		System.saveValueForm(oForm, "goldRecipient");
		System.saveValueForm(oForm, "goldAmount");
		System.saveValueForm(oForm, "enableBulkSell");
		
		var minPSstatNames=['atk','def','arm','dmg','cHP','mHP','skill'];
		var minPS={};
		for (var i=0; i<minPSstatNames.length; i++){
			var name=minPSstatNames[i];
			var formElement = System.findNode("//input[@name='minPS" + name + "']", oForm);
			minPS[name]=formElement.value;
		}
		GM_setValue('minPSStats', JSON.stringify(minPS));
		
		System.saveValueForm(oForm, "enableAllyOnlineList");
		System.saveValueForm(oForm, "enableEnemyOnlineList");
		System.saveValueForm(oForm, "allyEnemyOnlineRefreshTime");

		window.alert("FS Helper Settings Saved");
		window.location = window.location;
		return false;
	},

	showLogs: function(evt) {
		document.location=System.server + "index.php?cmd=notepad&subcmd=showlogs"
	},

	showMonsterLogs: function(evt) {
		document.location=System.server + "index.php?cmd=notepad&subcmd=monsterlog"
	},

	injectNotepadShowLogs: function() {
		var content=Layout.notebookContent();
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
		guildSelf=guildSelf.toLowerCase().replace(/\s*,\s*/,",").replace(/\s\s*/g," ").split(",");
		guildFrnd=guildFrnd.toLowerCase().replace(/\s*,\s*/,",").replace(/\s\s*/g," ").split(",");
		guildPast=guildPast.toLowerCase().replace(/\s*,\s*/,",").replace(/\s\s*/g," ").split(",");
		guildEnmy=guildEnmy.toLowerCase().replace(/\s*,\s*/,",").replace(/\s\s*/g," ").split(",");
		txt = txt.toLowerCase().replace(/\s\s*/g," ");
		if (guildSelf.indexOf(txt)!=-1) return "self";
		if (guildFrnd.indexOf(txt)!=-1) return "friendly";
		if (guildPast.indexOf(txt)!=-1) return "old";
		if (guildEnmy.indexOf(txt)!=-1) return "enemy";
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
		//doc = doc.replace("<center></center>", "");
		doc = doc.replace(/<[^>]*title="You are here"[^>]*>/g, '');
		doc = doc.replace(/<table [^>]*><tbody><tr><td><center><\/center><\/td><\/tr><\/tbody><\/table>/g,'');
		doc = doc.replace(/<table [^>]*><tbody><tr><td><\/td><\/tr><\/tbody><\/table>/g,'');
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
		System.setValueJSON("quickLinks", Helper.quickLinks);
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
	},

	worldMapAction: function() {
		Helper.worldDoAction("//img[@title='Stairway']", "//input[@name='stairway_id']", "index.php?cmd=world&subcmd=usestairs&stairway_id=", 1);
		Helper.worldDoAction("//img[@title='Stairway']", "//input[@name='shop_id']", "index.php?cmd=shop&shop_id=", 1);
		Helper.worldDoAction("//img[@title='Vault']", "//input[@value='inventing']", "index.php?cmd=inventing", 0);
		Helper.worldDoAction("//img[@title='Vault']", "//input[@value='hellforge']", "index.php?cmd=hellforge", 0);
		Helper.worldDoAction("//img[@title='Vault']", "//input[@value='bank']", "index.php?cmd=bank", 0);
		Helper.worldDoAction("//img[@title='Augmentation Terminal']", "//input[@value='crafting']", "index.php?cmd=crafting", 0);
		Helper.worldDoAction("//img[@title='Cloning Facility']", "//input[@value='heal']", "index.php?cmd=world&subcmd=heal", 0);
	},

	worldDoAction: function(validateNode, idNode, newUrl, needId) {
		var vNode = System.findNode(validateNode);
		var iNode = System.findNode(idNode);
		if (vNode && iNode)
			if (needId)
				window.location = newUrl + iNode.value;
			else
				window.location = newUrl;
	},

	movePage: function(dir) {
		var dirButton = System.findNode("//input[@value='"+dir+"']");
		if (!dirButton) return;
		var url = dirButton.getAttribute("onClick");
		url = url.replace(/^[^']*'/m, "").replace(/\';$/m, "");
		window.location = url;
	},

	injectCreateAuctionTemplate: function() {
		if (window.location.search.search("inv_id") == -1) {
			// add item info to display on the next page
			var items = System.findNodes("//a[contains(@href,'index.php?cmd=auctionhouse&subcmd=create2')]");
			if (items) {
				for (var i = 0; i < items.length; i++) {
					var item = items[i];
					var itemStats = /ajaxLoadItem\((\d+), (\d+), (\d+), (\d+)/.exec(item.getAttribute("onmouseover"));
					if (itemStats) {
						itemId = itemStats[1];
						invId = itemStats[2];
						type = itemStats[3];
						pid = itemStats[4];
						txt = item.parentNode.textContent;
						imgid = /\/([^./]*).gif/.exec(item.firstChild.src)[1];
						var itemHref = item.getAttribute("href");
						var newHref = itemHref + '&item_id=' + itemId + '&type=' + type + '&pid=' + pid +
							'&imgid=' + imgid + '&txt=' + txt;
						item.setAttribute("href",newHref);
					}
				}
			}
			return;
		}

		var auctionTable = System.findNode("//table[tbody/tr/td/a[@href='index.php?cmd=auctionhouse&subcmd=create']]");
		if (!auctionTable) return;
		// add image & tooltip of the auctioned item
		var bidEntryTable = auctionTable.rows[5].cells[0].firstChild.nextSibling;
		var itemStats = /inv_id=(\d+)&item_id=(\d+)&type=(\d+)&pid=(\d+)&imgid=([^&]*)&txt=(.*)/.exec(window.location.search)
		if (itemStats) {
			var invId = itemStats[1];
			var itemId = itemStats[2];
			var type = itemStats[3];
			var pid = itemStats[4];
			var imgid = itemStats[5];
			var txt = itemStats[6];
			//GM_log();
			var newCell = bidEntryTable.rows[0].insertCell(2);
			newCell.rowSpan = 5;
			newCell.innerHTML = '<div align=center style="font-size:x-small"><img src="' + System.imageServer + '/items/' + imgid +
				'.gif" onmouseover="ajaxLoadItem(' + itemId + ', ' + invId + ', ' + type + ', ' + pid + ', \'\');" border=0><br>' +
				unescape(txt) + '</div>';
		}

		var newRow = auctionTable.insertRow(6);
		var newCell = newRow.insertCell(0);
		newCell.colSpan = 2;
		newCell.align = "center";

		var table = System.getValueJSON("auctionTemplate");
		if (!table) {
			table = [
				{auctionLength:6,auctionCurrency:1,auctionMinBid:1,		auctionBuyNow:1,	isDefault:true}
			];
			System.setValueJSON("auctionTemplate", table);
		}

		var textResult = "<table cellspacing='0' cellpadding='0' bordercolor='#000000'" +
				" border='0' align='center' width='550' style='border-style: solid; border-width: 1px;'>" +
				"<tr><td bgcolor='#212323'><center>Auction Templates</center></td></tr>" +
				"<tr><td><table cellspacing='10' cellpadding='0' border='0' width='100%'>" +
				"<tr><th bgcolor='#212323'>Length</th><th bgcolor='#212323'>Currency</th>"+
				"<th bgcolor='#212323'>Min Bid</th><th bgcolor='#212323'>Buy Now</th>"+
				"<th></th></tr>";

		for (var i = 0; i < table.length; i++) {
			textResult += "<tr align='right'><td>"+Helper.getAuctionLength(table[i].auctionLength)+"</td>"+
				"<td>"+(table[i].auctionCurrency==0?"Credits":"Flux Crystals")+"</td>"+
				"<td>"+System.addCommas(table[i].auctionMinBid)+"</td>"+
				"<td>"+System.addCommas(table[i].auctionBuyNow)+"</td>"+
				"<td>[<span style='cursor:pointer; text-decoration:underline; color:#84ADAC;' "+
					"id='Helper:useAuctionTemplate" + i + "' auctionTemplateId=" + i +
					" auctionLength=" + table[i].auctionLength +
					" auctionCurrency=" + table[i].auctionCurrency +
					" auctionMinBid=" + table[i].auctionMinBid +
					" auctionBuyNow=" + table[i].auctionBuyNow +
					">apply</span>]";
				textResult += " [<span style='cursor:pointer; text-decoration:underline; color:#84ADAC;' "+
					"id='Helper:delAuctionTemplate" + i + "' auctionTemplateId=" + i +">del</span>]"
			textResult += "</td></tr>";
		}
		if (table.length<=10) {
			textResult += "<tr align='right'>"+
				"<td><select id='Helper:auctionLength'><option value='0' selected>1 Hour</option><option value='1' >2 Hours</option>"+
					"<option value='2' >4 Hours</option><option value='3' >8 Hours</option><option value='4' >12 Hours</option>"+
					"<option value='5' >24 Hours</option><option value='6' >48 Hours</option></select></td>"+
				"<td><select id='Helper:auctionCurrency'><option value='0' >Credit</option><option value='1' selected>FC</option></select></td>"+
				"<td><input type='text' class='custominput' size='6' id='Helper:minBid'/></td>"+
				"<td><input type='text' class='custominput' size='6' id='Helper:buyNow'/></td>"+
				"<td>[<span style='cursor:pointer; text-decoration:underline; color:#84ADAC;' "+
					"id='Helper:saveAuctionTemplate'>save new template</span>]</td></tr>";

		}
		textResult += "</table></td></tr></table>";

		newCell.innerHTML = textResult;

		if (table.length<=10) document.getElementById("Helper:saveAuctionTemplate").addEventListener("click", Helper.saveAuctionTemplate, true);
		for (var i = 0; i < table.length; i++) {
			document.getElementById("Helper:useAuctionTemplate" + i).addEventListener("click", Helper.useAuctionTemplate, true);
			document.getElementById("Helper:delAuctionTemplate" + i).addEventListener("click", Helper.delAuctionTemplate, true);
		}
	},

	getAuctionLength: function(auctionLength) {
		if (auctionLength == 1) return '2 Hours';
		else if (auctionLength == 2) return '4 Hours';
		else if (auctionLength == 3) return '8 Hours';
		else if (auctionLength == 4) return '12 Hours';
		else if (auctionLength == 5) return '24 Hours';
		else if (auctionLength == 6) return '48 Hours';
		else return '1 Hour'
	},

	useAuctionTemplate: function(evt) {
		var newAuctionLength = evt.target.getAttribute("auctionLength");
		var newAuctionCurrency = evt.target.getAttribute("auctionCurrency");
		var newAuctionMinBid = evt.target.getAttribute("auctionMinBid");
		var newAuctionBuyNow = evt.target.getAttribute("auctionBuyNow");

		var auctionLength = System.findNode("//select[@name='auction_length']");
		var auctionCurrency = System.findNode("//select[@name='currency']");
		var auctionMinBid = System.findNode("//input[@name='minbid']");
		var auctionBuyNow = System.findNode("//input[@name='buynow']");

		auctionLength.selectedIndex = newAuctionLength;
		auctionCurrency.selectedIndex = newAuctionCurrency;
		auctionMinBid.value = newAuctionMinBid;
		auctionBuyNow.value = newAuctionBuyNow;
		
		var enableBulkSell = GM_getValue("enableBulkSell");
		if (enableBulkSell) {
			var bulkSellAuctionLength = System.findNode("//select[@id='Helper:bulkSellAuctionLength']");
			var bulkSellAuctionCurrency = System.findNode("//select[@id='Helper:bulkSellAuctionCurrency']");
			var bulkSellAuctionMinBid = System.findNode("//input[@id='Helper:bulkSellMinBid']");
			var bulkSellAuctionBuyNow = System.findNode("//input[@id='Helper:bulkSellBuyNow']");
			
			bulkSellAuctionLength.selectedIndex = newAuctionLength;
			bulkSellAuctionCurrency.selectedIndex = newAuctionCurrency;
			bulkSellAuctionMinBid.value = newAuctionMinBid;
			bulkSellAuctionBuyNow.value = newAuctionBuyNow;
		}
	},

	saveAuctionTemplate: function(evt) {
		var auctionLength = document.getElementById("Helper:auctionLength").value;
		var auctionCurrency = document.getElementById("Helper:auctionCurrency").value;
		var auctionMinBid = document.getElementById("Helper:minBid").value;
		var auctionBuyNow = document.getElementById("Helper:buyNow").value;
		if (!auctionMinBid) return;
		var table = System.getValueJSON("auctionTemplate");
		var theTemplate = {
			auctionLength: auctionLength,
			auctionCurrency: auctionCurrency,
			auctionMinBid: auctionMinBid,
			auctionBuyNow: auctionBuyNow,
			isDefault: false
		}
		table.push(theTemplate);
		System.setValueJSON("auctionTemplate", table);
		window.location = window.location;
	},

	delAuctionTemplate: function(evt) {
		var auctionTemplateId = evt.target.getAttribute("auctionTemplateId");
		var table = System.getValueJSON("auctionTemplate");
		table.splice(auctionTemplateId,1);
		System.setValueJSON("auctionTemplate", table);
		window.location = window.location;
	},

	injectMessageTemplate: function() {
		var injectHere = System.findNode("//input[@value='Send Message']/../../../../../../../../..");
		var table = System.getValueJSON("quickMsg");

		var targetPlayer = System.findNode("//input[@name='target_player']").value;
		if (!table) {
			table = ["Thank you very much ^_^", "Happy hunting, {playername}"];
			System.setValueJSON("quickMsg", table);
		}

		var textResult = "<br><table cellspacing='0' cellpadding='0' bordercolor='#5f5f5f'" +
				" border='0' align='center' width='550' style='border-style: solid; border-width: 1px;'>" +
				"<tr><td bgcolor='#212323'><center>Quick Message</center></td></tr>" +
				"<tr><td><table cellspacing='10' cellpadding='0' border='0' width='100%'>"

		for (var i = 0; i < table.length; i++) {
			textResult += "<tr><td>Msg " + (i+1) + " [<a onmouseover=\"Tip('Click on the message to append the template');\" href='#'>" +
				"<font color='white'>?</font></a>]:&nbsp;&nbsp;&nbsp;&nbsp;</td><td><span id='Helper.quickMsg" + i + "' quickMsgId=" + i + ">" +
				table[i].replace(/{playername}/g, targetPlayer) + "</span></td></tr>";
		}
		textResult += "<tr><td valign=top>Template: </td><td><textarea class=customtextarea rows=5 cols=40 id='Helper.quickMsgFullText'>" +
			JSON.stringify(table) + "</textarea></td></tr>" +
			"<tr><td align=center colspan=2><input class=custombutton type=button id='Helper.saveQuickMsg' value='Save Quick Message'></td></tr>" +
			"</table></td></tr></table>";

		var newNode = document.createElement("span");
		newNode.id = "spanQuickMsg";
		newNode.align = "center"
		newNode.innerHTML = textResult;
		injectHere.appendChild(newNode);

		document.getElementById("Helper.saveQuickMsg").addEventListener("click", Helper.saveQuickMsg, true);

		for (var i = 0; i < table.length; i++) {
			document.getElementById("Helper.quickMsg" + i).addEventListener("click", Helper.useQuickMsg, true);
		}
	},

	saveQuickMsg: function() {
		var quickMsg = document.getElementById("Helper.quickMsgFullText").value;
		try {
			JSON.parse(quickMsg);
		} catch (err) {
			alert("Not a valid template");
			return;
		}
		GM_setValue("quickMsg", quickMsg);
		var injectHere = System.findNode("//input[@value='Send Message']/../../../../../../../../..");
		injectHere.removeChild(document.getElementById("spanQuickMsg"));
		Helper.injectMessageTemplate();
	},

	useQuickMsg: function(evt) {
		var targetPlayer = System.findNode("//input[@name='target_player']").value;
		var quickMsgId = evt.target.getAttribute("quickMsgId");
		System.findNode("//textarea[@name='msg']").value +=
			System.getValueJSON("quickMsg")[quickMsgId].replace(/{playername}/g, targetPlayer) + "\n";
	},

	injectSelfBuff: function() {
		var body = document.getElementsByTagName("body").item(0);
		var skills = System.findNodes("//table[contains(@background, 'sigma2/skills/skillicon_bg')]");
		var passiveSkillREG = /^(?:Unique DNA|Bite Mutation|Claw Mutation|Tentacle Mutation|Chomp Mutation|Combat Training|Psionic Sensitivity|Psionic Dart|Psionic Bolt|Sword of Psi|Psionic Missile|Reinforce Skeleton|Port 1|Port 2|Socket Mk 1)$/
		// should change this regexp to check on id, but I prefer the skill name for easy correction, and regexp is fast anyways
		var result = "<table width=400 cellspacing=20 align=center>";
		var count = 0;
		for (var i = 0; i < skills.length; i++) {
			var skillId = System.getIntFromRegExp(skills[i].rows[2].cells[0].innerHTML, /skill_id=(\d+)"/i);
			var skillPoint = System.getIntFromRegExp(skills[i].rows[3].cells[0].innerHTML, />(\d+)</i);
			var skillName = skills[i].rows[1].cells[0].textContent;
			if (skillPoint > 0) {
				if (count % 2 == 0) result += "<tr>";
				result += "<td align=center width=50%><table width=100%><tr><td align=center>"+
						skills[i].parentNode.innerHTML.replace("/skillicon_bg_linked.gif", "/skillicon_bg.gif")+
						"</td></tr><tr><td align=center>";
				if (! passiveSkillREG.test(skillName)) {
					result += "<input class=custombutton type=button style='width:135px;' skillId="+skillId+" value='Activate on Self'/>";
				} else {
					result += "<span color='#ffff00'>Passive Skill</span>";
				}
				result += "</td></tr></table>";
				result += "</td>";
				if (count % 2 == 1) result += "</tr>";
				count ++;
			}
		}
		if (count % 2 == 1) result += "<td></td></tr>";
		result += "</table>";
		body.innerHTML = result;
		
		var buttons=System.findNodes("//input[@class='custombutton']");
		for (var i=0; i<buttons.length; i++){
			buttons[i].addEventListener("click", Helper.selfBuffClassSkill, true);
		}
	},
	
	selfBuffClassSkill: function(evt) {
		var skillId = parseInt(evt.target.getAttribute("skillId"));
		
		System.xmlhttp("index.php?cmd=skills&subcmd=cast&skill_id=" + skillId, 
				function(responseText) {
					var info = Layout.infoBox(responseText);
					evt.target.parentNode.innerHTML = info;
				});
	},

	injectStatCalculator: function(injectHere) {
		injectHere.innerHTML += "<span id=statCalculator><input type=button class=custombutton id=calculateStat value='Calculate Evolution Stat'></span>";
		document.getElementById('calculateStat').addEventListener('click',Helper.calculateStat, true);
	},

	calculateStat: function() {
		var node=System.findNode("//tr[td[b[contains(.,'Attack:')]]]");
		var atk=System.intValue(node.cells[3].textContent.replace(/\(.*$/g,''));
		var atk2=System.getIntFromRegExp(node.cells[3].textContent,/\((.*)\)/);
		atk-=atk2;
		var def=System.intValue(node.cells[7].textContent.replace(/\(.*$/g,''));
		var def2=System.getIntFromRegExp(node.cells[7].textContent,/\((.*)\)/);
		def-=def2;
		node=System.findNode("//tr[td[b[contains(.,'Armor:')]]]");
		var arm=System.intValue(node.cells[3].textContent.replace(/\(.*$/g,''));
		var arm2=System.getIntFromRegExp(node.cells[3].textContent,/\((.*)\)/);
		arm-=arm2;
		var dmg=System.intValue(node.cells[7].textContent.replace(/\(.*$/g,''));
		var dmg2=System.getIntFromRegExp(node.cells[7].textContent,/\((.*)\)/);
		dmg-=dmg2;
		node=System.findNode("//tr[td[b[contains(.,'HP:')]]]");
		var hp=System.intValue(node.cells[3].textContent.replace(/^.*\//g,'').replace(/\(.*$/g,''));
		var hp2=System.getIntFromRegExp(node.cells[3].textContent,/\((.*)\)/);
		hp-=hp2;

		var currentlyWorn=System.findNodes("//img[contains(@src,'/items/')]");
		Helper.playerItems=new Array();
		if (currentlyWorn)
			for (var i=0; i<currentlyWorn.length; i++) {
				if (currentlyWorn[i].src.indexOf('_x.gif')<0)
					Helper.playerItems.push(Helper.linkFromMouseover(currentlyWorn[i].getAttribute("onmouseover")));
			}

		Helper.playerStat=[atk,def,arm,dmg,hp];
		Helper.playerSets='';
		if (Helper.playerItems.length > 0)
			System.xmlhttp(Helper.playerItems[0], Helper.getPlayerItemStat, 1);
		else
			Helper.updatePlayerEvStat();
	},

	getPlayerItemStat: function(responseText, id) {
		var labels=['Attack:','Defense:','Armor:','Damage:','HP:'];
		var doc = System.createDocument(responseText);
		var setName=System.findNode("//table/tbody/tr/td",doc).textContent.replace(/ .*$/g,'');
		var mainStatTable = System.findNode("//tbody/tr/td/table[@width='100%']",doc);
		if (mainStatTable) mainStatTable = System.createDocument("<table>"+mainStatTable.innerHTML+"</html>");
		for (var i=0;i<labels.length;i++) {
			if (mainStatTable) {
				var node=System.findNode("//tr[td[.='" + labels[i] + "']]/td[2]",mainStatTable);
				if (node) {
					Helper.playerStat[i] -= System.intValue(node.textContent);
				}
			}
		}
		if (Helper.playerSets.indexOf(setName)<0) {
			Helper.playerSets += setName;
			var bonusStatTable = System.findNode("//table[tbody/tr/td/center[contains(.,'Set Details')]]",doc);
			if (bonusStatTable) {
				bonusStatTable = System.createDocument("<table>"+bonusStatTable.innerHTML+"</html>");
				for (var i=0;i<labels.length;i++) {
					var node=System.findNode("//tr[td[.='" + labels[i] + "']]/td[2]",bonusStatTable);
					if (node) {
						Helper.playerStat[i] -= System.intValue(node.textContent);
					}
				}
			}
		}

		if (id==Helper.playerItems.length)
			Helper.updatePlayerEvStat();
		else
			System.xmlhttp(Helper.playerItems[id], Helper.getPlayerItemStat, id+1);
	},

	updatePlayerEvStat: function() {
		for (var i=0;i<Helper.playerStat.length;i++)
			Helper.playerStat[i]=Math.round(Helper.playerStat[i]);
		var total=Helper.playerStat[0]+Helper.playerStat[1]+Helper.playerStat[2]+Helper.playerStat[3]+Helper.playerStat[4];
		var result="Atk: "+Helper.playerStat[0]+", Def: "+Helper.playerStat[1]+", Arm: "+Helper.playerStat[2] +
			", Dmg: "+Helper.playerStat[3]+", HP: "+Helper.playerStat[4]+", Total: "+total+
			"<br><span style='font-size:x-small'>(Evolution stats calculation are accurate only if all items are repaired to full durability)</span>";
		document.getElementById('statCalculator').innerHTML=result;
	},

	injectMailbox: function() {
		var items = System.findNodes("//a[contains(@href,'temp_id')]");
		if (items) {
			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				var itemHref = item.getAttribute('href');
				var itemTable = item.parentNode.parentNode.parentNode.parentNode.parentNode;
				itemTable.innerHTML += '<br><span style="cursor:pointer; text-decoration:underline; color:#D4FAFF; font-size:x-small;" '+
					'id="Helper:recallMailboxItem' + i + '" ' +
					'itemHref="' + itemHref + '">Fast Take</span>';
				document.getElementById('Helper:recallMailboxItem' + i)
					.addEventListener('click', Helper.recallMailboxItem, true);
			}
			var titleTable = System.findNode("//table[contains(@background,'/large_content_bg.jpg')]/tbody/tr/td/table/tbody/tr/td[contains(.,'Item Mailbox')]");
			titleTable.innerHTML += '<br><table width=100%><tr><td align=center><span id="Helper:recallAllMailbox" '+
				'style="cursor:pointer; text-decoration:underline; color:#D4FAFF; font-size:x-small;">Take All</span>'+
				'</td></tr></table>';
			document.getElementById('Helper:recallAllMailbox')
				.addEventListener('click', Helper.recallAllMailbox, true);
		}
	},
	
	recallAllMailbox: function(evt) {
		var mailItems = System.findNodes("//span[contains(@id,'Helper:recallMailboxItem')]");
		for (var i = 0; i < mailItems.length; i++) {
			var mailItem = mailItems[i];
			var mailboxItemHref = mailItem.getAttribute("itemHref");
			System.xmlhttp(mailboxItemHref,
				Helper.recallMailboxReturnMessage,
				{"target": mailItem});
		}
	},

	recallMailboxItem: function(evt) {
		var mailboxItemHref = evt.target.getAttribute("itemHref");
		System.xmlhttp(mailboxItemHref,
			Helper.recallMailboxReturnMessage,
			{"target": evt.target});
	},

	recallMailboxReturnMessage: function(responseText, callback) {
		var target = callback.target;
		var info = Layout.infoBox(responseText);
		target.style.cursor = 'default';
		target.style.textDecoration = 'none';
		if (info.search("Item was transferred to your backpack") != -1) {
			target.style.color = 'green';
			target.style.fontWeight = 'bold';
			target.style.fontSize = 'small';
			target.innerHTML = "Taken";
		} else {
			target.style.color = 'red';
			target.style.fontWeight = 'bold';
			target.style.fontSize = 'small';
			target.innerHTML = "Error:" + info;
		}
	},

	injectAuctionQuickCancel: function() {
		if (location.search == '?cmd=auctionhouse' != -1 && location.search == '&type=-2' != -1) {
			var cancelButtons = System.findNodes("//img[@title='Cancel Auction']");
			if (cancelButtons) {
				for (var i = 0; i < cancelButtons.length; i++) {
					var cancelButton = cancelButtons[i];
					var cancelButtonHref = cancelButton.parentNode.getAttribute('href');
					var cancelButtonCellElement = cancelButton.parentNode.parentNode.parentNode;
					cancelButtonCellElement.style.textAlign = 'center';
					cancelButtonCellElement.innerHTML += '<br><br><span style="cursor:pointer; text-decoration:underline; color:D4FAFF; font-size:x-small;" '+
						'id="Helper:cancelAuctionItem' + i + '" ' +
						'cancelButtonHref="' + cancelButtonHref + '">Fast Cancel</span>';
					document.getElementById('Helper:cancelAuctionItem' + i)
						.addEventListener('click', Helper.cancelAuctionItem, true);
				}
			}
		}
	},

	cancelAuctionItem: function(evt) {
		var cancelButtonHref = evt.target.getAttribute("cancelButtonHref");
		System.xmlhttp(cancelButtonHref,
			Helper.cancelAuctionReturnMessage,
			{"target": evt.target});
	},

	cancelAuctionReturnMessage: function(responseText, callback) {
		var target = callback.target;
		var info = Layout.infoBox(responseText);
		target.style.cursor = 'default';
		target.style.textDecoration = 'none';
		if (info.search("You cancelled your auction") != -1) {
			target.style.color = 'green';
			target.style.fontWeight = 'bold';
			target.style.fontSize = 'small';
			target.innerHTML = "Cancelled";
		} else {
			target.style.color = 'red';
			target.style.fontWeight = 'bold';
			target.style.fontSize = 'small';
			target.innerHTML = "Error:" + info;
		}
	},
	
	injectPoints: function() {
		Helper.currentFSP = System.findNode("//td[@width=108 and //table[@height=150]]").textContent.replace(/,/g,"")*1;
		
		var stamForFSPElement = System.findNode("//td[@width='40%' and contains(.,'+25 Current Energy')]/../td[4]");
		var stamForFSPInjectHere = System.findNode("//td[@width='40%' and contains(.,'+25 Current Energy')]");
		var stamFSPTextField = System.findNode("table/tbody/tr/td/input[@name='quantity']", stamForFSPElement);
		stamFSPTextField.type='current';
		stamFSPTextField.addEventListener('keyup', Helper.updateStamCount, true);
		stamForFSPInjectHere.innerHTML += ' <span style="color:blue" id="totalStam" type="current"><span>';

		var stamForFSPElement = System.findNode("//td[@width='40%' and contains(.,'+10 Maximum Energy')]/../td[4]");
		var stamForFSPInjectHere = System.findNode("//td[@width='40%' and contains(.,'+10 Maximum Energy')]");
		var stamFSPTextField = System.findNode("table/tbody/tr/td/input[@name='quantity']", stamForFSPElement);
		stamFSPTextField.type='maximum';
		stamFSPTextField.addEventListener('keyup', Helper.updateStamCount, true);
		stamForFSPInjectHere.innerHTML += ' <span style="color:blue" id="totalStam" type="maximum"><span>';
		
		var goldForFSPElement = System.findNode("//td[@width='40%' and contains(.,'+1,000')]/../td[4]");
		goldForFSPElement.innerHTML = '<a href="' + System.server + '?cmd=marketplace">Sell at Crystal Market</a>';
	},
	
	updateStamCount: function(evt) {
		var FSPvalue = evt.target.value*1;
		var type = evt.target.getAttribute("type");
		var injectHere = System.findNode("//span[@id='totalStam' and @type='"+type+"']");
		//cap the value if the user goes over his current FSP
		var color = 'red';
		var extraStam = Helper.currentFSP*(type=='current'?25:10);
		if (FSPvalue <= Helper.currentFSP) {
			extraStam = FSPvalue*(type=='current'?25:10);
			color = 'blue';
		}
		injectHere.style.color = color;
		if (extraStam > 0)
			injectHere.innerHTML = '(+' + extraStam + ' stamina)';
		else 
			injectHere.innerHTML = '';
	},
	
	injectSaveConfig: function() {
		var injectHere=Layout.notebookContent();
		Helper.defaultLabels='auctionTemplate, chatTopToBottom, doNotKillList, enableBioCompressor, enableCreatureColoring, '+
			'enableGuildOnlineList, enableLogColoring, footprints, footprintsColor, goldAmount, goldConfirm, goldRecipient, '+
			'guildEnmy, guildEnmyMessage, guildFrnd, guildFrndMessage, guildOnlineRefreshTime, guildPast, guildPastMessage, '+
			'guildSelf, guildSelfMessage, hideKrulPortal, hideMatchesForCompletedMoves, hideNewBox, hideQuestNames, hideQuests, '+
			'hideRecipeNames, hideRecipes, huntingBuffs, invMaxLvlFilter, keepLogs, krulXCV, '+
			'maxCompressedCharacters, maxCompressedLines, minPSStats, monsterLog, moveFSBox, '+
			'onlinePlayerMaxLvl, onlinePlayerMinLvl, quickKill, quickMsg, quickSearchList, quickWearFilter, sendGoldonWorld, '+
			'showCombatLog, showCompletedQuests, showCreatureInfo, showExtraLinks, showHuntingBuffs, quickUseItems';
		injectHere.innerHTML='<table cellspacing="0" cellpadding="0" border="0" width="100%"><tr style="background-color:#110011">'+
			'<td nobr colspan=2><b>&nbsp;Settings Manager</b></td></tr>'+
			'<tr><td width=20% valign=top>&nbsp;Setting labels:</td><td align=center>'+
			'<textarea name=stlabels id=stlabels cols=60 rows=5 class=customtextarea>'+
			Helper.defaultLabels+'</textarea></td></tr>'+
			'<tr><td valign=top>&nbsp;Setting contents:</td><td align=center><textarea name=stcontents id=stcontents cols=60 rows=10 class=customtextarea>'+
			'</textarea></td></tr>'+
			'<tr><td></td><td align=center><input type=button value="Export Current Settings" id=loadSettings class=custombutton onmouseover="Tip(\'Load settings from this machine\');">&nbsp;'+
			'<input type=button value="Import New Settings" id=saveSettings class=custombutton onmouseover="Tip(\'Save the given setting content to this machine\');">&nbsp;'+
			'<input type=button value="Extract Labels" id=extractLabels class=custombutton onmouseover="Tip(\'Extract labels from the given setting content\');"></td></tr>'+
			'</table>'+
			'Instruction:<br>'+
			'<b>First machine</b><br/>'+
			'1. Click on Export Current Settings to load the settings on this computer to the Setting Contents<br>'+
			'2. Copy and paste the Setting Contents to a file/email and send to yourself<br>'+
			'<b>New machine</b><br/>'+
			'1. Get the new Settings Contents from a file/email, paste into the Setting Contents field<br/>'+
			'2. Click on Import New Settings<br/>';
		document.getElementById('loadSettings').addEventListener('click',Helper.loadCurrentSettings,true);
		document.getElementById('saveSettings').addEventListener('click',Helper.saveNewSettings,true);
		document.getElementById('extractLabels').addEventListener('click',Helper.extractLabelsFromSettings,true);
	},
	
	loadCurrentSettings: function() {
		var saveObj={'config':{},'checksum':0};
		var labelStr=document.getElementById('stlabels').value;
		if (labelStr=='') labelStr=Helper.defaultLabels;
		labelStr=labelStr.replace(/ +/g,'');
		var labels=labelStr.split(',');
		for (var i=0; i<labels.length; i++) {
			var key=labels[i];
			if (GM_getValue(key)==undefined) continue;
			saveObj.config[key]=GM_getValue(key);
		}
		saveObj.checksum=Helper.crc32(JSON.stringify(saveObj.config));
		document.getElementById('stcontents').value=JSON.stringify(saveObj);
	},
	
	saveNewSettings: function() {
		var saveObj = document.getElementById("stcontents").value;
		try { JSON.parse(saveObj); }
		catch (err) {
			alert("Not a valid setting content");
			return;
		}
		saveObj=JSON.parse(saveObj);
		if (saveObj.checksum!=Helper.crc32(JSON.stringify(saveObj.config))) {
			if (! window.confirm("Config text has been altered, are you sure you want to import the config?")) return;
		}
		var labelStr=document.getElementById('stlabels').value;
		if (labelStr=='') {
			for (var key in saveObj.config) {
				GM_setValue(key,saveObj.config[key]);
			}
			alert("New settings imported");
		} else {
			labelStr=labelStr.replace(/ +/g,'');
			var labels=labelStr.split(',');
			for (var i=0; i<labels.length; i++) {
				var key=labels[i];
				if (saveObj.config[key]==undefined) continue;
				GM_setValue(key,saveObj.config[key]);
			}
			alert("New settings with given labels imported");
		}
	},
	
	crc32: function(str) {
		var table = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";
		crc=0;
		var x = 0;
		var y = 0;
		crc = crc ^ (-1);
		for( var i = 0, iTop = str.length; i < iTop; i++ ) {
			y = ( crc ^ str.charCodeAt( i ) ) & 0xFF;
			x = "0x" + table.substr( y * 9, 8 );
			crc = ( crc >>> 8 ) ^ x;
		}
		return crc ^ (-1);
	},
	
	extractLabelsFromSettings: function() {
		var saveObj = document.getElementById("stcontents").value;
		try { JSON.parse(saveObj); }
		catch (err) {
			alert("Not a valid setting content");
			return;
		}
		saveObj=JSON.parse(saveObj);
		var output='';
		for (var key in saveObj.config) {
			output+=key+', ';
		}
		document.getElementById('stlabels').value=output.replace(/, $/,'');
	},
	
	prepareAllyEnemyList: function() {
		if (GM_getValue("enableAllyOnlineList") || GM_getValue("enableEnemyOnlineList")) {
			if (!Helper.rightSideBar) return;
			var info = Helper.rightSideBar.insertRow(0);
			var cell = info.insertCell(0);
			cell.innerHTML="<span id='Helper:AllyEnemyListPlaceholder'></span>";
			Helper.retrieveAllyEnemyData(false);
		}
	},

	retrieveAllyEnemyData: function(refreshAllyEnemyDataOnly) {
		var contactList = System.getValueJSON("contactList");
		var allyEnemyOnlineRefreshTime = GM_getValue("allyEnemyOnlineRefreshTime");
		allyEnemyOnlineRefreshTime *= 1000;
		if (contactList) {
			if ((new Date()).getTime() - contactList.lastUpdate.getTime() > allyEnemyOnlineRefreshTime) contactList = null; // invalidate cache
		}

		if (!contactList || refreshAllyEnemyDataOnly) {
			System.xmlhttp("index.php?cmd=profile", Helper.parseProfileForWorld, refreshAllyEnemyDataOnly);
		} else {
			var contactList = System.getValueJSON("contactList");
			contactList.isRefreshed = false;
			Helper.injectAllyEnemyList(contactList);
		}
	},

	parseProfileForWorld: function(details, refreshAllyEnemyDataOnly) {
		var doc=System.createDocument(details);
		var alliesParent = System.findNode("//td[contains(@background, 'sigma2/inventory/allies_head.jpg')]",doc);
		var alliesTable = alliesParent.parentNode.nextSibling.nextSibling.nextSibling.nextSibling;
		var enemiesParent = System.findNode("//td[contains(@background, 'sigma2/inventory/enemies_head.jpg')]",doc);
		var enemiesTable = enemiesParent.parentNode.nextSibling.nextSibling.nextSibling.nextSibling;
		
		var contactList = System.getValueJSON("contactList");
		if (!contactList) {
			contactList = {};
			contactList.contacts = [];
		}
		contactList.contacts.forEach(function(e) {e.status="Deleted"});
		
		if (alliesTable && enemiesTable) {
			Helper.processAllyEnemyTable(contactList,alliesTable,"Ally");
			Helper.processAllyEnemyTable(contactList,enemiesTable,"Enemy");
			
			// remove not existing players
			contactList.contacts = contactList.contacts.filter(function(e) {return e.status!="Deleted"});
			// damn, I love javascript array functions :)

			contactList.lastUpdate = new Date();
			contactList.isRefreshed = true;
			System.setValueJSON("contactList", contactList);
			if (!refreshAllyEnemyDataOnly) Helper.injectAllyEnemyList(contactList);
		}
	},
	
	processAllyEnemyTable: function(contactList,table, lable) {
		var enemiesDetails=System.findNodes('//table[@cellpadding=1]',System.createDocument(table.innerHTML));
		if (!enemiesDetails) return;
		for (var i=0;i<enemiesDetails.length;i++) {
			var aTable = enemiesDetails[i];
			var contactLink   = aTable.rows[0].cells[1].firstChild;
			var contactId     = System.intValue((/[0-9]+$/).exec(contactLink.href)[0]);
			var contactName   = contactLink.textContent;
			var contactStatus = aTable.rows[0].cells[0].firstChild.title;

			var aContact;

			// find contact in contact list, to modify data instead of replacing it

			var findContacts = contactList.contacts.filter(function (e) {return e.id==contactId});
			if (findContacts.length>0) {
				aContact = findContacts[0];
			}
			else { // contact was not found, must be new
				aContact = {};
				// You can still modify an object, even if you have added it to something else
				contactList.contacts.push(aContact);
				aContact.firstSeen = new Date();
				aContact.status = "Offline"; // new players are supposed to be offline
			}

			if (aContact.status == "Offline" && contactStatus=="Online") {
				aContact.loggedInAt = new Date();
			}

			if (!aContact.loggedInAt) {
				aContact.loggedInAt = new Date();
			}

			aContact.status = contactStatus;
			aContact.id     = contactId;
			aContact.name   = contactName;
			aContact.type   = lable;
		}
	},
	
	injectAllyEnemyList: function(contactList) {
		enableAllyOnlineList = GM_getValue("enableAllyOnlineList");
		enableEnemyOnlineList = GM_getValue("enableEnemyOnlineList");
		if (!enableAllyOnlineList && !enableEnemyOnlineList) return;
		var onlineAlliesEnemies = contactList.contacts.filter(function (e) {return (e.status=="Online")})
		if (!enableAllyOnlineList) onlineAlliesEnemies = onlineAlliesEnemies.filter(function (e) {return (e.type!="Ally")})
		if (!enableEnemyOnlineList) onlineAlliesEnemies = onlineAlliesEnemies.filter(function (e) {return (e.type!="Enemy")})
		if (onlineAlliesEnemies.length == 0) return;
		var playerId = Layout.playerId();
		var injectHere = document.getElementById("Helper:AllyEnemyListPlaceholder");
		var displayList = document.createElement("TABLE");
		displayList.style.border = "1px solid gray";
		displayList.style.backgroundColor = (contactList.isRefreshed)?"#151f1e":"#112322";
		displayList.cellPadding = 1;
		displayList.width = 125;

		var aRow=displayList.insertRow(displayList.rows.length);
		var aCell=aRow.insertCell(0);
		var output = "<ol style='color:#FFF380;font-size:10px;list-style-type:decimal;margin-left:1px;margin-top:1px;margin-bottom:1px;padding-left:20px;'>"+
			"Allies/Enemies <a id='Helper:resetAllyEnemyList' style='color:cyan; font-size:8px; cursor:pointer; text-decoration:underline;'"+
			" onmouseover=\"tt_setWidth(105);Tip('Reset List');\">R</a>";
		for (var i=0;i<onlineAlliesEnemies.length;i++) {
			var contact=onlineAlliesEnemies[i];
			output += "<li style='padding-bottom:0px;'>"
			output += "<a style='color:#CCFF99;font-size:10px;' "
			output += Layout.quickBuffHref(contact.id) + ">[b]</a>&nbsp;";
			if (contact.id!=playerId) {
				output += "<a style=\"color:#A0CFEC;font-size:10px;\" "
				output += "href=\"" + System.server + "index.php?cmd=message&target_player=" + contact.name + "\">[m]";
				output += "</a>";
			}
			else {
				output += "<span style='color:" + displayList.style.backgroundColor + ";'>[m]</span>";
			}
			output += "&nbsp;<a onmouseover=\"tt_setWidth(105);";
			output += "Tip('<div style=\\'text-align:center;width:105px;\\'>Logged in:" + contact.loggedInAt.toFormatString("ddd HH:mm");
			output += "</div>');\" ";
			output += "style='color:"
			if (((new Date()) - contact.loggedInAt) < 30000) { // just logged in
				output += "orange";
			}
			else if (contact.type == "Ally") {
				output += "DodgerBlue";
			}
			else if (contact.type == "Enemy") {
				output += "red";
			}
			else {
				output += "white";
			}
			output += ";font-size:10px;'"
			output += " href='" + System.server + "index.php?cmd=profile&player_id=" + contact.id + "'>" + contact.name + "</a>";
			// output += "<br/>"
			output += "</li>"
		}
		output += "</ol>";
		aCell.innerHTML = output;
		var breaker=document.createElement("BR");
		injectHere.parentNode.insertBefore(breaker, injectHere.nextSibling);
		injectHere.parentNode.insertBefore(displayList, injectHere.nextSibling);
		document.getElementById('Helper:resetAllyEnemyList').addEventListener('click', Helper.resetAllyEnemyList, true);		
	},

	resetAllyEnemyList: function(evt) {
		GM_setValue("contactList","");
		window.location = window.location;
	},
	
	injectCreateAuctionBulkSell: function() {
		if (window.location.search.search("inv_id") == -1) return;
		var enableBulkSell = GM_getValue("enableBulkSell");
		if (!enableBulkSell) return;
		
		var auctionTable = System.findNode("//table[tbody/tr/td/a[@href='index.php?cmd=auctionhouse&subcmd=create']]");
		if (!auctionTable) return;

		var newRow = auctionTable.insertRow(7);
		var newCell = newRow.insertCell(0);
		newCell = newRow.insertCell(0);
		newCell.colSpan = 2;
		newCell.align = "center";		

		var textResult = "<table cellspacing='0' cellpadding='0'" +
				" border='0' align='center' width='550'>" +
				"<tr><td bgcolor='#212323'><center>Bulk Auction List</center></td></tr>" +
				"<tr><td align='center'><table cellspacing='10' cellpadding='0' border='0' width='100%'>" +
				"<tr><th bgcolor='#212323'>Length</th><th bgcolor='#212323'>Currency</th>"+
				"<th bgcolor='#212323'>Min Bid</th><th bgcolor='#212323'>Buy Now</th>"+
				"<th></th></tr>";

			textResult += "<tr align='right'>"+
				"<td><select id='Helper:bulkSellAuctionLength'><option value='0' selected>1 Hour</option><option value='1' >2 Hours</option>"+
					"<option value='2' >4 Hours</option><option value='3' >8 Hours</option><option value='4' >12 Hours</option>"+
					"<option value='5' >24 Hours</option><option value='6' >48 Hours</option></select></td>"+
				"<td><select id='Helper:bulkSellAuctionCurrency'><option value='0' >Credits</option><option value='1' selected>FC</option></select></td>"+
				"<td><input type='text' class='custominput' size='6' id='Helper:bulkSellMinBid'/></td>"+
				"<td><input type='text' class='custominput' size='6' id='Helper:bulkSellBuyNow'/></td>"+
				"<td>[<span style='cursor:pointer; text-decoration:underline; color:blue;' "+
					"id='Helper:bulkListAll'>bulk list all</span>]</td></tr>";

		textResult += "</table></td></tr>";
		
		textResult += "<tr><td align='center'><table id='Helper:CreateAuctionBulkSellTable' cellspacing='10' cellpadding='0' border='0' width='100%'";
		
		textResult += "</table></td></tr>";
		
		textResult += "</table>";

		newCell.innerHTML = textResult;
		
		var itemStats = /inv_id=(\d+)&.*&imgid=([0-9a-z]+)&/.exec(window.location.search);
		var invID = itemStats[1];
		var itemID = itemStats[2];
		
		System.xmlhttp("index.php?cmd=profile&subcmd=dropitems&fromworld=1", Helper.processAuctionBulkSellItems, {"itemID":itemID,"invID":invID}); 
		document.getElementById('Helper:bulkListAll').addEventListener('click', Helper.bulkListAll, true);		
	},
	
	processAuctionBulkSellItems: function(responseText, callback) {
		var originalItemID = callback.itemID;
		var originalInvID = callback.invID;

		var bulkSellTable = System.findNode("//table[@id='Helper:CreateAuctionBulkSellTable']");

		var doc=System.createDocument(responseText);
		var bulkAuctionItemIMGs = System.findNodes("//img[@src='"+System.imageServer+"/items/"+originalItemID+".gif']", doc);
		if (!bulkAuctionItemIMGs) return; 
		var maxAuctions = GM_getValue("maxAuctions");
		if (!maxAuctions) maxAuctions = 2;
		
		for (var i=0;i<bulkAuctionItemIMGs.length;i++) {
			var bulkItemIMG = bulkAuctionItemIMGs[i];
			var bulkItemMouseover = bulkItemIMG.getAttribute("onmouseover");
			var itemStats = /ajaxLoadItem\((\d+), (\d+), (\d+), (\d+)/.exec(bulkItemMouseover);
			var itemId = itemStats[1];
			var invId = itemStats[2];
			if ((i % 3 == 0)) newRow = bulkSellTable.insertRow(-1);;
			//var newRow = bulkSellTable.insertRow(-1);
			var newCell = newRow.insertCell(-1);
			newCell.innerHTML = "<center>"+bulkItemIMG.parentNode.innerHTML+"</center>";
			newCell = newRow.insertCell(-1);
			newCell.innerHTML = '<span id="Helper:bulkListSingle'+invId+'" itemInvId="'+invId+'" style="cursor:pointer; text-decoration:underline; color:blue;fontSize=x-small;">auction single</span>';
			document.getElementById('Helper:bulkListSingle'+invId).addEventListener('click', Helper.bulkListSingle, true);
			if ((i+2) > maxAuctions && (i+1) != bulkAuctionItemIMGs.length) {
				var newRow = bulkSellTable.insertRow(-1);
				var newCell = newRow.insertCell(0);
				newCell.innerHTML = "You only have " + maxAuctions + " auction slots.";
				break;
			}
		}
	},
	
	bulkListAll: function() {
		var bulkSellAuctionLength = System.findNode("//select[@id='Helper:bulkSellAuctionLength']");
		var bulkSellAuctionCurrency = System.findNode("//select[@id='Helper:bulkSellAuctionCurrency']");
		var bulkSellAuctionMinBid = System.findNode("//input[@id='Helper:bulkSellMinBid']");
		var bulkSellAuctionBuyNow = System.findNode("//input[@id='Helper:bulkSellBuyNow']");

		var potentialAuctions = System.findNodes("//span[contains(@id,'Helper:bulkListSingle')]");
		for (var i=0;i<potentialAuctions.length;i++) {
			var potentialAuction = potentialAuctions[i];
			var invID = /Helper:bulkListSingle(\d+)/.exec(potentialAuction.getAttribute("id"))[1];
			var bulkSellHref = "index.php?cmd=auctionhouse&subcmd=docreate&inv_id=" + invID + 
				"&auction_length=" + bulkSellAuctionLength.value + "&currency=" + bulkSellAuctionCurrency.value +
				"&minbid=" + bulkSellAuctionMinBid.value + "&buynow=" + bulkSellAuctionBuyNow.value;
			System.xmlhttp(bulkSellHref,
				Helper.bulkListSingleReturnMessage,
				{"target": potentialAuction});
		}
	},
	
	bulkListSingle: function(evt) {
		var itemInvId = evt.target.getAttribute("itemInvId");
		var bulkSellAuctionLength = System.findNode("//select[@id='Helper:bulkSellAuctionLength']");
		var bulkSellAuctionCurrency = System.findNode("//select[@id='Helper:bulkSellAuctionCurrency']");
		var bulkSellAuctionMinBid = System.findNode("//input[@id='Helper:bulkSellMinBid']");
		var bulkSellAuctionBuyNow = System.findNode("//input[@id='Helper:bulkSellBuyNow']");

		var bulkSellHref = "index.php?cmd=auctionhouse&subcmd=docreate&inv_id=" + itemInvId + 
			"&auction_length=" + bulkSellAuctionLength.value + "&currency=" + bulkSellAuctionCurrency.value +
			"&minbid=" + bulkSellAuctionMinBid.value + "&buynow=" + bulkSellAuctionBuyNow.value;
		System.xmlhttp(bulkSellHref,
			Helper.bulkListSingleReturnMessage,
			{"target": evt.target});
	},
	
	bulkListSingleReturnMessage: function(responseText, callback) {
		var target = callback.target;
		var info=Layout.infoBox(responseText);
		target.innerHTML = info;
		target.style.color=(info.search("Auction placed successfully!") != -1)?"green":"red";
		target.style.cursor='';
		target.removeEventListener('click', Helper.bulkListSingle, true);		
	}
};

Helper.onPageLoad(null);
