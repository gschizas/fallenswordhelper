import callApp from '../../callApp';

function hasErrorMsg(json) {
  return json.e && json.e.message;
}

function handleFail(json) {
  if (!json.s && hasErrorMsg(json)) {
    $('#dialog_msg').html(json.e.message).dialog('open');
    json.r = 1;
  }
  return json;
}

export default function dostoreitemsSingle(invId) {
  return callApp({
    cmd: 'guild',
    subcmd: 'inventory',
    subcmd2: 'dostoreitems',
    'storeIndex[]': invId
  }).pipe(handleFail);
}
