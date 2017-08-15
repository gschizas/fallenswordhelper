
export default function loadInventory() {
  return $.ajax({
    url: 'app.php',
    data: {cmd: 'profile', subcmd: 'loadinventory', app: '1'},
    dataType: 'json'
  });
}
