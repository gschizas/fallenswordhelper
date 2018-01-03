export default function failStub() {
  var dfd = $.Deferred();
  dfd.reject('sorry', 'sorry', 'sorry');
  return dfd;
}
