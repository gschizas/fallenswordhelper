import {createSpan} from '../../../common/cElement';
import setText from '../../../common/setText';

export var currentHp;
export var maxHp;
export var guildKills;
export var currentPct;
export var totalPct;
export var statusText;
export var cooldownText;

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
  statusText.innerHTML = '';
  cooldownText.innerHTML = '';
}
