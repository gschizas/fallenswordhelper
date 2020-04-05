import { arrayFrom } from '../common/arrayFrom';
import { getElementById } from '../common/getElement';
import getTextTrim from '../common/getTextTrim';
import querySelector from '../common/querySelector';
import { def_statAttack, def_statDefense } from '../support/constants';

function thisText(thisNode) {
  return arrayFrom(thisNode.childNodes)
    .filter((el) => el.nodeType === 3)
    .map(getTextTrim)
    .join('');
}

function getDefStat() {
  return Number(thisText(getElementById(def_statDefense)));
}

function calcNmvEffect(atkStat, oldTipped) {
  const lvlAry = /\(Level: (\d+)\)/.exec(oldTipped);
  const nmvLvl = Number(lvlAry[1]);
  return Math.floor(atkStat * nmvLvl * 0.0025);
}

function gotAtk(nmvImg, atkStat) {
  const defStat = getDefStat();
  const oldTipped = nmvImg.dataset.tipped;
  const nmvEffect = calcNmvEffect(atkStat, oldTipped);
  nmvImg.dataset.tipped = `${oldTipped.slice(0, -15)
  }<br>Attack: ${(atkStat - nmvEffect).toString()
  }&nbsp;&nbsp;Defense: ${(defStat + nmvEffect).toString()
  }</center></div>`;
}

function gotImg(nmvImg) {
  const atkEl = getElementById(def_statAttack);
  if (!atkEl) { return; }
  const atkStat = Number(thisText(atkEl));
  if (!isNaN(atkStat)) { gotAtk(nmvImg, atkStat); }
}

export default function updateNmv() {
  const nmvImg = querySelector('#profileRightColumn img[src$="/60.png"]');
  if (nmvImg) { gotImg(nmvImg); }
}
