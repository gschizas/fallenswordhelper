import{y as e,G as t,bB as r}from"./calfSystem-c91e004c.js"
import{d as n}from"./dialog-caf4fb39.js"
import{a}from"./ajaxReturnCode-775725b8.js"
function o(r){return function(t,r){return e({cmd:"trade",subcmd:"senditems",xc:window.ajaxXC,target_username:t,items:r})}(t("itemRecipient"),r)}function s(e){return function(e){return o(e)}(e).then(a)}function i(e){return r({cmd:"profile",subcmd:"dodropitems",removeIndex:e,ajax:1}).then(n)}export{s as a,i as d}
//# sourceMappingURL=dropItem-20a43f32.js.map
