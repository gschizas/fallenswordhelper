import './hall.postcss';
import collapse from '../../common/collapse';
import {createDiv} from '../../common/cElement';
import insertElement from '../../common/insertElement';
import {pCC} from '../../support/layout';
import {simpleCheckboxHtml} from '../../settings/simpleCheckbox';

function testArticle(rowType) {return rowType === 1;}

function setupPref(prefName, injector) {
  var flDiv = createDiv({
    className: 'fshHallPref',
    innerHTML: simpleCheckboxHtml(prefName)
  });
  injector.classList.add('fshRelative');
  insertElement(injector, flDiv);
}

export default function guildHall() {
  var prefName = 'collapseHallPosts';
  var theTable = pCC.lastElementChild;
  if (theTable instanceof HTMLTableElement) {
    setupPref(prefName, theTable.previousElementSibling.previousElementSibling);
    collapse({
      prefName: prefName,
      theTable: theTable,
      headInd: 3,
      articleTest: testArticle
    });
  }
}
