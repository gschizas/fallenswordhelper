import getText from './getText';

export default function containsText(text, el) {
  return getText(el) === text;
}
