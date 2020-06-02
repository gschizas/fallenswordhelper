import { D as getValue, g as getElementsByTagName, p as pCC, A as getText, e as insertHtmlBeforeEnd, O as getUrlParameter } from './calfSystem-f6498976.js';
import { g as guideButtons } from './guideButtons-27c64e57.js';

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
//# sourceMappingURL=injectQuestTracker-b956fdb5.js.map
