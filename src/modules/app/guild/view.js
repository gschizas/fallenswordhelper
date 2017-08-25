import callApp from '../callApp';

export default function guildView(guildId) {
  return callApp({cmd: 'guild', subcmd: 'view', guild_id: guildId, app: '1'});
}
