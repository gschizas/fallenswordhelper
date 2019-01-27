import {getElementById} from '../common/getElement';
import getText from '../common/getText';
import on from '../common/on';

function setMaxVal() {
  getElementById('composing-skill-level-input').value =
    getText(getElementById('composing-skill-level-max'));
}

export default function composingCreate() {
  on(getElementById('composing-add-skill'), 'click', setMaxVal);
  on(getElementById('composing-skill-select'), 'change', setMaxVal);
}
