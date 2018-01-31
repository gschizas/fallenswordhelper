import {createTd} from './common/cElement';
import doinvent from './app/inventing/doinvent';
import {getElementById} from './common/getElement';
import {guideUrl} from './support/dataObj';
import jsonFail from './common/jsonFail';
import outputResult from './common/outputResult';
import {fallback, findNode, findNodes, server, xmlhttp} from './support/system';

var itemRE = /<b>([^<]+)<\/b>/i;
var plantFromComponentHash = {
  'Amber Essense': 'Amber Plant',
  'Blood Bloom Flower': 'Blood Bloom Plant',
  'Dark Shade ': 'Dark Shade Plant',
  'Snake Eye': 'Elya Snake Head',
  'Snake Venom Fang': 'Elya Snake Head',
  'Heffle Wart': 'Heffle Wart Plant',
  'Jademare Blossom': 'Jademare Plant',
  'Trinettle Leaf': 'Trinettle Plant',
  'Purplet Flower': 'Purplet Plant',
};

function quickInventDone(json) {
  var inventResult = getElementById('invent_Result');
  if (jsonFail(json, inventResult)) {return;}
  if (json.r.success) {
    outputResult('<span class="fshGreen">' +
      'You successfully invented the item!</span>', inventResult);
  } else {
    outputResult('<span class="fshRed">' +
      'You have failed to invent the item.</span>', inventResult);
  }
}

function quickInvent() { // Legacy
  var amountToInvent = $('#invent_amount').attr('value');
  var recipeID = $('input[name="recipe_id"]').attr('value');
  $('#invet_Result_label').html('Inventing ' + amountToInvent + ' Items');
  for (var i = 0; i < amountToInvent; i += 1) {
    doinvent(recipeID).done(quickInventDone);
  }
}

function injectInvent() { // Bad jQuery
  var selector = '<tr><td align="center">Select how many to quick ' +
    'invent<input value=1 id="invent_amount" name="invent_amount" ' +
    'size=3 class="custominput"></td></tr>' +
    '<tr><td align="center"><input id="quickInvent" value="Quick ' +
    'invent items" class="custombutton" type="submit"></td></tr>' + // button to invent
    '<tr><td colspan=6 align="center"><span id="invet_Result_label">' +
    '</span><ol id="invent_Result"></ol></td></tr>';
  $('input[name="recipe_id"]').closest('tbody').append(selector);
  getElementById('quickInvent').addEventListener('click',
    quickInvent, true);

}

function getItemName(responseText) { // Legacy
  var itemName = itemRE.exec(responseText);
  if (itemName) {return itemName[1];}
}

function injectViewRecipeLinks(responseText, callback) { // Legacy
  var itemName = getItemName(responseText);
  var plantFromComponent = fallback(plantFromComponentHash[itemName],
    itemName);
  if (itemName !== plantFromComponent) {
    var itemLinks = createTd({
      innerHTML: '<a href="' + server +
        '?cmd=auctionhouse&search_text=' +
        encodeURI(plantFromComponent) + '">AH</a>'
    });
    var counter = findNode('../../../../tr[2]/td', callback);
    counter.setAttribute('colspan', '2');
    callback.parentNode.parentNode.parentNode.appendChild(itemLinks);
  }
}

function linkFromMouseoverCustom(mouseOver) { // Legacy
  var reParams =
    /item_id=(\d+)&inv_id=([-0-9]*)&t=(\d+)&p=(\d+)&vcode=([a-z0-9]*)/i;
  var reResult = reParams.exec(mouseOver);
  if (reResult === null) {
    return null;
  }
  var itemId = reResult[1];
  var invId = reResult[2];
  var type = reResult[3];
  var pid = reResult[4];
  var vcode = reResult[5];
  var theUrl = 'fetchitem.php?item_id=' + itemId + '&inv_id=' + invId +
    '&t=' + type + '&p=' + pid + '&vcode=' + vcode;
  theUrl = server + theUrl;
  return theUrl;
}

function injectViewRecipe() { // Legacy
  var recipe = $('#pCC table table b').first();
  var name = recipe.html();
  var searchName = recipe.html().replace(/ /g, '%20');
  recipe.html('<a href="' + guideUrl +
    'items&subcmd=view&search_name=' + searchName + '">' + name +
    '</a>');

  var components = findNodes(
    '//b[.="Components Required"]/../../following-sibling::tr[2]//img');
  if (components) {
    for (var i = 0; i < components.length; i += 1) {
      var mo = components[i].dataset.tipped;
      xmlhttp(linkFromMouseoverCustom(mo),
        injectViewRecipeLinks, components[i]);
      var componentCountElement = components[i].parentNode.parentNode
        .parentNode.nextSibling.firstChild;
      componentCountElement.innerHTML = '<nobr>' +
        componentCountElement.innerHTML + '</nobr>';
    }
  }
}

export default function inventing() {
  injectViewRecipe();
  injectInvent();
}
