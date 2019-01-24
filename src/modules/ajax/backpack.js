import indexAjaxJson from './indexAjaxJson';

export default function backpack() {
  return indexAjaxJson({
    cmd: 'profile',
    subcmd: 'fetchinv'
  });
}
