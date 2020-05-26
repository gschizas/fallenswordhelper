import { d as dialogMsg } from './dialogMsg-2350aeb0.js';

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
//# sourceMappingURL=errorDialog-397bf548.js.map
