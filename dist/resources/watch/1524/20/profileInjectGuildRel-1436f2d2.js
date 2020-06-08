import { V as setValue, B as getText, G as getValue, e as insertHtmlBeforeEnd, $ as escapeHtml } from './calfSystem-c0288c6c.js';
import './playerName-544021b8.js';
import { t as toLowerCase } from './toLowerCase-e5817205.js';
import './onlineDot-071cab0f.js';
import './batch-eda68c17.js';
import './colouredDots-e475b6dd.js';
import './currentGuildId-d935e4f2.js';
import './intValue-e7ac83e4.js';
import './valueText-77bcf3af.js';
import './doStatTotal-9583de62.js';
import { g as getIsSelf } from './profile-6a8f9c2c.js';
import './formToUrl-112a5041.js';
import './interceptSubmit-cad751a8.js';
import { r as replaceDoubleSpace } from './replaceDoubleSpace-2673cfa7.js';
import './csvSplit-dec7ba89.js';
import { s as shouldBeArray } from './shouldBeArray-d8e0abe6.js';
import { g as getGuildALink, a as getIsOwnGuild } from './getIsOwnGuild-4d24660b.js';

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
//# sourceMappingURL=profileInjectGuildRel-1436f2d2.js.map
