import {def_table} from '../support/constants';

var sortClasses = 'td.sorting, td.sorting_asc, td.sorting_desc';

function calculateSortOrder(target) {
  var classes = target.attr('class');
  var test = /sorting([^\s]+)/.exec(classes);
  if (test && test[1] === '_desc') {return 'asc';}
  return 'desc';
}

function sortDataTable(target, myCol, sortOrder) {
  var table = target.closest(def_table).DataTable();
  if (myCol !== 3) {
    table.order([3, 'asc'], [myCol, sortOrder]).draw();
  } else {
    table.order([3, sortOrder]).draw();
  }
}

function sortHandler(evt) { // jQuery
  var target = $(evt.target).closest('td');
  var sortOrder = calculateSortOrder(target);
  sortDataTable(target, target.index(), sortOrder);
}

export default function redoSort(tabs) {
  $(sortClasses, tabs).off('click');
  tabs.on('click', sortClasses, sortHandler);
}
