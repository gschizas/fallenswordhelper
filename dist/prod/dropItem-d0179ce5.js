import{y as e,G as t,bz as r}from"./calfSystem-4f7c0235.js"
import{d as n}from"./dialog-202b3453.js"
import{a}from"./ajaxReturnCode-0283a2cf.js"
function o(r){return function(t,r){return e({cmd:"trade",subcmd:"senditems",xc:window.ajaxXC,target_username:t,items:r})}(t("itemRecipient"),r)}function s(e){return function(e){return o(e)}(e).then(a)}function i(e){return r({cmd:"profile",subcmd:"dodropitems",removeIndex:e,ajax:1}).then(n)}export{s as a,i as d}
//# sourceMappingURL=dropItem-d0179ce5.js.map
