export default function getBuff(name) {
  return GameData.player().buffs.find(function(e) {return e.name === name;});
}
