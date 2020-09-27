import { b as createDiv, i as insertElement, p as pCC } from './calfSystem-0ffc234f.js';
import './isChecked-9f10b428.js';
import { b as simpleCheckboxHtml } from './simpleCheckbox-9c1c931a.js';
import './hideElement-c8e0696f.js';
import './toggleForce-8f3fdd9b.js';
import { c as collapse } from './collapse-83b04891.js';

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
//# sourceMappingURL=hall-167e84de.js.map
