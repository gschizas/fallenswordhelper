export default {
  defStats: '<table class="relicT"><tbody>' +
    '<tr><td colspan="2" class="headr">Defending Guild Stats</td></tr>' +
    '<tr><td class="brn">Relic Count:</td>' +
      '<td id="relicCount">0</td></tr>' +
    '<tr><td class="brn">Lead Defender Bonus:</td>' +
      '<td id="LDPercentage">0</td></tr>' +
    '<tr><td class="brn">Lead Defender Cloaked:</td>' +
      '<td id="LDCloaked">No</td></tr>' +
    '<tr><td colspan="2" class="headr">Other Defender Stats</td></tr>' +
    '<tr><td class="brn">Raw Attack:</td>' +
      '<td class="grey" id="attackValue">0</td></tr>' +
    '<tr><td class="brn">Attack w/ buffs:</td>' +
      '<td id="attackValueBuffed">0</td></tr>' +
    '<tr><td class="brn">Raw Defense:</td>' +
      '<td class="grey" id="defenseValue">0</td></tr>' +
    '<tr><td class="brn">Defense w/buffs:</td>' +
      '<td id="defenseValueBuffed">0</td></tr>' +
    '<tr><td class="brn">Raw Armor:</td>' +
      '<td class="grey" id="armorValue">0</td></tr>' +
    '<tr><td class="brn">Armor w/ buffs:</td>' +
      '<td id="armorValueBuffed">0</td></tr>' +
    '<tr><td class="brn">Raw Damage:</td>' +
      '<td class="grey" id="damageValue">0</td></tr>' +
    '<tr><td class="brn">Damage w/ buffs:</td>' +
      '<td id="damageValueBuffed">0</td></tr>' +
    '<tr><td class="brn">Raw HP:</td>' +
      '<td class="grey" id="hpValue">0</td></tr>' +
    '<tr><td class="brn">HP w/ buffs:</td>' +
      '<td id="hpValueBuffed">0</td></tr>' +
    '<tr><td class="brn">Cloaked:</td>' +
      '<td id="defendersCloaked">0</td></tr>' +
    '<tr><td class="brn">Processed:</td>' +
      '<td id="defendersProcessed">0</td></tr>' +
    '</tbody></table>',
  atkStats: '<table class="relicT"><tbody>' +
    '<tr><td class="headr" colspan="2">Adjusted defense values:</td></tr>' +
    '<tr><td class="brn">DC225:</td>' +
      '<td id="DC225">0</td></tr>' +
    '<tr><td class="brn">DC175:</td>' +
      '<td id="DC175">0</td></tr>' +
    '<tr><td colspan="2">&nbsp;</td></tr>' +
    '<tr><td class="headr" colspan="2">Attacking Group Stats:</td></tr>' +
    '<tr><td class="brn">Raw Group Attack:</td>' +
      '<td class="grey" id="GroupAttack"></td></tr>' +
    '<tr><td class="brn">Group Attack w/ buffs:</td>' +
      '<td id="GroupAttackBuffed"></td></tr>' +
    '<tr><td class="brn">Raw Group Defense:</td>' +
      '<td class="grey" id="GroupDefense"></td></tr>' +
    '<tr><td class="brn">Group Defense w/ buffs:</td>' +
      '<td id="GroupDefenseBuffed"></td></tr>' +
    '<tr><td class="brn">Raw Group Armor:</td>' +
      '<td class="grey" id="GroupArmor"></td></tr>' +
    '<tr><td class="brn">Group Armor w/ buffs:</td>' +
      '<td id="GroupArmorBuffed"></td></tr>' +
    '<tr><td class="brn">Raw Group Damage:</td>' +
      '<td class="grey" id="GroupDamage"></td></tr>' +
    '<tr><td class="brn">Group Damage w/ buffs:</td>' +
      '<td id="GroupDamageBuffed"></td></tr>' +
    '<tr><td class="brn">Raw Group HP:</td>' +
      '<td class="grey" id="GroupHP"></td></tr>' +
    '<tr><td class="brn">Group HP w/ buffs:</td>' +
      '<td id="GroupHPBuffed"></td></tr>' +
    '</tbody></table>',
  proc: '<table class="relicT"><tbody>' +
    '<tr><td class="headr" colspan="2">Processing:</td></tr>' +
    '<tr><td class="fshGreen" colspan="2" id="ProcessingStatus">' +
      'Parsing defending guild stats ...</td></tr>' +
    '<tr><td class="headr" colspan="2">Assumptions:</td></tr>' +
    '<tr><td colspan="2" class="grey">Above calculations include ' +
      'Constitution, Fortitude, Nightmare Visage, Chi Strike, Sanctuary, ' +
      'Terrorize and Flinch bonus calculations (in that order) on both the ' +
      'defending group and attacking group.</td></tr>' +
    '</tbody></table>'
};
