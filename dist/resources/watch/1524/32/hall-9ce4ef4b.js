import { c as collapse } from './collapse-87435051.js';
import { b as createDiv, i as insertElement, p as pCC } from './calfSystem-e64be67d.js';
import { b as simpleCheckboxHtml } from './simpleCheckbox-7e912406.js';
import './hideElement-7c48eb54.js';
import './toggleForce-d3228ccb.js';
import './isChecked-00f5c23d.js';

var css = ".fshHallPref {\n  position: absolute;\n  right: 1em;\n  top: 0.2em;\n}\n";
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
//# sourceMappingURL=hall-9ce4ef4b.js.map
