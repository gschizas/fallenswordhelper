import { W as setValue, B as getText, H as getValue, f as insertHtmlBeforeEnd, a0 as escapeHtml } from './calfSystem-e64be67d.js';
import { g as getGuildALink, a as getIsOwnGuild } from './getIsOwnGuild-40bfb79f.js';
import { g as getIsSelf } from './profile-ec79e86e.js';
import { r as replaceDoubleSpace } from './replaceDoubleSpace-856176a4.js';
import { s as shouldBeArray } from './shouldBeArray-796d1101.js';
import { t as toLowerCase } from './toLowerCase-ace931b6.js';
import './currentGuildId-d5e9890c.js';
import './colouredDots-d960c8f0.js';
import './batch-c5313510.js';
import './onlineDot-078ba87d.js';
import './doStatTotal-67151a61.js';
import './executeAll-f8eab1e4.js';
import './playerName-d6bc942c.js';
import './intValue-da5ad0eb.js';
import './valueText-9ff440bc.js';
import './interceptSubmit-448d7237.js';
import './formToUrl-b80842cb.js';
import './csvSplit-a4e91aa0.js';

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
//# sourceMappingURL=profileInjectGuildRel-f36046e4.js.map
