import indexAjax from './indexAjax';

export default function backpack() {
  return indexAjax({
    data: {cmd: 'profile', subcmd: 'fetchinv'},
    dataType: 'json'
  });
}
