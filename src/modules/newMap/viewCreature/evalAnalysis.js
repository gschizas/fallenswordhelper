function evalMiss(combat) {
  if (combat.numberOfCreatureHitsTillDead - combat.numberOfHitsRequired <= 1) {
    return ', dies on miss';
  }
  return ', survives a miss';
}

function canIHit(combat) {
  return combat.numberOfHitsRequired === '-' ||
    combat.numberOfHitsRequired > combat.numberOfCreatureHitsTillDead;
}

function evalPlayerHits(combat) {
  if (combat.numberOfCreatureHitsTillDead === '-') {
    return combat.numberOfHitsRequired;
  } else if (canIHit(combat)) {
    return '-';
  }
  return combat.numberOfHitsRequired;
}

function canCreatureHit(combat) {
  return combat.numberOfCreatureHitsTillDead === '-' ||
    combat.numberOfCreatureHitsTillDead > combat.numberOfHitsRequired;
}

function evalCreatureHits(combat) {
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

export default function evalAnalysis(combat) {
  // Analysis:
  combat.playerHits = evalPlayerHits(combat);
  combat.creatureHits = evalCreatureHits(combat);
  var status = evalFightStatus.find(function(el) {return el.test(combat);});
  if (status) {
    combat.fightStatus = status.fStatus(combat);
  } else {
    combat.fightStatus = 'Unknown';
  }
}
