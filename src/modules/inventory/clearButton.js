export default function clearButton() { // jQuery
  var input = $('#fshInv_filter input');
  input.prop('type', 'text');
  var clear = $('<span>&times;</span>');
  input.wrap($('<span class="text-input-wrapper"/>'));
  input.after(clear);
  clear.click(function() {
    input.val('');
    $('#fshInv').DataTable().search('').draw();
  });
}
