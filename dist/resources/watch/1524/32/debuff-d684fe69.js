import { am as profile, y as getElementById, o as onclick, s as partial, A as setInnerHtml, X as sendEvent, N as navigateTo, aR as hideQTip } from './calfSystem-e64be67d.js';
import { e as errorDialog } from './errorDialog-56c5d78c.js';
import './dialogMsg-0a235932.js';

function removeskill(buffId) {
  return profile({
    subcmd: 'removeskill',
    skill_id: buffId,
  });
}

function daRemoveSkill(buffId) {
  return removeskill(buffId);
}

function debuffSuccess(aLink, json) {
  if (json && json.s) { setInnerHtml('', aLink.parentNode); }
}

function doDebuff(fastDebuff, aLink) {
  if (fastDebuff) {
    sendEvent('profile', 'doDebuff');
    const buffId = aLink.href.match(/(\d+)$/)[1];
    daRemoveSkill(buffId).then(errorDialog).then(partial(debuffSuccess, aLink));
  } else {
    navigateTo(aLink.href);
  }
}

function getALink(target) {
  let aLink = target;
  if (aLink.tagName === 'IMG') {
    hideQTip(target);
    aLink = aLink.parentNode;
  }
  return aLink;
}

function capturing(e) {
  if (e.eventPhase === 1) {
    e.stopPropagation();
  }
}

function interceptDebuff(fastDebuff, e) {
  if (!e.returnValue) { return; }
  const aLink = getALink(e.target);
  if (aLink.tagName !== 'A') { return; }
  capturing(e);
  e.preventDefault();
  doDebuff(fastDebuff, aLink);
}

function debuff(fastDebuff, disableDeactivatePrompts) {
  const profileRightColumn = getElementById('profileRightColumn');
  if (profileRightColumn) {
    onclick(profileRightColumn.lastElementChild,
      partial(interceptDebuff, fastDebuff), disableDeactivatePrompts);
  }
}

export default debuff;
//# sourceMappingURL=debuff-d684fe69.js.map
