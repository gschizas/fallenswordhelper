export var guildLogFilter5 =
  // '<table id="fshNewGuildLog" class="fshInvFilter">'
  '<thead><tr>' +
  '<th colspan="11"><b>Guild Log Version 5</b></th>' +
  '<th colspan="3"><span id="rfsh" class="sendLink">Reset</span> ' +
  '<a href="index.php?cmd=guild&subcmd=log" class="sendLink">' +
  'Old Guild Log</a></th>' +
  '</tr></thead><tbody>' +
  '<tr><td rowspan="3"><b>&nbsp;Filters:</b></td>' +
  '<td class="fshRight">&nbsp;Potions:</td>' +
  '<td><input type="checkbox" data-item="1"/></td>' +
  '<td class="fshRight">&nbsp;Store/Recalls:</td>' +
  '<td><input type="checkbox" data-item="2"/></td>' +
  '<td class="fshRight">&nbsp;Relics:</td>' +
  '<td><input type="checkbox" data-item="4"/></td>' +
  '<td class="fshRight">&nbsp;Mercenaries:</td>' +
  '<td><input type="checkbox" data-item="5"/></td>' +
  '<td class="fshRight">&nbsp;Group Combats:</td>' +
  '<td><input type="checkbox" data-item="6"/></td>' +
  '<td colspan="3">&nbsp;</td>' +
  '</tr><tr>' +
  '<td class="fshRight">&nbsp;Donations:</td>' +
  '<td><input type="checkbox" data-item="7"/></td>' +
  '<td class="fshRight">&nbsp;Rankings:</td>' +
  '<td><input type="checkbox" data-item="8"/></td>' +
  '<td class="fshRight">&nbsp;GvGs:</td>' +
  '<td><input type="checkbox" data-item="9"/></td>' +
  '<td class="fshRight">&nbsp;Tag/UnTags:</td>' +
  '<td><input type="checkbox" data-item="3"/></td>' +
  '<td class="fshRight">&nbsp;Titans:</td>' +
  '<td><input type="checkbox" data-item="10"/></td>' +
  '<td class="fshRight">&nbsp;Other:</td>' +
  '<td><input type="checkbox" data-item="0"/></td>' +
  '<td>&nbsp;</td>' +
  '</tr><tr>' +
  '<td colspan="2">' +
  '&nbsp;[<span id="fshAll" class="fshLink">Select All</span>]</td>' +
  '<td colspan="2">' +
  '&nbsp;[<span id="fshNone" class="fshLink">Select None</span>]</td>' +
  '<td colspan="9"></td>' +
  '</tr><tr><td id="fshOutput" class="fshBlue" colspan="14">' +
  'Loading ...</td></tr>' +
  '</tbody>';
  // '</table>' +
  // '<table id="fshInjectHere5">' +
  // '</table>';
export var headerRow = '<tbody><tr>' +
  '<td class="header">&nbsp;</td>' +
  '<td class="header">Date</td>' +
  '<td class="header">Message</td>' +
  '</tr></tbody>';
export var msgType = [
  'Unknown', // 0
  'Potion', // 1
  'showRecallMessages', // 2
  'showTaggingMessages', // 3
  'showRelicMessages', // 4
  'showMercenaryMessages', // 5
  'showGroupCombatMessages', // 6
  'showDonationMessages', // 7
  'showRankingMessages', // 8
  'showGvGMessages', // 9
  'showTitanMessages' // 10
];
export var defChecks = [true, true, true, true, true, true,
  true, true, true, true, true];
export var noChecks = [false, false, false, false, false, false,
  false, false, false, false, false];
