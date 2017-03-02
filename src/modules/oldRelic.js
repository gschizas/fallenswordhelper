import calf from './support/calf';
import * as ajax from './support/ajax';
import * as common from './support/common';
import * as dataObj from './support/dataObj';
import * as layout from './support/layout';
import * as system from './support/system';

function getRelicPlayerBuffs(responseText) { // jQuery - Old map
  var processingStatus = $('td[title="ProcessingStatus"]');
  processingStatus.html('Processing attacking group stats ... ');

  var player = common.playerData(responseText);
  var groupAttackElement = $('td[title="GroupAttack"]');
  var groupAttackBuffedElement = $('td[title="GroupAttackBuffed"]');
  groupAttackElement.html(
    system.addCommas(calf.relicGroupAttackValue));
  var nightmareVisageEffect = Math.ceil(calf.relicGroupAttackValue *
    (player.nightmareVisageLevel * 0.0025));
  calf.relicGroupAttackValue -= nightmareVisageEffect;
  var storedFlinchLevel =
    system.intValue($('td[title="LDFlinchLevel"]').text());
  var storedFlinchEffectValue = Math.ceil(calf.relicGroupAttackValue *
    storedFlinchLevel * 0.001);
  groupAttackBuffedElement.html(system.addCommas(
    calf.relicGroupAttackValue - storedFlinchEffectValue));
  var defenseWithConstitution = Math.ceil(calf.relicGroupDefenseValue *
    (1 + player.constitutionLevel * 0.001));
  var totalDefense = defenseWithConstitution + nightmareVisageEffect;
  var groupDefenseElement = $('td[title="GroupDefense"]');
  var groupDefenseBuffedElement = $('td[title="GroupDefenseBuffed"]');
  groupDefenseElement.html(system.addCommas(
    calf.relicGroupDefenseValue));
  groupDefenseBuffedElement.html(system.addCommas(totalDefense));
  var groupArmorElement = $('td[title="GroupArmor"]');
  var groupArmorBuffedElement = $('td[title="GroupArmorBuffed"]');
  groupArmorElement.html(
    system.addCommas(calf.relicGroupArmorValue));
  groupArmorBuffedElement.html(system.addCommas(
    calf.relicGroupArmorValue +
    Math.floor(calf.relicGroupArmorValue * player.sanctuaryLevel *
    0.001)));
  var groupDamageElement = $('td[title="GroupDamage"]');
  var groupDamageBuffedElement = $('td[title="GroupDamageBuffed"]');
  var groupHPElement = $('td[title="GroupHP"]');
  var groupHPBuffedElement = $('td[title="GroupHPBuffed"]');
  var fortitudeBonusHP = Math.ceil(defenseWithConstitution *
    player.fortitudeLevel * 0.001);
  var chiStrikeBonusDamage = Math.ceil((calf.relicGroupHPValue +
    fortitudeBonusHP) * player.chiStrikeLevel * 0.001);
  var storedTerrorizeLevel = system.intValue(
    $('td[title="LDTerrorizeLevel"]').text());
  var storedTerrorizeEffectValue = Math.ceil(
    calf.relicGroupDamageValue * storedTerrorizeLevel * 0.001);
  groupDamageElement.html(
    system.addCommas(calf.relicGroupDamageValue));
  groupDamageBuffedElement.html(system.addCommas(
    calf.relicGroupDamageValue + chiStrikeBonusDamage -
    storedTerrorizeEffectValue));
  groupHPElement.html(system.addCommas(calf.relicGroupHPValue));
  groupHPBuffedElement.html(
    system.addCommas(calf.relicGroupHPValue + fortitudeBonusHP));

  // Effect on defending group from Flinch on attacking group.
  var defGuildBuffedAttackElement = $('td[title="attackValueBuffed"]');
  var defGuildBuffedAttackValue = system.intValue(
    defGuildBuffedAttackElement.text());
  var flinchEffectValue = Math.ceil(defGuildBuffedAttackValue *
    player.flinchLevel * 0.001);
  defGuildBuffedAttackElement.html(system.addCommas(
    defGuildBuffedAttackValue - flinchEffectValue));
  var defGuildBuffedDamageElement = $('td[title="damageValueBuffed"]');
  var defGuildBuffedDamageValue = system.intValue(
    defGuildBuffedDamageElement.text());
  var terrorizeEffectValue = Math.ceil(defGuildBuffedDamageValue *
    player.terrorizeLevel * 0.001);
  defGuildBuffedDamageElement.html(system.addCommas(
    defGuildBuffedDamageValue - terrorizeEffectValue));

  processingStatus.html('Done.');
}

