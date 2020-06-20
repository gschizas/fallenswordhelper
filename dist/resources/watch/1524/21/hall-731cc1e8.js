import { b as createDiv, i as insertElement, p as pCC } from './calfSystem-b0234231.js';
import './isChecked-87a17fbe.js';
import { b as simpleCheckboxHtml } from './simpleCheckbox-82bb0abc.js';
import './hideElement-61e7789b.js';
import './toggleForce-5e7cbd72.js';
import { c as collapse } from './collapse-05ce6015.js';

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
//# sourceMappingURL=hall-731cc1e8.js.map
