import {createTd} from '../common/cElement';
import fallback from '../system/fallback';
import {guideUrl} from '../support/constants';
import insertElement from '../common/insertElement';
import {pCC} from '../support/layout';
import partial from '../common/partial';
import retryAjax from '../ajax/retryAjax';
import {server} from '../system/system';
import xPath from '../common/xPath';
import xPathAll from '../common/xPathAll';

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

function getItemName(responseText) { // Legacy
  var itemName = itemRE.exec(responseText);
  if (itemName) {return itemName[1];}
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

function injectViewRecipeLinks(responseText, callback) { // Legacy
  var itemName = getItemName(responseText);
  var plantFromComponent = fallback(plantFromComponentHash[itemName],
    itemName);
  if (itemName !== plantFromComponent) {
    var itemLinks = createTd({
      innerHTML: '<a href="' + server +
        '?cmd=auctionhouse&search=' +
        encodeURI(plantFromComponent) + '">AH</a>'
    });
    var counter = xPath('../../../../tr[2]/td', document, callback);
    counter.setAttribute('colspan', '2');
    insertElement(callback.parentNode.parentNode.parentNode, itemLinks);
  }
}

function processMouseOver(compI, html) {
  injectViewRecipeLinks(html, compI);
}

function processComponents(compI) {
  var mo = compI.dataset.tipped;
  retryAjax(linkFromMouseoverCustom(mo)).done(partial(processMouseOver, compI));
  var componentCountElement = compI.parentNode.parentNode
    .parentNode.nextSibling.firstChild;
  componentCountElement.innerHTML = '<nobr>' +
    componentCountElement.innerHTML + '</nobr>';
}

export default function injectViewRecipe() { // Legacy
  var recipe = $('#pCC table table b').first();
  var name = recipe.html();
  if (name) {
    var searchName = name.replace(/ /g, '%20');
    recipe.html('<a href="' + guideUrl +
      'items&subcmd=view&search_name=' + searchName + '">' + name +
      '</a>');
  }

  var components = xPathAll(
    './/b[.="Components Required"]/../../following-sibling::tr[2]//img',
    document, pCC);
  if (components) {
    components.forEach(processComponents);
  }
}
