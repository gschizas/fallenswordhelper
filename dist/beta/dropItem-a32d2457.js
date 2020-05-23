import{y as e,G as t,bB as r}from"./calfSystem-fb94ddf0.js"
import{d as n}from"./dialog-df4a277b.js"
import{a}from"./ajaxReturnCode-560160ca.js"
function o(r){return function(t,r){return e({cmd:"trade",subcmd:"senditems",xc:window.ajaxXC,target_username:t,items:r})}(t("itemRecipient"),r)}function s(e){return function(e){return o(e)}(e).then(a)}function d(e){return r({cmd:"profile",subcmd:"dodropitems",removeIndex:e,ajax:1}).then(n)}export{s as a,d}
//# sourceMappingURL=dropItem-a32d2457.js.map