function parseRelicMercStats(responseText) { // Hybrid - Old map
  // merc stats do not count for group stats so subtract them here ...
  var processingStatus = $('td[title="ProcessingStatus"]');
  processingStatus.html('Subtracting group merc stats ... ');

  var mercPage = system.createDocument(responseText);
  var mercElements = mercPage.getElementsByTagName('IMG');
  var totalMercAttack = 0;
  var totalMercDefense = 0;
  var totalMercArmor = 0;
  var totalMercDamage = 0;
  var totalMercHP = 0;
  var merc;
  for (var i = 0; i < mercElements.length; i += 1) {
    merc = mercElements[i];
    var mouseoverText = $(merc).data('tipped');
    var src = merc.getAttribute('src');
    if (mouseoverText && src.search('/merc/') !== -1) {
      var attackRE = /<td>Attack:<\/td><td>(\d+)<\/td>/;
      var mercAttackValue = Number(attackRE.exec(mouseoverText)[1]);
      totalMercAttack += mercAttackValue;
      var defenseRE = /<td>Defense:<\/td><td>(\d+)<\/td>/;
      var mercDefenseValue = Number(defenseRE.exec(mouseoverText)[1]);
      totalMercDefense += mercDefenseValue;
      var armorRE = /<td>Armor:<\/td><td>(\d+)<\/td>/;
      var mercArmorValue = Number(armorRE.exec(mouseoverText)[1]);
      totalMercArmor += mercArmorValue;
      var damageRE = /<td>Damage:<\/td><td>(\d+)<\/td>/;
      var mercDamageValue = Number(damageRE.exec(mouseoverText)[1]);
      totalMercDamage += mercDamageValue;
      var hpRE = /<td>HP:<\/td><td>(\d+)<\/td>/;
      var mercHPValue = Number(hpRE.exec(mouseoverText)[1]);
      totalMercHP += mercHPValue;
    }
  }
  calf.relicGroupAttackValue -= Math.round(totalMercAttack * 0.2);
  calf.relicGroupDefenseValue -= Math.round(totalMercDefense * 0.2);
  calf.relicGroupArmorValue -= Math.round(totalMercArmor * 0.2);
  calf.relicGroupDamageValue -= Math.round(totalMercDamage * 0.2);
  calf.relicGroupHPValue -= Math.round(totalMercHP * 0.2);

  system.xmlhttp('index.php?cmd=profile',
    getRelicPlayerBuffs);
}

function getRelicGroupData(responseText) { // Hybrid - Old map
  var processingStatus = $('td[title="ProcessingStatus"]');
  processingStatus.html('Parsing attacking group stats ... ');
  var doc = system.createDocument(responseText);
  var theTable = $('#pCC table table table', doc);
  calf.relicGroupAttackValue =
    system.intValue($('#stat-attack', theTable).text());
  calf.relicGroupDefenseValue =
    system.intValue($('#stat-defense', theTable).text());
  calf.relicGroupArmorValue =
    system.intValue($('#stat-armor', theTable).text());
  calf.relicGroupDamageValue =
    system.intValue($('#stat-damage', theTable).text());
  calf.relicGroupHPValue =
    system.intValue($('#stat-hp', theTable).text());
  system.xmlhttp('index.php?cmd=guild&subcmd=mercs',
    parseRelicMercStats);
}

