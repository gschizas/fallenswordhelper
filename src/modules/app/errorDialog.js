function hasErrorMsg(json) {
  return json.e && json.e.message;
}

export default function errorDialog(json) {
  if (!json.s && hasErrorMsg(json)) {
    $('#dialog_msg').html(json.e.message).dialog('open');
    json.r = 1;
  } else {json.r = 0;}
  return json;
}
