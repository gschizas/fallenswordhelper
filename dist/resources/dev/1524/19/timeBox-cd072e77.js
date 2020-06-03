import{F as e,a7 as t,aI as a}from"./calfSystem-f7574730.js"
import{i as r}from"./intValue-0280032d.js"
import{v as s}from"./valueText-686b8935.js"
import{p as o}from"./padZ-30f972ec.js"
function n(t){return r(s(e(t)))}function m(e,r){const s=/([0-9]+)m ([0-9]+)s/.exec(e)
var n
if(s)return`<dd>${n=new Date(t+1e3*(60*(60*r+Number(s[1]))+Number(s[2]))),`${o(n.getHours())}:${o(n.getMinutes())} ${n.toLocaleString("en",{weekday:"short"})} ${o(n.getDate())}/${a[n.getMonth()]}/${n.getFullYear()}`}</dd>`}export{n as a,m as t}
//# sourceMappingURL=timeBox-cd072e77.js.map
