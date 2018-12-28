import getUrlParameter from '../system/getUrlParameter';
import getValue from '../system/getValue';
import guideButtons from './guideButtons';
import insertHtmlBeforeEnd from '../common/insertHtmlBeforeEnd';
import {pCC} from '../support/layout';

export default function injectQuestTracker() {
  var lastActiveQuestPage = getValue('lastActiveQuestPage');
  if (lastActiveQuestPage.length > 0) {
    pCC.getElementsByTagName('a')[0]
      .setAttribute('href', lastActiveQuestPage);
  }
  var questID = getUrlParameter('quest_id');
  var injectHere = pCC.getElementsByTagName('td')[0];
  var questName = injectHere.getElementsByTagName('font')[1].textContent
    .replace(/"/g, '');
  insertHtmlBeforeEnd(injectHere, guideButtons(questID, questName));
}
