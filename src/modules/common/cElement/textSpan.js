import createSpan from './createSpan';

export default function textSpan(text) {
  return createSpan({ textContent: text });
}
