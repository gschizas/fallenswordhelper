import getValue from '../system/getValue';

function totalAllyEnemy(target, numberOfContacts, contactsTotal) {
  var _c = '';
  if (contactsTotal && contactsTotal >= numberOfContacts) {
    _c = '/' + contactsTotal;
  }
  target.insertAdjacentHTML('beforeend', '<span class="fshBlue">&nbsp;' +
    numberOfContacts + _c + '</span>');
}

function countContacts(el, isAllies) {
  var target = el.parentNode;
  var numberOfContacts = target.nextSibling.nextSibling
    .getElementsByTagName('table').length - 1;
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
