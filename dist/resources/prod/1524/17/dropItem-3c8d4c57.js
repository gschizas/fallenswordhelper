import{v as e,D as t}from"./calfSystem-dec5e071.js"
import{d as r}from"./dialog-b7388abb.js"
import{i as n}from"./indexAjaxJson-ecf8d1f5.js"
import{a}from"./ajaxReturnCode-361085b2.js"
function o(r){return function(t,r){return e({cmd:"trade",subcmd:"senditems",xc:window.ajaxXC,target_username:t,items:r})}(t("itemRecipient"),r)}function i(e){return function(e){return o(e)}(e).then(a)}function s(e){return n({cmd:"profile",subcmd:"dodropitems",removeIndex:e,ajax:1}).then(r)}export{i as a,s as d}
//# sourceMappingURL=dropItem-3c8d4c57.js.map
