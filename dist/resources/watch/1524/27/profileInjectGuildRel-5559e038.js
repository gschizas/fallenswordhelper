import { W as setValue, B as getText, G as getValue, f as insertHtmlBeforeEnd, a0 as escapeHtml } from './calfSystem-975d976a.js';
import './playerName-20370288.js';
import { t as toLowerCase } from './toLowerCase-33399b5a.js';
import './onlineDot-dc6c8ae7.js';
import './batch-09b88166.js';
import './colouredDots-ea1c9313.js';
import './currentGuildId-fe3aa388.js';
import './intValue-ef353ded.js';
import './valueText-987489d3.js';
import './doStatTotal-a8e5e39d.js';
import { g as getIsSelf } from './profile-bdb5ca79.js';
import './formToUrl-5a234537.js';
import './interceptSubmit-653ee929.js';
import { r as replaceDoubleSpace } from './replaceDoubleSpace-c42a8c25.js';
import './csvSplit-c9226810.js';
import { s as shouldBeArray } from './shouldBeArray-86ddac10.js';
import { g as getGuildALink, a as getIsOwnGuild } from './getIsOwnGuild-71bd646d.js';

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
//# sourceMappingURL=profileInjectGuildRel-5559e038.js.map
