import currentGuildId from '../common/currentGuildId';
import getText from '../common/getText';
import getValue from '../system/getValue';
import {guildSubcmdUrl} from '../support/constants';
import insertHtmlBeforeEnd from '../common/insertHtmlBeforeEnd';
import partial from '../common/partial';
import replaceDoubleSpace from '../common/replaceDoubleSpace';
import setValue from '../system/setValue';
import shouldBeArray from '../system/shouldBeArray';
import toLowerCase from '../common/toLowerCase';

export var guildId;
export var currentGuildRelationship;
var myGuildMsgs = [
  ['self', 'fshGreen', 'guildSelfMessage'],
  ['friendly', 'fshOliveDrab', 'guildFrndMessage'],
  ['old', 'fshDarkCyan', 'guildPastMessage'],
  ['enemy', 'fshRed', 'guildEnmyMessage']
];
var typeMapping = [
  ['guildFrnd', 'friendly'],
  ['guildPast', 'old'],
  ['guildEnmy', 'enemy']
];

function guildAry(pref) {
  var val = shouldBeArray(pref);
  if (val) {
    return val.map(replaceDoubleSpace).map(toLowerCase);
  }
  return [];
}

function expandList(arr) {
  return [guildAry(arr[0]), arr[1]];
}

function buildScenario() {
  return typeMapping.map(expandList);
}

function hasRelationship(txt, el) {
  return el[0].includes(txt);
}

function externalRelationship(_txt) {
  var scenario = buildScenario();
  var txt = replaceDoubleSpace(toLowerCase(_txt));
  var relObj = scenario.find(partial(hasRelationship, txt));
  if (relObj) {return relObj[1];}
}

function thisGuildId(aLink) {
  var guildIdResult = /guild_id=([0-9]+)/i.exec(aLink.href);
  if (guildIdResult) {return Number(guildIdResult[1]);}
}

function guildRelationship(aLink) {
  guildId = thisGuildId(aLink);
  if (guildId && guildId === currentGuildId()) {
    setValue('guildSelf', getText(aLink));
    return 'self';
  }
  return externalRelationship(getText(aLink));
}

function whichMsg(arr) {return arr[0] === currentGuildRelationship;}

function setMsg(aLink) {
  var thisGuildRel = myGuildMsgs.find(whichMsg);
  aLink.parentNode.classList.add(thisGuildRel[1]);
  insertHtmlBeforeEnd(aLink.parentNode, '<br>' + getValue(thisGuildRel[2]));
}

function foundGuildLink(aLink) {
  currentGuildRelationship = guildRelationship(aLink);
  if (currentGuildRelationship) {
    setMsg(aLink);
  }
}

export function profileInjectGuildRel(self) {
  var aLink = document.querySelector(
    '#pCC a[href^="' + guildSubcmdUrl + 'view&guild_id="]');
  if (aLink) {
    foundGuildLink(aLink);
  } else if (self) {
    setValue('guildSelf', '');
  }
}
