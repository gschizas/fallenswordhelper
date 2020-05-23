import{y as e,G as t,bz as r}from"./calfSystem-4b4fbec4.js"
import{d as n}from"./dialog-00707b06.js"
import{a}from"./ajaxReturnCode-ca9b4e78.js"
function o(r){return function(t,r){return e({cmd:"trade",subcmd:"senditems",xc:window.ajaxXC,target_username:t,items:r})}(t("itemRecipient"),r)}function s(e){return function(e){return o(e)}(e).then(a)}function i(e){return r({cmd:"profile",subcmd:"dodropitems",removeIndex:e,ajax:1}).then(n)}export{s as a,i as d}
//# sourceMappingURL=dropItem-b8679633.js.map
