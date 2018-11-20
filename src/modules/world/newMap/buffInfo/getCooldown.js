export default function getCooldown() {
  var cooldown = GameData.player().teleportCooldown;
  return cooldown > 1 && cooldown;
}
