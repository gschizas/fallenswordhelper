function doesGroupExist(combat) {
  if (combat.callback.groupExists) {return 'Group ';}
  return '';
}

function headerRow(combat) {
  return '<tr><td bgcolor="#CD9E4B" colspan="4" align="center">' +
    doesGroupExist(combat) + 'Combat Evaluation</td></tr>';
}

function canIHitIt(combat) {
  if (combat.hitByHowMuch > 0) {return 'Yes';}
  return 'No';
}

function willIHitItRow(combat) {
  return '<tr><td align="right"><span style="color:#333333">' +
    'Will I hit it? </td><td align="left">' + canIHitIt(combat) +
    '</td><td align="right"><span style="color:#333333">' +
    'Extra Attack: </td><td align="left">( ' +
    combat.hitByHowMuch + ' )</td></tr>';
}

function numberOfHitsRequiredRow(combat) {
  return '<tr><td align="right"><span style="color:#333333">' +
    '# Hits to kill it? </td><td align="left">' +
    combat.numberOfHitsRequired +
    '</td><td align="right"><span style="color:#333333">' +
    'Extra Damage: </td><td align="left">( ' + combat.damageDone +
    ' )</td></tr>';
}

function willIBeHit(combat) {
  if (combat.creatureHitByHowMuch >= 0) {return 'Yes';}
  return 'No';
}

function willIBeHitRow(combat) {
  return '<tr><td align="right"><span style="color:#333333">' +
    'Will I be hit? </td><td align="left">' + willIBeHit(combat) +
    '</td><td align="right"><span style="color:#333333">' +
    'Extra Defense: </td><td align="left">( ' + -1 *
    combat.creatureHitByHowMuch + ' )</td></tr>';
}

function hitsToKillMeRow(combat) {
  return '<tr><td align="right"><span style="color:#333333">' +
    '# Hits to kill me? </td><td align="left">' +
    combat.numberOfCreatureHitsTillDead +
    '</td><td align="right"><span style="color:#333333">' +
    'Extra Armor + HP: </td><td align="left">( ' + -1 *
    combat.creatureDamageDone + ' )</td></tr>';
}

function numberOfHitsRow(combat) {
  return '<tr><td align="right"><span style="color:#333333">' +
    '# Player Hits? </td><td align="left">' + combat.playerHits +
    '</td><td align="right"><span style="color:#333333">' +
    '# Creature Hits? </td><td align="left">' + combat.creatureHits +
    '</td></tr>';
}

function fightStatusRow(combat) {
  return '<tr><td align="right"><span style="color:#333333">' +
    'Fight Status: </span></td><td align="left" colspan="3"><span>' +
    combat.fightStatus + '</span></td></tr>';
}

function notesRow(combat) {
  return '<tr><td align="right"><span style="color:#333333">' +
    'Notes: </span></td><td align="left" colspan="3">' +
    '<span style="font-size:x-small;">' + combat.extraNotes +
    '</span></td></tr>';
}

export default function evalHTML(combat) {
  return '<table width="100%"><tbody>' +
    headerRow(combat) +
    willIHitItRow(combat) +
    numberOfHitsRequiredRow(combat) +
    willIBeHitRow(combat) +
    hitsToKillMeRow(combat) +
    numberOfHitsRow(combat) +
    fightStatusRow(combat) +
    notesRow(combat) +
    '</tbody></table>';
}
