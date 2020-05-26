import{v as e,D as t}from"./calfSystem-1262535f.js"
import{d as r}from"./dialog-c7021814.js"
import{i as n}from"./indexAjaxJson-f27fbe77.js"
import{a as o}from"./ajaxReturnCode-cf3ddf46.js"
function a(r){return function(t,r){return e({cmd:"trade",subcmd:"senditems",xc:window.ajaxXC,target_username:t,items:r})}(t("itemRecipient"),r)}function i(e){return function(e){return a(e)}(e).then(o)}function s(e){return n({cmd:"profile",subcmd:"dodropitems",removeIndex:e,ajax:1}).then(r)}export{i as a,s as d}
//# sourceMappingURL=dropItem-27df3440.js.map
