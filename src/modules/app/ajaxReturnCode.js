export default function ajaxReturnCode(json) {
  if (!json.s) {json.r = 1;} else {json.r = 0;}
  return json;
}