function relicCheckIfGroupExists(responseText) { // Hybrid - Old map
  var processingStatus = $('td[title="ProcessingStatus"]');
  processingStatus.html('Checking attacking group ... ');
  var doc = system.createDocument(responseText);
  var groupExistsIMG =
    $(doc).find('img[title="Disband Group (Cancel Attack)"]');
  if (groupExistsIMG.length > 0) {
    var groupHref = groupExistsIMG.parents('td:first').find('a:first')
      .attr('href');
    system.xmlhttp(groupHref, getRelicGroupData);
  } else {
    processingStatus.html('Done.');
  }
}

function processRelicStats() { // Legacy - Old map
  var processingStatus = $('td[title="ProcessingStatus"]');
  processingStatus.html('Processing defending guild stats ... ');
  var relicCountValue = $('td[title="relicCount"]');
  var relicCount = system.intValue(relicCountValue.html());
  var relicMultiplier = 1;
  if (relicCount === 1) {
    relicMultiplier = 1.5;
  } else if (relicCount >= 2) {
    relicMultiplier = Math.round((1 - relicCount / 10) * 100) / 100;
  }

  var LDConstitutionLevel =
    system.intValue($('td[title="LDConstitutionLevel"]').text());
  var LDNightmareVisageLevel =
    system.intValue($('td[title="LDNightmareVisageLevel"]').text());
  var LDFortitudeLevel =
    system.intValue($('td[title="LDFortitudeLevel"]').text());
  var LDChiStrikeLevel =
    system.intValue($('td[title="LDChiStrikeLevel"]').text());
  var LDSanctuaryLevel =
    system.intValue($('td[title="LDSanctuaryLevel"]').text());
  var attackValue = $('td[title="attackValue"]');
  var attackValueBuffed = $('td[title="attackValueBuffed"]');
  var LDattackValue = $('td[title="LDattackValue"]');
  var attackNumber = system.intValue(attackValue.html());
  var LDattackNumber = system.intValue(LDattackValue.html());
  var overallAttack =
    attackNumber + Math.round(LDattackNumber * relicMultiplier);
  attackValue.html(system.addCommas(overallAttack));
  var nightmareVisageEffect =
    Math.ceil(overallAttack * (LDNightmareVisageLevel * 0.0025));
  attackValueBuffed.html(
    system.addCommas(overallAttack - nightmareVisageEffect));
  var defenseValue = $('td[title="defenseValue"]');
  var defenseValueBuffed = $('td[title="defenseValueBuffed"]');
  var LDdefenseValue = $('td[title="LDdefenseValue"]');
  var defenseNumber = system.intValue(defenseValue.html());
  var LDdefenseNumber = system.intValue(LDdefenseValue.html());
  var overallDefense =
    defenseNumber + Math.round(LDdefenseNumber * relicMultiplier);
  defenseValue.html(system.addCommas(overallDefense));
  var defenseWithConstitution =
    Math.ceil(overallDefense * (1 + LDConstitutionLevel * 0.001));
  var totalDefense = defenseWithConstitution + nightmareVisageEffect;
  defenseValueBuffed.html(system.addCommas(totalDefense));
  var dc225 = $('td[title="DC225"]');
  var dc175 = $('td[title="DC175"]');
  dc225.html(system.addCommas(
    Math.ceil(totalDefense * (1 - 225 * 0.002))));
  dc175.html(system.addCommas(
    Math.ceil(totalDefense * (1 - 175 * 0.002))));
  var armorValue = $('td[title="armorValue"]');
  var armorValueBuffed = $('td[title="armorValueBuffed"]');
  var LDarmorValue = $('td[title="LDarmorValue"]');
  var armorNumber = system.intValue(armorValue.html());
  var LDarmorNumber = system.intValue(LDarmorValue.html());
  var totalArmor = armorNumber + Math.round(LDarmorNumber * relicMultiplier);
  armorValue.html(system.addCommas(totalArmor));
  armorValueBuffed.html(system.addCommas(totalArmor +
    Math.floor(totalArmor * LDSanctuaryLevel * 0.001)));
  var damageValue = $('td[title="damageValue"]');
  var damageValueBuffed = $('td[title="damageValueBuffed"]');
  var LDdamageValue = $('td[title="LDdamageValue"]');
  var damageNumber = system.intValue(damageValue.html());
  var LDdamageNumber = system.intValue(LDdamageValue.html());
  var hpValue = $('td[title="hpValue"]');
  var hpValueBuffed = $('td[title="hpValueBuffed"]');
  var LDhpValue = $('td[title="LDhpValue"]');
  var hpNumber = system.intValue(hpValue.html());
  var LDhpNumber = system.intValue(LDhpValue.html());
  var fortitudeBonusHP =
    Math.ceil(defenseWithConstitution * LDFortitudeLevel * 0.001);
  var chiStrikeBonusDamage = Math.ceil((hpNumber +
    Math.round(LDhpNumber * relicMultiplier) + fortitudeBonusHP) *
      LDChiStrikeLevel * 0.001);
  damageValue.html(system.addCommas(damageNumber +
    Math.round(LDdamageNumber * relicMultiplier)));
  damageValueBuffed.html(system.addCommas(damageNumber +
    Math.round(LDdamageNumber * relicMultiplier) + chiStrikeBonusDamage));
  hpValue.html(system.addCommas(hpNumber +
    Math.round(LDhpNumber * relicMultiplier)));
  hpValueBuffed.html(system.addCommas(hpNumber +
    Math.round(LDhpNumber * relicMultiplier) + fortitudeBonusHP));
  var LDpercentageValue = $('td[title="LDPercentage"]');
  LDpercentageValue.html(relicMultiplier * 100 + '%');

  system.xmlhttp('index.php?cmd=guild&subcmd=groups',
    relicCheckIfGroupExists);
}

