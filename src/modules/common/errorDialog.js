import dialogMsg from './dialogMsg';

function hasErrorMsg(json) {
  return json.e && json.e.message;
}

export default function errorDialog(json) {
  if (json && !json.s && hasErrorMsg(json)) {
    dialogMsg(json.e.message);
  }
  return json;
}
