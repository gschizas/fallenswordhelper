import { b as createDiv, i as insertElement, p as pCC } from './calfSystem-c851a12c.js';
import './isChecked-4820f42a.js';
import { b as simpleCheckboxHtml } from './simpleCheckbox-39a4b647.js';
import './hideElement-891c9603.js';
import './toggleForce-a095aa43.js';
import { c as collapse } from './collapse-0a37db76.js';

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
//# sourceMappingURL=hall-99f4c096.js.map
