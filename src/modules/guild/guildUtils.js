import * as system from '../support/system';

export function removeGuildAvyImgBorder() {
  document.querySelector('#pCC img[oldtitle$="\'s Logo"]')
    .removeAttribute('style');
}

export function guildXPLock() {
  var xpLock = document
    .querySelector('#pCC a[data-tipped^="<b>Guild XP</b>"]');
  if (!xpLock) {return;}
  var xpLockmouseover = xpLock.getAttribute('data-tipped');
  var xpLockXP = system.getIntFromRegExp(xpLockmouseover,
    /XP Lock: <b>(\d*)/);
  var actualXP = system.getIntFromRegExp(xpLockmouseover,
    /XP: <b>(\d*)/);
  if (actualXP < xpLockXP) {
    xpLock.parentNode.nextElementSibling.insertAdjacentHTML('beforeend',
      ' (<b>' + system.addCommas(xpLockXP - actualXP) + '</b>)');
  }
}
