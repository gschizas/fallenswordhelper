import getElementsByTagName from '../common/getElementsByTagName';
import getUrlParameter from '../system/getUrlParameter';
import getValue from '../system/getValue';
import guideButtons from './guideButtons';
import insertHtmlBeforeEnd from '../common/insertHtmlBeforeEnd';
import {pCC} from '../support/layout';

export default function injectQuestTracker() {
  var lastActiveQuestPage = getValue('lastActiveQuestPage');
  if (lastActiveQuestPage.length > 0) {
    getElementsByTagName('a', pCC)[0]
      .setAttribute('href', lastActiveQuestPage);
  }
  var questID = getUrlParameter('quest_id');
  var injectHere = getElementsByTagName('td', pCC)[0];
  var questName = getElementsByTagName('font', injectHere)[1].textContent
    .replace(/"/g, '');
  insertHtmlBeforeEnd(injectHere, guideButtons(questID, questName));
}
