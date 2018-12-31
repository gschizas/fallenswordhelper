function onGuildMember(row) {
  return row.player_id && row.player_id !== -1;
}

function isTagged(row) {
  return row.folder_id && row.guild_tag !== -1;
}

export default function canRecall(row) {
  return onGuildMember(row) || isTagged(row);
}
