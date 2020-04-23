import './compressBio.postcss';
import createDiv from '../../common/cElement/createDiv';
import createInput from '../../common/cElement/createInput';
import createLabel from '../../common/cElement/createLabel';
import insertElement from '../../common/insertElement';
import on from '../../common/on';
import partial from '../../common/partial';
import { sendEvent } from '../../support/fshGa';
import setInnerHtml from '../../dom/setInnerHtml';

function injectToggle(fshCompressor) {
  const toggle = insertElement(fshCompressor,
    createInput({ id: 'fshCompressToggle', type: 'checkbox' }));
  on(toggle, 'change', partial(sendEvent, 'bio', 'toggle'));
}

function hideBlock(bioCell, fshCompressor) {
  const fshCompress = insertElement(fshCompressor,
    createDiv({ className: 'fshCompress' }));
  setInnerHtml(bioCell.innerHTML, fshCompress);
  setInnerHtml('', bioCell);
}

function doCompression(bioCell) {
  const fshCompressor = createDiv({ className: 'fshCompressor' });
  injectToggle(fshCompressor);
  insertElement(fshCompressor,
    createLabel({ className: 'sendLink', htmlFor: 'fshCompressToggle' }));
  hideBlock(bioCell, fshCompressor);
  insertElement(bioCell, fshCompressor);
}

function getFontSize(bioCell) {
  const computedStyle = getComputedStyle(bioCell);
  return parseInt(computedStyle.getPropertyValue('font-size'), 10);
}

export default function compressBio(bioCell) {
  if (bioCell.clientHeight / getFontSize(bioCell) > 10) {
    doCompression(bioCell);
  }
}
