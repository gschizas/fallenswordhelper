import{w as e,G as t}from"./calfSystem-05554bae.js"
import{a as r}from"./ajaxReturnCode-b35db638.js"
import{d as n}from"./dialog-dbf38e71.js"
import{i as a}from"./indexAjaxJson-c1c386d4.js"
function o(r){return function(t,r){return e({cmd:"trade",subcmd:"senditems",xc:window.ajaxXC,target_username:t,items:r})}(t("itemRecipient"),r)}function i(e){return function(e){return o(e)}(e).then(r)}function s(e){return a({cmd:"profile",subcmd:"dodropitems",removeIndex:e,ajax:1}).then(n)}export{i as a,s as d}
//# sourceMappingURL=dropItem-6bd0ae55.js.map
