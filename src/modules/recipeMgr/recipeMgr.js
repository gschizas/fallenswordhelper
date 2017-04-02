import calf from '../support/calf';
import * as ajax from '../support/ajax';
import * as layout from '../support/layout';
import * as system from '../support/system';

/* jshint latedef: nofunc */
var content;
var recipebook;
var currentFolder;
var hideRecipes = [];
var output;
var itmRE =
  /fetchitem.php\?item_id=(\d+)&inv_id=-1&t=2&p=(\d+)&vcode=([a-z0-9]+)/i;
var playerId;

function storeRecipeBook() {
  ajax.setForage('fsh_recipeBook', recipebook);
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

function getRecipeItems(recipe) {
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

function getComponents(recipe) {
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

function getImg(recipe) {
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
  document.getElementById('sortName')
    .addEventListener('click', sortRecipeTable);
}

function parseRecipeItemOrComponent(jqueryxpath, doc) { // jQuery
  var results = [];
  $(doc).find(jqueryxpath).each(function(i, e) {
    var mouseOver = $(e).find('img').data('tipped');
    var resultAmounts = $(e).parent().next().text();
    var mouseOverRX = mouseOver.match(itmRE);
    var result = {
      img: $(e).find('img').attr('src'),
      id: mouseOverRX[1],
      verify: mouseOverRX[3],
      amountPresent: parseInt(resultAmounts.split('/')[0], 10),
      amountNeeded: parseInt(resultAmounts.split('/')[1], 10)
    };
    results.push(result);
  });
  return results;
}

function parseRecipePage(responseText, callback) { // Legacy
  var doc = system.createDocument(responseText);
  var currentRecipeIndex = callback.recipeIndex;
  var recipe = recipebook.recipe[currentRecipeIndex];

  output.innerHTML += 'Parsing blueprint ' + recipe.name + '...<br/>';

  recipe.items = parseRecipeItemOrComponent(
    'td[background*="/inventory/2x3.gif"]', doc);
  recipe.components = parseRecipeItemOrComponent(
    'td[background*="/inventory/1x1mini.gif"]', doc);
  recipe.target = parseRecipeItemOrComponent(
    'td[background*="/hellforge/2x3.gif"]', doc)[0];

  var nextRecipeIndex = currentRecipeIndex + 1;
  if (nextRecipeIndex < recipebook.recipe.length) {
    var nextRecipe = recipebook.recipe[nextRecipeIndex];
    system.xmlhttp('index.php?cmd=inventing&subcmd=viewrecipe&recipe_id=' +
      nextRecipe.id, parseRecipePage,
      {recipeIndex: nextRecipeIndex});
  } else {
    output.innerHTML += 'Finished parsing ... formatting ...';
    recipebook.lastUpdate = new Date();
    storeRecipeBook();
    generateRecipeTable();
  }
}

function parseInventingPage(responseText, callback) { // Legacy
  var doc = system.createDocument(responseText);

  var folderIDs = []; // clear out the array before starting.
  $(doc).find('a[href*="index.php?cmd=inventing&folder_id="]')
    .each(function(i, e) {
      var folderID = Number(/folder_id=([-0-9]+)/
        .exec($(e).attr('href'))[1]);
      folderIDs.push(folderID);
    });

  var folderCount = folderIDs.length;
  var folderID = folderIDs[currentFolder - 1];
  var folderTextElement = $(doc).find(
    'a[href*="index.php?cmd=inventing&folder_id=' + folderID + '"]')
    .closest('td').text();

  var folderText = '';
  if (folderTextElement.length > 0) {
    folderText = folderTextElement;
  }
  var currentPage = callback.page;
  var pages = $(doc).find('select[name="page"]:first');
  var nextPage;
  if (folderText.search(/quest/i) === -1) {
    if (pages.length === 0) {return;}
    $(doc).find(
      'a[href*="index.php?cmd=inventing&subcmd=viewrecipe&recipe_id="]')
      .each(function(i, e) {
        var recipeLink = $(e).attr('href');
        var recipeId = parseInt(recipeLink.match(/recipe_id=(\d+)/i)[1], 10);
        var recipe = {
          img: $(e).closest('tr').find('img').attr('src'),
          link: recipeLink,
          name: $(e).text(),
          id: recipeId
        };
        output.innerHTML += 'Found blueprint: ' + recipe.name + '<br/>';
        recipebook.recipe.push(recipe);
      });

    nextPage = currentPage + 1;
    output.innerHTML += 'Parsing folder ' + currentFolder + ' ... Page ' +
      nextPage + '... <br/>';

  } else {
    output.innerHTML += 'Skipping folder ' + currentFolder +
      ' as it has the word "quest" in folder name.<br/>';
    nextPage = Number(pages.find('option:last').text());
  }
  if (nextPage <= Number(pages.find('option:last').text()) &&
      currentFolder !== folderCount ||
      currentFolder < folderCount) {
    if (nextPage === Number(pages.find('option:last').text()) &&
        currentFolder < folderCount) {
      nextPage = 0;
      folderID = folderIDs[currentFolder];
      currentFolder += 1;
    }
    system.xmlhttp(
      'index.php?cmd=inventing&page=' + nextPage + '&folder_id=' +
      folderID,
      parseInventingPage,
      {page: nextPage}
    );
  } else {
    output.innerHTML +=
      'Finished parsing ... Retrieving individual blueprints...<br/>';
    system.xmlhttp(
      'index.php?cmd=inventing&subcmd=viewrecipe&recipe_id=' +
      recipebook.recipe[0].id,
      parseRecipePage, {recipeIndex: 0});
  }
}

function parseInventingStart() { // Legacy
  recipebook = {};
  recipebook.recipe = [];
  output.innerHTML = '<br/>Parsing inventing screen ...<br/>';
  currentFolder = 1;
  system.xmlhttp('index.php?cmd=inventing&page=0',
    parseInventingPage, {page: 0});
}

function gotRecipeBook(data) { // Legacy
  recipebook = data;
  if (system.getValue('hideRecipes')) {
    hideRecipes = system.getValue('hideRecipeNames').split(',') || [];
  }
  content.innerHTML = '<table class="fshInvFilter"><thead><tr>' +
    '<th width="90%"><b>&nbsp;Recipe Manager</b></th>' +
    '<th width="10%" class="fshBtnBox">[' +
    '<span id="rfsh" class="fshLink">' +
    'Refresh</span>]</th>' +
    '</tr></thead></table>' +
    '<div id="fshOutput"></div>';
  output = document.getElementById('fshOutput');
  document.getElementById('rfsh')
    .addEventListener('click', parseInventingStart);
  if (!recipebook) {parseInventingStart();} else {generateRecipeTable();}
}

export function injectRecipeManager(injector) { // Legacy
  content = injector || layout.pCC;
  ajax.getForage('fsh_recipeBook').done(gotRecipeBook);
}
