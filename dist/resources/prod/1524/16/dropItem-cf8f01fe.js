import{v as e,D as t}from"./calfSystem-be09bdff.js"
import{d as r}from"./dialog-2ae45961.js"
import{i as n}from"./indexAjaxJson-f8cc1f1e.js"
import{a}from"./ajaxReturnCode-5434dbe8.js"
function o(r){return function(t,r){return e({cmd:"trade",subcmd:"senditems",xc:window.ajaxXC,target_username:t,items:r})}(t("itemRecipient"),r)}function i(e){return function(e){return o(e)}(e).then(a)}function s(e){return n({cmd:"profile",subcmd:"dodropitems",removeIndex:e,ajax:1}).then(r)}export{i as a,s as d}
//# sourceMappingURL=dropItem-cf8f01fe.js.map
