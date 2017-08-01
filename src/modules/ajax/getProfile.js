export default function getProfile(username) {
  return $.getJSON('index.php', {
    cmd: 'export',
    subcmd: 'profile',
    player_username: username
  });
}
