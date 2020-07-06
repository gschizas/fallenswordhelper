import { c as cmdExport } from './cmdExport-4dceba5b.js';

const cache = {};

function profile(username) {
  // return cmdExport({player_username: username, subcmd: 'profile'});
  if (!cache[username]) {
    cache[username] = cmdExport({ player_username: username, subcmd: 'profile' });
  }
  return cache[username];
}

function getProfile(username) {
  return profile(username);
}

export { getProfile as g };
//# sourceMappingURL=getProfile-51860894.js.map
