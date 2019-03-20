import insertElement from '../../common/insertElement';
import on from '../../common/on';
import {sendEvent} from '../../support/fshGa';
import {createDiv, createInput, createLabel} from '../../common/cElement';

function bioToggle() {
  sendEvent('bio', 'toggle');
}

function doCompression(bioCell) {
  var fshCompressor = createDiv({className: 'fshCompressor'});
  var toggle = insertElement(fshCompressor,
    createInput({id: 'fshCompressToggle', type: 'checkbox'}));
  on(toggle, 'change', bioToggle);
  insertElement(fshCompressor,
    createLabel({className: 'sendLink', htmlFor: 'fshCompressToggle'}));
  var fshCompress = insertElement(fshCompressor,
    createDiv({className: 'fshCompress'}));
  fshCompress.innerHTML = bioCell.innerHTML;
  bioCell.innerHTML = '';
  insertElement(bioCell, fshCompressor);
}

function getFontSize(bioCell) {
  var computedStyle = getComputedStyle(bioCell);
  return parseInt(computedStyle.getPropertyValue('font-size'), 10);
}

export default function compressBio(bioCell) {
  if (bioCell.clientHeight / getFontSize(bioCell) > 10) {
    doCompression(bioCell);
  }
}
