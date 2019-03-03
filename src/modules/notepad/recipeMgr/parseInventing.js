import {createDiv} from '../../common/cElement';
import generateRecipeTable from './generateRecipeTable';
import indexAjaxData from '../../ajax/indexAjaxData';
import insertElement from '../../common/insertElement';
import insertHtmlBeforeEnd from '../../common/insertHtmlBeforeEnd';
import partial from '../../common/partial';
import processFirstPage from './processFirstPage';
import setForage from '../../ajax/setForage';

export var recipebook;
export var output;

function displayStuff() {
  insertHtmlBeforeEnd(output, 'Finished parsing ... formatting ...');
  setForage('fsh_recipeBook', recipebook);
  generateRecipeTable(output, recipebook);
}

export function parseInventingStart() { // jQuery.min
  recipebook = {};
  recipebook.recipe = [];
  output.innerHTML = '<br>Parsing inventing screen ...<br>';
  indexAjaxData({cmd: 'inventing'})
    .then(partial(processFirstPage, output, recipebook))
    .done(displayStuff);
}

export function gotRecipeBook(content, data) {
  recipebook = data;
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
    generateRecipeTable(output, recipebook);
  }
}
