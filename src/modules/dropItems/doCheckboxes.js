var invItems;
var type;
var itemId;

function testType(o, el) {
  if (type === 'guild') {
    el.checked = !el.disabled && invItems[o.invid].guild_tag !== '-1';
  } else if (type === 'item' && invItems[o.invid].item_id === itemId) {
    el.checked = !el.disabled && !el.checked;
  }
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
