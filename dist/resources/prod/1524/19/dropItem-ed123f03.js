import{v as e,D as t}from"./calfSystem-6fc0cc1b.js"
import{d as r}from"./dialog-2c2225f5.js"
import{i as n}from"./indexAjaxJson-608117f0.js"
import{a as o}from"./ajaxReturnCode-465058b0.js"
function a(r){return function(t,r){return e({cmd:"trade",subcmd:"senditems",xc:window.ajaxXC,target_username:t,items:r})}(t("itemRecipient"),r)}function i(e){return function(e){return a(e)}(e).then(o)}function s(e){return n({cmd:"profile",subcmd:"dodropitems",removeIndex:e,ajax:1}).then(r)}export{i as a,s as d}
//# sourceMappingURL=dropItem-ed123f03.js.map
