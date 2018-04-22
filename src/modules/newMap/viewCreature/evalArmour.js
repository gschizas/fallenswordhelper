function calcArm(combat) {
  if (combat.callback.groupExists) {
    return combat.callback.groupArmorValue;
  }
  return combat.player.armorValue;
}

function evalSanctuary(combat) {
  if (combat.player.sanctuaryLevel > 0) {
    combat.extraNotes += 'Sanc Bonus Armor = ' +
      Math.floor(combat.player.armorValue *
      combat.player.sanctuaryLevel * 0.001) + '<br>';
  }
}

function evalTerrorize(combat) {
  if (combat.player.terrorizeLevel > 0) {
    combat.extraNotes += 'Terrorize Creature Damage Effect = ' +
      combat.terrorizeEffect * -1 + '<br>';
  }
}

export default function evalArmour(combat) {
  var armorVal = calcArm(combat);
  combat.overallArmorValue = armorVal +
    Math.floor(combat.player.armorValue *
    combat.player.sanctuaryLevel * 0.001);
  evalSanctuary(combat);
  combat.terrorizeEffect = Math.floor(combat.creature.damage *
    combat.player.terrorizeLevel * 0.001);
  evalTerrorize(combat);
  combat.creature.damage -= combat.terrorizeEffect;
  combat.creatureDamageDone = Math.ceil(combat.generalVariable *
    combat.creature.damage - combat.overallArmorValue +
    combat.overallHPValue);
  if (combat.creatureHitByHowMuch >= 0) {
    var approxDmg = combat.generalVariable * combat.creature.damage;
    if (approxDmg < combat.overallArmorValue) {
      combat.numberOfCreatureHitsTillDead = combat.overallHPValue;
    } else {
      combat.numberOfCreatureHitsTillDead = Math.ceil(
        combat.overallHPValue / (approxDmg - combat.overallArmorValue));
    }
  } else {
    combat.numberOfCreatureHitsTillDead = '-';
  }
}
