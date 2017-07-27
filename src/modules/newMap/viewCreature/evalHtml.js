function doesGroupExist(combat) {
  if (combat.callback.groupExists) {return 'Group ';}
  return '';
}

function canIHitIt(combat) {
  if (combat.hitByHowMuch > 0) {return 'Yes';}
  return 'No';
}

function willIBeHit(combat) {
  if (combat.creatureHitByHowMuch >= 0) {return 'Yes';}
  return 'No';
}

export default function evalHTML(combat) {
  return '<table width="100%"><tbody>' +
    '<tr><td bgcolor="#CD9E4B" colspan="4" align="center">' +
    doesGroupExist(combat) +
    'Combat Evaluation</td></tr>' +
    '<tr><td align="right"><span style="color:#333333">' +
    'Will I hit it? </td><td align="left">' +
    canIHitIt(combat) +
    '</td><td align="right"><span style="color:#333333">' +
    'Extra Attack: </td><td align="left">( ' +
    combat.hitByHowMuch + ' )</td></tr>' +
    '<tr><td align="right"><span style="color:#333333">' +
    '# Hits to kill it? </td><td align="left">' +
    combat.numberOfHitsRequired +
    '</td><td align="right"><span style="color:#333333">' +
    'Extra Damage: </td><td align="left">( ' + combat.damageDone +
    ' )</td></tr>' +
    '<tr><td align="right"><span style="color:#333333">' +
    'Will I be hit? </td><td align="left">' +
    willIBeHit(combat) +
    '</td><td align="right"><span style="color:#333333">' +
    'Extra Defense: </td><td align="left">( ' + -1 *
    combat.creatureHitByHowMuch + ' )</td></tr>' +
    '<tr><td align="right"><span style="color:#333333">' +
    '# Hits to kill me? </td><td align="left">' +
    combat.numberOfCreatureHitsTillDead +
    '</td><td align="right"><span style="color:#333333">' +
    'Extra Armor + HP: </td><td align="left">( ' + -1 *
    combat.creatureDamageDone + ' )</td></tr>' +
    '<tr><td align="right"><span style="color:#333333">' +
    '# Player Hits? </td><td align="left">' + combat.playerHits +
    '</td><td align="right"><span style="color:#333333">' +
    '# Creature Hits? </td><td align="left">' + combat.creatureHits +
    '</td></tr>' +
    '<tr><td align="right"><span style="color:#333333">' +
    'Fight Status: </span></td><td align="left" colspan="3"><span>' +
    combat.fightStatus + '</span></td></tr>' +
    '<tr><td align="right"><span style="color:#333333">' +
    'Notes: </span></td><td align="left" colspan="3">' +
    '<span style="font-size:x-small;">' + combat.extraNotes +
    '</span></td></tr>' +
    '<tr><td colspan="4"><span style="font-size:x-small; ' +
    'color:gray">*Does include CA, DD, HF, DC, Flinch, Super Elite ' +
    'Slayer, NMV, Sanctuary, Constitution, Fortitude, Chi Strike ' +
    'and Terrorize (if active) and allow for randomness (1.1053). ' +
    'Constitution, NMV, Fortitude and Chi Strike apply to group ' +
    'stats.</span></td></tr>' +
    '</tbody></table>';
}
