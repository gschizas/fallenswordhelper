import getTextTrim from './getTextTrim';

export default function containsText(text, el) {
  return getTextTrim(el) === text;
}
