/* eslint-disable no-param-reassign */
function calcAttack(combat) {
  if (combat.callback.groupExists) {
    return combat.callback.groupAttackValue;
  }
  return combat.player.attackValue;
}

function calcHitByHowMuch(combat) {
  const remainingDef = combat.creature.defense - combat.creature.defense
    * combat.player.darkCurseLevel * 0.002;
  if (combat.combatEvaluatorBias === 3) {
    return combat.overallAttackValue - Math.ceil(remainingDef) - 50;
  }
  return combat.overallAttackValue
    - Math.ceil(combat.attackVariable * remainingDef);
}

export default function evalAttack(combat) {
  const atkValue = calcAttack(combat);
  // Attack:
  if (combat.player.darkCurseLevel > 0) {
    combat.extraNotes += `DC Bonus Attack = ${
      Math.floor(combat.creature.defense
      * combat.player.darkCurseLevel * 0.002)}<br>`;
  }
  combat.nightmareVisageAttackMovedToDefense = Math.floor((atkValue
    + combat.counterAttackBonusAttack)
    * combat.player.nightmareVisageLevel * 0.0025);
  if (combat.player.nightmareVisageLevel > 0) {
    combat.extraNotes += `NMV Attack moved to Defense = ${
      combat.nightmareVisageAttackMovedToDefense}<br>`;
  }
  combat.overallAttackValue = atkValue
    + combat.counterAttackBonusAttack
    - combat.nightmareVisageAttackMovedToDefense;
  combat.hitByHowMuch = calcHitByHowMuch(combat);
}
