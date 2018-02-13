import {getElementById} from '../common/getElement';

export var pCC = getElementById('pCC');
export var pCR = getElementById('pCR');

export function playerName() {
  return getElementById('statbar-character').textContent;
}
