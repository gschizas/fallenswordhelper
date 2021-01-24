import arrayFrom from './arrayFrom';
import { indexPhp } from '../support/constants';
import navigateTo from './navigateTo';

export default function formToUrl(form) {
  const validInputs = arrayFrom(form.elements)
    .filter((i) => !['button', 'submit'].includes(i.type))
    .filter((i) => i.type !== 'checkbox' || i.checked)
    .map((i) => `${i.name}=${i.value}`)
    .join('&');
  navigateTo(`${indexPhp}?${validInputs}`);
}
