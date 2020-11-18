import { b as createDiv, i as insertElement, p as pCC } from './calfSystem-b31646eb.js';
import './isChecked-92297855.js';
import { b as simpleCheckboxHtml } from './simpleCheckbox-223ccff0.js';
import './hideElement-a8c1e8d6.js';
import './toggleForce-68981a01.js';
import { c as collapse } from './collapse-74e40bcc.js';

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
//# sourceMappingURL=hall-1b4494a8.js.map
