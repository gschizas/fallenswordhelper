import assets from './assets';
import calf from '../support/calf';
import * as common from '../support/common';
import * as system from '../support/system';

function creatureData(ses) { // jQuery
  var obj = {};
  obj.name = $('#dialog-viewcreature').find('h2.name').text();
  obj.class = $('#dialog-viewcreature')
    .find('span.classification')
    .text();
  obj.attack = system.intValue($('#dialog-viewcreature')
    .find('dd.attribute-atk').text());
  obj.defense = system.intValue($('#dialog-viewcreature')
    .find('dd.attribute-def').text());
  obj.armor = system.intValue($('#dialog-viewcreature')
    .find('dd.attribute-arm').text());
  obj.damage = system.intValue($('#dialog-viewcreature')
    .find('dd.attribute-dmg').text());
  obj.hp = system.intValue($('#dialog-viewcreature')
    .find('p.health-max').text());
  // reduce stats if critter is a SE and player has SES cast on them.
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
    combat.player.superEliteSlayerMultiplier + '<br>' : '';
  // math section ... analysis
  // Holy Flame adds its bonus after the armor of the creature has been taken off.
  combat.holyFlameBonusDamage = 0;
  if (combat.creature.class === 'Undead') {
    combat.holyFlameBonusDamage = Math.max(Math.floor(
      (combat.player.damageValue - combat.creature.armor) *
      combat.player.holyFlameLevel * 0.002), 0);
    combat.extraNotes += combat.player.holyFlameLevel > 0 ?
      'HF Bonus Damage = ' + combat.holyFlameBonusDamage +
      '<br>' : '';
  }
  // Death Dealer and Counter Attack both applied at the same time
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
  // playerAttackValue += counterAttackBonusAttack;
  // playerDamageValue += deathDealerBonusDamage + counterAttackBonusDamage;
  combat.extraNotes += combat.player.deathDealerLevel > 0 ?
    'DD Bonus Damage = ' + combat.deathDealerBonusDamage + '<br>' : '';
  if (combat.player.counterAttackLevel > 0) {
    combat.extraNotes += 'CA Bonus Attack/Damage = ' +
      combat.counterAttackBonusAttack + ' / ' +
      combat.counterAttackBonusDamage + '<br>' +
      'CA Extra Stam Used = ' + combat.extraStaminaPerHit + '<br>';
  }
  return combat;
}

function evalAttack(combat) { // Native
  // Attack:
  combat.extraNotes += combat.player.darkCurseLevel > 0 ?
    'DC Bonus Attack = ' + Math.floor(combat.creature.defense *
    combat.player.darkCurseLevel * 0.002) + '<br>' : '';
  combat.nightmareVisageAttackMovedToDefense =
    Math.floor(((combat.callback.groupExists ?
    combat.callback.groupAttackValue : combat.player.attackValue) +
    combat.counterAttackBonusAttack) *
    combat.player.nightmareVisageLevel * 0.0025);
  combat.extraNotes += combat.player.nightmareVisageLevel > 0 ?
    'NMV Attack moved to Defense = ' +
    combat.nightmareVisageAttackMovedToDefense + '<br>' : '';
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
  // Damage:
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
    '<br>' : '';
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
    combat.generalVariable * combat.creature.armor)) : '-';
  return combat;
}

function evalDefence(combat) { // Native
  combat.overallDefenseValue = (combat.callback.groupExists ?
    combat.callback.groupDefenseValue : combat.player.defenseValue) +
    Math.floor((combat.callback.groupExists ?
    combat.callback.groupDefenseValue : combat.player.defenseValue) *
    combat.player.constitutionLevel * 0.001) +
    combat.nightmareVisageAttackMovedToDefense;
  combat.extraNotes += combat.player.constitutionLevel > 0 ?
    'Constitution Bonus Defense = ' +
    Math.floor((combat.callback.groupExists ?
    combat.callback.groupDefenseValue : combat.player.defenseValue) *
    combat.player.constitutionLevel * 0.001) + '<br>' : '';
  combat.extraNotes += combat.player.flinchLevel > 0 ?
    'Flinch Bonus Attack Reduction = ' +
    Math.floor(combat.creature.attack * combat.player.flinchLevel *
    0.001) + '<br>' : '';
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
    combat.player.sanctuaryLevel * 0.001) + '<br>' : '';
  combat.terrorizeEffect = Math.floor(combat.creature.damage *
    combat.player.terrorizeLevel * 0.001);
  combat.extraNotes += combat.player.terrorizeLevel > 0 ?
    'Terrorize Creature Damage Effect = ' +
    combat.terrorizeEffect * -1 + '<br>' : '';
  combat.creature.damage -= combat.terrorizeEffect;
  combat.creatureDamageDone = Math.ceil(combat.generalVariable *
    combat.creature.damage - combat.overallArmorValue +
    combat.overallHPValue);
  combat.numberOfCreatureHitsTillDead =
    combat.creatureHitByHowMuch >= 0 ?
    Math.ceil(combat.overallHPValue / (combat.generalVariable *
    combat.creature.damage < combat.overallArmorValue ? 1 :
    combat.generalVariable * combat.creature.damage -
    combat.overallArmorValue)) : '-';
  return combat;
}

