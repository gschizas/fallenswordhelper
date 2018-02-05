import {getValue, imageServer} from '../system/system';

var guildId;
var currentGuildRelationship;
var guildMessages = {
  self: {color: 'fshGreen', message: getValue('guildSelfMessage')},
  friendly: {color: 'fshOliveDrab', message: getValue('guildFrndMessage')},
  old: {color: 'fshDarkCyan', message: getValue('guildPastMessage')},
  enemy: {color: 'fshRed', message: getValue('guildEnmyMessage')}
};

export function showRecallButton(playername) {
  if (currentGuildRelationship === 'self') {
    return '<a class="quickButton tip-static" ' +
      'href="index.php?cmd=guild&subcmd=inventory&subcmd2=report&user=' +
      playername + '" data-tipped="Recall items from ' + playername +
      '" style="background-image: url(\'' + imageServer +
      '/temple/3.gif\');"></a>&nbsp;&nbsp;';
  }
  return '';
}

export function showRankButton(playerid, playername) {
  if (currentGuildRelationship === 'self' && getValue('showAdmin')) {
    return '<a class="quickButton buttonGuildRank tip-static" href="' +
      'index.php?cmd=guild&subcmd=members&subcmd2=changerank&member_id=' +
      playerid + '" data-tipped="Rank ' + playername +
      '" style="background-image: url(\'' + imageServer +
      '/guilds/' + guildId + '_mini.jpg\');"></a>&nbsp;&nbsp;';
  }
  return '';
}

function guildAry(val) {
  if (val) {
    return val.toLowerCase().replace(/\s\s*/g, ' ').split(/\s*,\s*/);
  }
  return [];
}

function guildRelationship(_txt) {
  var scenario = [
    {test: guildAry(getValue('guildSelf')), type: 'self'},
    {test: guildAry(getValue('guildFrnd')), type: 'friendly'},
    {test: guildAry(getValue('guildPast')), type: 'old'},
    {test: guildAry(getValue('guildEnmy')), type: 'enemy'}
  ];
  var txt = _txt.toLowerCase().replace(/\s\s*/g, ' ');
  for (var i = 0; i < scenario.length; i += 1) {
    if (scenario[i].test.indexOf(txt) !== -1) {return scenario[i].type;}
  }
}

function foundGuildLink(aLink) {
  var guildIdResult = /guild_id=([0-9]+)/i.exec(aLink.href);
  if (guildIdResult) {guildId = parseInt(guildIdResult[1], 10);}
  currentGuildRelationship = guildRelationship(aLink.text);
  if (currentGuildRelationship) {
    aLink.parentNode.classList.add(
      guildMessages[currentGuildRelationship].color);
    aLink.parentNode.insertAdjacentHTML('beforeend', '<br>' +
      guildMessages[currentGuildRelationship].message);
  }
}

export function profileInjectGuildRel() {
  var aLink = document.querySelector(
    '#pCC a[href^="index.php?cmd=guild&subcmd=view&guild_id="]');
  if (aLink) {foundGuildLink(aLink);}
}
