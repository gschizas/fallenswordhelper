import {def_table} from '../support/constants';
import getElementsByTagName from '../common/getElementsByTagName';
import getValue from '../system/getValue';
import insertElement from '../common/insertElement';
import on from '../common/on';
import {pCC} from '../support/layout';
import querySelector from '../common/querySelector';
import querySelectorArray from '../common/querySelectorArray';
import {sendEvent} from '../support/fshGa';
import setValue from '../system/setValue';
import {simpleCheckboxHtml} from '../settings/simpleCheckbox';
import {createDiv, createStyle} from '../common/cElement';

const pref_enableStamBars = 'enableStamBars';
let enableStamBars;
let thisStyle;

function getStamPerc(a) {
  const mo = a.dataset.tipped.match(/(\d+) \/ (\d+)/);
  return Math.min(Math.round(Number(mo[1]) / Number(mo[2]) * 100), 100);
}

function stamBarStyle(a) {
  const perc = getStamPerc(a);
  return '#fshMemberList ' +
    `tr:nth-child(${a.parentNode.parentNode.rowIndex + 1}) {` +
    `background: linear-gradient(to right, rgba(255, 153, 0, 0.5) ${perc}%, ` +
    `transparent ${perc + 1}%)}`;
}

function injectStyle() {
  const tables = getElementsByTagName(def_table, pCC);
  const memberList = tables[tables.length - 1];
  memberList.id = 'fshMemberList';
  const memberLinks = querySelectorArray('a[href*="&player_id="]', memberList);
  const myTest = memberLinks.map(stamBarStyle).join('\n');
  thisStyle = insertElement(document.body, createStyle(myTest)).sheet;
}

function toggleStyle() {
  if (!thisStyle) {
    injectStyle();
  } else {
    thisStyle.disabled = !enableStamBars;
  }
}

function changePref() {
  enableStamBars = !enableStamBars;
  setValue(pref_enableStamBars, enableStamBars);
  toggleStyle();
  sendEvent('guildManage', 'StamBars');
}

function injectPref() {
  var gs = querySelector('#pCC img.guild_openGuildStore');
  var td = gs.parentNode;
  const prefContainer = insertElement(td,
    createDiv({
      className: 'fshCenter',
      innerHTML: simpleCheckboxHtml(pref_enableStamBars)
    }));
  on(prefContainer, 'change', changePref);
}

export default function progressBar() {
  injectPref();
  enableStamBars = getValue(pref_enableStamBars);
  if (enableStamBars) {toggleStyle();}
}
