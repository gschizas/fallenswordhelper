import callApp from '../callApp';

export default function guildManage() {
  return callApp({cmd: 'guild', subcmd: 'manage', app: '1'});
}
