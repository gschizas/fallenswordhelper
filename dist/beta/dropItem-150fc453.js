import{y as e,G as t,bB as r}from"./calfSystem-99da704d.js"
import{d as n}from"./dialog-f09c5ef7.js"
import{a}from"./ajaxReturnCode-d6ec60f8.js"
function o(r){return function(t,r){return e({cmd:"trade",subcmd:"senditems",xc:window.ajaxXC,target_username:t,items:r})}(t("itemRecipient"),r)}function s(e){return function(e){return o(e)}(e).then(a)}function d(e){return r({cmd:"profile",subcmd:"dodropitems",removeIndex:e,ajax:1}).then(n)}export{s as a,d}
//# sourceMappingURL=dropItem-150fc453.js.map
