// ==UserScript==
// @name           FallenSwordHelper
// @namespace      terrasoft.gr
// @description    Fallen Sword Helper
// @include        http://www.fallensword.com/*
// @include        http://fallensword.com/*
// ==/UserScript==

var fsHelper = {
	init: function(e) {
		this.initialized = true;
		fsHelper.beginAutoUpdate();
	},

	beginAutoUpdate: function() {
		var lastCheck=GM_getValue("lastVersionCheck")
		var now=(new Date()).getTime()
		if (!lastCheck) lastCheck=0;
		var haveToCheck=(now - lastCheck > 24*60*60*1000)

		if (haveToCheck) {
			GM_log("Checking for new version...")
			GM_setValue("lastVersionCheck", now.toString())
			GM_xmlhttpRequest({
				method: 'GET',
				url: "http://userscripts.org/scripts/versions/34343",
				headers: {
					"User-Agent" : navigator.userAgent,
					// "Content-Type": "application/x-www-form-urlencoded",
					"Cookie" : document.cookie
				},
				onload: function(responseDetails) {
					fsHelper.autoUpdate(responseDetails);
				},
			})
		}
	},

	autoUpdate: function(responseDetails) {
		if (responseDetails.status!=200) return;
		var now=(new Date()).getTime()
		GM_setValue("lastVersionCheck", now.toString());
		var currentVersion=GM_getValue("currentVersion");
		if (!currentVersion) currentVersion=0;
		var versionRE=/\<h3\>\n\s*([0-9]+)\s*versions/;
		var latestVersion=responseDetails.responseText.match(versionRE)[1]
		if (currentVersion!=latestVersion) {
			if (window.confirm("New version (" + latestVersion + ") found. Update from version " + currentVersion + "?")) {
				GM_setValue("currentVersion", latestVersion)
				document.location="http://userscripts.org/scripts/source/34343.user.js";
			}
		}
	},

	getValueJSON: function(name) {
		var resultJSON=GM_getValue(name);
		var result;
		if (resultJSON) {
			result = JSON.parse(resultJSON);
		}
		return result;
	},

	findNode: function(xpath, id, doc) {
			if (!doc) {
				doc=document;
			}
			var findQ = document.evaluate(xpath, doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			if (findQ.snapshotLength>0) {
				if (!id) id=0;
				return findQ.snapshotItem(id);
			}
			else {
				return null;
			}
	},

	findNodes: function(xpath, doc) {
			if (!doc) {
				doc=document;
			}
			var nodes=new Array();
			var findQ = document.evaluate(xpath, doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
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

	createDocument: function(details) {
		var doc=document.createElement("HTML");
		doc.innerHTML=details;
		return doc
	},

	onPageLoad: function(anEvent) {
		fsHelper.init();
		fsHelper.prepareGuildList();
		var re=/cmd=([a-z]+)/;
		var pageId = re.exec(document.location.search)[1];

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

		switch (pageId) {
		case "settings":
			fsHelper.injectSettings();
			break;
		case "world":
			// fsHelper.mapThis();
			fsHelper.killAllMonsters();
			break;
		case "profile":
			switch (subPageId) {
			case "dropitems":
				fsHelper.injectDropItems();
				break;
			default:
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
						fsHelper.injectDropItems();
				}
				break;
			case "chat":
				fsHelper.injectChat();
				break;
			}
			break;
		case "bank":
			fsHelper.injectBank();
			break;
		}
	},

	mapThis: function() {
		var realm = fsHelper.findNode("//td[@background='http://66.7.192.165/skin/realm_top_b2.jpg']/center/nobr/b");
		var posit = fsHelper.findNode("//td[@background='http://66.7.192.165/skin/realm_top_b4.jpg']/center/nobr/font");
		if ((realm) && (posit)>0) {
			var position=posit.innerHTML;
			var levelName=realm.innerHTML;
			var positionRE=/\((\d+),\s*(\d+)\)/
			var positionX = parseInt(position.match(positionRE)[1]);
			var positionY = parseInt(position.match(positionRE)[2]);
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
		}
	},

	killAllMonsters: function() {
		if (!GM_getValue("killAll")) return;
		var kills=0;
		for (var i=1; i<=8; i++) {
			var linkId="//a[@id='attackLink" + i + "']"
			var monster = fsHelper.findNode(linkId);
			if (monster) {
				kills+=1;
				var href=monster.href;
				GM_xmlhttpRequest({
					method: 'GET',
					callbackId: linkId,
					url: href,
					headers: {
						"User-Agent" : navigator.userAgent,
						// "Content-Type": "application/x-www-form-urlencoded",
						"Cookie" : document.cookie
					},
					onload: function(responseDetails, callbackId) {
						fsHelper.killedMonster(responseDetails, this.callbackId);
					},
				})
			}
		}
		if (kills>0) {
			GM_xmlhttpRequest({
				method: 'GET',
				url: "http://www.fallensword.com/index.php?cmd=blacksmith&subcmd=repairall&fromworld=1",
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

	killedMonster: function(responseDetails, callbackId) {
		// GM_log(responseDetails.responseHeaders+"\n"+responseDetails.responseText);
		// GM_log(responseDetails.responseHeaders)
		// GM_log(responseDetails.responseText);
		// GM_log(callbackId);
		try {
			var reportRE=/var\s+report=new\s+Array;\n(report\[[0-9]+\]="[^"]+";\n)*/;
			// '"
			// GM_log(responseDetails.responseText.match(reportRE)[0]);

			var playerIdRE = /http:\/\/www.fallensword.com\/\?ref=(\d+)/
			var playerId=document.body.innerHTML.match(playerIdRE)[1];

			var xpGain=responseDetails.responseText.match(/var\s+xpGain=([0-9]+);/)[1];
			var goldGain=responseDetails.responseText.match(/var\s+goldGain=([0-9]+);/)[1];
			var guildTaxGain=responseDetails.responseText.match(/var\s+guildTaxGain=([0-9]+);/)[1];
			var lootRE=/You looted the item '<font color='(\#[0-9A-F]+)'>([^<]+)<\/font>'<\/b><br><br><img src=\"http:\/\/[0-9.]+\/items\/(\d+).gif\"\s+onmouseover="ajaxLoadCustom\([0-9]+,\s-1,\s+([0-9a-f]+),\s+[0-9]+,\s+''\);\">/
			// <b>You looted the item '<font color='#009900'>Shield of Votintown</font>'</b><br><br><img src="http://66.7.192.165/items/857.gif" onmouseover="ajaxLoadCustom(857, -1, d5b356b45146a64a7d322d48ff98b7cb, 1393340, '');"><br><br><font size=1>Note: Item stats may be higher due to crafting bonuses - check in your inventory.</font></div></td>
			// '"
			var lootMatch=responseDetails.responseText.match(lootRE)
			var lootedItem = "";
			var lootedItemId = "";
			var lootedItemVerify="";
			if (lootMatch && lootMatch.length>0) {
				lootedItem=lootMatch[2];
				lootedItemId=lootMatch[3];
				lootedItemVerify=lootMatch[4];
				GM_log(lootMatch);
				GM_log(lootMatch[3]);
				GM_log(lootMatch[4]);
			}

			var monster = fsHelper.findNode(callbackId);
			if (monster) {
				var resultText="<small><small>"+callbackId.replace(/\D/g,"")+". XP:" + xpGain + " Gold:" + goldGain + " (" + guildTaxGain + ")</small></small>";
				if (lootedItem!="") {
					// I've temporarily disabled the ajax thingie, as it doesn't seem to work anyway.
					resultText += "<br/><small><small>Looted item:<span onmouseoverDISABLED=\"ajaxLoadCustom(" + lootedItemId + ", -1, '" + lootedItemVerify + "', " + playerId + ", '');\" >" + lootedItem + "</span></small></small>"
				}
				monster.parentNode.innerHTML=resultText;
			}
		}
		catch (ex) {
			GM_log(ex);
			GM_log(responseDetails.responseText);
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
				url: "http://www.fallensword.com/index.php?cmd=guild&subcmd=manage",
				headers: {
					"User-Agent" : navigator.userAgent,
					"Content-Type": "application/x-www-form-urlencoded",
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
			for (var i=0;i<membersDetails.rows.length;i++) {
				var aRow = membersDetails.rows[i];
				if (aRow.cells.length==5 && aRow.cells[0].firstChild.title) {
					var aMember = new Object;
					aMember.status = aRow.cells[0].firstChild.title;
					aMember.id = (/[0-9]+$/).exec(aRow.cells[1].firstChild.nextSibling.href)[0]
					aMember.name=aRow.cells[1].firstChild.nextSibling.innerHTML;
					aMember.level=aRow.cells[2].innerHTML;
					aMember.rank=aRow.cells[3].innerHTML;
					aMember.xp=aRow.cells[4].innerHTML;
					memberList.members.push(aMember);
				}
			}
			memberList.changedOn = new Date().getTime();
			memberList.isRefreshed = true;
			fsHelper.injectGuildList(memberList);
		}
	},

	injectChat: function() {

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

		var playerIdRE = /http:\/\/www.fallensword.com\/\?ref=(\d+)/
		var playerId=document.body.innerHTML.match(playerIdRE)[1];

		GM_setValue("memberlist", JSON.stringify(memberList));
		var injectHere = document.getElementById("fsHelperPlaceholderWorld");
		// injectHere.innerHTML=memberList.length;
		var displayList = document.createElement("TABLE");
		displayList.style.border = "1px solid #c5ad73";
		displayList.style.backgroundColor = "#4a3918";
		displayList.cellPadding = 1;
		displayList.width = 125;

		if (memberList.isRefreshed) {
			displayList.style.backgroundColor = "#6a5938";
		}

		var aRow=displayList.insertRow(displayList.rows.length);
		var aCell=aRow.insertCell(0);
		var output = "<ol style='color:white;font-size:10px;list-style-type:decimal;margin-left:1px;'>"
		for (var i=0;i<memberList.members.length;i++) {
			var member=memberList.members[i];
			if (member.status=="Online") {
				if (memberList.isRefreshed) {
					fsHelper.getFullPlayerData(member);
				}
				output += "<li>"
				output += "<a style='color:white;font-size:10px;' "
				output += "href=\"javascript:openWindow('index.php?cmd=quickbuff&tid=" + member.id + "', 'fsQuickBuff', 618, 500, 'scrollbars')\">[b]</a>&nbsp;";
				output += "<a onmouseover=\"tt_setWidth(105);";
				output += "Tip('<center><b>Guild Member</b><br>Level " + member.level + " " + member.rank + "</b><br>";
				if (member.hasFullData) {

				}
				output += "</center>');\" ";
				output += "style='color:"
				if (oldIds.indexOf(member.id)<0 /* || member.justLoggedIn */) { // just logged in
					output += "yellow";
					member.loggedIn=new Date().getTime();
					member.lastSeen=new Date().getTime();
					// if (memberList.isRefreshed) {member.justLoggedIn=true; }
				} else {
					if (member.id==playerId) {
						output += "lime";
					}
					else {
						output += "white";
					}
				}
				output += ";font-size:10px;'"
				output += " href='http://www.fallensword.com/index.php?cmd=profile&player_id=" + member.id + "'>" + member.name + "</a>";
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
			url: "http://www.fallensword.com/index.php?cmd=profile&player_id=" + member.id,
			headers: {
				"User-Agent" : navigator.userAgent,
				"Content-Type": "application/x-www-form-urlencoded",
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
		var statistics = fsHelper.findNode("//b[contains(.,'Statistics')]",0,doc);
		GM_log(statistics.innerHTML); //parentNode.parentNode.nextSibling.nextSibling.nextSibling.innerHTML);
	},

	injectBank: function() {
		var injectHere;
		var bank = fsHelper.findNode("//b[contains(.,'Bank')]");
		if (bank) {
			bank.innerHTML+="<br><a href='/index.php?cmd=guild&subcmd=bank'>Guild Bank</a>";
		}
	},


	injectAuctionHouse: function() {
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
	},

	insertAuctionGetItemDetails: function(itemId, invId, type, pid) {
		var theUrl = "fetchitem.php?item_id="+itemId+"&inv_id="+invId+"&t="+type+"&p="+pid /*+"&uid="+1220693678*/
		theUrl = document.location.protocol + "//" + document.location.host + "/" + theUrl
		GM_xmlhttpRequest({
			method: 'GET',
			url: theUrl,
			headers: {
			//    'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			//    'Accept': 'application/atom+xml,application/xml,text/xml',
				'Content-Type': 'application/x-www-form-urlencoded'
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
					var preText = craft
					if (forgeCount != 0) {
						preText +=  " " + forgeCount + "<img src='" + imgserver + "/hellforge/forgelevel.gif'>"
					}
					theText.innerHTML = preText + "<br>" + theText.innerHTML;
				}
			}
		}
	},

/*
	injectAuctionHouse: function() {
		var allItems=fsHelper.findNodes("//td[contains(@background, 'inventory/2x3.gif')]");
		for (var i=0;i<allItems.length;i++) {
			var oneItem=allItems[i];
			// oneItem.innerHTML+="<a href='#'>[---]</a>";
		}
		// window.alert(allItems.length);
	},
*/

	injectDropItemsAuction: function() {
		//function to add links to all the items in the drop items list
		var allItems = document.getElementsByTagName("INPUT");
		var itemName;
		for (var i=0; i<allItems.length; i++) {
			anItem = allItems[i];
			if (anItem.type=="checkbox") {
				theText=anItem.parentNode.nextSibling.nextSibling;
				theText.innerHTML=theText.innerHTML.replace(/ /i,"");
				itemName=theText.innerHTML.replace(/ /ig,"+");
			theText.innerHTML = " <a href=http://www.fallensword.com/?cmd=auctionhouse&type=-1&search_text=" + itemName + ">" + theText.innerHTML + "</a>"
			}
		}
	},

	injectReportPaint: function() {
		//Get the list of online members
		var memberList = fsHelper.getValueJSON("memberlist");

		var injectHere, searchString;
		for (var i=0;i<memberList.members.length;i++) {
			var member=memberList.members[i];
			if (member.status=="Online") {
				var player=fsHelper.findNode("//b[contains(., '" + member.name + "')]");
				if (player) {
					player.innerHTML = "[Online] " + player.innerHTML;
				}
			}
		}
	},

	injectDropItems: function() {
		if (GM_getValue("disableItemColoring")) return;
		var allItems = document.getElementsByTagName("INPUT");
		var savedItems = fsHelper.getValueJSON("savedItems")
		for (var i=0; i<allItems.length; i++) {
			anItem = allItems[i];
			if (anItem.type=="checkbox") {
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
					theUrl = document.location.protocol + "//" + document.location.host + "/" + theUrl
					GM_xmlhttpRequest({
						method: 'GET',
						url: theUrl,
						headers: {
						//    'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
						//    'Accept': 'application/atom+xml,application/xml,text/xml',
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						onload: function(responseDetails) {
							fsHelper.injectDropItemsParse(responseDetails);
						}
					})
				}
			}
		}
	},

	injectDropItemsParse: function(responseDetails) {
		var fontLineRE=/<center><font color='(#[0-9A-F]{6})' size=2><b>([^<]+)<\/b>/
		var fontLineRX=fontLineRE.exec(responseDetails.responseText)
		fsHelper.injectDropItemsPaint(fontLineRX[1],fontLineRX[2]);
	},

	injectDropItemsPaint: function(color, text) {
		var allItems = document.getElementsByTagName("INPUT");
		for (var i=0; i<allItems.length; i++) {
			anItem = allItems[i];
			if (anItem.type=="checkbox") {
				theText=anItem.parentNode.nextSibling.nextSibling;
				if (theText.innerHTML=="&nbsp;" + text) {
					theText.style.color=color;
				}
			}
		}
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
						warning.innerHTML="<br/>Member of your own guild";
						color = "green";
						break;
					case "friendly":
						warning.innerHTML="<br/>Do not attack - Guild is friendly!";
						color = "yellow";
						break;
					case "old":
						warning.innerHTML="<br/>Do not attack - You've been in that guild once!";
						color = "gray";
						break;
					default:
						changeAppearance = true;
				}
				if (changeAppearance) {
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
			playername = playername.substr(0, playername.indexOf("'s Avatar"));

			imgserver = fsHelper.getImageServer();

			var auctiontext = "Go to " + playername + "'s auctions" ;
			var ranktext = "Rank " +playername + "" ;

			newhtml = avyrow.parentNode.innerHTML + "</td></tr><tr><td align='center' colspan='2'>" ;
			newhtml += "<a href='javaScript:quickBuff(" + playerid ;
			newhtml += ");'><img alt='Buff " + playername + "' title='Buff " + playername + "' src=" ;
			newhtml += imgserver + "/skin/realm/icon_action_quickbuff.gif></a>&nbsp;&nbsp;" ;
			newhtml += "<a href=http://www.fallensword.com/?cmd=auctionhouse&type=-3&tid=" ;
			newhtml += playerid + '><img alt="' + auctiontext + '" title="' + auctiontext + '" src=';
			newhtml += imgserver + "/skin/gold_button.gif></a>&nbsp;&nbsp;";
			if (relationship == "self" && GM_getValue("showAdmin")) {
				newhtml += "<a href='http://www.fallensword.com/index.php?cmd=guild&subcmd=members&subcmd2=changerank&member_id=" ;
				newhtml += playerid + '><img alt="' + ranktext + '" title="' + ranktext + '" src=';
				newhtml += imgserver + "/guilds/" + guildId + "_mini.jpg></a>" ;
			}
			avyrow.parentNode.innerHTML = newhtml ;
		}

	},

	injectSettings: function() {
		var configData=document.createElement("DIV");
		configData.innerHTML=
			'<tr><td height="1" bgcolor="#333333" colspan="3"/></tr>' +
			'<div><form>' +
			'<table>' +
			'<tr><td colspan="2">Enter guild names, seperated by commas</td></tr>' +
			'<tr><td>Own Guild</td><td><input name="guildSelf" value="' + GM_getValue("guildSelf") + '"></td></tr>' +
			'<tr><td>Friendly Guilds</td><td><input name="guildFrnd" value="' + GM_getValue("guildFrnd") + '"></td></tr>' +
			'<tr><td>Old Guilds</td><td><input name="guildPast" value="' + GM_getValue("guildPast") + '"></td></tr>' +
			'<tr><td>Automatically Kill all monsters</td><td><input name="killAll" type="checkbox" value="on"' + (GM_getValue("killAll")?" checked":"") + '></td></tr>' +
			'<tr><td>Show Administrative Options</td><td><input name="guildAdmin" type="checkbox" value="on"' + (GM_getValue("showAdmin")?" checked":"") + '></td></tr>' +
			'<tr><td>Disable Item Coloring</td><td><input name="disableItemColoring" type="checkbox" value="on"' + (GM_getValue("disableItemColoring")?" checked":"") + '></td></tr>' +
			'<tr><td colspan=2><input type="button" class="custombutton" value="Save" id="fsHelperSaveOptions"></td></tr>' +
			'</form></div>';
		// <INPUT type="button" class="custombutton" onclick="if(confirm('Are you sure you with to use a special portal back to Krul Island?')) window.location='index.php?cmd=settings&amp;subcmd=fix&amp;xcv=b1087ede6d48798a8f5c1fa4e070003c';" value="Instant Portal back to Krul Island"/>
		var insertHere = document.getElementsByTagName("FORM")[0];
		insertHere.parentNode.insertBefore(configData, insertHere.nextSibling);
		document.getElementById('fsHelperSaveOptions').addEventListener('click', fsHelper.saveConfig, true);
	},

	saveConfig: function(evt) {
		var oForm=evt.target.form;
		GM_setValue("guildSelf", oForm.elements[0].value);
		GM_setValue("guildFrnd", oForm.elements[1].value);
		GM_setValue("guildPast", oForm.elements[2].value);
		GM_setValue("showAdmin", oForm.elements[4].checked);
		GM_setValue("killAll", oForm.elements[3].checked);
		GM_setValue("disableItemColoring", oForm.elements[5].checked);
		window.alert("FS Helper Settings Saved");
		return false;
	},

	guildRelationship: function(txt) {
		var guildSelf = GM_getValue("guildSelf");
		var guildFrnd = GM_getValue("guildFrnd");
		var guildPast = GM_getValue("guildPast");
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
		guildSelf=guildSelf.toLowerCase().replace(/\s*,\s*/,",").split(","); // "TheRetreat"
		guildFrnd=guildFrnd.toLowerCase().replace(/\s*,\s*/,",").split(","); // "Armata Rossa,Asphaltanza,Dark Siege,Elendil,Shadow Dracones,The Shadow Warriors,Tuga Knights"
		guildPast=guildPast.toLowerCase().replace(/\s*,\s*/,",").split(","); // "Dark Phoenix"
		if (guildSelf.indexOf(txt.toLowerCase())!=-1) return "self";
		if (guildFrnd.indexOf(txt.toLowerCase())!=-1) return "friendly";
		if (guildPast.indexOf(txt.toLowerCase())!=-1) return "old";
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
