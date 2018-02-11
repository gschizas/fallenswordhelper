export default function getIntFromRegExp(theText, rxSearch) {
  var result;
  var matches = theText.replace(/,/g, '').match(rxSearch);
  if (matches) {
    result = parseInt(matches[1], 10);
  } else {
    result = 0;
  }
  return result;
}
