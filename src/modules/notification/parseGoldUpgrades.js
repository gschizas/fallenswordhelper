import calf from '../support/calf';
import displayUpgradeMsg from './displayUpgradeMsg';
import {getElementById} from '../common/getElement';
import {createDocument, setValue} from '../support/system';

function findDoc(data) {
  if (location.search.indexOf('cmd=points&type=1') === -1) {
    return createDocument(data);
  }
  document.querySelectorAll('#pCC input[name="quantity"]')[1].value = '10';
  return document;
}

export default function parseGoldUpgrades(data) {
  if (!calf.enableUpgradeAlert) {return;}
  var doc = findDoc(data);
  var limit = getElementById('pCC', doc).getElementsByTagName('TABLE')[0]
    .rows[3].cells[2];
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
