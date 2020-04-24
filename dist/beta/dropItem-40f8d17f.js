import{y as e,G as t,bB as r}from"./calfSystem-07c25a1c.js"
import{d as n}from"./dialog-cdd815db.js"
import{a}from"./ajaxReturnCode-7d8a3377.js"
function o(r){return function(t,r){return e({cmd:"trade",subcmd:"senditems",xc:window.ajaxXC,target_username:t,items:r})}(t("itemRecipient"),r)}function d(e){return function(e){return o(e)}(e).then(a)}function s(e){return r({cmd:"profile",subcmd:"dodropitems",removeIndex:e,ajax:1}).then(n)}export{d as a,s as d}
//# sourceMappingURL=dropItem-40f8d17f.js.map
