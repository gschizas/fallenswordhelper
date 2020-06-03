import { d as dialogMsg } from './dialogMsg-cdeff92d.js';

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
//# sourceMappingURL=errorDialog-1630e28b.js.map
