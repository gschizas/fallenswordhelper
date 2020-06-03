import{F as e,a7 as t,aI as a}from"./calfSystem-5545a3e6.js"
import{i as r}from"./intValue-02f9213d.js"
import{v as s}from"./valueText-3403f71f.js"
import{p as o}from"./padZ-d6df3a69.js"
function n(t){return r(s(e(t)))}function f(e,r){const s=/([0-9]+)m ([0-9]+)s/.exec(e)
var n
if(s)return`<dd>${n=new Date(t+1e3*(60*(60*r+Number(s[1]))+Number(s[2]))),`${o(n.getHours())}:${o(n.getMinutes())} ${n.toLocaleString("en",{weekday:"short"})} ${o(n.getDate())}/${a[n.getMonth()]}/${n.getFullYear()}`}</dd>`}export{n as a,f as t}
//# sourceMappingURL=timeBox-b9c426ea.js.map
