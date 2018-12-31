import calf from '../../support/calf';
import createDocument from '../../system/createDocument';
import displayUpgradeMsg from './displayUpgradeMsg';
import setValue from '../../system/setValue';

function findDoc(data) {
  if (location.search.indexOf('cmd=points&type=1') === -1) {
    return createDocument(data);
  }
  var boxes = document.querySelectorAll('#pCC input[name="quantity"]');
  boxes[0].value = '100';
  boxes[1].value = '10';
  return document;
}

function checkUpgrade(limit) {
  var checkDoneUpgrade = limit.textContent.split(' / ');
  if (checkDoneUpgrade[0] !== checkDoneUpgrade[1]) {
    displayUpgradeMsg();
    setValue('needToDoUpgrade', true);
  } else {
    setValue('needToDoUpgrade', false);
    setValue('lastUpgradeCheck',
      Date.parse(limit.nextElementSibling.textContent + ' GMT'));
  }
}

export default function parseGoldUpgrades(data) {
  if (!calf.enableUpgradeAlert) {return;}
  var doc = findDoc(data);
  var tables = doc.querySelectorAll('#pCC > table');
  if (tables.length > 0) {
    var limit = tables[tables.length - 1].rows[3].cells[2];
    checkUpgrade(limit);
  }
}
