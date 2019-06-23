import './fshModalDialog.postcss';
import {getElementById} from '../common/getElement';
import insertElement from '../common/insertElement';
import {publish} from '../support/pubsub';
import {createDiv, createInput, createLabel} from '../common/cElement';

function makeDialog(name) {
  const thisContainer = createDiv({className: 'fshDialog'});
  const thisInput = createInput({id: name, type: 'checkbox'});
  insertElement(thisContainer, thisInput);
  const thisOverlay = createDiv({className: 'ui-widget-overlay'});
  const thisLabel = createLabel({htmlFor: name});
  insertElement(thisOverlay, thisLabel);
  insertElement(thisContainer, thisOverlay);
  const thisPopup = createDiv(
    {className: 'ui-dialog ui-tabs ui-widget ui-widget-content ui-corner-all'});
  publish(name + '-popup', thisPopup);
  insertElement(thisContainer, thisPopup);
  insertElement(document.body, thisContainer);
}

export default function fshModalDialog(name) {
  const thisInput = getElementById(name);
  if (thisInput) {thisInput.checked = true;} else {
    makeDialog(name);
  }
}
