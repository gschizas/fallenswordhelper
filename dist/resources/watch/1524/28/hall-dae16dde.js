import { b as createDiv, i as insertElement, p as pCC } from './calfSystem-21d16a0e.js';
import './isChecked-12c32ad5.js';
import { b as simpleCheckboxHtml } from './simpleCheckbox-2103e041.js';
import './hideElement-c14a94c9.js';
import './toggleForce-10d35470.js';
import { c as collapse } from './collapse-d52d5e6a.js';

var css = ".fshHallPref {\r\n  position: absolute;\r\n  right: 1em;\r\n  top: 0.2em;\r\n}\r\n";
var modules_f2f10a1c = {};

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
//# sourceMappingURL=hall-dae16dde.js.map
