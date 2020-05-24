import{x as e,F as t,by as r}from"./calfSystem-d587d232.js"
import{d as n}from"./dialog-f9fad105.js"
import{a}from"./ajaxReturnCode-b9bc06f8.js"
function o(r){return function(t,r){return e({cmd:"trade",subcmd:"senditems",xc:window.ajaxXC,target_username:t,items:r})}(t("itemRecipient"),r)}function s(e){return function(e){return o(e)}(e).then(a)}function d(e){return r({cmd:"profile",subcmd:"dodropitems",removeIndex:e,ajax:1}).then(n)}export{s as a,d}
//# sourceMappingURL=dropItem-719e855e.js.map
