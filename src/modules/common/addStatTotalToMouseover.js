import {closestTable} from './closest';
import contains from './contains';
import {createDiv} from './cElement';
import getArrayByTagName from './getArrayByTagName';
import getText from './getText';
import getTextTrim from './getTextTrim';
import insertHtmlBeforeBegin from './insertHtmlBeforeBegin';
import insertHtmlBeforeEnd from './insertHtmlBeforeEnd';
import partial from './partial';

function cellOneHazText(curr) {
  return curr.cells[1] && getText(curr.cells[1]);
}

function reduceStatTable(prev, curr, index) {
  var key = getTextTrim(curr.cells[0]).replace(':', '');
  if (!key) {return prev;}
  prev[key] = {ind: index};
  if (cellOneHazText(curr)) {
    prev[key].value = Number(getTextTrim(curr.cells[1]).replace('+', ''));
  }
  return prev;
}

function getVal(prop, obj) {
  if (obj[prop] && obj[prop].value) {
    return obj[prop].value;
  }
  return 0;
}

function getLastIndex(obj, tbl) {
  if (obj.Enhancements) {
    return tbl.rows[obj.Enhancements.ind - 1];
  }
  return tbl.rows[tbl.rows.length - 1];
}

function sum(statObj, prev, curr) {return prev + getVal(curr, statObj);}

function calcTotalStats(statObj) {
  return ['Attack', 'Defense', 'Armor', 'Damage', 'HP']
    .reduce(partial(sum, statObj), 0);
}

function addStats(el) {
  var statTable = closestTable(el);
  var statObj = Array.from(statTable.rows).reduce(reduceStatTable, {});
  var totalStats = calcTotalStats(statObj);
  insertHtmlBeforeBegin(getLastIndex(statObj, statTable),
    '<tr class="fshDodgerBlue"><td>Stat Total:</td><td align="right">' +
    totalStats + '&nbsp;</td></tr>');
}

function fshDataFilter(data) {
  var container = createDiv();
  insertHtmlBeforeEnd(container, data);
  getArrayByTagName('font', container).filter(contains('Bonuses'))
    .forEach(addStats);
  return container.innerHTML;
}

function fshPreFilter(options) {
  if (options.url.startsWith('fetchitem')) {
    options.dataFilter = fshDataFilter;
  }
}

export default function addStatTotalToMouseover() { // jQuery
  $.ajaxPrefilter(fshPreFilter);
}
