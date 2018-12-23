var invItems;
var type;
var itemId;

function tickElement(o, el) {
  el.checked = !el.disabled && !el.checked;
}

var types = [
  {
    c: function() {return type === 'guild';},
    r: function(o, el) {
      el.checked = !el.disabled && invItems[o.invid].guild_tag !== -1;
    }
  },
  {
    c: function(o) {
      return type === 'item' && invItems[o.invid] &&
        invItems[o.invid].item_id === itemId;
    },
    r: tickElement
  },
  {
    c: function() {return type === 'checkAll';},
    r: tickElement
  }
];

function testType(o, el) {
  var match = types.find(function(test) {
    return test.c(o);
  });
  if (match) {match.r(o, el);}
}

function doCheck(o) {
  if (!o.injectHere) {return;}
  var tr = o.injectHere.parentNode;
  if (tr.classList.contains('fshHide')) {return;}
  var el = o.el.parentNode.parentNode.previousElementSibling
    .firstElementChild;
  testType(o, el);
}

export default function doCheckboxes(itemsAry, invItems_, type_, itemId_) {
  invItems = invItems_;
  type = type_;
  itemId = Number(itemId_);
  itemsAry.forEach(doCheck);
}
