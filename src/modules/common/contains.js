import containsText from './containsText';
import partial from './partial';

export default function contains(text) {
  return partial(containsText, text);
}
