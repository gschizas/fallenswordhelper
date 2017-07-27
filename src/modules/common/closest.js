export function closestTable(el) {
  if (el.tagName === 'TABLE') {return el;}
  return closestTable(el.parentNode);
}
