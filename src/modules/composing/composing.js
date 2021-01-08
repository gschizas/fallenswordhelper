import './composing.css';
import backgroundCreate from './backgroundCreate';
import fastCompose from './fastCompose';
import getElementById from '../common/getElement';
import getElementsByClassName from '../common/getElementsByClassName';
import getValue from '../system/getValue';
import insertElementBefore from '../common/insertElementBefore';
import insertHtmlAfterEnd from '../common/insertHtmlAfterEnd';
import jQueryPresent from '../common/jQueryPresent';
import onclick from '../common/onclick';
import { pCC } from '../support/layout';
import parseComposing from './parseComposing';
import querySelectorArray from '../common/querySelectorArray';
import { sendEvent } from '../support/fshGa';

function moveButtons() {
  if (getValue('moveComposingButtons')) {
    const buttonDiv = getElementById('composing-error-dialog')
      .previousElementSibling;
    buttonDiv.setAttribute('style', 'text-align: right; padding: 0 38px 0 0');
    const top = getElementsByClassName('composing-level', pCC)[0]
      .parentNode;
    insertElementBefore(buttonDiv, top);
  }
}

function injectButton(el) {
  insertHtmlAfterEnd(el, '<span class="quickCreate">'
    + '[<span class="sendLink">Quick Create</span>]</span>');
}

function isOurTarget(target) {
  return target.tagName === 'SPAN' && target.className === 'quickCreate';
}

function doQuickCreate(target) {
  const temp = target.previousElementSibling.previousElementSibling;
  if (temp && temp.value !== 'none') {
    backgroundCreate(target, temp);
    sendEvent('composing', 'QuickCreate');
  }
}

function quickCreate(evt) {
  const target = evt.target.parentNode;
  if (isOurTarget(target)) {
    doQuickCreate(target);
  }
}

function hasJQuery() {
  parseComposing();
  querySelectorArray('input[id^=create-]:not(#create-multi)', pCC)
    .forEach(injectButton);
  onclick(pCC, quickCreate);
  moveButtons();
  fastCompose();
}

export default function injectComposing() {
  if (jQueryPresent() && pCC) { hasJQuery(); }
}
