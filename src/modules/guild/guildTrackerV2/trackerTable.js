import './trackerTable.postcss';
import insertElement from '../../common/insertElement';
import insertHtmlBeforeEnd from '../../common/insertHtmlBeforeEnd';
// import on from '../../common/on';
// import partial from '../../common/partial';
import {
  createDiv,
  createTBody,
  createTable,
  createTh,
} from '../../common/cElement';

var actBody;
var tgCont;
var memberSelect;

function makeMemberHeader() {
  var memberHead = createTh({textContent: 'Member'});
  memberSelect = createDiv();
  insertElement(memberHead, memberSelect);
  return memberHead;
}

function headerRow(tg) {
  var hrow = tg.createTHead().insertRow(-1);
  insertHtmlBeforeEnd(hrow, '<th>Date</th>');
  var memberHead = makeMemberHeader();
  insertElement(hrow, memberHead);
  insertHtmlBeforeEnd(hrow, '<th>Level</th><th>VL</th>' +
    '<th>Stam</th><th>Max<br>Stam</th><th>Stam<br>%</th>' +
    '<th>Last<br>Activity<br>(Days)</th><th>GXP</th>');
}

function makeActBody(tg) {
  actBody = createTBody();
  insertElement(tg, actBody);
}

export function makeTg() {
  var tg = createTable({id: 'tg'});
  headerRow(tg);
  makeActBody(tg);
  // on(tg, 'change', myChange);
  tgCont = createDiv({className: 'tgCont fshSpinner fshSpinner64'});
  insertElement(tgCont, tg);
  return tgCont;
}
