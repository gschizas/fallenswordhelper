import infoBoxFrom from '../common/InfoBoxFrom';

export function htmlResult(data) {
  var info = infoBoxFrom(data);
  if (info.search(/(successfully|gained|components)/) !== -1) {
    return {s: true};
  }
  return {e: {message: info}, s: false};
}
