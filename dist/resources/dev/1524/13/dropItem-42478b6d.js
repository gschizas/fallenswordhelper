import{G as e,bF as r}from"./calfSystem-01eb06ed.js"
import{d as t}from"./dialog-e8202133.js"
import{a as o}from"./ajaxReturnCode-13dfe8bc.js"
import{s as n}from"./senditems-45db17dc.js"
function s(r){return function(r){return n(e("itemRecipient"),r)}(r)}function a(e){return s(e).then(o)}function i(e){return r({cmd:"profile",subcmd:"dodropitems",removeIndex:e,ajax:1}).then(t)}export{a,i as d}
//# sourceMappingURL=dropItem-42478b6d.js.map
