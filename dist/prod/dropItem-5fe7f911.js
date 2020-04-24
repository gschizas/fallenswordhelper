import{y as e,G as t,bz as r}from"./calfSystem-3956a623.js"
import{d as a}from"./dialog-a6efa002.js"
import{a as n}from"./ajaxReturnCode-69077631.js"
function o(r){return function(t,r){return e({cmd:"trade",subcmd:"senditems",xc:window.ajaxXC,target_username:t,items:r})}(t("itemRecipient"),r)}function s(e){return function(e){return o(e)}(e).then(n)}function i(e){return r({cmd:"profile",subcmd:"dodropitems",removeIndex:e,ajax:1}).then(a)}export{s as a,i as d}
//# sourceMappingURL=dropItem-5fe7f911.js.map
