import { M as arrayFrom, N as indexPhp } from './calfSystem-995e3482.js';

function formToUrl(form) {
  const validInputs = arrayFrom(form.elements)
    .filter((i) => !['button', 'submit'].includes(i.type))
    .filter((i) => i.type !== 'checkbox' || i.checked)
    .map((i) => `${i.name}=${i.value}`)
    .join('&');
  window.location = `${indexPhp}?${validInputs}`;
}

export { formToUrl as f };
//# sourceMappingURL=formToUrl-c6f1dab2.js.map
