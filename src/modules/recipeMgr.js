import calf from './support/calf';
import system from './support/system';
import layout from './support/layout';

/* jshint latedef: nofunc */
var recipebook;

function sortRecipeTable(evt) { // Legacy
  recipebook = system.getValueJSON('recipebook');
  var headerClicked = evt.target.getAttribute('sortKey');
  var sortType = evt.target.getAttribute('sorttype');
  if (!sortType) {sortType='string';}
  sortType = sortType.toLowerCase();
  if (calf.sortAsc === undefined) {calf.sortAsc = true;}
  if (calf.sortBy && calf.sortBy===headerClicked) {
    calf.sortAsc=!calf.sortAsc;
  }
  calf.sortBy=headerClicked;
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

function generateRecipeTable() { // Legacy
  var i;
  var j;
  var output=document.getElementById('Helper:RecipeManagerOutput');
  var result='<table id="Helper:RecipeTable" width="100%"><tr>' +
    '<th align="left" colspan="2" sortkey="name">Name</th>' +
    '<th align="left">Items</th>' +
    '<th align="left">Components</th>' +
    '<th align="left">Target</th>' +
    '</tr>';
  if (!recipebook) {return;}

  var hideRecipes=[];
  if (system.getValue('hideRecipes')) {
    hideRecipes=system.getValue('hideRecipeNames').split(',');
  }

  var recipe;
  var c=0;
  for (i = 0; i < recipebook.recipe.length; i += 1) {
    recipe = recipebook.recipe[i];
    c+= 1;

    if (hideRecipes.indexOf(recipe.name) === -1) {
      result+='<tr class="HelperTableRow'+(1+c % 2)+'" valign="middle">' +
        '<td style="border-bottom:1px solid #CD9E4B;"><a href="' +
        recipe.link + '"><img border="0" align="middle" src="' +
        recipe.img + '"/></a></td>' +
        '<td style="border-bottom:1px solid #CD9E4B;"><a href="' +
        recipe.link + '">' + recipe.name + '</a></td>';
      result += '<td style="border-bottom:1px solid #CD9E4B;">';
      if (recipe.items) {
        for (j=0; j<recipe.items.length; j += 1) {
          result += recipe.items[j].amountPresent + '/' +
            recipe.items[j].amountNeeded +
            ' <img border="0" align="middle" class="tip-dynamic" ' +
            'data-tipped="fetchitem.php?item_id=' +
            recipe.items[j].id + '&inv_id=-1&t=2&p=' +
            layout.playerId() + '&vcode=' + recipe.items[j].verify +
            '" ' +
            'src="' + recipe.items[j].img + '"/><br/>';
        }
      }
      result += '</td>';
      result += '<td style="border-bottom:1px solid #CD9E4B;">';
      if (recipe.components) {
        for (j=0; j<recipe.components.length; j += 1) {
          result += recipe.components[j].amountPresent + '/' +
          recipe.components[j].amountNeeded +
            ' <img border="0" align="middle" class="tip-dynamic" ' +
            'data-tipped="fetchitem.php?item_id=' +
            recipe.components[j].id + '&inv_id=-1&t=2&p=' +
            layout.playerId() + '&vcode=' +
            recipe.components[j].verify + '" ' +
            'src="' + recipe.components[j].img + '"/><br/>';
        }
      }
      result += '</td>';
      result += '<td style="border-bottom:1px solid #CD9E4B;">';
      if (recipe.target) {
        result +=' <img border="0" align="middle" class="tip-dynamic" ' +
            'data-tipped="fetchitem.php?item_id=' +
            recipe.target.id + '&inv_id=-1&t=2&p=' + layout.playerId() +
            '&vcode=' + recipe.target.verify + '" ' +
            'src="' + recipe.target.img + '"/><br/>';
      }
      result += '</td>';
      result += '</tr>';
    }
  }
  result+='</table>';
  output.innerHTML=result;

  recipebook.lastUpdate = new Date();
  system.setValueJSON('recipebook', recipebook);

  var recipeTable=document.getElementById('Helper:RecipeTable');
  for (i=0; i<recipeTable.rows[0].cells.length; i += 1) {
    var cell=recipeTable.rows[0].cells[i];
    if (cell.getAttribute('sortkey')) {
      cell.style.textDecoration='underline';
      cell.style.cursor='pointer';
      cell.addEventListener('click', sortRecipeTable, true);
    }
  }
}

function parseRecipeItemOrComponent(jqueryxpath, doc) { // jQuery
  var results = [];
  $(doc).find(jqueryxpath).each(function(){
    var mouseOver = $(this).find('img').data('tipped');
    var resultAmounts = $(this).parent().next().text();
    var mouseOverRX = mouseOver.match(/fetchitem.php\?item_id=(\d+)\&inv_id=-1\&t=2\&p=(\d+)\&vcode=([a-z0-9]+)/i);
    var result = {
      img: $(this).find('img').attr('src'),
      id: mouseOverRX[1],
      verify: mouseOverRX[3],
      amountPresent: parseInt(resultAmounts.split('/')[0],10),
      amountNeeded: parseInt(resultAmounts.split('/')[1],10)
    };
    results.push(result);
  });
  return results;
}

function parseRecipePage(responseText, callback) { // Legacy
  var doc=system.createDocument(responseText);
  var output=document.getElementById('Helper:RecipeManagerOutput');
  var currentRecipeIndex = callback.recipeIndex;
  var recipe = recipebook.recipe[currentRecipeIndex];

  output.innerHTML+='Parsing blueprint ' + recipe.name +'...<br/>';

  recipe.items = parseRecipeItemOrComponent('td[background*="/inventory/2x3.gif"]', doc);
  recipe.components = parseRecipeItemOrComponent('td[background*="/inventory/1x1mini.gif"]', doc);
  recipe.target = parseRecipeItemOrComponent('td[background*="/hellforge/2x3.gif"]', doc)[0];

  var nextRecipeIndex = currentRecipeIndex+1;
  if (nextRecipeIndex < recipebook.recipe.length) {
    var nextRecipe = recipebook.recipe[nextRecipeIndex];
    system.xmlhttp('index.php?cmd=inventing&subcmd=viewrecipe&recipe_id=' +
      nextRecipe.id, parseRecipePage,
      {'recipeIndex': nextRecipeIndex});
  }
  else {
    output.innerHTML+='Finished parsing ... formatting ...';
    recipebook.lastUpdate = new Date();
    system.setValueJSON('recipebook', recipebook);
    generateRecipeTable();
  }
}

function parseInventingPage(responseText, callback) { // Legacy
  var doc=system.createDocument(responseText);

  var folderIDs = [];
  calf.folderIDs = folderIDs; //clear out the array before starting.
  var currentFolder = system.getValue('currentFolder');
  $(doc).find('a[href*="index.php?cmd=inventing&folder_id="]')
    .each(function(){
    var folderID = /folder_id=([-0-9]+)/.exec($(this).attr('href'))[1]*1;
    folderIDs.push(folderID);
    calf.folderIDs = folderIDs;
  });

  var folderCount = calf.folderIDs.length;
  var folderID = calf.folderIDs[currentFolder-1];
  var folderTextElement = $(doc).find(
    'a[href*="index.php?cmd=inventing&folder_id=' + folderID + '"]')
    .closest('td').text();

  var folderText = '';
  if (folderTextElement.length > 0) {
    folderText = folderTextElement;
  }
  var output=document.getElementById('Helper:RecipeManagerOutput');
  var currentPage = callback.page;
  var pages = $(doc).find('select[name="page"]:first');
  var nextPage;
  if (folderText.search(/quest/i) === -1) {
    if (pages.length === 0) {return;}
    $(doc).find(
      'a[href*="index.php?cmd=inventing&subcmd=viewrecipe&recipe_id="]')
      .each(function(){
      var recipeLink = $(this).attr('href');
      var recipeId = parseInt(recipeLink.match(/recipe_id=(\d+)/i)[1],10);
      var recipe={
        'img': $(this).closest('tr').find('img').attr('src'),
        'link': recipeLink,
        'name': $(this).text(),
        'id': recipeId};
      output.innerHTML+='Found blueprint: '+ recipe.name + '<br/>';
      recipebook.recipe.push(recipe);
    });

    nextPage=currentPage+1;
    output.innerHTML += 'Parsing folder '+ currentFolder + ' ... Page ' +
      nextPage + '... <br/>';

  } else {
    output.innerHTML += 'Skipping folder '+ currentFolder +
      ' as it has the word "quest" in folder name.<br/>';
    nextPage = pages.find('option:last').text()*1;
  }
  if (nextPage<=pages.find('option:last').text()*1 &&
      currentFolder!==folderCount || currentFolder<folderCount) {
    if (nextPage===pages.find('option:last').text()*1 &&
        currentFolder<folderCount) {
      nextPage = 0;
      folderID = calf.folderIDs[currentFolder];
      system.setValue('currentFolder', currentFolder+1);
    }
    system.xmlhttp(
      'index.php?cmd=inventing&page=' + nextPage + '&folder_id=' +
      folderID,
      parseInventingPage,
      {'page': nextPage}
    );
  }
  else {
    output.innerHTML+=
      'Finished parsing ... Retrieving individual blueprints...<br/>';
    system.xmlhttp(
      'index.php?cmd=inventing&subcmd=viewrecipe&recipe_id=' +
      recipebook.recipe[0].id,
      parseRecipePage, {'recipeIndex': 0});
  }
}

function parseInventingStart(){ // Legacy
  recipebook = {};
  recipebook.recipe = [];
  var output=document.getElementById('Helper:RecipeManagerOutput');
  output.innerHTML='<br/>Parsing inventing screen ...<br/>';
  var currentFolder = 1;
  system.setValue('currentFolder', currentFolder);
  system.xmlhttp('index.php?cmd=inventing&page=0',
    parseInventingPage, {'page': 0});
}

function injectRecipeManager(content) { // Legacy
  if (!content) {content = layout.notebookContent();}
  recipebook = system.getValueJSON('recipebook');
  content.innerHTML='<table cellspacing="0" cellpadding="0" border="0" ' +
    'width="100%"><tr style="background-color:#cd9e4b">'+
    '<td width="90%" nobr><b>&nbsp;Recipe Manager</b></td>'+
    '<td width="10%" nobr style="font-size:x-small;text-align:right">[' +
    '<span id="Helper:RecipeManagerRefresh" style="text-decoration:' +
    'underline;cursor:pointer">Refresh</span>]</td>'+
    '</tr>' +
    '</table>' +
    '<div style="font-size:small;" id="Helper:RecipeManagerOutput">' +
    '' +
    '</div>';
  if (!recipebook) {parseInventingStart();}
  document.getElementById('Helper:RecipeManagerRefresh')
    .addEventListener('click', parseInventingStart, true);
  generateRecipeTable();
}

export default {injectRecipeManager: injectRecipeManager};
