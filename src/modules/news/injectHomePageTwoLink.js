import {cdn} from '../system/system';
import containsText from '../common/containsText';
import getArrayByClassName from '../common/getArrayByClassName';
import getText from '../common/getText';
import getValue from '../system/getValue';
import insertElement from '../common/insertElement';
import insertElementBefore from '../common/insertElementBefore';
import insertHtmlAfterEnd from '../common/insertHtmlAfterEnd';
import {pCC} from '../support/layout';
import parseDateAsTimestamp from '../system/parseDateAsTimestamp';
import querySelector from '../common/querySelector';
import querySelectorArray from '../common/querySelectorArray';
import setValue from '../system/setValue';
import {archiveUrl, guideUrl, updateArchiveUrl} from '../support/constants';
import {createAnchor, createSpan} from '../common/cElement';

var titanRe;

function getTitanRe() {
  if (!titanRe) {
    titanRe = new RegExp('(\\s*A \')([^\']*)(\' titan has been spotted in )' +
      '([^!]*)(!)');
  }
  return titanRe;
}

function pvpLadder(head) {return containsText('PvP Ladder', head.children[1]);}

function timestamp(head) {
  return parseDateAsTimestamp(getText(head.children[2]));
}

function lookForPvPLadder() {
  var rumours = getArrayByClassName('news_head_tavern', pCC);
  var pvpTimes = rumours.filter(pvpLadder).map(timestamp);
  var logTime = Math.max.apply(null, pvpTimes);
  if (logTime > getValue('lastLadderReset')) {
    setValue('lastLadderReset', logTime);
  }
}

function makeALink(href, label) {
  return '<a href="' + href + '" target="_blank">' + label + '</a>';
}

function creatureSearchHref(name) {
  return guideUrl + 'creatures&search_name=' + name;
}

function realmSearchHref(name) {
  return guideUrl + 'realms&search_name=' + name;
}

function makeUfsgLink(img) {
  var myName = encodeURIComponent(img.getAttribute('oldtitle'));
  var myLink = createAnchor({
    href: creatureSearchHref(myName),
    target: '_blank'
  });
  insertElementBefore(myLink, img);
  insertElement(myLink, img);
}

function titanSpotted(el) {
  return getTitanRe().test(el.firstChild.nodeValue); // Text Node
}

function reformatNews(el) {
  var news = el.firstChild.nodeValue.match(getTitanRe()); // Text Node
  news[2] = makeALink(creatureSearchHref(news[2]), news[2]);
  news[4] = makeALink(realmSearchHref(news[4]), news[4]);
  return news.slice(1).join('');
}

function titanLink(el) {
  var newSpan = createSpan({innerHTML: reformatNews(el)});
  el.replaceChild(newSpan, el.firstChild); // Text Node
}

function addUfsgLinks() {
  querySelectorArray(
    '.news_body img[src^="' + cdn + 'creatures/"]')
    .forEach(makeUfsgLink);
  getArrayByClassName('news_body_tavern', pCC)
    .filter(titanSpotted).forEach(titanLink);
}

export default function injectHomePageTwoLink() { // Pref
  var archiveLink = querySelector('#pCC a[href="' + updateArchiveUrl + '"]');
  if (!archiveLink) {return;}
  insertHtmlAfterEnd(archiveLink, '&nbsp;<a href="' + updateArchiveUrl +
    '&page=2">View Updates Page 2</a>');
  archiveLink = querySelector('#pCC a[href="' + archiveUrl + '"]');
  insertHtmlAfterEnd(archiveLink, '&nbsp;<a href="' + archiveUrl +
    '&page=2">View News Page 2</a>');
  lookForPvPLadder(); // Pref
  addUfsgLinks(); // Pref
}
