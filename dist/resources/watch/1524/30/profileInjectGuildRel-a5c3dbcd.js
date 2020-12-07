import { V as setValue, B as getText, G as getValue, f as insertHtmlBeforeEnd, $ as escapeHtml } from './calfSystem-d357ca6f.js';
import './playerName-35237fe6.js';
import { t as toLowerCase } from './toLowerCase-5e186769.js';
import './onlineDot-579824dd.js';
import './batch-f74bc427.js';
import './colouredDots-f5d022b5.js';
import './currentGuildId-bcd6f2c1.js';
import './intValue-e8157483.js';
import './valueText-6e721c40.js';
import './doStatTotal-a9fb57d6.js';
import './executeAll-be2ac0ec.js';
import { g as getIsSelf } from './profile-6746ccd4.js';
import './formToUrl-b0bbd7c6.js';
import './interceptSubmit-8526eadf.js';
import { r as replaceDoubleSpace } from './replaceDoubleSpace-85926b11.js';
import './csvSplit-1d6bbc93.js';
import { s as shouldBeArray } from './shouldBeArray-9565f7ee.js';
import { g as getGuildALink, a as getIsOwnGuild } from './getIsOwnGuild-fd9b48a5.js';

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
//# sourceMappingURL=profileInjectGuildRel-a5c3dbcd.js.map
