import add from '../../support/task';
import alpha from '../../common/alpha';
import formatLocalDateTime from '../../common/formatLocalDateTime';
import insertElement from '../../common/insertElement';
import insertHtmlBeforeEnd from '../../common/insertHtmlBeforeEnd';
import isUndefined from '../../common/isUndefined';
import on from '../../common/on';
import partial from '../../common/partial';
import {act, cur, gxp, lvl, max, utc, vl} from './indexConstants';
import {
  createDiv,
  createTBody,
  createTable,
  createTh,
} from '../../common/cElement';

var actBody;
var selMember;
var tgCont;
var memberSelect;
var myMembers;

function buildOptions(ourMembers) {
  return '<select name="member">' +
    '<option value="- All -" selected>- All -</option>' +
    Object.keys(ourMembers).sort(alpha).reduce(function(prev, member) {
      return prev + '<option value="' + member + '">' + member + '</option>';
    }, '') + '</select>';
}

function toText(val) {
  if (isUndefined(val)) {return '#DEF';}
  return val.toLocaleString();
}

function memberFilter(memberKey) {
  return selMember && selMember !== '- All -' && selMember !== memberKey;
}

function aMembersActivityRows(memberKey, inside, activity) {
  return inside + '<tr>' +
    '<td>' +
    formatLocalDateTime(new Date(activity[utc] * 1000)) +
    '</td>' +
    '<td>' + memberKey + '</td>' +
    '<td class="fshRight">' + toText(activity[lvl]) + '</td>' +
    '<td class="fshRight">' + toText(activity[vl]) + '</td>' +
    '<td class="fshRight">' + toText(activity[cur]) + '</td>' +
    '<td class="fshRight">' + toText(activity[max]) + '</td>' +
    '<td class="fshRight">' +
      Math.floor(activity[cur] / activity[max] * 100) +
    '</td>' +
    '<td class="fshRight">' + activity[act] + '</td>' +
    '<td class="fshRight">' + toText(activity[gxp]) + '</td>' +
    '</tr>';
}

function memberRows() {
  return Object.keys(myMembers).reduce(function(outside, memberKey) {
    if (memberFilter(memberKey)) {return outside;}
    return outside +
      myMembers[memberKey].reduce(partial(aMembersActivityRows, memberKey), '');
  }, '');
}

function drawRows() {
  if (myMembers) {actBody.innerHTML = memberRows();}
  tgCont.classList.remove('fshSpinner');
}

function queueDrawRows() {
  tgCont.classList.add('fshSpinner');
  add(3, drawRows);
}

function myChange(e) {
  selMember = e.target.value;
  queueDrawRows();
}

export function initTable(theMembers) {
  if (theMembers) {
    myMembers = theMembers;
    memberSelect.innerHTML = buildOptions(theMembers);
    queueDrawRows();
  }
}

export function makeTg() {
  var tg = createTable({id: 'tg'});
  var hrow = tg.createTHead().insertRow(-1);
  insertHtmlBeforeEnd(hrow, '<th>Date</th>');

  var memberHead = createTh({textContent: 'Member'});
  memberSelect = createDiv();
  insertElement(memberHead, memberSelect);
  insertElement(hrow, memberHead);

  insertHtmlBeforeEnd(hrow, '<th>Level</th><th>VL</th>' +
    '<th>Stam</th><th>Max<br>Stam</th><th>Stam<br>%</th>' +
    '<th>Last<br>Activity<br>(Days)</th><th>GXP</th>');

  actBody = createTBody();
  insertElement(tg, actBody);
  on(tg, 'change', myChange);
  tgCont = createDiv({className: 'tgCont fshSpinner64'});
  insertElement(tgCont, tg);
  return tgCont;
}
