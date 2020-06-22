import { b as createDiv, i as insertElement, p as pCC } from './calfSystem-995e3482.js';
import './isChecked-8928b11e.js';
import { b as simpleCheckboxHtml } from './simpleCheckbox-4f133be1.js';
import './hideElement-26ab0eda.js';
import './toggleForce-d5149782.js';
import { c as collapse } from './collapse-b960b890.js';

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
//# sourceMappingURL=hall-fb12086d.js.map
