import{J as e,a4 as t,aE as a}from"./calfSystem-964f4fc9.js"
import{i as r}from"./intValue-f4d85578.js"
import{v as s}from"./valueText-9fa15adc.js"
import{p as o}from"./padZ-28ca6b6e.js"
function n(t){return r(s(e(t)))}function f(e,r){const s=/([0-9]+)m ([0-9]+)s/.exec(e)
var n
if(s)return`<dd>${n=new Date(t+1e3*(60*(60*r+Number(s[1]))+Number(s[2]))),`${o(n.getHours())}:${o(n.getMinutes())} ${n.toLocaleString("en",{weekday:"short"})} ${o(n.getDate())}/${a[n.getMonth()]}/${n.getFullYear()}`}</dd>`}export{n as a,f as t}
//# sourceMappingURL=timeBox-6cf8fe68.js.map
