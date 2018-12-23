export var moveOptions =
  '<td colspan=3 ' +
  'style="padding-top: 2px;padding-bottom: 2px;">' +
  '<select style="max-width: 50px;">' +
  '<option value="x">Basic Attack</option>' +
  '<option value="0">Block</option>' +
  '<option value="1">Counter Attack</option>' +
  '<option value="2">Critical Hit</option>' +
  '<option value="3">Defend</option>' +
  '<option value="4">Deflect</option>' +
  '<option value="5">Dodge</option>' +
  '<option value="6">Lunge</option>' +
  '<option value="7">Power Attack</option>' +
  '<option value="8">Spin Attack</option>' +
  '<option value="9">Piercing Strike</option>' +
  '<option value="10">Crush</option>' +
  '<option value="11">Weaken</option>' +
  '<option value="12">Ice Shard</option>' +
  '<option value="13">Fire Blast</option>' +
  '<option value="14">Poison</option>' +
  '</select></td>';
export var tableOpts = {
  columnDefs: [
    {orderable: false, targets: [9]}
  ],
  dom: 't',
  info: false,
  order: [[3, 'asc'], [0, 'asc']],
  paging: false,
  stateSave: true,
  stateDuration: 0
};
export var arenaFilter =
  '<table width="100%"><tbody><tr><td>' +
  '<span class="fshBlue"><input id="fshHideMoves" type="checkbox">' +
  '&nbsp;Hide Matches for Completed Moves</span></td><td align="right">' +
  '<span class="fshBlue">Min lvl:&nbsp;<input id="fshMinLvl" size="5">' +
  '&nbsp;Max lvl:&nbsp;<input id="fshMaxLvl" size="5">&nbsp;&nbsp;' +
  '<input id="fshReset" class="custombutton" type="button" ' +
  'value="Reset"></span></td></tr></tbody></table>';

export function dontPost(e) { // jQuery
  e.preventDefault();
  var self = $(e.target);
  var pvpId = self.prev().val();
  var subcmd = self.prev().prev().val();
  window.location = 'index.php?cmd=arena&subcmd=' + subcmd +
    '&pvp_id=' + pvpId;
}
