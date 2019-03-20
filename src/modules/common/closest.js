function closest(tag, el) {
  if (el.tagName === tag) {return el;}
  return closest(tag, el.parentNode);
}

export function closestForm(el) {
  return closest('FORM', el);
}

export function closestTable(el) {
  return closest('TABLE', el);
}

export function closestTd(el) {
  return closest('TD', el);
}
