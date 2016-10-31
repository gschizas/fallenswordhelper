(function() {

	'use strict';
	var calf = require('./support/calf');
	var system = require('./support/system');
	var layout = require('./support/layout');
	var common = require('./support/common');

	var colorHash = {
		'0': 'red', // Should never see this.
		'1': 'orange',
		'2': 'yellow'
	};
	var doNotKillList;
	var showHuntingBuffs;
	var huntingBuffs;
	var huntingBuffsName;
	var worldFormgroup =
		'<a href="#" class="quicklink tip-static" ' +
			'data-tipped="Quick Create Attack Group" ' +
			'style="background-image: url(\'' + system.imageServer +
			'/skin/realm/icon_action_formgroup.gif\');">' +
		'</a>';
	var worldQuickBuff =
		'<a href="#" class="quicklink tip-static" ' +
			'data-tipped="Open Quick Buff Popup" ' +
			'style="background-image: url(\'' + system.imageServer +
			'/skin/realm/icon_action_quickbuff.gif\');">' +
		'</a>';
	var worldMap =
		'<a href="index.php?cmd=world&subcmd=map" target="fsWorldMap" ' +
			'class="quicklink tip-static" data-tipped="Open Realm Map" ' +
			'style="background-image: url(\'' + system.imageServer +
			'/skin/realm/icon_action_map.gif\');">' +
		'</a>';
	var searchMapUFSG =
		'<a href="http://guide.fallensword.com/index.php?cmd=realms&subcmd=view' +
		'&realm_id=@@realmId@@" target="mapUFSG" ' +
			'class="quicklink tip-static" data-tipped="Search map in Ultimate FSG" ' +
			'style="background-image: url(\'' + system.imageServer +
			'/temple/1.gif\');">' +
		'</a>';
	var bias = {
		0: {generalVariable: 1.1053, hpVariable: 1.1},
		1: {generalVariable: 1.1, hpVariable: 1.053},
		2: {generalVariable: 1.053, hpVariable: 1},
		3: {generalVariable: 1.1053, hpVariable: 1}
	};
	var huntingOnImage = '<a href="#" id="HelperToggleHuntingMode" ' +
		'class="huntOn quicklink tip-static" ' +
		'data-tipped="Hunting mode is ON"></a>';
	var huntingOffImage = '<a href="#" id="HelperToggleHuntingMode" ' +
		'class="huntOff quicklink tip-static" ' +
		'data-tipped="Hunting mode is OFF"></a>';
	var soundMuteImage = '<a href="#" id="toggleSoundLink" ' +
		'class="soundOn quicklink tip-static" ' +
		'data-tipped="Turn Off Sound when you have a new log message"></a>';
	var soundImage = '<a href="#" id="toggleSoundLink" ' +
		'class="soundOff quicklink tip-static" ' +
		'data-tipped="Turn On Sound when you have a new log message"></a>';

	function doSendGold() { // jQuery
		$.ajax({
			url: 'index.php',
			data: {
				cmd : 'trade',
				subcmd: 'sendgold',
				xc: window.ajaxXC,
				target_username: $('#HelperSendTo').html(),
				gold_amount: $('#HelperSendAmt').html().replace(/[^\d]/g,'')
			}
		}).done(function(data) {
			var info = layout.infoBox(data);
			if (info === 'You successfully sent gold!' || info === '') {
				system.setValue('currentGoldSentTotal',
					parseInt(system.getValue('currentGoldSentTotal'), 10) +
					parseInt(system.getValue('goldAmount'), 10));
				GameData.fetch(387);
			}
		});
	}

	function injectSendGoldOnWorld() { // jQuery
		$('#statbar-gold-tooltip-general').append(
			'<dt class="stat-gold-sendTo">Send To:</dt>' +
			'<dd id="HelperSendTo">' + system.getValue('goldRecipient') +
			'</dd>' + 
			'<dt class="stat-gold-sendAmt">Amount:</dt>' +
			'<dd id="HelperSendAmt">' + system.getValue('goldAmount')
			.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,') + '</dd>' +
			'<dt class="stat-gold-sendTo">Send?</dt>' +
			'<dd><input id="HelperSendGold" value="Send!" class="custombutton" ' +
			'type="submit"><input type="hidden" id="xc" value=""</dd>' +
			'<dt class="stat-gold-sendTotal">Total Sent:</dt>' +
			'<dd id="HelperSendTotal">' +
				system.getValue('currentGoldSentTotal')
					.toString()
					.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,') +
				'</dd>');
		$('#HelperSendGold').click(doSendGold);
	}

	function creatureData(ses) { // jQuery
		var obj = {};
		obj.name    = $('#dialog-viewcreature').find('h2.name').text();
		obj.class   = $('#dialog-viewcreature')
			.find('span.classification')
			.text();
		// obj.level   = system.intValue($('#dialog-viewcreature')
			// .find('span.level').text());
		obj.attack  = system.intValue($('#dialog-viewcreature')
			.find('dd.attribute-atk').text());
		obj.defense = system.intValue($('#dialog-viewcreature')
			.find('dd.attribute-def').text());
		obj.armor   = system.intValue($('#dialog-viewcreature')
			.find('dd.attribute-arm').text());
		obj.damage  = system.intValue($('#dialog-viewcreature')
			.find('dd.attribute-dmg').text());
		obj.hp      = system.intValue($('#dialog-viewcreature')
			.find('p.health-max').text());
		//reduce stats if critter is a SE and player has SES cast on them.
		if (obj.name.search('Super Elite') !== -1) {
			obj.attack -= Math.ceil(obj.attack * ses);
			obj.defense -= Math.ceil(obj.defense * ses);
			obj.armor -= Math.ceil(obj.armor * ses);
			obj.damage -= Math.ceil(obj.damage * ses);
			obj.hp -= Math.ceil(obj.hp * ses);
		}
		return obj;
	}

	function evalExtraBuffs(combat) { // Native
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
	}

	function evalAttack(combat) { // Native
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
	}

	function evalDamage(combat) { // Native
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
	}

	function evalDefence(combat) { // Native
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
	}

	function evalArmour(combat) { // Native
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
	}

	function evalAnalysis(combat) { // Native
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
	}

	function evalCA(combat) { // Native
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
	}

	function evalHTML(combat) { // Native
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
	}

	function getCreaturePlayerData(responseText, callback) { // Legacy

		var combat = {};
		combat.callback = callback;
		//playerdata
		combat.player = common.playerData(responseText);

		combat.combatEvaluatorBias = system.getValue('combatEvaluatorBias');
		combat.attackVariable = 1.1053;
		combat.generalVariable =
			bias[combat.combatEvaluatorBias] ?
			bias[combat.combatEvaluatorBias].generalVariable :
			1.1053;
		combat.hpVariable =
			bias[combat.combatEvaluatorBias] ?
			bias[combat.combatEvaluatorBias].hpVariable : 1.1;

		//creaturedata
		var creatureStatTable;
		if ($('#worldPage').length === 0) { // old map
			creatureStatTable = system
				.findNode('//table[tbody/tr/td[.="Statistics"]]');
			if (!creatureStatTable) {return;}
		}

		combat.creature =
			creatureData(combat.player.superEliteSlayerMultiplier);
		combat = evalExtraBuffs(combat);
		combat = evalAttack(combat);
		combat = evalDamage(combat);
		combat = evalDefence(combat);
		combat = evalArmour(combat);
		combat = evalAnalysis(combat);
		combat = evalCA(combat);
		combat.evaluatorHTML = evalHTML(combat);

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

	}

	function getCreatureGroupData(responseText) { // Legacy
		var doc = system.createDocument(responseText);
		var groupAttackValue = system.findNode('//table[@width="400"]/tbody' +
			'/tr/td[contains(.,"Attack:")]', doc).nextSibling.textContent
			.replace(/,/, '') * 1;
		var groupDefenseValue = system.findNode('//table[@width="400"]/tbody' +
			'/tr/td[contains(.,"Defense:")]', doc).nextSibling.textContent
			.replace(/,/, '') * 1;
		var groupArmorValue = system.findNode('//table[@width="400"]/tbody' +
			'/tr/td[contains(.,"Armor:")]', doc).nextSibling.textContent
			.replace(/,/, '') * 1;
		var groupDamageValue = system.findNode('//table[@width="400"]/tbody' +
			'/tr/td[contains(.,"Damage:")]', doc).nextSibling.textContent
			.replace(/,/, '') * 1;
		var groupHPValue = system.findNode('//table[@width="400"]/tbody' +
			'/tr/td[contains(.,"HP:")]', doc).nextSibling.textContent
			.replace(/,/, '') * 1;
		system.xmlhttp('index.php?cmd=profile',
			getCreaturePlayerData,
			{	'groupExists': true,
				'groupAttackValue': groupAttackValue,
				'groupDefenseValue': groupDefenseValue,
				'groupArmorValue': groupArmorValue,
				'groupDamageValue': groupDamageValue,
				'groupHPValue': groupHPValue,
				'groupEvaluation': true
			}
		);
	}

	function checkIfGroupExists(responseText) { // Hybrid
		var doc=system.createDocument(responseText);
		var groupExistsIMG = $(doc)
			.find('img[title="Disband Group (Cancel Attack)"]');
		if (groupExistsIMG.length > 0) {
			var groupHref = groupExistsIMG.parents('td:first').find('a:first')
				.attr('href');
			system.xmlhttp(groupHref, getCreatureGroupData);
		}
	}

	function addRemoveCreatureToDoNotKillList(evt) { // Native
		var creatureName = evt.target.getAttribute('creatureName');
		doNotKillList = system.getValue('doNotKillList');
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
		system.setValue('doNotKillList',newDoNotKillList);
		doNotKillList = newDoNotKillList;
		//refresh the action list
		window.GameData.doAction(-1);
	}

	function readyViewCreature() { // Hybrid
		$('#creatureEvaluator').html('');
		$('#creatureEvaluatorGroup').html('');

		system.xmlhttp('index.php?cmd=profile',
			getCreaturePlayerData,
			{	'groupExists': false,
				'groupAttackValue': 0,
				'groupDefenseValue': 0,
				'groupArmorValue': 0,
				'groupDamageValue': 0,
				'groupHPValue': 0,
				'groupEvaluation': false
			}
		);
		system.xmlhttp('index.php?cmd=guild&subcmd=groups',
			checkIfGroupExists);

		$('#addRemoveCreatureToDoNotKillList').html('');
		if ($('#addRemoveCreatureToDoNotKillList').length === 0) {
			var doNotKillElement = '<div id="addRemoveCreatureToDo' +
				'NotKillList"" class="description" style="cursor:' +
				'pointer;text-decoration:underline;color:blue;"></div>';
			$(doNotKillElement).insertAfter($('#dialog-viewcreature')
				.find('p.description'));
		}
		var creatureName = $('#dialog-viewcreature').find('h2.name')
			.text();
		$('#addRemoveCreatureToDoNotKillList')
			.attr('creatureName',creatureName);
		var extraText = 'Add to the do not kill list';
		// TODO substring bug
		if (doNotKillList.indexOf(creatureName) !== -1) {
			extraText = 'Remove from do not kill list';}
		$('#addRemoveCreatureToDoNotKillList').html(extraText);
		document.getElementById('addRemoveCreatureToDoNotKillList')
			.addEventListener('click',
				addRemoveCreatureToDoNotKillList, true);
	}

	function hideGroupButton() { // jQuery
		if (system.getValue('hideChampionsGroup')) {
			$.subscribe('after-update.actionlist',
				function() {$('#actionList li.creature-1 a.create-group').hide();});
		}
		if (system.getValue('hideElitesGroup')) {
			$.subscribe('after-update.actionlist',
				function() {$('#actionList li.creature-2 a.create-group').hide();});
		}
		if (system.getValue('hideSEGroup')) {
			$.subscribe('after-update.actionlist',
				function() {$('#actionList li.creature-3 a.create-group').hide();});
		}
		if (system.getValue('hideTitanGroup')) {
			$.subscribe('after-update.actionlist',
				function() {$('#actionList li.creature-4 a.create-group').hide();});
		}
		if (system.getValue('hideLegendaryGroup')) {
			$.subscribe('after-update.actionlist',
				function() {$('#actionList li.creature-5 a.create-group').hide();});
		}
	}

	function colorMonsters() { // jQuery
		$('#actionList li.creature-1').css('color','green');
		$('#actionList li.creature-2').css('color','yellow');
		$('#actionList li.creature-3').css('color','red');
	}

	function afterUpdateActionList() { // jQuery
		// color the critters in the do no kill list blue
		// TODO substring bug
		$('#actionList div.header').each(function() {
			if (doNotKillList.indexOf($(this).find('a.icon')
				.data('name')) !== -1) {
				$(this).css('color','blue');
			}
		});
	}

	function interceptDoAction() { // jQuery
		var gameData = GameData;
		var hcs = window.HCS;
		var oldDoAction = gameData.doAction;
		gameData.doAction = function(actionCode, fetchFlags, data) {
			if (actionCode === hcs.DEFINES.ACTION.CREATURE_COMBAT) {
				// Do custom stuff e.g. do not kill list
				var creatureIcon = $('#actionList div.header')
					.eq(data.passback).find('a.icon');
				// TODO substring bug
				if (doNotKillList.indexOf(
						creatureIcon.data('name')) !== -1) {
					creatureIcon.removeClass('loading');
					return;
				}
			}
			// Call standard action
			oldDoAction(actionCode, fetchFlags, data);
		};
	}

	function impIconColour() { // jQuery
		var imp = $('#actionlist-shield-imp');
		if (imp.length === 1) {
			imp.css('background-color',
				colorHash[imp.text()] || '#ad8043');
		}
	}

	function dataEventsPlayerBuffs(evt, data) { // jQuery
		var buffHash = data.b.reduce(function(prev, curr) {
			prev[curr.name] = true;
			return prev;
		}, {});
		var missingBuffs = huntingBuffs.reduce(function(prev, curr) {
			if (!buffHash[curr.trim()]) {prev.push(curr);}
			return prev;
		}, []);
		var missingBuffsDiv = document.getElementById('missingBuffs');
		if (!missingBuffsDiv) {
			missingBuffsDiv = document.createElement('div');
			missingBuffsDiv.setAttribute('id', 'missingBuffs');
			var worldContainer = document.getElementById('worldContainerBelow');
			worldContainer.insertBefore(missingBuffsDiv, worldContainer.firstChild);
		}
		if (missingBuffs.length > 0) {
			missingBuffsDiv.innerHTML = 'You are missing some ' +
				huntingBuffsName + ' hunting buffs<br>(' +
				missingBuffs.join(', ') + ')';
		} else {missingBuffsDiv.innerHTML = '';}
	}

	function appendSavedLog(text) { // Native
		setTimeout(function(){
			var theLog=system.getValue('CombatLog');
			if (!theLog) {theLog='';}
			theLog+=text;
			system.setValue('CombatLog', theLog);
		}, 0);
	}

	function combatResponse(e, data) { // jQuery - Bad
		// TODO this is too slow
		// send the response to localforage
		// and deal with it later
		// If bad response do nothing.
		if (data.response.response !== 0) {return;}
		var l;
		var i;
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
		var now = new Date();
		combatData.time = system.formatDateTime(now);
		appendSavedLog(',' + JSON.stringify(combatData));
	}

	function updateSendGoldOnWorld(data) { // jQuery
		$('#HelperSendTotal')
			.html(system.getValue('currentGoldSentTotal')
			.toString()
			.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,'));
		if (parseInt(data.player.gold, 10) >
			system.getValue('goldAmount')){
			$('#statbar-gold').css('background-color','red');
		}else{
			$('#statbar-gold').css('background-color','inherit');
		}
	}

	function doFormGroup(e) { // jQuery
		e.preventDefault();
		$(e.target).qtip('hide');
		GameData.doAction(12, 385, {}, 0);
	}

	function openQuickBuff(e) { // Native
		e.preventDefault();
		window.openWindow('index.php?cmd=quickbuff&t=' +
			document.getElementById('statbar-character').textContent,
			'fsQuickBuff', 618, 1000, ',scrollbars');
	}

	function showQuickLinks(worldName, data) { // jQuery
		worldName.append('Min Lvl: ' + data.realm.minlevel);
		var formgroup = $(worldFormgroup);
		worldName.append('&nbsp;&nbsp;').append(formgroup);
		formgroup.click(doFormGroup);
		var quickbuff = $(worldQuickBuff);
		worldName.append('&nbsp;').append(quickbuff);
		quickbuff.click(openQuickBuff);
		worldName.append('&nbsp;').append(worldMap);
	}

	function showSearchButtons(worldName, data) { // jQuery
		worldName.append('&nbsp;')
			.append(searchMapUFSG.replace('@@realmId@@', data.realm.id));
	}

	function toggleSound(e) { // jQuery
		e.preventDefault();
		if (system.getValue('playNewMessageSound') === false) {
			$('#toggleSoundLink').qtip('hide')
				.replaceWith(soundMuteImage);
		} else {
			$('#toggleSoundLink').qtip('hide')
				.replaceWith(soundImage);
		}
		system.setValue('playNewMessageSound',
			!system.getValue('playNewMessageSound'));
	}

	function showSpeakerOnWorld(worldName) { // jQuery
		var img = system.getValue('playNewMessageSound') === true ?
			soundMuteImage :
			soundImage;
		worldName.append('&nbsp;').append(img);
		worldName.on('click', '#toggleSoundLink', toggleSound);
	}

	function toggleHuntMode(e) { // jQuery
		e.preventDefault();
		if (!calf.huntingMode) {
			$('#HelperToggleHuntingMode').qtip('hide')
				.replaceWith(huntingOnImage);
		} else {
			$('#HelperToggleHuntingMode').qtip('hide')
				.replaceWith(huntingOffImage);
		}
		calf.huntingMode = !calf.huntingMode;
		system.setValue('huntingMode', calf.huntingMode);
	}

	function showHuntMode(worldName) { // jQuery
		var img = calf.huntingMode === true ? huntingOnImage :
			huntingOffImage;
		worldName.append('&nbsp;').append(img);
		worldName.on('click', '#HelperToggleHuntingMode',
			toggleHuntMode);
	}

	function injectButtons(data) { // jQuery
		var worldName = $('#worldName');
		worldName.html(data.realm.name); //HACK - incase of switchign between master realm and realm they dont replace teh realm name
		var oldButtonContainer = $('#fshWorldButtonContainer');
		if (oldButtonContainer.length !== 0) {oldButtonContainer.remove();}
		var buttonContainer = $('<div/>', {id: 'fshWorldButtonContainer'});
		showQuickLinks(buttonContainer, data);
		showSearchButtons(buttonContainer, data);
		if (system.getValue('showSpeakerOnWorld')) {
			showSpeakerOnWorld(buttonContainer);
		}
		showHuntMode(buttonContainer);
		worldName.after(buttonContainer);
	}

	function fixDebuffQTip(e) { // jQuery
		$(e.target).qtip('hide');
	}

	function injectWorldNewMap(data){ // Native
		if (data.player && system.getValue('sendGoldonWorld')) {
			updateSendGoldOnWorld(data);
		}
		if (data.realm && data.realm.name) {
			injectButtons(data);
			document.getElementById('buffList')
				.addEventListener('click', fixDebuffQTip);
		}
	}

	function doHuntingBuffs() {
		showHuntingBuffs = system.getValue('showHuntingBuffs');
		if (!showHuntingBuffs) {return;}
		var enabledHuntingMode = system.getValue('enabledHuntingMode');
		if (enabledHuntingMode === '1') {
			huntingBuffs = system.getValue('huntingBuffs');
			huntingBuffsName = system.getValue('huntingBuffsName');
		}
		if (enabledHuntingMode === '2') {
			huntingBuffs = system.getValue('huntingBuffs2');
			huntingBuffsName = system.getValue('huntingBuffs2Name');
		}
		if (enabledHuntingMode === '3') {
			huntingBuffs = system.getValue('huntingBuffs3');
			huntingBuffsName = system.getValue('huntingBuffs3Name');
		}
		huntingBuffs = huntingBuffs.split(',');
		$.subscribe(window.DATA_EVENTS.PLAYER_BUFFS.ANY,
			dataEventsPlayerBuffs);
	}

	function subscribes() { // jQuery

		if (system.getValue('sendGoldonWorld')) {
			injectSendGoldOnWorld();
		}

		//Subscribes:
		doNotKillList = system.getValue('doNotKillList');

		// subscribe to view creature events on the new map.
		$.subscribe('ready.view-creature', readyViewCreature);

		// Hide Create Group button
		hideGroupButton();

		if (system.getValue('enableCreatureColoring')) {
			$.subscribe('after-update.actionlist', colorMonsters);
		}

		// add do-not-kill list functionality
		$.subscribe('after-update.actionlist', afterUpdateActionList);

		// then intercept the action call 
		interceptDoAction();

		$.subscribe(window.DATA_EVENTS.PLAYER_BUFFS.ANY,
			impIconColour);

		doHuntingBuffs();

		$.subscribe('keydown.controls', function(e, key){
			switch(key) {
			case 'ACT_REPAIR': GameData.fetch(387);
				break;
			}
		});

		if (system.getValue('keepLogs')) {
			$.subscribe('2-success.action-response', combatResponse);
		}
		//on world

		if (window.initialGameData) {//HCS initial data
			setTimeout(function(){
				injectWorldNewMap(window.initialGameData);
				impIconColour(null,
					{b: window.initialGameData.player.buffs});

				if (showHuntingBuffs) {
					dataEventsPlayerBuffs(null,
						{b: window.initialGameData.player.buffs});
				}

			}, 400);
		}
		$.subscribe('-1-success.action-response 5-success.action-response',
			function(e, data) { //change of information
				setTimeout(function() {
					injectWorldNewMap(data);
				}, 400);
			}
		);

		/*
		// somewhere near here will be multi buy on shop
		$.subscribe('prompt.worldDialogShop', function(e, data){
			self._createShop(self.shop.items);
			$('span[class="price"]').after('<span class="numTake">test</span>');
		});
		document.getElementById('Helper:SendGold')
			.addEventListener('click', calf.sendGoldToPlayer, true);
		*/

	}

	module.exports = {
		subscribes: subscribes,
		doSendGold: doSendGold
	};

})();