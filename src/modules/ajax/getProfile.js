import retryAjax from './retryAjax';

export default function getProfile(username) {
  return retryAjax({
    url: 'index.php',
    data: {
      cmd: 'export',
      subcmd: 'profile',
      player_username: username
    },
    dataType: 'json'
  });
}
