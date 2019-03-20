import insertElement from '../../common/insertElement';
import {createDiv, createInput, createLabel} from '../../common/cElement';

function doCompression(bioCell) {
  var fshCompressor = createDiv({className: 'fshCompressor'});
  insertElement(fshCompressor,
    createInput({id: 'fshCompressToggle', type: 'checkbox'}));
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
