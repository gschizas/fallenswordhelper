import { p as pCC, e as createDiv, i as insertElement } from './calfSystem-cb5d894f.js';
import './isChecked-fd1c90ff.js';
import { b as simpleCheckboxHtml } from './simpleCheckbox-40db1ca3.js';
import { c as collapse } from './collapse-058f8e25.js';

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
//# sourceMappingURL=hall-0c9c5e2e.js.map
