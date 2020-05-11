import{y as e,G as t,bz as r}from"./calfSystem-72fdbe97.js"
import{d as n}from"./dialog-9c6ee33b.js"
import{a}from"./ajaxReturnCode-e0b3c2c2.js"
function o(r){return function(t,r){return e({cmd:"trade",subcmd:"senditems",xc:window.ajaxXC,target_username:t,items:r})}(t("itemRecipient"),r)}function s(e){return function(e){return o(e)}(e).then(a)}function i(e){return r({cmd:"profile",subcmd:"dodropitems",removeIndex:e,ajax:1}).then(n)}export{s as a,i as d}
//# sourceMappingURL=dropItem-3edc6f01.js.map
