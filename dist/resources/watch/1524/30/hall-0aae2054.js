import { b as createDiv, i as insertElement, p as pCC } from './calfSystem-d357ca6f.js';
import './isChecked-6167b36b.js';
import { b as simpleCheckboxHtml } from './simpleCheckbox-9f95c1f3.js';
import './hideElement-f7381055.js';
import './toggleForce-c034bc71.js';
import { c as collapse } from './collapse-cd6af20d.js';

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
//# sourceMappingURL=hall-0aae2054.js.map
