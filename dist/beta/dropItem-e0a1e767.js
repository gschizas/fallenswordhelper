import{y as e,G as t,bB as r}from"./calfSystem-2fb02284.js"
import{d as n}from"./dialog-bdcd2acc.js"
import{a}from"./ajaxReturnCode-b8478934.js"
function o(r){return function(t,r){return e({cmd:"trade",subcmd:"senditems",xc:window.ajaxXC,target_username:t,items:r})}(t("itemRecipient"),r)}function s(e){return function(e){return o(e)}(e).then(a)}function i(e){return r({cmd:"profile",subcmd:"dodropitems",removeIndex:e,ajax:1}).then(n)}export{s as a,i as d}
//# sourceMappingURL=dropItem-e0a1e767.js.map
