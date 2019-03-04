import partial from '../../common/partial';

function clearSearch(fshInv, input) {
  input.val('');
  $(fshInv).DataTable().search('').draw();
}

export default function clearButton(fshInv) { // jQuery
  var input = $('#' + fshInv.id + '_filter input');
  input.prop('type', 'text');
  var clear = $('<span>&times;</span>');
  input.wrap($('<span class="text-input-wrapper"/>'));
  input.after(clear);
  clear.on('click', partial(clearSearch, fshInv, input));
}
