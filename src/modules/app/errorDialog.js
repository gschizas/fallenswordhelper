import dialogMsg from '../common/dialogMsg';

function hasErrorMsg(json) {
  return json.e && json.e.message;
}

export default function errorDialog(json) {
  if (!json.s && hasErrorMsg(json)) {
    dialogMsg(json.e.message);
  }
  return json;
}