function syncRelicData() { // jQuery - Bad - Old map
  var defendersProcessed = $('td[title="defendersProcessed"]');
  var defendersProcessedNumber =
    system.intValue(defendersProcessed.html());
  var relicProcessedValue = $('td[title="relicProcessed"]');
  if (calf.relicDefenderCount === defendersProcessedNumber &&
    relicProcessedValue.html() === '1') {
    processRelicStats();
  }
}

function parseRelicGuildData(responseText) { // jQuery - Old map
  var doc = system.createDocument(responseText);
  var relicCount = $('#pCC table table table img[data-tipped*="' +
    'Relic Bonuses"]', doc).length;
  var relicCountElement = $('td[title="relicCount"]');
  relicCountElement.html(relicCount);
  var relicProcessedElement = $('td[title="relicProcessed"]');
  relicProcessedElement.html(1);
  syncRelicData();
}

function getRelicGuildData(extraTextInsertPoint, hrefpointer) { // Legacy - Old map
  system.xmlhttp(hrefpointer, parseRelicGuildData);
}

function leadDefender(player) { // jQuery - Old map
  // get lead defender (LD) buffs here for use later ...
  var attackValue = $('td[title="LDattackValue"]');
  var attackNumber = system.intValue(attackValue.html());
  attackValue.html(system.addCommas(attackNumber +
    Math.round(player.attackValue)));
  var defenseValue = $('td[title="LDdefenseValue"]');
  var defenseNumber = system.intValue(defenseValue.html());
  defenseValue.html(system.addCommas(defenseNumber +
    Math.round(player.defenseValue)));
  var armorValue = $('td[title="LDarmorValue"]');
  var armorNumber = system.intValue(armorValue.html());
  armorValue.html(system.addCommas(armorNumber +
    Math.round(player.armorValue)));
  var damageValue = $('td[title="LDdamageValue"]');
  var damageNumber = system.intValue(damageValue.html());
  damageValue.html(system.addCommas(damageNumber +
    Math.round(player.damageValue)));
  var hpValue = $('td[title="LDhpValue"]');
  var hpNumber = system.intValue(hpValue.html());
  hpValue.html(system.addCommas(hpNumber + Math.round(player.hpValue)));
  var defendersProcessed = $('td[title="defendersProcessed"]');
  var defendersProcessedNumber =
    system.intValue(defendersProcessed.html());
  defendersProcessed.html(
    system.addCommas(defendersProcessedNumber + 1));

  $('td[title="LDProcessed"]').html(1);
  $('td[title="LDConstitutionLevel"]').html(player.constitutionLevel);
  $('td[title="LDFlinchLevel"]').html(player.flinchLevel);
  $('td[title="LDNightmareVisageLevel"]').html(player.nightmareVisageLevel);
  $('td[title="LDFortitudeLevel"]').html(player.fortitudeLevel);
  $('td[title="LDChiStrikeLevel"]').html(player.chiStrikeLevel);
  $('td[title="LDTerrorizeLevel"]').html(player.terrorizeLevel);
  $('td[title="LDSanctuaryLevel"]').html(player.sanctuaryLevel);
}