function evalAnalysis(combat) { // Native
  // Analysis:

  if (combat.numberOfCreatureHitsTillDead === '-') {
    combat.playerHits = combat.numberOfHitsRequired;
  } else if (combat.numberOfHitsRequired === '-' ||
      combat.numberOfHitsRequired >
      combat.numberOfCreatureHitsTillDead) {
    combat.playerHits = '-';
  } else {
    combat.playerHits = combat.numberOfHitsRequired;
  }

  if (combat.numberOfHitsRequired === '-') {
    combat.creatureHits = combat.numberOfCreatureHitsTillDead;
  } else if (combat.numberOfCreatureHitsTillDead === '-' ||
      combat.numberOfCreatureHitsTillDead >
      combat.numberOfHitsRequired) {
    combat.creatureHits = '-';
  } else {
    combat.creatureHits = combat.numberOfCreatureHitsTillDead;
  }

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
      combat.lowestFeasibleCALevel) : 0;
    if (combat.extraStaminaPerHitAtLowestFeasibleCALevel <
      combat.extraStaminaPerHit) {
      combat.extraNotes +=
        'Extra Stam Used at this lowered CA level = ' +
        combat.extraStaminaPerHitAtLowestFeasibleCALevel + '<br>';
    } else {
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
    (combat.callback.groupExists ? 'Group ' : '') +
    'Combat Evaluation</td></tr>' +
    '<tr><td align="right"><span style="color:#333333">' +
    'Will I hit it? </td><td align="left">' +
    (combat.hitByHowMuch > 0 ? 'Yes' : 'No') +
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
    (combat.creatureHitByHowMuch >= 0 ? 'Yes' : 'No') +
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
  // playerdata
  combat.player = common.playerData(responseText);

  combat.combatEvaluatorBias = system.getValue('combatEvaluatorBias');
  combat.attackVariable = 1.1053;
  combat.generalVariable =
    assets.bias[combat.combatEvaluatorBias] ?
    assets.bias[combat.combatEvaluatorBias].generalVariable :
    1.1053;
  combat.hpVariable =
    assets.bias[combat.combatEvaluatorBias] ?
    assets.bias[combat.combatEvaluatorBias].hpVariable : 1.1;

  // creaturedata
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
      tempdata = combat.evaluatorHTML.replace(/'/g, '\\\'');
      $('#creatureEvaluatorGroup').html(tempdata);
    } else {
      if ($('#creatureEvaluator').length === 0) {
        $('#dialog-viewcreature')
          .append('<div id="creatureEvaluator" ' +
            'style="clear:both;"></div>');
      }
      tempdata = combat.evaluatorHTML.replace(/'/g, '\\\'');
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
  var groupAttackValue = Number(system.findNode('//table[@width="400"]/tbody' +
    '/tr/td[contains(.,"Attack:")]', doc).nextSibling.textContent
    .replace(/,/, ''));
  var groupDefenseValue = Number(system.findNode('//table[@width="400"]/tbody' +
    '/tr/td[contains(.,"Defense:")]', doc).nextSibling.textContent
    .replace(/,/, ''));
  var groupArmorValue = Number(system.findNode('//table[@width="400"]/tbody' +
    '/tr/td[contains(.,"Armor:")]', doc).nextSibling.textContent
    .replace(/,/, ''));
  var groupDamageValue = Number(system.findNode('//table[@width="400"]/tbody' +
    '/tr/td[contains(.,"Damage:")]', doc).nextSibling.textContent
    .replace(/,/, ''));
  var groupHPValue = Number(system.findNode('//table[@width="400"]/tbody' +
    '/tr/td[contains(.,"HP:")]', doc).nextSibling.textContent
    .replace(/,/, ''));
  system.xmlhttp('index.php?cmd=profile', getCreaturePlayerData, {
    groupExists: true,
    groupAttackValue: groupAttackValue,
    groupDefenseValue: groupDefenseValue,
    groupArmorValue: groupArmorValue,
    groupDamageValue: groupDamageValue,
    groupHPValue: groupHPValue,
    groupEvaluation: true
  });
}

function checkIfGroupExists(responseText) { // Hybrid
  var doc = system.createDocument(responseText);
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
  var newDoNotKillList = '';
  if (calf.doNotKillList.indexOf(creatureName) !== -1) {
    newDoNotKillList = calf.doNotKillList.replace(creatureName, '');
    newDoNotKillList = newDoNotKillList.replace(',,', ',');
    if (newDoNotKillList.charAt(0) === ',') {
      newDoNotKillList = newDoNotKillList
        .substring(1, newDoNotKillList.length);
    }
    evt.target.innerHTML = 'Add to the do not kill list';
  } else {
    newDoNotKillList = calf.doNotKillList +
      (calf.doNotKillList.length !== 0 ? ',' : '') + creatureName;
    newDoNotKillList = newDoNotKillList.replace(',,', ',');
    evt.target.innerHTML = 'Remove from do not kill list';
  }
  system.setValue('doNotKillList', newDoNotKillList);
  calf.doNotKillList = newDoNotKillList;
  // refresh the action list
  window.GameData.doAction(-1);
}

export function readyViewCreature() { // Hybrid

  $('#creatureEvaluator').html('');
  $('#creatureEvaluatorGroup').html('');

  system.xmlhttp('index.php?cmd=profile', getCreaturePlayerData, {
    groupExists: false,
    groupAttackValue: 0,
    groupDefenseValue: 0,
    groupArmorValue: 0,
    groupDamageValue: 0,
    groupHPValue: 0,
    groupEvaluation: false
  });
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
    .attr('creatureName', creatureName);
  var extraText = 'Add to the do not kill list';
  // TODO substring bug
  if (calf.doNotKillList.indexOf(creatureName) !== -1) {
    extraText = 'Remove from do not kill list';
  }
  $('#addRemoveCreatureToDoNotKillList').html(extraText);
  document.getElementById('addRemoveCreatureToDoNotKillList')
    .addEventListener('click',
      addRemoveCreatureToDoNotKillList, true);
}
