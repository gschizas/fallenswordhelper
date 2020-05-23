import { o as onclick, A as getElementById, l as on, D as getText } from './calfSystem-98d7118c.js';

function setMaxVal() {
  getElementById('composing-skill-level-input').value = getText(getElementById('composing-skill-level-max'));
}

function composingCreate() {
  onclick(getElementById('composing-add-skill'), setMaxVal);
  on(getElementById('composing-skill-select'), 'change', setMaxVal);
}

export default composingCreate;
//# sourceMappingURL=composingCreate-340744b6.js.map
