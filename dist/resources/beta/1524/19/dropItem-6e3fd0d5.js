import{v as e,D as t}from"./calfSystem-57340987.js"
import{d as r}from"./dialog-bc1710e0.js"
import{i as n}from"./indexAjaxJson-f0b26dd6.js"
import{a as o}from"./ajaxReturnCode-76c0bbbd.js"
function a(r){return function(t,r){return e({cmd:"trade",subcmd:"senditems",xc:window.ajaxXC,target_username:t,items:r})}(t("itemRecipient"),r)}function i(e){return function(e){return a(e)}(e).then(o)}function s(e){return n({cmd:"profile",subcmd:"dodropitems",removeIndex:e,ajax:1}).then(r)}export{i as a,s as d}
//# sourceMappingURL=dropItem-6e3fd0d5.js.map
