import createDocument from '../system/createDocument';
import getCustomUrlParameter from '../system/getCustomUrlParameter';
import {getElementById} from '../common/getElement';
import insertHtmlBeforeEnd from '../common/insertHtmlBeforeEnd';
import retryAjax from '../ajax/retryAjax';

var itmRE =
  /fetchitem.php\?item_id=(\d+)&inv_id=-1&t=2&p=(\d+)&vcode=([a-z0-9]+)/i;

function hasAmounts(result, amounts) {
  if (amounts) {
    var resultAmounts = amounts.textContent.split('/');
    result.amountPresent = parseInt(resultAmounts[0], 10);
    result.amountNeeded = parseInt(resultAmounts[1], 10);
  }
}

function reduceItemOrComponent(bgGif, prev, el) {
  var background = el.getAttribute('background');
  if (!background || background.indexOf(bgGif) === -1) {return prev;}
  var img = el.children[0].children[0];
  var mouseOver = img.dataset.tipped;
  var mouseOverRX = mouseOver.match(itmRE);
  var result = {
    img: img.getAttribute('src'),
    id: mouseOverRX[1],
    verify: mouseOverRX[3]
  };
  hasAmounts(result, el.parentNode.nextElementSibling);
  prev.push(result);
  return prev;
}

function parseRecipeItemOrComponent(bgGif, doc) {
  var tblCells = getElementById('pCC', doc).getElementsByTagName('td');
  return Array.prototype.reduce.call(tblCells,
    reduceItemOrComponent.bind(null, bgGif), []);
}

function processRecipe(output, recipebook, recipe, data) {
  var doc = createDocument(data);
  insertHtmlBeforeEnd(output,
    'Parsing blueprint ' + recipe.name + '...<br>');
  recipe.items = parseRecipeItemOrComponent('/inventory/2x3.gif', doc);
  recipe.components = parseRecipeItemOrComponent('/inventory/1x1mini.gif', doc);
  recipe.target = parseRecipeItemOrComponent('/hellforge/2x3.gif', doc)[0];
  recipebook.recipe.push(recipe);
}

function processFolderAnyPage(output, recipebook, data) { // jQuery.min
  var doc = createDocument(data);
  var innerPcc = getElementById('pCC', doc);
  var scope = innerPcc.firstElementChild.rows[6].cells[0]
    .firstElementChild.getElementsByTagName('a');
  var prm = Array.prototype.reduce.call(scope, function(prev, el) {
    insertHtmlBeforeEnd(output,
      'Found blueprint "' + el.textContent + '".<br>');
    var recipe = {
      img: el.parentNode.previousElementSibling.firstElementChild
        .getAttribute('src'),
      link: el.href,
      name: el.textContent,
      id: getCustomUrlParameter(el.href, 'recipe_id')
    };
    prev.push(retryAjax(el.href)
      .pipe(processRecipe.bind(null, output, recipebook, recipe)));
    return prev;
  }, []);
  return $.when.apply($, prm);
}

function processFolderFirstPage(output, recipebook, data) { // jQuery.min
  var prm = [];
  var doc = createDocument(data);
  var innerPcc = getElementById('pCC', doc);
  var scope = innerPcc.firstElementChild.rows[4].cells[0]
    .firstElementChild.getElementsByTagName('img');
  var thisFolder = Array.prototype.filter.call(scope, function(el) {
    return /\/folder_on\.gif/.test(el.getAttribute('src'));
  })[0];
  var pages = innerPcc.getElementsByClassName('customselect')[0]
    .getElementsByTagName('option').length;
  for (var i = 1; i < pages; i += 1) {
    prm.push(retryAjax(thisFolder.parentNode.href + '&page=' + i)
      .pipe(processFolderAnyPage.bind(null, output, recipebook)));
  }
  prm.push($.when(data)
    .pipe(processFolderAnyPage.bind(null, output, recipebook)));
  return $.when.apply($, prm);
}

function reduceFolders(output, recipebook, prev, el) { // jQuery.min
  var href = el.parentNode.href;
  var folderName = el.parentNode.nextElementSibling.nextElementSibling
    .firstChild.textContent;
  if (getCustomUrlParameter(href, 'folder_id') === '-1') {
    return prev;
  }
  if (/quest/i.test(folderName)) {
    insertHtmlBeforeEnd(output, 'Skipping folder "' +
      folderName + '"  as it has the word "quest" in folder name.<br>');
    return prev;
  }
  prev.push(retryAjax(href)
    .pipe(processFolderFirstPage.bind(null, output, recipebook)));
  return prev;
}

export default function processFirstPage(output, recipebook, data) { // jQuery.min
  var doc = createDocument(data);
  var scope = getElementById('pCC', doc).firstElementChild.rows[4].cells[0]
    .firstElementChild.getElementsByTagName('img');
  var prm = Array.prototype.reduce.call(scope,
    reduceFolders.bind(null, output, recipebook), []);
  prm.push($.when(data)
    .pipe(processFolderFirstPage.bind(null, output, recipebook)));
  return $.when.apply($, prm);
}
