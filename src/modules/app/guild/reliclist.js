import guild from './guild';

export default function reliclist(guildId, offset, limit) {
  const data = {
    subcmd: 'reliclist',
    offset,
    limit,
  };

  if (guildId) { data.guild_id = guildId; }

  return guild(data);
}
