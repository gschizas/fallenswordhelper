import addButton from './addButton';
import calf from '../../support/calf';
import {createDiv} from '../../common/cElement';
import csvSplit from '../../common/csvSplit';
import {def_joinallgroupsundersize} from '../../support/constants';
import fetchGroupStatsButton from './fetchGroupStatsButton';
import getText from '../../common/getText';
import getValue from '../../system/getValue';
import hideElement from '../../common/hideElement';
import indexAjaxData from '../../ajax/indexAjaxData';
import on from '../../common/on';
import partial from '../../common/partial';
import querySelectorArray from '../../common/querySelectorArray';
import {sendEvent} from '../../support/fshGa';

var maxGroupSizeToJoin;

function filterMercs(e) {return !e.includes('#000099');}

function joined(container) {
  container.innerHTML = '<span class="fshXSmall fshBlue" ' +
    'style="line-height: 19px;">Joined</span>';
}

function joinGroup(groupID, container) { // jQuery.min
  return indexAjaxData({
    cmd: 'guild',
    subcmd: 'groups',
    subcmd2: 'join',
    group_id: groupID
  }).done(partial(joined, container));
}

function doJoinUnderSize(joinButton) {
  var memList = joinButton.parentNode.parentNode.parentNode.cells[1];
  var memListArrayWithMercs = csvSplit(getText(memList));
  var memListArrayWithoutMercs = memListArrayWithMercs
    .filter(filterMercs);
  if (memListArrayWithoutMercs.length < maxGroupSizeToJoin) {
    var container = createDiv({
      className: 'group-action-link fshRelative',
      innerHTML: '<span class="fshSpinner fshSpinner12"></span>',
      style: {height: '19px', width: '19px'}
    });
    joinButton.parentNode.replaceChild(container, joinButton);
    var groupID = /confirmJoin\((\d+)\)/.exec(joinButton.href)[1];
    joinGroup(groupID, container);
  }
}

function joinAllGroupsUnderSize() {
  sendEvent('groups', 'joinAllGroupsUnderSize');
  querySelectorArray('#pCC a[href*="confirmJoin"]').forEach(doJoinUnderSize);
}

function joinUnderButton(buttonRow) {
  var joinUnder = addButton(buttonRow,
    'Join All Groups < ' + maxGroupSizeToJoin + ' Members');
  on(joinUnder, 'click', joinAllGroupsUnderSize);
}

export default function groupButtons() {
  var joinAll = document
    .querySelector('#pCC input[value="Join All Available Groups"]');
  var buttonRow = joinAll.parentNode;
  var enableMaxGroupSizeToJoin = getValue('enableMaxGroupSizeToJoin');
  if (enableMaxGroupSizeToJoin) {
    maxGroupSizeToJoin = getValue('maxGroupSizeToJoin');
    hideElement(joinAll);
    joinUnderButton(buttonRow);
  }

  fetchGroupStatsButton(buttonRow);

  if (calf.subcmd2 === def_joinallgroupsundersize) {
    joinAllGroupsUnderSize();
  }
}
