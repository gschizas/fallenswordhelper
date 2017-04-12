import calf from '../support/calf';
import * as ajax from '../support/ajax';
import * as layout from '../support/layout';
import * as system from '../support/system';

var content;
var recipebook;
var hideRecipes = [];
var output;
var itmRE =
  /fetchitem.php\?item_id=(\d+)&inv_id=-1&t=2&p=(\d+)&vcode=([a-z0-9]+)/i;
var playerId;

function storeRecipeBook() { // Native
  ajax.setForage('fsh_recipeBook', recipebook);
}

function getRecipeItems(recipe) { // Native
  if (recipe.items) {
    return recipe.items.reduce(function(prev, itm) {
      return prev + '<div class="rmItem"><img class="tip-dynamic" ' +
        'data-tipped="fetchitem.php?item_id=' +
        itm.id + '&inv_id=-1&t=2&p=' +
        playerId + '&vcode=' +
        itm.verify + '" src="' +
        itm.img + '" height="20px" width="20px"><p>' +
        itm.amountPresent + '/' +
        itm.amountNeeded + '</p></div>';
    }, '');
  }
  return '';
}

function getComponents(recipe) { // Native
  if (recipe.components) {
    return recipe.components.reduce(function(prev, comp) {
      return prev + '<div class="rmItem"><img class="tip-dynamic" ' +
        'data-tipped="fetchitem.php?item_id=' +
        comp.id + '&inv_id=-1&t=2&p=' +
        playerId + '&vcode=' +
        comp.verify + '" src="' +
        comp.img + '" height="20px" width="20px"><p>' +
        comp.amountPresent + '/' +
        comp.amountNeeded + '</p></div>';
    }, '');
  }
  return '';
}

function getImg(recipe) { // Native
  if (recipe.target) {
    return ' <img class="tip-dynamic" ' +
      'data-tipped="fetchitem.php?item_id=' +
      recipe.target.id + '&inv_id=-1&t=2&p=' + playerId +
      '&vcode=' + recipe.target.verify + '" ' +
      'src="' + recipe.target.img +
      '" height="30px" width="30px"><br/>';
  }
  return '';
}

function generateRecipeTable() { // Legacy
  if (!recipebook) {return;}
  playerId = layout.playerId();
  var i;
  var result = '<table width="100%"><tr class="rmTh"><th>Recipe</th>' +
    '<th><span id="sortName" class="fshLink" sortkey="name">Name</span>' +
    '</th><th>Items</th><th>Components</th><th>Target</th></tr>';
  var recipe;
  for (i = 0; i < recipebook.recipe.length; i += 1) {
    recipe = recipebook.recipe[i];
    if (hideRecipes.indexOf(recipe.name) !== -1) {continue;}
    result += '<tr class="rmTr"><td class="rmTd"><a href="' + recipe.link +
      '"><img src="' + recipe.img +
      '" height="30px" width="30px"></a></td><td class="rmTd"><a href="' +
      recipe.link + '">' + recipe.name + '</a></td><td class="rmTd">';
    result += getRecipeItems(recipe);
    result += '</td><td class="rmTd">';
    result += getComponents(recipe);
    result += '</td><td class="rmTd">';
    result += getImg(recipe);
    result += '</td></tr>';
  }
  result += '</table>';
  output.innerHTML = result;
  recipebook.lastUpdate = new Date();
  storeRecipeBook(); // Why? storing the sorted data?
}

function sortRecipeTable(evt) { // Legacy
  var headerClicked = evt.target.getAttribute('sortKey');
  var sortType = evt.target.getAttribute('sorttype');
  if (!sortType) {sortType = 'string';}
  sortType = sortType.toLowerCase();
  if (typeof calf.sortAsc === 'undefined') {calf.sortAsc = true;}
  if (calf.sortBy && calf.sortBy === headerClicked) {
    calf.sortAsc = !calf.sortAsc;
  }
  calf.sortBy = headerClicked;
  switch (sortType) {
  case 'number':
    recipebook.recipe.sort(system.numberSort);
    break;
  default:
    recipebook.recipe.sort(system.stringSort);
    break;
  }
  generateRecipeTable();
}

function reduceItemOrComponent(bgGif, prev, el) { // Native
  var background = el.getAttribute('background');
  if (!background || background.indexOf(bgGif) === -1) {return prev;}
  var img = el.children[0].children[0];
  var mouseOver = img.getAttribute('data-tipped');
  var mouseOverRX = mouseOver.match(itmRE);
  var result = {
    img: img.getAttribute('src'),
    id: mouseOverRX[1],
    verify: mouseOverRX[3]
  };
  var amounts = el.parentNode.nextElementSibling;
  if (amounts) {
    var resultAmounts = amounts.textContent.split('/');
    result.amountPresent = parseInt(resultAmounts[0], 10);
    result.amountNeeded = parseInt(resultAmounts[1], 10);
  }
  prev.push(result);
  return prev;
}

