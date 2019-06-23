import './guildTracker.postcss';
import {def_enableGuildActivityTracker} from '../../support/constants';
import fshTabbedModal from '../../dialog/fshTabbedModal';
import getValue from '../../system/getValue';
import insertElement from '../../common/insertElement';
import insertElementAfterBegin from '../../common/insertElementAfterBegin';
import {makeTg} from './trackerTable';
import on from '../../common/on';
import once from '../../common/once';
import partial from '../../common/partial';
import querySelector from '../../common/querySelector';
import setValue from '../../system/setValue';
import {simpleCheckboxHtml} from '../../settings/simpleCheckbox';
import {subscribeOnce} from '../../support/pubsub';
import {createDiv, createLabel} from '../../common/cElement';

function togglePref(evt) {
  if (evt.target.id === def_enableGuildActivityTracker) {
    setValue(def_enableGuildActivityTracker,
      !getValue(def_enableGuildActivityTracker));
  }
}

function injectContent(thisFn, thisDiv) {
  insertElement(thisDiv, thisFn());
}

function showDialog() {
  subscribeOnce('tracker-tab0', partial(injectContent, makeTg));
  // subscribeOnce('tracker-tab1', partial(injectContent, showAHInvManager, appInv));
  fshTabbedModal('tracker', ['Guild Activity Tracker', 'Import/Export']);
}

function injectShowTracker() {
  var gs = querySelector('#pCC img.guild_openGuildStore');
  var td = gs.parentNode;
  var container = createDiv({className: 'fsh-tracker'});
  var myDiv = createDiv({
    innerHTML: simpleCheckboxHtml(def_enableGuildActivityTracker) +
      '&nbsp;'
  });
  on(myDiv, 'change', togglePref);
  var showTrackerDialog = createLabel({
    className: 'custombutton',
    htmlFor: 'tracker',
    textContent: 'Show'
  });
  once(showTrackerDialog, 'click', showDialog);
  insertElement(myDiv, showTrackerDialog);
  insertElement(container, gs);
  insertElement(container, myDiv);
  insertElementAfterBegin(td, container);
}

export default function guildTrackerV2() {
  injectShowTracker();
}
