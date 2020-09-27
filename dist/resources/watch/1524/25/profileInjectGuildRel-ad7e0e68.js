import { V as setValue, B as getText, G as getValue, f as insertHtmlBeforeEnd, $ as escapeHtml } from './calfSystem-0ffc234f.js';
import './playerName-a4720b96.js';
import { t as toLowerCase } from './toLowerCase-c42114e1.js';
import './onlineDot-0427e12a.js';
import './batch-427b6015.js';
import './colouredDots-fb7d4e36.js';
import './currentGuildId-a05aee13.js';
import './intValue-65d3c36c.js';
import './valueText-173142a3.js';
import './doStatTotal-164abc6a.js';
import { g as getIsSelf } from './profile-eabf6c8d.js';
import './formToUrl-a527c245.js';
import './interceptSubmit-b0fa4c9c.js';
import { r as replaceDoubleSpace } from './replaceDoubleSpace-08433fa1.js';
import './csvSplit-8c1a6c7f.js';
import { s as shouldBeArray } from './shouldBeArray-e83a8728.js';
import { g as getGuildALink, a as getIsOwnGuild } from './getIsOwnGuild-c2b2bb71.js';

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
//# sourceMappingURL=profileInjectGuildRel-ad7e0e68.js.map
