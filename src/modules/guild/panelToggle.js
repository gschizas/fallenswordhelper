import {getElementById} from '../common/getElement';
import getValue from '../system/getValue';
import hideElement from '../common/hideElement';
import insertHtmlBeforeEnd from '../common/insertHtmlBeforeEnd';
import on from '../common/on';
import toggleVisibilty from '../common/toggleVisibilty';

export function logoToggle(leftHandSideColumnTable) { // Legacy
  var changeLogoCell = leftHandSideColumnTable.rows[0].cells[1].firstChild;
  insertHtmlBeforeEnd(changeLogoCell, '[ <span class="fshLink' +
    ' tip-static" id="toggleGuildLogoControl" ' +
    'linkto="guildLogoControl" data-tipped="Toggle Section">X</span> ]');
  var guildLogoElement = leftHandSideColumnTable.rows[2].cells[0]
    .firstChild.nextSibling;
  guildLogoElement.id = 'guildLogoControl';
  if (getValue('guildLogoControl')) {
    hideElement(guildLogoElement);
  }
  on(getElementById('toggleGuildLogoControl'), 'click', toggleVisibilty);
}

export function statToggle(leftHandSideColumnTable) { // Legacy
  var leaveGuildCell = leftHandSideColumnTable.rows[4].cells[1].firstChild;
  insertHtmlBeforeEnd(leaveGuildCell, '<span class="fshNoWrap">' +
    '[ <span class="fshLink tip-static" id="toggleStatisticsControl" ' +
    'linkto="statisticsControl" data-tipped="Toggle Section">X</span> ]' +
    '</span>');
  var statisticsControlElement = leftHandSideColumnTable.rows[6].cells[0]
    .firstChild.nextSibling;
  statisticsControlElement.id = 'statisticsControl';
  if (getValue('statisticsControl')) {
    hideElement(statisticsControlElement);
  }
  on(getElementById('toggleStatisticsControl'), 'click', toggleVisibilty);
}

export function structureToggle(leftHandSideColumnTable) { // Legacy
  var buildCell = leftHandSideColumnTable.rows[15].cells[1].firstChild;
  insertHtmlBeforeEnd(buildCell, '[ <span class="fshLink ' +
    'tip-static" id="toggleGuildStructureControl" ' +
    'linkto="guildStructureControl" data-tipped="Toggle Section">X</span> ]');
  var guildStructureControlElement = leftHandSideColumnTable.rows[17]
    .cells[0].firstChild.nextSibling;
  guildStructureControlElement.id = 'guildStructureControl';
  if (getValue('guildStructureControl')) {
    hideElement(guildStructureControlElement);
  }
  on(getElementById('toggleGuildStructureControl'), 'click', toggleVisibilty);
}
