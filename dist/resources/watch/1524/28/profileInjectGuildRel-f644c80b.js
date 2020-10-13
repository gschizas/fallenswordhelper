import { V as setValue, B as getText, G as getValue, f as insertHtmlBeforeEnd, $ as escapeHtml } from './calfSystem-21d16a0e.js';
import './playerName-e1b17bb3.js';
import { t as toLowerCase } from './toLowerCase-27ea448e.js';
import './onlineDot-61e94a2d.js';
import './batch-15fb3a1f.js';
import './colouredDots-292cf85e.js';
import './currentGuildId-ce8bf3c5.js';
import './intValue-f4d85578.js';
import './valueText-6bc7cb16.js';
import './doStatTotal-8cad2c14.js';
import './executeAll-3d4e4221.js';
import { g as getIsSelf } from './profile-9ad50e33.js';
import './formToUrl-2fddf9de.js';
import './interceptSubmit-719ace11.js';
import { r as replaceDoubleSpace } from './replaceDoubleSpace-bdb86519.js';
import './csvSplit-ab694daa.js';
import { s as shouldBeArray } from './shouldBeArray-3025de78.js';
import { g as getGuildALink, a as getIsOwnGuild } from './getIsOwnGuild-5432f275.js';

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
//# sourceMappingURL=profileInjectGuildRel-f644c80b.js.map
