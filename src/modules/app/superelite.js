import callApp from './callApp';
// import failStub from './failStub';

export default function superelite() {
  return callApp({cmd: 'superelite'});
  // return failStub();
}
