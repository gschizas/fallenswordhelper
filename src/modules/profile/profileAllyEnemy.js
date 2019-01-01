import {def_table} from '../support/constants';
import getElementsByTagName from '../common/getElementsByTagName';
import getValue from '../system/getValue';
import insertHtmlBeforeEnd from '../common/insertHtmlBeforeEnd';

function totalAllyEnemy(target, numberOfContacts, contactsTotal) {
  var _c = '';
  if (contactsTotal && contactsTotal >= numberOfContacts) {
    _c = '/' + contactsTotal;
  }
  insertHtmlBeforeEnd(target, '<span class="fshBlue">&nbsp;' +
    numberOfContacts + _c + '</span>');
}

function countContacts(el, isAllies) {
  var target = el.parentNode;
  var numberOfContacts = getElementsByTagName(def_table,
    target.nextSibling.nextSibling).length - 1;
  if (isAllies) {
    totalAllyEnemy(target, numberOfContacts, getValue('alliestotal'));
  } else {
    totalAllyEnemy(target, numberOfContacts, getValue('enemiestotal'));
  }
}

function findAllyEnemy(el) {
  var isAllies = el.textContent === 'Allies';
  var isEnemies = el.textContent === 'Enemies';
  if (isAllies || isEnemies) {
    countContacts(el, isAllies);
  }
}

export default function profileParseAllyEnemy() {
  // Allies/Enemies count/total function
  Array.prototype.forEach.call(
    document.querySelectorAll('#profileLeftColumn strong'), findAllyEnemy);
}
