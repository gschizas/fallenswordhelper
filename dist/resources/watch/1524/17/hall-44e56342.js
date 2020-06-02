import { b as createDiv, i as insertElement, p as pCC } from './calfSystem-f6498976.js';
import './isChecked-b18ca318.js';
import { b as simpleCheckboxHtml } from './simpleCheckbox-fe263785.js';
import './hideElement-a5a5f404.js';
import './toggleForce-da36c8d4.js';
import { c as collapse } from './collapse-ae4296f4.js';

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
//# sourceMappingURL=hall-44e56342.js.map
