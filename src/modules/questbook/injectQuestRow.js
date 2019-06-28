import {arrayFrom} from '../common/arrayFrom';
import {dataRows} from '../common/dataRows';
import getTextTrim from '../common/getTextTrim';
import getValue from '../system/getValue';
import guideButtons from './guideButtons';
import hideElement from '../common/hideElement';
import partial from '../common/partial';
import replaceDoubleSpace from '../common/replaceDoubleSpace';
import shouldBeArray from '../system/shouldBeArray';

function isHideQuests() {
  if (getValue('hideQuests')) {
    return shouldBeArray('hideQuestNames');
  }
  return [];
}

function doHideQuests(hideQuests, questName, aRow) {
  if (hideQuests.includes(questName)) {
    var target = aRow;
    hideElement(target);
    for (var i = 0; i < 3; i++) {
      target = target.nextElementSibling;
      hideElement(target);
    }
  }
}

function decorate(questsToHide, aRow) {
  var questName = replaceDoubleSpace(getTextTrim(aRow.cells[0]));
  doHideQuests(questsToHide, questName, aRow);
  var questID = /quest_id=(\d+)/.exec(aRow.cells[4].innerHTML)[1];
  aRow.cells[4].innerHTML = guideButtons(questID, questName);
}

export default function injectQuestRow(questTable) {
  var questsToHide = isHideQuests();
  arrayFrom(questTable.rows).filter(dataRows(5, 0))
    .forEach(partial(decorate, questsToHide));
}
