import './trackerTable.css';
import createDiv from '../../common/cElement/createDiv';
import createTBody from '../../common/cElement/createTBody';
import createTable from '../../common/cElement/createTable';
import createTh from '../../common/cElement/createTh';
import insertElement from '../../common/insertElement';
import insertHtmlBeforeEnd from '../../common/insertHtmlBeforeEnd';
// import on from '../../common/on';
// import partial from '../../common/partial';

let actBody;
let tgCont;
let memberSelect;

function makeMemberHeader() {
  const memberHead = createTh({ textContent: 'Member' });
  memberSelect = createDiv();
  insertElement(memberHead, memberSelect);
  return memberHead;
}

function headerRow(tg) {
  const hrow = tg.createTHead().insertRow(-1);
  insertHtmlBeforeEnd(hrow, '<th>Date</th>');
  const memberHead = makeMemberHeader();
  insertElement(hrow, memberHead);
  insertHtmlBeforeEnd(hrow, '<th>Level</th><th>VL</th>'
    + '<th>Stam</th><th>Max<br>Stam</th><th>Stam<br>%</th>'
    + '<th>Last<br>Activity<br>(Days)</th><th>GXP</th>');
}

function makeActBody(tg) {
  actBody = createTBody();
  insertElement(tg, actBody);
}

export default function makeTg() {
  const tg = createTable({ id: 'tg' });
  headerRow(tg);
  makeActBody(tg);
  // on(tg, 'change', myChange);
  tgCont = createDiv({ className: 'tgCont fshSpinner fshSpinner64' });
  insertElement(tgCont, tg);
  return tgCont;
}
