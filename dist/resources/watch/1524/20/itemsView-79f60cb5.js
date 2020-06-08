import { ba as containsText, D as querySelector, bj as ahSearchUrl, e as insertHtmlBeforeEnd, B as getText } from './calfSystem-c0288c6c.js';
import { x as xPath } from './xPath-6b38bd8d.js';

function isNotBound() {
  return !xPath('.//*[text() = "This item is bound"]');
}

function isNotComponent() {
  return !containsText('Component',
    xPath('.//tr[td/b/text() = "Type:"]/td[2]'));
}

function ahItemHref(name) {
  return `https://www.fallensword.com/${ahSearchUrl}${name}`;
}

function insertAhLink(target) {
  insertHtmlBeforeEnd(target.parentNode, ` [<a href="${
    ahItemHref(getText(target))
  }" target="_blank"><b class="fshBlue">AH</b></a>]`);
}

function itemsView() {
  if (isNotBound() && isNotComponent()) {
    insertAhLink(querySelector('.tHeader').children[0]);
  }
}

export default itemsView;
//# sourceMappingURL=itemsView-79f60cb5.js.map
