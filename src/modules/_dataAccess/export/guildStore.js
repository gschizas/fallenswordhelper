import cmdExport from './export';

export default function guildStore() {
  return cmdExport({inc_tagged: '1', subcmd: 'guild_store'});
}
