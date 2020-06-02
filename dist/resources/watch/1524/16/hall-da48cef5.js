import { b as createDiv, i as insertElement, p as pCC } from './calfSystem-6e4b53e3.js';
import './isChecked-aa4fe178.js';
import { b as simpleCheckboxHtml } from './simpleCheckbox-91bd42e6.js';
import './hideElement-2545b10e.js';
import './toggleForce-0d836f31.js';
import { c as collapse } from './collapse-8e04fd91.js';

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
//# sourceMappingURL=hall-da48cef5.js.map
