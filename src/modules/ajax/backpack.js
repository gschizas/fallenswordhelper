import retryAjax from './retryAjax';

export default function backpack() {
  return retryAjax({
    url: 'index.php',
    data: {cmd: 'profile', subcmd: 'fetchinv'},
    dataType: 'json'
  });
}
