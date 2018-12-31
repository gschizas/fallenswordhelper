import createDocument from '../../system/createDocument';
import {getElementById} from '../../common/getElement';
import getElementsByTagName from '../../common/getElementsByTagName';
import insertHtmlBeforeEnd from '../../common/insertHtmlBeforeEnd';
import partial from '../../common/partial';

var itmRE =
  /fetchitem.php\?item_id=(\d+)&inv_id=-1&t=2&p=(\d+)&vcode=([a-z0-9]+)/i;

function getTblCells(doc) {
  var tblCells = getElementsByTagName('td', getElementById('pCC', doc));
  return Array.from(tblCells);
}

function background(bgGif, el) {
  var bg = el.getAttribute('background');
  return bg && bg.includes(bgGif);
}

function splitMouseover(img) {
  var mouseOver = img.dataset.tipped;
  return mouseOver.match(itmRE);
}

function buildResult(img, mouseOverRX) {
  return {
    img: img.getAttribute('src'),
    id: mouseOverRX[1],
    verify: mouseOverRX[3]
  };
}

function hasAmounts(result, amounts) {
  if (amounts) {
    var resultAmounts = amounts.textContent.split('/');
    result.amountPresent = parseInt(resultAmounts[0], 10);
    result.amountNeeded = parseInt(resultAmounts[1], 10);
  }
}

function attribs(el) {
  var img = el.children[0].children[0];
  var mouseOverRX = splitMouseover(img);
  var result = buildResult(img, mouseOverRX);
  hasAmounts(result, el.parentNode.nextElementSibling);
  return result;
}

function parseRecipe(tblCells, bgGif) {
  return tblCells
    .filter(partial(background, bgGif))
    .map(attribs);
}

export default function processRecipe(output, recipebook, recipe, html) {
  var doc = createDocument(html);
  insertHtmlBeforeEnd(output,
    'Parsing blueprint ' + recipe.name + '...<br>');
  var tblCells = getTblCells(doc);
  recipe.items = parseRecipe(tblCells, '/inventory/2x3.gif');
  recipe.components = parseRecipe(tblCells, '/inventory/1x1mini.gif');
  recipe.target = parseRecipe(tblCells, '/hellforge/2x3.gif')[0];
  recipebook.recipe.push(recipe);
}
