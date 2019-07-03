import cmdExport from './export';

export default function profile(username) {
  return cmdExport({player_username: username, subcmd: 'profile'});
}
