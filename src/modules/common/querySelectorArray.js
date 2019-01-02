import querySelectorAll from './querySelectorAll';

export default function querySelectorArray(selector, scope) {
  return Array.from(querySelectorAll(selector, scope));
}
