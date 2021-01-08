import getValue from '../../system/getValue';
import playerId from '../../common/playerId';
import { set } from '../../system/idb';
import setInnerHtml from '../../dom/setInnerHtml';
import shouldBeArray from '../../system/shouldBeArray';

let currentPlayerId;
let hideRecipes = [];

function itemImg(itm) {
  return '<div class="rmItem"><img class="tip-dynamic" '
    + `data-tipped="fetchitem.php?item_id=${
      itm.id}&inv_id=-1&t=2&p=${
      currentPlayerId}&vcode=${
      itm.verify}" src="${
      itm.img}" height="20px" width="20px"><p>${
      itm.amountPresent}/${
      itm.amountNeeded}</p></div>`;
}

function getRecipeItems(recipe) {
  if (recipe.items) {
    return recipe.items.map(itemImg).join('');
  }
  return '';
}

function componentImg(comp) {
  return '<div class="rmItem"><img class="tip-dynamic" '
    + `data-tipped="fetchitem.php?item_id=${
      comp.id}&inv_id=-1&t=2&p=${
      currentPlayerId}&vcode=${
      comp.verify}" src="${
      comp.img}" height="20px" width="20px"><p>${
      comp.amountPresent}/${
      comp.amountNeeded}</p></div>`;
}

function getComponents(recipe) {
  if (recipe.components) {
    return recipe.components.map(componentImg).join('');
  }
  return '';
}

function getImg(recipe) {
  if (recipe.target) {
    return ` <img class="tip-dynamic" data-tipped="fetchitem.php?item_id=${
      recipe.target.id}&inv_id=-1&t=2&p=${currentPlayerId}&vcode=${
      recipe.target.verify}" src="${
      recipe.target.img}" height="30px" width="30px"><br/>`;
  }
  return '';
}

function hidden(recipe) {
  return !hideRecipes.includes(recipe.name);
}

function makeRow(recipe) {
  return '<tr class="rmTr">'
      + '<td class="rmTd">'
        + `<a href="${recipe.link}">`
          + `<img src="${recipe.img}" height="30px" width="30px">`
        + '</a>'
      + '</td>'
      + '<td class="rmTd">'
        + `<a href="${recipe.link}">${recipe.name}</a>`
      + '</td>'
      + `<td class="rmTd">${getRecipeItems(recipe)}</td>`
      + `<td class="rmTd">${getComponents(recipe)}</td>`
      + `<td class="rmTd">${getImg(recipe)}</td>`
    + '</tr>';
}

function drawRecipeTable(output, recipebook) { // Legacy
  currentPlayerId = playerId();
  let result = '<table width="100%"><tr class="rmTh"><th>Recipe</th>'
    + '<th><span id="sortName" class="fshLink" sortkey="name">Name</span>'
    + '</th><th>Items</th><th>Components</th><th>Target</th></tr>';
  result += recipebook.recipe.filter(hidden).map(makeRow).join('');
  result += '</table>';
  setInnerHtml(result, output);
  set('fsh_recipeBook', recipebook);
}

export default function generateRecipeTable(output, recipebook) { // Legacy
  if (recipebook) {
    if (getValue('hideRecipes')) {
      hideRecipes = shouldBeArray('hideRecipeNames');
    }
    drawRecipeTable(output, recipebook);
  }
}
