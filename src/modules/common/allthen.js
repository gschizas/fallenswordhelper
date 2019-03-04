import all from './all';

export default function allthen(prm, callback) {
  return all(prm).then(callback);
}
