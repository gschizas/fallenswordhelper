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
// @version        1516
// @downloadURL    https://fallenswordhelper.github.io/fallenswordhelper/Releases/Current/fallenswordhelper.user.js
// @grant          none
// ==/UserScript==

// No warranty expressed or implied. Use at your own risk.

/* eslint-disable no-implicit-globals */

// EVERYTHING MUST BE IN main()
var fshMain = function() {

/* eslint-enable no-implicit-globals */

'use strict';

window.FSH = window.FSH || {};

FSH.resources = {
	calfSystemJs: 'https://fallenswordhelper.github.io/fallenswordhelper/resources/1516/calfSystem.js',
	calfSystemCss: 'https://fallenswordhelper.github.io/fallenswordhelper/resources/1516/calfSystem.css',
	localForage: 'https://cdn.jsdelivr.net/localforage/1.4.2/localforage.min.js',
	dataTablesLoc: 'https://cdn.datatables.net/1.10.12/js/jquery.dataTables.min.js'
};

FSH.version = '1516';

if (typeof GM_info === 'undefined') {
	FSH.version += '_native';
} else if (typeof GM_info.script === 'undefined') {
	FSH.version += '_noScript';
} else if (typeof GM_info.script.version === 'undefined') {
	FSH.version += '_noVersion';
}

FSH.Helper = {

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
				if ($('#creatureEvaluatorGroup').length === 0) {
					$('#dialog-viewcreature')
						.append('<div id="creatureEvaluatorGroup" ' +
							'style="clear:both;"></div>');
				}
				tempdata = combat.evaluatorHTML.replace(/'/g,'\\\'');
				$('#creatureEvaluatorGroup').html(tempdata);
			} else {
				if ($('#creatureEvaluator').length === 0) {
					$('#dialog-viewcreature')
						.append('<div id="creatureEvaluator" ' +
							'style="clear:both;"></div>');
				}
				tempdata = combat.evaluatorHTML.replace(/'/g,'\\\'');
				$('#creatureEvaluator').html(tempdata);
			}
		} else {
			var newRow = creatureStatTable.insertRow(creatureStatTable.rows.length);
			var newCell = newRow.insertCell(0);
			newCell.colSpan = '4';
			newCell.innerHTML = combat.evaluatorHTML;
		}

	},

	appendHead: function(o) { // native
		var count = 0;
		var scriptFiles = o.js || [];
		var cssFiles = o.css || [];
		var head = document.getElementsByTagName('head')[0];

		cssFiles.forEach(function(c) {
			var linkTag = document.createElement('link');
			linkTag.type = 'text/css';
			linkTag.rel = 'stylesheet';
			linkTag.href = c;
			head.appendChild(linkTag);
		});

		scriptFiles.forEach(function(s) {
			var scriptTag = document.createElement('script');
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
		setTimeout(FSH.environment.dispatch, 0);
	},

}; // end of var helper

(function loadScripts () {
	var o = {
		css: [FSH.resources.calfSystemCss],
		js:  [FSH.resources.localForage,
					FSH.resources.calfSystemJs,
					FSH.resources.dataTablesLoc],
		callback: FSH.Helper.onPageLoad
	};
	if (typeof window.jQuery === 'undefined') {
		o.js.pop();
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
