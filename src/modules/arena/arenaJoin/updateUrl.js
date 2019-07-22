import {arrayFrom} from '../../common/arrayFrom';
import {indexPhp} from '../../support/constants';

export default function updateUrl(e) {
  e.preventDefault();
  const validInputs = arrayFrom(e.target.closest('form').elements)
    .filter(i => i.type !== 'submit')
    .map(i => i.name + '=' + i.value)
    .join('&');
  window.location = `${indexPhp}?${validInputs}`;
}
