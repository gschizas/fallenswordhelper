import indexAjaxJson from '../ajax/indexAjaxJson';

export default function backpack() {
  return indexAjaxJson({
    cmd: 'profile',
    subcmd: 'fetchinv'
  });
}
