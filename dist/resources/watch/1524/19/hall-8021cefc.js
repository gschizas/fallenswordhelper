import { b as createDiv, i as insertElement, p as pCC } from './calfSystem-03895320.js';
import './isChecked-526af1cb.js';
import { b as simpleCheckboxHtml } from './simpleCheckbox-00a38d76.js';
import './hideElement-17927f8d.js';
import './toggleForce-01e59b03.js';
import { c as collapse } from './collapse-d90499ca.js';

var undefined$1 = undefined;

function testArticle(rowType) { return rowType === 1; }

function setupPref(prefName, injector) {
  const flDiv = createDiv({
    className: 'fshHallPref',
    innerHTML: simpleCheckboxHtml(prefName),
  });
  injector.classList.add('fshRelative');
  insertElement(injector, flDiv);
}

function guildHall() {
  const prefName = 'collapseHallPosts';
  const theTable = pCC.lastElementChild;
  if (theTable instanceof HTMLTableElement) {
    setupPref(prefName, theTable.previousElementSibling.previousElementSibling);
    collapse({
      prefName,
      theTable,
      headInd: 3,
      articleTest: testArticle,
    });
  }
}

export default guildHall;
//# sourceMappingURL=hall-8021cefc.js.map
