import {createAnchor} from '../common/cElement';
import insertElement from '../common/insertElement';
import insertElementBefore from '../common/insertElementBefore';
import querySelector from '../common/querySelector';
import querySelectorArray from '../common/querySelectorArray';
import xPath from '../common/xPath';
import {def_subcmd, guideUrl} from '../support/constants';

function getItemId(el) {
  if (!el) {return;}
  var match = el.src.match(/\/items\/(\d+)\.gif/);
  if (match) {return match[1];}
}

function guideItemHref(itemId) {
  return guideUrl + 'items' + def_subcmd + 'view&item_id=' + itemId;
}

function makeGuideItemAnchor(itemId) {
  return createAnchor({
    href: guideItemHref(itemId),
    target: '_blank'
  });
}

function wrapInGuideLink(el, source) {
  var itemId = getItemId(source);
  if (!itemId) {return;}
  var myLink = makeGuideItemAnchor(itemId);
  insertElementBefore(myLink, el);
  insertElement(myLink, el);
}

function wrapImgInGuideLink(el) {
  wrapInGuideLink(el, el);
}

function makeNameLink() {
  var source = xPath(
    './/b[.="Target Invention"]/../../following-sibling::*[1]//img');
  var recipe = querySelector('#pCC b');
  wrapInGuideLink(recipe, source);
}

function makeIngredientLinks() {
  var ingredients = querySelectorArray('#pCC img[src*="/items/"]');
  ingredients.forEach(wrapImgInGuideLink);
}

export default function injectViewRecipe() {
  makeNameLink();
  makeIngredientLinks();
}
