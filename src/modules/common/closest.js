export function closestTable(el) { // Native
  if (el.tagName === 'TABLE') {return el;}
  return closestTable(el.parentNode);
}
