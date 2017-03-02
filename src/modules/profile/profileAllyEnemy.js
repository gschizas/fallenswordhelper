import * as system from '../support/system';

function totalAllyEnemy(target, numberOfContacts, contactsTotal) { // Native
  target.insertAdjacentHTML('beforeend', '<span class="fshBlue">&nbsp;' +
    numberOfContacts + (contactsTotal && contactsTotal >= numberOfContacts ?
    '/' + contactsTotal : '') + '</span>');
}

function findAllyEnemy(el) { // Native
  var isAllies = el.textContent === 'Allies';
  var isEnemies = el.textContent === 'Enemies';
  if (!isAllies && !isEnemies) {return;}
  var target = el.parentNode;
  var numberOfContacts = target.nextSibling.nextSibling
    .getElementsByTagName('table').length - 1;
  if (isAllies) {
    totalAllyEnemy(target, numberOfContacts,
      system.getValue('alliestotal'));
  } else {
    totalAllyEnemy(target, numberOfContacts,
      system.getValue('enemiestotal'));
  }
}

export function profileParseAllyEnemy() { // Native
  // Allies/Enemies count/total function
  Array.prototype.forEach.call(
    document.querySelectorAll('#profileLeftColumn strong'), findAllyEnemy);
}
