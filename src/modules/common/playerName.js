import {getElementById} from '../common/getElement';

export default function playerName() {
  return getElementById('statbar-character').textContent;
}