function parseRelicPlayerData(responseText, callback) { // jQuery - Old map
  var defenderMultiplier;
  var attackValue;
  var defenseValue;
  var overallDefense;
  var armorValue;
  var damageValue;
  var hpValue;
  var defendersProcessed;
  var defendersProcessedNumber;
  var attackNumber;
  var defenseNumber;
  var armorNumber;
  var damageNumber;
  var hpNumber;

  var defenderCount = callback.defenderCount;

  var player = common.playerData(responseText);

  if (defenderCount !== 0) {
    defenderMultiplier = 0.2;
    attackValue = $('td[title="attackValue"]');
    attackNumber = system.intValue(attackValue.html());
    attackValue.html(system.addCommas(attackNumber +
      Math.round(player.attackValue * defenderMultiplier)));
    defenseValue = $('td[title="defenseValue"]');
    defenseNumber = system.intValue(defenseValue.html());
    overallDefense =
      defenseNumber + Math.round(player.defenseValue * defenderMultiplier);
    defenseValue.html(system.addCommas(overallDefense));
    armorValue = $('td[title="armorValue"]');
    armorNumber = system.intValue(armorValue.html());
    armorValue.html(system.addCommas(armorNumber +
      Math.round(player.armorValue * defenderMultiplier)));
    damageValue = $('td[title="damageValue"]');
    damageNumber = system.intValue(damageValue.html());
    damageValue.html(system.addCommas(damageNumber +
      Math.round(player.damageValue * defenderMultiplier)));
    hpValue = $('td[title="hpValue"]');
    hpNumber = system.intValue(hpValue.html());
    hpValue.html(system.addCommas(hpNumber +
      Math.round(player.hpValue * defenderMultiplier)));
    defendersProcessed = $('td[title="defendersProcessed"]');
    defendersProcessedNumber =
      system.intValue(defendersProcessed.html());
    defendersProcessed.html(
      system.addCommas(defendersProcessedNumber + 1));
  } else {
    leadDefender(player);
  }
  syncRelicData();
}

function getRelicPlayerData(defenderCount, hrefpointer, pl) { // Hybrid - Old map
  if (defenderCount === 0) {
    system.xmlhttp(
      hrefpointer,
      parseRelicPlayerData,
      {defenderCount: defenderCount}
    );
  } else {
    $.ajax({
      cache: false,
      dataType: 'json',
      url: 'index.php',
      data: {
        cmd: 'export',
        subcmd: 'profile',
        player_username: pl
      },
      success: function(data) {
        parseRelicPlayerData(data,
          {defenderCount: defenderCount});
      }
    });
  }
}

