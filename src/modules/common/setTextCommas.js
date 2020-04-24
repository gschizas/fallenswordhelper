import addCommas from '../system/addCommas';
import setText from '../dom/setText';

export default function setTextCommas(value, node) {
  setText(addCommas(value), node);
}
