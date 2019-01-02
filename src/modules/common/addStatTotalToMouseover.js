import {closestTable} from './closest';
import {createDiv} from './cElement';
import getArrayByTagName from './getArrayByTagName';
import insertHtmlBeforeBegin from './insertHtmlBeforeBegin';
import insertHtmlBeforeEnd from './insertHtmlBeforeEnd';

function cellOneHazText(curr) {
  return curr.cells[1] && curr.cells[1].textContent;
}

function reduceStatTable(prev, curr, index) {
  var key = curr.cells[0].textContent.trim().replace(':', '');
  if (!key) {return prev;}
  prev[key] = {ind: index};
  if (cellOneHazText(curr)) {
    prev[key].value = Number(
      curr.cells[1].textContent.trim().replace('+', '')
    );
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

function addStats(el) {
  var statTable = closestTable(el);
  var statObj = Array.from(statTable.rows).reduce(reduceStatTable, {});
  var totalStats = getVal('Attack', statObj) + getVal('Defense', statObj) +
    getVal('Armor', statObj) + getVal('Damage', statObj) +
    getVal('HP', statObj);
  insertHtmlBeforeBegin(getLastIndex(statObj, statTable),
    '<tr class="fshDodgerBlue"><td>Stat Total:</td><td align="right">' +
    totalStats + '&nbsp;</td></tr>');
}

function bonuses(el) {
  return el.textContent === 'Bonuses';
}

function fshDataFilter(data) {
  var container = createDiv();
  insertHtmlBeforeEnd(container, data);
  getArrayByTagName('font', container).filter(bonuses).forEach(addStats);
  return container.innerHTML;
}

function fshPreFilter(options) {
  if (options.url.indexOf('fetchitem') !== 0) {return;}
  options.dataFilter = fshDataFilter;
}

export default function addStatTotalToMouseover() { // jQuery
  $.ajaxPrefilter(fshPreFilter);
}
