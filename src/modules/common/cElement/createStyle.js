import cElement from './cElement';

export default function createStyle(style) {
  return cElement('style', { innerHTML: style });
}
