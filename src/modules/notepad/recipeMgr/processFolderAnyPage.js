import createDocument from '../../system/createDocument';
import getArrayByTagName from '../../common/getArrayByTagName';
import getCustomUrlParameter from '../../system/getCustomUrlParameter';
import {getElementById} from '../../common/getElement';
import insertHtmlBeforeEnd from '../../common/insertHtmlBeforeEnd';
import partial from '../../common/partial';
import processRecipe from './processRecipe';
import retryAjax from '../../ajax/retryAjax';

function recipeAry(doc) {
  var innerPcc = getElementById('pCC', doc);
  var scope = innerPcc.children[0].rows[6].cells[0].children[0];
  return getArrayByTagName('a', scope);
}

function makeRecipe(el) {
  return {
    img: el.parentNode.previousElementSibling.children[0].getAttribute('src'),
    link: el.href,
    name: el.textContent,
    id: getCustomUrlParameter(el.href, 'recipe_id')
  };
}

function getRecipe(output, recipebook, el) {
  insertHtmlBeforeEnd(output, 'Found blueprint "' + el.textContent + '".<br>');
  var recipe = makeRecipe(el);
  return retryAjax(el.href)
    .pipe(partial(processRecipe, output, recipebook, recipe));
}

export default function processFolderAnyPage(output, recipebook, html) { // jQuery.min
  var doc = createDocument(html);
  var prm = recipeAry(doc).map(partial(getRecipe, output, recipebook));
  return $.when.apply($, prm);
}
