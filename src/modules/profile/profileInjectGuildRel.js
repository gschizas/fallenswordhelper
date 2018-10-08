import currentGuildId from '../common/currentGuildId';
import getValue from '../system/getValue';
import {imageServer} from '../system/system';
import insertHtmlBeforeEnd from '../common/insertHtmlBeforeEnd';
import partial from '../common/partial';
import setValue from '../system/setValue';

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
      '/guilds/' + guildId + '_mini.png\');"></a>&nbsp;&nbsp;';
  }
  return '';
}

function guildAry(val) {
  if (val) {
    return val.toLowerCase().replace(/\s\s*/g, ' ').split(/\s*,\s*/);
  }
  return [];
}

function hasRelationship(txt, el) {return el.test.includes(txt);}

function externalRelationship(_txt) {
  var scenario = [
    {test: guildAry(getValue('guildFrnd')), type: 'friendly'},
    {test: guildAry(getValue('guildPast')), type: 'old'},
    {test: guildAry(getValue('guildEnmy')), type: 'enemy'}
  ];
  var txt = _txt.toLowerCase().replace(/\s\s*/g, ' ');
  var relObj = scenario.find(partial(hasRelationship, txt));
  if (relObj) {return relObj.type;}
}

function thisGuildId(aLink) {
  var guildIdResult = /guild_id=([0-9]+)/i.exec(aLink.href);
  if (guildIdResult) {return Number(guildIdResult[1]);}
}

function guildRelationship(aLink) {
  guildId = thisGuildId(aLink);
  if (guildId && guildId === currentGuildId()) {
    setValue('guildSelf', aLink.text);
    return 'self';
  }
  return externalRelationship(aLink.text);
}

function foundGuildLink(aLink) {
  currentGuildRelationship = guildRelationship(aLink);
  if (currentGuildRelationship) {
    aLink.parentNode.classList.add(
      guildMessages[currentGuildRelationship].color);
    insertHtmlBeforeEnd(aLink.parentNode, '<br>' +
      guildMessages[currentGuildRelationship].message);
  }
}

export function profileInjectGuildRel(self) {
  var aLink = document.querySelector(
    '#pCC a[href^="index.php?cmd=guild&subcmd=view&guild_id="]');
  if (aLink) {foundGuildLink(aLink);} else if (self) {
    setValue('guildSelf', '');
  }
}
