import { V as setValue, B as getText, H as getValue, f as insertHtmlBeforeEnd, $ as escapeHtml } from './calfSystem-91adbec8.js';
import { g as getGuildALink, a as getIsOwnGuild } from './getIsOwnGuild-d5d83528.js';
import { g as getIsSelf } from './profile-3eb89f48.js';
import { r as replaceDoubleSpace } from './replaceDoubleSpace-a9060de0.js';
import { s as shouldBeArray } from './shouldBeArray-623d21b2.js';
import { t as toLowerCase } from './toLowerCase-51740687.js';
import './currentGuildId-748f657b.js';
import './colouredDots-fd53841d.js';
import './batch-42f379a6.js';
import './onlineDot-f5323202.js';
import './doStatTotal-0bcf773c.js';
import './executeAll-86fbe671.js';
import './playerName-13e38788.js';
import './intValue-e7ef611d.js';
import './valueText-43fd27d5.js';
import './interceptSubmit-06382d8c.js';
import './formToUrl-b273f7df.js';
import './csvSplit-aa512e64.js';

const myGuildMsgs = [
  ['self', 'fshGreen', 'guildSelfMessage'],
  ['friendly', 'fshOliveDrab', 'guildFrndMessage'],
  ['old', 'fshDarkCyan', 'guildPastMessage'],
  ['enemy', 'fshRed', 'guildEnmyMessage'],
];
const typeMapping = [
  ['guildFrnd', 'friendly'],
  ['guildPast', 'old'],
  ['guildEnmy', 'enemy'],
];

function guildAry(pref) {
  const val = shouldBeArray(pref);
  if (val) {
    return val.map(replaceDoubleSpace).map(toLowerCase);
  }
  return [];
}

function externalRelationship(_txt) {
  const scenario = typeMapping.map(([pref, label]) => [guildAry(pref), label]);
  const txt = replaceDoubleSpace(toLowerCase(_txt));
  const relObj = scenario.find(([guilds]) => guilds.includes(txt));
  if (relObj) { return relObj[1]; }
}

function guildRelationship(aLink) {
  if (getIsOwnGuild()) {
    setValue('guildSelf', getText(aLink));
    return 'self';
  }
  return externalRelationship(getText(aLink));
}

function setMsg(aLink, currentGuildRelationship) {
  const [, color, pref] = myGuildMsgs.find(
    ([rel]) => rel === currentGuildRelationship,
  );
  aLink.parentNode.classList.add(color);
  const msg = getValue(pref);
  if (msg && msg.length > 0) {
    insertHtmlBeforeEnd(aLink.parentNode, `<br>${escapeHtml(msg)}`);
  }
}

function foundGuildLink(aLink) {
  const currentGuildRelationship = guildRelationship(aLink);
  if (currentGuildRelationship) {
    setMsg(aLink, currentGuildRelationship);
  }
}

function profileInjectGuildRel() {
  const aLink = getGuildALink();
  if (aLink) {
    foundGuildLink(aLink);
  } else if (getIsSelf()) {
    setValue('guildSelf', '');
  }
}

export default profileInjectGuildRel;
//# sourceMappingURL=profileInjectGuildRel-4c9af0a9.js.map
