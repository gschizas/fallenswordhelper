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
export var fshArenaKey = 'fsh_arena';
export const moveRe = /\/arena\/(\d+)\.png/;
