import {playerId} from '../support/layout';
import {
  getValue,
  shouldBeArray
} from '../system/system';
import {output, recipebook, storeRecipeBook} from './parseInventing';

var currentPlayerId;
var hideRecipes = [];

function getRecipeItems(recipe) {
  if (recipe.items) {
    return recipe.items.reduce(function(prev, itm) {
      return prev + '<div class="rmItem"><img class="tip-dynamic" ' +
        'data-tipped="fetchitem.php?item_id=' +
        itm.id + '&inv_id=-1&t=2&p=' +
        currentPlayerId + '&vcode=' +
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
        currentPlayerId + '&vcode=' +
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
      recipe.target.id + '&inv_id=-1&t=2&p=' + currentPlayerId +
      '&vcode=' + recipe.target.verify + '" ' +
      'src="' + recipe.target.img +
      '" height="30px" width="30px"><br/>';
  }
  return '';
}

function drawRecipeTable() { // Legacy
  currentPlayerId = playerId();
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
  storeRecipeBook();
}

export default function generateRecipeTable() { // Legacy
  if (recipebook) {
    if (getValue('hideRecipes')) {
      hideRecipes = shouldBeArray('hideRecipeNames');
    }
    drawRecipeTable();
  }
}
