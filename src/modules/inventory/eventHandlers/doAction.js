import {imageServer} from '../../system/system';

function removeClass(self) {
  self.closest('tr')
    .find('.takeItem, .recallItem, .wearItem, .dropItem, .sendItem, .storeItem')
    .removeClass().qtip('hide');
}

function killRow(self, data) { // jQuery
  if (data.r === 1) {return;}
  var tr = self.closest('tr');
  var td = $('td', tr);
  td.eq(2).empty(); // Where
  td.eq(12).empty(); // BP - GS
  td.eq(13).empty(); // GS - W/U
  td.eq(14).empty(); // W/U - Tag
  td.eq(15).empty(); // Tag - Drop
  td.eq(16).empty(); // ? - Send
  tr.css('text-decoration', 'line-through');
}

function anotherSpinner(self) {
  self.empty().append('<img src="' + imageServer +
    '/skin/loading.gif" width="11" height="11">');
}

export default function doAction(fn, self) { // jQuery
  removeClass(self);
  fn().done(killRow.bind(null, self));
  anotherSpinner(self);
}
