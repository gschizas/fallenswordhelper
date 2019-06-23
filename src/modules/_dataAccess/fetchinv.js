import indexAjaxJson from '../ajax/indexAjaxJson';

function formatResponse(json) {
  // console.log('formatResponse', json);
  return {r: json, s: false};
}

export default function fetchinv() {
  return indexAjaxJson({
    cmd: 'profile',
    subcmd: 'fetchinv'
  }).then(formatResponse);
}
