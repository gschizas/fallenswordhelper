function calcHp(combat) {
  if (combat.callback.groupExists) {
    return combat.callback.groupHPValue;
  }
  return combat.player.hpValue;
}

function calcDmg(combat) {
  if (combat.callback.groupExists) {
    return combat.callback.groupDamageValue;
  }
  return combat.player.damageValue;
}

function evalFortitude(combat) {
  var hpValue = calcHp(combat);
  var fortitudeLevel = combat.player.fortitudeLevel;
  combat.fortitudeExtraHPs = Math.floor(hpValue * fortitudeLevel * 0.001);
  if (fortitudeLevel > 0) {
    combat.extraNotes += 'Fortitude Bonus HP = ' + combat.fortitudeExtraHPs +
      '<br>';
  }
  combat.overallHPValue = hpValue + combat.fortitudeExtraHPs;
}

function evalChiStrike(combat) {
  var chiStrikeLevel = combat.player.chiStrikeLevel;
  combat.chiStrikeExtraDamage = Math.floor(combat.overallHPValue *
    chiStrikeLevel * 0.001);
  if (chiStrikeLevel > 0) {
    combat.extraNotes += 'Chi Strike Bonus Damage = ' +
      combat.chiStrikeExtraDamage + '<br>';
  }
}

export default function evalDamage(combat) {
  // Damage:
  evalFortitude(combat);
  evalChiStrike(combat);

  var damageValue = calcDmg(combat);
  combat.overallDamageValue = damageValue +
    combat.deathDealerBonusDamage + combat.counterAttackBonusDamage +
    combat.holyFlameBonusDamage + combat.chiStrikeExtraDamage;
  combat.damageDone = Math.floor(combat.overallDamageValue - (
    combat.generalVariable * combat.creature.armor +
    combat.hpVariable * combat.creature.hp));

  if (combat.hitByHowMuch > 0) {
    var dmgLessArmor = 1;
    if (combat.overallDamageValue >=
        combat.generalVariable * combat.creature.armor) {
      dmgLessArmor = combat.overallDamageValue - combat.generalVariable *
        combat.creature.armor;
    }
    combat.numberOfHitsRequired = Math.ceil(combat.hpVariable *
      combat.creature.hp / dmgLessArmor);
  } else {
    combat.numberOfHitsRequired = '-';
  }
}
