import{y as e,G as t,bB as r}from"./calfSystem-70c0e373.js"
import{d as n}from"./dialog-b905c96a.js"
import{a}from"./ajaxReturnCode-7fc00e1d.js"
function o(r){return function(t,r){return e({cmd:"trade",subcmd:"senditems",xc:window.ajaxXC,target_username:t,items:r})}(t("itemRecipient"),r)}function s(e){return function(e){return o(e)}(e).then(a)}function i(e){return r({cmd:"profile",subcmd:"dodropitems",removeIndex:e,ajax:1}).then(n)}export{s as a,i as d}
//# sourceMappingURL=dropItem-efd591f6.js.map
