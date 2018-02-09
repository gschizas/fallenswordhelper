import {content} from './recipeMgr';
import {createDiv} from '../common/cElement';
import generateRecipeTable from './generateRecipeTable';
import insertElement from '../common/insertElement';
import processFirstPage from './processFirstPage';
import retryAjax from '../ajax/retryAjax';
import setForage from '../ajax/setForage';

export var recipebook;
export var output;

export function storeRecipeBook() {
  setForage('fsh_recipeBook', recipebook);
}

function displayStuff() {
  output.insertAdjacentHTML('beforeend', 'Finished parsing ... formatting ...');
  storeRecipeBook();
  generateRecipeTable();
}

export function parseInventingStart() { // jQuery.min
  recipebook = {};
  recipebook.recipe = [];
  output.innerHTML = '<br>Parsing inventing screen ...<br>';
  retryAjax('index.php?no_mobile=1&cmd=inventing').pipe(processFirstPage)
    .done(displayStuff);
}

export function gotRecipeBook(data) {
  recipebook = data;
  // if (getValue('hideRecipes')) {
  //   hideRecipes = shouldBeArray('hideRecipeNames');
  // }
  content.innerHTML = '<table class="fshInvFilter"><thead><tr>' +
    '<th width="90%"><b>&nbsp;Recipe Manager</b></th>' +
    '<th width="10%" class="fshBtnBox">[' +
    '<span id="rfsh" class="fshLink">' +
    'Refresh</span>]</th>' +
    '</tr></thead></table>';
  output = createDiv();
  insertElement(content, output);
  if (!recipebook) {
    parseInventingStart();
  } else {
    generateRecipeTable();
  }
}
