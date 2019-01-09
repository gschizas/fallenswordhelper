import partial from '../../common/partial';

var costFormatter = [
  [
    function(total) {return total.fsp > 0;},
    function(total) {
      return String(Math.round(total.fsp * 100) / 100) + ' FSP';
    }
  ],
  [
    function(total) {return total.fsp > 0 && total.k > 0;},
    function() {return ' and ';}
  ],
  [
    function(total) {return total.k > 0;},
    function(total) {return total.k + ' k';}
  ],
  [
    function(total) {
      return total.stam > 0 && (total.fsp > 0 || total.k > 0);
    },
    function() {return ' and ';}
  ],
  [
    function(total) {return total.stam > 0;},
    function(total) {
      return total.stam + ' Stam(' +
        String(Math.round(total.stam / 25 * 10) / 10) + 'fsp)';
    }
  ],
  [
    function(total) {return total.unknown > 0;},
    function(total) {
      return ' (' + total.unknown + ' buff(s) with unknown cost)';
    }
  ]
];

function costElement(total, el) {
  if (el[0](total)) {
    return el[1](total);
  }
  return '';
}

export default function formatCost(total) {
  return costFormatter.map(partial(costElement, total)).join('');
}
