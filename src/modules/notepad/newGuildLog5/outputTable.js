import {createTable} from '../../common/cElement';
import {getElementById} from '../../common/getElement';
import insertElement from '../../common/insertElement';
import insertHtmlBeforeEnd from '../../common/insertHtmlBeforeEnd';
import on from '../../common/on';
import {pCC} from '../../support/layout';
import partial from '../../common/partial';

var outputTable;

/* function analyseOutput() {
  Array.from(outputTable.rows).forEach(function(el, i) {
    if (i % 2 && el.children.length === 3) {
      console.log(
        i,
        // el.cells[2].textContent,
        el.cells[2].textContent.length,
        el.cells[2].clientHeight
      );
    }
  });
}*/

// https://github.com/julienetie/volve
function debounce(callback, delay) {
  var timeoutId;
  return function() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, delay);
  };
}

function injectTable(myTable) {
  outputTable.replaceChild(myTable.children[0], outputTable.children[0]);
  getElementById('fshOutput').textContent = 'Complete.';
}

function makeRows(myTable, r) {
  insertHtmlBeforeEnd(myTable.tBodies[0], r);
  var sepRow = myTable.insertRow(-1);
  var sep = sepRow.insertCell(-1);
  sep.className = 'divider';
  sep.colSpan = 3;
}

function drawTable(foo) {

  var rectTop = outputTable.getBoundingClientRect().top;
  var topHeight = Math.abs(Math.min(rectTop, 0));
  var topRows = topHeight / 24;
  var numOfVisibleRows = Math.ceil(document.documentElement.clientHeight / 24);
  var remainingRows = foo.length - topRows - numOfVisibleRows;

  var myTable = createTable({innerHTML: '<tbody></tbody>'});

  var topSpace = myTable.insertRow(-1);
  topSpace.style.height = topHeight.toString() + 'px';
  topSpace.insertCell(-1);
  topSpace.insertCell(-1);
  topSpace.insertCell(-1);

  foo.slice(topRows, topRows + numOfVisibleRows - 1)
    .forEach(partial(makeRows, myTable));

  var bottomPadding = myTable.insertRow(-1);
  var remainingHeight = remainingRows * 24;
  bottomPadding.style.height = remainingHeight.toString() + 'px';

  getElementById('fshOutput').textContent = 'Inject table.';
  // add(3, injectTable, [myTable]);
  requestAnimationFrame(partial(injectTable, myTable));
}

export default function initTable(foo) {
  outputTable = createTable({
    className: 'width_full',
    id: 'fshInjectHere5',
    innerHTML: '<tbody></tbody>'
  });
  insertElement(pCC, outputTable);
  drawTable(foo);
  on(window, 'scroll', debounce(partial(drawTable, foo), 0));
}
