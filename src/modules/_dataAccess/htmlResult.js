import infoBoxFrom from '../common/InfoBoxFrom';

export function htmlResult(data) {
  var info = infoBoxFrom(data);
  if (info.includes('successfully')) {
    return {s: true};
  }
  return {e: {message: info}, s: false};
}
