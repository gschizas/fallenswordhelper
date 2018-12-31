import {createAnchor} from '../common/cElement';
import getValue from '../system/getValue';
import {guideUrl} from '../support/constants';
import insertElement from '../common/insertElement';
import insertElementBefore from '../common/insertElementBefore';
import insertHtmlAfterEnd from '../common/insertHtmlAfterEnd';
import {pCC} from '../support/layout';
import parseDateAsTimestamp from '../system/parseDateAsTimestamp';
import setValue from '../system/setValue';

function pvpLadder(head) {return head.children[1].textContent === 'PvP Ladder';}

function timestamp(head) {
  return parseDateAsTimestamp(head.children[2].textContent);
}

function lookForPvPLadder() {
  var rumours = pCC.getElementsByClassName('news_head_tavern');
  var pvpTimes = Array.from(rumours).filter(pvpLadder).map(timestamp);
  var logTime = Math.max.apply(null, pvpTimes);
  if (logTime > getValue('lastLadderReset')) {
    setValue('lastLadderReset', logTime);
  }
}

function addUfsgLinks() {
  var imgs = document.querySelectorAll(
    '.news_body img[src^="https://cdn.fallensword.com/creatures/"]');
  Array.prototype.forEach.call(imgs, function(img) {
    var myName = encodeURIComponent(img.getAttribute('oldtitle'));
    var myLink = createAnchor({
      href: guideUrl + 'creatures&search_name=' + myName,
      target: '_blank'
    });
    insertElementBefore(myLink, img);
    insertElement(myLink, img);
  });
}

export default function injectHomePageTwoLink() { // Pref
  var archiveLink = document.querySelector(
    '#pCC a[href="index.php?cmd=&subcmd=viewupdatearchive"]');
  if (!archiveLink) {return;}
  insertHtmlAfterEnd(archiveLink, '&nbsp;<a href="index.php?cmd=' +
    '&subcmd=viewupdatearchive&subcmd2=&page=2&search_text=">' +
    'View Updates Page 2</a>');
  archiveLink = document.querySelector(
    '#pCC a[href="index.php?cmd=&subcmd=viewarchive"]');
  insertHtmlAfterEnd(archiveLink, '&nbsp;<a href="index.php?cmd=' +
    '&subcmd=viewarchive&subcmd2=&page=2&search_text=">View News Page 2</a>');
  lookForPvPLadder(); // Pref
  addUfsgLinks(); // Pref
}
