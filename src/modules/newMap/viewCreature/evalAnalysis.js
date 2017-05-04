
function evalMiss(combat) { // Native
  if (combat.numberOfCreatureHitsTillDead - combat.numberOfHitsRequired <= 1) {
    return ', dies on miss';
  }
  return ', survives a miss';
}

function canIHit(combat) { // Native
  return combat.numberOfHitsRequired === '-' ||
    combat.numberOfHitsRequired > combat.numberOfCreatureHitsTillDead;
}

function evalPlayerHits(combat) { // Native
  if (combat.numberOfCreatureHitsTillDead === '-') {
    return combat.numberOfHitsRequired;
  } else if (canIHit(combat)) {
    return '-';
  }
  return combat.numberOfHitsRequired;
}

function canCreatureHit(combat) { // Native
  return combat.numberOfCreatureHitsTillDead === '-' ||
    combat.numberOfCreatureHitsTillDead > combat.numberOfHitsRequired;
}

function evalCreatureHits(combat) { // Native
  if (combat.numberOfHitsRequired === '-') {
    return combat.numberOfCreatureHitsTillDead;
  } else if (canCreatureHit(combat)) {
    return '-';
  }
  return combat.numberOfCreatureHitsTillDead;
}

var evalFightStatus = [
  {
    test: function(combat) {
      return combat.playerHits === '-' && combat.creatureHits === '-';
    },
    fStatus: function() {return 'Unresolved';}
  },
  {
    test: function(combat) {return combat.playerHits === '-';},
    fStatus: function() {return 'Player dies';}
  },
  {
    test: function(combat) {return combat.playerHits === 1;},
    fStatus: function(combat) {return 'Player 1 hits' + evalMiss(combat);}
  },
  {
    test: function(combat) {return combat.playerHits > 1;},
    fStatus: function(combat) {return 'Player > 1 hits' + evalMiss(combat);}
  }
];

export default function evalAnalysis(combat) { // Native
  // Analysis:
  combat.playerHits = evalPlayerHits(combat);
  combat.creatureHits = evalCreatureHits(combat);
  for (var i = 0; i < evalFightStatus.length; i += 1) {
    if (evalFightStatus[i].test(combat)) {
      combat.fightStatus = evalFightStatus[i].fStatus(combat);
      return combat;
    }
  }
  combat.fightStatus = 'Unknown';
  return combat;
}
