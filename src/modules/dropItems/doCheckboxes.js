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
      el.checked = !el.disabled && invItems[o.invid].guild_tag !== '-1';
    }
  },
  {
    c: function(o) {
      return type === 'item' && invItems[o.invid].item_id === itemId;
    },
    r: tickElement
  },
  {
    c: function() {return type === 'checkAll';},
    r: tickElement
  }
];

function testType(o, el) {
  types.some(function(test) {
    if (test.c(o)) {
      test.r(o, el);
      return true;
    }
    return false;
  });
}

export default function doCheckboxes(itemsAry, invItems_, type_, itemId_) {
  invItems = invItems_;
  type = type_;
  itemId = itemId_;
  itemsAry.forEach(function(o) {
    var tr = o.injectHere.parentNode;
    if (tr.classList.contains('fshHide')) {return;}
    var el = o.el.parentNode.parentNode.previousElementSibling
      .firstElementChild;
    testType(o, el);
  });
}
