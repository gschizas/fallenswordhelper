import {getElementById} from '../common/getElement';
import getTextTrim from '../common/getTextTrim';
import querySelector from '../common/querySelector';
import {def_statAttack, def_statDefense} from '../support/constants';

function getDefStat() {
  return Number(getTextTrim(getElementById(def_statDefense)));
}

function calcNmvEffect(atkStat, oldTipped) {
  var lvlAry = /\(Level: (\d+)\)/.exec(oldTipped);
  var nmvLvl = Number(lvlAry[1]);
  return Math.floor(atkStat * nmvLvl * 0.0025);
}

function gotAtk(nmvImg, atkStat) {
  var defStat = getDefStat();
  var oldTipped = nmvImg.dataset.tipped;
  var nmvEffect = calcNmvEffect(atkStat, oldTipped);
  nmvImg.dataset.tipped = oldTipped.slice(0, -15) +
    '<br>Attack: ' + (atkStat - nmvEffect).toString() +
    '&nbsp;&nbsp;Defense: ' + (defStat + nmvEffect).toString() +
    '</center></div>';
}

function gotImg(nmvImg) {
  var atkEl = getElementById(def_statAttack);
  if (!atkEl) {return;}
  var atkStat = Number(getTextTrim(atkEl));
  if (!isNaN(atkStat)) {gotAtk(nmvImg, atkStat);}
}

export default function updateNmv() {
  var nmvImg = querySelector('#profileRightColumn img[src$="/60_sm.gif"]');
  if (nmvImg) {gotImg(nmvImg);}
}
