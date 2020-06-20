import{I as e,a7 as t,aI as a}from"./calfSystem-9c7241dc.js"
import{i as r}from"./intValue-4cb61c79.js"
import{v as s}from"./valueText-2c80175b.js"
import{p as o}from"./padZ-95af3fc2.js"
function n(t){return r(s(e(t)))}function c(e,r){const s=/([0-9]+)m ([0-9]+)s/.exec(e)
var n
if(s)return`<dd>${n=new Date(t+1e3*(60*(60*r+Number(s[1]))+Number(s[2]))),`${o(n.getHours())}:${o(n.getMinutes())} ${n.toLocaleString("en",{weekday:"short"})} ${o(n.getDate())}/${a[n.getMonth()]}/${n.getFullYear()}`}</dd>`}export{n as a,c as t}
//# sourceMappingURL=timeBox-04f58741.js.map
