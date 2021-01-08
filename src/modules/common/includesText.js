import getTextTrim from './getTextTrim';

export default function includesText(text, el) {
  return getTextTrim(el).includes(text);
}
