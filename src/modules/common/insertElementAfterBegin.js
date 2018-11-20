import insertElementBefore from './insertElementBefore';

export default function insertElementAfterBegin(parentNode, newNode) {
  if (parentNode instanceof Element) {
    insertElementBefore(newNode, parentNode.firstChild);
  }
}
