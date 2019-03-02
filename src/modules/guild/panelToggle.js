import {createSpan} from '../common/cElement';
import getValue from '../system/getValue';
import hideElement from '../common/hideElement';
import insertElement from '../common/insertElement';
import insertHtmlBeforeEnd from '../common/insertHtmlBeforeEnd';
import on from '../common/on';
import toggleVisibilty from '../common/toggleVisibilty';

function makeButton(linkto) {
  return createSpan({
    className: 'fshLink tip-static',
    dataset: {linkto: linkto, tipped: 'Toggle Section'},
    textContent: 'X'
  });
}

function wrapper(btn) {
  var wrap = createSpan({innerHTML: '[&nbsp;'});
  insertElement(wrap, btn);
  insertHtmlBeforeEnd(wrap, '&nbsp;]');
  return wrap;
}

function thisToggle(inject, panel, linkto) {
  var thisButton = makeButton(linkto);
  insertElement(inject, wrapper(thisButton));
  panel.id = linkto;
  if (getValue(linkto)) {hideElement(panel);}
  on(thisButton, 'click', toggleVisibilty);
}

export function logoToggle(leftHandSideColumnTable) {
  thisToggle(
    leftHandSideColumnTable.rows[0].cells[1].children[0],
    leftHandSideColumnTable.rows[2].cells[0].children[0],
    'guildLogoControl');
}

export function statToggle(leftHandSideColumnTable) {
  var leaveGuildCell = leftHandSideColumnTable.rows[4].cells[1].children[0];
  leaveGuildCell.innerHTML = leaveGuildCell.innerHTML.trim();
  thisToggle(leaveGuildCell,
    leftHandSideColumnTable.rows[6].cells[0].children[0],
    'statisticsControl');
}

export function structureToggle(leftHandSideColumnTable) {
  thisToggle(leftHandSideColumnTable.rows[15].cells[1].children[0],
    leftHandSideColumnTable.rows[17].cells[0].children[0],
    'guildStructureControl');
}
