import system from './support/system';

function getProfileStatsAndBuffs(responseText, callback) { // Legacy - currently disabled
  var doc = system.createDocument(responseText);
  //stats
  var vlTextElement = system.findNode(
    '//td[a/b[.="VL"] or b/a[.="VL"]]', doc);
  var vlValueElement = vlTextElement.nextSibling;
  var pvpTextElement = system.findNode(
    '//td[b[contains(.,"PvP")]]', doc);
  var pvpValueElement = pvpTextElement.nextSibling;
  var attackTextElement = system.findNode(
    '//td[b[contains(.,"Attack:")]]', doc);
  var attackValueElement = attackTextElement.nextSibling;
  var defenseTextElement = system.findNode(
    '//td[b[contains(.,"Defense:")]]', doc);
  var defenseValueElement = defenseTextElement.nextSibling;
  var armorTextElement = system.findNode(
    '//td[b[contains(.,"Armor:")]]', doc);
  var armorValueElement = armorTextElement.nextSibling;
  var damageTextElement = system.findNode(
    '//td[b[contains(.,"Damage:")]]', doc);
  var damageValueElement = damageTextElement.nextSibling;
  var hpTextElement = system.findNode(
    '//td[b[contains(.,"Health:")]]', doc);
  var hpValueElement = hpTextElement.nextSibling;
  var goldTextElement = system.findNode(
    '//td[b[contains(.,"Gold:")]]', doc);
  var goldValueElement = goldTextElement.nextSibling;
  var pvpProtElement = system.findNode(
    '//td[contains(.,"PvP") and contains(.,"Protection")]', doc);
  var lastActivityElement = system.findNode(
    '//p[contains(.,"Last Activity:")]', doc);
  var output = '<table width="100%"><tbody>';
  if (lastActivityElement) {
    output += '<tr><td colspan=4 style="text-align:center;">' +
      lastActivityElement.innerHTML + '</td></tr>';}
  output += '<tr><td width="15%" style="text-align:right;">' +
    vlTextElement.innerHTML +
    '</td><td width="30%" style="text-align:left;">' +
    vlValueElement.innerHTML + '</td>' +
    '<td width="25%" style="text-align:right;">' + pvpTextElement.innerHTML +
    '</td><td width="30%" style="text-align:left;">' +
    pvpValueElement.innerHTML + '</td></tr>';
  output += '<tr><td width="15%" style="text-align:right;">' +
    attackTextElement.innerHTML +
    '</td><td width="30%" style="text-align:left;">' +
    attackValueElement.innerHTML + '</td>' +
    '<td width="25%" style="text-align:right;">' +
    defenseTextElement.innerHTML +
    '</td><td width="30%" style="text-align:left;">' +
    defenseValueElement.innerHTML + '</td></tr>';
  output += '<tr><td width="15%" style="text-align:right;">' +
    armorTextElement.innerHTML +
    '</td><td width="30%" style="text-align:left;">' +
    armorValueElement.innerHTML + '</td>' +
    '<td width="25%" style="text-align:right;">' +
    damageTextElement.innerHTML +
    '</td><td width="30%" style="text-align:left;">' +
    damageValueElement.innerHTML + '</td></tr>';
  output += '<tr><td width="15%" style="text-align:right;">' +
    hpTextElement.innerHTML +
    '</td><td width="30%" style="text-align:left;">' +
    hpValueElement.innerHTML + '</td>' +
    '<td width="25%" style="text-align:right;">' +
    goldTextElement.innerHTML +
    '</td><td width="30%" style="text-align:left;">' +
    goldValueElement.innerHTML + '</td></tr>';
  output += '<tr><td colspan=4 style="text-align:center;">' +
    pvpProtElement.innerHTML + '</td></tr>';
  output += '</tbody></table>';
  var anchor1 = callback.anchor1;
  var injectHere = system.findNode('//span[@id="Helper:'+anchor1+'"]');
  injectHere.innerHTML = output;
  //buffs
  var activeBuffsTitleRow = system.findNode(
    '//strong[.="Active Buffs"]/ancestor::div[1]', doc);
  var activeBuffsElement = activeBuffsTitleRow.nextSibling.nextSibling;
  var anchor2 = callback.anchor2;
  injectHere = system.findNode('//span[@id="Helper:'+anchor2+'"]');
  injectHere.innerHTML = activeBuffsElement.innerHTML;
}

function injectAttackPlayer() { // Legacy - currently disabled
  var b = system.findNode('//input[contains(@value, "Activate!")]');
  if (b !== null) {
    var oldOnclick = b.getAttribute('onClick');
    b.setAttribute('onClick', 'if (confirm("Are you sure you want to ' +
      'activate PvP Prestige?")) { ' + oldOnclick + '}');
  }
  if (!system.getValue('enableAttackHelper')) {return;}
  //inject current stats, buffs and equipment
  var attackPlayerTable = system.findNode(
    '//table[tbody/tr/td/font/b[.="Attack Player (PvP)"]]');
  if (!attackPlayerTable) {return;}
  var targetPlayer = /target_username=([a-zA-Z0-9]+)/.exec(location.search);
  if (targetPlayer) {
    var output = '<center><table width="625" cellspacing="0" ' +
      'cellpadding="0" bordercolor="#000000" border="0" style="' +
      'border-style: solid; border-width: 1px;"><tbody>' +
      '<tr style="text-align:center;" bgcolor="#cd9e4b"><td width="350" ' +
      'style="border-style: solid; border-width: 1px;">Attacker</td><td ' +
      'width="275" style="border-style: solid; border-width: 1px;">' +
      'Defender</td></tr>' +
      '<tr style="text-align:center;"><td style="border-style: solid; ' +
      'border-width: 1px;"><span id="Helper:attackPlayerSelfStatData">' +
      '<font color="green">Gathering your stats ...</font></span></td>'+
      '<td style="border-style: solid; border-width: 1px;"><span ' +
      'id="Helper:attackPlayerDefenderStatData"><font color="green">' +
      'Gathering defender stats ...</font></span></td></tr>' +
      '<tr style="text-align:center;"><td style="border-style: solid; ' +
      'border-width: 1px;"><span id="Helper:attackPlayerSelfBuffData">' +
      '<font color="green">Gathering your buffs ...</font></span></td>' +
      '<td style="border-style: solid; border-width: 1px;"><span ' +
      'id="Helper:attackPlayerDefenderBuffData"><font color="green">' +
      'Gathering defender buffs ...</font></span></td></tr>' +
      '</tbody></table><center>';

    attackPlayerTable.rows[4].cells[0].innerHTML = output;

    system.xmlhttp('index.php?cmd=profile',
      getProfileStatsAndBuffs,
      {'anchor1':'attackPlayerSelfStatData',
        'anchor2':'attackPlayerSelfBuffData'});
    system.xmlhttp('index.php?cmd=findplayer&search_active=1&search_level_max=&search_level_min=&search_username='+
      targetPlayer[1]+'&search_show_first=1',
      getProfileStatsAndBuffs,
      {'anchor1':'attackPlayerDefenderStatData',
        'anchor2':'attackPlayerDefenderBuffData'});
    //insert blank row
    var newRow = attackPlayerTable.insertRow(5);
    var newCell = newRow.insertCell(0);
    newCell.innerHTML = '&nbsp;';
  }
}

export default {
  injectAttackPlayer: injectAttackPlayer
};
