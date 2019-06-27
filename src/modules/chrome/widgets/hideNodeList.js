import {arrayFrom} from '../../common/arrayFrom';
import hideElement from '../../common/hideElement';

export default function hideNodeList(nodeList) {
  arrayFrom(nodeList).forEach(hideElement);
}
