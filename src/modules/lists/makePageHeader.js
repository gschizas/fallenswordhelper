export default function makePageHeader(title, comment, spanId, button) {
  var _comment = '';
  if (comment !== '') {_comment = '&nbsp;(' + comment + ')';}
  var _span = '';
  if (spanId) {
    _span = '[<span class="fshLink" id="' +
      spanId + '">' + button + '</span>]';
  }
  return '<table width=100%><tbody><tr class="fshHeader">' +
    '<td width="90%"><b>&nbsp;' + title + '</b>' + _comment +
    '<td width="10%" class="fshBtnBox">' + _span +
    '</td></tr><tbody></table>';
}
