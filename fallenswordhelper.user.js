// ==UserScript==
// @name           FallenSwordHelper
// @namespace      terrasoft.gr
// @description    Fallen Sword Helper
// @include        http://www.fallensword.com/*
// @include        http://guide.fallensword.com/*
// @include        http://fallensword.com/*
// @include        http://*.fallensword.com/*
// @include        http://local.huntedcow.com/fallensword/*
// @exclude        http://forum.fallensword.com/*
// @exclude        http://wiki.fallensword.com/*
// @version        1513
// @downloadURL    https://fallenswordhelper.github.io/fallenswordhelper/Releases/Current/fallenswordhelper.user.js
// @grant          none
// ==/UserScript==

// No warranty expressed or implied. Use at your own risk.

// EVERYTHING MUST BE IN main()
var fshMain = function() {

'use strict';

window.FSH = window.FSH || {};
FSH.dataTablesLoc = 'https://cdn.datatables.net/1.10.10/js/jquery.dataTables.min.js';

if (typeof GM_info === 'undefined') {
	FSH.version = 'undefined';
} else {
	FSH.version = GM_info.script.version;
}

FSH.Helper = {

	injectShop: function() { // Hybrid - Old map?
		var injectHere = $('#shop-info');
		var itemNodes = $('td center a img[src*="/items/"]');

		var selector = '<span style="font-size:xx-small">Select an item to ' +
			'quick-buy:<br>Select how many to quick-buy <input style="font-' +
			'size:xx-small" value=1 id="buy_amount" name="buy_amount" size=3 ' +
			'class="custominput"><table cellpadding=2><tr>';
		var itemId;
		for (var i = 0; i < itemNodes.length; i += 1) {
			var item = itemNodes[i];
			var src = item.getAttribute('src');
			var text = item.parentNode.parentNode.textContent;
			var onmouseover = $(item).data('tipped')
				.replace('Click to Buy', 'Click to Select');
			itemId = item.parentNode.getAttribute('href').match(/&item_id=(\d+)&/)[1];
			selector += '<td width=20 height=20 ><img width=20 height=20 id=select' +
				itemId + ' itemId=' + itemId + ' src="' + src + '" class="tipped" ' +
				'data-tipped-options="skin: \'fsItem\', ajax: true" data-tipped=\'' +
				onmouseover + '\'>' + text + '</td>';
			if (i % 25 === 24 && i !== itemNodes.length - 1) {
				selector += '</tr><tr>';
			}
		}
		selector+='</table><table width="600px"></tr><tr><td align="right" ' +
			'width="50%">Selected item:</td><td height=45 width="50%" id=' +
			'selectedItem align="left">&nbsp;</td></tr><tr><td id=warningMsg' +
			' colspan="2" align="center"></td></tr><tr><td id=buy_result ' +
			'colspan="2" align="center"></td></tr>';
		injectHere.after('<table><tr><td>' + selector + '</td></tr></table>');
		for (i = 0; i < itemNodes.length; i += 1) {
			itemId = itemNodes[i].parentNode.getAttribute('href')
				.match(/&item_id=(\d+)&/)[1];
			document.getElementById('select' + itemId)
				.addEventListener('click', FSH.Helper.selectShopItem, true);
		}
		FSH.Helper.shopId = itemNodes[0].parentNode.getAttribute('href')
			.match(/&shop_id=(\d+)/)[1];
	},

	selectShopItem: function(evt) { // Native - Old map?
		FSH.Helper.shopItemId = evt.target.getAttribute('itemId');
		document.getElementById('warningMsg').innerHTML = '<span style="' +
			'color:red;font-size:small">Warning:<br> pressing "t" now will buy the ' +
			document.getElementById('buy_amount').value +
			' item(s) WITHOUT confirmation!</span>';
		document.getElementById('selectedItem').innerHTML =
			document.getElementById('select' + FSH.Helper.shopItemId).parentNode
			.innerHTML.replace(/='20'/g,'=45');
	},

	quickBuyItem: function() { // Legacy - Old map? - from key handler
		if (!FSH.Helper.shopId || !FSH.Helper.shopItemId) {return;}
		document.getElementById('buy_result').innerHTML = 'Buying ' +
			document.getElementById('buy_amount').value + ' Items';
		for (var i = 0; i < document.getElementById('buy_amount').value; i += 1) {
			FSH.System.xmlhttp('index.php?cmd=shop&subcmd=buyitem&item_id=' +
				FSH.Helper.shopItemId + '&shop_id=' + FSH.Helper.shopId,
				FSH.Helper.quickDone);
		}
	},

	quickDone: function(responseText) { // Native - Old map?
		var infoMessage = FSH.Layout.infoBox(responseText);
		document.getElementById('buy_result').innerHTML += '<br />' + infoMessage;
	},


	position: function() {
		var result = {};
		if (FSH.Helper.page==='world/map/-(-)') {
			var playerTile=FSH.System.findNode('//img/ancestor::td[@background]');
			result.X=playerTile.cellIndex;
			result.Y=playerTile.parentNode.rowIndex;
			result.type='worldmap';
		}
		else {
			var posit = FSH.System.findNode('//h3[@id="world-realm-name"]');
			if (!posit) {return;}
			var thePosition=posit.innerHTML;
			var positionRE=/\((\d+),\s*(\d+)\)/;
			var positionX = parseInt(thePosition.match(positionRE)[1],10);
			var positionY = parseInt(thePosition.match(positionRE)[2],10);
			result.X=positionX;
			result.Y=positionY;
			result.type='normal';
		}
		return result;
	},

	mapThis: function() { // Legacy - Old map
		if (!FSH.System.getValue('footprints')) {return;}
		var realmId;
		var levelName;
		var realm = FSH.System.findNode('//h3[@id="world-realm-name"]');
		if ($('h3#world-realm-name').data('realm')) {
			realmId = $('h3#world-realm-name').data('realm').id.trim();
			levelName = $('h3#world-realm-name').data('realm').name.trim();
		}
		var posit = FSH.Helper.position();
		if (realm && posit) {
			if (!levelName) {levelName=realm.innerHTML;}
			FSH.Helper.levelName = levelName;
			var theMap = FSH.System.getValueJSON('map');
			if (!theMap) {
				theMap = {};
				theMap.levels = {};
			}
			if (!theMap.levels[levelName]) {theMap.levels[levelName] = {};}
			if (!theMap.levels[levelName][posit.X]) {
				theMap.levels[levelName][posit.X]={};
			}
			theMap.levels[levelName][posit.X][posit.Y]='!';
			FSH.System.setValueJSON('map', theMap);
		}
	},

	showMap: function(isLarge) {
		if (!FSH.System.getValue('footprints')) {return;}
		if (isLarge) {
			var realm = FSH.System.findNode('//b');
			FSH.Helper.levelName = realm.textContent.replace(' Map Overview', '');
		}
		var theMap = FSH.System.getValueJSON('map');
		var displayedMap = FSH.System.findNode(isLarge ? '//table[@width]' : '//table[@width="200"]');
		if (!displayedMap) {return;}
		var footprintsColor = FSH.System.getValue('footprintsColor');
		var posit = FSH.Helper.position();

		for (var y = 0; y < displayedMap.rows.length; y += 1) {
			var aRow = displayedMap.rows[y];
			for (var x = 0; x < aRow.cells.length; x += 1) {
				var aCell = aRow.cells[x];
				var dx = isLarge ? x : posit.X + (x - 2);
				var dy = isLarge ? y : posit.Y + (y - 2);
				if (theMap.levels[FSH.Helper.levelName] &&
					theMap.levels[FSH.Helper.levelName][dx] &&
					theMap.levels[FSH.Helper.levelName][dx][dy] &&
					theMap.levels[FSH.Helper.levelName][dx][dy] === '!') {

					if (x !== (isLarge ? posit.X : 2) || y !== (isLarge ? posit.Y : 2)) {
						aCell.style.color = footprintsColor;
						if (aCell.innerHTML.indexOf('table') > 0) {
							aCell
								.firstChild
								.firstChild
								.firstChild
								.firstChild
								.firstChild
								.innerHTML +='**';
						} else {
							aCell.innerHTML+='**';
						}
					}
				}
			}
		}
	},

	oldRemoveBuffs: function() {
		var buffName;
		//code to remove buffs but stay on the same screen
		var currentBuffs = FSH.System.findNodes('//a[contains(@href,"index.php?' +
			'cmd=profile&subcmd=removeskill&skill_id=")]');
		var buffHash={};
		if (!currentBuffs) {return buffHash;}
		for (var i=0;i<currentBuffs.length;i += 1) {
			var currentBuff = currentBuffs[i];
			var buffHref = currentBuff.getAttribute('href');
			var buffTest = /remove\sthe\s([ a-zA-Z]+)\sskill/
				.exec(currentBuff.getAttribute('onclick'));
			if (buffTest) {
				buffName = buffTest[1];
			} else {
				buffTest = /remove\sthe\s([ a-zA-Z]+)<br>/
					.exec(currentBuff.getAttribute('onclick'));
				if (buffTest) { buffName = buffTest[1];
				} else {console.log('Error getting buff');}
			}
			buffHash[buffName]=true;
			var imageHTML = currentBuff.innerHTML;
			var buffCell = currentBuff.parentNode;
			var buffHTML = buffCell.innerHTML;
			var lastPart = buffHTML
				.substring(buffHTML.indexOf('</a>')+4, buffHTML.length);
			var newCellContents = '<span id="Helper:removeSkill' + i + 
				'" style="cursor:pointer;" buffName="' + buffName + 
				'" buffHref="' + buffHref + '">' + imageHTML +
				'</span>' + lastPart;
			buffCell.innerHTML = newCellContents;
			buffCell.firstChild
				.addEventListener('click', FSH.Helper.removeSkill, true);
		}
		return buffHash;
	},

	checkBuffs: function() { // Legacy - Old Map
		var onmouseover;
		var impsRemaining;
		var textToTest;
		var impsRemainingRE;
		var counterAttackLevel;
		var doublerLevel;

		var buffHash = FSH.Helper.oldRemoveBuffs();

		//extra world screen text
		var replacementText = '<td background="' + FSH.System.imageServer +
			'/skin/realm_right_bg.jpg"><table align="right" cellpadding="1" ' +
			'style="width:270px;margin-left:38px;margin-right:38px;font-size' +
			':medium; border-spacing: 1px; border-collapse: collapse;"><tr><' +
			'td colspan="2" height="10"></td></tr><tr>';
		var hasShieldImp = FSH.System
			.findNode('//img[contains(@src,"/55_sm.gif")]');
		var hasDeathDealer = FSH.System
			.findNode('//img[contains(@src,"/50_sm.gif")]');
		if (hasDeathDealer || hasShieldImp) {
			var re=/(\d+) HP remaining/;
			impsRemaining = 0;
			if (hasShieldImp) {
				textToTest = $(hasShieldImp).data('tipped');
				impsRemainingRE = re.exec(textToTest);
				impsRemaining = impsRemainingRE[1];
			}
			var applyImpWarningColor = ' style="color:green; ' +
				'font-size:medium;"';
			if (impsRemaining===2){
				applyImpWarningColor = ' style="color:Orangered; font-size:' +
					'medium; font-weight:bold;"';
			}
			if (impsRemaining===1){
				applyImpWarningColor = ' style="color:Orangered; font-size:' +
					'large; font-weight:bold"';
			}
			if (impsRemaining===0){
				applyImpWarningColor = ' style="color:red; font-size:large;' +
					' font-weight:bold"';
			}
			replacementText += '<tr><td' + applyImpWarningColor +
				'>Shield Imps Remaining: ' +  impsRemaining +
				(impsRemaining === 0 ?
				'&nbsp;<span id="Helper:recastImpAndRefresh" style="color:' +
				'blue;cursor:pointer;text-decoration:underline;font-size:' +
				'xx-small;">Recast</span>':'') + '</td></tr>';
			if (hasDeathDealer) {
				replacementText += FSH.Helper.doDeathDealer(impsRemaining);
			}
		}
		var hasCounterAttack = FSH.System
			.findNode('//img[contains(@src,"/54_sm.gif")]');
		if (hasCounterAttack) {
			if (hasCounterAttack.getAttribute('src')
				.search('/skills/') !== -1) {
				onmouseover = $(hasCounterAttack).data('tipped');
				var counterAttackRE = /<b>Counter Attack<\/b> \(Level: (\d+)\)/;
				var counterAttack = counterAttackRE.exec(onmouseover);
				if (counterAttack) {
					counterAttackLevel = counterAttack[1];
				}
			}
			replacementText += '<tr><td style="font-size:small; color:' +
				'blue">CA' + counterAttackLevel + ' active</td></tr>';
		}
		var hasDoubler = FSH.System.findNode('//img[contains(@src,"/26_sm.gif")]');
		if (hasDoubler) {
			if (hasDoubler.getAttribute('src').search('/skills/') !== -1) {
				onmouseover = $(hasDoubler).data('tipped');
				var doublerRE = /<b>Doubler<\/b> \(Level: (\d+)\)/;
				var doubler = doublerRE.exec(onmouseover);
				if (doubler) {
					doublerLevel = doubler[1];
				}
			}
			if (doublerLevel === 200) {
				replacementText += '<tr><td style="font-size:small; color:' +
					'red">Doubler ' + doublerLevel + ' active</td></tr>';
			}
		}
		var huntingMode = FSH.Helper.huntingMode;
		replacementText += huntingMode === true ? '<tr><td style="font-size:' +
			'small; color:red">Hunting mode enabled</td></tr>':'';
		replacementText += '<tr><td colspan="2" height="10"></td></tr>';
		if (FSH.System.getValue('showHuntingBuffs')) {
			var enabledHuntingMode=FSH.System.getValue('enabledHuntingMode');
			var buffs=FSH.System.getValue('huntingBuffs');
			var buffsName=FSH.System.getValue('huntingBuffsName');
			if (enabledHuntingMode === 2) {
				buffs=FSH.System.getValue('huntingBuffs2');
				buffsName=FSH.System.getValue('huntingBuffs2Name');
			}
			if (enabledHuntingMode === 3) {
				buffs=FSH.System.getValue('huntingBuffs3');
				buffsName=FSH.System.getValue('huntingBuffs3Name');
			}
			var buffAry=buffs.split(',');
			var missingBuffs = [];
			for (var i=0;i<buffAry.length;i += 1) {
				if (!buffHash[buffAry[i].trim()]) {
					missingBuffs.push(buffAry[i]);
				}
			}
			if (missingBuffs.length>0) {
				replacementText += '<tr><td colspan="2" align="center"><' +
					'span style="font-size:x-small; color:navy;">You are ' +
					'missing some ' + buffsName + ' hunting buffs<br/>(';
				replacementText += missingBuffs.join(', ');
				replacementText += ')</span></td></tr>';
			}
			replacementText += '<tr><td colspan="2" height="10"></td></tr>';
			replacementText += '</table>';
		}
		replacementText += '</td>' ;

		var injectHere = FSH.System.findNode('//div[table[@class="centered" ' +
			'and @style="width: 270px;"]]');
		if (!injectHere) {return;}
		//insert after kill all monsters image and text
		var newSpan = document.createElement('DIV');
		newSpan.innerHTML=replacementText;
		injectHere.appendChild(newSpan);

		if ((hasDeathDealer || hasShieldImp) && impsRemaining ===0) {
			var recastImpAndRefresh = document
				.getElementById('Helper:recastImpAndRefresh');
			var impHref = 'index.php?cmd=quickbuff&subcmd=activate&target' +
				'Players=' +
				$('dt.stat-name:first').next().text().replace(/,/g,'') +
				'&skills%5B%5D=55';
			recastImpAndRefresh.addEventListener('click', function() {
				FSH.System.xmlhttp(impHref, FSH.Helper.recastImpAndRefresh, true);
			},true);
		}

		FSH.Helper.toggleKsTracker();
	},

	doDeathDealer: function(impsRemaining) {
		var replacementText = '';

		var lastDeathDealerPercentage =
			FSH.System.getValue('lastDeathDealerPercentage');
		if (lastDeathDealerPercentage === undefined) {
			FSH.System.setValue('lastDeathDealerPercentage', 0);
			lastDeathDealerPercentage = 0;
		}

		var lastKillStreak = FSH.System.getValue('lastKillStreak');
		if (lastKillStreak === undefined) {
			FSH.System.setValue('lastKillStreak', 0);
			lastKillStreak = 0;
		}

		var trackKillStreak = FSH.System.getValue('trackKillStreak');

		if (impsRemaining > 0 && lastDeathDealerPercentage === 20) {
			replacementText += '<tr><td style="font-size:small; color:black"' +
				'>Kill Streak: <span findme="killstreak">&gt;' +
				FSH.System.addCommas(lastKillStreak) + '</span> Damage bonus: <' +
				'span findme="damagebonus">20</span>%</td></tr>';
		} else {
			if (!trackKillStreak) {
				replacementText += '<tr><td style="font-size:small; color:' +
					'navy" nowrap>KillStreak tracker disabled. <span style="' +
					'font-size:xx-small">Track: <span id=Helper:toggleKS' +
					'tracker style="color:navy;cursor:pointer;text-' +
					'decoration:underline;" title="Click to toggle">' +
					(trackKillStreak ? 'ON' : 'off') +
					'</span></span></td></tr>';
			} else {
				replacementText += '<tr><td style="font-size:small; color:' +
					'navy" nowrap>KillStreak: <span findme="killstreak">' +
					FSH.System.addCommas(lastKillStreak) + '</span> Damage bonus' +
					': <span findme="damagebonus">' +
					Math.round(lastDeathDealerPercentage * 100) / 100 +
					'</span>%&nbsp;<span style="font-size:xx-small">Track: ' +
					'<span id=Helper:toggleKStracker style="color:navy;' +
					'cursor:pointer;text-decoration:underline;" title="Click' +
					' to toggle">' + (trackKillStreak ? 'ON' : 'off') +
					'</span></span></td></tr>';
				FSH.System.xmlhttp('index.php?cmd=profile', FSH.Helper.getKillStreak);
			}
		}
		return replacementText;
	},

	toggleKsTracker: function() {
		var trackKS = document.getElementById('Helper:toggleKStracker');
		if (trackKS) {
			trackKS.addEventListener('click', function() {
				FSH.System.setValue('trackKillStreak',
				FSH.System.getValue('trackKillStreak') ? false : true);
				location.reload();
			},true);
		}
	},

	recastImpAndRefresh: function(responseText) {
		var doc = FSH.System.createDocument(responseText);
		if (doc) {
			location.reload();
		}
	},

	removeSkill: function(evt) {
		var buffName = evt.target.parentNode.getAttribute('buffName');
		var buffHref = evt.target.parentNode.getAttribute('buffHref');
		if (confirm('Are you sure you wish to remove the ' + buffName +
			' skill?')) {
			FSH.System.xmlhttp(buffHref,
				function() {location.href = 'index.php?cmd=world';});
		}
	},

	toggleSound: function() {
		if (FSH.System.getValue('playNewMessageSound'))
		{
			FSH.System.setValue('playNewMessageSound', false);
		} else {
			FSH.System.setValue('playNewMessageSound', true);
		}
		location.reload();
	},

	isQuestBeingTracked: function(questHREF) {
		//quests are stored as their address after index.php: ?cmd=questbook....
		var questsBeingTracked = FSH.System.getValue('questBeingTracked').split(';');
		for (var i = 0; i < questsBeingTracked.length; i += 1) {
			if (questsBeingTracked[i] === questHREF) {
				return true;
			}
		}
		return false;
	},

	checkForNotCompletedQuests: function(responseText, callback) {
		//gets the maximum page number and goes through the pages.
		var doc=FSH.System.createDocument(responseText);
		var page = FSH.System.findNode('//td[contains(.,"Page:")]', doc);
		var maxPage = page.innerHTML.match(/of&nbsp;(\d*)/);


		if (maxPage && maxPage.length >= 2) {
			FSH.System.setValue('questsNotComplete', false);
			for (var i = 0; i < maxPage[1].replace(/of&nbsp;/g, ''); i += 1) {
				FSH.System.xmlhttp('index.php?cmd=questbook&subcmd=&subcmd2=&page=' + i + '&search_text=&mode=0&letter=*&sortby=min_level&sortbydir=0',
				FSH.Helper.checkForNotCompletedQuestRecurse,
				{'insertHere' : callback.insertHere});
			}
		}
	},

	checkForNotCompletedQuestRecurse: function(responseText, callback) {
		var doc=FSH.System.createDocument(responseText);
		var insertHere = callback.insertHere;

		var table = FSH.System.findNode('//table[@width="100%" and @cellspacing=0 and @cellpadding=0 and @border=0]', doc);
		if (table) {
			table = table.lastChild.getElementsByTagName('TABLE')[2];

			for (var i = 2; i < table.rows.length; i+=2) {
				if (table.rows[i].cells.length > 1) {
					var questHREF = table.rows[i].cells[0].getElementsByTagName('a')[0].getAttribute('href').match(/(\?.*)/)[1];
					if (table.rows[i].cells[2].innerHTML === FSH.System.getValue('lastWorld') && !FSH.Helper.isQuestBeingTracked(questHREF)) {
						if (FSH.System.getValue('questsNotComplete') === false) {
							insertHere.innerHTML += '<br><span style="color:red;font-size:12px;">Quest(s) in zone not completed:</span><br>';
							FSH.System.setValue('questsNotComplete', true);
						}
						insertHere.innerHTML += '<span style="font-size:12px;">' +table.rows[i].cells[0].innerHTML + '</span><br>';
					}
				}
			}
		}
	},

	checkForNotStartedQuests: function(responseText, callback) {

		var doc=FSH.System.createDocument(responseText);
		var page = FSH.System.findNode('//td[contains(.,"Page:")]', doc);
		var maxPage = page.innerHTML.match(/of&nbsp;(\d*)/g);

		if (maxPage && maxPage.length >= 2) {
			FSH.System.setValue('questsNotStarted', false);
			for (var i = 0; i < maxPage[1].replace(/of&nbsp;/g, ''); i += 1) {
				FSH.System.xmlhttp('index.php?cmd=questbook&subcmd=&subcmd2=&page=' + i + '&search_text=&mode=2&letter=*&sortby=min_level&sortbydir=0',
				FSH.Helper.checkForQuestRecurse,
				{'insertHere' : callback.insertHere});
			}
		}
	},

	checkForQuestRecurse: function(responseText, callback) {
		var doc=FSH.System.createDocument(responseText);
		var insertHere = callback.insertHere;

		var table = FSH.System.findNode('//table[@width="100%" and @cellspacing=0 and @cellpadding=0 and @border=0]', doc);
		if (table) {
			table = table.lastChild.getElementsByTagName('TABLE')[2];

			for (var i = 2; i < table.rows.length; i+=2) {
				if (table.rows[i].cells.length > 1) {
					if (table.rows[i].cells[2].innerHTML === FSH.System.getValue('lastWorld')) {
						if (FSH.System.getValue('questsNotStarted') === false) {
							insertHere.innerHTML += '<br><span style="color:red;font-size:12px;">Quest(s) in zone not started:</span><br>';
							FSH.System.setValue('questsNotStarted', true);
						}
						insertHere.innerHTML += '<span style="font-size:12px;">' + FSH.System.removeHTML(table.rows[i].cells[0].innerHTML) + '</span><br>';
					}
				}
			}
		}
	},

	injectWorldNewMap: function(data){
		var img;
		if(data.player){
			FSH.Helper.xLocation = data.player.location.x;
			FSH.Helper.yLocation = data.player.location.y;
			//<dd id='HelperSendTotal'>' + FSH.System.getValue("currentGoldSentTotal").toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '</dd>
			if(FSH.System.getValue('sendGoldonWorld')){
				$('#HelperSendTotal').html(FSH.System.getValue('currentGoldSentTotal').toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,'));
				if(parseInt(data.player.gold, 10) > FSH.System.getValue('goldAmount')){
					$('#statbar-gold').css('background-color','red');
				}else{
					$('#statbar-gold').css('background-color','inherit');
				}
			}
			/*if (buttonRow && FSH.System.getValue('sendGoldonWorld')){
				currentGoldSentTotal = FSH.System.addCommas(FSH.System.getValue('currentGoldSentTotal'));
				var recipient_text = 'Send ' + FSH.System.getValue('goldAmount') + ' gold to ' + FSH.System.getValue('goldRecipient') +
					'. Current gold sent total is ' + currentGoldSentTotal;
				buttonRow.innerHTML += '<td valign="top" width="5"></td>' +
					'<td valign="top"><img style="cursor:pointer" id="Helper:SendGold" src="' + FSH.System.imageServer +
					'/skin/gold_button.gif" title= "' + recipient_text + '" border="1" />';
			}
			if (buttonRow && FSH.System.getValue('sendGoldonWorld')){
				//document.getElementById('Helper:PortalToStart').addEventListener('click', FSH.Helper.portalToStartArea, true);
				document.getElementById('Helper:SendGold').addEventListener('click', FSH.Helper.sendGoldToPlayer, true);
			}*/
		}
		if (data.realm && data.realm.name) {
			var worldName = $('h1#worldName');
			worldName.html(data.realm.name); //HACK - incase of switchign between master realm and realm they dont replace teh realm name
			worldName.append(' <a href="http://guide.fallensword.com/index.php?cmd=realms&subcmd=view&realm_id=' + data.realm.id + '" target="_blank">' +
				'<img border=0 title="Search map in Ultimate FSG" width=10 height=10 src="'+ FSH.System.imageServer + '/temple/1.gif"/></a>');
			worldName.append(' <a href="http://wiki.fallensword.com/index.php/Special:Search?search=' + data.realm.name + '&go=Go" target="_blank">' +
				'<img border=0 title="Search map in Wiki" width=10 height=10 src="/favicon.ico"/></a>');
			if (FSH.System.getValue('showSpeakerOnWorld')) {
				img = FSH.System.getValue('playNewMessageSound') === true ?
					FSH.Data.soundMuteImage :
					FSH.Data.soundImage;
				worldName.append('<a href="#" id="toggleSoundLink">'+img+'</a>');
				document.getElementById('toggleSoundLink').addEventListener('click',
				function() {
				//alert($('a#HelperToggleHuntingMode').html());
					if(FSH.System.getValue('playNewMessageSound') === false){
						$('a#toggleSoundLink').html(FSH.Data.soundMuteImage);
					}else{
						$('a#toggleSoundLink').html(FSH.Data.soundImage);
					}
					FSH.System.setValue('playNewMessageSound',!FSH.System.getValue('playNewMessageSound'));
				},true);
			}
			var huntingMode = FSH.Helper.huntingMode;
			img = huntingMode === true ? FSH.Data.huntingOnImage : FSH.Data.huntingOffImage;
			worldName.append(' <a href=# id="HelperToggleHuntingMode">' + img + '</a>');
			
			document.getElementById('HelperToggleHuntingMode').addEventListener('click',
				function() {
				//alert($('a#HelperToggleHuntingMode').html());
					if (!FSH.Helper.huntingMode) {
						$('a#HelperToggleHuntingMode').html(FSH.Data.huntingOnImage);
					} else {
						$('a#HelperToggleHuntingMode').html(FSH.Data.huntingOffImage);
					}
					FSH.Helper.huntingMode = !FSH.Helper.huntingMode;
					FSH.System.setValue('huntingMode', FSH.Helper.huntingMode);
				},true);
		}
	},

	injectWorld: function() {
		//-1 = world page
		//0 = quest responce
		//1 = view creature
		//2 = attack creature
		//3 = attack player
		//4 = move
		//5 = use stair
		//6 = use chest
		//7 = take portal
		//10 = problaby view relic
		//11 = take relic
		//12 = create group
		//13 = view shop
		//14 = purchase item
		//15 = repair
		//17 = login
		//18 = username not found
		if ($('#worldPage').length > 0) { // new map
			FSH.Helper.newMapSubscribes();
		} else {
			//not new map.
			FSH.Helper.injectOldMap();
		}
	},

	injectSendGoldOnWorld: function() {
		$('#statbar-gold-tooltip-general').append(
			'<dt class="stat-gold-sendTo">Send To:</dt><dd id="' +
			'HelperSendTo">' + FSH.System.getValue('goldRecipient') +
			'</dd>' + 
			'<dt class="stat-gold-sendAmt">Amount:</dt><dd id="' +
			'HelperSendAmt">' + FSH.System.getValue('goldAmount')
				.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,') + '</dd>' +
			'<dt class="stat-gold-sendTo">Send?</dt><dd><input id="' +
			'HelperSendGold" value="Send!" class="custombutton" ' +
			'type="submit"><input type="hidden" id="xc" value="' +
			FSH.System.getValue('goldConfirm') + '"</dd>' + 
			'<dt class="stat-gold-sendTotal">Total Sent:</dt><dd ' +
			'id="HelperSendTotal">' +
			FSH.System.getValue('currentGoldSentTotal').toString()
				.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,') + '</dd>');
		$('input#HelperSendGold').click(FSH.Helper.doSendGold);
	},

	doSendGold: function() {
		var sendTo = $('#HelperSendTo').html();
		var sendAmt = $('#HelperSendAmt').html()
			.replace(/[^\d]/g,'');
		var xcNum = $('#xc').val();
		var sendHref = FSH.System.server + 'index.php?cmd=trade&' +
			'subcmd=sendgold&xc=' + xcNum + '&target_username=' +
			sendTo +'&gold_amount='+ sendAmt;
		$.ajax({
			url: sendHref,
			success: function( data ) {
				//alert($(data).find();
				var info = FSH.Layout.infoBox(data);
				if (info === 'You successfully sent gold!' ||
					info === '') {
					//currentGoldSentTotal += FSH.System.intValue(callback.amount);
					//info = 'You successfully sent ' + callback.amount + ' gold to ' + callback.recipient + '! Current total sent is '+currentGoldSentTotal+' gold.';
					FSH.System.setValue('currentGoldSentTotal',
						parseInt(
							FSH.System.getValue('currentGoldSentTotal'), 10) +
						parseInt(FSH.System.getValue('goldAmount'), 10));
					window.GameData.fetch(387);
				}
			}
		});
	},

	readyViewCreature: function() { // Hybrid - New Map
		$('div#creatureEvaluator').html('');
		$('div#creatureEvaluatorGroup').html('');

		FSH.System.xmlhttp('index.php?cmd=profile',
			FSH.Helper.getCreaturePlayerData,
			{	'groupExists': false,
				'groupAttackValue': 0,
				'groupDefenseValue': 0,
				'groupArmorValue': 0,
				'groupDamageValue': 0,
				'groupHPValue': 0,
				'groupEvaluation': false
			}
		);
		FSH.System.xmlhttp('index.php?cmd=guild&subcmd=groups',
			FSH.Helper.checkIfGroupExists);

		$('div#addRemoveCreatureToDoNotKillList').html('');
//console.log($('#dialog-viewcreature').find('h2.name').text());
		if ($('div#addRemoveCreatureToDoNotKillList').length === 0) {
			var doNotKillElement = '<div id="addRemoveCreatureToDo' +
				'NotKillList"" class="description" style="cursor:' +
				'pointer;text-decoration:underline;color:blue;"></div>';
			$(doNotKillElement).insertAfter($('#dialog-viewcreature')
				.find('p.description'));
		}
		var creatureName = $('#dialog-viewcreature').find('h2.name')
			.text();
		$('div#addRemoveCreatureToDoNotKillList')
			.attr('creatureName',creatureName);
		var extraText = 'Add to the do not kill list';
		if (FSH.Helper.doNotKillList.indexOf(creatureName) !== -1) {
			extraText = 'Remove from do not kill list';}
		$('div#addRemoveCreatureToDoNotKillList').html(extraText);
		document.getElementById('addRemoveCreatureToDoNotKillList')
			.addEventListener('click',
				FSH.Helper.addRemoveCreatureToDoNotKillList, true);
	},

	afterUpdateActionList: function() {
		// color the critters in the do no kill list blue
		$('ul#actionList div.header').each(function() {
			if (FSH.Helper.doNotKillList.indexOf($(this).find('a.icon')
				.data('name')) !== -1) {
				$(this).css('color','blue');
			}
		});
		// then intercept the action call 
		var gameData = window.GameData;
		var hcs = window.HCS;
		var oldDoAction = gameData.doAction;
		gameData.doAction = function(actionCode, fetchFlags, data) {
			if (actionCode === hcs.DEFINES.ACTION.CREATURE_COMBAT) {
				// Do custom stuff e.g. do not kill list
				var creatureIcon = $('ul#actionList div.header')
					.eq(data.passback).find('a.icon');
				if (FSH.Helper.doNotKillList.indexOf(
						creatureIcon.data('name')) !== -1) {
					creatureIcon.removeClass('loading');
					return;
				}
			}
			// Call standard action
			oldDoAction(actionCode, fetchFlags, data);
		}; 
	},

	dataEventsPlayerBuffs: function(e, data) {
		// check shield imp is still active
		var shieldImpVal = 0;
		var ddVal=0;
		var l = data.b.length;
		for(var i = 0; i < l; i += 1) {
			var buff = data.b[i];
			if (buff.id === 55) {
				shieldImpVal = buff.stack;
			} else if (buff.id === 50) {
				ddVal = buff.level;
			}
			if (ddVal > 0 && shieldImpVal > 0) {break;}
		}

		//~ if(ddVal>0){
			var imp = $('#actionlist-shield-imp');
			if(shieldImpVal === 0){
				imp.css('background-color','red');
			}else if(shieldImpVal===2){
				imp.css('background-color','yellow');
			}else if(shieldImpVal===1){
				imp.css('background-color','orange');
			}else{
				imp.css('background-color','inherit');
			}
		//~ }
	},

	combatResponse: function(e, data) {
		var l;
		var i;
		// If bad response do nothing.
		if (!FSH.Helper.keepLogs || data.response.response !== 0) {return;}
		var combatData = {};
		combatData.combat = $.extend(true, {}, data.response.data); //make a deep copy
		//delete some values that are not needed to trim down size of log.
		delete combatData.combat.attacker.img_url;
		delete combatData.combat.defender.img_url;
		delete combatData.combat.is_conflict;
		delete combatData.combat.is_bounty;
		delete combatData.combat.pvp_rating_change;
		delete combatData.combat.pvp_prestige_gain;
		if (combatData.combat.inventory_id) {
			combatData.combat.drop = combatData.combat.item.id;
		}
		delete combatData.combat.inventory_id;
		delete combatData.combat.item;

		combatData.player={};
		combatData.player.buffs={};
		combatData.player.enhancements={};
		l = data.player.buffs.length;
		for(i=0; i<l; i += 1) //loop through buffs, only need to keep CA and Doubler
		{//54 = ca, 26 = doubler
			var buff = data.player.buffs[i];
			if(buff.id === 54 || buff.id === 26)
			{
				combatData.player.buffs[buff.id] = parseInt(buff.level, 10);
			}
		}
		var notSave = '|Breaker|Protection|Master Thief|Protect Gold|Disarm|Duelist|Thievery|Master Blacksmith|Master Crafter|Fury Caster|Master Inventor|Sustain|';//Taking the Not Save in case they add new enhancements.
		if (data.player.enhancements)
		{
			l = data.player.enhancements.length;
			for(i=0; i<l; i += 1) //loop through enhancements
			{//54 = ca, 26 = doubler
				var enh = data.player.enhancements[i];
				if (notSave.indexOf('|'+enh.name+'|')===-1){
					combatData.player.enhancements[enh.name]=enh.value;
				}
			}
		}
		//combatData.player.enhancements = data.player.enhancements;
		//combatData.player.buffs = data.player.buffs;
		var now = new Date();
		combatData.time = FSH.System.formatDateTime(now);
		FSH.Helper.appendSavedLog(',' + JSON.stringify(combatData));
	},

	newMapSubscribes: function() {
		// subscribe to view creature events on the new map.
		//current send total
		//send to
		//send amount
		//deposit?
		if (FSH.System.getValue('sendGoldonWorld')) {
			FSH.Helper.injectSendGoldOnWorld();
		}
		//Subscribes:
		FSH.Helper.doNotKillList = FSH.System.getValue('doNotKillList');
		$.subscribe('ready.view-creature', FSH.Helper.readyViewCreature);

		// add do-not-kill list functionality
		$.subscribe('after-update.actionlist',
			FSH.Helper.afterUpdateActionList);

		$.subscribe(window.DATA_EVENTS.PLAYER_BUFFS.ANY,
			FSH.Helper.dataEventsPlayerBuffs);

		$.subscribe('keydown.controls', function(e, key){
			switch(key)
			{
				case 'ACT_REPAIR': window.GameData.fetch(387);
				break;
			}
		});

		FSH.Helper.keepLogs = FSH.System.getValue('keepLogs');
		$.subscribe('2-success.action-response', FSH.Helper.combatResponse);
		//on world

		if (window.initialGameData) {//HCS initial data
			setTimeout(function(){
				FSH.Helper.injectWorldNewMap(window.initialGameData);
			}, 400);
		}
		$.subscribe('-1-success.action-response 5-success.action-response',
			function(e, data) { //change of information
				setTimeout(function() {
					FSH.Helper.injectWorldNewMap(data);
				}, 400);
			}
		);

		//somewhere near here will be multi buy on shop
		//$.subscribe('prompt.worldDialogShop', function(e, data){
			//self._createShop(self.shop.items);
		//	$('span[class="price"]').after('<span class="numTake">test</span>');
		//});

		//document.getElementById('Helper:SendGold').addEventListener('click', FSH.Helper.sendGoldToPlayer, true);
	},

	injectOldMap: function() {
		try {
			var curTile = FSH.System.findNode('//img[contains(@title, "You are here")]/ancestor::td[@width="40" and @height="40"]').getAttribute('background');
			if (FSH.System.getValue('currentTile') !== curTile) {
				FSH.System.setValue('currentTile', curTile);
			}
		} catch (err) {
			//just eat it and move on
		}
		var currentLocation = $('h3#world-realm-name');
		if (currentLocation.length > 0) {
			var locationRE = /\((\d+), (\d+)\)/.exec(currentLocation.text());
			FSH.Helper.xLocation = parseInt(locationRE[1],10);
			FSH.Helper.yLocation = parseInt(locationRE[2],10);
		}

		FSH.Helper.mapThis();
		FSH.Helper.showMap(false);

		var buttonRow = FSH.System.findNode('//tr[td/a/img[@title="Open Realm Map"]]');

		if (buttonRow && FSH.System.getValue('sendGoldonWorld')){
			var currentGoldSentTotal = FSH.System.addCommas(FSH.System.getValue('currentGoldSentTotal'));
			var recipient_text = 'Send ' + FSH.System.getValue('goldAmount') + ' gold to ' + FSH.System.getValue('goldRecipient') +
				'. Current gold sent total is ' + currentGoldSentTotal;
			buttonRow.innerHTML += '<td valign="top" width="5"></td>' +
				'<td valign="top"><img style="cursor:pointer" id="Helper:SendGold" src="' + FSH.System.imageServer +
				'/skin/gold_button.gif" title= "' + recipient_text + '" border="1" />';
		}

		if (buttonRow && !FSH.System.getValue('hideKrulPortal')) {
			buttonRow.innerHTML += '<td valign="top" width="5"></td>' +
				'<td valign="top"><img style="cursor:pointer" id="Helper:PortalToStart" src="' + FSH.System.imageServer +
				'/temple/3.gif" title="Instant port to Krul Island" border="1" /></span></td>';
		}

		var footprints = FSH.System.getValue('footprints');

		if (buttonRow) {
			buttonRow.innerHTML += '<td valign="top" width="5"></td>' +
				'<td valign="top"><img style="cursor:pointer" id="Helper:ToggleFootprints" src="' + FSH.System.imageServer +
				'/skin/' + (footprints?'quest_complete':'quest_incomplete') + '.gif" title="Toggle Footprints" border="0"></td>';
			document.getElementById('Helper:ToggleFootprints').addEventListener('click', FSH.Helper.toggleFootprints, true);
		}

		if (buttonRow && FSH.System.getValue('sendGoldonWorld')){
			//document.getElementById('Helper:PortalToStart').addEventListener('click', FSH.Helper.portalToStartArea, true);
			document.getElementById('Helper:SendGold').addEventListener('click', FSH.Helper.sendGoldToPlayer, true);
		}
		if (buttonRow && !FSH.System.getValue('hideKrulPortal')) {
			document.getElementById('Helper:PortalToStart').addEventListener('click', FSH.Helper.portalToStartArea, true);
		}

		// One may ask why the separation of creating the button and the event handling code.
		// Well, obviously (so obvious it took me 3 hours to figure out), when you change the HTML of
		// a region, all attached events are destroyed (because the original elements are also destroyed)
		
		// PH 20150110 Only in Chrome. FF is apparently different!
		// It's important because we lose the mouseover events of the built-in buttons.
		// It's because you used innerHTML instead of append

		FSH.Helper.checkBuffs();
		FSH.Helper.prepareCheckMonster();
		FSH.Helper.prepareCombatLog();
		var realmId;
		var mapNameText;
		var i;
		var mapName = FSH.System.findNode('//h3[@id="world-realm-name"]');
		if ($('h3#world-realm-name').data('realm')) {
			realmId = $('h3#world-realm-name').data('realm').id.trim();
			mapNameText = $('h3#world-realm-name').data('realm').name.trim();
		}
		//Checking if there are quests on current map - Already done by HCS in new map
		if (FSH.System.getValue('checkForQuestsInWorld') === true) {
			if (mapName && mapName.textContent !== null) {
				if (!mapNameText) {
					mapNameText = mapName.textContent.trim();}
				if (FSH.System.getValue('lastWorld') !== mapNameText ||
					FSH.System.getValue('questsNotStarted') === true ||
					FSH.System.getValue('questsNotComplete') === true) {
					FSH.System.setValue('lastWorld', mapNameText);
					var insertToHere = FSH.System.findNode('//html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[5]/td[2]/table/tbody/tr[3]/td/table/tbody/tr[4]/td');
					FSH.System.xmlhttp('index.php?cmd=questbook&mode=2&letter=*', FSH.Helper.checkForNotStartedQuests, {'insertHere' : insertToHere});
					FSH.System.xmlhttp('index.php?cmd=questbook&mode=0&letter=*', FSH.Helper.checkForNotCompletedQuests,{'insertHere' : insertToHere});
				}
			}
		}
		//quest tracker - will be added by HCS in new Map
		var questBeingTracked = FSH.System.getValue('questBeingTracked').split(';');
		if (questBeingTracked.length > 0 &&
			questBeingTracked[0].trim().length > 0) {
			var injectHere = FSH.System.findNode('//div[table[@class="centered" and @style="width: 270px;"]]');
			if (!injectHere) {return;}
			var replacementText = '<td background="' + FSH.System.imageServer + '/skin/realm_right_bg.jpg">';
			replacementText += '<table width="280" cellpadding="1" style="margin-left:28px; margin-right:28px; ' +
				'font-size:medium; border-spacing: 1px; border-collapse: collapse;">';
			replacementText += '<tr><td colspan="2" height="10"></td>';
			for (i = 0; i < questBeingTracked.length; i += 1) {

				replacementText += '<tr><td style="font-size:small; color:black"><a id="qiLink' + i + '" href=' + questBeingTracked[i] + '></a>&nbsp;';
				replacementText += '<input id="dontTrackThisQuest' + i + '" data="' + questBeingTracked[i] + '" type="button" value="Stop Tracking" title="Stops tracking quest progress." class="custombutton"><br>';
				replacementText += '<span findme="questinfo' + i + '"></span></td></tr>';
				if (i !== questBeingTracked.length - 1) {
					replacementText += '<tr><td height="10" colspan="2"/></tr>' +
					'<tr><td height="10" colspan="2"/></tr>';
				}
			}

			replacementText += '</table>';
			replacementText += '</td>';

			var newSpan = document.createElement('SPAN');
			newSpan.innerHTML=replacementText;
			injectHere.appendChild(newSpan);

			for (i = 0; i < questBeingTracked.length; i += 1) {
				FSH.System.xmlhttp(questBeingTracked[i], FSH.Helper.getQuestInfo, {'data' : i});
			}
		}

		var imgSource;
		var altText;
		if (mapName && mapNameText) {
			mapName.innerHTML += ' <a href="http://guide.fallensword.com/index.php?cmd=realms&subcmd=view&realm_id=' + realmId + '" target="_blank">' +
				'<img border=0 title="Search map in Ultimate FSG" width=10 height=10 src="'+ FSH.System.imageServer + '/temple/1.gif"/></a>';
			mapName.innerHTML += ' <a href="http://wiki.fallensword.com/index.php/Special:Search?search=' + mapNameText + '&go=Go" target="_blank">' +
				'<img border=0 title="Search map in Wiki" width=10 height=10 src="/favicon.ico"/></a>';

			var huntingMode = FSH.Helper.huntingMode;
			imgSource = huntingMode === true ? FSH.Data.huntingOnImage : FSH.Data.huntingOffImage;
			mapName.innerHTML += ' <a href=# id="Helper:ToggleHuntingMode">' + imgSource + '</a>';

			if (FSH.System.getValue('showSpeakerOnWorld')) {
				if (FSH.System.getValue('playNewMessageSound'))
				{
					mapName.innerHTML += '<a href="#" id="toggleSoundLink">' + FSH.Data.soundMuteImage + '</a>';
				} else {
					mapName.innerHTML += '<a href="#" id="toggleSoundLink">' + FSH.Data.soundImage + '</a>';
				}
				document.getElementById('toggleSoundLink').addEventListener('click', FSH.Helper.toggleSound, true);

			}
			if (FSH.System.getValue('showFastWalkIconOnWorld')) {
				var enableFastWalk = FSH.System.getValue('enableFastWalk');
				imgSource = enableFastWalk === true ? FSH.Data.runIcon : FSH.Data.stopIcon;
				altText = enableFastWalk === true ? 'FastWalk mode is ON' : 'FastWalk mode is OFF';
				mapName.innerHTML += ' <a href=# id="Helper:ToggleFastWalkMode"><img title="' + altText + '" src="' + imgSource + '" border=0 width=10 height=10/></a>';
				document.getElementById('Helper:ToggleFastWalkMode').addEventListener('click',
					function() {
						FSH.System.setValue('enableFastWalk',
							!FSH.System.getValue('enableFastWalk'));
						location.reload();
					},true);
			}
			document.getElementById('Helper:ToggleHuntingMode').addEventListener('click',
				function() {
					FSH.System.setValue('huntingMode',
						!FSH.Helper.huntingMode);
					location.reload();
				},true);

		}
		if (FSH.System.getValue('quickKill')) {
			FSH.Helper.oldMapDoNotKill();
		}
	},

	oldMapDoNotKill: function() {
		var doNotKillList = FSH.System.getValue('doNotKillList');
		var doNotKillListAry = doNotKillList.split(',');
		if (doNotKillListAry.length > 0) {
			for (var i=1; i<9; i += 1) {
				var monster = FSH.System.findNode('//a[@id="aLink' + i + '"]');
				if (monster) {
					var monsterName = monster.parentNode.parentNode.firstChild.textContent.trim();
					for (var j=0; j<doNotKillListAry.length; j += 1) {
						var doNotKillName = doNotKillListAry[j].trim();
						if (monsterName === doNotKillName){
							var monsterNameCell = monster.parentNode.parentNode;
							monsterNameCell.innerHTML = '<span style="color:blue;">' + monsterNameCell.innerHTML + '</span>';
							break;
						}
					}
				} else { break; }
			}
		}
	},

	injectWorldMap: function() {
		var playerTile=FSH.System.findNode('//img/ancestor::td[@background]');
		if (playerTile) {
			FSH.Helper.xLocation = playerTile.cellIndex;
			FSH.Helper.yLocation = playerTile.parentNode.rowIndex;
		}
		FSH.Helper.showMap(true);
	},

	sendGoldToPlayer: function(){
//		var injectHere = FSH.System.findNode('//div[table[@class="centered" and @style="width: 270px;"]]');
//		if (!injectHere) {return;}
		var recipient = FSH.System.getValue('goldRecipient');
		var amount = FSH.System.getValue('goldAmount');
		//FSH.System.xmlhttp('index.php?cmd=trade');
		var xcNum = FSH.System.getValue('goldConfirm');
		if (xcNum === '') {
			alert('You have to visit the trade page once to use the send gold functionality');
			return;
		}
		var url = 'index.php?cmd=trade&subcmd=sendgold&xc=' + xcNum +
			'&target_username=' + recipient +'&gold_amount='+ amount;
		FSH.System.xmlhttp(url, FSH.Helper.goldToPlayerSent,
			{'amount': amount, 'recipient': recipient} );
	},

	goldToPlayerSent: function(responseText, callback) {
		var info = FSH.Layout.infoBox(responseText);
		if (info==='' || info==='You successfully sent gold!') {
			var currentGoldSentTotal = FSH.System.getValue('currentGoldSentTotal')*1;
			currentGoldSentTotal += FSH.System.intValue(callback.amount);
			info = 'You successfully sent ' + callback.amount + ' gold to ' + callback.recipient + '! Current total sent is '+currentGoldSentTotal+' gold.';
			FSH.System.setValue('currentGoldSentTotal', currentGoldSentTotal);
		}
		var injectHere = FSH.System.findNode('//div[table[@class="centered" and @style="width: 270px;"]]');
		if (!injectHere) {return;}
		var newSpan = document.createElement('SPAN');
		injectHere.appendChild(newSpan);
		newSpan.setAttribute('background', FSH.System.imageServer + '/skin/realm_right_bg.jpg');
		newSpan.innerHTML='<div style="margin-left:28px; margin-right:28px; color:navy; font-size:xx-small;">' + info + '</div>';
	},

	toggleFootprints: function() {
		var levelName;
		var footprints = FSH.System.getValue('footprints');
		if (footprints === undefined) {footprints=false;}
		footprints = !footprints;
		FSH.System.setValue('footprints', footprints);

		if (!footprints) { // clear footprints
			var theMap = FSH.System.getValueJSON('map');
			var realm = FSH.System.findNode('//h3[@id="world-realm-name"]');
			if ($('h3#world-realm-name').data('realm')) {
				// var realmId = $('h3#world-realm-name').data('realm').id.trim();
				levelName = $('h3#world-realm-name').data('realm').name.trim();
			}
			if (!levelName) {levelName=realm.innerHTML;}
			FSH.Helper.levelName = levelName;
			theMap.levels[FSH.Helper.levelName] = {};
			FSH.System.setValueJSON('map', theMap);
		}

		document.getElementById('Helper:ToggleFootprints').src =
			FSH.System.imageServer +
			'/skin/' + (footprints?'quest_complete':'quest_incomplete') + '.gif';
	},

	prepareCombatLog: function() {
		var reportsTable=FSH.System.findNode('//div[table[@class="centered" and @style="width: 270px;"]]');
		if (!reportsTable) {return;}
		var tempLog=document.createElement('div');
		tempLog.id='reportsLog';
		var injLog=reportsTable.appendChild(tempLog);
		var is=injLog.style;
		is.color = 'black';
		is.backgroundImage='url(' + FSH.System.imageServer + '/skin/realm_right_bg.jpg)';
		is.maxHeight = '240px';
		is.width = '277px';
		is.maxWidth = is.width;
		is.marginLeft = '0px';
		is.marginRight = '0px';
		is.paddingLeft = '26px';
		is.paddingRight = '24px';
		is.overflow = 'hidden';
		is.fontSize = 'xx-small';
		is.textAlign = 'justify';
	},

	getMonster: function(index) {
		return FSH.System.findNode('//a[@id="aLink' + index + '"]');
	},

	killSingleMonster: function(monsterNumber) {
		if (!FSH.System.getValue('quickKill')) {return;}
		var kills=0;
		var monster = FSH.Helper.getMonster(monsterNumber);

		var doNotKillList = FSH.System.getValue('doNotKillList');
		var doNotKillListAry = doNotKillList.split(',');

		if (monster) {
			var monsterName = monster.parentNode.parentNode.textContent.trim();
			var injectHere = monster.parentNode.parentNode;
			var monsterFound = false;
			for (var j=0; j<doNotKillListAry.length; j += 1) {
				var doNotKillName = doNotKillListAry[j].trim();
				if (monsterName === doNotKillName){
					injectHere.innerHTML = '<nobr><span style="color:blue; font-size:x-small;">On do not kill list&nbsp;</span></nobr>';
					monsterFound = true;
					break;
				}
			}
			if (!monsterFound) {
				kills+=1;
				FSH.System.xmlhttp(monster.getAttribute('href'), FSH.Helper.killedMonster, {'node': monster, 'index': monsterNumber});
			}
		}
	},

	prepareCheckMonster: function() {
		FSH.Helper.colorMonsters();
		FSH.Helper.getMonsterInfo();
	},

	colorMonsters: function() {
		if (!FSH.System.getValue('enableCreatureColoring')) {return;}
		var monsters = FSH.System.findNodes('//a[contains(@href,"cmd=combat") and not(contains(@href,"max_turns="))]');
		if (!monsters) {return;}
		for (var i=0; i<monsters.length; i += 1) {
			var monster = monsters[i];
			if (monster) {
				// add monster color based on elite types
				var monsterText = monster.parentNode.parentNode.parentNode.cells[1];
				if (monsterText.textContent.match(/\(Champion\)/i)) {
					monsterText.style.color = 'green';
				}
				if (monsterText.textContent.match(/\(Elite\)/i)) {
					monsterText.style.color = 'yellow';
				}
				if (monsterText.textContent.match(/\(Super Elite\)/i)) {
					monsterText.style.color = 'red';
				}
			}
		}
	},

	getMonsterInfo: function() {
		if (!FSH.System.getValue('showCreatureInfo')) {return;}
		var monsters = FSH.System.findNodes('//a[contains(@href,"cmd=world&' +
			'subcmd=viewcreature&creature_id=")]');
		if (!monsters) {return;}
		for (var i=0; i<monsters.length; i += 1) {
			var monster = monsters[i];
			if (monster) {
				if (FSH.System.getValue('showMonsterLog')) {
					FSH.System.xmlhttp(monster.getAttribute('href'), 
						FSH.Helper.checkedMonster, 
						{'monster':monster,'showTip':false});
				} else {
					monster.addEventListener('mouseover', 
					FSH.Helper.showTipCreatureInfo, true);
				}
			}
		}
	},

	showTipCreatureInfo: function(evt) {
		var monster=evt.target.parentNode;
		if (monster.getAttribute('mouseovertext') !== undefined) {
			evt.target.removeEventListener('mouseover', FSH.Helper.showTipCreatureInfo, true);
			return;
		}
		FSH.System.xmlhttp(monster.getAttribute('href'), FSH.Helper.checkedMonster, {'monster':monster,'showTip':true});
	},

	checkedMonster: function(responseText, callback) {
		var creatureInfo=FSH.System.createDocument(responseText);
		var statsNode = FSH.System.findNode('//table[@width="400"]', creatureInfo);
		if (!statsNode) {return;} // FF2 error fix
		var showMonsterLog = FSH.System.getValue('showMonsterLog');
		//store the stats
		var classNode = statsNode.rows[1].cells[1];
		var levelNode = statsNode.rows[1].cells[3];
		var attackNode = statsNode.rows[2].cells[1];
		var defenseNode = statsNode.rows[2].cells[3];
		var armorNode = statsNode.rows[3].cells[1];
		var damageNode = statsNode.rows[3].cells[3];
		var hitpointsNode = statsNode.rows[4].cells[1];
		var goldNode = statsNode.rows[4].cells[3];
		var hitpoints = parseInt(hitpointsNode.textContent.replace(/,/g,''),10);
		var armorNumber = parseInt(armorNode.textContent.replace(/,/g,''),10);
		var combatEvaluatorBias = FSH.System.getValue('combatEvaluatorBias');
		// var attackVariable = 1.1053
		var generalVariable = 1.1053;
		var hpVariable = 1.1;
		if (combatEvaluatorBias === 1) {
			generalVariable = 1.1;
			hpVariable = 1.053;
		} else if (combatEvaluatorBias === 2) {
			generalVariable = 1.053;
			hpVariable = 1;
		} else if (combatEvaluatorBias === 3) {
			generalVariable = 1.1053;
			hpVariable = 1;
		}
		var oneHitNumber = Math.ceil(hitpoints*hpVariable+armorNumber*generalVariable);

		var hideRestOfRows = false;
		var collectEnchantments = true;
		var enchantmentsList = [];
		for (var i=0; i<statsNode.rows.length; i += 1) {
			var enchantment = {};
			var firstCell = statsNode.rows[i].cells[0];
			var thirdCell = statsNode.rows[i].cells[2];
			//color titles black
			if (firstCell.getAttribute('bgcolor') === '#cd9e4b') {
				firstCell.style.color='black';
			}
			//color text white so it can be read
			if (firstCell.firstChild && firstCell.firstChild.tagName) {
				firstCell.firstChild.style.color='#cccccc';
			}
			if (thirdCell && thirdCell.firstChild &&
				thirdCell.firstChild.tagName) {
				thirdCell.firstChild.style.color='#cccccc';
			}
			//
			if (firstCell.textContent === 'Actions') {
				hideRestOfRows = true;
			}
			if (hideRestOfRows) {
				firstCell.style.display = 'none';
				firstCell.style.visibility = 'hidden';
			}

			//store the enchantment min and max values in the monster log (if enabled)
			if (showMonsterLog && i >= 7 && collectEnchantments) { //first enchantment row
				var ThisRowFirstCell = statsNode.rows[i].cells[0];
				if (ThisRowFirstCell.textContent !== '[no enhancements]') {
					var SecondNextRowFirstCell = statsNode.rows[i+2].cells[0];
					if (SecondNextRowFirstCell.textContent === 'Description') {
						collectEnchantments = false;
					}
					enchantment.name = statsNode.rows[i].cells[0].textContent;
					enchantment.value = statsNode.rows[i].cells[1].textContent*1;
					enchantmentsList.push(enchantment);
				} else {
					collectEnchantments = false;
				}
			}
		}

		var imageTable = FSH.System.findNode('//table[tbody/tr/td/img[contains(@src, "/creatures/")]]', creatureInfo);
		var imageNode = imageTable.rows[0].cells[0].firstChild;
		var nameNode = imageTable.rows[1].cells[0].firstChild;
		var imageNodeSRC = imageNode.src.replace(/.jpg(.*)/,'.jpg');

		if (showMonsterLog) {
			FSH.monstorLog.pushMonsterInfo({'key0':nameNode.textContent, 'key1':imageNodeSRC, 'key2':classNode.textContent, 'key3':levelNode.textContent,
				'key4':attackNode.textContent, 'key5':defenseNode.textContent, 'key6':armorNode.textContent, 'key7':damageNode.textContent,
				'key8':hitpointsNode.textContent, 'key9':goldNode.textContent, 'key10':enchantmentsList});
		}

		levelNode.innerHTML += ' (your level:<span style="color:yellow">' +
			FSH.System.intValue($('dt.stat-level:first').next().text()) +
			'</span>)';
		attackNode.innerHTML += ' (your defense:<span style="color:yellow">' +
			FSH.System.intValue($('dt.stat-defense:first').next().text()) +
			'</span>) ';
		defenseNode.innerHTML += ' (your attack:<span style="color:yellow">' +
			FSH.System.intValue($('dt.stat-attack:first').next().text()) +
			'</span>)';
		armorNode.innerHTML += ' (your damage:<span style="color:yellow">' +
			FSH.System.intValue($('dt.stat-damage:first').next().text()) +
			'</span>)';
		damageNode.innerHTML += ' (your armor:<span style="color:yellow">' +
			FSH.System.intValue($('dt.stat-armor:first').next().text()) +
			'</span>)';
		hitpointsNode.innerHTML += ' (your HP:<span style="color:yellow">' +
			FSH.System.intValue($('dt.stat-hp:first').next().text()) +
			'</span>)' +
			'(1H: <span style="color:red">' + oneHitNumber + '</span>)';

		callback.monster.setAttribute('mouseOverText', '<table>' +
			'<tr><td valign=top>' + imageNode.parentNode.innerHTML + '</td>' +
			'<td rowspan=2>' + statsNode.parentNode.innerHTML + '</td></tr>' +
			'<tr><td align=center valign=top>' + nameNode.innerHTML + '</td></tr></table>');
		//fix me
		callback.monster.setAttribute('mouseOverWidth', '600');
		callback.monster.addEventListener('mouseover', FSH.Helper.clientTip, true);
		if (callback.showTip) {FSH.Helper.clientTip({'target':callback.monster});}
	},

	backpackUpdater: function(count){
		var slots = FSH.System.findNode('.//font[contains(.,"/") and @size="1"]');
		if (slots !== null){
			var bpslots = slots.childNodes[0].nodeValue.split('/');
			//note the - 0 is to insure that math is used
			slots.childNodes[0].nodeValue = bpslots[0] - 0 + count + ' /' + bpslots[1];
		}
	},

	killedMonster: function(responseText, callback) {
		var i;
		var doc=FSH.System.createDocument(responseText);

		var reportRE=/var\s+report=new\s+Array;\n(report\[[0-9]+\]="[^"]+";\n)*/;
		var report=responseText.match(reportRE);
		if (report) {report=report[0];}

		// var specialsRE=/<div id='specialsDiv' style='position:relative; display:block;'><font color='#FF0000'><b>Azlorie Witch Doctor was withered.</b></font>/
		var specials=FSH.System.findNodes('//div[@id="specialsDiv"]', doc);

		var xpGain       = FSH.System.getIntFromRegExp(responseText, /var\s+xpGain=(-?[0-9]+);/i);
		var goldGain     = FSH.System.getIntFromRegExp(responseText, /var\s+goldGain=(-?[0-9]+);/i);
		var guildTaxGain = FSH.System.getIntFromRegExp(responseText, /var\s+guildTaxGain=(-?[0-9]+);/i);
		var levelUp      = FSH.System.getIntFromRegExp(responseText, /var\s+levelUp=(-?[0-9]+);/i);
		//You looted the item '<font color='#009900'>Amulet of Gazrif</font>'</b><br><br><img src='http://fileserver.huntedcow.com/items/4613.gif' class='tipped' data-tipped-options='skin: "fsItem", ajax: true' data-tipped='fetchitem.php?item_id=4613&t=2&p=1478403&vcode=249a530a4a8790e924af351c49bcccda'>
		var lootRE=/You looted the item \'<font color=\'\#[0-9A-F]+\'>([^<]+)<\/font>\'.+?(fetchitem\.php\?item_id=[0-9]*\&t=[0-9]*\&p=[0-9]*\&vcode=[0-9a-zA-Z]*)/;//(fetchitem\.php\?item_id=[0-9]*\&t=[0-9]*\&p=[0-9]*\&vcode=[0-9a-zA-Z]*)
		var info         = FSH.Layout.infoBox(responseText);
		var lootMatch=responseText.match(lootRE);
		var lootedItem = '';
		var lootedItemURL = '';
		if (lootMatch && lootMatch.length>0) {
			lootedItem=lootMatch[1];
			lootedItemURL=lootMatch[2];
		}
		var shieldImpDeathRE = /Shield Imp absorbed all damage/;
		var shieldImpDeath = responseText.match(shieldImpDeathRE);

		var monster = callback.node;
		var showCombatLog = false;
		if (monster) {
			var result=document.createElement('DIV');
			var resultHtml = '<small style="color:green;">'+callback.index+'. XP:' + xpGain + ' Gold:' + goldGain + ' (' + guildTaxGain + ')</small>';
			var resultText = 'XP:' + xpGain + ' Gold:' + goldGain + ' (' + guildTaxGain + ')\n';
			if (info!=='') {
				resultHtml += '<br/><span style="font-size:x-small;width:120px;overflow:hidden;" title="' + info + '">' + info + '</span>';
				resultText += info + '\n';
			}
			if (lootedItem!=='') {
				FSH.Helper.backpackUpdater(1);
				// I've temporarily disabled the ajax thingie, as it doesn't seem to work anyway.
				resultHtml += '<br/><small style="color:green;">Looted item:<span class=\'tipped\' data-tipped-options=\'skin: "fsItem", ajax: true\' data-tipped=\''+lootedItemURL+'\'>' +
					lootedItem + '</span></small>';
				resultText += 'Looted item:' + lootedItem + '\n';
			}
			if (shieldImpDeath) {
				resultHtml += '<br/><small><span style="color:red;">Shield Imp Death</span></small>';
				resultText += 'Shield Imp Death\n';
				showCombatLog = true;
			}
			if (levelUp==='1') {
				resultHtml += '<br/><br/><span style="color:#999900;font-weight:bold;>Your level has increased!</span>';
				resultText += 'Your level has increased!\n';
				showCombatLog = true;
			}
			if (levelUp==='-1') {
				resultHtml += '<br/><br/><span style="color:#991100;font-weight:bold;">Your level has decreased!</span>';
				resultText += 'Your level has decreased!\n';
				showCombatLog = true;
			}
			if (xpGain<0) {result.style.color='red'; showCombatLog = true;}
			result.innerHTML=resultHtml;
			var monsterParent = monster.parentNode;
			result.id = 'result' + callback.index;
			if (report) {
				var reportLines=report.split('\n');
				var reportHtml='';
				var reportText='';
				if (specials) {
					reportHtml += '<span style="color:red">';
					for (i=0; i<specials.length; i += 1) {
						reportHtml += specials[i].textContent + '<br/>';
						reportText += specials[i].textContent + '\n';
					}
					reportHtml += '</span>';
				}
				for (i=0; i<reportLines.length; i += 1) {
					var reportMatch = reportLines[i].match(/\"(.*)\"/);
					if (reportMatch) {
						reportHtml += '<br/>' + reportMatch[1];
						reportText += reportMatch[1].replace(/<br>/g, '\n') + '\n';
					}
				}
				var mouseOverText = '<span><span style="color:#FFF380;text-align:center;">Combat Results</span>' + reportHtml + '</span>';
				FSH.Helper.appendCombatLog(reportHtml, showCombatLog);
				result.setAttribute('mouseOverText', mouseOverText);
				if (FSH.System.getValue('keepLogs')) {
					var now = new Date();
					FSH.Helper.appendSavedLog('\n================================\n' + FSH.System.formatDateTime(now) + '\n' + resultText + '\n' + reportText);
				}
			}

			monsterParent.innerHTML = '';
			monsterParent.parentNode.appendChild(result);
			result.setAttribute('style', 'float:right; text-align:right;');
			monsterParent.parentNode.setAttribute('style', ''); // removes the line height on the td
			if (report) {
				document.getElementById('result' + callback.index).addEventListener('mouseover', FSH.Helper.clientTip, true);
			}
		}
	},

	appendSavedLog: function(text) {
		setTimeout(function(){
			var theLog=FSH.System.getValue('CombatLog');
			if (!theLog) {theLog='';}
			theLog+=text;
			FSH.System.setValue('CombatLog', theLog);
		}, 0);
	},

	appendCombatLog: function(text, showCombatLog) {
		var reportLog = FSH.System.findNode('//div[@id="reportsLog"]');
		if (!reportLog) {return;}
		if (FSH.System.getValue('showCombatLog') || showCombatLog) {
			reportLog.innerHTML += text + '<br/>';
		}
	},

	scrollUpCombatLog: function() {
		var reportLog = FSH.System.findNode('//div[@id="reportsLog"]');
		reportLog.scrollTop-=10;
	},

	scrollDownCombatLog: function() {
		var reportLog = FSH.System.findNode('//div[@id="reportsLog"]');
		reportLog.scrollTop+=10;
	},

	clientTip: function(evt) {
		var target=evt.target;
		var value, width;
		do {
			if (target.getAttribute) {
				value=target.getAttribute('mouseovertext');
				width=target.getAttribute('mouseoverwidth');
			}
			target=target.parentNode;
		} while (!value && target);
		if (value) {
			target.setAttribute('data-tipped', value);
			target.setAttribute('data-tipped-options', 'maxWidth:800');
			target.className += ' tipped';
			// TODO creature mouseovers - when did these last work?
			//~ $T.show($(target));
		}
	},

	moveMe: function(dx, dy) {
		var xCoord;
		var yCoord;
		var pos=FSH.Helper.position();
		var enableFastWalk = FSH.System.getValue('enableFastWalk');
		if (pos) {
			if (pos.type === 'normal') {
				//if fast walk is enabled then use the stored location, otherwise look it up
				xCoord = enableFastWalk?FSH.Helper.xLocation:pos.X;
				yCoord = enableFastWalk?FSH.Helper.yLocation:pos.Y;
				location.href = 'index.php?cmd=world&subcmd=move&x=' + (xCoord+dx) + '&y=' + (yCoord+dy);
				FSH.Helper.xLocation+=dx;
				FSH.Helper.yLocation+=dy;
			}
			if (pos.type === 'worldmap') {
				//if fast walk is enabled then use the stored location, otherwise look it up
				xCoord = enableFastWalk?FSH.Helper.xLocation:pos.X;
				yCoord = enableFastWalk?FSH.Helper.yLocation:pos.Y;
				FSH.System.xmlhttp('index.php?cmd=world&subcmd=move&x=' +
					(xCoord+dx) + '&y=' + (yCoord+dy), function() {
						location.href = FSH.System.server +
							'index.php?cmd=world&subcmd=map';});
				FSH.Helper.xLocation+=dx;
				FSH.Helper.yLocation+=dy;

			}
		}
	},

	killMonsterAt: function(index) {
		var linkObj = FSH.Helper.getMonster(index);
		if (linkObj!==null) {
			if (FSH.System.getValue('quickKill')) {
				FSH.Helper.killSingleMonster(index);
			}
			else {
				location.href = linkObj.getAttribute('href');
			}
		}
	},

	keyPress: function(evt) {
		var r, s;
		if (evt.target.tagName!=='HTML' && evt.target.tagName!=='BODY') {return;}

		// ignore control, alt and meta keys (I think meta is the command key in Macintoshes)
		if (evt.ctrlKey) {return;}
		if (evt.metaKey) {return;}
		if (evt.altKey) {return;}

		r = evt.charCode;
		s = evt.keyCode;

		switch (r) {
		case 113: // nw [q]
			FSH.Helper.moveMe(-1,-1);
			break;
		case 119: // n [w]
			FSH.Helper.moveMe(0,-1);
			break;
		case 101: // ne [e]
			FSH.Helper.moveMe(1,-1);
			break;
		case 97: // w [a]
			FSH.Helper.moveMe(-1,0);
			break;
		case 100: // e [d]
			FSH.Helper.moveMe(1,0);
			break;
		case 122: // sw [z]
			FSH.Helper.moveMe(-1,1);
			break;
		case 120: // s [x]
			FSH.Helper.moveMe(0,1);
			break;
		case 99: // se [c]
			FSH.Helper.moveMe(1,1);
			break;
		case 114: // repair [r]
			//do not use repair link for new map
			if ($('#worldPage').length === 0) {
				location.href = 'index.php?cmd=blacksmith&subcmd=repairall&fromworld=1';
			}
			break;
		case 71: // create group [G]
			location.href = 'index.php?cmd=guild&subcmd=groups&subcmd2=create&fromworld=1';
			break;
		case 76: // Log Page [L]
			location.href = 'index.php?cmd=log';
			break;
		case 103: // go to guild [g]
			location.href = 'index.php?cmd=guild&subcmd=manage';
			break;
		case 106: // join all group [j]
			if (!FSH.System.getValue('enableMaxGroupSizeToJoin')) {
				location.href = 'index.php?cmd=guild&subcmd=groups&subcmd2=joinall';
			} else {
				location.href = 'index.php?cmd=guild&subcmd=groups&subcmd2=joinallgroupsundersize';
			}
			break;
		case 49: // [1]
		case 50: // [2]
		case 51: // [3]
		case 52: // [4]
		case 53: // [5]
		case 54: // [6]
		case 55: // [7]
		case 56: // keyed combat [8]
			FSH.Helper.killMonsterAt(r-48);
			break;
		case 98: // backpack [b]
			//~ location.href = 'index.php?cmd=profile&subcmd=dropitems&fromworld=1';
			location.href = 'index.php?cmd=profile&subcmd=dropitems';
			break;
		case 115: // use stairs [s]
			FSH.Helper.useStairs(); // this is suspect, is it old map only?
			break;
		case 116: // quick buy [t]
			FSH.Helper.quickBuyItem();
			break;
		case 118: // fast wear manager [v]
			location.href = 'index.php?cmd=notepad&blank=1&subcmd=quickwear';
			break;
		case 121: // fast send gold [y]
			FSH.Helper.sendGoldToPlayer();
			break;
		case 19: // quick buffs []
			// openWindow('', 'fsQuickBuff', 618, 800, ',scrollbars');
			FSH.System.openInTab(FSH.System.server + 'index.php?cmd=quickbuff');
			break;
		case 48: // return to world [0]
			//do not use if using new map
			if ($('#worldPage').length === 0) {
				location.href = 'index.php?cmd=world';
			}
			break;
		case 109: // map [m]
			// window.open('index.php?cmd=world&subcmd=map', 'fsMap');
			// openWindow('index.php?cmd=world&subcmd=map', 'fsMap', 650, 650, ',scrollbars,resizable');
			FSH.System.openInTab(FSH.System.server + 'index.php?cmd=world&subcmd=map');
			break;
		case 112: // profile [p]
			location.href = 'index.php?cmd=profile';
			break;
		case 110: // mini map [n]
			FSH.Helper.displayMiniMap();
			break;
		case 78: // auto move in mini map [N]
			FSH.Helper.autoMoveMiniMap();
			break;
		case 62: // move to next page [>]
		case 60: // move to prev page [<]
			FSH.Helper.movePage({62:'>', 60:'<'}[r]);
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
			var keyMap = {'key33':1, 'key64':2, 'key34':2, 'key35':3, 'key36':4, 'key37':5,
				'key94':6, 'key38':7, 'key42':8, 'key40':9};
			// I'm using "key??" because I don't feel comfortable of naming properties with integers
			var itemIndex = keyMap['key' + r];
			FSH.System.xmlhttp('index.php?cmd=profile', FSH.Helper.changeCombatSet, itemIndex);
			break;
		case 41: // Shift+0
			// TODO: ask for a number, check isnumeric, then call changeCombatSet with that index.
			break;
		case 0: // special key
			switch (s) {
			case 37: // w
				FSH.Helper.moveMe(-1,0);
				evt.preventDefault();
				evt.stopPropagation();
				break;
			case 38: // n
				FSH.Helper.moveMe(0,-1);
				evt.preventDefault();
				evt.stopPropagation();
				break;
			case 39: // e
				FSH.Helper.moveMe(1,0);
				evt.preventDefault();
				evt.stopPropagation();
				break;
			case 40: // s
				FSH.Helper.moveMe(0,1);
				evt.preventDefault();
				evt.stopPropagation();
				break;
			case 33:
				if (FSH.System.findNode('//div[@id="reportsLog"]')) {
					FSH.Helper.scrollUpCombatLog();
					evt.preventDefault();
					evt.stopPropagation();
				}
				break;
			case 34:
				if (FSH.System.findNode('//div[@id="reportsLog"]')) {
					FSH.Helper.scrollDownCombatLog();
					evt.preventDefault();
					evt.stopPropagation();
				}
				break;
			default:
				// console.log('special key: ' +s);
				break;
			}
			break;
		default:
			// console.log('standard key: ' +r);
			break;
		}
		//return true;
	},

	changeCombatSet: function(responseText, itemIndex) {
		var doc = FSH.System.createDocument(responseText);

		var cbsSelect = FSH.System.findNode('//select[@name="combatSetId"]', doc);

		// find the combat set id value
		var allItems = cbsSelect.getElementsByTagName('option');
		if (itemIndex >= allItems.length) {return;}
		var cbsIndex = allItems[itemIndex].value;

		$.ajax({
			type: 'POST',
			url: FSH.System.server + 'index.php',
			data: {
				cmd: 'profile',
				subcmd: 'managecombatset',
				combatSetId: cbsIndex,
				submit: 'Use'
			},
			success: function() {
				location.href = 'index.php?cmd=profile';
			}
		});
	},

	getKillStreak: function(responseText) {
		var doc=FSH.System.createDocument(responseText);
		//Kill&nbsp;Streak:&nbsp;
		var killStreakLocation = $(doc).find('td:contains("Streak:"):last').next();
		var playerKillStreakValue;
		if (killStreakLocation.length > 0) {
			playerKillStreakValue = FSH.System.intValue(killStreakLocation.text());
		}
		var killStreakElement = FSH.System.findNode('//span[@findme="killstreak"]');
		killStreakElement.innerHTML = FSH.System.addCommas(playerKillStreakValue);
		FSH.System.setValue('lastKillStreak', playerKillStreakValue);
		var deathDealerBuff = FSH.System.findNode('//img[contains(@data-tipped,"Death Dealer")]');
		var deathDealerRE = /<b>Death Dealer<\/b> \(Level: (\d+)\)/;
		var deathDealer = deathDealerRE.exec($(deathDealerBuff).data('tipped'));
		var deathDealerPercentage;
		if (deathDealer) {
			var deathDealerLevel = deathDealer[1];
			deathDealerPercentage = Math.min(Math.round(Math.floor(playerKillStreakValue/5) * deathDealerLevel) * 0.01, 20);
		}
		var deathDealerPercentageElement = FSH.System.findNode('//span[@findme="damagebonus"]');
		deathDealerPercentageElement.innerHTML = deathDealerPercentage;
		FSH.System.setValue('lastDeathDealerPercentage', deathDealerPercentage);
	},

	injectCreature: function() { // Legacy - Old Map
		FSH.System.xmlhttp('index.php?cmd=profile',
			FSH.Helper.getCreaturePlayerData,
			{	'groupExists': false,
				'groupAttackValue': 0,
				'groupDefenseValue': 0,
				'groupArmorValue': 0,
				'groupDamageValue': 0,
				'groupHPValue': 0,
				'groupEvaluation': false
			}
		);
		FSH.System.xmlhttp('index.php?cmd=guild&subcmd=groups',
			FSH.Helper.checkIfGroupExists);

		var creatureName =
			FSH.System.findNode('//td[@align="center"]/font[@size=3]/b');
		var doNotKillList = FSH.System.getValue('doNotKillList');
		if (creatureName) {
			creatureName.innerHTML += ' <a href="http://guide.fallensword.com/' +
				'index.php?cmd=creatures&search_name=' + creatureName.textContent +
				'&search_level_min=&search_level_max=&search_class=-1" ' +
				'target="_blank">' +
				'<img border=0 title="Search creature in Ultimate FSG" width=10 ' +
				'height=10 src="' + FSH.System.imageServer + '/temple/1.gif"/></a>' +
				' <a href="http://wiki.fallensword.com/index.php/Special:Search' +
				'?search=' + creatureName.textContent + '&go=Go" target="_blank">' +
				'<img border=0 title="Search creature in Wiki" width=10 ' +
				'height=10 src="/favicon.ico"/></a>';
			var extraText = 'Add to the do not kill list';
			if (doNotKillList.indexOf(creatureName.textContent.trim()) !== -1) {
				extraText = 'Remove from do not kill list';
			}
			creatureName.innerHTML += '&nbsp;<span style="cursor:pointer;' +
				'text-decoration:underline;color:blue;font-size:x-small;" ' +
				'id="addRemoveCreatureToDoNotKillList" creatureName="' +
				creatureName.textContent.trim() + '">' + extraText + '</span>';
			document.getElementById('addRemoveCreatureToDoNotKillList')
				.addEventListener('click',
					FSH.Helper.addRemoveCreatureToDoNotKillList, true);
		}
	},

	addRemoveCreatureToDoNotKillList: function(evt) { // Native - Both Maps
		var creatureName = evt.target.getAttribute('creatureName');
		var doNotKillList = FSH.System.getValue('doNotKillList');
		var newDoNotKillList = '';
		if (doNotKillList.indexOf(creatureName) !== -1) {
			newDoNotKillList = doNotKillList.replace(creatureName, '');
			newDoNotKillList = newDoNotKillList.replace(',,', ',');
			if (newDoNotKillList.charAt(0) === ',') {
				newDoNotKillList = newDoNotKillList
					.substring(1,newDoNotKillList.length);
			}
			evt.target.innerHTML = 'Add to the do not kill list';
		} else {
			newDoNotKillList = doNotKillList +
				(doNotKillList.length !== 0 ? ',' : '') + creatureName;
			newDoNotKillList = newDoNotKillList.replace(',,', ',');
			evt.target.innerHTML = 'Remove from do not kill list';
		}
		FSH.System.setValue('doNotKillList',newDoNotKillList);
		FSH.Helper.doNotKillList = newDoNotKillList;
		//refresh the action list
		window.GameData.doAction(-1);
	},

	checkIfGroupExists: function(responseText) { // Hybrid - Both Maps
		var doc=FSH.System.createDocument(responseText);
		var groupExistsIMG = $(doc)
			.find('img[title="Disband Group (Cancel Attack)"]');
		if (groupExistsIMG.length > 0) {
			var groupHref = groupExistsIMG.parents('td:first').find('a:first')
				.attr('href');
			FSH.System.xmlhttp(groupHref, FSH.Helper.getCreatureGroupData);
		}
	},

	getCreatureGroupData: function(responseText) { // Legacy - Both Maps
		var doc = FSH.System.createDocument(responseText);
		var groupAttackValue = FSH.System.findNode('//table[@width="400"]/tbody' +
			'/tr/td[contains(.,"Attack:")]', doc).nextSibling.textContent
			.replace(/,/, '') * 1;
		var groupDefenseValue = FSH.System.findNode('//table[@width="400"]/tbody' +
			'/tr/td[contains(.,"Defense:")]', doc).nextSibling.textContent
			.replace(/,/, '') * 1;
		var groupArmorValue = FSH.System.findNode('//table[@width="400"]/tbody' +
			'/tr/td[contains(.,"Armor:")]', doc).nextSibling.textContent
			.replace(/,/, '') * 1;
		var groupDamageValue = FSH.System.findNode('//table[@width="400"]/tbody' +
			'/tr/td[contains(.,"Damage:")]', doc).nextSibling.textContent
			.replace(/,/, '') * 1;
		var groupHPValue = FSH.System.findNode('//table[@width="400"]/tbody' +
			'/tr/td[contains(.,"HP:")]', doc).nextSibling.textContent
			.replace(/,/, '') * 1;
		FSH.System.xmlhttp('index.php?cmd=profile',
			FSH.Helper.getCreaturePlayerData,
			{	'groupExists': true,
				'groupAttackValue': groupAttackValue,
				'groupDefenseValue': groupDefenseValue,
				'groupArmorValue': groupArmorValue,
				'groupDamageValue': groupDamageValue,
				'groupHPValue': groupHPValue,
				'groupEvaluation': true
			}
		);
	},

	getStat: function(stat, doc) {
		// 'Hidden' returns NaN
		return FSH.System.intValue($(stat, doc)
			.contents()
			.filter(function(){
				return this.nodeType === 3;
			})[0].nodeValue);
	},

	getBonus: function(stat, doc) {
		var target = $(stat, doc);
		var children = target.children();
		if (children.length === 0) {
			children = target.next();
		}
		return FSH.System.intValue(children.text().slice(2, -1));
	},

	getBuffLevel: function(doc, buff) {
		var hasBuff = $('img.tip-static[data-tipped*="b>' + buff + '</b"]',
			doc);
		hasBuff = hasBuff.data('tipped');
		var re = new RegExp('</b> \\(Level: (\\d+)\\)');
		var test = re.exec(hasBuff);
		return test === null ? 0 : FSH.System.intValue(test[1]);
	},

	playerData: function(responseText) {
		var obj = {};
		if (typeof responseText === 'string') {
			obj = FSH.Helper.playerDataString(responseText);
		}
		if (typeof responseText === 'object') {
			obj = FSH.Helper.playerDataObject(responseText);
		}
		return obj;
	},

	playerDataObject: function(responseText) {
		var obj = {
			levelValue: responseText.level,
			attackValue: responseText.attack,
			defenseValue: responseText.defense,
			armorValue: responseText.armor,
			damageValue: responseText.damage,
			hpValue: responseText.hp,
			killStreakValue: FSH.System.intValue(responseText.killstreak)
		};
		return obj;
	},

	playerDataString: function(responseText) {
		var doc = FSH.System.createDocument(responseText);
		var obj = {
			levelValue: FSH.Helper.getStat('#stat-vl', doc),
			attackValue: FSH.Helper.getStat('#stat-attack', doc),
			defenseValue: FSH.Helper.getStat('#stat-defense', doc),
			armorValue: FSH.Helper.getStat('#stat-armor', doc),
			damageValue: FSH.Helper.getStat('#stat-damage', doc),
			hpValue: FSH.Helper.getStat('#stat-hp', doc),
			killStreakValue: FSH.Helper.getStat('#stat-kill-streak', doc),
			//get buffs here later ... DD, CA, DC, Constitution, etc
			counterAttackLevel: FSH.Helper.getBuffLevel(doc, 'Counter Attack'),
			doublerLevel:		FSH.Helper.getBuffLevel(doc, 'Doubler'),
			deathDealerLevel:	FSH.Helper.getBuffLevel(doc, 'Death Dealer'),
			darkCurseLevel: 	FSH.Helper.getBuffLevel(doc, 'Dark Curse'),
			holyFlameLevel: 	FSH.Helper.getBuffLevel(doc, 'Holy Flame'),
			constitutionLevel:	FSH.Helper.getBuffLevel(doc, 'Constitution'),
			sanctuaryLevel: 	FSH.Helper.getBuffLevel(doc, 'Sanctuary'),
			flinchLevel:		FSH.Helper.getBuffLevel(doc, 'Flinch'),
			nightmareVisageLevel:
								FSH.Helper.getBuffLevel(doc, 'Nightmare Visage'),
			superEliteSlayerLevel:
								FSH.Helper.getBuffLevel(doc, 'Super Elite Slayer'),
			fortitudeLevel: 	FSH.Helper.getBuffLevel(doc, 'Fortitude'),
			chiStrikeLevel: 	FSH.Helper.getBuffLevel(doc, 'Chi Strike'),
			terrorizeLevel: 	FSH.Helper.getBuffLevel(doc, 'Terrorize'),
			barricadeLevel: 	FSH.Helper.getBuffLevel(doc, 'Barricade'),
			reignOfTerrorLevel: FSH.Helper.getBuffLevel(doc, 'Reign Of Terror'),
			anchoredLevel:		FSH.Helper.getBuffLevel(doc, 'Anchored'),
			severeConditionLevel:
								FSH.Helper.getBuffLevel(doc, 'Severe Condition'),
			entrenchLevel:		FSH.Helper.getBuffLevel(doc, 'Entrench'),
			cloakLevel: 		FSH.Helper.getBuffLevel(doc, 'Cloak')
		};
		obj.superEliteSlayerMultiplier = Math.round(0.002 *
			obj.superEliteSlayerLevel * 100) / 100;

		if (obj.cloakLevel === 0 || typeof obj.attackValue === 'number' &&
			!isNaN(obj.attackValue)) {return obj;}

		obj.attackBonus = FSH.Helper.getBonus('#stat-attack', doc);
		obj.defenseBonus = FSH.Helper.getBonus('#stat-defense', doc);
		obj.armorBonus = FSH.Helper.getBonus('#stat-armor', doc);
		obj.damageBonus = FSH.Helper.getBonus('#stat-damage', doc);
		obj.hpBonus = FSH.Helper.getBonus('#stat-hp', doc);

		obj.attackValue = obj.attackBonus > obj.levelValue * 10 ||
			obj.attackBonus < obj.levelValue ?
			obj.attackBonus : obj.levelValue * 10;
		obj.defenseValue = obj.defenseBonus > obj.levelValue * 10 ||
			obj.defenseBonus < obj.levelValue ?
			obj.defenseBonus : obj.levelValue * 10;
		obj.armorValue = obj.armorBonus > obj.levelValue * 10 ||
			obj.armorBonus < obj.levelValue ?
			obj.armorBonus : obj.levelValue * 10;
		obj.damageValue = obj.damageBonus > obj.levelValue * 10 ||
			obj.damageBonus < obj.levelValue ?
			obj.damageBonus : obj.levelValue * 10;
		obj.hpValue = obj.hpBonus;
		return obj;
	},

	creatureData: function(ses) { // Hybrid - Both Maps
		var obj = {};
		if ($('#worldPage').length > 0) { // new map
			obj.name    = $('#dialog-viewcreature').find('h2.name').text();
			obj.class   = $('#dialog-viewcreature')
				.find('span.classification')
				.text();
			// obj.level   = FSH.System.intValue($('#dialog-viewcreature')
				// .find('span.level').text());
			obj.attack  = FSH.System.intValue($('#dialog-viewcreature')
				.find('dd.attribute-atk').text());
			obj.defense = FSH.System.intValue($('#dialog-viewcreature')
				.find('dd.attribute-def').text());
			obj.armor   = FSH.System.intValue($('#dialog-viewcreature')
				.find('dd.attribute-arm').text());
			obj.damage  = FSH.System.intValue($('#dialog-viewcreature')
				.find('dd.attribute-dmg').text());
			obj.hp      = FSH.System.intValue($('#dialog-viewcreature')
				.find('p.health-max').text());
		} else { //old UI
			var creatureStatTable = FSH.System
				.findNode('//table[tbody/tr/td[.="Statistics"]]');
			if (!creatureStatTable) {return false;}
			obj.name    = FSH.System.findNode('//td/font[@size="3"][b]')
				.textContent.trim();
			obj.class   = creatureStatTable.rows[1].cells[1].textContent;
			// obj.level   = FSH.System.intValue(creatureStatTable.rows[1].cells[3]
				// .textContent);
			obj.attack  = FSH.System.intValue(creatureStatTable.rows[2].cells[1]
				.textContent);
			obj.defense = FSH.System.intValue(creatureStatTable.rows[2].cells[3]
				.textContent);
			obj.armor   = FSH.System.intValue(creatureStatTable.rows[3].cells[1]
				.textContent);
			obj.damage  = FSH.System.intValue(creatureStatTable.rows[3].cells[3]
				.textContent);
			obj.hp      = FSH.System.intValue(creatureStatTable.rows[4].cells[1]
				.textContent);
		}
		//reduce stats if critter is a SE and player has SES cast on them.
		if (obj.name.search('Super Elite') !== -1) {
			obj.attack -= Math.ceil(obj.attack * ses);
			obj.defense -= Math.ceil(obj.defense * ses);
			obj.armor -= Math.ceil(obj.armor * ses);
			obj.damage -= Math.ceil(obj.damage * ses);
			obj.hp -= Math.ceil(obj.hp * ses);
		}
		return obj;
	},

	evalExtraBuffs: function(combat) {
		combat.extraNotes = '';
		combat.extraNotes += combat.player.superEliteSlayerLevel > 0 ?
			'SES Stat Reduction Multiplier = ' +
			combat.player.superEliteSlayerMultiplier + '<br>':'';

		//math section ... analysis
		//Holy Flame adds its bonus after the armor of the creature has been taken off.
		combat.holyFlameBonusDamage = 0;
		if (combat.creature.class === 'Undead') {
			combat.holyFlameBonusDamage = Math.max(Math.floor(
				(combat.player.damageValue - combat.creature.armor) *
				combat.player.holyFlameLevel * 0.002),0);
			combat.extraNotes += combat.player.holyFlameLevel > 0 ?
				'HF Bonus Damage = ' + combat.holyFlameBonusDamage +
				'<br>':'';
		}

		//Death Dealer and Counter Attack both applied at the same time
		combat.deathDealerBonusDamage =
			Math.floor(combat.player.damageValue * (Math.min(Math.floor(
				combat.player.killStreakValue / 5) * 0.01 *
				combat.player.deathDealerLevel, 20) / 100));

		combat.counterAttackBonusAttack =
			Math.floor(combat.player.attackValue * 0.0025 *
			combat.player.counterAttackLevel);

		combat.counterAttackBonusDamage =
			Math.floor(combat.player.damageValue * 0.0025 *
			combat.player.counterAttackLevel);

		combat.extraStaminaPerHit =
			combat.player.counterAttackLevel > 0 ?
			Math.ceil((1 + combat.player.doublerLevel / 50) * 0.0025 *
			combat.player.counterAttackLevel) : 0;

		//playerAttackValue += counterAttackBonusAttack;
		//playerDamageValue += deathDealerBonusDamage + counterAttackBonusDamage;

		combat.extraNotes += combat.player.deathDealerLevel > 0 ?
			'DD Bonus Damage = ' + combat.deathDealerBonusDamage + '<br>':'';

		if (combat.player.counterAttackLevel > 0) {
			combat.extraNotes += 'CA Bonus Attack/Damage = ' +
				combat.counterAttackBonusAttack + ' / ' +
				combat.counterAttackBonusDamage + '<br>' +
				'CA Extra Stam Used = ' + combat.extraStaminaPerHit + '<br>';
		}

		return combat;

	},

	evalAttack: function(combat) {
		//Attack:
		combat.extraNotes += combat.player.darkCurseLevel > 0 ?
			'DC Bonus Attack = ' + Math.floor(combat.creature.defense *
			combat.player.darkCurseLevel * 0.002) + '<br>':'';

		combat.nightmareVisageAttackMovedToDefense =
			Math.floor(((combat.callback.groupExists ?
			combat.callback.groupAttackValue : combat.player.attackValue) +
			combat.counterAttackBonusAttack) *
			combat.player.nightmareVisageLevel * 0.0025);

		combat.extraNotes += combat.player.nightmareVisageLevel > 0 ?
			'NMV Attack moved to Defense = ' +
			combat.nightmareVisageAttackMovedToDefense + '<br>':'';

		combat.overallAttackValue = (combat.callback.groupExists ?
			combat.callback.groupAttackValue : combat.player.attackValue) +
			combat.counterAttackBonusAttack -
			combat.nightmareVisageAttackMovedToDefense;

		combat.hitByHowMuch = combat.overallAttackValue -
			Math.ceil(combat.attackVariable * (combat.creature.defense -
			combat.creature.defense * combat.player.darkCurseLevel * 0.002));

		if (combat.combatEvaluatorBias === 3) {
			combat.hitByHowMuch = combat.overallAttackValue - Math.ceil(
				combat.creature.defense - combat.creature.defense *
				combat.player.darkCurseLevel * 0.002
			) - 50;
		}

		return combat;

	},

	evalDamage: function(combat) {
		//Damage:
		combat.fortitudeExtraHPs = Math.floor((combat.callback.groupExists ?
			combat.callback.groupHPValue : combat.player.hpValue) *
			combat.player.fortitudeLevel * 0.001);

		combat.extraNotes += combat.player.fortitudeLevel > 0 ?
			'Fortitude Bonus HP = ' + combat.fortitudeExtraHPs + '<br>' : '';

		combat.overallHPValue = (combat.callback.groupExists ?
			combat.callback.groupHPValue : combat.player.hpValue) +
			combat.fortitudeExtraHPs;

		combat.chiStrikeExtraDamage = Math.floor(combat.overallHPValue *
			combat.player.chiStrikeLevel * 0.001);

		combat.extraNotes += combat.player.chiStrikeLevel > 0 ?
			'Chi Strike Bonus Damage = ' + combat.chiStrikeExtraDamage +
			'<br>':'';

		combat.overallDamageValue = (combat.callback.groupExists ?
			combat.callback.groupDamageValue : combat.player.damageValue) +
			combat.deathDealerBonusDamage + combat.counterAttackBonusDamage +
			combat.holyFlameBonusDamage + combat.chiStrikeExtraDamage;

		combat.damageDone = Math.floor(combat.overallDamageValue - (
			combat.generalVariable * combat.creature.armor +
			combat.hpVariable * combat.creature.hp));

		combat.numberOfHitsRequired = combat.hitByHowMuch > 0 ?
			Math.ceil(combat.hpVariable * combat.creature.hp / (
			combat.overallDamageValue < combat.generalVariable *
			combat.creature.armor ? 1 : combat.overallDamageValue -
			combat.generalVariable * combat.creature.armor)) :'-';

		return combat;

	},

	evalDefence: function(combat) {

		combat.overallDefenseValue = (combat.callback.groupExists ?
			combat.callback.groupDefenseValue : combat.player.defenseValue) +
			Math.floor((combat.callback.groupExists ?
			combat.callback.groupDefenseValue : combat.player.defenseValue) *
			combat.player.constitutionLevel * 0.001 ) +
			combat.nightmareVisageAttackMovedToDefense;

		combat.extraNotes += combat.player.constitutionLevel > 0 ?
			'Constitution Bonus Defense = ' +
			Math.floor((combat.callback.groupExists ?
			combat.callback.groupDefenseValue : combat.player.defenseValue) *
			combat.player.constitutionLevel * 0.001) + '<br>':'';

		combat.extraNotes += combat.player.flinchLevel > 0 ?
			'Flinch Bonus Attack Reduction = ' +
			Math.floor(combat.creature.attack * combat.player.flinchLevel *
			0.001) + '<br>':'';

		combat.creatureHitByHowMuch = Math.floor(combat.attackVariable *
			combat.creature.attack - combat.creature.attack *
			combat.player.flinchLevel * 0.001 - combat.overallDefenseValue);

		if (combat.combatEvaluatorBias === 3) {
			combat.creatureHitByHowMuch = Math.floor(combat.creature.attack -
				combat.creature.attack * combat.player.flinchLevel * 0.001 -
				combat.overallDefenseValue - 50);
		}

		return combat;

	},

	evalArmour: function(combat) {
		combat.overallArmorValue = (combat.callback.groupExists ?
			combat.callback.groupArmorValue : combat.player.armorValue) +
			Math.floor(combat.player.armorValue *
			combat.player.sanctuaryLevel * 0.001);

		combat.extraNotes += combat.player.sanctuaryLevel > 0 ?
			'Sanc Bonus Armor = ' + Math.floor(combat.player.armorValue *
			combat.player.sanctuaryLevel * 0.001) + '<br>':'';

		combat.terrorizeEffect = Math.floor(combat.creature.damage *
			combat.player.terrorizeLevel * 0.001);

		combat.extraNotes += combat.player.terrorizeLevel > 0 ?
			'Terrorize Creature Damage Effect = ' +
			combat.terrorizeEffect * -1 + '<br>':'';

		combat.creature.damage -= combat.terrorizeEffect;

		combat.creatureDamageDone = Math.ceil(combat.generalVariable *
			combat.creature.damage - combat.overallArmorValue +
			combat.overallHPValue);

		combat.numberOfCreatureHitsTillDead =
			combat.creatureHitByHowMuch >= 0 ?
			Math.ceil(combat.overallHPValue / (combat.generalVariable *
			combat.creature.damage < combat.overallArmorValue ? 1 :
			combat.generalVariable * combat.creature.damage -
			combat.overallArmorValue)):'-';

		return combat;

	},

	evalAnalysis: function(combat) {
		//Analysis:
		combat.playerHits = combat.numberOfCreatureHitsTillDead === '-' ?
			combat.numberOfHitsRequired : combat.numberOfHitsRequired === '-' ?
			'-' : combat.numberOfHitsRequired >
			combat.numberOfCreatureHitsTillDead ? '-' :
			combat.numberOfHitsRequired;

		combat.creatureHits = combat.numberOfHitsRequired === '-' ?
			combat.numberOfCreatureHitsTillDead :
			combat.numberOfCreatureHitsTillDead === '-' ? '-' :
			combat.numberOfCreatureHitsTillDead > combat.numberOfHitsRequired ?
			'-' : combat.numberOfCreatureHitsTillDead;

		combat.fightStatus = 'Unknown';
		if (combat.playerHits === '-' && combat.creatureHits === '-') {
			combat.fightStatus = 'Unresolved';
		} else if (combat.playerHits === '-') {
			combat.fightStatus = 'Player dies';
		} else if (combat.playerHits === 1) {
			combat.fightStatus = 'Player 1 hits' + (
				combat.numberOfCreatureHitsTillDead -
				combat.numberOfHitsRequired <= 1 ? ', dies on miss' :
				', survives a miss');
		} else if (combat.playerHits > 1) {
			combat.fightStatus = 'Player > 1 hits' + (
				combat.numberOfCreatureHitsTillDead -
				combat.numberOfHitsRequired <= 1 ? ', dies on miss' :
				', survives a miss');
		}

		return combat;

	},

	evalCA: function(combat) {
		if (combat.player.counterAttackLevel > 0 &&
			combat.numberOfHitsRequired === 1) {
			combat.lowestCALevelToStillHit = Math.max(Math.ceil((
				combat.counterAttackBonusAttack - combat.hitByHowMuch + 1) /
				combat.player.attackValue / 0.0025), 0);
			combat.lowestCALevelToStillKill = Math.max(Math.ceil((
				combat.counterAttackBonusDamage - combat.damageDone + 1) /
				combat.player.damageValue / 0.0025), 0);
			combat.lowestFeasibleCALevel =
				Math.max(combat.lowestCALevelToStillHit,
				combat.lowestCALevelToStillKill);
			combat.extraNotes += 'Lowest CA to still 1-hit this creature = ' +
				combat.lowestFeasibleCALevel + '<br>';
			if (combat.lowestFeasibleCALevel !== 0) {
				combat.extraAttackAtLowestFeasibleCALevel =
					Math.floor(combat.player.attackValue * 0.0025 *
					combat.lowestFeasibleCALevel);
				combat.extraDamageAtLowestFeasibleCALevel =
					Math.floor(combat.player.damageValue * 0.0025 *
					combat.lowestFeasibleCALevel);
				combat.extraNotes +=
					'Extra CA Att/Dam at this lowered CA level = ' +
					combat.extraAttackAtLowestFeasibleCALevel + ' / ' +
					combat.extraDamageAtLowestFeasibleCALevel + '<br>';
			}
			combat.extraStaminaPerHitAtLowestFeasibleCALevel =
				combat.player.counterAttackLevel > 0 ? Math.ceil((1 +
				combat.player.doublerLevel / 50) * 0.0025 *
				combat.lowestFeasibleCALevel) :0;
			if (combat.extraStaminaPerHitAtLowestFeasibleCALevel <
				combat.extraStaminaPerHit) {
				combat.extraNotes +=
					'Extra Stam Used at this lowered CA level = ' +
					combat.extraStaminaPerHitAtLowestFeasibleCALevel + '<br>';
			}
			else {
				combat.extraNotes += 'No reduction of stam used at the lower CA level<br>';
			}
		}

		if (combat.numberOfHitsRequired === '-' ||
			combat.numberOfHitsRequired !== 1) {
			combat.lowestCALevelToStillHit = Math.max(Math.ceil((
				combat.counterAttackBonusAttack - combat.hitByHowMuch + 1) /
				combat.player.attackValue / 0.0025), 0);
			combat.lowestCALevelToStillKill = Math.max(Math.ceil((
				combat.counterAttackBonusDamage - combat.damageDone + 1) /
				combat.player.damageValue / 0.0025), 0);
			if (combat.lowestCALevelToStillHit > 175) {
				combat.extraNotes +=
					'Even with CA175 you cannot hit this creature<br>';
			} else if (combat.lowestCALevelToStillHit !== 0) {
				combat.extraNotes += 'You need a minimum of CA' +
					combat.lowestCALevelToStillHit +
					' to hit this creature<br>';
			}
			if (combat.lowestCALevelToStillKill > 175) {
				combat.extraNotes +=
					'Even with CA175 you cannot 1-hit kill this creature<br>';
			} else if (combat.lowestCALevelToStillKill !== 0) {
				combat.extraNotes += 'You need a minimum of CA' +
					combat.lowestCALevelToStillKill +
					' to 1-hit kill this creature<br>';
			}
		}

		return combat;

	},

	evalHTML: function(combat) {

		return '<table width="100%"><tbody>' +
			'<tr><td bgcolor="#CD9E4B" colspan="4" align="center">' +
			(combat.callback.groupExists ? 'Group ':'') +
			'Combat Evaluation</td></tr>' +
			'<tr><td align="right"><span style="color:#333333">' +
			'Will I hit it? </td><td align="left">' +
			(combat.hitByHowMuch > 0 ? 'Yes':'No') +
			'</td><td align="right"><span style="color:#333333">' +
			'Extra Attack: </td><td align="left">( ' +
			combat.hitByHowMuch + ' )</td></tr>' +
			'<tr><td align="right"><span style="color:#333333">' +
			'# Hits to kill it? </td><td align="left">' +
			combat.numberOfHitsRequired +
			'</td><td align="right"><span style="color:#333333">' +
			'Extra Damage: </td><td align="left">( ' + combat.damageDone +
			' )</td></tr>' +
			'<tr><td align="right"><span style="color:#333333">' +
			'Will I be hit? </td><td align="left">' +
			(combat.creatureHitByHowMuch >= 0 ? 'Yes':'No') +
			'</td><td align="right"><span style="color:#333333">' +
			'Extra Defense: </td><td align="left">( ' + -1 *
			combat.creatureHitByHowMuch + ' )</td></tr>' +
			'<tr><td align="right"><span style="color:#333333">' +
			'# Hits to kill me? </td><td align="left">' +
			combat.numberOfCreatureHitsTillDead +
			'</td><td align="right"><span style="color:#333333">' +
			'Extra Armor + HP: </td><td align="left">( ' + -1 *
			combat.creatureDamageDone + ' )</td></tr>' +
			'<tr><td align="right"><span style="color:#333333">' +
			'# Player Hits? </td><td align="left">' + combat.playerHits +
			'</td><td align="right"><span style="color:#333333">' +
			'# Creature Hits? </td><td align="left">' + combat.creatureHits +
			'</td></tr>' +
			'<tr><td align="right"><span style="color:#333333">' +
			'Fight Status: </span></td><td align="left" colspan="3"><span>' +
			combat.fightStatus + '</span></td></tr>' +
			'<tr><td align="right"><span style="color:#333333">' +
			'Notes: </span></td><td align="left" colspan="3">' +
			'<span style="font-size:x-small;">' + combat.extraNotes +
			'</span></td></tr>' +
			'<tr><td colspan="4"><span style="font-size:x-small; ' +
			'color:gray">*Does include CA, DD, HF, DC, Flinch, Super Elite ' +
			'Slayer, NMV, Sanctuary, Constitution, Fortitude, Chi Strike ' +
			'and Terrorize (if active) and allow for randomness (1.1053). ' +
			'Constitution, NMV, Fortitude and Chi Strike apply to group ' +
			'stats.</span></td></tr>' +
			'</tbody></table>';

	},

	getCreaturePlayerData: function(responseText, callback) { // Legacy - Both Maps

		var combat = {};
		combat.callback = callback;
		//playerdata
		combat.player = FSH.Helper.playerData(responseText);

		combat.combatEvaluatorBias = FSH.System.getValue('combatEvaluatorBias');
		combat.attackVariable = 1.1053;
		combat.generalVariable =
			FSH.Data.bias[combat.combatEvaluatorBias] ?
			FSH.Data.bias[combat.combatEvaluatorBias].generalVariable :
			1.1053;
		combat.hpVariable =
			FSH.Data.bias[combat.combatEvaluatorBias] ?
			FSH.Data.bias[combat.combatEvaluatorBias].hpVariable : 1.1;

		//creaturedata
		var creatureStatTable;
		if ($('#worldPage').length === 0) { // old map
			creatureStatTable = FSH.System
				.findNode('//table[tbody/tr/td[.="Statistics"]]');
			if (!creatureStatTable) {return;}
		}

		combat.creature =
			FSH.Helper.creatureData(combat.player.superEliteSlayerMultiplier);
		combat = FSH.Helper.evalExtraBuffs(combat);
		combat = FSH.Helper.evalAttack(combat);
		combat = FSH.Helper.evalDamage(combat);
		combat = FSH.Helper.evalDefence(combat);
		combat = FSH.Helper.evalArmour(combat);
		combat = FSH.Helper.evalAnalysis(combat);
		combat = FSH.Helper.evalCA(combat);
		combat.evaluatorHTML = FSH.Helper.evalHTML(combat);

		var tempdata;

		if ($('#worldPage').length > 0) { // new map
			if (callback.groupEvaluation) {
				if ($('div#creatureEvaluatorGroup').length === 0) {
					$('#dialog-viewcreature')
						.append('<div id="creatureEvaluatorGroup" ' +
							'style="clear:both;"></div>');
				}
				tempdata = combat.evaluatorHTML.replace(/'/g,'\\\'');
				$('div#creatureEvaluatorGroup').html(tempdata);
			} else {
				if ($('div#creatureEvaluator').length === 0) {
					$('#dialog-viewcreature')
						.append('<div id="creatureEvaluator" ' +
							'style="clear:both;"></div>');
				}
				tempdata = combat.evaluatorHTML.replace(/'/g,'\\\'');
				$('div#creatureEvaluator').html(tempdata);
			}
		} else {
			var newRow = creatureStatTable.insertRow(creatureStatTable.rows.length);
			var newCell = newRow.insertCell(0);
			newCell.colSpan = '4';
			newCell.innerHTML = combat.evaluatorHTML;
		}

	},

	portalToStartArea: function() {
		if (window.confirm('Are you sure you with to use a special portal back to Krul Island?')) {
			var krulXCV = FSH.System.getValue('krulXCV');
			if (krulXCV) {
				FSH.System.xmlhttp('index.php?cmd=settings&subcmd=fix&xcv=' +
					krulXCV, function() {location.href = 
						'index.php?cmd=world';});
			} else {
				window.alert('Please visit the preferences page to cache your Krul Portal link');
			}
		}
	},

	displayMiniMap: function() {
		var miniMap = document.getElementById('miniMap');
		if (!miniMap) {
			miniMap = document.createElement('div');
			miniMap.style.position = 'absolute';
			miniMap.style.left = 0;
			miniMap.style.top = 0;
			miniMap.style.display = 'none';
			miniMap.id = 'miniMap';
			miniMap.style.zIndex = '90';
			miniMap.style.filter = 'alpha';
			miniMap.style.opacity = '0.9';

			var objBody = document.getElementsByTagName('body').item(0);
			objBody.insertBefore(miniMap, objBody.firstChild);
		}
		var miniMapName = FSH.System.getValue('miniMapName');
		var miniMapSource = FSH.System.getValue('miniMapSource');
		if (miniMap.style.display !== '') {
			if (miniMapName && FSH.Helper.levelName === miniMapName) {
				miniMap.innerHTML = miniMapSource;
				FSH.Helper.addMiniMapExtras(miniMap);
			}
			else {
				FSH.System.xmlhttp('index.php?cmd=world&subcmd=map', FSH.Helper.loadMiniMap, true);
			}
		}
		else {miniMap.style.display = 'none';}
	},

	loadMiniMap: function(responseText) {
		var size = 20;
		var miniMap = document.getElementById('miniMap');
		var docu = FSH.System.createDocument(responseText);
		//shrink the background down from 40 to 20 and prep it for the mini map POI logic.
		$(docu).find('td[background]').each(function(){
			var background = $(this).attr('background');
			$(this).append('<img width=' + size + ' height=' + size + ' src="' + background + '">')
				.attr('background', '');
		});
		var doc = '<table cellspacing="0" cellpadding="0" align="center" id=miniMapTable>' + $(docu).find('table:first').html() + '</table>';
		doc = doc.replace(/<[^>]*title="You are here"[^>]*>/g, '');
		doc = doc.replace(/<center><table [^>]*><tbody><tr><td[^>]*><\/td><\/tr><\/tbody><\/table><\/center>/g,'');
		doc = doc.replace(/width="40"/g, 'width="' + size + '"').replace(/height="40"/g, 'height="' + size + '"');
		miniMap.innerHTML = doc;
		FSH.Helper.addMiniMapExtras(miniMap);

		if (FSH.Helper.levelName) {FSH.System.setValue('miniMapName', FSH.Helper.levelName);}
		FSH.System.setValue('miniMapSource', doc);
	},

	addMiniMapExtras: function(miniMap) {
		FSH.Helper.markPlayerOnMiniMap();
		FSH.Helper.toogleMiniMapPOI();
		var last=document.getElementById('miniMapTable').insertRow(-1).insertCell(0);
		last.colSpan=document.getElementById('miniMapTable').rows[0].cells.length;
		last.innerHTML = '<span style="color:green;font-size:x-small;font-weight:bolder">'+
			'<br/><h1 class=tipped data-tipped="Click on the player icon and left click drag the path you want to walk. If you walk into a wall or make an error, ' +
				'close and reopen the mini map and start again. Push N (capital n) to activate the auto-walk and watch the mini map as you walk to your ' +
				'new location. The screen will refresh when you get there.">Auto-Walk</h1></span>';
		FSH.Helper.miniMapTableEvents();
		miniMap.style.display = '';
	},

	miniMapTableEvents: function(){
		FSH.Helper.mouse = 0;
		FSH.Helper.moveList=[FSH.Helper.position()];
		document.getElementById('miniMap').addEventListener('mouseup', function(){FSH.Helper.mouse = 0;}, false);
		// collect table cells from the drawing_table div element
		var td = document.getElementById('miniMap').getElementsByTagName('td');
		// attach onMouseDown and onMouseOver event for collected table cells
		for (var i=0; i<td.length; i += 1){
			td[i].addEventListener('mousedown', FSH.Helper.mousedown, true);
			// colorize table cell if left mouse button is pressed
			//fix me?
			td[i].addEventListener('mouseover', FSH.Helper.miniMapMouseOver, true);
		}
	},

	miniMapMouseOver: function(){
		if (FSH.Helper.mouse === 1) {FSH.Helper.markPos(this);}
	},

	mousedown: function(evt){
		// needed for FF to disable dragging
		evt.preventDefault();
		// set pressed mouse button
		FSH.Helper.mouse = evt.which;
		// colorize pixel on mousedown event for TD element
		if (this.tagName === 'TD' && FSH.Helper.mouse === 1) {FSH.Helper.markPos(this);}
	},

	markPos: function(td) {
		var pos={'X':td.cellIndex,'Y':td.parentNode.rowIndex};
		if (!FSH.Helper.moveList[0]) {return;}
		var lastPos=FSH.Helper.moveList[FSH.Helper.moveList.length - 1];
		var dx=pos.X-lastPos.X, dy=pos.Y-lastPos.Y;
		if (dx>=-1 && dx <=1 && dy>=-1 && dy<=1 && (dx!==0 || dy!==0)) {
			FSH.Helper.moveList.push(pos);
			td.innerHTML='';
			td.style.backgroundColor = 'red';
		}
	},

	autoMoveMiniMap: function() {
		if (FSH.Helper.moveList && FSH.Helper.moveList.length > 1) {
			FSH.System.xmlhttp(
				'index.php?cmd=world&subcmd=move&x=' + FSH.Helper.moveList[1].X + 
					'&y=' + FSH.Helper.moveList[1].Y,
				FSH.Helper.autoMoveNext,
				1
			);
		}
	},

	autoMoveNext: function(responseText, id) {
		var currentPos = '('+FSH.Helper.moveList[id].X+', '+FSH.Helper.moveList[id].Y+')';
		if (responseText.indexOf(currentPos)<0) {
			alert('Cannot move via ' + currentPos);
			location.reload();
		} else {
			// update current pos
			FSH.Helper.markPosOnMiniMap(FSH.Helper.moveList[id]);
			// move next
			var nextId = id+1;
			if (nextId < FSH.Helper.moveList.length) {
				FSH.System.xmlhttp(
					'index.php?cmd=world&subcmd=move&x=' +
						FSH.Helper.moveList[nextId].X + '&y=' + 
						FSH.Helper.moveList[nextId].Y,
					FSH.Helper.autoMoveNext,
					nextId);
			} else {location.reload();}
		}
	},

	toogleMiniMapPOI: function() {
		var miniMap = document.getElementById('miniMap');
		var miniMapTable = document.getElementById('miniMapTable');
		var miniMapCover = document.getElementById('miniMapCover');
		if (!miniMapCover) {
			miniMapCover = document.createElement('div');
			miniMapCover.style.position = 'absolute';
			miniMapCover.style.left = 0;
			miniMapCover.style.top = 0;
			miniMapCover.id = 'miniMapCover';
			miniMapCover.style.zIndex = '100';
			miniMapCover.style.filter = 'alpha';
			miniMapCover.style.opacity = '0.4';
			miniMapCover.innerHTML = '<table cellspacing="0" cellpadding="0" align="center">'+
				miniMapTable.innerHTML+'</table>';
			miniMap.insertBefore(miniMapCover, miniMap.firstChild);
		} else {
			miniMap.removeChild(miniMapCover);
			return;
		}

		var nodes = FSH.System.findNodes('//div[@id="miniMapCover"]//td[contains(@class,"tipped")]');
		if (!nodes) {return;}
		for (var i=0; i<nodes.length; i += 1) {
			var tip=$(nodes[i]).data('tipped');
			var color=tip.indexOf(': ') >= 0 ? 'red' :
				tip.indexOf('Stairway to ') >= 0 ? 'green' : 'blue';
			nodes[i].innerHTML = '';
			nodes[i].style.backgroundColor = color;
		}
	},

	markPlayerOnMiniMap: function() {
		var posit = FSH.Helper.position();
		if (!posit) {return;}
		FSH.Helper.markPosOnMiniMap(posit);
	},

	markPosOnMiniMap: function(posit) {
		var miniMapTable = document.getElementById('miniMapTable');
		if (!miniMapTable) {return;}
		var position = miniMapTable.rows[posit.Y].cells[posit.X];
		var background = position.firstChild.src;
		position.innerHTML = '<center><img width=16 height=16 src="' + FSH.System.imageServer + '/skin/player_tile.gif" title="You are here"></center>';
		position.style.backgroundImage = 'url("' + background + '")';
		position.style.backgroundPosition = 'center';
		position.style.backgroundSize = '20px';
	},

	movePage: function(dir) {
		var dirButton = FSH.System.findNode('//input[@value="'+dir+'"]');
		if (!dirButton) {return;}
		var url = dirButton.getAttribute('onClick');
		url = url.replace(/^[^']*'/m, '').replace(/\';$/m, '');
		location.href = url;
	},

	getQuestInfo: function(responseText, callback) { // Legacy (Old Map)
		var idx = callback.data;
		var doc=FSH.System.createDocument(responseText);
		var questInfoLink = FSH.System.findNode('//a[@id="qiLink' + idx + '"]');
		var questNameNode = FSH.System.findNode('//font[b[.="Quest Details"]]/following-sibling::font[1]', doc);
		if (questNameNode) {
			questInfoLink.innerHTML = questNameNode.innerHTML.replace (/"/g, '');
		} else {
			questInfoLink.innerHTML = 'Unnamed Quest';
		}
		var questInfoElement = FSH.System.findNode('//span[@findme="questinfo' + idx + '"]');
		var trackingHTMLElement = FSH.System.findNode('//font[@color="#003300"]', doc);
		if (trackingHTMLElement) {
			questInfoElement.innerHTML = trackingHTMLElement.innerHTML;
		} else {
			questInfoElement.innerHTML = 'None';
		}
		document.getElementById('dontTrackThisQuest' + idx).addEventListener('click', FSH.questBook.dontTrackThisQuest, true);
	},

	useStairs: function() { //jquery
		//cmd=world&subcmd=usestairs&stairway_id=1645&x=6&y=11
		$('input[name="stairway_id"]:first').each(function(){
			location.href = 'index.php?cmd=world&subcmd=usestairs&' +
				'stairway_id=' + $(this).val();
		});
	},

	appendHead: function(o) { // native
		var count = 0;
		var scriptTag, linkTag;
		var scriptFiles = o.js || [];
		var cssFiles = o.css || [];
		var head = document.getElementsByTagName('head')[0];

		cssFiles.forEach(function(c) {
			linkTag = document.createElement('link');
			linkTag.type = 'text/css';
			linkTag.rel = 'stylesheet';
			linkTag.href = c;
			head.appendChild(linkTag);
		});

		scriptFiles.forEach(function(s) {
			scriptTag = document.createElement('script');
			scriptTag.type = 'text/javascript';
			if (typeof o.callback === 'function') {
				scriptTag.onload = function() {
					count += 1;
					if (count === o.js.length) {
						o.callback(o.param1, o.param2);
					}
				};
			}
			scriptTag.src = s;
			head.appendChild(scriptTag);
		});
	},

	onPageLoad: function() {
		FSH.environment.dispatch();
	},

}; // end of var helper

(function loadScripts () {
	var o = {
		css: ['https://fallenswordhelper.github.io/fallenswordhelper/resources/1513/calfSystem.css'],
		js:  ['https://cdn.jsdelivr.net/localforage/1.2.10/localforage.min.js',
			  'https://fallenswordhelper.github.io/fallenswordhelper/resources/1513/calfSystem.js'],
		callback: FSH.Helper.onPageLoad
	};
	if (typeof window.jQuery === 'undefined') {
		o.js.unshift('https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js');
	}
	FSH.Helper.appendHead(o);
})();

}; // end of var main

(function fshInstallAndRun() {

'use strict';

	if (typeof GM_info === 'undefined') { // Chromium Native
		var script = document.createElement('script');
		script.textContent = '(' + fshMain.toString() + ')();';
		document.body.appendChild(script);
	}
	else {
		fshMain();
	}

})();
