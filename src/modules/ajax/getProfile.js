import indexAjaxJson from './indexAjaxJson';

export default function getProfile(username) {
  return indexAjaxJson({
    cmd: 'export',
    subcmd: 'profile',
    player_username: username
  });
}
