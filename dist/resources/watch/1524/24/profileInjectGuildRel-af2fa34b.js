import { V as setValue, B as getText, G as getValue, f as insertHtmlBeforeEnd, $ as escapeHtml } from './calfSystem-dea093d3.js';
import './playerName-cba7e46d.js';
import { t as toLowerCase } from './toLowerCase-2f55d839.js';
import './onlineDot-70e0df94.js';
import './batch-11b62cdc.js';
import './colouredDots-b8fa52ee.js';
import './currentGuildId-d9de8509.js';
import './intValue-44683b42.js';
import './valueText-63491c45.js';
import './doStatTotal-64b3bd93.js';
import { g as getIsSelf } from './profile-219f602b.js';
import './formToUrl-a24fc80c.js';
import './interceptSubmit-609c1a86.js';
import { r as replaceDoubleSpace } from './replaceDoubleSpace-3d54502a.js';
import './csvSplit-dcc6dfc9.js';
import { s as shouldBeArray } from './shouldBeArray-c18f1b64.js';
import { g as getGuildALink, a as getIsOwnGuild } from './getIsOwnGuild-8c7b3080.js';

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
//# sourceMappingURL=profileInjectGuildRel-af2fa34b.js.map