function calculateRelicDefenderStats() { // Legacy - Old map
  var validMemberString;
  var membrList = calf.membrList;
  // hide the calc button
  $('input[id="calculatedefenderstats"]').css('visibility', 'hidden');
  // make the text smaller
  $('td:contains("Below is the current status for the relic"):last')
    .css('fontSize', 'x-small');
  // set the colspan of all other rows to 3
  $('table[width="600"]>tbody>tr:not(:eq(9))>td').attr('colspan', 3);

  var tableWithBorderElement = $('table[cellpadding="5"]');
  tableWithBorderElement
    .attr('align', 'left')
    .attr('colSpan', 2);
  var tableInsertPoint = tableWithBorderElement.parents('tr:first');
  tableInsertPoint.append('<td colspan="1"><table width="200" style="' +
    'border:1px solid #A07720;"><tbody><tr><td id="InsertSpot"></td>' +
    '</tr></tbody></table></td>');
  var extraTextInsertPoint = system.findNode('//td[@id="InsertSpot"]');
  var defendingGuildHref = $('a[href*="index.php?cmd=guild&subcmd=view' +
    '&guild_id="]:first').attr('href');
  getRelicGuildData(extraTextInsertPoint, defendingGuildHref);

  var defendingGuildMiniSRC = $('img[src*="_mini.jpg"]').attr('src');
  var defendingGuildID = /guilds\/(\d+)_mini.jpg/
    .exec(defendingGuildMiniSRC)[1];
  var myGuildID = layout.guildId().toString();

  var hideRelicOffline = system.getValue('hideRelicOffline');
  if (defendingGuildID === myGuildID && !hideRelicOffline) {
    validMemberString = '';
    Object.keys(membrList).forEach(function(val) {
      var member = membrList[val];
      var lastLogin = 0;
      if (member.last_login) {
        lastLogin = Math.floor(Date.now() / 1000 -
          member.last_login);
      }
      if (lastLogin >= 120 && // two minutes is offline
        lastLogin <= 604800 && // 7 days max
        (member.level < 400 || member.level > 421 &&
        member.level < 441 || member.level > 450)) {
        validMemberString += member.username + ' ';
      }
    });
  }

  var defenders = $('#pCC table table a[href*="cmd=profile&player_id="]');
  defenders.each(function(ind) {
    var $this = $(this);
    getRelicPlayerData(ind, $this.attr('href'), $this.text());
    if (defendingGuildID === myGuildID && !hideRelicOffline) {
      validMemberString = validMemberString.replace(
        $this.text() + ' ', '');
    }
  });
  calf.relicDefenderCount = defenders.length;

  var textToInsert = '<tr><td><table class="relicT">' +
    '<tr><td colspan="2" class="headr">Defending Guild Stats</td></tr>' +
    '<tr><td class="brn">Number of Defenders:</td>' +
      '<td>' + calf.relicDefenderCount + '</td></tr>' +
    '<tr><td class="brn">Relic Count:</td>' +
      '<td title="relicCount">0</td></tr>' +
    '<tr><td class="brn">Lead Defender Bonus:</td>' +
      '<td title="LDPercentage">0</td></tr>' +
    '<tr class="hidden"><td>Relic Count Processed:</td>' +
      '<td title="relicProcessed">0</td></tr>' +
    '<tr class="hidden">' +
      '<td colspan="2" class="headr">Lead Defender Full Stats</td></tr>' +
    '<tr class="hidden"><td>Attack:</td>' +
      '<td title="LDattackValue">0</td></tr>' +
    '<tr class="hidden"><td>Defense:</td>' +
      '<td title="LDdefenseValue">0</td></tr>' +
    '<tr class="hidden"><td>Armor:</td>' +
      '<td title="LDarmorValue">0</td></tr>' +
    '<tr class="hidden"><td>Damage:</td>' +
      '<td title="LDdamageValue">0</td></tr>' +
    '<tr class="hidden"><td>HP:</td>' +
      '<td title="LDhpValue">0</td></tr>' +
    '<tr class="hidden"><td>LDProcessed:</td>' +
      '<td title="LDProcessed">0</td></tr>' +
    '<tr class="hidden"><td>LDFlinchLevel:</td>' +
      '<td title="LDFlinchLevel">0</td></tr>' +
    '<tr class="hidden"><td>LDConstitutionLevel:</td>' +
      '<td title="LDConstitutionLevel">0</td></tr>' +
    '<tr class="hidden"><td>LDNightmareVisageLevel:</td>' +
      '<td title="LDNightmareVisageLevel">0</td></tr>' +
    '<tr class="hidden"><td>LDFortitudeLevel:</td>' +
      '<td title="LDFortitudeLevel">0</td></tr>' +
    '<tr class="hidden"><td>LDChiStrikeLevel:</td>' +
      '<td title="LDChiStrikeLevel">0</td></tr>' +
    '<tr class="hidden"><td>LDTerrorizeLevel:</td>' +
      '<td title="LDTerrorizeLevel">0</td></tr>' +
    '<tr class="hidden"><td>LDSanctuaryLevel:</td>' +
      '<td title="LDSanctuaryLevel">0</td></tr>' +
    '<tr><td colspan="2" class="headr">Other Defender Stats</td></tr>' +
    '<tr><td class="brn">Raw Attack:</td>' +
      '<td class="grey" title="attackValue">0</td></tr>' +
    '<tr><td class="brn">Attack w/ buffs:</td>' +
      '<td title="attackValueBuffed">0</td></tr>' +
    '<tr><td class="brn">Raw Defense:</td>' +
      '<td class="grey" title="defenseValue">0</td></tr>' +
    '<tr><td class="brn">Defense w/buffs:</td>' +
      '<td title="defenseValueBuffed">0</td></tr>' +
    '<tr><td class="brn">Raw Armor:</td>' +
      '<td title="armorValue">0</td></tr>' +
    '<tr><td class="brn">Armor w/ buffs:</td>' +
      '<td title="armorValueBuffed">0</td></tr>' +
    '<tr><td class="brn">Raw Damage:</td>' +
      '<td class="grey" title="damageValue">0</td></tr>' +
    '<tr><td class="brn">Damage w/ buffs:</td>' +
      '<td title="damageValueBuffed">0</td></tr>' +
    '<tr><td class="brn">Raw HP:</td>' +
      '<td class="grey" title="hpValue">0</td></tr>' +
    '<tr><td class="brn">HP w/ buffs:</td>' +
      '<td title="hpValueBuffed">0</td></tr>' +
    '<tr><td class="brn">Processed:</td>' +
      '<td title="defendersProcessed">0</td></tr>' +
    '<tr><td class="headr" colspan=2>Adjusted defense values:</td></tr>' +
    '<tr><td class="brn">DC225:</td>' +
      '<td title="DC225">0</td></tr>' +
    '<tr><td class="brn">DC175:</td>' +
      '<td title="DC175">0</td></tr>' +
    '<tr><td class="headr" colspan=2>Attacking Group Stats:</td></tr>' +
    '<tr><td class="brn">Raw Group Attack:</td>' +
      '<td class="grey" title="GroupAttack"></td></tr>' +
    '<tr><td class="brn">Group Attack w/ buffs:</td>' +
      '<td title="GroupAttackBuffed"></td></tr>' +
    '<tr><td class="brn">Raw Group Defense:</td>' +
      '<td class="grey" title="GroupDefense"></td></tr>' +
    '<tr><td class="brn">Group Defense w/ buffs:</td>' +
      '<td title="GroupDefenseBuffed"></td></tr>' +
    '<tr><td class="brn">Raw Group Armor:</td>' +
      '<td title="GroupArmor"></td></tr>' +
    '<tr><td class="brn">Group Armor w/ buffs:</td>' +
      '<td title="GroupArmorBuffed"></td></tr>' +
    '<tr><td class="brn">Raw Group Damage:</td>' +
      '<td class="grey" title="GroupDamage"></td></tr>' +
    '<tr><td class="brn">Group Damage w/ buffs:</td>' +
      '<td title="GroupDamageBuffed"></td></tr>' +
    '<tr><td class="brn">Raw Group HP:</td>' +
      '<td class="grey" title="GroupHP"></td></tr>' +
    '<tr><td class="brn">Group HP w/ buffs:</td>' +
      '<td title="GroupHPBuffed"></td></tr>' +
    '<tr><td class="headr" colspan=2>Processing:</td></tr>' +
    '<tr><td style="color:green;" colspan="2" title="ProcessingStatus">' +
      'Parsing defending guild stats ...</td></tr>' +
    '<tr><td class="headr" colspan=2>Assumptions:</td></tr>' +
    '<tr><td colspan="2" class="grey">Above calculations include ' +
      'Constitution, Fortitude, Nightmare Visage, Chi Strike, Terrorize ' +
      'and Flinch bonus calculations (in that order) on both the ' +
      'defending group and attacking group.</td></tr>';

  if (defendingGuildID === myGuildID && !hideRelicOffline) {
    validMemberString = validMemberString.slice(0, -1);
    var validMemberArray = validMemberString.split(' ');
    validMemberArray.forEach(function(val, ind, arr) {
      if (membrList[val]) {
        arr[ind] = '<a style="color:red;" href="index.php?cmd=' +
          'profile&player_id=' + membrList[val].id + '">' +
          val + '</a>';
      }
    });
    validMemberString = validMemberArray.join(' ');

    textToInsert += '<tr><td class="headr" colspan=2>Offline guild ' +
        'members not at relic:</td></tr>' +
      '<tr title="offlinePlayerListControl">' +
        '<td colspan=2 style="color:red;" title="offlinePlayerList">' +
        validMemberString + '</td></tr>' +
      '<tr class="hidden"><td class="brn">OfflinePlayerCount:</td>' +
        '<td title="offlinePlayerCount">' + validMemberArray.length +
        '</td></tr>' +
      '<tr class="hidden"><td class="brn">OfflinePlayersProcessed:</td>' +
        '<td title="offlinePlayersProcessed">0</td></tr>' +
      '<tr class="hidden" title="offlinePlayerListControlTemp" ' +
        'style="display:block;"><td style="color:green;" colspan=2>' +
        'Checking offline status ...</td></tr>';
  }
  textToInsert += '</table><td><tr>';
  extraTextInsertPoint.innerHTML += textToInsert;
}

