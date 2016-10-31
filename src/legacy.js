(function() {

	'use strict';
	var calf = require('./support/calf');
	var debug = require('./support/debug');
	var fshGa = require('./support/fshGa');
	var system = require('./support/system');
	var layout = require('./support/layout');
	var guildAdvisor = require('./guildAdvisor');
	var quickBuff = require('./quickBuff');
	var recipes = require('./recipes');
	var questBook = require('./questBook');
	var monstorLog = require('./monstorLog');
	var oldRelic = require('./oldRelic');
	var newMap = require('./newMap');

	var shopId;
	var shopItemId;

	function selectShopItem(evt) { // Legacy - Old map?
		shopItemId = evt.target.getAttribute('itemId');
		document.getElementById('warningMsg').innerHTML = '<span style="' +
			'color:red;font-size:small">Warning:<br> pressing "t" now will buy the ' +
			document.getElementById('buy_amount').value +
			' item(s) WITHOUT confirmation!</span>';
		document.getElementById('selectedItem').innerHTML =
			document.getElementById('select' + shopItemId).parentNode
			.innerHTML.replace(/='20'/g,'=45');
	}

	function injectShop() { // Hybrid - Old map?
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
				.addEventListener('click', selectShopItem, true);
		}
		shopId = itemNodes[0].parentNode.getAttribute('href')
			.match(/&shop_id=(\d+)/)[1];
	}

	function quickDone(responseText) { // Legacy - Old map?
		var infoMessage = layout.infoBox(responseText);
		document.getElementById('buy_result').innerHTML += '<br />' + infoMessage;
	}

	function quickBuyItem() { // Legacy - Old map? - from key handler
		if (!shopId || !shopItemId) {return;}
		document.getElementById('buy_result').innerHTML = 'Buying ' +
			document.getElementById('buy_amount').value + ' Items';
		for (var i = 0; i < document.getElementById('buy_amount').value; i += 1) {
			system.xmlhttp('index.php?cmd=shop&subcmd=buyitem&item_id=' +
				shopItemId + '&shop_id=' + shopId,
				quickDone);
		}
	}

	function impWarning(impsRemaining) { // Legacy
		var applyImpWarningColor = ' style="color:green; ' +
			'font-size:medium;"';
		if (impsRemaining===2){
			applyImpWarningColor = ' style="color:Orangered; ' +
				'font-size:medium; font-weight:bold;"';
		}
		if (impsRemaining===1){
			applyImpWarningColor = ' style="color:Orangered; ' +
				'font-size:large; font-weight:bold"';
		}
		if (impsRemaining===0){
			applyImpWarningColor = ' style="color:red; ' +
				'font-size:large; font-weight:bold"';
		}
		return '<tr><td' + applyImpWarningColor +
			'>Shield Imps Remaining: ' +  impsRemaining +
			(impsRemaining === 0 ?
			'&nbsp;<span id="Helper:recastImpAndRefresh" style="color:' +
			'blue;cursor:pointer;text-decoration:underline;font-size:' +
			'xx-small;">Recast</span>':'') + '</td></tr>';
	}

	function hasCA() { // Legacy
		var replacementText = '';
		var hasCounterAttack = system
			.findNode('//img[contains(@src,"/54_sm.gif")]');
		if (hasCounterAttack) {
			var counterAttackLevel;
			if (hasCounterAttack.getAttribute('src').search('/skills/') !== -1) {
				var onmouseover = $(hasCounterAttack).data('tipped');
				var counterAttackRE = /<b>Counter Attack<\/b> \(Level: (\d+)\)/;
				var counterAttack = counterAttackRE.exec(onmouseover);
				if (counterAttack) {
					counterAttackLevel = counterAttack[1];
				}
			}
			replacementText += '<tr><td style="font-size:small; color:' +
				'blue">CA' + counterAttackLevel + ' active</td></tr>';
		}
		return replacementText;
	}

	function hasDblr() { // Legacy
		var replacementText = '';
		var hasDoubler = system.findNode('//img[contains(@src,"/26_sm.gif")]');
		if (hasDoubler) {
			var doublerLevel;
			if (hasDoubler.getAttribute('src').search('/skills/') !== -1) {
				var onmouseover = $(hasDoubler).data('tipped');
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
		return replacementText;
	}

	function getKillStreak(responseText) { // Hybrid
		var doc=system.createDocument(responseText);
		var killStreakLocation = $(doc).find('td:contains("Streak:"):last').next();
		debug.log('killStreakLocation', killStreakLocation);
		var playerKillStreakValue;
		if (killStreakLocation.length > 0) {
			playerKillStreakValue = system.intValue(killStreakLocation.text());
		}
		var killStreakElement = system.findNode('//span[@findme="killstreak"]');
		killStreakElement.innerHTML = system.addCommas(playerKillStreakValue);
		system.setValue('lastKillStreak', playerKillStreakValue);
		var deathDealerBuff = system.findNode('//img[contains(@data-tipped,"Death Dealer")]');
		var deathDealerRE = /<b>Death Dealer<\/b> \(Level: (\d+)\)/;
		var deathDealer = deathDealerRE.exec($(deathDealerBuff).data('tipped'));
		var deathDealerPercentage;
		if (deathDealer) {
			var deathDealerLevel = deathDealer[1];
			deathDealerPercentage = Math.min(Math.round(Math.floor(playerKillStreakValue/5) * deathDealerLevel) * 0.01, 20);
		}
		var deathDealerPercentageElement = system.findNode('//span[@findme="damagebonus"]');
		deathDealerPercentageElement.innerHTML = deathDealerPercentage;
		system.setValue('lastDeathDealerPercentage', deathDealerPercentage);
	}

	function doDeathDealer(impsRemaining) { // Legacy
		var replacementText = '';

		var lastDeathDealerPercentage =
			system.getValue('lastDeathDealerPercentage');
		if (lastDeathDealerPercentage === undefined) {
			system.setValue('lastDeathDealerPercentage', 0);
			lastDeathDealerPercentage = 0;
		}

		var lastKillStreak = system.getValue('lastKillStreak');
		if (lastKillStreak === undefined) {
			system.setValue('lastKillStreak', 0);
			lastKillStreak = 0;
		}

		var trackKillStreak = system.getValue('trackKillStreak');

		if (impsRemaining > 0 && lastDeathDealerPercentage === 20) {
			replacementText += '<tr><td style="font-size:small; color:black"' +
				'>Kill Streak: <span findme="killstreak">&gt;' +
				system.addCommas(lastKillStreak) + '</span> Damage bonus: <' +
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
					system.addCommas(lastKillStreak) + '</span> Damage bonus' +
					': <span findme="damagebonus">' +
					Math.round(lastDeathDealerPercentage * 100) / 100 +
					'</span>%&nbsp;<span style="font-size:xx-small">Track: ' +
					'<span id=Helper:toggleKStracker style="color:navy;' +
					'cursor:pointer;text-decoration:underline;" title="Click' +
					' to toggle">' + (trackKillStreak ? 'ON' : 'off') +
					'</span></span></td></tr>';
				system.xmlhttp('index.php?cmd=profile', getKillStreak);
			}
		}
		return replacementText;
	}

	function recastImpAndRefresh(responseText) { // Legacy
		var doc = system.createDocument(responseText);
		if (doc) {
			location.reload();
		}
	}

	function toggleKsTracker() { // Legacy
		var trackKS = document.getElementById('Helper:toggleKStracker');
		if (trackKS) {
			trackKS.addEventListener('click', function() {
				system.setValue('trackKillStreak',
				system.getValue('trackKillStreak') ? false : true);
				location.reload();
			},true);
		}
	}

	function checkBuffs() { // Legacy - Old Map
		var impsRemaining;

		//extra world screen text
		var replacementText = '<td background="' + system.imageServer +
			'/skin/realm_right_bg.jpg"><table align="right" cellpadding="1" ' +
			'style="width:270px;margin-left:38px;margin-right:38px;font-size' +
			':medium; border-spacing: 1px; border-collapse: collapse;"><tr><' +
			'td colspan="2" height="10"></td></tr><tr>';
		var hasShieldImp = system
			.findNode('//img[contains(@src,"/55_sm.gif")]');
		var hasDeathDealer = system
			.findNode('//img[contains(@src,"/50_sm.gif")]');
		if (hasDeathDealer || hasShieldImp) {
			var re=/(\d+) HP remaining/;
			impsRemaining = 0;
			if (hasShieldImp) {
				var textToTest = $(hasShieldImp).data('tipped');
				var impsRemainingRE = re.exec(textToTest);
				impsRemaining = impsRemainingRE[1];
			}
			replacementText += impWarning(impsRemaining);
			if (hasDeathDealer) {
				replacementText += doDeathDealer(impsRemaining);
			}
		}
		replacementText += hasCA();
		replacementText += hasDblr();
		replacementText += calf.huntingMode === true ?
			'<tr><td style="font-size: small; color:red">' +
			'Hunting mode enabled</td></tr>' : '';
		replacementText += '<tr><td colspan="2" height="10"></td></tr>';
		// replacementText += FSH.legacy.showHuntingBuffs();
		replacementText += '</td>' ;

		var injectHere = system.findNode('//div[table[@class="centered" ' +
			'and @style="width: 270px;"]]');
		if (!injectHere) {return;}
		//insert after kill all monsters image and text
		var newSpan = document.createElement('DIV');
		newSpan.innerHTML=replacementText;
		injectHere.appendChild(newSpan);

		if ((hasDeathDealer || hasShieldImp) && impsRemaining ===0) {
			var _recastImpAndRefresh = document
				.getElementById('Helper:recastImpAndRefresh');
			var impHref = 'index.php?cmd=quickbuff&subcmd=activate&target' +
				'Players=' +
				$('dt.stat-name:first').next().text().replace(/,/g,'') +
				'&skills%5B%5D=55';
			_recastImpAndRefresh.addEventListener('click', function() {
				system.xmlhttp(impHref, recastImpAndRefresh, true);
			},true);
		}

		toggleKsTracker();
	}

	function checkedMonster(responseText, callback) { // Legacy
		var creatureInfo = system.createDocument(responseText);
		var statsNode = system.findNode('//table[@width="400"]', creatureInfo);
		if (!statsNode) {return;} // FF2 error fix
		var showMonsterLog = system.getValue('showMonsterLog');
		//store the stats
		var classNode     = statsNode.rows[1].cells[1];
		var levelNode     = statsNode.rows[1].cells[3];
		var attackNode    = statsNode.rows[2].cells[1];
		var defenseNode   = statsNode.rows[2].cells[3];
		var armorNode     = statsNode.rows[3].cells[1];
		var damageNode    = statsNode.rows[3].cells[3];
		var hitpointsNode = statsNode.rows[4].cells[1];
		var goldNode      = statsNode.rows[4].cells[3];
		var hitpoints = parseInt(hitpointsNode.textContent.replace(/,/g,''), 10);
		var armorNumber = parseInt(armorNode.textContent.replace(/,/g,''), 10);
		var combatEvaluatorBias = system.getValue('combatEvaluatorBias');
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
		var oneHitNumber = Math.ceil(hitpoints * hpVariable + armorNumber *
			generalVariable);

		var hideRestOfRows = false;
		var collectEnchantments = true;
		var enchantmentsList = [];
		for (var i = 0; i < statsNode.rows.length; i += 1) {
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
					var SecondNextRowFirstCell = statsNode.rows[i + 2].cells[0];
					if (SecondNextRowFirstCell.textContent === 'Description') {
						collectEnchantments = false;
					}
					enchantment.name = statsNode.rows[i].cells[0].textContent;
					enchantment.value = statsNode.rows[i].cells[1].textContent * 1;
					enchantmentsList.push(enchantment);
				} else {
					collectEnchantments = false;
				}
			}
		}

		var imageTable = system.findNode(
			'//table[tbody/tr/td/img[contains(@src, "/creatures/")]]', creatureInfo);
		var imageNode = imageTable.rows[0].cells[0].firstChild;
		var nameNode  = imageTable.rows[1].cells[0].firstChild;
		var imageNodeSRC = imageNode.src.replace(/.jpg(.*)/,'.jpg');

		if (showMonsterLog) {
			monstorLog.pushMonsterInfo({'key0':nameNode.textContent,
				'key1':imageNodeSRC, 'key2':classNode.textContent,
				'key3':levelNode.textContent, 'key4':attackNode.textContent,
				'key5':defenseNode.textContent, 'key6':armorNode.textContent,
				'key7':damageNode.textContent, 'key8':hitpointsNode.textContent,
				'key9':goldNode.textContent, 'key10':enchantmentsList});
		}

		levelNode.innerHTML += ' (your level:<span style="color:yellow">' +
			system.intValue($('dt.stat-level:first').next().text()) +
			'</span>)';
		attackNode.innerHTML += ' (your defense:<span style="color:yellow">' +
			system.intValue($('dt.stat-defense:first').next().text()) +
			'</span>) ';
		defenseNode.innerHTML += ' (your attack:<span style="color:yellow">' +
			system.intValue($('dt.stat-attack:first').next().text()) +
			'</span>)';
		armorNode.innerHTML += ' (your damage:<span style="color:yellow">' +
			system.intValue($('dt.stat-damage:first').next().text()) +
			'</span>)';
		damageNode.innerHTML += ' (your armor:<span style="color:yellow">' +
			system.intValue($('dt.stat-armor:first').next().text()) +
			'</span>)';
		hitpointsNode.innerHTML += ' (your HP:<span style="color:yellow">' +
			system.intValue($('dt.stat-hp:first').next().text()) +
			'</span>)' +
			'(1H: <span style="color:red">' + oneHitNumber + '</span>)';

		$('img', callback.monster).qtip('api').set('content.text', '<table>' +
			'<tr><td valign=top>' + imageNode.parentNode.innerHTML + '</td>' +
			'<td rowspan=2>' + statsNode.parentNode.innerHTML + '</td></tr>' +
			'<tr><td align=center valign=top>' + nameNode.innerHTML +
			'</td></tr></table>');
	}

	function showTipCreatureInfo(evt) { // Legacy
		var monster = evt.target.parentNode;
		monster.removeEventListener('mouseover',
			showTipCreatureInfo, true);
		system.xmlhttp(monster.getAttribute('href'),
			checkedMonster, {'monster':monster,'showTip':true});
	}

	function prepareCheckMonster() { // Legacy
		if (!system.getValue('showCreatureInfo')) {return;}
		var monsters = system.findNodes('//a[contains(@href,"cmd=world&' +
			'subcmd=viewcreature&creature_id=")]');
		if (!monsters) {return;}
		for (var i = 0; i < monsters.length; i += 1) {
			var monster = monsters[i];
			if (monster) {
				if (system.getValue('showMonsterLog')) {
					system.xmlhttp(monster.getAttribute('href'), 
						checkedMonster, 
						{'monster':monster,'showTip':false});
				} else {
					monster.addEventListener('mouseover', 
					showTipCreatureInfo, true);
				}
			}
		}
	}

	function prepareCombatLog() { // Legacy
		var reportsTable=system.findNode(
			'//div[table[@class="centered" and @style="width: 270px;"]]');
		if (!reportsTable) {return;}
		var tempLog=document.createElement('div');
		tempLog.id='reportsLog';
		var injLog=reportsTable.appendChild(tempLog);
		var is=injLog.style;
		is.color = 'black';
		is.backgroundImage='url(' + system.imageServer +
			'/skin/realm_right_bg.jpg)';
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
	}

	function injectOldMap() { // Native
		checkBuffs();
		prepareCheckMonster();
		prepareCombatLog();
	}

	function injectWorld() { // jQuery
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
			newMap.subscribes();
		} else {
			//not new map.
			injectOldMap();
		}
	}

	function unknownPage() { // Legacy
		if (typeof window.jQuery === 'undefined') {return;}
		console.log('unknownPage');

		if ($('#pCC td:contains("Below is the current status for ' +
			'the relic")').length > 0) {
			fshGa.screenview('unknown.oldRelic.injectRelic');
			oldRelic.injectRelic();
		}

		// var isBuffResult = system.findNode('//td[contains(.,"Back to Quick Buff Menu")]');
		var isBuffResult = document.getElementById('quickbuff-report');
		if (isBuffResult) {
			fshGa.screenview('unknown.quickBuff.updateBuffLog');
			quickBuff.updateBuffLog();
		}

		if ($('#shop-info').length > 0) {
			fshGa.screenview('unknown.legacy.injectShop');
			injectShop();
		}

		var isQuestBookPage = system.findNode('//td[.="Quest Name"]');
		if (isQuestBookPage) {
			fshGa.screenview('unknown.questBook.injectQuestBookFull');
			questBook.injectQuestBookFull();
		}

		var isAdvisorPageClue1 = system.findNode('//font[@size=2 and .="Advisor"]');
		var clue2 = '//a[@href="index.php?cmd=guild&amp;subcmd=manage" and .="Back to Guild Management"]';
		var isAdvisorPageClue2 = system.findNode(clue2);
		if (isAdvisorPageClue1 && isAdvisorPageClue2) {
			fshGa.screenview('unknown.guildAdvisor.injectAdvisor');
			guildAdvisor.injectAdvisor();
		}

		// if (system.findNode('//a[.="Back to Scavenging"]')) {
			// fshGa.screenview('unknown.scavenging.injectScavenging');
			// FSH.scavenging.injectScavenging(); // Is this used???
		// }

		if ($('#pCC img[title="Inventing"]').length > 0) {
			fshGa.screenview('unknown.recipes.inventing');
			recipes.inventing();
		}
	}

	module.exports = {
		injectWorld: injectWorld,
		quickBuyItem: quickBuyItem,
		unknownPage: unknownPage
	};

})();