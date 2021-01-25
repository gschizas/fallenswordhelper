import { M as arrayFrom, N as navigateTo, O as indexPhp } from './calfSystem-e64be67d.js';

function formToUrl(form) {
  const validInputs = arrayFrom(form.elements)
    .filter((i) => !['button', 'submit'].includes(i.type))
    .filter((i) => i.type !== 'checkbox' || i.checked)
    .map((i) => `${i.name}=${i.value}`)
    .join('&');
  navigateTo(`${indexPhp}?${validInputs}`);
}

export { formToUrl as f };
//# sourceMappingURL=formToUrl-b80842cb.js.map
