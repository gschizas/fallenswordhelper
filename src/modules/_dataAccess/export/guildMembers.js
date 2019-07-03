import cmdExport from './export';

export default function guildMembers(guildId) {
  return cmdExport({guild_id: guildId, subcmd: 'guild_members'});
}
