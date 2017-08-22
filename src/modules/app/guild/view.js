import retryAjax from '../../ajax/retryAjax';

export default function guildView(guildId) {
  return retryAjax({
    url: 'app.php',
    data: {cmd: 'guild', subcmd: 'view', guild_id: guildId, app: '1'},
    dataType: 'json'
  });
}
