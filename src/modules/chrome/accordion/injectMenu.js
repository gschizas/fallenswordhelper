import fromEntries from '../../common/fromEntries';
import getElementById from '../../common/getElement';
import getValue from '../../system/getValue';
import jQueryNotPresent from '../../common/jQueryNotPresent';
import navMenu from './navMenu';
import { pCL } from '../../support/layout';
import preFlight from './preFlight';
import theLinks from '../../settings/leftHandLinks.json';

function updateQuestLink() {
  const lastActiveQuestPage = getValue('lastActiveQuestPage');
  if (getValue('storeLastQuestPage') && lastActiveQuestPage.length > 0) {
    getElementById('nav-character-questbook').href = lastActiveQuestPage;
  }
}

function updateScavLink() {
  const lastScavPage = getValue('lastScavPage');
  if (getValue('storeLastScavPage') && lastScavPage.length > 0) {
    getElementById('nav-actions-artisanship-scavenging').href = lastScavPage;
  }
}

function updateLinks() {
  updateQuestLink();
  updateScavLink();
}

function getLinkConfig(theNav, myNav) {
  const linkConfig = theLinks.map((c) => [c, getValue(c)]);
  if (linkConfig.some(([, b]) => b)) {
    import('./injectItems')
      .then((m) => m.default(theNav, myNav, fromEntries(linkConfig)));
  }
}

function doAccordion() {
  const [theNav, myNav] = preFlight();
  if (theNav && myNav) {
    updateLinks();
    getLinkConfig(theNav, myNav);
    navMenu(myNav);
  }
}

export default function injectMenu() {
  if (!pCL || jQueryNotPresent()) { return; }
  doAccordion();
}
