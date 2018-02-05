import doSortParams from '../common/doSortParams';
import generateRecipeTable from './generateRecipeTable';
import getForage from '../ajax/getForage';
import {pCC} from '../support/layout';
import {gotRecipeBook, parseInventingStart, recipebook} from './parseInventing';
import {
  numberSort,
  stringSort
} from '../system/system';

export var content;

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
  generateRecipeTable();
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
  content = injector || pCC;
  getForage('fsh_recipeBook').done(gotRecipeBook);
  content.addEventListener('click', rmEvtHdl);
}
