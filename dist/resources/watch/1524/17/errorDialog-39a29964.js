import { d as dialogMsg } from './dialogMsg-3ee1599c.js';

function hasErrorMsg(json) {
  return json.e && json.e.message;
}

function errorDialog(json) {
  if (!json.s && hasErrorMsg(json)) {
    dialogMsg(json.e.message);
  }
  return json;
}

export { errorDialog as e };
//# sourceMappingURL=errorDialog-39a29964.js.map
