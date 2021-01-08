export default function getCooldown() {
  const cooldown = GameData.player().teleportCooldown;
  return cooldown > 1 && cooldown;
}
