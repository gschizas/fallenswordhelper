import indexAjax from './indexAjax';

export default function getProfile(username) {
  return indexAjax({
    data: {
      cmd: 'export',
      subcmd: 'profile',
      player_username: username
    },
    dataType: 'json'
  });
}
