import addCommas from '../system/addCommas';
import getIntFromRegExp from '../system/getIntFromRegExp';
import insertHtmlBeforeEnd from '../common/insertHtmlBeforeEnd';
import querySelector from '../common/querySelector';

function wrapUrl(guildLogo) {
  var url = guildLogo.nextElementSibling.nextElementSibling;
  if (url) {url.classList.add('fshBreakAll');}
}

export function removeGuildAvyImgBorder() {
  var guildLogo = querySelector('#pCC img[oldtitle$="\'s Logo"]');
  if (!guildLogo) {return;}
  guildLogo.removeAttribute('style');
  wrapUrl(guildLogo);
}

function mightBePositive(actualXP, xpLockXP) {
  let sign = '';
  if (actualXP > xpLockXP) {sign = '+';}
  return sign + addCommas(actualXP - xpLockXP);
}

function injectLock(xpLock) {
  var xpLockmouseover = xpLock.dataset.tipped;
  var xpLockXP = getIntFromRegExp(xpLockmouseover, /XP Lock: <b>(\d*)/);
  var actualXP = getIntFromRegExp(xpLockmouseover, /XP: <b>(\d*)/);
  insertHtmlBeforeEnd(xpLock.parentNode.nextElementSibling,
    ' (<b>' + mightBePositive(actualXP, xpLockXP) + '</b>)');
}

export function guildXPLock() {
  var xpLock = querySelector('#pCC a[data-tipped^="<b>Guild XP</b>"]');
  if (xpLock) {injectLock(xpLock);}
}
