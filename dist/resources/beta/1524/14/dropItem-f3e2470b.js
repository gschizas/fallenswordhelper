import{x as e,F as t,bA as r}from"./calfSystem-371c414c.js"
import{d as n}from"./dialog-3e1a0a78.js"
import{a}from"./ajaxReturnCode-946f7e47.js"
function o(r){return function(t,r){return e({cmd:"trade",subcmd:"senditems",xc:window.ajaxXC,target_username:t,items:r})}(t("itemRecipient"),r)}function s(e){return function(e){return o(e)}(e).then(a)}function i(e){return r({cmd:"profile",subcmd:"dodropitems",removeIndex:e,ajax:1}).then(n)}export{s as a,i as d}
//# sourceMappingURL=dropItem-f3e2470b.js.map
