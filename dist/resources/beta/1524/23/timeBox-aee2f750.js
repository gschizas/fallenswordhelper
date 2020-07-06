import{I as e,a4 as t,aE as a}from"./calfSystem-34fcd691.js"
import{i as r}from"./intValue-0e84cdad.js"
import{v as s}from"./valueText-eb3ddde5.js"
import{p as o}from"./padZ-ce2146a0.js"
function n(t){return r(s(e(t)))}function d(e,r){const s=/([0-9]+)m ([0-9]+)s/.exec(e)
var n
if(s)return`<dd>${n=new Date(t+1e3*(60*(60*r+Number(s[1]))+Number(s[2]))),`${o(n.getHours())}:${o(n.getMinutes())} ${n.toLocaleString("en",{weekday:"short"})} ${o(n.getDate())}/${a[n.getMonth()]}/${n.getFullYear()}`}</dd>`}export{n as a,d as t}
//# sourceMappingURL=timeBox-aee2f750.js.map
