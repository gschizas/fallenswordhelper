import insertElement from '../../common/insertElement';
import on from '../../common/on';
import partial from '../../common/partial';
import {sendEvent} from '../../support/fshGa';
import {createDiv, createInput, createLabel} from '../../common/cElement';

function injectToggle(fshCompressor) {
  var toggle = insertElement(fshCompressor,
    createInput({id: 'fshCompressToggle', type: 'checkbox'}));
  on(toggle, 'change', partial(sendEvent, 'bio', 'toggle'));
}

function hideBlock(bioCell, fshCompressor) {
  var fshCompress = insertElement(fshCompressor,
    createDiv({className: 'fshCompress'}));
  fshCompress.innerHTML = bioCell.innerHTML;
  bioCell.innerHTML = '';
}

function doCompression(bioCell) {
  var fshCompressor = createDiv({className: 'fshCompressor'});
  injectToggle(fshCompressor);
  insertElement(fshCompressor,
    createLabel({className: 'sendLink', htmlFor: 'fshCompressToggle'}));
  hideBlock(bioCell, fshCompressor);
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