export function injectRelic() { // Hybrid - Old map
  var relicNameElement = $('td:contains("Below is the current status ' +
    'for the relic"):last');
  relicNameElement.css('font-size', 'x-small');

  var injectHere = $('td:contains("Defended"):last');
  if (injectHere.length === 0) {return;}
  var defendingGuildMiniSRC = $('img[src*="_mini.jpg"]').attr('src');
  var defendingGuildID = /guilds\/(\d+)_mini.jpg/
    .exec(defendingGuildMiniSRC)[1];
  if (defendingGuildID === layout.guildId().toString()) {
    var listOfDefenders = injectHere.next().text().split(',');
    // quick buff only supports 16
    var shortList = [];
    if (listOfDefenders) {
      var modifierWord;
      for (var i = 0; i < listOfDefenders.length; i += 1) {
        shortList.push(listOfDefenders[i]);
        if ((i + 1) % 16 === 0 && i !== 0 ||
          i === listOfDefenders.length - 1) {
          modifierWord = dataObj.places[Math.floor(i / 16)];
          var htmlToAppend = '<br><nobr><a href="#" id="buffAll' +
            modifierWord + '"><span style="color:blue; font-' +
            'size:x-small;" title="Quick buff functionality ' +
            'from HCS only does 16">Buff ' + modifierWord +
            ' 16</span></a></nobr>';
          injectHere.append(htmlToAppend);
          var buffAllLink = $('#buffAll' + modifierWord);
          buffAllLink.attr('href', layout.buffAllHref(shortList));
          shortList = [];
        }
      }
    }
  }
  injectHere.append('<input id="calculatedefenderstats" type="button" ' +
    'value="Fetch Stats" title="Calculate the stats of the players ' +
    'defending the relic." class="custombutton">');
  document.getElementById('calculatedefenderstats')
    .addEventListener('click',
      function() {
        ajax.getMembrList(false)
          .done(calculateRelicDefenderStats);
      },
      true);
}
