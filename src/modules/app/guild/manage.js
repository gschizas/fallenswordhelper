import guild from './guild';

let cache;

export default function guildManage() {
  if (!cache) {
    cache = guild({subcmd: 'manage'});
  }
  return cache;
}
