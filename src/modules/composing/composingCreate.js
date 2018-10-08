import {getElementById} from '../common/getElement';

function setMaxVal() {
  getElementById('composing-skill-level-input').value =
    getElementById('composing-skill-level-max').textContent;
}

export default function composingCreate() {
  getElementById('composing-add-skill').addEventListener('click', setMaxVal);
  getElementById('composing-skill-select')
    .addEventListener('change', setMaxVal);
}
