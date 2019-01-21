import textContent from './textContent';

export default function containsText(text, el) {
  return textContent(el) === text;
}
