import './guildTracker.css';
import createDiv from '../../common/cElement/createDiv';
import createLabel from '../../common/cElement/createLabel';
import { defEnableGuildActivityTracker } from '../../support/constants';
import fshTabbedModal from '../../dialog/fshTabbedModal';
import getValue from '../../system/getValue';
import insertElement from '../../common/insertElement';
import insertElementAfterBegin from '../../common/insertElementAfterBegin';
import makeTg from './trackerTable';
import on from '../../common/on';
import once from '../../common/once';
import partial from '../../common/partial';
import querySelector from '../../common/querySelector';
import setValue from '../../system/setValue';
import { simpleCheckboxHtml } from '../../settings/simpleCheckbox';
import { subscribeOnce } from '../../support/pubsub';

function togglePref(evt) {
  if (evt.target.id === defEnableGuildActivityTracker) {
    setValue(defEnableGuildActivityTracker,
      !getValue(defEnableGuildActivityTracker));
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
  const gs = querySelector('#pCC img.guild_openGuildStore');
  const td = gs.parentNode;
  const container = createDiv({ className: 'fsh-tracker' });
  const myDiv = createDiv({
    innerHTML: `${simpleCheckboxHtml(defEnableGuildActivityTracker)
    }&nbsp;`,
  });
  on(myDiv, 'change', togglePref);
  const showTrackerDialog = createLabel({
    className: 'custombutton',
    htmlFor: 'tracker',
    textContent: 'Show',
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
