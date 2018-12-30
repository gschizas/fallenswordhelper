export default function when(prm, callback) {
  return $.when.apply($, prm).done(callback);
}
