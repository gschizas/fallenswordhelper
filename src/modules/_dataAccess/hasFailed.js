import isObject from '../common/isObject';

const tests = [
  json => isObject(json),
  json => 's' in json,
  json => !json.s,
  json => 'e' in json,
  json => json.e.message === 'Unknown Command'
];

export default function hasFailed(json) {
  return tests.every(f => f(json));
}
