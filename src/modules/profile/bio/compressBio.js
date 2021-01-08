import './compressBio.css';
import createInput from '../../common/cElement/createInput';
import createLabel from '../../common/cElement/createLabel';
import getElementById from '../../common/getElement';
import insertElementBefore from '../../common/insertElementBefore';
import on from '../../common/on';
import partial from '../../common/partial';
import { sendEvent } from '../../support/fshGa';

function injectToggle(bioCell) {
  const toggle = insertElementBefore(
    createInput({ id: 'fshCompressToggle', type: 'checkbox' }),
    bioCell,
  );
  on(toggle, 'change', partial(sendEvent, 'bio', 'toggle'));
}

function doCompression(bioCell) {
  bioCell.parentNode.classList.add('fshCompressor');
  injectToggle(bioCell);
  insertElementBefore(
    createLabel({ className: 'sendLink', htmlFor: 'fshCompressToggle' }),
    bioCell,
  );
}

function getFontSize(bioCell) {
  const computedStyle = getComputedStyle(bioCell);
  return parseInt(computedStyle.getPropertyValue('font-size'), 10);
}

export default function compressBio() {
  const bioCell = getElementById('profile-bio');
  if (!bioCell) { return; }
  if (bioCell.clientHeight / getFontSize(bioCell) > 10) {
    doCompression(bioCell);
  }
}
