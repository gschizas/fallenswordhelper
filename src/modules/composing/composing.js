import fastCompose from './fastCompose';
import {getElementById} from '../common/getElement';
import getValue from '../system/getValue';
import insertElementBefore from '../common/insertElementBefore';
import insertHtmlAfterEnd from '../common/insertHtmlAfterEnd';
import jQueryPresent from '../common/jQueryPresent';
import {pCC} from '../support/layout';
import parseComposing from './parseComposing';
import quickCreate from './quickCreate';

function moveButtons() {
  if (getValue('moveComposingButtons')) {
    var buttonDiv = getElementById('composing-error-dialog')
      .previousElementSibling;
    buttonDiv.setAttribute('style', 'text-align: right; padding: 0 38px 0 0');
    var top = pCC.getElementsByClassName('composing-level')[0]
      .parentNode;
    insertElementBefore(buttonDiv, top);
  }
}

function injectButton(el) {
  insertHtmlAfterEnd(el, '<span class="quickCreate">' +
    '[<span class="sendLink">Quick Create</span>]</span>');
}

function hasJQuery() {
  parseComposing();
  var buttons = pCC
    .querySelectorAll('input[id^=create-]:not(#create-multi)');
  Array.from(buttons).forEach(injectButton);
  pCC.addEventListener('click', quickCreate);
  moveButtons();
  fastCompose();
}

export default function injectComposing() {
  if (jQueryPresent() && pCC) {hasJQuery();}
}
