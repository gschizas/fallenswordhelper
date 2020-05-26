import { p as pCC, b as createDiv, i as insertElement } from './calfSystem-b469667c.js';
import './isChecked-81a663ed.js';
import { b as simpleCheckboxHtml } from './simpleCheckbox-6735e1ba.js';
import './hideElement-33e9906c.js';
import './toggleForce-e3c93179.js';
import { c as collapse } from './collapse-62822938.js';

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
//# sourceMappingURL=hall-3236414f.js.map
