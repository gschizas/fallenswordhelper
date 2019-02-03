import partial from '../../../common/partial';

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
  [
    function(combat) {
      return combat.playerHits === '-' && combat.creatureHits === '-';
    },
    function() {return 'Unresolved';}
  ],
  [
    function(combat) {return combat.playerHits === '-';},
    function() {return 'Player dies';}
  ],
  [
    function(combat) {return combat.playerHits === 1;},
    function(combat) {return 'Player 1 hits' + evalMiss(combat);}
  ],
  [
    function(combat) {return combat.playerHits > 1;},
    function(combat) {return 'Player > 1 hits' + evalMiss(combat);}
  ]
];

function condition(combat, el) {return el[0](combat);}

function getStatus(combat) {
  var status = evalFightStatus.find(partial(condition, combat));
  if (status) {
    return status[1](combat);
  }
  return 'Unknown';
}

export default function evalAnalysis(combat) {
  // Analysis:
  combat.playerHits = evalPlayerHits(combat);
  combat.creatureHits = evalCreatureHits(combat);
  combat.fightStatus = getStatus(combat);
}
