var lookup = [
  {
    condition: function(data) {return data.indexOf('(Potion)') !== -1;},
    id: 1
  },
  {
    condition: function(data) {
      return data.indexOf('recalled the item') !== -1;
    },
    id: 2
  },
  {
    condition: function(data) {
      return data.indexOf('took the item') !== -1;
    },
    id: 2
  },
  {
    condition: function(data) {
      return data.indexOf('auto-returned the') !== -1;
    },
    id: 2
  },
  {
    condition: function(data) {
      return data.indexOf('stored the item') !== -1;
    },
    id: 2
  },
  {
    condition: function(data) {
      return data.indexOf('has added flags to') !== -1;
    },
    id: 3
  },
  {
    condition: function(data) {
      return data.indexOf('has removed flags to') !== -1;
    },
    id: 3
  },
  {
    condition: function(data) {
      return data.indexOf(
        'relic. This relic now has an empower level of') !== -1;
    },
    id: 4
  },
  {
    condition: function(data) {
      return data.indexOf(
        'relic. The relic empower level has been reset to zero.') !== -1;
    },
    id: 4
  },
  {
    condition: function(data) {
      return data.indexOf('failed to capture the relic') !== -1;
    },
    id: 4
  },
  {
    condition: function(data) {
      return data.indexOf('captured the relic') !== -1;
    },
    id: 4
  },
  {
    condition: function(data) {
      return data.indexOf('captured your relic') !== -1;
    },
    id: 4
  },
  {
    condition: function(data) {
      return data.indexOf('has captured the undefended relic') !== -1;
    },
    id: 4
  },
  {
    condition: function(data) {
      return data.indexOf('attempted to capture your relic') !== -1;
    },
    id: 4
  },
  {
    condition: function(data) {
      return / empowered the .+ relic/.test(data);
    },
    id: 4
  },
  {
    condition: function(data) {
      return / removed the empowerment from the .+ relic/.test(data);
    },
    id: 4
  },
  {
    condition: function(data) {
      return data.indexOf('disbanded a mercenary.') !== -1;
    },
    id: 5
  },
  {
    condition: function(data) {
      return data.indexOf('hired the mercenary') !== -1;
    },
    id: 5
  },
  {
    condition: function(data) {
      return data.indexOf('has disbanded one of their groups') !== -1;
    },
    id: 6
  },
  {
    condition: function(data) {
      return /A group from your guild was (.*) in combat./.test(data);
    },
    id: 6
  },
  {
    condition: function(data) {
      return /deposited ([,0-9]+) gold into the guild bank/.test(data);
    },
    id: 7
  },
  {
    condition: function(data) {
      var re = /deposited ([,0-9]+) FallenSword Points into the guild./;
      return re.test(data);
    },
    id: 7
  },
  {
    condition: function(data) {
      return data.indexOf('has added a new rank entitled') !== -1;
    },
    id: 8
  },
  {
    condition: function(data) {
      return data.indexOf('has deleted the rank') !== -1;
    },
    id: 8
  },
  {
    condition: function(data) {
      return data.indexOf('has requested to join the guild') !== -1;
    },
    id: 8
  },
  {
    condition: function(data) {
      return data.indexOf('has invited the player') !== -1;
    },
    id: 8
  },
  {
    condition: function(data) {
      return data.indexOf('has officially joined the guild') !== -1;
    },
    id: 8
  },
  {
    condition: function(data) {
      return data.indexOf('has been kicked from the guild by') !== -1;
    },
    id: 8
  },
  {
    condition: function(data) {
      return data.indexOf('has left the guild') !== -1;
    },
    id: 8
  },
  {
    condition: function(data) {
      return data.indexOf('has been assigned the rank') !== -1;
    },
    id: 8
  },
  {
    condition: function(data) {
      return /resulted in (.*) with a final score of/.test(data);
    },
    id: 9
  },
  {
    condition: function(data) {
      return data.indexOf('resulted in a draw. Your GvG rating ' +
        'and Guild RP was unaffected.') !== -1;
    },
    id: 9
  },
  {
    condition: function(data) {
      return data.indexOf(
        'has just initiated a conflict with the guild') !== -1;
    },
    id: 9
  },
  {
    condition: function(data) {
      return data.indexOf('has initiated a conflict with your guild') !== -1;
    },
    id: 9
  },
  {
    condition: function(data) {
      return data.indexOf('is participating in the conflict ' +
        'against the guild') !== -1;
    },
    id: 9
  },
  {
    condition: function(data) {
      return data.indexOf('bought the Titan Reward item') !== -1;
    },
    id: 10
  },
  {
    condition: function(data) {
      return data.indexOf('from your guild\'s contribution to the ' +
        'defeat of the titan') !== -1;
    },
    id: 10
  },
  {
    condition: function(data) {
      return data.indexOf('a 7 day cooldown has been activated ' +
        'on your guild for this titan') !== -1;
    },
    id: 10
  }
];

export function rowProfile(data) {
  var rowId = 0;
  var index = 0;
  while (!rowId && index < lookup.length) {
    var test = lookup[index];
    if (test.condition(data)) {rowId = test.id;}
    index += 1;
  }
  return rowId;
}
