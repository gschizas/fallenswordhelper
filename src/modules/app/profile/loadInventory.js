import retryAjax from '../../ajax/retryAjax';

export default function loadInventory() {
  return retryAjax({
    url: 'app.php',
    data: {cmd: 'profile', subcmd: 'loadinventory', app: '1'},
    dataType: 'json'
  });
}
