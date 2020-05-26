import{v as e,D as t}from"./calfSystem-740ec4d2.js"
import{d as r}from"./dialog-004172c3.js"
import{i as n}from"./indexAjaxJson-1e1af708.js"
import{a}from"./ajaxReturnCode-e6ac4096.js"
function o(r){return function(t,r){return e({cmd:"trade",subcmd:"senditems",xc:window.ajaxXC,target_username:t,items:r})}(t("itemRecipient"),r)}function i(e){return function(e){return o(e)}(e).then(a)}function s(e){return n({cmd:"profile",subcmd:"dodropitems",removeIndex:e,ajax:1}).then(r)}export{i as a,s as d}
//# sourceMappingURL=dropItem-4669d5c3.js.map
