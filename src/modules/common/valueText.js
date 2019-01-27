import getText from './getText';

export default function valueText(collection) {
  return getText(collection[0].nextElementSibling);
}
