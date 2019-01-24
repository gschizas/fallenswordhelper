import {ahSearchUrl} from '../support/constants';
import insertHtmlBeforeEnd from '../common/insertHtmlBeforeEnd';
import querySelector from '../common/querySelector';
import textContent from '../common/textContent';
import xPath from '../common/xPath';

function isNotBound() {
  return !xPath('.//*[text() = "This item is bound"]');
}

function isNotComponent() {
  return textContent(
    xPath('.//tr[td/b/text() = "Type:"]/td[2]')) !== 'Component';
}

function ahItemHref(name) {
  return 'https://www.fallensword.com/' + ahSearchUrl + name;
}

function insertAhLink(target) {
  insertHtmlBeforeEnd(target.parentNode, ' [<a href="' +
    ahItemHref(textContent(target)) +
    '" target="_blank"><b class="fshBlue">AH</b></a>]');
}

export default function itemsView() {
  if (isNotBound() && isNotComponent()) {
    insertAhLink(querySelector('.tHeader').children[0]);
  }
}
