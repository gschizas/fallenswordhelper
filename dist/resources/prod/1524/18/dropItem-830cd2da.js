import{v as e,D as t}from"./calfSystem-8b6534a5.js"
import{d as r}from"./dialog-3c03bbb1.js"
import{i as n}from"./indexAjaxJson-b43ddbcc.js"
import{a}from"./ajaxReturnCode-8531f24d.js"
function o(r){return function(t,r){return e({cmd:"trade",subcmd:"senditems",xc:window.ajaxXC,target_username:t,items:r})}(t("itemRecipient"),r)}function i(e){return function(e){return o(e)}(e).then(a)}function s(e){return n({cmd:"profile",subcmd:"dodropitems",removeIndex:e,ajax:1}).then(r)}export{i as a,s as d}
//# sourceMappingURL=dropItem-830cd2da.js.map
