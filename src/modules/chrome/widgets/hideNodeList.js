import hideElement from '../../common/hideElement';

export default function hideNodeList(nodeList) {
  Array.prototype.forEach.call(nodeList, hideElement);
}
