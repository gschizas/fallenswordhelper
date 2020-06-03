import{F as e,a2 as t,aE as a}from"./calfSystem-57340987.js"
import{i as r}from"./intValue-e99f58ac.js"
import{v as s}from"./valueText-2c905a41.js"
import{p as o}from"./padZ-4a0f9130.js"
function n(t){return r(s(e(t)))}function m(e,r){const s=/([0-9]+)m ([0-9]+)s/.exec(e)
var n
if(s)return`<dd>${n=new Date(t+1e3*(60*(60*r+Number(s[1]))+Number(s[2]))),`${o(n.getHours())}:${o(n.getMinutes())} ${n.toLocaleString("en",{weekday:"short"})} ${o(n.getDate())}/${a[n.getMonth()]}/${n.getFullYear()}`}</dd>`}export{n as a,m as t}
//# sourceMappingURL=timeBox-0536c83b.js.map
