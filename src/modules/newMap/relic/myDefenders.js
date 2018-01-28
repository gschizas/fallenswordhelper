export var myDefenders;

export function defendersSetup(relicData) {
  myDefenders = relicData.defenders.map(function(x) {
    return x.player_name;
  });
}
