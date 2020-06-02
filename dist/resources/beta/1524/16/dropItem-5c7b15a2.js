import{v as e,D as t}from"./calfSystem-9554b525.js"
import{d as r}from"./dialog-7b85f47c.js"
import{i as n}from"./indexAjaxJson-24e555fb.js"
import{a as o}from"./ajaxReturnCode-2460176f.js"
function a(r){return function(t,r){return e({cmd:"trade",subcmd:"senditems",xc:window.ajaxXC,target_username:t,items:r})}(t("itemRecipient"),r)}function i(e){return function(e){return a(e)}(e).then(o)}function s(e){return n({cmd:"profile",subcmd:"dodropitems",removeIndex:e,ajax:1}).then(r)}export{i as a,s as d}
//# sourceMappingURL=dropItem-5c7b15a2.js.map
