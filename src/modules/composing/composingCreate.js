import {getElementById} from '../common/getElement';
import on from '../common/on';

function setMaxVal() {
  getElementById('composing-skill-level-input').value =
    getElementById('composing-skill-level-max').textContent;
}

export default function composingCreate() {
  on(getElementById('composing-add-skill'), 'click', setMaxVal);
  on(getElementById('composing-skill-select'), 'change', setMaxVal);
}
