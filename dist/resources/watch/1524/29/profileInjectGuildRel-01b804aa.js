import { V as setValue, B as getText, G as getValue, f as insertHtmlBeforeEnd, $ as escapeHtml } from './calfSystem-b31646eb.js';
import './playerName-8a2d59df.js';
import { t as toLowerCase } from './toLowerCase-0a22477f.js';
import './onlineDot-faba3c40.js';
import './batch-9c39837c.js';
import './colouredDots-2fa85d58.js';
import './currentGuildId-d6a28488.js';
import './intValue-f94761c7.js';
import './valueText-31e23dfe.js';
import './doStatTotal-219a4f8a.js';
import './executeAll-18adff71.js';
import { g as getIsSelf } from './profile-9b59385f.js';
import './formToUrl-16cc4fc0.js';
import './interceptSubmit-86cfff6d.js';
import { r as replaceDoubleSpace } from './replaceDoubleSpace-89ffec51.js';
import './csvSplit-b214d56b.js';
import { s as shouldBeArray } from './shouldBeArray-ec015edf.js';
import { g as getGuildALink, a as getIsOwnGuild } from './getIsOwnGuild-9e7e6d08.js';

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
//# sourceMappingURL=profileInjectGuildRel-01b804aa.js.map
