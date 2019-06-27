import {isArray} from '../../../common/isArray';

function hasTitan(el) {return el.type === 0;}

export default function titanKs() {
  var dynamic = GameData.realm().dynamic;
  return isArray(dynamic) && dynamic.some(hasTitan);
}
