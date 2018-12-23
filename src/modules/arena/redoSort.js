function testIsNotDesc(test) {
  return test && test[1] === '_desc';
}

function sortHandler(evt) { // jQuery
  var self = $(evt.target).closest('td');
  var table = self.closest('table').DataTable();
  var myCol = self.index();
  var classes = self.attr('class');
  var test = /sorting([^\s]+)/.exec(classes);
  var sortOrder = 'desc';
  if (testIsNotDesc(test)) {sortOrder = 'asc';}
  if (myCol !== 3) {
    table.order([3, 'asc'], [myCol, sortOrder]).draw();
  } else {
    table.order([3, sortOrder]).draw();
  }
}

export default function redoSort(tabs) {
  $('td.sorting, td.sorting_asc, td.sorting_desc', tabs).off('click');
  tabs.on('click', 'td.sorting, td.sorting_asc, td.sorting_desc', sortHandler);
}
