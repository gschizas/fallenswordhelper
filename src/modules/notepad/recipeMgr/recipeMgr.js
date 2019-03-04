import doSortParams from '../../common/doSortParams';
import generateRecipeTable from './generateRecipeTable';
import getForage from '../../ajax/getForage';
import jQueryNotPresent from '../../common/jQueryNotPresent';
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

function sortRecipeTable(evt) { // Legacy
  doSortParams(evt.target);
  recipebook.recipe.sort(stringSort);
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
  getForage('fsh_recipeBook').then(partial(gotRecipeBook, content));
  on(content, 'click', rmEvtHdl);
}
