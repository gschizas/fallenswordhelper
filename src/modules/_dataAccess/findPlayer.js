import getProfile from '../ajax/getProfile';

function parseReport(json) {
  let last = json.last_login;
  if (!last) {last = 0;}
  return {
    r: [{last_activity: Number(last), vl: json.virtual_level}],
    s: true
  };
}

// Incomplete
export default function findPlayer(username) {
  return getProfile(username).then(parseReport);
}
