import{w as e,G as t}from"./calfSystem-03970067.js"
import{a as r}from"./ajaxReturnCode-f8cf1a95.js"
import{d as n}from"./dialog-d5dff1df.js"
import{i as a}from"./indexAjaxJson-d04ad897.js"
function o(r){return function(t,r){return e({cmd:"trade",subcmd:"senditems",xc:window.ajaxXC,target_username:t,items:r})}(t("itemRecipient"),r)}function d(e){return function(e){return o(e)}(e).then(r)}function i(e){return a({cmd:"profile",subcmd:"dodropitems",removeIndex:e,ajax:1}).then(n)}export{d as a,i as d}
//# sourceMappingURL=dropItem-882ff152.js.map
