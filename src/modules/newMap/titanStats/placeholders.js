import {createSpan} from '../../common/cElement';

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
  currentHp.textContent = '';
  maxHp.textContent = '';
  guildKills.textContent = '';
  currentPct.textContent = '';
  totalPct.textContent = '';
  statusText.innerHTML = '';
  cooldownText.innerHTML = '';
}
