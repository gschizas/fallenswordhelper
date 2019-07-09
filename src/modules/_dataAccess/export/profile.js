import cmdExport from './export';

let cache = {};

export default function profile(username) {
  // return cmdExport({player_username: username, subcmd: 'profile'});
  if (!cache[username]) {
    cache[username] = cmdExport({player_username: username, subcmd: 'profile'});
  }
  return cache[username];
}
