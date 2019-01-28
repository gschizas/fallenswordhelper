import getElementsByTagName from '../common/getElementsByTagName';
import getText from '../common/getText';
import getUrlParameter from '../system/getUrlParameter';
import getValue from '../system/getValue';
import guideButtons from './guideButtons';
import insertHtmlBeforeEnd from '../common/insertHtmlBeforeEnd';
import {pCC} from '../support/layout';

function updateBackHref() {
  var lastActiveQuestPage = getValue('lastActiveQuestPage');
  if (lastActiveQuestPage.length > 0) {
    getElementsByTagName('a', pCC)[0].href = lastActiveQuestPage;
  }
}

function injectGuideButtons() {
  var injectHere = getElementsByTagName('td', pCC)[0];
  var questName = getText(getElementsByTagName('font', injectHere)[1])
    .replace(/"/g, '');
  insertHtmlBeforeEnd(injectHere,
    guideButtons(getUrlParameter('quest_id'), questName));
}

export default function injectQuestTracker() {
  updateBackHref();
  injectGuideButtons();
}
