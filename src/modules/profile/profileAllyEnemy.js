import {getValue} from '../support/system';

function totalAllyEnemy(target, numberOfContacts, contactsTotal) {
  var _c = '';
  if (contactsTotal && contactsTotal >= numberOfContacts) {
    _c = '/' + contactsTotal;
  }
  target.insertAdjacentHTML('beforeend', '<span class="fshBlue">&nbsp;' +
    numberOfContacts + _c + '</span>');
}

function findAllyEnemy(el) {
  var isAllies = el.textContent === 'Allies';
  var isEnemies = el.textContent === 'Enemies';
  if (!isAllies && !isEnemies) {return;}
  var target = el.parentNode;
  var numberOfContacts = target.nextSibling.nextSibling
    .getElementsByTagName('table').length - 1;
  if (isAllies) {
    totalAllyEnemy(target, numberOfContacts,
      getValue('alliestotal'));
  } else {
    totalAllyEnemy(target, numberOfContacts,
      getValue('enemiestotal'));
  }
}

export default function profileParseAllyEnemy() {
  // Allies/Enemies count/total function
  Array.prototype.forEach.call(
    document.querySelectorAll('#profileLeftColumn strong'), findAllyEnemy);
}
