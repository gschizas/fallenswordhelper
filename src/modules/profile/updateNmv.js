import {getElementById} from '../common/getElement';

export default function updateNmv() {
  var nmvImg = document.querySelector(
    '#profileRightColumn img[src$="/60_sm.gif"]');
  if (!nmvImg) {return;}
  var atkStat = Number(
    getElementById('stat-attack').firstChild.textContent.trim());
  if (isNaN(atkStat)) {return;}
  var defStat = Number(
    getElementById('stat-defense').firstChild.textContent.trim());
  var oldTipped = nmvImg.dataset.tipped;
  var lvlAry = /\(Level: (\d+)\)/.exec(oldTipped);
  var nmvLvl = Number(lvlAry[1]);
  var nmvEffect = Math.floor(atkStat * nmvLvl * 0.0025);
  nmvImg.dataset.tipped = oldTipped.slice(0, -15) +
    '<br>Attack: ' + (atkStat - nmvEffect).toString() +
    '&nbsp;&nbsp;Defense: ' + (defStat + nmvEffect).toString() +
    '</center></div>';
}
