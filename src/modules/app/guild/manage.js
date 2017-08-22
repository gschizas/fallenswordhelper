import retryAjax from '../../ajax/retryAjax';

export default function guildManage() {
  return retryAjax({
    url: 'app.php',
    data: {cmd: 'guild', subcmd: 'manage', app: '1'},
    dataType: 'json'
  });
}
