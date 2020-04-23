import createSpan from '../../../common/cElement/createSpan';
import setInnerHtml from '../../../dom/setInnerHtml';
import setText from '../../../dom/setText';

export let currentHp;
export let maxHp;
export let guildKills;
export let currentPct;
export let totalPct;
export let statusText;
export let cooldownText;

export function initVars() {
  currentHp = createSpan();
  maxHp = createSpan();
  guildKills = createSpan();
  currentPct = createSpan();
  totalPct = createSpan();
  statusText = createSpan();
  cooldownText = createSpan();
}

export function clearTitanDiv() {
  setText('', currentHp);
  setText('', maxHp);
  setText('', guildKills);
  setText('', currentPct);
  setText('', totalPct);
  setInnerHtml('', statusText);
  setInnerHtml('', cooldownText);
}
