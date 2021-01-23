import { c as collapse } from './collapse-0cac8315.js';
import { b as createDiv, i as insertElement, p as pCC } from './calfSystem-91adbec8.js';
import { b as simpleCheckboxHtml } from './simpleCheckbox-d105d600.js';
import './hideElement-d4551277.js';
import './toggleForce-8e48254b.js';
import './isChecked-1c18cd61.js';

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
//# sourceMappingURL=hall-55e2f7d1.js.map
