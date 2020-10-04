import { b as createDiv, i as insertElement, p as pCC } from './calfSystem-975d976a.js';
import './isChecked-ed98077f.js';
import { b as simpleCheckboxHtml } from './simpleCheckbox-d4935e11.js';
import './hideElement-b0b3e820.js';
import './toggleForce-7e736fc3.js';
import { c as collapse } from './collapse-37291c78.js';

const css = ".fshHallPref {\r\n  position: absolute;\r\n  right: 1em;\r\n  top: 0.2em;\r\n}\r\n";
const modules_f2f10a1c = {};

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
//# sourceMappingURL=hall-e31f9d82.js.map
