export default function getTitanString(guildKills, totalHP, currentHP) {
  const numberOfKillsToSecure = Math.ceil(totalHP / 2 + 1);
  if (guildKills >= numberOfKillsToSecure) {
    return 'Secured';
  }
  const remainingKills = numberOfKillsToSecure - guildKills;
  if (remainingKills > currentHP) {
    return '<span class="fshRed">Cannot Secure</span>';
  }
  return `<span class="fshRed">${remainingKills}</span> to secure`;
}
