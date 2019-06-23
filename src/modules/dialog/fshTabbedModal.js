import fshModalDialog from './fshModalDialog';
import fshTabSet from './fshTabSet';
import partial from '../common/partial';
import {subscribeOnce} from '../support/pubsub';

function injectTabSet(name, tabs, thisPopup) {
  fshTabSet(thisPopup, tabs, name + '-tab');
}

export default function fshTabbedModal(name, tabs) {
  subscribeOnce(name + '-popup', partial(injectTabSet, name, tabs));
  // subscribeOnce('qwtab-header', makePref);
  fshModalDialog(name);
}
