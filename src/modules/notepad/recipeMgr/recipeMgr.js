import doSortParams from '../../common/doSortParams';
import generateRecipeTable from './generateRecipeTable';
import getForage from '../../ajax/getForage';
import jQueryNotPresent from '../../common/jQueryNotPresent';
import numberSort from '../../system/numberSort';
import on from '../../common/on';
import {pCC} from '../../support/layout';
import partial from '../../common/partial';
import stringSort from '../../system/stringSort';
import {
  gotRecipeBook,
  output,
  parseInventingStart,
  recipebook
} from './parseInventing';

function testSortType(evt) {
  var sortType = evt.target.getAttribute('sorttype');
  if (!sortType) {sortType = 'string';}
  sortType = sortType.toLowerCase();
  return sortType;
}

function sortRecipeBook(sortType) {
  if (sortType === 'number') {
    recipebook.recipe.sort(numberSort);
  } else {
    recipebook.recipe.sort(stringSort);
  }
}

function sortRecipeTable(evt) { // Legacy
  doSortParams(evt.target.getAttribute('sortKey'));
  var sortType = testSortType(evt);
  sortRecipeBook(sortType);
  generateRecipeTable(output, recipebook);
}

function rmEvtHdl(evt) {
  if (evt.target.id === 'rfsh') {
    parseInventingStart();
  }
  if (evt.target.id === 'sortName') {
    sortRecipeTable(evt);
  }
}

export default function injectRecipeManager(injector) { // jQuery.min
  if (jQueryNotPresent()) {return;}
  var content = injector || pCC;
  getForage('fsh_recipeBook').done(partial(gotRecipeBook, content));
  on(content, 'click', rmEvtHdl);
}
