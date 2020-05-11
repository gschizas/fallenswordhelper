import{G as e,bF as r}from"./calfSystem-8dc0fa4b.js"
import{d as t}from"./dialog-f4d2194e.js"
import{a as o}from"./ajaxReturnCode-c433c790.js"
import{s as n}from"./senditems-edb76148.js"
function s(r){return function(r){return n(e("itemRecipient"),r)}(r)}function a(e){return s(e).then(o)}function i(e){return r({cmd:"profile",subcmd:"dodropitems",removeIndex:e,ajax:1}).then(t)}export{a,i as d}
//# sourceMappingURL=dropItem-a782c1a7.js.map
