import { b as createDiv, i as insertElement, p as pCC } from './calfSystem-2b1fed3f.js';
import './isChecked-8ee9db43.js';
import { b as simpleCheckboxHtml } from './simpleCheckbox-992e10fe.js';
import './hideElement-48576eeb.js';
import './toggleForce-7d757ba6.js';
import { c as collapse } from './collapse-8c48d1b9.js';

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
//# sourceMappingURL=hall-c3a82c57.js.map
