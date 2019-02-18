import defaults from '../../support/dataObj.json';
import eventHandler5 from '../../common/eventHandler5';
import {getElementById} from '../../common/getElement';
import getValueJSON from '../../system/getValueJSON';
import isChecked from '../../system/isChecked';
import jsonParse from '../../common/jsonParse';
import makePageHeader from './makePageHeader';
import makePageTemplate from './makePageTemplate';
import on from '../../common/on';
import {pCC} from '../../support/layout';
import selfIdIs from '../../common/selfIdIs';
import setValueJSON from '../../system/setValueJSON';
import {auctionSearchBlurb, auctionSearchParams} from './assets';

var param;

function hasUrl(j) {
  return param.url && param.url[j] !== '';
}

function detailRow(j, itemField) { // Legacy
  if (param.tags[j] === 'checkbox') {
    return '<input type="checkbox"' + isChecked(itemField) +
      ' disabled>';
  } else if (hasUrl(j)) {
    return '<a href="' + param.url[j].replace('@replaceme@', itemField) +
      '">' + itemField + '</a>';
  }
  return itemField;
}

function itemRow(item) { // Legacy
  var result = '';
  for (var j = 0; j < param.fields.length; j += 1) {
    result += '<td class="fshCenter">';
    var itemField = item[param.fields[j]];
    if (param.fields[j] === param.categoryField) {continue;}
    result += detailRow(j, itemField) + '</td>';
  }
  return result;
}

function headersToHtml(prev, curr) {
  return prev + '<th>' + curr + '</th>';
}

function needsCat(item, i, currentItems) {
  return param.categoryField && (i === 0 ||
    currentItems[i - 1][param.categoryField] !== item[param.categoryField]);
}

function itemRows(prev, item, i, currentItems) {
  var result = '<tr>';
  if (needsCat(item, i, currentItems)) {
    result += '<td><span class="fshQs">' + item[param.categoryField] +
      '</span></td><td></td><td></td><td></td><td></td></tr><tr>';
  }
  result += itemRow(item);
  result += '<td><span class="HelperTextLink" data-itemId="' + i +
    '" id="fshDel' + i + '">[Del]</span></td></tr>';
  return prev + result;
}

function doInputs() { // Legacy
  var result = '<tr>';
  for (var i = 0; i < param.tags.length; i += 1) {
    result += '<td align=center><input type="' + param.tags[i] +
      '" class="custominput" id="fshIn' + param.fields[i] + '"></td>';
  }
  return result;
}

function generateManageTable() { // Legacy
  var result = '<table cellspacing="2" cellpadding="2" class="fshGc" ' +
    'width="100%"><tr class="fshOr">';
  result += param.headers.reduce(headersToHtml, '');
  result += '<th>Action</th></tr>';
  result += param.currentItems.reduce(itemRows, '');
  result += doInputs();
  result += '<td><span class="HelperTextLink" id="fshAdd">' +
    '[Add]</span></td></tr></table>' +
    '<table width="100%"><tr><td class="fshCenter">' +
    '<textarea cols=70 rows=20 id="fshEd">' +
    JSON.stringify(param.currentItems) + '</textarea></td></tr>' +
    '<tr><td class="fshCenter"><input id="fshSave" ' +
    'type="button" value="Save" class="custombutton">' +
    '&nbsp;<input id="fshReset" type="button" value="Reset" ' +
    'class="custombutton"></td></tr>' +
    '</tbody></table>';
  var target = getElementById(param.id);
  if (target) {
    getElementById(param.id).innerHTML = result;
    setValueJSON(param.gmname, param.currentItems);
  }
}

function deleteQuickItem(self) { // Legacy
  var itemId = self.getAttribute('data-itemId');
  param.currentItems.splice(itemId, 1);
  generateManageTable();
}

function buildNewItem() { // Legacy
  var newItem = {};
  for (var i = 0; i < param.fields.length; i += 1) {
    if (param.tags[i] === 'checkbox') {
      newItem[param.fields[i]] =
        getElementById('fshIn' + param.fields[i]).checked;
    } else {
      newItem[param.fields[i]] =
        getElementById('fshIn' + param.fields[i]).value;
    }
  }
  return newItem;
}

function addQuickItem() { // Legacy
  var isArrayOnly = param.fields.length === 0;
  var newItem = {};
  if (isArrayOnly) {
    newItem = getElementById('fshIn0').value;
  } else {
    newItem = buildNewItem();
  }
  param.currentItems.push(newItem);
  generateManageTable();
}

function saveRawEditor() { // Legacy
  var userInput = jsonParse(getElementById('fshEd').value);
  if (Array.isArray(userInput)) {
    param.currentItems = userInput;
    generateManageTable();
  }
}

function resetRawEditor() { // Legacy
  if (param.id === 'fshAso') {
    param.currentItems =
      jsonParse(defaults.quickSearchList);
  } else {param.currentItems = [];}
  generateManageTable();
}

function listEvents() {
  return [
    [selfIdIs('fshReset'), resetRawEditor],
    [selfIdIs('fshSave'), saveRawEditor],
    [selfIdIs('fshAdd'), addQuickItem],
    [function(self) {return self.id.startsWith('fshDel');}, deleteQuickItem]
  ];
}

function setupEventHandler(content) {
  on(content, 'click', eventHandler5(listEvents()));
}

export function injectAuctionSearch(injector) { // Legacy
  var content = injector || pCC;
  content.innerHTML =
    makePageHeader('Trade Hub Quick Search', '', '', '') +
    auctionSearchBlurb;
  // global parameters for the meta function generateManageTable
  param = auctionSearchParams();
  generateManageTable();
  setupEventHandler(content);
}

export function injectQuickLinkManager(injector) { // Legacy
  var content = injector || pCC;
  content.innerHTML = makePageTemplate({
    title: 'Quick Links',
    comment: '',
    spanId: '',
    button: '',
    divId: 'qla'
  });

  // global parameters for the meta function generateManageTable
  param = {
    id: 'qla',
    headers: ['Name', 'URL',
      'New [<span class="fshLink tip-static" ' +
      'data-tipped="Open page in a new window">?</span>]'],
    fields: ['name', 'url', 'newWindow'],
    tags: ['text', 'text', 'checkbox'],
    currentItems: getValueJSON('quickLinks'),
    gmname: 'quickLinks',
  };
  generateManageTable();
  setupEventHandler(content);
}
