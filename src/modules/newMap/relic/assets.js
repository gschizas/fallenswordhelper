export default {
  defStats: '<table class="relicT relicS"><thead>' +
    '<tr><th colspan="2">Defending Guild Stats</th></tr></thead><tbody>' +
    '<tr><td>Relic Count:</td><td id="relicCount">0</td></tr>' +
    '<tr><td>Lead Defender Bonus:</td><td id="LDPercentage">0</td></tr>' +
    '<tr><td>Lead Defender Cloaked:</td><td id="LDCloaked">No</td></tr>' +
    '</tbody><thead><tr><th colspan="2">Other Defender Stats</th></tr>' +
    '</thead><tbody>' +
    '<tr><td>Raw Attack:</td><td class="fshGrey" id="attackValue">0</td></tr>' +
    '<tr><td>Attack w/ buffs:</td><td id="attackValueBuffed">0</td></tr>' +
    '<tr><td>Raw Defense:</td>' +
      '<td class="fshGrey" id="defenseValue">0</td></tr>' +
    '<tr><td>Defense w/buffs:</td><td id="defenseValueBuffed">0</td></tr>' +
    '<tr><td>Raw Armor:</td><td class="fshGrey" id="armorValue">0</td></tr>' +
    '<tr><td>Armor w/ buffs:</td><td id="armorValueBuffed">0</td></tr>' +
    '<tr><td>Raw Damage:</td><td class="fshGrey" id="damageValue">0</td></tr>' +
    '<tr><td>Damage w/ buffs:</td><td id="damageValueBuffed">0</td></tr>' +
    '<tr><td>Raw HP:</td><td class="fshGrey" id="hpValue">0</td></tr>' +
    '<tr><td>HP w/ buffs:</td><td id="hpValueBuffed">0</td></tr>' +
    '<tr><td>Cloaked:</td><td id="defendersCloaked">0</td></tr>' +
    '<tr><td>Processed:</td><td id="defendersProcessed">0</td></tr>' +
    '</tbody></table>',
  atkStats: '<table class="relicT relicS"><thead>' +
    '<tr><th colspan="2">Adjusted defense values</th></tr></thead><tbody>' +
    '<tr><td>DC225:</td><td id="DC225">0</td></tr>' +
    '<tr><td>DC175:</td><td id="DC175">0</td></tr>' +
    '<tr><td colspan="2">&nbsp;</td></tr></tbody><thead>' +
    '<tr><th colspan="2">Attacking Group Stats</th></tr></thead><tbody>' +
    '<tr><td>Raw Group Attack:</td>' +
      '<td class="fshGrey" id="GroupAttack"></td></tr>' +
    '<tr><td>Group Attack w/ buffs:</td><td id="GroupAttackBuffed"></td></tr>' +
    '<tr><td>Raw Group Defense:</td>' +
      '<td class="fshGrey" id="GroupDefense"></td></tr>' +
    '<tr><td>Group Defense w/ buffs:</td>' +
      '<td id="GroupDefenseBuffed"></td></tr>' +
    '<tr><td>Raw Group Armor:</td>' +
      '<td class="fshGrey" id="GroupArmor"></td></tr>' +
    '<tr><td>Group Armor w/ buffs:</td><td id="GroupArmorBuffed"></td></tr>' +
    '<tr><td>Raw Group Damage:</td>' +
      '<td class="fshGrey" id="GroupDamage"></td></tr>' +
    '<tr><td>Group Damage w/ buffs:</td><td id="GroupDamageBuffed"></td></tr>' +
    '<tr><td>Raw Group HP:</td><td class="fshGrey" id="GroupHP"></td></tr>' +
    '<tr><td>Group HP w/ buffs:</td><td id="GroupHPBuffed"></td></tr>' +
    '</tbody></table>',
  proc: '<table class="relicT">' +
    '<thead><tr><th colspan="2">Processing</th></tr></thead><tbody>' +
    '<tr><td class="fshGreen" colspan="2" id="ProcessingStatus">' +
      'Parsing defending guild stats ...</td></tr>' +
    '</tbody><thead><tr><th colspan="2">Assumptions</th></tr></thead><tbody>' +
    '<tr><td colspan="2" class="fshGrey">Above calculations include ' +
      'Constitution, Fortitude, Nightmare Visage, Chi Strike, Sanctuary, ' +
      'Terrorize and Flinch bonus calculations (in that order) on both the ' +
      'defending group and attacking group.</td></tr>' +
    '</tbody></table>'
};
