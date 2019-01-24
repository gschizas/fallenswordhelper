import indexAjaxData from './indexAjaxData';

export default function guildManage() {
  return indexAjaxData({
    cmd: 'guild',
    subcmd: 'manage'
  });
}
