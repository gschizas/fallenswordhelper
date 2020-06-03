import { b as createDiv, i as insertElement, p as pCC } from './calfSystem-940bc1b5.js';
import './isChecked-475781f3.js';
import { b as simpleCheckboxHtml } from './simpleCheckbox-0111405d.js';
import './hideElement-72d056da.js';
import './toggleForce-66dc2560.js';
import { c as collapse } from './collapse-56a84f72.js';

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
//# sourceMappingURL=hall-2b77f438.js.map
