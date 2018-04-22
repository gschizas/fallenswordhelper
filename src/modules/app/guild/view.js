import guild from './guild';

export default function guildView(guildId) {
  return guild({subcmd: 'view', guild_id: guildId});
}
