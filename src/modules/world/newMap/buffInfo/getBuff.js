export default function getBuff(name) {
  var buffs = GameData.player().buffs;
  if (buffs) {
    return buffs.find(function(e) {return e.name === name;});
  }
}
