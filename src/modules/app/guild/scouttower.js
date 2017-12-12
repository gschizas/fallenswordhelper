import callApp from '../callApp';

export default function scouttower() {
  return callApp({cmd: 'guild', subcmd: 'scouttower'});
}
