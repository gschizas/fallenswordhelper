import{y as e,G as t,bz as r}from"./calfSystem-d06402b1.js"
import{d as n}from"./dialog-b58c95c9.js"
import{a}from"./ajaxReturnCode-ea0d33ed.js"
function o(r){return function(t,r){return e({cmd:"trade",subcmd:"senditems",xc:window.ajaxXC,target_username:t,items:r})}(t("itemRecipient"),r)}function s(e){return function(e){return o(e)}(e).then(a)}function d(e){return r({cmd:"profile",subcmd:"dodropitems",removeIndex:e,ajax:1}).then(n)}export{s as a,d}
//# sourceMappingURL=dropItem-696f5ec1.js.map
