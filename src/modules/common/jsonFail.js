import outputResult from './outputResult';

var lastMsg;

export default function jsonFail(json, handle) {
  if (!json.s && lastMsg !== json.e.message) {
    lastMsg = json.e.message;
    outputResult(json.e.message, handle);
  }
  if (!json.s) {return true;}
}
