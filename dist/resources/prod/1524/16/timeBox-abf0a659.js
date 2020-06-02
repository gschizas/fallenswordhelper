import{F as e,a2 as t,aE as a}from"./calfSystem-be09bdff.js"
import{i as r}from"./intValue-b1f59eab.js"
import{v as s}from"./valueText-ca5f01f1.js"
import{p as o}from"./padZ-1c20a464.js"
function f(t){return r(s(e(t)))}function n(e,r){const s=/([0-9]+)m ([0-9]+)s/.exec(e)
var f
if(s)return`<dd>${f=new Date(t+1e3*(60*(60*r+Number(s[1]))+Number(s[2]))),`${o(f.getHours())}:${o(f.getMinutes())} ${f.toLocaleString("en",{weekday:"short"})} ${o(f.getDate())}/${a[f.getMonth()]}/${f.getFullYear()}`}</dd>`}export{f as a,n as t}
//# sourceMappingURL=timeBox-abf0a659.js.map
