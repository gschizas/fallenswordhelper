import { d as dialogMsg } from './dialogMsg-1f890a82.js';

function hasErrorMsg(json) {
  return json.e && json.e.message;
}

function errorDialog(json) {
  if (json && !json.s && hasErrorMsg(json)) {
    dialogMsg(json.e.message);
  }
  return json;
}

export { errorDialog as e };
//# sourceMappingURL=errorDialog-c0c5c278.js.map