function parseRecipeItemOrComponent(bgGif, doc) { // Native
  var tblCells = doc.getElementById('pCC').getElementsByTagName('td');
  return Array.prototype.reduce.call(tblCells,
    reduceItemOrComponent.bind(null, bgGif), []);
}

function processRecipe(recipe, data) { // Native
  var doc = system.createDocument(data);
  output.insertAdjacentHTML('beforeend',
    'Parsing blueprint ' + recipe.name + '...<br>');
  recipe.items = parseRecipeItemOrComponent('/inventory/2x3.gif', doc);
  recipe.components = parseRecipeItemOrComponent('/inventory/1x1mini.gif', doc);
  recipe.target = parseRecipeItemOrComponent('/hellforge/2x3.gif', doc)[0];
  recipebook.recipe.push(recipe);
}

function processFolderAnyPage(data) { // jQuery.min
  var doc = system.createDocument(data);
  var pCC = doc.getElementById('pCC');
  var scope = pCC.firstElementChild.rows[6].cells[0]
    .firstElementChild.getElementsByTagName('a');
  var prm = Array.prototype.reduce.call(scope, function(prev, el) {
    output.insertAdjacentHTML('beforeend',
      'Found blueprint "' + el.textContent + '".<br>');
    var recipe = {
      img: el.parentNode.previousElementSibling.firstElementChild
        .getAttribute('src'),
      link: el.href,
      name: el.textContent,
      id: system.getCustomUrlParameter(el.href, 'recipe_id')
    };
    prev.push($.get(el.href).pipe(processRecipe.bind(null, recipe)));
    return prev;
  }, []);
  return $.when.apply($, prm);
}

function processFolderFirstPage(data) { // jQuery.min
  var prm = [];
  var doc = system.createDocument(data);
  var pCC = doc.getElementById('pCC');
  var scope = pCC.firstElementChild.rows[4].cells[0]
    .firstElementChild.getElementsByTagName('img');
  var thisFolder = Array.prototype.filter.call(scope, function(el) {
    return /\/folder_on\.gif/.test(el.getAttribute('src'));
  })[0];
  var pages = pCC.getElementsByClassName('customselect')[0]
    .getElementsByTagName('option').length;
  for (var i = 1; i < pages; i += 1) {
    prm.push($.get(thisFolder.parentNode.href + '&page=' + i)
      .pipe(processFolderAnyPage));
  }
  prm.push($.when(data).pipe(processFolderAnyPage));
  return $.when.apply($, prm);
}

function reduceFolders(prev, el) { // jQuery.min
  var href = el.parentNode.getAttribute('href');
  var folderName = el.parentNode.nextElementSibling.nextElementSibling
    .firstChild.textContent;
  if (system.getCustomUrlParameter(href, 'folder_id') === '-1') {
    return prev;
  }
  if (/quest/i.test(folderName)) {
    output.insertAdjacentHTML('beforeend', 'Skipping folder "' +
      folderName + '"  as it has the word "quest" in folder name.<br>');
    return prev;
  }
  prev.push($.get(href).pipe(processFolderFirstPage));
  return prev;
}

function processFirstPage(data) { // jQuery.min
  var doc = system.createDocument(data);
  var scope = doc.getElementById('pCC').firstElementChild.rows[4].cells[0]
    .firstElementChild.getElementsByTagName('img');
  var prm = Array.prototype.reduce.call(scope, reduceFolders, []);
  prm.push($.when(data).pipe(processFolderFirstPage));
  return $.when.apply($, prm);
}

function displayStuff() { // Native
  output.insertAdjacentHTML('beforeend', 'Finished parsing ... formatting ...');
  storeRecipeBook();
  generateRecipeTable();
}

function parseInventingStart() { // jQuery.min
  recipebook = {};
  recipebook.recipe = [];
  output.innerHTML = '<br>Parsing inventing screen ...<br>';
  $.get('index.php?cmd=inventing').pipe(processFirstPage).done(displayStuff);
}

function gotRecipeBook(data) { // Native
  recipebook = data;
  if (system.getValue('hideRecipes')) {
    hideRecipes = system.shouldBeArray('hideRecipeNames');
  }
  content.innerHTML = '<table class="fshInvFilter"><thead><tr>' +
    '<th width="90%"><b>&nbsp;Recipe Manager</b></th>' +
    '<th width="10%" class="fshBtnBox">[' +
    '<span id="rfsh" class="fshLink">' +
    'Refresh</span>]</th>' +
    '</tr></thead></table>';
  output = document.createElement('div');
  content.insertAdjacentElement('beforeend', output);
  if (!recipebook) {
    parseInventingStart();
  } else {
    generateRecipeTable();
  }
}

function rmEvtHdl(evt) { // Native
  if (evt.target.id === 'rfsh') {
    parseInventingStart();
  }
  if (evt.target.id === 'sortName') {
    sortRecipeTable(evt);
  }
}

export function injectRecipeManager(injector) { // jQuery.min
  content = injector || layout.pCC;
  ajax.getForage('fsh_recipeBook').done(gotRecipeBook);
  content.addEventListener('click', rmEvtHdl);
}
