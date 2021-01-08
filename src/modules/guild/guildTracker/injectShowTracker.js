import './injectShowTracker.css';
import createDiv from '../../common/cElement/createDiv';
import { defEnableGuildActivityTracker } from '../../support/constants';
import getValue from '../../system/getValue';
import insertElement from '../../common/insertElement';
import insertElementAfterBegin from '../../common/insertElementAfterBegin';
import on from '../../common/on';
import querySelector from '../../common/querySelector';
import setValue from '../../system/setValue';
import { simpleCheckboxHtml } from '../../settings/simpleCheckbox';

function togglePref(evt) {
  if (evt.target.id === defEnableGuildActivityTracker) {
    setValue(defEnableGuildActivityTracker,
      !getValue(defEnableGuildActivityTracker));
  }
}

export default function injectShowTracker() {
  const gs = querySelector('#pCC img.guild_openGuildStore');
  const td = gs.parentNode;
  const container = createDiv({ className: 'fsh-tracker' });
  const myDiv = createDiv({
    innerHTML: `${simpleCheckboxHtml(defEnableGuildActivityTracker)
    }&nbsp;<label class="custombutton" for="tracker">Show</label>`,
  });
  on(myDiv, 'change', togglePref);
  insertElement(container, gs);
  insertElement(container, myDiv);
  insertElementAfterBegin(td, container);
}
