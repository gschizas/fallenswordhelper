import{I as e,a7 as t,aI as a}from"./calfSystem-4cc738f8.js"
import{i as r}from"./intValue-209ea1ab.js"
import{v as s}from"./valueText-29e97f89.js"
import{p as o}from"./padZ-efc0fa0f.js"
function f(t){return r(s(e(t)))}function n(e,r){const s=/([0-9]+)m ([0-9]+)s/.exec(e)
var f
if(s)return`<dd>${f=new Date(t+1e3*(60*(60*r+Number(s[1]))+Number(s[2]))),`${o(f.getHours())}:${o(f.getMinutes())} ${f.toLocaleString("en",{weekday:"short"})} ${o(f.getDate())}/${a[f.getMonth()]}/${f.getFullYear()}`}</dd>`}export{f as a,n as t}
//# sourceMappingURL=timeBox-bbabca7c.js.map
