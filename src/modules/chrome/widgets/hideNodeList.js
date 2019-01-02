import hideElement from '../../common/hideElement';

export default function hideNodeList(nodeList) {
  Array.from(nodeList).forEach(hideElement);
}
