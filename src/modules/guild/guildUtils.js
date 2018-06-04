import addCommas from '../system/addCommas';
import getIntFromRegExp from '../system/getIntFromRegExp';
import insertHtmlBeforeEnd from '../common/insertHtmlBeforeEnd';

export function removeGuildAvyImgBorder() {
  var guildLogo = document.querySelector('#pCC img[oldtitle$="\'s Logo"]');
  guildLogo.removeAttribute('style');
  guildLogo.nextElementSibling.nextElementSibling.classList.add('fshBreakAll');
}

export function guildXPLock(xpLock) {
  var xpLockmouseover = xpLock.dataset.tipped;
  var xpLockXP = getIntFromRegExp(xpLockmouseover,
    /XP Lock: <b>(\d*)/);
  var actualXP = getIntFromRegExp(xpLockmouseover,
    /XP: <b>(\d*)/);
  if (actualXP < xpLockXP) {
    insertHtmlBeforeEnd(xpLock.parentNode.nextElementSibling,
      ' (<b>' + addCommas(xpLockXP - actualXP) + '</b>)');
  }
}

export function getXpLock() {
  return document.querySelector('#pCC a[data-tipped^="<b>Guild XP</b>"]');
}
