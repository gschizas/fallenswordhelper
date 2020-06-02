import{v as e,D as t}from"./calfSystem-02ae8657.js"
import{d as r}from"./dialog-daafeeb1.js"
import{i as n}from"./indexAjaxJson-8dbd2034.js"
import{a}from"./ajaxReturnCode-71b23dbe.js"
function o(r){return function(t,r){return e({cmd:"trade",subcmd:"senditems",xc:window.ajaxXC,target_username:t,items:r})}(t("itemRecipient"),r)}function i(e){return function(e){return o(e)}(e).then(a)}function s(e){return n({cmd:"profile",subcmd:"dodropitems",removeIndex:e,ajax:1}).then(r)}export{i as a,s as d}
//# sourceMappingURL=dropItem-0a4a587b.js.map
