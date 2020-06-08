import { b as createDiv, i as insertElement, p as pCC } from './calfSystem-c0288c6c.js';
import './isChecked-1ec16a19.js';
import { b as simpleCheckboxHtml } from './simpleCheckbox-988113ef.js';
import './hideElement-d4dcbc7c.js';
import './toggleForce-7b2b5e52.js';
import { c as collapse } from './collapse-ec3df87e.js';

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
//# sourceMappingURL=hall-3edc89b6.js.map
