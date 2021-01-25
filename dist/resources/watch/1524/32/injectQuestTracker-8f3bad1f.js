import { H as getValue, g as getElementsByTagName, p as pCC, B as getText, f as insertHtmlBeforeEnd, S as getUrlParameter } from './calfSystem-e64be67d.js';
import { g as guideButtons } from './guideButtons-86443012.js';

function updateBackHref() {
  const lastActiveQuestPage = getValue('lastActiveQuestPage');
  if (lastActiveQuestPage.length > 0) {
    getElementsByTagName('a', pCC)[0].href = lastActiveQuestPage;
  }
}

function injectGuideButtons() {
  const injectHere = getElementsByTagName('td', pCC)[0];
  const questName = getText(getElementsByTagName('font', injectHere)[1])
    .replace(/"/g, '');
  insertHtmlBeforeEnd(injectHere,
    guideButtons(getUrlParameter('quest_id'), questName));
}

function injectQuestTracker() {
  updateBackHref();
  injectGuideButtons();
}

export default injectQuestTracker;
//# sourceMappingURL=injectQuestTracker-8f3bad1f.js.map
