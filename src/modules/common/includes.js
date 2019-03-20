import includesText from './includesText';
import partial from './partial';

export default function includes(text) {
  return partial(includesText, text);
}
