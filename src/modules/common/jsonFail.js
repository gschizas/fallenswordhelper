import outputResult from './outputResult';

var lastMsg;

export default function jsonFail(json, handle) {
  if (!json.success && lastMsg !== json.error.message) {
    lastMsg = json.error.message;
    outputResult(json.error.message, handle);
  }
  if (!json.success) {return true;}
}
