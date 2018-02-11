import addCommas from '../system/addCommas';
import getIntFromRegExp from '../system/getIntFromRegExp';

export function removeGuildAvyImgBorder() {
  document.querySelector('#pCC img[oldtitle$="\'s Logo"]')
    .removeAttribute('style');
}

export function guildXPLock() {
  var xpLock = document
    .querySelector('#pCC a[data-tipped^="<b>Guild XP</b>"]');
  if (!xpLock) {return;}
  var xpLockmouseover = xpLock.dataset.tipped;
  var xpLockXP = getIntFromRegExp(xpLockmouseover,
    /XP Lock: <b>(\d*)/);
  var actualXP = getIntFromRegExp(xpLockmouseover,
    /XP: <b>(\d*)/);
  if (actualXP < xpLockXP) {
    xpLock.parentNode.nextElementSibling.insertAdjacentHTML('beforeend',
      ' (<b>' + addCommas(xpLockXP - actualXP) + '</b>)');
  }
}
